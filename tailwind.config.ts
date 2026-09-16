import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Backstage punk pulido — docs/LINEAMIENTO_ESTETICO_BASE.md §4
        bg: "#08080A",
        case: "#111114",
        paper: "#F2EDE4",
        "paper-aged": "#D8CDBB",
        magenta: "#FF1F8A",
        lime: "#C8FF2E",
        cyan: "#25D7FF",
        "challenge-orange": "#FF6A2A",
        metal: "#5B5B62",
        muted: "#8A8A8A"
      },
      fontFamily: {
        display: ["var(--font-anton)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;
