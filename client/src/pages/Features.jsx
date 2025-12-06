import { Zap, Shield, Globe, Download, Clock, Eye, BarChart3, Server, Lock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Lightning Fast Downloads',
    description: 'Download files at maximum speed with our optimized infrastructure. Our CDN network ensures fast downloads from anywhere in the world.',
    benefits: ['Optimized servers', 'CDN network', 'Multi-threaded downloads', 'Smart caching'],
    gradient: 'from-yellow-400 to-orange-500',
    bgGradient: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: '100% Private & Secure',
    description: 'Your privacy is our top priority. We don\'t store your files, personal data, or browsing history. Everything is processed in real-time.',
    benefits: ['No data storage', 'Real-time processing', 'HTTPS encryption', 'Privacy-first approach'],
    gradient: 'from-green-400 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Works Everywhere',
    description: 'Access TeraDownloader from any device - desktop, tablet, or mobile. No app installation required, works directly in your browser.',
    benefits: ['Cross-platform', 'Mobile responsive', 'No installation', 'Browser-based'],
    gradient: 'from-blue-400 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
  },
  {
    icon: <Download className="w-8 h-8" />,
    title: 'Batch Downloads',
    description: 'Download multiple files simultaneously with our batch download feature. Save time and effort by processing multiple downloads at once.',
    benefits: ['Multiple files', 'Queue management', 'Progress tracking', 'Auto-processing'],
    gradient: 'from-purple-400 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Download History',
    description: 'Access your complete download history anytime. Re-download files with a single click and track your download statistics.',
    benefits: ['Complete history', 'Quick re-download', 'Statistics tracking', 'Local storage'],
    gradient: 'from-indigo-400 to-purple-500',
    bgGradient: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20'
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: 'File Preview',
    description: 'Preview images and videos before downloading. Know exactly what you\'re getting with our built-in preview feature.',
    benefits: ['Image preview', 'Video preview', 'File info', 'Type detection'],
    gradient: 'from-teal-400 to-cyan-500',
    bgGradient: 'from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20'
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Download Statistics',
    description: 'Track your download activity with detailed statistics. See total downloads, success rates, and total data transferred.',
    benefits: ['Real-time stats', 'Success tracking', 'Size calculation', 'Performance metrics'],
    gradient: 'from-rose-400 to-pink-500',
    bgGradient: 'from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20'
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: 'Reliable Infrastructure',
    description: 'Built on enterprise-grade infrastructure with 99.9% uptime guarantee. Your downloads are always available when you need them.',
    benefits: ['High availability', 'Auto-scaling', 'Load balancing', 'Monitoring'],
    gradient: 'from-slate-400 to-gray-500',
    bgGradient: 'from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20'
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Rate Limiting & Security',
    description: 'Advanced security features including rate limiting, request throttling, and abuse prevention to ensure fair usage for everyone.',
    benefits: ['Rate limiting', 'Abuse prevention', 'Fair usage', 'Secure API'],
    gradient: 'from-red-400 to-orange-500',
    bgGradient: 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20'
  }
];

export default function Features() {
  return (
    <>
      <SEOHead
        title="Features - TeraDownloader | Powerful Terabox Downloader Features"
        description="Explore powerful features of TeraDownloader: batch downloads, file preview, download history, progress tracking, and more. All features are free."
        keywords="terabox downloader features, download terabox features, terabox downloader capabilities, terabox downloader functions"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white break-words leading-relaxed" style={{ fontFamily: 'Arial, sans-serif', wordBreak: 'break-word' }}>
              Everything You Need
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Download files from Terabox quickly, securely, and efficiently with our comprehensive feature set
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br ${feature.bgGradient} rounded-2xl p-6 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col`}
                >
                  {/* Icon Container */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed min-h-[72px]">
                    {feature.description}
                  </p>
                  
                  {/* Benefits List */}
                  <ul className="space-y-2 mt-auto">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className={`w-4 h-4 text-green-500 flex-shrink-0`} />
                        <span className="break-words">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Decorative Element */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-300`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose TeraDownloader?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Compare our features with other downloaders
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What We Offer */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border-2 border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    What We Offer
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'No login required',
                    'Completely free',
                    'Fast downloads',
                    'Batch processing',
                    'Download history',
                    'File preview'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advanced Features */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Advanced Features
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Progress tracking',
                    'Speed indicators',
                    'Queue management',
                    'Statistics dashboard',
                    'Dark mode',
                    'Multi-language support'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 text-center border-2 border-blue-200 dark:border-blue-800">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1M+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Downloads Processed</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 text-center border-2 border-green-200 dark:border-green-800">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Free Forever</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 text-center border-2 border-purple-200 dark:border-purple-800">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">0</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Data Stored</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 text-center border-2 border-orange-200 dark:border-orange-800">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">99.9%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-400 to-[#1B2432] rounded-3xl p-12 text-center text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Ready to Experience These Features?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Start downloading files from Terabox today - it's free and takes just seconds!
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-white text-[#1B2432] font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
