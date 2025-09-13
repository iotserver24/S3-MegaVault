import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { authenticateMobile, corsHeaders } from '@/lib/mobile-auth';

const s3Client = new S3Client({
  region: process.env.CLOUDFLARE_R2_REGION || 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

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

    // Parse request body
    const { folderName, parentFolder } = await req.json();

    if (!folderName) {
      return NextResponse.json(
        { error: 'Folder name is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Sanitize folder name
    const sanitizedFolderName = folderName
      .trim()
      .replace(/[/\\?%*:|"<>]/g, '-'); // Replace invalid characters

    if (sanitizedFolderName.length === 0) {
      return NextResponse.json(
        { error: 'Invalid folder name' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Construct the folder path
    let folderPath = `${user.folderId}/`;
    
    if (parentFolder) {
      // Make sure parent folder belongs to the user
      if (!parentFolder.startsWith(user.folderId)) {
        return NextResponse.json(
          { error: 'Invalid parent folder' },
          { status: 400, headers: corsHeaders }
        );
      }
      // Ensure there's a separator between the parent path and the new folder name
      const properlySeparatedParent = parentFolder.endsWith('/') ? parentFolder : `${parentFolder}/`;
      folderPath = `${properlySeparatedParent}${sanitizedFolderName}/`;
    } else {
      folderPath = `${user.folderId}/${sanitizedFolderName}/`;
    }

    // Create an empty object to represent the folder
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
      Key: folderPath,
      Body: '',
      ContentType: 'application/x-directory',
    });

    await s3Client.send(command);

    return NextResponse.json({
      message: 'Folder created successfully',
      key: folderPath,
      name: sanitizedFolderName,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Mobile create folder error:', error);
    return NextResponse.json(
      { error: 'Failed to create folder' },
      { status: 500, headers: corsHeaders }
    );
  }
} 