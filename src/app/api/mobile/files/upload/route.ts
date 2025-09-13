import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getRedis, getS3Client } from '@/lib/redis';
import { authenticateMobile, corsHeaders } from '@/lib/mobile-auth';
import { getStorageConfig } from '@/lib/storage';

// Updated route configuration for Next.js 14+
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes timeout for large file uploads

// Configure body size limit for large file uploads (50MB)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    // Authenticate the mobile user
    const { user, errorResponse } = await authenticateMobile(req);
    
    if (errorResponse) {
      return errorResponse;
    }
    
    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();
    
    if (!user && storageConfig.mode === 'folder') {
      return NextResponse.json(
        { error: 'Unauthorized - Missing user' }, 
        { status: 401, headers: corsHeaders }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400, headers: corsHeaders }
      );
    }

    // File size validation removed - unlimited file size allowed

    // Validate content type for video files
    if (file.type.startsWith('video/')) {
      const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/webm', 'video/quicktime'];
      if (!allowedVideoTypes.includes(file.type)) {
        return NextResponse.json(
          { 
            error: `Unsupported video format: ${file.type}. Allowed formats: MP4, AVI, MOV, WebM, QuickTime`,
            fileType: file.type
          },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    const s3Client = getS3Client();
    const redis = getRedis();

    // Construct the file path based on storage mode
    let filePath: string;
    if (storageConfig.mode === 'bucket') {
      filePath = folder ? `${folder}/${file.name}` : file.name;
    } else {
      const basePath = `${userFolderId}/`;
      filePath = folder 
        ? `${basePath}${folder}/${file.name}`
        : `${basePath}${file.name}`;
    }

    const buffer = await file.arrayBuffer();
    
    // Sanitize filename for S3 metadata headers (remove invalid characters)
    const sanitizeForMetadata = (str: string): string => {
      return str
        .replace(/[^\x20-\x7E]/g, '_') // Replace non-ASCII characters with underscore
        .replace(/[^\w\s\-_.]/g, '_') // Replace special chars with underscore
        .replace(/\s+/g, '_') // Replace spaces with underscore
        .substring(0, 50); // Limit length for header safety
    };
    
    // Prepare metadata for video files
    const metadata: Record<string, string> = {
      'original-name': sanitizeForMetadata(file.name),
      'uploaded-at': new Date().toISOString(),
      'file-size': file.size.toString(),
    };

    // Add video-specific metadata
    if (file.type.startsWith('video/')) {
      metadata['is-video'] = 'true';
      metadata['video-format'] = file.type;
    }

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: filePath,
      Body: Buffer.from(buffer),
      ContentType: file.type,
      Metadata: metadata,
      // Set cache control for video files
      CacheControl: file.type.startsWith('video/') ? 'public, max-age=31536000' : 'public, max-age=86400',
    });

    await s3Client.send(command);

    // Store file metadata in Redis (including original filename)
    await redis.hset(`file:${filePath}`, {
      name: file.name, // Store original filename in Redis
      size: file.size.toString(),
      type: file.type,
      uploadedAt: new Date().toISOString(),
      isPublic: '0',
      folder: folder || '/',
    });

    return NextResponse.json({ 
      message: 'File uploaded successfully',
      key: filePath,
      name: file.name,
      size: file.size,
      type: file.type,
      isVideo: file.type.startsWith('video/')
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Mobile upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500, headers: corsHeaders }
    );
  }
} 