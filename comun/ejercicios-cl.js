/* ejercicios-cl.js — generadores de caída libre y lanzamiento vertical (fyq-caida-libre).

   Criterio de signos de todo el tema: eje y hacia ARRIBA, origen en el suelo.
   Por eso la aceleración es siempre −g, con g = 9,8 m/s²:
     y = y₀ + v₀·t − ½·g·t²     v = v₀ − g·t     v² = v₀² − 2·g·(y − y₀)
   Las respuestas numéricas llevan `tolerancia` (relativa): se acepta el número
   aunque el alumno ponga unidades, coma o un decimal de más. */

(function(){
const G = 9.8;
const r1 = x => Math.round(x * 10) / 10;
const r2 = x => Math.round(x * 100) / 100;
const f = x => String(x).replace(".", ",").replace("-", "−");   // 12.5 → «12,5» para mostrar

Object.assign(EJERCICIOS, {

  clSoltar: {
    titulo: "Soltar desde una altura",
    genera(){
      const h = elige([5, 10, 15, 20, 30, 45, 60, 80, 100, 125]);
      const t = r2(Math.sqrt(2 * h / G)), v = r1(Math.sqrt(2 * G * h));
      if (Math.random() < 0.5) return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Sueltas una pelota desde <b>${h} m</b> de altura.<br><span class="mini">¿Cuánto tarda en llegar al suelo? (s, 2 decimales, g = 9,8)</span>`,
        respuesta: String(t),
        pista: "Se suelta: v₀ = 0. Llega al suelo cuando y = 0, así que h = ½·g·t².",
        pasos: [`Eje hacia arriba, suelo en y = 0: y₀ = ${h} m, v₀ = 0.`,
          `Llega cuando y = 0: 0 = ${h} − ½·9,8·t² → <b>t = √(2h / g)</b>.`,
          `t = √(2·${h} / 9,8) = √${f(r2(2 * h / G))}`, `<b>t ≈ ${f(t)} s</b>.`]};
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Sueltas una pelota desde <b>${h} m</b> de altura.<br><span class="mini">¿Con qué rapidez llega al suelo? (m/s, 1 decimal, g = 9,8)</span>`,
        respuesta: String(v),
        pista: "Sin tiempo: v² = v₀² − 2·g·(y − y₀), con v₀ = 0 e y − y₀ = −h.",
        pasos: [`v₀ = 0 y baja ${h} m: <b>y − y₀ = −${h} m</b>.`,
          `v² = 0 − 2·9,8·(−${h}) = ${f(r1(2 * G * h))}`,
          `v = −√${f(r1(2 * G * h))} ≈ −${f(v)} m/s. El signo menos solo dice que va hacia abajo.`,
          `Rapidez: <b>${f(v)} m/s</b>.`]};
    }},

  clAlturaMax: {
    titulo: "Altura máxima",
    genera(){
      const v0 = elige([5, 7, 10, 12, 14, 15, 20, 25, 30]);
      const h = r1(v0 * v0 / (2 * G));
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Lanzas una pelota hacia arriba desde el suelo a <b>${v0} m/s</b>.<br><span class="mini">¿Qué altura máxima alcanza? (m, 1 decimal, g = 9,8)</span>`,
        respuesta: String(h),
        pista: "Arriba del todo v = 0. Usa v² = v₀² − 2·g·h y despeja h.",
        pasos: [`En el punto más alto la velocidad es <b>0</b> (la aceleración no: sigue siendo −9,8).`,
          `0 = ${v0}² − 2·9,8·h → <b>h = v₀² / (2g)</b>.`,
          `h = ${v0 * v0} / 19,6`, `<b>h ≈ ${f(h)} m</b>.`]};
    }},

  clTiempoVuelo: {
    titulo: "Tiempo de subida y tiempo total",
    genera(){
      const v0 = elige([4.9, 9.8, 14.7, 19.6, 10, 15, 20, 25]);
      const ts = r2(v0 / G), tt = r2(2 * v0 / G);
      if (Math.random() < 0.5) return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Lanzas una piedra hacia arriba desde el suelo a <b>${f(v0)} m/s</b>.<br><span class="mini">¿Cuánto tarda en llegar arriba del todo? (s, 2 decimales)</span>`,
        respuesta: String(ts),
        pista: "Arriba v = 0. Usa v = v₀ − g·t.",
        pasos: [`Arriba: <b>v = 0</b>.`, `0 = ${f(v0)} − 9,8·t → <b>t = v₀ / g</b>.`, `t = ${f(v0)} / 9,8 ≈ <b>${f(ts)} s</b>.`]};
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Lanzas una piedra hacia arriba desde el suelo a <b>${f(v0)} m/s</b> y la recoges a la misma altura.<br><span class="mini">¿Cuánto tiempo está en el aire? (s, 2 decimales)</span>`,
        respuesta: String(tt),
        pista: "Tarda lo mismo en subir que en bajar: tiempo total = 2·v₀ / g.",
        pasos: [`Subida: t = v₀ / g = ${f(v0)} / 9,8 ≈ ${f(ts)} s.`,
          `Por simetría, la bajada dura lo mismo.`,
          `Otra forma: y = 0 → 0 = ${f(v0)}·t − 4,9·t² → t·(${f(v0)} − 4,9·t) = 0 → t = 0 (sale) o t = ${f(v0)}/4,9.`,
          `<b>t ≈ ${f(tt)} s</b>.`]};
    }},

  clLanzaAbajo: {
    titulo: "Lanzar hacia abajo",
    genera(){
      const v0 = elige([2, 3, 5, 8, 10]), h = elige([10, 15, 20, 30, 40, 50, 80]);
      const v = r1(Math.sqrt(v0 * v0 + 2 * G * h));
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Desde una ventana a <b>${h} m</b> lanzas una llave <b>hacia abajo</b> a <b>${v0} m/s</b>.<br><span class="mini">¿Con qué rapidez llega al suelo? (m/s, 1 decimal)</span>`,
        respuesta: String(v),
        pista: "Hacia abajo, así que v₀ = −" + v0 + ". Al elevar al cuadrado el signo desaparece: v² = v₀² + 2·g·h.",
        pasos: [`Con el eje hacia arriba: <b>v₀ = −${v0} m/s</b>, y − y₀ = −${h} m.`,
          `v² = v₀² − 2·g·(y − y₀) = ${v0 * v0} − 2·9,8·(−${h}) = ${v0 * v0} + ${f(r1(2 * G * h))} = ${f(r1(v0 * v0 + 2 * G * h))}`,
          `<b>|v| ≈ ${f(v)} m/s</b>, hacia abajo. Más que si la soltaras (${f(r1(Math.sqrt(2 * G * h)))} m/s).`]};
    }},

  clPosicion: {
    titulo: "¿Dónde está y a qué velocidad?",
    genera(){
      // lanzado hacia arriba desde y0; se pregunta en un instante en que aún no ha tocado el suelo
      const v0 = elige([10, 15, 20, 25]), y0 = elige([0, 0, 5, 10, 20]);
      const tSuelo = (v0 + Math.sqrt(v0 * v0 + 2 * G * y0)) / G;
      const t = elige([0.5, 1, 1.5, 2, 2.5, 3, 4].filter(x => x < tSuelo - 0.05));
      if (Math.random() < 0.5){
        const v = r1(v0 - G * t);
        return {textoPlano: true, tolerancia: 0.02,
          enunciado: `Lanzas una bola hacia arriba a <b>${v0} m/s</b>. Eje y hacia arriba.<br><span class="mini">¿Qué velocidad lleva a los ${f(t)} s? (m/s, con su signo: negativa si ya baja)</span>`,
          respuesta: String(v),
          pista: "v = v₀ − g·t. Si sale negativa, no es un error: es que ya está bajando.",
          pasos: [`<b>v = v₀ − g·t</b>.`, `v = ${v0} − 9,8·${f(t)} = ${v0} − ${f(r2(G * t))}`,
            `<b>v = ${f(v)} m/s</b>` + (v < 0 ? ": negativa, así que ya está <b>bajando</b>." : v === 0 ? ": está justo arriba." : ": positiva, todavía <b>sube</b>.")]};
      }
      const y = r2(y0 + v0 * t - G * t * t / 2);
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Desde <b>${y0} m</b> de altura lanzas una bola hacia arriba a <b>${v0} m/s</b>.<br><span class="mini">¿A qué altura sobre el suelo está a los ${f(t)} s? (m, 2 decimales)</span>`,
        respuesta: String(y),
        pista: "y = y₀ + v₀·t − ½·g·t². Ojo: el tiempo va al cuadrado y el término de g resta.",
        pasos: [`<b>y = y₀ + v₀·t − ½·g·t²</b>.`,
          `y = ${y0} + ${v0}·${f(t)} − 4,9·${f(t)}² = ${y0} + ${f(r2(v0 * t))} − ${f(r2(G * t * t / 2))}`,
          `<b>y ≈ ${f(y)} m</b>.`]};
    }},

  clVelocidadAltura: {
    titulo: "Rapidez a cierta altura",
    genera(){
      const v0 = elige([10, 12, 15, 20, 25]);
      const hMax = v0 * v0 / (2 * G);
      const h = elige([2, 3, 4, 5, 8, 10, 15, 20, 25].filter(x => x < hMax - 0.5));
      const v = r1(Math.sqrt(v0 * v0 - 2 * G * h));
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Lanzas una pelota hacia arriba desde el suelo a <b>${v0} m/s</b>.<br><span class="mini">¿Qué rapidez lleva al pasar por <b>${h} m</b> de altura? (m/s, 1 decimal)</span>`,
        respuesta: String(v),
        pista: "Sin tiempo: v² = v₀² − 2·g·Δy. Al bajar pasa por ahí con la misma rapidez.",
        pasos: [`<b>v² = v₀² − 2·g·Δy</b>, con Δy = +${h} m (sube).`,
          `v² = ${v0 * v0} − 2·9,8·${h} = ${v0 * v0} − ${f(r1(2 * G * h))} = ${f(r1(v0 * v0 - 2 * G * h))}`,
          `v = ±${f(v)} m/s: <b>+${f(v)}</b> cuando sube y <b>−${f(v)}</b> cuando vuelve a pasar bajando. Rapidez: <b>${f(v)} m/s</b>.`]};
    }},

  clDesdeEdificio: {
    titulo: "Hacia arriba desde lo alto",
    genera(){
      const v0 = elige([5, 10, 15, 20]), H = elige([10, 15, 20, 25, 30, 40]);
      const raiz = Math.sqrt(v0 * v0 + 2 * G * H);
      const t = r2((v0 + raiz) / G);
      return {textoPlano: true, tolerancia: 0.02,
        enunciado: `Desde una azotea de <b>${H} m</b> lanzas una pelota <b>hacia arriba</b> a <b>${v0} m/s</b>. Cae a la calle.<br><span class="mini">¿Cuánto tarda en llegar al suelo? (s, 2 decimales)</span>`,
        respuesta: String(t),
        pista: "y = 0 en el suelo: 0 = H + v₀·t − 4,9·t². Es de segundo grado: quédate con la solución positiva.",
        pasos: [`Suelo en y = 0: <b>0 = ${H} + ${v0}·t − 4,9·t²</b> → 4,9·t² − ${v0}·t − ${H} = 0.`,
          `t = (${v0} ± √(${v0}² + 4·4,9·${H})) / 9,8 = (${v0} ± ${f(r2(raiz))}) / 9,8`,
          `La solución negativa no vale (sería antes de lanzarla).`,
          `<b>t ≈ ${f(t)} s</b>.`]};
    }},
});
})();
