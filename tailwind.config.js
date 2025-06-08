/** @type {import('tailwindcss').Config} */
export default {
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
        primary: "#242424",
        secandari: "#767676",
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
