import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'File Management Overview' },
  { id: 'list-files', title: 'List Files' },
  { id: 'upload-file', title: 'Upload File' },
  { id: 'get-file', title: 'Get File Info' },
  { id: 'download-file', title: 'Download File' },
  { id: 'update-file', title: 'Update File' },
  { id: 'delete-file', title: 'Delete File' },
  { id: 'folder-operations', title: 'Folder Operations' },
];

export default function FileManagementAPIPage() {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">File Management API</h1>
        <p className="text-xl text-slate-600">
          Complete reference for file upload, download, organization, and management operations in MegaVault.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>File Management Overview</h2>
        <p>
          The File Management API provides comprehensive functionality for handling files, 
          including upload, download, organization, metadata management, and sharing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="File Operations" description="Core file management">
            <ul className="text-sm space-y-1">
              <li>✅ Upload files (multipart)</li>
              <li>✅ Download files</li>
              <li>✅ File metadata management</li>
              <li>✅ File versioning</li>
            </ul>
          </Card>
          
          <Card title="Organization" description="File structure management">
            <ul className="text-sm space-y-1">
              <li>✅ Folder creation/management</li>
              <li>✅ File moving/copying</li>
              <li>✅ Tagging and categorization</li>
              <li>✅ Search and filtering</li>
            </ul>
          </Card>

          <Card title="Sharing & Security" description="Access control">
            <ul className="text-sm space-y-1">
              <li>✅ Public/private files</li>
              <li>✅ Share links generation</li>
              <li>✅ Access permissions</li>
              <li>✅ Expiring links</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Authentication Required">
          All file management endpoints require authentication. Include the JWT token in the Authorization header.
        </Alert>
      </section>

      <section id="list-files">
        <h2>List Files</h2>
        <p>Retrieve a list of files and folders with pagination, filtering, and sorting options.</p>

        <CodeBlock language="http" title="Request">
{`GET /api/files?folder=/documents&page=1&limit=20&sort=name&order=asc
Authorization: Bearer YOUR_JWT_TOKEN`}
        </CodeBlock>

        <h3>Query Parameters</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Parameter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">folder</td>
                <td className="px-6 py-4 text-sm text-slate-600">string</td>
                <td className="px-6 py-4 text-sm text-slate-600">Folder path (default: "/")</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">page</td>
                <td className="px-6 py-4 text-sm text-slate-600">number</td>
                <td className="px-6 py-4 text-sm text-slate-600">Page number (default: 1)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">limit</td>
                <td className="px-6 py-4 text-sm text-slate-600">number</td>
                <td className="px-6 py-4 text-sm text-slate-600">Items per page (default: 20, max: 100)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">sort</td>
                <td className="px-6 py-4 text-sm text-slate-600">string</td>
                <td className="px-6 py-4 text-sm text-slate-600">Sort field: name, size, createdAt, modifiedAt</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">order</td>
                <td className="px-6 py-4 text-sm text-slate-600">string</td>
                <td className="px-6 py-4 text-sm text-slate-600">Sort order: asc, desc</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-slate-900">search</td>
                <td className="px-6 py-4 text-sm text-slate-600">string</td>
                <td className="px-6 py-4 text-sm text-slate-600">Search query for file names</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Response</h3>
        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "data": {
    "files": [
      {
        "id": "file_123456789",
        "name": "document.pdf",
        "type": "file",
        "mimeType": "application/pdf",
        "size": 2048576,
        "folder": "/documents",
        "url": "https://storage.example.com/files/document.pdf",
        "thumbnailUrl": "https://storage.example.com/thumbnails/document.jpg",
        "createdAt": "2024-01-15T10:30:00Z",
        "modifiedAt": "2024-01-16T14:20:00Z",
        "isPublic": false,
        "tags": ["important", "work"],
        "metadata": {
          "description": "Project specification document"
        }
      },
      {
        "id": "folder_987654321",
        "name": "images",
        "type": "folder",
        "folder": "/documents",
        "itemCount": 15,
        "createdAt": "2024-01-10T09:15:00Z",
        "modifiedAt": "2024-01-18T16:45:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3,
      "hasNext": true,
      "hasPrev": false
    },
    "currentFolder": {
      "path": "/documents",
      "name": "Documents",
      "parent": "/"
    }
  }
}`}
        </CodeBlock>
      </section>

      <section id="upload-file">
        <h2>Upload File</h2>
        <p>Upload a new file to the specified folder with optional metadata.</p>

        <CodeBlock language="http" title="Request (Multipart Form Data)">
{`POST /api/files/upload
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data

Form Data:
file: [FILE_BINARY_DATA]
folder: "/documents"
description: "Important project file"
tags: "work,important"
isPublic: false`}
        </CodeBlock>

        <h3>Form Fields</h3>
        <ul>
          <li><strong>file:</strong> File binary data (required)</li>
          <li><strong>folder:</strong> Destination folder path (default: "/")</li>
          <li><strong>description:</strong> File description (optional)</li>
          <li><strong>tags:</strong> Comma-separated tags (optional)</li>
          <li><strong>isPublic:</strong> Make file publicly accessible (default: false)</li>
        </ul>

        <h3>Response</h3>
        <CodeBlock language="json" title="Success Response (201)">
{`{
  "success": true,
  "data": {
    "id": "file_123456789",
    "name": "document.pdf",
    "originalName": "Project_Spec_v2.pdf",
    "mimeType": "application/pdf",
    "size": 2048576,
    "folder": "/documents",
    "url": "https://storage.example.com/files/document.pdf",
    "thumbnailUrl": "https://storage.example.com/thumbnails/document.jpg",
    "uploadedAt": "2024-01-20T15:30:00Z",
    "isPublic": false,
    "tags": ["work", "important"],
    "metadata": {
      "description": "Important project file"
    }
  }
}`}
        </CodeBlock>

        <h3>File Size Limits</h3>
        <ul>
          <li><strong>Free Plan:</strong> 10 MB per file</li>
          <li><strong>Pro Plan:</strong> 100 MB per file</li>
          <li><strong>Enterprise:</strong> 1 GB per file</li>
        </ul>
      </section>

      <section id="get-file">
        <h2>Get File Info</h2>
        <p>Retrieve detailed information about a specific file.</p>

        <CodeBlock language="http" title="Request">
{`GET /api/files/file_123456789
Authorization: Bearer YOUR_JWT_TOKEN`}
        </CodeBlock>

        <h3>Response</h3>
        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "data": {
    "id": "file_123456789",
    "name": "document.pdf",
    "originalName": "Project_Spec_v2.pdf",
    "mimeType": "application/pdf",
    "size": 2048576,
    "folder": "/documents",
    "url": "https://storage.example.com/files/document.pdf",
    "downloadUrl": "https://api.example.com/api/files/file_123456789/download",
    "thumbnailUrl": "https://storage.example.com/thumbnails/document.jpg",
    "createdAt": "2024-01-15T10:30:00Z",
    "modifiedAt": "2024-01-16T14:20:00Z",
    "lastAccessedAt": "2024-01-20T11:15:00Z",
    "downloadCount": 5,
    "isPublic": false,
    "shareLink": null,
    "tags": ["important", "work"],
    "metadata": {
      "description": "Project specification document",
      "version": "2.0"
    },
    "owner": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}`}
        </CodeBlock>
      </section>

      <section id="download-file">
        <h2>Download File</h2>
        <p>Download a file by its ID. Returns the file binary data.</p>

        <CodeBlock language="http" title="Request">
{`GET /api/files/file_123456789/download
Authorization: Bearer YOUR_JWT_TOKEN`}
        </CodeBlock>

        <h3>Response</h3>
        <CodeBlock language="http" title="Success Response (200)">
{`HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Length: 2048576
Content-Disposition: attachment; filename="document.pdf"
Cache-Control: private, max-age=3600

[FILE_BINARY_DATA]`}
        </CodeBlock>

        <h3>Query Parameters</h3>
        <ul>
          <li><strong>inline:</strong> Display file inline instead of download (optional)</li>
          <li><strong>thumbnail:</strong> Download thumbnail version if available (optional)</li>
        </ul>
      </section>

      <section id="update-file">
        <h2>Update File</h2>
        <p>Update file metadata, move to different folder, or modify sharing settings.</p>

        <CodeBlock language="http" title="Request">
{`PUT /api/files/file_123456789
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "updated-document.pdf",
  "folder": "/documents/archived",
  "description": "Updated project specification",
  "tags": ["archived", "project", "spec"],
  "isPublic": true,
  "metadata": {
    "version": "3.0",
    "author": "John Doe"
  }
}`}
        </CodeBlock>

        <h3>Response</h3>
        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "data": {
    "id": "file_123456789",
    "name": "updated-document.pdf",
    "folder": "/documents/archived",
    "modifiedAt": "2024-01-20T16:45:00Z",
    "isPublic": true,
    "shareLink": "https://share.example.com/f/abc123def456",
    "tags": ["archived", "project", "spec"],
    "metadata": {
      "description": "Updated project specification",
      "version": "3.0",
      "author": "John Doe"
    }
  }
}`}
        </CodeBlock>
      </section>

      <section id="delete-file">
        <h2>Delete File</h2>
        <p>Permanently delete a file. This action cannot be undone.</p>

        <CodeBlock language="http" title="Request">
{`DELETE /api/files/file_123456789
Authorization: Bearer YOUR_JWT_TOKEN`}
        </CodeBlock>

        <h3>Response</h3>
        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "message": "File deleted successfully",
  "data": {
    "id": "file_123456789",
    "name": "document.pdf",
    "deletedAt": "2024-01-20T17:30:00Z"
  }
}`}
        </CodeBlock>

        <Alert type="warning" title="Permanent Deletion">
          File deletion is permanent and cannot be undone. Consider implementing a trash/recycle bin 
          feature in your application for better user experience.
        </Alert>
      </section>

      <section id="folder-operations">
        <h2>Folder Operations</h2>
        <p>Create, manage, and organize folders for better file organization.</p>

        <h3>Create Folder</h3>
        <CodeBlock language="http" title="Request">
{`POST /api/files/folders
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "New Project",
  "path": "/documents/projects",
  "description": "Project files and documentation"
}`}
        </CodeBlock>

        <h3>Move Files</h3>
        <CodeBlock language="http" title="Request">
{`POST /api/files/move
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "fileIds": ["file_123", "file_456"],
  "destinationFolder": "/documents/archived"
}`}
        </CodeBlock>

        <h3>Copy Files</h3>
        <CodeBlock language="http" title="Request">
{`POST /api/files/copy
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "fileIds": ["file_123"],
  "destinationFolder": "/backup",
  "preserveMetadata": true
}`}
        </CodeBlock>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/api/authentication" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Authentication →</h4>
              <p className="text-blue-800 text-sm">Required for all file operations</p>
            </Link>
            <Link href="/docs/api/users" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">User Management →</h4>
              <p className="text-green-800 text-sm">Manage user storage quotas</p>
            </Link>
            <Link href="/docs/api/errors" className="block p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
              <h4 className="font-semibold text-red-900 mb-2">Error Handling →</h4>
              <p className="text-red-800 text-sm">Handle file operation errors</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}