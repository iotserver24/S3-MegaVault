import { Alert, TableOfContents, Card, CodeBlock } from '../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Administration Overview' },
  { id: 'deployment-checklist', title: 'Deployment Checklist' },
  { id: 'system-requirements', title: 'System Requirements' },
  { id: 'configuration', title: 'Configuration Management' },
  { id: 'security', title: 'Security Considerations' },
  { id: 'maintenance', title: 'Maintenance Tasks' },
  { id: 'troubleshooting', title: 'Common Issues' },
];

export default function SystemAdministrationPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">System Administration</h1>
        <p className="text-xl text-slate-600">
          Comprehensive guide for system administrators managing MegaVault deployments, 
          including configuration, monitoring, security, and maintenance procedures.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Administration Overview</h2>
        <p>
          System administration for MegaVault involves managing the application infrastructure, 
          configuring services, monitoring performance, and ensuring security and reliability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Infrastructure Management" description="Core system operations">
            <ul className="text-sm space-y-1">
              <li>✅ Server provisioning</li>
              <li>✅ Service configuration</li>
              <li>✅ Database management</li>
              <li>✅ Storage administration</li>
            </ul>
          </Card>
          
          <Card title="Monitoring & Logging" description="System observability">
            <ul className="text-sm space-y-1">
              <li>✅ Performance monitoring</li>
              <li>✅ Error tracking</li>
              <li>✅ Resource utilization</li>
              <li>✅ Security auditing</li>
            </ul>
          </Card>

          <Card title="Maintenance & Support" description="Ongoing operations">
            <ul className="text-sm space-y-1">
              <li>✅ Regular backups</li>
              <li>✅ Updates and patches</li>
              <li>✅ Performance tuning</li>
              <li>✅ Incident response</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Administrator Responsibilities">
          System administrators are responsible for maintaining uptime, security, performance, 
          and data integrity of MegaVault installations.
        </Alert>
      </section>

      <section id="deployment-checklist">
        <h2>Deployment Checklist</h2>
        <p>
          Essential checklist for deploying MegaVault to production environments.
        </p>

        <h3>Pre-Deployment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Infrastructure Preparation">
            <ul className="text-sm space-y-1">
              <li>☐ Server resources allocated</li>
              <li>☐ Domain name configured</li>
              <li>☐ SSL certificates obtained</li>
              <li>☐ DNS records configured</li>
              <li>☐ Firewall rules established</li>
              <li>☐ Load balancer configured</li>
            </ul>
          </Card>
          
          <Card title="Service Dependencies">
            <ul className="text-sm space-y-1">
              <li>☐ Redis database provisioned</li>
              <li>☐ S3-compatible storage configured</li>
              <li>☐ Email service setup</li>
              <li>☐ CDN configuration</li>
              <li>☐ Monitoring tools installed</li>
              <li>☐ Backup systems configured</li>
            </ul>
          </Card>
        </div>

        <h3>Deployment Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Application Deployment">
            <ul className="text-sm space-y-1">
              <li>☐ Environment variables configured</li>
              <li>☐ Application built and deployed</li>
              <li>☐ Health checks passing</li>
              <li>☐ Database migrations completed</li>
              <li>☐ Static assets uploaded to CDN</li>
              <li>☐ Caching layers configured</li>
            </ul>
          </Card>
          
          <Card title="Post-Deployment">
            <ul className="text-sm space-y-1">
              <li>☐ Smoke tests executed</li>
              <li>☐ Performance benchmarks met</li>
              <li>☐ Security scans completed</li>
              <li>☐ Monitoring alerts configured</li>
              <li>☐ Backup procedures tested</li>
              <li>☐ Documentation updated</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="system-requirements">
        <h2>System Requirements</h2>
        <p>
          Hardware and software requirements for different deployment scenarios.
        </p>

        <h3>Minimum Requirements</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Component</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Small (&lt; 100 users)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Medium (100-1000 users)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Large (1000+ users)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">CPU</td>
                <td className="px-6 py-4 text-sm text-slate-600">2 vCPUs</td>
                <td className="px-6 py-4 text-sm text-slate-600">4 vCPUs</td>
                <td className="px-6 py-4 text-sm text-slate-600">8+ vCPUs</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">RAM</td>
                <td className="px-6 py-4 text-sm text-slate-600">4 GB</td>
                <td className="px-6 py-4 text-sm text-slate-600">8 GB</td>
                <td className="px-6 py-4 text-sm text-slate-600">16+ GB</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Storage</td>
                <td className="px-6 py-4 text-sm text-slate-600">20 GB SSD</td>
                <td className="px-6 py-4 text-sm text-slate-600">50 GB SSD</td>
                <td className="px-6 py-4 text-sm text-slate-600">100+ GB SSD</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Network</td>
                <td className="px-6 py-4 text-sm text-slate-600">100 Mbps</td>
                <td className="px-6 py-4 text-sm text-slate-600">1 Gbps</td>
                <td className="px-6 py-4 text-sm text-slate-600">10+ Gbps</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Software Dependencies</h3>
        <ul>
          <li><strong>Node.js:</strong> Version 18.x or 20.x LTS</li>
          <li><strong>Redis:</strong> Version 6.x or 7.x</li>
          <li><strong>Operating System:</strong> Ubuntu 20.04+, CentOS 8+, or equivalent</li>
          <li><strong>Docker:</strong> Version 20.10+ (for containerized deployments)</li>
          <li><strong>Nginx:</strong> Version 1.18+ (as reverse proxy)</li>
        </ul>
      </section>

      <section id="configuration">
        <h2>Configuration Management</h2>
        <p>
          Best practices for managing configuration across different environments.
        </p>

        <h3>Environment Variables</h3>
        <CodeBlock language="bash" title="Production Environment Configuration">
{`# Application Configuration
NODE_ENV=production
PORT=3000
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-super-secure-secret-key

# Database Configuration
REDIS_URL=rediss://username:password@host:port/0
REDIS_MAX_RETRIES=3
REDIS_RETRY_DELAY=1000

# Storage Configuration
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=megavault-production
R2_ENDPOINT=https://your-account.r2.cloudflarestorage.com

# Security Configuration
CORS_ORIGIN=https://your-domain.com
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100

# Monitoring Configuration
SENTRY_DSN=https://your-sentry-dsn
LOG_LEVEL=info
METRICS_ENABLED=true`}
        </CodeBlock>

        <h3>Configuration Files</h3>
        <CodeBlock language="json" title="config/production.json">
{`{
  "app": {
    "name": "MegaVault",
    "version": "1.0.0",
    "environment": "production"
  },
  "server": {
    "port": 3000,
    "host": "0.0.0.0",
    "timeout": 30000
  },
  "storage": {
    "provider": "r2",
    "maxFileSize": 104857600,
    "allowedTypes": ["image/*", "application/pdf", "text/*"],
    "thumbnailSizes": [150, 300, 600]
  },
  "security": {
    "helmet": {
      "contentSecurityPolicy": {
        "directives": {
          "defaultSrc": ["'self'"],
          "styleSrc": ["'self'", "'unsafe-inline'"],
          "scriptSrc": ["'self'"],
          "imgSrc": ["'self'", "data:", "https:"]
        }
      }
    },
    "cors": {
      "origin": ["https://your-domain.com"],
      "credentials": true
    }
  }
}`}
        </CodeBlock>
      </section>

      <section id="security">
        <h2>Security Considerations</h2>
        <p>
          Critical security measures for production MegaVault deployments.
        </p>

        <h3>Security Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Network Security">
            <ul className="text-sm space-y-1">
              <li>☐ HTTPS enforced (SSL/TLS)</li>
              <li>☐ Firewall configured</li>
              <li>☐ VPN access for admin</li>
              <li>☐ DDoS protection enabled</li>
              <li>☐ Port access restricted</li>
              <li>☐ IP whitelisting implemented</li>
            </ul>
          </Card>
          
          <Card title="Application Security">
            <ul className="text-sm space-y-1">
              <li>☐ Environment variables secured</li>
              <li>☐ Database credentials rotated</li>
              <li>☐ API keys managed securely</li>
              <li>☐ Rate limiting configured</li>
              <li>☐ Input validation enabled</li>
              <li>☐ Security headers configured</li>
            </ul>
          </Card>
        </div>

        <h3>Security Headers</h3>
        <CodeBlock language="nginx" title="Nginx Security Configuration">
{`server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';" always;

    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}`}
        </CodeBlock>
      </section>

      <section id="maintenance">
        <h2>Maintenance Tasks</h2>
        <p>
          Regular maintenance procedures to ensure optimal performance and reliability.
        </p>

        <h3>Daily Tasks</h3>
        <ul>
          <li><strong>Health Checks:</strong> Verify all services are running and responsive</li>
          <li><strong>Log Review:</strong> Check error logs for issues or anomalies</li>
          <li><strong>Resource Monitoring:</strong> Monitor CPU, memory, and disk usage</li>
          <li><strong>Backup Verification:</strong> Ensure automated backups completed successfully</li>
        </ul>

        <h3>Weekly Tasks</h3>
        <ul>
          <li><strong>Performance Review:</strong> Analyze response times and error rates</li>
          <li><strong>Security Scans:</strong> Run vulnerability scans and security audits</li>
          <li><strong>Database Maintenance:</strong> Check database performance and optimization</li>
          <li><strong>Log Rotation:</strong> Archive old logs and clean up disk space</li>
        </ul>

        <h3>Monthly Tasks</h3>
        <ul>
          <li><strong>Software Updates:</strong> Apply security patches and updates</li>
          <li><strong>Capacity Planning:</strong> Review resource usage trends</li>
          <li><strong>Disaster Recovery:</strong> Test backup and recovery procedures</li>
          <li><strong>Performance Tuning:</strong> Optimize configurations based on usage patterns</li>
        </ul>

        <h3>Maintenance Scripts</h3>
        <CodeBlock language="bash" title="Daily Health Check Script">
{`#!/bin/bash
# daily-health-check.sh

LOG_FILE="/var/log/megavault/health-check.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$DATE] Starting daily health check" >> $LOG_FILE

# Check application status
if curl -f -s http://localhost:3000/api/health > /dev/null; then
    echo "[$DATE] ✓ Application is healthy" >> $LOG_FILE
else
    echo "[$DATE] ✗ Application health check failed" >> $LOG_FILE
    # Send alert
    curl -X POST https://hooks.slack.com/your-webhook \
        -H 'Content-type: application/json' \
        --data '{"text":"MegaVault health check failed"}'
fi

# Check Redis connectivity
if redis-cli ping | grep -q PONG; then
    echo "[$DATE] ✓ Redis is responding" >> $LOG_FILE
else
    echo "[$DATE] ✗ Redis connection failed" >> $LOG_FILE
fi

# Check disk usage
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 80 ]; then
    echo "[$DATE] ⚠ Disk usage high: $DISK_USAGE%" >> $LOG_FILE
else
    echo "[$DATE] ✓ Disk usage normal: $DISK_USAGE%" >> $LOG_FILE
fi

echo "[$DATE] Health check completed" >> $LOG_FILE`}
        </CodeBlock>
      </section>

      <section id="troubleshooting">
        <h2>Common Issues</h2>
        <p>
          Solutions to frequently encountered problems in MegaVault deployments.
        </p>

        <h3>Performance Issues</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Slow Response Times">
            <p className="text-sm text-slate-600 mb-2"><strong>Symptoms:</strong> API responses taking > 5 seconds</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solutions:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Check database query performance</li>
              <li>Review Redis connection pooling</li>
              <li>Optimize file storage operations</li>
              <li>Enable response caching</li>
            </ul>
          </Card>
          
          <Card title="High Memory Usage">
            <p className="text-sm text-slate-600 mb-2"><strong>Symptoms:</strong> Memory usage > 80%</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solutions:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Check for memory leaks in logs</li>
              <li>Restart application services</li>
              <li>Increase server memory</li>
              <li>Optimize caching strategies</li>
            </ul>
          </Card>
        </div>

        <h3>Service Failures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Redis Connection Issues">
            <p className="text-sm text-slate-600 mb-2"><strong>Error:</strong> Connection timeout or refused</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solutions:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Verify Redis service is running</li>
              <li>Check network connectivity</li>
              <li>Validate connection string</li>
              <li>Review firewall rules</li>
            </ul>
          </Card>
          
          <Card title="File Upload Failures">
            <p className="text-sm text-slate-600 mb-2"><strong>Error:</strong> Upload requests failing</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solutions:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Check storage service credentials</li>
              <li>Verify bucket permissions</li>
              <li>Review CORS configuration</li>
              <li>Check file size limits</li>
            </ul>
          </Card>
        </div>

        <Alert type="warning" title="Emergency Procedures">
          For critical issues affecting service availability, follow the incident response 
          procedures documented in your organization's runbook.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Administration Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/admin/environment" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Environment Variables →</h4>
              <p className="text-blue-800 text-sm">Complete environment configuration guide</p>
            </Link>
            <Link href="/docs/admin/storage" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">Storage Configuration →</h4>
              <p className="text-green-800 text-sm">S3/R2 storage setup and management</p>
            </Link>
            <Link href="/docs/admin/redis" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Redis Setup →</h4>
              <p className="text-purple-800 text-sm">Redis configuration and optimization</p>
            </Link>
            <Link href="/docs/admin/monitoring" className="block p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
              <h4 className="font-semibold text-orange-900 mb-2">Monitoring →</h4>
              <p className="text-orange-800 text-sm">System monitoring and alerting</p>
            </Link>
            <Link href="/docs/admin/backup" className="block p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
              <h4 className="font-semibold text-red-900 mb-2">Backup & Recovery →</h4>
              <p className="text-red-800 text-sm">Data backup and disaster recovery</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}