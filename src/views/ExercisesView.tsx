import React, { useState } from 'react';
import { QuizQuestion, LanguageId, QuizType, UserProgress } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { recordQuizAnswer } from '../services/storageService';
import { CodeBlock } from '../components/CodeBlock';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  Trophy,
  History,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExercisesViewProps {
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
}

export const ExercisesView: React.FC<ExercisesViewProps> = ({
  progress,
  onProgressUpdate
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId | 'all'>('all');
  const [reviewModeOnly, setReviewModeOnly] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  // Filtrar preguntas
  const filteredQuestions = QUIZ_QUESTIONS.filter(q => {
    if (selectedLanguage !== 'all' && q.language !== selectedLanguage) return false;
    if (reviewModeOnly) {
      // En modo repaso, filtramos las preguntas que están marcadas para repaso o falladas
      const needsReview = q.relatedElementId && progress.statusByElementId[q.relatedElementId] === 'needs_review';
      const failedInHistory = progress.quizScores.history.some(h => h.questionId === q.id && !h.wasCorrect);
      return needsReview || failedInHistory;
    }
    return true;
  });

  const currentQuestion: QuizQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered || !currentQuestion) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    const isCorrect = idx === currentQuestion.correctIndex;

    if (isCorrect) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 }
      });
    }

    const updated = recordQuizAnswer(currentQuestion.id, isCorrect, currentQuestion.relatedElementId);
    onProgressUpdate(updated);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleRetryCurrent = () => {
    setSelectedOption(null);
    setHasAnswered(false);
  };

  const getTypeLabel = (type: QuizType) => {
    switch (type) {
      case 'multiple_choice': return 'Opción múltiple';
      case 'identify_bug': return 'Identificar error';
      case 'predict_output': return 'Predecir resultado';
      case 'fill_blank': return 'Completar código';
    }
  };

  const accuracy = progress.quizScores.totalAnswered > 0
    ? Math.round((progress.quizScores.correctAnswers / progress.quizScores.totalAnswered) * 100)
    : 0;

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Cabecera */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <GraduationCap className="w-4 h-4" />
          <span>Arena de Práctica y Verificación</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Ejercicios Interactivos
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Comprueba lo aprendido con retroalimentación inmediata, explicaciones detalladas y repetición de errores.
        </p>
      </div>

      {/* Marcador de puntuación */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {progress.quizScores.correctAnswers} / {progress.quizScores.totalAnswered}
            </div>
            <div className="text-xs text-slate-500">Respuestas correctas</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {accuracy}%
            </div>
            <div className="text-xs text-slate-500">Precisión global</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {Object.values(progress.statusByElementId).filter(s => s === 'needs_review').length}
            </div>
            <div className="text-xs text-slate-500">Temas para repaso</div>
          </div>
        </div>
      </div>

      {/* Barra de Filtros y Modo Repaso */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Selector de lenguaje */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {(['all', 'javascript', 'python', 'java', 'kotlin'] as const).map(lang => (
            <button
              key={lang}
              onClick={() => {
                setSelectedLanguage(lang);
                setCurrentIndex(0);
                setSelectedOption(null);
                setHasAnswered(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                selectedLanguage === lang
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {lang === 'all' ? 'Todos' : lang}
            </button>
          ))}
        </div>

        {/* Toggle Modo Repaso */}
        <button
          onClick={() => {
            setReviewModeOnly(!reviewModeOnly);
            setCurrentIndex(0);
            setSelectedOption(null);
            setHasAnswered(false);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
            reviewModeOnly
              ? 'bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-300'
              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Modo Repaso (Falladas)</span>
        </button>
      </div>

      {/* Tarjeta del Ejercicio Activo */}
      {currentQuestion ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
          {/* Cabecera del ejercicio */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-bold">
                {getTypeLabel(currentQuestion.type)}
              </span>
              <span className="capitalize font-bold text-slate-700 dark:text-slate-300">
                {currentQuestion.language}
              </span>
            </div>
            <span>
              Pregunta {currentIndex + 1} de {filteredQuestions.length}
            </span>
          </div>

          {/* Enunciado de la pregunta */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentQuestion.prompt}
          </h2>

          {/* Código a analizar si existe */}
          {currentQuestion.codeSnippet && (
            <CodeBlock code={currentQuestion.codeSnippet} language={currentQuestion.language} />
          )}

          {/* Opciones de respuesta */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctIndex;

              let style = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200';

              if (hasAnswered) {
                if (isCorrect) {
                  style = 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-semibold';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-300';
                } else {
                  style = 'opacity-40 border-slate-200 dark:border-slate-700';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-start gap-3 ${style}`}
                >
                  <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs bg-white dark:bg-slate-700 shadow-sm shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 mt-0.5 font-mono text-xs sm:text-sm">{opt}</span>
                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Caja de Explicación Post-Respuesta */}
          {hasAnswered && (
            <div className={`p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-2 animate-fadeIn ${
              selectedOption === currentQuestion.correctIndex
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="font-bold flex items-center gap-2">
                {selectedOption === currentQuestion.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>¡Correcto! Excelente análisis.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>Respuesta incorrecta. Explicación didáctica:</span>
                  </>
                )}
              </div>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Botones de acción: Siguiente o Reintentar */}
          {hasAnswered && (
            <div className="flex items-center justify-between pt-2">
              {selectedOption !== currentQuestion.correctIndex ? (
                <button
                  onClick={handleRetryCurrent}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Intentar de nuevo</span>
                </button>
              ) : <div />}

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all ml-auto"
              >
                <span>Siguiente ejercicio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Trophy className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            {reviewModeOnly ? '¡No tienes temas pendientes de repaso!' : 'No hay ejercicios para el filtro actual'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {reviewModeOnly ? 'Has respondido correctamente a todas las preguntas que tenías pendientes.' : 'Prueba cambiando de lenguaje o desactivando el modo repaso.'}
          </p>
          {reviewModeOnly && (
            <button
              onClick={() => setReviewModeOnly(false)}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Ver todos los ejercicios
            </button>
          )}
        </div>
      )}

      {/* Historial de Respuestas Recientes */}
      {progress.quizScores.history.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <History className="w-4 h-4" />
            <span>Historial reciente de respuestas</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {progress.quizScores.history.slice(0, 10).map((h, i) => {
              const q = QUIZ_QUESTIONS.find(item => item.id === h.questionId);
              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2 truncate max-w-md">
                    {h.wasCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span className="truncate text-slate-700 dark:text-slate-300">
                      {q?.prompt || h.questionId}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {new Date(h.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
