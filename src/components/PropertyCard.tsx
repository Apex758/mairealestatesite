import React, { useState, useEffect } from 'react';
import { Heart, BedDouble, Bath, Square, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStore, FavoriteProperty } from '../stores/userStore';
import { useAuth } from '../contexts/AuthContext';
import { useTranslate } from '../hooks/useTranslate';
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
  const { t } = useTranslate();
  const [isFavorited, setIsFavorited] = useState(false);
  
  // WhatsApp number
  const whatsappNumber = '+971522292717';
  
  // Generate WhatsApp link with pre-filled message about this property
  const getWhatsAppLink = () => {
    const text = `Hello MAI Real Estate, I'm interested in the property "${name}" (ID: ${id}). Please provide more information.`;
    return `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(text)}`;
  };

  // Use first slideshow image only
  const displayImage = slideshowImages.length > 0 ? slideshowImages[0] : '';

  // Check if property is in favorites and update when language or currency changes
  useEffect(() => {
    setIsFavorited(isFavorite(id));
  }, [id, isFavorite, t]); // Add t dependency to refresh when language changes

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
            className="w-full h-48 sm:h-64 object-cover" 
          />
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2 sm:gap-3">
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 bg-green-500/90 rounded-full hover:bg-green-600 active:bg-green-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> 
            </a>
            <button 
              className="p-2 sm:p-2.5 bg-white/80 dark:bg-gray-900/80 rounded-full hover:bg-white dark:hover:bg-gray-900 active:bg-gray-100 dark:active:bg-gray-800 transition-colors"
              onClick={toggleFavorite}
            >
              <Heart 
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  isFavorited 
                    ? 'text-red-500 fill-current' 
                    : 'text-gray-600 dark:text-gray-300'
                }`} 
              /> 
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{price}</h3>
          {name && <h4 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200 mt-1">{name}</h4>}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">{address}</p> 
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm sm:text-base text-gray-500 dark:text-gray-400"> 
            <div className="flex items-center gap-1 min-w-[80px]">
              <BedDouble className="w-4 h-4 flex-shrink-0" />
              <span>{beds} {t('bedrooms')}</span>
            </div>
            <div className="flex items-center gap-1 min-w-[80px]">
              <Bath className="w-4 h-4 flex-shrink-0" />
              <span>{baths} {t('bathrooms')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4 flex-shrink-0" />
              <span>{sqft} {t('sqft')}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
