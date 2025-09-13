'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface SearchResult {
  title: string;
  path: string;
  excerpt: string;
  section: string;
}

// Mock search data - in a real implementation, this would come from a search index
const searchData: SearchResult[] = [
  {
    title: 'Quick Start Guide',
    path: '/docs/getting-started/quick-start',
    excerpt: 'Get MegaVault up and running in minutes with our streamlined setup process.',
    section: 'Getting Started'
  },
  {
    title: 'Installation Guide',
    path: '/docs/getting-started/installation',
    excerpt: 'Complete installation instructions for MegaVault across different platforms.',
    section: 'Getting Started'
  },
  {
    title: 'Environment Configuration',
    path: '/docs/getting-started/environment',
    excerpt: 'Configure MegaVault with environment variables for different deployment scenarios.',
    section: 'Getting Started'
  },
  {
    title: 'Dashboard Overview',
    path: '/docs/user-guide/dashboard',
    excerpt: 'Your complete guide to navigating and using the MegaVault dashboard.',
    section: 'User Guide'
  },
  {
    title: 'File Management',
    path: '/docs/user-guide/file-management',
    excerpt: 'Learn how to upload, organize, and manage files in MegaVault.',
    section: 'User Guide'
  },
  {
    title: 'File Sharing',
    path: '/docs/user-guide/sharing',
    excerpt: 'Share files securely with public links and collaboration features.',
    section: 'User Guide'
  },

  {
    title: 'System Architecture',
    path: '/docs/developer/architecture',
    excerpt: 'Deep dive into MegaVault architecture, design patterns, and technical decisions.',
    section: 'Developer Guide'
  },
  {
    title: 'Development Setup',
    path: '/docs/developer/setup',
    excerpt: 'Set up your development environment for contributing to MegaVault.',
    section: 'Developer Guide'
  },
  {
    title: 'Authentication API',
    path: '/docs/api/authentication',
    excerpt: 'Complete guide to authenticating with MegaVault APIs for web and mobile.',
    section: 'API Reference'
  },
  {
    title: 'File Management API',
    path: '/docs/api/files',
    excerpt: 'RESTful API endpoints for file operations, uploads, and downloads.',
    section: 'API Reference'
  },
];

interface SearchProps {
  onClose?: () => void;
}

export default function Search({ onClose }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        setResults([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    // Simple search implementation
    const filtered = searchData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      item.section.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    setResults(filtered);
    setSelectedIndex(-1);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      window.location.href = results[selectedIndex].path;
    }
  };

  const handleResultClick = (path: string) => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    if (onClose) onClose();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 border border-slate-300 rounded-md hover:border-slate-400 transition-colors"
      >
        <MagnifyingGlassIcon className="w-4 h-4" />
        <span>Search documentation...</span>
        <kbd className="hidden sm:inline-block px-2 py-1 text-xs bg-slate-100 border border-slate-300 rounded">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-600 bg-opacity-75 z-50"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Search Modal */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 mx-4">
        <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center px-4 py-3 border-b border-slate-200">
            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 outline-none text-slate-900 placeholder-slate-500"
              autoFocus
            />
            <kbd className="px-2 py-1 text-xs bg-slate-100 border border-slate-300 rounded">
              ESC
            </kbd>
          </div>

          {/* Search Results */}
          {results.length > 0 && (
            <div ref={resultsRef} className="max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <Link
                  key={result.path}
                  href={result.path}
                  onClick={() => handleResultClick(result.path)}
                  className={`block px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors ${
                    selectedIndex === index ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <DocumentTextIcon className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm font-medium text-slate-900 truncate">
                          {result.title}
                        </h3>
                        <span className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-full flex-shrink-0">
                          {result.section}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {result.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* No Results */}
          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <DocumentTextIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-slate-900 mb-1">No results found</h3>
              <p className="text-sm text-slate-600">
                Try searching with different keywords or browse the navigation menu.
              </p>
            </div>
          )}

          {/* Search Tips */}
          {!query && (
            <div className="px-4 py-6">
              <h3 className="text-sm font-medium text-slate-900 mb-3">Search Tips</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div>• Search by page title, content, or section name</div>
                <div>• Use ⌘K (Mac) or Ctrl+K (Windows) to open search</div>
                <div>• Use arrow keys to navigate results</div>
                <div>• Press Enter to visit selected result</div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Search powered by MegaVault</span>
              <div className="flex items-center space-x-2">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded">↑↓</kbd>
                <span>navigate</span>
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded">↵</kbd>
                <span>select</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}