module.exports = {
  plugins: {
    'autoprefixer': {
      cascade: false
    },
    'perfectionist': {
      cascade: false,
      colorCase: 'lower',
      colorShorthand: true,
      format: 'expanded',
      indentChar: ' ',
      indentSize: 2,
      trimLeadingZero: false,
      trimTrailingZeros: true,
      zeroLengthNoUnit: true
    },
    'stylefmt': {},
    'postcss-reporter': {}
  }
};
