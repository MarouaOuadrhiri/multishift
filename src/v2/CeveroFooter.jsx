import { company, navigation } from "./content";
import { Arrow } from "./Shared";
export default function CeveroFooter({ path }) {
  return (
    <footer className={`cv-footer ${path === "/" ? "has-callout" : ""}`}>
      {path === "/" && (
        <div className="cv-footer-callout">
          <span className="cv-eyebrow">
            CHAQUE PROJET COMMENCE PAR UNE RENCONTRE
          </span>
          <h2>Créons votre prochain espace.</h2>
          <p>
            Une idée, un projet ou une envie de changement ? Échangeons pour lui
            donner une nouvelle dimension.
          </p>
          <a className="cv-primary-button" href="/contact">
            Parlons de votre projet <Arrow />
          </a>
        </div>
      )}
      <div className="cv-footer-grid">
        <a
          className="cv-footer-brand"
          href="/"
          aria-label="MultiShift — Accueil"
        >
          <img
            src="/images/multishift-logo.webp"
            alt="MultiShift"
            width="300"
            height="57"
          />
          <span>
            Architecture, visualisation
            <br />
            et émotions durables.
          </span>
        </a>
        <nav aria-label="Navigation de pied de page">
          {navigation.slice(1).map(([label, href]) => (
            <a
              href={href}
              key={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <address>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={`tel:${company.tel}`}>{company.phone}</a>
          <span>{company.address}</span>
        </address>
        <a
          href={company.instagram}
          target="_blank"
          rel="noreferrer"
          className="cv-footer-social"
        >
          Instagram <Arrow diagonal />
        </a>
      </div>
      <div className="cv-footer-bottom">
        <span>© 2026 MultiShift Studio. Tous droits réservés.</span>
        <span>
          <a href="https://multishift.ma/cgu">Mentions légales</a>
          <a href="https://multishift.ma/politique-confidentialite">
            Confidentialité
          </a>
          <a href="#top">Retour en haut ↑</a>
        </span>
      </div>
    </footer>
  );
}
