import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Bitcoin, Settings, User, LogIn, UserPlus, Heart, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslate } from '../hooks/useTranslate';
// Removed unused DarkModeToggle import

// Special admin credentials - in a real app, these would be handled securely
const ADMIN_EMAIL = 'admin@mairealestate.com';
const ADMIN_PASSWORD = 'mai2025admin';

interface AuthState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  email: string;
}

export function Navbar() {
  const { t } = useTranslate();
  const [isScrolled, setIsScrolled] = useState(false);
  // Removed unused isOverDarkBg state
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    isAdmin: false,
    email: ''
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const authButtonRef = useRef<HTMLButtonElement>(null); // Ref for the auth button
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Removed isOverDarkBg calculation logic
    };

    const handleClickOutside = (event: MouseEvent) => {
      // Close dropdown if click is outside the dropdown itself AND outside the button that opens it
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        authButtonRef.current &&
        !authButtonRef.current.contains(event.target as Node)
      ) {
        setShowAuthDropdown(false);
        setShowLoginForm(false); // Also close login form if clicking outside
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location]); // Removed isOverDarkBg dependency as we'll use dark: prefix

  // Removed getTextColor and getLinkColor functions

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginData.email === ADMIN_EMAIL && loginData.password === ADMIN_PASSWORD) {
      setAuth({
        isLoggedIn: true,
        isAdmin: true,
        email: loginData.email
      });
      toast.success('Welcome back, Admin!');
      setShowAuthDropdown(false);
      setShowLoginForm(false);
      navigate('/page-manager');
    } else {
      setAuth({
        isLoggedIn: true,
        isAdmin: false,
        email: loginData.email
      });
      toast.success('Successfully logged in!');
      setShowAuthDropdown(false);
      setShowLoginForm(false);
    }
    
    setLoginData({ email: '', password: '' });
  };

  const handleLogout = () => {
    setAuth({
      isLoggedIn: false,
      isAdmin: false,
      email: ''
    });
    toast.success('Successfully logged out');
    setShowAuthDropdown(false);
    if (location.pathname === '/page-manager') {
      navigate('/');
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700' 
        : 'bg-transparent border-b border-transparent' // Simplified initial state
    }`}>
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className={`text-xl font-light tracking-wide ${
            isScrolled ? 'text-gray-900 dark:text-white' : 'text-white' // Simplified text color logic
          }`}>
            MAI<span className="font-medium">REALESTATE</span>
          </Link>
          
          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Dark Mode Toggle Removed */}
            {/* <DarkModeToggle /> */} 

            <Link to="/listings" className={`text-sm ${
              isScrolled ? 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white' : 'text-white/80 hover:text-white'
            }`}>
              {t('listings')}
            </Link>
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
                ref={authButtonRef} // Added ref
                onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                className={`text-sm flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  isScrolled 
                    ? 'border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white' 
                    : 'border-white/20 hover:bg-white/10 text-white/80 hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
                {auth.isLoggedIn ? t('account') : t('login')}
              </button>

              {showAuthDropdown && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 border border-gray-100 dark:border-gray-700">
                  {!auth.isLoggedIn ? (
                    <>
                      {!showLoginForm ? (
                        <div className="p-4 space-y-2">
                          <button
                            onClick={() => setShowLoginForm(true)}
                            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <LogIn className="w-4 h-4" />
                            <span>{t('login')}</span>
                          </button>
                          <button
                            onClick={() => setShowLoginForm(true)} // Assuming same form for signup for now
                            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <UserPlus className="w-4 h-4" />
                            <span>{t('createAccount')}</span>
                          </button>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                            Login to save your favorite properties and chat with our team
                          </p>
                        </div>
                      ) : (
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
                          <button
                            type="button"
                            onClick={() => setShowLoginForm(false)}
                            className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                          >
                            Back
                          </button>
                        </form>
                      )}
                    </>
                  ) : (
                    <div className="p-4 space-y-2">
                      <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                        Signed in as <span className="font-medium text-gray-900 dark:text-white">{auth.email}</span>
                      </div>
                      <div className="border-t border-gray-100 dark:border-gray-700" />
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
                      {auth.isAdmin && (
                        <>
                          <div className="border-t border-gray-100 dark:border-gray-700" />
                          <Link
                            to="/page-manager"
                            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Settings className="w-4 h-4" />
                            <span>{t('pageManager')}</span>
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
          </div> {/* <-- This closing div was missing */}
        </div>
      </div>
    </nav>
  );
}
