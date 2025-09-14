import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function CORSSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/docs/getting-started" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Getting Started
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            CORS Configuration Setup
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Configure Cross-Origin Resource Sharing (CORS) for your storage provider to enable large file uploads
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
          <div className="flex">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-4 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-red-800 dark:text-red-200 mb-2">
                ⚠️ IMPORTANT NOTICE - CORS Configuration Required
              </h3>
              <p className="text-red-700 dark:text-red-300 mb-3">
                <strong>You MUST configure CORS settings on your storage bucket before uploading files larger than 10MB.</strong>
                Without proper CORS configuration, you will encounter the following errors:
              </p>
              <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 mb-3">
                <p className="text-sm font-mono text-red-800 dark:text-red-200 mb-2">
                  <strong>Error 1:</strong> CORS policy error
                </p>
                <p className="text-xs text-red-700 dark:text-red-300 mb-3">
                  "Access to XMLHttpRequest at 'https://your-bucket.s3.amazonaws.com/your-file' from origin 'https://your-website.com' has been blocked by CORS policy."
                </p>
                <p className="text-sm font-mono text-red-800 dark:text-red-200 mb-2">
                  <strong>Error 2:</strong> Preflight request failure
                </p>
                <p className="text-xs text-red-700 dark:text-red-300">
                  "OPTIONS https://your-bucket.s3.amazonaws.com/your-file 403 (Forbidden)"
                </p>
              </div>
              <p className="text-red-700 dark:text-red-300 text-sm">
                These errors will prevent successful file uploads and cause upload failures. Configure CORS now to avoid these issues.
              </p>
            </div>
          </div>
        </div>

        {/* Supported Providers */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Supported Storage Providers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CORS Supported Providers */}
            <div>
              <h3 className="text-lg font-medium text-green-700 dark:text-green-400 mb-3 flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                CORS Supported
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>Amazon S3</span>
                  <span className="text-green-600 dark:text-green-400">✅</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Cloudflare R2</span>
                  <span className="text-green-600 dark:text-green-400">✅</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Google Cloud Storage</span>
                  <span className="text-green-600 dark:text-green-400">✅</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Microsoft Azure Blob</span>
                  <span className="text-green-600 dark:text-green-400">✅</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>DigitalOcean Spaces</span>
                  <span className="text-green-600 dark:text-green-400">✅</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Wasabi Cloud Storage</span>
                  <span className="text-green-600 dark:text-green-400">✅</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>MinIO</span>
                  <span className="text-green-600 dark:text-green-400">✅</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Firebase Storage</span>
                  <span className="text-green-600 dark:text-green-400">✅</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Oracle Cloud Object Storage</span>
                  <span className="text-green-600 dark:text-green-400">✅</span>
                </li>
              </ul>
            </div>

            {/* Limited/No CORS Support */}
            <div>
              <h3 className="text-lg font-medium text-red-700 dark:text-red-400 mb-3">
                Limited CORS Support
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>Backblaze B2</span>
                  <span className="text-red-600 dark:text-red-400">❌</span>
                </li>
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                These providers don't support direct browser uploads. Use server-side uploads only.
              </p>
            </div>
          </div>
        </div>

        {/* CORS Configuration */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Required CORS Configuration (@cors.json)
          </h2>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
              📁 Create cors.json File
            </h3>
            <p className="text-blue-800 dark:text-blue-300 text-sm mb-2">
              Create a file named <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">cors.json</code> in your project root with the following content:
            </p>
            <p className="text-blue-700 dark:text-blue-300 text-xs">
              This configuration allows all origins to perform file operations with proper headers for multipart uploads.
            </p>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <strong>Development/Testing Configuration</strong> (allows all origins):
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4">
            <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag", "x-amz-version-id"],
    "MaxAgeSeconds": 3000
  }
]`}
            </pre>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">
              🔧 Configuration Explanation
            </h3>
            <ul className="text-green-800 dark:text-green-300 text-sm space-y-1">
              <li><strong>AllowedOrigins:</strong> ["*"] allows requests from any domain</li>
              <li><strong>AllowedMethods:</strong> Required methods for multipart uploads</li>
              <li><strong>AllowedHeaders:</strong> ["*"] permits all headers including custom ones</li>
              <li><strong>ExposeHeaders:</strong> ["ETag"] is critical for multipart upload completion</li>
              <li><strong>MaxAgeSeconds:</strong> 3000 caches preflight requests for 50 minutes</li>
            </ul>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <strong>Production Configuration</strong> (restrict to your domains):
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`[
  {
    "AllowedOrigins": [
      "https://yourdomain.com",
      "https://www.yourdomain.com"
    ],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag", "x-amz-version-id"],
    "MaxAgeSeconds": 3000
  }
]`}
            </pre>
          </div>
        </div>

        {/* Quick Setup Commands */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Setup Commands
          </h2>
          
          <div className="space-y-6">
            {/* S3-Compatible */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                S3-Compatible Services (S3, R2, DigitalOcean, Wasabi)
              </h3>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-800 dark:text-gray-200">
{`aws s3api put-bucket-cors \\
  --bucket YOUR_BUCKET_NAME \\
  --cors-configuration file://cors.json \\
  --endpoint-url YOUR_ENDPOINT_URL`}
                </pre>
              </div>
            </div>

            {/* MinIO */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                MinIO (Self-Hosted) - Using MinIO Client
              </h3>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-800 dark:text-gray-200">
{`# Install MinIO Client
curl https://dl.min.io/client/mc/release/linux-amd64/mc -o mc
chmod +x mc && sudo mv mc /usr/local/bin/

# Configure alias
mc alias set myminio http://your-minio-server:9000 ACCESS_KEY SECRET_KEY

# Apply CORS (uses cors-minio.json)
mc admin config set myminio/ cors-minio.json`}
                </pre>
              </div>
            </div>

            {/* Google Cloud */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Google Cloud Storage
              </h3>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-800 dark:text-gray-200">
{`gsutil cors set cors.json gs://YOUR_BUCKET_NAME`}
                </pre>
              </div>
            </div>

            {/* Azure */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Microsoft Azure Blob Storage
              </h3>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-800 dark:text-gray-200">
{`az storage cors add \\
  --services b \\
  --methods GET PUT POST DELETE HEAD \\
  --origins "*" \\
  --allowed-headers "*" \\
  --exposed-headers "ETag" \\
  --max-age 3000`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Troubleshooting
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Common Issues:
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li>Preflight request fails - ensure all methods are allowed</li>
                <li>ETag not available - add "ETag" to ExposeHeaders</li>
                <li>Upload fails - verify PUT method is allowed</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Testing CORS:
              </h3>
              <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li>Open browser developer tools (F12)</li>
                <li>Go to Network tab</li>
                <li>Attempt a file upload</li>
                <li>Check for CORS errors in console</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-4">
            Next Steps
          </h2>
          <div className="space-y-2 text-blue-800 dark:text-blue-300">
            <p>1. Configure CORS for your storage provider</p>
            <p>2. Test with a small file upload</p>
            <p>3. Try uploading a large file (>10MB) to test multipart uploads</p>
            <p>4. Check the <Link href="/docs/storage-providers-cors" className="underline hover:no-underline">detailed storage providers guide</Link> for specific instructions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
