import { SavedBrief } from '../types';

const STORAGE_KEY = 'brief-analyzer-saved-briefs';

export function saveBrief(brief: SavedBrief): void {
  const savedBriefs = getSavedBriefs();
  const updatedBriefs = [brief, ...savedBriefs.filter(b => b.id !== brief.id)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBriefs));
}

export function getSavedBriefs(): SavedBrief[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function deleteBrief(id: string): void {
  const savedBriefs = getSavedBriefs();
  const updatedBriefs = savedBriefs.filter(brief => brief.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBriefs));
}

export function exportToJSON(analysis: any): void {
  const dataStr = JSON.stringify(analysis, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `brief-analysis-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}