const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "MasAlto";
pptx.company = "MasAlto";
pptx.subject = "Festival Heist - propuesta para aliados comerciales, sponsors e inversores";
pptx.title = "Festival Heist | Oportunidad comercial";
pptx.lang = "es-AR";
pptx.theme = { headFontFace: "Arial", bodyFontFace: "Arial", lang: "es-AR" };

const C = { ink:"090A0F", surface:"12141D", surface2:"1B1E2B", white:"F7F7F4", muted:"CDD0DA", magenta:"F72585", cyan:"4CC9F0", lime:"C7F432", yellow:"FFE45C", red:"E30613", line:"343847", green:"3DDC97" };
const A = { logo:"entregables/assets/brand/MasAlto_Negativo_Fondo_Oscuro.png", build:"entregables/assets/mockups/mockup-crear-festival.png", challenge:"entregables/assets/mockups/mockup-desafio-social.png", dashboard:"entregables/assets/mockups/mockup-panel-aliado.png" };

const shadow = { type:"outer", color:"000000", opacity:0.18, blur:3, angle:45, offset:1.4 };
function dark(s){ s.background={color:C.ink}; }
function txt(s,t,x,y,w,h,o={}){ s.addText(t,{x,y,w,h,fontFace:"Arial",fontSize:o.size||13,color:o.color||C.white,bold:o.bold||false,margin:o.margin??0,fit:"shrink",valign:o.valign||"top",align:o.align||"left",breakLine:o.breakLine}); }
function title(s,t,o={}){ txt(s,t,o.x??0.72,o.y??0.82,o.w??11.7,o.h??0.82,{size:o.size||30,bold:true,color:o.color||C.white}); }
function kicker(s,t,color=C.lime){ txt(s,t.toUpperCase(),0.72,0.47,7,0.2,{size:8.5,bold:true,color}); }
function footer(s,n,t){ txt(s,t,0.68,7.08,8.7,0.16,{size:7.5,color:C.muted}); txt(s,String(n).padStart(2,"0"),12.72,7.08,0.25,0.16,{size:7.2,color:C.muted,align:"right"}); }
function card(s,x,y,w,h,o={}){ s.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:0.05,fill:{color:o.fill||C.surface,transparency:o.transparency||0},line:{color:o.line||C.line,transparency:o.lineTransparency??18,width:o.lineWidth||0.8},shadow:o.shadow===false?undefined:shadow}); }
function chip(s,t,x,y,w,color=C.lime,textColor=C.ink){ s.addShape(pptx.ShapeType.roundRect,{x,y,w,h:0.37,rectRadius:0.05,fill:{color},line:{color,transparency:100}}); txt(s,t,x+0.08,y+0.105,w-0.16,0.13,{size:7.4,bold:true,color:textColor,align:"center"}); }
function logo(s,x=11.25,y=0.28,w=1.3){ const h=w/1.732; s.addShape(pptx.ShapeType.rect,{x:x-0.14,y:y-0.1,w:w+0.28,h:h+0.2,fill:{color:C.ink},line:{color:C.ink}}); s.addImage({path:A.logo,x,y,w,h,altText:"Logo oficial MasAlto"}); }
function image(s,path,trans=0){ s.addImage({path,x:0,y:0,w:13.333,h:7.5,transparency:trans,altText:"Mockup conceptual de Festival Heist"}); }
function overlay(s,x,y,w,h,trans=20,color=C.ink){ s.addShape(pptx.ShapeType.rect,{x,y,w,h,fill:{color,transparency:trans},line:{color,transparency:100}}); }
function dot(s,x,y,color){ s.addShape(pptx.ShapeType.ellipse,{x,y,w:0.16,h:0.16,fill:{color},line:{color}}); }
function bullet(s,t,x,y,w,color=C.lime,size=11.2){ dot(s,x,y+0.08,color); txt(s,t,x+0.36,y,w-0.36,0.3,{size,bold:true}); }
function note(s,t,x,y,w,color=C.yellow){ txt(s,t,x,y,w,0.34,{size:9.2,bold:true,color}); }

