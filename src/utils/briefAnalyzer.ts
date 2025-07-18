import { ProjectAnalysis, RedFlag, TechnicalRequirement } from '../types';

const RED_FLAGS_DATABASE: Omit<RedFlag, 'id'>[] = [
  {
    type: 'budget',
    severity: 'high',
    title: 'Budget Vago',
    description: 'Il cliente non ha specificato un budget chiaro o ha usato termini vaghi come "economico" o "ragionevole".',
    suggestion: 'Richiedi un range di budget specifico prima di procedere con la proposta.',
    icon: '💰'
  },
  {
    type: 'timeline',
    severity: 'high',
    title: 'Timeline Irrealistica',
    description: 'Il cliente richiede tempi di consegna troppo stretti per la complessità del progetto.',
    suggestion: 'Proponi una timeline realistica e spiega i motivi dei tempi necessari.',
    icon: '⏰'
  },
  {
    type: 'scope',
    severity: 'medium',
    title: 'Scope Creep Potenziale',
    description: 'Il brief contiene richieste vaghe che potrebbero espandersi durante il progetto.',
    suggestion: 'Definisci chiaramente cosa è incluso e cosa non è incluso nel progetto.',
    icon: '📈'
  },
  {
    type: 'communication',
    severity: 'medium',
    title: 'Comunicazione Problematica',
    description: 'Il tono del messaggio suggerisce possibili difficoltà di comunicazione.',
    suggestion: 'Stabilisci canali di comunicazione chiari e frequenza degli aggiornamenti.',
    icon: '💬'
  },
  {
    type: 'technical',
    severity: 'low',
    title: 'Requisiti Tecnici Vaghi',
    description: 'I requisiti tecnici non sono chiaramente specificati.',
    suggestion: 'Richiedi specifiche tecniche dettagliate prima di iniziare.',
    icon: '⚙️'
  }
];

const TECHNICAL_PATTERNS = {
  web: ['sito web', 'website', 'landing page', 'e-commerce', 'blog', 'cms'],
  mobile: ['app mobile', 'applicazione', 'ios', 'android', 'react native', 'flutter'],
  branding: ['logo', 'brand', 'identità visiva', 'corporate identity', 'branding'],
  design: ['ui/ux', 'design', 'interfaccia', 'grafica', 'layout', 'mockup'],
  saas: ['saas', 'dashboard', 'piattaforma', 'software', 'gestionale']
};

const RISK_KEYWORDS = {
  budget: ['economico', 'low budget', 'poco budget', 'gratis', 'baratto', 'scambio'],
  timeline: ['urgente', 'subito', 'ieri', 'asap', 'rush', 'veloce'],
  scope: ['tutto', 'completo', 'full', 'anche', 'inoltre', 'magari'],
  communication: ['pretendo', 'voglio', 'deve', 'obbligatorio', 'non accetto']
};

export function analyzeBrief(brief: string, mode: 'quick' | 'deep' = 'quick'): ProjectAnalysis {
  const lowerBrief = brief.toLowerCase();
  
  // Analisi Red Flags
  const redFlags = detectRedFlags(lowerBrief);
  
  // Analisi tipo di progetto
  const projectType = detectProjectType(lowerBrief);
  
  // Analisi personalità cliente
  const clientPersonality = analyzeClientPersonality(lowerBrief);
  
  // Calcolo risk score
  const riskScore = calculateRiskScore(redFlags, brief.length);
  
  // Requisiti tecnici
  const technicalRequirements = extractTechnicalRequirements(lowerBrief, projectType);
  
  // Stime
  const estimates = generateEstimates(projectType, brief.length, riskScore);
  
  // Domande suggerite
  const suggestedQuestions = generateQuestions(redFlags, projectType);
  
  // Template email
  const emailTemplate = generateEmailTemplate(projectType, redFlags);

  return {
    redFlags,
    technicalRequirements,
    projectType,
    clientPersonality,
    riskScore,
    estimatedHours: estimates.hours,
    suggestedBudget: estimates.budget,
    timeline: estimates.timeline,
    suggestedQuestions,
    emailTemplate
  };
}

function detectRedFlags(brief: string): RedFlag[] {
  const flags: RedFlag[] = [];
  
  Object.entries(RISK_KEYWORDS).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      if (brief.includes(keyword)) {
        const flagTemplate = RED_FLAGS_DATABASE.find(flag => flag.type === category);
        if (flagTemplate) {
          flags.push({
            ...flagTemplate,
            id: `${category}-${keyword}-${Date.now()}`
          });
        }
      }
    });
  });

  // Controlli aggiuntivi
  if (brief.length < 100) {
    flags.push({
      id: `brief-short-${Date.now()}`,
      type: 'communication',
      severity: 'medium',
      title: 'Brief Troppo Corto',
      description: 'Il brief è molto breve e potrebbe mancare di dettagli importanti.',
      suggestion: 'Richiedi maggiori dettagli sul progetto e sugli obiettivi.',
      icon: '📝'
    });
  }

  if (!brief.includes('budget') && !brief.includes('prezzo') && !brief.includes('costo')) {
    flags.push({
      id: `no-budget-${Date.now()}`,
      type: 'budget',
      severity: 'high',
      title: 'Budget Non Menzionato',
      description: 'Il cliente non ha menzionato alcun budget o range di prezzo.',
      suggestion: 'Chiedi esplicitamente il budget disponibile per il progetto.',
      icon: '💰'
    });
  }

  return flags;
}

