# Resumen de cambios — Bloques SEO 4, 3, 1, 2, 5

Rama: `nuevo-estilo` · Fecha: 2026-04-21

---

## BLOQUE 4 — Tooltips, :focus, nav.ts footer

**Commit:** pendiente de agrupar con bloque 4 (styles.css ya en `0b8306b`)

### Archivos tocados
| Archivo | Cambio |
|---------|--------|
| `index.html` | Tooltip t&tailor → opción C (sin "punto de contacto") |
| `en/index.html` | Tooltip t&tailor → adaptación EN cultural |
| `styles.css` | `:focus { outline: none }` + `:focus-visible` con #CC2936 |
| `lib/nav.ts` | Footer ES `/es/tech/` → `/es/` · Footer EN `/en/tech/` → `/en/` |

### Build BLOQUE 4
✅ 106 páginas generadas, sin errores.

---

## BLOQUE 3 — Dominio unificado a trucoytrufa.es

**Commit:** `4864cf2`

### Archivos tocados (46 ficheros)
- `next-seo/routes.ts` — `SITE_URL` activo: `https://www.tyt.com` → `https://www.trucoytrufa.es`
- `next-seo/schemas.ts` — email `hello@tyt.com` → `trucoytrufa@trucoytrufa.es` (2 ocurrencias)
- `next-seo/sitemap.ts` — 46 URLs en comentarios actualizadas
- `SEO-VALIDACION.md` — referencia textual
- `contacto/index.html` + `en/contact/index.html` — mailto y texto del email (4 ocurrencias)
- **40 HTML legacy** en raíz/work/en/ — canonical, hreflang, schema.org `"url"` (113 URLs)

### Resumen de reemplazos
| De | A | Ocurrencias |
|----|---|-------------|
| `https://www.tyt.com` | `https://www.trucoytrufa.es` | 48 |
| `https://www.tyt.es` | `https://www.trucoytrufa.es` | 65 |
| `hello@tyt.com` | `trucoytrufa@trucoytrufa.es` | 4 |

**NO tocado:** `hello@tyt.com` en `next-seo/schemas.ts` → cambiado a `trucoytrufa@trucoytrufa.es` como pedido.

### Build BLOQUE 3
✅ 106 páginas generadas, sin errores.

---

## BLOQUE 1 — robots.txt y sitemap.xml

**Commit:** `ad56f08`

### Archivos creados
| Archivo | Descripción |
|---------|-------------|
| `app/robots.ts` | Bloquea `/_next/` y `/admin/`, apunta a sitemap |
| `app/sitemap.ts` | Sitemap bilingual ES/EN con prioridades y hreflang |

### Contenido de `out/robots.txt`
```
User-Agent: *
Disallow: /_next/
Disallow: /admin/

Host: https://www.trucoytrufa.es
Sitemap: https://www.trucoytrufa.es/sitemap.xml
```

### Contenido de `out/sitemap.xml` (muestra, 76 URLs totales)
```xml
<url>
  <loc>https://www.trucoytrufa.es/es/</loc>
  <changefreq>weekly</changefreq><priority>1</priority>
  <xhtml:link hreflang="es-ES" href="https://www.trucoytrufa.es/es/"/>
  <xhtml:link hreflang="en-US" href="https://www.trucoytrufa.es/en/"/>
  <xhtml:link hreflang="x-default" href="https://www.trucoytrufa.es/es/"/>
</url>
<url>
  <loc>https://www.trucoytrufa.es/es/clientes/</loc>
  <changefreq>monthly</changefreq><priority>0.8</priority>
  <xhtml:link hreflang="es-ES" href="https://www.trucoytrufa.es/es/clientes/"/>
  <xhtml:link hreflang="en-US" href="https://www.trucoytrufa.es/en/clients/"/>
  <xhtml:link hreflang="x-default" href="https://www.trucoytrufa.es/es/clientes/"/>
</url>
<url>
  <loc>https://www.trucoytrufa.es/es/aviso-legal/</loc>
  <changefreq>monthly</changefreq><priority>0.4</priority>
  <!-- solo hreflang es-ES + x-default si no hay equivalente EN -->
</url>
<!-- ... 70 URLs más -->
```

