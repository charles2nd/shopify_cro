# Shopify CRO Copilot — Requirements (solo dev, no timelines)

## Product Vision

Audit any Shopify storefront and produce a prioritized, actionable CRO report with copy ideas and ready-to-paste Liquid/HTML/CSS snippets. No theme writes in v1.

## Scope (MVP)

* Input: Shopify store URL, optional niche/brand voice/persona.
* Output: Prioritized checklist (issue → why → impact/effort → copy variants → snippet → “where to paste”).
* Automation: Re-crawl on a schedule; Slack summary; PDF/Markdown export.
* Limitations: Static crawl by default; no authenticated pages; no built-in A/B runner; no theme write access.

## Architecture

* Next.js (App Router) on Vercel.
* Node.js server actions + API routes; Vercel Queues for jobs; Vercel Cron for re-crawls.
* Neon Postgres + Prisma; pgvector for retrieval.
* Vercel Blob for uploads; Clerk for auth/orgs.
* Sentry for errors; basic metrics collection.

## Functional Requirements

### Auth & Workspaces

* Sign in via Clerk.
* Workspaces with role-based access (owner, member).
* Site management: add/remove Shopify sites per workspace.

### Crawl & Extract

* Seed pages: homepage, top collections, top N product pages (from sitemap or link discovery).
* Collect metrics per page: H1/CTA presence, hero text length, image dimensions & alt %, price/compare-at, reviews widget, shipping/returns above fold, FAQ, sticky ATC, page weight/requests.
* Classify page type (home/collection/PDP) deterministically.

### Heuristic Scoring

* Deterministic rules producing `findings` with: rule\_id, severity, evidence, page\_id.
* Site score aggregated by weighted rubric.

### LLM Recommendations (RAG)

* Embedding store of best practices, Liquid patterns, copy frameworks.
* For each finding: generate rationale, impact/effort, ICE score, 3 copy variants, code snippet, precise paste path and search cue.
* Persona/tone setting (includes fr-Québec option).

### Reporting UI

* Dashboard of audits; report view with filters (page/type/severity) and sort (Impact/Effort).
* Actions: copy snippet, copy “brief for dev”, regenerate copy by persona.
* Score trend and delta vs last audit.

### Integrations & Exports

* Slack webhook per workspace; post summary on completion and on re-crawl.
* PDF and Markdown export of the full report.
* Basic cost/latency dashboard per audit.

## Non-Functional Requirements

### Performance

* Report page TTFB < 500ms on cached data.
* Crawl finishes reliably for ≥15 pages per site; timeouts handled.
* LLM generation capped by configurable token budget; retries with backoff.

### Reliability & Observability

* Job orchestration with concurrency limits; dead-letter queue for failures.
* Metrics: audit duration, page count, token spend, failure rate.
* Sentry on server and edge.

### Security & Privacy

* RBAC enforced; rate limiting on `/api/audit`.
* Secrets via Vercel env; no PII stored; logs scrubbed.
* Read-only behavior; no Shopify theme writes in MVP.

### Cost Controls

* Token ceiling per audit; per-workspace quotas.
* Summarize cost per audit in UI and Slack.

## Data Model (tables)

* `accounts`, `workspaces`, `members`
* `sites` (url, workspace\_id, settings JSON)
* `crawls` (site\_id, status, started\_at, finished\_at, stats JSON, cost\_cents)
* `pages` (crawl\_id, url, type, metrics JSON)
* `findings` (page\_id, rule\_id, severity, evidence JSON)
* `recommendations` (finding\_id, rationale, impact, effort, ice, copy JSON, snippet TEXT, paste\_path TEXT, search\_cue TEXT)
* `kb_documents` (title, body, tags, embedding vector)

## API Contracts (examples)

```ts
// POST /api/audit
type StartAuditBody = { siteId: string; persona?: 'default' | 'fr-que'; };
type StartAuditRes = { crawlId: string; status: 'queued'; };

// GET /api/report?crawlId=...
type ReportRes = {
  site: { id: string; url: string };
  score: number;
  findings: Array<{
    id: string; rule_id: string; severity: 'low'|'med'|'high'; page_url: string; evidence: any;
    recommendation?: { impact: number; effort: number; ice: number; copy: string[]; snippet: string; paste_path: string; search_cue: string }
  }>;
};
```

## Heuristic Rules v1 (minimum set)

* Clear primary CTA above fold on home and PDP.
* Hero headline length 20–70 chars; contains value prop.
* Image > 1200px hero present; alt text coverage ≥80%.
* PDP: visible price + compare-at formatting when applicable.
* Social proof present: review count + rating snippet.
* Shipping/returns summary above fold.
* PDP essentials: bullets of value props, size guide link, FAQ block.
* Sticky add-to-cart for mobile.
* Page weight < 2.0 MB and requests < 80 for target pages.
* Trust signals: payment icons or “secure checkout” near ATC.

## Prompting & Validation

* System prompt pins rubric and output schema.
* Retrieval: top-k KB docs per rule.
* Zod schema validates every recommendation; strip unsafe HTML; forbid inline scripts unless explicitly allowed.
* Versioned prompts in repo with changelog.

## Acceptance Criteria Templates

* **Finding reproducibility:** Same site input yields same findings and scores within tolerated variance.
* **Trust bar recommendation:** If missing above fold on PDP, output rationale, ICE, Liquid section + CSS, paste path `sections/main-product.liquid`, and three sub-60-char copy variants.
* **Slack digest:** On audit completion, post site score, top 3 recommendations, links to report and exports.
* **PDF export:** Export includes summary, per-page findings, recommendations with code blocks and paste instructions.

## Testing

* Unit tests: page classifier, extractors, scoring, LLM mappers (schema validation).
* E2E (Playwright): start audit → wait for completion → see findings → copy snippet works.
* Load test: concurrent audits queue correctly and respect limits.

## Definition of Ready (DoR)

* Story has acceptance criteria, UI stub/wire, and success metric.
* Required keys (Slack webhook, site URL) configured.
* Data model changes reviewed.
* Prompt & validation schema drafted; cost/latency targets defined.
* Test sites list prepared.

## Definition of Done (DoD)

* TypeScript strict; ESLint/Prettier clean; no `any`.
* Tests green; coverage for scoring and mappers ≥ target.
* Observability wired (Sentry, metrics); no unhandled errors.
* Rate limits and RBAC verified on protected routes.
* Zod validation passes for all LLM outputs; token budget enforced.
* UX complete with loading/empty/error states; copy/snippet instructions included.
* Docs updated: README (setup/deploy), API reference, KB authoring guide, CHANGELOG.
* Preview deploy verified; migrations applied; rollback instructions present.

## Release Criteria (MVP)

* End-to-end audits successful on multiple real Shopify stores.
* Low audit failure rate; median token cost within budget.
* Performance targets met on report rendering and crawl robustness.
* All DoD items satisfied.

## Out of Scope (MVP)

* Theme write operations; embedded Shopify app.
* Authenticated page crawling; checkout/Cart API changes.
* Full-feature A/B testing platform.
If you want, I can turn this into a repo scaffold (Prisma schema, route stubs, Zod contracts, prompt pack) you can start coding against immediatel
