# MegaVault API Reference

This document provides an overview of the main API endpoints for MegaVault, grouped by feature. This is a single-user cloud storage system.

Repository: https://github.com/iotserver24/S3-MegaVault

---

## Authentication

### Register
- **POST** `/api/auth/register`
- **Description:** Registration is disabled. Single user system.
- **Response:** 403 Forbidden

### Login (Web)
- **POST** `/api/auth/[...nextauth]`
- **Description:** Standard NextAuth login (see NextAuth docs for details).

### Login (Mobile)
- **POST** `/api/mobile/auth/login`
- **Description:** Login for mobile clients, returns JWT and user info.
- **Request JSON:** `{ email, password }`
- **Response:** `{ token, user: { email, folderId, planType, ... } }`

### Check Email
- **POST** `/api/auth/check-email`
- **Description:** Check if an email is available for registration.
- **Request JSON:** `{ email }`
- **Response:** `{ available: true/false, message }`

---

## User Profile

### Get Current User (Web)
- **GET** `/api/users/me`
- **Description:** Get profile and billing info for the logged-in user.
- **Response:** `{ email, folderId, planType, storageLimit, usedStorage, ... }`

### Get Current User (Mobile)
- **GET** `/api/mobile/users/me`
- **Description:** Get profile and billing info for the logged-in mobile user.
- **Headers:** `Authorization: Bearer <JWT>`
- **Response:** `{ email, folderId, planType, storageLimit, usedStorage, ... }`

---

## File Management

### List Files
- **GET** `/api/files/list?folder=<folder>`
- **Description:** List files and folders in the user's storage (web).
- **Response:** `{ files: [ ... ], totalStorageUsed, totalStorageUsedMB }`

### List Files (Mobile)
- **GET** `/api/mobile/files/list?folder=<folder>`
- **Description:** List files and folders for mobile clients.
- **Headers:** `Authorization: Bearer <JWT>`
- **Response:** `{ files: [ ... ], totalStorageUsed, totalStorageUsedMB, currentFolder }`

### Upload File
- **POST** `/api/files/upload`
- **Description:** Upload a file (multipart/form-data: `file`, `folder?`). For files larger than 10MB, use multipart upload endpoints.
- **Response:** `{ message, key }`

### Multipart Upload (Large Files >10MB)

#### Initiate Multipart Upload
- **POST** `/api/files/multipart/initiate`
- **Description:** Initiate a multipart upload for large files.
- **Request JSON:** `{ fileName, fileSize, fileType, folder?, relativePath? }`
- **Response:** `{ uploadId, key, fileName, fileSize, fileType }`

#### Get Presigned URLs
- **POST** `/api/files/multipart/presigned-urls`
- **Description:** Get presigned URLs for uploading parts.
- **Request JSON:** `{ uploadId, key, partNumbers: number[] }`
- **Response:** `{ presignedUrls: [{ partNumber, url }] }`

#### Complete Multipart Upload
- **POST** `/api/files/multipart/complete`
- **Description:** Complete a multipart upload after all parts are uploaded.
- **Request JSON:** `{ uploadId, key, parts: [{ ETag, PartNumber }] }`
- **Response:** `{ message, key, location, etag }`

#### Abort Multipart Upload
- **POST** `/api/files/multipart/abort`
- **Description:** Abort a multipart upload and clean up uploaded parts.
- **Request JSON:** `{ uploadId, key }`
- **Response:** `{ message }`

### Delete File
- **DELETE** `/api/files/delete`
- **Description:** Delete a file.
- **Request JSON:** `{ key }`
- **Response:** `{ message }`

### Create Folder
- **POST** `/api/files/create-folder`
- **Description:** Create a new folder.
- **Request JSON:** `{ folderName, parentFolder? }`
- **Response:** `{ message, key }`

### File Metadata
- **GET** `/api/files/metadata?key=<fileKey>`
- **Description:** Get metadata for a file (web).
- **Response:** `{ ...file metadata... }`

### Public File Metadata
- **GET** `/api/files/public/metadata?key=<fileKey>`
- **Description:** Get metadata for a public file.
- **Response:** `{ ...file metadata... }`

