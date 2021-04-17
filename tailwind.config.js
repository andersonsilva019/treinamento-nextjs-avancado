module.exports = {
  purge: [
    './src/**/*.{js,ts,jsx,tsx,html}', 
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        DEFAULT: '#ffffff',
      },
      cyan: {
        500: '#61dafb',
      },
      gray: {
        100: '#e1e1e6',
        300: '#a8a8b3',
        900: '#121214'
      },
      yellow:{
        500: '#eba417',
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
