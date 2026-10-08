import { EducationalElement, LanguageId, CategoryId, DifficultyLevel } from '../types';
import { ALL_ELEMENTS } from '../data/elements';

export interface SearchFilters {
  language?: LanguageId | 'all';
  category?: CategoryId | 'all';
  difficulty?: DifficultyLevel | 'all';
}

export interface SearchResult {
  element: EducationalElement;
  score: number;
  matchReason: string;
}

export interface AlternativeSuggestion {
  searchedTerm: string;
  targetLanguage: LanguageId;
  originLanguage?: LanguageId;
  message: string;
  recommendedElementIds: string[];
}

// Mapa de sinónimos e intenciones en lenguaje natural (español)
const SPANISH_INTENT_MAP: Record<string, string[]> = {
  'guardar texto': ['string', 'str'],
  'texto': ['string', 'str'],
  'cadena': ['string', 'str'],
  'repetir codigo': ['for', 'while'],
  'repetir código': ['for', 'while'],
  'repetir': ['for', 'while'],
  'bucle': ['for', 'while'],
  'ciclo': ['for', 'while'],
  'numeros decimales': ['float', 'double', 'number'],
  'números decimales': ['float', 'double', 'number'],
  'decimal': ['float', 'double', 'number'],
  'decimales': ['float', 'double', 'number'],
  'numeros': ['number', 'int', 'float', 'double'],
  'números': ['number', 'int', 'float', 'double'],
  'entero': ['int', 'number'],
  'guardar valor': ['const', 'let', 'val', 'var'],
  'guardar datos': ['const', 'let', 'val', 'var'],
  'constante': ['const', 'val', 'final'],
  'imprimir': ['print', 'println', 'console.log'],
  'mostrar texto': ['print', 'println', 'console.log'],
  'pantalla': ['print', 'println', 'console.log'],
  'consola': ['print', 'println', 'console.log'],
  'tomar decisiones': ['if', 'when', 'switch'],
  'condicion': ['if', 'when', 'switch'],
  'condición': ['if', 'when', 'switch'],
  'manejar errores': ['try', 'catch', 'except'],
  'capturar error': ['try', 'catch', 'except'],
  'excepcion': ['try', 'catch', 'except'],
  'excepción': ['try', 'catch', 'except'],
  'definir funcion': ['function', 'def', 'fun'],
  'definir función': ['function', 'def', 'fun'],
  'funcion': ['function', 'def', 'fun'],
  'función': ['function', 'def', 'fun'],
  'nulos': ['null', 'none', 'elvis', 'null safety'],
  'evitar null': ['null safety', 'elvis'],
  'seguridad nulos': ['null safety', 'elvis']
};

