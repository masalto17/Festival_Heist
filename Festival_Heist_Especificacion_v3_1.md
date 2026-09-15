# Festival Heist — Especificación Integrada v3.1 (MVP)

**Versión:** 3.1
**Fecha:** Septiembre 2026
**Autor:** Hugo Federico De Bernardo — MásAlto Producciones
**Estado:** Documento de trabajo listo para iniciar desarrollo. Reemplaza v3.

---

## 1. Resumen ejecutivo

Festival Heist es un juego web asíncrono y social diseñado para viralidad orgánica, descubrimiento de artistas emergentes y captura de inteligencia de mercado sobre gustos musicales de la audiencia 16-35. El usuario arma un póster de festival personalizado estructurado en escenarios, lo comparte, y sus amigos intentan "descifrarlo" mediante trivia. El sistema promueve artistas emergentes (incluidos los recomendados por MásAlto) integrándolos como parte natural del festival.

Objetivo primario de negocio: generar información accionable sobre artistas contratables para el interior del país, alcanzando diversidad de géneros y orígenes.

---

## 2. Cambios respecto de v3

| Área | v3 | v3.1 |
|---|---|---|
| Hosting de audio de emergentes | Supabase Storage con MP3s autohospedados | Sin hosting. Previews externos desde DSPs |
| Requisito de alta de artistas | Autorización + subida de MP3 | Presencia en al menos 1 DSP mainstream + link al tema + autorización |
| Fuente de audio en el juego | Archivos propios | Deezer API preview URLs (primario) + YouTube embed (fallback) |
| Costo y complejidad de storage | Escala con volumen | Cero |
| Riesgo legal sobre distribución de audio | Vos distribuís, sos responsable | La DSP original distribuye, vos solo referenciás |
| Formulario de alta | Complejo (archivos + metadata) | Simple (pegar link + firmar autorización) |

Se preservan de v3: estructura de escenarios, sistema Recomendados MásAlto con Ekiss incluido, mecanismo de robo fuerte, stack Next.js/Supabase/Vercel, apertura de plataforma en Fase 2.

---

## 3. Objetivos

| # | Objetivo | Cómo lo cumple v3.1 |
|---|---|---|
| 1 | Viralidad de fricción cero | Sin login para jugar. Robo fuerte + revancha. |
| 2 | Simplicidad técnica (vibecoding) | Stack sin OAuth complejo, sin storage de audio. |
| 3 | Conexión social por música | Trivia sobre las elecciones del creador entre amigos. |
| 4 | Inteligencia de mercado sobre gustos 16-35 | Data granular por escenario, género, origen geográfico. |
| 5 | First-party data | Base propia en Supabase. |
| 6 | Sello discreto Powered by MásAlto | Marca independiente Festival Heist. |
| 7 | Impulso a emergentes | Pool rotativo con lista curada MásAlto + registro abierto en Fase 2. |
| 8 | Artistas contratables para el interior | Data segmentada por origen + descubrimiento activo. |
| 9 | Filtro implícito de seriedad de artistas | Requisito de presencia en DSP funciona como umbral mínimo. |

---

## 4. Stack técnico

### Frontend y hosting
- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Vercel** (deploy automático desde GitHub)

### Backend y datos
- **Supabase**: PostgreSQL + Auth simple opcional. **Sin Storage de audio.**
- **Sin login obligatorio** para jugar. Handle + email opcional.

### Fuentes de datos musicales

**Para el catálogo de artistas (Escenario Principal, Nacional, Género X):**
- **MusicBrainz API** (primaria): base musical open source, sin restricciones.
- **Cover Art Archive** (imágenes asociadas).
- **Last.fm API** (enriquecimiento de géneros y popularidad).
- **Wikipedia / Wikidata** (fallback de imágenes).

**Para los previews de audio del Escenario Emergente:**
- **Deezer API** (primario): endpoint público de búsqueda por artista + título devuelve preview URL de 30s en formato MP3 directo, sin embed obligatorio.
- **YouTube IFrame API** (fallback): cuando el tema no está en Deezer, se usa reproductor embebido de YouTube para artistas que solo tienen presencia en esa plataforma.
- **Sin hosting propio de audio**: eliminado Supabase Storage para audio.
- **Créditos**: "Audio vía Deezer" en footer del reproductor (requisito de TOS de Deezer).

**Para links externos (CTAs "escuchá más"):**
- Todos los links de DSPs del artista se muestran al final de la sesión de descubrimiento: Spotify, Apple Music, YouTube, etc.

### Herramientas de desarrollo
- Cursor IDE Pro (USD 20/mes)
- Claude Sonnet 4.6 o superior (via Cursor)
- ChatGPT / Canva / Runway para assets visuales

### Costo operativo
- $0-15/mes hasta ~1000 usuarios (más barato que v3 sin storage de audio)
- $30-60/mes desde ~5000 usuarios

---

## 5. Estructura del póster y mecánica de juego

_(Sin cambios respecto de v3)_

### 5.1 Estructura de escenarios

Cada póster tiene 4 escenarios fijos, 6-7 artistas totales:

| Escenario | Cantidad | Origen del artista | Qué mide |
|---|---|---|---|
| Principal / Headliner | 1 | Internacional (superbanda) | Nivel aspiracional |
| Nacional | 2 | Argentinos consolidados | Tendencias del mercado real |
| Género X (el usuario elige el género) | 2 | Cualquier origen dentro del género | Preferencia de nicho |
| Emergente / Alternativo | 1-2 | Pool de emergentes registrados | Descubrimiento + apoyo a emergentes |

**Restricciones:**
- Solo 1 artista internacional en todo el póster (el Headliner).
- Los 2 nacionales deben ser argentinos consolidados.
- El género del Escenario Género X lo elige el usuario de una lista curada (rock, cumbia, urbano, folclore, electrónica, pop, indie, reggaetón, metal, jazz, otros).

### 5.2 Flujo del creador

1. Landing minimalista. Botón único: "Armá tu festival".
2. Handle + email opcional.
3. Elige el Headliner internacional.
4. Elige los 2 argentinos consolidados.
5. Elige el género del Escenario Género X + los 2 artistas del género.
6. Escenario Emergente: escucha fragmentos de 3 emergentes rotados. Elige 1-2.
7. 4 microdecisiones (base de la trivia).
8. Nombre del festival + tema visual.
9. Póster generado con nombres tapados en versión pública.
10. Link único + imagen descargable.

### 5.3 Flujo del desafiante

1. Abre link. Ve póster estructurado con nombres tapados.
2. Trivia por escenarios (4 preguntas, una por escenario).
3. Sesión de descubrimiento de emergentes (opcional, con audio preview).
4. Resultado + CTA de armar propio festival.

---

## 6. Sistema de "robo fuerte"

_(Sin cambios respecto de v3)_

- El póster público es dinámico.
- Estado inicial: siluetas + nombres tapados.
- Primer desafiante que acierta 3+ de 4 preguntas queda inscripto como "Descifrado por @handle".
- Cada intento posterior compite por batir el récord.
- Slots individuales acertados quedan atribuidos con nombre del desafiante que los descifró.
- Bucle de revancha entre creador y hackeador.

---

## 7. Sistema de Recomendados por MásAlto — actualizado

### 7.1 Cómo funciona

- MásAlto mantiene una **lista curada** (5-15 artistas activos).
- Vos podés incorporar o retirar artistas desde panel de administración interno.
- Ekiss forma parte de la lista sin trato preferencial dentro de ella.

### 7.2 Algoritmo de selección

En cada carga del escenario:
- **Slot 1 (Recomendado MásAlto)**: sorteo aleatorio del pool `masalto_recommended = true`.
- **Slots 2 y 3**: sorteo aleatorio del pool general.
- **Posición dentro de los 3 slots**: rotación aleatoria.

Con 5 recomendados y 50 en pool general: recomendados aparecen en ~20% de las sesiones cada uno, pool general ~4% cada uno. Ratio 5x configurable.

