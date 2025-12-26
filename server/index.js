import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { downloadFromTerabox } from './services/teraboxService.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { serverCache } from './services/cacheService.js';
import compression from 'compression';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Security headers with Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration - restrict to specific origins in production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || ['https://teradownloader.com']
    : true, // Allow all in development
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Body parsing with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply compression middleware
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    // Compress all other responses
    return true;
  },
  level: 6,
  threshold: 1024,
}));

// Apply rate limiting to API routes
app.use('/api', rateLimiter.middleware());

// Input validation helper
function sanitizeUrl(url) {
  if (typeof url !== 'string') return null;
  return url.trim().replace(/[<>"']/g, '');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'TeraDownloader API is running',
    cache: {
      size: serverCache.cache.size,
      maxSize: serverCache.maxSize
    }
  });
});

// Main download endpoint - returns file info
app.post('/api/download', async (req, res) => {
  try {
    let { url } = req.body;

    if (!url) {
      return res.status(400).json({ 
        error: 'URL is required',
        success: false 
      });
    }

    // Sanitize and normalize URL
    url = sanitizeUrl(url);
    if (!url) {
      return res.status(400).json({ 
        error: 'Invalid URL format',
        success: false 
      });
    }

    // URL length limit
    if (url.length > 2048) {
      return res.status(400).json({ 
        error: 'URL too long',
        success: false 
      });
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    // Validate Terabox URL
    if (!isValidTeraboxUrl(url)) {
      return res.status(400).json({ 
        error: 'Invalid Terabox URL. Please provide a valid Terabox share link.',
        success: false 
      });
    }

    // Check cache first
    const cacheKey = serverCache.generateKey(url);
    const cached = serverCache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const result = await downloadFromTerabox(url);
    
    if (result.success) {
      const response = {
        success: true,
        downloadUrl: result.downloadUrl,
        fileName: result.fileName,
        fileSize: result.fileSize,
        fileType: result.fileType,
        shareId: result.shareId
      };
      
      // Cache successful responses
      serverCache.set(cacheKey, response);
      
      res.json(response);
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Failed to process download'
      });
    }
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// Streaming download endpoint - actually downloads and streams the file
app.get('/api/stream/:shareId', async (req, res) => {
  try {
    let { shareId } = req.params;
    const { fileName } = req.query;

    if (!shareId) {
      return res.status(400).json({ error: 'Share ID is required' });
    }

    // Sanitize shareId - only allow alphanumeric, hyphens, and underscores
    shareId = shareId.replace(/[^a-zA-Z0-9_-]/g, '');
    if (!shareId || shareId.length > 100) {
      return res.status(400).json({ error: 'Invalid share ID format' });
    }

    // Try multiple domains to find the file
    const domains = ['www.terabox.com', 'terabox.com', '1024terabox.com'];
    let actualDownloadUrl = null;
    let fileInfo = null;

    // Try each domain until we get a valid download URL
    for (const domain of domains) {
      try {
        const shareUrl = `https://${domain}/s/${shareId}`;
        const result = await downloadFromTerabox(shareUrl, false);
        
        if (result.success) {
          fileInfo = result;
          
          if (result.downloadUrl && result.downloadUrl.startsWith('http')) {
            actualDownloadUrl = result.downloadUrl;
            break;
          } else {
            // If we got file info but no direct URL, try to extract it from the share page
            const response = await axios.get(shareUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': `https://${domain}/`,
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
              },
              timeout: 30000,
              maxRedirects: 5
            });

            const html = response.data;
            
            // Try multiple extraction methods
            const extractionMethods = [
              // Method 1: JSON data in script tags
              () => {
                const jsonMatch = html.match(/"dlink":\s*"([^"]+)"/i) ||
                                 html.match(/"downloadUrl":\s*"([^"]+)"/i) ||
                                 html.match(/"download_url":\s*"([^"]+)"/i);
                if (jsonMatch && jsonMatch[1]) {
                  return jsonMatch[1].startsWith('http') ? jsonMatch[1] : `https://${domain}${jsonMatch[1]}`;
                }
                return null;
              },
              // Method 2: Direct file URLs
              () => {
                const fileMatch = html.match(/https?:\/\/[^"'\s]+\.(mp4|mp3|pdf|zip|rar|avi|mkv|mov|jpg|png|gif|doc|docx|txt|jpeg|webp)/i);
                if (fileMatch) return fileMatch[0];
                return null;
              },
              // Method 3: Terabox CDN URLs
              () => {
                const cdnMatch = html.match(/https?:\/\/[^"'\s]*d\.terabox[^"'\s]+/i) ||
                               html.match(/https?:\/\/[^"'\s]*terabox[^"'\s]*\/download[^"'\s]+/i);
                if (cdnMatch) return cdnMatch[0];
                return null;
              },
              // Method 4: Download button/link href
              () => {
                const hrefMatch = html.match(/href=["']([^"']*download[^"']*)["']/i) ||
                                 html.match(/href=["']([^"']*dlink[^"']*)["']/i);
                if (hrefMatch && hrefMatch[1]) {
                  const url = hrefMatch[1];
                  return url.startsWith('http') ? url : `https://${domain}${url}`;
                }
                return null;
              }
            ];

            for (const method of extractionMethods) {
              const url = method();
              if (url && url.startsWith('http')) {
                actualDownloadUrl = url;
                break;
              }
            }

            if (actualDownloadUrl) break;
          }
        }
      } catch (err) {
        console.error(`Error with domain ${domain}:`, err.message);
        continue;
      }
    }

    // If we still don't have a download URL, try alternative methods
    if (!actualDownloadUrl || actualDownloadUrl.startsWith('/api/')) {
      // Try to construct a direct download URL based on common Terabox patterns
      // Terabox sometimes uses: https://d.terabox.com/file/[path] or similar
      try {
        // Try accessing the share page and look for download button click handler
        const shareUrl = `https://www.terabox.com/s/${shareId}`;
        const pageResponse = await axios.get(shareUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Referer': 'https://www.terabox.com/'
          },
          timeout: 30000
        });

        const html = pageResponse.data;
        
        // Look for download API endpoints in the HTML
        const apiPatterns = [
          /\/api\/share\/download[^"'\s]+/i,
          /\/api\/file\/download[^"'\s]+/i,
          /download[^"'\s]*shareid[^"'\s]*=/i,
          /https?:\/\/[^"'\s]*terabox[^"'\s]*\/api[^"'\s]*download[^"'\s]+/i
        ];

        for (const pattern of apiPatterns) {
          const match = html.match(pattern);
          if (match && match[0]) {
            let url = match[0];
            if (!url.startsWith('http')) {
              url = `https://www.terabox.com${url}`;
            }
            // Test if this URL is accessible
            try {
              const testResponse = await axios.head(url, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                  'Referer': shareUrl
                },
                timeout: 5000,
                validateStatus: () => true
              });
              if (testResponse.status < 400) {
                actualDownloadUrl = url;
                break;
              }
            } catch (e) {
              continue;
            }
          }
        }
      } catch (err) {
        console.error('Alternative URL extraction failed:', err.message);
      }
    }

    // Final check - if we still don't have a valid URL, return helpful error
    if (!actualDownloadUrl || actualDownloadUrl.startsWith('/api/')) {
      return res.status(500).json({ 
        error: 'Unable to extract direct download URL from Terabox. This may be because:\n1. The file requires authentication\n2. The share link is private\n3. Terabox has changed their download mechanism\n\nYou can try downloading directly from the Terabox share page.',
        shareId: shareId,
        shareUrl: `https://www.terabox.com/s/${shareId}`,
        suggestion: 'Please visit the share link directly to download the file.'
      });
    }

    // Use the file name from fileInfo if available
    const finalFileName = fileName || fileInfo?.fileName || 'download';

    // Stream the file from Terabox to client
    try {
      const fileResponse = await axios({
        method: 'GET',
        url: actualDownloadUrl,
        responseType: 'stream',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://www.terabox.com/',
          'Accept': '*/*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'identity', // Don't compress, we're streaming
          'Connection': 'keep-alive',
          'Cache-Control': 'no-cache'
        },
        timeout: 300000, // 5 minutes timeout for large files
        maxRedirects: 10, // Allow more redirects
        validateStatus: function (status) {
          return status >= 200 && status < 400; // Accept redirects
        }
      });

      // Set response headers
      const contentDisposition = `attachment; filename="${encodeURIComponent(finalFileName)}"`;
      
      res.setHeader('Content-Disposition', contentDisposition);
      res.setHeader('Content-Type', fileResponse.headers['content-type'] || 'application/octet-stream');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      if (fileResponse.headers['content-length']) {
        res.setHeader('Content-Length', fileResponse.headers['content-length']);
      }

      // Handle errors in the stream
      fileResponse.data.on('error', (error) => {
        console.error('Stream error:', error);
        if (!res.headersSent) {
          res.status(500).json({ 
            error: 'Failed to stream file. Please try again.' 
          });
        } else {
          res.end();
        }
      });

      // Handle client disconnect
      req.on('close', () => {
        if (fileResponse.data && typeof fileResponse.data.destroy === 'function') {
          fileResponse.data.destroy();
        }
      });

      // Pipe the stream to client
      fileResponse.data.pipe(res);
      
      // Handle stream end
      fileResponse.data.on('end', () => {
        if (!res.headersSent) {
          res.end();
        }
      });
    } catch (streamError) {
      console.error('Stream error:', streamError);
      if (!res.headersSent) {
        const errorMessage = streamError.response?.status === 403 
          ? 'Access denied. The file may require authentication or the link may be expired.'
          : streamError.response?.status === 404
          ? 'File not found. The link may be invalid or expired.'
          : streamError.response?.status === 429
          ? 'Too many requests. Please wait a moment and try again.'
          : streamError.code === 'ECONNREFUSED' || streamError.code === 'ETIMEDOUT'
          ? 'Connection failed. Please check your internet connection and try again.'
          : `Failed to download file: ${streamError.message || 'Unknown error'}`;
        
        res.status(500).json({ 
          error: errorMessage,
          shareId: shareId,
          shareUrl: `https://www.terabox.com/s/${shareId}`
        });
      }
    }
  } catch (error) {
    console.error('Stream endpoint error:', error);
    res.status(500).json({
      error: error.message || 'Failed to stream download'
    });
  }
});

// Get file info without downloading
app.post('/api/info', async (req, res) => {
  try {
    let { url } = req.body;

    if (!url) {
      return res.status(400).json({ 
        error: 'URL is required',
        success: false 
      });
    }

    // Sanitize and normalize URL
    url = sanitizeUrl(url);
    if (!url) {
      return res.status(400).json({ 
        error: 'Invalid URL format',
        success: false 
      });
    }

    // URL length limit
    if (url.length > 2048) {
      return res.status(400).json({ 
        error: 'URL too long',
        success: false 
      });
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    if (!isValidTeraboxUrl(url)) {
      return res.status(400).json({ 
        error: 'Invalid Terabox URL',
        success: false 
      });
    }

    // Check cache first
    const cacheKey = serverCache.generateKey(`info_${url}`);
    const cached = serverCache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const result = await downloadFromTerabox(url, true);
    
    if (result.success) {
      const response = {
        success: true,
        fileName: result.fileName,
        fileSize: result.fileSize,
        fileType: result.fileType,
        shareId: result.shareId
      };
      
      // Cache successful responses
      serverCache.set(cacheKey, response);
      
      res.json(response);
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Failed to get file info'
      });
    }
  } catch (error) {
    console.error('Info error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

function isValidTeraboxUrl(url) {
  if (!url || typeof url !== 'string') return false;
  
  // Normalize URL - trim and add protocol if missing
  let normalizedUrl = url.trim();
  // Remove trailing slashes
  normalizedUrl = normalizedUrl.replace(/\/+$/, '');
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'https://' + normalizedUrl;
  }
  
  // Very flexible validation - check if it contains terabox domain and share path
  const hasTeraboxDomain = /(terabox|1024terabox|1024tera)\.(com|app)/i.test(normalizedUrl);
  const hasSharePath = /\/s\/|\/share\/|\/sharing\/link/i.test(normalizedUrl);
  
  if (hasTeraboxDomain && hasSharePath) {
    return true;
  }
  
  // More specific patterns for exact matching (accepts any characters after /s/)
  const teraboxPatterns = [
    // Standard format: https://terabox.com/s/xxxxx (accepts any characters)
    /https?:\/\/(www\.)?(terabox|1024terabox|1024tera)\.(com|app)\/s\/.+/i,
    // Share format
    /https?:\/\/(www\.)?(terabox|1024terabox|1024tera)\.(com|app)\/share\/.+/i,
    // Sharing link format
    /https?:\/\/(www\.)?(terabox|1024terabox|1024tera)\.(com|app)\/sharing\/link/i,
  ];
  
  return teraboxPatterns.some(pattern => pattern.test(normalizedUrl));
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

// Serve static files from React app (for production)
if (process.env.NODE_ENV === 'production') {
  // Try multiple possible paths for the dist folder
  const possiblePaths = [
    path.join(__dirname, '../client/dist'),
    path.join(process.cwd(), 'client/dist'),
    path.join(process.cwd(), '../client/dist')
  ];
  
  let distPath = null;
  for (const possiblePath of possiblePaths) {
    if (existsSync(possiblePath) && existsSync(path.join(possiblePath, 'index.html'))) {
      distPath = possiblePath;
      console.log(`✅ Found React build at: ${distPath}`);
      break;
    }
  }
  
  if (distPath) {
    app.use(express.static(distPath));
    
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
      // Don't serve React app for API routes
      if (req.path.startsWith('/api')) {
        return res.status(404).json({
          success: false,
          error: 'Endpoint not found'
        });
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    console.warn('⚠️  React build not found. Serving API only.');
    console.warn('   Searched paths:', possiblePaths);
    // 404 handler if build not found
    app.use((req, res) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({
          success: false,
          error: 'Endpoint not found'
        });
      }
      res.status(404).json({
        success: false,
        error: 'Frontend build not found. Please ensure the client was built successfully.'
      });
    });
  }
} else {
  // 404 handler for development (API only)
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: 'Endpoint not found'
    });
  });
}

app.listen(PORT, () => {
  console.log(`🚀 TeraDownloader API server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
