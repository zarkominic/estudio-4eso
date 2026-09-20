# ESTÁNDAR DE UN TEMA

Esto es el contrato. Con este fichero y `comun/curriculo.js`, para pedir un tema nuevo
basta con decir su **id**:

> «haz mat-b-trigonometria»

y sale completo, sin más instrucciones. Si algo de aquí no se cumple, el tema no está
terminado.

---

## 1. Las tres capas, siempre

| capa | dónde | para qué |
|---|---|---|
| **Teoría** | `temas/<id>/index.html` | entender |
| **Taller** | generadores en `comun/ejercicios.js` | practicar hasta dominar |
| **Repaso** | preguntas en `comun/preguntas.js` | que no se olvide |

## 2. Mínimos que debe cumplir

- **8 a 12 secciones `<h2>`** (el índice lateral se arma solo con ellas).
- **Al menos un interactivo** pegado a la idea que explica, no de adorno.
- **6 a 8 generadores de ejercicios**, uno por destreza del tema.
- **12 a 16 preguntas** en el banco.
- **Un ejemplo resuelto entero** y **otro con huecos**.
- **Una sección «Y esto, ¿para qué?»** con tres usos reales, concretos y con números.
- **Una sección con el error típico** del tema, con el contraejemplo que lo demuestra.
- Los datos de `curriculo.js` mandan: el campo `entra` es el guion de contenidos y
  `generadores` la lista de talleres a escribir.

## 2 bis. El taller según la asignatura

El taller **siempre existe**, pero lo que genera cambia:

| asignatura | qué genera el taller |
|---|---|
| Matemáticas, Física y Química, Tecnología | ejercicios numéricos con solución paso a paso |
| Lengua | oraciones que analizar, palabras que clasificar, textos que corregir |
| Inglés | huecos, transformaciones (*key word*), elegir el tiempo o el modal |
| Historia y Geografía | ordenar cronologías, relacionar causa y consecuencia, leer gráficos |

En todos los casos: **generado, no fijo**, para poder repetirlo sin fin, y con
corrección y explicación inmediatas.

## 3. Reglas pedagógicas, no opcionales

Vienen de los metaanálisis (Dunlosky 2013; Hattie y Donoghue 2021; Rohrer y Taylor 2007).

1. **Pretest**: el tema abre con 2 preguntas *antes* de explicar nada.
2. **Cada opción mala lleva su `porque`**: el error concreto que la hace parecer buena.
   Sin eso, el test enseña a repetir el fallo.
3. **Ejemplos que se vacían**: primero entero, luego con huecos.
4. **La animación va al lado del texto que explica**, nunca antes ni después.
5. **El repaso mezcla temas.** No se hace un test solo de este tema al final: eso ya
   está en «Compruébate», que es práctica inmediata. Lo que consolida es el repaso
   espaciado de `repaso.html`.
6. **Nada de decir solo «mal»**: siempre explicación y pista.

## 3 bis. El tutor de apoyo

Cada tema acaba con un bloque **«¿Sigues sin entenderlo?»** que abre un tutor
conversacional (Gemini en modo Aprendizaje guiado, gratis) con la pregunta ya
escrita y pidiendo explicación paso a paso, no la respuesta.

Es deliberado: nuestro material tiene el temario, el taller y el repaso espaciado,
que es lo que un chat no puede dar porque no guarda el progreso. Lo que no tiene
es alguien a quien preguntarle «explícamelo de otra forma» a las once de la noche.
Cada cosa cubre el hueco de la otra.

Lo añade `tutorDeApoyo(titulo, asignatura, donde)` de `comun/app.js`, y la barra
de arriba usa el mismo motor con `barraTutor()`.

**Cómo se pasa la pregunta, y por qué así**: Gemini **no admite precargar el texto
por la URL** (ignora `?q=`), y «Learn About», que sí lo haría, solo funciona en
Estados Unidos y en inglés. Así que la pregunta **se copia al portapapeles** y se
avisa al alumno de que la pegue. Es lo único que funciona siempre.

## 4. Tono

- Español de España, vocabulario de instituto, tuteando.
- Frases cortas. Como se lo explicarías a alguien en la cocina.
- Nada de «es trivial», «basta con ver» ni «simplemente». Si se atasca no es culpa suya.
- Los errores se nombran sin dramatizar: «este fallo tira exámenes enteros» vale;
  «es facilísimo» no.

## 5. Reglas técnicas

- **Móvil primero**: botones de 48 px, todo en color desde el principio (sin `hover`
  para nada esencial), una columna bajo 1000 px.
- **Sin dependencias que instalar.** Solo KaTeX (fórmulas) y JSXGraph (geometría), por CDN.
- **El progreso vive en el navegador** (`localStorage`). Sin cuentas ni servidor:
  lo usan menores.
- **Ids estables**: `rad-01`, `trig-01`… Si se cambia un id, se pierde el progreso.
- Las respuestas del taller se admiten en varias formas: `5√3`, `5r3`, `5 raiz 3`.
- **Enunciados de letras**: en Lengua, Historia o Inglés el generador marca
  `textoPlano: true` y el enunciado va en HTML. Si se pasa por el motor de fórmulas,
  sale el código a la vista.
- **Versión en los ficheros comunes**: todos los `<script src="comun/...js?v=FECHA">`
  llevan versión. Sin eso, el navegador sirve la versión vieja y los cambios no se ven
  (pasó el 20/09 y costó media hora encontrarlo).
- **Concordancia en Lengua**: si el generador arma oraciones, el verbo tiene que
  concordar con el sujeto. Probar con sujetos en plural.

## 6. Pasos para crear el tema

1. `cp -r plantilla temas/<id>`
2. Escribir la teoría siguiendo el campo `entra` de `curriculo.js`.
3. Escribir los generadores en `comun/ejercicios.js` (los de `generadores`) y
   **probarlos generando 300 de cada uno**: ni un `NaN`, ni una respuesta vacía.
4. Escribir 12-16 preguntas en `comun/preguntas.js` con `tema: "<id>"`.
5. Añadir el tema a `comun/temas.js` con `estado: "listo"`.
6. Comprobar: que la página parsea, que el JS compila, y **verla a 1440 y a 390 px**.

## 7. Lo que NO se hace

- Temas sin taller. Un tema solo con teoría y test no cumple el estándar.
- Ejercicios fijos: los del taller **se generan**, para que se puedan repetir sin fin.
- Gamificación por puntos, insignias o rachas competitivas entre amigos. La única
  racha que hay es contra uno mismo, dentro de un bloque.
- Pedir datos personales. Nunca, para nada.
