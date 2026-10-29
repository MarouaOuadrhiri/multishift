import { useEffect, useRef, useState } from "react";
import { company, navigation, faq } from "./content";
export function Arrow({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      {diagonal ? (
        <path d="M5 19 19 5M5 5h14v14" />
      ) : (
        <path d="M3 12h17m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}
export function TextLink({ href, children, className = "" }) {
  return (
    <a className={`v2-text-link ${className}`} href={href}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}
export function Header({ path = "/", dark = false }) {
  const [open, setOpen] = useState(false);
  const panel = useRef(null),
    toggle = useRef(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector("a")?.focus();
    const key = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = [
          toggle.current,
          ...panel.current.querySelectorAll("a,button"),
        ].filter(Boolean);
        if (e.shiftKey && document.activeElement === nodes[0]) {
          e.preventDefault();
          nodes.at(-1)?.focus();
        } else if (!e.shiftKey && document.activeElement === nodes.at(-1)) {
          e.preventDefault();
          nodes[0]?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  return (
    <>
      <header
        className={`v2-header ${dark ? "is-dark" : "is-light"} ${open ? "menu-is-open" : ""}`}
      >
        <a
          className="v2-logo"
          tabIndex={open ? -1 : undefined}
          href="/"
          aria-label="MultiShift — Accueil"
        >
          <img
            src="/images/multishift-logo.webp"
            width="300"
            height="57"
            alt="MultiShift"
          />
        </a>
        <nav className="v2-desktop-nav" aria-label="Navigation principale">
          {(path === "/" ? navigation : navigation.slice(1)).map(
            ([label, href]) => (
              <a
                href={href}
                key={href}
                aria-current={path === href ? "page" : undefined}
              >
                {label}
              </a>
            ),
          )}
        </nav>
        <button
          ref={toggle}
          className="v2-menu-button"
          aria-expanded={open}
          aria-controls="v2-menu-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? "Fermer" : "Menu"}</span>
          <i className={open ? "cross" : ""}>
            <b />
            <b />
          </i>
        </button>
        <a
          className="v2-header-contact"
          tabIndex={open ? -1 : undefined}
          href="/contact"
        >
          <span>
            {path === "/" ? "Parlons de votre projet" : "Démarrer un projet"}
          </span>
          <i>
            <Arrow diagonal />
          </i>
        </a>
      </header>
      {open && (
        <div
          ref={panel}
          className="v2-menu-panel"
          id="v2-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation principale"
        >
          <nav>
            {navigation.map(([label, href], index) => (
              <a
                href={href}
                key={href}
                aria-current={path === href ? "page" : undefined}
              >
                <small>0{index + 1}</small>
                <span>{label}</span>
                <Arrow diagonal />
              </a>
            ))}
          </nav>
          <aside>
            <span className="v2-kicker">UNE IDÉE EN TÊTE ?</span>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <p>{company.address}</p>
            <a href={company.instagram} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
          </aside>
        </div>
      )}
    </>
  );
}
export function ContactBand() {
  return (
    <section className="v2-contact-band">
      <span className="v2-kicker">VOTRE PROJET COMMENCE ICI</span>
      <h2>
        Quel espace
        <br />
        <em>imaginez-vous ?</em>
      </h2>
      <TextLink href="/contact">Donnons-lui vie ensemble</TextLink>
    </section>
  );
}
const copyrightYear = new Date().getFullYear();
export function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-footer-top">
        <a href="/" aria-label="MultiShift — Accueil">
          <img
            src="/images/multishift-logo.webp"
            width="300"
            height="57"
            alt="MultiShift"
          />
        </a>
        <p>
          De l’imagination à la réalité architecturale.
          <br />
          Visualisation 3D & design d’espaces au Maroc.
        </p>
        <a className="v2-back-top" href="#top">
          Retour en haut ↑
        </a>
      </div>
      <div className="v2-footer-grid">
        <div>
          <span className="v2-kicker">RENCONTRONS-NOUS</span>
          <p>{company.address}</p>
          <p>{company.hours}</p>
        </div>
        <div>
          <span className="v2-kicker">ÉCRIVEZ-NOUS</span>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={`tel:${company.tel}`}>{company.phone}</a>
          <a href={`mailto:${company.secondaryEmail}`}>
            {company.secondaryEmail}
          </a>
        </div>
        <nav aria-label="Navigation de pied de page">
          {navigation.slice(1).map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div>
          <span className="v2-kicker">SUIVEZ LE STUDIO</span>
          <a href={company.instagram} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
        </div>
      </div>
      <div className="v2-footer-bottom">
        <span>© {copyrightYear} MultiShift Studio</span>
        <span>Meknès, Maroc</span>
        <a href="https://multishift.ma/cgu">Conditions générales ↗</a>
        <a href="https://multishift.ma/politique-confidentialite">
          Confidentialité ↗
        </a>
      </div>
    </footer>
  );
}
export function PageIntro({ eyebrow, title, children }) {
  return (
    <header className="v2-page-intro">
      <span className="v2-kicker">{eyebrow}</span>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </header>
  );
}
export function FAQ() {
  return (
    <section className="v2-faq">
      <div>
        <span className="v2-kicker">AVANT DE COMMENCER</span>
        <h2>
          Questions
          <br />
          <em>fréquentes.</em>
        </h2>
        <p>Les informations pratiques pour préparer votre projet.</p>
      </div>
      <div>
        {faq.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <span>+</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
