const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'unicorn',
    'unused-imports' // ✅ Add the unused-imports plugin
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off', // Disable default rule
    'unused-imports/no-unused-imports': 'warn', // ✅ Auto remove unused imports
    'unused-imports/no-unused-vars': [
      'warn',
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'no-return-await': ['error'],
    'object-shorthand': ['error'],
    'no-unneeded-ternary': ['error'],
    '@typescript-eslint/no-namespace': 'off',
    'prefer-template': ['error'],
    '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
    'no-empty': ['error', { allowEmptyCatch: true }],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/',
  ],
};
