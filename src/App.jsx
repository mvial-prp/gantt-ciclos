import { useState, useCallback, useEffect, useRef } from "react";

// ─── Google Fonts: Lato ───────────────────────────────────────────────────────
const LATO_LINK = (() => {
  if (typeof document !== "undefined" && !document.getElementById("lato-font")) {
    const l = document.createElement("link");
    l.id = "lato-font"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";
    document.head.appendChild(l);
  }
  return null;
})();

const FF = "'Lato', 'Helvetica Neue', Arial, sans-serif";

// ─── Color utils ──────────────────────────────────────────────────────────────
// Given a hex bg color, compute a lighter fill and a darker border
function hexToRgb(hex) {
  const h = hex.replace("#","");
  const n = parseInt(h.length===3 ? h.split("").map(c=>c+c).join("") : h, 16);
  return [(n>>16)&255,(n>>8)&255,n&255];
}
function rgbToHex(r,g,b) {
  return "#"+[r,g,b].map(v=>Math.min(255,Math.max(0,Math.round(v))).toString(16).padStart(2,"0")).join("");
}
function derivePalette(bg) {
  const [r,g,b] = hexToRgb(bg);
  const light = rgbToHex(r+(255-r)*0.82, g+(255-g)*0.82, b+(255-b)*0.82);
  const border = rgbToHex(r*0.78, g*0.78, b*0.78);
  return { bg, light, border };
}

// ─── Default color definitions (bg hex + name) ───────────────────────────────
const DEFAULT_COLORS = {
  purple: { bg: "#5B4FD8", name: "Robot — movimiento principal" },
  teal:   { bg: "#0E8A6A", name: "Robot — depósito en destino"  },
  amber:  { bg: "#C27A10", name: "Tarimas"                      },
  coral:  { bg: "#C04B2A", name: "Celluveyor"                   },
  blue:   { bg: "#2563A8", name: "Etiquetadora"                 },
  gray:   { bg: "#5A5855", name: "Loop de cinta"                },
  slate:  { bg: "#3B5278", name: "En espera / ciclo siguiente"  },
};
const COLOR_KEYS = Object.keys(DEFAULT_COLORS);

function getPalette(colors) {
  const p = {};
  COLOR_KEYS.forEach(k => { p[k] = derivePalette(colors[k]?.bg || DEFAULT_COLORS[k].bg); });
  return p;
}

// ─── Dependency types ─────────────────────────────────────────────────────────
const DEP_TYPES = [
  { id: "start_after_end",   label: "empieza después que termina",            symbol: "A→|→B"   },
  { id: "start_together",    label: "empiezan juntos",                         symbol: "A|B"     },
  { id: "start_min_after",   label: "empieza mín. N seg después que termina", symbol: "A→N→B"   },
  { id: "start_before_end",  label: "empieza mín. N seg antes que termine",   symbol: "A…N|B"   },
  { id: "start_after_start", label: "empieza mín. N seg después de iniciar",  symbol: "|A→N→|B" },
  { id: "end_together",      label: "terminan juntos",                         symbol: "A|B|"    },
  { id: "end_after_end",     label: "termina mín. N seg después que termina", symbol: "A|→N→|B" },
];

// ─── Default model ────────────────────────────────────────────────────────────
const DEFAULT_ACTIVITIES = [
  { id: "r1movA",   label: "Mov A — R1",         row: 0, color: "purple", start: 0,  duration: 24 },
  { id: "r1movB",   label: "Mov B — R1",         row: 0, color: "teal",   start: 24, duration: 23 },
  { id: "mdDep",    label: "Nivel N depositado", row: 1, color: "purple", start: 0,  duration: 24 },
  { id: "mdEsp",    label: "Esperando desarme",  row: 1, color: "slate",  start: 24, duration: 6  },
  { id: "mdDesarm", label: "Entrando a desarme", row: 1, color: "coral",  start: 30, duration: 5  },
  { id: "mdNxt",    label: "Nivel N+1",          row: 1, color: "slate",  start: 47, duration: 24 },
  { id: "desarm",   label: "Desarme R2/R3",      row: 2, color: "coral",  start: 0,  duration: 30 },
  { id: "envLoop",  label: "Envía al loop",      row: 2, color: "coral",  start: 30, duration: 15 },
  { id: "rearm",    label: "Rearmado R2/R3",     row: 2, color: "coral",  start: 15, duration: 30 },
  { id: "salMesa",  label: "Sale a mesa toma",   row: 2, color: "coral",  start: 45, duration: 2  },
  { id: "loop",     label: "Cajas en loop",      row: 3, color: "gray",   start: 30, duration: 30 },
  { id: "etiq",     label: "Etiquetando",        row: 4, color: "blue",   start: 33, duration: 22 },
  { id: "mtLista",  label: "Nivel listo",        row: 5, color: "teal",   start: 0,  duration: 24 },
  { id: "mtVacia",  label: "Vacía",              row: 5, color: "slate",  start: 24, duration: 23 },
  { id: "mtNxt",    label: "Nivel N listo",      row: 5, color: "teal",   start: 47, duration: 24 },
];
const DEFAULT_ROWS = [
  { id: 0, label: "Robot R1"       },
  { id: 1, label: "Mesa depósito"  },
  { id: 2, label: "Desarme/Rearm." },
  { id: 3, label: "Loop"           },
  { id: 4, label: "Etiquetadora"   },
  { id: 5, label: "Mesa toma"      },
];
const DEFAULT_DEPS = [
  { id:"d1", from:"r1movA",  to:"r1movB",  type:"start_after_end", offset:0, nextCycle:false },
  { id:"d2", from:"desarm",  to:"envLoop", type:"start_after_end", offset:0, nextCycle:false },
  { id:"d3", from:"envLoop", to:"loop",    type:"start_together",  offset:0, nextCycle:false },
  { id:"d4", from:"rearm",   to:"salMesa", type:"start_after_end", offset:0, nextCycle:false },
  { id:"d5", from:"salMesa", to:"mtNxt",   type:"start_together",  offset:0, nextCycle:false },
  { id:"d6", from:"r1movB",  to:"r1movA",  type:"end_after_end",   offset:0, nextCycle:true  },
];
const DEFAULT_CONFIG = {
  cycleDuration:47, title:"Ciclo Robot R1 — Watts / Frutos del Maipo (régimen estacionario)",
  subtitle:"47 seg/nivel · Ecofrost/Pomuni · loop 15 seg · ~919 cj/h · ~10,9 h para 10.000 cajas",
  pixelsPerSec:11, rowHeight:44, visibleCycles:2,
};

