import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface RiskScoreProps {
  score: number;
}

export default function RiskScore({ score }: RiskScoreProps) {
  const getRiskLevel = (score: number) => {
    if (score <= 30) return { level: 'Basso', color: 'green', icon: CheckCircle };
    if (score <= 60) return { level: 'Medio', color: 'yellow', icon: AlertCircle };
    return { level: 'Alto', color: 'red', icon: AlertTriangle };
  };

  const risk = getRiskLevel(score);
  const Icon = risk.icon;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`w-6 h-6 text-${risk.color}-500`} />
        <h3 className="text-xl font-bold text-gray-800">Punteggio di Rischio</h3>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2.51 * score} 251.2`}
              className={`text-${risk.color}-500 transition-all duration-1000 ease-out`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">{score}</span>
          </div>
        </div>
        
        <div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${risk.color}-100 text-${risk.color}-800 font-semibold mb-2`}>
            <Icon className="w-4 h-4" />
            Rischio {risk.level}
          </div>
          <p className="text-gray-600">
            {score <= 30 && "Progetto con basso rischio. Il brief sembra chiaro e ben strutturato."}
            {score > 30 && score <= 60 && "Progetto con rischio moderato. Alcuni aspetti necessitano chiarimenti."}
            {score > 60 && "Progetto ad alto rischio. Molti aspetti critici da chiarire prima di procedere."}
          </p>
        </div>
      </div>
    </div>
  );
}