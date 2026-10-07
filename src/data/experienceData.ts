// Datos que no cambian con el idioma. Los textos traducibles viven en src/i18n.
export type ExperienceId = "duoc" | "meli" | "fala" | "ripley";
export type SkillCategoryId = "frontend" | "backend" | "apis" | "cloud";

export const EXPERIENCES: { id: ExperienceId; company: string; location: string }[] = [
  { id: "duoc", company: "Duoc UC", location: "Santiago" },
  { id: "meli", company: "Mercado Libre", location: "Santiago" },
  { id: "fala", company: "Falabella Retail", location: "Santiago" },
  { id: "ripley", company: "Ripley", location: "Santiago" },
];

export const SKILLS: { id: SkillCategoryId; items: string[] }[] = [
  {
    id: "frontend",
    items: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Material UI",
      "Vite",
      "Webpack",
    ],
  },
  { id: "backend", items: ["Node.js", "NestJS", "Java", "Spring Boot", "Python", "Kotlin", "Jetpack Compose"] },
  { id: "apis", items: ["REST", "GraphQL", "Jest", "Cypress"] },
  {
    id: "cloud",
    items: ["Google Cloud", "AWS (API Gateway, IAM)", "Datadog", "New Relic", "Git", "GitHub", "GitLab", "Jira"],
  },
];
