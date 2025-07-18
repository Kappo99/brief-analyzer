import React, { useState } from 'react';
import { HelpCircle, Copy, Check } from 'lucide-react';

interface SuggestedQuestionsProps {
  questions: string[];
}

export default function SuggestedQuestions({ questions }: SuggestedQuestionsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyQuestion = (question: string, index: number) => {
    navigator.clipboard.writeText(question);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllQuestions = () => {
    const allQuestions = questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    navigator.clipboard.writeText(allQuestions);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <HelpCircle className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Domande Suggerite</h3>
        </div>
        <button
          onClick={copyAllQuestions}
          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {copiedIndex === -1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copia Tutte
        </button>
      </div>

      <p className="text-gray-600 mb-4">
        Usa queste domande per ottenere maggiori dettagli dal cliente e ridurre i rischi del progetto.
      </p>

      <div className="space-y-3">
        {questions.map((question, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-sm rounded-full flex items-center justify-center font-medium">
                {index + 1}
              </span>
              <p className="text-gray-700">{question}</p>
            </div>
            <button
              onClick={() => copyQuestion(question, index)}
              className="ml-3 p-2 text-gray-400 hover:text-blue-500 transition-colors"
              title="Copia domanda"
            >
              {copiedIndex === index ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}