import { NextRequest, NextResponse } from 'next/server';
import { S3Client, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { Redis } from '@upstash/redis';
import { authenticateMobile, corsHeaders } from '@/lib/mobile-auth';
import { getStorageConfig } from '@/lib/storage';

const s3Client = new S3Client({
  region: process.env.CLOUDFLARE_R2_REGION || 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

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
    
    if (!user?.folderId) {
      return NextResponse.json(
        { error: 'Unauthorized - Missing folder ID' }, 
        { status: 401, headers: corsHeaders }
      );
    }

    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();

    // Parse request body
    const { key, isFolder } = await req.json();

    if (!key) {
      return NextResponse.json(
        { error: 'File key is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Verify the file/folder belongs to the user based on storage mode
    const hasAccess = storageConfig.mode === 'bucket' 
      ? true // In bucket mode, user has access to all files
      : key.startsWith(userFolderId);
    
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Unauthorized access to this file/folder' }, 
        { status: 403, headers: corsHeaders }
      );
    }

    if (isFolder) {
      // Delete all objects within the folder
      const listCommand = new ListObjectsV2Command({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
        Prefix: key,
      });

      const listResponse = await s3Client.send(listCommand);
      
      if (listResponse.Contents && listResponse.Contents.length > 0) {
        // Delete each object in the folder
        for (const object of listResponse.Contents) {
          if (object.Key) {
            const deleteCommand = new DeleteObjectCommand({
              Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
              Key: object.Key,
            });
            
            await s3Client.send(deleteCommand);
            
            // Also delete any Redis metadata
            await redis.del(`file:${object.Key}`);
          }
        }
      }
    } else {
      // Delete single file
      const deleteCommand = new DeleteObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
        Key: key,
      });
      
      await s3Client.send(deleteCommand);
      
      // Also delete Redis metadata
      await redis.del(`file:${key}`);
    }

    return NextResponse.json({
      message: `${isFolder ? 'Folder' : 'File'} deleted successfully`,
      key: key,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Mobile delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file/folder' },
      { status: 500, headers: corsHeaders }
    );
  }
} 