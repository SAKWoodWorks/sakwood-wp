# DigitalOcean Deployment Guide

## Quick Start Deployment

This guide will help you deploy the Sakwood e-commerce site to DigitalOcean using Docker with GitHub-based automated deployment.

---

## Prerequisites

- DigitalOcean account
- Domain name configured and pointing to your droplet
- GitHub account with repository access
- SSH key (recommended) or password for droplet access

---

## Step 1: Create DigitalOcean Droplet

### 1.1 Create Droplet

1. Log into [DigitalOcean](https://cloud.digitalocean.com/)
2. Click **Create** → **Droplets**
3. Choose **Ubuntu 22.04 LTS**
4. Choose **Basic** plan
5. Select **$24/month** (2GB RAM, 1 vCPU, 50GB SSD)
6. Choose **Singapore** region (closest to Thailand)
7. Select **SSH Key** authentication (recommended) or **Password**
8. Set hostname: `sakwood-prod`
9. Click **Create Droplet**

### 1.2 Note Your Droplet IP

Once created, note your droplet's public IP address:
```
Droplet IP: 167.99.123.45 (example)
```

---

## Step 2: Configure GitHub Secrets

### 2.1 Generate SSH Key (if needed)

On your local machine:

```bash
# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "github-actions"

# Display public key
cat ~/.ssh/id_rsa.pub
```

### 2.2 Add SSH Key to Droplet

```bash
# Copy SSH key to droplet
ssh-copy-id root@<your-droplet-ip>
```

### 2.3 Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

**Secret 1:**
- Name: `DROPLET_IP`
- Value: `167.99.123.45` (your droplet IP)

**Secret 2:**
- Name: `SSH_PRIVATE_KEY`
- Value: Your private SSH key contents

```bash
# Display private key (copy entire output)
cat ~/.ssh/id_rsa
```

Paste the entire key content into the secret value.

---

## Step 3: Initial Server Setup

### 3.1 Run Setup Script

From your local machine:

```bash
# Upload and run setup script
scp setup/initial-server-setup.sh root@<droplet-ip>:/root/
ssh root@<droplet-ip> 'chmod +x /root/initial-server-setup.sh && bash /root/initial-server-setup.sh'
```

Or download directly on droplet:

```bash
ssh root@<droplet-ip>
cd /var/www/sakwood
wget https://raw.githubusercontent.com/SAKWoodWorks/sakwood-wp/main/setup/initial-server-setup.sh
chmod +x initial-server-setup.sh
./initial-server-setup.sh
```

### 3.2 Verify Installation

```bash
ssh root@<droplet-ip>

# Check Docker
docker --version
docker-compose --version

# Check containers (should be empty initially)
docker ps

# Check firewall
ufw status
```

---

## Step 4: Configure Environment

### 4.1 Update Environment Variables

On the droplet:

```bash
cd /var/www/sakwood
cp .env.production .env
nano .env
```

**Generate Strong Passwords:**

```bash
# On droplet or local machine
openssl rand -base64 32
```

**Update .env with your values:**

```env
# Database Configuration
MYSQL_ROOT_PASSWORD=YOUR_STRONG_PASSWORD_HERE
MYSQL_PASSWORD=YOUR_STRONG_PASSWORD_HERE

# WordPress URLs
WORDPRESS_GRAPHQL_URL=https://api.yourdomain.com/graphql
WORDPRESS_API_URL=https://api.yourdomain.com/wp-json/sakwood/v1
WORDPRESS_REST_URL=https://api.yourdomain.com/wp-json/sakwood/v1

# App Configuration
APP_NAME=SAK WoodWorks
APP_DESCRIPTION=Premium Construction Materials
```

Replace:
- `YOUR_STRONG_PASSWORD_HERE` with generated passwords
- `yourdomain.com` with your actual domain

### 4.2 Configure Nginx

```bash
# Update domain in nginx configs
cd /var/www/sakwood
sed -i 's/yourdomain.com/YOUR_ACTUAL_DOMAIN/g' nginx/*.conf
```

---

## Step 5: Deploy Application

### 5.1 Build and Start Containers

```bash
cd /var/www/sakwood
docker-compose -f docker-compose.prod.yml up -d --build
```

### 5.2 Verify Containers

```bash
# Check running containers
docker ps

# Expected output:
# sak_frontend    Next.js frontend (port 3000)
# sak_wp          WordPress backend (port 8006)
# sak_db          MySQL database
```

### 5.3 Check Logs

```bash
# View all logs
docker-compose -f docker-compose.prod.yml logs -f

# View specific service logs
docker logs -f sak_frontend
docker logs -f sak_wp
docker logs -f sak_db
```

---

## Step 6: Configure DNS

### 6.1 Add DNS Records

In your domain registrar or DigitalOcean DNS:

**For main domain (yourdomain.com):**
```
Type: A
Name: @
Value: <your-droplet-ip>
TTL: 3600
```

```
Type: A
Name: www
Value: <your-droplet-ip>
TTL: 3600
```

**For API subdomain:**
```
Type: A
Name: api
Value: <your-droplet-ip>
TTL: 3600
```

### 6.2 Verify DNS Propagation

From your local machine:

```bash
# Check DNS
dig yourdomain.com
dig api.yourdomain.com

# Or use online tool: https://dnschecker.org/
```

Wait for DNS propagation (usually 5-30 minutes).

---

## Step 7: Setup SSL Certificates

### 7.1 Install SSL for Frontend

```bash
ssh root@<droplet-ip>

# SSL for main domain
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 7.2 Install SSL for WordPress API

```bash
# SSL for API subdomain
certbot --nginx -d api.yourdomain.com
```

### 7.3 Verify SSL

```bash
# Check certificates
certbot certificates

# Test auto-renewal
certbot renew --dry-run
```

### 7.4 Verify HTTPS

Open in browser:
- `https://yourdomain.com` (should show lock icon)
- `https://api.yourdomain.com` (should show lock icon)

---

## Step 8: WordPress Setup

### 8.1 Complete WordPress Installation

1. Visit: `https://api.yourdomain.com/wp-admin`
2. Choose language
3. Set site title: `SAK WoodWorks`
4. Create admin username and password
5. Install WooCommerce
6. Install WPGraphQL
7. Install WPGraphQL for WooCommerce

### 8.2 Configure Permalinks

1. Go to: **Settings** → **Permalinks**
2. Select: **Post name**
3. Click **Save Changes**

### 8.3 Verify Frontend

1. Visit: `https://yourdomain.com`
2. Check that:
   - Homepage loads
   - Products display
   - Navigation works
   - Cart functionality works

---

## Step 9: Setup Database Backups

### 9.1 Make Backup Script Executable

```bash
ssh root@<droplet-ip>
cd /var/www/sakwood
chmod +x scripts/backup-database.sh

# Test backup
./scripts/backup-database.sh
```

### 9.2 Setup Cron Job

```bash
# Edit crontab
crontab -e

# Add this line (backup runs daily at 2 AM)
0 2 * * * /var/www/sakwood/scripts/backup-database.sh >> /var/www/sakwood/backups/backup.log 2>&1
```

### 9.3 Verify Backup Schedule

```bash
# List crontab
crontab -l

# Check backups directory
ls -la /var/www/sakwood/backups/
```

---

## Step 10: Test GitHub Actions Deployment

### 10.1 Commit and Push Changes

From your local machine:

```bash
# Make a small change to test
echo "# Test deployment" >> README.md

# Commit and push
git add .
git commit -m "test: deployment test"
git push origin main
```

### 10.2 Monitor Deployment

1. Go to GitHub repository
2. Click **Actions** tab
3. Click on the running workflow
4. View deployment logs

### 10.3 Verify Deployment

After workflow completes:
```bash
# On droplet
cd /var/www/sakwood
git log -1  # Should show latest commit
docker ps    # All containers running
```

---

## Monitoring & Maintenance

### Check Resource Usage

```bash
# Run monitoring script
cd /var/www/sakwood
./scripts/monitor-resources.sh

# Or manually check
docker stats
free -h
df -h
```

### View Logs

```bash
# Container logs
docker-compose -f docker-compose.prod.yml logs -f

# Nginx logs
tail -f /var/log/nginx/sakwood_*.log

# Backup logs
tail -f /var/www/sakwood/backups/backup.log
```

### Database Backup

**Manual backup:**
```bash
cd /var/www/sakwood
./scripts/backup-database.sh
```

**Restore from backup:**
```bash
# List backups
ls -la /var/www/sakwood/backups/

# Extract and restore
gunzip /var/www/sakwood/backups/wordpress_backup_YYYYMMDD_HHMMSS.sql.gz
docker exec -i sak_db mysql -u root -p"${MYSQL_ROOT_PASSWORD}" wordpress < /var/www/sakwood/backups/wordpress_backup_YYYYMMDD_HHMMSS.sql
```

### Update Application

**Automated (recommended):**
```bash
# Push to GitHub, automatic deployment
git push origin main
```

**Manual:**
```bash
# On droplet
cd /var/www/sakwood
git pull origin main
docker-compose -f docker-compose.prod.yml up -d --build
docker system prune -f
```

---

## Troubleshooting

### Containers Not Starting

```bash
# Check logs
docker logs sak_frontend
docker logs sak_wp
docker logs sak_db

# Restart containers
docker-compose -f docker-compose.prod.yml restart
```

### SSL Certificate Issues

```bash
# Check certificates
certbot certificates

# Renew manually
certbot renew

# Reinstall certificate
certbot --nginx -d yourdomain.com --force-renewal
```

### Out of Memory (2GB Droplet)

If you experience memory issues:

```bash
# Check memory usage
free -h
docker stats

# Restart containers
docker-compose -f docker-compose.prod.yml restart

# Consider upgrading droplet size if persistent issues
```

### GitHub Actions Deployment Failed

1. Check GitHub Actions logs for errors
2. Verify droplet SSH access: `ssh root@<droplet-ip>`
3. Check GitHub secrets are correct
4. Verify droplet has internet access

### Database Connection Issues

```bash
# Check database container
docker ps | grep sak_db

# Check database logs
docker logs sak_db

# Verify environment variables
cat /var/www/sakwood/.env | grep MYSQL
```

---

## Security Checklist

- [ ] Strong passwords generated and set in `.env`
- [ ] Firewall configured (ports 22, 80, 443 only)
- [ ] SSL certificates installed and valid
- [ ] SSH key authentication configured
- [ ] Database backups automated
- [ ] WordPress admin secured (consider IP restriction)
- [ ] Regular updates applied: `apt update && apt upgrade -y`

---

## Resource Limits (2GB Droplet)

The deployment is optimized for a 2GB droplet:

| Service    | Memory Limit | Memory Reservation |
|------------|--------------|-------------------|
| Database   | 768M         | 512M              |
| WordPress  | 512M         | 256M              |
| Frontend   | 512M         | 256M              |
| **Total**  | **1.75GB**   | **~1GB**          |

**Remaining ~250MB** for system processes.

**When to Upgrade:**
- Consistent memory usage > 80%
- Slow page load times
- Frequent container restarts

---

## Cost Summary

**Monthly Costs:**
- DigitalOcean Droplet (2GB): $24
- Domain registration: ~$10-15/year
- **Total**: ~$24/month (excluding domain)

**Optional:**
- Cloud backup storage (DigitalOcean Spaces): ~$5/month
- CDN (Cloudflare): Free tier available
- Monitoring (UptimeRobot): Free tier available

---

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review container logs: `docker-compose -f docker-compose.prod.yml logs`
3. Check Nginx error logs: `/var/log/nginx/sakwood_*_error.log`
4. Verify environment variables: `cat /var/www/sakwood/.env`

---

## Success Criteria

✅ **Deployment Complete When:**

1. Frontend loads at `https://yourdomain.com`
2. WordPress admin accessible at `https://api.yourdomain.com/wp-admin`
3. SSL certificates valid (lock icon in browser)
4. Products display correctly
5. Cart and checkout functional
6. Database backups scheduled (verify: `crontab -l`)
7. GitHub Actions deployment tested
8. Resource usage acceptable (< 80% memory)

---

## Next Steps

After successful deployment:

1. **Add monitoring**: Set up UptimeRobot or Pingdom
2. **Configure email**: Set up WordPress email for order notifications
3. **Payment gateway**: Configure PromptPay payment
4. **Upload products**: Add products via WooCommerce
5. **Test checkout**: Complete full purchase flow
6. **Analytics**: Add Google Analytics or Plausible
7. **Performance**: Consider Cloudflare CDN

---

**Congratulations! Your Sakwood e-commerce site is now live on DigitalOcean! 🎉**
