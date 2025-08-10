import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Seed heuristic rules
  const heuristicRules = [
    {
      id: 'trust-signals',
      name: 'Trust Signals Presence',
      description: 'Checks for trust signals like security badges, guarantees, and testimonials',
      category: 'trust',
      severity: 'high',
      enabled: true,
    },
    {
      id: 'cta-visibility',
      name: 'Call-to-Action Visibility',
      description: 'Ensures CTAs are prominent and clearly visible',
      category: 'conversion',
      severity: 'critical',
      enabled: true,
    },
    {
      id: 'product-images',
      name: 'Product Image Quality',
      description: 'Checks for high-quality product images and multiple angles',
      category: 'conversion',
      severity: 'high',
      enabled: true,
    },
    {
      id: 'loading-speed',
      name: 'Page Loading Speed',
      description: 'Measures and evaluates page loading performance',
      category: 'performance',
      severity: 'high',
      enabled: true,
    },
    {
      id: 'mobile-responsive',
      name: 'Mobile Responsiveness',
      description: 'Ensures the site works well on mobile devices',
      category: 'usability',
      severity: 'critical',
      enabled: true,
    },
    {
      id: 'navigation-clarity',
      name: 'Navigation Clarity',
      description: 'Evaluates the clarity and intuitiveness of site navigation',
      category: 'usability',
      severity: 'medium',
      enabled: true,
    },
    {
      id: 'accessibility-compliance',
      name: 'Accessibility Compliance',
      description: 'Checks for basic accessibility features and compliance',
      category: 'accessibility',
      severity: 'medium',
      enabled: true,
    },
  ]

  console.log('📝 Creating heuristic rules...')
  for (const rule of heuristicRules) {
    await prisma.heuristicRule.upsert({
      where: { id: rule.id },
      update: rule,
      create: rule,
    })
  }

  console.log('✅ Database seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })