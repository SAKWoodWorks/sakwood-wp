#!/bin/bash
# Initial Server Setup Script for Sakwood E-commerce Site
# Run this on a fresh DigitalOcean Ubuntu 22.04 droplet

set -e  # Exit on any error

echo "======================================"
echo "Sakwood Server Setup"
echo "======================================"
echo ""

# Update system packages
echo "[1/8] Updating system packages..."
apt update && apt upgrade -y

# Install Docker
echo "[2/8] Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm -f get-docker.sh

# Install Docker Compose
echo "[3/8] Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Verify Docker installation
echo "Docker version:"
docker --version
echo "Docker Compose version:"
docker-compose --version

# Install Nginx
echo "[4/8] Installing Nginx..."
apt install nginx -y

# Install Certbot for SSL
echo "[5/8] Installing Certbot for SSL..."
apt install certbot python3-certbot-nginx -y

# Install Git
echo "[6/8] Installing Git..."
apt install git -y

# Create project directory
echo "[7/8] Creating project directory..."
mkdir -p /var/www/sakwood

# Clone repository
echo "[8/8] Cloning repository..."
if [ -d "/var/www/sakwood/.git" ]; then
  echo "Repository already exists, pulling latest changes..."
  cd /var/www/sakwood
  git pull
else
  echo "Cloning repository..."
  git clone https://github.com/SAKWoodWorks/sakwood-wp.git /var/www/sakwood
fi

# Configure firewall
echo "Configuring firewall..."
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw --force enable

echo ""
echo "======================================"
echo "✅ Server setup complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Configure environment variables: cp /var/www/sakwood/.env.production /var/www/sakwood/.env"
echo "2. Update .env with your actual values (domain, passwords, etc.)"
echo "3. Update Nginx configs with your domain"
echo "4. Run: docker-compose -f docker-compose.prod.yml up -d --build"
echo "5. Setup SSL with: certbot --nginx -d yourdomain.com"
echo ""
echo "Current directory: /var/www/sakwood"
echo "Firewall status:"
ufw status
echo ""
