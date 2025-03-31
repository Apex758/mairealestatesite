import React from 'react';
import { Bitcoin as BitcoinIcon, Shield, Globe2, ArrowRight, Lock, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Bitcoin() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-orange-900 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 text-orange-400 mb-6">
            <BitcoinIcon className="w-8 h-8" />
            <span className="text-xl font-light tracking-wide">CRYPTO REAL ESTATE</span>
          </div>
          <h1 className="text-6xl font-light mb-8">Buy Property with Crypto in Dubai</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            While Dubai processes real estate transactions in AED through authorized escrow accounts,
            we guide you through converting your crypto assets for property acquisition.
          </p>
        </div>
      </div>

      {/* Process Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="group">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110">
              <Globe2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-light mb-4">Global Transactions</h3>
            <p className="text-gray-600 leading-relaxed">
              Secure property transactions through regulated escrow services in Dubai, ensuring complete transparency and security.
            </p>
          </div>
          
          <div className="group">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-light mb-4">Legal Compliance</h3>
            <p className="text-gray-600 leading-relaxed">
              All transactions strictly follow UAE real estate regulations and compliance requirements.
            </p>
          </div>
          
          <div className="group">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-light mb-4">Asset Conversion</h3>
            <p className="text-gray-600 leading-relaxed">
              Professional guidance on converting your crypto assets for property purchase through authorized channels.
            </p>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="bg-gray-50 py-32">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-light mb-16 text-center">Purchase Process</h2>
          <div className="space-y-16">
            <div className="flex items-start gap-8 group">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md">
                <span className="text-2xl font-light text-orange-500">01</span>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4">Property Selection</h3>
                <p className="text-gray-600 leading-relaxed">Browse our exclusive listings and select your desired property in Dubai's prime locations.</p>
              </div>
            </div>

            <div className="flex items-start gap-8 group">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md">
                <span className="text-2xl font-light text-orange-500">02</span>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4">Asset Planning</h3>
                <p className="text-gray-600 leading-relaxed">Our specialists will guide you through the crypto-to-fiat conversion strategy for your property purchase.</p>
              </div>
            </div>

            <div className="flex items-start gap-8 group">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md">
                <span className="text-2xl font-light text-orange-500">03</span>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4">Escrow Setup</h3>
                <p className="text-gray-600 leading-relaxed">Transaction processing through authorized Dubai escrow services, ensuring security and compliance.</p>
              </div>
            </div>

            <div className="flex items-start gap-8 group">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md">
                <span className="text-2xl font-light text-orange-500">04</span>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4">Property Transfer</h3>
                <p className="text-gray-600 leading-relaxed">Complete the property transfer through Dubai Land Department with our expert guidance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-light mb-8 text-white">Ready to Begin Your Journey?</h2>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all group"
          >
            Contact Our Specialists
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}