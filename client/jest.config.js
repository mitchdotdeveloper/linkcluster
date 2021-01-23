module.exports = {
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['node_modules/'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^modules/(.*)': '<rootDir>/src/modules/$1',
  },
  transformIgnorePatterns: ['node_modules/'],
};
