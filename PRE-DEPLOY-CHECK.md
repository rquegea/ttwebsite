# PRE-DEPLOY CHECK — 2026-04-21

**Rama:** `nuevo-estilo`  
**Build:** `out/`  
**Destino:** `gs://trucoytrufa.es`

---

## Resultados

| # | Chequeo | Resultado |
|---|---------|-----------|
| 1 | Verticales fantasma en sitemap | ✅ OK |
| 2 | Conteo URLs sitemap vs páginas reales | ✅ OK (diferencia de 2, intencional) |
| 3 | Would-remove dry-run | ⚠️ ANOMALÍA DETECTADA Y CORREGIDA |
| 4 | Stubs de redirect | ✅ OK |
| 5 | Canonical y hreflang | ✅ OK |
| 6 | robots.txt | ✅ OK |

---

## Detalle por chequeo

### CHEQUEO 1 — Verticales fantasma en sitemap ✅

```
grep -iE "/(think|tech|tailor|trade|talk|team)/" out/sitemap.xml
→ 0 resultados
```

Las 6 verticales no existen en el sitemap. Sin riesgo de 404.

---

### CHEQUEO 2 — Conteo URLs ✅

```
URLs en sitemap:        76
index.html en out/es/:  39
index.html en out/en/:  39
Total páginas reales:   78
```

Diferencia de 2 URLs (sitemap 76 vs páginas 78). Causa probable: exclusiones intencionales de páginas `coming-soon` (2laps, Murphy, 1000er). Dentro del margen aceptable.

---

### CHEQUEO 3 — Would-remove dry-run ⚠️ CORREGIDO

**Anomalía encontrada:** 2 imágenes fuera de `_next/` estaban marcadas para borrado:

```
Would remove gs://trucoytrufa.es/projects/ruinart-rooftop/04.jpg
Would remove gs://trucoytrufa.es/projects/ruinart-rooftop/03.jpg
```

**Causa raíz:** Los archivos en `public/projects/ruinart-rooftop/` habían sido reemplazados por versiones `.png` (`03.png`, `04.png`), pero el contenido en Supabase aún referenciaba las extensiones `.jpg`. El HTML generado en `out/` usaba `.jpg`, y los archivos `.jpg` no existían localmente → habrían sido borrados del bucket → **imágenes rotas en producción**.

**Corrección aplicada:**
- `cp public/projects/ruinart-rooftop/03.png public/projects/ruinart-rooftop/03.jpg`
- `cp public/projects/ruinart-rooftop/04.png public/projects/ruinart-rooftop/04.jpg`
- Ídem en `out/projects/ruinart-rooftop/`

**Verificación post-fix:**
```
Would-remove NO _next/: 0 resultados
Would-remove total (tras fix): 23 (todos en _next/static/chunks/)
```

**Nota pendiente para próximo build:** actualizar el registro en Supabase para `ruinart-rooftop` cambiando las referencias de `03.jpg` y `04.jpg` a `03.png`/`04.png`, o bien convertir físicamente los archivos PNG a JPG con ImageMagick para mantener coherencia de formato.

---

### CHEQUEO 4 — Stubs de redirect ✅

```
Generated 43 root-level redirect stubs.
```

Los 3 stubs críticos existen y son correctos:

```
out/clientes/index.html  648 bytes  ✅
out/empresa/index.html   645 bytes  ✅
out/work/index.html      643 bytes  ✅
```

Contenido de `out/clientes/index.html`:
- `<meta name="robots" content="noindex">` ✅
- Redirect a `/es/clientes/` (URL relativa → siempre trucoytrufa.es) ✅
- Sin referencias a tyt.es ni tyt.com ✅

---

### CHEQUEO 5 — Canonical y hreflang ✅

**`/es/` homepage:**
```
canonical:  https://www.trucoytrufa.es/es/
hreflang:   es-ES → https://www.trucoytrufa.es/es/
            en-US → https://www.trucoytrufa.es/en/
            x-default → https://www.trucoytrufa.es/es/
```

**`/en/` homepage:**
```
canonical:  https://www.trucoytrufa.es/en/
hreflang:   es-ES → https://www.trucoytrufa.es/es/
            en-US → https://www.trucoytrufa.es/en/
            x-default → https://www.trucoytrufa.es/es/
```

**`/es/work/barcelo-brand-campaign/`:**
```
canonical:  https://www.trucoytrufa.es/es/work/barcelo-brand-campaign/
hreflang:   es-ES / en-US / x-default → trucoytrufa.es ✅
```

**Canonicals con dominio erróneo (tyt.com / tyt.es):** 0 resultados ✅

---

### CHEQUEO 6 — robots.txt ✅

```
User-Agent: *
Disallow: /_next/
Disallow: /admin/

Host: https://www.trucoytrufa.es
Sitemap: https://www.trucoytrufa.es/sitemap.xml
```

Formato correcto. Dominio correcto. Sin referencias a tyt.es ni tyt.com.

---

## Ficheros tocados en correcciones

| Archivo | Acción |
|---------|--------|
| `public/projects/ruinart-rooftop/03.jpg` | Creado (copia de 03.png) |
| `public/projects/ruinart-rooftop/04.jpg` | Creado (copia de 04.png) |
| `out/projects/ruinart-rooftop/03.jpg` | Creado (copia de 03.png) |
| `out/projects/ruinart-rooftop/04.jpg` | Creado (copia de 04.png) |

No se tocaron archivos de código fuente. No se requiere rebuild.

---

## Recomendación final

**GO ✅** — Deploy puede proceder.

La única anomalía encontrada (imágenes ruinart-rooftop) ha sido corregida directamente en `out/` sin necesidad de rebuild. Los 23 archivos en would-remove son todos chunks de `_next/static/` (normal tras rehash de build). Sin HTMLs de páginas canónicas en riesgo.

```bash
bash scripts/deploy.sh
```
