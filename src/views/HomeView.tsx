import React, { useState } from 'react';
import { EducationalElement, LanguageId, CategoryId, UserProgress } from '../types';
import { LANGUAGES } from '../data/languages';
import { ALL_ELEMENTS, getElementById } from '../data/elements';
import { getLanguageProgressStats } from '../services/storageService';
import { ElementCard } from '../components/ElementCard';
import { Search, Sparkles, ArrowRight, BookOpen, Compass, Terminal, ShieldCheck, Zap } from 'lucide-react';
import { NavTab } from '../components/Navbar';

interface HomeViewProps {
  onOpenElement: (element: EducationalElement) => void;
  onNavigateTab: (tab: NavTab) => void;
  onSelectLanguageFilter: (lang: LanguageId) => void;
  onSelectCategoryFilter: (cat: CategoryId) => void;
  progress: UserProgress;
  onFavoriteToggle: (elementId: string) => void;
  onStatusChange: (elementId: string, status: any) => void;
  onSearchImmediate: (query: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onOpenElement,
  onNavigateTab,
  onSelectLanguageFilter,
  onSelectCategoryFilter,
  progress,
  onFavoriteToggle,
  onStatusChange,
  onSearchImmediate
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchImmediate(searchInput.trim());
      onNavigateTab('search');
    }
  };

  // Elementos destacados / populares
  const popularElementIds = ['kt-val', 'py-def', 'js-const', 'java-datatype-string', 'kt-concept-null-safety', 'py-builtin-len'];
  const popularElements = popularElementIds
    .map(id => getElementById(id))
    .filter((el): el is EducationalElement => Boolean(el));

  // Últimos conceptos estudiados
  const recentElements = progress.lastViewedElementIds
    .map(id => getElementById(id))
    .filter((el): el is EducationalElement => Boolean(el))
    .slice(0, 3);

  // Estadísticas globales de progreso
  const totalElements = ALL_ELEMENTS.length;
  let totalLearned = 0;
  for (const st of Object.values(progress.statusByElementId)) {
    if (st === 'learned') totalLearned++;
  }
  const overallPercentage = Math.round((totalLearned / Math.max(1, totalElements)) * 100);

  const categoriesList: Array<{ id: CategoryId; name: string; count: number; desc: string; icon: string }> = [
    { id: 'keyword', name: 'Palabras reservadas', count: ALL_ELEMENTS.filter(e => e.category === 'keyword').length, desc: 'Gramática oficial estricta y contextual', icon: '🔑' },
    { id: 'datatype', name: 'Tipos de datos', count: ALL_ELEMENTS.filter(e => e.category === 'datatype').length, desc: 'Primitivos, strings, listas y colecciones', icon: '📦' },
    { id: 'operator', name: 'Operadores', count: ALL_ELEMENTS.filter(e => e.category === 'operator').length, desc: 'Aritmética, igualdad estricta y null-safety', icon: '⚡' },
    { id: 'builtin-function', name: 'Funciones predefinidas', count: ALL_ELEMENTS.filter(e => e.category === 'builtin-function').length, desc: 'print, console.log, len y utilidades', icon: '🛠️' },
    { id: 'concept', name: 'Conceptos clave', count: ALL_ELEMENTS.filter(e => e.category === 'concept').length, desc: 'Variables, bucles, POO y Null Safety', icon: '🧠' }
  ];

  return (
    <div className="space-y-12 pb-16 animate-fadeIn">
      {/* Hero Section con buscador principal */}
      <section className="relative pt-8 pb-12 rounded-3xl overflow-hidden bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/15 p-6 sm:p-12 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plataforma interactiva para principiantes y estudiantes</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Aprende a programar entendiendo el{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              significado real
            </span>{' '}
            del código
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Consulta el diccionario técnico, compara sintaxis entre 4 lenguajes y pon a prueba tus conocimientos con ejercicios paso a paso.
          </p>

          {/* Gran Buscador Interactivo */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center shadow-lg shadow-indigo-500/5 rounded-2xl overflow-hidden border-2 border-indigo-500/30 dark:border-indigo-500/40 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-500/20 bg-white dark:bg-slate-900 transition-all">
              <Search className="w-6 h-6 text-indigo-500 ml-4 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Busca por término o concepto (ej. String, if, guardar texto, números decimales)..."
                className="w-full px-4 py-4 text-sm sm:text-base bg-transparent text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="m-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shrink-0 flex items-center gap-1.5"
              >
                <span>Buscar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Búsquedas sugeridas rápidas */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Prueba buscando:</span>
              {['String', 'if', 'guardar texto', 'val', 'def', 'números decimales'].map(term => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSearchInput(term);
                    onSearchImmediate(term);
                    onNavigateTab('search');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-700 dark:text-slate-300 font-mono transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* Widget de Progreso y Continuar Estudiando */}
      <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Tu progreso de aprendizaje
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
              {totalLearned} de {totalElements} elementos
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Avanza lección por lección o practica en el módulo de ejercicios interactivos.
          </p>

          {/* Barra de progreso */}
          <div className="w-full sm:w-80 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-3">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, overallPercentage)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('learning')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Continuar estudiando</span>
          </button>
        </div>
      </section>

      {/* 4 Tarjetas de Lenguajes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Explora por Lenguaje
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Versiones oficiales documentadas y actualizadas
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('comparator')}
            className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Comparar lenguajes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(LANGUAGES) as LanguageId[]).map(langId => {
            const lang = LANGUAGES[langId];
            const stats = getLanguageProgressStats(langId, progress);

            return (
              <div
                key={langId}
                onClick={() => {
                  onSelectLanguageFilter(langId);
                  onNavigateTab('explorer');
                }}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.accentColor }} />
                    <span className="text-[11px] font-mono text-slate-400">{lang.fileExtension}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {lang.name}
                  </h3>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-2">
                    {lang.version}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {lang.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>{stats.total} elementos</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{stats.percentage}% dominado</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categorías Educativas */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Categorías Educativas
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Contenido organizado rigurosamente según la especificación técnica
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categoriesList.map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategoryFilter(cat.id);
                onNavigateTab('explorer');
              }}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer transition-all shadow-sm group"
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {cat.desc}
              </p>
              <div className="mt-3 text-[11px] font-semibold text-slate-400">
                {cat.count} fichas disponibles
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Elementos Populares */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Conceptos Populares
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Fichas esenciales para quienes comienzan su aprendizaje
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('explorer')}
            className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Ver toda la biblioteca</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularElements.map(el => (
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
      </section>

      {/* Últimos conceptos estudiados (si hay) */}
      {recentElements.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Últimos conceptos consultados
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Retoma tus consultas recientes sin perder tiempo
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentElements.map(el => (
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
        </section>
      )}
    </div>
  );
};
