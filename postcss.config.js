/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        'charge-primary': '#3498db',
        'charge-secondary': '#2ecc71',
        'charge-dark': '#2c3e50',
      },
    },
  },
  plugins: [],
}