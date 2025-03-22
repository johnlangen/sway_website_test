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
        "110px": "110px", // Custom height for the banner
        "100px": "100px", // Ensuring height is defined
      },
    },
  },
  plugins: [],
};

export default config;
