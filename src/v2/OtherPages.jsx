import { useState } from "react";
import {
  company,
  services,
  method,
  craft,
  materials,
  craftProcess,
} from "./content";
import { buildContactMail } from "./contactMail";
import { TextLink, FAQ } from "./Shared";
import {
  InnerPage,
  InnerHero,
  InnerButton,
  InnerCTA,
  Eyebrow,
  LineIcon,
  CompareFigure,
} from "./InnerShared";
import {
  portfolioItems,
  portfolioFilters,
  filterPortfolio,
  getProjectImages,
} from "./portfolioData";

export function PortfolioPage() {
  const [filter, setFilter] = useState("Tous"),
    [selected, setSelected] = useState(portfolioItems[0]),
    [imageIndex, setImageIndex] = useState(0),
    [expanded, setExpanded] = useState(false);
  const visible = filterPortfolio(filter);
  const images = getProjectImages(selected);
  const choose = (item) => {
    setSelected(item);
    setImageIndex(0);
    setExpanded(false);
    requestAnimationFrame(() =>
      document
        .getElementById("project-feature")
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
          block: "start",
        }),
    );
  };
  return (
    <InnerPage className="inner-portfolio">
      <InnerHero
        eyebrow="PORTFOLIO"
        title="Nos projets."
        accent="Notre signature."
        description="Des lieux qui prennent vie avant d’exister. Découvrez une sélection de projets qui illustrent notre approche : une vision sensible, une exigence de réalisme et le souci du détail, au service d’architectures inspirantes."
        image="/images/inner-villa-v5.webp"
        alt="Villa et piscine au coucher du soleil"
      />
      <section
        className="inner-portfolio-gallery"
        aria-label="Sélection de projets"
      >
        <div
          className="inner-filters"
          role="group"
          aria-label="Filtrer les projets"
        >
          {portfolioFilters.map((label) => (
            <button
              key={label}
              aria-pressed={filter === label}
              onClick={() => setFilter(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="inner-project-grid">
          {visible.map((item, index) => (
            <button
              className={`inner-project-card ${filter === "Tous" && index < 2 ? "is-wide" : ""}`}
              key={item.id}
              onClick={() => choose(item)}
              aria-label={`Découvrir ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                width="1200"
                height="900"
                loading="lazy"
              />
              <span className="inner-project-caption">
                <strong>{item.title}</strong>
                <small>
                  {item.category}
                  {item.concept ? " · ÉTUDE CONCEPTUELLE" : ""}
                </small>
              </span>
              <span className="inner-project-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>
        <p className="inner-gallery-note" role="status">
          {visible.length}{" "}
          {visible.length > 1 ? "projets et études" : "projet ou étude"} · Les
          études conceptuelles sont identifiées dans la sélection.
        </p>
      </section>
      <section
        className="inner-featured"
        id="project-feature"
        aria-label="Projet à la une"
      >
        <div className="inner-featured-copy">
          <Eyebrow>PROJET À LA UNE</Eyebrow>
          <h2>{selected.title}</h2>
          <span className="inner-project-type">
            {selected.category} —{" "}
            {selected.concept ? "ÉTUDE CONCEPTUELLE" : "VISUALISATION 3D"}
          </span>
          <p>{selected.description}</p>
          <dl>
            <div>
              <dt>Type de projet</dt>
              <dd>{selected.category}</dd>
            </div>
            <div>
              <dt>Prestations</dt>
              <dd>Modélisation 3D, rendus photoréalistes</dd>
            </div>
            <div>
              <dt>Présentation</dt>
              <dd>
                {selected.concept
                  ? "Illustration de concept"
                  : "Modèle 3D & réalité"}
              </dd>
            </div>
          </dl>
          <button
            className="inner-button is-outline"
            aria-expanded={expanded}
            aria-controls="inner-project-details"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Refermer le projet" : "Voir le projet complet"}
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="inner-featured-gallery">
          <img
            className="inner-featured-main"
            src={images[imageIndex]}
            alt={`${selected.title} — ${imageIndex === 0 ? "vue finale" : "modèle 3D"}`}
            width="1200"
            height="900"
            loading="lazy"
          />
          <div className="inner-featured-thumbs">
            <div>
              {images.map((image, index) => (
                <button
                  key={image}
                  className={imageIndex === index ? "active" : ""}
                  aria-label={`${selected.title} : ${index === 0 ? "vue finale" : "modèle 3D"}`}
                  aria-pressed={imageIndex === index}
                  onClick={() => setImageIndex(index)}
                >
                  <img
                    src={image}
                    alt=""
                    width="200"
                    height="140"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
            {images.length > 1 && (
              <div className="inner-gallery-arrows">
                <button
                  onClick={() =>
                    setImageIndex(
                      (index) => (index + images.length - 1) % images.length,
                    )
                  }
                  aria-label="Vue précédente"
                >
                  ‹
                </button>
                <button
                  onClick={() =>
                    setImageIndex((index) => (index + 1) % images.length)
                  }
                  aria-label="Vue suivante"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
        {expanded && (
          <div className="inner-project-details" id="inner-project-details">
            {selected.render ? (
              <CompareFigure
                before={selected.render}
                after={selected.reality}
                title={selected.title}
              />
            ) : (
              <p>
                Cette image est une étude conceptuelle illustrant notre approche
                de l’aménagement et de la visualisation. Parlons de votre projet
                pour concevoir une proposition sur mesure.
              </p>
            )}
            <InnerButton href="/contact">
              Imaginer un projet similaire
            </InnerButton>
          </div>
        )}
      </section>
      <InnerCTA
        title="Votre projet"
        accent="sera le prochain ?"
        description="Discutons de vos idées et donnons vie ensemble à des espaces extraordinaires."
        large
      />
    </InnerPage>
  );
}
const methodTitles = [
  "Écouter & analyser",
  "Concevoir & modéliser",
  "Visualiser & affiner",
  "Livrer & accompagner",
];
const methodLabels = ["COMPRENDRE", "CRÉER", "SUBLIMER", "FINALISER"];
const methodImages = [
  "/images/inner-meeting-v5.webp",
  "/images/inner-wireframe-v5.webp",
  "/images/inner-villa-v5.webp",
  "/images/typology-athlete.webp",
];
export function MethodPage() {
  return (
    <InnerPage className="inner-method">
      <InnerHero
        eyebrow="MÉTHODOLOGIE"
        title="De l’idée à"
        accent="l’exceptionnel."
        description="Un processus maîtrisé pour transformer vos idées en expériences visuelles inoubliables."
        image="/images/expertise-custom-01.webp"
        alt="Architecture passant du modèle filaire au rendu réaliste"
      />
      <section className="inner-approach" data-reveal>
        <div>
          <Eyebrow>NOTRE APPROCHE</Eyebrow>
          <h2>
            Un processus clair.
            <br />
            <span>Des résultats remarquables.</span>
          </h2>
        </div>
        <p>
          Chez MultiShift, chaque projet suit une méthodologie structurée et
          collaborative, conçue pour garantir créativité, précision et
          efficacité. De la première discussion à la livraison finale, nous vous
          accompagnons à chaque étape avec transparence et exigence.
        </p>
      </section>
      <section
        className="inner-method-steps"
        aria-label="Les quatre étapes de notre méthode"
      >
        {method.map((item, index) => (
          <article className="inner-method-step" key={item.number} data-reveal>
            <div className="inner-step-rail">
              <strong>{item.number}</strong>
              <i />
            </div>
            <div className="inner-step-copy">
              <Eyebrow>{methodLabels[index]}</Eyebrow>
              <h2>{methodTitles[index]}</h2>
              <p>{item.description}</p>
              <span className="inner-step-source">{item.title}</span>
              <ul>
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
            <figure>
              <img
                src={methodImages[index]}
                alt={`${methodTitles[index]} : ${item.title}`}
                width="1536"
                height="1024"
                loading="lazy"
              />
              <figcaption>
                {
                  [
                    "ÉCOUTE\nCONSEIL\nVISION COMMUNE",
                    "PLANS\nMODÉLISATION\nMISE EN SCÈNE",
                    "MATIÈRES\nLUMIÈRE\nDÉTAILS",
                    "IMAGES FINALES\nEXPÉRIENCE\nVALEUR AJOUTÉE",
                  ][index]
                }
              </figcaption>
            </figure>
          </article>
        ))}
      </section>
      <section className="inner-process-overview" data-reveal>
        <div>
          <Eyebrow>VUE D’ENSEMBLE</Eyebrow>
          <h2>
            Les grandes étapes
            <br />
            <span>de votre projet.</span>
          </h2>
        </div>
        <ol>
          {[
            ["plan", "Brief", "Écoute et analyse de vos besoins"],
            ["cube", "Conception", "Modélisation et premières propositions"],
            ["check", "Validation", "Allers-retours et ajustements"],
            ["send", "Livraison", "Rendus finaux et accompagnement"],
          ].map(([icon, title, description]) => (
            <li key={title}>
              <i>
                <LineIcon type={icon} />
              </i>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="inner-collaboration" data-reveal>
        <img
          src="/images/inner-meeting-v5.webp"
          alt="Échange entre architectes autour d’une visualisation"
          width="1536"
          height="1024"
          loading="lazy"
        />
        <div>
          <Eyebrow>COLLABORATION</Eyebrow>
          <h2>
            Un processus collaboratif
            <br />
            <span>et flexible.</span>
          </h2>
          <p>
            Votre avis guide chaque étape. Nous travaillons en étroite
            collaboration avec vous, avec des points de validation réguliers et
            les révisions prévues dans votre devis pour garantir un résultat en
            parfaite adéquation avec vos attentes.
          </p>
          <ul>
            <li>
              <LineIcon type="chat" />
              Échanges réguliers et transparents
            </li>
            <li>
              <LineIcon type="check" />
              Révisions selon votre offre
            </li>
            <li>
              <LineIcon type="send" />
              Une équipe créative à votre écoute
            </li>
          </ul>
        </div>
      </section>
      <InnerCTA />
    </InnerPage>
  );
}

const craftFeatures = [
  {
    title: "Photoréalisme",
    accent: "& lumière",
    eyebrow: "NOTRE EXPERTISE",
    description:
      "Nous maîtrisons la lumière comme un matériau à part entière. Chaque rendu recrée des ambiances naturelles et crédibles, du lever au coucher du soleil, pour des images qui suscitent l’émotion.",
    image: "/images/service-property-v4.webp",
    tags: [
      "Éclairage naturel",
      "Ambiances réalistes",
      "HDRI sur mesure",
      "Post-production cinéma",
    ],
  },
  {
    title: "Matières",
    accent: "& textures",
    eyebrow: "LE SENS DU RÉEL",
    description:
      "Pierre, bois, métal, verre… nous recréons des matériaux physiquement justes, avec leurs imperfections, leurs reflets et leur comportement face à la lumière, pour un rendu d’un réalisme saisissant.",
    image: "/images/inner-materials-v5.webp",
    tags: [
      "Matériaux physiques",
      "Détails haute résolution",
      "Bibliothèque sur mesure",
      "Finitions premium",
    ],
  },
  {
    title: "Architecture",
    accent: "& précision",
    eyebrow: "LA BASE DE TOUT",
    description:
      "Une modélisation rigoureuse et optimisée, fidèle aux plans et aux intentions architecturales. Chaque détail compte, pour des images justes, maîtrisées et exploitables à toutes les étapes du projet.",
    image: "/images/service-model-v4.webp",
    tags: [
      "Modélisation BIM / 3D",
      "Précision architecturale",
      "Détails constructifs",
      "Vues techniques & artistiques",
    ],
  },
  {
    title: "Cinématique",
    accent: "& atmosphère",
    eyebrow: "DONNER VIE AUX ESPACES",
    description:
      "Nous concevons des animations et des images séquentielles qui révèlent la vie des lieux : mouvements, lumière, matières, ambiance. Des récits visuels immersifs pour ressentir pleinement le projet.",
    image: "/images/inner-villa-v5.webp",
    tags: [
      "Animations 3D",
      "Réalisation vidéo",
      "Ambiances narratives",
      "Expériences immersives",
    ],
  },
];
export function CraftPage() {
  return (
    <InnerPage className="inner-craft">
      <InnerHero
        eyebrow="SAVOIR-FAIRE"
        title="L’art du détail."
        accent={
          <>
            La maîtrise
            <br />
            du réel.
          </>
        }
        description="Du trait à la matière, nous donnons vie à des espaces qui n’existent pas encore. Une exigence de précision, au service d’images sincères, sensibles et puissantes."
        image="/images/expertise-custom-01.webp"
        alt="Architecture filaire révélant ses matériaux et sa lumière"
      />
      <section
        className="inner-craft-features"
        aria-label="Notre maîtrise technique"
      >
        {craftFeatures.map((item, index) => (
          <article
            className={`inner-craft-row ${index % 2 ? "is-reversed" : ""}`}
            key={item.title}
            data-reveal
          >
            <figure>
              <img
                src={item.image}
                alt={`${item.title} ${item.accent}`}
                width="1536"
                height="1024"
                loading="lazy"
              />
              {index === 1 && (
                <div className="inner-material-swatches" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              )}
            </figure>
            <div className="inner-craft-copy">
              <div className="inner-craft-number">
                <span>0{index + 1}</span>
                <Eyebrow>{item.eyebrow}</Eyebrow>
              </div>
              <h2>
                {item.title}
                <br />
                <span>{item.accent}</span>
              </h2>
              <p>{item.description}</p>
              <ul className="inner-tags">
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <section className="inner-before-after" data-reveal>
        <div>
          <Eyebrow>DU PLAN À L’ÉMOTION</Eyebrow>
          <h2>
            Avant
            <br />
            <span>Après.</span>
          </h2>
          <p>
            Même projet, deux visions. Du modèle 3D au résultat final, notre
            savoir-faire transforme les données techniques en images de vie,
            fidèles et inspirantes.
          </p>
        </div>
        <CompareFigure
          before="/projects/project1-render.webp"
          after="/projects/project1-reality.webp"
          title="Villa Horizon"
        />
      </section>
      <section className="inner-craft-global" data-reveal>
        <Eyebrow>NOTRE MAÎTRISE</Eyebrow>
        <div>
          <h2>
            Un savoir-faire
            <br />
            <span>global.</span>
          </h2>
          <p>
            De la modélisation à la post-production, nous maîtrisons toute la
            chaîne de création pour des rendus d’exception, au service de vos
            projets.
          </p>
        </div>
        <ul>
          {[
            ["cube", "Modélisation 3D"],
            ["spark", "Textures & matériaux"],
            ["sun", "Éclairage & rendu"],
            ["plan", "Animation & vidéo"],
            ["check", "Post-production"],
            ["chat", "Conseil artistique"],
          ].map(([icon, label]) => (
            <li key={label}>
              <LineIcon type={icon} />
              {label}
            </li>
          ))}
        </ul>
      </section>
      <section className="inner-craft-heritage">
        <details>
          <summary>
            Notre héritage : matières et artisanat marocain <span>+</span>
          </summary>
          <div className="inner-heritage-grid">
            {craft.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
            {materials.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>{item.details}</small>
              </article>
            ))}
            {craftProcess.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </details>
      </section>
      <InnerCTA
        title="Explorer"
        accent="nos services."
        description="Découvrez comment notre savoir-faire prend vie dans des projets concrets, de la conception à la livraison."
        image="/images/typology-athlete.webp"
      />
    </InnerPage>
  );
}

export function ContactPage() {
  const initial =
    typeof window === "undefined"
      ? ""
      : new URLSearchParams(window.location.search).get("service") || "";
  const [status, setStatus] = useState("");
  const submit = (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    window.location.href = buildContactMail(values);
    setStatus(
      "Votre demande est préparée dans votre messagerie. Vérifiez-la avant de l’envoyer.",
    );
  };
  return (
    <InnerPage className="inner-contact">
      <InnerHero
        eyebrow="CONTACT"
        title={
          <>
            Donnons vie
            <br />à votre
          </>
        }
        accent="projet."
        inlineAccent
        description="Des visualisations architecturales au service de vos idées. Parlons de votre projet et imaginons ensemble ce qui est possible."
        image="/images/v2-project-desk.webp"
        alt="Maquette architecturale et plans dans un atelier de conception"
      />
      <section className="inner-contact-body">
        <div className="inner-contact-form-panel">
          <Eyebrow>PRENONS CONTACT</Eyebrow>
          <h2>Votre projet commence ici.</h2>
          <p className="inner-contact-intro">
            Remplissez ce formulaire et décrivez-nous votre projet. Nous vous
            répondons sous 48h avec une première analyse et des pistes adaptées
            à vos besoins.
          </p>
          <form onSubmit={submit}>
            <label>
              Nom complet <span>*</span>
              <input
                name="name"
                autoComplete="name"
                required
                placeholder="Votre nom complet"
              />
            </label>
            <label>
              Adresse e-mail <span>*</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="votre@email.com"
              />
            </label>
            <label>
              Téléphone
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+212 7 21 21 51 80"
              />
            </label>
            <label>
              Type de projet <span>*</span>
              <select
                name="service"
                required
                defaultValue={
                  services.some((item) => item.id === initial) ? initial : ""
                }
              >
                <option value="" disabled>
                  Sélectionnez un type de projet
                </option>
                {services.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
                <option value="autre">Autre projet / À définir ensemble</option>
              </select>
            </label>
            <label>
              Parlez-nous de votre projet <span>*</span>
              <textarea
                name="message"
                required
                minLength={15}
                rows={5}
                placeholder="Décrivez votre projet, vos objectifs, le contexte, le style souhaité, les délais…"
              />
            </label>
            <button type="submit" className="inner-button">
              Préparer ma demande <span aria-hidden="true">→</span>
            </button>
            <p className="inner-form-privacy">
              <LineIcon type="check" />
              Vos informations sont confidentielles.
            </p>
            <p className="inner-form-note">
              Votre messagerie s’ouvre avec la demande préparée. Aucun envoi
              n’est effectué avant votre validation.
            </p>
            {status && (
              <p role="status" className="inner-form-status">
                {status}
              </p>
            )}
          </form>
        </div>
        <aside className="inner-contact-coordinates">
          <Eyebrow>NOS COORDONNÉES</Eyebrow>
          <h2>Parlons de votre vision.</h2>
          <p>
            Une question, un projet ou simplement l’envie d’échanger ?<br />
            Nous sommes à votre écoute.
          </p>
          <ul>
            {[
              [
                "mail",
                company.email,
                "Écrivez-nous à tout moment",
                `mailto:${company.email}`,
              ],
              ["phone", company.phone, company.hours, `tel:${company.tel}`],
              [
                "pin",
                company.address,
                "Sur rendez-vous",
                "https://www.openstreetmap.org/search?query=Quartier%20Hamria%20Meknes",
              ],
              [
                "clock",
                "Réponse sous 48h",
                "Nous revenons vers vous rapidement",
                null,
              ],
            ].map(([icon, title, note, href]) => (
              <li key={title}>
                <LineIcon type={icon} />
                <div>
                  {href ? <a href={href}>{title}</a> : <strong>{title}</strong>}
                  <small>{note}</small>
                </div>
              </li>
            ))}
          </ul>
          <div className="inner-contact-map">
            <iframe
              title="Carte de Meknès, Maroc"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-5.58%2C33.87%2C-5.52%2C33.92&layer=mapnik"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div>
              <span>
                MEKNÈS
                <br />
                MAROC
              </span>
              <small>
                Quartier Hamria
                <br />
                Sur rendez-vous
              </small>
              <a
                href="https://www.openstreetmap.org/search?query=Quartier%20Hamria%20Meknes"
                target="_blank"
                rel="noreferrer"
              >
                Ouvrir le plan ↗
              </a>
            </div>
          </div>
        </aside>
      </section>
      <section className="inner-contact-process" data-reveal>
        <header>
          <div>
            <Eyebrow>PROCESSUS</Eyebrow>
            <h2>Comment ça se passe ?</h2>
          </div>
          <p>
            Un processus simple et efficace pour donner vie à votre projet,
            <br />
            de la première prise de contact à la proposition sur mesure.
          </p>
        </header>
        <div>
          {[
            [
              "plan",
              "Brief",
              "Vous nous partagez les grandes lignes de votre projet, vos besoins et vos attentes.",
            ],
            [
              "chat",
              "Échange",
              "Nous discutons ensemble pour bien comprendre vos objectifs, le contexte et les contraintes.",
            ],
            [
              "cube",
              "Proposition",
              "Vous recevez une proposition personnalisée avec une approche créative et un devis détaillé.",
            ],
          ].map(([icon, title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <LineIcon type={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <InnerCTA
        title={
          <>
            Des idées
            <br />
            aux espaces
          </>
        }
        accent="réels."
        description="Visualisons ensemble le potentiel de votre projet. Contactez-nous dès aujourd’hui."
        large
      />
      <div className="inner-contact-faq">
        <FAQ />
      </div>
    </InnerPage>
  );
}
export function NotFoundPage() {
  return (
    <section className="v2-not-found">
      <span className="v2-kicker">404 / PAGE INTROUVABLE</span>
      <h1>
        Reprenons
        <br />
        <em>le bon chemin.</em>
      </h1>
      <TextLink href="/">Retour à l’accueil</TextLink>
    </section>
  );
}
