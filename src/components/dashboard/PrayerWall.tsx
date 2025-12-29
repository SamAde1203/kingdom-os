// src/components/dashboard/PrayerWall.tsx
import React, { useState } from 'react';
import { Heart, MessageCircle, Calendar } from 'lucide-react';

interface Prayer {
  id: number;
  request: string;
  date: string;
}

const PrayerWall: React.FC = () => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [newPrayer, setNewPrayer] = useState('');

  const handleAddPrayer = () => {
    if (newPrayer.trim()) {
      setPrayers([
        {
          id: Date.now(),
          request: newPrayer.trim(),
          date: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        },
        ...prayers // newest first
      ]);
      setNewPrayer('');
    }
  };

  return (
    <div className="h-full w-full flex flex-col space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-100 to-pink-100 p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 flex items-center gap-4">
          <Heart size={44} className="text-red-600 fill-red-600" />
          Prayer Wall
        </h2>
        <p className="text-xl text-gray-700">
          Come together in prayer share requests, stand in faith, celebrate answers
        </p>
        <p className="text-sm text-gray-600 mt-3 italic">
          "The prayer of a righteous person is powerful and effective." — James 5:16
        </p>
      </div>

      {/* Add Prayer Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <MessageCircle className="text-red-500" size={32} />
          Submit a Prayer Request
        </h3>
        <textarea
          value={newPrayer}
          onChange={(e) => setNewPrayer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAddPrayer())}
          placeholder="Share your prayer need... (Press Enter to submit, Shift+Enter for new line)"
          className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500 transition h-40"
        />
        <button
          onClick={handleAddPrayer}
          disabled={!newPrayer.trim()}
          className="mt-6 w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md flex items-center justify-center gap-3"
        >
          <Heart size={24} className="fill-white" />
          Post Prayer Request
        </button>
      </div>

      {/* Prayers List */}
      <div className="flex-1">
        {prayers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-16 text-center">
            <Heart size={80} className="text-gray-200 mx-auto mb-6" />
            <p className="text-2xl text-gray-500">The Prayer Wall is empty.</p>
            <p className="text-gray-400 mt-3 text-lg">Be the first to share a request — we're standing with you in faith.</p>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="text-red-600" size={32} />
              Active Prayer Requests ({prayers.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prayers.map((prayer) => (
                <div
                  key={prayer.id}
                  className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 shadow-md border border-red-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Heart size={28} className="text-red-500 fill-red-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-800 text-lg leading-relaxed">{prayer.request}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-4 pt-4 border-t border-red-200">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      {prayer.date}
                    </span>
                    <span className="font-medium text-red-600">We're praying →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scripture Footer */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl p-8 text-center shadow-lg">
        <p className="text-2xl md:text-3xl italic mb-4 leading-relaxed">
          "Therefore confess your sins to each other and pray for each other<br />
          so that you may be healed. The prayer of a righteous person is powerful and effective."
        </p>
        <p className="text-xl font-semibold">James 5:16 (NIV)</p>
      </div>
    </div>
  );
};

export default PrayerWall;