### 7.3 Transparencia

- Landing pública `/soy-artista` declara la existencia de la lista curada.
- Sin badge visual durante el juego: los 3 emergentes se presentan visualmente idénticos.

### 7.4 Requisitos de alta — REFORMULADO EN v3.1

Todo artista en cualquiera de los dos pools (recomendados MásAlto o registro abierto) debe cumplir:

**Requisitos de presencia digital (nuevos):**
- Al menos 1 tema publicado en cualquiera de: Spotify, Apple Music, Deezer, YouTube Music, Tidal, Amazon Music, o canal oficial de YouTube con al menos 1 tema.
- Provee link directo al tema que quiere que se incluya en la rotación de Festival Heist.
- La app extrae el preview automáticamente (Deezer API primario, YouTube embed fallback).

**Requisitos legales:**
- Autorización escrita de uso del preview público del tema en el contexto de Festival Heist.
- Declaración de titularidad de la obra (composición) y grabación, o certificación de derechos si intervino un tercero.
- Compromiso de compartir el juego en sus redes al menos una vez al mes durante los primeros 6 meses.

**Por qué el requisito de DSP funciona como filtro:**
- No es filtro de calidad musical (Spotify acepta prácticamente cualquier contenido de un distribuidor certificado).
- Es filtro implícito de **seriedad**: llegar a una DSP implica haber gestionado un distribuidor, aceptado términos legales, tener organización mínima. Elimina spam y contenido casual.
- Inclusión de YouTube como opción válida evita excluir a los más emergentes (artistas del interior, folcloristas locales, etc.) que no tienen acceso o presupuesto para distribuidores pagos.

---

## 8. Modelo de datos — Supabase (actualizado)

```
users
  id (uuid, pk)
  handle (text, unique)
  email (text, nullable)
  created_at (timestamp)

posters
  id (uuid, pk)
  user_id (fk users)
  name (text)
  theme (text)
  headliner_artist_id (text)
  national_1_artist_id (text)
  national_2_artist_id (text)
  genre_stage_genre (text)
  genre_stage_artist_1_id (text)
  genre_stage_artist_2_id (text)
  emerging_pick_1_id (uuid, fk emerging_artists)
  emerging_pick_2_id (uuid, fk emerging_artists, nullable)
  trivia_answers (jsonb)
  best_hacker_id (fk users, nullable)
  best_hacker_score (int, nullable)
  best_hacker_time_ms (int, nullable)
  share_slug (text, unique)
  created_at (timestamp)

challenges
  id (uuid, pk)
  poster_id (fk posters)
  challenger_id (fk users)
  score (int)
  time_ms (int)
  emerging_pick_id (uuid, fk emerging_artists)
  completed_at (timestamp)

emerging_artists                        -- REESTRUCTURADO en v3.1
  id (uuid, pk)
  name (text)
  image_url (text)                      -- imagen provista por el artista o de su DSP
  genre (text)
  origin (text)                         -- provincia/país
  preview_source (text)                 -- 'deezer' | 'youtube'
  preview_url (text)                    -- URL de preview MP3 (Deezer) o video ID (YouTube)
  preview_track_title (text)            -- nombre del tema en rotación
  dsp_links (jsonb)                     -- {spotify: url, apple: url, youtube: url, ...}
  masalto_recommended (bool)
  active (bool)
  display_count (int)
  pick_count (int)
  created_at (timestamp)

artist_cache
  external_id (text, pk)                -- MusicBrainz ID
  source (text)                         -- 'musicbrainz' | 'lastfm' | 'wikipedia'
  name (text)
  image_url (text)
  genres (text[])
  origin (text)
  popularity_score (int, nullable)
  cached_at (timestamp)
```

**Nota clave:** desapareció el campo `audio_url` que apuntaba a Supabase Storage. La app ya no hospeda audio propio.

---

## 9. Flujo de extracción de preview desde link del artista

Cuando un artista se da de alta y provee un link:

