import { useState, useCallback, useRef, useEffect } from "react";

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

const DEP_TYPES = [
  { id: "start_after_end",   label: "empieza después que termina",            symbol: "A→|→B",    desc: "B.inicio ≥ A.fin" },
  { id: "start_together",    label: "empiezan juntos",                         symbol: "A|B",      desc: "B.inicio = A.inicio" },
  { id: "start_min_after",   label: "empieza mín. N seg después que termina", symbol: "A→N→B",    desc: "B.inicio ≥ A.fin + N" },
  { id: "start_before_end",  label: "empieza mín. N seg antes que termine",   symbol: "A…N|B",    desc: "B.inicio ≤ A.fin − N" },
  { id: "start_after_start", label: "empieza mín. N seg después de iniciar",  symbol: "|A→N→|B",  desc: "B.inicio ≥ A.inicio + N" },
  { id: "end_together",      label: "terminan juntos",                          symbol: "A|B|",     desc: "B.fin = A.fin" },
  { id: "end_after_end",     label: "termina mín. N seg después que termina",  symbol: "A|→N→|B",  desc: "B.fin ≥ A.fin + N" },
];

// ─── Ciclo 47 seg (régimen estacionario) ──────────────────────────────────────
// Fuente: planilla Ciclos_Robot.xlsx, hoja Resultados
// R1 ciclo = 47 seg: Mov A (23.5 seg) + Mov B (23.5 seg)
// Desarme Ecofrost/Pomuni = 30 seg, Rearmado = 30 seg (solapado con R1)
// Loop = 15 seg (7.5 m × 0.5 m/seg)
// En régimen: R1 deposita nivel N en mesa depósito (t=0..23.5)
//             Paralelamente R2/R3 desarman nivel anterior y rearman en loop
//             R1 toma nivel ya procesado de mesa toma (t=23.5..47)
//             Al llegar t=47: nuevo ciclo idéntico comienza

const DEFAULT_ACTIVITIES = [
  // ── Robot R1 ──
  { id: "r1movA",   label: "Mov A — R1",       sublabel: "pallet entrada→mesa dep.",  row: 0, color: "purple", start: 0,    duration: 24 },
  { id: "r1movB",   label: "Mov B — R1",       sublabel: "mesa toma→pallet destino",  row: 0, color: "teal",   start: 24,   duration: 23 },

  // ── Mesa depósito (entrada al desarme) ──
  { id: "mdDep",    label: "Nivel N depositado", sublabel: "R1 libera t=24",           row: 1, color: "purple", start: 0,    duration: 24 },
  { id: "mdEsp",    label: "Esperando desarme",  sublabel: "",                         row: 1, color: "slate",  start: 24,   duration: 6  },
  { id: "mdDesarm", label: "Entrando a desarme", sublabel: "→ R2/R3",                  row: 1, color: "coral",  start: 30,   duration: 5  },
  { id: "mdNxt",    label: "Nivel N+1",          sublabel: "R1 deposita t=47",         row: 1, color: "slate",  start: 47,   duration: 24 },

  // ── Desarme R2/R3 (solapado, empieza cuando R1 termina Mov A aprox.) ──
  { id: "desarm",   label: "Desarme R2/R3",    sublabel: "30 seg · Ecofrost/Pomuni",  row: 2, color: "coral",  start: 0,    duration: 30 },
  { id: "envLoop",  label: "Envía al loop",    sublabel: "cajas una a una",            row: 2, color: "coral",  start: 30,   duration: 15 },
  { id: "rearm",    label: "Rearmado R2/R3",   sublabel: "30 seg",                    row: 2, color: "coral",  start: 15,   duration: 30 },
  { id: "salMesa",  label: "Sale a mesa toma", sublabel: "nivel procesado",            row: 2, color: "coral",  start: 45,   duration: 2  },

  // ── Loop cinta (15 seg de recorrido) ──
  { id: "loop",     label: "Cajas en loop",    sublabel: "7,5 m · 0,5 m/seg = 15 seg", row: 3, color: "gray",  start: 30,   duration: 30 },

  // ── Etiquetadora ──
  { id: "etiq",     label: "Etiquetando",      sublabel: "12 cajas · vel. regulada",  row: 4, color: "blue",   start: 33,   duration: 22 },

  // ── Mesa toma (salida del rearmado, R1 toma de aquí) ──
  { id: "mtLista",  label: "Nivel listo",      sublabel: "R1 toma t=24",              row: 5, color: "teal",   start: 0,    duration: 24 },
  { id: "mtVacia",  label: "Vacía",            sublabel: "esperando rearmado",        row: 5, color: "slate",  start: 24,   duration: 23 },
  { id: "mtNxt",    label: "Nivel N listo",    sublabel: "R1 toma t=47",              row: 5, color: "teal",   start: 47,   duration: 24 },
];

