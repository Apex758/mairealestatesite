import React from 'react';
import { Cloud, Key, RefreshCw, Mail } from 'lucide-react';

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
  email: string; // Added email field for Gmail integration
  apiKeys: {
    googleMaps: string;
    exchangeRate: string;
    cryptoExchange: string;
    analytics: string;
  };
}

interface HostingSettingsProps {
  config: HostingConfig;
  onUpdate: (config: Partial<HostingConfig>) => void;
  onDeploy: () => void;
}

export function HostingSettings({ config, onUpdate, onDeploy }: HostingSettingsProps) {
  const handleUpdateSite = () => {
    // Update site without full deployment
    onUpdate({
      lastDeployed: new Date(),
      status: 'deployed'
    });
  };

  return (
    <div className="space-y-8">
      {/* Deployment Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Cloud className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Deployment Settings</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Provider
            </label>
            <select
              value={config.provider}
              onChange={(e) => onUpdate({ provider: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            >
              <option value="vercel">Vercel</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project ID
            </label>
            <input
              type="text"
              value={config.projectId}
              onChange={(e) => onUpdate({ projectId: e.target.value })}
              placeholder="your-project-id"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Found in your Vercel project settings
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Team ID
            </label>
            <input
              type="text"
              value={config.teamId}
              onChange={(e) => onUpdate({ teamId: e.target.value })}
              placeholder="team_xxxxxx"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Found in your Vercel team settings (optional)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Vercel Token
            </label>
            <input
              type="password"
              value={config.token}
              onChange={(e) => onUpdate({ token: e.target.value })}
              placeholder="vercel_pat_xxxxxx"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Create a personal access token in Vercel settings
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Build Command
            </label>
            <input
              type="text"
              value={config.buildCommand}
              onChange={(e) => onUpdate({ buildCommand: e.target.value })}
              placeholder="npm run build"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Output Directory
            </label>
            <input
              type="text"
              value={config.outputDir}
              onChange={(e) => onUpdate({ outputDir: e.target.value })}
              placeholder="dist"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Email Settings</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gmail Address
            </label>
            <input
              type="email"
              value={config.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              placeholder="your.email@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Used for sending and receiving emails directly from the manager
            </p>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Key className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">API Keys</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Google Maps API Key
            </label>
            <input
              type="password"
              value={config.apiKeys?.googleMaps || ''}
              onChange={(e) => onUpdate({ 
                apiKeys: { 
                  ...config.apiKeys,
                  googleMaps: e.target.value 
                }
              })}
              placeholder="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Used for maps integration and location services
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Exchange Rate API Key
            </label>
            <input
              type="password"
              value={config.apiKeys?.exchangeRate || ''}
              onChange={(e) => onUpdate({ 
                apiKeys: { 
                  ...config.apiKeys,
                  exchangeRate: e.target.value 
                }
              })}
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Used for fiat currency conversion functionality
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Crypto Exchange API Key
            </label>
            <input
              type="password"
              value={config.apiKeys?.cryptoExchange || ''}
              onChange={(e) => onUpdate({ 
                apiKeys: { 
                  ...config.apiKeys,
                  cryptoExchange: e.target.value 
                }
              })}
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Used for cryptocurrency conversion and tracking
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Analytics API Key
            </label>
            <input
              type="password"
              value={config.apiKeys?.analytics || ''}
              onChange={(e) => onUpdate({ 
                apiKeys: { 
                  ...config.apiKeys,
                  analytics: e.target.value 
                }
              })}
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Used for website analytics and tracking
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleUpdateSite}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600"
        >
          <RefreshCw className="w-5 h-5" />
          Update Site
        </button>

        <button
          onClick={onDeploy}
          disabled={config.status === 'building'}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50"
        >
          <Cloud className="w-5 h-5" />
          {config.status === 'building' ? 'Deploying...' : 'Deploy Site'}
        </button>
      </div>

      {config.deployedUrl && (
        <div className="pt-4 border-t dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Deployed URL
          </label>
          <a
            href={config.deployedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {config.deployedUrl}
          </a>
          {config.lastDeployed && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Last deployed: {config.lastDeployed.toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
