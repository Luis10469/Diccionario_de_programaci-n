import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // JAVASCRIPT
  {
    id: 'quiz-js-1',
    language: 'javascript',
    category: 'datatype',
    difficulty: 'beginner',
    type: 'multiple_choice',
    prompt: '¿Qué tipo de dato utilizarías para almacenar la edad de una persona en JavaScript?',
    options: ['String', 'number', 'boolean', 'BigInt'],
    correctIndex: 1,
    explanation: 'En JavaScript, todos los números (enteros o decimales estándar) pertenecen al tipo primitivo `number`.',
    relatedElementId: 'js-datatype-number'
  },
  {
    id: 'quiz-js-2',
    language: 'javascript',
    category: 'keyword',
    difficulty: 'beginner',
    type: 'identify_bug',
    prompt: '¿Por qué la siguiente asignación genera un error en tiempo de ejecución?',
    codeSnippet: 'const total = 100;\ntotal = 150;',
    options: [
      'Porque falta el punto y coma en la primera línea',
      'Porque una variable declarada con `const` no puede ser reasignada a un nuevo valor',
      'Porque total debe ser un string',
      'Porque en JavaScript no se pueden usar números mayores a 100'
    ],
    correctIndex: 1,
    explanation: '`const` crea un enlace constante e inmutable. Intentar asignarle otro valor lanza un `TypeError: Assignment to constant variable`. Si el valor necesita cambiar, debe usarse `let`.',
    relatedElementId: 'js-const'
  },
  {
    id: 'quiz-js-3',
    language: 'javascript',
    category: 'operator',
    difficulty: 'beginner',
    type: 'predict_output',
    prompt: '¿Cuál es la salida de la siguiente comparación en la consola?',
    codeSnippet: 'console.log(5 === "5");',
    options: [
      'true',
      'false',
      'undefined',
      'Lanza un TypeError'
    ],
    correctIndex: 1,
    explanation: 'El operador de igualdad estricta `===` no realiza conversión automática de tipos. Como 5 es de tipo `number` y "5" es `string`, evalúa a `false`.',
    relatedElementId: 'js-operator-strict-equality'
  },
  {
    id: 'quiz-js-4',
    language: 'javascript',
    category: 'keyword',
    difficulty: 'beginner',
    type: 'fill_blank',
    prompt: 'Completa la línea para declarar una función que sume dos números:',
    codeSnippet: '______ sumar(a, b) {\n  return a + b;\n}',
    options: ['fun', 'def', 'function', 'fn'],
    correctIndex: 2,
    explanation: 'En JavaScript estándar, las declaraciones de función tradicionales se inician con la palabra reservada `function`.',
    relatedElementId: 'js-function'
  },

  // PYTHON
  {
    id: 'quiz-py-1',
    language: 'python',
    category: 'keyword',
    difficulty: 'beginner',
    type: 'fill_blank',
    prompt: '¿Qué palabra reservada completa la definición de una función en Python?',
    codeSnippet: '______ calcular_promedio(notas):\n    return sum(notas) / len(notas)',
    options: ['func', 'function', 'def', 'define'],
    correctIndex: 2,
    explanation: 'Python utiliza la palabra clave `def` (de "define") para declarar funciones y métodos.',
    relatedElementId: 'py-def'
  },
  {
    id: 'quiz-py-2',
    language: 'python',
    category: 'operator',
    difficulty: 'beginner',
    type: 'predict_output',
    prompt: '¿Cuál es el resultado de evaluar este código en Python 3?',
    codeSnippet: 'print(type(10 / 2).__name__)',
    options: ['int', 'float', 'number', 'double'],
    correctIndex: 1,
    explanation: 'En Python 3, la división simple `/` siempre retorna un número de tipo `float` (5.0), sin importar si la división es exacta.',
    relatedElementId: 'py-datatype-float'
  },
  {
    id: 'quiz-py-3',
    language: 'python',
    category: 'keyword',
    difficulty: 'beginner',
    type: 'identify_bug',
    prompt: '¿Qué error sintáctico tiene el siguiente código condicional?',
    codeSnippet: 'temperatura = 28\nif temperatura > 25\n    print("Hace calor")',
    options: [
      'Faltan paréntesis alrededor de la condición',
      'Faltan los dos puntos `:` al final de la línea del `if`',
      'La variable temperatura debe declararse con let',
      'Python no permite comparar números con >'
    ],
    correctIndex: 1,
    explanation: 'En Python, las cabeceras de estructuras compuestas (`if`, `for`, `def`, `class`, etc.) deben terminar obligatoriamente con dos puntos `:`.',
    relatedElementId: 'py-if'
  },
  {
    id: 'quiz-py-4',
    language: 'python',
    category: 'builtin-function',
    difficulty: 'beginner',
    type: 'predict_output',
    prompt: '¿Qué salida imprimirá este programa en Python?',
    codeSnippet: 'frutas = ["manzana", "platano", "fresa"]\nprint(len(frutas))',
    options: ['2', '3', '4', 'Lanza un error'],
    correctIndex: 1,
    explanation: 'La función integrada `len()` devuelve el número total de elementos en la secuencia (en este caso 3 frutas).',
    relatedElementId: 'py-builtin-len'
  },

  // JAVA
  {
    id: 'quiz-java-1',
    language: 'java',
    category: 'datatype',
    difficulty: 'beginner',
    type: 'multiple_choice',
    prompt: 'En Java, ¿cuál es la forma correcta y segura de comparar si dos cadenas tienen el mismo texto?',
    options: [
      'cadena1 == cadena2',
      'cadena1.equals(cadena2)',
      'cadena1 === cadena2',
      'cadena1.isSame(cadena2)'
    ],
    correctIndex: 1,
    explanation: 'En Java, el método `.equals()` compara los caracteres del contenido. El operador `==` solo compara si ambas variables apuntan a la misma dirección física en memoria.',
    relatedElementId: 'java-datatype-string'
  },
  {
    id: 'quiz-java-2',
    language: 'java',
    category: 'keyword',
    difficulty: 'beginner',
    type: 'identify_bug',
    prompt: '¿Por qué este código de Java produce un error de compilación?',
    codeSnippet: 'final int MAXIMO = 100;\nMAXIMO = 200;',
    options: [
      'Porque en Java las variables deben ir en minúsculas',
      'Porque la palabra `final` prohíbe reasignar el valor de la variable',
      'Porque falta importar el paquete de enteros',
      'Porque se debe usar float'
    ],
    correctIndex: 1,
    explanation: 'El modificador `final` en Java convierte a la variable en una constante inmutable que no puede ser reasignada una vez inicializada.',
    relatedElementId: 'java-final'
  },
  {
    id: 'quiz-java-3',
    language: 'java',
    category: 'builtin-function',
    difficulty: 'beginner',
    type: 'fill_blank',
    prompt: 'Completa la instrucción para imprimir una línea en la consola de Java:',
    codeSnippet: '______.out.println("Bienvenido a Java");',
    options: ['Console', 'Print', 'System', 'Terminal'],
    correctIndex: 2,
    explanation: 'En Java se utiliza la clase `System` y su campo estático `out` (`System.out.println()`).',
    relatedElementId: 'java-builtin-println'
  },

  // KOTLIN
  {
    id: 'quiz-kt-1',
    language: 'kotlin',
    category: 'keyword',
    difficulty: 'beginner',
    type: 'multiple_choice',
    prompt: '¿Qué palabra reservada se utiliza en Kotlin para declarar una variable de solo lectura (inmutable)?',
    options: ['var', 'val', 'const', 'let'],
    correctIndex: 1,
    explanation: 'Kotlin utiliza `val` (value) para declarar referencias inmutables de solo lectura, y `var` para variables mutables.',
    relatedElementId: 'kt-val'
  },
  {
    id: 'quiz-kt-2',
    language: 'kotlin',
    category: 'operator',
    difficulty: 'beginner',
    type: 'predict_output',
    prompt: '¿Cuál es el resultado de la siguiente expresión con el operador Elvis `?:`?',
    codeSnippet: 'val usuario: String? = null\nval resultado = usuario ?: "Invitado"\nprintln(resultado)',
    options: ['null', '"Invitado"', 'Lanza un NullPointerException', '"" (cadena vacía)'],
    correctIndex: 1,
    explanation: 'El operador Elvis `?:` evalúa la izquierda: si es `null`, devuelve el valor de respaldo especificado en la derecha ("Invitado").',
    relatedElementId: 'kt-operator-elvis'
  },
  {
    id: 'quiz-kt-3',
    language: 'kotlin',
    category: 'keyword',
    difficulty: 'beginner',
    type: 'identify_bug',
    prompt: '¿Qué error arroja el compilador de Kotlin en la segunda línea de este código?',
    codeSnippet: 'val ciudad: String = "Madrid"\nciudad = "Barcelona"',
    options: [
      'Type mismatch',
      'Val cannot be reassigned',
      'Unresolved reference',
      'Missing semicolon'
    ],
    correctIndex: 1,
    explanation: 'En Kotlin, una variable declarada con `val` no puede ser reasignada. Si se necesita mutabilidad debe usarse `var`.',
    relatedElementId: 'kt-val'
  },
  {
    id: 'quiz-kt-4',
    language: 'kotlin',
    category: 'keyword',
    difficulty: 'beginner',
    type: 'fill_blank',
    prompt: 'Completa la declaración de la función en Kotlin:',
    codeSnippet: '______ multiplicar(x: Int, y: Int): Int = x * y',
    options: ['function', 'def', 'fun', 'fn'],
    correctIndex: 2,
    explanation: 'Kotlin utiliza la palabra clave `fun` para declarar funciones tanto estándar como de expresión única.',
    relatedElementId: 'kt-fun'
  }
];
