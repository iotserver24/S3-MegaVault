import { CodeBlock, Alert, StepGuide, TableOfContents, Card } from '../../components/DocComponents';

const tableOfContents = [
  { id: 'overview', title: 'Overview' },
  { id: 'system-requirements', title: 'System Requirements' },
  { id: 'manual-installation', title: 'Manual Installation' },
  { id: 'cors-configuration', title: '🔧 CORS Configuration (CRITICAL)' },
  { id: 'production-deployment', title: 'Production Deployment' },
  { id: 'verification', title: 'Installation Verification' },
];

// Docker installation steps removed - Docker support coming in future release

const manualSteps = [
  {
    title: 'Install Node.js and npm',
    description: 'Install Node.js 18 or higher and npm package manager.',
    code: `# Check Node.js version (must be 18+)
node --version
npm --version

# Install Node.js on Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install on Windows/macOS
# Download from https://nodejs.org/`,
    language: 'bash',
  },
  {
    title: 'Set Up Redis Database',
    description: 'Install and configure Redis for session storage and caching.',
    code: `# Install Redis locally
# Ubuntu/Debian:
sudo apt update
sudo apt install redis-server

# Start Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Or use Upstash Redis Cloud (recommended)
# Visit https://upstash.com/ to create a Redis database`,
    language: 'bash',
  },
  {
    title: 'Configure S3-Compatible Storage',
    description: 'Set up Cloudflare R2 or another S3-compatible storage service.',
    code: `# Cloudflare R2 Setup:
# 1. Go to https://dash.cloudflare.com/
# 2. Navigate to R2 Object Storage
# 3. Create a new bucket
# 4. Generate API tokens with R2 permissions
# 5. Note down: Account ID, Access Key, Secret Key, Bucket Name`,
    language: 'bash',
  },
  {
    title: 'Clone and Install Dependencies',
    description: 'Download MegaVault and install all required packages.',
    code: `git clone https://github.com/iotserver24/S3-MegaVault.git
cd S3-MegaVault

# Install dependencies
npm install

# Or use yarn
yarn install`,
    language: 'bash',
  },
  {
    title: 'Configure Environment Variables',
    description: 'Create and configure your local environment file.',
    code: `# Copy environment template
cp .env.example .env.local

# Edit the configuration file
# Add your Redis URL, S3 credentials, and other settings`,
    language: 'bash',
  },
  {
    title: '⚠️ Configure CORS (CRITICAL for Large Files)',
    description: 'Configure CORS on your storage bucket to enable multipart uploads for files >10MB.',
    code: `# Create cors.json file in project root
# This file is REQUIRED for large file uploads

# For S3-compatible services (S3, R2, DigitalOcean, etc.)
aws s3api put-bucket-cors \\
  --bucket YOUR_BUCKET_NAME \\
  --cors-configuration file://cors.json \\
  --endpoint-url YOUR_ENDPOINT_URL

# Without CORS, you'll get these errors:
# "Access to XMLHttpRequest blocked by CORS policy"
# "OPTIONS request 403 (Forbidden)"`,
    language: 'bash',
  },
  {
    title: 'Run Database Migrations (if applicable)',
    description: 'Set up the database schema and initial data.',
    code: `# Run any setup scripts
npm run setup

# Start the development server
npm run dev`,
    language: 'bash',
  },
];

