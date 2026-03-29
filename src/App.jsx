import { useState, useEffect, useRef } from "react";

const G = "#c8a434", D = "#07090d", D2 = "#0c1018", D3 = "#151b26", T = "#9ca3b4", L = "#e4ddd0";

function useInView(th = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: th });
    o.observe(el); return () => o.disconnect();
  }, [th]);
  return [ref, v];
}

function FI({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView(0.1);
  return <div ref={ref} style={{ ...style, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(40px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>{children}</div>;
}

function AnimNum({ value, suffix = "" }) {
  const [d, setD] = useState(0);
  const [ref, vis] = useInView(0.3);
  useEffect(() => {
    if (!vis) return;
    const n = parseInt(value.toString().replace(/\D/g, ""));
    if (isNaN(n)) { setD(value); return; }
    let s = 0; const step = Math.max(1, Math.floor(n / 80));
    const t = setInterval(() => { s += step; if (s >= n) { setD(n); clearInterval(t); } else setD(s); }, 16);
    return () => clearInterval(t);
  }, [vis, value]);
  return <span ref={ref}>{typeof d === "number" ? d.toLocaleString() : d}{suffix}</span>;
}

// ============================================================
// TOOL SYSTEM PROMPTS
// ============================================================
const ADVISOR_SYS = `You are the AILT Leadership Advisor grounded in Adaptive Inclusive Leadership Theory by Matthew Culwell.
AILT has three constructs and one mediator:
1. INCLUSIVE ADAPTIVE CAPACITY (IAC) — Collective capability to respond to challenges by integrating diverse perspectives.
2. PARTICIPATORY SENSEMAKING (PS) — Collaborative interpretation of ambiguity through diverse perspectives. Critical for AI black-box outputs.
3. EQUITY-CENTERED FLEXIBILITY (ECF) — Adapting structures during change while advancing equity.
4. PSYCHOLOGICAL SAFETY (Mediator) — Shared belief team is safe for risk-taking (Edmondson, 1999).
PROPOSITIONS: P1: IAC+ECF reciprocal. P2: PS mediates IAC→outcomes. P3: IAC+PS+ECF=emergent resilience. P4: Inclusivity deficits constrain adaptation MORE than reverse. P5: Continuous recalibration required.
EVIDENCE: Li et al. 2025 (105 samples N=39,948), Frazier et al. 2017 (136 samples N>22,000), An et al. 2025 (PNAS Nexus AI bias), Amazon AI hiring (Dastin 2018), EEOC v. iTutorGroup 2023, Mobley v. Workday 2025.
RESPOND WITH: 1) Situation Analysis 2) Recommendations: 🔷 IAC, 🟢 PS, 🔴 ECF, 🟣 Psych Safety 3) Key Risk 4) One action for next 48 hours. Under 500 words. Direct and specific.`;

const MEETING_SYS = `You are the AILT Meeting Architect. Transform any meeting into an AILT-aligned experience.
Every meeting must include: PSYCHOLOGICAL SAFETY OPENER (2-3 min, exact script), PARTICIPATORY SENSEMAKING BLOCK (specific method), EQUITY CHECK (explicit voice redistribution), COMMITMENT CLOSE (names, deadlines, reflection).
Time-box every segment. Provide exact FACILITATOR SCRIPTS. Include a cheat sheet for dominance, silence, and conflict. Adapt to meeting duration. Be practical — every word should be usable.`;

const ASSESS_ITEMS = {
  iac: { title: "Inclusive Adaptive Capacity (IAC)", color: "#2563eb", items: [
    "I actively seek input from people with different backgrounds when facing challenges.",
    "I distinguish between technical problems and adaptive challenges.",
    "I ensure people most affected by changes participate in planning.",
    "When AI is introduced, I include diverse backgrounds in evaluation.",
    "I synthesize diverse perspectives rather than defaulting to seniority.",
    "I treat disagreement across backgrounds as a resource.",
    "I examine whether adaptive responses work for all groups.",
    "I adjust stakeholder involvement as conditions change.",
    "I anticipate how technology changes affect different groups differently.",
    "I create structures enabling all levels to contribute distinct perspectives.",
  ]},
  ps: { title: "Participatory Sensemaking (PS)", color: "#0d9488", items: [
    "In ambiguous situations, I facilitate collective discussion.",
    "I encourage interpretations that differ from the official narrative.",
    "When AI produces unexpected results, I involve diverse members in interpreting.",
    "I value multiple interpretations rather than insisting on one 'correct' reading.",
    "I encourage questioning assumptions behind algorithmic recommendations.",
    "I create structured forums for discussing change implications.",
    "Frontline observations are taken as seriously as management assessments.",
    "When new info contradicts plans, I facilitate open discussion.",
    "I include underrepresented groups in workforce impact discussions.",
    "I model intellectual humility by acknowledging what I don't know.",
  ]},
  ecf: { title: "Equity-Centered Flexibility (ECF)", color: "#dc2626", items: [
    "I assess how changes affect different groups differently.",
    "I adjust when changes disproportionately burden certain groups.",
    "I balance speed during change with equitable outcomes.",
    "I ensure equitable access to new tools and training.",
    "I monitor AI systems for differential outcomes across groups.",
    "I adapt communication based on different group needs during change.",
    "I review evaluation processes for bias, including from technology.",
    "During restructuring, I consider which roles are cut and who holds them.",
    "I hold myself accountable for ensuring changes advance equity.",
    "My equity approach evolves with conditions.",
  ]},
  psy: { title: "Psychological Safety", color: "#7c3aed", items: [
    "People feel safe taking interpersonal risks on my team.",
    "Team members bring up problems openly.",
    "I respond constructively when someone challenges my decisions.",
    "People do not fear punishment for admitting mistakes.",
    "People feel comfortable raising AI/tech concerns.",
    "If someone reported biased AI results, it would be taken seriously.",
    "People feel safe questioning algorithmic recommendations.",
    "I protect people who voice unpopular concerns.",
    "Disagreement is treated as contribution, not threat.",
    "I have explicitly discussed psychological safety with my team.",
  ]},
};

const PRESETS = [
  { label: "AI Hiring Tool", icon: "🤖", prompt: "We're deploying AI resume screening. HR wants efficiency but I'm concerned about bias. Workforce is 72% white, 65% male in leadership. Vendor won't share audit. What should I do?" },
  { label: "DEI Pushback", icon: "⚡", prompt: "Senior leaders call DEI 'performative.' Employees of color feel significantly less included. I need to address both." },
  { label: "Restructuring", icon: "🔄", prompt: "Eliminating 40 positions due to AI automation. Affected roles disproportionately held by women and 50+. CEO wants speed." },
  { label: "Algorithm Conflict", icon: "📊", prompt: "AI performance system flagged non-native English speakers as 'underperforming.' Manager raised it, told 'data is objective.' Team afraid to speak up." },
  { label: "Remote vs. Office", icon: "🏢", prompt: "Leadership wants 5-day RTO. Remote workers equally productive. Parents and disabled employees will quit if forced back." },
  { label: "Merger Culture", icon: "🤝", prompt: "Merging with a hierarchical, homogeneous company. We're flat and diverse. Both sides suspicious." },
];

const MEETING_TYPES = [
  { v: "strategy", l: "Strategy / Planning" }, { v: "decision", l: "Decision-Making" },
  { v: "brainstorm", l: "Brainstorm / Innovation" }, { v: "retro", l: "Retrospective" },
  { v: "change", l: "Change Communication" }, { v: "crisis", l: "Crisis Response" },
  { v: "calibration", l: "Calibration / Review" }, { v: "update", l: "Status Update" },
];

const TOOLS = [
  { id: "advisor", icon: "🎯", title: "Leadership Advisor", desc: "Describe any scenario, get AILT-aligned analysis with construct-level recommendations.", tag: "AI-Powered" },
  { id: "assessment", icon: "📊", title: "Self-Assessment", desc: "40 items across IAC, PS, ECF, and Psychological Safety. Get your scores instantly.", tag: "Interactive" },
  { id: "meeting", icon: "📋", title: "Meeting Architect", desc: "Generate AILT-aligned agendas with facilitator scripts, equity checks, and safety openers.", tag: "AI-Powered" },
  { id: "scanner", icon: "🔍", title: "AI Readiness Scanner", desc: "Assess your organization's readiness to deploy AI equitably. Full risk report.", tag: "Enterprise" },
  { id: "coach", icon: "💬", title: "Leadership Coach", desc: "Ongoing conversational coaching across five modes. Remembers your goals.", tag: "AI-Powered" },
  { id: "360", icon: "🔄", title: "360° Feedback", desc: "Collect anonymous team ratings, see self vs. team gaps, get AI gap analysis.", tag: "Team" },
];

// ============================================================
// MAIN APP
// ============================================================
export default function AILTSite() {
  const [page, setPage] = useState("home"); // home | tool-id
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef(null);

  // Advisor state
  const [advScenario, setAdvScenario] = useState("");
  const [advResp, setAdvResp] = useState("");
  const [advLoad, setAdvLoad] = useState(false);

  // Assessment state
  const [assScores, setAssScores] = useState({});
  const [assView, setAssView] = useState("take");

  // Meeting state
  const [mtgTopic, setMtgTopic] = useState("");
  const [mtgType, setMtgType] = useState("strategy");
  const [mtgDuration, setMtgDuration] = useState("60");
  const [mtgParticipants, setMtgParticipants] = useState("6-10");
  const [mtgContext, setMtgContext] = useState("");
  const [mtgResp, setMtgResp] = useState("");
  const [mtgLoad, setMtgLoad] = useState(false);

  // Contact
  const [contact, setContact] = useState({ name: "", email: "", msg: "" });

  useEffect(() => {
    const el = mainRef.current; if (!el) return;
    const h = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", h); return () => el.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [page]);

  const go = (id) => { if (page === "home") document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  const callAPI = async (sys, prompt, maxTok = 1000) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: maxTok, system: sys, messages: [{ role: "user", content: prompt }] }),
    });
    const data = await res.json();
    return data.content?.map(b => b.text || "").join("\n") || "No response.";
  };

  const getScore = (dim) => {
    let tot = 0, ans = 0;
    ASSESS_ITEMS[dim].items.forEach((_, i) => { const k = `${dim}-${i}`; if (assScores[k]) { tot += assScores[k]; ans++; } });
    return { tot, ans, max: ASSESS_ITEMS[dim].items.length * 5, pct: ans > 0 ? Math.round((tot / (ans * 5)) * 100) : 0 };
  };

  const iS = { width: "100%", padding: "12px 14px", background: D2, border: `1px solid ${D3}`, borderRadius: 8, color: L, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" };

  const Cd = ({ children, style: s = {} }) => <div style={{ background: D2, border: `1px solid ${G}10`, borderRadius: 12, padding: 28, ...s }}>{children}</div>;

  const ST = ({ tag, title, sub }) => (
    <div style={{ textAlign: "center", marginBottom: 60 }}>
      <FI><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: G, textTransform: "uppercase", marginBottom: 8 }}>{tag}</div></FI>
      <FI delay={0.1}><h2 style={{ fontSize: 32, fontWeight: 700, color: L, fontFamily: "'Cormorant Garamond',serif", marginBottom: 12 }}>{title}</h2></FI>
      {sub && <FI delay={0.2}><p style={{ fontSize: 15, color: T, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p></FI>}
    </div>
  );

  const renderMd = (text) => text.split("\n").map((line, i) => {
    if (!line.trim()) return <div key={i} style={{ height: 8 }} />;
    if (line.startsWith("---")) return <hr key={i} style={{ border: "none", borderTop: `1px solid ${G}15`, margin: "16px 0" }} />;
    if (line.startsWith("## ")) return <div key={i} style={{ fontSize: 18, fontWeight: 700, color: G, marginTop: 20, marginBottom: 8, fontFamily: "'Cormorant Garamond',serif" }}>{line.slice(3)}</div>;
    if (line.startsWith("### ")) return <div key={i} style={{ fontSize: 15, fontWeight: 700, color: L, marginTop: 16, marginBottom: 6 }}>{line.slice(4)}</div>;
    if (/^\*\*[^*]+\*\*$/.test(line.trim())) return <div key={i} style={{ fontSize: 14, fontWeight: 700, color: G, marginTop: 14, marginBottom: 4 }}>{line.replace(/\*\*/g, "")}</div>;
    if (line.startsWith("> ")) return <div key={i} style={{ fontSize: 13, color: "#a78bfa", background: "#7c3aed10", borderLeft: "3px solid #7c3aed", padding: "8px 14px", margin: "6px 0", borderRadius: "0 6px 6px 0", fontStyle: "italic", lineHeight: 1.6 }}>{line.slice(2)}</div>;
    if (line.startsWith("- ")) {
      let c = T;
      if (line.includes("🔷")) c = "#60a5fa"; else if (line.includes("🟢")) c = "#34d399";
      else if (line.includes("🔴")) c = "#f87171"; else if (line.includes("🟣")) c = "#a78bfa";
      return <div key={i} style={{ fontSize: 13, color: c, lineHeight: 1.7, marginBottom: 4, paddingLeft: 14, position: "relative" }}><span style={{ position: "absolute", left: 0, color: G }}>•</span>{line.slice(2)}</div>;
    }
    if (/^\d+\./.test(line)) return <div key={i} style={{ fontSize: 13, color: L, lineHeight: 1.7, marginBottom: 6, paddingLeft: 4 }}>{line}</div>;
    if (line.includes("**")) { const p = line.split(/\*\*(.+?)\*\*/g); return <div key={i} style={{ fontSize: 13, color: T, lineHeight: 1.7, marginBottom: 4 }}>{p.map((s, j) => j % 2 === 1 ? <strong key={j} style={{ color: L }}>{s}</strong> : s)}</div>; }
    let c = T;
    if (line.includes("🔷")) c = "#60a5fa"; else if (line.includes("🟢")) c = "#34d399";
    else if (line.includes("🔴")) c = "#f87171"; else if (line.includes("🟣")) c = "#a78bfa";
    return <div key={i} style={{ fontSize: 13, color: c, lineHeight: 1.7, marginBottom: 4 }}>{line}</div>;
  });

  const ToolHeader = ({ title, subtitle }) => (
    <div style={{ borderBottom: `1px solid ${D3}`, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setPage("home")} style={{ background: D2, border: `1px solid ${D3}`, borderRadius: 6, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: T }}>←</button>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: L }}>{title}</div>
          <div style={{ fontSize: 10, color: T, letterSpacing: 0.5, textTransform: "uppercase" }}>{subtitle}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }} onClick={() => setPage("home")}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg,${G},#8b6914)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: D }}>A</div>
        <span style={{ fontSize: 12, fontWeight: 600, color: T }}>AILT</span>
      </div>
    </div>
  );

  const Loading = ({ text }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 20 }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: G, animation: "pulse 1.2s ease-in-out infinite" }} />
      <span style={{ color: T, fontSize: 13 }}>{text}</span>
      <style>{`@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}`}</style>
    </div>
  );

  // ============================================================
  // ADVISOR TOOL
  // ============================================================
  const AdvisorTool = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="AILT Leadership Advisor" subtitle="Scenario analysis through AILT constructs" />
      <div style={{ padding: "16px 24px", flexShrink: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
          {PRESETS.map((p, i) => (
            <button key={i} onClick={() => { setAdvScenario(p.prompt); setAdvLoad(true); setAdvResp(""); callAPI(ADVISOR_SYS, p.prompt).then(r => { setAdvResp(r); setAdvLoad(false); }).catch(() => { setAdvResp("Connection failed."); setAdvLoad(false); }); }}
              style={{ background: D3, border: `1px solid ${G}15`, borderRadius: 8, padding: "10px 12px", cursor: "pointer", textAlign: "left" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = G + "40"} onMouseLeave={e => e.currentTarget.style.borderColor = G + "15"}>
              <span style={{ fontSize: 16 }}>{p.icon}</span>
              <div style={{ fontSize: 11, fontWeight: 600, color: L, marginTop: 4 }}>{p.label}</div>
            </button>
          ))}
        </div>
        <div style={{ position: "relative" }}>
          <textarea value={advScenario} onChange={e => setAdvScenario(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { setAdvLoad(true); setAdvResp(""); callAPI(ADVISOR_SYS, advScenario).then(r => { setAdvResp(r); setAdvLoad(false); }); } }}
            placeholder="Describe your leadership scenario..." rows={3} style={{ ...iS, paddingBottom: 44, resize: "none" }} />
          <button onClick={() => { setAdvLoad(true); setAdvResp(""); callAPI(ADVISOR_SYS, advScenario).then(r => { setAdvResp(r); setAdvLoad(false); }); }} disabled={advLoad || !advScenario.trim()}
            style={{ position: "absolute", bottom: 10, right: 10, background: advLoad ? T : `linear-gradient(135deg,${G},#a88a28)`, color: D, border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 12, fontWeight: 700, cursor: advLoad ? "wait" : "pointer", opacity: !advScenario.trim() ? 0.4 : 1 }}>
            {advLoad ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "0 24px 24px" }}>
        {advLoad && !advResp && <Loading text="Analyzing through the AILT framework..." />}
        {advResp && <Cd>{renderMd(advResp)}</Cd>}
      </div>
    </div>
  );

  // ============================================================
  // ASSESSMENT TOOL
  // ============================================================
  const AssessmentTool = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="AILT Self-Assessment" subtitle="40 items across four dimensions" />
      <div style={{ padding: "12px 24px", borderBottom: `1px solid ${D3}`, display: "flex", gap: 8, justifyContent: "center", flexShrink: 0 }}>
        {["take", "results"].map(v => (
          <button key={v} onClick={() => setAssView(v)} style={{ background: assView === v ? G : D2, color: assView === v ? D : T, border: `1px solid ${assView === v ? G : G + "20"}`, padding: "8px 24px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{v === "take" ? "Take Assessment" : "View Results"}</button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
        {assView === "take" && Object.entries(ASSESS_ITEMS).map(([dim, data]) => (
          <Cd key={dim} style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: data.color }} />
              <h3 style={{ fontSize: 14, fontWeight: 700, color: L }}>{data.title}</h3>
              <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: data.color }}>{getScore(dim).tot}/{getScore(dim).max}</span>
            </div>
            {data.items.map((item, i) => {
              const k = `${dim}-${i}`;
              return (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10, paddingBottom: 10, borderBottom: i < data.items.length - 1 ? `1px solid ${G}06` : "none" }}>
                  <span style={{ fontSize: 11, color: T, fontWeight: 600, minWidth: 18, marginTop: 4 }}>{i + 1}.</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: L, lineHeight: 1.5, marginBottom: 6 }}>{item}</div>
                    <div style={{ display: "flex", gap: 5 }}>
                      {[1, 2, 3, 4, 5].map(v => (
                        <button key={v} onClick={() => setAssScores(s => ({ ...s, [k]: v }))}
                          style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${assScores[k] === v ? data.color : D3}`, background: assScores[k] === v ? data.color + "20" : "transparent", color: assScores[k] === v ? data.color : T, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{v}</button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </Cd>
        ))}
        {assView === "results" && (
          <Cd>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: L, marginBottom: 20, fontFamily: "'Cormorant Garamond',serif" }}>Your AILT Profile</h3>
            {Object.entries(ASSESS_ITEMS).map(([dim, data]) => {
              const s = getScore(dim);
              const lv = s.pct >= 80 ? "Strong" : s.pct >= 60 ? "Developing" : s.pct >= 40 ? "Emerging" : s.ans === 0 ? "Not taken" : "Beginning";
              return (
                <div key={dim} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: L }}>{data.title}</span>
                    <span style={{ fontSize: 12, color: data.color, fontWeight: 600 }}>{s.tot}/{s.max} ({s.pct}%) — {lv}</span>
                  </div>
                  <div style={{ height: 8, background: D3, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.pct}%`, background: data.color, borderRadius: 4, transition: "width 0.8s" }} />
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop: 24, padding: 16, background: D3, borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: G, marginBottom: 4 }}>Total AILT Score</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: L, fontFamily: "'Cormorant Garamond',serif" }}>
                {Object.keys(ASSESS_ITEMS).reduce((a, d) => a + getScore(d).tot, 0)} / 200
              </div>
            </div>
          </Cd>
        )}
      </div>
    </div>
  );

  // ============================================================
  // MEETING ARCHITECT TOOL
  // ============================================================
  const MeetingTool = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="Meeting Architect" subtitle="AILT-aligned meeting design" />
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${D3}`, flexShrink: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
          <div><label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Topic</label><input value={mtgTopic} onChange={e => setMtgTopic(e.target.value)} placeholder="e.g., Q3 AI review" style={iS} /></div>
          <div><label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Type</label><select value={mtgType} onChange={e => setMtgType(e.target.value)} style={{ ...iS, appearance: "none" }}>{MEETING_TYPES.map(t => <option key={t.v} value={t.v}>{t.l}</option>)}</select></div>
          <div><label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Duration</label><input value={mtgDuration} onChange={e => setMtgDuration(e.target.value)} placeholder="60" style={iS} /></div>
          <div><label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 4 }}>People</label><input value={mtgParticipants} onChange={e => setMtgParticipants(e.target.value)} placeholder="6-10" style={iS} /></div>
        </div>
        <div style={{ position: "relative" }}>
          <textarea value={mtgContext} onChange={e => setMtgContext(e.target.value)} placeholder="Context: tensions, stakes, who's in the room..." rows={2} style={{ ...iS, paddingBottom: 44, resize: "none" }} />
          <button onClick={() => { setMtgLoad(true); setMtgResp(""); callAPI(MEETING_SYS, `Design AILT meeting:\nTopic: ${mtgTopic}\nType: ${MEETING_TYPES.find(t => t.v === mtgType)?.l}\nDuration: ${mtgDuration} min\nParticipants: ${mtgParticipants}\nContext: ${mtgContext}`, 2000).then(r => { setMtgResp(r); setMtgLoad(false); }); }} disabled={mtgLoad || (!mtgTopic.trim() && !mtgContext.trim())}
            style={{ position: "absolute", bottom: 10, right: 10, background: mtgLoad ? T : `linear-gradient(135deg,${G},#a88a28)`, color: D, border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 12, fontWeight: 700, cursor: mtgLoad ? "wait" : "pointer", opacity: (!mtgTopic.trim() && !mtgContext.trim()) ? 0.4 : 1 }}>
            {mtgLoad ? "Designing..." : "Design Meeting"}
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "16px 24px" }}>
        {mtgLoad && !mtgResp && <Loading text="Designing your AILT-aligned meeting..." />}
        {mtgResp && <Cd>{renderMd(mtgResp)}</Cd>}
        {!mtgResp && !mtgLoad && <div style={{ textAlign: "center", padding: "60px 20px", color: T, fontSize: 14 }}>Fill in your meeting details and click Design Meeting.</div>}
      </div>
    </div>
  );

  // ============================================================
  // COMING SOON (Scanner, Coach, 360)
  // ============================================================
  const ComingSoon = ({ title, subtitle, desc }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title={title} subtitle={subtitle} />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.4 }}>🚀</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: L, marginBottom: 8, fontFamily: "'Cormorant Garamond',serif" }}>Full Version Coming Soon</h2>
          <p style={{ fontSize: 14, color: T, lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
          <button onClick={() => setPage("home")} style={{ background: `linear-gradient(135deg,${G},#a88a28)`, color: D, border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Back to Home</button>
        </div>
      </div>
    </div>
  );

  // ============================================================
  // RENDER TOOL PAGE
  // ============================================================
  if (page === "advisor") return <div style={{ height: "100vh", background: D, color: L, fontFamily: "'Outfit',sans-serif", display: "flex", flexDirection: "column" }}><AdvisorTool /></div>;
  if (page === "assessment") return <div style={{ height: "100vh", background: D, color: L, fontFamily: "'Outfit',sans-serif", display: "flex", flexDirection: "column" }}><AssessmentTool /></div>;
  if (page === "meeting") return <div style={{ height: "100vh", background: D, color: L, fontFamily: "'Outfit',sans-serif", display: "flex", flexDirection: "column" }}><MeetingTool /></div>;
  if (page === "scanner") return <div style={{ height: "100vh", background: D, color: L, fontFamily: "'Outfit',sans-serif" }}><ComingSoon title="AI Readiness Scanner" subtitle="Enterprise equity risk assessment" desc="The full 3-step wizard with 5-category risk scoring and 90-day action plans. Available as a standalone app now — full website integration launching soon." /></div>;
  if (page === "coach") return <div style={{ height: "100vh", background: D, color: L, fontFamily: "'Outfit',sans-serif" }}><ComingSoon title="Leadership Coach" subtitle="Ongoing conversational coaching" desc="Five coaching modes, persistent profile, goal tracking. Available as a standalone app now — full website integration launching soon." /></div>;
  if (page === "360") return <div style={{ height: "100vh", background: D, color: L, fontFamily: "'Outfit',sans-serif" }}><ComingSoon title="360° Feedback" subtitle="Anonymous team ratings with gap analysis" desc="Create sessions, share codes, collect anonymous feedback, get AI-powered gap analysis. Available as a standalone app now — full website integration launching soon." /></div>;

  // ============================================================
  // HOME PAGE
  // ============================================================
  return (
    <div style={{ height: "100vh", overflow: "hidden", background: D, color: L, fontFamily: "'Outfit',sans-serif" }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? D + "ee" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${G}15` : "none", transition: "all 0.4s", padding: "0 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => { setPage("home"); if (mainRef.current) mainRef.current.scrollTop = 0; }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${G},#8b6914)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: D }}>A</div>
            <span style={{ fontSize: 15, fontWeight: 700, color: L }}>AILT</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["theory", "evidence", "book", "tools", "course", "about", "contact"].map(n => (
              <button key={n} onClick={() => go(n)} style={{ background: "none", border: "none", color: T, fontSize: 12, fontWeight: 600, padding: "8px 10px", cursor: "pointer", textTransform: "capitalize" }}>{n}</button>
            ))}
          </div>
        </div>
      </nav>

      <main ref={mainRef} style={{ height: "100vh", overflowY: "auto", scrollBehavior: "smooth" }}>

        {/* HERO */}
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "80px 40px" }}>
          <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, background: `radial-gradient(circle, ${G}08 0%, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ textAlign: "center", maxWidth: 800, position: "relative", zIndex: 1 }}>
            <FI><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: G, textTransform: "uppercase", marginBottom: 16 }}>Adaptive Inclusive Leadership Theory</div></FI>
            <FI delay={0.15}><h1 style={{ fontSize: 48, fontWeight: 300, color: L, fontFamily: "'Cormorant Garamond',serif", lineHeight: 1.15, marginBottom: 20 }}>Leadership for the<br /><span style={{ fontWeight: 700, fontStyle: "italic" }}>Age of AI</span></h1></FI>
            <FI delay={0.3}><p style={{ fontSize: 17, color: T, lineHeight: 1.7, maxWidth: 600, margin: "0 auto 32px" }}>When algorithms make decisions that were once exclusively human, organizations need a framework that governs transformation equitably.</p></FI>
            <FI delay={0.45}>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => go("tools")} style={{ background: `linear-gradient(135deg,${G},#a88a28)`, color: D, border: "none", padding: "14px 32px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Explore the Tools</button>
                <button onClick={() => go("theory")} style={{ background: "transparent", color: G, border: `1px solid ${G}40`, padding: "14px 32px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Learn the Theory</button>
              </div>
            </FI>
          </div>
        </section>

        {/* STATS */}
        <section style={{ background: D2, borderTop: `1px solid ${G}10`, borderBottom: `1px solid ${G}10`, padding: "36px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, textAlign: "center" }}>
            {[{ n: "39948", s: "+", l: "Participants in evidence base" }, { n: "105", s: "", l: "Independent samples" }, { n: "5", s: "", l: "Testable propositions" }, { n: "541", s: "", l: "Verified references" }].map((s, i) => (
              <FI key={i} delay={i * 0.1}>
                <div style={{ fontSize: 28, fontWeight: 700, color: G, fontFamily: "'Cormorant Garamond',serif" }}><AnimNum value={s.n} suffix={s.s} /></div>
                <div style={{ fontSize: 11, color: T, marginTop: 4 }}>{s.l}</div>
              </FI>
            ))}
          </div>
        </section>

        {/* THEORY */}
        <section id="theory" style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
          <ST tag="The Framework" title="Three Constructs, One Mediating Mechanism" sub="Adaptability and inclusivity are interdependent capacities with psychological safety as the bridge." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {[
              { tag: "Construct 1", t: "Inclusive Adaptive Capacity", a: "IAC", c: "#2563eb", lv: "Organizational", d: "Responding to complex challenges by integrating diverse perspectives. In the AI age: ensuring diverse stakeholders govern AI systems." },
              { tag: "Construct 2", t: "Participatory Sensemaking", a: "PS", c: "#0d9488", lv: "Team", d: "Collective interpretation of ambiguity. When AI produces opaque recommendations, diverse teams must interpret outputs together." },
              { tag: "Construct 3", t: "Equity-Centered Flexibility", a: "ECF", c: "#dc2626", lv: "Cross-Level", d: "Adapting structures during change while advancing equity. Monitoring AI's differential impacts and ensuring equitable access." },
              { tag: "Mediator", t: "Psychological Safety", a: "PS*", c: "#7c3aed", lv: "Foundation", d: "Shared belief the team is safe for risk-taking. Enables diverse voices and is reinforced when inclusive processes succeed." },
            ].map((c, i) => (
              <FI key={i} delay={i * 0.1}><Cd>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: c.c, textTransform: "uppercase" }}>{c.tag}</div>
                  <div style={{ fontSize: 10, color: T, background: D3, padding: "3px 10px", borderRadius: 20 }}>{c.lv}</div>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: L, marginBottom: 4, fontFamily: "'Cormorant Garamond',serif" }}>{c.t} <span style={{ color: c.c, fontSize: 14 }}>({c.a})</span></h3>
                <p style={{ fontSize: 13, color: T, lineHeight: 1.7 }}>{c.d}</p>
              </Cd></FI>
            ))}
          </div>
        </section>

        {/* EVIDENCE */}
        <section id="evidence" style={{ background: D2, padding: "100px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <ST tag="The Evidence" title="Built on Real Research" sub="Every claim grounded in verified meta-analyses and published research." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                { c: "Li, Ling, & Zhu (2025)", s: "Asia Pacific J. of Management", st: "105 samples, N=39,948", f: "Inclusive leadership predicts performance, innovation, creativity, voice." },
                { c: "Frazier et al. (2017)", s: "Personnel Psychology", st: "136 samples, N>22,000", f: "Psychological safety meta-analysis confirming its role as enabler." },
                { c: "An et al. (2025)", s: "PNAS Nexus", st: "Large-scale experiment", f: "AI models systematically disadvantage Black male applicants." },
                { c: "Wang et al. (2014)", s: "J. of Applied Psychology", st: "42 samples", f: "Shared leadership predicts team effectiveness." },
                { c: "Kalinoski et al. (2013)", s: "J. of Applied Psychology", st: "65 studies", f: "Active learning outperforms passive diversity training." },
                { c: "Harter et al. (2002)", s: "J. of Applied Psychology", st: "7,939 units", f: "Engagement predicts profitability and customer satisfaction." },
              ].map((e, i) => (
                <FI key={i} delay={i * 0.08}><Cd style={{ height: "100%" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 2 }}>{e.c}</div>
                  <div style={{ fontSize: 10, color: T, marginBottom: 8 }}>{e.s} • {e.st}</div>
                  <p style={{ fontSize: 12, color: T, lineHeight: 1.6 }}>{e.f}</p>
                </Cd></FI>
              ))}
            </div>
          </div>
        </section>

        {/* BOOK */}
        <section id="book" style={{ padding: "100px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <ST tag="The Book" title="Leadership for the Age of AI" sub="73,000 words of theory, evidence, case studies, and practical application." />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
              <FI><div style={{ background: `linear-gradient(135deg, ${D2}, ${D3})`, border: `1px solid ${G}20`, borderRadius: 16, padding: 40, textAlign: "center" }}>
                <div style={{ fontSize: 80, marginBottom: 16 }}>📖</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: L, fontFamily: "'Cormorant Garamond',serif", marginBottom: 4 }}>Adaptive Inclusive<br />Leadership Theory</div>
                <div style={{ fontSize: 13, color: G, fontStyle: "italic" }}>by Matthew Culwell</div>
              </div></FI>
              <FI delay={0.15}><div>
                {["15 chapters with story-driven openings", "Evidence from 100,000+ participants", "10 'For Your Organization' application sections", "AI governance cases: Amazon, iTutorGroup, Workday", "52-item assessment + 541 verified references"].map((x, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                    <span style={{ color: G, marginTop: 2 }}>→</span>
                    <span style={{ fontSize: 14, color: T, lineHeight: 1.6 }}>{x}</span>
                  </div>
                ))}
                <button onClick={() => go("contact")} style={{ marginTop: 16, background: `linear-gradient(135deg,${G},#a88a28)`, color: D, border: "none", padding: "12px 28px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Get the Book</button>
              </div></FI>
            </div>
          </div>
        </section>

        {/* TOOLS HUB */}
        <section id="tools" style={{ background: D2, padding: "100px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <ST tag="Adaptive AI Suite" title="Leadership Tools Powered by AILT" sub="Six tools designed for leaders, consultants, and organizations navigating AI-driven transformation." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {TOOLS.map((t, i) => (
                <FI key={i} delay={i * 0.08}>
                  <button onClick={() => setPage(t.id)} style={{ background: D3, border: `1px solid ${G}15`, borderRadius: 12, padding: 24, cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.25s", position: "relative", overflow: "hidden" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = G + "15"; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${G}, #a88a28)`, opacity: 0.5 }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <span style={{ fontSize: 28 }}>{t.icon}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: G, background: G + "15", padding: "3px 8px", borderRadius: 4, letterSpacing: 0.5, textTransform: "uppercase" }}>{t.tag}</span>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: L, marginBottom: 6 }}>{t.title}</div>
                    <div style={{ fontSize: 12, color: T, lineHeight: 1.6 }}>{t.desc}</div>
                    <div style={{ marginTop: 12, fontSize: 11, fontWeight: 600, color: G }}>Launch →</div>
                  </button>
                </FI>
              ))}
            </div>
          </div>
        </section>

        {/* COURSE */}
        <section id="course" style={{ padding: "100px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <ST tag="12-Week Program" title="AILT Leadership Course" sub="Professional development designed to build all three AILT constructs through structured practice, reflection, and peer learning." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                { n: 1, t: "Foundations of AILT", w: "1–2", d: "The case for integrating adaptability and inclusivity. Psychological safety as the foundation of everything." },
                { n: 2, t: "Inclusive Adaptive Capacity", w: "3–4", d: "Technical vs. adaptive challenges. Building cognitive flexibility and diverse integration capabilities." },
                { n: 3, t: "Participatory Sensemaking", w: "5–6", d: "Collective interpretation of ambiguity. Sensemaking in AI-augmented decision environments." },
                { n: 4, t: "Equity-Centered Flexibility", w: "7–8", d: "Equity during organizational change. AI governance and the equity imperative." },
                { n: 5, t: "AILT & AI Governance", w: "9–10", d: "Leading AI transformation with AILT. Sustaining inclusive governance in rapidly changing landscapes." },
                { n: 6, t: "Capstone", w: "11–12", d: "Integration, 360° assessment, peer feedback, and personal AILT leadership development plan." },
              ].map((m, i) => (
                <FI key={i} delay={i * 0.08}><Cd style={{ height: "100%", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${G}, #a88a28)` }} />
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: G, textTransform: "uppercase", marginBottom: 4 }}>Module {m.n}</div>
                  <div style={{ fontSize: 10, color: T, marginBottom: 10 }}>Weeks {m.w}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: L, marginBottom: 8 }}>{m.t}</h3>
                  <p style={{ fontSize: 12, color: T, lineHeight: 1.6 }}>{m.d}</p>
                </Cd></FI>
              ))}
            </div>
            <FI delay={0.5}><div style={{ textAlign: "center", marginTop: 40 }}>
              <button onClick={() => go("contact")} style={{ background: `linear-gradient(135deg,${G},#a88a28)`, color: D, border: "none", padding: "14px 32px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Inquire About Enrollment</button>
            </div></FI>
          </div>
        </section>

        {/* JOURNAL */}
        <section style={{ background: D2, padding: "80px 40px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <FI><Cd style={{ padding: 40 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: G, textTransform: "uppercase", marginBottom: 12 }}>Academic Research</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: L, fontFamily: "'Cormorant Garamond',serif", marginBottom: 8 }}>AILT: An Integrative Framework for Leading Through Algorithmic Transformation</h3>
              <p style={{ fontSize: 13, color: T, lineHeight: 1.7, marginBottom: 16 }}>Conceptual paper with five testable propositions grounded in meta-analytic evidence from 105 samples (N = 39,948). Differentiates AILT from transformational, adaptive, inclusive, and shared leadership.</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                {["55 references", "7,287 words", "5 propositions", "Research agenda"].map((t, i) => (
                  <span key={i} style={{ fontSize: 11, color: G, background: G + "15", padding: "4px 12px", borderRadius: 20, fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </Cd></FI>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={{ padding: "100px 40px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <ST tag="About" title="Matthew Culwell" />
            <FI><Cd style={{ padding: 32 }}>
              <p style={{ fontSize: 15, color: T, lineHeight: 1.8, marginBottom: 16 }}>Matthew Culwell is the creator of Adaptive Inclusive Leadership Theory and a doctoral researcher focused on the intersection of leadership, artificial intelligence, and organizational equity.</p>
              <p style={{ fontSize: 15, color: T, lineHeight: 1.8, marginBottom: 16 }}>An enrolled Chickasaw citizen, Matthew brings a perspective shaped by both Indigenous community values and modern organizational leadership. AILT emerged from the observation that existing theories treat adaptability and inclusivity as separate capabilities — a gap that becomes critical when algorithms make decisions once exclusively human.</p>
              <p style={{ fontSize: 15, color: T, lineHeight: 1.8 }}>The framework integrates these capacities with five testable propositions, grounded in evidence from over 100,000 participants.</p>
            </Cd></FI>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ background: D2, padding: "100px 40px" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <ST tag="Connect" title="Get in Touch" sub="Book, course, consulting, or speaking." />
            <FI><Cd>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <input value={contact.name} onChange={e => setContact(f => ({ ...f, name: e.target.value }))} placeholder="Your name" style={iS} />
                <input value={contact.email} onChange={e => setContact(f => ({ ...f, email: e.target.value }))} placeholder="Email address" style={iS} />
                <textarea value={contact.msg} onChange={e => setContact(f => ({ ...f, msg: e.target.value }))} placeholder="How can I help?" rows={5} style={{ ...iS, resize: "none" }} />
                <button style={{ background: `linear-gradient(135deg,${G},#a88a28)`, color: D, border: "none", padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", alignSelf: "flex-start" }}>Send Message</button>
              </div>
            </Cd></FI>
          </div>
        </section>

        <footer style={{ borderTop: `1px solid ${G}10`, padding: "24px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg,${G},#8b6914)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: D }}>A</div>
              <span style={{ fontSize: 12, color: T }}>Adaptive Inclusive Leadership Theory</span>
            </div>
            <div style={{ fontSize: 11, color: "#3a4252" }}>© 2026 Matthew Culwell. All rights reserved.</div>
          </div>
        </footer>
      </main>

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${G}20;border-radius:3px}
        input::placeholder,textarea::placeholder{color:#3a4252}
        ::selection{background:${G}30;color:${L}}
      `}</style>
    </div>
  );
}
