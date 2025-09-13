import { CodeBlock, Alert, TableOfContents, Card, ParameterTable } from '../../components/DocComponents';

const tableOfContents = [
  { id: 'overview', title: 'Overview' },
  { id: 'core-variables', title: 'Core Environment Variables' },
  { id: 'storage-config', title: 'Storage Configuration' },
  { id: 'storage-access', title: 'Storage Access Modes' },
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
    name: 'S3_ENDPOINT',
    type: 'string',
    required: true,
    description: 'S3-compatible storage endpoint URL',
    example: 'https://your-account-id.r2.cloudflarestorage.com'
  },
  {
    name: 'S3_ACCESS_KEY_ID',
    type: 'string',
    required: true,
    description: 'S3-compatible access key for API authentication',
    example: 'AKIAIOSFODNN7EXAMPLE'
  },
  {
    name: 'S3_SECRET_ACCESS_KEY',
    type: 'string',
    required: true,
    description: 'S3-compatible secret key for API authentication',
    example: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
  },
  {
    name: 'S3_BUCKET',
    type: 'string',
    required: true,
    description: 'Name of your storage bucket',
    example: 'megavault-storage'
  },
  {
    name: 'S3_REGION',
    type: 'string',
    required: false,
    description: 'Storage region (usually auto for Cloudflare R2)',
    example: 'auto'
  }
];

