/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['pages/**/*.{js,ts,jsx,tsx}', 'components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 3s ease-in-out 2',
      },
      borderColor: ['focus-visible', 'first'],
      keyframes: {
        wiggle: {
          '0%': {
            right: '-100px',
          },
          '50%': {
            right: '-50px',
          },
          '100%': {
            right: '50px',
          },
        },
      },
    },
  },
  plugins: [],
};
