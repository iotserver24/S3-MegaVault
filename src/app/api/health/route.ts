import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Simple health check endpoint for Docker and monitoring
export async function GET() {
  try {
    // Check environment configuration
    const requiredEnvVars = [
      'UPSTASH_REDIS_REST_URL',
      'UPSTASH_REDIS_REST_TOKEN',
      'NEXTAUTH_SECRET',
      'USER_EMAIL'
    ];

    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    if (missingEnvVars.length > 0) {
      return NextResponse.json({
        status: 'error',
        message: 'Missing required environment variables',
        missing: missingEnvVars,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Test Redis connection
    try {
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      });
      
      // Simple Redis ping
      const pingResult = await redis.ping();
      
      if (pingResult !== 'PONG') {
        throw new Error('Redis ping failed');
      }
    } catch (redisError) {
      return NextResponse.json({
        status: 'error',
        message: 'Redis connection failed',
        error: redisError instanceof Error ? redisError.message : 'Unknown Redis error',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // If all checks pass
    return NextResponse.json({
      status: 'healthy',
      message: 'MegaVault is running properly',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      features: {
        publicRegistration: process.env.ENABLE_PUBLIC_REGISTRATION === 'true',
        fileSharing: process.env.ENABLE_FILE_SHARING === 'true',
        visualization3D: process.env.ENABLE_3D_VISUALIZATION === 'true'
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Health check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}