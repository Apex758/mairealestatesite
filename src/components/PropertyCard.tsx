import React, { useState, useEffect } from 'react';
import { Heart, BedDouble, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStore, FavoriteProperty } from '../stores/userStore';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface PropertyCardProps {
  id?: string;
  slideshowImages?: string[]; // Images from the property's slideshow
  price: React.ReactNode;
  priceValue?: number; // Numeric price value for favorites
  currency?: string; // Currency for favorites
  name?: string; // Property name
  address: string;
  beds: number;
  baths: number;
  sqft: number;
}

export function PropertyCard({ 
  id = '1', 
  slideshowImages = [], 
  price, 
  priceValue = 0,
  currency = 'AED',
  name = 'Luxury Property',
  address, 
  beds, 
  baths, 
  sqft 
}: PropertyCardProps) {
  const { isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useUserStore();
  const [isFavorited, setIsFavorited] = useState(false);

  // Use first slideshow image only
  const displayImage = slideshowImages.length > 0 ? slideshowImages[0] : '';

  // Check if property is in favorites
  useEffect(() => {
    setIsFavorited(isFavorite(id));
  }, [id, isFavorite]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    
    if (!isAuthenticated) {
      toast.error('Please login to add properties to favorites');
      return;
    }

    if (isFavorited) {
      removeFromFavorites(id);
      toast.success('Removed from favorites');
    } else {
      // Create favorite property object
      const favoriteProperty: FavoriteProperty = {
        id,
        name,
        image: displayImage || '/property-placeholder.jpg',
        address,
        price: priceValue,
        currency,
        beds,
        baths,
        sqft
      };
      
      addToFavorites(favoriteProperty);
      toast.success('Added to favorites');
    }
    
    setIsFavorited(!isFavorited);
  };

  return (
    <Link to={`/property/${id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-700/50 transition-shadow duration-300">
        <div className="relative">
          <img 
            src={displayImage} 
            alt={address} 
            className="w-full h-64 object-cover" 
          />
          <button 
            className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-900/80 rounded-full hover:bg-white dark:hover:bg-gray-900"
            onClick={toggleFavorite}
          >
            <Heart 
              className={`w-5 h-5 ${
                isFavorited 
                  ? 'text-red-500 fill-current' 
                  : 'text-gray-600 dark:text-gray-300'
              }`} 
            /> 
          </button>
        </div>
        <div className="p-5">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{price}</h3>
          {name && <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-1">{name}</h4>}
          <p className="text-gray-600 dark:text-gray-400 mt-2">{address}</p> 
          <div className="flex items-center gap-4 mt-4 text-gray-500 dark:text-gray-400"> 
            <div className="flex items-center gap-1">
              <BedDouble className="w-4 h-4" />
              <span>{beds} beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{baths} baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span>{sqft} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
