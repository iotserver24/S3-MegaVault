import { Alert, Card, TableOfContents } from '../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-paths', title: 'Quick Start Paths' },
  { id: 'system-requirements', title: 'System Requirements' },
  { id: 'next-steps', title: 'Next Steps' },
];

export default function GettingStartedPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Getting Started with MegaVault</h1>
        <p className="text-xl text-slate-600">
          Everything you need to get MegaVault up and running in your environment.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Overview</h2>
        <p>
          MegaVault is a self-hosted cloud storage platform that gives you complete control over your data. 
          Whether you're looking for a personal file storage solution or planning to deploy for a team, 
          this guide will help you get started quickly and efficiently.
        </p>

        <Alert type="info" title="What You'll Learn">
          <ul className="mt-2 space-y-1">
            <li>How to install and configure MegaVault</li>
            <li>Different deployment options (Docker vs Manual)</li>
            <li>Environment setup and configuration</li>
            <li>Verification and troubleshooting steps</li>
          </ul>
        </Alert>
      </section>

      <section id="quick-paths">
        <h2>Quick Start Paths</h2>
        <p>
          Choose the installation method that best fits your needs and experience level:
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <Card 
            title="⚙️ Manual Installation" 
            description="Step-by-step installation for development and customization"
            className="border-2 border-green-200 bg-green-50"
          >
            <div className="space-y-3">
              <p className="text-sm text-slate-600">Best for: Developers, custom setups</p>
              <div className="flex flex-col space-y-2">
                <Link 
                  href="/docs/getting-started/installation"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-center justify-center"
                >
                  Manual Setup →
                </Link>
                <span className="text-xs text-slate-500 text-center">~30 minutes</span>
              </div>
            </div>
          </Card>

          <Card 
            title="🔧 CORS Configuration" 
            description="Configure storage provider CORS for large file uploads"
            className="border-2 border-orange-200 bg-orange-50"
          >
            <div className="space-y-3">
              <p className="text-sm text-slate-600">Required for: Files larger than 10MB</p>
              <div className="flex flex-col space-y-2">
                <Link 
                  href="/docs/getting-started/cors-setup"
                  className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-center justify-center"
                >
                  Configure CORS →
                </Link>
                <span className="text-xs text-slate-500 text-center">~5 minutes</span>
              </div>
            </div>
          </Card>
        </div>

        <Alert type="info" title="🐳 Docker Support Coming Soon">
          <p className="mt-2">
            Docker and Docker Compose support is currently being designed and will be available in a future release. 
            For now, please use the manual installation method.
          </p>
        </Alert>

        <Alert type="warning" title="Choose Your Path">
          We recommend starting with the Quick Start guide if you're new to MegaVault. 
          You can always switch to manual installation later for more control.
        </Alert>

        <Alert type="info" title="Important: CORS Configuration Required">
          <p className="mt-2">
            Before uploading files larger than 10MB, you must configure CORS settings on your storage bucket. 
            This enables multipart uploads to work properly. 
            <Link href="/docs/getting-started/cors-setup" className="font-medium underline hover:no-underline">
              Configure CORS now →
            </Link>
          </p>
        </Alert>
      </section>

      <section id="system-requirements">
        <h2>System Requirements</h2>
        <p>Before starting, ensure your system meets the minimum requirements:</p>

        <div className="not-prose">
          <div className="grid grid-cols-1 gap-6 my-6">
            <div className="border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Manual Setup Requirements</h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Node.js 18+ runtime</li>
                <li>✅ Redis server (local or remote)</li>
                <li>✅ S3-compatible storage service</li>
                <li>✅ 4GB RAM minimum</li>
                <li>✅ 20GB disk space minimum</li>
                <li>✅ Internet connection for initial setup</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>Supported Platforms</h3>
        <ul>
          <li><strong>Operating Systems:</strong> Linux, macOS, Windows 10/11</li>
          <li><strong>Cloud Providers:</strong> AWS, DigitalOcean, Linode, Vultr, self-hosted</li>
          <li><strong>Storage Services:</strong> Cloudflare R2, AWS S3, MinIO, DigitalOcean Spaces</li>
          <li><strong>Architectures:</strong> x86_64, ARM64</li>
        </ul>
      </section>

      <section id="next-steps">
        <h2>Next Steps</h2>
        <p>Ready to get started? Here's your roadmap:</p>

        <div className="not-prose">
          <div className="space-y-4 my-6">
            <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <h3 className="font-semibold text-slate-900">Choose Your Setup Method</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Pick between Quick Start (Docker) or Manual Installation based on your needs.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <h3 className="font-semibold text-slate-900">Configure Environment</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Set up your environment variables for storage, authentication, and other services.
                </p>
                <Link href="/docs/getting-started/environment" className="text-blue-600 hover:text-blue-800 text-sm">
                  Environment Guide →
                </Link>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <h3 className="font-semibold text-slate-900">Verify Installation</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Test your installation and ensure everything is working correctly.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
              <div>
                <h3 className="font-semibold text-slate-900">Explore Features</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Learn how to use MegaVault's features and set up the mobile app.
                </p>
                <Link href="/docs/user-guide" className="text-blue-600 hover:text-blue-800 text-sm">
                  User Guide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="not-prose mt-12">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Begin?</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Join thousands of users who have taken control of their data with MegaVault. 
              Get started in minutes with our streamlined setup process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/getting-started/quick-start"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
              >
                🚀 Start Quick Setup
              </Link>
              <Link
                href="/docs/getting-started/installation"
                className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 bg-white rounded-md hover:bg-slate-50 font-semibold"
              >
                ⚙️ Manual Installation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}