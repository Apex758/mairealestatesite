import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Heart, 
  MessageCircle, 
  CreditCard, 
  MapPin, 
  User,
  LogOut
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

interface RecentActivity {
  id: string;
  type: 'message' | 'property_view' | 'favorite';
  details: string;
  timestamp: Date;
}

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { language } = useGlobal();
  const { favorites, messages, getUnreadMessageCount, removeFromFavorites, markMessageAsRead } = useUserStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'account'>('overview');
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
    recentActivities: 'Recent Activities',
    noActivities: 'No recent activities',
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
          recentActivities: await translateText('Recent Activities', language),
          noActivities: await translateText('No recent activities', language),
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

  // Generate recent activities based on favorites and messages
  const generateRecentActivities = (): RecentActivity[] => {
    const activities: RecentActivity[] = [];
    
    // Add recent messages as activities
    messages.slice(0, 3).forEach(msg => {
      if (msg.sender !== 'You') {
        activities.push({
          id: `msg-${msg.id}`,
          type: 'message',
          details: `New message: ${msg.content.substring(0, 40)}${msg.content.length > 40 ? '...' : ''}`,
          timestamp: msg.timestamp
        });
      }
    });
    
    // Add favorite properties as activities
    favorites.slice(0, 2).forEach(fav => {
      activities.push({
        id: `fav-${fav.id}`,
        type: 'favorite',
        details: `You added ${fav.name} to your favorites`,
        timestamp: new Date(Date.now() - Math.random() * 86400000) // Random time in the last 24 hours
      });
    });
    
    // Add property views
    userProperties.forEach(prop => {
      activities.push({
        id: `view-${prop.id}`,
        type: 'property_view',
        details: `You viewed ${prop.name}`,
        timestamp: new Date(Date.now() - Math.random() * 172800000) // Random time in the last 48 hours
      });
    });
    
    // Sort by timestamp (newest first)
    return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 5);
  };

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  
  // Update recent activities when favorites or messages change
  useEffect(() => {
    setRecentActivities(generateRecentActivities());
  }, [favorites, messages]);
  
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
  
  // Add a new activity when the component mounts
  useEffect(() => {
    const newActivity: RecentActivity = {
      id: `activity-${Date.now()}`,
      type: 'favorite',
      details: 'You added Palm Jumeirah Villa to your favorites',
      timestamp: new Date()
    };
    
    setRecentActivities(prev => [newActivity, ...prev]);
  }, []);

  // Overview tab content
  const renderOverviewTab = () => (
    <div className="grid md:grid-cols-3 gap-6">
      {/* User Welcome Card */}
      <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {translatedContent.welcomeBack}, {user?.name || 'User'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {translatedContent.manageYourFavorites}
            </p>
          </div>
        </div>
      </div>
      
      {/* Favorites */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {translatedContent.myFavorites}
          </h3>
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
              className="text-blue-600 hover:underline"
            >
              {translatedContent.viewAll}
            </Link>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              {translatedContent.noFavorites}
            </p>
            <Link 
              to="/listings" 
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {translatedContent.browseProperties}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.slice(0, 3).map((property) => (
              <div 
                key={property.id} 
                className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <img 
                  src={property.image} 
                  alt={property.name} 
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">
                    {property.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {property.address}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span>{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                    <span>{property.sqft} sqft</span>
                    <span className="font-semibold text-blue-600">
                      {new Intl.NumberFormat('en-AE', { 
                        style: 'currency', 
                        currency: property.currency 
                      }).format(property.price)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link 
                    to={`/property/${property.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => removeFromFavorites(property.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Messages Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Messages
          </h3>
          <Link 
            to="/messages" 
            className="text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No messages yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.slice(0, 3).map((message) => (
              <div 
                key={message.id} 
                className={`flex items-start gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg ${!message.read ? 'border-l-4 border-blue-500' : ''}`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {message.sender}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {message.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    {message.content.length > 60 
                      ? `${message.content.substring(0, 60)}...` 
                      : message.content}
                  </p>
                  <div className="flex gap-2">
                    <Link 
                      to="/messages" 
                      className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50"
                    >
                      Reply
                    </Link>
                    {!message.read && (
                      <button 
                        onClick={() => markMessageAsRead(message.id)}
                        className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Quick Actions
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link 
            to="/favorites" 
            className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 relative"
          >
            <Heart className="w-6 h-6 text-red-500 mb-2" />
            <span className="text-sm text-gray-900 dark:text-white">
              Favorites
            </span>
            {favorites.length > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link 
            to="/messages" 
            className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 relative"
          >
            <MessageCircle className="w-6 h-6 text-blue-500 mb-2" />
            <span className="text-sm text-gray-900 dark:text-white">
              Messages
            </span>
            {getUnreadMessageCount() > 0 && (
              <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {getUnreadMessageCount()}
              </span>
            )}
          </Link>
          <Link 
            to="/listings" 
            className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <MapPin className="w-6 h-6 text-green-500 mb-2" />
            <span className="text-sm text-gray-900 dark:text-white">
              Browse Properties
            </span>
          </Link>
          <Link 
            to="/contact" 
            className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <CreditCard className="w-6 h-6 text-purple-500 mb-2" />
            <span className="text-sm text-gray-900 dark:text-white">
              Contact Support
            </span>
          </Link>
        </div>
        
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">
          Recent Activities
        </h4>
        
        {recentActivities.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-600 dark:text-gray-400">
              No recent activities
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentActivities.slice(0, 3).map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
                  ${activity.type === 'message' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' : 
                    activity.type === 'favorite' ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400' : 
                    'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400'}`}
                >
                  {activity.type === 'message' ? <MessageCircle className="w-4 h-4" /> : 
                   activity.type === 'favorite' ? <Heart className="w-4 h-4" /> : 
                   <Home className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.details}
                  </p>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {activity.timestamp.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
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
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Home className="w-8 h-8 text-gray-600 dark:text-gray-300" />
            <h1 className="text-3xl font-light text-gray-900 dark:text-white">{translatedContent.dashboard}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'overview' 
                  ? 'bg-gray-900 text-white dark:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {translatedContent.overview}
            </button>
            <button 
              onClick={() => setActiveTab('account')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'account' 
                  ? 'bg-gray-900 text-white dark:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {translatedContent.accountSettings}
            </button>
          </div>
        </div>

        {activeTab === 'overview' ? renderOverviewTab() : renderAccountTab()}
      </div>
    </div>
  );
}

export default Dashboard;
