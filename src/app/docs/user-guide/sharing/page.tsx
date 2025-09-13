import { Alert, TableOfContents, Card, CodeBlock, ParameterTable } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'File Sharing Overview' },
  { id: 'public-links', title: 'Public Sharing Links' },
  { id: 'link-security', title: 'Link Security Options' },
  { id: 'folder-sharing', title: 'Folder Sharing' },
  { id: 'sharing-permissions', title: 'Sharing Permissions' },
  { id: 'expiration-limits', title: 'Expiration and Limits' },
  { id: 'sharing-analytics', title: 'Sharing Analytics' },
  { id: 'best-practices', title: 'Sharing Best Practices' },
];

const linkOptions = [
  {
    name: 'password',
    type: 'string',
    required: false,
    description: 'Password protection for the shared link',
    example: 'MySecurePassword123'
  },
  {
    name: 'expiration',
    type: 'datetime',
    required: false,
    description: 'When the link should expire and become invalid',
    example: '2024-12-31 23:59:59'
  },
  {
    name: 'download_limit',
    type: 'number',
    required: false,
    description: 'Maximum number of downloads allowed',
    example: '10'
  },
  {
    name: 'view_only',
    type: 'boolean',
    required: false,
    description: 'Allow viewing/previewing but prevent downloads',
    example: 'false'
  }
];

