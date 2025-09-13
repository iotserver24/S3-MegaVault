import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Monitoring Overview' },
  { id: 'health-checks', title: 'Health Checks' },
  { id: 'metrics', title: 'Metrics Collection' },
  { id: 'logging', title: 'Logging Strategy' },
  { id: 'alerting', title: 'Alerting Setup' },
  { id: 'dashboards', title: 'Monitoring Dashboards' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
];

export default function MonitoringPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Monitoring</h1>
        <p className="text-xl text-slate-600">
          Comprehensive monitoring setup for MegaVault including health checks, metrics collection, 
          logging, and alerting to ensure system reliability and performance.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Monitoring Overview</h2>
        <p>
          Effective monitoring is crucial for maintaining MegaVault's reliability, performance, 
          and user experience in production environments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="System Health" description="Infrastructure monitoring">
            <ul className="text-sm space-y-1">
              <li>✅ Server resources</li>
              <li>✅ Application uptime</li>
              <li>✅ Database performance</li>
              <li>✅ Storage systems</li>
            </ul>
          </Card>
          
          <Card title="Application Metrics" description="Business monitoring">
            <ul className="text-sm space-y-1">
              <li>✅ User activity</li>
              <li>✅ File operations</li>
              <li>✅ API performance</li>
              <li>✅ Error rates</li>
            </ul>
          </Card>

          <Card title="Alerting" description="Proactive notifications">
            <ul className="text-sm space-y-1">
              <li>✅ Real-time alerts</li>
              <li>✅ Escalation policies</li>
              <li>✅ Multiple channels</li>
              <li>✅ On-call management</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Monitoring Stack">
          MegaVault supports multiple monitoring solutions including Prometheus, Grafana, Sentry, 
          and cloud-native monitoring services.
        </Alert>
      </section>

      <section id="health-checks">
        <h2>Health Checks</h2>
        <p>Implement comprehensive health checks to monitor system components.</p>

        <h3>Application Health Endpoint</h3>
        <CodeBlock language="typescript" title="Health Check API">
{`// /api/health/route.ts
export async function GET() {
  const checks = await Promise.allSettled([
    checkDatabase(),
    checkStorage(),
    checkRedis(),
    checkExternalServices()
  ]);

  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      database: checks[0].status === 'fulfilled' ? 'healthy' : 'unhealthy',
      storage: checks[1].status === 'fulfilled' ? 'healthy' : 'unhealthy',
      redis: checks[2].status === 'fulfilled' ? 'healthy' : 'unhealthy',
      external: checks[3].status === 'fulfilled' ? 'healthy' : 'unhealthy'
    },
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.APP_VERSION
  };

  const isHealthy = Object.values(health.checks).every(status => status === 'healthy');
  
  return Response.json(health, { 
    status: isHealthy ? 200 : 503 
  });
}`}
        </CodeBlock>

        <h3>External Monitoring</h3>
        <CodeBlock language="bash" title="Health Check Script">
{`#!/bin/bash
# external-health-check.sh

ENDPOINT="https://your-domain.com/api/health"
SLACK_WEBHOOK="https://hooks.slack.com/your-webhook"

# Perform health check
if curl -f -s "$ENDPOINT" > /dev/null; then
    echo "✓ Health check passed"
    exit 0
else
    echo "✗ Health check failed"
    
    # Send alert to Slack
    curl -X POST "$SLACK_WEBHOOK" \\
        -H 'Content-type: application/json' \\
        --data '{"text":"🚨 MegaVault health check failed"}'
    
    exit 1
fi`}
        </CodeBlock>

        <h3>Docker Health Checks</h3>
        <CodeBlock language="dockerfile" title="Dockerfile Health Check">
{`# Add to Dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1`}
        </CodeBlock>
      </section>

      <section id="metrics">
        <h2>Metrics Collection</h2>
        <p>Collect and analyze key performance metrics for system optimization.</p>

        <h3>Application Metrics</h3>
        <CodeBlock language="typescript" title="Metrics Collection">
{`// metrics.ts
import { Counter, Histogram, Gauge } from 'prom-client';

export const metrics = {
  httpRequests: new Counter({
    name: 'http_requests_total',
    help: 'Total HTTP requests',
    labelNames: ['method', 'route', 'status']
  }),
  
  requestDuration: new Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration',
    labelNames: ['method', 'route'],
    buckets: [0.1, 0.5, 1, 2, 5]
  }),
  
  activeUsers: new Gauge({
    name: 'active_users_total',
    help: 'Number of active users'
  }),
  
  fileUploads: new Counter({
    name: 'file_uploads_total',
    help: 'Total file uploads',
    labelNames: ['status', 'file_type']
  }),
  
  storageUsed: new Gauge({
    name: 'storage_used_bytes',
    help: 'Storage space used in bytes'
  })
};`}
        </CodeBlock>

        <h3>System Metrics</h3>
        <ul>
          <li><strong>CPU Usage:</strong> Track CPU utilization and load averages</li>
          <li><strong>Memory Usage:</strong> Monitor RAM usage and garbage collection</li>
          <li><strong>Disk I/O:</strong> Track disk read/write operations and space usage</li>
          <li><strong>Network:</strong> Monitor network throughput and connection counts</li>
        </ul>

        <h3>Redis Metrics</h3>
        <CodeBlock language="bash" title="Redis Metrics Collection">
{`# Redis metrics to monitor
redis-cli info stats | grep -E "(instantaneous_ops_per_sec|used_memory|connected_clients|total_commands_processed)"

# Example output:
# instantaneous_ops_per_sec:125
# used_memory:2048576
# connected_clients:10
# total_commands_processed:1000000`}
        </CodeBlock>
      </section>

      <section id="logging">
        <h2>Logging Strategy</h2>
        <p>Implement structured logging for effective debugging and monitoring.</p>

        <h3>Logging Configuration</h3>
        <CodeBlock language="typescript" title="Logger Setup">
{`// logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'megavault',
    version: process.env.APP_VERSION
  },
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;`}
        </CodeBlock>

        <h3>Log Levels and Categories</h3>
        <ul>
          <li><strong>Error:</strong> Application errors, exceptions, failures</li>
          <li><strong>Warn:</strong> Unusual conditions, deprecated features</li>
          <li><strong>Info:</strong> General application flow, major events</li>
          <li><strong>Debug:</strong> Detailed debugging information</li>
        </ul>

        <h3>Log Aggregation</h3>
        <CodeBlock language="yaml" title="Log Shipping with Filebeat">
{`# filebeat.yml
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/megavault/*.log
  fields:
    service: megavault
    environment: production

output.elasticsearch:
  hosts: ["elasticsearch:9200"]
  index: "megavault-%{+yyyy.MM.dd}"

logging.level: info`}
        </CodeBlock>
      </section>

      <section id="alerting">
        <h2>Alerting Setup</h2>
        <p>Configure alerts for critical issues and performance degradation.</p>

        <h3>Alert Rules</h3>
        <CodeBlock language="yaml" title="Prometheus Alert Rules">
{`groups:
- name: megavault-alerts
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
    for: 2m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      
  - alert: HighResponseTime
    expr: histogram_quantile(0.95, http_request_duration_seconds) > 2
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High response time detected"
      
  - alert: RedisDown
    expr: up{job="redis"} == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: "Redis is down"`}
        </CodeBlock>

        <h3>Notification Channels</h3>
        <ul>
          <li><strong>Slack:</strong> Team notifications and collaboration</li>
          <li><strong>Email:</strong> Critical alerts and summaries</li>
          <li><strong>PagerDuty:</strong> On-call escalation management</li>
          <li><strong>SMS:</strong> Emergency notifications</li>
        </ul>

        <h3>Alert Manager Configuration</h3>
        <CodeBlock language="yaml" title="AlertManager Config">
{`global:
  slack_api_url: 'https://hooks.slack.com/your-webhook'

route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'web.hook'

receivers:
- name: 'web.hook'
  slack_configs:
  - channel: '#alerts'
    title: 'MegaVault Alert'
    text: '{{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'`}
        </CodeBlock>
      </section>

      <section id="dashboards">
        <h2>Monitoring Dashboards</h2>
        <p>Create comprehensive dashboards for system visibility.</p>

        <h3>Key Dashboard Panels</h3>
        <ul>
          <li><strong>System Overview:</strong> CPU, memory, disk, network</li>
          <li><strong>Application Metrics:</strong> Response times, error rates, throughput</li>
          <li><strong>User Activity:</strong> Active users, file uploads, API usage</li>
          <li><strong>Storage Metrics:</strong> Storage usage, file counts, transfer rates</li>
          <li><strong>Database Performance:</strong> Redis metrics, connection pools</li>
        </ul>

        <h3>Grafana Dashboard JSON</h3>
        <CodeBlock language="json" title="Sample Dashboard Panel">
{`{
  "dashboard": {
    "title": "MegaVault Monitoring",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "Requests/sec"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "singlestat",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m])",
            "legendFormat": "Error Rate"
          }
        ]
      }
    ]
  }
}`}
        </CodeBlock>

        <h3>Custom Metrics Dashboard</h3>
        <ul>
          <li><strong>File Operations:</strong> Upload/download rates and success rates</li>
          <li><strong>User Engagement:</strong> Daily/monthly active users</li>
          <li><strong>Storage Growth:</strong> Storage usage trends and forecasting</li>
          <li><strong>Performance:</strong> API response times and database query performance</li>
        </ul>
      </section>

      <section id="troubleshooting">
        <h2>Troubleshooting</h2>
        <p>Common monitoring issues and debugging strategies.</p>

        <h3>Common Issues</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Missing Metrics">
            <p className="text-sm text-slate-600 mb-2"><strong>Issue:</strong> Metrics not appearing in dashboards</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solutions:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Check metrics endpoint accessibility</li>
              <li>Verify Prometheus scrape configuration</li>
              <li>Validate metric names and labels</li>
              <li>Check network connectivity</li>
            </ul>
          </Card>
          
          <Card title="Alert Fatigue">
            <p className="text-sm text-slate-600 mb-2"><strong>Issue:</strong> Too many false positive alerts</p>
            <p className="text-sm text-slate-600 mb-2"><strong>Solutions:</strong></p>
            <ul className="text-xs space-y-1">
              <li>Adjust alert thresholds</li>
              <li>Implement alert grouping</li>
              <li>Add meaningful context</li>
              <li>Review alert rules regularly</li>
            </ul>
          </Card>
        </div>

        <h3>Debugging Commands</h3>
        <CodeBlock language="bash" title="Monitoring Debug Commands">
{`# Check Prometheus targets
curl http://localhost:9090/api/v1/targets

# Query specific metric
curl "http://localhost:9090/api/v1/query?query=up"

# Check AlertManager status
curl http://localhost:9093/api/v1/status

# Test health endpoint
curl -v https://your-domain.com/api/health

# Check log files
tail -f /var/log/megavault/error.log`}
        </CodeBlock>

        <Alert type="warning" title="Production Monitoring">
          In production, ensure monitoring systems are highly available and independent 
          of the application they monitor to avoid single points of failure.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Administration Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/admin/environment" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Environment Variables →</h4>
              <p className="text-blue-800 text-sm">Monitoring configuration settings</p>
            </Link>
            <Link href="/docs/admin/backup" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">Backup & Recovery →</h4>
              <p className="text-green-800 text-sm">Monitor backup and recovery processes</p>
            </Link>
            <Link href="/docs/admin/redis" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Redis Setup →</h4>
              <p className="text-purple-800 text-sm">Redis monitoring and performance</p>
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