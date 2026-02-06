# Sakwood DigitalOcean Deployment Script (PowerShell)
# This script helps deploy the Sakwood application to a DigitalOcean Droplet

# Error handling
$ErrorActionPreference = "Stop"

# Configuration
# IMPORTANT: Update these variables before running the script
$DROPLET_IP = "your-droplet-ip"
$DROPLET_USER = "root"
$DOMAIN = "yourdomain.com"
$API_SUBDOMAIN = "api.yourdomain.com"

# Local paths
$PROJECT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path
$DEPLOY_PATH = "/var/www/sakwood"

Write-Host "========================================" -ForegroundColor Green
Write-Host "Sakwood DigitalOcean Deployment Script" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check if .env.production exists
if (-not (Test-Path "$PROJECT_DIR\.env.production")) {
    Write-Host "Error: .env.production file not found!" -ForegroundColor Red
    Write-Host "Please create .env.production from the template and update it with your values."
    exit 1
}

# Prompt user to verify configuration
Write-Host "Please verify the following configuration:" -ForegroundColor Yellow
Write-Host "Droplet IP: $DROPLET_IP"
Write-Host "Domain: $DOMAIN"
Write-Host "API Subdomain: $API_SUBDOMAIN"
Write-Host ""
$confirmation = Read-Host "Is this configuration correct? (yes/no)"

if ($confirmation -ne "yes") {
    Write-Host "Deployment aborted. Please update the configuration in this script." -ForegroundColor Red
    exit 1
}

# Test SSH connection
Write-Host "Testing SSH connection to droplet..." -ForegroundColor Yellow
try {
    $sshTest = ssh -o ConnectTimeout=10 "${DROPLET_USER}@${DROPLET_IP}" "echo 'Connection successful'" 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "SSH connection failed"
    }
} catch {
    Write-Host "Error: Cannot connect to droplet via SSH" -ForegroundColor Red
    Write-Host "Please ensure:"
    Write-Host "1. The droplet IP is correct"
    Write-Host "2. SSH keys are properly configured"
    Write-Host "3. The droplet is accessible"
    Write-Host "4. SSH client is installed and in PATH"
    exit 1
}
Write-Host "SSH connection successful!" -ForegroundColor Green
Write-Host ""

# Step 1: Create necessary directories on droplet
Write-Host "Step 1: Creating directories on droplet..." -ForegroundColor Yellow
ssh "${DROPLET_USER}@${DROPLET_IP}" "mkdir -p $DEPLOY_PATH"
Write-Host "Directories created" -ForegroundColor Green
Write-Host ""

# Step 2: Upload files to droplet using rsync or scp
Write-Host "Step 2: Uploading files to droplet..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..."

# Try using rsync if available, otherwise use scp
$useRsync = $false
try {
    $null = Get-Command rsync -ErrorAction Stop
    $useRsync = $true
} catch {
    Write-Host "rsync not found, using scp instead..." -ForegroundColor Yellow
}

