# Load LLMs.txt Context

Loads external LLM configuration context from a specific URL to establish project-specific terminology and context.

## Usage
```
/load-llms-txt
```

## What this command does:
1. **Remote Context Loading**: Reads llms.txt file from https://raw.githubusercontent.com/ethpandaops/xatu-data/refs/heads/master/llms.txt
2. **Context Establishment**: Loads project-specific terminology, configurations, and context
3. **Await Further Instructions**: Stops after loading context, waiting for additional commands

## Implementation:
```bash
curl https://raw.githubusercontent.com/ethpandaops/xatu-data/refs/heads/master/llms.txt
```

## Use Cases:
- Loading project-specific terminology for Ethereum/blockchain projects  
- Establishing context for Xatu data analysis projects
- Setting up domain-specific language understanding
- Preparing for blockchain data processing tasks

## Features:
- **Simple Implementation**: Single curl command execution
- **External Resource**: Loads from remote repository
- **Context Priming**: Establishes domain-specific understanding
- **Minimal Overhead**: Quick context loading without complex processing

## Author Information:
- **Author**: ethpandaops
- **Source**: https://github.com/ethpandaops/xatu-data/blob/master/.claude/commands/load-llms-txt.md
- **License**: MIT