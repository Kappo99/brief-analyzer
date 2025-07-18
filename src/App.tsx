import React, { useState, useEffect } from 'react';
import { Brain, FileText, BarChart3 } from 'lucide-react';
import BriefInput from './components/BriefInput';
import AnalysisResults from './components/AnalysisResults';
import SavedBriefs from './components/SavedBriefs';
import { analyzeBrief } from './utils/briefAnalyzer';
import { saveBrief, getSavedBriefs } from './utils/storage';
import { ProjectAnalysis, AnalysisMode, SavedBrief } from './types';

function App() {
  const [brief, setBrief] = useState('');
  const [analysis, setAnalysis] = useState<ProjectAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>({
    type: 'quick',
    label: 'Quick Analysis',
    description: 'Analisi rapida per una valutazione immediata'
  });
  const [savedBriefs, setSavedBriefs] = useState<SavedBrief[]>([]);
  const [activeTab, setActiveTab] = useState<'analyze' | 'saved'>('analyze');

  useEffect(() => {
    setSavedBriefs(getSavedBriefs());
  }, []);

  const handleAnalyze = async () => {
    if (!brief.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simula il tempo di analisi per mostrare il loading
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = analyzeBrief(brief, analysisMode.type);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleSave = () => {
    if (!analysis) return;
    
    const savedBrief: SavedBrief = {
      id: Date.now().toString(),
      title: `Brief ${new Date().toLocaleDateString('it-IT')}`,
      content: brief,
      analysis,
      createdAt: new Date().toISOString()
    };
    
    saveBrief(savedBrief);
    setSavedBriefs(getSavedBriefs());
  };

  const handleLoadBrief = (savedBrief: SavedBrief) => {
    setBrief(savedBrief.content);
    setAnalysis(savedBrief.analysis);
    setActiveTab('analyze');
  };

  const updateSavedBriefs = () => {
    setSavedBriefs(getSavedBriefs());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Brief Analyzer</h1>
                <p className="text-gray-600">Analizza i brief dei clienti e identifica i rischi</p>
              </div>
            </div>
            
            <nav className="flex gap-2">
              <button
                onClick={() => setActiveTab('analyze')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'analyze'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                Analizza
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'saved'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Salvati ({savedBriefs.length})
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'analyze' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Input Section */}
            <div>
              <BriefInput
                brief={brief}
                setBrief={setBrief}
                analysisMode={analysisMode}
                setAnalysisMode={setAnalysisMode}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
            </div>

            {/* Results Section */}
            <div>
              {analysis ? (
                <AnalysisResults analysis={analysis} onSave={handleSave} />
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-12 h-12 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Pronto per l'Analisi
                    </h3>
                    <p className="text-gray-600">
                      Incolla il brief del cliente e clicca "Analizza Brief" per iniziare
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <SavedBriefs
            savedBriefs={savedBriefs}
            onLoad={handleLoadBrief}
            onUpdate={updateSavedBriefs}
          />
        )}
      </main>
    </div>
  );
}

export default App;
