import type { Config } from "tailwindcss";
// import {fontFamily} from "tailwindcss/defaultTheme";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#E2AB7F",
        input: "#E2AB7F",
        ring: "#E2AB7F",
        background: "#F1ECE1",
        foreground: "#3A353F",
        primary: {
          DEFAULT: "#C05850",
          foreground: "#F1ECE1",
        },
        secondary: {
          DEFAULT: "#505668",
          foreground: "#F1ECE1",
        },
        destructive: {
          DEFAULT: "#C05850",
          foreground: "#F1ECE1",
        },
        muted: {
          DEFAULT: "#E2AB7F",
          foreground: "#3A353F",
        },
        accent: {
          DEFAULT: "#E2AB7F",
          foreground: "#3A353F",
        },
        popover: {
          DEFAULT: "#F1ECE1",
          foreground: "#3A353F",
        },
        card: {
          DEFAULT: "#F1ECE1",
          foreground: "#3A353F",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      // fontFamily: {
      //   sans: ["var(--font-sans)", ...fontFamily.sans],
      // },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
