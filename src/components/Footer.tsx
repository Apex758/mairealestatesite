import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslate } from '../hooks/useTranslate';
import Newsletter from './Newsletter';
import { LanguageCurrencyControls } from './LanguageCurrencyControls';

export function Footer() {
  const { t } = useTranslate();
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">MAIREALESTATE</h3>
            <p className="text-gray-500 dark:text-gray-400">{t('findingYouPerfect')}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('quickLinks')}</h4>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/listings" 
                  className="block py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:text-amber-500 dark:active:text-amber-400 transition-colors"
                >
                  {t('listings')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/vip-access" 
                  className="block py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:text-amber-500 dark:active:text-amber-400 transition-colors"
                >
                  {t('vipAccess')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/bitcoin" 
                  className="block py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:text-amber-500 dark:active:text-amber-400 transition-colors"
                >
                  {t('bitcoin')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="block py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:text-amber-500 dark:active:text-amber-400 transition-colors"
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('legal')}</h4>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/policy" 
                  className="block py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:text-amber-500 dark:active:text-amber-400 transition-colors"
                >
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/policy" 
                  className="block py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:text-amber-500 dark:active:text-amber-400 transition-colors"
                >
                  {t('termsOfService')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/policy" 
                  className="block py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:text-amber-500 dark:active:text-amber-400 transition-colors"
                >
                  {t('cookiePolicy')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-8">
            <Newsletter />
            <LanguageCurrencyControls variant="footer" />
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
          <p>{t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
