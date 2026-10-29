import { useEffect, useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "Visualisation Architecturale",
    description:
      "Des rendus photoréalistes qui donnent vie à vos projets avant leur construction.",
    details:
      "Intérieurs & extérieurs · Éclairage réaliste · Animations · Vues aériennes",
    image: "/images/pillar-restaurant-v3.webp",
    alt: "Visualisation photoréaliste d’un restaurant contemporain",
    href: "/services#visualisation-architecturale",
    icon: "craft",
  },
  {
    number: "02",
    title: "Modélisation 3D",
    description:
      "Des modèles précis de vos bâtiments, espaces, mobiliers et produits, du concept au fichier prêt pour la production.",
    details:
      "Modélisation architecturale · Mobilier sur mesure · Textures 4K · Fichiers 3D",
    image: "/images/service-model-v4.webp",
    alt: "Maquette architecturale détaillée et mobilier en cours de modélisation",
    href: "/services#modelisation-3d",
    icon: "cube",
  },
  {
    number: "03",
    title: "Design Immobilier",
    description:
      "Valorisez vos biens avec des visuels premium qui séduisent acheteurs et investisseurs dès le premier regard.",
    details: "Home staging virtuel · Plans 2D/3D · Brochures · Configurateurs",
    image: "/images/service-property-v4.webp",
    alt: "Penthouse aménagé pour une présentation immobilière haut de gamme",
    href: "/services#design-immobilier",
    icon: "home",
  },
  {
    number: "04",
    title: "Gestion de Projet",
    description:
      "Un accompagnement complet de votre projet, de la première idée à la livraison.",
    details: "Planning · Coordination · Suivi des travaux · Reporting",
    image: "/images/v2-project-desk.webp",
    alt: "Plans, échantillons et maquette pour la coordination d’un projet architectural",
    href: "/services#gestion-de-projet",
    icon: "craft",
  },
];
function PillarIcon({ type }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      {type === "cube" ? (
        <path d="m16 4 11 6v12l-11 6-11-6V10l11-6Zm0 12v12M5 10l11 6 11-6M16 4v12" />
      ) : type === "craft" ? (
        <>
          <path d="M16 3c-5 6-7 8 0 13 7-5 5-7 0-13Zm0 13c-5 5-7 7 0 13 7-6 5-8 0-13Z" />
          <path d="M3 16c6-5 8-7 13 0-5 7-7 5-13 0Zm13 0c5-7 7-5 13 0-6 5-8 7-13 0Z" />
        </>
      ) : (
        <path d="m4 14 12-10 12 10v13H4V14Zm8 13V16h8v11M10 12h12" />
      )}
    </svg>
  );
}
export default function ExpertisePillars() {
  const root = useRef(null);
  useEffect(() => {
    const element = root.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;
    const rows = [...element.querySelectorAll(".v2-pillar-row")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -35px 0px" },
    );
    element.classList.add("has-reveal");
    rows.forEach((row) => observer.observe(row));
    const showAll = () => {
      if (media.matches) {
        element.classList.remove("has-reveal");
        observer.disconnect();
      }
    };
    media.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", showAll);
      element.classList.remove("has-reveal");
    };
  }, []);
  return (
    <section
      className="v2-pillars"
      ref={root}
      aria-labelledby="v2-pillars-title"
    >
      <header className="v2-pillars-heading">
        <span className="v2-kicker">NOTRE EXPERTISE</span>
        <h2 id="v2-pillars-title">
          Quatre expertises,
          <br />
          une même exigence.
        </h2>
        <p>
          De la première vision à la livraison, un accompagnement complet pour
          vos espaces.
        </p>
      </header>
      <div className="v2-pillars-rows">
        {pillars.map((item, index) => (
          <article
            className={`v2-pillar-row ${index % 2 ? "is-reversed" : ""}`}
            key={item.number}
          >
            <a
              href={item.href}
              className={`v2-pillar-photo from-${index % 2 ? "right" : "left"}`}
              aria-label={`Découvrir : ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                width="1536"
                height="1024"
              />
            </a>
            <div
              className={`v2-pillar-copy from-${index % 2 ? "left" : "right"}`}
            >
              <span className="v2-pillar-number" aria-hidden="true">
                {item.number}
              </span>
              <div className="v2-pillar-rule" aria-hidden="true">
                <i>
                  <PillarIcon type={item.icon} />
                </i>
                <span>
                  <b />
                </span>
              </div>
              <h3>
                <a href={item.href}>{item.title}</a>
              </h3>
              <p>{item.description}</p>
              <p className="v2-pillar-details">{item.details}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
