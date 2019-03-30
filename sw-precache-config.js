const glob = require("glob");
const path = require("path");

const dist = "dest";

const patterns = [
  `${dist}/**/*.html`,
  `${dist}/**/*.js`,
  `${dist}/**/*.css`,
  `${dist}/assets/**`
];

const paths = [];
patterns.forEach(pattern =>
  paths.push(...glob.sync(pattern.replace(path.sep, "/")))
);

module.exports = {
  navigateFallback: "/index.html",
  stripPrefix: `${dist}/`,
  staticFileGlobs: paths.filter(path => !/assets\/images\/content/.test(path))
};
