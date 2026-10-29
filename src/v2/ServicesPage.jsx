import { services } from "./content";
import {
  InnerPage,
  InnerHero,
  InnerButton,
  InnerCTA,
  LineIcon,
  Eyebrow,
} from "./InnerShared";
const serviceImages = [
  "/images/inner-villa-v5.webp",
  "/images/service-model-v4.webp",
  "/images/service-property-v4.webp",
  "/images/inner-meeting-v5.webp",
];
const serviceAlts = [
  "Villa contemporaine au bord d’une piscine au crépuscule",
  "Maquette architecturale de boutique partiellement en filaire",
  "Penthouse aménagé pour une présentation immobilière",
  "Équipe de conception échangeant autour de plans et d’une maquette",
];
const subtitles = [
  "Des rendus qui donnent vie à vos projets",
  "Des bases solides pour des projets exceptionnels",
  "Des espaces qui inspirent et valorisent",
  "Un accompagnement à chaque étape",
];
const advantages = [
  [
    "spark",
    "Un rendu d’exception",
    "Des visuels photoréalistes qui font la différence.",
  ],
  ["chat", "Une équipe passionnée", "Des experts à l’écoute de vos ambitions."],
  [
    "pin",
    "Un accompagnement complet",
    "De l’idée à la réalisation, en toute sérénité.",
  ],
  [
    "plan",
    "Des résultats concrets",
    "Des projets qui valorisent votre image et vos investissements.",
  ],
];
export default function ServicesPage() {
  return (
    <InnerPage className="inner-services">
      <InnerHero
        eyebrow="NOS SERVICES"
        title={
          <>
            Des services
            <br />
            sur mesure pour
          </>
        }
        accent="vos ambitions"
        description="De la première idée aux rendus finaux, nous vous accompagnons avec une expertise complète en visualisation architecturale et en stratégie immobilière."
        image="/images/inner-villa-v5.webp"
        alt="Villa contemporaine en béton et verre au bord d’une piscine"
        serif
      >
        <a className="inner-discover" href="#nos-services">
          <span>↓</span>Découvrir nos services
        </a>
      </InnerHero>
      <section className="inner-stats" aria-label="MultiShift en chiffres">
        {[
          [
            "cube",
            "57+",
            "Projets livrés",
            "DES CONCEPTS QUI DEVIENNENT RÉALITÉ",
          ],
          ["chat", "98%", "Satisfaction client", "UNE CONFIANCE DURABLE"],
          ["sun", "48h", "Réponse à votre demande", "RÉACTIVITÉ ET ENGAGEMENT"],
          ["pin", "12", "Villes et pays", "AU MAROC ET À L’INTERNATIONAL"],
        ].map(([icon, value, label, note]) => (
          <div key={label}>
            <LineIcon type={icon} />
            <p>
              <strong>{value}</strong>
              <span>{label}</span>
              <small>{note}</small>
            </p>
          </div>
        ))}
      </section>
      <section
        className="inner-service-list"
        id="nos-services"
        aria-label="Nos quatre services"
      >
        {services.map((service, index) => (
          <article
            className={`inner-service-row ${index % 2 ? "is-reversed" : ""}`}
            key={service.id}
            id={service.id}
            data-reveal
          >
            <div className="inner-service-copy">
              <span className="inner-number-small">{service.number}</span>
              <h2>{service.title}</h2>
              <span className="inner-service-subtitle">{subtitles[index]}</span>
              <p>{service.description}</p>
              <ul>
                {service.features.map((feature) => (
                  <li key={feature}>
                    <span>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <details className="inner-deliverables">
                <summary>
                  Livrables inclus <span>+</span>
                </summary>
                <ul>
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
              <InnerButton href={`/contact?service=${service.id}`}>
                Demander un devis
              </InnerButton>
            </div>
            <figure className="inner-service-image">
              <img
                src={serviceImages[index]}
                alt={serviceAlts[index]}
                width="1536"
                height="1024"
                loading="lazy"
              />
              <figcaption>
                {
                  [
                    "UNE LUMIÈRE\nQUI RÉVÈLE\nAVANT LE RÉEL",
                    "DU CONCEPT\nAU DÉTAIL\nUNE MODÉLISATION SANS LIMITES",
                    "DES INTÉRIEURS\nQUI RACONTENT\nDES HISTOIRES",
                    "UNE VISION CLAIRE\nUN SUIVI PRÉCIS\nDES RÉSULTATS CONCRETS",
                  ][index]
                }
              </figcaption>
            </figure>
          </article>
        ))}
      </section>
      <section className="inner-advantages" data-reveal>
        <Eyebrow>NOS AVANTAGES</Eyebrow>
        <h2>Pourquoi choisir MultiShift ?</h2>
        <div>
          {advantages.map(([icon, title, text]) => (
            <article key={title}>
              <LineIcon type={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <InnerCTA
        title="Parlons-en dès maintenant"
        accent=""
        description="Que vous ayez une idée précise ou simplement l’envie d’explorer des possibilités, notre équipe est là pour vous conseiller et vous accompagner."
      />
    </InnerPage>
  );
}
