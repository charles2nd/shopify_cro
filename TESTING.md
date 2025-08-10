# Testing Guide for Shopify CRO Audit Tool

This document provides comprehensive information about the testing framework and best practices for the Shopify CRO audit tool.

## Overview

Our testing strategy follows the testing pyramid principle:
- **Many unit tests** for business logic validation
- **Fewer integration tests** for API routes and database interactions  
- **Minimal E2E tests** for critical user flows

## Test Structure

```
├── src/
│   ├── lib/
│   │   ├── heuristics/
│   │   │   └── __tests__/unit/        # Unit tests for heuristic rules
│   │   ├── scoring/
│   │   │   └── __tests__/unit/        # Unit tests for scoring logic
│   │   └── validation/
│   │       └── __tests__/unit/        # Unit tests for validation
│   └── components/
│       └── __tests__/                 # Component tests with RTL
├── tests/
│   ├── integration/                   # API and database integration tests
│   ├── e2e/                          # Playwright E2E tests
│   ├── mocks/                        # Shared mock objects
│   └── setup/                        # Test configuration and setup
└── playwright/                       # Playwright configuration and auth
```

## Getting Started

### Prerequisites

1. Node.js 18+ and npm
2. PostgreSQL 14+ (for integration tests)
3. Environment variables configured in `.env.test`

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Setup test database
npm run test:db:setup
```

### Running Tests

#### Quick Commands

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Watch mode for development
npm run test:watch

# Run complete test suite (like CI)
./scripts/test-runner.sh --ci
```

#### Advanced Test Runner

Use the test runner script for more control:

```bash
# Run only unit tests
./scripts/test-runner.sh --unit-only

# Run without coverage
./scripts/test-runner.sh --no-coverage

# Run in watch mode
./scripts/test-runner.sh --watch

# Run in CI mode with all quality checks
./scripts/test-runner.sh --ci
```

## Test Types

### Unit Tests

Test individual functions and components in isolation.

**Location**: `src/**/__tests__/unit/`

**Example**: Testing heuristic rules
```typescript
// src/lib/heuristics/__tests__/unit/hero-cta.test.ts
import { checkHeroCTA } from '../../hero-cta'
import * as cheerio from 'cheerio'

describe('Hero CTA Heuristics', () => {
  it('should find CTA in hero section', () => {
    const html = '<div class="hero"><a class="btn">Shop Now</a></div>'
    const $ = cheerio.load(html)
    
    const result = checkHeroCTA($, 'https://test-store.com')
    
    expect(result.found).toBe(true)
    expect(result.text).toBe('Shop Now')
  })
})
```

**Best Practices:**
- Use AAA pattern (Arrange, Act, Assert)
- Test both happy path and edge cases
- Mock external dependencies
- Focus on behavior, not implementation

### Component Tests

Test React components with user interactions.

**Location**: `src/components/__tests__/`

**Example**: Testing audit results component
```typescript
// src/components/__tests__/audit-results.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AuditResults from '../audit-results'

describe('AuditResults', () => {
  it('should filter findings by severity', async () => {
    const user = userEvent.setup()
    render(<AuditResults {...mockProps} />)
    
    await user.selectOptions(screen.getByTestId('severity-filter'), 'high')
    
    expect(screen.getByTestId('finding-high-1')).toBeVisible()
    expect(screen.queryByTestId('finding-low-1')).not.toBeInTheDocument()
  })
})
```

**Best Practices:**
- Use `data-testid` for reliable element selection
- Test user interactions with `@testing-library/user-event`
- Mock external API calls and props
- Test accessibility attributes

### Integration Tests

Test API routes and database interactions.

**Location**: `tests/integration/`

**Example**: Testing audit API endpoint
```typescript
// tests/integration/audit-api.test.ts
import { POST as auditHandler } from '@/app/api/audit/route'
import { mockPrisma } from '../setup/integration-setup'

describe('Audit API', () => {
  it('should start audit successfully', async () => {
    mockPrisma.site.findUnique.mockResolvedValue(mockSite)
    mockPrisma.crawl.create.mockResolvedValue(mockCrawl)
    
    const request = new NextRequest('http://localhost/api/audit', {
      method: 'POST',
      body: JSON.stringify({ siteId: 'test-123' })
    })
    
    const response = await auditHandler(request)
    
    expect(response.status).toBe(200)
  })
})
```

**Best Practices:**
- Use mocked database for predictable tests
- Test error scenarios (404, 500, validation errors)
- Verify database state changes
- Test authentication and authorization

### End-to-End Tests

Test complete user workflows across the application.

**Location**: `tests/e2e/`

**Example**: Testing audit flow
```typescript
// tests/e2e/audit-flow.spec.ts
import { test, expect } from '@playwright/test'

test('should complete full audit flow', async ({ page }) => {
  await page.goto('/dashboard')
  
  // Add new site
  await page.click('[data-testid="add-site-button"]')
  await page.fill('[data-testid="site-url"]', 'https://test-store.com')
  
  // Start audit
  await page.click('[data-testid="start-audit"]')
  
  // Verify results
  await expect(page.locator('[data-testid="audit-score"]')).toContainText('/100')
})
```

