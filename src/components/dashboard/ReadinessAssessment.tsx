// src/components/dashboard/ReadinessAssessment.tsx
import React, { useState } from 'react';
import { Shield, ChevronRight, ChevronLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  text: string;
}

const questions: Question[] = [
  // Spiritual Foundation (1-5)
  { id: 1, category: 'Spiritual', text: 'We have a clear vision from God confirmed by Scripture and leadership' },
  { id: 2, category: 'Spiritual', text: 'Our leadership is under spiritual authority and accountability' },
  { id: 3, category: 'Spiritual', text: 'We prioritize prayer and fasting in all decision-making' },
  { id: 4, category: 'Spiritual', text: 'Our doctrine is biblically sound and clearly defined' },
  { id: 5, category: 'Spiritual', text: 'We have unity in the Spirit among core leaders' },

  // Team Structure (6-10)
  { id: 6, category: 'Team', text: 'We have identified and equipped key ministry roles' },
  { id: 7, category: 'Team', text: 'Team members understand spiritual gifts and operate in them' },
  { id: 8, category: 'Team', text: 'We have regular team discipleship and care' },
  { id: 9, category: 'Team', text: 'Conflict resolution processes are in place and biblical' },
  { id: 10, category: 'Team', text: 'Succession planning is considered for sustainability' },

  // Content & Strategy (11-15)
  { id: 11, category: 'Content', text: 'Our content strategy passes the "3-Fruit Filter" (Glorify God, Edify Believers, Reach Lost)' },
  { id: 12, category: 'Content', text: 'We have clear boundaries for online engagement and controversy' },
  { id: 13, category: 'Content', text: 'Content calendar and approval process are established' },
  { id: 14, category: 'Content', text: 'We track engagement and fruit, not just metrics' },
  { id: 15, category: 'Content', text: 'Discipleship pathway beyond content consumption exists' },

  // Operations & Crisis (16-20)
  { id: 16, category: 'Operations', text: 'Legal structure, insurance, and child protection policies are in place' },
  { id: 17, category: 'Operations', text: 'Financial systems are transparent and accountable' },
  { id: 18, category: 'Crisis', text: 'We have a crisis response plan for online attacks or controversy' },
  { id: 19, category: 'Crisis', text: 'Pastoral care system for counselees/followers is ready' },
  { id: 20, category: 'Crisis', text: 'We are prepared to hand off new believers to local churches' }
];

const ReadinessAssessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0));
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const percentage = Math.round((totalScore / (questions.length * 5)) * 100);

  const getReadinessLevel = () => {
    if (percentage >= 90) return { level: 'Launch Ready', color: 'text-green-600', desc: 'Your ministry is strongly prepared!' };
    if (percentage >= 75) return { level: 'Nearly Ready', color: 'text-blue-600', desc: 'Minor adjustments needed — go with wisdom' };
    if (percentage >= 60) return { level: 'Preparation Needed', color: 'text-yellow-600', desc: 'Focus on weak areas before launch' };
    return { level: 'Major Foundation Work', color: 'text-red-600', desc: 'Strengthen core areas first' };
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(0));
    setShowResults(false);
  };

  if (showResults) {
    const readiness = getReadinessLevel();

    return (
      <div className="h-full w-full flex flex-col space-y-6 overflow-y-auto">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-8 rounded-2xl shadow-md text-center">
          <Shield size={60} className="text-purple-700 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Assessment Complete!</h2>
          <p className="text-2xl text-gray-700">Your Ministry Readiness Score</p>
          <p className={`text-7xl font-extrabold mt-6 ${readiness.color}`}>{percentage}%</p>
          <p className={`text-3xl font-bold mt-4 ${readiness.color}`}>{readiness.level}</p>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">{readiness.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle2 className="text-green-600" size={32} />
              Strengths (4–5 scores)
            </h3>
            {/* List strong areas */}
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <AlertCircle className="text-yellow-600" size={32} />
              Areas to Strengthen (1–2 scores)
            </h3>
            {/* List weak areas */}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center shadow-lg">
          <p className="text-2xl md:text-3xl italic mb-4">
            "Unless the Lord builds the house,<br />
            the builders labor in vain."
          </p>
          <p className="text-xl font-semibold">Psalm 127:1</p>
        </div>

        <button
          onClick={resetAssessment}
          className="w-full max-w-md mx-auto bg-purple-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-purple-700 shadow-lg"
        >
          Take Assessment Again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="h-full w-full flex flex-col space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center gap-4">
          <Shield size={48} className="text-purple-700" />
          Ministry Readiness Assessment
        </h2>
        <p className="text-xl text-gray-700">
          Evaluate 20 critical areas before launching your digital ministry
        </p>
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Current Question */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold text-sm">
            {question.category} Foundation
          </span>
          <p className="text-2xl md:text-3xl font-medium text-gray-800 mt-8 leading-relaxed">
            {question.text}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              onClick={() => handleAnswer(score)}
              className="bg-gray-50 border-2 border-gray-300 rounded-2xl p-6 hover:border-purple-500 hover:bg-purple-50 hover:scale-105 transition-all duration-300"
            >
              <p className="text-4xl font-bold text-gray-700 mb-2">{score}</p>
              <p className="text-sm text-gray-600">
                {score === 1 && 'Strongly Disagree'}
                {score === 2 && 'Disagree'}
                {score === 3 && 'Neutral'}
                {score === 4 && 'Agree'}
                {score === 5 && 'Strongly Agree'}
              </p>
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-12">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          <button
            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Scripture */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8 text-center shadow-lg">
        <p className="text-2xl md:text-3xl italic mb-4">
          "Plans fail for lack of counsel,<br />
          but with many advisers they succeed."
        </p>
        <p className="text-xl font-semibold">Proverbs 15:22</p>
      </div>
    </div>
  );
};

export default ReadinessAssessment;