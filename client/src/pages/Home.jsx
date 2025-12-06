import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DownloadForm from '../components/DownloadForm';
import FilePreviewWithImage from '../components/FilePreviewWithImage';
import DownloadQueue from '../components/DownloadQueue';
import BatchDownloadForm from '../components/BatchDownloadForm';
import SocialShare from '../components/SocialShare';
import Testimonials from '../components/Testimonials';
import SEOHead from '../components/SEOHead';
import { downloadManager } from '../services/downloadService';
import { cacheService } from '../services/cacheService';
import { t, onLanguageChange } from '../services/i18n';
import { ArrowRight, Check, Zap, Shield, Globe, Download, Clock, Users, Eye, BarChart3, Server, Lock } from 'lucide-react';

export default function Home() {
  const [fileInfo, setFileInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloads, setDownloads] = useState([]);
  const [showBatch, setShowBatch] = useState(false);
  const [, setLangUpdate] = useState(0);

  useEffect(() => {
    const unsubscribe = onLanguageChange(() => {
      setLangUpdate(prev => prev + 1);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const updateDownloads = () => {
      const allDownloads = Array.from(downloadManager.downloads.values());
      setDownloads(allDownloads);
    };
    
    // Update immediately
    updateDownloads();
    
    // Update less frequently for better performance (1 second instead of 500ms)
    const interval = setInterval(updateDownloads, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = useCallback(async (url) => {
    setLoading(true);
    setError(null);
    setFileInfo(null);

    try {
      const cacheKey = cacheService.generateKey(url);
      let data = cacheService.get(cacheKey);

      if (!data) {
        const response = await fetch('/api/download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        data = await response.json();
        if (data.success) cacheService.set(cacheKey, data);
      }

      if (data.success) {
        setFileInfo(data);
        // Add original URL to fileInfo for shareId extraction if needed
        const fileInfoWithUrl = {
          ...data,
          originalUrl: url
        };
        // Start download with progress tracking
        const downloadId = await downloadManager.downloadFile(fileInfoWithUrl, (progress) => {
          // Update downloads state to show progress
          const allDownloads = Array.from(downloadManager.downloads.values());
          setDownloads(allDownloads);
        });
      } else {
        setError(data.error || 'Failed to process download');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGetInfo = useCallback(async (url) => {
    setLoading(true);
    setError(null);
    setFileInfo(null);

    try {
      const cacheKey = cacheService.generateKey(`info_${url}`);
      let data = cacheService.get(cacheKey);

      if (!data) {
        const response = await fetch('/api/info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        data = await response.json();
        if (data.success) cacheService.set(cacheKey, data);
      }

      if (data.success) {
        setFileInfo(data);
      } else {
        setError(data.error || 'Failed to get file info');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBatchDownload = useCallback(async (urls) => {
    setLoading(true);
    setError(null);
    for (const url of urls) {
      try {
        await handleDownload(url);
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (err) {
        console.error(`Failed to download ${url}:`, err);
      }
    }
    setLoading(false);
  }, [handleDownload]);

  const handleReset = useCallback(() => {
    setFileInfo(null);
    setError(null);
  }, []);

  return (
    <>
      <SEOHead
        title="TeraDownloader - Download Terabox Files Instantly | Free & Fast"
        description="Download files from Terabox without login. Fast, secure, and completely free. No registration required. Batch downloads, file preview, and download history."
        keywords="terabox downloader, download terabox files, terabox downloader free, download from terabox, terabox file downloader, free terabox downloader, terabox download without account, terabox downloader online, download terabox without login, terabox batch downloader"
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden container mx-auto px-4 py-20 md:py-32">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8 animate-fade-in">
            <Zap className="w-4 h-4" />
            <span>100% Free Forever • No Sign Up Required</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
              Download Terabox
            </span>
            <br />
            <span className="text-white">
              Files Instantly
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 max-w-3xl mx-auto font-light">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Fast, secure, and completely free. No login, no registration, no limits.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#download"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 text-lg"
            >
              <Download className="w-6 h-6" />
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/features"
              className="px-8 py-4 bg-gray-800/90 hover:bg-gray-700 text-gray-300 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-700 inline-flex items-center justify-center text-lg"
            >
              Explore Features
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            <StatCard icon={<Users className="w-8 h-8" />} value="50K+" label="Active Users" />
            <StatCard icon={<Download className="w-8 h-8" />} value="1M+" label="Downloads" />
            <StatCard icon={<Clock className="w-8 h-8" />} value="< 3s" label="Avg Speed" />
            <StatCard icon={<Zap className="w-8 h-8" />} value="99.9%" label="Uptime" />
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-6 md:p-8 shadow-2xl animate-slide-up bg-gray-800/80">
            <DownloadForm
              onDownload={handleDownload}
              onGetInfo={handleGetInfo}
              loading={loading}
              error={error}
              onReset={handleReset}
            />

            {fileInfo && (
              <FilePreviewWithImage
                fileInfo={fileInfo}
                onReset={handleReset}
              />
            )}

            <div className="mt-6">
              <button
                onClick={() => setShowBatch(!showBatch)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                {showBatch ? 'Hide' : 'Show'} Batch Download
              </button>
              {showBatch && (
                <BatchDownloadForm onBatchDownload={handleBatchDownload} />
              )}
            </div>

            {downloads.length > 0 && (
              <DownloadQueue
                downloads={downloads}
                onClear={() => {
                  downloadManager.clearHistory();
                  downloadManager.resetUserStats();
                  setDownloads([]);
                }}
              />
            )}

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <SocialShare />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Infinite Scroll */}
      <section id="features" className="container mx-auto px-4 py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-white break-words leading-relaxed" style={{ fontFamily: 'Arial, sans-serif', wordBreak: 'break-word' }}>
              {t('features.title')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
              Everything you need to download files from Terabox quickly and securely
            </p>
          </div>

          {/* Infinite Scroll Container */}
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex animate-scroll-right gap-6 md:gap-8" style={{ width: 'max-content' }}>
                {/* First set of features */}
                {[
                  { icon: <Zap className="w-10 h-10" />, title: t('features.fast'), description: "Download files at maximum speed with our optimized infrastructure and CDN network.", gradient: "from-yellow-400 to-orange-500" },
                  { icon: <Shield className="w-10 h-10" />, title: t('features.private'), description: "Your privacy is our priority. We don't store your files, data, or personal information.", gradient: "from-green-400 to-emerald-500" },
                  { icon: <Globe className="w-10 h-10" />, title: t('features.everywhere'), description: "Works seamlessly on desktop, tablet, and mobile devices. No app installation required.", gradient: "from-blue-400 to-cyan-500" },
                  { icon: <Download className="w-10 h-10" />, title: t('features.batch'), description: "Download multiple files at once with our batch download feature. Save time and effort.", gradient: "from-purple-400 to-pink-500" },
                  { icon: <Clock className="w-10 h-10" />, title: t('features.history'), description: "Access your complete download history anytime. Re-download files with a single click.", gradient: "from-indigo-400 to-purple-500" },
                  { icon: <Eye className="w-10 h-10" />, title: t('features.preview'), description: "Preview images and videos before downloading. Know exactly what you're getting.", gradient: "from-teal-400 to-cyan-500" },
                  { icon: <BarChart3 className="w-10 h-10" />, title: "Statistics", description: "Track your download activity with detailed statistics and performance metrics.", gradient: "from-rose-400 to-pink-500" },
                  { icon: <Server className="w-10 h-10" />, title: "Reliable", description: "Built on enterprise-grade infrastructure with 99.9% uptime guarantee.", gradient: "from-slate-400 to-gray-500" },
                  { icon: <Lock className="w-10 h-10" />, title: "Secure", description: "Advanced security features including rate limiting and abuse prevention.", gradient: "from-red-400 to-orange-500" }
                ].map((feature, index) => (
                  <Link key={`first-${index}`} to="/features" className="flex-shrink-0 w-80 md:w-96">
                    <FeatureCard
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      gradient={feature.gradient}
                    />
                  </Link>
                ))}
                {/* Duplicate for seamless loop */}
                {[
                  { icon: <Zap className="w-10 h-10" />, title: t('features.fast'), description: "Download files at maximum speed with our optimized infrastructure and CDN network.", gradient: "from-yellow-400 to-orange-500" },
                  { icon: <Shield className="w-10 h-10" />, title: t('features.private'), description: "Your privacy is our priority. We don't store your files, data, or personal information.", gradient: "from-green-400 to-emerald-500" },
                  { icon: <Globe className="w-10 h-10" />, title: t('features.everywhere'), description: "Works seamlessly on desktop, tablet, and mobile devices. No app installation required.", gradient: "from-blue-400 to-cyan-500" },
                  { icon: <Download className="w-10 h-10" />, title: t('features.batch'), description: "Download multiple files at once with our batch download feature. Save time and effort.", gradient: "from-purple-400 to-pink-500" },
                  { icon: <Clock className="w-10 h-10" />, title: t('features.history'), description: "Access your complete download history anytime. Re-download files with a single click.", gradient: "from-indigo-400 to-purple-500" },
                  { icon: <Eye className="w-10 h-10" />, title: t('features.preview'), description: "Preview images and videos before downloading. Know exactly what you're getting.", gradient: "from-teal-400 to-cyan-500" },
                  { icon: <BarChart3 className="w-10 h-10" />, title: "Statistics", description: "Track your download activity with detailed statistics and performance metrics.", gradient: "from-rose-400 to-pink-500" },
                  { icon: <Server className="w-10 h-10" />, title: "Reliable", description: "Built on enterprise-grade infrastructure with 99.9% uptime guarantee.", gradient: "from-slate-400 to-gray-500" },
                  { icon: <Lock className="w-10 h-10" />, title: "Secure", description: "Advanced security features including rate limiting and abuse prevention.", gradient: "from-red-400 to-orange-500" }
                ].map((feature, index) => (
                  <Link key={`second-${index}`} to="/features" className="flex-shrink-0 w-80 md:w-96">
                    <FeatureCard
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      gradient={feature.gradient}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* More Button */}
          <div className="text-center mt-12">
            <Link
              to="/features"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-[#1B2432] hover:from-yellow-500 hover:to-[#1B2432] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View All Features
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center glass-effect rounded-2xl p-12 dark:bg-gray-800/80">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {t('cta.subtitle')}
          </p>
          <Link
            to="#download"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-[#1B2432] hover:from-yellow-500 hover:to-[#1B2432] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {t('cta.button')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="glass-effect rounded-2xl p-6 text-center dark:bg-gray-800/80 hover:scale-105 transition-transform duration-300 border border-gray-200/50 dark:border-gray-700/50">
      <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
        {icon}
      </div>
      <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400 mb-2">{value}</div>
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }) {
  // Ensure consistent card height
  const gradientClasses = {
    'from-yellow-400 to-orange-500': 'from-yellow-400 to-orange-500',
    'from-green-400 to-emerald-500': 'from-green-400 to-emerald-500',
    'from-blue-400 to-cyan-500': 'from-blue-400 to-cyan-500',
    'from-purple-400 to-pink-500': 'from-purple-400 to-pink-500',
    'from-indigo-400 to-blue-500': 'from-indigo-400 to-blue-500',
    'from-red-400 to-rose-500': 'from-red-400 to-rose-500'
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
      {/* Gradient Background Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses[gradient]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      {/* Icon Container */}
      <div className={`relative mb-6 w-16 h-16 rounded-xl bg-gradient-to-br ${gradientClasses[gradient]} p-4 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg flex-shrink-0`}>
        <div className="text-white">
          {icon}
        </div>
      </div>
      
      {/* Content */}
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 break-words">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base flex-grow break-words">
        {description}
      </p>
      
      {/* Decorative Element */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientClasses[gradient]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
    </div>
  );
}

