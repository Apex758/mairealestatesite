import React, { useEffect, useState } from 'react';
import { Heart, MapPin, Bed, Bath, Ruler, Home, Search, Filter, Tag, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserStore } from '../stores/userStore';
import { useGlobal } from '../contexts/GlobalContext';
import { translateText } from '../utils/translateUtils';
import { getTranslation } from '../translations';
import { toast } from 'sonner';

export function Favorites() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { language } = useGlobal();
  const { favorites, removeFromFavorites } = useUserStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-high' | 'price-low'>('newest');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Tags for categorizing properties
  const tags = ['Luxury', 'Investment', 'Must See', 'Vacation', 'Family'];
  
  // Translation state
  const [translatedContent, setTranslatedContent] = useState({
    favorites: getTranslation('favorites', language),
    dashboard: 'Dashboard',
    pleaseLogin: 'Please login to view your favorites',
    goToHome: 'Go to Home',
    noFavorites: 'You haven\'t added any properties to your favorites yet.',
    browseProperties: 'Browse Properties',
    searchProperties: 'Search properties...',
    newestFirst: 'Newest First',
    priceHighToLow: 'Price: High to Low',
    priceLowToHigh: 'Price: Low to High',
    allTags: 'All Tags',
    noPropertiesMatch: 'No properties match your search criteria',
    clearFilters: 'Clear Filters',
    beds: 'beds',
    baths: 'baths',
    sqft: 'sqft',
    view: 'View',
    viewDetails: 'View Details',
    addedTagToProperty: 'Added "{0}" tag to property'
  });
  
  // Update translations when language changes
  useEffect(() => {
    const updateTranslations = async () => {
      if (language === 'en') return;
      
      try {
        const translated = {
          favorites: getTranslation('favorites', language),
          dashboard: await translateText('Dashboard', language),
          pleaseLogin: await translateText('Please login to view your favorites', language),
          goToHome: await translateText('Go to Home', language),
          noFavorites: await translateText('You haven\'t added any properties to your favorites yet.', language),
          browseProperties: await translateText('Browse Properties', language),
          searchProperties: await translateText('Search properties...', language),
          newestFirst: await translateText('Newest First', language),
          priceHighToLow: await translateText('Price: High to Low', language),
          priceLowToHigh: await translateText('Price: Low to High', language),
          allTags: await translateText('All Tags', language),
          noPropertiesMatch: await translateText('No properties match your search criteria', language),
          clearFilters: await translateText('Clear Filters', language),
          beds: await translateText('beds', language),
          baths: await translateText('baths', language),
          sqft: await translateText('sqft', language),
          view: await translateText('View', language),
          viewDetails: await translateText('View Details', language),
          addedTagToProperty: await translateText('Added "{0}" tag to property', language)
        };
        
        setTranslatedContent(translated);
        
        // We could translate tags here, but we'll keep the original tags as IDs
        // and display translations inline where needed
      } catch (error) {
        console.error('Error translating content:', error);
      }
    };
    
    updateTranslations();
  }, [language, tags]);
  
  // Property tags (in a real app, these would be stored in the database)
  const [propertyTags, setPropertyTags] = useState<Record<string, string[]>>({});
  
  // Add a tag to a property
  const addTagToProperty = (propertyId: string, tag: string) => {
    setPropertyTags(prev => {
      const currentTags = prev[propertyId] || [];
      if (!currentTags.includes(tag)) {
        return {
          ...prev,
          [propertyId]: [...currentTags, tag]
        };
      }
      return prev;
    });
    toast.success(translatedContent.addedTagToProperty.replace('{0}', tag));
  };
  
  // Remove a tag from a property
  const removeTagFromProperty = (propertyId: string, tag: string) => {
    setPropertyTags(prev => {
      const currentTags = prev[propertyId] || [];
      return {
        ...prev,
        [propertyId]: currentTags.filter(t => t !== tag)
      };
    });
  };
  
  // Get filtered and sorted favorites
  const getFilteredFavorites = () => {
    let result = [...favorites];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(property => 
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by tag
    if (selectedTag) {
      result = result.filter(property => 
        (propertyTags[property.id] || []).includes(selectedTag)
      );
    }
    
    // Sort
    if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    }
    
    return result;
  };
  
  const filteredFavorites = getFilteredFavorites();
  
  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      toast.error('Please login to view your favorites');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-light text-gray-900 dark:text-white">{translatedContent.favorites}</h1>
          </div>
          
          <Link 
            to="/dashboard" 
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Home className="w-4 h-4" />
            <span>{translatedContent.dashboard}</span>
          </Link>
        </div>
        
        {/* Search and filter bar */}
        {isAuthenticated && favorites.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={translatedContent.searchProperties}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="text-gray-500 dark:text-gray-400 w-4 h-4" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'price-high' | 'price-low')}
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
              >
                <option value="newest">{translatedContent.newestFirst}</option>
                <option value="price-high">{translatedContent.priceHighToLow}</option>
                <option value="price-low">{translatedContent.priceLowToHigh}</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <Tag className="text-gray-500 dark:text-gray-400 w-4 h-4" />
              <select
                value={selectedTag || ''}
                onChange={(e) => setSelectedTag(e.target.value || null)}
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
              >
                <option value="">{translatedContent.allTags}</option>
                {tags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {!isAuthenticated ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <Heart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {translatedContent.pleaseLogin}
            </p>
            <Link 
              to="/" 
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {translatedContent.goToHome}
            </Link>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <Heart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {translatedContent.noFavorites}
            </p>
            <Link 
              to="/listings" 
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {translatedContent.browseProperties}
            </Link>
          </div>
        ) : filteredFavorites.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <Search className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {translatedContent.noPropertiesMatch}
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedTag(null);
                setSortBy('newest');
              }}
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {translatedContent.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((property) => (
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
                  
                  {/* Property tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {(propertyTags[property.id] || []).map(tag => (
                      <div 
                        key={tag} 
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                      >
                        <span>{tag}</span>
                        <button 
                          onClick={() => removeTagFromProperty(property.id, tag)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    
                    {/* Add tag dropdown */}
                    {(propertyTags[property.id] || []).length < tags.length && (
                      <div className="relative">
                        <select
                          value=""
                          onChange={(e) => {
                            if (e.target.value) {
                              addTagToProperty(property.id, e.target.value);
                              e.target.value = '';
                            }
                          }}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full border-none appearance-none cursor-pointer pr-6"
                        >
                          <option value="" disabled>+ Add Tag</option>
                          {tags
                            .filter(tag => !(propertyTags[property.id] || []).includes(tag))
                            .map(tag => (
                              <option key={tag} value={tag}>{tag}</option>
                            ))
                          }
                        </select>
                        <Tag className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
                      </div>
                    )}
                  </div>
                  
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
                        <span>{property.beds} {translatedContent.beds}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.baths} {translatedContent.baths}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Ruler className="w-4 h-4" />
                        <span>{property.sqft} {translatedContent.sqft}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Link 
                      to={`/property/${property.id}`}
                      className="flex-1 text-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {translatedContent.viewDetails}
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
