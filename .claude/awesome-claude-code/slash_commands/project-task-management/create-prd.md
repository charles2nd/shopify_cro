# Create Product Requirements Document

Creates a comprehensive Product Requirements Document (PRD) for product features, focusing on what, why, and how of the product.

## Usage
```
/create-prd
```

## What this command does:
1. **Product Context**: Reads `product-development/resources/product.md` to understand the product
2. **Feature Analysis**: Reads `product-development/current-feature/feature.md` for the feature idea  
3. **JTBD Integration**: Reads `product-development/current-feature/JTBD.md` for Jobs to be Done context
4. **Template Application**: Uses PRD template from `product-development/resources/PRD-template.md`
5. **Document Creation**: Outputs PRD document to `product-development/current-feature/PRD.md`

## PRD Framework Focus:
- **Product Requirements**: Detailed specifications and requirements
- **User Needs**: Based on JTBD analysis and user research
- **Feature Definition**: Clear definition of what will be built
- **Success Criteria**: Measurable outcomes and acceptance criteria

## Key Principles:
- **No Technical Implementation**: Focuses on requirements, not technical solutions
- **No Time Estimates**: Excludes project timelines and development estimates
- **Comprehensive Scope**: Covers all aspects of the product requirements
- **User-Focused**: Built on understanding of user jobs and needs

## Process:
1. Read product documentation for context
2. Analyze feature documentation for scope
3. Integrate JTBD findings for user context
4. Apply PRD template structure
5. Create comprehensive requirements document
6. Output to designated location

## File Dependencies:
- `product-development/resources/product.md` (required)
- `product-development/current-feature/feature.md` (required)
- `product-development/current-feature/JTBD.md` (required)
- `product-development/resources/PRD-template.md` (template)

## Author Information:
- **Author**: taddyorg
- **Source**: https://github.com/taddyorg/inkverse/blob/main/.claude/commands/create-prd.md
- **License**: AGPL-3.0