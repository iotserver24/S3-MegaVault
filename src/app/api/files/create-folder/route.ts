import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { authOptions } from '@/lib/auth';
import { getStorageConfig } from '@/lib/storage';

const s3Client = new S3Client({
  region: process.env.CLOUDFLARE_R2_REGION || 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.error('No session or email:', session);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();

    const { folderName, parentFolder } = await req.json();
    
    if (!folderName) {
      return NextResponse.json(
        { error: 'Folder name is required' },
        { status: 400 }
      );
    }

    // Construct the folder path based on storage mode
    let folderPath: string;
    if (storageConfig.mode === 'bucket') {
      folderPath = parentFolder 
        ? `${parentFolder}/${folderName}/`
        : `${folderName}/`;
    } else {
      const basePath = `${userFolderId}/`;
      folderPath = parentFolder 
        ? `${basePath}${parentFolder}/${folderName}/`
        : `${basePath}${folderName}/`;
    }

    console.log('Creating folder:', folderPath);

    // Create an empty object with "/" at the end to represent a folder
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
      Key: folderPath,
      Body: '',
    });

    await s3Client.send(command);
    console.log('Folder created successfully:', folderPath);

    return NextResponse.json({ 
      message: 'Folder created successfully',
      key: folderPath
    });
  } catch (error) {
    console.error('Error creating folder:', error);
    return NextResponse.json(
      { error: 'Failed to create folder' },
      { status: 500 }
    );
  }
} 