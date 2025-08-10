# Clean Code Command

Fixes all black, isort, flake8 and mypy issues in the entire codebase.

## Usage
```
/clean
```

## What this command does:
1. **Black Formatting**: Runs black to format Python code consistently
2. **Import Sorting**: Uses isort to organize and sort imports
3. **Linting**: Fixes flake8 linting issues across the codebase
4. **Type Checking**: Resolves mypy type errors

## Implementation Details:
- Runs tools in proper order (black first, then isort, then flake8, finally mypy)
- Applies fixes automatically where possible
- Reports issues that require manual intervention
- Ensures consistent code style across entire project

## Best Practices:
- Run before committing changes
- Use in conjunction with pre-commit hooks
- Regular maintenance to prevent code quality drift

## Author Information:
- **Author**: Graphlet-AI
- **Source**: https://github.com/Graphlet-AI/eridu/blob/main/.claude/commands/clean.md
- **License**: Apache-2.0