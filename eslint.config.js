import tsParser from '@typescript-eslint/parser'
import tseslint from '@typescript-eslint/eslint-plugin'
import cypressPlugin from 'eslint-plugin-cypress'
import pluginMocha from 'eslint-plugin-mocha'

export default [
  {
    files: ['**/*.ts', '**/*.js'],
    ignores: ['node_modules', 'dist', 'build', 'cypress/videos', 'cypress/screenshots'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      globals: {
        // manually define Cypress globals
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        context: 'readonly',
        suite: 'readonly',
        test: 'readonly',
        node: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      cypress: cypressPlugin,
      mocha: pluginMocha,
    },
    rules: {
      // manually define important Cypress rules
      'cypress/no-unnecessary-waiting': 'error',

      'cypress/no-async-tests': 'error',
      'cypress/no-pause': 'warn',
      'mocha/no-exclusive-tests': 'error',
      'mocha/no-pending-tests': 'off',
      'mocha/no-mocha-arrows': 'off',

      // your custom rules
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'max-len': ['warn', { code: 120 }],
    },
  },
]
