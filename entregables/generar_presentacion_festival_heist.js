const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "MasAlto";
pptx.company = "MasAlto";
pptx.subject = "Festival Heist - propuesta para productora aliada";
pptx.title = "Festival Heist | Productora aliada";
pptx.lang = "es-AR";
pptx.theme = { headFontFace: "Arial", bodyFontFace: "Arial", lang: "es-AR" };

const C = {
  ink: "090A0F", surface: "12141D", surface2: "1B1E2B", white: "F7F7F4",
  muted: "CDD0DA", magenta: "F72585", cyan: "4CC9F0", lime: "C7F432",
  yellow: "FFE45C", red: "E30613", line: "343847",
};

const ASSET = {
  logo: "entregables/assets/brand/MasAlto_Negativo_Fondo_Oscuro.png",
  build: "entregables/assets/mockups/mockup-crear-festival.png",
  challenge: "entregables/assets/mockups/mockup-desafio-social.png",
  dashboard: "entregables/assets/mockups/mockup-panel-aliado.png",
};

const makeShadow = (opacity = 0.22) => ({ type: "outer", color: "000000", opacity, blur: 3, angle: 45, offset: 1.5 });
const dark = (slide) => { slide.background = { color: C.ink }; };

function addFullBleed(slide, path, transparency = 0) {
  slide.addImage({ path, x: 0, y: 0, w: 13.333, h: 7.5, transparency, altText: "Mockup conceptual de Festival Heist" });
}

function overlay(slide, x, y, w, h, transparency = 16, color = C.ink) {
  slide.addShape(pptx.ShapeType.rect, { x, y, w, h, fill: { color, transparency }, line: { color, transparency: 100 } });
}

function brand(slide, x = 11.08, y = 0.28, w = 1.55) {
  const h = w / 1.732;
  slide.addShape(pptx.ShapeType.rect, { x: x - 0.18, y: y - 0.12, w: w + 0.36, h: h + 0.24, fill: { color: C.ink }, line: { color: C.ink } });
  slide.addImage({ path: ASSET.logo, x, y, w, h, altText: "Logo oficial MasAlto" });
}

function body(slide, text, x, y, w, h, options = {}) {
  slide.addText(text, {
    x, y, w, h, fontFace: options.fontFace === "Arial Black" ? "Arial" : (options.fontFace ?? "Arial"), fontSize: options.size ?? 14,
    color: options.color ?? C.white, bold: options.bold ?? false, margin: options.margin ?? 0,
    fit: "shrink", valign: options.valign ?? "top", align: options.align ?? "left",
  });
}

function kicker(slide, text, color = C.lime) {
  body(slide, text.toUpperCase(), 0.72, 0.48, 5.5, 0.2, { size: 8, color, bold: true });
}

function title(slide, text, options = {}) {
  body(slide, text, options.x ?? 0.72, options.y ?? 0.82, options.w ?? 11.6, options.h ?? 0.72, {
    fontFace: "Arial Black", size: options.size ?? 30, color: options.color ?? C.white, bold: true,
  });
}

function card(slide, x, y, w, h, options = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.07,
    fill: { color: options.fill ?? C.surface, transparency: options.transparency ?? 0 },
    line: { color: options.line ?? C.line, transparency: options.lineTransparency ?? 15, width: options.lineWidth ?? 0.8 },
    shadow: options.shadow === false ? undefined : makeShadow(options.shadowOpacity ?? 0.16),
  });
}

function chip(slide, text, x, y, w, color = C.lime, textColor = C.ink) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.38, rectRadius: 0.06, fill: { color }, line: { color, transparency: 100 } });
  body(slide, text, x + 0.1, y + 0.105, w - 0.2, 0.13, { size: 7.6, color: textColor, bold: true, align: "center" });
}

function numberDot(slide, n, x, y, color) {
  slide.addShape(pptx.ShapeType.ellipse, { x, y, w: 0.52, h: 0.52, fill: { color }, line: { color, transparency: 100 } });
  body(slide, String(n), x, y + 0.14, 0.52, 0.14, { size: 9.5, color: C.ink, bold: true, align: "center" });
}

function footer(slide, n, text) {
  body(slide, text, 0.65, 7.08, 5.0, 0.16, { size: 8, color: C.muted });
  body(slide, String(n).padStart(2, "0"), 12.75, 7.08, 0.2, 0.16, { fontFace: "Menlo", size: 7.4, color: C.muted, align: "right" });
}

