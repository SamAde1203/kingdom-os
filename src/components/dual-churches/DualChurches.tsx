// src/components/dual-churches/DualChurches.tsx
import React, { useState } from 'react';
import { Globe, Users, UserPlus, Calendar, MessageCircleHeart, Church } from 'lucide-react';

interface ChurchMember {
  name: string;
  date: string;
  source: string;
  notes: string;
}

interface ChurchData {
  current: number;
  goal: number;
  newMembers: ChurchMember[];
}

interface ChurchGrowth {
  nigeria: ChurchData;
  uk: ChurchData;
}

interface Service {
  id: number;
  date: string;
  nigeriaTheme: string;
  ukTheme: string;
  sharedScripture: string;
  preacher: string;
  specialNotes: string;
  streamLink: string;
}

interface SharedTestimony {
  id: number;
  fromLocation: 'nigeria' | 'uk';
  person: string;
  category: string;
  story: string;
  date: string;
}

const DualChurches: React.FC = () => {
  // State
  const [churchGrowth, setChurchGrowth] = useState<ChurchGrowth>({
    nigeria: { current: 10, goal: 20, newMembers: [] },
    uk: { current: 0, goal: 15, newMembers: [] }
  });

  const [newMember, setNewMember] = useState({
    location: 'nigeria' as 'nigeria' | 'uk',
    name: '',
    date: '',
    source: 'service',
    notes: ''
  });

  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState({
    date: '',
    nigeriaTheme: '',
    ukTheme: '',
    sharedScripture: '',
    preacher: '',
    specialNotes: '',
    streamLink: ''
  });

  const [sharedTestimonies, setSharedTestimonies] = useState<SharedTestimony[]>([]);
  const [newSharedTestimony, setNewSharedTestimony] = useState({
    fromLocation: 'nigeria' as 'nigeria' | 'uk',
    person: '',
    category: 'salvation',
    story: ''
  });

  // Handlers
  const handleAddMember = () => {
    if (newMember.name && newMember.date) {
      const location = newMember.location;
      setChurchGrowth(prev => ({
        ...prev,
        [location]: {
          ...prev[location],
          current: prev[location].current + 1,
          newMembers: [...prev[location].newMembers, {
            name: newMember.name,
            date: newMember.date,
            source: newMember.source,
            notes: newMember.notes
          }]
        }
      }));
      setNewMember({ location: 'nigeria', name: '', date: '', source: 'service', notes: '' });
    }
  };

  const handleAddService = () => {
    if (newService.date && (newService.nigeriaTheme || newService.ukTheme)) {
      setServices(prev => [{
        ...newService,
        id: Date.now()
      }, ...prev]);
      setNewService({
        date: '',
        nigeriaTheme: '',
        ukTheme: '',
        sharedScripture: '',
        preacher: '',
        specialNotes: '',
        streamLink: ''
      });
    }
  };

  const handleAddTestimony = () => {
    if (newSharedTestimony.person && newSharedTestimony.story) {
      setSharedTestimonies(prev => [{
        ...newSharedTestimony,
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      }, ...prev]);
      setNewSharedTestimony({
        fromLocation: 'nigeria',
        person: '',
        category: 'salvation',
        story: ''
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 flex items-center gap-4">
          <Globe size={48} className="text-blue-600" />
          Dual Churches Dashboard
        </h2>
        <p className="text-xl text-gray-700">
          Nigeria ↔ UK | One Kingdom, Two Locations, Unified Mission
        </p>
      </div>

      {/* Church Growth Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Nigeria Church */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-xl border-4 border-yellow-400 hover:shadow-2xl transition">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-4xl">🇳🇬</span> Nigeria Church
            </h3>
            <Church size={48} className="text-yellow-600" />
          </div>
          <div className="bg-white/80 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-700">Current Members</span>
              <span className="text-5xl font-extrabold text-green-600">{churchGrowth.nigeria.current}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-gray-700">Goal</span>
              <span className="text-3xl font-bold text-purple-600">{churchGrowth.nigeria.goal}</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-8">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all"
                style={{ width: `${Math.min((churchGrowth.nigeria.current / churchGrowth.nigeria.goal) * 100, 100)}%` }}
              >
                {Math.round((churchGrowth.nigeria.current / churchGrowth.nigeria.goal) * 100)}%
              </div>
            </div>
            <p className="text-center mt-4 text-lg font-medium text-gray-700">
              {churchGrowth.nigeria.goal - churchGrowth.nigeria.current} more to reach goal!
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-3">Recent New Members</h4>
            {churchGrowth.nigeria.newMembers.length === 0 ? (
              <p className="text-gray-500 italic">No members added yet</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {churchGrowth.nigeria.newMembers.slice(-5).reverse().map((m, i) => (
                  <div key={i} className="bg-white/70 rounded-lg p-3">
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-sm text-gray-600">{m.date} • {m.source}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* UK Church */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-xl border-4 border-blue-400 hover:shadow-2xl transition">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-4xl">🇬🇧</span> UK Church Plant
            </h3>
            <Church size={48} className="text-blue-600" />
          </div>
          <div className="bg-white/80 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-700">Current Members</span>
              <span className="text-5xl font-extrabold text-green-600">{churchGrowth.uk.current}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-gray-700">Goal</span>
              <span className="text-3xl font-bold text-purple-600">{churchGrowth.uk.goal}</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-8">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all"
                style={{ width: `${churchGrowth.uk.current === 0 ? 0 : Math.min((churchGrowth.uk.current / churchGrowth.uk.goal) * 100, 100)}%` }}
              >
                {churchGrowth.uk.current === 0 ? '0%' : `${Math.round((churchGrowth.uk.current / churchGrowth.uk.goal) * 100)}%`}
              </div>
            </div>
            <p className="text-center mt-4 text-lg font-medium text-gray-700">
              {churchGrowth.uk.current === 0 ? 'New church plant launching soon!' : `${churchGrowth.uk.goal - churchGrowth.uk.current} more to reach goal!`}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-3">Recent New Members</h4>
            {churchGrowth.uk.newMembers.length === 0 ? (
              <p className="text-gray-500 italic">No members added yet</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {churchGrowth.uk.newMembers.slice(-5).reverse().map((m, i) => (
                  <div key={i} className="bg-white/70 rounded-lg p-3">
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-sm text-gray-600">{m.date} • {m.source}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Combined Impact */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-2xl p-8 shadow-xl text-center">
        <h3 className="text-3xl font-bold mb-6">Combined Kingdom Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-6xl font-extrabold">{churchGrowth.nigeria.current + churchGrowth.uk.current}</p>
            <p className="text-xl mt-2">Total Members</p>
          </div>
          <div>
            <p className="text-6xl font-extrabold">{churchGrowth.nigeria.goal + churchGrowth.uk.goal}</p>
            <p className="text-xl mt-2">Combined Goal</p>
          </div>
          <div>
            <p className="text-6xl font-extrabold">{churchGrowth.nigeria.newMembers.length + churchGrowth.uk.newMembers.length}</p>
            <p className="text-xl mt-2">New This Year</p>
          </div>
        </div>
      </div>

      {/* Add Member Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <UserPlus size={32} className="text-green-600" />
          Add New Member
        </h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <select
            value={newMember.location}
            onChange={(e) => setNewMember({ ...newMember, location: e.target.value as 'nigeria' | 'uk' })}
            className="px-5 py-4 border rounded-xl text-lg"
          >
            <option value="nigeria">🇳🇬 Nigeria Church</option>
            <option value="uk">🇬🇧 UK Church</option>
          </select>
          <input
            type="text"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            placeholder="Full name"
            className="px-5 py-4 border rounded-xl text-lg"
          />
          <input
            type="date"
            value={newMember.date}
            onChange={(e) => setNewMember({ ...newMember, date: e.target.value })}
            className="px-5 py-4 border rounded-xl text-lg"
          />
          <select
            value={newMember.source}
            onChange={(e) => setNewMember({ ...newMember, source: e.target.value })}
            className="px-5 py-4 border rounded-xl text-lg"
          >
            <option value="service">Sunday Service</option>
            <option value="social">Social Media</option>
            <option value="friend">Friend/Family</option>
            <option value="event">Special Event</option>
            <option value="outreach">Community Outreach</option>
            <option value="online">Online Stream</option>
          </select>
        </div>
        <textarea
          value={newMember.notes}
          onChange={(e) => setNewMember({ ...newMember, notes: e.target.value })}
          placeholder="Prayer needs, background, follow-up notes..."
          className="w-full px-5 py-4 border rounded-xl text-lg mb-6 h-32"
        />
        <button
          onClick={handleAddMember}
          disabled={!newMember.name || !newMember.date}
          className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-green-700 disabled:opacity-50 transition shadow-md"
        >
          Add Member to {newMember.location === 'nigeria' ? 'Nigeria' : 'UK'} Church
        </button>
      </div>

      {/* Service Planning */}
      <div className="bg-white rounded-2xl shadow-lg border p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Calendar size={32} className="text-blue-600" />
          Plan Unified Service
        </h3>
        {/* Form fields for service planning */}
        <div className="grid md:grid-cols-2 gap-6">
          <input type="date" value={newService.date} onChange={(e) => setNewService({ ...newService, date: e.target.value })} className="px-5 py-4 border rounded-xl" placeholder="Service Date" />
          <input type="text" value={newService.nigeriaTheme} onChange={(e) => setNewService({ ...newService, nigeriaTheme: e.target.value })} placeholder="Nigeria Theme" className="px-5 py-4 border rounded-xl" />
          <input type="text" value={newService.ukTheme} onChange={(e) => setNewService({ ...newService, ukTheme: e.target.value })} placeholder="UK Theme" className="px-5 py-4 border rounded-xl" />
          <input type="text" value={newService.sharedScripture} onChange={(e) => setNewService({ ...newService, sharedScripture: e.target.value })} placeholder="Shared Scripture" className="px-5 py-4 border rounded-xl" />
        </div>
        <button onClick={handleAddService} className="mt-6 w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700">
          Schedule Service
        </button>
      </div>

      {/* Shared Testimonies */}
      <div className="bg-white rounded-2xl shadow-lg border p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <MessageCircleHeart size={32} className="text-purple-600" />
          Share Testimony Across Churches
        </h3>
        <select
          value={newSharedTestimony.fromLocation}
          onChange={(e) => setNewSharedTestimony({ ...newSharedTestimony, fromLocation: e.target.value as 'nigeria' | 'uk' })}
          className="mb-4 px-5 py-4 border rounded-xl w-full"
        >
          <option value="nigeria">From Nigeria</option>
          <option value="uk">From UK</option>
        </select>
        <input
          type="text"
          value={newSharedTestimony.person}
          onChange={(e) => setNewSharedTestimony({ ...newSharedTestimony, person: e.target.value })}
          placeholder="Person's name"
          className="mb-4 px-5 py-4 border rounded-xl w-full"
        />
        <textarea
          value={newSharedTestimony.story}
          onChange={(e) => setNewSharedTestimony({ ...newSharedTestimony, story: e.target.value })}
          placeholder="What did God do?"
          className="w-full px-5 py-4 border rounded-xl h-32 mb-6"
        />
        <button onClick={handleAddTestimony} className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-700">
          Share Testimony with Both Churches
        </button>
      </div>

      {/* Unity Prayer Footer */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-10 text-center shadow-xl">
        <p className="text-3xl font-bold mb-4">🙏 Unity Prayer</p>
        <p className="text-2xl italic mb-4 leading-relaxed">
          "How good and pleasant it is<br />
          when God's people live together in unity!"
        </p>
        <p className="text-xl font-semibold">Psalm 133:1</p>
        <p className="text-lg mt-6 opacity-90">
          Two locations. One Spirit. One mission.
        </p>
      </div>
    </div>
  );
};

export default DualChurches;