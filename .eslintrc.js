/**
 * @import {Linter} from 'eslint'
 */

/** @type {Linter.ParserOptions} */
const parserOptions = {
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    project: ['./tsconfig.json'],
}

/** @type {Linter.Config} */
const config = {
    extends: ['@detachhead/eslint-config'],
    parserOptions,
    rules: {
        // typescript-eslint enables this for typescript files only, but the js config files can benefit from it too because we aren't targeting an ancient node version
        'no-var': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off', // not a public api
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
        ...['src/common', 'src/browser', 'src/node', 'tests'].map(
            (path) =>
                /** @type {const} @satisfies {Linter.ConfigOverride<Linter.RulesRecord>} */ ({
                    files: [`${path}/**/*.ts`],
                    parserOptions: { ...parserOptions, project: [`./${path}/tsconfig.json`] },
                    rules: {
                        '@typescript-eslint/explicit-module-boundary-types': path.startsWith('src/')
                            ? 'error'
                            : 'off', // not a public api
                    },
                }),
        ),
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
