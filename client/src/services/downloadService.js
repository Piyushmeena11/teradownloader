// Download service with progress tracking
export class DownloadManager {
  constructor() {
    this.downloads = new Map();
    this.queue = [];
    this.maxConcurrent = 3;
    this.activeDownloads = 0;
  }

  async downloadFile(fileInfo, onProgress) {
    const downloadId = Date.now().toString();
    const startTime = Date.now();

    const download = {
      id: downloadId,
      fileInfo,
      progress: 0,
      speed: 0,
      status: 'pending',
      startTime,
      lastTime: startTime,
      lastLoaded: 0,
      onProgress,
      loaded: 0,
      total: 0
    };

    this.downloads.set(downloadId, download);
    this.queue.push(downloadId);

    this.processQueue();

    return downloadId;
  }

  async processQueue() {
    while (this.activeDownloads < this.maxConcurrent && this.queue.length > 0) {
      const downloadId = this.queue.shift();
      const download = this.downloads.get(downloadId);
      
      if (download && download.status === 'pending') {
        this.activeDownloads++;
        this.startDownload(download);
      }
    }
  }

  async startDownload(download) {
    try {
      download.status = 'downloading';
      download.onProgress?.({
        progress: 0,
        speed: 0,
        status: 'downloading',
        loaded: 0,
        total: 0
      });

      // Use streaming endpoint for actual download
      let shareId = download.fileInfo.shareId;
      
      // If shareId is not available, try to extract from downloadUrl
      if (!shareId && download.fileInfo.downloadUrl) {
        shareId = extractShareIdFromUrl(download.fileInfo.downloadUrl);
      }
      
      // If still no shareId, try to extract from the original URL
      if (!shareId && download.fileInfo.originalUrl) {
        shareId = extractShareIdFromUrl(download.fileInfo.originalUrl);
      }
      
      if (!shareId) {
        throw new Error('Unable to extract share ID. Please try again.');
      }

      const streamUrl = `/api/stream/${shareId}?fileName=${encodeURIComponent(download.fileInfo.fileName)}`;
      
      const response = await fetch(streamUrl, {
        method: 'GET',
        headers: {
          'Accept': '*/*'
        }
      });
      
      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = `Download failed: ${response.statusText}`;
        let shareUrl = null;
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          }
          if (errorData.shareUrl) {
            shareUrl = errorData.shareUrl;
          }
        } catch (e) {
          // If JSON parsing fails, use status text
        }
        
        // If we have a share URL, open it in a new tab as fallback
        if (shareUrl) {
          window.open(shareUrl, '_blank');
          throw new Error('Direct download unavailable. Opening Terabox share page in a new tab. Please download from there.');
        }
        
