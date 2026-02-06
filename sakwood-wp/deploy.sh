#!/bin/bash

# Sakwood DigitalOcean Deployment Script
# This script helps deploy the Sakwood application to a DigitalOcean Droplet

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
# IMPORTANT: Update these variables before running the script
DROPLET_IP="your-droplet-ip"
DROPLET_USER="root"
DOMAIN="yourdomain.com"
API_SUBDOMAIN="api.yourdomain.com"

# Local paths
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_PATH="/var/www/sakwood"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Sakwood DigitalOcean Deployment Script${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if .env.production exists
if [ ! -f "$PROJECT_DIR/.env.production" ]; then
    echo -e "${RED}Error: .env.production file not found!${NC}"
    echo "Please create .env.production from the template and update it with your values."
    exit 1
fi

# Prompt user to verify configuration
echo -e "${YELLOW}Please verify the following configuration:${NC}"
echo "Droplet IP: $DROPLET_IP"
echo "Domain: $DOMAIN"
echo "API Subdomain: $API_SUBDOMAIN"
echo ""
read -p "Is this configuration correct? (yes/no): " -r
echo ""

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo -e "${RED}Deployment aborted. Please update the configuration in this script.${NC}"
    exit 1
fi

# Test SSH connection
echo -e "${YELLOW}Testing SSH connection to droplet...${NC}"
if ! ssh -o ConnectTimeout=10 ${DROPLET_USER}@${DROPLET_IP} "echo 'Connection successful'" > /dev/null 2>&1; then
    echo -e "${RED}Error: Cannot connect to droplet via SSH${NC}"
    echo "Please ensure:"
    echo "1. The droplet IP is correct"
    echo "2. SSH keys are properly configured"
    echo "3. The droplet is accessible"
    exit 1
fi
echo -e "${GREEN}SSH connection successful!${NC}"
echo ""

# Step 1: Create necessary directories on droplet
echo -e "${YELLOW}Step 1: Creating directories on droplet...${NC}"
ssh ${DROPLET_USER}@${DROPLET_IP} "mkdir -p $DEPLOY_PATH"
echo -e "${GREEN}Directories created${NC}"
echo ""

# Step 2: Upload files to droplet
echo -e "${YELLOW}Step 2: Uploading files to droplet...${NC}"
echo "This may take a few minutes..."

# Create a temporary tarball of the project
TEMP_TAR="/tmp/sakwood-deploy.tar.gz"
echo "Creating deployment package..."
tar -czf "$TEMP_TAR" \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='frontend/node_modules' \
    --exclude='frontend/.next' \
    --exclude='*.log' \
    --exclude='.env.local' \
    --exclude='.env' \
    -C "$PROJECT_DIR" .

# Upload the tarball
echo "Uploading to droplet..."
scp "$TEMP_TAR" ${DROPLET_USER}@${DROPLET_IP}:/tmp/sakwood-deploy.tar.gz

# Extract on the droplet
echo "Extracting files on droplet..."
ssh ${DROPLET_USER}@${DROPLET_IP} \
    "rm -rf $DEPLOY_PATH/* && \
     tar -xzf /tmp/sakwood-deploy.tar.gz -C $DEPLOY_PATH && \
     rm /tmp/sakwood-deploy.tar.gz"

# Clean up local tarball
rm -f "$TEMP_TAR"

echo -e "${GREEN}Files uploaded successfully${NC}"
echo ""

# Step 3: Set up environment file
echo -e "${YELLOW}Step 3: Setting up environment file...${NC}"
ssh ${DROPLET_USER}@${DROPLET_IP} \
    "cp $DEPLOY_PATH/.env.production $DEPLOY_PATH/.env"
echo -e "${GREEN}Environment file created${NC}"
echo ""

# Step 4: Update nginx configuration with actual domain
echo -e "${YELLOW}Step 4: Updating nginx configuration...${NC}"
ssh ${DROPLET_USER}@${DROPLET_IP} \
    "sed -i 's/yourdomain.com/$DOMAIN/g' $DEPLOY_PATH/nginx/frontend.conf && \
     sed -i 's/api.yourdomain.com/$API_SUBDOMAIN/g' $DEPLOY_PATH/nginx/wordpress.conf"
echo -e "${GREEN}Nginx configuration updated${NC}"
echo ""

# Step 5: Deploy nginx configs
echo -e "${YELLOW}Step 5: Deploying nginx configuration...${NC}"
ssh ${DROPLET_USER}@${DROPLET_IP} \
    "cp $DEPLOY_PATH/nginx/frontend.conf /etc/nginx/sites-available/sakwood-frontend && \
     cp $DEPLOY_PATH/nginx/wordpress.conf /etc/nginx/sites-available/sakwood-wordpress && \
     ln -sf /etc/nginx/sites-available/sakwood-frontend /etc/nginx/sites-enabled/ && \
     ln -sf /etc/nginx/sites-available/sakwood-wordpress /etc/nginx/sites-enabled/ && \
     rm -f /etc/nginx/sites-enabled/default && \
     nginx -t"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Nginx configuration deployed and tested${NC}"
    ssh ${DROPLET_USER}@${DROPLET_IP} "systemctl reload nginx"
    echo -e "${GREEN}Nginx reloaded${NC}"
else
    echo -e "${RED}Nginx configuration test failed. Please check the configuration.${NC}"
    exit 1
fi
echo ""

# Step 6: Stop existing containers and start new ones
echo -e "${YELLOW}Step 6: Starting Docker containers...${NC}"
ssh ${DROPLET_USER}@${DROPLET_IP} \
    "cd $DEPLOY_PATH && \
     docker-compose -f docker-compose.prod.yml down 2>/dev/null || true && \
     docker-compose -f docker-compose.prod.yml up -d"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Docker containers started${NC}"
else
    echo -e "${RED}Failed to start Docker containers${NC}"
    exit 1
fi
echo ""

# Step 7: Wait for containers to be ready
echo -e "${YELLOW}Step 7: Waiting for containers to be ready...${NC}"
ssh ${DROPLET_USER}@${DROPLET_IP} \
    "cd $DEPLOY_PATH && \
     sleep 10 && \
     docker ps"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Set up SSL certificates:"
echo "   ssh ${DROPLET_USER}@${DROPLET_IP}"
echo "   certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "   certbot --nginx -d $API_SUBDOMAIN"
echo ""
echo "2. Check container logs:"
echo "   ssh ${DROPLET_USER}@${DROPLET_IP}"
echo "   cd $DEPLOY_PATH"
echo "   docker-compose -f docker-compose.prod.yml logs -f"
echo ""
echo "3. Test your site:"
echo "   https://$DOMAIN"
echo "   https://$API_SUBDOMAIN/wp-admin"
echo ""
