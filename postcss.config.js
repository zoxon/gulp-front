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
      indentChar: '\t',
      indentSize: 1,
      trimLeadingZero: false,
      trimTrailingZeros: true,
      zeroLengthNoUnit: true
    },
    'stylefmt': {},
    'postcss-reporter': {}
  }
};
