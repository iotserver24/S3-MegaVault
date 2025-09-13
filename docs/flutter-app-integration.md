# MegaVault Flutter App Integration Guide

This guide explains how to integrate the MegaVault backend API with a Flutter mobile application.

## API Endpoints

All mobile-specific API endpoints are available under the `/api/mobile` path.

### Authentication

- **Login**: `POST /api/mobile/auth/login`
- **Register**: `POST /api/mobile/auth/register` (redirects to website)

### User Profile

- **Get User Profile**: `GET /api/mobile/users/me`

### File Management

- **List Files**: `GET /api/mobile/files/list`
- **Upload File**: `POST /api/mobile/files/upload`
- **Download File**: `GET /api/mobile/files/download`
- **Delete File/Folder**: `POST /api/mobile/files/delete`
- **Create Folder**: `POST /api/mobile/files/create-folder`

## Authentication Flow

1. The user logs in through the mobile app using the login API
2. The API returns a JWT token
3. Store the token securely in the Flutter app
4. Include the token in all subsequent API requests

## Flutter Integration Example

### Dependencies

Add these dependencies to your `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^0.13.5
  shared_preferences: ^2.1.0
  file_picker: ^5.3.0
  path_provider: ^2.0.15
  permission_handler: ^10.2.0
```

### Authentication Service

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  final String baseUrl = 'https://megavault.vercel.app/api/mobile';
  
  // Store auth token
  Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('auth_token', token);
  }
  
  // Get stored auth token
  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('auth_token');
  }
  
  // Clear stored auth token
  Future<void> clearToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
  }
  
  // Login with email and password
  Future<bool> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        await saveToken(data['token']);
        return true;
      }
      return false;
    } catch (e) {
      print('Login error: $e');
      return false;
    }
  }
  
  // Logout user
  Future<void> logout() async {
    await clearToken();
  }
  
  // Get user profile
  Future<Map<String, dynamic>?> getUserProfile() async {
    try {
      final token = await getToken();
      if (token == null) return null;
      
      final response = await http.get(
        Uri.parse('$baseUrl/users/me'),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );
      
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      return null;
    } catch (e) {
      print('Get profile error: $e');
      return null;
    }
  }
}
```

### File Service

```dart
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
import 'package:path/path.dart' as path;

class FileService {
  final String baseUrl = 'https://megavault.vercel.app/api/mobile';
  final AuthService authService = AuthService();
  
  // List files in a folder
  Future<List<dynamic>> listFiles({String folder = ''}) async {
    try {
      final token = await authService.getToken();
      if (token == null) throw Exception('Not authenticated');
      
      final queryParams = folder.isNotEmpty ? '?folder=${Uri.encodeComponent(folder)}' : '';
      final response = await http.get(
        Uri.parse('$baseUrl/files/list$queryParams'),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['files'] ?? [];
      }
      return [];
    } catch (e) {
      print('List files error: $e');
      return [];
    }
  }
  
  // Upload a file
  Future<bool> uploadFile(File file, {String folder = ''}) async {
    try {
      final token = await authService.getToken();
      if (token == null) throw Exception('Not authenticated');
      
      final request = http.MultipartRequest(
        'POST',
        Uri.parse('$baseUrl/files/upload'),
      );
      
      // Set authorization header
      request.headers['Authorization'] = 'Bearer $token';
      
      // Add folder if specified
      if (folder.isNotEmpty) {
        request.fields['folder'] = folder;
      }
      
      // Add file
      final fileExtension = path.extension(file.path).replaceAll('.', '');
      request.files.add(
        await http.MultipartFile.fromPath(
          'file',
          file.path,
          contentType: MediaType('application', fileExtension),
        ),
      );
      
      final response = await request.send();
      return response.statusCode == 200;
    } catch (e) {
      print('Upload file error: $e');
      return false;
    }
  }
  
