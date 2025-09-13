import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const encodedKey = searchParams.get('key');
    // Accept token parameter but ignore it for public files
    const tokenFromQuery = searchParams.get('token');

    if (!encodedKey) {
      return NextResponse.json(
        { error: 'No file key provided' },
        { status: 400 }
      );
    }

    // Handle double-encoded key by decoding twice
    const key = decodeURIComponent(decodeURIComponent(encodedKey));

    // First check if the file is public
    const headCommand = new HeadObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
    });

    try {
      const headResult = await s3Client.send(headCommand);
      const isPublic = headResult.Metadata?.['is-public'] === 'true';
      
      if (!isPublic) {
        // For mobile apps, provide a more detailed error
        return NextResponse.json(
          { error: 'File is not publicly accessible', code: 'NOT_PUBLIC' },
          { status: 403 }
        );
      }

      // Get content type from file extension
      const fileExtension = key.split('.').pop()?.toLowerCase() || '';
      const isVideo = ['mp4', 'webm', 'ogg'].includes(fileExtension);
      const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(fileExtension);

      // Handle range request for video streaming
      const range = req.headers.get('range');
      const commandInput: any = {
        Bucket: process.env.S3_BUCKET!,
        Key: key,
      };

      if (isVideo && range) {
        commandInput.Range = range;
      }

      const getCommand = new GetObjectCommand(commandInput);
      const result = await s3Client.send(getCommand);
      
      if (!result.Body) {
        throw new Error('No file content received');
      }

      // Set up response headers
      const headers = new Headers();
      
      if (result.ContentType) {
        headers.set('Content-Type', result.ContentType);
      }

      // Add cache control for images and videos
      if (isImage || isVideo) {
        headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
      }

      // Handle video streaming response
      if (isVideo && result.ContentRange) {
        headers.set('Accept-Ranges', 'bytes');
        headers.set('Content-Range', result.ContentRange);
        if (result.ContentLength) {
          headers.set('Content-Length', result.ContentLength.toString());
        }
        
        return new NextResponse(result.Body as any, {
          status: 206,
          headers,
        });
      }

      // For images and other files, buffer the response
      const chunks: Uint8Array[] = [];
      const stream = result.Body as Readable;
      
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      
      const buffer = Buffer.concat(chunks);

      return new NextResponse(buffer, {
        status: 200,
        headers,
      });

    } catch (error: any) {
      if (error.name === 'NoSuchKey' || error.name === 'NotFound') {
        return NextResponse.json(
          { error: 'File not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Error getting public file preview:', error);
    return NextResponse.json(
      { error: 'Failed to get file preview', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
} 