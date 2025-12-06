import { Download, File, Video, Music, Image, FileText, Archive, X } from 'lucide-react';

export default function FilePreview({ fileInfo, onReset }) {
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

  const handleDownload = () => {
    if (fileInfo.downloadUrl) {
      // If it's a proxy URL, we'll open it in a new tab
      // Otherwise, trigger direct download
      if (fileInfo.downloadUrl.startsWith('/api/proxy/') || fileInfo.downloadUrl.startsWith('http')) {
        window.open(fileInfo.downloadUrl, '_blank');
      } else {
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = fileInfo.downloadUrl;
        link.download = fileInfo.fileName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-blue-200 animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-lg shadow-md">
            {getFileIcon(fileInfo.fileType)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {fileInfo.fileName}
            </h3>
            <p className="text-sm text-gray-600">
              Size: {fileInfo.fileSize} • Type: {fileInfo.fileType}
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {fileInfo.downloadUrl ? (
        <button
          onClick={handleDownload}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download File
        </button>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            File information retrieved. Direct download link generation may require additional processing.
          </p>
        </div>
      )}
    </div>
  );
}

