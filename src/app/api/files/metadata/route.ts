import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Redis } from '@upstash/redis';
import { authOptions } from '@/lib/auth';

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

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.folderId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const encodedKey = searchParams.get('key');

    if (!encodedKey) {
      return NextResponse.json({ error: 'File key is required' }, { status: 400 });
    }

    // Handle double-encoded key by decoding twice
    const key = decodeURIComponent(decodeURIComponent(encodedKey));

    // Verify the file belongs to the user
    if (!key.startsWith(session.user.folderId)) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
    }

    // Check if file exists in R2
    const command = new HeadObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET,
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