import { Alert, Card, TableOfContents } from '../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'User Guide Overview' },
  { id: 'dashboard', title: 'Dashboard Navigation' },
  { id: 'file-operations', title: 'File Operations' },
  { id: 'sharing', title: 'Sharing & Collaboration' },
  { id: 'tips', title: 'Tips & Best Practices' },
];

export default function UserGuidePage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">MegaVault User Guide</h1>
        <p className="text-xl text-slate-600">
          Complete guide to using MegaVault for file management, sharing, and collaboration.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>User Guide Overview</h2>
        <p>
          Welcome to MegaVault! This comprehensive user guide will help you master all aspects of 
          the platform, from basic file management to advanced sharing and collaboration features. 
          Whether you're new to cloud storage or transitioning from another platform, you'll find 
          everything you need here.
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="border border-slate-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🗂️</div>
            <h3 className="font-semibold text-slate-900 mb-2">File Management</h3>
            <p className="text-sm text-slate-600">Upload, organize, and manage your files with ease</p>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🔗</div>
            <h3 className="font-semibold text-slate-900 mb-2">Easy Sharing</h3>
            <p className="text-sm text-slate-600">Share files securely with public links and controls</p>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-semibold text-slate-900 mb-2">Responsive Design</h3>
            <p className="text-sm text-slate-600">Mobile-optimized web interface for all devices</p>
          </div>
        </div>

        <Alert type="success" title="New to MegaVault?">
          Start with the Dashboard Overview to get familiar with the interface, then move on to 
          File Management to learn the basics. Each guide builds upon the previous one.
        </Alert>
      </section>

      <section id="dashboard">
        <h2>Dashboard Navigation</h2>
        <p>
          The MegaVault dashboard is your central hub for all file operations. Learn how to navigate 
          efficiently and customize your workspace for maximum productivity.
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <Card 
            title="🏠 Dashboard Overview" 
            description="Master the main interface, navigation, and core features"
            className="border-2 border-blue-200"
          >
            <div className="space-y-3">
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✅ Interface walkthrough</li>
                <li>✅ Navigation shortcuts</li>
                <li>✅ Customization options</li>
                <li>✅ Keyboard shortcuts</li>
              </ul>
              <Link 
                href="/docs/user-guide/dashboard"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Explore Dashboard →
              </Link>
            </div>
          </Card>

          <Card 
            title="🔍 Search & Filtering" 
            description="Find files quickly with powerful search and filtering tools"
            className="border-2 border-green-200"
          >
            <div className="space-y-3">
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✅ Advanced search syntax</li>
                <li>✅ Filter by type and date</li>
                <li>✅ Saved searches</li>
                <li>✅ Quick filters</li>
              </ul>
              <div className="text-sm text-slate-500 italic">Coming soon...</div>
            </div>
          </Card>
        </div>
      </section>

      <section id="file-operations">
        <h2>File Operations</h2>
        <p>
          Learn everything about managing your files in MegaVault, from basic uploads to advanced 
          organization techniques.
        </p>

        <div className="not-prose space-y-6 my-8">
          <div className="border border-slate-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 text-xl">📁</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">File Management Essentials</h3>
                <p className="text-slate-600 mb-4">
                  Complete guide to uploading, organizing, downloading, and managing your files effectively.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>✅ Upload methods</div>
                  <div>✅ Folder organization</div>
                  <div>✅ File operations</div>
                  <div>✅ Bulk actions</div>
                </div>
                <Link 
                  href="/docs/user-guide/file-management"
                  className="inline-flex items-center mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
                >
                  File Management Guide →
                </Link>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 text-xl">👁️</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">File Preview & Viewing</h3>
                <p className="text-slate-600 mb-4">
                  Preview documents, images, videos, and other file types directly in your browser.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>✅ Document preview</div>
                  <div>✅ Media playback</div>
                  <div>✅ Image galleries</div>
                  <div>✅ Code syntax highlighting</div>
                </div>
                <div className="mt-4 text-sm text-slate-500 italic">Available in file management guide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sharing">
        <h2>Sharing & Collaboration</h2>
        <p>
          MegaVault makes it easy to share your files securely with others. Learn about public links, 
          access controls, and collaboration features.
        </p>

        <div className="not-prose my-6">
          <Card 
            title="🔗 File Sharing Made Simple" 
            description="Share files securely with public links and advanced permission controls"
            className="border-2 border-emerald-200 bg-emerald-50"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Sharing Features</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>✅ Public link generation</li>
                    <li>✅ Password protection</li>
                    <li>✅ Expiration dates</li>
                    <li>✅ Download tracking</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Security Controls</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>✅ Access restrictions</li>
                    <li>✅ Link deactivation</li>
                    <li>✅ Share analytics</li>
                    <li>✅ IP-based limits</li>
                  </ul>
                </div>
              </div>
              <Link 
                href="/docs/user-guide/sharing"
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm"
              >
                Sharing Guide →
              </Link>
            </div>
          </Card>
        </div>

        <Alert type="info" title="Sharing Best Practices">
          Always review sharing settings before distributing links. Use password protection for 
          sensitive files and set expiration dates for temporary access.
        </Alert>
      </section>

      <section id="tips">
        <h2>Tips & Best Practices</h2>
        <p>
          Get the most out of MegaVault with these expert tips and best practices from power users.
        </p>

        <div className="not-prose space-y-6 my-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Organization Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Folder Structure</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Use consistent naming conventions</li>
                  <li>• Create date-based folders for projects</li>
                  <li>• Keep folder depth reasonable (max 5 levels)</li>
                  <li>• Use descriptive folder names</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">File Naming</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Include dates in format YYYY-MM-DD</li>
                  <li>• Use underscores instead of spaces</li>
                  <li>• Add version numbers for iterations</li>
                  <li>• Keep names descriptive but concise</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">⚡ Productivity Shortcuts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Keyboard Shortcuts</h4>
                <ul className="text-green-700 space-y-1">
                  <li>• <kbd className="bg-white px-1 rounded">Ctrl+U</kbd> Upload files</li>
                  <li>• <kbd className="bg-white px-1 rounded">Ctrl+N</kbd> New folder</li>
                  <li>• <kbd className="bg-white px-1 rounded">Del</kbd> Delete selected</li>
                  <li>• <kbd className="bg-white px-1 rounded">F2</kbd> Rename</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Quick Actions</h4>
                <ul className="text-green-700 space-y-1">
                  <li>• Drag & drop for uploads</li>
                  <li>• Right-click context menus</li>
                  <li>• Bulk select with Shift+Click</li>
                  <li>• Double-click to preview</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Web Interface Tips</h4>
                <ul className="text-green-700 space-y-1">
                  <li>• Use responsive design features</li>
                  <li>• Bookmark for quick mobile access</li>
                  <li>• Enable browser notifications</li>
                  <li>• Use touch-friendly interface controls</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">🔒 Security Recommendations</h3>
            <div className="text-sm text-yellow-800 space-y-2">
              <p>• <strong>Regular backups:</strong> Download important files periodically as local backups</p>
              <p>• <strong>Secure sharing:</strong> Always use password protection for sensitive file shares</p>
              <p>• <strong>Review permissions:</strong> Regularly audit your shared files and remove expired links</p>
              <p>• <strong>Strong passwords:</strong> Use a strong, unique password for your MegaVault account</p>
              <p>• <strong>Monitor activity:</strong> Check your account activity regularly for unauthorized access</p>
            </div>
          </div>
        </div>
      </section>

      <div className="not-prose mt-12">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Master MegaVault Like a Pro</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              You now have all the knowledge needed to use MegaVault effectively. Start with the basics 
              and gradually explore advanced features as you become more comfortable with the platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/user-guide/dashboard"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
              >
                🏠 Start with Dashboard
              </Link>
              <Link
                href="/docs/user-guide/file-management"
                className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 bg-white rounded-md hover:bg-slate-50 font-semibold"
              >
                📁 Learn File Management
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}