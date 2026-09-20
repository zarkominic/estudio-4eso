/* ejercicios-fyq2.js — generadores del enlace químico. */

Object.assign(EJERCICIOS, {

  tipoEnlace: {
    titulo: "¿Qué tipo de enlace?",
    genera(){
      const metales = ELEMENTOS.filter(e => e.tipo === "metal" || e.tipo === "transicion");
      const noMetales = ELEMENTOS.filter(e => e.tipo === "no metal");
      const caso = elige(["ionico", "covalente", "metalico"]);
      let a, b, r, porque;
      if (caso === "ionico"){
        a = elige(metales); b = elige(noMetales); r = "ionico";
        porque = `Un metal (${a.n}, que suelta electrones) con un no metal (${b.n}, que los coge): el electrón se <b>transfiere</b> y quedan iones de signo contrario que se atraen.`;
      } else if (caso === "covalente"){
        a = elige(noMetales); b = elige(noMetales.filter(x => x.z !== a.z)); r = "covalente";
        porque = `Dos no metales (${a.n} y ${b.n}): los dos quieren coger electrones, así que ninguno cede. Los <b>comparten</b>.`;
      } else {
        a = elige(metales); b = elige(metales.filter(x => x.z !== a.z)); r = "metalico";
        porque = `Dos metales (${a.n} y ${b.n}): los electrones quedan sueltos formando una nube que mantiene unidos a los núcleos.`;
      }
      return {textoPlano: true,
        enunciado: `<b>${a.s} + ${b.s}</b><br><span class="mini">${a.n} y ${b.n}. ¿Qué enlace forman? (iónico, covalente o metálico)</span>`,
        respuesta: r,
        pista: "Mira si cada uno es metal o no metal: metal + no metal, no metal + no metal, o metal + metal.",
        pasos: [`${a.n} es <b>${a.tipo === "transicion" ? "metal" : a.tipo}</b> y ${b.n} es <b>${b.tipo === "transicion" ? "metal" : b.tipo}</b>.`,
          porque, `Enlace <b>${r === "ionico" ? "iónico" : r === "covalente" ? "covalente" : "metálico"}</b>.`]};
    }},

  ionQueForma: {
    titulo: "¿Qué ion forma?",
    genera(){
      const e = elige(ELEMENTOS.filter(x => x.z <= 20 && x.val !== 4 && x.tipo !== "noble"));
      const pierde = e.val <= 3;
      const n = pierde ? e.val : 8 - e.val;
      const r = pierde ? `${e.s}${n > 1 ? n : ""}+` : `${e.s}${n > 1 ? n : ""}-`;
      return {textoPlano: true,
        enunciado: `<b>${e.n} (Z = ${e.z})</b><br><span class="mini">¿Qué ion forma? Escríbelo así: Na+ o O2-</span>`,
        respuesta: r,
        pista: `Tiene ${e.val} electrones en la última capa. ¿Le sale más barato soltarlos o completar hasta 8?`,
        pasos: [`Su configuración es ${e.conf}: <b>${e.val} electrones de valencia</b>.`,
          pierde ? `Le sobran ${e.val}: los <b>suelta</b> y se queda con la capa de debajo completa.`
                 : `Le faltan ${n} para llegar a 8: los <b>coge</b>.`,
          `Queda <b>${r}</b>. ${pierde ? "Los metales forman iones positivos (cationes)." : "Los no metales forman iones negativos (aniones)."}`]};
    }},

  formulaIonica: {
    titulo: "Fórmula del compuesto",
    genera(){
      const pares = [
        {m:"Na", cm:1, n:"Cl", cn:1, f:"NaCl", nombre:"cloruro de sodio"},
        {m:"Mg", cm:2, n:"Cl", cn:1, f:"MgCl2", nombre:"cloruro de magnesio"},
        {m:"Ca", cm:2, n:"O", cn:2, f:"CaO", nombre:"óxido de calcio"},
        {m:"Na", cm:1, n:"O", cn:2, f:"Na2O", nombre:"óxido de sodio"},
        {m:"Al", cm:3, n:"Cl", cn:1, f:"AlCl3", nombre:"cloruro de aluminio"},
        {m:"Al", cm:3, n:"O", cn:2, f:"Al2O3", nombre:"óxido de aluminio"},
        {m:"K", cm:1, n:"S", cn:2, f:"K2S", nombre:"sulfuro de potasio"},
        {m:"Mg", cm:2, n:"O", cn:2, f:"MgO", nombre:"óxido de magnesio"},
      ];
      const p = elige(pares);
      return {textoPlano: true,
        enunciado: `<b>${p.m} y ${p.n}</b><br><span class="mini">Escribe la fórmula del compuesto (ej: NaCl, MgCl2)</span>`,
        respuesta: p.f,
        pista: "Las cargas tienen que cancelarse: el compuesto final es neutro. Se cruzan los números.",
        pasos: [`${p.m} forma ${p.m}${p.cm > 1 ? p.cm : ""}+ y ${p.n} forma ${p.n}${p.cn > 1 ? p.cn : ""}−.`,
          `Hacen falta las cantidades justas para que las cargas sumen cero.`,
          `La fórmula es <b>${p.f}</b>, el ${p.nombre}.`,
          `Truco: se cruzan las cargas y se simplifica si se puede.`]};
    }},

  propiedadesSegunEnlace: {
    titulo: "¿Qué enlace tiene esta sustancia?",
    genera(){
      const casos = [
        {p:"Sólido duro, punto de fusión muy alto, conduce disuelto en agua pero no sólido", r:"ionico",
         porque:"Los iones están fijos en el sólido, pero al disolverse quedan libres y conducen. Eso es la sal."},
        {p:"Conduce la electricidad en estado sólido y es maleable", r:"metalico",
         porque:"La nube de electrones libres conduce, y los átomos pueden deslizarse sin romperse: por eso se puede laminar."},
        {p:"Gas a temperatura ambiente, no conduce la electricidad", r:"covalente",
         porque:"Moléculas separadas y sin cargas libres: ni conduce ni necesita mucha energía para separarse."},
        {p:"Se disuelve bien en agua y forma cristales", r:"ionico",
         porque:"El agua separa los iones y los rodea. Al evaporarse, vuelven a ordenarse en cristales."},
        {p:"Brilla, se puede estirar en hilos y conduce el calor", r:"metalico",
         porque:"Brillo, ductilidad y conductividad: las tres son consecuencia de la nube de electrones."},
        {p:"Punto de ebullición bajo y no se disuelve en agua", r:"covalente",
         porque:"Las fuerzas entre moléculas son débiles, y sin cargas no se lleva bien con el agua."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<b>${c.p}</b><br><span class="mini">¿Qué enlace tiene? (iónico, covalente o metálico)</span>`,
        respuesta: c.r,
        pista: "Pregúntate si hay cargas libres para conducir, y si está hecho de moléculas sueltas o de una red.",
        pasos: [c.porque, `Enlace <b>${c.r === "ionico" ? "iónico" : c.r === "covalente" ? "covalente" : "metálico"}</b>.`]};
    }},
});
