module.exports = {
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  watchPathIgnorePatterns: ['/node_modules/', '/.next/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '^@api(.*)$': '<rootDir>/api$1',
    '^@common(.*)$': '<rootDir>/common$1',
    '^@modules(.*)$': '<rootDir>/modules$1',
    '^@patient(.*)$': '<rootDir>/patient$1',
  },
}
