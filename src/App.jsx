import { useState, useEffect, useRef, useCallback } from "react";

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

function Card({ children, style: s = {} }) {
  return <div style={{ background: D2, border: `1px solid ${G}10`, borderRadius: 12, padding: 28, ...s }}>{children}</div>;
}

function SectionTitle({ tag, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 60 }}>
      <FI><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: G, textTransform: "uppercase", marginBottom: 8 }}>{tag}</div></FI>
      <FI delay={0.1}><h2 style={{ fontSize: 32, fontWeight: 700, color: L, fontFamily: "'Cormorant Garamond',serif", marginBottom: 12 }}>{title}</h2></FI>
      {sub && <FI delay={0.2}><p style={{ fontSize: 15, color: T, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p></FI>}
    </div>
  );
}

function Loading({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 20 }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: G, animation: "ailt-pulse 1.2s ease-in-out infinite" }} />
      <span style={{ color: T, fontSize: 13 }}>{text}</span>
    </div>
  );
}

function ToolHeader({ title, subtitle, onBack }) {
  return (
    <div style={{ borderBottom: `1px solid ${D3}`, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: D2, border: `1px solid ${D3}`, borderRadius: 6, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: T }}>←</button>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: L }}>{title}</div>
          <div style={{ fontSize: 10, color: T, letterSpacing: 0.5, textTransform: "uppercase" }}>{subtitle}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }} onClick={onBack}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg,${G},#8b6914)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: D }}>A</div>
        <span style={{ fontSize: 12, fontWeight: 600, color: T }}>AILT</span>
      </div>
    </div>
  );
}

const IS = { width: "100%", padding: "12px 14px", background: D2, border: `1px solid ${D3}`, borderRadius: 8, color: L, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" };

const ADVISOR_SYS = `You are the AILT Leadership Advisor grounded in Adaptive Inclusive Leadership Theory by Matthew Culwell.
AILT has three constructs and one mediator:
1. INCLUSIVE ADAPTIVE CAPACITY (IAC) - Collective capability to respond to challenges by integrating diverse perspectives.
2. PARTICIPATORY SENSEMAKING (PS) - Collaborative interpretation of ambiguity through diverse perspectives. Critical for AI black-box outputs.
3. EQUITY-CENTERED FLEXIBILITY (ECF) - Adapting structures during change while advancing equity.
4. PSYCHOLOGICAL SAFETY (Mediator) - Shared belief team is safe for risk-taking (Edmondson, 1999).
PROPOSITIONS: P1: IAC+ECF reciprocal. P2: PS mediates IAC to outcomes. P3: IAC+PS+ECF=emergent resilience. P4: Inclusivity deficits constrain adaptation MORE than reverse. P5: Continuous recalibration required.
EVIDENCE: Li et al. 2025 (105 samples N=39,948), Frazier et al. 2017 (136 samples N>22,000), An et al. 2025 (PNAS Nexus AI bias), Amazon AI hiring (Dastin 2018), EEOC v. iTutorGroup 2023, Mobley v. Workday 2025.
RESPOND WITH: 1) Situation Analysis 2) Recommendations with emoji tags for IAC, PS, ECF, Psych Safety 3) Key Risk 4) One action for next 48 hours. Under 500 words. Direct and specific.`;

const MEETING_SYS = `You are the AILT Meeting Architect. Transform any meeting into an AILT-aligned experience.
Every meeting must include: PSYCHOLOGICAL SAFETY OPENER (2-3 min, exact script), PARTICIPATORY SENSEMAKING BLOCK (specific method), EQUITY CHECK (explicit voice redistribution), COMMITMENT CLOSE (names, deadlines, reflection).
Time-box every segment. Provide exact FACILITATOR SCRIPTS. Include a cheat sheet for dominance, silence, and conflict. Adapt to meeting duration. Be practical.`;

const SCANNER_SYS = `You are the AILT AI Readiness Scanner. Analyze an organization's readiness to deploy AI equitably.
Generate a comprehensive risk report with:
## Overall Readiness Score
Rate 0-100 with label: Critical Risk / High Risk / Moderate Risk / Developing / Ready

## Five-Category Assessment
Score each 0-20:
1. Inclusive Governance (IAC)
2. Sensemaking Infrastructure (PS)
3. Equity Safeguards (ECF)
4. Psychological Safety
5. Technical Accountability

## Top 3 Risk Flags
Specific named risks with evidence.

## 90-Day Action Plan
Three concrete sequenced actions with owners and success metrics.

## Legal Exposure
EEOC/Title VII exposure note.

Reference Amazon, iTutorGroup, Workday cases where relevant. Under 600 words.`;

const COACH_SYS = `You are the AILT Leadership Coach grounded in Adaptive Inclusive Leadership Theory by Matthew Culwell.
Five coaching modes: REFLECT, CHALLENGE, PLAN, PRACTICE, REVIEW.
Ask one powerful question at a time. Build on previous responses. Tie insights back to IAC, PS, ECF, or Psychological Safety. Under 300 words. Warm, direct, challenging.`;

const FEEDBACK_SYS = `You are an AILT 360 Feedback Analyst.
Given self-scores and team scores across IAC, PS, ECF, and Psychological Safety, provide:
## Key Gaps
2-3 largest gaps between self and team perception.
## Blind Spot Analysis
What explains the discrepancies?
## Strength Confirmation
Where do self and team agree?
## Development Priority
One AILT construct to focus on first.
## Three Conversations to Have
Scripted conversation starters to open dialogue about the gaps.
Under 400 words.`;

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
    "I value multiple interpretations rather than insisting on one correct reading.",
    "I encourage questioning assumptions behind algorithmic recommendations.",
    "I create structured forums for discussing change implications.",
    "Frontline observations are taken as seriously as management assessments.",
    "When new info contradicts plans, I facilitate open discussion.",
    "I include underrepresented groups in workforce impact discussions.",
    "I model intellectual humility by acknowledging what I do not know.",
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
    "People feel comfortable raising AI and tech concerns.",
    "If someone reported biased AI results, it would be taken seriously.",
    "People feel safe questioning algorithmic recommendations.",
    "I protect people who voice unpopular concerns.",
    "Disagreement is treated as contribution, not threat.",
    "I have explicitly discussed psychological safety with my team.",
  ]},
};

const SCANNER_QUESTIONS = [
  { category: "Governance and Decision-Making", icon: "🔷", color: "#2563eb", questions: [
    "Who is involved in decisions about which AI tools to deploy?",
    "Are there employees from diverse backgrounds, functions, and levels on any AI governance committee?",
    "How are frontline workers informed or consulted about AI deployments that affect their roles?",
  ]},
  { category: "Bias and Equity Monitoring", icon: "🔴", color: "#dc2626", questions: [
    "Do you test AI systems for differential outcomes across demographic groups before deployment?",
    "Who is responsible for monitoring AI outputs for equity issues after launch?",
    "Have you documented which employee populations are most affected by each AI system?",
  ]},
  { category: "Psychological Safety and Voice", icon: "🟣", color: "#7c3aed", questions: [
    "Can employees raise concerns about AI tools without fear of retaliation?",
    "Have any AI concerns been raised and addressed in the past 12 months?",
    "Is there a formal channel to report problematic AI behavior?",
  ]},
  { category: "Sensemaking and Transparency", icon: "🟢", color: "#0d9488", questions: [
    "Can employees understand why an AI system made a specific decision about them?",
    "Are AI recommendations explained in plain language to affected employees?",
    "Do managers know how to interpret and override AI recommendations?",
  ]},
  { category: "Accountability and Audit", icon: "📋", color: G, questions: [
    "Is there a complete audit trail of AI-assisted hiring, promotion, or performance decisions?",
    "Has any AI vendor provided independent bias testing documentation?",
    "Who is legally accountable if an AI system produces discriminatory outcomes?",
  ]},
];

