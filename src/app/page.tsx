export default function HomePage() {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shopify CRO Copilot
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered conversion rate optimization for your Shopify store. 
            Get actionable recommendations to boost sales.
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Start Your Store Audit</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800">
                <strong>Ready for TDD development!</strong> 
                This project is set up with comprehensive testing infrastructure 
                and enforces 90% code coverage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Quick Audit</h3>
                <p className="text-gray-600 mb-4">
                  Analyze your store&apos;s homepage, product pages, and checkout flow
                </p>
                <button 
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  disabled
                >
                  Coming Soon (TDD Implementation)
                </button>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Custom Audit</h3>
                <p className="text-gray-600 mb-4">
                  Select specific pages and heuristics for detailed analysis
                </p>
                <button 
                  className="w-full bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
                  disabled
                >
                  Coming Soon (TDD Implementation)
                </button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">TDD Development Status</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Project structure with strict TypeScript</li>
                <li>✅ Jest + Testing Library + Playwright setup</li>
                <li>✅ 90% coverage threshold enforcement</li>
                <li>✅ TDD workflow scripts and quality gates</li>
                <li>⏳ Core components (following TDD cycle)</li>
                <li>⏳ UI components with comprehensive tests</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}