// 1 Portada
{
 const s=pptx.addSlide(); dark(s); image(s,A.challenge); overlay(s,0,0,13.333,7.5,53); overlay(s,0,0,6.2,7.5,8);
 s.addShape(pptx.ShapeType.rect,{x:0.74,y:0.9,w:0.11,h:5.05,fill:{color:C.cyan},line:{color:C.cyan}});
 txt(s,"OPORTUNIDAD COMERCIAL",1.1,1.02,3.5,0.2,{size:9,bold:true,color:C.lime});
 txt(s,"FESTIVAL\nHEIST",1.08,1.45,5.1,1.7,{size:46,bold:true});
 txt(s,"De concepto social a activación, descubrimiento y aprendizaje.",1.12,3.5,4.95,0.9,{size:18,bold:true});
 txt(s,"Propuesta para sponsors, aliados estratégicos e inversores.",1.12,4.7,4.75,0.5,{size:12.5,color:C.muted});
 chip(s,"SPONSOR PRINCIPAL DEL PILOTO",1.12,5.72,3.02,C.lime,C.ink); logo(s); footer(s,1,"Presentación externa | Septiembre 2026");
}

// 2 Qué es
{
 const s=pptx.addSlide(); dark(s); kicker(s,"Qué es Festival Heist",C.cyan); title(s,"Una experiencia que convierte gustos musicales en acción");
 txt(s,"Cada persona arma el cartel de su festival ideal, lo comparte con nombres ocultos y desafía a sus amigos a descifrarlo.",0.74,1.72,11.2,0.62,{size:18,bold:true});
 const items=[["ESCUCHAR","Artistas y previews dentro del juego",C.magenta],["ELEGIR","Un line-up que expresa identidad",C.cyan],["COMPARTIR","Un póster que invita a participar",C.lime],["DESAFIAR","Trivia, resultado, revancha y retorno",C.yellow]];
 items.forEach((a,i)=>{ const x=0.76+i*3.08; card(s,x,3.05,2.72,2.3,{line:a[2],lineTransparency:35}); s.addShape(pptx.ShapeType.rect,{x:x+0.25,y:3.35,w:0.5,h:0.09,fill:{color:a[2]},line:{color:a[2]}}); txt(s,a[0],x+0.25,3.75,2.12,0.25,{size:15.5,bold:true}); txt(s,a[1],x+0.25,4.4,2.12,0.48,{size:10.5,color:C.muted}); });
 note(s,"El concepto y su especificación están definidos; adopción, viralidad y rendimiento deben validarse.",0.76,6.25,10.8); footer(s,2,"Definición basada en la especificación v3.1");
}

// 3 oportunidad
{
 const s=pptx.addSlide(); dark(s); kicker(s,"La oportunidad",C.magenta); title(s,"Más que exposición: cinco comportamientos observables");
 const xs=[0.78,3.25,5.72,8.19,10.66]; const labels=[["1","VER",C.magenta],["2","ESCUCHAR",C.cyan],["3","ELEGIR",C.lime],["4","COMPARTIR",C.yellow],["5","VOLVER",C.magenta]];
 labels.forEach((a,i)=>{ card(s,xs[i],2.05,2.0,2.72,{fill:i===2?C.surface2:C.surface,line:a[2],lineTransparency:40}); txt(s,a[0],xs[i]+0.22,2.35,0.4,0.24,{size:11,bold:true,color:a[2]}); txt(s,a[1],xs[i]+0.22,3.03,1.55,0.3,{size:14.5,bold:true}); txt(s,["Alcance visible","Interés activo","Preferencia declarada","Distribución social","Revancha o creación"][i],xs[i]+0.22,3.72,1.55,0.5,{size:9.8,color:C.muted}); if(i<4) s.addShape(pptx.ShapeType.line,{x:xs[i]+2.02,y:3.4,w:0.42,h:0,line:{color:a[2],width:2,endArrowType:"triangle"}}); });
 txt(s,"Para marcas y aliados, el valor aparece en la combinación de experiencia, contenido y medición.",0.78,5.65,11.0,0.48,{size:15,bold:true,color:C.yellow}); footer(s,3,"De atención pasiva a participación medible");
}

