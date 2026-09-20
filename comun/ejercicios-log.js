/* ejercicios-log.js — generadores de logaritmos. Se suman al motor común. */

Object.assign(EJERCICIOS, {

  calcularLog: {
    titulo: "Calcula el logaritmo",
    genera(){
      const base = elige([2, 3, 5, 10]);
      const exp = al(0, 5);
      const arg = Math.pow(base, exp);
      const alReves = Math.random() < 0.25;
      if (alReves)
        return {enunciado: `\\text{Si } \\log_{${base}} x = ${exp}, \\text{ ¿cuánto vale } x\\text{?}`,
          respuesta: String(arg), pista: `El logaritmo es el exponente: $x = ${base}^{${exp}}$.`,
          pasos: [`Por definición, $\\log_{${base}} x = ${exp}$ significa $${base}^{${exp}} = x$.`,
            `$x = ${arg}$.`]};
      return {enunciado: `\\log_{${base}} ${arg}`,
        respuesta: String(exp),
        pista: `Pregúntate: ¿a qué número hay que elevar ${base} para que salga ${arg}?`,
        pasos: [`El logaritmo pregunta por el exponente: $${base}^{?} = ${arg}$.`,
          `Como $${base}^{${exp}} = ${arg}$, el logaritmo vale <b>${exp}</b>.`,
          exp === 0 ? `Ojo: el logaritmo de 1 siempre es 0, sea cual sea la base, porque cualquier número elevado a 0 da 1.` :
          exp === 1 ? `Cuando el argumento es la propia base, el logaritmo vale 1.` :
          `Truco para comprobar: eleva la base al resultado y tiene que salir el argumento.`]};
    }},

  propiedadesLog: {
    titulo: "Usa las propiedades",
    genera(){
      const b = elige([2, 3, 10]);
      const m = al(1, 4), n = al(1, 4);
      const tipo = elige(["producto", "cociente", "potencia"]);
      const A = Math.pow(b, m), B = Math.pow(b, n);
      if (tipo === "producto")
        return {enunciado: `\\log_{${b}} ${A} + \\log_{${b}} ${B}`,
          respuesta: String(m + n), pista: "Sumar logaritmos de la misma base es el logaritmo del producto.",
          pasos: [`$\\log_{${b}} ${A} + \\log_{${b}} ${B} = \\log_{${b}} (${A} \\cdot ${B}) = \\log_{${b}} ${A * B}$.`,
            `$${b}^{${m + n}} = ${A * B}$, así que vale <b>${m + n}</b>.`,
            `Atajo: como $\\log_{${b}} ${A} = ${m}$ y $\\log_{${b}} ${B} = ${n}$, basta sumar ${m} + ${n}.`]};
      if (tipo === "cociente"){
        const [may, men, r] = m >= n ? [A, B, m - n] : [B, A, n - m];
        return {enunciado: `\\log_{${b}} ${may} - \\log_{${b}} ${men}`,
          respuesta: String(r), pista: "Restar logaritmos es el logaritmo del cociente.",
          pasos: [`$\\log_{${b}} ${may} - \\log_{${b}} ${men} = \\log_{${b}} \\dfrac{${may}}{${men}} = \\log_{${b}} ${may / men}$.`,
            `Vale <b>${r}</b>.`]};
      }
      const k = al(2, 3);
      return {enunciado: `\\log_{${b}} ${A}^{${k}}`,
        respuesta: String(m * k), pista: "El exponente de dentro sale fuera multiplicando.",
        pasos: [`$\\log_{${b}} ${A}^{${k}} = ${k} \\cdot \\log_{${b}} ${A}$.`,
          `Como $\\log_{${b}} ${A} = ${m}$, queda $${k} \\cdot ${m} = ${m * k}$.`]};
    }},

  ecuacionExponencial: {
    titulo: "Ecuación exponencial",
    genera(){
      const b = elige([2, 3, 5]);
      const x = al(2, 5);
      const tipo = elige(["directa", "desplazada"]);
      if (tipo === "directa")
        return {enunciado: `${b}^{x} = ${Math.pow(b, x)}`,
          respuesta: String(x), pista: "Escribe el número de la derecha como potencia de la misma base.",
          pasos: [`$${Math.pow(b, x)} = ${b}^{${x}}$.`,
            `Si las bases son iguales, los exponentes también: $x = ${x}$.`,
            `También se puede hacer con logaritmos: $x = \\log_{${b}} ${Math.pow(b, x)} = ${x}$.`]};
      const k = al(1, 3);
      return {enunciado: `${b}^{x+${k}} = ${Math.pow(b, x + k)}`,
        respuesta: String(x), pista: "Iguala los exponentes y resuelve la ecuación de primer grado.",
        pasos: [`$${Math.pow(b, x + k)} = ${b}^{${x + k}}$.`,
          `Misma base, así que $x + ${k} = ${x + k}$.`,
          `$x = ${x + k} - ${k} = ${x}$.`]};
    }},

  aplicacionLog: {
    titulo: "Problema con logaritmos",
    genera(){
      const tipos = [
        () => { const c = elige([-3, -5, -7, -9, -11]);
          return {enunciado: `\\text{Una disolución tiene } [\\text{H}^+] = 10^{${c}} \\text{ M. ¿Cuál es su pH?}`,
            respuesta: String(-c), pista: "pH = −log[H⁺]. Y el logaritmo de una potencia de 10 es su exponente.",
            pasos: [`$\\text{pH} = -\\log 10^{${c}} = -(${c}) = ${-c}$.`,
              `${-c < 7 ? "Menor que 7: es ácida." : -c === 7 ? "Exactamente 7: neutra." : "Mayor que 7: es básica."}`,
              `La escala de pH es logarítmica: cada unidad es 10 veces más ácido.`]}; },
        () => { const veces = elige([10, 100, 1000, 10000]);
          return {enunciado: `\\text{Un sonido es ${veces} veces más intenso que otro. ¿Cuántos decibelios más tiene?}`,
            respuesta: String(10 * Math.log10(veces)), pista: "dB = 10·log(relación de intensidades).",
            pasos: [`$10 \\cdot \\log ${veces} = 10 \\cdot ${Math.log10(veces)} = ${10 * Math.log10(veces)}$ dB.`,
              `Por eso la escala de decibelios engaña: 20 dB más no es el doble, son 100 veces más intenso.`]}; },
        () => { const cap = elige([1000, 2000, 5000]), r = elige([2, 4, 5]), años = elige([2, 3, 4]);
          const fin = +(cap * Math.pow(1 + r / 100, años)).toFixed(2);
          return {enunciado: `\\text{${cap} € al ${r}\\% compuesto durante ${años} años. ¿Cuánto hay al final?}`,
            respuesta: String(fin).replace(".", ","), pista: `Capital final = capital · (1 + rédito)^años.`,
            pasos: [`$C_f = ${cap} \\cdot (1 + ${r / 100})^{${años}} = ${cap} \\cdot ${Math.pow(1 + r / 100, años).toFixed(4)}$`,
              `$= ${String(fin).replace(".", ",")}$ €.`,
              `Si en vez del dinero te preguntan <b>cuántos años</b> hacen falta, ahí es donde entra el logaritmo: hay que despejar el exponente.`]}; },
      ];
      return elige(tipos)();
    }},
});
