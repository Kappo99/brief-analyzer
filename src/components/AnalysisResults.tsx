import React from 'react';
import { ProjectAnalysis } from '../types';
import RiskScore from './RiskScore';
import RedFlagsSection from './RedFlagsSection';
import ProjectDetails from './ProjectDetails';
import EmailTemplate from './EmailTemplate';
import SuggestedQuestions from './SuggestedQuestions';
import ExportButtons from './ExportButtons';

interface AnalysisResultsProps {
  analysis: ProjectAnalysis;
  onSave: () => void;
}

export default function AnalysisResults({ analysis, onSave }: AnalysisResultsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Risultati Analisi</h2>
        <ExportButtons analysis={analysis} onSave={onSave} />
      </div>

      <RiskScore score={analysis.riskScore} />
      
      <RedFlagsSection redFlags={analysis.redFlags} />
      
      <ProjectDetails analysis={analysis} />
      
      <SuggestedQuestions questions={analysis.suggestedQuestions} />
      
      <EmailTemplate template={analysis.emailTemplate} />
    </div>
  );
}