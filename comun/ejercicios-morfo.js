/* ejercicios-morfo.js — categorías gramaticales.
   El taller da palabras en contexto y pide su categoría, porque fuera de contexto
   muchas palabras no tienen una sola respuesta: «bajo» puede ser cuatro cosas. */

const PALABRAS = [
  {p:"mesa", f:"La <b>mesa</b> es de madera.", c:"sustantivo", ex:"Nombra una cosa y lleva determinante delante."},
  {p:"rápido", f:"Es un coche <b>rápido</b>.", c:"adjetivo", ex:"Dice cómo es el sustantivo «coche» y concuerda con él."},
  {p:"rápidamente", f:"Corrió <b>rápidamente</b>.", c:"adverbio", ex:"Modifica al verbo y es invariable: no tiene femenino ni plural."},
  {p:"el", f:"<b>El</b> perro ladra.", c:"determinante", ex:"Acompaña al sustantivo y lo concreta. Artículo determinado."},
  {p:"mi", f:"<b>Mi</b> hermano llegó.", c:"determinante", ex:"Determinante posesivo: acompaña al sustantivo."},
  {p:"él", f:"<b>Él</b> llegó tarde.", c:"pronombre", ex:"Sustituye al nombre, no lo acompaña. Por eso lleva tilde."},
  {p:"corre", f:"Juan <b>corre</b> mucho.", c:"verbo", ex:"Tiene persona, número y tiempo: es el núcleo del predicado."},
  {p:"de", f:"La casa <b>de</b> piedra.", c:"preposición", ex:"Relaciona dos palabras y no cambia nunca."},
  {p:"pero", f:"Quiero ir, <b>pero</b> no puedo.", c:"conjunción", ex:"Une dos oraciones. Adversativa."},
  {p:"tres", f:"Vinieron <b>tres</b> amigos.", c:"determinante", ex:"Determinante numeral: acompaña al sustantivo diciendo cuántos."},
  {p:"muy", f:"Está <b>muy</b> cansado.", c:"adverbio", ex:"Modifica al adjetivo «cansado». Adverbio de cantidad."},
  {p:"ay", f:"¡<b>Ay</b>, qué susto!", c:"interjección", ex:"Expresa una emoción y va sola, entre exclamaciones."},
  {p:"ese", f:"<b>Ese</b> libro es mío.", c:"determinante", ex:"Demostrativo que acompaña. Si dijera «ese es mío», sería pronombre."},
  {p:"nosotros", f:"<b>Nosotros</b> ganamos.", c:"pronombre", ex:"Pronombre personal: ocupa el lugar del nombre."},
  {p:"sin", f:"Café <b>sin</b> azúcar.", c:"preposición", ex:"Invariable y relaciona: preposición."},
  {p:"porque", f:"No vino <b>porque</b> llovía.", c:"conjunción", ex:"Une dos oraciones dando la causa."},
];

/* Palabras que cambian de categoría según la frase: lo que más cae en examen */
const CAMBIANTES = [
  {p:"bajo", f:"Vive en el piso <b>bajo</b>.", c:"adjetivo", ex:"Aquí dice cómo es el piso: adjetivo."},
  {p:"bajo", f:"El gato está <b>bajo</b> la mesa.", c:"preposición", ex:"Aquí relaciona «gato» y «mesa»: preposición."},
  {p:"bajo", f:"Habla muy <b>bajo</b>.", c:"adverbio", ex:"Aquí dice cómo habla: adverbio de modo."},
  {p:"mañana", f:"Vendré <b>mañana</b>.", c:"adverbio", ex:"Dice cuándo: adverbio de tiempo."},
  {p:"mañana", f:"La <b>mañana</b> fue fría.", c:"sustantivo", ex:"Lleva determinante y nombra un momento: sustantivo."},
  {p:"que", f:"Dijo <b>que</b> vendría.", c:"conjunción", ex:"Une dos oraciones sin sustituir a nada."},
  {p:"que", f:"El libro <b>que</b> leí.", c:"pronombre", ex:"Sustituye a «el libro»: pronombre relativo."},
  {p:"este", f:"<b>Este</b> coche corre.", c:"determinante", ex:"Acompaña al sustantivo «coche»."},
  {p:"este", f:"<b>Este</b> es el mío.", c:"pronombre", ex:"Va solo, sustituyendo al nombre."},
  {p:"cantante", f:"Es un gran <b>cantante</b>.", c:"sustantivo", ex:"Lleva determinante: nombra a la persona."},
  {p:"una", f:"Vi <b>una</b> película.", c:"determinante", ex:"Artículo indeterminado que acompaña."},
];