// 1. Portada
{
  const s = pptx.addSlide(); dark(s); addFullBleed(s, ASSET.build); overlay(s, 0, 0, 13.333, 7.5, 58); overlay(s, 0, 0, 6.15, 7.5, 10);
  s.addShape(pptx.ShapeType.rect, { x: 0.74, y: 0.92, w: 0.11, h: 4.9, fill: { color: C.magenta }, line: { color: C.magenta } });
  body(s, "PROPUESTA DE ALIANZA", 1.12, 1.02, 3.3, 0.2, { size: 9, color: C.lime, bold: true });
  body(s, "FESTIVAL\nHEIST", 1.08, 1.48, 5.25, 1.72, { fontFace: "Arial Black", size: 46, bold: true });
  body(s, "El festival que cada persona imagina, comparte y desafía.", 1.12, 3.55, 4.65, 0.8, { size: 18, bold: true });
  body(s, "Una experiencia social para descubrir artistas y convertir atención en participación medible.", 1.12, 4.58, 4.8, 0.72, { size: 12.5, color: C.muted });
  chip(s, "PILOTO CON PRODUCTORA ALIADA", 1.12, 5.72, 2.82, C.lime, C.ink);
  brand(s, 10.98, 0.38, 1.52); footer(s, 1, "Presentación externa | Septiembre 2026");
}

// 2. Que es
{
  const s = pptx.addSlide(); dark(s); kicker(s, "Qué es Festival Heist"); title(s, "Un juego web social de descubrimiento musical");
  body(s, "Una persona arma el cartel de su festival ideal. Lo comparte con los nombres ocultos. Sus amigos intentan descifrarlo.", 0.74, 1.72, 6.0, 0.84, { size: 18, bold: true });
  const steps = [
    ["1", "ELEGIR", "Artistas, géneros y un emergente para cada escenario.", C.magenta],
    ["2", "COMPARTIR", "Un póster personal que se convierte en desafío.", C.cyan],
    ["3", "DESCIFRAR", "Trivia, resultado, revancha y un nuevo festival.", C.lime],
  ];
  steps.forEach((st, i) => {
    const x = 0.75 + i * 4.13; card(s, x, 3.06, 3.68, 2.52, { fill: i === 1 ? "161B25" : C.surface });
    numberDot(s, st[0], x + 0.3, 3.38, st[3]);
    body(s, st[1], x + 0.3, 4.13, 2.7, 0.26, { fontFace: "Arial Black", size: 18, bold: true });
    body(s, st[2], x + 0.3, 4.67, 2.95, 0.5, { size: 10.5, color: C.muted });
  });
  body(s, "El artista emergente forma parte de una decisión del usuario, no de una pausa publicitaria.", 0.75, 6.18, 10.9, 0.42, { size: 15, color: C.yellow, bold: true });
  footer(s, 2, "Definición funcional basada en la especificación v3.1");
}

// 3. Objetivos
{
  const s = pptx.addSlide(); dark(s); kicker(s, "Que queremos conseguir", C.cyan); title(s, "Cuatro objetivos, una misma experiencia");
  const goals = [
    ["DESCUBRIR", "Dar exposicion contextual a artistas emergentes y facilitar la escucha.", C.magenta],
    ["ACTIVAR", "Convertir gustos musicales en un juego compartible entre personas reales.", C.cyan],
    ["APRENDER", "Obtener señales iniciales de preferencia por artista, género y territorio.", C.lime],
    ["CONECTAR", "Detectar oportunidades para comunicación y posibles circuitos del interior.", C.yellow],
  ];
  goals.forEach((g, i) => {
    const x = 0.77 + (i % 2) * 6.15; const y = 1.68 + Math.floor(i / 2) * 2.35;
    card(s, x, y, 5.58, 1.78); s.addShape(pptx.ShapeType.rect, { x, y, w: 0.12, h: 1.78, fill: { color: g[2] }, line: { color: g[2] } });
    body(s, g[0], x + 0.42, y + 0.34, 2.35, 0.28, { fontFace: "Arial Black", size: 18, bold: true });
    body(s, g[1], x + 0.42, y + 0.89, 4.55, 0.48, { size: 11.2, color: C.muted });
  });
  body(s, "El piloto busca evidencia para decidir la siguiente etapa; no parte de resultados garantizados.", 0.78, 6.55, 10.9, 0.28, { size: 12.8, bold: true });
  footer(s, 3, "Objetivos de producto, comunicación y aprendizaje");
}

