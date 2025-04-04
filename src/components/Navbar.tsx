import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Bitcoin, Settings, User, LogIn, UserPlus, Heart, MessageCircle, Home, Globe, Coins } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslate } from '../hooks/useTranslate';
import { useAuth } from '../contexts/AuthContext';
import { useGlobal } from '../contexts/GlobalContext';

// Admin email (secure in production)
const ADMIN_EMAIL = 'admin@mairealestate.com';

export function Navbar() {
  const { t } = useTranslate();
  const { user, isAuthenticated, login, logout, register } = useAuth();
  const { language, setLanguage, currency, setCurrency } = useGlobal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const authButtonRef = useRef<HTMLButtonElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const currencyButtonRef = useRef<HTMLButtonElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Determine navbar scroll behavior for specific pages
  const isPropertyPage = location.pathname.includes('/property/');
  const isBitcoinPage = location.pathname === '/bitcoin';
  const isContactPage = location.pathname === '/contact';
  const isPageManagerPage = location.pathname === '/page-manager';
  const isMessagesPage = location.pathname === '/messages';
  const isVipAccessPage = location.pathname === '/vip-access';
  const isPolicyPage = location.pathname === '/policy';
  const isDashboardPage = location.pathname === '/dashboard';
  const isFavoritesPage = location.pathname === '/favorites';
  
  const alwaysScrolled = isPropertyPage || isBitcoinPage || isContactPage || isPageManagerPage || 
                         isMessagesPage || isVipAccessPage || isPolicyPage || isDashboardPage || isFavoritesPage;

  // Language options
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'ro', name: 'Română' }
  ];

  // Currency options
  const currencies = ['AED', 'USD', 'EUR', 'GBP', 'RON', 'NGN', 'BTC', 'USDT'];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Maintain scrolled state for specific pages or on scroll
      setIsScrolled(alwaysScrolled || scrollPosition > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      // Close dropdowns when clicking outside
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        authButtonRef.current &&
        !authButtonRef.current.contains(event.target as Node)
      ) {
        setShowAuthDropdown(false);
        setShowLoginForm(false);
      }

      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node) &&
        languageButtonRef.current &&
        !languageButtonRef.current.contains(event.target as Node)
      ) {
        setShowLanguageDropdown(false);
      }

      if (
        currencyDropdownRef.current &&
        !currencyDropdownRef.current.contains(event.target as Node) &&
        currencyButtonRef.current &&
        !currencyButtonRef.current.contains(event.target as Node)
      ) {
        setShowCurrencyDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location, alwaysScrolled]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Try to login with the provided credentials
    const success = await login(loginData.email, loginData.password);
    
    if (success) {
      setShowAuthDropdown(false);
      setShowLoginForm(false);
      
      // Check if this is an admin login
      if (loginData.email === ADMIN_EMAIL) {
        toast.success('Welcome back, Admin!');
        navigate('/page-manager');
      } else {
        toast.success('Successfully logged in!');
        navigate('/dashboard');
      }
    } else {
      toast.error('Invalid email or password');
    }
    
    setLoginData({ email: '', password: '' });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // Don't allow registering with admin email
    if (registerData.email === ADMIN_EMAIL) {
      toast.error('This email cannot be used for registration');
      return;
    }
    
    try {
      // Call the register function from AuthContext
      const success = await register(
        registerData.name,
        registerData.email, 
        registerData.password
      );
      
      if (success) {
        toast.success('Account created successfully!');
        setShowAuthDropdown(false);
        setShowRegisterForm(false);
        navigate('/dashboard');
      } else {
        toast.error('Failed to create account');
      }
    } catch {
      toast.error('Failed to create account');
    }
    
    setRegisterData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    setShowAuthDropdown(false);
    
    // Redirect if on protected pages
    if (location.pathname === '/dashboard' || 
        location.pathname === '/favorites' || 
        location.pathname === '/messages' || 
        location.pathname === '/page-manager') {
      navigate('/');
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700' 
        : 'bg-transparent border-b border-transparent' 
    }`}>
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className={`text-xl font-light tracking-wide ${
            isScrolled ? 'text-gray-900 dark:text-white' : 'text-white' 
          }`}>
            MAI<span className="font-medium">REALESTATE</span>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Mobile Menu */}
          <div className={`md:hidden fixed inset-0 z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="absolute right-0 h-full w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-l border-gray-200 dark:border-gray-700">
              <div className="p-4 space-y-4">
                <Link 
                  to="/listings" 
                  className="block px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('listings')}
                </Link>
                <Link 
                  to="/about" 
                  className="block px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('aboutUs')}
                </Link>
                <Link 
                  to="/bitcoin" 
                  className="block px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Bitcoin className="w-4 h-4" />
                    {t('bitcoin')}
                  </div>
                </Link>
                <Link 
                  to="/contact" 
                  className="block px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {t('contact')}
                  </div>
                </Link>

                {/* Language Selector */}
                <div className="px-4 py-2">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <Globe className="w-4 h-4" />
                    <span>Language</span>
                  </div>
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as 'en' | 'ar' | 'ro');
                          setIsMobileMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 rounded ${
                          language === lang.code
                            ? 'bg-amber-500 text-white'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Currency Selector */}
                <div className="px-4 py-2">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <Coins className="w-4 h-4" />
                    <span>Currency</span>
                  </div>
                  <div className="space-y-2">
                    {currencies.map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr as 'AED' | 'USD' | 'USDT' | 'BTC' | 'EUR' | 'GBP' | 'RON' | 'NGN');
                          setIsMobileMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 rounded ${
                          currency === curr
                            ? 'bg-amber-500 text-white'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auth Section */}
                {isAuthenticated ? (
                  <div className="px-4 py-2 space-y-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Signed in as <span className="font-medium text-gray-900 dark:text-white">{user?.email}</span>
                    </div>
                    {user?.email === ADMIN_EMAIL ? (
                      <Link
                        to="/page-manager"
                        className="block w-full px-4 py-2 rounded text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          <span>{t('pageManager')}</span>
                        </div>
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/dashboard"
                          className="block w-full px-4 py-2 rounded text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            <span>Dashboard</span>
                          </div>
                        </Link>
                        <Link
                          to="/favorites"
                          className="block w-full px-4 py-2 rounded text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            <span>{t('favorites')}</span>
                          </div>
                        </Link>
                        <Link
                          to="/messages"
                          className="block w-full px-4 py-2 rounded text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>{t('messages')}</span>
                          </div>
                        </Link>
                      </>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full px-4 py-2 rounded text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <LogIn className="w-4 h-4 rotate-180" />
                        <span>{t('logout')}</span>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="px-4 py-2 space-y-2">
                    <button
                      onClick={() => {
                        setShowLoginForm(true);
                        setShowAuthDropdown(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full px-4 py-2 rounded text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <LogIn className="w-4 h-4" />
                        <span>{t('login')}</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setShowRegisterForm(true);
                        setShowAuthDropdown(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full px-4 py-2 rounded text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        <span>{t('createAccount')}</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {/* <DarkModeToggle /> */} 

            <Link to="/listings" className={`text-sm ${
              isScrolled ? 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white' : 'text-white/80 hover:text-white'
            }`}>
              {t('listings')}
            </Link>
            <Link to="/about" className={`text-sm ${
              isScrolled ? 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white' : 'text-white/80 hover:text-white'
            }`}>
              {t('aboutUs')}
            </Link>
            {/* Language Dropdown */}
            <div className="relative">
              <button
                ref={languageButtonRef}
                onClick={() => {
                  setShowLanguageDropdown(!showLanguageDropdown);
                  setShowCurrencyDropdown(false);
                }}
                className={`text-sm flex items-center gap-1 ${
                  isScrolled ? 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white' : 'text-white/80 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4" />
                {language.toUpperCase()}
              </button>

              {showLanguageDropdown && (
                <div 
                  ref={languageDropdownRef}
                  className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-100 dark:border-gray-700 z-50"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as 'en' | 'ar' | 'ro');
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        language === lang.code
                          ? 'bg-amber-500 text-white'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Dropdown */}
            <div className="relative">
              <button
                ref={currencyButtonRef}
                onClick={() => {
                  setShowCurrencyDropdown(!showCurrencyDropdown);
                  setShowLanguageDropdown(false);
                }}
                className={`text-sm flex items-center gap-1 ${
                  isScrolled ? 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white' : 'text-white/80 hover:text-white'
                }`}
              >
                <Coins className="w-4 h-4" />
                {currency}
              </button>

              {showCurrencyDropdown && (
                <div 
                  ref={currencyDropdownRef}
                  className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-100 dark:border-gray-700 z-50"
                >
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr as 'AED' | 'USD' | 'USDT' | 'BTC' | 'EUR' | 'GBP' | 'RON' | 'NGN');
                        setShowCurrencyDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        currency === curr
                          ? 'bg-amber-500 text-white'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/bitcoin" className={`text-sm flex items-center gap-1 ${
              isScrolled ? 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white' : 'text-white/80 hover:text-white'
            }`}>
              <Bitcoin className="w-4 h-4" />
              {t('bitcoin')}
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                isScrolled 
                  ? 'border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white' 
                  : 'border-white/20 hover:bg-white/10 text-white/80 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              {t('contact')}
            </Link>

            {/* Auth Dropdown */}
            <div className="relative">
              <button
                ref={authButtonRef} 
                onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                className={`text-sm flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  isScrolled 
                    ? 'border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white' 
                    : 'border-white/20 hover:bg-white/10 text-white/80 hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
              {isAuthenticated ? t('account') : t('login')}
              </button>

              {showAuthDropdown && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 border border-gray-100 dark:border-gray-700">
                  {!isAuthenticated ? (
                    <>
                      {!showLoginForm && !showRegisterForm ? (
                        <div className="p-4 space-y-2">
                          <button
                            onClick={() => setShowLoginForm(true)}
                            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <LogIn className="w-4 h-4" />
                            <span>{t('login')}</span>
                          </button>
                          <button
                            onClick={() => {
                              setShowLoginForm(false);
                              setShowRegisterForm(true);
                            }} 
                            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <UserPlus className="w-4 h-4" />
                            <span>{t('createAccount')}</span>
                          </button>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                            Login to save your favorite properties and chat with our team
                          </p>
                        </div>
                      ) : showLoginForm ? (
                        <form onSubmit={handleLogin} className="p-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={loginData.email}
                              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Password
                            </label>
                            <input
                              type="password"
                              value={loginData.password}
                              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                          >
                            Login
                          </button>
                          <div className="flex justify-between">
                            <button
                              type="button"
                              onClick={() => setShowLoginForm(false)}
                              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowLoginForm(false);
                                setShowRegisterForm(true);
                              }}
                              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                            >
                              Register
                            </button>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={handleRegister} className="p-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              value={registerData.name}
                              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={registerData.email}
                              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Password
                            </label>
                            <input
                              type="password"
                              value={registerData.password}
                              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              value={registerData.confirmPassword}
                              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                          >
                            Register
                          </button>
                          <div className="flex justify-between">
                            <button
                              type="button"
                              onClick={() => setShowRegisterForm(false)}
                              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowRegisterForm(false);
                                setShowLoginForm(true);
                              }}
                              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      )}
                    </>
                  ) : (
                    <div className="p-4 space-y-2">
                      <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                        Signed in as <span className="font-medium text-gray-900 dark:text-white">{user?.email}</span>
                      </div>
                      <div className="border-t border-gray-100 dark:border-gray-700" />
                      {user?.email === ADMIN_EMAIL ? (
                        // Admin-only menu items
                        <Link
                          to="/page-manager"
                          className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Settings className="w-4 h-4" />
                          <span>{t('pageManager')}</span>
                        </Link>
                      ) : (
                        // Regular user menu items
                        <>
                          <Link
                            to="/dashboard"
                            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Home className="w-4 h-4" />
                            <span>Dashboard</span>
                          </Link>
                          <Link
                            to="/favorites"
                            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Heart className="w-4 h-4" />
                            <span>{t('favorites')}</span>
                          </Link>
                          <Link
                            to="/messages"
                            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>{t('messages')}</span>
                          </Link>
                        </>
                      )}
                      <div className="border-t border-gray-100 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogIn className="w-4 h-4 rotate-180" />
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div> 
        </div>
      </div>
    </nav>
  );
}
