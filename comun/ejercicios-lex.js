/* ejercicios-lex.js — léxico y semántica.

   Como en el resto de Lengua, aquí no se inventan oraciones por combinación:
   se eligen de bancos revisados a mano (así no se rompe la concordancia).
   Lo que sí se combina son palabras sueltas: parejas de sinónimos dentro de un
   grupo, intrusos de otro campo, el orden de la pareja… Eso da variedad sin
   riesgo de frases mal hechas. */
(function(){

const barajaLex = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const tomaLex = (arr, n) => barajaLex(arr).slice(0, n);

/* ─── Relaciones semánticas ─── */
const SINONIMOS = [
  ["empezar","comenzar","iniciar"], ["terminar","acabar","finalizar","concluir"], ["rápido","veloz","raudo"],
  ["bonito","hermoso","bello","precioso"], ["miedo","temor","pavor"], ["casa","vivienda","hogar","domicilio"],
  ["contento","alegre","feliz"], ["enfadado","enojado","molesto"], ["listo","inteligente","espabilado"],
  ["cansado","agotado","fatigado","rendido"], ["ayudar","auxiliar","socorrer"], ["coche","automóvil","vehículo"],
  ["delgado","flaco","esbelto"], ["antiguo","viejo","añejo"], ["regalo","obsequio","presente"],
  ["error","fallo","equivocación"], ["mirar","observar","contemplar"], ["lugar","sitio","emplazamiento"],
  ["valiente","audaz","osado","intrépido"], ["pelo","cabello"], ["andar","caminar"], ["respuesta","contestación"],
];
const ANTONIMOS = [
  ["alto","bajo"], ["frío","caliente"], ["rico","pobre"], ["entrar","salir"], ["subir","bajar"], ["vivo","muerto"],
  ["comprar","vender"], ["aprobar","suspender"], ["día","noche"], ["luz","oscuridad"], ["ganar","perder"],
  ["abrir","cerrar"], ["lleno","vacío"], ["cerca","lejos"], ["antes","después"], ["amor","odio"],
  ["visible","invisible"], ["legal","ilegal"], ["ordenado","desordenado"], ["moral","inmoral"], ["fácil","difícil"],
  ["padre","hijo"], ["profesor","alumno"], ["preguntar","responder"], ["temprano","tarde"], ["mayor","menor"],
];
const HIPER = [
  ["flor", ["rosa","margarita","tulipán","clavel","amapola","girasol"]],
  ["mueble", ["silla","mesa","armario","sofá","estantería","cómoda"]],
  ["fruta", ["manzana","pera","plátano","melocotón","fresa","uva"]],
  ["herramienta", ["martillo","destornillador","alicates","sierra","llave inglesa"]],
  ["instrumento", ["guitarra","violín","piano","flauta","trompeta","batería"]],
  ["ave", ["gorrión","águila","paloma","cigüeña","golondrina","halcón"]],
  ["deporte", ["fútbol","baloncesto","tenis","natación","balonmano","atletismo"]],
  ["metal", ["hierro","cobre","oro","plata","aluminio","zinc"]],
  ["árbol", ["pino","roble","encina","olmo","chopo","castaño"]],
  ["vehículo", ["camión","furgoneta","moto","autobús","tractor","bicicleta"]],
  ["color", ["rojo","azul","amarillo","verde","morado","gris"]],
  ["prenda", ["camisa","pantalón","jersey","falda","chaqueta","abrigo"]],
  ["planeta", ["Marte","Venus","Júpiter","Saturno","Mercurio","Neptuno"]],
  ["mamífero", ["perro","ballena","murciélago","caballo","delfín","tigre"]],
];
const RELNOM = {sinonimo:"sinónimo", antonimo:"antónimo", hiperonimo:"hiperónimo", hiponimo:"hipónimo"};

/* ─── Polisemia y homonimia ─── */
const PALABRAS_PH = [
  {p:"banco", r:"polisemia", f:["Me senté en un banco del parque.","Fui al banco a sacar dinero."], por:"Los dos sentidos vienen del mismo origen (el banco de madera donde los cambistas atendían): una sola entrada en el diccionario con varias acepciones."},
  {p:"hoja", r:"polisemia", f:["Se cayó una hoja del árbol.","Arranca una hoja del cuaderno."], por:"La hoja de papel se llama así por parecerse a la del árbol: mismo origen, sentido extendido."},
  {p:"cabo", r:"polisemia", f:["El cabo dio una orden a los soldados.","El barco dobló el cabo de Finisterre."], por:"Ambos vienen del latín caput, 'cabeza': el que encabeza y la punta de tierra. Una palabra con varias acepciones."},
  {p:"ratón", r:"polisemia", f:["El gato persigue a un ratón.","Mueve el ratón para abrir el archivo."], por:"El del ordenador se llamó así por su forma y su cable-cola: sentido nuevo de la misma palabra."},
  {p:"cuello", r:"polisemia", f:["Me duele el cuello.","El cuello de la botella es estrecho."], por:"El de la botella es un uso figurado del cuello del cuerpo: mismo origen."},
  {p:"pluma", r:"polisemia", f:["El pájaro perdió una pluma.","Firmó el contrato con una pluma de oro."], por:"Se escribía con plumas de ave: el objeto heredó el nombre. Misma palabra."},
  {p:"red", r:"polisemia", f:["El pescador recogió la red.","Busca la noticia en la red."], por:"Internet se llama red por su forma de malla conectada: sentido extendido."},
  {p:"pie", r:"polisemia", f:["Me he torcido el pie.","Lo esperé al pie de la montaña."], por:"El pie de la montaña es su parte de abajo, como el pie del cuerpo: metáfora dentro de la misma palabra."},
  {p:"estrella", r:"polisemia", f:["Esa estrella brilla mucho esta noche.","Es la estrella del equipo."], por:"La persona famosa 'brilla' como un astro: sentido figurado, mismo origen."},
  {p:"corona", r:"polisemia", f:["El rey llevaba una corona de oro.","El dentista me puso una corona en la muela."], por:"La pieza dental cubre la muela como una corona: misma palabra con otra acepción."},
  {p:"vino", r:"homonimia", f:["Este vino es de La Rioja.","Mi tío vino ayer a cenar."], por:"Uno es el sustantivo (del latín vinum) y otro una forma del verbo venir: orígenes distintos que coinciden por casualidad."},
  {p:"llama", r:"homonimia", f:["La llama de la vela se apagó.","La llama es un animal de los Andes."], por:"Llama 'fuego' viene del latín flamma; llama 'animal', del quechua. Coinciden por azar: homónimas."},
  {p:"río", r:"homonimia", f:["El río Tajo pasa por Toledo.","Siempre me río con sus chistes."], por:"Sustantivo 'río' y forma del verbo 'reír': palabras distintas que suenan y se escriben igual."},
  {p:"haya / aya", r:"homonimia", f:["Junto al lago crece un haya.","El aya cuidaba de los niños."], por:"Suenan igual pero se escriben distinto y no tienen relación: homónimas homófonas."},
  {p:"vaca / baca", r:"homonimia", f:["La vaca pasta en el prado.","Subimos las maletas a la baca del coche."], por:"Misma pronunciación, distinta escritura y distinto origen: homófonas."},
  {p:"tubo / tuvo", r:"homonimia", f:["El agua sale por el tubo.","Tuvo mucha suerte en el examen."], por:"'Tubo' es un sustantivo; 'tuvo', el verbo tener. Suenan igual: homófonas."},
  {p:"sobre", r:"homonimia", f:["Mete la carta en el sobre.","Deja el libro sobre la mesa."], por:"Un sustantivo y una preposición: categorías distintas que coinciden en la forma."},
  {p:"bota", r:"homonimia", f:["Se me ha roto una bota.","El balón bota mucho en esta pista."], por:"El calzado y la forma del verbo 'botar' no tienen relación de sentido: homónimas."},
  {p:"hola / ola", r:"homonimia", f:["Le dije hola al entrar.","Una ola enorme rompió en la orilla."], por:"Un saludo y el movimiento del mar: suenan igual, se escriben distinto. Homófonas."},
  {p:"cocer / coser", r:"homonimia", f:["Hay que cocer la pasta diez minutos.","Mi abuela sabe coser a mano."], por:"En casi toda España se distinguen, pero con seseo suenan igual: homófonas para millones de hablantes, y sin relación de sentido."},
];

/* ─── Denotación y connotación ─── */
const DENOT = [
  {f:"Mi vecino tiene un <b>burro</b> en la finca.", t:"denotativo", por:"Habla del animal, sin más: es el significado objetivo, el del diccionario."},
  {f:"No seas <b>burro</b> y lee las instrucciones.", t:"connotativo", por:"Aquí 'burro' añade la idea de torpeza o terquedad: valor subjetivo que no es el animal."},
  {f:"La <b>serpiente</b> se escondió bajo una piedra.", t:"denotativo", por:"Se refiere al reptil: significado literal."},
  {f:"Ese compañero es una <b>serpiente</b>: no te fíes.", t:"connotativo", por:"'Serpiente' sugiere traición y peligro: es una connotación negativa."},
  {f:"El <b>zorro</b> cazó una gallina.", t:"denotativo", por:"El animal, en sentido literal."},
  {f:"Mi abuelo es un <b>zorro</b> negociando.", t:"connotativo", por:"Se asocia el zorro con la astucia: valor añadido, no el animal."},
  {f:"Pon el <b>corazón</b> del pollo en el caldo.", t:"denotativo", por:"El órgano, literalmente."},
  {f:"Tiene un gran <b>corazón</b>: siempre ayuda.", t:"connotativo", por:"Corazón = bondad, generosidad. Es un valor cultural asociado."},
  {f:"Al anochecer el cielo se pone <b>negro</b>.", t:"denotativo", por:"Describe el color, sin más."},
  {f:"Llevo una semana <b>negra</b>: todo me sale mal.", t:"connotativo", por:"'Negro' se asocia a desgracia: connotación negativa."},
  {f:"En invierno la <b>primavera</b> parece lejísimos.", t:"denotativo", por:"Habla de la estación del año, literalmente."},
  {f:"Mi bisabuela ya tiene noventa <b>primaveras</b>.", t:"connotativo", por:"'Primaveras' por 'años' añade un tono cariñoso y vital."},
  {f:"El <b>lobo</b> vive en manada.", t:"denotativo", por:"El animal: significado objetivo."},
  {f:"Ese banquero es un <b>lobo</b> con los clientes.", t:"connotativo", por:"'Lobo' sugiere ferocidad y abuso: connotación."},
  {f:"Han plantado una <b>rosa</b> en la entrada.", t:"denotativo", por:"La flor, sin más."},
  {f:"Pon <b>hielo</b> en la bebida.", t:"denotativo", por:"Agua congelada: sentido literal."},
  {f:"Me miró con una frialdad de <b>hielo</b>.", t:"connotativo", por:"'Hielo' añade la idea de distancia y falta de afecto."},
  {f:"La <b>casa</b> tiene tres dormitorios.", t:"denotativo", por:"El edificio: significado literal."},
  {f:"Cuando vuelvo al pueblo siento que estoy en <b>casa</b>.", t:"connotativo", por:"'Casa' aquí evoca refugio y pertenencia, no el edificio."},
  {f:"El <b>sol</b> sale por el este.", t:"denotativo", por:"La estrella, literalmente."},
  {f:"Tu hermana es un <b>sol</b>: me ha ayudado con todo.", t:"connotativo", por:"'Sol' = persona encantadora: connotación positiva."},
];

/* ─── Campos semánticos (sin palabras repetidas entre campos) ─── */
const CAMPOS = [
  {n:"frutas", alt:["fruta","las frutas"], m:["manzana","pera","plátano","melocotón","fresa","uva","cereza","sandía","kiwi","ciruela"]},
  {n:"muebles", alt:["mueble","mobiliario","los muebles"], m:["silla","mesa","armario","sofá","estantería","cómoda","sillón","mesilla","taburete","aparador"]},
  {n:"instrumentos musicales", alt:["instrumentos","instrumentos de musica","musica","instrumento musical"], m:["guitarra","violín","piano","flauta","trompeta","tambor","saxofón","arpa","clarinete","violonchelo"]},
  {n:"deportes", alt:["deporte","los deportes"], m:["fútbol","baloncesto","tenis","natación","balonmano","atletismo","ciclismo","voleibol","rugby","pádel"]},
  {n:"prendas de vestir", alt:["ropa","prendas","vestimenta","prenda de vestir","la ropa"], m:["camisa","pantalón","jersey","falda","chaqueta","abrigo","calcetín","bufanda","vestido","sudadera"]},
  {n:"medios de transporte", alt:["transporte","transportes","vehiculos","medios de transporte","vehiculo"], m:["tren","avión","autobús","barco","metro","tranvía","helicóptero","taxi","furgoneta","camión"]},
  {n:"partes del cuerpo", alt:["cuerpo","cuerpo humano","el cuerpo","partes del cuerpo humano"], m:["brazo","rodilla","codo","hombro","tobillo","muñeca","cadera","espalda","oreja","ombligo"]},
  {n:"herramientas", alt:["herramienta","las herramientas"], m:["martillo","destornillador","alicates","sierra","taladro","lija","serrucho","tenaza","berbiquí","formón"]},
  {n:"fenómenos meteorológicos", alt:["tiempo","meteorologia","clima","el tiempo","tiempo atmosferico","fenomenos atmosfericos"], m:["lluvia","granizo","niebla","tormenta","nieve","rayo","viento","huracán","escarcha","rocío"]},
  {n:"emociones", alt:["sentimientos","emocion","estados de animo","sentimiento"], m:["alegría","tristeza","miedo","rabia","envidia","nostalgia","ilusión","vergüenza","celos","asco"]},
  {n:"profesiones", alt:["oficios","trabajos","profesion","oficio","empleos"], m:["médico","fontanero","abogada","carpintero","enfermera","electricista","arquitecta","panadero","periodista","bombero"]},
  {n:"aves", alt:["pajaros","ave","pajaro","las aves"], m:["gorrión","águila","paloma","cigüeña","golondrina","halcón","búho","loro","gaviota","pato"]},
  {n:"utensilios de cocina", alt:["cocina","utensilios","menaje","menaje de cocina","cacharros de cocina"], m:["sartén","cazo","olla","espumadera","cucharón","colador","batidora","rallador","sacacorchos","cazuela"]},
];

/* ─── Préstamos y neologismos ─── */
const PRESTAMOS = [
  ...["fútbol","líder","mitin","récord","eslogan","escáner","club","chat","wifi","fan","estrés","sándwich","tuit","jersey","bistec","cómic"].map(w => ({w, o:"anglicismo"})),
  ...["chófer","bulevar","garaje","boutique","croissant","menú","hotel","carné","bricolaje","maquillaje","chalé","beis"].map(w => ({w, o:"galicismo"})),
  ...["almohada","aceite","azúcar","alcalde","aldea","ojalá","azotea","alfombra","algodón","zanahoria","jarabe","albañil"].map(w => ({w, o:"arabismo"})),
  ...["piano","soneto","novela","pizza","espagueti","balcón","fachada","escopeta","soprano","partitura","bancarrota"].map(w => ({w, o:"italianismo"})),
  ...["tomate","chocolate","patata","canoa","huracán","cacao","maíz","tiburón","hamaca","cacahuete","chicle"].map(w => ({w, o:"americanismo"})),
];
const ORIGEN = {
  anglicismo:{de:"inglés", alt:["ingles","del ingles","anglicismos"]},
  galicismo:{de:"francés", alt:["frances","del frances","galicismos"]},
  arabismo:{de:"árabe", alt:["arabe","del arabe","arabismos"]},
  italianismo:{de:"italiano", alt:["italiano","del italiano","italianismos"]},
  americanismo:{de:"lenguas indígenas de América (náhuatl, taíno, quechua…)", alt:["indigenismo","amerindio","lenguas de america","indigena","americanismos"]},
};

/* ─── Variedades ─── */
const VARIEDADES = [
  {f:"«Vos tenés que venir mañana» (Buenos Aires)", t:"diatópica", por:"El voseo es propio de una zona: Argentina, Uruguay, parte de Centroamérica. Variación por lugar."},
  {f:"«Hase musho calor» por «hace mucho calor» (Sevilla)", t:"diatópica", por:"Ceceo/seseo y aspiración son rasgos andaluces: dependen del lugar."},
  {f:"«Coger el autobús» en España / «tomar el camión» en México", t:"diatópica", por:"La misma realidad tiene nombres distintos según el país: variación geográfica."},
  {f:"«Ustedes vais a llegar tarde» (Canarias)", t:"diatópica", por:"Usar 'ustedes' como plural de confianza es propio de Canarias y Andalucía occidental."},
  {f:"«¿Quieres un zumo o un jugo?» (España / América)", t:"diatópica", por:"'Zumo' en España y 'jugo' en América: léxico que cambia con el territorio."},
  {f:"«Mi pibe ya fue a la facu»", t:"diatópica", por:"'Pibe' y 'facu' son rioplatenses: variación por lugar."},
  {f:"«Haiga» por «haya» o «semos» por «somos»", t:"diastrática", por:"Son vulgarismos: dependen del nivel de instrucción del hablante, no de dónde es ni de la situación."},
  {f:"«Me se ha caído» por «se me ha caído»", t:"diastrática", por:"Vulgarismo: alteración propia de un nivel sociocultural bajo."},
  {f:"Un médico dice «presenta una cefalea tensional»", t:"diastrática", por:"El nivel culto y la jerga profesional dependen de la formación y el grupo social del hablante."},
  {f:"«Mola mazo, tío, qué guay»", t:"diastrática", por:"Jerga juvenil: depende del grupo social (la edad), no de la situación concreta."},
  {f:"«Andé» por «anduve», «dijistes» por «dijiste»", t:"diastrática", por:"Vulgarismos en la conjugación: nivel sociocultural."},
  {f:"En un correo al director: «Le ruego que tenga a bien considerar mi solicitud»", t:"diafásica", por:"El mismo hablante elige un registro formal porque la situación lo pide."},
  {f:"Por WhatsApp a un amigo: «q tal? nos vemos luego?»", t:"diafásica", por:"Registro coloquial elegido por el canal y la confianza: variación por situación."},
  {f:"Un alumno dice en clase «buenos días, ¿puedo pasar?» y en el recreo «¿qué pasa, tío?»", t:"diafásica", por:"Es la misma persona: lo que cambia es la situación. Eso es la variación diafásica."},
  {f:"Un juez en el juicio: «Se declara probado que…»", t:"diafásica", por:"El registro formal jurídico lo impone la situación comunicativa."},
  {f:"Una madre al bebé: «¿Quién es mi niño guapo?»", t:"diafásica", por:"Registro familiar y afectivo propio de la situación, no del lugar ni del nivel social."},
];
const VARALT = {
  "diatópica":["geografica","diatopica","dialectal","por el lugar","geografico"],
  "diastrática":["social","sociocultural","diastratica","nivel","nivel sociocultural"],
  "diafásica":["situacional","registro","diafasica","estilistica","por la situacion"],
};

Object.assign(EJERCICIOS, {

  relacionSemantica: {
    titulo: "¿Qué relación tienen?",
    genera(){
      const tipo = elige(["sinonimo","antonimo","hiper","hiper"]);
      let a, b, r, por;
      if (tipo === "sinonimo"){ [a, b] = tomaLex(elige(SINONIMOS), 2); r = "sinonimo";
        por = `«${a}» y «${b}» significan lo mismo (o casi) y se pueden cambiar en muchas frases.`; }
      else if (tipo === "antonimo"){ [a, b] = barajaLex(elige(ANTONIMOS)); r = "antonimo";
        por = `«${a}» y «${b}» tienen significados opuestos.`; }
      else { const [g, hs] = elige(HIPER), h = elige(hs);
        if (Math.random() < .5){ a = g; b = h; r = "hiperonimo"; por = `«${g}» es la palabra general que incluye a «${h}» (y a otras): es su hiperónimo.`; }
        else { a = h; b = g; r = "hiponimo"; por = `«${h}» es un tipo concreto de «${g}»: es su hipónimo.`; } }
      return {textoPlano: true,
        enunciado: `¿Qué es «${a}» respecto de «${b}»?<br><span class="mini">Escribe: sinónimo, antónimo, hiperónimo o hipónimo</span>`,
        respuesta: RELNOM[r],
        respuestaAlt: [r + "s", {sinonimo:"sinonimia", antonimo:"antonimia", hiperonimo:"hiperonimia", hiponimo:"hiponimia"}[r]],
        pista: "¿Significan lo mismo, lo contrario, o una es un tipo de la otra? Si es un tipo, ¿cuál es la general?",
        pasos: [por, r === "hiperonimo" || r === "hiponimo" ? "Truco: «un/una ___ es un tipo de ___». La que va detrás es el hiperónimo." : "", `Respuesta: <b>${RELNOM[r]}</b>.`].filter(Boolean)};
    }},

  polisemiaHomonimia: {
    titulo: "¿Polisemia u homonimia?",
    genera(){
      const e = elige(PALABRAS_PH), [f1, f2] = barajaLex(e.f);
      const homofona = e.p.includes("/");
      return {textoPlano: true,
        enunciado: `<b>${e.p}</b><br>1. ${f1}<br>2. ${f2}<br><span class="mini">¿Es un caso de polisemia o de homonimia?</span>`,
        respuesta: e.r,
        respuestaAlt: e.r === "polisemia" ? ["polisemica","polisemico","polisemicas"] : ["homonima","homonimas","homonimos","homonimo"].concat(homofona ? ["homofona","homofonas","homofonia"] : ["homografa","homografas"]),
        pista: "¿Los dos sentidos tienen algo que ver (uno sale del otro) o coinciden por pura casualidad? Piensa también si son de la misma clase de palabra.",
        pasos: [e.r === "polisemia" ? "Los dos sentidos están emparentados: uno se explica a partir del otro." : "Los dos sentidos no tienen nada que ver: coinciden en la forma por azar.",
          e.por, e.r === "polisemia" ? "En el diccionario: <b>una</b> entrada con varias acepciones → <b>polisemia</b>." : `En el diccionario: entradas <b>distintas</b> → <b>homonimia</b>${homofona ? " (homófonas: suenan igual, se escriben distinto)" : ""}.`]};
    }},

  denotacion: {
    titulo: "¿Denotativo o connotativo?",
    genera(){
      const e = elige(DENOT);
      return {textoPlano: true,
        enunciado: `${e.f}<br><span class="mini">La palabra en negrita, ¿tiene sentido denotativo o connotativo?</span>`,
        respuesta: e.t,
        respuestaAlt: e.t === "denotativo" ? ["denotacion","denotativa","literal","objetivo"] : ["connotacion","connotativa","figurado","subjetivo"],
        pista: "¿Habla de la cosa tal cual la define el diccionario, o le añade una idea, un valor o una emoción?",
        pasos: [e.por, `Es uso <b>${e.t}</b>.`]};
    }},

  intrusoCampo: {
    titulo: "Encuentra al intruso",
    genera(){
      const [c, otro] = tomaLex(CAMPOS, 2);
      const intruso = elige(otro.m), lista = barajaLex(tomaLex(c.m, 4).concat(intruso));
      return {textoPlano: true,
        enunciado: `${lista.join(" · ")}<br><span class="mini">Cuatro forman un campo semántico. ¿Qué palabra sobra?</span>`,
        respuesta: intruso,
        pista: "Busca el rasgo de significado que comparten casi todas. La que no lo tiene es la intrusa.",
        pasos: [`Las otras cuatro son <b>${c.n}</b>: comparten ese rasgo de significado.`, `«${intruso}» pertenece a otro campo: <b>${otro.n}</b>.`, `Sobra <b>${intruso}</b>.`]};
    }},

  nombreCampo: {
    titulo: "¿Qué campo semántico?",
    genera(){
      const c = elige(CAMPOS), lista = tomaLex(c.m, 5);
      return {textoPlano: true,
        enunciado: `${lista.join(", ")}…<br><span class="mini">¿A qué campo semántico pertenecen? Escribe su nombre (por ejemplo: «muebles»).</span>`,
        respuesta: c.n,
        respuestaAlt: c.alt,
        pista: "Pregúntate: «todas son tipos de…». Ese «…» es el nombre del campo.",
        pasos: [`Todas son tipos de <b>${c.n}</b>: comparten esa parte del significado.`, "Fíjate: son de la misma categoría (sustantivos) y se pueden repartir entre ellas el espacio de significado. Eso es un campo semántico.", `Campo: <b>${c.n}</b>.`]};
    }},

  prestamoOrigen: {
    titulo: "¿De qué lengua viene?",
    genera(){
      const e = elige(PRESTAMOS), o = ORIGEN[e.o];
      return {textoPlano: true,
        enunciado: `«${e.w}»<br><span class="mini">Es un préstamo. ¿Qué tipo? (anglicismo, galicismo, arabismo, italianismo o americanismo)</span>`,
        respuesta: e.o,
        respuestaAlt: o.alt,
        pista: e.o === "arabismo" ? "Muchas palabras que empiezan por «al-» o «a-» vinieron en la Edad Media." : "Piensa en el campo: deporte y tecnología suelen venir del inglés; música y arte, del italiano; moda y cocina, del francés; productos americanos, de lenguas indígenas.",
        pasos: [`«${e.w}» viene del <b>${o.de}</b>.`, `Por eso es un <b>${e.o}</b>.`]};
    }},

  variedadLengua: {
    titulo: "¿Qué variedad de la lengua?",
    genera(){
      const e = elige(VARIEDADES);
      return {textoPlano: true,
        enunciado: `${e.f}<br><span class="mini">¿Qué tipo de variación muestra? (diatópica, diastrática o diafásica)</span>`,
        respuesta: e.t,
        respuestaAlt: VARALT[e.t],
        pista: "¿Depende de dónde es el hablante (lugar), de su nivel social o formación (grupo), o de la situación en que habla?",
        pasos: [e.por, `Variación <b>${e.t}</b>: ${e.t === "diatópica" ? "por el lugar" : e.t === "diastrática" ? "por el nivel social" : "por la situación"}.`]};
    }},
});
})();
