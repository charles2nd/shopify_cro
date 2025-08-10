# Claude Code Slash Commands Collection

This directory contains a comprehensive collection of slash commands extracted from the awesome-claude-code project. All commands are organized by category and ready for immediate use.

## 📂 Command Categories

### 🚀 CI / Deployment
Commands for continuous integration, deployment, and release management.

| Command | Description | Author |
|---------|-------------|--------|
| [/release](/Users/charles/Documents/projets_sulside/slash_commands/ci-deployment/release.md) | Updates changelog, checks README, and manages version increments | kelp |

### 🔍 Code Analysis & Testing
Commands for code quality, analysis, and testing workflows.

| Command | Description | Author |
|---------|-------------|--------|
| [/clean](/Users/charles/Documents/projets_sulside/slash_commands/code-analysis-testing/clean.md) | Fixes all black, isort, flake8 and mypy issues in codebase | Graphlet-AI |
| [/testing_plan_integration](/Users/charles/Documents/projets_sulside/slash_commands/code-analysis-testing/testing_plan_integration.md) | Creates integration testing plan with Rust-style inline tests | buster-so |

### 🧠 Context Loading & Priming
Commands for establishing project context and priming Claude with relevant information.

| Command | Description | Author |
|---------|-------------|--------|
| [/context-prime](/Users/charles/Documents/projets_sulside/slash_commands/context-loading-priming/context-prime.md) | Loads project context by reading README and analyzing structure | elizaOS |
| [/initref](/Users/charles/Documents/projets_sulside/slash_commands/context-loading-priming/initref.md) | Builds reference documentation using summarize tools | okuvshynov |
| [/load-llms-txt](/Users/charles/Documents/projets_sulside/slash_commands/context-loading-priming/load-llms-txt.md) | Loads external LLM configuration context from URL | ethpandaops |

### 📝 Documentation & Changelogs
Commands for managing documentation, changelogs, and project documentation.

| Command | Description | Author |
|---------|-------------|--------|
| [/add-to-changelog](/Users/charles/Documents/projets_sulside/slash_commands/documentation-changelogs/add-to-changelog.md) | Adds entries to CHANGELOG.md following Keep a Changelog format | berrydev-ai |
| [/update-docs](/Users/charles/Documents/projets_sulside/slash_commands/documentation-changelogs/update-docs.md) | Comprehensive documentation update for implementation status | Consiliency |

### 🛠️ Miscellaneous
Specialized commands for various development tasks.

| Command | Description | Author |
|---------|-------------|--------|
| [/act](/Users/charles/Documents/projets_sulside/slash_commands/miscellaneous/act.md) | TDD React development following RED-GREEN-REFACTOR cycle | sotayamashita |

### 📋 Project & Task Management
Commands for project planning, task management, and product development.

| Command | Description | Author |
|---------|-------------|--------|
| [/create-jtbd](/Users/charles/Documents/projets_sulside/slash_commands/project-task-management/create-jtbd.md) | Creates Jobs-to-be-Done documents for product features | taddyorg |
| [/create-prd](/Users/charles/Documents/projets_sulside/slash_commands/project-task-management/create-prd.md) | Creates Product Requirements Documents | taddyorg |
| [/create-prp](/Users/charles/Documents/projets_sulside/slash_commands/project-task-management/create-prp.md) | Creates Product Requirement Prompts with codebase intelligence | Wirasm |
| [/todo](/Users/charles/Documents/projets_sulside/slash_commands/project-task-management/todo.md) | Comprehensive todo management system with due dates and priorities | chrisleyva |

### 🔀 Version Control & Git
Commands for git workflows, branch management, and GitHub integration.

| Command | Description | Author |
|---------|-------------|--------|
| [/commit](/Users/charles/Documents/projets_sulside/slash_commands/version-control-git/commit.md) | Creates conventional commits with emoji and intelligent splitting | evmts |
| [/create-pr](/Users/charles/Documents/projets_sulside/slash_commands/version-control-git/create-pr.md) | Creates pull requests with automatic formatting and commit splitting | toyamarinyon |
| [/create-pull-request](/Users/charles/Documents/projets_sulside/slash_commands/version-control-git/create-pull-request.md) | Comprehensive GitHub CLI pull request creation guide | liam-hq |
| [/create-worktrees](/Users/charles/Documents/projets_sulside/slash_commands/version-control-git/create-worktrees.md) | Git worktree management for branches and pull requests | evmts |
| [/fix-github-issue](/Users/charles/Documents/projets_sulside/slash_commands/version-control-git/fix-github-issue.md) | Analyzes and fixes GitHub issues with structured approach | jeremymailen |
| [/husky](/Users/charles/Documents/projets_sulside/slash_commands/version-control-git/husky.md) | Sets up Husky git hooks for code quality enforcement | evmts |
| [/pr-review](/Users/charles/Documents/projets_sulside/slash_commands/version-control-git/pr-review.md) | Comprehensive multi-perspective PR review process | arkavo-org |
| [/update-branch-name](/Users/charles/Documents/projets_sulside/slash_commands/version-control-git/update-branch-name.md) | Updates branch names based on actual work being done | giselles-ai |

## 🚀 Quick Start

1. **Browse by Category**: Navigate to the relevant category folder
2. **Copy Commands**: Copy the command content to your `.claude/commands/` directory  
3. **Customize**: Modify commands to fit your project needs
4. **Use**: Execute commands with `/command-name` in Claude Code

## 📖 Usage Instructions

Each command file includes:
- **Usage examples** with syntax
- **Detailed descriptions** of functionality
- **Implementation details** and best practices
- **Author information** and source links
- **License information** where available

## 🔧 Customization

All commands can be customized for your specific project needs:
- Modify file paths and directory structures
- Adjust coding standards and conventions
- Update tool integrations (linting, testing, etc.)
- Customize commit message formats and PR templates

## 📚 Additional Resources

- **Source Project**: [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- **Claude Code Documentation**: [docs.anthropic.com](https://docs.anthropic.com/en/docs/claude-code)
- **Contributing**: Submit new commands to the awesome-claude-code project

## 📊 Command Statistics

- **Total Commands**: 21
- **Categories**: 6
- **Authors**: 15+ contributors
- **Licenses**: MIT, Apache-2.0, AGPL-3.0, and others

## 🤝 Contributing

Found a bug or want to improve a command? 
1. Test your improvements
2. Update documentation
3. Submit to the original awesome-claude-code project
4. Share with the Claude Code community

---

*All commands sourced from the awesome-claude-code project - a community-driven curation of Claude Code resources.*