// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  rootDir: ".",
  moduleFileExtensions: ["js", "json"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/source/$1"
  },
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  collectCoverageFrom: ["source/**/*.{js,jsx}"],
  coverageDirectory: "<rootDir>/coverage",
  testEnvironment: "jsdom"
};
