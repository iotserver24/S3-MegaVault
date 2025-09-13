'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import { ExclamationTriangleIcon, CheckCircleIcon, XMarkIcon, InformationCircleIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  draft: boolean;
  prerelease: boolean;
}

export default function DashboardVersionInfo() {
  const [latestRelease, setLatestRelease] = useState<GitHubRelease | null>(null);
  const [allReleases, setAllReleases] = useState<GitHubRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentVersion, setCurrentVersion] = useState<string>('1.0.0');
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchCurrentVersion();
    fetchLatestRelease();
  }, []);

  const fetchCurrentVersion = async () => {
    try {
      const response = await fetch('/api/version');
      if (response.ok) {
        const data = await response.json();
        setCurrentVersion(data.version);
      }
    } catch (error) {
      console.error('Failed to fetch current version:', error);
    }
  };

  const fetchLatestRelease = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.github.com/repos/iotserver24/S3-MegaVault/releases');
      
      if (!response.ok) {
        throw new Error('Failed to fetch releases');
      }
      
      const releases: GitHubRelease[] = await response.json();
      
      // Filter out drafts and prereleases for latest version
      const stableReleases = releases.filter(release => !release.draft && !release.prerelease);
      
      setAllReleases(releases);
      setLatestRelease(stableReleases[0] || null);
    } catch (err) {
      console.error('Failed to fetch version info:', err);
    } finally {
      setLoading(false);
    }
  };

  const compareVersions = (current: string, latest: string): boolean => {
    // Remove 'v' prefix if present
    const currentClean = current.replace(/^v/, '');
    const latestClean = latest.replace(/^v/, '');
    
    const currentParts = currentClean.split('.').map(Number);
    const latestParts = latestClean.split('.').map(Number);
    
    for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
      const currentPart = currentParts[i] || 0;
      const latestPart = latestParts[i] || 0;
      
      if (latestPart > currentPart) return true;
      if (latestPart < currentPart) return false;
    }
    
    return false;
  };

  const hasUpdate = latestRelease && compareVersions(currentVersion, latestRelease.tag_name);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="px-4 py-3 border-t dark:border-gray-700">
        <button className="w-full flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-2">
            <InformationCircleIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Checking version...
            </div>
          </div>
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-400"></div>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Version Button */}
      <div className="px-4 py-3 border-t dark:border-gray-700">
        <button
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors group"
        >
          <div className="flex items-center space-x-2">
            <InformationCircleIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <div className="text-left">
              <div className="text-xs font-medium text-gray-900 dark:text-white">
                Version v{currentVersion}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {hasUpdate ? 'Update available' : 'Up to date'}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {hasUpdate ? (
              <ExclamationTriangleIcon className="h-3 w-3 text-amber-500" />
            ) : (
              <CheckCircleIcon className="h-3 w-3 text-green-500" />
            )}
            <svg className="w-3 h-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>

      {/* Modal */}
      {showModal && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setShowModal(false)}
            ></div>

            {/* Center the modal */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            {/* Modal content */}
            <div className="relative inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {/* Header */}
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    🎯 Version Information
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-1"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Current Version */}
                <div className="mb-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                        💻 Current Version
                      </h4>
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">v{currentVersion}</p>
                    </div>
                    <div className="flex items-center">
                      {hasUpdate ? (
                        <div className="flex items-center space-x-2">
                          <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />
                          <span className="text-xs bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full font-medium">
                            Update Available
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="h-6 w-6 text-green-500" />
                          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full font-medium">
                            Up to Date
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Update Status */}
                {latestRelease && (
                  <div className="mb-6">
                    {hasUpdate ? (
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200">Update Available</h4>
                            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                              Version {latestRelease.tag_name} is now available
                            </p>
                            <a
                              href={latestRelease.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center mt-3 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-md transition-colors"
                            >
                              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                              Download Update
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <div>
                            <h4 className="text-sm font-medium text-green-800 dark:text-green-200">You're up to date!</h4>
                            <p className="text-sm text-green-700 dark:text-green-300">You have the latest version installed.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Recent Releases */}
                {allReleases.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Recent Releases</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {allReleases.slice(0, 5).map((release) => (
                        <div key={release.tag_name} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                  v{release.tag_name}
                                </span>
                                {release.tag_name === currentVersion && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                                    Current
                                  </span>
                                )}
                                {compareVersions(currentVersion, release.tag_name) && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                    New
                                  </span>
                                )}
                              </div>
                              {release.name && (
                                <div className="text-sm text-gray-700 dark:text-gray-300 mt-1 font-medium">
                                  {release.name}
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(release.published_at)}
                            </div>
                          </div>
                          
                          {release.body && (
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 bg-white dark:bg-gray-800 p-2 rounded border">
                              <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">What's New:</div>
                              <div className="prose prose-sm dark:prose-invert max-w-none">
                                <ReactMarkdown
                                  components={{
                                    a: ({ node, ...props }) => (
                                      <a
                                        {...props}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      />
                                    ),
                                    p: ({ node, ...props }) => (
                                      <p {...props} className="mb-2 last:mb-0" />
                                    ),
                                    strong: ({ node, ...props }) => (
                                      <strong {...props} className="font-semibold text-gray-900 dark:text-white" />
                                    ),
                                    ul: ({ node, ...props }) => (
                                      <ul {...props} className="list-disc list-inside mb-2 space-y-1" />
                                    ),
                                    li: ({ node, ...props }) => (
                                      <li {...props} className="text-sm" />
                                    ),
                                    code: ({ node, ...props }) => (
                                      <code {...props} className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono" />
                                    )
                                  }}
                                >
                                  {release.body}
                                </ReactMarkdown>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <a
                              href={release.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                            >
                              View Release →
                            </a>
                            {compareVersions(currentVersion, release.tag_name) && (
                              <a
                                href={release.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded transition-colors"
                              >
                                <ArrowDownTrayIcon className="h-3 w-3 mr-1" />
                                Download
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}