const COACH_MODES = [
  { id: "reflect", label: "Reflect", icon: "🪞", desc: "Examine your AILT behaviors through powerful questions" },
  { id: "challenge", label: "Challenge", icon: "⚡", desc: "Respectful challenge to assumptions and blind spots" },
  { id: "plan", label: "Plan", icon: "🗺️", desc: "Build concrete development plans tied to AILT constructs" },
  { id: "practice", label: "Practice", icon: "🎯", desc: "Roleplay and skill rehearsal for real situations" },
  { id: "review", label: "Review", icon: "📊", desc: "Assess progress and recalibrate goals" },
];

const PRESETS = [
  { label: "AI Hiring Tool", icon: "🤖", prompt: "We are deploying AI resume screening. HR wants efficiency but I am concerned about bias. Workforce is 72% white, 65% male in leadership. Vendor will not share audit. What should I do?" },
  { label: "DEI Pushback", icon: "⚡", prompt: "Senior leaders call DEI performative. Employees of color feel significantly less included. I need to address both." },
  { label: "Restructuring", icon: "🔄", prompt: "Eliminating 40 positions due to AI automation. Affected roles disproportionately held by women and employees over 50. CEO wants speed." },
  { label: "Algorithm Conflict", icon: "📊", prompt: "AI performance system flagged non-native English speakers as underperforming. Manager raised it and was told the data is objective. Team is afraid to speak up." },
  { label: "Remote vs Office", icon: "🏢", prompt: "Leadership wants 5-day return to office. Remote workers are equally productive. Parents and disabled employees will quit if forced back." },
  { label: "Merger Culture", icon: "🤝", prompt: "Merging with a hierarchical homogeneous company. We are flat and diverse. Both sides are suspicious." },
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
  { id: "scanner", icon: "🔍", title: "AI Readiness Scanner", desc: "Assess your organization readiness to deploy AI equitably. Full risk report.", tag: "Enterprise" },
  { id: "coach", icon: "💬", title: "Leadership Coach", desc: "Ongoing conversational coaching across five modes. Remembers your goals.", tag: "AI-Powered" },
  { id: "360", icon: "🔄", title: "360 Feedback", desc: "Collect team ratings, see self vs team gaps, get AI gap analysis.", tag: "Team" },
];

async function callAPI(sys, prompt, maxTok = 1000) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: maxTok, system: sys, messages: [{ role: "user", content: prompt }] }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content?.map(b => b.text || "").join("\n") || "No response.";
}

async function callAPIHistory(sys, messages, maxTok = 600) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: maxTok, system: sys, messages }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content?.map(b => b.text || "").join("\n") || "No response.";
}

function RenderMd({ text }) {
  return (
    <>
      {text.split("\n").map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: 8 }} />;
        if (line.startsWith("---")) return <hr key={i} style={{ border: "none", borderTop: `1px solid ${G}15`, margin: "16px 0" }} />;
        if (line.startsWith("## ")) return <div key={i} style={{ fontSize: 18, fontWeight: 700, color: G, marginTop: 20, marginBottom: 8, fontFamily: "'Cormorant Garamond',serif" }}>{line.slice(3)}</div>;
        if (line.startsWith("### ")) return <div key={i} style={{ fontSize: 15, fontWeight: 700, color: L, marginTop: 16, marginBottom: 6 }}>{line.slice(4)}</div>;
        if (line.startsWith("> ")) return <div key={i} style={{ fontSize: 13, color: "#a78bfa", background: "#7c3aed10", borderLeft: "3px solid #7c3aed", padding: "8px 14px", margin: "6px 0", borderRadius: "0 6px 6px 0", fontStyle: "italic", lineHeight: 1.6 }}>{line.slice(2)}</div>;
        if (line.startsWith("- ")) {
          let c = T;
          if (line.includes("IAC") || line.includes("🔷")) c = "#60a5fa";
          else if (line.includes("PS") || line.includes("🟢")) c = "#34d399";
          else if (line.includes("ECF") || line.includes("🔴")) c = "#f87171";
          else if (line.includes("Safety") || line.includes("🟣")) c = "#a78bfa";
          return <div key={i} style={{ fontSize: 13, color: c, lineHeight: 1.7, marginBottom: 4, paddingLeft: 14, position: "relative" }}><span style={{ position: "absolute", left: 0, color: G }}>•</span>{line.slice(2)}</div>;
        }
        if (/^\d+\./.test(line)) return <div key={i} style={{ fontSize: 13, color: L, lineHeight: 1.7, marginBottom: 6, paddingLeft: 4 }}>{line}</div>;
        if (line.includes("**")) {
          const parts = line.split(/\*\*(.+?)\*\*/g);
          return <div key={i} style={{ fontSize: 13, color: T, lineHeight: 1.7, marginBottom: 4 }}>{parts.map((s, j) => j % 2 === 1 ? <strong key={j} style={{ color: L }}>{s}</strong> : s)}</div>;
        }
        return <div key={i} style={{ fontSize: 13, color: T, lineHeight: 1.7, marginBottom: 4 }}>{line}</div>;
      })}
    </>
  );
}

