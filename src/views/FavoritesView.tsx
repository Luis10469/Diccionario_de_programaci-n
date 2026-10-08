import React from 'react';
import { EducationalElement, UserProgress, StudyStatus } from '../types';
import { getElementById } from '../data/elements';
import { ElementCard } from '../components/ElementCard';
import { Star, Sparkles, BookOpen } from 'lucide-react';
import { NavTab } from '../components/Navbar';

interface FavoritesViewProps {
  onOpenElement: (element: EducationalElement) => void;
  progress: UserProgress;
  onFavoriteToggle: (elementId: string) => void;
  onStatusChange: (elementId: string, status: StudyStatus) => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  onOpenElement,
  progress,
  onFavoriteToggle,
  onStatusChange,
  onNavigateTab
}) => {
  const favoriteElements = progress.favorites
    .map(id => getElementById(id))
    .filter((el): el is EducationalElement => Boolean(el));

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Cabecera */}
      <div>
        <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs uppercase tracking-wider mb-1">
          <Star className="w-4 h-4 fill-amber-500" />
          <span>Fichas Guardadas</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Tus Favoritos ({favoriteElements.length})
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Accede rápidamente a las palabras reservadas, tipos y operadores que guardaste para consultar con frecuencia.
        </p>
      </div>

      {favoriteElements.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteElements.map(el => (
            <ElementCard
              key={el.id}
              element={el}
              status={progress.statusByElementId[el.id] || 'not_studied'}
              isFavorite={true}
              onOpen={onOpenElement}
              onFavoriteToggle={onFavoriteToggle}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Star className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Aún no has guardado elementos favoritos
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Explora la biblioteca técnica y haz clic en la estrella de cualquier ficha para tenerla a mano siempre que la necesites.
          </p>
          <button
            onClick={() => onNavigateTab('explorer')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
          >
            Explorar biblioteca ahora
          </button>
        </div>
      )}
    </div>
  );
};
