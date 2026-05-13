import { useState, useCallback, useEffect, useRef } from "react";

// ─── Color palette ────────────────────────────────────────────────────────────
const COLOR_PALETTE = {
  purple: { bg: "#5B4FD8", light: "#EAE8FC", border: "#4338CA" },
  teal:   { bg: "#0E8A6A", light: "#D4F4EB", border: "#076B52" },
  amber:  { bg: "#C27A10", light: "#FDF0D5", border: "#9B6008" },
  coral:  { bg: "#C04B2A", light: "#FAE4DC", border: "#9B3A1F" },
  blue:   { bg: "#2563A8", light: "#DBEAFE", border: "#1D4F8C" },
  gray:   { bg: "#5A5855", light: "#EEECEA", border: "#3F3E3B" },
  slate:  { bg: "#3B5278", light: "#E2EBF6", border: "#2A3D5C" },
};
const COLOR_KEYS = Object.keys(COLOR_PALETTE);

const DEFAULT_COLOR_NAMES = {
  purple: "Robot — movimiento principal",
  teal:   "Robot — depósito en destino",
  amber:  "Tarimas",
  coral:  "Celluveyor",
  blue:   "Etiquetadora",
  gray:   "Loop de cinta",
  slate:  "En espera / ciclo siguiente",
};

// ─── Dependency types ─────────────────────────────────────────────────────────
// nextCycle flag: si true, B se evalúa en el ciclo siguiente (B.start + CD)
const DEP_TYPES = [
  { id: "start_after_end",   label: "empieza después que termina",            symbol: "A→|→B"   },
  { id: "start_together",    label: "empiezan juntos",                         symbol: "A|B"     },
  { id: "start_min_after",   label: "empieza mín. N seg después que termina", symbol: "A→N→B"   },
  { id: "start_before_end",  label: "empieza mín. N seg antes que termine",   symbol: "A…N|B"   },
  { id: "start_after_start", label: "empieza mín. N seg después de iniciar",  symbol: "|A→N→|B" },
  { id: "end_together",      label: "terminan juntos",                         symbol: "A|B|"    },
  { id: "end_after_end",     label: "termina mín. N seg después que termina", symbol: "A|→N→|B" },
];

// ─── Default model (ciclo 47 seg) ────────────────────────────────────────────
const DEFAULT_ACTIVITIES = [
  { id: "r1movA",   label: "Mov A — R1",          sublabel: "pallet entrada→mesa dep.",    row: 0, color: "purple", start: 0,  duration: 24 },
  { id: "r1movB",   label: "Mov B — R1",          sublabel: "mesa toma→pallet destino",   row: 0, color: "teal",   start: 24, duration: 23 },
  { id: "mdDep",    label: "Nivel N depositado",  sublabel: "R1 libera t=24",              row: 1, color: "purple", start: 0,  duration: 24 },
  { id: "mdEsp",    label: "Esperando desarme",   sublabel: "",                            row: 1, color: "slate",  start: 24, duration: 6  },
  { id: "mdDesarm", label: "Entrando a desarme",  sublabel: "→ R2/R3",                    row: 1, color: "coral",  start: 30, duration: 5  },
  { id: "mdNxt",    label: "Nivel N+1",           sublabel: "R1 deposita t=47",           row: 1, color: "slate",  start: 47, duration: 24 },
  { id: "desarm",   label: "Desarme R2/R3",       sublabel: "30 seg · Ecofrost/Pomuni",   row: 2, color: "coral",  start: 0,  duration: 30 },
  { id: "envLoop",  label: "Envía al loop",       sublabel: "cajas una a una",             row: 2, color: "coral",  start: 30, duration: 15 },
  { id: "rearm",    label: "Rearmado R2/R3",      sublabel: "30 seg",                     row: 2, color: "coral",  start: 15, duration: 30 },
  { id: "salMesa",  label: "Sale a mesa toma",    sublabel: "nivel procesado",             row: 2, color: "coral",  start: 45, duration: 2  },
  { id: "loop",     label: "Cajas en loop",       sublabel: "7,5 m · 0,5 m/seg = 15 seg", row: 3, color: "gray",   start: 30, duration: 30 },
  { id: "etiq",     label: "Etiquetando",         sublabel: "12 cajas · vel. regulada",   row: 4, color: "blue",   start: 33, duration: 22 },
  { id: "mtLista",  label: "Nivel listo",         sublabel: "R1 toma t=24",               row: 5, color: "teal",   start: 0,  duration: 24 },
  { id: "mtVacia",  label: "Vacía",               sublabel: "esperando rearmado",         row: 5, color: "slate",  start: 24, duration: 23 },
  { id: "mtNxt",    label: "Nivel N listo",       sublabel: "R1 toma t=47",              row: 5, color: "teal",   start: 47, duration: 24 },
];
const DEFAULT_ROWS = [
  { id: 0, label: "Robot R1",       sublabel: "Yaskawa PL190"       },
  { id: 1, label: "Mesa depósito",  sublabel: "entrada desarme"      },
  { id: 2, label: "Desarme/Rearm.", sublabel: "R2 + R3 · Celluveyor" },
  { id: 3, label: "Loop",           sublabel: "7,5 m · 0,5 m/seg"   },
  { id: 4, label: "Etiquetadora",   sublabel: "2 etiq/caja"          },
  { id: 5, label: "Mesa toma",      sublabel: "salida rearmado"      },
];
const DEFAULT_DEPS = [
  { id: "d1", from: "r1movA", to: "r1movB",  type: "start_after_end", offset: 0, nextCycle: false },
  { id: "d2", from: "desarm", to: "envLoop", type: "start_after_end", offset: 0, nextCycle: false },
  { id: "d3", from: "envLoop",to: "loop",    type: "start_together",  offset: 0, nextCycle: false },
  { id: "d4", from: "rearm",  to: "salMesa", type: "start_after_end", offset: 0, nextCycle: false },
  { id: "d5", from: "salMesa",to: "mtNxt",   type: "start_together",  offset: 0, nextCycle: false },
  { id: "d6", from: "r1movB", to: "r1movA",  type: "end_after_end",   offset: 0, nextCycle: true  },
];
const DEFAULT_CONFIG = {
  cycleDuration: 47,
  title: "Ciclo Robot R1 — Watts / Frutos del Maipo (régimen estacionario)",
  subtitle: "47 seg/nivel · Ecofrost/Pomuni · loop 15 seg · ~919 cj/h · ~10,9 h para 10.000 cajas",
  pixelsPerSec: 11,
  rowHeight: 38,
  visibleCycles: 2,
};

