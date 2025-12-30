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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      <Toaster position="top-right" />

      <Header />

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:w-64 xl:w-72 bg-white border-r border-gray-200">
          <Navigation activeTab={activeTab} onTabChange={onTabChange} />
        </aside>

        {/* Mobile Navigation */}
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-sm">
          <Navigation activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-full min-h-[calc(100vh-200px)] p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;