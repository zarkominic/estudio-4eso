/* curriculo.js — EL CATÁLOGO DE TEMAS DEL CURSO.
   Sacado de los saberes básicos oficiales de 4º ESO (RD 217/2022, y Decreto 65/2022
   de la Comunidad de Madrid, que los concreta). No existe ninguna API ni fichero
   abierto con esto: está en el decreto, así que lo mantenemos aquí a mano.

   PARA QUÉ SIRVE: para pedir un tema nuevo sin explicar nada. Basta con decir el id
   —por ejemplo «haz mat-b-trigonometria»— y de aquí sale todo lo que hace falta:
   el título, de qué saber básico viene, qué entra y qué generadores de ejercicios
   necesita. El estándar de cómo se construye está en ESTANDAR.md.

   estado: "listo" | "" (vacío = por hacer)  → lo pone temas.js cuando se publica. */

const CURRICULO = {
  "Matemáticas B (académicas)": [
    { id:"mat-b-reales", bloque:"A. Sentido numérico", titulo:"Números reales e intervalos",
      saber:"Los conjuntos numéricos: relaciones y propiedades. Orden en la recta numérica. Intervalos.",
      entra:["Naturales, enteros, racionales, irracionales y reales","Decimales exactos, periódicos y no periódicos","Fracción generatriz","Intervalos y semirrectas: notación y recta","Valor absoluto","Aproximación, redondeo y cota de error"],
      generadores:["clasificarNumero","fraccionGeneratriz","intervalos","errorAbsolutoRelativo"] },

    { id:"mates-radicales", bloque:"A. Sentido numérico", titulo:"Radicales",
      saber:"Operaciones con números reales. Propiedades y relaciones inversas de las operaciones.",
      entra:["Raíz n-ésima y existencia","Potencias de exponente fraccionario","Simplificar, sacar y meter factores","Sumar, multiplicar y dividir","Racionalizar (simple y conjugado)","Radicales con letras","Ecuaciones con radicales"],
      generadores:["simplificar","sumar","multiplicar","racionalizar","conjugado","comparar","potencias","problema"] },

    { id:"mat-b-potencias", bloque:"A. Sentido numérico", titulo:"Potencias y notación científica",
      saber:"Expresión de cantidades mediante números reales con la precisión requerida.",
      entra:["Propiedades de las potencias","Exponente negativo y cero","Notación científica: escribir y leer","Operar en notación científica","Orden de magnitud"],
      generadores:["propiedadesPotencias","aNotacionCientifica","operarNotacion","ordenMagnitud"] },

    { id:"mat-b-proporcionalidad", bloque:"A. Sentido numérico", titulo:"Porcentajes e interés compuesto",
      saber:"Situaciones de proporcionalidad directa e inversa en diferentes contextos.",
      entra:["Índice de variación","Aumentos y descuentos encadenados","Porcentaje inverso (¿de cuánto venía?)","Interés simple y compuesto","Repartos directa e inversamente proporcionales"],
      generadores:["porcentajeDirecto","porcentajeInverso","encadenados","interesCompuesto","reparto"] },

    { id:"mat-b-polinomios", bloque:"D. Sentido algebraico", titulo:"Polinomios y factorización",
      saber:"Formas equivalentes de expresiones algebraicas.",
      entra:["Operaciones con polinomios","Ruffini y teorema del resto","Raíces de un polinomio","Factorizar: factor común, identidades notables, Ruffini","Fracciones algebraicas: simplificar"],
      generadores:["ruffini","factorizar","raicesPolinomio","simplificarFraccion"] },

    { id:"mat-b-ecuaciones", bloque:"D. Sentido algebraico", titulo:"Ecuaciones de segundo grado y otras",
      saber:"Estrategias de búsqueda de soluciones en ecuaciones lineales y no lineales.",
      entra:["Fórmula y discriminante","Ecuaciones incompletas","Bicuadradas","Con radicales (y soluciones extrañas)","Con fracciones algebraicas","Problemas que llevan a ecuaciones"],
      generadores:["segundoGrado","bicuadrada","conRadicales","conFracciones","problemaEcuacion"] },

    { id:"mates-sistemas", bloque:"D. Sentido algebraico", titulo:"Sistemas de ecuaciones",
      saber:"Resolución de sistemas de ecuaciones lineales y no lineales sencillas.",
      entra:["Sustitución, igualación y reducción","Interpretación gráfica","Compatible, incompatible e indeterminado","Sistemas no lineales","Problemas de mezclas, edades y móviles"],
      generadores:["sistemaLineal","sistemaNoLineal","clasificarSistema","problemaSistema"] },

    { id:"mat-b-inecuaciones", bloque:"D. Sentido algebraico", titulo:"Inecuaciones",
      saber:"Ecuaciones, sistemas e inecuaciones: resolución.",
      entra:["Inecuaciones de primer grado","Cambiar el signo al multiplicar por negativo","Inecuaciones de segundo grado","Solución en intervalos y en la recta","Sistemas de inecuaciones"],
      generadores:["inecuacionLineal","inecuacionCuadratica","sistemaInecuaciones"] },

    { id:"mates-funcion-cuadratica", bloque:"D. Sentido algebraico", titulo:"La función cuadrática",
      saber:"Relaciones lineales y no lineales: identificación y comparación de representaciones.",
      entra:["Forma general y vértice","Cortes con los ejes","Dibujar la parábola","Problemas de máximos y mínimos"],
      generadores:["verticeParabola","cortesEjes","problemaOptimizacion"] },

    { id:"mat-b-funciones", bloque:"D. Sentido algebraico", titulo:"Funciones: tipos y propiedades",
      saber:"Representación de funciones: interpretación de sus propiedades.",
      entra:["Dominio y recorrido","Continuidad, crecimiento y extremos","Función lineal, cuadrática, de proporcionalidad inversa, radical","Exponencial y logarítmica","Funciones definidas a trozos","Tasa de variación media"],
      generadores:["dominio","tasaVariacion","identificarFuncion","funcionTrozos"] },

    { id:"mat-b-trigonometria", bloque:"B. Sentido de la medida", titulo:"Trigonometría",
      saber:"Razones trigonométricas de un ángulo agudo y sus relaciones.",
      entra:["Seno, coseno y tangente en el triángulo rectángulo","Relación fundamental","Razones de 30º, 45º y 60º","Resolver triángulos rectángulos","Problemas de alturas y distancias"],
      generadores:["razonTrigonometrica","resolverTriangulo","relacionFundamental","problemaAltura"] },

    { id:"mat-b-geometria-analitica", bloque:"C. Sentido espacial", titulo:"Geometría analítica",
      saber:"Expresiones algebraicas de una recta: selección de la más adecuada.",
      entra:["Vectores: componentes, módulo y suma","Punto medio y distancia","Ecuaciones de la recta: vectorial, continua, general, explícita","Pendiente","Paralelas y perpendiculares","Posición relativa de dos rectas"],
      generadores:["vectores","distanciaPuntos","ecuacionRecta","posicionRectas"] },

    { id:"mat-b-semejanza", bloque:"C. Sentido espacial", titulo:"Semejanza y Tales",
      saber:"Propiedades geométricas de objetos matemáticos y de la vida cotidiana.",
      entra:["Teorema de Tales","Criterios de semejanza de triángulos","Razón de semejanza en áreas y volúmenes","Escalas","Teorema de Pitágoras en el espacio"],
      generadores:["tales","razonSemejanza","escalas","pitagoras"] },

    { id:"mat-b-estadistica", bloque:"E. Sentido estocástico", titulo:"Estadística de dos variables",
      saber:"Variable estadística bidimensional. Tablas de contingencia. Regresión lineal.",
      entra:["Media, mediana, moda y cuartiles","Desviación típica y coeficiente de variación","Diagrama de dispersión","Correlación: signo y fuerza","Recta de regresión y predicciones"],
      generadores:["medidasCentralizacion","desviacionTipica","correlacion","prediccionRegresion"] },

    { id:"mat-b-probabilidad", bloque:"E. Sentido estocástico", titulo:"Probabilidad",
      saber:"Cálculo aplicando la regla de Laplace en experimentos simples y compuestos.",
      entra:["Regla de Laplace","Sucesos: unión, intersección y contrario","Probabilidad condicionada","Diagramas de árbol","Con y sin reemplazamiento","Dependientes e independientes"],
      generadores:["laplace","sucesos","condicionada","arbol"] },
  ],

  "Física y Química": [
    { id:"fyq-cinematica", bloque:"Movimiento", titulo:"Cinemática",
      saber:"MRU y MRUA: posición, velocidad y aceleración.",
      entra:["Sistema de referencia y trayectoria","MRU: ecuación y gráficas","MRUA: ecuaciones y gráficas","Caída libre y lanzamiento vertical","Lectura de gráficas x-t y v-t"],
      generadores:["mru","mrua","caidaLibre","leerGrafica"] },
    { id:"fyq-dinamica", bloque:"Fuerzas", titulo:"Dinámica",
      saber:"Leyes de Newton y fuerzas en la vida cotidiana.",
      entra:["Las tres leyes de Newton","Peso, normal y rozamiento","Diagramas de fuerzas","Planos inclinados","Ley de gravitación universal"],
      generadores:["segundaLey","rozamiento","planoInclinado","gravitacion"] },
    { id:"fyq-energia", bloque:"Energía", titulo:"Energía y trabajo",
      saber:"Trabajo, potencia y conservación de la energía mecánica.",
      entra:["Energía cinética y potencial","Trabajo y potencia","Conservación de la energía mecánica","Calor y temperatura","Rendimiento"],
      generadores:["energiaMecanica","trabajoPotencia","conservacion"] },
    { id:"fyq-reacciones", bloque:"Química", titulo:"Reacciones y estequiometría",
      saber:"Cálculos estequiométricos en reacciones químicas.",
      entra:["Ajustar ecuaciones","Mol y masa molar","Cálculos masa-masa y masa-volumen","Reactivo limitante","Rendimiento y pureza"],
      generadores:["ajustar","molMasa","estequiometria","reactivoLimitante"] },
  ],
};

/* Cuenta rápida: cuántos temas hay y cuántos están hechos */
function estadoCurriculo(){
  const hechos = (typeof TEMAS !== "undefined" ? TEMAS : []).filter(t => t.estado === "listo").map(t => t.id);
  const todos = Object.values(CURRICULO).flat();
  return {total: todos.length, hechos: todos.filter(t => hechos.includes(t.id)).length, lista: todos, hechosIds: hechos};
}
