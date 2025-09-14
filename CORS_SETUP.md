# CORS Configuration for Multipart Uploads

## Problem
The multipart upload feature is failing with CORS errors because Cloudflare R2 doesn't allow direct uploads from browsers without proper CORS configuration.

## Solution
Apply the CORS configuration to your Cloudflare R2 bucket to allow multipart uploads.

## Steps

### 1. Update the CORS configuration files
Edit the following files and replace the placeholders:
- `apply-cors.ps1` (PowerShell version)
- `apply-cors.sh` (Bash version)

Replace:
- `YOUR_BUCKET_NAME` with your actual R2 bucket name
- `YOUR_ACCOUNT_ID` with your Cloudflare account ID

### 2. Run the CORS configuration

**For Windows (PowerShell):**
```powershell
.\apply-cors.ps1
```

**For Linux/Mac (Bash):**
```bash
chmod +x apply-cors.sh
./apply-cors.sh
```

### 3. Verify the configuration
You can verify the CORS configuration was applied:

```bash
aws s3api get-bucket-cors --bucket YOUR_BUCKET_NAME --endpoint-url https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
```

## What this fixes
- Allows browsers to upload file parts directly to Cloudflare R2
- Enables multipart uploads for files larger than 10MB
- Supports all necessary HTTP methods (GET, PUT, POST, DELETE, HEAD)
- Exposes necessary headers (ETag for multipart completion)

## Security Note
This configuration allows uploads from any origin (`*`). For production, you may want to restrict this to your specific domains:

```json
{
  "AllowedOrigins": [
    "https://yourdomain.com",
    "https://www.yourdomain.com"
  ]
}
```

## Alternative: Server-side upload proxy
If you prefer not to configure CORS on R2, you can modify the multipart upload to use a server-side proxy instead of direct uploads. This would require updating the `uploadPart` function in `src/lib/multipart-upload.ts` to upload through your server instead of directly to R2.
