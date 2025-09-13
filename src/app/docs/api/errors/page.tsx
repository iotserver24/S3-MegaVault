import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Error Handling Overview' },
  { id: 'error-format', title: 'Error Response Format' },
  { id: 'http-status-codes', title: 'HTTP Status Codes' },
  { id: 'error-codes', title: 'Application Error Codes' },
  { id: 'validation-errors', title: 'Validation Errors' },
  { id: 'best-practices', title: 'Best Practices' },
  { id: 'troubleshooting', title: 'Common Issues' },
];

export default function ErrorHandlingAPIPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Error Handling</h1>
        <p className="text-xl text-slate-600">
          Comprehensive guide to understanding and handling errors in the MegaVault API, 
          including error codes, formats, and troubleshooting strategies.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Error Handling Overview</h2>
        <p>
          MegaVault API uses standard HTTP status codes and provides detailed error information 
          to help developers handle errors gracefully and provide meaningful feedback to users.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Consistent Format" description="Standardized error responses">
            <ul className="text-sm space-y-1">
              <li>✅ Consistent JSON structure</li>
              <li>✅ Detailed error messages</li>
              <li>✅ Contextual information</li>
              <li>✅ Actionable guidance</li>
            </ul>
          </Card>
          
          <Card title="Error Categories" description="Organized error types">
            <ul className="text-sm space-y-1">
              <li>✅ Client errors (4xx)</li>
              <li>✅ Server errors (5xx)</li>
              <li>✅ Validation errors</li>
              <li>✅ Authentication errors</li>
            </ul>
          </Card>

          <Card title="Developer Tools" description="Debugging assistance">
            <ul className="text-sm space-y-1">
              <li>✅ Error documentation</li>
              <li>✅ Debug information</li>
              <li>✅ Request tracing</li>
              <li>✅ Support resources</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Error Handling Philosophy">
          All API errors provide enough information for developers to understand what went wrong 
          and how to fix it, while being safe to display to end users when appropriate.
        </Alert>
      </section>

      <section id="error-format">
        <h2>Error Response Format</h2>
        <p>All error responses follow a consistent JSON structure with detailed information.</p>

        <h3>Standard Error Response</h3>
        <CodeBlock language="json" title="Error Response Structure">
{`{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "type": "client_error",
    "timestamp": "2024-01-20T15:30:00Z",
    "requestId": "req_abc123def456",
    "details": {
      "field": "email",
      "value": "invalid-email",
      "constraint": "Valid email format required"
    }
  },
  "meta": {
    "documentation": "https://docs.megavault.com/api/errors#ERROR_CODE",
    "support": "https://support.megavault.com"
  }
}`}
        </CodeBlock>

        <h3>Error Response Fields</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Field</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">success</td>
                <td className="px-6 py-4 text-sm text-slate-600">boolean</td>
                <td className="px-6 py-4 text-sm text-slate-600">Always false for error responses</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">error.code</td>
                <td className="px-6 py-4 text-sm text-slate-600">string</td>
                <td className="px-6 py-4 text-sm text-slate-600">Machine-readable error identifier</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">error.message</td>
                <td className="px-6 py-4 text-sm text-slate-600">string</td>
                <td className="px-6 py-4 text-sm text-slate-600">Human-readable error description</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">error.type</td>
                <td className="px-6 py-4 text-sm text-slate-600">string</td>
                <td className="px-6 py-4 text-sm text-slate-600">Error category (client_error, server_error, etc.)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">error.details</td>
                <td className="px-6 py-4 text-sm text-slate-600">object</td>
                <td className="px-6 py-4 text-sm text-slate-600">Additional context-specific information</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">requestId</td>
                <td className="px-6 py-4 text-sm text-slate-600">string</td>
                <td className="px-6 py-4 text-sm text-slate-600">Unique request identifier for debugging</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="http-status-codes">
        <h2>HTTP Status Codes</h2>
        <p>MegaVault API uses standard HTTP status codes to indicate the outcome of requests.</p>

        <h3>Success Codes (2xx)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="200 OK">
            <p className="text-sm text-slate-600 mb-2">Request successful, data returned</p>
            <ul className="text-xs space-y-1">
              <li>GET requests with data</li>
              <li>PUT requests with updated data</li>
              <li>DELETE requests with confirmation</li>
            </ul>
          </Card>
          
          <Card title="201 Created">
            <p className="text-sm text-slate-600 mb-2">Resource created successfully</p>
            <ul className="text-xs space-y-1">
              <li>POST requests creating new resources</li>
              <li>File uploads</li>
              <li>User registration</li>
            </ul>
          </Card>
        </div>

        <h3>Client Error Codes (4xx)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Common Causes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">400</td>
                <td className="px-6 py-4 text-sm text-slate-600">Bad Request</td>
                <td className="px-6 py-4 text-sm text-slate-600">Invalid request format or parameters</td>
                <td className="px-6 py-4 text-sm text-slate-600">Malformed JSON, missing required fields</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">401</td>
                <td className="px-6 py-4 text-sm text-slate-600">Unauthorized</td>
                <td className="px-6 py-4 text-sm text-slate-600">Authentication required or invalid</td>
                <td className="px-6 py-4 text-sm text-slate-600">Missing/expired token, invalid credentials</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">403</td>
                <td className="px-6 py-4 text-sm text-slate-600">Forbidden</td>
                <td className="px-6 py-4 text-sm text-slate-600">Insufficient permissions</td>
                <td className="px-6 py-4 text-sm text-slate-600">Access denied, quota exceeded</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">404</td>
                <td className="px-6 py-4 text-sm text-slate-600">Not Found</td>
                <td className="px-6 py-4 text-sm text-slate-600">Resource does not exist</td>
                <td className="px-6 py-4 text-sm text-slate-600">Invalid file ID, deleted resource</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">409</td>
                <td className="px-6 py-4 text-sm text-slate-600">Conflict</td>
                <td className="px-6 py-4 text-sm text-slate-600">Resource conflict</td>
                <td className="px-6 py-4 text-sm text-slate-600">Duplicate file name, concurrent modification</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">413</td>
                <td className="px-6 py-4 text-sm text-slate-600">Payload Too Large</td>
                <td className="px-6 py-4 text-sm text-slate-600">File or request too large</td>
                <td className="px-6 py-4 text-sm text-slate-600">File exceeds size limit</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">429</td>
                <td className="px-6 py-4 text-sm text-slate-600">Too Many Requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">Rate limit exceeded</td>
                <td className="px-6 py-4 text-sm text-slate-600">Too many API calls, implement backoff</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Server Error Codes (5xx)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="500 Internal Server Error">
            <p className="text-sm text-slate-600 mb-2">Unexpected server error occurred</p>
            <ul className="text-xs space-y-1">
              <li>Database connection issues</li>
              <li>Unhandled exceptions</li>
              <li>Configuration problems</li>
            </ul>
          </Card>
          
          <Card title="503 Service Unavailable">
            <p className="text-sm text-slate-600 mb-2">Service temporarily unavailable</p>
            <ul className="text-xs space-y-1">
              <li>Maintenance mode</li>
              <li>Overloaded servers</li>
              <li>External service dependencies</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="error-codes">
        <h2>Application Error Codes</h2>
        <p>Detailed application-specific error codes for precise error handling.</p>

        <h3>Authentication Errors</h3>
        <CodeBlock language="json" title="Authentication Error Examples">
{`// Invalid credentials
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "type": "authentication_error"
  }
}

// Token expired
{
  "success": false,
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "Authentication token has expired",
    "type": "authentication_error",
    "details": {
      "expiredAt": "2024-01-20T14:30:00Z",
      "refreshRequired": true
    }
  }
}

// Account suspended
{
  "success": false,
  "error": {
    "code": "ACCOUNT_SUSPENDED",
    "message": "Account has been suspended due to policy violation",
    "type": "authentication_error",
    "details": {
      "reason": "terms_violation",
      "suspendedAt": "2024-01-15T10:00:00Z",
      "appealUrl": "https://support.megavault.com/appeal"
    }
  }
}`}
        </CodeBlock>

        <h3>File Operation Errors</h3>
        <CodeBlock language="json" title="File Error Examples">
{`// File not found
{
  "success": false,
  "error": {
    "code": "FILE_NOT_FOUND",
    "message": "The requested file could not be found",
    "type": "client_error",
    "details": {
      "fileId": "file_123456789",
      "possibleCauses": ["File was deleted", "Invalid file ID", "Access denied"]
    }
  }
}

// Storage quota exceeded
{
  "success": false,
  "error": {
    "code": "STORAGE_QUOTA_EXCEEDED",
    "message": "Upload would exceed your storage quota",
    "type": "client_error",
    "details": {
      "currentUsage": 5368709120,
      "storageLimit": 5368709120,
      "fileSize": 1048576,
      "upgradeUrl": "https://megavault.com/upgrade"
    }
  }
}

// Unsupported file type
{
  "success": false,
  "error": {
    "code": "UNSUPPORTED_FILE_TYPE",
    "message": "File type not supported",
    "type": "client_error",
    "details": {
      "fileType": "exe",
      "supportedTypes": ["jpg", "png", "pdf", "docx", "txt"]
    }
  }
}`}
        </CodeBlock>
      </section>

      <section id="validation-errors">
        <h2>Validation Errors</h2>
        <p>Detailed validation errors with field-specific information.</p>

        <CodeBlock language="json" title="Validation Error Example">
{`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "type": "client_error",
    "details": {
      "fields": [
        {
          "field": "email",
          "value": "invalid-email",
          "errors": [
            {
              "code": "INVALID_FORMAT",
              "message": "Must be a valid email address"
            }
          ]
        },
        {
          "field": "password",
          "value": "[REDACTED]",
          "errors": [
            {
              "code": "TOO_SHORT",
              "message": "Password must be at least 8 characters long"
            },
            {
              "code": "MISSING_UPPERCASE",
              "message": "Password must contain at least one uppercase letter"
            }
          ]
        }
      ]
    }
  }
}`}
        </CodeBlock>

        <h3>Common Validation Rules</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Rule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">Required</td>
                <td className="px-6 py-4 text-sm font-mono text-slate-600">REQUIRED</td>
                <td className="px-6 py-4 text-sm text-slate-600">Field is required and cannot be empty</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">Email Format</td>
                <td className="px-6 py-4 text-sm font-mono text-slate-600">INVALID_FORMAT</td>
                <td className="px-6 py-4 text-sm text-slate-600">Must be a valid email address</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">String Length</td>
                <td className="px-6 py-4 text-sm font-mono text-slate-600">TOO_SHORT/TOO_LONG</td>
                <td className="px-6 py-4 text-sm text-slate-600">String length validation</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">Unique Value</td>
                <td className="px-6 py-4 text-sm font-mono text-slate-600">NOT_UNIQUE</td>
                <td className="px-6 py-4 text-sm text-slate-600">Value must be unique</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="best-practices">
        <h2>Best Practices</h2>
        <p>Recommended approaches for handling errors in your applications.</p>

        <h3>Error Handling Strategy</h3>
        <CodeBlock language="javascript" title="JavaScript Error Handling">
{`class MegaVaultAPIError extends Error {
  constructor(response, requestId) {
    super(response.error.message);
    this.name = 'MegaVaultAPIError';
    this.code = response.error.code;
    this.type = response.error.type;
    this.details = response.error.details;
    this.requestId = requestId;
    this.statusCode = response.status;
  }
}

async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, options);
    const data = await response.json();
    
    if (!response.ok || !data.success) {
      throw new MegaVaultAPIError(data, response.headers.get('X-Request-ID'));
    }
    
    return data;
  } catch (error) {
    if (error instanceof MegaVaultAPIError) {
      handleAPIError(error);
    } else {
      handleNetworkError(error);
    }
    throw error;
  }
}

function handleAPIError(error) {
  switch (error.code) {
    case 'TOKEN_EXPIRED':
      // Refresh token and retry
      return refreshTokenAndRetry();
    
    case 'STORAGE_QUOTA_EXCEEDED':
      // Show upgrade prompt
      showUpgradeDialog(error.details.upgradeUrl);
      break;
    
    case 'VALIDATION_ERROR':
      // Show field-specific errors
      displayValidationErrors(error.details.fields);
      break;
    
    case 'RATE_LIMIT_EXCEEDED':
      // Implement exponential backoff
      const retryAfter = error.details.retryAfter || 60;
      scheduleRetry(retryAfter);
      break;
    
    default:
      // Generic error handling
      showErrorMessage(error.message);
  }
}`}
        </CodeBlock>

        <h3>Retry Logic</h3>
        <CodeBlock language="javascript" title="Retry Implementation">
{`async function retryableRequest(endpoint, options, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall(endpoint, options);
    } catch (error) {
      lastError = error;
      
      // Don't retry client errors (4xx) except 429
      if (error.statusCode >= 400 && error.statusCode < 500 && error.statusCode !== 429) {
        throw error;
      }
      
      // Calculate exponential backoff delay
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 30000);
      
      if (attempt < maxRetries) {
        console.log(\`Request failed, retrying in \${delay}ms (attempt \${attempt}/\${maxRetries})\`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}`}
        </CodeBlock>

        <h3>User-Friendly Messages</h3>
        <ul>
          <li><strong>Translate Technical Errors:</strong> Convert API error codes to user-friendly messages</li>
          <li><strong>Provide Context:</strong> Explain what the user can do to resolve the issue</li>
          <li><strong>Offer Solutions:</strong> Include links to help, upgrade pages, or support</li>
          <li><strong>Log Details:</strong> Log technical details for debugging while showing simple messages to users</li>
        </ul>
      </section>

      <section id="troubleshooting">
        <h2>Common Issues</h2>
        <p>Solutions to frequently encountered problems and error scenarios.</p>

        <h3>Authentication Issues</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Token Expired">
            <p className="text-sm text-slate-600 mb-2"><strong>Problem:</strong> API returns 401 with TOKEN_EXPIRED</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solution:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Use refresh token to get new access token</li>
              <li>Implement automatic token refresh</li>
              <li>Handle refresh failures gracefully</li>
            </ul>
          </Card>
          
          <Card title="Invalid Credentials">
            <p className="text-sm text-slate-600 mb-2"><strong>Problem:</strong> Login fails with INVALID_CREDENTIALS</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solution:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Verify email and password are correct</li>
              <li>Check for typos or case sensitivity</li>
              <li>Implement password reset flow</li>
            </ul>
          </Card>
        </div>

        <h3>File Upload Issues</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="File Too Large">
            <p className="text-sm text-slate-600 mb-2"><strong>Problem:</strong> Upload fails with FILE_TOO_LARGE</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solution:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Check file size against plan limits</li>
              <li>Implement chunked uploads for large files</li>
              <li>Compress files before upload</li>
            </ul>
          </Card>
          
          <Card title="Network Timeout">
            <p className="text-sm text-slate-600 mb-2"><strong>Problem:</strong> Upload times out on large files</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solution:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Increase request timeout</li>
              <li>Use resumable uploads</li>
              <li>Show progress indicators</li>
            </ul>
          </Card>
        </div>

        <h3>Rate Limiting</h3>
        <CodeBlock language="javascript" title="Rate Limit Handling">
{`function handleRateLimit(error) {
  const retryAfter = error.details.retryAfter || 60;
  const resetTime = new Date(Date.now() + retryAfter * 1000);
  
  console.log(\`Rate limited. Retry after: \${resetTime.toISOString()}\`);
  
  // Show user-friendly message
  showToast(\`Too many requests. Please wait \${retryAfter} seconds.\`);
  
  // Schedule retry
  setTimeout(() => {
    // Retry the failed request
    retryFailedRequest();
  }, retryAfter * 1000);
}`}
        </CodeBlock>

        <Alert type="warning" title="Request ID for Support">
          Always include the requestId from error responses when contacting support. 
          This helps identify and troubleshoot specific issues quickly.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/api" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">API Overview →</h4>
              <p className="text-blue-800 text-sm">General API documentation</p>
            </Link>
            <Link href="/docs/api/rate-limiting" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">Rate Limiting →</h4>
              <p className="text-green-800 text-sm">Understand API rate limits</p>
            </Link>
            <Link href="/docs/api/authentication" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Authentication →</h4>
              <p className="text-purple-800 text-sm">Authentication troubleshooting</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}