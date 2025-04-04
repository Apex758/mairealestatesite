import React, { useState, useEffect, useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import { PropertyCard } from './PropertyCard';
import { GoogleMap, NearbyPlace } from './GoogleMap';
import { Store, Utensils, Building2, School, Train, Sparkle as Park, MapPin, Plus, Heart, Briefcase, Sparkles } from 'lucide-react';
import { useTranslate } from '../hooks/useTranslate';
import { TranslationKey } from '../translations';
import { useGlobal } from '../contexts/GlobalContext';
import { translateText } from '../utils/translateUtils';
import { useUserStore, FavoriteProperty } from '../stores/userStore';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

// Feature list item component for consistent rendering
function FeatureListItem({ feature, isTranslating, t }: { feature: string; isTranslating: boolean; t: (key: TranslationKey) => string }) {
  return (
    // Added dark mode text color
    <li className="flex items-center text-gray-600 dark:text-gray-400"> 
      {isTranslating ? (
        <span className="italic text-gray-400">{t('translating')}...</span>
      ) : (
        <>
          <span className="text-gray-500 dark:text-gray-400 mr-2">
            <Plus className="w-3.5 h-3.5" />
          </span>
          {feature}
        </>
      )}
    </li>
  );
}

interface PropertyDetailsProps {
  id: string; // Added property ID
  details: {
    bedrooms: number;
    bathrooms: number;
    size: {
      min: number;
      max: number;
      unit: string;
    };
    handover: string;
  };
  payment: {
    downPayment: number;
    duringConstruction: number;
  };
  features?: {
    residences: string[];
    luxuryWellness: string[];
    retailDining: string[];
  };
  location: {
    lat?: number;
    lng?: number;
    address?: string; // Added address
    distances: Array<{
      place: string;
      time: number;
      type?: string;
    }>;
  };
  similarProperties: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    bedrooms: number;
    bathrooms: number;
    size: number;
    price: number;
    image: string;
    formattedPrice?: string;
  }>;
  brochureImages?: string[];
  price?: number; // Added price
  currency?: string; // Added currency
  name?: string; // Added property name
}

// Define place types and their icons
const placeTypeIcons: Record<string, React.ReactNode> = {
  cafe: <Utensils className="w-4 h-4" />,
  restaurant: <Utensils className="w-4 h-4" />,
  supermarket: <Store className="w-4 h-4" />,
  school: <School className="w-4 h-4" />,
  transit_station: <Train className="w-4 h-4" />,
  park: <Park className="w-4 h-4" />,
  default: <Building2 className="w-4 h-4" />
};

// Map place types to translation keys
const placeTypeToTranslationKey: Record<string, TranslationKey> = {
  cafe: 'cafes',
  restaurant: 'restaurants',
  supermarket: 'supermarkets',
  school: 'schools',
  transit_station: 'transit',
  park: 'parks',
};

// Map place types to description translation keys
const placeTypeToDescriptionKey: Record<string, TranslationKey> = {
  cafe: 'cafeDescription',
  restaurant: 'restaurantDescription',
  supermarket: 'supermarketDescription',
  school: 'schoolDescription',
  transit_station: 'transitDescription',
  default: 'defaultPlaceDescription',
};

