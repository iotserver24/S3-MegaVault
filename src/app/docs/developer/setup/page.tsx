import { Alert, TableOfContents, Card, CodeBlock, StepGuide } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Development Setup Overview' },
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'local-development', title: 'Local Development Environment' },
  { id: 'database-setup', title: 'Database Setup' },
  { id: 'storage-configuration', title: 'Storage Configuration' },
  { id: 'environment-variables', title: 'Environment Variables' },
  { id: 'running-locally', title: 'Running the Application' },
  { id: 'development-tools', title: 'Development Tools' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
];

const setupSteps = [
  {
    title: 'Clone Repository',
    description: 'Clone the MegaVault repository and navigate to the project directory.',
    code: `# Clone the repository
git clone https://github.com/iotserver24/S3-MegaVault.git
cd S3-MegaVault

# Check Node.js version (should be 18+ or 20+)
node --version
npm --version`,
    language: 'bash',
  },
  {
    title: 'Install Dependencies',
    description: 'Install all required Node.js dependencies using npm.',
    code: `# Install dependencies
npm install

# Or use yarn if preferred
yarn install

# Install development tools globally (optional)
npm install -g typescript@latest
npm install -g @next/codemod`,
    language: 'bash',
  },
  {
    title: 'Configure Environment',
    description: 'Set up environment variables for local development.',
    code: `# Copy environment template
cp .env.example .env.local

# Generate NextAuth secret
openssl rand -base64 32

# Edit .env.local with your editor
# Add the generated secret and other configuration`,
    language: 'bash',
  },
  {
    title: 'Setup Database',
    description: 'Configure Redis database for local development.',
    code: `# Option 1: Local Redis with Docker
docker run --name redis-dev -p 6379:6379 -d redis:alpine

# Option 2: Use Upstash Redis (cloud)
# Sign up at upstash.com and get connection string

# Test Redis connection
redis-cli ping
# Should return: PONG`,
    language: 'bash',
  },
];

