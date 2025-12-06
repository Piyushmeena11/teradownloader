import { Link } from 'react-router-dom';
import { Cookie, ArrowLeft } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <div className="glass-effect rounded-2xl p-8 md:p-12 dark:bg-gray-800/80">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Cookie className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  Cookie Policy
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Last updated: December 2024
                </p>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Cookie Policy
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  TeraDownloader is committed to your privacy. We use minimal cookies and only for essential functionality.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Cookies We Use
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We use browser local storage (not traditional cookies) for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li><strong>Theme Preference:</strong> Stores your dark/light mode choice</li>
                  <li><strong>Language Preference:</strong> Stores your selected language</li>
                  <li><strong>Download History:</strong> Stores your download history locally on your device</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  What We Don't Use
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We do NOT use:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Tracking cookies</li>
                  <li>Advertising cookies</li>
                  <li>Analytics cookies</li>
                  <li>Third-party cookies</li>
                  <li>Session cookies for authentication</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Managing Your Preferences
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You can clear all stored data at any time through your browser settings. This will reset your theme, language, and download history preferences.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Third-Party Cookies
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We do not allow third-party cookies on our website. Your browsing experience is completely private.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


