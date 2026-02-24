#!/bin/bash
# Production Server Verification Script
# Run this on your DigitalOcean server: ssh root@wp.sakww.com

echo "=========================================="
echo "Sakwood Production Server Verification"
echo "=========================================="
echo ""

# 1. Check current directory
echo "📁 Current Directory:"
pwd
echo ""

# 2. Check if .env file exists
echo "🔐 Environment Files:"
if [ -f "/var/www/sakwood/.env" ]; then
    echo "✅ .env file exists"
    echo "   Location: /var/www/sakwood/.env"
    echo ""
    echo "   Content (hidden passwords):"
    grep -v "PASSWORD" /var/www/sakwood/.env | head -10
    echo "   🔒 Passwords configured: $(grep -c "PASSWORD" /var/www/sakwood/.env) variables"
else
    echo "❌ .env file NOT found"
    echo "   You need to create it!"
fi
echo ""

# 3. Check docker-compose.prod.yml
echo "🐳 Docker Compose Production:"
if [ -f "/var/www/sakwood/docker-compose.prod.yml" ]; then
    echo "✅ docker-compose.prod.yml exists"
    echo "   Using environment variables:"
    grep -E "\$\{MYSQL_.*PASSWORD\}" /var/www/sakwood/docker-compose.prod.yml | head -3
else
    echo "❌ docker-compose.prod.yml NOT found"
fi
echo ""

# 4. Check running containers
echo "📦 Running Containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null || echo "❌ No containers running or Docker not accessible"
echo ""

# 5. Check database connectivity
echo "🗄️  Database Connection:"
if docker ps | grep -q sak_db; then
    echo "✅ Database container is running"
    echo "   Testing connection..."
    docker exec sak_db mysql -u root -p"${MYSQL_ROOT_PASSWORD:-}" -e "SELECT 'Database connection OK' as status;" 2>/dev/null && echo "   ✅ Database accessible" || echo "   ⚠️  Password might be incorrect"
else
    echo "❌ Database container NOT running"
fi
echo ""

# 6. Check WordPress container
echo "🌐 WordPress Container:"
if docker ps | grep -q sak_wp; then
    echo "✅ WordPress container is running"
    echo "   URL: http://localhost:8006"
    curl -s -o /dev/null -w "   HTTP Status: %{http_code}\n" http://localhost:8006 2>/dev/null || echo "   ⚠️  WordPress not responding"
else
    echo "❌ WordPress container NOT running"
fi
echo ""

# 7. Check Frontend container
echo "🎨 Frontend Container:"
if docker ps | grep -q sak_frontend; then
    echo "✅ Frontend container is running"
    echo "   URL: http://localhost:8007"
    curl -s -o /dev/null -w "   HTTP Status: %{http_code}\n" http://localhost:8007 2>/dev/null || echo "   ⚠️  Frontend not responding"
else
    echo "❌ Frontend container NOT running"
fi
echo ""

# 8. Check disk space
echo "💾 Disk Space:"
df -h | grep -E "Filesystem|/dev/" | head -2
echo ""

# 9. Check recent logs
echo "📋 Recent Container Logs:"
echo "--- Database (last 5 lines) ---"
docker logs --tail 5 sak_db 2>/dev/null || echo "No logs available"
echo ""
echo "--- WordPress (last 5 lines) ---"
docker logs --tail 5 sak_wp 2>/dev/null || echo "No logs available"
echo ""

echo "=========================================="
echo "✅ Verification Complete"
echo "=========================================="
