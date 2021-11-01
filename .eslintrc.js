module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb', '@vue/typescript/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-plusplus': 'off',
    'comma-dangle': 'off',
    'implicit-arrow-linebreak': 0,
    'max-len': ['error', { code: 200 }],
    'no-trailing-spaces': ['error', { ignoreComments: true }],
    '@typescript-eslint/no-empty-function': 0,
  },
};
