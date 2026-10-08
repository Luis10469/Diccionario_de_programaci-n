import { EducationalElement } from '../../types';

export const JAVA_ELEMENTS: EducationalElement[] = [
  // ==========================================
  // CATEGORÍA A: PALABRAS RESERVADAS (KEYWORDS)
  // ==========================================
  {
    id: 'java-final',
    language: 'java',
    name: 'final',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true, versionIntroduced: 'Java 1.0' },
    definition: 'Modificador no de acceso que define entidades inmutables o no modificables (variables, métodos o clases).',
    technicalExplanation: 'En variables primitivas, impide reasignar el valor. En referencias a objetos, fija la referencia impidiendo apuntar a otra instancia. En métodos, prohíbe la sobrescritura (@Override). En clases, prohíbe la herencia.',
    purpose: 'Garantizar inmutabilidad, proteger el diseño de clases contra extensiones indebidas y mejorar la seguridad en concurrencia.',
    importance: 'Es la piedra angular de la inmutabilidad y solidez estructural en aplicaciones Java empresariales.',
    syntax: 'final Tipo nombre = valor;',
    basicExample: 'final int DIAS_SEMANA = 7;\n// DIAS_SEMANA = 8; // Error de compilación: cannot assign a value to final variable',
    practicalExample: `public class Main {
    public static void main(String[] args) {
        final double TASA_INTERES = 0.05;
        double prestamo = 1000.0;
        double totalAPagar = prestamo + (prestamo * TASA_INTERES);
        
        System.out.println("Tasa fija: " + (TASA_INTERES * 100) + "%");
        System.out.println("Total a pagar: $" + totalAPagar);
    }
}`,
    lineByLineExplanation: [
      { line: 'final double TASA_INTERES = 0.05;', explanation: 'Declara una constante de punto flotante protegida contra cualquier reasignación.' },
      { line: 'double totalAPagar = ...;', explanation: 'Calcula el balance usando la constante inmutable.' },
      { line: 'System.out.println(...);', explanation: 'Envía el resultado a la consola del sistema.' }
    ],
    expectedOutput: 'Tasa fija: 5.0%\nTotal a pagar: $1050.0',
    commonMistakes: [
      'Creer que `final` en un objeto (como `final List<String> list`) hace inmutable el contenido de la lista; solo hace inmutable la referencia a la lista.',
      'Olvidar inicializar un campo final antes de terminar el constructor de la clase.'
    ],
    relatedTopics: ['java-static', 'java-datatype-int', 'java-concept-variables'],
    tags: ['constante', 'inmutable', 'final', 'no modificable', 'proteger valor'],
    documentationUrl: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.12.4',
    equivalents: [
      { language: 'javascript', name: 'const', codeSnippet: 'const DIAS = 7;', exists: true, explanation: 'JavaScript usa `const` para fijar referencias inmutables.' },
      { language: 'python', name: 'typing.Final', codeSnippet: 'DIAS: Final = 7', exists: false, explanation: 'Python no tiene palabra clave dedicada; se usa la convención MAYÚSCULAS o la anotación `Final` de `typing`.' },
      { language: 'kotlin', name: 'val', codeSnippet: 'val dias = 7', exists: true, explanation: 'Kotlin usa `val` para propiedades de solo lectura equivalentes a `final` de Java.' }
    ],
    miniQuiz: {
      question: '¿Qué sucede si aplicas `final` a una clase en Java (ej. `public final class Segura`)?',
      options: [
        'No se pueden instanciar objetos de esa clase',
        'Ninguna otra clase puede heredar de ella (no se puede extender)',
        'Todos sus métodos se vuelven automáticamente estáticos',
        'Lanza un error de compilación a menos que sea abstracta'
      ],
      correctIndex: 1,
      explanation: 'Una clase marcada como `final` no puede tener subclases; impide la herencia para garantizar la seguridad o inmutabilidad del diseño (como la clase `String`).'
    }
  },
  {
    id: 'java-if',
    language: 'java',
    name: 'if',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true },
    definition: 'Sentencia de bifurcación condicional que evalúa una expresión estrictamente booleana para dirigir el flujo del programa.',
    technicalExplanation: 'A diferencia de lenguajes como C o JavaScript, la condición dentro de `if (condicion)` debe ser de tipo primitivo `boolean` o `Boolean`. No se admite coerción de enteros u objetos a booleanos.',
    purpose: 'Controlar qué instrucciones ejecutar según el resultado de una prueba lógica.',
    importance: 'Es el mecanismo primario de toma de decisiones en Java.',
    syntax: 'if (condicionBooleana) {\n    // instrucciones\n} else {\n    // alternativa\n}',
    basicExample: 'int edad = 20;\nif (edad >= 18) {\n    System.out.println("Acceso autorizado");\n}',
    practicalExample: `public class ControlAcceso {
    public static void main(String[] args) {
        int calificacion = 85;
        
        if (calificacion >= 90) {
            System.out.println("Sobresaliente");
        } else if (calificacion >= 70) {
            System.out.println("Aprobado con buen desempeño");
        } else {
            System.out.println("Necesita presentar examen de recuperacion");
        }
    }
}`,
    lineByLineExplanation: [
      { line: 'if (calificacion >= 90) {', explanation: 'Comprueba si la nota califica para la máxima mención.' },
      { line: '} else if (calificacion >= 70) {', explanation: 'Segunda comprobación en caso de que la primera sea falsa.' },
      { line: '} else {', explanation: 'Bloque residual si no superó los mínimos requeridos.' }
    ],
    expectedOutput: 'Aprobado con buen desempeño',
    commonMistakes: [
      'Intentar evaluar un número como booleano: `if (1) { }` causa un error de compilación en Java (incompatible types: int cannot be converted to boolean).',
      'Comparar strings con `==` dentro del if en lugar de usar `.equals()`. En Java, `==` compara referencias de memoria, no el contenido del texto.'
    ],
    relatedTopics: ['java-else', 'java-operator-equality', 'java-concept-conditionals'],
    tags: ['condicional', 'decision', 'si condicional', 'control de flujo'],
    documentationUrl: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.9',
    equivalents: [
      { language: 'javascript', name: 'if', codeSnippet: 'if (calificacion >= 70) { ... }', exists: true, explanation: 'En JavaScript admite coerción truthy/falsy además de booleanos puros.' },
      { language: 'python', name: 'if', codeSnippet: 'if calificacion >= 70:\n    print(...)', exists: true, explanation: 'Python usa `:` e indentación sin paréntesis obligatorios.' },
      { language: 'kotlin', name: 'if', codeSnippet: 'val estado = if (cal >= 70) "Aprobado" else "Reprobado"', exists: true, explanation: 'En Kotlin `if` es una expresión de retorno directo además de sentencia.' }
    ],
    miniQuiz: {
      question: '¿Por qué `if (x = 5)` causa un error de compilación en Java si x es un `int`?',
      options: [
        'Porque no se pueden usar números enteros en variables',
        'Porque `=` es asignación y el resultado es un int (5), no un booleano (true/false)',
        'Porque el punto y coma es obligatorio dentro del if',
        'Porque x debe ser una constante final'
      ],
      correctIndex: 1,
      explanation: 'Java exige que la condición del `if` sea estrictamente de tipo `boolean`. `x = 5` asigna el valor y devuelve el entero 5, el cual Java rechaza enérgicamente al no ser un booleano.'
    }
  },
  {
    id: 'java-class',
    language: 'java',
    name: 'class',
    category: 'keyword',
    difficulty: 'beginner',
    keywordMeta: { isStrict: true },
    definition: 'Palabra clave fundamental para declarar una clase, el molde o plano a partir del cual se crean objetos.',
    technicalExplanation: 'Define un nuevo tipo de referencia que agrupa atributos (estado) y métodos (comportamiento). En Java, casi todo el código ejecutable debe residir dentro de una clase.',
    purpose: 'Modelar entidades del mundo real o del dominio de la aplicación siguiendo el paradigma de Orientación a Objetos.',
    importance: 'Java es un lenguaje basado fundamentalmente en clases; cada archivo fuente `.java` suele declarar una clase pública homónima.',
    syntax: 'public class NombreClase {\n    // campos y metodos\n}',
    basicExample: 'public class Saludo {\n    public void hola() {\n        System.out.println("Hola desde una clase Java");\n    }\n}',
    practicalExample: `public class Libro {
    private String titulo;
    private int paginas;

    public Libro(String titulo, int paginas) {
        this.titulo = titulo;
        this.paginas = paginas;
    }

    public void mostrarDetalles() {
        System.out.println("Libro: " + this.titulo + " (" + this.paginas + " pags)");
    }

    public static void main(String[] args) {
        Libro miLibro = new Libro("Clean Code", 464);
        miLibro.mostrarDetalles();
    }
}`,
    lineByLineExplanation: [
      { line: 'public class Libro {', explanation: 'Declara la clase pública que servirá como molde.' },
      { line: 'private String titulo; ...', explanation: 'Atributos privados encapsulados.' },
      { line: 'public Libro(...) {', explanation: 'Constructor que inicializa el estado del objeto.' },
      { line: 'Libro miLibro = new Libro(...);', explanation: 'Crea una nueva instancia viva en la memoria del montón (Heap).' }
    ],
    expectedOutput: 'Libro: Clean Code (464 pags)',
    commonMistakes: [
      'Nombrar el archivo `.java` de forma diferente al nombre de la clase pública (deben coincidir con total exactitud de mayúsculas).',
      'Olvidar la palabra clave `new` al intentar instanciar un objeto de la clase.'
    ],
    relatedTopics: ['java-new', 'java-this', 'java-concept-classes'],
    tags: ['clase', 'molde', 'poo', 'objeto', 'orientado a objetos'],
    documentationUrl: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.1',
    equivalents: [
      { language: 'javascript', name: 'class', codeSnippet: 'class Libro { constructor(titulo) { this.titulo = titulo; } }', exists: true, explanation: 'JavaScript incorporó la sintaxis `class` en ES6 basada internamente en prototipos.' },
      { language: 'python', name: 'class', codeSnippet: 'class Libro:\n    def __init__(self, titulo):\n        self.titulo = titulo', exists: true, explanation: 'Python usa `class` con el método constructor inicializador `__init__`.' },
      { language: 'kotlin', name: 'class', codeSnippet: 'class Libro(val titulo: String, val paginas: Int)', exists: true, explanation: 'Kotlin reduce drásticamente el código repetitivo declarando constructores primarios en la cabecera.' }
    ],
    miniQuiz: {
      question: '¿Qué requisito tiene el nombre de un archivo que contiene `public class Servidor` en Java?',
      options: [
        'Puede llamarse de cualquier forma con extensión .java',
        'Debe llamarse exactamente `Servidor.java` coincidiendo en mayúsculas y minúsculas',
        'Debe llamarse obligatoriamente `Main.java`',
        'Debe llamarse en minúsculas `servidor.java`'
      ],
      correctIndex: 1,
      explanation: 'El compilador de Java exige que el nombre del archivo coincida exactamente con la clase pública que declara, incluyendo mayúsculas y minúsculas.'
    }
  },

  // ==========================================
  // CATEGORÍA B: TIPOS DE DATOS (DATATYPES)
  // ==========================================
  {
    id: 'java-datatype-string',
    language: 'java',
    name: 'String',
    category: 'datatype',
    difficulty: 'beginner',
    definition: 'Clase estándar que representa secuencias inmutables de texto en Java.',
    technicalExplanation: 'Es un tipo por referencia (`java.lang.String`), no un primitivo. Los literales se almacenan en un grupo especial de memoria llamado String Constant Pool para optimizar memoria.',
    purpose: 'Guardar y transformar texto como nombres, direcciones, mensajes y formatos.',
    importance: 'Es con diferencia la clase de objetos más frecuentemente utilizada en todo el ecosistema de desarrollo Java.',
    syntax: 'String variable = "Texto entre comillas dobles";',
    basicExample: 'String saludo = "Hola Java";\nSystem.out.println(saludo.length());\nSystem.out.println(saludo.toUpperCase());',
    practicalExample: `public class Main {
    public static void main(String[] args) {
        String texto = "  Aprender Programacion  ";
        String limpio = texto.trim();
        boolean contiene = limpio.contains("Programacion");
        
        System.out.println("Texto limpio: [" + limpio + "]");
        System.out.println("¿Contiene la palabra?: " + contiene);
    }
}`,
    lineByLineExplanation: [
      { line: 'String limpio = texto.trim();', explanation: 'Elimina espacios en blanco iniciales y finales, devolviendo una nueva cadena.' },
      { line: 'limpio.contains("Programacion");', explanation: 'Comprueba si la subsecuencia está presente en el texto.' }
    ],
    expectedOutput: 'Texto limpio: [Aprender Programacion]\n¿Contiene la palabra?: true',
    commonMistakes: [
      'Comparar strings con `==` en vez de `.equals()`: `s1 == s2` compara si apuntan al mismo espacio en memoria, lo cual falla frecuentemente.',
      'Modificar cadenas dentro de bucles intensivos sin usar `StringBuilder` (genera gran cantidad de objetos basura en memoria).'
    ],
    relatedTopics: ['java-datatype-char', 'java-datatype-int'],
    tags: ['string', 'texto', 'cadena', 'guardar texto', 'clase string'],
    documentationUrl: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html',
    equivalents: [
      { language: 'javascript', name: 'string', codeSnippet: 'const texto = "Aprender";', exists: true, explanation: 'En JavaScript es un valor primitivo con envoltorio `String`.' },
      { language: 'python', name: 'str', codeSnippet: 'texto = "Aprender"', exists: true, explanation: 'En Python es el tipo nativo `str`.' },
      { language: 'kotlin', name: 'String', codeSnippet: 'val texto: String = "Aprender"', exists: true, explanation: 'En Kotlin se mapea de forma transparente a `java.lang.String` con soporte para Null Safety.' }
    ],
    miniQuiz: {
      question: 'En Java, ¿cuál es la forma correcta de comparar si dos cadenas `s1` y `s2` tienen el mismo texto?',
      options: [
        's1 == s2',
        's1.equals(s2)',
        's1 === s2',
        's1.compareTo(s2) == false'
      ],
      correctIndex: 1,
      explanation: 'En Java, el método `.equals()` compara el contenido de los caracteres. El operador `==` solo compara si ambas variables apuntan a la misma dirección de memoria.'
    }
  },
  {
    id: 'java-datatype-int',
    language: 'java',
    name: 'int',
    category: 'datatype',
    difficulty: 'beginner',
    definition: 'Tipo de dato primitivo que almacena enteros de 32 bits en complemento a dos con signo.',
    technicalExplanation: 'Rango de valores desde -2,147,483,648 hasta 2,147,483,647. Al ser un tipo primitivo, se almacena directamente en la pila (Stack) con mínimo consumo de memoria y máximo rendimiento.',
    purpose: 'Realizar operaciones aritméticas, contadores de ciclos, índices de matrices y cantidades discretas.',
    importance: 'Es el tipo por defecto para números enteros en Java.',
    syntax: 'int identificador = valorEntero;',
    basicExample: 'int a = 15;\nint b = 4;\nSystem.out.println(a / b); // 3 (división entera)',
    practicalExample: `public class Tienda {
    public static void main(String[] args) {
        int stockInicial = 50;
        int ventasDelDia = 18;
        int stockRestante = stockInicial - ventasDelDia;
        
        System.out.println("Inventario restante: " + stockRestante + " unidades");
    }
}`,
    lineByLineExplanation: [
      { line: 'int stockInicial = 50;', explanation: 'Declara e inicializa la cantidad en inventario con un número entero.' },
      { line: 'int stockRestante = ...;', explanation: 'Resta aritmética entre primitivos int.' }
    ],
    expectedOutput: 'Inventario restante: 32 unidades',
    commonMistakes: [
      'Desbordamiento (Overflow): superar el valor 2,147,483,647 hace que el número "de la vuelta" silenciosamente y se vuelva negativo.',
      'Esperar decimales de `int / int`: `5 / 2` da `2` en Java, no `2.5`. Para obtener decimales, al menos un operando debe ser `double` (ej. `5.0 / 2`).'
    ],
    relatedTopics: ['java-datatype-double', 'java-datatype-long'],
    tags: ['int', 'entero', 'numero', 'primitivo', 'calcular'],
    documentationUrl: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html',
    equivalents: [
      { language: 'javascript', name: 'number', codeSnippet: 'let stock = 50;', exists: true, explanation: 'JS no tiene tipo primitivo int; usa `number` (float de 64 bits).' },
      { language: 'python', name: 'int', codeSnippet: 'stock = 50', exists: true, explanation: 'Python usa `int` pero con tamaño infinito dinámico.' },
      { language: 'kotlin', name: 'Int', codeSnippet: 'val stock: Int = 50', exists: true, explanation: 'Kotlin usa `Int` (representado como primitivo en la JVM).' }
    ],
    miniQuiz: {
      question: '¿Qué resultado produce la operación `int resultado = 7 / 2;` en Java?',
      options: [
        '3.5',
        '3 (se trunca la parte decimal por tratarse de enteros)',
        '4 (se redondea hacia arriba)',
        'Lanza un ArithmeticException'
      ],
      correctIndex: 1,
      explanation: 'En Java, la división entre dos enteros es siempre una división entera truncada hacia cero. El resultado de 7 / 2 es 3.'
    }
  },
  {
    id: 'java-datatype-double',
    language: 'java',
    name: 'double',
    category: 'datatype',
    difficulty: 'beginner',
    definition: 'Tipo primitivo de punto flotante de 64 bits (doble precisión) conforme a la norma IEEE 754.',
    technicalExplanation: 'Permite representar números fraccionarios con aproximadamente 15 a 17 dígitos decimales significativos. Es el tipo predeterminado de Java para literales con punto decimal (ej. `3.14`).',
    purpose: 'Cálculos matemáticos con valores continuos como promedios, pesos, distancias y coordenadas.',
    importance: 'Ofrece mayor precisión que el tipo `float` de 32 bits, siendo la elección estándar para números decimales.',
    syntax: 'double identificador = 12.34;',
    basicExample: 'double radio = 2.5;\ndouble area = Math.PI * radio * radio;\nSystem.out.println("Área: " + area);',
    practicalExample: `public class PromedioEstudiante {
    public static void main(String[] args) {
        double nota1 = 8.5;
        double nota2 = 9.2;
        double nota3 = 7.8;
        
        double promedio = (nota1 + nota2 + nota3) / 3.0;
        System.out.printf("Promedio general: %.2f%n", promedio);
    }
}`,
    lineByLineExplanation: [
      { line: 'double nota1 = 8.5;', explanation: 'Asigna valores de doble precisión con separador punto.' },
      { line: 'double promedio = ... / 3.0;', explanation: 'Calcula el promedio aritmético.' },
      { line: 'System.out.printf(...)', explanation: 'Formatea la salida numérica a 2 decimales.' }
    ],
    expectedOutput: 'Promedio general: 8.50',
    commonMistakes: [
      'Usar `double` para cálculos de dinero y monedas bancarias de alta precisión (los errores de redondeo de punto flotante obligan a usar `BigDecimal`).',
      'Olvidar que los literales con sufijo `f` (ej. `3.14f`) son `float` y no `double`.'
    ],
    relatedTopics: ['java-datatype-int', 'java-datatype-float'],
    tags: ['double', 'decimal', 'flotante', 'numeros decimales', 'calcular'],
    documentationUrl: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html',
    equivalents: [
      { language: 'javascript', name: 'number', codeSnippet: 'const promedio = 8.5;', exists: true, explanation: 'En JS todo `number` es de hecho un double de 64 bits.' },
      { language: 'python', name: 'float', codeSnippet: 'promedio = 8.5', exists: true, explanation: 'En Python `float` equivale exactamente al double de 64 bits en C.' },
      { language: 'kotlin', name: 'Double', codeSnippet: 'val promedio: Double = 8.5', exists: true, explanation: 'En Kotlin se llama `Double`.' }
    ],
    miniQuiz: {
      question: '¿Qué clase de Java se recomienda usar para cálculos de dinero en lugar de `double` para evitar imprecisiones?',
      options: [
        'java.math.BigDecimal',
        'java.lang.DoublePlus',
        'java.util.CurrencyNumber',
        'java.lang.Float'
      ],
      correctIndex: 0,
      explanation: '`BigDecimal` de `java.math` proporciona aritmética decimal exacta de precisión arbitraria, evitando las ligeras imprecisiones binarias inherentes a `double`.'
    }
  },

  // ==========================================
  // CATEGORÍA D: FUNCIONES Y UTILIDADES PREDEFINIDAS
  // ==========================================
  {
    id: 'java-builtin-println',
    language: 'java',
    name: 'System.out.println()',
    category: 'builtin-function',
    difficulty: 'beginner',
    definition: 'Método estándar de salida que imprime una línea de texto o un valor en la consola del sistema y añade un salto de línea.',
    technicalExplanation: 'Accede al flujo de salida estándar (`out`) de la clase final `java.lang.System`, llamando al método `println()` de la clase `java.io.PrintStream`.',
    purpose: 'Mostrar información, resultados de cálculo y mensajes informativos en la terminal.',
    importance: 'Es la instrucción de salida elemental que todo estudiante de Java aprende desde el primer día.',
    syntax: 'System.out.println(mensaje);',
    basicExample: 'System.out.println("¡Hola desde Java!");',
    practicalExample: `public class Saludo {
    public static void main(String[] args) {
        String lenguaje = "Java";
        int version = 21;
        System.out.println("Plataforma: " + lenguaje + " " + version + " LTS");
    }
}`,
    lineByLineExplanation: [
      { line: 'System.out.println(...)', explanation: 'Concatena el texto con variables e imprime el resultado final agregando un salto de línea.' }
    ],
    expectedOutput: 'Plataforma: Java 21 LTS',
    commonMistakes: [
      'Escribir `system` con minúscula (`System` es una clase y requiere mayúscula).',
      'Confundir `print()` (sin salto de línea) con `println()` (con salto de línea).'
    ],
    relatedTopics: ['java-class', 'java-datatype-string'],
    tags: ['imprimir', 'consola', 'mostrar texto', 'salida', 'println'],
    documentationUrl: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/PrintStream.html#println(java.lang.String)',
    equivalents: [
      { language: 'javascript', name: 'console.log()', codeSnippet: 'console.log("Hola mundo");', exists: true, explanation: 'JavaScript usa `console.log()`.' },
      { language: 'python', name: 'print()', codeSnippet: 'print("Hola mundo")', exists: true, explanation: 'Python usa `print()`.' },
      { language: 'kotlin', name: 'println()', codeSnippet: 'println("Hola mundo")', exists: true, explanation: 'Kotlin simplifica la llamada a simplemente `println()`.' }
    ],
    miniQuiz: {
      question: '¿Cuál es la diferencia entre `System.out.print()` y `System.out.println()`?',
      options: [
        '`println` imprime en color verde y `print` en blanco',
        '`println` añade un salto de línea al final del texto y `print` no',
        '`print` solo acepta números y `println` solo texto',
        'No existe ninguna diferencia'
      ],
      correctIndex: 1,
      explanation: 'El sufijo `ln` significa "line". `println()` añade automáticamente un salto de línea (`\\n`), mientras que `print()` deja el cursor en la misma línea.'
    }
  },

  // ==========================================
  // CATEGORÍA E: CONCEPTOS DE PROGRAMACIÓN
  // ==========================================
  {
    id: 'java-concept-variables',
    language: 'java',
    name: 'Variables y Tipado Estático',
    category: 'concept',
    difficulty: 'beginner',
    definition: 'Contenedores de datos en memoria asociados rígidamente a un tipo de dato comprobado en tiempo de compilación.',
    technicalExplanation: 'Java es un lenguaje fuertemente tipado y estático. Cada variable debe tener un tipo declarado (o inferido localmente con `var` desde Java 10). El compilador garantiza la seguridad de tipos antes de generar el bytecode.',
    purpose: 'Guardar información asegurando que solo se almacenen valores compatibles con el tipo previsto.',
    importance: 'Detecta errores de tipo durante la compilación antes de que el programa llegue a ejecutarse en producción.',
    syntax: 'Tipo variable = valorInicial;\nfinal Tipo constante = valor;',
    basicExample: 'int vidas = 3;\nString jugador = "Andrés";',
    practicalExample: `public class EstadoJuego {
    public static void main(String[] args) {
        final int MAX_PUNTOS = 1000;
        int puntosActuales = 250;
        boolean partidaActiva = true;

        System.out.println("Meta maxima: " + MAX_PUNTOS);
        System.out.println("Puntos conseguidos: " + puntosActuales);
        System.out.println("Estado activo: " + partidaActiva);
    }
}`,
    lineByLineExplanation: [
      { line: 'final int MAX_PUNTOS = 1000;', explanation: 'Constante inmutable de tipo entero.' },
      { line: 'int puntosActuales = 250;', explanation: 'Variable entera mutable.' },
      { line: 'boolean partidaActiva = true;', explanation: 'Variable booleana de estado.' }
    ],
    expectedOutput: 'Meta maxima: 1000\nPuntos conseguidos: 250\nEstado activo: true',
    commonMistakes: [
      'Intentar asignar un valor de tipo incompatible (ej. `int edad = "veinte";` produce un error de compilación inmediato).',
      'Usar variables locales sin haberlas inicializado previamente.'
    ],
    relatedTopics: ['java-final', 'java-datatype-int', 'java-datatype-string'],
    tags: ['variables', 'estatico', 'tipado estatico', 'guardar datos'],
    equivalents: [
      { language: 'javascript', name: 'Variables dinámicas', codeSnippet: 'let puntos = 250;', exists: true, explanation: 'JS es de tipado dinámico y la variable puede cambiar de tipo en tiempo de ejecución.' },
      { language: 'python', name: 'Variables dinámicas', codeSnippet: 'puntos = 250', exists: true, explanation: 'Python no requiere declaración de tipos.' },
      { language: 'kotlin', name: 'val / var estático', codeSnippet: 'val maxPuntos = 1000\nvar puntos = 250', exists: true, explanation: 'Kotlin también es estáticamente tipado pero con inferencia moderna y distinción de mutabilidad.' }
    ],
    miniQuiz: {
      question: '¿Qué ventaja principal ofrece el tipado estático de Java para principiantes y empresas?',
      options: [
        'Permite no tener que preocuparse por los tipos de datos',
        'Atrapa incoherencias de tipos en tiempo de compilación antes de ejecutar la aplicación',
        'Hace que el código se ejecute sin requerir la máquina virtual',
        'Hace que todas las variables sean constantes'
      ],
      correctIndex: 1,
      explanation: 'El tipado estático valida los tipos durante la compilación, atrapando errores tipográficos y desajustes de datos antes de que el software se despliegue.'
    }
  }
];
