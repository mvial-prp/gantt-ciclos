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
.critexemptbtn{font-size:11px;}
.critexemptbtn.active{color:var(--pr-orange);background:#fdf1e2;}
.critexemptbtn.active:hover{color:var(--pr-orange);background:#fbe6cc;}
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
.row.mstitlerow{height:72px;border-bottom:1px solid #eee;}
.mstitlecell{border-right:1px solid #f0f0f1;overflow:hidden;}
.mstitlecell.msline{display:flex;align-items:flex-end;justify-content:center;padding-bottom:3px;}
.mstitlecell.msline span{writing-mode:vertical-rl;transform:rotate(180deg);font-size:9px;font-weight:600;color:var(--pr-orange);white-space:nowrap;max-height:68px;overflow:hidden;text-overflow:ellipsis;cursor:help;}
.msline{box-shadow: inset 3px 0 0 0 var(--pr-orange);}
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
.appversion{margin-top:18px;text-align:right;font-size:10.5px;color:#c2c6cc;}
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
  <p class="sub">Semanas contadas desde que se cumplen las condiciones de inicio (Semana 1 = cumplimiento de condiciones). Click en un cuadro vacío extiende la barra; click en el borde de una barra la achica. Arrastra los tiradores de los extremos para mover inicio o fin. Los cambios se guardan solos en este navegador; usa "Guardar archivo" para respaldar o compartir con otra persona.</p>
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
    <div class="selbar" id="depsSelBar" style="display:none;"></div>
    <div class="deptable-wrap">
      <table class="deptable" id="depsTable">
        <thead>
          <tr>
            <th></th>
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
  <div class="appversion" id="appVersion"></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.js" integrity="sha384-iU8HYtnGQ8Cy4zl7gbNMOhsDTTKX02BTXptVP/vqAWIaTfM7isw76iyZCsjL2eVi" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js" integrity="sha512-dlPw+ytv/6JyepmelABrgeYgHI0O+frEwgfnPdXDTOIZz+eDgfW07QXG02/O8COfivBdGNINy+Vex+lYmJ5rxw==" crossorigin="anonymous"></script>
<script>
var LABEL_W = 280;
var COL_W = 26;

// Número de versión de esta aplicación — se muestra al pie de la página. Súbelo cada
// vez que se pida un cambio, para que el usuario pueda confirmar visualmente que está
// abriendo la última versión.
var APP_VERSION = "1";

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
  m_sup.critExempt = true; // grupo especial: no entra al cálculo de ruta crítica

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
    // Grupos especiales (Supervisión y similares) no entran al cálculo de ruta
    // crítica. Los archivos antiguos no tienen este campo: se infiere por nombre
    // solo la primera vez (si el usuario lo cambia a mano después, se respeta).
    if (typeof m.critExempt === "undefined") m.critExempt = /supervis/i.test(m.name || "");
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
var selectedDeps = {}; // depId -> true, selección múltiple en la tabla de Dependencias (transient)

function depSelectedIds(){ return Object.keys(selectedDeps).filter(function(id){ return selectedDeps[id]; }); }
function clearDepSelection(){ selectedDeps = {}; renderDepsOnly(); }
// Mueve el bloque de dependencias seleccionadas una posición hacia arriba (dir<0) o
// abajo (dir>0) dentro de state.deps, preservando el orden relativo entre ellas —
// mismo algoritmo clásico de "mover selección" de una lista (procesa de arriba hacia
// abajo al subir, de abajo hacia arriba al bajar, para que los ítems ya movidos no
// se pisen entre sí).
function moveDepsBlock(dir){
  var ids = depSelectedIds();
  if (!ids.length || !dir) return;
  var idxSet = {};
  ids.forEach(function(id){
    var i = state.deps.findIndex(function(d){ return d.id === id; });
    if (i >= 0) idxSet[i] = true;
  });
  var indices = Object.keys(idxSet).map(Number);
  if (dir < 0){
    indices.sort(function(a,b){ return a-b; });
    indices.forEach(function(i){
      if (i > 0 && !idxSet[i-1]){
        var tmp = state.deps[i-1]; state.deps[i-1] = state.deps[i]; state.deps[i] = tmp;
        idxSet[i-1] = true; delete idxSet[i];
      }
    });
  } else {
    indices.sort(function(a,b){ return b-a; });
    indices.forEach(function(i){
      if (i < state.deps.length-1 && !idxSet[i+1]){
        var tmp2 = state.deps[i+1]; state.deps[i+1] = state.deps[i]; state.deps[i] = tmp2;
        idxSet[i+1] = true; delete idxSet[i];
      }
    });
  }
  save(); renderDepsOnly();
}
function renderDepsSelBar(){
  var bar = document.getElementById("depsSelBar");
  if (!bar) return;
  var ids = depSelectedIds();
  if (!ids.length){ bar.style.display = "none"; bar.innerHTML = ""; return; }
  bar.style.display = "flex";
  bar.innerHTML = "";
  bar.appendChild(el("span",null,{text: ids.length + " dependencia" + (ids.length===1?"":"s") + " seleccionada" + (ids.length===1?"":"s") + " —"}));
  var upBtn = el("button",null,{text:"↑ Subir"});
  upBtn.addEventListener("click", function(){ moveDepsBlock(-1); });
  bar.appendChild(upBtn);
  var downBtn = el("button",null,{text:"↓ Bajar"});
  downBtn.addEventListener("click", function(){ moveDepsBlock(1); });
  bar.appendChild(downBtn);
  var clearBtn = el("button",null,{text:"Limpiar selección"});
  clearBtn.addEventListener("click", clearDepSelection);
  bar.appendChild(clearBtn);
}

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
// Grupos "especiales" (p.ej. Supervisión del proyecto) que corren en paralelo a todo
// el proyecto y no representan una secuencia real de trabajo: se excluyen del cálculo
// de ruta crítica (nunca se marcan como críticos, y sus dependencias no afectan a las
// demás actividades), pero se siguen mostrando normalmente en la carta Gantt.
function isCritExemptModule(m){ return !!m.critExempt; }
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
    if (isCritExemptModule(m)) return; // grupo especial (p.ej. Supervisión): no entra al cálculo
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

  var clientMsByWeek = collectClientMilestonesByWeek();
  if (Object.keys(clientMsByWeek).length){
    var msRow = el("div","row mstitlerow");
    msRow.style.display = "grid";
    msRow.style.gridTemplateColumns = colTemplate();
    msRow.appendChild(el("div","label",{text:""}));
    for (var wm=0; wm<state.weeks; wm++){
      var hasMs = clientMsByWeek[wm];
      var mcell = el("div","mstitlecell" + (hasMs ? " msline" : ""));
      if (hasMs){
        var txt = clientMsByWeek[wm].join(" / ");
        var msSpan = el("span",null,{text:txt});
        msSpan.title = txt;
        mcell.appendChild(msSpan);
      }
      msRow.appendChild(mcell);
    }
    grid.appendChild(msRow);
  }

  var hrow = el("div","row headerrow");
  hrow.style.display = "grid";
  hrow.style.gridTemplateColumns = colTemplate();
  hrow.appendChild(el("div","label",{text:""}));
  for (var w=0; w<state.weeks; w++) hrow.appendChild(el("div","weeknum" + (clientMsByWeek[w]?" msline":""),{text:String(w+1)}));
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
      var hcell = el("div","hitoscell" + (clientMsByWeek[wH]?" msline":""));
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
    var exemptBtn = el("button","icobtn critexemptbtn" + (m.critExempt ? " active" : ""), {
      text: "⛔",
      title: m.critExempt
        ? "Grupo especial: no se considera en el cálculo de ruta crítica (corre en paralelo a todo el proyecto, no es una secuencia real de trabajo). Click para volver a incluirlo."
        : "Marcar como grupo especial (como Supervisión): se excluye del cálculo de ruta crítica."
    });
    exemptBtn.addEventListener("click", function(mm){ return function(ev){
      ev.stopPropagation();
      mm.critExempt = !mm.critExempt;
      save(); render();
    }; }(m));
    mlabel.appendChild(exemptBtn);
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
      var band = el("div","week" + (clientMsByWeek[w2]?" msline":""));
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
        var cell = el("div", "week" + (isFilled?" filled":"") + (clientMsByWeek[w3]?" msline":""));
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

// ---- Exportación a Excel (.xlsx real, vía ExcelJS): "Gantt" (solo carta Gantt),
// "Financiero" (solo información financiera) y "Dependencias", como hojas separadas
// de verdad (no el truco antiguo de HTML-como-.xls, que algunos programas no separan
// bien en pestañas). Incluye: ancho de columna de 17px por semana, marco grueso en
// las actividades de la ruta crítica, y línea transversal + título rotado arriba de
// la semana para cada hito de cobro al cliente.
function hexToArgb(hex){
  hex = (hex||"#ffffff").replace("#","").toUpperCase();
  if (hex.length===3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  return "FF" + hex;
}
function hexToTintArgb(hex){
  var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  r = Math.round(r + (255-r)*0.85); g = Math.round(g + (255-g)*0.85); b = Math.round(b + (255-b)*0.85);
  function h2(n){ var s=n.toString(16).toUpperCase(); return s.length<2?"0"+s:s; }
  return "FF"+h2(r)+h2(g)+h2(b);
}
// Aproximación de Excel (fuente Calibri 11, ancho de dígito ≈ 7px) para convertir
// un ancho deseado en píxeles al "character width" que usa la API. Calibrada de forma
// empírica: con la fórmula simple px/7 una columna pedida a 17px rendía ~15px real y
// una a 10px pedía chars=1.71 y rendía ~10px real — el offset +2 ajusta ambos casos.
function pxToExcelWidth(px){ return Math.round(((px+2)/7)*100)/100; }

var XLS_HEADER_FILL = "FF1F2430";
var XLS_HEADER_FONT = "FFFFFFFF";
var XLS_THIN = { style:"thin", color:{argb:"FFE5E5E8"} };
var XLS_CRIT_COLOR = "FF000000";
var XLS_MILESTONE_COLOR = "FFDE7C00";
var XLS_WEEK_COL_PX = 17;
var GANTT_LABEL_COLS = 3; // Módulo, Actividad, Dur.

// Logo de Proapsis (PNG, base64) para insertar en la hoja Gantt.
var PROAPSIS_LOGO_PNG_BASE64 = "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";

function styleHeaderCell(cell, text){
  cell.value = text;
  cell.font = { bold:true, color:{argb: XLS_HEADER_FONT} };
  cell.fill = { type:"pattern", pattern:"solid", fgColor:{argb: XLS_HEADER_FILL} };
  cell.alignment = { horizontal:"center", vertical:"middle" };
  cell.border = { top:XLS_THIN, left:XLS_THIN, bottom:XLS_THIN, right:XLS_THIN };
}
function styleThinBorder(cell){
  cell.border = { top:XLS_THIN, left:XLS_THIN, bottom:XLS_THIN, right:XLS_THIN };
}
function xlsItalicNote(ws, text){
  var r = ws.addRow([text]);
  r.getCell(1).font = { italic:true, color:{argb:"FF999999"} };
  return r;
}

// Inserta el logo de Proapsis en las filas 1-3, ubicado sobre aprox. las últimas 10
// semanas de la carta Gantt (mismo ancho relativo cualquiera sea el total de semanas).
function addProapsisLogoToGanttSheet(wb, ws){
  var imgId = wb.addImage({ base64: PROAPSIS_LOGO_PNG_BASE64, extension: "png" });
  var lastWeeksCount = Math.min(10, state.weeks);
  var startCol0 = GANTT_LABEL_COLS + (state.weeks - lastWeeksCount); // 0-based
  var endCol0 = GANTT_LABEL_COLS + state.weeks; // 0-based, borde derecho tras la última semana
  ws.addImage(imgId, {
    tl: { col: startCol0, row: 0 },
    br: { col: endCol0, row: 3 },
    editAs: "oneCell"
  });
}

function fillGanttSheet(wb, ws){
  ws.getColumn(1).width = pxToExcelWidth(30);
  ws.getColumn(2).width = 34;
  ws.getColumn(3).width = 10;
  for (var w=0; w<state.weeks; w++) ws.getColumn(GANTT_LABEL_COLS + 1 + w).width = pxToExcelWidth(XLS_WEEK_COL_PX);

  var titleRow = ws.addRow(["DESLOG 253795 Watts — Carta Gantt"]);
  titleRow.getCell(1).font = { bold:true, size:14 };
  var subRow = ws.addRow(["Semanas contadas desde cumplimiento de condiciones de inicio"]);
  subRow.getCell(1).font = { italic:true, color:{argb:"FF666666"} };
  ws.addRow([]);

  // Título del hito arriba de la semana en que cae (hitos de cobro al cliente).
  var clientMs = state.finance.clientContract.milestones || [];
  var msByWeek = {};
  clientMs.forEach(function(ms){
    var wk = milestoneWeek(ms);
    if (wk===null || wk<0 || wk>=state.weeks) return;
    (msByWeek[wk] = msByWeek[wk] || []).push(ms.desc || "(sin descripción)");
  });
  var msTitleRow = ws.addRow([]);
  msTitleRow.height = 90;
  for (var wt=0; wt<state.weeks; wt++){
    if (!msByWeek[wt]) continue;
    var cellMs = msTitleRow.getCell(GANTT_LABEL_COLS + 1 + wt);
    cellMs.value = msByWeek[wt].join(" / ");
    cellMs.alignment = { textRotation:90, wrapText:true, horizontal:"center", vertical:"bottom" };
    cellMs.font = { size:8, bold:true, color:{argb: XLS_MILESTONE_COLOR} };
  }

  var headerRow = ws.addRow([]);
  styleHeaderCell(headerRow.getCell(1), "Módulo");
  styleHeaderCell(headerRow.getCell(2), "Actividad");
  styleHeaderCell(headerRow.getCell(3), "Dur. (sem)");
  for (var w2=0; w2<state.weeks; w2++) styleHeaderCell(headerRow.getCell(GANTT_LABEL_COLS + 1 + w2), w2+1);

  // La ruta crítica del export siempre muestra algo: usa el modo elegido en pantalla,
  // o "actual" (cronograma real + dependencias) si ahí está en "Ninguna".
  var crit = computeCriticalPath(critPathMode || "actual");

  var ganttBodyRowNums = [];

  state.modules.forEach(function(m){
    var span = moduleSpan(m);
    var tintArgb = hexToTintArgb(m.color);
    var bandRow = ws.addRow([]);
    var bandCell = bandRow.getCell(1);
    bandCell.value = m.name + (span ? " (" + span.dur + " sem)" : "");
    bandCell.font = { bold:true };
    bandCell.fill = { type:"pattern", pattern:"solid", fgColor:{argb: tintArgb} };
    ws.mergeCells(bandRow.number, 1, bandRow.number, GANTT_LABEL_COLS);
    for (var wb=0; wb<state.weeks; wb++){
      var inSpan = span && wb>=span.start && wb<=span.end;
      var bc = bandRow.getCell(GANTT_LABEL_COLS + 1 + wb);
      bc.fill = { type:"pattern", pattern:"solid", fgColor:{argb: inSpan?tintArgb:"FFFFFFFF"} };
      styleThinBorder(bc);
    }
    ganttBodyRowNums.push(bandRow.number);

    m.activities.forEach(function(a){
      var dur = durationOf(a);
      var actRow = ws.addRow(["", a.name, dur===null?"":dur]);
      actRow.getCell(3).alignment = { horizontal:"center" };
      var actColorArgb = hexToArgb(m.color);
      var isCritical = crit && crit.ok && crit.critical[a.id];
      for (var w3=0; w3<state.weeks; w3++){
        var filled = a.start!==null && w3>=a.start && w3<=a.end;
        var fc = actRow.getCell(GANTT_LABEL_COLS + 1 + w3);
        fc.fill = { type:"pattern", pattern:"solid", fgColor:{argb: filled?actColorArgb:"FFFFFFFF"} };
        styleThinBorder(fc);
        if (filled && isCritical){
          var b = {
            top: { style:"thick", color:{argb:XLS_CRIT_COLOR} },
            bottom: { style:"thick", color:{argb:XLS_CRIT_COLOR} }
          };
          if (w3 === a.start) b.left = { style:"thick", color:{argb:XLS_CRIT_COLOR} };
          if (w3 === a.end) b.right = { style:"thick", color:{argb:XLS_CRIT_COLOR} };
          fc.border = Object.assign({}, fc.border, b);
        }
      }
      ganttBodyRowNums.push(actRow.number);
    });
  });

  // Línea transversal: borde izquierdo grueso en toda la columna de la semana del
  // hito, desde el título del hito hasta la última fila de la carta Gantt.
  var lineRowNums = [msTitleRow.number, headerRow.number].concat(ganttBodyRowNums);
  Object.keys(msByWeek).forEach(function(wkStr){
    var colIdx = GANTT_LABEL_COLS + 1 + parseInt(wkStr, 10);
    lineRowNums.forEach(function(rNum){
      var cell = ws.getRow(rNum).getCell(colIdx);
      cell.border = Object.assign({}, cell.border, { left: { style:"thick", color:{argb: XLS_MILESTONE_COLOR} } });
    });
  });

  ws.views = [{ state:"frozen", xSplit: GANTT_LABEL_COLS, ySplit: headerRow.number }];

  // El logo se agrega al final: su anclaje ocupa las filas 1-3 sin generar contenido
  // de celda, pero ExcelJS reserva su fila inferior en ws.rowCount — agregarlo antes
  // de terminar de construir las filas del encabezado corría el título del hito (fila
  // 4) y todo lo siguiente una fila hacia abajo.
  addProapsisLogoToGanttSheet(wb, ws);
}

function addMilestoneBlock(ws, title, total, milestones, currency){
  var curTxt = (currency||"CLP").toUpperCase();
  var titleTxt = title + (typeof total==="number" ? (" — total: " + total + " " + curTxt) : " — (sin total definido)");
  var tRow = ws.addRow([titleTxt]);
  tRow.getCell(1).font = { bold:true, size:12 };
  var hRow = ws.addRow([]);
  ["Descripción","%","Monto (moneda propia)","Monto (" + (state.finance.mainCurrency||"CLP") + ")","Asociado a","Momento","Semana"].forEach(function(h,i){
    styleHeaderCell(hRow.getCell(i+1), h);
  });
  if (!milestones.length){
    xlsItalicNote(ws, "Sin hitos.");
  } else {
    milestones.forEach(function(ms){
      var amt = milestoneAmount(total, ms);
      var amtConv = milestoneAmountConverted(total, currency, ms);
      var wk = milestoneWeek(ms);
      var assocTxt = assocLabel(ms.assocKind, ms.assocId) || "(sin asociar)";
      ws.addRow([
        ms.desc,
        ms.pct===null?"":(ms.pct+"%"),
        amt===null?"":(amt + " " + curTxt),
        amtConv===null?"":amtConv,
        assocTxt,
        ms.assocKind ? (ms.moment==="end"?"Fin":"Inicio") : "",
        wk===null?"—":("Semana " + (wk+1))
      ]);
    });
  }
  ws.addRow([]);
}

function fillFinanceSheet(ws){
  ws.columns = [ {width:34}, {width:18}, {width:20}, {width:20}, {width:26}, {width:12}, {width:14}, {width:16} ];
  var fin = state.finance;
  var mainCur = fin.mainCurrency || "CLP";

  var titleRow = ws.addRow(["Financiero"]);
  titleRow.getCell(1).font = { bold:true, size:14 };
  ws.addRow([]);

  function kpiRow(label, value){
    var r = ws.addRow([label, value===null||typeof value==="undefined"?"":value]);
    r.getCell(1).font = { bold:true };
    r.getCell(1).fill = { type:"pattern", pattern:"solid", fgColor:{argb:"FFF0F1F3"} };
  }
  kpiRow("Moneda principal (totales)", mainCur);
  kpiRow("Total contrato cliente (" + (fin.clientContract.currency||"CLP") + ")", fin.clientContract.total);
  kpiRow("Total contrato cliente (" + mainCur + ")", convertedTotal(fin.clientContract.total, fin.clientContract.currency));
  kpiRow("Costo materiales total (" + (fin.materials.currency||"CLP") + ")", fin.materials.total);
  kpiRow("Costo materiales total (" + mainCur + ")", convertedTotal(fin.materials.total, fin.materials.currency));
  kpiRow("Costo subcontratos, suma (" + mainCur + ")", subcontractsTotal());
  kpiRow("HH suma por actividad", hhSum());
  kpiRow("HH total (usado en el proyecto)", hhTotal());
  kpiRow("Valor HH (" + (fin.hhRateCurrency||"CLP") + "/hora)", fin.hhRate);
  var hhTot0 = hhTotal();
  var hhCostTotal0Native = (typeof fin.hhRate === "number" && hhTot0 !== null) ? hhTot0*fin.hhRate : null;
  kpiRow("Costo HH total (" + (fin.hhRateCurrency||"CLP") + ")", hhCostTotal0Native);
  kpiRow("Costo HH total (" + mainCur + ")", convertedTotal(hhCostTotal0Native, fin.hhRateCurrency));
  var cf0 = cashflowByWeek();
  var ingT0 = cf0 ? cf0.ingAcum[cf0.ingAcum.length-1] : null;
  var egrT0 = cf0 ? cf0.egrAcum[cf0.egrAcum.length-1] : null;
  kpiRow("Ingresos totales (hitos)", ingT0);
  kpiRow("Egresos totales (hitos)", egrT0);
  if (ingT0!==null || egrT0!==null) kpiRow("Diferencia sin HH", (ingT0||0)-(egrT0||0));
  if (cf0 && cf0.hasHHCost) kpiRow("Diferencia con HH", cf0.diffWithHH[cf0.diffWithHH.length-1]);
  ws.addRow([]);

  addMilestoneBlock(ws, "Contrato con cliente — hitos de cobro", fin.clientContract.total, fin.clientContract.milestones, fin.clientContract.currency);
  addMilestoneBlock(ws, "Materiales — hitos de pago", fin.materials.total, fin.materials.milestones, fin.materials.currency);

  var subTitleRow = ws.addRow(["Subcontratos"]);
  subTitleRow.getCell(1).font = { bold:true, size:12 };
  if (!fin.subcontracts.length){
    xlsItalicNote(ws, "Sin subcontratos.");
  } else {
    fin.subcontracts.forEach(function(s){
      addMilestoneBlock(ws, "Subcontrato: " + (s.name || "(sin nombre)"), s.amount, s.milestones, s.currency);
    });
  }

  if (fin.currencies.length){
    var curTitleRow = ws.addRow(["Monedas (tasas de conversión respecto a CLP)"]);
    curTitleRow.getCell(1).font = { bold:true, size:12 };
    var curHeadRow = ws.addRow([]);
    styleHeaderCell(curHeadRow.getCell(1), "Código");
    styleHeaderCell(curHeadRow.getCell(2), "Tasa (CLP por 1 unidad)");
    fin.currencies.forEach(function(c){ ws.addRow([c.code, c.rate===null?"":c.rate]); });
    ws.addRow([]);
  }

  var hhTitleRow = ws.addRow(["HH por actividad"]);
  hhTitleRow.getCell(1).font = { bold:true, size:12 };
  var hhHeadRow = ws.addRow([]);
  styleHeaderCell(hhHeadRow.getCell(1), "Módulo");
  styleHeaderCell(hhHeadRow.getCell(2), "Actividad");
  styleHeaderCell(hhHeadRow.getCell(3), "HH");
  var anyHH = false;
  state.modules.forEach(function(m){
    m.activities.forEach(function(a){
      if (typeof a.hh === "number"){ anyHH = true; ws.addRow([m.name, a.name, a.hh]); }
    });
  });
  if (!anyHH) xlsItalicNote(ws, "Sin HH cargadas por actividad.");
  ws.addRow([]);

  var cfTitleRow = ws.addRow(["Flujo de caja acumulado por semana"]);
  cfTitleRow.getCell(1).font = { bold:true, size:12 };
  var cf = cashflowByWeek();
  var cfHeadRow = ws.addRow([]);
  if (cf && cf.hasHHCost){
    ["Semana","Ingreso semana","Egreso semana","Ingreso acumulado","Egreso acumulado","Costo HH acumulado","Diferencia sin HH","Diferencia con HH"].forEach(function(h,i){ styleHeaderCell(cfHeadRow.getCell(i+1), h); });
    for (var i=0;i<state.weeks;i++){
      ws.addRow([i+1, cf.ing[i], cf.egr[i], cf.ingAcum[i], cf.egrAcum[i], cf.hhAcum[i], cf.diffNoHH[i], cf.diffWithHH[i]]);
    }
  } else if (cf){
    ["Semana","Ingreso semana","Egreso semana","Ingreso acumulado","Egreso acumulado","Diferencia acumulada"].forEach(function(h,i){ styleHeaderCell(cfHeadRow.getCell(i+1), h); });
    for (var i2=0;i2<state.weeks;i2++){
      ws.addRow([i2+1, cf.ing[i2], cf.egr[i2], cf.ingAcum[i2], cf.egrAcum[i2], cf.diffNoHH[i2]]);
    }
  } else {
    ["Semana","Ingreso semana","Egreso semana","Ingreso acumulado","Egreso acumulado","Diferencia acumulada"].forEach(function(h,i){ styleHeaderCell(cfHeadRow.getCell(i+1), h); });
    xlsItalicNote(ws, "Sin hitos con % y total definidos, ni valor HH.");
  }
}

function fillDepsSheet(ws){
  ws.columns = [ {width:40}, {width:26}, {width:12}, {width:40}, {width:34} ];
  var vio = computeViolations();
  var titleRow = ws.addRow(["Dependencias"]);
  titleRow.getCell(1).font = { bold:true, size:14 };
  ws.addRow([]);
  var headRow = ws.addRow([]);
  ["Origen","Tipo","Delay (días)","Destino","Estado"].forEach(function(h,i){ styleHeaderCell(headRow.getCell(i+1), h); });
  if (!state.deps.length){
    xlsItalicNote(ws, "Sin dependencias.");
  } else {
    state.deps.forEach(function(d){
      var f = findActivity(d.from), t = findActivity(d.to);
      if (!f || !t) return;
      var bad = !!vio.violated[d.id];
      var estado = bad ? ("Incumple: " + vio.violated[d.id]) : "Cumple";
      var row = ws.addRow([
        f.mod.name + " › " + f.act.name,
        typeLabel(d.type),
        d.delay,
        t.mod.name + " › " + t.act.name,
        estado
      ]);
      if (bad){
        for (var c=1;c<=5;c++) row.getCell(c).fill = { type:"pattern", pattern:"solid", fgColor:{argb:"FFFDF2F2"} };
        row.getCell(5).font = { bold:true, color:{argb:"FFA12C2C"} };
      }
    });
  }
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
  var wb = new ExcelJS.Workbook();
  wb.creator = "DESLOG 253795 Watts";
  var wsGantt = wb.addWorksheet("Gantt");
  var wsFin = wb.addWorksheet("Financiero");
  var wsDeps = wb.addWorksheet("Dependencias");
  fillGanttSheet(wb, wsGantt);
  fillFinanceSheet(wsFin);
  fillDepsSheet(wsDeps);
  var btn = document.getElementById("exportBtn");
  wb.xlsx.writeBuffer().then(function(buffer){
    writeFileSmart(buffer, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DESLOG_253795_Watts_Gantt.xlsx", ".xlsx", btn, "Exportado ✓");
  }).catch(function(e){
    window.alert("No se pudo generar el Excel: " + (e && e.message ? e.message : e));
  });
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

  // limpia de la selección cualquier dependencia que ya no exista (eliminada)
  var depIdsNow = {}; state.deps.forEach(function(d){ depIdsNow[d.id] = true; });
  Object.keys(selectedDeps).forEach(function(id){ if (!depIdsNow[id]) delete selectedDeps[id]; });

  if (!state.deps.length){
    table.style.display = "none";
    emptyDiv.style.display = "block";
    emptyDiv.textContent = "Sin dependencias todavía. Usa el formulario de arriba para agregar una.";
    countEl.textContent = "";
    renderDepsSelBar();
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

  var naturalOrderAll = !depSortKey && !filterText && !filterEstado;

  filtered.forEach(function(r){
    var d = r.d;
    var tr = el("tr", (r.isBad ? "violated" : "") + (selectedDeps[d.id] ? " selectedrow" : ""));
    tr.dataset.depId = d.id;

    var tdSel = el("td");
    if (naturalOrderAll){
      var selChk = el("input","selchk"); selChk.type = "checkbox"; selChk.checked = !!selectedDeps[d.id];
      selChk.addEventListener("change", function(dd){ return function(ev){
        if (ev.target.checked) selectedDeps[dd.id] = true; else delete selectedDeps[dd.id];
        renderDepsOnly();
      }; }(d));
      tdSel.appendChild(selChk);
    }
    tr.appendChild(tdSel);

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

  renderDepsSelBar();
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
  // Un hito asociado al FIN de una actividad/módulo se ubica en la semana
  // SIGUIENTE a la última semana de esa actividad (o sea, al término de la
  // semana en que termina, no al inicio de ella) — por eso +1.
  if (ms.assocKind === "activity" && ms.assocId){
    var f = findActivity(ms.assocId);
    if (!f || f.act.start === null) return null;
    return ms.moment === "end" ? (f.act.end + 1) : f.act.start;
  }
  if (ms.assocKind === "module" && ms.assocId){
    var m = null;
    for (var i=0;i<state.modules.length;i++){ if (state.modules[i].id === ms.assocId){ m = state.modules[i]; break; } }
    if (!m) return null;
    var span = moduleSpan(m);
    if (!span) return null;
    return ms.moment === "end" ? (span.end + 1) : span.start;
  }
  return (typeof ms.manualWeek === "number") ? ms.manualWeek : null;
}
// Hitos de cobro al cliente por semana (solo esos, no materiales/subcontratos) —
// usados para la línea transversal y el título arriba de las semanas en la grilla.
function collectClientMilestonesByWeek(){
  var out = {};
  (state.finance.clientContract.milestones||[]).forEach(function(ms){
    var wk = milestoneWeek(ms);
    if (wk===null || wk<0 || wk>=state.weeks) return;
    (out[wk] = out[wk] || []).push(ms.desc || "(sin descripción)");
  });
  return out;
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
var appVersionEl = document.getElementById("appVersion");
if (appVersionEl) appVersionEl.textContent = "v" + APP_VERSION;
</script>
</body>
</html>
`;
