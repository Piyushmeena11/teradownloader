import { useState } from 'react';
import { Link, Download, Loader2, AlertCircle, Info } from 'lucide-react';

export default function DownloadForm({ onDownload, onGetInfo, loading, error, onReset }) {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateUrl = (inputUrl) => {
    if (!inputUrl || !inputUrl.trim()) return false;
    
    // Normalize URL - trim whitespace
    let normalizedUrl = inputUrl.trim();
    
    // Remove any trailing slashes or spaces
    normalizedUrl = normalizedUrl.replace(/\/+$/, '').trim();
    
    // Very flexible validation - just check if it contains terabox domain and /s/ or sharing
    const hasTeraboxDomain = /(terabox|1024terabox|1024tera)\.(com|app)/i.test(normalizedUrl);
    const hasSharePath = /\/s\/|\/share\/|\/sharing\/link/i.test(normalizedUrl);
    
    // If it has both, it's likely a valid Terabox link
    if (hasTeraboxDomain && hasSharePath) {
      return true;
    }
    
    // More specific patterns for exact matching
    const teraboxPatterns = [
      // Standard format: https://terabox.com/s/xxxxx (accepts any characters after /s/)
      /https?:\/\/(www\.)?(terabox|1024terabox|1024tera)\.(com|app)\/s\/.+/i,
      // Share format
      /https?:\/\/(www\.)?(terabox|1024terabox|1024tera)\.(com|app)\/share\/.+/i,
      // Sharing link format
      /https?:\/\/(www\.)?(terabox|1024terabox|1024tera)\.(com|app)\/sharing\/link/i,
      // Without protocol
      /(www\.)?(terabox|1024terabox|1024tera)\.(com|app)\/s\/.+/i,
      /(www\.)?(terabox|1024terabox|1024tera)\.(com|app)\/sharing\/link/i,
    ];
    
    return teraboxPatterns.some(pattern => pattern.test(normalizedUrl));
  };

  const normalizeUrl = (inputUrl) => {
    let normalized = inputUrl.trim();
    // Add https:// if missing
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized;
    }
    return normalized;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setIsValidUrl(false);
      return;
    }

    const isValid = validateUrl(url);
    setIsValidUrl(isValid);

    if (isValid) {
      const normalizedUrl = normalizeUrl(url);
      onDownload(normalizedUrl);
    }
  };

  const handleGetInfo = async (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setIsValidUrl(false);
      return;
    }

    const isValid = validateUrl(url);
    setIsValidUrl(isValid);

    if (isValid) {
      const normalizedUrl = normalizeUrl(url);
      onGetInfo(normalizedUrl);
    }
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (newUrl.trim()) {
      // Only validate if URL is long enough to be meaningful (at least 20 chars for a valid link)
      const trimmed = newUrl.trim();
      if (trimmed.length < 20) {
        setIsValidUrl(true); // Don't show error while typing
      } else {
        setIsValidUrl(validateUrl(newUrl));
      }
    } else {
      setIsValidUrl(true);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setIsValidUrl(validateUrl(text) || text.length < 10);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
            Terabox Share Link
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                id="url"
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder="https://terabox.com/s/... or terabox.com/sharing/link?surl=..."
                className={`input-field ${!isValidUrl ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                disabled={loading}
              />
              {!isValidUrl && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Please enter a valid Terabox share link
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handlePaste}
              className="btn-secondary whitespace-nowrap"
              disabled={loading}
            >
              Paste
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Now
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleGetInfo}
            disabled={loading || !url.trim()}
            className="btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Info className="w-5 h-5" />
            Get Info
          </button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-700">
        <h3 className="text-sm font-semibold text-blue-300 mb-2 flex items-center gap-2">
          <Info className="w-4 h-4" />
          How to use:
        </h3>
        <ol className="text-sm text-blue-200 space-y-1 list-decimal list-inside">
          <li>Copy the Terabox share link</li>
          <li>Paste it in the input field above</li>
          <li>Click "Download Now" to start downloading</li>
        </ol>
      </div>
    </div>
  );
}

