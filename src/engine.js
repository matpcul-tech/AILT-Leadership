/** Book-grounded tools. No model. Rules come from Adaptive Inclusive Leadership Theory. */

const CASES = [
  {
    keys: ["resume", "résumé", "hiring", "recruit", "screen", "vendor", "audit", "applicant"],
    title: "Amazon’s résumé screener",
    chapter: "Chapter 1, When the Algorithm Decides",
    read: "The system learned a decade of mostly male résumés and penalized the word “women’s.” Engineers could not reliably patch it. Amazon scrapped the tool. The chapter’s claim is that the story is not about Amazon. Adaptation without the people the system sorts will scale the old pattern.",
    lead: "IAC",
  },
  {
    keys: ["55", "60", "older", "age", "itutor", "eeoc"],
    title: "The age-screening settlement",
    chapter: "Chapter 3, Inclusion When the Algorithm Is Watching",
    read: "Recruiting software rejected women 55 and older and men 60 and older. More than two hundred qualified people never reached a human. A non-discrimination policy does not govern a model.",
    lead: "IAC",
  },
  {
    keys: ["ranked", "ranking", "candidate", "confidence", "score", "black"],
    title: "Candidate Seven",
    chapter: "Chapter 4, Making Decisions When the Data Has an Opinion",
    read: "Ten candidates, fifteen minutes, an AI rank. Candidate Seven, a Black woman with a non-traditional path, is ninth. In most rooms the ranking stands because questioning the score feels like questioning math. The rank is an opinion. The room still has to interpret it.",
    lead: "PS",
  },
  {
    keys: ["nurse", "alert", "clinical", "patient", "hospital", "triage"],
    title: "Room 412",
    chapter: "Chapter 5, Communication When Humans and Machines Share the Work",
    read: "The alert says cardiac arrest is likely. The patient is awake and complaining about the food. Blind trust is automation bias. Dismissal is algorithmic aversion. The third path exists only if the person can say the model and the room disagree without punishment.",
    lead: "Safety",
  },
  {
    keys: ["layoff", "eliminat", "restructur", "automat", "displace", "middle management", "roles"],
    title: "Who pays for the change",
    chapter: "Chapter 1 and Chapter 13",
    read: "Equity-Centered Flexibility asks who carries the cost when a tool removes roles. The book is explicit that automation has not fallen evenly. Speed that does not name the burden is not flexibility. It is a dump.",
    lead: "ECF",
  },
  {
    keys: ["afraid", "speak", "retaliat", "punish", "silence", "objective", "flagged"],
    title: "Psychological safety is the floor",
    chapter: "Chapter 1 and Chapter 5",
    read: "Safety is not comfort. It is whether someone can say the model is wrong about their team and still be in the room next week. Without that, the other three capacities are theater. Frazier’s meta-analysis is the evidence the book stands on: teams learn when interpersonal risk is survivable.",
    lead: "Safety",
  },
  {
    keys: ["merger", "merg", "acqui", "culture clash", "two compan", "technova", "homogeneous"],
    title: "Synergistic Solutions",
    chapter: "Chapter 6, Case Studies, and Appendix B",
    read: "A more homogeneous technology firm merged with TechNova, the more diverse company. Early months were rumors, anxiety, and distrust. What changed the plan was not a culture slide. Cross-functional teams from both firms owned real integration work. Town halls were two-way. An equity impact analysis showed the consolidation would land on TechNova’s more diverse workforce, and the plan was revised. The analysis cost about two weeks. First-year turnover was 8 percent against an industry range of 15 to 20.",
    lead: "IAC",
  },
  {
    keys: ["turnover", "pharma", "global dynamics", "retention", "promotion rate", "underrepresented", "ergs"],
    title: "Global Dynamics",
    chapter: "Chapter 6 and Appendix B",
    read: "A pharmaceutical company of more than 15,000 people was losing underrepresented employees at 25 percent a year, against 12 percent overall. Exit interviews named culturally incompetent leadership, blocked advancement, and diversity work that stayed on the poster. The fix was structural: manager training with follow-up, 360 feedback, ERGs with a line to senior leaders, and a promotion audit. Turnover among those employees fell from 25 percent to 16. An ERG that cannot change a promotion rule is not the case.",
    lead: "ECF",
  },
  {
    keys: ["innovatetech", "favoritism", "engineering team", "two teams", "male engineering", "power imbalance"],
    title: "InnovateTech",
    chapter: "Chapter 6 and Appendix B",
    read: "An AI restructuring plan set an established, mostly male engineering team against a newer, more diverse team. The fault line was whose work the model would automate. Workshops mapped the conflict: communication, whose expertise counted, and who decided the deployment. The plan was rewritten with both teams so the benefits and the losses were not dumped on one side. The lasting rule was inclusive deliberation before a major technology deployment, not a one-time workshop.",
    lead: "Safety",
  },
  {
    keys: ["greentech", "silo", "junior", "idea platform", "innovation stagn", "senior engineer"],
    title: "GreenTech Solutions",
    chapter: "Chapter 6 and Appendix B",
    read: "A sustainability firm of about 300 people said it wanted new ideas and then let senior engineers own the pipeline. Junior staff, women, and anyone outside engineering were overlooked. The structural move was an idea platform anyone could use, cross-functional teams, and innovation metrics tracked by who was actually heard. The commercially successful ideas came from people the hierarchy had treated as adjacent.",
    lead: "IAC",
  },
  {
    keys: ["community connect", "neighborhood", "listening session", "advisory board", "residents", "nonprofit", "non-profit"],
    title: "Community Connect",
    chapter: "Chapter 6 and Appendix B",
    read: "A nonprofit of about 50 staff designed programs from its own assumptions. An after-school program missed parents’ schedules. A garden plan met resistance over who would maintain it. The turn was a participatory needs assessment, listening sessions, and a community advisory board of residents, not another announcement. Participation rose when the neighborhood could change the program, not merely attend it.",
    lead: "PS",
  },
  {
    keys: ["remote", "office", "return to", "parent", "disab", "caregiv"],
    title: "The same rule is not the same experience",
    chapter: "Chapter 14, AILT Across Sectors and Cultures",
    read: "A policy can look neutral and still land on one group. Equity-Centered Flexibility starts by naming three groups and the specific burden, before the rule is locked.",
    lead: "ECF",
  },
  {
    keys: ["dei", "performative", "inclusion", "diversity push"],
    title: "A statement is not a system",
    chapter: "Chapter 3",
    read: "Leaders can believe they value diversity while the technology does not, because the people with the right view of the harm were never in the evaluation. Pushback and exclusion are often the same system seen from two chairs.",
    lead: "Safety",
  },
];

