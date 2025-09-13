'use client';

import { useState, useEffect } from 'react';
import { ExclamationTriangleIcon, CheckCircleIcon, ArrowDownTrayIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  draft: boolean;
  prerelease: boolean;
}

interface VersionInfoProps {
  className?: string;
}

export default function VersionInfo({ className = '' }: VersionInfoProps) {
  const [latestRelease, setLatestRelease] = useState<GitHubRelease | null>(null);
  const [allReleases, setAllReleases] = useState<GitHubRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentVersion, setCurrentVersion] = useState<string>('1.0.0');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCurrentVersion();
    fetchReleases();
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

  const fetchReleases = async () => {
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
      setError(err instanceof Error ? err.message : 'Failed to fetch version info');
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

  return (
    <>
      {/* Version Button */}
      <div className={`${className}`}>
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <InformationCircleIcon className="h-5 w-5 text-slate-600" />
              <div className="text-left">
                <div className="text-sm font-medium text-slate-900">
                  Version v{currentVersion}
                </div>
                <div className="text-xs text-slate-500">
                  {loading ? 'Checking updates...' : hasUpdate ? 'Update available' : 'Up to date'}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-400"></div>
              ) : hasUpdate ? (
                <ExclamationTriangleIcon className="h-4 w-4 text-amber-500" />
              ) : (
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
              )}
              <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
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
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    🚀 Version Information
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-1"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Current Version */}
                <div className="mb-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 flex items-center">
                        💻 Current Version
                      </h4>
                      <p className="text-2xl font-bold text-indigo-600">v{currentVersion}</p>
                    </div>
                    <div className="flex items-center">
                      {loading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                      ) : hasUpdate ? (
                        <div className="flex items-center space-x-2">
                          <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />
                          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
                            Update Available
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="h-6 w-6 text-green-500" />
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                            Up to Date
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Update Status */}
                {!loading && !error && latestRelease && (
                  <div className="mb-6">
                    {hasUpdate ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-amber-800">Update Available</h4>
                            <p className="text-sm text-amber-700 mt-1">
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
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="h-5 w-5 text-green-600" />
                          <div>
                            <h4 className="text-sm font-medium text-green-800">You're up to date!</h4>
                            <p className="text-sm text-green-700">You have the latest version installed.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Recent Releases */}
                {!loading && allReleases.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Releases</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {allReleases.slice(0, 5).map((release) => (
                        <div key={release.tag_name} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold text-gray-900">
                                  v{release.tag_name}
                                </span>
                                {release.tag_name === currentVersion && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                    Current
                                  </span>
                                )}
                                {compareVersions(currentVersion, release.tag_name) && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    New
                                  </span>
                                )}
                              </div>
                              {release.name && (
                                <div className="text-sm text-gray-700 mt-1 font-medium">
                                  {release.name}
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDate(release.published_at)}
                            </div>
                          </div>
                          
                          {release.body && (
                            <div className="text-sm text-gray-600 mb-3 bg-gray-50 p-2 rounded">
                              <div className="font-medium text-gray-700 mb-1">What's New:</div>
                              <div className="line-clamp-3 whitespace-pre-wrap">{release.body}</div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <a
                              href={release.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
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

                {/* Error State */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                      <div>
                        <h4 className="text-sm font-medium text-red-800">Unable to check for updates</h4>
                        <p className="text-sm text-red-700">Please check your internet connection and try again.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
        </div>
      )}
    </>
  );
}