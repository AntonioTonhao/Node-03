module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',  // parser para TS
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',  // regras TS
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
