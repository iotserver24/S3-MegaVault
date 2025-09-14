import { NextRequest, NextResponse } from 'next/server';
import { S3Client, CreateMultipartUploadCommand } from '@aws-sdk/client-s3';
import { authenticateMobile } from '@/lib/mobile-auth';
import { getStorageConfig } from '@/lib/storage';

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    // Authenticate the mobile user
    const { user, errorResponse } = await authenticateMobile(req);
    
    if (errorResponse) {
      return errorResponse;
    }
    
    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();
    
    if (!user && storageConfig.mode === 'folder') {
      return NextResponse.json(
        { error: 'Unauthorized - Missing user' }, 
        { status: 401, headers: corsHeaders }
      );
    }

    const body = await req.json();
    const { fileName, fileSize, fileType, folder } = body;

    if (!fileName || !fileSize || !fileType) {
      return NextResponse.json(
        { error: 'Missing required fields: fileName, fileSize, fileType' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Construct the file path based on storage mode
    let filePath: string;
    if (storageConfig.mode === 'bucket') {
      filePath = folder ? `${folder}/${fileName}` : fileName;
    } else {
      const basePath = `${userFolderId}/`;
      filePath = folder 
        ? `${basePath}${folder}/${fileName}`
        : `${basePath}${fileName}`;
    }

    console.log('Mobile multipart upload initiated:', {
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
        'mobile-upload': 'true',
      },
    });

    const response = await s3Client.send(command);
    
    console.log('Mobile multipart upload initiated:', {
      uploadId: response.UploadId,
      key: filePath
    });

    return NextResponse.json({ 
      uploadId: response.UploadId,
      key: filePath,
      fileName,
      fileSize,
      fileType
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Mobile multipart upload initiation error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate multipart upload' },
      { status: 500, headers: corsHeaders }
    );
  }
}
