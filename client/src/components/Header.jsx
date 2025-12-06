import { Download, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="glass-effect border-b border-gray-700 shadow-md sticky top-0 z-50 bg-gray-900/90 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TeraDownloader</h1>
              <p className="text-xs text-gray-400">Free & Fast Downloads</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link to="/features" className="text-gray-300 hover:text-blue-400 transition-colors">
              Features
            </Link>
            <Link to="/blog" className="text-gray-300 hover:text-blue-400 transition-colors">
              Blog
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-300 hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/features" className="block py-2 text-gray-300 hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}>
              Features
            </Link>
            <Link to="/blog" className="block py-2 text-gray-300 hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link to="/about" className="block py-2 text-gray-300 hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

