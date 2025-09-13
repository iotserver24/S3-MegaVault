import Link from 'next/link';
import { 
  BookOpenIcon,
  CommandLineIcon,
  DevicePhoneMobileIcon,
  CogIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  ServerIcon,
  CloudIcon,
  LockClosedIcon,
  WrenchScrewdriverIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

const navigationCards = [
  {
    title: 'Getting Started',
    description: 'Quick setup guide, installation instructions, and environment configuration',
    href: '/docs/getting-started',
    icon: RocketLaunchIcon,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'User Guide',
    description: 'Complete guide to using MegaVault dashboard, file management, and sharing',
    href: '/docs/user-guide',
    icon: BookOpenIcon,
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Mobile Application',
    description: 'Flutter mobile app coming soon - currently in development',
    href: '/docs/mobile',
    icon: DevicePhoneMobileIcon,
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Developer Guide',
    description: 'Project architecture, development setup, and contribution guidelines',
    href: '/docs/developer',
    icon: CodeBracketIcon,
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    title: 'API Reference',
    description: 'Complete API documentation with endpoints, authentication, and examples',
    href: '/docs/api',
    icon: CommandLineIcon,
    color: 'from-red-500 to-red-600',
  },
  {
    title: 'System Administration',
    description: 'Environment variables, storage configuration, and deployment guides',
    href: '/docs/admin',
    icon: CogIcon,
    color: 'from-indigo-500 to-indigo-600',
  },
];

const features = [
  {
    title: 'Self-Hosted Cloud Storage',
    description: 'Complete control over your data with S3-compatible storage backends',
    icon: CloudIcon,
  },
  {
    title: 'Modern Architecture',
    description: 'Built with Next.js 14, React 18, TypeScript, and Flutter for mobile',
    icon: ServerIcon,
  },
  {
    title: 'Secure by Design',
    description: 'JWT authentication, signed URLs, and environment-based configuration',
    icon: LockClosedIcon,
  },
  {
    title: 'Developer Friendly',
    description: 'RESTful APIs, comprehensive documentation, and Docker deployment',
    icon: WrenchScrewdriverIcon,
  },
];

export default function DocsHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-xl font-bold text-slate-900">MegaVault</span>
              </Link>
              <div className="hidden sm:block w-px h-6 bg-slate-300" />
              <span className="hidden sm:block text-slate-600 font-medium">Documentation</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-slate-600 hover:text-slate-900 font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="https://github.com/yourusername/megavault-open-source"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              MegaVault Documentation
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Complete guide to setting up, using, and developing with MegaVault - 
              the open-source cloud storage platform built for developers and teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/getting-started"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <RocketLaunchIcon className="w-5 h-5 mr-2" />
                Quick Start Guide
              </Link>
              <Link
                href="/docs/api"
                className="inline-flex items-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50"
              >
                <CommandLineIcon className="w-5 h-5 mr-2" />
                API Reference
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose MegaVault?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A modern, secure, and developer-friendly cloud storage solution with complete data ownership.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Explore the Documentation
            </h2>
            <p className="text-lg text-slate-600">
              Find exactly what you need with our comprehensive guides and references.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600">
                      {card.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-b-xl" 
                     style={{ backgroundImage: `linear-gradient(to right, ${card.color.split(' ')[1]}, ${card.color.split(' ')[3]})` }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              System Architecture
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              MegaVault follows a modern microservices-inspired architecture with Next.js full-stack web application and Flutter mobile app.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-lg p-4 mb-4">
                  <GlobeAltIcon className="w-8 h-8 text-blue-600 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Frontend</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>Next.js 14 with React 18</li>
                  <li>TypeScript for type safety</li>
                  <li>Tailwind CSS for styling</li>
                  <li>React Three Fiber for 3D</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-lg p-4 mb-4">
                  <ServerIcon className="w-8 h-8 text-green-600 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Backend</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>Next.js API routes</li>
                  <li>JWT & NextAuth authentication</li>
                  <li>Upstash Redis for data</li>
                  <li>RESTful API design</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-lg p-4 mb-4">
                  <CloudIcon className="w-8 h-8 text-purple-600 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Storage</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>S3-compatible storage</li>
                  <li>Cloudflare R2 support</li>
                  <li>Signed URLs for security</li>
                  <li>Flutter mobile app</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Footer */}
      <div className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Getting Started</h3>
              <ul className="space-y-2">
                <li><Link href="/docs/getting-started/quick-start" className="text-slate-300 hover:text-white">Quick Start</Link></li>
                <li><Link href="/docs/getting-started/installation" className="text-slate-300 hover:text-white">Installation</Link></li>
                <li><Link href="/docs/getting-started/environment" className="text-slate-300 hover:text-white">Environment Setup</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">User Guide</h3>
              <ul className="space-y-2">
                <li><Link href="/docs/user-guide/dashboard" className="text-slate-300 hover:text-white">Dashboard</Link></li>
                <li><Link href="/docs/user-guide/file-management" className="text-slate-300 hover:text-white">File Management</Link></li>
                <li><Link href="/docs/user-guide/sharing" className="text-slate-300 hover:text-white">Sharing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Developer</h3>
              <ul className="space-y-2">
                <li><Link href="/docs/developer/architecture" className="text-slate-300 hover:text-white">Architecture</Link></li>
                <li><Link href="/docs/developer/setup" className="text-slate-300 hover:text-white">Development Setup</Link></li>
                <li><Link href="/docs/developer/deployment" className="text-slate-300 hover:text-white">Deployment</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">API</h3>
              <ul className="space-y-2">
                <li><Link href="/docs/api/authentication" className="text-slate-300 hover:text-white">Authentication</Link></li>
                <li><Link href="/docs/api/files" className="text-slate-300 hover:text-white">File Management</Link></li>
                <li><Link href="/docs/api/errors" className="text-slate-300 hover:text-white">Error Handling</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 MegaVault Open Source. Released under the MIT License.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}