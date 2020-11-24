module.exports = {
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['node_modules/', '.next/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    'components/(.*)': '<rootDir>/src/components/$1',
  },
  transformIgnorePatterns: ['node_modules/'],
};
