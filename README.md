# Shopify CRO Copilot

[![Test Coverage](https://img.shields.io/badge/coverage-90%25-brightgreen.svg)](https://charles2nd.github.io/shopify_cro/coverage/)
[![Build Status](https://github.com/charles2nd/shopify_cro/workflows/Coverage%20Report/badge.svg)](https://github.com/charles2nd/shopify_cro/actions)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)
[![TDD](https://img.shields.io/badge/methodology-TDD-red.svg)](https://testdriven.io/)

AI-powered Shopify store optimization with strict TDD practices and 90% coverage enforcement.

## 🎯 Project Overview

This is a sophisticated Shopify CRO (Conversion Rate Optimization) tool that follows Test-Driven Development principles. The project provides actionable recommendations to improve Shopify store conversion rates using AI-powered analysis.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <your-repo>
cd shopify-cro-copilot

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Fill in your actual values in .env.local

# Generate Prisma client
npm run db:generate

# Run tests (TDD compliance check)
npm run test:coverage

# Start development server
npm run dev
```

## 🧪 TDD Workflow

This project enforces strict TDD practices with comprehensive tooling:

### TDD Commands

```bash
# Start TDD cycle - write failing tests first
npm run tdd:red

# Make tests pass with minimal implementation
npm run tdd:green

# Refactor while keeping tests green
npm run tdd:refactor

# Check all quality gates
npm run tdd:check

# Full TDD workflow helper
npm run tdd [red|green|refactor|check]
```

### Coverage Requirements

- **Global Coverage**: 90% minimum (statements, branches, functions, lines)
- **Core Components**: 95% minimum (crawler, heuristics, LLM)
- **Quality Gates**: TypeScript strict mode, ESLint, test coverage

### Test Structure

```
src/
├── lib/
│   ├── crawler/
│   │   ├── __tests__/           # RED-GREEN-REFACTOR tests
│   │   └── crawler.ts           # Implementation (write after tests)
│   ├── heuristics/
│   │   ├── __tests__/           # TDD test suites
│   │   └── heuristics.ts        # TDD implementation
│   └── llm/
│       ├── __tests__/           # Comprehensive test coverage
│       └── llm.ts               # AI service implementation
tests/
├── unit/                        # Jest unit tests
├── integration/                 # Integration tests
└── e2e/                        # Playwright E2E tests
```

## 🏗️ Architecture

### Core Components

1. **Crawler Service** (`src/lib/crawler/`)
   - Shopify store page crawling with Playwright
   - Screenshot capture and HTML analysis
   - Performance metrics collection

2. **Heuristics Engine** (`src/lib/heuristics/`)
   - 7 core CRO heuristic rules
   - Automated analysis of crawled content
   - Scoring and recommendation generation

3. **LLM Service** (`src/lib/llm/`)
   - OpenAI integration for smart recommendations
   - Zod validation for structured outputs
   - Context-aware Shopify optimization advice

4. **Database Layer** (`src/lib/prisma/`)
   - PostgreSQL with Prisma ORM
   - Audit tracking and result storage
   - User management with Clerk auth

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL + Prisma
- **Authentication**: Clerk
- **AI**: OpenAI GPT-4
- **Crawling**: Playwright
- **Testing**: Jest + Testing Library + Playwright
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 🧪 Testing Strategy

### 1. Unit Tests (Jest + Testing Library)
```bash
npm run test              # Run unit tests
npm run test:watch        # Watch mode for TDD
npm run test:coverage     # With coverage report
```

### 2. Integration Tests
```bash
npm run test:integration  # Database and API integration
```

### 3. E2E Tests (Playwright)
```bash
npm run test:e2e          # Full user journeys
npm run test:e2e:ui       # Interactive test runner
```

### 4. Performance Tests
- Crawler performance: <500ms TTFB
- Crawl failure rate: <5%
- API response times monitored

## 📊 Coverage Reports

Coverage reports are automatically generated and integrated with GitHub:

### Local Development
- **HTML Report**: `coverage/lcov-report/index.html`
- **JSON Summary**: `coverage/coverage-summary.json` 
- **LCOV**: `coverage/lcov.info`

### GitHub Integration
Coverage badges are automatically updated via GitHub Actions. The workflow:
1. Runs tests with coverage on every push/PR
2. Generates coverage reports
3. Updates README badges
4. Publishes coverage to GitHub Pages (optional)

View live coverage: [Coverage Report](https://charles2nd.github.io/shopify_cro/coverage/)

## 🚦 Quality Gates

The project includes automated quality gates that run on:

### Pre-commit Hooks
```bash
npm run precommit         # Full quality check before commit
```

**Checks include**:
- TypeScript compilation
- ESLint code quality
- Test execution and coverage
- TDD compliance validation

### CI/CD Pipeline
```bash
npm run test:ci           # Optimized for CI environments
```

## 🔧 Development Guidelines

### TDD Red-Green-Refactor Cycle

1. **RED Phase**: Write failing tests first
   ```bash
   npm run tdd:red
   # Write tests in __tests__/ directories
   # Tests should fail because implementation doesn't exist
   ```

2. **GREEN Phase**: Implement minimal code to pass tests
   ```bash
   npm run tdd:green
   # Write just enough code to make tests pass
   # Focus on functionality over perfection
   ```

3. **REFACTOR Phase**: Improve code while keeping tests green
   ```bash
   npm run tdd:refactor
   # Improve structure, readability, performance
   # Tests must continue passing throughout
   ```

### Code Standards

- **TypeScript**: Strict mode, no `any` types
- **Testing**: 90% coverage minimum, TDD approach
- **Error Handling**: Typed errors with proper boundaries
- **Performance**: Meet specified benchmarks
- **Documentation**: Comprehensive README and inline docs

## 🌟 Features

### Current (TDD Implementation Ready)
- ✅ Project setup with strict TDD enforcement
- ✅ Comprehensive testing infrastructure
- ✅ Type-safe development environment
- ✅ Quality gates and automation
- ✅ Database schema and auth setup

### Planned (Following TDD Cycle)
- ⏳ Shopify store crawler (tests written, awaiting implementation)
- ⏳ Heuristic analysis engine (TDD approach)
- ⏳ AI recommendation system (test-driven)
- ⏳ Report generation and UI (comprehensive testing)

## 📈 Performance Requirements

- **Crawling**: <500ms TTFB (Time to First Byte)
- **Analysis**: Complete audit in <2 minutes
- **Failure Rate**: <5% for crawling operations
- **Test Coverage**: 90% global, 95% core components
- **Type Coverage**: 100% (no `any` types)

## 🤝 Contributing

1. **Follow TDD**: Always write tests before implementation
2. **Meet Coverage**: Ensure 90% coverage minimum
3. **Type Safety**: Use strict TypeScript, no `any`
4. **Quality Gates**: All checks must pass before merge
5. **Documentation**: Update README for new features

### Development Workflow
```bash
# Start new feature (TDD cycle)
git checkout -b feature/new-feature

# Write failing tests first (RED)
npm run tdd:red

# Implement minimal code (GREEN) 
npm run tdd:green

# Refactor and improve (REFACTOR)
npm run tdd:refactor

# Final quality check
npm run tdd:check

# Commit (triggers quality gates)
git commit -m "feat: add new feature with comprehensive tests"
```

## 📚 Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Prisma ORM Guide](https://www.prisma.io/docs)
- [Jest Testing Framework](https://jestjs.io/docs)
- [Playwright E2E Testing](https://playwright.dev/docs)
- [TDD Best Practices](https://testdriven.io/blog/modern-tdd/)

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ and strict TDD practices**