// ─── Utilities ────────────────────────────────────────────────────────────────
function uid() { return Math.random().toString(36).slice(2,8); }

function getSegments(act, CD) {
  const end = act.start + act.duration;
  if (end <= CD) return [{ start:act.start, duration:act.duration, wrapped:false }];
  const segs = [];
  if (CD-act.start > 0) segs.push({ start:act.start, duration:CD-act.start, wrapped:false });
  if (end-CD > 0)       segs.push({ start:0, duration:end-CD, wrapped:true });
  return segs;
}

function checkDep(dep, activities, CD) {
  const from = activities.find(a=>a.id===dep.from);
  const to   = activities.find(a=>a.id===dep.to);
  if (!from||!to) return null;
  const fromEnd = from.start+from.duration;
  const toStart = dep.nextCycle ? to.start+CD : to.start;
  const toEnd   = dep.nextCycle ? to.start+to.duration+CD : to.start+to.duration;
  const n = dep.offset??0;
  switch(dep.type) {
    case "start_after_end":   return { ok:toStart>=fromEnd,        expected:fromEnd,         actual:toStart };
    case "start_together":    return { ok:toStart===from.start,    expected:from.start,      actual:toStart };
    case "start_min_after":   return { ok:toStart>=fromEnd+n,      expected:fromEnd+n,       actual:toStart };
    case "start_before_end":  return { ok:toStart<=fromEnd-n,      expected:`≤${fromEnd-n}`, actual:toStart };
    case "start_after_start": return { ok:toStart>=from.start+n,   expected:from.start+n,    actual:toStart };
    case "end_together":      return { ok:toEnd===fromEnd,          expected:fromEnd,         actual:toEnd   };
    case "end_after_end":     return { ok:toEnd>=fromEnd+n,         expected:fromEnd+n,       actual:toEnd   };
    default: return null;
  }
}

function exportState(state) {
  const blob = new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href=url; a.download="gantt-ciclos.json"; a.click();
  URL.revokeObjectURL(url);
}

// ─── Drag-to-reorder hook ─────────────────────────────────────────────────────
function useDragReorder(items, setItems) {
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
  const onDragStart = i => setDragIdx(i);
  const onDragOver  = i => { if (i!==dragIdx) setOverIdx(i); };
  const onDrop = i => {
    if (dragIdx===null||dragIdx===i) { setDragIdx(null);setOverIdx(null);return; }
    const next=[...items]; const [m]=next.splice(dragIdx,1); next.splice(i,0,m);
    setItems(next); setDragIdx(null); setOverIdx(null);
  };
  const onDragEnd = () => { setDragIdx(null);setOverIdx(null); };
  return { dragIdx, overIdx, onDragStart, onDragOver, onDrop, onDragEnd };
}

// ─── Small components ─────────────────────────────────────────────────────────
function IconBtn({onClick,children,danger,small,active}) {
  return (
    <button onClick={onClick} style={{
      padding:small?"1px 5px":"2px 8px", fontSize:10, border:"none", borderRadius:3,
      cursor:"pointer", fontFamily:FF,
      background:danger?"#FEE2E2":active?"#5B4FD8":"#EEECEA",
      color:danger?"#B91C1C":active?"#fff":"#3F3E3B",
    }}>{children}</button>
  );
}
function DragHandle() {
  return <span style={{cursor:"grab",color:"#B0ADA8",fontSize:13,lineHeight:1,userSelect:"none",paddingRight:2}} title="Arrastrar para reordenar">⠿</span>;
}
function drStyle(drag,i) {
  return { opacity:drag.dragIdx===i?0.4:1, background:drag.overIdx===i?"#D4F4EB":undefined, outline:drag.overIdx===i?"2px solid #0E8A6A":undefined, borderRadius:4, transition:"background 0.1s" };
}

