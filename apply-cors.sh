#!/bin/bash

# Apply CORS configuration to Cloudflare R2 bucket
# Replace YOUR_BUCKET_NAME with your actual bucket name

aws s3api put-bucket-cors \
  --bucket YOUR_BUCKET_NAME \
  --cors-configuration file://cors.json \
  --endpoint-url https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com

echo "CORS configuration applied successfully!"
echo "Your bucket should now allow multipart uploads from any origin."
