import { Link } from 'react-router-dom';
import SocialShare from './SocialShare';

export default function Footer() {
  return (
    <footer className="bg-gray-800/50 border-t border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              TeraDownloader
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              The fastest and most secure way to download files from Terabox. Free forever.
            </p>
            <SocialShare />
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-gray-400 hover:text-blue-400 text-sm">
                  Features
                </Link>
              </li>
              <li>
                <a href="#download" className="text-gray-400 hover:text-blue-400 text-sm">
                  Download
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-blue-400 text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-blue-400 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-blue-400 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-blue-400 text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © 2024 TeraDownloader. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                We respect your privacy and don't store any files or personal data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

