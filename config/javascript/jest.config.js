module.exports = {
  verbose: true,
  roots: ['../../src/javascript/src'],
  setupFiles: ['./jest.init.js'],
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest.transformer.js',
  },
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ]
};