// 4 red de valor
{
 const s=pptx.addSlide(); dark(s); kicker(s,"Red de valor",C.lime); title(s,"Un mismo producto, distintos retornos posibles");
 const data=[["FANS","Juego, identidad y descubrimiento",C.magenta],["ARTISTAS","Escucha, elección y tráfico",C.cyan],["MARCAS","Activación, contenido y métricas",C.lime],["PROMOTORES","Demanda, comunidades y territorios",C.yellow],["MASALTO","Potencial de IP, relaciones y oportunidades",C.magenta]];
 data.forEach((a,i)=>{ const y=1.66+i*0.94; card(s,0.8,y,5.05,0.7,{fill:C.surface,shadow:false,line:a[2],lineTransparency:45}); txt(s,a[0],1.08,y+0.22,1.35,0.2,{size:12.2,bold:true,color:a[2]}); txt(s,a[1],2.6,y+0.2,2.8,0.24,{size:10.7,bold:true}); });
 card(s,6.6,1.68,5.85,4.52,{fill:C.surface2,line:C.cyan,lineTransparency:55}); txt(s,"EL ACTIVO CENTRAL",7.02,2.08,2.5,0.26,{size:17,bold:true,color:C.cyan}); txt(s,"Una experiencia participativa que puede empaquetarse por campaña, evento, territorio o comunidad.",7.02,2.72,4.7,0.95,{size:21,bold:true});
 ["Inventario patrocinable","Formato licenciable","Datos agregados","Servicios asociados"].forEach((t,i)=>chip(s,t.toUpperCase(),7.02+(i%2)*2.4,4.55+Math.floor(i/2)*0.68,2.05,[C.magenta,C.cyan,C.lime,C.yellow][i],i>1?C.ink:C.white)); footer(s,4,"El valor económico no depende de una única fuente");
}

// 5 arquitectura de ingresos
{
 const s=pptx.addSlide(); dark(s); kicker(s,"Arquitectura comercial",C.yellow); title(s,"Monetizar por capas, a medida que aparece evidencia");
 const layers=[
  ["AHORA · PILOTO","Sponsor fundador · desafío patrocinado · producción de campaña","Probar inventario, experiencia y reporte",C.lime],
  ["SIGUIENTE · REPETICIÓN","Licencias B2B · ediciones territoriales · informes agregados","Probar venta repetible y margen",C.cyan],
  ["DESPUÉS · ESCALA","Afiliación · premium · productos de datos","Solo con volumen, permisos y retención",C.magenta]
 ];
 layers.forEach((a,i)=>{ const y=1.72+i*1.48; card(s,0.78,y,11.75,1.08,{fill:i===0?C.surface2:C.surface,line:a[3],lineTransparency:25}); txt(s,a[0],1.08,y+0.25,2.1,0.24,{size:12.8,bold:true,color:a[3]}); txt(s,a[1],3.25,y+0.21,5.1,0.28,{size:12.5,bold:true}); txt(s,a[2],8.62,y+0.22,3.32,0.38,{size:10.1,color:C.muted}); });
 note(s,"Prioridad recomendada: vender un piloto patrocinado antes de construir un marketplace o producto de datos.",0.78,6.33,11.0); footer(s,5,"Fuentes potenciales; no representan ingresos obtenidos");
}

// 6 paquetes
{
 const s=pptx.addSlide(); dark(s); kicker(s,"Inventario patrocinable",C.cyan); title(s,"Tres formas simples de entrar al proyecto");
 const packs=[
  ["SPONSOR PRINCIPAL","Asociación institucional","Activación integrada","Distribución coordinada","Reporte ejecutivo",C.lime],
  ["ALIADO DE ESCENARIO","Escenario o edición temática","Presencia delimitada","CTA atribuible","Reporte de interacción",C.cyan],
  ["ALIADO DE ACTIVACIÓN","Desafío o recompensa","Piezas para canales propios","UTM o código","Reporte de campaña",C.magenta]
 ];
 packs.forEach((a,i)=>{ const x=0.78+i*4.15; card(s,x,1.68,3.72,4.65,{fill:i===0?C.surface2:C.surface,line:a[5],lineTransparency:15}); txt(s,a[0],x+0.3,2.05,3.05,0.5,{size:17,bold:true,color:a[5]}); a.slice(1,5).forEach((t,j)=>bullet(s,t,x+0.3,2.95+j*0.64,2.95,a[5],10.3)); });
 note(s,"Precios y exclusividades se cotizan según activos, duración, distribución, soporte y derechos.",0.78,6.58,11.2); footer(s,6,"Paquetes orientativos sin precios ni resultados prometidos");
}

