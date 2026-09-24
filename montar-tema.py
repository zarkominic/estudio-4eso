#!/usr/bin/env python3
"""
montar-tema.py — arma temas/<id>/index.html a partir de su contenido.

POR QUÉ EXISTE
  Cada tema repite ~60 líneas idénticas: cabecera, pretest, taller, «Compruébate»,
  tutor, botón de leído y scripts. Copiarlas a mano hace que diverjan con el
  tiempo. Aquí están una sola vez; el tema solo aporta lo suyo.

USO
  python3 montar-tema.py temas-fuente/<id>.html

El fichero fuente empieza con una cabecera y luego el cuerpo (las secciones <h2>
de teoría, sin el taller ni «Compruébate», que se añaden solos):

  ---
  id: mat-b-ecuaciones
  titulo: Ecuaciones de segundo grado y otras
  asignatura: Matemáticas
  intro: La fórmula, el discriminante, …
  pretest: ecu-02, ecu-08
  generadores: discriminante, segundoGrado, …
  preguntas: preguntas-ecu.js
  ejercicios: ejercicios-ecu.js
  n: 12
  nota_taller: Escribe las soluciones separadas por «y»…
  ---
  <h2>…</h2> …
  <!--SCRIPT--> js propio del tema (opcional)
  <!--ESTILO--> css propio (opcional)
"""
import re, sys, pathlib

AQUI = pathlib.Path(__file__).parent


def lee(f):
    t = pathlib.Path(f).read_text(encoding="utf-8")
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", t, re.S)
    meta = {}
    for l in m.group(1).splitlines():
        if ":" in l:
            k, v = l.split(":", 1); meta[k.strip()] = v.strip()
    cuerpo = m.group(2)
    script = estilo = ""
    if "<!--ESTILO-->" in cuerpo:
        cuerpo, estilo = cuerpo.split("<!--ESTILO-->", 1)
    if "<!--SCRIPT-->" in cuerpo:
        cuerpo, script = cuerpo.split("<!--SCRIPT-->", 1)
    if "<!--SCRIPT-->" in estilo:
        estilo, script = estilo.split("<!--SCRIPT-->", 1)
    return meta, cuerpo.strip(), script.strip(), estilo.strip()


def monta(f):
    meta, cuerpo, script, estilo = lee(f)
    i = meta["id"]
    pre = ", ".join(f'"{x.strip()}"' for x in meta["pretest"].split(","))
    gens = ", ".join(f'"{x.strip()}"' for x in meta["generadores"].split(","))
    extra_js = "".join(f'<script src="../../comun/{x.strip()}?v=1"></script>\n'
                       for x in meta.get("extra", "").split(",") if x.strip())
    nota = meta.get("nota_taller", "Si te atascas, abre la solución paso a paso.")
    h = f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8"><meta name="robots" content="noindex, nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{meta["titulo"]} — Estudio 4º ESO</title>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../comun/base.css?v=1">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
{f"<style>{estilo}</style>" if estilo else ""}
</head>
<body>
<div class="barra">
  <a class="marca" href="../../index.html">📘 Estudio 4º ESO</a>
  <nav class="menu"><a href="../../index.html#curso">Todas las asignaturas</a></nav>
  <span class="sep"></span>
  <a href="../../repaso.html" class="repaso-link">Repaso</a>
</div>

<div class="tema">
  <nav class="indice" aria-label="Índice del tema"></nav>

  <div class="cuerpo">
    <span class="etiqueta">{meta["asignatura"]} · 4º ESO</span>
    <h1>{meta["titulo"]}</h1>
    <p class="mini">{meta["intro"]} Teoría, <b>ejercicios infinitos</b> y {meta["n"]} preguntas.</p>

    <div class="caja ojo">
      <h3>Antes de leer nada, dos apuestas</h3>
      <p>No hace falta saberlo. Arriesga: equivocarte ahora hace que luego se te quede mejor.</p>
      <div class="compruebate" id="pretest"></div>
    </div>

{cuerpo}

    <h2>Taller: ejercicios sin fin</h2>
    <p>Cada bloque genera un ejercicio nuevo cada vez que pulsas «otro», con su solución paso a paso si te atascas.</p>
    <p class="mini">{nota}</p>
    <div class="taller" id="taller"></div>
    <div class="caja idea" style="margin-top:1rem">
      <p style="margin:0"><b>Cómo usar esto:</b> haz cinco seguidos de cada bloque sin mirar la solución. Si encadenas cinco, ese tipo lo tienes. Si fallas dos veces lo mismo, vuelve a la teoría de arriba antes de seguir.</p>
    </div>

    <h2>Compruébate</h2>
    <p>Seis preguntas de este tema, ahora mismo. Recordar recién leído consolida; recordar dentro de unos días es lo que hace que dure, y de eso se encarga el repaso.</p>
    <div class="compruebate" id="ahora"></div>

    <div id="tutor"></div>

    <div class="caja idea" style="margin-top:2.5rem">
      <h3>¿Y ahora?</h3>
      <p>Las {meta["n"]} preguntas de este tema entran en el repaso diario, mezcladas con las de los demás temas.</p>
      <p style="margin-top:1rem">
        <button class="btn aprender" id="leido" type="button">Marcar como leído</button>
        <a class="btn repasar" href="../../repaso.html">Ir al repaso</a></p>
    </div>
  </div>
</div>

<footer class="envoltura">Si algo no se entiende, no es culpa tuya: dilo y lo reescribimos.</footer>

<script src="../../comun/preguntas.js?v=1"></script>
<script src="../../comun/{meta["preguntas"]}?v=1"></script>
<script src="../../comun/app.js?v=1"></script>
<script src="../../comun/ejercicios.js?v=1"></script>
<script src="../../comun/{meta["ejercicios"]}?v=1"></script>
{extra_js}<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<script>
const $ = id => document.getElementById(id);

[{pre}].forEach(id => {{ const q = BANCO.find(x => x.id === id); if (q) pintarPregunta(q, $("pretest")); }});
compruebate("{i}", $("ahora"), 6);
[{gens}].forEach(tipo => bloqueEjercicios(tipo, $("taller")));

{script}

tutorDeApoyo("{meta["titulo"]}", "{meta["asignatura"]}", $("tutor"));
activarHuecos();
renderMathInElement(document.body, {{delimiters:[{{left:"$$",right:"$$",display:true}},{{left:"$",right:"$",display:false}}]}});
indiceAutomatico();
barraTutor();

$("leido").onclick = e => {{ Progreso.marcarLeido("{i}"); e.target.textContent = "✓ Leído"; e.target.disabled = true; }};
if (Progreso.leido("{i}")){{ $("leido").textContent = "✓ Leído"; $("leido").disabled = true; }}
</script>
</body>
</html>
'''
    d = AQUI / "temas" / i
    d.mkdir(parents=True, exist_ok=True)
    (d / "index.html").write_text(h, encoding="utf-8")
    n_h2 = len(re.findall(r"<h2", h))
    print(f"  {i}: {n_h2} secciones <h2> · pretest {pre} · {len(meta['generadores'].split(','))} talleres")


if __name__ == "__main__":
    for f in sys.argv[1:]:
        monta(f)
