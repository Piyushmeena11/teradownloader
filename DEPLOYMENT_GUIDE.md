# TeraDownloader - Deployment Guide

## ✅ All Issues Fixed

### 1. **Syntax Error Fixed**
- Fixed missing dependency array in `useCallback` for `handleBatchDownload`
- All React hooks properly configured

### 2. **Performance Optimizations**
- ✅ Code splitting with React.lazy()
- ✅ Lazy loading for all pages
- ✅ Optimized animations (reduced frequency)
- ✅ Image lazy loading
- ✅ Reduced update intervals (500ms → 1000ms)
- ✅ Build optimizations (Terser minification, chunk splitting)
- ✅ Compression middleware enabled
- ✅ Resource hints (preconnect, dns-prefetch)

### 3. **Security Enhancements**
- ✅ Helmet.js for security headers
- ✅ CORS properly configured (restrictive in production)
- ✅ Input sanitization (URL and shareId)
- ✅ URL length limits (2048 chars)
- ✅ ShareId validation (alphanumeric, hyphens, underscores only)
- ✅ Body size limits (10MB)
- ✅ Error handling middleware
- ✅ 404 handler
- ✅ Content Security Policy (CSP)
- ✅ Rate limiting (already implemented)

## 🚀 Deployment Steps

### Prerequisites
1. Node.js 18+ installed
2. npm or yarn package manager
3. Production server (VPS, Cloud, etc.)

### Step 1: Build the Client
```bash
cd client
npm install
npm run build
```

This creates an optimized production build in `client/dist/`

### Step 2: Prepare Server
```bash
cd server
npm install
```

### Step 3: Environment Variables
Create a `.env` file in the `server` directory:

```env
PORT=3002
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Step 4: Start Server
```bash
cd server
npm start
```

Or use PM2 for process management:
```bash
npm install -g pm2
pm2 start server/index.js --name teradownloader-api
pm2 save
pm2 startup
```

### Step 5: Serve Client (Option 1 - Express Static)
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

### Step 6: Serve Client (Option 2 - Nginx)
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

### Step 7: SSL/HTTPS (Recommended)
Use Let's Encrypt with Certbot:
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## 📊 Performance Checklist

- ✅ Code splitting implemented
- ✅ Lazy loading enabled
- ✅ Compression enabled
- ✅ Images optimized (lazy loading)
- ✅ Animations optimized
- ✅ Bundle size minimized
- ✅ Caching implemented
- ✅ Rate limiting active

## 🔒 Security Checklist

- ✅ Helmet.js security headers
- ✅ CORS configured
- ✅ Input sanitization
- ✅ URL validation
- ✅ Rate limiting
- ✅ Error handling
- ✅ CSP headers
- ✅ Body size limits

## 🧪 Testing

1. **Test API endpoints:**
   ```bash
   curl http://localhost:3002/api/health
   ```

2. **Test client build:**
   ```bash
   cd client
   npm run preview
   ```

3. **Run Lighthouse audit:**
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit
   - Expected scores:
     - Performance: 70-90+
     - Accessibility: 95+
     - Best Practices: 95+
     - SEO: 100

## 📝 Production Checklist

- [ ] Environment variables set
- [ ] Client built (`npm run build`)
- [ ] Server dependencies installed
- [ ] SSL certificate configured
- [ ] Domain DNS configured
- [ ] CORS origins updated
- [ ] Rate limiting tested
- [ ] Error logging configured
- [ ] Monitoring set up (optional)
- [ ] Backup strategy in place

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3002
taskkill /PID <PID> /F

# Linux/Mac
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

## 📞 Support

For issues or questions, check:
- Server logs: `pm2 logs teradownloader-api`
- Browser console for client errors
- Network tab for API errors

---

**Ready for Production! 🚀**


