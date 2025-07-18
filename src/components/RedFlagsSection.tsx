import React from 'react';
import { RedFlag } from '../types';
import { AlertTriangle } from 'lucide-react';

interface RedFlagsSectionProps {
  redFlags: RedFlag[];
}

export default function RedFlagsSection({ redFlags }: RedFlagsSectionProps) {
  if (redFlags.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <span className="text-2xl">✅</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800">Nessuna Red Flag Rilevata</h3>
            <p className="text-green-600">Il brief sembra ben strutturato e completo!</p>
          </div>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: RedFlag['severity']) => {
    switch (severity) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'orange';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-100 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          Red Flags Rilevate ({redFlags.length})
        </h3>
      </div>

      <div className="space-y-4">
        {redFlags.map((flag) => {
          const color = getSeverityColor(flag.severity);
          return (
            <div
              key={flag.id}
              className={`border-l-4 border-${color}-500 bg-${color}-50 p-4 rounded-r-xl`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{flag.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-800">{flag.title}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${color}-200 text-${color}-800`}>
                      {flag.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{flag.description}</p>
                  <div className={`bg-${color}-100 p-3 rounded-lg`}>
                    <p className="text-sm font-medium text-gray-700">
                      💡 Suggerimento: {flag.suggestion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}