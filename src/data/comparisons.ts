import { ComparisonConcept } from '../types';

export const COMPARISONS_DATA: ComparisonConcept[] = [
  {
    id: 'compare-variables-immutable',
    title: 'Declarar constantes (Inmutables)',
    category: 'Variables',
    description: 'Cómo declarar identificadores cuyos valores no pueden ser reasignados tras su creación.',
    implementations: {
      javascript: {
        code: 'const edad = 18;\n// edad = 19; // TypeError: Assignment to constant variable',
        explanation: '`const` crea una referencia inmutable con ámbito de bloque `{ }`. En objetos, sus propiedades internas siguen siendo mutables.',
        notes: 'Tipado dinámico. No se especifica el tipo `number` explícitamente.'
      },
      python: {
        code: 'from typing import Final\n\nEDAD: Final = 18\n# edad = 18  # Por convención clásica se usan MAYÚSCULAS',
        explanation: 'Python no tiene palabra clave `const` nativa en tiempo de ejecución. Se usan nombres en MAYÚSCULAS por convención o el tipo `Final` de `typing` para linters.',
        notes: 'En tiempo de ejecución Python permite la reasignación a menos que se use un linter/type checker como mypy.'
      },
      java: {
        code: 'final int edad = 18;\n// edad = 19; // Error de compilación: cannot assign a value to final variable',
        explanation: 'El modificador `final` prohíbe la reasignación del primitivo o referencia. Es verificado estrictamente en tiempo de compilación.',
        notes: 'Tipado estático obligatorio. Se debe indicar el tipo `int` o `final var edad = 18;` desde Java 10.'
      },
      kotlin: {
        code: 'val edad: Int = 18\n// O por inferencia: val edad = 18\n// edad = 19 // Error: Val cannot be reassigned',
        explanation: '`val` (value) declara una variable de solo lectura. El compilador infiere el tipo `Int` automáticamente sin perder verificación estática.',
        notes: 'Es la forma predilecta y recomendada por defecto en el estilo idiomático de Kotlin.'
      }
    }
  },
  {
    id: 'compare-variables-mutable',
    title: 'Declarar variables mutables',
    category: 'Variables',
    description: 'Cómo declarar variables que permiten reasignar su contenido múltiples veces.',
    implementations: {
      javascript: {
        code: 'let contador = 0;\ncontador += 1;\nconsole.log(contador); // 1',
        explanation: '`let` tiene alcance de bloque léxico `{ }` y previene el hoisting confuso de la antigua palabra `var`.',
        notes: 'El tipo puede cambiar en tiempo de ejecución (`contador = "uno"` es válido en JS).'
      },
      python: {
        code: 'contador = 0\ncontador += 1\nprint(contador) # 1',
        explanation: 'Asignación directa sin palabras clave como let o var. El enlace se crea en el ámbito local.',
        notes: 'Tipado puramente dinámico con fuerte inspección de tipos en operaciones.'
      },
      java: {
        code: 'int contador = 0;\ncontador += 1;\nSystem.out.println(contador); // 1',
        explanation: 'Requiere indicar el tipo primitivo `int` (o `var contador = 0`). El tipo queda fijado permanentemente.',
        notes: 'No permite asignar tipos incompatibles posteriormente (ej. `contador = "uno"` no compila).'
      },
      kotlin: {
        code: 'var contador = 0\ncontador += 1\nprintln(contador) // 1',
        explanation: 'Kotlin utiliza `var` para variables mutables. Infiere que es `Int` pero prohíbe cambiar el tipo de dato.',
        notes: 'La reasignación `contador = "uno"` genera un error de compilación: Type mismatch.'
      }
    }
  },
  {
    id: 'compare-print-console',
    title: 'Imprimir en consola',
    category: 'Entrada / Salida',
    description: 'Cómo mostrar mensajes y variables formateadas en la pantalla o terminal.',
    implementations: {
      javascript: {
        code: 'const nombre = "Carlos";\nconsole.log(`Hola, ${nombre}!`);',
        explanation: 'Usa el método global `console.log()` y template literals con comillas invertidas `` `...` `` para interpolación.',
        notes: 'Soporta múltiples argumentos separados por coma: `console.log("Hola", nombre)`.'
      },
      python: {
        code: 'nombre = "Carlos"\nprint(f"Hola, {nombre}!")',
        explanation: 'Función nativa `print()` combinada con f-strings (cadenas literales formateadas con prefijo `f`).',
        notes: 'Añade automáticamente un salto de línea salvo que se cambie el argumento `end=""`.'
      },
      java: {
        code: 'String nombre = "Carlos";\nSystem.out.println("Hola, " + nombre + "!");',
        explanation: 'Llama al flujo estándar `System.out.println()`. Tradicionalmente concatena con `+`.',
        notes: 'Java 21 introdujo String Templates como vista previa, pero la concatenación o `String.format()` sigue siendo estándar.'
      },
      kotlin: {
        code: 'val nombre = "Carlos"\nprintln("Hola, $nombre!")',
        explanation: 'Función de primer nivel `println()` con interpolación nativa mediante el signo de dólar `$nombre` o `${expresion}`.',
        notes: 'Muy conciso, no requiere importar nada ni escribir `System.out`.'
      }
    }
  },
  {
    id: 'compare-conditionals',
    title: 'Condicionales (if / else)',
    category: 'Control de flujo',
    description: 'Cómo evaluar condiciones y bifurcar la ejecución del programa.',
    implementations: {
      javascript: {
        code: 'if (edad >= 18) {\n  console.log("Mayor");\n} else {\n  console.log("Menor");\n}',
        explanation: 'Condición obligatoria entre paréntesis `( )` y cuerpo entre llaves `{ }`. Admite valores truthy y falsy.',
        notes: 'El operador ternario `cond ? a : b` se usa para expresiones que retornan valor.'
      },
      python: {
        code: 'if edad >= 18:\n    print("Mayor")\nelse:\n    print("Menor")',
        explanation: 'No requiere paréntesis obligatorios. Termina la cabecera con dos puntos `:` y delimita bloques mediante indentación.',
        notes: 'Para condiciones intermedias usa la palabra clave `elif`. Operador ternario: `a if cond else b`.'
      },
      java: {
        code: 'if (edad >= 18) {\n    System.out.println("Mayor");\n} else {\n    System.out.println("Menor");\n}',
        explanation: 'La condición debe ser estrictamente de tipo `boolean` (no permite coerción de enteros como en C/JS).',
        notes: 'Usa `else if` para ramas intermedias. Soporta ternario `cond ? a : b`.'
      },
      kotlin: {
        code: 'val mensaje = if (edad >= 18) {\n    "Mayor"\n} else {\n    "Menor"\n}',
        explanation: 'En Kotlin, `if` es una expresión con retorno además de sentencia. Reemplaza la necesidad del operador ternario `? :`.',
        notes: 'La última línea evaluada de cada bloque se convierte en el valor de retorno de la expresión.'
      }
    }
  },
  {
    id: 'compare-functions',
    title: 'Definición de funciones',
    category: 'Funciones',
    description: 'Cómo encapsular lógica reutilizable con parámetros y valores de retorno.',
    implementations: {
      javascript: {
        code: '// Declaración tradicional\nfunction sumar(a, b) {\n  return a + b;\n}\n\n// Función flecha (arrow function)\nconst sumarFlecha = (a, b) => a + b;',
        explanation: 'Palabra clave `function` o sintaxis de flecha concisa `=>`. Parámetros sin tipos en JS puro.',
        notes: 'Si se omite el `return`, devuelve implícitamente `undefined`.'
      },
      python: {
        code: 'def sumar(a: int, b: int) -> int:\n    return a + b\n\n# Expresión lambda anónima\nsumar_lambda = lambda a, b: a + b',
        explanation: 'Palabra clave `def` con dos puntos `:` e indentación. Type hints opcionales `a: int -> int`.',
        notes: 'Si se omite el `return`, devuelve implícitamente `None`.'
      },
      java: {
        code: 'public static int sumar(int a, int b) {\n    return a + b;\n}',
        explanation: 'Debe residir dentro de una clase. Requiere modificadores de visibilidad y tipos explícitos para retorno y argumentos.',
        notes: 'Si no retorna nada, el tipo de retorno debe ser `void`.'
      },
      kotlin: {
        code: '// Forma de bloque\nfun sumar(a: Int, b: Int): Int {\n    return a + b\n}\n\n// Forma de expresión directa\nfun sumarExp(a: Int, b: Int) = a + b',
        explanation: 'Palabra clave `fun`. Admite funciones de primer nivel sin necesidad de clases envolventes.',
        notes: 'Si no devuelve valor, su tipo es `Unit` (opcional de escribir).'
      }
    }
  },
  {
    id: 'compare-null-handling',
    title: 'Manejo de valores nulos (Null Safety)',
    category: 'Seguridad',
    description: 'Cómo gestiona cada lenguaje la ausencia de valor y la protección contra errores de puntero nulo.',
    implementations: {
      javascript: {
        code: 'let usuario = null;\n// Encadenamiento opcional (Optional Chaining)\nconsole.log(usuario?.nombre);\n// Coalescencia nula (Nullish coalescing)\nconst nombre = usuario?.nombre ?? "Invitado";',
        explanation: 'Tiene dos valores para ausencia: `null` (intencional) y `undefined` (no inicializado). Soporta operadores modernos `?.` y `??`.',
        notes: 'Los errores se manifiestan en tiempo de ejecución como `TypeError: Cannot read properties of null`.'
      },
      python: {
        code: 'usuario = None\n\n# Comprobación de identidad\nif usuario is not None:\n    print(usuario.nombre)\nelse:\n    nombre = "Invitado"',
        explanation: 'Usa la constante única `None`. Se comprueba canónicamente con el operador de identidad `is None` o `is not None`.',
        notes: 'Intentar acceder a atributos de `None` lanza `AttributeError: \'NoneType\' object has no attribute ...`.'
      },
      java: {
        code: 'String usuario = null;\n// Java clásico requiere comprobaciones manuales\nif (usuario != null) {\n    System.out.println(usuario.length());\n}\n// Java moderno incluye el contenedor Optional\nOptional<String> opt = Optional.ofNullable(usuario);\nString res = opt.orElse("Invitado");',
        explanation: 'Cualquier referencia no primitiva puede ser `null`. No tiene distinción de nulabilidad en el sistema de tipos básico.',
        notes: 'Causa número 1 de caídas en producción: `NullPointerException` (NPE).'
      },
      kotlin: {
        code: 'var noNulo: String = "Siempre seguro"\n// noNulo = null // Error de compilación\n\nvar siNulo: String? = null // Tipo nullable\nval longitud = siNulo?.length // Safe Call (retorna Int?)\nval definitivo = siNulo ?: "Invitado" // Operador Elvis',
        explanation: 'Null Safety integrado en el compilador. Distingue entre tipos no nulos (`String`) y anulables (`String?`).',
        notes: 'Erradica el NullPointerException en tiempo de compilación.'
      }
    }
  }
];
