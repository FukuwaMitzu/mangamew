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
      },
      keyframes:{
        jumpin: {
          '0%':{
              'transform': 'scale(0.7)',
              
          },
          '50%':{
              'transform': 'scale(1.035)',
              
          },
          '100%':{
              'transform': 'scale(1)',
              
          }
          
        },
        fadein:{
          '0%':{
            'opacity':'0'
          },
          '100%':{
            'opacity': '1'
          }
        }
      },
      animation:{
        'jump-in':'jumpin 250ms forwards ease-in-out',
        'fade-in': 'fadein 250ms forwards ease-in'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
