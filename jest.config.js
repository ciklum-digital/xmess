module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: [
    'text',
    'text-summary',
    'text-lcov',
    'lcov',
  ],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '**/*.ts',
    '!**/dist/**',
    '!**/playground/**',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/playground/',
  ],
  testMatch: [
    '**/src/**/*.spec.ts',
  ],
};
