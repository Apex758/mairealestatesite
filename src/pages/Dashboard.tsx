import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Heart, 
  MessageCircle, 
  MapPin, 
  User,
  LogOut,
  Settings,
  Bell,
  Star,
  Eye,
  Trash2,
  Check,
  Zap,
  Phone
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserStore } from '../stores/userStore';
import { useGlobal } from '../contexts/GlobalContext';
import { translateText } from '../utils/translateUtils';
import { toast } from 'sonner';

interface UserProperty {
  id: string;
  name: string;
  image: string;
  status: 'viewed' | 'interested' | 'negotiating';
}

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { language } = useGlobal();
  const { favorites, messages, getUnreadMessageCount, removeFromFavorites, markMessageAsRead } = useUserStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'account'>('overview');
  
  // Animation effect for luxury elements
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const [translatedContent, setTranslatedContent] = useState({
    dashboard: 'My Dashboard',
    overview: 'Overview',
    accountSettings: 'Account Settings',
    welcomeBack: 'Welcome back',
    manageYourFavorites: 'Manage your favorites, messages, and account settings',
    myFavorites: 'My Favorites',
    viewAll: 'View All',
    noFavorites: 'No favorite properties yet',
    browseProperties: 'Browse Properties',
    newestFirst: 'Newest First',
    priceHighToLow: 'Price: High to Low',
    priceLowToHigh: 'Price: Low to High',
    beds: 'beds',
    baths: 'baths',
    view: 'View',
    remove: 'Remove',
    recentMessages: 'Recent Messages',
    noMessages: 'No messages yet',
    reply: 'Reply',
    markAsRead: 'Mark as Read',
    quickActions: 'Quick Actions',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    notificationPreferences: 'Notification Preferences',
    emailNotifications: 'Email Notifications',
    emailNotificationsDesc: 'Receive updates about your account via email',
    appNotifications: 'App Notifications',
    appNotificationsDesc: 'Receive in-app notifications about your activity',
    marketingCommunications: 'Marketing Communications',
    marketingCommunicationsDesc: 'Receive marketing emails about new properties and offers',
    saveChanges: 'Save Changes',
    successfullyLoggedOut: 'Successfully logged out',
    accountSettingsSaved: 'Account settings saved successfully',
    logout: 'Logout'
  });

  // Translate content when language changes
  useEffect(() => {
    const translateContent = async () => {
      if (language === 'en') return;

      try {
        const translated = {
          dashboard: await translateText('My Dashboard', language),
          overview: await translateText('Overview', language),
          accountSettings: await translateText('Account Settings', language),
          welcomeBack: await translateText('Welcome back', language),
          manageYourFavorites: await translateText('Manage your favorites, messages, and account settings', language),
          myFavorites: await translateText('My Favorites', language),
          viewAll: await translateText('View All', language),
          noFavorites: await translateText('No favorite properties yet', language),
          browseProperties: await translateText('Browse Properties', language),
          newestFirst: await translateText('Newest First', language),
          priceHighToLow: await translateText('Price: High to Low', language),
          priceLowToHigh: await translateText('Price: Low to High', language),
          beds: await translateText('beds', language),
          baths: await translateText('baths', language),
          view: await translateText('View', language),
          remove: await translateText('Remove', language),
          recentMessages: await translateText('Recent Messages', language),
          noMessages: await translateText('No messages yet', language),
          reply: await translateText('Reply', language),
          markAsRead: await translateText('Mark as Read', language),
          quickActions: await translateText('Quick Actions', language),
          fullName: await translateText('Full Name', language),
          emailAddress: await translateText('Email Address', language),
          phoneNumber: await translateText('Phone Number', language),
          notificationPreferences: await translateText('Notification Preferences', language),
          emailNotifications: await translateText('Email Notifications', language),
          emailNotificationsDesc: await translateText('Receive updates about your account via email', language),
          appNotifications: await translateText('App Notifications', language),
          appNotificationsDesc: await translateText('Receive in-app notifications about your activity', language),
          marketingCommunications: await translateText('Marketing Communications', language),
          marketingCommunicationsDesc: await translateText('Receive marketing emails about new properties and offers', language),
          saveChanges: await translateText('Save Changes', language),
          successfullyLoggedOut: await translateText('Successfully logged out', language),
          accountSettingsSaved: await translateText('Account settings saved successfully', language),
          logout: await translateText('Logout', language)
        };
        setTranslatedContent(translated);
      } catch (error) {
        console.error('Error translating content:', error);
      }
    };

    translateContent();
  }, [language]);
  
  const [userProperties] = useState<UserProperty[]>([
    {
      id: 'prop1',
      name: 'Luxury Dubai Marina Apartment',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      status: 'viewed'
    },
    {
      id: 'prop2',
      name: 'Palm Jumeirah Villa',
      image: 'https://images.unsplash.com/photo-1580041065738-e4b7a6c10f38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      status: 'interested'
    }
  ]);
  
  // User account settings
  const [accountSettings, setAccountSettings] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    notifications: {
      email: true,
      app: true,
      marketing: false
    }
  });
  
  const handleLogout = () => {
    logout();
    toast.success(translatedContent.successfullyLoggedOut);
    navigate('/');
  };
  
  const handleSettingsChange = (field: string, value: string | number) => {
    setAccountSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleNotificationChange = (field: string) => {
    setAccountSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field as keyof typeof prev.notifications]
      }
    }));
  };
  
  const saveSettings = () => {
    // In a real app, this would make an API call to save the settings
    toast.success(translatedContent.accountSettingsSaved);
  };

  // Overview tab content
  const renderOverviewTab = () => (
    <div className="grid md:grid-cols-3 gap-6">
      {/* User Welcome Card */}
      <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-1 flex items-center justify-center shadow-lg">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-white" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl font-light text-gray-900 dark:text-white">
                {translatedContent.welcomeBack}, <span className="font-medium text-amber-500 dark:text-amber-400">{user?.name || 'User'}</span>
              </h2>
            </div>
            <div className="h-px w-32 bg-amber-500/30 mb-3"></div>
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              {translatedContent.manageYourFavorites}
            </p>
          </div>
        </div>
      </div>
      
      {/* Favorites */}
      <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <Heart className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {translatedContent.myFavorites}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {favorites.length > 0 && (
              <select 
                className="text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-2 py-1"
                defaultValue="newest"
              >
                <option value="newest">{translatedContent.newestFirst}</option>
                <option value="price-high">{translatedContent.priceHighToLow}</option>
                <option value="price-low">{translatedContent.priceLowToHigh}</option>
              </select>
            )}
            <Link 
              to="/favorites" 
              className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              {translatedContent.viewAll}
            </Link>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
            <Heart className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {translatedContent.noFavorites}
            </p>
            <Link 
              to="/listings" 
              className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-900/20"
            >
              {translatedContent.browseProperties}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.slice(0, 4).map((property) => (
              <div 
                key={property.id} 
                className="flex flex-col bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all group overflow-hidden"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <h4 className="text-md font-medium text-white truncate">
                      {property.name}
                    </h4>
                    <p className="text-xs text-gray-200 truncate">
                      {property.address}
                    </p>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{property.beds} {translatedContent.beds}</span>
                      <span>•</span>
                      <span>{property.baths} {translatedContent.baths}</span>
                      <span>•</span>
                      <span>{property.sqft} sqft</span>
                    </div>
                    <span className="font-semibold text-amber-600 dark:text-amber-400 text-sm">
                      {new Intl.NumberFormat('en-AE', { 
                        style: 'currency', 
                        currency: property.currency,
                        maximumFractionDigits: 0
                      }).format(property.price)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      to={`/property/${property.id}`}
                      className="flex-1 text-center text-xs px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full hover:bg-amber-200 dark:hover:bg-amber-900/50 flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      {translatedContent.view}
                    </Link>
                    <button
                      onClick={() => removeFromFavorites(property.id)}
                      className="flex-1 text-center text-xs px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      {translatedContent.remove}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-transparent"></div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {translatedContent.quickActions}
            </h3>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Link 
            to="/favorites" 
            className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all group relative"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Favorites
            </span>
            {favorites.length > 0 && (
              <span className="absolute top-3 right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link 
            to="/messages" 
            className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all group relative"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              Messages
            </span>
            {getUnreadMessageCount() > 0 && (
              <span className="absolute top-3 right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {getUnreadMessageCount()}
              </span>
            )}
          </Link>
          <Link 
            to="/listings" 
            className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Browse Properties
            </span>
          </Link>
          <Link 
            to="/contact" 
            className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Contact Support
            </span>
          </Link>
        </div>
      </div>
    </div>
  );

  // Account settings tab content
  const renderAccountTab = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Account Settings
      </h3>
      
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={accountSettings.name}
              onChange={(e) => handleSettingsChange('name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={accountSettings.email}
              onChange={(e) => handleSettingsChange('email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={accountSettings.phone}
            onChange={(e) => handleSettingsChange('phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            placeholder="+1 (123) 456-7890"
          />
        </div>
        
        <div className="border-t dark:border-gray-700 pt-6">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Notification Preferences
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 dark:text-white font-medium">Email Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates about your account via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={accountSettings.notifications.email}
                  onChange={() => handleNotificationChange('email')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 dark:text-white font-medium">App Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive in-app notifications about your activity</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={accountSettings.notifications.app}
                  onChange={() => handleNotificationChange('app')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 dark:text-white font-medium">Marketing Communications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive marketing emails about new properties and offers</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={accountSettings.notifications.marketing}
                  onChange={() => handleNotificationChange('marketing')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-6 border-t dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          
          <button
            onClick={saveSettings}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Hero Section with Background Image */}
      <div className="relative text-white">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Dubai Skyline" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60"></div>
        </div>
        
        {/* Gold decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 z-10"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <div className="inline-flex items-center mb-2">
                    <div className="h-px w-8 bg-amber-400 mr-3"></div>
                    <span className="text-amber-400 tracking-[0.2em] uppercase text-xs font-light">Premium</span>
                  </div>
                  <h1 className="text-4xl font-light tracking-wider">{translatedContent.dashboard}</h1>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-white text-gray-900' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {translatedContent.overview}
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'account' 
                      ? 'bg-white text-gray-900' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {translatedContent.accountSettings}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'overview' ? renderOverviewTab() : renderAccountTab()}
      </div>
    </div>
  );
}
