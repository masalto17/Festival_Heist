# Festival Heist - Gobierno de trabajo Codex / Claude

Fecha: 2026-09-16  
Estado: directiva operativa vigente desde este punto del proyecto.

## 1. Roles

### Claude

Claude queda a cargo del desarrollo completo:

- implementacion de codigo;
- arquitectura tecnica;
- componentes UI;
- rutas y flujos;
- base de datos/migraciones;
- eventos y exportacion;
- tests;
- correcciones de bugs;
- documentacion tecnica derivada del codigo.

### Codex

Codex queda a cargo de supervision, control y planificacion:

- definir alcance;
- priorizar etapas;
- controlar coherencia con producto y estetica;
- revisar entregas;
- auditar claims comerciales;
- mantener criterios de aceptacion;
- preparar handoffs y checklists;
- pedir correcciones cuando haya desvio.

Codex no debe ser tratado como implementador principal mientras esta directiva este vigente, salvo pedido explicito del usuario.

## 2. Principio de foco

Claude no debe asumir contexto por memoria, conversacion previa o intuicion. Cada tarea debe anclarse en archivos concretos.

Antes de programar, Claude debe declarar:

1. archivos de instrucciones leidos;
2. archivos de codigo que planea tocar;
3. archivos que quedan fuera de alcance;
4. criterio de aceptacion de la tarea;
5. validaciones que correra.

Si Claude no puede leer una referencia indicada, debe frenar y reportarlo. No puede reemplazarla por una interpretacion aproximada.

## 3. Fuentes de verdad

### Producto y alcance

1. `docs/MVP_ACTUALIZADO.md`
2. `CLAUDE.md`
3. `docs/CHECKLIST_PREPILOTO.md`
4. `README-DEV.md`
5. `Festival_Heist_Especificacion_v3_1.md` solo como referencia historica

### Estetica y experiencia

1. `docs/LINEAMIENTO_ESTETICO_BASE.md`
2. `docs/HANDOFF_IMPLEMENTACION_ESTETICA_CLAUDE.md`
3. `docs/CHECKLIST_QA_ESTETICA.md`
4. `entregables/assets/estetica/festival-heist-direccion-principal-D.png`
5. `entregables/assets/estetica/festival-heist-componentes-desafio-B.png`
6. `entregables/assets/estetica/festival-heist-referencia-flujo-wizard-codex.png` — referencia de composicion y densidad visual para el wizard (Etapa C), poster y cartas de desafio. Manda la logica (backstage fisico + flujo jugable + poster como recompensa), no los textos ni el layout literal si no coinciden con el MVP aprobado.

### Claims, marketing y riesgo comercial

1. `docs/PLAN_MARKETING_SEO_EMPRESARIAL.md`
2. `FUENTES.md`
3. `docs/MVP_ACTUALIZADO.md`

### Prompts de trabajo

- `docs/PROMPT_MAESTRO_CLAUDE_DESARROLLO.md`
- `docs/PROMPT_CLAUDE_IMPLEMENTACION_ESTETICA.md`

## 4. Scope lock por tarea

Cada pedido a Claude debe tener un scope chico y verificable. Ejemplo:

- Etapa A: base visual y componentes comunes.
- Etapa B: landing.
- Etapa C: wizard crear festival.
- Etapa D: poster compartible.
- Etapa E: desafio.
- Etapa F: eventos y exportacion.
- Etapa G: sponsor placement.
- Etapa H: hardening y QA prepiloto.

Claude no debe mezclar etapas sin aprobacion. Si detecta una dependencia necesaria, debe reportarla y proponer el ajuste antes de modificar mas alcance.

## 5. Archivos permitidos segun tipo de tarea

### UI / estetica

Puede tocar, si corresponde:

- `app/**/*.tsx`
- `components/**/*`
- `app/globals.css`
- `tailwind.config.ts`
- `data/*.json` solo si necesita datos ficticios para representar flujo
- documentacion tecnica relacionada con la implementacion

Debe evitar tocar en una tarea puramente visual:

- migraciones Supabase;
- politicas RLS;
- documentos comerciales;
- presentaciones;
- PDFs;
- archivos de fuente o claims.

### Datos / backend / eventos

Puede tocar, si corresponde:

- `lib/**/*`
- `app/api/**/*`
- `supabase/migrations/**/*`
- `supabase/seed.sql`
- `data/*.json`
- docs tecnicos que documenten el cambio

Debe evitar tocar:

- direccion estetica;
- assets visuales aprobados;
- presentaciones comerciales.

### Documentacion

Puede tocar solo los documentos relacionados con la tarea. No debe reescribir documentos de producto completos sin pedido explicito.

## 6. Reporte obligatorio de Claude

Al finalizar cada tarea, Claude debe reportar:

- resumen de lo implementado;
- archivos modificados;
- instrucciones/fuentes que siguio;
- validaciones corridas;
- resultado de cada validacion;
- capturas o descripcion visual si aplica;
- puntos pendientes;
- riesgos o decisiones que requieren aprobacion.

Para UI, tambien debe reportar el resultado contra `docs/CHECKLIST_QA_ESTETICA.md`.

Para piloto, tambien debe reportar el resultado contra `docs/CHECKLIST_PREPILOTO.md`.

## 7. Condiciones para frenar

Claude debe frenar y pedir definicion si:

- una instruccion contradice `docs/MVP_ACTUALIZADO.md`;
- una instruccion visual contradice `docs/LINEAMIENTO_ESTETICO_BASE.md`;
- necesita usar Spotify OAuth, Spotify Web API u otra integracion fuera del MVP;
- necesita publicar, desplegar, conectar cuentas, mover a produccion o gastar;
- necesita usar artistas reales no autorizados;
- necesita mezclar sponsor con curaduria artistica;
- no puede acceder a las referencias D o B;
- la tarea requiere cambiar alcance aprobado.

## 8. Revision de Codex

Codex revisara entregas con este orden:

1. ¿Cumple el scope pedido?
2. ¿Respeta MVP y limites?
3. ¿Respeta estetica D+B?
4. ¿Funciona tecnicamente?
5. ¿Esta validado en mobile?
6. ¿Hay claims o metricas indebidas?
7. ¿Hay pendientes bloqueantes para piloto?

Si falla un punto critico, Codex debe pedir correccion concreta antes de avanzar a la siguiente etapa.

## 9. Generacion de imagenes y assets visuales finales

Para imagenes importantes del resultado final (fondos, texturas, mockups de referencia, cualquier asset que vaya a produccion o que fije direccion visual), la generacion queda a cargo de ChatGPT/Codex, no de Claude ni de otro agente.

Si Claude necesita una imagen de este tipo:

1. No debe generarla directamente por su cuenta.
2. Debe pedirle al usuario un requerimiento preciso, con:
   - formato (proporcion, orientacion);
   - objetivo (para que pantalla o componente);
   - estilo (referencia a `docs/LINEAMIENTO_ESTETICO_BASE.md` y a D/B);
   - referencias visuales concretas;
   - tamano/resolucion;
   - uso previsto (fondo, textura, icono, mockup, etc.).
3. El usuario pasa ese requerimiento a Codex, aprueba el resultado y se lo entrega a Claude como archivo.
4. Claude integra el archivo entregado; no lo reemplaza ni regenera por su cuenta.

Excepcion: pruebas descartables o exploraciones internas que no van a produccion pueden generarse con otras herramientas si el usuario lo pide explicitamente para ese caso puntual.
