import { useState } from 'react';
import { Plus, X, Download } from 'lucide-react';

export default function BatchDownloadForm({ onBatchDownload }) {
  const [urls, setUrls] = useState(['']);
  const [isValidUrls, setIsValidUrls] = useState([true]);

  const validateUrl = (inputUrl) => {
    const teraboxPatterns = [
      /^https?:\/\/(www\.)?(terabox|1024tera)\.(com|app)\/s\/[\w-]+/i,
      /^https?:\/\/(www\.)?(terabox|1024tera)\.(com|app)\/share\/[\w-]+/i,
    ];
    return teraboxPatterns.some(pattern => pattern.test(inputUrl));
  };

  const addUrlField = () => {
    setUrls([...urls, '']);
    setIsValidUrls([...isValidUrls, true]);
  };

  const removeUrlField = (index) => {
    const newUrls = urls.filter((_, i) => i !== index);
    const newValid = isValidUrls.filter((_, i) => i !== index);
    setUrls(newUrls);
    setIsValidUrls(newValid);
  };

  const updateUrl = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);

    const newValid = [...isValidUrls];
    newValid[index] = !value.trim() || validateUrl(value) || value.length < 10;
    setIsValidUrls(newValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validUrls = urls.filter((url, index) => 
      url.trim() && isValidUrls[index] && validateUrl(url)
    );

    if (validUrls.length > 0) {
      onBatchDownload(validUrls);
    }
  };

  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Batch Download</h3>
        <button
          onClick={addUrlField}
          className="btn-secondary flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add URL
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {urls.map((url, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={url}
                onChange={(e) => updateUrl(index, e.target.value)}
                placeholder={`Terabox URL ${index + 1}`}
                className={`input-field ${!isValidUrls[index] ? 'border-red-500' : ''}`}
              />
            </div>
            {urls.length > 1 && (
              <button
                type="button"
                onClick={() => removeUrlField(index)}
                className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Remove URL"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download All ({urls.filter((url, i) => url.trim() && isValidUrls[i] && validateUrl(url)).length})
        </button>
      </form>
    </div>
  );
}

