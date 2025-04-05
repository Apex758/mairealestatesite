import React, { useState, useEffect } from 'react';
import { Bitcoin as BitcoinIcon, Globe2, Lock, Wallet, Building, FileCheck } from 'lucide-react';
import { useGlobal } from '../contexts/GlobalContext';
import { translateText } from '../utils/translateUtils';

export function Bitcoin() {
  const { language } = useGlobal();
  const [isVisible, setIsVisible] = useState(false);
  const [showContact, setShowContact] = useState(false);
  
  // Animation effect for luxury elements
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
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
    <div className="pt-16 overflow-hidden">
      {/* Hero Section with luxury background */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt="Bitcoin and Real Estate"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
        
        {/* Gold decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="text-amber-400 tracking-[0.3em] uppercase text-sm font-light">Innovation</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            <div className="flex items-center justify-center gap-3 text-amber-400 mb-6">
              <BitcoinIcon className="w-8 h-8" />
              <span className="text-xl font-light tracking-wide">CRYPTO REAL ESTATE</span>
            </div>

            <h1 className="text-5xl font-extralight text-white mb-6 tracking-wider">{translatedContent.heroTitle}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Dubai has firmly established itself as a global epicenter for forward-thinking investment—and
              now, purchasing prime real estate with cryptocurrency is not just possible, it's elegantly simple.
            </p>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
              At MAI Real Estate L.L.C, we offer elite investors a discreet, fully compliant pathway to
              acquire prestigious properties in Dubai using Bitcoin and other approved cryptocurrencies.
            </p>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 py-24 relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-500"></div>
              <span className="mx-4 text-amber-500 tracking-[0.3em] uppercase text-sm font-light">Advantages</span>
              <div className="h-px w-12 bg-amber-500"></div>
            </div>
            
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
              Crypto <span className="font-medium text-amber-500 dark:text-amber-400">Benefits</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className={`bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-300 group transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Global Capital Mobility</h3>
              <div className="h-px w-12 bg-amber-500 mb-6"></div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Cryptocurrency allows you to move capital across borders with speed and precision, offering
                a seamless experience for international investors seeking immediate access to Dubai's luxury real
                estate market.
              </p>
            </div>
            
            <div className={`bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-300 group transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Privacy & Discretion</h3>
              <div className="h-px w-12 bg-amber-500 mb-6"></div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Crypto transactions provide a level of discretion unmatched by traditional banking—ideal for
                ultra-high-net-worth individuals who value privacy in their acquisitions.
              </p>
            </div>
            
            <div className={`bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-300 group transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Diversification with Tangible Assets</h3>
              <div className="h-px w-12 bg-amber-500 mb-6"></div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Converting digital wealth into prime physical real estate in one of the world's most stable,
                rapidly growing markets creates a powerful balance between innovation and security.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="bg-gray-900 py-32 relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            alt="Bitcoin and Real Estate"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-cent  er justify-center mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="mx-4 text-amber-400 tracking-[0.3em] uppercase text-sm font-light">Methodology</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            
            <h2 className="text-3xl font-light text-white mb-4">
              How It Works – Crypto to Title Deed
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto mb-8">
              Our process is streamlined, secure, and fully aligned with UAE law and Dubai Land
              Department (DLD) guidelines
            </p>
          </div>
          
          <div className="space-y-16">
            <div className={`flex items-start gap-8 group transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transition-all group-hover:scale-110 group-hover:shadow-xl">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl flex-1">
                <h3 className="text-xl font-light text-white mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
                    <span className="text-amber-400 text-sm">1</span>
                  </span>
                  Proof of Funds & KYC
                </h3>
                <div className="h-px w-12 bg-amber-500 mb-6"></div>
                <p className="text-gray-300 leading-relaxed">
                  Clients are required to submit Proof of Funds (POF) and complete a confidential Know
                  Your Customer (KYC) process to ensure full regulatory compliance.
                </p>
              </div>
            </div>

            <div className={`flex items-start gap-8 group transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transition-all group-hover:scale-110 group-hover:shadow-xl">
                <BitcoinIcon className="w-8 h-8 text-white" />
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl flex-1">
                <h3 className="text-xl font-light text-white mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
                    <span className="text-amber-400 text-sm">2</span>
                  </span>
                  Crypto Payment via Licensed OTC or Exchange Partner
                </h3>
                <div className="h-px w-12 bg-amber-500 mb-6"></div>
                <p className="text-gray-300 leading-relaxed">
                  Payments are processed through approved over-the-counter (OTC) desks or regulated
                  crypto exchanges, converting your crypto into AED (UAE Dirham) as required by law.
                  We work only with licensed financial intermediaries to guarantee transparency and
                  legal adherence.
                </p>
              </div>
            </div>

            <div className={`flex items-start gap-8 group transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transition-all group-hover:scale-110 group-hover:shadow-xl">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl flex-1">
                <h3 className="text-xl font-light text-white mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
                    <span className="text-amber-400 text-sm">3</span>
                  </span>
                  Secure Transaction & Escrow Protection
                </h3>
                <div className="h-px w-12 bg-amber-500 mb-6"></div>
                <p className="text-gray-300 leading-relaxed">
                  Funds are deposited into the developer's or seller's designated escrow account, as
                  mandated by Dubai's Real Estate Regulatory Agency (RERA) and Law No. (8) of
                  2007 on real estate escrow accounts.
                </p>
              </div>
            </div>

            <div className={`flex items-start gap-8 group transition-all duration-1000 delay-900 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transition-all group-hover:scale-110 group-hover:shadow-xl">
                <FileCheck className="w-8 h-8 text-white" />
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl flex-1">
                <h3 className="text-xl font-light text-white mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
                    <span className="text-amber-400 text-sm">4</span>
                  </span>
                  Title Deed Issued in Your Name
                </h3>
                <div className="h-px w-12 bg-amber-500 mb-6"></div>
                <p className="text-gray-300 leading-relaxed">
                  Upon completion, the Dubai Land Department issues a title deed under your name or
                  entity—signifying full legal ownership of the asset.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 py-24 relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-500"></div>
              <span className="mx-4 text-amber-500 tracking-[0.3em] uppercase text-sm font-light">Contact</span>
              <div className="h-px w-12 bg-amber-500"></div>
            </div>
            
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-8">
              What You Can Buy
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-gray-200/10">
                <p className="text-gray-300">Off-market ultra-luxury penthouses</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-gray-200/10">
                <p className="text-gray-300">Beachfront villas on Palm Jumeirah</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-gray-200/10">
                <p className="text-gray-300">Branded residences in Downtown Dubai, Emirates Hills, and Dubai Hills</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-gray-200/10">
                <p className="text-gray-300">Landmark commercial properties and investment portfolios</p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-light text-white mb-4">Private Desk – M A I Real Estate L.L.C</h3>
              <button 
                onClick={() => setShowContact(!showContact)}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-900/20 mb-4"
              >
                Contact
              </button>
              {showContact && (
                <div className="flex items-center justify-center gap-8 text-gray-300 mt-4">
                   <a href="tel:+971507416377" className="hover:text-amber-400 transition-colors">+971507416377</a>
                  <a href="mailto:william@mairealestate.ae" className="hover:text-amber-400 transition-colors">william@mairealestate.ae</a>
                </div>
              )}
              <p className="text-amber-400 mt-8 text-lg font-light italic">Where Digital Wealth Meets Timeless Legacy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Disclaimer */}
      <div className="bg-gray-900 py-24 relative">
        <div className="absolute inset-0 z-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            alt="Bitcoin and Real Estate"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="mx-4 text-amber-400 tracking-[0.3em] uppercase text-sm font-light">Legal</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            
            <h2 className="text-3xl font-light text-white mb-4">
              Payment <span className="font-medium text-amber-300">Disclaimer</span>
            </h2>
          </div>
          
          <div className={`bg-gray-800/80 backdrop-blur-sm p-10 rounded-xl border border-gray-700 shadow-xl transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-gray-300 mb-6 leading-relaxed">
              At <span className="font-medium text-amber-300">MAI Real Estate L.L.C</span>, we strictly adhere to UAE real estate laws and regulations. We do <span className="font-medium">not</span> accept, collect, or receive payments from clients on behalf of any developer, as per <span className="italic">Law No. (8) of 2007 concerning Escrow Accounts for Real Estate Development in Dubai</span>.
            </p>
            <div className="h-px w-full bg-gray-700 my-6"></div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              All payments related to property purchases must be made <span className="italic">directly to the developer's designated escrow account</span> as mandated by the <span className="italic">Dubai Land Department (DLD)</span> and relevant UAE authorities.
            </p>
            <div className="h-px w-full bg-gray-700 my-6"></div>
            <p className="text-gray-300 leading-relaxed">
              <span className="text-amber-300">MAI Real Estate</span> operates solely as a licensed brokerage facilitating transactions, ensuring transparency, and safeguarding your investments.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer Decoration */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
    </div>
  );
}

export default Bitcoin;
