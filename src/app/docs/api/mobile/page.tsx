import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Mobile API Overview' },
  { id: 'authentication', title: 'Mobile Authentication' },
  { id: 'file-sync', title: 'File Synchronization' },
  { id: 'background-upload', title: 'Background Upload' },
  { id: 'offline-support', title: 'Offline Support' },
  { id: 'push-notifications', title: 'Push Notifications' },
  { id: 'device-management', title: 'Device Management' },
];

export default function MobileAPIPage() {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Mobile API Endpoints</h1>
        <p className="text-xl text-slate-600">
          Specialized API endpoints designed for mobile applications with support for offline sync, 
          background uploads, and push notifications.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Mobile API Overview</h2>
        <p>
          The Mobile API provides specialized endpoints optimized for mobile applications, 
          including features like background sync, offline support, and push notifications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Mobile Optimized" description="Designed for mobile apps">
            <ul className="text-sm space-y-1">
              <li>✅ Reduced payload sizes</li>
              <li>✅ Battery-efficient operations</li>
              <li>✅ Network-aware uploads</li>
              <li>✅ Chunked file transfers</li>
            </ul>
          </Card>
          
          <Card title="Offline Support" description="Work without internet">
            <ul className="text-sm space-y-1">
              <li>✅ Local data caching</li>
              <li>✅ Conflict resolution</li>
              <li>✅ Sync when online</li>
              <li>✅ Queue management</li>
            </ul>
          </Card>

          <Card title="Background Operations" description="Seamless experience">
            <ul className="text-sm space-y-1">
              <li>✅ Background uploads</li>
              <li>✅ Auto-sync scheduling</li>
              <li>✅ Progress tracking</li>
              <li>✅ Retry mechanisms</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Mobile SDK">
          Use the official Flutter SDK for MegaVault to automatically handle mobile-specific 
          authentication, caching, and sync operations.
        </Alert>
      </section>

      <section id="authentication">
        <h2>Mobile Authentication</h2>
        <p>Mobile-specific authentication endpoints with device registration and management.</p>

        <h3>Device Registration</h3>
        <CodeBlock language="http" title="Request">
{`POST /api/mobile/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "deviceInfo": {
    "platform": "android",
    "model": "Pixel 7",
    "osVersion": "14",
    "appVersion": "1.2.0",
    "deviceId": "device_unique_identifier",
    "pushToken": "fcm_token_here"
  }
}`}
        </CodeBlock>

        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "user": {
    "id": "user_123456789",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "tokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "rt_mobile_abc123def456...",
    "expiresIn": "7d"
  },
  "device": {
    "id": "device_987654321",
    "name": "John's Pixel 7",
    "registeredAt": "2024-01-20T15:30:00Z"
  },
  "syncData": {
    "lastSyncAt": null,
    "pendingUploads": 0,
    "cacheSize": 0
  }
}`}
        </CodeBlock>

        <h3>Mobile Token Refresh</h3>
        <CodeBlock language="http" title="Request">
{`POST /api/mobile/auth/refresh
Content-Type: application/json

