/* ejercicios-pas.js — passive voice and reported speech.
   Se combinan bancos (agente, verbo, objeto, tiempo), pero cada verbo solo se junta
   con sus objetos y agentes: así la frase siempre tiene sentido. Las formas
   irregulares van escritas a mano en cada verbo. */
(function(){

const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const sinMay = s => s.charAt(0).toLowerCase() + s.slice(1);

/* ---------- PASIVA: banco de verbos ----------
   v: [base, 3ª persona, pasado, participio, -ing]
   ag: agentes [texto, singular?]   ob: objetos [texto, singular?]
   rutina: la frase en present simple tiene sentido («every week») */
const VERBOS = [
  {v:["clean","cleans","cleaned","cleaned","cleaning"], ag:[["the cleaners",0],["my dad",1]], ob:[["the classroom",1],["the windows",0]], rutina:1},
  {v:["write","writes","wrote","written","writing"], ag:[["the students",0],["a famous author",1]], ob:[["the report",1],["these poems",0]]},
  {v:["build","builds","built","built","building"], ag:[["the workers",0],["a local company",1]], ob:[["a new bridge",1],["two new schools",0]]},
  {v:["steal","steals","stole","stolen","stealing"], ag:[["a thief",1],["two men",0]], ob:[["my bike",1],["the paintings",0]]},
  {v:["repair","repairs","repaired","repaired","repairing"], ag:[["the mechanic",1],["the technicians",0]], ob:[["the car",1],["the lifts",0]]},
  {v:["send","sends","sent","sent","sending"], ag:[["the school",1],["the teachers",0]], ob:[["an email",1],["the invitations",0]], rutina:1},
  {v:["make","makes","made","made","making"], ag:[["my grandmother",1],["the chefs",0]], ob:[["the pizza",1],["the cakes",0]], rutina:1},
  {v:["choose","chooses","chose","chosen","choosing"], ag:[["the judges",0],["the coach",1]], ob:[["the winner",1],["the players",0]]},
  {v:["break","breaks","broke","broken","breaking"], ag:[["the children",0],["my little brother",1]], ob:[["the window",1],["the glasses",0]]},
  {v:["sell","sells","sold","sold","selling"], ag:[["the shop",1],["the farmers",0]], ob:[["the house",1],["the tickets",0]], rutina:1},
  {v:["take","takes","took","taken","taking"], ag:[["a tourist",1],["the photographers",0]], ob:[["the picture",1],["these photos",0]]},
  {v:["teach","teaches","taught","taught","teaching"], ag:[["Mr Jones",1],["native speakers",0]], ob:[["the lesson",1],["the English classes",0]], rutina:1},
  {v:["find","finds","found","found","finding"], ag:[["the police",0],["a dog",1]], ob:[["the missing wallet",1],["the keys",0]]},
  {v:["eat","eats","ate","eaten","eating"], ag:[["the guests",0],["my brother",1]], ob:[["the last biscuit",1],["the sandwiches",0]]},
  {v:["drive","drives","drove","driven","driving"], ag:[["my uncle",1],["the drivers",0]], ob:[["the bus",1],["the lorries",0]], rutina:1},
  {v:["sing","sings","sang","sung","singing"], ag:[["the choir",1],["the fans",0]], ob:[["the national anthem",1],["the songs",0]], rutina:1},
  {v:["throw","throws","threw","thrown","throwing"], ag:[["someone",1],["the neighbours",0]], ob:[["a stone",1],["the old toys",0]]},
  {v:["hide","hides","hid","hidden","hiding"], ag:[["the pirates",0],["my sister",1]], ob:[["the treasure",1],["the presents",0]]},
];

/* tiempos: forma activa (agente) y pasiva (objeto) */
const TIEMPOS = {
  presS:{n:"present simple", t:"every week",
    act:(v,sg)=> sg ? v[1] : v[0], pas:(v,sg)=> (sg?"is ":"are ") + v[3]},
  presC:{n:"present continuous", t:"right now",
    act:(v,sg)=> (sg?"is ":"are ") + v[4], pas:(v,sg)=> (sg?"is":"are") + " being " + v[3]},
  pastS:{n:"past simple", t:"yesterday",
    act:(v)=> v[2], pas:(v,sg)=> (sg?"was ":"were ") + v[3]},
  pastC:{n:"past continuous", t:"when I arrived",
    act:(v,sg)=> (sg?"was ":"were ") + v[4], pas:(v,sg)=> (sg?"was":"were") + " being " + v[3]},
  presP:{n:"present perfect", t:"",
    act:(v,sg)=> (sg?"has ":"have ") + v[3], pas:(v,sg)=> (sg?"has":"have") + " been " + v[3]},
  pastP:{n:"past perfect", t:"before we arrived",
    act:(v)=> "had " + v[3], pas:(v)=> "had been " + v[3]},
  will:{n:"future (will)", t:"tomorrow",
    act:(v)=> "will " + v[0], pas:(v)=> "will be " + v[3]},
  going:{n:"future (going to)", t:"next week",
    act:(v,sg)=> (sg?"is":"are") + " going to " + v[0], pas:(v,sg)=> (sg?"is":"are") + " going to be " + v[3]},
  must:{n:"modal (must)", t:"",
    act:(v)=> "must " + v[0], pas:(v)=> "must be " + v[3]},
  should:{n:"modal (should)", t:"",
    act:(v)=> "should " + v[0], pas:(v)=> "should be " + v[3]},
};
const CLAVES = Object.keys(TIEMPOS);

/* contracciones y formas largas que valen igual */
function variantes(r){
  const out = new Set([r]);
  const pares = [["will ","'ll "],["would ","'d "],["had ","'d "]];
  pares.forEach(([a,b]) => { if (r.startsWith(a)) out.add(b + r.slice(a.length)); });
  return [...out];
}

function frasePasiva(){
  const V = elige(VERBOS);
  const claves = CLAVES.filter(k => k !== "presS" || V.rutina);
  const k = elige(claves), T = TIEMPOS[k];
  const [ag, agSg] = elige(V.ag), [ob, obSg] = elige(V.ob);
  const t = T.t ? " " + T.t : "";
  return {V, k, T, ag, agSg, ob, obSg, t,
    activa: `${cap(ag)} ${T.act(V.v, agSg)} ${ob}${t}.`,
    pasiva: T.pas(V.v, obSg)};
}

/* ---------- PASIVA CON DOS OBJETOS ---------- */
const DOS = [
  {v:["give","gave","given"], cosas:[["a prize",1],["the keys",0],["a present",1]]},
  {v:["send","sent","sent"], cosas:[["a letter",1],["some photos",0]]},
  {v:["offer","offered","offered"], cosas:[["a place on the course",1],["two free tickets",0]]},
  {v:["show","showed","shown"], cosas:[["the new classroom",1],["the results",0]]},
  {v:["lend","lent","lent"], cosas:[["some money",1],["the books",0]]},
  {v:["promise","promised","promised"], cosas:[["a pay rise",1],["two extra days off",0]]},
  {v:["teach","taught","taught"], cosas:[["a lesson",1],["some useful tricks",0]]},
];
/* destinatario: [en la activa, como sujeto pasivo, forma de be en presente, singular?] */
const PERSONAS = [
  ["Ana","Ana","is",1], ["the students","The students","are",0], ["me","I","am",1],
  ["us","We","are",0], ["him","He","is",1], ["her","She","is",1],
];
const T2 = {
  pastS:{n:"past simple", act:v=>v[1], pas:(v,pr,sg)=> (pr==="am"||sg ? "was " : "were ") + v[2]},
  presP:{n:"present perfect", act:v=>"have " + v[2], pas:(v,pr,sg)=> (pr==="is" ? "has" : "have") + " been " + v[2]},
  will:{n:"future (will)", act:v=>"will " + v[0], pas:v=> "will be " + v[2]},
  presS:{n:"present simple", act:v=>v[0], pas:(v,pr)=> pr + " " + v[2]},
};

/* ---------- IT IS SAID THAT / HE IS SAID TO ---------- */
const RUMORES = [
  {s:"the singer", sg:1, pr:["lives","live","in a castle"], pa:["bought","have bought","an island"]},
  {s:"the thieves", sg:0, pr:["are hiding","be hiding","in the mountains"], pa:["escaped","have escaped","to France"]},
  {s:"the president", sg:1, pr:["is","be","very ill"], pa:["lied","have lied","to the press"]},
  {s:"the old house", sg:1, pr:["is","be","haunted"], pa:["belonged","have belonged","to a pirate"]},
  {s:"these pills", sg:0, pr:["cure","cure","headaches in minutes"], pa:["caused","have caused","serious side effects"]},
  {s:"the twins", sg:0, pr:["speak","speak","five languages"], pa:["won","have won","the lottery"]},
  {s:"the coach", sg:1, pr:["is planning","be planning","to resign"], pa:["left","have left","the club"]},
  {s:"the new phones", sg:0, pr:["are","be","too expensive"], pa:["sold","have sold","out in an hour"]},
];
const DECIR = [["say","said"],["believe","believed"],["think","thought"],["report","reported"]];

/* ---------- REPORTED SPEECH ---------- */
/* hablantes: [nombre, pronombre, posesivo, yo directo (I/We), singular?] */
const HABLANTES = [
  ["Ana","she","her","I",1], ["Tom","he","his","I",1], ["Lucía","she","her","I",1],
  ["My parents","they","their","We",0], ["The students","they","their","We",0], ["Mr Jones","he","his","I",1],
];
/* verbos: [base, pasado, participio, -ing]; be y have aparte */
const RV = {
  be:null,
  work:["work","worked","worked","working"], live:["live","lived","lived","living"],
  finish:["finish","finished","finished","finishing"], see:["see","saw","seen","seeing"],
  buy:["buy","bought","bought","buying"], go:["go","went","gone","going"],
  meet:["meet","met","met","meeting"], write:["write","wrote","written","writing"],
  lose:["lose","lost","lost","losing"], call:["call","called","called","calling"],
  study:["study","studied","studied","studying"], visit:["visit","visited","visited","visiting"],
};
/* frases: [verbo, tiempo, resto directo, resto reportado]; {pos} = my/our → his/her/their */
const DICHOS = [
  ["be","presS","tired today","tired that day"],
  ["be","pastS","ill yesterday","ill the day before"],
  ["be","will","at home tomorrow","at home the next day"],
  ["work","presC","on a new project now","on a new project then"],
  ["live","presS","in Bilbao","in Bilbao"],
  ["live","presP","here since 2015","there since 2015"],
  ["finish","presP","{pos} homework","{pos} homework"],
  ["see","pastS","a ghost last night","a ghost the night before"],
  ["buy","will","a new phone next week","a new phone the following week"],
  ["buy","pastS","these trainers yesterday","those trainers the day before"],
  ["go","going","to London this summer","to London that summer"],
  ["meet","pastS","the director last week","the director the week before"],
  ["write","presC","a novel","a novel"],
  ["lose","presP","{pos} keys","{pos} keys"],
  ["call","will","the police tomorrow","the police the next day"],
  ["study","must","harder","harder"],
  ["study","can","in the library today","in the library that day"],
  ["visit","going","{pos} grandparents tomorrow","{pos} grandparents the next day"],
  ["work","can","from home this week","from home that week"],
  ["go","presS","to the gym every day","to the gym every day"],
];
function directo(verbo, k, yo){
  const sg = yo === "I";
  if (verbo === "be"){
    return {presS: sg?"am":"are", pastS: sg?"was":"were", will:"will be", presP:"have been"}[k];
  }
  const v = RV[verbo];
  return {presS:v[0], presC:(sg?"am ":"are ")+v[3], pastS:v[1], presP:"have "+v[2], will:"will "+v[0],
    can:"can "+v[0], must:"must "+v[0], going:(sg?"am":"are")+" going to "+v[0]}[k];
}
/* devuelve [respuesta, alternativas, explicación del cambio] */
function reportado(verbo, k, sg){
  const was = sg ? "was" : "were";
  if (verbo === "be"){
    return {presS:[was,[],"am/are → was/were"], pastS:["had been",["'d been",was],"was/were → had been (en lengua hablada se oye también was/were)"],
      will:["would be",["'d be"],"will → would"], presP:["had been",["'d been"],"have been → had been"]}[k];
  }
  const v = RV[verbo];
  return {
    presS:[v[1],[],"present simple → past simple"],
    presC:[was+" "+v[3],[],"present continuous → past continuous"],
    pastS:["had "+v[2],["'d "+v[2], v[1]],"past simple → past perfect (si el orden está claro, se admite dejarlo en past simple)"],
    presP:["had "+v[2],["'d "+v[2]],"present perfect → past perfect"],
    will:["would "+v[0],["'d "+v[0]],"will → would"],
    can:["could "+v[0],[],"can → could"],
    must:["had to "+v[0],["must "+v[0]],"must → had to (must también se admite)"],
    going:[was+" going to "+v[0],[],"am/are going to → was/were going to"],
  }[k];
}

/* ---------- REPORTED QUESTIONS ---------- */
/* d: pregunta directa (a «you»). r(S, be, pl): reportada con S = I/we */
const PREGUNTAS = [
  {d:"Where do you live?", r:S=>`where ${S} lived`, cambio:"do + live → lived, y el sujeto delante del verbo"},
  {d:"What time did you get up?", r:S=>`what time ${S} had got up`, alt:S=>[`what time ${S} had gotten up`,`what time ${S} got up`], cambio:"did get → had got"},
  {d:"Are you tired?", r:(S,be)=>`if ${S} ${be} tired`, cambio:"pregunta de sí/no → if; are → was/were"},
  {d:"Do you like horror films?", r:S=>`if ${S} liked horror films`, cambio:"sí/no → if; do + like → liked"},
  {d:"Why are you laughing?", r:(S,be)=>`why ${S} ${be} laughing`, cambio:"are laughing → was/were laughing, sin inversión"},
  {d:"Have you finished?", r:S=>`if ${S} had finished`, cambio:"sí/no → if; have finished → had finished"},
  {d:"Can you swim?", r:S=>`if ${S} could swim`, cambio:"sí/no → if; can → could"},
  {d:"Where are you going?", r:(S,be)=>`where ${S} ${be} going`, cambio:"are going → was/were going, sujeto delante"},
  {d:"What will you do next year?", r:S=>`what ${S} would do the following year`, alt:S=>[`what ${S} would do the next year`], cambio:"will → would; next year → the following year"},
  {d:"How long have you been here?", r:S=>`how long ${S} had been there`, cambio:"have been → had been; here → there"},
  {d:"Who did you see at the party?", r:S=>`who ${S} had seen at the party`, alt:S=>[`who ${S} saw at the party`], cambio:"did see → had seen"},
  {d:"Did you enjoy the film?", r:S=>`if ${S} had enjoyed the film`, alt:S=>[`if ${S} enjoyed the film`], cambio:"sí/no → if; did enjoy → had enjoyed"},
  {d:"Is this your bag?", r:(S,be,pl)=>`if that was ${pl?"our":"my"} bag`, cambio:"sí/no → if; this → that; your → my/our"},
  {d:"How often do you play tennis?", r:S=>`how often ${S} played tennis`, cambio:"do + play → played"},
];
const PREGUNTONES = ["Ana","My teacher","The doctor","Tom","The police officer","My grandmother"];

/* ---------- REPORTED ORDERS ---------- */
const ORDENES = [
  ["Close the door.","close the door"], ["Don't shout.","not shout"], ["Sit down.","sit down"],
  ["Don't touch that cable.","not touch that cable"], ["Turn off your phones.","turn off our phones"],
  ["Don't be late.","not be late"], ["Wait outside.","wait outside"], ["Don't run in the corridor.","not run in the corridor"],
  ["Hand in the essay on Friday.","hand in the essay on Friday"], ["Don't eat in class.","not eat in class"],
  ["Please help me.","help {pro}"], ["Please lend me a pen.","lend {pro} a pen"],
];
/* [quién, verbo de orden, verbo de decir, pronombre objeto] */
const MANDONES = [["Ms Smith","told","said","her"],["My mum","told","said","her"],["Mr Jones","ordered","shouted","him"],["My dad","told","said","him"],["Grandad","advised","said","him"]];

Object.assign(EJERCICIOS, {
  aPasiva: {
    titulo: "Active → passive",
    genera(){
      const f = frasePasiva();
      const by = f.ag === "someone" ? "" : ` by ${f.ag}`;
      const resto = `${by}${f.t}`;
      const alt = variantes(f.pasiva).concat(variantes(f.pasiva).map(x => x + by));
      return {textoPlano: true,
        enunciado: `«${f.activa}»<br>→ ${cap(f.ob)} <b>_____</b>${resto}.<br><span class="mini">Write only the passive verb</span>`,
        respuesta: f.pasiva, respuestaAlt: alt,
        pista: `The verb is in ${f.T.n}. Keep that tense in «be», then add the past participle.`,
        pasos: [`Tense of the active verb: <b>${f.T.n}</b>.`,
          `New subject: «${f.ob}» → ${f.obSg ? "singular" : "plural"}, so «be» must agree with it.`,
          `Past participle of «${f.V.v[0]}»: <b>${f.V.v[3]}</b>.`,
          `→ ${cap(f.ob)} <b>${f.pasiva}</b>${resto}.`]};
    }},
  pasivaTiempo: {
    titulo: "Passive in every tense",
    genera(){
      const f = frasePasiva();
      return {textoPlano: true,
        enunciado: `${cap(f.ob)} <b>_____</b>${f.t}. <span class="mini">(${f.V.v[0]} · ${f.T.n} · passive)</span>`,
        respuesta: f.pasiva, respuestaAlt: variantes(f.pasiva),
        pista: "be in that tense + past participle. Is the subject singular or plural?",
        pasos: [`${f.T.n} of «be» with «${f.ob}» (${f.obSg ? "singular" : "plural"}).`,
          `Participle: ${f.V.v[0]} → <b>${f.V.v[3]}</b>.`, `Answer: <b>${f.pasiva}</b>.`]};
    }},
  pasivaDosObjetos: {
    titulo: "Passive with two objects",
    genera(){
      const V = elige(DOS), [cosa, cSg] = elige(V.cosas), P = elige(PERSONAS);
      const k = elige(Object.keys(T2)), T = T2[k];
      const activa = `They ${T.act(V.v)} ${P[0]} ${cosa}.`;
      const personal = Math.random() < .6;
      let r, enun, por;
      if (personal){
        r = T.pas(V.v, P[2], P[3]);
        enun = `${P[1]} <b>_____</b> ${cosa}.`;
        por = `The person becomes the subject: «${P[0]}» → «${P[1]}». «be» agrees with ${P[1]}.`;
      } else {
        const pr = cSg ? "is" : "are";
        r = T.pas(V.v, pr, cSg);
        enun = `${cap(cosa)} <b>_____</b> to ${P[0]}.`;
        por = `The thing becomes the subject: «${cosa}» (${cSg ? "singular" : "plural"}), and the person goes after «to».`;
      }
      return {textoPlano: true,
        enunciado: `«${activa}»<br>→ ${enun}<br><span class="mini">Write only the passive verb</span>`,
        respuesta: r, respuestaAlt: variantes(r),
        pista: `Tense: ${T.n}. Look at the new subject to choose the form of «be».`,
        pasos: [por, `${T.n} passive: be + <b>${V.v[2]}</b>.`, `Answer: <b>${r}</b>.`]};
    }},
  pasivaImpersonal: {
    titulo: "It is said that… / He is said to…",
    genera(){
      const R = elige(RUMORES), [dv, dp] = elige(DECIR);
      const pasado = Math.random() < .5;
      const [fin, inf, resto] = pasado ? R.pa : R.pr;
      const be = R.sg ? "is" : "are";
      const activa = `People ${dv} that ${R.s} ${fin} ${resto}.`;
      if (Math.random() < .3){
        return {textoPlano: true,
          enunciado: `«${activa}»<br>→ It <b>_____</b> that ${R.s} ${fin} ${resto}.<br><span class="mini">Write only the missing words</span>`,
          respuesta: `is ${dp}`, respuestaAlt: [],
          pista: "«It» is singular, and the reporting verb goes into the passive.",
          pasos: [`«People ${dv}» → «It is ${dp}».`, "With «It», the rest of the sentence doesn't change.", `Answer: <b>is ${dp}</b>.`]};
      }
      const r = `${be} ${dp} to ${inf}`;
      return {textoPlano: true,
        enunciado: `«${activa}»<br>→ ${cap(R.s)} <b>_____</b> ${resto}.<br><span class="mini">Write the verb with «to»</span>`,
        respuesta: r, respuestaAlt: [],
        pista: pasado ? "The rumour is about something earlier → to have + participle." : "Same time as the rumour → to + infinitive.",
        pasos: [`«${cap(R.s)}» is ${R.sg ? "singular → is" : "plural → are"} ${dp}.`,
          pasado ? `«${fin}» happened before → <b>to ${inf}</b> (perfect infinitive).` : `«${fin}» is happening now → <b>to ${inf}</b>.`,
          `Answer: <b>${r}</b>.`]};
    }},
  aReported: {
    titulo: "Reported statements",
    genera(){
      const [nom, pro, pos, yo, sg] = elige(HABLANTES);
      const [verbo, k, dRest, rRest] = elige(DICHOS);
      const posD = yo === "I" ? "my" : "our";
      const d = `${yo} ${directo(verbo, k, yo)} ${dRest.replace("{pos}", posD)}`;
      const [r, alt, cambio] = reportado(verbo, k, sg);
      const verboDijo = elige(["said","told me"]);
      const rr = rRest.replace("{pos}", pos);
      return {textoPlano: true,
        enunciado: `${nom} ${verboDijo === "said" ? "said" : "told me"}, «${d}.»<br>→ ${nom} ${verboDijo} that ${pro} <b>_____</b> ${rr}.<br><span class="mini">Write only the verb</span>`,
        respuesta: r, respuestaAlt: alt,
        pista: "One step back in time: present → past, past → past perfect, will → would, can → could.",
        pasos: [`${yo} → ${pro}${dRest.includes("{pos}") ? `; ${posD} → ${pos}` : ""}.`, `Tense: ${cambio}.`,
          dRest !== rRest && !dRest.includes("{pos}") ? `Time and place words change too: «${dRest}» → «${rRest}».` : "Nothing else needs changing here.",
          `Answer: <b>${r}</b>.`]};
    }},
  preguntaReportada: {
    titulo: "Reported questions",
    genera(){
      const Q = elige(PREGUNTAS), quien = elige(PREGUNTONES);
      const pl = Math.random() < .35;
      const S = pl ? "we" : "I", be = pl ? "were" : "was", obj = pl ? "us" : "me";
      const r = Q.r(S, be, pl);
      const alt = [];
      if (r.startsWith("if ")) alt.push("whether " + r.slice(3));
      if (Q.alt) Q.alt(S).forEach(a => { alt.push(a); if (a.startsWith("if ")) alt.push("whether " + a.slice(3)); });
      return {textoPlano: true,
        enunciado: `${quien} asked ${obj}, «${Q.d}»<br>→ ${quien} asked ${obj} <b>_____</b>.<br><span class="mini">Write the rest of the sentence, without a question mark</span>`,
        respuesta: r, respuestaAlt: alt,
        pista: "No do/did, no question mark, subject before verb. Yes/no questions → if.",
        pasos: [`you → ${S} (you're reporting what was asked to ${obj}).`, Q.cambio + ".",
          "Word order of a statement: subject + verb.", `Answer: <b>${r}</b>.`]};
    }},
  ordenReportada: {
    titulo: "Reported orders and requests",
    genera(){
      const [d, rr0] = elige(ORDENES), [quien, verbo, dijo, pro] = elige(MANDONES);
      const rr = rr0.replace("{pro}", pro);
      const pide = d.startsWith("Please");
      const v = pide ? "asked" : verbo;
      const neg = rr.startsWith("not ");
      const r = neg ? "not to " + rr.slice(4) : "to " + rr;
      const nuestro = rr.includes("our ");
      const obj = nuestro ? "us" : elige(["me","us"]);
      return {textoPlano: true,
        enunciado: `${quien} ${pide ? "said to" : dijo + " to"} ${obj}, «${d}»<br>→ ${quien} ${v} ${obj} <b>_____</b>.<br><span class="mini">Write the rest, starting with «to» or «not to»</span>`,
        respuesta: r, respuestaAlt: [],
        pista: neg ? "Negative order → not to + infinitive." : "Order or request → to + infinitive.",
        pasos: [neg ? "«Don't …» → <b>not to</b> + infinitive." : "Imperative → <b>to</b> + infinitive.",
          d.includes(" me") || d.includes("your") ? (d.includes(" me") ? `Pronouns change: me → ${pro}.` : "Pronouns change: your → our.") : "Nothing else changes.",
          `Answer: <b>${r}</b>.`]};
    }},
});
})();
