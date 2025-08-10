# Add to Changelog Command

Adds new entries to the project's CHANGELOG.md file following Keep a Changelog conventions.

## Usage
```
/add-to-changelog <version> <change_type> <message>
```

### Parameters:
- `<version>`: Version number (e.g., "1.1.0")
- `<change_type>`: One of: "added", "changed", "deprecated", "removed", "fixed", "security"
- `<message>`: Description of the change

## Examples
```
/add-to-changelog 1.1.0 added "New markdown to BlockDoc conversion feature"
/add-to-changelog 1.0.2 fixed "Bug in HTML renderer causing incorrect output"
```

## What this command does:
1. **File Management**: Checks if CHANGELOG.md exists and creates one if needed
2. **Version Handling**: Looks for existing section for specified version or creates new one
3. **Proper Formatting**: Formats entries according to Keep a Changelog conventions
4. **Date Management**: Adds today's date for new version sections
5. **Commit Suggestion**: Offers to commit the changes

## Implementation Details:
1. Parse arguments to extract version, change type, and message
2. Read existing CHANGELOG.md file if it exists
3. Create new file with standard header if it doesn't exist
4. Check if version section already exists
5. Add new entry in appropriate section
6. Write updated content back to file
7. Suggest committing changes

## Standards:
- Follows [Keep a Changelog](https://keepachangelog.com/) format
- Uses [Semantic Versioning](https://semver.org/)
- Maintains consistent formatting and structure

## Additional Notes:
Remember to update package version in `__init__.py` and `setup.py` if this is a new version.

## Author Information:
- **Author**: berrydev-ai
- **Source**: https://github.com/berrydev-ai/blockdoc-python/blob/main/.claude/commands/add-to-changelog.md
- **License**: MIT