{
  "refreshToken": "rt_mobile_abc123def456...",
  "deviceId": "device_unique_identifier"
}`}
        </CodeBlock>
      </section>

      <section id="file-sync">
        <h2>File Synchronization</h2>
        <p>Efficient file synchronization with delta updates and conflict resolution.</p>

        <h3>Get Sync Status</h3>
        <CodeBlock language="http" title="Request">
{`GET /api/mobile/sync/status?lastSync=2024-01-20T10:00:00Z
Authorization: Bearer MOBILE_JWT_TOKEN`}
        </CodeBlock>

        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "data": {
    "lastSyncAt": "2024-01-20T14:30:00Z",
    "hasChanges": true,
    "changes": {
      "created": [
        {
          "id": "file_123",
          "name": "document.pdf",
          "folder": "/documents",
          "size": 1024576,
          "modifiedAt": "2024-01-20T12:00:00Z",
          "checksum": "sha256:abc123..."
        }
      ],
      "updated": [],
      "deleted": [
        {
          "id": "file_456",
          "deletedAt": "2024-01-20T13:15:00Z"
        }
      ]
    },
    "conflicts": [],
    "nextSyncToken": "sync_token_xyz789"
  }
}`}
        </CodeBlock>

        <h3>Sync Files</h3>
        <CodeBlock language="http" title="Request">
{`POST /api/mobile/sync/files
Authorization: Bearer MOBILE_JWT_TOKEN
Content-Type: application/json

{
  "syncToken": "sync_token_xyz789",
  "localChanges": [
    {
      "action": "upload",
      "localId": "local_file_123",
      "name": "photo.jpg",
      "folder": "/photos",
      "size": 2048576,
      "checksum": "sha256:def456...",
      "lastModified": "2024-01-20T14:00:00Z"
    }
  ]
}`}
        </CodeBlock>
      </section>

      <section id="background-upload">
        <h2>Background Upload</h2>
        <p>Upload files in the background with progress tracking and retry capabilities.</p>

        <h3>Initialize Upload</h3>
        <CodeBlock language="http" title="Request">
{`POST /api/mobile/upload/init
Authorization: Bearer MOBILE_JWT_TOKEN
Content-Type: application/json

{
  "files": [
    {
      "localId": "local_123",
      "name": "video.mp4",
      "size": 104857600,
      "mimeType": "video/mp4",
      "folder": "/videos",
      "checksum": "sha256:video_hash...",
      "priority": "high"
    }
  ],
  "uploadOptions": {
    "wifiOnly": true,
    "chunkSize": 1048576,
    "maxRetries": 3
  }
}`}
        </CodeBlock>

        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "data": {
    "uploadSession": "session_abc123def456",
    "files": [
      {
        "localId": "local_123",
        "uploadId": "upload_789",
        "uploadUrl": "https://api.example.com/api/mobile/upload/chunk",
        "chunks": [
          {
            "index": 0,
            "start": 0,
            "end": 1048575,
            "uploadUrl": "https://upload.example.com/chunk/0"
          }
        ],
        "totalChunks": 100
      }
    ],
    "expiresAt": "2024-01-20T18:30:00Z"
  }
}`}
        </CodeBlock>

        <h3>Upload Progress</h3>
        <CodeBlock language="http" title="Request">
{`POST /api/mobile/upload/progress
Authorization: Bearer MOBILE_JWT_TOKEN
Content-Type: application/json

{
  "uploadId": "upload_789",
  "completedChunks": [0, 1, 2, 3],
  "bytesUploaded": 4194304,
  "status": "uploading"
}`}
        </CodeBlock>

        <h3>Complete Upload</h3>
        <CodeBlock language="http" title="Request">
{`POST /api/mobile/upload/complete
Authorization: Bearer MOBILE_JWT_TOKEN
Content-Type: application/json

{
  "uploadId": "upload_789",
  "checksum": "sha256:final_hash...",
  "metadata": {
    "location": "37.7749,-122.4194",
    "capturedAt": "2024-01-20T14:30:00Z"
  }
}`}
        </CodeBlock>
      </section>

      <section id="offline-support">
        <h2>Offline Support</h2>
        <p>APIs for managing offline data, conflict resolution, and sync queues.</p>

        <h3>Queue Operations</h3>
        <CodeBlock language="http" title="Add to Queue Request">
{`POST /api/mobile/queue/add
Authorization: Bearer MOBILE_JWT_TOKEN
Content-Type: application/json

{
  "operations": [
    {
      "id": "op_123",
      "type": "upload",
      "localPath": "/storage/photos/IMG_001.jpg",
      "remotePath": "/photos/IMG_001.jpg",
      "priority": "normal",
      "createdAt": "2024-01-20T15:00:00Z"
    },
    {
      "id": "op_124",
      "type": "delete",
      "fileId": "file_456",
      "priority": "low",
      "createdAt": "2024-01-20T15:01:00Z"
    }
  ]
}`}
        </CodeBlock>

        <h3>Conflict Resolution</h3>
        <CodeBlock language="http" title="Resolve Conflicts Request">
{`POST /api/mobile/conflicts/resolve
Authorization: Bearer MOBILE_JWT_TOKEN
Content-Type: application/json

{
  "conflicts": [
    {
      "conflictId": "conflict_123",
      "resolution": "keep_remote",
      "fileId": "file_789"
    },
    {
      "conflictId": "conflict_124",
      "resolution": "keep_local",
      "fileId": "file_890",
      "localData": {
        "name": "updated_name.pdf",
        "modifiedAt": "2024-01-20T14:45:00Z"
      }
    }
  ]
}`}
        </CodeBlock>
      </section>

      <section id="push-notifications">
        <h2>Push Notifications</h2>
        <p>Manage push notifications for file activities, sharing, and system updates.</p>

        <h3>Register for Notifications</h3>
        <CodeBlock language="http" title="Request">
{`POST /api/mobile/notifications/register
Authorization: Bearer MOBILE_JWT_TOKEN
Content-Type: application/json

