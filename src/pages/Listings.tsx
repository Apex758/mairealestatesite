import React, { useState } from 'react';
import { PropertyCard } from '../components/PropertyCard';

// Import all listings data
const allProperties = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    price: "$1,250,000",
    address: "Binghatti Hillviews, Dubai Marina",
    beds: 4,
    baths: 3,
    sqft: 2800
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    price: "$980,000",
    address: "Mercedes-Benz Places, Downtown Dubai",
    beds: 3,
    baths: 2,
    sqft: 2200
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
    price: "$1,450,000",
    address: "Bugatti Residences, Business Bay",
    beds: 5,
    baths: 4,
    sqft: 3200
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=80",
    price: "$2,100,000",
    address: "321 Ocean View Dr, Dubai Marina",
    beds: 6,
    baths: 5,
    sqft: 4500
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80",
    price: "$875,000",
    address: "567 Palm Springs Ave, Palm Jumeirah",
    beds: 3,
    baths: 2,
    sqft: 1800
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80",
    price: "$1,750,000",
    address: "890 Highland Park, Business Bay",
    beds: 4,
    baths: 3,
    sqft: 3200
  }
];

const locations = ['Dubai Marina', 'Downtown Dubai', 'Business Bay', 'Palm Jumeirah'];
const propertyTypes = ['Apartment', 'Penthouse', 'Villa', 'Townhouse'];

export function Listings() {
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    minBeds: '',
    maxBeds: '',
    minPrice: '',
    maxPrice: '',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
          alt="Luxury Properties"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <h1 className="text-4xl font-light text-white mb-8">Available Properties</h1>

          {/* Filters Panel - Always visible */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select 
                    className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  >
                    <option value="">Any Location</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select 
                    className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={filters.propertyType}
                    onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                  >
                    <option value="">Any Type</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Bedrooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Beds
                    </label>
                    <select 
                      className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={filters.minBeds}
                      onChange={(e) => setFilters({ ...filters, minBeds: e.target.value })}
                    >
                      <option value="">Any</option>
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num}+</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Beds
                    </label>
                    <select 
                      className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={filters.maxBeds}
                      onChange={(e) => setFilters({ ...filters, maxBeds: e.target.value })}
                    >
                      <option value="">Any</option>
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Range */}
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Price
                    </label>
                    <select 
                      className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    >
                      <option value="">No Min</option>
                      {['500,000', '750,000', '1,000,000', '1,500,000', '2,000,000'].map(price => (
                        <option key={price} value={price}>${price}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Price
                    </label>
                    <select 
                      className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    >
                      <option value="">No Max</option>
                      {['1,000,000', '1,500,000', '2,000,000', '3,000,000', '5,000,000'].map(price => (
                        <option key={price} value={price}>${price}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </main>
    </div>
  );
}