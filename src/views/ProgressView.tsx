import React from 'react';
import { UserProgress, LanguageId, EducationalElement, StudyStatus } from '../types';
import { LANGUAGES } from '../data/languages';
import { ALL_ELEMENTS } from '../data/elements';
import { getLanguageProgressStats, getReviewElements, saveProgress } from '../services/storageService';
import { ElementCard } from '../components/ElementCard';
import {
  BarChart3,
  Award,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Trophy,
  Trash2,
  Download
} from 'lucide-react';
import { NavTab } from '../components/Navbar';

interface ProgressViewProps {
  progress: UserProgress;
  onOpenElement: (element: EducationalElement) => void;
  onFavoriteToggle: (elementId: string) => void;
  onStatusChange: (elementId: string, status: StudyStatus) => void;
  onNavigateTab: (tab: NavTab) => void;
  onProgressUpdate: (updated: UserProgress) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  progress,
  onOpenElement,
  onFavoriteToggle,
  onStatusChange,
  onNavigateTab,
  onProgressUpdate
}) => {
  const languagesList: LanguageId[] = ['javascript', 'python', 'java', 'kotlin'];

  const reviewItems = getReviewElements(progress);

  // Totales
  const totalElements = ALL_ELEMENTS.length;
  let totalLearned = 0;
  let totalStudying = 0;
  let totalNeedsReview = 0;

  for (const st of Object.values(progress.statusByElementId)) {
    if (st === 'learned') totalLearned++;
    else if (st === 'studying') totalStudying++;
    else if (st === 'needs_review') totalNeedsReview++;
  }

  const overallMastery = Math.round((totalLearned / Math.max(1, totalElements)) * 100);

  const handleResetAllProgress = () => {
    if (window.confirm('¿Estás seguro de que deseas reiniciar tu progreso de estudio?')) {
      const resetState: UserProgress = {
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
      saveProgress(resetState);
      onProgressUpdate(resetState);
    }
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `codelex_progreso_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Métricas y Dominio de Lenguajes</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Mi Progreso de Aprendizaje
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitorea los conceptos aprendidos, temas pendientes y fortalece los conceptos que requieren repaso.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportData}
            title="Exportar copia de seguridad en JSON"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar</span>
          </button>
          <button
            onClick={handleResetAllProgress}
            title="Reiniciar progreso guardado"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 text-xs font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-100"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Tarjetas de Métricas Generales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Dominio Global
          </div>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {overallMastery}%
          </div>
          <div className="text-xs text-slate-400">
            {totalLearned} fichas aprendidas
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            En Estudio
          </div>
          <div className="text-3xl font-black text-indigo-500">
            {totalStudying}
          </div>
          <div className="text-xs text-slate-400">
            Conceptos en proceso
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Necesita Repaso
          </div>
          <div className="text-3xl font-black text-amber-500">
            {totalNeedsReview}
          </div>
          <div className="text-xs text-slate-400">
            Conceptos con dudas
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Ejercicios Resueltos
          </div>
          <div className="text-3xl font-black text-emerald-500">
            {progress.quizScores.totalAnswered}
          </div>
          <div className="text-xs text-slate-400">
            {progress.quizScores.correctAnswers} aciertos ({progress.quizScores.totalAnswered > 0 ? Math.round((progress.quizScores.correctAnswers / progress.quizScores.totalAnswered) * 100) : 0}% precisión)
          </div>
        </div>
      </div>

      {/* Progreso Desglosado por Lenguaje */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Progreso por Lenguaje de Programación
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {languagesList.map(langId => {
            const lang = LANGUAGES[langId];
            const stats = getLanguageProgressStats(langId, progress);

            return (
              <div
                key={langId}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.accentColor }} />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{lang.name}</h3>
                  </div>
                  <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                    {stats.percentage}%
                  </span>
                </div>

                {/* Barra de progreso visual por colores de estado */}
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 flex overflow-hidden">
                  <div
                    style={{ width: `${(stats.learned / stats.total) * 100}%` }}
                    className="bg-emerald-500 transition-all"
                    title={`Aprendido: ${stats.learned}`}
                  />
                  <div
                    style={{ width: `${(stats.studying / stats.total) * 100}%` }}
                    className="bg-indigo-500 transition-all"
                    title={`Estudiando: ${stats.studying}`}
                  />
                  <div
                    style={{ width: `${(stats.needsReview / stats.total) * 100}%` }}
                    className="bg-amber-500 transition-all"
                    title={`Necesita repaso: ${stats.needsReview}`}
                  />
                </div>

                {/* Desglose numérico */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">{stats.learned}</div>
                    <div className="text-[10px] text-slate-400">Aprendido</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                    <div className="font-bold text-indigo-600 dark:text-indigo-400">{stats.studying}</div>
                    <div className="text-[10px] text-slate-400">Estudiando</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                    <div className="font-bold text-amber-600 dark:text-amber-400">{stats.needsReview}</div>
                    <div className="text-[10px] text-slate-400">Repaso</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                    <div className="font-bold text-slate-500">{stats.notStudied}</div>
                    <div className="text-[10px] text-slate-400">Pendiente</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cola de Conceptos que Necesitan Repaso */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Cola de Repaso Activa ({reviewItems.length})
            </h2>
          </div>
          {reviewItems.length > 0 && (
            <button
              onClick={() => onNavigateTab('exercises')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Practicar en el modo repaso →
            </button>
          )}
        </div>

        {reviewItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviewItems.map(el => (
              <ElementCard
                key={el.id}
                element={el}
                status="needs_review"
                isFavorite={progress.favorites.includes(el.id)}
                onOpen={onOpenElement}
                onFavoriteToggle={onFavoriteToggle}
                onStatusChange={onStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              ¡Excelente trabajo! No tienes ningún concepto en cola de repaso
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Cuando marques una ficha como "Necesita repaso" o falles un ejercicio en los cuestionarios, aparecerá aquí automáticamente para reforzar tu aprendizaje.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
