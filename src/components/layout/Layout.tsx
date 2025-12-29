// src/components/layout/Layout.tsx
import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Toaster position="top-right" />
      
      <Header />
      
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
        {/* Desktop Sidebar */}
        <div className="lg:w-64 bg-white border-r hidden lg:block">
          <Navigation activeTab={activeTab} onTabChange={onTabChange} isSidebar={true} />
        </div>
        
        {/* Mobile Navigation */}
        <div className="lg:hidden bg-white border-b">
          <Navigation activeTab={activeTab} onTabChange={onTabChange} isSidebar={false} />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 min-h-[calc(100vh-200px)] w-full p-6">
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;