function AdvisorTool({ onBack }) {
  const [scenario, setScenario] = useState("");
  const [resp, setResp] = useState("");
  const [load, setLoad] = useState(false);
  const run = useCallback((prompt) => {
    setLoad(true); setResp("");
    callAPI(ADVISOR_SYS, prompt).then(r => { setResp(r); setLoad(false); }).catch(e => { setResp("Error: " + e.message); setLoad(false); });
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="AILT Leadership Advisor" subtitle="Scenario analysis through AILT constructs" onBack={onBack} />
      <div style={{ padding: "16px 24px", flexShrink: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
          {PRESETS.map((p, i) => (
            <button key={i} onClick={() => { setScenario(p.prompt); run(p.prompt); }}
              style={{ background: D3, border: `1px solid ${G}15`, borderRadius: 8, padding: "10px 12px", cursor: "pointer", textAlign: "left" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = G + "40"}
              onMouseLeave={e => e.currentTarget.style.borderColor = G + "15"}>
              <span style={{ fontSize: 16 }}>{p.icon}</span>
              <div style={{ fontSize: 11, fontWeight: 600, color: L, marginTop: 4 }}>{p.label}</div>
            </button>
          ))}
        </div>
        <div style={{ position: "relative" }}>
          <textarea value={scenario} onChange={e => setScenario(e.target.value)}
            placeholder="Describe your leadership scenario..." rows={3} style={{ ...IS, paddingBottom: 44, resize: "none" }} />
          <button onClick={() => run(scenario)} disabled={load || !scenario.trim()}
            style={{ position: "absolute", bottom: 10, right: 10, background: load ? T : `linear-gradient(135deg,${G},#a88a28)`, color: D, border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 12, fontWeight: 700, cursor: load ? "wait" : "pointer", opacity: !scenario.trim() ? 0.4 : 1 }}>
            {load ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "0 24px 24px" }}>
        {load && !resp && <Loading text="Analyzing through the AILT framework..." />}
        {resp && <Card><RenderMd text={resp} /></Card>}
      </div>
    </div>
  );
}

function AssessmentTool({ onBack }) {
  const [scores, setScores] = useState({});
  const [view, setView] = useState("take");
  const getScore = (dim) => {
    let tot = 0, ans = 0;
    ASSESS_ITEMS[dim].items.forEach((_, i) => { const k = `${dim}-${i}`; if (scores[k]) { tot += scores[k]; ans++; } });
    return { tot, ans, max: ASSESS_ITEMS[dim].items.length * 5, pct: ans > 0 ? Math.round((tot / (ans * 5)) * 100) : 0 };
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="AILT Self-Assessment" subtitle="40 items across four dimensions" onBack={onBack} />
      <div style={{ padding: "12px 24px", borderBottom: `1px solid ${D3}`, display: "flex", gap: 8, justifyContent: "center", flexShrink: 0 }}>
        {["take","results"].map(v => (
          <button key={v} onClick={() => setView(v)} style={{ background: view === v ? G : D2, color: view === v ? D : T, border: `1px solid ${view === v ? G : G+"20"}`, padding: "8px 24px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {v === "take" ? "Take Assessment" : "View Results"}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
        {view === "take" && Object.entries(ASSESS_ITEMS).map(([dim, data]) => (
          <Card key={dim} style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: data.color }} />
              <h3 style={{ fontSize: 14, fontWeight: 700, color: L }}>{data.title}</h3>
              <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: data.color }}>{getScore(dim).tot}/{getScore(dim).max}</span>
            </div>
            {data.items.map((item, i) => {
              const k = `${dim}-${i}`;
              return (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10, paddingBottom: 10, borderBottom: i < data.items.length - 1 ? `1px solid ${G}06` : "none" }}>
                  <span style={{ fontSize: 11, color: T, fontWeight: 600, minWidth: 18, marginTop: 4 }}>{i+1}.</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: L, lineHeight: 1.5, marginBottom: 6 }}>{item}</div>
                    <div style={{ display: "flex", gap: 5 }}>
                      {[1,2,3,4,5].map(v => (
                        <button key={v} onClick={() => setScores(s => ({ ...s, [k]: v }))}
                          style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${scores[k]===v?data.color:D3}`, background: scores[k]===v?data.color+"20":"transparent", color: scores[k]===v?data.color:T, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{v}</button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </Card>
        ))}
        {view === "results" && (
          <Card>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: L, marginBottom: 20, fontFamily: "'Cormorant Garamond',serif" }}>Your AILT Profile</h3>
            {Object.entries(ASSESS_ITEMS).map(([dim, data]) => {
              const s = getScore(dim);
              const lv = s.pct>=80?"Strong":s.pct>=60?"Developing":s.pct>=40?"Emerging":s.ans===0?"Not taken":"Beginning";
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
          </Card>
        )}
      </div>
    </div>
  );
}

function MeetingTool({ onBack }) {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("strategy");
  const [duration, setDuration] = useState("60");
  const [participants, setParticipants] = useState("6-10");
  const [context, setContext] = useState("");
  const [resp, setResp] = useState("");
  const [load, setLoad] = useState(false);
  const design = () => {
    setLoad(true); setResp("");
    const typLabel = MEETING_TYPES.find(t => t.v === type)?.l;
    callAPI(MEETING_SYS, `Design AILT meeting:\nTopic: ${topic}\nType: ${typLabel}\nDuration: ${duration} min\nParticipants: ${participants}\nContext: ${context}`, 2000)
      .then(r => { setResp(r); setLoad(false); }).catch(e => { setResp("Error: " + e.message); setLoad(false); });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="Meeting Architect" subtitle="AILT-aligned meeting design" onBack={onBack} />
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${D3}`, flexShrink: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
          <div><label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Topic</label><input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., Q3 AI review" style={IS} /></div>
          <div><label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Type</label><select value={type} onChange={e => setType(e.target.value)} style={{ ...IS, appearance: "none" }}>{MEETING_TYPES.map(t => <option key={t.v} value={t.v}>{t.l}</option>)}</select></div>
          <div><label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Duration (min)</label><input value={duration} onChange={e => setDuration(e.target.value)} placeholder="60" style={IS} /></div>
          <div><label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 4 }}>People</label><input value={participants} onChange={e => setParticipants(e.target.value)} placeholder="6-10" style={IS} /></div>
        </div>
        <div style={{ position: "relative" }}>
          <textarea value={context} onChange={e => setContext(e.target.value)} placeholder="Context: tensions, stakes, who is in the room..." rows={2} style={{ ...IS, paddingBottom: 44, resize: "none" }} />
          <button onClick={design} disabled={load || (!topic.trim() && !context.trim())}
            style={{ position: "absolute", bottom: 10, right: 10, background: load?T:`linear-gradient(135deg,${G},#a88a28)`, color: D, border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 12, fontWeight: 700, cursor: load?"wait":"pointer", opacity:(!topic.trim()&&!context.trim())?0.4:1 }}>
            {load ? "Designing..." : "Design Meeting"}
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "16px 24px" }}>
        {load && !resp && <Loading text="Designing your AILT-aligned meeting..." />}
        {resp && <Card><RenderMd text={resp} /></Card>}
        {!resp && !load && <div style={{ textAlign: "center", padding: "60px 20px", color: T, fontSize: 14 }}>Fill in your meeting details and click Design Meeting.</div>}
      </div>
    </div>
  );
}

function ScannerTool({ onBack }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [orgName, setOrgName] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("");
  const [context, setContext] = useState("");
  const [report, setReport] = useState("");
  const [load, setLoad] = useState(false);
  const [catIdx, setCatIdx] = useState(0);

  const buildPrompt = () => {
    let p = `Organization: ${orgName||"Anonymous"}\nIndustry: ${industry||"Not specified"}\nSize: ${size||"Not specified"}\nContext: ${context||"None"}\n\nAssessment Responses:\n`;
    SCANNER_QUESTIONS.forEach(cat => {
      p += `\n${cat.category}:\n`;
      cat.questions.forEach((q, i) => { p += `- ${q}\n  Response: ${answers[`${cat.category}-${i}`]||"No answer provided"}\n`; });
    });
    return p;
  };

  const currentCat = SCANNER_QUESTIONS[catIdx];
  const catAnswered = currentCat.questions.filter((_, i) => answers[`${currentCat.category}-${i}`]?.trim()).length;
  const allCatAnswered = catAnswered === currentCat.questions.length;
  const isLast = catIdx === SCANNER_QUESTIONS.length - 1;
  const allAnswered = SCANNER_QUESTIONS.every(cat => cat.questions.every((_, i) => answers[`${cat.category}-${i}`]?.trim()));

  if (step === 0) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="AI Readiness Scanner" subtitle="Enterprise equity risk assessment" onBack={onBack} />
      <div style={{ flex: 1, overflow: "auto", padding: 32 }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: L, fontFamily: "'Cormorant Garamond',serif", marginBottom: 8 }}>Is Your Organization Ready to Deploy AI Equitably?</h2>
            <p style={{ fontSize: 14, color: T, lineHeight: 1.7 }}>15 questions across 5 AILT risk categories. Takes 5 minutes. Get a full risk report with a 90-day action plan.</p>
          </div>
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div><label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Organization Name (optional)</label><input value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="e.g., Acme Corp" style={IS} /></div>
              <div><label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Industry</label><input value={industry} onChange={e => setIndustry(e.target.value)} placeholder="e.g., Healthcare, Finance, Retail..." style={IS} /></div>
              <div><label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Organization Size</label>
                <select value={size} onChange={e => setSize(e.target.value)} style={{ ...IS, appearance: "none" }}>
                  <option value="">Select size...</option>
                  <option>Under 50 employees</option><option>50 to 250 employees</option>
                  <option>250 to 1000 employees</option><option>1000 to 10000 employees</option><option>10000 plus employees</option>
                </select>
              </div>
              <div><label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 6 }}>What AI tools are you using or considering?</label>
                <textarea value={context} onChange={e => setContext(e.target.value)} placeholder="e.g., AI resume screening, performance management AI, chatbots..." rows={3} style={{ ...IS, resize: "none" }} />
              </div>
              <button onClick={() => setStep(1)} style={{ background: `linear-gradient(135deg,${G},#a88a28)`, color: D, border: "none", borderRadius: 10, padding: 14, fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>Begin Assessment →</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  if (step === 1) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="AI Readiness Scanner" subtitle={`Category ${catIdx+1} of ${SCANNER_QUESTIONS.length}`} onBack={onBack} />
      <div style={{ padding: "12px 24px", borderBottom: `1px solid ${D3}`, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
          {SCANNER_QUESTIONS.map((c, i) => {
            const done = c.questions.every((_, qi) => answers[`${c.category}-${qi}`]?.trim());
            return <div key={i} onClick={() => setCatIdx(i)} style={{ flex: 1, height: 4, borderRadius: 2, background: done?c.color:i===catIdx?c.color+"60":D3, cursor: "pointer" }} />;
          })}
        </div>
        <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
          {SCANNER_QUESTIONS.map((c, i) => (
            <button key={i} onClick={() => setCatIdx(i)} style={{ whiteSpace: "nowrap", fontSize: 11, padding: "5px 10px", borderRadius: 6, border: `1px solid ${i===catIdx?c.color:D3}`, background: i===catIdx?c.color+"15":"transparent", color: i===catIdx?c.color:T, cursor: "pointer" }}>
              {c.icon} {c.category}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 22 }}>{currentCat.icon}</span>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: L }}>{currentCat.category}</h3>
          <span style={{ marginLeft: "auto", fontSize: 12, color: currentCat.color, fontWeight: 600 }}>{catAnswered}/{currentCat.questions.length}</span>
        </div>
        {currentCat.questions.map((q, i) => {
          const key = `${currentCat.category}-${i}`;
          return (
            <Card key={i} style={{ marginBottom: 14, border: answers[key]?.trim()?`1px solid ${currentCat.color}30`:`1px solid ${G}08` }}>
              <div style={{ fontSize: 13, color: L, lineHeight: 1.6, marginBottom: 14 }}>{i+1}. {q}</div>
              <textarea
                value={answers[key] || ""}
                onChange={e => { const val = e.target.value; setAnswers(prev => ({ ...prev, [key]: val })); }}
                placeholder="Describe your current state..."
                rows={2}
                style={{ ...IS, resize: "none", fontSize: 12 }}
              />
            </Card>
          );
        })}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          {catIdx > 0 && <button onClick={() => setCatIdx(p => p-1)} style={{ flex: 1, padding: 12, background: D2, border: `1px solid ${D3}`, borderRadius: 8, color: T, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Previous</button>}
          {!isLast && <button onClick={() => { if (allCatAnswered) setCatIdx(p => p+1); }} disabled={!allCatAnswered}
            style={{ flex: 1, padding: 12, background: allCatAnswered?`linear-gradient(135deg,${G},#a88a28)`:D3, border: "none", borderRadius: 8, color: allCatAnswered?D:T, fontSize: 13, fontWeight: 700, cursor: allCatAnswered?"pointer":"not-allowed" }}>
            Next Category →
          </button>}
          {isLast && <button onClick={() => {
            if (!allAnswered) return;
            setLoad(true); setStep(2);
            callAPI(SCANNER_SYS, buildPrompt(), 1200)
              .then(r => { setReport(r); setLoad(false); })
              .catch(e => { setReport("Error: " + e.message); setLoad(false); });
          }} disabled={!allAnswered}
            style={{ flex: 1, padding: 12, background: allAnswered?`linear-gradient(135deg,${G},#a88a28)`:D3, border: "none", borderRadius: 8, color: allAnswered?D:T, fontSize: 13, fontWeight: 700, cursor: allAnswered?"pointer":"not-allowed" }}>
            Generate Risk Report
          </button>}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="AI Readiness Scanner" subtitle="Risk assessment complete" onBack={onBack} />
      <div style={{ flex: 1, overflow: "auto", padding: "20px 24px" }}>
        {load && <Loading text="Analyzing organizational readiness across AILT dimensions..." />}
        {report && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: L, fontFamily: "'Cormorant Garamond',serif" }}>{orgName?`${orgName} — `:""}AI Readiness Report</h3>
              <button onClick={() => { setStep(0); setCatIdx(0); setAnswers({}); setReport(""); }} style={{ fontSize: 11, padding: "6px 12px", background: D2, border: `1px solid ${D3}`, borderRadius: 6, color: T, cursor: "pointer" }}>Start Over</button>
            </div>
            <Card><RenderMd text={report} /></Card>
          </>
        )}
      </div>
    </div>
  );
}

function CoachTool({ onBack }) {
  const [mode, setMode] = useState("reflect");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [load, setLoad] = useState(false);
  const [goal, setGoal] = useState("");
  const [started, setStarted] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || load) return;
    const userMsg = input.trim();
    setInput("");
    setLoad(true);
    const updated = [...messages, { role: "user", content: userMsg }];
    setMessages(updated);
    const modeLabel = COACH_MODES.find(m => m.id === mode)?.label || mode;
    const sys = `${COACH_SYS}\n\nCurrent mode: ${modeLabel.toUpperCase()}.\nLeader goal: ${goal||"Not specified"}.`;
    try {
      const reply = await callAPIHistory(sys, updated, 600);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch(e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setLoad(false);
  };

  const startSession = () => {
    setStarted(true); setLoad(true);
    const modeLabel = COACH_MODES.find(m => m.id === mode)?.label || mode;
    const sys = `${COACH_SYS}\n\nMode: ${modeLabel.toUpperCase()}.\nGoal: ${goal||"general AILT development"}.`;
    callAPIHistory(sys, [{ role: "user", content: `Start our ${modeLabel} coaching session. My goal: ${goal||"to develop as an AILT leader"}. Open with one tailored question.` }], 400)
      .then(r => { setMessages([{ role: "assistant", content: r }]); setLoad(false); })
      .catch(() => { setMessages([{ role: "assistant", content: "Could not connect. Please try again." }]); setLoad(false); });
  };

  if (!started) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="Leadership Coach" subtitle="AILT-grounded conversational coaching" onBack={onBack} />
      <div style={{ flex: 1, overflow: "auto", padding: 32 }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: L, fontFamily: "'Cormorant Garamond',serif", marginBottom: 8 }}>Your AILT Leadership Coach</h2>
            <p style={{ fontSize: 14, color: T, lineHeight: 1.7 }}>Choose your mode, set your goal, and start talking.</p>
          </div>
          <Card style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 8 }}>What is your leadership development goal?</label>
            <textarea value={goal} onChange={e => setGoal(e.target.value)} placeholder="e.g., Build psychological safety on my team..." rows={3} style={{ ...IS, resize: "none" }} />
          </Card>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", marginBottom: 10 }}>Choose your coaching mode</div>
            {COACH_MODES.map(m => (
              <button key={m.id} onClick={() => setMode(m.id)} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", background: mode===m.id?G+"12":D2, border: `1px solid ${mode===m.id?G:D3}`, borderRadius: 10, cursor: "pointer", textAlign: "left", width: "100%", marginBottom: 8 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{m.icon}</span>
                <div><div style={{ fontSize: 13, fontWeight: 700, color: mode===m.id?G:L, marginBottom: 2 }}>{m.label}</div><div style={{ fontSize: 11, color: T }}>{m.desc}</div></div>
                {mode===m.id && <span style={{ marginLeft: "auto", color: G, fontSize: 16 }}>✓</span>}
              </button>
            ))}
          </div>
          <button onClick={startSession} style={{ width: "100%", padding: 14, background: `linear-gradient(135deg,${G},#a88a28)`, border: "none", borderRadius: 10, color: D, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Start Coaching Session →</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="Leadership Coach" subtitle={`${COACH_MODES.find(m=>m.id===mode)?.icon} ${COACH_MODES.find(m=>m.id===mode)?.label} Mode`} onBack={onBack} />
      <div style={{ padding: "8px 16px", borderBottom: `1px solid ${D3}`, display: "flex", gap: 6, overflowX: "auto", flexShrink: 0 }}>
        {COACH_MODES.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={{ whiteSpace: "nowrap", fontSize: 11, padding: "5px 10px", borderRadius: 6, border: `1px solid ${mode===m.id?G:D3}`, background: mode===m.id?G+"15":"transparent", color: mode===m.id?G:T, cursor: "pointer" }}>{m.icon} {m.label}</button>
        ))}
        <button onClick={() => { setStarted(false); setMessages([]); setGoal(""); setInput(""); }} style={{ marginLeft: "auto", whiteSpace: "nowrap", fontSize: 11, padding: "5px 10px", borderRadius: 6, border: `1px solid ${D3}`, background: "transparent", color: T, cursor: "pointer" }}>New Session</button>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role==="user"?"flex-end":"flex-start" }}>
            {msg.role==="assistant" && <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg,${G},#8b6914)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: D, flexShrink: 0, marginRight: 10, marginTop: 4 }}>A</div>}
            <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: msg.role==="user"?"16px 16px 4px 16px":"4px 16px 16px 16px", background: msg.role==="user"?G+"20":D2, border: `1px solid ${msg.role==="user"?G+"30":D3}`, fontSize: 13, color: L, lineHeight: 1.7 }}>
              {msg.role==="assistant"?<RenderMd text={msg.content}/>:msg.content}
            </div>
          </div>
        ))}
        {load && <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg,${G},#8b6914)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: D }}>A</div><Loading text="Thinking..." /></div>}
        <div ref={endRef} />
      </div>
      <div style={{ padding: "12px 20px", borderTop: `1px solid ${D3}`, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();} }}
            placeholder="Respond to your coach... (Enter to send, Shift+Enter for new line)" rows={2} style={{ ...IS, resize: "none", flex: 1 }} />
          <button onClick={send} disabled={load||!input.trim()} style={{ padding: "0 20px", background: load||!input.trim()?D3:`linear-gradient(135deg,${G},#a88a28)`, border: "none", borderRadius: 8, color: load||!input.trim()?T:D, fontSize: 18, cursor: load||!input.trim()?"not-allowed":"pointer", flexShrink: 0 }}>→</button>
        </div>
      </div>
    </div>
  );
}

