// src/components/layout/Navigation.tsx
import React from 'react';
import {
  Home,
  Shield,
  Target,
  Users,
  BarChart,
  Heart,
  Check,
  Globe
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-purple-600' },
    { id: 'assessment', label: 'Assessment', icon: Shield, color: 'text-blue-600' },
    { id: 'content', label: 'Content', icon: Target, color: 'text-green-600' },
    { id: 'team', label: 'Team', icon: Users, color: 'text-yellow-600' },
    { id: 'metrics', label: 'Metrics', icon: BarChart, color: 'text-indigo-600' },
    { id: 'prayer', label: 'Prayer', icon: Heart, color: 'text-red-600' },
    { id: 'testimony', label: 'Testimonies', icon: Check, color: 'text-teal-600' },
    { id: 'dualchurch', label: 'Dual Churches', icon: Globe, color: 'text-cyan-600' },
  ];

  const DesktopNav = () => (
    <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive
                ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-l-4 hover:border-gray-300'
            }`}
          >
            <div className={`p-2 rounded-lg ${isActive ? 'bg-purple-100' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
              <Icon size={20} className={isActive ? 'text-purple-600' : tab.color} />
            </div>
            <span className={`font-medium ${isActive ? 'text-gray-900 font-semibold' : ''}`}>
              {tab.label}
            </span>
            {isActive && (
              <div className="ml-auto w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
            )}
          </button>
        );
      })}
    </nav>
  );

  const MobileNav = () => (
    <div className="flex overflow-x-auto px-2 py-3 space-x-2 scrollbar-hide">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 min-w-[80px] ${
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs font-medium mt-1">{tab.label}</span>
            {isActive && (
              <div className="w-1.5 h-1.5 bg-white rounded-full mt-1"></div>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="hidden lg:block h-full">
        <DesktopNav />
      </div>
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </>
  );
};

export default Navigation;