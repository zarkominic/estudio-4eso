/* ejercicios.js — EJERCICIOS INFINITOS.
   Esto es lo que un test tipo no puede dar: el alumno pulsa «otro» y sale un ejercicio
   nuevo, distinto, con su solución paso a paso. Practicar 40 simplificaciones es lo que
   hace que el tema se domine; elegir entre 4 opciones, no.

   Cada generador devuelve:
     enunciado : LaTeX
     respuesta : cómo se escribe la solución (se admiten varias formas)
     pasos     : la resolución, paso a paso
     pista     : una ayuda si se atasca
*/

const al = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const elige = arr => arr[Math.floor(Math.random() * arr.length)];
const mcd = (a, b) => b ? mcd(b, a % b) : a;
/* \sqrt[2]{x} se escribe \sqrt{x}: el índice 2 no se pone nunca */
const raizTex = (n, base, m) => n === 2 ? `\\sqrt{${base}^{${m}}}` : `\\sqrt[${n}]{${base}^{${m}}}`;

/* Normaliza lo que escribe el alumno: 5√3, 5raiz3, 5 raiz 3, 5*sqrt(3), 5r3 → "5r3" */
function normaliza(txt){
  return (txt || "").toLowerCase().trim()
    .normalize("NFD").replace(/[\u0300-\u0304\u0308]/g, "")  // quita tildes: iónico = ionico
    .replace(/\u2019/g, "'")                    // apóstrofo tipográfico → recto
    .replace(/\bdo not\b/g, "don't").replace(/\bdoes not\b/g, "doesn't")
    .replace(/\bdid not\b/g, "didn't").replace(/\bhas not\b/g, "hasn't")
    .replace(/[.!?]+$/, "")                     // punto final, opcional
    .replace(/\s+/g, "").replace(/,/g, ".")
    .replace(/√|sqrt|raiz|raíz/g, "r")
    .replace(/[()·*]/g, "")
    .replace(/^r/, "1r")            // √3 = 1√3
    .replace(/r1$/, "")             // 5√1 = 5
    .replace(/\/1$/, "");
}
function igual(a, b){ return normaliza(a) === normaliza(b); }

/* Escribe a√b en LaTeX y en texto */
const texRad = (a, b) => b === 1 ? `${a}` : a === 1 ? `\\sqrt{${b}}` : `${a}\\sqrt{${b}}`;
const txtRad = (a, b) => b === 1 ? `${a}` : `${a}r${b}`;

function descompone(n){   // {fuera, dentro}
  let fuera = 1, dentro = n;
  for (let i = Math.floor(Math.sqrt(n)); i > 1; i--){ if (dentro % (i * i) === 0){ fuera *= i; dentro /= i * i; i = Math.floor(Math.sqrt(dentro)) + 1; } }
  return {fuera, dentro};
}

