import { Alert, TableOfContents, Card, CodeBlock, StepGuide } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'File Management Overview' },
  { id: 'uploading-files', title: 'Uploading Files' },
  { id: 'organizing-files', title: 'Organizing Files' },
  { id: 'file-operations', title: 'File Operations' },
  { id: 'bulk-operations', title: 'Bulk Operations' },
  { id: 'file-preview', title: 'File Preview & Download' },
  { id: 'version-control', title: 'Version Control' },
  { id: 'advanced-features', title: 'Advanced Features' },
];

const uploadSteps = [
  {
    title: 'Drag and Drop Upload',
    description: 'The fastest way to upload multiple files at once.',
    code: `1. Open your file explorer
2. Select files you want to upload
3. Drag them to the MegaVault upload area
4. Drop them to start the upload process`,
    language: 'text',
  },
  {
    title: 'Click to Browse Upload',
    description: 'Traditional file selection method for precise control.',
    code: `1. Click the "Choose Files" button
2. Browse to your desired files
3. Select single or multiple files (Ctrl+click)
4. Click "Open" to start upload`,
    language: 'text',
  },
  {
    title: 'Folder Upload',
    description: 'Upload entire folder structures while preserving organization.',
    code: `1. Click "Upload Folder" option
2. Select the parent folder
3. All files and subfolders will be uploaded
4. Original structure is maintained`,
    language: 'text',
  },
];

