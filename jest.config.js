module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            'babelConfig': true,
            'tsconfig': 'tsconfig.json'
        }
    },
    setupFilesAfterEnv: [
        '<rootDir>/jest-configs/setup-tests.js',
    ],
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|scss)$': '<rootDir>/jest-configs/no-parser-stub.js',
    },
    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};