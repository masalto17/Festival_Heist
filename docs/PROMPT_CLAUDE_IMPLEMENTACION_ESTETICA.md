# Prompt para Claude - Implementacion estetica Festival Heist

Usar este prompt al iniciar una tarea de implementacion visual o de UI.

```text
Necesito que implementes la interfaz de Festival Heist respetando con maxima exactitud la direccion estetica aprobada.

Antes de tocar codigo, lee en este orden:

1. docs/MVP_ACTUALIZADO.md
2. docs/GOBIERNO_PROYECTO_CODEX_CLAUDE.md
3. docs/LINEAMIENTO_ESTETICO_BASE.md
4. docs/HANDOFF_IMPLEMENTACION_ESTETICA_CLAUDE.md
5. docs/CHECKLIST_QA_ESTETICA.md
6. CLAUDE.md

Referencias visuales obligatorias:

- Direccion principal: entregables/assets/estetica/festival-heist-direccion-principal-D.png
- Componentes desafio: entregables/assets/estetica/festival-heist-componentes-desafio-B.png

La direccion principal es Backstage punk pulido. La opcion D manda sobre todo el producto. La opcion B solo se usa para componentes del desafio: pistas, score, slots ocultos, robar el festival, revancha y crea el tuyo.

No redisenes libremente la identidad. No lleves la UI hacia neon generico, SaaS, dashboard corporativo, glassmorphism limpio, cyberpunk/hacking, casino/apuestas ni app de streaming.

Primero entregame un plan corto de implementacion indicando:

- que archivos leiste efectivamente;
- que pantallas o componentes vas a tocar;
- que archivos de codigo vas a tocar;
- que archivos quedan fuera de alcance;
- como vas a traducir la estetica D+B a codigo;
- que tokens visuales vas a usar;
- como vas a validar mobile;
- que queda fuera de esta etapa.

Despues implementa por etapas chicas y verificables:

1. tokens visuales y base global;
2. componentes reutilizables;
3. landing / inicio;
4. crear festival;
5. emergentes;
6. poster;
7. desafio.

En cada etapa, compara contra docs/CHECKLIST_QA_ESTETICA.md. Si compila pero no se parece a la direccion aprobada, no lo reportes como terminado.

Reglas no negociables:

- Festival Heist es la marca principal.
- MasAlto queda como respaldo discreto.
- Mobile-first.
- Sin Spotify OAuth ni Web API.
- Sin artistas reales no autorizados.
- Sin sponsor mezclado con curaduria.
- Sponsor siempre con disclosure Patrocinado.
- Emergentes con trato visual equivalente.
- Poster como recompensa visual central.
- Desafio como juego social, no trivia externa.

Al finalizar, reporta:

- archivos modificados;
- captura o descripcion de validacion visual;
- comandos corridos;
- puntos de la checklist que quedan pendientes.
```
