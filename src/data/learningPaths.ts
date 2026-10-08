import { LanguageCurriculum, LanguageId } from '../types';

export const CURRICULA: Record<LanguageId, LanguageCurriculum> = {
  javascript: {
    language: 'javascript',
    levels: [
      {
        levelNumber: 1,
        title: 'Fundamentos de JavaScript',
        description: 'Aprende los pilares básicos: variables inmutables y reasignables, tipos de datos primitivos y cómo comunicarte mediante la consola.',
        lessons: [
          {
            id: 'js-l1-variables',
            title: 'Variables y Constantes: const y let',
            description: 'Comprende el ámbito de bloque y por qué const es la opción predilecta en el desarrollo actual.',
            elementIds: ['js-const', 'js-let', 'js-concept-variables'],
            keyTakeaway: 'Usa siempre `const` por defecto; cambia a `let` únicamente cuando el valor requiera reasignación.',
            sampleCode: 'const PI = 3.14159;\nlet radio = 5;\nlet area = PI * (radio ** 2);'
          },
          {
            id: 'js-l1-datatypes',
            title: 'Tipos Primitivos: string, number, boolean',
            description: 'Domina los tipos fundamentales, los Template Literals y cómo se representan números y valores lógicos.',
            elementIds: ['js-datatype-string', 'js-datatype-number', 'js-datatype-boolean'],
            keyTakeaway: 'En JavaScript todos los números son del tipo `number` (IEEE 754 de 64 bits), no hay separación nativa int/float.',
            sampleCode: 'const nombre = "Ana";\nconst edad = 20;\nconst mensaje = `${nombre} tiene ${edad} años`;'
          },
          {
            id: 'js-l1-operators',
            title: 'Operadores y Salida por Consola',
            description: 'Usa console.log() e igualdad estricta === para comparar valores sin conversiones automáticas imprevistas.',
            elementIds: ['js-operator-strict-equality', 'js-builtin-console-log'],
            keyTakeaway: 'Evita el operador `==` débil; usa siempre `===` para comparar valor y tipo estrictamente.',
            sampleCode: 'console.log(10 === "10"); // false\nconsole.log(10 === 10);   // true'
          }
        ]
      },
      {
        levelNumber: 2,
        title: 'Control del Programa',
        description: 'Toma decisiones con condicionales y automatiza tareas repetitivas con bucles y funciones modulares.',
        lessons: [
          {
            id: 'js-l2-conditionals',
            title: 'Condicionales: if, else y switch',
            description: 'Aprende a bifurcar la ejecución de tu software con lógica booleana clara.',
            elementIds: ['js-if'],
            keyTakeaway: 'Las condiciones de JavaScript evalúan valores truthy y falsy de forma implícita.',
            sampleCode: 'const edad = 18;\nif (edad >= 18) {\n  console.log("Acceso concedido");\n}'
          },
          {
            id: 'js-l2-loops',
            title: 'Bucles: for, while y for...of',
            description: 'Recorre secuencias y colecciones sin generar ciclos infinitos.',
            elementIds: ['js-for'],
            keyTakeaway: '`for...of` es la forma más limpia y moderna de recorrer elementos de un arreglo iterable.',
            sampleCode: 'for (let i = 1; i <= 3; i++) {\n  console.log("Iteración:", i);\n}'
          },
          {
            id: 'js-l2-functions',
            title: 'Funciones y Reutilización de Código',
            description: 'Empaqueta lógica en funciones declaradas o funciones flecha reutilizables.',
            elementIds: ['js-function'],
            keyTakeaway: 'Las funciones son ciudadanos de primera clase (first-class citizens) en JavaScript.',
            sampleCode: 'function multiplicar(a, b) {\n  return a * b;\n}\nconst resultado = multiplicar(4, 5);'
          }
        ]
      },
      {
        levelNumber: 3,
        title: 'Estructuras de Datos',
        description: 'Agrupa información en arreglos (Arrays), conjuntos (Sets) y mapas o diccionarios clave-valor.',
        lessons: [
          {
            id: 'js-l3-arrays',
            title: 'Arreglos (Arrays) y Métodos Funcionales',
            description: 'Manipula listas con métodos modernos como map, filter y reduce.',
            elementIds: ['js-datatype-string'],
            keyTakeaway: 'Los arrays en JavaScript son dinámicos y pueden contener múltiples tipos simultáneamente.',
            sampleCode: 'const numeros = [1, 2, 3];\nnumeros.push(4);\nconst dobles = numeros.map(n => n * 2);'
          }
        ]
      },
      {
        levelNumber: 4,
        title: 'Programación Orientada a Objetos',
        description: 'Estructura tus aplicaciones mediante clases, constructores, métodos y relaciones de herencia.',
        lessons: [
          {
            id: 'js-l4-classes',
            title: 'Clases, Constructores y Métodos',
            description: 'Modela entidades del mundo real usando la sintaxis de clases de ES6.',
            elementIds: ['js-kw-class', 'js-kw-new'],
            keyTakeaway: 'La sintaxis `class` en JavaScript es azúcar sintáctica sobre el modelo basado en prototipos.',
            sampleCode: 'class Usuario {\n  constructor(nombre) {\n    this.nombre = nombre;\n  }\n}'
          }
        ]
      },
      {
        levelNumber: 5,
        title: 'Temas Avanzados',
        description: 'Manejo robusto de errores con try/catch, asincronía moderna con async/await y encadenamiento opcional.',
        lessons: [
          {
            id: 'js-l5-async-errors',
            title: 'Manejo de Errores y Asincronía',
            description: 'Controla excepciones con try/catch y consume APIs con async/await.',
            elementIds: ['js-kw-try', 'js-kw-catch', 'js-kw-await'],
            keyTakeaway: '`await` pausa de forma no bloqueante hasta que una promesa entrega su resolución o fallo.',
            sampleCode: 'try {\n  const datos = await fetch("/api");\n} catch (err) {\n  console.error("Fallo:", err);\n}'
          }
        ]
      }
    ]
  },
  python: {
    language: 'python',
    levels: [
      {
        levelNumber: 1,
        title: 'Fundamentos de Python',
        description: 'Descubre la sintaxis limpia de Python: asignación directa, números y texto con f-strings.',
        lessons: [
          {
            id: 'py-l1-variables',
            title: 'Variables y Tipado Dinámico Fuerte',
            description: 'Crea referencias a objetos sin declarar tipos explícitos.',
            elementIds: ['py-concept-variables', 'py-datatype-int', 'py-datatype-float'],
            keyTakeaway: 'Python es fuertemente tipado: nunca convertirá implícitamente un texto a número en operaciones matemáticas.',
            sampleCode: 'edad = 25\naltura = 1.75\nprint(f"Edad: {edad}, Altura: {altura}m")'
          },
          {
            id: 'py-l1-strings',
            title: 'Cadenas de Texto (str) y f-strings',
            description: 'Manipulación de texto inmutable y formateo moderno con f-strings.',
            elementIds: ['py-datatype-str', 'py-builtin-len', 'py-builtin-print'],
            keyTakeaway: 'Los strings en Python son secuencias inmutables codificadas en Unicode.',
            sampleCode: 'saludo = "Hola Python"\nprint(f"Texto: {saludo.upper()} | Longitud: {len(saludo)}")'
          }
        ]
      },
      {
        levelNumber: 2,
        title: 'Control del Flujo',
        description: 'Condicionales con indentación limpia, bucles naturales con for-in y modularización con def.',
        lessons: [
          {
            id: 'py-l2-conditionals',
            title: 'Condicionales: if, elif, else',
            description: 'Toma de decisiones mediante bloques delimitados por indentación estricta de 4 espacios.',
            elementIds: ['py-if'],
            keyTakeaway: 'Python no usa llaves `{ }`; la estructura del código está dictada por su indentación.',
            sampleCode: 'puntos = 85\nif puntos >= 90:\n    print("A")\nelif puntos >= 80:\n    print("B")\nelse:\n    print("C")'
          },
          {
            id: 'py-l2-loops',
            title: 'Bucles for con range() y colecciones',
            description: 'Iteración natural sobre secuencias sin lidiar con índices manuales.',
            elementIds: ['py-for', 'py-operator-membership-in'],
            keyTakeaway: '`for x in iterable:` implementa el protocolo de iteradores nativo de Python.',
            sampleCode: 'for i in range(1, 4):\n    print(f"Paso {i}")'
          },
          {
            id: 'py-l2-functions',
            title: 'Funciones con def y valores de retorno',
            description: 'Crea funciones reutilizables con parámetros con nombre y valores por defecto.',
            elementIds: ['py-def'],
            keyTakeaway: 'Si una función termina sin un `return` explícito, devuelve automáticamente el objeto `None`.',
            sampleCode: 'def saludar(nombre: str = "Amigo") -> str:\n    return f"¡Hola, {nombre}!"'
          }
        ]
      },
      {
        levelNumber: 3,
        title: 'Estructuras de Datos',
        description: 'Listas dinámicas, tuplas inmutables, diccionarios clave-valor y conjuntos matemáticos.',
        lessons: [
          {
            id: 'py-l3-lists-dicts',
            title: 'Listas, Diccionarios y Conjuntos',
            description: 'Almacena colecciones con listas `[]` y mapas estructurados `{}`.',
            elementIds: ['py-operator-membership-in'],
            keyTakeaway: 'El operador `in` permite búsquedas ultrarrápidas O(1) cuando se utiliza sobre conjuntos (set) o claves de diccionarios.',
            sampleCode: 'frutas = ["manzana", "pera"]\nif "manzana" in frutas:\n    print("Disponible")'
          }
        ]
      },
      {
        levelNumber: 4,
        title: 'Programación Orientada a Objetos',
        description: 'Clases con `class`, el método inicializador `__init__`, métodos de instancia con `self` y herencia.',
        lessons: [
          {
            id: 'py-l4-classes',
            title: 'Clases, __init__ y self',
            description: 'Aprende cómo funciona el modelo de objetos en Python.',
            elementIds: ['py-kw-class'],
            keyTakeaway: '`self` representa explícitamente a la instancia en los métodos de una clase en Python.',
            sampleCode: 'class Libro:\n    def __init__(self, titulo: str):\n        self.titulo = titulo\n\n    def mostrar(self):\n        print(f"Libro: {self.titulo}")'
          }
        ]
      },
      {
        levelNumber: 5,
        title: 'Temas Avanzados',
        description: 'Gestores de contexto con with, excepciones con try/except y comprensión de listas.',
        lessons: [
          {
            id: 'py-l5-with-exceptions',
            title: 'Excepciones y Gestores de Contexto (with)',
            description: 'Gestiona recursos de forma infalible utilizando `with open(...)` y bloques `try/except`.',
            elementIds: ['py-kw-try', 'py-kw-except', 'py-kw-with'],
            keyTakeaway: '`with` asegura la liberación de recursos (como cerrar archivos) incluso si ocurre una excepción dentro del bloque.',
            sampleCode: 'try:\n    with open("datos.txt", "w") as f:\n        f.write("Hola")\nexcept IOError as e:\n    print("Error:", e)'
          }
        ]
      }
    ]
  },
  java: {
    language: 'java',
    levels: [
      {
        levelNumber: 1,
        title: 'Fundamentos de Java',
        description: 'Tipado estático riguroso, tipos de datos primitivos de tamaño fijo y constantes inmutables con final.',
        lessons: [
          {
            id: 'java-l1-variables',
            title: 'Variables, Tipado Estático y final',
            description: 'Aprende a declarar variables con tipos estrictos validados por el compilador.',
            elementIds: ['java-final', 'java-datatype-int', 'java-concept-variables'],
            keyTakeaway: 'El modificador `final` impide que una variable vuelva a ser reasignada una vez inicializada.',
            sampleCode: 'final int DIAS_SEMANA = 7;\nint diasRestantes = 5;'
          },
          {
            id: 'java-l1-datatypes',
            title: 'Tipos Primitivos y la Clase String',
            description: 'Distingue entre primitivos en Stack (int, double, boolean) y la clase String en Heap.',
            elementIds: ['java-datatype-string', 'java-datatype-double'],
            keyTakeaway: 'Para comparar el contenido de dos objetos `String` en Java siempre debe utilizarse `.equals()`, nunca `==`.',
            sampleCode: 'String saludo = "Hola Java";\ndouble precio = 19.99;\nboolean esValido = saludo.equals("Hola Java");'
          },
          {
            id: 'java-l1-io',
            title: 'Salida Estándar con System.out.println()',
            description: 'Muestra mensajes formateados en la consola estándar del sistema.',
            elementIds: ['java-builtin-println'],
            keyTakeaway: '`System.out.println()` añade un salto de línea al final; `System.out.print()` continúa en la misma línea.',
            sampleCode: 'System.out.println("Salida de datos exitosa");'
          }
        ]
      },
      {
        levelNumber: 2,
        title: 'Estructuras de Control',
        description: 'Toma de decisiones condicionales y ciclos for y while en Java.',
        lessons: [
          {
            id: 'java-l2-control',
            title: 'Condicionales if-else y Bucles',
            description: 'Controla el flujo de ejecución con condiciones estrictamente booleanas.',
            elementIds: ['java-if', 'java-kw-for', 'java-kw-while'],
            keyTakeaway: 'Java exige que la condición dentro del `if` sea de tipo `boolean` puro, sin conversiones implícitas.',
            sampleCode: 'int edad = 18;\nif (edad >= 18) {\n    System.out.println("Mayor de edad");\n}'
          }
        ]
      },
      {
        levelNumber: 3,
        title: 'Colecciones de Java',
        description: 'El framework de colecciones: ArrayList, HashSet y HashMap.',
        lessons: [
          {
            id: 'java-l3-collections',
            title: 'Arreglos y ArrayList',
            description: 'Diferencia entre arreglos primitivos de tamaño fijo `int[]` y listas dinámicas `ArrayList<T>`.',
            elementIds: ['java-datatype-int'],
            keyTakeaway: 'Los genéricos en Java solo pueden utilizar tipos envoltorios de referencia (como `Integer`), no primitivos directos.',
            sampleCode: 'List<String> nombres = new ArrayList<>();\nnombres.add("Elena");\nSystem.out.println(nombres.size());'
          }
        ]
      },
      {
        levelNumber: 4,
        title: 'Programación Orientada a Objetos',
        description: 'Clases, constructores, modificadores de acceso (public, private), herencia y contratos con interfaces.',
        lessons: [
          {
            id: 'java-l4-oop',
            title: 'Clases, Encapsulamiento e Interfaces',
            description: 'El núcleo de Java: modelado con modificadores de acceso e interfaces.',
            elementIds: ['java-class', 'java-kw-interface', 'java-kw-implements'],
            keyTakeaway: 'El encapsulamiento protege los campos mediante atributos `private` y métodos de acceso controlados.',
            sampleCode: 'public class Cuenta {\n    private double saldo;\n    public Cuenta(double s) { this.saldo = s; }\n}'
          }
        ]
      },
      {
        levelNumber: 5,
        title: 'Temas Avanzados',
        description: 'Manejo de excepciones verificadas (Checked Exceptions), Records inmutables y Streams de datos.',
        lessons: [
          {
            id: 'java-l5-advanced',
            title: 'Excepciones y Records modernos',
            description: 'Gestiona errores de forma estructurada con `try-catch` y modela datos con `record`.',
            elementIds: ['java-kw-try', 'java-kw-catch', 'java-kw-record'],
            keyTakeaway: '`record` de Java 16+ genera clases inmutables portadoras de datos con constructor, equals y getters en una sola línea.',
            sampleCode: 'public record Usuario(String id, String nombre) {}\n// Uso inmediato\nUsuario u = new Usuario("01", "Ana");'
          }
        ]
      }
    ]
  },
  kotlin: {
    language: 'kotlin',
    levels: [
      {
        levelNumber: 1,
        title: 'Fundamentos de Kotlin',
        description: 'La concisión de Kotlin: inmutabilidad por defecto con val, mutabilidad explícita con var y tipos seguros.',
        lessons: [
          {
            id: 'kt-l1-variables',
            title: 'Variables: val vs var',
            description: 'Aprende la distinción fundamental entre referencias inmutables y mutables.',
            elementIds: ['kt-val', 'kt-var', 'kt-concept-variables'],
            keyTakeaway: 'Prioriza siempre `val` sobre `var` para garantizar inmutabilidad y predictibilidad en tu código.',
            sampleCode: 'val maximo = 100\nvar actual = 0\nactual += 10'
          },
          {
            id: 'kt-l1-strings-null',
            title: 'String y Null Safety Integrado',
            description: 'Tipos no anulables por defecto (`String`) vs tipos anulables (`String?`).',
            elementIds: ['kt-datatype-string', 'kt-operator-elvis', 'kt-concept-null-safety'],
            keyTakeaway: 'El compilador de Kotlin prohíbe asignar `null` a un tipo ordinario, evitando caídas por NullPointerException.',
            sampleCode: 'val nombre: String = "Laura"\nval opcional: String? = null\nval seguro = opcional ?: "Invitado"'
          },
          {
            id: 'kt-l1-output',
            title: 'Salida con println() y Plantillas de String',
            description: 'Usa la función de primer nivel println con interpolación directa mediante $ y ${}.',
            elementIds: ['kt-builtin-println', 'kt-datatype-int'],
            keyTakeaway: 'Interpola variables simples con `$variable` y expresiones de código complejas con `${expresion}`.',
            sampleCode: 'val precio = 50\nprintln("El doble del precio es: \${precio * 2}")'
          }
        ]
      },
      {
        levelNumber: 2,
        title: 'Control de Flujo Moderno',
        description: 'Estructuras de bifurcación avanzadas con when y bucles limpios sobre rangos.',
        lessons: [
          {
            id: 'kt-l2-when',
            title: 'Bifurcaciones con when y if como expresión',
            description: 'Sustituye los arcaicos switch con la expresividad y seguridad exhaustiva de `when`.',
            elementIds: ['kt-when'],
            keyTakeaway: '`when` no necesita sentencias `break` porque no presenta comportamiento de caída libre.',
            sampleCode: 'val nota = 9\nval resultado = when (nota) {\n    in 9..10 -> "Sobresaliente"\n    in 7..8  -> "Aprobado"\n    else     -> "Reprobado"\n}'
          },
          {
            id: 'kt-l2-functions',
            title: 'Funciones con fun y Expresiones de una Línea',
            description: 'Escribe funciones concisas y argumentos con nombre.',
            elementIds: ['kt-fun'],
            keyTakeaway: 'Para funciones sencillas puedes usar la sintaxis de expresión directa `= resultado`.',
            sampleCode: 'fun duplicar(n: Int) = n * 2\nprintln(duplicar(8)) // 16'
          }
        ]
      },
      {
        levelNumber: 3,
        title: 'Colecciones Inmutables y Mutables',
        description: 'Kotlin separa explícitamente colecciones de solo lectura (`listOf`) de colecciones mutables (`mutableListOf`).',
        lessons: [
          {
            id: 'kt-l3-collections',
            title: 'listOf vs mutableListOf',
            description: 'Aprende por qué Kotlin promueve la inmutabilidad en sus colecciones nativas.',
            elementIds: ['kt-datatype-string'],
            keyTakeaway: '`listOf()` crea una lista de solo lectura que previene modificaciones accidentales.',
            sampleCode: 'val fija = listOf("A", "B")\nval editable = mutableListOf("A", "B")\neditable.add("C")'
          }
        ]
      },
      {
        levelNumber: 4,
        title: 'Orientación a Objetos Concisa',
        description: 'Constructores primarios en la cabecera, data classes automáticas y Singletons con object.',
        lessons: [
          {
            id: 'kt-l4-classes',
            title: 'Data Classes y Constructores Primarios',
            description: 'Genera modelos de datos completos en una sola línea de código legible.',
            elementIds: ['kt-kw-class', 'kt-kw-data', 'kt-kw-object'],
            keyTakeaway: '`data class` genera automáticamente `toString()`, `equals()`, `hashCode()` y `copy()`.',
            sampleCode: 'data class Usuario(val id: Int, val email: String)\nval u = Usuario(1, "test@mail.com")\nprintln(u)'
          }
        ]
      },
      {
        levelNumber: 5,
        title: 'Características de Vanguardia',
        description: 'Funciones de extensión, Smart Casts automáticos y corutinas para concurrencia.',
        lessons: [
          {
            id: 'kt-l5-extensions',
            title: 'Funciones de Extensión y Smart Casts',
            description: 'Agrega métodos a clases existentes de terceros sin modificar su código fuente.',
            elementIds: ['kt-concept-null-safety', 'kt-kw-is'],
            keyTakeaway: 'Una vez comprobado un tipo con `is`, Kotlin castea la variable automáticamente (Smart Cast).',
            sampleCode: 'fun String.hacerMayuscula(): String = this.uppercase()\nprintln("hola".hacerMayuscula())'
          }
        ]
      }
    ]
  }
};
