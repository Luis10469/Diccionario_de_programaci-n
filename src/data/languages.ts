import { LanguageId, LanguageInfo } from '../types';

export const LANGUAGES: Record<LanguageId, LanguageInfo> = {
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    version: 'ECMAScript 2024 (ES15)',
    officialDoc: 'https://developer.mozilla.org/es/docs/Web/JavaScript',
    accentColor: '#f7df1e',
    description: 'Lenguaje dinámico, multiparadigma, interpretado por navegadores y entornos como Node.js.',
    paradigm: 'Multiparadigma (funcional, imperativo, basado en prototipos)',
    fileExtension: '.js',
  },
  python: {
    id: 'python',
    name: 'Python',
    version: 'Python 3.12 / 3.13',
    officialDoc: 'https://docs.python.org/3/',
    accentColor: '#3776ab',
    description: 'Lenguaje de alto nivel conocido por su sintaxis limpia, legible y fuerte presencia en ciencia de datos y backend.',
    paradigm: 'Multiparadigma (orientado a objetos, imperativo, funcional)',
    fileExtension: '.py',
  },
  java: {
    id: 'java',
    name: 'Java',
    version: 'Java SE 21 LTS',
    officialDoc: 'https://docs.oracle.com/en/java/javase/21/',
    accentColor: '#e76f00',
    description: 'Lenguaje orientado a objetos con tipado estático fuerte, portabilidad JVM ("Write Once, Run Anywhere") y robustez empresarial.',
    paradigm: 'Orientado a objetos, tipado estático estricto, genéricos',
    fileExtension: '.java',
  },
  kotlin: {
    id: 'kotlin',
    name: 'Kotlin',
    version: 'Kotlin 2.0',
    officialDoc: 'https://kotlinlang.org/docs/home.html',
    accentColor: '#7f52ff',
    description: 'Lenguaje moderno para la JVM con seguridad contra nulos (Null Safety), concisión e interoperabilidad 100% con Java.',
    paradigm: 'Estáticamente tipado, funcional y orientado a objetos',
    fileExtension: '.kt',
  },
};
