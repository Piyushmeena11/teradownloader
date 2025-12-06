import { useState, useEffect } from 'react';
import { Download, X, CheckCircle, AlertCircle, Pause, Play } from 'lucide-react';

export default function DownloadProgress({ download, onCancel, onPause, onResume }) {
  const [progress, setProgress] = useState(download.progress || 0);
  const [speed, setSpeed] = useState(download.speed || 0);
  const [status, setStatus] = useState(download.status || 'pending');
  const [loaded, setLoaded] = useState(download.loaded || 0);
  const [total, setTotal] = useState(download.total || 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(download.progress || 0);
      setSpeed(download.speed || 0);
      setStatus(download.status || 'pending');
      setLoaded(download.loaded || 0);
      setTotal(download.total || 0);
    }, 200);

    return () => clearInterval(interval);
  }, [download]);

  const formatSpeed = (bytesPerSecond) => {
    if (!bytesPerSecond || bytesPerSecond === 0) return '0 B/s';
    const k = 1024;
    const sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
    const i = Math.floor(Math.log(bytesPerSecond) / Math.log(k));
    return Math.round(bytesPerSecond / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'paused':
        return <Pause className="w-5 h-5 text-yellow-500" />;
      default:
        return <Download className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {getStatusIcon()}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {download.fileInfo?.fileName || 'Downloading...'}
            </p>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-xs text-gray-400">
                {formatSpeed(speed)}
              </span>
              <span className="text-xs text-gray-400">
                {Math.round(progress)}%
              </span>
              {total > 0 && (
                <span className="text-xs text-gray-400">
                  {formatFileSize(loaded)} / {formatFileSize(total)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status === 'paused' && (
            <button
              onClick={onResume}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              aria-label="Resume"
            >
              <Play className="w-4 h-4 text-gray-300" />
            </button>
          )}
          {status === 'downloading' && (
            <button
              onClick={onPause}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              aria-label="Pause"
            >
              <Pause className="w-4 h-4 text-gray-300" />
            </button>
          )}
          {status !== 'completed' && (
            <button
              onClick={onCancel}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              aria-label="Cancel"
            >
              <X className="w-4 h-4 text-gray-300" />
            </button>
          )}
        </div>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            status === 'completed' ? 'bg-green-500' :
            status === 'error' ? 'bg-red-500' :
            status === 'paused' ? 'bg-yellow-500' :
            'bg-blue-500'
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}