// 4. Funcionamiento visual
{
  const s = pptx.addSlide(); dark(s); addFullBleed(s, ASSET.build); overlay(s, 0, 0, 13.333, 7.5, 38); overlay(s, 0, 0, 4.9, 7.5, 10);
  kicker(s, "Cómo funciona", C.yellow); title(s, "De una elección personal a una historia compartida", { w: 5.7, h: 1.25, size: 32 });
  ["Elige su line-up", "Escucha y suma un emergente", "Genera un póster listo para compartir"].forEach((t, i) => {
    numberDot(s, i + 1, 0.78, 2.55 + i * 1.05, [C.magenta, C.cyan, C.lime][i]);
    body(s, t, 1.55, 2.67 + i * 1.05, 3.3, 0.27, { size: 13.5, bold: true });
  });
  body(s, "MOCKUP CONCEPTUAL", 0.78, 6.18, 1.85, 0.16, { size: 8, color: C.muted, bold: true }); brand(s, 11.08, 0.3, 1.35); footer(s, 4, "Interfaz y contenido ilustrativos");
}

// 5. Participacion de artistas
{
  const s = pptx.addSlide(); dark(s); kicker(s, "Dónde participan sus artistas", C.magenta); title(s, "El artista entra dentro de una decisión, no dentro de un anuncio", { size: 28 });
  const stages = [
    ["1", "POOL CURADO", "3 a 5 artistas de la productora, con tema y links oficiales."],
    ["2", "ESCUCHA", "El usuario compara previews dentro del flujo de creación."],
    ["3", "ELECCIÓN", "El artista puede integrar el festival ideal de esa persona."],
    ["4", "CIRCULACIÓN", "El póster y el desafío viajan a nuevas audiencias."],
  ];
  stages.forEach((st, i) => {
    const y = 1.72 + i * 1.15; numberDot(s, st[0], 0.82, y, [C.magenta, C.cyan, C.lime, C.yellow][i]);
    body(s, st[1], 1.6, y + 0.01, 2.15, 0.24, { fontFace: "Arial Black", size: 15.5, bold: true });
    body(s, st[2], 3.45, y, 3.25, 0.48, { size: 10.5, color: C.muted });
  });
  card(s, 7.35, 1.55, 5.05, 4.9, { fill: "10121A" }); body(s, "REQUISITOS DE ALTA", 7.78, 1.98, 2.7, 0.26, { fontFace: "Arial Black", size: 17, bold: true });
  ["Tema publicado en DSP o YouTube oficial", "Link directo al tema y materiales", "Autorización y titularidad declaradas", "Compromiso de activación coordinada"].forEach((t, i) => {
    s.addShape(pptx.ShapeType.ellipse, { x: 7.82, y: 2.72 + i * 0.72, w: 0.18, h: 0.18, fill: { color: C.lime }, line: { color: C.lime } });
    body(s, t, 8.25, 2.68 + i * 0.72, 3.55, 0.28, { size: 11.2 });
  });
  body(s, "La aprobación final es manual antes de entrar en rotación.", 7.78, 5.82, 3.95, 0.28, { size: 10.5, color: C.yellow, bold: true });
  footer(s, 5, "Participación sujeta a validación y permisos");
}

// 6. Oportunidad
{
  const s = pptx.addSlide(); dark(s); kicker(s, "Por qué es una gran oportunidad", C.lime); title(s, "De la impresión pasiva a una elección con significado");
  card(s, 0.76, 1.7, 4.35, 4.75, { fill: "11131A" }); body(s, "DIFUSION CONVENCIONAL", 1.12, 2.1, 3.1, 0.3, { fontFace: "Arial Black", size: 17, color: C.muted, bold: true });
  ["Ver", "Pasar", "Recordar o no"].forEach((t, i) => body(s, t, 1.12, 2.9 + i * 0.82, 2.8, 0.32, { size: 15, color: C.muted }));
  s.addShape(pptx.ShapeType.line, { x: 5.48, y: 3.96, w: 1.15, h: 0, line: { color: C.lime, width: 3, endArrowType: "triangle" } });
  card(s, 7.02, 1.7, 5.5, 4.75, { fill: C.surface2, line: C.magenta, lineTransparency: 0 }); body(s, "FESTIVAL HEIST", 7.42, 2.1, 2.8, 0.3, { fontFace: "Arial Black", size: 18, bold: true });
  ["Escuchar", "Comparar", "Elegir", "Compartir", "Desafiar"].forEach((t, i) => chip(s, t.toUpperCase(), 7.42 + (i % 2) * 2.2, 2.86 + Math.floor(i / 2) * 0.85, 1.8, [C.magenta, C.cyan, C.lime, C.yellow, C.magenta][i], i === 2 || i === 3 ? C.ink : C.white));
  body(s, "La productora participa desde el comienzo y accede a aprendizajes compartidos.", 7.42, 5.62, 4.15, 0.45, { size: 11.5, bold: true });
  footer(s, 6, "Oportunidad de participación temprana");
}