export default function FileManagementPage() {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">File Management</h1>
        <p className="text-xl text-slate-600">
          Learn how to upload, organize, and manage files in MegaVault with advanced features for productivity.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>File Management Overview</h2>
        <p>
          MegaVault provides comprehensive file management capabilities designed for both individual users 
          and teams. Whether you're storing documents, images, videos, or any other file type, 
          MegaVault offers powerful tools to keep your files organized and accessible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Upload & Store" description="Multiple upload methods with progress tracking">
            <ul className="text-sm space-y-1">
              <li>✅ Drag & drop interface</li>
              <li>✅ Bulk file uploads</li>
              <li>✅ Folder structure preservation</li>
              <li>✅ Resume interrupted uploads</li>
            </ul>
          </Card>
          
          <Card title="Organize & Search" description="Powerful organization and discovery tools">
            <ul className="text-sm space-y-1">
              <li>✅ Nested folder structures</li>
              <li>✅ File tagging and metadata</li>
              <li>✅ Advanced search filters</li>
              <li>✅ Favorites and bookmarks</li>
            </ul>
          </Card>

          <Card title="Share & Collaborate" description="Secure sharing with fine-grained control">
            <ul className="text-sm space-y-1">
              <li>✅ Public sharing links</li>
              <li>✅ Password protection</li>
              <li>✅ Expiration dates</li>
              <li>✅ Download limitations</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="File Types Supported">
          MegaVault supports all file types including documents, images, videos, audio, archives, 
          code files, and more. File preview is available for common formats like PDF, images, 
          text files, and office documents.
        </Alert>
      </section>

      <section id="uploading-files">
        <h2>Uploading Files</h2>
        <p>
          MegaVault offers several upload methods to accommodate different workflows and file sizes. 
          All upload methods include progress tracking and error recovery.
        </p>

        <StepGuide steps={uploadSteps} />

        <h3>Upload Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Smart Upload">
            <ul className="text-sm space-y-1">
              <li><strong>Duplicate Detection:</strong> Warns before overwriting</li>
              <li><strong>Auto-Resume:</strong> Continues interrupted uploads</li>
              <li><strong>Batch Processing:</strong> Handles multiple files efficiently</li>
              <li><strong>Error Recovery:</strong> Retries failed uploads automatically</li>
            </ul>
          </Card>
          
          <Card title="Progress Tracking">
            <ul className="text-sm space-y-1">
              <li><strong>Individual Progress:</strong> Per-file upload status</li>
              <li><strong>Overall Progress:</strong> Total batch completion</li>
              <li><strong>Speed Monitoring:</strong> Real-time upload speed</li>
              <li><strong>Time Estimation:</strong> Remaining time calculation</li>
            </ul>
          </Card>
        </div>

        <h3>File Size and Format Limits</h3>
        <div className="bg-slate-50 rounded-lg p-6 not-prose">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Default Limits</h4>
              <ul className="text-sm space-y-1">
                <li><strong>Single File:</strong> 100 MB maximum</li>
                <li><strong>Batch Upload:</strong> 500 MB total</li>
                <li><strong>Folder Upload:</strong> 1,000 files maximum</li>
                <li><strong>File Name:</strong> 255 characters maximum</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Supported Formats</h4>
              <ul className="text-sm space-y-1">
                <li><strong>Documents:</strong> PDF, DOC, DOCX, TXT, RTF</li>
                <li><strong>Images:</strong> JPG, PNG, GIF, WebP, SVG</li>
                <li><strong>Videos:</strong> MP4, AVI, MOV, WebM</li>
                <li><strong>Archives:</strong> ZIP, RAR, 7Z, TAR</li>
              </ul>
            </div>
          </div>
        </div>

        <Alert type="warning" title="Large File Uploads">
          For files larger than 100 MB, consider:
          <ul className="mt-2">
            <li>Compressing files before upload</li>
            <li>Using a stable internet connection</li>
            <li>Uploading during off-peak hours</li>
            <li>Contact administrator for limit increases</li>
          </ul>
        </Alert>
      </section>

      <section id="organizing-files">
        <h2>Organizing Files</h2>
        <p>
          Effective file organization is crucial for productivity. MegaVault provides multiple 
          ways to structure and categorize your files for easy retrieval.
        </p>

        <h3>Folder Structure</h3>
        <ul>
          <li><strong>Nested Folders:</strong> Create unlimited levels of subfolders</li>
          <li><strong>Folder Templates:</strong> Use predefined folder structures</li>
          <li><strong>Smart Folders:</strong> Auto-organize based on file types or dates</li>
          <li><strong>Breadcrumb Navigation:</strong> Easy navigation through folder hierarchy</li>
        </ul>

        <h3>File Naming Best Practices</h3>
        <CodeBlock language="text" title="Recommended Naming Conventions">
{`Good Examples:
├── 2024-01-15_project-proposal.pdf
├── meeting-notes_2024-01-15.txt
├── budget-Q1-2024.xlsx
├── logo-company-blue-300px.png

Avoid:
├── document.pdf (too generic)
├── IMG_001.jpg (meaningless name)
├── My File (2).docx (spaces and parentheses)
├── report!!!.pdf (special characters)`}
        </CodeBlock>

        <h3>Organization Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="By Project" description="Organize files by project or client">
            <CodeBlock language="text">
{`Projects/
├── Client-Alpha/
│   ├── Contracts/
│   ├── Deliverables/
│   └── Communications/
├── Client-Beta/
│   ├── Research/
│   ├── Design/
│   └── Final/`}
            </CodeBlock>
          </Card>
          
          <Card title="By Date" description="Chronological organization">
            <CodeBlock language="text">
{`Archive/
├── 2024/
│   ├── 01-January/
│   ├── 02-February/
│   └── 03-March/
├── 2023/
│   └── 12-December/`}
            </CodeBlock>
          </Card>
        </div>
      </section>

      <section id="file-operations">
        <h2>File Operations</h2>
        <p>
          MegaVault provides comprehensive file operations accessible through context menus, 
          keyboard shortcuts, and toolbar buttons.
        </p>

        <h3>Basic Operations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Operation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Shortcut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Rename
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Right-click → Rename
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  F2
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Change file or folder name
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Copy
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Right-click → Copy
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Ctrl+C
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Create a duplicate of the file
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Move
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Drag & drop or Cut+Paste
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Ctrl+X, Ctrl+V
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Relocate file to different folder
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Delete
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Right-click → Delete
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Delete
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Move file to trash (recoverable)
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Download
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Right-click → Download
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Ctrl+D
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Save file to local device
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Advanced Operations</h3>
        <ul>
          <li><strong>Properties:</strong> View detailed file information including size, type, dates</li>
          <li><strong>Permissions:</strong> Set access controls and sharing permissions</li>
          <li><strong>Metadata:</strong> Add tags, descriptions, and custom attributes</li>
          <li><strong>Versioning:</strong> Manage different versions of the same file</li>
          <li><strong>Archive:</strong> Create ZIP archives from selected files</li>
        </ul>
      </section>

      <section id="bulk-operations">
        <h2>Bulk Operations</h2>
        <p>
          Handle multiple files efficiently with bulk operations that save time and reduce repetitive tasks.
        </p>

        <h3>Selection Methods</h3>
        <ul>
          <li><strong>Ctrl+Click:</strong> Select multiple individual files</li>
          <li><strong>Shift+Click:</strong> Select a range of files</li>
          <li><strong>Ctrl+A:</strong> Select all files in current folder</li>
          <li><strong>Selection Box:</strong> Click and drag to select files in area</li>
          <li><strong>Filter Selection:</strong> Select all files matching criteria</li>
        </ul>

        <h3>Bulk Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="File Operations">
            <ul className="text-sm space-y-1">
              <li><strong>Bulk Download:</strong> Download multiple files as ZIP</li>
              <li><strong>Bulk Delete:</strong> Move multiple files to trash</li>
              <li><strong>Bulk Move:</strong> Relocate files to new folder</li>
              <li><strong>Bulk Copy:</strong> Duplicate multiple files</li>
            </ul>
          </Card>
          
          <Card title="Metadata Operations">
            <ul className="text-sm space-y-1">
              <li><strong>Bulk Tagging:</strong> Add tags to multiple files</li>
              <li><strong>Bulk Rename:</strong> Rename files with patterns</li>
              <li><strong>Bulk Share:</strong> Share multiple files at once</li>
              <li><strong>Bulk Properties:</strong> Edit metadata for selection</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Bulk Operation Limits">
          To maintain system performance, bulk operations are limited to:
          <ul className="mt-2">
            <li>Maximum 100 files per operation</li>
            <li>Maximum 1 GB total size for bulk downloads</li>
            <li>Large operations are processed in the background</li>
          </ul>
        </Alert>
      </section>

      <section id="file-preview">
        <h2>File Preview & Download</h2>
        <p>
          MegaVault provides built-in preview capabilities for many file types, allowing you to 
          view content without downloading files.
        </p>

        <h3>Preview Support</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Fully Supported">
            <ul className="text-sm space-y-1">
              <li><strong>Images:</strong> JPG, PNG, GIF, WebP, SVG</li>
              <li><strong>Documents:</strong> PDF, TXT, MD, RTF</li>
              <li><strong>Code:</strong> JS, HTML, CSS, JSON, XML</li>
              <li><strong>Audio:</strong> MP3, WAV, OGG (player)</li>
            </ul>
          </Card>
          
          <Card title="Thumbnail Preview">
            <ul className="text-sm space-y-1">
              <li><strong>Videos:</strong> MP4, WebM (thumbnail + duration)</li>
              <li><strong>Office:</strong> DOC, XLSX, PPT (first page)</li>
              <li><strong>Archives:</strong> ZIP, RAR (file list)</li>
              <li><strong>Others:</strong> Generic file type icons</li>
            </ul>
          </Card>
        </div>

        <h3>Download Options</h3>
        <ul>
          <li><strong>Direct Download:</strong> Save original file to device</li>
          <li><strong>Batch Download:</strong> Multiple files as ZIP archive</li>
          <li><strong>Streaming:</strong> Stream media files directly in browser</li>
          <li><strong>Conversion:</strong> Download in different formats (when supported)</li>
        </ul>

        <h3>Preview Features</h3>
        <ul>
          <li><strong>Full-Screen Mode:</strong> Maximize preview window</li>
          <li><strong>Zoom Controls:</strong> Zoom in/out for images and documents</li>
          <li><strong>Navigation:</strong> Browse through multiple files in preview</li>
          <li><strong>Rotation:</strong> Rotate images in preview mode</li>
          <li><strong>Sharing:</strong> Share directly from preview window</li>
        </ul>
      </section>

      <section id="version-control">
        <h2>Version Control</h2>
        <p>
          MegaVault automatically tracks file versions when files with the same name are uploaded, 
          providing a simple version control system.
        </p>

        <h3>Version Management</h3>
        <ul>
          <li><strong>Automatic Versioning:</strong> New versions created on file replacement</li>
          <li><strong>Version History:</strong> View all versions with upload dates</li>
          <li><strong>Version Comparison:</strong> Compare different versions side-by-side</li>
          <li><strong>Version Restoration:</strong> Restore previous versions as current</li>
          <li><strong>Version Download:</strong> Download any specific version</li>
        </ul>

        <h3>Version Information</h3>
        <p>Each version includes:</p>
        <ul>
          <li><strong>Version Number:</strong> Sequential numbering (v1, v2, v3...)</li>
          <li><strong>Upload Date:</strong> When this version was created</li>
          <li><strong>File Size:</strong> Size of this specific version</li>
          <li><strong>Changes:</strong> Brief description of modifications (if provided)</li>
          <li><strong>Uploader:</strong> Who uploaded this version</li>
        </ul>

        <Alert type="warning" title="Version Limits">
          Version history is subject to storage limits:
          <ul className="mt-2">
            <li>Maximum 10 versions per file (configurable)</li>
            <li>Versions older than 90 days may be archived</li>
            <li>Large files may have fewer versions stored</li>
          </ul>
        </Alert>
      </section>

      <section id="advanced-features">
        <h2>Advanced Features</h2>
        <p>
          Discover powerful advanced features that enhance productivity and file management capabilities.
        </p>

        <h3>Smart Search</h3>
        <ul>
          <li><strong>Content Search:</strong> Search within document text</li>
          <li><strong>Metadata Search:</strong> Find files by tags, dates, sizes</li>
          <li><strong>File Type Filters:</strong> Narrow results by file type</li>
          <li><strong>Date Range Filters:</strong> Find files from specific periods</li>
          <li><strong>Saved Searches:</strong> Save complex queries for reuse</li>
        </ul>

        <h3>Automation Features</h3>
        <ul>
          <li><strong>Auto-Organization:</strong> Automatically sort files into folders</li>
          <li><strong>Duplicate Detection:</strong> Find and manage duplicate files</li>
          <li><strong>Cleanup Suggestions:</strong> Identify old or unused files</li>
          <li><strong>Batch Processing:</strong> Apply operations to file groups</li>
        </ul>

        <h3>Integration Capabilities</h3>
        <ul>
          <li><strong>API Access:</strong> Programmatic file management</li>
          <li><strong>Webhook Support:</strong> Automated notifications</li>
          <li><strong>Third-party Sync:</strong> Integration with other tools</li>
          <li><strong>Mobile Sync:</strong> Seamless mobile device integration</li>
        </ul>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/user-guide/folders" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Folder Organization →</h4>
              <p className="text-blue-800 text-sm">Advanced folder management and organization strategies</p>
            </Link>
            <Link href="/docs/user-guide/sharing" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">File Sharing →</h4>
              <p className="text-green-800 text-sm">Share files securely with public links and permissions</p>
            </Link>
            <Link href="/docs/user-guide/search" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Search & Filtering →</h4>
              <p className="text-purple-800 text-sm">Master advanced search and filtering techniques</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}