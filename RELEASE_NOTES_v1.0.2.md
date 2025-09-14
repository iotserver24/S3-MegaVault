# Release Notes for Version 1.0.2

**Release Date:** September 14, 2025

## 🎉 Overview

Version 1.0.2 introduces **major improvements** to file upload functionality with **S3-compatible direct multipart uploads** for handling large files efficiently. This release also includes comprehensive documentation updates and CORS configuration guides to ensure seamless file uploads across all supported storage providers.

---

## ✨ New Features

### 🚀 **Large File Upload Support (Multipart Uploads)**
- **Automatic Detection**: Files larger than 10MB automatically use multipart upload
- **Progress Tracking**: Real-time upload progress with part-level details
- **Parallel Uploads**: Uploads up to 5 parts simultaneously for better performance
- **Resilient Uploads**: Individual part failures don't affect the entire upload
- **Direct S3 Upload**: Client uploads directly to storage, reducing server load

### 📱 **Enhanced Mobile Support**
- **Mobile Multipart Uploads**: Full multipart upload support for mobile clients
- **Mobile-Specific Endpoints**: Dedicated mobile API endpoints for multipart uploads
- **CORS Headers**: Proper CORS headers for mobile app integration

---

## 🔧 Technical Improvements

### **Backend Enhancements**
- ✅ **New API Endpoints**:
  - `/api/files/multipart/initiate` - Start multipart upload
  - `/api/files/multipart/presigned-urls` - Generate presigned URLs
  - `/api/files/multipart/complete` - Complete multipart upload
  - `/api/files/multipart/abort` - Abort failed uploads
  - Mobile equivalents at `/api/mobile/files/multipart/*`

- ✅ **Multipart Upload Library**: New `src/lib/multipart-upload.ts` utility
- ✅ **Enhanced Error Handling**: Better error messages and recovery
- ✅ **Storage Mode Support**: Works with both bucket and folder storage modes

### **Frontend Enhancements**
- ✅ **Smart Upload Detection**: Automatically chooses upload method based on file size
- ✅ **Enhanced Progress UI**: Shows part upload progress and status
- ✅ **Error Recovery**: Automatic cleanup of failed uploads
- ✅ **Batch Processing**: Maintains existing batch upload functionality

---

## 📚 Documentation Updates

### **New Documentation Pages**
- ✅ **CORS Setup Guide**: `/docs/getting-started/cors-setup`
- ✅ **Storage Providers Guide**: `docs/storage-providers-cors.md`
- ✅ **Storage Providers Reference**: `STORAGE_PROVIDERS.md`
- ✅ **Updated Installation Guides**: Enhanced with CORS configuration steps

### **Enhanced Documentation**
- ✅ **API Reference**: Updated with multipart upload endpoints
- ✅ **Getting Started Guide**: Added CORS configuration requirements
- ✅ **README.md**: Prominent CORS warnings and setup instructions

---

## 🚨 **CRITICAL: CORS Configuration Required**

⚠️ **IMPORTANT NOTICE**: Before uploading files larger than 10MB, you **MUST** configure CORS settings on your storage bucket. Without proper CORS configuration, you will encounter these errors:

### **Common CORS Errors**
```
Error 1: "Access to XMLHttpRequest at 'https://your-bucket.s3.amazonaws.com/your-file' from origin 'https://your-website.com' has been blocked by CORS policy."

Error 2: "OPTIONS https://your-bucket.s3.amazonaws.com/your-file 403 (Forbidden)"

Error 3: "Network Error: Failed to fetch"
```

---

## 🔧 **CORS Configuration for All Storage Providers**

### **📁 Step 1: Create CORS Configuration File**

Create a file named `cors.json` in your project root:

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag", "x-amz-version-id"],
    "MaxAgeSeconds": 3000
  }
]
```

### **🔧 Step 2: Apply CORS Configuration**

#### **1. Amazon S3**
```bash
# Using AWS CLI
aws s3api put-bucket-cors \
  --bucket YOUR_BUCKET_NAME \
  --cors-configuration file://cors.json
