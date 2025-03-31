import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Bitcoin, Settings, User, LogIn, UserPlus, Heart, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

// Special admin credentials - in a real app, these would be handled securely
const ADMIN_EMAIL = 'admin@mairealestate.com';
const ADMIN_PASSWORD = 'mai2025admin';

interface AuthState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  email: string;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDarkBg, setIsOverDarkBg] = useState(true);
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
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      const darkBgElements = document.querySelectorAll('.bg-gradient-to-b, .bg-black\\/40, .bg-black\\/50');
      let isOverDark = false;

      darkBgElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 64 && rect.bottom > 0) {
          isOverDark = true;
        }
      });

      setIsOverDarkBg(isOverDark);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAuthDropdown(false);
        setShowLoginForm(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location]);

  const getTextColor = () => {
    if (isScrolled) return 'text-gray-900';
    return isOverDarkBg ? 'text-white' : 'text-gray-900';
  };

  const getLinkColor = () => {
    if (isScrolled) return 'text-gray-600 hover:text-gray-900';
    return isOverDarkBg ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900';
  };

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
      isScrolled ? 'bg-white/10 backdrop-blur-sm border-b border-white/20' : 'bg-transparent'
    }`}>
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className={`text-xl font-light tracking-wide ${getTextColor()}`}>
            MAI<span className="font-medium">REALESTATE</span>
          </Link>
          
          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/listings" className={`text-sm ${getLinkColor()}`}>
              Listings
            </Link>
            <Link to="/bitcoin" className={`text-sm flex items-center gap-1 ${getLinkColor()}`}>
              <Bitcoin className="w-4 h-4" />
              Bitcoin
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                isScrolled || !isOverDarkBg
                  ? 'border-gray-200 hover:bg-gray-100'
                  : 'border-white/20 hover:bg-white/10'
              } ${getLinkColor()}`}
            >
              <Phone className="w-4 h-4" />
              Contact
            </Link>

            {/* Auth Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                className={`text-sm flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  isScrolled || !isOverDarkBg
                    ? 'border-gray-200 hover:bg-gray-100'
                    : 'border-white/20 hover:bg-white/10'
                } ${getLinkColor()}`}
              >
                <User className="w-4 h-4" />
                {auth.isLoggedIn ? 'Account' : 'Login'}
              </button>

              {showAuthDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg py-2 border border-gray-100">
                  {!auth.isLoggedIn ? (
                    <>
                      {!showLoginForm ? (
                        <div className="p-4 space-y-2">
                          <button
                            onClick={() => setShowLoginForm(true)}
                            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                          >
                            <LogIn className="w-4 h-4" />
                            <span>Login</span>
                          </button>
                          <button
                            onClick={() => setShowLoginForm(true)}
                            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                          >
                            <UserPlus className="w-4 h-4" />
                            <span>Create Account</span>
                          </button>
                          <p className="text-xs text-gray-500 mt-4">
                            Login to save your favorite properties and chat with our team
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleLogin} className="p-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={loginData.email}
                              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Password
                            </label>
                            <input
                              type="password"
                              value={loginData.password}
                              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                          >
                            Login
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowLoginForm(false)}
                            className="w-full text-sm text-gray-500 hover:text-gray-700"
                          >
                            Back
                          </button>
                        </form>
                      )}
                    </>
                  ) : (
                    <div className="p-4 space-y-2">
                      <div className="px-4 py-2 text-sm text-gray-500">
                        Signed in as <span className="font-medium text-gray-900">{auth.email}</span>
                      </div>
                      <div className="border-t border-gray-100" />
                      <Link
                        to="/favorites"
                        className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                      >
                        <Heart className="w-4 h-4" />
                        <span>Favorites</span>
                      </Link>
                      <Link
                        to="/messages"
                        className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Messages</span>
                      </Link>
                      {auth.isAdmin && (
                        <>
                          <div className="border-t border-gray-100" />
                          <Link
                            to="/page-manager"
                            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Page Manager</span>
                          </Link>
                        </>
                      )}
                      <div className="border-t border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-red-600"
                      >
                        <LogIn className="w-4 h-4 rotate-180" />
                        <span>Logout</span>
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