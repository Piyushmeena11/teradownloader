# TeraDownloader - Testing Instructions

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Start Development Servers
```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3002

## 🔗 Test Links

### Main Application
- **Home Page**: http://localhost:3000
- **Features Page**: http://localhost:3000/features
- **About Page**: http://localhost:3000/about

### Footer Pages (Newly Added)
- **Privacy Policy**: http://localhost:3000/privacy
- **Terms of Service**: http://localhost:3000/terms
- **Cookie Policy**: http://localhost:3000/cookies
- **Blog**: http://localhost:3000/blog
- **Careers**: http://localhost:3000/careers

## ✅ Testing Checklist

### Dark Mode Toggle
1. Click the sun/moon icon in the header (top right)
2. Page should switch between light and dark themes
3. Refresh page - theme preference should persist

### Language Switcher
1. Click the globe icon in the header
2. Select a language (English, Spanish, French, Hindi, Arabic, Chinese, Japanese, Portuguese, German, Russian)
3. Page content should update immediately
4. Refresh page - language preference should persist

### Features Section
1. Scroll to "Powerful Features" section
2. Verify:
   - Professional card design with gradients
   - Hover effects (cards lift up, icons rotate)
   - Icon containers with gradient backgrounds
   - Smooth animations

### Footer Links
1. Click any footer link:
   - Privacy Policy
   - Terms of Service
   - Cookie Policy
   - Blog
   - Careers
2. Verify each page loads with proper content
3. Click "Back to Home" to return

### Download Functionality
1. Go to http://localhost:3000
2. Scroll to download section
3. Paste a Terabox share link (format: https://www.terabox.com/s/...)
4. Click "Download Now" or "Get Info"
5. Verify:
   - File information displays
   - Download progress (if applicable)
   - Batch download option works

### Responsive Design
1. Test on different screen sizes:
   - Mobile (320px - 767px)
   - Tablet (768px - 1023px)
   - Desktop (1024px+)
2. Verify:
   - Mobile menu works
   - All sections are readable
   - Buttons are clickable
   - Images scale properly

## 🐛 Troubleshooting

### Port Already in Use
If you see `EADDRINUSE` error:
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3002 -ErrorAction SilentlyContinue).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force
```

### Theme Not Working
- Clear browser cache
- Check browser console for errors
- Verify `localStorage` is enabled

### Language Not Changing
- Check browser console for errors
- Verify translations are loaded
- Try refreshing the page

## 📝 Test Terabox Link Format

Example Terabox share links to test:
```
https://www.terabox.com/s/xxxxxxxxxxxxx
https://www.terabox.com/share/xxxxxxxxxxxxx
```

**Note**: Replace `xxxxxxxxxxxxx` with an actual Terabox share ID for testing.

## 🎯 Key Features to Test

- ✅ Dark mode toggle
- ✅ Language switcher (10 languages)
- ✅ Professional Features section design
- ✅ All footer pages with content
- ✅ Download functionality
- ✅ Batch downloads
- ✅ Download history
- ✅ File preview
- ✅ Progress tracking
- ✅ Responsive design

---

**Happy Testing!** 🎉

