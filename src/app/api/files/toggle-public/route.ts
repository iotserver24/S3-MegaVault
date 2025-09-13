import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { S3Client, CopyObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { authOptions } from '@/lib/auth';
import { getStorageConfig } from '@/lib/storage';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();

    const { key, isPublic } = await req.json();

    if (!key) {
      return NextResponse.json({ error: 'File key is required' }, { status: 400 });
    }

    // Verify the file belongs to the user based on storage mode
    const hasAccess = storageConfig.mode === 'bucket' 
      ? true // In bucket mode, user has access to all files
      : key.startsWith(userFolderId);
    
    if (!hasAccess) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
    }

    // First get the existing object metadata
    const headCommand = new HeadObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
    });

    const headResult = await s3Client.send(headCommand);

    // Prepare the metadata for the copy operation
    const metadata = {
      ...headResult.Metadata,
      'is-public': isPublic ? 'true' : 'false'
    };

    // Copy the object onto itself with new metadata
    const copyCommand = new CopyObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      CopySource: `${process.env.S3_BUCKET}/${key}`,
      Key: key,
      Metadata: metadata,
      MetadataDirective: 'REPLACE',
      ContentType: headResult.ContentType,
    });

    await s3Client.send(copyCommand);

    // Update Redis metadata
    await redis.hset(`file:${key}`, {
      isPublic: isPublic ? '1' : '0',
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({
      message: `File is now ${isPublic ? 'public' : 'private'}`,
      isPublic
    });
  } catch (error) {
    console.error('Toggle public access error:', error);
    return NextResponse.json(
      { error: 'Failed to update file access' },
      { status: 500 }
    );
  }
} 