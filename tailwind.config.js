const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: false,
    content: [
      './src/hbs/**/*.hbs',
      './src/data.json',
    ]
  },
  theme: {
    fontFamily: false,
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      'cerise-red': '#e31b6d',
      'charade': '#252934',
      'miragea': '#1b242f',
      'dove-gray': '#616161',
      'robin-egg-blueapprox': '#04c2c9',
      'persian-green': '#00a1a7',
      'wild-sand': '#f5f5f5',
      'abbey': '#444649',
    },
    screens: {...{
      xs: '350px'
    }, ...defaultTheme.screens},
    extend: {},
  },
  variants: {},
  plugins: [],
}
