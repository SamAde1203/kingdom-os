// src/components/dashboard/MetricsTracker.tsx
import React, { useState } from 'react';
import { BarChart3, HeartHandshake, Users, Home, Zap } from 'lucide-react';

const MetricsTracker: React.FC = () => {
  const [metrics, setMetrics] = useState({
    souls: 0,
    lives: 0,
    families: 0,
    addictions: 0
  });

  const totalImpact = metrics.souls + metrics.lives + metrics.families + metrics.addictions;

  const metricConfig = [
    {
      key: 'souls',
      label: 'Souls Saved',
      icon: HeartHandshake,
      color: 'bg-gradient-to-br from-red-50 to-pink-50 border-red-300',
      iconColor: 'text-red-600',
      desc: 'Eternal decisions for Christ'
    },
    {
      key: 'lives',
      label: 'Lives Restored',
      icon: Zap,
      color: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300',
      iconColor: 'text-green-600',
      desc: 'Breakthroughs, healing, deliverance'
    },
    {
      key: 'families',
      label: 'Families Healed',
      icon: Home,
      color: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300',
      iconColor: 'text-blue-600',
      desc: 'Marriages reconciled, homes unified'
    },
    {
      key: 'addictions',
      label: 'Addictions Broken',
      icon: Users,
      color: 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-300',
      iconColor: 'text-purple-600',
      desc: 'Freedom from bondage'
    }
  ];

  const updateMetric = (key: keyof typeof metrics, delta: number) => {
    setMetrics(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta)
    }));
  };

  return (
    <div className="h-full w-full flex flex-col space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 flex items-center gap-4">
          <BarChart3 size={40} className="text-purple-700" />
          Kingdom Impact Tracker
        </h2>
        <p className="text-xl text-gray-700">
          Track what matters most to the heart of God
        </p>
        <p className="text-sm text-gray-600 mt-2 italic">
          "The Lord... is patient, not wanting anyone to perish, but everyone to come to repentance." — 2 Peter 3:9
        </p>
      </div>

      {/* Total Impact Summary */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl p-8 shadow-lg text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">Total Kingdom Impact</h3>
        <p className="text-6xl md:text-7xl font-extrabold">{totalImpact}</p>
        <p className="text-xl mt-2 opacity-90">Lives eternally changed through this ministry</p>
      </div>

      {/* Individual Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {metricConfig.map(config => {
          const Icon = config.icon;
          const value = metrics[config.key as keyof typeof metrics];

          return (
            <div
              key={config.key}
              className={`${config.color} rounded-2xl p-8 shadow-lg border-2 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white rounded-2xl shadow">
                    <Icon size={48} className={config.iconColor} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{config.label}</h3>
                    <p className="text-sm text-gray-600">{config.desc}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-5xl md:text-6xl font-extrabold text-gray-800">
                  {value}
                </span>
                <div className="flex gap-4">
                  <button
                    onClick={() => updateMetric(config.key as keyof typeof metrics, -1)}
                    disabled={value === 0}
                    className="w-16 h-16 bg-red-600 text-white rounded-2xl font-bold text-2xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
                  >
                    −
                  </button>
                  <button
                    onClick={() => updateMetric(config.key as keyof typeof metrics, 1)}
                    className="w-16 h-16 bg-green-600 text-white rounded-2xl font-bold text-2xl hover:bg-green-700 transition shadow-md"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scripture Footer */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-700 text-white rounded-2xl p-8 text-center shadow-lg">
        <p className="text-2xl md:text-3xl italic mb-4 leading-relaxed">
          "I tell you that in the same way there will be more rejoicing in heaven<br />
          over one sinner who repents than over ninety-nine righteous persons who do not need to repent."
        </p>
        <p className="text-xl font-semibold">Luke 15:7 (NIV)</p>
      </div>
    </div>
  );
};

export default MetricsTracker;