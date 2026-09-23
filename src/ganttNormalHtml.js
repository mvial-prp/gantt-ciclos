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
.critdot{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:6px;height:6px;border-radius:50%;background:#c0392b;pointer-events:none;}
.criticalrow .label{background:rgba(192,57,43,0.12);}
.criticalrow.selectedrow .label{background:rgba(192,57,43,0.22);}
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
var APP_VERSION = "6";

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
      var isCriticalAct = !!(crit && crit.ok && crit.critical[a.id]);
      var arow = el("div","row" + (isSel ? " selectedrow" : "") + (isCriticalAct ? " criticalrow" : ""));
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
        if (isFilled && isCriticalAct){
          cell.classList.add("criticalcell");
          cell.appendChild(el("span","critdot"));
        }
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

// PNG embebido ya recortado a su contenido real (sin el espacio muerto transparente
// alrededor del isotipo+texto) — 900x214. Se usa esta razón de aspecto para no
// deformarlo al fijar su alto.
var PROAPSIS_LOGO_ASPECT = 900 / 214;

// Inserta el logo de Proapsis en las filas 1-3 (alto fijo = 3 filas, ancho proporcional
// para no deformarlo), con el borde derecho pegado al final de la última semana.
function addProapsisLogoToGanttSheet(wb, ws){
  var imgId = wb.addImage({ base64: PROAPSIS_LOGO_PNG_BASE64, extension: "png" });
  var rowHeightPx = 20; // alto de fila por defecto en Excel (15pt ≈ 20px)
  var heightPx = rowHeightPx * 3; // ocupa las 3 filas de alto, sin deformar
  var widthPx = heightPx * PROAPSIS_LOGO_ASPECT;
  // Borde derecho pegado al final de la última semana: la columna 0-based justo
  // después de la última semana es GANTT_LABEL_COLS + state.weeks; se retrocede desde
  // ahí el ancho de la imagen expresado en "columnas de semana" (todas del mismo ancho).
  var rightEdgeCol0 = GANTT_LABEL_COLS + state.weeks;
  var widthInWeekCols = widthPx / XLS_WEEK_COL_PX;
  var tlCol = Math.max(GANTT_LABEL_COLS, rightEdgeCol0 - widthInWeekCols);
  ws.addImage(imgId, {
    tl: { col: tlCol, row: 0 },
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
