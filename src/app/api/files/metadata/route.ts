import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Redis } from '@upstash/redis';
import { authOptions } from '@/lib/auth';
import { getStorageConfig } from '@/lib/storage';

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();

    const { searchParams } = new URL(req.url);
    const encodedKey = searchParams.get('key');

    if (!encodedKey) {
      return NextResponse.json({ error: 'File key is required' }, { status: 400 });
    }

    // Handle double-encoded key by decoding twice
    const key = decodeURIComponent(decodeURIComponent(encodedKey));

    // Verify the file belongs to the user based on storage mode
    const hasAccess = storageConfig.mode === 'bucket' 
      ? true // In bucket mode, user has access to all files
      : key.startsWith(userFolderId);
    
    if (!hasAccess) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
    }

    // Check if file exists in R2
    const command = new HeadObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
    });

    try {
      const response = await s3Client.send(command);
      
      // Check the file's public status in Redis
      const fileRedisData = await redis.hgetall(`file:${key}`);
      
      // Check both Redis and S3 metadata for public status
      const isPublicInRedis = fileRedisData?.isPublic === '1';
      const isPublicInS3 = response.Metadata?.['is-public'] === 'true';
      const isPublic = isPublicInRedis || isPublicInS3;
      
      return NextResponse.json({
        name: key.split('/').pop(),
        size: response.ContentLength || 0,
        type: response.ContentType || 'application/octet-stream',
        lastModified: response.LastModified?.toISOString() || new Date().toISOString(),
        key: key,
        isPublic
      });
    } catch (error) {
      console.error('S3 error:', error);
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Metadata error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch file metadata' },
      { status: 500 }
    );
  }
} 