const EJERCICIOS = {


  /* ══════════ NÚMEROS REALES E INTERVALOS (mat-b-reales) ══════════ */

  clasificarNumero: {
    titulo: "¿Qué tipo de número es?",
    genera(){
      const casos = [
        {n:"\\dfrac{7}{4}", r:"racional", pista:"¿Se puede escribir como fracción de enteros?"},
        {n:"\\sqrt{25}", r:"natural", pista:"Calcúlalo antes de decidir: ¿cuánto vale?"},
        {n:"\\sqrt{7}", r:"irracional", pista:"7 no es un cuadrado perfecto: sale decimal infinito no periódico."},
        {n:"-\\dfrac{12}{4}", r:"entero", pista:"Haz la división primero."},
        {n:"3{,}25", r:"racional", pista:"Decimal exacto: siempre se puede poner en fracción."},
        {n:"0{,}\\overline{6}", r:"racional", pista:"Periódico: tiene fracción generatriz."},
        {n:"\\pi", r:"irracional", pista:"Decimales infinitos que no se repiten."},
        {n:"\\sqrt{-4}", r:"no real", pista:"Raíz de índice par de un número negativo."},
        {n:"\\sqrt[3]{-8}", r:"entero", pista:"Índice impar: sí existe. Calcúlalo."},
        {n:"1{,}232332333\\ldots", r:"irracional", pista:"No hay periodo: los grupos crecen."},
      ];
      const c = elige(casos);
      return {enunciado: `\\text{¿Qué es } ${c.n}\\text{? (natural, entero, racional, irracional, no real)}`,
        respuesta: c.r, pista: c.pista,
        pasos: [`Es un número <b>${c.r}</b>.`, c.pista,
          `Recuerda el orden: naturales ⊂ enteros ⊂ racionales ⊂ reales. Un número está en todos los conjuntos que lo contienen; se nombra por el más pequeño.`]};
    }},

  fraccionGeneratriz: {
    titulo: "Fracción generatriz",
    genera(){
      const tipo = elige(["exacto", "periodicoPuro", "periodicoMixto"]);
      if (tipo === "exacto"){
        const d = al(1, 3), num = al(11, 99) * (d === 3 ? 10 : 1), den = Math.pow(10, d);
        const g = mcd(num, den), dec = (num / den).toFixed(d).replace(".", ",");
        return {enunciado: `\\text{Pasa a fracción: } ${dec}`,
          respuesta: `${num / g}/${den / g}`, pista: "Decimal exacto: pon debajo tantos ceros como decimales.",
          pasos: [`Tiene ${d} decimales, así que la fracción es $\\dfrac{${num}}{${den}}$.`,
            g > 1 ? `Simplifica dividiendo entre ${g}: $\\dfrac{${num / g}}{${den / g}}$.` : `Ya está simplificada.`]};
      }
      if (tipo === "periodicoPuro"){
        const p = al(1, 8), num = p, den = 9, g = mcd(num, den);
        return {enunciado: `\\text{Pasa a fracción: } 0{,}\\overline{${p}}`,
          respuesta: `${num / g}/${den / g}`, pista: "Periódico puro: el periodo arriba, tantos nueves como cifras tenga.",
          pasos: [`Llama $x = 0{,}\\overline{${p}}$. Entonces $10x = ${p}{,}\\overline{${p}}$.`,
            `Resta: $10x - x = ${p}$, o sea $9x = ${p}$.`,
            `$x = \\dfrac{${p}}{9}${g > 1 ? ` = \\dfrac{${num / g}}{${den / g}}` : ""}$.`]};
      }
      const a = al(1, 8), p = al(1, 8), num = a * 10 + p - a, den = 90, g = mcd(num, den);
      return {enunciado: `\\text{Pasa a fracción: } 0{,}${a}\\overline{${p}}`,
        respuesta: `${num / g}/${den / g}`, pista: "Mixto: (todo sin coma) menos (la parte no periódica), y abajo nueves y ceros.",
        pasos: [`Arriba: $${a}${p} - ${a} = ${num}$.`,
          `Abajo: un 9 por la cifra del periodo y un 0 por la que no se repite: $90$.`,
          `$\\dfrac{${num}}{90}${g > 1 ? ` = \\dfrac{${num / g}}{${den / g}}` : ""}$.`]};
    }},

  intervalos: {
    titulo: "Escribe el intervalo",
    genera(){
      const a = al(-6, 3), b = a + al(2, 7);
      const casos = [
        {t:`x > ${a}`, r:`(${a},inf)`, d:`$(${a}, +\\infty)$`, ex:"Estrictamente mayor: paréntesis, y el infinito siempre abierto."},
        {t:`x \\ge ${a}`, r:`[${a},inf)`, d:`$[${a}, +\\infty)$`, ex:"Mayor o igual: corchete en el número."},
        {t:`${a} < x < ${b}`, r:`(${a},${b})`, d:`$(${a}, ${b})$`, ex:"Los dos abiertos."},
        {t:`${a} \\le x < ${b}`, r:`[${a},${b})`, d:`$[${a}, ${b})$`, ex:"Cerrado a la izquierda, abierto a la derecha."},
        {t:`x \\le ${b}`, r:`(-inf,${b}]`, d:`$(-\\infty, ${b}]$`, ex:"Menor o igual: corchete en el número."},
        {t:`|x| < ${Math.abs(b)}`, r:`(${-Math.abs(b)},${Math.abs(b)})`, d:`$(${-Math.abs(b)}, ${Math.abs(b)})$`, ex:"Valor absoluto menor que k: entre −k y k."},
      ];
      const c = elige(casos);
      return {enunciado: `\\text{Escribe como intervalo: } ${c.t}`,
        respuesta: c.r, pista: "Paréntesis si NO entra el número, corchete si entra. El infinito, siempre paréntesis.",
        pasos: [`Queda ${c.d}.`, c.ex, `Escríbelo así: <code>${c.r}</code> (usa <code>inf</code> para el infinito).`]};
    }},

  errorAbsolutoRelativo: {
    titulo: "Error y redondeo",
    genera(){
      // El real lleva 3 decimales y se redondea a 1 o 2, forzando que la cifra que se
      // quita no sea 0: si no, el error saldría 0 y el ejercicio no tendría sentido.
      const dec = elige([1, 2]);
      const entero = al(1, 9), milesimas = al(1, 999);
      let real = +(entero + milesimas / 1000).toFixed(3);
      let aprox = +real.toFixed(dec);
      if (real === aprox){ real = +(real + (dec === 1 ? 0.04 : 0.004)).toFixed(3); aprox = +real.toFixed(dec); }
      const abs = +Math.abs(real - aprox).toFixed(4);
      const rel = +(abs / real * 100).toFixed(2);
      const que = elige(["redondear", "absoluto", "relativo"]);
      if (que === "redondear")
        return {enunciado: `\\text{Redondea } ${String(real).replace(".", ",")} \\text{ a } ${dec} \\text{ decimal${dec > 1 ? "es" : ""}}`,
          respuesta: String(aprox).replace(".", ","), pista: "Mira la cifra siguiente: si es 5 o más, sube.",
          pasos: [`Queda $${String(aprox).replace(".", ",")}$.`, `Se mira la primera cifra que se quita: 5 o más sube, menos de 5 se queda.`]};
      if (que === "absoluto")
        return {enunciado: `\\text{Valor real } ${String(real).replace(".", ",")}\\text{, aproximado } ${String(aprox).replace(".", ",")}. \\text{ Error absoluto:}`,
          respuesta: String(abs).replace(".", ","), pista: "Error absoluto = |real − aproximado|.",
          pasos: [`$|${String(real).replace(".", ",")} - ${String(aprox).replace(".", ",")}| = ${String(abs).replace(".", ",")}$.`,
            `Se pone en valor absoluto: el error nunca es negativo.`]};
      return {enunciado: `\\text{Real } ${String(real).replace(".", ",")}\\text{, aproximado } ${String(aprox).replace(".", ",")}. \\text{ Error relativo en }\\%\\text{ (2 decimales):}`,
        respuesta: String(rel).replace(".", ","), pista: "Relativo = absoluto ÷ real, y por 100 para el porcentaje.",
        pasos: [`Absoluto: $${String(abs).replace(".", ",")}$.`,
          `Relativo: $\\dfrac{${String(abs).replace(".", ",")}}{${String(real).replace(".", ",")}} \\cdot 100 = ${String(rel).replace(".", ",")}\\%$.`,
          `El relativo es el que dice si el error es grande o pequeño: 0,1 cm de error en 1 m es poco; en 1 cm es mucho.`]};
    }},

  /* ── 1. Simplificar una raíz ── */
  simplificar: {
    titulo: "Simplifica la raíz",
    genera(){
      const base = elige([2, 3, 5, 6, 7, 10, 11, 13, 15]);
      const factor = elige([2, 3, 4, 5, 6]);
      const n = base * factor * factor;
      const {fuera, dentro} = descompone(n);
      return {
        enunciado: `\\sqrt{${n}}`,
        respuesta: txtRad(fuera, dentro),
        pista: `Busca el cuadrado más grande que divida a ${n}.`,
        pasos: [
          `Descompón: $${n} = ${fuera * fuera} \\cdot ${dentro}$, y $${fuera * fuera}$ es un cuadrado perfecto.`,
          `Saca su raíz: $\\sqrt{${fuera * fuera}} = ${fuera}$.`,
          `Queda $${texRad(fuera, dentro)}$${dentro === 1 ? "" : `, que es aproximadamente $${Math.sqrt(n).toFixed(2).replace(".", ",")}$`}.`,
        ]};
    }},

  /* ── 2. Sumar y restar radicales ── */
  sumar: {
    titulo: "Suma o resta",
    genera(){
      const base = elige([2, 3, 5, 6, 7]);
      const [p, q, r] = [al(2, 5), al(2, 5), al(2, 4)];
      const n1 = p * p * base, n2 = q * q * base, n3 = r * r * base;
      const signo = elige([1, -1]);
      const res = p + signo * q + r;
      return {
        enunciado: `\\sqrt{${n1}} ${signo > 0 ? "+" : "-"} \\sqrt{${n2}} + \\sqrt{${n3}}`,
        respuesta: txtRad(res, base),
        pista: "Simplifica las tres raíces primero: verás que todas llevan la misma.",
        pasos: [
          `Simplifica cada una: $\\sqrt{${n1}}=${texRad(p, base)}$, $\\sqrt{${n2}}=${texRad(q, base)}$, $\\sqrt{${n3}}=${texRad(r, base)}$.`,
          `Ahora son semejantes (todas con $\\sqrt{${base}}$): se suman los números de delante.`,
          `$${p} ${signo > 0 ? "+" : "-"} ${q} + ${r} = ${res}$, así que el resultado es $${texRad(res, base)}$.`,
        ]};
    }},

  /* ── 3. Multiplicar radicales ── */
  multiplicar: {
    titulo: "Multiplica",
    genera(){
      const a = elige([2, 3, 5, 6, 7, 8, 10, 12, 15, 18, 20]);
      const b = elige([2, 3, 5, 6, 8, 12, 15, 20, 27]);
      const {fuera, dentro} = descompone(a * b);
      return {
        enunciado: `\\sqrt{${a}} \\cdot \\sqrt{${b}}`,
        respuesta: txtRad(fuera, dentro),
        pista: "Mismo índice: se multiplica lo de dentro, y luego se simplifica.",
        pasos: [
          `Mismo índice, así que se juntan: $\\sqrt{${a} \\cdot ${b}} = \\sqrt{${a * b}}$.`,
          fuera > 1 ? `Simplifica: $${a * b} = ${fuera * fuera} \\cdot ${dentro}$, y sale $${texRad(fuera, dentro)}$.`
                    : `${a * b} no tiene cuadrados dentro: se queda $\\sqrt{${a * b}}$.`,
        ]};
    }},

  /* ── 4. Racionalizar ── */
  racionalizar: {
    titulo: "Racionaliza",
    genera(){
      const raiz = elige([2, 3, 5, 6, 7]);
      const num = raiz * elige([1, 2, 3, 4]);
      const res = num / raiz;
      return {
        enunciado: `\\dfrac{${num}}{\\sqrt{${raiz}}}`,
        respuesta: txtRad(res, raiz),
        pista: `Multiplica arriba y abajo por $\\sqrt{${raiz}}$.`,
        pasos: [
          `Multiplica arriba y abajo por $\\sqrt{${raiz}}$: $\\dfrac{${num}\\sqrt{${raiz}}}{\\sqrt{${raiz}} \\cdot \\sqrt{${raiz}}}$.`,
          `Abajo queda $${raiz}$, porque $\\sqrt{${raiz}} \\cdot \\sqrt{${raiz}} = ${raiz}$.`,
          `$\\dfrac{${num}\\sqrt{${raiz}}}{${raiz}} = ${texRad(res, raiz)}$.`,
        ]};
    }},

  /* ── 5. Racionalizar con conjugado ── */
  conjugado: {
    titulo: "Racionaliza (con suma abajo)",
    genera(){
      const raiz = elige([2, 3, 5, 7]);
      const k = al(1, 4);
      const den = raiz - k * k;                 // (√r - k)(√r + k) = r - k²
      const signo = elige(["-", "+"]);
      const otro = signo === "-" ? "+" : "-";
      const sale = den === 1 ? `\\sqrt{${raiz}} ${otro === "+" ? "+" : "-"} ${k}` : `\\dfrac{\\sqrt{${raiz}} ${otro === "+" ? "+" : "-"} ${k}}{${den}}`;
      return {
        enunciado: `\\dfrac{1}{\\sqrt{${raiz}} ${signo} ${k}}`,
        respuesta: den === 1 ? `1r${raiz}${otro}${k}` : `?`,   // se comprueba mirando los pasos
        soloPasos: den !== 1,
        pista: `Multiplica por el conjugado: $\\sqrt{${raiz}} ${otro} ${k}$.`,
        pasos: [
          `El conjugado de $\\sqrt{${raiz}} ${signo} ${k}$ es $\\sqrt{${raiz}} ${otro} ${k}$.`,
          `Abajo queda $(\\sqrt{${raiz}})^2 - ${k}^2 = ${raiz} - ${k * k} = ${den}$: la raíz ha desaparecido.`,
          `Resultado: $${sale}$.`,
        ]};
    }},

  /* ── 6. Meter dentro y comparar ── */
  comparar: {
    titulo: "¿Cuál es mayor?",
    genera(){
      const a1 = al(2, 5), b1 = elige([2, 3, 5, 6, 7]);
      let a2 = al(2, 5), b2 = elige([2, 3, 5, 6, 7]);
      while (a1 * a1 * b1 === a2 * a2 * b2){ a2 = al(2, 5); b2 = elige([2, 3, 5, 7]); }
      const v1 = a1 * a1 * b1, v2 = a2 * a2 * b2;
      const mayor = v1 > v2 ? texRad(a1, b1) : texRad(a2, b2);
      return {
        enunciado: `${texRad(a1, b1)} \\quad \\text{ó} \\quad ${texRad(a2, b2)}`,
        respuesta: v1 > v2 ? txtRad(a1, b1) : txtRad(a2, b2),
        pista: "Mete los números dentro de la raíz y compara los radicandos.",
        pasos: [
          `Mete dentro: $${texRad(a1, b1)} = \\sqrt{${v1}}$ y $${texRad(a2, b2)} = \\sqrt{${v2}}$.`,
          `Como $${Math.max(v1, v2)} > ${Math.min(v1, v2)}$, el mayor es $${mayor}$.`,
          `Comprueba: $${Math.sqrt(v1).toFixed(2).replace(".", ",")}$ frente a $${Math.sqrt(v2).toFixed(2).replace(".", ",")}$.`,
        ]};
    }},

  /* ── 7. Potencias de exponente fraccionario ── */
  potencias: {
    titulo: "Pasa a potencia y opera",
    genera(){
      const base = elige(["x", "a", "m"]);
      const [n1, m1] = [elige([2, 3, 4]), al(1, 3)];
      const [n2, m2] = [elige([2, 3, 6]), al(1, 3)];
      const num = m1 * n2 + m2 * n1, den = n1 * n2, g = mcd(num, den);
      const [nf, df] = [num / g, den / g];
      return {
        enunciado: `${raizTex(n1, base, m1)} \\cdot ${raizTex(n2, base, m2)}`,
        respuesta: df === 1 ? `${base}^${nf}` : `${base}^${nf}/${df}`,
        pista: "Pásalas a potencias: el índice va abajo. Luego suma los exponentes.",
        pasos: [
          `A potencias: $${base}^{${m1}/${n1}} \\cdot ${base}^{${m2}/${n2}}$.`,
          `Misma base: se suman los exponentes. $\\frac{${m1}}{${n1}} + \\frac{${m2}}{${n2}} = \\frac{${num}}{${den}}${g > 1 ? ` = \\frac{${nf}}{${df}}` : ""}$.`,
          `Resultado: $${base}^{${nf}/${df}}$, o sea $${df === 1 ? `${base}^{${nf}}` : raizTex(df, base, nf)}$.`,
        ]};
    }},

  /* ── 8. Problema con contexto ── */
  problema: {
    titulo: "Problema",
    genera(){
      const tipos = [
        () => { const a = elige([18, 32, 50, 72, 98, 128]); const {fuera, dentro} = descompone(a);
          return {enunciado: `\\text{Un cuadrado tiene }${a}\\text{ cm}^2\\text{ de área. ¿Cuánto mide su lado?}`,
            respuesta: txtRad(fuera, dentro), pista: "El lado es la raíz del área.",
            pasos: [`Lado $= \\sqrt{${a}}$.`, `Simplifica: $\\sqrt{${a}} = ${texRad(fuera, dentro)}$ cm.`,
              `Aproximadamente $${Math.sqrt(a).toFixed(2).replace(".", ",")}$ cm.`]}; },
        () => { const l = al(2, 9); const {fuera, dentro} = descompone(2 * l * l);
          return {enunciado: `\\text{¿Cuánto mide la diagonal de un cuadrado de lado }${l}\\text{ cm?}`,
            respuesta: txtRad(fuera, dentro), pista: "Pitágoras: la diagonal al cuadrado es lado² + lado².",
            pasos: [`$d = \\sqrt{${l}^2 + ${l}^2} = \\sqrt{${2 * l * l}}$.`,
              `Simplifica: $${texRad(fuera, dentro)}$ cm ≈ $${Math.sqrt(2 * l * l).toFixed(2).replace(".", ",")}$ cm.`,
              `Regla rápida: la diagonal de un cuadrado siempre es el lado por $\\sqrt2$.`]}; },
        () => { const h = elige([5, 10, 20, 45, 80]); const v2 = 2 * 10 * h; const {fuera, dentro} = descompone(v2);
          return {enunciado: `\\text{Algo cae desde }${h}\\text{ m. Llega al suelo a }v=\\sqrt{2gh}\\text{, con }g=10. \\text{ ¿A qué velocidad?}`,
            respuesta: txtRad(fuera, dentro), pista: `Sustituye: $\\sqrt{2 \\cdot 10 \\cdot ${h}}$.`,
            pasos: [`$v = \\sqrt{2 \\cdot 10 \\cdot ${h}} = \\sqrt{${v2}}$.`,
              `Simplifica: $${texRad(fuera, dentro)}$ m/s ≈ $${Math.sqrt(v2).toFixed(1).replace(".", ",")}$ m/s.`,
              `Son unos $${(Math.sqrt(v2) * 3.6).toFixed(0)}$ km/h.`]}; },
      ];
      return elige(tipos)();
    }},
};

