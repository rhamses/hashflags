module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  parserOptions: {
    ecmaVersion: 10,
  },
  rules: {
    "quotes": ["error", "double"],
    "max-len": 0,
    "no-async-promise-executor": 0,
    "prefer-promise-reject-errors": 0,
  },
};
