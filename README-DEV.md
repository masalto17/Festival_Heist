# Festival Heist — Guía de desarrollo

Este documento cubre solo el entorno de código del MVP. Para producto, ver `docs/MVP_ACTUALIZADO.md`.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres) — auth solo para `/admin`
- Deploy en Vercel desde `main`

## Requisitos locales

- Node.js ≥ 20
- pnpm o npm ≥ 10
- Cuenta Supabase (proyecto propio)

## Setup

```bash
npm install
cp .env.example .env.local
# completar SUPABASE_* y NEXT_PUBLIC_SITE_URL
npm run dev
```

Abrir http://localhost:3000

## Migraciones

Las migraciones viven en `supabase/migrations/`. Aplicar con Supabase CLI:

```bash
supabase link --project-ref <ref>
supabase db push
```

## Estructura

```
app/                Rutas y páginas (App Router)
  page.tsx          Landing
  crear/            Wizard de creación (Etapa 2)
  p/[slug]/         Póster público (Etapa 2)
  d/[slug]/         Desafío (Etapa 3)
  admin/            Panel interno (Etapa 4)
  api/              Endpoints
  legales/          Términos y privacidad
lib/
  supabase/         Clientes server + browser
  slug.ts           Generador de share_slug (nanoid)
data/               JSON seed no-sensible (artistas curados, microdecisiones)
supabase/migrations/  Esquema SQL versionado
```

## Reglas de producto no negociables

Ver `CLAUDE.md` en la raíz. Resumen:

- Mobile-first, lenguaje argentino simple.
- Sin login para jugar.
- Sin Spotify OAuth ni Web API.
- Sin trivia externa sobre artistas.
- Sponsor siempre con disclosure "Patrocinado".
- Emergentes solo con autorización escrita.
- `noindex` en `/p/*` y `/d/*` durante piloto.

## Roadmap del código

- Etapa 0: scaffolding (rama `feat/mvp-scaffold`) ← **acá estamos**
- Etapa 1: migración inicial + seed 3 emergentes ficticios
- Etapa 2: wizard de creación + póster + share
- Etapa 3: desafío
- Etapa 4: `/admin`
- Etapa 5: sponsor placement + instrumentación completa
- Etapa 6: hardening + criterio de listo
