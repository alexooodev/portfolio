/** Textos del sitio en inglés. `es.ts` debe tener exactamente la misma forma (lo exige el tipo `Messages`). */
export const en = {
  meta: { title: "Alex Silva | Software Engineer" },

  nav: {
    home: "Home",
    projects: "Projects",
    experience: "Experience",
    skills: "Skills",
    about: "About",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    languageNames: { en: "English", es: "Español" },
  },

  hero: {
    headline: "Software engineer building",
    headlineAccent: "scalable web platforms",
    summary:
      "From React and Next.js interfaces to Node.js and Java services in the cloud, for high-traffic e-commerce used by millions of people across Latin America. I care about maintainable code, performance and working well across teams.",
    getInTouch: "Get in Touch",
    viewWork: "View Work",
  },

  projects: {
    heading: "Featured",
    headingAccent: "Project",
    eyebrow: "AI · Retrieval-augmented generation",
    description:
      "A study assistant for the AWS Cloud Practitioner exam. Ask a question and get an answer grounded in the official documentation, with every claim linked to its source. When the evidence isn't there, it says so.",
    highlights: [
      {
        title: "Retrieval pipeline",
        text: "Chunking, bge-m3 embeddings and pgvector similarity search over the official docs.",
      },
      {
        title: "Cited answers",
        text: "Streamed over SSE. Every [n] citation is checked against the sources actually retrieved.",
      },
      {
        title: "Knows when it doesn't know",
        text: "Below a relevance threshold it declines to answer instead of guessing.",
      },
      {
        title: "Free to explore",
        text: "The demo replays real recorded sessions, so visitors never spend model quota.",
      },
    ],
    comingSoon: "Live demo coming soon",
    comingSoonHint: "Recorded sessions will appear here.",
    loadingDemo: "Loading demo…",
  },

  demo: {
    recordedBadge: "Recorded sessions",
    loadingQuestions: "Loading example questions",
    loadQuestionsFailed: "Couldn't load the example questions.",
    tryAgain: "Try again",
    noSessions: "No recorded sessions yet.",
    emptyHint: "Pick a question above to see a cited answer, built from the official docs.",
    stop: "Stop",
    clear: "Clear",
    haveCode: "I have an invitation code",
    liveNotice: "Live questions run a real model, need an invitation code and are rate-limited.",
    codeLabel: "Invitation code",
    codePlaceholder: "Code",
    questionLabel: "Your question",
    questionPlaceholder: "Ask your own question…",
    askLive: "Ask live",
    errors: {
      needsCode: "Live questions need an invitation code. Pick one of the example questions instead.",
      badCode: "That invitation code didn't work, or live mode is switched off.",
      notFound: "That recorded session is no longer available.",
      badLength: "The question must be between 3 and 500 characters.",
      network: "Couldn't reach the Cert Copilot API. Try again in a moment.",
      closed: "The connection closed before the answer finished.",
    },
    turn: {
      questionAria: "Question:",
      retry: "Retry",
      searching: "Searching the docs…",
      stopped: "Stopped.",
      noCitations: "This answer has no citations. Treat it with caution.",
      invalidCitations: "It cites sources that don't exist",
      live: "Live",
      recorded: "Recorded session",
      originallyAnswered: "originally answered in",
      topMatch: "top match",
    },
    sources: {
      heading: "Sources",
      untitled: "Untitled section",
      match: "match",
      similarityHint: "Cosine similarity to the question",
      open: "Open in the official docs",
      show: "Show source",
      missing: "This source doesn't exist",
    },
  },

  experience: {
    heading: "Work",
    headingAccent: "Experience",
    items: {
      duoc: {
        role: "Lecturer, Cloud Native & Mobile Development",
        period: "2026 - Present",
        achievements: [
          "Teach Cloud Native Development I: microservices, containers (Docker, Kubernetes), API Gateway (AWS) and Identity as a Service (OAuth2, OIDC, IDaaS/CIAM)",
          "Teach Mobile Application Development: native Android with Kotlin and Jetpack Compose, API consumption with Retrofit, persistence with Room and version control with GitHub",
          "Design and adapt course material, hands-on guides and applied activities for cloud and mobile topics",
          "Selected through a teaching demo class, passing on class delivery, communication skills and classroom climate",
        ],
      },
      meli: {
        role: "Frontend Software Engineer",
        period: "Apr 2023 - Dec 2023",
        achievements: [
          "Built and optimized a high-traffic admin dashboard used by teams across Latin America and China to manage promotions and campaigns",
          "Took part in migrating the platform to modern, scalable technologies, reducing technical debt",
          "Optimized critical components, improving load times by roughly 15%",
          "Improved maintainability, scalability and code quality",
          "Mentored junior developers, promoting good practices and development standards",
        ],
      },
      fala: {
        role: "Full Stack Engineer",
        period: "Jan 2022 - Mar 2023",
        achievements: [
          "Helped build a digital assistant for physical stores to improve the customer experience",
          "Developed responsive interfaces in collaboration with UX/UI teams",
          "Implemented product availability lookup, exchange ticket management and self-checkout payment flows",
          "Promoted good practices and development standards within the team",
          "Worked in agile, cross-functional teams",
        ],
      },
      ripley: {
        role: "Junior Full Stack Developer",
        period: "Oct 2020 - Dec 2021",
        achievements: [
          "Developed and maintained features for a high-traffic e-commerce admin platform",
          "Implemented catalog, inventory and user management functionality",
          "Active member of Scrum teams and continuous improvement processes",
          "Maintained and evolved RipleyUI, a design system built on Material UI",
        ],
      },
    },
  },

  skills: {
    heading: "Technical",
    headingAccent: "Skills",
    categories: {
      frontend: "Frontend",
      backend: "Backend & Mobile",
      apis: "APIs & Testing",
      cloud: "Cloud & Tools",
    },
    methodologies: "Methodologies",
    methods: ["Scrum", "Agile"],
  },

  about: {
    heading: "About",
    headingAccent: "Me",
    text: "Software engineer with experience building and evolving scalable web applications for high-traffic e-commerce platforms. I work across the stack, from React and Next.js to Node.js, NestJS, Java and Spring Boot, on AWS and Google Cloud. I also teach Cloud Native and Mobile Development at Duoc UC. I enjoy teamwork, mentoring and taking on new challenges.",
    degree: "Computer Engineering",
    experience: "4+ Years Experience",
  },

  contact: {
    heading: "Let's Work",
    headingAccent: "Together",
    text: "Available for remote work. Focused on building maintainable software, improving performance and continuous learning.",
    spanish: "Spanish (Native)",
    english: "English (C1)",
    send: "Send me a message",
    linkedin: "LinkedIn",
    github: "GitHub",
  },

  modal: {
    title: "Get in Touch",
    close: "Close",
    name: "Your Name *",
    namePlaceholder: "John Doe",
    email: "Your Email *",
    emailPlaceholder: "john@example.com",
    subject: "Subject *",
    subjectPlaceholder: "Project Opportunity",
    message: "Message *",
    messagePlaceholder: "Tell me about your project...",
    success: "✓ Message sent successfully! I'll get back to you soon.",
    failure: "✗ Failed to send message. Please try again later.",
    sending: "Sending...",
    submit: "Send Message",
    errors: {
      nameRequired: "Name is required",
      nameLetters: "Name can only contain letters and spaces",
      nameMax: "Name must be 20 characters or less",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email address",
      subjectRequired: "Subject is required",
      subjectLetters: "Subject can only contain letters and spaces",
      subjectMax: "Subject must be 40 characters or less",
      messageRequired: "Message is required",
      messageMax: "Message must be 200 characters or less",
    },
  },

  footer: {
    tagline: "Building reliable, scalable software and great digital experiences.",
    quickLinks: "Quick Links",
    connect: "Connect",
    email: "Email",
    rights: "All rights reserved.",
  },
};

export type Messages = typeof en;
