import React from 'react';
import { Lock, Briefcase, DollarSign } from 'lucide-react';

export function VipAccess() {
  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-gray-900 to-black text-white py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-light mb-8">VIP ACCESS – ULTRA-EXCLUSIVE REAL ESTATE FOR THE WORLD'S ELITE</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Welcome to a realm of <span className="font-medium">unparalleled prestige and exclusivity</span>, where only the world's most discerning investors gain access. Our <span className="font-medium">private portfolio</span> features <span className="font-medium">Dubai's most coveted ultra-luxury properties</span>, starting from $10 million and beyond—off-market, invitation-only, and reserved for true visionaries.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 py-24">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 text-center leading-relaxed">
            These are not just properties; they are <span className="font-medium">legacy investments</span>, curated for those who command the extraordinary. Access is strictly limited. To enter this world of elite real estate, <span className="font-medium">submit proof of funds (POF)</span> and unlock opportunities tailored for <span className="font-medium">billionaires, royalty, and global pioneers</span>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm">
              <Lock className="w-12 h-12 text-gold-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Exclusive Access</h3>
              <p className="text-gray-600 dark:text-gray-300">Properties not available on the open market, reserved for our most distinguished clients</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm">
              <Briefcase className="w-12 h-12 text-gold-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Private Portfolio</h3>
              <p className="text-gray-600 dark:text-gray-300">Curated collection of Dubai's most prestigious and valuable real estate assets</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm">
              <DollarSign className="w-12 h-12 text-gold-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Ultra-Luxury</h3>
              <p className="text-gray-600 dark:text-gray-300">Properties starting from $10 million, representing the pinnacle of luxury real estate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black text-white py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-8">For bespoke consultations, contact our private client advisory team</h2>
          <a 
            href="mailto:William@mairealestate.ae" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all"
          >
            William@mairealestate.ae
          </a>
          
          <div className="mt-16 p-8 border border-gray-800 rounded-xl">
            <h3 className="text-xl font-medium mb-4">Qualification Process</h3>
            <p className="text-gray-400 mb-6">
              To maintain the exclusivity of our VIP portfolio, all potential clients must complete a qualification process including proof of funds verification.
            </p>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Investment Capacity
                </label>
                <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white">
                  <option>$10M - $25M</option>
                  <option>$25M - $50M</option>
                  <option>$50M - $100M</option>
                  <option>$100M+</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Request VIP Access
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