const CONSTRUCTS = {
  IAC: {
    name: "Inclusive Adaptive Capacity",
    line: "The people most affected by the system help design it, test it, and stop it. A diverse roster is not this. Attendance is not this. A perspective has to change the specification.",
  },
  PS: {
    name: "Participatory Sensemaking",
    line: "An algorithmic score is an ambiguous object. Hold more than one reading long enough to test it. Do not collapse to the official story because a single story feels like control.",
  },
  ECF: {
    name: "Equity-Centered Flexibility",
    line: "When the burden is uneven, change the plan. Do not explain the average. Name who pays, in time, risk, status, or income, and do not ship until they can use it, appeal it, or refuse it.",
  },
  Safety: {
    name: "Psychological safety",
    line: "This is the floor under the other three. If speaking up costs the job or the status, the information you most need will stay unspoken. That includes “the model is wrong about my team.”",
  },
};

const MOVES = {
  IAC: [
    "Name the people the system sorts, and put two of them in the review before anyone signs.",
    "Write the stop-rule: the decision does not proceed if that role is absent.",
    "Close the loop in writing. Say what changed because they were there. If nothing changed, say that too.",
  ],
  PS: [
    "Put one real case on the table, not the vendor’s average accuracy.",
    "Ask for two readings: what the score thinks it knows, and what the people closest to the work see.",
    "Decide which reading you will test. Do not vote and move on.",
  ],
  ECF: [
    "Name three groups and the specific burden for each before the plan is locked.",
    "Write the sentence you will not ship without: who can appeal or refuse without penalty.",
    "Pick the metric you will watch after launch, and who can stop it. That person is not only the sponsor.",
  ],
  Safety: [
    "Say, out loud, what is safe to challenge in this decision, including the model.",
    "Name the last time someone went quiet, and the behavior of yours that taught them to.",
    "Protect the next person who brings an inconvenient result. Tell the room you will.",
  ],
};

function clip(text, n) {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
}

function hits(text, keys) {
  const t = text.toLowerCase();
  return keys.reduce((n, k) => n + (t.includes(k) ? 1 : 0), 0);
}

