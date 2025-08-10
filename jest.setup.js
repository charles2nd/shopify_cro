import '@testing-library/jest-dom'

// Mock environment variables for testing
process.env.NODE_ENV = 'test'
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db'
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'test_key'
process.env.CLERK_SECRET_KEY = 'test_secret'
process.env.OPENAI_API_KEY = 'test_openai_key'

// Global test configuration
global.console = {
  ...console,
  // Uncomment to ignore console warnings/errors during tests
  // warn: jest.fn(),
  // error: jest.fn(),
}

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  auth: () => ({
    userId: 'test-user-id',
    sessionId: 'test-session-id',
  }),
  currentUser: () => ({
    id: 'test-user-id',
    emailAddresses: [{ emailAddress: 'test@example.com' }],
  }),
  ClerkProvider: ({ children }) => children,
  SignIn: () => <div data-testid="sign-in">Sign In</div>,
  SignUp: () => <div data-testid="sign-up">Sign Up</div>,
  UserButton: () => <div data-testid="user-button">User Button</div>,
}))

// Mock Prisma Client
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    audit: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    crawlResult: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    recommendation: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

// Mock OpenAI
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  issue: 'Test issue',
                  why: 'Test explanation',
                  impact: 'High',
                  effort: 'Low',
                  copyVariants: ['Test copy 1', 'Test copy 2'],
                  codeSnippet: '<div>Test snippet</div>',
                  whereToPlace: 'Test placement instructions',
                }),
              },
            },
          ],
        }),
      },
    },
  }))
})

// Mock Playwright
jest.mock('playwright', () => ({
  chromium: {
    launch: jest.fn().mockResolvedValue({
      newContext: jest.fn().mockResolvedValue({
        newPage: jest.fn().mockResolvedValue({
          goto: jest.fn(),
          content: jest.fn().mockResolvedValue('<html><body>Test HTML</body></html>'),
          screenshot: jest.fn().mockResolvedValue(Buffer.from('test-screenshot')),
          close: jest.fn(),
        }),
        close: jest.fn(),
      }),
      close: jest.fn(),
    }),
  },
}))

// Setup DOM environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock fetch for API testing
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  })
)

// Reset all mocks before each test for clean TDD cycles
beforeEach(() => {
  jest.clearAllMocks()
})