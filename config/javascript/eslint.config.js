module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  env: {
    node: true,
    browser: true,
    'jest/globals': true,
  },
  globals: {
    window: true,
  },
  parserOptions: {
    sourceType: 'module'
  },
  plugins: [
    'babel',
    'compat',
    'import',
    'jest',
  ],
  rules: {
    'no-fallthrough': 'off',
    'class-methods-use-this': 'off',
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'max-len': ['error', 120],
    'space-before-function-paren': ['error', 'always'],
    'lines-between-class-members': ['error', 'always', {
      'exceptAfterSingleLine': true
    }],
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'max-lines': ['error', {
      'max': 180,
      'skipBlankLines': false,
      'skipComments': false
    }],
  }
};
