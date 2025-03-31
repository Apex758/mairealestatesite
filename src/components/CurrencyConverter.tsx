import React, { useState, useEffect } from 'react';
import { Bitcoin as BitcoinIcon } from 'lucide-react';

interface CurrencyConverterProps {
  amount: number;
  baseCurrency?: string;
}

const currencies = ['AED', 'USD', 'EUR', 'GBP', 'CNY', 'JPY', 'BTC', 'USDT'];

export function CurrencyConverter({ amount, baseCurrency = 'AED' }: CurrencyConverterProps) {
  const [selectedCurrency, setSelectedCurrency] = useState(baseCurrency);
  const [convertedAmount, setConvertedAmount] = useState(amount);
  const [rates, setRates] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchRates(baseCurrency);
  }, [baseCurrency]);

  const fetchRates = async (base: string) => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/21f591027f3ed21fdd350c61/latest/${base}`);
      const data = await response.json();
      if (data.result === 'success') {
        setRates(data.conversion_rates);
        updateConvertedAmount(selectedCurrency, data.conversion_rates);
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  };

  const updateConvertedAmount = (currency: string, currentRates: Record<string, number>) => {
    const rate = currentRates[currency] || 1;
    setConvertedAmount(amount * rate);
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
      case 'CNY':
        return '¥';
      case 'JPY':
        return '¥';
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
          <span className="flex items-center">{getCurrencySymbol(selectedCurrency)}</span>
          <span>{formatAmount(convertedAmount, selectedCurrency)}</span>
        </div>
        <div className="inline-flex flex-wrap justify-center gap-1 bg-gray-100 rounded-full p-1">
          {currencies.map((currency) => (
            <button
              key={currency}
              onClick={() => {
                setSelectedCurrency(currency);
                updateConvertedAmount(currency, rates);
              }}
              className={`px-2 py-0.5 text-xs rounded-full transition-all flex items-center gap-0.5 ${
                currency === selectedCurrency
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
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