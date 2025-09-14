'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  CloudArrowUpIcon, 
  FolderIcon, 
  DocumentIcon, 
  TrashIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  FolderPlusIcon,
  ArrowLeftOnRectangleIcon,
  SunIcon,
  MoonIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  GlobeAltIcon,
  LockClosedIcon,
  PencilIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { formatFileSize } from '../utils/formatFileSize';
import { throttle, debounce } from 'lodash';
import DashboardVersionInfo from '../../components/DashboardVersionInfo';

// Extend the default session types
declare module 'next-auth' {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      folderId?: string;
    }
  }
}

interface FileData {
  name: string;
  size: number;
  type: string;
  lastModified: string;
  key: string;
  isPublic?: boolean;
}

interface UploadFile extends Omit<globalThis.File, 'webkitRelativePath'> {
  webkitRelativePath?: string;
}

interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
  relativePath: string;
  uploadedParts?: number;
  totalParts?: number;
}

interface SubscriptionInfo {
  planType: string;
}

const SubscriptionBanner = ({ 
  planType
}: { planType: string }) => {
  return (
    <div className="px-4 py-4 border-b dark:border-gray-700 bg-blue-500/10">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium capitalize text-blue-500">
            {planType} Plan - Unlimited Storage
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Enjoy unlimited storage and file uploads
        </p>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [files, setFiles] = useState<FileData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fileListLoading, setFileListLoading] = useState(false);
  const [currentFolder, setCurrentFolder] = useState('');
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  // Storage tracking removed - unlimited storage system
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareDialogFile, setShareDialogFile] = useState<FileData | null>(null);
  const [isChangingAccess, setIsChangingAccess] = useState(false);
  const [isCopyingLink, setIsCopyingLink] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [fileToRename, setFileToRename] = useState<FileData | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const [isRenaming, setIsRenaming] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [folderCache, setFolderCache] = useState<{[key: string]: {files: FileData[], timestamp: number}}>({});
  const [lastOperation, setLastOperation] = useState<{type: string, timestamp: number} | null>(null);
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>({
    planType: 'unlimited'
  });
  
  // Simple drag and drop state
  const [isDragOver, setIsDragOver] = useState(false);
  
  const handleScroll = useRef(
    throttle(() => {
      // Any scroll-related logic can go here
      // This prevents excessive function calls during rapid scrolling
    }, 100)
  ).current;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);

  const debouncedSearch = useRef(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 400)
  ).current;

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInputValue(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Initialize dark mode from local storage
  useEffect(() => {
    setMounted(true);
    // Check if we should use dark mode
    if (typeof window !== 'undefined') {
      // Check local storage first
      const isDark = localStorage.getItem('darkMode') === 'true';
      // If nothing in local storage, check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const shouldUseDark = isDark ?? systemPrefersDark;
      setDarkMode(shouldUseDark);
      
      if (shouldUseDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);


  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const loadFiles = useCallback(async (forceRefresh = false) => {
    try {
      const cacheKey = currentFolder || 'root';
      const now = Date.now();
      const cachedData = folderCache[cacheKey];
      
      // Use cache if available and less than 30 seconds old, 
      // and no operations have been performed since caching
      const cacheValid = cachedData && 
                         (now - cachedData.timestamp < 30000) && 
                         (!lastOperation || lastOperation.timestamp < cachedData.timestamp) &&
                         !forceRefresh;
      
      if (cacheValid) {
        console.log('Using cached data for folder:', currentFolder);
        setFiles(cachedData.files);
        setFileListLoading(false);
        return;
      }
      
      console.log('Loading files for folder:', currentFolder);
      setFileListLoading(true);

      // Add request timeout for better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      try {
        const url = new URL('/api/files/list', window.location.origin);
        if (currentFolder) {
          url.searchParams.set('folder', currentFolder);
        }
  
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        const data = await res.json();
  
        if (!res.ok) {
          console.error('Failed to load files:', data);
          throw new Error(data.error || 'Failed to load files');
        }
  
        console.log('Files loaded:', data.files?.length || 0);
        
        // Limit the number of files processed to improve performance
        const processedFiles = Array.isArray(data.files) 
          ? data.files.slice(0, 500) // Only process up to 500 files for better performance
          : [];
          
        // Storage tracking removed
        
        // Cache the results
        setFolderCache(prev => ({
          ...prev,
          [cacheKey]: {
            files: processedFiles,
            timestamp: Date.now()
          }
        }));
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.error('Request timed out');
          toast.error('Request timed out. Please try again.');
        } else {
          throw err;
        }
      }
    } catch (error: any) {
      console.error('Error loading files:', error);
      toast.error(error.message || 'Failed to load files');
    } finally {
      setLoading(false);
      setFileListLoading(false);
    }
  }, [currentFolder, folderCache, lastOperation]);

  useEffect(() => {
    // Set unlimited plan info - no API calls needed for storage limits
    setSubscriptionInfo({
      planType: 'unlimited'
    });
  }, [session]);

  useEffect(() => {
    if (session?.user) {
      console.log('Session available, loading files for user:', session.user.folderId);
      loadFiles();
    }
  }, [loadFiles, session]);

  // Prevent navigation during upload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (uploading) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [uploading]);

  const processFiles = (files: FileList | null, relativePath: string = '') => {
    if (!files?.length) return;
    
    const selectedFiles = Array.from(files);
    // No storage limits - unlimited storage system
    
    // Show upload dialog immediately
    setShowUploadDialog(true);
    setUploading(true);
    
    // Initialize upload progress with all files
    const initialProgress = selectedFiles.map(file => ({
      fileName: file.name,
      progress: 0,
      status: 'pending' as const,
      relativePath: relativePath ? `${relativePath}/${file.name}` : file.name
    }));
    
    setUploadProgress(initialProgress);

    return selectedFiles;
  };

  // Helper function to traverse file tree for folder uploads
  const traverseFileTree = async (item: any, path: string = '', allFiles: File[], isRootEntry = false): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (item.isFile) {
        // Get the file and create a wrapper with relative path info
        item.file((file: File) => {
          // Create a new file object with custom relativePath property
          const fileWithPath = new File([file], file.name, {
            type: file.type,
            lastModified: file.lastModified
          });
          
          // Add the relative path as a custom property
          Object.defineProperty(fileWithPath, 'customRelativePath', {
            value: path ? `${path}/${file.name}` : file.name,
            writable: false,
            enumerable: true
          });
          
          allFiles.push(fileWithPath);
          resolve();
        }, reject);
      } else if (item.isDirectory) {
        // Read directory contents
        const dirReader = item.createReader();
        const readEntries = () => {
          dirReader.readEntries(async (entries: any[]) => {
            if (entries.length === 0) {
              resolve();
              return;
            }
            
            try {
              const promises = entries.map(entry => {
                // For root directory entries (when dragging a folder),
                // start with the folder name as the base path
                // For nested entries, append to the existing path
                const newPath = isRootEntry ? item.name : (path ? `${path}/${item.name}` : item.name);
                return traverseFileTree(entry, newPath, allFiles, false);
              });
              await Promise.all(promises);
              readEntries(); // Continue reading if there are more entries
            } catch (error) {
              reject(error);
            }
          }, reject);
        };
        readEntries();
      } else {
        resolve();
      }
    });
  };

  // Process files with their relative paths preserved
  const processFilesWithPaths = (files: File[]) => {
    if (!files?.length) return;
    
    // Show upload dialog immediately
    setShowUploadDialog(true);
    setUploading(true);
    
    // Initialize upload progress with all files including their paths
    const initialProgress = files.map(file => ({
      fileName: file.name,
      progress: 0,
      status: 'pending' as const,
      relativePath: (file as any).customRelativePath || (file as any).webkitRelativePath || file.name
    }));
    
    setUploadProgress(initialProgress);

    return files;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = processFiles(e.target.files);
    if (!selectedFiles) return;
    await uploadFiles(selectedFiles);
  };

  const handleFolderUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = processFiles(e.target.files);
    if (!selectedFiles) return;
    await uploadFiles(selectedFiles);
  };

  const uploadFiles = async (selectedFiles: globalThis.File[]) => {
    try {
      console.log('Starting upload for files:', selectedFiles.map(f => f.name));
      console.log('Upload progress state:', uploadProgress);
      
      // Process files in batches of 10
      const batchSize = 10;
      for (let i = 0; i < selectedFiles.length; i += batchSize) {
        const batch = selectedFiles.slice(i, i + batchSize);
        await Promise.all(batch.map(async (file, batchIndex) => {
          const index = i + batchIndex;
          
          // Add folder path information
          let relativePath = '';
          
          // Check for customRelativePath first (drag & drop folder upload)
          if ((file as any).customRelativePath) {
            relativePath = (file as any).customRelativePath;
          }
          // Check for webkitRelativePath (folder input upload)
          else if ('webkitRelativePath' in file && file.webkitRelativePath) {
            relativePath = file.webkitRelativePath;
          } 
          // Then check uploadProgress if available
          else if (uploadProgress[index]?.relativePath) {
            relativePath = uploadProgress[index].relativePath;
          }
          // Finally, just use the file name if no path is specified
          else {
            relativePath = file.name;
          }

          try {
            setUploadProgress(prev => prev.map((p, i) => 
              i === index ? { ...p, status: 'uploading' } : p
            ));

            // Check if file is larger than 10MB and use multipart upload
            const LARGE_FILE_THRESHOLD = 10 * 1024 * 1024; // 10MB
            if (file.size > LARGE_FILE_THRESHOLD) {
              console.log(`Using multipart upload for large file: ${file.name} (${file.size} bytes)`);
              
              const { uploadFileMultipart } = await import('@/lib/multipart-upload');
              
              const config = {
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                folder: currentFolder || undefined,
                relativePath: relativePath !== file.name ? relativePath : undefined,
              };

              await uploadFileMultipart(file, config, (progress) => {
                setUploadProgress(prev => prev.map((p, i) => 
                  i === index ? { 
                    ...p, 
                    progress: progress.progress,
                    status: progress.status,
                    error: progress.error,
                    uploadedParts: progress.uploadedParts,
                    totalParts: progress.totalParts
                  } : p
                ));
              });

              // Set to completed state
              setUploadProgress(prev => prev.map((p, i) => 
                i === index ? { ...p, status: 'completed', progress: 100 } : p
              ));
            } else {
              // Use regular upload for smaller files
              console.log(`Using regular upload for file: ${file.name} (${file.size} bytes)`);
              
              const formData = new FormData();
              formData.append('file', file);
              formData.append('relativePath', relativePath);

              if (currentFolder) {
                formData.append('folder', currentFolder);
              }

              const xhr = new XMLHttpRequest();
              
              await new Promise((resolve, reject) => {
                xhr.upload.addEventListener('progress', (event) => {
                  if (event.lengthComputable) {
                    const progress = (event.loaded / event.total) * 100;
                    setUploadProgress(prev => prev.map((p, i) => 
                      i === index ? { ...p, progress } : p
                    ));
                  }
                });

                xhr.addEventListener('load', () => {
                  if (xhr.status === 200) {
                    // Set to processing state first
                    setUploadProgress(prev => prev.map((p, i) => 
                      i === index ? { ...p, status: 'processing', progress: 100 } : p
                    ));
                    
                    // Simulate processing time for large files
                    setTimeout(() => {
                      setUploadProgress(prev => prev.map((p, i) => 
                        i === index ? { ...p, status: 'completed', progress: 100 } : p
                      ));
                    }, 1000); // Show processing state for at least 1 second
                    
                    resolve(xhr.response);
                  } else {
                    reject(new Error(`Upload failed: ${xhr.statusText}`));
                  }
                });

                xhr.addEventListener('error', () => {
                  reject(new Error('Upload failed'));
                });

                xhr.open('POST', '/api/files/upload');
                xhr.send(formData);
              });
            }

            } catch (error: any) {
              console.error('Error uploading file:', error);
              console.error('File details:', { name: file.name, size: file.size, type: file.type });
              setUploadProgress(prev => prev.map((p, i) => 
                i === index ? { ...p, status: 'error', error: `Upload failed: ${error.message || 'Unknown error'}` } : p
              ));
            }
        }));
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Failed to upload files');
    } finally {
      setUploading(false);
      // Record the operation timestamp
      setLastOperation({ type: 'upload', timestamp: Date.now() });
      loadFiles(true); // Force refresh after upload
      const hasErrors = uploadProgress.some(p => p.status === 'error');
      if (!hasErrors) {
        setTimeout(() => setShowUploadDialog(false), 1500);
      }
    }
  };

  // Enhanced drag and drop for current folder with counter to prevent flickering
  useEffect(() => {
    let dragCounter = 0;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter++;
      if (e.dataTransfer?.types.includes('Files')) {
        setIsDragOver(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter--;
      if (dragCounter === 0) {
        setIsDragOver(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter = 0;
      setIsDragOver(false);

      // Use DataTransferItems API to support folder uploads
      const items = e.dataTransfer?.items;
      if (items && items.length > 0) {
        try {
          const allFiles: File[] = [];
          const filePromises: Promise<void>[] = [];

          // Process each item (file or folder)
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.kind === 'file') {
              const entry = item.webkitGetAsEntry();
              if (entry) {
                // For drag and drop, start with empty path and mark as root entry
                // This will ensure folder structure is preserved correctly
                filePromises.push(traverseFileTree(entry, '', allFiles, true));
              }
            }
          }

          // Wait for all files to be collected
          await Promise.all(filePromises);

          if (allFiles.length > 0) {
            // Process files with their relative paths preserved
            const processedFiles = processFilesWithPaths(allFiles);
            if (processedFiles) {
              await uploadFiles(processedFiles);
            }
          }
        } catch (error) {
          console.error('Error processing dropped items:', error);
          // Fallback to regular file processing
          const files = e.dataTransfer?.files;
          if (files && files.length > 0) {
            const processedFiles = processFiles(files);
            if (processedFiles) {
              await uploadFiles(processedFiles);
            }
          }
        }
      }
    };

    // Add event listeners to the document to capture all drag events
    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
    };
  }, [uploadFiles]);

  const handleDelete = async (key: string) => {
    try {
      console.log('Attempting to delete file:', key);
      const res = await fetch('/api/files/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Delete failed:', data);
        throw new Error(data.error || 'Failed to delete file');
      }

      console.log('Delete successful:', data);
      toast.success('File deleted successfully!');
      // Record the operation timestamp
      setLastOperation({ type: 'delete', timestamp: Date.now() });
      loadFiles(true); // Force refresh after delete
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error.message);
    }
  };

  const handleCreateFolder = async () => {
    try {
      if (!newFolderName.trim()) {
        toast.error('Please enter a folder name');
        return;
      }

      const res = await fetch('/api/files/create-folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          folderName: newFolderName,
          parentFolder: currentFolder 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create folder');
      }

      toast.success('Folder created successfully!');
      setNewFolderName('');
      setShowNewFolderDialog(false);
      // Record the operation timestamp
      setLastOperation({ type: 'create', timestamp: Date.now() });
      loadFiles(true); // Force refresh after folder creation
    } catch (error: any) {
      console.error('Error creating folder:', error);
      toast.error(error.message);
    }
  };

  const navigateToFolder = (folderPath: string) => {
    // Only set file list loading if we're changing folders and don't have cache
    const cacheKey = folderPath || 'root';
    const cachedData = folderCache[cacheKey];
    const now = Date.now();
    const cacheValid = cachedData && 
                      (now - cachedData.timestamp < 30000) && 
                      (!lastOperation || lastOperation.timestamp < cachedData.timestamp);
    
    if (!cacheValid) {
      setFileListLoading(true);
    }
    
    setCurrentFolder(folderPath);
  };

  const getCurrentPath = () => {
    const parts = currentFolder.split('/').filter(Boolean);
    return parts.map((part, index) => ({
      name: part,
      path: parts.slice(0, index + 1).join('/'),
    }));
  };

  // Filter files for current folder
  const currentFiles = files;  // No need to filter, the API now handles it

  // Filter files based on search query with memoization for performance
  const filteredFiles = useCallback(() => {
    return files.filter(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [files, searchQuery]);

  // Memoized filtered files to prevent re-renders
  const memoizedFilteredFiles = useRef<FileData[]>([]);
  useEffect(() => {
    memoizedFilteredFiles.current = filteredFiles();
  }, [filteredFiles]);

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  const handleShare = async (file: FileData) => {
    try {
      // Directly fetch the file's metadata to get its current public status
      const response = await fetch(`/api/files/metadata?key=${encodeURIComponent(file.key)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch file metadata');
      }
      
      const fileData = await response.json();
      
      // Use the freshly fetched file data for the share dialog
      setShareDialogFile({
        ...file,
        isPublic: fileData.isPublic || false
      });
      
      setShowShareDialog(true);
    } catch (error) {
      console.error('Error fetching file metadata:', error);
      toast.error('Failed to open share dialog');
      
      // Fallback to using the file as is
      setShareDialogFile(file);
      setShowShareDialog(true);
    }
  };

  const handleShareOptionSelect = async (isPublic: boolean) => {
    if (!shareDialogFile) return;

    try {
      setIsChangingAccess(true);
      
      const response = await fetch('/api/files/toggle-public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: shareDialogFile.key, isPublic }),
      });

      if (!response.ok) {
        throw new Error('Failed to update file access');
      }

      // Update the share dialog file state to reflect the new access setting
      setShareDialogFile({
        ...shareDialogFile,
        isPublic
      });

      // Also update the file in the files list to maintain consistent state
      setFiles(prevFiles => 
        prevFiles.map(file => 
          file.key === shareDialogFile.key 
            ? { ...file, isPublic } 
            : file
        )
      );

      toast.success(`File is now ${isPublic ? 'accessible to anyone with the link' : 'restricted to authenticated users'}`);
      
      // No need to close the dialog when changing access - user can copy link after setting access
      await loadFiles();
    } catch (error) {
      console.error('Error updating file access:', error);
      toast.error('Failed to update file access');
    } finally {
      setIsChangingAccess(false);
    }
  };

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

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSelectedFile(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRename = async () => {
    if (!fileToRename || !newFileName.trim()) {
      toast.error('Please enter a valid name');
      return;
    }

    try {
      setIsRenaming(true);
      
      let oldKey = fileToRename.key;
      let newKey;

      if (fileToRename.type === 'folder') {
        // For folders, we need to keep the parent path and just change the folder name
        const pathParts = oldKey.split('/');
        // Remove empty strings (in case of trailing slashes)
        const filteredParts = pathParts.filter(part => part !== '');
        
        // Get the parent path (everything except the last part which is the folder name)
        const folderName = filteredParts[filteredParts.length - 1];
        const parentPath = filteredParts.slice(0, -1).join('/');
        
        // Construct the new key
        newKey = parentPath ? `${parentPath}/${newFileName}/` : `${newFileName}/`;
        
        // Ensure old key has trailing slash for folders
        oldKey = oldKey.endsWith('/') ? oldKey : `${oldKey}/`;
      } else {
        // For files, split the path and replace just the filename
        const lastSlashIndex = oldKey.lastIndexOf('/');
        
        if (lastSlashIndex >= 0) {
          // If there's a path, keep it and just change the filename
          newKey = `${oldKey.substring(0, lastSlashIndex + 1)}${newFileName}`;
        } else {
          // No path, just the filename
          newKey = newFileName;
        }
      }
      
      const res = await fetch('/api/files/rename', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          oldKey: oldKey,
          newKey: newKey,
          type: fileToRename.type
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to rename');
      }

      toast.success('Renamed successfully!');
      // Record the operation timestamp
      setLastOperation({ type: 'rename', timestamp: Date.now() });
      loadFiles(true); // Force refresh after rename
      setShowRenameDialog(false);
      setNewFileName('');
      setFileToRename(null);
    } catch (error: any) {
      console.error('Error renaming:', error);
      toast.error(error.message);
    } finally {
      setIsRenaming(false);
    }
  };

  const openRenameDialog = (file: FileData) => {
    // Extract just the filename from the path
    const fileName = file.name;
    setFileToRename(file);
    setNewFileName(fileName);
    setShowRenameDialog(true);
  };



  // Update the folder click handler for better perceived performance
  const handleFolderClick = (folderKey: string) => {
    // Get folder path from key
    const folderPath = folderKey.split('/').slice(1, -1).join('/');
    
    // First update UI immediately to show loading state
    setFileListLoading(true);
    
    // Then navigate to the folder (slight delay for better visual feedback)
    setTimeout(() => {
      navigateToFolder(folderPath);
    }, 50);
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // Check subscription status on component mount - removed for unlimited storage
  // useEffect(() => {
  //   if (session?.user) {
  //     fetchUserSubscriptionInfo();
  //   }
  // }, [session]);

  // Function to fetch user subscription information - removed for unlimited storage
  // Function to update subscription status - removed for unlimited storage


  if (status === 'loading' || loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg`}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="px-4 py-6 border-b dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">MegaVault</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label="Close sidebar"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back,</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{session?.user?.email}</p>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="px-4 py-4 border-b dark:border-gray-700">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <div className="flex items-center">
                {darkMode ? (
                  <MoonIcon className="h-5 w-5 mr-3" />
                ) : (
                  <SunIcon className="h-5 w-5 mr-3" />
                )}
                <span>Theme</span>
              </div>
              <span className="text-sm">{darkMode ? 'Dark' : 'Light'}</span>
            </button>
          </div>

          {/* Subscription Info */}
          <SubscriptionBanner
            planType={subscriptionInfo.planType}
          />

          {/* Sidebar Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            <button
              onClick={() => navigateToFolder('')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                !currentFolder 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Home
            </button>
            <button
              onClick={() => setShowNewFolderDialog(true)}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              <FolderPlusIcon className="h-5 w-5 mr-3" />
              New Folder
            </button>
            <div className="space-y-1">
              <label className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                <CloudArrowUpIcon className="h-5 w-5 mr-3" />
                Upload Files
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  multiple
                />
              </label>
              <label className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                <FolderIcon className="h-5 w-5 mr-3" />
                Upload Folder
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFolderUpload}
                  disabled={uploading}
                  multiple
                  {...{ webkitdirectory: "", directory: "" } as any}
                />
              </label>
            </div>
          </nav>

          {/* Docs Button */}
          <div className="px-4 py-2">
            <button
              onClick={() => router.push('/docs')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              <BookOpenIcon className="h-5 w-5 mr-3" />
              Docs
            </button>
          </div>

          {/* Version Info */}
          <DashboardVersionInfo />

          {/* Sign Out */}
          <div className="px-4 py-4 border-t dark:border-gray-700">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 lg:hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-700">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Open sidebar"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-medium text-gray-900 dark:text-white">MegaVault</h1>
            <div className="w-6"></div>
          </div>
        </div>

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Simple Drag Overlay */}
          {isDragOver && (
            <div className="fixed inset-0 z-50 bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center pointer-events-none">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl border-2 border-dashed border-blue-500 dark:border-blue-400">
                <div className="text-center">
                  <CloudArrowUpIcon className="h-16 w-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Drop files here to upload
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Release to start uploading to {currentFolder ? `/${currentFolder}` : 'root folder'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Search and actions */}
          <div className="mb-6 flex items-center justify-between">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search files..."
                value={searchInputValue}
                onChange={handleSearchInputChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Breadcrumb navigation */}
          {currentFolder && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-6">
              <div className="flex flex-wrap items-center text-sm">
                <button 
                  onClick={() => navigateToFolder('')}
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Root
                </button>
                {getCurrentPath().map((part, index) => (
                  <div key={part.path} className="flex items-center">
                    <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
                    <button
                      onClick={() => navigateToFolder(part.path)}
                      className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {part.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* File List */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-3">
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                Files
              </h2>

            </div>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                {fileListLoading ? (
                  <div>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-full md:w-1/2">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell md:w-1/4">
                            Size
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell md:w-1/4">
                            Last Modified
                          </th>
                          <th scope="col" className="relative px-6 py-3 w-24">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Skeleton loaders for files */}
                        {[...Array(5)].map((_, index) => (
                          <tr key={`skeleton-${index}`} className="animate-pulse">
                            <td className="px-6 py-4">
                              <div className="flex items-start">
                                <div className="h-5 w-5 mt-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                <div className="ml-4 min-w-0 flex-1">
                                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-600 rounded"></div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex justify-center items-center p-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Loading folder contents...</p>
                    </div>
                  </div>
                ) : memoizedFilteredFiles.current.length === 0 ? (
                  <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                    {searchQuery ? 'No files found matching your search.' : 'No files in this folder.'}
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-full md:w-1/2">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell md:w-1/4">
                          Size
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell md:w-1/4">
                          Last Modified
                        </th>
                        <th scope="col" className="relative px-6 py-3 w-24">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {/* Only render visible items for better performance */}
                      {memoizedFilteredFiles.current.slice(0, 100).map((file) => (
                        <tr 
                          key={file.key} 
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-start">
                              {file.type === 'folder' ? (
                                <button
                                  onClick={() => handleFolderClick(file.key)}
                                  className="flex items-start group w-full"
                                >
                                  <FolderIcon className="h-5 w-5 mt-1 flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                  <div className="ml-4 min-w-0 flex-1">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-all text-left">
                                      {file.name}
                                    </div>
                                  </div>
                                </button>
                              ) : (
                                <button
                                  onClick={() => router.push(`/pr/${encodeURIComponent(file.key)}`)}
                                  className="flex items-start group w-full"
                                >
                                  <DocumentIcon className="h-5 w-5 mt-1 flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                  <div className="ml-4 min-w-0 flex-1">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-all text-left">
                                      {file.name}
                                    </div>
                                  </div>
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                            {file.type === 'folder' ? '-' : formatFileSize(file.size)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                            {new Date(file.lastModified).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              {/* Desktop view - regular buttons */}
                              <div className="hidden sm:flex items-center space-x-2">
                              {file.type !== 'folder' && (
                                <>
                                  <button
                                    onClick={() => window.location.href = `/d/${encodeURIComponent(file.key)}`}
                                    className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none"
                                    title="Download file"
                                  >
                                    <ArrowDownTrayIcon className="h-5 w-5" />
                                  </button>
                                  {isEditableFile(file.name) && (
                                    <button
                                      onClick={() => router.push(`/pr/${encodeURIComponent(file.key)}?edit=true`)}
                                      className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none"
                                      title="Edit file"
                                    >
                                      <PencilIcon className="h-5 w-5" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleShare(file)}
                                    className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none"
                                    title="Share file"
                                  >
                                    <ShareIcon className="h-5 w-5" />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => openRenameDialog(file)}
                                className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none"
                                title="Rename"
                              >
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(file.key)}
                                className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors focus:outline-none"
                                title="Delete file"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                              </div>

                              {/* Mobile view - dropdown menu */}
                              <div className="sm:hidden relative" ref={dropdownRef}>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedFile(selectedFile?.key === file.key ? null : file);
                                  }}
                                  className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none p-1"
                                  title="More options"
                                >
                                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                  </svg>
                                </button>
                                
                                {selectedFile?.key === file.key && (
                                  <div 
                                    className="fixed w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-[999] left-1/2 top-2/5 -translate-x-1/2 -translate-y-1/2"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="py-1" role="menu">
                                      {file.type !== 'folder' && (
                                        <>
                                          <button
                                            onClick={() => {
                                              window.location.href = `/d/${encodeURIComponent(file.key)}`;
                                              setSelectedFile(null);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                                            role="menuitem"
                                          >
                                            <ArrowDownTrayIcon className="h-4 w-4 mr-3" />
                                            Download
                                          </button>
                                          {isEditableFile(file.name) && (
                                            <button
                                              onClick={() => {
                                                router.push(`/pr/${encodeURIComponent(file.key)}?edit=true`);
                                                setSelectedFile(null);
                                              }}
                                              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                                              role="menuitem"
                                            >
                                              <PencilIcon className="h-4 w-4 mr-3" />
                                              Edit
                                            </button>
                                          )}
                                          <button
                                            onClick={() => {
                                              handleShare(file);
                                              setSelectedFile(null);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                                            role="menuitem"
                                          >
                                            <ShareIcon className="h-4 w-4 mr-3" />
                                            Share
                                          </button>
                                        </>
                                      )}
                                      <button
                                        onClick={() => {
                                          openRenameDialog(file);
                                          setSelectedFile(null);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                                        role="menuitem"
                                      >
                                        <svg className="h-4 w-4 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Rename
                                      </button>
                                      <button
                                        onClick={() => {
                                          handleDelete(file.key);
                                          setSelectedFile(null);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                                        role="menuitem"
                                      >
                                        <TrashIcon className="h-4 w-4 mr-3" />
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* New Folder Dialog */}
      {showNewFolderDialog && (
        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Create New Folder</h3>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowNewFolderDialog(false);
                  setNewFolderName('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Dialog */}
      {showShareDialog && shareDialogFile && (
        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Share {shareDialogFile.name}</h3>
            
            <div className="mb-6">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Manage access:</p>
              <div className="space-y-3">
                <button
                  onClick={() => handleShareOptionSelect(true)}
                  disabled={isChangingAccess}
                  className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-colors ${
                    shareDialogFile.isPublic 
                      ? 'bg-blue-50 border-blue-300 dark:bg-blue-900 dark:border-blue-700' 
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  } ${isChangingAccess ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center">
                    <GlobeAltIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-3" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Anyone with the link</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">No sign in required</div>
                    </div>
                  </div>
                  {shareDialogFile.isPublic ? (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full dark:bg-blue-800 dark:text-blue-100">
                      Current
                    </span>
                  ) : isChangingAccess && (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-transparent border-t-blue-600"></div>
                  )}
                </button>
                
                <button
                  onClick={() => handleShareOptionSelect(false)}
                  disabled={isChangingAccess}
                  className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-colors ${
                    !shareDialogFile.isPublic 
                      ? 'bg-blue-50 border-blue-300 dark:bg-blue-900 dark:border-blue-700' 
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  } ${isChangingAccess ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center">
                    <LockClosedIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-3" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Only authenticated users</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Sign in required to access</div>
                    </div>
                  </div>
                  {!shareDialogFile.isPublic ? (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full dark:bg-blue-800 dark:text-blue-100">
                      Current
                    </span>
                  ) : isChangingAccess && (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-transparent border-t-blue-600"></div>
                  )}
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Share link:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/pr/${encodeURIComponent(shareDialogFile.key)}`}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                  aria-label="Share link URL"
                />
                <button
                  onClick={() => {
                    setIsCopyingLink(true);
                    navigator.clipboard.writeText(`${window.location.origin}/pr/${encodeURIComponent(shareDialogFile.key)}`)
                      .then(() => {
                        toast.success('Share link copied to clipboard');
                        setIsCopyingLink(false);
                      })
                      .catch(() => {
                        toast.error('Failed to copy share link');
                        setIsCopyingLink(false);
                      });
                  }}
                  disabled={isCopyingLink}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isCopyingLink ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Copying...</span>
                    </>
                  ) : (
                    "Copy URL"
                  )}
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowShareDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Uploading Files</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {uploadProgress.filter(f => f.status === 'completed').length} of {uploadProgress.length} files completed
                </p>
              </div>
              {!uploading && (
                <button
                  onClick={() => setShowUploadDialog(false)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  title="Close upload dialog"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <div className="overflow-y-auto flex-1 space-y-4 pr-2">
              {uploadProgress.map((file, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center min-w-0 flex-1">
                      <div className="flex-shrink-0 mr-3">
                        {file.status === 'completed' ? (
                          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : file.status === 'error' ? (
                          <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                            <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        ) : file.status === 'processing' ? (
                          <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-600 border-t-transparent"></div>
                          </div>
                        ) : file.status === 'uploading' ? (
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-14 0 9 9 0 0114 0z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {file.fileName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {file.relativePath !== file.fileName ? file.relativePath : ''}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className={`text-sm font-medium ${
                        file.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                        file.status === 'error' ? 'text-red-600 dark:text-red-400' :
                        file.status === 'processing' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-blue-600 dark:text-blue-400'
                      }`}>
                        {file.status === 'completed' ? '100%' : 
                         file.status === 'error' ? 'Error' :
                         file.status === 'processing' ? 'Processing' :
                         `${Math.round(file.progress)}%`}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        file.status === 'error' ? 'bg-red-500' :
                        file.status === 'completed' ? 'bg-green-500' :
                        file.status === 'processing' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${file.progress}%` }}
                    ></div>
                  </div>
                  {file.status === 'error' && (
                    <p className="mt-1 text-xs text-red-500">{file.error}</p>
                  )}
                </div>
              ))}
            </div>

            {!uploading && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowUploadDialog(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors rounded-md"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rename Dialog */}
      {showRenameDialog && fileToRename && (
        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Rename {fileToRename.type === 'folder' ? 'Folder' : 'File'}</h3>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Enter new name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowRenameDialog(false);
                  setNewFileName('');
                  setFileToRename(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleRename}
                disabled={isRenaming}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isRenaming ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Renaming...</span>
                  </>
                ) : (
                  "Rename"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
