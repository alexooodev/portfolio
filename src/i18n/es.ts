import type { Messages } from "./en";

export const es: Messages = {
  meta: { title: "Alex Silva | Ingeniero de Software" },

  nav: {
    home: "Inicio",
    projects: "Proyectos",
    experience: "Experiencia",
    skills: "Habilidades",
    about: "Sobre mí",
    contact: "Contacto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
    languageNames: { en: "English", es: "Español" },
  },

  hero: {
    headline: "Ingeniero de",
    headlineAccent: "Software",
    summary:
      "Construyo aplicaciones web de punta a punta, desde la interfaz hasta la API y la nube donde corre. Trabajo con React, Node.js y Java, y también enseño desarrollo cloud native y móvil.",
    getInTouch: "Contáctame",
    viewWork: "Ver proyecto",
  },

  projects: {
    heading: "Proyecto",
    headingAccent: "Destacado",
    eyebrow: "IA · Generación aumentada por recuperación (RAG)",
    description:
      "Un asistente de estudio para el examen AWS Cloud Practitioner. Haz una pregunta y obtén una respuesta basada en la documentación oficial, con cada afirmación enlazada a su fuente. Si no hay evidencia, lo dice.",
    highlights: [
      {
        title: "Pipeline de recuperación",
        text: "Chunking, embeddings bge-m3 y búsqueda por similitud con pgvector sobre la documentación oficial.",
      },
      {
        title: "Respuestas con citas",
        text: "Se transmiten por SSE. Cada cita [n] se verifica contra las fuentes realmente recuperadas.",
      },
      {
        title: "Sabe cuándo no sabe",
        text: "Bajo un umbral de relevancia se niega a responder en vez de adivinar.",
      },
      {
        title: "Libre de explorar",
        text: "La demo reproduce sesiones reales grabadas, así que los visitantes nunca gastan cuota del modelo.",
      },
    ],
    comingSoon: "Demo en vivo próximamente",
    comingSoonHint: "Aquí aparecerán las sesiones grabadas.",
    loadingDemo: "Cargando demo…",
  },

  demo: {
    recordedBadge: "Sesiones grabadas",
    loadingQuestions: "Cargando preguntas de ejemplo",
    loadQuestionsFailed: "No se pudieron cargar las preguntas de ejemplo.",
    tryAgain: "Reintentar",
    noSessions: "Aún no hay sesiones grabadas.",
    emptyHint: "Elige una pregunta arriba para ver una respuesta con citas, construida desde la documentación oficial.",
    stop: "Detener",
    clear: "Limpiar",
    haveCode: "Tengo un código de invitación",
    liveNotice: "Las preguntas en vivo usan un modelo real, requieren un código de invitación y tienen límite de uso.",
    codeLabel: "Código de invitación",
    codePlaceholder: "Código",
    questionLabel: "Tu pregunta",
    questionPlaceholder: "Haz tu propia pregunta…",
    askLive: "Preguntar en vivo",
    errors: {
      needsCode: "Las preguntas en vivo requieren un código de invitación. Elige una de las preguntas de ejemplo.",
      badCode: "Ese código de invitación no funcionó, o el modo en vivo está desactivado.",
      notFound: "Esa sesión grabada ya no está disponible.",
      badLength: "La pregunta debe tener entre 3 y 500 caracteres.",
      network: "No se pudo conectar con la API de Cert Copilot. Inténtalo de nuevo en un momento.",
      closed: "La conexión se cerró antes de terminar la respuesta.",
    },
    turn: {
      questionAria: "Pregunta:",
      retry: "Reintentar",
      searching: "Buscando en la documentación…",
      stopped: "Detenida.",
      noCitations: "Esta respuesta no tiene citas. Tómala con cautela.",
      invalidCitations: "Cita fuentes que no existen",
      live: "En vivo",
      recorded: "Sesión grabada",
      originallyAnswered: "respondida originalmente en",
      topMatch: "mejor coincidencia",
    },
    sources: {
      heading: "Fuentes",
      untitled: "Sección sin título",
      match: "de coincidencia",
      similarityHint: "Similitud coseno con la pregunta",
      open: "Abrir en la documentación oficial",
      show: "Mostrar fuente",
      missing: "Esta fuente no existe",
    },
  },

  experience: {
    heading: "Experiencia",
    headingAccent: "Profesional",
    items: {
      duoc: {
        role: "Docente, Cloud Native y Desarrollo Móvil",
        period: "2026 - Actualidad",
        achievements: [
          "Dicto Desarrollo Cloud Native I: microservicios, contenedores (Docker, Kubernetes), API Gateway (AWS) e Identity as a Service (OAuth2, OIDC, IDaaS/CIAM)",
          "Dicto Desarrollo de Aplicaciones Móviles: Android nativo con Kotlin y Jetpack Compose, consumo de APIs con Retrofit, persistencia con Room y control de versiones con GitHub",
          "Diseño y adapto material didáctico, guías prácticas y actividades aplicadas de cloud y mobile",
          "Seleccionado mediante una clase simulada, aprobando implementación de clase, habilidades comunicacionales y clima de aula",
        ],
      },
      meli: {
        role: "Frontend Software Engineer",
        period: "Abr 2023 - Dic 2023",
        achievements: [
          "Desarrollé y optimicé un dashboard administrativo de alto tráfico usado por equipos de Latinoamérica y China para gestionar promociones y campañas",
          "Participé en la migración de la plataforma hacia tecnologías modernas y escalables, reduciendo deuda técnica",
          "Optimicé componentes críticos, mejorando los tiempos de carga en aproximadamente un 15%",
          "Mejoré la mantenibilidad, escalabilidad y calidad del código",
          "Mentoría a desarrolladores junior, promoviendo buenas prácticas y estándares de desarrollo",
        ],
      },
      fala: {
        role: "Full Stack Engineer",
        period: "Ene 2022 - Mar 2023",
        achievements: [
          "Participé en el desarrollo de un asistente digital para tiendas físicas que mejora la experiencia del cliente",
          "Desarrollé interfaces responsivas en colaboración con equipos UX/UI",
          "Implementé consulta de disponibilidad de productos, gestión de tickets de cambio y flujos de pago autónomo",
          "Promoví buenas prácticas y estándares de desarrollo dentro del equipo",
          "Trabajé en equipos ágiles y multidisciplinarios",
        ],
      },
      ripley: {
        role: "Full Stack Developer Junior",
        period: "Oct 2020 - Dic 2021",
        achievements: [
          "Desarrollé y mantuve funcionalidades de una plataforma administrativa de e-commerce de alto tráfico",
          "Implementé funcionalidades de catálogo, inventario y gestión de usuarios",
          "Participé activamente en equipos Scrum y procesos de mejora continua",
          "Administré y evolucioné RipleyUI, un sistema de diseño basado en Material UI",
        ],
      },
    },
  },

  skills: {
    heading: "Habilidades",
    headingAccent: "Técnicas",
    categories: {
      frontend: "Frontend",
      backend: "Backend y Mobile",
      apis: "APIs y Testing",
      cloud: "Cloud y Herramientas",
    },
    methodologies: "Metodologías",
    methods: ["Scrum", "Agile"],
  },

  about: {
    heading: "Sobre",
    headingAccent: "mí",
    text: "Ingeniero de software con experiencia construyendo y evolucionando aplicaciones web escalables para plataformas de e-commerce de alto tráfico. Trabajo en todo el stack, desde React y Next.js hasta Node.js, NestJS, Java y Spring Boot, sobre AWS y Google Cloud. También hago clases de Cloud Native y Desarrollo Móvil en Duoc UC. Disfruto el trabajo en equipo, la mentoría y los nuevos desafíos.",
    degree: "Ingeniería en Informática",
    experience: "4+ años de experiencia",
  },

  contact: {
    heading: "Trabajemos",
    headingAccent: "juntos",
    text: "Disponible para trabajo remoto. Enfocado en construir software mantenible, mejorar el rendimiento y seguir aprendiendo.",
    spanish: "Español (Nativo)",
    english: "Inglés (C1)",
    send: "Envíame un mensaje",
    linkedin: "LinkedIn",
    github: "GitHub",
  },

  modal: {
    title: "Contáctame",
    close: "Cerrar",
    name: "Tu nombre *",
    namePlaceholder: "Juan Pérez",
    email: "Tu correo *",
    emailPlaceholder: "juan@ejemplo.com",
    subject: "Asunto *",
    subjectPlaceholder: "Oportunidad de proyecto",
    message: "Mensaje *",
    messagePlaceholder: "Cuéntame sobre tu proyecto...",
    success: "✓ ¡Mensaje enviado! Te responderé pronto.",
    failure: "✗ No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.",
    sending: "Enviando...",
    submit: "Enviar mensaje",
    errors: {
      nameRequired: "El nombre es obligatorio",
      nameLetters: "El nombre solo puede contener letras y espacios",
      nameMax: "El nombre debe tener 20 caracteres o menos",
      emailRequired: "El correo es obligatorio",
      emailInvalid: "Ingresa un correo válido",
      subjectRequired: "El asunto es obligatorio",
      subjectLetters: "El asunto solo puede contener letras y espacios",
      subjectMax: "El asunto debe tener 40 caracteres o menos",
      messageRequired: "El mensaje es obligatorio",
      messageMax: "El mensaje debe tener 200 caracteres o menos",
    },
  },

  footer: {
    tagline: "Construyendo software confiable y escalable, y buenas experiencias digitales.",
    quickLinks: "Enlaces rápidos",
    connect: "Conecta",
    email: "Correo",
    rights: "Todos los derechos reservados.",
  },
};
