export const techCategories = [
  {
    id: "programming",
    label: "Programming",
    color: "#6366f1",
    techs: [
      { name: "Java", description: "Primary programming language for backend development", color: "#f89820" },
      { name: "Python", description: "Used for AI/ML, scripting, and data processing", color: "#3776ab" },
      { name: "JavaScript", description: "Frontend interactivity and web development", color: "#f7df1e" },
      { name: "HTML", description: "Web structure and semantic markup", color: "#e34f26" },
      { name: "CSS", description: "Styling and responsive design", color: "#1572b6" }
    ]
  },
  {
    id: "backend",
    label: "Backend",
    color: "#22d3ee",
    techs: [
      { name: "Spring Boot", description: "Java framework for building production-grade web applications", color: "#6db33f" },
      { name: "Spring Security", description: "Authentication and authorization for Spring applications", color: "#6db33f" },
      { name: "REST APIs", description: "Designing and building RESTful web services", color: "#22d3ee" },
      { name: "Hibernate/JPA", description: "Object-relational mapping for database persistence", color: "#59666c" }
    ]
  },
  {
    id: "databases",
    label: "Databases",
    color: "#a78bfa",
    techs: [
      { name: "MySQL", description: "Relational database for structured data", color: "#4479a1" },
      { name: "MongoDB", description: "NoSQL document database for flexible schemas", color: "#47a248" },
      { name: "Redis", description: "In-memory data store for caching and sessions", color: "#dc382d" }
    ]
  },
  {
    id: "infra",
    label: "Messaging / Infra",
    color: "#fb923c",
    techs: [
      { name: "Kafka", description: "Distributed event streaming platform", color: "#000000" },
      { name: "Docker", description: "Containerization for consistent deployment environments", color: "#2496ed" }
    ]
  },
  {
    id: "aiml",
    label: "AI / ML",
    color: "#34d399",
    techs: [
      { name: "Python", description: "Primary language for ML development", color: "#3776ab" },
      { name: "NumPy", description: "Numerical computing and array operations", color: "#013243" },
      { name: "Pandas", description: "Data manipulation and analysis", color: "#150458" },
      { name: "Machine Learning", description: "Supervised/unsupervised learning concepts and implementation", color: "#34d399" }
    ]
  },
  {
    id: "tools",
    label: "Tools",
    color: "#f472b6",
    techs: [
      { name: "Git", description: "Version control for tracking code changes", color: "#f05032" },
      { name: "GitHub", description: "Remote repository hosting and collaboration", color: "#181717" },
      { name: "IntelliJ IDEA", description: "Primary IDE for Java development", color: "#fe315d" },
      { name: "VS Code", description: "Lightweight editor for web and Python development", color: "#007acc" },
      { name: "Postman", description: "API testing and documentation", color: "#ff6c37" },
      { name: "Swagger", description: "API documentation and exploration", color: "#85ea2d" }
    ]
  }
]

export const allTechs = techCategories.flatMap(cat => cat.techs)

export const techNodes = [
  "Java", "Python", "Spring Boot", "MySQL", "MongoDB",
  "Redis", "Docker", "Kafka", "React", "Git",
  "AI/ML", "REST API", "NumPy", "Pandas", "DSA",
  "Algorithms", "Security", "JavaScript", "Hibernate", "CSS"
]
