#!/usr/bin/env python3
"""montar-libro.py — arma temas/<id>/index.html de un test de lectura a partir de libros-fuente/<id>.json.
Uso: python3 montar-libro.py len-lectura-metamorfosis   (sin argumentos: los arma todos)
Valida: 4 opciones distintas, 'a' entre 0 y 3, ids y enunciados únicos."""
import json, sys, pathlib, html
RAIZ = pathlib.Path(__file__).parent
LIBROS = {
  "len-lectura-metamorfosis": dict(titulo="La metamorfosis", autor="Franz Kafka", anio="1915",
      resumen="Gregor Samsa amanece convertido en un insecto monstruoso. Test de lectura para el examen."),
  "len-lectura-quiroga": dict(titulo="Cuentos de amor de locura y de muerte", autor="Horacio Quiroga", anio="1917",
      resumen="El almohadón de plumas, A la deriva, La gallina degollada y el resto del libro. Test de lectura."),
}
def validar(id, pregs):
    ids, enun = set(), set()
    for p in pregs:
        assert set(p) >= {"id","cat","q","o","a","w"}, p.get("id")
        assert len(p["o"]) == 4 and len({o.strip().lower() for o in p["o"]}) == 4, p["id"]
        assert p["a"] in (0,1,2,3), p["id"]
        assert p["id"] not in ids and p["q"].strip().lower() not in enun, p["id"]
        ids.add(p["id"]); enun.add(p["q"].strip().lower())
def montar(id):
    m = LIBROS[id]
    pregs = json.loads((RAIZ/"libros-fuente"/f"{id}.json").read_text(encoding="utf-8"))
    validar(id, pregs)
    datos = json.dumps(dict(id=id, titulo=m["titulo"], autor=m["autor"], preguntas=pregs), ensure_ascii=False, separators=(",",":")).replace("</", "<\\/")
    t = html.escape(m["titulo"])
    pag = f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8"><meta name="robots" content="noindex, nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{t} · test de lectura — Estudio 4º ESO</title>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../comun/base.css?v=1">
<link rel="stylesheet" href="../../comun/libro-quiz.css?v=1">
</head>
<body>
<div class="barra">
  <a class="marca" href="../../index.html">📘 Estudio 4º ESO</a>
  <nav class="menu"><a href="../../index.html#curso">Todas las asignaturas</a></nav>
  <span class="sep"></span>
  <a href="../../repaso.html" class="repaso-link">Repaso</a>
</div>
<main class="libro">
  <span class="etiqueta">Lengua y Literatura · lectura · {m["anio"]}</span>
  <h1>{t}</h1>
  <p class="mini">{html.escape(m["autor"])} · {len(pregs)} preguntas tipo test. Respondes y la página te dice al momento si estás en lo cierto o cuál era la respuesta y por qué.</p>
  <div id="quiz"></div>
</main>
<script>window.LIBRO = {datos};</script>
<script src="../../comun/libro-quiz.js?v=1"></script>
</body>
</html>
'''
    d = RAIZ/"temas"/id; d.mkdir(parents=True, exist_ok=True)
    (d/"index.html").write_text(pag, encoding="utf-8")
    print(f"  {id}: {len(pregs)} preguntas · {len({p['cat'] for p in pregs})} bloques · {len(pag)//1024} KB")
if __name__ == "__main__":
    for id in (sys.argv[1:] or LIBROS):
        if (RAIZ/"libros-fuente"/f"{id}.json").exists(): montar(id)
        else: print("  falta libros-fuente/%s.json" % id)
