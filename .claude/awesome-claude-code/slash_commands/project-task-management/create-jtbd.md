# Create Jobs-to-be-Done Document

Creates a comprehensive Jobs to be Done (JTBD) document for product features, focusing on user needs rather than technical implementation.

## Usage
```
/create-jtbd
```

## What this command does:
1. **Product Context**: Reads `product-development/resources/product.md` to understand the product
2. **Feature Analysis**: Reads `product-development/current-feature/feature.md` for the feature idea
3. **Template Application**: Uses JTBD template from `product-development/resources/JTBD-template.md`
4. **Document Creation**: Outputs JTBD document to `product-development/current-feature/JTBD.md`

## JTBD Framework Focus:
- **User-Centric**: Focuses on user needs and problems, not technical solutions
- **Job Definition**: Captures the "why" behind user behavior
- **Problem Identification**: Identifies the job users are trying to get done
- **Context Understanding**: Understands the situation driving user needs

## Key Principles:
- **No Technical Implementation**: Avoids technical details and solutions
- **No Time Estimates**: Excludes project timelines and estimates
- **User Problems**: Focuses on problems users face
- **Behavioral Insights**: Understands why users behave the way they do

## Process:
1. Validate product documentation exists
2. Locate and read feature specification
3. Exit if feature file is missing
4. Apply JTBD template structure
5. Create comprehensive JTBD analysis
6. Output to designated location

## File Dependencies:
- `product-development/resources/product.md` (required)
- `product-development/current-feature/feature.md` (required)
- `product-development/resources/JTBD-template.md` (template)

## Author Information:
- **Author**: taddyorg
- **Source**: https://github.com/taddyorg/inkverse/blob/main/.claude/commands/create-jtbd.md
- **License**: AGPL-3.0