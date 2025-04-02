import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap as GoogleMapComponent, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Coffee, Utensils, ShoppingCart, School, Train } from 'lucide-react';

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  onCenterChange?: (center: { lat: number; lng: number }) => void;
  readOnly?: boolean;
  places?: Array<{
    place: string;
    time: number;
    type?: string;
    location?: {
      lat: number;
      lng: number;
    };
  }>;
  selectedType?: string | null;
  travelMode?: 'WALKING' | 'DRIVING';
  selectedNearbyPlace?: NearbyPlace | null;
  selectedPredefinedPlace?: number | null;
  onSelectedPredefinedPlaceChange?: (index: number | null) => void;
  onSelectedNearbyPlaceChange?: (place: NearbyPlace | null) => void;
  onNearbyPlacesFound?: (places: NearbyPlace[]) => void;
  markerColor?: string; // New prop for marker color
}

export interface NearbyPlace {
  id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  types: string[];
  distance?: string;
  duration?: string;
  rating?: number;
  userRatingsTotal?: number;
  icon?: string;
  distanceValue?: number;
  stableIndex?: number;
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

// Define libraries for Google Maps
// Using a type that works with the Google Maps API
const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

// Define place types and their icons
const placeTypeIcons: Record<string, React.ReactNode> = {
  cafe: <Coffee className="w-4 h-4" />,
  restaurant: <Utensils className="w-4 h-4" />,
  supermarket: <ShoppingCart className="w-4 h-4" />,
  school: <School className="w-4 h-4" />,
  transit_station: <Train className="w-4 h-4" />,
  default: <MapPin className="w-4 h-4" />
};

export function GoogleMap({ 
  center, 
  onCenterChange, 
  readOnly = false, 
  places = [], 
  selectedType,
  travelMode = 'WALKING',
  selectedNearbyPlace,
  selectedPredefinedPlace,
  onSelectedPredefinedPlaceChange,
  onSelectedNearbyPlaceChange,
  onNearbyPlacesFound,
  markerColor = 'yellow' // Default to yellow if not specified
}: GoogleMapProps) {
  const [marker, setMarker] = useState(center);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const mapRef = useRef<google.maps.Map>();
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

  // Initialize places service when map is loaded
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    if (window.google) {
      placesServiceRef.current = new window.google.maps.places.PlacesService(map);
      directionsServiceRef.current = new window.google.maps.DirectionsService();
    }
  }, []);

  // Update marker when center changes (for external center changes)
  useEffect(() => {
    setMarker(center);
  }, [center]);

  // Handle map click for setting the location
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (readOnly || !e.latLng || !onCenterChange) return;

    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setMarker(newLocation);
    onCenterChange(newLocation);
  };

  // Handle manual drag of the marker
  const handleDragEnd = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng || !onCenterChange) return;

    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setMarker(newLocation);
    onCenterChange(newLocation);
  };

  // Fetch real-time nearby places when place type changes
  useEffect(() => {
    let isMounted = true;
    
    const searchNearbyPlaces = async () => {
      if (!placesServiceRef.current || !mapRef.current || !selectedType) {
        if (isMounted) {
          setNearbyPlaces([]);
          if (onNearbyPlacesFound) onNearbyPlacesFound([]);
        }
        return;
      }
      
      console.log(`GoogleMap: Searching for nearby ${selectedType} places...`);
      // Force clear existing places first to ensure UI updates
      setNearbyPlaces([]);
      
      try {
        const request = {
          location: new google.maps.LatLng(marker.lat, marker.lng),
          radius: travelMode === 'WALKING' ? 1200 : 5000, // ~15 min walking or ~10 min driving
          type: selectedType as google.maps.places.PlaceType
        };
        
        console.log('Searching for nearby places with request:', request);

        placesServiceRef.current.nearbySearch(request, (results, status) => {
          if (!isMounted) return;
          
          console.log('Places API response status:', status);
          console.log('Found places count:', results?.length || 0);
          
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            console.log('Places API returned results:', results);
            // Map the results to our NearbyPlace format
            console.log('Processing nearby places results...');
            const places = results.map(place => ({
              id: place.place_id || Math.random().toString(36),
              name: place.name || 'Unnamed Place',
              vicinity: place.vicinity || '',
              geometry: {
                location: {
                  lat: place.geometry?.location?.lat() || 0,
                  lng: place.geometry?.location?.lng() || 0
                }
              },
              types: place.types || [],
              // Add additional properties that might be useful
              rating: place.rating,
              userRatingsTotal: place.user_ratings_total,
              icon: place.icon
            }));
            
            // Calculate distances and durations for each place
            console.log('Calculating travel times for places...');
            calculateTravelTimes(places);
          } else {
            // Handle case where no results are found
            console.log(`No ${selectedType} places found nearby`);
            setNearbyPlaces([]);
            if (onNearbyPlacesFound) onNearbyPlacesFound([]);
          }
        });
      } catch (error) {
        console.error("Error searching for nearby places:", error);
        if (isMounted) {
          setNearbyPlaces([]);
          if (onNearbyPlacesFound) onNearbyPlacesFound([]);
        }
      }
    };
    
    // Only search if we have a selected type
    if (selectedType) {
      searchNearbyPlaces();
    } else {
      setNearbyPlaces([]);
      if (onNearbyPlacesFound) onNearbyPlacesFound([]);
    }
    
    return () => {
      isMounted = false;
    };
  }, [selectedType, marker, travelMode, readOnly, onNearbyPlacesFound]);
  
  // Calculate travel times for all places
  const calculateTravelTimes = (places: NearbyPlace[]) => {
    if (!directionsServiceRef.current || places.length === 0) {
      console.log('No places to calculate travel times for');
      setNearbyPlaces([]);
      if (onNearbyPlacesFound) onNearbyPlacesFound([]);
      return;
    }

    console.log(`Calculating travel times for ${places.length} places`);
    
    const origin = new google.maps.LatLng(marker.lat, marker.lng);
    const placesWithTimes: Array<NearbyPlace & { distanceValue?: number }> = [];
    
    // We'll use a counter to track when all calculations are done
    let completed = 0;
    
    places.forEach(place => {
      try {
        const destination = new google.maps.LatLng(
          place.geometry.location.lat,
          place.geometry.location.lng
        );
        
        directionsServiceRef.current?.route(
          {
            origin,
            destination,
            travelMode: travelMode === 'WALKING' 
              ? google.maps.TravelMode.WALKING 
              : google.maps.TravelMode.DRIVING
          },
          (result, status) => {
            completed++;
            
            if (status === google.maps.DirectionsStatus.OK && result) {
              const route = result.routes[0].legs[0];
              const placeWithTime = {
                ...place,
                distance: route.distance?.text || 'Unknown',
                duration: route.duration?.text || 'Unknown',
                distanceValue: route.distance?.value || 999999 // Add numerical value for sorting
              };
              
              // Filter out places that are too far
              const durationInMinutes = route.duration?.value ? route.duration.value / 60 : 100;
              const maxTime = travelMode === 'WALKING' ? 15 : 10; // 15 min walking or 10 min driving
              
              if (durationInMinutes <= maxTime) {
                placesWithTimes.push(placeWithTime);
              }
            }
            
            // When all calculations are done, sort and update state (only once)
            if (completed === places.length) {
              // Sort places by distance (once, stably)
              const sortedPlaces = [...placesWithTimes].sort((a, b) => 
                (a.distanceValue || 0) - (b.distanceValue || 0)
              );
              
              // Add a stable index for each place to maintain order
              const indexedPlaces = sortedPlaces.map((place, index) => ({
                ...place,
                stableIndex: index // Add a stable index
              }));

              console.log(`Setting ${indexedPlaces.length} nearby places`);
              setNearbyPlaces(indexedPlaces);
              if (onNearbyPlacesFound) {
                console.log('Calling onNearbyPlacesFound with places');
                onNearbyPlacesFound(indexedPlaces);
              } else {
                console.log('onNearbyPlacesFound callback is not defined');
              }
            }
          }
        );
      } catch (error) {
        console.error("Error calculating travel times:", error);
        completed++;
        
        // If all places failed, still update state
        if (completed === places.length) {
          setNearbyPlaces(placesWithTimes);
          if (onNearbyPlacesFound) onNearbyPlacesFound(placesWithTimes);
        }
      }
    });
  };

  // Auto-adjust map bounds to show all visible markers
  useEffect(() => {
    if (mapRef.current && isLoaded) {
      const bounds = new google.maps.LatLngBounds();
      
      // Always include main property marker
      bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
      
      // Include nearby places if any
      if (nearbyPlaces.length > 0) {
        nearbyPlaces.forEach(place => {
          bounds.extend(new google.maps.LatLng(
            place.geometry.location.lat,
            place.geometry.location.lng
          ));
        });
      }
      
      // Include predefined places if not filtered out
      if (!selectedType) {
        places.forEach(place => {
          if (place.location) {
            bounds.extend(new google.maps.LatLng(
              place.location.lat,
              place.location.lng
            ));
          }
        });
      } else {
        // Include only places of selected type
        places
          .filter(place => place.type === selectedType)
          .forEach(place => {
            if (place.location) {
              bounds.extend(new google.maps.LatLng(
                place.location.lat,
                place.location.lng
              ));
            }
          });
      }
      
      // Only adjust bounds if we have more than just the main marker
      if (nearbyPlaces.length > 0 || places.length > 0) {
        mapRef.current.fitBounds(bounds);
        
        // Don't zoom in too far
        const currentZoom = mapRef.current.getZoom();
        if (currentZoom !== undefined && currentZoom > 16) {
          mapRef.current.setZoom(16);
        }
      }
    }
  }, [isLoaded, marker, nearbyPlaces, places, selectedType]);

  if (loadError) {
    return (
      <div className="bg-red-50 text-red-600 rounded-lg p-4">
        <p>Error loading Google Maps. Please check your API key configuration.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="bg-gray-100 rounded-lg h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  // Filter predefined places based on selected type
  const filteredPlaces = selectedType
    ? places.filter(place => place.type === selectedType)
    : places;

  // Handle selecting a predefined place
  const handleSelectPredefinedPlace = (index: number | null) => {
    if (onSelectedPredefinedPlaceChange) {
      onSelectedPredefinedPlaceChange(index);
    }
  };

  // Handle selecting a nearby place
  const handleSelectNearbyPlace = (place: NearbyPlace | null) => {
    if (onSelectedNearbyPlaceChange) {
      onSelectedNearbyPlaceChange(place);
    }
  };

  // Determine marker colors based on props and modernize the styles
  const markerColors = {
    property: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    predefined: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    nearby: `https://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png` // Use the color prop
  };

  // No custom map styles - keeping original Google Maps appearance

  return (
    <div className="relative h-full w-full">
      <GoogleMapComponent
        mapContainerStyle={containerStyle}
        center={marker}
        zoom={15}
        onLoad={onLoad}
        onClick={handleMapClick}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
          }
        }}
      >
        {/* Property marker */}
        <Marker
          position={marker}
          draggable={!readOnly}
          onDragEnd={handleDragEnd}
          icon={{
            url: markerColors.property
          }}
        />
        
        {/* Place markers from the property data */}
        {filteredPlaces.map((place, index) => (
          place.location && (
            <Marker
              key={`place-${index}`}
              position={place.location}
              onClick={() => handleSelectPredefinedPlace(index)}
              icon={{
                url: markerColors.predefined
              }}
            />
          )
        ))}
        
        {/* Show info window for selected predefined place */}
        {(() => {
          // Use IIFE to safely handle the conditional rendering with proper type checking
          if (selectedPredefinedPlace === null || selectedPredefinedPlace === undefined) {
            return null;
          }
          
          const place = filteredPlaces[selectedPredefinedPlace];
          if (!place || !place.location) {
            return null;
          }
          
          return (
            <InfoWindow
              position={place.location}
              onCloseClick={() => handleSelectPredefinedPlace(null)}
            >
              <div className="p-2">
                <h3 className="font-medium">{place.place}</h3>
                <p className="text-sm text-gray-600">
                  {place.time} min away
                </p>
              </div>
            </InfoWindow>
          );
        })()}
        
        {/* Nearby places found from Google Places API */}
        {nearbyPlaces.map((place) => (
          <Marker
            key={`nearby-${place.id}`}
            position={{
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng
            }}
            onClick={() => handleSelectNearbyPlace(place)}
            icon={{
              url: markerColors.nearby // Use the marker color for nearby places
            }}
            animation={google.maps.Animation.DROP} // Add animation for a modern feel
          />
        ))}
        
        {/* Info window for selected nearby place */}
        {selectedNearbyPlace && (
          <InfoWindow
            position={{
              lat: selectedNearbyPlace.geometry.location.lat,
              lng: selectedNearbyPlace.geometry.location.lng
            }}
            onCloseClick={() => handleSelectNearbyPlace(null)}
          >
            <div className="p-2">
              <h3 className="font-medium">{selectedNearbyPlace.name}</h3>
              <p className="text-sm text-gray-600">{selectedNearbyPlace.vicinity}</p>
              <p className="text-sm text-gray-600 mt-1">
                {selectedNearbyPlace.distance} • {selectedNearbyPlace.duration}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMapComponent>

      {!readOnly && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Click on map or drag the blue marker to set location</span>
          </div>
        </div>
      )}
    </div>
  );
}
