// Server-side caching service
class ServerCache {
  constructor() {
    this.cache = new Map();
    this.maxAge = 5 * 60 * 1000; // 5 minutes
    this.maxSize = 100; // Max cache entries
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  set(key, data) {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clear() {
    this.cache.clear();
  }

  generateKey(url) {
    return `terabox_${Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9]/g, '')}`;
  }
}

export const serverCache = new ServerCache();

