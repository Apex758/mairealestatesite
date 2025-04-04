import React, { useCallback, useRef } from 'react';
import { GoogleMap as GoogleMapComponent, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

interface StaticMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markerColor?: string;
  height?: string;
  width?: string;
  onClick?: () => void;
}

// Import the Libraries type from @react-google-maps/api
import { Libraries } from '@react-google-maps/api';

// Define libraries for Google Maps
const libraries: Libraries = ['places'];

export function StaticMap({ 
  center, 
  zoom = 15,
  markerColor = 'red',
  height = '400px',
  width = '100%',
  onClick
}: StaticMapProps) {
  const mapRef = useRef<google.maps.Map>();

  const containerStyle = {
    width,
    height
  };

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

  // Initialize map when loaded
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Handle map click to open Google Maps
  const handleMapClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: open Google Maps with the location
      const url = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;
      window.open(url, '_blank');
    }
  };

  // Determine marker color
  const markerUrl = `https://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`;

  if (loadError) {
    return (
      <div className="bg-red-50 text-red-600 rounded-lg p-4">
        <p>Error loading Google Maps. Please check your API key configuration.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="bg-gray-100 rounded-lg" style={{ height }}>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative cursor-pointer" onClick={handleMapClick}>
      {/* Overlay to prevent interactions with the map itself */}
      <div className="absolute inset-0 z-10" />
      
      <GoogleMapComponent
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: false,
          scrollwheel: false,
          draggable: false,
          clickableIcons: false,
          disableDefaultUI: true,
          disableDoubleClickZoom: true
        }}
      >
        {/* Location marker */}
        <Marker
          position={center}
          icon={{
            url: markerUrl
          }}
        />
      </GoogleMapComponent>
      
      {/* Hint overlay */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow text-sm z-20">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>Click to open in Google Maps</span>
        </div>
      </div>
    </div>
  );
}
