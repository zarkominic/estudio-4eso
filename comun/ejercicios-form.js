/* ejercicios-form.js — formulación inorgánica.
   Este tema es puro entrenamiento: sin repetir cien veces no se aprende.
   Tabla de compuestos con su fórmula y su nombre según la nomenclatura de composición
   (la que usa la IUPAC actual y piden en 4º ESO), con la de stock donde procede. */

const COMPUESTOS = {
  oxidos: [
    {f:"Li2O",  n:"óxido de dilitio",        alt:"óxido de litio",        val:1, el:"litio"},
    {f:"Na2O",  n:"óxido de disodio",        alt:"óxido de sodio",        val:1, el:"sodio"},
    {f:"K2O",   n:"óxido de dipotasio",      alt:"óxido de potasio",      val:1, el:"potasio"},
    {f:"CaO",   n:"óxido de calcio",         alt:"óxido de calcio",       val:2, el:"calcio"},
    {f:"MgO",   n:"óxido de magnesio",       alt:"óxido de magnesio",     val:2, el:"magnesio"},
    {f:"Al2O3", n:"trióxido de dialuminio",  alt:"óxido de aluminio",     val:3, el:"aluminio"},
    {f:"FeO",   n:"óxido de hierro",         alt:"óxido de hierro(II)",   val:2, el:"hierro"},
    {f:"Fe2O3", n:"trióxido de dihierro",    alt:"óxido de hierro(III)",  val:3, el:"hierro"},
    {f:"CO2",   n:"dióxido de carbono",      alt:"dióxido de carbono",    val:4, el:"carbono"},
    {f:"SO2",   n:"dióxido de azufre",       alt:"óxido de azufre(IV)",   val:4, el:"azufre"},
    {f:"SO3",   n:"trióxido de azufre",      alt:"óxido de azufre(VI)",   val:6, el:"azufre"},
    {f:"N2O5",  n:"pentaóxido de dinitrógeno", alt:"óxido de nitrógeno(V)", val:5, el:"nitrógeno"},
  ],
  hidruros: [
    {f:"NaH",  n:"hidruro de sodio",       el:"sodio"},
    {f:"CaH2", n:"dihidruro de calcio",    alt:"hidruro de calcio", el:"calcio"},
    {f:"AlH3", n:"trihidruro de aluminio", alt:"hidruro de aluminio", el:"aluminio"},
    {f:"NH3",  n:"amoniaco",               el:"nitrógeno"},
    {f:"H2O",  n:"agua",                   el:"oxígeno"},
    {f:"CH4",  n:"metano",                 el:"carbono"},
  ],
  hidracidos: [
    {f:"HF",   n:"fluoruro de hidrógeno",  acido:"ácido fluorhídrico"},
    {f:"HCl",  n:"cloruro de hidrógeno",   acido:"ácido clorhídrico"},
    {f:"HBr",  n:"bromuro de hidrógeno",   acido:"ácido bromhídrico"},
    {f:"H2S",  n:"sulfuro de dihidrógeno", acido:"ácido sulfhídrico"},
  ],
  hidroxidos: [
    {f:"NaOH",   n:"hidróxido de sodio"},
    {f:"KOH",    n:"hidróxido de potasio"},
    {f:"Ca(OH)2",n:"dihidróxido de calcio", alt:"hidróxido de calcio"},
    {f:"Mg(OH)2",n:"dihidróxido de magnesio", alt:"hidróxido de magnesio"},
    {f:"Al(OH)3",n:"trihidróxido de aluminio", alt:"hidróxido de aluminio"},
  ],
  sales: [
    {f:"NaCl",  n:"cloruro de sodio"},
    {f:"KBr",   n:"bromuro de potasio"},
    {f:"CaF2",  n:"difluoruro de calcio",  alt:"fluoruro de calcio"},
    {f:"MgCl2", n:"dicloruro de magnesio", alt:"cloruro de magnesio"},
    {f:"Al2S3", n:"trisulfuro de dialuminio", alt:"sulfuro de aluminio"},
    {f:"Na2S",  n:"sulfuro de disodio",    alt:"sulfuro de sodio"},
  ],
};
const TODOS = Object.entries(COMPUESTOS).flatMap(([tipo, l]) => l.map(c => ({...c, tipo})));
const TIPO_ES = {oxidos:"óxido", hidruros:"hidruro", hidracidos:"ácido hidrácido", hidroxidos:"hidróxido", sales:"sal binaria"};

