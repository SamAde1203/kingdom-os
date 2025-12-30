// src/components/dual-churches/DualChurches.tsx
import { useState } from 'react';
import { Globe, UserPlus, Calendar, MessageCircleHeart, Church } from 'lucide-react';

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
  sharedWith: boolean;
  impact: string;
}

const DualChurches = () => {
  // Church Growth State
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

  // Service Coordination State
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

  // Testimony Sharing State
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
      setChurchGrowth({
        ...churchGrowth,
        [location]: {
          ...churchGrowth[location],
          current: churchGrowth[location].current + 1,
          newMembers: [...churchGrowth[location].newMembers, {
            name: newMember.name,
            date: newMember.date,
            source: newMember.source,
            notes: newMember.notes
          }]
        }
      });
      setNewMember({
        location: 'nigeria',
        name: '',
        date: '',
        source: 'service',
        notes: ''
      });
    }
  };

  const handleAddService = () => {
    if (newService.date && (newService.nigeriaTheme || newService.ukTheme)) {
      setServices([...services, {
        ...newService,
        id: Date.now()
      }]);
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
      setSharedTestimonies([...sharedTestimonies, {
        ...newSharedTestimony,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        sharedWith: false,
        impact: ''
      }]);
      setNewSharedTestimony({
        fromLocation: 'nigeria',
        person: '',
        category: 'salvation',
        story: ''
      });
    }
  };

  const handleMarkShared = (id: number) => {
    const impact = prompt('What was the impact when you shared this testimony?');
    if (impact) {
      setSharedTestimonies(sharedTestimonies.map(t =>
        t.id === id ? { ...t, sharedWith: true, impact } : t
      ));
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <Globe size={40} className="text-blue-600" />
          Dual Churches Dashboard
        </h2>
        <p className="text-gray-700 text-lg">
          Nigeria ↔️ UK | One Kingdom, Two Locations, Unified Mission
        </p>
      </div>

      {/* Growth Tracker */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nigeria Church */}
        <div className="bg-gradient-to-br from-green-50 to-yellow-50 border-4 border-green-400 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-800">🇳🇬 Nigeria Church</h3>
            <Church size={40} className="text-green-600" />
          </div>
          
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-semibold">Current Members</span>
              <span className="text-4xl font-bold text-green-600">{churchGrowth.nigeria.current}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600 font-semibold">Goal</span>
              <span className="text-2xl font-bold text-purple-600">{churchGrowth.nigeria.goal}</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-6 rounded-full transition-all flex items-center justify-center text-white font-bold text-sm"
                style={{ width: `${Math.min((churchGrowth.nigeria.current / churchGrowth.nigeria.goal) * 100, 100)}%` }}
              >
                {Math.round((churchGrowth.nigeria.current / churchGrowth.nigeria.goal) * 100)}%
              </div>
            </div>
            
            <p className="text-sm text-gray-600 text-center">
              {churchGrowth.nigeria.goal - churchGrowth.nigeria.current} more to reach goal! 🎯
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-bold text-gray-700">Recent New Members:</h4>
            {churchGrowth.nigeria.newMembers.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No members added yet</p>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {churchGrowth.nigeria.newMembers.slice(-5).reverse().map((member, idx) => (
                  <div key={idx} className="bg-white p-2 rounded text-sm">
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-xs text-gray-600">{member.date} • {member.source}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* UK Church */}
        <div className="bg-gradient-to-br from-blue-50 to-red-50 border-4 border-blue-400 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-800">🇬🇧 UK Church</h3>
            <Church size={40} className="text-blue-600" />
          </div>
          
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-semibold">Current Members</span>
              <span className="text-4xl font-bold text-green-600">{churchGrowth.uk.current}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600 font-semibold">Goal</span>
              <span className="text-2xl font-bold text-purple-600">{churchGrowth.uk.goal}</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-6 rounded-full transition-all flex items-center justify-center text-white font-bold text-sm"
                style={{ width: `${churchGrowth.uk.current === 0 ? 0 : Math.min((churchGrowth.uk.current / churchGrowth.uk.goal) * 100, 100)}%` }}
              >
                {churchGrowth.uk.current === 0 ? '0%' : `${Math.round((churchGrowth.uk.current / churchGrowth.uk.goal) * 100)}%`}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 text-center">
              {churchGrowth.uk.current === 0 ? 'New church plant! 🌱' : `${churchGrowth.uk.goal - churchGrowth.uk.current} more to reach goal! 🎯`}
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-bold text-gray-700">Recent New Members:</h4>
            {churchGrowth.uk.newMembers.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No members added yet</p>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {churchGrowth.uk.newMembers.slice(-5).reverse().map((member, idx) => (
                  <div key={idx} className="bg-white p-2 rounded text-sm">
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-xs text-gray-600">{member.date} • {member.source}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Combined Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4">🌍 Combined Kingdom Impact</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-5xl font-bold mb-2">
              {churchGrowth.nigeria.current + churchGrowth.uk.current}
            </p>
            <p className="text-lg">Total Members</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold mb-2">
              {churchGrowth.nigeria.goal + churchGrowth.uk.goal}
            </p>
            <p className="text-lg">Combined Goal</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold mb-2">
              {churchGrowth.nigeria.newMembers.length + churchGrowth.uk.newMembers.length}
            </p>
            <p className="text-lg">New This Year</p>
          </div>
        </div>
      </div>

      {/* Add New Member Form */}
      <div className="bg-white border-2 border-green-300 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <UserPlus size={24} className="text-green-600" />
          Add New Member
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-2">Location</label>
            <select
              value={newMember.location}
              onChange={(e) => setNewMember({...newMember, location: e.target.value as 'nigeria' | 'uk'})}
              className="w-full p-3 border rounded-lg"
            >
              <option value="nigeria">🇳🇬 Nigeria Church</option>
              <option value="uk">🇬🇧 UK Church</option>
            </select>
          </div>
          
          <div>
            <label className="block font-semibold mb-2">Member Name</label>
            <input
              type="text"
              value={newMember.name}
              onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              placeholder="Full name"
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-2">Date Joined</label>
            <input
              type="date"
              value={newMember.date}
              onChange={(e) => setNewMember({...newMember, date: e.target.value})}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block font-semibold mb-2">How They Found Us</label>
            <select
              value={newMember.source}
              onChange={(e) => setNewMember({...newMember, source: e.target.value})}
              className="w-full p-3 border rounded-lg"
            >
              <option value="service">Sunday Service</option>
              <option value="social">Social Media</option>
              <option value="friend">Friend/Family</option>
              <option value="event">Special Event</option>
              <option value="outreach">Community Outreach</option>
              <option value="online">Online Stream</option>
            </select>
          </div>
        </div>
        
        <textarea
          value={newMember.notes}
          onChange={(e) => setNewMember({...newMember, notes: e.target.value})}
          placeholder="Additional notes (prayer needs, background, etc.)"
          className="w-full p-3 border rounded-lg mb-4 h-20"
        />
        
        <button
          onClick={handleAddMember}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 text-lg transition-colors"
        >
          🎉 Add New Member to {newMember.location === 'nigeria' ? 'Nigeria' : 'UK'} Church
        </button>
      </div>

      {/* SERVICE COORDINATION */}
      <div className="bg-gradient-to-r from-orange-100 to-pink-100 border-2 border-orange-300 rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Calendar size={28} className="text-orange-600" />
          Combined Sunday Service Planning
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Service Date</label>
            <input
              type="date"
              value={newService.date}
              onChange={(e) => setNewService({...newService, date: e.target.value})}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">🇳🇬 Nigeria Theme/Focus</label>
              <input
                type="text"
                value={newService.nigeriaTheme}
                onChange={(e) => setNewService({...newService, nigeriaTheme: e.target.value})}
                placeholder="e.g., Faith in Action"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-2">🇬🇧 UK Theme/Focus</label>
              <input
                type="text"
                value={newService.ukTheme}
                onChange={(e) => setNewService({...newService, ukTheme: e.target.value})}
                placeholder="e.g., Faith in Action"
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          
          <div>
            <label className="block font-semibold mb-2">📖 Shared Scripture Reading</label>
            <input
              type="text"
              value={newService.sharedScripture}
              onChange={(e) => setNewService({...newService, sharedScripture: e.target.value})}
              placeholder="e.g., James 2:14-26"
              className="w-full p-3 border rounded-lg"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Preacher/Speaker</label>
              <input
                type="text"
                value={newService.preacher}
                onChange={(e) => setNewService({...newService, preacher: e.target.value})}
                placeholder="Name and location"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-2">Stream Link (if applicable)</label>
              <input
                type="url"
                value={newService.streamLink}
                onChange={(e) => setNewService({...newService, streamLink: e.target.value})}
                placeholder="https://..."
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          
          <div>
            <label className="block font-semibold mb-2">Special Notes</label>
            <textarea
              value={newService.specialNotes}
              onChange={(e) => setNewService({...newService, specialNotes: e.target.value})}
              placeholder="Communion, baptism, special guest, prayer focus, etc."
              className="w-full p-3 border rounded-lg h-20"
            />
          </div>
          
          <button
            onClick={handleAddService}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors"
          >
            Schedule Combined Service
          </button>
        </div>
      </div>

      {/* Upcoming Services */}
      {services.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold">🗓️ Upcoming Services ({services.length})</h3>
          {services.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(service => (
            <div key={service.id} className="bg-white border-2 border-orange-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-2xl font-bold text-orange-600">{service.date}</p>
                  {service.preacher && (
                    <p className="text-sm text-gray-500">Preacher: {service.preacher}</p>
                  )}
                </div>
                {service.streamLink && (
                  <a 
                    href={service.streamLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-semibold transition-colors"
                  >
                    🎥 Stream Link
                  </a>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-bold text-green-800 mb-1">🇳🇬 Nigeria</p>
                  <p className="text-gray-700">{service.nigeriaTheme || 'No specific theme'}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-bold text-blue-800 mb-1">🇬🇧 UK</p>
                  <p className="text-gray-700">{service.ukTheme || 'No specific theme'}</p>
                </div>
              </div>
              
              {service.sharedScripture && (
                <div className="bg-purple-50 p-3 rounded mb-3">
                  <p className="font-bold text-purple-800 mb-1">📖 Shared Scripture</p>
                  <p className="text-gray-700">{service.sharedScripture}</p>
                </div>
              )}
              
              {service.specialNotes && (
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-bold text-gray-800 mb-1">Special Notes</p>
                  <p className="text-gray-700 text-sm">{service.specialNotes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TESTIMONY SHARING */}
      <div className="bg-gradient-to-r from-green-100 to-teal-100 border-2 border-green-300 rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <MessageCircleHeart size={28} className="text-green-600" />
          Cross-Ocean Testimony Sharing
        </h3>
        <p className="text-gray-700 mb-4">Build unity by sharing what God is doing in both locations!</p>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">From Location</label>
              <select
                value={newSharedTestimony.fromLocation}
                onChange={(e) => setNewSharedTestimony({...newSharedTestimony, fromLocation: e.target.value as 'nigeria' | 'uk'})}
                className="w-full p-3 border rounded-lg"
              >
                <option value="nigeria">🇳🇬 Nigeria Church</option>
                <option value="uk">🇬🇧 UK Church</option>
              </select>
            </div>
            
            <div>
              <label className="block font-semibold mb-2">Person's Name</label>
              <input
                type="text"
                value={newSharedTestimony.person}
                onChange={(e) => setNewSharedTestimony({...newSharedTestimony, person: e.target.value})}
                placeholder="Name or 'Anonymous'"
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          
          <div>
            <label className="block font-semibold mb-2">Testimony Category</label>
            <select
              value={newSharedTestimony.category}
              onChange={(e) => setNewSharedTestimony({...newSharedTestimony, category: e.target.value})}
              className="w-full p-3 border rounded-lg"
            >
              <option value="salvation">Salvation</option>
              <option value="healing">Healing</option>
              <option value="provision">Provision</option>
              <option value="deliverance">Deliverance</option>
              <option value="restoration">Restoration</option>
              <option value="calling">Calling/Purpose</option>
            </select>
          </div>
          
          <div>
            <label className="block font-semibold mb-2">Testimony</label>
            <textarea
              value={newSharedTestimony.story}
              onChange={(e) => setNewSharedTestimony({...newSharedTestimony, story: e.target.value})}
              placeholder="What has God done?"
              className="w-full p-3 border rounded-lg h-32"
            />
          </div>
          
          <button
            onClick={handleAddTestimony}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            Add Testimony to Share
          </button>
        </div>
      </div>

      {/* Testimony Wall */}
      {sharedTestimonies.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold">💬 Shared Testimonies ({sharedTestimonies.length})</h3>
          {sharedTestimonies.map(testimony => (
            <div key={testimony.id} className={`border-2 rounded-lg p-4 ${
              testimony.fromLocation === 'nigeria' 
                ? 'bg-green-50 border-green-300' 
                : 'bg-blue-50 border-blue-300'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">
                      {testimony.fromLocation === 'nigeria' ? '🇳🇬' : '🇬🇧'}
                    </span>
                    <div>
                      <h4 className="font-bold text-lg">{testimony.person}</h4>
                      <p className="text-sm text-gray-600">
                        {testimony.date} • {testimony.category}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{testimony.story}</p>
                  
                  {testimony.sharedWith && testimony.impact && (
                    <div className="bg-green-100 border border-green-300 p-3 rounded">
                      <p className="font-bold text-green-800 text-sm mb-1">
                        ✓ Shared with {testimony.fromLocation === 'nigeria' ? 'UK' : 'Nigeria'} church
                      </p>
                      <p className="text-sm text-gray-700">{testimony.impact}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {!testimony.sharedWith && (
                <button
                  onClick={() => handleMarkShared(testimony.id)}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold transition-colors"
                >
                  Mark as Shared with {testimony.fromLocation === 'nigeria' ? 'UK 🇬🇧' : 'Nigeria 🇳🇬'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Unity Prayer */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-6 text-center">
        <p className="text-2xl font-bold mb-2">🙏 Unity Prayer</p>
        <p className="text-lg italic mb-2">
          "How good and pleasant it is when God's people live together in unity!"
        </p>
        <p className="font-semibold">Psalm 133:1</p>
        <p className="mt-4 text-sm">
          Two churches, one Spirit. Nigeria and UK united in Kingdom mission.
        </p>
      </div>
    </div>
  );
};

export default DualChurches;