function pickCase(text) {
  let best = null;
  let bestN = 0;
  for (const c of CASES) {
    const n = hits(text, c.keys);
    if (n > bestN) {
      best = c;
      bestN = n;
    }
  }
  return bestN ? best : null;
}

function pickLead(text, fallback) {
  const scores = {
    Safety: hits(text, ["afraid", "speak", "silence", "retaliat", "trust", "punish", "voice", "quiet"]),
    ECF: hits(text, ["layoff", "burden", "equity", "restructur", "access", "disparate", "eliminat"]),
    PS: hits(text, ["interpret", "black box", "explain", "recommend", "score", "unclear", "ambigu"]),
    IAC: hits(text, ["hire", "design", "deploy", "governance", "committee", "affected", "stakeholder", "diverse", "resume", "screen"]),
  };
  let lead = fallback || "IAC";
  let n = -1;
  for (const k of ["Safety", "ECF", "PS", "IAC"]) {
    if (scores[k] > n) {
      lead = k;
      n = scores[k];
    }
  }
  if (n <= 0) return fallback || "IAC";
  return lead;
}

export function advise(raw) {
  const text = (raw || "").trim();
  if (text.length < 20) {
    return "Describe the situation in a few sentences: what the system or the change is doing, who wants speed, and who is affected. The reading is only as specific as that.";
  }
  const found = pickCase(text);
  const lead = pickLead(text, found?.lead);
  const c = CONSTRUCTS[lead];
  const book = found
    ? `## The page this resembles\n${found.title}, ${found.chapter}.\n\n${found.read}`
    : `## The page this resembles\nNo single case in the book is a perfect match. Use Chapter 1’s test anyway: if you removed the people most affected and the plan still looks the same, you do not have an adaptive response. You have a deployment.`;
  const others = Object.keys(CONSTRUCTS).filter((k) => k !== lead);
  return [
    `## What you described`,
    clip(text, 320),
    book,
    `## Where the book would start`,
    `**${c.name}.** ${c.line}`,
    `The other capacities still matter. ${others.map((k) => CONSTRUCTS[k].name).join(", ")} fail if this one is theater.`,
    `## Fourth prediction, applied`,
    `Inclusion deficits constrain adaptation more severely than the reverse. A fast rollout that no one affected can contradict will do more harm than a slower inclusion practice. That is the claim to test against this situation, not a reason to wait forever.`,
    `## What the five cases agree on`,
    `Chapter 6’s first pattern: the claim that inclusion will slow the decision is a false tradeoff. The inclusive step took more time up front and avoided the larger cost, failed integration, exits, backlash, or a hearing. The turning point in every case was someone safe enough to say what leadership had not planned to hear. Goodwill did not hold it. A structure did: a mixed team with a real mandate, an ERG that can change a rule, an idea platform, or a community board.`,
    `## Do this before the next meeting`,
    ...MOVES[lead].map((m, i) => `${i + 1}. ${m}`),
    `## Do not`,
    `- Do not treat the vendor’s contract as governance.`,
    `- Do not call the average outcome fair while one group absorbs the harm.`,
    `- Do not ask for “any concerns?” if the last person who answered paid for it.`,
  ].join("\n\n");
}

const AGENDAS = {
  strategy: "Name the adaptive part of the strategy, separate from the technical install. Two readings of the future, then one test you will actually run.",
  decision: "The decision is not made until the affected role has spoken and something in the proposal can still change. Write the stop-rule on the board first.",
  brainstorm: "Collect readings before solutions. A wild idea that ignores who pays is not innovation. Keep one chair for the person who will operate this on a Tuesday.",
  retro: "What the official story says happened, and what the people closest to the work say happened. Do not vote. Pick the reading you will test.",
  change: "Say who carries the cost, in time, status, or income. The announcement is not finished until those people have heard it in language that names their burden.",
  crisis: "Open the channel. A crisis run on directives and withheld information makes people less able to tell you the model is wrong.",
  calibration: "Review one real person the system would rank, flag, or cut. Ask what the score cannot know. Calibration that never changes a result is a ritual.",
  update: "Status is not a tour of completed tasks. Each update names one assumption that might be wrong and who would see it first.",
};

