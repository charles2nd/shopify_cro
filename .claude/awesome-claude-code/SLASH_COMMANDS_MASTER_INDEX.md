# 🎯 Master Slash Commands Index for Claude Code

## 📊 Statistics
- **Total Commands Available**: 100+ commands
- **Extracted & Documented**: 21 core commands
- **Categories**: 6 main categories
- **Source**: awesome-claude-code project

## 🚀 Quick Start
To use any slash command:
1. Copy the command file to `.claude/commands/` directory
2. Use the command with `/command-name` in Claude Code
3. Follow the implementation guidelines in each command file

## 📁 Command Categories & Full List

### 1️⃣ Version Control & Git (8 commands)
| Command | Description | Author |
|---------|-------------|---------|
| `/commit` | Smart conventional commits with emoji support | @codebyte-ai |
| `/create-pr` | Create pull requests with templates | @riajul-98 |
| `/create-pull-request` | Alternative PR creation workflow | @codebyte-ai |
| `/create-worktrees` | Manage Git worktrees efficiently | @punkpeye |
| `/fix-github-issue` | Fix GitHub issues systematically | @punkpeye |
| `/husky` | Configure Husky git hooks | @riajul-98 |
| `/pr-review` | Multi-perspective code review | @hesreallyhim |
| `/update-branch-name` | Update branch names with conventions | @riajul-98 |

### 2️⃣ Project & Task Management (5 commands)
| Command | Description | Author |
|---------|-------------|---------|
| `/todo` | Full project todo management | @michaelfaisst |
| `/create-jtbd` | Create Jobs To Be Done documents | @zaidmukaddam |
| `/create-prd` | Generate Product Requirements Docs | @zaidmukaddam |
| `/create-prp` | Create Project Proposals | @zaidmukaddam |
| `/act` | Simulate GitHub Actions locally | @riajul-98 |

### 3️⃣ Code Analysis & Testing (2 commands)
| Command | Description | Author |
|---------|-------------|---------|
| `/clean` | Fix all Python linting issues | @jasonLaster |
| `/testing_plan_integration` | Create comprehensive test plans | @berezovyy |

### 4️⃣ Context Loading & Priming (3 commands)
| Command | Description | Author |
|---------|-------------|---------|
| `/context-prime` | Prime Claude with project context | @jmagar |
| `/initref` | Initialize reference documentation | @calebsheridan |
| `/load-llms-txt` | Load llms.txt configuration | @calebsheridan |

### 5️⃣ Documentation & Changelogs (2 commands)
| Command | Description | Author |
|---------|-------------|---------|
| `/add-to-changelog` | Add entries to CHANGELOG.md | @riajul-98 |
| `/update-docs` | Update project documentation | @riajul-98 |

### 6️⃣ CI/CD & Deployment (1 command)
| Command | Description | Author |
|---------|-------------|---------|
| `/release` | Create semantic version releases | @lukejmann |

## 🌟 Most Powerful Commands

### 🥇 `/commit` - Smart Conventional Commits
- Auto-generates semantic commit messages
- Adds appropriate emojis
- Splits large changes into atomic commits
- Follows conventional commit standards

### 🥈 `/todo` - Complete Todo Management
```bash
/todo add "Implement user authentication" @high #backend 2024-12-31
/todo view
/todo complete 1
```

### 🥉 `/pr-review` - Multi-Perspective Review
Provides 5 different review perspectives:
1. Security Auditor
2. Senior Developer
3. Performance Engineer
4. UX/DX Advocate
5. Devil's Advocate

### 🏅 `/clean` - Python Code Cleanup
Automatically fixes:
- Black formatting
- isort imports
- flake8 issues
- mypy type errors

### 🏅 `/context-prime` - Project Context Loading
Intelligently loads:
- Project structure
- Key dependencies
- Architecture patterns
- Configuration files

## 📚 Additional Commands in CSV Database

The full awesome-claude-code project contains 100+ additional commands including:
- `/analyze-code` - Deep code analysis
- `/tdd` - Test-driven development workflow
- `/prompt-improver` - Enhance prompts
- `/code-reviewer` - Comprehensive code review
- `/api-documentor` - Generate API documentation
- `/commit-helper` - Assisted git commits
- `/dependency-analyzer` - Analyze project dependencies
- `/feature-branch` - Create feature branches
- `/git-flow` - Implement git-flow workflow
- `/lint-fix` - Fix linting issues across languages
- `/merge-conflict-resolver` - Resolve merge conflicts
- `/performance-profiler` - Profile code performance
- `/refactor` - Systematic code refactoring
- `/security-scan` - Security vulnerability scanning
- `/test-generator` - Generate test cases
- And many more...

## 🔧 Resource Management

### Access Full Command Database
```bash
# View all commands in CSV
cat THE_RESOURCES_TABLE.csv | grep "slash-commands"

# Search for specific commands
python scripts/search_commands.py "keyword"

# Add new command
python scripts/add_resource.py
```

### Command Location
- **Extracted Commands**: `/slash_commands/`
- **Full Database**: `THE_RESOURCES_TABLE.csv`
- **Resources**: `/resources/slash-commands/`
- **Scripts**: `/scripts/`

## 🎨 Creating Custom Commands

### Template Structure
```markdown
# /command-name

## Description
Brief description of what the command does

## Usage
/command-name [arguments]

## Implementation
<implementation-instructions>
Detailed steps Claude should follow
</implementation-instructions>

## Examples
Show practical usage examples

## Author
@github-username
```

## 🔍 Finding Commands

### By Category
- Navigate to `/slash_commands/[category]/`
- Check README.md in each category folder

### By Keyword
```bash
grep -r "keyword" slash_commands/
```

### By Author
```bash
grep "@author-name" slash_commands/**/*.md
```

## 📈 Command Usage Tips

1. **Chain Commands**: Combine multiple commands for workflows
   ```
   /context-prime → /create-prd → /todo → /commit
   ```

2. **Custom Workflows**: Create command sequences for repeated tasks

3. **Project-Specific**: Add custom commands to `.claude/commands/`

4. **Version Control**: Track command modifications in git

## 🔗 Resources

- **Main Repository**: [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- **Submit New Command**: [GitHub Issues](https://github.com/hesreallyhim/awesome-claude-code/issues/new?template=submit-resource.yml)
- **Contributing Guide**: See CONTRIBUTING.md
- **How It Works**: See HOW_IT_WORKS.md

## 🚦 Status
- ✅ All core commands extracted and documented
- ✅ Category organization complete
- ✅ Index and quick reference created
- ✅ Resource management system integrated
- ✅ Full CSV database available

---

*Last Updated: 2025-08-08*
*Generated from awesome-claude-code project*