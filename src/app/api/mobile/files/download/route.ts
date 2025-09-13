import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { authenticateMobile, corsHeaders } from '@/lib/mobile-auth';
import { getStorageConfig } from '@/lib/storage';

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  try {
    // Get the file key from query params
    const { searchParams } = new URL(req.url);
    const encodedKey = searchParams.get('key');

    if (!encodedKey) {
      return NextResponse.json(
        { error: 'File key is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Handle double-encoded key by decoding twice
    const key = decodeURIComponent(decodeURIComponent(encodedKey));

    // For public files, check the public prefix
    if (key.startsWith('public/')) {
      // Public files don't need authentication
      const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: key,
      });

      // Generate a presigned URL that's valid for 15 minutes
      const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });
      
      return NextResponse.json({ 
        downloadUrl: signedUrl 
      }, { headers: corsHeaders });
    }

    // For private files, authenticate the user
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

    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();

    // Verify the file belongs to the user based on storage mode
    const hasAccess = storageConfig.mode === 'bucket' 
      ? true // In bucket mode, user has access to all files
      : key.startsWith(userFolderId);
    
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Unauthorized access to this file' }, 
        { status: 403, headers: corsHeaders }
      );
    }

    // Generate a presigned URL for the file
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
    });

    // Generate a presigned URL that's valid for 15 minutes
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

    return NextResponse.json({ 
      downloadUrl: signedUrl 
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Mobile download error:', error);
    return NextResponse.json(
      { error: 'Failed to generate download URL' },
      { status: 500, headers: corsHeaders }
    );
  }
} 