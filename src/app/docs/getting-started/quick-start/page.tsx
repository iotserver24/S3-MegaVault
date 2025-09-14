import { Alert, TableOfContents, Card, CodeBlock, StepGuide } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Quick Start Overview' },
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'quick-setup', title: '5-Minute Setup' },
  { id: 'first-upload', title: 'Your First Upload' },
  { id: 'mobile-setup', title: 'Mobile App Setup' },
  { id: 'next-steps', title: 'Next Steps' },
];

const quickSetupSteps = [
  {
    title: 'Download MegaVault',
    description: 'Get MegaVault from the official repository.',
    code: `git clone https://github.com/iotserver24/S3-MegaVault.git
cd S3-MegaVault
npm install`,
    language: 'bash',
  },
  {
    title: 'Configure Environment',
    description: 'Set up your environment variables for cloud storage and Redis.',
    code: `# Copy the environment template
cp .env.example .env.local

# Edit the configuration file (use your preferred editor)
nano .env.local

# Required settings:
NEXTAUTH_SECRET=your-secret-key-here
REDIS_URL=your-redis-connection-string
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=your-bucket-name`,
    language: 'bash',
  },
  {
    title: 'Configure CORS (Required for Large Files)',
    description: 'Set up CORS on your storage bucket to enable multipart uploads for files >10MB.',
    code: `# For S3-compatible services (S3, R2, DigitalOcean, etc.)
aws s3api put-bucket-cors \\
  --bucket YOUR_BUCKET_NAME \\
  --cors-configuration file://cors.json \\
  --endpoint-url YOUR_ENDPOINT_URL

# For Google Cloud Storage
gsutil cors set cors.json gs://YOUR_BUCKET_NAME

# See detailed instructions at:
# /docs/getting-started/cors-setup`,
    language: 'bash',
  },
  {
    title: 'Start MegaVault',
    description: 'Launch the application and access the web interface.',
    code: `# If using Docker
docker-compose up -d

# If using manual setup
npm run dev

# Access MegaVault at:
http://localhost:3001`,
    language: 'bash',
  },
  {
    title: 'Create Your Account',
    description: 'Sign up for your MegaVault account and verify email.',
    code: `# Navigate to the signup page
http://localhost:3001/auth/signup

# Fill in your details:
- Full Name
- Email Address
- Strong Password
- Confirm Password

# Check your email for verification link`,
    language: 'text',
  },
];

