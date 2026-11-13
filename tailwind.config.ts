import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#02050f",
        navy: { 950: "#040a1c", 900: "#070f2b", 800: "#0b1740", 700: "#12236a" },
        volt: { DEFAULT: "#2f7bff", 400: "#5b9bff", 300: "#8ab9ff", 600: "#1f5fe0" },
        mist: "#f3f6fc",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        drift: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
      },
      animation: { marquee: "marquee 40s linear infinite", drift: "drift 7s ease-in-out infinite" },
    },
  },
  plugins: [],
};

export default config;
