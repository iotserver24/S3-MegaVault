import { NextResponse } from 'next/server';
import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Redis } from '@upstash/redis';

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
    const { searchParams } = new URL(req.url);
    let key = searchParams.get('key');

    if (!key) {
      return NextResponse.json(
        { error: 'No file key provided' },
        { status: 400 }
      );
    }

    // Handle double-encoded keys
    try {
      key = decodeURIComponent(key);
    } catch (e) {
      // If decoding fails, use the key as is
      console.warn('Key decoding failed, using as is:', e);
    }

    // First check Redis for public status
    const fileMetadata = await redis.hgetall(`file:${key}`);
    const isPublicInRedis = fileMetadata?.isPublic === '1';

    // Get file metadata from R2
    const command = new HeadObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
    });

    try {
      const result = await s3Client.send(command);
      
      // Check if file is public in either Redis or S3
      const isPublicInS3 = result.Metadata?.['is-public'] === 'true';
      const isPublic = isPublicInRedis || isPublicInS3;

      if (!isPublic) {
        return NextResponse.json(
          { error: 'File is not publicly accessible' },
          { status: 404 }
        );
      }

      // Extract file name from the key
      const fileName = key.split('/').pop() || key;

      return NextResponse.json({
        key: key,
        name: fileName,
        size: result.ContentLength || 0,
        type: result.ContentType || 'application/octet-stream',
        lastModified: result.LastModified?.toISOString() || new Date().toISOString(),
        isPublic: true
      });
    } catch (error: any) {
      if (error.name === 'NoSuchKey' || error.name === 'NotFound') {
        return NextResponse.json(
          { error: 'File not found' },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Error getting public file metadata:', error);
    return NextResponse.json(
      { error: 'Failed to get file metadata' },
      { status: 500 }
    );
  }
} 