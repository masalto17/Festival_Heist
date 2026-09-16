-- Festival Heist — RLS y reglas append-only
-- Fecha: 2026-09-16
-- Cierra el TODO de 0001_init.sql: sin login, el cliente usa la anon key,
-- asi que toda regla de acceso vive en RLS. Principio: insert-only para
-- eventos y tablas de escritura del flujo; select publico solo donde el
-- producto lo requiere (poster/desafio compartible, pool de emergentes).

alter table emerging_artists
  add constraint emerging_artists_name_key unique (name);

alter table sessions enable row level security;
alter table posters enable row level security;
alter table challenges enable row level security;
alter table emerging_artists enable row level security;
alter table artist_exposures enable row level security;
alter table partners enable row level security;
alter table campaigns enable row level security;
alter table placements enable row level security;
alter table campaign_assets enable row level security;
alter table campaign_events enable row level security;
alter table consents enable row level security;
alter table events enable row level security;

-- sessions: se crean sin login; no hay necesidad de leerlas de vuelta.
create policy sessions_insert on sessions
  for insert to anon, authenticated with check (true);

-- posters: el share_slug es la clave publica del flujo de desafio (#6-#7
-- de docs/MVP_ACTUALIZADO.md). Debe poder leerse sin login.
create policy posters_insert on posters
  for insert to anon, authenticated with check (true);
create policy posters_select on posters
  for select to anon, authenticated using (true);

-- challenges: se insertan al completar el desafio; no requieren lectura publica.
create policy challenges_insert on challenges
  for insert to anon, authenticated with check (true);

-- emerging_artists: solo el pool activo y autorizado es visible.
create policy emerging_artists_select on emerging_artists
  for select to anon, authenticated using (active = true and authorized = true);

-- artist_exposures: eventos append-only, sin lectura desde el cliente.
create policy artist_exposures_insert on artist_exposures
  for insert to anon, authenticated with check (true);

-- placements / campaign_assets: solo lo activo y aprobado se expone al cliente,
-- necesario para renderizar la activacion patrocinada (CLAUDE.md §"Sponsor").
create policy placements_select on placements
  for select to anon, authenticated using (active = true);
create policy campaign_assets_select on campaign_assets
  for select to anon, authenticated using (approved_at is not null);

-- campaign_events: eventos comerciales, append-only.
create policy campaign_events_insert on campaign_events
  for insert to anon, authenticated with check (true);

-- consents: se registran, no se leen de vuelta desde el cliente.
create policy consents_insert on consents
  for insert to anon, authenticated with check (true);

-- events: append-only estricto, sin select/update/delete para el cliente.
create policy events_insert on events
  for insert to anon, authenticated with check (true);

-- partners / campaigns: sin politicas publicas -> con RLS activo quedan
-- accesibles solo via service role (panel admin, Etapa 4).
