// src/components/dashboard/Footer.tsx
import React from 'react';
import { Download, Save, Upload, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container-responsive py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Mission Statement */}
          <div className="text-center lg:text-left max-w-lg">
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
              <Heart size={18} className="text-red-400" />
              <p className="text-lg font-semibold text-white">Kingdom Mission</p>
            </div>
            <p className="italic text-gray-400 mb-2">
              "Faithfulness over fame. Fruit over followers. Kingdom over clicks."
            </p>
            <p className="text-sm text-gray-500">
              © {currentYear} KingdomOS - PHHM Ministry System v1.0
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => alert('Export feature coming soon!')}
              className="btn-primary flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600"
            >
              <Save size={16} />
              Export Data
            </button>
            
            <button
              onClick={() => alert('Import feature coming soon!')}
              className="btn-secondary flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600"
            >
              <Upload size={16} />
              Import Data
            </button>
            
            <button
              onClick={() => window.print()}
              className="btn-primary flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600"
            >
              <Download size={16} />
              Print Report
            </button>
          </div>
        </div>
        
        {/* Tech Stack */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
        
          <p className="text-xs text-gray-600 mt-1">
            For ministry use only. All data stored locally in your browser.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;