module.exports = {
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        darkgray: '#A9A9A9'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
}