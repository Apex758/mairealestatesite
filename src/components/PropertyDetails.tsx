import React, { useState } from 'react';
import { PropertyCard } from './PropertyCard';
import { GoogleMap } from './GoogleMap';
import { Store, Utensils, Building2, School, Train, Sparkle as Park } from 'lucide-react';

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

const placeTypeIcons: Record<string, React.ReactNode> = {
  store: <Store className="w-4 h-4" />,
  restaurant: <Utensils className="w-4 h-4" />,
  school: <School className="w-4 h-4" />,
  transit_station: <Train className="w-4 h-4" />,
  park: <Park className="w-4 h-4" />,
  default: <Building2 className="w-4 h-4" />
};

export function PropertyDetails({
  details,
  payment,
  features = { residences: [], luxuryWellness: [], retailDining: [] },
  location,
  similarProperties
}: PropertyDetailsProps) {
  const [selectedPlaceType, setSelectedPlaceType] = useState<string | null>(null);

  const distances = location?.distances || [];
  const placeTypes = Array.from(new Set(distances.map(d => d.type || 'default')));
  const filteredPlaces = selectedPlaceType 
    ? distances.filter(d => (d.type || 'default') === selectedPlaceType)
    : distances;

  return (
    <div>
      {/* Property Details Section */}
      <div className="mb-16">
        <div className="flex items-center justify-end gap-4 mb-8">
          <div className="flex-1 border-b border-gray-200" />
          <h2 className="text-2xl font-light">Property Details</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
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
          <div className="bg-gray-50 p-6 rounded-lg">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map */}
          <div>
            <GoogleMap
              center={{ 
                lat: location.lat || 25.2048, 
                lng: location.lng || 55.2708 
              }}
              readOnly
              places={distances}
              selectedType={selectedPlaceType}
            />
          </div>
          {/* Nearby Places */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Nearby Places</h3>
            
            {/* Place Type Filters */}
            {placeTypes.length > 0 && (
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedPlaceType(null)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                    !selectedPlaceType 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All Places
                </button>
                {placeTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedPlaceType(type)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                      selectedPlaceType === type 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {placeTypeIcons[type] || placeTypeIcons.default}
                    {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                  </button>
                ))}
              </div>
            )}

            {/* Places List */}
            <div className="space-y-3">
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {placeTypeIcons[item.type || 'default']}
                      <span className="text-gray-600">{item.place}</span>
                    </div>
                    <span className="font-medium">{item.time} min</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No nearby places found.</p>
              )}
            </div>
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