module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['import'],
  rules: {
    'prettier/prettier': ['error', { semi: true, trailingComma: 'all' }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          {
            pattern: 'react-native',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
};