/* Pinta un bloque de ejercicios: enunciado, casilla para la respuesta, comprobar,
   ver solución y «otro». El botón «otro» es el que convierte esto en práctica de verdad. */
function bloqueEjercicios(tipo, donde){
  const def = EJERCICIOS[tipo];
  const caja = document.createElement("div"); caja.className = "ejercicio";
  caja.innerHTML = `<div class="ej-cab"><b>${def.titulo}</b><span class="mini" data-racha>0 seguidos</span></div>
    <div class="ej-enunciado"></div>
    <div class="ej-responde">
      <input type="text" inputmode="text" placeholder="Tu respuesta (ej: 5√3 o 5r3)" aria-label="Tu respuesta">
      <button class="btn" type="button" data-comprobar>Comprobar</button>
    </div>
    <div class="ej-veredicto" hidden></div>
    <details class="ej-solucion"><summary>Ver la solución paso a paso</summary><ol class="pasos"></ol></details>
    <div class="ej-pie"><button class="btn claro" type="button" data-otro>Otro ejercicio →</button>
      <button class="btn claro" type="button" data-pista>Una pista</button></div>`;
  donde.appendChild(caja);

  let actual, racha = 0;
  const $$ = s => caja.querySelector(s);
  function nuevo(){
    actual = def.genera();
    // los temas de letras traen el enunciado en texto: no pasa por el motor de fórmulas
    $$(".ej-enunciado").innerHTML = actual.textoPlano ? actual.enunciado : `\\[${actual.enunciado}\\]`;
    $$("input").value = ""; $$("input").className = "";
    $$(".ej-veredicto").hidden = true;
    $$(".ej-solucion").open = false;
    $$(".ej-solucion ol").innerHTML = actual.pasos.map(p => `<li>${p}</li>`).join("");
    if (actual.soloPasos){ $$(".ej-responde").style.display = "none"; $$(".ej-solucion").open = false; }
    else $$(".ej-responde").style.display = "";
    if (window.renderMathInElement) renderMathInElement(caja, {delimiters:[{left:"\\[",right:"\\]",display:true},{left:"$",right:"$",display:false}]});
  }
  function comprueba(){
    const v = $$("input").value; if (!v.trim()) return;
    // algunos ejercicios admiten más de una respuesta correcta (por ejemplo, dos
    // nomenclaturas válidas para el mismo compuesto)
    const validas = [actual.respuesta].concat(actual.respuestaAlt || []);
    const bien = validas.some(x => igual(v, x));
    $$("input").className = bien ? "bien" : "mal";
    const ver = $$(".ej-veredicto"); ver.hidden = false;
    racha = bien ? racha + 1 : 0;
    caja.querySelector("[data-racha]").textContent = racha + " seguidos";
    ver.className = "ej-veredicto " + (bien ? "bien" : "mal");
    ver.innerHTML = bien ? "<b>Correcto.</b> Pulsa «otro» y encadena." :
      `<b>No es.</b> ${actual.pista} <br>Abre la solución si quieres verlo entero.`;
    if (!bien) $$(".ej-solucion").open = true;
    if (window.renderMathInElement) renderMathInElement(ver, {delimiters:[{left:"$",right:"$",display:false}]});
  }
  $$("[data-comprobar]").onclick = comprueba;
  $$("input").addEventListener("keydown", e => { if (e.key === "Enter") comprueba(); });
  $$("[data-otro]").onclick = nuevo;
  $$("[data-pista]").onclick = () => { const ver = $$(".ej-veredicto"); ver.hidden = false; ver.className = "ej-veredicto";
    ver.innerHTML = actual.pista; if (window.renderMathInElement) renderMathInElement(ver, {delimiters:[{left:"$",right:"$",display:false}]}); };
  nuevo();
  return caja;
}
