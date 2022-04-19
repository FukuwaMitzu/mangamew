module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'dominant': '#FFF',
        'primary' : '#FF3366',
        'primary-dark': '#bf2c51',
        'secondary': '#050816',
        'grey': '#EDEDF4',
        'grey-dark': '#d4d4e5',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
