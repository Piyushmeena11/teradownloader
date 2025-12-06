import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { blogPosts } from '../data/blogPosts.jsx';

export default function Blog() {
  return (
    <>
      <SEOHead
        title="Blog - TeraDownloader | Terabox Downloader Tips, Guides & Updates"
        description="Read our blog for tips on downloading Terabox files, privacy guides, feature updates, and more. Learn how to use TeraDownloader effectively."
        keywords="terabox downloader blog, download terabox guide, terabox downloader tips, terabox downloader tutorial"
      />
      <div className="min-h-screen">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>

            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-6">
                <BookOpen className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                Blog & Updates
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Stay updated with the latest news, tips, and features about downloading Terabox files
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="glass-effect rounded-2xl p-6 hover:shadow-xl transition-all duration-300 dark:bg-gray-800/80 group block"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

