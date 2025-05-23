// eslint.config.js
import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';
import html from 'eslint-plugin-html';
import jsdoc from 'eslint-plugin-jsdoc';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import unusedimports from 'eslint-plugin-unused-imports';
import globals from 'globals';
export default [
  js.configs.recommended,

  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  // 🧠 Backend Rules — Node.js ONLY for Discord Bot

  // 🎨 Frontend Rules — React JSX via Vite
  {
    files: ['src/**/*.{html,js,jsx}'],
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
    plugins: {
      react,
      jsdoc,
      prettier,
      html,
      'unused-imports': unusedimports
    },
    rules: {
      'no-console': 'off', // 🧪 allow for dev/debug use
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
      ],
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
      'no-unused-labels': 'warn',
      'no-eval': 'error', // Disallow usage of eval()
      'no-new-func': 'error', // Disallow the use of the `Function` constructor
      'prefer-const': 'warn',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'error', // ✅ Important for older React versions
      'react/jsx-uses-vars': 'error', // ✅ Important to detect JSX variables like Link, ArrowLeft
      'react/jsx-pascal-case': 'warn', // Ensure JSX elements are written in PascalCase
      'react/no-direct-mutation-state': 'error', // Disallow direct mutation of `this.state`
      'react/no-unsafe': 'warn', // Warn on unsafe lifecycle methods
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/check-param-names': 'warn',
      'jsdoc/require-jsdoc': 'warn',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',
      'jsdoc/require-description': ['warn', { checkConstructors: false }],
      'jsdoc/require-param-type': 'warn',
      'jsdoc/require-returns-type': 'warn',
      'jsdoc/require-param-description': 'warn'
    },

    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // 🚫 Ignore specific paths (globally)
  {
    ignores: ['node_modules', 'dist', 'build', '.vscode/scripts/', 'index.html']
  }
];
