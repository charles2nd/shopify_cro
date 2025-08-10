# Update Branch Name Command

Analyzes current branch changes and updates branch name to be more descriptive based on the actual work being done.

## Usage
```
/update-branch-name
```

## What this command does:
1. **Change Analysis**: Checks differences between current branch and main using `git diff main...HEAD`
2. **File Analysis**: Analyzes changed files to understand the type of work being performed
3. **Name Generation**: Determines appropriate descriptive branch name based on changes
4. **Branch Rename**: Updates current branch name using `git branch -m [new-branch-name]`
5. **Verification**: Verifies branch name was updated with `git branch`

## Process Flow:

### 1. Analyze Changes
```bash
git diff main...HEAD
```
- Reviews all changes between main branch HEAD and current branch
- Identifies modified, added, and deleted files
- Analyzes the scope and nature of changes

### 2. Understand Work Context
- **Feature Development**: New functionality being added
- **Bug Fixes**: Issues being resolved
- **Refactoring**: Code structure improvements
- **Documentation**: Documentation updates
- **Configuration**: Build or config changes
- **Styling**: UI/visual changes

### 3. Generate Descriptive Name
Based on analysis, creates names following conventions:
- `feature/user-authentication` - New feature implementation
- `bugfix/login-redirect-issue` - Bug fix
- `refactor/payment-service` - Code refactoring
- `docs/api-documentation` - Documentation updates  
- `config/webpack-optimization` - Configuration changes
- `style/responsive-design` - Styling updates

### 4. Update Branch Name
```bash
git branch -m [new-branch-name]
```
- Renames the current branch to the new descriptive name
- Preserves all commit history and changes
- Updates local branch reference

### 5. Verify Update
```bash
git branch
```
- Confirms the branch name change was successful
- Shows current branch with new name
- Displays other available branches

## Naming Conventions:
- **Prefix**: Use category prefixes (feature/, bugfix/, refactor/, etc.)
- **Descriptive**: Name should clearly indicate what work is being done
- **Kebab-case**: Use hyphens to separate words
- **Concise**: Keep names reasonably short but descriptive
- **Meaningful**: Avoid generic names like "updates" or "changes"

## Examples:
```bash
# Before: generic branch name
$ git branch
* temp-branch

# After analysis and rename
$ git branch  
* feature/user-profile-settings

# Other examples:
* bugfix/memory-leak-in-parser
* refactor/database-connection-pool
* docs/setup-instructions
* config/eslint-rules-update
* style/dark-mode-theme
```

## Benefits:
- **Clear Intent**: Branch names immediately convey purpose
- **Team Communication**: Easier for team members to understand work
- **Organization**: Better repository organization and history
- **Context**: Provides context for future reference
- **Standards**: Encourages consistent naming practices

## Author Information:
- **Author**: giselles-ai
- **Source**: https://github.com/giselles-ai/giselle/blob/main/.claude/commands/update-branch-name.md
- **License**: Apache-2.0