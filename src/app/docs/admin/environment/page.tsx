import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Environment Overview' },
  { id: 'core-variables', title: 'Core Variables' },
  { id: 'database-config', title: 'Database Configuration' },
  { id: 'storage-config', title: 'Storage Configuration' },
  { id: 'security-config', title: 'Security Configuration' },
  { id: 'monitoring-config', title: 'Monitoring Configuration' },
  { id: 'development-config', title: 'Development Configuration' },
  { id: 'deployment-environments', title: 'Deployment Environments' },
];

export default function EnvironmentVariablesPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Environment Variables</h1>
        <p className="text-xl text-slate-600">
          Complete reference for configuring MegaVault through environment variables across 
          development, staging, and production environments.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Environment Overview</h2>
        <p>
          MegaVault uses environment variables for configuration management, allowing secure 
          and flexible deployment across different environments without code changes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Configuration Management" description="Centralized settings">
            <ul className="text-sm space-y-1">
              <li>✅ Environment-specific configs</li>
              <li>✅ Secure secret management</li>
              <li>✅ Runtime configuration</li>
              <li>✅ Feature toggles</li>
            </ul>
          </Card>
          
          <Card title="Security Best Practices" description="Safe configuration">
            <ul className="text-sm space-y-1">
              <li>✅ No secrets in code</li>
              <li>✅ Environment isolation</li>
              <li>✅ Credential rotation</li>
              <li>✅ Access control</li>
            </ul>
          </Card>

          <Card title="Deployment Flexibility" description="Multi-environment support">
            <ul className="text-sm space-y-1">
              <li>✅ Development setup</li>
              <li>✅ Staging environment</li>
              <li>✅ Production deployment</li>
              <li>✅ Testing configurations</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Environment File Location">
          Environment variables can be set in <code>.env.local</code> for development or through your deployment platform's environment configuration.
        </Alert>
      </section>

      <section id="core-variables">
        <h2>Core Variables</h2>
        <p>Essential environment variables required for basic MegaVault operation.</p>

        <CodeBlock language="bash" title="Core Application Variables">
{`# Application Configuration
NODE_ENV=production                    # Environment mode: development, production, test
PORT=3000                             # Server port (default: 3000)
HOSTNAME=0.0.0.0                      # Server hostname
APP_URL=https://your-domain.com       # Full application URL

# Next.js Configuration
NEXTAUTH_URL=https://your-domain.com  # NextAuth.js callback URL
NEXTAUTH_SECRET=your-super-secure-secret-key-here-minimum-32-chars
NEXT_PUBLIC_APP_NAME="MegaVault"      # Public app name
NEXT_PUBLIC_APP_VERSION="1.0.0"      # Public app version`}
        </CodeBlock>

        <h3>Variable Descriptions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Variable</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Required</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">NODE_ENV</td>
                <td className="px-6 py-4 text-sm text-slate-600">Yes</td>
                <td className="px-6 py-4 text-sm text-slate-600">Sets application mode and enables/disables certain features</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">NEXTAUTH_SECRET</td>
                <td className="px-6 py-4 text-sm text-slate-600">Yes</td>
                <td className="px-6 py-4 text-sm text-slate-600">Secret key for JWT signing (minimum 32 characters)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">NEXTAUTH_URL</td>
                <td className="px-6 py-4 text-sm text-slate-600">Production</td>
                <td className="px-6 py-4 text-sm text-slate-600">Full URL for authentication callbacks</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">PORT</td>
                <td className="px-6 py-4 text-sm text-slate-600">No</td>
                <td className="px-6 py-4 text-sm text-slate-600">Server port number (defaults to 3000)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="database-config">
        <h2>Database Configuration</h2>
        <p>Redis database connection and performance settings for session storage and caching.</p>

        <CodeBlock language="bash" title="Redis Database Variables">
{`# Redis Configuration
REDIS_URL=redis://localhost:6379/0                    # Basic Redis connection
# OR for secured Redis with authentication:
REDIS_URL=rediss://username:password@host:port/0      # SSL Redis with auth

# Redis Connection Pool Settings
REDIS_MAX_RETRIES=3                   # Maximum retry attempts
REDIS_RETRY_DELAY=1000               # Retry delay in milliseconds
REDIS_CONNECT_TIMEOUT=10000          # Connection timeout in milliseconds
REDIS_COMMAND_TIMEOUT=5000           # Command timeout in milliseconds
REDIS_MAX_CONNECTIONS=10             # Maximum connection pool size

# Redis Performance Settings
REDIS_ENABLE_OFFLINE_QUEUE=false     # Disable offline queue for production
REDIS_LAZY_CONNECT=true              # Enable lazy connection
REDIS_KEEP_ALIVE=30000               # Keep-alive interval in milliseconds`}
        </CodeBlock>

        <h3>Redis URL Formats</h3>
        <ul>
          <li><strong>Local:</strong> <code>redis://localhost:6379/0</code></li>
          <li><strong>Password Auth:</strong> <code>redis://:password@host:6379/0</code></li>
          <li><strong>User Auth:</strong> <code>redis://username:password@host:6379/0</code></li>
          <li><strong>SSL/TLS:</strong> <code>rediss://username:password@host:6380/0</code></li>
          <li><strong>Redis Cloud:</strong> <code>rediss://username:password@endpoint:port/0</code></li>
        </ul>

        <Alert type="warning" title="Production Redis Security">
          Always use SSL/TLS (rediss://) and authentication for production Redis instances. 
          Never expose Redis directly to the internet.
        </Alert>
      </section>

      <section id="storage-config">
        <h2>Storage Configuration</h2>
        <p>Cloudflare R2 or S3-compatible storage configuration for file storage and management.</p>

        <CodeBlock language="bash" title="Storage Variables">
{`# Cloudflare R2 Configuration (Recommended)
R2_ACCOUNT_ID=your-cloudflare-account-id-here
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=megavault-storage
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://your-custom-domain.com     # Optional custom domain

# Alternative: AWS S3 Configuration
# AWS_REGION=us-east-1
# AWS_ACCESS_KEY_ID=your-aws-access-key
# AWS_SECRET_ACCESS_KEY=your-aws-secret-key
# AWS_S3_BUCKET=megavault-s3-bucket
# AWS_S3_ENDPOINT=https://s3.amazonaws.com        # Optional custom endpoint

# Storage Settings
# No file size limits - unlimited uploads
STORAGE_ALLOWED_TYPES=image/*,application/pdf,text/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document
STORAGE_ENABLE_THUMBNAILS=true       # Enable thumbnail generation
STORAGE_THUMBNAIL_SIZES=150,300,600  # Thumbnail sizes in pixels
STORAGE_CDN_URL=https://cdn.your-domain.com  # Optional CDN URL for faster delivery`}
        </CodeBlock>

        <h3>Storage Provider Setup</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Cloudflare R2 (Recommended)">
            <ul className="text-sm space-y-1">
              <li>1. Create Cloudflare account</li>
              <li>2. Enable R2 storage service</li>
              <li>3. Create storage bucket</li>
              <li>4. Generate API tokens</li>
              <li>5. Configure CORS policy</li>
              <li>6. Set custom domain (optional)</li>
            </ul>
          </Card>
          
          <Card title="AWS S3 Alternative">
            <ul className="text-sm space-y-1">
              <li>1. Create AWS account</li>
              <li>2. Create S3 bucket</li>
              <li>3. Create IAM user</li>
              <li>4. Attach S3 permissions</li>
              <li>5. Generate access keys</li>
              <li>6. Configure bucket policy</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="security-config">
        <h2>Security Configuration</h2>
        <p>Security-related environment variables for authentication, encryption, and access control.</p>

        <CodeBlock language="bash" title="Security Variables">
{`# Authentication Security
JWT_SECRET=your-jwt-secret-key-minimum-64-characters-for-security
JWT_EXPIRY=24h                        # JWT token expiration time
REFRESH_TOKEN_EXPIRY=7d               # Refresh token expiration time
SESSION_TIMEOUT=1h                    # User session timeout

# Password Security
BCRYPT_ROUNDS=12                      # Password hashing rounds (10-15 recommended)
PASSWORD_MIN_LENGTH=8                 # Minimum password length
PASSWORD_REQUIRE_SPECIAL=true         # Require special characters
PASSWORD_REQUIRE_NUMBERS=true         # Require numbers
PASSWORD_REQUIRE_UPPERCASE=true       # Require uppercase letters

# Rate Limiting
RATE_LIMIT_WINDOW=900000             # Rate limit window in milliseconds (15 minutes)
RATE_LIMIT_MAX=100                   # Maximum requests per window
RATE_LIMIT_AUTH_MAX=5                # Authentication attempts per window
RATE_LIMIT_UPLOAD_MAX=10             # File uploads per window

# CORS Configuration
CORS_ORIGIN=https://your-domain.com,https://www.your-domain.com
CORS_CREDENTIALS=true                 # Allow credentials in CORS
CORS_MAX_AGE=86400                   # CORS preflight cache time

# Content Security Policy
CSP_DEFAULT_SRC='self'               # Default source directive
CSP_SCRIPT_SRC='self' 'unsafe-inline' # Script source directive
CSP_STYLE_SRC='self' 'unsafe-inline' # Style source directive
CSP_IMG_SRC='self' data: https:      # Image source directive`}
        </CodeBlock>

        <h3>Security Best Practices</h3>
        <ul>
          <li><strong>Strong Secrets:</strong> Use cryptographically secure random strings for all secrets</li>
          <li><strong>Regular Rotation:</strong> Rotate API keys and secrets regularly</li>
          <li><strong>Environment Isolation:</strong> Use different secrets for each environment</li>
          <li><strong>Access Control:</strong> Limit who can access environment variables</li>
          <li><strong>Secure Storage:</strong> Use secure secret management services in production</li>
        </ul>
      </section>

      <section id="monitoring-config">
        <h2>Monitoring Configuration</h2>
        <p>Configure logging, metrics, and error tracking for system monitoring and debugging.</p>

        <CodeBlock language="bash" title="Monitoring Variables">
{`# Error Tracking (Sentry)
SENTRY_DSN=https://your-sentry-dsn-here@sentry.io/project-id
SENTRY_ENVIRONMENT=production         # Sentry environment name
SENTRY_RELEASE=1.0.0                 # Application release version
SENTRY_SAMPLE_RATE=1.0               # Error sampling rate (0.0 to 1.0)
SENTRY_TRACES_SAMPLE_RATE=0.1        # Performance monitoring sample rate

# Logging Configuration
LOG_LEVEL=info                       # Logging level: error, warn, info, debug
LOG_FORMAT=json                      # Log format: json, pretty
LOG_FILE_ENABLED=true                # Enable file logging
LOG_FILE_PATH=/var/log/megavault/app.log
LOG_MAX_SIZE=10M                     # Maximum log file size
LOG_MAX_FILES=5                      # Maximum number of log files

# Metrics and Analytics
METRICS_ENABLED=true                 # Enable metrics collection
METRICS_PORT=9090                    # Metrics endpoint port
ANALYTICS_ENABLED=true               # Enable user analytics
PERFORMANCE_MONITORING=true          # Enable performance monitoring

# Health Check Configuration
HEALTH_CHECK_ENABLED=true            # Enable health check endpoint
HEALTH_CHECK_PATH=/api/health        # Health check endpoint path
HEALTH_CHECK_INTERVAL=30000          # Health check interval in milliseconds`}
        </CodeBlock>

        <h3>Monitoring Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Error Tracking">
            <ul className="text-sm space-y-1">
              <li>Sentry for error monitoring</li>
              <li>Real-time error alerts</li>
              <li>Performance monitoring</li>
              <li>Release tracking</li>
            </ul>
          </Card>
          
          <Card title="Logging">
            <ul className="text-sm space-y-1">
              <li>Structured JSON logging</li>
              <li>Multiple log levels</li>
              <li>File rotation</li>
              <li>Remote log shipping</li>
            </ul>
          </Card>

          <Card title="Metrics">
            <ul className="text-sm space-y-1">
              <li>Application metrics</li>
              <li>Custom business metrics</li>
              <li>Performance indicators</li>
              <li>Health monitoring</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="development-config">
        <h2>Development Configuration</h2>
        <p>Environment variables specific to development and testing environments.</p>

        <CodeBlock language="bash" title="Development Variables">
{`# Development Mode Settings
NODE_ENV=development
DEBUG=megavault:*                    # Enable debug logging
HOT_RELOAD=true                      # Enable hot reloading
SOURCE_MAPS=true                     # Generate source maps

# Development Database
REDIS_URL=redis://localhost:6379/1   # Use different Redis database for dev

# Development Storage (can use local or test bucket)
R2_BUCKET_NAME=megavault-dev         # Development bucket
# No file size limits - unlimited uploads

# Development Security (less strict)
BCRYPT_ROUNDS=4                      # Faster hashing for development
RATE_LIMIT_MAX=1000                  # Higher rate limits for testing
JWT_EXPIRY=7d                        # Longer expiry for convenience

# Testing Configuration
JEST_TIMEOUT=30000                   # Jest test timeout
TEST_DATABASE_URL=redis://localhost:6379/2  # Separate test database
MOCK_STORAGE=true                    # Use mock storage in tests
DISABLE_RATE_LIMITING=true           # Disable rate limiting in tests

# Development Tools
DEVTOOLS_ENABLED=true                # Enable development tools
API_DOCS_ENABLED=true                # Enable API documentation
PLAYGROUND_ENABLED=true              # Enable API playground`}
        </CodeBlock>

        <h3>Development vs Production</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Setting</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Development</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Production</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">NODE_ENV</td>
                <td className="px-6 py-4 text-sm text-slate-600">development</td>
                <td className="px-6 py-4 text-sm text-slate-600">production</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">BCRYPT_ROUNDS</td>
                <td className="px-6 py-4 text-sm text-slate-600">4-6</td>
                <td className="px-6 py-4 text-sm text-slate-600">12-15</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">RATE_LIMIT_MAX</td>
                <td className="px-6 py-4 text-sm text-slate-600">1000</td>
                <td className="px-6 py-4 text-sm text-slate-600">100</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">LOG_LEVEL</td>
                <td className="px-6 py-4 text-sm text-slate-600">debug</td>
                <td className="px-6 py-4 text-sm text-slate-600">info</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="deployment-environments">
        <h2>Deployment Environments</h2>
        <p>Example environment configurations for different deployment scenarios.</p>

        <h3>Vercel Deployment</h3>
        <CodeBlock language="bash" title="Vercel Environment Variables">
{`# Set via Vercel Dashboard or Vercel CLI
vercel env add NODE_ENV production
vercel env add NEXTAUTH_URL https://your-app.vercel.app
vercel env add NEXTAUTH_SECRET your-secret-key
vercel env add REDIS_URL rediss://username:password@host:port/0
vercel env add R2_ACCOUNT_ID your-account-id
vercel env add R2_ACCESS_KEY_ID your-access-key
vercel env add R2_SECRET_ACCESS_KEY your-secret-key
vercel env add R2_BUCKET_NAME your-bucket-name`}
        </CodeBlock>

        <h3>Docker Environment</h3>
        <CodeBlock language="yaml" title="docker-compose.yml Environment">
{`version: '3.8'
services:
  megavault:
    image: megavault:latest
    environment:
      - NODE_ENV=production
      - PORT=3000
      - NEXTAUTH_URL=https://your-domain.com
      - NEXTAUTH_SECRET=\${NEXTAUTH_SECRET}
      - REDIS_URL=redis://redis:6379/0
      - R2_ACCOUNT_ID=\${R2_ACCOUNT_ID}
      - R2_ACCESS_KEY_ID=\${R2_ACCESS_KEY_ID}
      - R2_SECRET_ACCESS_KEY=\${R2_SECRET_ACCESS_KEY}
      - R2_BUCKET_NAME=\${R2_BUCKET_NAME}
    env_file:
      - .env.production
    ports:
      - "3000:3000"
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    command: redis-server --requirepass \${REDIS_PASSWORD}

volumes:
  redis_data:`}
        </CodeBlock>

        <h3>Environment File Templates</h3>
        <CodeBlock language="bash" title=".env.example">
{`# Copy this file to .env.local and fill in your values

# Core Configuration
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-minimum-32-characters

# Database
REDIS_URL=redis://localhost:6379/0

# Storage (Choose one)
# Cloudflare R2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_ENDPOINT=

# OR AWS S3
# AWS_REGION=
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_S3_BUCKET=

# Security
JWT_SECRET=your-jwt-secret-key-minimum-64-characters
BCRYPT_ROUNDS=12

# Optional: Monitoring
SENTRY_DSN=
LOG_LEVEL=info

# Optional: Custom Settings
# No file size limits - unlimited uploads
RATE_LIMIT_MAX=100`}
        </CodeBlock>

        <Alert type="info" title="Environment Validation">
          MegaVault validates required environment variables on startup and provides helpful error messages for missing or invalid configurations.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Administration Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/admin/storage" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Storage Configuration →</h4>
              <p className="text-blue-800 text-sm">Detailed storage setup and management</p>
            </Link>
            <Link href="/docs/admin/redis" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">Redis Setup →</h4>
              <p className="text-green-800 text-sm">Redis installation and configuration</p>
            </Link>
            <Link href="/docs/admin/monitoring" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Monitoring →</h4>
              <p className="text-purple-800 text-sm">System monitoring and alerting setup</p>
            </Link>
            <Link href="/docs/admin" className="block p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
              <h4 className="font-semibold text-orange-900 mb-2">← Back to Admin Overview</h4>
              <p className="text-orange-800 text-sm">System administration overview</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}