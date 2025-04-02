import React from 'react';
import { ChevronDown, Bitcoin } from 'lucide-react';

interface HomePreviewProps {
  settings: {
    heroImage: string;
    heroTitle: string;
    propertyTypes: string[];
    paymentTypes: string[];
    gridImages: {
      large: string;
      small1: string;
      small2: string;
    };
    textContent: {
      cryptoPayments: string;
      purchaseYourDream: string;
      primeLocations: string;
      exclusiveProperties: string;
      luxuryDubaiLiving: string;
      dubaiMarina: string;
      downtownViews: string;
      featuredProperties: string;
    };
  };
  onClose: () => void;
}

export function HomePreview({ settings, onClose }: HomePreviewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90%] h-[90%] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Homepage Preview</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Close Preview
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="overflow-hidden">
            {/* Hero Section */}
            <div className="relative h-[50vh] flex items-center justify-center">
              <div className="absolute inset-0">
                <img
                  src={settings.heroImage}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="relative text-center text-white z-10 max-w-4xl px-4">
                <h1 className="text-6xl font-bold mb-8">{settings.heroTitle}</h1>
                <div className="text-2xl mb-8 flex items-center justify-center gap-2">
                  <span>Buy</span>
                  <span className="mx-2">{settings.propertyTypes[0]}</span>
                  <span>with</span>
                  <span className="mx-2">{settings.paymentTypes[0]}</span>
                </div>
                <div className="flex gap-4 justify-center">
                  <button className="inline-block bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-full">
                    Explore Properties
                  </button>
                  <button className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-full">
                    <Bitcoin className="w-5 h-5" />
                    Learn How
                  </button>
                </div>
              </div>
              <button className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
                <ChevronDown className="w-8 h-8" />
              </button>
            </div>

            {/* Grid Section */}
            <div className="bg-white dark:bg-gray-800 py-12">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[400px]">
                  <div className="relative rounded-2xl overflow-hidden transition-transform md:col-span-2 md:row-span-2">
                    <img 
                      src={settings.gridImages.large} 
                      alt={settings.textContent.luxuryDubaiLiving}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white">{settings.textContent.luxuryDubaiLiving}</h3>
                    </div>
                  </div>
                  <div className="h-full bg-gray-100 dark:bg-gray-900 p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{settings.textContent.cryptoPayments}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{settings.textContent.purchaseYourDream}</p>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden transition-transform">
                    <img 
                      src={settings.gridImages.small1} 
                      alt={settings.textContent.dubaiMarina}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white">{settings.textContent.dubaiMarina}</h3>
                    </div>
                  </div>
                  <div className="h-full bg-gray-100 dark:bg-gray-900 p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{settings.textContent.primeLocations}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{settings.textContent.exclusiveProperties}</p>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden transition-transform">
                    <img 
                      src={settings.gridImages.small2} 
                      alt={settings.textContent.downtownViews}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white">{settings.textContent.downtownViews}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Properties Section */}
            <div className="bg-white dark:bg-gray-800 py-12">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-light text-gray-900 dark:text-white">{settings.textContent.featuredProperties}</h2>
                  <div className="flex-1 border-b border-gray-200 dark:border-gray-700" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                      <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="p-5">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">$1,250,000</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Sample Property {i}</p>
                        <div className="flex items-center gap-4 mt-4 text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <span>4 beds</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>3 baths</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>2,500 sqft</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
