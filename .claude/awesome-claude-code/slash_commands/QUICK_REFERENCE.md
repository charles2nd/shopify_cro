# Slash Commands Quick Reference

## Most Popular Commands

### Essential Git & GitHub
```bash
/commit              # Smart commit with conventional messages & emoji
/create-pr          # Create PR with automatic formatting & commit splitting  
/fix-github-issue   # Analyze and fix GitHub issues systematically
/pr-review          # Comprehensive multi-perspective PR review
```

### Project Management
```bash
/todo               # Full-featured todo management with due dates
/create-prd         # Product Requirements Document creation
/create-jtbd        # Jobs-to-be-Done framework documents
```

### Code Quality & Testing
```bash
/clean              # Fix all linting issues (black, isort, flake8, mypy)
/testing_plan_integration  # Create comprehensive test plans
/husky              # Set up git hooks for code quality
```

### Documentation & Context
```bash
/context-prime      # Load comprehensive project context
/add-to-changelog   # Manage changelog entries
/update-docs        # Update implementation documentation
```

## Quick Usage Examples

### Start New Feature
```bash
/context-prime                    # Load project context
/todo add "Implement user auth"   # Add to todo list
/create-jtbd                      # Create user needs analysis
/create-prd                       # Create requirements doc
```

### Code & Commit Workflow
```bash
/clean                           # Fix code quality issues
/testing_plan_integration auth   # Create test plan
/commit                          # Smart commit with proper messages
/create-pr                       # Create formatted pull request
```

### Code Review Process
```bash
/pr-review 123                   # Comprehensive PR review
/fix-github-issue 456            # Fix reported issues
/update-docs                     # Update implementation docs
```

### Project Maintenance
```bash
/todo list                       # Check current todos
/husky                           # Set up quality gates
/release                         # Manage version releases
/create-worktrees               # Set up branch worktrees
```

## Command Categories at a Glance

| Category | Commands | Key Focus |
|----------|----------|-----------|
| **Git & GitHub** | commit, create-pr, fix-github-issue, pr-review | Version control workflow |
| **Project Mgmt** | todo, create-prd, create-jtbd, create-prp | Planning & requirements |
| **Code Quality** | clean, testing_plan_integration, husky | Quality assurance |
| **Documentation** | context-prime, add-to-changelog, update-docs | Knowledge management |

## Pro Tips

1. **Start with context**: Always use `/context-prime` when beginning work
2. **Quality first**: Run `/clean` before committing code
3. **Document as you go**: Use `/add-to-changelog` for every change
4. **Review thoroughly**: Use `/pr-review` for comprehensive code reviews
5. **Stay organized**: Use `/todo` to track all tasks with due dates

---
*For complete documentation, see [README.md](/Users/charles/Documents/projets_sulside/slash_commands/README.md)*