```

**Alternative - AWS Console:**
1. Go to AWS S3 Console
2. Select your bucket
3. Go to "Permissions" tab
4. Scroll to "Cross-origin resource sharing (CORS)"
5. Click "Edit" and paste the CORS configuration
6. Click "Save changes"

#### **2. Cloudflare R2**
```bash
# Using AWS CLI with R2 endpoint
aws s3api put-bucket-cors \
  --bucket YOUR_BUCKET_NAME \
  --cors-configuration file://cors.json \
  --endpoint-url https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
```

**Alternative - Cloudflare Dashboard:**
1. Go to Cloudflare Dashboard
2. Navigate to R2 Object Storage
3. Select your bucket
4. Go to "Settings" tab
5. Scroll to "CORS policy"
6. Click "Add CORS policy"
7. Paste the CORS configuration
8. Click "Save"

#### **3. Google Cloud Storage**
```bash
# Using gsutil
gsutil cors set cors.json gs://YOUR_BUCKET_NAME
```

**Alternative - Google Cloud Console:**
1. Go to Google Cloud Console
2. Navigate to Cloud Storage
3. Select your bucket
4. Click on "Permissions" tab
5. Scroll to "CORS configuration"
6. Click "Edit" and add the CORS rules
7. Click "Save"

#### **4. Microsoft Azure Blob Storage**
```bash
# Using Azure CLI
az storage cors add \
  --services b \
  --methods GET PUT POST DELETE HEAD \
  --origins "*" \
  --allowed-headers "*" \
  --exposed-headers "ETag" \
  --max-age 3000
```

**Alternative - Azure Portal:**
1. Go to Azure Portal
2. Navigate to your Storage Account
3. Go to "Resource sharing (CORS)"
4. Select "Blob service"
5. Add CORS rules for each method
6. Click "Save"

#### **5. DigitalOcean Spaces**
```bash
# Using AWS CLI with Spaces endpoint
aws s3api put-bucket-cors \
  --bucket YOUR_BUCKET_NAME \
  --cors-configuration file://cors.json \
  --endpoint-url https://YOUR_REGION.digitaloceanspaces.com
```

**Alternative - DigitalOcean Control Panel:**
1. Go to DigitalOcean Control Panel
2. Navigate to Spaces
3. Select your Space
4. Go to "Settings" tab
5. Scroll to "CORS configuration"
6. Click "Add CORS rule"
7. Paste the CORS configuration
8. Click "Save"

#### **6. Wasabi Cloud Storage**
```bash
# Using AWS CLI with Wasabi endpoint
aws s3api put-bucket-cors \
  --bucket YOUR_BUCKET_NAME \
  --cors-configuration file://cors.json \
  --endpoint-url https://s3.wasabisys.com
```

**Alternative - Wasabi Console:**
1. Go to Wasabi Console
2. Navigate to your bucket
3. Go to "Properties" tab
4. Scroll to "Cross-origin resource sharing (CORS)"
5. Click "Edit" and add CORS rules
6. Click "Save"

#### **7. MinIO (Self-Hosted)**
```bash
# Install MinIO Client
curl https://dl.min.io/client/mc/release/linux-amd64/mc -o mc
chmod +x mc && sudo mv mc /usr/local/bin/

# Configure MinIO alias
mc alias set myminio http://your-minio-server:9000 YOUR_ACCESS_KEY YOUR_SECRET_KEY

# Create MinIO-specific CORS config (cors-minio.json)
{
  "CORSRules": [
    {
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "HEAD", "POST", "PUT", "DELETE"],
      "AllowedHeaders": ["*"],
      "ExposeHeaders": ["ETag"],
      "MaxAgeSeconds": 3000
    }
  ]
}

# Apply CORS configuration
mc admin config set myminio/ cors-minio.json
```

**Alternative - MinIO Console:**
1. Go to MinIO Console (usually http://your-minio-server:9001)
2. Navigate to your bucket
3. Go to "Settings" tab
4. Click on "CORS configuration"
5. Add the CORS rules
6. Click "Save"

#### **8. Firebase Storage**
```bash
# Using Google Cloud SDK
gcloud storage buckets update gs://YOUR_BUCKET_NAME \
  --cors-file=cors.json
