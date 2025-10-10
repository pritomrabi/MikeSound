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
          DEFAULT: "#aaaaaa",
          dark: "#bab5b5", // Light gray for dark mode
        },
        brand: "#ec1733",
        Green: "#FF0000",
      },
      fontFamily: {
        NunitoFont: ["Nunito", "sans-serif"],
        Monrope: ["Manrope", "serif"],
        Lato: ["Lato", "sans-serif"],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            'h1,h2,h3,h4,h5,h6': {
              marginTop: '0.2em',
              marginBottom: '0.1em',
            },
            p: {
              marginTop: '0.1em',
              marginBottom: '0.1em',
            },
            ul: {
              marginTop: '0.1em',
              marginBottom: '0.1em',
              paddingLeft: '0.5em',
            },
            li: {
              marginTop: '0.2em',
              marginBottom: '0.2em',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