// 7. Resultados
{
  const s = pptx.addSlide(); dark(s); addFullBleed(s, ASSET.dashboard); overlay(s, 0, 0, 13.333, 7.5, 34); overlay(s, 0, 0, 5.55, 7.5, 5);
  kicker(s, "Qué podrá medir la alianza", C.cyan); title(s, "Un reporte para entender qué despierta cada artista", { w: 5.0, h: 1.15, size: 31 });
  ["Apariciones y escuchas iniciadas", "Elecciones sobre exposiciones", "Compartidos y desafíos generados", "Afinidad por género y territorio", "Clics hacia plataformas oficiales"].forEach((t, i) => {
    s.addShape(pptx.ShapeType.ellipse, { x: 0.8, y: 2.66 + i * 0.62, w: 0.18, h: 0.18, fill: { color: i % 2 ? C.cyan : C.lime }, line: { color: C.ink } });
    body(s, t, 1.2, 2.6 + i * 0.62, 3.85, 0.28, { size: 11.5, bold: true });
  });
  card(s, 0.78, 5.92, 4.5, 0.72, { fill: C.surface2, transparency: 5, shadow: false });
  body(s, "Entregable comprometible: reporte y reunión de aprendizaje. El volumen de resultados no se garantiza.", 1.03, 6.1, 3.98, 0.3, { size: 9.3, color: C.yellow, bold: true });
  card(s, 7.1, 6.25, 5.3, 0.46, { fill: C.yellow, shadow: false, line: C.yellow, lineTransparency: 100 });
  body(s, "EJEMPLO DE REPORTE · DATOS SIMULADOS", 7.32, 6.4, 4.86, 0.14, { size: 8.2, color: C.ink, bold: true, align: "center" });
  brand(s, 11.08, 0.3, 1.35); footer(s, 7, "Mockup conceptual; no representa resultados obtenidos");
}

// 8. Motor de viralidad
{
  const s = pptx.addSlide(); dark(s); kicker(s, "Motor de viralidad", C.magenta); title(s, "El contenido no termina al compartirse: invita a jugar");
  const nodes = [
    ["ARMO", 1.1, 2.75, C.magenta], ["DESAFÍO", 4.0, 1.75, C.cyan], ["DESCIFRAN", 7.25, 1.75, C.lime],
    ["RESULTADO", 10.15, 2.75, C.yellow], ["CREAN EL SUYO", 7.25, 4.85, C.magenta], ["REVANCHA", 4.0, 4.85, C.cyan],
  ];
  nodes.forEach((n) => { card(s, n[1], n[2], 2.15, 0.82, { fill: C.surface2, line: n[3], lineTransparency: 0, shadowOpacity: 0.12 }); body(s, n[0], n[1] + 0.14, n[2] + 0.27, 1.87, 0.2, { fontFace: "Arial Black", size: 13, bold: true, align: "center" }); });
  [[3.28,3.05,0.62,-0.58],[6.17,2.16,0.82,0],[9.42,2.2,0.62,0.7],[10.65,3.75,-1.2,1.0],[7.05,5.25,-0.78,0],[3.92,5.22,-1.52,-1.38]].forEach((a, i) => s.addShape(pptx.ShapeType.line, { x: a[0], y: a[1], w: a[2], h: a[3], line: { color: [C.magenta,C.cyan,C.lime,C.yellow,C.magenta,C.cyan][i], width: 2.3, endArrowType: "triangle" } }));
  body(s, "SIN LOGIN  +  CURIOSIDAD SOCIAL  +  RECONOCIMIENTO  +  REVANCHA  +  CTA PARA CREAR", 1.2, 6.32, 10.9, 0.28, { size: 11, color: C.yellow, bold: true, align: "center" });
  footer(s, 8, "Mecanismos a validar durante el piloto");
}