export default function QuickStartPage() {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Quick Start Guide</h1>
        <p className="text-xl text-slate-600">
          Get MegaVault up and running in minutes. This guide will take you from zero to uploading your first file.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Quick Start Overview</h2>
        <p>
          This quick start guide will get you up and running with MegaVault in under 10 minutes. 
          We'll cover the essential setup steps and get you uploading files right away.
        </p>

        <Alert type="info" title="🐳 Docker Support Coming Soon">
          <p>
            Docker and Docker Compose support is currently being designed and will be available in a future release. 
            For now, please use the manual installation method below.
          </p>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="⏱️ 5 Minutes" description="Basic setup and configuration">
            <ul className="text-sm space-y-1">
              <li>✅ Download and install</li>
              <li>✅ Configure environment</li>
              <li>✅ Start the application</li>
              <li>✅ Create your account</li>
            </ul>
          </Card>
          
          <Card title="📱 Mobile Ready" description="Get the mobile app working">
            <ul className="text-sm space-y-1">
              <li>✅ Download mobile app</li>
              <li>✅ Connect to your instance</li>
              <li>✅ Sync your first files</li>
              <li>✅ Enable background uploads</li>
            </ul>
          </Card>

          <Card title="🚀 Production Ready" description="Scale when you're ready">
            <ul className="text-sm space-y-1">
              <li>✅ HTTPS configuration</li>
              <li>✅ Database optimization</li>
              <li>✅ Performance tuning</li>
              <li>✅ Backup strategies</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="What You'll Need">
          Before starting, make sure you have:
          <ul className="mt-2">
            <li>A computer with Docker installed (recommended) or Node.js 18+</li>
            <li>A Cloudflare R2 account or other S3-compatible storage</li>
            <li>A Redis database (Upstash offers a free tier)</li>
            <li>About 10 minutes of your time</li>
          </ul>
        </Alert>
      </section>

      <section id="prerequisites">
        <h2>Prerequisites</h2>
        <p>
          Before diving into the setup, let's ensure you have everything needed for a smooth installation.
        </p>

        <h3>Required Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Cloud Storage (S3-Compatible)">
            <ul className="text-sm space-y-1">
              <li><strong>Cloudflare R2:</strong> Recommended, cost-effective</li>
              <li><strong>AWS S3:</strong> Enterprise-grade, widely supported</li>
              <li><strong>DigitalOcean Spaces:</strong> Developer-friendly</li>
              <li><strong>MinIO:</strong> Self-hosted option</li>
            </ul>
          </Card>
          
          <Card title="Redis Database">
            <ul className="text-sm space-y-1">
              <li><strong>Upstash:</strong> Serverless Redis, free tier available</li>
              <li><strong>Redis Cloud:</strong> Managed Redis service</li>
              <li><strong>Local Redis:</strong> Self-hosted for development</li>
              <li><strong>AWS ElastiCache:</strong> AWS managed Redis</li>
            </ul>
          </Card>
        </div>

        <h3>Development Environment</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Requirement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Minimum Version
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Recommended
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Installation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Docker
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  20.10
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  24.0+
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <a href="https://docker.com/get-started" className="text-blue-600">Get Docker</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Node.js
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  18.0
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  20.0+ LTS
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <a href="https://nodejs.org" className="text-blue-600">Get Node.js</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Git
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  2.0
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Latest
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <a href="https://git-scm.com" className="text-blue-600">Get Git</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Account Setup</h3>
        <ol>
          <li><strong>Cloudflare Account:</strong> Sign up at <a href="https://cloudflare.com">cloudflare.com</a></li>
          <li><strong>Create R2 Bucket:</strong> Go to R2 Object Storage and create a new bucket</li>
          <li><strong>Generate API Tokens:</strong> Create API tokens with R2 permissions</li>
          <li><strong>Redis Database:</strong> Set up a Redis instance (Upstash recommended for beginners)</li>
        </ol>
      </section>

      <section id="quick-setup">
        <h2>5-Minute Setup</h2>
        <p>
          Follow these steps to get MegaVault running quickly. This setup will get you a working 
          instance that you can start using immediately.
        </p>

        <StepGuide steps={quickSetupSteps} />

        <Alert type="success" title="Setup Complete!">
          🎉 Congratulations! MegaVault should now be running at <code>http://localhost:3001</code>
          <br />
          You can now log in with the account you created and start uploading files.
        </Alert>

        <h3>Verification Steps</h3>
        <ol>
          <li><strong>Access the Web Interface:</strong> Open <code>http://localhost:3001</code> in your browser</li>
          <li><strong>Login:</strong> Use the credentials you created during setup</li>
          <li><strong>Dashboard Check:</strong> Verify the dashboard loads without errors</li>
          <li><strong>Upload Test:</strong> Try uploading a small test file</li>
        </ol>

        <h3>Common Setup Issues</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Connection Issues">
            <ul className="text-sm space-y-1">
              <li><strong>Port Already in Use:</strong> Change port in docker-compose.yml</li>
              <li><strong>Permission Errors:</strong> Check Docker permissions</li>
              <li><strong>Network Issues:</strong> Verify firewall settings</li>
              <li><strong>DNS Problems:</strong> Try using 127.0.0.1 instead of localhost</li>
            </ul>
          </Card>
          
          <Card title="Configuration Issues">
            <ul className="text-sm space-y-1">
              <li><strong>Environment Variables:</strong> Check .env file formatting</li>
              <li><strong>Redis Connection:</strong> Verify Redis URL is correct</li>
              <li><strong>S3 Credentials:</strong> Double-check bucket name and keys</li>
              <li><strong>Permissions:</strong> Ensure S3 permissions are properly set</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="first-upload">
        <h2>Your First Upload</h2>
        <p>
          Now that MegaVault is running, let's upload your first file and explore the basic features.
        </p>

        <h3>Web Upload</h3>
        <ol>
          <li><strong>Navigate to Dashboard:</strong> Go to the main dashboard after logging in</li>
          <li><strong>Upload Area:</strong> Look for the drag-and-drop upload area</li>
          <li><strong>Choose Files:</strong> Drag files to the upload area or click to select</li>
          <li><strong>Monitor Progress:</strong> Watch the upload progress indicator</li>
          <li><strong>Verify Upload:</strong> Check that files appear in your file list</li>
        </ol>

        <h3>Upload Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Drag & Drop">
            <ul className="text-sm space-y-1">
              <li>Drag files from desktop</li>
              <li>Drop onto upload area</li>
              <li>Multiple files supported</li>
              <li>Folder uploads available</li>
            </ul>
          </Card>
          
          <Card title="File Browser">
            <ul className="text-sm space-y-1">
              <li>Click "Upload Files" button</li>
              <li>Browse and select files</li>
              <li>Multi-select with Ctrl/Cmd</li>
              <li>Filter by file type</li>
            </ul>
          </Card>

          <Card title="API Upload">
            <ul className="text-sm space-y-1">
              <li>RESTful API endpoints</li>
              <li>Programmatic uploads</li>
              <li>Batch operations</li>
              <li>Integration support</li>
            </ul>
          </Card>
        </div>

        <h3>File Management Basics</h3>
        <ul>
          <li><strong>View Files:</strong> Browse uploaded files in grid or list view</li>
          <li><strong>Preview:</strong> Click files to preview supported formats</li>
          <li><strong>Download:</strong> Right-click and select download</li>
          <li><strong>Share:</strong> Generate secure sharing links</li>
          <li><strong>Organize:</strong> Create folders and move files</li>
          <li><strong>Search:</strong> Use the search bar to find files quickly</li>
        </ul>

        <CodeBlock language="bash" title="Test Upload via API">
{`# Test API upload (optional)
curl -X POST http://localhost:3001/api/upload \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -F "file=@test-file.txt" \
  -F "folder=/"

# Expected response:
{
  "success": true,
  "file": {
    "id": "file_123",
    "name": "test-file.txt",
    "size": 1024,
    "url": "/api/files/file_123"
  }
}`}
        </CodeBlock>
      </section>

      <section id="mobile-setup">
        <h2>Mobile App Setup</h2>
        <p>
          Complete your MegaVault setup by installing and configuring the mobile app for 
          on-the-go file access and automatic photo backup.
        </p>

        <h3>Mobile App Installation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="iOS App">
            <ul className="text-sm space-y-1">
              <li><strong>Download:</strong> Get from the App Store</li>
              <li><strong>Requirements:</strong> iOS 12.0 or later</li>
              <li><strong>Size:</strong> ~50 MB download</li>
              <li><strong>Features:</strong> Full feature parity with web</li>
            </ul>
          </Card>
          
          <Card title="Android App">
            <ul className="text-sm space-y-1">
              <li><strong>Download:</strong> Get from Google Play Store</li>
              <li><strong>Requirements:</strong> Android 6.0+ (API 23)</li>
              <li><strong>Size:</strong> ~40 MB download</li>
              <li><strong>Features:</strong> Native Android integration</li>
            </ul>
          </Card>
        </div>

        <h3>Mobile App Configuration</h3>
        <ol>
          <li><strong>Server Setup:</strong> Enter your MegaVault server URL</li>
          <li><strong>Login:</strong> Use the same credentials from web setup</li>
          <li><strong>Permissions:</strong> Grant necessary permissions (storage, camera, notifications)</li>
          <li><strong>Sync Settings:</strong> Configure automatic photo backup</li>
          <li><strong>Test Upload:</strong> Take a photo and verify it uploads automatically</li>
        </ol>

        <h3>Essential Mobile Features</h3>
        <ul>
          <li><strong>Auto Photo Backup:</strong> Automatically backup new photos and videos</li>
          <li><strong>Offline Access:</strong> Download files for offline viewing</li>
          <li><strong>Background Uploads:</strong> Continue uploads when app is closed</li>
          <li><strong>Push Notifications:</strong> Get notified about uploads and shares</li>
          <li><strong>File Sharing:</strong> Share files directly from other apps</li>
        </ul>

        <Alert type="info" title="Mobile App Benefits">
          The mobile app provides:
          <ul className="mt-2">
            <li>Automatic backup of photos and videos</li>
            <li>Access to files anywhere, even offline</li>
            <li>Native sharing with other apps</li>
            <li>Push notifications for important events</li>
          </ul>
        </Alert>
      </section>

      <section id="next-steps">
        <h2>Next Steps</h2>
        <p>
          Now that you have MegaVault up and running, here are the next steps to get the most 
          out of your file storage solution.
        </p>

        <h3>Immediate Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Security Setup">
            <ul className="text-sm space-y-1">
              <li><strong>Enable HTTPS:</strong> Set up SSL certificates</li>
              <li><strong>Two-Factor Auth:</strong> Enable 2FA for your account</li>
              <li><strong>Backup Keys:</strong> Save your recovery keys safely</li>
              <li><strong>Regular Updates:</strong> Keep MegaVault updated</li>
            </ul>
          </Card>
          
          <Card title="Optimization">
            <ul className="text-sm space-y-1">
              <li><strong>Performance Tuning:</strong> Optimize for your usage</li>
              <li><strong>Storage Management:</strong> Set up cleanup policies</li>
              <li><strong>Monitoring:</strong> Set up health checks</li>
              <li><strong>Backup Strategy:</strong> Plan your backup approach</li>
            </ul>
          </Card>
        </div>

        <h3>Learning Resources</h3>
        <ul>
          <li><strong>User Guide:</strong> Comprehensive documentation for daily use</li>
          <li><strong>Admin Guide:</strong> Advanced configuration and management</li>
          <li><strong>API Documentation:</strong> Build integrations and automations</li>
          <li><strong>Community:</strong> Join the MegaVault community for support</li>
          <li><strong>Updates:</strong> Follow release notes for new features</li>
        </ul>

        <h3>Advanced Configuration</h3>
        <ul>
          <li><strong>Custom Domain:</strong> Set up your own domain name</li>
          <li><strong>Email Configuration:</strong> Configure SMTP for notifications</li>
          <li><strong>Integration Setup:</strong> Connect with other tools and services</li>
          <li><strong>Team Management:</strong> Set up user accounts and permissions</li>
          <li><strong>Automation:</strong> Create automated workflows and rules</li>
        </ul>

        <Alert type="success" title="You're All Set!">
          🚀 MegaVault is now ready for production use! You have:
          <ul className="mt-2">
            <li>A working MegaVault instance</li>
            <li>Secure file storage and sharing</li>
            <li>Mobile app connectivity</li>
            <li>Basic file management capabilities</li>
          </ul>
          Start exploring the full feature set and customize MegaVault to fit your needs.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Continue Learning</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/getting-started/installation" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Detailed Installation →</h4>
              <p className="text-blue-800 text-sm">Complete installation guide with all options</p>
            </Link>
            <Link href="/docs/user-guide/dashboard" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">User Guide →</h4>
              <p className="text-green-800 text-sm">Learn all the features and capabilities</p>
            </Link>
            <Link href="/docs/admin/environment" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">System Administration →</h4>
              <p className="text-purple-800 text-sm">Advanced configuration and management</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}