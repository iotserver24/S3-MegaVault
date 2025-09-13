'use client';

import React, { useState, useRef, useCallback } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface DragDropZoneProps {
  onFilesDropped: (files: File[]) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
}

const DragDropZone: React.FC<DragDropZoneProps> = ({
  onFilesDropped,
  children,
  className = '',
  disabled = false,
  accept,
  multiple = true,
  maxFiles = 100,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = useCallback((files: FileList): File[] => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];

    // Check file count
    if (fileArray.length > maxFiles) {
      console.warn(`Maximum ${maxFiles} files allowed`);
      return fileArray.slice(0, maxFiles);
    }

    // Check file type only (no size limits)
    fileArray.forEach((file) => {
      if (accept) {
        const acceptedTypes = accept.split(',').map(type => type.trim());
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
        const mimeType = file.type;
        
        const isAccepted = acceptedTypes.some(type => 
          type === mimeType || 
          type === fileExtension ||
          (type.startsWith('.') && fileExtension === type) ||
          (type.includes('*') && mimeType.startsWith(type.replace('*', '')))
        );

        if (!isAccepted) {
          console.warn(`File ${file.name} type not accepted`);
          return;
        }
      }

      validFiles.push(file);
    });

    return validFiles;
  }, [maxFiles, accept]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    setDragCounter(prev => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    setDragCounter(prev => prev - 1);
    if (dragCounter <= 1) {
      setIsDragOver(false);
    }
  }, [disabled, dragCounter]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    setIsDragOver(false);
    setDragCounter(0);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const validFiles = validateFiles(files);
      if (validFiles.length > 0) {
        onFilesDropped(validFiles);
      }
    }
  }, [disabled, onFilesDropped, validateFiles]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const validFiles = validateFiles(files);
      if (validFiles.length > 0) {
        onFilesDropped(validFiles);
      }
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onFilesDropped, validateFiles]);

  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  return (
    <div
      className={`relative ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-label="File upload input"
      />

      {/* Drag overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-50 bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center rounded-lg">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl border-2 border-dashed border-blue-500 dark:border-blue-400">
            <div className="text-center">
              <CloudArrowUpIcon className="h-16 w-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Drop files here to upload
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {multiple ? 'Multiple files allowed' : 'Single file only'}
                {maxFiles && ` • Max files: ${maxFiles}`}
                • No size limit
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Children content */}
      {children}
    </div>
  );
};

export default DragDropZone;