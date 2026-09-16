# Festival Heist - Handoff de implementacion estetica para Claude

Fecha: 2026-09-16  
Objetivo: implementar el MVP evitando desfases entre la direccion visual aprobada y el codigo.

## 1. Fuentes obligatorias

Antes de modificar UI, leer en este orden:

1. `docs/MVP_ACTUALIZADO.md`
2. `docs/GOBIERNO_PROYECTO_CODEX_CLAUDE.md`
3. `docs/LINEAMIENTO_ESTETICO_BASE.md`
4. este documento
5. `docs/CHECKLIST_QA_ESTETICA.md`
6. `CLAUDE.md`

Antes de programar, Claude debe declarar en su respuesta de trabajo:

- archivos de instrucciones efectivamente leidos;
- archivos que va a tocar;
- archivos que no va a tocar;
- criterio de aceptacion;
- validaciones que correra.

Imagenes de referencia:

- Direccion principal: `entregables/assets/estetica/festival-heist-direccion-principal-D.png`
- Componentes desafio: `entregables/assets/estetica/festival-heist-componentes-desafio-B.png`

La referencia D manda sobre el mundo visual general. La referencia B solo manda sobre pistas, puntaje, slots ocultos, revancha y desafio.

## 2. Regla central

No interpretar la estetica como "neon generico". Implementar **backstage punk pulido**:

- cajas de gira;
- poster fisico;
- papel roto;
- cinta;
- marcador;
- grano/fotocopia;
- luces de escenario;
- caos controlado;
- UI mobile clara.

La textura es atmosfera. La interaccion debe seguir siendo legible y rapida.

## 3. Traduccion a codigo

### Tokens visuales

Usar estos valores como base en Tailwind/CSS:

```text
bg                 #08080A
case               #111114
paper              #F2EDE4
paper-aged          #D8CDBB
magenta             #FF1F8A
lime                #C8FF2E
cyan                #25D7FF
challenge-orange    #FF6A2A
metal               #5B5B62
muted               #8A8A8A
```

Si ya existen nombres parecidos en `tailwind.config.ts`, actualizarlos sin romper compatibilidad o agregar alias.

### Tipografia

Mantener:

- `Anton` para marca, titulares y botones de alto impacto.
- `Inter` para textos, instrucciones y opciones.

No agregar tipografias nuevas en la primera implementacion salvo aprobacion. El efecto de poster debe resolverse con composicion, textura, casing y color, no con una fuente ilegible.

### Componentes recomendados

Crear componentes reutilizables para no deformar la estetica pantalla por pantalla:

- `BrandLogo` o bloque equivalente: texto Festival Heist con jerarquia fuerte.
- `PunkButton`: CTA magenta/lima/cian/naranja segun rol.
- `PaperCard`: tarjeta de papel/fotocopia para opciones y pistas.
- `TapeLabel`: etiqueta tipo cinta para estados breves.
- `RoleCard`: `Abre`, `Rompe`, `Cierra`.
- `EmergingArtistCard`: tres opciones equivalentes.
- `PosterPreview`: poster compartible y version con slots ocultos.
- `ChallengeCard`: pregunta, pista, opciones, score y revancha.
- `SponsorPlacement`: pieza con disclosure visible `Patrocinado`.

No hace falta crear una libreria pesada. Si el alcance de la etapa es chico, pueden vivir en `components/` con CSS/Tailwind claro.

## 4. Pantallas a implementar visualmente

### Inicio

Debe comunicar en 5 segundos:

- marca Festival Heist;
- armar festival;
- poster/desafio como promesa;
- energia backstage.

Debe incluir:

- fondo oscuro con textura o capas posterizadas;
- CTA `Arma tu festival`;
- MasAlto solo como respaldo discreto si aparece.

No debe parecer:

- landing SaaS;
- dashboard;
- pagina corporativa;
- app de streaming.

### Crear festival

Flujo mobile-first. Tres roles principales:

