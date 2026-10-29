import { useEffect, useRef, useState } from "react";
import { company, navigation } from "./content";
import { Arrow } from "./Shared";

export function LineIcon({ type = "cube" }) {
  const paths = {
    cube: "M16 3 28 10v13l-12 7-12-7V10L16 3Zm0 14v13M4 10l12 7 12-7M16 3v14",
    clock: "M16 7v10l6 3",
    check: "m8 16 5 5L25 9",
    mail: "M3 6h26v21H3V6Zm0 0 13 12L29 6",
    pin: "M16 30S5 20 5 12a11 11 0 0 1 22 0c0 8-11 18-11 18Z",
    phone: "M7 3 3 7c1 12 10 21 22 22l4-4-7-6-4 3c-5-2-8-5-10-10l3-4-4-5Z",
    spark: "m16 2 4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z",
    plan: "M6 3h20v26H6V3Zm5 7h10m-10 6h10m-10 6h10",
    chat: "M3 4h26v20H14l-8 6v-6H3V4Zm6 10h1m6 0h1m6 0h1",
    send: "m2 13 28-11-11 28-4-13-13-4Zm13 4L30 2",
    sun: "M16 1v5m0 20v5M1 16h5m20 0h5M5 5l4 4m14 14 4 4M5 27l4-4M23 9l4-4",
  };
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {type === "clock" || type === "sun" ? (
        <circle cx="16" cy="16" r={type === "clock" ? 13 : 7} />
      ) : null}
      <path d={paths[type] || paths.cube} />
      {type === "pin" && <circle cx="16" cy="12" r="4" />}
    </svg>
  );
}
export function InnerPage({ children, className = "" }) {
  const root = useRef(null);
  useEffect(() => {
    const element = root.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || !window.IntersectionObserver) return;
    const nodes = element.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    element.classList.add("has-inner-reveal");
    nodes.forEach((node) => observer.observe(node));
    const change = () => {
      if (mq.matches) {
        element.classList.remove("has-inner-reveal");
        observer.disconnect();
      }
    };
    mq.addEventListener("change", change);
    return () => {
      observer.disconnect();
      mq.removeEventListener("change", change);
      element.classList.remove("has-inner-reveal");
    };
  }, []);
  return (
    <div ref={root} className={`inner-page ${className}`}>
      {children}
    </div>
  );
}
export function Eyebrow({ children }) {
  return <span className="inner-eyebrow">{children}</span>;
}
export function InnerButton({ href, children, outline = false }) {
  return (
    <a className={`inner-button ${outline ? "is-outline" : ""}`} href={href}>
      {children}
      <Arrow />
    </a>
  );
}
export function InnerHero({
  eyebrow,
  title,
  accent,
  description,
  image,
  alt = "",
  serif = false,
  inlineAccent = false,
  children,
}) {
  return (
    <section className={`inner-hero ${serif ? "has-serif" : ""}`}>
      <img
        className="inner-hero-bg"
        src={image}
        alt={alt}
        width="1672"
        height="941"
        fetchPriority="high"
      />
      <div className="inner-hero-shade" />
      <div className="inner-hero-content">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>
          {title}
          {inlineAccent ? " " : <br />}
          <span>{accent}</span>
        </h1>
        <p>{description}</p>
        {children}
      </div>
      <span className="inner-hero-side" aria-hidden="true">
        IMAGINER
        <br />
        VISUALISER
        <br />
        SUBLIMER
        <br />
        VOS ESPACES
      </span>
      <div className="inner-hero-bottom" aria-hidden="true">
        ARCHITECTURE <b>/</b> INTÉRIEUR <b>/</b> 3D <b>/</b> EXPÉRIENCE VISUELLE
        <i />
      </div>
    </section>
  );
}
export function InnerCTA({
  title = "Parlons de",
  accent = "votre projet.",
  description = "Discutons de vos idées et voyons ensemble comment les transformer en visuels d’exception.",
  image = "/images/inner-villa-v5.webp",
  large = false,
}) {
  return (
    <section className={`inner-cta ${large ? "is-large" : ""}`}>
      <img
        src={image}
        alt="Architecture contemporaine ouverte sur le paysage"
        loading="lazy"
        width="1672"
        height="941"
      />
      <div>
        <Eyebrow>UN PROJET EN TÊTE ?</Eyebrow>
        <h2>
          {title}
          <br className="inner-cta-break" /> <span>{accent}</span>
        </h2>
        <p>{description}</p>
      </div>
      <InnerButton href="/contact">Démarrer un projet</InnerButton>
    </section>
  );
}
export function InnerFooter({ path }) {
  return (
    <footer className="inner-footer">
      <div className="inner-footer-top">
        <a href="/" aria-label="MultiShift — Accueil">
          <img
            src="/images/multishift-logo.webp"
            alt="MultiShift"
            width="300"
            height="57"
          />
          <small>ARCHITECTURE VISUALISATION</small>
        </a>
        <nav aria-label="Navigation de pied de page">
          {navigation.slice(1).map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <address>
          <a
            href="https://www.openstreetmap.org/search?query=Quartier%20Hamria%20Meknes"
            target="_blank"
            rel="noreferrer"
          >
            <LineIcon type="pin" />
            {company.address}
          </a>
          <a href={`mailto:${company.email}`}>
            <LineIcon type="mail" />
            {company.email}
          </a>
          <a href={`tel:${company.tel}`}>
            <LineIcon type="phone" />
            {company.phone}
          </a>
        </address>
      </div>
      <div className="inner-footer-bottom">
        <span>© 2026 MultiShift. Tous droits réservés.</span>
        <span>
          <a href="https://multishift.ma/cgu">Mentions légales</a>
          <a href="https://multishift.ma/politique-confidentialite">
            Confidentialité
          </a>
          <a href={company.instagram} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
        </span>
      </div>
    </footer>
  );
}
export function CompareFigure({
  before,
  after,
  title = "Du modèle au réel",
  beforeLabel = "MODÈLE 3D",
  afterLabel = "RÉALITÉ",
}) {
  const [position, setPosition] = useState(50);
  return (
    <figure className="inner-compare">
      <div className="inner-compare-images">
        <img
          src={after}
          alt={`${title} — ${afterLabel.toLowerCase()}`}
          width="1200"
          height="800"
          loading="lazy"
        />
        <img
          className="inner-compare-before"
          src={before}
          alt={`${title} — ${beforeLabel.toLowerCase()}`}
          width="1200"
          height="800"
          loading="lazy"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />
        <span className="inner-compare-label before">{beforeLabel}</span>
        <span className="inner-compare-label after">{afterLabel}</span>
        <span
          className="inner-compare-handle"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <b>‹ ›</b>
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Comparer les deux vues : ${title}`}
          aria-valuetext={`${position} % modèle, ${100 - position} % réalité`}
        />
      </div>
      <figcaption>
        Glissez le curseur pour explorer les deux visions du projet.
      </figcaption>
    </figure>
  );
}
