// src/components/dashboard/ContentPlanner.tsx
import React, { useState } from 'react';
import { Target, Plus, Calendar, Lightbulb } from 'lucide-react';

const ContentPlanner: React.FC = () => {
  const [ideas, setIdeas] = useState<Array<{ id: number; title: string }>>([]);
  const [newIdea, setNewIdea] = useState('');

  const handleAddIdea = () => {
    if (newIdea.trim()) {
      setIdeas([...ideas, { id: Date.now(), title: newIdea.trim() }]);
      setNewIdea('');
    }
  };

  return (
    <div className="h-full w-full flex flex-col space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 flex items-center gap-4">
          <Target size={40} className="text-purple-700" />
          Content Planner
        </h2>
        <p className="text-xl text-gray-700">
          Plan discipleship-focused content that bears lasting fruit
        </p>
        <p className="text-sm text-gray-600 mt-2 italic">
          "Content that passes the 3-Fruit Filter: Glorifies God • Edifies Believers • Reaches the Lost"
        </p>
      </div>

      {/* Add New Idea Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Lightbulb className="text-yellow-500" size={32} />
          Add New Content Idea
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newIdea}
            onChange={(e) => setNewIdea(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddIdea()}
            placeholder="e.g., Sermon series on 'Faith in Trials', Instagram Reel on Grace, Blog post on Prayer..."
            className="flex-1 px-5 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition"
          />
          <button
            onClick={handleAddIdea}
            className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-700 hover:shadow-lg transition flex items-center justify-center gap-3"
          >
            <Plus size={24} />
            Add Idea
          </button>
        </div>
      </div>

      {/* Ideas List */}
      <div className="flex-1">
        {ideas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-12 text-center">
            <Calendar size={64} className="text-gray-300 mx-auto mb-6" />
            <p className="text-xl text-gray-500">No content ideas yet.</p>
            <p className="text-gray-400 mt-2">Start by adding your first idea above!</p>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="text-blue-600" size={32} />
              Your Content Ideas ({ideas.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-xl hover:border-purple-300 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Lightbulb className="text-purple-600" size={24} />
                    </div>
                    <p className="text-lg text-gray-800 font-medium">{idea.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scripture Footer */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 text-center shadow-lg">
        <p className="text-2xl md:text-3xl italic mb-4 leading-relaxed">
          "Let your light shine before others,<br />
          that they may see your good deeds and glorify your Father in heaven."
        </p>
        <p className="text-xl font-semibold">Matthew 5:16 (NIV)</p>
      </div>
    </div>
  );
};

export default ContentPlanner;