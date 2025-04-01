import React, { useState, useEffect } from 'react';
import { PropertyCard } from './PropertyCard';
import { GoogleMap } from './GoogleMap';
import { Store, Utensils, Building2, School, Train, Sparkle as Park, X, MapPin } from 'lucide-react';

interface PropertyDetailsProps {
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
  }>;
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

// Define place type labels
const placeTypeLabels: Record<string, string> = {
  cafe: 'Cafes',
  restaurant: 'Restaurants',
  supermarket: 'Supermarkets',
  school: 'Schools',
  transit_station: 'Transit',
  park: 'Parks',
};

export function PropertyDetails({
  details,
  payment,
  features = { residences: [], luxuryWellness: [], retailDining: [] },
  location,
  similarProperties
}: PropertyDetailsProps) {
  const [selectedPlaceType, setSelectedPlaceType] = useState<string | null>(null);
  const [selectedPredefinedPlace, setSelectedPredefinedPlace] = useState<number | null>(null);
  const [selectedNearbyPlace, setSelectedNearbyPlace] = useState<any | null>(null);
  const [placeCache, setPlaceCache] = useState<Record<string, any[]>>({});
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState({
    lat: location?.lat || 0,
    lng: location?.lng || 0
  });
  
  // Set default travel mode to WALKING
  const travelMode = 'WALKING';
  
  // Set a flag for read-only mode (this could be passed as a prop)
  const readOnly = false;

  const distances = location?.distances || [];
  const placeTypes = Array.from(new Set(distances.map(d => d.type || 'default')));
  const filteredPlaces = selectedPlaceType 
    ? distances.filter(d => (d.type || 'default') === selectedPlaceType)
    : distances;

  // When selectedPlaceType changes, we need to trigger a refresh
  useEffect(() => {
    // Force a re-render of the GoogleMap component when place type changes
    console.log(`PropertyDetails: Place type changed to ${selectedPlaceType}`);
    
    // Clear previous results when type changes
    setNearbyPlaces([]);
    setSelectedNearbyPlace(null);
  }, [selectedPlaceType]);
  
  // Preserve place list once it's fetched until a new type is selected
  useEffect(() => {
    // This ensures that once places are loaded, they won't reorder
    // Only a new place type selection will clear the list
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
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
    
    // Check if we have cached places for this type
    if (type && placeCache[type]) {
      console.log(`Using cached places for ${type}`);
      setNearbyPlaces(placeCache[type]);
      setSelectedPlaceType(type);
      return;
    }
    
    setSelectedPlaceType(type);
    // Reset selected places when type changes
    setSelectedPredefinedPlace(null);
    setSelectedNearbyPlace(null);
  };

  // Handler for when nearby places are found by the GoogleMap component
  const handleNearbyPlacesFound = (places: any[]) => {
    console.log(`PropertyDetails received ${places.length} nearby places`);
    
    // Cache the places by their type
    if (selectedPlaceType) {
      setPlaceCache(prev => ({
        ...prev,
        [selectedPlaceType]: places
      }));
    }
    
    setNearbyPlaces(places);
  };

  return (
    <div>
      {/* Property Details Section */}
      <div className="mb-16">
        <div className="flex items-center justify-end gap-4 mb-8">
          <div className="flex-1 border-b border-gray-200" />
          <h2 className="text-2xl font-light">Property Details</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600">Size Range</p>
                <p className="font-medium">
                  {details.size.min} - {details.size.max} {details.size.unit}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Bedrooms</p>
                <p className="font-medium">{details.bedrooms}</p>
              </div>
              <div>
                <p className="text-gray-600">Bathrooms</p>
                <p className="font-medium">{details.bathrooms}</p>
              </div>
              <div>
                <p className="text-gray-600">Handover</p>
                <p className="font-medium">{details.handover}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Payment Plan</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600">Down Payment</p>
                <p className="font-medium">{payment.downPayment}%</p>
              </div>
              <div>
                <p className="text-gray-600">During Construction</p>
                <p className="font-medium">{payment.duringConstruction}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features & Amenities Section */}
      {(features.residences.length > 0 || features.luxuryWellness.length > 0 || features.retailDining.length > 0) && (
        <div className="mb-16">
          <div className="flex items-center justify-end gap-4 mb-8">
            <div className="flex-1 border-b border-gray-200" />
            <h2 className="text-2xl font-light">Features & Amenities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.residences.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Residences</h3>
                <ul className="space-y-2">
                  {features.residences.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {features.luxuryWellness.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Luxury & Wellness</h3>
                <ul className="space-y-2">
                  {features.luxuryWellness.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {features.retailDining.length > 0 && (
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold mb-4">Retail & Dining</h3>
                <ul className="space-y-2">
                  {features.retailDining.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                      {feature}
                    </li>
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
          <div className="flex-1 border-b border-gray-200" />
          <h2 className="text-2xl font-light">Location</h2>
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
              
              {Object.entries(placeTypeLabels).map(([type, label]) => (
                <button
                  key={type}
                  onClick={() => handlePlaceTypeChange(type)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-all ${
                    selectedPlaceType === type 
                      ? 'bg-gray-900 text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {placeTypeIcons[type] || placeTypeIcons.default}
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Display nearby places list */}
            {selectedPlaceType && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  {placeTypeIcons[selectedPlaceType] || placeTypeIcons.default}
                  <span>Nearby {placeTypeLabels[selectedPlaceType]}</span> 
                </h3>
                
                {/* Description of the place type */}
                <div className="mb-4 p-4 bg-blue-50 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">
                    {selectedPlaceType === 'cafe' && "Enjoy a relaxing cup of coffee or tea at these nearby cafes within easy reach of the property."}
                    {selectedPlaceType === 'restaurant' && "Discover nearby dining options for everything from quick meals to fine dining experiences."}
                    {selectedPlaceType === 'supermarket' && "Conveniently shop for groceries and essentials at these nearby supermarkets."}
                    {selectedPlaceType === 'school' && "Educational institutions including schools, colleges and universities in the vicinity."}
                    {selectedPlaceType === 'transit_station' && "Easily access public transportation options from these nearby transit stations."}
                    {!['cafe', 'restaurant', 'supermarket', 'school', 'transit_station'].includes(selectedPlaceType) && 
                      "Points of interest located near the property."}
                  </p>
                </div>
                
                {nearbyPlaces.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {/* Use stableIndex as key to prevent reordering */}
                    {nearbyPlaces.map((place) => (
                      <div 
                        key={`place-${place.stableIndex || place.id}`}
                        className="p-4 bg-white border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-all shadow-sm"
                        onClick={() => setSelectedNearbyPlace(place)}
                      >
                        <div className="font-medium text-gray-900">{place.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{place.vicinity}</div>
                        <div className="text-sm text-gray-500 mt-2 flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1" />
                          {place.distance} • {place.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 bg-white border border-gray-100 rounded-lg text-gray-500 text-center shadow-sm">
                    <MapPin className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    <p>No {placeTypeLabels[selectedPlaceType]} found nearby.</p>
                    <button 
                      onClick={() => setSelectedPlaceType(null)}
                      className="mt-3 text-blue-600 text-sm hover:underline"
                    >
                      Try another category
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
            <div className="flex-1 border-b border-gray-200" />
            <h2 className="text-2xl font-light">Similar Properties</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                image={property.image}
                price={`$${new Intl.NumberFormat().format(property.price)}`}
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