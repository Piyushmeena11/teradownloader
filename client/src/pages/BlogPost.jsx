import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SocialShare from '../components/SocialShare';
import { blogPosts } from '../data/blogPosts.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | TeraDownloader Blog`}
        description={post.excerpt}
        keywords={post.keywords}
        type="article"
      />
      <article className="min-h-screen">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>

            <div className="glass-effect rounded-2xl p-8 md:p-12 dark:bg-gray-800/80">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4">
                  {post.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:text-gray-900 dark:prose-headings:text-white 
                prose-p:text-gray-700 dark:prose-p:text-gray-300 
                prose-strong:text-gray-900 dark:prose-strong:text-white 
                prose-ul:text-gray-700 dark:prose-ul:text-gray-300 
                prose-ol:text-gray-700 dark:prose-ol:text-gray-300 
                prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
                prose-a:text-blue-600 dark:prose-a:text-blue-400
                prose-table:border-collapse prose-table:w-full
                prose-th:bg-blue-50 dark:prose-th:bg-gray-800 prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700 prose-th:p-3 prose-th:text-left prose-th:font-semibold
                prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700 prose-td:p-3
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm">
                {post.content}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Share this article</h3>
                    <SocialShare 
                      url={`https://teradownloader.com/blog/${post.slug}`}
                      title={post.title}
                      description={post.excerpt}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

