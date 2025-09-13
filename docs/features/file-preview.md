# File Preview

MegaVault provides a powerful file preview system that supports a wide range of file types. This feature allows users to view files directly in the browser without downloading them.

## Supported File Types

### Images
- JPG/JPEG
- PNG
- GIF
- WebP
- SVG
- BMP
- ICO

### Documents
- PDF files
- Markdown (.md, .markdown)
- CSV files (rendered as formatted tables)

### Code Files
- JavaScript (.js, .jsx, .mjs)
- TypeScript (.ts, .tsx)
- HTML (.html, .htm)
- CSS (.css, .scss, .sass, .less)
- JSON (.json)
- XML (.xml)
- Python (.py, .pyw)
- Ruby (.rb)
- PHP (.php)
- Java (.java)
- Go (.go)
- Rust (.rs)
- SQL (.sql)
- Shell scripts (.sh, .bash)
- PowerShell (.ps1)
- Dockerfile

### Configuration Files
- YAML (.yml, .yaml)
- Environment files (.env)
- Configuration files (.conf, .ini, .config)
- Log files (.log)

### Media Files
- Audio (.mp3, .wav, .ogg, .m4a, .aac)
- Video (.mp4, .webm, .ogv, .mov)

## Features

### Automatic Type Detection
- File type is detected based on extension
- Appropriate viewer is selected automatically
- Fallback to text view for unknown text-based files

### Code Syntax Highlighting
- Language-specific syntax highlighting
- Dark mode support
- Line numbers
- Proper indentation preservation

### Markdown Rendering
- Full Markdown support
- Rendered HTML preview
- Support for tables, code blocks, and other Markdown features

### CSV Table View
- Automatic table formatting
- Column headers
- Alternating row colors
- Responsive design

### Media Controls
- Video player with standard controls
- Audio player with playback controls
- Image zoom and pan capabilities

### Loading States
- Loading spinners for all file types
- Progress indicators for large files
- Error handling with clear messages

## Usage

### Opening Files
1. Click on a file in the file list
2. The preview will open automatically
3. The appropriate viewer will be selected based on file type

### Navigation
- Use the close button (×) to return to the file list
- Use browser back/forward buttons to navigate between files
- Use the download button to save the file locally

### Error Handling
- If a file cannot be previewed, an error message will be shown
- Options to download or try again will be provided
- Clear error messages explain any issues

## Technical Details

### Implementation
- React-based component system
- Lazy loading for better performance
- Caching to prevent unnecessary reloads
- Responsive design for all screen sizes

### Security
- Content security policies enforced
- Safe rendering of HTML content
- XSS protection
- No file size restrictions

### Performance
- Optimized loading for large files
- Efficient memory usage
- Caching of previously viewed files
- Progressive loading for media files

## Configuration

The preview system can be configured through environment variables:

```env
MAX_PREVIEW_SIZE=104857600  # Maximum file size for preview (100MB)
ALLOWED_PREVIEW_TYPES=*    # Restrict preview to specific file types
CACHE_PREVIEW=true        # Enable/disable preview caching
```

## Related Features
- [File Editing](./file-editing.md)
- [File Sharing](./file-sharing.md)
- [Storage Management](./storage-management.md) 