import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0B",
        ink: "#F5F5F4",
        neon: { magenta: "#FF2E88", cian: "#22D3EE", lima: "#C6F432", amarillo: "#FDE047" },
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
