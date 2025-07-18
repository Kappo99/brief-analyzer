import React from 'react';
import { Download, Save } from 'lucide-react';
import { ProjectAnalysis } from '../types';
import { exportToJSON } from '../utils/storage';

interface ExportButtonsProps {
  analysis: ProjectAnalysis;
  onSave: () => void;
}

export default function ExportButtons({ analysis, onSave }: ExportButtonsProps) {
  const handleExportJSON = () => {
    exportToJSON(analysis);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={onSave}
        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        <Save className="w-4 h-4" />
        Salva
      </button>
      <button
        onClick={handleExportJSON}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Download className="w-4 h-4" />
        Esporta JSON
      </button>
    </div>
  );
}