// Updated Page Manager with Enhanced Property Store Integration
// File: src/pages/PageManager.tsx

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Upload, 
  Plus,
  Trash2,
  Copy,
  Eye,
  Building2,
  Globe,
  Server,
  Cloud,
  Settings,
  Map,
  Home,
  Image,
  ListChecks,
  MapPin,
  Check,
  X
} from 'lucide-react';
import { SortableImageGrid } from '../components/SortableImageGrid';
import { GoogleMap } from '../components/GoogleMap';
import { HostingSettings } from '../components/HostingSettings';
import { usePropertyStore, Property } from '../stores/propertyStore';
import { PropertyPreview } from '../components/PropertyPreview';

// Predefined amenity categories and options
const amenityCategories = {
  residences: {
    title: 'Residences',
    options: [
      'Floor-to-ceiling windows',
      'Private balcony',
      'Walk-in closet',
      'Smart home technology',
      'High-end appliances',
      'Custom cabinetry',
      'Marble countertops',
      'Hardwood flooring',
      'Central air conditioning',
      'In-unit laundry'
    ]
  },
  luxuryWellness: {
    title: 'Luxury & Wellness',
    options: [
      'Infinity pool',
      'Fitness center',
      'Spa facilities',
      'Yoga studio',
      'Steam room',
      'Sauna',
      'Private theater',
      'Wine cellar',
      'Meditation garden',
      'Rooftop lounge'
    ]
  },
  retailDining: {
    title: 'Retail & Dining',
    options: [
      'Ground floor retail',
      'Fine dining restaurant',
      'Café',
      'Convenience store',
      'Luxury boutiques',
      'Gourmet market',
      'Banking services',
      'Pharmacy',
      'Beauty salon',
      'Dry cleaning'
    ]
  }
};

interface HostingConfig {
  provider: string;
  siteId: string;
  teamId: string;
  apiKey: string;
  buildCommand: string;
  outputDir: string;
  deployedUrl: string;
  lastDeployed: Date | null;
  status: 'ready' | 'building' | 'deployed' | 'error';
  apiKeys: {
    googleMaps: string;
    exchangeRate: string;
    cryptoExchange: string;
    analytics: string;
  };
}

const DEFAULT_HOSTING: HostingConfig = {
  provider: 'vercel',
  projectId: 'mai-real-estate', // Project name from screenshot
  teamId: 'apex758s-projects', // Team name from screenshot
  token: '', 
  buildCommand: 'vite build', // Exact build command from screenshot
  outputDir: 'dist', // Output directory from screenshot
  deployedUrl: '', 
  lastDeployed: null,
  status: 'ready',
  apiKeys: {
    googleMaps: '',
    exchangeRate: '',
    cryptoExchange: '',
    analytics: ''
  }
};



