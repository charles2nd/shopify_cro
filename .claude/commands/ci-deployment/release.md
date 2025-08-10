# Release Command

Updates CHANGELOG.md with changes since the last version increase. Checks README.md for any necessary changes. Checks the scope of changes since the last release and increases version number as appropriate.

## Usage
```
/release
```

## What this command does:
1. **Analyze Changes**: Reviews all commits since the last version tag/release
2. **Update Changelog**: Adds new entries to CHANGELOG.md with proper formatting
3. **Version Bumping**: Determines appropriate version increment (patch/minor/major)
4. **README Updates**: Reviews and updates README.md if necessary
5. **Release Preparation**: Ensures all release artifacts are ready

## Implementation Notes:
- Uses semantic versioning principles
- Follows Keep a Changelog format
- Reviews commit messages to categorize changes
- Suggests appropriate version increments based on change types

## Author Information:
- **Author**: kelp
- **Source**: https://github.com/kelp/webdown/blob/main/.claude/commands/release.md
- **License**: MIT