const dist = "dest";

module.exports = {
  navigateFallback: "/index.html",
  stripPrefix: `${dist}/`,
  staticFileGlobs: [
    `${dist}/**/*.html`,
    `${dist}/**/*.js`,
    `${dist}/**/*.css`,
    `${dist}/assets/**`
  ]
};