// 9. Fortalezas
{
  const s = pptx.addSlide(); dark(s); kicker(s, "Por qué puede funcionar", C.yellow); title(s, "Seis decisiones que aumentan la probabilidad de adopción");
  const strengths = [
    ["SIN LOGIN", "Entrada directa al juego", C.magenta], ["FORMATO FAMILIAR", "El poster se entiende en segundos", C.cyan],
    ["IDENTIDAD PERSONAL", "Cada line-up habla de quien lo crea", C.lime], ["COMPETENCIA SOCIAL", "Trivia, récord y revancha", C.yellow],
    ["DESCUBRIMIENTO NATIVO", "Escuchar y elegir dentro del flujo", C.magenta], ["MEDICIÓN DESDE EL INICIO", "Eventos, denominadores y reporte", C.cyan],
  ];
  strengths.forEach((st, i) => {
    const x = 0.76 + (i % 3) * 4.13; const y = 1.72 + Math.floor(i / 3) * 2.27; card(s, x, y, 3.68, 1.75);
    s.addShape(pptx.ShapeType.rect, { x: x + 0.26, y: y + 0.3, w: 0.5, h: 0.09, fill: { color: st[2] }, line: { color: st[2] } });
    body(s, st[0], x + 0.27, y + 0.65, 2.9, 0.24, { fontFace: "Arial Black", size: 15, bold: true }); body(s, st[1], x + 0.27, y + 1.12, 2.9, 0.27, { size: 10.3, color: C.muted });
  });
  body(s, "Son fundamentos de diseño, no garantías. El piloto medirá cuáles sostienen participación y propagación real.", 0.78, 6.36, 11.3, 0.35, { size: 12.5, color: C.yellow, bold: true });
  footer(s, 9, "Factores de adopción y viralidad a validar");
}

// 10. Piloto y responsabilidades
{
  const s = pptx.addSlide(); dark(s); kicker(s, "Piloto conjunto", C.lime); title(s, "Cuatro semanas activas, responsabilidades claras");
  card(s, 0.76, 1.6, 5.72, 3.88); body(s, "LA PRODUCTORA APORTA", 1.12, 1.98, 3.0, 0.28, { fontFace: "Arial Black", size: 18, bold: true, color: C.cyan });
  ["3 a 5 artistas y un tema por artista", "Links, materiales y autorizaciones", "Una activación inicial coordinada", "Un responsable de seguimiento"].forEach((t, i) => body(s, `${i + 1}.  ${t}`, 1.12, 2.68 + i * 0.58, 4.7, 0.26, { size: 11.3 }));
  card(s, 6.85, 1.6, 5.72, 3.88, { fill: C.surface2, line: C.red, lineTransparency: 55 }); body(s, "MASALTO APORTA", 7.22, 1.98, 3.0, 0.28, { fontFace: "Arial Black", size: 18, bold: true });
  ["Curaduría e integración al pool", "Operación y seguimiento del piloto", "Kit de comunicación compartido", "Reporte y reunión de aprendizaje"].forEach((t, i) => body(s, `${i + 1}.  ${t}`, 7.22, 2.68 + i * 0.58, 4.65, 0.26, { size: 11.3 }));
  ["SELECCIÓN", "CONFIGURACIÓN", "ACTIVACIÓN", "REPORTE"].forEach((t, i) => { const x = 0.82 + i * 3.03; chip(s, `${i + 1} · ${t}`, x, 5.96, 2.52, [C.magenta,C.cyan,C.lime,C.yellow][i], i > 1 ? C.ink : C.white); });
  footer(s, 10, "Continuidad sujeta a resultados y acuerdo de ambas partes");
}

// 11. Cierre
{
  const s = pptx.addSlide(); dark(s); addFullBleed(s, ASSET.challenge); overlay(s, 0, 0, 13.333, 7.5, 46); overlay(s, 7.0, 0, 6.333, 7.5, 6);
  brand(s, 11.03, 0.38, 1.42); body(s, "LA INVITACIÓN", 7.35, 1.22, 3.0, 0.22, { size: 9, color: C.lime, bold: true });
  body(s, "Sumemos sus artistas al primer festival que se construye jugando.", 7.3, 1.72, 5.05, 1.82, { fontFace: "Arial Black", size: 34, bold: true });
  body(s, "Primer paso", 7.35, 4.16, 1.55, 0.24, { fontFace: "Arial Black", size: 16, color: C.cyan, bold: true });
  body(s, "Seleccionar entre 3 y 5 artistas y un tema oficial por artista para evaluar su ingreso al piloto.", 7.35, 4.64, 4.6, 0.7, { size: 14, bold: true });
  chip(s, "ARMEMOS EL POOL ALIADO", 7.35, 5.82, 2.75, C.lime, C.ink); body(s, "FESTIVAL HEIST · PILOTO", 10.35, 5.93, 1.8, 0.15, { size: 8, color: C.muted, bold: true });
  footer(s, 11, "Propuesta de alianza para piloto");
}

pptx.writeFile({ fileName: "entregables/Festival_Heist_Productora_Aliada.pptx" });