// Diccionario de elementos cruzados que no existen en ciertos lenguajes
const CROSS_LANGUAGE_ABSENT_MAP: Record<string, { origin: LanguageId; target: LanguageId; explanation: string; alternatives: string[] }> = {
  'val:python': {
    origin: 'kotlin',
    target: 'python',
    explanation: '`val` es una palabra clave de Kotlin para variables inmutables. En Python no existe `val`: las variables se asignan directamente o se usa la convención MAYÚSCULAS / typing.Final.',
    alternatives: ['py-concept-variables']
  },
  'const:python': {
    origin: 'javascript',
    target: 'python',
    explanation: '`const` no existe en Python. En Python se usan nombres en MAYÚSCULAS por convención o el tipo `Final` de `typing`.',
    alternatives: ['py-concept-variables']
  },
  'def:javascript': {
    origin: 'python',
    target: 'javascript',
    explanation: '`def` es la palabra reservada de Python para funciones. En JavaScript se utiliza `function` o funciones flecha `() => {}`.',
    alternatives: ['js-function']
  },
  'def:java': {
    origin: 'python',
    target: 'java',
    explanation: '`def` no existe en Java. En Java toda función es un método declarado con visibilidad y tipo de retorno (ej. `public int sumar(...)`).',
    alternatives: ['java-class']
  },
  'fun:python': {
    origin: 'kotlin',
    target: 'python',
    explanation: '`fun` es la palabra clave de Kotlin. En Python las funciones se definen con `def`.',
    alternatives: ['py-def']
  },
  'fun:javascript': {
    origin: 'kotlin',
    target: 'javascript',
    explanation: '`fun` no existe en JavaScript. En JavaScript se usa `function` o funciones flecha.',
    alternatives: ['js-function']
  },
  'let:python': {
    origin: 'javascript',
    target: 'python',
    explanation: '`let` no existe en Python. En Python las variables se asignan directamente con `=` sin palabras clave.',
    alternatives: ['py-concept-variables']
  },
  '===:python': {
    origin: 'javascript',
    target: 'python',
    explanation: 'El triple igual `===` es exclusivo de JavaScript. En Python se usa `==` para comparar valor o `is` para identidad de objeto en memoria.',
    alternatives: ['py-operator-membership-in']
  }
};

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function searchElements(
  query: string,
  filters: SearchFilters = {},
  elements: EducationalElement[] = ALL_ELEMENTS
): { results: SearchResult[]; suggestion?: AlternativeSuggestion } {
  const cleanQuery = query.trim();
  const normalizedQuery = normalizeText(cleanQuery);

  const selectedLang = filters.language && filters.language !== 'all' ? filters.language : null;
  const selectedCat = filters.category && filters.category !== 'all' ? filters.category : null;
  const selectedDiff = filters.difficulty && filters.difficulty !== 'all' ? filters.difficulty : null;

  // Verificar si el término no existe en el lenguaje seleccionado
  let suggestion: AlternativeSuggestion | undefined;
  if (selectedLang && cleanQuery) {
    const key = `${cleanQuery.toLowerCase()}:${selectedLang}`;
    const absentConfig = CROSS_LANGUAGE_ABSENT_MAP[key];
    if (absentConfig) {
      suggestion = {
        searchedTerm: cleanQuery,
        targetLanguage: selectedLang,
        originLanguage: absentConfig.origin,
        message: absentConfig.explanation,
        recommendedElementIds: absentConfig.alternatives
      };
    }
  }

  // Filtrado inicial por facetas
  let candidates = elements.filter(el => {
    if (selectedLang && el.language !== selectedLang) return false;
    if (selectedCat && el.category !== selectedCat) return false;
    if (selectedDiff && el.difficulty !== selectedDiff) return false;
    return true;
  });

  // Si no hay query, retornar candidatos ordenados por nombre
  if (!cleanQuery) {
    return {
      results: candidates.map(el => ({ element: el, score: 10, matchReason: 'Exploración general' })),
      suggestion
    };
  }

  // Comprobar mapa de intenciones en español
  const matchingIntents: string[] = [];
  for (const [intentPhrase, targetTerms] of Object.entries(SPANISH_INTENT_MAP)) {
    const normalizedIntent = normalizeText(intentPhrase);
    if (normalizedQuery.includes(normalizedIntent) || normalizedIntent.includes(normalizedQuery)) {
      matchingIntents.push(...targetTerms);
    }
  }

  const scoredResults: SearchResult[] = [];

  for (const el of candidates) {
    let score = 0;
    const reasons: string[] = [];
    const normName = normalizeText(el.name);
    const normDef = normalizeText(el.definition);
    const normPurp = normalizeText(el.purpose);
    const normTech = normalizeText(el.technicalExplanation);

    // 1. Coincidencia exacta de nombre
    if (normName === normalizedQuery) {
      score += 150;
      reasons.push('Coincidencia exacta de nombre');
    } else if (normName.startsWith(normalizedQuery)) {
      score += 90;
      reasons.push('El nombre comienza con la búsqueda');
    } else if (normName.includes(normalizedQuery)) {
      score += 60;
      reasons.push('El nombre contiene el término');
    }

    // 2. Coincidencia en etiquetas (tags)
    for (const tag of el.tags) {
      const normTag = normalizeText(tag);
      if (normTag === normalizedQuery) {
        score += 50;
        reasons.push(`Etiqueta exacta: "${tag}"`);
      } else if (normTag.includes(normalizedQuery)) {
        score += 30;
        reasons.push(`Etiqueta: "${tag}"`);
      }
    }

    // 3. Coincidencia por mapeo de lenguaje natural en español
    if (matchingIntents.length > 0) {
      for (const term of matchingIntents) {
        if (normName.includes(term) || el.tags.some(t => normalizeText(t).includes(term))) {
          score += 45;
          reasons.push(`Resultado relevante para la intención: "${cleanQuery}"`);
          break;
        }
      }
    }

    // 4. Búsqueda en propósito y definición
    if (normPurp.includes(normalizedQuery)) {
      score += 25;
      reasons.push('Coincide con el propósito educativo');
    }
    if (normDef.includes(normalizedQuery)) {
      score += 20;
      reasons.push('Coincide con la definición');
    }
    if (normTech.includes(normalizedQuery)) {
      score += 10;
    }

    if (score > 0) {
      scoredResults.push({
        element: el,
        score,
        matchReason: reasons[0] || 'Coincidencia parcial'
      });
    }
  }

  // Ordenar de mayor a menor relevancia
  scoredResults.sort((a, b) => b.score - a.score);

  return { results: scoredResults, suggestion };
}

export function getQuickSuggestions(query: string, limit = 5): string[] {
  const norm = normalizeText(query);
  if (!norm) return ['String', 'if', 'const', 'def', 'val', 'for'];

  const suggestions = new Set<string>();

  // Revisar nombres
  for (const el of ALL_ELEMENTS) {
    if (normalizeText(el.name).includes(norm)) {
      suggestions.add(el.name);
      if (suggestions.size >= limit) break;
    }
  }

  // Revisar frases comunes
  for (const phrase of Object.keys(SPANISH_INTENT_MAP)) {
    if (normalizeText(phrase).includes(norm)) {
      suggestions.add(phrase);
      if (suggestions.size >= limit) break;
    }
  }

  return Array.from(suggestions).slice(0, limit);
}
