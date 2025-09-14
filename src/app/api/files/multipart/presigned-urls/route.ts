import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { S3Client, UploadPartCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { authOptions } from '@/lib/auth';

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

    if (!session?.user?.folderId) {
      console.error('No session or folderId:', session);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { uploadId, key, partNumbers } = body;

    if (!uploadId || !key || !partNumbers || !Array.isArray(partNumbers)) {
      return NextResponse.json(
        { error: 'Missing required fields: uploadId, key, partNumbers' },
        { status: 400 }
      );
    }

    console.log('Generating presigned URLs for upload:', {
      uploadId,
      key,
      partNumbers: partNumbers.length
    });

    const presignedUrls = await Promise.all(
      partNumbers.map(async (partNumber: number) => {
        const command = new UploadPartCommand({
          Bucket: process.env.S3_BUCKET!,
          Key: key,
          UploadId: uploadId,
          PartNumber: partNumber,
        });

        const presignedUrl = await getSignedUrl(s3Client, command, { 
          expiresIn: 3600 // 1 hour
        });

        return {
          partNumber,
          url: presignedUrl
        };
      })
    );

    console.log('Generated presigned URLs:', presignedUrls.length);

    return NextResponse.json({ 
      presignedUrls
    });
  } catch (error) {
    console.error('Error generating presigned URLs:', error);
    return NextResponse.json(
      { error: 'Failed to generate presigned URLs' },
      { status: 500 }
    );
  }
}
