# Commit Command

Creates well-formatted commits with conventional commit messages and emoji, including automatic pre-commit checks and intelligent commit splitting.

## Usage
```
/commit
/commit --no-verify
```

## What this command does:

### Pre-commit Checks (unless --no-verify)
1. `pnpm lint` - Ensure code quality
2. `pnpm build` - Verify build succeeds  
3. `pnpm generate:docs` - Update documentation

### Commit Process
1. **File Staging**: Checks staged files with `git status`, auto-adds all modified/new files if none staged
2. **Change Analysis**: Performs `git diff` to understand changes
3. **Commit Splitting**: Analyzes if multiple logical changes should be separate commits
4. **Message Generation**: Creates emoji conventional commit format messages
5. **Commit Creation**: Executes commits with proper formatting

## Commit Splitting Guidelines
Commits are split based on:
- **Different concerns**: Unrelated codebase parts
- **Different types**: Features vs fixes vs refactoring
- **File patterns**: Source code vs documentation  
- **Logical grouping**: Changes better understood separately
- **Size**: Large changes broken into smaller logical units

## Conventional Commit Format
Uses format: `<emoji> <type>: <description>`

### Commit Types & Emojis:
- ✨ `feat`: New feature
- 🐛 `fix`: Bug fix  
- 📝 `docs`: Documentation
- 💄 `style`: Formatting/style
- ♻️ `refactor`: Code refactoring
- ⚡️ `perf`: Performance improvements
- ✅ `test`: Tests
- 🔧 `chore`: Tooling, configuration
- 🚀 `ci`: CI/CD improvements
- 🗑️ `revert`: Reverting changes

### Extended Emoji Set:
- 🧪 `test`: Add failing test
- 🚨 `fix`: Fix compiler/linter warnings
- 🔒️ `fix`: Fix security issues
- 👥 `chore`: Add/update contributors
- 🚚 `refactor`: Move/rename resources
- 🏗️ `refactor`: Architectural changes
- 🔀 `chore`: Merge branches
- 📦️ `chore`: Add/update packages
- ➕ `chore`: Add dependency
- ➖ `chore`: Remove dependency
- 🧑‍💻 `chore`: Improve developer experience
- 🔍️ `feat`: Improve SEO
- 🏷️ `feat`: Add/update types
- 💬 `feat`: Add/update text
- 🌐 `feat`: Internationalization
- 👔 `feat`: Business logic
- 📱 `feat`: Responsive design
- 🚸 `feat`: Improve UX/usability
- 🩹 `fix`: Simple non-critical fix
- 🥅 `fix`: Catch errors
- 👽️ `fix`: External API changes
- 🔥 `fix`: Remove code/files
- 🎨 `style`: Improve code structure
- 🚑️ `fix`: Critical hotfix
- 🎉 `chore`: Begin project
- 🔖 `chore`: Release/version tags
- 🚧 `wip`: Work in progress
- 💚 `fix`: Fix CI build
- 📈 `feat`: Analytics/tracking
- ♿️ `feat`: Improve accessibility

## Example Good Commit Messages:
- ✨ feat: add user authentication system
- 🐛 fix: resolve memory leak in rendering process  
- 📝 docs: update API documentation with new endpoints
- ♻️ refactor: simplify error handling logic in parser
- 🚨 fix: resolve linter warnings in component files
- 🧑‍💻 chore: improve developer tooling setup process
- 🩹 fix: address minor styling inconsistency in header
- 🚑️ fix: patch critical security vulnerability in auth flow

## Best Practices:
- **Atomic commits**: Each commit serves single purpose
- **Split large changes**: Multiple concerns → separate commits  
- **Present tense, imperative**: "add feature" not "added feature"
- **Concise first line**: Under 72 characters
- **Pre-commit verification**: Code linted, built, docs updated

## Command Options:
- `--no-verify`: Skip pre-commit checks (lint, build, generate:docs)

## Author Information:
- **Author**: evmts
- **Source**: https://github.com/evmts/tevm-monorepo/blob/main/.claude/commands/commit.md
- **License**: MIT