# Setup Instructions

## Quick Start

### 1. Install Dependencies

Run this command from the root directory to install all dependencies:

```bash
npm run install:all
```

This will install:
- Root dependencies (concurrently)
- Server dependencies (Express, Axios, etc.)
- Client dependencies (React, Vite, Tailwind, etc.)

### 2. Start Development Servers

Run both frontend and backend simultaneously:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Manual Setup (Alternative)

If you prefer to set up manually:

### Server Setup
```bash
cd server
npm install
npm run dev
```

### Client Setup
```bash
cd client
npm install
npm run dev
```

## Production Build

### Build Frontend
```bash
npm run build
```

This creates an optimized production build in `client/dist/`

### Start Production Server
```bash
npm start
```

## Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=3001
NODE_ENV=production
```

## Troubleshooting

### Port Already in Use
If port 3000 or 3001 is already in use:
- Change the port in `client/vite.config.js` (frontend)
- Change the port in `server/.env` (backend)
- Update the proxy in `client/vite.config.js` if backend port changes

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm run install:all
```

### Build Errors
```bash
# Clear build cache
rm -rf client/dist client/.vite
npm run build
```

## System Requirements

- Node.js 18+ 
- npm 9+ or yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Next Steps

1. Test the application with a Terabox share link
2. Customize the UI colors in `client/tailwind.config.js`
3. Add your own branding
4. Deploy to your preferred hosting platform

---

**Need Help?** Check the README.md for more information.

