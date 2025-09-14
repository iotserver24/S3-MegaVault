import { NextRequest, NextResponse } from 'next/server';
import { S3Client, UploadPartCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
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
    const { uploadId, key, partNumbers } = body;

    if (!uploadId || !key || !partNumbers || !Array.isArray(partNumbers)) {
      return NextResponse.json(
        { error: 'Missing required fields: uploadId, key, partNumbers' },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log('Mobile presigned URLs generation:', {
      uploadId,
      key,
      partNumbers: partNumbers.length
    });

    const presignedUrls = await Promise.all(
      partNumbers.map(async (partNumber: number) => {
        const command = new UploadPartCommand({
          Bucket: process.env.S3_BUCKET!,
          Key: key,
          UploadId: uploadId,
          PartNumber: partNumber,
        });

        const presignedUrl = await getSignedUrl(s3Client, command, { 
          expiresIn: 3600 // 1 hour
        });

        return {
          partNumber,
          url: presignedUrl
        };
      })
    );

    console.log('Mobile presigned URLs generated:', presignedUrls.length);

    return NextResponse.json({ 
      presignedUrls
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Mobile presigned URLs generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate presigned URLs' },
      { status: 500, headers: corsHeaders }
    );
  }
}
