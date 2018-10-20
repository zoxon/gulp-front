module.exports = {
  plugins: {
    autoprefixer: {
      flexbox: "no-2009",
      cascade: false,
      grid: true
    },
    perfectionist: {
      cascade: false,
      colorCase: "lower",
      colorShorthand: true,
      format: "expanded",
      indentChar: " ",
      indentSize: 2,
      trimLeadingZero: false,
      trimTrailingZeros: true,
      zeroLengthNoUnit: true
    },
    stylefmt: {},
    "postcss-reporter": {}
  }
};
