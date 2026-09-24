/* ejercicios-ecu.js — ecuaciones de segundo grado, bicuadradas, con radicales,
   con fracciones y problemas.

   Todas se construyen AL REVÉS: primero se eligen las soluciones y de ahí se
   sacan los coeficientes. Así las soluciones siempre son limpias y nunca sale
   un ejercicio imposible. `conjunto: true` hace que el motor acepte las
   soluciones en cualquier orden y formato. */
(function(){

const sup = s => s.replace(/\^(\d)/g, "<sup>$1</sup>");
const sg = n => n < 0 ? `− ${-n}` : `+ ${n}`;
function poli(a, b, c, v = "x"){               // ax² + bx + c, bien escrito
  let s = a === 1 ? `${v}^2` : a === -1 ? `−${v}^2` : `${a}${v}^2`;
  if (b) s += ` ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}${v}`;
  if (c) s += ` ${sg(c)}`;
  return sup(s);
}
const lista = arr => [...new Set(arr)].sort((a, b) => a - b).join(" y ");
const nz = (lo, hi) => { let v; do v = al(lo, hi); while (v === 0); return v; };

Object.assign(EJERCICIOS, {

  discriminante: {
    titulo: "¿Cuántas soluciones tiene?",
    genera(){
      const caso = elige([2, 1, 0]), a = elige([1, 1, 2, -1]);
      let b, c;
      if (caso === 2){ const r1 = al(-6, 6), r2 = al(-6, 6); if (r1 === r2) return this.genera(); b = -a * (r1 + r2); c = a * r1 * r2; }
      else if (caso === 1){ const r = al(-5, 5); b = -2 * a * r; c = a * r * r; }
      else { b = al(-4, 4); c = a > 0 ? b * b + al(1, 9) : -(b * b) - al(1, 9); if (a > 0 && b * b - 4 * a * c >= 0) return this.genera(); if (a < 0 && b * b - 4 * a * c >= 0) return this.genera(); }
      const D = b * b - 4 * a * c;
      return {textoPlano: true,
        enunciado: `<b>${poli(a, b, c)} = 0</b><br><span class="mini">¿Cuántas soluciones reales tiene? (0, 1 o 2)</span>`,
        respuesta: String(caso),
        pista: "Calcula el discriminante Δ = b² − 4ac y mira su signo.",
        pasos: [`a = ${a}, b = ${b}, c = ${c}.`, `Δ = b² − 4ac = ${b * b} − 4·${a}·${c} = <b>${D}</b>.`,
          D > 0 ? "Δ > 0: <b>dos soluciones</b>." : D === 0 ? "Δ = 0: <b>una solución</b> (doble)." : "Δ < 0: <b>ninguna solución real</b>."]};
    }},

  segundoGrado: {
    titulo: "Resuelve (fórmula general)",
    genera(){
      const r1 = al(-7, 7), r2 = al(-7, 7), a = elige([1, 1, 1, 2, -1]);
      const b = -a * (r1 + r2), c = a * r1 * r2, D = b * b - 4 * a * c;
      return {textoPlano: true, conjunto: true,
        enunciado: `<b>${poli(a, b, c)} = 0</b><br><span class="mini">Escribe las soluciones separadas por «y»: 2 y −3</span>`,
        respuesta: lista([r1, r2]),
        pista: "x = (−b ± √Δ) / 2a, con Δ = b² − 4ac.",
        pasos: [`a = ${a}, b = ${b}, c = ${c}.`, `Δ = ${b * b} − 4·${a}·${c} = ${D}; √Δ = ${Math.sqrt(D)}.`,
          `x = (${-b} ± ${Math.sqrt(D)}) / ${2 * a}.`, `Soluciones: <b>${lista([r1, r2])}</b>.`]};
    }},

  incompleta: {
    titulo: "Incompletas (sin fórmula)",
    genera(){
      if (Math.random() < 0.5){          // ax² + bx = 0 → x(ax + b) = 0
        const a = elige([1, 2, 3]), r = nz(-6, 6), b = -a * r;
        return {textoPlano: true, conjunto: true,
          enunciado: `<b>${poli(a, b, 0)} = 0</b><br><span class="mini">Soluciones separadas por «y»</span>`,
          respuesta: lista([0, r]),
          pista: "Falta el término independiente: saca x factor común.",
          pasos: [`Saca factor común: x·(${a === 1 ? "" : a}x ${sg(b)}) = 0.`, `O x = 0, o ${a === 1 ? "" : a}x ${sg(b)} = 0 → x = ${r}.`, `Soluciones: <b>${lista([0, r])}</b>. <i>Nunca dividas entre x: perderías el 0.</i>`]};
      }
      const a = elige([1, 2, 3, 4]), r = al(1, 6), c = -a * r * r;   // ax² + c = 0
      return {textoPlano: true, conjunto: true,
        enunciado: `<b>${poli(a, 0, c)} = 0</b><br><span class="mini">Soluciones separadas por «y»</span>`,
        respuesta: lista([-r, r]),
        pista: "Falta la x sola: despeja x² y haz la raíz, con sus dos signos.",
        pasos: [`${a === 1 ? "" : a}x² = ${-c} → x² = ${r * r}.`, `x = ±√${r * r} = ±${r}.`, `Soluciones: <b>${lista([-r, r])}</b>. Las dos: el negativo también vale.`]};
    }},

  bicuadrada: {
    titulo: "Bicuadradas",
    genera(){
      const p = al(1, 5), q = elige([al(1, 6), al(1, 6), -al(1, 9)]);   // t = x² → raíces p², q
      if (q > 0 && q * q === p * p) return this.genera();
      const t1 = p * p, t2 = q > 0 ? q * q : q;
      const b = -(t1 + t2), c = t1 * t2;
      const sols = q > 0 ? [-p, p, -q, q] : [-p, p];
      return {textoPlano: true, conjunto: true,
        enunciado: `<b>${sup(`x^4 ${b < 0 ? "−" : "+"} ${Math.abs(b)}x^2 ${sg(c)}`)} = 0</b><br><span class="mini">Todas las soluciones reales, separadas por «y»</span>`,
        respuesta: lista(sols),
        pista: "Cambia x² = t: te queda una de segundo grado en t. Luego deshaz el cambio.",
        pasos: [`Cambio <b>t = x²</b>: t² ${b < 0 ? "−" : "+"} ${Math.abs(b)}t ${sg(c)} = 0.`,
          `Soluciones en t: t = ${t1} y t = ${t2}.`,
          `x² = ${t1} → x = ±${p}.`,
          q > 0 ? `x² = ${t2} → x = ±${q}.` : `x² = ${t2} no tiene solución: <b>ningún número al cuadrado da negativo</b>.`,
          `Soluciones: <b>${lista(sols)}</b>.`]};
    }},

  conRadicales: {
    titulo: "Con radicales (¡comprueba!)",
    genera(){
      // √(x + c) = x − d. Se elige la solución buena s y se calcula c.
      const d = al(0, 4), s = d + al(1, 5), k = s - d, c = k * k - s;
      // al elevar: x + c = x² − 2dx + d² → x² − (2d+1)x + (d² − c) = 0
      const B = -(2 * d + 1), C = d * d - c, D = B * B - 4 * C;
      const raices = [(-B + Math.sqrt(D)) / 2, (-B - Math.sqrt(D)) / 2];
      const valida = x => x + c >= 0 && Math.abs(Math.sqrt(x + c) - (x - d)) < 1e-9;
      const buenas = [...new Set(raices.filter(valida))], falsas = raices.filter(x => !valida(x));
      if (!Number.isInteger(raices[0]) || !Number.isInteger(raices[1])) return this.genera();
      return {textoPlano: true, conjunto: true,
        enunciado: `<b>√(x ${sg(c)}) = x${d ? " − " + d : ""}</b><br><span class="mini">Solo las soluciones que de verdad cumplen la ecuación</span>`,
        respuesta: lista(buenas),
        pista: "Eleva los dos lados al cuadrado, resuelve y COMPRUEBA cada solución en la ecuación original.",
        pasos: [`Elevo al cuadrado: x ${sg(c)} = (x${d ? " − " + d : ""})² → ${poli(1, B, C)} = 0.`,
          `Resuelvo: x = ${raices.join(" y x = ")}.`,
          ...raices.map(x => `Compruebo x = ${x}: √(${x} ${sg(c)}) = ${x + c >= 0 ? Math.sqrt(x + c) : "no existe"}, y ${x}${d ? " − " + d : ""} = ${x - d}. ${valida(x) ? "✓ vale." : "✗ <b>no vale</b>: apareció al elevar al cuadrado."}`),
          `Solución: <b>${lista(buenas)}</b>.${falsas.length ? " Por eso se comprueba siempre." : ""}`]};
    }},

  conFracciones: {
    titulo: "Con fracciones",
    genera(){
      // x + P/x = S, con soluciones r1, r2 no nulas
      const r1 = nz(-6, 6), r2 = nz(-6, 6), P = r1 * r2, S = r1 + r2;
      return {textoPlano: true, conjunto: true,
        enunciado: `<b>x + ${P < 0 ? "(" + P + ")" : P}/x = ${S}</b><br><span class="mini">Soluciones separadas por «y»</span>`,
        respuesta: lista([r1, r2]),
        pista: "Multiplica todo por x para quitar la fracción (x no puede ser 0).",
        pasos: [`Multiplico todo por x (x ≠ 0): x² ${sg(P)} = ${S}x.`, `Paso todo a un lado: ${poli(1, -S, P)} = 0.`,
          `Resuelvo: <b>${lista([r1, r2])}</b>. Ninguna es 0, así que valen las dos.`]};
    }},

  problemaEcuacion: {
    titulo: "Problemas",
    genera(){
      const caso = elige(["numero", "rectangulo", "consecutivos"]);
      if (caso === "numero"){
        const n = al(3, 12), s = n * n + n;
        return {textoPlano: true, tolerancia: 0,
          enunciado: `La suma de un número <b>positivo</b> y su cuadrado es <b>${s}</b>. ¿Qué número es?`,
          respuesta: String(n),
          pista: "Plantea x² + x = " + s + " y quédate con la solución positiva.",
          pasos: [`x² + x = ${s} → x² + x − ${s} = 0.`, `Soluciones: x = ${n} y x = ${-n - 1}.`, `Piden el positivo: <b>${n}</b>.`]};
      }
      if (caso === "rectangulo"){
        const x = al(3, 12), k = al(2, 6), A = x * (x + k);
        return {textoPlano: true, tolerancia: 0,
          enunciado: `Un rectángulo mide <b>${k} cm más de largo que de ancho</b> y su área es <b>${A} cm²</b>. ¿Cuánto mide el ancho? (cm)`,
          respuesta: String(x),
          pista: "Ancho = x, largo = x + " + k + ". Área = ancho · largo.",
          pasos: [`x·(x + ${k}) = ${A} → x² + ${k}x − ${A} = 0.`, `Soluciones: x = ${x} y x = ${-x - k}.`, `Una longitud no puede ser negativa: <b>${x} cm</b>.`]};
      }
      const n = al(4, 15), prod = n * (n + 1);
      return {textoPlano: true, tolerancia: 0,
        enunciado: `El producto de dos números naturales <b>consecutivos</b> es <b>${prod}</b>. ¿Cuál es el menor?`,
        respuesta: String(n),
        pista: "Llama x al menor y x + 1 al siguiente.",
        pasos: [`x·(x + 1) = ${prod} → x² + x − ${prod} = 0.`, `Soluciones: x = ${n} y x = ${-n - 1}.`, `Naturales: <b>${n}</b> (y ${n + 1}).`]};
    }},
});
})();
