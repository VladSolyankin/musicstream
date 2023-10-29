/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}',
      './src/**/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
      extend: {
          fontFamily: {
              "jost": ["Jost", "sans-serif"]
          }
      },
      colors: {
          "gray-12": '#121212',
          "white": '#FFFFFF'
      }

  },
  plugins: [],
}
