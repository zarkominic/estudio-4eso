/* libro-quiz.js — test de lectura obligatoria.
   La página define window.LIBRO = { id, titulo, autor, preguntas:[{id,cat,q,o:[4],a,w}] }.
   Respondes → si aciertas, «OK»; si fallas, te dice cuál era la correcta y por qué.
   Se guarda en el navegador (localStorage) qué has acertado y fallado; nada sale del móvil. */
(function () {
  const L = window.LIBRO, P = L.preguntas, KEY = "libro:" + L.id;
  const $ = (s, r = document) => r.querySelector(s);
  const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mezcla = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const porId = Object.fromEntries(P.map(p => [p.id, p]));
  const cats = [...new Set(P.map(p => p.cat))];

  let datos = { h: {}, sesion: null };           // h[id] = {ok, mal, ult}
  try { const g = JSON.parse(localStorage.getItem(KEY)); if (g && g.h) datos = g; } catch (e) {}
  const guardar = () => { try { localStorage.setItem(KEY, JSON.stringify(datos)); } catch (e) {} };

  const raiz = $("#quiz");
  let S = null, respondida = false;

  /* ───────── pantalla de inicio ───────── */
  function inicio() {
    S = null;
    const hechas = Object.keys(datos.h).filter(id => porId[id]);
    const vistas = hechas.length, ult_ok = hechas.filter(id => datos.h[id].ult === 1).length;
    const falladas = hechas.filter(id => datos.h[id].ult === 0);
    const sinver = P.filter(p => !datos.h[p.id]);
    raiz.innerHTML = "";
    const cab = el("div", "caja idea",
      `<h3>${P.length} preguntas</h3><p>Elige una opción. Si aciertas ves <b style="color:var(--repasar)">OK</b>; si fallas te mostramos la respuesta correcta y por qué.
       Llevas <b>${vistas}</b> de ${P.length} contestadas${vistas ? ` y <b>${ult_ok}</b> bien en la última vez` : ""}.</p>`);
    raiz.append(cab);

    const modos = el("div", "modos");
    const mk = (t, d, f, off) => { const b = el("button", "modo", `<b>${t}</b><span>${d}</span>`); b.disabled = !!off; b.onclick = f; modos.append(b); };
    if (datos.sesion && datos.sesion.cola && datos.sesion.i < datos.sesion.cola.length)
      mk("▶ Continuar", `Vas por la pregunta ${datos.sesion.i + 1} de ${datos.sesion.cola.length}`, () => empezar(datos.sesion.cola, datos.sesion.i, datos.sesion.ok, datos.sesion.titulo));
    mk("Test rápido", "20 preguntas al azar", () => empezar(mezcla(P.map(p => p.id)).slice(0, 20), 0, 0, "Test rápido"));
    mk("Test de 50", "50 al azar, para media hora", () => empezar(mezcla(P.map(p => p.id)).slice(0, 50), 0, 0, "Test de 50"));
    mk("Todas, al azar", `Las ${P.length} en orden aleatorio`, () => empezar(mezcla(P.map(p => p.id)), 0, 0, "Todas, al azar"));
    mk("Todas, en orden", "Siguiendo el libro", () => empezar(P.map(p => p.id), 0, 0, "Todas, en orden"));
    mk("Las que no he visto", sinver.length ? `${sinver.length} preguntas nuevas` : "No queda ninguna", () => empezar(mezcla(sinver.map(p => p.id)), 0, 0, "Las que no he visto"), !sinver.length);
    mk("Repasar las falladas", falladas.length ? `${falladas.length} que fallaste la última vez` : "Aún no has fallado ninguna", () => empezar(mezcla(falladas), 0, 0, "Falladas"), !falladas.length);
    raiz.append(modos);

    raiz.append(el("h2", "", "Por bloques"));
    const bl = el("div", "modos");
    cats.forEach(c => {
      const ids = P.filter(p => p.cat === c).map(p => p.id);
      const bien = ids.filter(id => datos.h[id] && datos.h[id].ult === 1).length;
      const b = el("button", "modo", `<b>${esc(c)}</b><span>${ids.length} preguntas${bien ? ` · ${bien} bien` : ""}</span>`);
      b.onclick = () => empezar(mezcla(ids), 0, 0, c);
      bl.append(b);
    });
    raiz.append(bl);

    if (vistas) {
      const r = el("button", "btn claro", "Borrar mi progreso");
      r.style.marginTop = "1.6rem";
      r.onclick = () => { if (confirm("¿Borrar todo lo que llevas contestado en este libro?")) { datos = { h: {}, sesion: null }; guardar(); inicio(); } };
      raiz.append(r);
    }
  }

  /* ───────── una sesión de preguntas ───────── */
  function empezar(cola, i, ok, titulo) {
    S = { cola, i, ok: ok || 0, titulo, mal: [] };
    datos.sesion = { cola, i, ok: S.ok, titulo }; guardar();
    pregunta();
  }

  function pregunta() {
    if (S.i >= S.cola.length) return fin();
    respondida = false;
    const p = porId[S.cola[S.i]];
    const orden = mezcla([0, 1, 2, 3]);                 // las opciones salen en orden distinto cada vez
    raiz.innerHTML = "";
    const pct = Math.round(100 * S.i / S.cola.length);
    raiz.append(el("div", "cabecera",
      `<button class="atras" id="salir" aria-label="Salir al menú">← Menú</button>
       <span class="cuenta">${S.i + 1} / ${S.cola.length}</span><span class="aciertos">✓ ${S.ok}</span>`));
    raiz.append(el("div", "barrita", `<i style="width:${pct}%"></i>`));
    raiz.append(el("div", "etiqueta", esc(p.cat)));
    raiz.append(el("h2", "enun", esc(p.q)));
    const lista = el("div", "ops");
    orden.forEach((k, n) => {
      const b = el("button", "op", `<span class="letra">${"ABCD"[n]}</span><span class="txt">${esc(p.o[k])}</span>`);
      b.dataset.k = k;
      b.onclick = () => responder(p, k, b, lista);
      lista.append(b);
    });
    raiz.append(lista);
    raiz.append(el("div", "veredicto", ""));
    $("#salir").onclick = () => { guardar(); inicio(); };
    window.scrollTo({ top: 0 });
  }

  function responder(p, k, btn, lista) {
    if (respondida) return;
    respondida = true;
    const bien = k === p.a;
    const h = datos.h[p.id] || { ok: 0, mal: 0, ult: -1 };
    if (bien) { h.ok++; h.ult = 1; S.ok++; } else { h.mal++; h.ult = 0; S.mal.push(p.id); }
    datos.h[p.id] = h;
    S.i++;
    datos.sesion = { cola: S.cola, i: S.i, ok: S.ok, titulo: S.titulo }; guardar();
    [...lista.children].forEach(b => {
      b.disabled = true;
      if (+b.dataset.k === p.a) b.classList.add("correcta");
      else if (b === btn) b.classList.add("incorrecta");
    });
    const v = $(".veredicto");
    v.innerHTML = bien
      ? `<div class="ok" role="status"><b>✔ OK</b><p>${esc(p.w)}</p></div>`
      : `<div class="nook" role="status"><b>✘ No era esa</b><p class="resp">Respuesta correcta: <b>${esc(p.o[p.a])}</b></p><p>${esc(p.w)}</p></div>`;
    const sig = el("button", "btn repasar", S.i >= S.cola.length ? "Ver resultado →" : "Siguiente →");
    sig.id = "sig"; sig.onclick = pregunta; v.append(sig);
    sig.focus({ preventScroll: true });
    v.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  /* ───────── final ───────── */
  function fin() {
    datos.sesion = null; guardar();
    const n = S.cola.length, pc = Math.round(100 * S.ok / n);
    raiz.innerHTML = "";
    raiz.append(el("div", "etiqueta", esc(S.titulo)));
    raiz.append(el("h2", "", `${S.ok} de ${n} (${pc} %)`));
    raiz.append(el("p", "", pc >= 90 ? "Muy bien: este libro lo tienes." : pc >= 70 ? "Buen nivel. Repasa lo que fallaste y estás." : pc >= 50 ? "Vas a mitad de camino: repasa las falladas ahora, que es cuando más se aprende." : "Todavía no, y es normal si acabas de empezar. Repasa las falladas y repite."));
    const porCat = {};
    S.cola.forEach(id => { const c = porId[id].cat; (porCat[c] = porCat[c] || { n: 0, f: 0 }).n++; });
    S.mal.forEach(id => porCat[porId[id].cat].f++);
    const t = el("div", "caja");
    Object.entries(porCat).forEach(([c, v]) => t.append(el("div", "fila", `<span>${esc(c)}</span><span class="barra2"><i style="width:${Math.round(100 * (v.n - v.f) / v.n)}%"></i></span><b>${v.n - v.f}/${v.n}</b>`)));
    raiz.append(t);
    const acc = el("div", "modos");
    if (S.mal.length) { const b = el("button", "modo", `<b>Repasar las ${S.mal.length} falladas</b><span>Ahora, mientras las tienes frescas</span>`); b.onclick = () => empezar(mezcla(S.mal), 0, 0, "Falladas"); acc.append(b); }
    const m = el("button", "modo", "<b>Volver al menú</b><span>Otros modos y bloques</span>"); m.onclick = inicio; acc.append(m);
    raiz.append(acc);
    window.scrollTo({ top: 0 });
  }

  /* teclado: 1-4 / A-D eligen, Enter o espacio siguen */
  document.addEventListener("keydown", e => {
    if (!S || e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.toLowerCase();
    if (!respondida) {
      const n = "1234".indexOf(k) >= 0 ? "1234".indexOf(k) : "abcd".indexOf(k);
      if (n >= 0) { const b = $(".ops").children[n]; if (b) b.click(); }
    } else if (k === "enter" || k === " ") { const s = $("#sig"); if (s && document.activeElement !== s) { e.preventDefault(); s.click(); } }
  });

  inicio();
})();