  // Download a file
  Future<String?> getDownloadUrl(String fileKey) async {
    try {
      final token = await authService.getToken();
      if (token == null) throw Exception('Not authenticated');
      
      final encodedKey = Uri.encodeComponent(Uri.encodeComponent(fileKey));
      final response = await http.get(
        Uri.parse('$baseUrl/files/download?key=$encodedKey'),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['downloadUrl'];
      }
      return null;
    } catch (e) {
      print('Get download URL error: $e');
      return null;
    }
  }
  
  // Create a folder
  Future<bool> createFolder(String folderName, {String parentFolder = ''}) async {
    try {
      final token = await authService.getToken();
      if (token == null) throw Exception('Not authenticated');
      
      final response = await http.post(
        Uri.parse('$baseUrl/files/create-folder'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'folderName': folderName,
          'parentFolder': parentFolder,
        }),
      );
      
      return response.statusCode == 200;
    } catch (e) {
      print('Create folder error: $e');
      return false;
    }
  }
  
  // Delete a file or folder
  Future<bool> deleteFileOrFolder(String key, bool isFolder) async {
    try {
      final token = await authService.getToken();
      if (token == null) throw Exception('Not authenticated');
      
      final response = await http.post(
        Uri.parse('$baseUrl/files/delete'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'key': key,
          'isFolder': isFolder,
        }),
      );
      
      return response.statusCode == 200;
    } catch (e) {
      print('Delete error: $e');
      return false;
    }
  }
}
```

### Example Usage in Flutter UI

```dart
import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'dart:io';

class FilesScreen extends StatefulWidget {
  @override
  _FilesScreenState createState() => _FilesScreenState();
}

class _FilesScreenState extends State<FilesScreen> {
  final FileService _fileService = FileService();
  final AuthService _authService = AuthService();
  
  List<dynamic> _files = [];
  String _currentFolder = '';
  bool _isLoading = true;
  Map<String, dynamic>? _userProfile;
  
  @override
  void initState() {
    super.initState();
    _loadUserProfile();
    _loadFiles();
  }
  
  Future<void> _loadUserProfile() async {
    final profile = await _authService.getUserProfile();
    setState(() {
      _userProfile = profile;
    });
  }
  
  Future<void> _loadFiles() async {
    setState(() {
      _isLoading = true;
    });
    
    final files = await _fileService.listFiles(folder: _currentFolder);
    
    setState(() {
      _files = files;
      _isLoading = false;
    });
  }
  
  Future<void> _uploadFile() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles();
      