const DEFAULT_ROWS = [
  { id: 0, label: "Robot R1",      sublabel: "Yaskawa PL190" },
  { id: 1, label: "Mesa depósito", sublabel: "entrada desarme" },
  { id: 2, label: "Desarme/Rearm.", sublabel: "R2 + R3 · Celluveyor" },
  { id: 3, label: "Loop",          sublabel: "7,5 m · 0,5 m/seg" },
  { id: 4, label: "Etiquetadora",  sublabel: "2 etiq/caja" },
  { id: 5, label: "Mesa toma",     sublabel: "salida rearmado" },
];

const DEFAULT_DEPS = [
  { id: "d1", from: "r1movA",  to: "r1movB",  type: "start_after_end",  offset: 0 },
  { id: "d2", from: "desarm",  to: "envLoop",  type: "start_after_end",  offset: 0 },
  { id: "d3", from: "envLoop", to: "loop",     type: "start_together",   offset: 0 },
  { id: "d4", from: "rearm",   to: "salMesa",  type: "start_after_end",  offset: 0 },
  { id: "d5", from: "salMesa", to: "mtNxt",    type: "start_together",   offset: 0 },
  { id: "d6", from: "r1movB",  to: "r1movA",   type: "end_after_end",    offset: 0 },
];

const DEFAULT_CONFIG = {
  cycleDuration: 47,
  title: "Ciclo Robot R1 — Watts / Frutos del Maipo  (régimen estacionario)",
  subtitle: "47 seg/nivel · Ecofrost/Pomuni · loop 15 seg · ~919 cj/h · ~10,9 h para 10.000 cajas",
  pixelsPerSec: 11,
  rowHeight: 38,
};

function uid() { return Math.random().toString(36).slice(2, 8); }

// Returns [{start, duration, wrapped}] — splits at cycleDuration boundary
function getSegments(act, CD) {
  const end = act.start + act.duration;
  if (end <= CD) return [{ start: act.start, duration: act.duration, wrapped: false }];
  const segs = [];
  if (CD - act.start > 0) segs.push({ start: act.start, duration: CD - act.start, wrapped: false });
  if (end - CD > 0)        segs.push({ start: 0,         duration: end - CD,       wrapped: true  });
  return segs;
}

function checkDep(dep, activities) {
  const from = activities.find(a => a.id === dep.from);
  const to   = activities.find(a => a.id === dep.to);
  if (!from || !to) return null;
  const fromEnd = from.start + from.duration;
  const toEnd   = to.start   + to.duration;
  const n       = dep.offset ?? 0;
  switch (dep.type) {
    case "start_after_end":   return { ok: to.start >= fromEnd,        expected: fromEnd,            actual: to.start };
    case "start_together":    return { ok: to.start === from.start,    expected: from.start,         actual: to.start };
    case "start_min_after":   return { ok: to.start >= fromEnd + n,    expected: fromEnd + n,        actual: to.start };
    case "start_before_end":  return { ok: to.start <= fromEnd - n,    expected: `≤${fromEnd - n}`,  actual: to.start };
    case "start_after_start": return { ok: to.start >= from.start + n, expected: from.start + n,     actual: to.start };
    case "end_together":      return { ok: toEnd === fromEnd,           expected: fromEnd,            actual: toEnd   };
    case "end_after_end":     return { ok: toEnd >= fromEnd + n,        expected: fromEnd + n,        actual: toEnd   };
    default: return null;
  }
}

function IconBtn({ onClick, children, danger, small }) {
  return (
    <button onClick={onClick} style={{
      padding: small ? "1px 5px" : "2px 8px", fontSize: 10,
      border: "none", borderRadius: 3, cursor: "pointer", fontFamily: "inherit",
      background: danger ? "#FEE2E2" : "#EEECEA",
      color: danger ? "#B91C1C" : "#3F3E3B",
    }}>{children}</button>
  );
}

