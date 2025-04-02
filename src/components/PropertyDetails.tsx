import React, { useState, useEffect, useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import { PropertyCard } from './PropertyCard';
import { GoogleMap, NearbyPlace } from './GoogleMap';
import { Store, Utensils, Building2, School, Train, Sparkle as Park, MapPin, Plus, Heart } from 'lucide-react';
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

  // Check if property is in favorites
  useEffect(() => {
    setIsFavorited(isFavorite(id));
  }, [id, isFavorite]);

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
{/* Added backdrop blur */}
<Dialog open={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"> 
  {/* Added dark mode background and text */}
  <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-4xl w-full"> 
    <Dialog.Title className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Brochure Images</Dialog.Title> 
    
    {/* No brochure images message */}
    {(!brochureImages || brochureImages.length === 0) ? (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>No brochure images available</p>
      </div>
    ) : (
      <>
        {/* Main large image */}
        <div className="mb-4">
          <img 
            src={brochureImages[activeImageIndex || 0]} 
            alt={`Brochure main view`} 
            className="rounded-lg shadow-md object-contain w-full h-[500px] mx-auto"
          />
        </div>
        
        {/* Thumbnails */}
        <div className="flex flex-wrap gap-2 justify-center">
          {brochureImages.map((img, index) => (
            <button 
              key={index} 
              onClick={() => setActiveImageIndex(index)}
              className={`relative p-1 rounded-md transition-all ${
                index === activeImageIndex 
                  ? 'ring-2 ring-blue-500 dark:ring-blue-400' 
                  : 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600'
              }`}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${index}`} 
                className="h-16 w-16 object-cover rounded"
              />
            </button>
          ))}
        </div>
      </>
    )}
    
    {/* Added dark mode button styles */}
    <button
      onClick={() => setIsBrochureOpen(false)}
      className="mt-6 px-4 py-2 bg-gray-800 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-500" 
    >
      Close
    </button>
  </Dialog.Panel>
</Dialog>

{/* Property Details Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between gap-4 mb-8">
          {/* Added dark mode border and text */}
          <div className="flex-1 border-b border-gray-200 dark:border-gray-700" /> 
          <h2 className="text-2xl font-light text-gray-900 dark:text-white">{t('propertyDetails')}</h2>
          
          {/* Favorite button */}
          <button 
            onClick={handleFavoriteToggle}
            className="flex items-center justify-center p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`w-6 h-6 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-400 dark:text-gray-500'}`} 
            />
          </button>
        </div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Added dark mode background and text */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm"> 
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t('details')}</h3> 
            <div className="space-y-3">
              <div>
                <p className="text-gray-600 dark:text-gray-400">{t('sizeRange')}</p> 
                <p className="font-medium text-gray-900 dark:text-white"> 
                  {details.size.min} - {details.size.max} {details.size.unit}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">{t('bedrooms')}</p> 
                <p className="font-medium text-gray-900 dark:text-white">{details.bedrooms}</p> 
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">{t('bathrooms')}</p> 
                <p className="font-medium text-gray-900 dark:text-white">{details.bathrooms}</p> 
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">{t('handover')}</p> 
                <p className="font-medium text-gray-900 dark:text-white">{details.handover}</p> 
              </div>
            </div>
          </div>
          {/* Added dark mode background and text */}
<div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm"> 
  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t('paymentPlan')}</h3> 
  <div className="space-y-3">
    <div>
      <p className="text-gray-600 dark:text-gray-400">{t('downPayment')}</p> 
      <p className="font-medium text-gray-900 dark:text-white">{payment.downPayment}%</p> 
    </div>
    <div>
      <p className="text-gray-600 dark:text-gray-400">{t('duringConstruction')}</p> 
      <p className="font-medium text-gray-900 dark:text-white">{payment.duringConstruction}%</p> 
    </div>
  </div>
</div>

<div className="flex items-center justify-center [perspective:1000px]"> {/* Added perspective for 3D effect */}
  {/* Added dark mode background and text */}
  <button
    onClick={() => setIsBrochureOpen(true)}
    className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-700 shadow-xl rounded-lg transition-transform duration-300 [transform:rotateY(-25deg)] hover:[transform:rotateY(0deg)] [transform-style:preserve-3d]" // Changed rotation to -25deg (left), increased padding
  >
    <span className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Brochure</span> {/* Increased font size and margin */}
    <img 
      src={brochureImages && brochureImages.length > 0 ? brochureImages[0] : "/brochure-placeholder.png"} 
      alt="Brochure" 
      className="w-80 h-60 object-cover shadow-lg" 
    /> {/* Display first brochure image if available */}
  </button>
</div>
        </div>
      </div>

      {/* Features & Amenities Section */}
      {(features.residences.length > 0 || features.luxuryWellness.length > 0 || features.retailDining.length > 0) && (
        <div className="mb-16">
          <div className="flex items-center justify-end gap-4 mb-8">
            {/* Added dark mode border and text */}
            <div className="flex-1 border-b border-gray-200 dark:border-gray-700" /> 
            <h2 className="text-2xl font-light text-gray-900 dark:text-white">{t('features')}</h2> 
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {translatedFeatures.residences.length > 0 && (
              <div>
                {/* Added dark mode text */}
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t('residences')}</h3> 
                <ul className="space-y-2">
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
              <div>
                {/* Added dark mode text */}
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t('luxuryWellness')}</h3> 
                <ul className="space-y-2">
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
              <div className="md:col-span-2">
                {/* Added dark mode text */}
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t('retailDining')}</h3> 
                <ul className="space-y-2">
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
      <div className="mb-16">
        <div className="flex items-center justify-end gap-4 mb-8">
          {/* Added dark mode border and text */}
          <div className="flex-1 border-b border-gray-200 dark:border-gray-700" /> 
          <h2 className="text-2xl font-light text-gray-900 dark:text-white">{t('location')}</h2> 
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Map on the left (3 columns) */}
          <div className="lg:col-span-3">
            <div className="relative rounded-lg overflow-hidden shadow-md">
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
        <div className="mb-16">
          <div className="flex items-center justify-end gap-4 mb-8">
            {/* Added dark mode border and text */}
            <div className="flex-1 border-b border-gray-200 dark:border-gray-700" /> 
            <h2 className="text-2xl font-light text-gray-900 dark:text-white">{t('similarProperties')}</h2> 
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
