# SEO-VALIDACION.md — trucoytrufa.es
**Fecha:** 2026-04-21 | **GSC datos:** 17/04/2026 | **Rama:** nuevo-estilo

---

## Pregunta 1: ¿Existen /es/ y /en/ como carpetas con contenido HTML?

### Resultado

La app usa `app/[lang]/[[...slug]]/page.tsx` como única ruta Next.js. El `[lang]` acepta `es` o `en`.

- **`/es/` en source code:** NO existe como carpeta. Las páginas en español leen sus fuentes desde la raíz del repo (`/clientes/index.html`, `/work/barcelo/index.html`, etc.).
- **`/en/` en source code:** SÍ existe en `/en/`. Contiene los HTML legacy de las páginas en inglés.
- **`/out/es/` y `/out/en/`:** Se generan en el build. Son el output real que `gsutil` sube al bucket.

### Cómo funciona el build

```
next build
  → generateStaticParams() lee el filesystem:
      • Carpetas raíz como clientes/, work/, empresa/ → genera {lang:'es', slug:['clientes']}
      • Carpetas /en/* → genera {lang:'en', slug:['clients']}
  → Page Component lee el HTML legacy → stripHeaderFooter → inyecta nuevo header/footer de lib/nav.ts
  → Output: out/es/clientes/index.html, out/en/clients/index.html
  
node scripts/generate-root-redirects.mjs
  → Lee out/es/* y out/en/* → genera stubs noindex+redirect en out/clientes/, out/clients/, etc.

gsutil rsync -r -d out gs://trucoytrufa.es
  → Sube todo out/ al bucket. Solo out/ llega a producción.
```

---

## Pregunta 2: Lista completa de index.html generados en /out/

### out/es/ (páginas buenas — deben indexarse)
```
/es/                                         ← homepage ES
/es/ai-governance/
/es/aviso-legal/
/es/brand-radar/
/es/clientes/
/es/coming-soon/                             ← debatible (thin content)
/es/contacto/
/es/cookies/
/es/empresa/
/es/insights/
/es/insights/adn-marca-diferenciador-ia/
/es/insights/ces-2026-vision-velocidad/
/es/insights/dominar-caos-marca-agentes-ia/
/es/insights/geo-vs-seo-visibilidad-ia/
/es/insights/owning-the-answer-aeo-geo-ia/
/es/marketing/brand/
/es/marketing/events/
/es/marketing/media/
/es/marketing/production/
/es/marketing/social/
/es/marketing/strategy/
/es/marketing/talent/
/es/marketing/trade-marketing/
/es/preplay/
/es/privacidad/
/es/work/
/es/work/barcelo-brand-campaign/
/es/work/barcelo-nevalia/
/es/work/campofrio-snackin/
/es/work/dom-perignon-lady-gaga/
/es/work/kelloggs-sinacio/
/es/work/lotus-teambuilding/
/es/work/moet-chandon-escaparate/
/es/work/moet-chandon-pharrell/
/es/work/pancracio-popup/
/es/work/prime-welcome-pack/
/es/work/roc-digital/
/es/work/ruinart-rooftop/
/es/work/sony-playstation-days-of-play/
```

### out/en/ (páginas buenas — deben indexarse)
```
/en/                                         ← homepage EN
/en/ai-governance/
/en/brand-radar/
/en/clients/
/en/coming-soon/
/en/company/
/en/contact/
/en/cookies/
/en/insights/                                (+ 5 artículos)
/en/legal-notice/
/en/marketing/brand/
/en/marketing/events/
/en/marketing/media/
/en/marketing/production/
/en/marketing/social/
/en/marketing/strategy/
/en/marketing/talent/
/en/marketing/trade-marketing/
/en/preplay/
/en/privacy/
/en/work/                                    (+ 13 casos)
```

### out/ raíz — stubs noindex+redirect (generados por generate-root-redirects.mjs)
Todas tienen `<meta name="robots" content="noindex">`.
```
/ai-governance/    → /es/ai-governance/
/aviso-legal/      → /es/aviso-legal/
/brand-radar/      → /es/brand-radar/
/clients/          → /en/clients/
/clientes/         → /es/clientes/
/coming-soon/      → /es/coming-soon/
/company/          → /en/company/
/contact/          → /en/contact/
/contacto/         → /es/contacto/
/cookies/          → /es/cookies/
/empresa/          → /es/empresa/
/insights/         → /es/insights/    (+ artículos)
/legal-notice/     → /en/legal-notice/
/marketing/brand/  → /es/marketing/brand/
/marketing/events/ → /es/marketing/events/
[… 8 subcarpetas de marketing …]
/preplay/          → /es/preplay/
/privacidad/       → /es/privacidad/
/privacy/          → /en/privacy/
/work/             → /es/work/        (+ casos)
```

