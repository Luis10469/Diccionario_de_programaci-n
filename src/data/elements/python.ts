import { EducationalElement } from '../../types';

export const PYTHON_ELEMENTS: EducationalElement[] = [
  // ==========================================
  // CATEGORÍA A: PALABRAS RESERVADAS (KEYWORDS)
  // ==========================================
  {
    id: 'py-def',
    language: 'python',
    name: 'def',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true, versionIntroduced: 'Python 1.0' },
    definition: 'Palabra reservada utilizada para definir una función o método en Python.',
    technicalExplanation: 'Crea un objeto función invocable en tiempo de ejecución y lo vincula al nombre especificado en el espacio de nombres local. El bloque del cuerpo se define mediante sangría (indentación).',
    purpose: 'Empaquetar bloques de código para ejecutarlos cuando sea necesario y evitar repetir instrucciones.',
    importance: 'Es la instrucción básica para estructurar código modular, limpio y reutilizable en Python.',
    syntax: 'def nombre_funcion(parametro1, parametro2):\n    # cuerpo de la funcion\n    return resultado',
    basicExample: 'def saludar(nombre):\n    return f"¡Hola, {nombre}!"\n\nprint(saludar("Mariana"))',
    practicalExample: `def calcular_descuento(precio: float, porcentaje: float = 10.0) -> float:
    descuento = precio * (porcentaje / 100)
    return precio - descuento

precio_final = calcular_descuento(250.0, 20.0)
print(f"Total con descuento: \${precio_final:.2f}")`,
    lineByLineExplanation: [
      { line: 'def calcular_descuento(...):', explanation: 'Define la función con anotaciones de tipo opcionales y un valor por defecto para el porcentaje.' },
      { line: '    descuento = precio * (porcentaje / 100)', explanation: 'Calcula el ahorro económico.' },
      { line: '    return precio - descuento', explanation: 'Devuelve el precio ajustado.' }
    ],
    expectedOutput: 'Total con descuento: $200.00',
    commonMistakes: [
      'Olvidar los dos puntos `:` al final de la línea donde se declara la función.',
      'Mezclar espacios y tabulaciones en la indentación del bloque de código (IndentationError).',
      'Olvidar la instrucción `return` cuando se espera capturar el resultado (devolverá `None`).'
    ],
    relatedTopics: ['py-return', 'py-lambda', 'py-concept-functions'],
    tags: ['funcion', 'definir', 'modular', 'metodo', 'subrutina'],
    documentationUrl: 'https://docs.python.org/3/reference/compound_stmts.html#function-definitions',
    equivalents: [
      { language: 'javascript', name: 'function', codeSnippet: 'function saludar(nombre) { return `Hola, ${nombre}`; }', exists: true, explanation: 'JavaScript usa la palabra clave `function` o funciones flecha `() => {}`.' },
      { language: 'java', name: 'Método en clase', codeSnippet: 'public static String saludar(String nombre) { return "Hola, " + nombre; }', exists: true, explanation: 'En Java toda función es un método tipado dentro de una clase.' },
      { language: 'kotlin', name: 'fun', codeSnippet: 'fun saludar(nombre: String): String = "Hola, $nombre"', exists: true, explanation: 'Kotlin usa `fun` para definir funciones.' }
    ],
    miniQuiz: {
      question: '¿Qué sucede si una función definida con `def` en Python no incluye la palabra `return`?',
      options: [
        'Lanza un error de compilación',
        'Retorna implícitamente el valor especial `None`',
        'Retorna 0',
        'Retorna una cadena vacía'
      ],
      correctIndex: 1,
      explanation: 'En Python, si una función finaliza sin ejecutar un `return`, devuelve de forma predeterminada el objeto `None`.'
    }
  },
  {
    id: 'py-if',
    language: 'python',
    name: 'if',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true },
    definition: 'Palabra clave que inicia una estructura condicional; ejecuta el bloque indentado solo si la condición es verdadera.',
    technicalExplanation: 'Evalúa la veracidad (truth value testing) de la expresión. Si se evalúa como `True`, ejecuta el bloque correspondiente.',
    purpose: 'Tomar decisiones dentro del programa según los datos recibidos o calculados.',
    importance: 'Controla el flujo del software permitiendo responder de forma dinámica a diferentes escenarios.',
    syntax: 'if condicion:\n    # codigo si es verdadero\nelif otra_condicion:\n    # codigo secundario\nelse:\n    # codigo por descarte',
    basicExample: 'puntos = 85\nif puntos >= 60:\n    print("Aprobado")\nelse:\n    print("Reprobado")',
    practicalExample: `temperatura = 32

if temperatura > 30:
    estado = "Caluroso: toma agua"
elif temperatura >= 18:
    estado = "Agradable"
else:
    estado = "Fresco: lleva abrigo"

print(f"Pronostico: {estado}")`,
    lineByLineExplanation: [
      { line: 'if temperatura > 30:', explanation: 'Evalúa la condición primaria. Requiere dos puntos `:` al final.' },
      { line: '    estado = "Caluroso: toma agua"', explanation: 'Instrucción que se ejecuta con sangría de 4 espacios.' },
      { line: 'elif temperatura >= 18:', explanation: '`elif` es la contracción exclusiva de Python para "else if".' }
    ],
    expectedOutput: 'Pronostico: Caluroso: toma agua',
    commonMistakes: [
      'Escribir `else if` en lugar de la palabra clave válida `elif` (SyntaxError).',
      'Olvidar colocar los dos puntos `:` al final de la condición.',
      'Usar asignación `=` en vez de comparación `==`.'
    ],
    relatedTopics: ['py-elif', 'py-else', 'py-concept-conditionals'],
    tags: ['condicional', 'decision', 'si condicional', 'control de flujo'],
    documentationUrl: 'https://docs.python.org/3/reference/compound_stmts.html#the-if-statement',
    equivalents: [
      { language: 'javascript', name: 'if / else if', codeSnippet: 'if (temp > 30) { ... } else if (temp >= 18) { ... }', exists: true, explanation: 'JavaScript encierra la condición en paréntesis `()` y el bloque en llaves `{}`.' },
      { language: 'java', name: 'if / else if', codeSnippet: 'if (temp > 30) { ... } else if (temp >= 18) { ... }', exists: true, explanation: 'Java requiere condición estrictamente booleana entre paréntesis.' },
      { language: 'kotlin', name: 'if / else if / when', codeSnippet: 'if (temp > 30) { ... } else if (temp >= 18) { ... }', exists: true, explanation: 'En Kotlin `if` es una expresión y también se dispone de `when`.' }
    ],
    miniQuiz: {
      question: '¿Cómo se escribe "sino si" (else if) en Python?',
      options: [
        'else if',
        'elseif',
        'elif',
        'elsif'
      ],
      correctIndex: 2,
      explanation: 'Python utiliza la palabra reservada específica `elif` para encadenar condiciones alternativas.'
    }
  },
  {
    id: 'py-for',
    language: 'python',
    name: 'for',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true },
    definition: 'Bucle que itera directamente sobre los elementos de cualquier secuencia o colección (listas, tuplas, cadenas, rangos).',
    technicalExplanation: 'Implementa el protocolo de iteración de Python llamando internamente a `iter()` y `next()` hasta capturar la excepción `StopIteration`.',
    purpose: 'Recorrer datos ordenados o ejecutar una instrucción un número determinado de veces usando `range()`.',
    importance: 'Es mucho más legible, intuitivo y menos propenso a errores de índice que los bucles tradicionales basados en contadores.',
    syntax: 'for elemento in coleccion:\n    # procesar elemento',
    basicExample: 'for num in range(1, 4):\n    print(f"Paso {num}")',
    practicalExample: `lenguajes = ["Python", "JavaScript", "Kotlin", "Java"]

for indice, nombre in enumerate(lenguajes, start=1):
    print(f"{indice}. {nombre}")`,
    lineByLineExplanation: [
      { line: 'for indice, nombre in enumerate(lenguajes, start=1):', explanation: 'Desempaqueta tanto la posición como el valor de cada elemento usando la función auxiliar `enumerate()`.' },
      { line: '    print(...)', explanation: 'Muestra la posición y el lenguaje correspondiente.' }
    ],
    expectedOutput: '1. Python\n2. JavaScript\n3. Kotlin\n4. Java',
    commonMistakes: [
      'Intentar modificar la longitud de la lista mientras se itera sobre ella con `for`.',
      'Esperar que `range(1, 5)` incluya el número 5 (en Python el límite superior es excluyente: genera 1, 2, 3, 4).'
    ],
    relatedTopics: ['py-while', 'py-in', 'py-builtin-range', 'py-concept-loops'],
    tags: ['bucle', 'ciclo', 'iterar', 'recorrer', 'repetir'],
    documentationUrl: 'https://docs.python.org/3/reference/compound_stmts.html#the-for-statement',
    equivalents: [
      { language: 'javascript', name: 'for...of', codeSnippet: 'for (const nombre of lenguajes) { console.log(nombre); }', exists: true, explanation: 'En JS moderno, `for...of` ofrece la misma semántica de iteración directa sobre valores.' },
      { language: 'java', name: 'for-each mejorado', codeSnippet: 'for (String nombre : lenguajes) { System.out.println(nombre); }', exists: true, explanation: 'Java usa la sintaxis `for (Tipo var : coleccion)`.' },
      { language: 'kotlin', name: 'for in', codeSnippet: 'for (nombre in lenguajes) { println(nombre) }', exists: true, explanation: 'Kotlin usa la misma sintaxis natural `for (x in coleccion)`.' }
    ],
    miniQuiz: {
      question: '¿Qué números genera la expresión `range(2, 6)` en Python?',
      options: [
        '2, 3, 4, 5, 6',
        '2, 3, 4, 5 (el 6 es excluyente)',
        '3, 4, 5, 6',
        '2, 4, 6'
      ],
      correctIndex: 1,
      explanation: 'La función `range(inicio, fin)` en Python genera valores desde `inicio` hasta `fin - 1`. Por eso el 6 queda excluido.'
    }
  },

  // ==========================================
  // CATEGORÍA B: TIPOS DE DATOS (DATATYPES)
  // ==========================================
  {
    id: 'py-datatype-str',
    language: 'python',
    name: 'str',
    category: 'datatype',
    difficulty: 'beginner',
    definition: 'Tipo de dato predefinido que representa secuencias inmutables de texto o caracteres en Python.',
    technicalExplanation: 'Tipo de secuencia inmutable de puntos de código Unicode. Permite indexación, slicing `[inicio:fin:paso]` y formateo con f-strings.',
    purpose: 'Almacenar y formatear información textual de usuarios, mensajes, rutas o datos.',
    importance: 'El texto es el formato universal de entrada y salida entre programas y humanos.',
    syntax: 'cadena = "Texto con comillas dobles"\notra = \'Comillas simples\'\nfstr = f"Hola, {variable}"',
    basicExample: 'mensaje = "Python es genial"\nprint(len(mensaje))\nprint(mensaje.upper())',
    practicalExample: `correo = "  Estudiante@CodeLex.Com  "
correo_normalizado = correo.strip().lower()
dominio = correo_normalizado.split("@")[1]

print(f"Normalizado: {correo_normalizado}")
print(f"Dominio: {dominio}")`,
    lineByLineExplanation: [
      { line: 'correo.strip().lower()', explanation: 'Encadena métodos para quitar espacios en blanco laterales y transformar a minúsculas.' },
      { line: 'correo_normalizado.split("@")[1]', explanation: 'Divide la cadena por el arroba y toma el segundo fragmento (el dominio).' }
    ],
    expectedOutput: 'Normalizado: estudiante@codelex.com\nDominio: codelex.com',
    commonMistakes: [
      'Intentar reasignar una letra mediante indexación: `correo[0] = "x"` genera un TypeError (inmutabilidad).',
      'Concatenar un número directamente sin convertir: `"Puntaje: " + 10` genera un TypeError en Python (no hay coerción implícita).'
    ],
    relatedTopics: ['py-builtin-len', 'py-builtin-str'],
    tags: ['str', 'string', 'texto', 'cadena', 'guardar texto'],
    documentationUrl: 'https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str',
    equivalents: [
      { language: 'javascript', name: 'string', codeSnippet: 'const msg = `Hola ${nombre}`;', exists: true, explanation: 'JS usa el tipo primitivo `string` con backticks para interpolación.' },
      { language: 'java', name: 'String', codeSnippet: 'String msg = "Hola " + nombre;', exists: true, explanation: 'Java usa la clase inmutable `java.lang.String`.' },
      { language: 'kotlin', name: 'String', codeSnippet: 'val msg = "Hola $nombre"', exists: true, explanation: 'Kotlin usa `String` con interpolación de plantillas.' }
    ],
    miniQuiz: {
      question: '¿Qué resultado produce `"Python"[0:2]` mediante slicing?',
      options: [
        '"P"',
        '"Py"',
        '"Pyt"',
        'Lanza un IndexError'
      ],
      correctIndex: 1,
      explanation: 'El slicing `[inicio:fin]` toma los caracteres desde el índice 0 hasta el 2 sin incluir el índice 2 (índice 0 = "P", índice 1 = "y").'
    }
  },
  {
    id: 'py-datatype-int',
    language: 'python',
    name: 'int',
    category: 'datatype',
    difficulty: 'beginner',
    definition: 'Tipo numérico que representa números enteros positivos o negativos sin parte decimal.',
    technicalExplanation: 'En Python 3, los enteros poseen precisión arbitraria (bignum automático), lo que significa que no se desbordan (no hay overflow como en lenguajes de 32 o 64 bits).',
    purpose: 'Contar elementos, representar edades, años, índices o realizar cálculos matemáticos discretos.',
    importance: 'Permite cálculos matemáticos con números astronómicos sin preocuparse por pérdidas de precisión o desbordamientos de memoria de tamaño fijo.',
    syntax: 'edad = 25\nnumero_negativo = -10\ngigante = 2 ** 100',
    basicExample: 'x = 10\ny = 3\nprint(x + y)   # Suma (13)\nprint(x // y)  # División entera (3)',
    practicalExample: `anio_nacimiento = 2000
anio_actual = 2026
edad = anio_actual - anio_nacimiento

print(f"Tienes aproximadamente {edad} años.")
print(f"Tipo de dato: {type(edad).__name__}")`,
    lineByLineExplanation: [
      { line: 'edad = anio_actual - anio_nacimiento', explanation: 'Resta aritmética entre dos enteros.' },
      { line: 'print(...)', explanation: 'Muestra la edad calculada y confirma su tipo.' }
    ],
    expectedOutput: 'Tienes aproximadamente 26 años.\nTipo de dato: int',
    commonMistakes: [
      'Usar el operador `/` esperando un entero (en Python 3 `/` siempre retorna un `float`; para división entera se usa `//`).',
      'Confundir un entero con el texto que contiene un número (ej. `"42"` es un `str`, no un `int`).'
    ],
    relatedTopics: ['py-datatype-float', 'py-builtin-int'],
    tags: ['int', 'entero', 'numero', 'calcular', 'contar'],
    documentationUrl: 'https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex',
    equivalents: [
      { language: 'javascript', name: 'number / BigInt', codeSnippet: 'const edad = 25;', exists: true, explanation: 'JavaScript usa `number` (64-bit float) o `BigInt` para enteros de precisión arbitraria.' },
      { language: 'java', name: 'int / long / BigInteger', codeSnippet: 'int edad = 25;', exists: true, explanation: 'Java tiene `int` limitado a 32 bits y `long` a 64 bits.' },
      { language: 'kotlin', name: 'Int / Long', codeSnippet: 'val edad: Int = 25', exists: true, explanation: 'Kotlin usa tipos primitivos asignados en JVM con límites fijos.' }
    ],
    miniQuiz: {
      question: '¿Qué retorna la expresión `7 // 2` en Python?',
      options: [
        '3.5',
        '3 (división entera con truncamiento hacia abajo)',
        '4',
        'Lanza un TypeError'
      ],
      correctIndex: 1,
      explanation: 'El operador `//` realiza la división entera (floor division), devolviendo 3 sin parte decimal.'
    }
  },
  {
    id: 'py-datatype-float',
    language: 'python',
    name: 'float',
    category: 'datatype',
    difficulty: 'beginner',
    definition: 'Tipo de dato que representa números con parte decimal o en notación científica.',
    technicalExplanation: 'Implementado internamente utilizando el tipo `double` en C (IEEE 754 de 64 bits de precisión de punto flotante).',
    purpose: 'Representar mediciones, precios, coordenadas geográficas o porcentajes con precisión fraccionaria.',
    importance: 'Permite expresar magnitudes continuas de la vida real que no pueden limitarse a valores enteros.',
    syntax: 'precio = 19.99\ntasa = 0.05',
    basicExample: 'altura = 1.75\npeso = 70.0\nimc = peso / (altura ** 2)\nprint(f"IMC: {imc:.2f}")',
    practicalExample: `radio = 5.0
pi_aprox = 3.14159265
area_circulo = pi_aprox * (radio ** 2)

print(f"El radio es: {radio} cm")
print(f"El area calculada es: {area_circulo:.4f} cm²")`,
    lineByLineExplanation: [
      { line: 'area_circulo = pi_aprox * (radio ** 2)', explanation: 'Calcula el área multiplicando por radio al cuadrado mediante el operador exponente `**`.' },
      { line: 'print(f"... {area_circulo:.4f}")', explanation: 'Formatea la salida a exactamente 4 lugares decimales.' }
    ],
    expectedOutput: 'El radio es: 5.0 cm\nEl area calculada es: 78.5398 cm²',
    commonMistakes: [
      'Usar coma `,` en lugar de punto `.` para separar decimales (ej. `3,14` crea una tupla en lugar de un float).',
      'Asumir precisión infinita en operaciones financieras (para finanzas estrictas en Python se recomienda el módulo `decimal`).'
    ],
    relatedTopics: ['py-datatype-int', 'py-operator-exponent'],
    tags: ['float', 'decimal', 'flotante', 'numeros decimales', 'calcular'],
    documentationUrl: 'https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex',
    equivalents: [
      { language: 'javascript', name: 'number', codeSnippet: 'const precio = 19.99;', exists: true, explanation: 'En JS todos los números estándar son punto flotante de 64 bits.' },
      { language: 'java', name: 'float / double', codeSnippet: 'double precio = 19.99;', exists: true, explanation: 'Java distingue entre `float` (32 bits) y `double` (64 bits).' },
      { language: 'kotlin', name: 'Float / Double', codeSnippet: 'val precio: Double = 19.99', exists: true, explanation: 'Kotlin distingue fuertemente entre Float y Double.' }
    ],
    miniQuiz: {
      question: '¿Qué tipo de dato produce la operación `10 / 2` en Python 3?',
      options: [
        'int (5)',
        'float (5.0)',
        'str ("5")',
        'Depende de si los números son enteros'
      ],
      correctIndex: 1,
      explanation: 'En Python 3, la división simple `/` siempre retorna un resultado de tipo `float` (en este caso `5.0`), incluso si la división es exacta.'
    }
  },

  // ==========================================
  // CATEGORÍA C: OPERADORES (OPERATORS)
  // ==========================================
  {
    id: 'py-operator-membership-in',
    language: 'python',
    name: 'in (Pertenencia)',
    category: 'operator',
    difficulty: 'beginner',
    definition: 'Operador que verifica si un elemento está presente dentro de una colección o secuencia (cadena, lista, tupla, diccionario).',
    technicalExplanation: 'Evalúa la existencia llamando al método especial `__contains__()` o recorriendo la secuencia. Retorna un booleano (`True` o `False`).',
    purpose: 'Comprobar rápidamente la presencia de un elemento sin necesidad de escribir un bucle manual.',
    importance: 'Hace que el código de búsqueda sea extraordinariamente limpio, legible y pythónico.',
    syntax: 'elemento in coleccion\nelemento not in coleccion',
    basicExample: 'vocales = ["a", "e", "i", "o", "u"]\nprint("e" in vocales)  # True\nprint("x" in vocales)  # False',
    practicalExample: `usuarios_bloqueados = {"spam123", "bot_99", "troll_x"}
usuario_actual = "bot_99"

if usuario_actual in usuarios_bloqueados:
    print(f"Acceso denegado para: {usuario_actual}")
else:
    print(f"Bienvenido al sistema, {usuario_actual}")`,
    lineByLineExplanation: [
      { line: 'usuarios_bloqueados = { ... }', explanation: 'Crea un conjunto (set) de búsqueda instantánea O(1).' },
      { line: 'if usuario_actual in usuarios_bloqueados:', explanation: 'Verifica la presencia en el conjunto de forma directa y legible.' }
    ],
    expectedOutput: 'Acceso denegado para: bot_99',
    commonMistakes: [
      'Al usar `in` sobre un diccionario, comprueba las claves (keys), no los valores (values). Para valores se usa `in dict.values()`.',
      'Creer que solo funciona con listas; también funciona para buscar subcadenas en texto (ej. `"hola" in "hola mundo"`).'
    ],
    relatedTopics: ['py-for', 'py-datatype-list'],
    tags: ['in', 'pertenencia', 'buscar', 'contiene', 'esta en'],
    documentationUrl: 'https://docs.python.org/3/reference/expressions.html#membership-test-operations',
    equivalents: [
      { language: 'javascript', name: 'includes() / in', codeSnippet: 'lista.includes("e");', exists: true, explanation: 'En JavaScript para arrays se usa el método `.includes()`. El operador `in` en JS comprueba propiedades.' },
      { language: 'java', name: 'contains()', codeSnippet: 'lista.contains("e");', exists: true, explanation: 'Java usa el método `.contains()` de la interfaz Collection.' },
      { language: 'kotlin', name: 'in', codeSnippet: '"e" in lista', exists: true, explanation: 'Kotlin también cuenta con el operador nativo `in` sobre colecciones y rangos.' }
    ],
    miniQuiz: {
      question: '¿Qué retorna `"code" in "CodeLex"` en Python?',
      options: [
        'True',
        'False, porque Python distingue entre mayúsculas y minúsculas',
        'Lanza un TypeError',
        'Retorna 0'
      ],
      correctIndex: 1,
      explanation: 'La comprobación distingue entre mayúsculas y minúsculas (case-sensitive). "code" con minúscula no coincide exactamente con "CodeLex".'
    }
  },

  // ==========================================
  // CATEGORÍA D: FUNCIONES Y UTILIDADES PREDEFINIDAS
  // ==========================================
  {
    id: 'py-builtin-print',
    language: 'python',
    name: 'print()',
    category: 'builtin-function',
    difficulty: 'beginner',
    definition: 'Función integrada que envía objetos y mensajes a la salida estándar (pantalla o consola).',
    technicalExplanation: 'Convierte cada argumento a cadena mediante `str()` y los escribe separados por el parámetro `sep` (por defecto un espacio), finalizando con `end` (por defecto salto de línea `\\n`).',
    purpose: 'Mostrar información, resultados y mensajes de retroalimentación al usuario o al programador.',
    importance: 'Es comúnmente la primerísima línea de código que cualquier persona escribe al aprender a programar.',
    syntax: 'print(*objetos, sep=" ", end="\\n")',
    basicExample: 'print("¡Hola, mundo desde Python!")',
    practicalExample: `nombre = "Sofía"
nivel = 3
puntos = 1500

print("Jugador:", nombre, "| Nivel:", nivel, "| Puntos:", puntos, sep=" ")`,
    lineByLineExplanation: [
      { line: 'print(...)', explanation: 'Imprime múltiples argumentos separados automáticamente por espacios.' }
    ],
    expectedOutput: 'Jugador: Sofía | Nivel: 3 | Puntos: 1500',
    commonMistakes: [
      'En Python 3, `print` es una función y requiere paréntesis obligatorios `print("texto")`; omitirlos como en Python 2 causa SyntaxError.',
      'Intentar guardar el resultado de `print()` en una variable (siempre devuelve `None`).'
    ],
    relatedTopics: ['py-builtin-input', 'py-builtin-len'],
    tags: ['imprimir', 'consola', 'mostrar texto', 'salida', 'escribir'],
    documentationUrl: 'https://docs.python.org/3/library/functions.html#print',
    equivalents: [
      { language: 'javascript', name: 'console.log()', codeSnippet: 'console.log("Hola mundo");', exists: true, explanation: 'JavaScript usa el método `console.log()`.' },
      { language: 'java', name: 'System.out.println()', codeSnippet: 'System.out.println("Hola mundo");', exists: true, explanation: 'Java usa `System.out.println()`.' },
      { language: 'kotlin', name: 'println()', codeSnippet: 'println("Hola mundo")', exists: true, explanation: 'Kotlin usa la función global `println()`.' }
    ],
    miniQuiz: {
      question: '¿Qué parámetro de `print()` permite evitar el salto de línea automático al final?',
      options: [
        'newline=False',
        'end=""',
        'sep=""',
        'flush=True'
      ],
      correctIndex: 1,
      explanation: 'El parámetro `end` especifica qué carácter agregar al terminar. Si se asigna `end=""`, el siguiente print continuará en la misma línea.'
    }
  },
  {
    id: 'py-builtin-len',
    language: 'python',
    name: 'len()',
    category: 'builtin-function',
    difficulty: 'beginner',
    definition: 'Devuelve la cantidad de elementos contenidos en un objeto o la longitud de una secuencia (cadena, lista, diccionario, etc.).',
    technicalExplanation: 'Llama al método especial `__len__()` del objeto. Al acceder directamente a la cabecera de memoria de estructuras en C, su tiempo de ejecución es instantáneo O(1).',
    purpose: 'Conocer cuántos elementos tiene una colección o cuántos caracteres tiene un texto.',
    importance: 'Es indispensable para validar límites, comprobar si una estructura está vacía y controlar ciclos.',
    syntax: 'len(objeto_secuencia)',
    basicExample: 'palabra = "Programar"\nprint(len(palabra))  # 9',
    practicalExample: `materias = ["Algoritmos", "Bases de Datos", "Redes"]

print(f"Total de materias inscritas: {len(materias)}")
if len(materias) > 0:
    print(f"Primera materia: {materias[0]}")`,
    lineByLineExplanation: [
      { line: 'len(materias)', explanation: 'Calcula el número de elementos contenidos en la lista `materias`.' },
      { line: 'if len(materias) > 0:', explanation: 'Valida que la lista no se encuentre vacía antes de acceder al índice cero.' }
    ],
    expectedOutput: 'Total de materias inscritas: 3\nPrimera materia: Algoritmos',
    commonMistakes: [
      'Intentar llamar a `len()` con tipos que no son colecciones (ej. `len(100)` lanza un TypeError porque los enteros no tienen longitud).',
      'Confundir `len(lista)` con el último índice válido (el último índice es `len(lista) - 1`).'
    ],
    relatedTopics: ['py-datatype-str', 'py-datatype-list'],
    tags: ['longitud', 'tamaño', 'contar', 'cantidad', 'cuantos'],
    documentationUrl: 'https://docs.python.org/3/library/functions.html#len',
    equivalents: [
      { language: 'javascript', name: '.length / .size', codeSnippet: 'array.length; set.size;', exists: true, explanation: 'En JavaScript es una propiedad `.length` para strings/arrays o `.size` para Sets/Maps.' },
      { language: 'java', name: '.length / .size()', codeSnippet: 'array.length; lista.size();', exists: true, explanation: 'En Java los arreglos usan el campo `.length`, las cadenas `.length()` y colecciones `.size()`.' },
      { language: 'kotlin', name: '.length / .size', codeSnippet: 'texto.length; lista.size', exists: true, explanation: 'En Kotlin se usan propiedades uniformes `.length` para textos y `.size` para colecciones.' }
    ],
    miniQuiz: {
      question: '¿Qué ocurre al ejecutar `len(500)` en Python?',
      options: [
        'Devuelve 3 (por los tres dígitos)',
        'Lanza un TypeError: object of type \'int\' has no len()',
        'Devuelve 500',
        'Devuelve 1'
      ],
      correctIndex: 1,
      explanation: 'Los números enteros no son secuencias ni colecciones y carecen de un método `__len__()`, arrojando un TypeError. Para contar dígitos debe convertirse a string primero con `len(str(500))`.'
    }
  },

  // ==========================================
  // CATEGORÍA E: CONCEPTOS DE PROGRAMACIÓN
  // ==========================================
  {
    id: 'py-concept-variables',
    language: 'python',
    name: 'Variables y Tipado Dinámico',
    category: 'concept',
    difficulty: 'beginner',
    definition: 'Nombres simbólicos que referencian objetos en la memoria sin requerir declaración de tipos previa.',
    technicalExplanation: 'Python posee tipado dinámico y fuertemente tipado. Las variables son etiquetas vinculadas por referencia a objetos en el heap; los tipos están asociados a los valores, no a las variables.',
    purpose: 'Guardar datos en la memoria de manera intuitiva y modificarlos a lo largo del programa.',
    importance: 'Permite un desarrollo rápido y código muy conciso, eliminando la sobrecarga sintáctica de declarar tipos manuales.',
    syntax: 'nombre_variable = valor',
    basicExample: 'usuario = "Mateo"\nedad = 21\nusuario = 99  # Dinámico: ahora apunta a un entero',
    practicalExample: `titulo = "Guía de Python"
duracion_horas = 4.5
publicado = True

print(f"Curso: {titulo}")
print(f"Duración: {duracion_horas}h | Activo: {publicado}")`,
    lineByLineExplanation: [
      { line: 'titulo = "Guía de Python"', explanation: 'Crea una referencia a un objeto `str`.' },
      { line: 'duracion_horas = 4.5', explanation: 'Crea una referencia a un objeto `float`.' },
      { line: 'publicado = True', explanation: 'Crea una referencia al booleano `True`.' }
    ],
    expectedOutput: 'Curso: Guía de Python\nDuración: 4.5h | Activo: True',
    commonMistakes: [
      'Pensar que "tipado dinámico" significa tipado débil: Python nunca sumará implícitamente un texto con un número (`"5" + 2` produce TypeError).',
      'Olvidar inicializar una variable antes de leerla (lanza NameError).'
    ],
    relatedTopics: ['py-datatype-str', 'py-datatype-int'],
    tags: ['variables', 'dinamico', 'guardar datos', 'tipado'],
    equivalents: [
      { language: 'javascript', name: 'let / const', codeSnippet: 'let usuario = "Mateo";', exists: true, explanation: 'JS también es de tipado dinámico, pero requiere palabras clave como `let` o `const`.' },
      { language: 'java', name: 'Tipado estático', codeSnippet: 'String usuario = "Mateo";', exists: true, explanation: 'Java comprueba los tipos en tiempo de compilación y no permite reasignar a otro tipo.' },
      { language: 'kotlin', name: 'Tipado estático inferido', codeSnippet: 'var usuario = "Mateo"', exists: true, explanation: 'Kotlin infiere el tipo en compilación pero mantiene verificación estática estricta.' }
    ],
    miniQuiz: {
      question: '¿Qué significa que Python tenga "tipado fuerte"?',
      options: [
        'Que es obligatorio declarar el tipo de cada variable antes de usarla',
        'Que no convierte tipos de forma implícita e inesperada (ej. no suma automáticamente un texto con un número)',
        'Que el programa se compila a código de máquina directamente',
        'Que las variables no pueden reasignarse nunca'
      ],
      correctIndex: 1,
      explanation: 'El tipado fuerte garantiza la integridad de los tipos: Python prohíbe operaciones absurdas entre tipos incompatibles (como sumar un string y un entero) a menos que se haga una conversión explícita.'
    }
  }
];
