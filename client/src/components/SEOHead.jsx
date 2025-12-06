import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEOHead({ title, description, keywords, image, type = 'website' }) {
  const location = useLocation();
  const baseUrl = 'https://teradownloader.com';
  const currentUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title || 'TeraDownloader - Download Terabox Files Instantly | Free & Fast';

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description || 'Download files from Terabox instantly without login. Fast, secure, and completely free. No registration required.');
    updateMetaTag('keywords', keywords || 'terabox downloader, download terabox files, terabox downloader free, download from terabox, terabox file downloader, free terabox downloader');
    updateMetaTag('author', 'TeraDownloader');
    updateMetaTag('robots', 'index, follow');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:image', image || `${baseUrl}/og-image.jpg`, true);
    updateMetaTag('og:site_name', 'TeraDownloader', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image || `${baseUrl}/og-image.jpg`);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Structured Data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'TeraDownloader',
      description: description || 'Download files from Terabox instantly without login. Fast, secure, and completely free.',
      url: baseUrl,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '1250'
      }
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [title, description, keywords, image, type, currentUrl]);

  return null;
}


