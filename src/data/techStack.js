export const techCategories = [
  {
    "id": "programming",
    "label": "Programming",
    "color": "#0866E8",
    "techs": [
      {
        "name": "Java",
        "description": "Primary programming language for backend development",
        "color": "#f89820"
      },
      {
        "name": "Python",
        "description": "Used for AI/ML, scripting, and data processing",
        "color": "#3776ab"
      },
      {
        "name": "JavaScript",
        "description": "Frontend interactivity and web development",
        "color": "#f7df1e"
      },
      {
        "name": "HTML",
        "description": "Web structure and semantic markup",
        "color": "#e34f26"
      },
      {
        "name": "CSS",
        "description": "Styling and responsive design",
        "color": "#1572b6"
      }
    ]
  },
  {
    "id": "backend",
    "label": "Backend",
    "color": "#18C5E8",
    "techs": [
      {
        "name": "Spring Security",
        "description": "Authentication and authorization for Spring applications",
        "color": "#6db33f"
      }
    ]
  },
  {
    "id": "databases",
    "label": "Databases",
    "color": "#7434C5",
    "techs": [
      {
        "name": "MongoDB",
        "description": "NoSQL document database for flexible schemas",
        "color": "#47a248"
      }
    ]
  },
  {
    "id": "infra",
    "label": "Messaging / Infra",
    "color": "#fb923c",
    "techs": []
  },
  {
    "id": "aiml",
    "label": "AI / ML",
    "color": "#34d399",
    "techs": [
      {
        "name": "Python",
        "description": "Primary language for ML development",
        "color": "#3776ab"
      },
      {
        "name": "NumPy",
        "description": "Numerical computing and array operations",
        "color": "#013243"
      },
      {
        "name": "Pandas",
        "description": "Data manipulation and analysis",
        "color": "#150458"
      }
    ]
  },
  {
    "id": "tools",
    "label": "Tools",
    "color": "#f472b6",
    "techs": [
      {
        "name": "Git",
        "description": "Version control for tracking code changes",
        "color": "#f05032"
      },
      {
        "name": "GitHub",
        "description": "Remote repository hosting and collaboration",
        "color": "#181717"
      },
      {
        "name": "IntelliJ IDEA",
        "description": "Primary IDE for Java development",
        "color": "#fe315d"
      },
      {
        "name": "VS Code",
        "description": "Lightweight editor for web and Python development",
        "color": "#007acc"
      },
      {
        "name": "Postman",
        "description": "API testing and documentation",
        "color": "#ff6c37"
      }
    ]
  }
]
export const allTechs = techCategories.flatMap(cat => cat.techs)
export const techNodes = ["Java", "Python", "Spring Boot", "MySQL", "MongoDB", "Redis", "Docker", "Kafka", "React", "Git", "AI/ML", "REST API", "NumPy", "Pandas", "DSA", "Algorithms", "Security", "JavaScript", "Hibernate", "CSS"]
