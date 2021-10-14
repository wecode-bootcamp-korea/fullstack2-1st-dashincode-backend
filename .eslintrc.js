module.exports = {
  parser: 'babel-eslint',
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  env: {
    node: true,
  },
  extends: ['airbnb-base', 'plugin:node/recommended', 'prettier'],
  rules: {
    'import/prefer-default-export': ['off'],
    'no-console': 'off',
  },
};
