const js = require('@eslint/js');
const node = require('eslint-plugin-n');
const jsdoc = require('eslint-plugin-jsdoc');
const react = require('eslint-plugin-react');
const prettier = require('eslint-plugin-prettier');
const babelParser = require('@babel/eslint-parser');
const globals = require('globals');

module.exports = [
  js.configs.recommended,

  {
    globals: {
      ...globals.node
    }
  },
  // 🧠 Backend Rules — Node.js ONLY for Discord Bot
  {
    files: ['banes-lab-bot/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: { node },
    rules: {
      'node/no-missing-require': 'error',
      'node/no-unpublished-require': 'off',
      'node/no-deprecated-api': 'error',
      'node/callback-return': 'error',
      'node/exports-style': ['error', 'module.exports']
    }
  },

  // 🎨 Frontend Rules — React JSX via Vite
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        React: 'writable',
        fetch: 'readonly',
        console: 'readonly',
        Image: 'readonly',
        ...globals.node
      }
    },
    plugins: { react, jsdoc, prettier },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'off', // 🧪 allow for dev/debug use
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
      'prefer-const': 'warn',
      'react/prop-types': 'off',
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/check-param-names': 'warn',
      'jsdoc/require-jsdoc': 'warn',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // 🚫 Ignore specific paths (globally)
  {
    ignores: ['node_modules', 'dist', 'build', '.vscode/scripts/']
  }
];
