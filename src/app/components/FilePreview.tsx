import { useState, useEffect } from 'react';
import { XMarkIcon, ArrowDownTrayIcon, DocumentIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface FilePreviewProps {
  file: {
    name: string;
    key: string;
    size: number;
    type: string;
    lastModified: string;
  };
  onClose: () => void;
  isPublic?: boolean;
}

// Configure marked with syntax highlighting
const renderer = new marked.Renderer();
marked.setOptions({
  renderer: renderer,
  gfm: true,
  breaks: true
});

// Configure syntax highlighting
marked.use({
  async: true,
  walkTokens: (token: any) => {
    if (token.type === 'code') {
      const code = token.text;
      const lang = token.lang;
    if (lang && hljs.getLanguage(lang)) {
        token.text = hljs.highlight(code, { language: lang }).value;
      } else {
        token.text = hljs.highlightAuto(code).value;
      }
    }
  }
});

const FilePreview: React.FC<FilePreviewProps> = ({ file, onClose, isPublic = false }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
  
  // Extended file type support
  const previewConfig = {
    image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'],
    pdf: ['pdf'],
    text: ['txt', 'log', 'yml', 'yaml', 'env', 'conf'],
    code: ['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'scss', 'json', 'xml', 'md', 'py', 'rb', 'php', 'java', 'go', 'rust', 'sql'],
    markdown: ['md', 'markdown'],
    csv: ['csv'],
    audio: ['mp3', 'wav', 'ogg'],
    video: ['mp4', 'webm', 'ogv']
  };

  const getPreviewType = () => {
    for (const [type, extensions] of Object.entries(previewConfig)) {
      if (extensions.includes(fileExtension)) {
        return type;
      }
    }
    return 'unknown';
  };

  const previewType = getPreviewType();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        if (['text', 'code', 'markdown', 'csv'].includes(previewType)) {
          const endpoint = isPublic ? '/api/files/public/preview' : '/api/files/preview';
          const response = await fetch(`${endpoint}?key=${encodeURIComponent(file.key)}`);
          
          if (!response.ok) throw new Error('Failed to load file content');
          
          let text = await response.text();

          // Process content based on type
          if (previewType === 'markdown') {
            text = await marked.parse(text);
          } else if (previewType === 'code') {
            text = hljs.highlightAuto(text).value;
          } else if (previewType === 'csv') {
            // Simple CSV to HTML table conversion
            const rows = text.split('\n').map(row => 
              row.split(',').map(cell => cell.trim().replace(/^"|"$/g, ''))
            );
            const headers = rows[0];
            const body = rows.slice(1);
            text = `
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    ${headers.map(h => `<th class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">${h}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${body.map(row => `
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                      ${row.map(cell => `<td class="px-3 py-2 text-sm text-gray-900 dark:text-gray-100">${cell}</td>`).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `;
          }

          setContent(text);
        }
      } catch (err) {
        console.error('Preview error:', err);
        setError('Failed to load preview');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [file.key, previewType, isPublic]);

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/files/download?key=${encodeURIComponent(file.key)}`);
      if (!response.ok) throw new Error('Failed to download file');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  const renderPreview = () => {
    switch (previewType) {
      case 'image':
        return (
          <div className="relative flex items-center justify-center p-4">
            <img
              src={`${isPublic ? '/api/files/public/preview' : '/api/files/preview'}?key=${encodeURIComponent(file.key)}`}
              alt={file.name}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        );

      case 'pdf':
        return (
          <iframe
            src={`${isPublic ? '/api/files/public/preview' : '/api/files/preview'}?key=${encodeURIComponent(file.key)}`}
            className="w-full h-[70vh] rounded-lg shadow-lg"
            title={file.name}
          />
        );

      case 'audio':
        return (
          <div className="flex items-center justify-center p-8">
            <audio
              controls
              className="w-full max-w-md"
              src={`${isPublic ? '/api/files/public/preview' : '/api/files/preview'}?key=${encodeURIComponent(file.key)}`}
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        );

      case 'video':
        return (
          <div className="flex items-center justify-center p-4">
            <video
              controls
              className="max-w-full max-h-[70vh] rounded-lg shadow-lg"
              src={`${isPublic ? '/api/files/public/preview' : '/api/files/preview'}?key=${encodeURIComponent(file.key)}`}
            >
              Your browser does not support the video element.
            </video>
          </div>
        );

      case 'markdown':
        return (
          <div 
            className="prose dark:prose-invert max-w-none p-6 overflow-auto max-h-[70vh]"
            dangerouslySetInnerHTML={{ __html: content || '' }}
          />
        );

      case 'csv':
        return (
          <div className="overflow-x-auto max-h-[70vh] p-4">
            <div 
              className="inline-block min-w-full align-middle"
              dangerouslySetInnerHTML={{ __html: content || '' }}
            />
          </div>
        );

      case 'text':
      case 'code':
        return (
          <pre className={`
            overflow-auto max-h-[70vh] p-6 rounded-lg
            ${previewType === 'code' ? 'hljs' : 'whitespace-pre-wrap break-words'}
            text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900
          `}>
            {previewType === 'code' ? (
              <code dangerouslySetInnerHTML={{ __html: content || '' }} />
            ) : (
              content
            )}
          </pre>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
            <DocumentIcon className="h-16 w-16 mb-4" />
            <p>Preview not available for this file type.</p>
            <p className="text-sm mt-2">Please download the file to view it.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{file.name}</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDownload}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              title="Download file"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              title="Close preview"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {renderPreview()}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Size: {(file.size / 1024).toFixed(2)} KB • Last modified: {new Date(file.lastModified).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview; 