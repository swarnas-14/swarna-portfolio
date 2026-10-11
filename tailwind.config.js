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
          primary: "#FFFFFF",
          secondary: "#FAFAFA",
          card: "#FFFFFF",
        },
        border: {
          DEFAULT: "#D4D4D4",
          subtle: "#E5E5E5",
        },
        accent: {
          indigo: "#0866E8",
          cyan: "#18C5E8",
          purple: "#7434C5",
          pink: "#D96CE8",
        },
        text: {
          primary: "#171717",
          secondary: "#737373",
          muted: "#9ca3af",
        },
        dark: {
          surface: "#10182D",
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