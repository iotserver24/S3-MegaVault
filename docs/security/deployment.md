# Deployment Security

This document provides comprehensive security guidelines for deploying MegaVault Open Source in production environments.

## Pre-Deployment Security Checklist

### Environment Configuration
- [ ] All environment variables configured with strong, unique values
- [ ] No default or example values present in configuration
- [ ] NEXTAUTH_SECRET is 64+ characters and cryptographically random
- [ ] USER_PASSWORD is 20+ characters with high entropy
- [ ] NEXTAUTH_URL configured with HTTPS domain

### Service Security
- [ ] Redis instance secured and access-controlled
- [ ] S3-compatible storage bucket properly configured
- [ ] Network firewall rules configured
- [ ] HTTPS/TLS certificates installed and valid
- [ ] DNS properly configured with security headers

### System Security
- [ ] Operating system updates applied
- [ ] Docker images use latest security patches
- [ ] File system permissions properly configured
- [ ] Log rotation and monitoring configured

## Production Environment Setup

### 1. HTTPS/TLS Configuration

**Required for Production**
```nginx
# Nginx SSL Configuration Example
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 2. Redis Security

**Secure Redis Configuration**
```bash
# redis.conf security settings
bind 127.0.0.1  # Bind to localhost only
requirepass your-strong-redis-password
protected-mode yes
port 6379

# Disable dangerous commands
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command DEBUG ""
rename-command CONFIG "CONFIG_abc123"
```

**Upstash Redis (Recommended)**
- Use managed Redis service (Upstash)
- Automatic SSL/TLS encryption
- Built-in access control
- No manual security configuration required

### 3. Storage Security

**Cloudflare R2 Configuration**
```bash
# R2 Bucket Security Settings
- Private bucket (not public)
- CORS configuration for your domain only
- Access keys with minimal required permissions
- Regular key rotation schedule
```

**S3 Bucket Policy Example**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "MegaVaultAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT:user/megavault-user"
      },
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    }
  ]
}
```

### 4. Network Security

**Firewall Configuration**
```bash
# Example UFW rules
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# Internal services should not be exposed
# Redis port 6379 should NOT be open to internet
# Only allow localhost connections to Redis
```

**Docker Network Security**
```yaml
# docker-compose.yml
networks:
  internal:
    driver: bridge
    internal: true  # No external access
  
services:
  app:
    networks:
      - default  # External access for web traffic
      - internal  # Internal service communication
  
  redis:
    networks:
      - internal  # Internal only, no external access
```

## Docker Production Deployment

### Secure Docker Configuration

**Production docker-compose.yml**
```yaml
version: '3.8'

services:
  megavault:
    image: megavault:latest
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    ports:
      - "127.0.0.1:3001:3001"  # Bind to localhost only
    volumes:
      - app_data:/app/data
    networks:
      - internal
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
      - /app/.next/cache

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/ssl/certs:ro
    depends_on:
      - megavault
    networks:
      - default
      - internal

volumes:
  app_data:

networks:
  internal:
    driver: bridge
    internal: true
```

### Container Security

**Dockerfile Security Best Practices**
```dockerfile
# Use specific version tags, not 'latest'
FROM node:18-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy files with proper permissions
COPY --chown=nextjs:nodejs . .

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1
```

## Environment Variable Security

### Secure Environment Management

**Production Environment Variables**
```bash
# .env.production (never commit to version control)
NODE_ENV=production
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=<64-character-cryptographically-secure-string>

# Single-user credentials
USER_EMAIL=admin@yourdomain.com
USER_PASSWORD=<strong-password-minimum-20-characters>

# Database (use secure connection strings)
UPSTASH_REDIS_REST_URL=https://secure-redis-endpoint.upstash.io
UPSTASH_REDIS_REST_TOKEN=<secure-token>

# Storage (rotate keys regularly)
CLOUDFLARE_R2_ENDPOINT=https://your-account.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=<access-key>
CLOUDFLARE_R2_SECRET_ACCESS_KEY=<secret-key>
CLOUDFLARE_R2_BUCKET_NAME=megavault-storage

# Security settings
ENABLE_PUBLIC_REGISTRATION=false
ENABLE_FILE_SHARING=true
```

### Secret Management Best Practices

1. **Never commit secrets to version control**
2. **Use environment variable injection in production**
3. **Implement secret rotation procedures**
4. **Use secure secret storage systems**
5. **Audit secret access regularly**

## Monitoring and Alerting

### Security Monitoring Setup

**Application Monitoring**
```javascript
// monitoring.js
const monitor = {
  // Track authentication failures
  authFailures: new Counter({
    name: 'auth_failures_total',
    help: 'Total number of authentication failures'
  }),
  
  // Track file access patterns
  fileAccess: new Counter({
    name: 'file_access_total',
    help: 'Total number of file access attempts',
    labelNames: ['method', 'status']
  }),
  
  // Track error rates
  errors: new Counter({
    name: 'errors_total',
    help: 'Total number of application errors',
    labelNames: ['type', 'severity']
  })
};
```

