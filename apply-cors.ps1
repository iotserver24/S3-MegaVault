# Apply CORS configuration to Cloudflare R2 bucket
# Replace YOUR_BUCKET_NAME with your actual bucket name
# Replace YOUR_ACCOUNT_ID with your actual Cloudflare account ID

$bucketName = "YOUR_BUCKET_NAME"
$endpointUrl = "https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com"

# Apply CORS configuration
aws s3api put-bucket-cors `
  --bucket $bucketName `
  --cors-configuration file://cors.json `
  --endpoint-url $endpointUrl

Write-Host "CORS configuration applied successfully!" -ForegroundColor Green
Write-Host "Your bucket should now allow multipart uploads from any origin." -ForegroundColor Green
