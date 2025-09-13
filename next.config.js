/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Configure experimental features for better file handling
  experimental: {
    // Enable server components for better performance
    serverComponentsExternalPackages: ['@aws-sdk/client-s3', '@upstash/redis'],
  },
  
  // Configure webpack to handle larger files
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Increase body size limit for server-side processing
      config.externals = [...(config.externals || []), 'formidable'];
    }
    return config;
  },
  
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!    
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/pu/:key*',
        destination: '/pr/:key*',
        permanent: false,
      },
    ]
  },
  async headers() {
    return [
      {
        // Apply CORS headers to all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          { key: 'Access-Control-Max-Age', value: '86400' },
        ],
      },
    ];
  },
}

module.exports = nextConfig 