**Log Aggregation**
```yaml
# docker-compose.logging.yml
services:
  megavault:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        labels: "service=megavault"
        
  # Add log aggregation service
  logstash:
    image: logstash:7.x
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
```

### Security Alerting Rules

**Critical Alerts**
- Multiple authentication failures (>5 in 5 minutes)
- Unusual file access patterns
- Application errors above threshold
- Service availability issues
- SSL certificate expiration warnings

**Warning Alerts**
- High resource usage
- Slow response times
- Configuration changes
- Unusual network traffic patterns

## Backup and Recovery

### Secure Backup Strategy

**Data to Backup**
1. **User Files**: All files stored in S3-compatible storage
2. **Metadata**: Redis database containing file metadata
3. **Configuration**: Environment variables (securely stored)
4. **Application**: Application code and dependencies

**Backup Procedures**
```bash
#!/bin/bash
# backup.sh - Secure backup script

# Backup Redis data
redis-cli --rdb /backup/redis-$(date +%Y%m%d).rdb

# Sync storage files (if using local storage)
aws s3 sync s3://megavault-storage /backup/files-$(date +%Y%m%d)/

# Encrypt backup
gpg --cipher-algo AES256 --compress-algo 2 --cert-digest-algo SHA512 \
    --symmetric --output /backup/encrypted-$(date +%Y%m%d).gpg \
    /backup/redis-$(date +%Y%m%d).rdb

# Clean up old backups (keep 30 days)
find /backup -name "*.gpg" -mtime +30 -delete
```

### Disaster Recovery

**Recovery Procedures**
1. **Environment Setup**: Restore secure environment configuration
2. **Service Restoration**: Deploy application with backed-up configuration
3. **Data Recovery**: Restore Redis data and file storage
4. **Verification**: Test all functionality and security measures
5. **Security Audit**: Verify no compromise occurred during recovery

## Security Maintenance

### Regular Security Tasks

**Weekly**
- [ ] Review authentication logs
- [ ] Check for security updates
- [ ] Verify SSL certificate status
- [ ] Monitor resource usage patterns

**Monthly**
- [ ] Rotate access keys and secrets
- [ ] Update system packages
- [ ] Review firewall rules
- [ ] Test backup and recovery procedures

**Quarterly**
- [ ] Comprehensive security audit
- [ ] Penetration testing (if applicable)
- [ ] Review and update security documentation
- [ ] Update incident response procedures

### Security Update Procedures

**Dependency Updates**
```bash
# Check for security vulnerabilities
npm audit

# Update packages with security fixes
npm audit fix

# Review changelog for breaking changes
# Test in staging environment first
# Deploy to production with rollback plan
```

**System Updates**
```bash
# Ubuntu/Debian
apt update && apt upgrade
apt autoremove

# CentOS/RHEL
yum update

# Alpine (Docker)
apk update && apk upgrade
```

## Incident Response

### Security Incident Procedures

**Immediate Response (0-15 minutes)**
1. Identify and contain the threat
2. Preserve evidence and logs
3. Assess scope and impact
4. Notify relevant stakeholders

**Short-term Response (15 minutes - 4 hours)**
1. Isolate affected systems
2. Change compromised credentials
3. Apply security patches if applicable
4. Document all actions taken

**Long-term Response (4 hours+)**
1. Conduct thorough investigation
2. Implement additional security measures
3. Update security procedures
4. Prepare incident report

### Communication Plan

**Internal Communication**
- Incident commander designation
- Status update schedule
- Decision-making authority
- Documentation requirements

**External Communication**
- User notification procedures
- Regulatory reporting (if applicable)
- Public disclosure timeline
- Media response plan

## Compliance and Auditing

### Security Audit Checklist

**Infrastructure Security**
- [ ] HTTPS properly configured
- [ ] Firewall rules restrictive and appropriate
- [ ] Services running with minimal privileges
- [ ] Regular security updates applied
- [ ] Monitoring and alerting configured

**Application Security**
- [ ] Environment variables properly secured
- [ ] Authentication system functioning correctly
- [ ] File access controls working
- [ ] Error handling doesn't expose sensitive information
- [ ] Security headers properly configured

**Data Security**
- [ ] Data encrypted in transit (HTTPS)
- [ ] Storage access properly controlled
- [ ] Backup procedures tested and secure
- [ ] Data retention policies implemented
- [ ] Access logging enabled and monitored

### Documentation Requirements

Maintain documentation for:
- Security configuration changes
- Incident response procedures
- Access control policies
- Backup and recovery procedures
- Security training and awareness

---

**Production Deployment Reminder**: Security is not optional in production. Follow all guidelines and regularly review and update your security posture.