import React from 'react';
import { Users, TrendingUp, Clock, MapPin, Globe, Zap, HardDrive } from 'lucide-react';

// Simulated data - in a real app, this would come from your analytics service
const trafficData = {
  totalVisits: 15234,
  uniqueVisitors: 8456,
  averageTime: '2:45',
  bounceRate: '35.8%',
  topCountries: [
    { name: 'United Arab Emirates', visits: 5678 },
    { name: 'Saudi Arabia', visits: 2345 },
    { name: 'United Kingdom', visits: 1234 },
    { name: 'China', visits: 987 },
    { name: 'India', visits: 876 }
  ]
};

const userData = {
  totalUsers: 1234,
  activeUsers: 876,
  premiumUsers: 234,
  recentSignups: [
    { name: 'John Doe', email: 'john@example.com', date: '2025-03-15' },
    { name: 'Jane Smith', email: 'jane@example.com', date: '2025-03-14' },
    { name: 'Bob Wilson', email: 'bob@example.com', date: '2025-03-14' }
  ]
};

export function Statistics() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-light mb-8">Site Statistics</h1>

        {/* Traffic Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-medium">Traffic Analytics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Total Visits</div>
              <div className="text-2xl font-semibold">{trafficData.totalVisits.toLocaleString()}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Unique Visitors</div>
              <div className="text-2xl font-semibold">{trafficData.uniqueVisitors.toLocaleString()}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Average Time</div>
              <div className="text-2xl font-semibold">{trafficData.averageTime}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Bounce Rate</div>
              <div className="text-2xl font-semibold">{trafficData.bounceRate}</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Top Countries</h3>
            <div className="space-y-4">
              {trafficData.topCountries.map((country) => (
                <div key={country.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{country.name}</span>
                  </div>
                  <span className="font-medium">{country.visits.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-medium">User Statistics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Total Users</div>
              <div className="text-2xl font-semibold">{userData.totalUsers.toLocaleString()}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Active Users</div>
              <div className="text-2xl font-semibold">{userData.activeUsers.toLocaleString()}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Premium Users</div>
              <div className="text-2xl font-semibold">{userData.premiumUsers.toLocaleString()}</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Recent Sign-ups</h3>
            <div className="space-y-4">
              {userData.recentSignups.map((user) => (
                <div key={user.email} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                  <div className="text-sm text-gray-500">{user.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Site Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-medium">Site Performance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Speed Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>First Contentful Paint</span>
                  </div>
                  <span className="font-medium">0.8s</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span>Time to Interactive</span>
                  </div>
                  <span className="font-medium">1.2s</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gray-400" />
                    <span>Performance Score</span>
                  </div>
                  <span className="font-medium">95/100</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Resource Usage</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-gray-400" />
                    <span>Total Size</span>
                  </div>
                  <span className="font-medium">2.3 MB</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-gray-400" />
                    <span>Image Assets</span>
                  </div>
                  <span className="font-medium">1.5 MB</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-gray-400" />
                    <span>JavaScript Bundle</span>
                  </div>
                  <span className="font-medium">450 KB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}