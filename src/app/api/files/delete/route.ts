import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
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

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.error('No session or email:', session);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();

    const { key } = await req.json();
    console.log('Attempting to delete file:', { key, userFolder: userFolderId, storageMode: storageConfig.mode });

    if (!key) {
      return NextResponse.json(
        { error: 'File key is required' },
        { status: 400 }
      );
    }

    // Verify the file belongs to the user based on storage mode
    const hasAccess = storageConfig.mode === 'bucket' 
      ? true // In bucket mode, user has access to all files
      : key.startsWith(`${userFolderId}/`);
    
    if (!hasAccess) {
      console.error('Unauthorized file access:', { key, userFolder: userFolderId, storageMode: storageConfig.mode });
      return NextResponse.json(
        { error: 'Unauthorized access to file' },
        { status: 403 }
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
    });

    console.log('Sending delete command:', {
      bucket: process.env.S3_BUCKET,
      key,
    });

    await s3Client.send(command);
    console.log('File deleted successfully:', key);

    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