Object.assign(EJERCICIOS, {

  formulaANombre: {
    titulo: "De fórmula a nombre",
    genera(){
      const c = elige(TODOS);
      return {textoPlano: true,
        enunciado: `<b style="font-size:1.4rem">${c.f.replace(/(\d)/g, "<sub>$1</sub>")}</b><br><span class="mini">¿Cómo se llama?</span>`,
        respuesta: c.n,
        respuestaAlt: [c.alt, c.acido].filter(Boolean),   // vale cualquiera de las dos nomenclaturas
        pista: `Es un ${TIPO_ES[c.tipo]}. Los prefijos di-, tri-, tetra- dicen cuántos átomos hay de cada uno.`,
        pasos: [`Es un <b>${TIPO_ES[c.tipo]}</b>.`,
          `Se llama <b>${c.n}</b>${c.alt && c.alt !== c.n ? `, o <b>${c.alt}</b> en nomenclatura de stock` : ""}.`,
          c.acido ? `Disuelto en agua se llama <b>${c.acido}</b>.` :
          `Se nombra de derecha a izquierda: primero el elemento de la derecha con su prefijo, luego «de», luego el de la izquierda.`]};
    }},

  nombreAFormula: {
    titulo: "De nombre a fórmula",
    genera(){
      const c = elige(TODOS);
      const usarAlt = c.alt && c.alt !== c.n && Math.random() < 0.4;
      return {textoPlano: true,
        enunciado: `<b>${usarAlt ? c.alt : c.n}</b><br><span class="mini">Escribe la fórmula (ej: CaO, Al2O3)</span>`,
        respuesta: c.f,
        pista: "Los prefijos te dan directamente los subíndices. Si no hay prefijo, cruza las valencias.",
        pasos: [`Es un <b>${TIPO_ES[c.tipo]}</b>.`,
          `La fórmula es <b>${c.f}</b>.`,
          `Comprobación: las cargas o valencias tienen que cancelarse para que el compuesto sea neutro.`]};
    }},

  numeroOxidacion: {
    titulo: "Número de oxidación",
    genera(){
      const casos = [
        {f:"H2O",   el:"O", r:"-2", porque:"El oxígeno actúa casi siempre con −2, y los dos hidrógenos aportan +1 cada uno."},
        {f:"CO2",   el:"C", r:"+4", porque:"Dos oxígenos a −2 son −4, así que el carbono tiene que ser +4 para que sume cero."},
        {f:"SO3",   el:"S", r:"+6", porque:"Tres oxígenos a −2 son −6: el azufre actúa con +6."},
        {f:"SO2",   el:"S", r:"+4", porque:"Dos oxígenos a −2 son −4: el azufre con +4."},
        {f:"Fe2O3", el:"Fe", r:"+3", porque:"Tres oxígenos son −6, repartidos entre dos hierros: +3 cada uno."},
        {f:"NaCl",  el:"Na", r:"+1", porque:"El sodio del grupo 1 siempre actúa con +1."},
        {f:"CaO",   el:"Ca", r:"+2", porque:"El calcio del grupo 2 siempre con +2."},
        {f:"NH3",   el:"N", r:"-3", porque:"Aquí el hidrógeno es +1 (tres en total, +3), así que el nitrógeno es −3."},
        {f:"NaH",   el:"H", r:"-1", porque:"Con metales el hidrógeno actúa con −1, no con +1. Es la excepción."},
        {f:"Al2O3", el:"Al", r:"+3", porque:"Tres oxígenos son −6 entre dos aluminios: +3 cada uno."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<b style="font-size:1.3rem">${c.f.replace(/(\d)/g, "<sub>$1</sub>")}</b><br><span class="mini">¿Cuál es el número de oxidación del ${c.el}? (escribe el signo: +2, -2…)</span>`,
        respuesta: c.r,
        pista: "La suma de todos los números de oxidación de un compuesto neutro tiene que dar cero.",
        pasos: [c.porque, `El ${c.el} actúa con <b>${c.r}</b>.`,
          `Reglas fijas: el oxígeno −2 (salvo peróxidos), el hidrógeno +1 (−1 con metales), grupo 1 siempre +1 y grupo 2 siempre +2.`]};
    }},

  clasificaCompuesto: {
    titulo: "¿Qué tipo de compuesto es?",
    genera(){
      const c = elige(TODOS);
      return {textoPlano: true,
        enunciado: `<b style="font-size:1.3rem">${c.f.replace(/(\d)/g, "<sub>$1</sub>")}</b><br><span class="mini">¿Qué tipo es? (óxido, hidruro, hidrácido, hidróxido o sal)</span>`,
        respuesta: TIPO_ES[c.tipo].split(" ")[0],
        pista: "Mira qué hay a la derecha: O es óxido, H es hidruro, OH es hidróxido, y metal + no metal es sal.",
        pasos: [`Lleva ${c.tipo === "oxidos" ? "<b>oxígeno</b> con un metal o no metal" :
                    c.tipo === "hidruros" ? "<b>hidrógeno</b> a la derecha" :
                    c.tipo === "hidracidos" ? "<b>hidrógeno delante</b> de un no metal del grupo 16 o 17" :
                    c.tipo === "hidroxidos" ? "el grupo <b>OH</b>" : "un <b>metal y un no metal</b>, sin oxígeno ni hidrógeno"}.`,
          `Es un <b>${TIPO_ES[c.tipo]}</b>: ${c.n}.`]};
    }},
});