function FeedbackTool({ onBack }) {
  const [step, setStep] = useState(0);
  const [selfScores, setSelfScores] = useState({});
  const [teamScores, setTeamScores] = useState({});
  const [leaderName, setLeaderName] = useState("");
  const [raterName, setRaterName] = useState("");
  const [report, setReport] = useState("");
  const [load, setLoad] = useState(false);
  const code = useRef(Math.random().toString(36).substring(2,8).toUpperCase()).current;

  const SHORT = { iac: ASSESS_ITEMS.iac.items.slice(0,5), ps: ASSESS_ITEMS.ps.items.slice(0,5), ecf: ASSESS_ITEMS.ecf.items.slice(0,5), psy: ASSESS_ITEMS.psy.items.slice(0,5) };
  const getPct = (scores, dim) => {
    const keys = SHORT[dim].map((_,i)=>`${dim}-${i}`);
    const filled = keys.filter(k=>scores[k]);
    if(!filled.length) return 0;
    return Math.round(filled.reduce((a,k)=>a+scores[k],0)/filled.length*20);
  };
  const selfFilled = Object.keys(selfScores).length;
  const teamFilled = Object.keys(teamScores).length;
  const total = 20;

  const ScoreSection = ({ dim, scores, setScores }) => {
    const data = ASSESS_ITEMS[dim];
    return (
      <Card style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: data.color }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: L }}>{data.title}</span>
        </div>
        {SHORT[dim].map((item, i) => {
          const k = `${dim}-${i}`;
          return (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8, paddingBottom: 8, borderBottom: i<SHORT[dim].length-1?`1px solid ${G}06`:"none" }}>
              <span style={{ fontSize: 11, color: T, minWidth: 16, marginTop: 4 }}>{i+1}.</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: L, lineHeight: 1.5, marginBottom: 5 }}>{item}</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {[1,2,3,4,5].map(v => (
                    <button key={v} onClick={() => setScores(s=>({...s,[k]:v}))}
                      style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${scores[k]===v?data.color:D3}`, background: scores[k]===v?data.color+"20":"transparent", color: scores[k]===v?data.color:T, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{v}</button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    );
  };

  if (step===0) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="360 Feedback" subtitle="Self vs team gap analysis" onBack={onBack} />
      <div style={{ flex: 1, overflow: "auto", padding: 32 }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔄</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: L, fontFamily: "'Cormorant Garamond',serif", marginBottom: 8 }}>AILT 360 Feedback</h2>
            <p style={{ fontSize: 14, color: T, lineHeight: 1.7 }}>Rate yourself across 20 AILT behaviors, enter team ratings, and get an AI gap analysis.</p>
          </div>
          <Card style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Your Name (leader being rated)</label>
            <input value={leaderName} onChange={e => setLeaderName(e.target.value)} placeholder="e.g., Alex Johnson" style={IS} />
          </Card>
          <button onClick={() => { if(leaderName.trim()) setStep(1); }} disabled={!leaderName.trim()}
            style={{ width: "100%", padding: 14, background: leaderName.trim()?`linear-gradient(135deg,${G},#a88a28)`:D3, border: "none", borderRadius: 10, color: leaderName.trim()?D:T, fontSize: 14, fontWeight: 700, cursor: leaderName.trim()?"pointer":"not-allowed" }}>
            Start Self-Assessment →
          </button>
        </div>
      </div>
    </div>
  );

  if (step===1) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="360 Feedback" subtitle={`Self-Assessment — ${selfFilled}/${total}`} onBack={onBack} />
      <div style={{ padding: "8px 24px", borderBottom: `1px solid ${D3}`, flexShrink: 0 }}>
        <div style={{ height: 4, background: D3, borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(selfFilled/total)*100}%`, background: G, borderRadius: 2, transition: "width 0.3s" }} />
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "16px 24px" }}>
        <div style={{ fontSize: 13, color: T, marginBottom: 16 }}>Rate yourself honestly — 1 (rarely) to 5 (consistently).</div>
        {Object.keys(SHORT).map(dim => <ScoreSection key={dim} dim={dim} scores={selfScores} setScores={setSelfScores} />)}
        <button onClick={() => { if(selfFilled>=total) setStep(2); }} disabled={selfFilled<total}
          style={{ width: "100%", padding: 14, background: selfFilled>=total?`linear-gradient(135deg,${G},#a88a28)`:D3, border: "none", borderRadius: 10, color: selfFilled>=total?D:T, fontSize: 14, fontWeight: 700, cursor: selfFilled>=total?"pointer":"not-allowed", marginTop: 8 }}>
          {selfFilled<total?`Complete ${total-selfFilled} remaining items`:"Continue to Team Rating →"}
        </button>
      </div>
    </div>
  );

  if (step===2) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="360 Feedback" subtitle="Team Ratings" onBack={onBack} />
      <div style={{ flex: 1, overflow: "auto", padding: "16px 24px" }}>
        <Card style={{ marginBottom: 20, border: `1px solid ${G}30` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Session Code for {leaderName}</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: L, fontFamily: "monospace", letterSpacing: 8, marginBottom: 8 }}>{code}</div>
          <div style={{ fontSize: 12, color: T, lineHeight: 1.6 }}>Enter team ratings below to generate your gap analysis.</div>
        </Card>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: T, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Rater Name (optional)</label>
          <input value={raterName} onChange={e => setRaterName(e.target.value)} placeholder="e.g., Anonymous team member" style={{ ...IS, maxWidth: 320 }} />
        </div>
        <div style={{ fontSize: 13, color: T, marginBottom: 16 }}>Rate {leaderName} as a team member would:</div>
        {Object.keys(SHORT).map(dim => <ScoreSection key={dim} dim={dim} scores={teamScores} setScores={setTeamScores} />)}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button onClick={() => setStep(1)} style={{ flex: 1, padding: 12, background: D2, border: `1px solid ${D3}`, borderRadius: 8, color: T, cursor: "pointer", fontSize: 13 }}>Back</button>
          <button onClick={() => {
            if(teamFilled<total) return;
            setLoad(true); setStep(3);
            const sp = Object.keys(ASSESS_ITEMS).map(d=>`${ASSESS_ITEMS[d].title}: ${getPct(selfScores,d)}%`).join(", ");
            const tp = Object.keys(ASSESS_ITEMS).map(d=>`${ASSESS_ITEMS[d].title}: ${getPct(teamScores,d)}%`).join(", ");
            callAPI(FEEDBACK_SYS, `Leader: ${leaderName}\nSelf scores: ${sp}\nTeam scores: ${tp}\nRater: ${raterName||"Anonymous"}`, 900)
              .then(r=>{setReport(r);setLoad(false);}).catch(e=>{setReport("Error: "+e.message);setLoad(false);});
          }} disabled={teamFilled<total}
            style={{ flex: 2, padding: 12, background: teamFilled>=total?`linear-gradient(135deg,${G},#a88a28)`:D3, border: "none", borderRadius: 8, color: teamFilled>=total?D:T, fontSize: 13, fontWeight: 700, cursor: teamFilled>=total?"pointer":"not-allowed" }}>
            Generate Gap Analysis
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ToolHeader title="360 Feedback" subtitle={`${leaderName} — Gap Analysis`} onBack={onBack} />
      <div style={{ flex: 1, overflow: "auto", padding: "16px 24px" }}>
        <Card style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: L, marginBottom: 16, fontFamily: "'Cormorant Garamond',serif" }}>Self vs. Team Perception</div>
          {Object.keys(ASSESS_ITEMS).map(dim => {
            const data = ASSESS_ITEMS[dim];
            const self = getPct(selfScores,dim);
            const team = getPct(teamScores,dim);
            const gap = self-team;
            return (
              <div key={dim} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: L }}>{data.title}</span>
                  <span style={{ fontSize: 11, color: Math.abs(gap)>10?"#f87171":T, fontWeight: 600 }}>{gap>0?"+":""}{gap} pts</span>
                </div>
                <div style={{ position: "relative", height: 20 }}>
                  <div style={{ position: "absolute", inset: 0, background: D3, borderRadius: 4 }} />
                  <div style={{ position: "absolute", top: 2, left: 0, height: "calc(100% - 4px)", width: `${self}%`, background: data.color+"50", borderRadius: 3, transition: "width 0.8s" }} />
                  <div style={{ position: "absolute", top: 5, left: 0, height: "calc(100% - 10px)", width: `${team}%`, background: data.color, borderRadius: 2, transition: "width 0.8s" }} />
                  <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", fontSize: 10, color: L, fontWeight: 600 }}>{self}% / {team}%</div>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: T }}>Self: {self}%</span>
                  <span style={{ fontSize: 10, color: data.color }}>Team: {team}%</span>
                </div>
              </div>
            );
          })}
        </Card>
        {load && <Loading text="Generating AILT gap analysis..." />}
        {report && <Card><RenderMd text={report} /></Card>}
        <button onClick={()=>{setStep(0);setSelfScores({});setTeamScores({});setReport("");setLeaderName("");setRaterName("");}}
          style={{ width: "100%", padding: 12, background: D2, border: `1px solid ${D3}`, borderRadius: 8, color: T, cursor: "pointer", fontSize: 13, marginTop: 16 }}>Start New Session</button>
      </div>
    </div>
  );
}

