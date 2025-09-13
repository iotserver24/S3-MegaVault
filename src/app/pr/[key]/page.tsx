'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { XMarkIcon, ArrowDownTrayIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon, PencilIcon } from '@heroicons/react/24/outline';
import FilePreview from '@/components/FilePreview';
import toast from 'react-hot-toast';

interface FileData {
  name: string;
  size: number;
  type: string;
  lastModified: string;
  key: string;
  isPublic?: boolean;
}

// Add vendor prefixes for fullscreen API
interface FullscreenDocument extends Document {
  webkitFullscreenElement?: Element;
  msFullscreenElement?: Element;
  webkitExitFullscreen?: () => void;
  msExitFullscreen?: () => void;
}

interface FullscreenHTMLElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

export default function FilePreviewPage({ params }: { params: { key: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = status === 'authenticated';

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        // First try to fetch as an authenticated user
        if (isAuthenticated) {
          const response = await fetch(`/api/files/metadata?key=${encodeURIComponent(params.key)}`);
          if (response.ok) {
            const data = await response.json();
            setFileData(data);
            setLoading(false);
            return;
          }
        }

        // If not authenticated or the private file fetch failed, try as public
        const publicResponse = await fetch(`/api/files/public/metadata?key=${encodeURIComponent(params.key)}`);
        if (!publicResponse.ok) {
          // If we're authenticated but couldn't access the file, it's probably a permissions issue
          if (isAuthenticated) {
            throw new Error('You don\'t have permission to access this file');
          } else {
            // Otherwise it might be a private file requiring authentication
            throw new Error('This file requires authentication to view');
          }
        }
        
        const data = await publicResponse.json();
        setFileData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load file data');
        console.error('File data error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFileData();
  }, [isAuthenticated, params.key]);

  // Redirect to login if in edit mode but not authenticated
  useEffect(() => {
    if (isEditMode && status === 'unauthenticated') {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(`/pr/${params.key}?edit=true`)}`);
    }
  }, [isEditMode, status, router, params.key]);

  const handleDownload = async () => {
    if (!fileData) return;
    window.location.href = `/d/${encodeURIComponent(fileData.key)}`;
  };

  const toggleFullscreen = () => {
    const doc = document as FullscreenDocument;
    const docEl = document.documentElement as FullscreenHTMLElement;
    
    if (!isFullscreen) {
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const doc = document as FullscreenDocument;
    
    const handleFullscreenChange = () => {
      const isDocFullscreen = !!doc.fullscreenElement || 
                             !!doc.webkitFullscreenElement || 
                             !!doc.msFullscreenElement;
      
      if (!isDocFullscreen && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [isFullscreen]);

  const isEditableFile = (fileName: string): boolean => {
    const editableExtensions = [
      'txt', 'md', 'markdown',
      'js', 'jsx', 'ts', 'tsx',
      'html', 'htm', 'css', 'scss',
      'json', 'xml', 'yaml', 'yml',
      'py', 'rb', 'php', 'java',
      'go', 'rs', 'sql', 'sh',
      'bash', 'ps1', 'env', 'conf',
      'ini', 'log', 'config'
    ];
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    return editableExtensions.includes(extension);
  };

  const handleEditToggle = () => {
    if (isEditMode) {
      router.push(`/pr/${encodeURIComponent(params.key)}`);
    } else {
      router.push(`/pr/${encodeURIComponent(params.key)}?edit=true`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!fileData || error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error || 'File not found'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            This file may have been moved, deleted, or is not accessible.
          </p>
          <div className="space-y-4">
            {status === 'unauthenticated' && (
              <button
                onClick={() => router.push(`/auth/login?callbackUrl=${encodeURIComponent(`/pr/${params.key}`)}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign in to access
              </button>
            )}
            <div>
              <button
                onClick={() => router.push('/')}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Return to home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 m-0 p-0 bg-white dark:bg-gray-900' : 'min-h-screen bg-gray-50 dark:bg-gray-900 p-2 sm:p-4'}`}>
      <div 
        ref={containerRef} 
        className={`${
          isFullscreen 
            ? 'w-full h-screen max-w-none m-0 rounded-none overflow-hidden flex flex-col' 
            : 'max-w-4xl mx-auto rounded-lg flex flex-col'
        } bg-white dark:bg-gray-800 shadow-xl`}
        style={isFullscreen ? { height: '100vh', width: '100vw' } : {}}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b dark:border-gray-700 flex-shrink-0">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white truncate max-w-[60%] sm:max-w-none">{fileData.name}</h3>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated && isEditableFile(fileData.name) && (
              <button
                onClick={handleEditToggle}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                title={isEditMode ? "View mode" : "Edit file"}
              >
                <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            )}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <ArrowsPointingInIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <ArrowsPointingOutIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              title="Download file"
            >
              <ArrowDownTrayIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={() => router.back()}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              title="Close preview"
            >
              <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div 
          className={`flex-1 overflow-auto`} 
          style={isFullscreen ? { 
            height: 'calc(100vh - 88px)', /* Adjusted for smaller header on mobile */
            minHeight: 0
          } : {}}
        >
          <FilePreview
            fileKey={fileData.key}
            fileType={fileData.type}
            fileName={fileData.name}
            isEditable={isAuthenticated && isEditMode}
            isPublic={fileData.isPublic}
          />
        </div>

        {/* Footer */}
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-t dark:border-gray-700 flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Size: {(fileData.size / 1024).toFixed(2)} KB • Last modified: {new Date(fileData.lastModified).toLocaleDateString()}
            </div>
            {fileData.isPublic && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-200 self-start sm:self-auto">
                Public
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 