const DERIVACION = [
  {base:"pan", der:"panadero", tipo:"derivación", ex:"Se le añade el sufijo -ero a la raíz «pan»."},
  {base:"sol", der:"soleado", tipo:"derivación", ex:"Sufijo -ado sobre «sol»."},
  {base:"hacer", der:"deshacer", tipo:"derivación", ex:"Prefijo des- delante de «hacer»."},
  {base:"abre + latas", der:"abrelatas", tipo:"composición", ex:"Dos palabras que ya existían se juntan en una."},
  {base:"saca + corchos", der:"sacacorchos", tipo:"composición", ex:"Verbo más sustantivo formando una palabra nueva."},
  {base:"boli(grafo)", der:"boli", tipo:"acortamiento", ex:"Se corta la palabra: es un acortamiento."},
  {base:"ORGANIZACIÓN...", der:"ONU", tipo:"sigla", ex:"Se forma con las iniciales."},
  {base:"pequeño", der:"pequeñito", tipo:"derivación", ex:"Sufijo diminutivo -ito."},
];

Object.assign(EJERCICIOS, {

  categoriaPalabra: {
    titulo: "¿Qué categoría es?",
    genera(){
      const c = elige(PALABRAS);
      return {textoPlano: true,
        enunciado: `<b>${c.f}</b><br><span class="mini">¿Qué categoría es «${c.p}»?</span>`,
        respuesta: c.c,
        pista: "Pregúntate: ¿nombra algo, lo acompaña, lo sustituye, dice cómo es, o relaciona?",
        pasos: [`«${c.p}» es <b>${c.c}</b>.`, c.ex,
          `Las nueve categorías: sustantivo, adjetivo, determinante, pronombre, verbo, adverbio, preposición, conjunción e interjección.`]};
    }},

  categoriaEnContexto: {
    titulo: "La misma palabra, distinta categoría",
    genera(){
      const c = elige(CAMBIANTES);
      const otras = CAMBIANTES.filter(x => x.p === c.p && x.c !== c.c);
      return {textoPlano: true,
        enunciado: `<b>${c.f}</b><br><span class="mini">¿Qué categoría es «${c.p}» AQUÍ?</span>`,
        respuesta: c.c,
        pista: "La palabra sola no basta: mira qué hace dentro de esta frase concreta.",
        pasos: [`En esta frase, «${c.p}» es <b>${c.c}</b>.`, c.ex,
          otras.length ? `Pero cuidado: «${c.p}» cambia de categoría según la frase. Por ejemplo: «${otras[0].f.replace(/<\/?b>/g, "")}» → ahí es ${otras[0].c}.`
                       : `La categoría se decide siempre por la función en la frase, no por la palabra suelta.`]};
    }},

  determinanteOPronombre: {
    titulo: "¿Determinante o pronombre?",
    genera(){
      const casos = [
        {f:"<b>Este</b> libro es mío.", r:"determinante", ex:"Va delante del sustantivo «libro»: lo acompaña."},
        {f:"<b>Este</b> es mío.", r:"pronombre", ex:"Va solo: ha sustituido al sustantivo."},
        {f:"Quiero <b>esa</b> camiseta.", r:"determinante", ex:"Acompaña a «camiseta»."},
        {f:"Quiero <b>esa</b>.", r:"pronombre", ex:"No hay sustantivo detrás: va solo."},
        {f:"<b>Mi</b> casa es grande.", r:"determinante", ex:"Posesivo que acompaña a «casa»."},
        {f:"La <b>mía</b> es grande.", r:"pronombre", ex:"Posesivo que va solo, sustituyendo a «casa»."},
        {f:"Vinieron <b>muchos</b> amigos.", r:"determinante", ex:"Indefinido que acompaña a «amigos»."},
        {f:"Vinieron <b>muchos</b>.", r:"pronombre", ex:"Va solo: pronombre indefinido."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<b>${c.f}</b><br><span class="mini">La palabra en negrita, ¿es determinante o pronombre?</span>`,
        respuesta: c.r,
        pista: "La regla es sencilla: si ACOMPAÑA a un sustantivo es determinante; si va SOLO, pronombre.",
        pasos: [c.ex, `Es <b>${c.r}</b>.`,
          `Truco infalible: busca el sustantivo justo detrás. Si está, determinante. Si no, pronombre.`]};
    }},

  formacionPalabras: {
    titulo: "¿Cómo se ha formado?",
    genera(){
      const c = elige(DERIVACION);
      return {textoPlano: true,
        enunciado: `<b>${c.der}</b><br><span class="mini">¿Cómo se ha formado? (derivación, composición, acortamiento o sigla)</span>`,
        respuesta: c.tipo,
        pista: "¿Se le ha añadido algo a una palabra, se han juntado dos, se ha cortado, o son iniciales?",
        pasos: [`Viene de «${c.base}».`, c.ex, `Es <b>${c.tipo}</b>.`]};
    }},
});
