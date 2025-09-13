import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getRedis, getS3Client } from '@/lib/redis';
import { authOptions } from '@/lib/auth';
import { getStorageConfig } from '@/lib/storage';

// Configure route for large file uploads
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes timeout for large file uploads

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.folderId) {
      console.error('No session or folderId:', session);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string | null;
    const relativePath = formData.get('relativePath') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
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
          { status: 400 }
        );
      }
    }

    const s3Client = getS3Client();
    const redis = getRedis();

    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();
    
    // Construct the file path based on storage mode
    let filePath: string;
    
    if (storageConfig.mode === 'bucket') {
      // Bucket mode: store files at bucket root
      if (relativePath && relativePath !== file.name) {
        // Handle folder uploads with relative paths
        filePath = relativePath;
      } else if (folder) {
        filePath = `${folder}/${file.name}`;
      } else {
        filePath = file.name;
      }
    } else {
      // Folder mode: store files within user folder
      const basePath = userFolderId ? `${userFolderId}/` : '';
      
      if (relativePath && relativePath !== file.name) {
        // Handle folder uploads with relative paths
        filePath = `${basePath}${relativePath}`;
      } else if (folder) {
        filePath = `${basePath}${folder}/${file.name}`;
      } else {
        filePath = `${basePath}${file.name}`;
      }
    }

    console.log('Uploading file:', {
      path: filePath,
      size: file.size,
      type: file.type
    });

    // For large files, use streaming instead of loading entire file into memory
    const fileSize = file.size;
    console.log(`Processing file: ${file.name}, size: ${fileSize} bytes`);
    
    // Use streaming for files larger than 50MB to avoid memory issues
    let fileBuffer: Buffer;
    if (fileSize > 50 * 1024 * 1024) {
      console.log('Large file detected, using streaming upload');
      const chunks: Uint8Array[] = [];
      const reader = file.stream().getReader();
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }
        fileBuffer = Buffer.concat(chunks);
      } finally {
        reader.releaseLock();
      }
    } else {
      fileBuffer = Buffer.from(await file.arrayBuffer());
    }
    
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
      Body: fileBuffer,
      ContentType: file.type,
      Metadata: metadata,
      // Set cache control for video files
      CacheControl: file.type.startsWith('video/') ? 'public, max-age=31536000' : 'public, max-age=86400',
    });

    await s3Client.send(command);
    console.log('File uploaded successfully:', filePath);

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
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
