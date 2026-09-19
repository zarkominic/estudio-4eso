/* app.js — lo común a todo el sitio: el progreso y las preguntas.

   El progreso vive en el navegador de cada uno (localStorage). Sin cuentas, sin servidor,
   sin datos de nadie en ninguna parte: importa, porque lo van a usar menores.

   El repaso usa cajas tipo Leitner: cada pregunta tiene un nivel (0 a 5). Si la aciertas
   sube de nivel y tarda más en volver; si fallas, vuelve a la caja 1 y reaparece mañana.
   Eso es práctica espaciada, que junto con ponerse a prueba es lo que dice la evidencia
   que funciona de verdad.                                                              */

const DIAS = [0, 1, 2, 4, 8, 16, 32];   // cuándo vuelve una pregunta según su nivel
const hoy = () => new Date().toISOString().slice(0, 10);
const diasEntre = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);

const Progreso = {
  leer(){ try { return JSON.parse(localStorage.getItem("progreso-4eso") || "{}"); } catch(e){ return {}; } },
  guardar(p){ try { localStorage.setItem("progreso-4eso", JSON.stringify(p)); } catch(e){} },

  /* una respuesta: sube o baja de caja y fija cuándo vuelve */
  responder(idPregunta, acertada){
    const p = this.leer(), r = p[idPregunta] || {nivel: 0, vistas: 0, fallos: 0};
    r.vistas++; if (!acertada) r.fallos++;
    r.nivel = acertada ? Math.min(r.nivel + 1, DIAS.length - 1) : 1;
    r.ultima = hoy();
    p[idPregunta] = r; this.guardar(p); return r;
  },

  /* ¿toca esta pregunta hoy? */
  toca(idPregunta){
    const r = this.leer()[idPregunta];
    if (!r || !r.ultima) return true;                       // nunca vista: toca
    return diasEntre(r.ultima, hoy()) >= DIAS[r.nivel];
  },

  /* un tema se da por visto cuando se ha leído la teoría */
  marcarLeido(idTema){ const p = this.leer(); p["tema:" + idTema] = {leido: hoy()}; this.guardar(p); },
  leido(idTema){ return !!this.leer()["tema:" + idTema]; },

  /* cuántas preguntas de un tema se dominan (nivel 3 o más) */
  dominio(preguntas){
    const p = this.leer();
    const n = preguntas.filter(q => (p[q.id] || {}).nivel >= 3).length;
    return preguntas.length ? Math.round(n * 100 / preguntas.length) : 0;
  },
  borrarTodo(){ try { localStorage.removeItem("progreso-4eso"); } catch(e){} },
};

/* Elige las preguntas del repaso de hoy: las que tocan, MEZCLADAS entre temas.
   Mezclar tipos de problema (intercalar) rinde bastante más que hacer veinte seguidas
   del mismo tipo, aunque cueste más y se sienta peor mientras se hace. */
function repasoDeHoy(banco, cuantas = 10){
  const p = Progreso.leer();
  const pendientes = banco.filter(q => Progreso.toca(q.id));
  const peso = q => { const r = p[q.id] || {nivel: 0, fallos: 0}; return (r.fallos || 0) * 3 + (5 - (r.nivel || 0)); };
  pendientes.sort((a, b) => peso(b) - peso(a) || Math.random() - .5);
  const elegidas = pendientes.slice(0, cuantas * 2);
  // barajar para que no salgan agrupadas por tema
  for (let i = elegidas.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [elegidas[i], elegidas[j]] = [elegidas[j], elegidas[i]]; }
  // y que no caigan dos del mismo tema seguidas, si se puede
  const salida = [];
  while (salida.length < Math.min(cuantas, elegidas.length)){
    const i = elegidas.findIndex(q => !salida.length || q.tema !== salida[salida.length - 1].tema);
    salida.push(...elegidas.splice(i >= 0 ? i : 0, 1));
  }
  return salida;
}

/* Pinta una pregunta. Nunca dice solo «mal»: siempre explica por qué falla la elegida.
   Sin esa explicación, el test enseña a repetir el error. */