export function PageManager() {
  const [activeProperty, setActiveProperty] = useState<string | null>(null);
const [editingMode, setEditingMode] = useState<'details' | 'slideshow' | 'location' | 'amenities' | 'hosting' | 'content' | 'brochure'>('details');
  const [hostingConfig, setHostingConfig] = useState<HostingConfig>(DEFAULT_HOSTING);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof amenityCategories>('residences');
const [showPreview, setShowPreview] = useState(false);
  
  // Access property store
  const { 
    properties, 
    updateProperty, 
    addProperty, 
    removeProperty,
    getProperty
  } = usePropertyStore();

  // Set initial active property
  useEffect(() => {
    if (properties.length > 0 && !activeProperty) {
      setActiveProperty(properties[0].id);
    }
  }, [properties, activeProperty]);

  // Get current property
  const currentProperty = activeProperty ? properties.find(p => p.id === activeProperty) : null;

  const handlePropertyUpdate = (updatedData: Partial<Property>) => {
    if (!currentProperty) return;
    
    updateProperty(currentProperty.id, {
      ...updatedData,
      updatedAt: new Date().toISOString()
    });
    
    toast.success('Property updated successfully');
  };

  const toggleAmenity = (category: keyof typeof amenityCategories, amenity: string) => {
    if (!currentProperty) return;

    const currentFeatures = currentProperty.features[category];
    const newFeatures = currentFeatures.includes(amenity)
      ? currentFeatures.filter(a => a !== amenity)
      : [...currentFeatures, amenity];

    handlePropertyUpdate({
      features: {
        ...currentProperty.features,
        [category]: newFeatures
      }
    });
  };

  const updateHostingConfig = (config: Partial<HostingConfig>) => {
    setHostingConfig({
      ...hostingConfig,
      ...config
    });
  };

  const handleDeploy = () => {
    if (!hostingConfig.siteId || !hostingConfig.apiKey) {
      toast.error('Please configure hosting settings first');
      return;
    }

    updateHostingConfig({ status: 'building' });
    toast.success('Starting deployment...');

    // Simulated deployment
    setTimeout(() => {
      updateHostingConfig({
        status: 'deployed',
        lastDeployed: new Date(),
        deployedUrl: `https://${hostingConfig.siteId}.netlify.app`
      });
      toast.success('Deployment completed!');
    }, 3000);
  };

  const createNewProperty = () => {
    const newId = `property-${Date.now()}`;
    
    const newProperty: Property = {
      id: newId,
      name: 'New Property',
      image: '',
      images: [],
      price: 0,
      currency: 'AED',
      address: '',
      beds: 0,
      baths: 0,
      sqft: 0,
      description: '',
      features: {
        residences: [],
        luxuryWellness: [],
        retailDining: []
      },
      location: {
        lat: 25.2048, // Dubai default
        lng: 55.2708,
        distances: []
      },
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addProperty(newProperty);
    setActiveProperty(newId);
    setEditingMode('details');
    toast.success('New property created');
  };

  const togglePublished = () => {
    if (!currentProperty) return;

    handlePropertyUpdate({
      published: !currentProperty.published
    });
    
    toast.success(`Property ${currentProperty.published ? 'unpublished' : 'published'}`);
  };

  const handleDeleteProperty = () => {
    if (!currentProperty) return;
    
    if (confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      removeProperty(currentProperty.id);
      setActiveProperty(properties.length > 1 ? properties[0].id : null);
      toast.success('Property deleted successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-light">Property Listings</h1>
            </div>
            <div className="flex items-center gap-4">
              {currentProperty && (
                <>
                  <button
                    onClick={() => setShowPreview(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={togglePublished}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      currentProperty.published ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {currentProperty.published ? 'Published' : 'Draft'}
                  </button>
                  <button
                    onClick={handleDeleteProperty}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-red-100 text-red-600 hover:bg-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </>
              )}
              <button
                onClick={createNewProperty}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                <Plus className="w-4 h-4" />
                New Property
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto">
            <button
              onClick={() => setEditingMode('details')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                editingMode === 'details' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" />
              Property Details
            </button>
<button
  onClick={() => setEditingMode('slideshow')}
  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
    editingMode === 'slideshow' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
  }`}
>
  <Image className="w-4 h-4" />
  Images
</button>
            <button
              onClick={() => setEditingMode('location')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                editingMode === 'location' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Location
            </button>
            <button
              onClick={() => setEditingMode('amenities')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                editingMode === 'amenities' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ListChecks className="w-4 h-4" />
              Amenities
            </button>
            <button
              onClick={() => setEditingMode('hosting')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                editingMode === 'hosting' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Cloud className="w-4 h-4" />
              Hosting
            </button>
          </div>

          {/* Hosting Settings */}
          {editingMode === 'hosting' && (
            <div className="mt-6 border-t pt-6">
              <HostingSettings
                config={hostingConfig}
                onUpdate={updateHostingConfig}
                onDeploy={handleDeploy}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-2">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className={`group flex items-center justify-between rounded-lg transition-colors ${
                      activeProperty === property.id ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <button
                      onClick={() => setActiveProperty(property.id)}
                      className="flex items-center gap-2 px-4 py-2 flex-1 text-left"
                    >
                      <Building2 className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{property.name}</span>
                    </button>
                    <div className={`mr-2 flex-shrink-0 ${property.published ? 'text-green-500' : 'text-gray-400'}`}>
                      {property.published ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                ))}
                
                {properties.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <Building2 className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>No properties yet</p>
                    <button
                      onClick={createNewProperty}
                      className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
                    >
                      Create Your First Property
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-span-9">
            {currentProperty && editingMode !== 'hosting' ? (
              <div className="bg-white rounded-xl shadow-sm p-8">
                {editingMode === 'details' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property Name
                        </label>
                        <input
                          type="text"
                          value={currentProperty.name}
                          onChange={(e) => handlePropertyUpdate({ name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Enter property name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          value={currentProperty.address}
                          onChange={(e) => handlePropertyUpdate({ address: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Enter property address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price
                        </label>
                        <input
                          type="number"
                          value={currentProperty.price}
                          onChange={(e) => handlePropertyUpdate({ price: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Enter price"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency
                        </label>
                        <select
                          value={currentProperty.currency}
                          onChange={(e) => handlePropertyUpdate({ currency: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="AED">AED (د.إ)</option>
                          <option value="BTC">BTC (₿)</option>
                          <option value="USDT">USDT (₮)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Beds
                        </label>
                        <input
                          type="number"
                          value={currentProperty.beds}
                          onChange={(e) => handlePropertyUpdate({ beds: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Enter beds"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Baths
                        </label>
                        <input
                          type="number"
                          value={currentProperty.baths}
                          onChange={(e) => handlePropertyUpdate({ baths: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Enter baths"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Square Footage
                      </label>
                      <input
                        type="number"
                        value={currentProperty.sqft}
                        onChange={(e) => handlePropertyUpdate({ sqft: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter square footage"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={currentProperty.description}
                        onChange={(e) => handlePropertyUpdate({ description: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter property description"
                      />
                    </div>
                    
                    <div className="border-t pt-4 text-gray-500 text-sm">
                      <div>Last updated: {new Date(currentProperty.updatedAt).toLocaleString()}</div>
                      <div>Created: {new Date(currentProperty.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                )}

{editingMode === 'slideshow' && currentProperty && (
  <div className="space-y-8">
<h3 className="text-lg font-semibold mb-4">Property Images & Brochure</h3>
<div className="max-h-96 overflow-y-auto border rounded-lg p-4">
  {currentProperty.images.map((img, index) => (
    <div key={index} className="flex items-center gap-4 mb-4">
      <img src={img} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded-lg border" />
      <input
        type="text"
        value={currentProperty.imageTags?.[img]?.join(', ') || ''}
        onChange={(e) => {
          const tags = e.target.value.split(',').map(tag => tag.trim());
          handlePropertyUpdate({
            imageTags: {
              ...currentProperty.imageTags,
              [img]: tags
            }
          });
        }}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
        placeholder="Enter tags separated by commas"
      />
      <input
        type="checkbox"
        checked={currentProperty.slideshowImages?.includes(img) || false}
        onChange={(e) => {
          const slideshowImages = currentProperty.slideshowImages || [];
          const updatedSlideshowImages = e.target.checked
            ? [...slideshowImages, img]
            : slideshowImages.filter(i => i !== img);
          handlePropertyUpdate({ slideshowImages: updatedSlideshowImages });
        }}
        className="w-5 h-5"
      />
      <span className="text-sm">Include in Slideshow</span>
    </div>
  ))}
</div>
<SortableImageGrid
  images={currentProperty.slideshowImages || []}
onImagesChange={(images) => {
  handlePropertyUpdate({ slideshowImages: images });
        handlePropertyUpdate({ 
          images,
          image: images.length > 0 ? images[0] : ''
        });
      }}
      onImageUpload={(files) => {
        const newImages = Array.from(files).map(file => URL.createObjectURL(file));
        const updatedImages = [...currentProperty.images, ...newImages];
        handlePropertyUpdate({
          images: updatedImages,
          image: currentProperty.image || (updatedImages.length > 0 ? updatedImages[0] : '')
        });
        toast.success('Images uploaded successfully');
      }}
    />
  </div>
)}

{false && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Property Images</h3>
                      <p className="text-gray-600 mb-6">Drag and drop to reorder images. The first image will be used as the main image on listings.</p>
                      <SortableImageGrid
                        images={currentProperty.images}
                        onImagesChange={(images) => {
                          handlePropertyUpdate({ 
                            images,
                            // Set first image as main image
                            image: images.length > 0 ? images[0] : ''
                          });
                        }}
                        onImageUpload={(files) => {
                          const newImages = Array.from(files).map(file => URL.createObjectURL(file));
                          const updatedImages = [...currentProperty.images, ...newImages];
                          handlePropertyUpdate({
                            images: updatedImages,
                            // Set first image as main image if no main image exists
                            image: currentProperty.image || (updatedImages.length > 0 ? updatedImages[0] : '')
                          });
                          toast.success('Images uploaded successfully');
                        }}
                      />
                    </div>
                  </div>
                )}

                {editingMode === 'location' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Location Details</h3>
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Latitude
                          </label>
                          <input
                            type="number"
                            value={currentProperty.location.lat}
                            onChange={(e) => handlePropertyUpdate({
                              location: {
                                ...currentProperty.location,
                                lat: Number(e.target.value)
                              }
                            })}
                            step="0.000001"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Longitude
                          </label>
                          <input
                            type="number"
                            value={currentProperty.location.lng}
                            onChange={(e) => handlePropertyUpdate({
                              location: {
                                ...currentProperty.location,
                                lng: Number(e.target.value)
                              }
                            })}
                            step="0.000001"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                      <GoogleMap
                        center={currentProperty.location}
                        onCenterChange={(location) => handlePropertyUpdate({ 
                          location: {
                            ...currentProperty.location,
                            lat: location.lat,
                            lng: location.lng
                          }
                        })}
                      />
                      
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Nearby Places</h3>
                        <p className="text-gray-600 mb-4">Add nearby places with travel time information.</p>
                        
                        <div className="space-y-4">
                          {currentProperty.location.distances.map((distance, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <input
                                type="text"
                                value={distance.place}
                                onChange={(e) => {
                                  const updatedDistances = [...currentProperty.location.distances];
                                  updatedDistances[index].place = e.target.value;
                                  handlePropertyUpdate({
                                    location: {
                                      ...currentProperty.location,
                                      distances: updatedDistances
                                    }
                                  });
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Place name"
                              />
                              <input
                                type="number"
                                value={distance.time}
                                onChange={(e) => {
                                  const updatedDistances = [...currentProperty.location.distances];
                                  updatedDistances[index].time = Number(e.target.value);
                                  handlePropertyUpdate({
                                    location: {
                                      ...currentProperty.location,
                                      distances: updatedDistances
                                    }
                                  });
                                }}
                                className="w-24 px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Minutes"
                              />
                              <select
                                value={distance.type || 'landmark'}
                                onChange={(e) => {
                                  const updatedDistances = [...currentProperty.location.distances];
                                  updatedDistances[index].type = e.target.value;
                                  handlePropertyUpdate({
                                    location: {
                                      ...currentProperty.location,
                                      distances: updatedDistances
                                    }
                                  });
                                }}
                                className="w-40 px-4 py-2 border border-gray-300 rounded-lg"
                              >
                                <option value="landmark">Landmark</option>
                                <option value="restaurant">Restaurant</option>
                                <option value="store">Store</option>
                                <option value="school">School</option>
                                <option value="transit_station">Transit Station</option>
                                <option value="park">Park</option>
                                <option value="business">Business</option>
                              </select>
                              <button
                                onClick={() => {
                                  const updatedDistances = currentProperty.location.distances.filter((_, i) => i !== index);
                                  handlePropertyUpdate({
                                    location: {
                                      ...currentProperty.location,
                                      distances: updatedDistances
                                    }
                                  });
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                          
                          <button
                            onClick={() => {
                              const updatedDistances = [
                                ...currentProperty.location.distances,
                                { place: '', time: 5, type: 'landmark' }
                              ];
                              handlePropertyUpdate({
                                location: {
                                  ...currentProperty.location,
                                  distances: updatedDistances
                                }
                              });
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                          >
                            <Plus className="w-4 h-4" />
                            Add Place
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

{editingMode === 'brochure' && (
  <div className="space-y-8">
    <h3 className="text-lg font-semibold mb-4">Brochure Images</h3>
    <SortableImageGrid
      images={brochureImages.map(img => img.url)}
      onImagesChange={(images) => {
        setBrochureImages(images.map((url, index) => ({
          url,
          tags: brochureImages[index]?.tags || []
        })));
      }}
      onImageUpload={(files) => {
        const newImages = Array.from(files).map(file => ({
          url: URL.createObjectURL(file),
          tags: []
        }));
        setBrochureImages([...brochureImages, ...newImages]);
        toast.success('Brochure images uploaded successfully');
      }}
    />
    {brochureImages.map((img, index) => (
      <div key={index} className="mt-4">
        <input
          type="text"
          value={img.tags.join(', ')}
          onChange={(e) => {
            const updatedImages = [...brochureImages];
            updatedImages[index].tags = e.target.value.split(',').map(tag => tag.trim());
            setBrochureImages(updatedImages);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Enter tags separated by commas"
        />
      </div>
    ))}
  </div>
)}

{editingMode === 'amenities' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Property Amenities</h3>
                      <div className="flex gap-2 mb-6 flex-wrap">
                        {Object.entries(amenityCategories).map(([key, category]) => (
                          <button
                            key={key}
                            onClick={() => setSelectedCategory(key as keyof typeof amenityCategories)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              selectedCategory === key
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {category.title}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {amenityCategories[selectedCategory].options.map((amenity) => {
                          const isSelected = currentProperty.features[selectedCategory].includes(amenity);
                          return (
                            <button
                              key={amenity}
                              onClick={() => toggleAmenity(selectedCategory, amenity)}
                              className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                                isSelected
                                  ? 'border-gray-900 bg-gray-900 text-white'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {isSelected ? (
                                <Check className="w-5 h-5 text-white" />
                              ) : (
                                <Plus className="w-5 h-5 text-gray-400" />
                              )}
                              <span>{amenity}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : !currentProperty && editingMode !== 'hosting' ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Select a property to edit or create a new one</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && currentProperty && (
        <PropertyPreview
          property={currentProperty}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
