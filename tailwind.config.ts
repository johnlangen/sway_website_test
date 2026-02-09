import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        vance: ["Vance Regular", "sans-serif"],
        "vance-bold": ["Vance Bold", "sans-serif"],
        "vance-light": ["Vance Light", "sans-serif"],
        "vance-text": ["Vance Text", "sans-serif"],
      },
      height: {
        "110px": "110px",
        "100px": "100px",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "progress-fill": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "check-pop": {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "50%": { transform: "scale(1.15)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s ease-out both",
        "fade-in": "fade-in 0.3s ease-out both",
        "scale-in": "scale-in 0.3s ease-out both",
        "slide-down": "slide-down 0.3s ease-out both",
        "check-pop": "check-pop 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
