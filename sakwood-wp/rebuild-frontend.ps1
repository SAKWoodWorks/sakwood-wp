# Complete frontend rebuild for production
# This script completely removes old containers, images, and rebuilds from scratch

Write-Host "🔧 Stopping and removing frontend container..."
docker-compose -f docker-compose.prod.yml rm -s frontend

Write-Host "🗑️ Removing frontend Docker image..."
docker rmi sakwood-wp-frontend 2>$null; $true
docker rmi sakwood-wp-frontend-build 2>$null; $true

Write-Host "🧹 Clearing any remaining build cache..."
docker builder prune -f

Write-Host "📥 Pulling latest code from GitHub..."
git pull origin main

Write-Host "🏗️ Building frontend from scratch (no cache)..."
docker-compose -f docker-compose.prod.yml build --no-cache --pull frontend

Write-Host "🚀 Starting frontend container..."
docker-compose -f docker-compose.prod.yml up -d frontend

Write-Host "✅ Frontend rebuilt and started!"
Write-Host ""
Write-Host "📊 Watching logs (Ctrl+C to exit):"
docker-compose -f docker-compose.prod.yml logs -f frontend
