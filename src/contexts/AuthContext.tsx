import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials
const ADMIN_EMAIL = 'admin@mairealestate.com';

// Mock admin user
const ADMIN_USER: User = {
  id: 'admin1',
  name: 'Admin',
  email: ADMIN_EMAIL,
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
};

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Check if user data exists in localStorage
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Clear any existing user data on initial load
  useEffect(() => {
    // This ensures a fresh start when the app loads
    if (user) {
      localStorage.removeItem('user');
      setUser(null);
    }
  }, []);
  
  const isAuthenticated = !!user;

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to verify credentials
    if (email && password) {
      // Check if this is the admin account
      if (email === ADMIN_EMAIL) {
        setUser(ADMIN_USER);
      } else {
        // Create a user with the provided email
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0], // Use part of email as name
          email: email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`
        };
        setUser(newUser);
      }
      return true;
    }
    return false;
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to create a new user
    if (name && email && password) {
      // Don't allow registering with admin email
      if (email === ADMIN_EMAIL) {
        return false;
      }
      
      // Create a new user with the provided details
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
      };
      setUser(newUser);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
