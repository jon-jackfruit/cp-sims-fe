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
        'black': '#191919',
        'dark-gray': '#333333',
        'header-gray': '#2a2a2a',
        'mid-gray': '#666666',
        'light-gray': '#e6e6e6',
        'lighter-gray': '#f5f5f5',
        'white': '#ffffff',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'mono': ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}