export default function InstallationPage() {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Installation Guide</h1>
        <p className="text-xl text-slate-600">
          Complete instructions for installing MegaVault across different platforms and deployment scenarios.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Overview</h2>
        <p>
          MegaVault uses manual installation for development and production deployments. 
          Docker support is currently being designed and will be available in a future release.
        </p>

        <div className="grid grid-cols-1 gap-6 not-prose">
          <Card title="Manual Installation" description="Full control for development and customization">
            <ul className="text-sm space-y-1">
              <li>✅ Full development environment</li>
              <li>✅ Code modification and debugging</li>
              <li>✅ Custom configurations</li>
              <li>✅ Integration with existing systems</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="🐳 Docker Support Coming Soon">
          <p>
            Docker and Docker Compose support is currently being designed and will be available in a future release. 
            For now, please use the manual installation method below.
          </p>
        </Alert>

        <Alert type="error" title="⚠️ CRITICAL: CORS Configuration Required">
          <div className="space-y-4">
            <p className="font-semibold text-red-800 dark:text-red-200">
              You MUST configure CORS settings on your storage bucket before uploading files larger than 10MB!
            </p>
            <p className="text-red-700 dark:text-red-300">
              Without proper CORS configuration, you will encounter these errors:
            </p>
            <div className="bg-red-100 dark:bg-red-900/30 rounded p-3 text-sm">
              <p className="font-mono text-red-800 dark:text-red-200 mb-1">
                <strong>Error 1:</strong> "Access to fetch at '&lt;r2-url&gt;' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource."
              </p>
              <p className="font-mono text-red-800 dark:text-red-200 mb-1">
                <strong>Error 2:</strong> "Access to XMLHttpRequest blocked by CORS policy"
              </p>
              <p className="font-mono text-red-800 dark:text-red-200">
                <strong>Error 3:</strong> "OPTIONS request 403 (Forbidden)"
              </p>
            </div>
            <p className="text-red-700 dark:text-red-300 text-sm">
              <strong>Solution:</strong> Follow the detailed CORS configuration steps below for your specific storage provider.
            </p>
          </div>
        </Alert>
      </section>

      <section id="system-requirements">
        <h2>System Requirements</h2>
        
        <h3>Minimum Requirements</h3>
        <ul>
          <li><strong>CPU:</strong> 2 cores, 2.0 GHz</li>
          <li><strong>RAM:</strong> 4 GB minimum, 8 GB recommended</li>
          <li><strong>Storage:</strong> 20 GB free space</li>
          <li><strong>Network:</strong> Stable internet connection</li>
        </ul>

        <h3>Software Dependencies</h3>
        <ul>
          <li><strong>Node.js:</strong> Version 18.0 or higher</li>
          <li><strong>Redis:</strong> Version 6.0 or higher</li>
          <li><strong>Docker:</strong> Version 20.10+ (for Docker installation)</li>
          <li><strong>Git:</strong> For cloning the repository</li>
        </ul>

        <h3>Supported Operating Systems</h3>
        <ul>
          <li>Ubuntu 20.04 LTS or newer</li>
          <li>Debian 11 or newer</li>
          <li>CentOS/RHEL 8 or newer</li>
          <li>Windows 10/11 with WSL2</li>
          <li>macOS 10.15 or newer</li>
        </ul>
      </section>

      <section id="docker-installation">
        <h2>Docker Installation (Recommended)</h2>
        <p>
          Docker installation is the fastest and most reliable way to deploy MegaVault. 
          It handles all dependencies and provides a consistent environment.
        </p>

        <Alert type="info" title="Prerequisites">
          Ensure Docker and Docker Compose are installed on your system before proceeding.
        </Alert>

        <StepGuide steps={dockerSteps} />

        <Alert type="success" title="Docker Installation Complete">
          Your MegaVault instance should now be running at <code>http://localhost:3001</code>. 
          The initial setup may take a few minutes while Docker downloads and builds the images.
        </Alert>
      </section>

      <section id="manual-installation">
        <h2>Manual Installation</h2>
        <p>
          Manual installation gives you complete control over the deployment and is ideal for 
          development environments or when you need to integrate with existing infrastructure.
        </p>

        <Alert type="warning" title="Development Setup">
          Manual installation is primarily intended for development. For production deployments, 
          we strongly recommend using Docker for better security and maintainability.
        </Alert>

        <StepGuide steps={manualSteps} />

        <Alert type="info" title="Environment Configuration">
          Make sure to properly configure all environment variables in your <code>.env.local</code> file. 
          Refer to the Environment Configuration guide for detailed information about each variable.
        </Alert>
      </section>

      <section id="production-deployment">
        <h2>Production Deployment</h2>
        <p>
          For production deployments, additional considerations and configurations are required 
          to ensure security, performance, and reliability.
        </p>

        <h3>Security Checklist</h3>
        <ul>
          <li>Use HTTPS with valid SSL certificates</li>
          <li>Set strong, unique passwords for all accounts</li>
          <li>Configure proper firewall rules</li>
          <li>Enable Redis authentication</li>
          <li>Use environment-specific secrets</li>
          <li>Regular security updates</li>
        </ul>

        <h3>Performance Optimization</h3>
        <CodeBlock language="bash" title="Production Docker Compose">
{`# Use production environment
NODE_ENV=production

# Optimize container resources
services:
  megavault:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
    restart: unless-stopped`}
        </CodeBlock>

        <h3>Monitoring and Logging</h3>
        <ul>
          <li>Set up log aggregation (ELK stack, Grafana)</li>
          <li>Configure health checks and alerts</li>
          <li>Monitor disk usage and performance</li>
          <li>Set up backup procedures</li>
        </ul>
      </section>

      <section id="cors-configuration">
        <h2>🔧 CORS Configuration (CRITICAL)</h2>
        <p>
          Before uploading files larger than 10MB, you must configure CORS settings on your storage bucket. 
          This section provides detailed instructions for all supported storage providers.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
            📁 Create CORS Configuration File
          </h3>
          <p className="text-blue-800 dark:text-blue-300 text-sm mb-2">
            Create a file named <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">cors.json</code> in your project root:
          </p>
          <CodeBlock language="json">
{`[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag", "x-amz-version-id"],
    "MaxAgeSeconds": 3000
  }
]`}
          </CodeBlock>
        </div>

        <div className="space-y-8">
          {/* Amazon S3 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded text-sm mr-3">AWS</span>
              Amazon S3
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Method 1: AWS CLI (Recommended)</h4>
                <CodeBlock language="bash">
{`aws s3api put-bucket-cors \\
  --bucket YOUR_BUCKET_NAME \\
  --cors-configuration file://cors.json`}
                </CodeBlock>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Method 2: AWS Console</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>Go to <a href="https://s3.console.aws.amazon.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">AWS S3 Console</a></li>
                  <li>Select your bucket</li>
                  <li>Go to "Permissions" tab</li>
                  <li>Scroll to "Cross-origin resource sharing (CORS)"</li>
                  <li>Click "Edit" and paste the CORS configuration</li>
                  <li>Click "Save changes"</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Cloudflare R2 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded text-sm mr-3">CF</span>
              Cloudflare R2
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Method 1: AWS CLI with R2 Endpoint</h4>
                <CodeBlock language="bash">
{`aws s3api put-bucket-cors \\
  --bucket YOUR_BUCKET_NAME \\
  --cors-configuration file://cors.json \\
  --endpoint-url https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com`}
                </CodeBlock>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Method 2: Cloudflare Dashboard</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>Go to <a href="https://dash.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Cloudflare Dashboard</a></li>
                  <li>Navigate to <strong>R2 Object Storage</strong></li>
                  <li>Select your bucket</li>
                  <li>Go to "Settings" tab</li>
                  <li>Scroll to "CORS policy" section</li>
                  <li>Click "Add CORS policy"</li>
                  <li>Paste the CORS configuration in the JSON editor</li>
                  <li>Click "Save"</li>
                </ol>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  📖 <a href="https://developers.cloudflare.com/r2/buckets/cors/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Official R2 CORS Documentation</a>
                </p>
              </div>
            </div>
          </div>

          {/* Google Cloud Storage */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm mr-3">GCP</span>
              Google Cloud Storage
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Method 1: gsutil Command</h4>
                <CodeBlock language="bash">
{`gsutil cors set cors.json gs://YOUR_BUCKET_NAME`}
                </CodeBlock>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Method 2: Google Cloud Console</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
                  <li>Navigate to <strong>Cloud Storage</strong></li>
                  <li>Select your bucket</li>
                  <li>Click on "Permissions" tab</li>
                  <li>Scroll to "CORS configuration"</li>
                  <li>Click "Edit" and add the CORS rules</li>
                  <li>Click "Save"</li>
                </ol>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  📖 <a href="https://cloud.google.com/storage/docs/configuring-cors" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Official GCS CORS Documentation</a>
                </p>
              </div>
            </div>
          </div>

          {/* DigitalOcean Spaces */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm mr-3">DO</span>
              DigitalOcean Spaces
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Method 1: AWS CLI with Spaces Endpoint</h4>
                <CodeBlock language="bash">
{`aws s3api put-bucket-cors \\
  --bucket YOUR_BUCKET_NAME \\
  --cors-configuration file://cors.json \\
  --endpoint-url https://YOUR_REGION.digitaloceanspaces.com`}
                </CodeBlock>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Method 2: DigitalOcean Control Panel</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>Go to <a href="https://cloud.digitalocean.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">DigitalOcean Control Panel</a></li>
                  <li>Navigate to <strong>Spaces</strong></li>
                  <li>Select your Space</li>
                  <li>Go to "Settings" tab</li>
                  <li>Scroll to "CORS configuration"</li>
                  <li>Click "Add CORS rule"</li>
                  <li>Paste the CORS configuration</li>
                  <li>Click "Save"</li>
                </ol>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  📖 <a href="https://www.digitalocean.com/docs/spaces/how-to/enable-cors/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Official DO Spaces CORS Documentation</a>
                </p>
              </div>
            </div>
          </div>

          {/* MinIO */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm mr-3">MINIO</span>
              MinIO (Self-Hosted)
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Method 1: MinIO Client (mc) - Recommended</h4>
                <CodeBlock language="bash">
{`# Install MinIO Client
curl https://dl.min.io/client/mc/release/linux-amd64/mc -o mc
chmod +x mc && sudo mv mc /usr/local/bin/

# Configure MinIO alias
mc alias set myminio http://your-minio-server:9000 YOUR_ACCESS_KEY YOUR_SECRET_KEY

# Apply CORS configuration (uses cors-minio.json)
mc admin config set myminio/ cors-minio.json`}
                </CodeBlock>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Method 2: MinIO Console</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>Go to MinIO Console (usually <code>http://your-minio-server:9001</code>)</li>
                  <li>Navigate to your bucket</li>
                  <li>Go to "Settings" tab</li>
                  <li>Click on "CORS configuration"</li>
                  <li>Add the CORS rules</li>
                  <li>Click "Save"</li>
                </ol>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  📖 <a href="https://min.io/docs/minio/linux/operations/networking/cors.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Official MinIO CORS Documentation</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <Alert type="warning" title="Testing CORS Configuration">
          <div className="space-y-2">
            <p>After configuring CORS, test your setup:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Open browser developer tools (F12)</li>
              <li>Go to "Network" tab</li>
              <li>Attempt to upload a large file (&gt;10MB)</li>
              <li>Check for CORS errors in the console</li>
              <li>Verify upload completes successfully</li>
            </ol>
          </div>
        </Alert>
      </section>

      <section id="verification">
        <h2>Installation Verification</h2>
        <p>
          After installation, verify that MegaVault is working correctly with these checks:
        </p>

        <h3>Health Check</h3>
        <CodeBlock language="bash">
{`# Test API health endpoint
curl http://localhost:3001/api/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "redis": "connected",
    "storage": "accessible"
  }
}`}
        </CodeBlock>

        <h3>Web Interface Test</h3>
        <ol>
          <li>Open <code>http://localhost:3001</code> in your browser</li>
          <li>You should see the MegaVault login page</li>
          <li>Log in with your configured credentials</li>
          <li>Verify the dashboard loads correctly</li>
        </ol>

        <h3>File Upload Test</h3>
        <ol>
          <li>Navigate to the dashboard</li>
          <li>Try uploading a small test file</li>
          <li>Verify the file appears in your file list</li>
          <li>Test downloading the file</li>
        </ol>

        <Alert type="error" title="Troubleshooting">
          If you encounter issues, check the logs:
          <ul className="mt-2">
            <li><strong>Docker:</strong> <code>docker-compose logs -f</code></li>
            <li><strong>Manual:</strong> Check console output and <code>.next</code> folder permissions</li>
          </ul>
        </Alert>
      </section>
    </div>
  );
}