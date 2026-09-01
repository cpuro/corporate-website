import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  { ignores: ['dist', 'coverage'] },

  // Base: browser source (src/**, vite entry, etc.)
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // eslint-plugin-react is only pulled in for JSX var resolution — without
      // it, core no-unused-vars can't see `<motion.div>` / `<Icon/>` usage and
      // false-flags those imports. The rest of the plugin's recommended rules
      // (prop-types, etc.) are intentionally NOT enabled.
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // Accessibility: the plugin's *recommended* rule set, downgraded from error
  // to warn (repo has an A11Y.md, so the intent is there). Only rules that
  // recommended actually enables are touched — rules it ships as "off"
  // (deprecated ones like label-has-for, or strict-only ones) stay off.
  {
    files: ['**/*.jsx'],
    plugins: { 'jsx-a11y': jsxA11y },
    rules: Object.fromEntries(
      Object.entries(jsxA11y.flatConfigs.recommended.rules)
        .filter(([, level]) => level !== 'off' && level !== 0)
        .map(([rule]) => [rule, 'warn']),
    ),
  },

  // Jest test + setup files + manual mocks: browser (jsdom) + node + jest globals
  {
    files: [
      '**/*.{test,spec}.{js,jsx}',
      'src/setupTests.js',
      'jest.setup.cjs',
      '**/__mocks__/**/*.{js,jsx}',
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
  },

  // Tooling / config files: node globals, CommonJS where applicable
  {
    files: ['**/*.config.{js,cjs}', '**/*.cjs', 'vite.config.js', 'eslint.config.js'],
    languageOptions: {
      globals: { ...globals.node },
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
  },
]
