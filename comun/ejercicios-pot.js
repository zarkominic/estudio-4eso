/* ejercicios-pot.js — potencias y notación científica. */

Object.assign(EJERCICIOS, {

  propiedadesPotencias: {
    titulo: "Simplifica la potencia",
    genera(){
      const b = elige([2, 3, 5, 7, 10]);
      const tipo = elige(["producto", "cociente", "potencia", "negativo"]);
      if (tipo === "producto"){ const m = al(2, 6), n = al(2, 6);
        return {enunciado: `${b}^{${m}} \\cdot ${b}^{${n}}`, respuesta: `${b}^${m + n}`,
          pista: "Misma base multiplicando: los exponentes se suman.",
          pasos: [`Misma base, así que se suman los exponentes: $${m} + ${n} = ${m + n}$.`,
            `Queda $${b}^{${m + n}}$.`,
            `Ojo: la base <b>no</b> se multiplica. $2^3 \\cdot 2^4$ es $2^7$, no $4^7$.`]};
      }
      if (tipo === "cociente"){ const m = al(5, 9), n = al(2, 4);
        return {enunciado: `\\dfrac{${b}^{${m}}}{${b}^{${n}}}`, respuesta: `${b}^${m - n}`,
          pista: "Misma base dividiendo: los exponentes se restan.",
          pasos: [`Se restan: $${m} - ${n} = ${m - n}$.`, `Queda $${b}^{${m - n}}$.`]};
      }
      if (tipo === "potencia"){ const m = al(2, 4), n = al(2, 4);
        return {enunciado: `\\left(${b}^{${m}}\\right)^{${n}}`, respuesta: `${b}^${m * n}`,
          pista: "Potencia de una potencia: los exponentes se multiplican.",
          pasos: [`Se multiplican: $${m} \\cdot ${n} = ${m * n}$.`, `Queda $${b}^{${m * n}}$.`,
            `No confundir con $${b}^{${m}} \\cdot ${b}^{${n}} = ${b}^{${m + n}}$, donde se suman.`]};
      }
      const n = al(2, 4);
      return {enunciado: `${b}^{-${n}}`, respuesta: `1/${Math.pow(b, n)}`,
        pista: "Exponente negativo significa «uno partido por».",
        pasos: [`$${b}^{-${n}} = \\dfrac{1}{${b}^{${n}}}$`,
          `$= \\dfrac{1}{${Math.pow(b, n)}}$`,
          `El signo menos del exponente <b>no</b> hace negativo el resultado: lo pone en el denominador.`]};
    }},

  aNotacionCientifica: {
    titulo: "Pasa a notación científica",
    genera(){
      const grande = Math.random() < 0.5;
      const cifras = al(1, 9) + "," + al(10, 99);
      const exp = grande ? al(3, 11) : -al(2, 9);
      const valor = grande
        ? (cifras.replace(",", "") + "0".repeat(Math.max(0, exp - 2))).replace(/^(\d)/, "$1")
        : "0," + "0".repeat(-exp - 1) + cifras.replace(",", "");
      return {textoPlano: true,
        enunciado: `<b style="font-size:1.2rem">${valor}</b><br><span class="mini">Escríbelo en notación científica, así: 3,45e8 o 3,45e-6</span>`,
        respuesta: `${cifras}e${exp}`,
        pista: "Coloca la coma detrás de la primera cifra y cuenta cuántos lugares la has movido.",
        pasos: [`La coma tiene que quedar detrás de la primera cifra: <b>${cifras}</b>.`,
          `Se ha movido ${Math.abs(exp)} lugares hacia la ${grande ? "izquierda" : "derecha"}, así que el exponente es <b>${exp}</b>.`,
          `Queda $${cifras.replace(",", "{,}")} \\cdot 10^{${exp}}$.`,
          grande ? `Números grandes → exponente positivo.` : `Números pequeños → exponente negativo. El signo dice el tamaño, no que sea negativo.`]};
    }},

  operarNotacion: {
    titulo: "Opera en notación científica",
    genera(){
      const a1 = +(al(10, 90) / 10).toFixed(1), e1 = al(3, 9);
      const a2 = +(al(10, 90) / 10).toFixed(1), e2 = al(2, 6);
      const multiplicar = Math.random() < 0.5;
      const prod = +(multiplicar ? a1 * a2 : a1 / a2).toFixed(4);
      let mant = prod, exp = multiplicar ? e1 + e2 : e1 - e2;
      while (mant >= 10){ mant = +(mant / 10).toFixed(4); exp++; }
      while (mant < 1){ mant = +(mant * 10).toFixed(4); exp--; }
      mant = +mant.toFixed(2);
      return {textoPlano: true,
        enunciado: `<b>(${String(a1).replace(".", ",")} · 10<sup>${e1}</sup>) ${multiplicar ? "×" : "÷"} (${String(a2).replace(".", ",")} · 10<sup>${e2}</sup>)</b><br><span class="mini">Resultado en notación científica (2 decimales): 3,45e8</span>`,
        respuesta: `${String(mant).replace(".", ",")}e${exp}`,
        pista: multiplicar ? "Multiplica los números de delante y suma los exponentes."
                           : "Divide los números de delante y resta los exponentes.",
        pasos: [`${multiplicar ? "Multiplica" : "Divide"} las partes decimales: $${String(a1).replace(".", ",")} ${multiplicar ? "\\cdot" : "\\div"} ${String(a2).replace(".", ",")} = ${String(prod).replace(".", ",")}$.`,
          `${multiplicar ? "Suma" : "Resta"} los exponentes: $${e1} ${multiplicar ? "+" : "-"} ${e2} = ${multiplicar ? e1 + e2 : e1 - e2}$.`,
          `Ajusta para que la parte decimal quede entre 1 y 10: <b>${String(mant).replace(".", ",")} · 10<sup>${exp}</sup></b>.`]};
    }},

  ordenMagnitud: {
    titulo: "Compara tamaños",
    genera(){
      const casos = [
        {a:"el diámetro de un átomo", ea:-10, b:"el grosor de un pelo", eb:-4},
        {a:"un virus", ea:-7, b:"una célula", eb:-5},
        {a:"la distancia a la Luna", ea:8, b:"el radio de la Tierra", eb:6},
        {a:"la distancia al Sol", ea:11, b:"la distancia a la Luna", eb:8},
        {a:"la masa de la Tierra en kg", ea:24, b:"la masa de una persona", eb:2},
        {a:"un segundo", ea:0, b:"la edad del universo en segundos", eb:17},
      ];
      const c = elige(casos);
      const dif = Math.abs(c.eb - c.ea);
      return {textoPlano: true,
        enunciado: `<b>${c.a[0].toUpperCase() + c.a.slice(1)} ≈ 10<sup>${c.ea}</sup> · ${c.b} ≈ 10<sup>${c.eb}</sup></b><br><span class="mini">¿Cuántas veces más grande es uno que otro? Escribe solo el exponente: si son 10⁶ veces, escribe 6</span>`,
        respuesta: String(dif),
        pista: "Al dividir potencias de 10, los exponentes se restan.",
        pasos: [`$\\dfrac{10^{${Math.max(c.ea, c.eb)}}}{10^{${Math.min(c.ea, c.eb)}}} = 10^{${dif}}$`,
          `Son <b>10<sup>${dif}</sup></b> veces, o sea un 1 seguido de ${dif} ceros.`,
          `Esa diferencia se llama <b>orden de magnitud</b>, y es como se comparan cosas de tamaños muy distintos.`]};
    }},
});
