import React from 'react';
import { ProjectAnalysis } from '../types';
import { Code, User, Clock, Euro, Calendar } from 'lucide-react';

interface ProjectDetailsProps {
  analysis: ProjectAnalysis;
}

export default function ProjectDetails({ analysis }: ProjectDetailsProps) {
  const getPersonalityInfo = (personality: ProjectAnalysis['clientPersonality']) => {
    switch (personality) {
      case 'collaborative':
        return { icon: '🤝', label: 'Collaborativo', color: 'green', description: 'Cliente aperto al dialogo e alla collaborazione' };
      case 'difficult':
        return { icon: '⚠️', label: 'Difficile', color: 'red', description: 'Possibili difficoltà di comunicazione' };
      default:
        return { icon: '😐', label: 'Neutrale', color: 'gray', description: 'Personalità non chiaramente definita' };
    }
  };

  const personality = getPersonalityInfo(analysis.clientPersonality);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Dettagli del Progetto</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tipo di Progetto */}
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-gray-800">Tipo di Progetto</span>
          </div>
          <p className="text-blue-700 font-medium capitalize">{analysis.projectType}</p>
        </div>

        {/* Personalità Cliente */}
        <div className={`bg-${personality.color}-50 p-4 rounded-xl`}>
          <div className="flex items-center gap-2 mb-2">
            <User className={`w-5 h-5 text-${personality.color}-500`} />
            <span className="font-semibold text-gray-800">Cliente</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">{personality.icon}</span>
            <span className={`text-${personality.color}-700 font-medium`}>{personality.label}</span>
          </div>
          <p className={`text-sm text-${personality.color}-600 mt-1`}>{personality.description}</p>
        </div>

        {/* Ore Stimate */}
        <div className="bg-purple-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-purple-500" />
            <span className="font-semibold text-gray-800">Ore Stimate</span>
          </div>
          <p className="text-purple-700 font-medium">{analysis.estimatedHours}h</p>
        </div>

        {/* Budget Suggerito */}
        <div className="bg-green-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Euro className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-gray-800">Budget Suggerito</span>
          </div>
          <p className="text-green-700 font-medium">{analysis.suggestedBudget}</p>
        </div>

        {/* Timeline */}
        <div className="bg-orange-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-gray-800">Timeline</span>
          </div>
          <p className="text-orange-700 font-medium">{analysis.timeline}</p>
        </div>
      </div>

      {/* Requisiti Tecnici */}
      {analysis.technicalRequirements.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-800 mb-3">Requisiti Tecnici Identificati</h4>
          <div className="space-y-3">
            {analysis.technicalRequirements.map((req, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <h5 className="font-medium text-gray-700 mb-2">{req.category}</h5>
                <div className="flex flex-wrap gap-2">
                  {req.requirements.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}