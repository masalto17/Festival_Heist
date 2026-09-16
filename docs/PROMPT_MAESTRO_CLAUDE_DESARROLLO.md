# Prompt maestro para Claude - Desarrollo Festival Heist

Usar este prompt para iniciar el desarrollo con Claude desde este punto del proyecto.

```text
Vas a continuar el desarrollo de Festival Heist. A partir de ahora vos quedas a cargo de todo el desarrollo tecnico e implementacion. Codex queda a cargo de supervision, control y planificacion.

No asumas contexto externo, memoria previa ni decisiones no documentadas. Todo debe salir de los archivos locales indicados abajo.

CARPETA LOCAL / REPOSITORIO

El proyecto esta en esta carpeta local:

/Users/hdb/Developer/Festival Heist

Trabaja dentro de esa carpeta. Tratala como el repositorio local principal del proyecto.

Antes de tocar codigo, ubicacionate ahi y verifica el estado actual del repo. No borres, reviertas ni sobrescribas cambios existentes sin autorizacion explicita.

FUENTES QUE TENES QUE LEER PRIMERO

Lee estos archivos locales dentro del repo, en este orden:

1. /Users/hdb/Developer/Festival Heist/docs/MVP_ACTUALIZADO.md
2. /Users/hdb/Developer/Festival Heist/docs/GOBIERNO_PROYECTO_CODEX_CLAUDE.md
3. /Users/hdb/Developer/Festival Heist/docs/LINEAMIENTO_ESTETICO_BASE.md
4. /Users/hdb/Developer/Festival Heist/docs/HANDOFF_IMPLEMENTACION_ESTETICA_CLAUDE.md
5. /Users/hdb/Developer/Festival Heist/docs/CHECKLIST_QA_ESTETICA.md
6. /Users/hdb/Developer/Festival Heist/docs/CHECKLIST_PREPILOTO.md
7. /Users/hdb/Developer/Festival Heist/CLAUDE.md
8. /Users/hdb/Developer/Festival Heist/README-DEV.md
9. /Users/hdb/Developer/Festival Heist/README.md
10. /Users/hdb/Developer/Festival Heist/FUENTES.md

Usa /Users/hdb/Developer/Festival Heist/Festival_Heist_Especificacion_v3_1.md solo como referencia historica. Si contradice docs/MVP_ACTUALIZADO.md, manda docs/MVP_ACTUALIZADO.md.

REFERENCIAS VISUALES OBLIGATORIAS

Estas imagenes estan dentro del repositorio local y son obligatorias:

1. Direccion principal de producto:
/Users/hdb/Developer/Festival Heist/entregables/assets/estetica/festival-heist-direccion-principal-D.png

2. Componentes para desafio:
/Users/hdb/Developer/Festival Heist/entregables/assets/estetica/festival-heist-componentes-desafio-B.png

La referencia D define el mundo visual general: backstage punk pulido.
La referencia B se usa solo para componentes del desafio: pistas, score, slots ocultos, robar el festival, revancha y crea el tuyo.

No uses como direccion principal los mockups viejos de:

/Users/hdb/Developer/Festival Heist/entregables/assets/mockups/

Esos son historicos o secundarios. Solo podrian consultarse si necesitas entender contexto previo, pero no mandan sobre D+B.

ANTES DE PROGRAMAR

Primero responde con un plan breve y concreto que incluya:

1. archivos de instrucciones que leiste efectivamente;
2. archivos de codigo que vas a tocar;
3. archivos/carpetas que quedan fuera de alcance;
4. etapa que vas a implementar;
5. criterio de aceptacion;
6. validaciones que vas a correr;
7. riesgos o dudas antes de avanzar.

No empieces a programar si no pudiste leer alguno de los archivos obligatorios o si no pudiste acceder a las dos imagenes D+B.

DONDE CONTINUAR LOS CAMBIOS

Codigo del producto:

- app/**/*.tsx
- components/**/*
- lib/**/*
- app/api/**/*
- data/*.json
- app/globals.css
- tailwind.config.ts

Migraciones / base de datos:

- supabase/migrations/**/*
- supabase/seed.sql

Documentacion tecnica derivada de cambios:

- README-DEV.md
- docs/*.md, solo cuando el cambio lo requiera

Assets visuales nuevos:

- Si son referencias, guardalos en:
  /Users/hdb/Developer/Festival Heist/entregables/assets/estetica/

- Si son assets que la app usara en runtime, proponelo antes y guardalos preferentemente en una carpeta apropiada del proyecto, por ejemplo:
  /Users/hdb/Developer/Festival Heist/public/
  o una subcarpeta acordada.

No guardes assets finales solo en carpetas temporales ni fuera del repo si la app debe usarlos.

QUE NO TOCAR SIN AUTORIZACION

No modifiques sin aprobacion explicita:

- PDFs y PPTX de entregables comerciales;
- documentos comerciales o de claims si la tarea no lo requiere;
- FUENTES.md salvo que la tarea sea de fuentes/claims;
- Festival_Heist_Especificacion_v3_1.md salvo correccion documental aprobada;
- imagenes D+B aprobadas;
- archivos fuera de /Users/hdb/Developer/Festival Heist;
- configuraciones de deploy, produccion o cuentas externas.

No publiques, no deployes, no conectes cuentas externas, no hagas push remoto, no crees PR y no instales servicios pagos sin aprobacion.

REGLAS NO NEGOCIABLES DEL MVP

- Mobile-first.
- Sin login obligatorio para jugar.
- Sin Spotify OAuth.
- Sin Spotify Web API.
- Sin usar datos reales de escucha.
- Sin trivia externa sobre artistas.
- Sin artistas reales no autorizados.
- Emergentes con trato visual equivalente.
- Ekiss puede estar en pool autorizado, pero sin privilegio invisible.
- Sponsor siempre con disclosure Patrocinado.
- Sponsor separado de curaduria artistica.
- MasAlto como respaldo discreto.
- Festival Heist como marca principal.
- Poster como recompensa visual central.
- Desafio como juego social basado en elecciones del creador.
- No prometer viralidad, streams, seguidores, ventas, sponsors o demanda real.

LINEAMIENTO ESTETICO A IMPLEMENTAR

Implementar Backstage punk pulido:

- negro + papel sucio como base;
- magenta y lima como acentos principales;
- cian como acento secundario;
- naranja reservado para desafio/revancha/tension;
- cajas de gira, cinta, papel roto, poster, marcador, grano/fotocopia, luces de escenario;
- caos visual controlado;
- UI clara, tactil y legible en telefono.

No llevar la UI hacia:

- neon generico;
- SaaS/corporativo;
- dashboard como pantalla principal;
- glassmorphism limpio;
- app de streaming;
- cyberpunk/hacking;
- casino/apuestas;
- terror/metal ilegible;
- cartoon infantil.

ETAPAS SUGERIDAS

Trabaja por etapas chicas. No mezcles etapas sin reportarlo antes.

Etapa A - Base visual y componentes:

- actualizar tokens en tailwind.config.ts;
- ajustar app/globals.css;
- crear componentes comunes si corresponde;
- preparar base visual D+B.

Etapa B - Landing / inicio:

- implementar primera pantalla mobile-first;
- expresar la referencia D desde el primer viewport;
- CTA claro Arma tu festival.

Etapa C - Crear festival:

- roles Abre, Rompe, Cierra;
- progreso simple;
- eleccion rapida.

Etapa D - Emergentes:

- tres tarjetas equivalentes;
- mensaje cultural;
- sin privilegios visuales invisibles.

Etapa E - Poster:

- poster completo;
- poster con slots ocultos;
- recompensa visual compartible.

Etapa F - Desafio:

- componentes tomados de B;
- pistas, score, revancha, crea el tuyo;
- sin trivia externa.

Etapa G - Eventos / exportacion:

- eventos obligatorios;
- append-only;
- exportacion CSV o equivalente.

Etapa H - Sponsor:

- placement patrocinado;
- disclosure;
- fallback.

VALIDACION OBLIGATORIA

Al terminar una etapa, corre o reporta:

- npm run typecheck
- npm run lint, si esta disponible
- revision mobile aproximada 390x844
- revision desktop
- comparacion visual contra:
  /Users/hdb/Developer/Festival Heist/entregables/assets/estetica/festival-heist-direccion-principal-D.png
  /Users/hdb/Developer/Festival Heist/entregables/assets/estetica/festival-heist-componentes-desafio-B.png
- checklist:
  /Users/hdb/Developer/Festival Heist/docs/CHECKLIST_QA_ESTETICA.md

Si algo compila pero no respeta la direccion visual aprobada, no lo declares terminado.

REPORTE FINAL DE CADA TAREA

Al finalizar, reporta:

1. resumen de lo hecho;
2. archivos modificados;
3. archivos de instrucciones usados;
4. validaciones corridas y resultado;
5. estado contra checklist estetica;
6. estado contra checklist prepiloto si aplica;
7. pendientes;
8. riesgos;
9. decisiones que requieren aprobacion.

CONDICIONES PARA FRENAR

Frena y pregunta antes de seguir si:

- no podes leer una fuente obligatoria;
- no podes ver/acceder a las referencias D+B;
- una instruccion contradice docs/MVP_ACTUALIZADO.md;
- una instruccion visual contradice docs/LINEAMIENTO_ESTETICO_BASE.md;
- necesitas cambiar alcance de etapa;
- necesitas usar integraciones externas fuera del MVP;
- necesitas publicar, deployar, pushear remoto o conectar cuentas;
- necesitas tocar archivos comerciales/PDF/PPTX;
- necesitas usar artistas reales no autorizados;
- necesitas mezclar sponsor con curaduria artistica.
```

