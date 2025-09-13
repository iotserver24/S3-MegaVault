import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { CopyObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getRedis, getS3Client } from '@/lib/redis';
import { authOptions } from '@/lib/auth';
import { getStorageConfig } from '@/lib/storage';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const redis = getRedis();
    const s3Client = getS3Client();

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