- `Abre`
- `Rompe`
- `Cierra`

Cada rol debe sentirse como una tarjeta/pase/pieza fisica. Evitar formularios planos.

### Emergentes

Tres tarjetas visualmente equivalentes. Si se muestra Ekiss u otro recomendado, no debe tener ventaja visual invisible.

Usar frases de apoyo cultural, por ejemplo:

- `Sumalo al lineup`
- `Nuevos sonidos, grandes historias`
- `Mas escenarios para mas artistas`

### Poster listo

Debe ser la recompensa central. Visualmente debe sentirse como afiche compartible, no como resumen de formulario.

Debe contemplar dos estados:

- poster completo para el creador;
- poster oculto para desafio.

### Desafio

Tomar de la referencia B:

- `Adivina el poster`
- score tipo `3/4`
- tarjetas de pista;
- siluetas o slots ocultos;
- `Roba el festival`
- `Revancha`
- `Crea el tuyo`
- naranja para tension de juego.

No convertirlo en trivia sobre artistas reales. El desafio nace de las elecciones del creador.

## 5. Reglas para evitar desfases

Antes de crear una pantalla nueva, verificar:

1. ¿Se ve como backstage/papel/cinta/poster, o como app generica?
2. ¿La accion principal se entiende en mobile?
3. ¿El color dominante sigue siendo negro + papel + magenta/lima?
4. ¿El naranja aparece solo cuando hay desafio/tension?
5. ¿Los emergentes tienen trato equivalente?
6. ¿El sponsor, si existe, tiene disclosure?
7. ¿No se copiaron marcas, artistas reales o plataformas?
8. ¿No se prometen resultados comerciales no validados?

Si una pantalla no cumple, corregir antes de avanzar.

## 6. Implementacion sugerida por etapas

### Etapa A - Base visual

- Ajustar `tailwind.config.ts` con tokens aprobados.
- Crear utilidades globales para fondo, textura y tarjetas.
- Implementar `BrandLogo`, botones y tarjetas base.
- Actualizar landing actual.

### Etapa B - Flujo crear

- Implementar roles `Abre`, `Rompe`, `Cierra`.
- Agregar progreso simple.
- Agregar cards de emergentes equivalentes.
- Generar primer `PosterPreview`.

### Etapa C - Desafio

- Implementar poster oculto.
- Implementar preguntas derivadas de elecciones.
- Agregar pistas, score, revancha y CTA `Crea el tuyo`.
- Validar que se entienda sin explicacion externa.

### Etapa D - Sponsor y medicion

- Agregar placement patrocinado con disclosure.
- Mantener sponsor separado de curaduria artistica.
- Verificar eventos obligatorios del MVP.

## 7. Validacion visual minima

Antes de reportar una etapa como terminada:

- correr `npm run typecheck`;
- correr `npm run lint` si esta disponible;
- revisar en viewport mobile aproximado 390x844;
- revisar en desktop angosto y ancho;
- comparar visualmente contra D y B;
- pasar `docs/CHECKLIST_QA_ESTETICA.md`.

Si solo compila pero no se parece a la direccion aprobada, no esta terminado.

## 8. Criterio de aceptacion

La implementacion es aceptable si:

1. La primera pantalla ya expresa la opcion D.
2. El desafio toma componentes de B sin cambiar el mundo visual.
3. El usuario entiende crear, compartir, adivinar y revancha.
4. El poster se siente como recompensa central.
5. Emergentes y sponsor respetan limites de producto.
6. La UI es usable en telefono.

## 9. Prohibiciones explicitas

No implementar:

- glassmorphism limpio como estetica principal;
- gradientes violetas genericos;
- look SaaS/corporativo;
- dashboard como experiencia inicial;
- UI inspirada en Spotify;
- iconografia de hacking real;
- estetica casino/apuestas;
- artistas reales no autorizados en mockups;
- logo MasAlto protagonista;
- claims de viralidad, ventas, streams o demanda real.
