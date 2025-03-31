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
import { usePropertyStore } from '../stores/propertyStore';
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

interface PropertyDetails {
  title: string;
  price: number;
  currency: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  features: {
    residences: string[];
    luxuryWellness: string[];
    retailDining: string[];
  };
  amenities: {
    residences: string[];
    luxuryWellness: string[];
    retailDining: string[];
    security: string[];
  };
  images: string[];
}

interface Page {
  id: string;
  type: 'listing';
  title: string;
  slug: string;
  propertyDetails: PropertyDetails;
  sections: any[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

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
}

const DEFAULT_PROPERTY: PropertyDetails = {
  title: 'New Property Listing',
  price: 0,
  currency: 'USD',
  address: '',
  location: { lat: 25.2048, lng: 55.2708 }, // Dubai default coordinates
  beds: 0,
  baths: 0,
  sqft: 0,
  description: '',
  features: {
    residences: [],
    luxuryWellness: [],
    retailDining: []
  },
  amenities: {
    residences: [],
    luxuryWellness: [],
    retailDining: [],
    security: []
  },
  images: []
};

const DEFAULT_HOSTING: HostingConfig = {
  provider: 'netlify',
  siteId: '',
  teamId: '',
  apiKey: '',
  buildCommand: 'npm run build',
  outputDir: 'dist',
  deployedUrl: '',
  lastDeployed: null,
  status: 'ready'
};

export function PageManager() {
  const [listings, setListings] = useState<Page[]>([]);
  const [activeListing, setActiveListing] = useState<string | null>(null);
  const [editingMode, setEditingMode] = useState<'details' | 'slideshow' | 'location' | 'amenities' | 'hosting' | 'content'>('details');
  const [hostingConfig, setHostingConfig] = useState<HostingConfig>(DEFAULT_HOSTING);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof amenityCategories>('residences');
  const [showPreview, setShowPreview] = useState(false);
  
  const { properties, updateProperty } = usePropertyStore();

  // Initialize listings from property store
  useEffect(() => {
    const initialListings = properties.map(property => ({
      id: property.id,
      type: 'listing' as const,
      title: property.name,
      slug: `property-${property.id}`,
      propertyDetails: {
        title: property.name,
        price: property.price,
        currency: property.currency,
        address: property.address,
        location: { 
          lat: property.location.lat,
          lng: property.location.lng
        },
        beds: property.beds,
        baths: property.baths,
        sqft: property.sqft,
        description: property.description,
        features: property.features,
        amenities: {
          residences: property.features.residences,
          luxuryWellness: property.features.luxuryWellness,
          retailDining: property.features.retailDining,
          security: []
        },
        images: property.images
      },
      sections: [],
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    setListings(initialListings);
    if (initialListings.length > 0) {
      setActiveListing(initialListings[0].id);
    }
  }, [properties]);

  const currentListing = listings.find(l => l.id === activeListing);

  const updateListingDetails = (details: Partial<PropertyDetails>) => {
    if (!currentListing) return;

    const updatedListing = {
      ...currentListing,
      propertyDetails: {
        ...currentListing.propertyDetails,
        ...details
      },
      updatedAt: new Date().toISOString()
    };

    setListings(listings.map(listing =>
      listing.id === activeListing ? updatedListing : listing
    ));

    // Update the property store
    updateProperty(currentListing.id, {
      name: details.title || currentListing.propertyDetails.title,
      price: details.price || currentListing.propertyDetails.price,
      currency: details.currency || currentListing.propertyDetails.currency,
      address: details.address || currentListing.propertyDetails.address,
      beds: details.beds || currentListing.propertyDetails.beds,
      baths: details.baths || currentListing.propertyDetails.baths,
      sqft: details.sqft || currentListing.propertyDetails.sqft,
      description: details.description || currentListing.propertyDetails.description,
      features: details.features || currentListing.propertyDetails.features,
      images: details.images || currentListing.propertyDetails.images,
      location: {
        lat: details.location?.lat || currentListing.propertyDetails.location.lat,
        lng: details.location?.lng || currentListing.propertyDetails.location.lng,
        distances: currentListing.propertyDetails.location?.distances || []
      }
    });
  };

  const toggleAmenity = (category: keyof typeof amenityCategories, amenity: string) => {
    if (!currentListing) return;

    const currentFeatures = currentListing.propertyDetails.features[category];
    const newFeatures = currentFeatures.includes(amenity)
      ? currentFeatures.filter(a => a !== amenity)
      : [...currentFeatures, amenity];

    updateListingDetails({
      features: {
        ...currentListing.propertyDetails.features,
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

  const createNewListing = () => {
    const newListing: Page = {
      id: `listing-${Date.now()}`,
      type: 'listing',
      title: 'New Property Listing',
      slug: `property-${Date.now()}`,
      propertyDetails: { ...DEFAULT_PROPERTY },
      sections: [],
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setListings([...listings, newListing]);
    setActiveListing(newListing.id);
    setEditingMode('details');
    toast.success('New listing created');
  };

  const togglePublished = () => {
    if (!currentListing) return;

    setListings(listings.map(listing =>
      listing.id === activeListing
        ? { ...listing, published: !listing.published }
        : listing
    ));
    toast.success(`Listing ${currentListing.published ? 'unpublished' : 'published'}`);
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
              {currentListing && (
                <>
                  <button
                    onClick={() => setShowPreview(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      showPreview ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={togglePublished}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      currentListing.published ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {currentListing.published ? 'Published' : 'Draft'}
                  </button>
                </>
              )}
              <button
                onClick={createNewListing}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                <Plus className="w-4 h-4" />
                New Listing
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mt-6">
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
              Slideshow
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
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className={`group flex items-center justify-between rounded-lg transition-colors ${
                      activeListing === listing.id ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <button
                      onClick={() => setActiveListing(listing.id)}
                      className="flex items-center gap-2 px-4 py-2 flex-1"
                    >
                      <Building2 className="w-4 h-4" />
                      <span>{listing.title}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-span-9">
            {currentListing && editingMode !== 'hosting' ? (
              <div className="bg-white rounded-xl shadow-sm p-8">
                {editingMode === 'details' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property Title
                        </label>
                        <input
                          type="text"
                          value={currentListing.propertyDetails.title}
                          onChange={(e) => updateListingDetails({ title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          value={currentListing.propertyDetails.address}
                          onChange={(e) => updateListingDetails({ address: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
                          value={currentListing.propertyDetails.price}
                          onChange={(e) => updateListingDetails({ price: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Beds
                        </label>
                        <input
                          type="number"
                          value={currentListing.propertyDetails.beds}
                          onChange={(e) => updateListingDetails({ beds: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Baths
                        </label>
                        <input
                          type="number"
                          value={currentListing.propertyDetails.baths}
                          onChange={(e) => updateListingDetails({ baths: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sq Ft
                        </label>
                        <input
                          type="number"
                          value={currentListing.propertyDetails.sqft}
                          onChange={(e) => updateListingDetails({ sqft: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={currentListing.propertyDetails.description}
                        onChange={(e) => updateListingDetails({ description: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {editingMode === 'slideshow' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Property Images</h3>
                      <p className="text-gray-600 mb-6">Drag and drop to reorder images. Click the grip handle to start dragging.</p>
                      <SortableImageGrid
                        images={currentListing.propertyDetails.images}
                        onImagesChange={(images) => updateListingDetails({ images })}
                        onImageUpload={(files) => {
                          const newImages = Array.from(files).map(file => URL.createObjectURL(file));
                          updateListingDetails({
                            images: [...currentListing.propertyDetails.images, ...newImages]
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
                            value={currentListing.propertyDetails.location.lat}
                            onChange={(e) => updateListingDetails({
                              location: {
                                ...currentListing.propertyDetails.location,
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
                            value={currentListing.propertyDetails.location.lng}
                            onChange={(e) => updateListingDetails({
                              location: {
                                ...currentListing.propertyDetails.location,
                                lng: Number(e.target.value)
                              }
                            })}
                            step="0.000001"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                      <GoogleMap
                        center={currentListing.propertyDetails.location}
                        onCenterChange={(location) => updateListingDetails({ location })}
                      />
                    </div>
                  </div>
                )}

                {editingMode === 'amenities' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Property Amenities</h3>
                      <div className="flex gap-2 mb-6">
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
                          const isSelected = currentListing.propertyDetails.features[selectedCategory].includes(amenity);
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
            ) : !currentListing && editingMode !== 'hosting' ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Select a listing to edit</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && currentListing && (
        <PropertyPreview
          property={currentListing.propertyDetails}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}