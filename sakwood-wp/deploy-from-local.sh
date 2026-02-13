#!/bin/bash
# Deploy frontend from local machine to DigitalOcean droplet
# This avoids Docker build issues by building locally and copying files

set -e

echo "📦 Building frontend locally..."
cd frontend
npm run build

echo "📦 Creating deployment package..."
tar -czf frontend/.next/ frontend/public frontend/package.json frontend/.env.production frontend/next.config.ts frontend/next.config.mjs

echo "📤 Copying files to droplet..."
scp -r frontend.tar.gz root@your-droplet-ip:/root/sakwood-wp/frontend/

echo "📥 Extracting files on droplet..."
ssh root@your-droplet-ip << 'ENDSSH'
cd /root/sakwood-wp/frontend
tar -xzf frontend.tar.gz
rm -rf frontend/.next frontend/public
cp -r package.json . next.config.ts next.config.mjs .env.production .

echo "🔧 Installing dependencies on droplet..."
npm ci --production=false

echo "🚀 Restarting frontend container..."
docker-compose -f /root/sakwood-wp/docker-compose.prod.yml up -d frontend

echo "✅ Deployment complete!"
echo ""
echo "📊 Watching logs (Ctrl+C to exit):"
docker-compose -f /root/sakwood-wp/docker-compose.prod.yml logs -f frontend
ENDSSH
