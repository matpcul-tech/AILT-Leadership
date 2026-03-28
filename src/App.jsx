import { useState, useEffect, useRef } from "react";

const G = "#c8a434", GD = "#c8a43420", D = "#07090d", D2 = "#0c1018", D3 = "#111620", T = "#9ca3b4", L = "#e4ddd0";

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

function AnimNum({ value, suffix = "" }) {
  const [d, setD] = useState(0);
  const [ref, vis] = useInView(0.3);
  useEffect(() => {
    if (!vis) return;
    const n = parseInt(value.toString().replace(/\D/g, ""));
    if (isNaN(n)) { setD(value); return; }
    let s = 0; const step = Math.max(1, Math.floor(n / 120));
    const t = setInterval(() => { s += step; if (s >= n) { setD(n); clearInterval(t); } else setD(s); }, 16);
    return () => clearInterval(t);
  }, [vis, value]);
  return <span ref={ref}>{typeof d === "number" ? d.toLocaleString() : d}{suffix}</span>;
}

function FI({ children, delay = 0, dir = "up", style = {} }) {
  const [ref, v] = useInView(0.1);
  const tr = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(40px)", right: "translateX(-40px)", none: "none" };
  return <div ref={ref} style={{ ...style, opacity: v ? 1 : 0, transform: v ? "none" : tr[dir], transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>{children}</div>;
}

export default function AILTSite() {
  const [nav, setNav] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const el = mainRef.current; if (!el) return;
    const h = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", h); return () => el.removeEventListener("scroll", h);
  }, []);

  const go = (id) => { setNav(id); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const NAV = ["home", "theory", "evidence", "about", "courses", "contact"];
  const iS = { width: "100%", padding: "14px 16px", background: D2, border: `1px solid ${G}15`, borderRadius: 10, color: L, fontSize: 14, fontFamily: "'Outfit',sans-serif", outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ height: "100vh", background: D, color: T, fontFamily: "'Cormorant Garamond',Georgia,serif", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? D + "f0" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${G}15` : "1px solid transparent", transition: "all 0.4s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => go("home")}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: `linear-gradient(135deg,${G},#8b6914)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: D, fontFamily: "'Outfit',sans-serif" }}>A</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: L, fontFamily: "'Outfit',sans-serif", letterSpacing: 1 }}>AILT</div>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {NAV.map(n => <button key={n} onClick={() => go(n)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontFamily: "'Outfit',sans-serif", fontWeight: 500, letterSpacing: 0.5, color: nav === n ? G : T, textTransform: "capitalize", padding: 0 }}>{n}</button>)}
        </div>
      </nav>

      <div ref={mainRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {/* HERO */}
        <section id="home" style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "60px 40px" }}>
          <div style={{ position: "absolute", top: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${G}08,transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle,${G}05,transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg,transparent,transparent 100px,${G}03 100px,${G}03 101px)`, pointerEvents: "none" }} />
          <div style={{ maxWidth: 800, textAlign: "center", position: "relative", zIndex: 1 }}>
            <FI><div style={{ display: "inline-block", padding: "6px 20px", borderRadius: 24, border: `1px solid ${G}30`, background: GD, fontSize: 12, fontFamily: "'Outfit',sans-serif", fontWeight: 500, color: G, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 28 }}>A New Leadership Paradigm</div></FI>
            <FI delay={0.15}><h1 style={{ fontSize: 56, fontWeight: 300, color: L, lineHeight: 1.15, margin: "0 0 24px", letterSpacing: -1 }}>Leadership for the<br /><span style={{ fontWeight: 700, fontStyle: "italic", color: G }}>Age of AI</span></h1></FI>
            <FI delay={0.3}><p style={{ fontSize: 19, lineHeight: 1.75, color: T, maxWidth: 600, margin: "0 auto 36px" }}>Adaptive Inclusive Leadership Theory provides the human operating system that AI-powered organizations need to be both effective and equitable.</p></FI>
            <FI delay={0.45}>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => go("theory")} style={{ padding: "14px 32px", borderRadius: 8, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${G},#8b6914)`, color: D, fontSize: 14, fontFamily: "'Outfit',sans-serif", fontWeight: 600, transition: "transform 0.2s" }} onMouseEnter={e => e.target.style.transform = "translateY(-2px)"} onMouseLeave={e => e.target.style.transform = "none"}>Explore the Theory</button>
                <button onClick={() => go("evidence")} style={{ padding: "14px 32px", borderRadius: 8, cursor: "pointer", background: "transparent", border: `1px solid ${G}40`, color: G, fontSize: 14, fontFamily: "'Outfit',sans-serif", fontWeight: 600, transition: "all 0.2s" }} onMouseEnter={e => { e.target.style.background = GD; e.target.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.transform = "none"; }}>See the Evidence</button>
              </div>
            </FI>
          </div>
        </section>

        {/* STAT BAR */}
        <section style={{ background: D2, borderTop: `1px solid ${G}10`, borderBottom: `1px solid ${G}10`, padding: "40px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {[{ n: "88", s: "%", l: "of organizations now use AI", r: "McKinsey, 2024" }, { n: "170", s: "M", l: "new jobs projected by 2030", r: "World Economic Forum, 2025" }, { n: "56", s: "%", l: "wage premium for AI-skilled workers", r: "PwC, 2025" }, { n: "36", s: "%", l: "higher profitability for diverse companies", r: "McKinsey, 2020" }].map((d, i) => (
              <FI key={i} delay={i * 0.1} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 42, fontWeight: 300, color: G }}><AnimNum value={d.n} suffix={d.s} /></div>
                <div style={{ fontSize: 13, color: T, marginTop: 4, fontFamily: "'Outfit',sans-serif" }}>{d.l}</div>
                <div style={{ fontSize: 10, color: "#3a4252", marginTop: 4, fontFamily: "'Outfit',sans-serif" }}>{d.r}</div>
              </FI>
            ))}
          </div>
        </section>

        {/* THE PROBLEM */}
        <section style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <FI dir="right">
              <div style={{ fontSize: 11, fontFamily: "'Outfit',sans-serif", color: G, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>The Crisis</div>
              <h2 style={{ fontSize: 36, fontWeight: 400, color: L, lineHeight: 1.25, margin: "0 0 20px" }}>AI is transforming every organization.<br /><span style={{ fontStyle: "italic", color: G }}>Leadership theory hasn't kept up.</span></h2>
              <p style={{ fontSize: 15, lineHeight: 1.8 }}>Algorithms now decide who gets hired, promoted, and retained. But only 34% of leaders are reimagining their organizations for AI. Traditional leadership models — built for stability and homogeneity — cannot govern the most powerful technology in history.</p>
            </FI>
            <FI delay={0.2}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[{ s: "89%", t: "of HR leaders expect AI to impact jobs in 2026", c: G }, { s: "55%+", t: "of employers unsure how AI affects diversity goals", c: "#ef4444" }, { s: "1 in 3", t: "businesses lost revenue from AI bias", c: "#ef4444" }, { s: "39%", t: "of core skills will change by 2030", c: G }].map((d, i) => (
                  <div key={i} style={{ background: D3, border: `1px solid ${G}10`, borderRadius: 12, padding: 20, transition: "border-color 0.3s" }} onMouseEnter={e => e.currentTarget.style.borderColor = G + "30"} onMouseLeave={e => e.currentTarget.style.borderColor = G + "10"}>
                    <div style={{ fontSize: 26, fontWeight: 300, color: d.c }}>{d.s}</div>
                    <div style={{ fontSize: 12, color: T, marginTop: 6, fontFamily: "'Outfit',sans-serif", lineHeight: 1.5 }}>{d.t}</div>
                  </div>
                ))}
              </div>
            </FI>
          </div>
        </section>

        {/* THEORY */}
        <section id="theory" style={{ background: D2, padding: "100px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <FI><div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 11, fontFamily: "'Outfit',sans-serif", color: G, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>The Framework</div>
              <h2 style={{ fontSize: 40, fontWeight: 400, color: L, margin: "0 0 16px" }}>Adaptive Inclusive Leadership <span style={{ fontStyle: "italic", color: G }}>Theory</span></h2>
              <p style={{ fontSize: 16, color: T, maxWidth: 620, margin: "0 auto", lineHeight: 1.7 }}>AILT argues that adaptability and inclusivity are reciprocally constitutive — each a precondition for and outcome of the other. Neither alone is sufficient for the AI age.</p>
            </div></FI>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 60 }}>
              {[{ icon: "◈", title: "Inclusive Adaptive Capacity", sub: "IAC", desc: "The collective capability to respond to AI-driven challenges through integrating diverse perspectives. Ensures people affected by algorithmic decisions participate in their governance." },
                { icon: "◉", title: "Participatory Sensemaking", sub: "PS", desc: "The collaborative process through which diverse members collectively interpret ambiguous situations — including opaque AI recommendations. How organizations maintain human understanding." },
                { icon: "◎", title: "Equity-Centered Flexibility", sub: "ECF", desc: "The capacity to adapt organizational structures in response to AI-driven change while maintaining equity. When AI eliminates roles held by marginalized groups, ECF adapts the adaptation." }
              ].map((c, i) => (
                <FI key={i} delay={i * 0.15}>
                  <div style={{ background: D, border: `1px solid ${G}12`, borderRadius: 16, padding: "36px 28px", height: "100%", transition: "all 0.4s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = G + "40"; e.currentTarget.style.transform = "translateY(-4px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = G + "12"; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ fontSize: 28, color: G, marginBottom: 16 }}>{c.icon}</div>
                    <div style={{ fontSize: 11, fontFamily: "'Outfit',sans-serif", color: G, letterSpacing: 2, marginBottom: 4 }}>{c.sub}</div>
                    <h3 style={{ fontSize: 20, fontWeight: 600, color: L, margin: "0 0 14px", lineHeight: 1.3 }}>{c.title}</h3>
                    <p style={{ fontSize: 14, color: T, lineHeight: 1.75, margin: 0 }}>{c.desc}</p>
                  </div>
                </FI>
              ))}
            </div>

            <FI><div style={{ background: `linear-gradient(135deg,${D} 0%,#0f1520 50%,${D} 100%)`, border: `1px solid ${G}15`, borderRadius: 16, padding: "40px 48px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 40, alignItems: "center", marginBottom: 60 }}>
              <div>
                <div style={{ fontSize: 11, fontFamily: "'Outfit',sans-serif", color: G, letterSpacing: 2, marginBottom: 8 }}>MEDIATING MECHANISM</div>
                <h3 style={{ fontSize: 28, fontWeight: 400, color: L, margin: 0, lineHeight: 1.2 }}>Psychological<br /><span style={{ fontStyle: "italic", color: G }}>Safety</span></h3>
              </div>
              <p style={{ fontSize: 14, color: T, lineHeight: 1.8, margin: 0 }}>Psychological safety operates as both enabler and outcome of inclusive adaptive processes. It determines whether employees will speak up when AI produces biased results, challenge algorithmic decisions, or report concerns. Frazier et al.'s (2017) meta-analysis confirms its link to information sharing, creativity, and learning — all critical for responsible AI governance.</p>
            </div></FI>

            <FI><h3 style={{ fontSize: 24, fontWeight: 400, color: L, textAlign: "center", marginBottom: 32 }}>Five <span style={{ fontStyle: "italic", color: G }}>Testable</span> Propositions</h3></FI>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[{ n: "01", t: "Reciprocal Constitution", d: "IAC and ECF reinforce each other, mediated by psychological safety. Inclusive AI governance enhances adaptive capacity; adaptive deployment sustains inclusion." },
                { n: "02", t: "Sensemaking Enhancement", d: "PS mediates the link between IAC and adaptive outcomes. Better inclusion → better collective interpretation of algorithmic decisions." },
                { n: "03", t: "Emergent Resilience", d: "The three constructs together produce resilience to AI-driven disruption exceeding what any single construct predicts." },
                { n: "04", t: "Asymmetric Failure", d: "Inclusion deficits constrain adaptation more than the reverse. AI without inclusive governance scales bias faster than inclusion without adaptation stagnates." },
                { n: "05", t: "Dynamic Equilibrium", d: "Sustained effectiveness requires continuous recalibration as AI capabilities and equity challenges evolve." }
              ].map((p, i) => (
                <FI key={i} delay={i * 0.08}>
                  <div style={{ display: "grid", gridTemplateColumns: "60px 200px 1fr", gap: 20, alignItems: "center", padding: "20px 24px", background: D, border: `1px solid ${G}08`, borderRadius: 12, transition: "border-color 0.3s" }} onMouseEnter={e => e.currentTarget.style.borderColor = G + "25"} onMouseLeave={e => e.currentTarget.style.borderColor = G + "08"}>
                    <div style={{ fontSize: 28, fontWeight: 300, color: G + "40", fontFamily: "'Outfit',sans-serif" }}>{p.n}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: L }}>{p.t}</div>
                    <div style={{ fontSize: 13, color: T, lineHeight: 1.6, fontFamily: "'Outfit',sans-serif" }}>{p.d}</div>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        {/* EVIDENCE */}
        <section id="evidence" style={{ padding: "100px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <FI><div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 11, fontFamily: "'Outfit',sans-serif", color: G, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>The Data</div>
              <h2 style={{ fontSize: 40, fontWeight: 400, color: L, margin: "0 0 16px" }}>Overwhelming <span style={{ fontStyle: "italic", color: G }}>Evidence</span></h2>
              <p style={{ fontSize: 16, color: T, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>The case for AILT is built on data from McKinsey, Deloitte, PwC, the World Economic Forum, Gartner, and peer-reviewed research.</p>
            </div></FI>

            {[{ title: "AI Bias & The Inclusion Imperative", color: "#ef4444", items: [
                ["\u2014", "Leading AI models systematically disadvantage Black male applicants with identical qualifications", "An et al., PNAS Nexus, 2025"],
                ["\u2014", "Amazon's AI hiring tool penalized any resume containing 'women's'", "Dastin, Reuters, 2018"],
                ["200+", "Qualified applicants disqualified solely by age-discriminatory AI", "EEOC, 2023"],
                ["1/3+", "Businesses lost revenue, customers, or legal fees from AI bias", "TechClass, 2026"],
                ["\u2014", "Mobley v. Workday: first nationwide AI discrimination class action", "Federal Court, 2025"],
                ["\u2014", "EU AI Act classifies workplace AI as 'high risk'", "European Union, 2025"],
              ]}, { title: "The Leadership Gap", color: "#3b82f6", items: [
                ["34%", "of leaders are truly reimagining their business for AI", "Deloitte, 2026"],
                ["#1", "barrier to AI integration: the AI skills gap", "Deloitte, 2026"],
                ["70%", "of engagement influenced by managers — whose engagement is falling", "Gallup, 2025"],
                ["1%", "of organizations have achieved true AI maturity", "McKinsey, 2024"],
              ]}, { title: "Diversity-Performance Link", color: "#22c55e", items: [
                ["36%", "higher profitability for top-quartile diverse companies", "McKinsey, 2020"],
                ["\u2014", "Diverse teams outperform on complex problems", "De Dreu & West, 2001"],
                ["\u2014", "Racial diversity → higher revenue, customers, market share", "Herring, 2009"],
                ["\u2014", "Psychological safety predicts sharing, creativity, learning", "Frazier et al., 2017"],
              ]}
            ].map((b, bi) => (
              <FI key={bi} delay={bi * 0.1}><div style={{ marginBottom: 40 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: b.color, marginBottom: 16, fontFamily: "'Outfit',sans-serif" }}>{b.title}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {b.items.map((it, ii) => (
                    <div key={ii} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 16, alignItems: "center", padding: "14px 20px", background: D2, border: `1px solid ${G}06`, borderRadius: 10 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: b.color, textAlign: "right", fontFamily: "'Outfit',sans-serif" }}>{it[0]}</div>
                      <div style={{ fontSize: 13, color: L, lineHeight: 1.5, fontFamily: "'Outfit',sans-serif" }}>{it[1]}</div>
                      <div style={{ fontSize: 10, color: "#3a4252", fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap" }}>{it[2]}</div>
                    </div>
                  ))}
                </div>
              </div></FI>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={{ background: D2, padding: "100px 40px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <FI><div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start" }}>
              <div style={{ width: 200, height: 240, borderRadius: 16, background: `linear-gradient(135deg,${D3},${G}15)`, border: `1px solid ${G}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 64, fontWeight: 300, color: G }}>MC</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontFamily: "'Outfit',sans-serif", color: G, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>About the Author</div>
                <h2 style={{ fontSize: 32, fontWeight: 400, color: L, margin: "0 0 20px", lineHeight: 1.3 }}>Matthew <span style={{ fontStyle: "italic", color: G }}>Culwell</span></h2>
                <p style={{ fontSize: 15, color: T, lineHeight: 1.8, marginBottom: 16 }}>Matthew Culwell is the creator of Adaptive Inclusive Leadership Theory and a researcher focused on the intersection of leadership, artificial intelligence, and organizational equity. His work addresses the defining question of our era: how do organizations harness AI's transformative potential while ensuring that transformation serves everyone?</p>
                <p style={{ fontSize: 15, color: T, lineHeight: 1.8, marginBottom: 16 }}>AILT emerged from the recognition that existing leadership frameworks treat adaptability and inclusivity as separate competencies — a separation that becomes dangerous when AI amplifies both the speed of change and the scale of bias.</p>
                <p style={{ fontSize: 15, color: T, lineHeight: 1.8 }}>Matthew's work spans academic research, corporate training, and leadership development, making AILT both theoretically rigorous and practically actionable for the AI age.</p>
              </div>
            </div></FI>
          </div>
        </section>

        {/* COURSES */}
        <section id="courses" style={{ padding: "100px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <FI><div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 11, fontFamily: "'Outfit',sans-serif", color: G, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>Learn AILT</div>
              <h2 style={{ fontSize: 40, fontWeight: 400, color: L, margin: 0 }}>Courses & <span style={{ fontStyle: "italic", color: G }}>Training</span></h2>
            </div></FI>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
              {[{ title: "AILT Fundamentals", sub: "15-Module Certificate", desc: "The complete AILT framework: theory, AI-age applications, practical implementation. Covers all three constructs, five propositions, and hands-on tools.", price: "$497", tag: "SIGNATURE" },
                { title: "Algorithmic Equity Workshop", sub: "For HR & DEI Leaders", desc: "Focused workshop on governing AI equitably. Algorithmic bias, inclusive AI governance, psychological safety around AI deployment.", price: "$199", tag: "WORKSHOP" },
                { title: "Executive Briefing", sub: "Custom Corporate Training", desc: "Tailored AILT for your organization. Readiness assessment, leadership development, AI governance framework design.", price: "Custom", tag: "ENTERPRISE" }
              ].map((c, i) => (
                <FI key={i} delay={i * 0.15}>
                  <div style={{ background: D2, border: `1px solid ${G}12`, borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column", height: "100%", transition: "all 0.4s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = G + "40"; e.currentTarget.style.transform = "translateY(-4px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = G + "12"; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ fontSize: 10, fontFamily: "'Outfit',sans-serif", color: G, letterSpacing: 2, marginBottom: 12 }}>{c.tag}</div>
                    <h3 style={{ fontSize: 20, fontWeight: 600, color: L, margin: "0 0 4px" }}>{c.title}</h3>
                    <div style={{ fontSize: 13, color: G, marginBottom: 16, fontFamily: "'Outfit',sans-serif" }}>{c.sub}</div>
                    <p style={{ fontSize: 13, color: T, lineHeight: 1.7, flex: 1, fontFamily: "'Outfit',sans-serif" }}>{c.desc}</p>
                    <div style={{ borderTop: `1px solid ${G}10`, paddingTop: 16, marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 22, fontWeight: 300, color: L }}>{c.price}</span>
                      <button onClick={() => go("contact")} style={{ padding: "8px 20px", borderRadius: 6, border: `1px solid ${G}40`, background: "transparent", color: G, cursor: "pointer", fontSize: 12, fontFamily: "'Outfit',sans-serif", fontWeight: 600, transition: "all 0.2s" }} onMouseEnter={e => e.target.style.background = GD} onMouseLeave={e => e.target.style.background = "transparent"}>Learn More</button>
                    </div>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <section style={{ background: D2, padding: "80px 40px", textAlign: "center" }}>
          <FI><div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div style={{ fontSize: 30, fontWeight: 300, color: L, lineHeight: 1.5, fontStyle: "italic" }}>"Adaptability without inclusion scales bias. Inclusion without adaptability can't survive disruption. The AI age demands both."</div>
            <div style={{ fontSize: 14, color: G, marginTop: 20, fontFamily: "'Outfit',sans-serif" }}>— Matthew Culwell, AILT</div>
          </div></FI>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "100px 40px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <FI><div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 11, fontFamily: "'Outfit',sans-serif", color: G, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>Get In Touch</div>
              <h2 style={{ fontSize: 40, fontWeight: 400, color: L, margin: "0 0 16px" }}>Start the <span style={{ fontStyle: "italic", color: G }}>Conversation</span></h2>
              <p style={{ fontSize: 16, color: T, lineHeight: 1.7 }}>Interested in AILT for your organization, academic collaboration, or speaking engagements?</p>
            </div></FI>
            <FI delay={0.15}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <input placeholder="Your Name" style={iS} />
                <input placeholder="Organization" style={iS} />
              </div>
              <input placeholder="Email Address" style={{ ...iS, marginBottom: 14 }} />
              <select style={{ ...iS, marginBottom: 14, color: "#3a4252" }}>
                <option>I'm interested in...</option>
                <option>Corporate Training</option>
                <option>Course Enrollment</option>
                <option>Speaking Engagement</option>
                <option>Academic Collaboration</option>
                <option>Media Inquiry</option>
              </select>
              <textarea placeholder="Your message..." rows={5} style={{ ...iS, resize: "vertical", marginBottom: 14 }} />
              <button style={{ width: "100%", padding: "16px", borderRadius: 10, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${G},#8b6914)`, color: D, fontSize: 15, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}>Send Message</button>
            </FI>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: D2, borderTop: `1px solid ${G}10`, padding: "40px 40px 32px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg,${G},#8b6914)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: D, fontFamily: "'Outfit',sans-serif" }}>A</div>
              <span style={{ fontSize: 12, color: T, fontFamily: "'Outfit',sans-serif" }}>Adaptive Inclusive Leadership Theory</span>
            </div>
            <div style={{ fontSize: 11, color: "#3a4252", fontFamily: "'Outfit',sans-serif" }}>© 2026 Matthew Culwell. All rights reserved.</div>
          </div>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${G}20;border-radius:3px}
        input::placeholder,textarea::placeholder{color:#3a4252}
        ::selection{background:${G}30;color:${L}}
      `}</style>
    </div>
  );
}
