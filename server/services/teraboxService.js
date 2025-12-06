import axios from 'axios';
import * as cheerio from 'cheerio';

export async function downloadFromTerabox(url, infoOnly = false) {
  try {
    // Normalize URL - add https:// if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    // Extract share ID from URL
    const shareId = extractShareId(url);
    if (!shareId) {
      return { success: false, error: 'Invalid Terabox URL format' };
    }

    // Extract domain from original URL
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    const baseDomain = domain.replace(/^www\./, '');
    
    // Get the share page - use the original domain
    const sharePageUrl = `https://${domain}/s/${shareId}`;
    
    const response = await axios.get(sharePageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': `https://${baseDomain}/`,
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 30000,
      maxRedirects: 5
    });

    const $ = cheerio.load(response.data);
    
    // Try to extract file information from the page
    const fileName = extractFileName($, url, response.data);
    const fileSize = extractFileSize($, response.data);
    const fileType = extractFileType(fileName);
    
    // Get direct download link - improved extraction
    const downloadUrl = await getDirectDownloadUrl(shareId, $, url, response.data, domain);
    
    if (!downloadUrl && !infoOnly) {
      return { 
        success: false, 
        error: 'Could not generate download link. The file may be private or require authentication.' 
      };
    }

    return {
      success: true,
      downloadUrl: downloadUrl || null,
      fileName: fileName || 'download',
      fileSize: fileSize || 'Unknown',
      fileType: fileType || 'file',
      shareId: shareId
    };
  } catch (error) {
    console.error('Terabox service error:', error);
    return {
      success: false,
      error: error.message || 'Failed to process Terabox link'
    };
  }
}

function extractShareId(url) {
  const patterns = [
    /\/s\/([a-zA-Z0-9_-]+)/,
    /\/share\/([a-zA-Z0-9_-]+)/,
    /[?&]shareid=([a-zA-Z0-9_-]+)/i,
    /[?&]surl=([a-zA-Z0-9_-]+)/i,  // For sharing/link?surl= format
    /sharing\/link[?&]surl=([a-zA-Z0-9_-]+)/i
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractFileName($, url, html) {
  // Try multiple methods to extract filename
  let fileName = null;

  // Method 1: From meta tags
  fileName = $('meta[property="og:title"]').attr('content') ||
             $('meta[name="title"]').attr('content') ||
             $('title').text().trim();

  // Method 2: From page content - look for file name in various places
  if (!fileName || fileName.includes('Terabox') || fileName.includes('TeraBox')) {
    // Try to find file name in the HTML
    const namePatterns = [
      /"filename":\s*"([^"]+)"/i,
      /"file_name":\s*"([^"]+)"/i,
      /"name":\s*"([^"]+\.(pdf|mp4|mp3|zip|rar|doc|docx|txt|jpg|png|gif))"/i,
      /<h[1-6][^>]*>([^<]+\.(pdf|mp4|mp3|zip|rar|doc|docx|txt|jpg|png|gif))<\/h[1-6]>/i
    ];
    
    for (const pattern of namePatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        fileName = match[1];
        break;
      }
    }
  }

  // Method 3: From DOM elements
  if (!fileName || fileName.length < 3) {
    fileName = $('.file-name, .filename, [class*="name"], [class*="title"]').first().text().trim();
  }

  // Method 4: From URL
  if (!fileName || fileName.length < 3) {
    const urlMatch = url.match(/[^/]+$/);
    if (urlMatch) fileName = decodeURIComponent(urlMatch[0]);
  }

  // Clean filename
  if (fileName) {
    fileName = fileName.replace(/[<>:"/\\|?*]/g, '_').trim();
    // Remove "Terabox" or "TeraBox" from filename
    fileName = fileName.replace(/\s*-\s*Terabox.*$/i, '').trim();
  }

  return fileName || 'terabox_download';
}

function extractFileSize($, html) {
  // Try to extract from HTML first
  const sizePatterns = [
    /"size":\s*"([^"]+)"/i,
    /"file_size":\s*"([^"]+)"/i,
    /(\d+\.?\d*)\s*(KB|MB|GB|TB)/i
  ];
  
  for (const pattern of sizePatterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return match[1] + (match[2] || '');
    }
  }
  
  // Try from DOM
  const sizeText = $('.file-size, .size, [class*="size"]').first().text().trim();
  return sizeText || 'Unknown';
}

