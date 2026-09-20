/* ejercicios-fyq.js — generadores de Física y Química.
   Se añaden al mismo motor (EJERCICIOS) que los de matemáticas: bloqueEjercicios()
   funciona igual. Necesita elementos.js cargado antes. */

Object.assign(EJERCICIOS, {

  particulasAtomo: {
    titulo: "Protones, neutrones y electrones",
    genera(){
      const e = elige(ELEMENTOS.filter(x => x.z <= 20));
      const A = e.z + al(e.z - 1, e.z + 4);
      const carga = elige([0, 0, 0, 1, -1, 2, -2]);
      const arriba = carga === 0 ? "" : (Math.abs(carga) > 1 ? Math.abs(carga) : "") + (carga > 0 ? "+" : "-");
      const electrones = e.z - carga;
      const que = elige(["protones", "neutrones", "electrones"]);
      const r = que === "protones" ? e.z : que === "neutrones" ? A - e.z : electrones;
      return {
        enunciado: `\\text{En } ^{${A}}_{${e.z}}\\text{${e.s}}${arriba ? `^{${arriba}}` : ""} \\text{ , ¿cuántos ${que} hay?}`,
        respuesta: String(r),
        pista: que === "protones" ? "Los protones son Z, el número de abajo."
             : que === "neutrones" ? "Neutrones = A − Z: el de arriba menos el de abajo."
             : "Electrones = protones − carga. Positivo significa que ha perdido electrones.",
        pasos: [
          `$Z = ${e.z}$ son los protones; $A = ${A}$ son protones más neutrones.`,
          que === "neutrones" ? `Neutrones $= ${A} - ${e.z} = ${A - e.z}$.`
          : que === "electrones" ? (carga === 0
              ? `Sin carga: es neutro, así que tiene los mismos electrones que protones, ${e.z}.`
              : `Carga ${carga > 0 ? "+" : ""}${carga}: electrones $= ${e.z} - (${carga}) = ${electrones}$.`)
          : `Los protones no cambian nunca: si cambiaran, sería otro elemento.`,
          `Respuesta: <b>${r}</b>.`]};
    }},

  configuracion: {
    titulo: "Configuración electrónica",
    genera(){
      const e = elige(ELEMENTOS.filter(x => x.z <= 20));
      return {
        enunciado: `\\text{Configuración electrónica de ${e.n} (Z = ${e.z})}`,
        respuesta: e.conf.replace(/\s/g, ""),
        pista: "Orden de llenado: 1s 2s 2p 3s 3p 4s. Caben 2 en cada s y 6 en cada p.",
        pasos: [`${e.n} tiene ${e.z} electrones que colocar.`,
          `Van por orden hasta gastarlos: <b>${e.conf}</b>.`,
          `En la última capa quedan ${e.val} electrones: son los de valencia, los que deciden cómo se une a otros átomos.`]};
    }},

  isotopos: {
    titulo: "Isótopos y masa atómica",
    genera(){
      const e = elige(ELEMENTOS.filter(x => x.z >= 3 && x.z <= 20));
      const A1 = e.z * 2, A2 = A1 + al(1, 3);
      const p1 = elige([20, 25, 50, 75, 80]), p2 = 100 - p1;
      const masa = +((A1 * p1 + A2 * p2) / 100).toFixed(2);
      return {
        enunciado: `\\text{El ${e.n} tiene dos isótopos: } ^{${A1}}\\text{${e.s}} \\text{ (${p1}\\%) y } ^{${A2}}\\text{${e.s}} \\text{ (${p2}\\%). ¿Masa atómica media?}`,
        respuesta: String(masa).replace(".", ","),
        pista: "Media ponderada: cada masa multiplicada por su porcentaje, y todo entre 100.",
        pasos: [`$\\dfrac{${A1} \\cdot ${p1} + ${A2} \\cdot ${p2}}{100} = \\dfrac{${A1 * p1 + A2 * p2}}{100}$`,
          `$= ${String(masa).replace(".", ",")}$`,
          `Por eso las masas de la tabla periódica no son enteras: son la media de los isótopos que hay en la naturaleza.`]};
    }},

  ubicarTablaPeriodica: {
    titulo: "¿Grupo o periodo?",
    genera(){
      const e = elige(ELEMENTOS.filter(x => x.z <= 20));
      const que = elige(["grupo", "periodo"]);
      return {
        enunciado: `\\text{¿En qué ${que} está el ${e.n} (Z = ${e.z})?}`,
        respuesta: String(que === "grupo" ? e.g : e.p),
        pista: que === "grupo" ? "El grupo se saca de los electrones de la última capa."
                               : "El periodo es el número de capas que tiene ocupadas.",
        pasos: [`Su configuración es ${e.conf}.`,
          que === "grupo"
            ? `Tiene ${e.val} electrones en la última capa. En los grupos 1 y 2 el grupo es ese número; del 13 al 18 se le suman 10 → <b>grupo ${e.g}</b>.`
            : `La capa más alta que ocupa es la ${e.p} → <b>periodo ${e.p}</b>.`,
          `El ${e.n} está en el periodo ${e.p}, grupo ${e.g}.`]};
    }},
});
