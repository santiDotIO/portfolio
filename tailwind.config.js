module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    mode: 'all',
    content: ['./src/hbs/**/*.hbs']
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
