export const GANTT_NORMAL_HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
:root{ color-scheme: light; --pr-blue:#333F48; --pr-orange:#DE7C00; }
*{box-sizing:border-box;}
body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#1f2430;background:#fff;font-size:13px;}
#wrap{padding:16px 20px 40px;max-width:100%;}
h1{font-size:17px;font-weight:600;margin:0 0 2px;}
.sub{color:#6b7280;font-size:12px;margin:0 0 14px;}
.toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:14px;padding:10px 12px;background:#f7f7f8;border:1px solid #e5e5e8;border-radius:8px;}
.toolbar label{font-size:12px;color:#4b5563;display:flex;align-items:center;gap:6px;}
.toolbar input[type=number]{width:52px;padding:3px 5px;border:1px solid #d1d5db;border-radius:5px;font-size:12px;}
button{font-family:inherit;font-size:12px;padding:5px 10px;border-radius:6px;border:1px solid #d1d5db;background:#fff;cursor:pointer;color:#1f2430;}
button:hover{background:#f2f2f4;}
button.primary{background:#1f2430;color:#fff;border-color:#1f2430;}
button.primary:hover{background:#333a4a;}
button.danger{border-color:#e3b3b3;color:#a12c2c;}
button.danger:hover{background:#fbecec;}
.grid-outer{overflow:auto;max-height:65vh;border:1px solid #e5e5e8;border-radius:8px;position:relative;}
.grid{position:relative;}
.row{display:grid;align-items:stretch;height:32px;border-bottom:1px solid #eee;}
.row.headerrow{position:sticky;top:0;background:#fff;z-index:3;border-bottom:1px solid #ddd;}
.label{display:flex;align-items:center;gap:4px;padding:0 6px 0 8px;border-right:1px solid #eee;background:#fff;position:sticky;left:0;z-index:2;overflow:hidden;}
.row.headerrow .label{z-index:4;}
.label input.name{border:none;background:transparent;font-size:12px;padding:2px 2px;width:100%;border-radius:4px;min-width:0;}
.label input.name:hover, .label input.name:focus{background:#f0f1f3;outline:none;}
.modulelabel{cursor:pointer;}
.modulelabel input.name{font-weight:600;}
.swatch{width:9px;height:9px;border-radius:2px;flex:0 0 auto;}
.chevron{flex:0 0 auto;width:12px;font-size:10px;color:#9aa1ac;}
.durbadge{flex:0 0 auto;font-size:10px;color:#9aa1ac;background:#f0f1f3;border-radius:4px;padding:1px 5px;white-space:nowrap;}
.warnicon{flex:0 0 auto;color:#c0392b;font-size:12px;}
.icobtn{flex:0 0 auto;width:18px;height:18px;border:none;background:transparent;color:#9aa1ac;cursor:pointer;font-size:13px;line-height:1;border-radius:4px;padding:0;}
.icobtn:hover{background:#eceef1;color:#a12c2c;}
.icobtn.add:hover{color:#2b6cb0;background:#eaf2fb;}
.draghandle{flex:0 0 auto;width:14px;height:18px;display:flex;align-items:center;justify-content:center;color:#9aa1ac;cursor:grab;font-size:12px;line-height:1;}
.draghandle:hover{color:#4b5563;}
.dragging{opacity:0.4;}
.dragover-before{box-shadow: inset 0 2px 0 0 #2b6cb0;}
.dragover-after{box-shadow: inset 0 -2px 0 0 #2b6cb0;}
.moduleband.dragover-module{box-shadow: inset 0 0 0 2px #2b6cb0;}
tr.dragover-before td{box-shadow: inset 0 2px 0 0 #2b6cb0;}
tr.dragover-after td{box-shadow: inset 0 -2px 0 0 #2b6cb0;}
.subcard.dragging{opacity:0.4;}
.subcard.dragover-before{box-shadow: inset 0 2px 0 0 #2b6cb0;}
.subcard.dragover-after{box-shadow: inset 0 -2px 0 0 #2b6cb0;}
.moveselect{font-size:10.5px;padding:1px 3px;border:1px solid #d1d5db;border-radius:4px;background:#fff;max-width:110px;flex:0 0 auto;}
.selchk{flex:0 0 auto;width:13px;height:13px;margin-right:2px;cursor:pointer;}
.selectedrow{background:#eaf2fb;}
.selectedrow .label{background:#eaf2fb;}
.selbar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:10px;padding:8px 10px;background:#eaf2fb;border:1px solid #bcd8f2;border-radius:8px;font-size:12px;color:#1f4e79;}
.selbar input[type=number]{width:56px;padding:3px 5px;border:1px solid #bcd8f2;border-radius:5px;font-size:12px;}
.week{border-right:1px solid #f0f0f1;cursor:pointer;position:relative;}
.week:hover{background:#f4f6f8;}
.week.filled{background:var(--c,#94a3b8);}
.week.filled:hover{filter:brightness(0.92);}
.week.violated{outline:2px solid #c0392b;outline-offset:-2px;}
.week.filled.criticalcell{box-shadow: inset 0 0 0 2px #6b46c1;}
.critpathinfo{font-size:11px;color:#6b46c1;white-space:nowrap;}
.critpathinfo.criterror{color:#c0392b;}
.moduleband .week{background:var(--bandc,#fff);cursor:default;}
.weeknum{display:flex;align-items:center;justify-content:center;font-size:10px;color:#9aa1ac;border-right:1px solid #f0f0f1;}
.row.hitosrow{height:14px;position:sticky;top:32px;background:#fafbfc;z-index:3;border-bottom:1px solid #eee;}
.hitoscell{display:flex;align-items:center;justify-content:center;gap:1px;border-right:1px solid #f0f0f1;font-size:8px;line-height:1;cursor:default;}
.hitomark{line-height:1;}
.hitomark.hitocobro{color:#2e7d43;}
.hitomark.hitopago{color:var(--pr-orange);}
.handle{position:absolute;top:2px;bottom:2px;width:6px;cursor:ew-resize;background:rgba(0,0,0,0.18);border-radius:2px;}
.handle.right{right:0;}
.handle.left{left:0;}
.handle:hover{background:rgba(0,0,0,0.4);}
.depsbox{margin-top:16px;}
.depsbox h3{font-size:12px;font-weight:600;color:#4b5563;margin:0;text-transform:uppercase;letter-spacing:.03em;}
.depsheader{display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none;margin-bottom:8px;}
.depform{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:10px;padding:8px 10px;background:#f7f7f8;border:1px solid #e5e5e8;border-radius:8px;}
.depform select, .depform input[type=number]{font-family:inherit;font-size:12px;padding:4px 6px;border:1px solid #d1d5db;border-radius:5px;background:#fff;}
.depform select{max-width:190px;}
.depform input[type=number]{width:58px;}
.depform .arrowtxt{color:#9aa1ac;font-size:14px;}
.banner{display:flex;align-items:flex-start;gap:8px;font-size:12px;padding:8px 10px;border-radius:8px;margin-bottom:10px;}
.banner.bad{background:#fbecec;color:#a12c2c;border:1px solid #f0caca;}
.banner.ok{background:#eef7f0;color:#2e7d43;border:1px solid #cdead4;}
.deptoolbar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:8px;}
.deptoolbar input[type=text]{font-family:inherit;font-size:12px;padding:5px 8px;border:1px solid #d1d5db;border-radius:5px;flex:1 1 220px;min-width:160px;}
.deptoolbar select{font-family:inherit;font-size:12px;padding:5px 8px;border:1px solid #d1d5db;border-radius:5px;}
.depcount{font-size:11px;color:#9aa1ac;white-space:nowrap;}
.deptable-wrap{overflow-x:auto;border:1px solid #e5e5e8;border-radius:8px;}
.deptable{width:100%;border-collapse:collapse;font-size:12px;}
.deptable th{text-align:left;font-size:10px;color:#6b7280;text-transform:uppercase;letter-spacing:.03em;padding:7px 8px;border-bottom:1px solid #ddd;cursor:pointer;white-space:nowrap;background:#f7f7f8;position:sticky;top:0;}
.deptable th:hover{color:#1f2430;}
.deptable th .sortarrow{font-size:9px;margin-left:3px;color:#2b6cb0;}
.deptable td{padding:5px 8px;border-bottom:1px solid #f0f0f1;vertical-align:middle;}
.deptable tbody tr:hover td{background:#fafbfc;}
.deptable tr.violated td{background:#fdf2f2;}
.deptable tr.violated:hover td{background:#fbe8e8;}
.deptable select{font-family:inherit;font-size:11px;padding:3px 5px;border:1px solid #d1d5db;border-radius:4px;background:#fff;max-width:230px;width:100%;}
.deptable input[type=number]{font-family:inherit;font-size:11px;padding:3px 4px;border:1px solid #d1d5db;border-radius:4px;background:#fff;width:44px;}
.deptable td.actioncell{text-align:right;}
.deptable td.actioncell button{padding:2px 7px;}
.statusbadge{font-size:10px;border-radius:4px;padding:2px 7px;white-space:nowrap;display:inline-block;}
.statusbadge.bad{color:#a12c2c;background:#fbe0e0;}
.statusbadge.ok{color:#2e7d43;background:#e1f2e6;}
.legend{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px;font-size:11px;color:#6b7280;}
.legend span{display:inline-flex;align-items:center;gap:4px;}
.legenddot{width:8px;height:8px;border-radius:2px;}
.empty{color:#9aa1ac;font-size:12px;padding:6px 8px;}
.financebox{margin-top:16px;border:1px solid #e5e5e8;border-radius:8px;}
.financeheader{display:flex;align-items:center;gap:8px;padding:10px 12px;background:#f7f7f8;cursor:pointer;user-select:none;border-radius:8px 8px 0 0;}
.financeheader h3{font-size:12px;font-weight:600;color:#1f2430;text-transform:uppercase;letter-spacing:.03em;}
.finhint{font-size:11px;color:#9aa1ac;font-weight:400;text-transform:none;letter-spacing:0;}
#financeBody{padding:14px 16px;}
.finsection{margin-bottom:18px;}
.finsection:last-child{margin-bottom:0;}
.finsection h4{font-size:11px;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:.03em;margin:0;}
.finsubheader{display:flex;align-items:center;gap:7px;cursor:pointer;user-select:none;margin-bottom:8px;}
.finsubheader .chevron{width:10px;font-size:11px;}
.finsubheader:hover h4{color:#1f2430;}
.kpirow{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;}
.kpicard{background:#fff;border-radius:8px;padding:10px 12px;border:1px solid #ececec;border-left:4px solid var(--pr-orange);box-shadow:0 1px 4px rgba(51,63,72,0.08);}
.kpicard label{display:block;font-size:10.5px;color:#6b7280;margin-bottom:4px;}
.kpicard input[type=number]{width:100%;font-family:inherit;font-size:14px;font-weight:600;border:none;background:transparent;padding:0;color:#1f2430;}
.kpicard input[type=number]:focus{outline:none;}
.kpicard .kpihint{font-size:10px;color:#9aa1ac;margin-top:3px;}
.kpicard.computed{border-left-color:var(--pr-blue);}
.kpicard.computed .kpival{font-size:14px;font-weight:700;color:var(--pr-blue);}
.kpicard.computed .kpivalempty{font-size:12px;font-weight:400;color:#9aa1ac;}
.fintable{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:8px;}
.fintable th{text-align:left;font-size:10px;color:#6b7280;text-transform:uppercase;letter-spacing:.03em;padding:5px 6px;border-bottom:1px solid #ddd;}
.fintable td{padding:4px 6px;border-bottom:1px solid #f0f0f1;vertical-align:middle;}
.fintable input[type=text], .fintable input[type=number], .fintable select{font-family:inherit;font-size:11.5px;padding:3px 5px;border:1px solid #d1d5db;border-radius:4px;background:#fff;width:100%;}
.fintable input[type=number]{width:100px;}
.fintable select{max-width:230px;}
.fintable td.actioncell{text-align:right;white-space:nowrap;}
.fintable td.actioncell button{padding:2px 7px;}
.fintable .weektag{font-size:10.5px;color:#6b7280;}
.fintable .weektag.weekwarn{color:#c0392b;font-weight:600;cursor:help;}
.pctbadge{font-size:11px;margin:2px 0 8px;padding:3px 8px;border-radius:5px;display:inline-block;}
.pctbadge.pctok{color:#2e7d43;background:rgba(46,125,67,0.08);}
.pctbadge.pctwarn{color:#c0392b;background:rgba(192,57,43,0.08);}
.currencyinput{width:64px !important;text-transform:uppercase;}
.currencywarn{font-size:10.5px;color:#c0392b;cursor:help;white-space:nowrap;}
.convertedhint{white-space:nowrap;font-style:italic;}
.dirindicator{font-size:11px;color:#6b7280;white-space:nowrap;}
.dirindicator.dirset{color:#2e7d43;}
.chartwrap{position:relative;height:220px;}
.finaddbtn{margin-top:2px;}
.fincashsummary{display:flex;flex-wrap:wrap;gap:16px;font-size:12px;color:#4b5563;margin-top:8px;}
.fincashsummary b{color:#1f2430;}
.fintotalrow{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
.fintotallabel{font-size:11.5px;color:#4b5563;font-weight:600;white-space:nowrap;}
.fintotalrow input[type=number]{width:150px;font-family:inherit;font-size:12px;padding:4px 6px;border:1px solid #d1d5db;border-radius:5px;background:#fff;}
.fintotalwrap{display:flex;align-items:center;gap:6px;font-size:11.5px;color:#4b5563;white-space:nowrap;}
.fintotalwrap input[type=number]{width:120px;font-family:inherit;font-size:12px;padding:4px 6px;border:1px solid #d1d5db;border-radius:5px;background:#fff;}
.subcard{border:1px solid #ececec;border-left:4px solid var(--pr-orange);border-radius:8px;padding:10px 12px;margin-bottom:10px;background:#fff;box-shadow:0 1px 4px rgba(51,63,72,0.08);}
.subcardhead{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:8px;}
.subcardhead input.subname{font-family:inherit;font-size:12.5px;font-weight:600;padding:4px 6px;border:1px solid #d1d5db;border-radius:5px;flex:1 1 200px;min-width:160px;}
.assoccombo{position:relative;min-width:180px;display:flex;align-items:center;gap:2px;}
.assoccombo-input{font-family:inherit;font-size:11.5px;padding:3px 5px;border:1px solid #d1d5db;border-radius:4px;background:#fff;width:100%;}
.assoccombo-clear{flex:0 0 auto;width:18px;height:18px;padding:0;font-size:12px;line-height:1;border:none;background:transparent;color:#9aa1ac;cursor:pointer;border-radius:4px;}
.assoccombo-clear:hover{background:#eceef1;color:#a12c2c;}
.assoccombo-list{position:absolute;top:100%;left:0;right:0;z-index:20;background:#fff;border:1px solid #d1d5db;border-radius:6px;box-shadow:0 4px 14px rgba(0,0,0,0.14);max-height:200px;overflow-y:auto;margin-top:2px;}
.assoccombo-opt{padding:5px 8px;font-size:11.5px;cursor:pointer;white-space:nowrap;}
.assoccombo-opt:hover{background:#eaf2fb;}
.assoccombo-opt-module{font-weight:600;background:#f7f7f8;}
.assoccombo-empty{padding:6px 8px;font-size:11.5px;color:#9aa1ac;}
</style>
</head>
<body>
<div id="wrap">
  <h1>DESLOG 253795 Watts — Carta Gantt interactiva (borrador)</h1>
  <p class="sub">Semanas contadas desde la Orden de Compra (Semana 1 = OC). Click en un cuadro vacío extiende la barra; click en el borde de una barra la achica. Arrastra los tiradores de los extremos para mover inicio o fin. Los cambios se guardan solos en este navegador; usa "Guardar archivo" para respaldar o compartir con otra persona.</p>
  <div class="toolbar">
    <label>Semanas totales <input type="number" id="weeksInput" min="8" max="80" value="40"></label>
    <button id="addModuleBtn">+ Módulo</button>
    <button id="collapseAllBtn">Agrupar todos</button>
    <button id="expandAllBtn">Desagrupar todos</button>
    <button id="saveFileBtn" class="primary">Guardar archivo</button>
    <button id="loadFileBtn">Cargar archivo</button>
    <input type="file" id="loadFileInput" accept=".json" style="display:none;">
    <button id="exportBtn">Exportar a Excel</button>
    <button id="chooseDirBtn">📁 Elegir carpeta de proyectos</button>
    <span id="projectsDirIndicator" class="dirindicator"></span>
    <label>Ruta crítica
      <select id="critPathMode">
        <option value="">Ninguna</option>
        <option value="cpm">CPM clásico (duración + dependencias)</option>
        <option value="actual">Recomendación (cronograma actual + dependencias)</option>
      </select>
    </label>
    <span id="critPathInfo" class="critpathinfo"></span>
    <button id="resetBtn" class="danger">Restaurar borrador inicial</button>
  </div>
  <div class="selbar" id="selBar" style="display:none;"></div>
  <div class="grid-outer"><div class="grid" id="grid"></div></div>
  <div class="depsbox">
    <div class="depsheader" id="depsHeader">
      <span class="chevron" id="depsChevron">▾</span>
      <h3 style="margin:0;">Dependencias</h3>
    </div>
    <div id="depsBody">
    <div id="depsBanner"></div>
    <div class="depform">
      <select id="depFrom"></select>
      <select id="depType"></select>
      <span class="arrowtxt">+</span>
      <input type="number" id="depDelay" value="0" title="Delay en días (puede ser 0)">
      <span style="font-size:11px;color:#9aa1ac;">día(s) →</span>
      <select id="depTo"></select>
      <button id="addDepBtn" class="primary">Agregar dependencia</button>
    </div>
    <div class="deptoolbar">
      <input type="text" id="depFilterText" placeholder="Filtrar por módulo o actividad...">
      <select id="depFilterEstado">
        <option value="">Todas</option>
        <option value="bad">Solo incumplidas</option>
        <option value="ok">Solo cumplidas</option>
      </select>
      <span class="depcount" id="depCount"></span>
    </div>
    <div class="deptable-wrap">
      <table class="deptable" id="depsTable">
        <thead>
          <tr>
            <th data-key="origen">Origen (módulo › actividad) <span class="sortarrow"></span></th>
            <th data-key="tipo">Tipo de restricción <span class="sortarrow"></span></th>
            <th data-key="delay">Delay <span class="sortarrow"></span></th>
            <th data-key="destino">Destino (módulo › actividad) <span class="sortarrow"></span></th>
            <th data-key="estado">Estado <span class="sortarrow"></span></th>
            <th></th>
          </tr>
        </thead>
        <tbody id="depsTbody"></tbody>
      </table>
    </div>
    <div id="depsEmpty" class="empty" style="display:none;"></div>
    </div>
  </div>
  <div class="financebox">
    <div class="financeheader" id="financeHeader">
      <span class="chevron" id="financeChevron">▸</span>
      <h3 style="margin:0;">Financiero (opcional)</h3>
      <span class="finhint">costos, HH, hitos de cobro/pago a proveedores y flujo de caja — nada de esto es obligatorio</span>
    </div>
    <div id="financeBody" style="display:none;"></div>
  </div>
  <div class="legend" id="legend"></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.js" integrity="sha384-iU8HYtnGQ8Cy4zl7gbNMOhsDTTKX02BTXptVP/vqAWIaTfM7isw76iyZCsjL2eVi" crossorigin="anonymous"></script>
<script>
var LABEL_W = 280;
var COL_W = 26;

var COLORS = ["#5DCAA5","#7F77DD","#D85A30","#378ADD","#EF9F27","#D4537E","#639922","#888780"];
var colorIdx = 0;
function nextColor(){ var c = COLORS[colorIdx % COLORS.length]; colorIdx++; return c; }
function uid(prefix){ return prefix + "_" + Math.random().toString(36).slice(2,9); }

function defaultState(){
  colorIdx = 0;
  function mod(name, color, acts){
    return { id: uid("mod"), name: name, color: color, collapsed:false, activities: acts.map(function(a){
      return { id: uid("act"), name: a[0], start: a[1], end: a[2], hh: null };
    })};
  }
  var m_design   = mod("Ingeniería / Diseño general", nextColor(), [["Diseño general del proyecto (layout, interfaces)",0,3]]);
  var m_robots   = mod("Robots (KUKA R1, R2, R3)", nextColor(), [
    ["Diseño mecánico / aplicación",4,7],
    ["Compras (lead time KUKA: 14 sem.)",3,17],
    ["Armado",17,20],
    ["Programación",19,22],
    ["Pruebas internas",22,24]
  ]);
  var m_grippers = mod("Grippers, apilador y alimentador de pallets (subcontrato KTF)", nextColor(), [
    ["Ingeniería y compras (KTF)",4,10],
    ["Fabricación (KTF)",8,14],
    ["Montaje y pruebas en taller (KTF)",14,16],
    ["Integración con robots (Proapsis)",18,20]
  ]);
  var m_entrada  = mod("Circuito de pallet de entrada", nextColor(), [
    ["Diseño",4,7], ["Compras",3,9], ["Armado",9,12], ["Programación",11,13], ["Pruebas internas",13,14]
  ]);
  var m_salida   = mod("Circuito de pallet de salida c/ enfilmadora", nextColor(), [
    ["Diseño",4,7], ["Compras",3,9], ["Armado",9,12], ["Programación",11,13]
  ]);
  var m_enfilm   = mod("Enfilmadora", nextColor(), [
    ["Diseño",4,7], ["Compras",3,9], ["Armado",9,12]
  ]);
  var m_cajas    = mod("Circuito de cajas (descarte, etiquetado y sellado)", nextColor(), [
    ["Diseño",4,7], ["Compras",4,11], ["Fabricación",9,12], ["Armado",12,15], ["Programación",14,16], ["Pruebas internas",16,17]
  ]);
  var m_seg      = mod("Seguridad", nextColor(), [
    ["Diseño",4,6], ["Compras",4,9], ["Armado",12,14], ["Programación",13,14]
  ]);
  var m_control  = mod("Control", nextColor(), [
    ["Compras",4,8], ["Programación",6,22], ["Armado (tablero)",12,14]
  ]);
  var m_integ    = mod("Integración y cierre", nextColor(), [
    ["FAT",25,27], ["Transporte e instalación en planta",28,30], ["SAT (puesta en marcha)",31,33], ["Documentación",34,37]
  ]);
  var m_sup      = mod("Supervisión del proyecto", "#B4B2A9", [
    ["Supervisión del proyecto (todo el proyecto)",0,37]
  ]);

  var modules = [m_design, m_robots, m_grippers, m_entrada, m_salida, m_enfilm, m_cajas, m_seg, m_control, m_integ, m_sup];
  function findAct(mod, name){ for (var i=0;i<mod.activities.length;i++) if (mod.activities[i].name===name) return mod.activities[i].id; }

  var deps = [];
  function dep(fromAct, toAct, type, delay){ deps.push({ id: uid("dep"), from: fromAct, to: toAct, type: type||"FS", delay: delay||0 }); }
  var designAct = m_design.activities[0].id;
  dep(designAct, findAct(m_robots,"Diseño mecánico / aplicación"));
  dep(designAct, findAct(m_grippers,"Ingeniería y compras (KTF)"));
  dep(designAct, findAct(m_entrada,"Diseño"));
  dep(designAct, findAct(m_salida,"Diseño"));
  dep(designAct, findAct(m_enfilm,"Diseño"));
  dep(designAct, findAct(m_cajas,"Diseño"));
  dep(designAct, findAct(m_seg,"Diseño"));
  dep(designAct, findAct(m_control,"Compras"));
  dep(findAct(m_grippers,"Montaje y pruebas en taller (KTF)"), findAct(m_grippers,"Integración con robots (Proapsis)"), "FS", 2);
  dep(findAct(m_robots,"Pruebas internas"), findAct(m_integ,"FAT"));
  dep(findAct(m_entrada,"Pruebas internas"), findAct(m_integ,"FAT"));
  dep(findAct(m_cajas,"Pruebas internas"), findAct(m_integ,"FAT"));
  dep(findAct(m_seg,"Programación"), findAct(m_integ,"FAT"));
  dep(findAct(m_control,"Programación"), findAct(m_integ,"FAT"));
  dep(findAct(m_integ,"FAT"), findAct(m_integ,"Transporte e instalación en planta"));
  dep(findAct(m_integ,"Transporte e instalación en planta"), findAct(m_integ,"SAT (puesta en marcha)"));
  dep(findAct(m_integ,"SAT (puesta en marcha)"), findAct(m_integ,"Documentación"));

  return { weeks: 40, modules: modules, deps: deps, finance: defaultFinance() };
}

function defaultFinance(){
  return {
    clientContract: { total: null, currency: null, milestones: [] },
    materials: { total: null, currency: null, milestones: [] },
    hhManualTotal: null,
    hhRate: null,
    hhRateCurrency: "UF",
    subcontracts: [],
    mainCurrency: "CLP",
    currencies: [{ code: "UF", rate: null }],
    collapsed: true,
    sectionsCollapsed: { hh: true }
  };
}

var STORAGE_KEY = "deslog253795-watts-gantt-v2";
var OLD_KEY = "deslog253795-watts-gantt-v1";

function migrate(st){
  if (!Array.isArray(st.modules)) st.modules = [];
  st.modules.forEach(function(m){
    if (typeof m.id === "undefined" || m.id === null) m.id = uid("mod");
    if (typeof m.name === "undefined" || m.name === null) m.name = "Módulo sin nombre";
    if (typeof m.color === "undefined" || m.color === null) m.color = nextColor();
    if (typeof m.collapsed === "undefined") m.collapsed = false;
    if (!Array.isArray(m.activities)) m.activities = [];
    m.activities.forEach(function(a){
      if (a.cells){
        if (a.cells.length){ a.start = Math.min.apply(null,a.cells); a.end = Math.max.apply(null,a.cells); }
        else { a.start = null; a.end = null; }
        delete a.cells;
      }
      if (typeof a.id === "undefined" || a.id === null) a.id = uid("act");
      if (typeof a.name === "undefined" || a.name === null) a.name = "Actividad sin nombre";
      if (typeof a.start === "undefined") a.start = null;
      if (typeof a.end === "undefined") a.end = null;
      if (typeof a.hh === "undefined") a.hh = null;
    });
  });
  (st.deps||[]).forEach(function(d){
    if (!d.type) d.type = "FS";
    if (typeof d.delay !== "number") d.delay = 0;
  });
  if (!st.deps) st.deps = [];
  if (typeof st.depsCollapsed === "undefined") st.depsCollapsed = false;

  // semanas: si falta o es inválida, o si hay actividades que se salen del rango, se ajusta sola
  var maxEnd = -1;
  st.modules.forEach(function(m){ m.activities.forEach(function(a){ if (a.end !== null && a.end > maxEnd) maxEnd = a.end; }); });
  if (typeof st.weeks !== "number" || isNaN(st.weeks) || st.weeks < 1){
    st.weeks = Math.max(8, maxEnd + 1, 40);
  } else if (maxEnd >= st.weeks){
    st.weeks = maxEnd + 1;
  }
  if (st.weeks > 80) st.weeks = 80;
  if (st.weeks < 8) st.weeks = 8;

  if (!st.finance) st.finance = defaultFinance();
  var fin = st.finance;

  // legacy: materialsCost was a flat number -> now materials.total
  if (typeof fin.materialsCost !== "undefined"){
    if (!fin.materials) fin.materials = { total: fin.materialsCost, milestones: [] };
    delete fin.materialsCost;
  }
  if (!fin.materials) fin.materials = { total: null, currency: null, milestones: [] };
  if (typeof fin.materials.total === "undefined") fin.materials.total = null;
  if (typeof fin.materials.currency === "undefined") fin.materials.currency = null;
  if (!Array.isArray(fin.materials.milestones)) fin.materials.milestones = [];

  if (!fin.clientContract) fin.clientContract = { total: null, currency: null, milestones: [] };
  if (typeof fin.clientContract.total === "undefined") fin.clientContract.total = null;
  if (typeof fin.clientContract.currency === "undefined") fin.clientContract.currency = null;
  if (!Array.isArray(fin.clientContract.milestones)) fin.clientContract.milestones = [];

  if (typeof fin.hhManualTotal === "undefined") fin.hhManualTotal = null;
  if (typeof fin.hhRate === "undefined") fin.hhRate = null;
  // Archivos antiguos (de antes de que existiera este campo) que ya tenían un
  // "Valor HH" numérico se asumen en CLP (implícito, igual que otros bloques) para
  // no reinterpretar silenciosamente un valor ya cargado como si fuera otra moneda.
  // Solo un proyecto realmente nuevo (sin valor HH todavía) sugiere UF por defecto.
  if (typeof fin.hhRateCurrency === "undefined"){
    fin.hhRateCurrency = (typeof fin.hhRate === "number") ? null : "UF";
  }
  if (!Array.isArray(fin.subcontracts)) fin.subcontracts = [];
  if (typeof fin.collapsed === "undefined") fin.collapsed = true;
  if (!fin.sectionsCollapsed || typeof fin.sectionsCollapsed !== "object") fin.sectionsCollapsed = { hh: true };
  if (typeof fin.sectionsCollapsed.hh === "undefined") fin.sectionsCollapsed.hh = true;
  if (typeof fin.mainCurrency === "undefined" || !fin.mainCurrency) fin.mainCurrency = "CLP";
  if (!Array.isArray(fin.currencies)) fin.currencies = [];
  fin.currencies.forEach(function(c){
    if (typeof c.code === "undefined" || c.code === null) c.code = "";
    if (typeof c.rate !== "number") c.rate = null;
  });

  function migrateMilestone(ms){
    if (typeof ms.id === "undefined") ms.id = uid("ms");
    if (typeof ms.desc === "undefined") ms.desc = "";
    if (typeof ms.pct !== "number") ms.pct = null;
    if (typeof ms.assocKind === "undefined") ms.assocKind = null;
    if (typeof ms.assocId === "undefined") ms.assocId = null;
    if (!ms.moment) ms.moment = "start";
    if (typeof ms.manualWeek !== "number") ms.manualWeek = null;
    return ms;
  }

  fin.subcontracts.forEach(function(s){
    if (typeof s.id === "undefined") s.id = uid("sc");
    if (typeof s.name === "undefined") s.name = "";
    if (typeof s.amount !== "number") s.amount = null;
    if (typeof s.currency === "undefined") s.currency = null;
    if (!Array.isArray(s.milestones)) s.milestones = [];
    s.milestones.forEach(migrateMilestone);
  });

  // legacy: flat finance.milestones[] (type cobro/pago, actId, amount) -> grouped structure with pct
  if (Array.isArray(fin.milestones)){
    fin.milestones.forEach(function(old){
      var nm = migrateMilestone({
        id: old.id,
        desc: old.desc,
        pct: null,
        assocKind: old.actId ? "activity" : null,
        assocId: old.actId || null,
        moment: old.moment,
        manualWeek: old.manualWeek
      });
      if (typeof old.amount === "number") nm.legacyAmount = old.amount;
      if (old.type === "cobro") fin.clientContract.milestones.push(nm);
      else fin.materials.milestones.push(nm);
    });
    delete fin.milestones;
  }

  fin.clientContract.milestones.forEach(migrateMilestone);
  fin.materials.milestones.forEach(migrateMilestone);

  return st;
}

var state = null;
try {
  var raw = localStorage.getItem(STORAGE_KEY);
  if (raw) state = JSON.parse(raw);
  else {
    var oldRaw = localStorage.getItem(OLD_KEY);
    if (oldRaw) state = JSON.parse(oldRaw);
  }
} catch(e) {}
if (!state) state = defaultState();
state = migrate(state);

var drag = null;       // {actId, mode:'create', anchor}
var resizeDrag = null; // {actId, side:'left'|'right'}
var selected = {};     // actId -> true (transient, not persisted)

function selectedIds(){ return Object.keys(selected).filter(function(id){ return selected[id]; }); }
function moduleSelectionState(m){
  var n = m.activities.length, sel = 0;
  m.activities.forEach(function(a){ if (selected[a.id]) sel++; });
  if (n===0 || sel===0) return "none";
  if (sel===n) return "all";
  return "some";
}
function toggleModule(m, checked){
  m.activities.forEach(function(a){ if (checked) selected[a.id]=true; else delete selected[a.id]; });
}
function clearSelection(){ selected = {}; render(); }
function shiftSelection(deltaWeeks){
  var ids = selectedIds().map(findActivity).filter(function(f){ return f && f.act.start!==null; });
  if (!ids.length || !deltaWeeks) return;
  var minStart = Math.min.apply(null, ids.map(function(f){ return f.act.start; }));
  var maxEnd = Math.max.apply(null, ids.map(function(f){ return f.act.end; }));
  var lo = -minStart, hi = (state.weeks-1) - maxEnd;
  var eff = Math.max(lo, Math.min(hi, deltaWeeks));
  ids.forEach(function(f){ f.act.start += eff; f.act.end += eff; });
  save(); render();
  if (eff !== deltaWeeks){
    var msg = document.getElementById("selBarMsg");
    if (msg) msg.textContent = "Se aplicó un desplazamiento de " + eff + " semana(s) (ajustado para no salir de la grilla).";
  }
}

function save(){
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e) {}
}

function findActivity(actId){
  for (var i=0;i<state.modules.length;i++){
    var m = state.modules[i];
    for (var j=0;j<m.activities.length;j++){
      if (m.activities[j].id === actId) return { mod:m, act:m.activities[j], idx:j };
    }
  }
  return null;
}
function allActivitiesFlat(){
  var out = [];
  state.modules.forEach(function(m){ m.activities.forEach(function(a){ out.push({mod:m, act:a}); }); });
  return out;
}

// ---- reordenar / mover / convertir actividades y módulos ----
function findModuleById(modId){
  for (var i=0;i<state.modules.length;i++){ if (state.modules[i].id === modId) return state.modules[i]; }
  return null;
}
function moveActivityUpDown(modId, actId, dir){
  var m = findModuleById(modId);
  if (!m) return;
  var idx = m.activities.findIndex(function(a){ return a.id === actId; });
  if (idx < 0) return;
  var newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= m.activities.length) return;
  var tmp = m.activities[idx]; m.activities[idx] = m.activities[newIdx]; m.activities[newIdx] = tmp;
  save(); render();
}
function moveActivityToModule(actId, targetModId){
  var found = findActivity(actId);
  if (!found) return;
  if (found.mod.id === targetModId) return;
  var target = findModuleById(targetModId);
  if (!target) return;
  found.mod.activities.splice(found.idx, 1);
  target.activities.push(found.act);
  save(); render();
}
// Actividad → módulo nuevo que contiene solo esa actividad.
function convertActivityToModule(actId){
  var found = findActivity(actId);
  if (!found) return;
  var srcIdx = state.modules.indexOf(found.mod);
  found.mod.activities.splice(found.idx, 1);
  var newMod = { id: uid("mod"), name: found.act.name || "Nuevo módulo", color: nextColor(), collapsed:false, activities:[found.act] };
  state.modules.splice(srcIdx+1, 0, newMod);
  save(); render();
}
// Módulo (con una sola actividad) → esa actividad pasa a otro módulo existente,
// y el módulo (ahora vacío) se elimina.
function convertModuleToActivityIn(modId, targetModId){
  var m = findModuleById(modId);
  if (!m || m.activities.length !== 1) return;
  var target = findModuleById(targetModId);
  if (!target || target === m) return;
  target.activities.push(m.activities[0]);
  state.modules = state.modules.filter(function(x){ return x !== m; });
  save(); render();
}
// Helper genérico de reordenamiento: sube/baja un elemento dentro de un arreglo
// (usado para dependencias, hitos de pago y subcontratos). Devuelve true si movió algo.
function moveArrayItem(arr, item, dir){
  var idx = arr.indexOf(item);
  if (idx < 0) return false;
  var newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= arr.length) return false;
  var tmp = arr[idx]; arr[idx] = arr[newIdx]; arr[newIdx] = tmp;
  return true;
}
// Helper genérico para arrastrar-y-soltar: mueve \`item\` justo antes/después de
// \`refItem\` dentro del mismo arreglo (usado para dependencias y subcontratos).
function moveArrayItemRelative(arr, item, refItem, before){
  if (item === refItem) return false;
  var idx = arr.indexOf(item);
  if (idx < 0) return false;
  arr.splice(idx, 1);
  var refIdx = arr.indexOf(refItem);
  if (refIdx < 0){ arr.splice(idx, 0, item); return false; }
  arr.splice(before ? refIdx : refIdx+1, 0, item);
  return true;
}
// Select reutilizable para elegir un módulo destino (usado para mover actividades
// y para convertir un módulo de una sola actividad en actividad de otro módulo).
function buildModuleTargetSelect(excludeModId, placeholderText, onSelect){
  var sel = el("select","moveselect");
  var ph = el("option",null,{text:placeholderText}); ph.value = "";
  sel.appendChild(ph);
  state.modules.forEach(function(m){
    if (m.id === excludeModId) return;
    var o = el("option",null,{text:m.name || "(sin nombre)"}); o.value = m.id;
    sel.appendChild(o);
  });
  sel.addEventListener("click", function(ev){ ev.stopPropagation(); });
  sel.addEventListener("change", function(){
    var v = sel.value;
    if (v) onSelect(v);
  });
  return sel;
}

// ---- Arrastrar y soltar actividades: reordenar dentro de un módulo y mover entre módulos ----
var dragSrc = null; // { actId } de la actividad que se está arrastrando
var dragDepId = null;  // id de la dependencia que se está arrastrando (tabla de Dependencias)
var dragSubId = null;  // id del subcontrato que se está arrastrando (tarjetas de Subcontratos)

// Mueve la actividad \`actId\` justo antes/después de \`refActId\`, cambiándola de
// módulo si \`refActId\` pertenece a otro. No hace nada si son la misma actividad.
function moveActivityRelative(actId, refActId, before){
  if (actId === refActId) return false;
  var src = findActivity(actId);
  var ref = findActivity(refActId);
  if (!src || !ref) return false;
  src.mod.activities.splice(src.idx, 1);
  var ref2 = findActivity(refActId); // reubicar: su índice puede haber cambiado si era el mismo módulo
  if (!ref2) return false;
  var insertIdx = before ? ref2.idx : ref2.idx + 1;
  ref2.mod.activities.splice(insertIdx, 0, src.act);
  save();
  return true;
}
// Mueve la actividad al final de otro módulo (soltar sobre la banda del módulo).
function moveActivityToModuleEnd(actId, targetModId){
  var src = findActivity(actId);
  var target = findModuleById(targetModId);
  if (!src || !target) return false;
  if (src.mod.id === targetModId) return false;
  src.mod.activities.splice(src.idx, 1);
  target.activities.push(src.act);
  save();
  return true;
}

function el(tag, cls, attrs){
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (attrs) for (var k in attrs) { if (k==="text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); }
  return e;
}
function colTemplate(){ return LABEL_W + "px repeat(" + state.weeks + ", " + COL_W + "px)"; }

function durationOf(a){ return (a.start===null || a.end===null) ? null : (a.end - a.start + 1); }
function durationLabel(a){ var d = durationOf(a); return d===null ? "" : (d + (d===1?" sem":" sem")); }
function moduleSpan(m){
  var mn=null, mx=null;
  m.activities.forEach(function(a){
    if (a.start===null) return;
    if (mn===null || a.start<mn) mn=a.start;
    if (mx===null || a.end>mx) mx=a.end;
  });
  if (mn===null) return null;
  return { start:mn, end:mx, dur: mx-mn+1 };
}

// ---- dependency validation ----
// day scale: start of week w = w*7 ; finish instant of activity ending at week e = (e+1)*7
function computeViolations(){
  var violated = {}; // depId -> detail string
  var badActs = {};  // actId -> true
  state.deps.forEach(function(d){
    var f = findActivity(d.from), t = findActivity(d.to);
    if (!f || !t) return;
    var fa = f.act, ta = t.act;
    if (fa.start===null || ta.start===null) return;
    var fStart = fa.start*7, fEnd = (fa.end+1)*7;
    var tStart = ta.start*7, tEnd = (ta.end+1)*7;
    var delay = d.delay||0;
    var required, actualLhs, label;
    if (d.type === "SS"){ required = fStart + delay; actualLhs = tStart; label="inicio"; }
    else if (d.type === "FF"){ required = fEnd + delay; actualLhs = tEnd; label="fin"; }
    else { required = fEnd + delay; actualLhs = tStart; label="inicio"; } // FS
    if (actualLhs < required){
      var faltan = required - actualLhs;
      violated[d.id] = "faltan " + faltan + " día" + (faltan===1?"":"s") + " (" + label + " destino)";
      badActs[d.from] = true; badActs[d.to] = true;
    }
  });
  return { violated: violated, badActs: badActs };
}

// ---- ruta crítica ----
// Todo el cálculo se hace en "días" (semana*7) para usar el mismo delay (en días)
// que ya usan las dependencias en computeViolations().
var critPathMode = ""; // ""=ninguna | "cpm"=duración+dependencias | "actual"=cronograma actual+dependencias

function buildDepGraph(){
  var succ = {}, pred = {};
  state.deps.forEach(function(d){
    var f = findActivity(d.from), t = findActivity(d.to);
    if (!f || !t) return;
    (succ[d.from] = succ[d.from] || []).push({ to: d.to, type: d.type, delay: d.delay||0 });
    (pred[d.to] = pred[d.to] || []).push({ from: d.from, type: d.type, delay: d.delay||0 });
  });
  return { succ: succ, pred: pred };
}

// Orden topológico (Kahn) sobre el subconjunto nodeIds. Devuelve null si hay un ciclo.
function topoSort(nodeIds, succ){
  var inDeg = {};
  nodeIds.forEach(function(id){ inDeg[id] = 0; });
  nodeIds.forEach(function(id){
    (succ[id]||[]).forEach(function(e){ if (inDeg.hasOwnProperty(e.to)) inDeg[e.to]++; });
  });
  var queue = nodeIds.filter(function(id){ return inDeg[id] === 0; });
  var order = [];
  while (queue.length){
    var id = queue.shift();
    order.push(id);
    (succ[id]||[]).forEach(function(e){
      if (!inDeg.hasOwnProperty(e.to)) return;
      inDeg[e.to]--;
      if (inDeg[e.to] === 0) queue.push(e.to);
    });
  }
  if (order.length !== nodeIds.length) return null;
  return order;
}

// mode: "cpm" (duración de cada actividad + dependencias, ignorando en qué semana
// quedó puesta) o "actual" (las semanas ya asignadas en el Gantt + dependencias,
// para saber qué actividades no tienen ningún margen dado el cronograma actual).
function computeCriticalPath(mode){
  var graph = buildDepGraph();
  var nodeIds = [], dur = {}, actualES = {}, actualEF = {};
  state.modules.forEach(function(m){
    m.activities.forEach(function(a){
      if (a.start === null || a.end === null) return;
      nodeIds.push(a.id);
      dur[a.id] = (a.end - a.start + 1) * 7;
      actualES[a.id] = a.start * 7;
      actualEF[a.id] = (a.end + 1) * 7;
    });
  });
  if (!nodeIds.length) return { critical: {}, projectDurationWeeks: 0, count: 0, ok: true };

  var order = topoSort(nodeIds, graph.succ);
  if (!order){
    return { critical: {}, projectDurationWeeks: null, count: 0, ok: false,
      error: "Hay un ciclo en las dependencias — no se puede calcular la ruta crítica." };
  }

  var ES = {}, EF = {};
  if (mode === "cpm"){
    order.forEach(function(id){
      var es = 0;
      (graph.pred[id]||[]).forEach(function(e){
        if (dur[e.from] === undefined) return; // predecesor sin semanas asignadas: se ignora ese vínculo
        var pEF = EF[e.from], pES = ES[e.from];
        if (e.type === "SS") es = Math.max(es, pES + e.delay);
        else if (e.type === "FF") es = Math.max(es, pEF + e.delay - dur[id]);
        else es = Math.max(es, pEF + e.delay); // FS
      });
      ES[id] = es;
      EF[id] = es + dur[id];
    });
  } else {
    order.forEach(function(id){ ES[id] = actualES[id]; EF[id] = actualEF[id]; });
  }

  var projectFinish = 0;
  order.forEach(function(id){ if (EF[id] > projectFinish) projectFinish = EF[id]; });

  var LF = {}, LS = {};
  for (var i=order.length-1; i>=0; i--){
    var id = order[i];
    var succs = graph.succ[id] || [];
    if (!succs.length){
      LF[id] = projectFinish;
    } else {
      var lf = Infinity;
      succs.forEach(function(e){
        if (LS[e.to] === undefined) return; // sucesor sin semanas asignadas: se ignora ese vínculo
        if (e.type === "SS") lf = Math.min(lf, LS[e.to] - e.delay + dur[id]);
        else if (e.type === "FF") lf = Math.min(lf, LF[e.to] - e.delay);
        else lf = Math.min(lf, LS[e.to] - e.delay); // FS
      });
      LF[id] = (lf === Infinity) ? projectFinish : lf;
    }
    LS[id] = LF[id] - dur[id];
  }

  var critical = {}, count = 0;
  order.forEach(function(id){
    var slack = LS[id] - ES[id];
    if (slack <= 0.001){ critical[id] = true; count++; }
  });

  return { critical: critical, projectDurationWeeks: projectFinish/7, count: count, ok: true };
}

function render(){
  var vio = computeViolations();
  var crit = critPathMode ? computeCriticalPath(critPathMode) : null;
  var critInfoEl = document.getElementById("critPathInfo");
  if (critInfoEl){
    if (!crit){
      critInfoEl.className = "critpathinfo";
      critInfoEl.textContent = "";
    } else if (!crit.ok){
      critInfoEl.className = "critpathinfo criterror";
      critInfoEl.textContent = "⚠ " + crit.error;
    } else {
      critInfoEl.className = "critpathinfo";
      critInfoEl.textContent = crit.count + " actividad" + (crit.count===1?"":"es") + " crítica" + (crit.count===1?"":"s") +
        " — duración " + (critPathMode==="cpm" ? "teórica" : "actual") + ": " + crit.projectDurationWeeks + " semana" + (crit.projectDurationWeeks===1?"":"s");
    }
  }
  var grid = document.getElementById("grid");
  grid.innerHTML = "";

  var hrow = el("div","row headerrow");
  hrow.style.display = "grid";
  hrow.style.gridTemplateColumns = colTemplate();
  hrow.appendChild(el("div","label",{text:""}));
  for (var w=0; w<state.weeks; w++) hrow.appendChild(el("div","weeknum",{text:String(w+1)}));
  grid.appendChild(hrow);

  var allMilestones = collectAllMilestones();
  if (allMilestones.length){
    var byWeek = {};
    allMilestones.forEach(function(ms){ (byWeek[ms.week] = byWeek[ms.week]||[]).push(ms); });
    var hitosRow = el("div","row hitosrow");
    hitosRow.style.display = "grid";
    hitosRow.style.gridTemplateColumns = colTemplate();
    hitosRow.appendChild(el("div","label",{text:""}));
    for (var wH=0; wH<state.weeks; wH++){
      var hcell = el("div","hitoscell");
      var atWeek = byWeek[wH];
      if (atWeek && atWeek.length){
        hcell.title = atWeek.map(function(m){
          return (m.type==="cobro"?"↑ Cobro":"↓ Pago") + " — " + m.desc + (m.amount!==null ? (" ($ " + fmtNum(m.amount) + ")") : " (sin % o total definido)") + " [" + m.source + "]";
        }).join("\\n");
        if (atWeek.some(function(m){return m.type==="cobro";})) hcell.appendChild(el("span","hitomark hitocobro",{text:"▲"}));
        if (atWeek.some(function(m){return m.type==="pago";})) hcell.appendChild(el("span","hitomark hitopago",{text:"▼"}));
      }
      hitosRow.appendChild(hcell);
    }
    grid.appendChild(hitosRow);
  }

  state.modules.forEach(function(m){
    var span = moduleSpan(m);
    var mrow = el("div","row moduleband");
    mrow.style.display = "grid";
    mrow.style.gridTemplateColumns = colTemplate();
    var mlabel = el("div","label modulelabel");
    var mchk = el("input","selchk"); mchk.type="checkbox";
    var mstate = moduleSelectionState(m);
    mchk.checked = (mstate==="all");
    mchk.indeterminate = (mstate==="some");
    mchk.addEventListener("click", function(ev){ ev.stopPropagation(); });
    mchk.addEventListener("change", function(mm){ return function(ev){ toggleModule(mm, ev.target.checked); render(); }; }(m));
    mlabel.appendChild(mchk);
    mlabel.appendChild(el("span","chevron",{text: m.collapsed ? "▸" : "▾"}));
    var sw = el("span","swatch"); sw.style.background = m.color;
    mlabel.appendChild(sw);
    var nameInp = el("input","name"); nameInp.type="text"; nameInp.value = m.name;
    nameInp.addEventListener("click", function(ev){ ev.stopPropagation(); });
    nameInp.addEventListener("change", function(mm){ return function(ev){ mm.name = ev.target.value; save(); }; }(m));
    mlabel.appendChild(nameInp);
    if (span) mlabel.appendChild(el("span","durbadge",{text: span.dur + " sem"}));
    var addA = el("button","icobtn add",{text:"+", title:"Agregar actividad"});
    addA.addEventListener("click", function(mm){ return function(ev){
      ev.stopPropagation();
      mm.activities.push({ id: uid("act"), name: "Nueva actividad", start:null, end:null, hh:null });
      save(); render();
    }; }(m));
    mlabel.appendChild(addA);
    if (m.activities.length === 1 && state.modules.length > 1){
      var convModSel = buildModuleTargetSelect(m.id, "Convertir en actividad de…", function(targetId){
        convertModuleToActivityIn(m.id, targetId);
      });
      convModSel.title = "Esta actividad pasará a ser una actividad más del módulo elegido, y este módulo (que quedaría vacío) se eliminará.";
      mlabel.appendChild(convModSel);
    }
    var delM = el("button","icobtn",{text:"✕", title:"Eliminar módulo"});
    delM.addEventListener("click", function(mm){ return function(ev){
      ev.stopPropagation();
      if (!confirmish(delM, "eliminar módulo")) return;
      state.modules = state.modules.filter(function(x){ return x.id !== mm.id; });
      var actIds = mm.activities.map(function(a){return a.id;});
      state.deps = state.deps.filter(function(d){ return actIds.indexOf(d.from)===-1 && actIds.indexOf(d.to)===-1; });
      save(); render();
    }; }(m));
    mlabel.appendChild(delM);
    mlabel.addEventListener("click", function(mm){ return function(){ mm.collapsed = !mm.collapsed; save(); render(); }; }(m));
    mrow.appendChild(mlabel);
    for (var w2=0; w2<state.weeks; w2++){
      var band = el("div","week");
      if (span && w2>=span.start && w2<=span.end) band.style.setProperty("--bandc", hexToTint(m.color));
      mrow.appendChild(band);
    }
    mrow.dataset.modId = m.id;
    // Soltar una actividad arrastrada sobre la banda del módulo: se agrega al final de ese módulo.
    mrow.addEventListener("dragover", function(mm){ return function(ev){
      if (!dragSrc) return;
      ev.preventDefault();
      if (ev.dataTransfer) ev.dataTransfer.dropEffect = "move";
      mrow.classList.add("dragover-module");
    }; }(m));
    mrow.addEventListener("dragleave", function(){ mrow.classList.remove("dragover-module"); });
    mrow.addEventListener("drop", function(mm){ return function(ev){
      if (!dragSrc) return;
      ev.preventDefault();
      mrow.classList.remove("dragover-module");
      moveActivityToModuleEnd(dragSrc.actId, mm.id);
      dragSrc = null;
      render();
    }; }(m));
    grid.appendChild(mrow);

    if (m.collapsed) return;

    m.activities.forEach(function(a){
      var isSel = !!selected[a.id];
      var arow = el("div","row" + (isSel ? " selectedrow" : ""));
      arow.style.display = "grid";
      arow.style.gridTemplateColumns = colTemplate();
      var alabel = el("div","label");
      alabel.style.paddingLeft = "4px";
      var achk = el("input","selchk"); achk.type="checkbox"; achk.checked = isSel;
      achk.addEventListener("change", function(aa){ return function(ev){
        if (ev.target.checked) selected[aa.id]=true; else delete selected[aa.id];
        render();
      }; }(a));
      alabel.appendChild(achk);
      if (vio.badActs[a.id]) alabel.appendChild(el("span","warnicon",{text:"⚠", title:"Involucrada en una dependencia incumplida"}));
      var an = el("input","name"); an.type="text"; an.value = a.name;
      an.addEventListener("change", function(aa){ return function(ev){ aa.name = ev.target.value; save(); }; }(a));
      alabel.appendChild(an);
      var dl = durationLabel(a);
      if (dl) alabel.appendChild(el("span","durbadge",{text: dl}));
      var convBtn = el("button","icobtn",{text:"⇥", title:"Convertir en módulo propio"});
      convBtn.addEventListener("click", function(aa){ return function(ev){ ev.stopPropagation(); convertActivityToModule(aa.id); }; }(a));
      alabel.appendChild(convBtn);
      var dragHandle = el("span","draghandle",{text:"⠿", title:"Arrastrar para reordenar o mover a otro módulo"});
      dragHandle.setAttribute("draggable","true");
      dragHandle.addEventListener("dragstart", function(aa,rowEl){ return function(ev){
        dragSrc = { actId: aa.id };
        rowEl.classList.add("dragging");
        if (ev.dataTransfer){
          try { ev.dataTransfer.effectAllowed = "move"; ev.dataTransfer.setData("text/plain", aa.id); } catch(e){}
        }
      }; }(a, arow));
      dragHandle.addEventListener("dragend", function(rowEl){ return function(){
        dragSrc = null;
        rowEl.classList.remove("dragging");
      }; }(arow));
      alabel.appendChild(dragHandle);
      var delA = el("button","icobtn",{text:"✕", title:"Eliminar actividad"});
      delA.addEventListener("click", function(mm,aa){ return function(){
        if (!confirmish(delA, "eliminar actividad")) return;
        mm.activities = mm.activities.filter(function(x){ return x.id !== aa.id; });
        state.deps = state.deps.filter(function(d){ return d.from!==aa.id && d.to!==aa.id; });
        save(); render();
      }; }(m,a));
      alabel.appendChild(delA);
      arow.appendChild(alabel);
      arow.dataset.actId = a.id;
      arow.addEventListener("dragover", function(aa,rowEl){ return function(ev){
        if (!dragSrc) return;
        ev.preventDefault();
        if (ev.dataTransfer) ev.dataTransfer.dropEffect = "move";
        var rect = rowEl.getBoundingClientRect();
        var before = (ev.clientY - rect.top) < (rect.height/2);
        rowEl.classList.remove("dragover-before","dragover-after");
        rowEl.classList.add(before ? "dragover-before" : "dragover-after");
      }; }(a, arow));
      arow.addEventListener("dragleave", function(rowEl){ return function(){
        rowEl.classList.remove("dragover-before","dragover-after");
      }; }(arow));
      arow.addEventListener("drop", function(aa,rowEl){ return function(ev){
        if (!dragSrc) return;
        ev.preventDefault();
        rowEl.classList.remove("dragover-before","dragover-after");
        if (dragSrc.actId !== aa.id){
          var rect = rowEl.getBoundingClientRect();
          var before = (ev.clientY - rect.top) < (rect.height/2);
          moveActivityRelative(dragSrc.actId, aa.id, before);
        }
        dragSrc = null;
        render();
      }; }(a, arow));

      for (var w3=0; w3<state.weeks; w3++){
        var isFilled = a.start!==null && w3>=a.start && w3<=a.end;
        var cell = el("div", "week" + (isFilled?" filled":""));
        if (isFilled) cell.style.setProperty("--c", m.color);
        if (isFilled && vio.badActs[a.id]) cell.classList.add("violated");
        if (isFilled && crit && crit.ok && crit.critical[a.id]) cell.classList.add("criticalcell");
        (function(aa, ww, cellEl){
          cellEl.addEventListener("mousedown", function(ev){
            if (ev.target.classList.contains("handle")) return;
            var found = findActivity(aa.id);
            if (found.act.start === null){
              found.act.start = ww; found.act.end = ww;
              drag = { actId: aa.id, mode:"create", anchor: ww };
              save(); render();
            }
          });
          cellEl.addEventListener("mouseenter", function(){
            if (drag && drag.actId === aa.id && drag.mode==="create"){
              var found = findActivity(aa.id);
              found.act.start = Math.min(drag.anchor, ww);
              found.act.end = Math.max(drag.anchor, ww);
              save(); render();
            }
            if (resizeDrag && resizeDrag.actId === aa.id){
              var found2 = findActivity(aa.id);
              if (resizeDrag.side === "right"){ if (ww >= found2.act.start) found2.act.end = ww; }
              else { if (ww <= found2.act.end) found2.act.start = ww; }
              save(); render();
            }
          });
          cellEl.addEventListener("click", function(){
            if (drag) return;
            var found = findActivity(aa.id);
            var a2 = found.act;
            if (a2.start === null) return;
            if (ww === a2.start && a2.start < a2.end){ a2.start = a2.start + 1; }
            else if (ww === a2.end && a2.end > a2.start){ a2.end = a2.end - 1; }
            else if (ww < a2.start){ a2.start = ww; }
            else if (ww > a2.end){ a2.end = ww; }
            else { return; }
            save(); render();
          });
        })(a, w3, cell);
        if (isFilled && w3 === a.end){
          var rh = el("div","handle right");
          rh.addEventListener("mousedown", function(aa){ return function(ev){ ev.stopPropagation(); resizeDrag = { actId: aa.id, side:"right" }; }; }(a));
          cell.appendChild(rh);
        }
        if (isFilled && w3 === a.start){
          var lh = el("div","handle left");
          lh.addEventListener("mousedown", function(aa){ return function(ev){ ev.stopPropagation(); resizeDrag = { actId: aa.id, side:"left" }; }; }(a));
          cell.appendChild(lh);
        }
        arow.appendChild(cell);
      }
      grid.appendChild(arow);
    });
  });

  renderDeps(vio);
  renderLegend();
  renderSelBar();
  renderFinance();
}

function renderSelBar(){
  var bar = document.getElementById("selBar");
  var ids = selectedIds();
  if (!ids.length){ bar.style.display = "none"; bar.innerHTML=""; return; }
  bar.style.display = "flex";
  bar.innerHTML = "";
  bar.appendChild(el("span",null,{text: ids.length + " actividad" + (ids.length===1?"":"es") + " seleccionada" + (ids.length===1?"":"s") + " —"}));
  bar.appendChild(el("span",null,{text:"mover"}));
  var shiftInp = el("input"); shiftInp.type="number"; shiftInp.value="1"; shiftInp.step="1";
  bar.appendChild(shiftInp);
  bar.appendChild(el("span",null,{text:"semana(s)"}));
  var backBtn = el("button",null,{text:"← Atrás"});
  backBtn.addEventListener("click", function(){ shiftSelection(-(parseInt(shiftInp.value,10)||0)); });
  bar.appendChild(backBtn);
  var fwdBtn = el("button","primary",{text:"Adelante →"});
  fwdBtn.addEventListener("click", function(){ shiftSelection(parseInt(shiftInp.value,10)||0); });
  bar.appendChild(fwdBtn);
  var clearBtn = el("button",null,{text:"Limpiar selección"});
  clearBtn.addEventListener("click", clearSelection);
  bar.appendChild(clearBtn);
  var msg = el("span"); msg.id="selBarMsg"; msg.style.fontSize="11px"; msg.style.color="#a12c2c";
  bar.appendChild(msg);
}

document.addEventListener("mouseup", function(){ drag = null; resizeDrag = null; });

var confirmState = null;
function confirmish(btn, label){
  if (confirmState === btn){ confirmState = null; return true; }
  confirmState = btn;
  var orig = btn.textContent;
  btn.textContent = "✓?";
  btn.title = "Click de nuevo para " + label;
  setTimeout(function(){ if (confirmState === btn){ confirmState = null; btn.textContent = orig; } }, 2500);
  return false;
}

function hexToTint(hex){
  var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  r = Math.round(r + (255-r)*0.85); g = Math.round(g + (255-g)*0.85); b = Math.round(b + (255-b)*0.85);
  return "rgb(" + r + "," + g + "," + b + ")";
}

function actLabel(entry){ return entry.mod.name + " — " + entry.act.name; }

function xlsEsc(v){
  v = (v===null || typeof v==="undefined") ? "" : String(v);
  return v.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
var TH_STYLE = "background:#1f2430;color:#ffffff;font-weight:bold;padding:4px 6px;";
function thCell(text){ return '<td style="' + TH_STYLE + '">' + xlsEsc(text) + '</td>'; }

function buildGanttSheetHTML(){
  var html = '<table border="1" cellspacing="0" cellpadding="2" style="border-collapse:collapse;font-family:Calibri,Arial,sans-serif;font-size:10pt;">';
  html += '<tr><td colspan="3" style="font-size:14pt;font-weight:bold;border:none;">DESLOG 253795 Watts — Carta Gantt</td></tr>';
  html += '<tr><td colspan="3" style="font-style:italic;color:#666666;border:none;">Semanas contadas desde la Orden de Compra (Semana 1 = OC)</td></tr>';
  html += '<tr><td style="border:none;"></td></tr>';
  html += '<tr>' + thCell("Módulo") + thCell("Actividad") + '<td style="' + TH_STYLE + 'text-align:center;">Dur. (sem)</td>';
  for (var w=0; w<state.weeks; w++){
    html += '<td style="' + TH_STYLE + 'text-align:center;width:16px;">' + (w+1) + '</td>';
  }
  html += '</tr>';

  state.modules.forEach(function(m){
    var span = moduleSpan(m);
    var tint = hexToTint(m.color);
    html += '<tr>';
    html += '<td colspan="3" style="background:' + tint + ';font-weight:bold;">' + xlsEsc(m.name) + (span ? " (" + span.dur + " sem)" : "") + '</td>';
    for (var w2=0; w2<state.weeks; w2++){
      var inSpan = span && w2>=span.start && w2<=span.end;
      html += '<td style="background:' + (inSpan?tint:"#ffffff") + ';"></td>';
    }
    html += '</tr>';

    m.activities.forEach(function(a){
      var dur = durationOf(a);
      html += '<tr><td></td><td>' + xlsEsc(a.name) + '</td><td style="text-align:center;">' + (dur===null?"":dur) + '</td>';
      for (var w3=0; w3<state.weeks; w3++){
        var filled = a.start!==null && w3>=a.start && w3<=a.end;
        html += '<td style="background:' + (filled?m.color:"#ffffff") + ';"></td>';
      }
      html += '</tr>';
    });
  });
  html += '</table>';
  return html;
}

function milestonesBlockHTML(title, total, milestones, currency){
  var curTxt = (currency||"CLP").toUpperCase();
  var out = '<tr><td colspan="7" style="font-weight:bold;font-size:12pt;border:none;">' + xlsEsc(title) + (typeof total==="number" ? (" — total: " + total + " " + curTxt) : " — (sin total definido)") + '</td></tr>';
  out += '<tr>' + ["Descripción","%","Monto (moneda propia)","Monto (" + xlsEsc(state.finance.mainCurrency||"CLP") + ")","Asociado a","Momento","Semana"].map(thCell).join("") + '</tr>';
  if (!milestones.length){
    out += '<tr><td colspan="7" style="color:#999999;">Sin hitos.</td></tr>';
  } else {
    milestones.forEach(function(ms){
      var amt = milestoneAmount(total, ms);
      var amtConv = milestoneAmountConverted(total, currency, ms);
      var wk = milestoneWeek(ms);
      var assocTxt = assocLabel(ms.assocKind, ms.assocId) || "(sin asociar)";
      out += '<tr>';
      out += '<td>' + xlsEsc(ms.desc) + '</td>';
      out += '<td>' + (ms.pct===null?"":ms.pct+"%") + '</td>';
      out += '<td>' + (amt===null?"":(amt + " " + curTxt)) + '</td>';
      out += '<td>' + (amtConv===null?"":amtConv) + '</td>';
      out += '<td>' + xlsEsc(assocTxt) + '</td>';
      out += '<td>' + (ms.assocKind ? (ms.moment==="end"?"Fin":"Inicio") : "") + '</td>';
      out += '<td>' + (wk===null?"—":("Semana " + (wk+1))) + '</td>';
      out += '</tr>';
    });
  }
  out += '<tr><td style="border:none;"></td></tr>';
  return out;
}

function buildFinanceSheetHTML(){
  var fin = state.finance;
  var html = '<table border="1" cellspacing="0" cellpadding="3" style="border-collapse:collapse;font-family:Calibri,Arial,sans-serif;font-size:10pt;">';
  html += '<tr><td colspan="6" style="font-size:14pt;font-weight:bold;border:none;">Financiero</td></tr>';
  html += '<tr><td style="border:none;"></td></tr>';

  var mainCur = fin.mainCurrency || "CLP";
  function kpiRow(label, value){
    return '<tr><td style="font-weight:bold;background:#f0f1f3;">' + xlsEsc(label) + '</td><td>' + (value===null||typeof value==="undefined"?"":value) + '</td><td colspan="4" style="border:none;"></td></tr>';
  }
  html += kpiRow("Moneda principal (totales)", mainCur);
  html += kpiRow("Total contrato cliente (" + xlsEsc(fin.clientContract.currency||"CLP") + ")", fin.clientContract.total);
  html += kpiRow("Total contrato cliente (" + xlsEsc(mainCur) + ")", convertedTotal(fin.clientContract.total, fin.clientContract.currency));
  html += kpiRow("Costo materiales total (" + xlsEsc(fin.materials.currency||"CLP") + ")", fin.materials.total);
  html += kpiRow("Costo materiales total (" + xlsEsc(mainCur) + ")", convertedTotal(fin.materials.total, fin.materials.currency));
  html += kpiRow("Costo subcontratos, suma (" + xlsEsc(mainCur) + ")", subcontractsTotal());
  html += kpiRow("HH suma por actividad", hhSum());
  html += kpiRow("HH total (usado en el proyecto)", hhTotal());
  html += kpiRow("Valor HH (" + xlsEsc(fin.hhRateCurrency||"CLP") + "/hora)", fin.hhRate);
  var hhTot0 = hhTotal();
  var hhCostTotal0Native = (typeof fin.hhRate === "number" && hhTot0 !== null) ? hhTot0*fin.hhRate : null;
  html += kpiRow("Costo HH total (" + xlsEsc(fin.hhRateCurrency||"CLP") + ")", hhCostTotal0Native);
  html += kpiRow("Costo HH total (" + xlsEsc(mainCur) + ")", convertedTotal(hhCostTotal0Native, fin.hhRateCurrency));
  var cf0 = cashflowByWeek();
  var ingT0 = cf0 ? cf0.ingAcum[cf0.ingAcum.length-1] : null;
  var egrT0 = cf0 ? cf0.egrAcum[cf0.egrAcum.length-1] : null;
  html += kpiRow("Ingresos totales (hitos)", ingT0);
  html += kpiRow("Egresos totales (hitos)", egrT0);
  if (ingT0!==null || egrT0!==null) html += kpiRow("Diferencia sin HH", (ingT0||0)-(egrT0||0));
  if (cf0 && cf0.hasHHCost) html += kpiRow("Diferencia con HH", cf0.diffWithHH[cf0.diffWithHH.length-1]);
  html += '<tr><td style="border:none;"></td></tr>';

  html += milestonesBlockHTML("Contrato con cliente — hitos de cobro", fin.clientContract.total, fin.clientContract.milestones, fin.clientContract.currency);
  html += milestonesBlockHTML("Materiales — hitos de pago", fin.materials.total, fin.materials.milestones, fin.materials.currency);

  html += '<tr><td colspan="7" style="font-weight:bold;font-size:12pt;border:none;">Subcontratos</td></tr>';
  if (!fin.subcontracts.length){
    html += '<tr><td colspan="7" style="color:#999999;">Sin subcontratos.</td></tr>';
  } else {
    fin.subcontracts.forEach(function(s){
      html += milestonesBlockHTML("Subcontrato: " + (s.name || "(sin nombre)"), s.amount, s.milestones, s.currency);
    });
  }

  if (fin.currencies.length){
    html += '<tr><td colspan="4" style="font-weight:bold;font-size:12pt;border:none;">Monedas (tasas de conversión respecto a CLP)</td></tr>';
    html += '<tr>' + ["Código","Tasa (CLP por 1 unidad)"].map(thCell).join("") + '</tr>';
    fin.currencies.forEach(function(c){
      html += '<tr><td>' + xlsEsc(c.code) + '</td><td>' + (c.rate===null?"":c.rate) + '</td></tr>';
    });
    html += '<tr><td style="border:none;"></td></tr>';
  }

  html += '<tr><td colspan="3" style="font-weight:bold;font-size:12pt;border:none;">HH por actividad</td></tr>';
  html += '<tr>' + thCell("Módulo") + thCell("Actividad") + thCell("HH") + '</tr>';
  var anyHH = false;
  state.modules.forEach(function(m){
    m.activities.forEach(function(a){
      if (typeof a.hh === "number"){
        anyHH = true;
        html += '<tr><td>' + xlsEsc(m.name) + '</td><td>' + xlsEsc(a.name) + '</td><td>' + a.hh + '</td></tr>';
      }
    });
  });
  if (!anyHH) html += '<tr><td colspan="3" style="color:#999999;">Sin HH cargadas por actividad.</td></tr>';
  html += '<tr><td style="border:none;"></td></tr>';

  html += '<tr><td colspan="8" style="font-weight:bold;font-size:12pt;border:none;">Flujo de caja acumulado por semana</td></tr>';
  var cf = cashflowByWeek();
  if (cf && cf.hasHHCost){
    html += '<tr>' + ["Semana","Ingreso semana","Egreso semana","Ingreso acumulado","Egreso acumulado","Costo HH acumulado","Diferencia sin HH","Diferencia con HH"].map(thCell).join("") + '</tr>';
    for (var i=0;i<state.weeks;i++){
      html += '<tr><td>' + (i+1) + '</td><td>' + cf.ing[i] + '</td><td>' + cf.egr[i] + '</td><td>' + cf.ingAcum[i] + '</td><td>' + cf.egrAcum[i] + '</td><td>' + cf.hhAcum[i] + '</td><td>' + cf.diffNoHH[i] + '</td><td>' + cf.diffWithHH[i] + '</td></tr>';
    }
  } else if (cf){
    html += '<tr>' + ["Semana","Ingreso semana","Egreso semana","Ingreso acumulado","Egreso acumulado","Diferencia acumulada"].map(thCell).join("") + '</tr>';
    for (var i2=0;i2<state.weeks;i2++){
      html += '<tr><td>' + (i2+1) + '</td><td>' + cf.ing[i2] + '</td><td>' + cf.egr[i2] + '</td><td>' + cf.ingAcum[i2] + '</td><td>' + cf.egrAcum[i2] + '</td><td>' + cf.diffNoHH[i2] + '</td></tr>';
    }
  } else {
    html += '<tr>' + ["Semana","Ingreso semana","Egreso semana","Ingreso acumulado","Egreso acumulado","Diferencia acumulada"].map(thCell).join("") + '</tr>';
    html += '<tr><td colspan="6" style="color:#999999;">Sin hitos con % y total definidos, ni valor HH.</td></tr>';
  }
  html += '</table>';
  return html;
}

function buildDepsSheetHTML(){
  var vio = computeViolations();
  var html = '<table border="1" cellspacing="0" cellpadding="3" style="border-collapse:collapse;font-family:Calibri,Arial,sans-serif;font-size:10pt;">';
  html += '<tr><td colspan="5" style="font-size:14pt;font-weight:bold;border:none;">Dependencias</td></tr>';
  html += '<tr><td style="border:none;"></td></tr>';
  html += '<tr>' + ["Origen","Tipo","Delay (días)","Destino","Estado"].map(thCell).join("") + '</tr>';
  if (!state.deps.length){
    html += '<tr><td colspan="5" style="color:#999999;">Sin dependencias.</td></tr>';
  } else {
    state.deps.forEach(function(d){
      var f = findActivity(d.from), t = findActivity(d.to);
      if (!f || !t) return;
      var bad = !!vio.violated[d.id];
      var estado = bad ? ("Incumple: " + vio.violated[d.id]) : "Cumple";
      html += '<tr' + (bad ? ' style="background:#fdf2f2;"' : '') + '>';
      html += '<td>' + xlsEsc(f.mod.name + " › " + f.act.name) + '</td>';
      html += '<td>' + xlsEsc(typeLabel(d.type)) + '</td>';
      html += '<td>' + d.delay + '</td>';
      html += '<td>' + xlsEsc(t.mod.name + " › " + t.act.name) + '</td>';
      html += '<td' + (bad ? ' style="color:#a12c2c;font-weight:bold;"' : '') + '>' + xlsEsc(estado) + '</td>';
      html += '</tr>';
    });
  }
  html += '</table>';
  return html;
}

function flashBtn(btn, text, ms){
  var orig = btn.textContent;
  btn.textContent = text;
  setTimeout(function(){ btn.textContent = orig; }, ms || 1600);
}

// ---- Recordar carpeta de proyectos (File System Access API, con fallback) ----
// Solo Chrome/Edge soportan showSaveFilePicker/showOpenFilePicker/showDirectoryPicker.
// Si no hay soporte, o el usuario cancela, o algo falla, todo cae de vuelta al flujo
// clásico de descarga/<input type=file> — nunca debe romperse la funcionalidad básica.
var fsSupported = (typeof window.showSaveFilePicker === "function" &&
                    typeof window.showOpenFilePicker === "function" &&
                    typeof window.showDirectoryPicker === "function");
var savedDirHandle = null;

function idbOpen(){
  return new Promise(function(resolve, reject){
    if (!("indexedDB" in window)) { reject(new Error("sin indexedDB")); return; }
    var req = indexedDB.open("ganttWattsFS", 1);
    req.onupgradeneeded = function(){ req.result.createObjectStore("handles"); };
    req.onsuccess = function(){ resolve(req.result); };
    req.onerror = function(){ reject(req.error); };
  });
}
function idbGet(key){
  return idbOpen().then(function(db){
    return new Promise(function(resolve, reject){
      var tx = db.transaction("handles", "readonly");
      var rq = tx.objectStore("handles").get(key);
      rq.onsuccess = function(){ resolve(rq.result || null); };
      rq.onerror = function(){ reject(rq.error); };
    });
  });
}
function idbSet(key, val){
  return idbOpen().then(function(db){
    return new Promise(function(resolve, reject){
      var tx = db.transaction("handles", "readwrite");
      tx.objectStore("handles").put(val, key);
      tx.oncomplete = function(){ resolve(); };
      tx.onerror = function(){ reject(tx.error); };
    });
  });
}

function updateDirIndicator(){
  var indEl = document.getElementById("projectsDirIndicator");
  if (!indEl) return;
  if (savedDirHandle){
    indEl.className = "dirindicator dirset";
    indEl.textContent = "📁 Carpeta recordada: " + (savedDirHandle.name || "(elegida)");
    indEl.title = "Guardar archivo / Exportar a Excel / Cargar archivo se abrirán en esta carpeta.";
  } else {
    indEl.className = "dirindicator";
    indEl.textContent = fsSupported ? "📁 Sin carpeta recordada todavía" : "";
    indEl.title = fsSupported ? 'Click en "Elegir carpeta de proyectos" y selecciona, por ejemplo, la carpeta "Ciclos guardados".' : "";
  }
}

// Intenta restaurar la carpeta guardada al cargar la página. No pide permiso aquí
// (no hay gesto de usuario disponible todavía) — solo actualiza el indicador; el
// permiso se verifica/pide recién en el próximo click de Guardar/Exportar/Cargar.
function restoreDirHandle(){
  if (!fsSupported) return;
  idbGet("projectsDir").then(function(h){
    if (h){ savedDirHandle = h; updateDirIndicator(); }
  }).catch(function(){});
}

// Se llama dentro de un click handler (hay gesto de usuario), así que puede pedir permiso.
function ensureDirPermission(handle){
  return handle.queryPermission({ mode:"readwrite" }).then(function(perm){
    if (perm === "granted") return true;
    return handle.requestPermission({ mode:"readwrite" }).then(function(p2){ return p2 === "granted"; });
  }).catch(function(){ return false; });
}

function chooseProjectsFolder(){
  if (!fsSupported){
    window.alert('Tu navegador no soporta elegir carpeta (usa Chrome o Edge). Seguirá usando el diálogo normal de descarga/apertura.');
    return;
  }
  window.showDirectoryPicker({ mode: "readwrite" }).then(function(handle){
    savedDirHandle = handle;
    updateDirIndicator();
    idbSet("projectsDir", handle);
  }).catch(function(e){
    if (e && e.name === "AbortError") return;
    window.alert("No se pudo elegir la carpeta: " + (e && e.message ? e.message : e));
  });
}

// Camino clásico (siempre disponible): descarga vía Blob + <a download>.
function writeFileClassic(data, mime, filename, btn, okText){
  var blob = new Blob([data], { type: mime });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  if (btn) flashBtn(btn, okText || "Guardado ✓");
}

// Intenta guardar usando el File System Access API, sugiriendo la carpeta recordada
// (si hay una). Si no hay soporte, no hay carpeta, o algo falla/se cancela, cae al
// camino clásico automáticamente.
function writeFileSmart(data, mime, filename, ext, btn, okText){
  if (!fsSupported){ writeFileClassic(data, mime, filename, btn, okText); return; }
  var opts = { suggestedName: filename, types: [{ description: "Archivo", accept: (function(){ var o={}; o[mime]=[ext]; return o; })() }] };
  var proceed = function(){
    if (savedDirHandle) opts.startIn = savedDirHandle;
    window.showSaveFilePicker(opts).then(function(handle){
      return handle.createWritable().then(function(writable){
        return writable.write(data).then(function(){ return writable.close(); });
      });
    }).then(function(){
      if (btn) flashBtn(btn, okText || "Guardado ✓");
    }).catch(function(e){
      if (e && e.name === "AbortError") return; // el usuario canceló, no hacer nada
      writeFileClassic(data, mime, filename, btn, okText);
    });
  };
  if (savedDirHandle){
    ensureDirPermission(savedDirHandle).then(function(ok){
      if (!ok) savedDirHandle = null;
      proceed();
    });
  } else {
    proceed();
  }
}

function exportExcel(){
  var sheets = [
    { name: "Gantt", html: buildGanttSheetHTML() },
    { name: "Financiero", html: buildFinanceSheetHTML() },
    { name: "Dependencias", html: buildDepsSheetHTML() }
  ];
  var xmlSheets = sheets.map(function(s){
    return '<x:ExcelWorksheet><x:Name>' + xlsEsc(s.name) + '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>';
  }).join("");
  var doc = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">' +
    '<head><meta charset="utf-8">' +
    '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>' + xmlSheets + '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' +
    '</head><body>' + sheets.map(function(s){ return s.html; }).join("") + '</body></html>';
  writeFileSmart(doc, "application/vnd.ms-excel", "DESLOG_253795_Watts_Gantt.xls", ".xls", document.getElementById("exportBtn"), "Exportado ✓");
}

function saveToFile(){
  var data = JSON.stringify(state, null, 2);
  writeFileSmart(data, "application/json", "DESLOG_253795_Watts_Gantt.json", ".json", document.getElementById("saveFileBtn"), "Guardado ✓");
}

// Intenta abrir usando el File System Access API, sugiriendo la carpeta recordada.
// Si no hay soporte, no hay carpeta, o algo falla/se cancela, cae al <input type=file> clásico.
function openFileSmart(){
  if (!fsSupported){ document.getElementById("loadFileInput").click(); return; }
  var opts = { types: [{ description: "Proyecto Gantt (JSON)", accept: {"application/json": [".json"]} }] };
  var proceed = function(){
    if (savedDirHandle) opts.startIn = savedDirHandle;
    window.showOpenFilePicker(opts).then(function(handles){
      return handles[0].getFile();
    }).then(function(file){
      loadFromFile(file);
    }).catch(function(e){
      if (e && e.name === "AbortError") return;
      document.getElementById("loadFileInput").click();
    });
  };
  if (savedDirHandle){
    ensureDirPermission(savedDirHandle).then(function(ok){
      if (!ok) savedDirHandle = null;
      proceed();
    });
  } else {
    proceed();
  }
}

function loadFromFile(file){
  var reader = new FileReader();
  reader.onload = function(ev){
    try {
      var parsed = JSON.parse(ev.target.result);
      if (!parsed || !parsed.modules || !Array.isArray(parsed.modules)) throw new Error("El archivo no tiene el formato esperado.");
      state = migrate(parsed);
      selected = {};
      save();
      render();
      document.getElementById("weeksInput").value = state.weeks;
      flashBtn(document.getElementById("loadFileBtn"), "Cargado ✓");
    } catch (e) {
      window.alert("No se pudo cargar el archivo: " + e.message);
    }
  };
  reader.readAsText(file);
}

function fillActivitySelect(sel, selectedId){
  sel.innerHTML = "";
  state.modules.forEach(function(m){
    m.activities.forEach(function(a){
      var opt = el("option"); opt.value = a.id; opt.textContent = m.name + " › " + a.name;
      if (a.id === selectedId) opt.selected = true;
      sel.appendChild(opt);
    });
  });
}

var TYPE_LABELS = {
  FS: "Fin antes de inicio (fin → inicio)",
  SS: "Inicio antes de inicio (inicio → inicio)",
  FF: "Fin antes de fin (fin → fin)"
};
function typeLabel(tk){ return TYPE_LABELS[tk] || tk; }
function fillTypeSelect(sel, selectedType){
  sel.innerHTML = "";
  ["FS","SS","FF"].forEach(function(tk){
    var o = el("option"); o.value = tk; o.textContent = typeLabel(tk);
    if (tk === selectedType) o.selected = true;
    sel.appendChild(o);
  });
}

var depSortKey = null; // "origen"|"tipo"|"delay"|"destino"|"estado"
var depSortDir = 1;

function renderDepsOnly(){ renderDeps(computeViolations()); }

function renderDeps(vio){
  document.getElementById("depsChevron").textContent = state.depsCollapsed ? "▸" : "▾";
  document.getElementById("depsBody").style.display = state.depsCollapsed ? "none" : "block";
  if (state.depsCollapsed) return;
  var banner = document.getElementById("depsBanner");
  banner.innerHTML = "";
  var nViol = Object.keys(vio.violated).length;
  if (nViol > 0){
    banner.appendChild(el("div","banner bad",{text:"⚠ " + nViol + " dependencia" + (nViol===1?"":"s") + " incumplida" + (nViol===1?"":"s") + ". Revisa las filas marcadas en rojo abajo."}));
  } else if (state.deps.length){
    banner.appendChild(el("div","banner ok",{text:"✓ Todas las dependencias se cumplen con la planificación actual."}));
  }

  fillActivitySelect(document.getElementById("depFrom"));
  fillActivitySelect(document.getElementById("depTo"));
  fillTypeSelect(document.getElementById("depType"));

  var table = document.getElementById("depsTable");
  var tbody = document.getElementById("depsTbody");
  var emptyDiv = document.getElementById("depsEmpty");
  var countEl = document.getElementById("depCount");
  tbody.innerHTML = "";

  if (!state.deps.length){
    table.style.display = "none";
    emptyDiv.style.display = "block";
    emptyDiv.textContent = "Sin dependencias todavía. Usa el formulario de arriba para agregar una.";
    countEl.textContent = "";
    return;
  }
  table.style.display = "";

  var rows = state.deps.map(function(d){
    var f = findActivity(d.from), t = findActivity(d.to);
    if (!f || !t) return null;
    return { d: d, f: f, t: t, isBad: !!vio.violated[d.id], detail: vio.violated[d.id] || "" };
  }).filter(Boolean);

  var filterText = (document.getElementById("depFilterText").value || "").toLowerCase().trim();
  var filterEstado = document.getElementById("depFilterEstado").value;
  var filtered = rows.filter(function(r){
    if (filterEstado === "bad" && !r.isBad) return false;
    if (filterEstado === "ok" && r.isBad) return false;
    if (filterText){
      var hay = (r.f.mod.name + " " + r.f.act.name + " " + r.t.mod.name + " " + r.t.act.name).toLowerCase();
      if (hay.indexOf(filterText) === -1) return false;
    }
    return true;
  });

  if (depSortKey){
    filtered.sort(function(a,b){
      var av, bv;
      if (depSortKey === "origen"){ av = a.f.mod.name + " " + a.f.act.name; bv = b.f.mod.name + " " + b.f.act.name; }
      else if (depSortKey === "tipo"){ av = a.d.type; bv = b.d.type; }
      else if (depSortKey === "delay"){ av = a.d.delay; bv = b.d.delay; }
      else if (depSortKey === "destino"){ av = a.t.mod.name + " " + a.t.act.name; bv = b.t.mod.name + " " + b.t.act.name; }
      else if (depSortKey === "estado"){ av = a.isBad?1:0; bv = b.isBad?1:0; }
      if (av < bv) return -1 * depSortDir;
      if (av > bv) return 1 * depSortDir;
      return 0;
    });
  }

  table.querySelectorAll("th[data-key]").forEach(function(th){
    var arrow = th.querySelector(".sortarrow");
    arrow.textContent = (th.getAttribute("data-key") === depSortKey) ? (depSortDir===1 ? "▲" : "▼") : "";
  });

  countEl.textContent = "Mostrando " + filtered.length + " de " + rows.length + " dependencia" + (rows.length===1?"":"s");

  if (!filtered.length){
    emptyDiv.style.display = "block";
    emptyDiv.textContent = "Ninguna dependencia coincide con el filtro.";
  } else {
    emptyDiv.style.display = "none";
  }

  filtered.forEach(function(r){
    var d = r.d;
    var tr = el("tr", r.isBad ? "violated" : "");
    tr.dataset.depId = d.id;

    var tdOrigen = el("td");
    var fromSel = el("select"); fillActivitySelect(fromSel, d.from);
    fromSel.addEventListener("change", function(){ d.from = fromSel.value; save(); renderDepsOnly(); });
    tdOrigen.appendChild(fromSel);
    tr.appendChild(tdOrigen);

    var tdTipo = el("td");
    var typeSel = el("select"); fillTypeSelect(typeSel, d.type);
    typeSel.addEventListener("change", function(){ d.type = typeSel.value; save(); renderDepsOnly(); });
    tdTipo.appendChild(typeSel);
    tr.appendChild(tdTipo);

    var tdDelay = el("td");
    var delayInp = el("input"); delayInp.type = "number"; delayInp.value = d.delay; delayInp.title = "Delay en días";
    delayInp.addEventListener("change", function(){ d.delay = parseInt(delayInp.value,10)||0; save(); renderDepsOnly(); });
    tdDelay.appendChild(delayInp);
    tdDelay.appendChild(el("span",null,{text:" día(s)"}));
    tr.appendChild(tdDelay);

    var tdDestino = el("td");
    var toSel = el("select"); fillActivitySelect(toSel, d.to);
    toSel.addEventListener("change", function(){ d.to = toSel.value; save(); renderDepsOnly(); });
    tdDestino.appendChild(toSel);
    tr.appendChild(tdDestino);

    var tdEstado = el("td");
    if (r.isBad) tdEstado.appendChild(el("span","statusbadge bad",{text:"⚠ Incumple: " + r.detail}));
    else tdEstado.appendChild(el("span","statusbadge ok",{text:"✓ Cumple"}));
    tr.appendChild(tdEstado);

    var tdActions = el("td","actioncell");
    var naturalOrder = !depSortKey && !filterText && !filterEstado;
    if (naturalOrder && state.deps.length > 1){
      var dragDepHandle = el("span","draghandle",{text:"⠿", title:"Arrastrar para reordenar"});
      dragDepHandle.setAttribute("draggable","true");
      dragDepHandle.addEventListener("dragstart", function(dd){ return function(ev){
        dragDepId = dd.id;
        tr.classList.add("dragging");
        if (ev.dataTransfer){ try { ev.dataTransfer.effectAllowed = "move"; ev.dataTransfer.setData("text/plain", dd.id); } catch(e){} }
      }; }(d));
      dragDepHandle.addEventListener("dragend", function(){ dragDepId = null; tr.classList.remove("dragging"); });
      tdActions.appendChild(dragDepHandle);
      tr.addEventListener("dragover", function(dd){ return function(ev){
        if (!dragDepId) return;
        ev.preventDefault();
        if (ev.dataTransfer) ev.dataTransfer.dropEffect = "move";
        var rect = tr.getBoundingClientRect();
        var before = (ev.clientY - rect.top) < (rect.height/2);
        tr.classList.remove("dragover-before","dragover-after");
        tr.classList.add(before ? "dragover-before" : "dragover-after");
      }; }(d));
      tr.addEventListener("dragleave", function(){ tr.classList.remove("dragover-before","dragover-after"); });
      tr.addEventListener("drop", function(dd){ return function(ev){
        if (!dragDepId) return;
        ev.preventDefault();
        tr.classList.remove("dragover-before","dragover-after");
        if (dragDepId !== dd.id){
          var rect = tr.getBoundingClientRect();
          var before = (ev.clientY - rect.top) < (rect.height/2);
          var srcDep = state.deps.find(function(x){ return x.id === dragDepId; });
          if (srcDep){ moveArrayItemRelative(state.deps, srcDep, dd, before); save(); }
        }
        dragDepId = null;
        renderDepsOnly();
      }; }(d));
    }
    var delB = el("button",null,{text:"Eliminar"});
    delB.addEventListener("click", function(){
      state.deps = state.deps.filter(function(x){ return x.id !== d.id; });
      save(); render();
    });
    tdActions.appendChild(delB);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });
}

function renderLegend(){
  var leg = document.getElementById("legend");
  leg.innerHTML = "";
  state.modules.forEach(function(m){
    var s = el("span");
    var dot = el("span","legenddot"); dot.style.background = m.color;
    s.appendChild(dot);
    s.appendChild(document.createTextNode(m.name));
    leg.appendChild(s);
  });
}

// ==================== Financiero ====================
var financeChart = null;

function fmtNum(n){
  if (n===null || typeof n === "undefined" || isNaN(n)) return "—";
  try { return Math.round(n).toLocaleString("es-CL"); } catch(e){ return String(Math.round(n)); }
}

// ---- monedas ----
// Valores referenciales tomados el 2026-09-07 (tipo de cambio observado ese día). Son solo
// una sugerencia inicial para no partir de cero — no se actualizan solos, el usuario define
// el valor real a usar en la sección "Monedas".
var CURRENCY_RATE_HINTS = { USD: 957.53, EUR: 1106.59, UF: 40934.58 };
var CURRENCY_RATE_HINTS_DATE = "15-09-2026";
var currencyUpdateStatus = "";

function pad2(n){ return (n<10?"0":"") + n; }

// Intenta traer los valores del día desde mindicador.cl (API pública chilena, sin
// llave). Nunca escribe directamente en las tasas que el usuario ya definió — solo
// refresca la "sugerencia" que se muestra al costado. Si falla (sin red, CSP del
// navegador/artefacto, CORS, etc.) cae en silencio y deja el último valor conocido.
function updateCurrencyRates(){
  var btn = document.getElementById("updateRatesBtn");
  if (typeof fetch !== "function"){
    currencyUpdateStatus = "⚠ Este navegador no soporta actualizar en vivo. Se mantiene el valor sugerido (" + CURRENCY_RATE_HINTS_DATE + ").";
    renderFinance();
    return;
  }
  if (btn){ btn.disabled = true; btn.textContent = "Actualizando…"; }
  fetch("https://mindicador.cl/api")
    .then(function(r){ if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(function(data){
      var updated = [];
      if (data && data.uf && typeof data.uf.valor === "number"){ CURRENCY_RATE_HINTS.UF = data.uf.valor; updated.push("UF"); }
      if (data && data.dolar && typeof data.dolar.valor === "number"){ CURRENCY_RATE_HINTS.USD = data.dolar.valor; updated.push("USD"); }
      if (data && data.euro && typeof data.euro.valor === "number"){ CURRENCY_RATE_HINTS.EUR = data.euro.valor; updated.push("EUR"); }
      if (!updated.length) throw new Error("respuesta sin los valores esperados");
      var d = new Date();
      CURRENCY_RATE_HINTS_DATE = pad2(d.getDate()) + "-" + pad2(d.getMonth()+1) + "-" + d.getFullYear();
      currencyUpdateStatus = "✓ Sugerencias actualizadas (" + updated.join(", ") + ") al " + CURRENCY_RATE_HINTS_DATE + ".";
    })
    .catch(function(){
      currencyUpdateStatus = "⚠ No se pudo actualizar en vivo (sin conexión o bloqueado). Se mantiene la última sugerencia (" + CURRENCY_RATE_HINTS_DATE + ").";
    })
    .then(function(){ renderFinance(); });
}

function currencyRate(code){
  if (!code) return 1;
  var c = code.toUpperCase();
  if (c === "CLP") return 1;
  var found = null;
  (state.finance.currencies||[]).forEach(function(x){ if (x.code && x.code.toUpperCase() === c) found = x; });
  return (found && typeof found.rate === "number") ? found.rate : null;
}
function toCLP(amount, code){
  if (typeof amount !== "number") return null;
  if (!code || code.toUpperCase() === "CLP") return amount;
  var r = currencyRate(code);
  return r === null ? null : amount*r;
}
function toMainCurrency(amountCLP){
  if (amountCLP === null || typeof amountCLP === "undefined") return null;
  var mc = (state.finance.mainCurrency || "CLP").toUpperCase();
  if (mc === "CLP") return amountCLP;
  var r = currencyRate(mc);
  return (r === null || r === 0) ? null : amountCLP/r;
}
// Convierte un monto que está en \`code\` hacia la moneda principal de reporte (fin.mainCurrency).
function convertedTotal(amount, code){
  return toMainCurrency(toCLP(amount, code));
}
function fmtMoneyIn(value, code){
  if (value === null || typeof value === "undefined") return "—";
  return fmtNum(value) + " " + ((code||"CLP").toUpperCase());
}
function fmtMoney(value){
  return fmtMoneyIn(value, state.finance.mainCurrency || "CLP");
}

function hhSum(){
  var sum = 0, any = false;
  state.modules.forEach(function(m){
    m.activities.forEach(function(a){
      if (typeof a.hh === "number"){ sum += a.hh; any = true; }
    });
  });
  return any ? sum : null;
}
function hhTotal(){
  var man = state.finance.hhManualTotal;
  if (typeof man === "number") return man;
  return hhSum();
}
function subcontractsTotal(){
  var sum = 0, any = false;
  state.finance.subcontracts.forEach(function(s){
    if (typeof s.amount === "number"){
      var conv = convertedTotal(s.amount, s.currency);
      if (conv !== null){ sum += conv; any = true; }
    }
  });
  return any ? sum : null;
}
function milestoneAmount(total, ms){
  if (typeof ms.pct === "number" && typeof total === "number") return total * ms.pct / 100;
  if (typeof ms.legacyAmount === "number") return ms.legacyAmount;
  return null;
}
// Same as milestoneAmount() but converts the result from the block's native currency
// into the reporting currency (state.finance.mainCurrency). Returns null if the amount
// can't be resolved OR the currency's conversion rate is missing.
function milestoneAmountConverted(total, currency, ms){
  var amt = milestoneAmount(total, ms);
  if (amt === null) return null;
  return convertedTotal(amt, currency);
}
// Every milestone (cliente/materiales/subcontratos) with a resolved week, for the
// calendar markers row and the cashflow chart markers. Milestones without a resolved
// week (no asociación ni semana manual) are excluded — nothing to place on a timeline.
function collectAllMilestones(){
  var out = [];
  function push(list, total, currency, type, sourceLabel){
    list.forEach(function(ms){
      var wk = milestoneWeek(ms);
      if (wk === null || wk < 0 || wk >= state.weeks) return;
      out.push({ desc: ms.desc || "(sin descripción)", type: type, week: wk, amount: milestoneAmountConverted(total, currency, ms), source: sourceLabel });
    });
  }
  push(state.finance.clientContract.milestones, state.finance.clientContract.total, state.finance.clientContract.currency, "cobro", "Cliente");
  push(state.finance.materials.milestones, state.finance.materials.total, state.finance.materials.currency, "pago", "Materiales");
  state.finance.subcontracts.forEach(function(s){
    push(s.milestones, s.amount, s.currency, "pago", s.name || "Subcontrato");
  });
  return out;
}
function milestoneWeek(ms){
  if (ms.assocKind === "activity" && ms.assocId){
    var f = findActivity(ms.assocId);
    if (!f || f.act.start === null) return null;
    return ms.moment === "end" ? f.act.end : f.act.start;
  }
  if (ms.assocKind === "module" && ms.assocId){
    var m = null;
    for (var i=0;i<state.modules.length;i++){ if (state.modules[i].id === ms.assocId){ m = state.modules[i]; break; } }
    if (!m) return null;
    var span = moduleSpan(m);
    if (!span) return null;
    return ms.moment === "end" ? span.end : span.start;
  }
  return (typeof ms.manualWeek === "number") ? ms.manualWeek : null;
}
function hhCostByWeek(){
  var n = state.weeks;
  var rate = state.finance.hhRate;
  var currency = state.finance.hhRateCurrency;
  var cost = new Array(n);
  for (var z=0; z<n; z++) cost[z] = 0;
  if (typeof rate !== "number") return { cost: cost, any: false };

  // El "Valor HH" está en su propia moneda (por defecto UF) — convertimos a la
  // moneda principal antes de sumarlo con lo demás. Si falta la tasa, no se cuenta
  // (mejor no incluirlo que mostrar un número equivocado).
  var convFactor = convertedTotal(1, currency);
  if (convFactor === null) return { cost: cost, any: false, missingRate: true };

  // "forma" real: horas por semana según cada actividad, sin aplicar todavía ningún total manual.
  var shape = new Array(n); for (var z2=0; z2<n; z2++) shape[z2] = 0;
  var shapeSum = 0, anyShape = false;
  state.modules.forEach(function(m){
    m.activities.forEach(function(a){
      if (typeof a.hh === "number" && a.start!==null && a.end!==null){
        var dur = a.end - a.start + 1;
        var perw = a.hh/dur;
        for (var w=a.start; w<=a.end && w<n; w++) shape[w] += perw;
        shapeSum += a.hh;
        anyShape = true;
      }
    });
  });

  var manual = state.finance.hhManualTotal;

  if (anyShape){
    // Usa la distribución real por actividad (respeta dónde se concentran las horas).
    // Si además hay un total manual, sólo reescala la magnitud total — la forma no cambia.
    var scale = (typeof manual === "number" && shapeSum > 0) ? (manual/shapeSum) : 1;
    for (var w2=0; w2<n; w2++) cost[w2] = shape[w2]*rate*scale*convFactor;
    return { cost: cost, any: true };
  }

  if (typeof manual === "number"){
    // Sin desglose por actividad: único dato disponible es un total plano, se reparte parejo.
    var per = (manual*rate*convFactor)/n;
    for (var w3=0; w3<n; w3++) cost[w3] = per;
    return { cost: cost, any: true };
  }

  return { cost: cost, any: false };
}

function cashflowByWeek(){
  var n = state.weeks;
  var ing = new Array(n), egr = new Array(n);
  for (var z=0; z<n; z++){ ing[z]=0; egr[z]=0; }
  var any = false;
  function process(total, currency, milestones, isIncome){
    milestones.forEach(function(ms){
      var amt = milestoneAmountConverted(total, currency, ms);
      if (amt === null) return;
      var wk = milestoneWeek(ms);
      if (wk === null || wk < 0 || wk >= n) return;
      any = true;
      if (isIncome) ing[wk] += amt; else egr[wk] += amt;
    });
  }
  process(state.finance.clientContract.total, state.finance.clientContract.currency, state.finance.clientContract.milestones, true);
  process(state.finance.materials.total, state.finance.materials.currency, state.finance.materials.milestones, false);
  state.finance.subcontracts.forEach(function(s){ process(s.amount, s.currency, s.milestones, false); });

  var hhRes = hhCostByWeek();
  var hhc = hhRes.cost, hasHHCost = hhRes.any;

  if (!any && !hasHHCost) return null;
  var ingAcum=[], egrAcum=[], hhAcum=[], diffNoHH=[], diffWithHH=[];
  var ai=0, ae=0, ah=0;
  for (var i=0;i<n;i++){
    ai+=ing[i]; ae+=egr[i]; ah+=hhc[i];
    ingAcum.push(ai); egrAcum.push(ae); hhAcum.push(ah);
    diffNoHH.push(ai-ae);
    diffWithHH.push(ai-ae-ah);
  }
  return { ing:ing, egr:egr, hhc:hhc, ingAcum:ingAcum, egrAcum:egrAcum, hhAcum:hhAcum, diffNoHH:diffNoHH, diffWithHH:diffWithHH, hasHHCost:hasHHCost };
}

// ---- searchable "actividad o módulo" combobox ----
function normalizeSearch(s){
  return (s||"").toString().toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"");
}
function buildAssocOptions(){
  var opts = [];
  state.modules.forEach(function(m){
    opts.push({ kind:"module", id:m.id, label: m.name + " (módulo completo)", search: normalizeSearch(m.name) });
    m.activities.forEach(function(a){
      opts.push({ kind:"activity", id:a.id, label: m.name + " › " + a.name, search: normalizeSearch(m.name + " " + a.name) });
    });
  });
  return opts;
}
function assocLabel(kind, id){
  if (kind === "module"){
    var m = null;
    for (var i=0;i<state.modules.length;i++){ if (state.modules[i].id === id){ m = state.modules[i]; break; } }
    return m ? (m.name + " (módulo completo)") : "";
  }
  if (kind === "activity"){
    var f = findActivity(id);
    return f ? (f.mod.name + " › " + f.act.name) : "";
  }
  return "";
}
function createAssocCombo(initKind, initId, onSelect){
  var kind = initKind || null, id = initId || null;
  var wrap = el("div","assoccombo");
  var input = el("input","assoccombo-input"); input.type="text"; input.autocomplete="off";
  input.placeholder = "Buscar actividad o módulo…";
  input.value = assocLabel(kind, id);
  var clearBtn = el("button","assoccombo-clear",{text:"×", title:"Quitar asociación (usar semana manual)"});
  clearBtn.type = "button";
  var list = el("div","assoccombo-list");
  list.style.display = "none";
  wrap.appendChild(input);
  wrap.appendChild(clearBtn);
  wrap.appendChild(list);

  function selectOpt(k, i){
    kind = k; id = i;
    input.value = assocLabel(kind, id);
    list.style.display = "none";
    onSelect(kind, id);
  }
  function renderList(filterText){
    list.innerHTML = "";
    var q = normalizeSearch(filterText);
    var filtered = buildAssocOptions().filter(function(o){ return !q || o.search.indexOf(q) !== -1; });
    if (!filtered.length){
      list.appendChild(el("div","assoccombo-empty",{text:"Sin resultados"}));
    } else {
      filtered.forEach(function(o){
        var row = el("div", "assoccombo-opt" + (o.kind==="module" ? " assoccombo-opt-module" : ""), {text:o.label});
        row.addEventListener("mousedown", function(ev){ ev.preventDefault(); selectOpt(o.kind, o.id); });
        list.appendChild(row);
      });
    }
    list.style.display = "block";
  }
  input.addEventListener("focus", function(){ input.select(); renderList(""); });
  input.addEventListener("input", function(){ renderList(input.value); });
  input.addEventListener("blur", function(){
    setTimeout(function(){ list.style.display = "none"; input.value = assocLabel(kind, id); }, 150);
  });
  clearBtn.addEventListener("click", function(ev){ ev.preventDefault(); selectOpt(null, null); });
  return wrap;
}

function statSpan(label, value){
  var s = el("span");
  s.appendChild(document.createTextNode(label + ": "));
  s.appendChild(el("b",null,{text: fmtMoney(value)}));
  return s;
}

// Small inline warning shown next to any amount whose currency has no defined
// conversion rate yet — that amount is silently excluded from totals until fixed.
function currencyWarningEl(code){
  if (!code) return null;
  var c = code.toUpperCase();
  if (c === "CLP") return null;
  if (currencyRate(c) !== null) return null;
  return el("span","currencywarn",{text:"⚠ sin tasa "+c, title:"No hay tasa de conversión definida para "+c+" (sección Monedas). Este monto no se incluye en los totales/gráfico hasta que definas su tasa."});
}

function mountCashflowChart(cfData){
  var canvas = document.getElementById("cashflowCanvas");
  if (!canvas) return;
  if (typeof Chart === "undefined"){
    var wrap = canvas.parentNode;
    if (wrap) wrap.replaceChild(el("div","empty",{text:"No se pudo cargar la librería de gráficos (sin conexión). Los totales de arriba siguen siendo correctos."}), canvas);
    return;
  }
  var labels = [];
  for (var i=0;i<state.weeks;i++) labels.push(String(i+1));
  if (financeChart){ financeChart.destroy(); financeChart = null; }
  var datasets = [
    { label:"Ingresos acumulados", data: cfData.ingAcum, borderColor:"#2e7d43", backgroundColor:"rgba(46,125,67,0.08)", tension:0.15, pointRadius:0, borderWidth:2 },
    { label:"Egresos acumulados", data: cfData.egrAcum, borderColor:"#c0392b", backgroundColor:"rgba(192,57,43,0.08)", tension:0.15, pointRadius:0, borderWidth:2 },
    { label:"Diferencia sin HH", data: cfData.diffNoHH, borderColor:"#2b6cb0", backgroundColor:"rgba(43,108,176,0.08)", tension:0.15, pointRadius:0, borderWidth:2, borderDash:[4,3] }
  ];
  if (cfData.hasHHCost){
    datasets.push({ label:"Costo HH acumulado", data: cfData.hhAcum, borderColor:"#DE7C00", backgroundColor:"rgba(222,124,0,0.08)", tension:0.15, pointRadius:0, borderWidth:2, borderDash:[2,2] });
    datasets.push({ label:"Diferencia con HH", data: cfData.diffWithHH, borderColor:"#7F77DD", backgroundColor:"rgba(127,119,221,0.08)", tension:0.15, pointRadius:0, borderWidth:2, borderDash:[6,3] });
  }

  // Milestone markers: small points laid exactly on the ingresos/egresos lines at the
  // week each hito falls on — no extra lines added, just labeled dots so the (necessarily
  // ever-rising) accumulated lines have concrete "why did it move here" anchors.
  var allMs = collectAllMilestones();
  var cobroLabels = {}, pagoLabels = {};
  var cobroPoints = [], pagoPoints = [], cobroRadii = [], pagoRadii = [];
  for (var wm=0; wm<state.weeks; wm++){ cobroPoints.push(null); pagoPoints.push(null); cobroRadii.push(0); pagoRadii.push(0); }
  allMs.forEach(function(ms){
    if (ms.type === "cobro"){
      cobroPoints[ms.week] = cfData.ingAcum[ms.week]; cobroRadii[ms.week] = 6;
      (cobroLabels[ms.week] = cobroLabels[ms.week]||[]).push(ms);
    } else {
      pagoPoints[ms.week] = cfData.egrAcum[ms.week]; pagoRadii[ms.week] = 6;
      (pagoLabels[ms.week] = pagoLabels[ms.week]||[]).push(ms);
    }
  });
  if (allMs.length){
    datasets.push({ label:"Hitos de cobro", data: cobroPoints, showLine:false, pointStyle:"triangle", pointRadius: cobroRadii, pointHoverRadius: 7, pointBackgroundColor:"#2e7d43", pointBorderColor:"#fff", pointBorderWidth:1 });
    datasets.push({ label:"Hitos de pago", data: pagoPoints, showLine:false, pointStyle:"rectRot", pointRadius: pagoRadii, pointHoverRadius: 7, pointBackgroundColor:"#DE7C00", pointBorderColor:"#fff", pointBorderWidth:1 });
  }

  financeChart = new Chart(canvas.getContext("2d"), {
    type: "line",
    data: { labels: labels, datasets: datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode:"index", intersect:false },
      scales: {
        x: { title: { display:true, text:"Semana", font:{size:10} }, ticks:{font:{size:9}} },
        y: { ticks: { callback: function(v){ return fmtNum(v); }, font:{size:9} } }
      },
      plugins: {
        legend: { position:"bottom", labels:{ boxWidth:12, font:{size:10} } },
        tooltip: {
          mode:"index", intersect:false,
          callbacks: {
            label: function(ctx){
              if (ctx.dataset.label === "Hitos de cobro" || ctx.dataset.label === "Hitos de pago"){
                var map = ctx.dataset.label === "Hitos de cobro" ? cobroLabels : pagoLabels;
                var atW = map[ctx.dataIndex];
                if (!atW || !atW.length) return null;
                var arrow = ctx.dataset.label === "Hitos de cobro" ? "↑ " : "↓ ";
                return atW.map(function(m){ return arrow + m.desc + (m.amount!==null ? (" — "+fmtMoney(m.amount)) : "") + " (" + m.source + ")"; });
              }
              return ctx.dataset.label + ": " + fmtMoney(ctx.parsed.y);
            }
          }
        }
      }
    }
  });
}

function newMilestone(){
  return { id: uid("ms"), desc:"", pct:null, assocKind:null, assocId:null, moment:"start", manualWeek:null };
}

function buildTotalRow(label, value, currency, onChangeValue, onChangeCurrency){
  var row = el("div","fintotalrow");
  row.appendChild(el("span","fintotallabel",{text:label}));
  var inp = el("input"); inp.type="number"; inp.placeholder="—"; inp.value = value===null?"":value;
  inp.addEventListener("change", function(ev){ var v=ev.target.value; onChangeValue(v===""?null:parseFloat(v)); });
  row.appendChild(inp);
  if (onChangeCurrency){
    var curInp = el("input","currencyinput"); curInp.type="text"; curInp.maxLength=6; curInp.placeholder="CLP";
    curInp.value = currency || "";
    curInp.addEventListener("change", function(ev){
      var v = ev.target.value.trim().toUpperCase();
      onChangeCurrency(v===""?null:v);
    });
    row.appendChild(curInp);
    var warn = currencyWarningEl(currency);
    if (warn) row.appendChild(warn);
  }
  return row;
}

function buildMilestoneRow(ms, total, currencyCode, milestones, onDelete){
  var tr = el("tr");

  var tdDesc = el("td"); var descInp = el("input"); descInp.type="text"; descInp.value=ms.desc; descInp.placeholder="Ej: Facturar 30% previo a envío";
  descInp.addEventListener("change", function(ev){ ms.desc=ev.target.value; save(); });
  tdDesc.appendChild(descInp); tr.appendChild(tdDesc);

  var tdPct = el("td"); var pctInp = el("input"); pctInp.type="number"; pctInp.min=0; pctInp.max=100; pctInp.step="0.1";
  pctInp.value = ms.pct===null?"":ms.pct; pctInp.placeholder="%";
  pctInp.addEventListener("change", function(ev){ var v=ev.target.value; ms.pct = v===""?null:parseFloat(v); save(); renderFinance(); });
  tdPct.appendChild(pctInp); tr.appendChild(tdPct);

  var tdAmt = el("td");
  var amt = milestoneAmount(total, ms);
  tdAmt.appendChild(el("span",null,{text: fmtMoneyIn(amt, currencyCode)}));
  tr.appendChild(tdAmt);

  var tdAssoc = el("td");
  var combo = createAssocCombo(ms.assocKind, ms.assocId, function(kind,id){ ms.assocKind=kind; ms.assocId=id; save(); renderFinance(); });
  tdAssoc.appendChild(combo); tr.appendChild(tdAssoc);

  var tdWhen = el("td");
  if (ms.assocKind){
    var momSel = el("select");
    [["start","Inicio"],["end","Fin"]].forEach(function(o){ var op=el("option"); op.value=o[0]; op.textContent=o[1]; if(ms.moment===o[0]) op.selected=true; momSel.appendChild(op); });
    momSel.addEventListener("change", function(ev){ ms.moment=ev.target.value; save(); renderFinance(); });
    tdWhen.appendChild(momSel);
  } else {
    var wkInp = el("input"); wkInp.type="number"; wkInp.min=1; wkInp.max=state.weeks;
    wkInp.value = (typeof ms.manualWeek === "number") ? (ms.manualWeek+1) : "";
    wkInp.placeholder="Semana manual";
    wkInp.addEventListener("change", function(ev){ var v=ev.target.value; ms.manualWeek = v===""?null:(parseInt(v,10)-1); save(); renderFinance(); });
    tdWhen.appendChild(wkInp);
  }
  tr.appendChild(tdWhen);

  var tdWeek = el("td");
  var wk = milestoneWeek(ms);
  if (wk === null && typeof ms.pct === "number"){
    tdWeek.appendChild(el("span","weektag weekwarn",{text:"⚠ sin semana", title:"Tiene % asignado pero no se pudo resolver una semana (revisa la actividad/módulo asociado, o define una semana manual). Mientras tanto, este monto NO se cuenta en los totales de ingresos/egresos."}));
  } else {
    tdWeek.appendChild(el("span","weektag",{text: wk===null ? "—" : ("Semana " + (wk+1))}));
  }
  tr.appendChild(tdWeek);

  var tdDel = el("td","actioncell");
  if (milestones && milestones.length > 1){
    var msIdx = milestones.indexOf(ms);
    var upMsBtn = el("button","icobtn",{text:"▲", title:"Subir"});
    upMsBtn.disabled = (msIdx <= 0);
    upMsBtn.addEventListener("click", function(){ moveArrayItem(milestones, ms, -1); save(); renderFinance(); });
    tdDel.appendChild(upMsBtn);
    var downMsBtn = el("button","icobtn",{text:"▼", title:"Bajar"});
    downMsBtn.disabled = (msIdx >= milestones.length-1);
    downMsBtn.addEventListener("click", function(){ moveArrayItem(milestones, ms, 1); save(); renderFinance(); });
    tdDel.appendChild(downMsBtn);
  }
  var delB = el("button",null,{text:"Eliminar"});
  delB.addEventListener("click", onDelete);
  tdDel.appendChild(delB); tr.appendChild(tdDel);

  return tr;
}

function pctSumBadge(milestones){
  var sum = 0, any = false;
  milestones.forEach(function(ms){ if (typeof ms.pct === "number"){ sum += ms.pct; any = true; } });
  if (!any) return null;
  sum = Math.round(sum*100)/100;
  var ok = Math.abs(sum-100) < 0.01;
  var cls = "pctbadge " + (ok ? "pctok" : "pctwarn");
  var txt;
  if (ok) txt = "✓ Suma de %: 100%";
  else if (sum < 100) txt = "⚠ Suma de %: " + sum + "% — falta " + (Math.round((100-sum)*100)/100) + "% por asignar";
  else txt = "⚠ Suma de %: " + sum + "% — sobra " + (Math.round((sum-100)*100)/100) + "% (suma más de 100%)";
  return el("div", cls, {text: txt});
}

function buildMilestonesTable(total, milestones, onAdd, emptyHint, currencyCode){
  var wrap = el("div");
  if (!milestones.length){
    wrap.appendChild(el("div","empty",{text: emptyHint || "Sin hitos todavía."}));
  } else {
    var table = el("table","fintable");
    var thead = el("thead"); var htr = el("tr");
    ["Descripción","%","Monto","Asociado a (actividad o módulo)","Inicio/fin o semana manual","Semana",""].forEach(function(h){ htr.appendChild(el("th",null,{text:h})); });
    thead.appendChild(htr); table.appendChild(thead);
    var tbody = el("tbody");
    milestones.forEach(function(ms){
      tbody.appendChild(buildMilestoneRow(ms, total, currencyCode, milestones, function(){
        var idx = milestones.indexOf(ms);
        if (idx>=0) milestones.splice(idx,1);
        save(); renderFinance();
      }));
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
    var badge = pctSumBadge(milestones);
    if (badge) wrap.appendChild(badge);
  }
  var addBtn = el("button","finaddbtn",{text:"+ Agregar hito"});
  addBtn.addEventListener("click", onAdd);
  wrap.appendChild(addBtn);
  return wrap;
}

function collapsibleSectionHeader(key, title){
  var fin = state.finance;
  if (!fin.sectionsCollapsed) fin.sectionsCollapsed = {};
  var collapsed = !!fin.sectionsCollapsed[key];
  var head = el("div","finsubheader");
  head.appendChild(el("span","chevron",{text: collapsed ? "▸" : "▾"}));
  head.appendChild(el("h4",null,{text:title}));
  head.addEventListener("click", function(){
    fin.sectionsCollapsed[key] = !collapsed;
    save(); renderFinance();
  });
  return { head: head, collapsed: collapsed };
}

function setComputedCardValue(id, value, emptyText){
  var v = document.getElementById(id);
  if (!v) return;
  if (value === null){ v.className = "kpivalempty"; v.textContent = emptyText; }
  else { v.className = "kpival"; v.textContent = fmtMoney(value); }
}

// Lightweight refresh for numbers that depend on HH/rate, without tearing down
// the tables (a full renderFinance() rebuild mid-edit breaks Tab/focus).
function refreshFinanceComputed(){
  var fin = state.finance;
  var computedHH = hhSum();
  var hint = document.getElementById("hhSumHint");
  if (hint) hint.textContent = (computedHH===null ? "Sin HH por actividad cargadas." : ("Suma por actividad: " + computedHH + " hh.")) + " Deja vacío para usar la suma.";

  var hhT = hhTotal();
  var rate = fin.hhRate;
  var hhCostNative = (typeof rate === "number" && hhT !== null) ? hhT*rate : null;
  var hhCost = convertedTotal(hhCostNative, fin.hhRateCurrency);
  var hhCostEmptyTxt = (hhCostNative !== null && hhCost === null) ? ("— falta tasa de " + (fin.hhRateCurrency||"")) : "— sin valor HH";
  setComputedCardValue("kpiCostoHHVal", hhCost, hhCostEmptyTxt);

  var cfData = cashflowByWeek();
  var summary = document.getElementById("finCashSummary");
  if (summary){
    summary.innerHTML = "";
    var ingTotal = cfData ? cfData.ingAcum[cfData.ingAcum.length-1] : null;
    var egrTotal = cfData ? cfData.egrAcum[cfData.egrAcum.length-1] : null;
    summary.appendChild(statSpan("Ingresos totales", ingTotal));
    summary.appendChild(statSpan("Egresos totales", egrTotal));
    summary.appendChild(statSpan("Diferencia sin HH", (ingTotal||0)-(egrTotal||0)));
    if (cfData && cfData.hasHHCost){
      summary.appendChild(statSpan("Costo HH total", cfData.hhAcum[cfData.hhAcum.length-1]));
      summary.appendChild(statSpan("Diferencia con HH", cfData.diffWithHH[cfData.diffWithHH.length-1]));
    }
  }
  if (cfData) mountCashflowChart(cfData);
  else if (financeChart){ financeChart.destroy(); financeChart = null; }
}

function renderFinance(){
  var body = document.getElementById("financeBody");
  var fin = state.finance;
  document.getElementById("financeChevron").textContent = fin.collapsed ? "▸" : "▾";
  if (fin.collapsed){ body.style.display = "none"; return; }
  if (financeChart){ financeChart.destroy(); financeChart = null; }
  body.style.display = "block";
  body.innerHTML = "";

  var cfData = cashflowByWeek();

  // --- Resumen ---
  var kpiSection = el("div","finsection");
  var kpiHdr = collapsibleSectionHeader("resumen", "Resumen");
  kpiSection.appendChild(kpiHdr.head);
  if (!kpiHdr.collapsed){
    var kpiRow = el("div","kpirow");

    function computedCard(label, value, emptyText, valId){
      var c = el("div","kpicard computed");
      c.appendChild(el("label",null,{text:label}));
      var valEl = value===null ? el("div","kpivalempty",{text:emptyText}) : el("div","kpival",{text:fmtMoney(value)});
      if (valId) valEl.id = valId;
      c.appendChild(valEl);
      return c;
    }

    kpiRow.appendChild(computedCard("Total contrato cliente", convertedTotal(fin.clientContract.total, fin.clientContract.currency), "— sin definir"));
    kpiRow.appendChild(computedCard("Costo materiales total", convertedTotal(fin.materials.total, fin.materials.currency), "— sin definir"));
    var subTotal = subcontractsTotal();
    kpiRow.appendChild(computedCard("Costo subcontratos (suma)", subTotal, "— sin subcontratos"));

    var computedHH = hhSum();
    var hhCard = el("div","kpicard");
    hhCard.appendChild(el("label",null,{text:"HH total del proyecto"}));
    var hhInp = el("input"); hhInp.type="number";
    hhInp.placeholder = computedHH===null ? "—" : String(computedHH);
    hhInp.value = fin.hhManualTotal===null?"":fin.hhManualTotal;
    hhInp.addEventListener("change", function(ev){ var v=ev.target.value; fin.hhManualTotal = v===""?null:parseFloat(v); save(); renderFinance(); });
    hhCard.appendChild(hhInp);
    var hhHintTxt = computedHH===null ? "Sin HH por actividad cargadas." : ("Suma por actividad: " + computedHH + " hh.");
    var hhHint = el("div","kpihint",{text: hhHintTxt + " Deja vacío para usar la suma."});
    hhHint.id = "hhSumHint";
    hhCard.appendChild(hhHint);
    kpiRow.appendChild(hhCard);

    var rateCard = el("div","kpicard");
    rateCard.appendChild(el("label",null,{text:"Valor HH (por hora)"}));
    var rateWrap = el("div"); rateWrap.style.display="flex"; rateWrap.style.gap="4px"; rateWrap.style.alignItems="center";
    var rateInp = el("input"); rateInp.type="number"; rateInp.placeholder="—"; rateInp.style.flex="1 1 auto";
    rateInp.value = fin.hhRate===null?"":fin.hhRate;
    rateInp.addEventListener("change", function(ev){ var v=ev.target.value; fin.hhRate = v===""?null:parseFloat(v); save(); renderFinance(); });
    rateWrap.appendChild(rateInp);
    var rateCurInp = el("input","currencyinput"); rateCurInp.type="text"; rateCurInp.maxLength=6; rateCurInp.placeholder="CLP";
    rateCurInp.value = fin.hhRateCurrency || "";
    rateCurInp.addEventListener("change", function(ev){
      var v = ev.target.value.trim().toUpperCase();
      fin.hhRateCurrency = v===""?null:v;
      save(); renderFinance();
    });
    rateWrap.appendChild(rateCurInp);
    rateCard.appendChild(rateWrap);
    var rateWarn = currencyWarningEl(fin.hhRateCurrency);
    if (rateWarn) rateCard.appendChild(rateWarn);
    rateCard.appendChild(el("div","kpihint",{text:"Por defecto en UF. Si lo defines (y hay tasa para su moneda), el costo de HH se suma como línea aparte en el flujo de caja."}));
    kpiRow.appendChild(rateCard);

    var hhT = hhTotal();
    var hhCostValNative = (typeof fin.hhRate === "number" && hhT !== null) ? hhT*fin.hhRate : null;
    var hhCostVal = convertedTotal(hhCostValNative, fin.hhRateCurrency);
    var hhCostEmptyTxt2 = (hhCostValNative !== null && hhCostVal === null) ? ("— falta tasa de " + (fin.hhRateCurrency||"")) : "— sin valor HH";
    kpiRow.appendChild(computedCard("Costo HH total", hhCostVal, hhCostEmptyTxt2, "kpiCostoHHVal"));

    var ingTotal = cfData ? cfData.ingAcum[cfData.ingAcum.length-1] : null;
    var egrTotal = cfData ? cfData.egrAcum[cfData.egrAcum.length-1] : null;
    kpiRow.appendChild(computedCard("Ingresos totales (hitos)", ingTotal, "— sin hitos de cobro"));
    kpiRow.appendChild(computedCard("Egresos totales (hitos)", egrTotal, "— sin hitos de pago"));

    kpiSection.appendChild(kpiRow);
    kpiSection.appendChild(el("div","kpihint",{text:"Los totales de contrato/materiales/subcontratos se ingresan en sus propias secciones más abajo."}));
  }
  body.appendChild(kpiSection);

  // --- Monedas ---
  var curSection = el("div","finsection");
  var curHdr = collapsibleSectionHeader("monedas", "Monedas (opcional)");
  curSection.appendChild(curHdr.head);
  if (!curHdr.collapsed){
    curSection.appendChild(el("div","kpihint",{text:"Si vas a ingresar montos en distintas monedas (materiales, subcontratos, cobros), define aquí la moneda principal para los totales y la tasa de conversión de cada moneda respecto al peso chileno (CLP). Si todo está en CLP, no necesitas tocar esta sección."}));

    var mainRow = el("div","fintotalrow");
    mainRow.appendChild(el("span","fintotallabel",{text:"Moneda principal (para totales):"}));
    var mainInp = el("input","currencyinput"); mainInp.type="text"; mainInp.maxLength=6;
    mainInp.value = fin.mainCurrency || "CLP";
    mainInp.addEventListener("change", function(ev){
      var v = ev.target.value.trim().toUpperCase();
      fin.mainCurrency = v===""?"CLP":v;
      save(); renderFinance();
    });
    mainRow.appendChild(mainInp);
    var updateRatesBtn = el("button",null,{text:"🔄 Actualizar sugerencias"});
    updateRatesBtn.id = "updateRatesBtn";
    updateRatesBtn.title = "Trae el valor del día de UF/USD/EUR desde mindicador.cl (API pública chilena). No cambia las tasas que ya definiste, solo la columna de sugerencia.";
    updateRatesBtn.addEventListener("click", updateCurrencyRates);
    mainRow.appendChild(updateRatesBtn);
    curSection.appendChild(mainRow);
    if (currencyUpdateStatus) curSection.appendChild(el("div","kpihint",{text: currencyUpdateStatus}));

    if (!fin.currencies.length){
      curSection.appendChild(el("div","empty",{text:"Sin monedas adicionales definidas."}));
    } else {
      var curTable = el("table","fintable");
      var curThead = el("thead"); var curHtr = el("tr");
      ["Código","Tasa (CLP por 1 unidad)","Sugerencia de hoy",""].forEach(function(h){ curHtr.appendChild(el("th",null,{text:h})); });
      curThead.appendChild(curHtr); curTable.appendChild(curThead);
      var curTbody = el("tbody");
      fin.currencies.forEach(function(c){
        var tr = el("tr");
        var tdCode = el("td"); var codeInp = el("input"); codeInp.type="text"; codeInp.maxLength=6; codeInp.value=c.code||""; codeInp.placeholder="USD";
        codeInp.addEventListener("change", function(ev){ c.code = ev.target.value.trim().toUpperCase(); save(); renderFinance(); });
        tdCode.appendChild(codeInp); tr.appendChild(tdCode);

        var tdRate = el("td"); var rateInp = el("input"); rateInp.type="number"; rateInp.step="0.01"; rateInp.value = c.rate===null?"":c.rate; rateInp.placeholder="—";
        rateInp.addEventListener("change", function(ev){ var v=ev.target.value; c.rate = v===""?null:parseFloat(v); save(); renderFinance(); });
        tdRate.appendChild(rateInp); tr.appendChild(tdRate);

        var tdHint = el("td");
        var hintVal = CURRENCY_RATE_HINTS[(c.code||"").toUpperCase()];
        tdHint.appendChild(el("span","kpihint",{text: typeof hintVal === "number" ? (fmtNum(hintVal) + " (" + CURRENCY_RATE_HINTS_DATE + ")") : "—"}));
        tr.appendChild(tdHint);

        var tdDel = el("td","actioncell"); var delB = el("button",null,{text:"Eliminar"});
        delB.addEventListener("click", function(cc){ return function(){
          fin.currencies = fin.currencies.filter(function(x){return x!==cc;});
          save(); renderFinance();
        }; }(c));
        tdDel.appendChild(delB); tr.appendChild(tdDel);

        curTbody.appendChild(tr);
      });
      curTable.appendChild(curTbody);
      curSection.appendChild(curTable);
    }
    var addCurBtn = el("button","finaddbtn",{text:"+ Agregar moneda"});
    addCurBtn.addEventListener("click", function(){ fin.currencies.push({code:"", rate:null}); save(); renderFinance(); });
    curSection.appendChild(addCurBtn);
  }
  body.appendChild(curSection);

  // --- Contrato con cliente ---
  var clientSection = el("div","finsection");
  var clientHdr = collapsibleSectionHeader("cliente", "Contrato con cliente — hitos de cobro");
  clientSection.appendChild(clientHdr.head);
  if (!clientHdr.collapsed){
    clientSection.appendChild(el("div","kpihint",{text:'Define el monto total del contrato y el % que corresponde a cada hito. Ej: "Facturar 30% previo a envío".'}));
    clientSection.appendChild(buildTotalRow("Total contrato cliente:", fin.clientContract.total, fin.clientContract.currency, function(v){ fin.clientContract.total=v; save(); renderFinance(); }, function(c){ fin.clientContract.currency=c; save(); renderFinance(); }));
    clientSection.appendChild(buildMilestonesTable(fin.clientContract.total, fin.clientContract.milestones, function(){
      fin.clientContract.milestones.push(newMilestone()); save(); renderFinance();
    }, null, fin.clientContract.currency));
  }
  body.appendChild(clientSection);

  // --- Materiales ---
  var matSection = el("div","finsection");
  var matHdr = collapsibleSectionHeader("materiales", "Materiales — hitos de pago");
  matSection.appendChild(matHdr.head);
  if (!matHdr.collapsed){
    matSection.appendChild(el("div","kpihint",{text:"Define el costo total de materiales y el % que corresponde a cada pago."}));
    matSection.appendChild(buildTotalRow("Costo materiales total:", fin.materials.total, fin.materials.currency, function(v){ fin.materials.total=v; save(); renderFinance(); }, function(c){ fin.materials.currency=c; save(); renderFinance(); }));
    matSection.appendChild(buildMilestonesTable(fin.materials.total, fin.materials.milestones, function(){
      fin.materials.milestones.push(newMilestone()); save(); renderFinance();
    }, null, fin.materials.currency));
  }
  body.appendChild(matSection);

  // --- Subcontratos ---
  var subSection = el("div","finsection");
  var subHdr = collapsibleSectionHeader("subcontratos", "Subcontratos");
  subSection.appendChild(subHdr.head);
  if (!subHdr.collapsed){
    subSection.appendChild(el("div","kpihint",{text:'Crea el subcontrato con su monto total y agrega sus hitos de pago (%) directamente aquí. Ej: "Pagar 50% de anticipo previo a inicio del diseño".'}));
    if (!fin.subcontracts.length){
      subSection.appendChild(el("div","empty",{text:"Sin subcontratos agregados."}));
    } else {
      fin.subcontracts.forEach(function(s){
        var card = el("div","subcard");
        card.dataset.subId = s.id;
        var cardHead = el("div","subcardhead");
        var nameInp = el("input","subname"); nameInp.type="text"; nameInp.value=s.name; nameInp.placeholder="Nombre del subcontratista";
        nameInp.addEventListener("change", function(ev){ s.name=ev.target.value; save(); });
        cardHead.appendChild(nameInp);

        var amtWrap = el("span","fintotalwrap");
        amtWrap.appendChild(el("span","fintotallabel",{text:"Monto total:"}));
        var amtInp = el("input"); amtInp.type="number"; amtInp.value=s.amount===null?"":s.amount; amtInp.placeholder="0";
        amtInp.addEventListener("change", function(ev){ var v=ev.target.value; s.amount = v===""?null:parseFloat(v); save(); renderFinance(); });
        amtWrap.appendChild(amtInp);
        var curInp = el("input","currencyinput"); curInp.type="text"; curInp.maxLength=6; curInp.placeholder="CLP";
        curInp.value = s.currency || "";
        curInp.addEventListener("change", function(ss){ return function(ev){
          var v = ev.target.value.trim().toUpperCase();
          ss.currency = v===""?null:v; save(); renderFinance();
        }; }(s));
        amtWrap.appendChild(curInp);
        var mainCurForSub = (fin.mainCurrency || "CLP").toUpperCase();
        var scCurNorm = (s.currency || "CLP").toUpperCase();
        if (s.currency && scCurNorm !== mainCurForSub){
          var scConv = convertedTotal(s.amount, s.currency);
          if (scConv !== null){
            amtWrap.appendChild(el("span","kpihint convertedhint",{text: "≈ " + fmtMoneyIn(scConv, mainCurForSub)}));
          }
        }
        var scWarn = currencyWarningEl(s.currency);
        if (scWarn) amtWrap.appendChild(scWarn);
        cardHead.appendChild(amtWrap);

        if (fin.subcontracts.length > 1){
          var dragSubHandle = el("span","draghandle",{text:"⠿", title:"Arrastrar para reordenar"});
          dragSubHandle.setAttribute("draggable","true");
          dragSubHandle.addEventListener("dragstart", function(ss){ return function(ev){
            dragSubId = ss.id;
            card.classList.add("dragging");
            if (ev.dataTransfer){ try { ev.dataTransfer.effectAllowed = "move"; ev.dataTransfer.setData("text/plain", ss.id); } catch(e){} }
          }; }(s));
          dragSubHandle.addEventListener("dragend", function(){ dragSubId = null; card.classList.remove("dragging"); });
          cardHead.appendChild(dragSubHandle);
        }
        var delSubBtn = el("button","danger",{text:"Eliminar subcontrato"});
        delSubBtn.addEventListener("click", function(ss){ return function(){
          if (!confirmish(delSubBtn, "eliminar subcontrato")) return;
          fin.subcontracts = fin.subcontracts.filter(function(x){return x!==ss;});
          save(); renderFinance();
        }; }(s));
        cardHead.appendChild(delSubBtn);
        card.appendChild(cardHead);
        card.addEventListener("dragover", function(ss){ return function(ev){
          if (!dragSubId) return;
          ev.preventDefault();
          if (ev.dataTransfer) ev.dataTransfer.dropEffect = "move";
          var rect = card.getBoundingClientRect();
          var before = (ev.clientY - rect.top) < (rect.height/2);
          card.classList.remove("dragover-before","dragover-after");
          card.classList.add(before ? "dragover-before" : "dragover-after");
        }; }(s));
        card.addEventListener("dragleave", function(){ card.classList.remove("dragover-before","dragover-after"); });
        card.addEventListener("drop", function(ss){ return function(ev){
          if (!dragSubId) return;
          ev.preventDefault();
          card.classList.remove("dragover-before","dragover-after");
          if (dragSubId !== ss.id){
            var rect = card.getBoundingClientRect();
            var before = (ev.clientY - rect.top) < (rect.height/2);
            var srcSub = fin.subcontracts.find(function(x){ return x.id === dragSubId; });
            if (srcSub){ moveArrayItemRelative(fin.subcontracts, srcSub, ss, before); save(); }
          }
          dragSubId = null;
          renderFinance();
        }; }(s));

        card.appendChild(buildMilestonesTable(s.amount, s.milestones, function(){
          s.milestones.push(newMilestone()); save(); renderFinance();
        }, "Sin hitos de pago para este subcontrato todavía.", s.currency));

        subSection.appendChild(card);
      });
    }
    var addSubBtn = el("button","finaddbtn",{text:"+ Agregar subcontrato"});
    addSubBtn.addEventListener("click", function(){ fin.subcontracts.push({id:uid("sc"), name:"", amount:null, currency:null, milestones:[]}); save(); renderFinance(); });
    subSection.appendChild(addSubBtn);
  }
  body.appendChild(subSection);

  // --- HH por actividad ---
  var hhSection = el("div","finsection");
  var hhHdr = collapsibleSectionHeader("hh", "HH por actividad (opcional)");
  hhSection.appendChild(hhHdr.head);
  if (!hhHdr.collapsed){
    var allActs = allActivitiesFlat();
    if (!allActs.length){
      hhSection.appendChild(el("div","empty",{text:"No hay actividades todavía."}));
    } else {
      hhSection.appendChild(el("div","kpihint",{text:"Tip: usa Tab o Enter para pasar al siguiente campo — los totales de arriba se actualizan solos, sin perder tu lugar."}));
      var hhTable = el("table","fintable");
      var hhThead = el("thead"); var hhHtr = el("tr");
      hhHtr.appendChild(el("th",null,{text:"Módulo › Actividad"}));
      hhHtr.appendChild(el("th",null,{text:"HH"}));
      hhThead.appendChild(hhHtr); hhTable.appendChild(hhThead);
      var hhTbody = el("tbody");
      var hhInputs = [];
      allActs.forEach(function(entry){
        var tr = el("tr");
        tr.appendChild(el("td",null,{text: entry.mod.name + " › " + entry.act.name}));
        var tdHH = el("td"); var hhi = el("input"); hhi.type="number"; hhi.value = entry.act.hh===null?"":entry.act.hh; hhi.placeholder="—";
        hhi.addEventListener("change", function(aa){ return function(ev){
          var v=ev.target.value; aa.hh = v===""?null:parseFloat(v); save();
          refreshFinanceComputed();
        }; }(entry.act));
        hhi.addEventListener("keydown", function(ev){
          if (ev.key === "Enter"){
            ev.preventDefault();
            var idx = hhInputs.indexOf(ev.target);
            var next = hhInputs[idx+1];
            if (next){ next.focus(); next.select(); } else { ev.target.blur(); }
          }
        });
        tdHH.appendChild(hhi); tr.appendChild(tdHH);
        hhInputs.push(hhi);
        hhTbody.appendChild(tr);
      });
      hhTable.appendChild(hhTbody);
      hhSection.appendChild(hhTable);
    }
  }
  body.appendChild(hhSection);

  // --- Flujo de caja ---
  var chartSection = el("div","finsection");
  var chartHdr = collapsibleSectionHeader("flujo", "Flujo de caja acumulado");
  chartSection.appendChild(chartHdr.head);
  if (!chartHdr.collapsed){
    if (!cfData){
      chartSection.appendChild(el("div","empty",{text:"Agrega hitos con % y un total definido (o valor HH) para ver el flujo de caja."}));
    } else {
      var wrap = el("div","chartwrap");
      var canvas = el("canvas"); canvas.id = "cashflowCanvas";
      wrap.appendChild(canvas);
      chartSection.appendChild(wrap);
      var summary = el("div","fincashsummary"); summary.id = "finCashSummary";
      var ingTotal2 = cfData.ingAcum[cfData.ingAcum.length-1];
      var egrTotal2 = cfData.egrAcum[cfData.egrAcum.length-1];
      summary.appendChild(statSpan("Ingresos totales", ingTotal2));
      summary.appendChild(statSpan("Egresos totales", egrTotal2));
      summary.appendChild(statSpan("Diferencia sin HH", ingTotal2-egrTotal2));
      if (cfData.hasHHCost){
        summary.appendChild(statSpan("Costo HH total", cfData.hhAcum[cfData.hhAcum.length-1]));
        summary.appendChild(statSpan("Diferencia con HH", cfData.diffWithHH[cfData.diffWithHH.length-1]));
      }
      chartSection.appendChild(summary);
    }
  }
  body.appendChild(chartSection);

  if (!chartHdr.collapsed && cfData) mountCashflowChart(cfData);
}

document.getElementById("weeksInput").addEventListener("change", function(ev){
  var v = parseInt(ev.target.value, 10);
  if (isNaN(v) || v < 8) v = 8;
  if (v > 80) v = 80;
  state.weeks = v;
  state.modules.forEach(function(m){
    m.activities.forEach(function(a){
      if (a.start!==null && a.start >= v) { a.start=null; a.end=null; }
      else if (a.end!==null && a.end >= v) a.end = v-1;
    });
  });
  save(); render();
});
document.getElementById("weeksInput").value = state.weeks;

document.getElementById("addModuleBtn").addEventListener("click", function(){
  state.modules.push({ id: uid("mod"), name: "Nuevo módulo", color: nextColor(), collapsed:false, activities: [
    { id: uid("act"), name: "Nueva actividad", start:null, end:null, hh:null }
  ]});
  save(); render();
});
document.getElementById("collapseAllBtn").addEventListener("click", function(){
  state.modules.forEach(function(m){ m.collapsed = true; });
  save(); render();
});
document.getElementById("expandAllBtn").addEventListener("click", function(){
  state.modules.forEach(function(m){ m.collapsed = false; });
  save(); render();
});
document.getElementById("saveFileBtn").addEventListener("click", saveToFile);
document.getElementById("loadFileBtn").addEventListener("click", openFileSmart);
document.getElementById("loadFileInput").addEventListener("change", function(ev){
  var f = ev.target.files && ev.target.files[0];
  if (f) loadFromFile(f);
  ev.target.value = "";
});
document.getElementById("exportBtn").addEventListener("click", exportExcel);
document.getElementById("chooseDirBtn").addEventListener("click", chooseProjectsFolder);
document.getElementById("critPathMode").addEventListener("change", function(ev){
  critPathMode = ev.target.value;
  render();
});
restoreDirHandle();
updateDirIndicator();
document.getElementById("depFilterText").addEventListener("input", renderDepsOnly);
document.getElementById("depFilterEstado").addEventListener("change", renderDepsOnly);
document.querySelectorAll("#depsTable th[data-key]").forEach(function(th){
  th.addEventListener("click", function(){
    var key = th.getAttribute("data-key");
    if (depSortKey === key) depSortDir = -depSortDir;
    else { depSortKey = key; depSortDir = 1; }
    renderDepsOnly();
  });
});
document.getElementById("addDepBtn").addEventListener("click", function(){
  var from = document.getElementById("depFrom").value;
  var to = document.getElementById("depTo").value;
  var type = document.getElementById("depType").value;
  var delay = parseInt(document.getElementById("depDelay").value,10) || 0;
  if (!from || !to || from === to) return;
  state.deps.push({ id: uid("dep"), from: from, to: to, type: type, delay: delay });
  save(); render();
});
document.getElementById("financeHeader").addEventListener("click", function(){
  state.finance.collapsed = !state.finance.collapsed;
  save();
  renderFinance();
});
document.getElementById("depsHeader").addEventListener("click", function(){
  state.depsCollapsed = !state.depsCollapsed;
  save();
  renderDeps(computeViolations());
});
document.getElementById("resetBtn").addEventListener("click", function(){
  if (!confirmish(this, "restaurar el borrador inicial (se perderán tus cambios)")) return;
  state = defaultState();
  document.getElementById("weeksInput").value = state.weeks;
  save(); render();
});

render();
</script>
</body>
</html>
`;
