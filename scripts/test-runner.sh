#!/bin/bash

# Test Runner Script for Shopify CRO Audit Tool
# Runs all test suites in the correct order

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Default values
RUN_UNIT=true
RUN_INTEGRATION=true
RUN_E2E=true
RUN_COVERAGE=true
WATCH_MODE=false
CI_MODE=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --unit-only)
            RUN_INTEGRATION=false
            RUN_E2E=false
            shift
            ;;
        --integration-only)
            RUN_UNIT=false
            RUN_E2E=false
            shift
            ;;
        --e2e-only)
            RUN_UNIT=false
            RUN_INTEGRATION=false
            RUN_COVERAGE=false
            shift
            ;;
        --no-coverage)
            RUN_COVERAGE=false
            shift
            ;;
        --watch)
            WATCH_MODE=true
            RUN_E2E=false  # Don't run E2E in watch mode
            shift
            ;;
        --ci)
            CI_MODE=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --unit-only       Run only unit tests"
            echo "  --integration-only Run only integration tests"
            echo "  --e2e-only        Run only E2E tests"
            echo "  --no-coverage     Skip coverage reporting"
            echo "  --watch           Run tests in watch mode"
            echo "  --ci              Run in CI mode with stricter settings"
            echo "  --help, -h        Show this help message"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

print_status "🚀 Starting test runner for Shopify CRO Audit Tool"

# Check if required environment variables are set
if [[ -z "$NODE_ENV" ]]; then
    export NODE_ENV=test
fi

# Ensure test database is ready
if [[ "$RUN_INTEGRATION" == true ]] || [[ "$RUN_E2E" == true ]]; then
    print_status "🗄️  Setting up test database..."
    if ! npm run test:db:setup; then
        print_error "Failed to setup test database"
        exit 1
    fi
    print_success "Test database ready"
fi

# Run linting and type checking
if [[ "$CI_MODE" == true ]]; then
    print_status "🔍 Running linting and type checking..."
    
    if ! npm run lint; then
        print_error "Linting failed"
        exit 1
    fi
    
    if ! npm run type-check; then
        print_error "Type checking failed"
        exit 1
    fi
    
    print_success "Code quality checks passed"
fi

# Run unit tests
if [[ "$RUN_UNIT" == true ]]; then
    print_status "🧪 Running unit tests..."
    
    if [[ "$WATCH_MODE" == true ]]; then
        npm run test:unit -- --watch
        exit 0
    else
        if ! npm run test:unit; then
            print_error "Unit tests failed"
            exit 1
        fi
        print_success "Unit tests passed"
    fi
fi

# Run integration tests
if [[ "$RUN_INTEGRATION" == true ]]; then
    print_status "🔗 Running integration tests..."
    
    if [[ "$WATCH_MODE" == true ]]; then
        npm run test:integration -- --watch
        exit 0
    else
        if ! npm run test:integration; then
            print_error "Integration tests failed"
            exit 1
        fi
        print_success "Integration tests passed"
    fi
fi

# Generate coverage report
if [[ "$RUN_COVERAGE" == true ]] && [[ "$WATCH_MODE" == false ]]; then
    print_status "📊 Generating coverage report..."
    
    if ! npm run test:coverage; then
        print_warning "Coverage report generation failed"
    else
        print_success "Coverage report generated"
        
        # Show coverage summary
        if [[ -f "coverage/coverage-summary.json" ]]; then
            node -e "
                const fs = require('fs');
                const coverage = JSON.parse(fs.readFileSync('coverage/coverage-summary.json', 'utf8'));
                const total = coverage.total;
                console.log('\\n📊 Coverage Summary:');
                console.log(\`Lines:      \${total.lines.pct}%\`);
                console.log(\`Functions:  \${total.functions.pct}%\`);
                console.log(\`Branches:   \${total.branches.pct}%\`);
                console.log(\`Statements: \${total.statements.pct}%\`);
                
                // Check if coverage meets thresholds
                const minCoverage = 90;
                if (total.lines.pct < minCoverage) {
                    console.log(\`⚠️  Line coverage (\${total.lines.pct}%) is below threshold (\${minCoverage}%)\`);
                    process.exit(1);
                }
            "
        fi
    fi
fi

# Run E2E tests
if [[ "$RUN_E2E" == true ]]; then
    print_status "🎭 Running E2E tests..."
    
    # Install Playwright browsers if needed
    if ! npx playwright install --with-deps chromium; then
        print_warning "Failed to install Playwright browsers"
    fi
    
    # Build the app for E2E tests
    print_status "🏗️  Building application for E2E tests..."
    if ! npm run build; then
        print_error "Failed to build application"
        exit 1
    fi
    
    # Run E2E tests
    if ! npm run test:e2e; then
        print_error "E2E tests failed"
        
        # Show Playwright report URL if available
        if [[ -d "playwright-report" ]]; then
            print_status "📋 Playwright report available at: playwright-report/index.html"
        fi
        
        exit 1
    fi
    
    print_success "E2E tests passed"
fi

# Cleanup test database
if [[ "$CI_MODE" == true ]]; then
    print_status "🧹 Cleaning up test database..."
    npm run test:db:teardown || true
fi

print_success "🎉 All tests completed successfully!"

# Show final summary
echo ""
echo "📋 Test Summary:"
[[ "$RUN_UNIT" == true ]] && echo "  ✅ Unit tests"
[[ "$RUN_INTEGRATION" == true ]] && echo "  ✅ Integration tests"  
[[ "$RUN_E2E" == true ]] && echo "  ✅ E2E tests"
[[ "$RUN_COVERAGE" == true ]] && echo "  ✅ Coverage report"
echo ""

# Open coverage report if available and not in CI
if [[ "$RUN_COVERAGE" == true ]] && [[ "$CI_MODE" == false ]] && [[ -f "coverage/lcov-report/index.html" ]]; then
    print_status "Opening coverage report..."
    if command -v open >/dev/null 2>&1; then
        open coverage/lcov-report/index.html
    elif command -v xdg-open >/dev/null 2>&1; then
        xdg-open coverage/lcov-report/index.html
    fi
fi