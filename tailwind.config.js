/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins-Regular'],
      },
      colors: {
        primary: '#FABD01',
        secondary: '#171717',
        screenBackground: '#F5F5F8',
        appleBlack: '#171717',
        facebookBlue: '#3B5998',
        userFormGrey: '#EFEEEE',
        blue: '#0038FF',
        grey: '#888',
        delete: '#FF002A',
        dateTime: '#D9D9D9',
      },
    },
  },
  plugins: [],
};
