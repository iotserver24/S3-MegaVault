import { Alert, TableOfContents, Card, CodeBlock } from '../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'API Overview' },
  { id: 'authentication', title: 'Authentication' },
  { id: 'endpoints', title: 'Endpoint Categories' },
  { id: 'request-format', title: 'Request Format' },
  { id: 'response-format', title: 'Response Format' },
  { id: 'rate-limiting', title: 'Rate Limiting' },
  { id: 'error-handling', title: 'Error Handling' },
];

export default function APIReferencePage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">API Reference</h1>
        <p className="text-xl text-slate-600">
          Complete reference for MegaVault's REST API endpoints, authentication, and integration guides.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>API Overview</h2>
        <p>
          MegaVault provides a comprehensive REST API for file management, user authentication, 
          and system integration. The API is designed for both web and mobile applications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="REST Architecture" description="Standard HTTP methods">
            <ul className="text-sm space-y-1">
              <li>✅ RESTful design principles</li>
              <li>✅ Standard HTTP status codes</li>
              <li>✅ JSON request/response format</li>
              <li>✅ Consistent URL patterns</li>
            </ul>
          </Card>
          
          <Card title="Authentication" description="Secure access control">
            <ul className="text-sm space-y-1">
              <li>✅ JWT token-based auth</li>
              <li>✅ Session management</li>
              <li>✅ API key support</li>
              <li>✅ Role-based permissions</li>
            </ul>
          </Card>

          <Card title="Developer Experience" description="Easy integration">
            <ul className="text-sm space-y-1">
              <li>✅ Comprehensive documentation</li>
              <li>✅ Code examples</li>
              <li>✅ SDKs and libraries</li>
              <li>✅ Interactive testing</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="API Base URL">
          All API endpoints are relative to the base URL:
          <code className="block mt-2 bg-slate-100 p-2 rounded">https://your-domain.com/api</code>
        </Alert>
      </section>

      <section id="authentication">
        <h2>Authentication</h2>
        <p>
          MegaVault uses JWT tokens for API authentication. Include the token in the Authorization header.
        </p>

        <CodeBlock language="http" title="Authentication Header">
{`Authorization: Bearer YOUR_JWT_TOKEN`}
        </CodeBlock>

        <h3>Getting an Access Token</h3>
        <CodeBlock language="http" title="Login Request">
{`POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}`}
        </CodeBlock>

        <CodeBlock language="json" title="Login Response">
{`{
  "success": true,
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h"
}`}
        </CodeBlock>
      </section>

      <section id="endpoints">
        <h2>Endpoint Categories</h2>
        <p>
          The MegaVault API is organized into logical categories for different functionalities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Authentication Endpoints">
            <ul className="text-sm space-y-1">
              <li><code className="text-xs">POST /api/auth/signin</code> - User login</li>
              <li><code className="text-xs">POST /api/auth/signup</code> - User registration</li>
              <li><code className="text-xs">POST /api/auth/signout</code> - User logout</li>
              <li><code className="text-xs">GET /api/auth/session</code> - Get session</li>
            </ul>
            <Link href="/docs/api/authentication" className="text-sm text-blue-600 hover:underline">
              View Documentation →
            </Link>
          </Card>
          
          <Card title="File Management">
            <ul className="text-sm space-y-1">
              <li><code className="text-xs">GET /api/files</code> - List files</li>
              <li><code className="text-xs">POST /api/files/upload</code> - Upload file</li>
              <li><code className="text-xs">GET /api/files/:id</code> - Get file info</li>
              <li><code className="text-xs">DELETE /api/files/:id</code> - Delete file</li>
            </ul>
            <Link href="/docs/api/files" className="text-sm text-blue-600 hover:underline">
              View Documentation →
            </Link>
          </Card>
          
          <Card title="User Management">
            <ul className="text-sm space-y-1">
              <li><code className="text-xs">GET /api/users/profile</code> - Get profile</li>
              <li><code className="text-xs">PUT /api/users/profile</code> - Update profile</li>
              <li><code className="text-xs">GET /api/users/usage</code> - Get usage stats</li>
              <li><code className="text-xs">PUT /api/users/settings</code> - Update settings</li>
            </ul>
            <Link href="/docs/api/users" className="text-sm text-blue-600 hover:underline">
              View Documentation →
            </Link>
          </Card>
          
          <Card title="Mobile Endpoints">
            <ul className="text-sm space-y-1">
              <li><code className="text-xs">POST /api/mobile/auth</code> - Mobile auth</li>
              <li><code className="text-xs">POST /api/mobile/upload</code> - Mobile upload</li>
              <li><code className="text-xs">GET /api/mobile/sync</code> - Data sync</li>
              <li><code className="text-xs">POST /api/mobile/push</code> - Push notifications</li>
            </ul>
            <Link href="/docs/api/mobile" className="text-sm text-blue-600 hover:underline">
              View Documentation →
            </Link>
          </Card>
        </div>
      </section>

      <section id="request-format">
        <h2>Request Format</h2>
        <p>
          All API requests should follow these formatting guidelines for consistency.
        </p>

        <h3>Headers</h3>
        <CodeBlock language="http" title="Required Headers">
{`Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN
User-Agent: YourApp/1.0`}
        </CodeBlock>

        <h3>Query Parameters</h3>
        <CodeBlock language="http" title="Pagination Example">
{`GET /api/files?page=1&limit=20&sort=createdAt&order=desc`}
        </CodeBlock>

        <h3>Request Body</h3>
        <CodeBlock language="json" title="JSON Request Body">
{`{
  "name": "document.pdf",
  "folder": "/documents",
  "tags": ["important", "work"],
  "metadata": {
    "description": "Project specification document"
  }
}`}
        </CodeBlock>
      </section>

      <section id="response-format">
        <h2>Response Format</h2>
        <p>
          All API responses follow a consistent format with proper HTTP status codes.
        </p>

        <h3>Success Response</h3>
        <CodeBlock language="json" title="Success Response">
{`{
  "success": true,
  "data": {
    "id": "file_123",
    "name": "document.pdf",
    "size": 1024,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 50
  }
}`}
        </CodeBlock>

        <h3>Error Response</h3>
        <CodeBlock language="json" title="Error Response">
{`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid file format",
    "details": {
      "field": "file",
      "allowedTypes": ["pdf", "jpg", "png"]
    }
  }
}`}
        </CodeBlock>

        <h3>HTTP Status Codes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Status Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Meaning
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Usage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900">200</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">OK</td>
                <td className="px-6 py-4 text-sm text-slate-600">Request successful</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900">201</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Created</td>
                <td className="px-6 py-4 text-sm text-slate-600">Resource created successfully</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900">400</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Bad Request</td>
                <td className="px-6 py-4 text-sm text-slate-600">Invalid request format or parameters</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900">401</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Unauthorized</td>
                <td className="px-6 py-4 text-sm text-slate-600">Authentication required or invalid</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900">403</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Forbidden</td>
                <td className="px-6 py-4 text-sm text-slate-600">Insufficient permissions</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900">404</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Not Found</td>
                <td className="px-6 py-4 text-sm text-slate-600">Resource does not exist</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900">429</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Too Many Requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">Rate limit exceeded</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900">500</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Internal Server Error</td>
                <td className="px-6 py-4 text-sm text-slate-600">Server-side error occurred</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="rate-limiting">
        <h2>Rate Limiting</h2>
        <p>
          API endpoints are rate-limited to ensure fair usage and system stability.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Endpoint Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Rate Limit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Window
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">Authentication</td>
                <td className="px-6 py-4 text-sm text-slate-600">5 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">1 minute</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">File Operations</td>
                <td className="px-6 py-4 text-sm text-slate-600">100 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">1 hour</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">File Upload</td>
                <td className="px-6 py-4 text-sm text-slate-600">10 uploads</td>
                <td className="px-6 py-4 text-sm text-slate-600">1 hour</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">General API</td>
                <td className="px-6 py-4 text-sm text-slate-600">1000 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">1 hour</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Rate Limit Headers</h3>
        <CodeBlock language="http" title="Rate Limit Response Headers">
{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200`}
        </CodeBlock>
      </section>

      <section id="error-handling">
        <h2>Error Handling</h2>
        <p>
          Proper error handling is essential for robust API integration.
        </p>

        <h3>Common Error Codes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Client Errors (4xx)">
            <ul className="text-sm space-y-1">
              <li><strong>VALIDATION_ERROR:</strong> Invalid input data</li>
              <li><strong>AUTHENTICATION_FAILED:</strong> Invalid credentials</li>
              <li><strong>INSUFFICIENT_PERMISSIONS:</strong> Access denied</li>
              <li><strong>RESOURCE_NOT_FOUND:</strong> Requested resource missing</li>
            </ul>
          </Card>
          
          <Card title="Server Errors (5xx)">
            <ul className="text-sm space-y-1">
              <li><strong>INTERNAL_ERROR:</strong> Unexpected server error</li>
              <li><strong>DATABASE_ERROR:</strong> Database connection issue</li>
              <li><strong>STORAGE_ERROR:</strong> File storage problem</li>
              <li><strong>SERVICE_UNAVAILABLE:</strong> Temporary service issue</li>
            </ul>
          </Card>
        </div>

        <h3>Error Handling Best Practices</h3>
        <ul>
          <li><strong>Check Status Codes:</strong> Always check HTTP status codes</li>
          <li><strong>Parse Error Messages:</strong> Extract meaningful error details</li>
          <li><strong>Implement Retry Logic:</strong> Retry on 5xx errors with backoff</li>
          <li><strong>Handle Rate Limits:</strong> Respect rate limit headers</li>
          <li><strong>Log Errors:</strong> Log errors for debugging and monitoring</li>
        </ul>

        <Alert type="info" title="SDK Availability">
          Official SDKs are available for popular languages to simplify API integration 
          and handle common scenarios like authentication and error handling.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">API Endpoints</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/api/authentication" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Authentication →</h4>
              <p className="text-blue-800 text-sm">User authentication and session management</p>
            </Link>
            <Link href="/docs/api/files" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">File Management →</h4>
              <p className="text-green-800 text-sm">Upload, download, and manage files</p>
            </Link>
            <Link href="/docs/api/users" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">User Management →</h4>
              <p className="text-purple-800 text-sm">User profiles and account settings</p>
            </Link>
            <Link href="/docs/api/mobile" className="block p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
              <h4 className="font-semibold text-orange-900 mb-2">Mobile Endpoints →</h4>
              <p className="text-orange-800 text-sm">Mobile-specific API endpoints</p>
            </Link>
            <Link href="/docs/api/errors" className="block p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
              <h4 className="font-semibold text-red-900 mb-2">Error Handling →</h4>
              <p className="text-red-800 text-sm">Error codes and troubleshooting</p>
            </Link>
            <Link href="/docs/api/rate-limiting" className="block p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors">
              <h4 className="font-semibold text-yellow-900 mb-2">Rate Limiting →</h4>
              <p className="text-yellow-800 text-sm">API rate limiting and best practices</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}