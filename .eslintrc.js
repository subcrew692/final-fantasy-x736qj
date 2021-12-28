module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb', '@vue/typescript/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  settings: {
    'import/extensions': ['.js', '.d.ts', '.ts', '.vue'],
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-plusplus': 'off',
    'comma-dangle': 'off',
    'implicit-arrow-linebreak': 0,
    'max-len': ['error', { code: 200 }],
    'no-trailing-spaces': ['error', { ignoreComments: true }],
    'object-curly-newline': 0,
    'newline-per-chained-call': 0,
    'import/no-unresolved': 0,
    'no-trailing-spaces': ['error', { ignoreComments: true }],
    '@typescript-eslint/no-empty-function': 0,
    'no-shadow': 'off',
    '@typescript-eslint/ban-ts-comment': 0,
    'no-unused-expressions': 0,
    'operator-linebreak': 0,
    'no-param-reassign': 0,
  },
};