1. **Si el link es de Deezer directo**: se extrae track ID de la URL y se llama al endpoint `/track/{id}` de la Deezer API para obtener el preview URL. Guardado como `preview_source='deezer'`.
2. **Si el link es de Spotify, Apple Music, u otra DSP**: se extrae artista + título de la URL vía metadata. Se busca en Deezer con esos datos (`/search?q=artist:{name} track:{title}`). Si hay match con confianza alta (≥90%), se guarda ese preview. Si no, fallback.
3. **Fallback a YouTube**: si el tema no está en Deezer o el match tiene baja confianza, se pide al artista un link de YouTube. Se guarda video ID y se usa reproductor embebido de YouTube.
4. **Revisión manual**: vos ves el preview extraído en el panel de admin antes de aprobar el alta. Si no es el tema correcto, rechazás o pedís corrección.

---

## 10. Marca

- **Nombre**: Festival Heist
- **Sello**: "Powered by MásAlto" en footer y créditos del póster
- **Créditos técnicos**: "Audio vía Deezer" en el footer del reproductor de emergentes
- **Paleta**: oscura con neón. No usar paleta MasAlto.
- **Tipografía**: Anton para títulos, Inter para cuerpo.

---

## 11. Métricas del piloto

_(Sin cambios respecto de v3)_

| Métrica | Meta | Cómo se mide |
|---|---|---|
| Pósters creados | ≥50 | Filas en `posters` |
| Tasa de compartir | ≥60% | Pósters con ≥1 challenge |
| Tasa de finalización de desafío | ≥70% | Completados / iniciados |
| Tasa de conversión viral | ≥20% | Desafiantes que crean su propio póster |
| Pick rate emergentes MásAlto | ≥25% | pick_count / display_count |
| Pick rate emergentes pool general | ≥10% | Idem |
| Pósters descifrados | ≥15% | Con `best_hacker_id` no nulo |
| Diversidad de géneros | ≥5 géneros con ≥5% cada uno | Análisis de `genre_stage_genre` |

Objetivo transversal de negocio: identificar ≥3 artistas del pool emergente contratables para circuito del interior.

---

## 12. Hoja de ruta

### FASE 1 — MVP piloto (semanas 1-4)

**Semana 1 — Infraestructura**
- Crear proyecto Supabase, esquema completo (Sección 8)
- Setup Next.js 14 + Tailwind en Cursor
- Deploy inicial a Vercel con landing dummy
- **Verificar que Ekiss + los otros 2-4 emergentes iniciales tienen sus temas publicados en al menos una DSP mainstream**. Si alguno no tiene distribución digital, ese es el pre-requisito para ser parte del piloto.
- Obtener autorizaciones escritas + links a los temas específicos que van a rotar
- Configurar cliente MusicBrainz + Last.fm + Wikipedia (catálogo)
- Configurar cliente Deezer API + YouTube IFrame API (previews de emergentes)
- Poblar tabla `emerging_artists` con los primeros artistas, sus links, previews extraídos y flag `masalto_recommended` apropiado

**Semana 2 — Creación del póster**
- Flujo de creación por escenarios
- Buscadores por escenario con filtros
- Selector de género
- Diseño del póster: 3-4 templates
- Generación de share_slug + URL única

**Semana 3 — Desafío**
- Ruta `/challenge/[slug]`
- Trivia por escenarios (4 preguntas)
- Sesión de descubrimiento con reproductor de preview (Deezer directo o YouTube embed)
- Sistema de scoring y actualización dinámica del póster

**Semana 4 — Lanzamiento**
- Testing con 5-10 personas de confianza
- Panel de administración para gestionar `masalto_recommended` y aprobar/rechazar altas
- Lanzamiento controlado
- Monitoreo diario de métricas

### FASE 2 — Apertura y escala (mes 2-3, si el piloto pasa umbrales)

- Landing pública `/soy-artista` con formulario simplificado:
  - Datos del artista (nombre, género, origen, contacto)
  - Link al tema en cualquier DSP → sistema extrae preview automático
  - Aceptación de términos y autorizaciones
