# Shopify CRO Copilot - Backend API Architecture

## Overview

This document outlines the complete backend API architecture for the Shopify CRO Copilot, following the simplified MVP requirements from `CLAUDE.md`. The system is designed for manual-first operation with single-user auth and focuses on delivering high-quality CRO recommendations.

## API Architecture Diagram

```
┌─────────────────┐    ┌──────────────────────────────────────────┐
│   Next.js App   │    │              API Layer                   │
│                 │    │                                          │
│  - UI Components│────┤  /api/audit (POST)                      │
│  - Forms        │    │  /api/report?crawlId=... (GET)          │
│  - Dashboard    │    │  /api/sites (GET, POST)                 │
└─────────────────┘    │  /api/sites/[id] (GET, PUT, DELETE)     │
                       │  /api/recommendations/[id]/regenerate    │
                       │  /api/health (GET)                       │
                       └──────────────────────────────────────────┘
                                              │
                       ┌──────────────────────────────────────────┐
                       │            Service Layer                 │
                       │                                          │
                       │  ┌─────────────┐  ┌──────────────────┐  │
                       │  │   Crawler   │  │    Heuristic     │  │
                       │  │   Service   │  │    Service       │  │
                       │  └─────────────┘  └──────────────────┘  │
                       │          │                 │            │
                       │  ┌─────────────┐  ┌──────────────────┐  │
                       │  │     LLM     │  │    Database      │  │
                       │  │   Service   │  │    Service       │  │
                       │  └─────────────┘  └──────────────────┘  │
                       └──────────────────────────────────────────┘
                                              │
                       ┌──────────────────────────────────────────┐
                       │          Data & External Layer           │
                       │                                          │
                       │  ┌─────────────┐  ┌──────────────────┐  │
                       │  │ PostgreSQL  │  │   OpenAI API     │  │
                       │  │  (Neon)     │  │  (GPT-4o-mini)   │  │
                       │  └─────────────┘  └──────────────────┘  │
                       │                                          │
                       │  ┌─────────────┐                        │
                       │  │ Playwright  │                        │
                       │  │  (Crawler)  │                        │
                       │  └─────────────┘                        │
                       └──────────────────────────────────────────┘
```

## API Endpoints

### Core Audit Flow

#### 1. Start Audit
```
POST /api/audit
Content-Type: application/json

{
  "siteId": "cm1abc123",
  "persona": "default" | "fr-que",
  "pages": ["https://example.com/specific-page"] // optional
}

Response:
{
  "success": true,
  "data": {
    "crawlId": "cm1def456",
    "status": "queued",
    "estimatedDuration": 180
  }
}
```

#### 2. Get Report
```
GET /api/report?crawlId=cm1def456&sort=ice&limit=20&page=1

Response:
{
  "success": true,
  "data": {
    "crawl": {
      "id": "cm1def456",
      "status": "completed",
      "startedAt": "2025-08-10T10:00:00Z",
      "finishedAt": "2025-08-10T10:03:45Z",
      "stats": {
        "pagesTotal": 15,
        "pagesSuccessful": 14,
        "pagesFailed": 1,
        "duration": 225,
        "costCents": 450,
        "tokenUsage": { "prompt": 1200, "completion": 800, "total": 2000 }
      }
    },
    "site": {
      "id": "cm1abc123",
      "url": "https://example-store.myshopify.com",
      "name": "Example Store"
    },
    "score": {
      "overall": 72,
      "breakdown": {
        "performance": 85,
        "conversion": 68,
        "trust": 75,
        "mobile": 60
      }
    },
    "findings": [
      {
        "id": "finding123",
        "ruleId": "primary-cta-above-fold",
        "severity": "high",
        "pageUrl": "https://example-store.myshopify.com/",
        "pageType": "home",
        "evidence": { "ctaPresent": false },
        "recommendation": {
          "rationale": "Missing primary CTA reduces conversion potential",
          "impact": 4,
          "effort": 2,
          "ice": 8.0,
          "copyVariants": ["Shop Now", "Start Shopping", "Browse Products"],
          "snippet": "<button class=\"btn-primary\">Shop Now</button>",
          "pastePath": "sections/header.liquid",
          "searchCue": "class=\"hero\""
        }
      }
    ],
    "summary": {
      "totalFindings": 12,
      "criticalCount": 0,
      "highCount": 3,
      "mediumCount": 6,
      "lowCount": 3
    }
  }
}
```

### Sites Management

