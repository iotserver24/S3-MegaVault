# Test production build script

Write-Host "🔍 Checking environment variables..."
$requiredEnvVars = @(
    "CLOUDFLARE_R2_ACCESS_KEY_ID",
    "CLOUDFLARE_R2_SECRET_ACCESS_KEY",
    "CLOUDFLARE_R2_BUCKET",
    "CLOUDFLARE_R2_ENDPOINT",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "NEXTAUTH_URL",
    "NEXTAUTH_SECRET"
)

$missingVars = @()
foreach ($var in $requiredEnvVars) {
    if (-not (Test-Path env:$var)) {
        $missingVars += $var
    }
}

if ($missingVars.Count -gt 0) {
    Write-Host "❌ Missing environment variables:" -ForegroundColor Red
    foreach ($var in $missingVars) {
        Write-Host "   - $var" -ForegroundColor Red
    }
    Write-Host "`nPlease set these variables in your .env.local file"
    exit 1
}

Write-Host "✅ Environment variables check passed" -ForegroundColor Green

Write-Host "`n🧹 Cleaning up previous build..."
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}
if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force "node_modules/.cache"
}

Write-Host "`n📦 Installing dependencies..."
npm install

Write-Host "`n🏗️ Building production version..."
$buildResult = npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n🚀 Starting production server..."
Write-Host "Navigate to http://localhost:3000 to test the application"
Write-Host "Press Ctrl+C to stop the server`n"
npm run start 