- Sistema de revisión manual: aprobar/rechazar
- Sistema de shadow removal automático (artistas con 0% pick rate después de N impresiones bajan de rotación)
- Comunicación pública del proyecto en circuito de artistas emergentes

### FASE 3 — Monetización (mes 4+, condicionada a volumen)

- Sponsors en Escenario Principal
- Reportes de inteligencia de mercado
- Integración con circuito de shows del interior de MásAlto

---

## 13. Riesgos y mitigaciones (actualizados)

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| MusicBrainz tiene cobertura débil de artistas argentinos | Media | Precarga manual de ~200 artistas argentinos consolidados en cache. Fallback a Wikipedia. |
| Sesgo hacia géneros populares en Escenario Género X | Alta | Es feature, no bug. Refleja mercado real. |
| Fricción alta en creación (7 pasos) | Media | Objetivo completion rate ≥70%. Si cae, reducir a 3 escenarios. |
| **Deezer deprecara preview URLs** (nuevo, similar a Spotify) | Media | Fallback ya integrado a YouTube embed. Diversificación real de fuentes. |
| **Preview de Deezer no coincide con el tema del artista** (nuevo) | Media | Revisión manual del preview extraído antes de aprobar cada alta. El artista puede pedir corrección. |
| **Artista solo está en YouTube y el embed rompe la estética del juego** (nuevo) | Baja | Estilo de reproductor YouTube minimizado; se compensa con la posibilidad de que existan artistas emergentes en primer lugar. |
| Los emergentes MásAlto rechazan estar en la misma lista que otros | Baja | Comunicación clara: 5x más exposición que pool general. |
| Costos Vercel/Supabase | Baja-media | Alertas al 70% del free tier. Cache agresivo. Sin storage de audio reduce costos. |
| **Requisito de DSP excluye a los más emergentes** (nuevo) | Media | Inclusión de YouTube como opción válida — cualquier artista con celular puede publicar sin costo. |
| Baja participación en registro abierto (Fase 2) | Media | Buscar activamente en tu red. No esperar demanda espontánea. |
| Uso de imágenes de artistas internacionales sin licencia | Media | MusicBrainz/Cover Art Archive tienen imágenes con licencia de uso. Fallback a imagen genérica de género. |

---

## 14. Qué queda fuera del MVP

- Login con Spotify o cualquier plataforma
- Modo trivia con ranking global (v2 post-validación)
- Comentarios/chat
- Monetización activa (Fase 3)
- App móvil nativa (PWA responsive)
- Múltiples idiomas
- Modo colaborativo
- Landing pública de registro (Fase 2)
- Hosting propio de audio (deliberadamente eliminado en v3.1)

---

## 15. Próximos pasos operativos

1. **Verificar presencia en DSP de los emergentes iniciales**: Ekiss y los otros 2-4 que se sumen deben tener al menos 1 tema publicado en alguna DSP. Si Ekiss no tiene distribución digital, es tarea previa a Semana 1.
2. **Definir los 3-5 emergentes iniciales** con diversidad de géneros y compromiso de difusión.
3. **Obtener autorizaciones escritas** de todos: uso del preview público + titularidad + compromiso de compartir el juego.
4. **Recolectar los links a los temas específicos** que van a rotar en Festival Heist (uno por artista para el piloto).
5. **Configurar cuentas de desarrollador**:
   - MusicBrainz (identificar app con user-agent apropiado)
   - Last.fm Developer (API key)
   - Deezer no requiere autenticación para preview URLs públicos
6. **Definir la lista inicial de "Recomendados MásAlto"**: qué artistas del piloto entran a esa lista y cuáles quedan en pool general para tener contraste desde el arranque.
7. **Preparar assets visuales**: logos, templates de póster, paleta.
8. **Iniciar Semana 1 del roadmap**.

---

**Fin del documento v3.1.**

_Este documento reemplaza al v3. Cualquier decisión que se desvíe de lo aquí establecido debe ser revisada explícitamente antes de codear._
