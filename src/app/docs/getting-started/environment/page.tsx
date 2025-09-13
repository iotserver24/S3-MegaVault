import { CodeBlock, Alert, TableOfContents, Card, ParameterTable } from '../../components/DocComponents';

const tableOfContents = [
  { id: 'overview', title: 'Overview' },
  { id: 'core-variables', title: 'Core Environment Variables' },
  { id: 'storage-config', title: 'Storage Configuration' },
  { id: 'auth-config', title: 'Authentication Settings' },
  { id: 'development-config', title: 'Development Configuration' },
  { id: 'production-config', title: 'Production Configuration' },
  { id: 'validation', title: 'Configuration Validation' },
];

const coreVariables = [
  {
    name: 'NODE_ENV',
    type: 'string',
    required: true,
    description: 'Application environment mode',
    example: 'production | development | test'
  },
  {
    name: 'NEXTAUTH_URL',
    type: 'string',
    required: true,
    description: 'Full URL where your application is hosted',
    example: 'https://yourdomain.com'
  },
  {
    name: 'NEXTAUTH_SECRET',
    type: 'string',
    required: true,
    description: 'Secret key for JWT token encryption (32+ characters)',
    example: 'your-super-secret-jwt-key-here-32-chars-min'
  },
  {
    name: 'USER_EMAIL',
    type: 'string',
    required: true,
    description: 'Admin user email for login',
    example: 'admin@yourdomain.com'
  },
  {
    name: 'USER_PASSWORD',
    type: 'string',
    required: true,
    description: 'Admin user password (minimum 8 characters)',
    example: 'SecurePassword123!'
  }
];

const storageVariables = [
  {
    name: 'CLOUDFLARE_R2_ACCOUNT_ID',
    type: 'string',
    required: true,
    description: 'Your Cloudflare account ID',
    example: '1234567890abcdef1234567890abcdef'
  },
  {
    name: 'CLOUDFLARE_R2_ACCESS_KEY_ID',
    type: 'string',
    required: true,
    description: 'R2 access key for API authentication',
    example: 'AKIAIOSFODNN7EXAMPLE'
  },
  {
    name: 'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
    type: 'string',
    required: true,
    description: 'R2 secret key for API authentication',
    example: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
  },
  {
    name: 'CLOUDFLARE_R2_BUCKET_NAME',
    type: 'string',
    required: true,
    description: 'Name of your R2 storage bucket',
    example: 'megavault-storage'
  },
  {
    name: 'CLOUDFLARE_R2_REGION',
    type: 'string',
    required: false,
    description: 'R2 region (usually auto for Cloudflare)',
    example: 'auto'
  }
];

const redisVariables = [
  {
    name: 'UPSTASH_REDIS_REST_URL',
    type: 'string',
    required: true,
    description: 'Upstash Redis REST API URL',
    example: 'https://your-redis-url.upstash.io'
  },
  {
    name: 'UPSTASH_REDIS_REST_TOKEN',
    type: 'string',
    required: true,
    description: 'Upstash Redis REST API token',
    example: 'your-redis-rest-token-here'
  },
  {
    name: 'REDIS_URL',
    type: 'string',
    required: false,
    description: 'Alternative Redis connection URL for local Redis',
    example: 'redis://localhost:6379'
  }
];

