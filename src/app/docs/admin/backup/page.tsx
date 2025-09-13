import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Backup Overview' },
  { id: 'backup-strategy', title: 'Backup Strategy' },
  { id: 'automated-backups', title: 'Automated Backups' },
  { id: 'data-recovery', title: 'Data Recovery' },
  { id: 'disaster-recovery', title: 'Disaster Recovery' },
  { id: 'testing', title: 'Backup Testing' },
  { id: 'monitoring', title: 'Backup Monitoring' },
];

export default function BackupRecoveryPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Backup & Recovery</h1>
        <p className="text-xl text-slate-600">
          Comprehensive backup and disaster recovery strategies for MegaVault to ensure 
          data protection, business continuity, and rapid recovery from system failures.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Backup Overview</h2>
        <p>
          A robust backup and recovery strategy is essential for protecting MegaVault data 
          and ensuring business continuity in case of hardware failures, data corruption, or disasters.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Data Protection" description="Multi-layer backup approach">
            <ul className="text-sm space-y-1">
              <li>✅ Database backups</li>
              <li>✅ File storage backups</li>
              <li>✅ Configuration backups</li>
              <li>✅ Application state</li>
            </ul>
          </Card>
          
          <Card title="Recovery Objectives" description="Business continuity goals">
            <ul className="text-sm space-y-1">
              <li>✅ RTO: 4 hours max</li>
              <li>✅ RPO: 1 hour max</li>
              <li>✅ 99.9% data integrity</li>
              <li>✅ Point-in-time recovery</li>
            </ul>
          </Card>

          <Card title="Backup Types" description="Comprehensive coverage">
            <ul className="text-sm space-y-1">
              <li>✅ Full backups</li>
              <li>✅ Incremental backups</li>
              <li>✅ Differential backups</li>
              <li>✅ Continuous replication</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Backup Principles">
          Follow the 3-2-1 backup rule: 3 copies of data, 2 different storage types, 
          1 offsite backup for maximum protection.
        </Alert>
      </section>

      <section id="backup-strategy">
        <h2>Backup Strategy</h2>
        <p>Comprehensive backup strategy covering all MegaVault components and data types.</p>

        <h3>Backup Components</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Component</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Frequency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Retention</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Method</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">Redis Database</td>
                <td className="px-6 py-4 text-sm text-slate-600">Every 4 hours</td>
                <td className="px-6 py-4 text-sm text-slate-600">30 days</td>
                <td className="px-6 py-4 text-sm text-slate-600">RDB snapshots + AOF</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">User Files</td>
                <td className="px-6 py-4 text-sm text-slate-600">Daily</td>
                <td className="px-6 py-4 text-sm text-slate-600">90 days</td>
                <td className="px-6 py-4 text-sm text-slate-600">Cross-region sync</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">Configuration</td>
                <td className="px-6 py-4 text-sm text-slate-600">On change</td>
                <td className="px-6 py-4 text-sm text-slate-600">1 year</td>
                <td className="px-6 py-4 text-sm text-slate-600">Git repository</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">Application Logs</td>
                <td className="px-6 py-4 text-sm text-slate-600">Daily</td>
                <td className="px-6 py-4 text-sm text-slate-600">30 days</td>
                <td className="px-6 py-4 text-sm text-slate-600">Log aggregation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Backup Storage Locations</h3>
        <ul>
          <li><strong>Primary:</strong> Same region as production (for quick recovery)</li>
          <li><strong>Secondary:</strong> Different region (for disaster recovery)</li>
          <li><strong>Tertiary:</strong> Different cloud provider or on-premises</li>
          <li><strong>Archive:</strong> Long-term cold storage for compliance</li>
        </ul>

        <h3>Backup Schedule</h3>
        <CodeBlock language="bash" title="Backup Schedule Configuration">
{`# Crontab entries for automated backups

# Redis backup every 4 hours
0 */4 * * * /scripts/backup-redis.sh

# File storage backup daily at 2 AM
0 2 * * * /scripts/backup-files.sh

# Configuration backup on changes (via Git hooks)
# Handled by CI/CD pipeline

# Log backup daily at 1 AM
0 1 * * * /scripts/backup-logs.sh

# Weekly full system backup on Sundays at midnight
0 0 * * 0 /scripts/backup-full.sh`}
        </CodeBlock>
      </section>

      <section id="automated-backups">
        <h2>Automated Backups</h2>
        <p>Implement automated backup procedures for consistent and reliable data protection.</p>

        <h3>Redis Backup Script</h3>
        <CodeBlock language="bash" title="Redis Backup Automation">
{`#!/bin/bash
# backup-redis.sh

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/redis"
REDIS_DATA_DIR="/var/lib/redis"
S3_BUCKET="megavault-backups"
LOG_FILE="/var/log/megavault/backup.log"

echo "[$TIMESTAMP] Starting Redis backup" >> $LOG_FILE

# Create backup directory
mkdir -p $BACKUP_DIR

# Create Redis snapshot
redis-cli --rdb $BACKUP_DIR/dump_$TIMESTAMP.rdb

# Compress backup
gzip $BACKUP_DIR/dump_$TIMESTAMP.rdb

# Upload to S3
aws s3 cp $BACKUP_DIR/dump_$TIMESTAMP.rdb.gz s3://$S3_BUCKET/redis/

# Verify backup integrity
if aws s3 ls s3://$S3_BUCKET/redis/dump_$TIMESTAMP.rdb.gz; then
    echo "[$TIMESTAMP] ✓ Redis backup completed successfully" >> $LOG_FILE
    
    # Cleanup local backup (keep last 3)
    ls -t $BACKUP_DIR/dump_*.rdb.gz | tail -n +4 | xargs -r rm
else
    echo "[$TIMESTAMP] ✗ Redis backup failed" >> $LOG_FILE
    exit 1
fi`}
        </CodeBlock>

        <h3>File Storage Backup</h3>
        <CodeBlock language="bash" title="File Storage Backup Script">
{`#!/bin/bash
# backup-files.sh

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SOURCE_BUCKET="megavault-storage"
BACKUP_BUCKET="megavault-backup"
LOG_FILE="/var/log/megavault/backup.log"

echo "[$TIMESTAMP] Starting file storage backup" >> $LOG_FILE

# Sync files to backup bucket
aws s3 sync s3://$SOURCE_BUCKET s3://$BACKUP_BUCKET/files_$TIMESTAMP/ \
    --exclude "*/temp/*" \
    --exclude "*/cache/*" \
    --storage-class STANDARD_IA

if [ $? -eq 0 ]; then
    echo "[$TIMESTAMP] ✓ File storage backup completed" >> $LOG_FILE
    
    # Create backup manifest
    aws s3 ls s3://$BACKUP_BUCKET/files_$TIMESTAMP/ --recursive > /tmp/backup_manifest.txt
    aws s3 cp /tmp/backup_manifest.txt s3://$BACKUP_BUCKET/manifests/files_$TIMESTAMP.txt
    
    # Update latest backup pointer
    echo "files_$TIMESTAMP" | aws s3 cp - s3://$BACKUP_BUCKET/latest_files.txt
else
    echo "[$TIMESTAMP] ✗ File storage backup failed" >> $LOG_FILE
    exit 1
fi

echo "[$TIMESTAMP] File storage backup process completed" >> $LOG_FILE`}
        </CodeBlock>

        <h3>Database Backup Verification</h3>
        <CodeBlock language="bash" title="Backup Verification Script">
{`#!/bin/bash
# verify-backup.sh

BACKUP_FILE=$1
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
TEMP_DIR="/tmp/backup_verify_$TIMESTAMP"
LOG_FILE="/var/log/megavault/backup-verify.log"

echo "[$TIMESTAMP] Verifying backup: $BACKUP_FILE" >> $LOG_FILE

# Create temporary directory
mkdir -p $TEMP_DIR

# Download and extract backup
aws s3 cp $BACKUP_FILE $TEMP_DIR/backup.rdb.gz
gunzip $TEMP_DIR/backup.rdb.gz

# Start temporary Redis instance for verification
redis-server --port 6380 --dir $TEMP_DIR --dbfilename backup.rdb --daemonize yes

# Test basic operations
if redis-cli -p 6380 ping | grep -q PONG; then
    echo "[$TIMESTAMP] ✓ Backup verification successful" >> $LOG_FILE
    redis-cli -p 6380 shutdown
    rm -rf $TEMP_DIR
    exit 0
else
    echo "[$TIMESTAMP] ✗ Backup verification failed" >> $LOG_FILE
    redis-cli -p 6380 shutdown 2>/dev/null || true
    rm -rf $TEMP_DIR
    exit 1
fi`}
        </CodeBlock>
      </section>

      <section id="data-recovery">
        <h2>Data Recovery</h2>
        <p>Step-by-step procedures for recovering data from backups in various scenarios.</p>

        <div className="space-y-8">
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Stop Redis Service</h3>
              <p className="text-slate-600">Stop the Redis service to prevent data corruption during recovery.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Download Backup</h3>
              <p className="text-slate-600">Download the appropriate backup file from the backup storage location.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Restore Database File</h3>
              <p className="text-slate-600">Replace the current Redis database file with the backup file.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Set Correct Permissions</h3>
              <p className="text-slate-600">Ensure the restored file has the correct ownership and permissions.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">5</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Start Redis Service</h3>
              <p className="text-slate-600">Start the Redis service and verify the data has been restored correctly.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">6</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Validate Recovery</h3>
              <p className="text-slate-600">Run tests to ensure the application functions correctly with restored data.</p>
            </div>
          </div>
        </div>

        <h3>Redis Recovery Commands</h3>
        <CodeBlock language="bash" title="Redis Recovery Script">
{`#!/bin/bash
# recover-redis.sh

BACKUP_DATE=\$1
if [ -z "\$BACKUP_DATE" ]; then
    echo "Usage: \$0 <backup_date> (format: YYYYMMDD_HHMMSS)"
    exit 1
fi

BACKUP_FILE="dump_\${BACKUP_DATE}.rdb.gz"
REDIS_DATA_DIR="/var/lib/redis"
S3_BUCKET="megavault-backups"

echo "Starting Redis recovery from backup: \$BACKUP_FILE"

# Stop Redis service
sudo systemctl stop redis-server

# Backup current data (just in case)
sudo cp \$REDIS_DATA_DIR/dump.rdb \$REDIS_DATA_DIR/dump.rdb.pre-recovery

# Download and restore backup
aws s3 cp s3://\$S3_BUCKET/redis/\$BACKUP_FILE /tmp/
gunzip /tmp/\$BACKUP_FILE
sudo cp /tmp/dump_\${BACKUP_DATE}.rdb \$REDIS_DATA_DIR/dump.rdb

# Set correct permissions
sudo chown redis:redis \$REDIS_DATA_DIR/dump.rdb
sudo chmod 660 \$REDIS_DATA_DIR/dump.rdb

# Start Redis service
sudo systemctl start redis-server

# Verify recovery
if redis-cli ping | grep -q PONG; then
    echo "✓ Redis recovery completed successfully"
    
    # Test data integrity
    redis-cli info keyspace
else
    echo "✗ Redis recovery failed"
    exit 1
fi`}
        </CodeBlock>

        <h3>File Recovery Process</h3>
        <CodeBlock language="bash" title="File Recovery Script">
{`#!/bin/bash
# recover-files.sh

BACKUP_DATE=\$1
RECOVERY_PATH=\$2

if [ -z "\$BACKUP_DATE" ] || [ -z "\$RECOVERY_PATH" ]; then
    echo "Usage: \$0 <backup_date> <recovery_path>"
    exit 1
fi

BACKUP_BUCKET="megavault-backup"
SOURCE_PATH="files_\${BACKUP_DATE}/"

echo "Starting file recovery from backup: \$BACKUP_DATE"

# Create recovery directory
mkdir -p \$RECOVERY_PATH

# Download files from backup
aws s3 sync s3://\$BACKUP_BUCKET/\$SOURCE_PATH \$RECOVERY_PATH/

if [ \$? -eq 0 ]; then
    echo "✓ File recovery completed successfully"
    echo "Files recovered to: \$RECOVERY_PATH"
    
    # Display recovery statistics
    echo "Recovery statistics:"
    find \$RECOVERY_PATH -type f | wc -l | xargs echo "Files recovered:"
    du -sh \$RECOVERY_PATH | xargs echo "Total size:"
else
    echo "✗ File recovery failed"
    exit 1
fi`}
        </CodeBlock>
      </section>

      <section id="disaster-recovery">
        <h2>Disaster Recovery</h2>
        <p>Comprehensive disaster recovery plan for complete system failure scenarios.</p>

        <h3>Disaster Recovery Scenarios</h3>
        <ul>
          <li><strong>Data Center Outage:</strong> Complete loss of primary infrastructure</li>
          <li><strong>Regional Disaster:</strong> Natural disaster affecting entire region</li>
          <li><strong>Cyber Attack:</strong> Ransomware or data breach incident</li>
          <li><strong>Data Corruption:</strong> Widespread data corruption or loss</li>
        </ul>

        <h3>Recovery Time Objectives (RTO)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Scenario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">RTO Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">RPO Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Action Required</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">Single Component Failure</td>
                <td className="px-6 py-4 text-sm text-slate-600">30 minutes</td>
                <td className="px-6 py-4 text-sm text-slate-600">15 minutes</td>
                <td className="px-6 py-4 text-sm text-slate-600">Automated failover</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">Data Center Outage</td>
                <td className="px-6 py-4 text-sm text-slate-600">4 hours</td>
                <td className="px-6 py-4 text-sm text-slate-600">1 hour</td>
                <td className="px-6 py-4 text-sm text-slate-600">Manual intervention</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">Regional Disaster</td>
                <td className="px-6 py-4 text-sm text-slate-600">24 hours</td>
                <td className="px-6 py-4 text-sm text-slate-600">4 hours</td>
                <td className="px-6 py-4 text-sm text-slate-600">Full DR activation</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900">Cyber Attack</td>
                <td className="px-6 py-4 text-sm text-slate-600">48 hours</td>
                <td className="px-6 py-4 text-sm text-slate-600">24 hours</td>
                <td className="px-6 py-4 text-sm text-slate-600">Security investigation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>DR Activation Checklist</h3>
        <ul>
          <li>☐ Assess the scope and impact of the disaster</li>
          <li>☐ Activate incident response team</li>
          <li>☐ Notify stakeholders and users</li>
          <li>☐ Activate backup infrastructure</li>
          <li>☐ Restore data from backups</li>
          <li>☐ Update DNS and routing</li>
          <li>☐ Verify system functionality</li>
          <li>☐ Monitor system performance</li>
          <li>☐ Document lessons learned</li>
        </ul>
      </section>

      <section id="testing">
        <h2>Backup Testing</h2>
        <p>Regular testing procedures to ensure backup integrity and recovery capabilities.</p>

        <h3>Testing Schedule</h3>
        <ul>
          <li><strong>Daily:</strong> Automated backup verification</li>
          <li><strong>Weekly:</strong> Recovery test on non-production environment</li>
          <li><strong>Monthly:</strong> Full disaster recovery simulation</li>
          <li><strong>Quarterly:</strong> Cross-region recovery test</li>
        </ul>

        <h3>Backup Test Script</h3>
        <CodeBlock language="bash" title="Automated Backup Testing">
{`#!/bin/bash
# test-backup-recovery.sh

TIMESTAMP=\\$(date +%Y%m%d_%H%M%S)
TEST_ENV="backup-test-\\$TIMESTAMP"
LOG_FILE="/var/log/megavault/backup-test.log"

echo "[\\$TIMESTAMP] Starting backup recovery test" >> \\$LOG_FILE

# Create isolated test environment
docker-compose -f docker-compose.test.yml up -d --wait

# Get latest backup
LATEST_BACKUP=\\$(aws s3 ls s3://megavault-backups/redis/ | sort | tail -1 | awk '{print \\$4}')
BACKUP_DATE=\\$(echo \\$LATEST_BACKUP | sed 's/dump_\\\\(.*\\\\)\\\\.rdb\\\\.gz/\\\\1/')

# Restore backup to test environment
./recover-redis.sh \\$BACKUP_DATE test

# Run application tests against restored data
npm run test:integration

if [ \\$? -eq 0 ]; then
    echo "[\\$TIMESTAMP] ✓ Backup recovery test passed" >> \\$LOG_FILE
else
    echo "[\\$TIMESTAMP] ✗ Backup recovery test failed" >> \\$LOG_FILE
    exit 1
fi

# Cleanup test environment
docker-compose -f docker-compose.test.yml down -v

echo "[\\$TIMESTAMP] Backup recovery test completed" >> \\$LOG_FILE`}
        </CodeBlock>
      </section>

      <section id="monitoring">
        <h2>Backup Monitoring</h2>
        <p>Monitor backup processes and ensure they complete successfully.</p>

        <h3>Backup Monitoring Metrics</h3>
        <ul>
          <li><strong>Backup Success Rate:</strong> Percentage of successful backups</li>
          <li><strong>Backup Duration:</strong> Time taken to complete backups</li>
          <li><strong>Backup Size:</strong> Size of backup files and growth trends</li>
          <li><strong>Recovery Time:</strong> Time required for data recovery</li>
        </ul>

        <h3>Backup Monitoring Script</h3>
        <CodeBlock language="bash" title="Backup Status Monitor">
{`#!/bin/bash
# monitor-backups.sh

TIMESTAMP=\\$(date +%Y%m%d_%H%M%S)
SLACK_WEBHOOK="https://hooks.slack.com/your-webhook"

# Check Redis backup status
REDIS_BACKUP_AGE=\\$(aws s3 ls s3://megavault-backups/redis/ | tail -1 | awk '{print \\$1 " " \\$2}')
REDIS_BACKUP_TIME=\\$(date -d "\\$REDIS_BACKUP_AGE" +%s)
CURRENT_TIME=\\$(date +%s)
HOURS_SINCE_BACKUP=\\$(( (CURRENT_TIME - REDIS_BACKUP_TIME) / 3600 ))

if [ \\$HOURS_SINCE_BACKUP -gt 6 ]; then
    # Send alert
    curl -X POST "\\$SLACK_WEBHOOK" \\
        -H 'Content-type: application/json' \\
        --data "{\\"text\\":\\"⚠️ Redis backup is \\$HOURS_SINCE_BACKUP hours old\\"}"
fi

# Check file backup status
FILE_BACKUP_STATUS=\\$(aws s3 ls s3://megavault-backup/latest_files.txt)
if [ -z "\\$FILE_BACKUP_STATUS" ]; then
    curl -X POST "\\$SLACK_WEBHOOK" \\
        -H 'Content-type: application/json' \\
        --data '{"text":"🚨 File backup status unknown"}'
fi

echo "[\\$TIMESTAMP] Backup monitoring check completed"`}
        </CodeBlock>

        <Alert type="info" title="Backup Validation">
          Always validate backups by performing test recoveries. An untested backup 
          is not a reliable backup.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Administration Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/admin/storage" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Storage Configuration →</h4>
              <p className="text-blue-800 text-sm">Storage backup strategies</p>
            </Link>
            <Link href="/docs/admin/redis" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">Redis Setup →</h4>
              <p className="text-green-800 text-sm">Redis backup configuration</p>
            </Link>
            <Link href="/docs/admin/monitoring" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Monitoring →</h4>
              <p className="text-purple-800 text-sm">Backup monitoring and alerting</p>
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