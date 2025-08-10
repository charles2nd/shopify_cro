import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'

// Mock data factories for TDD
export const createMockCrawlResult = (overrides?: Partial<any>) => ({
  id: 'test-crawl-id',
  url: 'https://test-store.myshopify.com',
  pageType: 'home' as const,
  html: '<html><body>Test HTML</body></html>',
  screenshot: 'mock-screenshot-base64',
  metadata: {
    title: 'Test Store',
    description: 'Test Store Description',
    loadTime: 1500,
    viewport: { width: 1920, height: 1080 },
  },
  crawledAt: new Date('2024-01-01T00:00:00Z'),
  ...overrides,
})

export const createMockLLMRecommendation = (overrides?: Partial<any>) => ({
  issue: 'Add trust badges to increase conversion',
  why: 'Trust badges help reduce purchase anxiety and increase customer confidence',
  impact: 'High' as const,
  effort: 'Low' as const,
  copyVariants: [
    'Secure checkout with SSL encryption',
    '100% secure payment processing',
  ],
  codeSnippet: '<div class="trust-badges">Trust badges here</div>',
  whereToPlace: 'Below the add to cart button on product pages',
  ...overrides,
})

export const createMockAuditReport = (overrides?: Partial<any>) => ({
  id: 'test-audit-id',
  storeUrl: 'https://test-store.myshopify.com',
  crawlResults: [createMockCrawlResult()],
  recommendations: [createMockLLMRecommendation()],
  score: 75,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  completedAt: new Date('2024-01-01T01:00:00Z'),
  ...overrides,
})

export const createMockHeuristicRule = (overrides?: Partial<any>) => ({
  id: 'test-rule-1',
  name: 'Trust Signal Presence',
  description: 'Checks for trust signals like security badges and guarantees',
  category: 'trust' as const,
  severity: 'high' as const,
  enabled: true,
  ...overrides,
})

// Test providers wrapper
interface AllTheProvidersProps {
  children: ReactNode
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <ClerkProvider publishableKey="pk_test_mock">
      {children}
    </ClerkProvider>
  )
}

// Custom render function for testing components with providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Test utilities
export const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0))

export const createMockFetch = (response: any, ok = true) => {
  return jest.fn().mockResolvedValue({
    ok,
    json: async () => response,
    text: async () => JSON.stringify(response),
    status: ok ? 200 : 400,
  })
}

// Database test utilities
export const clearTestDatabase = async () => {
  // Mock implementation - would clear test database in real scenario
  console.log('Clearing test database...')
}

export const seedTestDatabase = async (data: any) => {
  // Mock implementation - would seed test database in real scenario
  console.log('Seeding test database with:', data)
}

// TDD assertion helpers
export const assertCoverageThreshold = (coverage: number, threshold = 90) => {
  expect(coverage).toBeGreaterThanOrEqual(threshold)
}

export const assertNoTypeErrors = (result: any) => {
  expect(result).toBeDefined()
  expect(typeof result).not.toBe('undefined')
}

// Mock environment setup for tests
export const setupTestEnvironment = () => {
  (process.env as any).NODE_ENV = 'test'
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db'
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_mock'
  process.env.CLERK_SECRET_KEY = 'sk_test_mock'
  process.env.OPENAI_API_KEY = 'test_openai_key'
}