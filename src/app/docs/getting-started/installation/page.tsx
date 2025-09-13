import { CodeBlock, Alert, StepGuide, TableOfContents, Card } from '../../components/DocComponents';

const tableOfContents = [
  { id: 'overview', title: 'Overview' },
  { id: 'system-requirements', title: 'System Requirements' },
  { id: 'docker-installation', title: 'Docker Installation' },
  { id: 'manual-installation', title: 'Manual Installation' },
  { id: 'production-deployment', title: 'Production Deployment' },
  { id: 'verification', title: 'Installation Verification' },
];

const dockerSteps = [
  {
    title: 'Install Docker & Docker Compose',
    description: 'Ensure Docker and Docker Compose are installed on your system.',
    code: `# Check Docker installation
docker --version
docker-compose --version

# Install on Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose

# Install on Windows
# Download Docker Desktop from https://docker.com/products/docker-desktop`,
    language: 'bash',
  },
  {
    title: 'Clone MegaVault Repository',
    description: 'Download the MegaVault source code from GitHub.',
    code: `git clone https://github.com/iotserver24/S3-MegaVault.git
cd S3-MegaVault`,
    language: 'bash',
  },
  {
    title: 'Configure Environment Variables',
    description: 'Set up your environment configuration for Docker deployment.',
    code: `# Copy the Docker environment template
cp .env.docker .env

# Edit environment variables
# Windows: notepad .env
# Linux/macOS: nano .env`,
    language: 'bash',
  },
  {
    title: 'Build and Start Services',
    description: 'Build the Docker images and start all services.',
    code: `# Build and start in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down`,
    language: 'bash',
  },
];

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
          MegaVault can be installed using two primary methods: Docker (recommended for production) 
          and manual installation (ideal for development). This guide covers both approaches in detail.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Docker Installation" description="Fast, reliable, production-ready deployment">
            <ul className="text-sm space-y-1">
              <li>✅ All dependencies included</li>
              <li>✅ Consistent across environments</li>
              <li>✅ Easy updates and rollbacks</li>
              <li>✅ Production-ready configuration</li>
            </ul>
          </Card>
          
          <Card title="Manual Installation" description="Full control for development and customization">
            <ul className="text-sm space-y-1">
              <li>✅ Full development environment</li>
              <li>✅ Code modification and debugging</li>
              <li>✅ Custom configurations</li>
              <li>✅ Integration with existing systems</li>
            </ul>
          </Card>
        </div>
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