// ─── Utilities ────────────────────────────────────────────────────────────────
function uid() { return Math.random().toString(36).slice(2, 8); }

function getSegments(act, CD) {
  const end = act.start + act.duration;
  if (end <= CD) return [{ start: act.start, duration: act.duration, wrapped: false }];
  const segs = [];
  if (CD - act.start > 0) segs.push({ start: act.start, duration: CD - act.start, wrapped: false });
  if (end - CD > 0)        segs.push({ start: 0,         duration: end - CD,       wrapped: true  });
  return segs;
}

// Check dependency. nextCycle: B is expected in the next period (B.start + CD)
function checkDep(dep, activities, CD) {
  const from = activities.find(a => a.id === dep.from);
  const to   = activities.find(a => a.id === dep.to);
  if (!from || !to) return null;
  const fromEnd  = from.start + from.duration;
  const toStart  = dep.nextCycle ? to.start + CD : to.start;
  const toEnd    = dep.nextCycle ? to.start + to.duration + CD : to.start + to.duration;
  const n        = dep.offset ?? 0;
  switch (dep.type) {
    case "start_after_end":   return { ok: toStart >= fromEnd,         expected: fromEnd,           actual: toStart };
    case "start_together":    return { ok: toStart === from.start,     expected: from.start,        actual: toStart };
    case "start_min_after":   return { ok: toStart >= fromEnd + n,     expected: fromEnd + n,       actual: toStart };
    case "start_before_end":  return { ok: toStart <= fromEnd - n,     expected: `≤${fromEnd-n}`,   actual: toStart };
    case "start_after_start": return { ok: toStart >= from.start + n,  expected: from.start + n,    actual: toStart };
    case "end_together":      return { ok: toEnd === fromEnd,           expected: fromEnd,           actual: toEnd   };
    case "end_after_end":     return { ok: toEnd >= fromEnd + n,        expected: fromEnd + n,       actual: toEnd   };
    default: return null;
  }
}

// ─── Save / Load ─────────────────────────────────────────────────────────────
function exportState(state) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = "gantt-ciclos.json"; a.click();
  URL.revokeObjectURL(url);
}

// ─── IconBtn ──────────────────────────────────────────────────────────────────
function IconBtn({ onClick, children, danger, small, active }) {
  return (
    <button onClick={onClick} style={{
      padding: small ? "1px 5px" : "2px 8px", fontSize: 10,
      border: "none", borderRadius: 3, cursor: "pointer", fontFamily: "inherit",
      background: danger ? "#FEE2E2" : active ? "#5B4FD8" : "#EEECEA",
      color: danger ? "#B91C1C" : active ? "#fff" : "#3F3E3B",
    }}>{children}</button>
  );
}

// ─── ActivityBar — renders one activity, handles multi-cycle offset ───────────
function ActivityBar({ act, rowY, PPS, RH, CD, cycleOffset, isSelected, onSelect, onStartDrag, ghost }) {
  const col  = COLOR_PALETTE[act.color] || COLOR_PALETTE.gray;
  const segs = getSegments(act, CD);
  const offsetX = cycleOffset * CD * PPS;
  const alpha = ghost ? 0.38 : 1;

  return segs.map((seg, si) => {
    const x = offsetX + seg.start * PPS;
    const w = Math.max(seg.duration * PPS, 2);
    return (
      <g key={`${si}-${cycleOffset}`} onClick={() => !ghost && onSelect(act.id)} style={{ cursor: ghost ? "default" : "pointer" }}>
        {seg.wrapped && <rect x={x} y={rowY+3} width={3} height={RH-6} fill={col.bg} opacity={0.9*alpha} />}
        <rect x={x+(seg.wrapped?3:0)} y={rowY+3} width={Math.max(w-(seg.wrapped?3:0),1)} height={RH-6}
          fill={col.light} stroke={isSelected && !ghost ? "#1C1B18" : col.border}
          strokeWidth={isSelected && !ghost ? 2 : 1} strokeDasharray={seg.wrapped?"4 2":"none"}
          rx={3} opacity={(seg.wrapped?0.82:1)*alpha} />
        <rect x={x+(seg.wrapped?3:0)} y={rowY+3} width={Math.max(w-(seg.wrapped?3:0),1)} height={4}
          fill={col.bg} rx={3} opacity={(seg.wrapped?0.7:1)*alpha} />
        <rect x={x+(seg.wrapped?3:0)} y={rowY+5} width={Math.max(w-(seg.wrapped?3:0),1)} height={2}
          fill={col.bg} opacity={(seg.wrapped?0.7:1)*alpha} />
        {w > 22 && (
          <text x={x+(seg.wrapped?6:4)} y={rowY+RH/2-2}
            style={{fontSize:8.5,fontWeight:700,fill:col.border,fontFamily:"inherit",pointerEvents:"none",opacity:alpha}}>
            {seg.wrapped?"↩ ":""}{act.label}
          </text>
        )}
        {w > 36 && act.sublabel && !seg.wrapped && (
          <text x={x+4} y={rowY+RH/2+9}
            style={{fontSize:7.5,fill:col.bg,fontFamily:"inherit",pointerEvents:"none",opacity:alpha}}>
            {act.sublabel}
          </text>
        )}
        {w > 28 && (
          <text x={x+w-3} y={rowY+RH-5} textAnchor="end"
            style={{fontSize:7,fill:col.border,opacity:0.55*alpha,fontFamily:"inherit",pointerEvents:"none"}}>
            {seg.wrapped?`0+${seg.duration}`:`${act.start}+${act.duration}`}
          </text>
        )}
        {!seg.wrapped && !ghost && cycleOffset === 0 && (
          <rect x={x} y={rowY+3} width={Math.max(w-8,1)} height={RH-6}
            fill="transparent" style={{cursor:"grab"}}
            onMouseDown={e => onStartDrag(e, act.id, "move")} />
        )}
        {si === segs.length-1 && !ghost && cycleOffset === 0 && (
          <rect x={x+w-7} y={rowY+3} width={7} height={RH-6}
            fill={col.bg} opacity={0.28} rx={2} style={{cursor:"ew-resize"}}
            onMouseDown={e => onStartDrag(e, act.id, "resize")} />
        )}
      </g>
    );
  });
}

