module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['import', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // react, react-native
          'external', // 3rd party
          'internal', // alias
          ['parent', 'sibling', 'index'], // local
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-native',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
