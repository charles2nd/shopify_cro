# Husky Git Hooks Setup

Sets up and manages Husky Git hooks for automated code quality enforcement and commit message standards.

## Usage
```
/husky
```

## What this command does:
1. **Hook Configuration**: Configures pre-commit hooks using Husky
2. **Commit Standards**: Establishes commit message standards and validation
3. **Linting Integration**: Integrates with linting tools for automatic code quality checks
4. **Quality Assurance**: Ensures code quality standards on every commit

## Husky Setup Process:

### Installation
```bash
# Install Husky
npm install --save-dev husky

# Initialize Husky
npx husky install

# Make it automatic after install
npm pkg set scripts.prepare="husky install"
```

### Pre-commit Hook Setup
```bash
# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint-staged"

# Configure lint-staged in package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

### Commit Message Hook
```bash
# Add commit message validation
npx husky add .husky/commit-msg "npx commitlint --edit $1"

# Configure commitlint
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

## Hook Types Configured:

### Pre-commit
- **Linting**: Runs ESLint with auto-fix
- **Formatting**: Applies Prettier formatting
- **Type Checking**: Validates TypeScript types
- **Tests**: Runs relevant test suites
- **Build Verification**: Ensures code builds successfully

### Commit-msg
- **Message Format**: Validates conventional commit format
- **Length Limits**: Enforces commit message length standards
- **Type Validation**: Ensures proper commit types (feat, fix, etc.)

### Pre-push
- **Full Test Suite**: Runs comprehensive tests before push
- **Build Verification**: Confirms production build succeeds
- **Integration Tests**: Validates system integration

## Configuration Files:

### .husky/pre-commit
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint-staged
npm run test:staged
npm run build:verify
```

### .husky/commit-msg
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx commitlint --edit $1
```

### .husky/pre-push
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run test:ci
npm run build:production
```

## Integration with Development Workflow:
- **Automatic Setup**: Hooks installed automatically on `npm install`
- **Team Consistency**: Ensures all team members follow same standards
- **Quality Gates**: Prevents low-quality code from entering repository
- **Fast Feedback**: Catches issues before they reach CI/CD pipeline

## Customization Options:
- **Tool Integration**: Works with ESLint, Prettier, Jest, TypeScript
- **Custom Scripts**: Add project-specific validation scripts
- **Conditional Execution**: Run hooks based on changed files
- **Performance Optimization**: Cache results for faster execution

## Benefits:
- **Code Quality**: Maintains consistent code quality standards
- **Commit Standards**: Enforces conventional commit message format
- **Team Alignment**: Ensures all developers follow same practices  
- **Early Detection**: Catches issues before code review
- **Automation**: Reduces manual code quality checks

## Author Information:
- **Author**: evmts
- **Source**: https://github.com/evmts/tevm-monorepo/blob/main/.claude/commands/husky.md
- **License**: MIT