import React, { useState, useEffect } from 'react';
import { Shield, Lock, FileText, Mail } from 'lucide-react';

export function Policy() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation effect for luxury elements
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section with luxury background */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Office"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
        
        {/* Gold decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="mx-4 text-amber-400 tracking-[0.3em] uppercase text-sm font-light">Legal</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            
            <h1 className="text-4xl font-extralight text-white mb-4 tracking-wider">
              Privacy Policy & Terms
            </h1>
            <p className="text-gray-300">
              Last updated: March 2025
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 py-24 relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg dark:prose-invert">
            {/* Privacy Policy Section */}
            <section className={`mb-16 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-light text-gray-900 dark:text-white m-0">
                  Privacy <span className="text-amber-500 dark:text-amber-400 font-medium">Policy</span>
                </h2>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  At MAI Real Estate, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information.
                </p>
                
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
                    <span className="text-amber-600 dark:text-amber-400 text-sm">1</span>
                  </span>
                  Information We Collect
                </h3>
                
                <ul className="list-none pl-0 text-gray-700 dark:text-gray-300 mb-6 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Contact information (name, email, phone number)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Property preferences and search history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Transaction information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Website usage data</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Terms of Service Section */}
            <section className={`mb-16 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-light text-gray-900 dark:text-white m-0">
                  Terms of <span className="text-amber-500 dark:text-amber-400 font-medium">Service</span>
                </h2>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  By using our services, you agree to these terms. Please read them carefully.
                </p>
                
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
                    <span className="text-amber-600 dark:text-amber-400 text-sm">2</span>
                  </span>
                  User Responsibilities
                </h3>
                
                <ul className="list-none pl-0 text-gray-700 dark:text-gray-300 mb-6 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Provide accurate information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Maintain account security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Comply with all applicable laws</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Respect other users' privacy</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Cookie Policy Section */}
            <section className={`mb-16 transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-light text-gray-900 dark:text-white m-0">
                  Cookie <span className="text-amber-500 dark:text-amber-400 font-medium">Policy</span>
                </h2>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  We use cookies to enhance your browsing experience and provide personalized services.
                </p>
                
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
                    <span className="text-amber-600 dark:text-amber-400 text-sm">3</span>
                  </span>
                  Types of Cookies We Use
                </h3>
                
                <ul className="list-none pl-0 text-gray-700 dark:text-gray-300 mb-6 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Essential cookies for website functionality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Analytics cookies to improve our services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Preference cookies to remember your settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Marketing cookies for targeted advertising</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Contact Us Section */}
            <section className={`transition-all duration-1000 delay-900 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-light text-gray-900 dark:text-white m-0">
                  Contact <span className="text-amber-500 dark:text-amber-400 font-medium">Us</span>
                </h2>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  If you have any questions about our policies, please contact us at:
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">Email: privacy@mairealestate.ae</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">Phone: +971 52 229 2717</p>
                  <p className="text-gray-700 dark:text-gray-300">Address: Dubai Investment Park, Dubai, United Arab Emirates</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      {/* Footer Decoration */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
    </div>
  );
}
