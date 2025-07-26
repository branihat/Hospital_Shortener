#!/bin/bash

# Hospital Shortener Deployment Script for HostGator VPS
# This script automates the deployment process

set -e  # Exit on any error

echo "🚀 Starting Hospital Shortener Deployment..."

# Configuration
APP_NAME="hospital_shortener"
APP_DIR="/var/www/$APP_NAME"
PYTHON_VERSION="3.11"
DOMAIN_NAME="chartwitch.com"  # Your actual domain

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run this script as root (use sudo)"
    exit 1
fi

print_status "Updating system packages..."
apt update && apt upgrade -y

print_status "Installing required system packages..."
apt install -y python3.11 python3.11-venv python3-pip nginx supervisor git curl

# Install Node.js for any frontend build requirements
print_status "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

print_status "Creating application directory..."
mkdir -p $APP_DIR
cd $APP_DIR

print_status "Setting up Python virtual environment..."
python3.11 -m venv venv
source venv/bin/activate

print_status "Copying application files..."
# Copy your application files here
# In production, you'd typically clone from a git repository
cp -r /path/to/your/hospital_shortener/* $APP_DIR/

print_status "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

print_status "Setting up environment variables..."
if [ ! -f .env ]; then
    print_warning "Creating .env file - PLEASE UPDATE WITH YOUR ACTUAL VALUES!"
    cat > .env << EOF
# IMPORTANT: Update these values with your actual credentials!

# API Keys
GEMINI_API_KEY=your_gemini_api_key_here
MONGO_URI=your_mongodb_uri_here

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=$(openssl rand -base64 32)

# Stripe Configuration
STRIPE_PUBLIC_KEY=your_stripe_public_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PRICE_ID=your_stripe_price_id_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

# Security
SECRET_KEY=$(openssl rand -base64 32)

# Email Configuration
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_specific_password
MAIL_DEFAULT_SENDER=noreply@$DOMAIN_NAME
EOF
fi

print_status "Setting up Nginx configuration..."
cat > /etc/nginx/sites-available/$APP_NAME << EOF
server {
    listen 80;
    server_name $DOMAIN_NAME www.$DOMAIN_NAME;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

    # Static files
    location /static {
        alias $APP_DIR/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://127.0.0.1:8000/debug;
        access_log off;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

print_status "Setting up Supervisor configuration..."
cat > /etc/supervisor/conf.d/$APP_NAME.conf << EOF
[program:$APP_NAME]
command=$APP_DIR/venv/bin/gunicorn --bind 127.0.0.1:8000 --workers 2 --timeout 120 --access-logfile /var/log/$APP_NAME/access.log --error-logfile /var/log/$APP_NAME/error.log wsgi:app
directory=$APP_DIR
user=www-data
autostart=true
autorestart=true
stdout_logfile=/var/log/$APP_NAME/supervisor.log
stderr_logfile=/var/log/$APP_NAME/supervisor_error.log
environment=PATH="$APP_DIR/venv/bin"
EOF

print_status "Creating log directories..."
mkdir -p /var/log/$APP_NAME
chown -R www-data:www-data /var/log/$APP_NAME

print_status "Setting correct permissions..."
chown -R www-data:www-data $APP_DIR
chmod -R 755 $APP_DIR

print_status "Testing Nginx configuration..."
nginx -t

print_status "Starting services..."
systemctl restart nginx
systemctl enable nginx

supervisorctl reread
supervisorctl update
supervisorctl start $APP_NAME

print_status "Setting up SSL certificate with Let's Encrypt..."
apt install -y certbot python3-certbot-nginx
certbot --nginx -d $DOMAIN_NAME -d www.$DOMAIN_NAME --non-interactive --agree-tos --email admin@$DOMAIN_NAME

print_status "Setting up firewall..."
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable

print_status "Creating backup script..."
cat > /usr/local/bin/backup_$APP_NAME.sh << EOF
#!/bin/bash
# Backup script for Hospital Shortener
BACKUP_DIR="/var/backups/$APP_NAME"
DATE=\$(date +%Y%m%d_%H%M%S)

mkdir -p \$BACKUP_DIR

# Backup application files
tar -czf \$BACKUP_DIR/app_\$DATE.tar.gz -C $APP_DIR .

# Backup database (if using local MongoDB)
# mongodump --out \$BACKUP_DIR/db_\$DATE

# Keep only last 7 days of backups
find \$BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: \$DATE"
EOF

chmod +x /usr/local/bin/backup_$APP_NAME.sh

# Add to crontab for daily backups
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup_$APP_NAME.sh") | crontab -

print_status "✅ Deployment completed successfully!"
print_warning "⚠️  IMPORTANT NEXT STEPS:"
echo ""
echo "1. Update the .env file with your actual credentials:"
echo "   nano $APP_DIR/.env"
echo ""
echo "2. Update the domain name in this script and re-run if needed"
echo ""
echo "3. Check application status:"
echo "   supervisorctl status $APP_NAME"
echo ""
echo "4. View application logs:"
echo "   tail -f /var/log/$APP_NAME/error.log"
echo ""
echo "5. Test your application:"
echo "   curl -I http://$DOMAIN_NAME"
echo ""
echo "🎉 Your Hospital Shortener application should now be running at:"
echo "   https://$DOMAIN_NAME"
