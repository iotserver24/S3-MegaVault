'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CloudIcon, 
  HomeIcon, 
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  FolderIcon,
  DocumentIcon
} from '@heroicons/react/24/outline';

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className={`absolute animate-bounce opacity-20 text-blue-300 dark:text-blue-600`}
      style={{
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 60 + 20}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    >
      {i % 3 === 0 ? (
        <CloudIcon className="w-8 h-8" />
      ) : i % 3 === 1 ? (
        <FolderIcon className="w-6 h-6" />
      ) : (
        <DocumentIcon className="w-6 h-6" />
      )}
    </div>
  ));

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements}
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.5) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Large 404 with cloud animation */}
        <div className="relative mb-8">
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 animate-pulse">
            404
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30">
            <CloudIcon className="w-32 h-32 text-blue-300 dark:text-blue-700 animate-float" />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! File Not Found
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Looks like the file you're looking for has been moved to a different cloud or doesn't exist. 
          Let's help you find what you need!
        </p>

        {/* Search box */}
        <form onSubmit={handleSearch} className="mb-12 max-w-md mx-auto">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for files or folders..."
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 shadow-lg"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </form>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/dashboard"
            className="group flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <HomeIcon className="w-5 h-5 mr-3 group-hover:animate-bounce" />
            Go to Dashboard
          </Link>

          <button
            onClick={() => router.back()}
            className="group flex items-center px-8 py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-3 group-hover:animate-pulse" />
            Go Back
          </button>
        </div>

        {/* Help section */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Need Help?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <FolderIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Browse Files</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Explore your files and folders in the dashboard
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <CloudIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Upload Files</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Start uploading your files to the cloud storage
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <MagnifyingGlassIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Search</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use the search feature to find specific files
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-gray-500 dark:text-gray-400">
          <p className="flex items-center justify-center">
            <CloudIcon className="w-5 h-5 mr-2" />
            MegaVault - Your Cloud Storage Solution
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}