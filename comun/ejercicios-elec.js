/* ejercicios-elec.js — circuitos y electrónica.
   leyOhm ya existe en ejercicios-tec.js; aquí van los otros tres. */

Object.assign(EJERCICIOS, {

  serieParalelo: {
    titulo: "Resistencia equivalente",
    genera(){
      const vals = [10, 20, 30, 40, 50, 60, 100];
      const r1 = elige(vals), r2 = elige(vals);
      const serie = Math.random() < 0.5;
      const req = serie ? r1 + r2 : +((r1 * r2) / (r1 + r2)).toFixed(2);
      return {textoPlano: true,
        enunciado: `<b>R₁ = ${r1} Ω y R₂ = ${r2} Ω en ${serie ? "SERIE" : "PARALELO"}</b><br><span class="mini">¿Resistencia equivalente, en ohmios?</span>`,
        respuesta: String(req).replace(".", ","),
        pista: serie ? "En serie se suman sin más." : "En paralelo: producto dividido entre la suma.",
        pasos: serie
          ? [`En serie, las resistencias se <b>suman</b>: $R_{eq} = ${r1} + ${r2} = ${req}$ Ω.`,
             `Comprueba: en serie la equivalente siempre es <b>mayor</b> que cualquiera de las dos.`]
          : [`En paralelo, para dos resistencias: $R_{eq} = \\dfrac{R_1 \\cdot R_2}{R_1 + R_2}$.`,
             `$= \\dfrac{${r1} \\cdot ${r2}}{${r1 + r2}} = ${String(req).replace(".", ",")}$ Ω.`,
             `Comprueba: en paralelo la equivalente siempre es <b>menor</b> que la más pequeña. Si te sale mayor, te has equivocado.`]};
    }},

  potenciaConsumo: {
    titulo: "Potencia y consumo",
    genera(){
      const tipo = elige(["potencia", "energia", "coste"]);
      if (tipo === "potencia"){
        const V = elige([12, 24, 230]), I = elige([0.5, 1, 2, 5]);
        return {textoPlano: true,
          enunciado: `<b>V = ${V} V, I = ${String(I).replace(".", ",")} A</b><br><span class="mini">¿Qué potencia consume, en vatios?</span>`,
          respuesta: String(+(V * I).toFixed(1)).replace(".", ","),
          pista: "P = V · I",
          pasos: [`$P = V \\cdot I = ${V} \\cdot ${String(I).replace(".", ",")} = ${String(+(V * I).toFixed(1)).replace(".", ",")}$ W.`]};
      }
      if (tipo === "energia"){
        const W = elige([500, 1000, 1500, 2000, 2500]), h = elige([2, 3, 4, 5]);
        return {textoPlano: true,
          enunciado: `<b>Un aparato de ${W} W encendido ${h} horas</b><br><span class="mini">¿Cuánta energía consume, en kWh?</span>`,
          respuesta: String(+(W / 1000 * h).toFixed(2)).replace(".", ","),
          pista: "Primero pasa los vatios a kilovatios (÷1000) y luego multiplica por las horas.",
          pasos: [`${W} W son ${W / 1000} kW.`,
            `$E = P \\cdot t = ${W / 1000} \\cdot ${h} = ${String(+(W / 1000 * h).toFixed(2)).replace(".", ",")}$ kWh.`,
            `Así es exactamente como te lo cobra la factura de la luz.`]};
      }
      const W = elige([1000, 1500, 2000]), h = elige([2, 3, 4]), precio = 0.15;
      const kwh = W / 1000 * h, coste = +(kwh * precio).toFixed(2);
      return {textoPlano: true,
        enunciado: `<b>Un aparato de ${W} W, ${h} horas, a 0,15 €/kWh</b><br><span class="mini">¿Cuánto cuesta, en euros?</span>`,
        respuesta: String(coste).replace(".", ","),
        pista: "Energía en kWh, y después multiplica por el precio.",
        pasos: [`$E = ${W / 1000} \\cdot ${h} = ${kwh}$ kWh.`,
          `$Coste = ${kwh} \\cdot 0{,}15 = ${String(coste).replace(".", ",")}$ €.`]};
    }},

  codigoColores: {
    titulo: "Código de colores",
    genera(){
      const C = [["negro",0],["marrón",1],["rojo",2],["naranja",3],["amarillo",4],
                 ["verde",5],["azul",6],["violeta",7],["gris",8],["blanco",9]];
      const a = elige(C.slice(1)), b = elige(C), m = elige(C.slice(0, 5));
      const valor = (a[1] * 10 + b[1]) * Math.pow(10, m[1]);
      const alReves = Math.random() < 0.35;
      if (alReves)
        return {textoPlano: true,
          enunciado: `<b>Una resistencia de ${valor} Ω</b><br><span class="mini">¿Cuál es el <b>tercer</b> color (el multiplicador)?</span>`,
          respuesta: m[0],
          pista: "El tercer color dice cuántos ceros se añaden: negro 0, marrón 1, rojo 2, naranja 3, amarillo 4.",
          pasos: [`Las dos primeras cifras son ${a[1]}${b[1]} y hay que multiplicar por $10^{${m[1]}}$.`,
            `El multiplicador $10^{${m[1]}}$ es el color <b>${m[0]}</b>.`]};
      return {textoPlano: true,
        enunciado: `<b>${a[0]} · ${b[0]} · ${m[0]}</b><br><span class="mini">¿Cuántos ohmios vale la resistencia? (solo el número)</span>`,
        respuesta: String(valor),
        pista: "Los dos primeros colores son cifras; el tercero, los ceros que se añaden.",
        pasos: [`${a[0]} = ${a[1]}, ${b[0]} = ${b[1]} → las dos primeras cifras son <b>${a[1]}${b[1]}</b>.`,
          `${m[0]} = multiplicar por $10^{${m[1]}}$, o sea añadir ${m[1]} cero${m[1] === 1 ? "" : "s"}.`,
          `Queda <b>${valor} Ω</b>.`,
          `Se lee empezando por el extremo donde los colores están más juntos; la banda separada es la tolerancia.`]};
    }},
});
