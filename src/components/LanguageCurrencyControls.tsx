import React, { useState, useEffect } from 'react';
import { useGlobal } from '../contexts/GlobalContext';
import { Globe, Coins } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'ro', name: 'Română' }
] as const;

const currencies = ['AED', 'USD', 'EUR', 'GBP', 'RON', 'NGN', 'BTC', 'USDT'] as const;

export function LanguageCurrencyControls() {
  const { language, setLanguage, currency, setCurrency } = useGlobal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show controls when user scrolls near the bottom of the page
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show when scrolled to within 200px of the bottom
      const nearBottom = scrollPosition + windowHeight > documentHeight - 200;
      setIsVisible(nearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-lg z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center gap-8">
        <div className="flex items-center gap-3">
          <Globe className="w-4 h-4 text-amber-500" />
          <div className="flex gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-3 py-1 text-sm rounded-full transition-all ${
                  language === lang.code
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Coins className="w-4 h-4 text-amber-500" />
          <div className="flex flex-wrap justify-center gap-1">
            {currencies.map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2 py-1 text-xs rounded-full transition-all ${
                  currency === curr
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
