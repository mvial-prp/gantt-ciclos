export const GANTT_NORMAL_HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
:root{ color-scheme: light; }
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
.grid-outer{overflow-x:auto;border:1px solid #e5e5e8;border-radius:8px;position:relative;}
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
.moduleband .week{background:var(--bandc,#fff);cursor:default;}
.weeknum{display:flex;align-items:center;justify-content:center;font-size:10px;color:#9aa1ac;border-right:1px solid #f0f0f1;}
.handle{position:absolute;top:2px;bottom:2px;width:6px;cursor:ew-resize;background:rgba(0,0,0,0.18);border-radius:2px;}
.handle.right{right:0;}
.handle.left{left:0;}
.handle:hover{background:rgba(0,0,0,0.4);}
.depsbox{margin-top:16px;}
.depsbox h3{font-size:12px;font-weight:600;color:#4b5563;margin:0 0 6px;text-transform:uppercase;letter-spacing:.03em;}
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
    <button id="resetBtn" class="danger">Restaurar borrador inicial</button>
  </div>
  <div class="selbar" id="selBar" style="display:none;"></div>
  <div class="grid-outer"><div class="grid" id="grid"></div></div>
  <div class="depsbox">
    <h3>Dependencias</h3>
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
  <div class="legend" id="legend"></div>
</div>
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
      return { id: uid("act"), name: a[0], start: a[1], end: a[2] };
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

  return { weeks: 40, modules: modules, deps: deps };
}

var STORAGE_KEY = "deslog253795-watts-gantt-v2";
var OLD_KEY = "deslog253795-watts-gantt-v1";

function migrate(st){
  st.modules.forEach(function(m){
    if (typeof m.collapsed === "undefined") m.collapsed = false;
    m.activities.forEach(function(a){
      if (a.cells){
        if (a.cells.length){ a.start = Math.min.apply(null,a.cells); a.end = Math.max.apply(null,a.cells); }
        else { a.start = null; a.end = null; }
        delete a.cells;
      }
      if (typeof a.start === "undefined") a.start = null;
      if (typeof a.end === "undefined") a.end = null;
    });
  });
  (st.deps||[]).forEach(function(d){
    if (!d.type) d.type = "FS";
    if (typeof d.delay !== "number") d.delay = 0;
  });
  if (!st.deps) st.deps = [];
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

function render(){
  var vio = computeViolations();
  var grid = document.getElementById("grid");
  grid.innerHTML = "";

  var hrow = el("div","row headerrow");
  hrow.style.display = "grid";
  hrow.style.gridTemplateColumns = colTemplate();
  hrow.appendChild(el("div","label",{text:""}));
  for (var w=0; w<state.weeks; w++) hrow.appendChild(el("div","weeknum",{text:String(w+1)}));
  grid.appendChild(hrow);

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
      mm.activities.push({ id: uid("act"), name: "Nueva actividad", start:null, end:null });
      save(); render();
    }; }(m));
    mlabel.appendChild(addA);
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
      var delA = el("button","icobtn",{text:"✕", title:"Eliminar actividad"});
      delA.addEventListener("click", function(mm,aa){ return function(){
        if (!confirmish(delA, "eliminar actividad")) return;
        mm.activities = mm.activities.filter(function(x){ return x.id !== aa.id; });
        state.deps = state.deps.filter(function(d){ return d.from!==aa.id && d.to!==aa.id; });
        save(); render();
      }; }(m,a));
      alabel.appendChild(delA);
      arow.appendChild(alabel);

      for (var w3=0; w3<state.weeks; w3++){
        var isFilled = a.start!==null && w3>=a.start && w3<=a.end;
        var cell = el("div", "week" + (isFilled?" filled":""));
        if (isFilled) cell.style.setProperty("--c", m.color);
        if (isFilled && vio.badActs[a.id]) cell.classList.add("violated");
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

function csvEsc(v){
  v = (v===null || typeof v==="undefined") ? "" : String(v);
  if (/[",\\n;]/.test(v)) v = '"' + v.replace(/"/g,'""') + '"';
  return v;
}
function exportCSV(){
  var vio = computeViolations();
  var lines = [];
  lines.push(["Módulo","Actividad","Semana inicio","Semana fin","Duración (semanas)"].map(csvEsc).join(","));
  state.modules.forEach(function(m){
    m.activities.forEach(function(a){
      lines.push([
        m.name, a.name,
        a.start===null ? "" : (a.start+1),
        a.end===null ? "" : (a.end+1),
        durationOf(a)===null ? "" : durationOf(a)
      ].map(csvEsc).join(","));
    });
  });
  lines.push("");
  lines.push(["Dependencias"].map(csvEsc).join(","));
  lines.push(["Origen","Tipo","Delay (días)","Destino","Estado"].map(csvEsc).join(","));
  state.deps.forEach(function(d){
    var f = findActivity(d.from), t = findActivity(d.to);
    if (!f || !t) return;
    var estado = vio.violated[d.id] ? ("Incumple: " + vio.violated[d.id]) : "Cumple";
    lines.push([
      f.mod.name + " — " + f.act.name,
      typeLabel(d.type),
      d.delay,
      t.mod.name + " — " + t.act.name,
      estado
    ].map(csvEsc).join(","));
  });
  var csv = "﻿" + lines.join("\\r\\n");
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "DESLOG_253795_Watts_Gantt.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function flashBtn(btn, text, ms){
  var orig = btn.textContent;
  btn.textContent = text;
  setTimeout(function(){ btn.textContent = orig; }, ms || 1600);
}

function saveToFile(){
  var data = JSON.stringify(state, null, 2);
  var blob = new Blob([data], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "DESLOG_253795_Watts_Gantt.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  flashBtn(document.getElementById("saveFileBtn"), "Guardado ✓");
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
    { id: uid("act"), name: "Nueva actividad", start:null, end:null }
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
document.getElementById("loadFileBtn").addEventListener("click", function(){
  document.getElementById("loadFileInput").click();
});
document.getElementById("loadFileInput").addEventListener("change", function(ev){
  var f = ev.target.files && ev.target.files[0];
  if (f) loadFromFile(f);
  ev.target.value = "";
});
document.getElementById("exportBtn").addEventListener("click", exportCSV);
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
