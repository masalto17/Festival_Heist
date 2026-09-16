# Festival Heist - Brief operativo para desarrollo

Fecha: 2026-09-15  
Estado: handoff para construir el MVP local.

## Prioridad de lectura

1. `docs/MVP_ACTUALIZADO.md`
2. `docs/GOBIERNO_PROYECTO_CODEX_CLAUDE.md`
3. `docs/LINEAMIENTO_ESTETICO_BASE.md`
4. `docs/HANDOFF_IMPLEMENTACION_ESTETICA_CLAUDE.md`
5. `docs/CHECKLIST_QA_ESTETICA.md`
6. `docs/CHECKLIST_PREPILOTO.md`
7. `README-DEV.md`
8. `README.md`
9. `FUENTES.md`
10. `Festival_Heist_Especificacion_v3_1.md` solo como referencia historica

Si hay contradiccion, seguir `docs/MVP_ACTUALIZADO.md` y pedir confirmacion antes de incorporar una funcion mas compleja.
Si la contradiccion es visual o de experiencia, seguir `docs/LINEAMIENTO_ESTETICO_BASE.md` y `docs/HANDOFF_IMPLEMENTACION_ESTETICA_CLAUDE.md`.

## Modelo de trabajo

Claude queda a cargo del desarrollo completo. Codex queda a cargo de supervision, control y planificacion.

Para iniciar nuevas tareas de desarrollo, usar como prompt operativo:

- `docs/PROMPT_MAESTRO_CLAUDE_DESARROLLO.md`

Antes de programar, declarar explicitamente:

1. que archivos de instrucciones fueron leidos;
2. que archivos de codigo se van a tocar;
3. que queda fuera de alcance;
4. criterio de aceptacion;
5. validaciones a correr.

No asumir contexto no documentado. Si una referencia indicada no puede leerse, frenar y reportarlo.

## Que construir primero

Un MVP web mobile-first que permita:

1. iniciar una sesion sin login;
2. crear un festival con tres elecciones principales: abrir, momento fuerte y cierre;
3. elegir un artista emergente autorizado desde un pool pequeno;
4. responder tres microdecisiones personales;
5. generar un poster compartible;
6. abrir un link de desafio;
7. adivinar las elecciones del creador;
8. crear un nuevo poster desde el desafio;
9. registrar eventos obligatorios;
10. exportar datos en CSV o archivo equivalente.

La primera version puede usar datos seed/locales siempre que quede documentado como piloto.

## No construir en el MVP inicial

- Login obligatorio.
- Spotify OAuth, Spotify Web API o datos de escucha.
- Trivia basada en datos externos de artistas.
- Deezer, YouTube embeds, previews de audio o reproductores como requisito central.
- Marketplace, pagos, autoservicio comercial o integraciones complejas.
- Ranking global, chat, comentarios o app nativa.
- Inferencia automatica de demanda de shows.

Links a Spotify, Apple Music, YouTube, Instagram u otros destinos pueden existir solo como salida externa autorizada por el artista.

## Modelo minimo recomendado

Entidades base:

```text
sessions(id, created_at, source, device, region_declared)
posters(id, session_id, handle, name, theme, share_slug, choices_json, created_at)
challenges(id, poster_id, session_id, score, completed_at, created_own_poster)
emerging_artists(id, name, genre, origin, image_url, official_links_json, authorized, masalto_recommended, active)
artist_exposures(id, session_id, artist_id, surface, event_name, created_at)
```

Entidades comerciales minimas:

```text
partners(id, name, category, contact, status)
campaigns(id, partner_id, name, objective, starts_at, ends_at, status)
placements(id, campaign_id, surface, frequency_cap, disclosure, active)
campaign_assets(id, placement_id, asset_url, destination_url, utm_json, approved_at)
campaign_events(id, campaign_id, placement_id, session_id, event_name, metadata, created_at)
consents(id, session_or_user_id, purpose, granted, created_at)
```

Eventos de producto:

- `session_started`
- `poster_started`
- `poster_completed`
- `share_clicked`
- `shared_link_opened`
- `challenge_started`
- `challenge_completed`
- `new_poster_from_challenge`

Eventos de emergentes:

- `artist_impression`
- `artist_opened`
- `artist_picked`
- `artist_link_clicked`

Eventos comerciales:

- `sponsor_impression`
- `sponsor_click`
- `sponsor_activation_completed`

Los eventos deben ser append-only y deben evitar datos personales crudos en `metadata`.

## Criterios de experiencia

- Mobile-first.
- Lenguaje simple y argentino.
- Festival Heist como marca principal.
- MasAlto como respaldo discreto.
- Poster como recompensa visual central.
- Emergentes como eleccion real, breve y no forzada.
- Sponsor claramente identificado si existe.

Referencias visuales:

- Principal para producto real: `entregables/assets/estetica/festival-heist-direccion-principal-D.png`
- Secundaria para componentes de desafio: `entregables/assets/estetica/festival-heist-componentes-desafio-B.png`
- Referencias historicas, no obligatorias: `entregables/assets/mockups/mockup-crear-festival.png`, `entregables/assets/mockups/mockup-desafio-social.png`, `entregables/assets/mockups/mockup-panel-aliado.png`

No redisenar libremente la identidad visual. La implementacion debe mantenerse dentro de la direccion "Backstage punk pulido" definida en `docs/LINEAMIENTO_ESTETICO_BASE.md`.

## Criterio de listo local

Antes de presentar como piloto cerrado:

- El flujo completo funciona en telefono.
- Hay al menos tres emergentes autorizados cargados.
- El desafio puede jugarse sin login.
- Los eventos obligatorios se registran.
- Existe exportacion de datos.
- Los posters generados son compartibles y, al inicio, `noindex`.
- Privacidad, terminos y autorizaciones fueron revisados.
- Los claims comerciales siguen la matriz de `docs/PLAN_MARKETING_SEO_EMPRESARIAL.md`.

## Reglas de claims

Permitido:

- "MVP en preparacion".
- "Piloto cerrado".
- "Experiencia social para crear, compartir y desafiar".
- "Medicion de senales declaradas y agregadas".

Bloqueado:

- Viralidad garantizada.
- Streams, seguidores, ventas, sponsors o inversion ya obtenidos.
- Demanda real de shows inferida desde elecciones ludicas.
- Muestra representativa del mercado argentino sin evidencia.
- Sponsor mezclado con curaduria sin disclosure.
