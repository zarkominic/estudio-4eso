/* ejercicios-tec.js — generadores de Tecnología y Digitalización.
   Programación: en vez de preguntar teoría, se genera código y se pregunta qué imprime.
   Eso es lo que de verdad enseña a programar: trazar el código a mano. */

Object.assign(EJERCICIOS, {

  queImprime: {
    titulo: "¿Qué imprime este código?",
    genera(){
      const casos = [
        () => { const a = al(2, 9), b = al(2, 9);
          return {code: `a = ${a}\nb = ${b}\nprint(a * b)`, r: String(a * b),
            pasos: [`Se guarda ${a} en <b>a</b> y ${b} en <b>b</b>.`, `<code>a * b</code> es ${a} × ${b} = <b>${a * b}</b>.`]}; },
        () => { const a = al(3, 9);
          return {code: `x = ${a}\nx = x + 2\nx = x * 2\nprint(x)`, r: String((a + 2) * 2),
            pasos: [`<code>x</code> empieza valiendo ${a}.`, `Después de <code>x = x + 2</code> vale ${a + 2}.`,
              `Después de <code>x = x * 2</code> vale ${(a + 2) * 2}.`,
              `El orden importa: si las líneas se cambian, el resultado es otro.`]}; },
        () => { const n = al(3, 6);
          return {code: `total = 0\nfor i in range(${n}):\n    total = total + i\nprint(total)`, r: String(n * (n - 1) / 2),
            pasos: [`<code>range(${n})</code> da los números 0, 1, … ${n - 1}. <b>No incluye el ${n}.</b>`,
              `Se van sumando: ${Array.from({length: n}, (_, i) => i).join(" + ")} = <b>${n * (n - 1) / 2}</b>.`,
              `El fallo más común aquí es contar el ${n}: range se queda uno antes.`]}; },
        () => { const n = al(2, 5);
          return {code: `for i in range(1, ${n + 1}):\n    print(i * i)`, r: String(n * n),
            pregunta: "¿Cuál es el ÚLTIMO número que imprime?",
            pasos: [`<code>range(1, ${n + 1})</code> va del 1 al ${n}.`,
              `Imprime los cuadrados: ${Array.from({length: n}, (_, i) => (i + 1) * (i + 1)).join(", ")}.`,
              `El último es <b>${n * n}</b>.`]}; },
        () => { const a = al(1, 20), lim = 10;
          return {code: `nota = ${a}\nif nota > ${lim}:\n    print("alto")\nelse:\n    print("bajo")`, r: a > lim ? "alto" : "bajo",
            pasos: [`<code>nota</code> vale ${a}.`, `¿Es ${a} mayor que ${lim}? <b>${a > lim ? "Sí" : "No"}</b>.`,
              `Imprime <b>${a > lim ? "alto" : "bajo"}</b>.`]}; },
        () => { const p = elige(["hola", "python", "clase"]);
          return {code: `palabra = "${p}"\nprint(len(palabra))`, r: String(p.length),
            pasos: [`<code>len()</code> cuenta las letras de la palabra.`, `«${p}» tiene <b>${p.length}</b> letras.`]}; },
      ];
      const c = elige(casos)();
      return {textoPlano: true,
        enunciado: `<pre style="background:#17171a;color:#e8e8e8;padding:.9rem 1rem;border-radius:10px;text-align:left;overflow-x:auto;font-size:.95rem;line-height:1.5">${c.code}</pre><span class="mini">${c.pregunta || "¿Qué imprime?"}</span>`,
        respuesta: c.r, pista: "Ve línea por línea, anotando en un papel cuánto vale cada variable.",
        pasos: c.pasos};
    }},

  encontrarError: {
    titulo: "¿Por qué no funciona?",
    genera(){
      // se pregunta por el NÚMERO DE LÍNEA: es objetivo y se puede corregir solo
      const casos = [
        {code:`edad = 15\nif edad > 18\n    print("mayor")`, linea:2, r:"2",
         porque:"Falta los <b>dos puntos</b> al final del <code>if</code>. En Python toda condición acaba en «:»."},
        {code:`for i in range(5):\nprint(i)`, linea:2, r:"2",
         porque:"Falta la <b>sangría</b>. Lo que va dentro del bucle tiene que ir indentado; Python usa los espacios para saber qué está dentro."},
        {code:`nombre = Ana\nprint(nombre)`, linea:1, r:"1",
         porque:"Falta poner el texto entre <b>comillas</b>. Sin ellas, Python busca una variable llamada Ana y no la encuentra."},
        {code:`numero = "5"\nprint(numero + 3)`, linea:2, r:"2",
         porque:"«5» entre comillas es <b>texto</b>, no número: no se puede sumar 3. Habría que hacer <code>int(numero) + 3</code>."},
        {code:`x = 10\nprint(y)`, linea:2, r:"2",
         porque:"Se usa <code>y</code>, que nunca se creó. Python responde con <code>NameError</code>."},
        {code:`precio = 10\nif precio = 10:\n    print("justo")`, linea:2, r:"2",
         porque:"Para comparar se usan <b>dos iguales</b> (<code>==</code>). Uno solo es para asignar."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<pre style="background:#17171a;color:#e8e8e8;padding:.9rem 1rem;border-radius:10px;text-align:left;overflow-x:auto;font-size:.95rem;line-height:1.5">${c.code}</pre><span class="mini">¿En qué línea está el error? (escribe el número)</span>`,
        respuesta: c.r, pista: "Lee el código como lo leería el ordenador: línea a línea, sin suponer nada.",
        pasos: [`El error está en la <b>línea ${c.linea}</b>.`, c.porque,
          `Consejo: cuando algo falle, lee el mensaje de error. Casi siempre dice la línea exacta.`]};
    }},

  trazaBucle: {
    titulo: "Cuenta las vueltas",
    genera(){
      const tipo = elige(["range1", "range2", "while"]);
      if (tipo === "range1"){ const n = al(3, 9);
        return {textoPlano: true,
          enunciado: `<pre style="background:#17171a;color:#e8e8e8;padding:.9rem 1rem;border-radius:10px;text-align:left;font-size:.95rem;line-height:1.5">for i in range(${n}):\n    print("hola")</pre><span class="mini">¿Cuántas veces imprime «hola»?</span>`,
          respuesta: String(n), pista: "range(n) empieza en 0 y llega hasta n−1.",
          pasos: [`<code>range(${n})</code> genera ${n} valores: de 0 a ${n - 1}.`,
            `Son <b>${n}</b> vueltas. Aunque el último valor sea ${n - 1}, la cuenta es ${n}.`]};
      }
      if (tipo === "range2"){ const a = al(1, 4), b = a + al(3, 7);
        return {textoPlano: true,
          enunciado: `<pre style="background:#17171a;color:#e8e8e8;padding:.9rem 1rem;border-radius:10px;text-align:left;font-size:.95rem;line-height:1.5">for i in range(${a}, ${b}):\n    print(i)</pre><span class="mini">¿Cuántos números imprime?</span>`,
          respuesta: String(b - a), pista: "Incluye el primero pero NO el último.",
          pasos: [`Va del ${a} al ${b - 1}: el ${b} <b>no entra</b>.`,
            `Son ${b} − ${a} = <b>${b - a}</b> números.`,
            `Esta es la trampa clásica: el segundo número de range nunca se alcanza.`]};
      }
      const n = al(3, 8);
      return {textoPlano: true,
        enunciado: `<pre style="background:#17171a;color:#e8e8e8;padding:.9rem 1rem;border-radius:10px;text-align:left;font-size:.95rem;line-height:1.5">i = 0\nwhile i < ${n}:\n    print(i)\n    i = i + 1</pre><span class="mini">¿Cuántas veces imprime?</span>`,
        respuesta: String(n), pista: "Empieza en 0 y para cuando deja de cumplirse la condición.",
        pasos: [`Imprime con i = 0, 1, … ${n - 1}.`, `Cuando i llega a ${n}, la condición <code>i &lt; ${n}</code> es falsa y para.`,
          `Son <b>${n}</b> veces. Y ojo: si se olvida <code>i = i + 1</code>, el bucle no acaba nunca.`]};
    }},

  leyOhm: {
    titulo: "Ley de Ohm",
    genera(){
      const R = elige([10, 20, 50, 100, 220, 330]), I = elige([0.1, 0.2, 0.5, 1, 2]);
      const V = +(R * I).toFixed(1);
      const que = elige(["V", "I", "R"]);
      if (que === "V") return {textoPlano: true,
        enunciado: `<b>R = ${R} Ω, I = ${String(I).replace(".", ",")} A. ¿Cuánto vale V?</b><br><span class="mini">Responde en voltios</span>`,
        respuesta: String(V).replace(".", ","), pista: "V = I · R",
        pasos: [`$V = I \\cdot R = ${String(I).replace(".", ",")} \\cdot ${R}$`, `$V = ${String(V).replace(".", ",")}$ V.`]};
      if (que === "I") return {textoPlano: true,
        enunciado: `<b>V = ${String(V).replace(".", ",")} V, R = ${R} Ω. ¿Cuánto vale I?</b><br><span class="mini">Responde en amperios</span>`,
        respuesta: String(I).replace(".", ","), pista: "Despeja: I = V / R",
        pasos: [`$I = \\dfrac{V}{R} = \\dfrac{${String(V).replace(".", ",")}}{${R}}$`, `$I = ${String(I).replace(".", ",")}$ A.`]};
      return {textoPlano: true,
        enunciado: `<b>V = ${String(V).replace(".", ",")} V, I = ${String(I).replace(".", ",")} A. ¿Cuánto vale R?</b><br><span class="mini">Responde en ohmios</span>`,
        respuesta: String(R), pista: "Despeja: R = V / I",
        pasos: [`$R = \\dfrac{V}{I} = \\dfrac{${String(V).replace(".", ",")}}{${String(I).replace(".", ",")}}$`, `$R = ${R}$ Ω.`]};
    }},
});
