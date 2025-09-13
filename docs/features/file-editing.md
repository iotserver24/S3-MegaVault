# File Editing

MegaVault provides built-in editing capabilities for text-based files. This feature allows users to modify files directly in the browser without downloading them.

## Supported File Types

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

### Script Files
- Shell scripts (.sh, .bash)
- PowerShell (.ps1)
- Dockerfile

### Configuration Files
- YAML (.yml, .yaml)
- Environment files (.env)
- Configuration files (.conf, .ini, .config)
- Log files (.log)

### Documentation Files
- Text files (.txt)
- Markdown (.md, .markdown)

## Features

### Editor Interface
- Full-screen editing mode
- Syntax highlighting
- Dark mode support
- Line numbers
- Proper indentation preservation
- Font size controls
- Word wrap options

### Quick Access
- Edit button in file list
- Edit button in file preview
- URL-based edit mode (?edit=true)
- Keyboard shortcuts

### Auto-save & Recovery
- Automatic save on changes
- Save indicators
- Unsaved changes warning
- Session recovery

### Security
- Authentication required
- File ownership verification
- Read-only mode for public files
- Content validation

## Usage

### Starting Edit Mode

There are three ways to start editing a file:

1. **From File List:**
   - Click the pencil icon (✎) next to any editable file
   - The file will open directly in edit mode

2. **From File Preview:**
   - Open any editable file
   - Click the "Edit File" button in the top-right corner
   - The preview will switch to edit mode

3. **Using URL Parameter:**
   - Add `?edit=true` to any file preview URL
   - The file will open directly in edit mode

### Editing Files

1. Make your changes in the editor
2. Changes are automatically saved as you type
3. Click "Save Changes" to commit your changes
4. Click "Cancel" to discard changes

### Keyboard Shortcuts

- `Ctrl + S` - Save changes
- `Esc` - Exit edit mode
- `Ctrl + Z` - Undo
- `Ctrl + Y` - Redo
- `Ctrl + F` - Find
- `Ctrl + H` - Replace

## Technical Details

### Implementation
- React-based editor component
- Real-time syntax highlighting
- Efficient state management
- Responsive design

### API Endpoints

#### GET /api/files/preview
- Fetches file content for editing
- Handles proper content type
- Returns raw file content

#### POST /api/files/update
- Saves file changes
- Validates content
- Updates file metadata
- Returns success/error status

### Security Measures

1. **Authentication:**
   - Required for all edit operations
   - Session validation
   - CSRF protection

2. **Authorization:**
   - File ownership verification
   - Edit permission checks
   - Public file restrictions

3. **Content Security:**
   - Input sanitization
   - Size limits
   - Format validation

### Error Handling

- Network error recovery
- Validation error messages
- Unsaved changes protection
- Session timeout handling

## Configuration

Editor settings can be configured through environment variables:

```env
MAX_EDIT_SIZE=10485760    # Maximum file size for editing (10MB)
AUTOSAVE_INTERVAL=5000    # Autosave interval in milliseconds
ALLOWED_EDIT_TYPES=*      # Restrict editing to specific file types
```

## Best Practices

1. **Regular Saving:**
   - Save frequently
   - Use autosave feature
   - Check save status indicator

2. **Large Files:**
   - Use external editor for very large files
   - Be patient with initial load
   - Consider splitting large files

3. **Content Types:**
   - Respect file format
   - Maintain proper syntax
   - Use appropriate line endings

## Related Features
- [File Preview](./file-preview.md)
- [File Sharing](./file-sharing.md)
- [Version Control](./version-control.md) 