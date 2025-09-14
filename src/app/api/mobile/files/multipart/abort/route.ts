import { NextRequest, NextResponse } from 'next/server';
import { S3Client, AbortMultipartUploadCommand } from '@aws-sdk/client-s3';
import { authenticateMobile } from '@/lib/mobile-auth';

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

    const body = await req.json();
    const { uploadId, key } = body;

    if (!uploadId || !key) {
      return NextResponse.json(
        { error: 'Missing required fields: uploadId, key' },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log('Mobile multipart upload abort:', {
      uploadId,
      key
    });

    const command = new AbortMultipartUploadCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      UploadId: uploadId,
    });

    await s3Client.send(command);
    
    console.log('Mobile multipart upload aborted:', {
      uploadId,
      key
    });

    return NextResponse.json({ 
      message: 'Multipart upload aborted successfully'
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Mobile multipart upload abort error:', error);
    return NextResponse.json(
      { error: 'Failed to abort multipart upload' },
      { status: 500, headers: corsHeaders }
    );
  }
}
