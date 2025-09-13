import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'User Management Overview' },
  { id: 'get-profile', title: 'Get User Profile' },
  { id: 'update-profile', title: 'Update Profile' },
  { id: 'get-usage', title: 'Get Usage Statistics' },
  { id: 'update-settings', title: 'Update Settings' },
  { id: 'change-password', title: 'Change Password' },
  { id: 'delete-account', title: 'Delete Account' },
];

export default function UserManagementAPIPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">User Management API</h1>
        <p className="text-xl text-slate-600">
          Complete reference for user profile management, settings, usage statistics, and account operations.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>User Management Overview</h2>
        <p>
          The User Management API provides functionality for managing user profiles, settings, 
          storage usage, and account operations in MegaVault.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Profile Management" description="User information">
            <ul className="text-sm space-y-1">
              <li>✅ Profile information</li>
              <li>✅ Avatar management</li>
              <li>✅ Contact details</li>
              <li>✅ Account preferences</li>
            </ul>
          </Card>
          
          <Card title="Usage Analytics" description="Storage and activity">
            <ul className="text-sm space-y-1">
              <li>✅ Storage usage tracking</li>
              <li>✅ File upload statistics</li>
              <li>✅ Activity logs</li>
              <li>✅ Quota management</li>
            </ul>
          </Card>

          <Card title="Account Security" description="Security settings">
            <ul className="text-sm space-y-1">
              <li>✅ Password management</li>
              <li>✅ Session management</li>
              <li>✅ Privacy settings</li>
              <li>✅ Account deletion</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Authentication Required">
          All user management endpoints require authentication. Users can only access and modify their own data.
        </Alert>
      </section>

      <section id="get-profile">
        <h2>Get User Profile</h2>
        <p>Retrieve the current user's profile information and account details.</p>

        <CodeBlock language="http" title="Request">
{`GET /api/users/profile
Authorization: Bearer YOUR_JWT_TOKEN`}
        </CodeBlock>

        <h3>Response</h3>
        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "data": {
    "id": "user_123456789",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://storage.example.com/avatars/user_123456789.jpg",
    "bio": "Cloud storage enthusiast and developer",
    "location": "San Francisco, CA",
    "website": "https://johndoe.dev",
    "plan": {
      "type": "pro",
      "name": "Pro Plan",
      "storageLimit": 107374182400,
      "features": ["unlimited_uploads", "advanced_sharing", "priority_support"]
    },
    "preferences": {
      "theme": "dark",
      "language": "en",
      "timezone": "America/Los_Angeles",
      "notifications": {
        "email": true,
        "push": true,
        "uploads": true,
        "sharing": true
      }
    },
    "stats": {
      "filesCount": 1247,
      "foldersCount": 89,
      "storageUsed": 5368709120,
      "totalUploads": 2456,
      "lastLoginAt": "2024-01-20T14:30:00Z"
    },
    "createdAt": "2023-06-15T10:30:00Z",
    "emailVerified": true,
    "isActive": true
  }
}`}
        </CodeBlock>
      </section>

      <section id="update-profile">
        <h2>Update Profile</h2>
        <p>Update user profile information including personal details and preferences.</p>

        <CodeBlock language="http" title="Request">
{`PUT /api/users/profile
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "John Smith",
  "bio": "Full-stack developer and cloud enthusiast",
  "location": "New York, NY",
  "website": "https://johnsmith.dev",
  "preferences": {
    "theme": "light",
    "language": "en",
    "timezone": "America/New_York"
  }
}`}
        </CodeBlock>

        <h3>Response</h3>
        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "data": {
    "id": "user_123456789",
    "name": "John Smith",
    "bio": "Full-stack developer and cloud enthusiast",
    "location": "New York, NY",
    "website": "https://johnsmith.dev",
    "preferences": {
      "theme": "light",
      "language": "en",
      "timezone": "America/New_York"
    },
    "updatedAt": "2024-01-20T15:45:00Z"
  },
  "message": "Profile updated successfully"
}`}
        </CodeBlock>

        <h3>Updatable Fields</h3>
        <ul>
          <li><strong>name:</strong> Display name (2-50 characters)</li>
          <li><strong>bio:</strong> Profile bio (max 200 characters)</li>
          <li><strong>location:</strong> Location information (optional)</li>
          <li><strong>website:</strong> Personal website URL (optional)</li>
          <li><strong>preferences:</strong> User preferences object</li>
        </ul>

        <h3>Upload Avatar</h3>
        <CodeBlock language="http" title="Avatar Upload Request">
{`POST /api/users/avatar
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data

Form Data:
avatar: [IMAGE_FILE]`}
        </CodeBlock>

        <CodeBlock language="json" title="Avatar Upload Response">
{`{
  "success": true,
  "data": {
    "avatarUrl": "https://storage.example.com/avatars/user_123456789.jpg",
    "updatedAt": "2024-01-20T16:00:00Z"
  },
  "message": "Avatar updated successfully"
}`}
        </CodeBlock>
      </section>

      <section id="get-usage">
        <h2>Get Usage Statistics</h2>
        <p>Retrieve detailed storage usage and activity statistics for the current user.</p>

        <CodeBlock language="http" title="Request">
{`GET /api/users/usage?period=30d
Authorization: Bearer YOUR_JWT_TOKEN`}
        </CodeBlock>

        <h3>Query Parameters</h3>
        <ul>
          <li><strong>period:</strong> Time period for statistics (7d, 30d, 90d, 1y) - default: 30d</li>
          <li><strong>detailed:</strong> Include detailed breakdown (true/false) - default: false</li>
        </ul>

        <h3>Response</h3>
        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "data": {
    "period": "30d",
    "storage": {
      "used": 5368709120,
      "limit": 107374182400,
      "usagePercentage": 5.0,
      "breakdown": {
        "documents": 2147483648,
        "images": 1610612736,
        "videos": 1073741824,
        "audio": 268435456,
        "other": 268435456
      }
    },
    "activity": {
      "uploads": {
        "count": 45,
        "totalSize": 536870912,
        "avgSize": 11930464
      },
      "downloads": {
        "count": 123,
        "totalSize": 2147483648
      },
      "shares": {
        "created": 8,
        "accessed": 156
      },
      "deletions": {
        "count": 12,
        "reclaimedSpace": 134217728
      }
    },
    "trends": {
      "dailyUploads": [
        {"date": "2024-01-01", "count": 2, "size": 10485760},
        {"date": "2024-01-02", "count": 5, "size": 52428800}
      ],
      "storageGrowth": [
        {"date": "2024-01-01", "size": 5100000000},
        {"date": "2024-01-20", "size": 5368709120}
      ]
    },
    "generatedAt": "2024-01-20T16:30:00Z"
  }
}`}
        </CodeBlock>
      </section>

      <section id="update-settings">
        <h2>Update Settings</h2>
        <p>Update user account settings including notifications, privacy, and app preferences.</p>

        <CodeBlock language="http" title="Request">
{`PUT /api/users/settings
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "notifications": {
    "email": true,
    "push": false,
    "uploads": true,
    "sharing": true,
    "storage": true,
    "security": true
  },
  "privacy": {
    "publicProfile": false,
    "showActivity": false,
    "allowIndexing": false
  },
  "app": {
    "autoUpload": true,
    "compressionEnabled": true,
    "thumbnailGeneration": true,
    "defaultFolder": "/uploads"
  }
}`}
        </CodeBlock>

        <h3>Response</h3>
        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "data": {
    "notifications": {
      "email": true,
      "push": false,
      "uploads": true,
      "sharing": true,
      "storage": true,
      "security": true
    },
    "privacy": {
      "publicProfile": false,
      "showActivity": false,
      "allowIndexing": false
    },
    "app": {
      "autoUpload": true,
      "compressionEnabled": true,
      "thumbnailGeneration": true,
      "defaultFolder": "/uploads"
    },
    "updatedAt": "2024-01-20T17:00:00Z"
  },
  "message": "Settings updated successfully"
}`}
        </CodeBlock>

        <h3>Settings Categories</h3>
        <ul>
          <li><strong>notifications:</strong> Email and push notification preferences</li>
          <li><strong>privacy:</strong> Profile visibility and data sharing settings</li>
          <li><strong>app:</strong> Application behavior and feature settings</li>
        </ul>
      </section>

      <section id="change-password">
        <h2>Change Password</h2>
        <p>Update the user's account password with proper verification.</p>

        <CodeBlock language="http" title="Request">
{`PUT /api/users/password
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "currentPassword": "currentSecurePassword123",
  "newPassword": "newSecurePassword456",
  "confirmPassword": "newSecurePassword456"
}`}
        </CodeBlock>

        <h3>Response</h3>
        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "message": "Password updated successfully",
  "data": {
    "passwordChangedAt": "2024-01-20T17:15:00Z",
    "sessionInvalidated": true
  }
}`}
        </CodeBlock>

        <h3>Password Requirements</h3>
        <ul>
          <li><strong>Length:</strong> Minimum 8 characters</li>
          <li><strong>Complexity:</strong> Must include uppercase, lowercase, and numbers</li>
          <li><strong>Verification:</strong> Current password must be provided</li>
          <li><strong>Confirmation:</strong> New password must be confirmed</li>
        </ul>

        <Alert type="warning" title="Session Invalidation">
          Changing password will invalidate all existing sessions except the current one. 
          Users will need to log in again on other devices.
        </Alert>
      </section>

      <section id="delete-account">
        <h2>Delete Account</h2>
        <p>Permanently delete the user account and all associated data.</p>

        <CodeBlock language="http" title="Request">
{`DELETE /api/users/account
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "password": "userPassword123",
  "confirmation": "DELETE_MY_ACCOUNT",
  "reason": "No longer needed"
}`}
        </CodeBlock>

        <h3>Response</h3>
        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "message": "Account scheduled for deletion",
  "data": {
    "scheduledDeletionAt": "2024-01-27T17:30:00Z",
    "gracePeriodEnds": "2024-01-27T17:30:00Z",
    "recoveryCode": "recovery_abc123def456"
  }
}`}
        </CodeBlock>

        <h3>Account Deletion Process</h3>
        <ol>
          <li><strong>Verification:</strong> Password and confirmation text required</li>
          <li><strong>Grace Period:</strong> 7-day grace period before permanent deletion</li>
          <li><strong>Data Removal:</strong> All files, folders, and user data will be deleted</li>
          <li><strong>Recovery:</strong> Account can be recovered during grace period</li>
        </ol>

        <h3>Recover Deleted Account</h3>
        <CodeBlock language="http" title="Recovery Request">
{`POST /api/users/recover
Content-Type: application/json

{
  "email": "user@example.com",
  "recoveryCode": "recovery_abc123def456"
}`}
        </CodeBlock>

        <Alert type="error" title="Permanent Deletion Warning">
          Account deletion is irreversible after the grace period. All files, settings, 
          and user data will be permanently removed and cannot be recovered.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/api/authentication" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Authentication →</h4>
              <p className="text-blue-800 text-sm">User authentication and sessions</p>
            </Link>
            <Link href="/docs/api/files" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">File Management →</h4>
              <p className="text-green-800 text-sm">User file operations and quotas</p>
            </Link>
            <Link href="/docs/api/errors" className="block p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
              <h4 className="font-semibold text-red-900 mb-2">Error Handling →</h4>
              <p className="text-red-800 text-sm">Handle user management errors</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}