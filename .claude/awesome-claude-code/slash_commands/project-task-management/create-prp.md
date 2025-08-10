# Create Product Requirement Prompt (PRP)

Creates a comprehensive Product Requirement Prompt (PRP) that combines PRD with curated codebase intelligence and agent runbook - the minimum viable packet an AI needs to ship production-ready code on the first pass.

## Usage
```
/create-prp [feature/product description]
```

## What this command does:

### Research Process
1. **Documentation Review**:
   - Check `ai_docs/` directory for relevant documentation
   - Identify documentation gaps
   - Confirm additional documentation needs with user

2. **Web Research**:
   - Research feature/product concept
   - Examine library documentation  
   - Find example implementations on StackOverflow and GitHub
   - Gather implementation context and patterns

3. **Template Analysis**:
   - Use `concept_library/cc_PRP_flow/PRPs/base_template_v1` as structural reference
   - Review past templates in PRPs/ directory for inspiration
   - Ensure template understanding before proceeding

4. **Codebase Exploration**:
   - Identify relevant files and directories
   - Focus on specific areas as directed by user
   - Look for patterns to follow in implementation

### PRP Development
- Follows template structure in `concept_library/cc_PRP_flow/PRPs/base_template_v1`
- Includes comprehensive context through specific references
- Incorporates files, web search results, documentation, and examples
- Defines validation criteria and implementation approach

### Context Prioritization
A successful PRP must include:
- Files in the codebase
- Web search results and URLs
- Documentation references
- External resources
- Example implementations
- Validation criteria

### User Interaction
1. Present findings after initial research
2. Confirm scope, patterns, and implementation approach
3. Validate criteria with user
4. Continue with PRP creation if user confirms ("continue")

## Key Concept:
**PRP = PRD + curated codebase intelligence + agent/runbook**

This creates the minimum viable packet an AI needs to ship production-ready code on the first pass.

## File Dependencies:
- `concept_library/cc_PRP_flow/README.md` (PRP concept understanding)
- `concept_library/cc_PRP_flow/PRPs/base_template_v1` (structure template)
- Various codebase files (as identified during research)

## Author Information:
- **Author**: Wirasm
- **Source**: https://github.com/Wirasm/claudecode-utils/blob/main/.claude/commands/create-prp.md
- **License**: MIT