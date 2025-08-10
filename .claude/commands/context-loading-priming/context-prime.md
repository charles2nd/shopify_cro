# Context Prime Command

Loads comprehensive project context by reading README.md and then analyzing project structure through git ls-files, excluding files specified in .cursorignore.

## Usage
```
/context-prime
```

## What this command does:
1. **README Analysis**: Reads and analyzes the project's README.md for context
2. **Project Structure**: Uses `git ls-files | grep -v -f (sed 's|^|^|; s|$|/|' .cursorignore | psub)` to understand the project structure
3. **Context Loading**: Builds comprehensive understanding of project layout, goals, and structure
4. **Ignore Patterns**: Respects .cursorignore patterns to focus on relevant files

## Technical Details:
- Uses fish shell syntax with process substitution (`psub`)
- Filters out ignored files/directories from context loading
- Creates standardized project understanding baseline

## Use Cases:
- Beginning work on new projects
- Re-establishing context after breaks
- Onboarding to existing codebases
- Refreshing project understanding

## Author Information:
- **Author**: elizaOS
- **Source**: https://github.com/elizaOS/elizaos.github.io/blob/main/.claude/commands/context-prime.md
- **License**: MIT