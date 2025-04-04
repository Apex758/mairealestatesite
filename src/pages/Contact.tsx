import React, { useState, useEffect, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useGlobal } from '../contexts/GlobalContext';
import { translateText } from '../utils/translateUtils';
import { StaticMap } from '../components/StaticMap';

// Default map location (Dubai)
const DEFAULT_MAP_LOCATION = {
  lat: 25.2048,
  lng: 55.2708
};

export function Contact() {
  // Get contact map location from localStorage or use default
  const [mapLocation] = useState(() => {
    const savedLocation = localStorage.getItem('contactMapLocation');
    return savedLocation ? JSON.parse(savedLocation) : DEFAULT_MAP_LOCATION;
  });
  const { language } = useGlobal();
  const [isVisible, setIsVisible] = useState(false);
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // WhatsApp number
  const whatsappNumber = '+971522292717';
  
  const [translatedContent, setTranslatedContent] = useState({
    contactUs: 'Contact Us',
    contactDescription: 'Get in touch with our team of luxury real estate experts',
    sendMessage: 'Send us a message',
    contactInformation: 'Contact Information',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    officeHours: 'Office Hours',
    mondayFriday: 'Monday - Friday: 9:00 AM - 6:00 PM',
    saturday: 'Saturday: 10:00 AM - 4:00 PM',
    sunday: 'Sunday: Closed',
    name: 'Name',
    emailLabel: 'Email',
    message: 'Message',
    sendMessageButton: 'Send Message',
    contactViaWhatsApp: 'Contact via WhatsApp',
    messageSent: 'Message sent successfully!',
    errorSending: 'Error sending message. Please try again.'
  });

  // Animation effect for luxury elements
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const translateContent = async () => {
      if (language === 'en') return;

      try {
        const translated = {
          contactUs: await translateText('Contact Us', language),
          contactDescription: await translateText('Get in touch with our team of luxury real estate experts', language),
          sendMessage: await translateText('Send us a message', language),
          contactInformation: await translateText('Contact Information', language),
          address: await translateText('Address', language),
          phone: await translateText('Phone', language),
          email: await translateText('Email', language),
          officeHours: await translateText('Office Hours', language),
          mondayFriday: await translateText('Monday - Friday: 9:00 AM - 6:00 PM', language),
          saturday: await translateText('Saturday: 10:00 AM - 4:00 PM', language),
          sunday: await translateText('Sunday: Closed', language),
          name: await translateText('Name', language),
          emailLabel: await translateText('Email', language),
          message: await translateText('Message', language),
          sendMessageButton: await translateText('Send Message', language),
          contactViaWhatsApp: await translateText('Contact via WhatsApp', language),
          messageSent: await translateText('Message sent successfully!', language),
          errorSending: await translateText('Error sending message. Please try again.', language)
        };
        setTranslatedContent(translated);
      } catch (error) {
        console.error('Error translating content:', error);
      }
    };

    translateContent();
  }, [language]);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      setSubmitError('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // In a real implementation, this would be an API call to your backend
      // For now, we'll simulate a successful submission
      console.log('Sending email to: contact@mairealestate.ae');
      console.log('From:', name, email);
      console.log('Message:', message);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError(translatedContent.errorSending);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Generate WhatsApp link with pre-filled message
  const getWhatsAppLink = () => {
    const text = `Hello MAI Real Estate, I'm interested in learning more about your properties.`;
    return `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(text)}`;
  };
  
  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section with luxury background */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
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
              <span className="mx-4 text-amber-400 tracking-[0.3em] uppercase text-sm font-light">Exclusive</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            
            <h1 className="text-5xl font-extralight text-white mb-4 tracking-wider">
              {translatedContent.contactUs}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {translatedContent.contactDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 py-24 relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-8 flex items-center">
                  <span className="bg-gradient-to-br from-amber-400 to-amber-600 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <Send className="w-5 h-5 text-white" />
                  </span>
                  {translatedContent.sendMessage}
                </h2>
                
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {submitSuccess && (
                    <div className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-4 rounded-lg mb-4">
                      {translatedContent.messageSent}
                    </div>
                  )}
                  
                  {submitError && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg mb-4">
                      {submitError}
                    </div>
                  )}
                
                  <div className="group">
                    <label className="block text-sm font-medium text-amber-500 mb-2 tracking-wider">
                      {translatedContent.name}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-amber-500 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-amber-500 mb-2 tracking-wider">
                      {translatedContent.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-amber-500 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-amber-500 mb-2 tracking-wider">
                      {translatedContent.message}
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-amber-500 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500"
                      placeholder="How can we assist you?"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-colors tracking-wider font-medium shadow-lg shadow-amber-900/20 disabled:opacity-70"
                    >
                      {isSubmitting ? 'Sending...' : translatedContent.sendMessageButton}
                    </button>
                    
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-full hover:from-green-600 hover:to-green-700 transition-colors tracking-wider font-medium shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      {translatedContent.contactViaWhatsApp}
                    </a>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-gray-900 p-10 rounded-xl shadow-xl text-white h-full">
                <h2 className="text-2xl font-light mb-10 flex items-center">
                  <span className="bg-gradient-to-br from-amber-400 to-amber-600 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-5 h-5 text-white" />
                  </span>
                  {translatedContent.contactInformation}
                </h2>
                
                <div className="space-y-10">
                  <div className="flex items-start gap-6">
                    <div className="bg-gray-800 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-300 mb-2">{translatedContent.address}</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Dubai Investment Park<br />
                        Dubai, United Arab Emirates
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="bg-gray-800 p-3 rounded-full">
                      <Phone className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-300 mb-2">{translatedContent.phone}</h3>
                      <p className="text-gray-400">
                        <a href="tel:+971522292717" className="hover:text-amber-400 transition-colors">
                          +971 52 229 2717
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="bg-gray-800 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-300 mb-2">{translatedContent.email}</h3>
                      <p className="text-gray-400">
                        <a href="mailto:contact@mairealestate.ae" className="hover:text-amber-400 transition-colors">
                          contact@mairealestate.ae
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="bg-gray-800 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-300 mb-2">{translatedContent.officeHours}</h3>
                      <p className="text-gray-400">Monday to Saturday: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-800">
                  <p className="text-gray-400 text-sm italic">
                    "Our commitment to excellence ensures that your real estate journey is handled with the utmost care and professionalism."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="relative">
        <StaticMap 
          center={mapLocation}
          height="400px"
          markerColor="amber"
        />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
      </div>
    </div>
  );
}

export default Contact;
