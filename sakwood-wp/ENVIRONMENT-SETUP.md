# Environment Variables Setup Guide

## Overview

This project uses environment variables to manage sensitive configuration. After the security fixes, credentials are no longer hardcoded in `docker-compose.yml`.

## File Structure

```
sakwood-wp/
├── .env                          # Root environment variables (NEW - not in git)
├── .gitignore                    # Blocks .env files from being committed
├── docker-compose.yml            # Development (uses ${VAR} from .env)
├── docker-compose.prod.yml       # Production (uses ${VAR} from .env)
└── frontend/
    ├── .env.production           # Frontend production config (NEW - not in git)
    ├── .env.example              # Template file (safe to commit)
    └── .env.local                # Local development (not in git)
```

## Quick Setup

### 1. Root Environment Variables

The `.env` file at the project root contains database credentials:

```bash
# From sakwood-wp/ directory
cat > .env << 'EOF'
# Database Configuration
MYSQL_ROOT_PASSWORD=sakWW099
MYSQL_PASSWORD=sakWW099

# WordPress URLs
WORDPRESS_GRAPHQL_URL=https://wp.sakww.com/graphql
WORDPRESS_API_URL=https://wp.sakww.com/wp-json
WORDPRESS_REST_URL=https://wp.sakww.com/wp-json/sakwood/v1

# App Configuration
APP_NAME=SAK WoodWorks
APP_DESCRIPTION=Premium Construction Materials
NEXT_PUBLIC_ENABLE_CART=true
EOF
```

### 2. Frontend Environment Variables

The `frontend/.env.production` file contains frontend configuration:

```bash
# Already created - contains production URLs
# frontend/.env.production
```

### 3. Local Development

For local development, create `frontend/.env.local`:

```bash
cd frontend
cat > .env.local << 'EOF'
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=http://localhost:8006/graphql
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8006/wp-json/sakwood/v1
NEXT_PUBLIC_WORDPRESS_REST_URL=http://localhost:8006/wp-json/sakwood/v1
NEXT_PUBLIC_APP_NAME=SAK WoodWorks
NEXT_PUBLIC_APP_DESCRIPTION=Premium Construction Materials
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_CART=true
NEXT_PUBLIC_APP_PHONE="0997121071"
EOF
```

## Docker Compose Usage

### Development (Local)

```bash
# Uses docker-compose.yml with variables from .env
docker-compose up -d

# View logs
docker-compose logs -f
```

### Production (DigitalOcean)

```bash
# Uses docker-compose.prod.yml with variables from .env
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

## Security Best Practices

### ✅ What's Fixed

1. **No Hardcoded Passwords**: `docker-compose.yml` now uses `${MYSQL_PASSWORD}` instead of `sakWW099`
2. **.gitignore Updated**: Blocks all `.env` files from being committed
3. **Files Removed from Git**: `.env.production` and `frontend/.env.local` are no longer tracked

### ⚠️ Still in Git History

The old password `sakWW099` is still in your git history. For complete security:

#### Option 1: Rotate Password (Recommended)

```bash
# 1. Generate new strong password
NEW_PASSWORD=$(openssl rand -base64 32 | tr -d '/+=' | head -c 20)
echo $NEW_PASSWORD

# 2. Update .env file
sed -i "s/MYSQL_PASSWORD=.*/MYSQL_PASSWORD=$NEW_PASSWORD/" .env
sed -i "s/MYSQL_ROOT_PASSWORD=.*/MYSQL_ROOT_PASSWORD=$NEW_PASSWORD/" .env

# 3. Restart database container
docker-compose down db
docker-compose up -d db

# 4. Update WordPress container (it needs the new password too)
docker-compose down wordpress
docker-compose up -d wordpress
```

#### Option 2: Clean Git History (Advanced)

To remove the password from git history entirely:

```bash
# WARNING: This rewrites history - only do this if you're comfortable with git
# Use BFG Repo-Cleaner or git filter-repo

# Using git filter-repo (install first: pip install git-filter-repo)
git filter-repo --invert-paths --path docker-compose.yml

# Force push (WARNING: DANGEROUS - rewrites remote history)
git push origin --force
```

## Production Deployment Checklist

Before deploying to production:

- [ ] Update `.env` with strong, unique passwords
- [ ] Set `MYSQL_ROOT_PASSWORD` and `MYSQL_PASSWORD` to strong values
- [ ] Update `frontend/.env.production` with production URLs
- [ ] Verify `.gitignore` blocks `.env` files
- [ ] Test locally: `docker-compose -f docker-compose.prod.yml config`
- [ ] Commit security fixes: `git add .gitignore docker-compose.yml`
- [ ] Push to GitHub: `git push origin main`

## Variable Reference

### Root .env Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MYSQL_ROOT_PASSWORD` | MySQL root password | `sakWW099` |
| `MYSQL_PASSWORD` | MySQL wordpress user password | `sakWW099` |
| `WORDPRESS_GRAPHQL_URL` | WPGraphQL endpoint | `https://wp.sakww.com/graphql` |
| `WORDPRESS_API_URL` | WordPress REST API | `https://wp.sakww.com/wp-json` |
| `WORDPRESS_REST_URL` | Custom REST API | `https://wp.sakww.com/wp-json/sakwood/v1` |
| `APP_NAME` | Application name | `SAK WoodWorks` |
| `APP_DESCRIPTION` | App description | `Premium Construction Materials` |
| `NEXT_PUBLIC_ENABLE_CART` | Enable shopping cart | `true` |

### Frontend .env.production Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL` | WPGraphQL (public) | `https://wp.sakww.com/graphql` |
| `NEXT_PUBLIC_WORDPRESS_API_URL` | REST API (public) | `https://wp.sakww.com/wp-json/sakwood/v1` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL | `https://sakwood.com` |
| `NEXT_PUBLIC_APP_NAME` | Site name | `SAK WoodWorks` |
| `NEXT_PUBLIC_APP_PHONE` | Contact phone | `"0997121071"` |

## Troubleshooting

### Issue: "MYSQL_PASSWORD not set"

**Solution**: Ensure `.env` file exists in the project root with `MYSQL_PASSWORD` defined.

### Issue: "Database connection failed"

**Solution**:
1. Check `.env` passwords match between `MYSQL_ROOT_PASSWORD` and `MYSQL_PASSWORD`
2. Restart containers: `docker-compose down && docker-compose up -d`
3. Check logs: `docker-compose logs db`

### Issue: "Environment variables not loading"

**Solution**:
1. Verify `.env` file is in the same directory as `docker-compose.yml`
2. Check file permissions: `ls -la .env`
3. Test loading: `docker-compose config`

## Additional Resources

- [Docker Compose Environment Variables](https://docs.docker.com/compose/environment-variables/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [WordPress Security Best Practices](https://wordpress.org/documentation/article/hardening-wordpress/)
