# Drag and Drop Feature

## Overview
The MegaVault application now includes comprehensive drag and drop functionality for enhanced file management experience.

## Features

### 1. File Upload via Drag and Drop
- **Main Dashboard**: Drag files from your computer directly onto the main content area to upload them
- **Sidebar Upload**: Drag files onto the "Upload Files" button in the sidebar
- **File Preview**: Drag files onto the file preview modal to upload to the current folder
- **Visual Feedback**: Clear visual indicators show when files are being dragged over valid drop zones

### 2. File Movement via Drag and Drop
- **Drag Files**: Click and drag any file or folder in the file list
- **Drop on Folders**: Drop files onto folders to move them into that folder
- **Visual Indicators**: 
  - Dragged files become semi-transparent and slightly smaller
  - Target folders highlight with a blue ring when files are dragged over them
  - "Drop here to move file" message appears on valid drop targets

### 3. Visual Feedback System
- **Drag Overlay**: Full-screen overlay with upload instructions when dragging files
- **Global Drag Indicator**: Shows which file is being dragged in the top-right corner
- **Target Highlighting**: Clear visual feedback for valid drop targets
- **Progress Indicators**: Real-time upload progress with visual status indicators

## Technical Implementation

### Components
- **DragDropZone**: Reusable component for drag and drop functionality
- **File List**: Enhanced with drag and drop for file movement
- **File Preview**: Supports drag and drop for file uploads

### API Endpoints
- **POST /api/files/move**: Handles file movement between folders
- **POST /api/files/upload**: Existing endpoint for file uploads

### State Management
- Drag state tracking for visual feedback
- File movement validation and error handling
- Progress tracking for upload operations

## Usage Examples

### Uploading Files
1. Open your file explorer
2. Select one or more files
3. Drag them onto the MegaVault dashboard
4. Release to start the upload process

### Moving Files
1. In the file list, click and drag any file
2. Drag it over a folder (it will highlight)
3. Release to move the file into that folder

### Batch Operations
- Select multiple files and drag them all at once
- Upload entire folder structures by dragging folders
- Move multiple files between folders

## Browser Support
- Modern browsers with HTML5 drag and drop API support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile devices with touch drag support

## Error Handling
- File type validation
- No size restrictions
- Network error recovery
- User-friendly error messages

## Performance Considerations
- Efficient file processing with batching
- Visual feedback optimization
- Memory management for large file operations
- Responsive UI during long operations
