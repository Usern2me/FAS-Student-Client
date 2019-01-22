module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:compat/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  "plugins": [
    "react"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  rules: {
    "no-control-regex": 2,
    "no-unused-vars":1,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/jsx-wrap-multilines': 0,
    "no-console": 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/no-unresolved': [
      0,
      {
        ignore: ['^@/', '^umi/'],
      },
    ],
    'import/no-extraneous-dependencies': [
      0,
      {
        optionalDependencies: true,
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/heading-has-content': 0,
    "jsx-a11y/label-has-for": 0,
    'linebreak-style': 0,
    "prefer-destructuring": ["error", { "object": true, "array": false }],
    "react/prefer-stateless-function": [0, {
      "ignorePureComponents": true
    }],

    'indent': [1,2],
    'no-use-before-define': 0,
  },
  settings: {
    polyfills: ['fetch', 'promises', 'url'],
    'import/ignore': 'services/',
  },
};