### ⚠️ Rutas que NO existen en out/ → 404 garantizado
```
/think/                   ← enlazada desde nav body
/think/creatividad/       ← enlazada desde nav body
/think/estrategia/        ← enlazada desde nav body
/think/investigacion/     ← enlazada desde nav body
/think/data-analitica/    ← enlazada desde nav body
/tech/                    ← enlazada en lib/nav.ts:376 (footer)
/tech/2laps/              ← enlazada desde nav body
/tech/1000er/             ← enlazada desde nav body
/tailor/                  ← enlazada desde nav body
/tailor/plv/              ← enlazada desde nav body
/tailor/merchandising/    ← enlazada desde nav body
/tailor/packaging/        ← enlazada desde nav body
/trade/                   ← enlazada desde nav body
/trade/trade-show/        ← enlazada desde nav body
/trade/trade-marketing/   ← enlazada desde nav body
/talk/                    ← enlazada desde nav body
/talk/pr-comunicacion/    ← enlazada desde nav body
/talk/seo-paid-media/     ← enlazada desde nav body
/talk/content-medios/     ← enlazada desde nav body
/team/                    ← enlazada desde nav body
/team/captacion/          ← enlazada desde nav body
/team/formacion/          ← enlazada desde nav body
/team/teambuilding/       ← enlazada desde nav body
/en/tech/                 ← enlazada en lib/nav.ts:411 (footer EN)
```
→ Como no hay `out/es/think/`, el generate-root-redirects NO genera `/out/think/`. Google 404.

---

## Pregunta 3: ¿Los HTMLs raíz en out/ son pre-existentes o los genera el build?

| Tipo | Origen | ¿Sube a GCS? |
|---|---|---|
| `out/es/clientes/index.html` | `next build` (lee `/clientes/index.html` del source) | ✅ Sí |
| `out/clientes/index.html` | `generate-root-redirects.mjs` post-build (stub noindex) | ✅ Sí |
| `/clientes/index.html` (raíz repo) | Archivo legacy pre-existente — fuente de contenido para Next.js | ❌ No sube directamente |

Los archivos legacy en la raíz (`/clientes/`, `/trabajo/`, etc.) **NO se suben al bucket**. Solo se sube `out/`.

---

## Pregunta 4: ¿Hay /es/ o /en/ en source code con archivos reales?

| Directorio | ¿Existe? | Contenido |
|---|---|---|
| `/en/` (raíz repo) | ✅ Sí | HTML legacy en inglés. Source de las rutas `/en/` del build. |
| `/es/` (raíz repo) | ❌ No | No existe. Las páginas ES se leen de la raíz. |
| `app/[lang]/` | ✅ Sí | Solo `[[...slug]]/` (catch-all) + `coming-soon/`. Sin contenido ES/EN. |

---

## Diagnóstico de los 9 motivos GSC

| Motivo GSC | N | Causa confirmada |
|---|---|---|
| **404 No encontrado** | 27 | Verticales `/think/`, `/tech/`, `/tailor/`, `/trade/`, `/talk/`, `/team/` y subpáginas no existen en `out/`. Google las crawlea por los enlaces en el body del site. |
| **Excluida por noindex** | 20 | Son los stubs sin prefijo generados por `generate-root-redirects.mjs`. Tienen `noindex` explícito. Comportamiento **correcto y esperado**. |
| **Rastreada sin indexar** | 17 | Probable: `/es/marketing/*` y `/es/coming-soon/`, `/es/preplay/`. Sin canonical tag, posible thin content. |
| **Página con redirección** | 8 | Stubs cuyo `esUrl=null` redirigen solo a `/en/`. O páginas del bucket con redireccionamiento a nivel CDN/hosting. A confirmar con lista exacta de GSC. |
| **Duplicada sin canónica** | 5+1 | `generateMetadata` solo extrae title y description del HTML legacy. **No genera `<link rel="canonical">`**. Sin canonical, Google ve duplicados entre `/es/empresa/` y `/en/company/` etc. |
| **Descubierta sin indexar** | 4 | No hay `app/sitemap.ts` ni `app/robots.ts` → no se genera `sitemap.xml` ni `robots.txt` en `out/`. |
| **Bloqueada por robots.txt** | 1 | No hay `robots.txt` en producción. Puede ser un artifact de configuración previa del CDN o del bucket. |
| **Alternativa canónica adecuada** | 1 | OK, Google la descartó correctamente. Ignorar. |

---

## Hallazgos críticos adicionales

### A. Sin robots.txt ni sitemap.xml en producción
- `app/robots.ts` → **no existe**
- `app/sitemap.ts` → **no existe**
- Los archivos `next-seo/robots.ts` y `next-seo/sitemap.ts` son módulos de config, NO están en `app/` → Next.js NO los convierte en archivos del export.
- **Consecuencia**: el bucket no tiene `robots.txt` ni `sitemap.xml`.

### B. Sin canonical en páginas generadas
- `generateMetadata()` en `app/[lang]/[[...slug]]/page.tsx:603-612` solo devuelve `{title, description}`.
- **Ninguna página tiene `<link rel="canonical">`**.

### C. SITE_URL incorrecto
- `next-seo/routes.ts:6` → `SITE_URL = 'https://www.trucoytrufa.es'`
- Dominio correcto: `https://www.trucoytrufa.es`
- Este módulo no se usa actualmente para canonical (no hay canonical), pero está mal para schemas futuros.

