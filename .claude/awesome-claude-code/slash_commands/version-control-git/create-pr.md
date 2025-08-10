# Create Pull Request Command

Creates a new branch, commits changes, and submits a pull request with automatic formatting and intelligent commit splitting.

## Usage
```
/create-pr
```

## What this command does:
1. **Branch Creation**: Creates new branch based on current changes
2. **Code Formatting**: Formats modified files using Biome
3. **Commit Analysis**: Analyzes changes and splits into logical commits when appropriate
4. **Commit Creation**: Each commit focuses on single logical change with descriptive messages
5. **Remote Push**: Pushes branch to remote repository
6. **PR Creation**: Creates pull request with proper summary and test plan

## Automatic Commit Splitting Guidelines:
- **Feature Separation**: Split commits by feature, component, or concern
- **Related Changes**: Keep related file changes together in same commit
- **Change Type Separation**: Separate refactoring from feature additions
- **Independence**: Each commit should be understandable independently  
- **Logical Units**: Multiple unrelated changes split into separate commits

## Features:
- **Intelligent Splitting**: Automatically identifies logical commit boundaries
- **Code Formatting**: Ensures consistent code style before committing
- **Descriptive Messages**: Generates meaningful commit messages for each logical unit
- **Proper PR Structure**: Creates PRs with summary and test plan sections
- **Workflow Integration**: Handles entire branch creation to PR submission flow

## Process Flow:
1. Analyze current working directory changes
2. Create feature branch from current state
3. Run Biome formatting on modified files
4. Identify logical commit boundaries in changes
5. Create separate commits for each logical unit
6. Generate descriptive commit messages
7. Push branch to remote with proper upstream tracking
8. Create pull request with structured description

## Best Practices:
- **Single Responsibility**: Each commit addresses one concern
- **Atomic Changes**: Commits can be reverted independently
- **Clear Messages**: Commit messages explain the "why" not just "what"
- **Consistent Style**: All code formatted before committing
- **Complete Context**: PR description provides full context

## Author Information:
- **Author**: toyamarinyon
- **Source**: https://github.com/toyamarinyon/giselle/blob/main/.claude/commands/create-pr.md
- **License**: Apache-2.0