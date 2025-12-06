import { Share2, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function SocialShare({ url, title, description }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || window.location.href;
  const shareTitle = title || 'TeraDownloader - Download Terabox Files';
  const shareText = description || 'Download files from Terabox instantly!';

  const handleShare = async (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedText = encodeURIComponent(shareText);

    const shareLinks = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    if (shareLinks[platform]) {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-gray-600 dark:text-gray-400">Share:</span>
      
      {navigator.share && (
        <button
          onClick={handleNativeShare}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      )}

      <button
        onClick={() => handleShare('twitter')}
        className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4 text-blue-400" />
      </button>

      <button
        onClick={() => handleShare('facebook')}
        className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4 text-blue-600" />
      </button>

      <button
        onClick={() => handleShare('linkedin')}
        className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4 text-blue-700" />
      </button>

      <button
        onClick={handleCopy}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>
    </div>
  );
}

