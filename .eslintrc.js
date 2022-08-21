/** @type {import('eslint').Linter.ParserOptions} */
const parserOptions = {
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    project: ['./tsconfig.json'],
}

/** @type {import('eslint').Linter.Config} */
const config = {
    extends: ['@detachhead/eslint-config'],
    parserOptions,
    rules: {
        // typescript-eslint enables this for typescript files only, but the js config files can benefit from it too because we aren't targeting an ancient node version
        'no-var': 'error',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    'playwright.config.ts',
                    '.eslintrc.cjs',
                    'src/browser/**/*.ts',
                    'tests/**/*.ts',
                ],
            },
        ],
    },
    overrides: [
        {
            files: ['src/browser/**/*.ts'],
            parserOptions: { ...parserOptions, project: ['./src/browser/tsconfig.json'] },
        },
        {
            files: ['.eslintrc.cjs'],
            parserOptions,
            rules: {
                // commonjs cant use esm imports, duh
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
}
module.exports = config