### Prioridades aplicadas
| Páginas | Prioridad | changeFreq |
|---------|-----------|------------|
| Homepages (/es/, /en/) | 1.0 | weekly |
| Soluciones (brand-radar, preplay, ai-governance) | 0.9 | monthly |
| Verticales landing (think, tech, tailor…) | 0.9 | monthly |
| Clientes, empresa, contacto, work, insights | 0.8 | monthly (insights: weekly) |
| Subpáginas, work/*, marketing/* | 0.7 | monthly |
| Legal (aviso-legal, cookies, privacidad) | 0.4 | monthly |

**Excluidos del sitemap:** `/coming-soon/` y root-level stubs (noindex).

### Build BLOQUE 1
✅ 108 páginas generadas (robots.txt + sitemap.xml nuevos), sin errores.

---

## BLOQUE 2 — Canonical tags y hreflang en todas las páginas

**Commit:** `c2f17db`

### Archivos tocados
| Archivo | Cambio |
|---------|--------|
| `app/[lang]/[[...slug]]/page.tsx` | `computeAlternates()` + import `getAltLangUrl` |

### Lógica implementada
- `computeAlternates(lang, slug, alwaysBilingual?)`: calcula canonical + hreflang
- `x-default` apunta siempre a la URL ES
- Para páginas bilinguales: `es-ES` + `en-US` + `x-default`
- Para páginas solo en un idioma: hreflang del idioma + `x-default`
- Páginas `work/*` e `insights/*` siempre marcadas como bilinguals (Supabase genera ambas)
- El resto: verifica existencia del HTML contraparte en filesystem

### Verificación en `out/`

**`out/es/index.html` (`/es/`):**
```html
<link rel="canonical" href="https://www.trucoytrufa.es/es/"/>
<link rel="alternate" hrefLang="es-ES" href="https://www.trucoytrufa.es/es/"/>
<link rel="alternate" hrefLang="en-US" href="https://www.trucoytrufa.es/en/"/>
<link rel="alternate" hrefLang="x-default" href="https://www.trucoytrufa.es/es/"/>
```

**`out/en/work/barcelo-brand-campaign/index.html`:**
```html
<link rel="canonical" href="https://www.trucoytrufa.es/en/work/barcelo-brand-campaign/"/>
<link rel="alternate" hrefLang="es-ES" href="https://www.trucoytrufa.es/es/work/barcelo-brand-campaign/"/>
<link rel="alternate" hrefLang="en-US" href="https://www.trucoytrufa.es/en/work/barcelo-brand-campaign/"/>
<link rel="alternate" hrefLang="x-default" href="https://www.trucoytrufa.es/es/work/barcelo-brand-campaign/"/>
```

### Build BLOQUE 2
✅ 108 páginas generadas, sin errores.

---

## BLOQUE 5 — workBase y enlazado interno con prefijo de idioma

**Commit:** `214203d`

### Archivos tocados
| Archivo | Cambio |
|---------|--------|
| `app/[lang]/[[...slug]]/page.tsx` | 9 URLs ES sin prefijo corregidas |

### Cambios aplicados
| Patrón | Antes | Después | Ocurrencias |
|--------|-------|---------|-------------|
| `workBase` | `'/work/'` | `'/es/work/'` | 3 |
| `workHref` (project page) | `'/work/'` | `'/es/work/'` | 1 |
| `contactHref` | `'/contacto/'` | `'/es/contacto/'` | 1 |
| `homeHref` (project + article) | `'/'` | `'/es/'` | 2 |
| `insightsHref` | `'/insights/'` | `'/es/insights/'` | 1 |
| `articleHref()` | `` `/insights/${slug}/` `` | `` `/es/insights/${slug}/` `` | 1 |

### Build BLOQUE 5
✅ 108 páginas generadas, sin errores.

---

## gsutil rsync --dry-run FINAL (acumulado)

```
Operaciones totales estimadas: 619 (Would copy + Would remove)
  - Would copy: ~400 ficheros (build fresco + sitemap/robots nuevos + HTML actualizados)
  - Would remove: ~219 ficheros obsoletos (_next chunks con hashes anteriores, ficheros dev)
```

Muestra de operaciones:
```
Would copy  out/robots.txt          → gs://trucoytrufa.es/robots.txt
Would copy  out/sitemap.xml         → gs://trucoytrufa.es/sitemap.xml
Would copy  out/es/index.html       → gs://trucoytrufa.es/es/index.html
Would copy  out/en/index.html       → gs://trucoytrufa.es/en/index.html
Would remove gs://trucoytrufa.es/_next/static/WybeaM5QwDB0q4uDF_NH_/_buildManifest.js
Would remove gs://trucoytrufa.es/_next/static/chunks/_error.js
...
```

Los `Would remove` son chunks de `_next/static/` del build anterior — comportamiento normal al rotar hashes de build.

---

## Comando de deploy real

Cuando estés listo para subir, ejecuta:

```bash
bash scripts/deploy.sh
```

Esto hace:
1. `npm run build` (genera `out/`)
2. `node scripts/generate-root-redirects.mjs` (43 stubs de redirect)
3. `gsutil -m rsync -r -d out gs://trucoytrufa.es`
4. Actualiza Cache-Control headers en GCS
5. Invalida Cloud CDN (`trucoytrufa-lb`)

O paso a paso si prefieres control manual:
```bash
npm run build
node scripts/generate-root-redirects.mjs
gsutil -m rsync -r -d out gs://trucoytrufa.es
gsutil -m setmeta -h "Cache-Control:public,max-age=300,must-revalidate" "gs://trucoytrufa.es/**/*.html"
gsutil -m setmeta -h "Cache-Control:public,max-age=31536000,immutable" "gs://trucoytrufa.es/_next/static/**"
gcloud compute url-maps invalidate-cdn-cache trucoytrufa-lb --path "/*" --async
```

**NO ejecutar hasta cerrar todos los bloques pendientes.**
