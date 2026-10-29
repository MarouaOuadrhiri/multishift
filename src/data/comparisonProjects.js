export const comparisonProjects = [
  {
    id: 1,
    title: "Villa Horizon",
    category: "Résidentiel",
    render: "/projects/project1-render.webp",
    reality: "/projects/project1-reality.webp",
  },
  {
    id: 2,
    title: "Oasis Spa & Wellness",
    category: "Commercial",
    render: "/projects/project2-render.webp",
    reality: "/projects/project2-reality.webp",
  },
  {
    id: 3,
    title: "Nexus Office Center",
    category: "Commercial",
    render: "/projects/project3-render.webp",
    reality: "/projects/project3-reality.webp",
  },
  {
    id: 4,
    title: "Urban Fit Gym",
    category: "Commercial",
    render: "/projects/project4-render.webp",
    reality: "/projects/project4-reality.webp",
  },
  {
    id: 5,
    title: "Villa Exterior Landscaping",
    category: "Résidentiel",
    render: "/projects/project5-render.webp",
    reality: "/projects/project5-reality.webp",
  },
];
export const projectFilters = ["Tous", "Résidentiel", "Commercial", "Public"];
export const filterProjects = (category) =>
  category === "Tous"
    ? comparisonProjects
    : comparisonProjects.filter((project) => project.category === category);
