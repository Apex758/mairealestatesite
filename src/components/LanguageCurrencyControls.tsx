import React from 'react';
import { useGlobal } from '../contexts/GlobalContext';
import { Globe, Coins } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'ro', name: 'Română' }
] as const;

const currencies = ['AED', 'USD', 'EUR', 'GBP', 'CNY', 'JPY'] as const;

export function LanguageCurrencyControls() {
  const { language, setLanguage, currency, setCurrency } = useGlobal();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
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
                onClick={() => setCurrency(curr)}
                className={`px-2 py-1 text-sm rounded transition-colors ${
                  currency === curr
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
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