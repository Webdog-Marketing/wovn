import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "#14171A",
        surface: "#1C2024",
        border: "#2B2F33",
        thread: "#C98A3E",
        kit: "#3D5A80",
        ink: "#F2F0EA",
        muted: "#9BA0A5",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        tag: ["var(--font-tag)"],
      },
      letterSpacing: {
        tag: "0.14em",
      },
    },
  },
  plugins: [],
};

export default config;
