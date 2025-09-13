import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// CORS headers for mobile app
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export interface MobileAuthUser {
  id: string;
  email: string;
  folderId: string;
  isActive: boolean;
}

export async function authenticateMobile(req: NextRequest): Promise<{ 
  user: MobileAuthUser | null;
  errorResponse: NextResponse | null;
}> {
  // Get token from Authorization header
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { 
      user: null, 
      errorResponse: NextResponse.json(
        { error: 'Authorization token is required' }, 
        { status: 401, headers: corsHeaders }
      )
    };
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // Verify JWT token
    const decoded = jwt.verify(
      token, 
      process.env.NEXTAUTH_SECRET || 'fallback_secret'
    ) as MobileAuthUser;
    
    // For single-user system, verify the email matches environment
    const envUserEmail = process.env.USER_EMAIL;
    
    if (!envUserEmail || decoded.email !== envUserEmail) {
      return { 
        user: null, 
        errorResponse: NextResponse.json(
          { error: 'User not found or invalid token' }, 
          { status: 404, headers: corsHeaders }
        )
      };
    }
    
    // Return the authenticated user for single-user system
    return { 
      user: {
        id: decoded.email,
        email: decoded.email,
        folderId: 'single-user-folder',
        isActive: true,
      }, 
      errorResponse: null 
    };
    
  } catch (error) {
    console.error('Mobile auth error:', error);
    return { 
      user: null, 
      errorResponse: NextResponse.json(
        { error: 'Invalid or expired token' }, 
        { status: 401, headers: corsHeaders }
      ) 
    };
  }
} 