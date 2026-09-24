/* ejercicios-compuesta.js — la oración compuesta.

   En Lengua los generadores no inventan frases: eligen de un banco revisado a
   mano. Inventarlas por combinación rompe la concordancia y el sentido, y una
   oración mal construida enseña lo contrario de lo que se quiere.
   Cada oración lleva su clase, su nexo y la explicación. */
(function(){

const ORACIONES = [
  // yuxtapuestas
  {o:"Llegué tarde; el tren ya había salido.", clase:"yuxtapuesta", nexo:"", por:"Dos oraciones unidas solo por el punto y coma, sin ninguna palabra que las enlace."},
  {o:"Hacía frío, nadie salió al patio.", clase:"yuxtapuesta", nexo:"", por:"Solo una coma entre las dos oraciones: no hay nexo."},
  {o:"Estudia mucho: mañana tiene el examen.", clase:"yuxtapuesta", nexo:"", por:"Los dos puntos separan dos oraciones completas sin nexo."},
  // coordinadas
  {o:"Marta estudia medicina y su hermano trabaja en un taller.", clase:"copulativa", nexo:"y", por:"«y» suma dos oraciones del mismo nivel: coordinada copulativa."},
  {o:"Ni come ni deja comer.", clase:"copulativa", nexo:"ni", por:"«ni… ni» suma dos negaciones: copulativa."},
  {o:"Quería ir al concierto, pero no quedaban entradas.", clase:"adversativa", nexo:"pero", por:"«pero» contrapone la segunda idea a la primera: adversativa."},
  {o:"No lo hizo él, sino que lo hizo su prima.", clase:"adversativa", nexo:"sino que", por:"«sino que» corrige lo anterior: adversativa exclusiva."},
  {o:"El examen era largo; sin embargo, lo terminó a tiempo.", clase:"adversativa", nexo:"sin embargo", por:"«sin embargo» opone las dos ideas: adversativa."},
  {o:"¿Vienes con nosotros o te quedas en casa?", clase:"disyuntiva", nexo:"o", por:"«o» presenta dos opciones que se excluyen: disyuntiva."},
  {o:"O apruebas en junio o vas a septiembre.", clase:"disyuntiva", nexo:"o", por:"«o… o» ofrece alternativas: disyuntiva."},
  // subordinadas sustantivas
  {o:"Me alegra que hayas venido.", clase:"sustantiva", nexo:"que", funcion:"sujeto", por:"«que hayas venido» es lo que alegra: funciona como sujeto. Se puede cambiar por «eso»: «Me alegra eso»."},
  {o:"Dijo que llegaría a las ocho.", clase:"sustantiva", nexo:"que", funcion:"complemento directo", por:"«Lo dijo»: se sustituye por «lo», así que es complemento directo."},
  {o:"No sé si vendrá mañana.", clase:"sustantiva", nexo:"si", funcion:"complemento directo", por:"«No lo sé»: interrogativa indirecta que funciona como complemento directo."},
  {o:"Me acuerdo de que llovía mucho.", clase:"sustantiva", nexo:"que", funcion:"complemento de régimen", por:"«acordarse de algo» pide preposición: complemento de régimen."},
  {o:"Es importante que descanses.", clase:"sustantiva", nexo:"que", funcion:"sujeto", por:"¿Qué es importante? Que descanses: es el sujeto."},
  // subordinadas adjetivas (de relativo)
  {o:"El libro que me prestaste es buenísimo.", clase:"adjetiva", nexo:"que", por:"«que me prestaste» dice cómo es el libro, como un adjetivo. «que» es pronombre relativo: se refiere a «libro»."},
  {o:"La ciudad donde nací está en la costa.", clase:"adjetiva", nexo:"donde", por:"«donde nací» complementa a «la ciudad»: relativa, con «donde» como adverbio relativo."},
  {o:"Los alumnos que aprobaron irán de excursión.", clase:"adjetiva", nexo:"que", por:"Especifica qué alumnos: los que aprobaron. Funciona como un adjetivo del sustantivo."},
  {o:"El chico con quien hablaste es mi primo.", clase:"adjetiva", nexo:"quien", por:"«con quien hablaste» complementa a «el chico»: relativa."},
  // subordinadas adverbiales
  {o:"Cuando llegues, llámame.", clase:"adverbial", nexo:"cuando", tipo:"temporal", por:"«cuando» sitúa la acción en el tiempo: temporal."},
  {o:"No fui porque estaba enfermo.", clase:"adverbial", nexo:"porque", tipo:"causal", por:"«porque» da la causa: causal."},
  {o:"Si estudias, aprobarás.", clase:"adverbial", nexo:"si", tipo:"condicional", por:"«si» pone una condición: condicional."},
  {o:"Estudia para que te vaya bien.", clase:"adverbial", nexo:"para que", tipo:"final", por:"«para que» indica la finalidad: final."},
  {o:"Aunque llueva, iremos a la playa.", clase:"adverbial", nexo:"aunque", tipo:"concesiva", por:"«aunque» presenta un obstáculo que no impide la acción: concesiva."},
  {o:"Corrió tanto que se quedó sin aire.", clase:"adverbial", nexo:"que", tipo:"consecutiva", por:"«tanto… que» expresa una consecuencia: consecutiva."},
  {o:"Hazlo como te enseñé.", clase:"adverbial", nexo:"como", tipo:"modal", por:"«como te enseñé» dice de qué manera: modal."},
];

const NOMBRE = {yuxtapuesta:"yuxtapuesta", copulativa:"coordinada copulativa", adversativa:"coordinada adversativa",
  disyuntiva:"coordinada disyuntiva", sustantiva:"subordinada sustantiva", adjetiva:"subordinada adjetiva", adverbial:"subordinada adverbial"};

Object.assign(EJERCICIOS, {

  clasificarCompuesta: {
    titulo: "¿Qué tipo de oración compuesta?",
    genera(){
      const e = elige(ORACIONES);
      const esCoord = ["copulativa", "adversativa", "disyuntiva"].includes(e.clase);
      return {textoPlano: true,
        enunciado: `«${e.o}»<br><span class="mini">Escribe: yuxtapuesta, copulativa, adversativa, disyuntiva, sustantiva, adjetiva o adverbial</span>`,
        respuesta: e.clase,
        respuestaAlt: [NOMBRE[e.clase], e.clase === "adjetiva" ? "de relativo" : "", e.clase === "adjetiva" ? "relativa" : ""].filter(Boolean),
        pista: e.nexo ? `Fíjate en «${e.nexo}»: ¿une dos oraciones iguales o mete una dentro de la otra?` : "¿Hay alguna palabra que una las dos oraciones, o solo un signo de puntuación?",
        pasos: [e.nexo ? `El nexo es <b>«${e.nexo}»</b>.` : "No hay nexo: solo puntuación.",
          esCoord ? "Las dos oraciones están al mismo nivel: ninguna depende de la otra → <b>coordinada</b>." :
          e.clase === "yuxtapuesta" ? "" : "Una oración está metida dentro de la otra y hace una función → <b>subordinada</b>.",
          e.por, `Es <b>${NOMBRE[e.clase]}</b>.`].filter(Boolean)};
    }},

  identificarNexo: {
    titulo: "Encuentra el nexo",
    genera(){
      const e = elige(ORACIONES.filter(x => x.nexo));
      return {textoPlano: true,
        enunciado: `«${e.o}»<br><span class="mini">¿Cuál es el nexo que une las dos oraciones?</span>`,
        respuesta: e.nexo,
        pista: "Busca la palabra (o palabras) que engancha una oración con la otra. Puede ser más de una: «para que», «sin embargo».",
        pasos: [`Dos verbos, dos oraciones. Lo que las une es <b>«${e.nexo}»</b>.`, e.por]};
    }},

  funcionSubordinada: {
    titulo: "¿Qué función o tipo?",
    genera(){
      const e = elige(ORACIONES.filter(x => x.funcion || x.tipo));
      if (e.funcion) return {textoPlano: true,
        enunciado: `«${e.o}»<br><span class="mini">La subordinada sustantiva, ¿qué función hace? (sujeto, complemento directo, complemento de régimen…)</span>`,
        respuesta: e.funcion,
        respuestaAlt: [{"complemento directo":"cd", "complemento de régimen":"cr", "sujeto":"suj"}[e.funcion],
          e.funcion === "complemento de régimen" ? "suplemento" : ""].filter(Boolean),
        pista: "Sustituye la subordinada por «eso» o «lo» y analiza la oración simple que te queda.",
        pasos: ["Truco: cambia la subordinada entera por <b>«eso»</b> o por <b>«lo»</b>.", e.por, `Función: <b>${e.funcion}</b>.`]};
      return {textoPlano: true,
        enunciado: `«${e.o}»<br><span class="mini">¿De qué tipo es la subordinada adverbial? (temporal, causal, condicional, final, concesiva, consecutiva, modal…)</span>`,
        respuesta: e.tipo,
        pista: `El nexo «${e.nexo}» casi siempre lo delata. Pregúntate: ¿cuándo?, ¿por qué?, ¿con qué condición?, ¿para qué?`,
        pasos: [`Nexo: <b>«${e.nexo}»</b>.`, e.por, `Tipo: <b>${e.tipo}</b>.`]};
    }},

  coordinadaOSubordinada: {
    titulo: "¿Coordinada o subordinada?",
    genera(){
      const e = elige(ORACIONES.filter(x => x.clase !== "yuxtapuesta"));
      const r = ["copulativa", "adversativa", "disyuntiva"].includes(e.clase) ? "coordinada" : "subordinada";
      return {textoPlano: true,
        enunciado: `«${e.o}»<br><span class="mini">¿Coordinada o subordinada?</span>`,
        respuesta: r,
        pista: "Prueba a quitar una de las dos oraciones. Si la otra se sostiene sola y ninguna hace de complemento, es coordinada.",
        pasos: [r === "coordinada" ? "Las dos oraciones podrían ir solas y están al mismo nivel." :
          "Una de las oraciones hace de sujeto, complemento o adjetivo de la otra: depende de ella.", e.por, `<b>${r}</b>.`]};
    }},
});
})();