export function designMeeting({ topic, type, duration, participants, context }) {
  const label = {
    strategy: "Strategy / Planning",
    decision: "Decision-Making",
    brainstorm: "Brainstorm / Innovation",
    retro: "Retrospective",
    change: "Change Communication",
    crisis: "Crisis Response",
    calibration: "Calibration / Review",
    update: "Status Update",
  }[type] || "Working session";
  const mins = Math.max(20, parseInt(duration, 10) || 60);
  const blocks = [
    ["Open", Math.max(5, Math.round(mins * 0.12))],
    ["Two readings", Math.max(8, Math.round(mins * 0.22))],
    ["The work", Math.max(10, Math.round(mins * 0.28))],
    ["Equity check", Math.max(6, Math.round(mins * 0.18))],
    ["Stop-rule", Math.max(5, Math.round(mins * 0.1))],
    ["Close in writing", Math.max(4, Math.round(mins * 0.1))],
  ];
  const used = blocks.reduce((n, b) => n + b[1], 0);
  blocks[2][1] += mins - used;
  const situation = `${topic || "Untitled session"}. ${context || ""}`.trim();
  const found = pickCase(situation);
  const lead = pickLead(situation, found?.lead);
  return [
    `## ${topic || "Working session"}`,
    `${label}. ${mins} minutes. ${participants || "The people in the room"}. Built from the book, not from a model.`,
    context ? `Context you gave: ${clip(context, 280)}` : `Add context next time if the room has a live conflict. The agenda can only see what you wrote.`,
    found ? `## The case to put on the table\n${found.title}, ${found.chapter}. ${found.read}` : `## If no case fits\nUse Chapter 6’s question anyway: which of the five organizations is this room closest to, and who is not yet safe enough to contradict the plan?`,
    `## Safety opener (${blocks[0][1]} min)`,
    `Say this, in your words: what is safe to challenge today, including the ranking, the plan, and you. What happens if someone is wrong. What you will do when you are the one who is wrong.`,
    `## Two readings (${blocks[1][1]} min)`,
    `One reading from the people who own the plan. One from the people who will feel it first. Do not reconcile them yet.`,
    `## The work of this meeting (${blocks[2][1]} min)`,
    AGENDAS[type] || AGENDAS.decision,
    `Given what you wrote, start from **${CONSTRUCTS[lead].name}.** ${CONSTRUCTS[lead].line}`,
    `## Equity check (${blocks[3][1]} min)`,
    `Who is not in this room of ${participants || "these participants"}? Who pays if this ships as written? If you cannot name three groups, you are not ready to call it equitable.`,
    `## Stop-rule (${blocks[4][1]} min)`,
    `Write one sentence: we will not leave with a decision if ______. The blank is a missing role, an untested burden, or a score no one can explain.`,
    `## Close in writing (${blocks[5][1]} min)`,
    `Before anyone stands up: what changed because of who was here. If nothing changed, write that. Pretending is how safety dies.`,
  ].join("\n\n");
}

const SCAN_GUIDE = [
  {
    category: "Governance and Decision-Making",
    weak: "Governance is missing when the answer is a title, a vendor, or “IT decided.” Chapter 11 starts with who proposes a tool, who is affected, and who can stop it.",
    fix: "Name a person affected by the tool and give them a stop. This month, not after procurement.",
  },
  {
    category: "Bias and Equity Monitoring",
    weak: "Chapter 3: a policy does not test a model. If no one owns differential outcomes after launch, you are waiting for the hearing to do the audit.",
    fix: "Pick one live system. Write which groups it can harm, and who reads that report on a set date.",
  },
  {
    category: "Psychological Safety and Voice",
    weak: "If concerns have not been raised in a year, that is not proof of health. It is often proof of silence. Safety is the floor under the other capacities.",
    fix: "Open the next staff meeting with what is safe to challenge, and protect the first person who uses it.",
  },
  {
    category: "Sensemaking and Transparency",
    weak: "Chapter 4 and Chapter 5: a score no one can explain is not a decision, and a person who cannot challenge it is not in a governed system.",
    fix: "Take one real output. Ask what it thinks it knows, what it cannot know, and who must be present before anyone acts.",
  },
  {
    category: "Accountability and Audit",
    weak: "“The software did it” is not a leadership position. The employer owns the sorting. Chapter 1’s cases are the warning, not a headline.",
    fix: "Write, in one sentence, who is accountable when the tool discriminates, and where a person appeals.",
  },
];

function rateAnswer(text) {
  const t = (text || "").trim().toLowerCase();
  if (t.length < 12) return "gap";
  if (/\b(no|none|not yet|don't|do not|unsure|unknown|nobody|no one|n\/a|vendor only|haven't|have not)\b/.test(t)) return "gap";
  if (/\b(sometimes|partial|partly|plan to|planning|working on|starting|informal|soon)\b/.test(t)) return "partial";
  return "held";
}

