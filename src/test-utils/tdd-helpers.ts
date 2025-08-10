/**
 * TDD Helper utilities for enforcing Red-Green-Refactor cycle
 */

type TestPhase = 'RED' | 'GREEN' | 'REFACTOR'

interface TDDTestCase<T = any> {
  description: string
  phase: TestPhase
  setup?: () => Promise<void> | void
  execute: () => Promise<T> | T
  assert: (result: T) => void | Promise<void>
  cleanup?: () => Promise<void> | void
}

/**
 * TDD Test Runner that enforces proper Red-Green-Refactor workflow
 */
export class TDDTestRunner {
  private currentPhase: TestPhase = 'RED'
  
  /**
   * RED phase: Write a failing test first
   */
  static red<T>(testCase: Omit<TDDTestCase<T>, 'phase'>) {
    return new TDDTestRunner().runPhase({ ...testCase, phase: 'RED' })
  }
  
  /**
   * GREEN phase: Make the test pass with minimal code
   */
  static green<T>(testCase: Omit<TDDTestCase<T>, 'phase'>) {
    return new TDDTestRunner().runPhase({ ...testCase, phase: 'GREEN' })
  }
  
  /**
   * REFACTOR phase: Improve code without breaking tests
   */
  static refactor<T>(testCase: Omit<TDDTestCase<T>, 'phase'>) {
    return new TDDTestRunner().runPhase({ ...testCase, phase: 'REFACTOR' })
  }
  
  private async runPhase<T>(testCase: TDDTestCase<T>) {
    this.currentPhase = testCase.phase
    
    console.log(`🔄 TDD Phase: ${testCase.phase} - ${testCase.description}`)
    
    try {
      // Setup phase
      if (testCase.setup) {
        await testCase.setup()
      }
      
      // Execute the test
      const result = await testCase.execute()
      
      // Assert the result
      await testCase.assert(result)
      
      console.log(`✅ TDD Phase ${testCase.phase} completed successfully`)
      
      return result
    } catch (error) {
      if (testCase.phase === 'RED') {
        console.log(`✅ Expected failure in RED phase: ${error}`)
        throw error // RED phase should fail
      } else {
        console.error(`❌ Unexpected failure in ${testCase.phase} phase:`, error)
        throw error
      }
    } finally {
      // Cleanup phase
      if (testCase.cleanup) {
        await testCase.cleanup()
      }
    }
  }
}

/**
 * Test data builder for consistent test scenarios
 */
export class TestDataBuilder {
  static shopifyStore() {
    return new ShopifyStoreBuilder()
  }
  
  static crawlResult() {
    return new CrawlResultBuilder()
  }
  
  static recommendation() {
    return new RecommendationBuilder()
  }
}

class ShopifyStoreBuilder {
  private data: any = {
    url: 'https://test-store.myshopify.com',
    name: 'Test Store',
  }
  
  withUrl(url: string) {
    this.data.url = url
    return this
  }
  
  withName(name: string) {
    this.data.name = name
    return this
  }
  
  withDescription(description: string) {
    this.data.description = description
    return this
  }
  
  build() {
    return { ...this.data }
  }
}

class CrawlResultBuilder {
  private data: any = {
    id: 'test-crawl-id',
    url: 'https://test-store.myshopify.com',
    pageType: 'home',
    html: '<html><body>Test</body></html>',
    metadata: {
      title: 'Test Page',
      loadTime: 1500,
      viewport: { width: 1920, height: 1080 },
    },
    crawledAt: new Date(),
  }
  
  withId(id: string) {
    this.data.id = id
    return this
  }
  
  withUrl(url: string) {
    this.data.url = url
    return this
  }
  
  withPageType(pageType: string) {
    this.data.pageType = pageType
    return this
  }
  
  withHtml(html: string) {
    this.data.html = html
    return this
  }
  
  withLoadTime(loadTime: number) {
    this.data.metadata.loadTime = loadTime
    return this
  }
  
  build() {
    return { ...this.data }
  }
}

class RecommendationBuilder {
  private data: any = {
    issue: 'Test issue',
    why: 'Test explanation',
    impact: 'High',
    effort: 'Low',
    copyVariants: ['Test copy'],
    codeSnippet: '<div>Test</div>',
    whereToPlace: 'Test placement',
  }
  
  withIssue(issue: string) {
    this.data.issue = issue
    return this
  }
  
  withImpact(impact: 'High' | 'Medium' | 'Low') {
    this.data.impact = impact
    return this
  }
  
  withEffort(effort: 'High' | 'Medium' | 'Low') {
    this.data.effort = effort
    return this
  }
  
  withCopyVariants(variants: string[]) {
    this.data.copyVariants = variants
    return this
  }
  
  build() {
    return { ...this.data }
  }
}

/**
 * Mock service factory for dependency injection in tests
 */
export class MockServiceFactory {
  static createCrawlerService() {
    return {
      crawlPage: jest.fn(),
      crawlStore: jest.fn(),
      isValidShopifyUrl: jest.fn(),
    }
  }
  
  static createHeuristicsService() {
    return {
      analyzePageContent: jest.fn(),
      getEnabledRules: jest.fn(),
      validateRule: jest.fn(),
    }
  }
  
  static createLLMService() {
    return {
      generateRecommendations: jest.fn(),
      validateRecommendation: jest.fn(),
      formatRecommendation: jest.fn(),
    }
  }
  
  static createDatabaseService() {
    return {
      saveAudit: jest.fn(),
      getAuditById: jest.fn(),
      updateAuditStatus: jest.fn(),
    }
  }
}

/**
 * Performance test utilities for TDD
 */
export class PerformanceTester {
  static async measureExecutionTime<T>(
    fn: () => Promise<T> | T,
    maxTimeMs: number
  ): Promise<{ result: T; executionTime: number }> {
    const start = performance.now()
    const result = await fn()
    const executionTime = performance.now() - start
    
    expect(executionTime).toBeLessThanOrEqual(maxTimeMs)
    
    return { result, executionTime }
  }
  
  static async assertResponseTime(
    apiCall: () => Promise<any>,
    maxResponseTimeMs: number = 500
  ) {
    const { executionTime } = await this.measureExecutionTime(apiCall, maxResponseTimeMs)
    console.log(`✅ API response time: ${Math.round(executionTime)}ms (max: ${maxResponseTimeMs}ms)`)
  }
}