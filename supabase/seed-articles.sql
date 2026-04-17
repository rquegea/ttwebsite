-- T&T — Seed opcional de 5 artículos iniciales para la tabla `articles`.
-- Ejecutar en Supabase Dashboard → SQL editor.
-- Usa las columnas existentes: title, slug, excerpt, content, image_url, author, published, published_at.
-- El campo `content` contiene HTML básico; edítalo desde /admin/articles/ tras el insert si lo prefieres.

insert into articles (slug, title, excerpt, content, image_url, author, published, published_at) values
(
  'owning-the-answer-aeo-geo-ai',
  'Owning the Answer: el playbook del marketer para AEO, GEO y la era de la búsqueda con IA',
  'Cómo preparar tu marca para un mundo donde la respuesta la da un modelo, no un ranking. Un playbook práctico para AEO, GEO y la nueva búsqueda con IA.',
  '<p>La búsqueda está cambiando de paradigma: en lugar de una lista de enlaces, los usuarios reciben respuestas directas generadas por modelos de IA. Este playbook recoge las prácticas emergentes de AEO (Answer Engine Optimization) y GEO (Generative Engine Optimization) que ya están marcando diferencias en visibilidad de marca.</p><h2>Por qué ahora</h2><p>ChatGPT, Perplexity y Gemini reciben decenas de millones de consultas diarias que antes iban a Google. Quien domine la capa de respuesta, dominará la primera impresión.</p>',
  '',
  'T&T',
  true,
  now() - interval '5 days'
),
(
  'adn-marca-diferenciador-ia',
  'El ADN de tu marca es el diferenciador definitivo en IA',
  'Por qué la identidad propia supera a cualquier prompt. En un ecosistema donde todo el mundo tiene acceso a las mismas herramientas, lo único defensivo es tu ADN de marca.',
  '<p>Cuando cualquiera puede generar contenido con IA, la diferenciación vuelve a donde siempre estuvo: en la identidad de marca. Los modelos amplifican lo que les das; si le das genérico, te devuelven genérico.</p>',
  '',
  'Jessica Ross',
  true,
  now() - interval '4 days'
),
(
  'dominar-caos-marca-agentes-ia',
  'Dominar el caos de marca con soluciones de agentes de IA a medida',
  'Sistemas multi-agente para marketing empresarial: cómo coordinar decenas de agentes especializados sin perder coherencia de marca.',
  '<p>Un sistema multi-agente bien diseñado es la diferencia entre automatizar tareas y orquestar operaciones. Compartimos cómo Murphy simula escenarios con decenas de agentes sintéticos que representan consumidores, competidores y mercados.</p>',
  '',
  'Iran Reyes',
  true,
  now() - interval '3 days'
),
(
  'geo-vs-seo-visibilidad-ia',
  'GEO vs SEO: la guerra por la visibilidad en la era de la IA',
  'Cómo aparecen las marcas en ChatGPT, Perplexity y Gemini — y qué puedes hacer para mejorar tu presencia en la capa generativa.',
  '<p>SEO sigue vivo, pero GEO (Generative Engine Optimization) marca la nueva frontera. Medimos cómo aparecen las marcas en los principales modelos generativos con nuestra herramienta propia, 2laps, y compartimos los patrones que hemos visto en 200+ marcas analizadas.</p>',
  '',
  'T&T',
  true,
  now() - interval '2 days'
),
(
  'ces-2026-vision-velocidad',
  'CES 2026: de la visión a la velocidad',
  'Las tendencias que están transformando la tecnología de marketing este año, desde agentic AI hasta retail media en lineal físico.',
  '<p>Cuatro lecturas clave del CES 2026: la madurez de los agentes autónomos, la convergencia entre retail media y computer vision, la comoditización del contenido generativo, y cómo las marcas están reorganizando sus stacks para competir en tiempo real.</p>',
  '',
  'T&T Team',
  true,
  now() - interval '1 day'
)
on conflict (slug) do nothing;
