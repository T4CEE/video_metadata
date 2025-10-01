export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0b14] text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Header Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1b2e] hover:bg-[#1a1b2e]/50 border border-gray-700 rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm text-gray-300">API Platform</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center text-white">
            Video Metadata Management API
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            A scalable RESTful API for managing video metadata with authentication, caching, and comprehensive testing.
          </p>

          {/* API Ecosystem Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-8 text-center text-white">
              API Ecosystem
            </h2>

            <div className="space-y-4">
              {/* Features Card */}
              <div className="group bg-[#13141f] hover:bg-[#1a1b2e]/50 border border-gray-800 hover:border-gray-700 rounded-xl p-6 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-[#1a1b2e] p-3 rounded-lg">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Features</h3>
                      <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span> JWT & API Key Authentication
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span> CRUD Operations for Videos
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span> Advanced Filtering & Pagination
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span> Redis Caching
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span> PostgreSQL Database
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span> Comprehensive Tests
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span> Swagger Documentation
                        </li>
                      </ul>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Quick Links Card */}
              <div className="group bg-[#13141f] hover:bg-[#1a1b2e]/50 border border-gray-800 hover:border-gray-700 rounded-xl p-6 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-[#1a1b2e] p-3 rounded-lg">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
                      <div className="space-y-3">
                        <a 
                          href="/api-docs" 
                          target="_blank"
                          className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-center text-sm"
                        >
                          API Documentation
                        </a>
                        <a 
                          href="https://github.com/T4CEE/video_metadata" 
                          target="_blank"
                          className="block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-center text-sm"
                        >
                          View on GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* API Endpoints Card */}
              <div className="group bg-[#13141f] hover:bg-[#1a1b2e]/50 border border-gray-800 hover:border-gray-700 rounded-xl p-6 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-[#1a1b2e] p-3 rounded-lg">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-4">API Endpoints</h3>
                      <div className="space-y-3 font-mono text-sm">
                        <div className="flex items-center space-x-3">
                          <span className="px-2 py-1 bg-green-600 rounded text-xs">POST</span>
                          <span className="text-gray-300">/api/auth/register</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="px-2 py-1 bg-green-600 rounded text-xs">POST</span>
                          <span className="text-gray-300">/api/auth/login</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="px-2 py-1 bg-blue-600 rounded text-xs">GET</span>
                          <span className="text-gray-300">/api/videos</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="px-2 py-1 bg-green-600 rounded text-xs">POST</span>
                          <span className="text-gray-300">/api/videos</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="px-2 py-1 bg-blue-600 rounded text-xs">GET</span>
                          <span className="text-gray-300">/api/videos/:id</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="px-2 py-1 bg-yellow-600 rounded text-xs">PUT</span>
                          <span className="text-gray-300">/api/videos/:id</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="px-2 py-1 bg-red-600 rounded text-xs">DELETE</span>
                          <span className="text-gray-300">/api/videos/:id</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Testing Card */}
              <div className="group bg-[#13141f] hover:bg-[#1a1b2e]/50 border border-gray-800 hover:border-gray-700 rounded-xl p-6 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-[#1a1b2e] p-3 rounded-lg">
                      <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-4">Testing</h3>
                      <pre className="bg-[#0a0b14] p-4 rounded-lg text-sm overflow-x-auto border border-gray-800">
                        <code className="text-green-400">
{`npm run test           # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report`}
                        </code>
                      </pre>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}