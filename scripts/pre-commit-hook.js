#!/usr/bin/env node

/**
 * Pre-commit hook for TDD compliance
 * Blocks commits that don't meet quality standards
 */

const { execSync } = require('child_process')
const fs = require('fs')

class PreCommitGuardian {
  constructor() {
    this.errors = []
    this.warnings = []
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString()
    const prefix = {
      info: '📋',
      success: '✅',
      warning: '⚠️',
      error: '❌',
    }[type] || '📋'

    console.log(`${prefix} ${message}`)
  }

  async runCommand(command, description) {
    this.log(`Running: ${description}`)
    try {
      const output = execSync(command, { 
        encoding: 'utf8',
        stdio: 'pipe' 
      })
      this.log(`✅ ${description} passed`, 'success')
      return { success: true, output }
    } catch (error) {
      this.log(`❌ ${description} failed`, 'error')
      this.errors.push({
        check: description,
        command,
        error: error.message,
        output: error.stdout || error.stderr
      })
      return { success: false, error }
    }
  }

  async checkStagedFiles() {
    try {
      const stagedFiles = execSync('git diff --cached --name-only', { 
        encoding: 'utf8' 
      }).trim()

      if (!stagedFiles) {
        this.log('No staged files found', 'warning')
        return []
      }

      const files = stagedFiles.split('\n').filter(file => 
        file.endsWith('.ts') || 
        file.endsWith('.tsx') || 
        file.endsWith('.js') || 
        file.endsWith('.jsx')
      )

      this.log(`Found ${files.length} staged code files`)
      return files
    } catch (error) {
      this.log('Failed to get staged files', 'error')
      return []
    }
  }

  async checkTypeScript() {
    return await this.runCommand(
      'npx tsc --noEmit',
      'TypeScript type checking'
    )
  }

  async checkLinting() {
    return await this.runCommand(
      'npm run lint',
      'ESLint code quality check'
    )
  }

  async checkTests() {
    return await this.runCommand(
      'npm run test:coverage -- --ci --coverage --watchAll=false --passWithNoTests=false',
      'Test execution and coverage'
    )
  }

  async checkCoverage() {
    return await this.runCommand(
      'node scripts/check-coverage.js',
      'Coverage threshold validation (90%)'
    )
  }

  async checkTDDCompliance() {
    const stagedFiles = await this.checkStagedFiles()
    
    // Check if there are implementation files without corresponding tests
    const implementationFiles = stagedFiles.filter(file => 
      !file.includes('test') && 
      !file.includes('spec') && 
      (file.endsWith('.ts') || file.endsWith('.tsx'))
    )

    const testFiles = stagedFiles.filter(file => 
      file.includes('test') || file.includes('spec')
    )

    if (implementationFiles.length > 0 && testFiles.length === 0) {
      this.warnings.push({
        check: 'TDD Compliance',
        message: 'Implementation files staged without corresponding tests',
        files: implementationFiles,
        suggestion: 'Consider writing tests first (TDD Red phase)'
      })
      this.log('⚠️  Warning: Implementation files without tests detected', 'warning')
    }

    // Check for proper test structure
    for (const file of testFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8')
        
        // Check for TDD phase indicators
        const hasTDDStructure = content.includes('RED Phase') || 
                              content.includes('GREEN Phase') || 
                              content.includes('REFACTOR Phase')

        if (!hasTDDStructure) {
          this.warnings.push({
            check: 'TDD Structure',
            message: `Test file ${file} doesn't follow TDD phase structure`,
            suggestion: 'Organize tests into RED-GREEN-REFACTOR phases'
          })
        }
      } catch (error) {
        // File might be deleted or renamed
        continue
      }
    }

    return true
  }

  async generateReport() {
    console.log('\n🛡️  Pre-commit Quality Report')
    console.log('================================')

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All quality checks passed!')
      console.log('🚀 Ready to commit')
      return true
    }

    if (this.errors.length > 0) {
      console.log('\n❌ BLOCKING ERRORS:')
      this.errors.forEach((error, index) => {
        console.log(`\n${index + 1}. ${error.check}`)
        console.log(`   Command: ${error.command}`)
        console.log(`   Error: ${error.error}`)
        if (error.output) {
          console.log(`   Output: ${error.output.substring(0, 200)}...`)
        }
      })
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:')
      this.warnings.forEach((warning, index) => {
        console.log(`\n${index + 1}. ${warning.check}`)
        console.log(`   ${warning.message}`)
        if (warning.files) {
          console.log(`   Files: ${warning.files.join(', ')}`)
        }
        console.log(`   💡 ${warning.suggestion}`)
      })
    }

    if (this.errors.length > 0) {
      console.log('\n🚫 COMMIT BLOCKED - Fix errors above')
      console.log('\n💡 Quick fixes:')
      console.log('   • npm run test:coverage -- Fix failing tests')
      console.log('   • npm run type-check     -- Fix TypeScript errors') 
      console.log('   • npm run lint           -- Fix linting issues')
      console.log('   • npm run tdd check      -- Run full TDD compliance')
      return false
    }

    return true
  }

  async run() {
    console.log('🔒 Pre-commit Hook: TDD Quality Guardian')
    console.log('=========================================')

    // Run all checks
    await this.checkTDDCompliance()
    await this.checkTypeScript()
    await this.checkLinting()
    await this.checkTests()
    await this.checkCoverage()

    // Generate final report
    const passed = await this.generateReport()

    if (!passed) {
      console.log('\n📚 TDD Reminder:')
      console.log('   1. RED:      Write failing tests first')
      console.log('   2. GREEN:    Make tests pass with minimal code') 
      console.log('   3. REFACTOR: Improve code while keeping tests green')
      console.log('   4. REPEAT:   Continue the cycle')

      process.exit(1)
    }

    console.log('\n🎉 Commit approved by TDD Guardian!')
    process.exit(0)
  }
}

// CLI interface
if (require.main === module) {
  const guardian = new PreCommitGuardian()
  guardian.run().catch((error) => {
    console.error('💥 Pre-commit hook failed:', error.message)
    process.exit(1)
  })
}

module.exports = { PreCommitGuardian }