**Best Practices:**
- Test critical user journeys
- Use mock APIs for external services
- Test across different browsers and devices
- Keep tests focused and independent

## Mocking Strategy

### External APIs

We provide comprehensive mocks for:

- **OpenAI**: Chat completions and embeddings
- **Clerk**: Authentication and user management  
- **Shopify**: Store crawling and page content
- **Vercel Blob**: File storage

**Example**: Using OpenAI mock
```typescript
import { mockOpenAIResponses, createMockOpenAI } from '../mocks/openai'

const { mockCreate } = createMockOpenAI()
mockCreate.mockResolvedValue(mockOpenAIResponses.chatCompletion.success)
```

### Database

Integration tests use `jest-mock-extended` with Prisma:

```typescript
import { mockPrisma } from '../setup/integration-setup'

// Mock successful database response
mockPrisma.crawl.create.mockResolvedValue(mockCrawl)
```

## Test Data

### Fixtures

Pre-defined test data is available in:
- `tests/mocks/` - Mock API responses
- `prisma/seed.ts` - Database seed data
- `jest.setup.js` - Global test utilities

### Creating Test Data

Use factory functions for consistent test data:

```typescript
// In jest.setup.js
global.TestUtils = {
  mockCrawlData: {
    id: 'test-crawl-id',
    status: 'completed',
    // ... other properties
  }
}

// In tests
const crawl = { ...global.TestUtils.mockCrawlData, status: 'running' }
```

## Coverage Requirements

We maintain high coverage standards:

- **Lines**: 90%+ (95%+ for critical modules)
- **Functions**: 85%+
- **Branches**: 85%+
- **Statements**: 90%+

### Viewing Coverage

```bash
# Generate and open coverage report
npm run test:coverage
open coverage/lcov-report/index.html
```

### Coverage Exclusions

The following are excluded from coverage:
- Configuration files
- Test files
- Type definitions
- Build artifacts

## CI/CD Pipeline

Our GitHub Actions workflow runs:

1. **Code Quality**: Linting and type checking
2. **Unit Tests**: Fast feedback on logic
3. **Integration Tests**: API and database validation
4. **E2E Tests**: Critical user flows
5. **Performance Tests**: Lighthouse CI on main branch
6. **Security Tests**: Dependency scanning and CodeQL

### Pipeline Configuration

```yaml
# .github/workflows/test.yml
- name: Run unit tests
  run: npm run test:unit
  env:
    NODE_ENV: test
    DATABASE_URL: ${{ env.TEST_DATABASE_URL }}
```

## Best Practices

### Test Organization

1. **Group related tests** with `describe` blocks
2. **Use descriptive names** that explain the behavior being tested
3. **One assertion per test** when possible
4. **Setup and teardown** properly to avoid test pollution

### Writing Tests

1. **Test behavior, not implementation**
2. **Use the user's perspective** for component tests
3. **Test error cases** and edge conditions
4. **Keep tests simple and focused**

### Performance

1. **Run unit tests first** (fastest feedback)
2. **Parallelize test execution** where possible
3. **Use test doubles** to avoid expensive operations
4. **Clean up after tests** to prevent memory leaks

### Debugging Tests

```bash
# Run specific test file
npm test -- hero-cta.test.ts

# Run tests in debug mode
npm test -- --runInBand --detectOpenHandles

# Debug Playwright tests
npx playwright test --debug
```

## Continuous Integration

### Local Testing

Before pushing code:

```bash
# Run full test suite
./scripts/test-runner.sh --ci

# Quick validation
npm run test:unit && npm run type-check && npm run lint
```

### Pull Request Requirements

All PRs must:
- [ ] Pass all tests
- [ ] Maintain 90%+ test coverage
- [ ] Include tests for new functionality
- [ ] Pass code quality checks

### Branch Protection

The `main` branch requires:
- Status checks to pass
- Up-to-date branches
- Review approval
- No failing tests

## Troubleshooting

### Common Issues

**Database connection errors:**
```bash
# Reset test database
npm run test:db:setup
```

**Playwright browser issues:**
```bash
# Reinstall browsers
npx playwright install --with-deps
```

**Memory leaks in tests:**
```bash
# Run with memory debugging
npm test -- --runInBand --logHeapUsage
```

**Flaky tests:**
- Use `waitFor` instead of arbitrary timeouts
- Mock time-dependent code
- Avoid relying on external services

### Getting Help

1. Check test logs for specific error messages
2. Review mock configurations for external APIs
3. Verify environment variables are set correctly
4. Check if test data conflicts with expectations

## Contributing

When adding new features:

1. **Write tests first** (TDD approach)
2. **Aim for high coverage** of new code
3. **Update mocks** if adding new external dependencies
4. **Add E2E tests** for new user-facing features
5. **Update this documentation** for new testing patterns

---

For questions or issues with the testing setup, please create an issue in the repository or reach out to the development team.