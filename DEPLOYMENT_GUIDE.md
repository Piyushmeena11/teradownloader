# 🚀 TeraDownloader - Deployment Guide

Complete guide for deploying TeraDownloader to production.

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Production server (VPS, Cloud, etc.)
- Domain name (optional but recommended)
- SSL certificate (recommended for HTTPS)

---

## 🏗️ Build Process

### Step 1: Build the Client

```bash
cd client
npm install
npm run build
```

This creates an optimized production build in `client/dist/`

### Step 2: Install Server Dependencies

```bash
cd server
npm install --production
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=3002
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

**Important:** Replace `yourdomain.com` with your actual domain.

---

## 🚀 Deployment Options

### Option 1: Express Static (Simple)

Update `server/index.js` to serve static files:

```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
```

Then start the server:
```bash
cd server
npm start
```

### Option 2: Nginx Reverse Proxy (Recommended)

Configure Nginx as reverse proxy:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Client (React app)
    location / {
        root /path/to/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # API
    location /api {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🔒 SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (already configured)
sudo certbot renew --dry-run
```

---

## 📦 Process Management

### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
cd server
pm2 start index.js --name teradownloader-api

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

### PM2 Commands

```bash
# View logs
pm2 logs teradownloader-api

# Restart application
pm2 restart teradownloader-api

# Stop application
pm2 stop teradownloader-api

# Monitor
pm2 monit
```

---

## ✅ Production Checklist

- [ ] Environment variables configured
- [ ] Client built (`npm run build`)
- [ ] Server dependencies installed
- [ ] SSL certificate configured (if using HTTPS)
- [ ] Domain DNS configured
- [ ] CORS origins updated in `.env`
- [ ] Rate limiting tested
- [ ] Error logging configured
- [ ] Process manager (PM2) set up
- [ ] Monitoring set up (optional)
- [ ] Backup strategy in place
- [ ] Firewall configured

---

## 🧪 Testing

### 1. Test API Endpoints

```bash
curl http://localhost:3002/api/health
```

### 2. Test Client Build

```bash
cd client
npm run preview
```

### 3. Run Lighthouse Audit

- Open Chrome DevTools
- Go to Lighthouse tab
- Run audit
- Expected scores:
  - Performance: 70-90+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 100

---

## 🐛 Troubleshooting

### Port Already in Use

**Windows:**
```bash
netstat -ano | findstr :3002
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -ti:3002 | xargs kill -9
```

### Build Errors

```bash
# Clear cache and rebuild
cd client
rm -rf node_modules dist
npm install
npm run build
```

### CORS Issues

- Check `ALLOWED_ORIGINS` in `.env`
- Ensure frontend URL matches exactly
- Check browser console for CORS errors
- Verify HTTPS/HTTP protocol matches

### Server Not Starting

- Check Node.js version: `node --version` (should be 18+)
- Verify all dependencies installed: `npm install`
- Check server logs: `pm2 logs teradownloader-api`
- Verify port is not in use

---

## 📊 Monitoring

### PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# View logs
pm2 logs teradownloader-api --lines 100

# View process info
pm2 show teradownloader-api
```

### System Resources

```bash
# CPU and Memory usage
top
htop  # if installed

# Disk usage
df -h

# Network connections
netstat -tulpn
```

---

## 🔄 Updates & Maintenance

### Updating the Application

```bash
# Pull latest changes
git pull origin main

# Rebuild client
cd client
npm install
npm run build

# Restart server
pm2 restart teradownloader-api
```

### Backup Strategy

1. **Code Backup**: Use Git (already configured)
2. **Database Backup**: N/A (stateless application)
3. **Configuration Backup**: Backup `.env` file securely
4. **Logs Backup**: Archive PM2 logs periodically

---

## 📞 Support

For deployment issues:
- Check server logs: `pm2 logs teradownloader-api`
- Check browser console for client errors
- Check network tab for API errors
- Review this guide for common issues

---

**Ready for Production! 🚀**
