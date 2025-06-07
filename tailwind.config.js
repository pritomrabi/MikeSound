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
        primary: "#212121",
        secandari: "#289c28",
        brand: "#9b9fa5",
      },
      fontFamily: {
        Popins: ["Poppins", "sans-serif"],
        NunitoFont: ["Nunito", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"],
        Opensans: ["Open Sans", "sans-serif"],
        Montez: ["Montez", "serif"],
        Monrope: ["Manrope", "serif"],
      },
    },
  },
  plugins: [],
};
