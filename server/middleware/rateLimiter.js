// Rate limiting middleware
class RateLimiter {
  constructor() {
    this.requests = new Map();
    this.maxRequests = 10; // Max requests per window
    this.windowMs = 60000; // 1 minute window
  }

  middleware() {
    return (req, res, next) => {
      const clientId = req.ip || req.connection.remoteAddress;
      const now = Date.now();

      if (!this.requests.has(clientId)) {
        this.requests.set(clientId, { count: 1, resetTime: now + this.windowMs });
        return next();
      }

      const clientData = this.requests.get(clientId);

      // Reset if window expired
      if (now > clientData.resetTime) {
        clientData.count = 1;
        clientData.resetTime = now + this.windowMs;
        return next();
      }

      // Check if limit exceeded
      if (clientData.count >= this.maxRequests) {
        const retryAfter = Math.ceil((clientData.resetTime - now) / 1000);
        return res.status(429).json({
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter
        });
      }

      // Increment count
      clientData.count++;
      next();
    };
  }

  // Cleanup old entries periodically
  cleanup() {
    const now = Date.now();
    for (const [clientId, data] of this.requests.entries()) {
      if (now > data.resetTime) {
        this.requests.delete(clientId);
      }
    }
  }
}

export const rateLimiter = new RateLimiter();

// Cleanup every 5 minutes
setInterval(() => rateLimiter.cleanup(), 5 * 60 * 1000);

