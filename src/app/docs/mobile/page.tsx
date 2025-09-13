import { Alert, Card } from '../components/DocComponents';
import Link from 'next/link';

export default function MobilePage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">MegaVault Mobile App</h1>
        <p className="text-xl text-slate-600">
          The MegaVault Flutter mobile application is currently under development.
        </p>
      </div>

      <Alert type="info" title="Coming Soon">
        The MegaVault mobile app is currently under development. 
        Use our responsive web interface for mobile access.
      </Alert>

      <section id="current-status">
        <h2>Current Status</h2>
        <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="border border-slate-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🚧</div>
            <h3 className="font-semibold text-slate-900 mb-2">Development in Progress</h3>
            <p className="text-sm text-slate-600">Active development of core features</p>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-semibold text-slate-900 mb-2">Flutter-Based</h3>
            <p className="text-sm text-slate-600">Cross-platform mobile app</p>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">⏳</div>
            <h3 className="font-semibold text-slate-900 mb-2">Release Timeline</h3>
            <p className="text-sm text-slate-600">To be announced</p>
          </div>
        </div>
      </section>

      <section id="in-the-meantime">
        <h2>In the Meantime</h2>
        <p>
          Use the responsive web interface which works great on mobile browsers. 
          Our web application is optimized for mobile devices and provides full functionality.
        </p>

        <div className="not-prose my-6">
          <Card 
            title="📱 Mobile-Optimized Web Interface" 
            description="Access all MegaVault features through your mobile browser"
            className="border-2 border-blue-200 bg-blue-50"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Features Available</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>✅ Full functionality via mobile browser</li>
                    <li>✅ Responsive design optimized for touch</li>
                    <li>✅ File upload and download</li>
                    <li>✅ File sharing and management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Mobile Benefits</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>✅ Progressive Web App (PWA) capabilities</li>
                    <li>✅ Touch-friendly controls</li>
                    <li>✅ Offline file viewing</li>
                    <li>✅ Mobile notifications support</li>
                  </ul>
                </div>
              </div>
              <Link 
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Access Web Dashboard →
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <section id="future-features">
        <h2>Planned Mobile Features</h2>
        <p>
          When the mobile app is ready, it will include native mobile features 
          that enhance the cloud storage experience on mobile devices.
        </p>

        <div className="not-prose space-y-6 my-8">
          <div className="border border-slate-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 text-xl">📤</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Background Uploads</h3>
                <p className="text-slate-600 mb-4">
                  Automatic background uploading of photos and documents with battery optimization.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-xl">📱</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Native Integration</h3>
                <p className="text-slate-600 mb-4">
                  Camera integration, file system access, share sheet support, and biometric security.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 text-xl">📶</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Offline Capabilities</h3>
                <p className="text-slate-600 mb-4">
                  Smart file caching, offline viewing, and queue management for uploads when connection returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="not-prose mt-12">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Stay Updated</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              We're working hard to bring you the best mobile experience. 
              In the meantime, enjoy the full-featured web interface optimized for mobile devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-semibold"
              >
                📱 Try Mobile Web Interface
              </Link>
              <Link
                href="/docs/user-guide"
                className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 bg-white rounded-md hover:bg-slate-50 font-semibold"
              >
                📖 Browse User Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}