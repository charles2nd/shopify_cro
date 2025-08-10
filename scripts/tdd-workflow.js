#!/usr/bin/env node

/**
 * TDD Workflow Enforcement Script
 * Ensures proper Red-Green-Refactor cycle is followed
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const TDD_PHASES = {
  RED: 'RED',
  GREEN: 'GREEN', 
  REFACTOR: 'REFACTOR'
}

class TDDWorkflowGuardian {
  constructor() {
    this.currentPhase = this.detectCurrentPhase()
    this.coverageThreshold = process.env.COVERAGE_THRESHOLD || 90
  }

  detectCurrentPhase() {
    // Check for existing failing tests (RED phase)
    try {
      execSync('npm run test -- --passWithNoTests=false --silent', { stdio: 'pipe' })
      return TDD_PHASES.GREEN // Tests are passing
    } catch (error) {
      return TDD_PHASES.RED // Tests are failing
    }
  }

  async enforceRedPhase() {
    console.log('🔴 TDD RED Phase: Write failing tests first')
    console.log('📝 Guidelines:')
    console.log('   • Write tests that fail because implementation is missing')
    console.log('   • Focus on test-first design')
    console.log('   • Define expected behavior clearly')
    console.log()

    // Run tests to confirm they fail
    try {
      execSync('npm run test', { stdio: 'inherit' })
      console.log('❌ RED phase violation: Tests should be failing!')
      console.log('💡 Write tests for features that don\'t exist yet')
      process.exit(1)
    } catch (error) {
      console.log('✅ RED phase complete: Tests are properly failing')
      return true
    }
  }

  async enforceGreenPhase() {
    console.log('🟢 TDD GREEN Phase: Make tests pass with minimal code')
    console.log('📝 Guidelines:')
    console.log('   • Implement just enough code to make tests pass')
    console.log('   • Focus on functionality over perfection')
    console.log('   • Avoid premature optimization')
    console.log()

    // Run tests to confirm they pass
    try {
      execSync('npm run test:coverage', { stdio: 'inherit' })
      console.log('✅ GREEN phase complete: Tests are passing')
      return true
    } catch (error) {
      console.log('❌ GREEN phase incomplete: Tests are still failing')
      console.log('💡 Implement minimal code to make tests pass')
      process.exit(1)
    }
  }

  async enforceRefactorPhase() {
    console.log('🔵 TDD REFACTOR Phase: Improve code without breaking tests')
    console.log('📝 Guidelines:')
    console.log('   • Improve code structure and readability')
    console.log('   • Maintain all existing functionality')
    console.log('   • Keep tests passing throughout')
    console.log()

    // Store initial test results
    const initialTestResults = this.runTestsAndGetResults()
    
    console.log('⚠️  REFACTOR phase: Tests must continue passing during refactoring')
    console.log('🔄 Run tests frequently during refactoring')
    
    return true
  }

  runTestsAndGetResults() {
    try {
      const output = execSync('npm run test:coverage -- --silent --json', { 
        encoding: 'utf8',
        stdio: 'pipe' 
      })
      return JSON.parse(output)
    } catch (error) {
      return null
    }
  }

  async checkCoverageCompliance() {
    console.log('📊 Checking coverage compliance...')
    
    try {
      execSync('node scripts/check-coverage.js', { stdio: 'inherit' })
      console.log('✅ Coverage thresholds met')
      return true
    } catch (error) {
      console.log('❌ Coverage thresholds not met')
      console.log('🚫 Cannot proceed without adequate test coverage')
      return false
    }
  }

  async checkTypeCompliance() {
    console.log('🔍 Checking TypeScript compliance...')
    
    try {
      execSync('npm run type-check', { stdio: 'inherit' })
      console.log('✅ TypeScript checks passed')
      return true
    } catch (error) {
      console.log('❌ TypeScript errors found')
      console.log('🚫 Fix type errors before proceeding')
      return false
    }
  }

  async enforceQualityGates() {
    console.log('🚦 Enforcing quality gates...')
    
    const typeCheck = await this.checkTypeCompliance()
    const coverageCheck = await this.checkCoverageCompliance()
    
    if (!typeCheck || !coverageCheck) {
      console.log('❌ Quality gates failed')
      process.exit(1)
    }
    
    console.log('✅ All quality gates passed')
    return true
  }

  async run(phase) {
    console.log('🛡️  TDD Workflow Guardian')
    console.log('==========================')
    console.log(`Current phase: ${this.currentPhase}`)
    console.log(`Requested phase: ${phase}`)
    console.log()

    switch (phase?.toUpperCase()) {
      case TDD_PHASES.RED:
        await this.enforceRedPhase()
        break
        
      case TDD_PHASES.GREEN:
        await this.enforceGreenPhase()
        await this.enforceQualityGates()
        break
        
      case TDD_PHASES.REFACTOR:
        await this.enforceRefactorPhase()
        await this.enforceQualityGates()
        break
        
      case 'CHECK':
        await this.enforceQualityGates()
        break
        
      default:
        console.log('❓ Usage: npm run tdd [red|green|refactor|check]')
        console.log('   red      - Enforce RED phase (write failing tests)')
        console.log('   green    - Enforce GREEN phase (make tests pass)')
        console.log('   refactor - Enforce REFACTOR phase (improve code)')
        console.log('   check    - Run quality gates')
        console.log()
        console.log('💡 TDD Cycle: RED → GREEN → REFACTOR → repeat')
        process.exit(1)
    }
  }
}

// CLI interface
if (require.main === module) {
  const phase = process.argv[2]
  const guardian = new TDDWorkflowGuardian()
  
  guardian.run(phase).catch((error) => {
    console.error('💥 TDD Workflow Guardian failed:', error.message)
    process.exit(1)
  })
}

module.exports = { TDDWorkflowGuardian }