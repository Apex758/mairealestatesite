import { create } from 'zustand';

export interface Property {
  id: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  features: {
    residences: string[];
    luxuryWellness: string[];
    retailDining: string[];
  };
  location: {
    lat: number;
    lng: number;
    distances: {
      place: string;
      time: number;
    }[];
  };
  images: string[];
}

interface PropertyStore {
  properties: Property[];
  setProperties: (properties: Property[]) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  addProperty: (property: Property) => void;
  removeProperty: (id: string) => void;
}

const initialProperties: Property[] = [
  {
    id: "1",
    name: 'Binghatti Hillviews',
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    price: 1250000,
    currency: 'USD',
    address: "123 Luxury Lane, Beverly Hills, CA",
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
        { place: 'Dubai Marina', time: 5 },
        { place: 'Downtown Dubai', time: 10 },
        { place: 'Dubai International Airport', time: 15 },
        { place: 'Palm Jumeirah', time: 20 }
      ]
    },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "2",
    name: 'Mercedes-Benz Places',
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    price: 980000,
    currency: 'USD',
    address: "456 Luxury Avenue, Downtown Dubai",
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
      lat: 25.2048,
      lng: 55.2708,
      distances: [
        { place: 'Burj Khalifa', time: 5 },
        { place: 'Dubai Mall', time: 8 },
        { place: 'DIFC', time: 12 },
        { place: 'Dubai International Airport', time: 20 }
      ]
    },
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "3",
    name: 'Bugatti Residences',
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
    price: 1450000,
    currency: 'USD',
    address: "789 Elite Street, Business Bay",
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
      lat: 25.2048,
      lng: 55.2708,
      distances: [
        { place: 'Business Bay Metro', time: 3 },
        { place: 'Dubai Design District', time: 10 },
        { place: 'DIFC', time: 15 },
        { place: 'Dubai International Airport', time: 25 }
      ]
    },
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
    ]
  }
];

export const usePropertyStore = create<PropertyStore>((set) => ({
  properties: initialProperties,
  setProperties: (properties) => set({ properties }),
  updateProperty: (id, updatedProperty) => 
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === id ? { ...property, ...updatedProperty } : property
      ),
    })),
  addProperty: (property) =>
    set((state) => ({
      properties: [...state.properties, property],
    })),
  removeProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((property) => property.id !== id),
    })),
}));