export default function SharingPage() {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">File Sharing</h1>
        <p className="text-xl text-slate-600">
          Share files securely with public links and collaboration features. Control access with passwords, expiration dates, and download limits.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>File Sharing Overview</h2>
        <p>
          MegaVault provides flexible and secure file sharing capabilities that allow you to share individual files 
          or entire folders with anyone, while maintaining complete control over access permissions and security settings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Secure Sharing" description="Multiple security layers protect your shared content">
            <ul className="text-sm space-y-1">
              <li>✅ Password protection</li>
              <li>✅ Expiration dates</li>
              <li>✅ Download limits</li>
              <li>✅ Access logging</li>
            </ul>
          </Card>
          
          <Card title="Flexible Access" description="Control exactly how recipients interact with files">
            <ul className="text-sm space-y-1">
              <li>✅ View-only mode</li>
              <li>✅ Download permissions</li>
              <li>✅ Folder browsing</li>
              <li>✅ Bulk operations</li>
            </ul>
          </Card>

          <Card title="Analytics & Tracking" description="Monitor how your shared files are accessed">
            <ul className="text-sm space-y-1">
              <li>✅ Access statistics</li>
              <li>✅ Download tracking</li>
              <li>✅ Visitor analytics</li>
              <li>✅ Usage reports</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Sharing Philosophy">
          MegaVault sharing is designed with security-first approach:
          <ul className="mt-2">
            <li>All shares are private by default</li>
            <li>Recipients need the exact link to access content</li>
            <li>No search engine indexing of shared content</li>
            <li>Complete control over access duration and permissions</li>
          </ul>
        </Alert>
      </section>

      <section id="public-links">
        <h2>Public Sharing Links</h2>
        <p>
          Public sharing links provide the easiest way to share files with anyone, whether they have a MegaVault account or not.
        </p>

        <h3>Creating Share Links</h3>
        <ol>
          <li><strong>Select File:</strong> Choose the file or folder you want to share</li>
          <li><strong>Share Option:</strong> Right-click and select "Share" or use the share button</li>
          <li><strong>Generate Link:</strong> Click "Create Public Link" to generate a secure URL</li>
          <li><strong>Configure Options:</strong> Set password, expiration, and access permissions</li>
          <li><strong>Copy & Share:</strong> Copy the link and share it with recipients</li>
        </ol>

        <h3>Link Anatomy</h3>
        <CodeBlock language="text" title="Example Share Link">
{`https://yourdomain.com/share/abc123def456ghi789
                                 └─── Unique file identifier

Complete URL components:
├── Protocol: https:// (always encrypted)
├── Domain: yourdomain.com (your MegaVault instance)
├── Path: /share/ (sharing endpoint)
└── Token: abc123def456ghi789 (unique 18-character ID)`}
        </CodeBlock>

        <h3>Link Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Security Features">
            <ul className="text-sm space-y-1">
              <li><strong>Cryptographically Secure:</strong> Unguessable link tokens</li>
              <li><strong>HTTPS Only:</strong> All links use encrypted connections</li>
              <li><strong>No Indexing:</strong> Links are not discoverable by search engines</li>
              <li><strong>Access Logging:</strong> All access attempts are logged</li>
            </ul>
          </Card>
          
          <Card title="User Experience">
            <ul className="text-sm space-y-1">
              <li><strong>No Login Required:</strong> Recipients don't need accounts</li>
              <li><strong>Responsive Design:</strong> Works perfectly on all devices</li>
              <li><strong>Preview Support:</strong> In-browser preview for many file types</li>
              <li><strong>Batch Downloads:</strong> Download multiple files as ZIP</li>
            </ul>
          </Card>
        </div>

        <h3>Link Management</h3>
        <ul>
          <li><strong>View Active Links:</strong> See all your currently shared links</li>
          <li><strong>Edit Link Settings:</strong> Modify permissions and security options</li>
          <li><strong>Regenerate Links:</strong> Create new link while invalidating old one</li>
          <li><strong>Revoke Access:</strong> Instantly disable link access</li>
          <li><strong>Usage Statistics:</strong> Monitor link access and downloads</li>
        </ul>
      </section>

      <section id="link-security">
        <h2>Link Security Options</h2>
        <p>
          Protect your shared content with multiple security layers that can be combined for maximum protection.
        </p>

        <h3>Available Security Options</h3>
        <ParameterTable parameters={linkOptions} />

        <h3>Password Protection</h3>
        <div className="bg-slate-50 rounded-lg p-6 not-prose">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Password Requirements</h4>
              <ul className="text-sm space-y-1">
                <li><strong>Minimum Length:</strong> 8 characters</li>
                <li><strong>Recommended:</strong> 12+ characters</li>
                <li><strong>Character Types:</strong> Letters, numbers, symbols</li>
                <li><strong>No Dictionary Words:</strong> Avoid common passwords</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Password Features</h4>
              <ul className="text-sm space-y-1">
                <li><strong>One-Time Entry:</strong> Password stored in browser session</li>
                <li><strong>Change Anytime:</strong> Update password without new link</li>
                <li><strong>Remove Protection:</strong> Disable password requirement</li>
                <li><strong>Failed Attempts:</strong> Temporary blocking after failures</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>Expiration Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Preset Durations">
            <ul className="text-sm space-y-1">
              <li><strong>1 Hour:</strong> For urgent, temporary shares</li>
              <li><strong>24 Hours:</strong> Daily collaboration needs</li>
              <li><strong>7 Days:</strong> Weekly project work</li>
              <li><strong>30 Days:</strong> Monthly access periods</li>
              <li><strong>Custom Date:</strong> Specific expiration time</li>
            </ul>
          </Card>
          
          <Card title="Expiration Behavior">
            <ul className="text-sm space-y-1">
              <li><strong>Automatic Disable:</strong> Links stop working at expiration</li>
              <li><strong>Grace Period:</strong> 1-hour warning before expiration</li>
              <li><strong>Extend Access:</strong> Modify expiration before it expires</li>
              <li><strong>Notification:</strong> Email alerts before expiration</li>
            </ul>
          </Card>
        </div>

        <h3>Download Limits</h3>
        <ul>
          <li><strong>Count-Based Limits:</strong> Maximum number of downloads (1, 5, 10, 25, 100)</li>
          <li><strong>User-Based Limits:</strong> Unique users who can download</li>
          <li><strong>Size-Based Limits:</strong> Total bandwidth allocation</li>
          <li><strong>Reset Options:</strong> Reset counters or extend limits</li>
          <li><strong>Exceeded Behavior:</strong> Block access when limits reached</li>
        </ul>

        <Alert type="warning" title="Security Best Practices">
          For sensitive files, always use:
          <ul className="mt-2">
            <li>Strong passwords (12+ characters with mixed types)</li>
            <li>Short expiration times (24-48 hours maximum)</li>
            <li>Download limits appropriate to recipient count</li>
            <li>Regular monitoring of access logs</li>
          </ul>
        </Alert>
      </section>

      <section id="folder-sharing">
        <h2>Folder Sharing</h2>
        <p>
          Share entire folders to provide access to multiple files and maintain organizational structure for recipients.
        </p>

        <h3>Folder Share Features</h3>
        <ul>
          <li><strong>Directory Browsing:</strong> Recipients can navigate folder structure</li>
          <li><strong>Bulk Downloads:</strong> Download entire folders as ZIP archives</li>
          <li><strong>Individual File Access:</strong> Access specific files within folders</li>
          <li><strong>Nested Permissions:</strong> Different permissions for subfolders</li>
          <li><strong>File Previews:</strong> Preview files without downloading</li>
        </ul>

        <h3>Folder Sharing Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Access Modes">
            <ul className="text-sm space-y-1">
              <li><strong>Browse & Download:</strong> Full folder access</li>
              <li><strong>List Only:</strong> See file names, no downloads</li>
              <li><strong>Direct Links:</strong> Access specific files only</li>
              <li><strong>Subfolder Restrictions:</strong> Limit access to certain areas</li>
            </ul>
          </Card>
          
          <Card title="Display Options">
            <ul className="text-sm space-y-1">
              <li><strong>Grid View:</strong> Thumbnail-based file browser</li>
              <li><strong>List View:</strong> Detailed file information table</li>
              <li><strong>Custom Branding:</strong> Add your logo and colors</li>
              <li><strong>Custom Messages:</strong> Welcome text for recipients</li>
            </ul>
          </Card>
        </div>

        <h3>Folder Organization for Sharing</h3>
        <CodeBlock language="text" title="Shared Project Folder Structure">
{`Shared-Project-Alpha/
├── README.txt                    ← Instructions for recipients
├── 01-Project-Overview/
│   ├── Proposal.pdf
│   ├── Timeline.xlsx
│   └── Budget-Summary.pdf
├── 02-Resources/
│   ├── Brand-Assets/
│   │   ├── Logo.png
│   │   └── Style-Guide.pdf
│   └── Templates/
│       ├── Document-Template.docx
│       └── Presentation-Template.pptx
├── 03-Deliverables/
│   ├── Phase-1/
│   ├── Phase-2/
│   └── Final-Delivery/
└── 04-Communication/
    ├── Meeting-Notes/
    └── Email-Archive/`}
        </CodeBlock>
      </section>

      <section id="sharing-permissions">
        <h2>Sharing Permissions</h2>
        <p>
          Control exactly what recipients can do with your shared files and folders through granular permission settings.
        </p>

        <h3>Permission Levels</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Permission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  View/Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Download
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Browse Folders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Bulk Download
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  View Only
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">✓</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">✗</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">✓</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">✗</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Download Files
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">✓</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">✓</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">✓</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">✗</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Full Access
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">✓</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">✓</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">✓</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">✓</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Advanced Permission Settings</h3>
        <ul>
          <li><strong>Watermarking:</strong> Add watermarks to viewed/downloaded content</li>
          <li><strong>Copy Protection:</strong> Prevent right-click saving of images</li>
          <li><strong>Print Restrictions:</strong> Block printing of documents</li>
          <li><strong>Screenshot Prevention:</strong> Disable screenshots in browser</li>
          <li><strong>Geographic Restrictions:</strong> Limit access by location</li>
        </ul>

        <h3>Recipient Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="First-Time Access">
            <ul className="text-sm space-y-1">
              <li><strong>Welcome Screen:</strong> Custom message from sharer</li>
              <li><strong>Access Instructions:</strong> How to use the shared content</li>
              <li><strong>Terms Agreement:</strong> Accept usage terms if required</li>
              <li><strong>Contact Information:</strong> How to reach the file owner</li>
            </ul>
          </Card>
          
          <Card title="Ongoing Access">
            <ul className="text-sm space-y-1">
              <li><strong>Bookmark Support:</strong> Save link for future access</li>
              <li><strong>Mobile Optimization:</strong> Perfect responsive experience</li>
              <li><strong>Progress Tracking:</strong> Download progress indicators</li>
              <li><strong>Error Handling:</strong> Clear error messages and recovery</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="expiration-limits">
        <h2>Expiration and Limits</h2>
        <p>
          Manage the lifecycle of your shared links with automatic expiration and usage limits to maintain security and control costs.
        </p>

        <h3>Expiration Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Time-Based Expiration">
            <ul className="text-sm space-y-1">
              <li><strong>Fixed Duration:</strong> Set specific time periods</li>
              <li><strong>Business Hours:</strong> Access only during work hours</li>
              <li><strong>Weekdays Only:</strong> Exclude weekend access</li>
              <li><strong>Rolling Expiration:</strong> Extend automatically with use</li>
            </ul>
          </Card>
          
          <Card title="Usage-Based Expiration">
            <ul className="text-sm space-y-1">
              <li><strong>Download Limits:</strong> Expire after N downloads</li>
              <li><strong>View Limits:</strong> Expire after N views</li>
              <li><strong>Unique User Limits:</strong> Expire after N different users</li>
              <li><strong>Bandwidth Limits:</strong> Expire after N GB transferred</li>
            </ul>
          </Card>
        </div>

        <h3>Limit Configuration</h3>
        <CodeBlock language="json" title="Example Link Configuration">
{`{
  "expiration": "2024-12-31T23:59:59Z",
  "download_limit": 50,
  "unique_visitors": 10,
  "password_required": true,
  "permissions": {
    "view": true,
    "download": true,
    "bulk_download": false
  },
  "restrictions": {
    "countries": ["US", "CA", "GB"],
    "business_hours_only": true
  }
}`}
        </CodeBlock>

        <h3>Automatic Management</h3>
        <ul>
          <li><strong>Cleanup Jobs:</strong> Automatically remove expired links</li>
          <li><strong>Notification System:</strong> Warn before expiration</li>
          <li><strong>Extension Requests:</strong> Allow recipients to request extensions</li>
          <li><strong>Batch Operations:</strong> Manage multiple links simultaneously</li>
          <li><strong>Audit Trails:</strong> Complete history of link lifecycle</li>
        </ul>

        <Alert type="info" title="Limit Recommendations">
          Choose limits based on your use case:
          <ul className="mt-2">
            <li><strong>Internal Team:</strong> 7-day expiration, 25 downloads</li>
            <li><strong>Client Delivery:</strong> 48-hour expiration, 5 downloads</li>
            <li><strong>Public Resources:</strong> 30-day expiration, unlimited downloads</li>
            <li><strong>Sensitive Data:</strong> 4-hour expiration, 1 download, password required</li>
          </ul>
        </Alert>
      </section>

      <section id="sharing-analytics">
        <h2>Sharing Analytics</h2>
        <p>
          Monitor and analyze how your shared files are being accessed with comprehensive analytics and reporting.
        </p>

        <h3>Access Metrics</h3>
        <ul>
          <li><strong>View Count:</strong> Total number of file views/previews</li>
          <li><strong>Download Count:</strong> Total number of file downloads</li>
          <li><strong>Unique Visitors:</strong> Number of different users accessing files</li>
          <li><strong>Geographic Distribution:</strong> Where your files are being accessed</li>
          <li><strong>Device Types:</strong> Desktop vs mobile vs tablet usage</li>
          <li><strong>Browser Analytics:</strong> Which browsers are used to access files</li>
        </ul>

        <h3>Temporal Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Time-Based Insights">
            <ul className="text-sm space-y-1">
              <li><strong>Hourly Patterns:</strong> Peak access hours</li>
              <li><strong>Daily Trends:</strong> Most active days</li>
              <li><strong>Weekly Cycles:</strong> Business vs weekend usage</li>
              <li><strong>Monthly Overview:</strong> Long-term access trends</li>
            </ul>
          </Card>
          
          <Card title="Performance Metrics">
            <ul className="text-sm space-y-1">
              <li><strong>Download Speed:</strong> Average transfer rates</li>
              <li><strong>Success Rate:</strong> Completed vs failed downloads</li>
              <li><strong>Response Time:</strong> Time to first byte</li>
              <li><strong>Error Rates:</strong> Types and frequency of errors</li>
            </ul>
          </Card>
        </div>

        <h3>Reporting Features</h3>
        <ul>
          <li><strong>Real-Time Dashboard:</strong> Live access monitoring</li>
          <li><strong>Historical Reports:</strong> Access patterns over time</li>
          <li><strong>Export Options:</strong> CSV, PDF, and JSON exports</li>
          <li><strong>Automated Reports:</strong> Scheduled email summaries</li>
          <li><strong>Custom Dashboards:</strong> Create focused views for specific needs</li>
        </ul>

        <h3>Privacy Considerations</h3>
        <ul>
          <li><strong>IP Anonymization:</strong> Hash IP addresses for privacy</li>
          <li><strong>GDPR Compliance:</strong> Respect data protection regulations</li>
          <li><strong>Data Retention:</strong> Configurable analytics data retention</li>
          <li><strong>Opt-Out Options:</strong> Allow recipients to disable tracking</li>
        </ul>
      </section>

      <section id="best-practices">
        <h2>Sharing Best Practices</h2>
        <p>
          Follow these best practices to ensure secure, efficient, and user-friendly file sharing experiences.
        </p>

        <h3>Security Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Access Control">
            <ul className="text-sm space-y-1">
              <li><strong>Principle of Least Privilege:</strong> Grant minimum necessary access</li>
              <li><strong>Time-Limited Access:</strong> Set appropriate expiration times</li>
              <li><strong>Strong Passwords:</strong> Use complex passwords for sensitive files</li>
              <li><strong>Regular Reviews:</strong> Audit active shares monthly</li>
            </ul>
          </Card>
          
          <Card title="Content Protection">
            <ul className="text-sm space-y-1">
              <li><strong>Classify Sensitivity:</strong> Different security for different data</li>
              <li><strong>Watermark Important Files:</strong> Add identification to downloads</li>
              <li><strong>Version Control:</strong> Share specific versions, not live files</li>
              <li><strong>Backup Considerations:</strong> Consider data residency requirements</li>
            </ul>
          </Card>
        </div>

        <h3>User Experience Best Practices</h3>
        <ul>
          <li><strong>Clear File Names:</strong> Use descriptive, professional file names</li>
          <li><strong>Organize Folders:</strong> Structure shared folders logically</li>
          <li><strong>Include Instructions:</strong> Add README files for complex shares</li>
          <li><strong>Test Links:</strong> Always test shares before sending</li>
          <li><strong>Provide Context:</strong> Explain what recipients will find</li>
        </ul>

        <h3>Communication Best Practices</h3>
        <ul>
          <li><strong>Professional Messages:</strong> Include context when sharing links</li>
          <li><strong>Set Expectations:</strong> Explain expiration and limits</li>
          <li><strong>Provide Support:</strong> Include contact information for questions</li>
          <li><strong>Follow Up:</strong> Confirm receipt and successful access</li>
          <li><strong>Document Sharing:</strong> Keep records of what was shared when</li>
        </ul>

        <h3>Compliance and Legal</h3>
        <ul>
          <li><strong>Data Classification:</strong> Follow organizational data handling policies</li>
          <li><strong>Retention Policies:</strong> Respect data retention requirements</li>
          <li><strong>Geographic Restrictions:</strong> Consider data sovereignty laws</li>
          <li><strong>Terms of Use:</strong> Include appropriate usage terms</li>
          <li><strong>Audit Trails:</strong> Maintain records for compliance needs</li>
        </ul>

        <Alert type="success" title="Sharing Success Checklist">
          Before sharing any file, verify:
          <ul className="mt-2">
            <li>✅ File contains only information intended for recipients</li>
            <li>✅ Appropriate security settings are configured</li>
            <li>✅ Expiration date matches business need</li>
            <li>✅ Recipients understand how to access and use the files</li>
            <li>✅ Sharing complies with organizational policies</li>
          </ul>
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/user-guide/account" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Account Settings →</h4>
              <p className="text-blue-800 text-sm">Configure sharing defaults and security preferences</p>
            </Link>
            <Link href="/docs/api/files" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">API Sharing →</h4>
              <p className="text-green-800 text-sm">Programmatic file sharing via REST API</p>
            </Link>
            <Link href="/docs/user-guide/account" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Web Interface →</h4>
              <p className="text-purple-800 text-sm">Responsive web-based file sharing</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}