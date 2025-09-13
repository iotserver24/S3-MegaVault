import { Alert, Card, TableOfContents } from '../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Developer Overview' },
  { id: 'architecture', title: 'System Architecture' },
  { id: 'development', title: 'Development Setup' },
  { id: 'contributing', title: 'Contributing Guidelines' },
  { id: 'deployment', title: 'Deployment Options' },
];

export default function DeveloperPage() {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">MegaVault Developer Guide</h1>
        <p className="text-xl text-slate-600">
          Comprehensive guide for developers working on MegaVault, from architecture to deployment.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Developer Overview</h2>
        <p>
          Welcome to the MegaVault developer documentation! Whether you're contributing to the project, 
          customizing it for your needs, or integrating it with other systems, this guide provides 
          everything you need to understand and work with the MegaVault codebase.
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="border border-slate-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🏗️</div>
            <h3 className="font-semibold text-slate-900 mb-2">Modern Architecture</h3>
            <p className="text-sm text-slate-600">Next.js, React, TypeScript, and Flutter</p>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🔧</div>
            <h3 className="font-semibold text-slate-900 mb-2">Developer Friendly</h3>
            <p className="text-sm text-slate-600">Hot reload, TypeScript, and comprehensive docs</p>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="font-semibent text-slate-900 mb-2">Open Source</h3>
            <p className="text-sm text-slate-600">MIT licensed with active community</p>
          </div>
        </div>

        <Alert type="success" title="Quick Start for Developers">
          New to the codebase? Start with the Architecture overview to understand the system design, 
          then follow the Development Setup guide to get your environment ready for coding.
        </Alert>
      </section>

      <section id="architecture">
        <h2>System Architecture</h2>
        <p>
          MegaVault follows a modern, microservices-inspired architecture with clear separation of 
          concerns and well-defined interfaces between components.
        </p>

        <div className="not-prose my-6">
          <Card 
            title="🏛️ Architecture Deep Dive" 
            description="Understand the complete system design, patterns, and technical decisions"
            className="border-2 border-purple-200 bg-purple-50"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Core Components</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>✅ Next.js full-stack app</li>
                    <li>✅ Flutter mobile client</li>
                    <li>✅ S3-compatible storage</li>
                    <li>✅ Redis for caching</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Design Patterns</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>✅ MVC architecture</li>
                    <li>✅ Repository pattern</li>
                    <li>✅ Provider pattern</li>
                    <li>✅ RESTful API design</li>
                  </ul>
                </div>
              </div>
              <Link 
                href="/docs/developer/architecture"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
              >
                Architecture Guide →
              </Link>
            </div>
          </Card>
        </div>

        <h3>Technology Stack</h3>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-3">Frontend Technologies</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Framework</span>
                <span className="font-mono">Next.js 14.2+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">UI Library</span>
                <span className="font-mono">React 18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Styling</span>
                <span className="font-mono">Tailwind CSS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Language</span>
                <span className="font-mono">TypeScript</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-3">Backend Technologies</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Runtime</span>
                <span className="font-mono">Node.js 18+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Authentication</span>
                <span className="font-mono">NextAuth.js</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Storage</span>
                <span className="font-mono">S3 Compatible</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Caching</span>
                <span className="font-mono">Redis/Upstash</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="development">
        <h2>Development Setup</h2>
        <p>
          Get your development environment ready for contributing to MegaVault or customizing it for your needs.
        </p>

        <div className="not-prose space-y-6 my-8">
          <div className="border border-slate-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-xl">💻</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Local Development</h3>
                <p className="text-slate-600 mb-4">
                  Set up a complete development environment with hot reload, debugging, and all development tools.
                </p>
                <div className="bg-slate-900 rounded-md p-3 text-sm font-mono text-slate-100 mb-4">
                  <div># Clone and setup</div>
                  <div>git clone https://github.com/yourusername/megavault.git</div>
                  <div>cd megavault</div>
                  <div>npm install</div>
                  <div>cp .env.example .env.local</div>
                  <div>npm run dev</div>
                </div>
                <div className="text-sm text-slate-500">
                  Includes TypeScript checking, ESLint, and Prettier configuration
                </div>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-xl">🧪</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Testing & Quality</h3>
                <p className="text-slate-600 mb-4">
                  Comprehensive testing setup with unit tests, integration tests, and code quality tools.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>✅ Jest unit testing</div>
                  <div>✅ ESLint code quality</div>
                  <div>✅ Prettier formatting</div>
                  <div>✅ TypeScript checking</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 text-xl">📱</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Mobile Development</h3>
                <p className="text-slate-600 mb-4">
                  Flutter development environment for the mobile application with hot reload and debugging.
                </p>
                <div className="bg-slate-900 rounded-md p-3 text-sm font-mono text-slate-100 mb-4">
                  <div># Flutter setup</div>
                  <div>cd megavault_mobile</div>
                  <div>flutter pub get</div>
                  <div>flutter run</div>
                </div>
                <div className="text-sm text-slate-500">
                  Requires Flutter SDK and Android Studio/Xcode for development
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contributing">
        <h2>Contributing Guidelines</h2>
        <p>
          We welcome contributions from the community! Here's how to get involved and make meaningful contributions to MegaVault.
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">🤝 How to Contribute</h3>
            <ol className="text-sm text-green-800 space-y-2">
              <li>1. Fork the repository on GitHub</li>
              <li>2. Create a feature branch from main</li>
              <li>3. Make your changes with tests</li>
              <li>4. Ensure all tests pass</li>
              <li>5. Submit a pull request</li>
            </ol>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">📋 Contribution Areas</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Bug fixes and improvements</li>
              <li>• New features and enhancements</li>
              <li>• Documentation updates</li>
              <li>• Mobile app improvements</li>
              <li>• Performance optimizations</li>
            </ul>
          </div>
        </div>

        <Alert type="info" title="Code Standards">
          All contributions must follow our coding standards: TypeScript for type safety, ESLint for code quality, 
          comprehensive testing for new features, and clear documentation for public APIs.
        </Alert>
      </section>

      <section id="deployment">
        <h2>Deployment Options</h2>
        <p>
          MegaVault supports multiple deployment strategies, from simple single-server setups to 
          scalable cloud deployments.
        </p>

        <div className="not-prose grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
          <Card 
            title="🐳 Docker Deployment" 
            description="Containerized deployment with Docker Compose"
            className="border-2 border-blue-200"
          >
            <div className="space-y-3">
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✅ Easy setup and scaling</li>
                <li>✅ Consistent environments</li>
                <li>✅ Built-in orchestration</li>
                <li>✅ Volume persistence</li>
              </ul>
              <div className="bg-slate-100 rounded p-2 text-xs font-mono">
                docker-compose up -d
              </div>
            </div>
          </Card>

          <Card 
            title="☁️ Cloud Platforms" 
            description="Deploy to major cloud providers"
            className="border-2 border-green-200"
          >
            <div className="space-y-3">
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✅ Vercel (recommended)</li>
                <li>✅ Netlify deployment</li>
                <li>✅ AWS/GCP/Azure</li>
                <li>✅ Auto-scaling support</li>
              </ul>
              <div className="text-sm text-slate-500 italic">
                One-click deployments available
              </div>
            </div>
          </Card>

          <Card 
            title="🖥️ Self-Hosted" 
            description="Traditional server deployment"
            className="border-2 border-purple-200"
          >
            <div className="space-y-3">
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✅ Full control</li>
                <li>✅ Custom configurations</li>
                <li>✅ On-premise deployment</li>
                <li>✅ Air-gapped environments</li>
              </ul>
              <div className="text-sm text-slate-500 italic">
                Linux, Windows, macOS supported
              </div>
            </div>
          </Card>
        </div>

        <Alert type="warning" title="Production Considerations">
          For production deployments, ensure you have proper SSL certificates, regular backups, 
          monitoring systems, and security measures in place. Consider using a CDN for better performance.
        </Alert>
      </section>

      <div className="not-prose mt-12">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Join the MegaVault Community</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Whether you're fixing bugs, adding features, or improving documentation, every contribution 
              helps make MegaVault better for everyone. Join our growing community of developers!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/developer/architecture"
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 font-semibold"
              >
                🏗️ Explore Architecture
              </Link>
              <Link
                href="https://github.com/iotserver24/S3-MegaVault"
                className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 bg-white rounded-md hover:bg-slate-50 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                🐙 View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}