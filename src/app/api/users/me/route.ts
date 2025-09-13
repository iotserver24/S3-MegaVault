import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getStorageConfig } from '@/lib/storage';

export async function GET() {
  try {
    // Get the current user session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    
    // For single-user system, verify user matches environment
    const envUserEmail = process.env.USER_EMAIL;
    
    if (userEmail !== envUserEmail) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get default storage limit from environment (unlimited if not set)
    const defaultStorageLimitGB = process.env.DEFAULT_STORAGE_LIMIT_GB ? 
      parseInt(process.env.DEFAULT_STORAGE_LIMIT_GB) : -1; // -1 means unlimited
    
    // Get storage usage - for single user system, this could be enhanced
    // by implementing file system scanning or simple Redis stats
    let usedStorage = 0;

    // Get storage configuration
    const storageConfig = getStorageConfig();
    const userFolderId = storageConfig.getUserFolderId();
    
    // Return user profile for single-user system
    return NextResponse.json({
      email: userEmail,
      fullName: '', // Static for single user
      folderId: userFolderId,
      createdAt: new Date().toISOString(), // Static for single user
      updatedAt: new Date().toISOString(), // Static for single user  
      storageLimit: defaultStorageLimitGB,
      usedStorage,
      isActive: true,
      isAdmin: userEmail === envUserEmail, // Single user is admin
      planType: defaultStorageLimitGB === -1 ? 'unlimited' : 'base',
    });
    
  } catch (error) {
    console.error('User profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
} 