module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '@test/(.*)': '<rootDir>/test/$1',
    '@lib/(.*)': '<rootDir>/lib/$1'
  }
}
