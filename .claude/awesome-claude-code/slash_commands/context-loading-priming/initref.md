# Initialize Reference Documentation

Builds a reference for the implementation details of this project using summarize tools to avoid token usage limits.

## Usage
```
/initref
```

## What this command does:
1. **Project Analysis**: Uses summarize tools to analyze project files efficiently
2. **Reference Creation**: Creates reference files in `/ref` directory using markdown format
3. **Documentation Generation**: Builds comprehensive implementation reference documentation
4. **CLAUDE.md Updates**: Updates CLAUDE.md with pointers to important documentation files

## Features:
- **Token Efficient**: Uses summarize tools instead of reading many files directly
- **Selective Reading**: Reads only important files directly to conserve usage
- **Structured Output**: Creates well-organized reference documentation
- **Integration**: Links new docs into existing CLAUDE.md structure

## Implementation Strategy:
1. Identify important project files
2. Use summarize tool for bulk file analysis
3. Read critical files directly for detailed understanding
4. Generate markdown reference files in /ref directory
5. Update CLAUDE.md with documentation pointers

## Author Information:
- **Author**: okuvshynov
- **Source**: https://github.com/okuvshynov/cubestat/blob/main/.claude/commands/initref.md
- **License**: MIT