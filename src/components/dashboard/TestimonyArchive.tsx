// src/components/dashboard/TestimonyArchive.tsx
import React, { useState } from 'react';
import { CheckCircle2, Plus, Calendar, User } from 'lucide-react';

interface Testimony {
  id: number;
  title: string;
  person: string;
  story: string;
  date: string;
}

const TestimonyArchive: React.FC = () => {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [newTestimony, setNewTestimony] = useState({
    title: '',
    person: '',
    story: ''
  });

  const handleAddTestimony = () => {
    if (newTestimony.title.trim() && newTestimony.person.trim() && newTestimony.story.trim()) {
      setTestimonies([
        {
          id: Date.now(),
          title: newTestimony.title.trim(),
          person: newTestimony.person.trim(),
          story: newTestimony.story.trim(),
          date: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        },
        ...testimonies
      ]);
      setNewTestimony({ title: '', person: '', story: '' });
    }
  };

  return (
    <div className="h-full w-full flex flex-col space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-100 to-teal-100 p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center gap-4">
          <CheckCircle2 size={48} className="text-green-600 fill-green-600" />
          Testimony Archive
        </h2>
        <p className="text-xl text-gray-700 mb-4">
          Document and celebrate what God is doing in lives through this ministry
        </p>
        <p className="text-lg italic text-gray-600 bg-white/70 p-4 rounded-xl">
          "They triumphed over him by the blood of the Lamb and by the word of their testimony..."
          <br />
          <span className="font-semibold not-italic">— Revelation 12:11</span>
        </p>
      </div>

      {/* Add Testimony Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Plus className="text-green-600" size={32} />
          Record a New Testimony
        </h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Testimony Title</label>
            <input
              type="text"
              value={newTestimony.title}
              onChange={(e) => setNewTestimony({ ...newTestimony, title: e.target.value })}
              placeholder="e.g., 'Delivered from Addiction', 'Healed from Illness'"
              className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-300 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Person's Name (or Anonymous)</label>
            <input
              type="text"
              value={newTestimony.person}
              onChange={(e) => setNewTestimony({ ...newTestimony, person: e.target.value })}
              placeholder="e.g., Sister Grace, Brother John, Anonymous"
              className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-300 transition"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Testimony Story</label>
          <textarea
            value={newTestimony.story}
            onChange={(e) => setNewTestimony({ ...newTestimony, story: e.target.value })}
            placeholder="Share the full story of how God moved..."
            className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-4 focus:ring-green-300 transition h-48"
          />
        </div>
        <button
          onClick={handleAddTestimony}
          disabled={!newTestimony.title.trim() || !newTestimony.person.trim() || !newTestimony.story.trim()}
          className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 disabled:opacity-50 transition shadow-md flex items-center justify-center gap-3"
        >
          <CheckCircle2 size={24} />
          Add Testimony & Praise God!
        </button>
      </div>

      {/* Testimonies List */}
      <div className="flex-1">
        {testimonies.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-16 text-center">
            <CheckCircle2 size={80} className="text-gray-200 mx-auto mb-6" />
            <p className="text-2xl text-gray-500">No testimonies recorded yet.</p>
            <p className="text-lg text-gray-400 mt-3">Start documenting God's faithfulness today!</p>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="text-green-600" size={32} />
              God's Faithfulness ({testimonies.length} Testimonies)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonies.map((testimony) => (
                <div
                  key={testimony.id}
                  className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 shadow-md border border-green-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle2 size={32} className="text-green-600 fill-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{testimony.title}</h4>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <User size={16} />
                        {testimony.person}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">{testimony.story}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-green-200">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      {testimony.date}
                    </span>
                    <span className="font-bold text-green-700">Praise God! 🙌</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scripture Footer */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-2xl p-8 text-center shadow-lg">
        <p className="text-2xl md:text-3xl italic mb-4 leading-relaxed">
          "And they have conquered him by the blood of the Lamb<br />
          and by the word of their testimony,<br />
          for they loved not their lives even unto death."
        </p>
        <p className="text-xl font-semibold">Revelation 12:11 (ESV)</p>
      </div>
    </div>
  );
};

export default TestimonyArchive;