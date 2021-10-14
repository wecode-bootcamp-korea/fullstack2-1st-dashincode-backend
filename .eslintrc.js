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
  extends: ['prettier'],
  rules: {
    'import/prefer-default-export': ['off'],
    'no-console': 'off',
    'no-nested-ternary': 'on',
  },
};
