import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { 
  Plus,
  Trash2,
  Eye,
  Building2,
  Cloud,
  Home,
  Image,
  ListChecks,
  MapPin,
  Check,
  X,
  FileText,
  Layout,
  Star,
  Mail
} from 'lucide-react';
import { HomePreview } from '../components/HomePreview';
import { SortableImageGrid } from '../components/SortableImageGrid';
import NewsletterManager from '../components/NewsletterManager';
import { GoogleMap } from '../components/GoogleMap';
import { HostingSettings } from '../components/HostingSettings';
import { usePropertyStore, Property } from '../stores/propertyStore';
import { PropertyPreview } from '../components/PropertyPreview';
import { ImageSelectionPopup } from '../components/ImageSelectionPopup';

// Predefined property amenity categories
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


// Hosting configuration interface
interface HostingConfig {
  provider: string;
  projectId: string;
  teamId: string;
  token: string;
  buildCommand: string;
  outputDir: string;
  deployedUrl: string;
  lastDeployed: Date | null;
  status: 'ready' | 'building' | 'deployed' | 'error';
  email: string; // Gmail integration
  apiKeys: {
    googleMaps: string;
    exchangeRate: string;
    cryptoExchange: string;
    analytics: string;
  };
}

// Default hosting configuration
const DEFAULT_HOSTING: HostingConfig = {
  provider: 'vercel',
  projectId: 'mai-real-estate',
  teamId: 'apex758s-projects',
  token: '', 
  buildCommand: 'vite build',
  outputDir: 'dist',
  deployedUrl: '', 
  lastDeployed: null,
  status: 'ready',
  email: '',
  apiKeys: {
    googleMaps: '',
    exchangeRate: '',
    cryptoExchange: '',
    analytics: ''
  }
};



// Homepage settings interface
interface HomepageSettings {
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
}

// Default homepage settings
const DEFAULT_HOMEPAGE: HomepageSettings = {
  heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80",
  heroTitle: "Dubai Real Estate",
  propertyTypes: ["apartments", "condos", "houses", "homes"],
  paymentTypes: ["Bitcoin", "USDT"],
  gridImages: {
    large: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80",
    small1: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80",
    small2: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80"
  },
  textContent: {
    cryptoPayments: "Crypto Payments",
    purchaseYourDream: "Purchase your dream property with cryptocurrency",
    primeLocations: "Prime Locations",
    exclusiveProperties: "Exclusive properties in the most sought-after areas",
    luxuryDubaiLiving: "Luxury Dubai Living",
    dubaiMarina: "Dubai Marina",
    downtownViews: "Downtown Views",
    featuredProperties: "Featured Dubai Properties"
  }
};

