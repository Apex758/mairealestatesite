import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap as GoogleMapComponent, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

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
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

export function GoogleMap({ center, onCenterChange, readOnly = false, places = [], selectedType }: GoogleMapProps) {
  const [marker, setMarker] = useState(center);
  const mapRef = useRef<google.maps.Map>();

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (readOnly || !e.latLng || !onCenterChange) return;

    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setMarker(newLocation);
    onCenterChange(newLocation);
  };

  const handleDragEnd = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng || !onCenterChange) return;

    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setMarker(newLocation);
    onCenterChange(newLocation);
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

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

  const filteredPlaces = selectedType
    ? places.filter(place => place.type === selectedType)
    : places;

  return (
    <div className="space-y-4">
      <div className="relative">
        <GoogleMapComponent
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onClick={handleMapClick}
          onLoad={onLoad}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        >
          <Marker
            position={marker}
            draggable={!readOnly}
            onDragEnd={handleDragEnd}
          />
          
          {/* Place markers */}
          {filteredPlaces.map((place, index) => (
            place.location && (
              <Marker
                key={index}
                position={place.location}
                label={{
                  text: place.place,
                  className: 'text-sm'
                }}
              />
            )
          ))}
        </GoogleMapComponent>

        {!readOnly && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Double click on the map or drag the marker to set location</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
        <div>
          <span className="font-medium">Latitude:</span> {marker.lat.toFixed(6)}
        </div>
        <div>
          <span className="font-medium">Longitude:</span> {marker.lng.toFixed(6)}
        </div>
      </div>
    </div>
  );
}