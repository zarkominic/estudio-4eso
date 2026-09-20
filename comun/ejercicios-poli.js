/* ejercicios-poli.js — polinomios y factorización. */

/* Un polinomio se guarda como lista de coeficientes de mayor a menor grado:
   [1,-3,2] es x² − 3x + 2. Así se pueden generar, evaluar y dividir sin liarse. */
function texPoli(c){
  const g = c.length - 1;
  let s = "";
  c.forEach((k, i) => {
    if (k === 0) return;
    const p = g - i;
    const signo = k > 0 ? (s ? " + " : "") : (s ? " - " : "-");
    const abs = Math.abs(k);
    const num = (abs === 1 && p > 0) ? "" : abs;
    s += signo + num + (p === 0 ? "" : p === 1 ? "x" : `x^{${p}}`);
  });
  return s || "0";
}
const evalPoli = (c, x) => c.reduce((s, k) => s * x + k, 0);

/* Ruffini: divide c entre (x - r). Devuelve cociente y resto. */
function ruffiniDiv(c, r){
  const q = [c[0]];
  for (let i = 1; i < c.length; i++) q.push(c[i] + q[i - 1] * r);
  return {cociente: q.slice(0, -1), resto: q[q.length - 1]};
}

Object.assign(EJERCICIOS, {

  teoremaResto: {
    titulo: "Teorema del resto",
    genera(){
      const c = [1, al(-6, 6), al(-9, 9), al(-6, 6)];
      const r = elige([-3, -2, -1, 1, 2, 3]);
      const valor = evalPoli(c, r);
      return {textoPlano: true,
        enunciado: `<b>P(x) = ${texPoli(c).replace(/\^{(\d)}/g, "<sup>$1</sup>")}</b><br><span class="mini">¿Cuál es el resto de dividir P(x) entre (x ${r >= 0 ? "− " + r : "+ " + (-r)})?</span>`,
        respuesta: String(valor),
        pista: `No hace falta dividir: el resto es P(${r}). Sustituye.`,
        pasos: [`<b>Teorema del resto:</b> el resto de dividir entre $(x - a)$ es $P(a)$. Aquí $a = ${r}$.`,
          `$P(${r}) = ${valor}$.`,
          valor === 0 ? `Como da <b>cero</b>, ${r} es una <b>raíz</b> del polinomio, y $(x ${r >= 0 ? "-" : "+"} ${Math.abs(r)})$ es un factor suyo.`
                      : `Como no da cero, ${r} no es raíz y la división no es exacta.`]};
    }},

  ruffini: {
    titulo: "Divide por Ruffini",
    genera(){
      const r = elige([-3, -2, -1, 1, 2, 3]);
      const q = [1, al(-5, 5), al(-6, 6)];
      // construimos el dividendo para que la división sea exacta
      const c = [q[0], q[1] - q[0] * r, q[2] - q[1] * r, -q[2] * r];
      return {textoPlano: true,
        enunciado: `<b>(${texPoli(c).replace(/\^{(\d)}/g, "<sup>$1</sup>")}) ÷ (x ${r >= 0 ? "− " + r : "+ " + (-r)})</b><br><span class="mini">Escribe el cociente, ej: x2-3x+2</span>`,
        respuesta: texPoli(q).replace(/\^{(\d)}/g, "$1").replace(/\s/g, ""),
        pista: `Baja el primer coeficiente, multiplícalo por ${r} y súmalo al siguiente. Y así hasta el final.`,
        pasos: [`Coeficientes: ${c.join(", ")}. Se divide entre $(x ${r >= 0 ? "-" : "+"} ${Math.abs(r)})$, así que se usa <b>${r}</b>.`,
          `Bajando y multiplicando por ${r} sale el cociente <b>${texPoli(q).replace(/\^{(\d)}/g, "^$1")}</b>, con resto <b>0</b>.`,
          `Resto cero significa que la división es exacta: $(x ${r >= 0 ? "-" : "+"} ${Math.abs(r)})$ es factor del polinomio.`]};
    }},

  factorizar: {
    titulo: "Factoriza",
    genera(){
      const tipo = elige(["comun", "diferencia", "cuadrado", "trinomio"]);
      if (tipo === "comun"){ const a = elige([2, 3, 5]), b = al(2, 6);
        return {textoPlano: true,
          enunciado: `<b>${a * b}x<sup>2</sup> + ${a * b * 2}x</b><br><span class="mini">Saca factor común. Ej: 2x(3x+4)</span>`,
          respuesta: `${a * b}x(x+2)`,
          pista: "Busca lo que se repite en los dos términos: número y letra.",
          pasos: [`En los dos hay ${a * b} y hay $x$.`, `Sacando factor común: $${a * b}x(x + 2)$.`,
            `Comprueba multiplicando hacia atrás: $${a * b}x \\cdot x = ${a * b}x^2$ y $${a * b}x \\cdot 2 = ${a * b * 2}x$.`]};
      }
      if (tipo === "diferencia"){ const a = al(2, 9);
        return {textoPlano: true,
          enunciado: `<b>x<sup>2</sup> − ${a * a}</b><br><span class="mini">Factoriza. Ej: (x+3)(x-3)</span>`,
          respuesta: `(x+${a})(x-${a})`,
          pista: "Diferencia de cuadrados: a² − b² = (a+b)(a−b).",
          pasos: [`$${a * a}$ es $${a}^2$, así que es una <b>diferencia de cuadrados</b>.`,
            `$x^2 - ${a}^2 = (x + ${a})(x - ${a})$.`,
            `Ojo: $x^2 + ${a * a}$ (con más) <b>no</b> se puede factorizar con números reales.`]};
      }
      if (tipo === "cuadrado"){ const a = al(2, 7), signo = elige([1, -1]);
        return {textoPlano: true,
          enunciado: `<b>x<sup>2</sup> ${signo > 0 ? "+" : "−"} ${2 * a}x + ${a * a}</b><br><span class="mini">Factoriza. Ej: (x+3)2</span>`,
          respuesta: `(x${signo > 0 ? "+" : "-"}${a})2`,
          pista: "Mira si es un cuadrado perfecto: primer término al cuadrado, doble producto y segundo al cuadrado.",
          pasos: [`$${a * a} = ${a}^2$ y $${2 * a}x = 2 \\cdot x \\cdot ${a}$: es el <b>doble producto</b>.`,
            `Es un cuadrado perfecto: $(x ${signo > 0 ? "+" : "-"} ${a})^2$.`]};
      }
      const p = al(1, 5), q = al(1, 5);
      return {textoPlano: true,
        enunciado: `<b>x<sup>2</sup> − ${p + q}x + ${p * q}</b><br><span class="mini">Factoriza. Ej: (x-2)(x-3)</span>`,
        respuesta: `(x-${p})(x-${q})`,
        pista: `Busca dos números que sumen ${p + q} y multiplicados den ${p * q}.`,
        pasos: [`Hacen falta dos números que sumen ${p + q} y multipliquen ${p * q}: son <b>${p} y ${q}</b>.`,
          `Queda $(x - ${p})(x - ${q})$.`,
          `Comprueba: al multiplicar sale $x^2 - ${p + q}x + ${p * q}$.`]};
    }},

  raicesPolinomio: {
    titulo: "Encuentra una raíz",
    genera(){
      const r = elige([-3, -2, -1, 1, 2, 3]);
      const q = [1, al(-4, 4), al(-6, 6)];
      const c = [q[0], q[1] - q[0] * r, q[2] - q[1] * r, -q[2] * r];
      return {textoPlano: true,
        enunciado: `<b>P(x) = ${texPoli(c).replace(/\^{(\d)}/g, "<sup>$1</sup>")}</b><br><span class="mini">Encuentra una raíz entera (un valor de x donde P(x) = 0)</span>`,
        respuesta: String(r),
        pista: `Las raíces enteras solo pueden ser divisores del término independiente (${c[3]}). Prueba con ellos.`,
        pasos: [`Las raíces enteras dividen al término independiente, que es ${c[3]}.`,
          `Probando: $P(${r}) = 0$, así que <b>${r}</b> es raíz.`,
          `Y eso significa que $(x ${r >= 0 ? "-" : "+"} ${Math.abs(r)})$ divide al polinomio: ya puedes usar Ruffini.`]};
    }},
});
