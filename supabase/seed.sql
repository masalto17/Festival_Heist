-- Festival Heist — seed local
-- Fecha: 2026-09-16
-- 3 artistas emergentes FICTICIOS para desarrollo/piloto local.
-- Antes de un piloto real, reemplazar por artistas con autorizacion escrita
-- (ver docs/CHECKLIST_PREPILOTO.md §2). No usar estos nombres en materiales comerciales.

insert into emerging_artists (name, genre, origin, image_url, official_links_json, authorized, masalto_recommended, active)
values
  (
    'Vera Onda',
    'indie',
    'Cordoba, Argentina',
    '/artistas/placeholder.png',
    '{"instagram": "https://instagram.com/example-vera-onda"}'::jsonb,
    true,
    true,
    true
  ),
  (
    'Turba Kolectiva',
    'cumbia',
    'Buenos Aires, Argentina',
    '/artistas/placeholder.png',
    '{"instagram": "https://instagram.com/example-turba-kolectiva"}'::jsonb,
    true,
    false,
    true
  ),
  (
    'Nico Fierro',
    'urbano',
    'Rosario, Argentina',
    '/artistas/placeholder.png',
    '{"instagram": "https://instagram.com/example-nico-fierro"}'::jsonb,
    true,
    false,
    true
  )
on conflict (name) do nothing;
