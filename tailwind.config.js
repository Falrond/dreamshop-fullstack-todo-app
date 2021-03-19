module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-cyan': '#5ba4a4',
        'light-cyan': '#eef6f6',
        'grayish-cyan': '#7b8e8e',
        'very-dark-cyan': '#2c3a3a',
        'blueish-cyan': '#c5e8e8',
      },
      fontFamily: {
        spartan: 'Spartan',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
