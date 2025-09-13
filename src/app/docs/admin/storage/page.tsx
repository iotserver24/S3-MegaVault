import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Storage Overview' },
  { id: 'cloudflare-r2', title: 'Cloudflare R2 Setup' },
  { id: 'aws-s3', title: 'AWS S3 Setup' },
  { id: 'configuration', title: 'Storage Configuration' },
  { id: 'file-management', title: 'File Management' },
  { id: 'cdn-integration', title: 'CDN Integration' },
  { id: 'backup-strategy', title: 'Backup Strategy' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
];

export default function StorageConfigurationPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Storage Configuration</h1>
        <p className="text-xl text-slate-600">
          Complete guide to configuring and managing file storage for MegaVault using 
          Cloudflare R2, AWS S3, or other S3-compatible storage services.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Storage Overview</h2>
        <p>
          MegaVault supports multiple S3-compatible storage providers for scalable, reliable, 
          and cost-effective file storage. Cloudflare R2 is recommended for its performance and pricing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Supported Providers" description="Multiple storage options">
            <ul className="text-sm space-y-1">
              <li>✅ Cloudflare R2 (Recommended)</li>
              <li>✅ AWS S3</li>
              <li>✅ MinIO</li>
              <li>✅ DigitalOcean Spaces</li>
              <li>✅ Backblaze B2</li>
              <li>✅ Other S3-compatible services</li>
            </ul>
          </Card>
          
          <Card title="Features" description="Advanced storage capabilities">
            <ul className="text-sm space-y-1">
              <li>✅ Unlimited scalability</li>
              <li>✅ Automatic thumbnails</li>
              <li>✅ CORS configuration</li>
              <li>✅ CDN integration</li>
              <li>✅ Lifecycle policies</li>
              <li>✅ Access control</li>
            </ul>
          </Card>

          <Card title="Performance" description="Optimized file handling">
            <ul className="text-sm space-y-1">
              <li>✅ Multi-part uploads</li>
              <li>✅ Resume interrupted uploads</li>
              <li>✅ Parallel processing</li>
              <li>✅ Intelligent caching</li>
              <li>✅ Global distribution</li>
              <li>✅ Edge optimization</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Storage Provider Recommendation">
          Cloudflare R2 is recommended due to zero egress fees, excellent performance, 
          and seamless integration with Cloudflare's global network.
        </Alert>
      </section>

      <section id="cloudflare-r2">
        <h2>Cloudflare R2 Setup</h2>
        <p>
          Step-by-step guide to setting up Cloudflare R2 as your primary storage provider.
        </p>

        <div className="space-y-8">
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Create Cloudflare Account</h3>
              <p className="text-slate-600">Sign up for a Cloudflare account at cloudflare.com if you don't have one already.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Enable R2 Storage</h3>
              <p className="text-slate-600">Navigate to R2 Object Storage in your Cloudflare dashboard and enable the service.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Create Storage Bucket</h3>
              <p className="text-slate-600">Create a new R2 bucket with a unique name for your MegaVault installation.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Generate API Token</h3>
              <p className="text-slate-600">Create an API token with R2 read/write permissions for your bucket.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">5</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Configure CORS Policy</h3>
              <p className="text-slate-600">Set up CORS policy to allow web uploads from your domain.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">6</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Set Environment Variables</h3>
              <p className="text-slate-600">Configure MegaVault with your R2 credentials and bucket information.</p>
            </div>
          </div>
        </div>

        <h3>R2 Bucket Creation</h3>
        <CodeBlock language="bash" title="Create R2 Bucket via Wrangler CLI">
{`# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create R2 bucket
wrangler r2 bucket create megavault-storage

# List buckets to verify
wrangler r2 bucket list`}
        </CodeBlock>

        <h3>CORS Configuration</h3>
        <CodeBlock language="json" title="R2 CORS Policy">
{`[
  {
    "AllowedOrigins": [
      "https://your-domain.com",
      "https://www.your-domain.com"
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
      "Content-Length"
    ],
    "MaxAgeSeconds": 3600
  }
]`}
        </CodeBlock>

        <h3>R2 Environment Variables</h3>
        <CodeBlock language="bash" title="Cloudflare R2 Configuration">
{`# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=megavault-storage
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com

# Optional: Custom Domain for Public URLs
R2_PUBLIC_URL=https://files.your-domain.com

# Optional: Enable R2 Analytics
R2_ANALYTICS_ENABLED=true`}
        </CodeBlock>

        <h3>Custom Domain Setup (Optional)</h3>
        <ol>
          <li>Create a CNAME record pointing to your R2 bucket</li>
          <li>Configure the custom domain in R2 settings</li>
          <li>Update <code>R2_PUBLIC_URL</code> environment variable</li>
          <li>Enable SSL/TLS for the custom domain</li>
        </ol>
      </section>

      <section id="aws-s3">
        <h2>AWS S3 Setup</h2>
        <p>Alternative setup guide for using AWS S3 as your storage provider.</p>

        <div className="space-y-8">
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Create AWS Account</h3>
              <p className="text-slate-600">Sign up for an AWS account and navigate to the S3 console.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Create S3 Bucket</h3>
              <p className="text-slate-600">Create a new S3 bucket with appropriate settings and region selection.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Configure Bucket Policy</h3>
              <p className="text-slate-600">Set up bucket policy and CORS configuration for web access.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Create IAM User</h3>
              <p className="text-slate-600">Create a dedicated IAM user with S3 permissions for MegaVault.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">5</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Generate Access Keys</h3>
              <p className="text-slate-600">Generate access key and secret key for the IAM user.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">6</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Configure Environment Variables</h3>
              <p className="text-slate-600">Set up MegaVault with your AWS S3 credentials and bucket information.</p>
            </div>
          </div>
        </div>

        <h3>S3 Bucket Policy</h3>
        <CodeBlock language="json" title="S3 Bucket Policy">
{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/public/*"
    },
    {
      "Sid": "MegaVaultAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR-ACCOUNT-ID:user/megavault-user"
      },
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    }
  ]
}`}
        </CodeBlock>

        <h3>S3 CORS Configuration</h3>
        <CodeBlock language="json" title="S3 CORS Policy">
{`[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": [
      "https://your-domain.com",
      "https://www.your-domain.com"
    ],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]`}
        </CodeBlock>

        <h3>AWS S3 Environment Variables</h3>
        <CodeBlock language="bash" title="AWS S3 Configuration">
{`# AWS S3 Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_S3_BUCKET=megavault-s3-bucket

# Optional: Custom S3 Endpoint (for S3-compatible services)
AWS_S3_ENDPOINT=https://s3.amazonaws.com

# Optional: S3 Transfer Acceleration
AWS_S3_ACCELERATED=true`}
        </CodeBlock>
      </section>

      <section id="configuration">
        <h2>Storage Configuration</h2>
        <p>Advanced storage configuration options and optimization settings.</p>

        <h3>File Handling Configuration</h3>
        <CodeBlock language="bash" title="Storage Settings">
{`# File Size and Type Restrictions
STORAGE_MAX_FILE_SIZE=104857600           # 100MB in bytes
STORAGE_ALLOWED_TYPES=image/*,application/pdf,text/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,video/mp4,audio/mpeg

# Upload Configuration
STORAGE_MULTIPART_THRESHOLD=10485760     # 10MB - use multipart for larger files
STORAGE_MULTIPART_CHUNK_SIZE=5242880     # 5MB chunk size
STORAGE_MAX_CONCURRENT_UPLOADS=3         # Maximum concurrent upload chunks

# Thumbnail Generation
STORAGE_ENABLE_THUMBNAILS=true           # Enable automatic thumbnail creation
STORAGE_THUMBNAIL_SIZES=150,300,600      # Thumbnail sizes in pixels
STORAGE_THUMBNAIL_QUALITY=85             # JPEG quality for thumbnails (1-100)
STORAGE_THUMBNAIL_FORMAT=webp            # Thumbnail format: jpeg, webp, png

# Caching and Performance
STORAGE_CACHE_CONTROL=public,max-age=31536000  # Cache headers for static files
STORAGE_ENABLE_COMPRESSION=true          # Enable gzip compression
STORAGE_OPTIMIZED_DELIVERY=true          # Enable optimized delivery`}
        </CodeBlock>

        <h3>Storage Organization</h3>
        <CodeBlock language="javascript" title="File Path Structure">
{`// MegaVault file organization structure
/uploads/
  ├── users/
  │   ├── {userId}/
  │   │   ├── profile/
  │   │   ├── documents/
  │   │   └── media/
  │   └── shared/
  ├── public/
  │   ├── thumbnails/
  │   └── temp/
  └── system/
      ├── backups/
      └── logs/

// Example file paths:
// /uploads/users/user_123/documents/project-spec.pdf
// /uploads/users/user_123/media/vacation-photo.jpg
// /uploads/public/thumbnails/thumb_150_vacation-photo.webp`}
        </CodeBlock>

        <h3>Lifecycle Policies</h3>
        <CodeBlock language="json" title="Storage Lifecycle Configuration">
{`{
  "Rules": [
    {
      "ID": "TempFileCleanup",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "uploads/public/temp/"
      },
      "Expiration": {
        "Days": 1
      }
    },
    {
      "ID": "OldBackupCleanup",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "uploads/system/backups/"
      },
      "Expiration": {
        "Days": 30
      }
    },
    {
      "ID": "IntelligentTiering",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "uploads/users/"
      },
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        },
        {
          "Days": 90,
          "StorageClass": "GLACIER"
        }
      ]
    }
  ]
}`}
        </CodeBlock>
      </section>

      <section id="file-management">
        <h2>File Management</h2>
        <p>Advanced file management features and optimization techniques.</p>

        <h3>Upload Optimization</h3>
        <ul>
          <li><strong>Multipart Uploads:</strong> Large files are automatically split into chunks</li>
          <li><strong>Resume Capability:</strong> Interrupted uploads can be resumed</li>
          <li><strong>Parallel Processing:</strong> Multiple chunks uploaded simultaneously</li>
          <li><strong>Client-side Validation:</strong> File type and size validation before upload</li>
          <li><strong>Progress Tracking:</strong> Real-time upload progress monitoring</li>
        </ul>

        <h3>Image Processing Pipeline</h3>
        <CodeBlock language="typescript" title="Image Processing Configuration">
{`// Image processing settings
const imageProcessingConfig = {
  thumbnails: {
    sizes: [150, 300, 600, 1200],
    format: 'webp',
    quality: 85,
    progressive: true,
    strip: true // Remove EXIF data
  },
  optimization: {
    jpeg: { quality: 90, progressive: true },
    png: { compressionLevel: 9 },
    webp: { quality: 85, effort: 6 }
  },
  limits: {
    maxWidth: 4096,
    maxHeight: 4096,
    maxPixels: 16777216 // 16MP
  }
};`}
        </CodeBlock>

        <h3>File Metadata Management</h3>
        <CodeBlock language="json" title="File Metadata Structure">
{`{
  "id": "file_123456789",
  "name": "vacation-photo.jpg",
  "originalName": "IMG_20240115_143022.jpg",
  "mimeType": "image/jpeg",
  "size": 2048576,
  "checksums": {
    "md5": "5d41402abc4b2a76b9719d911017c592",
    "sha256": "aec070645fe53ee3b3763059376134f058cc337247c978add178b6ccdfb0019f"
  },
  "metadata": {
    "dimensions": { "width": 1920, "height": 1080 },
    "exif": {
      "camera": "iPhone 12 Pro",
      "iso": 64,
      "focalLength": "6mm",
      "dateTimeOriginal": "2024-01-15T14:30:22Z"
    },
    "location": {
      "latitude": 37.7749,
      "longitude": -122.4194,
      "country": "United States",
      "city": "San Francisco"
    }
  },
  "processing": {
    "thumbnails": [
      { "size": 150, "url": "thumb_150_vacation-photo.webp" },
      { "size": 300, "url": "thumb_300_vacation-photo.webp" },
      { "size": 600, "url": "thumb_600_vacation-photo.webp" }
    ],
    "processed": true,
    "processedAt": "2024-01-15T14:31:15Z"
  }
}`}
        </CodeBlock>
      </section>

      <section id="cdn-integration">
        <h2>CDN Integration</h2>
        <p>Integrate Content Delivery Network for improved performance and global file delivery.</p>

        <h3>Cloudflare CDN (with R2)</h3>
        <CodeBlock language="bash" title="Cloudflare CDN Configuration">
{`# CDN Configuration
CDN_ENABLED=true
CDN_URL=https://cdn.your-domain.com
CDN_CACHE_TTL=31536000                   # 1 year cache TTL
CDN_PURGE_ON_UPDATE=true                 # Auto-purge cache on file updates

# Cloudflare-specific settings
CLOUDFLARE_ZONE_ID=your-zone-id
CLOUDFLARE_API_TOKEN=your-api-token
CLOUDFLARE_CACHE_EVERYTHING=true         # Cache all file types`}
        </CodeBlock>

        <h3>AWS CloudFront (with S3)</h3>
        <CodeBlock language="bash" title="CloudFront Configuration">
{`# CloudFront Distribution
CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id
CLOUDFRONT_DOMAIN=d123456789.cloudfront.net
CLOUDFRONT_INVALIDATE_ON_UPDATE=true

# CloudFront Cache Behaviors
CLOUDFRONT_DEFAULT_TTL=86400            # 24 hours
CLOUDFRONT_MAX_TTL=31536000             # 1 year
CLOUDFRONT_MIN_TTL=0                    # No minimum TTL`}
        </CodeBlock>

        <h3>Cache Optimization</h3>
        <ul>
          <li><strong>Static Assets:</strong> Long cache TTL for images, documents</li>
          <li><strong>Thumbnails:</strong> Aggressive caching with versioning</li>
          <li><strong>Dynamic Content:</strong> Short TTL for frequently updated files</li>
          <li><strong>Cache Invalidation:</strong> Automatic purging on file updates</li>
          <li><strong>Edge Locations:</strong> Global distribution for low latency</li>
        </ul>
      </section>

      <section id="backup-strategy">
        <h2>Backup Strategy</h2>
        <p>Implement comprehensive backup and disaster recovery strategies for your storage.</p>

        <h3>Multi-Region Backup</h3>
        <CodeBlock language="bash" title="Backup Configuration">
{`# Primary Storage
R2_BUCKET_NAME=megavault-storage
R2_REGION=auto

# Backup Storage
BACKUP_ENABLED=true
BACKUP_PROVIDER=s3                       # s3, r2, or another provider
BACKUP_BUCKET=megavault-backup
BACKUP_REGION=us-west-2
BACKUP_SCHEDULE=0 2 * * *                # Daily at 2 AM UTC
BACKUP_RETENTION_DAYS=30                 # Keep backups for 30 days

# Cross-region replication
REPLICATION_ENABLED=true
REPLICATION_DESTINATION=megavault-replica
REPLICATION_STORAGE_CLASS=STANDARD_IA`}
        </CodeBlock>

        <h3>Backup Script</h3>
        <CodeBlock language="bash" title="Automated Backup Script">
{`#!/bin/bash
# backup-storage.sh

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_PREFIX="backup_$TIMESTAMP"
LOG_FILE="/var/log/megavault/backup.log"

echo "[$TIMESTAMP] Starting storage backup" >> $LOG_FILE

# Sync files from primary to backup storage
aws s3 sync s3://megavault-storage s3://megavault-backup/$BACKUP_PREFIX \
    --exclude "*/temp/*" \
    --exclude "*/cache/*" \
    --storage-class STANDARD_IA

if [ $? -eq 0 ]; then
    echo "[$TIMESTAMP] ✓ Backup completed successfully" >> $LOG_FILE
    
    # Update backup metadata
    echo "{\"timestamp\": \"$TIMESTAMP\", \"status\": \"success\"}" > /tmp/backup_status.json
    aws s3 cp /tmp/backup_status.json s3://megavault-backup/latest.json
else
    echo "[$TIMESTAMP] ✗ Backup failed" >> $LOG_FILE
    # Send alert (implement your notification system)
fi

# Cleanup old backups
aws s3 ls s3://megavault-backup/ | grep "backup_" | \
    awk '{print $4}' | sort | head -n -$BACKUP_RETENTION_DAYS | \
    xargs -I {} aws s3 rm s3://megavault-backup/{} --recursive

echo "[$TIMESTAMP] Backup process completed" >> $LOG_FILE`}
        </CodeBlock>

        <h3>Disaster Recovery Plan</h3>
        <ol>
          <li><strong>Regular Backups:</strong> Automated daily backups to separate region</li>
          <li><strong>Monitoring:</strong> Backup job monitoring and alerting</li>
          <li><strong>Testing:</strong> Monthly backup restoration tests</li>
          <li><strong>Documentation:</strong> Recovery procedures documentation</li>
          <li><strong>RTO/RPO:</strong> Recovery Time/Point Objectives definition</li>
        </ol>
      </section>

      <section id="troubleshooting">
        <h2>Troubleshooting</h2>
        <p>Common storage configuration issues and their solutions.</p>

        <h3>Connection Issues</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Invalid Credentials">
            <p className="text-sm text-slate-600 mb-2"><strong>Error:</strong> Access denied or authentication failed</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solutions:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Verify access key and secret key</li>
              <li>Check IAM permissions</li>
              <li>Ensure bucket name is correct</li>
              <li>Validate endpoint URL</li>
            </ul>
          </Card>
          
          <Card title="CORS Errors">
            <p className="text-sm text-slate-600 mb-2"><strong>Error:</strong> Browser blocks upload requests</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solutions:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Configure CORS policy on bucket</li>
              <li>Add your domain to allowed origins</li>
              <li>Include required headers</li>
              <li>Check preflight request handling</li>
            </ul>
          </Card>
        </div>

        <h3>Performance Issues</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Slow Uploads">
            <p className="text-sm text-slate-600 mb-2"><strong>Symptoms:</strong> Upload speeds slower than expected</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solutions:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Enable multipart uploads</li>
              <li>Optimize chunk size</li>
              <li>Use transfer acceleration</li>
              <li>Check network connectivity</li>
            </ul>
          </Card>
          
          <Card title="High Storage Costs">
            <p className="text-sm text-slate-600 mb-2"><strong>Issue:</strong> Unexpected storage bills</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solutions:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Implement lifecycle policies</li>
              <li>Clean up temporary files</li>
              <li>Use intelligent tiering</li>
              <li>Monitor storage usage</li>
            </ul>
          </Card>
        </div>

        <h3>Debugging Tools</h3>
        <CodeBlock language="bash" title="Storage Health Check Script">
{`#!/bin/bash
# storage-health-check.sh

echo "=== MegaVault Storage Health Check ==="

# Test storage connectivity
echo "Testing storage connectivity..."
if [ "$STORAGE_PROVIDER" = "r2" ]; then
    aws s3 ls s3://$R2_BUCKET_NAME --endpoint-url=$R2_ENDPOINT
elif [ "$STORAGE_PROVIDER" = "s3" ]; then
    aws s3 ls s3://$AWS_S3_BUCKET
fi

# Test upload functionality
echo "Testing file upload..."
echo "test file" > /tmp/test_upload.txt
aws s3 cp /tmp/test_upload.txt s3://$BUCKET_NAME/test/

# Test download functionality
echo "Testing file download..."
aws s3 cp s3://$BUCKET_NAME/test/test_upload.txt /tmp/test_download.txt

# Verify file integrity
if cmp -s /tmp/test_upload.txt /tmp/test_download.txt; then
    echo "✓ Upload/download test passed"
else
    echo "✗ Upload/download test failed"
fi

# Cleanup test files
aws s3 rm s3://$BUCKET_NAME/test/test_upload.txt
rm -f /tmp/test_upload.txt /tmp/test_download.txt

echo "Health check completed"`}
        </CodeBlock>

        <Alert type="warning" title="Storage Security">
          Always use IAM roles and policies with minimal required permissions. Regularly audit 
          access logs and implement monitoring for unusual activity.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Administration Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/admin/environment" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Environment Variables →</h4>
              <p className="text-blue-800 text-sm">Storage-related environment configuration</p>
            </Link>
            <Link href="/docs/admin/backup" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">Backup & Recovery →</h4>
              <p className="text-green-800 text-sm">Data backup and disaster recovery</p>
            </Link>
            <Link href="/docs/admin/monitoring" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Monitoring →</h4>
              <p className="text-purple-800 text-sm">Storage monitoring and alerting</p>
            </Link>
            <Link href="/docs/admin" className="block p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
              <h4 className="font-semibold text-orange-900 mb-2">← Back to Admin Overview</h4>
              <p className="text-orange-800 text-sm">System administration overview</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}