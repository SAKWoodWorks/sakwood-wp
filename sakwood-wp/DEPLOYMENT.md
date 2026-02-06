# DigitalOcean Deployment Guide

This guide explains how to deploy the Sakwood WordPress + Next.js application to your DigitalOcean Droplet.

## Prerequisites

- DigitalOcean Droplet with Docker installed
- Nginx installed on the droplet
- Domain name configured with DNS pointing to your droplet IP
- SSH access to the droplet
- Git installed (optional, for version control)

## Quick Start

### 1. Update Configuration Files

#### Configure Environment Variables

Edit `.env.production` and update with your actual values:

```bash
# Database Configuration
MYSQL_ROOT_PASSWORD=your-strong-password-here
MYSQL_PASSWORD=your-strong-password-here

# WordPress URLs
WORDPRESS_GRAPHQL_URL=https://yourdomain.com/graphql
WORDPRESS_API_URL=https://yourdomain.com/wp-json/sakwood/v1
WORDPRESS_REST_URL=https://yourdomain.com/wp-json/sakwood/v1

# App Configuration
APP_NAME=SAK WoodWorks
APP_DESCRIPTION=Premium Construction Materials
```

**IMPORTANT:** Use strong, unique passwords for production!

#### Configure Deployment Script

**For Windows (PowerShell):** Edit `deploy.ps1`

```powershell
$DROPLET_IP = "your-droplet-ip"
$DOMAIN = "yourdomain.com"
$API_SUBDOMAIN = "api.yourdomain.com"
```

**For Mac/Linux (Bash):** Edit `deploy.sh`

```bash
DROPLET_IP="your-droplet-ip"
DOMAIN="yourdomain.com"
API_SUBDOMAIN="api.yourdomain.com"
```

### 2. Run Deployment Script

#### Windows PowerShell

```powershell
# Open PowerShell in the project directory
cd D:\Works\Web\sakwood\sakwood-wp

# Run the deployment script
.\deploy.ps1
```

#### Mac/Linux Bash

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

The script will:
1. Test SSH connection to your droplet
2. Upload all necessary files
3. Configure environment variables
4. Set up Nginx configuration
5. Start Docker containers
6. Verify deployment

### 3. Set up SSL Certificates

After successful deployment, SSH into your droplet and set up Let's Encrypt SSL:

```bash
# SSH into droplet
ssh root@your-droplet-ip

# Install certbot (if not already installed)
apt update
apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate for frontend
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Obtain SSL certificate for WordPress API
certbot --nginx -d api.yourdomain.com

# Test auto-renewal
certbot renew --dry-run
```

### 4. Verify Deployment

```bash
# Check running containers
docker ps

# View logs
cd /var/www/sakwood
docker-compose -f docker-compose.prod.yml logs -f

# Test services
curl https://yourdomain.com
curl https://api.yourdomain.com/graphql
```

### 5. Access Your Site

- **Frontend:** `https://yourdomain.com`
- **WordPress Admin:** `https://api.yourdomain.com/wp-admin`
- **GraphQL API:** `https://api.yourdomain.com/graphql`

## Manual Deployment (Alternative)

If you prefer manual deployment or need to troubleshoot:

### 1. SSH into Droplet

```bash
ssh root@your-droplet-ip
```

### 2. Create Project Directory

```bash
mkdir -p /var/www/sakwood
cd /var/www/sakwood
```

### 3. Copy Files

**Option A: Using Git**
```bash
git clone https://github.com/your-repo/sakwood-wp.git .
```

**Option B: Using SCP (from local machine)**
```bash
scp -r ./ root@your-droplet-ip:/var/www/sakwood/
```

### 4. Set Up Environment

```bash
# Copy environment template
cp .env.production .env

# Edit with your values
nano .env
```

### 5. Update Nginx Configuration

```bash
# Update domain in nginx configs
sed -i 's/yourdomain.com/your-actual-domain.com/g' nginx/*.conf

# Copy nginx configs
cp nginx/frontend.conf /etc/nginx/sites-available/sakwood-frontend
cp nginx/wordpress.conf /etc/nginx/sites-available/sakwood-wordpress

# Enable sites
ln -s /etc/nginx/sites-available/sakwood-frontend /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/sakwood-wordpress /etc/nginx/sites-enabled/

# Remove default site
rm -f /etc/nginx/sites-enabled/default

# Test and reload nginx
nginx -t
systemctl reload nginx
```

