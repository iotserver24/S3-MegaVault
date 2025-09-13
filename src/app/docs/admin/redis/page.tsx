import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Redis Overview' },
  { id: 'installation', title: 'Installation' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'security', title: 'Security Setup' },
  { id: 'performance', title: 'Performance Tuning' },
  { id: 'monitoring', title: 'Monitoring' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
];

export default function RedisSetupPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Redis Setup</h1>
        <p className="text-xl text-slate-600">
          Complete guide to installing, configuring, and optimizing Redis for MegaVault 
          session storage, caching, and real-time features.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Redis Overview</h2>
        <p>
          Redis serves as MegaVault's primary database for session storage, caching, 
          and real-time features, providing high performance and reliability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Key Features" description="Redis capabilities for MegaVault">
            <ul className="text-sm space-y-1">
              <li>✅ Session storage</li>
              <li>✅ Application caching</li>
              <li>✅ Real-time features</li>
              <li>✅ Background jobs</li>
            </ul>
          </Card>
          
          <Card title="Performance" description="High-speed operations">
            <ul className="text-sm space-y-1">
              <li>✅ In-memory storage</li>
              <li>✅ Microsecond latency</li>
              <li>✅ High throughput</li>
              <li>✅ Connection pooling</li>
            </ul>
          </Card>

          <Card title="Reliability" description="Production-ready features">
            <ul className="text-sm space-y-1">
              <li>✅ Data persistence</li>
              <li>✅ High availability</li>
              <li>✅ Backup & recovery</li>
              <li>✅ Monitoring tools</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Redis Version">
          MegaVault requires Redis 6.0 or later for optimal performance and security features.
        </Alert>
      </section>

      <section id="installation">
        <h2>Installation</h2>
        <p>Install Redis on various platforms and environments.</p>

        <h3>Ubuntu/Debian</h3>
        <CodeBlock language="bash" title="Ubuntu Installation">
{`# Update package list
sudo apt update

# Install Redis
sudo apt install redis-server

# Start and enable Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Verify installation
redis-cli ping`}
        </CodeBlock>

        <h3>CentOS/RHEL</h3>
        <CodeBlock language="bash" title="CentOS Installation">
{`# Install EPEL repository
sudo yum install epel-release

# Install Redis
sudo yum install redis

# Start and enable Redis
sudo systemctl start redis
sudo systemctl enable redis`}
        </CodeBlock>

        <h3>Docker Installation</h3>
        <CodeBlock language="yaml" title="docker-compose.yml">
{`version: '3.8'
services:
  redis:
    image: redis:7-alpine
    container_name: megavault-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
      - ./redis.conf:/usr/local/etc/redis/redis.conf
    command: redis-server /usr/local/etc/redis/redis.conf
    environment:
      - REDIS_PASSWORD=\${REDIS_PASSWORD}

volumes:
  redis_data:`}
        </CodeBlock>

        <h3>Cloud Redis Services</h3>
        <ul>
          <li><strong>Redis Cloud:</strong> Managed Redis by Redis Labs</li>
          <li><strong>AWS ElastiCache:</strong> Amazon's managed Redis service</li>
          <li><strong>Azure Cache for Redis:</strong> Microsoft's Redis offering</li>
          <li><strong>Google Cloud Memorystore:</strong> Google's managed Redis</li>
        </ul>
      </section>

      <section id="configuration">
        <h2>Configuration</h2>
        <p>Configure Redis for optimal performance and security in production.</p>

        <h3>Basic Configuration</h3>
        <CodeBlock language="bash" title="redis.conf">
{`# Network and Security
bind 127.0.0.1
port 6379
protected-mode yes
requirepass your-secure-password

# Memory Management
maxmemory 2gb
maxmemory-policy allkeys-lru

# Persistence
save 900 1
save 300 10
save 60 10000
dir /var/lib/redis

# Logging
loglevel notice
logfile /var/log/redis/redis-server.log

# Performance
tcp-keepalive 300
timeout 0
databases 16`}
        </CodeBlock>

        <h3>MegaVault Environment Variables</h3>
        <CodeBlock language="bash" title="Redis Environment Configuration">
{`# Basic Redis Connection
REDIS_URL=redis://localhost:6379/0

# With Password
REDIS_URL=redis://:password@localhost:6379/0

# SSL/TLS Connection
REDIS_URL=rediss://username:password@host:6380/0

# Connection Pool Settings
REDIS_MAX_CONNECTIONS=10
REDIS_MAX_RETRIES=3
REDIS_RETRY_DELAY=1000
REDIS_CONNECT_TIMEOUT=10000`}
        </CodeBlock>

        <h3>Database Organization</h3>
        <ul>
          <li><strong>Database 0:</strong> User sessions</li>
          <li><strong>Database 1:</strong> Application cache</li>
          <li><strong>Database 2:</strong> Background jobs</li>
          <li><strong>Database 3:</strong> Real-time features</li>
        </ul>
      </section>

      <section id="security">
        <h2>Security Setup</h2>
        <p>Secure your Redis installation for production use.</p>

        <h3>Authentication</h3>
        <CodeBlock language="bash" title="Password Authentication">
{`# Set password in redis.conf
requirepass your-very-secure-password-here

# Or set via command line
redis-cli CONFIG SET requirepass "your-secure-password"

# Test authentication
redis-cli -a your-secure-password ping`}
        </CodeBlock>

        <h3>Network Security</h3>
        <ul>
          <li><strong>Bind Address:</strong> Only bind to localhost or private networks</li>
          <li><strong>Firewall:</strong> Restrict Redis port (6379) access</li>
          <li><strong>SSL/TLS:</strong> Use encrypted connections for remote access</li>
          <li><strong>VPN:</strong> Access Redis through VPN for additional security</li>
        </ul>

        <h3>Redis ACL (Access Control Lists)</h3>
        <CodeBlock language="bash" title="Redis ACL Configuration">
{`# Create user for MegaVault
ACL SETUSER megavault on >password ~* +@all

# Create read-only monitoring user
ACL SETUSER monitor on >monitor-password ~* +@read +info +ping

# Save ACL configuration
ACL SAVE`}
        </CodeBlock>
      </section>

      <section id="performance">
        <h2>Performance Tuning</h2>
        <p>Optimize Redis performance for MegaVault workloads.</p>

        <h3>Memory Optimization</h3>
        <CodeBlock language="bash" title="Memory Settings">
{`# Set maximum memory usage
maxmemory 4gb

# Memory eviction policy
maxmemory-policy allkeys-lru

# Disable swap usage
vm.swappiness = 1

# Transparent huge pages
echo never > /sys/kernel/mm/transparent_hugepage/enabled`}
        </CodeBlock>

        <h3>Connection Tuning</h3>
        <ul>
          <li><strong>Connection Pooling:</strong> Use connection pools in application</li>
          <li><strong>Keep-Alive:</strong> Enable TCP keep-alive</li>
          <li><strong>Timeout Settings:</strong> Configure appropriate timeouts</li>
          <li><strong>Max Clients:</strong> Set based on expected concurrent users</li>
        </ul>

        <h3>Persistence Tuning</h3>
        <CodeBlock language="bash" title="Persistence Configuration">
{`# RDB snapshots
save 900 1      # Save if at least 1 key changed in 900 seconds
save 300 10     # Save if at least 10 keys changed in 300 seconds
save 60 10000   # Save if at least 10000 keys changed in 60 seconds

# AOF (Append Only File) - for better durability
appendonly yes
appendfsync everysec
no-appendfsync-on-rewrite no`}
        </CodeBlock>
      </section>

      <section id="monitoring">
        <h2>Monitoring</h2>
        <p>Monitor Redis performance and health metrics.</p>

        <h3>Basic Monitoring Commands</h3>
        <CodeBlock language="bash" title="Redis Monitoring">
{`# Check Redis status
redis-cli ping

# Get server information
redis-cli info

# Monitor real-time commands
redis-cli monitor

# Check memory usage
redis-cli info memory

# Check connected clients
redis-cli info clients

# Check key statistics
redis-cli info keyspace`}
        </CodeBlock>

        <h3>Key Metrics to Monitor</h3>
        <ul>
          <li><strong>Memory Usage:</strong> used_memory, maxmemory</li>
          <li><strong>Operations:</strong> instantaneous_ops_per_sec</li>
          <li><strong>Connections:</strong> connected_clients, blocked_clients</li>
          <li><strong>Persistence:</strong> last_save_time, changes_since_last_save</li>
          <li><strong>Replication:</strong> master_repl_offset, slave_lag</li>
        </ul>

        <h3>Health Check Script</h3>
        <CodeBlock language="bash" title="Redis Health Check">
{`#!/bin/bash
# redis-health-check.sh

REDIS_CLI="redis-cli -a $REDIS_PASSWORD"

echo "=== Redis Health Check ==="

# Test connectivity
if $REDIS_CLI ping | grep -q PONG; then
    echo "✓ Redis is responding"
else
    echo "✗ Redis connection failed"
    exit 1
fi

# Check memory usage
MEMORY_USED=$($REDIS_CLI info memory | grep used_memory_human | cut -d: -f2)
echo "Memory used: $MEMORY_USED"

# Check connected clients
CLIENTS=$($REDIS_CLI info clients | grep connected_clients | cut -d: -f2)
echo "Connected clients: $CLIENTS"

echo "Health check completed"`}
        </CodeBlock>
      </section>

      <section id="troubleshooting">
        <h2>Troubleshooting</h2>
        <p>Common Redis issues and their solutions.</p>

        <h3>Common Issues</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Connection Refused">
            <p className="text-sm text-slate-600 mb-2"><strong>Error:</strong> Could not connect to Redis</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solutions:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Check if Redis service is running</li>
              <li>Verify port and bind address</li>
              <li>Check firewall settings</li>
              <li>Validate password authentication</li>
            </ul>
          </Card>
          
          <Card title="High Memory Usage">
            <p className="text-sm text-slate-600 mb-2"><strong>Issue:</strong> Redis consuming too much memory</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solutions:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Set maxmemory limit</li>
              <li>Configure eviction policy</li>
              <li>Clean up expired keys</li>
              <li>Monitor key patterns</li>
            </ul>
          </Card>
        </div>

        <Alert type="warning" title="Production Checklist">
          Before deploying Redis to production: enable authentication, configure persistence, 
          set up monitoring, implement backups, and secure network access.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Administration Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/admin/environment" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Environment Variables →</h4>
              <p className="text-blue-800 text-sm">Redis connection configuration</p>
            </Link>
            <Link href="/docs/admin/monitoring" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">Monitoring →</h4>
              <p className="text-green-800 text-sm">Redis monitoring and alerting</p>
            </Link>
            <Link href="/docs/admin/backup" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Backup & Recovery →</h4>
              <p className="text-purple-800 text-sm">Redis data backup strategies</p>
            </Link>
            <Link href="/docs/admin" className="block p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
              <h4 className="font-semibold text-orange-900 mb-2">← Back to Admin Overview</h4>
              <p className="text-orange-800 text-sm">System administration overview</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}