export function scanReport({ orgName, industry, size, context, answers }) {
  const lines = [];
  let gaps = 0;
  let partials = 0;
  let held = 0;
  const actions = [];
  SCAN_GUIDE.forEach((cat, ci) => {
    const bits = [0, 1, 2].map((i) => {
      const raw = answers[`${cat.category}-${i}`] || "";
      const mark = rateAnswer(raw);
      if (mark === "gap") gaps += 1;
      else if (mark === "partial") partials += 1;
      else held += 1;
      return { i, raw: clip(raw || "No answer", 160), mark };
    });
    const worst = bits.some((b) => b.mark === "gap") ? "Gap" : bits.some((b) => b.mark === "partial") ? "Partial" : "Held";
    if (worst !== "Held") actions.push(`- **${cat.category}.** ${cat.fix}`);
    lines.push(`## ${cat.category}: ${worst}`);
    lines.push(bits.map((b) => `${b.i + 1}. ${b.mark === "held" ? "Held" : b.mark === "partial" ? "Partial" : "Gap"}: ${b.raw}`).join("\n"));
    if (worst !== "Held") lines.push(cat.weak);
  });
  const org = orgName || "This organization";
  const risk = gaps >= 8 ? "High" : gaps >= 4 ? "Serious" : partials >= 5 ? "Uneven" : "Watchful";
  const sector = (industry || "").toLowerCase();
  let sectorNote = "Chapter 14: the same theory is not the same practice in a firm, a hospital, a nonprofit, and an agency. Name which room you are actually in.";
  if (/health|hospital|clinic/.test(sector)) sectorNote = "You named healthcare. Chapter 14’s warning is a triage or staffing model that looks accurate on average and still misses the patients the training data barely saw. The nurse in Chapter 5 is the test: can a clinician contradict the alert?";
  else if (/nonprofit|non-profit|ngo|community/.test(sector)) sectorNote = "You named a nonprofit context. Chapter 6’s Community Connect pattern is deciding with the neighborhood, not for it. Speed of a grant cycle is not a reason to skip that.";
  else if (/public|government|agency|city|school/.test(sector)) sectorNote = "A public mandate does not replace the stop-rule. The people the system sorts still have to be able to appeal it.";
  return [
    `# ${org}: readiness from the book`,
    `${industry || "Sector not named"}. ${size || "Size not named"}. ${context ? clip(context, 220) : "No tools named."}`,
    `**Risk: ${risk}.** ${held} answers describe a practice in place. ${partials} are partial. ${gaps} are gaps or too thin to count.`,
    `This reading uses the book’s tests. It does not call a model, and it cannot see what you did not write.`,
    ...lines,
    `## Ninety days`,
    actions.length ? actions.join("\n") : "- The written answers describe practices in place. The next test is whether someone outside the sponsoring team would describe them the same way.",
    `## Sector`,
    sectorNote,
  ].join("\n\n");
}

const COACH = {
  reflect: [
    "What did you do the last time someone brought you bad news about a system or a change?",
    "Who was not in the room, and what would they have said that you did not want to hear?",
    "Which capacity were you protecting: integrating the people affected, holding more than one reading, or changing the plan when the burden is uneven?",
    "What is the one behavior you will stop, because it teaches people to stay quiet?",
  ],
  challenge: [
    "Where are you calling a deployment a learning, or a policy an inclusion practice?",
    "If the people most affected left the room, would the plan change? If not, you do not have Inclusive Adaptive Capacity yet.",
    "What average are you using to hide an uneven cost?",
    "Say the inconvenient version in one sentence, without a softer word.",
  ],
  plan: [
    "Pick one capacity, not three. Which one can someone else hold you to in thirty days?",
    "Name the meeting you will redesign, the role that must be present, and the stop-rule.",
    "Name the system you will not let ship unchanged, and the metric you will watch.",
    "Who is the witness, what is the date, and what would count as done?",
  ],
  practice: [
    "Give me the sentence you will actually say when someone treats the model as the decision.",
    "Now say the sentence you will use when a senior person calls the pause a delay.",
    "Who in your real week needs to hear the first sentence, and what will you do if they punish it?",
    "Write the close you will send after the meeting: what changed because of who was there.",
  ],
  review: [
    "What did you do since last time that a witness could check, and what did you only intend?",
    "Where did the book’s distinction show up, and where did you slide back to a slogan?",
    "Which score, human or machine, did you accept too quickly?",
    "What is the next single move, with a date, not a theme?",
  ],
};