if ($useRsync) {
    Write-Host "Using rsync for faster transfer..."
    rsync -avz --exclude='.git' `
          --exclude='node_modules' `
          --exclude='.next' `
          --exclude='frontend/node_modules' `
          --exclude='frontend/.next' `
          --exclude='*.log' `
          --exclude='.env.local' `
          --exclude='.env' `
          "$PROJECT_DIR/" `
          "${DROPLET_USER}@${DROPLET_IP}:${DEPLOY_PATH}/"
} else {
    Write-Host "Using scp for file transfer..."
    # Create a temporary tarball
    $tempTar = "$env:TEMP\sakwood-deploy.tar.gz"
    Write-Host "Creating deployment package..."

    # Using tar if available (Windows 10+ includes tar)
    tar -czf "$tempTar" `
        --exclude='.git' `
        --exclude='node_modules' `
        --exclude='.next' `
        --exclude='frontend/node_modules' `
        --exclude='frontend/.next' `
        --exclude='*.log' `
        --exclude='.env.local' `
        --exclude='.env' `
        -C "$PROJECT_DIR" .

    # Upload the tarball
    Write-Host "Uploading to droplet..."
    scp "$tempTar" "${DROPLET_USER}@${DROPLET_IP}:/tmp/sakwood-deploy.tar.gz"

    # Extract on the droplet
    Write-Host "Extracting files on droplet..."
    ssh "${DROPLET_USER}@${DROPLET_IP}" `
        "rm -rf ${DEPLOY_PATH}/* && `
         tar -xzf /tmp/sakwood-deploy.tar.gz -C $DEPLOY_PATH && `
         rm /tmp/sakwood-deploy.tar.gz"

    # Clean up local tarball
    Remove-Item "$tempTar" -Force
}

Write-Host "Files uploaded successfully" -ForegroundColor Green
Write-Host ""

# Step 3: Set up environment file
Write-Host "Step 3: Setting up environment file..." -ForegroundColor Yellow
ssh "${DROPLET_USER}@${DROPLET_IP}" `
    "cp $DEPLOY_PATH/.env.production $DEPLOY_PATH/.env"
Write-Host "Environment file created" -ForegroundColor Green
Write-Host ""

# Step 4: Update nginx configuration with actual domain
Write-Host "Step 4: Updating nginx configuration..." -ForegroundColor Yellow
ssh "${DROPLET_USER}@${DROPLET_IP}" `
    "sed -i 's/yourdomain.com/$DOMAIN/g' $DEPLOY_PATH/nginx/frontend.conf && `
     sed -i 's/api.yourdomain.com/$API_SUBDOMAIN/g' $DEPLOY_PATH/nginx/wordpress.conf"
Write-Host "Nginx configuration updated" -ForegroundColor Green
Write-Host ""

# Step 5: Deploy nginx configs
Write-Host "Step 5: Deploying nginx configuration..." -ForegroundColor Yellow
ssh "${DROPLET_USER}@${DROPLET_IP}" `
    "cp $DEPLOY_PATH/nginx/frontend.conf /etc/nginx/sites-available/sakwood-frontend && `
     cp $DEPLOY_PATH/nginx/wordpress.conf /etc/nginx/sites-available/sakwood-wordpress && `
     ln -sf /etc/nginx/sites-available/sakwood-frontend /etc/nginx/sites-enabled/ && `
     ln -sf /etc/nginx/sites-available/sakwood-wordpress /etc/nginx/sites-enabled/ && `
     rm -f /etc/nginx/sites-enabled/default && `
     nginx -t"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Nginx configuration deployed and tested" -ForegroundColor Green
    ssh "${DROPLET_USER}@${DROPLET_IP}" "systemctl reload nginx"
    Write-Host "Nginx reloaded" -ForegroundColor Green
} else {
    Write-Host "Nginx configuration test failed. Please check the configuration." -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 6: Stop existing containers and start new ones
Write-Host "Step 6: Starting Docker containers..." -ForegroundColor Yellow
ssh "${DROPLET_USER}@${DROPLET_IP}" `
    "cd $DEPLOY_PATH && `
     docker-compose -f docker-compose.prod.yml down 2>/dev/null || true && `
     docker-compose -f docker-compose.prod.yml up -d"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Docker containers started" -ForegroundColor Green
} else {
    Write-Host "Failed to start Docker containers" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 7: Wait for containers to be ready
Write-Host "Step 7: Waiting for containers to be ready..." -ForegroundColor Yellow
ssh "${DROPLET_USER}@${DROPLET_IP}" `
    "cd $DEPLOY_PATH && `
     sleep 10 && `
     docker ps"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Deployment completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Set up SSL certificates:"
Write-Host "   ssh ${DROPLET_USER}@${DROPLET_IP}"
Write-Host "   certbot --nginx -d $DOMAIN -d www.$DOMAIN"
Write-Host "   certbot --nginx -d $API_SUBDOMAIN"
Write-Host ""
Write-Host "2. Check container logs:"
Write-Host "   ssh ${DROPLET_USER}@${DROPLET_IP}"
Write-Host "   cd $DEPLOY_PATH"
Write-Host "   docker-compose -f docker-compose.prod.yml logs -f"
Write-Host ""
Write-Host "3. Test your site:"
Write-Host "   https://$DOMAIN"
Write-Host "   https://$API_SUBDOMAIN/wp-admin"
Write-Host ""