// ─── ActivityBar ─────────────────────────────────────────────────────────────
function ActivityBar({act, rowY, PPS, RH, CD, cycleOffset, isSelected, onSelect, onStartDrag, ghost, palette}) {
  const col = palette[act.color] || palette.gray;
  const segs = getSegments(act, CD);
  const ox = cycleOffset*CD*PPS;
  const alpha = ghost ? 0.38 : 1;
  return segs.map((seg,si) => {
    const x=ox+seg.start*PPS, w=Math.max(seg.duration*PPS,2);
    return (
      <g key={`${si}-${cycleOffset}`} onClick={()=>!ghost&&onSelect(act.id)} style={{cursor:ghost?"default":"pointer"}}>
        {seg.wrapped&&<rect x={x} y={rowY+2} width={3} height={RH-4} fill={col.bg} opacity={0.9*alpha}/>}
        <rect x={x+(seg.wrapped?3:0)} y={rowY+2} width={Math.max(w-(seg.wrapped?3:0),1)} height={RH-4}
          fill={col.light} stroke={isSelected&&!ghost?"#1C1B18":col.border}
          strokeWidth={isSelected&&!ghost?2:1} strokeDasharray={seg.wrapped?"4 2":"none"}
          rx={3} opacity={(seg.wrapped?0.82:1)*alpha}/>
        <rect x={x+(seg.wrapped?3:0)} y={rowY+2} width={Math.max(w-(seg.wrapped?3:0),1)} height={4}
          fill={col.bg} rx={3} opacity={(seg.wrapped?0.7:1)*alpha}/>
        <rect x={x+(seg.wrapped?3:0)} y={rowY+4} width={Math.max(w-(seg.wrapped?3:0),1)} height={2}
          fill={col.bg} opacity={(seg.wrapped?0.7:1)*alpha}/>
        {/* Label with foreignObject for word-wrap */}
        {w > 18 && (
          <foreignObject x={x+(seg.wrapped?5:3)} y={rowY+6} width={Math.max(w-(seg.wrapped?10:8),4)} height={RH-10}>
            <div xmlns="http://www.w3.org/1999/xhtml" style={{
              fontSize:8, fontWeight:700, color:col.border, fontFamily:FF,
              lineHeight:1.2, overflow:"hidden", wordBreak:"break-word",
              pointerEvents:"none", opacity:alpha,
            }}>
              {seg.wrapped?"↩ ":""}{act.label}
            </div>
          </foreignObject>
        )}
        {w>28&&(
          <text x={x+w-3} y={rowY+RH-4} textAnchor="end"
            style={{fontSize:6.5,fill:col.border,opacity:0.5*alpha,fontFamily:FF,pointerEvents:"none"}}>
            {seg.wrapped?`0+${seg.duration}`:`${act.start}+${act.duration}`}
          </text>
        )}
        {!seg.wrapped&&!ghost&&cycleOffset===0&&(
          <rect x={x} y={rowY+2} width={Math.max(w-8,1)} height={RH-4}
            fill="transparent" style={{cursor:"grab"}}
            onMouseDown={e=>onStartDrag(e,act.id,"move")}/>
        )}
        {si===segs.length-1&&!ghost&&cycleOffset===0&&(
          <rect x={x+w-7} y={rowY+2} width={7} height={RH-4}
            fill={col.bg} opacity={0.28} rx={2} style={{cursor:"ew-resize"}}
            onMouseDown={e=>onStartDrag(e,act.id,"resize")}/>
        )}
      </g>
    );
  });
}

// ─── DepArrow ─────────────────────────────────────────────────────────────────
function DepArrow({dep, activities, rows, PPS, RH, CD}) {
  const fromA=activities.find(a=>a.id===dep.from), toA=activities.find(a=>a.id===dep.to);
  if(!fromA||!toA) return null;
  const fri=rows.findIndex(r=>r.id===fromA.row), tri=rows.findIndex(r=>r.id===toA.row);
  if(fri<0||tri<0) return null;
  const ok=dep.result?.ok, color=ok===false?"#C04B2A":"#0E8A6A";
  const ROWH=RH+4, fromEnd=fromA.start+fromA.duration, toEnd=toA.start+toA.duration, nc=dep.nextCycle?CD:0;
  let x1,x2;
  switch(dep.type){
    case"start_after_end":case"start_min_after": x1=(fromEnd%CD)*PPS;x2=toA.start*PPS+nc*PPS;break;
    case"start_together":case"start_before_end":case"start_after_start": x1=fromA.start*PPS;x2=toA.start*PPS+nc*PPS;break;
    case"end_together":case"end_after_end": x1=(fromEnd%CD)*PPS;x2=(toEnd%CD)*PPS+nc*PPS;break;
    default: x1=(fromEnd%CD)*PPS;x2=toA.start*PPS+nc*PPS;
  }
  const y1=50+fri*ROWH+RH/2, y2=50+tri*ROWH+RH/2, cx=(x1+x2)/2;
  const path=Math.abs(x1-x2)<2?`M${x1} ${y1} L${x2} ${y2}`:`M${x1} ${y1} C${cx} ${y1} ${cx} ${y2} ${x2} ${y2}`;
  const aid=`arr-${dep.id}`;
  return (
    <g>
      <defs><marker id={aid} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={color}/>
      </marker></defs>
      <path d={path} fill="none" stroke={color} strokeWidth={ok===false?1.8:1.2}
        strokeDasharray={ok===false?"4 2":"none"} markerEnd={`url(#${aid})`} opacity={dep.nextCycle?0.5:0.72}/>
      {dep.nextCycle&&<text x={cx} y={Math.min(y1,y2)-4} textAnchor="middle"
        style={{fontSize:7.5,fill:color,fontFamily:FF,opacity:0.8}}>+1</text>}
    </g>
  );
}