### D. workBase sin prefijo de idioma
- `app/[lang]/[[...slug]]/page.tsx:124` → `const workBase = lang === 'en' ? '/en/work/' : '/work/';`
- Para `lang='es'` genera links a `/work/` (sin `/es/` prefix). El stub `/out/work/` tiene `noindex`.

---

## BLOQUE 4 — Inventario completo de hrefs a verticales fantasma

### Fuente 1: `lib/nav.ts` (footer — afecta TODAS las páginas generadas)

| Archivo | Línea | href | Destino real |
|---|---|---|---|
| `lib/nav.ts` | 376 | `/es/tech/` | ❌ 404 |
| `lib/nav.ts` | 411 | `/en/tech/` | ❌ 404 |

**Contexto**: Son enlaces del footer de navegación ("Tecnología" / "Technology"). El mega-menu del header NO tiene enlaces a verticales fantasma — ya usa `<span class="nav-coming-soon">` para 2laps/Murphy/1000er.

### Fuente 2: Body de archivos HTML legacy (sección de offerings con tabs)

Los siguientes archivos contienen el bloque de "offering tabs" con hrefs a verticales. Este bloque se incrusta tal cual en el body de las páginas generadas por Next.js (el header/footer legacy se reemplaza, pero el body no).

| Archivo legacy | Líneas afectadas (muestra) | Hrefs muertos en esa página |
|---|---|---|
| `index.html` | 62-77, 99-104, 126-136, 158-163, 185-195, 217-227 | /think/*, /tech/*, /tailor/*, /trade/*, /talk/*, /team/* |
| `clientes/index.html` | Mismas rutas | Igual |
| `empresa/index.html` | Mismas rutas | Igual |
| `contacto/index.html` | Mismas rutas | Igual |
| `insights/index.html` | Mismas rutas + footer `/think/`, `/tech/`, etc. (líneas 287-299) | Igual + footer |
| `aviso-legal/index.html` | Mismas rutas | Igual |
| `privacidad/index.html` | Mismas rutas | Igual |
| `cookies/index.html` | Mismas rutas | Igual |
| `preplay/index.html` | Mismas rutas | Igual |
| `ai-governance/index.html` | Mismas rutas | Igual |
| `work/index.html` | Mismas rutas | Igual |
| `work/[13 casos]/index.html` | Mismas rutas | Igual |
| `en/index.html` | /en/think/*, /en/tech/*, /en/tailor/*, /en/trade/*, /en/talk/*, /en/team/* | Igual (EN) |
| `en/clients/index.html` | Igual EN | Igual |
| `en/company/index.html` | Igual EN | Igual |
| `en/contact/index.html` | Igual EN | Igual |
| `en/insights/index.html` | Igual EN | Igual |
| `en/preplay/index.html` | Igual EN | Igual |
| `en/work/[13 casos]/index.html` | Igual EN | Igual |

**Total de archivos legacy con hrefs muertos: ~46**
**Total de hrefs muertos aproximado: ~778** (confirmado por grep)

### Fuente 3: `scripts/inject-nav.js` (script legacy, NO se ejecuta en el build)

Contiene los mismos hrefs muertos pero este script se usó para inyectar nav en HTML files en el pasado. **No genera nada durante `npm run build`**. El riesgo es que si alguien lo ejecuta manualmente, sobreescribiría las correcciones.

---

## ⏸️ PAUSA — Decisión requerida para BLOQUE 4

Los dead links en el footer generado vienen de `lib/nav.ts:376,411`. Hay dos ocurrencias exactas:

| Línea | HTML actual | Opciones |
|---|---|---|
| `lib/nav.ts:376` | `<a href="/es/tech/">Tecnología</a>` | Cambiar href a `/es/marketing/brand/` u otra válida, o quitar el link |
| `lib/nav.ts:411` | `<a href="/en/tech/">Technology</a>` | Idem EN |

Los dead links en el body de las 46 páginas legacy provienen de la sección "offering tabs". Las **3 opciones** para tratarlos:

**Opción 4A** — Eliminar el bloque de offering tabs de todos los archivos HTML legacy.
- Pro: limpio, sin dead links.
- Contra: cambia el layout visual de páginas como la homepage (hay que verificar si ese bloque se muestra).

**Opción 4B** — Convertir los `<a href="/think/...">` en `<span>` (sin href).
- Pro: mantiene la presentación visual; Google no crawlea los hrefs.
- Contra: cambio masivo en 46 archivos.

**Opción 4C** — Añadir `rel="nofollow"` a los hrefs muertos.
- Pro: Google no los sigue, el usuario puede hacer clic (experimenta un 404, pero es temporal).
- Contra: el user experience es malo si el usuario hace clic.

**⚠️ Nota sobre inject-nav.js**: independientemente de la opción elegida, actualizar también `scripts/inject-nav.js` para que no tenga los hrefs muertos. Así queda consistente.

**→ Esperando tu decisión (4A / 4B / 4C) antes de tocar ningún archivo.**

---

*Este archivo es de solo-lectura/diagnóstico. No se ha modificado ningún archivo del sitio.*
