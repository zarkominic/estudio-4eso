/* ejercicios-esp.js — España en el siglo XX (his-espana-xx).
   Datos en tablas revisadas a mano: fecha, etapa y hecho van juntos para que
   ningún ejercicio se invente una fecha. Nombres de generador con prefijo esp
   para no pisar ordenarCronologia / identificarConcepto de otros temas. */
(function(){

/* [hecho, año, etapa] */
const ESP_HECHOS = [
  ["Pronunciamiento de Martínez Campos en Sagunto: vuelve la monarquía borbónica", 1874, "Restauración"],
  ["Se aprueba la Constitución de 1876 de Cánovas", 1876, "Restauración"],
  ["Pacto de El Pardo entre Cánovas y Sagasta", 1885, "Restauración"],
  ["Guerra con EE. UU.: España pierde Cuba, Puerto Rico y Filipinas", 1898, "Restauración"],
  ["Semana Trágica de Barcelona", 1909, "Restauración"],
  ["Huelga general revolucionaria", 1917, "Restauración"],
  ["Desastre de Annual en Marruecos", 1921, "Restauración"],
  ["Golpe de Estado de Primo de Rivera", 1923, "Dictadura de Primo de Rivera"],
  ["Desembarco de Alhucemas", 1925, "Dictadura de Primo de Rivera"],
  ["Dimisión de Primo de Rivera", 1930, "Dictadura de Primo de Rivera"],
  ["Proclamación de la Segunda República (14 de abril)", 1931, "Segunda República"],
  ["Se aprueba la Constitución republicana de 1931", 1931, "Segunda República"],
  ["Estatuto de autonomía de Cataluña", 1932, "Segunda República"],
  ["Primeras elecciones en las que votan las mujeres", 1933, "Segunda República"],
  ["Revolución de Asturias", 1934, "Segunda República"],
  ["Victoria del Frente Popular en las elecciones de febrero", 1936, "Segunda República"],
  ["Sublevación militar del 17-18 de julio: empieza la guerra", 1936, "Guerra Civil"],
  ["Bombardeo de Guernica", 1937, "Guerra Civil"],
  ["Batalla del Ebro", 1938, "Guerra Civil"],
  ["Fin de la Guerra Civil (1 de abril)", 1939, "Guerra Civil"],
  ["Entrevista de Franco y Hitler en Hendaya", 1940, "Franquismo"],
  ["España ingresa en la ONU", 1955, "Franquismo"],
  ["Acuerdos con Estados Unidos (bases militares)", 1953, "Franquismo"],
  ["Plan de Estabilización: fin de la autarquía", 1959, "Franquismo"],
  ["Franco designa a Juan Carlos como sucesor", 1969, "Franquismo"],
  ["Atentado de ETA contra Carrero Blanco", 1973, "Franquismo"],
  ["Muerte de Franco (20 de noviembre)", 1975, "Transición"],
  ["Ley para la Reforma Política, aprobada en referéndum", 1976, "Transición"],
  ["Primeras elecciones democráticas desde 1936 (15 de junio)", 1977, "Transición"],
  ["Pactos de la Moncloa", 1977, "Transición"],
  ["Referéndum de la Constitución (6 de diciembre)", 1978, "Transición"],
  ["Intento de golpe de Estado del 23-F", 1981, "Transición"],
  ["Victoria del PSOE en las elecciones generales", 1982, "Transición"],
  ["Entrada de España en la Comunidad Económica Europea", 1986, "Democracia"],
];
const ESP_ETAPAS = ["Restauración", "Dictadura de Primo de Rivera", "Segunda República", "Guerra Civil", "Franquismo", "Transición", "Democracia"];
const ESP_ETAPA_ALT = {
  "Restauración": ["la restauracion", "restauracion borbonica"],
  "Dictadura de Primo de Rivera": ["primo de rivera", "dictadura primo de rivera", "la dictadura de primo de rivera"],
  "Segunda República": ["ii republica", "2 republica", "2a republica", "republica", "la segunda republica"],
  "Guerra Civil": ["la guerra civil", "guerra"],
  "Franquismo": ["dictadura franquista", "el franquismo", "dictadura de franco"],
  "Transición": ["la transicion", "transicion democratica"],
  "Democracia": ["la democracia", "democracia actual"],
};
const ESP_ETAPA_PISTA = "Restauración 1874-1923 · Primo de Rivera 1923-1930 · II República 1931-1936 · Guerra Civil 1936-1939 · Franquismo 1939-1975 · Transición 1975-1982 · Democracia consolidada desde 1982.";

/* [definición, concepto, alternativas] */
const ESP_CONCEPTOS = [
  ["Sistema en el que los partidos conservador y liberal se alternaban en el gobierno de forma pactada durante la Restauración", "turnismo", ["turno pacifico", "turno de partidos", "el turnismo"]],
  ["Personaje local poderoso que controlaba los votos de su zona en la Restauración", "cacique", ["caciques", "caciquismo"]],
  ["Manipulación de los resultados electorales mediante actas falsas, votos de muertos, etc.", "pucherazo", ["el pucherazo", "fraude electoral"]],
  ["Corriente de intelectuales que, tras 1898, pedía modernizar España («escuela y despensa»)", "regeneracionismo", ["el regeneracionismo"]],
  ["Grupo de escritores marcados por la pérdida de las últimas colonias (Unamuno, Baroja, Azorín…)", "generacion del 98", ["la generacion del 98", "generacion 98"]],
  ["Coalición de izquierdas que ganó las elecciones de febrero de 1936", "frente popular", ["el frente popular"]],
  ["Ley que tenía como objetivo repartir latifundios entre campesinos en la Segunda República", "reforma agraria", ["la reforma agraria", "ley de reforma agraria"]],
  ["Política económica franquista de autosuficiencia, con racionamiento y aislamiento exterior", "autarquia", ["la autarquia"]],
  ["Plan de 1959 que liberalizó la economía y abrió la etapa del desarrollismo", "plan de estabilizacion", ["el plan de estabilizacion"]],
  ["Crecimiento económico rápido de los años 60 con industrialización, turismo y emigración", "desarrollismo", ["el desarrollismo", "milagro economico"]],
  ["Partido único del franquismo, conocido también como el Movimiento", "fet de las jons", ["falange", "movimiento nacional", "el movimiento", "falange espanola tradicionalista y de las jons"]],
  ["Acuerdos de 1977 entre gobierno, partidos y sindicatos para afrontar la crisis económica", "pactos de la moncloa", ["los pactos de la moncloa"]],
  ["Ley de 1976 aprobada por las propias Cortes franquistas que abrió el camino a la democracia", "ley para la reforma politica", ["reforma politica", "ley de reforma politica"]],
  ["Ley de 1977 que perdonó los delitos políticos cometidos antes de esa fecha", "ley de amnistia", ["amnistia", "la ley de amnistia"]],
  ["Diputados que redactaron el borrador de la Constitución de 1978", "padres de la constitucion", ["los padres de la constitucion", "ponencia constitucional"]],
  ["Forma de Estado que establece la Constitución de 1978: el rey es jefe del Estado pero no gobierna", "monarquia parlamentaria", ["la monarquia parlamentaria"]],
  ["Organización territorial de la Constitución de 1978 en comunidades con autogobierno", "estado de las autonomias", ["estado autonomico", "autonomias", "comunidades autonomas"]],
  ["Ayuda militar que Alemania e Italia enviaron al bando sublevado (por ejemplo, la Legión Cóndor)", "intervencion extranjera", ["ayuda extranjera", "ayuda italoalemana"]],
  ["Voluntarios de muchos países que lucharon con la República en la Guerra Civil", "brigadas internacionales", ["las brigadas internacionales"]],
  ["Política de Francia y Reino Unido de no ayudar a ningún bando en la Guerra Civil", "no intervencion", ["comite de no intervencion", "la no intervencion"]],
];

/* [hecho, de qué, causa|consecuencia] */
const ESP_CAUSAS = [
  ["La pérdida de Cuba, Puerto Rico y Filipinas", "la crisis del 98", "consecuencia"],
  ["El fraude electoral y el caciquismo", "el desprestigio de la Restauración", "causa"],
  ["El Desastre de Annual (1921)", "el golpe de Primo de Rivera", "causa"],
  ["La victoria republicana en las ciudades en las elecciones municipales de 1931", "la proclamación de la Segunda República", "causa"],
  ["El exilio de Alfonso XIII", "la proclamación de la Segunda República", "consecuencia"],
  ["El voto femenino", "la Constitución de 1931", "consecuencia"],
  ["La fuerte polarización política entre izquierdas y derechas", "la Guerra Civil", "causa"],
  ["La sublevación de una parte del ejército en julio de 1936", "la Guerra Civil", "causa"],
  ["El exilio de cientos de miles de republicanos", "la Guerra Civil", "consecuencia"],
  ["La represión y las depuraciones de posguerra", "la Guerra Civil", "consecuencia"],
  ["El aislamiento internacional de España tras 1945", "la autarquía", "causa"],
  ["La Guerra Fría y el anticomunismo de Franco", "los acuerdos con EE. UU. de 1953", "causa"],
  ["El turismo masivo y las remesas de los emigrantes", "el Plan de Estabilización de 1959", "consecuencia"],
  ["La muerte de Franco", "la Transición", "causa"],
  ["La Ley para la Reforma Política", "las elecciones de 1977", "causa"],
  ["La Constitución de 1978", "el consenso de la Transición", "consecuencia"],
  ["El Estado de las autonomías", "la Constitución de 1978", "consecuencia"],
  ["El fracaso del 23-F", "la consolidación de la democracia", "causa"],
];

/* [personaje, qué hizo, alternativas del nombre] */
const ESP_PERSONAJES = [
  ["Antonio Cánovas del Castillo", "Diseñó el sistema de la Restauración y la Constitución de 1876; líder conservador.", ["canovas", "canovas del castillo"]],
  ["Práxedes Mateo Sagasta", "Líder del Partido Liberal que se turnaba con Cánovas en el gobierno.", ["sagasta"]],
  ["Alfonso XIII", "Rey que aceptó la dictadura de 1923 y se exilió en 1931.", ["alfonso 13"]],
  ["Miguel Primo de Rivera", "General que dio el golpe de 1923 y gobernó como dictador hasta 1930.", ["primo de rivera"]],
  ["Niceto Alcalá-Zamora", "Primer presidente de la Segunda República (1931-1936).", ["alcala-zamora", "alcala zamora", "niceto alcala zamora"]],
  ["Manuel Azaña", "Presidente del Gobierno en el bienio reformista y presidente de la República desde 1936.", ["azana"]],
  ["Clara Campoamor", "Diputada que defendió en las Cortes el voto femenino en 1931.", ["campoamor"]],
  ["Francisco Franco", "General que encabezó el bando sublevado y fue dictador de 1939 a 1975.", ["franco"]],
  ["Juan Negrín", "Presidente del Gobierno republicano durante la última parte de la guerra (1937-1939).", ["negrin"]],
  ["Luis Carrero Blanco", "Presidente del Gobierno franquista asesinado por ETA en 1973.", ["carrero blanco", "carrero"]],
  ["Juan Carlos I", "Rey desde 1975, apoyó la Transición y se opuso al golpe del 23-F.", ["juan carlos", "juan carlos 1", "rey juan carlos"]],
  ["Adolfo Suárez", "Presidente del Gobierno que pilotó la Transición y ganó las elecciones de 1977.", ["suarez"]],
  ["Felipe González", "Presidente del Gobierno socialista desde 1982; con él España entró en la CEE.", ["felipe gonzalez", "gonzalez"]],
  ["Dolores Ibárruri", "Dirigente comunista, «Pasionaria», que volvió del exilio en 1977.", ["pasionaria", "la pasionaria", "ibarruri"]],
];

/* Bienios de la Segunda República: [medida, bienio] */
const ESP_BIENIOS = [
  ["Reforma agraria para repartir latifundios", "reformista"],
  ["Estatuto de autonomía de Cataluña (1932)", "reformista"],
  ["Reforma militar de Azaña para reducir oficiales", "reformista"],
  ["Separación Iglesia-Estado y enseñanza laica", "reformista"],
  ["Construcción de miles de escuelas públicas", "reformista"],
  ["Paralización de la reforma agraria", "conservador"],
  ["Gobiernos del Partido Radical con apoyo de la CEDA", "conservador"],
  ["Represión de la Revolución de Asturias (1934)", "conservador"],
  ["Suspensión del Estatuto catalán tras octubre de 1934", "conservador"],
  ["Amnistía a los presos de octubre de 1934", "frente popular"],
  ["Azaña, elegido presidente de la República (mayo de 1936)", "frente popular"],
  ["Reanudación de la reforma agraria en la primavera de 1936", "frente popular"],
];
const ESP_BIENIO_ALT = {
  "reformista": ["bienio reformista", "izquierdas", "bienio de izquierdas", "1931-1933", "azañista", "progresista"],
  "conservador": ["bienio conservador", "derechas", "bienio de derechas", "1933-1935", "radical-cedista", "bienio negro"],
  "frente popular": ["el frente popular", "1936"],
};

const L = "ABCDE";
const baraja = arr => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const variantes = orden => [orden.join(","), orden.join("-"), orden.join(", "), orden.join(" ")];

Object.assign(EJERCICIOS, {
  espOrdenar: {
    titulo: "Ordena en el tiempo",
    genera(){
      let sel;
      do { sel = baraja(ESP_HECHOS).slice(0, 4); } while (new Set(sel.map(h => h[1])).size < 4);
      const ord = [...sel].sort((a, b) => a[1] - b[1]);
      const orden = ord.map(h => L[sel.indexOf(h)]); const r = orden.join("");
      return {textoPlano: true,
        enunciado: sel.map((h, i) => `<b>${L[i]}.</b> ${h[0]}`).join("<br>") + `<br><span class="mini">Escribe las letras de más antiguo a más reciente (ej.: BDAC)</span>`,
        respuesta: r, respuestaAlt: variantes(orden),
        pista: "Sitúa primero cada hecho en su etapa (Restauración, República, guerra, franquismo, Transición): el orden de las etapas te da casi todo.",
        pasos: ord.map(h => `<b>${h[1]}</b> · ${L[sel.indexOf(h)]}. ${h[0]} <span class="mini">(${h[2]})</span>`).concat([`Orden: <b>${r}</b>.`])};
    }},
  espEtapa: {
    titulo: "¿En qué etapa?",
    genera(){
      const [h, a, e] = elige(ESP_HECHOS);
      return {textoPlano: true,
        enunciado: `<b>${h}</b> (${a})<br><span class="mini">¿En qué etapa? ${ESP_ETAPAS.join(" · ")}</span>`,
        respuesta: e, respuestaAlt: ESP_ETAPA_ALT[e] || [],
        pista: ESP_ETAPA_PISTA,
        pasos: [`${a} cae dentro de la etapa: <b>${e}</b>.`, ESP_ETAPA_PISTA]};
    }},
  espFecha: {
    titulo: "¿En qué año?",
    genera(){
      const [h, a, e] = elige(ESP_HECHOS);
      return {textoPlano: true, tolerancia: 0,
        enunciado: `<b>${h}</b><br><span class="mini">¿En qué año? (Etapa: ${e})</span>`,
        respuesta: String(a),
        pista: `Etapa: ${e}. ${ESP_ETAPA_PISTA}`,
        pasos: [`${h}: <b>${a}</b>.`]};
    }},
  espConcepto: {
    titulo: "¿Qué concepto es?",
    genera(){
      const [d, c, alt] = elige(ESP_CONCEPTOS);
      return {textoPlano: true,
        enunciado: `${d}<br><span class="mini">Escribe el concepto (sin tildes vale).</span>`,
        respuesta: c, respuestaAlt: alt,
        pista: `Empieza por «${c[0].toUpperCase()}» y tiene ${c.split(" ").length} palabra${c.includes(" ") ? "s" : ""}.`,
        pasos: [`Es <b>${c}</b>.`, d]};
    }},
  espCausa: {
    titulo: "¿Causa o consecuencia?",
    genera(){
      const [h, de, r] = elige(ESP_CAUSAS);
      return {textoPlano: true,
        enunciado: `<b>${h}</b><br><span class="mini">¿Es causa o consecuencia de ${de}?</span>`,
        respuesta: r,
        pista: "¿Ocurrió antes y ayudó a provocarlo (causa) o vino después, como resultado (consecuencia)?",
        pasos: [`${h} → <b>${r}</b> de ${de}.`]};
    }},
  espPersonaje: {
    titulo: "¿Quién fue?",
    genera(){
      const [n, q, alt] = elige(ESP_PERSONAJES);
      return {textoPlano: true,
        enunciado: `${q}<br><span class="mini">¿Quién fue? Basta con el apellido.</span>`,
        respuesta: n, respuestaAlt: alt,
        pista: `Sus iniciales son ${n.split(" ").filter(p => /^[A-ZÁÉÍÓÚÑ]/.test(p)).map(p => p[0]).join(". ")}.`,
        pasos: [`Es <b>${n}</b>.`, q]};
    }},
  espBienio: {
    titulo: "¿Qué etapa de la República?",
    genera(){
      const [m, b] = elige(ESP_BIENIOS);
      return {textoPlano: true,
        enunciado: `<b>${m}</b><br><span class="mini">¿Bienio reformista (1931-33), bienio conservador (1933-35) o Frente Popular (1936)? Escribe: reformista, conservador o frente popular.</span>`,
        respuesta: b, respuestaAlt: ESP_BIENIO_ALT[b],
        pista: "Reformista = Azaña y las grandes reformas. Conservador = radicales y CEDA, frenan las reformas. Frente Popular = la izquierda vuelve y las retoma.",
        pasos: [`${m} → <b>${b}</b>.`]};
    }},
});
})();
