# Update Documentation Command

Comprehensive documentation update command for implementation status, phase documents, and project documentation.

## Usage
```
/update-docs
```

## What this command does:

### Documentation Analysis
1. **Status Review**: Checks `specs/implementation_status.md` for overall project status
2. **Phase Analysis**: Reviews implemented phase document (`specs/phase{N}_implementation_plan.md`)
3. **Spec Review**: Examines implementation specification documents
4. **Testing Review**: Updates `specs/testing_plan.md` based on recent test results
5. **Project Docs**: Reviews `CLAUDE.md` and `README.md` for project-wide updates

### Documentation Updates
1. **Phase Documents**: 
   - Mark completed tasks with ✅ status
   - Update implementation percentages
   - Add implementation approach notes
   - Document deviations with justification
   
2. **Status Documents**:
   - Update phase completion percentages
   - Add component implementation status
   - Document best practices discovered
   - Note challenges and solutions
   
3. **Specification Updates**:
   - Mark completed items with ✅ or strikethrough
   - Add implementation detail notes
   - Include references to implemented files/classes
   - Update implementation guidance
   
4. **Project Documentation**:
   - Add new best practices to CLAUDE.md and README.md
   - Update project status
   - Document known issues/limitations
   - Update usage examples

5. **Testing Documentation**:
   - Detail test files created
   - Include test running instructions
   - Document test coverage
   - Explain testing approach

## Guidelines:
- **DO NOT CREATE** new specification files
- **UPDATE** existing files in the `specs/` directory
- Maintain consistent documentation style
- Include practical examples
- Cross-reference related sections
- Document lessons learned
- Update completion percentages
- Ensure accuracy with actual implementation

## Formatting Standards:
- Use clear headings and sections
- Include code examples where helpful
- Use status indicators (✅, ⚠️, ❌) consistently
- Maintain proper Markdown formatting

## Author Information:
- **Author**: Consiliency
- **Source**: https://github.com/Consiliency/Flutter-Structurizr/blob/main/.claude/commands/update-docs.md
- **License**: MIT