export default function AILTSite() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [contact, setContact] = useState({ name: "", email: "", msg: "" });
  const [contactSent, setContactSent] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState("");

  const submitContact = async () => {
    if (!contact.name || !contact.email || !contact.msg) return;
    setContactLoading(true);
    setContactError("");
    try {
      const res = await fetch("https://formspree.io/f/xpqkwnlk", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: contact.name, email: contact.email, message: contact.msg }),
      });
      if (res.ok) { setContactSent(true); } else { setContactError("Something went wrong. Please try again."); }
    } catch { setContactError("Could not connect. Please try again."); }
    setContactLoading(false);
  };

  const mainRef = useRef(null);
  useEffect(() => {
    const el = mainRef.current; if (!el) return;
    const h = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", h); return () => el.removeEventListener("scroll", h);
  }, []);
  useEffect(() => { if (mainRef.current) mainRef.current.scrollTop = 0; }, [page]);
  const go = (id) => { if (page==="home") document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const back = useCallback(() => setPage("home"), []);
  const W = (child) => <div style={{ height: "100vh", background: D, color: L, fontFamily: "'Outfit',sans-serif", display: "flex", flexDirection: "column" }}>{child}</div>;

  if (page==="advisor")    return W(<AdvisorTool onBack={back} />);
  if (page==="assessment") return W(<AssessmentTool onBack={back} />);
  if (page==="meeting")    return W(<MeetingTool onBack={back} />);
  if (page==="scanner")    return W(<ScannerTool onBack={back} />);
  if (page==="coach")      return W(<CoachTool onBack={back} />);
  if (page==="360")        return W(<FeedbackTool onBack={back} />);

  return (
    <div style={{ height: "100vh", overflow: "hidden", background: D, color: L, fontFamily: "'Outfit',sans-serif" }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled?D+"ee":"transparent", backdropFilter: scrolled?"blur(20px)":"none", borderBottom: scrolled?`1px solid ${G}15`:"none", transition: "all 0.4s", padding: "0 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => { setPage("home"); if(mainRef.current) mainRef.current.scrollTop=0; }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${G},#8b6914)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: D }}>A</div>
            <span style={{ fontSize: 15, fontWeight: 700, color: L }}>AILT</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["theory","evidence","book","tools","course","about","contact"].map(n => (
              <button key={n} onClick={() => go(n)} style={{ background: "none", border: "none", color: T, fontSize: 12, fontWeight: 600, padding: "8px 10px", cursor: "pointer", textTransform: "capitalize" }}>{n}</button>
            ))}
          </div>
        </div>
      </nav>

      <main ref={mainRef} style={{ height: "100vh", overflowY: "auto", scrollBehavior: "smooth" }}>
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "80px 40px" }}>
          <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, background: `radial-gradient(circle,${G}08 0%,transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ textAlign: "center", maxWidth: 800, position: "relative", zIndex: 1 }}>
            <FI><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: G, textTransform: "uppercase", marginBottom: 16 }}>Adaptive Inclusive Leadership Theory</div></FI>
            <FI delay={0.15}><h1 style={{ fontSize: 48, fontWeight: 300, color: L, fontFamily: "'Cormorant Garamond',serif", lineHeight: 1.15, marginBottom: 20 }}>Leadership for the<br /><span style={{ fontWeight: 700, fontStyle: "italic" }}>Age of AI</span></h1></FI>
            <FI delay={0.3}><p style={{ fontSize: 17, color: T, lineHeight: 1.7, maxWidth: 600, margin: "0 auto 32px" }}>When algorithms make decisions that were once exclusively human, organizations need a framework that governs transformation equitably.</p></FI>
            <FI delay={0.45}><div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => go("tools")} style={{ background: `linear-gradient(135deg,${G},#a88a28)`, color: D, border: "none", padding: "14px 32px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Explore the Tools</button>
              <button onClick={() => go("theory")} style={{ background: "transparent", color: G, border: `1px solid ${G}40`, padding: "14px 32px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Learn the Theory</button>
            </div></FI>
          </div>
        </section>

        <section style={{ background: D2, borderTop: `1px solid ${G}10`, borderBottom: `1px solid ${G}10`, padding: "36px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, textAlign: "center" }}>
            {[{n:"39948",s:"+",l:"Participants in evidence base"},{n:"105",s:"",l:"Independent samples"},{n:"5",s:"",l:"Testable propositions"},{n:"541",s:"",l:"Verified references"}].map((s,i)=>(
              <FI key={i} delay={i*0.1}>
                <div style={{ fontSize: 28, fontWeight: 700, color: G, fontFamily: "'Cormorant Garamond',serif" }}><AnimNum value={s.n} suffix={s.s} /></div>
                <div style={{ fontSize: 11, color: T, marginTop: 4 }}>{s.l}</div>
              </FI>
            ))}
          </div>
        </section>

        <section id="theory" style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
          <SectionTitle tag="The Framework" title="Three Constructs, One Mediating Mechanism" sub="Adaptability and inclusivity are interdependent capacities with psychological safety as the bridge." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {[
              {tag:"Construct 1",t:"Inclusive Adaptive Capacity",a:"IAC",c:"#2563eb",lv:"Organizational",d:"Responding to complex challenges by integrating diverse perspectives. In the AI age: ensuring diverse stakeholders govern AI systems."},
              {tag:"Construct 2",t:"Participatory Sensemaking",a:"PS",c:"#0d9488",lv:"Team",d:"Collective interpretation of ambiguity. When AI produces opaque recommendations, diverse teams must interpret outputs together."},
              {tag:"Construct 3",t:"Equity-Centered Flexibility",a:"ECF",c:"#dc2626",lv:"Cross-Level",d:"Adapting structures during change while advancing equity. Monitoring AI differential impacts and ensuring equitable access."},
              {tag:"Mediator",t:"Psychological Safety",a:"PS*",c:"#7c3aed",lv:"Foundation",d:"Shared belief the team is safe for risk-taking. Enables diverse voices and is reinforced when inclusive processes succeed."},
            ].map((c,i)=>(
              <FI key={i} delay={i*0.1}><Card>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: c.c, textTransform: "uppercase" }}>{c.tag}</div>
                  <div style={{ fontSize: 10, color: T, background: D3, padding: "3px 10px", borderRadius: 20 }}>{c.lv}</div>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: L, marginBottom: 4, fontFamily: "'Cormorant Garamond',serif" }}>{c.t} <span style={{ color: c.c, fontSize: 14 }}>({c.a})</span></h3>
                <p style={{ fontSize: 13, color: T, lineHeight: 1.7 }}>{c.d}</p>
              </Card></FI>
            ))}
          </div>
        </section>

        <section id="evidence" style={{ background: D2, padding: "100px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTitle tag="The Evidence" title="Built on Real Research" sub="Every claim grounded in verified meta-analyses and published research." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {[
                {c:"Li, Ling, & Zhu (2025)",s:"Asia Pacific J. of Management",st:"105 samples, N=39,948",f:"Inclusive leadership predicts performance, innovation, creativity, voice."},
                {c:"Frazier et al. (2017)",s:"Personnel Psychology",st:"136 samples, N>22,000",f:"Psychological safety meta-analysis confirming its role as enabler."},
                {c:"An et al. (2025)",s:"PNAS Nexus",st:"Large-scale experiment",f:"AI models systematically disadvantage Black male applicants."},
                {c:"Wang et al. (2014)",s:"J. of Applied Psychology",st:"42 samples",f:"Shared leadership predicts team effectiveness."},
                {c:"Kalinoski et al. (2013)",s:"J. of Applied Psychology",st:"65 studies",f:"Active learning outperforms passive diversity training."},
                {c:"Harter et al. (2002)",s:"J. of Applied Psychology",st:"7,939 units",f:"Engagement predicts profitability and customer satisfaction."},
              ].map((e,i)=>(
                <FI key={i} delay={i*0.08}><Card style={{ height: "100%" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 2 }}>{e.c}</div>
                  <div style={{ fontSize: 10, color: T, marginBottom: 8 }}>{e.s} • {e.st}</div>
                  <p style={{ fontSize: 12, color: T, lineHeight: 1.6 }}>{e.f}</p>
                </Card></FI>
              ))}
            </div>
          </div>
        </section>

        <section id="book" style={{ padding: "100px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTitle tag="The Book" title="Leadership for the Age of AI" sub="73,000 words of theory, evidence, case studies, and practical application." />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
              <FI><div style={{ background: `linear-gradient(135deg,${D2},${D3})`, border: `1px solid ${G}20`, borderRadius: 16, padding: 40, textAlign: "center" }}>
                <div style={{ fontSize: 80, marginBottom: 16 }}>📖</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: L, fontFamily: "'Cormorant Garamond',serif", marginBottom: 4 }}>Adaptive Inclusive<br />Leadership Theory</div>
                <div style={{ fontSize: 13, color: G, fontStyle: "italic" }}>by Matthew Culwell</div>
              </div></FI>
              <FI delay={0.15}><div>
                {["15 chapters with story-driven openings","Evidence from 100,000+ participants","10 For Your Organization application sections","AI governance cases: Amazon, iTutorGroup, Workday","52-item assessment + 541 verified references"].map((x,i)=>(
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                    <span style={{ color: G, marginTop: 2 }}>→</span>
                    <span style={{ fontSize: 14, color: T, lineHeight: 1.6 }}>{x}</span>
                  </div>
                ))}
                <a href="https://a.co/d/056JGgCx" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-block", marginTop: 16, background: `linear-gradient(135deg,${G},#a88a28)`, color: D, border: "none", padding: "12px 28px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", textDecoration: "none" }}>
                  Get the Book on Amazon →
                </a>
              </div></FI>
            </div>
          </div>
        </section>

        <section id="tools" style={{ background: D2, padding: "100px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTitle tag="Adaptive AI Suite" title="Leadership Tools Powered by AILT" sub="Six tools designed for leaders, consultants, and organizations navigating AI-driven transformation." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {TOOLS.map((t,i)=>(
                <FI key={i} delay={i*0.08}>
                  <button onClick={() => setPage(t.id)} style={{ background: D3, border: `1px solid ${G}15`, borderRadius: 12, padding: 24, cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.25s", position: "relative", overflow: "hidden" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=G;e.currentTarget.style.transform="translateY(-2px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=G+"15";e.currentTarget.style.transform="none";}}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${G},#a88a28)`, opacity: 0.5 }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <span style={{ fontSize: 28 }}>{t.icon}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: G, background: G+"15", padding: "3px 8px", borderRadius: 4, letterSpacing: 0.5, textTransform: "uppercase" }}>{t.tag}</span>
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

        <section id="course" style={{ padding: "100px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTitle tag="12-Week Program" title="AILT Leadership Course" sub="Professional development designed to build all three AILT constructs through structured practice, reflection, and peer learning." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {[
                {n:1,t:"Foundations of AILT",w:"1-2",d:"The case for integrating adaptability and inclusivity. Psychological safety as the foundation."},
                {n:2,t:"Inclusive Adaptive Capacity",w:"3-4",d:"Technical vs adaptive challenges. Building cognitive flexibility and diverse integration."},
                {n:3,t:"Participatory Sensemaking",w:"5-6",d:"Collective interpretation of ambiguity. Sensemaking in AI-augmented decision environments."},
                {n:4,t:"Equity-Centered Flexibility",w:"7-8",d:"Equity during organizational change. AI governance and the equity imperative."},
                {n:5,t:"AILT and AI Governance",w:"9-10",d:"Leading AI transformation with AILT. Sustaining inclusive governance in changing landscapes."},
                {n:6,t:"Capstone",w:"11-12",d:"Integration, 360 assessment, peer feedback, and personal AILT leadership development plan."},
              ].map((m,i)=>(
                <FI key={i} delay={i*0.08}><Card style={{ height: "100%", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${G},#a88a28)` }} />
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: G, textTransform: "uppercase", marginBottom: 4 }}>Module {m.n}</div>
                  <div style={{ fontSize: 10, color: T, marginBottom: 10 }}>Weeks {m.w}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: L, marginBottom: 8 }}>{m.t}</h3>
                  <p style={{ fontSize: 12, color: T, lineHeight: 1.6 }}>{m.d}</p>
                </Card></FI>
              ))}
            </div>
            <FI delay={0.5}><div style={{ textAlign: "center", marginTop: 40 }}>
              <button onClick={() => go("contact")} style={{ background: `linear-gradient(135deg,${G},#a88a28)`, color: D, border: "none", padding: "14px 32px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Inquire About Enrollment</button>
            </div></FI>
          </div>
        </section>

        <section style={{ background: D2, padding: "80px 40px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <FI><Card style={{ padding: 40 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: G, textTransform: "uppercase", marginBottom: 12 }}>Academic Research</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: L, fontFamily: "'Cormorant Garamond',serif", marginBottom: 8 }}>AILT: An Integrative Framework for Leading Through Algorithmic Transformation</h3>
              <p style={{ fontSize: 13, color: T, lineHeight: 1.7, marginBottom: 16 }}>Conceptual paper with five testable propositions grounded in meta-analytic evidence from 105 samples (N = 39,948).</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                {["55 references","7,287 words","5 propositions","Research agenda"].map((t,i)=>(
                  <span key={i} style={{ fontSize: 11, color: G, background: G+"15", padding: "4px 12px", borderRadius: 20, fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </Card></FI>
          </div>
        </section>

        <section id="about" style={{ padding: "100px 40px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <SectionTitle tag="About" title="Matthew Culwell" />
            <FI><Card style={{ padding: 32 }}>
              <p style={{ fontSize: 15, color: T, lineHeight: 1.8, marginBottom: 16 }}>Matthew Culwell is the creator of Adaptive Inclusive Leadership Theory and a doctoral researcher focused on the intersection of leadership, artificial intelligence, and organizational equity.</p>
              <p style={{ fontSize: 15, color: T, lineHeight: 1.8, marginBottom: 16 }}>An enrolled Chickasaw citizen, Matthew brings a perspective shaped by both Indigenous community values and modern organizational leadership. AILT emerged from the observation that existing theories treat adaptability and inclusivity as separate capabilities — a gap that becomes critical when algorithms make decisions once exclusively human.</p>
              <p style={{ fontSize: 15, color: T, lineHeight: 1.8 }}>The framework integrates these capacities with five testable propositions, grounded in evidence from over 100,000 participants.</p>
            </Card></FI>
          </div>
        </section>

        <section id="contact" style={{ background: D2, padding: "100px 40px" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <SectionTitle tag="Connect" title="Get in Touch" sub="Book, course, consulting, or speaking." />
            <FI><Card>
              {contactSent ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: G, fontFamily: "'Cormorant Garamond',serif", marginBottom: 8 }}>Message Sent</div>
                  <div style={{ fontSize: 14, color: T }}>Thank you for reaching out. Matthew will be in touch shortly.</div>
                  <button onClick={() => { setContactSent(false); setContact({name:"",email:"",msg:""}); setContactError(""); }} style={{ marginTop: 20, padding: "10px 20px", background: D3, border: `1px solid ${D3}`, borderRadius: 8, color: T, cursor: "pointer", fontSize: 13 }}>Send Another</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <input value={contact.name} onChange={e=>setContact(f=>({...f,name:e.target.value}))} placeholder="Your name" style={IS} />
                  <input value={contact.email} onChange={e=>setContact(f=>({...f,email:e.target.value}))} placeholder="Email address" style={IS} />
                  <textarea value={contact.msg} onChange={e=>setContact(f=>({...f,msg:e.target.value}))} placeholder="How can I help?" rows={5} style={{ ...IS, resize: "none" }} />
                  {contactError && <div style={{ fontSize: 12, color: "#f87171", padding: "8px 12px", background: "#f871711a", borderRadius: 6, border: "1px solid #f8717130" }}>{contactError}</div>}
                  <button onClick={submitContact} disabled={!contact.name||!contact.email||!contact.msg||contactLoading}
                    style={{ background: contact.name&&contact.email&&contact.msg&&!contactLoading?`linear-gradient(135deg,${G},#a88a28)`:D3, color: contact.name&&contact.email&&contact.msg&&!contactLoading?D:T, border: "none", padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: contact.name&&contact.email&&contact.msg&&!contactLoading?"pointer":"not-allowed", alignSelf: "flex-start" }}>
                    {contactLoading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              )}
            </Card></FI>
          </div>
        </section>

        <footer style={{ borderTop: `1px solid ${G}10`, padding: "24px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg,${G},#8b6914)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: D }}>A</div>
              <span style={{ fontSize: 12, color: T }}>Adaptive Inclusive Leadership Theory</span>
            </div>
            <div style={{ fontSize: 11, color: "#3a4252" }}>2026 Matthew Culwell. All rights reserved.</div>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes ailt-pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${G}20;border-radius:3px}
        input::placeholder,textarea::placeholder{color:#3a4252}
        ::selection{background:${G}30;color:${L}}
        select option{background:#0c1018}
      `}</style>
    </div>
  );
}

