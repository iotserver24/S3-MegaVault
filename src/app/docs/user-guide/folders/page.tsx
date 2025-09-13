import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Folder Organization Overview' },
  { id: 'creating-folders', title: 'Creating and Managing Folders' },
  { id: 'folder-structures', title: 'Effective Folder Structures' },
  { id: 'nested-organization', title: 'Nested Folder Organization' },
  { id: 'folder-templates', title: 'Folder Templates' },
  { id: 'smart-folders', title: 'Smart Folders' },
  { id: 'folder-permissions', title: 'Folder Permissions' },
  { id: 'best-practices', title: 'Organization Best Practices' },
];

export default function FoldersPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Folder Organization</h1>
        <p className="text-xl text-slate-600">
          Master folder organization techniques to maintain a clean, efficient, and scalable file structure in MegaVault.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Folder Organization Overview</h2>
        <p>
          Effective folder organization is the foundation of efficient file management. MegaVault provides 
          flexible folder structures that can adapt to any workflow, from personal document storage to 
          complex project management systems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Hierarchical Structure" description="Unlimited nesting levels for complex organization">
            <ul className="text-sm space-y-1">
              <li>✅ Unlimited folder depth</li>
              <li>✅ Drag-and-drop reorganization</li>
              <li>✅ Breadcrumb navigation</li>
              <li>✅ Folder-level permissions</li>
            </ul>
          </Card>
          
          <Card title="Smart Organization" description="Automated and rule-based folder management">
            <ul className="text-sm space-y-1">
              <li>✅ Auto-sorting by file type</li>
              <li>✅ Date-based organization</li>
              <li>✅ Template-based structures</li>
              <li>✅ Custom naming rules</li>
            </ul>
          </Card>

          <Card title="Collaboration Ready" description="Share folders with teams and manage access">
            <ul className="text-sm space-y-1">
              <li>✅ Shared folder access</li>
              <li>✅ Permission inheritance</li>
              <li>✅ Team collaboration spaces</li>
              <li>✅ Activity tracking</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Organization Benefits">
          Well-organized folders improve productivity by:
          <ul className="mt-2">
            <li>Reducing time spent searching for files</li>
            <li>Making collaboration more efficient</li>
            <li>Enabling better backup and sync strategies</li>
            <li>Supporting scalable growth patterns</li>
          </ul>
        </Alert>
      </section>

      <section id="creating-folders">
        <h2>Creating and Managing Folders</h2>
        <p>
          MegaVault provides multiple ways to create and manage folders, each optimized for different scenarios.
        </p>

        <h3>Folder Creation Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Quick Creation">
            <ul className="text-sm space-y-1">
              <li><strong>New Folder Button:</strong> Click "New Folder" in toolbar</li>
              <li><strong>Right-Click Menu:</strong> Right-click → "New Folder"</li>
              <li><strong>Keyboard Shortcut:</strong> Ctrl+Shift+N</li>
              <li><strong>Drag & Drop:</strong> Drag files onto "New Folder" area</li>
            </ul>
          </Card>
          
          <Card title="Batch Creation">
            <ul className="text-sm space-y-1">
              <li><strong>Folder Templates:</strong> Create predefined structures</li>
              <li><strong>Bulk Creation:</strong> Create multiple folders at once</li>
              <li><strong>Import Structure:</strong> Upload folder hierarchies</li>
              <li><strong>API Creation:</strong> Programmatic folder creation</li>
            </ul>
          </Card>
        </div>

        <h3>Folder Management Operations</h3>
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
                  Rename Folder
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Right-click → Rename
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  F2
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Change folder name while preserving structure
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Move Folder
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Drag & drop
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Ctrl+X, Ctrl+V
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Relocate folder and all contents
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Copy Folder
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Right-click → Copy
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Ctrl+C, Ctrl+V
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Duplicate folder structure and contents
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Delete Folder
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Right-click → Delete
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Delete
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Move folder and contents to trash
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Alert type="warning" title="Folder Deletion">
          Deleting a folder moves all its contents to trash. This operation can be undone within 30 days 
          from the trash folder. Be careful with deeply nested folders containing many files.
        </Alert>
      </section>

      <section id="folder-structures">
        <h2>Effective Folder Structures</h2>
        <p>
          Different use cases require different organizational approaches. Here are proven folder structure 
          patterns for various scenarios.
        </p>

        <h3>Personal Document Organization</h3>
        <CodeBlock language="text" title="Personal Files Structure">
{`Personal/
├── Documents/
│   ├── Legal/
│   │   ├── Contracts/
│   │   ├── Insurance/
│   │   └── Tax-Records/
│   ├── Financial/
│   │   ├── Bank-Statements/
│   │   ├── Investments/
│   │   └── Receipts/
│   └── Personal/
│       ├── Medical/
│       ├── Education/
│       └── Certificates/
├── Media/
│   ├── Photos/
│   │   ├── 2024/
│   │   ├── 2023/
│   │   └── Family-Events/
│   ├── Videos/
│   └── Audio/
└── Archive/
    ├── Old-Documents/
    └── Backup/`}
        </CodeBlock>

        <h3>Business Project Organization</h3>
        <CodeBlock language="text" title="Business Project Structure">
{`Projects/
├── Active-Projects/
│   ├── Project-Alpha/
│   │   ├── 01-Planning/
│   │   │   ├── Requirements/
│   │   │   ├── Proposals/
│   │   │   └── Timelines/
│   │   ├── 02-Design/
│   │   │   ├── Mockups/
│   │   │   ├── Assets/
│   │   │   └── Specifications/
│   │   ├── 03-Development/
│   │   │   ├── Code/
│   │   │   ├── Testing/
│   │   │   └── Documentation/
│   │   ├── 04-Delivery/
│   │   │   ├── Final-Deliverables/
│   │   │   ├── Client-Feedback/
│   │   │   └── Handover/
│   │   └── 05-Archive/
│   └── Project-Beta/
├── Templates/
│   ├── Project-Templates/
│   ├── Document-Templates/
│   └── Proposal-Templates/
└── Completed-Projects/
    ├── 2024/
    └── 2023/`}
        </CodeBlock>

        <h3>Team Collaboration Structure</h3>
        <CodeBlock language="text" title="Team Workspace Structure">
{`Team-Workspace/
├── Shared-Resources/
│   ├── Brand-Assets/
│   │   ├── Logos/
│   │   ├── Colors-Fonts/
│   │   └── Guidelines/
│   ├── Templates/
│   │   ├── Presentations/
│   │   ├── Documents/
│   │   └── Reports/
│   └── Reference-Materials/
├── Department-Folders/
│   ├── Marketing/
│   │   ├── Campaigns/
│   │   ├── Analytics/
│   │   └── Assets/
│   ├── Sales/
│   │   ├── Proposals/
│   │   ├── Contracts/
│   │   └── Client-Materials/
│   └── Development/
│       ├── Projects/
│       ├── Documentation/
│       └── Resources/
└── Administrative/
    ├── Policies/
    ├── Meeting-Notes/
    └── Reports/`}
        </CodeBlock>
      </section>

      <section id="nested-organization">
        <h2>Nested Folder Organization</h2>
        <p>
          MegaVault supports unlimited folder nesting, but effective organization requires thoughtful 
          hierarchy design to avoid overly complex structures.
        </p>

        <h3>Nesting Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Optimal Depth Guidelines">
            <ul className="text-sm space-y-1">
              <li><strong>3-5 Levels:</strong> Ideal for most use cases</li>
              <li><strong>6-8 Levels:</strong> Maximum for complex projects</li>
              <li><strong>Avoid Deep Nesting:</strong> More than 8 levels becomes unwieldy</li>
              <li><strong>Breadcrumb Navigation:</strong> Use for deep structures</li>
            </ul>
          </Card>
          
          <Card title="Navigation Efficiency">
            <ul className="text-sm space-y-1">
              <li><strong>Logical Grouping:</strong> Group related items together</li>
              <li><strong>Consistent Naming:</strong> Use predictable naming patterns</li>
              <li><strong>Quick Access:</strong> Favorite frequently used folders</li>
              <li><strong>Search Integration:</strong> Rely on search for deep items</li>
            </ul>
          </Card>
        </div>

        <h3>Hierarchy Design Principles</h3>
        <ul>
          <li><strong>Top-Down Approach:</strong> Start with broad categories, then specialize</li>
          <li><strong>Parallel Structure:</strong> Keep similar levels at the same depth</li>
          <li><strong>Logical Flow:</strong> Organize by workflow or process stages</li>
          <li><strong>Future Growth:</strong> Design for scalability and expansion</li>
          <li><strong>User Intuition:</strong> Make structure intuitive for all users</li>
        </ul>

        <h3>Navigation Aids</h3>
        <ul>
          <li><strong>Breadcrumbs:</strong> Always visible path to current location</li>
          <li><strong>Folder Tree:</strong> Sidebar showing complete hierarchy</li>
          <li><strong>Recent Folders:</strong> Quick access to recently visited folders</li>
          <li><strong>Bookmarks:</strong> Star important folders for quick access</li>
          <li><strong>Search Filters:</strong> Find folders by name or content</li>
        </ul>
      </section>

      <section id="folder-templates">
        <h2>Folder Templates</h2>
        <p>
          Folder templates accelerate project setup by providing pre-defined folder structures 
          that can be instantiated with a single click.
        </p>

        <h3>Built-in Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Project Templates">
            <ul className="text-sm space-y-1">
              <li><strong>Web Development:</strong> Frontend, backend, assets, docs</li>
              <li><strong>Marketing Campaign:</strong> Assets, copy, analytics, reports</li>
              <li><strong>Research Project:</strong> Data, analysis, references, reports</li>
              <li><strong>Event Planning:</strong> Planning, vendors, logistics, assets</li>
            </ul>
          </Card>
          
          <Card title="Business Templates">
            <ul className="text-sm space-y-1">
              <li><strong>Client Onboarding:</strong> Contracts, assets, communications</li>
              <li><strong>Product Launch:</strong> Development, marketing, support</li>
              <li><strong>Training Program:</strong> Materials, assessments, feedback</li>
              <li><strong>Compliance Audit:</strong> Documents, evidence, reports</li>
            </ul>
          </Card>
        </div>

        <h3>Creating Custom Templates</h3>
        <ol>
          <li><strong>Design Structure:</strong> Create the ideal folder hierarchy</li>
          <li><strong>Add Template Files:</strong> Include placeholder documents</li>
          <li><strong>Set Permissions:</strong> Configure default access rights</li>
          <li><strong>Save as Template:</strong> Convert structure to reusable template</li>
          <li><strong>Share Template:</strong> Make available to team members</li>
        </ol>

        <h3>Template Usage</h3>
        <ul>
          <li><strong>Instant Creation:</strong> Create complete structures instantly</li>
          <li><strong>Customization:</strong> Modify templates after creation</li>
          <li><strong>Variable Substitution:</strong> Replace placeholders with actual values</li>
          <li><strong>Version Control:</strong> Update templates and sync changes</li>
        </ul>

        <Alert type="info" title="Template Benefits">
          Folder templates provide:
          <ul className="mt-2">
            <li>Consistent project organization across teams</li>
            <li>Faster project setup and onboarding</li>
            <li>Reduced organizational mistakes</li>
            <li>Knowledge transfer and best practices</li>
          </ul>
        </Alert>
      </section>

      <section id="smart-folders">
        <h2>Smart Folders</h2>
        <p>
          Smart folders automatically organize files based on rules and criteria, reducing manual 
          organization work and maintaining consistency.
        </p>

        <h3>Auto-Organization Rules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="File Type Organization">
            <ul className="text-sm space-y-1">
              <li><strong>Document Types:</strong> PDF, DOC, TXT → Documents folder</li>
              <li><strong>Media Files:</strong> JPG, PNG, MP4 → Media folder</li>
              <li><strong>Archives:</strong> ZIP, RAR → Archives folder</li>
              <li><strong>Code Files:</strong> JS, HTML, CSS → Code folder</li>
            </ul>
          </Card>
          
          <Card title="Date-Based Organization">
            <ul className="text-sm space-y-1">
              <li><strong>Upload Date:</strong> Organize by when files were added</li>
              <li><strong>Modification Date:</strong> Sort by last edit date</li>
              <li><strong>Creation Date:</strong> Use original file creation date</li>
              <li><strong>Custom Periods:</strong> Daily, weekly, monthly, yearly</li>
            </ul>
          </Card>
        </div>

        <h3>Rule Configuration</h3>
        <ul>
          <li><strong>File Patterns:</strong> Match files by name patterns or extensions</li>
          <li><strong>Size Filters:</strong> Organize by file size ranges</li>
          <li><strong>Source Rules:</strong> Different rules for different upload sources</li>
          <li><strong>Tag-Based Rules:</strong> Organize by file tags or metadata</li>
          <li><strong>Combination Rules:</strong> Multiple criteria for complex organization</li>
        </ul>

        <h3>Smart Folder Features</h3>
        <ul>
          <li><strong>Real-Time Processing:</strong> Files organized as they're uploaded</li>
          <li><strong>Batch Processing:</strong> Apply rules to existing files</li>
          <li><strong>Rule Priorities:</strong> Handle conflicts with rule precedence</li>
          <li><strong>Exception Handling:</strong> Manual overrides when needed</li>
          <li><strong>Rule Testing:</strong> Preview results before applying</li>
        </ul>
      </section>

      <section id="folder-permissions">
        <h2>Folder Permissions</h2>
        <p>
          Control access to folders and their contents with granular permission settings that 
          support both individual and team collaboration scenarios.
        </p>

        <h3>Permission Levels</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Permission Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  View Files
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Download
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Upload
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Delete/Modify
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">✗</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">✗</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Download
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">✓</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">✓</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">✗</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">✗</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  Upload
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

        <h3>Permission Inheritance</h3>
        <ul>
          <li><strong>Default Inheritance:</strong> Subfolders inherit parent permissions</li>
          <li><strong>Override Options:</strong> Set specific permissions for subfolders</li>
          <li><strong>Permission Propagation:</strong> Apply changes to all subfolders</li>
          <li><strong>Conflict Resolution:</strong> Handle mixed permission scenarios</li>
        </ul>

        <h3>Sharing and Collaboration</h3>
        <ul>
          <li><strong>Team Folders:</strong> Shared workspaces for team collaboration</li>
          <li><strong>Guest Access:</strong> Temporary access for external collaborators</li>
          <li><strong>Link Sharing:</strong> Share folders via secure links</li>
          <li><strong>Expiration Dates:</strong> Time-limited access permissions</li>
        </ul>

        <Alert type="warning" title="Permission Security">
          When setting folder permissions:
          <ul className="mt-2">
            <li>Review permissions regularly, especially for sensitive folders</li>
            <li>Use principle of least privilege - grant minimum necessary access</li>
            <li>Monitor folder access through activity logs</li>
            <li>Remove access promptly when team members leave</li>
          </ul>
        </Alert>
      </section>

      <section id="best-practices">
        <h2>Organization Best Practices</h2>
        <p>
          Follow these proven best practices to create and maintain an efficient, scalable folder organization system.
        </p>

        <h3>Naming Conventions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Recommended Practices">
            <ul className="text-sm space-y-1">
              <li><strong>Descriptive Names:</strong> Clear, meaningful folder names</li>
              <li><strong>Consistent Casing:</strong> Use Title-Case or lowercase consistently</li>
              <li><strong>No Special Characters:</strong> Avoid spaces, use hyphens or underscores</li>
              <li><strong>Date Prefixes:</strong> Use YYYY-MM-DD for chronological order</li>
            </ul>
          </Card>
          
          <Card title="Avoid These Mistakes">
            <ul className="text-sm space-y-1 text-red-600">
              <li><strong>Generic Names:</strong> "Stuff", "Misc", "Other"</li>
              <li><strong>Spaces in Names:</strong> Can cause system issues</li>
              <li><strong>Very Long Names:</strong> Keep under 50 characters</li>
              <li><strong>Inconsistent Patterns:</strong> Mix of different naming styles</li>
            </ul>
          </Card>
        </div>

        <h3>Maintenance Strategies</h3>
        <ul>
          <li><strong>Regular Reviews:</strong> Monthly cleanup of unused folders</li>
          <li><strong>Archive Old Content:</strong> Move inactive folders to archive areas</li>
          <li><strong>Document Structure:</strong> Maintain organization documentation</li>
          <li><strong>User Training:</strong> Educate team members on folder conventions</li>
          <li><strong>Automated Cleanup:</strong> Use rules to maintain organization</li>
        </ul>

        <h3>Scalability Planning</h3>
        <ul>
          <li><strong>Growth Accommodation:</strong> Design for future expansion</li>
          <li><strong>Performance Considerations:</strong> Avoid folders with thousands of items</li>
          <li><strong>Backup Strategies:</strong> Ensure folder structures are backed up</li>
          <li><strong>Migration Planning:</strong> Plan for system migrations</li>
          <li><strong>Version Control:</strong> Track changes to organizational structure</li>
        </ul>

        <h3>Team Collaboration</h3>
        <ul>
          <li><strong>Shared Standards:</strong> Establish team-wide organization standards</li>
          <li><strong>Permission Management:</strong> Regularly review and update access rights</li>
          <li><strong>Communication:</strong> Notify team about structural changes</li>
          <li><strong>Training Materials:</strong> Create guides for new team members</li>
          <li><strong>Feedback Collection:</strong> Gather input on organizational effectiveness</li>
        </ul>

        <Alert type="success" title="Organization Success Metrics">
          Measure the effectiveness of your folder organization by:
          <ul className="mt-2">
            <li>Reduced time to find files</li>
            <li>Fewer duplicate files created</li>
            <li>Improved team collaboration efficiency</li>
            <li>Reduced support requests about file locations</li>
          </ul>
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/user-guide/file-management" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">File Management →</h4>
              <p className="text-blue-800 text-sm">Learn comprehensive file management techniques</p>
            </Link>
            <Link href="/docs/user-guide/search" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">Search & Filtering →</h4>
              <p className="text-green-800 text-sm">Master search techniques for organized files</p>
            </Link>
            <Link href="/docs/user-guide/sharing" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Folder Sharing →</h4>
              <p className="text-purple-800 text-sm">Share entire folders with teams and collaborators</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}