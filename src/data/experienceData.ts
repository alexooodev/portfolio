const EXPERIENCES = [
  {
    id: "duoc",
    company: "Duoc UC",
    role: "Lecturer, Cloud Native & Mobile Development",
    period: "2026 - Present",
    location: "Santiago",
    achievements: [
      "Teach Cloud Native Development I: microservices, containers (Docker, Kubernetes), API Gateway (AWS) and Identity as a Service (OAuth2, OIDC, IDaaS/CIAM)",
      "Teach Mobile Application Development: native Android with Kotlin and Jetpack Compose, API consumption with Retrofit, persistence with Room and version control with GitHub",
      "Design and adapt course material, hands-on guides and applied activities for cloud and mobile topics",
      "Selected through a teaching demo class, passing on class delivery, communication skills and classroom climate",
    ],
  },
  {
    id: "meli",
    company: "Mercado Libre",
    role: "Frontend Software Engineer",
    period: "Apr 2023 - Dec 2023",
    location: "Santiago",
    achievements: [
      "Built and optimized a high-traffic admin dashboard used by teams across Latin America and China to manage promotions and campaigns",
      "Took part in migrating the platform to modern, scalable technologies, reducing technical debt",
      "Optimized critical components, improving load times by roughly 15%",
      "Improved maintainability, scalability and code quality",
      "Mentored junior developers, promoting good practices and development standards",
    ],
  },
  {
    id: "fala",
    company: "Falabella Retail",
    role: "Full Stack Engineer",
    period: "Jan 2022 - Mar 2023",
    location: "Santiago",
    achievements: [
      "Helped build a digital assistant for physical stores to improve the customer experience",
      "Developed responsive interfaces in collaboration with UX/UI teams",
      "Implemented product availability lookup, exchange ticket management and self-checkout payment flows",
      "Promoted good practices and development standards within the team",
      "Worked in agile, cross-functional teams",
    ],
  },
  {
    id: "ripley",
    company: "Ripley",
    role: "Junior Full Stack Developer",
    period: "Oct 2020 - Dec 2021",
    location: "Santiago",
    achievements: [
      "Developed and maintained features for a high-traffic e-commerce admin platform",
      "Implemented catalog, inventory and user management functionality",
      "Active member of Scrum teams and continuous improvement processes",
      "Maintained and evolved RipleyUI, a design system built on Material UI",
    ],
  },
];

const SKILLS = [
  {
    category: "Frontend",
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
  {
    category: "Backend & Mobile",
    items: [
      "Node.js",
      "NestJS",
      "Java",
      "Spring Boot",
      "Python",
      "Kotlin",
      "Jetpack Compose",
    ],
  },
  {
    category: "APIs & Testing",
    items: ["REST", "GraphQL", "Jest", "Cypress"],
  },
  {
    category: "Cloud & Tools",
    items: [
      "Google Cloud",
      "AWS (API Gateway, IAM)",
      "Datadog",
      "New Relic",
      "Git",
      "GitHub",
      "GitLab",
      "Jira",
    ],
  },
];

export { EXPERIENCES, SKILLS };
