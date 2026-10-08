import { EducationalElement } from '../../types';

export const KOTLIN_ELEMENTS: EducationalElement[] = [
  // ==========================================
  // CATEGORÍA A: PALABRAS RESERVADAS (KEYWORDS)
  // ==========================================
  {
    id: 'kt-val',
    language: 'kotlin',
    name: 'val',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true, versionIntroduced: 'Kotlin 1.0' },
    definition: 'Declara una variable de solo lectura (inmutable) que solo puede asignarse una única vez.',
    technicalExplanation: 'Equivale al modificador `final` de Java. Genera un getter sin setter en las propiedades de clase. Kotlin promueve la inmutabilidad haciéndolo la opción preferida por defecto.',
    purpose: 'Crear referencias fijas que no deben cambiar de valor tras su inicialización.',
    importance: 'Previene modificaciones de estado no deseadas y simplifica el razonamiento del código en programación concurrente y funcional.',
    syntax: 'val nombre: Tipo = valorInicial',
    basicExample: 'val lenguaje = "Kotlin"\n// lenguaje = "Java" // Error: Val cannot be reassigned',
    practicalExample: `fun main() {
    val precioBase = 100.0
    val porcentajeIva = 0.16
    val total = precioBase + (precioBase * porcentajeIva)
    
    println("Precio base: \$$precioBase")
    println("Total calculado: \$$total")
}`,
    lineByLineExplanation: [
      { line: 'val precioBase = 100.0', explanation: 'Declara una constante inmutable donde el compilador infiere el tipo `Double`.' },
      { line: 'val total = ...', explanation: 'Calcula el total y lo fija en otra referencia inmutable.' },
      { line: 'println("Total calculado: \$$total")', explanation: 'Imprime el valor usando interpolación de cadenas mediante el signo `$`. Se escapa `\\$` para mostrar el símbolo de moneda.' }
    ],
    expectedOutput: 'Precio base: $100.0\nTotal calculado: $116.0',
    commonMistakes: [
      'Intentar reasignar un `val` (genera error de compilación inmediato: Val cannot be reassigned).',
      'Confundir un objeto inmutable con una lista mutable referenciada por un `val` (los elementos de una `MutableList` sí pueden mutar aunque la variable sea `val`).'
    ],
    relatedTopics: ['kt-var', 'kt-concept-variables', 'kt-datatype-string'],
    tags: ['val', 'inmutable', 'constante', 'solo lectura', 'variable'],
    documentationUrl: 'https://kotlinlang.org/docs/basic-syntax.html#variables',
    equivalents: [
      { language: 'javascript', name: 'const', codeSnippet: 'const precioBase = 100.0;', exists: true, explanation: 'JavaScript usa `const` para referencias inmutables.' },
      { language: 'python', name: 'typing.Final', codeSnippet: 'PRECIO_BASE: Final = 100.0', exists: false, explanation: 'Python no tiene palabra clave dedicada; usa convención o `Final`.' },
      { language: 'java', name: 'final', codeSnippet: 'final double precioBase = 100.0;', exists: true, explanation: 'Java usa el modificador `final`.' }
    ],
    miniQuiz: {
      question: '¿Qué diferencia a `val` de `var` en Kotlin?',
      options: [
        '`val` es para números y `var` para textos',
        '`val` es de solo lectura (inmutable), mientras que `var` es mutable y permite reasignaciones',
        '`val` solo existe dentro de funciones y `var` en clases',
        'No hay ninguna diferencia real'
      ],
      correctIndex: 1,
      explanation: '`val` (value) crea una variable inmutable que no puede ser reasignada una vez inicializada, mientras que `var` (variable) permite cambiar su valor repetidas veces.'
    }
  },
  {
    id: 'kt-var',
    language: 'kotlin',
    name: 'var',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true, versionIntroduced: 'Kotlin 1.0' },
    definition: 'Declara una variable mutable cuyo valor puede ser reasignado múltiples veces durante la ejecución.',
    technicalExplanation: 'En Kotlin genera tanto un getter como un setter para las propiedades de clase. Aunque el valor puede cambiar, el tipo de dato asignado al inicio es estricto y no puede modificarse.',
    purpose: 'Permitir variables cuyo estado cambia dinámicamente, como contadores, acumuladores o banderas de control.',
    importance: 'Ofrece mutabilidad controlada sin sacrificar la seguridad del tipado estático.',
    syntax: 'var nombre: Tipo = valorInicial',
    basicExample: 'var contador = 0\ncontador += 1\nprintln(contador) // 1',
    practicalExample: `fun main() {
    var intentos = 3
    
    while (intentos > 0) {
        println("Intentos disponibles: $intentos")
        intentos--
    }
    println("¡Sin intentos restantes!")
}`,
    lineByLineExplanation: [
      { line: 'var intentos = 3', explanation: 'Declara la variable mutable inicializada en 3 con tipo inferido `Int`.' },
      { line: 'intentos--', explanation: 'Decrementa el valor en 1 en cada iteración del bucle.' }
    ],
    expectedOutput: 'Intentos disponibles: 3\nIntentos disponibles: 2\nIntentos disponibles: 1\n¡Sin intentos restantes!',
    commonMistakes: [
      'Intentar cambiar el tipo de la variable al reasignar (ej. `var x = 10; x = "hola"` produce error de tipos en Kotlin).',
      'Usar `var` cuando la variable nunca necesita cambiar (la buena práctica en Kotlin es preferir `val` siempre que sea posible).'
    ],
    relatedTopics: ['kt-val', 'kt-concept-variables'],
    tags: ['var', 'mutable', 'variable', 'reasignable', 'contador'],
    documentationUrl: 'https://kotlinlang.org/docs/basic-syntax.html#variables',
    equivalents: [
      { language: 'javascript', name: 'let', codeSnippet: 'let intentos = 3;', exists: true, explanation: 'JavaScript usa `let` para variables mutables.' },
      { language: 'python', name: 'Asignación directa', codeSnippet: 'intentos = 3', exists: true, explanation: 'Python asigna directamente sin palabra clave.' },
      { language: 'java', name: 'Tipo explícito o var', codeSnippet: 'int intentos = 3;', exists: true, explanation: 'Java usa el tipo o `var` (desde Java 10 para variables locales mutables).' }
    ],
    miniQuiz: {
      question: 'Si ejecutas `var edad = 20; edad = "veintiuno"`, ¿qué ocurre en Kotlin?',
      options: [
        'Kotlin cambia automáticamente el tipo a String sin problemas',
        'Error de compilación: Type mismatch (no puedes asignar un String a un Int)',
        'Lanza una excepción en tiempo de ejecución',
        'El valor pasa a ser null'
      ],
      correctIndex: 1,
      explanation: 'Kotlin infiere que `edad` es de tipo `Int`. Al ser un lenguaje de tipado estático, una variable no puede cambiar su tipo de dato, aunque se haya declarado con `var`.'
    }
  },
  {
    id: 'kt-fun',
    language: 'kotlin',
    name: 'fun',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true, versionIntroduced: 'Kotlin 1.0' },
    definition: 'Palabra reservada para declarar funciones y métodos en Kotlin.',
    technicalExplanation: 'Declara una función que puede ser de primer nivel (top-level), miembro de clase o función de extensión. Soporta sintaxis de expresión de una sola línea y parámetros con valores por defecto.',
    purpose: 'Encapsular bloques de lógica reutilizable con parámetros y valores de retorno bien tipados.',
    importance: 'Permite definir funciones globales sin la obligación de crear clases envolventes como en Java clásico.',
    syntax: 'fun nombre(param1: Tipo, param2: Tipo): TipoRetorno {\n    return resultado\n}',
    basicExample: 'fun sumar(a: Int, b: Int): Int {\n    return a + b\n}\n// O forma concisa: fun sumar(a: Int, b: Int) = a + b',
    practicalExample: `fun saludar(usuario: String, esVip: Boolean = false): String {
    val prefijo = if (esVip) "Distinguido/a" else "Estimado/a"
    return "¡Hola, $prefijo $usuario!"
}

fun main() {
    println(saludar("Laura"))
    println(saludar("Roberto", esVip = true))
}`,
    lineByLineExplanation: [
      { line: 'fun saludar(...): String {', explanation: 'Declara la función con un parámetro por defecto (`esVip = false`) y tipo de retorno String.' },
      { line: 'val prefijo = if (esVip) ...', explanation: 'Usa `if` como una expresión para asignar directamente el valor a la constante.' },
      { line: 'println(saludar("Roberto", esVip = true))', explanation: 'Llamada usando argumentos nombrados (named arguments).' }
    ],
    expectedOutput: '¡Hola, Estimado/a Laura!\n¡Hola, Distinguido/a Roberto!',
    commonMistakes: [
      'Colocar el tipo antes del nombre del parámetro (en Kotlin siempre es `nombre: Tipo`, al revés que en Java o C).',
      'Olvidar especificar el tipo de retorno cuando la función tiene cuerpo de bloque `{ }` y no retorna `Unit`.'
    ],
    relatedTopics: ['kt-val', 'kt-concept-functions'],
    tags: ['fun', 'funcion', 'declarar funcion', 'metodo', 'subrutina'],
    documentationUrl: 'https://kotlinlang.org/docs/functions.html',
    equivalents: [
      { language: 'javascript', name: 'function', codeSnippet: 'function saludar(usuario) { ... }', exists: true, explanation: 'JavaScript usa la palabra `function`.' },
      { language: 'python', name: 'def', codeSnippet: 'def saludar(usuario):\n    return ...', exists: true, explanation: 'Python usa la palabra clave `def`.' },
      { language: 'java', name: 'Método en clase', codeSnippet: 'public static String saludar(String usuario) { ... }', exists: true, explanation: 'Java requiere especificar modificadores y tipo de retorno antes del nombre.' }
    ],
    miniQuiz: {
      question: '¿Cómo se escribe una función de una sola línea (single-expression) en Kotlin para duplicar un número?',
      options: [
        'fun duplicar(x: Int) -> x * 2',
        'fun duplicar(x: Int) = x * 2',
        'def duplicar(x: Int): return x * 2',
        'fun duplicar(x: Int): { x * 2 }'
      ],
      correctIndex: 1,
      explanation: 'En Kotlin, si una función solo evalúa una expresión, se puede omitir el bloque `{ }` y usar directamente el signo `=` (el compilador infiere el tipo de retorno automáticamente).'
    }
  },
  {
    id: 'kt-when',
    language: 'kotlin',
    name: 'when',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true, versionIntroduced: 'Kotlin 1.0' },
    definition: 'Estructura de bifurcación condicional avanzada que sustituye y supera con creces al tradicional `switch` de otros lenguajes.',
    technicalExplanation: 'Evalúa secuencialmente las ramas coincidentes. Puede actuar como sentencia o como expresión exhaustiva con retorno. Admite condiciones complejas, rangos (`in`), tipos (`is`) y comprobaciones múltiples.',
    purpose: 'Manejar múltiples opciones de forma limpia, segura y sumamente legible.',
    importance: 'Elimina los errores de omisión de `break` clásicos de C/Java/JS y ofrece verificación de exhaustividad con clases selladas.',
    syntax: 'when (variable) {\n    opcion1 -> // accion\n    opcion2 -> // accion\n    else -> // por defecto\n}',
    basicExample: 'val x = 2\nwhen (x) {\n    1 -> println("Uno")\n    2 -> println("Dos")\n    else -> println("Otro")\n}',
    practicalExample: `fun categorizarNota(nota: Int): String {
    return when (nota) {
        in 90..100 -> "Excelente (A)"
        in 80..89  -> "Muy bueno (B)"
        in 70..79  -> "Aprobado (C)"
        in 0..69   -> "Reprobado (F)"
        else       -> "Nota no válida"
    }
}

fun main() {
    println(categorizarNota(85))
    println(categorizarNota(105))
}`,
    lineByLineExplanation: [
      { line: 'return when (nota) {', explanation: 'Utiliza `when` como expresión, devolviendo directamente el resultado evaluado.' },
      { line: 'in 80..89 -> "Muy bueno (B)"', explanation: 'Comprueba si el valor se encuentra dentro de un rango inclusivo mediante `in ..`.' },
      { line: 'else -> "Nota no válida"', explanation: 'Rama obligatoria para garantizar la exhaustividad.' }
    ],
    expectedOutput: 'Muy bueno (B)\nNota no válida',
    commonMistakes: [
      'Olvidar la rama `else` cuando se usa `when` como expresión retornable.',
      'Intentar poner instrucciones `break` (en Kotlin las ramas no caen hacia abajo automáticamente; el break no es necesario).'
    ],
    relatedTopics: ['kt-if', 'kt-concept-conditionals'],
    tags: ['when', 'switch', 'condicional', 'decision', 'casos'],
    documentationUrl: 'https://kotlinlang.org/docs/control-flow.html#when-expression',
    equivalents: [
      { language: 'javascript', name: 'switch / case', codeSnippet: 'switch (x) { case 1: ... break; }', exists: true, explanation: 'JavaScript usa `switch` con `case` y requiere `break` explícito.' },
      { language: 'python', name: 'match / case', codeSnippet: 'match x:\n    case 1: ...', exists: true, explanation: 'Python introdujo `match...case` en la versión 3.10 para coincidencia de patrones.' },
      { language: 'java', name: 'switch expresión', codeSnippet: 'switch (x) { case 1 -> "Uno"; default -> "Otro"; }', exists: true, explanation: 'Java moderno incorporó switch expressions similares con sintaxis `->`.' }
    ],
    miniQuiz: {
      question: '¿Por qué en Kotlin las ramas de `when` no necesitan la instrucción `break`?',
      options: [
        'Porque solo se puede evaluar una rama a la vez por limitación del compilador',
        'Porque Kotlin no tiene comportamiento de caída libre (fall-through); solo se ejecuta la rama coincidente',
        'Porque `break` está reservado únicamente para bucles',
        'Porque se reemplazó por la palabra `stop`'
      ],
      correctIndex: 1,
      explanation: 'A diferencia del switch en C/Java antiguo, en Kotlin una vez que una rama de `when` coincide y se ejecuta, el flujo sale automáticamente sin pasar a la siguiente.'
    }
  },

  // ==========================================
  // CATEGORÍA B: TIPOS DE DATOS (DATATYPES)
  // ==========================================
  {
    id: 'kt-datatype-string',
    language: 'kotlin',
    name: 'String',
    category: 'datatype',
    difficulty: 'beginner',
    definition: 'Tipo de dato predefinido que representa secuencias inmutables de texto en Kotlin.',
    technicalExplanation: 'Se compila a `java.lang.String` en la JVM pero está integrado con el sistema de tipos de Kotlin. Es no anulable por defecto (`String`); para permitir valores nulos se debe declarar explícitamente como `String?`.',
    purpose: 'Almacenar texto como nombres, descripciones, mensajes y cadenas alfanuméricas.',
    importance: 'Su soporte nativo para interpolación de plantillas (`$variable`, `${expresion}`) y seguridad contra nulos lo hace excepcionalmente cómodo y seguro.',
    syntax: 'val texto: String = "Contenido"',
    basicExample: 'val nombre = "Brayan"\nprintln("Hola, $nombre")',
    practicalExample: `fun main() {
    val nombre: String = "Brayan"
    val edad: Int = 22
    val mensaje = "Estudiante: $nombre | Mayor de edad: \${edad >= 18}"
    
    println(mensaje)
    println("Cantidad de caracteres: \${nombre.length}")
}`,
    lineByLineExplanation: [
      { line: 'val nombre: String = "Brayan"', explanation: 'Declara una referencia inmutable de tipo String con texto asignado.' },
      { line: 'val mensaje = "... ${edad >= 18}"', explanation: 'Interpola tanto una variable simple con `$nombre` como una expresión evaluada con `${...}`.' },
      { line: 'println(...)', explanation: 'Imprime el resultado final formateado.' }
    ],
    expectedOutput: 'Estudiante: Brayan | Mayor de edad: true\nCantidad de caracteres: 6',
    commonMistakes: [
      'Confundir `String` con `Char` (en Kotlin los caracteres simples usan comillas simples \'A\', mientras que las cadenas usan comillas dobles "A").',
      'Intentar asignar un valor `null` a una variable declarada como `String` (provoca error de compilación: Null can not be a value of a non-null type String).'
    ],
    relatedTopics: ['kt-val', 'kt-operator-safe-call', 'kt-concept-null-safety'],
    tags: ['string', 'texto', 'cadena', 'guardar texto', 'letras'],
    documentationUrl: 'https://kotlinlang.org/docs/strings.html',
    equivalents: [
      { language: 'javascript', name: 'string', codeSnippet: 'const nombre = "Brayan";', exists: true, explanation: 'JS usa cadenas primitivas con template literals `` `Hola ${nombre}` ``.' },
      { language: 'python', name: 'str', codeSnippet: 'nombre = "Brayan"\nprint(f"Hola, {nombre}")', exists: true, explanation: 'Python usa el tipo `str` con f-strings.' },
      { language: 'java', name: 'String', codeSnippet: 'String nombre = "Brayan";', exists: true, explanation: 'Java usa `java.lang.String`, pero no incluye Null Safety ni interpolación nativa con `$`.' }
    ],
    miniQuiz: {
      question: 'En Kotlin, ¿cuál es la diferencia entre `String` y `String?`?',
      options: [
        '`String` es mutable y `String?` es inmutable',
        '`String` nunca puede ser null (no-nullable), mientras que `String?` permite guardar valores null',
        '`String?` es para cadenas cortas y `String` para cadenas largas',
        'Son idénticos y solo varía la preferencia del programador'
      ],
      correctIndex: 1,
      explanation: 'El signo de interrogación `?` indica al compilador de Kotlin que el tipo es "nullable", lo que significa que tiene permitido almacenar el valor especial `null` de forma segura.'
    }
  },
  {
    id: 'kt-datatype-int',
    language: 'kotlin',
    name: 'Int',
    category: 'datatype',
    difficulty: 'beginner',
    definition: 'Tipo numérico predefinido que representa números enteros de 32 bits.',
    technicalExplanation: 'Tiene un rango desde -2,147,483,648 hasta 2,147,483,647. En la JVM, Kotlin lo compila al primitivo eficiente `int` de Java siempre que es posible (a menos que sea nullable `Int?`, donde usa el wrapper `java.lang.Integer`).',
    purpose: 'Realizar operaciones matemáticas discretas, contabilizar bucles y registrar cantidades.',
    importance: 'Es el tipo entero por omisión en Kotlin, con estricta seguridad de tipos que no permite conversiones implícitas no deseadas.',
    syntax: 'val edad: Int = 25',
    basicExample: 'val a = 10\nval b = 3\nprintln(a + b) // 13\nprintln(a / b) // 3',
    practicalExample: `fun main() {
    val precioEntero: Int = 45
    val cantidad: Int = 4
    val subtotal = precioEntero * cantidad
    
    // En Kotlin no se puede sumar un Int con un Long sin convertir explícitamente
    val granTotal: Long = subtotal.toLong() + 1000L
    println("Subtotal: \$$subtotal | Gran Total: \$$granTotal")
}`,
    lineByLineExplanation: [
      { line: 'val precioEntero: Int = 45', explanation: 'Declara la variable de 32 bits.' },
      { line: 'subtotal.toLong()', explanation: 'En Kotlin las conversiones numéricas son siempre explícitas mediante métodos como `.toLong()`, `.toDouble()`, etc.' }
    ],
    expectedOutput: 'Subtotal: $180 | Gran Total: $1180',
    commonMistakes: [
      'Intentar asignar un `Int` a un `Long` o `Double` sin llamar a `.toLong()` o `.toDouble()` (provoca Type mismatch).',
      'Confundir división entera con decimal: `5 / 2` da `2`. Para obtener `2.5`, se debe escribir `5.0 / 2` o `5.toDouble() / 2`.'
    ],
    relatedTopics: ['kt-datatype-double', 'kt-val'],
    tags: ['int', 'entero', 'numero', 'calcular', 'contar'],
    documentationUrl: 'https://kotlinlang.org/docs/numbers.html',
    equivalents: [
      { language: 'javascript', name: 'number', codeSnippet: 'const edad = 25;', exists: true, explanation: 'JS utiliza un único tipo numérico flotante.' },
      { language: 'python', name: 'int', codeSnippet: 'edad = 25', exists: true, explanation: 'Python usa `int` con precisión ilimitada.' },
      { language: 'java', name: 'int', codeSnippet: 'int edad = 25;', exists: true, explanation: 'Java usa el primitivo en minúsculas `int` con conversiones automáticas de ampliación.' }
    ],
    miniQuiz: {
      question: '¿Por qué `val x: Long = 10` causa un error de compilación en Kotlin?',
      options: [
        'Porque en Kotlin los Long no existen',
        'Porque 10 es un literal Int y Kotlin no realiza conversiones implícitas de tipo numérico (se debe escribir 10L)',
        'Porque se debe usar var en lugar de val',
        'Porque falta el punto decimal'
      ],
      correctIndex: 1,
      explanation: 'Kotlin prohíbe la conversión implícita de tipos numéricos para evitar desbordamientos accidentales. Se debe escribir el sufijo literal `10L` o invocar `10.toLong()`.'
    }
  },

  // ==========================================
  // CATEGORÍA C: OPERADORES (OPERATORS)
  // ==========================================
  {
    id: 'kt-operator-elvis',
    language: 'kotlin',
    name: '?: (Operador Elvis)',
    category: 'operator',
    difficulty: 'beginner',
    definition: 'Operador de coalescencia nula que devuelve el valor de la izquierda si no es null, o el valor de la derecha si es null.',
    technicalExplanation: 'Recibe su apodo porque recuerda al peinado y los ojos de Elvis Presley volteados de lado. Si la expresión del lado izquierdo `a != null`, la devuelve; en caso contrario, evalúa y retorna la expresión de la derecha `b` (que puede ser un valor alternativo o incluso una instrucción `throw` o `return`).',
    purpose: 'Proporcionar un valor por defecto limpio y elegante cuando se trabaja con tipos que pueden ser nulos.',
    importance: 'Es uno de los operadores más queridos de Kotlin para erradicar el infame `NullPointerException`.',
    syntax: 'val resultado = variableNullable ?: valorPorDefecto',
    basicExample: 'val nombre: String? = null\nval visible = nombre ?: "Invitado"\nprintln(visible) // Invitado',
    practicalExample: `fun obtenerLongitudSegura(texto: String?): Int {
    // Si texto es nulo, safe call devuelve null, y Elvis provee el 0
    return texto?.length ?: 0
}

fun main() {
    println("Longitud de 'Kotlin': " + obtenerLongitudSegura("Kotlin"))
    println("Longitud de null: " + obtenerLongitudSegura(null))
}`,
    lineByLineExplanation: [
      { line: 'return texto?.length ?: 0', explanation: 'Utiliza Safe Call `?.` para intentar leer `.length`, y el operador Elvis `?:` para reemplazar cualquier valor `null` resultante por el número `0`.' }
    ],
    expectedOutput: 'Longitud de \'Kotlin\': 6\nLongitud de null: 0',
    commonMistakes: [
      'Confundir el operador Elvis `?:` con el operador ternario `? :` de Java/C (en Kotlin no existe ternario; se usa `if/else`).',
      'Olvidar que el lado derecho de Elvis puede usarse para salir de una función: `val x = dato ?: return`.'
    ],
    relatedTopics: ['kt-operator-safe-call', 'kt-concept-null-safety'],
    tags: ['elvis', 'nulo', 'null', 'valor por defecto', 'seguridad contra nulos'],
    documentationUrl: 'https://kotlinlang.org/docs/null-safety.html#elvis-operator',
    equivalents: [
      { language: 'javascript', name: '?? (Nullish Coalescing)', codeSnippet: 'const visible = nombre ?? "Invitado";', exists: true, explanation: 'JavaScript usa el operador `??` (doble interrogación) para valores null o undefined.' },
      { language: 'python', name: 'or condicional', codeSnippet: 'visible = nombre or "Invitado"', exists: true, explanation: 'Python suele usar `a if a is not None else b` o `a or b`.' },
      { language: 'java', name: 'Objects.requireNonNullElse()', codeSnippet: 'Objects.requireNonNullElse(nombre, "Invitado");', exists: true, explanation: 'Java usa métodos utilitarios de `Objects` o `Optional.orElse()`.' }
    ],
    miniQuiz: {
      question: 'En Kotlin, ¿qué valor asigna `val r = null ?: 42`?',
      options: [
        'null',
        '42',
        'Lanza un NullPointerException',
        'true'
      ],
      correctIndex: 1,
      explanation: 'Como la expresión de la izquierda es `null`, el operador Elvis activa la rama derecha y asigna el valor por defecto: 42.'
    }
  },

  // ==========================================
  // CATEGORÍA D: FUNCIONES Y UTILIDADES PREDEFINIDAS
  // ==========================================
  {
    id: 'kt-builtin-println',
    language: 'kotlin',
    name: 'println()',
    category: 'builtin-function',
    difficulty: 'beginner',
    definition: 'Función estándar global que imprime un mensaje o dato en la consola añadiendo un salto de línea.',
    technicalExplanation: 'Función de primer nivel del paquete `kotlin.io`. En la JVM delega internamente en `System.out.println()`, pero sin requerir la molesta sintaxis verbosa de Java.',
    purpose: 'Mostrar información y texto al usuario o programador en la consola.',
    importance: 'Permite comunicarse con el usuario desde la primera línea de aprendizaje.',
    syntax: 'println(mensaje)',
    basicExample: 'println("¡Hola desde Kotlin 2.0!")',
    practicalExample: `fun main() {
    val curso = "CodeLex"
    val modulo = 1
    println("Bienvenido a $curso — Módulo $modulo")
}`,
    lineByLineExplanation: [
      { line: 'println(...)', explanation: 'Imprime la cadena con las variables evaluadas mediante interpolación directa.' }
    ],
    expectedOutput: 'Bienvenido a CodeLex — Módulo 1',
    commonMistakes: [
      'Importar paquetes innecesarios para usar `println` (en Kotlin forma parte del paquete predeterminado importado automáticamente).',
      'Confundir `print` (sin salto) con `println` (con salto de línea).'
    ],
    relatedTopics: ['kt-fun', 'kt-datatype-string'],
    tags: ['imprimir', 'consola', 'salida', 'mostrar texto', 'println'],
    documentationUrl: 'https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.io/println.html',
    equivalents: [
      { language: 'javascript', name: 'console.log()', codeSnippet: 'console.log("Hola mundo");', exists: true, explanation: 'JavaScript usa `console.log()`.' },
      { language: 'python', name: 'print()', codeSnippet: 'print("Hola mundo")', exists: true, explanation: 'Python usa `print()`.' },
      { language: 'java', name: 'System.out.println()', codeSnippet: 'System.out.println("Hola mundo");', exists: true, explanation: 'Java usa `System.out.println()`.' }
    ],
    miniQuiz: {
      question: '¿Qué ventaja tiene `println()` en Kotlin comparado con `System.out.println()` en Java?',
      options: [
        'Se escribe de forma directa y limpia sin obligar a escribir `System.out.` ni pertenecer a una clase',
        'Imprime en colores por defecto',
        'Ejecuta el código en la tarjeta gráfica',
        'Solo funciona con números enteros'
      ],
      correctIndex: 0,
      explanation: 'Kotlin ofrece funciones globales estándar en el paquete `kotlin.io`, permitiendo llamar directamente a `println()` sin necesidad de invocar la clase `System.out`.'
    }
  },

  // ==========================================
  // CATEGORÍA E: CONCEPTOS DE PROGRAMACIÓN
  // ==========================================
  {
    id: 'kt-concept-null-safety',
    language: 'kotlin',
    name: 'Null Safety (Seguridad contra Nulos)',
    category: 'concept',
    difficulty: 'beginner',
    definition: 'Sistema integrado en el compilador de Kotlin que distingue entre tipos que pueden ser nulos y tipos que garantizan nunca ser nulos.',
    technicalExplanation: 'Distingue en tiempo de compilación entre tipos no nulos (ej. `String`) y tipos anulables (ej. `String?`). Impide desreferenciar valores potencialmente nulos a menos que se use un operador seguro (`?.`), Elvis (`?:`) o aserción no nula (`!!`).',
    purpose: 'Eliminar casi por completo el error más común y costoso de la industria del software: el NullPointerException (conocido como el "error del billón de dólares").',
    importance: 'Es una de las características estrella por las que Kotlin se consolidó como el lenguaje oficial preferido para Android y desarrollo moderno.',
    syntax: 'var noNulo: String = "Siempre tiene texto"\nvar siNulo: String? = null',
    basicExample: 'var a: String = "abc"\n// a = null // Error de compilación\nvar b: String? = "abc"\nb = null // Válido',
    practicalExample: `fun procesarCliente(nombre: String?) {
    // 1. Acceso seguro
    val longitud = nombre?.length
    
    // 2. Elvis para valor seguro
    val nombreDefinitivo = nombre ?: "Cliente anónimo"
    
    println("Procesando: $nombreDefinitivo (longitud opcional: $longitud)")
}

fun main() {
    procesarCliente("Carolina")
    procesarCliente(null)
}`,
    lineByLineExplanation: [
      { line: 'fun procesarCliente(nombre: String?) {', explanation: 'Acepta explícitamente un String que puede ser null.' },
      { line: 'val longitud = nombre?.length', explanation: 'Operador Safe Call: si `nombre` es null, no lanza excepción, sino que devuelve null.' },
      { line: 'val nombreDefinitivo = nombre ?: "Cliente anónimo"', explanation: 'Si es null, rescata con el valor por defecto.' }
    ],
    expectedOutput: 'Procesando: Carolina (longitud opcional: 8)\nProcesando: Cliente anónimo (longitud opcional: null)',
    commonMistakes: [
      'Abusar del operador `!!` (doble admiración / non-null assertion), el cual revierte a Kotlin al comportamiento riesgoso de Java y puede lanzar NullPointerException si el valor resulta ser null.',
      'Intentar llamar directamente a métodos sobre variables anulables sin verificación previa o Safe Call `?.`.'
    ],
    relatedTopics: ['kt-operator-elvis', 'kt-datatype-string'],
    tags: ['null safety', 'nulo', 'seguridad', 'nullpointerexception', 'concepto fundamental'],
    equivalents: [
      { language: 'javascript', name: 'Optional Chaining (?.)', codeSnippet: 'usuario?.perfil?.nombre', exists: true, explanation: 'JS cuenta con encadenamiento opcional `?.` pero no distingue tipos nulos en tiempo de compilación.' },
      { language: 'python', name: 'Optional de typing', codeSnippet: 'def fn(x: Optional[str]): ...', exists: false, explanation: 'Python soporta `Optional[T]` en type hints, pero las excepciones `AttributeError` se detectan en tiempo de ejecución.' },
      { language: 'java', name: 'java.util.Optional', codeSnippet: 'Optional<String> opt = Optional.ofNullable(x);', exists: false, explanation: 'Java usa el contenedor `Optional` o anotaciones `@Nullable`, pero no lo impone a nivel del sistema de tipos nativo.' }
    ],
    miniQuiz: {
      question: '¿Por qué Kotlin introdujo Null Safety en su sistema de tipos?',
      options: [
        'Para hacer que todos los programas ocupen menos espacio en disco',
        'Para detectar y erradicar los errores de puntero nulo (NullPointerException) en tiempo de compilación',
        'Para prohibir por completo el uso de memoria RAM dinámica',
        'Para reemplazar a las bases de datos relacionales'
      ],
      correctIndex: 1,
      explanation: 'El objetivo fundamental de Null Safety es atrapar las posibles referencias nulas en el momento de escribir y compilar el código, evitando que la aplicación se caiga en producción con un NullPointerException.'
    }
  }
];