export default function DevelopmentSetupPage() {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Development Setup</h1>
        <p className="text-xl text-slate-600">
          Complete guide to setting up a local development environment for MegaVault.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Development Setup Overview</h2>
        <p>
          This guide will walk you through setting up a complete development environment for MegaVault, 
          including all dependencies, databases, and development tools needed for productive development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Quick Setup" description="Get running in minutes">
            <ul className="text-sm space-y-1">
              <li>✅ Docker-based development</li>
              <li>✅ Hot reload enabled</li>
              <li>✅ Automatic dependency management</li>
              <li>✅ Pre-configured services</li>
            </ul>
          </Card>
          
          <Card title="Full Development Stack" description="Complete local environment">
            <ul className="text-sm space-y-1">
              <li>✅ Next.js development server</li>
              <li>✅ Redis database</li>
              <li>✅ S3-compatible storage</li>
              <li>✅ Development tools</li>
            </ul>
          </Card>

          <Card title="Developer Experience" description="Optimized for productivity">
            <ul className="text-sm space-y-1">
              <li>✅ TypeScript support</li>
              <li>✅ ESLint & Prettier</li>
              <li>✅ Hot module replacement</li>
              <li>✅ Debugging tools</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Development Philosophy">
          MegaVault development environment prioritizes:
          <ul className="mt-2">
            <li>Fast feedback loops with hot reload</li>
            <li>Type safety with TypeScript</li>
            <li>Code quality with automated linting</li>
            <li>Easy debugging and testing</li>
          </ul>
        </Alert>
      </section>

      <section id="prerequisites">
        <h2>Prerequisites</h2>
        <p>
          Before setting up the development environment, ensure you have the required tools and accounts.
        </p>

        <h3>Required Software</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Tool
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Minimum Version
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Recommended
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Node.js
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  18.0.0
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  20.x LTS
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  JavaScript runtime for Next.js
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  npm/yarn
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  8.0.0
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Latest
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Package management
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Git
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  2.0.0
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Latest
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Version control
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Docker (Optional)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  20.10.0
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  24.x
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Containerized services
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Development Tools (Recommended)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Code Editors">
            <ul className="text-sm space-y-1">
              <li><strong>VS Code:</strong> Recommended with TypeScript support</li>
              <li><strong>WebStorm:</strong> Full-featured IDE with debugging</li>
              <li><strong>Vim/Neovim:</strong> With TypeScript LSP</li>
              <li><strong>Sublime Text:</strong> With TypeScript package</li>
            </ul>
          </Card>
          
          <Card title="Browser Extensions">
            <ul className="text-sm space-y-1">
              <li><strong>React DevTools:</strong> React component debugging</li>
              <li><strong>Redux DevTools:</strong> State management debugging</li>
              <li><strong>Lighthouse:</strong> Performance auditing</li>
              <li><strong>CORS Unblock:</strong> For local API testing</li>
            </ul>
          </Card>
        </div>

        <h3>Required Accounts & Services</h3>
        <ul>
          <li><strong>GitHub Account:</strong> For repository access and contributions</li>
          <li><strong>Cloudflare Account:</strong> For R2 storage (or AWS for S3)</li>
          <li><strong>Upstash Account:</strong> For Redis database (or local Redis)</li>
          <li><strong>Email Service:</strong> SMTP for email notifications (optional)</li>
        </ul>
      </section>

      <section id="local-development">
        <h2>Local Development Environment</h2>
        <p>
          Follow these steps to set up your local development environment from scratch.
        </p>

        <h3>Step-by-Step Setup</h3>
        <StepGuide steps={setupSteps} />

        <h3>Development Workflow</h3>
        <ul>
          <li><strong>Hot Reload:</strong> Changes to code automatically refresh the browser</li>
          <li><strong>TypeScript Checking:</strong> Real-time type checking in your editor</li>
          <li><strong>ESLint Integration:</strong> Automatic code quality checks</li>
          <li><strong>Prettier Formatting:</strong> Consistent code formatting on save</li>
          <li><strong>Path Aliases:</strong> Simplified imports with @ prefix</li>
        </ul>

        <h3>Development Scripts</h3>
        <CodeBlock language="bash" title="Available npm Scripts">
{`# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Type check
npm run type-check

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch`}
        </CodeBlock>
      </section>

      <section id="database-setup">
        <h2>Database Setup</h2>
        <p>
          MegaVault uses Redis as its primary database. Set up Redis locally or use a cloud service.
        </p>

        <h3>Local Redis Setup</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Docker Redis (Recommended)">
            <CodeBlock language="bash">
{`# Start Redis container
docker run --name megavault-redis \\
  -p 6379:6379 \\
  -d redis:alpine

# Test connection
docker exec -it megavault-redis redis-cli ping`}
            </CodeBlock>
          </Card>
          
          <Card title="Local Redis Installation">
            <CodeBlock language="bash">
{`# macOS with Homebrew
brew install redis
brew services start redis

# Ubuntu/Debian
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server`}
            </CodeBlock>
          </Card>
        </div>

        <h3>Cloud Redis Setup</h3>
        <ol>
          <li><strong>Sign up for Upstash:</strong> Create account at <a href="https://upstash.com">upstash.com</a></li>
          <li><strong>Create Database:</strong> Create a new Redis database</li>
          <li><strong>Get Connection String:</strong> Copy the Redis URL from dashboard</li>
          <li><strong>Update Environment:</strong> Add Redis URL to your .env.local file</li>
        </ol>

        <h3>Database Schema</h3>
        <p>MegaVault uses Redis for:</p>
        <ul>
          <li><strong>Session Storage:</strong> User sessions and authentication tokens</li>
          <li><strong>File Metadata:</strong> File information and directory structure</li>
          <li><strong>User Data:</strong> User profiles and preferences</li>
          <li><strong>Caching:</strong> API response caching and temporary data</li>
          <li><strong>Upload Tracking:</strong> File upload progress and status</li>
        </ul>

        <CodeBlock language="javascript" title="Redis Data Structure Examples">
{`// User session
user:session:abc123 = {
  userId: "user_123",
  email: "user@example.com",
  expires: "2024-01-01T00:00:00Z"
}

// File metadata
file:user_123:path/to/file.txt = {
  id: "file_456",
  name: "file.txt",
  size: 1024,
  type: "text/plain",
  created: "2024-01-01T00:00:00Z",
  modified: "2024-01-01T00:00:00Z"
}

// Directory listing
dir:user_123:/documents = [
  "file_456",
  "file_789",
  "folder_abc"
]`}
        </CodeBlock>
      </section>

      <section id="storage-configuration">
        <h2>Storage Configuration</h2>
        <p>
          Configure S3-compatible storage for file uploads and retrieval during development.
        </p>

        <h3>Cloudflare R2 Setup</h3>
        <ol>
          <li><strong>Create R2 Account:</strong> Enable R2 in your Cloudflare dashboard</li>
          <li><strong>Create Bucket:</strong> Create a new R2 bucket for development</li>
          <li><strong>Generate API Tokens:</strong> Create API tokens with R2 permissions</li>
          <li><strong>Configure CORS:</strong> Set up CORS for web uploads</li>
        </ol>

        <CodeBlock language="json" title="R2 CORS Configuration">
{`[
  {
    "AllowedOrigins": ["http://localhost:3001"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 86400
  }
]`}
        </CodeBlock>

        <h3>Local Storage Alternative</h3>
        <p>For development without cloud storage, you can use MinIO locally:</p>

        <CodeBlock language="bash" title="MinIO Local Setup">
{`# Start MinIO server
docker run -p 9000:9000 -p 9001:9001 \\
  --name minio \\
  -e "MINIO_ROOT_USER=minioadmin" \\
  -e "MINIO_ROOT_PASSWORD=minioadmin" \\
  -v /tmp/minio:/data \\
  minio/minio server /data --console-address ":9001"

# Access MinIO console at http://localhost:9001
# Create bucket and configure access keys`}
        </CodeBlock>

        <h3>Storage Environment Variables</h3>
        <CodeBlock language="env" title="Storage Configuration">
{`# Cloudflare R2
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=megavault-dev
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com

# Or MinIO Local
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY_ID=minioadmin
S3_SECRET_ACCESS_KEY=minioadmin
S3_BUCKET_NAME=megavault-dev
S3_REGION=us-east-1`}
        </CodeBlock>
      </section>

      <section id="environment-variables">
        <h2>Environment Variables</h2>
        <p>
          Complete .env.local configuration for development.
        </p>

        <CodeBlock language="env" title="Complete .env.local Configuration">
{`# Application
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-here

# Redis Database
REDIS_URL=redis://localhost:6379

# Cloudflare R2 Storage
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=megavault-dev

# Development
NODE_ENV=development
PORT=3001`}
        </CodeBlock>
      </section>

      <section id="running-locally">
        <h2>Running the Application</h2>
        <p>
          Start the development server and verify everything works.
        </p>

        <CodeBlock language="bash" title="Start Development">
{`# Start the development server
npm run dev

# The application will be available at:
http://localhost:3001`}
        </CodeBlock>

        <h3>Verification Steps</h3>
        <ol>
          <li><strong>Open Browser:</strong> Navigate to http://localhost:3001</li>
          <li><strong>Test Registration:</strong> Create a test account</li>
          <li><strong>Upload Test:</strong> Try uploading a small file</li>
          <li><strong>Check Services:</strong> Verify Redis and storage connections</li>
        </ol>

        <Alert type="success" title="Development Ready!">
          Your development environment is now set up with hot reload, TypeScript, and all services connected.
        </Alert>
      </section>

      <section id="development-tools">
        <h2>Development Tools</h2>
        <p>
          Essential tools and utilities for productive development.
        </p>

        <h3>Recommended VS Code Extensions</h3>
        <ul>
          <li><strong>TypeScript Hero:</strong> Auto import and organize imports</li>
          <li><strong>ESLint:</strong> Real-time linting in editor</li>
          <li><strong>Prettier:</strong> Code formatting on save</li>
          <li><strong>Tailwind CSS IntelliSense:</strong> Tailwind class autocomplete</li>
          <li><strong>GitLens:</strong> Git integration and history</li>
        </ul>

        <CodeBlock language="bash" title="Useful Commands">
{`# Type checking
npm run type-check

# Linting and formatting
npm run lint
npm run format

# Build for production
npm run build`}
        </CodeBlock>
      </section>

      <section id="troubleshooting">
        <h2>Troubleshooting</h2>
        <p>
          Common development issues and their solutions.
        </p>

        <h3>Common Issues</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Port Already in Use">
            <CodeBlock language="bash">
{`# Kill process using port 3001
kill -9 $(lsof -ti:3001)

# Or use different port
PORT=3002 npm run dev`}
            </CodeBlock>
          </Card>
          
          <Card title="Module Not Found">
            <CodeBlock language="bash">
{`# Reinstall dependencies
rm -rf node_modules
npm install

# Clear Next.js cache
rm -rf .next`}
            </CodeBlock>
          </Card>
        </div>

        <Alert type="warning" title="Getting Help">
          If you encounter issues:
          <ul className="mt-2">
            <li>Check GitHub issues for similar problems</li>
            <li>Search the documentation</li>
            <li>Create a detailed issue report</li>
          </ul>
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/developer/architecture" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">System Architecture →</h4>
              <p className="text-blue-800 text-sm">Understand the system design</p>
            </Link>
            <Link href="/docs/developer/structure" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">Project Structure →</h4>
              <p className="text-green-800 text-sm">Learn the codebase organization</p>
            </Link>
            <Link href="/docs/developer/contributing" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Contributing Guide →</h4>
              <p className="text-purple-800 text-sm">How to contribute to the project</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}