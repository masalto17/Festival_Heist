# Festival Heist - Checklist QA estetica

Fecha: 2026-09-16  
Uso: revisar cada entrega visual antes de reportarla como lista.

## 1. Comparacion contra referencias

- [ ] La pantalla se parece mas a `festival-heist-direccion-principal-D.png` que a los mockups historicos.
- [ ] Los componentes de desafio se parecen a `festival-heist-componentes-desafio-B.png` sin cambiar el universo general.
- [ ] Se reconoce el mundo backstage: cajas, poster, papel, cinta, textura o equivalentes visuales.
- [ ] La estetica no se fue hacia neon limpio/generico.
- [ ] La estetica no se fue hacia SaaS, dashboard o corporate premium.

## 2. Mobile-first

- [ ] La accion principal se entiende en 5 segundos en mobile.
- [ ] Los textos no se pisan ni salen de sus contenedores.
- [ ] Los botones tienen altura tactil suficiente.
- [ ] La pantalla no depende de hover para entenderse.
- [ ] El scroll, si existe, se siente intencional y no accidental.

## 3. Marca y tono

- [ ] Festival Heist es protagonista.
- [ ] MasAlto, si aparece, queda discreto.
- [ ] El lenguaje es argentino, simple y directo.
- [ ] No hay tono de formulario de investigacion.
- [ ] No hay promesas comerciales no validadas.

## 4. Paleta

- [ ] Negro y papel sucio son la base.
- [ ] Magenta se usa para marca/energia/accion principal.
- [ ] Lima se usa para avance/confirmacion/llamado rapido.
- [ ] Cian se usa como acento secundario o informativo.
- [ ] Naranja se reserva para desafio, tension o revancha.
- [ ] No domina una paleta violeta generica ni un gradiente de moda.

## 5. Crear festival

- [ ] `Abre`, `Rompe` y `Cierra` son claros.
- [ ] Las elecciones parecen parte de un festival, no campos de formulario.
- [ ] Hay progreso simple.
- [ ] La UI invita a terminar rapido.

## 6. Emergentes

- [ ] Hay tres opciones equivalentes si corresponde.
- [ ] Ningun emergente aparece privilegiado por diseño sin explicacion.
- [ ] No hay sponsor mezclado con curaduria.
- [ ] No se prometen reproducciones, fama, ventas ni demanda.
- [ ] El mensaje apoya descubrimiento cultural.

## 7. Poster

- [ ] El poster es visualmente atractivo por si solo.
- [ ] Puede funcionar como imagen compartible.
- [ ] No parece una captura de formulario.
- [ ] Hay version completa y version con slots ocultos si corresponde.
- [ ] El titulo Festival Heist queda dominante.

## 8. Desafio

- [ ] Se entiende que hay que adivinar el poster.
- [ ] El score o progreso es visible.
- [ ] Las pistas parecen tarjetas fisicas o piezas del juego.
- [ ] Hay CTA de revancha o continuidad social.
- [ ] `Crea el tuyo` queda visible al final del bucle.
- [ ] No se transforma en trivia externa sobre artistas reales.

## 9. Sponsor

- [ ] Cualquier placement patrocinado dice `Patrocinado`.
- [ ] El sponsor no reemplaza ni contamina la eleccion artistica.
- [ ] El sponsor no domina la paleta del producto.
- [ ] Existe fallback si la pieza falla.

## 10. Validacion tecnica minima

- [ ] `npm run typecheck` pasa.
- [ ] `npm run lint` pasa o se documenta por que no pudo correrse.
- [ ] Se reviso mobile aproximado 390x844.
- [ ] Se reviso desktop.
- [ ] Se comparo visualmente contra las dos referencias aprobadas.