---

## Billing

> **Note**: Billing features are not applicable to the single-user open source version of MegaVault. These endpoints are included for reference but will return appropriate responses indicating billing is not available.

### Checkout
- **POST** `/api/billing/checkout`
- **Description:** Not applicable in single-user mode.
- **Response:** 403 Forbidden - "Billing not available in single-user mode"

### Cancel Subscription
- **POST** `/api/billing/cancel`
- **Description:** Not applicable in single-user mode.
- **Response:** 403 Forbidden - "Billing not available in single-user mode"

### Billing Portal
- **GET** `/api/billing/portal`
- **Description:** Not applicable in single-user mode.
- **Response:** 403 Forbidden - "Billing not available in single-user mode"

### Signup Checkout
- **POST** `/api/billing/signup-checkout`
- **Description:** Not applicable in single-user mode.
- **Response:** 403 Forbidden - "Billing not available in single-user mode"

---

## Mobile API Endpoints

### Mobile Upload File
- **POST** `/api/mobile/files/upload`
- **Description:** Upload a file for mobile clients (multipart/form-data: `file`, `folder?`). For files larger than 10MB, use mobile multipart upload endpoints.
- **Headers:** `Authorization: Bearer <JWT>`
- **Response:** `{ message, key, name, size, type }`

### Mobile Multipart Upload (Large Files >10MB)

#### Mobile Initiate Multipart Upload
- **POST** `/api/mobile/files/multipart/initiate`
- **Description:** Initiate a multipart upload for large files (mobile).
- **Headers:** `Authorization: Bearer <JWT>`
- **Request JSON:** `{ fileName, fileSize, fileType, folder? }`
- **Response:** `{ uploadId, key, fileName, fileSize, fileType }`

#### Mobile Get Presigned URLs
- **POST** `/api/mobile/files/multipart/presigned-urls`
- **Description:** Get presigned URLs for uploading parts (mobile).
- **Headers:** `Authorization: Bearer <JWT>`
- **Request JSON:** `{ uploadId, key, partNumbers: number[] }`
- **Response:** `{ presignedUrls: [{ partNumber, url }] }`

#### Mobile Complete Multipart Upload
- **POST** `/api/mobile/files/multipart/complete`
- **Description:** Complete a multipart upload after all parts are uploaded (mobile).
- **Headers:** `Authorization: Bearer <JWT>`
- **Request JSON:** `{ uploadId, key, parts: [{ ETag, PartNumber }] }`
- **Response:** `{ message, key, location, etag, name, size, type }`

#### Mobile Abort Multipart Upload
- **POST** `/api/mobile/files/multipart/abort`
- **Description:** Abort a multipart upload and clean up uploaded parts (mobile).
- **Headers:** `Authorization: Bearer <JWT>`
- **Request JSON:** `{ uploadId, key }`
- **Response:** `{ message }`

---

## Admin Endpoints

> **Note**: Traditional admin endpoints are not applicable in single-user mode. User management is handled through environment variables.

### List Users
- **GET** `/api/admin/users`
- **Description:** Not applicable in single-user mode.
- **Response:** 403 Forbidden - "Admin endpoints not available in single-user mode"

### Billing Report
- **GET** `/api/admin/billing/report`
- **Description:** Not applicable in single-user mode.
- **Response:** 403 Forbidden - "Admin endpoints not available in single-user mode"

---

## Cron/Automation

### Subscription Check
- **GET** `/api/cron/subscription-check`
- **Description:** Cron endpoint to check and update user subscriptions (internal use).
- **Headers:** `Authorization: Bearer <CRON_SECRET_TOKEN>`

---

## Notes
- All endpoints expect and return JSON unless otherwise noted.
- Mobile endpoints require JWT in the `Authorization` header.
- For more details, see the codebase or contact the backend developer.

---

**Base URL:**
- Self-hosted: `https://your-domain.com/api/`
- Development: `http://localhost:3001/api/`

**Documentation:**
- GitHub Repository: https://github.com/iotserver24/S3-MegaVault
- Issues: https://github.com/iotserver24/S3-MegaVault/issues 