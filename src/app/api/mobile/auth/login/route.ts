import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Set CORS headers for mobile app
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    // Apply CORS headers to all responses
    const headers = { ...corsHeaders };
    
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400, headers }
      );
    }

    // Single-user authentication: check against environment variables
    const envUserEmail = process.env.USER_EMAIL;
    const envUserPassword = process.env.USER_PASSWORD;

    if (!envUserEmail || !envUserPassword) {
      console.error('Environment variables USER_EMAIL or USER_PASSWORD not set');
      return NextResponse.json(
        { error: 'System configuration error' },
        { status: 500, headers }
      );
    }

    // Check if credentials match environment variables
    if (email !== envUserEmail || password !== envUserPassword) {
      console.error('Invalid credentials for single user');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401, headers }
      );
    }

    // Generate a folder ID for the user (or use a fixed one for single user)
    const folderId = 'single-user-folder';
    
    // Create JWT token
    const token = jwt.sign(
      {
        id: email,
        email: email,
        folderId: folderId,
        isActive: true,
      },
      process.env.NEXTAUTH_SECRET || 'fallback_secret',
      { expiresIn: '30d' }
    );

    // Get default storage limit from environment (unlimited if not set)
    const defaultStorageLimitGB = process.env.DEFAULT_STORAGE_LIMIT_GB ? 
      parseInt(process.env.DEFAULT_STORAGE_LIMIT_GB) : -1; // -1 means unlimited

    // Return user data with token
    return NextResponse.json({
      token,
      user: {
        email,
        folderId: folderId,
        planType: 'unlimited',
        subscriptionStatus: 'active',
        storageLimit: defaultStorageLimitGB,
        additionalStorage: 0,
      }
    }, { headers });
    
  } catch (error) {
    console.error('Mobile login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500, headers: corsHeaders }
    );
  }
} 