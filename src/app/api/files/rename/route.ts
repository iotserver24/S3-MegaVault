import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { S3Client, CopyObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
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

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();

    const { oldKey, newKey, type } = await req.json();

    if (!oldKey || !newKey) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Make sure the keys are within the user's folder based on storage mode
    const hasOldAccess = storageConfig.mode === 'bucket' 
      ? true // In bucket mode, user has access to all files
      : oldKey.startsWith(userFolderId);
    
    const hasNewAccess = storageConfig.mode === 'bucket' 
      ? true // In bucket mode, user has access to all files
      : newKey.startsWith(userFolderId);
    
    if (!hasOldAccess || !hasNewAccess) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // If it's a folder, we need to rename all files inside it
    if (type === 'folder') {
      // Ensure we have trailing slashes for folder paths
      const oldKeyNormalized = oldKey.endsWith('/') ? oldKey : `${oldKey}/`;
      const newKeyNormalized = newKey.endsWith('/') ? newKey : `${newKey}/`;
      
      console.log(`Renaming folder from ${oldKeyNormalized} to ${newKeyNormalized}`);
      
      // List all objects with the prefix of the old folder key
      const listParams = {
        Bucket: process.env.S3_BUCKET!,
        Prefix: oldKeyNormalized
      };

      const listResponse = await s3Client.send(new ListObjectsV2Command(listParams));
      
      if (listResponse.Contents && listResponse.Contents.length > 0) {
        console.log(`Found ${listResponse.Contents.length} objects in folder ${oldKeyNormalized}`);
        
        // For each object, create a copy with the new prefix and delete the old one
        for (const object of listResponse.Contents) {
          if (!object.Key) continue;
          
          // Create the new key by replacing the old folder path with the new one exactly
          // This ensures we don't create nested folders
          const relativeKey = object.Key.substring(oldKeyNormalized.length);
          const objectNewKey = `${newKeyNormalized}${relativeKey}`;
          
          console.log(`Renaming ${object.Key} to ${objectNewKey}`);
          
          // Copy the object to the new location
          await s3Client.send(new CopyObjectCommand({
            Bucket: process.env.S3_BUCKET!,
            CopySource: `${process.env.S3_BUCKET}/${object.Key}`,
            Key: objectNewKey
          }));
          
          // Delete the old object
          await s3Client.send(new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET!,
            Key: object.Key
          }));
        }
      } else {
        // If it's an empty folder, create an empty marker object
        console.log(`No contents found in folder ${oldKeyNormalized}, creating an empty marker`);
        
        // For empty folders in S3, we might need to create a marker object
        // First check if the old empty folder marker exists
        const emptyMarkerExists = await s3Client.send(new ListObjectsV2Command({
          Bucket: process.env.S3_BUCKET!,
          Prefix: oldKeyNormalized,
          MaxKeys: 1
        }));
        
        // Create a new empty folder marker
        if (emptyMarkerExists.Contents && emptyMarkerExists.Contents.length > 0) {
          await s3Client.send(new CopyObjectCommand({
            Bucket: process.env.S3_BUCKET!,
            CopySource: `${process.env.S3_BUCKET}/${oldKeyNormalized}`,
            Key: newKeyNormalized
          }));
          
          await s3Client.send(new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET!,
            Key: oldKeyNormalized
          }));
        }
      }
    } else {
      // For a single file, just copy and delete
      await s3Client.send(new CopyObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        CopySource: `${process.env.S3_BUCKET}/${oldKey}`,
        Key: newKey
      }));
      
      await s3Client.send(new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: oldKey
      }));
    }

    return NextResponse.json({ message: 'File renamed successfully' });
  } catch (error) {
    console.error('Error renaming file:', error);
    return NextResponse.json({ error: 'Failed to rename file' }, { status: 500 });
  }
} 