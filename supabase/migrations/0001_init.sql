-- Festival Heist — esquema inicial MVP
-- Fecha: 2026-09-16
-- Alineado con docs/MVP_ACTUALIZADO.md §6 + CLAUDE.md §"Modelo minimo recomendado"

create extension if not exists "pgcrypto";

-- =========================
-- Producto
-- =========================
create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text,
  device text,
  region_declared text
);

create table if not exists posters (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete set null,
  handle text,
  name text not null,
  theme text,
  share_slug text not null unique,
  choices_json jsonb not null,
  created_at timestamptz not null default now()
);
create index if not exists posters_created_at_idx on posters (created_at desc);

create table if not exists challenges (
  id uuid primary key default gen_random_uuid(),
  poster_id uuid not null references posters(id) on delete cascade,
  session_id uuid references sessions(id) on delete set null,
  score int not null default 0,
  completed_at timestamptz,
  created_own_poster boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists challenges_poster_idx on challenges (poster_id);

create table if not exists emerging_artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  genre text not null,
  origin text,
  image_url text,
  official_links_json jsonb not null default '{}'::jsonb,
  preview_url text,               -- Supabase Storage bucket 'previews'; null hasta que el artista entregue el clip
  authorized boolean not null default false,
  masalto_recommended boolean not null default false,
  active boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists emerging_artists_active_idx on emerging_artists (active) where active = true;

create table if not exists artist_exposures (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete set null,
  artist_id uuid not null references emerging_artists(id) on delete cascade,
  surface text not null,
  event_name text not null,
  created_at timestamptz not null default now()
);
create index if not exists artist_exposures_artist_idx on artist_exposures (artist_id, event_name);

-- =========================
-- Comercial (estructura completa; admin solo expone toggles + aprobar asset en el MVP)
-- =========================
create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  contact text,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references partners(id) on delete set null,
  name text not null,
  objective text,
  starts_at timestamptz,
  ends_at timestamptz,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists placements (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  surface text not null,
  frequency_cap int not null default 1,
  disclosure text not null default 'Patrocinado',
  active boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists campaign_assets (
  id uuid primary key default gen_random_uuid(),
  placement_id uuid not null references placements(id) on delete cascade,
  asset_url text not null,
  destination_url text not null,
  utm_json jsonb not null default '{}'::jsonb,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists campaign_events (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  placement_id uuid references placements(id) on delete set null,
  session_id uuid references sessions(id) on delete set null,
  event_name text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists campaign_events_campaign_idx on campaign_events (campaign_id, event_name);

-- =========================
-- Consentimientos
-- =========================
create table if not exists consents (
  id uuid primary key default gen_random_uuid(),
  session_or_user_id text not null,
  purpose text not null,
  granted boolean not null,
  created_at timestamptz not null default now()
);

-- =========================
-- Eventos de producto (append-only)
-- =========================
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  ts timestamptz not null default now(),
  type text not null,
  session_id uuid references sessions(id) on delete set null,
  poster_id uuid references posters(id) on delete set null,
  challenge_id uuid references challenges(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb
);
create index if not exists events_type_ts_idx on events (type, ts desc);

-- Bloqueo append-only: sin UPDATE ni DELETE desde clientes.
-- (Se cumple mediante RLS en 0002; esta migración solo crea la estructura.)
