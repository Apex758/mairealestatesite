import React from 'react';

export function Policy() {
  return (
    <div className="pt-16">
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy & Terms</h1>
          <p className="text-gray-400">Last updated: March 2025</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              At RealEstate, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information.
            </p>
            <h3 className="text-xl font-semibold mb-3">Information We Collect</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Contact information (name, email, phone number)</li>
              <li>Property preferences and search history</li>
              <li>Transaction information</li>
              <li>Website usage data</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
            <p className="text-gray-600 mb-4">
              By using our services, you agree to these terms. Please read them carefully.
            </p>
            <h3 className="text-xl font-semibold mb-3">User Responsibilities</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Provide accurate information</li>
              <li>Maintain account security</li>
              <li>Comply with all applicable laws</li>
              <li>Respect other users' privacy</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
            <p className="text-gray-600 mb-4">
              We use cookies to enhance your browsing experience and provide personalized services.
            </p>
            <h3 className="text-xl font-semibold mb-3">Types of Cookies We Use</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Essential cookies for website functionality</li>
              <li>Analytics cookies to improve our services</li>
              <li>Preference cookies to remember your settings</li>
              <li>Marketing cookies for targeted advertising</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about our policies, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Email: privacy@realestate.com</p>
              <p className="text-gray-600">Phone: +1 (310) 555-0123</p>
              <p className="text-gray-600">Address: 123 Luxury Real Estate Blvd, Beverly Hills, CA 90210</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}