export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#054d98',
          600: '#0040a8',
          700: '#003087'
        },
        green: {
          500: '#116e04',
          600: '#0e5a03',
          700: '#0b4702'
        }
      }
    },
  },
  plugins: [],
}