function ActivityBar({ act, rowY, PPS, RH, CD, isSelected, onSelect, onStartDrag }) {
  const col  = COLOR_PALETTE[act.color] || COLOR_PALETTE.gray;
  const segs = getSegments(act, CD);
  return segs.map((seg, si) => {
    const x = seg.start * PPS;
    const w = Math.max(seg.duration * PPS, 2);
    return (
      <g key={si} onClick={() => onSelect(act.id)} style={{ cursor: "pointer" }}>
        {seg.wrapped && <rect x={x} y={rowY + 3} width={3} height={RH - 6} fill={col.bg} opacity={0.9} />}
        <rect x={x + (seg.wrapped ? 3 : 0)} y={rowY + 3}
          width={Math.max(w - (seg.wrapped ? 3 : 0), 1)} height={RH - 6}
          fill={col.light} stroke={isSelected ? "#1C1B18" : col.border}
          strokeWidth={isSelected ? 2 : 1} strokeDasharray={seg.wrapped ? "4 2" : "none"}
          rx={3} opacity={seg.wrapped ? 0.82 : 1} />
        <rect x={x + (seg.wrapped ? 3 : 0)} y={rowY + 3}
          width={Math.max(w - (seg.wrapped ? 3 : 0), 1)} height={4}
          fill={col.bg} rx={3} opacity={seg.wrapped ? 0.7 : 1} />
        <rect x={x + (seg.wrapped ? 3 : 0)} y={rowY + 5}
          width={Math.max(w - (seg.wrapped ? 3 : 0), 1)} height={2}
          fill={col.bg} opacity={seg.wrapped ? 0.7 : 1} />
        {w > 22 && (
          <text x={x + (seg.wrapped ? 6 : 4)} y={rowY + RH / 2 - 2}
            style={{ fontSize: 8.5, fontWeight: 700, fill: col.border, fontFamily: "inherit", pointerEvents: "none" }}>
            {seg.wrapped ? "↩ " : ""}{act.label}
          </text>
        )}
        {w > 36 && act.sublabel && !seg.wrapped && (
          <text x={x + 4} y={rowY + RH / 2 + 9}
            style={{ fontSize: 7.5, fill: col.bg, fontFamily: "inherit", pointerEvents: "none" }}>
            {act.sublabel}
          </text>
        )}
        {w > 28 && (
          <text x={x + w - 3} y={rowY + RH - 5} textAnchor="end"
            style={{ fontSize: 7, fill: col.border, opacity: 0.55, fontFamily: "inherit", pointerEvents: "none" }}>
            {seg.wrapped ? `0+${seg.duration}` : `${act.start}+${act.duration}`}
          </text>
        )}
        {!seg.wrapped && (
          <rect x={x} y={rowY + 3} width={Math.max(w - 8, 1)} height={RH - 6}
            fill="transparent" style={{ cursor: "grab" }}
            onMouseDown={e => onStartDrag(e, act.id, "move")} />
        )}
        {si === segs.length - 1 && (
          <rect x={x + w - 7} y={rowY + 3} width={7} height={RH - 6}
            fill={col.bg} opacity={0.28} rx={2} style={{ cursor: "ew-resize" }}
            onMouseDown={e => onStartDrag(e, act.id, "resize")} />
        )}
      </g>
    );
  });
}

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
  let x1, x2;
  switch (dep.type) {
    case "start_after_end": case "start_min_after":
      x1 = (fromEnd % CD) * PPS; x2 = toA.start * PPS; break;
    case "start_together": case "start_before_end": case "start_after_start":
      x1 = fromA.start * PPS; x2 = toA.start * PPS; break;
    case "end_together": case "end_after_end":
      x1 = (fromEnd % CD) * PPS; x2 = (toEnd % CD) * PPS; break;
    default:
      x1 = (fromEnd % CD) * PPS; x2 = toA.start * PPS;
  }
  const y1 = 50 + fri * ROWH + RH / 2;
  const y2 = 50 + tri * ROWH + RH / 2;
  const mid = (x1 + x2) / 2;
  const path = Math.abs(x1 - x2) < 2
    ? `M ${x1} ${y1} L ${x2} ${y2}`
    : `M ${x1} ${y1} C ${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`;
  const aid = `arr-${dep.id}`;
  return (
    <g>
      <defs>
        <marker id={aid} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={color} />
        </marker>
      </defs>
      <path d={path} fill="none" stroke={color}
        strokeWidth={ok === false ? 1.8 : 1.2}
        strokeDasharray={ok === false ? "4 2" : "none"}
        markerEnd={`url(#${aid})`} opacity={0.72} />
    </g>
  );
}

