# GitHub Coverage Integration Setup

## ✅ Already Configured for Your Repo

**Your GitHub Repository**: https://github.com/charles2nd/shopify_cro

All badges and links have been updated to point to your repository:
1. **README badges** configured for `charles2nd/shopify_cro`
2. **GitHub Actions workflow** ready (`.github/workflows/coverage.yml`)
3. **Coverage reporting** integrated with Codecov
4. **GitHub Pages** configured for `https://charles2nd.github.io/shopify_cro/coverage/`

## Next Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Add coverage integration and GitHub Actions workflow"
git push origin main
```

### 3. Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Source: **GitHub Actions**
3. The coverage workflow will automatically publish to `https://your-username.github.io/shopify-cro-copilot/coverage/`

### 4. Optional: Codecov Integration
1. Go to [codecov.io](https://codecov.io)
2. Sign up with your GitHub account
3. Add your repository
4. Copy the upload token (optional - public repos work without it)
5. Add as repository secret: `CODECOV_TOKEN`

### 5. Optional: Advanced Coverage Badge
For dynamic coverage badges, add this repository secret:
- **Name**: `COVERAGE_BADGE_TOKEN`
- **Value**: A GitHub personal access token with repo permissions

## What Happens Automatically

### On Every Push/PR:
- ✅ Runs all tests with coverage
- ✅ Generates coverage reports (HTML, LCOV, JSON)
- ✅ Uploads coverage to Codecov
- ✅ Comments on PRs with coverage changes
- ✅ Updates coverage badge in README

### On Main Branch Push:
- ✅ Publishes coverage report to GitHub Pages
- ✅ Updates coverage percentage badge
- ✅ Deploys latest coverage data

## Commands for Local Development

```bash
# Generate coverage report
npm run test:coverage

# View local coverage report
open coverage/lcov-report/index.html

# Check current coverage percentage
node -e "
  const summary = require('./coverage/coverage-summary.json');
  console.log('Coverage:', summary.total.statements.pct + '%');
"
```

## Coverage Thresholds

The project enforces these minimums:
- **Global**: 90% (statements, branches, functions, lines)
- **Core modules** (heuristics, crawler, llm): 95%
- **Individual files**: 80% minimum

## Badges Explained

- **Coverage**: Shows current test coverage percentage
- **Build Status**: Shows if CI/CD pipeline is passing
- **TypeScript**: Indicates strict TypeScript usage
- **TDD**: Emphasizes test-driven development methodology

## Your Project URLs

- **Repository**: https://github.com/charles2nd/shopify_cro
- **Coverage Report**: https://charles2nd.github.io/shopify_cro/coverage/
- **GitHub Actions**: https://github.com/charles2nd/shopify_cro/actions
- **Codecov**: https://codecov.io/gh/charles2nd/shopify_cro