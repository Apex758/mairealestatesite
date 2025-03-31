import React from 'react';
import { Search } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative h-[70vh] flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
        alt="Luxury home"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative text-center text-white z-10 max-w-4xl px-4">
        <h1 className="text-5xl font-bold mb-6">Find Your Dream Home</h1>
        <p className="text-xl mb-8">Discover the perfect property in your favorite location</p>
        <div className="bg-white rounded-full p-2 flex items-center max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search by location, property type, or price..."
            className="flex-1 px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none"
          />
          <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}