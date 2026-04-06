import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              '^react$',
              '^react-dom$',
              // Third-party packages.
              '^@?\\w',
              '^@/pages(/.*|$)',
              '^@/widgets(/.*|$)',
              '^@/entities(/.*|$)',
              '^@/shared(/.*|$)',
              // Parent-relative imports.
              '^\\.\\.(?!/?$)',
              // Parent directory index imports.
              '^\\.\\./?$',
              // Same-folder nested imports.
              '^\\./(?=.*/)(?!/?$)',
              // Same-folder direct imports.
              '^\\.(?!/?$)',
              // Same-folder index imports.
              '^\\./?$',
              // Styles.
              '^.+\\.s?css$',
            ],
          ],
        },
      ],
    },
  },
]);
