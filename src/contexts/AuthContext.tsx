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

// Mock user database with credentials
interface UserCredential {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

// Admin credentials
const ADMIN_EMAIL = 'admin@mairealestate.com';
const ADMIN_PASSWORD = 'admin123'; // In a real app, this would be hashed

// Mock user database
const mockUsers: UserCredential[] = [
  {
    id: 'admin1',
    name: 'Admin',
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  }
];

// No need for a separate ADMIN_USER constant as we're using mockUsers

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
    if (!email || !password) {
      return false;
    }

    // Find user in mock database
    const userCredential = mockUsers.find(user => user.email === email);
    
    // If user exists and password matches
    if (userCredential && userCredential.password === password) {
      // Set user without password using rest operator to exclude password
      const { password: _unused, ...userWithoutPassword } = userCredential; // eslint-disable-line @typescript-eslint/no-unused-vars
      setUser(userWithoutPassword);
      return true;
    }
    
    return false;
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to create a new user
    if (!name || !email || !password) {
      return false;
    }
    
    // Don't allow registering with admin email
    if (email === ADMIN_EMAIL) {
      return false;
    }
    
    // Check if email is already registered
    if (mockUsers.some(user => user.email === email)) {
      return false;
    }
    
    // Create a new user with the provided details
    const userId = `user-${Date.now()}`;
    const newUser: UserCredential = {
      id: userId,
      name,
      email,
      password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };
    
    // Add to mock database
    mockUsers.push(newUser);
    
    // Set user without password
    const { password: _unused, ...userWithoutPassword } = newUser; // eslint-disable-line @typescript-eslint/no-unused-vars
    setUser(userWithoutPassword);
    
    return true;
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
