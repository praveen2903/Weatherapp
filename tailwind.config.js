/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'blue-lighter':'#1E213A',
        'blue-dark':'#100E1D',
        'light-gray':'#6E707A',
        'progress-bar':'#FFEC65',
        'reddest':'#dc2626',
        'bluest':'#1d4ed8',
      },
      backgroundImage:{
        'hot':"url('/src/assets/hot.jpg')",
        "cold":"url('/src/assets/cold.jpg')",
      }
    },
  },
  plugins: [],
}