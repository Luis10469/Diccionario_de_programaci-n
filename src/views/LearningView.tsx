import React, { useState } from 'react';
import { LanguageId, EducationalElement, UserProgress, LearningLesson } from '../types';
import { CURRICULA } from '../data/learningPaths';
import { LANGUAGES } from '../data/languages';
import { getElementById } from '../data/elements';
import { CodeBlock } from '../components/CodeBlock';
import { BookOpen, CheckCircle2, ChevronRight, Award, Sparkles, ArrowRight, Layers } from 'lucide-react';

interface LearningViewProps {
  onOpenElement: (element: EducationalElement) => void;
  progress: UserProgress;
}

export const LearningView: React.FC<LearningViewProps> = ({
  onOpenElement,
  progress
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>('python');
  const [activeLessonId, setActiveLessonId] = useState<string | null>('py-l1-variables');

  const curriculum = CURRICULA[selectedLanguage];
  const langInfo = LANGUAGES[selectedLanguage];

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Encabezado */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Ruta de Aprendizaje Estructurada</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Aprende {langInfo.name} Paso a Paso
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Recorrido de 5 niveles diseñado para dominar los fundamentos, control de flujo, estructuras de datos, POO y temas avanzados.
        </p>
      </div>

      {/* Selector de Lenguaje */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        {(Object.keys(LANGUAGES) as LanguageId[]).map(langId => {
          const l = LANGUAGES[langId];
          const isSelected = selectedLanguage === langId;
          return (
            <button
              key={langId}
              onClick={() => {
                setSelectedLanguage(langId);
                const firstLesson = CURRICULA[langId]?.levels[0]?.lessons[0]?.id;
                if (firstLesson) setActiveLessonId(firstLesson);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.accentColor }} />
              <span>{l.name}</span>
            </button>
          );
        })}
      </div>

      {/* Contenedor de Niveles */}
      <div className="space-y-8">
        {curriculum.levels.map(level => {
          return (
            <div
              key={level.levelNumber}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-extrabold text-sm border border-indigo-500/20">
                    {level.levelNumber}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {level.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {level.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lecciones del nivel */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {level.lessons.map(lesson => {
                  const isActive = activeLessonId === lesson.id;
                  // Comprobar si los elementos de la lección están aprendidos
                  const allLearned = lesson.elementIds.every(
                    id => progress.statusByElementId[id] === 'learned'
                  );

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                            Lección
                          </span>
                          {allLearned && (
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Dominado
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {lesson.description}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        <span>{lesson.elementIds.length} fichas asociadas</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Panel de Detalle de la Lección Activa */}
              {level.lessons.some(l => l.id === activeLessonId) && (() => {
                const currentLesson = level.lessons.find(l => l.id === activeLessonId)!;
                return (
                  <div className="mt-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-indigo-200 dark:border-indigo-900/50 space-y-4 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {currentLesson.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                          {currentLesson.description}
                        </p>
                      </div>
                    </div>

                    {/* Código demostrativo */}
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Código de ejemplo:
                      </div>
                      <CodeBlock code={currentLesson.sampleCode} language={selectedLanguage} />
                    </div>

                    {/* Conclusión clave */}
                    <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed">
                      <strong>Conclusión clave:</strong> {currentLesson.keyTakeaway}
                    </div>

                    {/* Fichas de la biblioteca para consultar sin perder avance */}
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Fichas técnicas relacionadas para profundizar:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentLesson.elementIds.map(elemId => {
                          const item = getElementById(elemId);
                          if (!item) return null;
                          return (
                            <button
                              key={elemId}
                              onClick={() => onOpenElement(item)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-800/80 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-xs font-mono font-semibold text-indigo-700 dark:text-indigo-300 transition-all shadow-sm"
                            >
                              <span>{item.name}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
};
