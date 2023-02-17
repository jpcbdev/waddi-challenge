module.exports = {
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testRegex: '.+\\.ts',
    moduleFileExtensions: ['ts', 'js'],
    rootDir: 'tests',
    testEnvironment: "node",
}