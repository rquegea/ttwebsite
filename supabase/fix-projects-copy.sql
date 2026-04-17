-- T&T — Correcciones de copy en `projects` (BUGs 1, 7, 9, 11, 12, 13, 14, 15).
-- Ejecutar en Supabase Dashboard → SQL editor.
-- Revisa cada bloque antes de ejecutar; algunos marcados con "REVISAR" requieren tu input.

-- ============================================================
-- BUG 1 — Moët & Chandon Escaparate
-- Fue UN SOLO escaparate en ECI Goya. No 14 centros ni múltiples puntos.
-- ============================================================
update projects set
  client_name = 'Moët & Chandon',
  title = replace(title, 'Moët Chandon', 'Moët & Chandon'),
  description = 'Un escaparate único para Moët & Chandon en El Corte Inglés Goya.',
  challenge = 'Moët & Chandon necesitaba una presencia premium en el escaparate de El Corte Inglés Goya durante la campaña, con producción a medida y ejecución impecable en tiempo.',
  solution = 'Diseñamos y producimos el escaparate de Moët & Chandon en ECI Goya: concepto visual, materiales, producción gráfica y montaje completo en la ventana del centro.',
  result = 'Una implementación única en ECI Goya con acabado premium, entregada en plazo y sin incidencias.'
where slug = 'moet-chandon-escaparate';

-- ============================================================
-- BUG 9 — Moët & Chandon x Pharrell
-- Fue decoración de un mueble de ECI en 5 centros. No escaparate, no 20 puntos.
-- ============================================================
update projects set
  client_name = 'Moët & Chandon',
  title = replace(title, 'Moët Chandon', 'Moët & Chandon'),
  description = 'Decoración del mueble Moët & Chandon x Pharrell en 5 centros de El Corte Inglés.',
  challenge = 'Moët & Chandon lanzaba la edición limitada con Pharrell y necesitaba un punto de venta distintivo en los muebles de El Corte Inglés que reforzara la colaboración.',
  solution = 'Diseñamos y produjimos la decoración del mueble ECI dedicado a la edición Moët & Chandon x Pharrell: gráficas, materiales y montaje en 5 centros seleccionados.',
  result = 'Cinco centros de El Corte Inglés con el mueble Moët & Chandon x Pharrell completamente ambientado durante la campaña.'
where slug = 'moet-chandon-pharrell';

-- ============================================================
-- BUG 7 — Ruinart Rooftop
-- Quitar referencias a "carta de cócteles exclusiva, programación cultural y experiencia sensorial".
-- NOTA: limpiar imágenes de la galería con personas/modelos requiere confirmar URLs (hazlo desde /admin/projects/).
-- ============================================================
update projects set
  solution = 'Transformamos la terraza del Palacio de los Duques en un rooftop Ruinart: diseño de interiores efímero y producción integral del espacio con la identidad de la maison.'
where slug = 'ruinart-rooftop';

-- ============================================================
-- BUG 11 — Pancracio Pop-up
-- T&T produjo: latas, expositores y espacio en ECI. Sin mecánicas promo/experiencias sensoriales que no correspondan.
-- ============================================================
update projects set
  challenge = 'Pancracio quería una presencia destacada en El Corte Inglés para el lanzamiento de su gama, con producción coherente y montaje a medida.',
  solution = 'Produjimos las latas de la colección, los expositores y el espacio Pancracio en El Corte Inglés: diseño gráfico, fabricación de mobiliario y montaje en tienda.',
  result = 'Un pop-up Pancracio completo en ECI con latas, expositores y espacio de marca producidos íntegramente por T&T.'
where slug = 'pancracio-popup';

-- ============================================================
-- BUG 12 — Sony PlayStation Days of Play
-- REVISAR: el copy correcto debe describir con precisión la implementación real de Days of Play.
-- Actualiza este bloque con los textos definitivos antes de ejecutar.
-- ============================================================
-- update projects set
--   challenge = '...',
--   solution = '...',
--   result = '...'
-- where slug = 'sony-playstation-days-of-play';

-- ============================================================
-- BUG 13 — Prime packaging (confirmar slug exacto: prime-welcome-pack u otro)
-- Fue diseño y producción de packaging para clientes de PRIME (Carrefour, Ahorra Más), no campaña digital.
-- ============================================================
update projects set
  description = 'Diseño y producción de packaging para el lanzamiento de una nueva referencia PRIME en cadenas como Carrefour y Ahorra Más.',
  challenge = 'PRIME lanzaba una nueva referencia y necesitaba un packaging específico para comunicar el producto a los clientes de sus distribuidores: Carrefour, Ahorra Más y otros.',
  solution = 'Diseñamos y produjimos el packaging de la nueva referencia PRIME adaptado a cada cadena distribuidora, con acabados y materiales coherentes con la marca.',
  result = 'Packaging producido y distribuido en los puntos de venta de las cadenas socias para el anuncio de la nueva referencia PRIME.'
where slug = 'prime-welcome-pack';
-- Si el slug correcto es otro, cambia el WHERE arriba y vuelve a ejecutar.

-- ============================================================
-- BUG 14 — Barceló Nevalia
-- T&T NO organizó el Festival. T&T diseñó y produjo la bajada al punto de venta a nivel nacional.
-- ============================================================
update projects set
  description = 'Diseño y producción de la bajada al punto de venta del Festival Barceló Nevalia en centros nacionales.',
  challenge = 'Barceló Nevalia necesitaba trasladar el universo del festival al canal de venta: decoraciones, material gráfico y activaciones de trade marketing en toda España.',
  solution = 'Diseñamos y producimos la bajada al punto de venta del Festival Barceló Nevalia: PLV, material gráfico, decoración de puntos de venta y logística de despliegue en diferentes centros a nivel nacional.',
  result = 'Bajada al punto de venta ejecutada en múltiples puntos nacionales, reforzando la presencia del Festival Barceló Nevalia durante la campaña.'
where slug = 'barcelo-nevalia';

-- ============================================================
-- BUG 15 — Kellogg's Sinacio
-- Evento online corporativo en época COVID-19: aperitivo navideño + envío de cesta de Navidad con producto y juegos.
-- ============================================================
update projects set
  description = 'Producción y ejecución de un evento corporativo online para Kellogg''s en plena época COVID: aperitivo navideño virtual y cesta de Navidad a empleados.',
  challenge = 'En plena pandemia, Kellogg''s necesitaba celebrar su convención navideña de forma remota y mantener la conexión con los empleados sin poder reunirse físicamente.',
  solution = 'Produjimos el evento corporativo online completo: preparación del aperitivo navideño para los empleados, y envío de una cesta de Navidad con producto Kellogg''s y juegos de convención a cada casa.',
  result = 'Convención navideña 100% online ejecutada sin incidencias, con participación de los empleados a distancia y cesta recibida en todos los hogares antes del evento.'
where slug = 'kelloggs-sinacio';

-- ============================================================
-- Sanity check (opcional): verifica qué slugs existen para confirmar los WHERE anteriores.
-- ============================================================
-- select slug, client_name, title from projects order by slug;
