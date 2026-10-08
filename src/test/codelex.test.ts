import { describe, it, expect, beforeEach } from 'vitest';
import { searchElements } from '../services/searchService';
import { ALL_ELEMENTS, getElementById, getElementsByLanguage } from '../data/elements';
import { COMPARISONS_DATA } from '../data/comparisons';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import {
  loadProgress,
  saveProgress,
  setElementStatus,
  toggleFavorite,
  getLanguageProgressStats,
  recordQuizAnswer
} from '../services/storageService';

// Mock localStorage for test environment
class LocalStorageMock {
  private store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

globalThis.localStorage = new LocalStorageMock() as any;

describe('CodeLex Platform Acceptance Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('1. Criterios de Búsqueda Inteligente', () => {
    it('Buscar "String" muestra resultados para los 4 lenguajes distinguiendo representaciones', () => {
      const outcome = searchElements('String');
      expect(outcome.results.length).toBeGreaterThanOrEqual(4);

      const foundLanguages = new Set(outcome.results.map(r => r.element.language));
      expect(foundLanguages.has('kotlin')).toBe(true);
      expect(foundLanguages.has('java')).toBe(true);
      expect(foundLanguages.has('javascript')).toBe(true);
      expect(foundLanguages.has('python')).toBe(true);

      // Distinción de tipos: Python tiene 'str', Java tiene 'String', JS tiene 'string / String', Kotlin tiene 'String'
      const pyStr = outcome.results.find(r => r.element.language === 'python');
      expect(pyStr?.element.name).toBe('str');

      const javaStr = outcome.results.find(r => r.element.language === 'java');
      expect(javaStr?.element.name).toBe('String');
    });

    it('Buscar "if" muestra las fichas adecuadas de cada lenguaje', () => {
      const outcome = searchElements('if');
      expect(outcome.results.length).toBeGreaterThanOrEqual(4);

      const ifElements = outcome.results.filter(r => r.element.name === 'if');
      expect(ifElements.length).toBeGreaterThanOrEqual(3);
    });

    it('Filtrar por Kotlin no devuelve elementos exclusivos de Python', () => {
      const outcome = searchElements('', { language: 'kotlin' });
      for (const r of outcome.results) {
        expect(r.element.language).toBe('kotlin');
      }

      // No debe contener elementos de Python
      const hasPythonDef = outcome.results.some(r => r.element.id === 'py-def');
      expect(hasPythonDef).toBe(false);
    });

    it('Buscar "números decimales" en lenguaje natural encuentra float, double y number', () => {
      const outcome = searchElements('números decimales');
      expect(outcome.results.length).toBeGreaterThan(0);

      const names = outcome.results.map(r => r.element.name.toLowerCase());
      const hasDecimalType = names.some(n => n.includes('float') || n.includes('double') || n.includes('number'));
      expect(hasDecimalType).toBe(true);
    });

    it('Buscar un elemento que no existe en un lenguaje (ej. val en Python) ofrece explicación y alternativa', () => {
      const outcome = searchElements('val', { language: 'python' });
      expect(outcome.suggestion).toBeDefined();
      expect(outcome.suggestion?.targetLanguage).toBe('python');
      expect(outcome.suggestion?.originLanguage).toBe('kotlin');
      expect(outcome.suggestion?.message).toContain('Kotlin');
      expect(outcome.suggestion?.recommendedElementIds.length).toBeGreaterThan(0);
    });
  });

  describe('2. Comparador entre lenguajes', () => {
    it('Comparar variables muestra ejemplos correctos en los cuatro lenguajes', () => {
      const varConcept = COMPARISONS_DATA.find(c => c.id === 'compare-variables-immutable');
      expect(varConcept).toBeDefined();

      if (varConcept) {
        expect(varConcept.implementations.javascript.code).toContain('const');
        expect(varConcept.implementations.python.code).toContain('Final');
        expect(varConcept.implementations.java.code).toContain('final');
        expect(varConcept.implementations.kotlin.code).toContain('val');
      }
    });

    it('Comparar null handling describe Null Safety en Kotlin y alternativas', () => {
      const nullConcept = COMPARISONS_DATA.find(c => c.id === 'compare-null-handling');
      expect(nullConcept).toBeDefined();
      expect(nullConcept?.implementations.kotlin.code).toContain('?:');
      expect(nullConcept?.implementations.javascript.code).toContain('?.');
    });
  });

  describe('3. Persistencia de Progreso y Favoritos', () => {
    it('Marcar una palabra como aprendida actualiza y persiste el estado', () => {
      let progress = loadProgress();
      expect(progress.statusByElementId['kt-val']).toBeUndefined();

      progress = setElementStatus('kt-val', 'learned');
      expect(progress.statusByElementId['kt-val']).toBe('learned');

      // Simular recarga de página leyendo de nuevo localStorage
      const reloaded = loadProgress();
      expect(reloaded.statusByElementId['kt-val']).toBe('learned');
    });

    it('Agregar y quitar favoritos persiste correctamente', () => {
      const { progress: p1, isFavorite: f1 } = toggleFavorite('py-def');
      expect(f1).toBe(true);
      expect(p1.favorites).toContain('py-def');

      // Leer de storage recargado
      const reloaded = loadProgress();
      expect(reloaded.favorites).toContain('py-def');

      // Quitar favorito
      const { progress: p2, isFavorite: f2 } = toggleFavorite('py-def');
      expect(f2).toBe(false);
      expect(p2.favorites).not.toContain('py-def');
    });

    it('El porcentaje de progreso se calcula con precisión', () => {
      const initialStats = getLanguageProgressStats('kotlin', loadProgress());
      expect(initialStats.total).toBeGreaterThan(0);

      setElementStatus('kt-val', 'learned');
      const updatedStats = getLanguageProgressStats('kotlin', loadProgress());
      expect(updatedStats.learned).toBe(1);
      expect(updatedStats.percentage).toBeGreaterThan(0);
    });
  });

  describe('4. Ejercicios Interactivos', () => {
    it('Cada pregunta tiene opciones, índice correcto y explicación didáctica', () => {
      expect(QUIZ_QUESTIONS.length).toBeGreaterThanOrEqual(10);
      for (const q of QUIZ_QUESTIONS) {
        expect(q.options.length).toBeGreaterThanOrEqual(2);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
        expect(q.explanation.length).toBeGreaterThan(15);
      }
    });

    it('Fallar una pregunta marca el concepto relacionado para repaso (needs_review)', () => {
      const q = QUIZ_QUESTIONS[0];
      const updated = recordQuizAnswer(q.id, false, q.relatedElementId);

      if (q.relatedElementId) {
        expect(updated.statusByElementId[q.relatedElementId]).toBe('needs_review');
      }
    });
  });

  describe('5. Cobertura de Palabras Reservadas Oficiales', () => {
    it('Incluye todas las palabras reservadas clave en cada lenguaje', () => {
      const jsElements = getElementsByLanguage('javascript');
      const pyElements = getElementsByLanguage('python');
      const javaElements = getElementsByLanguage('java');
      const ktElements = getElementsByLanguage('kotlin');

      // JavaScript
      const jsNames = jsElements.map(e => e.name);
      expect(jsNames).toContain('const');
      expect(jsNames).toContain('let');
      expect(jsNames).toContain('function');
      expect(jsNames).toContain('await');
      expect(jsNames).toContain('return');

      // Python
      const pyNames = pyElements.map(e => e.name);
      expect(pyNames).toContain('def');
      expect(pyNames).toContain('if');
      expect(pyNames).toContain('while');
      expect(pyNames).toContain('class');
      expect(pyNames).toContain('with');

      // Java
      const javaNames = javaElements.map(e => e.name);
      expect(javaNames).toContain('class');
      expect(javaNames).toContain('final');
      expect(javaNames).toContain('public');
      expect(javaNames).toContain('void');

      // Kotlin
      const ktNames = ktElements.map(e => e.name);
      expect(ktNames).toContain('val');
      expect(ktNames).toContain('var');
      expect(ktNames).toContain('fun');
      expect(ktNames).toContain('when');
    });
  });
});
