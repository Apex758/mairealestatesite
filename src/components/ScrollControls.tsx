import React, { useState, useEffect } from 'react';
import { useGlobal } from '../contexts/GlobalContext';
import { Globe, Coins, ArrowUp, Bitcoin } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'ro', name: 'Română' }
] as const;

const currencies = ['AED', 'USD', 'USDT', 'BTC', 'EUR', 'GBP', 'RON', 'NGN'] as const;

export function ScrollControls() {
  const { language, setLanguage, currency, setCurrency } = useGlobal();
  const [showControls, setShowControls] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setShowControls(documentHeight - (scrollPosition + windowHeight) < 100);
      setShowScrollTop(scrollPosition > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCurrencySymbol = (curr: string) => {
    switch (curr) {
      case 'BTC':
        return <Bitcoin className="w-4 h-4" />;
      case 'USDT':
        return '₮';
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'RON':
        return 'RON';
      case 'NGN':
        return '₦';
      case 'AED':
        return 'د.إ';
      default:
        return curr;
    }
  };

  return (
    <>
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 transition-transform duration-300 ${
        showControls ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1 text-sm rounded transition-colors ${
                    language === lang.code
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-gray-500" />
            <div className="flex gap-2">
              {currencies.map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr as any)}
                  className={`px-2 py-1 text-sm rounded transition-colors flex items-center gap-1 ${
                    currency === curr
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {getCurrencySymbol(curr)} {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-20 right-8 bg-white shadow-lg rounded-full p-3 z-50 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <ArrowUp className="w-6 h-6 text-gray-600" />
      </button>
    </>
  );
}