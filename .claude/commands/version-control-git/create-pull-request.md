# Create Pull Request Guide

Comprehensive guide for creating pull requests using GitHub CLI with proper conventions and templates.

## Usage
Basic command structure:
```bash
gh pr create --title "✨(scope): Your descriptive title" --body "Your PR description" --base main --draft
```

## Prerequisites
1. **Install GitHub CLI**:
   ```bash
   # macOS
   brew install gh
   
   # Windows  
   winget install --id GitHub.cli
   
   # Linux
   # Follow instructions at https://github.com/cli/cli/blob/trunk/docs/install_linux.md
   ```

2. **Authenticate**:
   ```bash
   gh auth login
   ```

## Creating Pull Requests

### Basic PR Creation
```bash
gh pr create --title "✨(scope): Your descriptive title" --body "Your PR description" --base main --draft
```

### Complex PR with Template
```bash
gh pr create --title "✨(scope): Your descriptive title" --body-file <(echo -e "## Issue\n\n- resolve:\n\n## Why is this change needed?\nYour description here.\n\n## What would you like reviewers to focus on?\n- Point 1\n- Point 2\n\n## Testing Verification\nHow you tested these changes.\n\n## What was done\npr_agent:summary\n\n## Detailed Changes\npr_agent:walkthrough\n\n## Additional Notes\nAny additional notes.") --base main --draft
```

## Best Practices

### PR Title Format
Use conventional commit format with emojis:
- Always include appropriate emoji at beginning
- Use actual emoji character (not code like `:sparkles:`)
- Examples:
  - `✨(supabase): Add staging remote configuration`
  - `🐛(auth): Fix login redirect issue`  
  - `📝(readme): Update installation instructions`

### Description Template
Follow PR template structure from `.github/pull_request_template.md`:
- Issue reference
- Why the change is needed
- Review focus points  
- Testing verification
- PR-Agent sections (keep `pr_agent:summary` and `pr_agent:walkthrough` intact)
- Additional notes

### Template Accuracy
- Don't modify or rename PR-Agent sections
- Keep all section headers exactly as in template
- Don't add custom sections not in template
- Include all sections even if marked "N/A" or "None"

### Draft PRs
- Start as draft when work is in progress
- Use `--draft` flag in command
- Convert to ready using `gh pr ready` when complete

## Common Mistakes to Avoid
1. **Incorrect Section Headers**: Use exact headers from template
2. **Modifying PR-Agent Sections**: Don't remove `pr_agent:summary` and `pr_agent:walkthrough` placeholders
3. **Adding Custom Sections**: Stick to template-defined sections
4. **Using Outdated Templates**: Always refer to current `.github/pull_request_template.md`

## Additional GitHub CLI Commands

### PR Management
```bash
# List your open pull requests
gh pr list --author "@me"

# Check PR status
gh pr status

# View specific PR
gh pr view <PR-NUMBER>

# Check out PR branch locally  
gh pr checkout <PR-NUMBER>

# Convert draft to ready
gh pr ready <PR-NUMBER>

# Add reviewers
gh pr edit <PR-NUMBER> --add-reviewer username1,username2

# Merge PR
gh pr merge <PR-NUMBER> --squash
```

### Using Template Files
1. Create `pr-template.md` with your PR template
2. Use with:
   ```bash
   gh pr create --title "feat(scope): Your title" --body-file pr-template.md --base main --draft
   ```

## Related Documentation
- [PR Template](.github/pull_request_template.md)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub CLI documentation](https://cli.github.com/manual/)

## Author Information:
- **Author**: liam-hq
- **Source**: https://github.com/liam-hq/liam/blob/main/.claude/commands/create-pull-request.md
- **License**: Apache-2.0