function pintarPregunta(q, donde, alResponder){
  const caja = document.createElement("div"); caja.className = "pregunta";
  caja.innerHTML = `<div class="etiqueta">${q.etiqueta || ""}</div><div class="enunciado">${q.enunciado}</div>
    <div class="opciones" role="group" aria-label="Opciones"></div><div class="porque" hidden></div>`;
  const opciones = caja.querySelector(".opciones"), porque = caja.querySelector(".porque");
  const orden = q.opciones.map((o, i) => i).sort(() => Math.random() - .5);
  orden.forEach(i => {
    const o = q.opciones[i];
    const b = document.createElement("button"); b.type = "button"; b.className = "opcion"; b.textContent = o.texto;
    b.onclick = () => {
      if (caja.dataset.respondida) return;
      caja.dataset.respondida = "1";
      const acierta = !!o.bien;
      opciones.querySelectorAll(".opcion").forEach((x, k) => { x.disabled = true; });
      b.classList.add(acierta ? "bien" : "mal");
      if (!acierta){ [...opciones.children][orden.indexOf(q.opciones.findIndex(z => z.bien))]?.classList.add("bien"); }
      porque.hidden = false;
      porque.innerHTML = acierta
        ? `<b>Bien.</b> ${q.porque || ""}`
        : `<b>No.</b> ${o.porque || "Esa no es."} <br><b>La buena:</b> ${q.porque || ""}`;
      Progreso.responder(q.id, acierta);
      if (alResponder) alResponder(acierta);
    };
    opciones.appendChild(b);
  });
  donde.appendChild(caja);
  if (window.renderMathInElement) renderMathInElement(caja, {delimiters:[{left:"$",right:"$",display:false},{left:"$$",right:"$$",display:true}]});
  return caja;
}

/* Ejemplo resuelto que se va vaciando: el primero entero, el último en blanco.
   Rellenar huecos obliga a hacer el paso, no a leerlo. */
function activarHuecos(raiz = document){
  raiz.querySelectorAll(".hueco[data-bien]").forEach(h => {
    const input = document.createElement("input"); input.className = "hueco"; input.size = Math.max(4, h.dataset.bien.length + 1);
    input.setAttribute("aria-label", "Completa el paso"); input.inputMode = "text";
    input.onblur = () => {
      const v = input.value.trim().replace(",", ".").replace(/\s+/g, "");
      if (!v) return;
      const bien = h.dataset.bien.replace(",", ".").replace(/\s+/g, "");
      input.classList.toggle("bien", v === bien); input.classList.toggle("mal", v !== bien);
      if (v !== bien && h.dataset.pista) input.title = h.dataset.pista;
    };
    h.replaceWith(input);
  });
}

/* Índice lateral automático: se arma leyendo los h2 del tema, y marca dónde vas.
   Así un tema nuevo no tiene que mantener su propio menú. */
function indiceAutomatico(){
  const indice = document.querySelector(".indice"); if (!indice) return;
  const hs = [...document.querySelectorAll(".cuerpo h2")];
  hs.forEach((h, i) => { if (!h.id) h.id = "s" + i; });
  indice.innerHTML = `<div class="titulin">En este tema</div><ol>` +
    hs.map(h => `<li><a href="#${h.id}">${h.textContent.replace(/\$[^$]*\$/g, "…")}</a></li>`).join("") + `</ol>`;
  const enlaces = [...indice.querySelectorAll("a")];
  const obs = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting){
      enlaces.forEach(a => a.classList.toggle("aqui", a.getAttribute("href") === "#" + e.target.id)); } });
  }, {rootMargin: "-20% 0px -70% 0px"});
  hs.forEach(h => obs.observe(h));
}

/* Un bloque de preguntas del propio tema, para practicar justo después de leer.
   Esto NO sustituye al repaso: recordar ahora consolida, recordar dentro de unos días
   es lo que hace que dure. Por eso están las dos cosas. */
function compruebate(idTema, donde, cuantas = 6){
  const mias = BANCO.filter(q => q.tema === idTema);
  const elegidas = mias.slice().sort(() => Math.random() - .5).slice(0, cuantas);
  elegidas.forEach(q => pintarPregunta(q, donde));
  return elegidas.length;
}
