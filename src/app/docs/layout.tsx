'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Search from './components/Search';
import { 
  ChevronDownIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface NavigationItem {
  title: string;
  href?: string;
  children?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  {
    title: 'Getting Started',
    children: [
      { title: 'Quick Start', href: '/docs/getting-started/quick-start' },
      { title: 'Installation', href: '/docs/getting-started/installation' },
      { title: 'Environment Setup', href: '/docs/getting-started/environment' },
      { title: 'System Requirements', href: '/docs/getting-started/requirements' },
    ],
  },
  {
    title: 'User Guide',
    children: [
      { title: 'Dashboard Overview', href: '/docs/user-guide/dashboard' },
      { title: 'File Management', href: '/docs/user-guide/file-management' },
      { title: 'Folder Organization', href: '/docs/user-guide/folders' },
      { title: 'File Sharing', href: '/docs/user-guide/sharing' },
      { title: 'Search & Filtering', href: '/docs/user-guide/search' },
      { title: 'Account Settings', href: '/docs/user-guide/account' },
    ],
  },
  {
    title: 'Mobile Application',
    children: [
      // Mobile app coming soon - sub-pages removed
    ],
  },
  {
    title: 'Developer Guide',
    children: [
      { title: 'System Architecture', href: '/docs/developer/architecture' },
      { title: 'Development Setup', href: '/docs/developer/setup' },
      { title: 'Project Structure', href: '/docs/developer/structure' },
      { title: 'Contributing', href: '/docs/developer/contributing' },
      { title: 'Building & Testing', href: '/docs/developer/testing' },
      { title: 'Deployment', href: '/docs/developer/deployment' },
    ],
  },
  {
    title: 'API Reference',
    children: [
      { title: 'Authentication', href: '/docs/api/authentication' },
      { title: 'File Management', href: '/docs/api/files' },
      { title: 'User Management', href: '/docs/api/users' },
      { title: 'Mobile Endpoints', href: '/docs/api/mobile' },
      { title: 'Error Handling', href: '/docs/api/errors' },
      { title: 'Rate Limiting', href: '/docs/api/rate-limiting' },
    ],
  },
  {
    title: 'System Administration',
    children: [
      { title: 'Environment Variables', href: '/docs/admin/environment' },
      { title: 'Storage Configuration', href: '/docs/admin/storage' },
      { title: 'Redis Setup', href: '/docs/admin/redis' },
      { title: 'Monitoring', href: '/docs/admin/monitoring' },
      { title: 'Backup & Recovery', href: '/docs/admin/backup' },
    ],
  },
];

interface DocsLayoutProps {
  children: React.ReactNode;
}

function NavigationSection({ item, level = 0 }: { item: NavigationItem; level?: number }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === pathname;
  const hasActiveChild = item.children?.some(child => child.href === pathname);

  if (hasChildren) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md"
        >
          <span>{item.title}</span>
          {isOpen ? (
            <ChevronDownIcon className="w-4 h-4" />
          ) : (
            <ChevronRightIcon className="w-4 h-4" />
          )}
        </button>
        {isOpen && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children?.map((child) => (
              <NavigationSection key={child.title} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Only render a Link if href is defined
  if (!item.href) {
    return (
      <div className="px-3 py-2 text-sm text-slate-400 italic">
        {item.title} (Coming Soon)
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={`block px-3 py-2 text-sm rounded-md ${
        isActive
          ? 'text-blue-600 bg-blue-50 font-medium'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
      }`}
    >
      {item.title}
    </Link>
  );
}

function NavigationSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white border-r border-slate-200 z-50 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:fixed lg:h-screen ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 lg:hidden">
          <span className="text-lg font-semibold text-slate-900">Documentation</span>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-700"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        {/* Search */}
        <div className="p-4 border-b border-slate-200">
          <Search />
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto h-full pb-20">
          {navigation.map((section) => (
            <NavigationSection key={section.title} item={section} />
          ))}
        </nav>
      </div>
    </>
  );
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-slate-500 hover:text-slate-700 lg:hidden"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
            
            <Link 
              href="/"
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-slate-900">MegaVault</span>
            </Link>
            
            <div className="hidden sm:block w-px h-6 bg-slate-300" />
            <Link href="/docs" className="hidden sm:block text-slate-600 hover:text-slate-900 font-medium">
              Documentation
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="https://github.com/yourusername/megavault-open-source"
              className="inline-flex items-center px-3 py-1.5 border border-slate-300 text-sm font-medium rounded text-slate-700 bg-white hover:bg-slate-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              GitHub
            </Link>
          </div>
        </div>
      </header>

      <div className="lg:flex">
        {/* Sidebar */}
        <NavigationSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Main content */}
        <main className="flex-1 lg:ml-80 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}