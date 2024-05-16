import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',   // NEVER CHANGE testEnvironment to anything but 'jsdom' here. If you require a different test environment for your jest unit test like 'node', follow this resource: https://jestjs.io/docs/configuration#testenvironment-string
  moduleNameMapper: {
    '^next/router$': '<rootDir>/__mocks__/next/router',
  },
  clearMocks: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/mock_prisma/mock_prisma_singleton.ts'] // Setup prisma mock object through singleton file
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)