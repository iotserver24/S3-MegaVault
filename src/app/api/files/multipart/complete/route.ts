import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { S3Client, CompleteMultipartUploadCommand } from '@aws-sdk/client-s3';
import { authOptions } from '@/lib/auth';

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

interface Part {
  ETag: string;
  PartNumber: number;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.folderId) {
      console.error('No session or folderId:', session);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { uploadId, key, parts } = body;

    if (!uploadId || !key || !parts || !Array.isArray(parts)) {
      return NextResponse.json(
        { error: 'Missing required fields: uploadId, key, parts' },
        { status: 400 }
      );
    }

    // Validate parts format
    const validParts = parts.every((part: any) => 
      part.ETag && part.PartNumber && 
      typeof part.PartNumber === 'number'
    );

    if (!validParts) {
      return NextResponse.json(
        { error: 'Invalid parts format. Each part must have ETag and PartNumber' },
        { status: 400 }
      );
    }

    console.log('Completing multipart upload:', {
      uploadId,
      key,
      partsCount: parts.length
    });

    // Sort parts by part number
    const sortedParts = parts.sort((a: Part, b: Part) => a.PartNumber - b.PartNumber);

    const command = new CompleteMultipartUploadCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: sortedParts
      },
    });

    const response = await s3Client.send(command);
    
    console.log('Multipart upload completed successfully:', {
      uploadId,
      key,
      location: response.Location
    });

    return NextResponse.json({ 
      message: 'Multipart upload completed successfully',
      key: key,
      location: response.Location,
      etag: response.ETag
    });
  } catch (error) {
    console.error('Error completing multipart upload:', error);
    return NextResponse.json(
      { error: 'Failed to complete multipart upload' },
      { status: 500 }
    );
  }
}
