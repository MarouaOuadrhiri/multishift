import { useEffect, useRef, useState, useCallback } from "react";
import InteractiveHero from "./InteractiveHero";
import WhyMultiShift from "./WhyMultiShift";
import ProjectComparisons from "./ProjectComparisons";
import { navigation, site } from "../data/slides";

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}

const chapters = [
  {
    label: "L’espace nu",
    caption: "Une toile vierge. Votre vision.",
    detail: "La lumière, les volumes, les matières brutes.",
  },
  {
    label: "L’assemblage",
    caption: "Chaque élément trouve sa place.",
    detail: "Le mobilier s’installe, une pièce après l’autre.",
  },
  {
    label: "Le résultat",
    caption: "L’invisible devient visible.",
    detail: "Comparez la pièce vide et le design achevé.",
  },
  {
    label: "Exploration",
    caption: "Imaginez avant de construire.",
    detail: "Donnez vie à vos projets d’architecture.",
  },
];

export default function Hero() {
  const [activePhase, setActivePhase] = useState(0);
  const [heroCommand, setHeroCommand] = useState(null);
  const commandCounter = useRef(0);
  const [menu, setMenu] = useState(false);
  const heroContainerRef = useRef(null);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!menu) return;
    const close = (e) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);

  // Handle phase change from InteractiveHero
  const handlePhaseChange = useCallback((phase) => {
    setActivePhase(phase);
  }, []);

  const handleReplay = useCallback(() => {
    setActivePhase(0);
    setHeroCommand({ id: ++commandCounter.current, action: "reset" });
  }, []);

  return (
    <main>
      <div className="showroom-journey" ref={heroContainerRef}>
        <section
          className="showroom-hero"
          aria-label="Visite immersive MultiShift : de l’espace vide au design d’intérieur photoréaliste"
        >
          {/* Main Architectural Header */}
          <header className="showroom-header">
            <a href={site} className="brand" aria-label="MultiShift - Accueil">
              <img
                src="/images/multishift-logo.webp"
                alt="MultiShift Logo"
                width="300"
                height="57"
              />
            </a>
            <span className="brand-descriptor">
              ARCHITECTURE
              <br />& VISUALISATION
            </span>
            <nav className="desktop-nav" aria-label="Navigation principale">
              {navigation.map(([label, path]) => (
                <a key={path} href={site + path}>
                  {label}
                </a>
              ))}
            </nav>
            <a href={site + "/contact"} className="nav-project">
              Parlons de votre projet <Arrow />
            </a>
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenu(!menu)}
              aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menu}
              aria-controls="showroom-menu"
            >
              <span>{menu ? "Fermer" : "Menu"}</span>
              {menu ? "−" : "+"}
            </button>
          </header>

          {/* Mobile Overlay Menu */}
          {menu && (
            <nav
              className="showroom-menu"
              id="showroom-menu"
              aria-label="Navigation mobile"
            >
              {navigation.map(([label, path], i) => (
                <a href={site + path} key={path} onClick={() => setMenu(false)}>
                  <small>0{i + 1}</small>
                  {label}
                  <Arrow />
                </a>
              ))}
            </nav>
          )}

          {/* Cinematic Interactive Hero Section */}
          <div className="showroom-frame">
            <InteractiveHero
              onPhaseChange={handlePhaseChange}
              command={heroCommand}
            />

            {/* Subtle Topline Corner Details */}
            <div className="frame-topline" aria-hidden="true">
              <span>
                <i /> L’EXPÉRIENCE MULTISHIFT
              </span>
              <span className="frame-edition">
                TRANSFORMATION INTÉRIEURE / 001
              </span>
            </div>

            {/* Bottom Left Chapter Caption */}
            <div className="experience-caption" aria-live="polite">
              <span className="caption-index">
                0{activePhase + 1}
                <span> / 04</span>
              </span>
              <div key={activePhase}>
                <h2>{chapters[activePhase]?.caption}</h2>
                <p>{chapters[activePhase]?.detail}</p>
              </div>
            </div>

            {/* Bottom Right Concept Badge */}
            <div className="scene-corner" aria-hidden="true">
              <span>ESPACE VIDE</span>
              <span className="corner-arrow">↘</span>
              <span>RÉALITÉ AMÉNAGÉE</span>
            </div>
          </div>

          {/* Bottom Journey Footer Navigation */}
          <footer className="journey-footer">
            <div className="scroll-hint">
              <span className="mouse-icon">
                <i />
              </span>
              <span>
                EXPLOREZ
                <br />
                LA TRANSFORMATION
              </span>
            </div>

            {/* Accessible Chapter Navigation */}
            <nav
              className="chapter-navigation"
              aria-label="Étapes de la visite"
            >
              {chapters.map((chapter, i) => (
                <button
                  type="button"
                  key={chapter.label}
                  className={activePhase === i ? "active" : ""}
                  aria-current={activePhase === i ? "step" : undefined}
                  onClick={() => {
                    if (i === 3) {
                      setActivePhase(3);
                      document
                        .getElementById("studio")
                        ?.scrollIntoView({ behavior: "smooth" });
                    } else
                      setHeroCommand({
                        id: ++commandCounter.current,
                        action: ["reset", "play", "finish"][i],
                      });
                  }}
                >
                  <span>0{i + 1}</span>
                  <span>{chapter.label}</span>
                  <i />
                </button>
              ))}
            </nav>

            {/* Accessible Recommencer la visite button */}
            <button
              type="button"
              className="reset-journey"
              onClick={handleReplay}
              aria-label="Recommencer la visite"
            >
              ↺
            </button>

            {/* Skip journey link */}
            <a className="skip-journey" href="#studio">
              Passer la visite <span>↘</span>
            </a>
          </footer>
        </section>
      </div>

      {/* Second Section: Trois piliers de notre expertise */}
      <section
        className="expertise-section"
        id="studio"
        aria-labelledby="studio-title"
      >
        <div className="expertise-header">
          <div className="expertise-title-col">
            <span className="expertise-eyebrow">NOTRE EXPERTISE</span>
            <h2 id="studio-title" className="expertise-main-title">
              Trois piliers de
              <br />
              notre expertise
            </h2>
          </div>
          <p className="expertise-description">
            Une approche holistique de la visualisation
            <br />
            architecturale, alliant technologie de pointe
            <br />
            et sensibilité artistique.
          </p>
        </div>

        <div className="expertise-grid">
          {/* Pillar 01 */}
          <a
            href={site + "/services"}
            className="expertise-card"
            aria-label="Pilier 01 : Modélisation 3D ultra réaliste"
          >
            <div className="card-bg">
              <picture>
                <img
                  src="/images/expertise-custom-01.png"
                  alt="Modélisation 3D ultra réaliste"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <div className="card-shade" />

            <div className="card-top">
              <span className="card-number-badge">
                <span className="badge-dot" />
                <span className="badge-num">01</span>
              </span>
            </div>

            <div className="card-bottom">
              <div className="card-text-block">
                <h3 className="card-title">Modélisation 3D ultra réaliste</h3>
                <p className="card-subtitle">
                  Créez des visuels photoréalistes qui donnent vie à vos projets
                  avant même le premier coup de pioche.
                </p>
              </div>
              <div className="card-arrow" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>
          </a>

          {/* Pillar 02 */}
          <a
            href={site + "/portfolio"}
            className="expertise-card"
            aria-label="Pilier 02 : Architecture d’intérieur"
          >
            <div className="card-bg">
              <picture>
                <img
                  src="/images/expertise-custom-02.png"
                  alt="Architecture d’intérieur"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <div className="card-shade" />

            <div className="card-top">
              <span className="card-number-badge">
                <span className="badge-dot" />
                <span className="badge-num">02</span>
              </span>
            </div>

            <div className="card-bottom">
              <div className="card-text-block">
                <h3 className="card-title">Architecture d’intérieur</h3>
                <p className="card-subtitle">Chaque détail, chaque ambiance.</p>
              </div>
              <div className="card-arrow" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>
          </a>

          {/* Pillar 03 */}
          <a
            href={site + "/contact"}
            className="expertise-card"
            aria-label="Pilier 03 : Orchestration sans friction"
          >
            <div className="card-bg">
              <picture>
                <img
                  src="/images/expertise-custom-03.png"
                  alt="Orchestration sans friction"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <div className="card-shade" />

            <div className="card-top">
              <span className="card-number-badge">
                <span className="badge-dot" />
                <span className="badge-num">03</span>
              </span>
            </div>

            <div className="card-bottom">
              <div className="card-text-block">
                <h3 className="card-title">Orchestration sans friction</h3>
                <p className="card-subtitle">
                  De la conception à la livraison.
                </p>

                {/* Workflow Pipeline */}
                <div
                  className="card-pipeline"
                  aria-label="Processus : Conception, Production, Validation, Livraison"
                >
                  <div className="pipeline-track">
                    <div className="pipeline-bar" />
                    <div className="pipeline-step">
                      <span className="pipeline-node" />
                      <span className="pipeline-label">Conception</span>
                    </div>
                    <div className="pipeline-step">
                      <span className="pipeline-node" />
                      <span className="pipeline-label">Production</span>
                    </div>
                    <div className="pipeline-step">
                      <span className="pipeline-node" />
                      <span className="pipeline-label">Validation</span>
                    </div>
                    <div className="pipeline-step">
                      <span className="pipeline-node" />
                      <span className="pipeline-label">Livraison</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-arrow" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </section>
      <WhyMultiShift />
      <ProjectComparisons />
    </main>
  );
}
