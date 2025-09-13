import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
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

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Construct the file path
    const basePath = `${session.user.folderId}/`;
    const filePath = folder 
      ? `${basePath}${folder}/${file.name}`
      : `${basePath}${file.name}`;

    console.log('Uploading file:', {
      path: filePath,
      size: file.size,
      type: file.type
    });

    const buffer = await file.arrayBuffer();
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: filePath,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    });

    await s3Client.send(command);
    console.log('File uploaded successfully:', filePath);

    return NextResponse.json({ 
      message: 'File uploaded successfully',
      key: filePath
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
