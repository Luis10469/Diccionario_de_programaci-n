export type LanguageId = 'javascript' | 'python' | 'java' | 'kotlin';

export type CategoryId = 
  | 'keyword'           // Categoría A: Palabras reservadas
  | 'datatype'          // Categoría B: Tipos de datos
  | 'operator'          // Categoría C: Operadores
  | 'builtin-function'  // Categoría D: Funciones y elementos predefinidos
  | 'concept';          // Categoría E: Conceptos de programación

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type StudyStatus = 'not_studied' | 'studying' | 'learned' | 'needs_review';

export interface KeywordDetail {
  isStrict: boolean;
  isContextual?: boolean;
  versionIntroduced?: string;
}

export interface CrossLanguageEquivalent {
  language: LanguageId;
  name: string;
  codeSnippet: string;
  explanation: string;
  exists: boolean;
  alternativeExplanation?: string;
}

export interface LineExplanation {
  line: string;
  explanation: string;
}

export interface MiniQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface EducationalElement {
  id: string;                         // e.g. 'kotlin-string', 'python-if'
  language: LanguageId;
  name: string;                       // e.g. 'String', 'val', 'def'
  category: CategoryId;
  difficulty: DifficultyLevel;
  
  // 20 Core Required Points
  definition: string;                 // Definición sencilla para principiantes
  technicalExplanation: string;       // Explicación técnica formal
  purpose: string;                    // ¿Para qué sirve?
  importance: string;                 // ¿Por qué es importante?
  syntax: string;                     // Sintaxis básica o firma
  basicExample: string;               // Ejemplo introductorio mínimo
  practicalExample: string;           // Ejemplo en contexto real/práctico
  lineByLineExplanation: LineExplanation[]; // Explicación línea por línea
  expectedOutput: string;             // Resultado esperado de la consola
  commonMistakes: string[];           // Errores frecuentes y cómo evitarlos
  relatedTopics: string[];            // Temas / IDs relacionados
  equivalents: CrossLanguageEquivalent[]; // Equivalencia en JS, Python, Java, Kotlin
  miniQuiz: MiniQuiz;                 // Mini pregunta de comprobación
  
  // Metadatos adicionales
  tags: string[];                     // Etiquetas para búsqueda en lenguaje natural
  documentationUrl?: string;          // Enlace a documentación oficial
  keywordMeta?: KeywordDetail;        // Si es palabra reservada
}

export interface LanguageInfo {
  id: LanguageId;
  name: string;
  version: string;
  officialDoc: string;
  accentColor: string; // Tailwind color class or hex
  description: string;
  paradigm: string;
  fileExtension: string;
}

export interface ComparisonConcept {
  id: string;
  title: string;
  category: string;
  description: string;
  implementations: {
    [key in LanguageId]: {
      code: string;
      explanation: string;
      pitfalls?: string;
      notes: string;
    };
  };
}

export interface LearningLesson {
  id: string;
  title: string;
  description: string;
  elementIds: string[]; // Referencias a elementos de la biblioteca
  keyTakeaway: string;
  sampleCode: string;
}

export interface LearningLevel {
  levelNumber: number;
  title: string;
  description: string;
  lessons: LearningLesson[];
}

export interface LanguageCurriculum {
  language: LanguageId;
  levels: LearningLevel[];
}

export type QuizType = 'multiple_choice' | 'identify_bug' | 'predict_output' | 'fill_blank';

export interface QuizQuestion {
  id: string;
  language: LanguageId;
  category: CategoryId;
  difficulty: DifficultyLevel;
  type: QuizType;
  prompt: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedElementId?: string;
}

export interface UserProgress {
  statusByElementId: Record<string, StudyStatus>;
  favorites: string[]; // Array of element IDs
  completedQuizIds: string[];
  quizScores: {
    totalAnswered: number;
    correctAnswers: number;
    history: Array<{
      questionId: string;
      wasCorrect: boolean;
      date: string;
    }>;
  };
  lastViewedElementIds: string[];
}
