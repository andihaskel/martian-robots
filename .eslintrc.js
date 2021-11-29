module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/prefer-default-export': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'operator-linebreak': ['error'],
    'no-use-before-define': ['error', { variables: false }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'no-unused-vars': 'off',
    'implicit-arrow-linebreak': ['error'],
    'no-restricted-syntax': ['error', 'ForInStatement'],
    'max-len': ['error', { code: 120 }],
    'class-methods-use-this': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
};