#### 3. List Sites
```
GET /api/sites?page=1&limit=10

Response:
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "cm1abc123",
        "url": "https://example-store.myshopify.com",
        "name": "Example Store",
        "settings": {
          "persona": "default",
          "maxPages": 15,
          "excludePaths": ["/admin", "/checkout"]
        },
        "createdAt": "2025-08-10T09:00:00Z",
        "isActive": true,
        "lastCrawledAt": "2025-08-10T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### 4. Create Site
```
POST /api/sites
Content-Type: application/json

{
  "url": "https://new-store.myshopify.com",
  "name": "New Store",
  "description": "A Shopify store for testing",
  "settings": {
    "persona": "fr-que",
    "maxPages": 20,
    "excludePaths": ["/admin"]
  }
}
```

## Service Layer Architecture

### 1. Base Service (`BaseService`)
- **Purpose**: Common error handling, validation, logging
- **Features**: 
  - Standardized error responses
  - Input validation helpers
  - URL and Shopify store validation
  - Success/error response formatters

### 2. Database Service (`DatabaseService`)
- **Purpose**: Centralized database operations with error handling
- **Features**:
  - Prisma client singleton management
  - Transaction support with error handling
  - Health checks
  - Prisma error code translation to API errors

### 3. Crawler Service (`CrawlerService`)
- **Purpose**: Playwright-based web crawling for Shopify stores
- **Features**:
  - Browser management and page crawling
  - Sitemap parsing and navigation discovery
  - Performance metrics extraction
  - Content analysis (CTA detection, pricing, reviews)
  - Mobile optimization checks

**Key Methods**:
```typescript
async startCrawl(siteId: string, options: CrawlOptions): Promise<ServiceResponse<{crawlId: string}>>
async discoverPages(browser: Browser, siteUrl: string, options: CrawlOptions): Promise<string[]>
async crawlSinglePage(browser: Browser, url: string): Promise<CrawlPageResult>
async extractPageMetrics(page: PlaywrightPage, loadTime: number): Promise<PageMetrics>
```

### 4. Heuristic Service (`HeuristicService`)
- **Purpose**: Apply deterministic CRO rules to crawled pages
- **Features**:
  - 10 built-in heuristic rules covering performance, conversion, trust, mobile
  - Evidence collection and scoring
  - Site-level score aggregation
  - Category-based scoring breakdown

**Built-in Rules**:
1. Primary CTA Above Fold (HIGH - 15pts)
2. Hero Headline Length (MED - 10pts)
3. Hero Image Present (MED - 8pts)
4. Price Display on PDP (HIGH - 12pts)
5. Social Proof Present (MED - 10pts)
6. Shipping/Returns Info (MED - 8pts)
7. Sticky ATC Mobile (MED - 9pts)
8. Page Performance (MED - 12pts)
9. Trust Signals Present (LOW - 6pts)
10. Alt Text Coverage (LOW - 5pts)

### 5. LLM Service (`LLMService`)
- **Purpose**: Generate AI-powered recommendations using OpenAI
- **Features**:
  - GPT-4o-mini integration with structured output
  - Persona-based recommendations (default, fr-que)
  - Zod schema validation for LLM outputs
  - Token budget management and cost tracking
  - Recommendation regeneration

**Output Schema**:
```typescript
{
  rationale: string (50-500 chars)
  impact: number (1-5)
  effort: number (1-5) 
  confidence: number (1-5)
  copyVariants: string[] (3 variants, <60 chars each)
  snippet: string (10-2000 chars)
  pastePath: string (5-200 chars)
  searchCue: string (5-100 chars)
}
```

## Database Schema

### Core Tables

```sql
-- Sites table
CREATE TABLE sites (
  id TEXT PRIMARY KEY,
  url TEXT UNIQUE NOT NULL,
  name TEXT,
  description TEXT,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_crawled_at TIMESTAMP
);

