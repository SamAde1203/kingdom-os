// src/components/dashboard/DashboardHome.tsx
import React from 'react';
import { Users, Target, Heart, Activity, TrendingUp, Globe } from 'lucide-react';

const DashboardHome: React.FC = () => {
  const stats = [
    { label: 'Total Members', value: '20', icon: Users, color: 'text-blue-600' },
    { label: 'Content Ideas', value: '15', icon: Target, color: 'text-green-600' },
    { label: 'Team Members', value: '8', icon: Users, color: 'text-purple-600' },
    { label: 'Active Prayers', value: '7', icon: Heart, color: 'text-red-600' },
    { label: 'Testimonies', value: '12', icon: Activity, color: 'text-yellow-600' },
    { label: 'Growth Rate', value: '45%', icon: TrendingUp, color: 'text-teal-600' }
  ];

  return (
    <div className="h-full w-full flex flex-col space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">KingdomOS Dashboard</h2>
        <p className="text-gray-700 text-lg">Welcome to your ministry management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-md border hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2 text-gray-800">{stat.value}</p>
                </div>
                <Icon className={`${stat.color} bg-gray-100 p-3 rounded-full`} size={48} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions + Dual Churches Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Activity className="text-purple-600" />
            Quick Actions
          </h3>
          <div className="space-y-4">
            <button className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 font-semibold text-lg transition">
              Add New Content Idea
            </button>
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg transition">
              Log Testimony
            </button>
            <button className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 font-semibold text-lg transition">
              Track New Member
            </button>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="text-blue-600" size={32} />
            <h3 className="text-xl font-bold">Dual Churches Status</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div>
                <p className="font-bold text-lg flex items-center gap-2">
                  <span className="text-3xl">🇳🇬</span> Nigeria Church
                </p>
                <p className="text-3xl font-bold text-green-600 mt-1">10 members</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Goal: 20</p>
                <div className="w-40 bg-gray-200 rounded-full h-4 mt-2">
                  <div className="bg-green-600 h-4 rounded-full transition-all" style={{ width: '50%' }}>
                    <span className="text-white text-xs font-bold pl-3">50%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div>
                <p className="font-bold text-lg flex items-center gap-2">
                  <span className="text-3xl">🇬🇧</span> UK Church Plant
                </p>
                <p className="text-2xl font-bold text-blue-600 mt-1">Launching Soon</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Goal: 15</p>
                <div className="w-40 bg-gray-200 rounded-full h-4 mt-2">
                  <div className="bg-blue-600 h-4 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scripture */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-8 text-center shadow-lg">
        <p className="text-2xl md:text-3xl italic mb-4 leading-relaxed">
          "But seek first his kingdom and his righteousness,<br />
          and all these things will be given to you as well."
        </p>
        <p className="text-xl font-semibold">Matthew 6:33 (NIV)</p>
      </div>
    </div>
  );
};

export default DashboardHome;