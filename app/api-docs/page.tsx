'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    SwaggerUIBundle: any;
  }
}

export default function ApiDocsPage() {
  useEffect(() => {
    //Swagger UI
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.3/swagger-ui.min.css';
    document.head.appendChild(link);

    //Swagger UI JS
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.3/swagger-ui-bundle.min.js';
    script.async = true;
    script.onload = () => {
      window.SwaggerUIBundle({
        url: '/api/docs',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          window.SwaggerUIBundle.presets.apis,
          window.SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        layout: 'BaseLayout',
        supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
        tryItOutEnabled: true,
        requestInterceptor: (req: any) => {
          //authorization header | localStorage
          const token = localStorage.getItem('api_token');
          if (token) {
            req.headers['Authorization'] = `Bearer ${token}`;
          }
          return req;
        },
      });
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#0a0b14] text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Video Metadata API Documentation</h1>
          <p className="text-blue-100">Interactive API documentation and testing interface</p>
          
          {/* Quick Auth Section */}
          <div className="mt-4 p-4 bg-white/10 rounded-lg backdrop-blur">
            <p className="text-sm font-semibold mb-2">Quick Start:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>First, register a new user at <code className="bg-black/20 px-1 rounded">POST /auth/register</code></li>
              <li>Or login at <code className="bg-black/20 px-1 rounded">POST /auth/login</code></li>
              <li>Copy the token from the response</li>
              <li>Click "Authorize" button below and paste the token</li>
              <li>Now you can test all protected endpoints!</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Container */}
      <div id="swagger-ui"></div>

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-200 p-6 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          <p className="text-sm">
            Built with Next.js, PostgreSQL, Redis, and Prisma | 
            <a href="/" className="text-blue-600 hover:underline ml-2">Back to Home</a>
          </p>
        </div>
      </div>
    </div>
  );
}