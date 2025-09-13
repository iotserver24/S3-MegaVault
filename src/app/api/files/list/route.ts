import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Redis } from '@upstash/redis';
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

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.error('No session or email:', session);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();

    // Get the current folder from query params
    const { searchParams } = new URL(req.url);
    const currentFolder = searchParams.get('folder') || '';

    console.log('Listing files for folder:', {
      userFolder: userFolderId,
      currentFolder,
      storageMode: storageConfig.mode
    });

    // List ALL objects in the user's folder to calculate total storage
    const totalStoragePrefix = storageConfig.mode === 'bucket' ? '' : `${userFolderId}/`;
    const totalStorageCommand = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET,
      Prefix: totalStoragePrefix,
    });

    const totalStorageResponse = await s3Client.send(totalStorageCommand);
    const totalStorageUsed = (totalStorageResponse.Contents || [])
      .reduce((acc, item) => acc + (item.Size || 0), 0);

    // Now get the current folder contents based on storage mode
    let prefix: string;
    if (storageConfig.mode === 'bucket') {
      prefix = currentFolder ? `${currentFolder}/` : '';
    } else {
      prefix = currentFolder
        ? `${userFolderId}/${currentFolder}/`
        : `${userFolderId}/`;
    }

    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET,
      Prefix: prefix,
      Delimiter: '/',
    });

    console.log('Sending list command:', {
      bucket: process.env.S3_BUCKET,
      prefix,
    });

    const response = await s3Client.send(command);
    console.log('List response:', {
      count: response.Contents?.length,
      prefixes: response.CommonPrefixes?.map(p => p.Prefix),
      keys: response.Contents?.map(item => item.Key),
    });

    // Process regular files (excluding the root folder marker)
    const files = await Promise.all((response.Contents || [])
      .filter(item => item.Key !== prefix) // Exclude current folder marker
      .map(async (item) => {
        const key = item.Key || '';
        const name = key.split('/').pop() || '';
        
        // Check if file is public
        let isPublic = false;
        
        try {
          // First check Redis for public status with timeout
          const fileRedisData = await Promise.race([
            redis.hgetall(`file:${key}`),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Redis timeout')), 2000)
            )
          ]) as any;
          
          if (fileRedisData?.isPublic === '1') {
            isPublic = true;
          } else {
            // If not in Redis, check S3 metadata
            const headCommand = new HeadObjectCommand({
              Bucket: process.env.S3_BUCKET!,
              Key: key,
            });
            const headResult = await s3Client.send(headCommand);
            isPublic = headResult.Metadata?.['is-public'] === 'true';
          }
        } catch (error) {
          // If Redis fails, just check S3 metadata
          try {
            const headCommand = new HeadObjectCommand({
              Bucket: process.env.S3_BUCKET!,
              Key: key,
            });
            const headResult = await s3Client.send(headCommand);
            isPublic = headResult.Metadata?.['is-public'] === 'true';
          } catch (s3Error) {
            console.error(`Error checking file public status for ${key}:`, s3Error);
            // Default to false if both Redis and S3 fail
            isPublic = false;
          }
        }
        
        return {
          name,
          size: item.Size || 0,
          lastModified: item.LastModified?.toISOString() || '',
          key,
          type: 'file',
          isPublic
        };
      }));

    // Process folders (CommonPrefixes)
    const folders = (response.CommonPrefixes || [])
      .map((prefix) => {
        const parts = prefix.Prefix?.split('/').filter(Boolean) || [];
        const name = parts[parts.length - 1];
        
        return {
          name,
          size: 0,
          lastModified: new Date().toISOString(),
          key: prefix.Prefix || '',
          type: 'folder'
        };
      })
      .filter(folder => folder.name);

    // Combine files and folders
    const allItems = [...folders, ...files];
    console.log('Processed items:', allItems);

    // Convert total storage to MB for easier reading
    const totalStorageUsedMB = totalStorageUsed / (1024 * 1024);

    return NextResponse.json({ 
      files: allItems,
      totalStorageUsed,
      totalStorageUsedMB: parseFloat(totalStorageUsedMB.toFixed(2))
    });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json(
      { error: 'Failed to list files' },
      { status: 500 }
    );
  }
}