### 6. Start Docker Containers

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Post-Deployment Setup

### WordPress Setup

1. Visit `https://api.yourdomain.com/wp-admin`
2. Complete WordPress installation wizard
3. Install and activate required plugins:
   - WooCommerce
   - WPGraphQL
   - WPGraphQL for WooCommerce
4. Configure permalinks: Settings → Permalinks → Post name
5. Upload products and content

### Next.js Configuration

The Next.js frontend will automatically connect to WordPress using the environment variables. Verify:

1. Products load on the homepage
2. Navigation works
3. Cart functionality works
4. Checkout process works

### Security Hardening

```bash
# Configure firewall
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable

# Restrict WordPress admin by IP (optional)
# Edit nginx/wordpress.conf and uncomment the allow/directives in wp-admin and wp-login.php sections

# Set up automated backups
# Configure your backup solution of choice

# Monitor logs
tail -f /var/log/nginx/sakwood_*.log
docker-compose -f docker-compose.prod.yml logs -f
```

## Troubleshooting

### Container Won't Start

```bash
# Check container logs
docker logs sak_frontend
docker logs sak_wp
docker logs sak_db

# Check all logs
docker-compose -f docker-compose.prod.yml logs
```

### Nginx 502 Bad Gateway

1. Check if containers are running: `docker ps`
2. Verify container ports: Frontend (3000), WordPress (8006)
3. Check Nginx error logs: `tail -f /var/log/nginx/sakwood_*_error.log`
4. Verify Nginx configuration: `nginx -t`

### Database Connection Errors

```bash
# Check database container
docker ps | grep sak_db

# Check database logs
docker logs sak_db

# Verify environment variables
cat /var/www/sakwood/.env
```

### SSL Certificate Issues

```bash
# Check certificate status
certbot certificates

# Renew manually
certbot renew

# Check certbot logs
tail -f /var/log/letsencrypt/letsencrypt.log
```

### Next.js Build Fails

```bash
# Check build logs
docker logs sak_frontend

# Rebuild container
cd /var/www/sakwood
docker-compose -f docker-compose.prod.yml up -d --build frontend
```

## File Structure

```
sakwood-wp/
├── docker-compose.prod.yml      # Production Docker Compose configuration
├── .env.production              # Production environment variables template
├── deploy.sh                    # Bash deployment script (Mac/Linux)
├── deploy.ps1                   # PowerShell deployment script (Windows)
├── nginx/
│   ├── frontend.conf           # Nginx config for Next.js frontend
│   └── wordpress.conf          # Nginx config for WordPress backend
├── Dockerfile                   # WordPress Docker image
└── frontend/
    └── Dockerfile              # Next.js production Docker image
```

## Maintenance

### Update Application

```bash
# SSH into droplet
ssh root@your-droplet-ip

# Navigate to project directory
cd /var/www/sakwood

# Pull latest code (if using git)
git pull

# Or upload new files via scp

# Rebuild and restart containers
docker-compose -f docker-compose.prod.yml up -d --build

# Clear Docker cache (if needed)
docker system prune -a
```

### Backup Database

```bash
# Backup database
docker exec sak_db mysqldump -u root -p wordpress > backup.sql

# Restore database
docker exec -i sak_db mysql -u root -p wordpress < backup.sql
```

### Monitor Resources

```bash
# Check disk usage
df -h

# Check Docker resource usage
docker stats

# Check container logs
docker-compose -f docker-compose.prod.yml logs -f
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review container logs
3. Check Nginx error logs
4. Verify environment variables
5. Test DNS propagation: `dig yourdomain.com`

## Security Checklist

- [ ] Strong database passwords set
- [ ] SSL certificates installed and auto-renewing
- [ ] Firewall configured (only 22, 80, 443 open)
- [ ] WordPress admin restricted by IP (optional)
- [ ] Regular backups configured
- [ ] Monitoring and alerts set up
- [ ] PHP uploads limited (already configured in Dockerfile)
- [ ] WordPress file editing disabled in wp-config.php