function detectProjectType(brief: string): string {
  for (const [type, keywords] of Object.entries(TECHNICAL_PATTERNS)) {
    if (keywords.some(keyword => brief.includes(keyword))) {
      return type;
    }
  }
  return 'generale';
}

function analyzeClientPersonality(brief: string): 'collaborative' | 'difficult' | 'neutral' {
  const difficultKeywords = ['pretendo', 'voglio', 'deve', 'obbligatorio', 'non accetto'];
  const collaborativeKeywords = ['collaborare', 'insieme', 'feedback', 'suggerimenti'];
  
  const difficultCount = difficultKeywords.filter(keyword => brief.includes(keyword)).length;
  const collaborativeCount = collaborativeKeywords.filter(keyword => brief.includes(keyword)).length;
  
  if (difficultCount > collaborativeCount && difficultCount > 0) return 'difficult';
  if (collaborativeCount > difficultCount && collaborativeCount > 0) return 'collaborative';
  return 'neutral';
}

function calculateRiskScore(redFlags: RedFlag[], briefLength: number): number {
  let score = 0;
  
  redFlags.forEach(flag => {
    switch (flag.severity) {
      case 'high': score += 25; break;
      case 'medium': score += 15; break;
      case 'low': score += 5; break;
    }
  });
  
  // Penalità per brief troppo corti
  if (briefLength < 100) score += 20;
  if (briefLength < 50) score += 30;
  
  return Math.min(score, 100);
}

function extractTechnicalRequirements(brief: string, projectType: string): TechnicalRequirement[] {
  const requirements: TechnicalRequirement[] = [];
  
  switch (projectType) {
    case 'web':
      requirements.push({
        category: 'Frontend',
        requirements: ['HTML/CSS', 'JavaScript', 'Responsive Design']
      });
      if (brief.includes('cms') || brief.includes('gestione contenuti')) {
        requirements.push({
          category: 'CMS',
          requirements: ['WordPress', 'Strapi', 'Contentful']
        });
      }
      break;
    case 'mobile':
      requirements.push({
        category: 'Mobile Development',
        requirements: ['React Native', 'Flutter', 'Native iOS/Android']
      });
      break;
    case 'saas':
      requirements.push({
        category: 'Backend',
        requirements: ['Database', 'API', 'Authentication', 'Hosting']
      });
      break;
  }
  
  return requirements;
}

function generateEstimates(projectType: string, briefLength: number, riskScore: number) {
  const baseHours = {
    web: 40,
    mobile: 120,
    branding: 30,
    design: 25,
    saas: 200,
    generale: 50
  };
  
  const hours = baseHours[projectType as keyof typeof baseHours] || 50;
  const adjustedHours = Math.round(hours * (1 + riskScore / 100));
  
  const hourlyRate = 50; // €50/ora base
  const budget = `€${adjustedHours * hourlyRate} - €${adjustedHours * hourlyRate * 1.5}`;
  
  const timelineWeeks = Math.ceil(adjustedHours / 20); // 20 ore/settimana
  const timeline = `${timelineWeeks} settimana${timelineWeeks > 1 ? 'e' : ''}`;
  
  return { hours: adjustedHours, budget, timeline };
}

function generateQuestions(redFlags: RedFlag[], projectType: string): string[] {
  const questions = [
    'Qual è il budget disponibile per questo progetto?',
    'Qual è la timeline ideale per il completamento?',
    'Chi è il target di riferimento?'
  ];
  
  if (redFlags.some(flag => flag.type === 'technical')) {
    questions.push('Avete preferenze tecniche specifiche?');
  }
  
  if (projectType === 'web') {
    questions.push('Il sito deve essere multilingua?', 'Serve integrazione con sistemi esistenti?');
  }
  
  if (projectType === 'mobile') {
    questions.push('L\'app deve funzionare offline?', 'Serve integrazione con API esterne?');
  }
  
  return questions;
}

function generateEmailTemplate(projectType: string, redFlags: RedFlag[]): string {
  return `Gentile Cliente,

Grazie per avermi contattato per il vostro progetto ${projectType}.

Ho analizzato la vostra richiesta e sono interessato a collaborare con voi. Per potervi fornire una proposta accurata, avrei bisogno di alcuni chiarimenti:

${redFlags.length > 0 ? '⚠️ Punti da chiarire:\n' + redFlags.map(flag => `• ${flag.suggestion}`).join('\n') + '\n\n' : ''}

Sarò lieto di organizzare una chiamata per discutere i dettagli del progetto.

Cordiali saluti,
[Il tuo nome]`;
}