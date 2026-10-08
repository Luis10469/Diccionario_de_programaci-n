import React, { useState } from 'react';
import { EducationalElement, LanguageId, CategoryId, DifficultyLevel, StudyStatus, UserProgress } from '../types';
import { ALL_ELEMENTS } from '../data/elements';
import { ElementCard } from '../components/ElementCard';
import { Search, Filter, RotateCcw, Compass, BookOpen } from 'lucide-react';

interface ExplorerViewProps {
  onOpenElement: (element: EducationalElement) => void;
  progress: UserProgress;
  onFavoriteToggle: (elementId: string) => void;
  onStatusChange: (elementId: string, status: StudyStatus) => void;
  initialLanguage?: LanguageId | 'all';
  initialCategory?: CategoryId | 'all';
}

export const ExplorerView: React.FC<ExplorerViewProps> = ({
  onOpenElement,
  progress,
  onFavoriteToggle,
  onStatusChange,
  initialLanguage = 'all',
  initialCategory = 'all'
}) => {
  const [selectedLang, setSelectedLang] = useState<LanguageId | 'all'>(initialLanguage);
  const [selectedCat, setSelectedCat] = useState<CategoryId | 'all'>(initialCategory);
  const [selectedDiff, setSelectedDiff] = useState<DifficultyLevel | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<StudyStatus | 'all'>('all');
  const [filterQuery, setFilterQuery] = useState('');

  const handleResetFilters = () => {
    setSelectedLang('all');
    setSelectedCat('all');
    setSelectedDiff('all');
    setSelectedStatus('all');
    setFilterQuery('');
  };

  const filteredElements = ALL_ELEMENTS.filter(el => {
    if (selectedLang !== 'all' && el.language !== selectedLang) return false;
    if (selectedCat !== 'all' && el.category !== selectedCat) return false;
    if (selectedDiff !== 'all' && el.difficulty !== selectedDiff) return false;
    if (selectedStatus !== 'all') {
      const elStatus = progress.statusByElementId[el.id] || 'not_studied';
      if (elStatus !== selectedStatus) return false;
    }
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      const matchName = el.name.toLowerCase().includes(q);
      const matchDef = el.definition.toLowerCase().includes(q);
      const matchTags = el.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDef && !matchTags) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Encabezado */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4" />
          <span>Biblioteca Técnica Completa</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Explorar Elementos
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Filtra entre palabras reservadas oficiales, tipos de datos, operadores, funciones y conceptos fundamentales.
        </p>
      </div>

      {/* Barra de Filtros Combinables */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Input de filtro textual rápido */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={e => setFilterQuery(e.target.value)}
            placeholder="Filtrar por nombre dentro de la biblioteca..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>

        {/* Filtros por botones y selects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Lenguaje */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Lenguaje:
            </label>
            <select
              value={selectedLang}
              onChange={e => setSelectedLang(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
            >
              <option value="all">Todos los lenguajes</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="kotlin">Kotlin</option>
            </select>
          </div>

          {/* Categoría */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Categoría:
            </label>
            <select
              value={selectedCat}
              onChange={e => setSelectedCat(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
            >
              <option value="all">Todas las categorías</option>
              <option value="keyword">Palabras reservadas (A)</option>
              <option value="datatype">Tipos de datos (B)</option>
              <option value="operator">Operadores (C)</option>
              <option value="builtin-function">Funciones predefinidas (D)</option>
              <option value="concept">Conceptos clave (E)</option>
            </select>
          </div>

          {/* Dificultad */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Nivel:
            </label>
            <select
              value={selectedDiff}
              onChange={e => setSelectedDiff(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
            >
              <option value="all">Todos los niveles</option>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </div>

          {/* Estado de estudio */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Estado de progreso:
            </label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
            >
              <option value="all">Cualquier estado</option>
              <option value="not_studied">No estudiado</option>
              <option value="studying">Estudiando</option>
              <option value="learned">Aprendido</option>
              <option value="needs_review">Necesita repaso</option>
            </select>
          </div>
        </div>

        {/* Resumen de resultados y reset */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="font-semibold text-slate-500">
            Mostrando {filteredElements.length} de {ALL_ELEMENTS.length} fichas
          </span>

          {(selectedLang !== 'all' || selectedCat !== 'all' || selectedDiff !== 'all' || selectedStatus !== 'all' || filterQuery) && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Cuadrícula de Elementos */}
      {filteredElements.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredElements.map(el => (
            <ElementCard
              key={el.id}
              element={el}
              status={progress.statusByElementId[el.id] || 'not_studied'}
              isFavorite={progress.favorites.includes(el.id)}
              onOpen={onOpenElement}
              onFavoriteToggle={onFavoriteToggle}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            No se encontraron elementos con los filtros seleccionados
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Prueba ajustando los criterios de búsqueda, seleccionando "Todos los lenguajes" o limpiando el filtro de texto.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-all"
          >
            Restablecer todos los filtros
          </button>
        </div>
      )}
    </div>
  );
};
