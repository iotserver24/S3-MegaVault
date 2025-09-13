import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { authenticateMobile, corsHeaders } from '@/lib/mobile-auth';

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

// Updated route configuration for Next.js 14+
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds timeout for file uploads

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
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

    // Check for subscription status
    if (user.subscriptionStatus !== 'active' && user.planType !== 'base') {
      return NextResponse.json(
        { error: 'Your subscription is inactive. Please renew your subscription on the website.' }, 
        { status: 403, headers: corsHeaders }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Construct the file path
    const basePath = `${user.folderId}/`;
    const filePath = folder 
      ? `${basePath}${folder}/${file.name}`
      : `${basePath}${file.name}`;

    const buffer = await file.arrayBuffer();
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: filePath,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    });

    await s3Client.send(command);

    return NextResponse.json({ 
      message: 'File uploaded successfully',
      key: filePath,
      name: file.name,
      size: file.size,
      type: file.type,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Mobile upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500, headers: corsHeaders }
    );
  }
} 