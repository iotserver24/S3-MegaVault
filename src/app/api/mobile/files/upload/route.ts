import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { authenticateMobile, corsHeaders } from '@/lib/mobile-auth';
import { getStorageConfig } from '@/lib/storage';

const s3Client = new S3Client({
  region: process.env.CLOUDFLARE_R2_REGION || 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
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
    
    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();
    
    if (!user && storageConfig.mode === 'folder') {
      return NextResponse.json(
        { error: 'Unauthorized - Missing user' }, 
        { status: 401, headers: corsHeaders }
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

    // Construct the file path based on storage mode
    let filePath: string;
    if (storageConfig.mode === 'bucket') {
      filePath = folder ? `${folder}/${file.name}` : file.name;
    } else {
      const basePath = `${userFolderId}/`;
      filePath = folder 
        ? `${basePath}${folder}/${file.name}`
        : `${basePath}${file.name}`;
    }

    const buffer = await file.arrayBuffer();
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
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