export default function GanttCiclico() {
  const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);
  const [rows, setRows]             = useState(DEFAULT_ROWS);
  const [deps, setDeps]             = useState(DEFAULT_DEPS);
  const [config, setConfig]         = useState(DEFAULT_CONFIG);
  const [colorNames, setColorNames] = useState(DEFAULT_COLOR_NAMES);
  const [selected, setSelected]     = useState(null);
  const [tab, setTab]               = useState("gantt");
  const [dragState, setDragState]   = useState(null);

  const PPS   = config.pixelsPerSec;
  const RH    = config.rowHeight;
  const ROWH  = RH + 4;
  const LW    = 122;
  const CD    = config.cycleDuration;
  const totalW = LW + CD * PPS + 28;
  const totalH = rows.length * ROWH + 58;

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

  const depResults = deps.map(d => ({ ...d, result: checkDep(d, activities) }));
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
    setDeps(p => [...p, { id: "dep_" + uid(), from: activities[0].id, to: activities[1].id, type: "start_after_end", offset: 0 }]);
    setTab("deps");
  };
  const updDep = (id, k, v) => setDeps(p => p.map(d => d.id === id ? { ...d, [k]: v } : d));
  const addRow = () => {
    const maxId = Math.max(...rows.map(r => r.id), -1) + 1;
    setRows(p => [...p, { id: maxId, label: "Nueva fila", sublabel: "" }]);
  };

  const step = CD > 120 ? 10 : 5;
  const ticks = Array.from({ length: Math.floor(CD / step) + 1 }, (_, i) => i * step);

  const maxWrap = Math.max(0, ...activities.map(a => Math.max(0, a.start + a.duration - CD)));

  const TABS = [["gantt","📊 Diagrama"],["activities","⚙ Actividades"],["deps","🔗 Dependencias"],["legend","🎨 Leyenda"],["config","⚙ Config"]];

  return (
    <div style={{ fontFamily: "'DM Mono','Fira Mono','Courier New',monospace", background: "#F5F3EE", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#1C1B18", padding: "9px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div>
          <div style={{ color: "#F5F3EE", fontSize: 12, fontWeight: 700 }}>GANTT CÍCLICO</div>
          <div style={{ color: "#7A7870", fontSize: 8.5, marginTop: 1 }}>ciclos industriales con dependencias · wrap-around automático</div>
        </div>
        <div style={{ flex: 1 }} />
        {violations.length > 0 && (
          <div style={{ background: "#7F1D1D", color: "#FEE2E2", padding: "3px 9px", borderRadius: 4, fontSize: 9.5, fontWeight: 700 }}>
            ⚠ {violations.length} violación{violations.length > 1 ? "es" : ""}
          </div>
        )}
        <button onClick={addActivity} style={{ background: "#5B4FD8", color: "#fff", border: "none", borderRadius: 4, padding: "4px 10px", fontSize: 9.5, fontWeight: 700, cursor: "pointer" }}>+ Actividad</button>
        <button onClick={addDep}      style={{ background: "#0E8A6A", color: "#fff", border: "none", borderRadius: 4, padding: "4px 10px", fontSize: 9.5, fontWeight: 700, cursor: "pointer" }}>+ Dependencia</button>
      </div>

      {/* Tabs */}
      <div style={{ background: "#E8E6DF", display: "flex", borderBottom: "2px solid #D3D1C7" }}>
        {TABS.map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            padding: "6px 14px", fontSize: 9.5, fontWeight: 700, border: "none", cursor: "pointer",
            background: tab === k ? "#F5F3EE" : "transparent",
            color: tab === k ? "#1C1B18" : "#5A5855",
            borderBottom: tab === k ? "2px solid #5B4FD8" : "2px solid transparent", marginBottom: -2,
          }}>{l}</button>
        ))}
      </div>

      {/* ── GANTT ── */}
      {tab === "gantt" && (
        <div style={{ padding: "12px 16px" }}>
          <div style={{ marginBottom: 7 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "#1C1B18" }}>{config.title}</div>
            <div style={{ fontSize: 8.5, color: "#5A5855", marginTop: 1 }}>{config.subtitle}</div>
          </div>

          {violations.length > 0 && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 5, padding: "6px 10px", marginBottom: 8, fontSize: 8.5 }}>
              <strong style={{ color: "#991B1B" }}>Dependencias violadas: </strong>
              {violations.map(v => {
                const fa = activities.find(a => a.id === v.from);
                const ta = activities.find(a => a.id === v.to);
                const dt = DEP_TYPES.find(d => d.id === v.type);
                return <span key={v.id} style={{ color: "#B91C1C" }}> [{fa?.label}] {dt?.label} [{ta?.label}] esp:{v.result?.expected} act:{v.result?.actual} ·</span>;
              })}
            </div>
          )}

          <div style={{ overflowX: "auto", border: "1px solid #D3D1C7", borderRadius: 6, background: "#fff" }}>
            <svg width={totalW} height={totalH} style={{ display: "block", userSelect: "none" }}>

              {/* Row stripes */}
              {rows.map((row, ri) => (
                <rect key={row.id} x={LW} y={48 + ri * ROWH} width={CD * PPS} height={RH}
                  fill={ri % 2 === 0 ? "#FAFAF8" : "#F5F3EE"} />
              ))}

              {/* Wrap-around tint — shows how much of the next cycle is used */}
              {maxWrap > 0 && (
                <rect x={LW} y={44} width={maxWrap * PPS} height={totalH - 44}
                  fill="#FEF2F2" opacity={0.5} />
              )}

              {/* Ticks */}
              {ticks.map(t => (
                <g key={t}>
                  <line x1={LW + t * PPS} y1={38} x2={LW + t * PPS} y2={totalH}
                    stroke={t % (step * 2) === 0 ? "#C4C2BA" : "#EBEBEA"}
                    strokeWidth={t % (step * 2) === 0 ? 1 : 0.5} />
                  <text x={LW + t * PPS} y={30} textAnchor="middle"
                    style={{ fontSize: 8, fill: "#7A7870", fontFamily: "inherit" }}>{t}s</text>
                </g>
              ))}

              {/* Cycle end line */}
              <line x1={LW + CD * PPS} y1={34} x2={LW + CD * PPS} y2={totalH}
                stroke="#C04B2A" strokeWidth={2} strokeDasharray="5 3" />
              <text x={LW + CD * PPS - 3} y={28} textAnchor="end"
                style={{ fontSize: 8.5, fill: "#C04B2A", fontWeight: 700, fontFamily: "inherit" }}>T={CD}s</text>

              {/* Row labels */}
              {rows.map((row, ri) => {
                const y = 48 + ri * ROWH;
                return (
                  <g key={row.id}>
                    <rect x={0} y={y} width={LW - 4} height={RH} fill="#EEECEA" rx={2} />
                    <text x={5} y={y + RH / 2 - 4} style={{ fontSize: 9, fontWeight: 700, fill: "#1C1B18", fontFamily: "inherit" }}>{row.label}</text>
                    <text x={5} y={y + RH / 2 + 7} style={{ fontSize: 7.5, fill: "#5A5855", fontFamily: "inherit" }}>{row.sublabel}</text>
                  </g>
                );
              })}

              {/* Activities — offset by LW */}
              <g transform={`translate(${LW}, 0)`}>
                {activities.map(act => {
                  const ri = rows.findIndex(r => r.id === act.row);
                  if (ri < 0) return null;
                  return (
                    <ActivityBar key={act.id} act={act} rowY={48 + ri * ROWH}
                      PPS={PPS} RH={RH} CD={CD}
                      isSelected={selected === act.id}
                      onSelect={id => setSelected(id === selected ? null : id)}
                      onStartDrag={startDrag} />
                  );
                })}
                {/* Dependency arrows */}
                {depResults.map(dep => (
                  <DepArrow key={dep.id} dep={dep} activities={activities} rows={rows}
                    PPS={PPS} RH={RH} CD={CD} />
                ))}
              </g>

              <line x1={0} y1={40} x2={totalW} y2={40} stroke="#D3D1C7" strokeWidth={1} />
            </svg>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 12, marginTop: 9, flexWrap: "wrap", alignItems: "center" }}>
            {COLOR_KEYS.map(k => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 8.5, color: "#3F3E3B" }}>
                <div style={{ width: 22, height: 7, background: COLOR_PALETTE[k].bg, borderRadius: 2 }} />
                {colorNames[k]}
              </div>
            ))}
            {maxWrap > 0 && (
              <div style={{ fontSize: 8.5, color: "#C04B2A", display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 14, borderTop: "2px dashed #C04B2A" }} /> ↩ continúa inicio siguiente ciclo
              </div>
            )}
            <div style={{ fontSize: 8.5, color: "#7A7870" }}>↔ arrastrar barra · borde der. = redimensionar</div>
          </div>
        </div>
      )}

      {/* ── ACTIVITIES ── */}
      {tab === "activities" && (
        <div style={{ padding: "12px 16px" }}>
          <div style={{ display: "flex", gap: 7, marginBottom: 10 }}>
            <button onClick={addActivity} style={{ background: "#5B4FD8", color: "#fff", border: "none", borderRadius: 4, padding: "3px 10px", fontSize: 9.5, fontWeight: 700, cursor: "pointer" }}>+ Actividad</button>
            <button onClick={addRow}      style={{ background: "#3B5278", color: "#fff", border: "none", borderRadius: 4, padding: "3px 10px", fontSize: 9.5, fontWeight: 700, cursor: "pointer" }}>+ Fila</button>
          </div>

          <div style={{ fontSize: 8.5, fontWeight: 700, color: "#5A5855", letterSpacing: 1, marginBottom: 5 }}>FILAS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 12 }}>
            {rows.map(row => (
              <div key={row.id} style={{ display: "flex", gap: 5, alignItems: "center", background: "#EEECEA", borderRadius: 4, padding: "3px 7px" }}>
                <span style={{ fontSize: 8.5, color: "#7A7870", minWidth: 16 }}>#{row.id}</span>
                <input value={row.label} onChange={e => setRows(p => p.map(r => r.id === row.id ? { ...r, label: e.target.value } : r))}
                  style={{ flex: 1, fontSize: 9.5, padding: "2px 5px", border: "1px solid #D3D1C7", borderRadius: 3, fontFamily: "inherit" }} />
                <input value={row.sublabel} placeholder="sub-label" onChange={e => setRows(p => p.map(r => r.id === row.id ? { ...r, sublabel: e.target.value } : r))}
                  style={{ flex: 1, fontSize: 8.5, padding: "2px 5px", border: "1px solid #D3D1C7", borderRadius: 3, fontFamily: "inherit", color: "#5A5855" }} />
                <IconBtn danger small onClick={() => setRows(p => p.filter(r => r.id !== row.id))}>✕</IconBtn>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 8.5, fontWeight: 700, color: "#5A5855", letterSpacing: 1, marginBottom: 5 }}>ACTIVIDADES</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {activities.map(act => {
              const col  = COLOR_PALETTE[act.color] || COLOR_PALETTE.gray;
              const open = selected === act.id;
              const end  = act.start + act.duration;
              const wraps = end > CD;
              return (
                <div key={act.id} style={{ border: `1px solid ${open ? col.border : "#D3D1C7"}`, borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "4px 8px", background: open ? col.light : "#FAFAF8", cursor: "pointer" }}
                    onClick={() => setSelected(open ? null : act.id)}>
                    <div style={{ width: 9, height: 9, background: col.bg, borderRadius: 2, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 9.5, fontWeight: 600 }}>{act.label}</span>
                    <span style={{ fontSize: 8, color: "#5A5855" }}>fila {act.row} · t={act.start}..{end % CD}{wraps ? "(+wrap)" : ""}</span>
                    {wraps && <span style={{ fontSize: 8, color: "#C04B2A", fontWeight: 700 }}>↩{end - CD}s</span>}
                    <IconBtn danger small onClick={e => { e.stopPropagation(); delActivity(act.id); }}>✕</IconBtn>
                  </div>
                  {open && (
                    <div style={{ padding: "7px 10px", background: "#fff", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {[["label","Etiqueta"],["sublabel","Sub-etiqueta"]].map(([k, l]) => (
                        <label key={k} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <span style={{ fontSize: 8, color: "#5A5855" }}>{l}</span>
                          <input value={act[k]} onChange={e => updAct(act.id, k, e.target.value)}
                            style={{ padding: "2px 5px", border: "1px solid #D3D1C7", borderRadius: 3, fontSize: 9.5, fontFamily: "inherit" }} />
                        </label>
                      ))}
                      <label style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontSize: 8, color: "#5A5855" }}>Inicio (seg, 0..{CD - 1})</span>
                        <input type="number" min={0} max={CD - 1} value={act.start}
                          onChange={e => updAct(act.id, "start", Math.min(CD - 1, Math.max(0, +e.target.value)))}
                          style={{ padding: "2px 5px", border: "1px solid #D3D1C7", borderRadius: 3, fontSize: 9.5, fontFamily: "inherit" }} />
                      </label>
                      <label style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontSize: 8, color: "#5A5855" }}>Duración (seg){wraps ? ` ↩ +${end - CD}s wrap` : ""}</span>
                        <input type="number" min={1} value={act.duration}
                          onChange={e => updAct(act.id, "duration", Math.max(1, +e.target.value))}
                          style={{ padding: "2px 5px", borderRadius: 3, fontSize: 9.5, fontFamily: "inherit",
                            border: `1px solid ${wraps ? "#FCA5A5" : "#D3D1C7"}` }} />
                      </label>
                      <label style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontSize: 8, color: "#5A5855" }}>Fila</span>
                        <select value={act.row} onChange={e => updAct(act.id, "row", +e.target.value)}
                          style={{ padding: "2px 5px", border: "1px solid #D3D1C7", borderRadius: 3, fontSize: 9.5, fontFamily: "inherit" }}>
                          {rows.map(r => <option key={r.id} value={r.id}>{r.id}: {r.label}</option>)}
                        </select>
                      </label>
                      <label style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontSize: 8, color: "#5A5855" }}>Color</span>
                        <select value={act.color} onChange={e => updAct(act.id, "color", e.target.value)}
                          style={{ padding: "2px 5px", border: "1px solid #D3D1C7", borderRadius: 3, fontSize: 9.5, fontFamily: "inherit" }}>
                          {COLOR_KEYS.map(c => <option key={c} value={c}>{colorNames[c] || c}</option>)}
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

      {/* ── DEPS ── */}
      {tab === "deps" && (
        <div style={{ padding: "12px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: "#5A5855", letterSpacing: 1 }}>DEPENDENCIAS</div>
            <button onClick={addDep} style={{ background: "#0E8A6A", color: "#fff", border: "none", borderRadius: 4, padding: "3px 9px", fontSize: 9.5, fontWeight: 700, cursor: "pointer" }}>+ Nueva</button>
          </div>

          <div style={{ background: "#EEECEA", borderRadius: 5, padding: "7px 10px", marginBottom: 10 }}>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: "#5A5855", marginBottom: 4 }}>TIPOS</div>
            {DEP_TYPES.map(d => (
              <div key={d.id} style={{ display: "flex", gap: 8, fontSize: 8.5, marginBottom: 2, alignItems: "baseline" }}>
                <code style={{ color: "#5B4FD8", minWidth: 72, fontFamily: "inherit" }}>{d.symbol}</code>
                <span style={{ fontWeight: 600, minWidth: 200 }}>{d.label}</span>
                <span style={{ color: "#5A5855" }}>{d.desc}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {depResults.map(dep => {
              const ok = dep.result?.ok;
              const needsN = ["start_min_after","start_before_end","start_after_start","end_after_end"].includes(dep.type);
              return (
                <div key={dep.id} style={{
                  border: `1px solid ${ok === false ? "#FCA5A5" : ok === true ? "#86EFAC" : "#D3D1C7"}`,
                  borderRadius: 5, padding: "6px 8px",
                  background: ok === false ? "#FEF2F2" : "#FAFAF8"
                }}>
                  <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, minWidth: 12, color: ok === false ? "#B91C1C" : ok === true ? "#166534" : "#aaa" }}>
                      {ok === false ? "✗" : ok === true ? "✓" : "?"}
                    </span>
                    <select value={dep.from} onChange={e => updDep(dep.id, "from", e.target.value)}
                      style={{ padding: "2px 4px", border: "1px solid #D3D1C7", borderRadius: 3, fontSize: 9, fontFamily: "inherit" }}>
                      {activities.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                    </select>
                    <select value={dep.type} onChange={e => updDep(dep.id, "type", e.target.value)}
                      style={{ padding: "2px 4px", border: "1px solid #D3D1C7", borderRadius: 3, fontSize: 9, fontFamily: "inherit", flex: 1 }}>
                      {DEP_TYPES.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                    </select>
                    <select value={dep.to} onChange={e => updDep(dep.id, "to", e.target.value)}
                      style={{ padding: "2px 4px", border: "1px solid #D3D1C7", borderRadius: 3, fontSize: 9, fontFamily: "inherit" }}>
                      {activities.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                    </select>
                    {needsN && (
                      <label style={{ display: "flex", gap: 3, alignItems: "center", fontSize: 9 }}>
                        N=<input type="number" min={0} value={dep.offset ?? 0} onChange={e => updDep(dep.id, "offset", +e.target.value)}
                          style={{ width: 34, padding: "1px 4px", border: "1px solid #D3D1C7", borderRadius: 3, fontSize: 9, fontFamily: "inherit" }} />s
                      </label>
                    )}
                    <IconBtn danger small onClick={() => setDeps(p => p.filter(d => d.id !== dep.id))}>✕</IconBtn>
                  </div>
                  {dep.result && !dep.result.ok && (
                    <div style={{ fontSize: 8, color: "#B91C1C", marginTop: 3 }}>
                      Esperado: {dep.result.expected}s · Actual: {dep.result.actual}s · Δ={dep.result.actual - Number(dep.result.expected)}s
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── LEGEND ── */}
      {tab === "legend" && (
        <div style={{ padding: "12px 16px", maxWidth: 520 }}>
          <div style={{ fontSize: 8.5, fontWeight: 700, color: "#5A5855", letterSpacing: 1, marginBottom: 10 }}>
            CATEGORÍAS DE COLOR — renombra cada categoría según tu modelo
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {COLOR_KEYS.map(k => {
              const col = COLOR_PALETTE[k];
              const count = activities.filter(a => a.color === k).length;
              return (
                <div key={k} style={{ display: "flex", gap: 9, alignItems: "center", background: col.light, border: `1px solid ${col.border}`, borderRadius: 6, padding: "6px 10px" }}>
                  <div style={{ width: 30, height: 18, background: col.bg, borderRadius: 4, flexShrink: 0, border: `1px solid ${col.border}` }} />
                  <input value={colorNames[k]}
                    onChange={e => setColorNames(p => ({ ...p, [k]: e.target.value }))}
                    placeholder={`Nombre para ${k}...`}
                    style={{ flex: 1, fontSize: 10, fontWeight: 600, padding: "3px 7px", border: `1px solid ${col.border}`, borderRadius: 4, background: "#fff", fontFamily: "inherit", color: col.border }} />
                  <span style={{ fontSize: 8, color: col.border, minWidth: 44, textAlign: "right" }}>
                    {count} actividad{count !== 1 ? "es" : ""}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 12, fontSize: 8.5, color: "#5A5855", lineHeight: 1.7 }}>
            Los nombres aparecen en la leyenda del diagrama y en el selector de color de cada actividad.<br />
            Los colores hex son fijos — si necesitas otro esquema de colores, puedes pedirlo.
          </div>
        </div>
      )}

      {/* ── CONFIG ── */}
      {tab === "config" && (
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 9, maxWidth: 400 }}>
          {[
            ["title",         "Título",                   "text"],
            ["subtitle",      "Subtítulo",                "text"],
            ["cycleDuration", "Duración del ciclo (seg)", "number"],
            ["pixelsPerSec",  "Zoom (px/seg)",            "number"],
            ["rowHeight",     "Altura de fila (px)",      "number"],
          ].map(([k, l, t]) => (
            <label key={k} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: 8.5, fontWeight: 700, color: "#3F3E3B" }}>{l}</span>
              <input type={t} value={config[k]}
                onChange={e => setConfig(p => ({ ...p, [k]: t === "number" ? +e.target.value : e.target.value }))}
                style={{ padding: "4px 7px", border: "1px solid #D3D1C7", borderRadius: 4, fontSize: 10, fontFamily: "inherit" }} />
            </label>
          ))}
          <div style={{ fontSize: 8.5, color: "#5A5855", marginTop: 3, lineHeight: 1.7 }}>
            Actividades: {activities.length} · Dependencias: {deps.length} · Violaciones: {violations.length}<br />
            Wrap-around activo en: {activities.filter(a => a.start + a.duration > config.cycleDuration).map(a => a.label).join(", ") || "ninguna"}
          </div>
        </div>
      )}
    </div>
  );
}
