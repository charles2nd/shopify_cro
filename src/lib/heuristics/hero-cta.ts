/**
 * Hero CTA Heuristic Rule
 * Detects presence and quality of call-to-action buttons above the fold
 * Critical for conversion rate optimization
 * 
 * Scoring:
 * - 15 points: Prominent CTA present above fold
 * - 7 points: CTA present but not prominent (47% of max)
 * - 0 points: No CTA above fold
 */

import type { Page, Finding, HeuristicResult, BaseHeuristicRule, CTAButton } from '../../types';

export class HeroCTARule implements BaseHeuristicRule {
  // Rule configuration constants
  private static readonly APPLICABLE_PAGE_TYPES = ['home', 'product'] as const;
  private static readonly WEAK_CTA_SCORE_RATIO = 0.47;
  private static readonly MIN_PROMINENT_WIDTH = 120;
  private static readonly MIN_PROMINENT_HEIGHT = 35;

  // Rule metadata
  public readonly ruleId = 'hero_cta_detection';
  public readonly maxScore = 15;
  public readonly name = 'Hero CTA Presence';
  public readonly description = 'Ensures prominent call-to-action buttons are visible above the fold';

  analyze(page: Page): HeuristicResult {
    // Only apply to specific page types
    if (!this.isApplicablePageType(page.type)) {
      return this.createSkippedResult();
    }

    const ctaButtons = page.metrics.aboveFold.ctaButtons;
    
    if (ctaButtons.length === 0) {
      return this.createMissingCTAResult(page);
    }

    const prominentCTAs = ctaButtons.filter(cta => cta.prominent);
    
    if (prominentCTAs.length > 0) {
      return this.createSuccessResult();
    } else {
      return this.createWeakCTAResult(page, ctaButtons);
    }
  }

  /**
   * Helper method to determine if a CTA is prominent
   * Used for testing and debugging
   */
  public isProminentCTA(cta: CTAButton): boolean {
    return cta.size.width >= HeroCTARule.MIN_PROMINENT_WIDTH && 
           cta.size.height >= HeroCTARule.MIN_PROMINENT_HEIGHT &&
           cta.prominent;
  }

  // Private helper methods for cleaner code organization

  private isApplicablePageType(pageType: string): boolean {
    return HeroCTARule.APPLICABLE_PAGE_TYPES.includes(pageType as any);
  }

  private createSkippedResult(): HeuristicResult {
    return {
      passed: false,
      score: 0,
      finding: null,
      skipped: true,
      reason: 'Rule only applies to home and product pages'
    };
  }

  private createMissingCTAResult(page: Page): HeuristicResult {
    return {
      passed: false,
      score: 0,
      finding: this.createFinding(page, 'hero_cta_missing', 'high', {
        ctaCount: 0,
        pageType: page.type,
        aboveFoldHeight: page.metrics.aboveFold.height
      })
    };
  }

  private createSuccessResult(): HeuristicResult {
    return {
      passed: true,
      score: this.maxScore,
      finding: null
    };
  }

  private createWeakCTAResult(page: Page, ctaButtons: CTAButton[]): HeuristicResult {
    return {
      passed: false,
      score: Math.floor(this.maxScore * HeroCTARule.WEAK_CTA_SCORE_RATIO),
      finding: this.createFinding(page, 'hero_cta_weak', 'med', {
        ctaCount: ctaButtons.length,
        prominentCount: 0,
        weakCTAs: ctaButtons.map(cta => ({
          text: cta.text,
          size: cta.size,
          prominent: cta.prominent
        }))
      })
    };
  }

  private createFinding(page: Page, ruleId: string, severity: 'high' | 'med' | 'low', evidence: Record<string, any>): Finding {
    return {
      id: `${ruleId}-${page.id}-${Date.now()}`,
      pageId: page.id,
      ruleId,
      severity,
      evidence
    };
  }
}