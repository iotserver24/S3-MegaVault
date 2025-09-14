import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { S3Client, AbortMultipartUploadCommand } from '@aws-sdk/client-s3';
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
    const { uploadId, key } = body;

    if (!uploadId || !key) {
      return NextResponse.json(
        { error: 'Missing required fields: uploadId, key' },
        { status: 400 }
      );
    }

    console.log('Aborting multipart upload:', {
      uploadId,
      key
    });

    const command = new AbortMultipartUploadCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      UploadId: uploadId,
    });

    await s3Client.send(command);
    
    console.log('Multipart upload aborted successfully:', {
      uploadId,
      key
    });

    return NextResponse.json({ 
      message: 'Multipart upload aborted successfully'
    });
  } catch (error) {
    console.error('Error aborting multipart upload:', error);
    return NextResponse.json(
      { error: 'Failed to abort multipart upload' },
      { status: 500 }
    );
  }
}
