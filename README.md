# TeraDownloader

A fast, secure, and completely free web application to download files from Terabox without requiring login or registration.

## 🚀 Features

- **No Login Required** - Download files directly without creating an account
- **Fast Downloads** - Optimized infrastructure for maximum download speed
- **Batch Downloads** - Download multiple files at once
- **File Preview** - Preview images before downloading
- **Download History** - Track all your downloads
- **Real-time Progress** - See download progress with speed indicators
- **100% Free** - No hidden costs, completely free forever
- **Secure & Private** - We don't store your files or personal data

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Lucide React (Icons)

### Backend
- Node.js
- Express.js
- Axios
- Cheerio (HTML parsing)

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/hamzamuzamil/TeraDownloader.git
cd teradownloader
```

2. **Install dependencies**

For Client:
```bash
cd client
npm install
```

For Server:
```bash
cd server
npm install
```

3. **Start the development servers**

Terminal 1 - Start Server:
```bash
cd server
npm start
```

Terminal 2 - Start Client:
```bash
cd client
npm run dev
```

4. **Open your browser**
- Client: http://localhost:3000
- Server API: http://localhost:3002

## 🏗️ Project Structure

```
teradownloader/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── contexts/      # React contexts
│   └── package.json
├── server/                 # Node.js backend
│   ├── services/          # Business logic
│   ├── middleware/       # Express middleware
│   └── index.js          # Server entry point
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=3002
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

## 📱 Usage

1. Copy a Terabox share link
2. Paste it in the input field
3. Click "Download Now" or "Get Info"
4. Wait for the download to start
5. Track progress in the download queue

## 🚀 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deploy

1. Build the client:
```bash
cd client
npm run build
```

2. Start the server:
```bash
cd server
npm start
```

## 🔒 Security Features

- Helmet.js for security headers
- CORS configuration
- Input sanitization
- Rate limiting
- URL validation
- Content Security Policy (CSP)

## ⚡ Performance Optimizations

- Code splitting with React.lazy()
- Image lazy loading
- Response compression
- Client-side caching
- Server-side caching
- Optimized animations

## 📄 License

This project is free to use and modify.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue on GitHub.

## 🙏 Acknowledgments

- Built with React and Node.js
- Icons by Lucide React
- Styled with Tailwind CSS

---

**Build by Hamza for fast downloads**
