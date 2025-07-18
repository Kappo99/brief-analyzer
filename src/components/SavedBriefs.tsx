import React from 'react';
import { SavedBrief } from '../types';
import { Trash2, Eye, Calendar } from 'lucide-react';
import { deleteBrief } from '../utils/storage';

interface SavedBriefsProps {
  savedBriefs: SavedBrief[];
  onLoad: (brief: SavedBrief) => void;
  onUpdate: () => void;
}

export default function SavedBriefs({ savedBriefs, onLoad, onUpdate }: SavedBriefsProps) {
  const handleDelete = (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questo brief?')) {
      deleteBrief(id);
      onUpdate();
    }
  };

  if (savedBriefs.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Brief Salvati</h3>
        <p className="text-gray-500 text-center py-8">Nessun brief salvato ancora.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Brief Salvati ({savedBriefs.length})</h3>
      
      <div className="space-y-4">
        {savedBriefs.map((brief) => (
          <div key={brief.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">{brief.title}</h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {brief.content.substring(0, 150)}...
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(brief.createdAt).toLocaleDateString('it-IT')}
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    brief.analysis.riskScore <= 30 ? 'bg-green-100 text-green-700' :
                    brief.analysis.riskScore <= 60 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    Rischio: {brief.analysis.riskScore}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => onLoad(brief)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Carica brief"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(brief.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Elimina brief"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}