// 7 beneficios
{
 const s=pptx.addSlide(); dark(s); kicker(s,"Beneficio económico",C.magenta); title(s,"Ingresos directos y valor indirecto");
 card(s,0.78,1.68,5.78,4.9,{fill:C.surface2,line:C.lime,lineTransparency:30}); txt(s,"DIRECTO",1.15,2.05,1.8,0.3,{size:19,bold:true,color:C.lime});
 ["Fees de patrocinio y activación","Producción y operación de campañas","Licencias B2B o white-label","Reportes premium agregados","Comisiones por acciones atribuibles"].forEach((t,i)=>bullet(s,t,1.15,2.82+i*0.62,4.7,C.lime,10.6));
 card(s,6.78,1.68,5.76,4.9,{fill:C.surface,line:C.cyan,lineTransparency:30}); txt(s,"INDIRECTO",7.15,2.05,2.1,0.3,{size:19,bold:true,color:C.cyan});
 ["Menor costo de investigación inicial","Oportunidades de shows y producción","Base opt-in potencial","Contenido y relaciones reutilizables","Mejor priorización de artistas y plazas"].forEach((t,i)=>bullet(s,t,7.15,2.82+i*0.62,4.65,C.cyan,10.6)); footer(s,7,"Beneficios potenciales sujetos a validación y acuerdos");
}

// 8 activación mockup
{
 const s=pptx.addSlide(); dark(s); image(s,A.build); overlay(s,0,0,13.333,7.5,37); overlay(s,0,0,5.25,7.5,7);
 kicker(s,"Cómo se vería",C.lime); title(s,"Una marca dentro de la experiencia, sin adueñarse de ella",{w:5.0,h:1.25,size:31});
 ["Presencia identificada como patrocinio","Mecánica o recompensa con utilidad","CTA medible y destino acordado","Frecuencia limitada por sesión"].forEach((t,i)=>bullet(s,t,0.8,2.62+i*0.68,4.15,[C.magenta,C.cyan,C.lime,C.yellow][i],10.8));
 chip(s,"MOCKUP CONCEPTUAL",0.8,5.76,1.98,C.yellow,C.ink); note(s,"No representa una integración implementada ni una marca contratada.",0.8,6.35,4.2,C.muted); logo(s); footer(s,8,"Ejemplo visual de activación patrocinada");
}

// 9 medición
{
 const s=pptx.addSlide(); dark(s); image(s,A.dashboard); overlay(s,0,0,13.333,7.5,38); overlay(s,0,0,5.5,7.5,5);
 kicker(s,"Qué se puede medir",C.cyan); title(s,"Del alcance al comportamiento y la atribución",{w:5.2,h:1.2,size:31});
 const mets=[["ADQUISICIÓN","Fuente e inicio",C.magenta],["JUEGO","Creación y finalización",C.cyan],["PROPAGACIÓN","Share, apertura y desafío",C.lime],["DESCUBRIMIENTO","Preview, elección y clic",C.yellow],["SPONSOR","Impresión, acción y conversión",C.magenta]];
 mets.forEach((a,i)=>{ txt(s,a[0],0.82,2.55+i*0.66,1.62,0.2,{size:10,bold:true,color:a[2]}); txt(s,a[1],2.55,2.52+i*0.66,2.55,0.24,{size:10.8,bold:true}); });
 card(s,7.05,1.55,5.35,0.72,{fill:C.yellow,shadow:false,line:C.yellow,lineTransparency:100}); txt(s,"SIMULACIÓN CONCEPTUAL · SIN DATOS REALES",7.3,1.81,4.85,0.17,{size:9.5,bold:true,color:C.ink,align:"center"});
 card(s,6.95,6.05,5.45,0.62,{fill:C.yellow,shadow:false,line:C.yellow,lineTransparency:100}); txt(s,"EJEMPLO DE REPORTE · DATOS SIMULADOS",7.2,6.27,4.95,0.14,{size:8.1,bold:true,color:C.ink,align:"center"}); logo(s); footer(s,9,"Mockup conceptual; el MVP debe instrumentar estos eventos");
}

