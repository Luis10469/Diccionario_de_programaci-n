import React, { useState } from 'react';
import { EducationalElement, StudyStatus, LanguageId } from '../types';
import { LANGUAGES } from '../data/languages';
import { getElementById } from '../data/elements';
import { CodeBlock } from './CodeBlock';
import { StatusBadge, LanguageBadge, CategoryBadge, DifficultyBadge } from './StatusBadge';
import {
  X,
  Star,
  ExternalLink,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Share2,
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ElementModalProps {
  element: EducationalElement | null;
  isOpen: boolean;
  onClose: () => void;
  status: StudyStatus;
  isFavorite: boolean;
  onStatusChange: (newStatus: StudyStatus) => void;
  onFavoriteToggle: () => void;
  onOpenRelated?: (elementId: string) => void;
}

export const ElementModal: React.FC<ElementModalProps> = ({
  element,
  isOpen,
  onClose,
  status,
  isFavorite,
  onStatusChange,
  onFavoriteToggle,
  onOpenRelated
}) => {
  if (!isOpen || !element) return null;

  const langInfo = LANGUAGES[element.language];

  // Estado del mini quiz interactivo de la ficha
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [activeEquivalentTab, setActiveEquivalentTab] = useState<LanguageId | null>(null);

  const handleSelectQuizOption = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
    setHasAnswered(true);
    if (index === element.miniQuiz.correctIndex) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      // Si respondió bien, actualizamos el estado si no estaba aprendido
      if (status !== 'learned') {
        onStatusChange('learned');
      }
    } else {
      // Si falló, marcamos como necesita repaso
      onStatusChange('needs_review');
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
  };

  // Equivalencias
  const equivalents = element.equivalents || [];
  const currentEquivalent = activeEquivalentTab
    ? equivalents.find(eq => eq.language === activeEquivalentTab) || equivalents[0]
    : equivalents[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-800 dark:text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Cabecera de la Ficha */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-bold font-mono tracking-tight text-indigo-600 dark:text-indigo-400">
              {element.name}
            </h2>
            <LanguageBadge language={element.language} />
            <CategoryBadge category={element.category} />
            <DifficultyBadge difficulty={element.difficulty} />
          </div>

          <div className="flex items-center gap-2">
            {/* 18. Botón Favoritos */}
            <button
              onClick={onFavoriteToggle}
              title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              className={`p-2 rounded-lg border transition-all ${
                isFavorite
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-500 hover:bg-amber-500/25'
                  : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500'
              }`}
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-amber-500' : ''}`} />
            </button>

            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenido scrolleable de la Ficha */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* 19. Selector de Estado de Aprendizaje */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                Estado de estudio:
              </span>
              <StatusBadge status={status} />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {(['not_studied', 'studying', 'learned', 'needs_review'] as StudyStatus[]).map(st => (
                <button
                  key={st}
                  onClick={() => onStatusChange(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    status === st
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {st === 'not_studied' && 'No estudiado'}
                  {st === 'studying' && 'Estudiando'}
                  {st === 'learned' && 'Aprendido'}
                  {st === 'needs_review' && 'Repasar'}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Definición sencilla & 6. Explicación técnica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-semibold mb-2 text-sm">
                <Lightbulb className="w-4 h-4" />
                <span>¿Qué es? (Definición sencilla)</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {element.definition}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold mb-2 text-sm">
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>Explicación técnica</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {element.technicalExplanation}
              </p>
            </div>
          </div>

          {/* 7. Para qué sirve & 8. Por qué es importante */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-1">
                ¿Para qué sirve?
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">{element.purpose}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-1">
                ¿Por qué es importante?
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">{element.importance}</p>
            </div>
          </div>

          {/* 9. Sintaxis */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-1">
              Sintaxis
            </h4>
            <CodeBlock code={element.syntax} language={element.language} title="Estructura formal" />
          </div>

          {/* 10. Ejemplo básico & 11. Ejemplo práctico */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-1">
                Mini ejemplo práctico
              </h4>
              <CodeBlock code={element.practicalExample} language={element.language} title={`${element.name} — ${langInfo.name}`} />
            </div>

            {/* 13. Resultado esperado */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
              <div className="text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Resultado esperado en consola:
              </div>
              <div className="text-emerald-400 whitespace-pre-wrap pl-3.5 border-l-2 border-emerald-500/50">
                {element.expectedOutput}
              </div>
            </div>
          </div>

          {/* 12. Explicación paso a paso (Línea por línea) */}
          {element.lineByLineExplanation && element.lineByLineExplanation.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2">
                Explicación paso a paso
              </h4>
              <div className="space-y-2 rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
                {element.lineByLineExplanation.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row sm:items-start gap-2">
                    <code className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-1 rounded sm:w-1/3 shrink-0">
                      {item.line}
                    </code>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed sm:w-2/3">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 14. Errores comunes */}
          {element.commonMistakes && element.commonMistakes.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-semibold mb-2 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Errores comunes y cómo evitarlos</span>
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-rose-900 dark:text-rose-200/90">
                {element.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="leading-relaxed">{mistake}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 16. Equivalencias con los otros 3 lenguajes */}
          {equivalents.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5 text-indigo-500" />
                Relación y equivalencias en otros lenguajes
              </h4>

              {/* Pestañas de lenguajes equivalentes */}
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2 mb-3 overflow-x-auto">
                {equivalents.map(eq => (
                  <button
                    key={eq.language}
                    onClick={() => setActiveEquivalentTab(eq.language)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                      currentEquivalent?.language === eq.language
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {eq.language}
                  </button>
                ))}
              </div>

              {currentEquivalent && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span>Equivalente: <strong className="text-indigo-600 dark:text-indigo-400">{currentEquivalent.name}</strong></span>
                    <span>{currentEquivalent.exists ? 'Existe directamente' : 'Alternativa idiomática'}</span>
                  </div>
                  <CodeBlock code={currentEquivalent.codeSnippet} language={currentEquivalent.language} />
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    {currentEquivalent.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 15. Elementos relacionados */}
          {element.relatedTopics && element.relatedTopics.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2">
                Temas relacionados
              </h4>
              <div className="flex flex-wrap gap-2">
                {element.relatedTopics.map(relId => {
                  const relItem = getElementById(relId);
                  return (
                    <button
                      key={relId}
                      onClick={() => onOpenRelated && onOpenRelated(relId)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-slate-200 dark:border-slate-700 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <span>{relItem ? relItem.name : relId}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 20. Mini pregunta de comprobación */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                <HelpCircle className="w-4 h-4 text-indigo-500" />
                <span>Mini comprobación de aprendizaje</span>
              </div>
              {hasAnswered && (
                <button
                  onClick={handleResetQuiz}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Intentar de nuevo
                </button>
              )}
            </div>

            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3">
              {element.miniQuiz.question}
            </p>

            <div className="space-y-2">
              {element.miniQuiz.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === element.miniQuiz.correctIndex;
                let btnStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400';

                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-medium';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300';
                  } else {
                    btnStyle = 'opacity-50 border-slate-200 dark:border-slate-700';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => handleSelectQuizOption(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs bg-slate-100 dark:bg-slate-700 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {hasAnswered && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {hasAnswered && (
              <div className={`mt-3 p-3 rounded-lg text-xs leading-relaxed ${
                selectedAnswer === element.miniQuiz.correctIndex
                  ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30'
              }`}>
                <strong>
                  {selectedAnswer === element.miniQuiz.correctIndex ? '¡Excelente respuesta!' : 'Respuesta incorrecta:'}
                </strong>{' '}
                {element.miniQuiz.explanation}
              </div>
            )}
          </div>

          {/* Enlace a documentación oficial */}
          {element.documentationUrl && (
            <div className="pt-2 flex justify-end">
              <a
                href={element.documentationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <span>Documentación oficial de {langInfo.name} ({langInfo.version})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
