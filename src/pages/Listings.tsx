import React, { useState, useEffect } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { usePropertyStore } from '../stores/propertyStore';
import { CurrencyConverter } from '../components/CurrencyConverter';
import { useTranslate } from '../hooks/useTranslate';
import { MapPin, Home, Bed, DollarSign, Filter, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  
  // Animation effect for luxury elements
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...properties];
    
    // Filter by location
    if (filters.location) {
      result = result.filter(property => 
        property.address.includes(filters.location)
      );
    }
    
    // Filter by property type
    if (filters.propertyType) {
      result = result.filter(property => 
        property.name.includes(filters.propertyType)
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Hero Section with luxury background */}
      <div 
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
          alt="Luxury Properties"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        
        {/* Gold decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="mx-4 text-amber-400 tracking-[0.3em] uppercase text-sm font-light">Exclusive</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            
            <h1 className="text-5xl font-extralight text-white mb-6 tracking-wider text-center">
              {t('availableProperties')}
              <span className="block text-xl mt-4 font-light text-amber-300">DISCOVER DUBAI'S MOST PRESTIGIOUS ADDRESSES</span>
            </h1>
          </div>

          {/* Filters Panel Toggle */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-900/20"
            >
              <Filter className="w-5 h-5" />
              <span>Refine Your Search</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Filters Panel - Collapsible */}
          <div className={`mt-8 transition-all duration-500 ease-in-out overflow-hidden ${showFilters ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Location */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      <span>{t('location')}</span>
                    </label>
                    <select 
                      className="w-full px-4 py-3 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:border-amber-500 outline-none transition-colors text-gray-900 dark:text-white appearance-none"
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    >
                      <option value="" className="bg-white dark:bg-gray-800">{t('anyLocation')}</option>
                      {locations.map(location => (
                        <option key={location} value={location} className="bg-white dark:bg-gray-800">{location}</option>
                      ))}
                    </select>
                  </div>

                  {/* Property Type */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      <Home className="w-4 h-4 text-amber-500" />
                      <span>{t('propertyType')}</span>
                    </label>
                    <select 
                      className="w-full px-4 py-3 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:border-amber-500 outline-none transition-colors text-gray-900 dark:text-white appearance-none"
                      value={filters.propertyType}
                      onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                    >
                      <option value="" className="bg-white dark:bg-gray-800">{t('anyType')}</option>
                      {propertyTypes.map(type => (
                        <option key={type} value={type} className="bg-white dark:bg-gray-800">{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      <Bed className="w-4 h-4 text-amber-500" />
                      <span>{t('bedrooms')}</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <select 
                        className="w-full px-4 py-3 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:border-amber-500 outline-none transition-colors text-gray-900 dark:text-white appearance-none"
                        value={filters.minBeds}
                        onChange={(e) => setFilters({ ...filters, minBeds: e.target.value })}
                      >
                        <option value="" className="bg-white dark:bg-gray-800">{t('minBeds')}</option>
                        {[1,2,3,4,5,6].map(num => (
                          <option key={num} value={num} className="bg-white dark:bg-gray-800">{num}+</option>
                        ))}
                      </select>
                      <select 
                        className="w-full px-4 py-3 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:border-amber-500 outline-none transition-colors text-gray-900 dark:text-white appearance-none"
                        value={filters.maxBeds}
                        onChange={(e) => setFilters({ ...filters, maxBeds: e.target.value })}
                      >
                        <option value="" className="bg-white dark:bg-gray-800">{t('maxBeds')}</option>
                        {[1,2,3,4,5,6].map(num => (
                          <option key={num} value={num} className="bg-white dark:bg-gray-800">{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="md:col-span-3 mt-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      <DollarSign className="w-4 h-4 text-amber-500" />
                      <span>Price Range</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <select 
                        className="w-full px-4 py-3 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:border-amber-500 outline-none transition-colors text-gray-900 dark:text-white appearance-none"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      >
                        <option value="" className="bg-white dark:bg-gray-800">{t('noMin')}</option>
                        {['500,000', '750,000', '1,000,000', '1,500,000', '2,000,000', '5,000,000', '10,000,000'].map(price => (
                          <option key={price} value={price} className="bg-white dark:bg-gray-800">${price}</option>
                        ))}
                      </select>
                      <select 
                        className="w-full px-4 py-3 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:border-amber-500 outline-none transition-colors text-gray-900 dark:text-white appearance-none"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      >
                        <option value="" className="bg-white dark:bg-gray-800">{t('noMax')}</option>
                        {['1,000,000', '1,500,000', '2,000,000', '3,000,000', '5,000,000', '10,000,000', '20,000,000'].map(price => (
                          <option key={price} value={price} className="bg-white dark:bg-gray-800">${price}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Clear Filters Button */}
                <div className="mt-8 text-center">
                  <button 
                    onClick={() => setFilters({
                      location: '',
                      propertyType: '',
                      minBeds: '',
                      maxBeds: '',
                      minPrice: '',
                      maxPrice: '',
                    })}
                    className="px-6 py-2 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white rounded-full transition-colors"
                  >
                    {t('clearFilters')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 py-24 relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        
        {/* Section Title */}
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
              {filteredProperties.length > 0 
                ? `${filteredProperties.length} Exclusive Properties` 
                : t('noPropertiesMatch')}
            </h2>
            <div className="h-px w-24 bg-amber-500 mx-auto"></div>
          </div>
        </div>
        
        {/* Properties Grid */}
        <main className="max-w-7xl mx-auto px-4">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProperties.map((property, index) => (
                <div 
                  key={property.id}
                  className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <PropertyCard 
                    id={property.id}
                    slideshowImages={property.slideshowImages}
                    price={<CurrencyConverter amount={property.price} baseCurrency={property.currency} />}
                    priceValue={property.price}
                    currency={property.currency}
                    name={property.name}
                    address={property.address}
                    beds={property.beds}
                    baths={property.baths}
                    sqft={property.sqft}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <button 
                onClick={() => setFilters({
                  location: '',
                  propertyType: '',
                  minBeds: '',
                  maxBeds: '',
                  minPrice: '',
                  maxPrice: '',
                })}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:from-amber-600 hover:to-amber-700 transition-colors shadow-lg shadow-amber-900/20"
              >
                {t('clearFilters')}
              </button>
            </div>
          )}
        </main>
      </div>
      
      {/* Luxury Statement */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <blockquote className="text-2xl font-light italic mb-6">
            "Luxury is in each detail."
          </blockquote>
          <p className="text-amber-400">— Hubert de Givenchy</p>
        </div>
      </div>
    </div>
  );
}
