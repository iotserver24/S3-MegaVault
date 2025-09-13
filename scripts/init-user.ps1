# Initialize Single User Script for MegaVault

Write-Host "🔧 MegaVault Single User Initialization" -ForegroundColor Cyan

# Check if environment variables are set
if (-not $env:USER_EMAIL) {
    Write-Host "❌ USER_EMAIL environment variable is not set" -ForegroundColor Red
    Write-Host "Please set USER_EMAIL and USER_PASSWORD in your .env.local file" -ForegroundColor Yellow
    exit 1
}

if (-not $env:USER_PASSWORD) {
    Write-Host "❌ USER_PASSWORD environment variable is not set" -ForegroundColor Red
    Write-Host "Please set USER_EMAIL and USER_PASSWORD in your .env.local file" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Environment variables check passed" -ForegroundColor Green
Write-Host "📧 User Email: $env:USER_EMAIL" -ForegroundColor Blue

Write-Host "`n🚀 Starting MegaVault..." -ForegroundColor Green
Write-Host "Navigate to http://localhost:3000 to login" -ForegroundColor Yellow
Write-Host "Use the credentials from your .env.local file" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server`n" -ForegroundColor Gray

# Start the development server
npm run dev