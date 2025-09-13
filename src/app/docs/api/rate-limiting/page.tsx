import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Rate Limiting Overview' },
  { id: 'rate-limits', title: 'Rate Limit Tiers' },
  { id: 'headers', title: 'Rate Limit Headers' },
  { id: 'handling', title: 'Handling Rate Limits' },
  { id: 'best-practices', title: 'Best Practices' },
  { id: 'monitoring', title: 'Monitoring Usage' },
];

export default function RateLimitingAPIPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Rate Limiting</h1>
        <p className="text-xl text-slate-600">
          Understanding API rate limits, how to handle them gracefully, and best practices 
          for efficient API usage in MegaVault applications.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Rate Limiting Overview</h2>
        <p>
          MegaVault implements rate limiting to ensure fair usage, maintain system stability, 
          and provide consistent performance for all users. Rate limits vary by endpoint type and user plan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Fair Usage" description="Ensure equal access">
            <ul className="text-sm space-y-1">
              <li>✅ Prevents API abuse</li>
              <li>✅ Maintains service quality</li>
              <li>✅ Protects infrastructure</li>
              <li>✅ Equal access for all users</li>
            </ul>
          </Card>
          
          <Card title="Flexible Limits" description="Plan-based tiers">
            <ul className="text-sm space-y-1">
              <li>✅ Free plan limits</li>
              <li>✅ Pro plan increases</li>
              <li>✅ Enterprise customization</li>
              <li>✅ Endpoint-specific limits</li>
            </ul>
          </Card>

          <Card title="Developer Tools" description="Monitor and optimize">
            <ul className="text-sm space-y-1">
              <li>✅ Rate limit headers</li>
              <li>✅ Usage monitoring</li>
              <li>✅ Retry guidance</li>
              <li>✅ Optimization tips</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Rate Limiting Strategy">
          MegaVault uses a sliding window approach for rate limiting, providing more flexibility 
          than fixed-window systems while maintaining fairness and preventing abuse.
        </Alert>
      </section>

      <section id="rate-limits">
        <h2>Rate Limit Tiers</h2>
        <p>Rate limits vary based on your subscription plan and the type of operation.</p>

        <h3>Authentication Endpoints</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Endpoint</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Free Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Pro Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Enterprise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Window</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">/api/auth/signin</td>
                <td className="px-6 py-4 text-sm text-slate-600">5 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">10 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">20 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">1 minute</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">/api/auth/signup</td>
                <td className="px-6 py-4 text-sm text-slate-600">3 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">5 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">10 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">1 hour</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">/api/auth/refresh</td>
                <td className="px-6 py-4 text-sm text-slate-600">10 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">50 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">100 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">1 hour</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>File Operations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Operation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Free Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Pro Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Enterprise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Window</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">File Uploads</td>
                <td className="px-6 py-4 text-sm text-slate-600">10 uploads</td>
                <td className="px-6 py-4 text-sm text-slate-600">100 uploads</td>
                <td className="px-6 py-4 text-sm text-slate-600">1000 uploads</td>
                <td className="px-6 py-4 text-sm text-slate-600">1 hour</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">File Downloads</td>
                <td className="px-6 py-4 text-sm text-slate-600">50 downloads</td>
                <td className="px-6 py-4 text-sm text-slate-600">500 downloads</td>
                <td className="px-6 py-4 text-sm text-slate-600">Unlimited</td>
                <td className="px-6 py-4 text-sm text-slate-600">1 hour</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">File Listing</td>
                <td className="px-6 py-4 text-sm text-slate-600">100 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">1000 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">10000 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">1 hour</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">File Operations</td>
                <td className="px-6 py-4 text-sm text-slate-600">50 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">500 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">5000 requests</td>
                <td className="px-6 py-4 text-sm text-slate-600">1 hour</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>General API Endpoints</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Free Plan">
            <ul className="text-sm space-y-1">
              <li><strong>General API:</strong> 1,000 requests/hour</li>
              <li><strong>User Profile:</strong> 100 requests/hour</li>
              <li><strong>Usage Stats:</strong> 50 requests/hour</li>
              <li><strong>Mobile Sync:</strong> 200 requests/hour</li>
            </ul>
          </Card>
          
          <Card title="Pro Plan">
            <ul className="text-sm space-y-1">
              <li><strong>General API:</strong> 10,000 requests/hour</li>
              <li><strong>User Profile:</strong> 1,000 requests/hour</li>
              <li><strong>Usage Stats:</strong> 500 requests/hour</li>
              <li><strong>Mobile Sync:</strong> 2,000 requests/hour</li>
            </ul>
          </Card>

          <Card title="Enterprise">
            <ul className="text-sm space-y-1">
              <li><strong>General API:</strong> 100,000 requests/hour</li>
              <li><strong>User Profile:</strong> 10,000 requests/hour</li>
              <li><strong>Usage Stats:</strong> 5,000 requests/hour</li>
              <li><strong>Mobile Sync:</strong> 20,000 requests/hour</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="headers">
        <h2>Rate Limit Headers</h2>
        <p>Every API response includes headers with rate limit information for monitoring usage.</p>

        <CodeBlock language="http" title="Rate Limit Response Headers">
{`HTTP/1.1 200 OK
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 995
X-RateLimit-Reset: 1640995200
X-RateLimit-Window: 3600
X-RateLimit-Resource: general-api
Retry-After: 300

{
  "success": true,
  "data": { ... }
}`}
        </CodeBlock>

        <h3>Header Descriptions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Header</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Example</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">X-RateLimit-Limit</td>
                <td className="px-6 py-4 text-sm text-slate-600">Maximum requests allowed in the current window</td>
                <td className="px-6 py-4 text-sm text-slate-600">1000</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">X-RateLimit-Remaining</td>
                <td className="px-6 py-4 text-sm text-slate-600">Requests remaining in the current window</td>
                <td className="px-6 py-4 text-sm text-slate-600">995</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">X-RateLimit-Reset</td>
                <td className="px-6 py-4 text-sm text-slate-600">Unix timestamp when the window resets</td>
                <td className="px-6 py-4 text-sm text-slate-600">1640995200</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">X-RateLimit-Window</td>
                <td className="px-6 py-4 text-sm text-slate-600">Window duration in seconds</td>
                <td className="px-6 py-4 text-sm text-slate-600">3600</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">Retry-After</td>
                <td className="px-6 py-4 text-sm text-slate-600">Seconds to wait before retrying (429 responses only)</td>
                <td className="px-6 py-4 text-sm text-slate-600">300</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="handling">
        <h2>Handling Rate Limits</h2>
        <p>Best practices for detecting and responding to rate limit conditions.</p>

        <h3>Detecting Rate Limits</h3>
        <CodeBlock language="javascript" title="Rate Limit Detection">
{`function checkRateLimit(response) {
  const limit = parseInt(response.headers.get('X-RateLimit-Limit'));
  const remaining = parseInt(response.headers.get('X-RateLimit-Remaining'));
  const reset = parseInt(response.headers.get('X-RateLimit-Reset'));
  
  const usage = ((limit - remaining) / limit) * 100;
  
  // Warning at 80% usage
  if (usage >= 80) {
    console.warn(\`Rate limit warning: \${usage.toFixed(1)}% used\`);
    
    // Slow down requests when approaching limit
    if (usage >= 90) {
      const resetTime = new Date(reset * 1000);
      console.warn(\`Rate limit critical: Resets at \${resetTime.toISOString()}\`);
      return { shouldDelay: true, delayMs: 1000 };
    }
  }
  
  return { shouldDelay: false, delayMs: 0 };
}

async function makeRequest(url, options) {
  const response = await fetch(url, options);
  
  // Check rate limit headers
  const rateLimitInfo = checkRateLimit(response);
  if (rateLimitInfo.shouldDelay) {
    console.log(\`Delaying next request by \${rateLimitInfo.delayMs}ms\`);
    await new Promise(resolve => setTimeout(resolve, rateLimitInfo.delayMs));
  }
  
  // Handle 429 Too Many Requests
  if (response.status === 429) {
    const retryAfter = parseInt(response.headers.get('Retry-After')) || 60;
    throw new RateLimitError(\`Rate limited. Retry after \${retryAfter} seconds\`, retryAfter);
  }
  
  return response;
}`}
        </CodeBlock>

        <h3>Exponential Backoff</h3>
        <CodeBlock language="javascript" title="Exponential Backoff Implementation">
{`class RateLimitedClient {
  constructor(baseDelay = 1000, maxDelay = 30000, maxRetries = 5) {
    this.baseDelay = baseDelay;
    this.maxDelay = maxDelay;
    this.maxRetries = maxRetries;
  }
  
  async makeRequestWithBackoff(url, options, attempt = 1) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        if (attempt > this.maxRetries) {
          throw new Error('Max retries exceeded');
        }
        
        const retryAfter = parseInt(response.headers.get('Retry-After')) || 0;
        const backoffDelay = Math.min(
          this.baseDelay * Math.pow(2, attempt - 1),
          this.maxDelay
        );
        
        // Use the larger of retry-after or exponential backoff
        const delay = Math.max(retryAfter * 1000, backoffDelay);
        
        console.log(\`Rate limited. Retrying in \${delay}ms (attempt \${attempt})\`);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return this.makeRequestWithBackoff(url, options, attempt + 1);
      }
      
      return response;
    } catch (error) {
      if (attempt > this.maxRetries) {
        throw error;
      }
      
      const delay = Math.min(
        this.baseDelay * Math.pow(2, attempt - 1),
        this.maxDelay
      );
      
      console.log(\`Request failed. Retrying in \${delay}ms (attempt \${attempt})\`);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      return this.makeRequestWithBackoff(url, options, attempt + 1);
    }
  }
}`}
        </CodeBlock>

        <h3>Request Queuing</h3>
        <CodeBlock language="javascript" title="Request Queue Manager">
{`class RequestQueue {
  constructor(maxConcurrent = 5, requestsPerSecond = 10) {
    this.maxConcurrent = maxConcurrent;
    this.requestsPerSecond = requestsPerSecond;
    this.queue = [];
    this.active = 0;
    this.lastRequestTime = 0;
  }
  
  async enqueue(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFn, resolve, reject });
      this.processQueue();
    });
  }
  
  async processQueue() {
    if (this.active >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }
    
    // Rate limiting: ensure minimum time between requests
    const now = Date.now();
    const minInterval = 1000 / this.requestsPerSecond;
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < minInterval) {
      setTimeout(() => this.processQueue(), minInterval - timeSinceLastRequest);
      return;
    }
    
    const { requestFn, resolve, reject } = this.queue.shift();
    this.active++;
    this.lastRequestTime = Date.now();
    
    try {
      const result = await requestFn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.active--;
      // Process next item in queue
      setTimeout(() => this.processQueue(), 0);
    }
  }
}`}
        </CodeBlock>
      </section>

      <section id="best-practices">
        <h2>Best Practices</h2>
        <p>Recommendations for efficient API usage and rate limit management.</p>

        <h3>Optimization Strategies</h3>
        <ul>
          <li><strong>Batch Operations:</strong> Combine multiple operations into single requests when possible</li>
          <li><strong>Caching:</strong> Cache frequently accessed data to reduce API calls</li>
          <li><strong>Pagination:</strong> Use appropriate page sizes to balance performance and rate limits</li>
          <li><strong>Conditional Requests:</strong> Use ETags and If-Modified-Since headers to avoid unnecessary transfers</li>
          <li><strong>Background Processing:</strong> Move non-critical operations to background jobs</li>
        </ul>

        <h3>Monitoring Usage</h3>
        <CodeBlock language="javascript" title="Usage Monitoring">
{`class RateLimitMonitor {
  constructor() {
    this.usage = new Map();
    this.alerts = [];
  }
  
  recordRequest(endpoint, rateLimitHeaders) {
    const key = this.getEndpointKey(endpoint);
    const limit = parseInt(rateLimitHeaders['x-ratelimit-limit']);
    const remaining = parseInt(rateLimitHeaders['x-ratelimit-remaining']);
    const reset = parseInt(rateLimitHeaders['x-ratelimit-reset']);
    
    this.usage.set(key, {
      endpoint,
      limit,
      remaining,
      reset,
      usage: ((limit - remaining) / limit) * 100,
      timestamp: Date.now()
    });
    
    // Check for high usage
    if (remaining / limit < 0.1) { // Less than 10% remaining
      this.triggerAlert(key, 'HIGH_USAGE', \`Only \${remaining} requests remaining\`);
    }
  }
  
  getUsageReport() {
    const report = Array.from(this.usage.values()).map(usage => ({
      endpoint: usage.endpoint,
      usagePercentage: usage.usage.toFixed(1),
      remaining: usage.remaining,
      resetTime: new Date(usage.reset * 1000).toISOString()
    }));
    
    return report.sort((a, b) => b.usagePercentage - a.usagePercentage);
  }
  
  triggerAlert(key, type, message) {
    console.warn(\`Rate limit alert [\${type}]: \${message}\`);
    this.alerts.push({
      key,
      type,
      message,
      timestamp: Date.now()
    });
  }
}`}
        </CodeBlock>

        <h3>Application Architecture</h3>
        <ul>
          <li><strong>Request Queues:</strong> Implement request queuing to control API call frequency</li>
          <li><strong>Circuit Breakers:</strong> Use circuit breakers to handle rate limit failures gracefully</li>
          <li><strong>Local Caching:</strong> Cache API responses locally to reduce redundant calls</li>
          <li><strong>Lazy Loading:</strong> Load data on-demand rather than pre-fetching everything</li>
          <li><strong>Error Boundaries:</strong> Implement proper error handling for rate limit scenarios</li>
        </ul>
      </section>

      <section id="monitoring">
        <h2>Monitoring Usage</h2>
        <p>Track your API usage and optimize performance to stay within rate limits.</p>

        <h3>Usage Dashboard</h3>
        <CodeBlock language="http" title="Get Usage Statistics">
{`GET /api/users/usage/rate-limits
Authorization: Bearer YOUR_JWT_TOKEN`}
        </CodeBlock>

        <CodeBlock language="json" title="Usage Response">
{`{
  "success": true,
  "data": {
    "period": "current_hour",
    "endpoints": [
      {
        "endpoint": "/api/files",
        "limit": 1000,
        "used": 245,
        "remaining": 755,
        "usagePercentage": 24.5,
        "resetsAt": "2024-01-20T17:00:00Z"
      },
      {
        "endpoint": "/api/files/upload",
        "limit": 100,
        "used": 15,
        "remaining": 85,
        "usagePercentage": 15.0,
        "resetsAt": "2024-01-20T17:00:00Z"
      }
    ],
    "overallUsage": {
      "totalRequests": 260,
      "successfulRequests": 258,
      "rateLimitedRequests": 2,
      "successRate": 99.2
    }
  }
}`}
        </CodeBlock>

        <h3>Alerting</h3>
        <ul>
          <li><strong>Usage Alerts:</strong> Set up alerts when approaching rate limits (80%, 90%)</li>
          <li><strong>Error Monitoring:</strong> Monitor 429 responses and implement proper retry logic</li>
          <li><strong>Performance Tracking:</strong> Track API response times and success rates</li>
          <li><strong>Cost Optimization:</strong> Monitor API usage to optimize costs and performance</li>
        </ul>

        <Alert type="success" title="Optimization Tips">
          <ul className="mt-2">
            <li>Use webhooks instead of polling for real-time updates</li>
            <li>Implement client-side caching with appropriate TTLs</li>
            <li>Batch multiple operations when possible</li>
            <li>Use streaming APIs for large data transfers</li>
          </ul>
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/api/errors" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Error Handling →</h4>
              <p className="text-blue-800 text-sm">Handle rate limit errors properly</p>
            </Link>
            <Link href="/docs/api" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">API Overview →</h4>
              <p className="text-green-800 text-sm">General API documentation</p>
            </Link>
            <Link href="/docs/api/authentication" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Authentication →</h4>
              <p className="text-purple-800 text-sm">Authentication rate limits</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}