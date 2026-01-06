module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jquery: true
  },
  extends: [
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true
    }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-undef': 'off',
    'prefer-arrow-callback': 'off',
    'func-names': 'off',
    'space-before-function-paren': 'off',
    'space-in-parens': 'off',
    'key-spacing': 'off',
    'comma-dangle': 'off',
    'comma-spacing': 'off',
    'no-trailing-spaces': 'off',
    'eol-last': 'off'
  }
};