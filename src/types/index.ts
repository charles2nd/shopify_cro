import { z } from 'zod'

// Core domain types - Shopify CRO Copilot
export const PageTypeEnum = z.enum(['home', 'product', 'collection', 'cart', 'checkout'])
export const SeverityEnum = z.enum(['high', 'med', 'low'])

// CTA Button type
export const CTAButtonSchema = z.object({
  text: z.string(),
  selector: z.string(),
  position: z.object({
    top: z.number(),
    left: z.number(),
  }),
  size: z.object({
    width: z.number(),
    height: z.number(),
  }),
  prominent: z.boolean(),
})

export type CTAButton = z.infer<typeof CTAButtonSchema>

// Page metrics type
export const PageMetricsSchema = z.object({
  aboveFold: z.object({
    ctaButtons: z.array(CTAButtonSchema),
    height: z.number(),
  }),
  performance: z.object({
    loadTime: z.number(),
  }),
})

export type PageMetrics = z.infer<typeof PageMetricsSchema>

// Core Page type (matches Prisma model)
export interface Page {
  id: string
  crawlId: string
  url: string
  type: 'home' | 'product' | 'collection'
  metrics: PageMetrics
  findings: Finding[]
  crawl: any // Will be properly typed with Prisma
}

// Finding type
export interface Finding {
  id: string
  pageId: string
  ruleId: string
  severity: 'high' | 'med' | 'low'
  evidence: Record<string, any>
  recommendation?: LLMRecommendation
  page?: Page
}

// Heuristic analysis result
export interface HeuristicResult {
  passed: boolean
  score: number
  finding: Finding | null
  skipped?: boolean
  reason?: string
}

// Base heuristic rule interface
export interface BaseHeuristicRule {
  ruleId: string
  maxScore: number
  name: string
  description: string
  analyze(page: Page): HeuristicResult
}

export const LLMRecommendationSchema = z.object({
  issue: z.string().min(1),
  why: z.string().min(1),
  impact: z.enum(['High', 'Medium', 'Low']),
  effort: z.enum(['High', 'Medium', 'Low']),
  copyVariants: z.array(z.string()).min(1),
  codeSnippet: z.string(),
  whereToPlace: z.string().min(1),
})

export type LLMRecommendation = z.infer<typeof LLMRecommendationSchema>

// Error types
export class CrawlerError extends Error {
  constructor(
    message: string,
    public readonly code: 'TIMEOUT' | 'INVALID_URL' | 'NETWORK_ERROR' | 'PARSE_ERROR',
    public readonly url?: string
  ) {
    super(message)
    this.name = 'CrawlerError'
  }
}

export class HeuristicError extends Error {
  constructor(
    message: string,
    public readonly rule: string,
    public readonly url?: string
  ) {
    super(message)
    this.name = 'HeuristicError'
  }
}

export class LLMError extends Error {
  constructor(
    message: string,
    public readonly code: 'API_ERROR' | 'PARSING_ERROR' | 'RATE_LIMIT',
    public readonly retryable = false
  ) {
    super(message)
    this.name = 'LLMError'
  }
}