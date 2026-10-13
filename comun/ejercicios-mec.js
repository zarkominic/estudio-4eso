/* ejercicios-mec.js — mecanismos: palanca, poleas, engranajes, piñón-cremallera,
   tornillo sin fin, leva y biela-manivela.
   Respuestas numéricas con `tolerancia`: se acepta «40 N», «40,0» o «40 rpm». */
(function(){
const r2 = x => Math.round(x * 100) / 100;
const f = x => String(r2(x)).replace(".", ",");

const GENEROS = [
  ["Unas tijeras", 1, "El eje (fulcro) está en medio, entre las cuchillas (resistencia) y los dedos (potencia)."],
  ["Un balancín del parque", 1, "El apoyo está en el centro; un niño hace de potencia y el otro de resistencia."],
  ["Unos alicates", 1, "El eje está entre las mandíbulas y los mangos."],
  ["Un sacaclavos (pata de cabra)", 1, "Se apoya en la madera, entre el clavo y tu mano."],
  ["Una carretilla", 2, "El apoyo es la rueda; la carga va en medio; tú levantas en el extremo."],
  ["Un cascanueces", 2, "La bisagra es el apoyo, la nuez en medio, tu mano en la punta."],
  ["Un abrebotellas", 2, "Se apoya en el borde de la chapa; la chapa (resistencia) queda en medio."],
  ["Unas pinzas de depilar", 3, "El apoyo está en la unión, tus dedos en medio y la punta coge el pelo."],
  ["Una caña de pescar", 3, "Una mano fija el extremo (apoyo), la otra empuja en medio y el pez tira en la punta."],
  ["El antebrazo al levantar un peso", 3, "El codo es el apoyo, el bíceps tira en medio y el peso está en la mano."],
  ["Una escoba al barrer", 3, "La mano de arriba es el apoyo, la de abajo empuja, la resistencia está en el cepillo."],
];

const MECS = [
  ["La dirección de un coche: giras el volante y las ruedas se mueven hacia un lado en línea recta", "piñón-cremallera", ["pinon cremallera","pinon-cremallera","cremallera"], "Un giro (piñón) se convierte en un movimiento recto (cremallera)."],
  ["Una puerta corredera de garaje movida por un motor", "piñón-cremallera", ["pinon cremallera","pinon-cremallera","cremallera"], "El motor gira un piñón que arrastra una barra dentada recta fijada a la puerta."],
  ["El clavijero de una guitarra: muchas vueltas de la llave para tensar un poco la cuerda", "tornillo sin fin", ["sinfin","sin fin","tornillo sinfin","tornillo sin fin-corona"], "Gran reducción y no se destensa sola: el sin fin no puede ser movido por la rueda."],
  ["Un torno de elevación que no debe bajar solo cuando se suelta la manivela", "tornillo sin fin", ["sinfin","sin fin","tornillo sinfin"], "El sin fin es irreversible: la carga no puede hacer girar al tornillo."],
  ["El árbol de levas que abre las válvulas de un motor", "leva", ["levas","leva y seguidor","arbol de levas"], "Un giro se convierte en un sube y baja (alternativo) del seguidor."],
  ["Una caja de música: unas púas suben y bajan al girar un cilindro con salientes", "leva", ["levas","leva y seguidor"], "Cada saliente es una leva que empuja un seguidor."],
  ["El pistón de un motor que hace girar el cigüeñal", "biela-manivela", ["biela manivela","biela","cigueñal","cigüeñal"], "Movimiento rectilíneo alternativo ↔ giro. Funciona en los dos sentidos."],
  ["Una máquina de coser antigua de pedal", "biela-manivela", ["biela manivela","biela"], "El pedal va y viene; la biela lo convierte en el giro de la rueda."],
  ["La bici: los pedales giran un plato y la cadena mueve el piñón trasero", "cadena", ["cadena y pinones","piñones y cadena","pinones y cadena","transmision por cadena","cadena-piñon"], "Transmite giro entre dos ejes lejanos sin patinar."],
  ["La lavadora: el motor mueve el tambor con una correa", "poleas", ["polea","poleas y correa","polea y correa","correa"], "Dos poleas unidas por correa transmiten el giro y reducen la velocidad."],
  ["Un grúa de obra que levanta cargas con varias poleas, unas fijas y otras móviles", "polipasto", ["polipastos","aparejo"], "Con n poleas móviles la fuerza se divide entre 2n."],
];

Object.assign(EJERCICIOS, {
  palanca: {
    titulo: "Ley de la palanca",
    genera(){
      const BP = elige([20, 25, 30, 40, 50, 60, 80, 100, 120, 150]);   // cm
      const BR = elige([5, 10, 15, 20, 25]).valueOf();
      const R = elige([100, 150, 200, 240, 300, 400, 500, 600, 900, 1200]);
      const caso = elige(["F", "F", "R", "bp"]);
      const F = R * BR / BP;
      if (caso === "F") return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Con una palanca quieres levantar <b>R = ${R} N</b>. La resistencia está a <b>${BR} cm</b> del apoyo y tú empujas a <b>${BP} cm</b>.<br><span class="mini">¿Qué fuerza F hace falta? (en N, 2 decimales si salen)</span>`,
        respuesta: String(r2(F)),
        pista: "Ley de la palanca: F · bF = R · bR. Despeja F.",
        pasos: [`<b>F · bF = R · bR</b> (fuerza por su brazo = resistencia por el suyo).`,
          `F · ${BP} = ${R} · ${BR} = ${R * BR}`,
          `F = ${R * BR} / ${BP} = <b>${f(F)} N</b>. Los cm no hay que pasarlos a m: están a los dos lados.`]};
      if (caso === "R") {
        const Fd = elige([50, 80, 100, 150, 200, 250]);
        const Rr = Fd * BP / BR;
        return {textoPlano: true, tolerancia: 0.02,
          enunciado: `Empujas con <b>F = ${Fd} N</b> a <b>${BP} cm</b> del apoyo. La carga está a <b>${BR} cm</b> del apoyo.<br><span class="mini">¿Qué resistencia R puedes levantar? (en N)</span>`,
          respuesta: String(r2(Rr)),
          pista: "F · bF = R · bR. Despeja R.",
          pasos: [`<b>F · bF = R · bR</b>`, `${Fd} · ${BP} = R · ${BR} → ${Fd * BP} = R · ${BR}`,
            `R = ${Fd * BP} / ${BR} = <b>${f(Rr)} N</b>.`]};
      }
      const Fd = elige([50, 100, 150, 200, 300]);
      const bp = R * BR / Fd;
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Tienes que levantar <b>${R} N</b> que están a <b>${BR} cm</b> del apoyo, y solo puedes hacer <b>${Fd} N</b>.<br><span class="mini">¿A qué distancia del apoyo tienes que empujar? (en cm)</span>`,
        respuesta: String(r2(bp)),
        pista: "F · bF = R · bR. La incógnita es bF.",
        pasos: [`<b>F · bF = R · bR</b>`, `${Fd} · bF = ${R} · ${BR} = ${R * BR}`,
          `bF = ${R * BR} / ${Fd} = <b>${f(bp)} cm</b>.`]};
    }},

  generoPalanca: {
    titulo: "¿Qué género de palanca es?",
    genera(){
      const [obj, g, por] = elige(GENEROS);
      return {textoPlano: true,
        enunciado: `<b>${obj}</b><br><span class="mini">¿Palanca de 1.º, 2.º o 3.er género? (escribe 1, 2 o 3)</span>`,
        respuesta: String(g), respuestaAlt: [g + "º", g + "o", ["primer","segundo","tercer"][g - 1], ["primero","segundo","tercero"][g - 1], g + "er", g + "ª"],
        pista: "Mira qué está en medio: el apoyo (1.º), la resistencia (2.º) o la fuerza (3.º).",
        pasos: [por, `Lo que queda en medio decide: <b>${g}.º género</b>.`]};
    }},

  polipasto: {
    titulo: "Poleas y polipastos",
    genera(){
      const kg = elige([20, 30, 40, 50, 60, 80, 100, 120, 150, 200]);
      const R = kg * 10;
      const n = elige([0, 1, 1, 2, 2, 3]);
      const F = R / (n === 0 ? 1 : 2 * n);
      const tipo = n === 0 ? "una <b>polea fija</b>" : n === 1 ? "una <b>polea móvil</b>" : `un <b>polipasto con ${n} poleas móviles</b>`;
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Hay que subir una carga de <b>${kg} kg</b> (toma g = 10 m/s²) con ${tipo}.<br><span class="mini">¿Qué fuerza hay que hacer? (en N)</span>`,
        respuesta: String(r2(F)),
        pista: "Peso = m·g. Polea fija: F = R. Con n poleas móviles: F = R / (2n).",
        pasos: [`Peso: R = ${kg} · 10 = <b>${R} N</b>.`,
          n === 0 ? `La polea fija <b>no reduce la fuerza</b>: solo cambia su dirección. F = R.`
                  : `Cada polea móvil reparte la carga entre dos tramos de cuerda: <b>F = R / (2·${n}) = R / ${2 * n}</b>.`,
          `F = ${R} / ${n === 0 ? 1 : 2 * n} = <b>${f(F)} N</b>.`]};
    }},

  relacionTransmision: {
    titulo: "Relación de transmisión",
    genera(){
      const z1 = elige([10, 12, 15, 20, 24, 30, 36, 40, 48, 60]);
      let z2 = elige([10, 12, 15, 20, 24, 30, 36, 40, 48, 60, 80]);
      if (z2 === z1) z2 = z1 * 2;
      const conPoleas = Math.random() < 0.3;
      const i = z1 / z2;
      const pal = conPoleas ? ["diámetro", "cm", "polea motriz", "polea conducida"] : ["dientes", "dientes", "engranaje motor", "engranaje conducido"];
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `${conPoleas ? "Sistema de poleas con correa" : "Dos engranajes"}: la <b>${pal[2]}</b> tiene ${z1} ${pal[1]}${conPoleas ? " de diámetro" : ""} y la <b>${pal[3]}</b> ${z2} ${pal[1]}${conPoleas ? " de diámetro" : ""}.<br><span class="mini">¿Relación de transmisión i = n₂/n₁? (decimal, 2 cifras)</span>`,
        respuesta: String(r2(i)), respuestaAlt: [`${z1}/${z2}`],
        pista: conPoleas ? "i = n₂/n₁ = d₁/d₂ (motriz entre conducida)." : "i = n₂/n₁ = Z₁/Z₂ (dientes del motor entre los del conducido).",
        pasos: [conPoleas ? `<b>i = d₁ / d₂</b>` : `<b>i = Z₁ / Z₂</b>`,
          `i = ${z1} / ${z2} = <b>${f(i)}</b>`,
          i < 1 ? `Menor que 1: es un <b>reductor</b> (sale más lento y con más fuerza).` : `Mayor que 1: es un <b>multiplicador</b> (sale más rápido y con menos fuerza).`]};
    }},

  rpmSalida: {
    titulo: "Velocidad de salida (rpm)",
    genera(){
      const z1 = elige([12, 15, 20, 24, 30, 40, 48]);
      const z2 = elige([10, 12, 20, 30, 36, 40, 60, 80].filter(z => z !== z1));
      const n1 = elige([60, 90, 120, 180, 240, 300, 600, 1200, 1500]);
      const n2 = n1 * z1 / z2;
      if (Math.random() < 0.7) return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Un motor gira a <b>${n1} rpm</b> con un engranaje de <b>${z1} dientes</b>, que mueve otro de <b>${z2} dientes</b>.<br><span class="mini">¿A cuántas rpm gira el segundo?</span>`,
        respuesta: String(r2(n2)),
        pista: "n₁ · Z₁ = n₂ · Z₂: los dientes que pasan por el punto de contacto son los mismos.",
        pasos: [`<b>n₁ · Z₁ = n₂ · Z₂</b>`, `${n1} · ${z1} = n₂ · ${z2} → ${n1 * z1} = n₂ · ${z2}`,
          `n₂ = ${n1 * z1} / ${z2} = <b>${f(n2)} rpm</b>.`,
          z2 > z1 ? "El grande va más lento: tiene sentido." : "El pequeño va más rápido: tiene sentido."]};
      const Z2 = n1 * z1 / n2;
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Un engranaje de <b>${z1} dientes</b> gira a <b>${n1} rpm</b>. Queremos que el conducido gire a <b>${f(n2)} rpm</b>.<br><span class="mini">¿Cuántos dientes debe tener el conducido?</span>`,
        respuesta: String(r2(Z2)),
        pista: "n₁ · Z₁ = n₂ · Z₂; despeja Z₂.",
        pasos: [`<b>n₁ · Z₁ = n₂ · Z₂</b>`, `Z₂ = n₁ · Z₁ / n₂ = ${n1 * z1} / ${f(n2)}`, `<b>Z₂ = ${f(Z2)} dientes</b>.`]};
    }},

  trenEngranajes: {
    titulo: "Tren de engranajes (dos etapas)",
    genera(){
      const n1 = elige([600, 900, 1200, 1500, 1800, 3000]);
      const za = elige([10, 12, 15, 20]), zb = elige([30, 40, 45, 60]);
      const zc = elige([10, 12, 15, 20]), zd = elige([30, 40, 50, 60]);
      const i = (za / zb) * (zc / zd), nS = n1 * i;
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Un motor a <b>${n1} rpm</b> lleva un piñón de ${za} dientes que engrana con una rueda de ${zb}. En el mismo eje de esa rueda va un piñón de ${zc} dientes que mueve una rueda de ${zd}.<br><span class="mini">¿A cuántas rpm gira el eje de salida?</span>`,
        respuesta: String(r2(nS)),
        pista: "La relación total es el producto de las relaciones: i = (Z₁/Z₂)·(Z₃/Z₄).",
        pasos: [`Etapa 1: i₁ = ${za}/${zb} = ${f(za / zb)}. El eje intermedio gira a ${n1} · ${f(za / zb)} = ${f(n1 * za / zb)} rpm.`,
          `Etapa 2: i₂ = ${zc}/${zd} = ${f(zc / zd)}. Los dos engranajes del eje intermedio giran igual.`,
          `n salida = ${f(n1 * za / zb)} · ${f(zc / zd)} = <b>${f(nS)} rpm</b> (i total = ${f(i)}).`]};
    }},

  cremalleraSinFin: {
    titulo: "Piñón-cremallera y tornillo sin fin",
    genera(){
      if (Math.random() < 0.5){
        const Z = elige([10, 12, 15, 16, 20, 24, 30]), p = elige([2, 3, 4, 5]);   // mm
        const v = elige([1, 2, 3, 5, 10, 0.5]);
        const d = Z * p * v;
        return {textoPlano: true, tolerancia: 0.02,
          enunciado: `Un piñón de <b>${Z} dientes</b> engrana con una cremallera cuyos dientes están separados <b>${p} mm</b> (paso).<br><span class="mini">¿Cuántos mm avanza la cremallera si el piñón da ${String(v).replace(".", ",")} vuelta${v === 1 ? "" : "s"}?</span>`,
          respuesta: String(r2(d)),
          pista: "En cada vuelta pasan Z dientes, y cada diente es un paso p: avance = Z · p · vueltas.",
          pasos: [`Por vuelta avanza <b>Z · p = ${Z} · ${p} = ${Z * p} mm</b>.`, `Avance = ${Z * p} · ${String(v).replace(".", ",")} = <b>${f(d)} mm</b>.`]};
      }
      const zc = elige([20, 24, 30, 40, 50, 60]), n1 = elige([600, 900, 1200, 1500, 3000]);
      const ent = elige([1, 1, 1, 2]);
      const n2 = n1 * ent / zc;
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Un tornillo sin fin de <b>${ent} entrada${ent > 1 ? "s" : ""}</b> gira a <b>${n1} rpm</b> y mueve una corona de <b>${zc} dientes</b>.<br><span class="mini">¿A cuántas rpm gira la corona?</span>`,
        respuesta: String(r2(n2)),
        pista: "Cada vuelta del sin fin avanza la corona tantos dientes como entradas tenga: n₂ = n₁ · e / Z.",
        pasos: [`Con ${ent} entrada${ent > 1 ? "s" : ""}, una vuelta del tornillo mueve <b>${ent} diente${ent > 1 ? "s" : ""}</b> de la corona.`,
          `La corona necesita ${zc}/${ent} = ${f(zc / ent)} vueltas del tornillo para dar una.`,
          `n₂ = ${n1} · ${ent} / ${zc} = <b>${f(n2)} rpm</b>.`]};
    }},

  tipoMecanismo: {
    titulo: "¿Qué mecanismo es?",
    genera(){
      const [s, r, alt, por] = elige(MECS);
      return {textoPlano: true,
        enunciado: `${s}.<br><span class="mini">¿Qué mecanismo es? (palanca, poleas, polipasto, cadena, engranajes, piñón-cremallera, tornillo sin fin, leva, biela-manivela)</span>`,
        respuesta: r, respuestaAlt: alt,
        pista: "Primero: ¿transmite un giro a otro giro, o transforma giro en recto o en vaivén?",
        pasos: [por, `Es <b>${r}</b>.`]};
    }},
});
})();
