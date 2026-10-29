import { useEffect, useRef, useState, useCallback } from "react";
import { sequenceFrame, clamp, CHAPTERS } from "./heroSequence";
export default function useHeroSequence() {
  const root = useRef(null);
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [phase, setPhase] = useState(0),
    [reduced, setReduced] = useState(
      () =>
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(q.matches);
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    let frame = 0;
    const draw = () => {
      frame = 0;
      const el = root.current;
      if (!el) return;
      const box = el.getBoundingClientRect(),
        viewport = el.querySelector(".showroom-hero").offsetHeight;
      const scroll = clamp(-box.top / Math.max(1, box.height - viewport));
      const values = sequenceFrame(reduced ? 1 : scroll);
      el.style.setProperty("--progress", String(scroll));
      for (const [key, value] of Object.entries(values))
        if (key !== "phase") el.style.setProperty("--" + key, String(value));
      el.dataset.finished = String(values.finalOpacity > 0.9);
      el.dataset.entered = String(values.welcomeOpacity < 0.05);
      setWelcomeVisible(values.welcomeOpacity > 0.05);
      setPhase(reduced ? 3 : values.phase);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(root.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced]);
  const select = useCallback((index) => {
    const el = root.current;
    if (!el) return;
    const box = el.getBoundingClientRect(),
      view = el.querySelector(".showroom-hero").offsetHeight;
    window.scrollTo({
      top:
        window.scrollY +
        box.top +
        (box.height - view) * CHAPTERS[Math.max(0, Math.min(3, index))] +
        (index > 0 ? 1 : 0),
      behavior: "instant",
    });
  }, []);
  const move = useCallback(
    (e) => {
      if (reduced || e.pointerType !== "mouse") return;
      const box = e.currentTarget.getBoundingClientRect();
      root.current?.style.setProperty(
        "--pointer-x",
        `${((e.clientX - box.left) / box.width - 0.5) * 8}px`,
      );
      root.current?.style.setProperty(
        "--pointer-y",
        `${((e.clientY - box.top) / box.height - 0.5) * 5}px`,
      );
    },
    [reduced],
  );
  const leave = useCallback(() => {
    root.current?.style.setProperty("--pointer-x", "0px");
    root.current?.style.setProperty("--pointer-y", "0px");
  }, []);
  return { root, phase, reduced, select, move, leave, welcomeVisible };
}
