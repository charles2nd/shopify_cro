/**
 * TDD Test Suite for Hero CTA Heuristic Rule
 * RED-GREEN-REFACTOR: Starting with tests before implementation
 */

import { HeroCTARule } from '../hero-cta';
import type { Page, HeuristicResult } from '../../../types';

describe('Hero CTA Heuristic Rule - TDD', () => {
  let heroCTARule: HeroCTARule;

  beforeEach(() => {
    heroCTARule = new HeroCTARule();
  });

  describe('RED Phase: Hero CTA Detection', () => {
    it('should detect missing CTA above fold and create high severity finding', () => {
      // Arrange - page without CTA above fold
      const pageWithoutCTA: Page = {
        id: 'test-page-1',
        crawlId: 'test-crawl-1',
        url: 'https://test-store.myshopify.com',
        type: 'home',
        metrics: {
          aboveFold: {
            ctaButtons: [],
            height: 800
          },
          performance: { loadTime: 1000 }
        },
        findings: [],
        crawl: null as any
      };

      // Act
      const result: HeuristicResult = heroCTARule.analyze(pageWithoutCTA);

      // Assert
      expect(result.passed).toBe(false);
      expect(result.score).toBe(0);
      expect(result.finding).toBeDefined();
      expect(result.finding!.severity).toBe('high');
      expect(result.finding!.ruleId).toBe('hero_cta_missing');
      expect(result.finding!.evidence).toMatchObject({
        ctaCount: 0,
        pageType: 'home',
        aboveFoldHeight: 800
      });
    });

    it('should detect prominent CTA above fold and pass with high score', () => {
      // Arrange - page with prominent CTA
      const pageWithCTA: Page = {
        id: 'test-page-2',
        crawlId: 'test-crawl-1',
        url: 'https://test-store.myshopify.com',
        type: 'home',
        metrics: {
          aboveFold: {
            ctaButtons: [
              {
                text: 'Shop Now',
                selector: '.hero-cta',
                position: { top: 300, left: 400 },
                size: { width: 200, height: 50 },
                prominent: true
              }
            ],
            height: 800
          },
          performance: { loadTime: 1000 }
        },
        findings: [],
        crawl: null as any
      };

      // Act
      const result: HeuristicResult = heroCTARule.analyze(pageWithCTA);

      // Assert
      expect(result.passed).toBe(true);
      expect(result.score).toBe(15); // Full points for hero CTA
      expect(result.finding).toBeNull();
    });

    it('should detect weak CTA and create medium severity finding', () => {
      // Arrange - page with small/weak CTA
      const pageWithWeakCTA: Page = {
        id: 'test-page-3',
        crawlId: 'test-crawl-1',
        url: 'https://test-store.myshopify.com',
        type: 'home',
        metrics: {
          aboveFold: {
            ctaButtons: [
              {
                text: 'Learn more',
                selector: '.small-link',
                position: { top: 600, left: 100 },
                size: { width: 80, height: 20 },
                prominent: false
              }
            ],
            height: 800
          },
          performance: { loadTime: 1000 }
        },
        findings: [],
        crawl: null as any
      };

      // Act
      const result: HeuristicResult = heroCTARule.analyze(pageWithWeakCTA);

      // Assert
      expect(result.passed).toBe(false);
      expect(result.score).toBe(7); // Partial points
      expect(result.finding!.severity).toBe('med');
      expect(result.finding!.ruleId).toBe('hero_cta_weak');
    });

    it('should only apply rule to home and product pages', () => {
      // Arrange - collection page (should be skipped)
      const collectionPage: Page = {
        id: 'test-page-4',
        crawlId: 'test-crawl-1',
        url: 'https://test-store.myshopify.com/collections/all',
        type: 'collection',
        metrics: {
          aboveFold: { ctaButtons: [], height: 800 },
          performance: { loadTime: 1000 }
        },
        findings: [],
        crawl: null as any
      };

      // Act
      const result: HeuristicResult = heroCTARule.analyze(collectionPage);

      // Assert - should skip analysis
      expect(result.skipped).toBe(true);
      expect(result.reason).toBe('Rule only applies to home and product pages');
    });
  });

  describe('Helper Methods', () => {
    it('should correctly identify prominent CTAs', () => {
      // Arrange - prominent CTA
      const prominentCTA: any = {
        text: 'Shop Now',
        selector: '.hero-cta',
        position: { top: 300, left: 400 },
        size: { width: 200, height: 50 },
        prominent: true
      };

      // Arrange - small CTA
      const smallCTA: any = {
        text: 'Learn more',
        selector: '.small-link',
        position: { top: 600, left: 100 },
        size: { width: 80, height: 20 },
        prominent: false
      };

      // Act & Assert
      expect(heroCTARule.isProminentCTA(prominentCTA)).toBe(true);
      expect(heroCTARule.isProminentCTA(smallCTA)).toBe(false);
    });
  });
})