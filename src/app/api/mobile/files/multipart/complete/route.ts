import { NextRequest, NextResponse } from 'next/server';
import { S3Client, CompleteMultipartUploadCommand } from '@aws-sdk/client-s3';
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

interface Part {
  ETag: string;
  PartNumber: number;
}

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
    const { uploadId, key, parts } = body;

    if (!uploadId || !key || !parts || !Array.isArray(parts)) {
      return NextResponse.json(
        { error: 'Missing required fields: uploadId, key, parts' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate parts format
    const validParts = parts.every((part: any) => 
      part.ETag && part.PartNumber && 
      typeof part.PartNumber === 'number'
    );

    if (!validParts) {
      return NextResponse.json(
        { error: 'Invalid parts format. Each part must have ETag and PartNumber' },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log('Mobile multipart upload completion:', {
      uploadId,
      key,
      partsCount: parts.length
    });

    // Sort parts by part number
    const sortedParts = parts.sort((a: Part, b: Part) => a.PartNumber - b.PartNumber);

    const command = new CompleteMultipartUploadCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: sortedParts
      },
    });

    const response = await s3Client.send(command);
    
    console.log('Mobile multipart upload completed:', {
      uploadId,
      key,
      location: response.Location
    });

    return NextResponse.json({ 
      message: 'Multipart upload completed successfully',
      key: key,
      location: response.Location,
      etag: response.ETag,
      name: key.split('/').pop() || key,
      size: 0, // Size will be available from the S3 response if needed
      type: 'application/octet-stream', // Type will be available from metadata
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Mobile multipart upload completion error:', error);
    return NextResponse.json(
      { error: 'Failed to complete multipart upload' },
      { status: 500, headers: corsHeaders }
    );
  }
}