// 10 flywheel
{
 const s=pptx.addSlide(); dark(s); kicker(s,"Motor de crecimiento",C.lime); title(s,"Cada actor ayuda a que el siguiente tenga más valor");
 const nodes=[["SPONSOR","Financia activación",0.8,2.55,C.lime],["EXPERIENCIA","Activa a la audiencia",3.35,1.55,C.cyan],["COMUNIDADES","Distribuyen el juego",6.42,1.55,C.magenta],["SEÑALES","Mejoran decisiones",9.45,2.55,C.yellow],["NUEVA OFERTA","Aumenta repetición",6.42,4.65,C.lime],["MASALTO","Opera y conecta",3.35,4.65,C.cyan]];
 nodes.forEach(a=>{card(s,a[2],a[3],2.22,0.95,{fill:C.surface2,line:a[4],lineTransparency:15}); txt(s,a[0],a[2]+0.15,a[3]+0.23,1.92,0.22,{size:12.5,bold:true,color:a[4],align:"center"}); txt(s,a[1],a[2]+0.15,a[3]+0.56,1.92,0.18,{size:8.4,color:C.muted,align:"center"});});
 [[3.05,2.8,0.22,-0.42],[5.65,1.98,0.52,0],[8.72,2.0,0.48,0.55],[10.1,3.68,-1.18,0.78],[6.25,5.08,-0.52,0],[3.2,5.05,-1.14,-1.42]].forEach(a=>s.addShape(pptx.ShapeType.line,{x:a[0],y:a[1],w:a[2],h:a[3],line:{color:C.muted,width:2,endArrowType:"triangle"}}));
 note(s,"El ciclo es una hipótesis estratégica: debe comprobarse con repetición comercial y comportamiento real.",0.78,6.4,11.5); footer(s,10,"Flywheel potencial de producto y negocio");
}

// 11 MVP
{
 const s=pptx.addSlide(); dark(s); kicker(s,"Implicancias para el MVP",C.yellow); title(s,"La capa comercial debe medirse desde el primer piloto");
 const cols=[
  ["MUST","Campañas y placements","Eventos con denominadores","Control sin sponsor","Consentimiento y frecuencia","Reporte CSV por campaña",C.lime],
  ["SHOULD","Experimentos A/B","Segmentación básica","Exclusividad y conflictos","Vista partner de lectura","Deep links atribuibles",C.cyan],
  ["LATER","Facturación y autoservicio","Marketplace de inventario","Suscripciones premium","Productos de datos","Atribución multicanal",C.magenta]
 ];
 cols.forEach((a,i)=>{ const x=0.78+i*4.15; card(s,x,1.62,3.72,4.9,{fill:i===0?C.surface2:C.surface,line:a[6],lineTransparency:20}); txt(s,a[0],x+0.28,1.98,1.0,0.25,{size:16.5,bold:true,color:a[6]}); a.slice(1,6).forEach((t,j)=>bullet(s,t,x+0.28,2.72+j*0.6,2.95,a[6],9.8)); }); footer(s,11,"Prioridad interna para producto, analítica y operación");
}