const MODE_LINE = {
  reflect: "Reflect stays with a real moment. Do not generalize yet.",
  challenge: "Challenge is not an insult. It is the distinction the book will not let you blur.",
  plan: "A plan is three moves a witness can see. Vision language does not count.",
  practice: "Practice is the sentence you will say, not a theory of what you might say.",
  review: "Review counts only what already happened.",
};

export function coachOpen(mode, goal) {
  const seq = COACH[mode] || COACH.reflect;
  return [`Goal on the table: ${goal?.trim() || "become the kind of leader the book describes."}`, MODE_LINE[mode] || MODE_LINE.reflect, seq[0]].join("\n\n");
}

export function coachReply({ mode, goal, history }) {
  const seq = COACH[mode] || COACH.reflect;
  const users = (history || []).filter((m) => m.role === "user");
  const last = users[users.length - 1]?.content || "";
  const lead = pickLead(`${goal || ""} ${last}`, null);
  const idx = Math.min(users.length, seq.length - 1);
  return [
    `You said: “${clip(last, 240)}”`,
    `That sits closest to **${CONSTRUCTS[lead].name}.** ${CONSTRUCTS[lead].line}`,
    seq[idx],
    users.length >= seq.length ? "You have walked the questions in this mode. Switch modes, or write the answer into this week’s journal with a page number." : "Answer in the specific, not the slogan.",
  ].join("\n\n");
}

const DIMS = [
  ["iac", "Inclusive Adaptive Capacity", "Put the people the system affects inside the design, not only the announcement."],
  ["ps", "Participatory Sensemaking", "Hold a second reading of the score long enough to test it."],
  ["ecf", "Equity-Centered Flexibility", "Change the plan where the burden is uneven. Do not brief the average."],
  ["psy", "Psychological safety", "Make it survivable to say the model is wrong."],
];

export function gapReport({ leader, rater, self, team }) {
  const rows = DIMS.map(([id, name, move]) => {
    const s = self[id] || 0;
    const t = team[id] || 0;
    const gap = s - t;
    let note = "Close enough to treat as a shared picture.";
    if (gap >= 15) note = "You rate yourself higher than the team. That gap is a blind spot until you ask them what they see.";
    else if (gap <= -15) note = "The team rates you higher than you rate yourself. Do not hide in modesty. Ask what they are counting, and whether it survives a hard decision.";
    return { id, name, move, s, t, gap, note };
  });
  const worst = [...rows].sort((a, b) => a.t - b.t)[0];
  const widest = [...rows].sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap))[0];
  return [
    `# ${leader || "Leader"}: self against the team`,
    `Rater: ${rater || "Not named"}. Scores are the percent of the short scale, computed on this device.`,
    ...rows.map((r) => `## ${r.name}\nSelf ${r.s}%. Team ${r.t}%. Gap ${r.gap > 0 ? "+" : ""}${r.gap}.\n\n${r.note}`),
    `## Where to work`,
    `The lowest team score is **${worst.name}** at ${worst.t}%. ${worst.move}`,
    `The widest gap is **${widest.name}** (${widest.gap > 0 ? "+" : ""}${widest.gap}). Chapter 12: the leader this theory requires can hear the answer they did not want. Ask ${rater || "the rater"} what behavior produced the team number. Do not explain it away in the same meeting.`,
    `## Thirty days`,
    `1. One meeting redesigned so ${worst.name.toLowerCase()} can be seen by someone who is not you.`,
    `2. A witness and a date.`,
    `3. Write what changed. If nothing changed, write that.`,
  ].join("\n\n");
}

export function readProfile(parts) {
  const known = parts.filter((p) => p.ans > 0);
  if (!known.length) return "Mark the items before you read a pattern.";
  const low = [...known].sort((a, b) => a.pct - b.pct)[0];
  const high = [...known].sort((a, b) => b.pct - a.pct)[0];
  return `The lowest marked capacity is ${low.title} at ${low.pct}%. That is the one to take into the course, not all four at once. The strongest is ${high.title} at ${high.pct}%. A high score you never let contradict a model is still unfinished. Chapter 7 treats the instrument as a diagnosis, not a number to post.`;
}
