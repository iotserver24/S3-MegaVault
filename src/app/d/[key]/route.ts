import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Redis } from '@upstash/redis';
import { authOptions } from '@/lib/auth';

// Create an S3 client with explicit type
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

export async function GET(
  req: Request,
  { params }: { params: { key: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const key = decodeURIComponent(params.key);

    // Get file metadata from Redis
    const fileMetadata = await redis.hgetall(`file:${key}`);

    // Check access permissions
    const isPublic = fileMetadata?.isPublic === '1';
    const userFolder = key.split('/')[0];

    if (!isPublic && (!session?.user?.folderId || session.user.folderId !== userFolder)) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
    }

    // Create a GetObject command
    const command = new GetObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
      Key: key,
      // You can add response headers to control how the file is downloaded
      ResponseContentDisposition: `attachment; filename="${key.split('/').pop()}"`,
    });

    try {
      // Generate a pre-signed URL that expires in 5 minutes
      const signedUrl = await getSignedUrl(s3Client as any, command as any, { expiresIn: 300 });
      
      // Redirect to the signed URL for direct download
      return NextResponse.redirect(signedUrl);
    } catch (error) {
      console.error('Error generating signed URL:', error);
      return NextResponse.json({ error: 'Failed to generate download URL' }, { status: 500 });
    }
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to process download request' },
      { status: 500 }
    );
  }
} 