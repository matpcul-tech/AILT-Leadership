import { useEffect, useMemo, useState } from "react";
import { MODULES } from "./curriculum.js";

const G = "#c8a434", D = "#07090d", D2 = "#0c1018", D3 = "#151b26", T = "#9ca3b4", L = "#e4ddd0";
const KEY = "ailt-program-v1";

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || { done: {}, notes: {}, picks: {} }; }
  catch { return { done: {}, notes: {}, picks: {} }; }
}

export function Program({ onBack }) {
  const [store, setStore] = useState(load);
  const [modId, setModId] = useState(MODULES[0].id);
  const [lesId, setLesId] = useState(MODULES[0].lessons[0].id);
  const [pick, setPick] = useState(null);
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(store)); }, [store]);

  const mod = MODULES.find(m => m.id === modId);
  const les = mod.lessons.find(l => l.id === lesId) || mod.lessons[0];
  const all = MODULES.flatMap(m => m.lessons);
  const doneN = all.filter(l => store.done[l.id]).length;

  useEffect(() => {
    setNote(store.notes[les.id] || "");
    setPick(store.picks[les.id] ?? null);
    setMsg("");
  }, [les.id]);

  const open = (m, l) => { setModId(m); setLesId(l); };

  const save = () => {
    const text = note.trim();
    if (text.length < 24) { setMsg("Write a little more. A plan you can use is longer than a slogan."); return; }
    if (pick !== les.check.answer) { setMsg("Check the question again. The point is the distinction, not the wording."); return; }
    const next = { ...store, notes: { ...store.notes, [les.id]: text }, picks: { ...store.picks, [les.id]: pick }, done: { ...store.done, [les.id]: true } };
    setStore(next);
    setMsg("Saved. This week counts.");
    const i = all.findIndex(l => l.id === les.id);
    const nxt = all[i + 1];
    if (nxt) {
      const parent = MODULES.find(m => m.lessons.some(l => l.id === nxt.id));
      setTimeout(() => open(parent.id, nxt.id), 500);
    }
  };

  const plan = useMemo(() => all.map(l => store.notes[l.id]).filter(Boolean), [store, all]);

  return (
    <div style={{ height: "100vh", background: D, color: L, fontFamily: "'Outfit',sans-serif", display: "flex", flexDirection: "column" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 20px", borderBottom: `1px solid ${D3}`, flexShrink: 0 }}>
        <button onClick={onBack} style={btnGhost}>← Site</button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: G, fontWeight: 700 }}>12-WEEK PROGRAM</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22 }}>AILT Leadership Course</div>
        </div>
        <div style={{ fontSize: 13, color: T }}>{doneN}/{all.length} done</div>
      </header>
      <div className="prog-shell" style={{ flex: 1, display: "grid", gridTemplateColumns: "280px 1fr", minHeight: 0 }}>
        <aside style={{ borderRight: `1px solid ${D3}`, overflowY: "auto", padding: 16 }}>
          <div style={{ height: 6, background: D3, borderRadius: 99, marginBottom: 16 }}>
            <div style={{ width: `${(doneN / all.length) * 100}%`, height: "100%", background: G, borderRadius: 99 }} />
          </div>
          {MODULES.map(m => (
            <div key={m.id} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: G, letterSpacing: 1, fontWeight: 700 }}>MODULE {m.id} · WEEKS {m.weeks}</div>
              <div style={{ fontWeight: 700, margin: "4px 0 8px" }}>{m.title}</div>
              {m.lessons.map(l => (
                <button key={l.id} onClick={() => open(m.id, l.id)} style={{
                  display: "flex", width: "100%", textAlign: "left", gap: 8, alignItems: "center",
                  background: l.id === les.id ? D3 : "transparent", color: L, border: "none",
                  borderRadius: 8, padding: "10px 8px", marginBottom: 4
                }}>
                  <span style={{ width: 18, color: store.done[l.id] ? G : T }}>{store.done[l.id] ? "✓" : "·"}</span>
                  <span style={{ fontSize: 13 }}>Week {l.week}: {l.title}</span>
                </button>
              ))}
            </div>
          ))}
        </aside>
        <main style={{ overflowY: "auto", padding: "28px 32px 80px" }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ fontSize: 12, color: G, letterSpacing: 1, fontWeight: 700 }}>{mod.construct} · {les.minutes} MIN · WEEK {les.week}</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 40, lineHeight: 1.1, margin: "8px 0 12px" }}>{les.title}</h1>
            <p style={{ color: T, lineHeight: 1.6, marginBottom: 22 }}>{les.aim}</p>
            {les.teach.map((p, i) => <p key={i} style={{ lineHeight: 1.7, marginBottom: 14, color: L }}>{p}</p>)}
            <h2 style={h2}>Practice before the next session</h2>
            <ol style={{ color: T, lineHeight: 1.6, paddingLeft: 18, marginBottom: 18 }}>
              {les.practice.map((s, i) => <li key={i} style={{ marginBottom: 6 }}>{s}</li>)}
            </ol>
            <h2 style={h2}>Field note</h2>
            <p style={{ color: T, fontSize: 14, marginBottom: 8 }}>{les.prompt}</p>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={6} style={field} />
            <h2 style={h2}>Check</h2>
            <p style={{ marginBottom: 10 }}>{les.check.q}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {les.check.options.map((o, i) => (
                <button key={o} onClick={() => setPick(i)} style={{
                  textAlign: "left", padding: "12px 14px", borderRadius: 10,
                  border: `1px solid ${pick === i ? G : D3}`, background: pick === i ? "#c8a43418" : D2, color: L
                }}>{o}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 18, flexWrap: "wrap" }}>
              <button onClick={save} style={btnGold}>{store.done[les.id] ? "Update and continue" : "Save this week"}</button>
              {msg && <span style={{ color: msg.startsWith("Saved") ? G : "#f0b4a8", fontSize: 14 }}>{msg}</span>}
            </div>
            {les.id === "6b" && plan.length > 0 && (
              <div style={{ marginTop: 28, padding: 18, border: `1px solid ${G}33`, borderRadius: 12, background: D2 }}>
                <h2 style={{ ...h2, marginTop: 0 }}>What you have written</h2>
                {plan.map((p, i) => <p key={i} style={{ color: T, fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>{p}</p>)}
              </div>
            )}
          </div>
        </main>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .prog-shell { grid-template-columns: 1fr !important; }
          .prog-shell aside { max-height: 220px; border-right: none !important; border-bottom: 1px solid ${D3}; }
        }
      `}</style>
    </div>
  );
}

const h2 = { fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 600, margin: "22px 0 8px" };
const field = { width: "100%", background: D2, color: L, border: `1px solid ${D3}`, borderRadius: 10, padding: 12, fontFamily: "inherit", fontSize: 15, lineHeight: 1.5 };
const btnGold = { background: `linear-gradient(135deg,${G},#a88a28)`, color: D, border: "none", borderRadius: 10, padding: "12px 18px", fontWeight: 700 };
const btnGhost = { background: D2, color: T, border: `1px solid ${D3}`, borderRadius: 8, padding: "8px 12px" };
