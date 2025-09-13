import { Alert, TableOfContents, Card, CodeBlock, StepGuide } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Deployment Overview' },
  { id: 'production-setup', title: 'Production Environment' },
  { id: 'vercel-deployment', title: 'Vercel Deployment' },
  { id: 'docker-deployment', title: 'Docker Deployment' },
  { id: 'environment-config', title: 'Environment Configuration' },
  { id: 'monitoring', title: 'Monitoring & Logging' },
  { id: 'maintenance', title: 'Maintenance & Updates' },
];

const deploymentSteps = [
  {
    title: 'Prepare Production Build',
    description: 'Build and optimize the application for production.',
    code: `# Install dependencies
npm ci --production

# Build the application
npm run build

# Test production build locally
npm start`,
    language: 'bash',
  },
  {
    title: 'Configure Environment',
    description: 'Set up production environment variables.',
    code: `# Production environment variables
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
REDIS_URL=your-redis-connection-string
R2_ACCOUNT_ID=your-r2-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key`,
    language: 'env',
  },
  {
    title: 'Deploy to Platform',
    description: 'Deploy using your preferred platform (Vercel, Docker, etc.).',
    code: `# Vercel deployment
vercel --prod

# Docker deployment
docker build -t megavault .
docker run -p 3000:3000 megavault`,
    language: 'bash',
  },
];

