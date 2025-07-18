import React from 'react';
import { FileText, Zap, Search } from 'lucide-react';
import { AnalysisMode } from '../types';

interface BriefInputProps {
  brief: string;
  setBrief: (brief: string) => void;
  analysisMode: AnalysisMode;
  setAnalysisMode: (mode: AnalysisMode) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const ANALYSIS_MODES: AnalysisMode[] = [
  {
    type: 'quick',
    label: 'Quick Analysis',
    description: 'Analisi rapida per una valutazione immediata'
  },
  {
    type: 'deep',
    label: 'Deep Dive',
    description: 'Analisi approfondita con dettagli avanzati'
  }
];

export default function BriefInput({
  brief,
  setBrief,
  analysisMode,
  setAnalysisMode,
  onAnalyze,
  isAnalyzing
}: BriefInputProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Brief del Cliente</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Incolla qui il brief del cliente
          </label>
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Ciao, ho bisogno di un sito web per la mia azienda. Vorrei qualcosa di moderno e professionale. Il budget è flessibile e vorrei averlo pronto il prima possibile..."
            className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {brief.length} caratteri
            </span>
            {brief.length > 0 && (
              <span className={`text-sm ${brief.length < 100 ? 'text-orange-500' : 'text-green-500'}`}>
                {brief.length < 100 ? '⚠️ Brief molto corto' : '✅ Lunghezza adeguata'}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Modalità di Analisi
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ANALYSIS_MODES.map((mode) => (
              <button
                key={mode.type}
                onClick={() => setAnalysisMode(mode)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  analysisMode.type === mode.type
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {mode.type === 'quick' ? (
                    <Zap className="w-5 h-5 text-purple-500" />
                  ) : (
                    <Search className="w-5 h-5 text-purple-500" />
                  )}
                  <span className="font-semibold text-gray-800">{mode.label}</span>
                </div>
                <p className="text-sm text-gray-600 text-left">{mode.description}</p>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onAnalyze}
          disabled={!brief.trim() || isAnalyzing}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isAnalyzing ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Analizzando...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Analizza Brief
            </div>
          )}
        </button>
      </div>
    </div>
  );
}