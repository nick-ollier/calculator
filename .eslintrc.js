module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        'airbnb',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'testing-library',
        'react',
        '@typescript-eslint',
        'prettier',
        'import',
        'unused-imports',
        'jest-dom'
    ],
    rules: {
        'no-use-before-define': 0,
        'no-useless-escape': 0,
        'no-shadow': 0,
        'no-return-assign': 0,
        'consistent-return': 0,
        'default-case': 0,
        'prettier/prettier': ['warn'],
        'react/react-in-jsx-scope': 0,
        'react/jsx-props-no-spreading': 0,
        'react/prop-types': 0,
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
        ],
        '@typescript-eslint/explicit-module-boundary-types': 0,
        'import/no-unresolved': 'error',
        'import/prefer-default-export': 0,
        'import/no-cycle': 0,
        'import/no-extraneous-dependencies': [
            'off',
            { devDependencies: ['**/*.test.js', '**/*.spec.js'] }
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'unused-imports/no-unused-imports': 'error'
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            },
            typescript: {
                alwaysTryTypes: true,
                project: '.'
            },
            alias: [
                ['@appTypes', './types/index'],
                ['@components', './components'],
                ['@constants', './constants/index'],
                ['@context', './context'],
                ['@hooks', './hooks/index'],
                ['@hooks/', './hooks'],
                ['@styles', './styles'],
                ['@testUtils', './test-utils'],
                ['@utils', './utils/index']
            ]
        }
    }
};
