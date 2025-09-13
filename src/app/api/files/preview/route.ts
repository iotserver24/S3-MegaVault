import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { authOptions } from '@/lib/auth';
import { getToken } from 'next-auth/jwt';

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const encodedKey = searchParams.get('key');
    // Get token from query string (for mobile apps)
    const tokenFromQuery = searchParams.get('token');

    if (!encodedKey) {
      return NextResponse.json({ error: 'File key is required' }, { status: 400 });
    }

    // Handle double-encoded key by decoding twice
    const key = decodeURIComponent(decodeURIComponent(encodedKey));

    // First check if the file is public by checking its metadata
    let isPublic = false;
    try {
      const headCommand = new HeadObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: key,
      });
      const headResult = await s3Client.send(headCommand);
      isPublic = headResult.Metadata?.['is-public'] === 'true';
    } catch (error) {
      // If the head request fails, continue with authentication check
      console.error('Error checking file metadata:', error);
    }

    // If file is not public, verify authentication
    if (!isPublic) {
      // Try to get session from next-auth
      const session = await getServerSession(authOptions);
      
      // For mobile apps: If token is provided in the URL and we don't have a session, 
      // verify the JWT token and extract the user
      let userFolderId = session?.user?.folderId;
      
      if (!userFolderId && tokenFromQuery) {
        try {
          // Verify the token
          const payload = await getToken({ 
            req, 
            secret: process.env.NEXTAUTH_SECRET 
          });
          
          if (payload?.folderId) {
            userFolderId = payload.folderId as string;
          }
        } catch (e) {
          console.error('Error verifying token:', e);
        }
      }

      if (!userFolderId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Verify the file belongs to the user
      if (!key.startsWith(userFolderId)) {
        return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
      }
    }

    // Get content type from file extension
    const fileExtension = key.split('.').pop()?.toLowerCase() || '';
    const isVideo = ['mp4', 'webm', 'ogg'].includes(fileExtension);
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(fileExtension);

    // Handle range request for video streaming
    const range = req.headers.get('range');
    const commandInput: any = {
      Bucket: process.env.S3_BUCKET,
      Key: key,
    };

    if (isVideo && range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : undefined;
      
      commandInput.Range = range;
    }

    const command = new GetObjectCommand(commandInput);
    const response = await s3Client.send(command);
    
    if (!response.Body) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Set up response headers
    const headers = new Headers();
    
    if (response.ContentType) {
      headers.set('Content-Type', response.ContentType);
    }

    // Add cache control for images and videos
    if (isImage || isVideo) {
      headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    }

    // Handle video streaming response
    if (isVideo && response.ContentRange) {
      headers.set('Accept-Ranges', 'bytes');
      headers.set('Content-Range', response.ContentRange);
      if (response.ContentLength) {
        headers.set('Content-Length', response.ContentLength.toString());
      }
      
      return new NextResponse(response.Body as any, {
        status: 206,
        headers,
      });
    }

    // For images and other files, buffer the response
    const chunks = [];
    for await (const chunk of response.Body as any) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    
    return new NextResponse(buffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Preview error:', error);
    return NextResponse.json(
      { error: 'Failed to preview file' },
      { status: 500 }
    );
  }
} 