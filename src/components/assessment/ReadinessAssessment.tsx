// src/components/assessment/ReadinessAssessment.tsx
import React, { useState } from 'react';
import { Shield, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { AssessmentScore } from '../../types/ministry';
import { calculateReadiness } from '../../utils/validation';

const ReadinessAssessment: React.FC = () => {
  const [assessmentScores, setAssessmentScores] = useState<AssessmentScore>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const assessmentCategories = [
    {
      name: 'Spiritual Foundation',
      icon: Shield,
      questions: [
        { id: 'sf1', text: 'Do you have active prayer covering for this ministry?', weight: 'critical' },
        { id: 'sf2', text: 'Are you submitted to local church leadership?', weight: 'critical' },
        { id: 'sf3', text: 'Do you have regular spiritual accountability?', weight: 'critical' },
        { id: 'sf4', text: 'Is your personal walk with God healthy?', weight: 'critical' },
        { id: 'sf5', text: 'Are you creating from overflow, not obligation?', weight: 'important' }
      ]
    },
    // Add other categories from your original code
  ];

  const handleAssessmentChange = (questionId: string, value: 'yes' | 'no') => {
    setAssessmentScores(prev => ({ ...prev, [questionId]: value }));
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const readiness = calculateReadiness(assessmentScores, assessmentCategories);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Shield size={28} />
          Ministry Readiness Assessment
        </h2>
        <p className="text-gray-700">Evaluate your foundation before launching new initiatives</p>
      </div>

      {/* Readiness Score Display */}
      {Object.keys(assessmentScores).length > 0 && (
        <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Your Readiness Score</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Critical Elements</span>
                <span className={`text-2xl font-bold ${readiness.color}`}>
                  {Math.round(readiness.criticalPercent)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-purple-600 h-4 rounded-full transition-all"
                  style={{ width: `${readiness.criticalPercent}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Overall Readiness</span>
                <span className={`text-2xl font-bold ${readiness.color}`}>
                  {Math.round(readiness.overallPercent)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all"
                  style={{ width: `${readiness.overallPercent}%` }}
                />
              </div>
            </div>
          </div>
          <div className={`mt-4 p-4 rounded-lg ${readiness.status.includes('Ready') ? 'bg-green-100' : 'bg-yellow-100'}`}>
            <p className={`text-lg font-bold ${readiness.color}`}>{readiness.status}</p>
            <p className="text-gray-700 mt-1">{readiness.message}</p>
          </div>
        </div>
      )}

      {/* Assessment Questions */}
      {assessmentCategories.map(category => {
        const Icon = category.icon;
        return (
          <div key={category.name} className="bg-white border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(category.name)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className="text-purple-600" size={24} />
                <h3 className="text-lg font-bold">{category.name}</h3>
              </div>
              {expandedSections[category.name] ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            {expandedSections[category.name] && (
              <div className="p-4 space-y-4">
                {category.questions.map(q => (
                  <div key={q.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{q.text}</p>
                      <span className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                        q.weight === 'critical' ? 'bg-red-100 text-red-700' :
                        q.weight === 'important' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {q.weight.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAssessmentChange(q.id, 'yes')}
                        className={`px-4 py-2 rounded font-semibold transition-colors ${
                          assessmentScores[q.id] === 'yes'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-green-100'
                        }`}
                      >
                        <Check size={20} />
                      </button>
                      <button
                        onClick={() => handleAssessmentChange(q.id, 'no')}
                        className={`px-4 py-2 rounded font-semibold transition-colors ${
                          assessmentScores[q.id] === 'no'
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-red-100'
                        }`}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReadinessAssessment;