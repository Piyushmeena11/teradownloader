import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
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
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  Terms of Service
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Last updated: December 2024
                </p>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Acceptance of Terms
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  By accessing and using TeraDownloader, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Use License
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Permission is granted to temporarily use TeraDownloader for personal, non-commercial transitory viewing and downloading. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to reverse engineer any software</li>
                  <li>Remove any copyright or proprietary notations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Service Availability
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  TeraDownloader is provided "as is" and "as available". We do not guarantee:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Uninterrupted or error-free service</li>
                  <li>That all Terabox links will work</li>
                  <li>Specific download speeds</li>
                  <li>Availability of the service at all times</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  User Responsibilities
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Use the service only for lawful purposes</li>
                  <li>Respect copyright and intellectual property rights</li>
                  <li>Not use the service to download copyrighted material without permission</li>
                  <li>Not abuse or overload our servers</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Limitation of Liability
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  In no event shall TeraDownloader or its suppliers be liable for any damages arising out of the use or inability to use the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Changes to Terms
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We reserve the right to revise these terms at any time. By continuing to use the service after changes are posted, you agree to be bound by the revised terms.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


