module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'ESNext',
    sourceType: 'module',
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  rules: {
    'import/no-unresolved': 'error',
    'import/order': 'warn',
    'import/no-named-as-default-member': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/newline-after-import': ['error'],
    'lines-between-class-members': ['error', 'always'],
    'max-lines-per-function': ['warn', 20],
    'max-params': ['warn', 3],
    'no-inline-comments': 'warn',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': { typescript: {}, node: {} },
  },
};
