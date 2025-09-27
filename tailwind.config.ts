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
        primary: "var(--primary-color)",
        "page-text": "var(--text-color)",
        "page-bg": "var(--background-color)",
        "brand-green": "#10b981",
        "brand-pink": "#ec4899",
        "brand-purple": "#8b5cf6",
        "panel-bg": "rgba(23, 23, 23, 0.5)",
        "dark-bg": "#0a0a0a",
      },
    },
  },
  plugins: [],
};
export default config;
