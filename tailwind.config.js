/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'arreda-green': '#10b981', // Verde principal
        'arreda-light': '#d1fae5', // Verde claro para fundos
        'arreda-dark': '#047857',  // Verde escuro para hover
      }
    },
  },
  plugins: [],
}