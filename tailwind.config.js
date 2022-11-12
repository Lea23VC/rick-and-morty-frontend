/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'

  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/images/background/bg_1920.webp')",
      },
      fontFamily: {
        eurostile: ["Eurostile"],
        sans: ["Eurostile", "sans-serif"],
      },
      textShadow: {
        main: "0 0 7px rgba(99,253,251,0.54)",
      },
      colors: {
        "light-blue": "#00ffea",
        "transparent-black": "rgba(0, 0, 0, 0.6)",
      },
      boxShadow: {
        main: "0 0 10px 5px rgba(159, 235, 243, 0.27)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
  corePlugins: {
    fontFamily: true,
  },
};
