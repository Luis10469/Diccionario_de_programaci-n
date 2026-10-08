import { EducationalElement } from '../../types';

export const JAVASCRIPT_ELEMENTS: EducationalElement[] = [
  // ==========================================
  // CATEGORÍA A: PALABRAS RESERVADAS (KEYWORDS)
  // ==========================================
  {
    id: 'js-const',
    language: 'javascript',
    name: 'const',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true, versionIntroduced: 'ES6 (ES2015)' },
    definition: 'Declara una variable con enlace constante cuyo identificador no puede ser reasignado a otro valor.',
    technicalExplanation: 'Crea una referencia inmutable de ámbito de bloque (block scope) con zona muerta temporal (TDZ). En objetos y arrays, la referencia es inmutable pero sus propiedades internas siguen siendo mutables.',
    purpose: 'Evitar reasignaciones accidentales de variables y comunicar claramente la intención de inmutabilidad de referencia.',
    importance: 'Es la forma recomendada por defecto para declarar identificadores en JavaScript moderno, mejorando la previsibilidad del código.',
    syntax: 'const NOMBRE_VARIABLE = valor;',
    basicExample: 'const PI = 3.14159;\n// PI = 3.14; // Error: Assignment to constant variable.',
    practicalExample: `const usuario = {
  nombre: "Carlos",
  edad: 25
};
usuario.edad = 26; // Válido: muta la propiedad
console.log(usuario.nombre + " tiene " + usuario.edad + " años");`,
    lineByLineExplanation: [
      { line: 'const usuario = { ... };', explanation: 'Declara la constante `usuario` que referencia a un objeto en memoria.' },
      { line: 'usuario.edad = 26;', explanation: 'Modifica la propiedad interna `edad`. La referencia de memoria no ha cambiado.' },
      { line: 'console.log(...);', explanation: 'Imprime en la consola el texto formateado con los valores del objeto.' }
    ],
    expectedOutput: 'Carlos tiene 26 años',
    commonMistakes: [
      'Intentar reasignar el valor completo con `usuario = {}`, lo cual lanza un TypeError.',
      'Creer erróneamente que `const` congela las propiedades de un objeto (para eso se usa `Object.freeze()`).',
      'Usar `const` sin inicializarla de inmediato (ej. `const x;` es un SyntaxError).'
    ],
    relatedTopics: ['js-let', 'js-var', 'js-concept-variables'],
    tags: ['constante', 'inmutable', 'variable', 'guardar valor', 'declarar'],
    documentationUrl: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/const',
    equivalents: [
      { language: 'python', name: 'Convención MAYÚSCULAS / typing.Final', codeSnippet: 'PI: Final = 3.14159', exists: false, explanation: 'Python no tiene palabra reservada `const`. Se usan mayúsculas por convención o el tipo `Final` del módulo `typing`.' },
      { language: 'java', name: 'final', codeSnippet: 'final double PI = 3.14159;', exists: true, explanation: 'En Java se usa el modificador `final` para impedir la reasignación.' },
      { language: 'kotlin', name: 'val', codeSnippet: 'val pi = 3.14159', exists: true, explanation: 'En Kotlin se usa `val` para declarar variables inmutables de solo lectura.' }
    ],
    miniQuiz: {
      question: '¿Qué ocurre si ejecutas: `const lista = [1, 2]; lista.push(3);` en JavaScript?',
      options: [
        'Lanza un TypeError porque la lista es constante',
        'Se agrega el número 3 exitosamente a la lista',
        'Lanza un SyntaxError al declarar const con array',
        'La lista se reinicia con solo el valor 3'
      ],
      correctIndex: 1,
      explanation: '`const` protege la referencia de la variable, no el contenido del array. Por eso `.push(3)` es completamente válido.'
    }
  },
  {
    id: 'js-let',
    language: 'javascript',
    name: 'let',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true, versionIntroduced: 'ES6 (ES2015)' },
    definition: 'Declara una variable reasignable con alcance local dentro del bloque `{ }` donde se encuentra.',
    technicalExplanation: 'Crea una variable ligada al entorno léxico de bloque actual. No realiza hoisting accesible (está en Temporal Dead Zone hasta su declaración).',
    purpose: 'Permite almacenar valores que cambian a lo largo del tiempo (como contadores o acumuladores).',
    importance: 'Reemplazó el uso arcaico de `var` eliminando errores comunes provocados por el hoisting y el alcance de función.',
    syntax: 'let nombreVariable = valorInicial;',
    basicExample: 'let contador = 0;\ncontador += 1;\nconsole.log(contador);',
    practicalExample: `let totalPuntos = 100;
let nivel = 1;

if (totalPuntos >= 100) {
  let bono = 50;
  totalPuntos += bono;
  nivel += 1;
}
console.log("Nivel final: " + nivel + " con " + totalPuntos + " puntos");`,
    lineByLineExplanation: [
      { line: 'let totalPuntos = 100;', explanation: 'Inicializa `totalPuntos` con el número 100.' },
      { line: 'if (totalPuntos >= 100) {', explanation: 'Evalúa la condición para otorgar un bono.' },
      { line: 'let bono = 50;', explanation: 'Variable accesible exclusivamente dentro del bloque if.' },
      { line: 'totalPuntos += bono;', explanation: 'Reasigna el acumulador sumando el bono.' }
    ],
    expectedOutput: 'Nivel final: 2 con 150 puntos',
    commonMistakes: [
      'Intentar acceder a la variable declarada con `let` fuera de su bloque `{ }` (ReferenceError).',
      'Re-declarar la misma variable con `let` dentro del mismo bloque (SyntaxError).'
    ],
    relatedTopics: ['js-const', 'js-var', 'js-concept-variables'],
    tags: ['variable', 'mutable', 'cambiar valor', 'contador', 'guardar'],
    documentationUrl: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/let',
    equivalents: [
      { language: 'python', name: 'Asignación directa', codeSnippet: 'contador = 0', exists: true, explanation: 'Python no usa palabras clave como let; se asigna directamente.' },
      { language: 'java', name: 'Tipo explícito o var', codeSnippet: 'int contador = 0;', exists: true, explanation: 'Java requiere el tipo o la palabra clave contextual `var`.' },
      { language: 'kotlin', name: 'var', codeSnippet: 'var contador = 0', exists: true, explanation: 'Kotlin usa `var` específicamente para variables mutables.' }
    ],
    miniQuiz: {
      question: '¿Cuál es la diferencia principal entre `let` y `const` en JavaScript?',
      options: [
        '`let` tiene alcance global y `const` alcance de función',
        '`let` permite reasignar su valor, mientras que `const` no',
        '`const` se puede usar antes de declararse y `let` no',
        'No hay ninguna diferencia real'
      ],
      correctIndex: 1,
      explanation: 'Las variables declaradas con `let` pueden cambiar de valor mediante reasignación (`=`), mientras que `const` arroja un error si se intenta reasignar.'
    }
  },
  {
    id: 'js-if',
    language: 'javascript',
    name: 'if',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true },
    definition: 'Estructura de control condicional que ejecuta un bloque de código únicamente si una expresión es verdadera.',
    technicalExplanation: 'Evalúa una expresión booleana o valor coercible a boolean (truthy/falsy). Si es verdad, entra a la rama especificada.',
    purpose: 'Tomar decisiones dentro del flujo de ejecución del programa.',
    importance: 'Es el pilar básico del control de flujo en casi cualquier lógica de programación.',
    syntax: 'if (condicion) {\n  // código\n} else {\n  // alternativa\n}',
    basicExample: 'let edad = 18;\nif (edad >= 18) {\n  console.log("Mayor de edad");\n}',
    practicalExample: `let saldo = 250;
let costoProducto = 180;

if (saldo >= costoProducto) {
  saldo -= costoProducto;
  console.log("Compra exitosa. Saldo restante: $" + saldo);
} else {
  console.log("Saldo insuficiente para comprar.");
}`,
    lineByLineExplanation: [
      { line: 'if (saldo >= costoProducto) {', explanation: 'Compara si el dinero disponible cubre el costo del producto.' },
      { line: 'saldo -= costoProducto;', explanation: 'Descuenta el monto del saldo disponible.' },
      { line: '} else {', explanation: 'Define el bloque alternativo si la condición no se cumplió.' }
    ],
    expectedOutput: 'Compra exitosa. Saldo restante: $70',
    commonMistakes: [
      'Usar un solo signo `=` (asignación) en lugar de `===` o `==` para comparar.',
      'Olvidar los paréntesis obligatorios que encierran la condición `if (...)`.'
    ],
    relatedTopics: ['js-else', 'js-switch', 'js-concept-conditionals'],
    tags: ['condicional', 'decision', 'si condicional', 'control de flujo'],
    documentationUrl: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/if...else',
    equivalents: [
      { language: 'python', name: 'if', codeSnippet: 'if saldo >= costoProducto:\n    saldo -= costoProducto', exists: true, explanation: 'En Python no lleva paréntesis obligatorios ni llaves, se delimita por indentación.' },
      { language: 'java', name: 'if', codeSnippet: 'if (saldo >= costoProducto) { saldo -= costoProducto; }', exists: true, explanation: 'Sintaxis idéntica con paréntesis y llaves.' },
      { language: 'kotlin', name: 'if', codeSnippet: 'if (saldo >= costoProducto) { saldo -= costoProducto }', exists: true, explanation: 'En Kotlin, además de declaración, `if` puede ser una expresión que retorna un valor.' }
    ],
    miniQuiz: {
      question: 'En JavaScript, ¿qué evalúa la condición `if ("")`?',
      options: [
        'Verdadero (truthy), porque las cadenas siempre son verdaderas',
        'Falso (falsy), porque una cadena vacía es falsy',
        'Lanza un TypeError en tiempo de ejecución',
        'Retorna undefined'
      ],
      correctIndex: 1,
      explanation: 'En JavaScript, el string vacío `""` es uno de los valores intrínsecamente falsy (junto con 0, null, undefined, NaN y false).'
    }
  },
  {
    id: 'js-for',
    language: 'javascript',
    name: 'for',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true },
    definition: 'Crea un bucle que ejecuta un bloque de instrucciones de manera repetitiva según una condición.',
    technicalExplanation: 'Soporta el formato clásico `for (inicialización; condición; incremento)`, así como las variantes modernas `for...of` (para iterables) y `for...in` (para propiedades de objetos).',
    purpose: 'Repetir una acción un número determinado de veces o recorrer los elementos de una colección.',
    importance: 'Permite automatizar tareas repetitivas sobre datos sin duplicar líneas de código.',
    syntax: 'for (let i = 0; i < limite; i++) {\n  // instrucciones\n}',
    basicExample: 'for (let i = 1; i <= 3; i++) {\n  console.log("Número: " + i);\n}',
    practicalExample: `const frutas = ["Manzana", "Pera", "Plátano"];

for (let i = 0; i < frutas.length; i++) {
  console.log((i + 1) + ". " + frutas[i]);
}`,
    lineByLineExplanation: [
      { line: 'for (let i = 0; i < frutas.length; i++) {', explanation: 'Inicializa `i` en 0, comprueba que sea menor al tamaño del arreglo e incrementa en 1 en cada iteración.' },
      { line: 'console.log(...);', explanation: 'Imprime la posición legible y el elemento correspondiente de la lista.' }
    ],
    expectedOutput: '1. Manzana\n2. Pera\n3. Plátano',
    commonMistakes: [
      'Error "Off-by-one": usar `<= frutas.length` en lugar de `< frutas.length`, produciendo un acceso a `undefined`.',
      'Crear un bucle infinito al olvidar actualizar la variable de control.'
    ],
    relatedTopics: ['js-while', 'js-break', 'js-continue', 'js-concept-loops'],
    tags: ['bucle', 'ciclo', 'repetir', 'iterar', 'recorrer'],
    documentationUrl: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for',
    equivalents: [
      { language: 'python', name: 'for in', codeSnippet: 'for fruta in frutas:\n    print(fruta)', exists: true, explanation: 'En Python `for` itera directamente sobre secuencias mediante `for x in iterable:` o `range()`.' },
      { language: 'java', name: 'for', codeSnippet: 'for (int i = 0; i < frutas.length; i++) { ... }', exists: true, explanation: 'Java cuenta con el mismo formato tradicional y el formato mejorado `for (String f : frutas)`.' },
      { language: 'kotlin', name: 'for', codeSnippet: 'for (fruta in frutas) { ... }', exists: true, explanation: 'En Kotlin se itera de forma concisa usando rangos o iterables con la palabra clave `in`.' }
    ],
    miniQuiz: {
      question: '¿Cuántas veces se ejecuta: `for (let i = 0; i < 5; i++)`?',
      options: [
        '4 veces',
        '5 veces (para i = 0, 1, 2, 3, 4)',
        '6 veces',
        'Infinitas veces'
      ],
      correctIndex: 1,
      explanation: 'Inicia en 0 y continúa mientras i sea estrictamente menor a 5 (0, 1, 2, 3, 4), es decir, exactamente 5 veces.'
    }
  },
  {
    id: 'js-function',
    language: 'javascript',
    name: 'function',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true },
    definition: 'Declara una función tradicional con nombre, parámetros y su propio contexto `this`.',
    technicalExplanation: 'Crea un objeto función invocable. Las declaraciones de función completas sufren hoisting hacia la parte superior de su ámbito.',
    purpose: 'Empaquetar y reutilizar bloques de lógica, facilitando el principio DRY (Don\'t Repeat Yourself).',
    importance: 'Las funciones son ciudadanos de primera clase en JavaScript (first-class citizens), base de la programación moderna.',
    syntax: 'function nombre(param1, param2) {\n  return resultado;\n}',
    basicExample: 'function sumar(a, b) {\n  return a + b;\n}\nconsole.log(sumar(4, 5));',
    practicalExample: `function calcularPrecioConIva(precioBase, tasaIva = 0.16) {
  const montoIva = precioBase * tasaIva;
  return precioBase + montoIva;
}

const total = calcularPrecioConIva(100);
console.log("Total a pagar: $" + total);`,
    lineByLineExplanation: [
      { line: 'function calcularPrecioConIva(...) {', explanation: 'Declara la función con un parámetro por defecto `tasaIva = 0.16`.' },
      { line: 'const montoIva = precioBase * tasaIva;', explanation: 'Calcula el impuesto correspondiente al precio base.' },
      { line: 'return precioBase + montoIva;', explanation: 'Retorna el total sumado al invocador.' }
    ],
    expectedOutput: 'Total a pagar: $116',
    commonMistakes: [
      'Olvidar colocar `return`, provocando que la función devuelva implícitamente `undefined`.',
      'Confundir una llamada a la función `sumar()` con pasar la referencia de la función `sumar`.'
    ],
    relatedTopics: ['js-return', 'js-concept-functions'],
    tags: ['funcion', 'subrutina', 'reutilizar codigo', 'metodo'],
    documentationUrl: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/function',
    equivalents: [
      { language: 'python', name: 'def', codeSnippet: 'def sumar(a, b):\n    return a + b', exists: true, explanation: 'Python usa la palabra clave `def` para definir funciones.' },
      { language: 'java', name: 'Declaración de método', codeSnippet: 'public static int sumar(int a, int b) { return a + b; }', exists: true, explanation: 'En Java toda función es un método que pertenece a una clase con tipos explícitos.' },
      { language: 'kotlin', name: 'fun', codeSnippet: 'fun sumar(a: Int, b: Int): Int = a + b', exists: true, explanation: 'Kotlin usa la palabra clave `fun`.' }
    ],
    miniQuiz: {
      question: '¿Qué devuelve una función en JavaScript si no tiene instrucción `return`?',
      options: [
        'null',
        '0',
        'undefined',
        'Lanza un error de sintaxis'
      ],
      correctIndex: 2,
      explanation: 'En JavaScript, cualquier función que termine su ejecución sin un `return` explícito retorna el valor primitivo `undefined`.'
    }
  },

  // ==========================================
  // CATEGORÍA B: TIPOS DE DATOS (DATATYPES)
  // ==========================================
  {
    id: 'js-datatype-string',
    language: 'javascript',
    name: 'string / String',
    category: 'datatype',
    difficulty: 'beginner',
    definition: 'Tipo de dato primitivo que representa texto o secuencias ordenadas de caracteres.',
    technicalExplanation: 'Tipo inmutable codificado en UTF-16. JavaScript provee el tipo primitivo `string` y el objeto envoltorio `String` con métodos como `.toUpperCase()`, `.includes()`, etc.',
    purpose: 'Manipular y almacenar texto como nombres, descripciones, mensajes y cadenas alfanuméricas.',
    importance: 'Casi todas las interfaces de usuario, APIs y bases de datos transmiten información en forma de texto.',
    syntax: 'const texto = "Cadena de texto";\nconst plantilla = `Hola \${variable}`;',
    basicExample: 'const saludo = "Hola Mundo";\nconsole.log(saludo.length);\nconsole.log(saludo.toUpperCase());',
    practicalExample: `const nombreUsuario = "  Ana Sofía  ";
const nombreLimpio = nombreUsuario.trim();
const mensaje = \`Bienvenida al sistema, \${nombreLimpio}!\`;

console.log(mensaje);
console.log("Letras:", nombreLimpio.length);`,
    lineByLineExplanation: [
      { line: 'const nombreLimpio = nombreUsuario.trim();', explanation: 'Elimina los espacios en blanco al inicio y al final de la cadena.' },
      { line: 'const mensaje = `Bienvenida al sistema, ${nombreLimpio}!`;', explanation: 'Utiliza Template Literals (comillas invertidas) para interpolar variables.' },
      { line: 'console.log(...);', explanation: 'Imprime el mensaje interpolado.' }
    ],
    expectedOutput: 'Bienvenida al sistema, Ana Sofía!\nLetras: 9',
    commonMistakes: [
      'Intentar modificar un carácter directamente con `texto[0] = "X"`; los strings en JS son inmutables.',
      'Confundir comillas invertidas (backticks `` ` ``) con comillas simples (\' \') al intentar usar interpolación `${...}`.'
    ],
    relatedTopics: ['js-datatype-number', 'js-builtin-tostring'],
    tags: ['string', 'texto', 'cadena', 'letras', 'guardar texto'],
    documentationUrl: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String',
    equivalents: [
      { language: 'python', name: 'str', codeSnippet: 'mensaje = f"Bienvenida, {nombre}"', exists: true, explanation: 'Python usa el tipo `str` y f-strings para interpolación.' },
      { language: 'java', name: 'String', codeSnippet: 'String mensaje = "Bienvenida, " + nombre;', exists: true, explanation: 'Java usa la clase inmutable `java.lang.String`.' },
      { language: 'kotlin', name: 'String', codeSnippet: 'val mensaje = "Bienvenida, $nombre"', exists: true, explanation: 'Kotlin usa `String` con interpolación nativa mediante el símbolo `$`.' }
    ],
    miniQuiz: {
      question: '¿Qué imprime el siguiente código: `let s = "hola"; s[0] = "H"; console.log(s);`?',
      options: [
        '"Hola"',
        '"hola" (no cambia porque los strings son inmutables)',
        'Lanza un TypeError inmediato',
        'undefined'
      ],
      correctIndex: 1,
      explanation: 'Las cadenas en JavaScript son primitivas e inmutables. Modificar un índice mediante corchetes se ignora silenciosamente (en modo no estricto).'
    }
  },
  {
    id: 'js-datatype-number',
    language: 'javascript',
    name: 'number',
    category: 'datatype',
    difficulty: 'beginner',
    definition: 'Tipo numérico único primitivo que representa tanto números enteros como números decimales.',
    technicalExplanation: 'Sigue el formato IEEE 754 de 64 bits (doble precisión). No existe separación nativa entre tipos `int` o `float` en el sistema de tipos de JavaScript.',
    purpose: 'Realizar cálculos matemáticos, contabilizar índices y almacenar cantidades numéricas.',
    importance: 'Simplifica la declaración al no obligar al desarrollador a elegir entre `int`, `long` o `double`.',
    syntax: 'const entero = 42;\nconst decimal = 19.99;',
    basicExample: 'const precio = 15.5;\nconst cantidad = 3;\nconsole.log(precio * cantidad);',
    practicalExample: `const celsius = 28;
const fahrenheit = (celsius * 9/5) + 32;

console.log(celsius + "°C equivalen a " + fahrenheit + "°F");
console.log("Es entero:", Number.isInteger(celsius));`,
    lineByLineExplanation: [
      { line: 'const fahrenheit = (celsius * 9/5) + 32;', explanation: 'Aplica la fórmula matemática de conversión combinando enteros y decimales.' },
      { line: 'Number.isInteger(celsius)', explanation: 'Método utilitario para verificar si un valor numérico carece de decimales.' }
    ],
    expectedOutput: '28°C equivalen a 82.4°F\nEs entero: true',
    commonMistakes: [
      'Inconsistencias de precisión decimal en punto flotante: `0.1 + 0.2 === 0.3` evalúa a `false` (da `0.30000000000000004`).',
      'Olvidar convertir strings a números con `Number()` o `parseInt()` al sumar valores provenientes de formularios (ej. `"5" + 3` da `"53"`).'
    ],
    relatedTopics: ['js-datatype-string', 'js-builtin-parseint'],
    tags: ['numero', 'entero', 'decimal', 'flotante', 'calcular', 'numeros decimales'],
    documentationUrl: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number',
    equivalents: [
      { language: 'python', name: 'int y float', codeSnippet: 'entero = 42\ndecimal = 19.99', exists: true, explanation: 'Python distingue claramente entre el tipo `int` (enteros ilimitados) y `float`.' },
      { language: 'java', name: 'int, double, float, long', codeSnippet: 'int entero = 42;\ndouble decimal = 19.99;', exists: true, explanation: 'Java tiene tipos primitivos rígidos y separados para cada rango numérico.' },
      { language: 'kotlin', name: 'Int, Double, Float, Long', codeSnippet: 'val entero: Int = 42\nval decimal: Double = 19.99', exists: true, explanation: 'Kotlin distingue fuertemente entre Int y Double sin conversiones implícitas.' }
    ],
    miniQuiz: {
      question: '¿Por qué `0.1 + 0.2 === 0.3` devuelve `false` en JavaScript?',
      options: [
        'Porque JavaScript no admite números decimales',
        'Debido a la precisión de punto flotante en base binaria (estándar IEEE 754)',
        'Porque uno de ellos se convierte a string automáticamente',
        'Porque se debe usar el operador == en lugar de ==='
      ],
      correctIndex: 1,
      explanation: 'Al convertir fracciones decimales a binario, números como 0.1 y 0.2 generan decimales infinitos periódicos, produciendo un pequeñísimo desfase de redondeo.'
    }
  },
  {
    id: 'js-datatype-boolean',
    language: 'javascript',
    name: 'boolean',
    category: 'datatype',
    difficulty: 'beginner',
    definition: 'Tipo primitivo que solo puede tener uno de dos valores posibles: `true` (verdadero) o `false` (falso).',
    technicalExplanation: 'Tipo lógico binario. Todos los valores en JavaScript tienen una naturaleza "truthy" o "falsy" cuando son evaluados en contextos booleanos.',
    purpose: 'Representar estados lógicos, banderas (flags), permisos y respuestas de condiciones.',
    importance: 'Es el motor fundamental de las decisiones lógicas en cualquier programa informático.',
    syntax: 'const activo = true;\nconst bloqueado = false;',
    basicExample: 'const esMayor = 20 >= 18;\nconsole.log(esMayor); // true',
    practicalExample: `const tieneCuenta = true;
const tieneSuscripcionActiva = false;

const puedeVerContenido = tieneCuenta && tieneSuscripcionActiva;
console.log("Acceso concedido:", puedeVerContenido);`,
    lineByLineExplanation: [
      { line: 'const tieneCuenta = true;', explanation: 'Bandera booleana afirmativa.' },
      { line: 'const puedeVerContenido = tieneCuenta && ...', explanation: 'Aplica el operador lógico AND (&&).' },
      { line: 'console.log(...);', explanation: 'Imprime el resultado booleano final.' }
    ],
    expectedOutput: 'Acceso concedido: false',
    commonMistakes: [
      'Crear objetos booleanos usando `new Boolean(false)`, los cuales se evalúan como truthy por ser objetos.',
      'Confundir el string `"false"` con el valor booleano primitivo `false`.'
    ],
    relatedTopics: ['js-operator-and', 'js-if'],
    tags: ['booleano', 'verdadero', 'falso', 'logica', 'bandera'],
    documentationUrl: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Boolean',
    equivalents: [
      { language: 'python', name: 'bool (True / False)', codeSnippet: 'activo = True\nbloqueado = False', exists: true, explanation: 'En Python se escribe con mayúscula inicial: `True` y `False`.' },
      { language: 'java', name: 'boolean', codeSnippet: 'boolean activo = true;', exists: true, explanation: 'Tipo primitivo en minúsculas en Java.' },
      { language: 'kotlin', name: 'Boolean', codeSnippet: 'val activo: Boolean = true', exists: true, explanation: 'En Kotlin se llama `Boolean`.' }
    ],
    miniQuiz: {
      question: '¿Cuál de los siguientes valores es considerado "falsy" en JavaScript?',
      options: [
        'El número 0',
        'El string "0"',
        'Un array vacío []',
        'Un objeto vacío {}'
      ],
      correctIndex: 0,
      explanation: 'El número 0 es un valor falsy. Por el contrario, los strings no vacíos (como "0") y los objetos o arreglos vacíos son truthy.'
    }
  },

  // ==========================================
  // CATEGORÍA C: OPERADORES (OPERATORS)
  // ==========================================
  {
    id: 'js-operator-strict-equality',
    language: 'javascript',
    name: '=== (Igualdad estricta)',
    category: 'operator',
    difficulty: 'beginner',
    definition: 'Compara si dos operandos son estrictamente iguales tanto en valor como en tipo de dato.',
    technicalExplanation: 'Evalúa la identidad sin aplicar coerción implícita de tipos. Si los tipos difieren, devuelve inmediatamente `false`.',
    purpose: 'Verificar la igualdad con total certeza y sin sorpresas de conversión automática.',
    importance: 'Evita los peligrosos errores asociados al operador débil `==`, que convierte tipos automáticamente de forma impredecible.',
    syntax: 'a === b',
    basicExample: 'console.log(5 === 5);     // true\nconsole.log(5 === "5");   // false',
    practicalExample: `function autenticarRol(rolUsuario) {
  if (rolUsuario === "ADMIN") {
    return "Acceso total al panel de control";
  }
  return "Acceso restringido";
}

console.log(autenticarRol("ADMIN"));
console.log(autenticarRol(1));`,
    lineByLineExplanation: [
      { line: 'if (rolUsuario === "ADMIN") {', explanation: 'Comprueba que sea estrictamente el string "ADMIN" sin admitir coerciones.' },
      { line: 'return "...";', explanation: 'Retorna el mensaje apropiado según el resultado estricto.' }
    ],
    expectedOutput: 'Acceso total al panel de control\nAcceso restringido',
    commonMistakes: [
      'Usar `==` en vez de `===`, permitiendo que valores como `0 == ""` o `null == undefined` evalúen a true.',
      'Comparar dos objetos o arrays distintos con `===` esperando que compare sus propiedades (compara referencias en memoria).'
    ],
    relatedTopics: ['js-operator-strict-inequality', 'js-if'],
    tags: ['igualdad', 'comparar', 'triple igual', 'identidad', 'comparacion'],
    documentationUrl: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Strict_equality',
    equivalents: [
      { language: 'python', name: '== / is', codeSnippet: 'a == b  # valor\na is b  # identidad en memoria', exists: true, explanation: 'Python usa `==` para igualdad por valor y `is` para identidad de objeto. No hay coerción automática como en JS.' },
      { language: 'java', name: '== / .equals()', codeSnippet: 'a == b  // primitivos\na.equals(b) // objetos', exists: true, explanation: 'Java usa `==` para primitivos y `.equals()` para contenido de objetos como cadenas.' },
      { language: 'kotlin', name: '== / ===', codeSnippet: 'a == b   // estructural\na === b  // referencial', exists: true, explanation: 'En Kotlin `==` compara contenido de forma segura y `===` compara identidad de referencia.' }
    ],
    miniQuiz: {
      question: '¿Qué devuelve la expresión `false === 0` en JavaScript?',
      options: [
        'true, porque 0 equivale a false',
        'false, porque son de distinto tipo (boolean vs number)',
        'NaN',
        'TypeError'
      ],
      correctIndex: 1,
      explanation: 'El operador `===` no realiza coerción de tipos. Como `false` es de tipo boolean y `0` es de tipo number, retorna `false`.'
    }
  },

  // ==========================================
  // CATEGORÍA D: FUNCIONES Y UTILIDADES PREDEFINIDAS
  // ==========================================
  {
    id: 'js-builtin-console-log',
    language: 'javascript',
    name: 'console.log()',
    category: 'builtin-function',
    difficulty: 'beginner',
    definition: 'Imprime uno o varios mensajes o valores en la consola del entorno de ejecución (navegador o terminal).',
    technicalExplanation: 'Método del objeto global `console` que serializa argumentos a formato legible e inserta un salto de línea.',
    purpose: 'Depurar, inspeccionar valores durante la ejecución y comunicarse visualmente con el desarrollador.',
    importance: 'Es la primera herramienta de diagnóstico que aprende cualquier programador web.',
    syntax: 'console.log(mensaje1, mensaje2, ...);',
    basicExample: 'console.log("¡Hola, mundo desde JavaScript!");',
    practicalExample: `const producto = "Teclado Mecánico";
const precio = 89.99;
const enStock = true;

console.log("Producto:", producto, "| Precio: $" + precio, "| Disponible:", enStock);`,
    lineByLineExplanation: [
      { line: 'console.log(...)', explanation: 'Envía los argumentos separados por comas formateándolos automáticamente con espacios intermedios.' }
    ],
    expectedOutput: 'Producto: Teclado Mecánico | Precio: $89.99 | Disponible: true',
    commonMistakes: [
      'Dejar llamadas a `console.log` en código de producción que se expone al cliente.',
      'Confundir `console.log()` con el retorno de una función (`return`).'
    ],
    relatedTopics: ['js-concept-functions'],
    tags: ['imprimir', 'consola', 'depurar', 'mostrar texto', 'log'],
    documentationUrl: 'https://developer.mozilla.org/es/docs/Web/API/console/log_static',
    equivalents: [
      { language: 'python', name: 'print()', codeSnippet: 'print("Hola mundo")', exists: true, explanation: 'Función nativa `print()` estándar en Python.' },
      { language: 'java', name: 'System.out.println()', codeSnippet: 'System.out.println("Hola mundo");', exists: true, explanation: 'En Java se accede mediante la salida estándar de `System.out`.' },
      { language: 'kotlin', name: 'println()', codeSnippet: 'println("Hola mundo")', exists: true, explanation: 'En Kotlin se dispone de la función global simplificada `println()`.' }
    ],
    miniQuiz: {
      question: '¿Qué hace `console.log("A", "B", "C")` al recibir múltiples argumentos separados por coma?',
      options: [
        'Lanza un error porque solo acepta un argumento',
        'Imprime las letras separadas por un espacio: "A B C"',
        'Solo imprime el primer argumento "A"',
        'Imprime cada letra en una línea distinta'
      ],
      correctIndex: 1,
      explanation: '`console.log` concatena los argumentos recibidos separándolos automáticamente por un espacio en la misma línea.'
    }
  },

  // ==========================================
  // CATEGORÍA E: CONCEPTOS DE PROGRAMACIÓN
  // ==========================================
  {
    id: 'js-concept-variables',
    language: 'javascript',
    name: 'Variables y Constantes',
    category: 'concept',
    difficulty: 'beginner',
    definition: 'Espacios nombrados en la memoria de la computadora donde guardamos información que el programa puede consultar o modificar.',
    technicalExplanation: 'En JavaScript se gestionan mediante tres palabras clave: `const` (inmutable por defecto con scope de bloque), `let` (mutable con scope de bloque) y `var` (antigua forma con scope de función y hoisting).',
    purpose: 'Almacenar datos como números, textos, listas u objetos para utilizarlos más adelante.',
    importance: 'Sin variables, un programa no tendría estado ni memoria para procesar datos de usuarios o cálculos.',
    syntax: 'const constante = valor;\nlet variableMutable = valor;',
    basicExample: 'const nombre = "Elena";\nlet intentos = 3;\nintentos = 2;',
    practicalExample: `const LIMITE_INTENTOS = 3;
let intentosRestantes = LIMITE_INTENTOS;

console.log("Intentos iniciales:", intentosRestantes);
intentosRestantes -= 1;
console.log("Intentos tras fallar:", intentosRestantes);`,
    lineByLineExplanation: [
      { line: 'const LIMITE_INTENTOS = 3;', explanation: 'Define una regla fija que no debe alterarse jamás.' },
      { line: 'let intentosRestantes = LIMITE_INTENTOS;', explanation: 'Crea el contador que sí cambiará conforme el usuario interactúe.' },
      { line: 'intentosRestantes -= 1;', explanation: 'Disminuye en 1 el contador de intentos restantes.' }
    ],
    expectedOutput: 'Intentos iniciales: 3\nIntentos tras fallar: 2',
    commonMistakes: [
      'Usar `var` en código nuevo, lo que propicia fugas de ámbito e incertidumbres con el hoisting.',
      'Usar `let` para valores que nunca cambian a lo largo del programa.'
    ],
    relatedTopics: ['js-const', 'js-let'],
    tags: ['variables', 'constantes', 'guardar datos', 'concepto fundamental'],
    equivalents: [
      { language: 'python', name: 'Variables dinámicas', codeSnippet: 'nombre = "Elena"\nintentos = 3', exists: true, explanation: 'Python no requiere palabras clave para declarar variables.' },
      { language: 'java', name: 'Tipado estático con tipos o var/final', codeSnippet: 'final int LIMITE = 3;\nint intentos = 3;', exists: true, explanation: 'Java requiere especificar tipo o `var` y el modificador `final`.' },
      { language: 'kotlin', name: 'val / var', codeSnippet: 'val limite = 3\nvar intentos = 3', exists: true, explanation: 'Kotlin distingue elegantemente entre `val` (solo lectura) y `var` (mutable).' }
    ],
    miniQuiz: {
      question: '¿Cuál es la regla de oro moderna al declarar variables en JavaScript?',
      options: [
        'Usar `var` siempre para tener alcance global',
        'Usar `const` por defecto y cambiar a `let` solo si el valor necesita reasignarse',
        'No declarar nada y asignar variables directamente sin palabras clave',
        'Usar `let` para todo'
      ],
      correctIndex: 1,
      explanation: 'La mejor práctica estándar es usar `const` siempre que sea posible para evitar mutaciones no intencionadas, y recurrir a `let` únicamente cuando la variable deba reasignarse.'
    }
  }
];