{
  "deviceId": "device_unique_identifier",
  "pushToken": "fcm_or_apns_token_here",
  "platform": "android",
  "preferences": {
    "uploads": true,
    "shares": true,
    "storage": true,
    "security": true,
    "quietHours": {
      "enabled": true,
      "start": "22:00",
      "end": "07:00",
      "timezone": "America/Los_Angeles"
    }
  }
}`}
        </CodeBlock>

        <h3>Notification Categories</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Example</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">uploads</td>
                <td className="px-6 py-4 text-sm text-slate-600">Upload completion or failures</td>
                <td className="px-6 py-4 text-sm text-slate-600">"Photo upload completed"</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">shares</td>
                <td className="px-6 py-4 text-sm text-slate-600">File sharing notifications</td>
                <td className="px-6 py-4 text-sm text-slate-600">"John shared a file with you"</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">storage</td>
                <td className="px-6 py-4 text-sm text-slate-600">Storage quota warnings</td>
                <td className="px-6 py-4 text-sm text-slate-600">"Storage 90% full"</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">security</td>
                <td className="px-6 py-4 text-sm text-slate-600">Security-related alerts</td>
                <td className="px-6 py-4 text-sm text-slate-600">"New device login detected"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="device-management">
        <h2>Device Management</h2>
        <p>Manage registered devices, sessions, and device-specific settings.</p>

        <h3>List Devices</h3>
        <CodeBlock language="http" title="Request">
{`GET /api/mobile/devices
Authorization: Bearer MOBILE_JWT_TOKEN`}
        </CodeBlock>

        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "data": {
    "devices": [
      {
        "id": "device_123",
        "name": "John's iPhone",
        "platform": "ios",
        "model": "iPhone 15 Pro",
        "osVersion": "17.2",
        "appVersion": "1.2.0",
        "registeredAt": "2024-01-15T10:30:00Z",
        "lastActiveAt": "2024-01-20T14:30:00Z",
        "isCurrent": true,
        "settings": {
          "autoUpload": true,
          "backgroundSync": true,
          "wifiOnly": true
        }
      },
      {
        "id": "device_456",
        "name": "John's Pixel",
        "platform": "android",
        "model": "Pixel 7",
        "osVersion": "14",
        "appVersion": "1.1.5",
        "registeredAt": "2024-01-10T08:15:00Z",
        "lastActiveAt": "2024-01-19T16:45:00Z",
        "isCurrent": false,
        "settings": {
          "autoUpload": false,
          "backgroundSync": true,
          "wifiOnly": false
        }
      }
    ],
    "currentDevice": "device_123"
  }
}`}
        </CodeBlock>

        <h3>Update Device Settings</h3>
        <CodeBlock language="http" title="Request">
{`PUT /api/mobile/devices/device_123/settings
Authorization: Bearer MOBILE_JWT_TOKEN
Content-Type: application/json

{
  "autoUpload": true,
  "backgroundSync": true,
  "wifiOnly": true,
  "uploadQuality": "original",
  "syncFolders": ["/photos", "/documents"],
  "maxCacheSize": 1073741824
}`}
        </CodeBlock>

        <h3>Remove Device</h3>
        <CodeBlock language="http" title="Request">
{`DELETE /api/mobile/devices/device_456
Authorization: Bearer MOBILE_JWT_TOKEN`}
        </CodeBlock>

        <Alert type="warning" title="Device Limit">
          Free accounts can register up to 3 devices. Pro accounts support up to 10 devices. 
          Enterprise accounts have no device limits.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/mobile" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Mobile App Guide →</h4>
              <p className="text-blue-800 text-sm">Complete mobile app documentation</p>
            </Link>
            <Link href="/docs/api/authentication" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">Authentication →</h4>
              <p className="text-green-800 text-sm">Mobile authentication flows</p>
            </Link>
            <Link href="/docs/api/files" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">File Management →</h4>
              <p className="text-purple-800 text-sm">File operations from mobile</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}