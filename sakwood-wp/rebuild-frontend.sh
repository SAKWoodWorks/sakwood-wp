#!/bin/bash
# Complete frontend rebuild for production
# This script completely removes old containers, images, and rebuilds from scratch

set -e

echo "🔧 Stopping and removing frontend container..."
docker-compose -f docker-compose.prod.yml rm -s frontend

echo "🗑️ Removing frontend Docker image..."
docker rmi sakwood-wp-frontend 2>/dev/null || true
docker rmi sakwood-wp-frontend-build 2>/dev/null || true

echo "🧹 Clearing any remaining build cache..."
docker builder prune -f

echo "📥 Pulling latest code from GitHub..."
git pull origin main

echo "🏗️ Building frontend from scratch (no cache)..."
docker-compose -f docker-compose.prod.yml build --no-cache --pull frontend

echo "🚀 Starting frontend container..."
docker-compose -f docker-compose.prod.yml up -d frontend

echo "✅ Frontend rebuilt and started!"
echo ""
echo "📊 Watching logs (Ctrl+C to exit):"
docker-compose -f docker-compose.prod.yml logs -f frontend
