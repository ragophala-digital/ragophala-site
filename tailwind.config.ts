import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#101827", 900: "#0a101c", 800: "#161f33", 700: "#1f2a44" },
        ivory: { DEFAULT: "#F5F3EF", 100: "#FBFAF8", 200: "#EAE7E0" },
        cobalt: { DEFAULT: "#315BFA", 700: "#2347D6", 300: "#8FA5FF" },
        softblue: "#DCE5FF",
        charcoal: "#242B39",
        slate: { DEFAULT: "#A7B1C2" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        drift: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        flow: { from: { backgroundPosition: "0 0" }, to: { backgroundPosition: "24px 0" } },
        flowY: { from: { backgroundPosition: "0 0" }, to: { backgroundPosition: "0 24px" } },
        ping2: { "0%": { transform: "scale(1)", opacity: ".5" }, "100%": { transform: "scale(2.2)", opacity: "0" } },
      },
      animation: { drift: "drift 8s ease-in-out infinite", flow: "flow 1.2s linear infinite", flowY: "flowY 1.2s linear infinite", ping2: "ping2 2s ease-out infinite" },
    },
  },
  plugins: [],
};

export default config;
