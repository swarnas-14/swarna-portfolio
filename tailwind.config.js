/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#060408",
          secondary: "#0f0a10",
          card: "#160e18",
        },
        border: {
          DEFAULT: "#2a1a2e",
          subtle: "#1e1020",
        },
        accent: {
          indigo: "#e879a0",
          cyan: "#f59e42",
          purple: "#c084fc",
        },
        text: {
          primary: "#fdf2f8",
          secondary: "#d1a5c0",
          muted: "#8b6a80",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
}