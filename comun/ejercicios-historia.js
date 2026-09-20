/* ejercicios-historia.js — el siglo XIX.
   En Historia el taller no da números: ordena cronologías, relaciona causa y efecto
   y sitúa conceptos. Eso es lo que de verdad se evalúa. */

const HITOS = [
  {a:1789, h:"Comienza la Revolución Francesa"},
  {a:1804, h:"Napoleón se corona emperador"},
  {a:1808, h:"Empieza la Guerra de la Independencia en España"},
  {a:1812, h:"Se aprueba la Constitución de Cádiz"},
  {a:1815, h:"Congreso de Viena: la Restauración"},
  {a:1821, h:"Independencia de México y Perú"},
  {a:1830, h:"Revolución liberal en Francia"},
  {a:1848, h:"Primavera de los Pueblos y Manifiesto Comunista"},
  {a:1861, h:"Unificación de Italia"},
  {a:1871, h:"Unificación de Alemania"},
  {a:1884, h:"Conferencia de Berlín: reparto de África"},
  {a:1898, h:"España pierde Cuba, Puerto Rico y Filipinas"},
];

Object.assign(EJERCICIOS, {

  ordenarCronologia: {
    titulo: "¿Qué pasó antes?",
    genera(){
      const a = elige(HITOS);
      const b = elige(HITOS.filter(x => Math.abs(x.a - a.a) >= 6 && x.a !== a.a));
      const primero = a.a < b.a ? a : b;
      return {textoPlano: true,
        enunciado: `<b>A)</b> ${a.h}<br><b>B)</b> ${b.h}<br><span class="mini">¿Cuál pasó antes? Escribe A o B</span>`,
        respuesta: primero === a ? "A" : "B",
        pista: "Sitúa cada uno en su etapa: Revolución, Napoleón, Restauración, revoluciones liberales, unificaciones, imperialismo.",
        pasos: [`${a.h}: <b>${a.a}</b>.`, `${b.h}: <b>${b.a}</b>.`,
          `Pasó antes <b>${primero === a ? "A" : "B"}</b>, en ${primero.a}.`]};
    }},

  fechaHito: {
    titulo: "¿En qué año?",
    genera(){
      const c = elige(HITOS);
      return {textoPlano: true,
        enunciado: `<b>${c.h}</b><br><span class="mini">¿En qué año? (escribe solo el número)</span>`,
        respuesta: String(c.a),
        pista: "Piensa en qué etapa del siglo encaja: principio, mitad o final.",
        pasos: [`Fue en <b>${c.a}</b>.`,
          c.a < 1815 ? `Está en la etapa revolucionaria y napoleónica (1789-1815).` :
          c.a < 1850 ? `Está en la Restauración y las revoluciones liberales (1815-1848).` :
          c.a < 1880 ? `Está en la época de las unificaciones nacionales.` :
          `Está en la fase imperialista del final de siglo.`]};
    }},

  causaConsecuencia: {
    titulo: "Causa y consecuencia",
    genera(){
      const casos = [
        {c:"La Revolución Industrial concentra obreros en las fábricas", e:"movimiento obrero",
         ex:"Miles de personas en las mismas condiciones y en el mismo sitio: de ahí salen los sindicatos y el movimiento obrero."},
        {c:"Napoleón invade España en 1808", e:"guerra de la independencia",
         ex:"La invasión provoca el levantamiento del 2 de mayo y una guerra de seis años."},
        {c:"La crisis del Antiguo Régimen y el vacío de poder en España", e:"independencia de America",
         ex:"Con el rey preso y el poder desorganizado, las colonias americanas aprovechan para independizarse."},
        {c:"La derrota de Napoleón en 1815", e:"restauracion",
         ex:"Las potencias vencedoras se reúnen en Viena y restauran el absolutismo: es la Restauración."},
        {c:"La necesidad de materias primas y mercados por la industrialización", e:"imperialismo",
         ex:"Europa necesita algodón, caucho y compradores: de ahí el reparto colonial de África y Asia."},
        {c:"La derrota de 1898 y la pérdida de las últimas colonias", e:"crisis del 98",
         ex:"El Desastre del 98 provoca una crisis moral e intelectual: el regeneracionismo y la Generación del 98."},
      ];
      const c = elige(casos);
      const opciones = ["movimiento obrero","guerra de la independencia","independencia de America","restauracion","imperialismo","crisis del 98"];
      return {textoPlano: true,
        enunciado: `<b>Causa:</b> ${c.c}<br><span class="mini">¿Qué consecuencia tuvo? (${opciones.join(" · ")})</span>`,
        respuesta: c.e,
        pista: "Pregúntate qué se sigue lógicamente de esa situación.",
        pasos: [c.ex, `Consecuencia: <b>${c.e}</b>.`]};
    }},

  identificarConcepto: {
    titulo: "¿De qué concepto hablamos?",
    genera(){
      const casos = [
        {d:"Sistema político en el que el rey concentra todo el poder y no rinde cuentas a nadie", r:"absolutismo"},
        {d:"Doctrina que defiende la libertad individual, la división de poderes y una constitución", r:"liberalismo"},
        {d:"Sentimiento de pertenencia a una comunidad con lengua e historia propias, que aspira a tener su Estado", r:"nacionalismo"},
        {d:"Dominio político y económico de unos países europeos sobre territorios de África y Asia", r:"imperialismo"},
        {d:"Clase social propietaria de las fábricas y del capital", r:"burguesia"},
        {d:"Clase social que vende su trabajo a cambio de un salario", r:"proletariado"},
        {d:"Doctrina que propone que los medios de producción sean colectivos", r:"socialismo"},
        {d:"Vuelta del absolutismo tras la derrota de Napoleón, acordada en el Congreso de Viena", r:"restauracion"},
        {d:"Sistema en el que el rey comparte el poder con un parlamento elegido", r:"monarquia parlamentaria"},
        {d:"Derecho de voto limitado a quienes tienen cierta renta o propiedad", r:"sufragio censitario"},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<em>«${c.d}»</em><br><span class="mini">¿Qué concepto es?</span>`,
        respuesta: c.r,
        pista: "Piensa si habla de un sistema político, de una clase social o de una doctrina.",
        pasos: [`Es el <b>${c.r}</b>.`,
          `En los exámenes de Historia, definir bien los conceptos vale tanto como saberse las fechas.`]};
    }},
});
