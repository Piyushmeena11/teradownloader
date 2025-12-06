// Compression middleware for responses
import compression from 'compression';

export const compressionMiddleware = compression({
  filter: (req, res) => {
    // Don't compress responses if this request header is present
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Use compression filter function
    return compression.filter(req, res);
  },
  level: 6, // Compression level (1-9, 6 is a good balance)
  threshold: 1024, // Only compress responses larger than 1KB
});

