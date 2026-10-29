import { useState } from "react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import { site } from "../data/slides";
import {
  comparisonProjects,
  projectFilters,
  filterProjects,
} from "../data/comparisonProjects";
import "./ProjectComparisons.css";

function ComparisonCard({ project, index, total }) {
  const [reality, setReality] = useState(false);
  const [realityLoaded, setRealityLoaded] = useState(false);
  const shown = reality && realityLoaded;
  return (
    <article
      className={`comparison-card ${shown ? "shows-reality" : ""}`}
      aria-labelledby={`comparison-title-${project.id}`}
    >
      <div
        className="project-comparison"
        onPointerEnter={(e) => {
          if (e.pointerType !== "touch") setReality(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType !== "touch") setReality(false);
        }}
      >
        <div className="comparison-photo render-photo" aria-hidden={shown}>
          <img
            className="comparison-blur"
            src={project.render}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <img
            src={project.render}
            className="comparison-main"
            alt={`Modèle 3D — ${project.title}`}
            width="1024"
            height="1024"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="comparison-photo reality-photo" aria-hidden={!shown}>
          <img
            className="comparison-blur"
            src={project.reality}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <img
            src={project.reality}
            className="comparison-main"
            onLoad={() => setRealityLoaded(true)}
            alt={`Réalité — ${project.title}`}
            width="1024"
            height="1024"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="comparison-image-top" aria-hidden="true">
          <span className={!shown ? "selected" : ""}>MODÈLE 3D</span>
          <i />
          <span className={shown ? "selected" : ""}>RÉALITÉ</span>
        </div>
        <button
          type="button"
          className="comparison-toggle"
          aria-label={`${shown ? "Afficher le modèle 3D" : "Afficher la réalité"} de ${project.title}`}
          aria-pressed={shown}
          onClick={() => setReality((value) => !value)}
        >
          <span>
            {reality && !realityLoaded
              ? "Préparation de la réalité…"
              : shown
                ? "Voir le modèle 3D"
                : "Révéler la réalité"}
          </span>
          <span aria-hidden="true">{shown ? "↶" : "↗"}</span>
        </button>
      </div>
      <div className="comparison-details">
        <span className="comparison-index">
          {String(index + 1).padStart(2, "0")}
          <small> / {String(total).padStart(2, "0")}</small>
        </span>
        <div className="comparison-details-main">
          <span className="comparison-category">{project.category}</span>
          <h3 id={`comparison-title-${project.id}`}>{project.title}</h3>
          <div className="comparison-small-rule" />
          <p>
            Du modèle à l’espace.
            <br />
            Une vision qui prend forme.
          </p>
        </div>
        <span className="comparison-footnote">
          MULTISHIFT STUDIO <span aria-hidden="true">↗</span>
        </span>
      </div>
    </article>
  );
}
export default function ProjectComparisons() {
  const [filter, setFilter] = useState("Tous");
  const projects = filterProjects(filter);
  return (
    <section
      className="comparison-section"
      id="projets"
      aria-labelledby="comparison-heading"
    >
      <header className="comparison-section-header">
        <div>
          <span className="section-eyebrow">LA VISION, PUIS L’ÉVIDENCE.</span>
          <h2 id="comparison-heading">
            3D <span>vs</span> Réalité<span className="heading-period">.</span>
          </h2>
        </div>
        <div className="comparison-intro">
          <p>
            Survolez les images pour voir
            <br />
            la magie opérer.
          </p>
          <small>Sur mobile, touchez « Révéler la réalité ».</small>
        </div>
      </header>
      <div className="comparison-toolbar">
        <div
          className="comparison-filters"
          role="group"
          aria-label="Filtrer les projets"
        >
          {projectFilters.map((category) => (
            <button
              key={category}
              type="button"
              className={filter === category ? "active" : ""}
              aria-pressed={filter === category}
              aria-controls="comparison-results"
              onClick={() => setFilter(category)}
            >
              {category}
              <small>{filterProjects(category).length}</small>
            </button>
          ))}
        </div>
        <span className="comparison-total" aria-live="polite">
          {String(projects.length).padStart(2, "0")} /{" "}
          {String(comparisonProjects.length).padStart(2, "0")} PROJETS
        </span>
      </div>
      <div id="comparison-results" className="comparison-results">
        {projects.length ? (
          <ScrollStack
            key={filter}
            className="project-scroll-stack"
            useWindowScroll
            smoothScroll={false}
            itemDistance={72}
            itemStackDistance={18}
            stackPosition="7%"
            itemScale={0.025}
            baseScale={0.88}
            dimAmount={0.13}
            holdDistance={80}
          >
            {projects.map((project, index) => (
              <ScrollStackItem
                itemClassName="project-stack-item"
                key={project.id}
              >
                <ComparisonCard
                  project={project}
                  index={index}
                  total={projects.length}
                />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        ) : (
          <div className="comparison-empty" role="status">
            <span>PUBLIC</span>
            <h3>Aucun projet public dans cette sélection.</h3>
            <p>Retrouvez toutes nos réalisations dans le portfolio.</p>
            <button type="button" onClick={() => setFilter("Tous")}>
              Afficher les cinq projets <span>↗</span>
            </button>
          </div>
        )}
      </div>
      <footer className="comparison-section-footer">
        <p>Chaque projet commence par une vision.</p>
        <a className="portfolio-button" href={site + "/portfolio"}>
          <span>Voir tous les projets</span>
          <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </section>
  );
}
