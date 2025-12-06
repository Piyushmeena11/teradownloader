import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  Privacy Policy
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Last updated: December 2024
                </p>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Introduction
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  At TeraDownloader, we are committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Information We Don't Collect
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We are proud to say that TeraDownloader operates with a privacy-first approach:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>We do not require user registration or login</li>
                  <li>We do not collect personal information</li>
                  <li>We do not store your download history on our servers</li>
                  <li>We do not track your browsing behavior</li>
                  <li>We do not use cookies for tracking purposes</li>
                  <li>We do not share your data with third parties</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  How We Process Downloads
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  When you use TeraDownloader:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>URLs are processed in real-time</li>
                  <li>No files are stored on our servers</li>
                  <li>All processing happens temporarily in memory</li>
                  <li>Download links are generated on-demand</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Local Storage
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We use browser local storage to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Store your theme preference (dark/light mode)</li>
                  <li>Store your language preference</li>
                  <li>Store download history locally on your device</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  This data never leaves your device and can be cleared at any time through your browser settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Third-Party Services
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We do not integrate with third-party analytics, advertising, or tracking services. Your usage of TeraDownloader remains completely private.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Changes to This Policy
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Contact Us
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us through our website.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


