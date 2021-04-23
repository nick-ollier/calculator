/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/cypress',
        '/types',
        '/constants'
    ],
    coverageReporters: ['json', 'text', 'lcov', 'clover', 'json-summary'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    setupFilesAfterEnv: ['./jestSetup.js'],
    testEnvironment: 'jsdom',
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)'
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/cypress/',
        '/types',
        '/constants'
    ]
};
