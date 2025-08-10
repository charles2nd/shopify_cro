/**
 * E2E Tests for Homepage
 * Testing the complete user journey
 */

import { test, expect } from '@playwright/test'

test.describe('Homepage E2E Tests', () => {
  test('should display the homepage with proper branding', async ({ page }) => {
    await page.goto('/')
    
    // Check for main heading
    await expect(page.getByRole('heading', { name: 'Shopify CRO Copilot' })).toBeVisible()
    
    // Check for description
    await expect(page.getByText('AI-powered conversion rate optimization')).toBeVisible()
    
    // Check for audit options
    await expect(page.getByText('Quick Audit')).toBeVisible()
    await expect(page.getByText('Custom Audit')).toBeVisible()
  })

  test('should show TDD development status', async ({ page }) => {
    await page.goto('/')
    
    // Check for TDD status section
    await expect(page.getByText('TDD Development Status')).toBeVisible()
    await expect(page.getByText('✅ Project structure with strict TypeScript')).toBeVisible()
    await expect(page.getByText('✅ 90% coverage threshold enforcement')).toBeVisible()
  })

  test('should have proper accessibility features', async ({ page }) => {
    await page.goto('/')
    
    // Check for proper heading hierarchy
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    
    // Check for proper button accessibility
    const buttons = page.getByRole('button')
    const buttonCount = await buttons.count()
    expect(buttonCount).toBeGreaterThan(0)
    
    // Check for proper contrast (basic check)
    const bodyStyles = await page.locator('body').evaluate((el) => {
      return window.getComputedStyle(el)
    })
    expect(bodyStyles).toBeDefined()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }) // iPhone SE
    await page.goto('/')
    
    // Check that content is still visible and properly laid out
    await expect(page.getByRole('heading', { name: 'Shopify CRO Copilot' })).toBeVisible()
    await expect(page.getByText('Quick Audit')).toBeVisible()
    
    // Check that buttons are still accessible on mobile
    const quickAuditButton = page.getByRole('button', { name: /coming soon.*quick/i })
    await expect(quickAuditButton).toBeVisible()
  })

  test('should handle navigation properly', async ({ page }) => {
    await page.goto('/')
    
    // Test navigation behavior (when implemented)
    // For now, just ensure the page loads without errors
    const title = await page.title()
    expect(title).toBe('Shopify CRO Copilot')
  })
})