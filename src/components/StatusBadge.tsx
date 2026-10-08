import React from 'react';
import { StudyStatus, CategoryId, DifficultyLevel, LanguageId } from '../types';
import { Sparkles, CheckCircle2, BookOpen, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: StudyStatus;
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showIcon = true }) => {
  switch (status) {
    case 'learned':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5" />}
          Aprendido
        </span>
      );
    case 'studying':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border border-indigo-500/30">
          {showIcon && <BookOpen className="w-3.5 h-3.5" />}
          Estudiando
        </span>
      );
    case 'needs_review':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
          {showIcon && <AlertCircle className="w-3.5 h-3.5" />}
          Necesita repaso
        </span>
      );
    case 'not_studied':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200/70 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
          {showIcon && <Sparkles className="w-3 h-3 text-slate-400" />}
          No estudiado
        </span>
      );
  }
};

export const LanguageBadge: React.FC<{ language: LanguageId }> = ({ language }) => {
  const styles: Record<LanguageId, { label: string; bg: string; text: string; border: string }> = {
    javascript: { label: 'JavaScript', bg: 'bg-amber-400/15', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-400/30' },
    python: { label: 'Python', bg: 'bg-sky-500/15', text: 'text-sky-700 dark:text-sky-300', border: 'border-sky-500/30' },
    java: { label: 'Java', bg: 'bg-orange-500/15', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-500/30' },
    kotlin: { label: 'Kotlin', bg: 'bg-purple-500/15', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-500/30' }
  };

  const current = styles[language];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${current.bg} ${current.text} border ${current.border}`}>
      {current.label}
    </span>
  );
};

export const CategoryBadge: React.FC<{ category: CategoryId }> = ({ category }) => {
  const labels: Record<CategoryId, { label: string; color: string }> = {
    keyword: { label: 'Palabra reservada', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20' },
    datatype: { label: 'Tipo de dato', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20' },
    operator: { label: 'Operador', color: 'bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/20' },
    'builtin-function': { label: 'Función integrada', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20' },
    concept: { label: 'Concepto clave', color: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20' }
  };

  const c = labels[category] || { label: category, color: 'bg-slate-500/10 text-slate-700 border-slate-500/20' };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${c.color}`}>
      {c.label}
    </span>
  );
};

export const DifficultyBadge: React.FC<{ difficulty: DifficultyLevel }> = ({ difficulty }) => {
  const diffs: Record<DifficultyLevel, { label: string; color: string }> = {
    beginner: { label: 'Principiante', color: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20' },
    intermediate: { label: 'Intermedio', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20' },
    advanced: { label: 'Avanzado', color: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20' }
  };
  const d = diffs[difficulty];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${d.color}`}>
      {d.label}
    </span>
  );
};
