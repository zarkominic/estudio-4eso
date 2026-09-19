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
    $$(".ej-enunciado").innerHTML = `\\[${actual.enunciado}\\]`;
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
    const bien = igual(v, actual.respuesta);
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
