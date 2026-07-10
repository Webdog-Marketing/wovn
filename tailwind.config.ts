import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "#F6F2EA",
        surface: "#FFFFFF",
        border: "#E1D9C8",
        thread: "#B8752E",
        kit: "#2F4C6B",
        ink: "#1B1D1F",
        muted: "#6B655A",
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
