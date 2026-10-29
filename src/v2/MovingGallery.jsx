import { useEffect, useRef, useState } from "react";
import { heroSlides } from "./content";

const gallery = [
  {
    ...heroSlides[1],
    name: "Boutique de mode",
    description:
      "Arches épurées, portants en bronze et matières naturelles composent une expérience de shopping sereine.",
  },
  {
    ...heroSlides[0],
    name: "Maison de beauté",
    description:
      "Travertin, bois sculpté et lumière douce mettent en scène les produits autour d’un îlot central.",
  },
  {
    ...heroSlides[2],
    name: "Écrin de joaillerie",
    description:
      "Marbre sombre, vitrines de bronze et éclairage feutré révèlent un univers précieux et intimiste.",
  },
];

export default function MovingGallery() {
  const section = useRef(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = section.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const offset = media.matches
        ? 0
        : Math.max(
            -90,
            Math.min(
              90,
              (window.innerHeight / 2 - bounds.top - bounds.height / 2) * 0.12,
            ),
          );
      element.style.setProperty("--gallery-scroll", `${offset}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <section
      ref={section}
      className={`v2-moving-gallery ${paused ? "is-paused" : ""}`}
      id="studio-intro"
      aria-labelledby="v2-gallery-title"
    >
      <div className="v2-gallery-heading">
        <div>
          <span className="v2-kicker">ARCHITECTURE D’INTÉRIEUR · CONCEPTS</span>
          <h2 id="v2-gallery-title">Portfolio</h2>
        </div>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          aria-label={
            paused
              ? "Reprendre le mouvement des images"
              : "Mettre le mouvement des images en pause"
          }
        >
          {paused ? "Reprendre ▷" : "Pause Ⅱ"}
        </button>
      </div>
      <div className="v2-collage-line" aria-hidden="true">
        <svg viewBox="0 0 1400 500" fill="none" preserveAspectRatio="none">
          <path d="M-20 350C240 10 380 520 640 245S1090 550 1440 105" />
        </svg>
      </div>
      <div className="v2-gallery-parallax">
        <div className="v2-gallery-track">
          {[0, 1].map((copy) => (
            <div
              className="v2-gallery-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {gallery.map((item, index) => (
                <figure
                  className={`v2-gallery-image image-${index + 1}`}
                  key={item.image}
                >
                  <img
                    src={item.image}
                    alt={copy === 0 ? item.alt : ""}
                    loading="lazy"
                    decoding="async"
                    width="1672"
                    height="941"
                  />
                  <figcaption>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
