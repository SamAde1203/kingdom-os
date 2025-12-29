// src/components/dashboard/TeamBuilder.tsx
import React, { useState } from 'react';
import { Users, UserPlus, Crown, Heart, Share2, Send } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: 'Seer' | 'Sharer' | 'Shepherd' | 'Sender';
}

const roleConfig = {
  Seer: { icon: Crown, color: 'from-purple-50 to-indigo-50 border-purple-300 text-purple-700', desc: 'Visionary • Teacher • Equips with truth' },
  Sharer: { icon: Share2, color: 'from-blue-50 to-cyan-50 border-blue-300 text-blue-700', desc: 'Evangelist • Proclaims the Gospel boldly' },
  Shepherd: { icon: Heart, color: 'from-green-50 to-emerald-50 border-green-300 text-green-700', desc: 'Pastor • Cares, disciples, restores' },
  Sender: { icon: Send, color: 'from-orange-50 to-red-50 border-orange-300 text-orange-700', desc: 'Apostle/Missionary • Plants, mobilizes, supports' }
};

const TeamBuilder: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState({ name: '', role: 'Seer' as TeamMember['role'] });

  const handleAddMember = () => {
    if (newMember.name.trim()) {
      setTeam([...team, { ...newMember, id: Date.now() }]);
      setNewMember({ name: '', role: 'Seer' });
    }
  };

  const teamByRole = team.reduce((acc, member) => {
    acc[member.role] = (acc[member.role] || 0) + 1;
    return acc;
  }, {} as Record<TeamMember['role'], number>);

  const totalMembers = team.length;
  const uniqueRoles = Object.keys(teamByRole).length;

  return (
    <div className="h-full w-full flex flex-col space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center gap-4">
          <Users size={48} className="text-purple-700" />
          4-Gift Ministry Team Builder
        </h2>
        <p className="text-xl text-gray-700 mb-4">
          Build a balanced team after the pattern of Ephesians 4:11–12
        </p>
        <p className="text-lg italic text-gray-600 bg-white/70 p-4 rounded-xl">
          "So Christ himself gave the apostles, the prophets, the evangelists, the pastors and teachers,
          to equip his people for works of service, so that the body of Christ may be built up."
          <br />
          <span className="font-semibold not-italic">— Ephesians 4:11–12</span>
        </p>
      </div>

      {/* Add Member Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <UserPlus className="text-blue-600" size={32} />
          Add Team Member
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Member Name</label>
            <input
              type="text"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleAddMember()}
              placeholder="e.g., Pastor John"
              className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Gift/Role</label>
            <select
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value as TeamMember['role'] })}
              className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <option value="Seer">Seer (Prophet/Teacher)</option>
              <option value="Sharer">Sharer (Evangelist)</option>
              <option value="Shepherd">Shepherd (Pastor)</option>
              <option value="Sender">Sender (Apostle/Missionary)</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleAddMember}
          disabled={!newMember.name.trim()}
          className="mt-8 w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 transition shadow-md flex items-center justify-center gap-3"
        >
          <UserPlus size={24} />
          Add to Team
        </button>
      </div>

      {/* Team Overview */}
      <div className="flex-1">
        {team.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-16 text-center">
            <Users size={80} className="text-gray-200 mx-auto mb-6" />
            <p className="text-2xl text-gray-500">Your team is empty.</p>
            <p className="text-lg text-gray-400 mt-3">Start building your Ephesians 4 team today!</p>
          </div>
        ) : (
          <div>
            {/* Team Balance Summary */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-lg mb-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Current Team Balance</h3>
              <p className="text-5xl md:text-6xl font-extrabold mb-2">{totalMembers}</p>
              <p className="text-xl opacity-90">Total Members • {uniqueRoles}/4 Gift Roles Represented</p>
            </div>

            {/* Role Groups */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(['Seer', 'Sharer', 'Shepherd', 'Sender'] as TeamMember['role'][]).map((role) => {
                const members = team.filter(m => m.role === role);
                const config = roleConfig[role];
                const Icon = config.icon;

                return (
                  <div
                    key={role}
                    className={`${config.color} rounded-2xl p-8 shadow-lg border-2 hover:shadow-xl transition-all`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-4 bg-white rounded-2xl shadow">
                          <Icon size={48} className={config.iconColor} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800">{role}s</h3>
                          <p className="text-sm text-gray-600">{config.desc}</p>
                        </div>
                      </div>
                      <span className="text-5xl font-extrabold text-gray-800">{members.length}</span>
                    </div>

                    {members.length === 0 ? (
                      <p className="text-center text-gray-500 italic py-8">No {role}s yet</p>
                    ) : (
                      <div className="space-y-3">
                        {members.map(member => (
                          <div key={member.id} className="bg-white/70 rounded-xl p-4">
                            <p className="font-semibold text-lg text-gray-800">{member.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Scripture Footer */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl p-8 text-center shadow-lg">
        <p className="text-2xl md:text-3xl italic mb-4 leading-relaxed">
          "From him the whole body, joined and held together by every supporting ligament,<br />
          grows and builds itself up in love, as each part does its work."
        </p>
        <p className="text-xl font-semibold">Ephesians 4:16 (NIV)</p>
      </div>
    </div>
  );
};

export default TeamBuilder;