[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Piyushmeena11/teradownloader)


# 🚀 TeraDownloader

<div align="center">

![TeraDownloader](https://img.shields.io/badge/TeraDownloader-v1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-Free-green?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-18%2B-brightgreen?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)

**A fast, secure, and completely free web application to download files from Terabox without requiring login or registration.**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Deployment](#-deployment) • [Contributing](#-contributing)

</div>

---

## 📖 Description

TeraDownloader is a modern, full-stack web application that allows users to download files from Terabox share links without the need for account registration or login. Built with React and Node.js, it provides a seamless, fast, and secure downloading experience with real-time progress tracking, batch downloads, and an intuitive dark-themed interface.

### Key Highlights

- ⚡ **Lightning Fast** - Optimized for maximum download speed
- 🔒 **Secure & Private** - No data storage, complete privacy
- 🎨 **Modern UI** - Beautiful dark theme with smooth animations
- 📊 **Real-time Tracking** - Live download progress and statistics
- 🚫 **No Registration** - Start downloading immediately
- 💯 **100% Free** - No hidden costs or premium features

---

## ✨ Features

### Core Functionality
- **Direct Downloads** - Download files directly from Terabox share links
- **Batch Processing** - Download multiple files simultaneously
- **File Preview** - Preview images and videos before downloading
- **Download Queue** - Manage and track all active downloads
- **Progress Tracking** - Real-time progress with speed indicators (MB/s)
- **Download History** - View completed and failed downloads
- **Statistics Dashboard** - Track total downloads, size, and success rate

### User Experience
- **Dark Theme** - Eye-friendly dark mode interface
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Multi-language Support** - English and Urdu language options
- **SEO Optimized** - Fully optimized for search engines
- **Fast Performance** - Optimized code with lazy loading and code splitting

### Technical Features
- **Security Headers** - Helmet.js for enhanced security
- **Rate Limiting** - Prevents abuse and ensures fair usage
- **Caching System** - Client and server-side caching for better performance
- **Error Handling** - Comprehensive error handling and user feedback
- **Input Validation** - Robust URL validation and sanitization

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Axios** - HTTP client for API requests
- **Cheerio** - Server-side HTML parsing
- **Helmet.js** - Security middleware

### Infrastructure
- **Compression** - Gzip compression for faster responses
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **Caching** - Multi-layer caching strategy

---

## 📦 Installation

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Git** (for cloning)

### Step 1: Clone the Repository

```bash
git clone https://github.com/hamzamuzamil/TeraDownloader.git
cd teradownloader
```

### Step 2: Install Dependencies

**Install Client Dependencies:**
```bash
cd client
npm install
```

**Install Server Dependencies:**
```bash
cd ../server
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=3002
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

### Step 4: Start Development Servers

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm start
```
Server will run on: `http://localhost:3002`

**Terminal 2 - Start Frontend Client:**
```bash
cd client
npm run dev
```
Client will run on: `http://localhost:3000`

---

## 🎯 Usage

### Basic Usage

1. **Copy a Terabox Share Link**
   - Format: `https://www.terabox.com/s/...` or `https://terabox.com/s/...`

2. **Paste the Link**
   - Navigate to the homepage
   - Paste the link in the input field

3. **Get File Information**
   - Click "Get Info" to preview file details
   - View file name, size, and type

4. **Download File**
   - Click "Download Now" to start downloading
   - Track progress in the download queue

### Batch Downloads

1. Enter multiple Terabox links (one per line)
2. Click "Batch Download"
3. Monitor all downloads in the queue

### Download Queue

- **Active Downloads** - See real-time progress, speed, and ETA
- **Download History** - View completed and failed downloads
- **Statistics** - Track total downloads, size, and success rate

---

## 🏗️ Project Structure

```
teradownloader/
├── client/                      # React frontend application
│   ├── public/                 # Static assets
│   │   ├── robots.txt          # SEO robots file
│   │   └── sitemap.xml         # SEO sitemap
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── DownloadForm.jsx
│   │   │   ├── DownloadQueue.jsx
│   │   │   ├── FilePreview.jsx
│   │   │   └── ...
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Blog.jsx
│   │   │   └── ...
│   │   ├── services/          # API and business logic
│   │   │   ├── downloadService.js
│   │   │   └── cacheService.js
│   │   ├── contexts/          # React contexts
│   │   │   └── ThemeContext.jsx
│   │   ├── data/             # Static data
│   │   │   └── blogPosts.jsx
│   │   ├── App.jsx           # Root component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css       # Global styles
│   ├── package.json
│   └── vite.config.js       # Vite configuration
│
├── server/                    # Node.js backend application
│   ├── services/             # Business logic services
│   │   ├── teraboxService.js # Terabox integration
│   │   └── cacheService.js   # Caching service
│   ├── middleware/           # Express middleware
│   │   ├── compression.js    # Response compression
│   │   └── rateLimiter.js    # Rate limiting
│   ├── index.js              # Server entry point
│   └── package.json
│
├── .gitignore                # Git ignore rules
├── README.md                 # This file
└── DEPLOYMENT_GUIDE.md       # Deployment instructions
```

---

## 🚀 Deployment

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Quick Deploy

1. **Build the Client:**
```bash
cd client
npm run build
```

2. **Set Production Environment:**
```bash
cd server
# Update .env file
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com
```

3. **Start the Server:**
```bash
npm start
```

### Production Recommendations

- Use **PM2** for process management
- Set up **Nginx** as reverse proxy
- Configure **SSL/HTTPS** with Let's Encrypt
- Enable **monitoring** and **logging**
- Set up **backup** strategy

---

## 🔒 Security Features

- ✅ **Helmet.js** - Security headers (CSP, XSS protection)
- ✅ **CORS** - Configured for specific origins
- ✅ **Input Sanitization** - URL and parameter validation
- ✅ **Rate Limiting** - Prevents abuse and DDoS
- ✅ **Body Size Limits** - Prevents large payload attacks
- ✅ **Error Handling** - Secure error messages
- ✅ **Content Security Policy** - XSS and injection protection

---

## ⚡ Performance Optimizations

- ✅ **Code Splitting** - React.lazy() for route-based splitting
- ✅ **Lazy Loading** - Images and components loaded on demand
- ✅ **Compression** - Gzip compression for responses
- ✅ **Caching** - Multi-layer caching (client + server)
- ✅ **Optimized Builds** - Terser minification, chunk splitting
- ✅ **Resource Hints** - Preconnect and DNS prefetch
- ✅ **Animation Optimization** - Reduced re-renders and intervals

---

## 📊 API Endpoints

### File Information
```
GET /api/info/:shareId
```
Get file information from a Terabox share ID.

### Stream Download
```
GET /api/stream/:shareId
```
Stream file download with progress tracking.

### Health Check
```
GET /api/health
```
Check server health status.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is free to use and modify. No license restrictions.

---

## 🙏 Acknowledgments

- Built with **React** and **Node.js**
- Icons by **Lucide React**
- Styled with **Tailwind CSS**
- Inspired by the need for fast, free file downloads

---

## 📞 Support

- **GitHub Issues**: [Open an issue](https://github.com/hamzamuzamil/TeraDownloader/issues)
- **Repository**: [View on GitHub](https://github.com/hamzamuzamil/TeraDownloader)

---

<div align="center">

**Made with ❤️ by Hamza for fast downloads**

⭐ Star this repo if you find it helpful!

</div>