-- Crawls table
CREATE TABLE crawls (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES sites(id),
  status crawl_status DEFAULT 'QUEUED',
  started_at TIMESTAMP DEFAULT NOW(),
  finished_at TIMESTAMP,
  stats JSONB,
  error TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Pages table
CREATE TABLE pages (
  id TEXT PRIMARY KEY,
  crawl_id TEXT NOT NULL REFERENCES crawls(id),
  url TEXT NOT NULL,
  type page_type NOT NULL,
  title TEXT,
  metrics JSONB DEFAULT '{}',
  status page_status DEFAULT 'PENDING',
  error TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(crawl_id, url)
);

-- Findings table
CREATE TABLE findings (
  id TEXT PRIMARY KEY,
  page_id TEXT NOT NULL REFERENCES pages(id),
  rule_id TEXT NOT NULL,
  severity finding_severity NOT NULL,
  evidence JSONB DEFAULT '{}',
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(page_id, rule_id)
);

-- Recommendations table
CREATE TABLE recommendations (
  id TEXT PRIMARY KEY,
  finding_id TEXT UNIQUE NOT NULL REFERENCES findings(id),
  rationale TEXT NOT NULL,
  impact INTEGER NOT NULL,
  effort INTEGER NOT NULL,
  confidence INTEGER NOT NULL,
  ice REAL NOT NULL,
  copy_variants JSONB DEFAULT '[]',
  snippet TEXT NOT NULL,
  paste_path TEXT NOT NULL,
  search_cue TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Data Flow

### Audit Pipeline

1. **Trigger** → `POST /api/audit` with siteId
2. **Crawl** → CrawlerService discovers and crawls pages
3. **Analysis** → HeuristicService applies rules to generate findings
4. **Recommendations** → LLMService generates AI recommendations
5. **Report** → `GET /api/report` returns complete analysis

### Background Processing

```typescript
async function processAuditInBackground(crawlId: string, persona: string) {
  // 1. Wait for crawl completion (polling for MVP)
  await waitForCrawlCompletion(crawlId);
  
  // 2. Run heuristic analysis
  const findings = await heuristicService.analyzeCrawl(crawlId);
  
  // 3. Generate LLM recommendations
  const recommendations = await llmService.generateRecommendations(crawlId, persona);
  
  // 4. Update crawl status to completed
}
```

## Error Handling & Validation

### API Error Format
```typescript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Site URL is required",
    "details": { /* optional debug info */ }
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` (400) - Input validation failed
- `SITE_NOT_FOUND` (404) - Site doesn't exist
- `CRAWL_NOT_FOUND` (404) - Crawl doesn't exist
- `DUPLICATE_ENTRY` (409) - Resource already exists
- `RATE_LIMIT_EXCEEDED` (429) - Too many requests
- `INTERNAL_SERVER_ERROR` (500) - Unexpected error

### Input Validation

All API endpoints use Zod schemas for validation:

```typescript
// Example: Site creation validation
const CreateSiteSchema = z.object({
  url: z.string().url('Invalid URL format'),
  name: z.string().min(1).max(100).optional(),
  settings: z.object({
    persona: z.enum(['default', 'fr-que']).optional(),
    maxPages: z.number().min(1).max(50).optional(),
    excludePaths: z.array(z.string()).optional(),
  }).optional(),
});
```

## Performance & Scaling Considerations

### Current Performance Targets
- Report TTFB: <500ms (cached data)
- Crawl success rate: >95%
- Token budget: 10K tokens per audit
- Concurrent crawls: Limited by browser instances

### Scaling Bottlenecks
1. **Crawler Service**: Browser instance management
2. **LLM Service**: OpenAI rate limits and costs
3. **Database**: Query optimization for large datasets
4. **Background Processing**: No queue system (MVP limitation)

### Recommended Improvements
1. **Queue System**: Redis/BullMQ for background jobs
2. **Caching**: Redis for frequently accessed reports
3. **CDN**: Static asset optimization
4. **Connection Pooling**: Optimize database connections
5. **Horizontal Scaling**: Multiple crawler instances

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Neon) + Prisma ORM
- **Crawler**: Playwright (Chromium)
- **AI**: OpenAI GPT-4o-mini
- **Validation**: Zod schemas
- **Auth**: Single-user (Clerk integration ready)
- **Deployment**: Vercel

## File Structure

```
src/
├── app/api/                      # API routes
│   ├── audit/route.ts           # POST /api/audit
│   ├── report/route.ts          # GET /api/report
│   ├── sites/route.ts           # Sites CRUD
│   ├── sites/[siteId]/route.ts  # Individual site
│   ├── recommendations/         # Recommendation endpoints
│   └── health/route.ts          # Health check
├── lib/
│   ├── services/                # Service layer
│   │   ├── base.ts             # Base service class
│   │   ├── database.ts         # Database service
│   │   ├── crawler.service.ts  # Web crawling
│   │   ├── heuristic.service.ts # Rule analysis
│   │   └── llm.service.ts      # AI recommendations
│   ├── validations/            # Zod schemas
│   ├── middleware/             # Error handling
│   └── config/                 # Configuration
├── types/                      # TypeScript types
│   ├── api.ts                  # API types
│   └── database.ts             # Database types
└── prisma/
    └── schema.prisma           # Database schema
```

This architecture provides a solid foundation for the Shopify CRO Copilot MVP, balancing simplicity with scalability and maintainability.