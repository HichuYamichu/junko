module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/semi': 'error',
        'max-len': ['warn', { code: 100, ignoreComments: true }],
        '@typescript-eslint/no-non-null-assertion': ['off']
    }
};