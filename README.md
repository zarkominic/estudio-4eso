# estudio-4eso

Material de 4º ESO para Novak y sus amigos. Dos cosas separadas a propósito:

- **Aprender** (`temas/`): la teoría explicada, con algo que se toca al lado de cada idea.
- **Repasar** (`repaso.html`): preguntas mezcladas de todos los temas, repartidas en el tiempo.

## Por qué está hecho así

No es estética. De los metaanálisis grandes (Dunlosky 2013; Hattie y Donoghue 2021,
sobre 242 estudios) salen dos técnicas de utilidad alta y el resto muy por detrás:
**ponerse a prueba** y **espaciar en el tiempo**. Subrayar y releer son de utilidad baja.

De ahí las decisiones que verás:

- **El repaso es diario y mezcla temas.** Mezclar tipos de problema (interleaving) subió
  de 38 % a 61 % la nota en un examen retrasado de matemáticas de secundaria
  (Rohrer y Taylor, 2007). Se siente peor mientras se hace y rinde más después.
- **Cada pregunta explica por qué falla la que elegiste.** Sin eso, el test enseña a
  repetir el error.
- **Cada tema empieza con una pregunta antes de explicar nada** (pretest).
- **Los ejemplos se van vaciando**: el primero entero, el siguiente con huecos.
- **La animación va pegada al texto que explica**, no antes ni después (doble codificación).
- **Botones de 48 px y todo en color desde el principio**: lo van a abrir en el móvil,
  y en el móvil no existe pasar el ratón por encima.

## Añadir un tema

1. `cp -r plantilla temas/mi-tema` y rellena los corchetes.
2. Añade el tema a `comun/temas.js` (`estado: "listo"` cuando esté).
3. Añade sus preguntas a `comun/preguntas.js` con `tema: "mi-tema"`.

Eso es todo: entra solo en la portada y en el repaso diario.

## Progreso

Se guarda en el navegador de cada uno (`localStorage`), con cajas tipo Leitner: si
aciertas, la pregunta tarda más en volver (1, 2, 4, 8, 16, 32 días); si fallas,
vuelve mañana. **Sin cuentas, sin servidor y sin datos de menores en ninguna parte.**

## Lo que se usa

- **JSXGraph** (MIT) para geometría y funciones que se tocan. Hecho por una universidad para enseñar.
- **KaTeX** para las fórmulas: instantáneo y ligero.
- Nada más. Sin dependencias que instalar.
