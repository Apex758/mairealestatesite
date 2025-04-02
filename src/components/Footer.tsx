import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslate } from '../hooks/useTranslate';

export function Footer() {
  const { t } = useTranslate();
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">MAIREALESTATE</h3>
            <p className="text-gray-500 dark:text-gray-400">{t('findingYouPerfect')}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
              <li><Link to="/listings" className="hover:text-gray-900 dark:hover:text-white">{t('listings')}</Link></li>
              <li><Link to="/vip-access" className="hover:text-gray-900 dark:hover:text-white">{t('vipAccess')}</Link></li>
              <li><Link to="/bitcoin" className="hover:text-gray-900 dark:hover:text-white">{t('bitcoin')}</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900 dark:hover:text-white">{t('contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('legal')}</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
              <li><Link to="/policy" className="hover:text-gray-900 dark:hover:text-white">{t('privacyPolicy')}</Link></li>
              <li><Link to="/policy" className="hover:text-gray-900 dark:hover:text-white">{t('termsOfService')}</Link></li>
              <li><Link to="/policy" className="hover:text-gray-900 dark:hover:text-white">{t('cookiePolicy')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
          <p>{t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
