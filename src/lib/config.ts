/**
 * Environment configuration validation utility for MegaVault Open Source
 */

export interface EnvironmentConfig {
  // Database
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;

  // Storage (S3 Compatible)
  S3_ENDPOINT: string;
  S3_ACCESS_KEY_ID: string;
  S3_SECRET_ACCESS_KEY: string;
  S3_BUCKET: string;
  S3_REGION: string;

  // Authentication
  NEXTAUTH_URL: string;
  NEXTAUTH_SECRET: string;

  // User Configuration
  USER_EMAIL: string;
  USER_PASSWORD: string;

  // Application Settings (Optional)
  DEFAULT_STORAGE_LIMIT_GB?: string;
  ENABLE_PUBLIC_REGISTRATION: string;
  ENABLE_FILE_SHARING: string;
  ENABLE_3D_VISUALIZATION: string;

  // Optional: Custom Branding
  APP_NAME?: string;
  APP_DESCRIPTION?: string;
}

/**
 * Validates that all required environment variables are present
 * @throws Error if any required environment variables are missing
 */
export function validateEnvironmentConfig(): EnvironmentConfig {
  const required = [
    'UPSTASH_REDIS_REST_URL',
    'UPSTASH_REDIS_REST_TOKEN',
    'S3_ENDPOINT',
    'S3_ACCESS_KEY_ID',
    'S3_SECRET_ACCESS_KEY',
    'S3_BUCKET',
    'NEXTAUTH_SECRET',
    'USER_EMAIL',
    'USER_PASSWORD'
  ];

  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Validate user email format
  const userEmail = process.env.USER_EMAIL!;
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(userEmail)) {
    throw new Error('USER_EMAIL must be a valid email address');
  }

  // Security validations
  const nextAuthSecret = process.env.NEXTAUTH_SECRET!;
  if (nextAuthSecret.length < 32) {
    throw new Error('NEXTAUTH_SECRET must be at least 32 characters long for security');
  }

  // Check for default/insecure values
  const defaultSecrets = [
    'generate-random-64-character-string-change-this-immediately',
    'your-secret-here',
    'changeme',
    'default',
    'secret'
  ];
  
  if (defaultSecrets.some(defaultSecret => nextAuthSecret.toLowerCase().includes(defaultSecret.toLowerCase()))) {
    throw new Error('NEXTAUTH_SECRET appears to contain default values. Please generate a secure random secret.');
  }

  const userPassword = process.env.USER_PASSWORD!;
  if (userPassword.length < 12) {
    console.warn('⚠️  WARNING: USER_PASSWORD is shorter than 12 characters. Consider using a stronger password.');
  }

  // Check for default password values
  const defaultPasswords = [
    'create-strong-password-minimum-20-characters',
    'password',
    'admin',
    'changeme',
    '123456'
  ];
  
  if (defaultPasswords.some(defaultPw => userPassword.toLowerCase().includes(defaultPw.toLowerCase()))) {
    throw new Error('USER_PASSWORD appears to contain default values. Please set a secure password.');
  }

  // Production security warnings
  if (process.env.NODE_ENV === 'production') {
    const nextAuthUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001';
    if (!nextAuthUrl.startsWith('https://') && !nextAuthUrl.includes('localhost')) {
      console.warn('⚠️  SECURITY WARNING: NEXTAUTH_URL should use HTTPS in production environments');
    }

    if (process.env.ENABLE_PUBLIC_REGISTRATION === 'true') {
      console.warn('⚠️  WARNING: Public registration is enabled in production. Consider disabling for single-user setup.');
    }
  }

  // Validate numeric settings (optional)
  if (process.env.DEFAULT_STORAGE_LIMIT_GB) {
    const storageLimit = parseInt(process.env.DEFAULT_STORAGE_LIMIT_GB);
    if (isNaN(storageLimit) || storageLimit <= 0) {
      throw new Error('DEFAULT_STORAGE_LIMIT_GB must be a positive number or omitted for unlimited storage');
    }
  }


  return {
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL!,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN!,
    S3_ENDPOINT: process.env.S3_ENDPOINT!,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID!,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY!,
    S3_BUCKET: process.env.S3_BUCKET!,
    S3_REGION: process.env.S3_REGION || 'auto',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3001',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
    USER_EMAIL: process.env.USER_EMAIL!,
    USER_PASSWORD: process.env.USER_PASSWORD!,
    DEFAULT_STORAGE_LIMIT_GB: process.env.DEFAULT_STORAGE_LIMIT_GB,
    ENABLE_PUBLIC_REGISTRATION: process.env.ENABLE_PUBLIC_REGISTRATION || 'false',
    ENABLE_FILE_SHARING: process.env.ENABLE_FILE_SHARING || 'true',
    ENABLE_3D_VISUALIZATION: process.env.ENABLE_3D_VISUALIZATION || 'false',
    APP_NAME: process.env.APP_NAME || 'MegaVault',
    APP_DESCRIPTION: process.env.APP_DESCRIPTION || 'Open Source Cloud Storage',
  };
}

/**
 * Gets environment configuration with validation
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  try {
    return validateEnvironmentConfig();
  } catch (error) {
    console.error('Environment configuration error:', error);
    throw error;
  }
}

/**
 * Checks if a feature is enabled via environment variables
 */
export function isFeatureEnabled(feature: 'publicRegistration' | 'fileSharing' | '3dVisualization'): boolean {
  switch (feature) {
    case 'publicRegistration':
      return process.env.ENABLE_PUBLIC_REGISTRATION === 'true';
    case 'fileSharing':
      return process.env.ENABLE_FILE_SHARING === 'true';
    case '3dVisualization':
      return process.env.ENABLE_3D_VISUALIZATION === 'true';
    default:
      return false;
  }
}

/**
 * Gets default storage limit in bytes
 * Returns -1 for unlimited storage
 */
export function getDefaultStorageLimit(): number {
  if (!process.env.DEFAULT_STORAGE_LIMIT_GB) {
    return -1; // Unlimited storage
  }
  const limitGB = parseInt(process.env.DEFAULT_STORAGE_LIMIT_GB);
  return limitGB * 1024 * 1024 * 1024; // Convert GB to bytes
}


/**
 * Checks if storage is unlimited
 */
export function isStorageUnlimited(): boolean {
  return !process.env.DEFAULT_STORAGE_LIMIT_GB;
}
