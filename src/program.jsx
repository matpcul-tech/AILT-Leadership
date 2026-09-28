import { useEffect, useMemo, useState } from "react";
import { MODULES } from "./curriculum.js";

const G = "#c8a434", D = "#07090d", D2 = "#0c1018", D3 = "#151b26", T = "#9ca3b4", L = "#e4ddd0";
const KEY = "ailt-program-v3";

function empty() { return { done: {}, notes: {}, picks: {}, chapters: {}, pages: {}, witnesses: {} }; }

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY)) || empty();
    return { ...empty(), ...raw, chapters: raw.chapters || {}, pages: raw.pages || {}, witnesses: raw.witnesses || {} };
  } catch { return empty(); }
}

export function Program({ onBack }) {
  const [store, setStore] = useState(load);
  const [modId, setModId] = useState(MODULES[0].id);
  const [lesId, setLesId] = useState(MODULES[0].lessons[0].id);
  const [pick, setPick] = useState(null);
  const [note, setNote] = useState("");
  const [chapter, setChapter] = useState("");
  const [page, setPage] = useState("");
  const [witness, setWitness] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(store)); }, [store]);

  const mod = MODULES.find(m => m.id === modId);
  const les = mod.lessons.find(l => l.id === lesId) || mod.lessons[0];
  const all = MODULES.flatMap(m => m.lessons);
  const doneN = all.filter(l => store.done[l.id]).length;

  useEffect(() => {
    setNote(store.notes[les.id] || "");
    setChapter(store.chapters[les.id] || "");
    setPage(store.pages[les.id] || "");
    setWitness(store.witnesses[les.id] || "");
    setPick(store.picks[les.id] ?? null);
    setMsg("");
  }, [les.id]);

  const open = (m, l) => { setModId(m); setLesId(l); };

  const save = () => {
    const text = note.trim();
    const title = chapter.trim();
    const pg = page.trim();
    const who = witness.trim();
    if (title.length < 8) { setMsg("Enter the chapter title as it is printed in the book."); return; }
    if (!/^\d{1,4}$/.test(pg) || Number(pg) < 1) { setMsg("Enter the page number from your copy of the book."); return; }
    if (les.week >= 3 && who.length < 2) { setMsg("Name the person who will read one sentence of this entry. They have to be able to ask what the page said."); return; }
    if (text.length < 200) { setMsg("The journal has to use the book. Restate the passage and what you understand now. A sentence is not an entry."); return; }
    if (les.teach.some(p => p.length > 80 && text.includes(p.slice(0, 80)))) { setMsg("That is this screen, not the book. Write from the page you read."); return; }
    if (pick !== les.check.answer) { setMsg("Check the question again. The point is the distinction, not the wording."); return; }
    const next = {
      ...store,
      notes: { ...store.notes, [les.id]: text },
      chapters: { ...store.chapters, [les.id]: title },
      pages: { ...store.pages, [les.id]: pg },
      witnesses: { ...store.witnesses, [les.id]: les.week >= 3 ? who : "" },
      picks: { ...store.picks, [les.id]: pick },
      done: { ...store.done, [les.id]: true }
    };
    setStore(next);
    setMsg("Saved. This journal counts.");
    const i = all.findIndex(l => l.id === les.id);
    const nxt = all[i + 1];
    if (nxt) {
      const parent = MODULES.find(m => m.lessons.some(l => l.id === nxt.id));
      setTimeout(() => open(parent.id, nxt.id), 500);
    }
  };

  const exportJournal = () => {
    const now = new Date();
    const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const saved = all.filter(l => store.done[l.id] && store.notes[l.id]);
    const lines = ["AILT Leadership Course, journal record", `Exported ${stamp}`, `${saved.length} of 12 weeks saved`, ""];
    saved.forEach(l => {
      lines.push(`Week ${l.week}: ${l.title}`);
      lines.push(`${store.chapters[l.id] || ""}, p. ${store.pages[l.id] || ""}${store.witnesses[l.id] ? `, shown to ${store.witnesses[l.id]}` : ""}`);
      lines.push(store.notes[l.id]);
      lines.push("");
    });
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `ailt-journal-${stamp}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {doneN > 0 && <button onClick={exportJournal} style={btnGhost}>Download journal</button>}
          <div style={{ fontSize: 13, color: T }}>{doneN}/{all.length} done</div>
        </div>
      </header>
      <div className="prog-shell" style={{ flex: 1, display: "grid", gridTemplateColumns: "280px 1fr", minHeight: 0 }}>
        <aside style={{ borderRight: `1px solid ${D3}`, overflowY: "auto", padding: 16 }}>
          <div style={{ height: 6, background: D3, borderRadius: 99, marginBottom: 16 }}>
            <div style={{ width: `${(doneN / all.length) * 100}%`, height: "100%", background: G, borderRadius: 99 }} />
          </div>
          <div style={{ fontSize: 11, color: T, marginTop: -8, marginBottom: 16 }}>Saved in this browser only. Download your journal from the header as you go.</div>
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
            <div style={{ fontSize: 12, color: G, letterSpacing: 1, fontWeight: 700 }}>{mod.construct} · {les.minutes} MIN WITH THE BOOK · WEEK {les.week}</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 40, lineHeight: 1.1, margin: "8px 0 12px" }}>{les.title}</h1>
            <p style={{ color: T, lineHeight: 1.6, marginBottom: 22 }}>{les.aim}</p>
            <div style={{ border: `1px solid ${G}`, background: D2, borderRadius: 12, padding: 16, marginBottom: 22 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: G, fontWeight: 700 }}>READ THIS FIRST</div>
              <p style={{ lineHeight: 1.6, marginTop: 8 }}>{les.reading}</p>
              <a href="https://a.co/d/056JGgCx" target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 10, color: G, fontWeight: 700, fontSize: 14 }}>Leadership for the Age of Artificial Intelligence</a>
            </div>
            <h2 style={h2}>What to watch for while you read</h2>
            {les.teach.map((p, i) => <p key={i} style={{ lineHeight: 1.7, marginBottom: 14, color: L }}>{p}</p>)}
            <h2 style={h2}>Practice before the next session</h2>
            <ol style={{ color: T, lineHeight: 1.6, paddingLeft: 18, marginBottom: 18 }}>
              {les.practice.map((s, i) => <li key={i} style={{ marginBottom: 6 }}>{s}</li>)}
            </ol>
            <h2 style={h2}>Journal from the book</h2>
            <p style={{ color: T, fontSize: 14, marginBottom: 8 }}>{les.prompt}</p>
            <label style={{ display: "block", color: T, fontSize: 13, marginBottom: 8 }}>Chapter title, as printed
              <input value={chapter} onChange={e => setChapter(e.target.value)} style={{ ...field, marginTop: 6 }} />
            </label>
            <label style={{ display: "block", color: T, fontSize: 13, marginBottom: 8 }}>Page
              <input value={page} onChange={e => setPage(e.target.value)} inputMode="numeric" style={{ ...field, marginTop: 6, maxWidth: 120 }} />
            </label>
            {les.week >= 3 && (
              <label style={{ display: "block", color: T, fontSize: 13, marginBottom: 8 }}>Person who will read one sentence
                <input value={witness} onChange={e => setWitness(e.target.value)} placeholder="A name, not a role" style={{ ...field, marginTop: 6 }} />
                <span style={{ display: "block", marginTop: 6, fontSize: 12 }}>They do not have to agree. They have to be able to ask what the page said.</span>
              </label>
            )}
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={8} placeholder="The passage, in your own words, and what you understand now that you did not before." style={field} />
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
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <h2 style={{ ...h2, margin: 0 }}>Journal record</h2>
                  <button onClick={exportJournal} style={btnGold}>Download journal</button>
                </div>
                <p style={{ color: T, fontSize: 13, margin: "8px 0 14px" }}>This record is stored only in this browser. Download it to keep it.</p>
                {all.map(l => store.notes[l.id] ? (
                  <div key={l.id} style={{ marginBottom: 12 }}>
                    <p style={{ color: L, fontSize: 14, fontWeight: 700 }}>{store.chapters[l.id]} · p. {store.pages[l.id]}{store.witnesses[l.id] ? ` · shown to ${store.witnesses[l.id]}` : ""}</p>
                    <p style={{ color: T, fontSize: 14, lineHeight: 1.6 }}>{store.notes[l.id]}</p>
                  </div>
                ) : null)}
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
