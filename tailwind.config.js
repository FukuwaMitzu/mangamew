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
      },
      boxShadow:{
        'outline': '0px 0px 0px 1px rgba(0,0,0,1)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
