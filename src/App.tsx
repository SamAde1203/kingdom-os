// src/App.tsx
import { useState } from 'react';
import Layout from './components/layout/Layout';

import DashboardHome from './components/dashboard/DashboardHome';
import ReadinessAssessment from './components/dashboard/ReadinessAssessment';
import ContentPlanner from './components/dashboard/ContentPlanner';
import TeamBuilder from './components/dashboard/TeamBuilder';
import MetricsTracker from './components/dashboard/MetricsTracker';
import PrayerWall from './components/dashboard/PrayerWall';
import TestimonyArchive from './components/dashboard/TestimonyArchive';
import DualChurches from './components/dual-churches/DualChurches';

import { Toaster } from 'react-hot-toast';
import './styles/globals.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'assessment':
        return <ReadinessAssessment />;
      case 'content':
        return <ContentPlanner />;
      case 'team':
        return <TeamBuilder />;
      case 'metrics':
        return <MetricsTracker />;
      case 'prayer':
        return <PrayerWall />;
      case 'testimony':
        return <TestimonyArchive />;
      case 'dualchurch':
        return <DualChurches />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'white',
            color: '#374151',
            border: '1px solid #E5E7EB',
            borderRadius: '0.75rem',
            padding: '16px',
          },
        }}
      />

      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderTabContent()}
      </Layout>
    </div>
  );
}

export default App;