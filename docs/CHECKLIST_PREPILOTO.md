# Festival Heist - Checklist prepiloto

Fecha: 2026-09-15  
Estado: informacion necesaria antes de abrir el MVP a usuarios reales.

## 1. Decisiones de producto

- [ ] Confirmar nombre publico final: Festival Heist.
- [ ] Confirmar dominio o URL temporal.
- [ ] Definir si el piloto es cerrado, por invitacion o publico acotado.
- [ ] Definir duracion del primer piloto.
- [ ] Definir responsable de aprobar cambios de alcance.
- [ ] Definir si la activacion sponsor queda desactivada, simulada o real.

## 2. Artistas emergentes

Minimo para salir a piloto cerrado: tres artistas autorizados.

Por cada artista:

- [ ] Nombre artistico.
- [ ] Genero.
- [ ] Provincia o territorio.
- [ ] Imagen oficial aprobada.
- [ ] Link oficial principal.
- [ ] Links opcionales a Spotify, Apple Music, YouTube, Instagram u otros.
- [ ] Tema o contenido recomendado, si aplica.
- [ ] Autorizacion escrita para aparecer en Festival Heist.
- [ ] Confirmacion de titularidad o permiso sobre imagen/material entregado.
- [ ] Estado `active`.
- [ ] Estado `masalto_recommended`, si corresponde.

Notas:

- Ekiss puede estar en el pool, pero no debe insertarse de forma forzada.
- La eleccion de emergentes debe poder omitirse si el usuario no quiere elegir.
- No medir una eleccion ludica como demanda real de show.

## 3. Assets

- [ ] Logo/activo autorizado de MasAlto.
- [ ] Identidad basica de Festival Heist.
- [ ] Imagen por cada artista emergente.
- [ ] Placeholder generico si una imagen falla.
- [ ] Templates o estilos de poster.
- [ ] Mockups de referencia revisados.
- [ ] Asset de sponsor, solo si hay sponsor real o simulado.

Activos existentes:

- `entregables/assets/brand/MasAlto_Negativo_Fondo_Oscuro.png`
- `entregables/assets/mockups/mockup-crear-festival.png`
- `entregables/assets/mockups/mockup-desafio-social.png`
- `entregables/assets/mockups/mockup-panel-aliado.png`

## 4. Legal, privacidad y consentimiento

- [ ] Terminos de uso revisados.
- [ ] Politica de privacidad revisada.
- [ ] Consentimiento separado para comunicaciones.
- [ ] Consentimiento o base permitida para analitica agregada.
- [ ] Retencion de datos definida.
- [ ] Proceso de baja/opt-out definido.
- [ ] Reglas de premios revisadas si hay incentivos.
- [ ] Uso de imagen/audio/nombre de artistas autorizado por escrito.

## 5. Medicion obligatoria

Producto:

- [ ] `session_started`
- [ ] `poster_started`
- [ ] `poster_completed`
- [ ] `share_clicked`
- [ ] `shared_link_opened`
- [ ] `challenge_started`
- [ ] `challenge_completed`
- [ ] `new_poster_from_challenge`

Emergentes:

- [ ] `artist_impression`
- [ ] `artist_opened`
- [ ] `artist_picked`
- [ ] `artist_link_clicked`

Sponsor:

- [ ] `sponsor_impression`
- [ ] `sponsor_click`
- [ ] `sponsor_activation_completed`

Reglas:

- [ ] Cada metrica se reporta con numerador y denominador.
- [ ] Las impresiones visibles tienen criterio documentado.
- [ ] Los eventos son append-only.
- [ ] `metadata` no guarda datos personales crudos.
- [ ] Hay exportacion CSV o equivalente.

## 6. QA antes de mostrar

- [ ] Crear poster desde telefono.
- [ ] Compartir link.
- [ ] Abrir desafio desde otro dispositivo o navegador.
- [ ] Completar desafio sin login.
- [ ] Crear nuevo poster desde desafio.
- [ ] Verificar que el poster se ve bien en mobile.
- [ ] Verificar que no hay textos cortados ni solapados.
- [ ] Verificar que el sponsor no bloquea el flujo, si existe.
- [ ] Verificar que los links externos abren correctamente.
- [ ] Verificar exportacion de eventos.

## 7. Claims permitidos y bloqueados

Permitidos:

- Festival Heist es un MVP/piloto en preparacion.
- La experiencia permite crear, compartir y desafiar con un festival ideal.
- El piloto puede medir exposicion, interaccion, clicks y senales declaradas.
- Los artistas emergentes participantes deben estar autorizados.

Bloqueados:

- Viralidad asegurada.
- Sponsors, ingresos, inversion o traccion ya conseguidos si no existe evidencia.
- Reproducciones, seguidores, ventas o contrataciones garantizadas.
- Demanda real de shows inferida automaticamente.
- Representatividad estadistica nacional.
- Curaduria artistica mezclada silenciosamente con pauta.

## 8. Evidencia minima para avanzar

Para piloto cerrado:

- [ ] Flujo completo validado en telefono.
- [ ] Tres artistas autorizados cargados.
- [ ] Eventos obligatorios funcionando.
- [ ] Exportacion disponible.
- [ ] Terminos, privacidad y autorizaciones revisados.

Para conversacion comercial:

- [ ] Demo o capturas reales del flujo.
- [ ] One-pager o deck con claims controlados.
- [ ] Inventario sponsor definido.
- [ ] Reporte de ejemplo rotulado como datos simulados.
- [ ] Alcance del piloto explicado como prueba, no como resultado.
