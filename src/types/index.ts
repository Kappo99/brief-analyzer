export interface RedFlag {
  id: string;
  type: 'budget' | 'timeline' | 'scope' | 'communication' | 'technical';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  suggestion: string;
  icon: string;
}

export interface TechnicalRequirement {
  category: string;
  requirements: string[];
}

export interface ProjectAnalysis {
  redFlags: RedFlag[];
  technicalRequirements: TechnicalRequirement[];
  projectType: string;
  clientPersonality: 'collaborative' | 'difficult' | 'neutral';
  riskScore: number;
  estimatedHours: number;
  suggestedBudget: string;
  timeline: string;
  suggestedQuestions: string[];
  emailTemplate: string;
}

export interface AnalysisMode {
  type: 'quick' | 'deep';
  label: string;
  description: string;
}

export interface SavedBrief {
  id: string;
  title: string;
  content: string;
  analysis: ProjectAnalysis;
  createdAt: string;
}