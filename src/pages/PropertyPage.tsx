import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { PropertyDetails } from '../components/PropertyDetails';
import { StackedImageSlider } from '../components/StackedImageSlider';
import { CurrencyConverter } from '../components/CurrencyConverter';
import { usePropertyStore } from '../stores/propertyStore';

interface PropertyPageProps {
  previewData?: any; // For preview mode
}

export function PropertyPage({ previewData }: PropertyPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const properties = usePropertyStore((state) => state.properties);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isDescriptionOverflowing, setIsDescriptionOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);

  // Use preview data if provided, otherwise find property from store
  const property = previewData || properties.find(p => p.id === id);

  // Redirect to home if property not found (only in non-preview mode)
  useEffect(() => {
    if (!previewData && !property) {
      navigate('/');
    }
  }, [property, navigate, previewData]);

  useEffect(() => {
    if (descriptionRef.current && slideshowRef.current) {
      const descHeight = descriptionRef.current.scrollHeight;
      const slideHeight = slideshowRef.current.offsetHeight;
      setIsDescriptionOverflowing(descHeight > slideHeight);
    }
  }, [property?.description]);

  if (!property) {
    return null;
  }

  const similarProperties = properties
    .filter(p => p.id !== property.id)
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
      image: p.image
    }));

  return (
    <div className={previewData ? 'pt-16' : ''}>
      {/* Header Background */}
      {!previewData && (
        <div className="h-24 bg-white fixed top-0 left-0 right-0 z-40 border-b shadow-sm" />
      )}
      
      <div className={`relative ${previewData ? '' : 'z-30 pt-24'}`}>
        <div className="max-w-8xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Left Column - Property Info */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-4xl font-light">{property.name}</h1>
                  <div className="text-2xl font-light text-gray-900">
                    <CurrencyConverter amount={property.price} baseCurrency={property.currency} />
                  </div>
                </div>
                <div className="relative">
                  <div 
                    ref={descriptionRef}
                    className={`prose prose-gray relative ${
                      !isDescriptionExpanded && isDescriptionOverflowing ? 'max-h-[calc(100vh-200px)] overflow-hidden' : ''
                    }`}
                  >
                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                  </div>
                  
                  {/* Only show fade and button if content is overflowing */}
                  {isDescriptionOverflowing && (
                    <>
                      {!isDescriptionExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                      )}
                      <button
                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                        className="mt-2 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
                      >
                        {isDescriptionExpanded ? (
                          <>Show Less <ChevronUp className="w-4 h-4" /></>
                        ) : (
                          <>Read More <ChevronDown className="w-4 h-4" /></>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right Column - Image Slider */}
            <div className="lg:col-span-8" ref={slideshowRef}>
              <StackedImageSlider images={property.images} />
            </div>
          </div>

          {/* Property Details */}
          <PropertyDetails 
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
              distances: property.location.distances
            }}
            similarProperties={similarProperties}
          />
        </div>
      </div>
    </div>
  );
}