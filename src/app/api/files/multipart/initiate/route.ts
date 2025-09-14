import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { S3Client, CreateMultipartUploadCommand } from '@aws-sdk/client-s3';
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

    const body = await req.json();
    const { fileName, fileSize, fileType, folder, relativePath } = body;

    if (!fileName || !fileSize || !fileType) {
      return NextResponse.json(
        { error: 'Missing required fields: fileName, fileSize, fileType' },
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
      if (relativePath && relativePath !== fileName) {
        // Handle folder uploads with relative paths
        filePath = relativePath;
      } else if (folder) {
        filePath = `${folder}/${fileName}`;
      } else {
        filePath = fileName;
      }
    } else {
      // Folder mode: store files within user folder
      const basePath = userFolderId ? `${userFolderId}/` : '';
      
      if (relativePath && relativePath !== fileName) {
        // Handle folder uploads with relative paths
        filePath = `${basePath}${relativePath}`;
      } else if (folder) {
        filePath = `${basePath}${folder}/${fileName}`;
      } else {
        filePath = `${basePath}${fileName}`;
      }
    }

    console.log('Initiating multipart upload:', {
      path: filePath,
      size: fileSize,
      type: fileType
    });

    const command = new CreateMultipartUploadCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: filePath,
      ContentType: fileType,
      Metadata: {
        'original-name': fileName,
        'upload-size': fileSize.toString(),
        'upload-timestamp': new Date().toISOString(),
      },
    });

    const response = await s3Client.send(command);
    
    console.log('Multipart upload initiated:', {
      uploadId: response.UploadId,
      key: filePath
    });

    return NextResponse.json({ 
      uploadId: response.UploadId,
      key: filePath,
      fileName,
      fileSize,
      fileType
    });
  } catch (error) {
    console.error('Error initiating multipart upload:', error);
    return NextResponse.json(
      { error: 'Failed to initiate multipart upload' },
      { status: 500 }
    );
  }
}
