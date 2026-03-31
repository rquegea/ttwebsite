# T&T — Instrucciones para Claude

## Quién es T&T

T&T (antes Truco y Trufa) es una **Tech-led Marketing Intelligence & Execution Company** con sede en Madrid. No es una agencia. No es una consultora. No es un SaaS puro.

**Claim:** "Technology we build. Intelligence we deliver. Results we own."
**Tagline:** "We make brands extraordinary" / "Hacemos marcas extraordinarias"

**Definición operativa:** T&T combina tecnología propia de IA con equipos senior para que las marcas tomen mejores decisiones — y las lleva al punto de venta, al evento y a la calle.

**Referentes de posicionamiento:** LLYC, Havas (en escala y tono institucional), pero con un diferencial tecnológico que ninguna de las dos tiene: herramientas propias.

**Identidad visual:** warm cream/dark backgrounds, acento rojo #CC2936, mascota beagle con chistera.

---

## Tecnología propia (diferencial clave)

T&T desarrolla y opera tres herramientas propias. Esto es lo que la separa de cualquier agencia o consultora:

| Herramienta | Qué hace | Estado |
|-------------|----------|--------|
| **2laps** | Monitorización de visibilidad GEO/AI. Mide cómo aparecen las marcas en ChatGPT, Perplexity, Gemini y otros modelos de IA generativa | Activa, con plataforma pública (Chulabs) en desarrollo |
| **Murphy** | Simulador multi-agente de escenarios de mercado. Crea agentes sintéticos que simulan comportamientos de consumidores, competidores y mercados | Activa, primer test completado (60 agentes, 40 rondas) |
| **1000er.ai** | Computer vision para inteligencia de lineal en retail. Analiza fotos de estanterías para detectar productos, facing, share of shelf | En desarrollo activo (V5: YOLO + Gemini) |

Cuando se describa a T&T, **siempre** mencionar que tiene tecnología propia. Es el diferencial nº1.

---

## 6 Líneas de negocio

| Vertical | Qué cubre |
|----------|-----------|
| **t&think** | Creatividad y Dirección de Arte, Estrategia de Marca, Investigación de Mercados, Data y Analítica |
| **t&tech** | 2laps, Murphy, 1000er.ai — las herramientas propias de IA |
| **t&tailor** | Producción a medida: PLV, roll-ups, merchandising, textil corporativo, packaging |
| **t&trade** | Trade Show y Ferias, Trade Marketing (activaciones en punto de venta) |
| **t&talk** | PR y Comunicación, SEO, GEO, Paid Media, Medios Convencionales, Content Marketing |
| **t&team** | Captación de Talento, Formación Continua, Teambuilding |

Las verticales son **LÍNEAS DE NEGOCIO**, no "servicios".

---

## Clientes reales

Barceló · Campofrío · Dentons · Dom Pérignon · EAE Business School · Gullón · KPMG · Lotus · Moët · Nivea · Grupo Planeta · PlayStation · Ruinart · Sabadell · Tolsa · UNIE · UOC · VIU

---

## Reglas obligatorias de tono y copy

### Prohibiciones absolutas
- **NUNCA "agencia"** en texto visible. Solo en meta tags SEO (porque la gente busca "agencia de marketing")
- **NUNCA "en Madrid"** como propuesta de valor en titulares. Madrid solo en: footer, contacto, schema.org, meta description
- **Sin clichés:** prohibido "360", "integral", "de la mano", "soluciones a medida", "llave en mano", "sinergias", "holístico", "ecosistema", "partner estratégico"

### Estilo
- **Tono:** institucional-premium con personalidad. Seguro, ambicioso, sin arrogancia. Como LLYC pero menos corporativo y más tech
- **Frases cortas.** Párrafos máx 3 líneas
- **Bilingüe:** generar AMBAS versiones (ES y EN). La versión EN es adaptación cultural, no traducción literal
- Cuando haga falta definir a T&T: variaciones naturales de "empresa de marketing, inteligencia y tecnología". Nunca repetir la misma fórmula dos veces en la misma página
- El mensaje siempre debe cerrar el triángulo: **tecnología → inteligencia → ejecución**

---

## SEO: estrategia dual

- **Web visible:** T&T es una "empresa de marketing intelligence y tecnología"
- **Meta tags (invisible):** incluir "agencia de marketing Madrid" porque la gente BUSCA "agencia" en Google
- Resultado: rankeas por "agencia" pero el usuario lee "empresa"

---

## Estructura de URLs

```
/es/ y /en/ (cada página existe en ambos idiomas)
├── /think/ (+ /creatividad/, /estrategia/, /investigacion/, /data-analitica/)
├── /tech/ (+ /2laps/, /murphy/, /1000er/)
├── /tailor/ (landing única, sin subpáginas)
├── /trade/ (+ /trade-show/, /trade-marketing/)
├── /talk/ (landing única, sin subpáginas)
├── /team/ (+ /captacion/, /formacion/, /teambuilding/)
├── /clientes/
├── /empresa/
├── /contacto/
└── /insights/ (NO "blog" — llamarlo "Insights" como LLYC/Havas)
```

---

## Stack técnico

- **Actual:** Vite + HTML estático + CSS custom + JS vanilla
- **Objetivo:** Next.js 14+ con App Router, i18n middleware, deploy en Vercel
- URLs bilingües: `/es/...` y `/en/...`
- Detección automática de idioma por Accept-Language

## Estilos

- Fuentes: Inter (body) + Lora (títulos)
- Paleta: #0A0A0A / #FFFFFF / #FAFAFA / #1A1A1A / #EAEAEA
- Acento: #CC2936
- Homepage: tema oscuro
- Subpáginas: tema claro (.light-theme)