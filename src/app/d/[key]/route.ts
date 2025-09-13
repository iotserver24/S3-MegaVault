import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getRedis, getS3Client } from '@/lib/redis';
import { authOptions } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: { key: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const key = decodeURIComponent(params.key);

    const redis = getRedis();
    const s3Client = getS3Client();

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
      Bucket: process.env.S3_BUCKET!,
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