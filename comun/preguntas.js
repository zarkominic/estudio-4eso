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