export function PageManager() {
  const [activeProperty, setActiveProperty] = useState<string | null>(null);
  const [editingMode, setEditingMode] = useState<'details' | 'slideshow' | 'location' | 'amenities' | 'hosting' | 'content' | 'homepage' | 'contact' | 'newsletter'>('details');
  const [selectedPlaceType, setSelectedPlaceType] = useState<string | null>("restaurant");
  // Initialize homepage settings from localStorage or use defaults
  const [homepageSettings, setHomepageSettings] = useState<HomepageSettings>(() => {
    const savedSettings = localStorage.getItem('homepageSettings');
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_HOMEPAGE;
  });
  
  // State for showcase properties
  const [showcaseMode, setShowcaseMode] = useState(false);
  
  const [showHomepagePreview, setShowHomepagePreview] = useState(false);
  const [imageSelectionPopup, setImageSelectionPopup] = useState<{
    isOpen: boolean;
    target: 'heroImage' | 'gridLarge' | 'gridSmall1' | 'gridSmall2' | null;
    title: string;
  }>({
    isOpen: false,
    target: null,
    title: ''
  });
  
  // Contact information state - initialize from localStorage or use defaults
  const [contactInfo, setContactInfo] = useState(() => {
    const savedContactInfo = localStorage.getItem('contactInfo');
    return savedContactInfo ? JSON.parse(savedContactInfo) : {
      address: {
        street: '123 Luxury Real Estate Blvd',
        city: 'Beverly Hills',
        state: 'CA',
        zip: '90210'
      },
      phone: '+1 (310) 555-0123',
      email: 'contact@mairealestate.com',
      officeHours: {
        weekdays: 'Monday - Friday: 9:00 AM - 6:00 PM',
        saturday: 'Saturday: 10:00 AM - 4:00 PM',
        sunday: 'Sunday: Closed'
      }
    };
  });

  // Legal pages state - initialize from localStorage or use defaults
  const [legalPages, setLegalPages] = useState(() => {
    const savedLegalPages = localStorage.getItem('legalPages');
    return savedLegalPages ? JSON.parse(savedLegalPages) : {
      privacyPolicy: '',
      termsOfService: '',
      cookiePolicy: ''
    };
  });
  
  // Contact map location - initialize from localStorage or use defaults
  const [contactMapLocation, setContactMapLocation] = useState(() => {
    const savedLocation = localStorage.getItem('contactMapLocation');
    return savedLocation ? JSON.parse(savedLocation) : {
      lat: 25.2048,
      lng: 55.2708
    };
  });
  // Initialize hosting config from localStorage or use defaults
  const [hostingConfig, setHostingConfig] = useState<HostingConfig>(() => {
    const savedConfig = localStorage.getItem('hostingConfig');
    return savedConfig ? JSON.parse(savedConfig) : DEFAULT_HOSTING;
  });
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof amenityCategories>('residences');
const [showPreview, setShowPreview] = useState(false);
  
  // Access property store
  const { 
    properties, 
    updateProperty, 
    addProperty, 
    removeProperty,
    showcasePropertyIds,
    setShowcaseProperties
  } = usePropertyStore();
  
  // Collect all images from all properties for the image selection popup
  const allSiteImages = useMemo(() => {
    return properties.flatMap(p => p.images || []);
  }, [properties]);

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
    const updatedConfig = {
      ...hostingConfig,
      ...config
    };
    
    // Save to localStorage
    localStorage.setItem('hostingConfig', JSON.stringify(updatedConfig));
    
    setHostingConfig(updatedConfig);
  };

  const handleDeploy = () => {
    if (!hostingConfig.projectId || !hostingConfig.token) {
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
        deployedUrl: `https://${hostingConfig.projectId}.netlify.app`
      });
      toast.success('Deployment completed!');
    }, 3000);
  };

  const createNewProperty = () => {
    const newId = `property-${Date.now()}`;
    
    // Generate a random location near Dubai Marina for each new property
    // This ensures each property has a unique location
    const randomOffset = () => (Math.random() - 0.5) * 0.02; // Random offset of about ±0.01 degrees (roughly 1km)
    
    const newProperty: Property = {
      id: newId,
      name: 'New Property',
      image: '',
      images: [],
      slideshowImages: [],
      brochureImages: [],
      imageTags: {},
      price: 0,
      currency: 'AED',
      address: 'Dubai Marina, Dubai, UAE',
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
        lat: 25.2048 + randomOffset(), // Dubai Marina with random offset
        lng: 55.2708 + randomOffset(),
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 pt-16">
      {/* Gold decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 z-40"></div>
      <div className="absolute left-0 top-16 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
      <div className="absolute right-0 top-16 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center mb-0">
                <div className="h-px w-8 bg-amber-400"></div>
                <span className="mx-3 text-amber-500 tracking-[0.2em] uppercase text-xs font-light">Admin</span>
                <div className="h-px w-8 bg-amber-400"></div>
              </div>
              <h1 className="text-3xl font-light text-gray-900 dark:text-white tracking-wider">Property Management</h1>
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
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-900/20"
              >
                <Plus className="w-4 h-4" />
                New Property
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto border-t border-gray-200 dark:border-gray-700 pt-6">
            <button
              onClick={() => setEditingMode('details')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                editingMode === 'details' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <Home className="w-4 h-4" />
              Property Details
            </button>
<button
  onClick={() => setEditingMode('slideshow')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                editingMode === 'slideshow' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
  }`}
>
  <Image className="w-4 h-4" />
  Images
</button>
            <button
              onClick={() => setEditingMode('location')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                editingMode === 'location' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Location
            </button>
            <button
              onClick={() => setEditingMode('amenities')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                editingMode === 'amenities' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <ListChecks className="w-4 h-4" />
              Amenities
            </button>
            <button
              onClick={() => setEditingMode('hosting')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                editingMode === 'hosting' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <Cloud className="w-4 h-4" />
              Hosting
            </button>
            <button
              onClick={() => setEditingMode('content')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                editingMode === 'content' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <FileText className="w-4 h-4" />
              Content
            </button>
            <button
              onClick={() => setEditingMode('contact')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                editingMode === 'contact' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Contact Map
            </button>
            <button
              onClick={() => setEditingMode('homepage')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                editingMode === 'homepage' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <Layout className="w-4 h-4" />
              Homepage
            </button>
            <button
              onClick={() => setEditingMode('newsletter')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                editingMode === 'newsletter' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <Mail className="w-4 h-4" />
              Newsletter
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
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
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                {editingMode === 'details' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Property Name
                        </label>
                        <input
                          type="text"
                          value={currentProperty.name}
                          onChange={(e) => handlePropertyUpdate({ name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
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
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
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
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
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
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
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
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Beds
                        </label>
                        <input
                          type="number"
                          value={currentProperty.beds}
                          onChange={(e) => handlePropertyUpdate({ beds: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          placeholder="Enter beds"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Baths
                        </label>
                        <input
                          type="number"
                          value={currentProperty.baths}
                          onChange={(e) => handlePropertyUpdate({ baths: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          placeholder="Enter baths"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Square Footage
                      </label>
                      <input
                        type="number"
                        value={currentProperty.sqft}
                        onChange={(e) => handlePropertyUpdate({ sqft: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                        placeholder="Enter square footage"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={currentProperty.description}
                        onChange={(e) => handlePropertyUpdate({ description: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                        placeholder="Enter property description"
                      />
                    </div>
                    
                    <div className="border-t dark:border-gray-700 pt-4 text-gray-500 dark:text-gray-400 text-sm">
                      <div>Last updated: {new Date(currentProperty.updatedAt).toLocaleString()}</div>
                      <div>Created: {new Date(currentProperty.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                )}

{editingMode === 'slideshow' && currentProperty && (
  <div className="space-y-8">
<h3 className="text-lg font-semibold mb-4">Property Images</h3>
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
        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
        placeholder="Enter tags separated by commas"
      />
      <div className="flex items-center gap-2">
        <div className="flex items-center">
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
            className="w-5 h-5 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="text-sm dark:text-gray-300 ml-1">Slideshow</span>
        </div>
        <div className="flex items-center ml-4">
          <input
            type="checkbox"
            checked={currentProperty.brochureImages?.includes(img) || false}
            onChange={(e) => {
              const brochureImages = currentProperty.brochureImages || [];
              const updatedBrochureImages = e.target.checked
                ? [...brochureImages, img]
                : brochureImages.filter(i => i !== img);
              handlePropertyUpdate({ brochureImages: updatedBrochureImages });
            }}
            className="w-5 h-5 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="text-sm dark:text-gray-300 ml-1">Brochure</span>
        </div>
      </div>
    </div>
  ))}
</div>
<SortableImageGrid
  images={currentProperty.slideshowImages || []}
  onImagesChange={(images) => {
    // Update both slideshowImages and the main images array
    // This ensures that the slideshowImages are always a subset of the main images
    const updatedImages = [...new Set([...images, ...currentProperty.images])];
    
    handlePropertyUpdate({
      slideshowImages: images,
      images: updatedImages,
      image: updatedImages.length > 0 ? updatedImages[0] : ''
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
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Location URL (Google Maps)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Paste Google Maps URL here"
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                              onBlur={(e) => {
                                try {
                                  // Try to extract coordinates from Google Maps URL
                                  const url = e.target.value;
                                  if (url && url.includes('@')) {
                                    const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
                                    if (match && match.length === 3) {
                                      const lat = parseFloat(match[1]);
                                      const lng = parseFloat(match[2]);
                                      if (!isNaN(lat) && !isNaN(lng)) {
                                        // Update the property's location with the new coordinates
                                        handlePropertyUpdate({
                                          location: {
                                            ...currentProperty.location,
                                            lat,
                                            lng
                                          },
                                          // Also update the address based on the location
                                          address: `Location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`
                                        });
                                        
                                        // Try to get a proper address using reverse geocoding
                                        if (window.google && window.google.maps) {
                                          const geocoder = new window.google.maps.Geocoder();
                                          geocoder.geocode(
                                            { location: { lat, lng } },
                                            (results, status) => {
                                              if (status === 'OK' && results && results[0]) {
                                                handlePropertyUpdate({
                                                  address: results[0].formatted_address
                                                });
                                              }
                                            }
                                          );
                                        }
                                        
                                        toast.success('Location updated from URL');
                                      }
                                    }
                                  }
                                } catch (error) {
                                  console.error('Error parsing Google Maps URL:', error);
                                }
                              }}
                            />
                            <button
                              onClick={() => {
                                // Open current location in Google Maps
                                const url = `https://www.google.com/maps/search/?api=1&query=${currentProperty.location.lat},${currentProperty.location.lng}`;
                                window.open(url, '_blank');
                              }}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              View in Maps
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Paste a Google Maps URL or move the marker on the map below
                          </p>
                        </div>
                        
                        <GoogleMap
                          center={currentProperty.location}
                          onCenterChange={(location) => {
                            console.log("Map center changed:", location);
                            handlePropertyUpdate({ 
                              location: {
                                ...currentProperty.location,
                                lat: location.lat,
                                lng: location.lng
                              }
                            });
                          }}
                          selectedType={selectedPlaceType}
                          travelMode="WALKING"
                          markerColor="red"
                          readOnly={false} // Explicitly set to false to allow location changes
                          onNearbyPlacesFound={(places) => {
                            console.log(`PageManager received ${places.length} nearby places`);
                          }}
                        />
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            onClick={() => setSelectedPlaceType("restaurant")}
                            className={`px-3 py-1.5 ${selectedPlaceType === "restaurant" ? 
                              "bg-gray-900 text-white dark:bg-gray-600" : 
                              "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"} 
                              rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm`}
                          >
                            Restaurants
                          </button>
                          <button
                            onClick={() => setSelectedPlaceType("cafe")}
                            className={`px-3 py-1.5 ${selectedPlaceType === "cafe" ? 
                              "bg-gray-900 text-white dark:bg-gray-600" : 
                              "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"} 
                              rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm`}
                          >
                            Cafes
                          </button>
                          <button
                            onClick={() => setSelectedPlaceType("school")}
                            className={`px-3 py-1.5 ${selectedPlaceType === "school" ? 
                              "bg-gray-900 text-white dark:bg-gray-600" : 
                              "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"} 
                              rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm`}
                          >
                            Schools
                          </button>
                          <button
                            onClick={() => setSelectedPlaceType("supermarket")}
                            className={`px-3 py-1.5 ${selectedPlaceType === "supermarket" ? 
                              "bg-gray-900 text-white dark:bg-gray-600" : 
                              "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"} 
                              rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm`}
                          >
                            Supermarkets
                          </button>
                          <button
                            onClick={() => setSelectedPlaceType("transit_station")}
                            className={`px-3 py-1.5 ${selectedPlaceType === "transit_station" ? 
                              "bg-gray-900 text-white dark:bg-gray-600" : 
                              "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"} 
                              rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm`}
                          >
                            Transit
                          </button>
                        </div>
                      </div>
                      
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
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
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
                                className="w-24 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
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
                                className="w-40 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
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
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full"
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
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            <Plus className="w-4 h-4" />
                            Add Place
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}


                {editingMode === 'contact' && (
                  <div className="space-y-8">
                    <h3 className="text-lg font-semibold mb-4">Contact Page Map Location</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Set the location for the map on the Contact page.</p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Latitude
                        </label>
                        <input
                          type="number"
                          value={contactMapLocation.lat}
                          onChange={(e) => setContactMapLocation({
                            ...contactMapLocation,
                            lat: Number(e.target.value)
                          })}
                          step="0.000001"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Longitude
                        </label>
                        <input
                          type="number"
                          value={contactMapLocation.lng}
                          onChange={(e) => setContactMapLocation({
                            ...contactMapLocation,
                            lng: Number(e.target.value)
                          })}
                          step="0.000001"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location URL (Google Maps)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Paste Google Maps URL here"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          onBlur={(e) => {
                            try {
                              // Try to extract coordinates from Google Maps URL
                              const url = e.target.value;
                              if (url && url.includes('@')) {
                                const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
                                if (match && match.length === 3) {
                                  const lat = parseFloat(match[1]);
                                  const lng = parseFloat(match[2]);
                                  if (!isNaN(lat) && !isNaN(lng)) {
                                    setContactMapLocation({ lat, lng });
                                    toast.success('Location updated from URL');
                                  }
                                }
                              }
                            } catch (error) {
                              console.error('Error parsing Google Maps URL:', error);
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            // Open current location in Google Maps
                            const url = `https://www.google.com/maps/search/?api=1&query=${contactMapLocation.lat},${contactMapLocation.lng}`;
                            window.open(url, '_blank');
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          View in Maps
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Paste a Google Maps URL or enter coordinates directly
                      </p>
                    </div>
                    
                    <div className="h-[400px] rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                      <GoogleMap
                        center={contactMapLocation}
                        onCenterChange={(location) => {
                          setContactMapLocation({
                            lat: location.lat,
                            lng: location.lng
                          });
                        }}
                        readOnly={false}
                        markerColor="amber"
                      />
                    </div>
                    
                    <div className="mt-6">
                      <button
                        onClick={() => {
                          localStorage.setItem('contactMapLocation', JSON.stringify(contactMapLocation));
                          toast.success('Contact map location saved successfully');
                        }}
                        className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-900/20"
                      >
                        Save Map Location
                      </button>
                    </div>
                  </div>
                )}
                
                {editingMode === 'content' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Street Address
                          </label>
                          <input
                            type="text"
                            value={contactInfo.address.street}
                            onChange={(e) => setContactInfo({
                              ...contactInfo,
                              address: {
                                ...contactInfo.address,
                                street: e.target.value
                              }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            value={contactInfo.address.city}
                            onChange={(e) => setContactInfo({
                              ...contactInfo,
                              address: {
                                ...contactInfo.address,
                                city: e.target.value
                              }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            State/Province
                          </label>
                          <input
                            type="text"
                            value={contactInfo.address.state}
                            onChange={(e) => setContactInfo({
                              ...contactInfo,
                              address: {
                                ...contactInfo.address,
                                state: e.target.value
                              }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            ZIP/Postal Code
                          </label>
                          <input
                            type="text"
                            value={contactInfo.address.zip}
                            onChange={(e) => setContactInfo({
                              ...contactInfo,
                              address: {
                                ...contactInfo.address,
                                zip: e.target.value
                              }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            value={contactInfo.phone}
                            onChange={(e) => setContactInfo({
                              ...contactInfo,
                              phone: e.target.value
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={contactInfo.email}
                            onChange={(e) => setContactInfo({
                              ...contactInfo,
                              email: e.target.value
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-md font-medium mb-3">Office Hours</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Weekdays
                            </label>
                            <input
                              type="text"
                              value={contactInfo.officeHours.weekdays}
                              onChange={(e) => setContactInfo({
                                ...contactInfo,
                                officeHours: {
                                  ...contactInfo.officeHours,
                                  weekdays: e.target.value
                                }
                              })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Saturday
                            </label>
                            <input
                              type="text"
                              value={contactInfo.officeHours.saturday}
                              onChange={(e) => setContactInfo({
                                ...contactInfo,
                                officeHours: {
                                  ...contactInfo.officeHours,
                                  saturday: e.target.value
                                }
                              })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Sunday
                            </label>
                            <input
                              type="text"
                              value={contactInfo.officeHours.sunday}
                              onChange={(e) => setContactInfo({
                                ...contactInfo,
                                officeHours: {
                                  ...contactInfo.officeHours,
                                  sunday: e.target.value
                                }
                              })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t dark:border-gray-700 pt-8">
                      <h3 className="text-lg font-semibold mb-4">Legal Pages</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Privacy Policy
                          </label>
                          <textarea
                            value={legalPages.privacyPolicy}
                            onChange={(e) => setLegalPages({
                              ...legalPages,
                              privacyPolicy: e.target.value
                            })}
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                            placeholder="Enter your privacy policy content here..."
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Terms of Service
                          </label>
                          <textarea
                            value={legalPages.termsOfService}
                            onChange={(e) => setLegalPages({
                              ...legalPages,
                              termsOfService: e.target.value
                            })}
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                            placeholder="Enter your terms of service content here..."
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Cookie Policy
                          </label>
                          <textarea
                            value={legalPages.cookiePolicy}
                            onChange={(e) => setLegalPages({
                              ...legalPages,
                              cookiePolicy: e.target.value
                            })}
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                            placeholder="Enter your cookie policy content here..."
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button
                          onClick={() => {
                            // Save contact info and legal pages to localStorage
                            localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
                            localStorage.setItem('legalPages', JSON.stringify(legalPages));
                            toast.success('Content settings saved successfully');
                          }}
                        className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-900/20"
                        >
                          Save Content Settings
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {editingMode === 'homepage' && (
                  <div className="space-y-8">
                    <h3 className="text-lg font-semibold mb-4">Homepage Settings</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Customize the images and text displayed on your homepage.</p>
                    
                    {/* Showcase Properties Section */}
                    <div className="border-b pb-6 mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-md font-medium">Showcase Properties</h4>
                        <button
                          onClick={() => setShowcaseMode(!showcaseMode)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            showcaseMode 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {showcaseMode ? 'Done Selecting' : 'Select Properties'}
                        </button>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Choose up to 3 properties to feature in the homepage showcase section.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {properties
                          .filter(p => p.published)
                          .map(property => (
                            <div 
                              key={property.id}
                              className={`relative rounded-lg border overflow-hidden ${
                                showcasePropertyIds.includes(property.id) 
                                  ? 'border-amber-500 dark:border-amber-400' 
                                  : 'border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              <div className="relative h-40">
                                <img 
                                  src={property.image} 
                                  alt={property.name}
                                  className="w-full h-full object-cover"
                                />
                                {showcasePropertyIds.includes(property.id) && (
                                  <div className="absolute top-2 right-2 bg-amber-500 text-white p-1 rounded-full">
                                    <Star className="w-4 h-4" />
                                  </div>
                                )}
                              </div>
                              <div className="p-3">
                                <h5 className="font-medium text-gray-900 dark:text-white truncate">{property.name}</h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{property.address}</p>
                              </div>
                      {showcaseMode && (
                        <button
                          onClick={() => {
                            if (showcasePropertyIds.includes(property.id)) {
                              // Remove from showcase
                              setShowcaseProperties(showcasePropertyIds.filter(id => id !== property.id));
                              toast.success(`Removed "${property.name}" from homepage showcase`);
                            } else if (showcasePropertyIds.length < 3) {
                              // Add to showcase (max 3)
                              setShowcaseProperties([...showcasePropertyIds, property.id]);
                              toast.success(`Added "${property.name}" to homepage showcase`);
                            } else {
                              // Replace the first one if already have 3
                              const newShowcase = [...showcasePropertyIds];
                              const removedProperty = properties.find(p => p.id === newShowcase[0]);
                              newShowcase.shift(); // Remove first
                              newShowcase.push(property.id); // Add new one
                              setShowcaseProperties(newShowcase);
                              toast.success(`Replaced "${removedProperty?.name || 'property'}" with "${property.name}" in homepage showcase`);
                            }
                          }}
                                  className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
                                    showcasePropertyIds.includes(property.id) ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                                  }`}
                                >
                                  {showcasePropertyIds.includes(property.id) ? (
                                    <span className="bg-red-600 text-white px-3 py-1 rounded-lg">Remove from Showcase</span>
                                  ) : (
                                    <span className="bg-green-600 text-white px-3 py-1 rounded-lg">Add to Showcase</span>
                                  )}
                                </button>
                              )}
                            </div>
                          ))}
                      </div>
                      
                      {properties.filter(p => p.published).length === 0 && (
                        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="text-gray-500 dark:text-gray-400">No published properties available for showcase.</p>
                          <p className="text-gray-500 dark:text-gray-400 mt-2">Publish properties to add them to the showcase.</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-b pb-6 mb-6">
                      <h4 className="text-md font-medium mb-4">Hero Section</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Hero Image
                          </label>
                          <div className="flex gap-4 items-center">
                            <input
                              type="text"
                              value={homepageSettings.heroImage}
                              onChange={(e) => setHomepageSettings({
                                ...homepageSettings,
                                heroImage: e.target.value
                              })}
                              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                              placeholder="Enter image URL"
                            />
                            <button
                              onClick={() => {
                                if (allSiteImages.length > 0) {
                                  setImageSelectionPopup({
                                    isOpen: true,
                                    target: 'heroImage',
                                    title: 'Select Hero Image'
                                  });
                                } else {
                                  toast.error('No images available on site');
                                }
                              }}
                              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                              Select from site
                            </button>
                          </div>
                          {homepageSettings.heroImage && (
                            <div className="mt-2">
                              <img 
                                src={homepageSettings.heroImage} 
                                alt="Hero preview" 
                                className="h-20 object-cover rounded-lg border"
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Hero Title
                          </label>
                          <input
                            type="text"
                            value={homepageSettings.heroTitle}
                            onChange={(e) => setHomepageSettings({
                              ...homepageSettings,
                              heroTitle: e.target.value
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                            placeholder="Enter hero title"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-b pb-6 mb-6">
                      <h4 className="text-md font-medium mb-4">Rotating Text</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Property Types (comma separated)
                          </label>
                          <input
                            type="text"
                            value={homepageSettings.propertyTypes.join(', ')}
                            onChange={(e) => setHomepageSettings({
                              ...homepageSettings,
                              propertyTypes: e.target.value.split(',').map(type => type.trim())
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                            placeholder="Enter property types"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Payment Types (comma separated)
                          </label>
                          <input
                            type="text"
                            value={homepageSettings.paymentTypes.join(', ')}
                            onChange={(e) => setHomepageSettings({
                              ...homepageSettings,
                              paymentTypes: e.target.value.split(',').map(type => type.trim())
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                            placeholder="Enter payment types"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-b pb-6 mb-6">
                      <h4 className="text-md font-medium mb-4">Grid Section Images</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Large Image (Grid 1)
                          </label>
                          <div className="flex gap-4 items-center">
                            <input
                              type="text"
                              value={homepageSettings.gridImages.large}
                              onChange={(e) => setHomepageSettings({
                                ...homepageSettings,
                                gridImages: {
                                  ...homepageSettings.gridImages,
                                  large: e.target.value
                                }
                              })}
                              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                              placeholder="Enter image URL"
                            />
                            <button
                              onClick={() => {
                                if (allSiteImages.length > 0) {
                                  setImageSelectionPopup({
                                    isOpen: true,
                                    target: 'gridLarge',
                                    title: 'Select Large Grid Image'
                                  });
                                } else {
                                  toast.error('No images available on site');
                                }
                              }}
                              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                              Select from site
                            </button>
                          </div>
                          {homepageSettings.gridImages.large && (
                            <div className="mt-2">
                              <img 
                                src={homepageSettings.gridImages.large} 
                                alt="Grid 1 preview" 
                                className="h-20 object-cover rounded-lg border"
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Small Image 1 (Grid 2)
                          </label>
                          <div className="flex gap-4 items-center">
                            <input
                              type="text"
                              value={homepageSettings.gridImages.small1}
                              onChange={(e) => setHomepageSettings({
                                ...homepageSettings,
                                gridImages: {
                                  ...homepageSettings.gridImages,
                                  small1: e.target.value
                                }
                              })}
                              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                              placeholder="Enter image URL"
                            />
                            <button
                              onClick={() => {
                                if (allSiteImages.length > 0) {
                                  setImageSelectionPopup({
                                    isOpen: true,
                                    target: 'gridSmall1',
                                    title: 'Select Small Grid Image 1'
                                  });
                                } else {
                                  toast.error('No images available on site');
                                }
                              }}
                              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                              Select from site
                            </button>
                          </div>
                          {homepageSettings.gridImages.small1 && (
                            <div className="mt-2">
                              <img 
                                src={homepageSettings.gridImages.small1} 
                                alt="Grid 2 preview" 
                                className="h-20 object-cover rounded-lg border"
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Small Image 2 (Grid 3)
                          </label>
                          <div className="flex gap-4 items-center">
                            <input
                              type="text"
                              value={homepageSettings.gridImages.small2}
                              onChange={(e) => setHomepageSettings({
                                ...homepageSettings,
                                gridImages: {
                                  ...homepageSettings.gridImages,
                                  small2: e.target.value
                                }
                              })}
                              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                              placeholder="Enter image URL"
                            />
                            <button
                              onClick={() => {
                                if (allSiteImages.length > 0) {
                                  setImageSelectionPopup({
                                    isOpen: true,
                                    target: 'gridSmall2',
                                    title: 'Select Small Grid Image 2'
                                  });
                                } else {
                                  toast.error('No images available on site');
                                }
                              }}
                              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                              Select from site
                            </button>
                          </div>
                          {homepageSettings.gridImages.small2 && (
                            <div className="mt-2">
                              <img 
                                src={homepageSettings.gridImages.small2} 
                                alt="Grid 3 preview" 
                                className="h-20 object-cover rounded-lg border"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-b pb-6 mb-6">
                      <h4 className="text-md font-medium mb-4">Grid Section Text</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Grid 1 Title
                          </label>
                          <input
                            type="text"
                            value={homepageSettings.textContent.luxuryDubaiLiving}
                            onChange={(e) => setHomepageSettings({
                              ...homepageSettings,
                              textContent: {
                                ...homepageSettings.textContent,
                                luxuryDubaiLiving: e.target.value
                              }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Grid 2 Title
                          </label>
                          <input
                            type="text"
                            value={homepageSettings.textContent.dubaiMarina}
                            onChange={(e) => setHomepageSettings({
                              ...homepageSettings,
                              textContent: {
                                ...homepageSettings.textContent,
                                dubaiMarina: e.target.value
                              }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Grid 3 Title
                          </label>
                          <input
                            type="text"
                            value={homepageSettings.textContent.downtownViews}
                            onChange={(e) => setHomepageSettings({
                              ...homepageSettings,
                              textContent: {
                                ...homepageSettings.textContent,
                                downtownViews: e.target.value
                              }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Grid 4 Title
                          </label>
                          <input
                            type="text"
                            value={homepageSettings.textContent.cryptoPayments}
                            onChange={(e) => setHomepageSettings({
                              ...homepageSettings,
                              textContent: {
                                ...homepageSettings.textContent,
                                cryptoPayments: e.target.value
                              }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Grid 4 Description
                          </label>
                          <input
                            type="text"
                            value={homepageSettings.textContent.purchaseYourDream}
                            onChange={(e) => setHomepageSettings({
                              ...homepageSettings,
                              textContent: {
                                ...homepageSettings.textContent,
                                purchaseYourDream: e.target.value
                              }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Grid 5 Title
                          </label>
                          <input
                            type="text"
                            value={homepageSettings.textContent.primeLocations}
                            onChange={(e) => setHomepageSettings({
                              ...homepageSettings,
                              textContent: {
                                ...homepageSettings.textContent,
                                primeLocations: e.target.value
                              }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Grid 5 Description
                          </label>
                          <input
                            type="text"
                            value={homepageSettings.textContent.exclusiveProperties}
                            onChange={(e) => setHomepageSettings({
                              ...homepageSettings,
                              textContent: {
                                ...homepageSettings.textContent,
                                exclusiveProperties: e.target.value
                              }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Featured Properties Section Title
                          </label>
                          <input
                            type="text"
                            value={homepageSettings.textContent.featuredProperties}
                            onChange={(e) => setHomepageSettings({
                              ...homepageSettings,
                              textContent: {
                                ...homepageSettings.textContent,
                                featuredProperties: e.target.value
                              }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={() => setShowHomepagePreview(true)}
                        className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        Preview Homepage
                      </button>
                  <button
                    className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-900/20"
                    onClick={() => {
                      // Actually save the homepage settings to localStorage or a state management system
                      localStorage.setItem('homepageSettings', JSON.stringify(homepageSettings));
                      toast.success('Homepage settings saved successfully');
                    }}
                  >
                    Save Homepage Settings
                  </button>
                    </div>
                  </div>
                )}

                {editingMode === 'newsletter' && (
                  <div className="space-y-8">
                    <h3 className="text-lg font-semibold mb-4">Newsletter Management</h3>
                    <NewsletterManager />
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
                                ? 'bg-gray-900 dark:bg-gray-700 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
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
                                  ? 'border-gray-900 dark:border-gray-600 bg-gray-900 dark:bg-gray-700 text-white'
                                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 dark:bg-gray-700 dark:text-gray-300'
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
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                <p className="text-gray-600 dark:text-gray-300">Select a property to edit or create a new one</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Preview Modals */}
      {showPreview && currentProperty && (
        <PropertyPreview
          property={currentProperty}
          onClose={() => setShowPreview(false)}
        />
      )}
      
      {/* Homepage Preview */}
      {showHomepagePreview && (
        <HomePreview
          settings={homepageSettings}
          onClose={() => setShowHomepagePreview(false)}
        />
      )}
      
      {/* Image Selection Popup */}
      <ImageSelectionPopup
        isOpen={imageSelectionPopup.isOpen}
        onClose={() => setImageSelectionPopup({ isOpen: false, target: null, title: '' })}
        images={allSiteImages}
        title={imageSelectionPopup.title}
        onSelectImage={(imageUrl) => {
          if (imageSelectionPopup.target === 'heroImage') {
            setHomepageSettings({
              ...homepageSettings,
              heroImage: imageUrl
            });
          } else if (imageSelectionPopup.target === 'gridLarge') {
            setHomepageSettings({
              ...homepageSettings,
              gridImages: {
                ...homepageSettings.gridImages,
                large: imageUrl
              }
            });
          } else if (imageSelectionPopup.target === 'gridSmall1') {
            setHomepageSettings({
              ...homepageSettings,
              gridImages: {
                ...homepageSettings.gridImages,
                small1: imageUrl
              }
            });
          } else if (imageSelectionPopup.target === 'gridSmall2') {
            setHomepageSettings({
              ...homepageSettings,
              gridImages: {
                ...homepageSettings.gridImages,
                small2: imageUrl
              }
            });
          }
          toast.success('Image selected successfully');
        }}
      />
    </div>
  );
}
