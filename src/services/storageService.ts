import { UserProgress, StudyStatus, LanguageId, EducationalElement } from '../types';
import { ALL_ELEMENTS, getElementsByLanguage, getElementById } from '../data/elements';

const STORAGE_KEY = 'codelex_user_progress_v1';
const THEME_KEY = 'codelex_theme_v1';

const DEFAULT_PROGRESS: UserProgress = {
  statusByElementId: {},
  favorites: [],
  completedQuizIds: [],
  quizScores: {
    totalAnswered: 0,
    correctAnswers: 0,
    history: []
  },
  lastViewedElementIds: []
};

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      quizScores: {
        ...DEFAULT_PROGRESS.quizScores,
        ...(parsed.quizScores || {})
      }
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function setElementStatus(elementId: string, status: StudyStatus): UserProgress {
  const current = loadProgress();
  const updated: UserProgress = {
    ...current,
    statusByElementId: {
      ...current.statusByElementId,
      [elementId]: status
    }
  };
  saveProgress(updated);
  return updated;
}

export function toggleFavorite(elementId: string): { progress: UserProgress; isFavorite: boolean } {
  const current = loadProgress();
  const exists = current.favorites.includes(elementId);
  const updatedFavorites = exists
    ? current.favorites.filter(id => id !== elementId)
    : [...current.favorites, elementId];

  const updated: UserProgress = {
    ...current,
    favorites: updatedFavorites
  };
  saveProgress(updated);
  return { progress: updated, isFavorite: !exists };
}

export function recordViewedElement(elementId: string): UserProgress {
  const current = loadProgress();
  const filtered = current.lastViewedElementIds.filter(id => id !== elementId);
  const updatedList = [elementId, ...filtered].slice(0, 10);
  const updated: UserProgress = {
    ...current,
    lastViewedElementIds: updatedList
  };
  saveProgress(updated);
  return updated;
}

export function recordQuizAnswer(questionId: string, isCorrect: boolean, relatedElementId?: string): UserProgress {
  const current = loadProgress();
  const updatedCompleted = current.completedQuizIds.includes(questionId)
    ? current.completedQuizIds
    : [...current.completedQuizIds, questionId];

  const newHistoryItem = {
    questionId,
    wasCorrect: isCorrect,
    date: new Date().toISOString()
  };

  const updatedScores = {
    totalAnswered: current.quizScores.totalAnswered + 1,
    correctAnswers: current.quizScores.correctAnswers + (isCorrect ? 1 : 0),
    history: [newHistoryItem, ...current.quizScores.history].slice(0, 50)
  };

  // Si falló y tiene un elemento asociado, se marca automáticamente como "needs_review"
  const updatedStatus = { ...current.statusByElementId };
  if (!isCorrect && relatedElementId) {
    updatedStatus[relatedElementId] = 'needs_review';
  } else if (isCorrect && relatedElementId && updatedStatus[relatedElementId] !== 'learned') {
    updatedStatus[relatedElementId] = 'studying';
  }

  const updated: UserProgress = {
    ...current,
    completedQuizIds: updatedCompleted,
    quizScores: updatedScores,
    statusByElementId: updatedStatus
  };

  saveProgress(updated);
  return updated;
}

export interface LanguageProgressStats {
  language: LanguageId;
  total: number;
  learned: number;
  studying: number;
  needsReview: number;
  notStudied: number;
  percentage: number;
}

export function getLanguageProgressStats(lang: LanguageId, progress: UserProgress): LanguageProgressStats {
  const elements = getElementsByLanguage(lang);
  const total = elements.length;
  let learned = 0;
  let studying = 0;
  let needsReview = 0;

  for (const el of elements) {
    const status = progress.statusByElementId[el.id] || 'not_studied';
    if (status === 'learned') learned++;
    else if (status === 'studying') studying++;
    else if (status === 'needs_review') needsReview++;
  }

  const notStudied = Math.max(0, total - learned - studying - needsReview);
  const percentage = total > 0 ? Math.round((learned / total) * 100) : 0;

  return {
    language: lang,
    total,
    learned,
    studying,
    needsReview,
    notStudied,
    percentage
  };
}

export function getReviewElements(progress: UserProgress): EducationalElement[] {
  const idsToReview: string[] = [];
  
  // 1. Elementos explícitamente marcados como needs_review
  for (const [id, status] of Object.entries(progress.statusByElementId)) {
    if (status === 'needs_review') {
      idsToReview.push(id);
    }
  }

  const result: EducationalElement[] = [];
  for (const id of idsToReview) {
    const el = getElementById(id);
    if (el) result.push(el);
  }
  return result;
}

export function loadTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function saveTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    console.error(e);
  }
}
