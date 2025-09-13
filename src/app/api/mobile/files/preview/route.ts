import { NextRequest, NextResponse } from 'next/server';
import { getUserFromJWT } from '@/lib/mobile-auth';
import { getFileStreamAndMeta } from '@/lib/storage';
import { getStorageConfig } from '@/lib/storage';

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

  const { searchParams } = new URL(req.url);
  let token = null;
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.replace('Bearer ', '');
  } else {
    // Fallback: check for token in query param
    token = searchParams.get('token');
  }
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await getUserFromJWT(token);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
    const { stream, contentType, contentLength, fileName } = await getFileStreamAndMeta(key);
    if (!stream) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    const headers = new Headers({
      'Content-Type': contentType,
      'Content-Length': contentLength?.toString() || '',
      'Content-Disposition': `inline; filename="${fileName}"`,
      'Access-Control-Allow-Origin': '*',
    });
    return new NextResponse(stream, { status: 200, headers });
  } catch (e) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
} 