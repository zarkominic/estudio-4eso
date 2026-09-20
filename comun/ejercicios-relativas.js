/* ejercicios-relativas.js — relative clauses. */

Object.assign(EJERCICIOS, {

  elegirRelativo: {
    titulo: "¿Qué relativo va?",
    genera(){
      const casos = [
        {f:"The man ____ lives next door is a doctor.", r:"who", ex:"Persona: <b>who</b> (o «that»)."},
        {f:"The book ____ I bought is great.", r:"which", ex:"Cosa: <b>which</b> (o «that»). Y aquí se podría omitir, porque es complemento."},
        {f:"That's the girl ____ father is a pilot.", r:"whose", ex:"Posesión: <b>whose</b>. Sustituye a «her father»."},
        {f:"This is the house ____ I was born.", r:"where", ex:"Lugar: <b>where</b>."},
        {f:"I remember the day ____ we met.", r:"when", ex:"Tiempo: <b>when</b>."},
        {f:"The car ____ engine broke down was old.", r:"whose", ex:"Posesión, también con cosas: <b>whose</b> engine."},
        {f:"The people ____ came were friendly.", r:"who", ex:"Personas haciendo la acción: <b>who</b>."},
        {f:"The reason ____ he left is unclear.", r:"why", ex:"Causa: <b>why</b>."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<b>${c.f}</b><br><span class="mini">Escribe el relativo (who, which, whose, where, when, why)</span>`,
        respuesta: c.r,
        pista: "¿Habla de una persona, una cosa, una posesión, un lugar, un momento o una causa?",
        pasos: [c.ex, `Queda: <b>${c.f.replace("____", c.r)}</b>`]};
    }},

  seOmite: {
    titulo: "¿Se puede quitar el relativo?",
    genera(){
      const casos = [
        {f:"The book that I read was long.", r:"si", ex:"«That» es el complemento (yo leí el libro): <b>se puede quitar</b>. «The book I read was long»."},
        {f:"The man who called you is here.", r:"no", ex:"«Who» es el sujeto (él llamó): <b>no se puede quitar</b>."},
        {f:"The film which we saw was boring.", r:"si", ex:"Complemento: nosotros vimos la película. Se puede quitar."},
        {f:"The girl who lives here is Ana.", r:"no", ex:"Sujeto: ella vive. No se puede quitar."},
        {f:"The car that he bought is red.", r:"si", ex:"Complemento: él compró el coche. Se puede quitar."},
        {f:"The bus that goes to the centre is the 25.", r:"no", ex:"Sujeto: el autobús va. No se puede quitar."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<b>${c.f}</b><br><span class="mini">¿Se puede omitir el relativo? Responde «sí» o «no»</span>`,
        respuesta: c.r,
        pista: "Mira qué hay justo detrás del relativo: si es un sujeto (I, he, we…), se puede quitar. Si va un verbo, no.",
        pasos: [c.ex,
          `<b>La regla:</b> si detrás del relativo hay otro sujeto, el relativo es complemento y se puede quitar. Si detrás va directamente el verbo, el relativo es el sujeto y se queda.`]};
    }},

  definingONo: {
    titulo: "¿Lleva comas?",
    genera(){
      const casos = [
        {f:"My brother ____ lives in Paris ____ is a chef. (solo tengo un hermano)", r:"si", ex:"Si solo tienes un hermano, la información es extra: <b>lleva comas</b> y se usa «who», nunca «that»."},
        {f:"The students ____ passed the exam ____ can go home. (solo algunos aprobaron)", r:"no", ex:"Distingue a unos estudiantes de otros: es información necesaria, <b>sin comas</b>."},
        {f:"Madrid ____ is the capital of Spain ____ has 3 million people.", r:"si", ex:"Solo hay un Madrid: la información es extra. <b>Con comas</b>."},
        {f:"The car ____ I bought last year ____ is red. (tengo varios coches)", r:"no", ex:"Hace falta para saber de qué coche hablas: <b>sin comas</b>."},
        {f:"Ana ____ works with me ____ is from Peru.", r:"si", ex:"Con nombre propio siempre va entre comas: ya sabemos quién es."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<b>${c.f}</b><br><span class="mini">¿Lleva comas? Responde «sí» o «no»</span>`,
        respuesta: c.r,
        pista: "Pregúntate: si quito esa parte, ¿sigo sabiendo de quién o de qué hablo? Si sí, va entre comas.",
        pasos: [c.ex,
          `Con comas (non-defining) la información es <b>extra</b> y se puede quitar. Sin comas (defining) es <b>necesaria</b> para identificar.`,
          `Y ojo: en las de comas <b>nunca se usa «that»</b> ni se puede omitir el relativo.`]};
    }},

  unirFrases: {
    titulo: "Une las dos frases",
    genera(){
      const casos = [
        {a:"I met a girl.", b:"She speaks five languages.", r:"I met a girl who speaks five languages.", rel:"who", ex:"«She» se sustituye por «who»."},
        {a:"This is the book.", b:"I told you about it.", r:"This is the book I told you about.", rel:"(that)", ex:"El relativo es complemento: se puede omitir, y la preposición se queda al final."},
        {a:"That's the house.", b:"I grew up there.", r:"That's the house where I grew up.", rel:"where", ex:"«There» se sustituye por «where»."},
        {a:"I have a friend.", b:"His father is a pilot.", r:"I have a friend whose father is a pilot.", rel:"whose", ex:"«His» se sustituye por «whose»."},
        {a:"She showed me a photo.", b:"It was taken in Rome.", r:"She showed me a photo which was taken in Rome.", rel:"which", ex:"«It» se sustituye por «which», y es sujeto: no se puede omitir."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<b>${c.a} + ${c.b}</b><br><span class="mini">Únelas con un relativo (escribe la frase entera)</span>`,
        respuesta: c.r,
        pista: `Busca la palabra repetida en la segunda frase y sustitúyela por el relativo que toque.`,
        pasos: [c.ex, `Queda: <b>${c.r}</b>`,
          `El método: localiza qué palabra de la segunda frase se refiere a algo de la primera, y cámbiala por el relativo.`]};
    }},
});
