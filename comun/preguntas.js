/* preguntas.js — EL BANCO. Aquí van las preguntas de todos los temas.
   Añadir un tema = añadir sus preguntas aquí con su "tema", y ya entran en el repaso.

   Reglas al escribir una pregunta:
   - cada opción mala lleva su "porque": el error típico que la hace parecer buena
   - "porque" de la pregunta explica la buena en una frase
   - id único y estable: si lo cambias, se pierde el progreso de esa pregunta        */

const BANCO = [
  /* ─── Matemáticas · función cuadrática ─── */
  { id:"cuad-01", tema:"mates-funcion-cuadratica", etiqueta:"Parábola · forma",
    enunciado:"En $y = ax^2 + bx + c$, ¿qué pasa si $a$ es negativo?",
    opciones:[
      {texto:"Las ramas van hacia abajo", bien:true},
      {texto:"La parábola se desplaza a la izquierda", porque:"Mover la parábola de lado es cosa de $b$, no del signo de $a$."},
      {texto:"Corta al eje Y por debajo del origen", porque:"El corte con el eje Y lo decide $c$: es el punto $(0,c)$."},
      {texto:"Deja de ser una parábola", porque:"Sigue siendo parábola mientras $a \\neq 0$; solo se da la vuelta."}],
    porque:"El signo de $a$ decide hacia dónde abre: positivo hacia arriba, negativo hacia abajo." },

  { id:"cuad-02", tema:"mates-funcion-cuadratica", etiqueta:"Parábola · vértice",
    enunciado:"¿Cuál es la abscisa del vértice de $y = 2x^2 - 8x + 1$?",
    opciones:[
      {texto:"$x = 2$", bien:true},
      {texto:"$x = -2$", porque:"Te ha faltado el signo menos de la fórmula: es $-b/2a$, y $b$ ya es negativo."},
      {texto:"$x = 4$", porque:"Eso es $-b/a$. Falta dividir entre 2."},
      {texto:"$x = 8$", porque:"Ese es el valor de $-b$, sin dividir."}],
    porque:"$x_v = \\dfrac{-b}{2a} = \\dfrac{8}{4} = 2$." },

  { id:"cuad-03", tema:"mates-funcion-cuadratica", etiqueta:"Parábola · cortes",
    enunciado:"Si el discriminante $b^2-4ac$ es negativo, la parábola…",
    opciones:[
      {texto:"No corta al eje X", bien:true},
      {texto:"Corta al eje X en un punto", porque:"Eso pasa cuando el discriminante es exactamente cero."},
      {texto:"Corta al eje X en dos puntos", porque:"Eso pasa cuando el discriminante es positivo."},
      {texto:"No corta al eje Y", porque:"Al eje Y siempre corta, en $(0,c)$: es una función."}],
    porque:"Sin raíces reales no hay cortes con el eje X; la parábola queda entera por encima o por debajo." },

  { id:"cuad-04", tema:"mates-funcion-cuadratica", etiqueta:"Problema",
    enunciado:"Tiras una pelota y su altura es $h(t) = -5t^2 + 20t$. ¿Cuándo alcanza la altura máxima?",
    opciones:[
      {texto:"A los 2 segundos", bien:true},
      {texto:"A los 4 segundos", porque:"A los 4 s la pelota ya está en el suelo: ahí $h=0$."},
      {texto:"A los 20 segundos", porque:"Has usado el coeficiente $b$ como si fuera el tiempo."},
      {texto:"A los 5 segundos", porque:"Has usado el 5 de $-5t^2$, que es la gravedad, no el tiempo."}],
    porque:"El máximo está en el vértice: $t = -b/2a = -20/(-10) = 2$ s." },


  /* ─── Matemáticas · radicales ─── */
  { id:"rad-01", tema:"mates-radicales", etiqueta:"Radicales · qué es",
    enunciado:"$\\sqrt[3]{8}$ vale…",
    opciones:[{texto:"$2$", bien:true},
      {texto:"$4$", porque:"Has dividido 8 entre 2. La raíz cúbica pregunta qué número por sí mismo tres veces da 8."},
      {texto:"$2{,}83$", porque:"Eso es $\\sqrt{8}$, la raíz cuadrada. El indice 3 cambia la pregunta."},
      {texto:"$24$", porque:"Has multiplicado. La raíz deshace la potencia, no la crea."}],
    porque:"Porque $2^3 = 8$. La raíz de índice 3 busca el número que elevado a 3 da el radicando." },

  { id:"rad-02", tema:"mates-radicales", etiqueta:"Radicales · existencia",
    enunciado:"¿Cuál de estas NO existe en los números reales?",
    opciones:[{texto:"$\\sqrt{-16}$", bien:true},
      {texto:"$\\sqrt[3]{-8}$", porque:"Sí existe: vale $-2$, porque $(-2)^3=-8$. Con índice impar sí se puede."},
      {texto:"$-\\sqrt{16}$", porque:"Sí existe: es $-4$. El signo menos está fuera, no dentro."},
      {texto:"$\\sqrt{0}$", porque:"Existe y vale 0."}],
    porque:"Con índice par el radicando no puede ser negativo: ningún número al cuadrado da negativo." },

  { id:"rad-03", tema:"mates-radicales", etiqueta:"Radicales · exponente fraccionario",
    enunciado:"$\\sqrt[5]{x^3}$ escrito como potencia es…",
    opciones:[{texto:"$x^{3/5}$", bien:true},
      {texto:"$x^{5/3}$", porque:"Los has puesto al revés: el índice va abajo, el exponente arriba."},
      {texto:"$x^{15}$", porque:"Has multiplicado. La raíz divide el exponente, no lo multiplica."},
      {texto:"$x^{-3/5}$", porque:"El signo negativo sería para una fracción, no para una raíz."}],
    porque:"Regla: $\\sqrt[n]{x^m} = x^{m/n}$. El índice va al denominador." },

  { id:"rad-04", tema:"mates-radicales", etiqueta:"Radicales · simplificar",
    enunciado:"$\\sqrt{72}$ simplificado es…",
    opciones:[{texto:"$6\\sqrt{2}$", bien:true},
      {texto:"$2\\sqrt{18}$", porque:"Vas bien pero no has acabado: dentro de 18 todavía queda un cuadrado, el 9."},
      {texto:"$8\\sqrt{3}$", porque:"Comprueba: $8^2 \\cdot 3 = 192$, no 72."},
      {texto:"$36\\sqrt{2}$", porque:"Has sacado el 36 sin hacerle la raíz. Sale 6, no 36."}],
    porque:"$72 = 36 \\cdot 2$, y $\\sqrt{36}=6$, así que queda $6\\sqrt{2}$." },

  { id:"rad-05", tema:"mates-radicales", etiqueta:"Radicales · sumar",
    enunciado:"$3\\sqrt{5} + 2\\sqrt{5}$ es…",
    opciones:[{texto:"$5\\sqrt{5}$", bien:true},
      {texto:"$5\\sqrt{10}$", porque:"Al sumar no se tocan los radicandos: el $\\sqrt5$ se queda igual, como la x en $3x+2x$."},
      {texto:"$6\\sqrt{5}$", porque:"Has multiplicado los números de delante en vez de sumarlos."},
      {texto:"$\\sqrt{5}$", porque:"Te has comido los coeficientes: hay 3 más 2."}],
    porque:"Son radicales semejantes: se suman los de delante, la raíz se queda. $3\\sqrt5+2\\sqrt5=5\\sqrt5$." },

  { id:"rad-06", tema:"mates-radicales", etiqueta:"Radicales · sumar",
    enunciado:"$\\sqrt{2} + \\sqrt{3}$ es igual a…",
    opciones:[{texto:"No se puede simplificar más", bien:true},
      {texto:"$\\sqrt{5}$", porque:"Este es EL error clásico: la raíz de una suma no es la suma de las raíces. Compruébalo: $\\sqrt2+\\sqrt3 \\approx 3{,}15$ pero $\\sqrt5 \\approx 2{,}24$."},
      {texto:"$\\sqrt{6}$", porque:"Eso sería el producto $\\sqrt2 \\cdot \\sqrt3$, no la suma."},
      {texto:"$2\\sqrt{2{,}5}$", porque:"No existe esa regla: no se puede promediar dentro de la raíz."}],
    porque:"Solo se suman radicales semejantes (misma raíz). $\\sqrt2$ y $\\sqrt3$ no lo son: se queda así." },

  { id:"rad-07", tema:"mates-radicales", etiqueta:"Radicales · multiplicar",
    enunciado:"$\\sqrt{3} \\cdot \\sqrt{12}$ vale…",
    opciones:[{texto:"$6$", bien:true},
      {texto:"$\\sqrt{15}$", porque:"Has sumado los radicandos. Al multiplicar raíces del mismo índice, se multiplican: $3 \\cdot 12$."},
      {texto:"$36$", porque:"Te ha faltado la raíz final: $\\sqrt{36}=6$, no 36."},
      {texto:"$2\\sqrt{3}$", porque:"Comprueba el resultado: $2\\sqrt3 \\approx 3{,}46$, y $\\sqrt3 \\cdot \\sqrt{12} = 6$."}],
    porque:"$\\sqrt3 \\cdot \\sqrt{12} = \\sqrt{36} = 6$. Mismo índice: se multiplica dentro." },

  { id:"rad-08", tema:"mates-radicales", etiqueta:"Radicales · meter dentro",
    enunciado:"$3\\sqrt{2}$ metido todo dentro de la raíz es…",
    opciones:[{texto:"$\\sqrt{18}$", bien:true},
      {texto:"$\\sqrt{6}$", porque:"Has metido el 3 sin elevarlo al cuadrado. Para entrar en una raíz cuadrada hay que elevarlo."},
      {texto:"$\\sqrt{5}$", porque:"Has sumado. Meter dentro es multiplicar por el cuadrado."},
      {texto:"$\\sqrt{9}$", porque:"Te has dejado el 2 fuera: hay que multiplicar $9 \\cdot 2$."}],
    porque:"El 3 entra elevado al cuadrado: $3\\sqrt2 = \\sqrt{3^2 \\cdot 2} = \\sqrt{18}$." },

  { id:"rad-09", tema:"mates-radicales", etiqueta:"Radicales · racionalizar",
    enunciado:"Racionaliza $\\dfrac{6}{\\sqrt{3}}$:",
    opciones:[{texto:"$2\\sqrt{3}$", bien:true},
      {texto:"$\\dfrac{6\\sqrt{3}}{3}$", porque:"Es correcto pero a medias: 6 entre 3 son 2. Hay que terminar de simplificar."},
      {texto:"$6\\sqrt{3}$", porque:"Te has dejado el denominador: al multiplicar por $\\sqrt3$ abajo queda 3."},
      {texto:"$\\dfrac{\\sqrt{3}}{2}$", porque:"Has puesto la división al revés."}],
    porque:"Multiplicas arriba y abajo por $\\sqrt3$: $\\dfrac{6\\sqrt3}{3} = 2\\sqrt3$." },

  { id:"rad-10", tema:"mates-radicales", etiqueta:"Radicales · racionalizar",
    enunciado:"Para racionalizar $\\dfrac{1}{\\sqrt{5}-2}$ hay que multiplicar arriba y abajo por…",
    opciones:[{texto:"$\\sqrt{5}+2$", bien:true},
      {texto:"$\\sqrt{5}-2$", porque:"Eso deja $(\\sqrt5-2)^2$ abajo, que todavía tiene raíz. Hay que cambiar el signo."},
      {texto:"$\\sqrt{5}$", porque:"Abajo quedaría $5-2\\sqrt5$: sigue habiendo raíz."},
      {texto:"$2$", porque:"Multiplicar por un número no quita la raíz del denominador."}],
    porque:"Se usa el conjugado: $(\\sqrt5-2)(\\sqrt5+2) = 5-4 = 1$, y desaparece la raíz." },

  { id:"rad-11", tema:"mates-radicales", etiqueta:"Radicales · potencia",
    enunciado:"$(\\sqrt{7})^2$ vale…",
    opciones:[{texto:"$7$", bien:true},
      {texto:"$49$", porque:"Has elevado el 7 al cuadrado. La raíz y el cuadrado se anulan entre sí."},
      {texto:"$\\sqrt{14}$", porque:"Elevar al cuadrado no es multiplicar el radicando por 2."},
      {texto:"$14$", porque:"Has multiplicado por 2 en vez de deshacer la raíz."}],
    porque:"La raíz cuadrada y el cuadrado son operaciones inversas: se cancelan." },

  { id:"rad-12", tema:"mates-radicales", etiqueta:"Radicales · comparar",
    enunciado:"¿Cuál es mayor, $2\\sqrt{3}$ o $3\\sqrt{2}$?",
    opciones:[{texto:"$3\\sqrt{2}$", bien:true},
      {texto:"$2\\sqrt{3}$", porque:"Mételos dentro para compararlos: $\\sqrt{12}$ contra $\\sqrt{18}$."},
      {texto:"Son iguales", porque:"No lo son: 3,46 frente a 4,24."},
      {texto:"No se pueden comparar", porque:"Sí se puede: metiendo los números dentro de la raíz."}],
    porque:"$2\\sqrt3=\\sqrt{12}$ y $3\\sqrt2=\\sqrt{18}$. Como $18>12$, gana $3\\sqrt2$." },

  { id:"rad-13", tema:"mates-radicales", etiqueta:"Radicales · problema",
    enunciado:"Un cuadrado tiene 50 cm² de área. ¿Cuánto mide su lado?",
    opciones:[{texto:"$5\\sqrt{2}$ cm", bien:true},
      {texto:"$25$ cm", porque:"Has dividido el área entre 2. El lado sale de la raíz del área."},
      {texto:"$\\sqrt{50}$ cm, y no se puede simplificar", porque:"Sí se puede: $50 = 25 \\cdot 2$."},
      {texto:"$12{,}5$ cm", porque:"Has dividido entre 4, como si fuera el perímetro."}],
    porque:"Lado $=\\sqrt{50}=\\sqrt{25 \\cdot 2}=5\\sqrt2 \\approx 7{,}07$ cm." },

  { id:"rad-14", tema:"mates-radicales", etiqueta:"Radicales · índices distintos",
    enunciado:"Para multiplicar $\\sqrt{2} \\cdot \\sqrt[3]{2}$ lo primero es…",
    opciones:[{texto:"Poner las dos con el mismo índice (6)", bien:true},
      {texto:"Multiplicar 2 por 2 directamente", porque:"Solo se puede multiplicar dentro si el índice es el mismo."},
      {texto:"Sumar los índices", porque:"No existe esa regla."},
      {texto:"No se puede multiplicar", porque:"Sí se puede, igualando índices con el mínimo común múltiplo."}],
    porque:"m.c.m.(2,3)=6: queda $\\sqrt[6]{2^3} \\cdot \\sqrt[6]{2^2} = \\sqrt[6]{32}$." },

  /* ─── Matemáticas · sistemas de ecuaciones (para que el repaso mezcle temas) ─── */
  { id:"sist-01", tema:"mates-sistemas", etiqueta:"Sistemas",
    enunciado:"Un sistema de dos rectas paralelas distintas tiene…",
    opciones:[
      {texto:"Ninguna solución", bien:true},
      {texto:"Una solución", porque:"Una sola solución es cuando las rectas se cortan en un punto."},
      {texto:"Infinitas soluciones", porque:"Infinitas es cuando son la misma recta escrita de dos formas."},
      {texto:"Dos soluciones", porque:"Dos rectas no pueden cortarse en exactamente dos puntos."}],
    porque:"Paralelas y distintas no se cortan nunca: el sistema es incompatible." },

  /* ─── Física y Química · cinemática ─── */
  { id:"cine-01", tema:"fyq-cinematica", etiqueta:"Cinemática",
    enunciado:"En un movimiento rectilíneo uniforme (MRU), la gráfica posición-tiempo es…",
    opciones:[
      {texto:"Una recta con pendiente constante", bien:true},
      {texto:"Una parábola", porque:"La parábola aparece cuando hay aceleración (MRUA), no en el MRU."},
      {texto:"Una recta horizontal", porque:"Horizontal significaría que no se mueve: la posición no cambia."},
      {texto:"Una curva que se aplana", porque:"Eso sería ir frenando, y en MRU la velocidad no cambia."}],
    porque:"Si la velocidad es constante, la posición crece a ritmo fijo: una recta, y su pendiente es la velocidad." },
];
