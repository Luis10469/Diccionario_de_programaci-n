import React from 'react';
import { EducationalElement, StudyStatus } from '../types';
import { StatusBadge, LanguageBadge, CategoryBadge, DifficultyBadge } from './StatusBadge';
import { Star, ChevronRight, Check } from 'lucide-react';

interface ElementCardProps {
  element: EducationalElement;
  status: StudyStatus;
  isFavorite: boolean;
  onOpen: (element: EducationalElement) => void;
  onFavoriteToggle: (elementId: string) => void;
  onStatusChange: (elementId: string, status: StudyStatus) => void;
}

export const ElementCard: React.FC<ElementCardProps> = ({
  element,
  status,
  isFavorite,
  onOpen,
  onFavoriteToggle,
  onStatusChange
}) => {
  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm hover:shadow-md transition-all">
      <div>
        {/* Cabecera de la tarjeta */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <LanguageBadge language={element.language} />
            <CategoryBadge category={element.category} />
          </div>

          <button
            onClick={e => {
              e.stopPropagation();
              onFavoriteToggle(element.id);
            }}
            title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            className={`p-1.5 rounded-lg border transition-all ${
              isFavorite
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-500'
                : 'border-transparent text-slate-300 dark:text-slate-600 hover:text-amber-500'
            }`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Nombre del elemento */}
        <div className="mb-2">
          <h3 
            onClick={() => onOpen(element)}
            className="text-xl font-bold font-mono text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 cursor-pointer inline-block"
          >
            {element.name}
          </h3>
          <div className="mt-1">
            <DifficultyBadge difficulty={element.difficulty} />
          </div>
        </div>

        {/* Definición breve */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {element.definition}
        </p>

        {/* Mini snippet de sintaxis */}
        <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 overflow-x-auto mb-4 border border-slate-800">
          <code>{element.syntax.split('\n')[0]}</code>
        </div>
      </div>

      {/* Pie de tarjeta con estado y botón */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <StatusBadge status={status} />
        </div>

        <button
          onClick={() => onOpen(element)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white text-xs font-semibold transition-all"
        >
          <span>Ficha</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
