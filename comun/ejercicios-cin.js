/* ejercicios-cin.js — generadores de cinemática (MRU, MRUA, caída libre, gráficas, MCU).

   Se usa g = 9,8 m/s², que es lo que piden en 4º ESO en Madrid.
   Las respuestas numéricas llevan `tolerancia` (relativa): se acepta el número
   aunque el alumno ponga unidades, coma o un decimal de más. */

(function(){
const G = 9.8;
const r1 = x => Math.round(x * 10) / 10;
const r2 = x => Math.round(x * 100) / 100;
const f = x => String(x).replace(".", ",");          // 12.5 → «12,5» para mostrar

Object.assign(EJERCICIOS, {

  unidadesVelocidad: {
    titulo: "km/h ↔ m/s",
    genera(){
      if (Math.random() < 0.5){
        const kmh = elige([18, 36, 54, 72, 90, 108, 120, 144]);
        const ms = r1(kmh / 3.6);
        return {textoPlano: true, tolerancia: 0.02,
          enunciado: `Un coche va a <b>${kmh} km/h</b>.<br><span class="mini">¿Cuánto es en m/s? (redondea a 1 decimal)</span>`,
          respuesta: String(ms),
          pista: "Para pasar de km/h a m/s se divide entre 3,6.",
          pasos: [`1 km = 1.000 m y 1 h = 3.600 s, así que 1 km/h = 1.000/3.600 m/s: se <b>divide entre 3,6</b>.`,
            `${kmh} ÷ 3,6 = <b>${f(ms)} m/s</b>.`]};
      }
      const ms = elige([5, 10, 15, 20, 25, 30, 40]);
      const kmh = r1(ms * 3.6);
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Un corredor va a <b>${ms} m/s</b>.<br><span class="mini">¿Cuánto es en km/h?</span>`,
        respuesta: String(kmh),
        pista: "Para pasar de m/s a km/h se multiplica por 3,6.",
        pasos: [`De m/s a km/h se <b>multiplica por 3,6</b> (lo contrario que al revés).`,
          `${ms} × 3,6 = <b>${f(kmh)} km/h</b>.`]};
    }},

  mru: {
    titulo: "Movimiento uniforme (MRU)",
    genera(){
      const v = al(2, 30), t = al(3, 40), x0 = elige([0, 0, 0, al(5, 100)]);
      const caso = elige(["posicion", "tiempo", "velocidad"]);
      const x = x0 + v * t;
      if (caso === "posicion") return {textoPlano: true, tolerancia: 0.01,
        enunciado: `Un móvil sale de x₀ = ${x0} m con velocidad constante de <b>${v} m/s</b>.<br><span class="mini">¿Dónde está a los ${t} s? (en metros)</span>`,
        respuesta: String(x),
        pista: "En el MRU: x = x₀ + v·t.",
        pasos: [`MRU: <b>x = x₀ + v·t</b>.`, `x = ${x0} + ${v}·${t} = ${x0} + ${v * t}`, `<b>x = ${x} m</b>.`]};
      if (caso === "tiempo") return {textoPlano: true, tolerancia: 0.01,
        enunciado: `Un móvil a velocidad constante de <b>${v} m/s</b> recorre <b>${v * t} m</b>.<br><span class="mini">¿Cuánto tarda? (en segundos)</span>`,
        respuesta: String(t),
        pista: "Despeja el tiempo: t = distancia / velocidad.",
        pasos: [`De Δx = v·t se despeja <b>t = Δx / v</b>.`, `t = ${v * t} / ${v}`, `<b>t = ${t} s</b>.`]};
      return {textoPlano: true, tolerancia: 0.01,
        enunciado: `Un móvil recorre <b>${v * t} m</b> en <b>${t} s</b> a velocidad constante.<br><span class="mini">¿Qué velocidad lleva? (en m/s)</span>`,
        respuesta: String(v),
        pista: "Velocidad = distancia / tiempo.",
        pasos: [`<b>v = Δx / t</b>.`, `v = ${v * t} / ${t}`, `<b>v = ${v} m/s</b>.`]};
    }},

  mrua: {
    titulo: "Movimiento acelerado (MRUA)",
    genera(){
      const caso = elige(["velocidad", "posicion", "frenada"]);
      if (caso === "velocidad"){
        const v0 = al(0, 20), a = al(1, 6), t = al(2, 12), v = v0 + a * t;
        return {textoPlano: true, tolerancia: 0.01,
          enunciado: `Parte con v₀ = <b>${v0} m/s</b> y acelera a <b>${a} m/s²</b>.<br><span class="mini">¿Qué velocidad lleva a los ${t} s? (m/s)</span>`,
          respuesta: String(v),
          pista: "v = v₀ + a·t.",
          pasos: [`<b>v = v₀ + a·t</b>.`, `v = ${v0} + ${a}·${t} = ${v0} + ${a * t}`, `<b>v = ${v} m/s</b>.`]};
      }
      if (caso === "posicion"){
        const v0 = al(0, 15), a = elige([2, 4, 6]), t = al(2, 10);
        const x = v0 * t + a * t * t / 2;
        return {textoPlano: true, tolerancia: 0.01,
          enunciado: `Parte con v₀ = <b>${v0} m/s</b> y aceleración <b>${a} m/s²</b>.<br><span class="mini">¿Qué distancia recorre en ${t} s? (m)</span>`,
          respuesta: String(x),
          pista: "Δx = v₀·t + ½·a·t². Cuidado: el tiempo va al cuadrado.",
          pasos: [`<b>Δx = v₀·t + ½·a·t²</b>.`,
            `Δx = ${v0}·${t} + ½·${a}·${t}² = ${v0 * t} + ${a * t * t / 2}`, `<b>Δx = ${x} m</b>.`]};
      }
      // frenada: v² = v0² + 2aΔx con v = 0
      const v0 = elige([10, 15, 20, 25, 30]), a = elige([2, 4, 5, 8, 10]);
      const d = r1(v0 * v0 / (2 * a));
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Un coche a <b>${v0} m/s</b> frena con una deceleración de <b>${a} m/s²</b>.<br><span class="mini">¿Cuántos metros necesita para pararse? (1 decimal)</span>`,
        respuesta: String(d),
        pista: "Si no te dan el tiempo, usa v² = v₀² + 2·a·Δx, con v = 0 y a negativa.",
        pasos: [`No sabemos el tiempo: se usa <b>v² = v₀² + 2·a·Δx</b>.`,
          `Al pararse, v = 0. La aceleración frena, así que es <b>−${a}</b>.`,
          `0 = ${v0}² − 2·${a}·Δx → Δx = ${v0 * v0} / ${2 * a}`, `<b>Δx = ${f(d)} m</b>.`]};
    }},

  caidaLibre: {
    titulo: "Caída libre",
    genera(){
      const caso = elige(["tiempo", "velocidad", "altura"]);
      if (caso === "altura"){
        const t = al(1, 5), h = r1(G * t * t / 2);
        return {textoPlano: true, tolerancia: 0.02,
          enunciado: `Sueltas una piedra desde lo alto de un puente y tarda <b>${t} s</b> en llegar al agua.<br><span class="mini">¿Qué altura tiene el puente? (m, 1 decimal, g = 9,8)</span>`,
          respuesta: String(h),
          pista: "Parte del reposo: h = ½·g·t².",
          pasos: [`Se suelta, no se lanza: <b>v₀ = 0</b>.`, `<b>h = ½·g·t²</b> = ½·9,8·${t}²`, `<b>h = ${f(h)} m</b>.`]};
      }
      const h = elige([5, 10, 20, 45, 80, 100, 125]);
      const t = r2(Math.sqrt(2 * h / G)), v = r1(Math.sqrt(2 * G * h));
      if (caso === "tiempo") return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Se deja caer un objeto desde <b>${h} m</b>.<br><span class="mini">¿Cuánto tarda en llegar al suelo? (s, 2 decimales, g = 9,8)</span>`,
        respuesta: String(t),
        pista: "De h = ½·g·t² se despeja t = √(2h/g).",
        pasos: [`<b>h = ½·g·t²</b> → <b>t = √(2h / g)</b>.`, `t = √(2·${h} / 9,8) = √${f(r2(2 * h / G))}`, `<b>t ≈ ${f(t)} s</b>.`]};
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Se deja caer un objeto desde <b>${h} m</b>.<br><span class="mini">¿Con qué velocidad llega al suelo? (m/s, 1 decimal, g = 9,8)</span>`,
        respuesta: String(v),
        pista: "Sin tiempo, usa v² = 2·g·h.",
        pasos: [`Sin el tiempo: <b>v² = v₀² + 2·g·h</b>, con v₀ = 0.`, `v = √(2·9,8·${h}) = √${f(r1(2 * G * h))}`, `<b>v ≈ ${f(v)} m/s</b>.`]};
    }},

  leerGrafica: {
    titulo: "Leer una gráfica v–t",
    genera(){
      const v0 = elige([0, 2, 4, 5, 10]), t1 = elige([2, 4, 5, 8, 10]), a = elige([1, 2, 3, -1]);
      const v1 = v0 + a * t1;
      if (v1 < 0) return EJERCICIOS.leerGrafica.genera();
      const W = 260, H = 160, pad = 28, maxV = Math.max(v0, v1, 1) * 1.25;
      const px = t => pad + (t / (t1 * 1.1)) * (W - pad - 10);
      const py = v => H - pad - (v / maxV) * (H - pad - 10);
      const svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:320px;display:block;margin:.6rem 0" aria-label="Gráfica velocidad-tiempo">
        <line x1="${pad}" y1="${H - pad}" x2="${W - 5}" y2="${H - pad}" stroke="currentColor"/>
        <line x1="${pad}" y1="5" x2="${pad}" y2="${H - pad}" stroke="currentColor"/>
        <polyline points="${px(0)},${py(v0)} ${px(t1)},${py(v1)}" fill="none" stroke="#2563eb" stroke-width="3"/>
        <text x="${pad - 4}" y="${py(v0) + 4}" font-size="11" text-anchor="end" fill="currentColor">${v0}</text>
        <text x="${pad - 4}" y="${py(v1) + 4}" font-size="11" text-anchor="end" fill="currentColor">${v1}</text>
        <text x="${px(t1)}" y="${H - pad + 14}" font-size="11" text-anchor="middle" fill="currentColor">${t1}</text>
        <text x="${W - 8}" y="${H - pad + 14}" font-size="11" text-anchor="end" fill="currentColor">t (s)</text>
        <text x="${pad + 4}" y="12" font-size="11" fill="currentColor">v (m/s)</text></svg>`;
      if (Math.random() < 0.5) return {textoPlano: true, tolerancia: 0.01,
        enunciado: `${svg}<span class="mini">¿Cuál es la aceleración? (m/s²)</span>`,
        respuesta: String(a),
        pista: "La aceleración es la pendiente: cuánto cambia la velocidad dividido entre el tiempo.",
        pasos: [`En una gráfica v–t, la <b>pendiente es la aceleración</b>.`,
          `a = (${v1} − ${v0}) / (${t1} − 0) = ${v1 - v0} / ${t1}`, `<b>a = ${a} m/s²</b>${a < 0 ? " (negativa: está frenando)" : ""}.`]};
      const d = (v0 + v1) * t1 / 2;
      return {textoPlano: true, tolerancia: 0.01,
        enunciado: `${svg}<span class="mini">¿Qué distancia recorre en esos ${t1} s? (m)</span>`,
        respuesta: String(d),
        pista: "La distancia es el área bajo la línea: aquí, un trapecio.",
        pasos: [`En una gráfica v–t, la <b>distancia es el área</b> bajo la línea.`,
          `Es un trapecio: área = (base mayor + base menor)·altura / 2 = (${v0} + ${v1})·${t1} / 2`, `<b>Δx = ${d} m</b>.`]};
    }},

  circular: {
    titulo: "Movimiento circular (MCU)",
    genera(){
      const caso = elige(["periodo", "angular", "lineal"]);
      if (caso === "periodo"){
        const vueltas = elige([10, 20, 30, 60, 120]), seg = elige([5, 10, 20, 30, 60]);
        const T = r2(seg / vueltas);
        return {textoPlano: true, tolerancia: 0.02,
          enunciado: `Una rueda da <b>${vueltas} vueltas en ${seg} s</b>.<br><span class="mini">¿Cuál es su periodo? (s, 2 decimales)</span>`,
          respuesta: String(T),
          pista: "El periodo es lo que tarda en dar UNA vuelta: tiempo / número de vueltas.",
          pasos: [`Periodo = tiempo de una vuelta = <b>t / n</b>.`, `T = ${seg} / ${vueltas}`, `<b>T = ${f(T)} s</b>. (La frecuencia es la inversa: ${f(r2(vueltas / seg))} Hz.)`]};
      }
      const T = elige([1, 2, 4, 5, 10]), w = r2(2 * Math.PI / T);
      if (caso === "angular") return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Un tiovivo da una vuelta cada <b>${T} s</b>.<br><span class="mini">¿Cuál es su velocidad angular? (rad/s, 2 decimales)</span>`,
        respuesta: String(w),
        pista: "Una vuelta son 2π radianes: ω = 2π / T.",
        pasos: [`Una vuelta completa = <b>2π rad</b>.`, `ω = 2π / T = 2π / ${T}`, `<b>ω ≈ ${f(w)} rad/s</b>.`]};
      const r = elige([0.5, 1, 2, 3, 5]), v = r2(2 * Math.PI / T * r);
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Un punto a <b>${f(r)} m</b> del centro gira con un periodo de <b>${T} s</b>.<br><span class="mini">¿Qué velocidad lineal lleva? (m/s, 2 decimales)</span>`,
        respuesta: String(v),
        pista: "Primero ω = 2π/T, luego v = ω·r.",
        pasos: [`<b>ω = 2π / T</b> = 2π / ${T} ≈ ${f(r2(2 * Math.PI / T))} rad/s.`, `<b>v = ω·r</b> = ${f(r2(2 * Math.PI / T))}·${f(r)}`, `<b>v ≈ ${f(v)} m/s</b>.`]};
    }},
});
})();
