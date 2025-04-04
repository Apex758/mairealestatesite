import React, { useState, useEffect } from 'react';
import { Lock, Crown, Diamond, Award } from 'lucide-react';

export function VipAccess() {
  // Animation effect for luxury elements
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section with luxury background */}
      <div 
        className="bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center relative py-40"
      >
        <div className="absolute inset-0 bg-black/70"></div>
        
        {/* Gold decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="mx-4 text-amber-400 tracking-[0.3em] uppercase text-sm font-light">Exclusive</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            
            <h1 className="text-6xl font-extralight mb-8 text-white tracking-wider">
              VIP ACCESS
              <span className="block text-2xl mt-4 font-light text-amber-300">ULTRA-EXCLUSIVE REAL ESTATE FOR THE WORLD'S ELITE</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Welcome to a realm of <span className="text-amber-300 font-medium">unparalleled prestige and exclusivity</span>, where only the world's most discerning investors gain access. Our <span className="text-amber-300 font-medium">private portfolio</span> features <span className="text-amber-300 font-medium">Dubai's most coveted ultra-luxury properties</span>, starting from $10 million and beyond—off-market, invitation-only, and reserved for true visionaries.
            </p>
          </div>
        </div>
      </div>

      {/* Luxury statement section */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-24 relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-2xl text-white mb-16 text-center leading-relaxed font-light italic">
            These are not just properties; they are <span className="text-amber-300 not-italic font-normal">legacy investments</span>, curated for those who command the extraordinary. Access is strictly limited. To enter this world of elite real estate, <span className="text-amber-300 not-italic font-normal">submit proof of funds (POF)</span> and unlock opportunities tailored for <span className="text-amber-300 not-italic font-normal">billionaires, royalty, and global pioneers</span>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-xl shadow-xl border border-gray-700 hover:border-amber-500/30 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-white">Exclusive Access</h3>
              <p className="text-gray-400">Properties not available on the open market, reserved for our most distinguished clients</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-xl shadow-xl border border-gray-700 hover:border-amber-500/30 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Diamond className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-white">Private Portfolio</h3>
              <p className="text-gray-400">Curated collection of Dubai's most prestigious and valuable real estate assets</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-xl shadow-xl border border-gray-700 hover:border-amber-500/30 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-white">Ultra-Luxury</h3>
              <p className="text-gray-400">Properties starting from $10 million, representing the pinnacle of luxury real estate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial/Prestige section */}
      <div className="bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center relative py-32">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Award className="w-16 h-16 text-amber-400 mx-auto mb-8" />
          <blockquote className="text-2xl font-light italic text-white mb-8">
            "MAI Real Estate's VIP Access program has connected us with extraordinary properties that never appear on the open market. Their discretion and expertise are unmatched in Dubai's luxury real estate sector."
          </blockquote>
          <p className="text-amber-300 font-medium">— International Family Office Client</p>
        </div>
      </div>

      {/* Contact section with premium form */}
      <div className="bg-gradient-to-br from-gray-900 to-black text-white py-32 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-2">For bespoke consultations</h2>
          <p className="text-xl text-amber-300 mb-12">Contact our private client advisory team</p>
          
          <a 
            href="mailto:William@mairealestate.ae" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-10 py-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all group shadow-lg shadow-amber-900/20"
          >
            <span className="tracking-wider">William@mairealestate.ae</span>
          </a>
          
          <div className="mt-24 p-10 border border-gray-800 rounded-xl bg-gradient-to-br from-gray-900 to-black shadow-2xl">
            <h3 className="text-2xl font-light mb-2">Qualification Process</h3>
            <p className="text-amber-300 text-sm uppercase tracking-widest mb-2">Strictly Confidential</p>
            <p className="text-gray-400 mb-10">
              To maintain the exclusivity of our VIP portfolio, all potential clients must complete a qualification process including proof of funds verification.
            </p>
            
            <form className="space-y-8">
              <div className="group">
                <label className="block text-sm font-medium text-amber-300 mb-2 tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-transparent border-b border-gray-700 focus:border-amber-500 outline-none transition-colors text-white placeholder-gray-600"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium text-amber-300 mb-2 tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-transparent border-b border-gray-700 focus:border-amber-500 outline-none transition-colors text-white placeholder-gray-600"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium text-amber-300 mb-2 tracking-wider">
                  Investment Capacity
                </label>
                <select className="w-full px-4 py-3 bg-transparent border-b border-gray-700 focus:border-amber-500 outline-none transition-colors text-white appearance-none">
                  <option className="bg-gray-900">$10M - $25M</option>
                  <option className="bg-gray-900">$25M - $50M</option>
                  <option className="bg-gray-900">$50M - $100M</option>
                  <option className="bg-gray-900">$100M+</option>
                </select>
              </div>
              
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-colors tracking-wider font-medium shadow-lg shadow-amber-900/20"
                >
                  Request VIP Access
                </button>
                <p className="text-xs text-gray-500 mt-4">
                  By submitting this form, you agree to our strict confidentiality policy. All information provided will be handled with the utmost discretion.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
