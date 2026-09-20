/* ejercicios-lengua.js — generadores de Lengua.
   Aquí el taller no da números: genera oraciones y pide identificar funciones.
   Las oraciones se arman por piezas, así que salen distintas cada vez pero siempre
   con la sintaxis controlada: sabemos qué es cada trozo porque lo hemos puesto nosotros. */

const SUJ = [
  {t:"Mi hermano", g:"m", n:"s"}, {t:"La profesora", g:"f", n:"s"}, {t:"Los vecinos", g:"m", n:"p"},
  {t:"Ese chico", g:"m", n:"s"}, {t:"Las niñas", g:"f", n:"p"}, {t:"El portero", g:"m", n:"s"},
  {t:"Mis primas", g:"f", n:"p"}, {t:"El entrenador", g:"m", n:"s"}, {t:"Tu madre", g:"f", n:"s"},
];
const VERBO_CD = [
  {s:"compró", p:"compraron", cd:["un móvil nuevo","dos entradas","el periódico","unas zapatillas"]},
  {s:"escribió", p:"escribieron", cd:["una carta","el mensaje","dos correos"]},
  {s:"rompió", p:"rompieron", cd:["la ventana","el cristal","los platos"]},
  {s:"vio", p:"vieron", cd:["la película","el partido","a Marta"]},
  {s:"leyó", p:"leyeron", cd:["el libro","tres capítulos","la noticia"]},
];
/* Solo verbos que admiten CI con naturalidad: «rompió la ventana a su hermana» chirría. */
const CI = ["a su hermana", "a los alumnos", "al portero", "a sus padres", "a su primo"];
const ADMITE_CI = ["compró", "escribió", "leyó"];
const CC = [
  {t:"ayer", tipo:"de tiempo"}, {t:"en el parque", tipo:"de lugar"}, {t:"muy despacio", tipo:"de modo"},
  {t:"con su amigo", tipo:"de compañía"}, {t:"por la mañana", tipo:"de tiempo"}, {t:"en el patio", tipo:"de lugar"},
  {t:"con mucho cuidado", tipo:"de modo"}, {t:"desde el balcón", tipo:"de lugar"},
];
const ATRIB = [
  {s:"es", p:"son", a:{m:{s:["muy simpático","el mejor de la clase","arquitecto"], p:["muy simpáticos","los mejores de la clase","arquitectos"]},
                        f:{s:["muy simpática","la mejor de la clase","arquitecta"], p:["muy simpáticas","las mejores de la clase","arquitectas"]}}},
  {s:"está", p:"están", a:{m:{s:["cansado","enfermo","contento"], p:["cansados","enfermos","contentos"]},
                            f:{s:["cansada","enferma","contenta"], p:["cansadas","enfermas","contentas"]}}},
  {s:"parece", p:"parecen", a:{m:{s:["inteligente","nervioso"], p:["inteligentes","nerviosos"]},
                                f:{s:["inteligente","nerviosa"], p:["inteligentes","nerviosas"]}}},
];
/* el verbo, concordando con el sujeto */
const conj = (v, suj) => suj.n === "p" ? v.p : v.s;

