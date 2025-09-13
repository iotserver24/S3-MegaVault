import { S3Client, ListObjectsV2Command, DeleteObjectCommand, DeleteObjectsCommand, ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';

/**
 * Get storage configuration based on environment variables
 * @returns Storage configuration object
 */
export function getStorageConfig() {
  const storageMode = process.env.STORAGE_ACCESS_MODE || 'folder';
  const userStorageFolder = process.env.USER_STORAGE_FOLDER || 'single-user-folder';
  
  return {
    mode: storageMode as 'bucket' | 'folder',
    folderName: userStorageFolder,
    // Get the storage prefix based on mode
    getStoragePrefix: () => {
      return storageMode === 'bucket' ? '' : `${userStorageFolder}/`;
    },
    // Get folder ID for user session
    getUserFolderId: () => {
      return storageMode === 'bucket' ? '' : userStorageFolder;
    }
  };
}

// Initialize S3 client for S3-compatible storage
const s3Client = new S3Client({
  region: process.env.S3_REGION || 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

/**
 * Delete all files belonging to a user
 * @param email User's email address (used to find their folder ID)
 * @returns Promise that resolves when all files are deleted
 */
export async function deleteUserFiles(email: string): Promise<void> {
  try {
    // Get user's folder ID from Redis
    const redis = await import('@upstash/redis');
    const redisClient = new redis.Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
    
    const userData = await redisClient.hgetall(`user:${email}`);
    if (!userData || !userData.folderId) {
      throw new Error(`User folder ID not found for ${email}`);
    }
    
    const folderId = userData.folderId;
    console.log(`Deleting all files for user ${email} with folder ID ${folderId}`);
    
    // List all objects in the user's folder
    const listParams = {
      Bucket: process.env.S3_BUCKET!,
      Prefix: `${folderId}/`,
    };
    
    let isTruncated = true;
    let continuationToken = undefined;
    
    while (isTruncated) {
      const listCommand: ListObjectsV2Command = new ListObjectsV2Command({
        ...listParams,
        ContinuationToken: continuationToken,
      });
      
      const listResponse: ListObjectsV2CommandOutput = await s3Client.send(listCommand);
      const objects = listResponse.Contents || [];
      
      if (objects.length > 0) {
        // If there are many objects, we can use the batch delete
        if (objects.length > 1) {
          const deleteParams = {
            Bucket: process.env.S3_BUCKET!,
            Delete: {
              Objects: objects.map((obj: any) => ({ Key: obj.Key })),
              Quiet: true,
            },
          };
          
          await s3Client.send(new DeleteObjectsCommand(deleteParams));
        } else {
          // For a single object, use regular delete
          const deleteParams = {
            Bucket: process.env.S3_BUCKET!,
            Key: objects[0].Key,
          };
          
          await s3Client.send(new DeleteObjectCommand(deleteParams));
        }
      }
      
      // Check if there are more objects to delete
      isTruncated = !!listResponse.IsTruncated;
      continuationToken = listResponse.NextContinuationToken;
    }
    
    // Update user storage stats in Redis
    await redisClient.hset(`user:${email}`, {
      usedStorage: '0',
      updatedAt: new Date().toISOString(),
    });
    
    // Update folder stats in Redis
    await redisClient.hset(`folder:${folderId}:stats`, {
      totalSize: '0',
      totalFiles: '0',
      lastUpdated: new Date().toISOString(),
    });
    
    console.log(`Successfully deleted all files for user ${email}`);
  } catch (error) {
    console.error(`Error deleting files for user ${email}:`, error);
    throw error;
  }
} 