import { useState, useEffect } from 'react';
import { Download, File, Video, Music, Image, FileText, Archive, X, Play } from 'lucide-react';
import { downloadManager } from '../services/downloadService';

export default function FilePreviewWithImage({ fileInfo, onReset }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // If it's an image, try to load preview
    if (fileInfo.fileType === 'image' && fileInfo.downloadUrl) {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => setImagePreview(img.src);
      img.onerror = () => setImageError(true);
      img.src = fileInfo.downloadUrl;
    }
  }, [fileInfo]);

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'video':
        return <Video className="w-8 h-8 text-red-500" />;
      case 'audio':
        return <Music className="w-8 h-8 text-purple-500" />;
      case 'image':
        return <Image className="w-8 h-8 text-green-500" />;
      case 'document':
        return <FileText className="w-8 h-8 text-blue-500" />;
      case 'archive':
        return <Archive className="w-8 h-8 text-orange-500" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const handleDownload = async () => {
    // Use the download manager for proper streaming
    if (fileInfo.shareId) {
      try {
        await downloadManager.downloadFile(fileInfo, () => {});
      } catch (error) {
        console.error('Download error:', error);
        // If download fails, try opening the share page as fallback
        const shareUrl = `https://www.terabox.com/s/${fileInfo.shareId}`;
        window.open(shareUrl, '_blank');
        alert('Direct download unavailable. Opening Terabox share page in a new tab. Please download from there.');
      }
    } else if (fileInfo.downloadUrl && fileInfo.downloadUrl.startsWith('http')) {
      window.open(fileInfo.downloadUrl, '_blank');
    } else {
      // Fallback: try to extract shareId from originalUrl
      if (fileInfo.originalUrl) {
        const shareIdMatch = fileInfo.originalUrl.match(/\/s\/([a-zA-Z0-9_-]+)/);
        if (shareIdMatch) {
          const shareUrl = `https://www.terabox.com/s/${shareIdMatch[1]}`;
          window.open(shareUrl, '_blank');
        }
      }
    }
  };

  return (
    <div className="mt-6 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-gray-700 animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-gray-700 p-3 rounded-lg shadow-md">
            {getFileIcon(fileInfo.fileType)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {fileInfo.fileName}
            </h3>
            <p className="text-sm text-gray-400">
              Size: {fileInfo.fileSize} • Type: {fileInfo.fileType}
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="text-gray-400 hover:text-gray-300 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Image Preview */}
      {fileInfo.fileType === 'image' && imagePreview && !imageError && (
        <div className="mb-4 rounded-lg overflow-hidden border border-gray-700 bg-gray-800 p-2">
          <img
            src={imagePreview}
            alt={fileInfo.fileName}
            className="w-full h-auto max-h-64 object-contain rounded"
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
          />
        </div>
      )}

      {/* Video Preview Placeholder */}
      {fileInfo.fileType === 'video' && fileInfo.downloadUrl && (
        <div className="mb-4 rounded-lg overflow-hidden border border-gray-200 bg-gray-900 aspect-video flex items-center justify-center">
          <div className="text-center text-white">
            <Play className="w-12 h-12 mx-auto mb-2 opacity-75" />
            <p className="text-sm">Video Preview Available</p>
            <p className="text-xs text-gray-400 mt-1">Click download to view</p>
          </div>
        </div>
      )}

      {fileInfo.downloadUrl ? (
        <button
          onClick={handleDownload}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download File
        </button>
      ) : (
        <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
          <p className="text-sm text-yellow-300">
            File information retrieved. Direct download link generation may require additional processing.
          </p>
        </div>
      )}
    </div>
  );
}

