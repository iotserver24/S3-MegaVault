import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { S3Client, CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();

    const { sourceKey, targetFolder } = await req.json();

    if (!sourceKey) {
      return NextResponse.json({ error: 'Source key is required' }, { status: 400 });
    }

    // Ensure source key belongs to the user based on storage mode
    const hasSourceAccess = storageConfig.mode === 'bucket' 
      ? true // In bucket mode, user has access to all files
      : sourceKey.startsWith(`${userFolderId}/`);
    
    if (!hasSourceAccess) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Construct target key based on storage mode
    const fileName = sourceKey.split('/').pop();
    let targetKey: string;
    
    if (storageConfig.mode === 'bucket') {
      targetKey = targetFolder 
        ? `${targetFolder}/${fileName}`
        : fileName!;
    } else {
      targetKey = targetFolder 
        ? `${userFolderId}/${targetFolder}/${fileName}`
        : `${userFolderId}/${fileName}`;
    }

    // Ensure target key belongs to the user based on storage mode
    const hasTargetAccess = storageConfig.mode === 'bucket' 
      ? true // In bucket mode, user has access to all files
      : targetKey.startsWith(`${userFolderId}/`);
    
    if (!hasTargetAccess) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Don't move if source and target are the same
    if (sourceKey === targetKey) {
      return NextResponse.json({ message: 'File already in target location' });
    }

    console.log('Moving file:', { sourceKey, targetKey });

    // Copy the file to the new location
    const copyCommand = new CopyObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
      CopySource: `${process.env.CLOUDFLARE_R2_BUCKET}/${sourceKey}`,
      Key: targetKey,
    });

    await s3Client.send(copyCommand);

    // Delete the original file
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
      Key: sourceKey,
    });

    await s3Client.send(deleteCommand);

    console.log('File moved successfully:', { sourceKey, targetKey });

    return NextResponse.json({ 
      message: 'File moved successfully',
      sourceKey,
      targetKey
    });
  } catch (error) {
    console.error('Error moving file:', error);
    return NextResponse.json(
      { error: 'Failed to move file' },
      { status: 500 }
    );
  }
}
