import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PropertyDetails } from '../components/PropertyDetails';
import { StackedImageSlider } from '../components/StackedImageSlider';
import { CurrencyConverter } from '../components/CurrencyConverter';
import { usePropertyStore, Property, formatPrice } from '../stores/propertyStore';
import { useGlobal } from '../contexts/GlobalContext';
import { useTranslate } from '../hooks/useTranslate';
import { translateText } from '../utils/translateUtils';

interface PropertyPageProps {
  previewData?: Property; // For preview mode
}

export function PropertyPage({ previewData }: PropertyPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const properties = usePropertyStore((state) => state.properties);
  const { currency, language } = useGlobal();
  const { t } = useTranslate();
  // No longer need isDescriptionExpanded state
  const [isDescriptionOverflowing, setIsDescriptionOverflowing] = useState(false);
  const [translatedDescription, setTranslatedDescription] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, previewData]);

  // Use preview data if provided, otherwise find property from store
  const property = previewData || properties.find(p => p.id === id);

  // Redirect to home if property not found (only in non-preview mode) or not published
  useEffect(() => {
    if (!previewData && (!property || !property.published)) {
      navigate('/');
    }
  }, [property, navigate, previewData]);
  
  // Translate description when language changes
  useEffect(() => {
    const translateDescription = async () => {
      if (property?.description && language !== 'en') {
        setIsTranslating(true);
        try {
          const translated = await translateText(property.description, language);
          setTranslatedDescription(translated);
        } catch (error) {
          console.error('Error translating description:', error);
          // Use original description if translation fails
          setTranslatedDescription(property.description);
        } finally {
          setIsTranslating(false);
        }
      } else if (property?.description) {
        // Use original description for English
        setTranslatedDescription(property.description);
      }
    };
    
    translateDescription();
  }, [property?.description, language]);

  useEffect(() => {
    // Check if description overflows
    const checkOverflow = () => {
      if (descriptionRef.current && slideshowRef.current) {
        const descHeight = descriptionRef.current.scrollHeight;
        const slideHeight = slideshowRef.current.offsetHeight;
        console.log('Description height:', descHeight, 'Slideshow height:', slideHeight);
        setIsDescriptionOverflowing(descHeight > slideHeight);
      }
    };
    
    // Run check after a short delay to ensure all elements are properly rendered
    const timer = setTimeout(checkOverflow, 100);
    
    // Also add a resize listener to recheck on window resize
    window.addEventListener('resize', checkOverflow);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [property?.description, translatedDescription]);

  if (!property) {
    return null;
  }

  // Get similar properties (excluding current one, filter by published only)
  const similarProperties = properties
    .filter(p => p.id !== property.id && p.published)
    .slice(0, 3)
    .map(p => ({
      id: p.id,
      name: p.name,
      type: 'Luxury Property',
      status: 'Active',
      bedrooms: p.beds,
      bathrooms: p.baths,
      size: p.sqft,
      price: p.price,
      image: p.image,
      formattedPrice: formatPrice(p.price, currency) // Format price using global currency
    }));

  return (
    <div className={previewData ? 'pt-16' : ''}>
      {/* Header Background with luxury styling */}
      {!previewData && (
        <div className="h-24 bg-white dark:bg-gray-900 fixed top-0 left-0 right-0 z-40 border-b border-amber-100/50 dark:border-amber-800/20 shadow-md" />
      )}
      
      <div className={`relative ${previewData ? '' : 'z-30 pt-24'}`}>
        <div className="max-w-8xl mx-auto px-4">
          {/* Elegant gold accent line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-200 dark:via-amber-700 to-transparent mb-12"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Left Column - Property Info with luxury styling */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="mb-8">
                  <div className="flex items-center mb-2">
                    <div className="h-px w-8 bg-amber-400 mr-3"></div>
                    <span className="text-amber-600 dark:text-amber-400 text-sm tracking-wider uppercase font-light">Exclusive Property</span>
                  </div>
                  <h1 className="text-4xl font-extralight text-gray-900 dark:text-white tracking-wide mb-4">{property.name}</h1>
                  <div className="text-4xl font-light text-amber-600 dark:text-amber-400 text-right">
                    <CurrencyConverter amount={property.price} baseCurrency={property.currency} />
                  </div>
                </div>
                <div className="relative mt-8">
                  <div className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-800/80 p-8 rounded-xl shadow-xl border border-amber-100/50 dark:border-amber-700/20 transition-all duration-500">
                    <div 
                      ref={descriptionRef}
                      className="prose prose-gray dark:prose-invert relative overflow-y-auto scrollbar-thin scrollbar-thumb-amber-200 dark:scrollbar-thumb-amber-700 scrollbar-track-transparent"
                      style={{ 
                        maxHeight: isDescriptionOverflowing ? 
                          (slideshowRef.current ? `${slideshowRef.current.offsetHeight - 50}px` : 'calc(100vh-280px)') : 
                          'none',
                        paddingRight: '10px'
                      }}
                    >
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {isTranslating ? (
                          <span className="italic text-gray-400 dark:text-gray-500">{t('translating')}...</span>
                        ) : translatedDescription || property.description}
                      </p>
                    </div>
                    
                    {/* Elegant gradient to indicate scrollable content */}
                    {isDescriptionOverflowing && (
                      <div className="absolute bottom-8 left-8 right-8 h-16 bg-gradient-to-t from-amber-50 dark:from-gray-800 to-transparent pointer-events-none" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image Slider */}
            <div className="lg:col-span-8" ref={slideshowRef}>
              {/* Add a subtle border to enhance the luxury feel */}
              <div className="p-1 bg-gradient-to-r from-amber-200/30 via-amber-400/20 to-amber-200/30 dark:from-amber-700/30 dark:via-amber-500/20 dark:to-amber-700/30 rounded-xl shadow-xl">
              <StackedImageSlider images={property.slideshowImages || property.images} />
              </div>
            </div>
          </div>

          {/* Property Details component will handle its own dark mode through props */}
          <PropertyDetails 
            id={property.id}
            details={{
              bedrooms: property.beds,
              bathrooms: property.baths,
              size: {
                min: property.sqft,
                max: property.sqft,
                unit: 'sq. ft.'
              },
              handover: 'December 2025'
            }}
            payment={{
              downPayment: 20,
              duringConstruction: 50
            }}
            features={{
              residences: property.features.residences,
              luxuryWellness: property.features.luxuryWellness,
              retailDining: property.features.retailDining
            }}
            location={{
              lat: property.location.lat,
              lng: property.location.lng,
              address: property.address,
              distances: property.location.distances
            }}
            similarProperties={similarProperties}
            brochureImages={property.brochureImages || []}
            price={property.price}
            currency={property.currency}
            name={property.name}
          />
        </div>
      </div>
    </div>
  );
}
