const baseJestConfig = require('./jest.config');

module.exports = {
  ...baseJestConfig,
  coverageReporters: [
    'text',
    'text-summary',
    'text-lcov',
    'lcov',
  ],
};
