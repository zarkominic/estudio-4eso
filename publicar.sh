#!/usr/bin/env bash
# publicar.sh — sube los cambios y fuerza a los navegadores a coger la versión nueva.
#
# Por qué existe: los ficheros de comun/ llevan ?v=... para que el navegador sepa
# cuándo han cambiado. Si esa etiqueta no cambia, el navegador sirve la copia vieja
# y los cambios no se ven aunque estén publicados. Pasó el 20/09 con la barra de
# consulta: estaba en el servidor pero nadie la veía.
#
# Uso:  bash publicar.sh "mensaje del commit"

set -e
cd "$(dirname "$0")"

V=$(date +%Y%m%d%H%M)   # fecha Y HORA: cambia en cada despliegue
echo "Versión nueva: $V"

python3 - "$V" <<'PY'
import pathlib, re, sys
v = sys.argv[1]
n = 0
for f in list(pathlib.Path(".").glob("*.html")) + list(pathlib.Path("temas").glob("*/index.html")) + [pathlib.Path("plantilla/index.html")]:
    if not f.exists(): continue
    t = f.read_text(encoding="utf-8")
    nuevo = re.sub(r'((?:src|href)="(?:\.\./\.\./)?comun/[a-z0-9-]+\.(?:js|css))(\?v=[0-9]+)?"', r'\1?v=' + v + '"', t)
    if nuevo != t:
        f.write_text(nuevo, encoding="utf-8"); n += 1
print(f"  {n} páginas actualizadas")
PY

git add -A
git commit -q -m "${1:-Actualización}" || echo "  (sin cambios que commitear)"
git push -q origin main
echo "→ https://zarkominic.github.io/estudio-4eso/  (GitHub tarda un minuto)"
echo "   Si sigues sin ver un cambio: recarga forzada con Cmd+Shift+R."
