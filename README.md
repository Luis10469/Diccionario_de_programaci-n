# CodeLex — Diccionario Interactivo de Programación 📚🚀

**CodeLex** es una plataforma educativa web moderna diseñada para estudiantes y principiantes en programación. Permite aprender, consultar, buscar, comparar y practicar los elementos fundamentales de los principales lenguajes de programación: **JavaScript**, **Python**, **Java** y **Kotlin**.

🌐 **Enlace de despliegue en GitHub Pages:**
`https://luis10469.github.io/Diccionario_de_programaci-n/`

---

## 🌟 Características Principales

### 1. 🔍 Buscador Inteligente en Tiempo Real
- Coincidencias instantáneas mientras escribes (sin necesidad de presionar Enter).
- Búsquedas por término exacto o funcional en lenguaje natural en español:
  - *"guardar texto"* ➔ `String`, `str`
  - *"repetir código"* ➔ `for`, `while`
  - *"números decimales"* ➔ `float`, `double`, `number`
  - *"tomar decisiones"* ➔ `if`, `when`, `switch`
- Filtros combinables por **Lenguaje**, **Categoría técnica** y **Nivel de dificultad**.
- Detección de elementos no existentes con sugerencias didácticas reales (ej. buscar `val` en Python explica por qué no existe y ofrece alternativas idiomáticas).

### 2. 📖 Ficha Educativa Completa (20 Puntos Técnicos)
Cada elemento abre una ficha detallada que incluye:
1. Nombre del elemento
2. Lenguaje oficial
3. Categoría técnica (Palabras reservadas, Tipos, Operadores, Funciones, Conceptos)
4. Nivel de dificultad (Principiante, Intermedio, Avanzado)
5. Definición sencilla
6. Explicación técnica formal
7. ¿Para qué sirve?
8. ¿Por qué es importante?
9. Sintaxis formal
10. Ejemplo básico
11. Ejemplo práctico contextualizado
12. Explicación paso a paso (Línea por línea)
13. Resultado esperado en consola
14. Errores comunes y cómo evitarlos
15. Temas relacionados vinculados
16. Equivalencias con los otros 3 lenguajes
17. Botón para copiar código
18. Botón para agregar a favoritos
19. Selector de estado de aprendizaje (*No estudiado*, *Estudiando*, *Aprendido*, *Necesita repaso*)
20. Mini comprobación interactiva con feedback y confetti

### 3. ⚖️ Comparador Entre Lenguajes
- Vista en paralelo (4 columnas) y pestañas optimizadas para móviles.
- Comparativa lado a lado de:
  - Declaración de constantes inmutables (`const`, `Final`, `final`, `val`)
  - Declaración de variables mutables (`let`, asignación directa, `int`, `var`)
  - Impresión en consola (`console.log`, `print`, `System.out.println`, `println`)
  - Condicionales y operadores de decisión
  - Definición de funciones
  - Manejo de valores nulos (*Null Safety*, *Elvis operator*, *Optional Chaining*, *is None*)

### 4. 🎓 Rutas de Aprendizaje Estructuradas (5 Niveles)
Ruta progresiva para cada lenguaje:
- **Nivel 1:** Fundamentos (Variables, tipos primitivos, entrada/salida)
- **Nivel 2:** Control del programa (Condicionales, bucles, funciones)
- **Nivel 3:** Estructuras de datos (Arreglos, listas, diccionarios, conjuntos)
- **Nivel 4:** Programación Orientada a Objetos (Clases, constructores, herencia, interfaces)
- **Nivel 5:** Temas avanzados (Manejo de excepciones, Null Safety, asincronía)

### 5. 🎯 Ejercicios Interactivos y Modo Repaso
- 4 tipos de preguntas:
  - Opción múltiple
  - Identificación de errores de código (bugs)
  - Predicción de resultados y salidas de consola
  - Completar líneas de código
- Explicaciones pedagógicas tanto para respuestas correctas como erróneas.
- **Modo Repaso:** filtra automáticamente los conceptos fallados o marcados para revisión.
- Historial de respuestas y métricas de precisión en tiempo real.

### 6. 📊 Seguimiento de Progreso y Persistencia
- Almacenamiento local automático en `localStorage`.
- Monitoreo del porcentaje de dominio por lenguaje.
- Cola de repaso activa y opción de exportar copia de seguridad en JSON.
- Soporte para **Modo Oscuro** y **Modo Claro**.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Estilos:** Tailwind CSS v4
- **Iconografía:** Lucide React
- **Efectos:** Canvas Confetti
- **Testing:** Vitest
- **Despliegue:** GitHub Actions & GitHub Pages

---

## 🚀 Instalación y Ejecución Local

1. Clona el repositorio:
```bash
git clone https://github.com/Luis10469/Diccionario_de_programaci-n.git
cd Diccionario_de_programaci-n
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Ejecuta las pruebas unitarias:
```bash
npm test
```

5. Compila para producción:
```bash
npm run build
```

---

## 📄 Especificaciones Oficiales Documentadas

- **JavaScript:** ECMAScript 2024 / MDN Web Docs
- **Python:** Python 3.12 / 3.13 (Python Software Foundation)
- **Java:** Java SE 21 LTS (Oracle / OpenJDK)
- **Kotlin:** Kotlin 2.0 (JetBrains)
