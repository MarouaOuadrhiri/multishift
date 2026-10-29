import { comparisonProjects } from "../data/comparisonProjects.js";
export const portfolioItems = [
  ...comparisonProjects.map((project) => ({
    ...project,
    image: project.reality,
    type: project.category,
    description:
      project.id === 1
        ? "Une villa contemporaine où les volumes ouverts et la lumière naturelle dessinent une expérience de vie tournée vers le paysage."
        : project.id === 2
          ? "Une atmosphère de bien-être portée par des matières naturelles, une lumière apaisante et des espaces soigneusement composés."
          : project.id === 3
            ? "Des espaces de travail lumineux et structurés, pensés pour la collaboration et une identité architecturale affirmée."
            : project.id === 4
              ? "Un lieu de mouvement et d’énergie, où l’aménagement accompagne les usages et valorise chaque espace."
              : "Une composition paysagère qui prolonge l’architecture et crée un équilibre entre végétation, terrasses et lieux de vie.",
  })),
  {
    id: "boutique",
    title: "Boutique élégante",
    category: "Commercial",
    type: "Intérieur",
    image: "/images/v2-boutique-01.webp",
    description:
      "Étude d’un espace de marque où travertin, bois et lumière donnent une identité forte au parcours client.",
    concept: true,
  },
  {
    id: "terrace",
    title: "Terrasse panoramique",
    category: "Résidentiel",
    type: "Intérieur",
    image: "/images/pillar-terrace-v3.webp",
    description:
      "Une étude d’aménagement de terrasse qui réunit mobilier sur mesure, végétation et lumière de fin de journée.",
    concept: true,
  },
  {
    id: "model",
    title: "Étude 3D",
    category: "3D",
    type: "3D",
    image: "/images/service-model-v4.webp",
    description:
      "Du volume à la matière : une étude de modélisation architecturale et de mobilier sur mesure.",
    concept: true,
  },
];
export const portfolioFilters = [
  "Tous",
  "Résidentiel",
  "Commercial",
  "Intérieur",
  "3D",
];
export const filterPortfolio = (filter) =>
  filter === "Tous"
    ? portfolioItems
    : portfolioItems.filter(
        (item) => item.category === filter || item.type === filter,
      );
export const getProjectImages = (project) =>
  project.render ? [project.reality, project.render] : [project.image];
