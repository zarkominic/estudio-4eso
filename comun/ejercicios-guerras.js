/* ejercicios-guerras.js — las guerras mundiales (1914-1945).
   Las fechas y los bandos van en tablas revisadas: en historia, un dato
   generado mal se memoriza mal. */
(function(){

const HECHOS = [
  ["Asesinato del archiduque Francisco Fernando en Sarajevo", 1914],
  ["Comienzo de la Primera Guerra Mundial", 1914],
  ["Revolución Rusa (los bolcheviques toman el poder en octubre)", 1917],
  ["Entrada de Estados Unidos en la Primera Guerra Mundial", 1917],
  ["Armisticio que pone fin a la Primera Guerra Mundial", 1918],
  ["Tratado de Versalles", 1919],
  ["Marcha sobre Roma: Mussolini llega al poder", 1922],
  ["Crac de la Bolsa de Nueva York", 1929],
  ["Hitler es nombrado canciller de Alemania", 1933],
  ["Alemania invade Polonia: empieza la Segunda Guerra Mundial", 1939],
  ["Alemania invade la URSS (Operación Barbarroja)", 1941],
  ["Ataque japonés a Pearl Harbor", 1941],
  ["Fin de la batalla de Stalingrado", 1943],
  ["Desembarco de Normandía", 1944],
  ["Bombas atómicas sobre Hiroshima y Nagasaki", 1945],
  ["Fundación de la ONU", 1945],
];

const BANDOS = [
  ["Francia", "IGM", "Triple Entente"], ["Reino Unido", "IGM", "Triple Entente"], ["Rusia", "IGM", "Triple Entente"],
  ["Alemania", "IGM", "Imperios Centrales"], ["Austria-Hungría", "IGM", "Imperios Centrales"], ["Imperio otomano", "IGM", "Imperios Centrales"],
  ["Alemania", "IIGM", "Eje"], ["Italia", "IIGM", "Eje"], ["Japón", "IIGM", "Eje"],
  ["Reino Unido", "IIGM", "Aliados"], ["URSS", "IIGM", "Aliados"], ["Estados Unidos", "IIGM", "Aliados"], ["Francia", "IIGM", "Aliados"],
];
const ALT = {"Triple Entente": ["entente", "aliados"], "Imperios Centrales": ["imperios centrales", "potencias centrales", "centrales"],
  "Eje": ["el eje", "potencias del eje"], "Aliados": ["los aliados"]};

const CAUSAS = [
  ["La rivalidad colonial entre las potencias europeas", "Primera Guerra Mundial", "causa"],
  ["El sistema de alianzas que dividió Europa en dos bloques", "Primera Guerra Mundial", "causa"],
  ["La desaparición del Imperio austrohúngaro", "Primera Guerra Mundial", "consecuencia"],
  ["La creación de la Sociedad de Naciones", "Primera Guerra Mundial", "consecuencia"],
  ["Las duras condiciones impuestas a Alemania en Versalles", "Segunda Guerra Mundial", "causa"],
  ["La crisis económica y el paro de los años 30", "ascenso del nazismo", "causa"],
  ["La expansión territorial de Hitler (Austria, Checoslovaquia)", "Segunda Guerra Mundial", "causa"],
  ["La división de Alemania en zonas de ocupación", "Segunda Guerra Mundial", "consecuencia"],
  ["La fundación de la ONU", "Segunda Guerra Mundial", "consecuencia"],
  ["El comienzo de la Guerra Fría entre EE. UU. y la URSS", "Segunda Guerra Mundial", "consecuencia"],
  ["El agotamiento de Rusia en la guerra y el hambre", "Revolución Rusa", "causa"],
];

const letras = "ABCD";

Object.assign(EJERCICIOS, {
  ordenarCronologia: {
    titulo: "Ordena en el tiempo",
    genera(){
      let sel;
      do { sel = [...HECHOS].sort(() => Math.random() - .5).slice(0, 4); }
      while (new Set(sel.map(h => h[1])).size < 4);               // años distintos: sin empates
      const orden = [...sel].sort((a, b) => a[1] - b[1]).map(h => letras[sel.indexOf(h)]);
      const r = orden.join("");
      return {textoPlano: true,
        enunciado: sel.map((h, i) => `<b>${letras[i]}.</b> ${h[0]}`).join("<br>") + `<br><span class="mini">Escribe las letras de más antiguo a más reciente (ej.: BDAC)</span>`,
        respuesta: r, respuestaAlt: [orden.join(","), orden.join("-"), orden.join(", ")],
        pista: "Busca primero el más antiguo y el más reciente: el resto se coloca solo.",
        pasos: [...sel].sort((a, b) => a[1] - b[1]).map(h => `<b>${h[1]}</b> · ${letras[sel.indexOf(h)]}. ${h[0]}`).concat([`Orden: <b>${r}</b>.`])};
    }},
  fechaHecho: {
    titulo: "¿En qué año?",
    genera(){
      const [h, a] = elige(HECHOS);
      return {textoPlano: true, tolerancia: 0,
        enunciado: `<b>${h}</b><br><span class="mini">¿En qué año?</span>`,
        respuesta: String(a),
        pista: a < 1919 ? "Primera Guerra Mundial: entre 1914 y 1919." : a < 1939 ? "Periodo de entreguerras: entre 1919 y 1939." : "Segunda Guerra Mundial: entre 1939 y 1945.",
        pasos: [`${h}: <b>${a}</b>.`]};
    }},
  mapaBandos: {
    titulo: "¿De qué bando?",
    genera(){
      const [p, g, b] = elige(BANDOS);
      const guerra = g === "IGM" ? "la Primera Guerra Mundial" : "la Segunda Guerra Mundial";
      return {textoPlano: true,
        enunciado: `<b>${p}</b> en ${guerra}<br><span class="mini">${g === "IGM" ? "Triple Entente o Imperios Centrales" : "Aliados o Eje"}</span>`,
        respuesta: b, respuestaAlt: ALT[b] || [],
        pista: g === "IGM" ? "Entente: Francia, Reino Unido y Rusia. Imperios Centrales: Alemania, Austria-Hungría y el Imperio otomano." : "Eje: Alemania, Italia y Japón. Aliados: Reino Unido, URSS, EE. UU., Francia…",
        pasos: [`${p} estaba en el bando de <b>${b}</b> en ${guerra}.`]};
    }},
  causaConsecuencia: {
    titulo: "¿Causa o consecuencia?",
    genera(){
      const [h, de, r] = elige(CAUSAS);
      return {textoPlano: true,
        enunciado: `<b>${h}</b><br><span class="mini">¿Es causa o consecuencia de: ${de}?</span>`,
        respuesta: r,
        pista: "Piensa si ocurrió antes y ayudó a provocarlo, o si vino después como resultado.",
        pasos: [`${h} → <b>${r}</b> de ${de}.`]};
    }},
});
})();
