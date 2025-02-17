import type { Config } from "tailwindcss";

export default {
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
        divs: {
          100: "#49b5fc",
          200: "#2e9af4",
          300: "#1c7edf",
          400: "#0f5fbf",
          500: "#0a4597",
          600: "#073374",
          700: "#04234e",
          800: "#02152e",
          900: "#010a16",
        },
      },
    },
    
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