export function PropertyDetails({
  id,
  details,
  payment,
  features = { residences: [], luxuryWellness: [], retailDining: [] },
  location,
  similarProperties,
  brochureImages = [],
  price = 0,
  currency = 'AED',
  name = 'Luxury Property'
}: PropertyDetailsProps) {
  const { t } = useTranslate();
  const { language } = useGlobal();
  const { isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useUserStore();
  const [isFavorited, setIsFavorited] = useState(false);
  const [translatedFeatures, setTranslatedFeatures] = useState(features);
  const [isTranslating, setIsTranslating] = useState(false);

  // Translate features when language changes
  useEffect(() => {
    const translateFeatures = async () => {
      if (language === 'en') {
        setTranslatedFeatures(features);
        return;
      }

      setIsTranslating(true);
      try {
        const translated = {
          residences: await Promise.all(features.residences.map(feature => 
            translateText(feature, language)
          )),
          luxuryWellness: await Promise.all(features.luxuryWellness.map(feature => 
            translateText(feature, language)
          )),
          retailDining: await Promise.all(features.retailDining.map(feature => 
            translateText(feature, language)
          ))
        };
        setTranslatedFeatures(translated);
      } catch (error) {
        console.error('Error translating features:', error);
        setTranslatedFeatures(features);
      } finally {
        setIsTranslating(false);
      }
    };

    translateFeatures();
  }, [features, language]);
  const [selectedPlaceType, setSelectedPlaceType] = useState<string | null>(null);
  const [selectedPredefinedPlace, setSelectedPredefinedPlace] = useState<number | null>(null);
  const [selectedNearbyPlace, setSelectedNearbyPlace] = useState<NearbyPlace | null>(null);
  const [placeCache, setPlaceCache] = useState<Record<string, NearbyPlace[]>>({});
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
const [isBrochureOpen, setIsBrochureOpen] = useState(false);
const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mapCenter, setMapCenter] = useState({
    lat: location?.lat || 0,
    lng: location?.lng || 0
  });
  
  // Update map center when location prop changes
  useEffect(() => {
    if (location?.lat && location?.lng) {
      console.log(`PropertyDetails: Location changed to ${location.lat}, ${location.lng}`);
      setMapCenter({
        lat: location.lat,
        lng: location.lng
      });
      
      // Clear place cache when location changes
      // This ensures we don't show cached places from a different location
      setPlaceCache({});
      setNearbyPlaces([]);
      setSelectedNearbyPlace(null);
    }
  }, [location]);
  
  // Set default travel mode to WALKING
  const travelMode = 'WALKING';
  
  // Set a flag for read-only mode - always true for PropertyDetails
  // This ensures the location can't be changed from PropertyDetails
  const readOnly = true;

  const distances = location?.distances || [];

  // When selectedPlaceType changes, we need to trigger a refresh
  useEffect(() => {
    // Force a re-render of the GoogleMap component when place type changes
    console.log(`PropertyDetails: Place type changed to ${selectedPlaceType}`);
    
    // Clear previous results when type changes
    setNearbyPlaces([]);
    setSelectedNearbyPlace(null);
  }, [selectedPlaceType]);

  // Check if property is in favorites and update when language or currency changes
  useEffect(() => {
    setIsFavorited(isFavorite(id));
  }, [id, isFavorite, language]); // Add language dependency to refresh when language changes

  // Debug nearby places
  useEffect(() => {
    console.log(`PropertyDetails has ${nearbyPlaces.length} nearby places in state`);
  }, [nearbyPlaces]);

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add properties to favorites');
      return;
    }

    if (isFavorited) {
      removeFromFavorites(id);
      toast.success('Removed from favorites');
    } else {
      // Create favorite property object
      const favoriteProperty: FavoriteProperty = {
        id,
        name,
        image: brochureImages && brochureImages.length > 0 ? brochureImages[0] : '/property-placeholder.jpg',
        address: location.address || 'Dubai, UAE',
        price,
        currency,
        beds: details.bedrooms,
        baths: details.bathrooms,
        sqft: details.size.max
      };
      
      addToFavorites(favoriteProperty);
      toast.success('Added to favorites');
    }
    
    setIsFavorited(!isFavorited);
  };
  
  // Preserve place list once it's fetched until a new type is selected
  useEffect(() => {
    // This ensures that once places are loaded, they won't reorder
    // Only a new place type selection will clear the list
    const handleBeforeUnload = () => {
      // This is just to detect page refreshes
      console.log("Page will refresh");
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handlePlaceTypeChange = (type: string | null) => {
    console.log(`Setting place type to: ${type}`);
    
    // Always set the selected place type directly
    // This is critical for triggering the useEffect in GoogleMap
    setSelectedPlaceType(type);
    
    // Reset selected places when type changes
    setSelectedPredefinedPlace(null);
    setSelectedNearbyPlace(null);
    
    // Clear nearby places to ensure UI updates while loading
    setNearbyPlaces([]);
    
    // Check if we have cached places for this type - but do this AFTER setting the type
    // This ensures the GoogleMap component always gets the type change
    if (type && placeCache[type]) {
      console.log(`Using cached places for ${type}`);
      // Use setTimeout to ensure the type change is processed first
      setTimeout(() => {
        setNearbyPlaces(placeCache[type]);
      }, 0);
    }
  };

  // Handler for when nearby places are found by the GoogleMap component
  // Memoized with useCallback to prevent infinite re-renders
  const handleNearbyPlacesFound = useCallback((places: NearbyPlace[]) => {
    console.log(`PropertyDetails received ${places.length} nearby places`);
    
    // Cache the places by their type
    if (selectedPlaceType) {
      setPlaceCache(prev => ({
        ...prev,
        [selectedPlaceType]: places
      }));
    }
    
    setNearbyPlaces(places);
    console.log("Updated nearbyPlaces state with new places");
  }, [selectedPlaceType]); // Only re-create when selectedPlaceType changes

  return (
    <div>
{/* Brochure Popup */}
<Dialog open={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"> 
  <Dialog.Panel className="bg-white dark:bg-gray-800/95 rounded-xl shadow-2xl p-8 max-w-5xl w-full border border-amber-200/20 dark:border-amber-500/20"> 
    <Dialog.Title className="text-2xl font-light mb-6 text-gray-900 dark:text-white flex items-center">
      <span className="h-px w-8 bg-amber-400 mr-3"></span>
      {t('brochureImages')}
    </Dialog.Title> 
    
    {/* No brochure images message */}
    {(!brochureImages || brochureImages.length === 0) ? (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p>{t('noBrochureImages')}</p>
      </div>
    ) : (
      <>
        {/* Main large image with elegant frame */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-300/10 rounded-xl"></div>
          <div className="p-1 bg-gradient-to-r from-amber-200/30 via-amber-400/20 to-amber-200/30 dark:from-amber-700/30 dark:via-amber-500/20 dark:to-amber-700/30 rounded-xl shadow-xl">
            <img 
              src={brochureImages[activeImageIndex || 0]} 
              alt={`Brochure main view`} 
              className="rounded-lg object-contain w-full h-[500px] mx-auto bg-white/50 dark:bg-black/30"
            />
          </div>
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
            {activeImageIndex + 1} / {brochureImages.length}
          </div>
        </div>
        
        {/* Thumbnails with elegant styling */}
        <div className="flex flex-wrap gap-3 justify-center">
          {brochureImages.map((img, index) => (
            <button 
              key={index} 
              onClick={() => setActiveImageIndex(index)}
              className={`relative p-0.5 rounded-lg transition-all transform hover:scale-105 ${
                index === activeImageIndex 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20' 
                  : 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 hover:from-amber-300 hover:to-amber-500'
              }`}
            >
              <div className="p-0.5 bg-white dark:bg-gray-800 rounded-lg">
                <img 
                  src={img} 
                  alt={`Thumbnail ${index}`} 
                  className="h-16 w-20 object-cover rounded-md"
                />
              </div>
            </button>
          ))}
        </div>
      </>
    )}
    
    {/* Elegant close button */}
    <div className="mt-8 flex justify-center">
      <button
        onClick={() => setIsBrochureOpen(false)}
        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/20 transition-all transform hover:scale-105 font-medium" 
      >
        {t('close')}
      </button>
    </div>
  </Dialog.Panel>
</Dialog>

{/* Property Details Section */}
      <div className="mb-20">
        {/* Elegant section header with gold accents */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-200 dark:via-amber-700 to-transparent" />
          <h2 className="text-3xl font-extralight text-gray-900 dark:text-white tracking-wide">{t('propertyDetails')}</h2>
          
          {/* Favorite button with luxury styling */}
          <button 
            onClick={handleFavoriteToggle}
            className="flex items-center justify-center p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg border border-amber-100 dark:border-amber-900/50 hover:border-amber-300 dark:hover:border-amber-700 transition-all transform hover:scale-105"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`w-6 h-6 ${isFavorited ? 'text-amber-500 fill-current' : 'text-gray-400 dark:text-gray-500 hover:text-amber-400'}`} 
            />
          </button>
        </div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Luxury card with gold accents */}
          <div className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-800/80 p-8 rounded-xl shadow-xl border border-amber-100/50 dark:border-amber-700/20 hover:shadow-2xl transition-all duration-500"> 
            <div className="flex items-center mb-5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-200 dark:shadow-amber-900/30 mr-3">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-light tracking-wide text-gray-900 dark:text-white">{t('details')}</h3>
            </div>
            <div className="space-y-5">
              <div className="border-b border-amber-100 dark:border-gray-700 pb-3">
                <p className="text-amber-700 dark:text-amber-400 text-sm font-medium mb-1">{t('sizeRange')}</p> 
                <p className="font-medium text-2xl text-gray-900 dark:text-white"> 
                  {details.size.min} - {details.size.max} <span className="text-sm font-light">{details.size.unit}</span>
                </p>
              </div>
              <div className="border-b border-amber-100 dark:border-gray-700 pb-3">
                <p className="text-amber-700 dark:text-amber-400 text-sm font-medium mb-1">{t('bedrooms')}</p> 
                <p className="font-medium text-2xl text-gray-900 dark:text-white">{details.bedrooms}</p> 
              </div>
              <div className="border-b border-amber-100 dark:border-gray-700 pb-3">
                <p className="text-amber-700 dark:text-amber-400 text-sm font-medium mb-1">{t('bathrooms')}</p> 
                <p className="font-medium text-2xl text-gray-900 dark:text-white">{details.bathrooms}</p> 
              </div>
              <div>
                <p className="text-amber-700 dark:text-amber-400 text-sm font-medium mb-1">{t('handover')}</p> 
                <p className="font-medium text-xl text-gray-900 dark:text-white">{details.handover}</p> 
              </div>
            </div>
          </div>
          {/* Added dark mode background and text */}
<div className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-800/80 p-8 rounded-xl shadow-xl border border-amber-100/50 dark:border-amber-700/20 hover:shadow-2xl transition-all duration-500"> 
  <div className="flex items-center mb-5">
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-200 dark:shadow-amber-900/30 mr-3">
      <Briefcase className="w-4 h-4 text-white" />
    </div>
    <h3 className="text-xl font-light tracking-wide text-gray-900 dark:text-white">{t('paymentPlan')}</h3>
  </div>
  <div className="space-y-5">
    <div className="border-b border-amber-100 dark:border-gray-700 pb-3">
      <p className="text-amber-700 dark:text-amber-400 text-sm font-medium mb-1">{t('downPayment')}</p>
      <div className="flex items-end">
        <p className="font-medium text-3xl text-gray-900 dark:text-white">{payment.downPayment}</p>
        <p className="text-xl text-amber-600 dark:text-amber-500 ml-1">%</p>
      </div>
    </div>
    <div>
      <p className="text-amber-700 dark:text-amber-400 text-sm font-medium mb-1">{t('duringConstruction')}</p>
      <div className="flex items-end">
        <p className="font-medium text-3xl text-gray-900 dark:text-white">{payment.duringConstruction}</p>
        <p className="text-xl text-amber-600 dark:text-amber-500 ml-1">%</p>
      </div>
    </div>
  </div>
</div>

<div className="flex items-center justify-center [perspective:1500px]">
  <button
    onClick={() => setIsBrochureOpen(true)}
    className="group flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-2xl rounded-xl transition-all duration-500 [transform:rotateY(-25deg)] hover:[transform:rotateY(0deg)] [transform-style:preserve-3d] border border-amber-200/50 dark:border-amber-700/30 hover:border-amber-300 dark:hover:border-amber-600"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-amber-300/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <span className="text-xl font-light mb-5 text-gray-900 dark:text-white tracking-wide flex items-center">
      <span className="h-px w-5 bg-amber-400 mr-2"></span>
      {t('brochure')}
      <span className="h-px w-5 bg-amber-400 ml-2"></span>
    </span>
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/30 to-amber-600/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <img 
        src={brochureImages && brochureImages.length > 0 ? brochureImages[0] : "/brochure-placeholder.png"} 
        alt="Brochure" 
        className="w-80 h-60 object-cover shadow-lg rounded-lg relative z-10 group-hover:shadow-amber-200/50 dark:group-hover:shadow-amber-900/50 transition-all duration-500" 
      />
    </div>
    <div className="mt-4 text-sm text-amber-600 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      {/* Using a string directly since 'clickToView' may not be in the translation keys */}
      Click to view
    </div>
  </button>
</div>
        </div>
      </div>

      {/* Features & Amenities Section */}
      {(features.residences.length > 0 || features.luxuryWellness.length > 0 || features.retailDining.length > 0) && (
        <div className="mb-20">
          {/* Elegant section header with gold accents */}
          <div className="flex items-center justify-end gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-200 dark:via-amber-700 to-transparent" />
            <h2 className="text-3xl font-extralight text-gray-900 dark:text-white tracking-wide">{t('features')}</h2> 
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {translatedFeatures.residences.length > 0 && (
              <div className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-800/80 p-8 rounded-xl shadow-xl border border-amber-100/50 dark:border-amber-700/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-200 dark:shadow-amber-900/30 mr-3">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-light tracking-wide text-gray-900 dark:text-white">{t('residences')}</h3>
                </div>
                <ul className="space-y-3 mt-6">
                  {translatedFeatures.residences.map((feature, index) => (
                    <FeatureListItem
                      key={index}
                      feature={feature}
                      isTranslating={isTranslating}
                      t={t}
                    />
                  ))}
                </ul>
              </div>
            )}
            {translatedFeatures.luxuryWellness.length > 0 && (
              <div className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-800/80 p-8 rounded-xl shadow-xl border border-amber-100/50 dark:border-amber-700/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-200 dark:shadow-amber-900/30 mr-3">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-light tracking-wide text-gray-900 dark:text-white">{t('luxuryWellness')}</h3>
                </div>
                <ul className="space-y-3 mt-6">
                  {translatedFeatures.luxuryWellness.map((feature, index) => (
                    <FeatureListItem
                      key={index}
                      feature={feature}
                      isTranslating={isTranslating}
                      t={t}
                    />
                  ))}
                </ul>
              </div>
            )}
            {translatedFeatures.retailDining.length > 0 && (
              <div className="md:col-span-2 bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-800/80 p-8 rounded-xl shadow-xl border border-amber-100/50 dark:border-amber-700/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-200 dark:shadow-amber-900/30 mr-3">
                    <Utensils className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-light tracking-wide text-gray-900 dark:text-white">{t('retailDining')}</h3>
                </div>
                <ul className="space-y-3 mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  {translatedFeatures.retailDining.map((feature, index) => (
                    <FeatureListItem
                      key={index}
                      feature={feature}
                      isTranslating={isTranslating}
                      t={t}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Location Section */}
      <div className="mb-20">
        {/* Elegant section header with gold accents */}
        <div className="flex items-center justify-end gap-4 mb-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-200 dark:via-amber-700 to-transparent" />
          <h2 className="text-3xl font-extralight text-gray-900 dark:text-white tracking-wide">{t('location')}</h2> 
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Map on the left (3 columns) with luxury styling */}
          <div className="lg:col-span-3">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-amber-100/50 dark:border-amber-700/20">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-amber-300/5 pointer-events-none z-10"></div>
              <GoogleMap 
                center={mapCenter}
                onCenterChange={setMapCenter}
                readOnly={readOnly}
                places={distances}
                selectedType={selectedPlaceType}
                travelMode={travelMode}
                selectedNearbyPlace={selectedNearbyPlace}
                selectedPredefinedPlace={selectedPredefinedPlace}
                onSelectedPredefinedPlaceChange={setSelectedPredefinedPlace}
                onSelectedNearbyPlaceChange={setSelectedNearbyPlace}
                onNearbyPlacesFound={handleNearbyPlacesFound}
                markerColor="red" // Changed marker color to red
              />
            </div>
          </div>
          
          {/* Info and buttons on the right (2 columns) */}
          <div className="lg:col-span-2">
            {/* Place type filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              {/* "All Places" button removed */}
              
              {Object.entries(placeTypeToTranslationKey).map(([type, translationKey]) => (
                <button
                  key={type}
                  onClick={() => handlePlaceTypeChange(type)}
                  // Added dark mode styles for filter buttons
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-all ${
                    selectedPlaceType === type 
                      ? 'bg-gray-900 dark:bg-blue-600 text-white shadow-sm' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {placeTypeIcons[type] || placeTypeIcons.default}
                  <span>{t(translationKey)}</span>
                </button>
              ))}
            </div>

            {/* Display nearby places list */}
            {selectedPlaceType && (
              <div className="mt-6">
                {/* Added dark mode text */}
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2 text-gray-900 dark:text-white"> 
                  {placeTypeIcons[selectedPlaceType] || placeTypeIcons.default}
                  <span>{t('nearby').replace('{0}', t(placeTypeToTranslationKey[selectedPlaceType]))}</span> 
                </h3>
                
                {/* Description of the place type */}
                {/* Added dark mode background and text */}
                <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg shadow-sm"> 
                  <p className="text-sm text-gray-600 dark:text-blue-200"> 
                    {t(placeTypeToDescriptionKey[selectedPlaceType] || placeTypeToDescriptionKey.default)}
                  </p>
                </div>
                
                {nearbyPlaces.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {/* Use stableIndex as key to prevent reordering */}
                    {nearbyPlaces.map((place) => (
                      // Added dark mode styles for place items
                      <div 
                        key={`place-${place.stableIndex || place.id}`}
                        className="p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all shadow-sm" 
                        onClick={() => setSelectedNearbyPlace(place)}
                      >
                        <div className="font-medium text-gray-900 dark:text-white">{place.name}</div> 
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{place.vicinity}</div> 
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center"> 
                          <MapPin className="w-3.5 h-3.5 mr-1" />
                          {place.distance} • {place.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Added dark mode styles for "no places found"
                  <div className="p-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 text-center shadow-sm"> 
                    <MapPin className="w-6 h-6 mx-auto mb-2 text-gray-400 dark:text-gray-500" /> 
                    <p>{t('noPlacesFound').replace('{0}', t(placeTypeToTranslationKey[selectedPlaceType]))}</p>
                    {/* Added dark mode link color */}
                    <button 
                      onClick={() => setSelectedPlaceType(null)}
                      className="mt-3 text-blue-600 dark:text-blue-400 text-sm hover:underline" 
                    >
                      {t('tryAnotherCategory')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <div className="mb-20">
          {/* Elegant section header with gold accents */}
          <div className="flex items-center justify-end gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-200 dark:via-amber-700 to-transparent" />
            <h2 className="text-3xl font-extralight text-gray-900 dark:text-white tracking-wide">{t('similarProperties')}</h2> 
          </div>
          
          {/* Elegant intro text */}
          <div className="text-center mb-10">
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover more exceptional properties that match your preferences and lifestyle aspirations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {similarProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                slideshowImages={[property.image]} // Convert single image to array for slideshowImages
                price={property.formattedPrice || `$${new Intl.NumberFormat().format(property.price)}`}
                name={property.name}
                address={property.name}
                beds={property.bedrooms}
                baths={property.bathrooms}
                sqft={property.size}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
