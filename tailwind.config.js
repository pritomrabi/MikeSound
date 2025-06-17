/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#242424",
          dark: "#f5f5f5", // Light text in dark mode
        },
        secandari: {
          DEFAULT: "#767676",
          dark: "#bab5b5", // Light gray for dark mode
        },
        brand: "#bea163",
        Green: "#83b735",
      },
      fontFamily: {
        Popins: ["Poppins", "sans-serif"],
        NunitoFont: ["Nunito", "sans-serif"],
        Opensans: ["Open Sans", "sans-serif"],
        Monrope: ["Manrope", "serif"],
        Lato: ["Lato", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
