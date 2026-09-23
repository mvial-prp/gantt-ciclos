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
.topbar{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;}
.topbartext{min-width:0;flex:1 1 auto;}
.applogo{height:38px;width:auto;flex:0 0 auto;margin-top:2px;}
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
.colresizehandle{position:absolute;top:0;right:0;bottom:0;width:6px;cursor:ew-resize;background:transparent;z-index:5;}
.colresizehandle:hover, .colresizehandle:active{background:rgba(43,108,176,0.35);}
.label input.name{border:none;background:transparent;font-size:12px;padding:2px 2px;width:100%;border-radius:4px;min-width:0;}
.label input.name:hover, .label input.name:focus{background:#f0f1f3;outline:none;}
.modulelabel{cursor:pointer;}
.modulelabel input.name{font-weight:600;}
.swatch{width:9px;height:9px;border-radius:2px;flex:0 0 auto;}
.chevron{flex:0 0 auto;width:12px;font-size:10px;color:#9aa1ac;}
.durbadge{flex:0 0 auto;font-size:10px;color:#9aa1ac;background:#f0f1f3;border-radius:4px;padding:1px 5px;white-space:nowrap;}
.critexemptbtn{font-size:11px;opacity:0.3;filter:grayscale(1);}
.critexemptbtn:hover{opacity:0.6;}
.critexemptbtn.active{opacity:1;filter:none;color:var(--pr-orange);background:#fdf1e2;border-color:var(--pr-orange);box-shadow:inset 0 0 0 1px var(--pr-orange);}
.critexemptbtn.active:hover{color:var(--pr-orange);background:#fbe6cc;opacity:1;}
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
.appversion{margin-top:22px;padding-top:10px;border-top:1px solid #e5e5e8;text-align:center;font-size:13px;font-weight:600;color:#6b7280;}
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
  <div class="topbar">
    <div class="topbartext">
      <h1>DESLOG 253795 Watts — Carta Gantt interactiva (borrador)</h1>
      <p class="sub">Semanas contadas desde que se cumplen las condiciones de inicio (Semana 1 = cumplimiento de condiciones). Click en un cuadro vacío extiende la barra; click en el borde de una barra la achica. Arrastra los tiradores de los extremos para mover inicio o fin. Los cambios se guardan solos en este navegador; usa "Guardar archivo" para respaldar o compartir con otra persona.</p>
    </div>
    <img id="appLogo" class="applogo" alt="Proapsis">
  </div>
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
        <option value="cpm" selected>CPM clásico (duración + dependencias)</option>
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
var APP_VERSION = "4";

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

// Ancho de la primera columna (Módulo/Actividad), ajustable arrastrando desde el
// encabezado. Se guarda aparte (no es parte del proyecto) para que se recuerde entre
// sesiones en este mismo navegador.
var LABEL_COL_STORAGE_KEY = "deslog253795-watts-gantt-labelw";
try {
  var savedLabelW = parseInt(localStorage.getItem(LABEL_COL_STORAGE_KEY), 10);
  if (!isNaN(savedLabelW) && savedLabelW >= 160 && savedLabelW <= 560) LABEL_W = savedLabelW;
} catch(e) {}

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
var critPathMode = "cpm"; // ""=ninguna | "cpm"=duración+dependencias (default) | "actual"=cronograma actual+dependencias

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
  var hLabelCell = el("div","label");
  var colResizeHandle = el("span","colresizehandle", { title:"Arrastra para ajustar el ancho de esta columna" });
  colResizeHandle.addEventListener("mousedown", startLabelColResize);
  hLabelCell.appendChild(colResizeHandle);
  hrow.appendChild(hLabelCell);
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

document.addEventListener("mouseup", function(){
  drag = null; resizeDrag = null;
  if (labelColResize){
    labelColResize = null;
    try { localStorage.setItem(LABEL_COL_STORAGE_KEY, String(LABEL_W)); } catch(e) {}
  }
});

// ---- ancho ajustable de la primera columna (Módulo/Actividad) ----
var labelColResize = null; // {startX, startWidth}
function startLabelColResize(ev){
  labelColResize = { startX: ev.clientX, startWidth: LABEL_W };
  ev.preventDefault();
}
document.addEventListener("mousemove", function(ev){
  if (!labelColResize) return;
  var dx = ev.clientX - labelColResize.startX;
  LABEL_W = Math.max(160, Math.min(560, labelColResize.startWidth + dx));
  var tmpl = colTemplate();
  var rows = document.querySelectorAll("#grid .row");
  for (var i=0; i<rows.length; i++) rows[i].style.gridTemplateColumns = tmpl;
});

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
// empírica contra el ancho real medido por el usuario en su Excel, en sucesivas
// rondas: con offset +2 un pedido de 17px rendía ~16px real (todavía corto) — se
// sube a +3 para acercarlo más a los 17px pedidos.
function pxToExcelWidth(px){ return Math.round(((px+3)/7)*100)/100; }

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

// Ancho/alto reales del PNG embebido (700x346) — se usan para no deformar el logo:
// se fija el alto a 3 filas y el ancho se calcula a partir de esta razón de aspecto.
var PROAPSIS_LOGO_ASPECT = 700 / 346;

// Inserta el logo de Proapsis en las filas 1-3 (alto fijo = 3 filas, ancho proporcional
// para no deformarlo), ubicado sobre aprox. las últimas 10 semanas de la carta Gantt.
function addProapsisLogoToGanttSheet(wb, ws){
  var imgId = wb.addImage({ base64: PROAPSIS_LOGO_PNG_BASE64, extension: "png" });
  var lastWeeksCount = Math.min(10, state.weeks);
  var startCol0 = GANTT_LABEL_COLS + (state.weeks - lastWeeksCount); // 0-based
  var rowHeightPx = 20; // alto de fila por defecto en Excel (15pt ≈ 20px)
  var heightPx = rowHeightPx * 3; // ocupa las 3 filas de alto, sin deformar
  var widthPx = heightPx * PROAPSIS_LOGO_ASPECT;
  ws.addImage(imgId, {
    tl: { col: startCol0, row: 0 },
    ext: { width: widthPx, height: heightPx },
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
if (appVersionEl) appVersionEl.textContent = "Versión " + APP_VERSION;
var appLogoEl = document.getElementById("appLogo");
if (appLogoEl) appLogoEl.src = "data:image/png;base64," + PROAPSIS_LOGO_PNG_BASE64;
</script>
</body>
</html>
`;
