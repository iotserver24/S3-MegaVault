import { Alert, TableOfContents, Card } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Dashboard Overview' },
  { id: 'navigation', title: 'Navigation & Layout' },
  { id: 'file-browser', title: 'File Browser' },
  { id: 'upload-area', title: 'Upload Area' },
  { id: 'storage-info', title: 'Storage Information' },
  { id: 'recent-activity', title: 'Recent Activity' },
  { id: 'quick-actions', title: 'Quick Actions' },
  { id: 'customization', title: 'Dashboard Customization' },
];

export default function DashboardPage() {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Dashboard Overview</h1>
        <p className="text-xl text-slate-600">
          Your complete guide to navigating and using the MegaVault dashboard interface for efficient file management.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Dashboard Overview</h2>
        <p>
          The MegaVault dashboard is your central hub for managing files, monitoring storage usage, 
          and accessing all platform features. The interface is designed for both efficiency and ease of use, 
          providing quick access to your most important files and actions.
        </p>

        <Alert type="info" title="First Time Login">
          When you first log in to MegaVault, you'll see the dashboard with an empty file browser. 
          Start by uploading your first files using the drag-and-drop area or the upload button.
        </Alert>

        <div className="bg-slate-50 rounded-lg p-6 not-prose">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Dashboard Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm">
              <li><strong>File Browser:</strong> View and manage your files and folders</li>
              <li><strong>Upload Area:</strong> Drag-and-drop or click to upload files</li>
              <li><strong>Storage Meter:</strong> Monitor your storage usage</li>
              <li><strong>Recent Activity:</strong> Track recent file operations</li>
            </ul>
            <ul className="space-y-2 text-sm">
              <li><strong>Search Bar:</strong> Find files quickly by name or type</li>
              <li><strong>View Controls:</strong> Switch between grid and list views</li>
              <li><strong>Sort Options:</strong> Organize files by date, size, or name</li>
              <li><strong>Action Toolbar:</strong> Access common file operations</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="navigation">
        <h2>Navigation & Layout</h2>
        <p>
          The dashboard uses a clean, intuitive layout that adapts to different screen sizes 
          and provides easy access to all features.
        </p>

        <h3>Top Navigation Bar</h3>
        <ul>
          <li><strong>MegaVault Logo:</strong> Click to return to dashboard home</li>
          <li><strong>Search Bar:</strong> Global search across all your files</li>
          <li><strong>Upload Button:</strong> Quick access to file upload dialog</li>
          <li><strong>User Menu:</strong> Account settings, logout, and preferences</li>
          <li><strong>Storage Indicator:</strong> Current usage and available space</li>
        </ul>

        <h3>Sidebar (Desktop)</h3>
        <ul>
          <li><strong>File Browser:</strong> Navigate through folders and files</li>
          <li><strong>Recent Files:</strong> Quickly access recently modified files</li>
          <li><strong>Shared Items:</strong> Files and folders you've shared</li>
          <li><strong>Favorites:</strong> Starred files and folders</li>
          <li><strong>Trash:</strong> Deleted items (recoverable for 30 days)</li>
        </ul>

        <h3>Responsive Interface</h3>
        <p>
          On smaller screens and mobile devices, the interface adapts to provide an optimal 
          touch-friendly experience with collapsible navigation and responsive layouts.
        </p>

        <Alert type="info" title="Keyboard Shortcuts">
          Use keyboard shortcuts for faster navigation:
          <ul className="mt-2">
            <li><code>Ctrl+U</code> - Upload files</li>
            <li><code>Ctrl+F</code> - Focus search bar</li>
            <li><code>Delete</code> - Delete selected files</li>
            <li><code>F2</code> - Rename selected file</li>
          </ul>
        </Alert>
      </section>

      <section id="file-browser">
        <h2>File Browser</h2>
        <p>
          The file browser is the heart of the dashboard, displaying your files and folders 
          in an organized, easy-to-navigate interface.
        </p>

        <h3>View Modes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Grid View" description="Visual thumbnails for images and documents">
            <ul className="text-sm space-y-1">
              <li>✅ Thumbnail previews</li>
              <li>✅ Visual file type indicators</li>
              <li>✅ Quick file recognition</li>
              <li>✅ Ideal for images and media</li>
            </ul>
          </Card>
          
          <Card title="List View" description="Detailed file information in table format">
            <ul className="text-sm space-y-1">
              <li>✅ File sizes and dates</li>
              <li>✅ More files visible at once</li>
              <li>✅ Sortable columns</li>
              <li>✅ Better for large collections</li>
            </ul>
          </Card>
        </div>

        <h3>File Information</h3>
        <p>Each file displays the following information:</p>
        <ul>
          <li><strong>File Name:</strong> Original filename with extension</li>
          <li><strong>File Size:</strong> Human-readable size (KB, MB, GB)</li>
          <li><strong>Upload Date:</strong> When the file was added to MegaVault</li>
          <li><strong>File Type:</strong> Visual icon indicating file format</li>
          <li><strong>Share Status:</strong> Indicator if file is publicly shared</li>
        </ul>

        <h3>Selection and Actions</h3>
        <ul>
          <li><strong>Single Click:</strong> Select a file</li>
          <li><strong>Double Click:</strong> Open file preview or download</li>
          <li><strong>Right Click:</strong> Open context menu with actions</li>
          <li><strong>Ctrl+Click:</strong> Multi-select files</li>
          <li><strong>Shift+Click:</strong> Select range of files</li>
        </ul>
      </section>

      <section id="upload-area">
        <h2>Upload Area</h2>
        <p>
          The upload area provides multiple ways to add files to your MegaVault storage, 
          designed for both single files and bulk uploads.
        </p>

        <h3>Upload Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Drag & Drop" description="Most convenient for multiple files">
            <ul className="text-sm space-y-1">
              <li>Drag files from your computer</li>
              <li>Drop anywhere in the upload area</li>
              <li>Supports multiple files</li>
              <li>Visual upload progress</li>
            </ul>
          </Card>
          
          <Card title="Click to Browse" description="Traditional file selection dialog">
            <ul className="text-sm space-y-1">
              <li>Click "Choose Files" button</li>
              <li>Browse your file system</li>
              <li>Multi-select with Ctrl/Cmd</li>
              <li>Folder upload supported</li>
            </ul>
          </Card>

          <Card title="Paste Upload" description="Quick upload from clipboard">
            <ul className="text-sm space-y-1">
              <li>Copy files in file explorer</li>
              <li>Paste with Ctrl+V</li>
              <li>Screenshot paste support</li>
              <li>Text content upload</li>
            </ul>
          </Card>
        </div>

        <h3>Upload Progress</h3>
        <p>
          During upload, you'll see:
        </p>
        <ul>
          <li><strong>Progress Bar:</strong> Individual file upload progress</li>
          <li><strong>Speed Indicator:</strong> Current upload speed</li>
          <li><strong>Time Remaining:</strong> Estimated completion time</li>
          <li><strong>Cancel Option:</strong> Stop upload if needed</li>
          <li><strong>Error Handling:</strong> Retry failed uploads automatically</li>
        </ul>

        <Alert type="warning" title="File Size Limits">
          Maximum file size depends on your configuration. Default limits:
          <ul className="mt-2">
            <li>Individual file: 100 MB</li>
            <li>Batch upload: 500 MB total</li>
            <li>These limits can be adjusted by administrators</li>
          </ul>
        </Alert>
      </section>

      <section id="storage-info">
        <h2>Storage Information</h2>
        <p>
          The storage information panel helps you monitor your usage and manage your storage allocation effectively.
        </p>

        <h3>Storage Metrics</h3>
        <ul>
          <li><strong>Used Space:</strong> Total storage currently in use</li>
          <li><strong>Available Space:</strong> Remaining storage capacity</li>
          <li><strong>Total Allocation:</strong> Your total storage limit</li>
          <li><strong>File Count:</strong> Number of files stored</li>
          <li><strong>Folder Count:</strong> Number of folders created</li>
        </ul>

        <h3>Visual Indicators</h3>
        <div className="bg-slate-50 rounded-lg p-6 not-prose">
          <h4 className="font-semibold text-slate-900 mb-3">Storage Status Colors</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
              <span><strong>Green (0-70%):</strong> Healthy storage usage</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
              <span><strong>Yellow (70-90%):</strong> Consider cleaning up old files</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
              <span><strong>Red (90-100%):</strong> Urgent: storage nearly full</span>
            </div>
          </div>
        </div>

        <h3>Storage Management Tips</h3>
        <ul>
          <li>Regularly review and delete unnecessary files</li>
          <li>Use the trash folder to temporarily free up space</li>
          <li>Consider compressing large files before upload</li>
          <li>Monitor storage trends to plan for upgrades</li>
        </ul>
      </section>

      <section id="recent-activity">
        <h2>Recent Activity</h2>
        <p>
          The recent activity feed keeps you informed about all actions performed on your files, 
          providing transparency and helping you track changes.
        </p>

        <h3>Activity Types</h3>
        <ul>
          <li><strong>File Uploads:</strong> New files added to your storage</li>
          <li><strong>File Downloads:</strong> Files accessed or downloaded</li>
          <li><strong>File Deletions:</strong> Files moved to trash</li>
          <li><strong>File Shares:</strong> Files shared with public links</li>
          <li><strong>Folder Creation:</strong> New folders organized</li>
          <li><strong>File Renames:</strong> Files renamed or moved</li>
        </ul>

        <h3>Activity Information</h3>
        <p>Each activity entry shows:</p>
        <ul>
          <li><strong>Action Type:</strong> What operation was performed</li>
          <li><strong>File/Folder Name:</strong> Which item was affected</li>
          <li><strong>Timestamp:</strong> When the action occurred</li>
          <li><strong>User Context:</strong> Who performed the action (if applicable)</li>
          <li><strong>Details:</strong> Additional context about the operation</li>
        </ul>

        <Alert type="info" title="Activity Retention">
          Activity history is retained for 90 days. Older activities are automatically 
          archived to maintain system performance.
        </Alert>
      </section>

      <section id="quick-actions">
        <h2>Quick Actions</h2>
        <p>
          Quick actions provide fast access to common operations without navigating through menus.
        </p>

        <h3>Global Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="File Operations">
            <ul className="text-sm space-y-1">
              <li>🔄 Upload Files</li>
              <li>📁 Create New Folder</li>
              <li>🔍 Search Files</li>
              <li>⭐ View Favorites</li>
              <li>🗑️ Open Trash</li>
            </ul>
          </Card>
          
          <Card title="View & Organization">
            <ul className="text-sm space-y-1">
              <li>📊 Switch View Mode</li>
              <li>🔢 Sort Files</li>
              <li>🎯 Filter by Type</li>
              <li>📅 Filter by Date</li>
              <li>🔄 Refresh View</li>
            </ul>
          </Card>
        </div>

        <h3>Context-Sensitive Actions</h3>
        <p>When files are selected, additional actions become available:</p>
        <ul>
          <li><strong>Download:</strong> Save files to your device</li>
          <li><strong>Share:</strong> Generate public sharing links</li>
          <li><strong>Rename:</strong> Change file names</li>
          <li><strong>Move:</strong> Relocate to different folders</li>
          <li><strong>Copy:</strong> Duplicate files</li>
          <li><strong>Delete:</strong> Move to trash</li>
          <li><strong>Properties:</strong> View detailed file information</li>
        </ul>
      </section>

      <section id="customization">
        <h2>Dashboard Customization</h2>
        <p>
          Personalize your dashboard experience with various customization options 
          to match your workflow and preferences.
        </p>

        <h3>Display Preferences</h3>
        <ul>
          <li><strong>Default View Mode:</strong> Choose grid or list as default</li>
          <li><strong>Items Per Page:</strong> Set how many files to display</li>
          <li><strong>Sort Preference:</strong> Default file sorting order</li>
          <li><strong>Theme:</strong> Light or dark mode (if available)</li>
          <li><strong>Language:</strong> Interface language selection</li>
        </ul>

        <h3>Sidebar Configuration</h3>
        <ul>
          <li><strong>Panel Visibility:</strong> Show/hide different sidebar sections</li>
          <li><strong>Recent Files Count:</strong> Number of recent files to display</li>
          <li><strong>Quick Access Folders:</strong> Pin frequently used folders</li>
          <li><strong>Collapsed State:</strong> Remember sidebar open/closed state</li>
        </ul>

        <h3>Notification Settings</h3>
        <ul>
          <li><strong>Upload Complete:</strong> Notifications when uploads finish</li>
          <li><strong>Share Notifications:</strong> Alerts when files are accessed</li>
          <li><strong>Storage Warnings:</strong> Alerts when storage is nearly full</li>
          <li><strong>Activity Digest:</strong> Daily/weekly activity summaries</li>
        </ul>

        <Alert type="success" title="Settings Sync">
          Your dashboard preferences are automatically saved and synchronized 
          across all your devices when you log in.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/user-guide/file-management" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">File Management →</h4>
              <p className="text-blue-800 text-sm">Learn advanced file operations and organization techniques</p>
            </Link>
            <Link href="/docs/user-guide/sharing" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">File Sharing →</h4>
              <p className="text-green-800 text-sm">Discover how to share files securely with others</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}