#!/bin/bash
# Resource Monitoring Script for Sakwood E-commerce Site
# Optimized for 2GB DigitalOcean droplet

echo "======================================"
echo "Sakwood Server Monitoring"
echo "======================================"
echo "Time: $(date)"
echo ""

# Docker Stats
echo "=== Docker Container Stats ==="
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"

echo ""
echo "=== System Resources ==="

# Memory Usage
echo "--- Memory Usage ---"
free -h

echo ""
echo "--- Disk Usage ---"
df -h | grep -E "Filesystem|/dev/vda1"

echo ""
echo "--- Docker Disk Usage ---"
docker system df

echo ""
echo "=== Container Health ==="
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "=== Recent Logs (Last 10 lines) ==="

echo "--- Frontend Logs ---"
docker logs --tail 10 sak_frontend 2>&1 | grep -E "(error|Error|ERROR)" || echo "✅ No errors in frontend logs"

echo ""
echo "--- WordPress Logs ---"
docker logs --tail 10 sak_wp 2>&1 | grep -E "(error|Error|ERROR)" || echo "✅ No errors in WordPress logs"

echo ""
echo "--- Database Logs ---"
docker logs --tail 10 sak_db 2>&1 | grep -E "(error|Error|ERROR)" || echo "✅ No errors in database logs"

echo ""
echo "======================================"
echo "✅ Monitoring complete!"
echo "======================================"
echo ""
echo "💡 Tips for 2GB droplet:"
echo "  - Frontend should use < 512MB"
echo "  - WordPress should use < 512MB"
echo "  - Database should use < 768MB"
echo "  - Total usage should be < 80% for stability"
echo ""
