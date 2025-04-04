import React, { useState, useEffect } from 'react';
import { Bitcoin as BitcoinIcon } from 'lucide-react';
import { useGlobal } from '../contexts/GlobalContext';

interface CurrencyConverterProps {
  amount: number;
  baseCurrency?: string;
}

const currencies = ['AED', 'USD', 'EUR', 'GBP', 'RON', 'NGN', 'BTC', 'USDT'];

export function CurrencyConverter({ amount, baseCurrency = 'AED' }: CurrencyConverterProps) {
  const { currency: globalCurrency, setCurrency: setGlobalCurrency } = useGlobal();
  const [convertedAmount, setConvertedAmount] = useState(amount);
  const [rates, setRates] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchRates(baseCurrency.toLowerCase());
  }, [baseCurrency]);

  // Update converted amount when global currency changes
  useEffect(() => {
    updateConvertedAmount(globalCurrency.toLowerCase(), rates);
  }, [globalCurrency, rates]);

  const fetchRates = async (base: string) => {
    try {
      // Using the new free API structure you provided
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`);
      const data = await response.json();
      
      if (data && data[base]) {
        setRates(data[base]);
        updateConvertedAmount(globalCurrency.toLowerCase(), data[base]);
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  };

  const updateConvertedAmount = (currency: string, currentRates: Record<string, number>) => {
    const rate = currentRates[currency.toLowerCase()] || 1;
    setConvertedAmount(amount * rate);
  };

  const handleCurrencyChange = (currency: string) => {
    setGlobalCurrency(currency as 'AED' | 'USD' | 'EUR' | 'GBP' | 'RON' | 'NGN' | 'BTC' | 'USDT');
    updateConvertedAmount(currency.toLowerCase(), rates);
  };

  const formatAmount = (value: number, currency: string) => {
    if (currency === 'BTC') {
      return value.toFixed(8);
    }
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'NGN':
        return '₦';
      case 'RON':
        return 'lei';
      case 'AED':
        return 'د.إ';
      case 'BTC':
        return <BitcoinIcon className="w-3 h-3" />;
      case 'USDT':
        return '₮';
      default:
        return currency;
    }
  };

  return (
    <div className="font-['Proxima Nova']">
      <div className="text-center">
        <div className="text-2xl font-semibold mb-2 flex items-center justify-center gap-1">
          <span className="flex items-center">{getCurrencySymbol(globalCurrency)}</span>
          <span>{formatAmount(convertedAmount, globalCurrency)}</span>
        </div>
        <div className="inline-flex flex-wrap justify-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
          {currencies.map((currency) => (
            <button
              key={currency}
              onClick={() => handleCurrencyChange(currency)}
              className={`px-2 py-0.5 text-xs rounded-full transition-all flex items-center gap-0.5 ${
                currency === globalCurrency
                  ? 'bg-white dark:bg-gray-600 shadow text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="flex items-center">{getCurrencySymbol(currency)}</span>
              <span>{currency}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
