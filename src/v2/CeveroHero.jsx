import { useEffect, useRef, useState, useCallback } from "react";
import { heroSlides } from "./content";
import { Arrow } from "./Shared";
function useVisualSlider(count) {
  const [active, setActive] = useState(0),
    [revision, setRevision] = useState(0),
    [paused, setPaused] = useState(false),
    [hovered, setHovered] = useState(false),
    [focused, setFocused] = useState(false),
    [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const progress = useRef(null),
    elapsed = useRef(0);
  const select = useCallback(
    (index) => {
      elapsed.current = 0;
      if (progress.current) progress.current.style.transform = "scaleX(0)";
      setActive((index + count) % count);
      setRevision((n) => n + 1);
    },
    [count],
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(mq.matches),
      visibility = () => setHidden(document.hidden);
    mq.addEventListener("change", change);
    document.addEventListener("visibilitychange", visibility);
    visibility();
    return () => {
      mq.removeEventListener("change", change);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (paused || hovered || focused || hidden || reduced) return;
    let frame,
      last = performance.now();
    const tick = (now) => {
      elapsed.current += Math.min(now - last, 100);
      last = now;
      if (progress.current)
        progress.current.style.transform = `scaleX(${Math.min(1, elapsed.current / 7200)})`;
      if (elapsed.current >= 7200) select(active + 1);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, revision, paused, hovered, focused, hidden, reduced, select]);
  return {
    active,
    select,
    paused,
    setPaused,
    setHovered,
    setFocused,
    progress,
  };
}

export default function CeveroHero() {
  const {
    active,
    select,
    paused,
    setPaused,
    setHovered,
    setFocused,
    progress,
  } = useVisualSlider(heroSlides.length);
  return (
    <section
      className="cv-hero"
      aria-label="Les univers d’intérieur MultiShift"
      aria-roledescription="carrousel"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          select(active + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
    >
      <svg className="cv-clip-defs" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="cv-hero-clip" clipPathUnits="objectBoundingBox">
            <path d="M.055 0H.945Q1 0 1 .075V.535Q1 .61 .945 .61H.735Q.675 .61 .675 .695V.925Q.675 1 .62 1H.055Q0 1 0 .925V.075Q0 0 .055 0Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="cv-hero-art">
        <div className="cv-hero-images">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.alt}
              className={active === index ? "active" : ""}
              aria-hidden={active !== index}
              width="1672"
              height="941"
              fetchPriority={index === 0 ? "high" : "low"}
              decoding="async"
            />
          ))}
        </div>
        <div className="cv-hero-overlay" />
      </div>
      <div className="cv-hero-copy">
        <span className="cv-eyebrow">
          MULTISHIFT · ARCHITECTURE & VISUALISATION
        </span>
        <h1>
          Des espaces pensés
          <br />
          pour vous.
        </h1>
        <p>
          Boutiques, intérieurs et lieux de marque. Nous donnons forme à vos
          idées pour créer des espaces aussi singuliers que vous.
        </p>
        <a className="cv-primary-button" href="/contact">
          Parlons de votre projet <Arrow />
        </a>
        <a className="cv-hero-explore" href="#studio-intro">
          Explorer nos réalisations <span aria-hidden="true">↘</span>
        </a>
      </div>
      <div className="cv-hero-controls">
        <span aria-live="off">
          0{active + 1}
          <small> / 03</small>
        </span>
        <button
          onClick={() => select(active - 1)}
          aria-label="Image précédente"
        >
          ←
        </button>
        <button
          onClick={() => setPaused((value) => !value)}
          aria-label={
            paused ? "Reprendre le défilement" : "Mettre le défilement en pause"
          }
          aria-pressed={paused}
        >
          {paused ? "▷" : "Ⅱ"}
        </button>
        <button onClick={() => select(active + 1)} aria-label="Image suivante">
          →
        </button>
        <div className="cv-hero-progress" aria-hidden="true">
          <i ref={progress} />
        </div>
      </div>
      <aside className="cv-hero-note" aria-label="Le studio en quelques mots">
        <dl>
          <div>
            <dt>Projets livrés</dt>
            <dd>57+</dd>
          </div>
          <div>
            <dt>Expertises complémentaires</dt>
            <dd>04</dd>
          </div>
        </dl>
        <p>
          De la première idée au dernier détail,
          <br />
          créons des lieux qui vous ressemblent.
        </p>
      </aside>
    </section>
  );
}
