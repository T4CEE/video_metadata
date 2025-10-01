import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0b14] text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Header Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1b2e] border border-gray-700 rounded-full">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="text-sm text-gray-300">API Platform</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center text-white">
            Video Metadata Management API
          </h1>

          <p className="text-lg md:text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            A scalable RESTful API for managing video metadata with
            authentication, caching, and comprehensive testing.
          </p>

          {/* API Ecosystem Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-8 text-center text-white">
              API Ecosystem
            </h2>
          </div>

          <Link
            href="/api-docs"
            target="_blank"
            className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-center text-sm"
          >
            API Documentation
          </Link>
        </div>
      </div>
    </main>
  );
}
