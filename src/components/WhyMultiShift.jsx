import { site } from "../data/slides";
const projects = [
  [
    "haussmann",
    "Résidence Haussmann",
    "Premium",
    "Façade classique en pierre et balcons ouvragés dans une rue arborée.",
  ],
  [
    "urban",
    "Complexe urbain",
    "Mixte",
    "Architecture contemporaine à usage mixte autour d’une place paysagée.",
  ],
  [
    "athlete",
    "Villa athlète",
    "Résidentiel",
    "Villa contemporaine avec piscine, terrasse et espace de sport.",
  ],
  [
    "penthouse",
    "Penthouse urbain",
    "Luxe",
    "Terrasse panoramique et salon vitré au coucher du soleil.",
  ],
  [
    "estate",
    "Domaine privé",
    "Prestige",
    "Domaine méditerranéen en pierre au milieu des oliviers.",
  ],
  [
    "mall",
    "Centre commercial",
    "Commercial",
    "Atrium commercial lumineux aux galeries courbes.",
  ],
];
function BenefitIcon({ kind }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      {kind === 0 ? (
        <>
          <path d="M5 17V5h12M31 5h12v12M43 31v12H31M17 43H5V31M24 12v24M12 24h24" />
          <rect x="19" y="19" width="10" height="10" />
        </>
      ) : kind === 1 ? (
        <path d="m28 3-21 25h15l-3 17 22-27H26Z" />
      ) : (
        <>
          <path d="m24 4 21 13-21 13L3 17Zm-16 21-5 4 21 13 21-13-5-4M8 33l-5 4 21 11 21-11-5-4" />
        </>
      )}
    </svg>
  );
}
export default function WhyMultiShift() {
  return (
    <section className="why-section" aria-labelledby="why-title">
      <div className="why-copy">
        <span className="section-eyebrow">POURQUOI MULTISHIFT</span>
        <h2 id="why-title">
          Pourquoi choisir
          <br />
          MultiShift
        </h2>
        <p className="why-intro">
          Notre engagement envers l’excellence se reflète dans chaque projet que
          nous réalisons.
        </p>
        <div className="why-benefits">
          {[
            [
              "Chaque pixel compte",
              "Attention méticuleuse aux détails pour des résultats impeccables.",
            ],
            [
              "Livraison rapide sans compromis",
              "Des délais optimisés grâce à nos processus agiles et efficaces.",
            ],
            [
              "Projets qui marquent les esprits",
              "Des visuels qui impressionnent et convertissent vos prospects.",
            ],
          ].map(([title, copy], i) => (
            <article className="why-benefit" key={title}>
              <BenefitIcon kind={i} />
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="typology-area">
        <div className="typology-heading">
          <i />
          <h3>Nos typologies de projets</h3>
          <span />
        </div>
        <div className="typology-grid">
          {projects.map(([id, title, type, alt]) => (
            <a
              href={site + "/portfolio"}
              className="typology-card"
              key={id}
              aria-label={`Découvrir nos projets — ${title}`}
            >
              <img
                src={`/images/typology-${id}.png`}
                alt={alt}
                width="1536"
                height="1024"
                loading="lazy"
                decoding="async"
              />
              <div className="typology-shade" />
              <div className="typology-caption">
                <div>
                  <h4>{title}</h4>
                  <span className="project-type">{type}</span>
                </div>
                <span className="project-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
