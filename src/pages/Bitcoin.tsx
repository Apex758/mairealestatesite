import React, { useState, useEffect } from 'react';
import { Bitcoin as BitcoinIcon, Globe2, ArrowRight, Lock, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext';
import { translateText } from '../utils/translateUtils';

export function Bitcoin() {
  const { language } = useGlobal();
  
  // Default content for Bitcoin page
  const [translatedContent, setTranslatedContent] = useState({
    heroTitle: 'Buy Property with Crypto in Dubai',
    heroDescription: 'While Dubai processes real estate transactions in AED through authorized escrow accounts, we guide you through converting your crypto assets for property acquisition.',
    globalTransactions: 'Secure property transactions through regulated escrow services in Dubai, ensuring complete transparency and security.',
    legalCompliance: 'All transactions strictly follow UAE real estate regulations and compliance requirements.',
    assetConversion: 'Professional guidance on converting your crypto assets for property purchase through authorized channels.',
    purchaseProcess: 'Purchase Process',
    propertySelection: 'Browse our exclusive listings and select your desired property in Dubai\'s prime locations.',
    assetPlanning: 'Our specialists will guide you through the crypto-to-fiat conversion strategy for your property purchase.',
    escrowSetup: 'Transaction processing through authorized Dubai escrow services, ensuring security and compliance.',
    propertyTransfer: 'Complete the property transfer through Dubai Land Department with our expert guidance.',
    ctaTitle: 'Ready to Begin Your Journey?',
    contactSpecialists: 'Contact Our Specialists'
  });

  // Translate content based on selected language
  useEffect(() => {
    const translateContent = async () => {
      if (language === 'en') return;

      try {
        const translated = {
          heroTitle: await translateText('Buy Property with Crypto in Dubai', language),
          heroDescription: await translateText('While Dubai processes real estate transactions in AED through authorized escrow accounts, we guide you through converting your crypto assets for property acquisition.', language),
          globalTransactions: await translateText('Secure property transactions through regulated escrow services in Dubai, ensuring complete transparency and security.', language),
          legalCompliance: await translateText('All transactions strictly follow UAE real estate regulations and compliance requirements.', language),
          assetConversion: await translateText('Professional guidance on converting your crypto assets for property purchase through authorized channels.', language),
          purchaseProcess: await translateText('Purchase Process', language),
          propertySelection: await translateText('Browse our exclusive listings and select your desired property in Dubai\'s prime locations.', language),
          assetPlanning: await translateText('Our specialists will guide you through the crypto-to-fiat conversion strategy for your property purchase.', language),
          escrowSetup: await translateText('Transaction processing through authorized Dubai escrow services, ensuring security and compliance.', language),
          propertyTransfer: await translateText('Complete the property transfer through Dubai Land Department with our expert guidance.', language),
          ctaTitle: await translateText('Ready to Begin Your Journey?', language),
          contactSpecialists: await translateText('Contact Our Specialists', language)
        };
        setTranslatedContent(translated);
      } catch (error) {
        console.error('Error translating content:', error);
      }
    };

    translateContent();
  }, [language]);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-orange-900 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 text-orange-400 mb-6">
            <BitcoinIcon className="w-8 h-8" />
            <span className="text-xl font-light tracking-wide">CRYPTO REAL ESTATE</span>
          </div>
          <h1 className="text-6xl font-light mb-8">{translatedContent.heroTitle}</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {translatedContent.heroDescription}
          </p>
        </div>
      </div>

      {/* Process Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="group">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110">
              <Globe2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-light mb-4 dark:text-white">{translatedContent.globalTransactions}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {translatedContent.globalTransactions}
            </p>
          </div>
          
          <div className="group">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-light mb-4 dark:text-white">{translatedContent.legalCompliance}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {translatedContent.legalCompliance}
            </p>
          </div>
          
          <div className="group">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-light mb-4 dark:text-white">{translatedContent.assetConversion}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {translatedContent.assetConversion}
            </p>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="bg-gray-50 dark:bg-gray-800 py-32">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-light mb-16 text-center dark:text-white">{translatedContent.purchaseProcess}</h2>
          <div className="space-y-16">
            <div className="flex items-start gap-8 group">
              <div className="bg-white dark:bg-gray-700 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md">
                <span className="text-2xl font-light text-orange-500">01</span>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4 dark:text-white">{translatedContent.propertySelection}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{translatedContent.propertySelection}</p>
              </div>
            </div>

            <div className="flex items-start gap-8 group">
              <div className="bg-white dark:bg-gray-700 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md">
                <span className="text-2xl font-light text-orange-500">02</span>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4 dark:text-white">{translatedContent.assetPlanning}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{translatedContent.assetPlanning}</p>
              </div>
            </div>

            <div className="flex items-start gap-8 group">
              <div className="bg-white dark:bg-gray-700 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md">
                <span className="text-2xl font-light text-orange-500">03</span>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4 dark:text-white">{translatedContent.escrowSetup}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{translatedContent.escrowSetup}</p>
              </div>
            </div>

            <div className="flex items-start gap-8 group">
              <div className="bg-white dark:bg-gray-700 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md">
                <span className="text-2xl font-light text-orange-500">04</span>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4 dark:text-white">{translatedContent.propertyTransfer}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{translatedContent.propertyTransfer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-light mb-8 text-white">{translatedContent.ctaTitle}</h2>
          <h2 className="text-4xl font-light mb-8 text-white">{translatedContent.ctaTitle}</h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all group"
          >
            {translatedContent.contactSpecialists}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Bitcoin;