// ─── RowLabel (SVG foreignObject for word-wrap) ───────────────────────────────
function RowLabel({row, y, LW, RH}) {
  return (
    <g>
      <rect x={0} y={y} width={LW-4} height={RH} fill="#EEECEA" rx={2}/>
      <foreignObject x={4} y={y+2} width={LW-10} height={RH-4}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{
          fontSize:9, fontWeight:700, color:"#1C1B18", fontFamily:FF,
          lineHeight:1.25, overflow:"hidden", wordBreak:"break-word", height:"100%",
          display:"flex", alignItems:"center",
        }}>{row.label}</div>
      </foreignObject>
    </g>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function GanttCiclico() {
  const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);
  const [rows, setRows]             = useState(DEFAULT_ROWS);
  const [deps, setDeps]             = useState(DEFAULT_DEPS);
  const [config, setConfig]         = useState(DEFAULT_CONFIG);
  // colors: { key: { bg, name } }
  const [colors, setColors]         = useState(DEFAULT_COLORS);
  const [selected, setSelected]     = useState(null);
  const [tab, setTab]               = useState("gantt");
  const [dragState, setDragState]   = useState(null);
  const fileInputRef                = useRef(null);

  const palette = getPalette(colors);

  const PPS  = config.pixelsPerSec;
  const RH   = config.rowHeight;
  const ROWH = RH+4;
  const LW   = 130;
  const CD   = config.cycleDuration;
  const NC   = Math.max(1,Math.min(5,config.visibleCycles??1));
  const totalW = LW+CD*PPS*NC+24;
  const totalH = rows.length*ROWH+58;

  // Active colors = those with at least one activity assigned
  const activeColorKeys = COLOR_KEYS.filter(k => activities.some(a=>a.color===k));

  const rowDrag = useDragReorder(rows, setRows);
  const actDrag = useDragReorder(activities, setActivities);
  const depDrag = useDragReorder(deps, setDeps);

  // Timeline drag
  const startDrag = useCallback((e,actId,mode)=>{
    e.preventDefault();e.stopPropagation();
    const act=activities.find(a=>a.id===actId);
    setDragState({actId,mode,startX:e.clientX,origStart:act.start,origDur:act.duration});
  },[activities]);
  useEffect(()=>{
    if(!dragState) return;
    const onMove=e=>{
      const dSec=Math.round((e.clientX-dragState.startX)/PPS);
      setActivities(prev=>prev.map(a=>{
        if(a.id!==dragState.actId) return a;
        if(dragState.mode==="move"){const raw=dragState.origStart+dSec;return{...a,start:((raw%CD)+CD)%CD};}
        return{...a,duration:Math.max(1,dragState.origDur+dSec)};
      }));
    };
    const onUp=()=>setDragState(null);
    window.addEventListener("mousemove",onMove);window.addEventListener("mouseup",onUp);
    return()=>{window.removeEventListener("mousemove",onMove);window.removeEventListener("mouseup",onUp);};
  },[dragState,PPS,CD]);

  // Save / Load
  const handleSave = ()=>exportState({activities,rows,deps,config,colors,version:3});
  const handleLoad = e=>{
    const file=e.target.files?.[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      try{
        const s=JSON.parse(ev.target.result);
        if(s.activities) setActivities(s.activities);
        if(s.rows)       setRows(s.rows);
        if(s.deps)       setDeps(s.deps.map(d=>({nextCycle:false,...d})));
        if(s.config)     setConfig({visibleCycles:2,...s.config});
        // Support both old (colorNames + COLOR_PALETTE) and new (colors) format
        if(s.colors) {
          setColors(s.colors);
        } else if(s.colorNames) {
          const merged={};
          COLOR_KEYS.forEach(k=>{merged[k]={bg:DEFAULT_COLORS[k].bg,name:s.colorNames[k]||DEFAULT_COLORS[k].name};});
          setColors(merged);
        }
        setSelected(null);
      }catch{alert("Archivo JSON inválido");}
    };
    reader.readAsText(file);e.target.value="";
  };

  // Sort
  const sortActivities = key=>{
    setActivities(prev=>[...prev].sort((a,b)=>
      key==="start"?a.start-b.start:a.row!==b.row?a.row-b.row:a.start-b.start));
  };
  const autoSortDeps = ()=>{
    setDeps(prev=>[...prev].sort((a,b)=>{
      const fa=activities.find(x=>x.id===a.from)?.label??"";
      const fb=activities.find(x=>x.id===b.from)?.label??"";
      return fa.localeCompare(fb)||(activities.find(x=>x.id===a.to)?.label??"").localeCompare(activities.find(x=>x.id===b.to)?.label??"");
    }));
  };

  const updColor = (k,field,val)=>setColors(p=>({...p,[k]:{...p[k],[field]:val}}));

  const depResults = deps.map(d=>({...d,result:checkDep(d,activities,CD)}));
  const violations = depResults.filter(d=>d.result&&!d.result.ok);

  const addActivity=()=>{const id="act_"+uid();setActivities(p=>[...p,{id,label:"Nueva",row:rows[0]?.id??0,color:activeColorKeys[0]||"gray",start:0,duration:10}]);setSelected(id);setTab("activities");};
  const delActivity=id=>{setActivities(p=>p.filter(a=>a.id!==id));setDeps(p=>p.filter(d=>d.from!==id&&d.to!==id));if(selected===id)setSelected(null);};
  const updAct=(id,k,v)=>setActivities(p=>p.map(a=>a.id===id?{...a,[k]:v}:a));
  const addDep=()=>{if(activities.length<2)return;setDeps(p=>[...p,{id:"dep_"+uid(),from:activities[0].id,to:activities[1].id,type:"start_after_end",offset:0,nextCycle:false}]);setTab("deps");};
  const updDep=(id,k,v)=>setDeps(p=>p.map(d=>d.id===id?{...d,[k]:v}:d));
  const addRow=()=>{const maxId=Math.max(...rows.map(r=>r.id),-1)+1;setRows(p=>[...p,{id:maxId,label:"Nueva fila"}]);};

  const step=CD>120?10:5;
  const ticks=Array.from({length:Math.floor(CD*NC/step)+1},(_,i)=>i*step);
  const maxWrap=Math.max(0,...activities.map(a=>Math.max(0,a.start+a.duration-CD)));
  const TABS=[["gantt","📊 Diagrama"],["activities","⚙ Actividades"],["deps","🔗 Dependencias"],["legend","🎨 Leyenda"],["config","⚙ Config"]];

  return (
    <div style={{fontFamily:FF,background:"#F5F3EE",minHeight:"100vh"}}>

      {/* ── Header ── */}
      <div style={{background:"#1C1B18",padding:"9px 16px",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <div>
          <div style={{color:"#F5F3EE",fontSize:13,fontWeight:900,letterSpacing:0.3}}>GANTT CÍCLICO</div>
          <div style={{color:"#7A7870",fontSize:8.5,marginTop:1}}>ciclos industriales · dependencias · multi-ciclo · guardar/cargar</div>
        </div>
        <div style={{flex:1}}/>
        {violations.length>0&&<div style={{background:"#7F1D1D",color:"#FEE2E2",padding:"3px 9px",borderRadius:4,fontSize:9.5,fontWeight:700}}>⚠ {violations.length} violación{violations.length>1?"es":""}</div>}
        <button onClick={handleSave} style={{background:"#3B5278",color:"#fff",border:"none",borderRadius:4,padding:"4px 10px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:FF}}>⬇ Guardar</button>
        <button onClick={()=>fileInputRef.current?.click()} style={{background:"#5A5855",color:"#fff",border:"none",borderRadius:4,padding:"4px 10px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:FF}}>⬆ Cargar</button>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleLoad} style={{display:"none"}}/>
        <button onClick={addActivity} style={{background:"#5B4FD8",color:"#fff",border:"none",borderRadius:4,padding:"4px 10px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:FF}}>+ Actividad</button>
        <button onClick={addDep} style={{background:"#0E8A6A",color:"#fff",border:"none",borderRadius:4,padding:"4px 10px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:FF}}>+ Dep.</button>
      </div>

      {/* ── Tabs ── */}
      <div style={{background:"#E8E6DF",display:"flex",borderBottom:"2px solid #D3D1C7"}}>
        {TABS.map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{padding:"6px 14px",fontSize:10,fontWeight:700,border:"none",cursor:"pointer",fontFamily:FF,
            background:tab===k?"#F5F3EE":"transparent",color:tab===k?"#1C1B18":"#5A5855",
            borderBottom:tab===k?"2px solid #5B4FD8":"2px solid transparent",marginBottom:-2}}>{l}</button>
        ))}
      </div>

      {/* ══ GANTT ══ */}
      {tab==="gantt"&&(
        <div style={{padding:"12px 16px"}}>
          <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:7}}>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:700,color:"#1C1B18"}}>{config.title}</div>
              <div style={{fontSize:9,color:"#5A5855",marginTop:1}}>{config.subtitle}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:5,fontSize:9,color:"#5A5855"}}>
              ciclos:
              {[1,2,3].map(n=><IconBtn key={n} active={NC===n} small onClick={()=>setConfig(p=>({...p,visibleCycles:n}))}>{n}</IconBtn>)}
            </div>
          </div>

          {violations.length>0&&(
            <div style={{background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:5,padding:"6px 10px",marginBottom:8,fontSize:8.5}}>
              <strong style={{color:"#991B1B"}}>Dependencias violadas: </strong>
              {violations.map(v=>{
                const fa=activities.find(a=>a.id===v.from),ta=activities.find(a=>a.id===v.to),dt=DEP_TYPES.find(d=>d.id===v.type);
                return <span key={v.id} style={{color:"#B91C1C"}}> [{fa?.label}] {dt?.label} [{ta?.label}] esp:{v.result?.expected}s act:{v.result?.actual}s ·</span>;
              })}
            </div>
          )}

          <div style={{overflowX:"auto",border:"1px solid #D3D1C7",borderRadius:6,background:"#fff"}}>
            <svg width={totalW} height={totalH} style={{display:"block",userSelect:"none"}}>
              {rows.map((row,ri)=>(
                <rect key={row.id} x={LW} y={48+ri*ROWH} width={CD*PPS*NC} height={RH} fill={ri%2===0?"#FAFAF8":"#F5F3EE"}/>
              ))}
              {Array.from({length:NC},(_,ci)=>ci).map(ci=>ci>0&&(
                <rect key={ci} x={LW+ci*CD*PPS} y={44} width={CD*PPS} height={totalH-44} fill={ci%2===0?"transparent":"#F5F3EE"} opacity={0.4}/>
              ))}
              {maxWrap>0&&<rect x={LW} y={44} width={maxWrap*PPS} height={totalH-44} fill="#FEF2F2" opacity={0.4}/>}
              {ticks.map(t=>(
                <g key={t}>
                  <line x1={LW+t*PPS} y1={38} x2={LW+t*PPS} y2={totalH} stroke={t%(step*2)===0?"#C4C2BA":"#EBEBEA"} strokeWidth={t%(step*2)===0?1:0.5}/>
                  <text x={LW+t*PPS} y={30} textAnchor="middle" style={{fontSize:8,fill:"#7A7870",fontFamily:FF}}>{t%CD}s</text>
                </g>
              ))}
              {Array.from({length:NC+1},(_,ci)=>ci).map(ci=>(
                <g key={ci}>
                  <line x1={LW+ci*CD*PPS} y1={34} x2={LW+ci*CD*PPS} y2={totalH} stroke="#C04B2A" strokeWidth={ci===0||ci===NC?2:1.5} strokeDasharray={ci===0||ci===NC?"5 3":"3 3"}/>
                  {ci<NC&&<text x={LW+ci*CD*PPS+4} y={28} style={{fontSize:8,fill:"#C04B2A",fontWeight:700,fontFamily:FF}}>ciclo {ci+1}</text>}
                </g>
              ))}
              {rows.map((row,ri)=>(
                <RowLabel key={row.id} row={row} y={48+ri*ROWH} LW={LW} RH={RH}/>
              ))}
              <g transform={`translate(${LW},0)`}>
                {Array.from({length:NC-1},(_,ci)=>ci+1).map(ci=>
                  activities.map(act=>{
                    const ri=rows.findIndex(r=>r.id===act.row);if(ri<0)return null;
                    return <ActivityBar key={`${act.id}-c${ci}`} act={act} rowY={48+ri*ROWH} PPS={PPS} RH={RH} CD={CD} cycleOffset={ci} isSelected={false} onSelect={()=>{}} onStartDrag={()=>{}} ghost={true} palette={palette}/>;
                  })
                )}
                {activities.map(act=>{
                  const ri=rows.findIndex(r=>r.id===act.row);if(ri<0)return null;
                  return <ActivityBar key={act.id} act={act} rowY={48+ri*ROWH} PPS={PPS} RH={RH} CD={CD} cycleOffset={0} isSelected={selected===act.id} onSelect={id=>setSelected(id===selected?null:id)} onStartDrag={startDrag} ghost={false} palette={palette}/>;
                })}
                {depResults.map(dep=><DepArrow key={dep.id} dep={dep} activities={activities} rows={rows} PPS={PPS} RH={RH} CD={CD}/>)}
              </g>
              <line x1={0} y1={40} x2={totalW} y2={40} stroke="#D3D1C7" strokeWidth={1}/>
            </svg>
          </div>

          {/* Legend — only active colors */}
          <div style={{display:"flex",gap:12,marginTop:9,flexWrap:"wrap",alignItems:"center"}}>
            {activeColorKeys.map(k=>(
              <div key={k} style={{display:"flex",alignItems:"center",gap:5,fontSize:9,color:"#3F3E3B"}}>
                <div style={{width:22,height:8,background:palette[k].bg,borderRadius:2}}/>
                {colors[k]?.name||k}
              </div>
            ))}
            {maxWrap>0&&<div style={{fontSize:9,color:"#C04B2A",display:"flex",alignItems:"center",gap:4}}><div style={{width:14,borderTop:"2px dashed #C04B2A"}}/> ↩ wrap-around</div>}
            <div style={{fontSize:9,color:"#C04B2A",display:"flex",alignItems:"center",gap:4}}><span>+1</span> dep. ciclo siguiente</div>
            <div style={{fontSize:8.5,color:"#7A7870"}}>↔ arrastrar · borde der. = redimensionar</div>
          </div>
        </div>
      )}

      {/* ══ ACTIVITIES ══ */}
      {tab==="activities"&&(
        <div style={{padding:"12px 16px"}}>
          <div style={{display:"flex",gap:7,marginBottom:10,alignItems:"center",flexWrap:"wrap"}}>
            <button onClick={addActivity} style={{background:"#5B4FD8",color:"#fff",border:"none",borderRadius:4,padding:"3px 10px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:FF}}>+ Actividad</button>
            <button onClick={addRow}      style={{background:"#3B5278",color:"#fff",border:"none",borderRadius:4,padding:"3px 10px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:FF}}>+ Fila</button>
            <div style={{width:1,height:18,background:"#D3D1C7"}}/>
            <span style={{fontSize:9,color:"#7A7870"}}>ordenar:</span>
            <IconBtn small onClick={()=>sortActivities("start")}>por inicio</IconBtn>
            <IconBtn small onClick={()=>sortActivities("row_start")}>por fila+inicio</IconBtn>
          </div>

          <div style={{fontSize:8.5,fontWeight:700,color:"#5A5855",letterSpacing:1,marginBottom:5}}>FILAS <span style={{fontSize:7.5,fontWeight:400,color:"#9B9890"}}>— arrastrar ⠿</span></div>
          <div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:14}}>
            {rows.map((row,i)=>(
              <div key={row.id} draggable onDragStart={()=>rowDrag.onDragStart(i)} onDragOver={e=>{e.preventDefault();rowDrag.onDragOver(i);}} onDrop={()=>rowDrag.onDrop(i)} onDragEnd={rowDrag.onDragEnd}
                style={{display:"flex",gap:5,alignItems:"center",background:"#EEECEA",borderRadius:4,padding:"4px 7px",...drStyle(rowDrag,i)}}>
                <DragHandle/>
                <span style={{fontSize:8.5,color:"#7A7870",minWidth:16}}>#{row.id}</span>
                <input value={row.label} onChange={e=>setRows(p=>p.map(r=>r.id===row.id?{...r,label:e.target.value}:r))}
                  style={{flex:1,fontSize:10,padding:"2px 5px",border:"1px solid #D3D1C7",borderRadius:3,fontFamily:FF}}/>
                <IconBtn danger small onClick={()=>setRows(p=>p.filter(r=>r.id!==row.id))}>✕</IconBtn>
              </div>
            ))}
          </div>

          <div style={{fontSize:8.5,fontWeight:700,color:"#5A5855",letterSpacing:1,marginBottom:5}}>ACTIVIDADES <span style={{fontSize:7.5,fontWeight:400,color:"#9B9890"}}>— arrastrar ⠿</span></div>
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            {activities.map((act,i)=>{
              const col=palette[act.color]||palette.gray, open=selected===act.id;
              const end=act.start+act.duration, wraps=end>CD;
              return (
                <div key={act.id} draggable={!open} onDragStart={()=>actDrag.onDragStart(i)} onDragOver={e=>{e.preventDefault();actDrag.onDragOver(i);}} onDrop={()=>actDrag.onDrop(i)} onDragEnd={actDrag.onDragEnd}
                  style={{border:`1px solid ${open?col.border:"#D3D1C7"}`,borderRadius:5,overflow:"hidden",...drStyle(actDrag,i)}}>
                  <div style={{display:"flex",gap:6,alignItems:"center",padding:"4px 8px",background:open?col.light:"#FAFAF8",cursor:"pointer"}} onClick={()=>setSelected(open?null:act.id)}>
                    <DragHandle/>
                    <div style={{width:9,height:9,background:col.bg,borderRadius:2,flexShrink:0}}/>
                    <span style={{flex:1,fontSize:10,fontWeight:700}}>{act.label}</span>
                    <span style={{fontSize:8,color:"#5A5855"}}>fila {act.row} · t={act.start}..{end%CD}{wraps?"(+wrap)":""}</span>
                    {wraps&&<span style={{fontSize:8,color:"#C04B2A",fontWeight:700}}>↩{end-CD}s</span>}
                    <IconBtn danger small onClick={e=>{e.stopPropagation();delActivity(act.id);}}>✕</IconBtn>
                  </div>
                  {open&&(
                    <div style={{padding:"7px 10px",background:"#fff",display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                      <label style={{display:"flex",flexDirection:"column",gap:2,gridColumn:"1/-1"}}>
                        <span style={{fontSize:8,color:"#5A5855"}}>Etiqueta</span>
                        <input value={act.label} onChange={e=>updAct(act.id,"label",e.target.value)}
                          style={{padding:"2px 5px",border:"1px solid #D3D1C7",borderRadius:3,fontSize:10,fontFamily:FF}}/>
                      </label>
                      <label style={{display:"flex",flexDirection:"column",gap:2}}>
                        <span style={{fontSize:8,color:"#5A5855"}}>Inicio (0..{CD-1})</span>
                        <input type="number" min={0} max={CD-1} value={act.start} onChange={e=>updAct(act.id,"start",Math.min(CD-1,Math.max(0,+e.target.value)))}
                          style={{padding:"2px 5px",border:"1px solid #D3D1C7",borderRadius:3,fontSize:10,fontFamily:FF}}/>
                      </label>
                      <label style={{display:"flex",flexDirection:"column",gap:2}}>
                        <span style={{fontSize:8,color:"#5A5855"}}>Duración{wraps?` ↩+${end-CD}s`:""}</span>
                        <input type="number" min={1} value={act.duration} onChange={e=>updAct(act.id,"duration",Math.max(1,+e.target.value))}
                          style={{padding:"2px 5px",borderRadius:3,fontSize:10,fontFamily:FF,border:`1px solid ${wraps?"#FCA5A5":"#D3D1C7"}`}}/>
                      </label>
                      <label style={{display:"flex",flexDirection:"column",gap:2}}>
                        <span style={{fontSize:8,color:"#5A5855"}}>Fila</span>
                        <select value={act.row} onChange={e=>updAct(act.id,"row",+e.target.value)}
                          style={{padding:"2px 5px",border:"1px solid #D3D1C7",borderRadius:3,fontSize:10,fontFamily:FF}}>
                          {rows.map(r=><option key={r.id} value={r.id}>{r.id}: {r.label}</option>)}
                        </select>
                      </label>
                      <label style={{display:"flex",flexDirection:"column",gap:2}}>
                        <span style={{fontSize:8,color:"#5A5855"}}>Color</span>
                        <select value={act.color} onChange={e=>updAct(act.id,"color",e.target.value)}
                          style={{padding:"2px 5px",border:"1px solid #D3D1C7",borderRadius:3,fontSize:10,fontFamily:FF}}>
                          {COLOR_KEYS.map(c=><option key={c} value={c}>{colors[c]?.name||c}</option>)}
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
      {tab==="deps"&&(
        <div style={{padding:"12px 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,gap:8,flexWrap:"wrap"}}>
            <div style={{fontSize:8.5,fontWeight:700,color:"#5A5855",letterSpacing:1}}>DEPENDENCIAS <span style={{fontSize:7.5,fontWeight:400,color:"#9B9890"}}>— arrastrar ⠿</span></div>
            <div style={{display:"flex",gap:6}}>
              <button onClick={autoSortDeps} style={{background:"#5A5855",color:"#fff",border:"none",borderRadius:4,padding:"3px 9px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:FF}}>↕ Auto-ordenar</button>
              <button onClick={addDep} style={{background:"#0E8A6A",color:"#fff",border:"none",borderRadius:4,padding:"3px 9px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:FF}}>+ Nueva</button>
            </div>
          </div>
          <div style={{background:"#EEECEA",borderRadius:5,padding:"7px 10px",marginBottom:10}}>
            <div style={{fontSize:8.5,fontWeight:700,color:"#5A5855",marginBottom:4}}>TIPOS</div>
            {DEP_TYPES.map(d=>(
              <div key={d.id} style={{display:"flex",gap:8,fontSize:8.5,marginBottom:2}}>
                <code style={{color:"#5B4FD8",minWidth:68,fontFamily:FF}}>{d.symbol}</code>
                <span style={{fontWeight:700}}>{d.label}</span>
              </div>
            ))}
            <div style={{marginTop:6,fontSize:8,color:"#5A5855",borderTop:"1px solid #D3D1C7",paddingTop:5}}>
              <strong>+1 ciclo:</strong> marca cuando B pertenece al período siguiente. Resuelve falsas violaciones en dependencias que cruzan el límite del ciclo.
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {depResults.map((dep,i)=>{
              const ok=dep.result?.ok;
              const needsN=["start_min_after","start_before_end","start_after_start","end_after_end"].includes(dep.type);
              return (
                <div key={dep.id} draggable onDragStart={()=>depDrag.onDragStart(i)} onDragOver={e=>{e.preventDefault();depDrag.onDragOver(i);}} onDrop={()=>depDrag.onDrop(i)} onDragEnd={depDrag.onDragEnd}
                  style={{border:`1px solid ${ok===false?"#FCA5A5":ok===true?"#86EFAC":"#D3D1C7"}`,borderRadius:5,padding:"6px 8px",background:ok===false?"#FEF2F2":"#FAFAF8",...drStyle(depDrag,i)}}>
                  <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
                    <DragHandle/>
                    <span style={{fontSize:11,fontWeight:700,minWidth:12,color:ok===false?"#B91C1C":ok===true?"#166534":"#aaa"}}>{ok===false?"✗":ok===true?"✓":"?"}</span>
                    <select value={dep.from} onChange={e=>updDep(dep.id,"from",e.target.value)} style={{padding:"2px 4px",border:"1px solid #D3D1C7",borderRadius:3,fontSize:9,fontFamily:FF}}>
                      {activities.map(a=><option key={a.id} value={a.id}>{a.label}</option>)}
                    </select>
                    <select value={dep.type} onChange={e=>updDep(dep.id,"type",e.target.value)} style={{padding:"2px 4px",border:"1px solid #D3D1C7",borderRadius:3,fontSize:9,fontFamily:FF,flex:1}}>
                      {DEP_TYPES.map(d=><option key={d.id} value={d.id}>{d.label}</option>)}
                    </select>
                    <select value={dep.to} onChange={e=>updDep(dep.id,"to",e.target.value)} style={{padding:"2px 4px",border:"1px solid #D3D1C7",borderRadius:3,fontSize:9,fontFamily:FF}}>
                      {activities.map(a=><option key={a.id} value={a.id}>{a.label}</option>)}
                    </select>
                    {needsN&&<label style={{display:"flex",gap:3,alignItems:"center",fontSize:9}}>N=<input type="number" min={0} value={dep.offset??0} onChange={e=>updDep(dep.id,"offset",+e.target.value)} style={{width:34,padding:"1px 4px",border:"1px solid #D3D1C7",borderRadius:3,fontSize:9,fontFamily:FF}}/>s</label>}
                    <label style={{display:"flex",gap:3,alignItems:"center",fontSize:8.5,cursor:"pointer",background:dep.nextCycle?"#EAE8FC":"transparent",border:"1px solid",borderColor:dep.nextCycle?"#4338CA":"#D3D1C7",borderRadius:3,padding:"1px 5px"}}>
                      <input type="checkbox" checked={!!dep.nextCycle} onChange={e=>updDep(dep.id,"nextCycle",e.target.checked)} style={{margin:0}}/>
                      <span style={{color:dep.nextCycle?"#4338CA":"#5A5855",fontWeight:dep.nextCycle?700:400}}>+1 ciclo</span>
                    </label>
                    <IconBtn danger small onClick={()=>setDeps(p=>p.filter(d=>d.id!==dep.id))}>✕</IconBtn>
                  </div>
                  {dep.result&&!dep.result.ok&&<div style={{fontSize:8,color:"#B91C1C",marginTop:3}}>Esperado: {dep.result.expected}s · Actual: {dep.result.actual}s · Δ={dep.result.actual-Number(dep.result.expected)}s{!dep.nextCycle&&" — ¿querías marcar '+1 ciclo'?"}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══ LEGEND ══ */}
      {tab==="legend"&&(
        <div style={{padding:"12px 16px",maxWidth:540}}>
          <div style={{fontSize:8.5,fontWeight:700,color:"#5A5855",letterSpacing:1,marginBottom:4}}>CATEGORÍAS DE COLOR</div>
          <div style={{fontSize:8,color:"#7A7870",marginBottom:10}}>
            Solo se muestran las categorías con actividades asignadas. Edita nombre y color libremente — los cambios se reflejan inmediatamente en el diagrama y la leyenda.
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {COLOR_KEYS.map(k=>{
              const count=activities.filter(a=>a.color===k).length;
              const col=palette[k];
              if(count===0) return null; // auto-hide unused
              return (
                <div key={k} style={{display:"flex",gap:9,alignItems:"center",background:col.light,border:`1px solid ${col.border}`,borderRadius:6,padding:"7px 10px"}}>
                  {/* Color picker */}
                  <div style={{position:"relative",flexShrink:0}}>
                    <div style={{width:32,height:22,background:col.bg,borderRadius:4,border:`2px solid ${col.border}`,cursor:"pointer",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <input type="color" value={colors[k]?.bg||DEFAULT_COLORS[k].bg}
                        onChange={e=>updColor(k,"bg",e.target.value)}
                        style={{opacity:0,position:"absolute",inset:0,width:"100%",height:"100%",cursor:"pointer",border:"none"}}
                        title="Cambiar color"/>
                      <span style={{fontSize:8,color:"#fff",pointerEvents:"none",textShadow:"0 1px 2px rgba(0,0,0,0.5)"}}>🎨</span>
                    </div>
                  </div>
                  {/* Name input */}
                  <input value={colors[k]?.name||""} onChange={e=>updColor(k,"name",e.target.value)}
                    style={{flex:1,fontSize:10,fontWeight:700,padding:"3px 7px",border:`1px solid ${col.border}`,borderRadius:4,background:"#fff",fontFamily:FF,color:col.border}}/>
                  <span style={{fontSize:8,color:col.border,minWidth:44,textAlign:"right"}}>{count} act.</span>
                </div>
              );
            })}
          </div>
          <div style={{marginTop:10,fontSize:8,color:"#7A7870",lineHeight:1.6}}>
            Las categorías sin actividades se ocultan automáticamente aquí y en la leyenda del diagrama.<br/>
            Para ver todas las categorías disponibles al asignar una actividad, usa el selector de color en la pestaña Actividades.
          </div>
        </div>
      )}

      {/* ══ CONFIG ══ */}
      {tab==="config"&&(
        <div style={{padding:"12px 16px",display:"flex",flexDirection:"column",gap:9,maxWidth:400}}>
          {[["title","Título","text"],["subtitle","Subtítulo","text"],["cycleDuration","Duración del ciclo (seg)","number"],["pixelsPerSec","Zoom (px/seg)","number"],["rowHeight","Altura de fila (px)","number"],["visibleCycles","Ciclos visibles (1-5)","number"]].map(([k,l,t])=>(
            <label key={k} style={{display:"flex",flexDirection:"column",gap:3}}>
              <span style={{fontSize:8.5,fontWeight:700,color:"#3F3E3B"}}>{l}</span>
              <input type={t} value={config[k]??""} min={t==="number"?1:undefined}
                onChange={e=>setConfig(p=>({...p,[k]:t==="number"?+e.target.value:e.target.value}))}
                style={{padding:"4px 7px",border:"1px solid #D3D1C7",borderRadius:4,fontSize:10,fontFamily:FF}}/>
            </label>
          ))}
          <div style={{fontSize:8.5,color:"#5A5855",marginTop:3,lineHeight:1.7}}>
            Actividades: {activities.length} · Dependencias: {deps.length} · Violaciones: {violations.length}<br/>
            Categorías activas: {activeColorKeys.length} de {COLOR_KEYS.length}<br/>
            Deps +1 ciclo: {deps.filter(d=>d.nextCycle).length}
          </div>
        </div>
      )}
    </div>
  );
}
