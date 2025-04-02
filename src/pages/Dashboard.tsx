import React, { useState } from 'react';
import { 
  Home, 
  Heart, 
  MessageCircle, 
  CreditCard, 
  MapPin, 
  Bed, 
  Bath, 
  Ruler 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserProperty {
  id: string;
  name: string;
  image: string;
  status: 'viewed' | 'interested' | 'negotiating';
}

interface RecentActivity {
  type: 'message' | 'property_view' | 'favorite';
  details: string;
  timestamp: Date;
}

export function Dashboard() {
  const [userProperties, setUserProperties] = useState<UserProperty[]>([
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

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      type: 'property_view',
      details: 'You viewed Luxury Dubai Marina Apartment',
      timestamp: new Date()
    },
    {
      type: 'message',
      details: 'New message from MAI Real Estate Support',
      timestamp: new Date()
    }
  ]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Home className="w-8 h-8 text-gray-600 dark:text-gray-300" />
          <h1 className="text-3xl font-light text-gray-900 dark:text-white">User Dashboard</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Property Insights */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                My Properties
              </h3>
              <Link 
                to="/listings" 
                className="text-blue-600 hover:underline"
              >
                Browse More
              </Link>
            </div>

            {userProperties.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  No properties viewed yet
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {userProperties.map((property) => (
                  <div 
                    key={property.id} 
                    className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <img 
                      src={property.image} 
                      alt={property.name} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">
                        {property.name}
                      </h4>
                      <span 
                        className={`text-sm ${
                          property.status === 'viewed' ? 'text-blue-600' :
                          property.status === 'interested' ? 'text-green-600' :
                          'text-orange-600'
                        }`}
                      >
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </div>
                    <Link 
                      to={`/property/${property.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activities
              </h3>
            </div>

            {recentActivities.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  No recent activities
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white">
                        {activity.details}
                      </p>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.timestamp.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                to="/favorites" 
                className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <Heart className="w-6 h-6 text-red-500 mb-2" />
                <span className="text-sm text-gray-900 dark:text-white">
                  Favorites
                </span>
              </Link>
              <Link 
                to="/messages" 
                className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <MessageCircle className="w-6 h-6 text-blue-500 mb-2" />
                <span className="text-sm text-gray-900 dark:text-white">
                  Messages
                </span>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
