import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get session token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Log token information for debugging (remove in production)
  console.log('Middleware token:', JSON.stringify(token));
  console.log('Current path:', pathname);
  
  // Public routes that don't require authentication
  const publicRoutes = ['/api/auth', '/api/files/public', '/pu/', '/pr/', '/d/'];
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Root route handling
  if (pathname === '/') {
    if (token) {
      // If user is logged in, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Show login page at root for unauthenticated users
    return NextResponse.next();
  }

  // Protected routes (only dashboard now)
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      console.log('No token, redirecting to login');
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Check if user account is active
    if (token.isActive === false) {
      console.log('User account is inactive');
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Continue with the request
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ['/dashboard/:path*', '/']
}; 