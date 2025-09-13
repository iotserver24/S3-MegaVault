import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Search & Filtering Overview' },
  { id: 'basic-search', title: 'Basic Search' },
  { id: 'advanced-search', title: 'Advanced Search' },
  { id: 'search-filters', title: 'Search Filters' },
  { id: 'saved-searches', title: 'Saved Searches' },
  { id: 'content-search', title: 'Content Search' },
  { id: 'search-tips', title: 'Search Tips & Tricks' },
];

export default function SearchPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Search & Filtering</h1>
        <p className="text-xl text-slate-600">
          Master advanced search and filtering techniques to quickly find any file in your MegaVault storage.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Search & Filtering Overview</h2>
        <p>
          MegaVault provides powerful search capabilities including content search, metadata filtering, 
          and advanced query operators to help you locate files quickly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Instant Search" description="Real-time search with auto-complete">
            <ul className="text-sm space-y-1">
              <li>✅ Live search suggestions</li>
              <li>✅ Typo correction</li>
              <li>✅ Search history</li>
            </ul>
          </Card>
          
          <Card title="Content Search" description="Search inside documents">
            <ul className="text-sm space-y-1">
              <li>✅ PDF text extraction</li>
              <li>✅ Office document content</li>
              <li>✅ Image metadata</li>
            </ul>
          </Card>

          <Card title="Advanced Filters" description="Combine multiple search criteria">
            <ul className="text-sm space-y-1">
              <li>✅ File type filters</li>
              <li>✅ Date range filters</li>
              <li>✅ Size-based filtering</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="basic-search">
        <h2>Basic Search</h2>
        <p>Start with simple keyword searches that match file names and expand to more complex queries.</p>

        <h3>Search Examples</h3>
        <CodeBlock language="text">
{`report          → Files containing "report"
budget.xlsx     → Exact filename match
*.pdf           → All PDF files
"exact phrase"  → Exact phrase match`}
        </CodeBlock>

        <h3>Search Features</h3>
        <ul>
          <li><strong>Case Insensitive:</strong> "Report" matches "report"</li>
          <li><strong>Partial Matching:</strong> "proj" matches "project"</li>
          <li><strong>Relevance Ranking:</strong> Most relevant results first</li>
          <li><strong>Result Previews:</strong> Thumbnails and snippets</li>
        </ul>
      </section>

      <section id="advanced-search">
        <h2>Advanced Search</h2>
        <p>Use field-specific searches and operators for precise results.</p>

        <h3>Field-Specific Searches</h3>
        <CodeBlock language="text">
{`# Search in filename only
filename:report

# Search file content
content:budget

# Filter by file type
type:pdf

# Search in specific folder
folder:"Projects/Alpha"

# Filter by size
size:>10MB

# Filter by date
modified:today`}
        </CodeBlock>

        <h3>Boolean Operators</h3>
        <ul>
          <li><strong>AND:</strong> Both terms must be present</li>
          <li><strong>OR:</strong> Either term can be present</li>
          <li><strong>NOT:</strong> Exclude files with term</li>
          <li><strong>( ):</strong> Group terms together</li>
        </ul>
      </section>

      <section id="search-filters">
        <h2>Search Filters</h2>
        <p>Visual filters that don't require learning query syntax.</p>

        <h3>Available Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="File Type Filters">
            <ul className="text-sm space-y-1">
              <li><strong>Documents:</strong> PDF, DOC, TXT</li>
              <li><strong>Images:</strong> JPG, PNG, GIF</li>
              <li><strong>Videos:</strong> MP4, AVI, MOV</li>
              <li><strong>Archives:</strong> ZIP, RAR, 7Z</li>
            </ul>
          </Card>
          
          <Card title="Date & Size Filters">
            <ul className="text-sm space-y-1">
              <li><strong>Date Ranges:</strong> Today, This Week, This Month</li>
              <li><strong>Size Categories:</strong> Small, Medium, Large</li>
              <li><strong>Custom Ranges:</strong> Specific dates and sizes</li>
              <li><strong>Relative Dates:</strong> Last 7/30/90 days</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="saved-searches">
        <h2>Saved Searches</h2>
        <p>Save frequently used searches and create smart folders that auto-update.</p>

        <h3>Creating Saved Searches</h3>
        <ol>
          <li>Perform your search with desired filters</li>
          <li>Click "Save Search" button</li>
          <li>Give it a descriptive name</li>
          <li>Set notification preferences</li>
          <li>Access from sidebar or search menu</li>
        </ol>

        <h3>Smart Folder Features</h3>
        <ul>
          <li><strong>Live Results:</strong> Automatically include new matching files</li>
          <li><strong>Notifications:</strong> Alert when new files match</li>
          <li><strong>Shared Searches:</strong> Share with team members</li>
          <li><strong>Export Results:</strong> Download as CSV or JSON</li>
        </ul>
      </section>

      <section id="content-search">
        <h2>Content Search</h2>
        <p>Search inside documents based on their content, not just filenames.</p>

        <h3>Supported Content</h3>
        <ul>
          <li><strong>Text Documents:</strong> TXT, DOC, DOCX, PDF</li>
          <li><strong>Presentations:</strong> PPT, PPTX</li>
          <li><strong>Spreadsheets:</strong> XLS, XLSX</li>
          <li><strong>Code Files:</strong> JS, HTML, CSS, Python</li>
          <li><strong>Metadata:</strong> EXIF data, document properties</li>
        </ul>

        <h3>Content Search Examples</h3>
        <CodeBlock language="text">
{`# Exact phrase in content
content:"quarterly sales report"

# Multiple terms in document
content:(budget AND forecast)

# Search with wildcards
content:analyt* (matches analytics, analysis)

# Exclude terms
content:budget NOT content:draft`}
        </CodeBlock>
      </section>

      <section id="search-tips">
        <h2>Search Tips & Tricks</h2>
        <p>Master these techniques to find files faster and more accurately.</p>

        <h3>Common Search Patterns</h3>
        <CodeBlock language="text">
{`# Find recent work
modified:thisweek AND type:docx

# Locate large files
size:>25MB

# Find shared files
is:shared

# Files with specific tags
tag:important OR tag:urgent

# Old files for cleanup
modified:<6months size:>10MB`}
        </CodeBlock>

        <h3>Search Efficiency Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Speed Up Searches">
            <ul className="text-sm space-y-1">
              <li><strong>Start Specific:</strong> Use unique terms first</li>
              <li><strong>Use Filters:</strong> Apply type/date filters early</li>
              <li><strong>Limit Scope:</strong> Search in specific folders</li>
              <li><strong>Save Queries:</strong> Reuse complex searches</li>
            </ul>
          </Card>
          
          <Card title="Troubleshooting">
            <ul className="text-sm space-y-1">
              <li><strong>No Results:</strong> Try broader terms, check spelling</li>
              <li><strong>Too Many Results:</strong> Add specific terms, use filters</li>
              <li><strong>Slow Searches:</strong> Use specific terms, limit scope</li>
              <li><strong>Missing Files:</strong> Check file names, recent uploads</li>
            </ul>
          </Card>
        </div>

        <Alert type="success" title="Search Mastery">
          Effective searching combines:
          <ul className="mt-2">
            <li>Specific keywords with appropriate filters</li>
            <li>Saved searches for repeated queries</li>
            <li>Content search for document collections</li>
            <li>Boolean operators for precise results</li>
          </ul>
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/user-guide/file-management" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">File Management →</h4>
              <p className="text-blue-800 text-sm">Learn file operations and organization</p>
            </Link>
            <Link href="/docs/user-guide/folders" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">Folder Organization →</h4>
              <p className="text-green-800 text-sm">Structure files for better searchability</p>
            </Link>
            <Link href="/docs/user-guide/account" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Account Settings →</h4>
              <p className="text-purple-800 text-sm">Configure search preferences</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}