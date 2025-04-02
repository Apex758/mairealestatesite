// Updated Home Page using PropertyStore
// File: src/pages/Home.tsx

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Bitcoin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PropertyCard } from '../components/PropertyCard';
import { CurrencyConverter } from '../components/CurrencyConverter';
import { usePropertyStore } from '../stores/propertyStore';
import { useTranslate } from '../hooks/useTranslate';
import { TranslationKey } from '../translations';

// Default homepage settings (fallback if localStorage is empty)
const DEFAULT_HOMEPAGE = {
  heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80",
  heroTitle: "Dubai Real Estate",
  propertyTypes: ["apartments", "condos", "houses", "homes"],
  paymentTypes: ["Bitcoin", "USDT"],
  gridImages: {
    large: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80",
    small1: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80",
    small2: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80"
  },
  textContent: {
    cryptoPayments: "Crypto Payments",
    purchaseYourDream: "Purchase your dream property with cryptocurrency",
    primeLocations: "Prime Locations",
    exclusiveProperties: "Exclusive properties in the most sought-after areas",
    luxuryDubaiLiving: "Luxury Dubai Living",
    dubaiMarina: "Dubai Marina",
    downtownViews: "Downtown Views",
    featuredProperties: "Featured Dubai Properties"
  }
};

export function Home() {
  const { t } = useTranslate();
  
  // Load homepage settings from localStorage or use defaults
  const [homepageSettings] = useState(() => {
    const savedSettings = localStorage.getItem('homepageSettings');
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_HOMEPAGE;
  });

  const propertyTypes = homepageSettings.propertyTypes.map((type: string) => t(type as TranslationKey));
  const paymentTypes = homepageSettings.paymentTypes;
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const [currentPropertyType, setCurrentPropertyType] = useState(0);
  const [currentPaymentType, setCurrentPaymentType] = useState(0);
  
  // Create grid sections from homepage settings
  const gridSections = [
    {
      type: 'image',
      image: homepageSettings.gridImages.large,
      title: homepageSettings.textContent.luxuryDubaiLiving,
      size: "large"
    },
    {
      type: 'text',
      title: homepageSettings.textContent.cryptoPayments,
      description: homepageSettings.textContent.purchaseYourDream,
      size: "small"
    },
    {
      type: 'image',
      image: homepageSettings.gridImages.small1,
      title: homepageSettings.textContent.dubaiMarina,
      size: "small"
    },
    {
      type: 'text',
      title: homepageSettings.textContent.primeLocations,
      description: homepageSettings.textContent.exclusiveProperties,
      size: "small"
    },
    {
      type: 'image',
      image: homepageSettings.gridImages.small2,
      title: homepageSettings.textContent.downtownViews,
      size: "small"
    }
  ];
  
  // Get properties from the store
  const properties = usePropertyStore(state => 
    state.properties.filter(p => p.published).slice(0, 3)
  );

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const propertyInterval = setInterval(() => {
      setCurrentPropertyType((prev) => (prev + 1) % propertyTypes.length);
    }, 2000);

    const paymentInterval = setInterval(() => {
      setCurrentPaymentType((prev) => (prev + 1) % paymentTypes.length);
    }, 4000);

    return () => {
      clearInterval(propertyInterval);
      clearInterval(paymentInterval);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <div 
          ref={parallaxRef}
          className="absolute inset-0"
        >
          <img
            src={homepageSettings.heroImage}
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative text-center text-white z-10 max-w-4xl px-4">
          <h1 className="text-8xl font-bold mb-8">{homepageSettings.heroTitle}</h1>
          <div className="text-3xl mb-12 flex items-center justify-center gap-2">
            <span>{t('buy')}</span>
            <div className="relative w-40 h-12 inline-block">
              {propertyTypes.map((type: string, index: number) => (
                <span
                  key={type}
                  className="absolute inset-0 flex items-center justify-center transition-all duration-500 transform"
                  style={{
                    opacity: currentPropertyType === index ? 1 : 0,
                    transform: `translateY(${currentPropertyType === index ? 0 : 20}px)`,
                    visibility: currentPropertyType === index ? 'visible' : 'hidden'
                  }}
                >
                  {type}
                </span>
              ))}
            </div>
            <span>{t('with')}</span>
            <div className="relative w-32 h-12 inline-block">
              {paymentTypes.map((type: string, index: number) => (
                <span
                  key={type}
                  className="absolute inset-0 flex items-center justify-center transition-all duration-500 transform"
                  style={{
                    opacity: currentPaymentType === index ? 1 : 0,
                    transform: `translateY(${currentPaymentType === index ? 0 : 20}px)`,
                    visibility: currentPaymentType === index ? 'visible' : 'hidden'
                  }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/listings"
              className="inline-block bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full 
                       hover:bg-white/20 transition-colors text-lg"
            >
              {t('exploreProperties')}
            </Link>
            <Link 
              to="/bitcoin"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-full 
                       hover:from-orange-600 hover:to-yellow-600 transition-colors text-lg"
            >
              <Bitcoin className="w-6 h-6" />
              {t('learnHow')}
            </Link>
          </div>
        </div>
        <button 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>

      {/* Grid Section */}
      {/* Adjusted background for dark mode */}
      <div className="bg-white dark:bg-gray-800 py-24"> 
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[800px]">
            {gridSections.map((section, index) => (
              <div 
                key={index}
                className={`relative rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] ${
                  section.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                {section.type === 'image' ? (
                  <>
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                    </div>
                  </>
                ) : (
                  // Adjusted text block background and text for dark mode
                  <div className="h-full bg-gray-100 dark:bg-gray-900 p-6 flex flex-col justify-center"> 
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{section.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{section.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      {/* Adjusted background, heading, and border for dark mode */}
      <div className="bg-white dark:bg-gray-800 py-24"> 
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl font-light text-gray-900 dark:text-white">{t(homepageSettings.textContent.featuredProperties as TranslationKey)}</h2> 
            <div className="flex-1 border-b border-gray-200 dark:border-gray-700" /> 
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard 
                key={property.id}
                id={property.id}
                slideshowImages={property.slideshowImages}
                price={<CurrencyConverter amount={property.price} baseCurrency={property.currency} />}
                address={property.address}
                beds={property.beds}
                baths={property.baths}
                sqft={property.sqft}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            {/* Adjusted button colors for dark mode */}
            <Link 
              to="/listings"
              className="inline-block px-8 py-4 bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100 rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              {t('viewAllProperties')}
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/* Adjusted background and text colors for dark mode */}
      <div className="bg-gray-100 dark:bg-gray-900 py-24"> 
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">500+</div> 
              <div className="text-xl text-gray-600 dark:text-gray-400">{t('dubaiProperties')}</div> 
            </div>
            <div>
              <div className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">$2B+</div> 
              <div className="text-xl text-gray-600 dark:text-gray-400">{t('cryptoTransactions')}</div> 
            </div>
            <div>
              <div className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">100%</div> 
              <div className="text-xl text-gray-600 dark:text-gray-400">{t('secureEscrow')}</div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
