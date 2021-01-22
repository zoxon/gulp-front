const path = require("path");

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "standard",
    "plugin:jest/recommended",
    "plugin:unicorn/recommended",

    "prettier",
    "prettier/prettier",
    "prettier/standard",
    "prettier/unicorn",
  ],
  plugins: ["prettier", "unicorn"],
  // add your custom rules here
  rules: {
    // Only allow debugger in development
    "no-debugger": process.env.PRE_COMMIT ? "error" : "off",

    // Only allow `console.log` in development
    "no-console": process.env.PRE_COMMIT
      ? ["error", { allow: ["warn", "error"] }]
      : "off",

    /**
     * Enforce a particular style for multiline comments
     * @see https://eslint.org/docs/rules/multiline-comment-style
     */
    "multiline-comment-style": ["error", "starred-block"],

    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-null.md
    "unicorn/no-null": 0,

    /**
     * Does not work correctly
     * https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
     */
    "import/order": 0,

    // Conflict with unicorn/prefer-spread
    "array-func/prefer-array-from": 0,
  },

  // Override settings for tests
  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      env: {
        "jest/globals": true,
      },
      globals: {
        mount: true,
        shallowMount: true,
        createComponentMocks: true,
        createModuleStore: true,
      },
      rules: {
        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/consistent-function-scoping.md
        "unicorn/consistent-function-scoping": 0,
        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-useless-undefined.md
        "unicorn/no-useless-undefined": 0,
      },
    },
  ],

  settings: {
    "import/resolver": {
      webpack: {
        config: path.resolve(__dirname, "webpack.config.babel.js"),
      },
    },
  },
};
