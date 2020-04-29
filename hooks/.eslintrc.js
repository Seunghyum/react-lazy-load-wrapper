module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['import', 'react-hooks', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/prefer-stateless-function': 0,
    'no-underscore-dangle': 'off',
    'react/forbid-prop-types': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-one-expression-per-line': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-unescaped-entities': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'no-else-return': 'off',
    'consistent-return': 'off',
    'react/no-array-index-key': 'off',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
}
