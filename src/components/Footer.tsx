import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslate } from '../hooks/useTranslate';

export function Footer() {
  const { t } = useTranslate();
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-white py-12"> {/* Added dark mode classes */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">RealEstate</h3> {/* Adjusted heading color */}
            <p className="text-gray-500 dark:text-gray-400">{t('findingYouPerfect')}</p> {/* Adjusted text color */}
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('quickLinks')}</h4> {/* Adjusted heading color */}
            <ul className="space-y-2 text-gray-500 dark:text-gray-400"> {/* Adjusted text color */}
              <li><Link to="/listings" className="hover:text-gray-900 dark:hover:text-white">{t('listings')}</Link></li> {/* Adjusted hover color */}
              <li><Link to="/vip-access" className="hover:text-gray-900 dark:hover:text-white">{t('vipAccess')}</Link></li> {/* Adjusted hover color */}
              <li><Link to="/bitcoin" className="hover:text-gray-900 dark:hover:text-white">{t('bitcoin')}</Link></li> {/* Adjusted hover color */}
              <li><Link to="/contact" className="hover:text-gray-900 dark:hover:text-white">{t('contact')}</Link></li> {/* Adjusted hover color */}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('legal')}</h4> {/* Adjusted heading color */}
            <ul className="space-y-2 text-gray-500 dark:text-gray-400"> {/* Adjusted text color */}
              <li><Link to="/policy" className="hover:text-gray-900 dark:hover:text-white">{t('privacyPolicy')}</Link></li> {/* Adjusted hover color */}
              <li><Link to="/policy" className="hover:text-gray-900 dark:hover:text-white">{t('termsOfService')}</Link></li> {/* Adjusted hover color */}
              <li><Link to="/policy" className="hover:text-gray-900 dark:hover:text-white">{t('cookiePolicy')}</Link></li> {/* Adjusted hover color */}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('newsletter')}</h4> {/* Adjusted heading color */}
            <p className="text-gray-500 dark:text-gray-400 mb-4">{t('subscribeNewsletter')}</p> {/* Adjusted text color */}
            <div className="flex">
              <input
                type="email"
                placeholder={t('yourEmail')}
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500" // Added dark mode styles for input
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors text-white"> {/* Added dark mode button styles */}
                {t('subscribe')}
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400"> {/* Adjusted border and text color */}
          <p>{t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
