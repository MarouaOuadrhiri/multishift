import CeveroHero from "./CeveroHero";
import MovingGallery from "./MovingGallery";
import ExpertisePillars from "./ExpertisePillars";
import WhyChooseSection from "./WhyChooseSection";
import { Arrow, TextLink, FAQ } from "./Shared";

const featuredProjects = [
  {
    name: "Villa Horizon",
    category: "Résidentiel",
    image: "/projects/project1-reality.webp",
  },
  {
    name: "Oasis Spa & Wellness",
    category: "Commercial",
    image: "/projects/project2-reality.webp",
  },
  {
    name: "Nexus Office Center",
    category: "Commercial",
    image: "/projects/project3-reality.webp",
  },
  {
    name: "Boutique de mode",
    category: "Étude d’intérieur",
    image: "/images/v2-boutique-02.webp",
  },
];
export default function HomePage() {
  return (
    <>
      <CeveroHero />
      <section
        className="cv-featured-projects"
        aria-label="Une sélection de nos projets"
      >
        {featuredProjects.map((project) => (
          <a
            className="cv-project-preview"
            href="/portfolio"
            key={project.name}
          >
            <div>
              <img
                src={project.image}
                alt={project.name}
                width="1200"
                height="800"
                loading="lazy"
              />
            </div>
            <span>
              <strong>{project.name}</strong>
              <small>{project.category}</small>
            </span>
            <i>
              <Arrow diagonal />
            </i>
          </a>
        ))}
      </section>
      <MovingGallery />
      <ExpertisePillars />
      <section className="cv-craft-editorial" aria-labelledby="cv-craft-title">
        <div className="cv-craft-lead">
          <span className="v2-kicker">LE SENS DU DÉTAIL</span>
          <h2 id="cv-craft-title">
            La matière inspire.
            <br />
            Le détail fait
            <br />
            la différence.
          </h2>
          <p>
            Une lumière juste, une texture qui se révèle, un volume qui respire.
            Notre savoir-faire donne à chaque espace sa propre personnalité.
          </p>
          <img
            src="/images/pillar-riad-v3.webp"
            alt="Détails d’un intérieur marocain contemporain"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <TextLink href="/savoir-faire">Découvrir notre savoir-faire</TextLink>
        </div>
        <div className="cv-craft-composition">
          <h2>
            Votre vision,
            <br />
            dans ses moindres
            <br />
            détails.
          </h2>
          <img
            src="/images/inner-materials-v5.webp"
            alt="Travertin, noyer, marbre et laiton pour une palette de matériaux sur mesure"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <div className="cv-floating-note">
            <h3>L’art de composer</h3>
            <p>
              Des matières authentiques et des choix précis pour créer une
              harmonie qui dure.
            </p>
          </div>
        </div>
      </section>
      <WhyChooseSection />
      <section className="cv-image-banner">
        <img
          src="/images/v2-boutique-03.webp"
          alt="Architecture intérieure d’un concept store en marbre et bronze"
          width="1672"
          height="941"
          loading="lazy"
        />
        <div>
          <span className="cv-eyebrow">AU-DELÀ DE L’IMAGE</span>
          <h2>
            Des lieux à vivre.
            <br />
            Des émotions à partager.
          </h2>
          <p>
            Nous imaginons des expériences visuelles qui révèlent le potentiel
            de votre projet, avant même qu’il prenne vie.
          </p>
          <a href="/portfolio" className="cv-primary-button">
            Voir nos réalisations <Arrow />
          </a>
        </div>
      </section>
      <FAQ />
    </>
  );
}
