// Updated Property Store with Enhanced Functionality
// File: src/stores/propertyStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PropertyFeatures {
  residences: string[];
  luxuryWellness: string[];
  retailDining: string[];
}

export interface PropertyLocation {
  lat: number;
  lng: number;
  distances: PropertyDistance[];
}

export interface PropertyDistance {
  place: string;
  time: number;
  type?: string;
}

export interface Property {
  id: string;
  name: string;
  image: string;
  images: string[];
  price: number;
  currency: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  features: PropertyFeatures;
  location: PropertyLocation;
  published: boolean;
  updatedAt: string;
  createdAt: string;
}

interface PropertyStore {
  properties: Property[];
  setProperties: (properties: Property[]) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  addProperty: (property: Property) => void;
  removeProperty: (id: string) => void;
  getProperty: (id: string) => Property | undefined;
}

const initialProperties: Property[] = [
  {
    id: "1",
    name: 'Binghatti Hillviews',
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    price: 1250000,
    currency: 'USD',
    address: "Dubai Marina, Dubai, UAE",
    beds: 4,
    baths: 3,
    sqft: 2800,
    description: 'A fusion of luxury & innovation at the intersection of modern living. Experience an iconic residential development that seamlessly blends elegance with architectural brilliance.',
    features: {
      residences: [
        'High-end interiors with premium finishes',
        'Floor-to-ceiling windows for panoramic views',
        'Smart home technology integration'
      ],
      luxuryWellness: [
        'Infinity Pool with stunning cityscape views',
        'State-of-the-art Fitness Center',
        'Wellness Center & Outdoor Yoga Area'
      ],
      retailDining: [
        'Luxury Retail Outlets on the Ground Floor',
        'Close to high-end shopping, dining & entertainment'
      ]
    },
    location: {
      lat: 25.2048,
      lng: 55.2708,
      distances: [
        { place: 'Dubai Marina', time: 5, type: 'landmark' },
        { place: 'Downtown Dubai', time: 10, type: 'landmark' },
        { place: 'Dubai International Airport', time: 15, type: 'transit_station' },
        { place: 'Palm Jumeirah', time: 20, type: 'landmark' }
      ]
    },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=80"
    ],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    name: 'Mercedes-Benz Places',
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    price: 980000,
    currency: 'USD',
    address: "Downtown Dubai, Dubai, UAE",
    beds: 3,
    baths: 2,
    sqft: 2200,
    description: 'Luxury living in the heart of Downtown Dubai. A prestigious address that combines contemporary design with unparalleled amenities.',
    features: {
      residences: [
        'Premium appliances and finishes',
        'Private balconies with city views',
        'Smart home automation'
      ],
      luxuryWellness: [
        'Rooftop infinity pool',
        'Private gym and spa',
        'Meditation garden'
      ],
      retailDining: [
        'Ground floor boutiques',
        'Fine dining restaurants',
        'Exclusive shopping access'
      ]
    },
    location: {
      lat: 25.1972,
      lng: 55.2744,
      distances: [
        { place: 'Burj Khalifa', time: 5, type: 'landmark' },
        { place: 'Dubai Mall', time: 8, type: 'store' },
        { place: 'DIFC', time: 12, type: 'business' },
        { place: 'Dubai International Airport', time: 20, type: 'transit_station' }
      ]
    },
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80"
    ],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    name: 'Bugatti Residences',
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
    price: 1450000,
    currency: 'USD',
    address: "Business Bay, Dubai, UAE",
    beds: 5,
    baths: 4,
    sqft: 3200,
    description: 'Experience unparalleled luxury in Business Bay. Where automotive excellence meets architectural brilliance.',
    features: {
      residences: [
        'Designer interiors by Bugatti',
        'Floor-to-ceiling windows',
        'Private elevator access'
      ],
      luxuryWellness: [
        'Signature spa by Bugatti',
        'Temperature-controlled pool',
        'High-performance fitness center'
      ],
      retailDining: [
        'Michelin-star restaurant',
        'Exclusive retail boulevard',
        'Private wine cellar'
      ]
    },
    location: {
      lat: 25.1865,
      lng: 55.2789,
      distances: [
        { place: 'Business Bay Metro', time: 3, type: 'transit_station' },
        { place: 'Dubai Design District', time: 10, type: 'landmark' },
        { place: 'DIFC', time: 15, type: 'business' },
        { place: 'Dubai International Airport', time: 25, type: 'transit_station' }
      ]
    },
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
    ],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Create the store with persistence to keep properties between page refreshes
export const usePropertyStore = create<PropertyStore>()(
  persist(
    (set, get) => ({
      properties: initialProperties,
      setProperties: (properties) => set({ properties }),
      updateProperty: (id, updatedProperty) => {
        set((state) => ({
          properties: state.properties.map((property) =>
            property.id === id 
              ? { 
                  ...property, 
                  ...updatedProperty,
                  updatedAt: new Date().toISOString() 
                } 
              : property
          ),
        }));
      },
      addProperty: (property) =>
        set((state) => ({
          properties: [...state.properties, {
            ...property,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }],
        })),
      removeProperty: (id) =>
        set((state) => ({
          properties: state.properties.filter((property) => property.id !== id),
        })),
      getProperty: (id) => {
        return get().properties.find(property => property.id === id);
      }
    }),
    {
      name: 'property-storage', // name of the item in the storage
    }
  )
);

// Utility function to format price with currency
export const formatPrice = (price: number, currency: string = 'USD') => {
  const currencySymbols: Record<string, string> = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'AED': 'د.إ',
    'CNY': '¥',
    'JPY': '¥',
    'BTC': '₿',
    'USDT': '₮'
  };

  const symbol = currencySymbols[currency] || currency;
  return `${symbol}${price.toLocaleString()}`;
};