export default function DeploymentPage() {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Deployment</h1>
        <p className="text-xl text-slate-600">
          Complete guide to deploying MegaVault to production environments with best practices for security, performance, and reliability.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Deployment Overview</h2>
        <p>
          MegaVault can be deployed to various platforms including Vercel, Docker containers, 
          and traditional VPS servers. This guide covers the most common deployment scenarios.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Vercel (Recommended)" description="Serverless deployment">
            <ul className="text-sm space-y-1">
              <li>✅ Zero configuration</li>
              <li>✅ Automatic HTTPS</li>
              <li>✅ Global CDN</li>
              <li>✅ Preview deployments</li>
            </ul>
          </Card>
          
          <Card title="Docker" description="Containerized deployment">
            <ul className="text-sm space-y-1">
              <li>✅ Consistent environments</li>
              <li>✅ Easy scaling</li>
              <li>✅ Self-hosted control</li>
              <li>✅ Container orchestration</li>
            </ul>
          </Card>

          <Card title="VPS/Cloud" description="Traditional hosting">
            <ul className="text-sm space-y-1">
              <li>✅ Full server control</li>
              <li>✅ Custom configurations</li>
              <li>✅ Cost effective scaling</li>
              <li>✅ Direct access</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Deployment Requirements">
          Before deploying, ensure you have:
          <ul className="mt-2">
            <li>Production Redis database (Upstash recommended)</li>
            <li>S3-compatible storage (Cloudflare R2 or AWS S3)</li>
            <li>Domain name with SSL certificate</li>
            <li>Environment variables configured</li>
          </ul>
        </Alert>
      </section>

      <section id="production-setup">
        <h2>Production Environment</h2>
        <p>
          Setting up production services and dependencies for optimal performance and security.
        </p>

        <h3>Database Setup</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Upstash Redis">
            <ul className="text-sm space-y-1">
              <li><strong>Create Account:</strong> Sign up at upstash.com</li>
              <li><strong>Create Database:</strong> Choose your region</li>
              <li><strong>Get Connection:</strong> Copy Redis URL</li>
              <li><strong>Configure TLS:</strong> Enable secure connections</li>
            </ul>
          </Card>
          
          <Card title="Self-Hosted Redis">
            <ul className="text-sm space-y-1">
              <li><strong>Install Redis:</strong> Latest stable version</li>
              <li><strong>Configure Auth:</strong> Set strong password</li>
              <li><strong>Enable Persistence:</strong> RDB + AOF</li>
              <li><strong>Setup Monitoring:</strong> Redis insights</li>
            </ul>
          </Card>
        </div>

        <h3>Storage Configuration</h3>
        <CodeBlock language="bash" title="Cloudflare R2 Setup">
{`# Create R2 bucket
wrangler r2 bucket create megavault-production

# Configure CORS
wrangler r2 bucket cors put megavault-production --file cors.json

# Generate API tokens with R2 permissions
# Account ID, Access Key ID, Secret Access Key`}
        </CodeBlock>

        <h3>SSL and Security</h3>
        <ul>
          <li><strong>HTTPS Only:</strong> Enforce SSL/TLS for all connections</li>
          <li><strong>Security Headers:</strong> Configure CSP, HSTS, and other headers</li>
          <li><strong>API Rate Limiting:</strong> Implement rate limiting for API endpoints</li>
          <li><strong>Input Validation:</strong> Validate all user inputs</li>
        </ul>
      </section>

      <section id="vercel-deployment">
        <h2>Vercel Deployment</h2>
        <p>
          Vercel provides the easiest deployment experience with automatic builds and deployments.
        </p>

        <h3>Setup Process</h3>
        <StepGuide steps={deploymentSteps} />

        <h3>Vercel Configuration</h3>
        <CodeBlock language="json" title="vercel.json">
{`{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm ci",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}`}
        </CodeBlock>

        <h3>Environment Variables</h3>
        <CodeBlock language="bash" title="Vercel Environment Setup">
{`# Add environment variables via Vercel dashboard or CLI
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add REDIS_URL production
vercel env add R2_ACCOUNT_ID production
vercel env add R2_ACCESS_KEY_ID production
vercel env add R2_SECRET_ACCESS_KEY production

# Deploy with environment variables
vercel --prod`}
        </CodeBlock>

        <h3>Custom Domain</h3>
        <ol>
          <li><strong>Add Domain:</strong> Add your custom domain in Vercel dashboard</li>
          <li><strong>Configure DNS:</strong> Point your domain to Vercel's nameservers</li>
          <li><strong>SSL Certificate:</strong> Automatic SSL certificate provisioning</li>
          <li><strong>Redirects:</strong> Configure www to non-www redirects</li>
        </ol>
      </section>

      <section id="docker-deployment">
        <h2>Docker Deployment</h2>
        <p>
          Containerized deployment provides consistency across environments and easy scaling.
        </p>

        <h3>Dockerfile</h3>
        <CodeBlock language="dockerfile" title="Dockerfile">
{`FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]`}
        </CodeBlock>

        <h3>Docker Compose</h3>
        <CodeBlock language="yaml" title="docker-compose.prod.yml">
{`version: '3.8'

services:
  megavault:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXTAUTH_URL=https://your-domain.com
      - NEXTAUTH_SECRET=\${NEXTAUTH_SECRET}
      - REDIS_URL=\${REDIS_URL}
      - R2_ACCOUNT_ID=\${R2_ACCOUNT_ID}
      - R2_ACCESS_KEY_ID=\${R2_ACCESS_KEY_ID}
      - R2_SECRET_ACCESS_KEY=\${R2_SECRET_ACCESS_KEY}
    restart: unless-stopped
    depends_on:
      - redis

  redis:
    image: redis:alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - megavault
    restart: unless-stopped

volumes:
  redis_data:`}
        </CodeBlock>

        <h3>Deployment Commands</h3>
        <CodeBlock language="bash" title="Docker Deployment">
{`# Build and start containers
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose logs -f megavault

# Update deployment
docker-compose pull
docker-compose -f docker-compose.prod.yml up -d --no-deps megavault

# Scale application
docker-compose -f docker-compose.prod.yml up -d --scale megavault=3`}
        </CodeBlock>
      </section>

      <section id="environment-config">
        <h2>Environment Configuration</h2>
        <p>
          Proper environment configuration is crucial for security and functionality in production.
        </p>

        <h3>Required Environment Variables</h3>
        <CodeBlock language="env" title="Production .env">
{`# Application
NODE_ENV=production
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-very-long-random-secret-here

# Database
REDIS_URL=rediss://username:password@host:port

# Storage (Cloudflare R2)
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=megavault-production
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com

# Optional
NEXT_PUBLIC_APP_URL=https://your-domain.com
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password`}
        </CodeBlock>

        <h3>Security Configuration</h3>
        <CodeBlock language="typescript" title="next.config.js">
{`/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        }
      ]
    }
  ]
};

module.exports = nextConfig;`}
        </CodeBlock>
      </section>

      <section id="monitoring">
        <h2>Monitoring & Logging</h2>
        <p>
          Implement comprehensive monitoring and logging for production deployments.
        </p>

        <h3>Application Monitoring</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Performance Monitoring">
            <ul className="text-sm space-y-1">
              <li><strong>Vercel Analytics:</strong> Built-in performance metrics</li>
              <li><strong>Google Analytics:</strong> User behavior tracking</li>
              <li><strong>Sentry:</strong> Error tracking and monitoring</li>
              <li><strong>Uptime Robot:</strong> Service availability monitoring</li>
            </ul>
          </Card>
          
          <Card title="Infrastructure Monitoring">
            <ul className="text-sm space-y-1">
              <li><strong>Server Resources:</strong> CPU, memory, disk usage</li>
              <li><strong>Database Health:</strong> Redis connection and performance</li>
              <li><strong>Storage Usage:</strong> R2/S3 usage and costs</li>
              <li><strong>API Performance:</strong> Response times and error rates</li>
            </ul>
          </Card>
        </div>

        <h3>Logging Configuration</h3>
        <CodeBlock language="typescript" title="logger.ts">
{`import pino from 'pino';

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  } : undefined,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
});`}
        </CodeBlock>

        <h3>Health Checks</h3>
        <CodeBlock language="typescript" title="health-check.ts">
{`// app/api/health/route.ts
import { redis } from '@/lib/redis';

export async function GET() {
  try {
    // Check Redis connection
    await redis.ping();
    
    // Check storage connection
    // Add storage health check here
    
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        redis: 'up',
        storage: 'up'
      }
    });
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      error: error.message
    }, { status: 503 });
  }
}`}
        </CodeBlock>
      </section>

      <section id="maintenance">
        <h2>Maintenance & Updates</h2>
        <p>
          Regular maintenance and update procedures for production deployments.
        </p>

        <h3>Update Process</h3>
        <ol>
          <li><strong>Backup Data:</strong> Create backups of Redis and configuration</li>
          <li><strong>Test Updates:</strong> Deploy to staging environment first</li>
          <li><strong>Monitor Deployment:</strong> Watch for errors during rollout</li>
          <li><strong>Rollback Plan:</strong> Be prepared to rollback if issues occur</li>
        </ol>

        <h3>Backup Strategy</h3>
        <CodeBlock language="bash" title="Backup Script">
{`#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/megavault"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup Redis data
redis-cli --rdb $BACKUP_DIR/redis_backup_$DATE.rdb

# Compress backup
gzip $BACKUP_DIR/redis_backup_$DATE.rdb

# Clean old backups (keep 30 days)
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete

echo "Backup completed: $DATE"`}
        </CodeBlock>

        <h3>Performance Optimization</h3>
        <ul>
          <li><strong>CDN Configuration:</strong> Use CDN for static assets</li>
          <li><strong>Image Optimization:</strong> Optimize images with Next.js Image component</li>
          <li><strong>Bundle Analysis:</strong> Regularly analyze bundle size</li>
          <li><strong>Database Optimization:</strong> Monitor and optimize Redis usage</li>
        </ul>

        <Alert type="warning" title="Production Checklist">
          Before going live, verify:
          <ul className="mt-2">
            <li>All environment variables are set correctly</li>
            <li>SSL certificates are valid and auto-renewing</li>
            <li>Monitoring and alerting are configured</li>
            <li>Backup procedures are tested and automated</li>
            <li>Performance benchmarks meet requirements</li>
          </ul>
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/api" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">API Reference →</h4>
              <p className="text-blue-800 text-sm">Production API documentation</p>
            </Link>
            <Link href="/docs/admin" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">System Administration →</h4>
              <p className="text-green-800 text-sm">Manage production environments</p>
            </Link>
            <Link href="/docs/developer/testing" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Testing Guide →</h4>
              <p className="text-purple-800 text-sm">Test before deployment</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}