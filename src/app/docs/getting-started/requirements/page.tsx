import { Alert, TableOfContents, Card } from '../../components/DocComponents';

const tableOfContents = [
  { id: 'overview', title: 'Overview' },
  { id: 'hardware-requirements', title: 'Hardware Requirements' },
  { id: 'software-requirements', title: 'Software Requirements' },
  { id: 'network-requirements', title: 'Network Requirements' },
  { id: 'browser-support', title: 'Browser Support' },
  { id: 'mobile-requirements', title: 'Mobile Requirements' },
  { id: 'deployment-platforms', title: 'Deployment Platforms' },
];

export default function RequirementsPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">System Requirements</h1>
        <p className="text-xl text-slate-600">
          Hardware, software, and network requirements for running MegaVault in different environments.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Overview</h2>
        <p>
          MegaVault is designed to be lightweight and efficient, but specific requirements depend on 
          your usage patterns, number of users, and storage needs. This guide outlines minimum and 
          recommended specifications for different deployment scenarios.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Small Team" description="Up to 10 users, light usage">
            <ul className="text-sm space-y-1">
              <li>2 CPU cores</li>
              <li>4 GB RAM</li>
              <li>20 GB storage</li>
              <li>100 Mbps bandwidth</li>
            </ul>
          </Card>
          
          <Card title="Medium Business" description="Up to 50 users, moderate usage">
            <ul className="text-sm space-y-1">
              <li>4 CPU cores</li>
              <li>8 GB RAM</li>
              <li>50 GB storage</li>
              <li>500 Mbps bandwidth</li>
            </ul>
          </Card>

          <Card title="Enterprise" description="100+ users, heavy usage">
            <ul className="text-sm space-y-1">
              <li>8+ CPU cores</li>
              <li>16+ GB RAM</li>
              <li>100+ GB storage</li>
              <li>1+ Gbps bandwidth</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="hardware-requirements">
        <h2>Hardware Requirements</h2>
        
        <h3>Minimum Requirements</h3>
        <div className="bg-slate-50 rounded-lg p-6 not-prose">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Processor</h4>
              <ul className="text-sm space-y-1">
                <li><strong>CPU:</strong> 2 cores minimum</li>
                <li><strong>Architecture:</strong> x86_64 (AMD64)</li>
                <li><strong>Clock Speed:</strong> 2.0 GHz or higher</li>
                <li><strong>Support:</strong> ARM64 supported</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Memory</h4>
              <ul className="text-sm space-y-1">
                <li><strong>RAM:</strong> 4 GB minimum</li>
                <li><strong>Recommended:</strong> 8 GB or more</li>
                <li><strong>Swap:</strong> 2 GB recommended</li>
                <li><strong>Type:</strong> DDR3/DDR4/DDR5</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>Storage Requirements</h3>
        <div className="bg-slate-50 rounded-lg p-6 not-prose">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Local Storage</h4>
              <ul className="text-sm space-y-1">
                <li><strong>OS & Application:</strong> 20 GB minimum</li>
                <li><strong>Logs & Cache:</strong> 10 GB recommended</li>
                <li><strong>Temporary Files:</strong> 5 GB</li>
                <li><strong>Total:</strong> 35 GB minimum</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">External Storage</h4>
              <ul className="text-sm space-y-1">
                <li><strong>S3-Compatible:</strong> Required</li>
                <li><strong>Capacity:</strong> Based on usage</li>
                <li><strong>Performance:</strong> Standard tier sufficient</li>
                <li><strong>Backup:</strong> Versioning recommended</li>
              </ul>
            </div>
          </div>
        </div>

        <Alert type="info" title="Performance Scaling">
          MegaVault automatically scales based on available resources. More CPU cores and RAM 
          will improve performance for concurrent users and large file operations.
        </Alert>
      </section>

      <section id="software-requirements">
        <h2>Software Requirements</h2>

        <h3>Operating System Support</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Operating System
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Minimum Version
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Recommended
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Ubuntu Linux
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  20.04 LTS
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  22.04 LTS
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Most tested platform
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Debian
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  11 (Bullseye)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  12 (Bookworm)
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Excellent stability
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  CentOS/RHEL
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  8
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  9
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Enterprise environments
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Windows Server
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  2019
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  2022
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Docker Desktop required
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  macOS
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  10.15 Catalina
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  13.0 Ventura
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Development only
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Runtime Dependencies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Node.js Environment">
            <ul className="text-sm space-y-1">
              <li><strong>Node.js:</strong> 18.0+ (LTS recommended)</li>
              <li><strong>npm:</strong> 9.0+ or Yarn 1.22+</li>
              <li><strong>Architecture:</strong> x64, ARM64</li>
              <li><strong>TLS:</strong> 1.2+ support required</li>
            </ul>
          </Card>
          
          <Card title="Container Runtime">
            <ul className="text-sm space-y-1">
              <li><strong>Docker:</strong> 20.10+ recommended</li>
              <li><strong>Docker Compose:</strong> 2.0+</li>
              <li><strong>Alternative:</strong> Podman supported</li>
              <li><strong>Registry:</strong> Docker Hub access</li>
            </ul>
          </Card>
        </div>

        <h3>Database & Storage Services</h3>
        <ul>
          <li><strong>Redis:</strong> 6.0+ (Upstash Redis recommended)</li>
          <li><strong>S3 Storage:</strong> AWS S3, Cloudflare R2, MinIO, or compatible</li>
          <li><strong>SSL/TLS:</strong> Required for production deployments</li>
        </ul>
      </section>

      <section id="network-requirements">
        <h2>Network Requirements</h2>

        <h3>Bandwidth Requirements</h3>
        <div className="bg-slate-50 rounded-lg p-6 not-prose">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Light Usage</h4>
              <ul className="text-sm space-y-1">
                <li><strong>Users:</strong> 1-10</li>
                <li><strong>Minimum:</strong> 50 Mbps</li>
                <li><strong>Recommended:</strong> 100 Mbps</li>
                <li><strong>Latency:</strong> &lt;100ms</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Medium Usage</h4>
              <ul className="text-sm space-y-1">
                <li><strong>Users:</strong> 10-50</li>
                <li><strong>Minimum:</strong> 200 Mbps</li>
                <li><strong>Recommended:</strong> 500 Mbps</li>
                <li><strong>Latency:</strong> &lt;50ms</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Heavy Usage</h4>
              <ul className="text-sm space-y-1">
                <li><strong>Users:</strong> 50+</li>
                <li><strong>Minimum:</strong> 500 Mbps</li>
                <li><strong>Recommended:</strong> 1+ Gbps</li>
                <li><strong>Latency:</strong> &lt;20ms</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>Network Ports</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Port
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Protocol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Access
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  3001
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  HTTP/HTTPS
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Web interface and API
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Public
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  6379
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  TCP
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Redis database (if local)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Internal
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  443
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  HTTPS
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  S3 storage connections
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Outbound
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Alert type="warning" title="Firewall Configuration">
          Ensure port 3001 is accessible for web traffic. Configure your firewall to allow 
          inbound connections on this port. For production, use a reverse proxy with HTTPS.
        </Alert>
      </section>

      <section id="browser-support">
        <h2>Browser Support</h2>
        <p>
          MegaVault web interface supports modern browsers with ES2020+ JavaScript support.
        </p>

        <h3>Supported Browsers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Desktop Browsers">
            <ul className="text-sm space-y-1">
              <li>✅ Chrome 90+ (recommended)</li>
              <li>✅ Firefox 88+</li>
              <li>✅ Safari 14+</li>
              <li>✅ Edge 90+</li>
              <li>❌ Internet Explorer (not supported)</li>
            </ul>
          </Card>
          
          <Card title="Mobile Browsers">
            <ul className="text-sm space-y-1">
              <li>✅ Chrome Mobile 90+</li>
              <li>✅ Safari iOS 14+</li>
              <li>✅ Firefox Mobile 88+</li>
              <li>✅ Samsung Internet 14+</li>
              <li>✅ Opera Mobile 64+</li>
            </ul>
          </Card>
        </div>

        <h3>Required Browser Features</h3>
        <ul>
          <li><strong>JavaScript:</strong> ES2020+ support required</li>
          <li><strong>WebSockets:</strong> For real-time updates</li>
          <li><strong>File API:</strong> For drag-and-drop uploads</li>
          <li><strong>LocalStorage:</strong> For client-side caching</li>
          <li><strong>Fetch API:</strong> For modern HTTP requests</li>
        </ul>
      </section>

      <section id="mobile-requirements">
        <h2>Mobile Requirements</h2>
        <p>
          The MegaVault Flutter mobile app has specific requirements for iOS and Android devices.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="iOS Requirements">
            <ul className="text-sm space-y-1">
              <li><strong>iOS Version:</strong> 12.0+</li>
              <li><strong>Architecture:</strong> arm64</li>
              <li><strong>Storage:</strong> 100 MB free space</li>
              <li><strong>RAM:</strong> 2 GB minimum</li>
              <li><strong>Network:</strong> Wi-Fi or cellular</li>
            </ul>
          </Card>
          
          <Card title="Android Requirements">
            <ul className="text-sm space-y-1">
              <li><strong>Android Version:</strong> 6.0+ (API 23)</li>
              <li><strong>Architecture:</strong> arm64-v8a, armeabi-v7a</li>
              <li><strong>Storage:</strong> 100 MB free space</li>
              <li><strong>RAM:</strong> 2 GB minimum</li>
              <li><strong>Network:</strong> Wi-Fi or mobile data</li>
            </ul>
          </Card>
        </div>

        <h3>Mobile Features & Permissions</h3>
        <ul>
          <li><strong>Storage Access:</strong> Required for file uploads</li>
          <li><strong>Camera Access:</strong> For photo/video uploads</li>
          <li><strong>Network Access:</strong> For API communication</li>
          <li><strong>Background Processing:</strong> For upload continuity</li>
          <li><strong>Push Notifications:</strong> For upload status (optional)</li>
        </ul>
      </section>

      <section id="deployment-platforms">
        <h2>Deployment Platforms</h2>
        <p>
          MegaVault can be deployed on various cloud and on-premises platforms.
        </p>

        <h3>Recommended Cloud Platforms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose">
          <Card title="DigitalOcean">
            <ul className="text-sm space-y-1">
              <li>✅ Docker droplets</li>
              <li>✅ Managed databases</li>
              <li>✅ Spaces object storage</li>
              <li>✅ Load balancers</li>
            </ul>
          </Card>
          
          <Card title="AWS">
            <ul className="text-sm space-y-1">
              <li>✅ EC2 instances</li>
              <li>✅ ElastiCache Redis</li>
              <li>✅ S3 storage</li>
              <li>✅ Application Load Balancer</li>
            </ul>
          </Card>

          <Card title="Google Cloud">
            <ul className="text-sm space-y-1">
              <li>✅ Compute Engine</li>
              <li>✅ Cloud Memorystore</li>
              <li>✅ Cloud Storage</li>
              <li>✅ Cloud Load Balancing</li>
            </ul>
          </Card>

          <Card title="Hetzner">
            <ul className="text-sm space-y-1">
              <li>✅ Cloud servers</li>
              <li>✅ Cost-effective</li>
              <li>✅ European data centers</li>
              <li>✅ Good performance</li>
            </ul>
          </Card>

          <Card title="Linode">
            <ul className="text-sm space-y-1">
              <li>✅ Virtual machines</li>
              <li>✅ Object storage</li>
              <li>✅ Load balancers</li>
              <li>✅ Developer-friendly</li>
            </ul>
          </Card>

          <Card title="Self-Hosted">
            <ul className="text-sm space-y-1">
              <li>✅ Complete control</li>
              <li>✅ Cost-effective</li>
              <li>✅ Data sovereignty</li>
              <li>⚠️ Requires expertise</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Platform Selection">
          Choose your deployment platform based on your geographic location, compliance requirements, 
          budget, and technical expertise. All platforms support Docker deployment.
        </Alert>
      </section>
    </div>
  );
}