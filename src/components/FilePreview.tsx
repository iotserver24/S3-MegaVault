import { useState, useEffect, useRef, useCallback } from 'react';
import { XMarkIcon, ArrowDownTrayIcon, DocumentIcon, PencilIcon } from '@heroicons/react/24/outline';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import type { RendererObject } from 'marked';

interface FilePreviewProps {
  fileKey: string;
  fileType: string;
  fileName: string;
  isPublic?: boolean;
  isEditable?: boolean;
}

// Create a custom renderer for marked
const renderer: RendererObject = {
  code(this: any, token: any): string {
    const text: string = token.text || '';
    const lang: string = token.lang || '';
    const validLanguage = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
    const highlighted = hljs.highlight(text, { language: validLanguage }).value;
    return `<pre class=\"hljs\"><code class=\"language-${validLanguage}\">${highlighted}</code></pre>`;
  }
};

// Configure marked parsing options
marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false,
  async: false
});

// Use the custom renderer
marked.use({ renderer });

// Add CSS for line numbers to the component
const codeEditorStyles = `
  .code-editor-container {
    display: flex;
    font-family: 'Fira Code', monospace;
    font-size: 14px;
    line-height: 1.5;
    background-color: #1e1e1e;
    border-radius: 4px;
    overflow: hidden;
  }

  .line-numbers {
    flex: 0 0 auto;
    padding: 8px;
    color: #858585;
    background-color: #252525;
    text-align: right;
    user-select: none;
  }

  .line-numbers div {
    padding: 0 8px;
    min-width: 40px;
  }

  .editor-wrapper {
    flex: 1;
    position: relative;
    padding: 0;
    overflow-x: auto;
  }

  .code-textarea,
  .syntax-highlight,
  .code-preview {
    font-family: 'Fira Code', monospace;
    font-size: 14px;
    line-height: 1.5;
    tab-size: 2;
    white-space: pre;
    word-wrap: normal;
    margin: 0;
    padding: 8px;
    box-sizing: border-box;
  }

  .code-preview {
    color: #d4d4d4;
    background: transparent;
  }

  .code-preview code {
    display: block;
    padding: 0;
    background: transparent;
  }

  .code-textarea {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    color: #d4d4d4;
    caret-color: white;
    outline: none;
    resize: none;
    overflow: auto;
    z-index: 2;
  }

  .syntax-highlight {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #d4d4d4;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
    display: none;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .syntax-highlight::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .syntax-highlight {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

const FilePreview: React.FC<FilePreviewProps> = ({ 
  fileKey, 
  fileType, 
  fileName, 
  isPublic = false,
  isEditable = false
}) => {
  const searchParams = useSearchParams();
  const [content, setContent] = useState<string | null>(null);
  const [rawContent, setRawContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(isEditable);
  const [editedContent, setEditedContent] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Add refs to track fetch state
  const isFetchingRef = useRef(false);
  const lastFetchedKeyRef = useRef<string>('');

  // Add state for line numbers
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);

  // Add a debounce timer ref for syntax highlighting
  const highlightTimerRef = useRef<NodeJS.Timeout | null>(null);

  const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
  
  // Extended file type support with syntax highlighting mappings
  const previewConfig = {
    image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'],
    pdf: ['pdf'],
    text: ['txt', 'log', 'yml', 'yaml', 'env', 'conf', 'ini', 'config', 'properties'],
    code: {
      javascript: ['js', 'jsx', 'mjs'],
      typescript: ['ts', 'tsx'],
      html: ['html', 'htm'],
      css: ['css', 'scss', 'sass', 'less'],
      json: ['json'],
      xml: ['xml'],
      markdown: ['md', 'markdown'],
      python: ['py', 'pyw'],
      ruby: ['rb'],
      php: ['php'],
      java: ['java'],
      go: ['go'],
      rust: ['rs'],
      sql: ['sql'],
      shell: ['sh', 'bash'],
      powershell: ['ps1'],
      dockerfile: ['dockerfile'],
      yaml: ['yml', 'yaml'],
    },
    markdown: ['md', 'markdown'],
    csv: ['csv'],
    audio: ['mp3', 'wav', 'ogg', 'm4a', 'aac'],
    video: ['mp4', 'webm', 'ogv', 'mov']
  };

  const getPreviewType = () => {
    // Check for image, pdf, audio, video first
    for (const [type, extensions] of Object.entries(previewConfig)) {
      if (type !== 'code' && Array.isArray(extensions) && extensions.includes(fileExtension)) {
        return type;
      }
    }

    // Check for code files
    for (const [language, extensions] of Object.entries(previewConfig.code)) {
      if (extensions.includes(fileExtension)) {
        return { type: 'code', language };
      }
    }

    return 'unknown';
  };

  const previewType = getPreviewType();

  // Updated input handler with debouncing for better performance
  const handleCodeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setEditedContent(newContent);
    
    // SPEED TEST MODE: Syntax highlighting disabled
    // if (highlightTimerRef.current) {
    //   clearTimeout(highlightTimerRef.current);
    // }
    // 
    // highlightTimerRef.current = setTimeout(() => {
    //   const highlightElement = document.getElementById('syntax-highlight');
    //   const textHighlightElement = document.getElementById('text-highlight');
    //   
    //   if (highlightElement && typeof previewType === 'object' && previewType.type === 'code') {
    //     highlightElement.innerHTML = prepareHighlightedHTML(newContent, previewType.language);
    //   } else if (textHighlightElement) {
    //     textHighlightElement.innerHTML = prepareHighlightedHTML(newContent);
    //   }
    // }, 300);
  };

  // Updated keydown handler for textarea
  const handleCodeKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle tab key to insert spaces instead of focusing next element
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      
      // Insert two spaces at cursor position
      const newText = 
        editedContent.substring(0, start) + 
        '  ' + 
        editedContent.substring(end);
      
      setEditedContent(newText);
      
      // Set cursor position after the inserted spaces
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      });
    }
  };

  // Add effect to update line numbers when content changes
  useEffect(() => {
    if (isEditing) {
      const lines = (editedContent || '').split('\n');
      setLineNumbers(Array.from({ length: lines.length }, (_, i) => i + 1));
    }
  }, [editedContent, isEditing]);

  // Modified effect to remove continuous updates for syntax highlighting
  useEffect(() => {
    if (isEditing) {
      // SPEED TEST MODE: Syntax highlighting disabled
      // const highlightElement = document.getElementById('syntax-highlight');
      // const textHighlightElement = document.getElementById('text-highlight');
      // 
      // if (highlightElement && typeof previewType === 'object' && previewType.type === 'code') {
      //   highlightElement.innerHTML = prepareHighlightedHTML(editedContent, previewType.language);
      // } else if (textHighlightElement) {
      //   textHighlightElement.innerHTML = prepareHighlightedHTML(editedContent);
      // }

      // Sync scroll still needed
      const syncScroll = (e: Event) => {
        const textarea = e.target as HTMLTextAreaElement;
        const highlightDiv = textarea.id === 'code-editor' 
          ? document.getElementById('syntax-highlight')
          : document.getElementById('text-highlight');
        
        if (highlightDiv) {
          highlightDiv.scrollTop = textarea.scrollTop;
          highlightDiv.scrollLeft = textarea.scrollLeft;
        }
      };

      const codeEditor = document.getElementById('code-editor') as HTMLTextAreaElement;
      const textEditor = document.getElementById('text-editor') as HTMLTextAreaElement;

      if (codeEditor) {
        codeEditor.addEventListener('scroll', syncScroll);
        return () => codeEditor.removeEventListener('scroll', syncScroll);
      } else if (textEditor) {
        textEditor.addEventListener('scroll', syncScroll);
        return () => textEditor.removeEventListener('scroll', syncScroll);
      }
    }
    
    return () => {
      if (highlightTimerRef.current) {
        clearTimeout(highlightTimerRef.current);
      }
    };
  }, [isEditing, editedContent.length === 0]);

  // Add keyboard shortcut for save (Ctrl+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+S or Cmd+S (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault(); // Prevent browser's save dialog
        
        if (isEditing && !isSaving) {
          handleSave();
        }
      }
    };

    if (isEditing) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditing, isSaving]);

  // Function to prepare HTML for syntax highlighting that preserves newlines
  const prepareHighlightedHTML = (code: string, language?: string): string => {
    if (!code) return '';
    
    // For code files, use syntax highlighting
    if (language) {
      try {
        const highlighted = hljs.highlight(code, { language }).value;
        // Make sure each line is wrapped in a div to preserve layout
        return highlighted.split('\n').map(line => 
          `<div>${line || ' '}</div>`
        ).join('');
      } catch (e) {
        console.error(`Error highlighting with language ${language}:`, e);
        // Fallback to plain text if highlighting fails
        return code.split('\n').map(line => 
          `<div>${line || ' '}</div>`
        ).join('');
      }
    }
    
    // For regular text, just preserve newlines with divs
    return code.split('\n').map(line => 
      `<div>${line || ' '}</div>`
    ).join('');
  };

  // Function to get all text nodes in an element
  const getTextNodesIn = (node: Node): Node[] => {
    const textNodes: Node[] = [];
    const walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
    
    let currentNode: Node | null = walk.nextNode();
    while (currentNode) {
      textNodes.push(currentNode);
      currentNode = walk.nextNode();
    }
    
    return textNodes;
  };

  // Function to set cursor position in contentEditable
  const setCursorPositionInContentEditable = (element: HTMLElement, position: number) => {
    const range = document.createRange();
    const selection = window.getSelection();
    
    // Find the right text node and position
    const textNodes = getTextNodesIn(element);
    let currentPos = 0;
    let foundNode = null;
    let foundOffset = 0;
    
    for (const node of textNodes) {
      const nodeLength = node.textContent?.length || 0;
      if (currentPos + nodeLength >= position) {
        foundNode = node;
        foundOffset = position - currentPos;
        break;
      }
      currentPos += nodeLength;
    }
    
    // If we found the right node, set the cursor
    if (foundNode) {
      range.setStart(foundNode, foundOffset);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
    } else if (textNodes.length > 0) {
      // Fallback: place at end of content
      const lastNode = textNodes[textNodes.length - 1];
      range.setStart(lastNode, lastNode.textContent?.length || 0);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  // Process markdown content synchronously
  const processMarkdown = (text: string): string => {
    return marked.parse(text, { async: false }) as string;
  };

  useEffect(() => {
    const fetchContent = async () => {
      // Prevent duplicate fetches
      if (isFetchingRef.current || lastFetchedKeyRef.current === fileKey) {
        return;
      }

      try {
        isFetchingRef.current = true;
        setLoading(true);
        setError(null);

        const previewTypeStr = typeof previewType === 'string' ? previewType : previewType.type;
        if (['text', 'code', 'markdown', 'csv'].includes(previewTypeStr)) {
          const endpoint = isPublic ? '/api/files/public/preview' : '/api/files/preview';
          const response = await fetch(`${endpoint}?key=${encodeURIComponent(fileKey)}`);
          
          if (!response.ok) throw new Error('Failed to load file content');
          
          let text = await response.text();
          setRawContent(text);

          // Process content based on type
          if (previewType === 'markdown') {
            text = processMarkdown(text);
          } else if (typeof previewType === 'object' && previewType.type === 'code') {
            text = hljs.highlight(text, { language: previewType.language }).value;
          } else if (previewType === 'csv') {
            // Enhanced CSV to HTML table conversion with better styling
            const rows = text.split('\n').map(row => 
              row.split(',').map(cell => cell.trim().replace(/^"|"$/g, ''))
            );
            const headers = rows[0];
            const body = rows.slice(1);
            text = `
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      ${headers.map(h => `<th class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800">${h}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    ${body.map((row, i) => `
                      <tr class="${i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'} hover:bg-gray-100 dark:hover:bg-gray-700">
                        ${row.map(cell => `<td class="px-3 py-2 text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">${cell}</td>`).join('')}
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `;
          }

          setContent(text);
          lastFetchedKeyRef.current = fileKey;
        }
      } catch (err) {
        console.error('Preview error:', err);
        setError('Failed to load preview');
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchContent();
  }, [fileKey, previewType, isPublic]);

  // Reset states when file changes
  useEffect(() => {
    if (lastFetchedKeyRef.current !== fileKey) {
      setImageLoaded(false);
      setVideoLoaded(false);
      setPdfLoaded(false);
      setIsEditing(false);
      setEditedContent('');
      setError(null);
      setContent(null);
      setLoading(true);
    }
  }, [fileKey]);

  // Update isEditing when isEditable prop changes
  useEffect(() => {
    setIsEditing(isEditable);
  }, [isEditable]);

  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Loading preview...</div>
      </div>
    </div>
  );

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(rawContent || '');
    // Update URL to include edit=true
    const url = new URL(window.location.href);
    url.searchParams.set('edit', 'true');
    window.history.pushState({}, '', url);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch('/api/files/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: fileKey,
          content: editedContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      // Update both contents
      setRawContent(editedContent);
      
      // Re-highlight the code if necessary
      const previewTypeStr = typeof previewType === 'string' ? previewType : previewType.type;
      if (previewTypeStr === 'code' && typeof previewType === 'object') {
        setContent(hljs.highlight(editedContent, { language: previewType.language }).value);
      } else if (previewType === 'markdown') {
        setContent(processMarkdown(editedContent));
      } else {
        setContent(editedContent);
      }
      
      setIsEditing(false);
      toast.success('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving file:', error);
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent('');
    // Remove edit=true from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('edit');
    window.history.pushState({}, '', url);
  };

  const EditButton = () => {
    const canEdit = ['text', 'code'].includes(typeof previewType === 'string' ? previewType : previewType.type) && !isPublic;
    return canEdit ? (
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 py-4 mb-4 flex justify-end gap-2 border-b border-gray-200 dark:border-gray-700">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                'Save Changes'
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center gap-2"
          >
            <PencilIcon className="h-4 w-4" />
            <span>Edit File</span>
          </button>
        )}
      </div>
    ) : null;
  };

  const renderPreview = () => {
    const previewTypeStr = typeof previewType === 'string' ? previewType : previewType.type;

    switch (previewTypeStr) {
      case 'image':
        return (
          <div className="relative flex items-center justify-center p-4">
            {!imageLoaded && <LoadingSpinner />}
            <img
              src={`${isPublic ? '/api/files/public/preview' : '/api/files/preview'}?key=${encodeURIComponent(fileKey)}`}
              alt={fileName}
              className={`max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        );

      case 'pdf':
        return (
          <div className="relative w-full h-[70vh]">
            {!pdfLoaded && <LoadingSpinner />}
            <iframe
              src={`${isPublic ? '/api/files/public/preview' : '/api/files/preview'}?key=${encodeURIComponent(fileKey)}#toolbar=0`}
              className={`w-full h-full rounded-lg shadow-lg transition-opacity duration-300 ${pdfLoaded ? 'opacity-100' : 'opacity-0'}`}
              title={fileName}
              onLoad={() => setPdfLoaded(true)}
            />
          </div>
        );

      case 'video':
        return (
          <div className="relative flex items-center justify-center p-4">
            {!videoLoaded && <LoadingSpinner />}
            <video
              controls
              className={`max-w-full max-h-[70vh] rounded-lg shadow-lg transition-opacity duration-300 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              src={`${isPublic ? '/api/files/public/preview' : '/api/files/preview'}?key=${encodeURIComponent(fileKey)}`}
              onLoadedData={() => setVideoLoaded(true)}
            >
              Your browser does not support the video element.
            </video>
          </div>
        );

      case 'audio':
        return (
          <div className="flex flex-col items-center justify-center gap-4 p-8">
            <div className="text-gray-500 dark:text-gray-400">
              <div className="w-16 h-16">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l6-6m0 0l6 6m-6-6v12a6 6 0 01-12 0v-3" />
                </svg>
              </div>
            </div>
            <audio
              controls
              className="w-full max-w-md"
              src={`${isPublic ? '/api/files/public/preview' : '/api/files/preview'}?key=${encodeURIComponent(fileKey)}`}
            >
              Your browser does not support the audio element.
            </audio>
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
          <div 
            className="overflow-auto max-h-[70vh]"
            dangerouslySetInnerHTML={{ __html: content || '' }}
          />
        );

      case 'code':
        return (
          <div className="relative overflow-auto max-h-[70vh]">
            <style>{codeEditorStyles}</style>
            <div className="relative">
              <EditButton />
              <div className="p-6 pt-0">
                {isEditing ? (
                  <div className="relative">
                    <label htmlFor="code-editor" className="sr-only">Edit {fileName}</label>
                    <div className="code-editor-container">
                      <div className="line-numbers">
                        {lineNumbers.map(num => (
                          <div key={num}>{num}</div>
                        ))}
                      </div>
                      <div className="editor-wrapper">
                        <div 
                          id="syntax-highlight"
                          className="syntax-highlight"
                          dangerouslySetInnerHTML={{ 
                            __html: typeof previewType === 'object' 
                              ? prepareHighlightedHTML(editedContent, previewType.language)
                              : prepareHighlightedHTML(editedContent)
                          }}
                        />
                        <textarea 
                          id="code-editor"
                          className="code-textarea"
                          value={editedContent}
                          onChange={handleCodeInput}
                          onKeyDown={handleCodeKeyDown}
                          spellCheck={false}
                          autoCapitalize="none"
                          autoComplete="off"
                          autoCorrect="off"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="code-editor-container">
                    <div className="line-numbers">
                      {content?.split('\n').map((_, i) => (
                        <div key={i + 1}>{i + 1}</div>
                      ))}
                    </div>
                    <div className="editor-wrapper">
                      <pre className="code-preview">
                        <code dangerouslySetInnerHTML={{ __html: content || '' }} />
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="relative overflow-auto max-h-[70vh]">
            <style>{codeEditorStyles}</style>
            <div className="relative">
              <EditButton />
              <div className="p-6 pt-0">
                {isEditing ? (
                  <div className="relative">
                    <label htmlFor="text-editor" className="sr-only">Edit {fileName}</label>
                    <div className="code-editor-container">
                      <div className="line-numbers">
                        {lineNumbers.map(num => (
                          <div key={num}>{num}</div>
                        ))}
                      </div>
                      <div className="editor-wrapper">
                        <div 
                          id="text-highlight"
                          className="syntax-highlight"
                          dangerouslySetInnerHTML={{ __html: prepareHighlightedHTML(editedContent) }}
                        />
                        <textarea 
                          id="text-editor"
                          className="code-textarea"
                          value={editedContent}
                          onChange={handleCodeInput}
                          onKeyDown={handleCodeKeyDown}
                          spellCheck={false}
                          autoCapitalize="none"
                          autoComplete="off"
                          autoCorrect="off"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="code-editor-container">
                    <div className="line-numbers">
                      {content?.split('\n').map((_, i) => (
                        <div key={i + 1}>{i + 1}</div>
                      ))}
                    </div>
                    <div className="editor-wrapper">
                      <pre className="code-preview whitespace-pre-wrap break-words text-sm text-gray-200">
                        {content}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
            <DocumentIcon className="h-16 w-16 mb-4" />
            <p>Preview not available for this file type</p>
            <p className="text-sm mt-2">Download the file to view it</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      {renderPreview()}
    </div>
  );
};

export default FilePreview;