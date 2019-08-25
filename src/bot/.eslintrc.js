module.exports = {
  extends: 'aqua/node',
  rules: {
    indent: ['error', 2],
    'max-depth': ['error', 4],
    'no-use-before-define': 0,
    "quote-props": "off",
    'max-len': [
      'error',
      100,
      2,
      {
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ]
  }
};
