import React from 'react';
import { Heart, BedDouble, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  id?: string;
  image: string;
  price: React.ReactNode;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
}

export function PropertyCard({ id = '1', image, price, address, beds, baths, sqft }: PropertyCardProps) {
  return (
    <Link to={`/property/${id}`} className="block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative">
          <img src={image} alt={address} className="w-full h-64 object-cover" />
          <button 
            className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation when clicking the heart
              // Add favorite logic here
            }}
          >
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="p-5">
          <h3 className="text-2xl font-semibold text-gray-900">{price}</h3>
          <p className="text-gray-600 mt-2">{address}</p>
          <div className="flex items-center gap-4 mt-4 text-gray-500">
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