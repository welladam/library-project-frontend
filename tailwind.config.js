/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#D55D0D', // Exemplo de cor primária
        secondary: '#A9A18E', // Exemplo de cor secundária
        background: '#FAC63D',
        tenne: '#A3470A',
        jelly: '#203841',
      },
      fontFamily: {
        heading: ['ConcertOne-Regular'],
        body: ['Dosis-Regular'],
        'body-semi': ['Dosis-SemiBold'],
        'body-bold': ['Dosis-Bold'],
      },
      boxShadow: {
        custom: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
