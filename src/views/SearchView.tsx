import React, { useState, useEffect } from 'react';
import { EducationalElement, LanguageId, CategoryId, DifficultyLevel, UserProgress } from '../types';
import { searchElements, getQuickSuggestions } from '../services/searchService';
import { ElementCard } from '../components/ElementCard';
import { getElementById } from '../data/elements';
import { Search, Sparkles, AlertCircle, ArrowRight, Tag, Lightbulb, Compass } from 'lucide-react';

interface SearchViewProps {
  initialQuery?: string;
  onOpenElement: (element: EducationalElement) => void;
  progress: UserProgress;
  onFavoriteToggle: (elementId: string) => void;
  onStatusChange: (elementId: string, status: any) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  initialQuery = '',
  onOpenElement,
  progress,
  onFavoriteToggle,
  onStatusChange
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedLang, setSelectedLang] = useState<LanguageId | 'all'>('all');
  const [selectedCat, setSelectedCat] = useState<CategoryId | 'all'>('all');
  const [selectedDiff, setSelectedDiff] = useState<DifficultyLevel | 'all'>('all');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const searchOutcome = searchElements(query, {
    language: selectedLang,
    category: selectedCat,
    difficulty: selectedDiff
  });

  const suggestions = getQuickSuggestions(query);

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Cabecera */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Búsqueda Inteligente Semántica</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Buscador de Programación
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Escribe el nombre de un elemento o lo que necesitas hacer en español (ej. "guardar texto", "repetir código", "números decimales").
        </p>
      </div>

      {/* Caja de Búsqueda Grande con Actualización Instantánea */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="relative">
          <Search className="w-6 h-6 text-indigo-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Escribe aquí (coincidencias automáticas en tiempo real)..."
            autoFocus
            className="w-full pl-13 pr-4 py-4 rounded-xl border-2 border-indigo-500/30 dark:border-indigo-500/40 bg-slate-50 dark:bg-slate-800/80 text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Sugerencias Rápidas mientras escribe */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            Sugerencias:
          </span>
          {suggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => setQuery(sug)}
              className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-mono text-xs hover:bg-indigo-100 transition-colors"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Filtros de Búsqueda Integrados */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Filtrar por Lenguaje:
            </label>
            <select
              value={selectedLang}
              onChange={e => setSelectedLang(e.target.value as any)}
              className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="all">Todos los lenguajes simultáneamente</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="kotlin">Kotlin</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Filtrar por Categoría:
            </label>
            <select
              value={selectedCat}
              onChange={e => setSelectedCat(e.target.value as any)}
              className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="all">Todas las categorías</option>
              <option value="keyword">Palabras reservadas</option>
              <option value="datatype">Tipos de datos</option>
              <option value="operator">Operadores</option>
              <option value="builtin-function">Funciones integradas</option>
              <option value="concept">Conceptos de programación</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Nivel de Dificultad:
            </label>
            <select
              value={selectedDiff}
              onChange={e => setSelectedDiff(e.target.value as any)}
              className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="all">Todos los niveles</option>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerta de elemento no existente con alternativa didáctica real */}
      {searchOutcome.suggestion && (
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 animate-fadeIn">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="text-sm font-bold">
                Aclaración técnica sobre "{searchOutcome.suggestion.searchedTerm}"
              </h3>
              <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-300">
                {searchOutcome.suggestion.message}
              </p>

              {searchOutcome.suggestion.recommendedElementIds.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs font-semibold">Alternativa sugerida:</span>
                  {searchOutcome.suggestion.recommendedElementIds.map(recId => {
                    const recEl = getElementById(recId);
                    if (!recEl) return null;
                    return (
                      <button
                        key={recId}
                        onClick={() => onOpenElement(recEl)}
                        className="px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-amber-400/50 text-xs font-mono font-bold text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
                      >
                        {recEl.name} ({recEl.language})
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Resultados de Búsqueda ordenados por relevancia */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Resultados de búsqueda ({searchOutcome.results.length})
          </h2>
          {query.trim() && (
            <span className="text-xs text-slate-500">
              Ordenados automáticamente por relevancia
            </span>
          )}
        </div>

        {searchOutcome.results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchOutcome.results.map(({ element, matchReason }) => (
              <div key={element.id} className="relative">
                {/* Razón de coincidencia visible para aprendizaje */}
                <div className="absolute -top-2.5 right-3 z-10 px-2 py-0.5 rounded-full bg-indigo-600 text-[10px] font-semibold text-white shadow-sm">
                  {matchReason}
                </div>
                <ElementCard
                  element={element}
                  status={progress.statusByElementId[element.id] || 'not_studied'}
                  isFavorite={progress.favorites.includes(element.id)}
                  onOpen={onOpenElement}
                  onFavoriteToggle={onFavoriteToggle}
                  onStatusChange={onStatusChange}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <Compass className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              No encontramos coincidencias para "{query}"
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Intenta buscar por la funcionalidad deseada (ejemplo: "guardar texto", "repetir código", "operadores lógicos").
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
