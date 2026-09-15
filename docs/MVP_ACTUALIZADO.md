# Festival Heist - MVP actualizado

Fecha: 2026-09-15  
Estado: lineamiento para desarrollo local y posterior implementacion por Claude.

## 1. Decisiones incorporadas

Este documento incorpora lo necesario de:

- especificacion `Festival_Heist_Especificacion_v3_1.md`;
- auditoria CEO para productoras;
- informe comercial y de monetizacion;
- presentaciones aprobadas para productoras y aliados comerciales;
- criterio de seguridad comercial: no afirmar resultados no validados.

Si existe contradiccion, este documento tiene prioridad para construir el MVP.

## 2. Alcance del primer MVP

El MVP debe ser una experiencia web simple y mobile-first:

1. El usuario arma un festival propio.
2. Elige tres artistas favoritos o roles equivalentes: abrir, momento fuerte y cierre.
3. Elige un artista emergente autorizado desde un pool curado.
4. Responde tres microdecisiones personales que permiten crear un desafio.
5. Genera un poster compartible.
6. Comparte un link.
7. Un amigo abre el desafio, intenta adivinar elecciones y puede crear su propio festival.

El flujo debe priorizar velocidad, claridad y compartibilidad sobre complejidad de catalogo.

## 3. Fuera del MVP inicial

No incluir en el primer MVP:

- login obligatorio;
- Spotify OAuth o lectura de artistas favoritos reales;
- Spotify Web API como mecanica de juego;
- trivia externa sobre artistas;
- inferencia automatica de demanda de shows;
- pagos, marketplace o autoservicio comercial;
- recomendacion algoritimica opaca;
- promesas de resultados comerciales.

Spotify, Apple Music, YouTube u otras plataformas pueden aparecer solo como enlaces externos de salida si el artista los provee y autoriza.

## 4. Artistas emergentes

El pool emergente debe empezar pequeno y controlado.

Requisitos minimos por artista:

- nombre artistico;
- genero;
- provincia o territorio;
- imagen oficial;
- link oficial a una plataforma o canal;
- autorizacion escrita para aparecer en Festival Heist;
- tema o contenido recomendado;
- aprobacion interna de MasAlto.

Ekiss puede formar parte del pool recomendado, pero no debe tener insercion forzada ni privilegio invisible. Si existe una lista curada MasAlto, debe ser transparente en `/soy-artista` o una pagina equivalente.

## 5. Modelo de datos minimo

Entidades de producto:

```text
sessions(id, created_at, source, device, region_declared)
posters(id, session_id, handle, name, theme, share_slug, choices_json, created_at)
challenges(id, poster_id, session_id, score, completed_at, created_own_poster)
emerging_artists(id, name, genre, origin, image_url, official_links_json, authorized, masalto_recommended, active)
artist_exposures(id, session_id, artist_id, surface, event_name, created_at)
```

Entidades comerciales desde el inicio, aunque sean simples:

```text
partners(id, name, category, contact, status)
campaigns(id, partner_id, name, objective, starts_at, ends_at, status)
placements(id, campaign_id, surface, frequency_cap, disclosure, active)
campaign_assets(id, placement_id, asset_url, destination_url, utm_json, approved_at)
campaign_events(id, campaign_id, placement_id, session_id, event_name, metadata, created_at)
consents(id, session_or_user_id, purpose, granted, created_at)
```

Los eventos deben ser append-only. Evitar datos personales dentro de `metadata`.

## 6. Eventos obligatorios

Producto:

- `session_started`
- `poster_started`
- `poster_completed`
- `share_clicked`
- `shared_link_opened`
- `challenge_started`
- `challenge_completed`
- `new_poster_from_challenge`

Emergentes:

- `artist_impression`
- `artist_opened`
- `artist_picked`
- `artist_link_clicked`

Comercial:

- `sponsor_impression`
- `sponsor_click`
- `sponsor_activation_completed`

La impresion visible debe documentarse como minimo 50% de la pieza visible durante un segundo, o criterio equivalente implementado.

## 7. Sponsor y monetizacion en MVP

El MVP debe soportar una activacion patrocinada limitada sin invadir la experiencia.

Debe incluir:

- un placement identificable como patrocinado;
- frecuencia maxima por sesion;
- variante sin sponsor como control;
- link de destino con UTM;
- reporte CSV por campana;
- estado de aprobacion de asset;
- fallback si el asset falla.

No debe incluir:

- pay-to-play artistico;
- sponsors mezclados silenciosamente con curaduria;
- promesas de conversion, ventas o reproducciones.

## 8. Admin minimo

Debe existir una forma interna de:

- activar/desactivar artistas emergentes;
- marcar artistas como recomendados MasAlto;
- cargar links oficiales;
- aprobar assets comerciales;
- activar/desactivar campanas;
- exportar eventos.

Puede ser una interfaz simple o seed/config local durante la primera etapa, siempre que quede documentado.

## 9. Diseno y experiencia

La experiencia debe sentirse como entretenimiento cultural, no como formulario de investigacion.

Lineamientos:

- mobile-first;
- primer CTA claro;
- poster visual como recompensa central;
- lenguaje simple y argentino;
- MasAlto como respaldo discreto;
- Festival Heist como marca propia;
- mockups actuales como referencia visual, no como implementacion literal obligatoria.

Archivos visuales de referencia:

- `entregables/assets/mockups/mockup-crear-festival.png`
- `entregables/assets/mockups/mockup-desafio-social.png`
- `entregables/assets/mockups/mockup-panel-aliado.png`

## 10. Medicion y reporte

El reporte del piloto debe separar:

- visitantes;
- creadores;
- posters terminados;
- shares reales;
- aperturas de links compartidos;
- desafios iniciados y completados;
- nuevos posters originados por desafio;
- exposiciones de artistas;
- elecciones de artistas;
- clicks externos;
- impresiones e interacciones de sponsor.

Toda metrica debe mostrar numerador y denominador.

## 11. Responsabilidades de agentes

Claude:

- desarrollo de codigo;
- arquitectura tecnica;
- tests;
- integracion local;
- documentacion tecnica de instalacion y ejecucion.

Codex:

- coordinacion general;
- lineamiento estetico;
- coherencia de producto y negocio;
- auditoria de fuentes;
- control de claims comerciales;
- preparacion de presentaciones y materiales.

## 12. Criterio de listo para piloto

El MVP esta listo para un piloto cerrado cuando:

- se puede crear y compartir un poster desde telefono;
- un desafiante puede jugar sin login;
- se registran eventos obligatorios;
- hay al menos tres artistas emergentes autorizados;
- un sponsor de prueba puede visualizarse y medirse sin romper la experiencia;
- existe exportacion de datos;
- privacidad, terminos y autorizaciones fueron revisados.

No esta listo para presentarse como negocio probado hasta tener evidencia real de uso, costos, conversiones, repeticion y feedback de usuarios.
