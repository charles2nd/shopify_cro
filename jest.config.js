const nextJest = require('next/jest')

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Module paths and aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
  },
  
  // Test patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx|js|jsx)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx|js|jsx)',
  ],
  
  // Exclude E2E tests from Jest
  testPathIgnorePatterns: [
    '<rootDir>/tests/e2e/',
    '<rootDir>/node_modules/',
  ],
  
  // Coverage configuration with 90% threshold enforcement
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.config.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
    '!src/app/**/layout.{js,jsx,ts,tsx}',
    '!src/app/**/loading.{js,jsx,ts,tsx}',
    '!src/app/**/error.{js,jsx,ts,tsx}',
    '!src/app/**/not-found.{js,jsx,ts,tsx}',
  ],
  
  // 90% coverage threshold - BLOCKS BUILD IF NOT MET
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    // Core components must have even higher coverage
    'src/lib/crawler/**': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    'src/lib/heuristics/**': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    'src/lib/llm/**': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  
  // Coverage reporting
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'json-summary',
  ],
  
  coverageDirectory: 'coverage',
  
  // Test timeout
  testTimeout: 10000,
  
  // Verbose output for TDD feedback
  verbose: true,
  
  // Fail fast on coverage threshold violations
  errorOnDeprecated: true,
  
  // Watch plugins for TDD workflow (removed due to version conflicts)
  // Can be added later if needed
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)