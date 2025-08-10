# Shopify CRO Copilot - Project Rules

## Core Rule: Simplicity First
- Manual-first approach until core value is proven
- Validate early with real Shopify stores
- Quality recommendations > feature completeness  
- Start simple, iterate based on usage

## Tech Stack Rules
- Next.js 14 (App Router) + Vercel
- Neon Postgres + Prisma
- Clerk auth (single-user only)
- Playwright for crawling
- OpenAI for recommendations

## Scope Rules: What's IN
- Single-user auth
- Manual audit triggers  
- Basic crawler (home, PDP, collection)
- 5-7 heuristic rules
- LLM recommendations with snippets
- Simple report UI

## Scope Rules: What's OUT
- Multi-user workspaces
- Scheduled crawls
- RAG systems
- PDF exports
- Slack integrations
- Background job queues

## Implementation Rules
- **TDD First:** Write tests before implementation
- **Single .env file only** - Use .env, never multiple env files
- TypeScript strict mode, no `any`
- Zod validation for all LLM outputs
- Test with real stores only
- Report TTFB <500ms
- Crawl failure rate <5%
- 90% test coverage for core logic

## Output Format Rule
`issue → why → impact/effort → copy variants → snippet → "where to paste"`


no emojies

conversations history are in `conversations/`, make sure to be aware of what we've done