// ─── DepArrow ─────────────────────────────────────────────────────────────────
function DepArrow({ dep, activities, rows, PPS, RH, CD }) {
  const fromA = activities.find(a => a.id === dep.from);
  const toA   = activities.find(a => a.id === dep.to);
  if (!fromA || !toA) return null;
  const fri = rows.findIndex(r => r.id === fromA.row);
  const tri = rows.findIndex(r => r.id === toA.row);
  if (fri < 0 || tri < 0) return null;

  const ok    = dep.result?.ok;
  const color = ok === false ? "#C04B2A" : "#0E8A6A";
  const ROWH  = RH + 4;
  const fromEnd = fromA.start + fromA.duration;
  const toEnd   = toA.start   + toA.duration;
  // nextCycle: B arrow drawn at cycle+1 offset
  const nc = dep.nextCycle ? CD : 0;
  let x1, x2;
  switch (dep.type) {
    case "start_after_end": case "start_min_after":
      x1 = (fromEnd % CD) * PPS; x2 = toA.start * PPS + nc * PPS; break;
    case "start_together": case "start_before_end": case "start_after_start":
      x1 = fromA.start * PPS; x2 = toA.start * PPS + nc * PPS; break;
    case "end_together": case "end_after_end":
      x1 = (fromEnd % CD) * PPS; x2 = (toEnd % CD) * PPS + nc * PPS; break;
    default:
      x1 = (fromEnd % CD) * PPS; x2 = toA.start * PPS + nc * PPS;
  }
  const y1 = 50 + fri * ROWH + RH / 2;
  const y2 = 50 + tri * ROWH + RH / 2;
  const cx = (x1 + x2) / 2;
  const path = Math.abs(x1-x2) < 2 ? `M${x1} ${y1} L${x2} ${y2}` : `M${x1} ${y1} C${cx} ${y1} ${cx} ${y2} ${x2} ${y2}`;
  const aid = `arr-${dep.id}`;
  return (
    <g>
      <defs>
        <marker id={aid} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={color} />
        </marker>
      </defs>
      <path d={path} fill="none" stroke={color}
        strokeWidth={ok===false?1.8:1.2} strokeDasharray={ok===false?"4 2":"none"}
        markerEnd={`url(#${aid})`} opacity={dep.nextCycle ? 0.5 : 0.72} />
      {dep.nextCycle && (
        <text x={(x1+x2)/2} y={Math.min(y1,y2)-4} textAnchor="middle"
          style={{fontSize:7.5,fill:color,fontFamily:"inherit",opacity:0.8}}>+1</text>
      )}
    </g>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function GanttCiclico() {
  const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);
  const [rows, setRows]             = useState(DEFAULT_ROWS);
  const [deps, setDeps]             = useState(DEFAULT_DEPS);
  const [config, setConfig]         = useState(DEFAULT_CONFIG);
  const [colorNames, setColorNames] = useState(DEFAULT_COLOR_NAMES);
  const [selected, setSelected]     = useState(null);
  const [tab, setTab]               = useState("gantt");
  const [dragState, setDragState]   = useState(null);
  const fileInputRef                = useRef(null);

  const PPS   = config.pixelsPerSec;
  const RH    = config.rowHeight;
  const ROWH  = RH + 4;
  const LW    = 124;
  const CD    = config.cycleDuration;
  const NC    = Math.max(1, Math.min(5, config.visibleCycles ?? 1));
  const totalW = LW + CD * PPS * NC + 24;
  const totalH = rows.length * ROWH + 58;

  // ── Drag ──────────────────────────────────────────────────────────────────
  const startDrag = useCallback((e, actId, mode) => {
    e.preventDefault(); e.stopPropagation();
    const act = activities.find(a => a.id === actId);
    setDragState({ actId, mode, startX: e.clientX, origStart: act.start, origDur: act.duration });
  }, [activities]);

  useEffect(() => {
    if (!dragState) return;
    const onMove = e => {
      const dSec = Math.round((e.clientX - dragState.startX) / PPS);
      setActivities(prev => prev.map(a => {
        if (a.id !== dragState.actId) return a;
        if (dragState.mode === "move") {
          const raw = dragState.origStart + dSec;
          return { ...a, start: ((raw % CD) + CD) % CD };
        }
        return { ...a, duration: Math.max(1, dragState.origDur + dSec) };
      }));
    };
    const onUp = () => setDragState(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [dragState, PPS, CD]);

  // ── Save / Load ───────────────────────────────────────────────────────────
  const handleSave = () => exportState({ activities, rows, deps, config, colorNames, version: 2 });

  const handleLoad = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const s = JSON.parse(ev.target.result);
        if (s.activities) setActivities(s.activities);
        if (s.rows)       setRows(s.rows);
        if (s.deps)       setDeps(s.deps.map(d => ({ nextCycle: false, ...d })));
        if (s.config)     setConfig({ visibleCycles: 2, ...s.config });
        if (s.colorNames) setColorNames(s.colorNames);
        setSelected(null);
      } catch { alert("Archivo JSON inválido"); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // ── Derived ───────────────────────────────────────────────────────────────
  const depResults = deps.map(d => ({ ...d, result: checkDep(d, activities, CD) }));
  const violations = depResults.filter(d => d.result && !d.result.ok);

  const addActivity = () => {
    const id = "act_" + uid();
    setActivities(p => [...p, { id, label: "Nueva", sublabel: "", row: rows[0]?.id ?? 0, color: "gray", start: 0, duration: 10 }]);
    setSelected(id); setTab("activities");
  };
  const delActivity = id => {
    setActivities(p => p.filter(a => a.id !== id));
    setDeps(p => p.filter(d => d.from !== id && d.to !== id));
    if (selected === id) setSelected(null);
  };
  const updAct = (id, k, v) => setActivities(p => p.map(a => a.id === id ? { ...a, [k]: v } : a));
  const addDep = () => {
    if (activities.length < 2) return;
    setDeps(p => [...p, { id: "dep_"+uid(), from: activities[0].id, to: activities[1].id, type: "start_after_end", offset: 0, nextCycle: false }]);
    setTab("deps");
  };
  const updDep = (id, k, v) => setDeps(p => p.map(d => d.id === id ? { ...d, [k]: v } : d));
  const addRow = () => {
    const maxId = Math.max(...rows.map(r => r.id), -1) + 1;
    setRows(p => [...p, { id: maxId, label: "Nueva fila", sublabel: "" }]);
  };

  const step  = CD > 120 ? 10 : 5;
  const ticks = Array.from({ length: Math.floor(CD * NC / step) + 1 }, (_, i) => i * step);
  const maxWrap = Math.max(0, ...activities.map(a => Math.max(0, a.start + a.duration - CD)));

  const TABS = [["gantt","📊 Diagrama"],["activities","⚙ Actividades"],["deps","🔗 Dependencias"],["legend","🎨 Leyenda"],["config","⚙ Config"]];

  return (
    <div style={{ fontFamily:"'DM Mono','Fira Mono','Courier New',monospace", background:"#F5F3EE", minHeight:"100vh" }}>

      {/* ── Header ── */}
      <div style={{ background:"#1C1B18", padding:"9px 16px", display:"flex", alignItems:"center", gap:10 }}>
        <div>
          <div style={{ color:"#F5F3EE", fontSize:12, fontWeight:700 }}>GANTT CÍCLICO</div>
          <div style={{ color:"#7A7870", fontSize:8.5, marginTop:1 }}>ciclos industriales · dependencias · multi-ciclo · guardar/cargar</div>
        </div>
        <div style={{ flex:1 }} />
        {violations.length > 0 && (
          <div style={{ background:"#7F1D1D", color:"#FEE2E2", padding:"3px 9px", borderRadius:4, fontSize:9.5, fontWeight:700 }}>
            ⚠ {violations.length} violación{violations.length>1?"es":""}
          </div>
        )}
        {/* Save / Load */}
        <button onClick={handleSave}
          style={{ background:"#3B5278", color:"#fff", border:"none", borderRadius:4, padding:"4px 10px", fontSize:9.5, fontWeight:700, cursor:"pointer" }}>
          ⬇ Guardar
        </button>
        <button onClick={() => fileInputRef.current?.click()}
          style={{ background:"#5A5855", color:"#fff", border:"none", borderRadius:4, padding:"4px 10px", fontSize:9.5, fontWeight:700, cursor:"pointer" }}>
          ⬆ Cargar
        </button>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleLoad} style={{ display:"none" }} />
        <button onClick={addActivity} style={{ background:"#5B4FD8", color:"#fff", border:"none", borderRadius:4, padding:"4px 10px", fontSize:9.5, fontWeight:700, cursor:"pointer" }}>+ Actividad</button>
        <button onClick={addDep}      style={{ background:"#0E8A6A", color:"#fff", border:"none", borderRadius:4, padding:"4px 10px", fontSize:9.5, fontWeight:700, cursor:"pointer" }}>+ Dep.</button>
      </div>

      {/* ── Tabs ── */}
      <div style={{ background:"#E8E6DF", display:"flex", borderBottom:"2px solid #D3D1C7" }}>
        {TABS.map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            padding:"6px 14px", fontSize:9.5, fontWeight:700, border:"none", cursor:"pointer",
            background: tab===k ? "#F5F3EE" : "transparent",
            color: tab===k ? "#1C1B18" : "#5A5855",
            borderBottom: tab===k ? "2px solid #5B4FD8" : "2px solid transparent", marginBottom:-2,
          }}>{l}</button>
        ))}
      </div>

      {/* ══ GANTT ══ */}
      {tab === "gantt" && (
        <div style={{ padding:"12px 16px" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:7 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11.5, fontWeight:700, color:"#1C1B18" }}>{config.title}</div>
              <div style={{ fontSize:8.5, color:"#5A5855", marginTop:1 }}>{config.subtitle}</div>
            </div>
            {/* Cycle count buttons */}
            <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:8.5, color:"#5A5855" }}>
              ciclos visibles:
              {[1,2,3].map(n => (
                <IconBtn key={n} active={NC===n} onClick={() => setConfig(p => ({...p, visibleCycles:n}))}>{n}</IconBtn>
              ))}
            </div>
          </div>

          {violations.length > 0 && (
            <div style={{ background:"#FEF2F2", border:"1px solid #FCA5A5", borderRadius:5, padding:"6px 10px", marginBottom:8, fontSize:8.5 }}>
              <strong style={{ color:"#991B1B" }}>Dependencias violadas: </strong>
              {violations.map(v => {
                const fa = activities.find(a => a.id === v.from);
                const ta = activities.find(a => a.id === v.to);
                const dt = DEP_TYPES.find(d => d.id === v.type);
                return <span key={v.id} style={{ color:"#B91C1C" }}> [{fa?.label}] {dt?.label} [{ta?.label}] esp:{v.result?.expected}s act:{v.result?.actual}s ·</span>;
              })}
            </div>
          )}

          <div style={{ overflowX:"auto", border:"1px solid #D3D1C7", borderRadius:6, background:"#fff" }}>
            <svg width={totalW} height={totalH} style={{ display:"block", userSelect:"none" }}>

              {/* Row stripes */}
              {rows.map((row,ri) => (
                <rect key={row.id} x={LW} y={48+ri*ROWH} width={CD*PPS*NC} height={RH}
                  fill={ri%2===0?"#FAFAF8":"#F5F3EE"} />
              ))}

              {/* Cycle separator shading */}
              {Array.from({length:NC},(_,ci) => ci).map(ci => (
                ci > 0 && (
                  <rect key={ci} x={LW+ci*CD*PPS} y={44} width={CD*PPS} height={totalH-44}
                    fill={ci%2===0?"transparent":"#F5F3EE"} opacity={0.4} />
                )
              ))}

              {/* Wrap tint on cycle 0 */}
              {maxWrap > 0 && (
                <rect x={LW} y={44} width={maxWrap*PPS} height={totalH-44} fill="#FEF2F2" opacity={0.4} />
              )}

              {/* Ticks */}
              {ticks.map(t => (
                <g key={t}>
                  <line x1={LW+t*PPS} y1={38} x2={LW+t*PPS} y2={totalH}
                    stroke={t%(step*2)===0?"#C4C2BA":"#EBEBEA"}
                    strokeWidth={t%(step*2)===0?1:0.5} />
                  <text x={LW+t*PPS} y={30} textAnchor="middle"
                    style={{fontSize:8,fill:"#7A7870",fontFamily:"inherit"}}>{t%CD}s</text>
                </g>
              ))}

              {/* Cycle boundary lines */}
              {Array.from({length:NC+1},(_,ci)=>ci).map(ci => (
                <g key={ci}>
                  <line x1={LW+ci*CD*PPS} y1={34} x2={LW+ci*CD*PPS} y2={totalH}
                    stroke="#C04B2A" strokeWidth={ci===0||ci===NC?2:1.5}
                    strokeDasharray={ci===0||ci===NC?"5 3":"3 3"} />
                  {ci < NC && (
                    <text x={LW+ci*CD*PPS+4} y={28}
                      style={{fontSize:8,fill:"#C04B2A",fontWeight:700,fontFamily:"inherit"}}>
                      ciclo {ci+1}
                    </text>
                  )}
                </g>
              ))}

              {/* Row labels */}
              {rows.map((row,ri) => {
                const y = 48+ri*ROWH;
                return (
                  <g key={row.id}>
                    <rect x={0} y={y} width={LW-4} height={RH} fill="#EEECEA" rx={2} />
                    <text x={5} y={y+RH/2-4} style={{fontSize:9,fontWeight:700,fill:"#1C1B18",fontFamily:"inherit"}}>{row.label}</text>
                    <text x={5} y={y+RH/2+7} style={{fontSize:7.5,fill:"#5A5855",fontFamily:"inherit"}}>{row.sublabel}</text>
                  </g>
                );
              })}

              {/* Activities: cycle 0 (interactive) + ghost cycles 1..NC-1 */}
              <g transform={`translate(${LW},0)`}>
                {/* Ghost cycles */}
                {Array.from({length:NC-1},(_,ci)=>ci+1).map(ci =>
                  activities.map(act => {
                    const ri = rows.findIndex(r => r.id === act.row);
                    if (ri < 0) return null;
                    return (
                      <ActivityBar key={`${act.id}-c${ci}`} act={act} rowY={48+ri*ROWH}
                        PPS={PPS} RH={RH} CD={CD} cycleOffset={ci}
                        isSelected={false} onSelect={()=>{}} onStartDrag={()=>{}} ghost={true} />
                    );
                  })
                )}
                {/* Cycle 0 — interactive */}
                {activities.map(act => {
                  const ri = rows.findIndex(r => r.id === act.row);
                  if (ri < 0) return null;
                  return (
                    <ActivityBar key={act.id} act={act} rowY={48+ri*ROWH}
                      PPS={PPS} RH={RH} CD={CD} cycleOffset={0}
                      isSelected={selected===act.id}
                      onSelect={id => setSelected(id===selected?null:id)}
                      onStartDrag={startDrag} ghost={false} />
                  );
                })}
                {/* Dep arrows */}
                {depResults.map(dep => (
                  <DepArrow key={dep.id} dep={dep} activities={activities} rows={rows}
                    PPS={PPS} RH={RH} CD={CD} />
                ))}
              </g>

              <line x1={0} y1={40} x2={totalW} y2={40} stroke="#D3D1C7" strokeWidth={1} />
            </svg>
          </div>

          {/* Legend */}
          <div style={{ display:"flex", gap:12, marginTop:9, flexWrap:"wrap", alignItems:"center" }}>
            {COLOR_KEYS.map(k => (
              <div key={k} style={{ display:"flex", alignItems:"center", gap:5, fontSize:8.5, color:"#3F3E3B" }}>
                <div style={{ width:22, height:7, background:COLOR_PALETTE[k].bg, borderRadius:2 }} />
                {colorNames[k]}
              </div>
            ))}
            {maxWrap > 0 && (
              <div style={{ fontSize:8.5, color:"#C04B2A", display:"flex", alignItems:"center", gap:4 }}>
                <div style={{ width:14, borderTop:"2px dashed #C04B2A" }} /> ↩ wrap-around
              </div>
            )}
            <div style={{ fontSize:8.5, color:"#C04B2A", display:"flex", alignItems:"center", gap:4 }}>
              <span style={{ fontSize:9 }}>+1</span> dep. ciclo siguiente
            </div>
            <div style={{ fontSize:8.5, color:"#7A7870" }}>↔ arrastrar · borde der. = redimensionar · ciclos fantasma = read-only</div>
          </div>
        </div>
      )}

      {/* ══ ACTIVITIES ══ */}
      {tab === "activities" && (
        <div style={{ padding:"12px 16px" }}>
          <div style={{ display:"flex", gap:7, marginBottom:10 }}>
            <button onClick={addActivity} style={{ background:"#5B4FD8", color:"#fff", border:"none", borderRadius:4, padding:"3px 10px", fontSize:9.5, fontWeight:700, cursor:"pointer" }}>+ Actividad</button>
            <button onClick={addRow}      style={{ background:"#3B5278", color:"#fff", border:"none", borderRadius:4, padding:"3px 10px", fontSize:9.5, fontWeight:700, cursor:"pointer" }}>+ Fila</button>
          </div>

          <div style={{ fontSize:8.5, fontWeight:700, color:"#5A5855", letterSpacing:1, marginBottom:5 }}>FILAS</div>
          <div style={{ display:"flex", flexDirection:"column", gap:3, marginBottom:12 }}>
            {rows.map(row => (
              <div key={row.id} style={{ display:"flex", gap:5, alignItems:"center", background:"#EEECEA", borderRadius:4, padding:"3px 7px" }}>
                <span style={{ fontSize:8.5, color:"#7A7870", minWidth:16 }}>#{row.id}</span>
                <input value={row.label} onChange={e => setRows(p => p.map(r => r.id===row.id?{...r,label:e.target.value}:r))}
                  style={{ flex:1, fontSize:9.5, padding:"2px 5px", border:"1px solid #D3D1C7", borderRadius:3, fontFamily:"inherit" }} />
                <input value={row.sublabel} placeholder="sub-label" onChange={e => setRows(p => p.map(r => r.id===row.id?{...r,sublabel:e.target.value}:r))}
                  style={{ flex:1, fontSize:8.5, padding:"2px 5px", border:"1px solid #D3D1C7", borderRadius:3, fontFamily:"inherit", color:"#5A5855" }} />
                <IconBtn danger small onClick={() => setRows(p => p.filter(r => r.id!==row.id))}>✕</IconBtn>
              </div>
            ))}
          </div>

          <div style={{ fontSize:8.5, fontWeight:700, color:"#5A5855", letterSpacing:1, marginBottom:5 }}>ACTIVIDADES</div>
          <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
            {activities.map(act => {
              const col   = COLOR_PALETTE[act.color] || COLOR_PALETTE.gray;
              const open  = selected === act.id;
              const end   = act.start + act.duration;
              const wraps = end > CD;
              return (
                <div key={act.id} style={{ border:`1px solid ${open?col.border:"#D3D1C7"}`, borderRadius:5, overflow:"hidden" }}>
                  <div style={{ display:"flex", gap:6, alignItems:"center", padding:"4px 8px", background:open?col.light:"#FAFAF8", cursor:"pointer" }}
                    onClick={() => setSelected(open?null:act.id)}>
                    <div style={{ width:9, height:9, background:col.bg, borderRadius:2, flexShrink:0 }} />
                    <span style={{ flex:1, fontSize:9.5, fontWeight:600 }}>{act.label}</span>
                    <span style={{ fontSize:8, color:"#5A5855" }}>fila {act.row} · t={act.start}..{end%CD}{wraps?"(+wrap)":""}</span>
                    {wraps && <span style={{ fontSize:8, color:"#C04B2A", fontWeight:700 }}>↩{end-CD}s</span>}
                    <IconBtn danger small onClick={e=>{e.stopPropagation();delActivity(act.id);}}>✕</IconBtn>
                  </div>
                  {open && (
                    <div style={{ padding:"7px 10px", background:"#fff", display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                      {[["label","Etiqueta"],["sublabel","Sub-etiqueta"]].map(([k,l]) => (
                        <label key={k} style={{ display:"flex", flexDirection:"column", gap:2 }}>
                          <span style={{ fontSize:8, color:"#5A5855" }}>{l}</span>
                          <input value={act[k]} onChange={e => updAct(act.id,k,e.target.value)}
                            style={{ padding:"2px 5px", border:"1px solid #D3D1C7", borderRadius:3, fontSize:9.5, fontFamily:"inherit" }} />
                        </label>
                      ))}
                      <label style={{ display:"flex", flexDirection:"column", gap:2 }}>
                        <span style={{ fontSize:8, color:"#5A5855" }}>Inicio (seg, 0..{CD-1})</span>
                        <input type="number" min={0} max={CD-1} value={act.start}
                          onChange={e => updAct(act.id,"start",Math.min(CD-1,Math.max(0,+e.target.value)))}
                          style={{ padding:"2px 5px", border:"1px solid #D3D1C7", borderRadius:3, fontSize:9.5, fontFamily:"inherit" }} />
                      </label>
                      <label style={{ display:"flex", flexDirection:"column", gap:2 }}>
                        <span style={{ fontSize:8, color:"#5A5855" }}>Duración (seg){wraps?` ↩+${end-CD}s`:""}</span>
                        <input type="number" min={1} value={act.duration}
                          onChange={e => updAct(act.id,"duration",Math.max(1,+e.target.value))}
                          style={{ padding:"2px 5px", borderRadius:3, fontSize:9.5, fontFamily:"inherit",
                            border:`1px solid ${wraps?"#FCA5A5":"#D3D1C7"}` }} />
                      </label>
                      <label style={{ display:"flex", flexDirection:"column", gap:2 }}>
                        <span style={{ fontSize:8, color:"#5A5855" }}>Fila</span>
                        <select value={act.row} onChange={e => updAct(act.id,"row",+e.target.value)}
                          style={{ padding:"2px 5px", border:"1px solid #D3D1C7", borderRadius:3, fontSize:9.5, fontFamily:"inherit" }}>
                          {rows.map(r => <option key={r.id} value={r.id}>{r.id}: {r.label}</option>)}
                        </select>
                      </label>
                      <label style={{ display:"flex", flexDirection:"column", gap:2 }}>
                        <span style={{ fontSize:8, color:"#5A5855" }}>Color</span>
                        <select value={act.color} onChange={e => updAct(act.id,"color",e.target.value)}
                          style={{ padding:"2px 5px", border:"1px solid #D3D1C7", borderRadius:3, fontSize:9.5, fontFamily:"inherit" }}>
                          {COLOR_KEYS.map(c => <option key={c} value={c}>{colorNames[c]||c}</option>)}
                        </select>
                      </label>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══ DEPS ══ */}
      {tab === "deps" && (
        <div style={{ padding:"12px 16px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <div style={{ fontSize:8.5, fontWeight:700, color:"#5A5855", letterSpacing:1 }}>DEPENDENCIAS</div>
            <button onClick={addDep} style={{ background:"#0E8A6A", color:"#fff", border:"none", borderRadius:4, padding:"3px 9px", fontSize:9.5, fontWeight:700, cursor:"pointer" }}>+ Nueva</button>
          </div>

          <div style={{ background:"#EEECEA", borderRadius:5, padding:"7px 10px", marginBottom:10 }}>
            <div style={{ fontSize:8.5, fontWeight:700, color:"#5A5855", marginBottom:4 }}>TIPOS — y flag "ciclo siguiente"</div>
            {DEP_TYPES.map(d => (
              <div key={d.id} style={{ display:"flex", gap:8, fontSize:8.5, marginBottom:2 }}>
                <code style={{ color:"#5B4FD8", minWidth:68, fontFamily:"inherit" }}>{d.symbol}</code>
                <span style={{ fontWeight:600 }}>{d.label}</span>
              </div>
            ))}
            <div style={{ marginTop:6, fontSize:8, color:"#5A5855", borderTop:"1px solid #D3D1C7", paddingTop:5 }}>
              <strong>Ciclo siguiente (+1):</strong> marca esta opción cuando B pertenece al ciclo siguiente —
              p.ej. "Mov B termina antes que Mov A del próximo ciclo empiece". Resuelve las falsas violaciones en dependencias que cruzan el límite del período.
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            {depResults.map(dep => {
              const ok = dep.result?.ok;
              const needsN = ["start_min_after","start_before_end","start_after_start","end_after_end"].includes(dep.type);
              return (
                <div key={dep.id} style={{
                  border:`1px solid ${ok===false?"#FCA5A5":ok===true?"#86EFAC":"#D3D1C7"}`,
                  borderRadius:5, padding:"6px 8px",
                  background:ok===false?"#FEF2F2":"#FAFAF8"
                }}>
                  <div style={{ display:"flex", gap:5, alignItems:"center", flexWrap:"wrap" }}>
                    <span style={{ fontSize:11, fontWeight:700, minWidth:12, color:ok===false?"#B91C1C":ok===true?"#166534":"#aaa" }}>
                      {ok===false?"✗":ok===true?"✓":"?"}
                    </span>
                    <select value={dep.from} onChange={e => updDep(dep.id,"from",e.target.value)}
                      style={{ padding:"2px 4px", border:"1px solid #D3D1C7", borderRadius:3, fontSize:9, fontFamily:"inherit" }}>
                      {activities.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                    </select>
                    <select value={dep.type} onChange={e => updDep(dep.id,"type",e.target.value)}
                      style={{ padding:"2px 4px", border:"1px solid #D3D1C7", borderRadius:3, fontSize:9, fontFamily:"inherit", flex:1 }}>
                      {DEP_TYPES.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                    </select>
                    <select value={dep.to} onChange={e => updDep(dep.id,"to",e.target.value)}
                      style={{ padding:"2px 4px", border:"1px solid #D3D1C7", borderRadius:3, fontSize:9, fontFamily:"inherit" }}>
                      {activities.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                    </select>
                    {needsN && (
                      <label style={{ display:"flex", gap:3, alignItems:"center", fontSize:9 }}>
                        N=<input type="number" min={0} value={dep.offset??0} onChange={e => updDep(dep.id,"offset",+e.target.value)}
                          style={{ width:34, padding:"1px 4px", border:"1px solid #D3D1C7", borderRadius:3, fontSize:9, fontFamily:"inherit" }} />s
                      </label>
                    )}
                    {/* nextCycle toggle */}
                    <label style={{ display:"flex", gap:3, alignItems:"center", fontSize:8.5, cursor:"pointer",
                      background: dep.nextCycle?"#EAE8FC":"transparent",
                      border:"1px solid", borderColor: dep.nextCycle?"#4338CA":"#D3D1C7",
                      borderRadius:3, padding:"1px 5px" }}>
                      <input type="checkbox" checked={!!dep.nextCycle}
                        onChange={e => updDep(dep.id,"nextCycle",e.target.checked)}
                        style={{ margin:0 }} />
                      <span style={{ color: dep.nextCycle?"#4338CA":"#5A5855", fontWeight: dep.nextCycle?700:400 }}>+1 ciclo</span>
                    </label>
                    <IconBtn danger small onClick={() => setDeps(p => p.filter(d => d.id!==dep.id))}>✕</IconBtn>
                  </div>
                  {dep.result && !dep.result.ok && (
                    <div style={{ fontSize:8, color:"#B91C1C", marginTop:3 }}>
                      Esperado: {dep.result.expected}s · Actual: {dep.result.actual}s · Δ={dep.result.actual-Number(dep.result.expected)}s
                      {!dep.nextCycle && " — ¿querías marcar '+1 ciclo'?"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══ LEGEND ══ */}
      {tab === "legend" && (
        <div style={{ padding:"12px 16px", maxWidth:520 }}>
          <div style={{ fontSize:8.5, fontWeight:700, color:"#5A5855", letterSpacing:1, marginBottom:10 }}>
            CATEGORÍAS DE COLOR — renombra cada categoría según tu modelo
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {COLOR_KEYS.map(k => {
              const col = COLOR_PALETTE[k];
              const count = activities.filter(a => a.color===k).length;
              return (
                <div key={k} style={{ display:"flex", gap:9, alignItems:"center", background:col.light, border:`1px solid ${col.border}`, borderRadius:6, padding:"6px 10px" }}>
                  <div style={{ width:30, height:18, background:col.bg, borderRadius:4, flexShrink:0, border:`1px solid ${col.border}` }} />
                  <input value={colorNames[k]} onChange={e => setColorNames(p=>({...p,[k]:e.target.value}))}
                    placeholder={`Nombre para ${k}...`}
                    style={{ flex:1, fontSize:10, fontWeight:600, padding:"3px 7px", border:`1px solid ${col.border}`, borderRadius:4, background:"#fff", fontFamily:"inherit", color:col.border }} />
                  <span style={{ fontSize:8, color:col.border, minWidth:44, textAlign:"right" }}>
                    {count} act.
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══ CONFIG ══ */}
      {tab === "config" && (
        <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:9, maxWidth:400 }}>
          {[
            ["title",         "Título",                   "text"],
            ["subtitle",      "Subtítulo",                "text"],
            ["cycleDuration", "Duración del ciclo (seg)", "number"],
            ["pixelsPerSec",  "Zoom (px/seg)",            "number"],
            ["rowHeight",     "Altura de fila (px)",      "number"],
            ["visibleCycles", "Ciclos visibles (1-5)",    "number"],
          ].map(([k,l,t]) => (
            <label key={k} style={{ display:"flex", flexDirection:"column", gap:3 }}>
              <span style={{ fontSize:8.5, fontWeight:700, color:"#3F3E3B" }}>{l}</span>
              <input type={t} value={config[k]??""} min={t==="number"?1:undefined}
                onChange={e => setConfig(p=>({...p,[k]:t==="number"?+e.target.value:e.target.value}))}
                style={{ padding:"4px 7px", border:"1px solid #D3D1C7", borderRadius:4, fontSize:10, fontFamily:"inherit" }} />
            </label>
          ))}
          <div style={{ fontSize:8.5, color:"#5A5855", marginTop:3, lineHeight:1.7 }}>
            Actividades: {activities.length} · Dependencias: {deps.length} · Violaciones: {violations.length}<br/>
            Wrap-around: {activities.filter(a=>a.start+a.duration>CD).map(a=>a.label).join(", ")||"ninguna"}<br/>
            Deps ciclo siguiente: {deps.filter(d=>d.nextCycle).length}
          </div>
          <div style={{ background:"#EEECEA", borderRadius:5, padding:"8px 10px", fontSize:8.5, color:"#5A5855" }}>
            <strong>Guardar / Cargar:</strong> usa los botones del header. El archivo JSON contiene todas las actividades, filas, dependencias y configuración. Puedes compartirlo con otros o retomarlo después.
          </div>
        </div>
      )}
    </div>
  );
}
