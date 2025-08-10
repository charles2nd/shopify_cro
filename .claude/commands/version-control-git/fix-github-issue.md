# Fix GitHub Issue Command

Analyzes and fixes GitHub issues using a structured approach with GitHub CLI integration.

## Usage
```
/fix-github-issue <issue-number>
```

## What this command does:
1. **Issue Analysis**: Uses `gh issue view` to get detailed issue information
2. **Problem Understanding**: Analyzes the problem described in the issue
3. **Codebase Search**: Searches for relevant files related to the issue
4. **Implementation**: Implements necessary changes to fix the issue
5. **Testing**: Writes and runs tests to verify the fix works
6. **Quality Assurance**: Ensures code passes linting and type checking
7. **Documentation**: Creates descriptive commit message explaining the fix

## Process Flow:
1. **Retrieve Issue Details**:
   ```bash
   gh issue view <issue-number>
   ```

2. **Analyze Problem**:
   - Read issue description thoroughly
   - Understand expected vs actual behavior
   - Identify root cause of the problem
   - Determine scope of changes needed

3. **Locate Relevant Code**:
   - Search codebase for files related to the issue
   - Identify components that need modification
   - Understand code structure and dependencies

4. **Implement Solution**:
   - Make targeted changes to fix the issue
   - Follow existing code patterns and conventions
   - Ensure minimal scope of changes

5. **Verify Fix**:
   - Write tests to reproduce the original issue
   - Confirm tests fail before fix
   - Verify tests pass after fix implementation
   - Run existing test suite to prevent regressions

6. **Quality Checks**:
   - Run linting tools to ensure code style compliance
   - Execute type checking to catch type errors
   - Verify build process completes successfully

7. **Create Commit**:
   - Write descriptive commit message
   - Reference the GitHub issue number
   - Explain what was fixed and how

## Best Practices:
- **Issue Reference**: Always reference the issue number in commit messages
- **Minimal Changes**: Make only changes necessary to fix the issue
- **Test Coverage**: Include tests that verify the fix
- **Documentation**: Update relevant documentation if needed
- **Regression Prevention**: Ensure fix doesn't break existing functionality

## GitHub CLI Integration:
- **Issue Viewing**: `gh issue view` for detailed issue information
- **Issue Commenting**: `gh issue comment` to update progress
- **Issue Closing**: `gh issue close` when fix is implemented
- **PR Creation**: `gh pr create` to submit fix for review

## Example Commit Messages:
- `fix(auth): resolve login redirect issue - fixes #123`
- `fix(ui): correct button alignment in mobile view - closes #456`
- `fix(api): handle null response in user endpoint - resolves #789`

## Author Information:
- **Author**: jeremymailen
- **Source**: https://github.com/jeremymailen/kotlinter-gradle/blob/master/.claude/commands/fix-github-issue.md
- **License**: Apache-2.0