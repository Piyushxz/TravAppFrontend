/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fafafa",
        primary: " #ff6525",
        textPrimary: " #363030",
        accent: "#d2d2d2",
        containerBorder: "#707070",
        overlay: "rgba(0, 0, 0, 0.3)",
      },
      fontFamily:{
        manrope: ['Manrope', 'sans-serif'],
      }
    },

  },
  plugins: [],
}