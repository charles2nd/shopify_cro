#!/usr/bin/env node

/**
 * Coverage threshold enforcement script for TDD compliance
 * Ensures 90% coverage is maintained across all components
 */

const fs = require('fs')
const path = require('path')

const COVERAGE_THRESHOLD = 90
const CORE_COMPONENTS_THRESHOLD = 95

const COVERAGE_SUMMARY_PATH = path.join(process.cwd(), 'coverage', 'coverage-summary.json')

function checkCoverage() {
  if (!fs.existsSync(COVERAGE_SUMMARY_PATH)) {
    console.error('❌ Coverage summary not found. Run tests first.')
    console.error('Expected path:', COVERAGE_SUMMARY_PATH)
    process.exit(1)
  }

  const coverageSummary = JSON.parse(fs.readFileSync(COVERAGE_SUMMARY_PATH, 'utf8'))
  
  console.log('🔍 Checking coverage thresholds...\n')

  const { total } = coverageSummary
  const metrics = ['statements', 'branches', 'functions', 'lines']
  
  let allPassed = true
  
  // Check global coverage
  console.log('📊 Global Coverage:')
  metrics.forEach(metric => {
    const pct = total[metric].pct
    const passed = pct >= COVERAGE_THRESHOLD
    const emoji = passed ? '✅' : '❌'
    console.log(`   ${emoji} ${metric}: ${pct}% (threshold: ${COVERAGE_THRESHOLD}%)`)
    if (!passed) allPassed = false
  })
  
  console.log()
  
  // Check core components coverage
  const coreComponents = [
    'src/lib/crawler',
    'src/lib/heuristics', 
    'src/lib/llm'
  ]
  
  console.log('🔧 Core Components Coverage:')
  coreComponents.forEach(component => {
    const componentCoverage = Object.keys(coverageSummary)
      .filter(file => file.startsWith(component))
      .map(file => coverageSummary[file])
    
    if (componentCoverage.length === 0) {
      console.log(`   ⚠️  ${component}: No files found`)
      return
    }
    
    // Calculate average coverage for component
    const avgCoverage = componentCoverage.reduce((acc, fileCov) => {
      metrics.forEach(metric => {
        acc[metric] = (acc[metric] || 0) + fileCov[metric].pct
      })
      return acc
    }, {})
    
    metrics.forEach(metric => {
      avgCoverage[metric] = avgCoverage[metric] / componentCoverage.length
    })
    
    console.log(`   📁 ${component}:`)
    metrics.forEach(metric => {
      const pct = Math.round(avgCoverage[metric] * 100) / 100
      const passed = pct >= CORE_COMPONENTS_THRESHOLD
      const emoji = passed ? '✅' : '❌'
      console.log(`      ${emoji} ${metric}: ${pct}% (threshold: ${CORE_COMPONENTS_THRESHOLD}%)`)
      if (!passed) allPassed = false
    })
  })
  
  console.log()
  
  // Check for uncovered files
  const uncoveredFiles = Object.keys(coverageSummary)
    .filter(file => file !== 'total')
    .filter(file => {
      const fileCov = coverageSummary[file]
      return metrics.some(metric => fileCov[metric].pct < COVERAGE_THRESHOLD)
    })
  
  if (uncoveredFiles.length > 0) {
    console.log('⚠️  Files below coverage threshold:')
    uncoveredFiles.forEach(file => {
      const fileCov = coverageSummary[file]
      console.log(`   📄 ${file}:`)
      metrics.forEach(metric => {
        if (fileCov[metric].pct < COVERAGE_THRESHOLD) {
          console.log(`      ❌ ${metric}: ${fileCov[metric].pct}%`)
        }
      })
    })
    console.log()
  }
  
  // Final result
  if (allPassed) {
    console.log('🎉 All coverage thresholds passed!')
    console.log('✨ TDD compliance: PASSED')
    process.exit(0)
  } else {
    console.log('❌ Coverage thresholds not met!')
    console.log('🚫 TDD compliance: FAILED')
    console.log('\n💡 Tips to improve coverage:')
    console.log('   • Write tests for uncovered functions and branches')
    console.log('   • Use Red-Green-Refactor TDD cycle')
    console.log('   • Test edge cases and error conditions')
    console.log('   • Add integration tests for complex workflows')
    process.exit(1)
  }
}

if (require.main === module) {
  checkCoverage()
}

module.exports = { checkCoverage }