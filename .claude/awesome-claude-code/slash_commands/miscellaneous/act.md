# Act Command - TDD React Development

Follows RED-GREEN-REFACTOR TDD cycle approach for React component development.

## Usage
```
/act
```

## What this command does:
1. **Todo Selection**: Opens todo.md and selects the first unchecked items to work on
2. **Planning**: Carefully plans each item and shares the plan
3. **Implementation**: Creates a new branch and implements the plan following TDD
4. **Completion**: Checks off items in todo.md and commits changes

## TDD Process:
1. **RED**: Write failing tests first
2. **GREEN**: Implement minimal code to make tests pass
3. **REFACTOR**: Improve code while keeping tests green

## Features:
- **Todo Integration**: Works directly with project todo.md files
- **Branch Management**: Creates new branches for each feature
- **TDD Enforcement**: Follows strict test-first development
- **React Focus**: Optimized for React component development
- **Planning Phase**: Requires explicit planning before implementation

## Implementation Flow:
1. Read and parse todo.md
2. Select first unchecked todo item
3. Create detailed implementation plan
4. Share plan for review/approval
5. Create new feature branch
6. Implement using TDD cycle
7. Update todo.md with completion status
8. Commit all changes

## Configuration:
Relies on `@~/.claude/CLAUDE.md` for TDD configuration and project-specific guidelines.

## Author Information:
- **Author**: sotayamashita
- **Source**: https://github.com/sotayamashita/dotfiles/blob/main/.claude/commands/act.md
- **License**: MIT