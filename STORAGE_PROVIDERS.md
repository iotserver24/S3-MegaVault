# Storage Providers Support

MegaVault supports a wide range of cloud storage providers. This document lists all supported providers and their CORS capabilities for large file uploads.

## Supported Storage Providers

| Provider | CORS Support | Large Files | Setup Difficulty | Documentation |
|----------|--------------|-------------|------------------|---------------|
| **Amazon S3** | ✅ Yes | ✅ Yes | Easy | [AWS CORS Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/enabling-cors-examples.html) |
| **Cloudflare R2** | ✅ Yes | ✅ Yes | Easy | [R2 CORS Guide](https://developers.cloudflare.com/r2/api/s3/cors/) |
| **Google Cloud Storage** | ✅ Yes | ✅ Yes | Easy | [GCS CORS Guide](https://cloud.google.com/storage/docs/configuring-cors) |
| **Microsoft Azure Blob** | ✅ Yes | ✅ Yes | Medium | [Azure CORS Guide](https://learn.microsoft.com/en-us/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) |
| **DigitalOcean Spaces** | ✅ Yes | ✅ Yes | Easy | [DO Spaces CORS](https://www.digitalocean.com/docs/spaces/how-to/enable-cors/) |
| **Wasabi Cloud Storage** | ✅ Yes | ✅ Yes | Easy | [Wasabi CORS](https://wasabi-support.zendesk.com/hc/en-us/articles/360000034752-How-do-I-configure-CORS-for-my-Wasabi-bucket-) |
| **MinIO** | ✅ Yes | ✅ Yes | Easy | [MinIO CORS](https://docs.min.io/docs/minio-server-limits-per-tenant.html#cors) |
| **Firebase Storage** | ✅ Yes | ✅ Yes | Medium | [Firebase CORS](https://firebase.google.com/docs/storage/web/download-files#cors_configuration) |
| **Oracle Cloud Object Storage** | ✅ Yes | ✅ Yes | Medium | [OCI CORS](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/usingcors.htm) |
| **Backblaze B2** | ❌ No | ❌ Limited | N/A | [B2 Limitations](https://www.backblaze.com/b2/docs/) |

## CORS Configuration Required

For files larger than 10MB, MegaVault uses multipart uploads that require CORS configuration on your storage bucket.

### Required CORS Configuration

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

### Quick Setup Commands

#### S3-Compatible Services (S3, R2, DigitalOcean, Wasabi)
```bash
aws s3api put-bucket-cors \
  --bucket YOUR_BUCKET_NAME \
  --cors-configuration file://cors.json \
  --endpoint-url YOUR_ENDPOINT_URL
```

#### MinIO (Self-Hosted)
```bash
# Install MinIO Client
curl https://dl.min.io/client/mc/release/linux-amd64/mc -o mc
chmod +x mc && sudo mv mc /usr/local/bin/

# Configure MinIO alias
mc alias set myminio http://your-minio-server:9000 ACCESS_KEY SECRET_KEY

# Apply CORS configuration (uses cors-minio.json)
mc admin config set myminio/ cors-minio.json
```

#### Google Cloud Storage
```bash
gsutil cors set cors.json gs://YOUR_BUCKET_NAME
```

#### Microsoft Azure Blob Storage
```bash
az storage cors add \
  --services b \
  --methods GET PUT POST DELETE HEAD \
  --origins "*" \
  --allowed-headers "*" \
  --exposed-headers "ETag" \
  --max-age 3000
```

## Provider-Specific Notes

### Amazon S3
- Most popular and widely supported
- Excellent CORS documentation
- Reliable multipart upload support

### Cloudflare R2
- S3-compatible API
- Competitive pricing
- Good performance worldwide
- Use AWS CLI with R2 endpoint

### Google Cloud Storage
- Requires gsutil for CORS setup
- Good integration with Google services
- Reliable performance

### Microsoft Azure Blob Storage
- Requires Azure CLI for CORS setup
- Good for enterprise environments
- Integrated with Microsoft ecosystem

### DigitalOcean Spaces
- Simple setup with S3-compatible API
- Good for small to medium projects
- Affordable pricing

### Wasabi Cloud Storage
- S3-compatible with competitive pricing
- No egress fees
- Good for backup and archival

### MinIO
- Self-hosted S3-compatible storage
- Good for private deployments
- Full control over data

### Firebase Storage
- Integrated with Firebase ecosystem
- Good for web applications
- Requires Google Cloud setup

### Oracle Cloud Object Storage
- Enterprise-grade storage
- Good for Oracle ecosystem users
- Requires OCI CLI setup

### Backblaze B2
- ❌ **Not recommended for large files**
- Limited CORS support
- Use only for small file uploads

## Troubleshooting

### Common Issues

1. **CORS errors**: Ensure CORS is properly configured
2. **ETag not available**: Add "ETag" to ExposeHeaders
3. **Upload fails**: Verify PUT method is allowed
4. **Preflight fails**: Check all required methods are allowed

### Testing CORS

1. Open browser developer tools (F12)
2. Go to Network tab
3. Attempt a large file upload
4. Check for CORS errors in console

## Getting Help

- 📖 **Detailed Guide**: [Storage Providers CORS Guide](docs/storage-providers-cors.md)
- 🔧 **Setup Instructions**: [CORS Setup Guide](src/app/docs/getting-started/cors-setup/page.tsx)
- 🚀 **Quick Start**: [Getting Started Guide](src/app/docs/getting-started/page.tsx)
- 💬 **Issues**: [GitHub Issues](https://github.com/iotserver24/S3-MegaVault/issues)

## Recommendation

For the best experience with large file uploads, we recommend:

1. **Cloudflare R2** - Best balance of price and performance
2. **Amazon S3** - Most reliable and well-documented
3. **DigitalOcean Spaces** - Simple setup and good pricing
4. **MinIO** - For self-hosted deployments

Avoid **Backblaze B2** for large file uploads due to limited CORS support.
