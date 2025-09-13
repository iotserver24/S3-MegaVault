import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Project Structure Overview' },
  { id: 'root-directory', title: 'Root Directory' },
  { id: 'source-structure', title: 'Source Code Structure' },
  { id: 'app-directory', title: 'App Directory (Next.js 14)' },
  { id: 'components', title: 'Components Organization' },
  { id: 'library-code', title: 'Library & Utilities' },
  { id: 'naming-conventions', title: 'Naming Conventions' },
];

export default function ProjectStructurePage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Project Structure</h1>
        <p className="text-xl text-slate-600">
          Understand the organization and architecture of the MegaVault codebase for effective development and contribution.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Project Structure Overview</h2>
        <p>
          MegaVault follows Next.js 14 App Router conventions with a clear separation between frontend, 
          backend, and shared utilities. The project structure is designed for scalability and maintainability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Next.js App Router" description="Modern React framework structure">
            <ul className="text-sm space-y-1">
              <li>✅ App directory for routing</li>
              <li>✅ API routes co-located</li>
              <li>✅ Server components by default</li>
              <li>✅ File-based routing system</li>
            </ul>
          </Card>
          
          <Card title="TypeScript First" description="Type-safe development">
            <ul className="text-sm space-y-1">
              <li>✅ Strict TypeScript config</li>
              <li>✅ Type definitions included</li>
              <li>✅ Auto-generated types</li>
              <li>✅ Import path aliases</li>
            </ul>
          </Card>

          <Card title="Modular Architecture" description="Clean separation of concerns">
            <ul className="text-sm space-y-1">
              <li>✅ Feature-based organization</li>
              <li>✅ Reusable components</li>
              <li>✅ Shared utilities</li>
              <li>✅ Clear dependencies</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Architecture Philosophy">
          The MegaVault codebase follows these principles:
          <ul className="mt-2">
            <li>Feature-first organization over technical layers</li>
            <li>Explicit imports and dependencies</li>
            <li>Separation of client and server code</li>
            <li>Consistent naming and file organization</li>
          </ul>
        </Alert>
      </section>

      <section id="root-directory">
        <h2>Root Directory</h2>
        <p>
          The root directory contains configuration files, documentation, and the main source code directories.
        </p>

        <CodeBlock language="bash" title="Root Directory Structure">
{`megavault/
├── .env.example              # Environment variables template
├── .env.local               # Local environment variables (gitignored)
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore patterns
├── .prettierrc              # Prettier code formatting
├── README.md                # Project documentation
├── docker-compose.yml       # Docker composition for development
├── dockerfile               # Docker container definition
├── next.config.js           # Next.js configuration
├── package.json             # Node.js dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── middleware.ts            # Next.js middleware
├── public/                  # Static assets
├── src/                     # Source code
├── megavault_mobile/        # Flutter mobile app
├── docs/                    # Additional documentation
└── scripts/                 # Build and deployment scripts`}
        </CodeBlock>

        <h3>Key Configuration Files</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Core Configuration">
            <ul className="text-sm space-y-1">
              <li><strong>next.config.js:</strong> Next.js build and runtime configuration</li>
              <li><strong>tailwind.config.js:</strong> Tailwind CSS customization</li>
              <li><strong>tsconfig.json:</strong> TypeScript compiler settings</li>
              <li><strong>middleware.ts:</strong> Request/response middleware</li>
            </ul>
          </Card>
          
          <Card title="Development Tools">
            <ul className="text-sm space-y-1">
              <li><strong>.eslintrc.json:</strong> Code linting rules</li>
              <li><strong>.prettierrc:</strong> Code formatting configuration</li>
              <li><strong>docker-compose.yml:</strong> Development services</li>
              <li><strong>package.json:</strong> Dependencies and scripts</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="source-structure">
        <h2>Source Code Structure</h2>
        <p>
          The src/ directory contains all application source code, organized by functionality and Next.js conventions.
        </p>

        <CodeBlock language="bash" title="Source Directory Structure">
{`src/
├── app/                     # Next.js App Router
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page
│   ├── loading.tsx          # Global loading UI
│   ├── error.tsx            # Global error UI
│   ├── not-found.tsx        # 404 page
│   ├── api/                 # API route handlers
│   │   ├── auth/            # Authentication endpoints
│   │   ├── files/           # File management APIs
│   │   ├── mobile/          # Mobile-specific APIs
│   │   └── users/           # User management APIs
│   ├── auth/                # Authentication pages
│   ├── dashboard/           # Dashboard application
│   ├── docs/                # Documentation pages
│   └── components/          # Page-specific components
├── components/              # Reusable UI components
│   ├── ui/                  # Basic UI components
│   ├── forms/               # Form components
│   ├── layout/              # Layout components
│   └── features/            # Feature-specific components
├── lib/                     # Utility libraries
│   ├── auth.ts              # Authentication utilities
│   ├── storage.ts           # Storage service
│   ├── redis.ts             # Redis client
│   ├── config.ts            # Configuration management
│   ├── utils.ts             # General utilities
│   └── validations.ts       # Input validation schemas
├── types/                   # TypeScript type definitions
│   ├── auth.ts              # Authentication types
│   ├── files.ts             # File-related types
│   ├── api.ts               # API response types
│   └── global.ts            # Global type definitions
└── hooks/                   # Custom React hooks
    ├── useAuth.ts           # Authentication hook
    ├── useFiles.ts          # File management hook
    └── useLocalStorage.ts   # Local storage hook`}
        </CodeBlock>

        <h3>Import Path Aliases</h3>
        <p>MegaVault uses TypeScript path aliases for cleaner imports:</p>

        <CodeBlock language="typescript" title="Import Examples">
{`// Instead of relative imports
import { Button } from '../../../components/ui/Button'
import { auth } from '../../../lib/auth'

// Use absolute imports with aliases
import { Button } from '@/components/ui/Button'
import { auth } from '@/lib/auth'

// Available aliases:
// @/ → src/
// @/components → src/components
// @/lib → src/lib
// @/types → src/types`}
        </CodeBlock>
      </section>

      <section id="app-directory">
        <h2>App Directory (Next.js 14)</h2>
        <p>
          The app directory follows Next.js 14 App Router conventions with server components, 
          nested layouts, and co-located API routes.
        </p>

        <CodeBlock language="bash" title="App Directory Layout">
{`app/
├── layout.tsx               # Root layout (applied to all pages)
├── page.tsx                 # Home page (/)
├── loading.tsx              # Loading UI for all pages
├── error.tsx                # Error UI for all pages
├── not-found.tsx            # 404 page
├── globals.css              # Global CSS styles
├── auth/                    # Authentication routes
│   ├── layout.tsx           # Auth layout
│   ├── signin/
│   │   └── page.tsx         # /auth/signin
│   ├── signup/
│   │   └── page.tsx         # /auth/signup
│   └── verify/
│       └── page.tsx         # /auth/verify
├── dashboard/               # Main application
│   ├── layout.tsx           # Dashboard layout
│   ├── page.tsx             # /dashboard
│   ├── files/
│   │   ├── page.tsx         # /dashboard/files
│   │   └── [path]/
│   │       └── page.tsx     # /dashboard/files/[path]
│   └── settings/
│       └── page.tsx         # /dashboard/settings
├── docs/                    # Documentation
│   ├── layout.tsx           # Docs layout
│   ├── page.tsx             # /docs
│   ├── getting-started/
│   ├── user-guide/
│   └── developer/
└── api/                     # API routes
    ├── auth/
    │   ├── signin/
    │   │   └── route.ts     # POST /api/auth/signin
    │   └── signup/
    │       └── route.ts     # POST /api/auth/signup
    ├── files/
    │   ├── route.ts         # GET/POST /api/files
    │   ├── [id]/
    │   │   └── route.ts     # GET/PUT/DELETE /api/files/[id]
    │   └── upload/
    │       └── route.ts     # POST /api/files/upload
    └── mobile/
        ├── auth/
        └── files/`}
        </CodeBlock>

        <h3>Layout Hierarchy</h3>
        <ul>
          <li><strong>Root Layout:</strong> Applied to all pages (navigation, providers)</li>
          <li><strong>Auth Layout:</strong> Authentication pages (centered forms)</li>
          <li><strong>Dashboard Layout:</strong> Main app (sidebar, header, file browser)</li>
          <li><strong>Docs Layout:</strong> Documentation (sidebar navigation, search)</li>
        </ul>
      </section>

      <section id="components">
        <h2>Components Organization</h2>
        <p>
          Components are organized by usage pattern and complexity, from basic UI elements to complex features.
        </p>

        <CodeBlock language="bash" title="Components Structure">
{`components/
├── ui/                      # Basic UI components
│   ├── Button.tsx           # Reusable button component
│   ├── Input.tsx            # Form input component
│   ├── Modal.tsx            # Modal dialog component
│   ├── Card.tsx             # Card container component
│   ├── Badge.tsx            # Status badge component
│   └── index.ts             # Export barrel
├── forms/                   # Form-specific components
│   ├── LoginForm.tsx        # Login form
│   ├── SignupForm.tsx       # Registration form
│   ├── SettingsForm.tsx     # User settings form
│   └── FileUploadForm.tsx   # File upload interface
├── layout/                  # Layout components
│   ├── Header.tsx           # Application header
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── Footer.tsx           # Application footer
│   └── Navigation.tsx       # Main navigation
├── features/                # Feature-specific components
│   ├── auth/                # Authentication features
│   │   ├── AuthProvider.tsx # Auth context provider
│   │   └── ProtectedRoute.tsx # Route protection
│   ├── files/               # File management features
│   │   ├── FileList.tsx     # File listing component
│   │   ├── FilePreview.tsx  # File preview modal
│   │   ├── FileUpload.tsx   # Upload interface
│   │   └── SearchFiles.tsx  # File search
│   └── sharing/             # Sharing features
│       ├── ShareModal.tsx   # File sharing dialog
│       └── ShareLink.tsx    # Share link component
└── providers/               # Context providers
    ├── AuthProvider.tsx     # Authentication state
    ├── ThemeProvider.tsx    # Theme management
    └── FileProvider.tsx     # File management state`}
        </CodeBlock>

        <h3>Component Patterns</h3>
        <CodeBlock language="typescript" title="Component Template">
{`// components/ui/Button.tsx
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
            'border border-gray-300 bg-white hover:bg-gray-50': variant === 'outline',
          },
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading && <span className="mr-2">Loading...</span>}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps }`}
        </CodeBlock>
      </section>

      <section id="library-code">
        <h2>Library & Utilities</h2>
        <p>
          The lib directory contains shared utilities, configurations, and service integrations.
        </p>

        <CodeBlock language="bash" title="Library Structure">
{`lib/
├── auth.ts                  # Authentication configuration (NextAuth.js)
├── storage.ts               # S3/R2 storage service
├── redis.ts                 # Redis client and utilities
├── config.ts                # Application configuration
├── constants.ts             # Application constants
├── utils.ts                 # General utility functions
├── validations.ts           # Zod validation schemas
├── errors.ts                # Custom error classes
├── logger.ts                # Logging utilities
├── email.ts                 # Email service integration
└── upload.ts                # File upload utilities`}
        </CodeBlock>

        <h3>Key Library Files</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Core Services">
            <ul className="text-sm space-y-1">
              <li><strong>auth.ts:</strong> NextAuth.js configuration and providers</li>
              <li><strong>storage.ts:</strong> S3/R2 client and file operations</li>
              <li><strong>redis.ts:</strong> Redis connection and data operations</li>
              <li><strong>config.ts:</strong> Environment variable management</li>
            </ul>
          </Card>
          
          <Card title="Utilities">
            <ul className="text-sm space-y-1">
              <li><strong>utils.ts:</strong> General helper functions</li>
              <li><strong>validations.ts:</strong> Input validation schemas</li>
              <li><strong>errors.ts:</strong> Custom error handling</li>
              <li><strong>logger.ts:</strong> Structured logging</li>
            </ul>
          </Card>
        </div>

        <h3>Utility Examples</h3>
        <CodeBlock language="typescript" title="Common Utilities">
{`// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// lib/validations.ts
import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const fileUploadSchema = z.object({
  name: z.string().min(1, 'File name is required'),
  size: z.number().max(100 * 1024 * 1024, 'File size must be less than 100MB'),
  type: z.string().min(1, 'File type is required'),
  folder: z.string().optional().default('/'),
})`}
        </CodeBlock>
      </section>

      <section id="naming-conventions">
        <h2>Naming Conventions</h2>
        <p>
          Consistent naming conventions across the codebase improve readability and maintainability.
        </p>

        <h3>File Naming</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Next.js Files">
            <ul className="text-sm space-y-1">
              <li><strong>Pages:</strong> page.tsx (Next.js convention)</li>
              <li><strong>Layouts:</strong> layout.tsx (Next.js convention)</li>
              <li><strong>API Routes:</strong> route.ts (Next.js convention)</li>
              <li><strong>Components:</strong> PascalCase.tsx (Button.tsx)</li>
            </ul>
          </Card>
          
          <Card title="General Files">
            <ul className="text-sm space-y-1">
              <li><strong>Utilities:</strong> camelCase.ts (fileUtils.ts)</li>
              <li><strong>Constants:</strong> camelCase.ts (apiConstants.ts)</li>
              <li><strong>Types:</strong> camelCase.ts (userTypes.ts)</li>
              <li><strong>Hooks:</strong> useHookName.ts (useAuth.ts)</li>
            </ul>
          </Card>
        </div>

        <h3>Code Naming</h3>
        <ul>
          <li><strong>Variables:</strong> camelCase (userId, fileName, uploadProgress)</li>
          <li><strong>Functions:</strong> camelCase (getUserData, handleFileUpload)</li>
          <li><strong>Components:</strong> PascalCase (FileUpload, UserProfile)</li>
          <li><strong>Types/Interfaces:</strong> PascalCase (User, FileMetadata)</li>
          <li><strong>Constants:</strong> UPPER_SNAKE_CASE (API_BASE_URL, STORAGE_BUCKET)</li>
          <li><strong>CSS Classes:</strong> kebab-case (file-list, upload-button)</li>
        </ul>

        <Alert type="info" title="Consistency Guidelines">
          <ul className="mt-2">
            <li>Use descriptive names that clearly indicate purpose</li>
            <li>Avoid abbreviations unless they're widely understood</li>
            <li>Be consistent with similar patterns across the codebase</li>
            <li>Use TypeScript interfaces for complex object structures</li>
          </ul>
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/developer/setup" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Development Setup →</h4>
              <p className="text-blue-800 text-sm">Set up your development environment</p>
            </Link>
            <Link href="/docs/developer/contributing" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">Contributing Guide →</h4>
              <p className="text-green-800 text-sm">Learn how to contribute to the project</p>
            </Link>
            <Link href="/docs/developer/testing" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Testing Guide →</h4>
              <p className="text-purple-800 text-sm">Testing strategies and best practices</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}