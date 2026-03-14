# T&T — Instrucciones para Claude

## Quién es T&T

T&T (antes Truco y Trufa) es una empresa de marketing, comunicación y transformación con sede en Madrid y alcance global. Referentes de posicionamiento: LLYC, Havas.

## Reglas obligatorias

- **NUNCA uses "agencia"** en texto visible. Solo en meta tags SEO (porque la gente busca "agencia de marketing")
- **NUNCA uses "en Madrid"** como propuesta de valor en titulares. Madrid solo aparece en: footer, contacto, schema.org, meta description
- Las verticales (t&think, t&tech, t&tailor, t&trade, t&talk, t&team) son **LÍNEAS DE NEGOCIO**, no "servicios"
- **Tono**: institucional-premium con personalidad. Como LLYC pero menos corporativo. Seguro, ambicioso, sin arrogancia
- **Frases cortas**. Párrafos máx 3 líneas
- **Sin clichés**: prohibido "360", "integral", "de la mano", "soluciones a medida", "llave en mano", "sinergias", "holístico"
- **Bilingüe**: genera AMBAS versiones (ES y EN). La versión EN es adaptación cultural, no traducción literal
- Cuando haga falta definir a T&T: variaciones naturales de "empresa de marketing, comunicación y transformación". Nunca repetir la misma fórmula dos veces en la misma página
- El tagline es: **"We make brands extraordinary"** / **"Hacemos marcas extraordinarias"**

## Clientes reales

Barceló · Campofrío · Dentons · Dom Pérignon · EAE Business School · Gullón · KPMG · Lotus · Moët · Nivea · Grupo Planeta · PlayStation · Ruinart · Sabadell · Tolsa · UNIE · UOC · VIU

## 6 Líneas de negocio

| Vertical | Servicios |
|----------|-----------|
| t&think | Creatividad y Dirección de Arte, Estrategia de Marca, Investigación de Mercados, Data y Analítica |
| t&tech | 2laps (herramienta propia), 1000er (plataforma propia) |
| t&tailor | Producción a medida: PLV, roll-ups, merchandising, textil corporativo, packaging |
| t&trade | Trade Show y Ferias, Trade Marketing (activaciones en punto de venta) |
| t&talk | PR y Comunicación, SEO, GEO, Paid Media, Medios Convencionales, Content Marketing |
| t&team | Captación de Talento, Formación Continua, Teambuilding |

## Stack técnico

- **Actual**: Vite + HTML estático + CSS custom + JS vanilla
- **Objetivo**: Next.js 14+ con App Router, i18n middleware, deploy en Vercel
- URLs bilingües: `/es/...` y `/en/...`
- Detección automática de idioma por Accept-Language

## Estructura de URLs

```
/es/ y /en/ (cada página existe en ambos idiomas)
├── /think/ (+ /creatividad/, /estrategia/, /investigacion/, /data-analitica/)
├── /tech/ (+ /2laps/, /1000er/)
├── /tailor/ (landing única, sin subpáginas)
├── /trade/ (+ /trade-show/, /trade-marketing/)
├── /talk/ (landing única, sin subpáginas)
├── /team/ (+ /captacion/, /formacion/, /teambuilding/)
├── /clientes/
├── /empresa/
├── /contacto/
└── /insights/ (NO "blog" — llamarlo "Insights" como LLYC/Havas)
```

## SEO: estrategia dual

- **Web visible**: T&T es una "empresa de marketing y transformación"
- **Meta tags (invisible)**: incluir "agencia de marketing Madrid" porque la gente BUSCA "agencia" en Google
- Resultado: rankeas por "agencia" pero el usuario lee "empresa"

## Estilos

- Fuentes: Inter (body) + Lora (títulos)
- Paleta: #0A0A0A / #FFFFFF / #FAFAFA / #1A1A1A / #EAEAEA
- Homepage: tema oscuro
- Subpáginas: tema claro (.light-theme)