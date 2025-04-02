import React from 'react';
import { DarkModeToggle } from './components/DarkModeToggle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollControls } from './components/ScrollControls';
import { GlobalProvider } from './contexts/GlobalContext';
import { Home } from './pages/Home';
import { Listings } from './pages/Listings';
import { Contact } from './pages/Contact';
import { VipAccess } from './pages/VipAccess';
import { Bitcoin } from './pages/Bitcoin';
import { Policy } from './pages/Policy';
import { PropertyPage } from './pages/PropertyPage';
import { PageManager } from './pages/PageManager';
import { Statistics } from './pages/Statistics';

function App() {
  return (
    <GlobalProvider>
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
            <Route path="/property/:id" element={<PropertyPage />} />
            <Route path="/page-manager" element={<PageManager />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
          <Footer />
          <ScrollControls />
          <Toaster position="top-right" />
  <div className="fixed bottom-4 left-4 z-50">
    <DarkModeToggle />
  </div>
</div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
