'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  CloudIcon, 
  HomeIcon, 
  ArrowLeftIcon,
  FolderIcon,
  DocumentIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function DashboardNotFound() {
  const router = useRouter();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // If not authenticated, redirect to login
  if (!session) {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated cloud with warning icon */}
        <div className="relative mb-8">
          <div className="relative inline-block">
            <CloudIcon className="w-32 h-32 text-gray-300 dark:text-gray-600 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ExclamationTriangleIcon className="w-12 h-12 text-orange-500 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Dashboard Page Not Found
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
          The dashboard page you're looking for doesn't exist or has been moved. 
          Let's get you back to your files.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/dashboard"
            className="group flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <HomeIcon className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Back to Dashboard
          </Link>

          <button
            onClick={() => router.back()}
            className="group flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-all duration-300"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Go Back
          </button>
        </div>

        {/* Quick actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/dashboard"
              className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <FolderIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Browse Files</span>
            </Link>
            
            <Link
              href="/dashboard"
              className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <DocumentIcon className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Upload Files</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}