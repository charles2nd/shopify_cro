# Comprehensive PR Review Command

Conducts thorough multi-perspective code reviews with immediate action requirements across all engineering disciplines.

## Usage
```
/pr-review <PR-link-or-number>
```

## Overview
Executes comprehensive code review from six different professional perspectives, with emphasis on immediate implementation of all recommendations - no deferrals to "future" work.

## Review Perspectives:

### Task 1: Product Manager Review
**Objective**: Assess from product management perspective
- **Business Value**: Does PR advance core product goals with immediate ROI?
- **User Experience**: Is the change intuitive and delightful right now?
- **Strategic Alignment**: Does PR align with current strategic objectives?

**Action**: Provide directives for maximum user and business impact. All "future" suggestions must be implemented immediately.

### Task 2: Developer Review  
**Objective**: Senior lead engineer perspective evaluation
1. **Code Quality & Maintainability**: Structure for readability and maintenance - refactor now if needed
2. **Performance & Scalability**: Efficient operation at scale - optimize immediately if not
3. **Best Practices & Standards**: Coding standards compliance - correct deviations now

**Action**: Complete review with immediate improvements - no deferrals allowed.

### Task 3: Quality Engineer Review
**Objective**: Verify quality, testing strategy, and reliability
1. **Test Coverage**: Sufficient tests (unit, integration, E2E) - add now if missing
2. **Potential Bugs & Edge Cases**: All cases considered - address immediately if not
3. **Regression Risk**: Changes don't undermine existing functionality - mitigate now

**Action**: Detailed QA assessment with immediate completion of any "future" improvements.

### Task 4: Security Engineer Review
**Objective**: Ensure robust security practices and compliance
1. **Vulnerabilities**: No security vulnerabilities introduced - fix immediately if found
2. **Data Handling**: Proper protection of sensitive data - address all gaps now
3. **Compliance**: Alignment with security/privacy standards - implement missing requirements immediately

**Action**: Security assessment with immediate fixes for any issues typically scheduled for "later".

### Task 5: DevOps Review
**Objective**: Evaluate build, deployment, and monitoring
1. **CI/CD Pipeline**: Smooth integration with build/test/deploy processes - fix now if not
2. **Infrastructure & Configuration**: Required updates to infrastructure/configs - implement immediately
3. **Monitoring & Alerts**: New monitoring needs or improvements - implement now

**Action**: DevOps-centric review with immediate execution of improvements.

### Task 6: UI/UX Designer Review
**Objective**: Ensure optimal user-centric design
1. **Visual Consistency**: Adherence to brand/design guidelines - adjust now if not
2. **Usability & Accessibility**: Intuitive UI and accessibility compliance - correct immediately
3. **Interaction Flow**: Seamless user flow - refine now if friction exists

**Action**: Detailed UI/UX evaluation with immediate implementation of enhancements.

## Key Principles:
- **No Future Work**: All recommendations must be addressed immediately
- **Immediate Action**: "Future" suggestions become current requirements
- **Comprehensive Coverage**: All aspects of engineering excellence reviewed
- **Quality Gate**: PR cannot proceed without addressing all identified issues
- **Multi-disciplinary**: Covers all major engineering perspectives

## Implementation Notes:
- Reviews are conducted in order (Task 1 through Task 6)
- Each task must be completed fully before proceeding
- All identified improvements must be implemented immediately
- No "technical debt" or "future improvements" allowed
- PR review completion requires full compliance

## Author Information:
- **Author**: arkavo-org
- **Source**: https://github.com/arkavo-org/opentdf-rs/blob/main/.claude/commands/pr-review.md
- **License**: MIT