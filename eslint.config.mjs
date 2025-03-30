// eslint.config.js
import js from '@eslint/js';
import node from 'eslint-plugin-n';
import jsdoc from 'eslint-plugin-jsdoc';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';

export default [
  js.configs.recommended,

  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  // 🧠 Backend Rules — Node.js ONLY for Discord Bot
  {
    files: ['banes-lab-bot/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node
      },
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
      'react/jsx-uses-react': 'error', // ✅ Important for older React versions
      'react/jsx-uses-vars': 'error', // ✅ Important to detect JSX variables like Link, ArrowLeft
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