        throw new Error(errorMessage);
      }

      const contentLength = response.headers.get('content-length');
      download.total = contentLength ? parseInt(contentLength, 10) : 0;

      const reader = response.body.getReader();
      const chunks = [];
      let receivedLength = 0;

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        chunks.push(value);
        receivedLength += value.length;
        download.loaded = receivedLength;

        // Calculate progress
        if (download.total > 0) {
          download.progress = Math.min((receivedLength / download.total) * 100, 100);
        } else {
          // Estimate progress if total is unknown
          download.progress = Math.min(download.progress + 1, 95);
        }

        // Calculate speed
        const now = Date.now();
        const timeDiff = (now - download.lastTime) / 1000;
        if (timeDiff > 0) {
          const loadedDiff = receivedLength - download.lastLoaded;
          download.speed = loadedDiff / timeDiff; // bytes per second
          download.lastTime = now;
          download.lastLoaded = receivedLength;
        }

        // Update progress
        if (download.onProgress) {
          download.onProgress({
            progress: download.progress,
            speed: download.speed,
            status: 'downloading',
            loaded: receivedLength,
            total: download.total
          });
        }
      }

      // Create blob and download
      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = download.fileInfo.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      download.progress = 100;
      download.status = 'completed';
      download.speed = 0;

      if (download.onProgress) {
        download.onProgress({
          progress: 100,
          speed: 0,
          status: 'completed',
          loaded: receivedLength,
          total: download.total
        });
      }

      this.activeDownloads--;
      this.processQueue();
      this.saveToHistory(download);
    } catch (error) {
      download.status = 'error';
      download.error = error.message;
      download.progress = 0;
      download.speed = 0;
      
      if (download.onProgress) {
        download.onProgress({
          progress: 0,
          speed: 0,
          status: 'error',
          error: error.message
        });
      }
      
      this.activeDownloads--;
      this.processQueue();
    }
  }

  saveToHistory(download) {
    const history = this.getHistory();
    const historyItem = {
      id: download.id,
      fileName: download.fileInfo.fileName,
      fileSize: download.fileInfo.fileSize,
      fileType: download.fileInfo.fileType,
      completedAt: new Date().toISOString(),
      status: download.status,
      error: download.error
    };

    history.unshift(historyItem);
    // Keep only last 50 downloads
    if (history.length > 50) {
      history.pop();
    }

    localStorage.setItem('downloadHistory', JSON.stringify(history));
    
    // Update user statistics
    this.updateUserStats(download);
  }

  updateUserStats(download) {
    // Get current user stats
    const stats = this.getUserStats();
    
    // Increment total downloads
    stats.totalDownloads += 1;
    
    // Update based on status
    if (download.status === 'completed') {
      stats.completed += 1;
      // Add file size to total
      const fileSizeBytes = this.parseFileSize(download.fileInfo.fileSize);
      stats.totalSizeBytes += fileSizeBytes;
    } else if (download.status === 'error') {
      stats.failed += 1;
    }
    
    // Save updated stats
    localStorage.setItem('userDownloadStats', JSON.stringify(stats));
  }

  getUserStats() {
    try {
      const stats = localStorage.getItem('userDownloadStats');
      if (stats) {
        return JSON.parse(stats);
      }
    } catch (e) {
      console.error('Error reading user stats:', e);
    }
    
    // Return default stats
    return {
      totalDownloads: 0,
      completed: 0,
      failed: 0,
      totalSizeBytes: 0
    };
  }

  resetUserStats() {
    localStorage.removeItem('userDownloadStats');
    return this.getUserStats();
  }

  getHistory() {
    try {
      return JSON.parse(localStorage.getItem('downloadHistory') || '[]');
    } catch {
      return [];
    }
  }

  clearHistory() {
    localStorage.removeItem('downloadHistory');
  }

  getDownloadStats() {
    // Get user-specific stats (per IP/session)
    const userStats = this.getUserStats();
    
    // Also get history for additional info
    const history = this.getHistory();
    
    return {
      totalDownloads: userStats.totalDownloads,
      completed: userStats.completed,
      failed: userStats.failed,
      totalSize: this.formatFileSize(userStats.totalSizeBytes),
      totalSizeBytes: userStats.totalSizeBytes
    };
  }

  parseFileSize(sizeStr) {
    if (!sizeStr || sizeStr === 'Unknown') return 0;
    const match = sizeStr.match(/([\d.]+)\s*([KMGT]?B)/i);
    if (!match) return 0;
    const value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();
    const multipliers = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4 };
    return value * (multipliers[unit] || 1);
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  formatSpeed(bytesPerSecond) {
    return this.formatFileSize(bytesPerSecond) + '/s';
  }

  cancelDownload(downloadId) {
    const download = this.downloads.get(downloadId);
    if (download) {
      if (download.abortController) {
        download.abortController.abort();
      }
      download.status = 'cancelled';
      this.activeDownloads--;
      this.processQueue();
    }
  }

  getDownload(downloadId) {
    return this.downloads.get(downloadId);
  }
}

function extractShareIdFromUrl(url) {
  if (!url) return null;
  const patterns = [
    /\/s\/([\w-]+)/,
    /\/share\/([\w-]+)/,
    /\/stream\/([\w-]+)/,
    /[?&]shareid=([\w-]+)/i,
    /[?&]surl=([\w-]+)/i
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export const downloadManager = new DownloadManager();