```

**Alternative - Firebase Console:**
1. Go to Firebase Console
2. Navigate to Storage
3. Go to "Rules" tab
4. Add CORS configuration in the rules
5. Click "Publish"

#### **9. Oracle Cloud Object Storage**
```bash
# Using OCI CLI
oci os bucket update \
  --bucket-name YOUR_BUCKET_NAME \
  --namespace YOUR_NAMESPACE \
  --cors-configuration file://cors.json
```

**Alternative - Oracle Cloud Console:**
1. Go to Oracle Cloud Console
2. Navigate to Object Storage
3. Select your bucket
4. Go to "CORS" tab
5. Click "Add CORS rule"
6. Configure the CORS settings
7. Click "Save"

### **❌ Providers NOT Recommended for Large Files**

#### **Backblaze B2**
- **CORS Support**: ❌ Limited
- **Recommendation**: Use only for small file uploads
- **Alternative**: Use server-side uploads only

---

## 🧪 **Testing Your CORS Configuration**

### **1. Browser Testing**
1. Open browser developer tools (F12)
2. Go to "Network" tab
3. Attempt to upload a large file (>10MB)
4. Check for CORS-related errors in the console
5. Verify that upload completes successfully

### **2. Command Line Verification**

#### **S3-Compatible Services**
```bash
# Verify CORS configuration
aws s3api get-bucket-cors --bucket YOUR_BUCKET_NAME --endpoint-url YOUR_ENDPOINT_URL
```

#### **Google Cloud Storage**
```bash
# Verify CORS configuration
gsutil cors get gs://YOUR_BUCKET_NAME
```

---

## 📋 **Migration Guide**

### **For Existing Users**

1. **Update Your Application**
   ```bash
   git pull origin main
   npm install
   ```

2. **Configure CORS** (CRITICAL)
   - Follow the CORS configuration steps above
   - Test with a small file first
   - Then test with a large file (>10MB)

3. **Verify Upload Functionality**
   - Test regular uploads (files <10MB)
   - Test multipart uploads (files >10MB)
   - Check upload progress and completion

### **For New Users**

1. **Follow Quick Start Guide**
   - Clone the repository
   - Configure environment variables
   - **Configure CORS before starting**
   - Start the application

---

## 🐛 **Bug Fixes**

- ✅ **Fixed**: Large file upload failures due to server timeouts
- ✅ **Fixed**: CORS-related upload errors
- ✅ **Fixed**: Mobile upload issues with large files
- ✅ **Fixed**: Progress tracking for multipart uploads
- ✅ **Fixed**: Error handling and cleanup for failed uploads

---

## 🔄 **Breaking Changes**

- **None**: This release is fully backward compatible
- **Existing uploads**: Will continue to work as before
- **New feature**: Large files automatically use multipart upload

---

## 📖 **Additional Resources**

### **Documentation Links**
- 📖 [CORS Setup Guide](docs/getting-started/cors-setup)
- 📖 [Storage Providers Guide](docs/storage-providers-cors.md)
- 📖 [API Reference](API_REFERENCE.md)
- 📖 [Getting Started Guide](docs/getting-started)

### **Support**
- 🐛 [Report Issues](https://github.com/iotserver24/S3-MegaVault/issues)
- 💬 [GitHub Discussions](https://github.com/iotserver24/S3-MegaVault/discussions)
- 📧 [Contact Support](mailto:support@megavault.com)

---

## 🎯 **What's Next**

### **Version 1.0.3 (Planned)**
- Enhanced mobile app integration
- Advanced upload scheduling
- Upload resume functionality
- Additional storage provider support

---

## 🙏 **Acknowledgments**

Thank you to all contributors and users who provided feedback on the upload functionality. Your input was crucial in making this release possible.

---

**Happy Uploading! 🚀**

*For questions or support, please refer to the documentation or open an issue on GitHub.*
