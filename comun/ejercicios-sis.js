/* ejercicios-sis.js — sistemas de ecuaciones (mates-sistemas).

   Como en ejercicios-ecu.js, todo se construye AL REVÉS: primero se elige la
   solución (x, y) y de ahí salen los coeficientes. Así la solución siempre es
   entera y el sistema nunca sale raro.

   Formato de respuesta: un par ordenado, primero x y luego y. Aquí NO se usa
   `conjunto` (daría por buena (−1, 2) cuando es (2, −1)); en su lugar cada
   ejercicio trae `respuestaAlt` con las formas razonables de escribir el mismo
   par: «(2,-1)», «2, -1», «x=2, y=-1», «x = 2 y y = −1», «y=-1, x=2»… */
(function(){

const sg = n => n < 0 ? `− ${-n}` : `+ ${n}`;
const neg = n => String(n).replace("-", "−");
const par = n => n < 0 ? `(${neg(n)})` : String(n);
const mono = (k, v) => k === 1 ? v : k === -1 ? "−" + v : neg(k) + v;      // 1x → x
const sgv = (k, v) => `${k < 0 ? "−" : "+"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}${v}`; // + 3y, − y
const nz = (lo, hi) => { let v; do v = al(lo, hi); while (v === 0); return v; };

/* ax + by = c, bien escrito (sin «1x», sin «+ −3y») */
function lineal(a, b, c){
  const t = (k, v, primero) => {
    if (k === 0) return "";
    const m = Math.abs(k) === 1 ? "" : Math.abs(k);
    return primero ? `${k < 0 ? "−" : ""}${m}${v}` : ` ${k < 0 ? "−" : "+"} ${m}${v}`;
  };
  return `${t(a, "x", true)}${t(b, "y", a === 0)} = ${neg(c)}`;
}
/* y = mx + n */
function recta(m, n){
  const mx = m === 0 ? "" : m === 1 ? "x" : m === -1 ? "−x" : `${neg(m)}x`;
  if (!mx) return `y = ${neg(n)}`;
  return `y = ${mx}${n ? " " + sg(n) : ""}`;
}
const llave = (e1, e2) => `<span class="sis">{ ${e1}<br>{ ${e2}</span>`;

/* Todas las formas de escribir el par (x, y) */
function formasPar(x, y){
  const f = [`(${x},${y})`, `(${x};${y})`, `${x},${y}`, `${x};${y}`, `${x} y ${y}`, `${x} ${y}`,
    `x=${x},y=${y}`, `x=${x};y=${y}`, `x=${x} y y=${y}`, `x=${x} e y=${y}`, `x=${x} y=${y}`,
    `y=${y},x=${x}`, `y=${y};x=${x}`, `y=${y} y x=${x}`, `y=${y} x=${x}`,
    `(x,y)=(${x},${y})`];
  return f;
}
function conMenos(arr){ return [...new Set(arr.concat(arr.map(s => s.replace(/-/g, "−"))))]; }

/* Respuesta de un par: oficial «(x, y)» y variantes */
function respPar(x, y){
  return {respuesta: `(${x}, ${y})`, respuestaAlt: conMenos(formasPar(x, y))};
}
/* Respuesta de dos pares (sistemas no lineales): en cualquier orden */
function respDosPares(p, q){
  const alt = [];
  for (const [A, B] of [[p, q], [q, p]])
    for (const fmt of [s => `(${s[0]},${s[1]})`, s => `(${s[0]};${s[1]})`])
      for (const sep of [" y ", ",", ";", " ", " o "]) alt.push(fmt(A) + sep + fmt(B));
  return {respuesta: `(${p[0]}, ${p[1]}) y (${q[0]}, ${q[1]})`, respuestaAlt: conMenos(alt)};
}

Object.assign(EJERCICIOS, {

  sistemaSustitucion: {
    titulo: "Por sustitución",
    genera(){
      // una ecuación con x o y despejable (coeficiente 1)
      const x = al(-6, 6), y = al(-6, 6);
      const b1 = nz(-4, 4), a2 = nz(-4, 4), b2 = nz(-4, 4);
      if (a2 * b1 === b2) return this.genera();          // a2·b1 − b2·1 = 0 → no determinado
      const c1 = x + b1 * y, c2 = a2 * x + b2 * y;
      const k = b2 - a2 * b1, r = c2 - a2 * c1;          // tras sustituir: k·y = r
      return {textoPlano: true, ...respPar(x, y),
        enunciado: `${llave(lineal(1, b1, c1), lineal(a2, b2, c2))}<br><span class="mini">Escribe (x, y), por ejemplo (2, −1)</span>`,
        pista: "Despeja la x de la primera (ya está casi sola) y métela en la segunda.",
        pasos: [`De la 1.ª: x = ${neg(c1)} ${b1 < 0 ? "+" : "−"} ${Math.abs(b1) === 1 ? "" : Math.abs(b1)}y.`,
          `Sustituyo en la 2.ª: ${a2}·(${neg(c1)} ${b1 < 0 ? "+" : "−"} ${Math.abs(b1) === 1 ? "" : Math.abs(b1)}y) ${sgv(b2, "y")} = ${neg(c2)}.`,
          `Opero: ${neg(a2 * c1)} ${sgv(k, "y")} = ${neg(c2)} → ${mono(k, "y")} = ${neg(r)} → <b>y = ${neg(y)}</b>.`,
          `Vuelvo a la x: x = ${neg(c1)} − ${par(b1)}·${par(y)} = <b>${neg(x)}</b>.`,
          `Solución: <b>(${neg(x)}, ${neg(y)})</b>. Compruébala en las dos ecuaciones.`]};
    }},

  sistemaReduccion: {
    titulo: "Por reducción",
    genera(){
      const x = al(-6, 6), y = al(-6, 6);
      const a1 = nz(-5, 5), b1 = nz(-5, 5), a2 = nz(-5, 5), b2 = nz(-5, 5);
      const det = a1 * b2 - a2 * b1;
      if (det === 0 || [a1, b1, a2, b2].some(k => Math.abs(k) === 1)) return this.genera();
      const c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y;
      // elimino la y: 1.ª·b2 − 2.ª·b1
      return {textoPlano: true, ...respPar(x, y),
        enunciado: `${llave(lineal(a1, b1, c1), lineal(a2, b2, c2))}<br><span class="mini">Escribe (x, y)</span>`,
        pista: "Multiplica cada ecuación por un número para que una incógnita tenga el mismo coeficiente, y resta.",
        pasos: [`Para eliminar la y: multiplico la 1.ª por ${par(b2)} y la 2.ª por ${par(b1)}.`,
          `${lineal(a1 * b2, b1 * b2, c1 * b2)} y ${lineal(a2 * b1, b1 * b2, c2 * b1)}.`,
          `Resto: ${mono(det, "x")} = ${neg(c1 * b2 - c2 * b1)} → <b>x = ${neg(x)}</b>.`,
          `Sustituyo en la 1.ª: ${par(a1)}·${par(x)} ${sgv(b1, "y")} = ${neg(c1)} → ${mono(b1, "y")} = ${neg(c1 - a1 * x)} → <b>y = ${neg(y)}</b>.`,
          `Solución: <b>(${neg(x)}, ${neg(y)})</b>.`]};
    }},

  sistemaLineal: {
    titulo: "Resuelve (el método que quieras)",
    genera(){
      const x = al(-8, 8), y = al(-8, 8);
      const a1 = nz(-6, 6), b1 = nz(-6, 6), a2 = nz(-6, 6), b2 = nz(-6, 6);
      const det = a1 * b2 - a2 * b1;
      if (det === 0) return this.genera();
      const c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y;
      const metodo = Math.abs(a1) === 1 || Math.abs(b1) === 1 || Math.abs(a2) === 1 || Math.abs(b2) === 1
        ? "Hay un coeficiente 1: <b>sustitución</b> es cómodo." : "Ningún coeficiente es 1: <b>reducción</b> evita fracciones.";
      return {textoPlano: true, ...respPar(x, y),
        enunciado: `${llave(lineal(a1, b1, c1), lineal(a2, b2, c2))}<br><span class="mini">Escribe (x, y)</span>`,
        pista: "Elige método: si una incógnita va sola, sustitución; si no, reducción.",
        pasos: [metodo,
          `Reduciendo la y (1.ª·${par(b2)} − 2.ª·${par(b1)}): ${mono(det, "x")} = ${neg(c1 * b2 - c2 * b1)} → <b>x = ${neg(x)}</b>.`,
          `En la 1.ª: ${par(a1)}·${par(x)} ${sgv(b1, "y")} = ${neg(c1)} → <b>y = ${neg(y)}</b>.`,
          `Compruebo en la 2.ª: ${par(a2)}·${par(x)} ${sg(b2)}·${par(y)} = ${neg(c2)} ✓.`,
          `Solución: <b>(${neg(x)}, ${neg(y)})</b>.`]};
    }},

  corteRectas: {
    titulo: "¿Dónde se cortan las rectas?",
    genera(){
      // método de igualación: las dos ya vienen despejadas
      const x = al(-5, 5), y = al(-6, 6), m1 = nz(-4, 4), m2 = nz(-4, 4);
      if (m1 === m2) return this.genera();
      const n1 = y - m1 * x, n2 = y - m2 * x;
      return {textoPlano: true, ...respPar(x, y),
        enunciado: `Las rectas <b>${recta(m1, n1)}</b> y <b>${recta(m2, n2)}</b>.<br><span class="mini">¿En qué punto se cortan? Escribe (x, y)</span>`,
        pista: "El punto de corte cumple las dos: iguala los dos lados derechos (igualación).",
        pasos: [`Igualo: ${recta(m1, n1).slice(4)} = ${recta(m2, n2).slice(4)}.`,
          `Paso las x a un lado: ${mono(m1 - m2, "x")} = ${neg(n2 - n1)} → <b>x = ${neg(x)}</b>.`,
          `En la primera: y = ${par(m1)}·${par(x)}${n1 ? " " + sg(n1) : ""} = <b>${neg(y)}</b>.`,
          `Se cortan en <b>(${neg(x)}, ${neg(y)})</b>: es la solución del sistema que forman.`]};
    }},

  clasificarSistema: {
    titulo: "¿Compatible o incompatible?",
    genera(){
      const tipo = elige(["scd", "sci", "si"]);
      const a1 = nz(-5, 5), b1 = nz(-5, 5), c1 = al(-9, 9), k = elige([2, 3, -2, -1, 4]);
      let a2, b2, c2;
      if (tipo === "scd"){ a2 = nz(-5, 5); b2 = nz(-5, 5); c2 = al(-9, 9); if (a1 * b2 === a2 * b1) return this.genera(); }
      else { a2 = k * a1; b2 = k * b1; c2 = tipo === "sci" ? k * c1 : k * c1 + nz(-5, 5); }
      const nombres = {scd: "compatible determinado", sci: "compatible indeterminado", si: "incompatible"};
      const alt = {scd: ["scd", "compatible det", "determinado", "una solucion", "una"],
        sci: ["sci", "compatible indet", "indeterminado", "infinitas", "infinitas soluciones"],
        si: ["si", "sin solucion", "ninguna", "no tiene solucion"]};
      const ex = tipo === "scd"
        ? [`Coeficientes: ${a1}/${a2} y ${b1}/${b2} no son proporcionales.`, "Las rectas tienen distinta pendiente: <b>se cortan en un punto</b>. Una única solución."]
        : [`La 2.ª tiene x e y multiplicadas por ${k} respecto a la 1.ª: los coeficientes son proporcionales.`,
           tipo === "sci" ? `Y el término independiente también: ${c1}·${par(k)} = ${c2}. Es la misma ecuación dos veces: <b>rectas coincidentes</b>, infinitas soluciones.`
             : `Pero el término independiente no: ${c1}·${par(k)} = ${k * c1} ≠ ${c2}. Pide a la vez dos cosas imposibles: <b>rectas paralelas</b>, ninguna solución.`];
      return {textoPlano: true, respuesta: nombres[tipo], respuestaAlt: alt[tipo],
        enunciado: `${llave(lineal(a1, b1, c1), lineal(a2, b2, c2))}<br><span class="mini">Escribe: compatible determinado, compatible indeterminado o incompatible</span>`,
        pista: "Mira si los coeficientes de x e y son proporcionales; si lo son, mira también el número de la derecha.",
        pasos: [...ex, `Es un sistema <b>${nombres[tipo]}</b>.`]};
    }},

  sistemaNoLineal: {
    titulo: "No lineales (dos soluciones)",
    genera(){
      if (Math.random() < 0.5){
        // x + y = S, x·y = P
        const p = al(-6, 7), q = al(-6, 7);
        if (p === q) return this.genera();
        const S = p + q, P = p * q;
        return {textoPlano: true, ...respDosPares([p, q], [q, p]),
          enunciado: `${llave(`x + y = ${neg(S)}`, `x · y = ${neg(P)}`)}<br><span class="mini">Escribe las dos soluciones: (a, b) y (c, d)</span>`,
          pista: "Despeja y = " + S + " − x en la primera y sustituye en la segunda: sale una de segundo grado.",
          pasos: [`De la 1.ª: y = ${neg(S)} − x.`, `En la 2.ª: x·(${neg(S)} − x) = ${neg(P)} → x²${S ? " " + sg(-S) + "x" : ""}${P ? " " + sg(P) : ""} = 0.`.replace(/([+−]) 1x/, "$1 x"),
            `Resuelvo: x = ${neg(p)} o x = ${neg(q)}.`, `Si x = ${neg(p)}, y = ${neg(q)}; si x = ${neg(q)}, y = ${neg(p)}.`,
            `Dos soluciones: <b>(${neg(p)}, ${neg(q)}) y (${neg(q)}, ${neg(p)})</b>. Cada x va con su y.`]};
      }
      // parábola y = x² + c cortada por recta y = mx + n
      const x1 = al(-4, 4), x2 = al(-4, 4), c = al(-5, 5);
      if (x1 === x2) return this.genera();
      const m = x1 + x2, n = c - x1 * x2;
      const y1 = x1 * x1 + c, y2 = x2 * x2 + c;
      const parab = `y = x²${c ? " " + sg(c) : ""}`;
      return {textoPlano: true, ...respDosPares([x1, y1], [x2, y2]),
        enunciado: `${llave(parab, recta(m, n))}<br><span class="mini">Escribe las dos soluciones: (a, b) y (c, d)</span>`,
        pista: "Las dos vienen con la y despejada: iguálalas.",
        pasos: [`Igualo: x²${c ? " " + sg(c) : ""} = ${recta(m, n).slice(4)}.`,
          `Todo a un lado: x²${m ? " " + sg(-m) + "x" : ""}${c - n ? " " + sg(c - n) : ""} = 0.`.replace(/([+−]) 1x/, "$1 x"),
          `Resuelvo: x = ${neg(Math.min(x1, x2))} y x = ${neg(Math.max(x1, x2))}.`,
          `Saco cada y con la recta: x = ${neg(x1)} → y = ${neg(y1)}; x = ${neg(x2)} → y = ${neg(y2)}.`,
          `La recta corta a la parábola en <b>(${neg(x1)}, ${neg(y1)}) y (${neg(x2)}, ${neg(y2)})</b>.`]};
    }},

  problemaSistema: {
    titulo: "Problemas",
    genera(){
      const caso = elige(["entradas", "monedas", "edades", "granja"]);
      if (caso === "entradas"){
        const pa = elige([8, 9, 10, 12]), pn = elige([4, 5, 6]), a = al(2, 15), n = al(2, 15);
        const T = a + n, D = pa * a + pn * n;
        return {textoPlano: true, ...respPar(a, n),
          enunciado: `En un cine se venden <b>${T} entradas</b> y se recaudan <b>${D} €</b>. La de adulto cuesta ${pa} € y la infantil ${pn} €. ¿Cuántas de cada?<br><span class="mini">Escribe (adultos, niños)</span>`,
          pista: `x = adultos, y = niños. Una ecuación cuenta entradas; otra, dinero.`,
          pasos: [`x + y = ${T} (entradas); ${pa}x + ${pn}y = ${D} (euros).`, `De la 1.ª: y = ${T} − x. En la 2.ª: ${pa}x + ${pn}(${T} − x) = ${D} → ${pa - pn}x = ${D - pn * T}.`,
            `x = ${a}, y = ${n}.`, `<b>${a} de adulto y ${n} infantiles</b>. Compruebo: ${pa}·${a} + ${pn}·${n} = ${D} ✓.`]};
      }
      if (caso === "monedas"){
        const d = al(2, 12), c = al(2, 12), N = d + c, V = 2 * d + c;
        return {textoPlano: true, ...respPar(d, c),
          enunciado: `En una hucha hay <b>${N} monedas</b>, unas de 2 € y otras de 1 €, que suman <b>${V} €</b>. ¿Cuántas hay de cada?<br><span class="mini">Escribe (de 2 €, de 1 €)</span>`,
          pista: "x = monedas de 2 €, y = de 1 €. Cuenta monedas y cuenta euros.",
          pasos: [`x + y = ${N}; 2x + y = ${V}.`, `Resto la 1.ª a la 2.ª (reducción): x = ${V - N}.`, `y = ${N} − ${d} = ${c}.`, `<b>${d} de 2 € y ${c} de 1 €</b>.`]};
      }
      if (caso === "edades"){
        const h = al(6, 16), k = elige([3, 4]), p = k * h, t = al(4, 12);
        // dentro de t años, padre = m·hijo? no siempre entero; uso suma
        const S = p + h + 2 * t;
        return {textoPlano: true, ...respPar(p, h),
          enunciado: `Un padre tiene <b>${k} veces</b> la edad de su hija. Dentro de ${t} años sus edades sumarán <b>${S}</b>. ¿Qué edad tiene cada uno ahora?<br><span class="mini">Escribe (padre, hija)</span>`,
          pista: `x = padre, y = hija ahora. Dentro de ${t} años cada uno tiene ${t} más.`,
          pasos: [`x = ${k}y; (x + ${t}) + (y + ${t}) = ${S} → x + y = ${S - 2 * t}.`,
            `Sustituyo: ${k}y + y = ${S - 2 * t} → ${k + 1}y = ${S - 2 * t} → y = ${h}.`, `x = ${k}·${h} = ${p}.`,
            `<b>Padre ${p} años, hija ${h}</b>. Fallo típico: sumar los ${t} años solo a uno.`]};
      }
      const g = al(3, 20), c = al(3, 20), cab = g + c, pat = 2 * g + 4 * c;
      return {textoPlano: true, ...respPar(g, c),
        enunciado: `En una granja hay gallinas y conejos. Se cuentan <b>${cab} cabezas</b> y <b>${pat} patas</b>. ¿Cuántos animales de cada?<br><span class="mini">Escribe (gallinas, conejos)</span>`,
        pista: "x = gallinas (2 patas), y = conejos (4 patas). Cabezas y patas dan las dos ecuaciones.",
        pasos: [`x + y = ${cab}; 2x + 4y = ${pat}.`, `Multiplico la 1.ª por 2 y resto: 2y = ${pat - 2 * cab} → y = ${c}.`, `x = ${cab} − ${c} = ${g}.`, `<b>${g} gallinas y ${c} conejos</b>.`]};
    }},
});
})();