function extractFileType(fileName) {
  if (!fileName) return 'file';
  const ext = fileName.split('.').pop()?.toLowerCase();
  const typeMap = {
    'mp4': 'video', 'avi': 'video', 'mkv': 'video', 'mov': 'video', 'wmv': 'video', 'flv': 'video',
    'mp3': 'audio', 'wav': 'audio', 'flac': 'audio', 'aac': 'audio', 'ogg': 'audio',
    'jpg': 'image', 'jpeg': 'image', 'png': 'image', 'gif': 'image', 'webp': 'image', 'bmp': 'image',
    'pdf': 'document', 'doc': 'document', 'docx': 'document', 'txt': 'document', 'rtf': 'document',
    'zip': 'archive', 'rar': 'archive', '7z': 'archive', 'tar': 'archive', 'gz': 'archive'
  };
  return typeMap[ext] || 'file';
}

async function getDirectDownloadUrl(shareId, $, originalUrl, html, domain) {
  try {
    // Method 1: Extract from JavaScript variables in script tags
    const scripts = $('script').toArray();
    
    for (const script of scripts) {
      const scriptContent = $(script).html() || '';
      
      // Look for download URLs in various formats
      const downloadPatterns = [
        // JSON format
        /"dlink":\s*"([^"]+)"/i,
        /"downloadUrl":\s*"([^"]+)"/i,
        /"download_url":\s*"([^"]+)"/i,
        /downloadUrl["\s]*:["\s]*["']([^"']+)["']/i,
        /download["\s]*:["\s]*["']([^"']+)["']/i,
        // Direct file URLs
        /https?:\/\/[^"'\s]+\.(mp4|mp3|pdf|zip|rar|avi|mkv|mov|jpg|png|gif|doc|docx|txt|jpeg|webp)/i,
        // Terabox CDN URLs
        /https?:\/\/[^"'\s]*terabox[^"'\s]*\/[^"'\s]+/i,
        /https?:\/\/[^"'\s]*d\.terabox[^"'\s]+/i
      ];
      
      for (const pattern of downloadPatterns) {
        const match = scriptContent.match(pattern);
        if (match && match[1] && match[1].startsWith('http')) {
          return match[1];
        }
      }
    }
    
    // Method 2: Extract from HTML data attributes
    const downloadLink = $('a[href*="download"], a[href*="dlink"], button[data-url], [data-download-url]').first();
    if (downloadLink.length) {
      const href = downloadLink.attr('href') || 
                   downloadLink.attr('data-url') || 
                   downloadLink.attr('data-download-url');
      if (href && href.startsWith('http')) {
        return href;
      } else if (href && href.startsWith('/')) {
        return `https://${domain}${href}`;
      }
    }
    
    // Method 3: Look for download links in HTML content
    const htmlMatches = html.match(/href=["']([^"']*download[^"']*)["']/i) ||
                        html.match(/href=["']([^"']*dlink[^"']*)["']/i);
    if (htmlMatches && htmlMatches[1]) {
      const url = htmlMatches[1];
      if (url.startsWith('http')) {
        return url;
      } else if (url.startsWith('/')) {
        return `https://${domain}${url}`;
      }
    }
    
    // Method 4: Try to construct download URL (common Terabox pattern)
    // Some Terabox links use a pattern like: /api/download?shareid=xxx
    const downloadApiUrl = `https://${domain}/api/download?shareid=${shareId}`;
    
    // Return streaming endpoint as fallback - we'll handle it in the stream endpoint
    return `/api/stream/${shareId}`;
  } catch (error) {
    console.error('Error getting download URL:', error);
    return `/api/stream/${shareId}`;
  }
}