Object.assign(EJERCICIOS, {

  identificarSujeto: {
    titulo: "¿Cuál es el sujeto?",
    genera(){
      const s = elige(SUJ), vc = elige(VERBO_CD), verbo = conj(vc, s), cd = elige(vc.cd), cc = elige(CC);
      const orden = Math.random() < 0.4;
      const frase = orden ? `${cc.t}, ${s.t.toLowerCase()} ${verbo} ${cd}` : `${s.t} ${verbo} ${cd} ${cc.t}`;
      return {
        textoPlano: true, enunciado: `<b>«${frase}»</b><br><span class="mini">¿Cuál es el sujeto?</span>`,
        respuesta: s.t.toLowerCase(),
        pista: "Pregunta al verbo «¿quién?» y prueba a cambiar el número del verbo: el sujeto cambia con él.",
        pasos: [`El verbo es <b>${verbo}</b>.`,
          `¿Quién ${verbo}? <b>${s.t}</b>. Ese es el sujeto.`,
          `La prueba definitiva: si pones el verbo en plural, el sujeto también cambia. Lo demás se queda igual.`,
          orden ? `Ojo: el sujeto no siempre va al principio. Aquí empieza por un complemento circunstancial.` :
                  `Aquí va delante, pero no siempre es así: fíjate en el verbo, no en la posición.`]};
    }},

  identificarComplemento: {
    titulo: "¿Qué función tiene?",
    genera(){
      // se elige un verbo que admita CI, para que la oración suene natural
      const vc = elige(VERBO_CD.filter(v => ADMITE_CI.includes(v.s)));
      const s = elige(SUJ), verbo = conj(vc, s), cd = elige(vc.cd), ci = elige(CI), cc = elige(CC);
      const partes = [
        {t:cd, f:"CD", explica:"Se puede sustituir por <b>lo/la/los/las</b> y pasa a sujeto en la pasiva."},
        {t:ci, f:"CI", explica:"Se puede sustituir por <b>le/les</b>. Suele indicar quién recibe la acción."},
        {t:cc.t, f:"CC", explica:`Dice ${cc.tipo === "de tiempo" ? "cuándo" : cc.tipo === "de lugar" ? "dónde" : cc.tipo === "de modo" ? "cómo" : "con quién"}: es circunstancial ${cc.tipo}. Se puede quitar y la oración sigue funcionando.`},
      ];
      const elegida = elige(partes);
      const frase = `${s.t} ${verbo} ${cd} ${ci} ${cc.t}`;
      return {
        textoPlano: true, enunciado: `<b>«${frase}»</b><br><span class="mini">¿Qué función tiene «${elegida.t}»? (CD, CI o CC)</span>`,
        respuesta: elegida.f,
        pista: "Prueba a sustituirlo: por lo/la es CD; por le es CI; si se puede quitar sin romper la frase, CC.",
        pasos: [`“${elegida.t}” es <b>${elegida.f === "CD" ? "complemento directo" : elegida.f === "CI" ? "complemento indirecto" : "complemento circunstancial"}</b>.`,
          elegida.explica,
          `En esta oración: sujeto «${s.t}», verbo «${verbo}», CD «${cd}», CI «${ci}», CC «${cc.t}».`]};
    }},

  clasificarPredicado: {
    titulo: "¿Nominal o verbal?",
    genera(){
      const s = elige(SUJ), nominal = Math.random() < 0.5;
      if (nominal){
        const at = elige(ATRIB), verboAt = conj(at, s), a = elige(at.a[s.g][s.n]);
        return {textoPlano: true, enunciado: `<b>«${s.t} ${verboAt} ${a}»</b><br><span class="mini">¿El predicado es nominal o verbal?</span>`,
          respuesta: "nominal",
          pista: "Mira el verbo: ser, estar y parecer son copulativos y llevan atributo.",
          pasos: [`El verbo es <b>${verboAt}</b>, que es copulativo (ser, estar, parecer).`,
            `“${a}” es el <b>atributo</b>, y se puede sustituir por <b>lo</b>: «${s.t} lo ${verboAt}».`,
            `Con verbo copulativo, el predicado es <b>nominal</b>.`]};
      }
      const vc = elige(VERBO_CD), verbo = conj(vc, s), cd = elige(vc.cd);
      return {textoPlano: true, enunciado: `<b>«${s.t} ${verbo} ${cd}»</b><br><span class="mini">¿El predicado es nominal o verbal?</span>`,
        respuesta: "verbal",
        pista: "Si el verbo no es ser, estar ni parecer, el predicado es verbal.",
        pasos: [`El verbo es <b>${verbo}</b>: no es copulativo.`,
          `“${cd}” no es atributo, es complemento directo: no se puede sustituir por «lo» en el sentido del atributo, sino como CD.`,
          `Predicado <b>verbal</b>.`]};
    }},

  analizarOracion: {
    titulo: "Analiza la oración entera",
    genera(){
      const conCI = Math.random() < 0.5;
      const vc = elige(conCI ? VERBO_CD.filter(v => ADMITE_CI.includes(v.s)) : VERBO_CD);
      const s = elige(SUJ), verbo = conj(vc, s), cd = elige(vc.cd), cc = elige(CC), ci = elige(CI);
      const frase = conCI ? `${s.t} ${verbo} ${cd} ${ci} ${cc.t}` : `${s.t} ${verbo} ${cd} ${cc.t}`;
      return {
        textoPlano: true, enunciado: `<b>«${frase}»</b><br><span class="mini">¿Cuántos complementos tiene el verbo? (escribe el número)</span>`,
        respuesta: String(conCI ? 3 : 2),
        pista: "Cuenta: CD, CI (si lo hay) y los circunstanciales. El sujeto no cuenta, no es complemento del verbo.",
        pasos: [`<b>Sujeto:</b> ${s.t}. <b>Verbo:</b> ${verbo}.`,
          `<b>CD:</b> ${cd}. ${conCI ? `<b>CI:</b> ${ci}. ` : ""}<b>CC ${cc.tipo}:</b> ${cc.t}.`,
          `Son <b>${conCI ? 3 : 2}</b> complementos. El sujeto no se cuenta: no complementa al verbo, concuerda con él.`,
          `Orden para analizar: primero el verbo, luego el sujeto (¿quién?), y después lo que queda.`]};
    }},
});
