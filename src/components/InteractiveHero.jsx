import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { FURNITURE_PIECES, SITE_URL } from "../data/furniturePieces";
import { coverScene, assemblySchedule } from "../data/assemblyLayout";

export default function InteractiveHero({ onReplay, onPhaseChange, command }) {
  const [state, setState] = useState("idle"),
    [activePieceIndex, setActivePieceIndex] = useState(-1),
    [ready, setReady] = useState(false),
    [assetError, setAssetError] = useState(false);
  const [mobile, setMobile] = useState(false),
    [reduced, setReduced] = useState(false);
  const root = useRef(null),
    pieces = useRef([]),
    finished = useRef(null),
    timeline = useRef(null),
    mode = useRef("idle"),
    lastCommand = useRef(0);
  const setMode = useCallback((value) => {
    mode.current = value;
    setState(value);
  }, []);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(q.matches);
      setMobile(
        window.innerWidth < 768 ||
          window.matchMedia("(pointer: coarse)").matches,
      );
    };
    update();
    q.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      q.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  useEffect(() => {
    let cancelled = false;
    const sources = [
      "/hero/hero-empty.webp",
      "/hero/hero-furnished.webp",
      ...FURNITURE_PIECES.map((piece) => piece.srcWebp),
    ];
    Promise.all(
      sources.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
          }),
      ),
    ).then((results) => {
      if (cancelled) return;
      setAssetError(results.some((ok) => !ok));
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    const stage = root.current?.querySelector(".interactive-stage");
    const scene = root.current?.querySelector(".assembly-scene");
    if (!stage || !scene) return;
    const resize = () => {
      const b = stage.getBoundingClientRect(),
        layout = coverScene(b.width, b.height);
      Object.assign(
        scene.style,
        Object.fromEntries(
          Object.entries(layout).map(([key, value]) => [key, value + "px"]),
        ),
      );
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    resize();
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    onPhaseChange?.(state === "idle" ? 0 : state === "assembling" ? 1 : 2);
  }, [state, onPhaseChange]);
  useEffect(() => {
    if (!ready) return;
    const nodes = pieces.current.filter(Boolean),
      finishedNode = finished.current;
    gsap.set(nodes, { autoAlpha: 0, x: 0, y: -58, scale: 1, rotation: 0 });
    gsap.set(finished.current, { autoAlpha: 0 });
    const tl = gsap.timeline({
      paused: true,
      onStart: () => setMode("assembling"),
      onComplete: () => setMode("completed"),
    });
    assemblySchedule(FURNITURE_PIECES).forEach(({ index, start, duration }) => {
      const el = pieces.current[index];
      if (!el) return;
      tl.to(
        el,
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          ease: "power3.out",
          onStart: () => setActivePieceIndex(index),
        },
        start,
      );
    });
    tl.to(
      finished.current,
      { autoAlpha: 1, duration: 0.45, ease: "power1.inOut" },
      "+=0.18",
    );
    timeline.current = tl;
    if (reduced) tl.progress(1).pause();
    return () => {
      tl.kill();
      gsap.killTweensOf(nodes);
      gsap.killTweensOf(finishedNode);
      timeline.current = null;
    };
  }, [ready, reduced, setMode]);
  const play = useCallback(() => {
    if (!ready || mode.current !== "idle") return;
    setMode("assembling");
    if (reduced) {
      timeline.current?.progress(1).pause();
      setMode("completed");
    } else timeline.current?.play(0);
  }, [ready, reduced, setMode]);
  const reset = useCallback(() => {
    timeline.current?.pause(0);
    gsap.set(pieces.current.filter(Boolean), {
      autoAlpha: 0,
      x: 0,
      y: -58,
      scale: 1,
    });
    gsap.set(finished.current, { autoAlpha: 0 });
    setActivePieceIndex(-1);
    setMode("idle");
    onReplay?.();
  }, [setMode, onReplay]);
  const complete = useCallback(() => {
    if (!ready) return;
    timeline.current?.progress(1).pause();
    setActivePieceIndex(FURNITURE_PIECES.length - 1);
    setMode("completed");
  }, [ready, setMode]);
  useEffect(() => {
    if (!command || command.id === lastCommand.current || !ready) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      lastCommand.current = command.id;
      if (command.action === "reset") reset();
      else if (command.action === "play") {
        if (mode.current === "completed") reset();
        play();
      } else if (command.action === "finish") complete();
    });
    return () => {
      cancelled = true;
    };
  }, [command, ready, reset, play, complete]);
  useEffect(() => {
    if (!ready || state !== "idle" || mobile) return;
    const baseline = window.scrollY;
    const wheel = (e) => {
      if (e.deltaY > 4 && root.current?.getBoundingClientRect().bottom > 120)
        play();
    };
    const scroll = () => {
      if (
        window.scrollY - baseline > 16 &&
        root.current?.getBoundingClientRect().bottom > 120
      )
        play();
    };
    window.addEventListener("wheel", wheel, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("scroll", scroll);
    };
  }, [ready, state, mobile, play]);
  useEffect(() => {
    if (!ready || !mobile || state !== "idle") return;
    let timer;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting))
          timer = setTimeout(play, 550);
        else clearTimeout(timer);
      },
      { threshold: 0.35 },
    );
    observer.observe(root.current);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [ready, mobile, state, play]);
  useEffect(() => {
    let wasPlaying = false;
    const visibility = () => {
      if (document.hidden) {
        wasPlaying = !!timeline.current?.isActive();
        timeline.current?.pause();
      } else if (wasPlaying) {
        timeline.current?.resume();
        wasPlaying = false;
      }
    };
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  return (
    <div
      ref={root}
      className={`interactive-hero-wrapper ${state}`}
      data-state={state}
    >
      <div
        id="interactive-stage"
        className="interactive-stage"
        role="region"
        aria-label="Transformation du salon : chaque meuble se pose à sa place"
      >
        <div className="assembly-scene" aria-hidden="true">
          <div className="scene-layer empty-layer">
            <img
              src="/hero/hero-empty.webp"
              alt=""
              width="1672"
              height="941"
              className="room-img"
              fetchPriority="high"
            />
          </div>
          <div className="furniture-stage">
            {FURNITURE_PIECES.map((piece, i) => (
              <div
                className={`assembly-piece piece-${piece.id}`}
                key={piece.id}
                ref={(el) => {
                  pieces.current[i] = el;
                }}
                style={{ ...piece.style, opacity: 0, visibility: "hidden" }}
              >
                <img
                  src={piece.srcWebp}
                  alt=""
                  className="assembly-img"
                  decoding="async"
                />
              </div>
            ))}
          </div>
          <div ref={finished} className="scene-layer furnished-layer">
            <img
              src="/hero/hero-furnished.webp"
              alt=""
              width="1672"
              height="941"
              className="room-img"
            />
          </div>
        </div>
        <div className="assembly-vignette" />
        {state === "idle" && (
          <div className="hero-editorial-overlay">
            <div className="editorial-inner">
              <span className="brand-badge">
                <span className="badge-line" />
                MULTISHIFT STUDIO
              </span>
              <h1>
                Entrez dans
                <br />
                votre <em>vision.</em>
              </h1>
              <p className="hero-sub-text">
                Des espaces qui se dessinent.
                <br />
                Des détails qui changent tout.
              </p>
              <button
                className="assembly-start"
                disabled={!ready}
                onClick={play}
              >
                {ready
                  ? "Donner vie à l’espace"
                  : "Préparation de l’expérience"}
                <span>↓</span>
              </button>
            </div>
          </div>
        )}
      </div>
      {state === "assembling" && (
        <aside
          className="assembly-status-bar"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="live-dot" />
          <div className="status-copy">
            <span className="status-title">L’ESPACE PREND VIE</span>
            <span className="status-label">
              {FURNITURE_PIECES[activePieceIndex]?.label ||
                "Installation du mobilier"}
            </span>
          </div>
          <span className="status-step">
            {String(Math.max(1, activePieceIndex + 1)).padStart(2, "0")} /{" "}
            {FURNITURE_PIECES.length}
          </span>
          <button className="skip-btn" onClick={complete}>
            Voir le résultat <span>↗</span>
          </button>
        </aside>
      )}
      {state === "completed" && (
        <div className="assembly-complete">
          <span>
            <i /> CHAQUE DÉTAIL, À SA PLACE.
          </span>
          <a href={SITE_URL + "/portfolio"}>
            Explorer nos réalisations <span>↗</span>
          </a>
        </div>
      )}
      {assetError && (
        <span className="assembly-error" role="status">
          Un visuel n’a pas pu être chargé. Actualisez la page.
        </span>
      )}
    </div>
  );
}
