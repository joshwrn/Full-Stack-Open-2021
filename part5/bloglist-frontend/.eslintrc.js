module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest'],
  rules: {
    semi: 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'spaced-comment': 'off',
    'react/prop-types': 'off',
    'react/button-has-type': 'off',
    'object-curly-newline': 'off',
    'arrow-body-style': 'off',
    'comma-dangle': 'off',
    'object-shorthand': 'off',
    'prefer-template': 'off',
    'no-unused-expressions': ['error', { allowTernary: true }],
    'react-hooks/exhaustive-deps': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
