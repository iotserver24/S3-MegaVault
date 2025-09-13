import { NextRequest, NextResponse } from 'next/server';
import { ListObjectsV2Command, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getRedis, getS3Client } from '@/lib/redis';
import { authenticateMobile, corsHeaders } from '@/lib/mobile-auth';
import { getStorageConfig } from '@/lib/storage';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  try {
    // Authenticate the mobile user
    const { user, errorResponse } = await authenticateMobile(req);
    
    if (errorResponse) {
      return errorResponse;
    }
    
    if (!user?.folderId) {
      return NextResponse.json(
        { error: 'Unauthorized - Missing folder ID' }, 
        { status: 401, headers: corsHeaders }
      );
    }

    const redis = getRedis();
    const s3Client = getS3Client();

    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();

    // Get the current folder from query params
    const { searchParams } = new URL(req.url);
    const currentFolder = searchParams.get('folder') || '';
    
    console.log('Mobile files list - User:', user.email);
    console.log('Mobile files list - Folder ID:', user.folderId);
    console.log('Mobile files list - Current folder:', currentFolder);

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
      
    console.log('Mobile files list - S3 prefix:', prefix);

    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET,
      Prefix: prefix,
      Delimiter: '/',
    });

    const response = await s3Client.send(command);

    // Process regular files (excluding the root folder marker)
    const files = await Promise.all((response.Contents || [])
      .filter(item => item.Key !== prefix) // Exclude current folder marker
      .map(async (item) => {
        const key = item.Key || '';
        const name = key.split('/').pop() || '';
        
        // Check if file is public
        let isPublic = false;
        
        try {
          // First check Redis for public status
          const fileRedisData = await redis.hgetall(`file:${key}`);
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
          console.error(`Error checking file public status for ${key}:`, error);
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

    // Convert total storage to MB for easier reading
    const totalStorageUsedMB = totalStorageUsed / (1024 * 1024);

    return NextResponse.json({ 
      files: allItems,
      totalStorageUsed,
      totalStorageUsedMB: parseFloat(totalStorageUsedMB.toFixed(2)),
      currentFolder,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Mobile files list error:', error);
    return NextResponse.json(
      { error: 'Failed to list files' },
      { status: 500, headers: corsHeaders }
    );
  }
} 