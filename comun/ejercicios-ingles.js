/* ejercicios-ingles.js — generadores de inglés.
   Enunciados en texto (textoPlano), no en fórmulas. La corrección admite mayúsculas,
   minúsculas y contracciones: didn't = did not. */

const VERBOS = [
  {obj:false, inf:"go", past:"went", pp:"gone", ing:"going", tr:"ir"},
  {obj:true, inf:"see", past:"saw", pp:"seen", ing:"seeing", tr:"ver"},
  {obj:true, inf:"write", past:"wrote", pp:"written", ing:"writing", tr:"escribir"},
  {obj:true, inf:"eat", past:"ate", pp:"eaten", ing:"eating", tr:"comer"},
  {obj:true, inf:"buy", past:"bought", pp:"bought", ing:"buying", tr:"comprar"},
  {obj:true, inf:"take", past:"took", pp:"taken", ing:"taking", tr:"coger"},
  {obj:true, inf:"break", past:"broke", pp:"broken", ing:"breaking", tr:"romper"},
  {obj:false, inf:"leave", past:"left", pp:"left", ing:"leaving", tr:"irse"},
  {obj:true, inf:"find", past:"found", pp:"found", ing:"finding", tr:"encontrar"},
  {obj:false, inf:"speak", past:"spoke", pp:"spoken", ing:"speaking", tr:"hablar"},
  {obj:true, inf:"lose", past:"lost", pp:"lost", ing:"losing", tr:"perder"},
  {obj:false, inf:"meet", past:"met", pp:"met", ing:"meeting", tr:"conocer"},
];
const SUJ_ING = [
  {t:"I", tercera:false}, {t:"You", tercera:false}, {t:"He", tercera:true},
  {t:"She", tercera:true}, {t:"We", tercera:false}, {t:"They", tercera:false},
];