export default function EnvironmentPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Environment Configuration</h1>
        <p className="text-xl text-slate-600">
          Configure MegaVault with environment variables for different deployment scenarios and security requirements.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Overview</h2>
        <p>
          MegaVault uses environment variables to configure authentication, storage, database connections, 
          and other system settings. Proper configuration is essential for security and functionality.
        </p>

        <Alert type="info" title="Environment Files">
          MegaVault supports multiple environment files:
          <ul className="mt-2">
            <li><code>.env</code> - Default environment variables</li>
            <li><code>.env.local</code> - Local development overrides</li>
            <li><code>.env.production</code> - Production-specific settings</li>
            <li><code>.env.docker</code> - Docker deployment template</li>
          </ul>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Development Setup" description="Quick configuration for local development">
            <CodeBlock language="bash">
{`cp .env.example .env.local
# Edit .env.local with your settings`}
            </CodeBlock>
          </Card>
          
          <Card title="Production Setup" description="Secure configuration for production deployment">
            <CodeBlock language="bash">
{`cp .env.docker .env
# Configure production values
# Use strong passwords and secrets`}
            </CodeBlock>
          </Card>
        </div>
      </section>

      <section id="core-variables">
        <h2>Core Environment Variables</h2>
        <p>
          These variables are required for basic MegaVault functionality and must be configured 
          before starting the application.
        </p>

        <ParameterTable parameters={coreVariables} />

        <Alert type="warning" title="Security Notice">
          <strong>NEXTAUTH_SECRET</strong> must be a cryptographically secure random string of at least 32 characters. 
          Never use predictable values or share this secret publicly.
        </Alert>

        <h3>Example Core Configuration</h3>
        <CodeBlock language="bash" title=".env">
{`NODE_ENV=production
NEXTAUTH_URL=https://vault.yourdomain.com
NEXTAUTH_SECRET=your-super-secure-secret-key-minimum-32-characters
USER_EMAIL=admin@yourdomain.com
USER_PASSWORD=SecureAdminPassword123!`}
        </CodeBlock>
      </section>

      <section id="storage-config">
        <h2>Storage Configuration</h2>
        <p>
          MegaVault supports S3-compatible storage services. Cloudflare R2 is recommended for 
          its performance and cost-effectiveness, but any S3-compatible service will work.
        </p>

        <h3>Cloudflare R2 Variables</h3>
        <ParameterTable parameters={storageVariables} />

        <h3>Setting Up Cloudflare R2</h3>
        <ol>
          <li>Go to the <a href="https://dash.cloudflare.com/">Cloudflare Dashboard</a></li>
          <li>Navigate to R2 Object Storage</li>
          <li>Create a new bucket for MegaVault</li>
          <li>Go to "Manage R2 API tokens" and create a new token</li>
          <li>Grant the token "Object Read and Write" permissions</li>
          <li>Copy the Account ID, Access Key, and Secret Key</li>
        </ol>

        <CodeBlock language="bash" title="R2 Configuration Example">
{`CLOUDFLARE_R2_ACCOUNT_ID=1234567890abcdef1234567890abcdef
CLOUDFLARE_R2_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
CLOUDFLARE_R2_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
CLOUDFLARE_R2_BUCKET_NAME=megavault-storage
CLOUDFLARE_R2_REGION=auto`}
        </CodeBlock>

        <h3>Alternative S3 Services</h3>
        <p>You can also use other S3-compatible services:</p>
        <ul>
          <li><strong>AWS S3:</strong> Set region to your AWS region (e.g., us-east-1)</li>
          <li><strong>DigitalOcean Spaces:</strong> Use Spaces endpoint URL</li>
          <li><strong>MinIO:</strong> Self-hosted S3-compatible storage</li>
          <li><strong>Backblaze B2:</strong> Cost-effective cloud storage</li>
        </ul>
      </section>

      <section id="auth-config">
        <h2>Authentication Settings</h2>
        <p>
          Configure Redis for session storage and caching. MegaVault supports both 
          Upstash Redis (cloud) and local Redis instances.
        </p>

        <h3>Redis Configuration Variables</h3>
        <ParameterTable parameters={redisVariables} />

        <h3>Upstash Redis Setup (Recommended)</h3>
        <ol>
          <li>Go to <a href="https://upstash.com/">Upstash Console</a></li>
          <li>Create a new Redis database</li>
          <li>Choose a region close to your deployment</li>
          <li>Copy the REST URL and Token from the database details</li>
        </ol>

        <CodeBlock language="bash" title="Redis Configuration">
{`# Upstash Redis (Cloud - Recommended)
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-rest-token-here

# OR Local Redis (Development)
REDIS_URL=redis://localhost:6379`}
        </CodeBlock>

        <Alert type="info" title="Redis Usage">
          MegaVault uses Redis for:
          <ul className="mt-2">
            <li>User session storage</li>
            <li>File upload progress tracking</li>
            <li>Temporary data caching</li>
            <li>API rate limiting</li>
          </ul>
        </Alert>
      </section>

      <section id="development-config">
        <h2>Development Configuration</h2>
        <p>
          Additional settings for development environments to enable debugging, 
          hot reloading, and development tools.
        </p>

        <CodeBlock language="bash" title=".env.local (Development)">
{`# Development mode
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000

# Development credentials (change these!)
USER_EMAIL=dev@localhost
USER_PASSWORD=dev123456

# Enable development features
NEXT_PUBLIC_DEBUG=true
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Local Redis for development
REDIS_URL=redis://localhost:6379

# Development R2 settings (use test bucket)
CLOUDFLARE_R2_BUCKET_NAME=megavault-dev`}
        </CodeBlock>

        <Alert type="warning" title="Development Security">
          Never use development credentials or settings in production. 
          Always use strong, unique passwords and secrets for production deployments.
        </Alert>
      </section>

      <section id="production-config">
        <h2>Production Configuration</h2>
        <p>
          Production environments require additional security measures and performance optimizations.
        </p>

        <CodeBlock language="bash" title=".env (Production)">
{`# Production mode
NODE_ENV=production
NEXTAUTH_URL=https://vault.yourdomain.com

# Strong production credentials
USER_EMAIL=admin@yourdomain.com
USER_PASSWORD=StrongProductionPassword123!
NEXTAUTH_SECRET=your-cryptographically-secure-secret-key-minimum-32-characters

# Production Redis
UPSTASH_REDIS_REST_URL=https://your-production-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-production-redis-token

# Production storage
CLOUDFLARE_R2_ACCOUNT_ID=your-production-account-id
CLOUDFLARE_R2_ACCESS_KEY_ID=your-production-access-key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-production-secret-key
CLOUDFLARE_R2_BUCKET_NAME=megavault-production

# Performance optimizations
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_MAX_FILE_SIZE=100000000`}
        </CodeBlock>

        <h3>Production Security Checklist</h3>
        <ul>
          <li>✅ Use HTTPS with valid SSL certificates</li>
          <li>✅ Generate secure random NEXTAUTH_SECRET</li>
          <li>✅ Use strong, unique passwords</li>
          <li>✅ Restrict file permissions on .env files</li>
          <li>✅ Enable Redis authentication</li>
          <li>✅ Configure proper CORS settings</li>
          <li>✅ Set up monitoring and logging</li>
        </ul>
      </section>

      <section id="validation">
        <h2>Configuration Validation</h2>
        <p>
          Verify your configuration is correct before deploying MegaVault.
        </p>

        <h3>Environment Validation Script</h3>
        <CodeBlock language="bash">
{`# Check required environment variables
npm run validate-env

# Test Redis connection
npm run test-redis

# Test storage connection
npm run test-storage`}
        </CodeBlock>

        <h3>Manual Validation</h3>
        <CodeBlock language="javascript" title="validate-config.js">
{`// Basic environment validation
const requiredVars = [
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'USER_EMAIL',
  'USER_PASSWORD',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
  'CLOUDFLARE_R2_ACCOUNT_ID',
  'CLOUDFLARE_R2_ACCESS_KEY_ID',
  'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
  'CLOUDFLARE_R2_BUCKET_NAME'
];

requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(\`Missing required environment variable: \${varName}\`);
  }
});`}
        </CodeBlock>

        <Alert type="success" title="Configuration Complete">
          Once all environment variables are properly configured, start MegaVault and verify 
          the health endpoint responds correctly at <code>/api/health</code>.
        </Alert>
      </section>
    </div>
  );
}