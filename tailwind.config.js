/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // <-- A mágica acontece aqui: adicionamos o .vue!
  ],
  theme: {
    extend: {
      colors: {
        'arreda-green': '#00BFA6',
        'arreda-dark': '#009985',
        'arreda-light': '#E6F9F6'
      }
    },
  },
  plugins: [],
}