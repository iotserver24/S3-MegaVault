# Storage Providers and CORS Configuration

This document provides information about various cloud storage providers that MegaVault supports, including their CORS (Cross-Origin Resource Sharing) configuration capabilities.

## Supported Storage Providers

### 1. **Amazon S3**
- **CORS Support**: ✅ Yes
- **Configuration Methods**: AWS Management Console, AWS CLI, AWS SDKs
- **Documentation**: [Configuring cross-origin resource sharing (CORS)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/enabling-cors-examples.html)
- **Setup**: Configure CORS via AWS Console or CLI before uploading files

### 2. **Cloudflare R2**
- **CORS Support**: ✅ Yes
- **Configuration Methods**: Cloudflare Dashboard, Cloudflare API, AWS CLI
- **Documentation**: [Cloudflare R2 CORS Configuration](https://developers.cloudflare.com/r2/api/s3/cors/)
- **Setup**: Use AWS CLI with R2 endpoint or Cloudflare Dashboard

### 3. **Google Cloud Storage**
- **CORS Support**: ✅ Yes
- **Configuration Methods**: Google Cloud Console, `gsutil` command-line tool
- **Documentation**: [Set up and view CORS configurations](https://cloud.google.com/storage/docs/configuring-cors)
- **Setup**: Configure via Google Cloud Console or `gsutil` command

### 4. **Microsoft Azure Blob Storage**
- **CORS Support**: ✅ Yes
- **Configuration Methods**: Azure Portal, Azure CLI, REST API
- **Documentation**: [Cross-Origin Resource Sharing (CORS) support for Azure Storage](https://learn.microsoft.com/en-us/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services)
- **Setup**: Configure at service level via Azure Portal or CLI

### 5. **DigitalOcean Spaces**
- **CORS Support**: ✅ Yes
- **Configuration Methods**: DigitalOcean Control Panel, AWS CLI (S3-compatible)
- **Documentation**: [DigitalOcean Spaces CORS](https://www.digitalocean.com/docs/spaces/how-to/enable-cors/)
- **Setup**: Use DigitalOcean Control Panel or AWS CLI

### 6. **Wasabi Cloud Storage**
- **CORS Support**: ✅ Yes
- **Configuration Methods**: Wasabi Console, AWS CLI (S3-compatible)
- **Documentation**: [Wasabi CORS Configuration](https://wasabi-support.zendesk.com/hc/en-us/articles/360000034752-How-do-I-configure-CORS-for-my-Wasabi-bucket-)
- **Setup**: Configure via Wasabi Console or AWS CLI

### 7. **MinIO**
- **CORS Support**: ✅ Yes
- **Configuration Methods**: MinIO Client (mc), MinIO Console, AWS CLI
- **Documentation**: [MinIO CORS Configuration](https://min.io/docs/minio/linux/operations/networking/cors.html)
- **Setup**: Use MinIO Client (mc) or AWS CLI with S3-compatible API
- **Special Note**: MinIO uses a slightly different CORS configuration format with `CORSRules` array

### 8. **Backblaze B2**
- **CORS Support**: ❌ No (Limited)
- **Configuration Methods**: Not available for direct browser uploads
- **Workaround**: Use server-side uploads only
- **Documentation**: [Backblaze B2 Limitations](https://www.backblaze.com/b2/docs/)

### 9. **Firebase Storage**
- **CORS Support**: ✅ Yes
- **Configuration Methods**: Google Cloud SDK, Firebase Console
- **Documentation**: [Firebase Storage CORS](https://firebase.google.com/docs/storage/web/download-files#cors_configuration)
- **Setup**: Configure via Firebase Console or Google Cloud SDK

### 10. **Oracle Cloud Infrastructure (OCI) Object Storage**
- **CORS Support**: ✅ Yes
- **Configuration Methods**: OCI Console, OCI CLI, REST API
- **Documentation**: [OCI Object Storage CORS](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/usingcors.htm)
- **Setup**: Configure via OCI Console or CLI

## CORS Configuration Requirements

For multipart uploads to work properly, your storage bucket must have CORS configured with the following settings:

### Required CORS Configuration

```json
[
  {
    "AllowedOrigins": [
      "*"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST",
      "DELETE",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag",
      "x-amz-version-id"
    ],
    "MaxAgeSeconds": 3000
  }
]
```

### Production CORS Configuration (Recommended)

For production environments, restrict origins to your specific domains:

```json
[
  {
    "AllowedOrigins": [
      "https://yourdomain.com",
      "https://www.yourdomain.com"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST",
      "DELETE",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag",
      "x-amz-version-id"
    ],
    "MaxAgeSeconds": 3000
  }
]
```

## Quick Setup Commands

### Amazon S3 / S3-Compatible Services (R2, DigitalOcean, Wasabi)

```bash
# Using AWS CLI
aws s3api put-bucket-cors \
  --bucket YOUR_BUCKET_NAME \
  --cors-configuration file://cors.json \
  --endpoint-url YOUR_ENDPOINT_URL  # Only for non-AWS services
```

### MinIO (Self-Hosted)

**Option 1: Using MinIO Client (mc) - Recommended**
```bash
# Install MinIO Client
curl https://dl.min.io/client/mc/release/linux-amd64/mc -o mc
chmod +x mc
sudo mv mc /usr/local/bin/

# Configure MinIO alias
mc alias set myminio http://your-minio-server:9000 YOUR-ACCESS-KEY YOUR-SECRET-KEY

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
mc admin config set myminio/ cors.json
```

**Option 2: Using AWS CLI (S3-Compatible)**
```bash
aws s3api put-bucket-cors \
  --bucket YOUR_BUCKET_NAME \
  --cors-configuration file://cors.json \
  --endpoint-url http://your-minio-server:9000
```

### Google Cloud Storage

```bash
# Using gsutil
gsutil cors set cors.json gs://YOUR_BUCKET_NAME
```

### Azure Blob Storage

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

## Troubleshooting

### Common CORS Issues

1. **Preflight Request Fails**: Ensure your CORS configuration includes all necessary methods and headers
2. **ETag Not Available**: Make sure `ETag` is in the `ExposeHeaders` list
3. **Upload Fails**: Verify that `PUT` method is allowed in your CORS configuration

### Testing CORS Configuration

You can test your CORS configuration using browser developer tools:

1. Open browser developer tools (F12)
2. Go to Network tab
3. Attempt a file upload
4. Check for CORS-related errors in the console

### Verification Commands

#### S3-Compatible Services
```bash
aws s3api get-bucket-cors --bucket YOUR_BUCKET_NAME --endpoint-url YOUR_ENDPOINT_URL
```

#### Google Cloud Storage
```bash
gsutil cors get gs://YOUR_BUCKET_NAME
```

## Important Notes

- **Configure CORS Before Uploading**: Always configure CORS settings before attempting to upload files
- **File Size Limits**: Multipart uploads are automatically used for files larger than 10MB
- **Security**: In production, restrict CORS origins to your specific domains
- **Testing**: Test CORS configuration with small files before uploading large files

## Need Help?

If you're having trouble configuring CORS for your specific storage provider:

1. Check the provider's official documentation (links provided above)
2. Verify your CORS configuration matches the required format
3. Test with a simple upload first
4. Check browser developer tools for specific error messages

For MegaVault-specific issues, please refer to the main documentation or create an issue in the repository.
