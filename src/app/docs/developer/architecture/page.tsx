import { CodeBlock, Alert, TableOfContents } from '../../components/DocComponents';

const tableOfContents = [
  { id: 'overview', title: 'Architecture Overview' },
  { id: 'system-design', title: 'System Design' },
  { id: 'web-architecture', title: 'Web Application Architecture' },
  { id: 'mobile-architecture', title: 'Mobile Application Architecture' },
  { id: 'data-flow', title: 'Data Flow & Communication' },
  { id: 'security', title: 'Security Architecture' },
  { id: 'scalability', title: 'Scalability Considerations' },
];

export default function ArchitecturePage() {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">System Architecture</h1>
        <p className="text-xl text-slate-600">
          Deep dive into MegaVault's architecture, design patterns, and technical decisions.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Architecture Overview</h2>
        <p>
          MegaVault follows a modern, microservices-inspired architecture with a Next.js-based full-stack 
          web application and a Flutter-based mobile app. The system is designed for simplicity, 
          maintainability, and scalability while providing a seamless user experience across platforms.
        </p>

        <div className="not-prose">
          <div className="bg-slate-50 rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">High-Level Architecture</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-800">Web Client</span>
                </div>
                <div className="text-slate-400">→</div>
                <div className="w-24 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-green-800">Next.js API</span>
                </div>
                <div className="text-slate-400">→</div>
                <div className="w-24 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-800">Storage</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-yellow-800">Mobile App</span>
                </div>
                <div className="text-slate-400">→</div>
                <div className="w-24 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-green-800">Mobile API</span>
                </div>
                <div className="text-slate-400">→</div>
                <div className="w-24 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-red-800">Redis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3>Key Architectural Principles</h3>
        <ul>
          <li><strong>Separation of Concerns</strong>: Clear boundaries between presentation, business logic, and data layers</li>
          <li><strong>API-First Design</strong>: RESTful APIs that serve both web and mobile clients</li>
          <li><strong>Stateless Architecture</strong>: Scalable design with minimal server-side state</li>
          <li><strong>Security by Default</strong>: Built-in authentication, authorization, and data protection</li>
          <li><strong>Cloud-Native</strong>: Designed for cloud deployment with external storage and databases</li>
        </ul>
      </section>

      <section id="system-design">
        <h2>System Design</h2>
        <p>
          MegaVault uses a monolithic backend with a clean separation between web and mobile API endpoints. 
          This approach provides simplicity for deployment and maintenance while maintaining clear boundaries.
        </p>

        <h3>Technology Stack</h3>
        <div className="not-prose">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-3">Frontend</h4>
              <ul className="text-sm space-y-2">
                <li><strong>React 18</strong> - UI framework</li>
                <li><strong>Next.js 14</strong> - Full-stack framework</li>
                <li><strong>TypeScript</strong> - Type safety</li>
                <li><strong>Tailwind CSS</strong> - Styling</li>
                <li><strong>Framer Motion</strong> - Animations</li>
                <li><strong>Three.js</strong> - 3D visualization</li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-3">Backend</h4>
              <ul className="text-sm space-y-2">
                <li><strong>Next.js API Routes</strong> - Server logic</li>
                <li><strong>NextAuth.js</strong> - Web authentication</li>
                <li><strong>JWT</strong> - Mobile authentication</li>
                <li><strong>Upstash Redis</strong> - Data storage</li>
                <li><strong>AWS SDK</strong> - S3 integration</li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-3">Mobile</h4>
              <ul className="text-sm space-y-2">
                <li><strong>Flutter</strong> - Mobile framework</li>
                <li><strong>Dart</strong> - Programming language</li>
                <li><strong>HTTP Client</strong> - API communication</li>
                <li><strong>Secure Storage</strong> - Token storage</li>
                <li><strong>Background Tasks</strong> - File uploads</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>Design Patterns</h3>
        <ul>
          <li><strong>MVC (Model-View-Controller)</strong>: Clear separation of concerns in Next.js structure</li>
          <li><strong>Repository Pattern</strong>: Data access abstraction in service layers</li>
          <li><strong>Provider Pattern</strong>: State management for session and user data</li>
          <li><strong>Factory Pattern</strong>: Service instantiation and configuration</li>
          <li><strong>Observer Pattern</strong>: Event-driven updates in mobile app</li>
        </ul>
      </section>

      <section id="web-architecture">
        <h2>Web Application Architecture</h2>
        <p>
          The web application follows Next.js App Router conventions with server-side rendering, 
          API routes, and client-side state management.
        </p>

        <h3>Directory Structure</h3>
        <CodeBlock language="bash">
{`src/
├── app/                    # Next.js App Router
│   ├── api/               # API route handlers
│   │   ├── auth/          # Authentication endpoints
│   │   ├── files/         # File management APIs
│   │   ├── mobile/        # Mobile-specific APIs
│   │   └── users/         # User management APIs
│   ├── components/        # React components
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # Shared components
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication configuration
│   ├── storage.ts        # Storage service
│   └── config.ts         # Application configuration
├── types/                 # TypeScript definitions
└── middleware.ts          # Next.js middleware`}
        </CodeBlock>

        <h3>Request Flow</h3>
        <div className="not-prose">
          <div className="bg-slate-50 rounded-lg p-6 my-6">
            <h4 className="font-semibold mb-4">Web Request Processing</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                <span>Browser sends request to Next.js application</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                <span>Middleware checks authentication and authorization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                <span>API route handler processes the request</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                <span>Service layer interacts with Redis/Storage</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">5</div>
                <span>Response returned to client</span>
              </div>
            </div>
          </div>
        </div>

        <h3>State Management</h3>
        <CodeBlock language="typescript" title="Session Provider Example">
{`'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  session: any;
}

export function SessionProvider({ children, session }: Props) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}`}
        </CodeBlock>

        <h3>Component Architecture</h3>
        <ul>
          <li><strong>Page Components</strong>: Top-level route components</li>
          <li><strong>Layout Components</strong>: Shared layouts for different sections</li>
          <li><strong>Feature Components</strong>: Specific functionality (file upload, preview)</li>
          <li><strong>UI Components</strong>: Reusable interface elements</li>
          <li><strong>Provider Components</strong>: Context and state management</li>
        </ul>
      </section>

      <section id="mobile-architecture">
        <h2>Mobile Application Architecture</h2>
        <p>
          The Flutter mobile app follows clean architecture principles with clear separation 
          between presentation, domain, and data layers.
        </p>

        <h3>Flutter Project Structure</h3>
        <CodeBlock language="bash">
{`megavault_mobile/
├── lib/
│   ├── screens/           # UI screens
│   │   ├── login_screen.dart
│   │   ├── home_screen.dart
│   │   └── file_preview_screen.dart
│   ├── services/          # Business logic
│   │   ├── auth_service.dart
│   │   ├── file_service.dart
│   │   └── background_upload_service.dart
│   ├── utils/             # Utilities
│   │   ├── api_config.dart
│   │   ├── file_utils.dart
│   │   └── url_helper.dart
│   ├── widgets/           # Reusable widgets
│   └── main.dart          # App entry point
├── android/               # Android-specific code
├── ios/                   # iOS-specific code
└── pubspec.yaml          # Dependencies`}
        </CodeBlock>

        <h3>Architecture Layers</h3>
        <div className="not-prose">
          <div className="space-y-4 my-6">
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Presentation Layer</h4>
              <p className="text-sm text-slate-600 mb-2">UI screens, widgets, and user interaction handling</p>
              <ul className="text-sm space-y-1">
                <li>• Screens (login, home, file preview)</li>
                <li>• Widgets (file list, upload progress)</li>
                <li>• State management (provider/bloc)</li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Domain Layer</h4>
              <p className="text-sm text-slate-600 mb-2">Business logic and use cases</p>
              <ul className="text-sm space-y-1">
                <li>• Authentication logic</li>
                <li>• File operations</li>
                <li>• Background upload management</li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Data Layer</h4>
              <p className="text-sm text-slate-600 mb-2">API communication and local storage</p>
              <ul className="text-sm space-y-1">
                <li>• HTTP API client</li>
                <li>• Local secure storage</li>
                <li>• Cache management</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>Service Architecture</h3>
        <CodeBlock language="dart" title="Service Pattern Example">
{`class FileService {
  final ApiClient _apiClient;
  final CacheService _cacheService;

  FileService(this._apiClient, this._cacheService);

  Future<List<FileItem>> getFiles(String path) async {
    try {
      // Try cache first
      final cachedFiles = await _cacheService.getFiles(path);
      if (cachedFiles != null) {
        return cachedFiles;
      }

      // Fetch from API
      final response = await _apiClient.get('/api/mobile/files/list?folder=$path');
      final files = FileItem.fromJsonList(response.data['files']);
      
      // Cache the result
      await _cacheService.setFiles(path, files);
      
      return files;
    } catch (e) {
      throw FileServiceException('Failed to fetch files: $e');
    }
  }
}`}
        </CodeBlock>
      </section>

      <section id="data-flow">
        <h2>Data Flow & Communication</h2>
        <p>
          MegaVault implements a clear data flow pattern with RESTful APIs serving both web and mobile clients.
        </p>

        <h3>API Communication</h3>
        <div className="not-prose">
          <div className="bg-slate-50 rounded-lg p-6 my-6">
            <h4 className="font-semibold mb-4">File Upload Flow</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">1</div>
                <span>Client selects file and initiates upload</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">2</div>
                <span>Authentication middleware validates user session/token</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">3</div>
                <span>Upload API processes file and validates constraints</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">4</div>
                <span>File uploaded to S3-compatible storage</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">5</div>
                <span>Metadata stored in Redis database</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">6</div>
                <span>Success response returned to client</span>
              </div>
            </div>
          </div>
        </div>

        <h3>Storage Architecture</h3>
        <ul>
          <li><strong>Redis</strong>: User data, sessions, file metadata, and caching</li>
          <li><strong>S3 Storage</strong>: Binary file storage with signed URL access</li>
          <li><strong>Local Cache</strong>: Mobile app caches metadata and thumbnails</li>
          <li><strong>Session Storage</strong>: Web browser stores temporary UI state</li>
        </ul>

        <h3>Real-time Updates</h3>
        <p>
          While MegaVault doesn't currently implement WebSocket connections, it uses polling 
          and event-driven updates for real-time functionality:
        </p>

        <CodeBlock language="typescript" title="Polling Pattern">
{`// File list auto-refresh
useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const updatedFiles = await fetchFiles();
      setFiles(updatedFiles);
    } catch (error) {
      console.error('Failed to refresh files:', error);
    }
  }, 30000); // Refresh every 30 seconds

  return () => clearInterval(interval);
}, []);`}
        </CodeBlock>
      </section>

      <section id="security">
        <h2>Security Architecture</h2>
        <p>
          Security is built into every layer of MegaVault, from authentication to data storage and transmission.
        </p>

        <h3>Authentication & Authorization</h3>
        <ul>
          <li><strong>Web Sessions</strong>: HTTP-only cookies with CSRF protection</li>
          <li><strong>Mobile Tokens</strong>: JWT tokens with secure storage</li>
          <li><strong>API Security</strong>: All endpoints require authentication</li>
          <li><strong>Role-based Access</strong>: User isolation through folder-based permissions</li>
        </ul>

        <h3>Data Protection</h3>
        <ul>
          <li><strong>Encrypted Transmission</strong>: HTTPS/TLS for all communications</li>
          <li><strong>Signed URLs</strong>: Time-limited access to storage objects</li>
          <li><strong>Input Validation</strong>: Comprehensive validation and sanitization</li>
          <li><strong>Error Handling</strong>: Secure error messages without information leakage</li>
        </ul>

        <h3>Security Middleware</h3>
        <CodeBlock language="typescript" title="Authentication Middleware">
{`import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  if (pathname.startsWith('/api/health') || 
      pathname.startsWith('/api/files/public')) {
    return NextResponse.next();
  }

  // Check for session or JWT token
  const token = await getToken({ req: request });
  const authHeader = request.headers.get('authorization');

  if (!token && !authHeader) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  return NextResponse.next();
}`}
        </CodeBlock>

        <Alert type="warning" title="Security Best Practices">
          <ul className="mt-2 space-y-1">
            <li>Always use HTTPS in production environments</li>
            <li>Regularly rotate JWT secrets and API keys</li>
            <li>Implement rate limiting for API endpoints</li>
            <li>Monitor for suspicious activity and failed login attempts</li>
            <li>Keep dependencies updated for security patches</li>
          </ul>
        </Alert>
      </section>

      <section id="scalability">
        <h2>Scalability Considerations</h2>
        <p>
          MegaVault is designed to scale from single-user deployments to multi-tenant installations 
          with thousands of users.
        </p>

        <h3>Horizontal Scaling</h3>
        <ul>
          <li><strong>Stateless Design</strong>: API servers can be scaled horizontally</li>
          <li><strong>External Storage</strong>: S3-compatible storage scales independently</li>
          <li><strong>Redis Clustering</strong>: Redis can be clustered for high availability</li>
          <li><strong>Load Balancing</strong>: Multiple API instances behind a load balancer</li>
        </ul>

        <h3>Performance Optimization</h3>
        <ul>
          <li><strong>CDN Integration</strong>: Static assets served via CDN</li>
          <li><strong>Caching Strategy</strong>: Multi-layer caching (browser, Redis, CDN)</li>
          <li><strong>Image Optimization</strong>: Automatic image compression and resizing</li>
          <li><strong>Lazy Loading</strong>: Progressive loading of file lists and previews</li>
        </ul>

        <h3>Monitoring & Observability</h3>
        <CodeBlock language="typescript" title="Health Check Endpoint">
{`// app/api/health/route.ts
export async function GET() {
  try {
    // Check Redis connectivity
    const redisCheck = await redis.ping();
    
    // Check storage connectivity
    const storageCheck = await s3Client.send(new ListBucketsCommand({}));
    
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        redis: redisCheck === 'PONG' ? 'healthy' : 'unhealthy',
        storage: storageCheck ? 'healthy' : 'unhealthy'
      }
    });
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: error.message },
      { status: 500 }
    );
  }
}`}
        </CodeBlock>

        <h3>Future Enhancements</h3>
        <ul>
          <li><strong>Microservices Migration</strong>: Split into dedicated services as needed</li>
          <li><strong>Event-Driven Architecture</strong>: Implement message queues for async processing</li>
          <li><strong>Multi-Region Deployment</strong>: Geo-distributed storage and compute</li>
          <li><strong>Advanced Analytics</strong>: Usage metrics and performance monitoring</li>
        </ul>
      </section>

      <div className="not-prose mt-8">
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-indigo-900 mb-2">Understanding the Architecture</h3>
          <p className="text-indigo-800 mb-4">
            This architecture provides a solid foundation for cloud storage while maintaining simplicity and developer productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="/docs/developer/setup" 
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Development Setup →
            </a>
            <a 
              href="/docs/developer/deployment" 
              className="inline-flex items-center px-4 py-2 border border-indigo-300 text-indigo-700 rounded-md hover:bg-indigo-50"
            >
              Deployment Guide →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}