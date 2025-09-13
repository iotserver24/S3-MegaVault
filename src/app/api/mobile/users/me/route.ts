import { NextRequest, NextResponse } from 'next/server';
import { authenticateMobile, corsHeaders } from '@/lib/mobile-auth';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  try {
    // Authenticate the mobile user
    const { user, errorResponse } = await authenticateMobile(req);
    
    if (errorResponse) {
      return errorResponse;
    }
    
    if (!user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - User not found' }, 
        { status: 401, headers: corsHeaders }
      );
    }

    // For single-user system, return static user profile
    const defaultStorageLimitGB = process.env.DEFAULT_STORAGE_LIMIT_GB ? 
      parseInt(process.env.DEFAULT_STORAGE_LIMIT_GB) : -1; // -1 means unlimited
    
    // Get storage usage from environment or default to 0
    let usedStorage = 0;
    // Note: In single-user system, storage tracking could be enhanced by
    // implementing a simple file system scan or maintaining stats in Redis
    
    // Return user profile for single-user system
    return NextResponse.json({
      email: user.email,
      folderId: user.folderId,
      createdAt: new Date().toISOString(), // Static for single user
      planType: defaultStorageLimitGB === -1 ? 'unlimited' : 'base',
      storageLimit: defaultStorageLimitGB,
      usedStorage,
      additionalStorage: 0,
      subscriptionStatus: 'active',
      billingCycleStart: null,
      billingCycleEnd: null,
      nextBillingDate: null,
      // Provide a link to the web portal for managing the account
      webPortalUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000'
    }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('Mobile user profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500, headers: corsHeaders }
    );
  }
} 