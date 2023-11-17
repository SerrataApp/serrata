/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: "#f5f5f5"
      }
    },
  },
  plugins: [require("daisyui")],
}
