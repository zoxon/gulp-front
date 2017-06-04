var postcssSortingConfig = require('./.postcss-sorting.json');

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
    'postcss-sorting': postcssSortingConfig,
    'postcss-reporter': {}
  }
};
