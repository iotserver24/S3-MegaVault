import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { authOptions } from '@/lib/auth';
import { getStorageConfig } from '@/lib/storage';

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
    const relativePath = formData.get('relativePath') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();
    
    // Construct the file path based on storage mode
    let filePath: string;
    
    if (storageConfig.mode === 'bucket') {
      // Bucket mode: store files at bucket root
      if (relativePath && relativePath !== file.name) {
        // Handle folder uploads with relative paths
        filePath = relativePath;
      } else if (folder) {
        filePath = `${folder}/${file.name}`;
      } else {
        filePath = file.name;
      }
    } else {
      // Folder mode: store files within user folder
      const basePath = userFolderId ? `${userFolderId}/` : '';
      
      if (relativePath && relativePath !== file.name) {
        // Handle folder uploads with relative paths
        filePath = `${basePath}${relativePath}`;
      } else if (folder) {
        filePath = `${basePath}${folder}/${file.name}`;
      } else {
        filePath = `${basePath}${file.name}`;
      }
    }

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
