import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Account Settings Overview' },
  { id: 'profile-settings', title: 'Profile Settings' },
  { id: 'security-settings', title: 'Security Settings' },
  { id: 'storage-management', title: 'Storage Management' },
  { id: 'notification-preferences', title: 'Notification Preferences' },
  { id: 'privacy-settings', title: 'Privacy Settings' },
  { id: 'api-access', title: 'API Access' },
  { id: 'account-management', title: 'Account Management' },
];

export default function AccountPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Account Settings</h1>
        <p className="text-xl text-slate-600">
          Manage your MegaVault account, security preferences, storage settings, and personalization options.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Account Settings Overview</h2>
        <p>
          Your account settings control how MegaVault behaves, your security preferences, 
          and how you interact with the platform. Properly configured settings enhance both 
          security and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Profile & Preferences" description="Customize your MegaVault experience">
            <ul className="text-sm space-y-1">
              <li>✅ Display preferences</li>
              <li>✅ Language settings</li>
              <li>✅ Time zone configuration</li>
              <li>✅ Theme selection</li>
            </ul>
          </Card>
          
          <Card title="Security & Privacy" description="Control access and data protection">
            <ul className="text-sm space-y-1">
              <li>✅ Password management</li>
              <li>✅ Two-factor authentication</li>
              <li>✅ Session management</li>
              <li>✅ Privacy controls</li>
            </ul>
          </Card>

          <Card title="Storage & Usage" description="Monitor and manage your storage">
            <ul className="text-sm space-y-1">
              <li>✅ Usage analytics</li>
              <li>✅ Storage quotas</li>
              <li>✅ File type distribution</li>
              <li>✅ Cleanup suggestions</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="profile-settings">
        <h2>Profile Settings</h2>
        <p>
          Personalize your MegaVault experience with profile customization and display preferences.
        </p>

        <h3>Basic Profile Information</h3>
        <ul>
          <li><strong>Display Name:</strong> How your name appears in shared files and activity logs</li>
          <li><strong>Email Address:</strong> Primary email for notifications and account recovery</li>
          <li><strong>Profile Picture:</strong> Avatar image for your account</li>
          <li><strong>Contact Information:</strong> Optional phone number and address</li>
        </ul>

        <h3>Display Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Interface Settings">
            <ul className="text-sm space-y-1">
              <li><strong>Language:</strong> Choose interface language</li>
              <li><strong>Theme:</strong> Light, dark, or system preference</li>
              <li><strong>Density:</strong> Compact or comfortable layout</li>
              <li><strong>Font Size:</strong> Adjust text size for accessibility</li>
            </ul>
          </Card>
          
          <Card title="File Browser Settings">
            <ul className="text-sm space-y-1">
              <li><strong>Default View:</strong> Grid or list view</li>
              <li><strong>Items Per Page:</strong> Number of files displayed</li>
              <li><strong>Sort Preference:</strong> Default file sorting</li>
              <li><strong>Thumbnail Size:</strong> Preview image size</li>
            </ul>
          </Card>
        </div>

        <h3>Regional Settings</h3>
        <ul>
          <li><strong>Time Zone:</strong> Affects file timestamps and activity logs</li>
          <li><strong>Date Format:</strong> How dates are displayed (MM/DD/YYYY, DD/MM/YYYY, etc.)</li>
          <li><strong>Number Format:</strong> File size display format</li>
          <li><strong>First Day of Week:</strong> Sunday or Monday</li>
        </ul>
      </section>

      <section id="security-settings">
        <h2>Security Settings</h2>
        <p>
          Protect your account with strong authentication and security monitoring features.
        </p>

        <h3>Password Security</h3>
        <div className="bg-slate-50 rounded-lg p-6 not-prose">
          <h4 className="font-semibold text-slate-900 mb-3">Password Requirements</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Minimum Length:</strong> 8 characters</li>
            <li><strong>Recommended:</strong> 12+ characters</li>
            <li><strong>Character Types:</strong> Uppercase, lowercase, numbers, symbols</li>
            <li><strong>History:</strong> Cannot reuse last 5 passwords</li>
            <li><strong>Expiration:</strong> Optional periodic password updates</li>
          </ul>
        </div>

        <h3>Two-Factor Authentication (2FA)</h3>
        <ul>
          <li><strong>Authenticator Apps:</strong> Google Authenticator, Authy, 1Password</li>
          <li><strong>SMS Backup:</strong> Phone number for emergency access</li>
          <li><strong>Recovery Codes:</strong> One-time backup codes</li>
          <li><strong>Trusted Devices:</strong> Remember devices to reduce prompts</li>
        </ul>

        <h3>Session Management</h3>
        <ul>
          <li><strong>Active Sessions:</strong> View all logged-in devices and locations</li>
          <li><strong>Session Timeout:</strong> Automatic logout after inactivity</li>
          <li><strong>Concurrent Sessions:</strong> Limit number of simultaneous logins</li>
          <li><strong>Remote Logout:</strong> Sign out from all devices remotely</li>
        </ul>

        <h3>Security Monitoring</h3>
        <ul>
          <li><strong>Login Alerts:</strong> Notifications for new device logins</li>
          <li><strong>Failed Login Tracking:</strong> Monitor authentication attempts</li>
          <li><strong>IP Restrictions:</strong> Limit access to specific IP ranges</li>
          <li><strong>Security Log:</strong> Complete audit trail of security events</li>
        </ul>

        <Alert type="warning" title="Security Best Practices">
          For maximum account security:
          <ul className="mt-2">
            <li>Enable two-factor authentication</li>
            <li>Use a unique, strong password</li>
            <li>Regularly review active sessions</li>
            <li>Monitor login alerts carefully</li>
          </ul>
        </Alert>
      </section>

      <section id="storage-management">
        <h2>Storage Management</h2>
        <p>
          Monitor your storage usage, understand file distribution, and optimize your space allocation.
        </p>

        <h3>Storage Overview</h3>
        <ul>
          <li><strong>Total Used:</strong> Current storage consumption</li>
          <li><strong>Available Space:</strong> Remaining storage capacity</li>
          <li><strong>File Count:</strong> Total number of files stored</li>
          <li><strong>Average File Size:</strong> Mean file size across your storage</li>
        </ul>

        <h3>Storage Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="File Type Distribution">
            <ul className="text-sm space-y-1">
              <li><strong>Documents:</strong> Percentage and total size</li>
              <li><strong>Images:</strong> Photo and graphic file usage</li>
              <li><strong>Videos:</strong> Video content storage impact</li>
              <li><strong>Archives:</strong> Compressed file allocation</li>
            </ul>
          </Card>
          
          <Card title="Usage Trends">
            <ul className="text-sm space-y-1">
              <li><strong>Daily Growth:</strong> Average daily storage increase</li>
              <li><strong>Upload Patterns:</strong> Peak usage times</li>
              <li><strong>Large Files:</strong> Files consuming most space</li>
              <li><strong>Old Files:</strong> Files not accessed recently</li>
            </ul>
          </Card>
        </div>

        <h3>Storage Optimization</h3>
        <ul>
          <li><strong>Duplicate Detection:</strong> Find and remove duplicate files</li>
          <li><strong>Large File Analysis:</strong> Identify space-consuming files</li>
          <li><strong>Cleanup Suggestions:</strong> AI-powered recommendations</li>
          <li><strong>Archive Recommendations:</strong> Files suitable for archiving</li>
        </ul>

        <h3>Quota Management</h3>
        <CodeBlock language="text" title="Storage Alerts Configuration">
{`Warning Levels:
├── 70% Usage → Yellow warning indicator
├── 85% Usage → Orange alert with cleanup suggestions
├── 95% Usage → Red alert with upload restrictions
└── 100% Usage → Upload blocking until space freed`}
        </CodeBlock>
      </section>

      <section id="notification-preferences">
        <h2>Notification Preferences</h2>
        <p>
          Control how and when MegaVault sends you notifications about account activity and system events.
        </p>

        <h3>Notification Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Account Notifications">
            <ul className="text-sm space-y-1">
              <li><strong>Security Alerts:</strong> Login attempts, password changes</li>
              <li><strong>Storage Warnings:</strong> Usage approaching limits</li>
              <li><strong>System Updates:</strong> Platform maintenance and features</li>
              <li><strong>Policy Changes:</strong> Terms of service updates</li>
            </ul>
          </Card>
          
          <Card title="Activity Notifications">
            <ul className="text-sm space-y-1">
              <li><strong>File Sharing:</strong> When files are accessed or downloaded</li>
              <li><strong>Upload Complete:</strong> Large file upload completion</li>
              <li><strong>Share Expiration:</strong> Shared links about to expire</li>
              <li><strong>Collaboration:</strong> Team activity in shared folders</li>
            </ul>
          </Card>
        </div>

        <h3>Delivery Preferences</h3>
        <ul>
          <li><strong>Email Notifications:</strong> Detailed email summaries</li>
          <li><strong>In-App Notifications:</strong> Dashboard notification center</li>
          <li><strong>Browser Notifications:</strong> Real-time desktop alerts</li>
          <li><strong>PWA Notifications:</strong> Progressive web app notifications</li>
        </ul>

        <h3>Frequency Settings</h3>
        <ul>
          <li><strong>Immediate:</strong> Real-time notifications for critical events</li>
          <li><strong>Daily Digest:</strong> Summary of daily activity</li>
          <li><strong>Weekly Summary:</strong> Comprehensive weekly report</li>
          <li><strong>Do Not Disturb:</strong> Quiet hours configuration</li>
        </ul>
      </section>

      <section id="privacy-settings">
        <h2>Privacy Settings</h2>
        <p>
          Control how your data is used, shared, and processed within MegaVault.
        </p>

        <h3>Data Usage Controls</h3>
        <ul>
          <li><strong>Analytics Participation:</strong> Opt-in/out of usage analytics</li>
          <li><strong>Crash Reporting:</strong> Help improve MegaVault with error reports</li>
          <li><strong>Feature Usage:</strong> Share usage patterns for product improvement</li>
          <li><strong>Performance Metrics:</strong> Contribute to performance optimization</li>
        </ul>

        <h3>Sharing Privacy</h3>
        <ul>
          <li><strong>Default Share Permissions:</strong> Standard permissions for new shares</li>
          <li><strong>Share Analytics:</strong> Track access to your shared files</li>
          <li><strong>Public Link Defaults:</strong> Default expiration and password settings</li>
          <li><strong>Collaboration Visibility:</strong> Control who can see your activity</li>
        </ul>

        <h3>Data Retention</h3>
        <ul>
          <li><strong>Activity Logs:</strong> How long to keep access logs</li>
          <li><strong>Deleted Files:</strong> Trash retention period</li>
          <li><strong>Share History:</strong> Historical sharing data retention</li>
          <li><strong>Search History:</strong> Search query retention period</li>
        </ul>
      </section>

      <section id="api-access">
        <h2>API Access</h2>
        <p>
          Generate and manage API tokens for programmatic access to your MegaVault account.
        </p>

        <h3>API Token Management</h3>
        <ul>
          <li><strong>Personal Access Tokens:</strong> Full account access tokens</li>
          <li><strong>Limited Scope Tokens:</strong> Restricted permission tokens</li>
          <li><strong>Application Tokens:</strong> Tokens for specific applications</li>
          <li><strong>Temporary Tokens:</strong> Short-lived access tokens</li>
        </ul>

        <h3>Token Security</h3>
        <div className="bg-slate-50 rounded-lg p-6 not-prose">
          <h4 className="font-semibold text-slate-900 mb-3">Token Best Practices</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Minimal Permissions:</strong> Grant only necessary permissions</li>
            <li><strong>Regular Rotation:</strong> Rotate tokens periodically</li>
            <li><strong>Secure Storage:</strong> Store tokens securely in applications</li>
            <li><strong>Monitor Usage:</strong> Track token usage for anomalies</li>
            <li><strong>Revoke Unused:</strong> Remove tokens no longer needed</li>
          </ul>
        </div>

        <h3>API Usage Monitoring</h3>
        <ul>
          <li><strong>Request Volume:</strong> Track API calls per token</li>
          <li><strong>Rate Limiting:</strong> Monitor rate limit consumption</li>
          <li><strong>Error Rates:</strong> Identify problematic integrations</li>
          <li><strong>Usage Patterns:</strong> Understand API consumption trends</li>
        </ul>
      </section>

      <section id="account-management">
        <h2>Account Management</h2>
        <p>
          Manage your account lifecycle, data exports, and account closure options.
        </p>

        <h3>Data Export</h3>
        <ul>
          <li><strong>Complete Export:</strong> Download all files and metadata</li>
          <li><strong>Selective Export:</strong> Export specific folders or file types</li>
          <li><strong>Metadata Export:</strong> Export sharing data and activity logs</li>
          <li><strong>Format Options:</strong> ZIP archives, structured data formats</li>
        </ul>

        <h3>Account Status</h3>
        <ul>
          <li><strong>Account Type:</strong> Individual, business, or enterprise</li>
          <li><strong>Subscription Status:</strong> Active, trial, or expired</li>
          <li><strong>Storage Plan:</strong> Current storage allocation</li>
          <li><strong>Feature Access:</strong> Available features and limitations</li>
        </ul>

        <h3>Account Closure</h3>
        <ul>
          <li><strong>Temporary Suspension:</strong> Temporarily disable account</li>
          <li><strong>Data Deletion:</strong> Permanently delete all account data</li>
          <li><strong>Account Closure:</strong> Close account while preserving data</li>
          <li><strong>Grace Period:</strong> Recovery options after closure</li>
        </ul>

        <Alert type="error" title="Account Deletion Warning">
          Account deletion is permanent and cannot be undone:
          <ul className="mt-2">
            <li>All files and folders will be permanently deleted</li>
            <li>Shared links will stop working immediately</li>
            <li>API tokens will be revoked</li>
            <li>Recovery is not possible after confirmation</li>
          </ul>
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/user-guide/sharing" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">File Sharing →</h4>
              <p className="text-blue-800 text-sm">Configure sharing defaults and security</p>
            </Link>
            <Link href="/docs/api/authentication" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">API Authentication →</h4>
              <p className="text-green-800 text-sm">Learn about API token usage</p>
            </Link>
            <Link href="/docs/admin/monitoring" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Security Monitoring →</h4>
              <p className="text-purple-800 text-sm">Advanced security features</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}