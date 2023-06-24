/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          // black900: "#040303",
          // red600: "#A13333",
          // red900: "#461111",
          // gray500: '#3f3e43',
          // gray600: '#2c2c30',
          // gray700: '#242426',
          // gray800: "#1f1e1f",
          yellow100: "#FEFFDB",
          yellow200: "#FFC60B",
          yellow300: "#FF8B00",
          pink300: "#D61C4E",
          yellow2_100: '',
          yellow2_200: '#feda4d',
          yellow2_300: '#fdd533',
          yellow2_400: '#fdcf1a',
          yellow2_500: '#fdca00',
        },
        secondary: {
          black900: "#040303",
          red600: "#A13333",
          red900: "#461111",
          gray500: '#3f3e43',
          gray600: '#2c2c30',
          gray700: '#242426',
          gray800: "#1f1e1f",
          yellow300: '#ac951f',
          yellow400: '#93801b',
          yellow500: '#7b6b17',
          yellow600: '#625512',
          yellow700: '#49400d',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};