// 12 validación
{
 const s=pptx.addSlide(); dark(s); kicker(s,"Ruta de validación",C.cyan); title(s,"Seis pruebas antes de hablar de escala");
 const steps=[["1","PRODUCTO","Completan y comparten"],["2","INVENTARIO","Se ve sin molestar"],["3","MEDICIÓN","Reporte reproducible"],["4","VENTA","Piloto acotado"],["5","REPETICIÓN","Segunda venta estándar"],["6","ESCALA","Licencias y margen"]];
 steps.forEach((a,i)=>{ const x=0.72+i*2.09; card(s,x,2.05,1.82,2.75,{fill:i<3?C.surface2:C.surface,line:[C.magenta,C.cyan,C.lime,C.yellow,C.magenta,C.cyan][i],lineTransparency:35}); txt(s,a[0],x+0.18,2.33,0.4,0.25,{size:11,bold:true,color:[C.magenta,C.cyan,C.lime,C.yellow,C.magenta,C.cyan][i]}); txt(s,a[1],x+0.18,3.05,1.46,0.32,{size:12.5,bold:true,align:"center"}); txt(s,a[2],x+0.18,3.67,1.46,0.48,{size:9.2,color:C.muted,align:"center"}); if(i<5)s.addShape(pptx.ShapeType.line,{x:x+1.84,y:3.43,w:0.25,h:0,line:{color:C.muted,width:1.7,endArrowType:"triangle"}}); });
 txt(s,"Hito de inversión defendible: producto usado + campaña medida + cliente dispuesto a repetir.",0.78,5.65,11.3,0.5,{size:16,bold:true,color:C.yellow,align:"center"}); footer(s,12,"Secuencia de reducción de riesgo");
}

// 13 oferta concreta y separación de instrumentos
{
 const s=pptx.addSlide(); dark(s); kicker(s,"Primera oportunidad",C.magenta); title(s,"Un piloto concreto, dos formas de participación");
 card(s,0.78,1.58,5.76,4.95,{fill:C.surface2,line:C.lime,lineTransparency:20}); txt(s,"SPONSOR PRINCIPAL",1.12,1.98,3.5,0.28,{size:18,bold:true,color:C.lime}); ["Compra: activación, inventario y reporte","Aporta: fee o canje valorizado","Recibe: ejecución y métricas acordadas","No recibe: ROI, alcance o ventas garantizadas"].forEach((t,i)=>bullet(s,t,1.12,2.8+i*0.66,4.62,C.lime,10.5));
 card(s,6.8,1.58,5.76,4.95,{fill:C.surface,line:C.cyan,lineTransparency:20}); txt(s,"INVERSIÓN ESTRATÉGICA",7.15,1.98,3.8,0.28,{size:18,bold:true,color:C.cyan}); ["Capital: monto sujeto a alcance y due diligence","Destino: MVP, medición y piloto comercial","Hito: campaña medida y voluntad de repetir","Estructura: propiedad y términos por definir"].forEach((t,i)=>bullet(s,t,7.15,2.8+i*0.66,4.65,C.cyan,10.5));
 note(s,"Duración, distribución, responsables y criterios de éxito se acuerdan antes de cotizar.",0.78,6.67,11.2); footer(s,13,"El aporte comercial no implica participación societaria");
}

// 14 cierre
{
 const s=pptx.addSlide(); dark(s); image(s,A.challenge); overlay(s,0,0,13.333,7.5,49); overlay(s,6.5,0,6.833,7.5,7); logo(s);
 txt(s,"LA PROPUESTA",7.15,1.1,2.5,0.2,{size:9,bold:true,color:C.lime});
 txt(s,"Construyamos el primer piloto comercial de Festival Heist.",7.12,1.62,5.1,1.45,{size:34,bold:true});
 txt(s,"Buscamos un socio que aporte recursos, distribución o capacidades estratégicas para validar la experiencia y su modelo de negocio.",7.15,3.45,4.7,0.95,{size:14,bold:true});
 ["SPONSOR PRINCIPAL","ALIADO ESTRATÉGICO","INVERSIÓN PILOTO"].forEach((t,i)=>chip(s,t,7.15+i*1.72,5.05,1.5,[C.lime,C.cyan,C.magenta][i],i===0?C.ink:C.white));
 txt(s,"Próximo paso: reunión de 45 minutos para definir objetivo, aporte, activación y criterios de éxito.",7.15,5.76,4.8,0.52,{size:11.2,bold:true,color:C.yellow}); footer(s,14,"Festival Heist | Propuesta de alianza comercial");
}

pptx.writeFile({ fileName:"entregables/Festival_Heist_Aliados_Comerciales_Inversores.pptx" });
