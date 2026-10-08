import React, { useState } from 'react';
import { COMPARISONS_DATA } from '../data/comparisons';
import { LANGUAGES } from '../data/languages';
import { LanguageId, ComparisonConcept } from '../types';
import { CodeBlock } from '../components/CodeBlock';
import { GitCompare, Sparkles, Check, Info } from 'lucide-react';

export const ComparatorView: React.FC = () => {
  const [selectedConceptId, setSelectedConceptId] = useState<string>(COMPARISONS_DATA[0].id);
  const [mobileTab, setMobileTab] = useState<LanguageId>('javascript');

  const currentConcept = COMPARISONS_DATA.find(c => c.id === selectedConceptId) || COMPARISONS_DATA[0];

  const languagesList: LanguageId[] = ['javascript', 'python', 'java', 'kotlin'];

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Cabecera */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <GitCompare className="w-4 h-4" />
          <span>Comparador Sintáctico y Arquitectural</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Comparar Lenguajes
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Analiza cómo se implementa el mismo concepto en JavaScript, Python, Java y Kotlin sin inventar falsas equivalencias.
        </p>
      </div>

      {/* Selector de Concepto a Comparar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {COMPARISONS_DATA.map(concept => {
          const isSelected = concept.id === selectedConceptId;
          return (
            <button
              key={concept.id}
              onClick={() => setSelectedConceptId(concept.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {concept.title}
            </button>
          );
        })}
      </div>

      {/* Tarjeta de Resumen del Concepto Seleccionado */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            Categoría: {currentConcept.category}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {currentConcept.title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {currentConcept.description}
        </p>
      </div>

      {/* Pestañas para Celulares / Pantallas Pequeñas */}
      <div className="lg:hidden flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {languagesList.map(langId => {
          const l = LANGUAGES[langId];
          const isSelected = mobileTab === langId;
          return (
            <button
              key={langId}
              onClick={() => setMobileTab(langId)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.accentColor }} />
              <span>{l.name}</span>
            </button>
          );
        })}
      </div>

      {/* Vista de Comparación en Celulares (Tab Activa) */}
      <div className="lg:hidden">
        {(() => {
          const lang = LANGUAGES[mobileTab];
          const impl = currentConcept.implementations[mobileTab];
          return (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.accentColor }} />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{lang.name}</h3>
                </div>
                <span className="text-xs font-mono text-slate-400">{lang.version}</span>
              </div>

              <CodeBlock code={impl.code} language={mobileTab} title={lang.name} />

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>Explicación:</strong> {impl.explanation}
                </div>
                <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 text-indigo-900 dark:text-indigo-300">
                  <strong>Detalle técnico:</strong> {impl.notes}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Vista lado a lado en Pantallas Medianas y Grandes (4 Columnas) */}
      <div className="hidden lg:grid grid-cols-4 gap-4">
        {languagesList.map(langId => {
          const lang = LANGUAGES[langId];
          const impl = currentConcept.implementations[langId];

          return (
            <div
              key={langId}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.accentColor }} />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{lang.name}</h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{lang.fileExtension}</span>
                </div>

                <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                  {lang.version}
                </div>

                <CodeBlock code={impl.code} language={langId} title={lang.name} />

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
                    <strong className="block text-slate-900 dark:text-white mb-1">Mecanismo:</strong>
                    {impl.explanation}
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 text-indigo-900 dark:text-indigo-300">
                    <strong className="block mb-1">Particularidad:</strong>
                    {impl.notes}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
