module.exports = {
    clearMocks: true,
    coverageProvider: 'v8',
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/usecases/**/*usecase.js'],
    coverageDirectory: 'coverage',
    coverageReporters: ['text-summary', 'lcov'],
    testEnvironment: 'node',
    testMatch: ['<rootDir>/__tests__/**/*spec.js'],
};
