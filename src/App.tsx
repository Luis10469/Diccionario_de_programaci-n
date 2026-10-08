import React, { useState, useEffect } from 'react';
import { EducationalElement, LanguageId, CategoryId, StudyStatus, UserProgress } from './types';
import { loadProgress, saveProgress, setElementStatus, toggleFavorite, recordViewedElement, loadTheme, saveTheme } from './services/storageService';
import { getElementById } from './data/elements';
import { Navbar, NavTab } from './components/Navbar';
import { ElementModal } from './components/ElementModal';
import { HomeView } from './views/HomeView';
import { ExplorerView } from './views/ExplorerView';
import { SearchView } from './views/SearchView';
import { LearningView } from './views/LearningView';
import { ComparatorView } from './views/ComparatorView';
import { ExercisesView } from './views/ExercisesView';
import { FavoritesView } from './views/FavoritesView';
import { ProgressView } from './views/ProgressView';
import { Code2, Heart, ExternalLink } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [activeElement, setActiveElement] = useState<EducationalElement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [explorerLangFilter, setExplorerLangFilter] = useState<LanguageId | 'all'>('all');
  const [explorerCatFilter, setExplorerCatFilter] = useState<CategoryId | 'all'>('all');
  
  // Progreso y Tema
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const initialTheme = loadTheme();
    setTheme(initialTheme);
    saveTheme(initialTheme);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    saveTheme(nextTheme);
  };

  const handleOpenElement = (el: EducationalElement) => {
    setActiveElement(el);
    const updated = recordViewedElement(el.id);
    setProgress(updated);
  };

  const handleCloseModal = () => {
    setActiveElement(null);
  };

  const handleFavoriteToggle = (elementId: string) => {
    const { progress: updated } = toggleFavorite(elementId);
    setProgress(updated);
  };

  const handleStatusChange = (elementId: string, status: StudyStatus) => {
    const updated = setElementStatus(elementId, status);
    setProgress(updated);
  };

  const handleSearchImmediate = (query: string) => {
    setSearchQuery(query);
    setActiveTab('search');
  };

  const handleSelectLanguageFilter = (lang: LanguageId) => {
    setExplorerLangFilter(lang);
    setExplorerCatFilter('all');
    setActiveTab('explorer');
  };

  const handleSelectCategoryFilter = (cat: CategoryId) => {
    setExplorerCatFilter(cat);
    setExplorerLangFilter('all');
    setActiveTab('explorer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:text-indigo-300 font-sans transition-colors">
      {/* Navegación Superior */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        progress={progress}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Contenedor Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <HomeView
            onOpenElement={handleOpenElement}
            onNavigateTab={setActiveTab}
            onSelectLanguageFilter={handleSelectLanguageFilter}
            onSelectCategoryFilter={handleSelectCategoryFilter}
            progress={progress}
            onFavoriteToggle={handleFavoriteToggle}
            onStatusChange={handleStatusChange}
            onSearchImmediate={handleSearchImmediate}
          />
        )}

        {activeTab === 'explorer' && (
          <ExplorerView
            onOpenElement={handleOpenElement}
            progress={progress}
            onFavoriteToggle={handleFavoriteToggle}
            onStatusChange={handleStatusChange}
            initialLanguage={explorerLangFilter}
            initialCategory={explorerCatFilter}
          />
        )}

        {activeTab === 'search' && (
          <SearchView
            initialQuery={searchQuery}
            onOpenElement={handleOpenElement}
            progress={progress}
            onFavoriteToggle={handleFavoriteToggle}
            onStatusChange={handleStatusChange}
          />
        )}

        {activeTab === 'learning' && (
          <LearningView
            onOpenElement={handleOpenElement}
            progress={progress}
          />
        )}

        {activeTab === 'comparator' && (
          <ComparatorView />
        )}

        {activeTab === 'exercises' && (
          <ExercisesView
            progress={progress}
            onProgressUpdate={setProgress}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesView
            onOpenElement={handleOpenElement}
            progress={progress}
            onFavoriteToggle={handleFavoriteToggle}
            onStatusChange={handleStatusChange}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressView
            progress={progress}
            onOpenElement={handleOpenElement}
            onFavoriteToggle={handleFavoriteToggle}
            onStatusChange={handleStatusChange}
            onNavigateTab={setActiveTab}
            onProgressUpdate={setProgress}
          />
        )}
      </main>

      {/* Ficha Educativa Modal (20 puntos obligatorios) */}
      {activeElement && (
        <ElementModal
          element={activeElement}
          isOpen={Boolean(activeElement)}
          onClose={handleCloseModal}
          status={progress.statusByElementId[activeElement.id] || 'not_studied'}
          isFavorite={progress.favorites.includes(activeElement.id)}
          onStatusChange={newStatus => handleStatusChange(activeElement.id, newStatus)}
          onFavoriteToggle={() => handleFavoriteToggle(activeElement.id)}
          onOpenRelated={relatedId => {
            const rel = getElementById(relatedId);
            if (rel) setActiveElement(rel);
          }}
        />
      )}

      {/* Pie de Página */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8 mt-auto text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono">
            <span className="font-bold text-slate-800 dark:text-slate-200">CodeLex</span>
            <span>—</span>
            <span>Diccionario Interactivo de Programación</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <a href="https://developer.mozilla.org/es/docs/Web/JavaScript" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
              <span>JS (MDN)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://docs.python.org/3/" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
              <span>Python 3.12</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://docs.oracle.com/en/java/javase/21/" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
              <span>Java 21 LTS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://kotlinlang.org/docs/home.html" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
              <span>Kotlin 2.0</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-[11px] text-slate-400">
            Diseñado para estudiantes de programación
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
