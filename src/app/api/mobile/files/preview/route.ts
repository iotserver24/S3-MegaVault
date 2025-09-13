import { NextRequest, NextResponse } from 'next/server';
import { authenticateMobile } from '@/lib/mobile-auth';
import { getStorageConfig } from '@/lib/storage';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

export async function GET(req: NextRequest) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      },
    });
  }

  // Authenticate user
  const { user, errorResponse } = await authenticateMobile(req);
  if (errorResponse) {
    return errorResponse;
  }

  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  if (!key) {
    return NextResponse.json({ error: 'Missing file key' }, { status: 400 });
  }

  // Check if user owns the file based on storage mode
  const storageConfig = getStorageConfig();
  const userFolderId = storageConfig.getUserFolderId();
  
  const hasAccess = storageConfig.mode === 'bucket' 
    ? true // In bucket mode, user has access to all files
    : key.startsWith(userFolderId);
  
  if (!hasAccess) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Get file stream and metadata
  try {
    const s3Client = new S3Client({
      region: process.env.S3_REGION || 'auto',
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    });

    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
    });

    const response = await s3Client.send(command);
    
    if (!response.Body) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const headers = new Headers({
      'Content-Type': response.ContentType || 'application/octet-stream',
      'Content-Length': response.ContentLength?.toString() || '',
      'Content-Disposition': `inline; filename="${key.split('/').pop()}"`,
      'Access-Control-Allow-Origin': '*',
    });

    return new NextResponse(response.Body as ReadableStream, { status: 200, headers });
  } catch (e) {
    console.error('Preview error:', e);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
} 