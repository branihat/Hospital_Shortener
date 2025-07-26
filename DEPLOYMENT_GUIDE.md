# Hospital Shortener Deployment Guide

## Overview

This guide provides multiple deployment options for your Hospital Shortener Flask application. Since HostGator shared hosting doesn't support Python Flask applications, we'll cover the best alternatives.

## ⚠️ Important Note About HostGator

**HostGator Shared Hosting does NOT support Python Flask applications.** You'll need:
- HostGator VPS/Dedicated Server, OR
- Alternative Python-friendly hosting providers

## Deployment Options (Recommended Order)

### Option 1: DigitalOcean App Platform (Easiest) ⭐

**Pros**: Fully managed, automatic SSL, built-in monitoring, easy scaling
**Cost**: ~$5-12/month depending on resources

#### Steps:
1. **Create DigitalOcean Account**: [Sign up here](https://digitalocean.com)

2. **Prepare Your Code**: Push your code to GitHub/GitLab

3. **Create App**: 
   - Go to DigitalOcean → Apps → Create App
   - Connect your GitHub repository
   - Choose your branch (main/master)

4. **Configure Build Settings**:
   ```yaml
   # Add this to .do/app.yaml in your repository
   name: hospital-shortener
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/Hospital_Shortener
       branch: main
     run_command: gunicorn --worker-tmp-dir /dev/shm --config gunicorn.conf.py wsgi:app
     environment_slug: python
     instance_count: 1
     instance_size_slug: basic-xxs
     http_port: 8080
     envs:
     - key: GEMINI_API_KEY
       value: your_api_key_here
       type: SECRET
     - key: MONGO_URI
       value: your_mongodb_uri
       type: SECRET
     # Add all your environment variables here
   ```

5. **Deploy**: Click "Create Resources" - deployment takes ~5-10 minutes

### Option 2: Railway (Modern & Simple) ⭐

**Pros**: Git-based deployment, automatic previews, great for Python
**Cost**: $5/month for hobby plan

#### Steps:
1. **Create Railway Account**: [Sign up here](https://railway.app)

2. **Deploy from GitHub**:
   - Connect your GitHub account
   - Select your Hospital_Shortener repository
   - Railway automatically detects it's a Python app

3. **Add Environment Variables**:
   ```bash
   # In Railway dashboard, add these variables:
   GEMINI_API_KEY=your_api_key_here
   MONGO_URI=your_mongodb_uri
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_secure_password
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   SECRET_KEY=your_secret_key
   MAIL_SERVER=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USE_TLS=True
   MAIL_USERNAME=your_email@gmail.com
   MAIL_PASSWORD=your_app_password
   MAIL_DEFAULT_SENDER=noreply@yourdomain.com
   ```

4. **Custom Domain** (Optional):
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records as shown

### Option 3: Heroku (Traditional Choice)

**Pros**: Well-established, lots of documentation
**Cons**: More expensive, complex pricing

#### Steps:
1. **Install Heroku CLI**: [Download here](https://devcenter.heroku.com/articles/heroku-cli)

2. **Create Procfile**:
   ```
   web: gunicorn --config gunicorn.conf.py wsgi:app
   ```

3. **Deploy**:
   ```bash
   # Login to Heroku
   heroku login
   
   # Create app
   heroku create your-hospital-shortener
   
   # Set environment variables
   heroku config:set GEMINI_API_KEY=your_api_key_here
   heroku config:set MONGO_URI=your_mongodb_uri
   # ... add all environment variables
   
   # Deploy
   git push heroku main
   ```

### Option 4: HostGator VPS (If You Must Use HostGator)

**Requirements**: HostGator VPS or Dedicated Server plan
**Cost**: $30-80/month for VPS

#### Steps:
1. **Order HostGator VPS**: Get Ubuntu 20.04/22.04 LTS

2. **SSH into your server**:
   ```bash
   ssh root@your-server-ip
   ```

3. **Run the deployment script**:
   ```bash
   # Upload your code to the server first
   git clone https://github.com/your-username/Hospital_Shortener.git
   cd Hospital_Shortener
   
   # Edit the domain name in deploy.sh
   nano deploy.sh
   # Change: DOMAIN_NAME="yourdomain.com" to your actual domain
   
   # Make executable and run
   chmod +x deploy.sh
   sudo ./deploy.sh
   ```

4. **Configure environment variables**:
   ```bash
   # Edit the .env file with your actual values
   nano /var/www/hospital_shortener/.env
   ```

5. **Restart services**:
   ```bash
   sudo supervisorctl restart hospital_shortener
   sudo systemctl reload nginx
   ```

## Environment Variables Setup

**Required Environment Variables** (for all deployment options):

```env
# API Keys
GEMINI_API_KEY=your_gemini_api_key_here
MONGO_URI=your_mongodb_connection_string

# Admin Credentials
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_admin_password

# Stripe Configuration
STRIPE_PUBLIC_KEY=pk_live_or_test_key_here
STRIPE_SECRET_KEY=sk_live_or_test_key_here
STRIPE_PRICE_ID=price_your_price_id_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Security
SECRET_KEY=your_32_character_secret_key_here

# Email Configuration (Gmail example)
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_gmail_app_password
MAIL_DEFAULT_SENDER=noreply@yourdomain.com
```

## Database Setup (MongoDB)

### Option 1: MongoDB Atlas (Recommended)
1. **Create Account**: [Sign up at MongoDB Atlas](https://mongodb.com/atlas)
2. **Create Cluster**: Choose free tier (M0)
3. **Get Connection String**: Database → Connect → Connect your application
4. **Whitelist IPs**: Network Access → Add IP Address → Allow from anywhere (0.0.0.0/0)

### Option 2: Self-hosted MongoDB
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Create database and user
mongo
> use hospital_shortener
> db.createUser({user: "appuser", pwd: "secure_password", roles: ["readWrite"]})
```

## Domain Setup

### DNS Configuration
Point your domain to your hosting service:

**For DigitalOcean/Railway/Heroku**:
```
Type: CNAME
Name: www
Value: your-app-url.example.com

Type: A
Name: @
Value: IP address provided by hosting service
```

**For HostGator VPS**:
```
Type: A
Name: @
Value: your-vps-ip-address

Type: A
Name: www
Value: your-vps-ip-address
```

## SSL Certificate Setup

### Automatic (Recommended)
- **DigitalOcean/Railway/Heroku**: SSL is automatic
- **HostGator VPS**: Uses Let's Encrypt (handled by deploy script)

### Manual Setup (if needed)
```bash
# For HostGator VPS only
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Testing Your Deployment

### Health Check Endpoints
- `https://yourdomain.com/debug` - Basic system health
- `https://yourdomain.com/` - Landing page
- `https://yourdomain.com/login` - Login page

### Common Issues & Solutions

**1. Database Connection Failed**
```bash
# Check MongoDB URI format
mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
```

**2. Environment Variables Not Loading**
```bash
# Verify .env file exists and has correct permissions
ls -la .env
cat .env | head -5  # Don't expose secrets in production!
```

**3. Email Not Working**
```bash
# For Gmail, use App Passwords instead of regular password
# Go to: Google Account → Security → 2-Step Verification → App passwords
```

**4. Stripe Webhooks Failing**
```bash
# Update webhook endpoint in Stripe Dashboard
# Endpoint URL: https://yourdomain.com/webhook
# Events: checkout.session.completed
```

## Security Checklist

- [ ] Environment variables are set (not hardcoded)
- [ ] Admin credentials are secure
- [ ] Database has authentication enabled
- [ ] SSL certificate is installed
- [ ] Firewall is configured (for VPS)
- [ ] Regular backups are scheduled
- [ ] Monitoring is set up

## Performance Optimization

### For Production:
1. **Use Gunicorn with multiple workers**
2. **Enable database connection pooling**
3. **Set up Redis for session storage** (optional)
4. **Configure CDN for static files** (optional)
5. **Enable gzip compression**

## Monitoring & Maintenance

### Log Locations:
- **Application logs**: `/var/log/hospital_shortener/` (VPS)
- **Database logs**: Check MongoDB Atlas dashboard
- **Web server logs**: Hosting platform dashboard

### Backup Strategy:
- **Database**: Automated backups via MongoDB Atlas
- **Application**: Git repository + deployment artifacts
- **User uploads**: Regular file system backups (if any)

## Cost Estimates

| Option | Monthly Cost | Setup Time | Maintenance |
|--------|-------------|------------|-------------|
| DigitalOcean App | $5-12 | 15 minutes | Low |
| Railway | $5-20 | 10 minutes | Low |
| Heroku | $7-25+ | 20 minutes | Low |
| HostGator VPS | $30-80 | 2-4 hours | High |

## Getting Help

- **DigitalOcean**: [Community tutorials](https://digitalocean.com/community)
- **Railway**: [Documentation](https://docs.railway.app)
- **Heroku**: [Dev Center](https://devcenter.heroku.com)
- **HostGator**: Support tickets (if using VPS)

## Conclusion

**Recommended Path**: Start with **Railway** or **DigitalOcean App Platform** for easiest deployment. They're designed for Python applications and handle most infrastructure concerns automatically.

Only consider HostGator VPS if you specifically need to use HostGator's infrastructure, but be prepared for more complex setup and maintenance.