      if (result != null) {
        File file = File(result.files.single.path!);
        
        setState(() {
          _isLoading = true;
        });
        
        final success = await _fileService.uploadFile(
          file,
          folder: _currentFolder,
        );
        
        if (success) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('File uploaded successfully')),
          );
          _loadFiles();
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Failed to upload file')),
          );
        }
      }
    } catch (e) {
      print('Upload error: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error uploading file')),
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('MegaVault Files'),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: _loadFiles,
          ),
        ],
      ),
      body: _isLoading
        ? Center(child: CircularProgressIndicator())
        : Column(
            children: [
              // User info card
              if (_userProfile != null)
                Card(
                  margin: EdgeInsets.all(8),
                  child: Padding(
                    padding: EdgeInsets.all(16),
                    child: Row(
                      children: [
                        Icon(Icons.storage),
                        SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                '${_userProfile!['email']}',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                              Text(
                                'Plan: ${_userProfile!['planType']} (${_userProfile!['subscriptionStatus']})',
                              ),
                              Text(
                                'Storage: ${_userProfile!['usedStorage'].toStringAsFixed(2)} GB / ${_userProfile!['storageLimit']} GB',
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              
              // Breadcrumb for navigation
              if (_currentFolder.isNotEmpty)
                Padding(
                  padding: EdgeInsets.all(8),
                  child: Row(
                    children: [
                      TextButton(
                        onPressed: () {
                          setState(() {
                            _currentFolder = '';
                          });
                          _loadFiles();
                        },
                        child: Text('Root'),
                      ),
                      Icon(Icons.chevron_right),
                      Text(_currentFolder.split('/').last),
                    ],
                  ),
                ),
                
              // Files list
              Expanded(
                child: _files.isEmpty
                  ? Center(child: Text('No files or folders'))
                  : ListView.builder(
                      itemCount: _files.length,
                      itemBuilder: (context, index) {
                        final item = _files[index];
                        final isFolder = item['type'] == 'folder';
                        
                        return ListTile(
                          leading: Icon(
                            isFolder ? Icons.folder : Icons.insert_drive_file,
                          ),
                          title: Text(item['name']),
                          subtitle: !isFolder
                            ? Text('${(item['size'] / 1024 / 1024).toStringAsFixed(2)} MB')
                            : null,
                          onTap: isFolder
                            ? () {
                                setState(() {
                                  _currentFolder = item['key'].toString().replaceAll(/\/$/, '');
                                });
                                _loadFiles();
                              }
                            : null,
                          trailing: PopupMenuButton(
                            itemBuilder: (context) => [
                              if (!isFolder)
                                PopupMenuItem(
                                  value: 'download',
                                  child: Text('Download'),
                                ),
                              PopupMenuItem(
                                value: 'delete',
                                child: Text('Delete'),
                              ),
                            ],
                            onSelected: (value) async {
                              if (value == 'download') {
                                // Handle download
                                final url = await _fileService.getDownloadUrl(item['key']);
                                if (url != null) {
                                  // Launch URL or download using a plugin
                                }
                              } else if (value == 'delete') {
                                // Handle delete
                                final confirmed = await showDialog<bool>(
                                  context: context,
                                  builder: (context) => AlertDialog(
                                    title: Text('Confirm Delete'),
                                    content: Text('Are you sure you want to delete this ${isFolder ? 'folder' : 'file'}?'),
                                    actions: [
                                      TextButton(
                                        onPressed: () => Navigator.pop(context, false),
                                        child: Text('Cancel'),
                                      ),
                                      TextButton(
                                        onPressed: () => Navigator.pop(context, true),
                                        child: Text('Delete'),
                                      ),
                                    ],
                                  ),
                                ) ?? false;
                                
                                if (confirmed) {
                                  final success = await _fileService.deleteFileOrFolder(
                                    item['key'],
                                    isFolder,
                                  );
                                  
                                  if (success) {
                                    _loadFiles();
                                  }
                                }
                              }
                            },
                          ),
                        );
                      },
                    ),
              ),
            ],
          ),
      floatingActionButton: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(
            heroTag: 'createFolder',
            onPressed: () async {
              final folderName = await showDialog<String>(
                context: context,
                builder: (context) {
                  String name = '';
                  return AlertDialog(
                    title: Text('Create Folder'),
                    content: TextField(
                      onChanged: (value) => name = value,
                      decoration: InputDecoration(
                        labelText: 'Folder Name',
                      ),
                    ),
                    actions: [
                      TextButton(
                        onPressed: () => Navigator.pop(context),
                        child: Text('Cancel'),
                      ),
                      TextButton(
                        onPressed: () => Navigator.pop(context, name),
                        child: Text('Create'),
                      ),
                    ],
                  );
                },
              );
              
              if (folderName != null && folderName.isNotEmpty) {
                final success = await _fileService.createFolder(
                  folderName,
                  parentFolder: _currentFolder,
                );
                
                if (success) {
                  _loadFiles();
                }
              }
            },
            child: Icon(Icons.create_new_folder),
          ),
          SizedBox(height: 16),
          FloatingActionButton(
            heroTag: 'uploadFile',
            onPressed: _uploadFile,
            child: Icon(Icons.upload_file),
          ),
        ],
      ),
    );
  }
}
```

## Important Notes

1. All registration and subscription management must be done through the website
2. The mobile app only supports authentication and file operations
3. Users can log in with the same account on both the website and mobile app
4. All API requests except login require the Authorization header with the JWT token
5. The token expiry is set to 30 days

## Error Handling

All API endpoints return standardized error responses:

```json
{
  "error": "Error message describing what went wrong"
}
```

The HTTP status code will indicate the type of error:
- 400: Bad Request (invalid parameters)
- 401: Unauthorized (missing or invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Server Error 