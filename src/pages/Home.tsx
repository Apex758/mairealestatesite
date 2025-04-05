import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Bitcoin, Home as HomeIcon, MapPin, Star } from 'lucide-react';
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
  
  // Get showcase properties from the store
  const showcaseProperties = usePropertyStore(state => state.getShowcaseProperties());

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

  // Animation effect for luxury elements
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
        </div>
        
        {/* Gold decorative elements removed from homepage as requested */}
        
        <div className="relative text-center text-white z-10 max-w-4xl px-4">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="mx-4 text-amber-400 tracking-[0.3em] uppercase text-sm font-light">Exclusive</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            
            <h1 className="text-7xl font-extralight mb-8 tracking-wider">{homepageSettings.heroTitle}</h1>
            
            <div className="text-3xl mb-12 flex items-center justify-center gap-2">
              <span className="text-gray-300">{t('buy')}</span>
              <div className="relative w-40 h-12 inline-block">
                {propertyTypes.map((type: string, index: number) => (
                  <span
                    key={type}
                    className="absolute inset-0 flex items-center justify-center transition-all duration-500 transform text-amber-300 font-light"
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
              <span className="text-gray-300">{t('with')}</span>
              <div className="relative w-32 h-12 inline-block">
                {paymentTypes.map((type: string, index: number) => (
                  <span
                    key={type}
                    className="absolute inset-0 flex items-center justify-center transition-all duration-500 transform text-amber-300 font-light"
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
            
            <div className="flex gap-6 justify-center">
              <Link 
                to="/listings"
                className="inline-flex items-center gap-2 bg-transparent border border-amber-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full 
                         hover:bg-amber-500/10 active:bg-amber-500/20 transition-all text-base sm:text-lg tracking-wide group"
              >
                <HomeIcon className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="whitespace-nowrap">{t('exploreProperties')}</span>
              </Link>
              <Link 
                to="/bitcoin"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full 
                         hover:from-amber-600 hover:to-amber-700 active:from-amber-700 active:to-amber-800 transition-all text-base sm:text-lg tracking-wide shadow-lg shadow-amber-900/20 group"
              >
                <Bitcoin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="whitespace-nowrap">{t('learnHow')}</span>
              </Link>
            </div>
          </div>
        </div>
        
          <button 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-amber-400 animate-bounce p-2 hover:text-amber-300 active:text-amber-500 transition-colors"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
      </div>

      {/* Grid Section */}
      <div className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 py-24 relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-500"></div>
              <span className="mx-4 text-amber-500 tracking-[0.3em] uppercase text-sm font-light">Discover</span>
              <div className="h-px w-12 bg-amber-500"></div>
            </div>
            
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
              Luxury <span className="font-medium text-amber-500 dark:text-amber-400">Lifestyle</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[800px]">
            {gridSections.map((section, index) => (
              <div 
                key={index}
                className={`relative rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-xl ${
                  section.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {section.type === 'image' ? (
                  <>
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                      <h3 className="text-2xl font-light text-white mb-2">{section.title}</h3>
                      <div className="h-px w-12 bg-amber-400"></div>
                    </div>
                  </>
                ) : (
                  <div className="h-full bg-white dark:bg-gray-800 p-8 flex flex-col justify-center border border-gray-200 dark:border-gray-700"> 
                    <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-4 flex items-center">
                      {section.title === homepageSettings.textContent.cryptoPayments ? (
                        <Bitcoin className="w-5 h-5 text-amber-500 mr-2" />
                      ) : (
                        <MapPin className="w-5 h-5 text-amber-500 mr-2" />
                      )}
                      <span>{section.title}</span>
                    </h3>
                    <div className="h-px w-12 bg-amber-500 mb-4"></div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{section.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="bg-gray-900 py-24 relative"> 
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={homepageSettings.heroImage}
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="mx-4 text-amber-400 tracking-[0.3em] uppercase text-sm font-light">Showcase</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            
            <h2 className="text-3xl font-light text-white mb-4">
              {t(homepageSettings.textContent.featuredProperties as TranslationKey)}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {showcaseProperties.map((property, index) => (
              <div 
                key={property.id}
                className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <PropertyCard 
                  id={property.id}
                  slideshowImages={property.slideshowImages}
                  price={<CurrencyConverter amount={property.price} baseCurrency={property.currency} />}
                  name={property.name}
                  address={property.address}
                  beds={property.beds}
                  baths={property.baths}
                  sqft={property.sqft}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/listings"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full 
                       hover:from-amber-600 hover:to-amber-700 active:from-amber-700 active:to-amber-800 transition-all shadow-lg shadow-amber-900/20 group"
            >
              <Star className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="tracking-wider whitespace-nowrap text-base sm:text-lg">{t('viewAllProperties')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 py-24 relative"> 
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-500"></div>
              <span className="mx-4 text-amber-500 tracking-[0.3em] uppercase text-sm font-light">Excellence</span>
              <div className="h-px w-12 bg-amber-500"></div>
            </div>
            
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
              Our <span className="font-medium text-amber-500 dark:text-amber-400">Achievements</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className={`bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 text-center transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="text-5xl font-light mb-4 text-amber-500">500+</div> 
              <div className="h-px w-12 bg-amber-500 mx-auto mb-4"></div>
              <div className="text-xl text-gray-700 dark:text-gray-300">{t('dubaiProperties')}</div> 
            </div>
            
            <div className={`bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 text-center transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="text-5xl font-light mb-4 text-amber-500">$2B+</div> 
              <div className="h-px w-12 bg-amber-500 mx-auto mb-4"></div>
              <div className="text-xl text-gray-700 dark:text-gray-300">{t('cryptoTransactions')}</div> 
            </div>
            
            <div className={`bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 text-center transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="text-5xl font-light mb-4 text-amber-500">100%</div> 
              <div className="h-px w-12 bg-amber-500 mx-auto mb-4"></div>
              <div className="text-xl text-gray-700 dark:text-gray-300">{t('secureEscrow')}</div> 
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Decoration */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
    </div>
  );
}