const storageAccessVariables = [
  {
    name: 'STORAGE_ACCESS_MODE',
    type: 'string',
    required: false,
    description: 'Controls storage access scope: "bucket" for complete access or "folder" for restricted access',
    example: 'bucket | folder (default: folder)'
  },
  {
    name: 'USER_STORAGE_FOLDER',
    type: 'string',
    required: false,
    description: 'Folder name for isolated storage when using folder mode',
    example: 'single-user-folder'
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
    <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
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

        <h3>S3-Compatible Storage Variables</h3>
        <ParameterTable parameters={storageVariables} />

        <h3>Setting Up Cloudflare R2 (Recommended)</h3>
        <ol>
          <li>Go to the <a href="https://dash.cloudflare.com/">Cloudflare Dashboard</a></li>
          <li>Navigate to R2 Object Storage</li>
          <li>Create a new bucket for MegaVault</li>
          <li>Go to "Manage R2 API tokens" and create a new token</li>
          <li>Grant the token "Object Read and Write" permissions</li>
          <li>Copy the Access Key, Secret Key, and construct the endpoint URL</li>
        </ol>

        <CodeBlock language="bash" title="Complete Configuration Example">
{`# ================================
# Storage Access Configuration
# ================================
# Choose between "bucket" (complete access) or "folder" (folder-specific access)
STORAGE_ACCESS_MODE=bucket
# USER_STORAGE_FOLDER=single-user-folder  # Only needed for folder mode

# ================================
# Storage Configuration (S3 Compatible)
# ================================
S3_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
S3_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
S3_BUCKET=megavault-storage
S3_REGION=auto`}
        </CodeBlock>

        <h3>Alternative S3 Services</h3>
        <p>You can also use other S3-compatible services:</p>
        <ul>
          <li><strong>AWS S3:</strong> Set region to your AWS region (e.g., us-east-1)</li>
          <li><strong>DigitalOcean Spaces:</strong> Use Spaces endpoint URL</li>
          <li><strong>MinIO:</strong> Self-hosted S3-compatible storage</li>
          <li><strong>Backblaze B2:</strong> Cost-effective cloud storage</li>
        </ul>

        <CodeBlock language="bash" title="Alternative Service Examples">
{`# AWS S3 Configuration
S3_ENDPOINT=https://s3.us-east-1.amazonaws.com
S3_ACCESS_KEY_ID=your-aws-access-key
S3_SECRET_ACCESS_KEY=your-aws-secret-key
S3_BUCKET=your-s3-bucket
S3_REGION=us-east-1

# MinIO Configuration
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY_ID=minioadmin
S3_SECRET_ACCESS_KEY=minioadmin
S3_BUCKET=megavault
S3_REGION=us-east-1`}
        </CodeBlock>
      </section>

      <section id="storage-access">
        <h2>Storage Access Modes</h2>
        <p>
          MegaVault supports configurable storage access modes to provide flexibility in how files 
          are organized and accessed within your storage bucket. This feature allows you to choose 
          between complete bucket access or isolated folder-based access.
        </p>

        <h3>Storage Access Variables</h3>
        <ParameterTable parameters={storageAccessVariables} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Bucket Mode" description="Complete access to the entire storage bucket">
            <CodeBlock language="bash">
{`# Complete bucket access
STORAGE_ACCESS_MODE=bucket
# USER_STORAGE_FOLDER not needed`}
            </CodeBlock>
            <p className="text-sm text-slate-600 mt-2">
              Files are stored directly at the bucket root level. Provides maximum flexibility 
              and is ideal for single-tenant deployments.
            </p>
          </Card>
          
          <Card title="Folder Mode" description="Restricted access to a specific folder">
            <CodeBlock language="bash">
{`# Folder-restricted access
STORAGE_ACCESS_MODE=folder
USER_STORAGE_FOLDER=single-user-folder`}
            </CodeBlock>
            <p className="text-sm text-slate-600 mt-2">
              Files are isolated within the specified folder. Provides better organization 
              and security for multi-tenant scenarios.
            </p>
          </Card>
        </div>

        <h3>Choosing the Right Mode</h3>
        <div className="not-prose">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-blue-900 mb-2">🪣 Bucket Mode (Recommended for Single User)</h4>
            <ul className="text-blue-800 space-y-1">
              <li>• Complete access to the entire storage bucket</li>
              <li>• Files stored at bucket root level</li>
              <li>• Maximum flexibility for file organization</li>
              <li>• Ideal for personal or single-tenant deployments</li>
              <li>• Easier migration from other storage systems</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">📁 Folder Mode (Recommended for Multi-User)</h4>
            <ul className="text-green-800 space-y-1">
              <li>• Files isolated within specified folder</li>
              <li>• Better organization and security</li>
              <li>• Prevents accidental access to other data</li>
              <li>• Ideal for shared storage buckets</li>
              <li>• Easier backup and data management</li>
            </ul>
          </div>
        </div>

        <Alert type="info" title="Default Configuration">
          If <code>STORAGE_ACCESS_MODE</code> is not specified, MegaVault defaults to <strong>folder mode</strong> 
          with <code>USER_STORAGE_FOLDER=single-user-folder</code>. This provides a safe default 
          that isolates your data within the bucket.
        </Alert>

        <h3>Storage Path Examples</h3>
        <CodeBlock language="text" title="File Organization Examples">
{`# Bucket Mode - Files stored at bucket root
bucket-name/
├── document.pdf
├── photos/
│   └── vacation.jpg
└── projects/
    └── code.zip

# Folder Mode - Files stored within user folder
bucket-name/
└── single-user-folder/
    ├── document.pdf
    ├── photos/
    │   └── vacation.jpg
    └── projects/
        └── code.zip`}
        </CodeBlock>

        <h3>Migration Between Modes</h3>
        <Alert type="warning" title="Mode Migration">
          Changing storage modes requires moving existing files to match the new structure. 
          Consider using cloud storage tools or scripts to migrate data when switching between modes.
        </Alert>

        <CodeBlock language="bash" title="Migration Example (AWS CLI)">
{`# Moving from bucket mode to folder mode
aws s3 cp s3://your-bucket/ s3://your-bucket/single-user-folder/ --recursive

# Moving from folder mode to bucket mode
aws s3 cp s3://your-bucket/single-user-folder/ s3://your-bucket/ --recursive`}
        </CodeBlock>
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

# Storage access mode for development
STORAGE_ACCESS_MODE=bucket  # Use bucket mode for easier development

# Enable development features
NEXT_PUBLIC_DEBUG=true
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Local Redis for development
REDIS_URL=redis://localhost:6379

# Development S3 settings (use test bucket)
S3_BUCKET=megavault-dev`}
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

# Storage access configuration
STORAGE_ACCESS_MODE=folder  # Use folder mode for better organization
USER_STORAGE_FOLDER=production-vault

# Production Redis
UPSTASH_REDIS_REST_URL=https://your-production-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-production-redis-token

# Production storage
S3_ENDPOINT=https://your-production-endpoint.com
S3_ACCESS_KEY_ID=your-production-access-key
S3_SECRET_ACCESS_KEY=your-production-secret-key
S3_BUCKET=megavault-production

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
  'S3_ENDPOINT',
  'S3_ACCESS_KEY_ID',
  'S3_SECRET_ACCESS_KEY',
  'S3_BUCKET'
];

// Optional storage access variables with defaults
const storageMode = process.env.STORAGE_ACCESS_MODE || 'folder';
const userFolder = process.env.USER_STORAGE_FOLDER || 'single-user-folder';

requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(\`Missing required environment variable: \${varName}\`);
  }
});

// Validate storage access mode
if (!['bucket', 'folder'].includes(storageMode)) {
  console.error('STORAGE_ACCESS_MODE must be either "bucket" or "folder"');
}

// Warn if folder mode but no folder specified
if (storageMode === 'folder' && !process.env.USER_STORAGE_FOLDER) {
  console.warn('Using default folder "single-user-folder" for folder mode');
}

console.log(\`Storage configured in \${storageMode} mode\`);
if (storageMode === 'folder') {
  console.log(\`Using folder: \${userFolder}\`);
}`}
        </CodeBlock>

        <Alert type="success" title="Configuration Complete">
          Once all environment variables are properly configured, start MegaVault and verify 
          the health endpoint responds correctly at <code>/api/health</code>.
        </Alert>
      </section>
    </div>
  );
}