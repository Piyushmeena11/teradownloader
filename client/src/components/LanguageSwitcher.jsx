import { Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { setLanguage, getLanguage, availableLanguages, onLanguageChange, languageNames } from '../services/i18n';

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState(getLanguage());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onLanguageChange((lang) => {
      setCurrentLang(lang);
    });
    return unsubscribe;
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCurrentLang(lang);
    setIsOpen(false);
    // Force re-render by updating state
    window.dispatchEvent(new Event('languagechange'));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {languageNames[currentLang] || 'EN'}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  currentLang === lang
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {languageNames[lang]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

