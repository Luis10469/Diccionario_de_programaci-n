import { EducationalElement, LanguageId, CategoryId } from '../../types';
import { JAVASCRIPT_ELEMENTS } from './javascript';
import { PYTHON_ELEMENTS } from './python';
import { JAVA_ELEMENTS } from './java';
import { KOTLIN_ELEMENTS } from './kotlin';
import { generateAllKeywords } from './allKeywords';

// Build unified catalog: Core rich cards take precedence, followed by full keywords
function buildCatalog(): EducationalElement[] {
  const coreElements = [
    ...JAVASCRIPT_ELEMENTS,
    ...PYTHON_ELEMENTS,
    ...JAVA_ELEMENTS,
    ...KOTLIN_ELEMENTS,
  ];

  const generatedKeywords = generateAllKeywords();
  
  // Track existing names per language to avoid duplicates
  const existingKeys = new Set(coreElements.map(el => `${el.language}:${el.name.toLowerCase()}`));

  const all: EducationalElement[] = [...coreElements];

  for (const kw of generatedKeywords) {
    const key = `${kw.language}:${kw.name.toLowerCase()}`;
    if (!existingKeys.has(key)) {
      all.push(kw);
      existingKeys.add(key);
    }
  }

  return all;
}

export const ALL_ELEMENTS: EducationalElement[] = buildCatalog();

export function getAllElements(): EducationalElement[] {
  return ALL_ELEMENTS;
}

export function getElementById(id: string): EducationalElement | undefined {
  return ALL_ELEMENTS.find(el => el.id === id);
}

export function getElementsByLanguage(lang: LanguageId): EducationalElement[] {
  return ALL_ELEMENTS.filter(el => el.language === lang);
}

export function getElementsByCategory(category: CategoryId): EducationalElement[] {
  return ALL_ELEMENTS.filter(el => el.category === category);
}

export function getElementsByLanguageAndCategory(lang: LanguageId, category: CategoryId): EducationalElement[] {
  return ALL_ELEMENTS.filter(el => el.language === lang && el.category === category);
}
