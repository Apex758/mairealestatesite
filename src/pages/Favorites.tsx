import React, { useState } from 'react';
import { Heart, MapPin, Bed, Bath, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FavoriteProperty {
  id: string;
  name: string;
  image: string;
  address: string;
  price: number;
  currency: string;
  beds: number;
  baths: number;
  sqft: number;
}

export function Favorites() {
  const [favoriteProperties, setFavoriteProperties] = useState<FavoriteProperty[]>([
    {
      id: 'prop1',
      name: 'Luxury Dubai Marina Apartment',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      address: '123 Marina Walk, Dubai Marina, Dubai',
      price: 1500000,
      currency: 'AED',
      beds: 3,
      baths: 2,
      sqft: 2500
    },
    {
      id: 'prop2',
      name: 'Palm Jumeirah Villa',
      image: 'https://images.unsplash.com/photo-1580041065738-e4b7a6c10f38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      address: '456 Palm Jumeirah, Dubai',
      price: 5000000,
      currency: 'AED',
      beds: 5,
      baths: 4,
      sqft: 6000
    }
  ]);

  const removeFromFavorites = (propertyId: string) => {
    setFavoriteProperties(favoriteProperties.filter(prop => prop.id !== propertyId));
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Heart className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-light text-gray-900 dark:text-white">My Favorites</h1>
        </div>

        {favoriteProperties.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <Heart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              You haven't added any properties to your favorites yet.
            </p>
            <Link 
              to="/listings" 
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map((property) => (
              <div 
                key={property.id} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden group"
              >
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.name} 
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
                  />
                  <button 
                    onClick={() => removeFromFavorites(property.id)}
                    className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/80 p-2 rounded-full hover:bg-white dark:hover:bg-gray-800"
                  >
                    <Heart className="w-6 h-6 text-red-500 fill-current" />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {property.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {property.address}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {new Intl.NumberFormat('en-AE', { 
                        style: 'currency', 
                        currency: property.currency 
                      }).format(property.price)}
                    </div>
                    
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{property.beds}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.baths}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Ruler className="w-4 h-4" />
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Link 
                      to={`/property/${property.id}`}
                      className="flex-1 text-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
