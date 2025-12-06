import { useState, useEffect } from 'react';
import { Download, Trash2, Play, Pause, History } from 'lucide-react';
import DownloadProgress from './DownloadProgress';
import { downloadManager } from '../services/downloadService';

export default function DownloadQueue({ downloads, onClear }) {
  const [stats, setStats] = useState(downloadManager.getDownloadStats());
  const [history, setHistory] = useState(downloadManager.getHistory());

  useEffect(() => {
    // Update stats immediately
    setStats(downloadManager.getDownloadStats());
    setHistory(downloadManager.getHistory());
    
    // Update stats less frequently for better performance
    const interval = setInterval(() => {
      const newStats = downloadManager.getDownloadStats();
      const newHistory = downloadManager.getHistory();
      setStats(newStats);
      setHistory(newHistory);
    }, 1000); // Update every 1 second for better performance
    
    return () => clearInterval(interval);
  }, [downloads]); // Re-run when downloads change

  const activeDownloads = downloads.filter(d => 
    d.status === 'downloading' || d.status === 'pending'
  );
  const completedDownloads = history.slice(0, 5); // Show last 5 from history

  return (
    <div className="mt-6 space-y-4">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.totalDownloads}</div>
          <div className="text-xs text-gray-400 mt-1">Total Downloads</div>
        </div>
        <div className="glass-effect rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
          <div className="text-xs text-gray-400 mt-1">Completed</div>
        </div>
        <div className="glass-effect rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{stats.failed}</div>
          <div className="text-xs text-gray-400 mt-1">Failed</div>
        </div>
        <div className="glass-effect rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{stats.totalSize}</div>
          <div className="text-xs text-gray-400 mt-1">Total Size</div>
        </div>
      </div>

      {/* Active Downloads */}
      {activeDownloads.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Download className="w-5 h-5" />
              Active Downloads ({activeDownloads.length})
            </h3>
          </div>
          <div className="space-y-2">
            {activeDownloads.map((download) => (
              <DownloadProgress
                key={download.id}
                download={download}
                onCancel={() => downloadManager.cancelDownload(download.id)}
                onPause={() => {}}
                onResume={() => {}}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Downloads */}
      {completedDownloads.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <History className="w-5 h-5" />
              Recent Downloads ({completedDownloads.length})
            </h3>
            {onClear && (
              <button
                onClick={onClear}
                className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Clear History
              </button>
            )}
          </div>
          <div className="space-y-2">
            {completedDownloads.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-lg p-3 border border-gray-700 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="text-sm">
                    <p className="font-medium text-white truncate">{item.fileName}</p>
                    <p className="text-xs text-gray-400">
                      {item.fileSize} • {new Date(item.completedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <a
                  href={item.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

