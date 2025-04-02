import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useGlobal } from '../contexts/GlobalContext';
import { translateText } from '../utils/translateUtils';

export function Contact() {
  const { language } = useGlobal();
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
    sendMessageButton: 'Send Message'
  });

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
          sendMessageButton: await translateText('Send Message', language)
        };
        setTranslatedContent(translated);
      } catch (error) {
        console.error('Error translating content:', error);
      }
    };

    translateContent();
  }, [language]);

  return (
    <div className="pt-16">
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{translatedContent.contactUs}</h1>
          <p className="text-gray-400">{translatedContent.contactDescription}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-semibold mb-6">{translatedContent.sendMessage}</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translatedContent.name}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translatedContent.emailLabel}
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translatedContent.message}
                </label>
                <textarea
                  rows={4}

                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {translatedContent.sendMessageButton}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">{translatedContent.contactInformation}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-medium">{translatedContent.address}</h3>
                  <p className="text-gray-600">123 Luxury Real Estate Blvd<br />Beverly Hills, CA 90210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-medium">{translatedContent.phone}</h3>
                  <p className="text-gray-600">+1 (310) 555-0123</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-medium">{translatedContent.email}</h3>
                  <p className="text-gray-600">contact@realestate.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-6">{translatedContent.officeHours}</h2>
              <div className="space-y-2 text-gray-600">
                <p>{translatedContent.mondayFriday}</p>
                <p>{translatedContent.saturday}</p>
                <p>{translatedContent.sunday}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Contact;
