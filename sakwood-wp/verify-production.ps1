# Sakwood Production Server Verification Script
# Run this from your local Windows machine to check production server

$ErrorActionPreference = "Stop"

$SERVER = "root@wp.sakww.com"
$PROJECT_PATH = "/var/www/sakwood"

Write-Host "========================================" -ForegroundColor Green
Write-Host "Sakwood Production Verification" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "🔌 Connecting to: $SERVER" -ForegroundColor Yellow
Write-Host ""

# Test SSH connection
Write-Host "1. Testing SSH connection..." -ForegroundColor Cyan
try {
    $testResult = ssh -o ConnectTimeout=10 $SERVER "echo 'Connected successfully'" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Connection successful" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Connection failed: $testResult" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   ❌ Cannot connect to server" -ForegroundColor Red
    Write-Host "   Make sure you have SSH access configured" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Check .env file
Write-Host "2. Checking .env file..." -ForegroundColor Cyan
ssh $SERVER "if [ -f '$PROJECT_PATH/.env' ]; then echo '✅ .env exists'; echo '   Password variables configured:'; grep -c 'PASSWORD' $PROJECT_PATH/.env; else echo '❌ .env NOT found'; fi" 2>&1
Write-Host ""

# Check running containers
Write-Host "3. Checking Docker containers..." -ForegroundColor Cyan
ssh $SERVER "docker ps --format 'table {{.Names}}\t{{.Status}}'" 2>&1
Write-Host ""

# Check WordPress status
Write-Host "4. Checking WordPress status..." -ForegroundColor Cyan
$wpStatus = ssh $SERVER "curl -s -o /dev/null -w '%{http_code}' http://localhost:8006" 2>&1
if ($wpStatus -eq "200") {
    Write-Host "   ✅ WordPress responding (HTTP 200)" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  WordPress status: $wpStatus" -ForegroundColor Yellow
}
Write-Host ""

# Check Frontend status
Write-Host "5. Checking Frontend status..." -ForegroundColor Cyan
$feStatus = ssh $SERVER "curl -s -o /dev/null -w '%{http_code}' http://localhost:8007" 2>&1
if ($feStatus -eq "200") {
    Write-Host "   ✅ Frontend responding (HTTP 200)" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Frontend status: $feStatus" -ForegroundColor Yellow
}
Write-Host ""

# Check disk space
Write-Host "6. Checking disk space..." -ForegroundColor Cyan
ssh $SERVER "df -h | grep -E 'Filesystem|/dev/sda1'" 2>&1
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ Verification Complete" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "For detailed logs, SSH into the server:" -ForegroundColor Yellow
Write-Host "  ssh $SERVER" -ForegroundColor White
Write-Host ""
Write-Host "Then run:" -ForegroundColor Yellow
Write-Host "  cd $PROJECT_PATH" -ForegroundColor White
Write-Host "  docker-compose -f docker-compose.prod.yml logs -f" -ForegroundColor White
Write-Host ""
