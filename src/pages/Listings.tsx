// Updated Listings Page using the PropertyStore
// File: src/pages/Listings.tsx

import React, { useState, useEffect } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { usePropertyStore } from '../stores/propertyStore'; // Removed unused formatPrice
import { CurrencyConverter } from '../components/CurrencyConverter';
import { useTranslate } from '../hooks/useTranslate';

const locations = ['Dubai Marina', 'Downtown Dubai', 'Business Bay', 'Palm Jumeirah'];
const propertyTypes = ['Apartment', 'Penthouse', 'Villa', 'Townhouse'];

export function Listings() {
  const { t } = useTranslate();
  const properties = usePropertyStore(state => state.properties);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    minBeds: '',
    maxBeds: '',
    minPrice: '',
    maxPrice: '',
  });

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...properties];
    
    // Filter by location
    if (filters.location) {
      result = result.filter(property => 
        property.address.includes(filters.location)
      );
    }
    
    // Filter by min beds
    if (filters.minBeds) {
      result = result.filter(property => 
        property.beds >= parseInt(filters.minBeds)
      );
    }
    
    // Filter by max beds
    if (filters.maxBeds) {
      result = result.filter(property => 
        property.beds <= parseInt(filters.maxBeds)
      );
    }
    
    // Filter by min price
    if (filters.minPrice) {
      const minPrice = parseInt(filters.minPrice.replace(/,/g, ''));
      result = result.filter(property => property.price >= minPrice);
    }
    
    // Filter by max price
    if (filters.maxPrice) {
      const maxPrice = parseInt(filters.maxPrice.replace(/,/g, ''));
      result = result.filter(property => property.price <= maxPrice);
    }
    
    // Only show published properties
    result = result.filter(property => property.published);
    
    setFilteredProperties(result);
  }, [properties, filters]);

  return (
    // Added dark mode background
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900"> 
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
          alt="Luxury Properties"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <h1 className="text-4xl font-light text-white mb-8">{t('availableProperties')}</h1>

          {/* Filters Panel - Always visible */}
          {/* Added dark mode background */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"> 
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Location */}
                <div>
                  {/* Added dark mode text color */}
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> 
                    {t('location')}
                  </label>
                  {/* Added dark mode styles for select */}
                  <select 
                    className="w-full border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  >
                    <option value="">{t('anyLocation')}</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  {/* Added dark mode text color */}
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> 
                    {t('propertyType')}
                  </label>
                  {/* Added dark mode styles for select */}
                  <select 
                    className="w-full border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    value={filters.propertyType}
                    onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                  >
                    <option value="">{t('anyType')}</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Bedrooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    {/* Added dark mode text color */}
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> 
                      {t('minBeds')}
                    </label>
                    {/* Added dark mode styles for select */}
                    <select 
                      className="w-full border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                      value={filters.minBeds}
                      onChange={(e) => setFilters({ ...filters, minBeds: e.target.value })}
                    >
                      <option value="">{t('anyType')}</option>
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num}+</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    {/* Added dark mode text color */}
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> 
                      {t('maxBeds')}
                    </label>
                    {/* Added dark mode styles for select */}
                    <select 
                      className="w-full border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                      value={filters.maxBeds}
                      onChange={(e) => setFilters({ ...filters, maxBeds: e.target.value })}
                    >
                      <option value="">{t('anyType')}</option>
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Range */}
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {/* Added dark mode text color */}
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> 
                      {t('minPrice')}
                    </label>
                    {/* Added dark mode styles for select */}
                    <select 
                      className="w-full border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    >
                      <option value="">{t('noMin')}</option>
                      {['500,000', '750,000', '1,000,000', '1,500,000', '2,000,000'].map(price => (
                        <option key={price} value={price}>${price}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    {/* Added dark mode text color */}
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> 
                      {t('maxPrice')}
                    </label>
                    {/* Added dark mode styles for select */}
                    <select 
                      className="w-full border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    >
                      <option value="">{t('noMax')}</option>
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
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id}
                id={property.id}
                image={property.image}
                price={<CurrencyConverter amount={property.price} baseCurrency={property.currency} />}
                address={property.address}
                beds={property.beds}
                baths={property.baths}
                sqft={property.sqft}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            {/* Added dark mode text color */}
            <h3 className="text-2xl font-light text-gray-500 dark:text-gray-400">{t('noPropertiesMatch')}</h3> 
            {/* Added dark mode button styles */}
            <button 
              onClick={() => setFilters({
                location: '',
                propertyType: '',
                minBeds: '',
                maxBeds: '',
                minPrice: '',
                maxPrice: '',
              })}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" 
            >
              {t('clearFilters')}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
