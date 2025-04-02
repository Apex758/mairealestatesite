import React from 'react';
import { DarkModeToggle } from './components/DarkModeToggle';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollControls } from './components/ScrollControls';
import { GlobalProvider } from './contexts/GlobalContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { Listings } from './pages/Listings';
import { Contact } from './pages/Contact';
import { VipAccess } from './pages/VipAccess';
import { Bitcoin } from './pages/Bitcoin';
import { Policy } from './pages/Policy';
import { AboutUs } from './pages/AboutUs';
import { PropertyPage } from './pages/PropertyPage';
import { PageManager } from './pages/PageManager';
import { Statistics } from './pages/Statistics';
import { Dashboard } from './pages/Dashboard';
import { Favorites } from './pages/Favorites';
import { Messages } from './pages/Messages';

// Protected route components
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  const ADMIN_EMAIL = 'admin@mairealestate.com';
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (user?.email !== ADMIN_EMAIL) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const UserRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  const ADMIN_EMAIL = 'admin@mairealestate.com';
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (user?.email === ADMIN_EMAIL) {
    return <Navigate to="/page-manager" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/vip-access" element={<VipAccess />} />
              <Route path="/bitcoin" element={<Bitcoin />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/property/:id" element={<PropertyPage />} />
              {/* Admin routes */}
              <Route path="/page-manager" element={
                <AdminRoute>
                  <PageManager />
                </AdminRoute>
              } />
              <Route path="/statistics" element={
                <AdminRoute>
                  <Statistics />
                </AdminRoute>
              } />
              
              {/* User dashboard routes */}
              <Route path="/dashboard" element={
                <UserRoute>
                  <Dashboard />
                </UserRoute>
              } />
              <Route path="/favorites" element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } />
            </Routes>
            <Footer />
            <ScrollControls />
            <Toaster position="top-right" />
            <div className="fixed bottom-4 left-4 z-50">
              <DarkModeToggle />
            </div>
          </div>
        </Router>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
