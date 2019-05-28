module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
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
