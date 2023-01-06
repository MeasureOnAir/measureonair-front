/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow100: '#FEFFDB',
          yellow200: '#FFC60B',
          yellow300: '#FF8B00',
          pink300: '#D61C4E'
        }
      },
    },
   
  },
  plugins: [],
}