Object.assign(EJERCICIOS, {

  huecoVerbal: {
    titulo: "Completa con el tiempo correcto",
    genera(){
      const v = elige(VERBOS.filter(x => x.obj)), s = elige(SUJ_ING);
      // cada marca temporal con una frase que suene natural en inglés de verdad
      const casos = [
        {frase:`${s.t} ____ (${v.inf}) it yesterday.`, r:v.past, clave:"yesterday",
         porque:"«Yesterday» es un momento pasado y terminado: past simple."},
        {frase:`${s.t} ____ (${v.inf}) it last week.`, r:v.past, clave:"last week",
         porque:"«Last + tiempo» cierra el periodo: past simple."},
        {frase:`${s.t} ____ (${v.inf}) it three times.`, r:`${s.tercera ? "has" : "have"} ${v.pp}`, clave:"three times",
         porque:"Número de veces sin decir cuándo: present perfect."},
        {frase:`${s.t} ____ (${v.inf}) it already.`, r:`${s.tercera ? "has" : "have"} ${v.pp}`, clave:"already",
         porque:"«Already» va con present perfect: ya está hecho, sin importar cuándo."},
        {frase:`${s.t} never ____ (${v.inf}) it.`, r:`${s.tercera ? "has" : "have"} ${v.pp}`, clave:"never",
         porque:"«Never» es experiencia de toda la vida: present perfect, y el never va entre el auxiliar y el participio."},
        {frase:`${s.t} ____ (${v.inf}) it right now.`, r:`${s.t === "I" ? "am" : s.tercera ? "is" : "are"} ${v.ing}`, clave:"right now",
         porque:"«Right now» es lo que pasa en este momento: present continuous."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<b>${c.frase}</b><br><span class="mini">Escribe solo lo que va en el hueco</span>`,
        respuesta: c.r,
        pista: `Fíjate en «${c.clave}»: esa palabra te dice el tiempo.`,
        pasos: [`La palabra clave es <b>${c.clave}</b>.`, c.porque,
          `Queda: <b>${c.frase.replace("____", c.r)}</b>`]};
    }},

  elegirTiempo: {
    titulo: "¿Past simple o present perfect?",
    genera(){
      const v = elige(VERBOS.filter(x => x.obj)), s = elige(SUJ_ING);
      const pasado = Math.random() < 0.5;
      const marca = pasado ? elige(["in 2019", "two days ago", "last summer", "when I was ten"])
                           : elige(["this week", "just", "so far", "ever"]);
      const r = pasado ? "past simple" : "present perfect";
      return {textoPlano: true,
        enunciado: `<b>${s.t} ____ (${v.inf}) it ${marca}.</b><br><span class="mini">¿Qué tiempo va aquí? Escribe «past simple» o «present perfect»</span>`,
        respuesta: r,
        pista: pasado ? "¿El momento está terminado y se dice cuál es?" : "¿El periodo sigue abierto o no se dice cuándo?",
        pasos: [`«${marca}» ${pasado ? "señala un momento pasado y terminado" : "no cierra el periodo o no dice cuándo"}.`,
          pasado ? `Con momento concreto del pasado se usa <b>past simple</b>: ${s.t} ${v.past} it ${marca}.`
                 : `Sin momento concreto o con el periodo abierto, <b>present perfect</b>: ${s.t} ${s.tercera ? "has" : "have"} ${v.pp} it ${marca}.`,
          `Regla corta: si puedes preguntar «¿cuándo exactamente?» y hay respuesta, es past simple.`]};
    }},

  corregirFrase: {
    titulo: "Encuentra el error",
    genera(){
      const v = elige(VERBOS.filter(x => x.obj)), s = elige(SUJ_ING.filter(x => x.tercera));
      const errores = [
        {mal:`${s.t} don't ${v.inf} much.`, bien:`${s.t} doesn't ${v.inf} much.`,
         porque:"Tercera persona del singular: <b>doesn't</b>, no «don't»."},
        {mal:`${s.t} doesn't ${v.past} it.`, bien:`${s.t} didn't ${v.inf} it.`,
         porque:"Tras el auxiliar va el <b>infinitivo</b>, y para pasado el auxiliar es «didn't»."},
        {mal:`${s.t} have ${v.pp} it.`, bien:`${s.t} has ${v.pp} it.`,
         porque:"Tercera persona: <b>has</b>, no «have»."},
        {mal:`Did ${s.t.toLowerCase()} ${v.past}?`, bien:`Did ${s.t.toLowerCase()} ${v.inf}?`,
         porque:"Después de «did» va el <b>infinitivo</b>: el pasado ya lo marca el auxiliar."},
        {mal:`${s.t} is ${v.inf} now.`, bien:`${s.t} is ${v.ing} now.`,
         porque:"Con el verbo «be» y «now» hace falta la forma <b>-ing</b>."},
      ];
      const e = elige(errores);
      return {textoPlano: true,
        enunciado: `<b>${e.mal}</b><br><span class="mini">Escribe la frase corregida</span>`,
        respuesta: e.bien,
        pista: "Mira el auxiliar y la forma del verbo que va detrás.",
        pasos: [e.porque, `Correcto: <b>${e.bien}</b>`,
          `Regla de oro: después de <b>do, does, did</b> y de los modales, siempre infinitivo sin «to».`]};
    }},

  verboIrregular: {
    titulo: "Verbos irregulares",
    genera(){
      const v = elige(VERBOS);
      const que = elige(["past", "pp"]);
      return {textoPlano: true,
        enunciado: `<b>${v.inf}</b> <span class="mini">(${v.tr})</span><br><span class="mini">Escribe el ${que === "past" ? "past simple (2.ª columna)" : "past participle (3.ª columna)"}</span>`,
        respuesta: v[que],
        pista: que === "past" ? "La forma que se usa con «yesterday»." : "La que va detrás de have/has.",
        pasos: [`${v.inf} — ${v.past} — ${v.pp}`,
          `El ${que === "past" ? "past simple" : "participio"} es <b>${v[que]}</b>.`,
          v.past === v.pp ? `En este verbo la segunda y la tercera columna son iguales: uno menos que memorizar.`
                          : `Ojo, en este verbo son distintas: ${v.past} para el pasado y ${v.pp} con have.`]};
    }},
});
