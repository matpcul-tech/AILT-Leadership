export const MODULES = [
  {
    id: 1, weeks: "1–2", title: "Foundations of AILT",
    construct: "The frame",
    summary: "Why adaptability and inclusivity fail when they are treated as separate skills, and why psychological safety is the floor under both.",
    lessons: [
      {
        id: "1a", week: 1, minutes: 40, title: "One problem, not two",
        aim: "Name the gap AILT closes: organizations treat adaptability and inclusivity as rival programs.",
        reading: 'Read Chapter 1 of Leadership for the Age of AI, including the story that opens it. Copy the chapter title exactly as printed. This screen is not the chapter.',
        teach: [
          "Most leadership models ask people to be agile or to be inclusive, as if those were different courses. Adaptive Inclusive Leadership Theory starts from the opposite claim. When the challenge is novel, the people who see it differently are the adaptation. Leave them out and the organization gets faster at the old answer.",
          "That gap gets dangerous once algorithms make decisions that used to be human: hiring, scheduling, risk, who gets a second look. The model is only as inclusive as the room that chose it, tested it, and is allowed to contradict it.",
          "AILT names three capacities and one condition. Inclusive Adaptive Capacity is how a system responds by integrating difference. Participatory Sensemaking is how a team interprets what it cannot yet explain. Equity-Centered Flexibility is how change is redesigned when it lands unevenly. Psychological safety is the shared belief that speaking up will not be punished. Without that belief, the other three are theater."
        ],
        practice: [
          "Write the last change your organization called “agile.”",
          "List who was in the room when it was named, and who felt it first.",
          "One sentence: whose reading of the problem never made the plan?"
        ],
        prompt: 'Retell the opening story in your own words and name the leadership problem it is really about. What did you think this required before the chapter, and what does the page say instead?',
        check: {
          q: "AILT treats inclusivity as…",
          options: ["A separate program from adaptation", "The raw material of adaptation", "A legal checklist after the pilot ships"],
          answer: 1
        }
      },
      {
        id: "1b", week: 2, minutes: 40, title: "Safety is the floor",
        aim: "Use psychological safety as a working condition, not a poster.",
        reading: 'Read Chapter 2. If a For Your Organization section sits with it, do that section before you write. Copy the chapter title as printed.',
        teach: [
          "Edmondson’s finding, confirmed across Frazier’s meta-analysis of more than 22,000 people, is simple: teams learn when interpersonal risk is survivable. AILT uses that as the mediating mechanism. Diverse perspective does not enter a decision if the cost of offering it is status, the job, or silence afterward.",
          "Safety is not comfort and it is not agreement. It is the ability to say “the model is wrong about my team” and still be in the room next week.",
          "Leaders install it with behavior, not a values slide. The first move is a script you actually say: what is safe to challenge here, what happens when someone is wrong, and what you will do when you are the one who is wrong."
        ],
        practice: [
          "Write a 60-second opener you will use in your next staff meeting.",
          "Name one recent moment someone went quiet. What did it cost?",
          "Decide the one behavior you will stop this week that punishes bad news."
        ],
        prompt: 'What does this chapter say psychological safety is, and what does it say it is not? Name one behavior you will stop because of a specific page.',
        check: {
          q: "Psychological safety in AILT is…",
          options: ["Niceness and consensus", "The condition that lets the three constructs work", "A survey you run once a year"],
          answer: 1
        }
      }
    ]
  },
  {
    id: 2, weeks: "3–4", title: "Inclusive Adaptive Capacity",
    construct: "IAC",
    summary: "Tell a technical problem from an adaptive challenge, and put the people who live the challenge inside the response.",
    lessons: [
      {
        id: "2a", week: 3, minutes: 45, title: "Technical or adaptive",
        aim: "Stop applying a technical fix to a problem that requires new learning.",
        reading: 'Read Chapter 3. Stay with how the book separates a technical problem from an adaptive one. Copy the chapter title as printed.',
        teach: [
          "A technical problem has a known answer and an expert who can install it. An adaptive challenge does not. People must change what they believe, protect, or know how to do. AI rollouts are usually sold as technical and lived as adaptive.",
          "Inclusive Adaptive Capacity is the collective skill of responding by integrating perspectives the expert does not have. Seniority is not a substitute for that. If the room is uniform, the adaptation will be too.",
          "The practical test: if you removed the people most affected and the plan still looks the same, you do not have an adaptive response. You have a deployment."
        ],
        practice: [
          "Take one live initiative. Label it technical, adaptive, or mixed.",
          "For the adaptive part, write the learning the organization does not have yet.",
          "Name two people who hold that learning and are not currently decision-makers."
        ],
        prompt: 'How does the chapter separate a technical problem from an adaptive one? Apply that distinction to one initiative you are in, using the book’s language and then your situation.',
        check: {
          q: "An adaptive challenge is one where…",
          options: ["An expert already has the fix", "People must learn something the current plan does not know", "The vendor’s documentation is complete"],
          answer: 1
        }
      },
      {
        id: "2b", week: 4, minutes: 45, title: "Who gets to integrate",
        aim: "Design a decision so difference changes the answer, not just the attendance list.",
        reading: 'Read Chapter 4. Mark the passage that says when a different perspective has actually changed a decision. Copy the chapter title as printed.',
        teach: [
          "Inviting people is not integration. Integration is when a perspective changes the specification, the metric, or the stop-rule. IAC fails in the polite meeting where everyone speaks and the original slide still ships.",
          "Build a small structure: affected group, a skeptic from another function, and the person who will operate the system on a Tuesday. Give them a question with teeth. “What would make this unsafe or unfair in your work?” is a better prompt than “any concerns?”",
          "Then close the loop in writing. What changed because they were there. If nothing changed, say that too. Pretending is how safety dies."
        ],
        practice: [
          "Rewrite the next decision meeting as three roles and one question.",
          "Add a stop-rule: the decision does not proceed if the affected role is absent.",
          "Draft the one-paragraph close you will send afterward."
        ],
        prompt: 'What does the chapter say it takes for a different perspective to change a decision, not merely attend? Describe one meeting you will redesign because of a passage you marked.',
        check: {
          q: "Integration has happened when…",
          options: ["Attendance was diverse", "A perspective changed the decision", "The slide deck thanked everyone"],
          answer: 1
        }
      }
    ]
  },
  {
    id: 3, weeks: "5–6", title: "Participatory Sensemaking",
    construct: "PS",
    summary: "Interpret ambiguity together, especially when an AI system produces an answer nobody can fully explain.",
    lessons: [
      {
        id: "3a", week: 5, minutes: 45, title: "More than one reading",
        aim: "Treat competing interpretations as the work, not as a delay.",
        reading: 'Read Chapter 5. Mark the method the book gives for holding more than one reading of an event. Copy the chapter title as printed.',
        teach: [
          "Sensemaking is what a group does when the facts do not yet mean one thing. Participatory Sensemaking insists that the official narrative is one reading, not the reading. Frontline observation counts as evidence, not color commentary.",
          "Leaders usually collapse ambiguity too early because a single story feels like control. The cost shows up later as surprise. The people who could have named the surprise were in the building.",
          "A usable method is short. Put the event on the wall. Ask for three readings: what management thinks happened, what the people closest to the work think happened, and what would have to be true for each to be right. Do not vote. Decide which reading you will test."
        ],
        practice: [
          "Pick a recent surprise: a missed target, a resignation cluster, a model result nobody expected.",
          "Write the official reading and one rival reading.",
          "Name the smallest test that would tell you which is closer."
        ],
        prompt: 'What method does the chapter give for holding more than one reading? Apply it to a surprise your team still explains in only one way.',
        check: {
          q: "Participatory sensemaking asks a team to…",
          options: ["Pick a story quickly so work can resume", "Hold more than one interpretation long enough to test it", "Defer every decision to the most senior person"],
          answer: 1
        }
      },
      {
        id: "3b", week: 6, minutes: 45, title: "When the model is a black box",
        aim: "Build a habit for interpreting AI output instead of obeying it.",
        reading: 'Read Chapter 6. Mark how the book tells a leader to treat an AI result nobody can fully explain. Copy the chapter title as printed.',
        teach: [
          "An algorithmic recommendation is an ambiguous object. It has a score and almost no story. AILT’s claim is that diverse teams must interpret that output together, because no single role can see who the score misreads.",
          "Do not start with “do we trust the vendor.” Start with a case. One real person the system would rank, reject, schedule, or flag. Ask the room: what does the system think it knows, what can it not know, and who is absent from the training history.",
          "Intellectual humility is a leadership behavior here. Say what you do not know about the model before you ask anyone else to."
        ],
        practice: [
          "Choose one AI output your team might act on.",
          "Write three questions the output cannot answer.",
          "Assign who must be in the room before anyone acts on it."
        ],
        prompt: 'How does the book tell a leader to treat an AI output nobody can fully explain? Name one output your organization might obey, and the question the chapter says to ask first.',
        check: {
          q: "A black-box recommendation should be treated as…",
          options: ["A decision", "An ambiguous object that still needs interpretation", "Something only the data team may discuss"],
          answer: 1
        }
      }
    ]
  },
  {
    id: 4, weeks: "7–8", title: "Equity-Centered Flexibility",
    construct: "ECF",
    summary: "Change the plan when the burden is uneven. Equity is a design constraint during the change, not a review after it.",
    lessons: [
      {
        id: "4a", week: 7, minutes: 45, title: "Who pays for the change",
        aim: "See differential impact before the rollout, not in the exit interviews.",
        reading: 'Read Chapter 7. Mark how the book asks you to see who carries the cost of a change. Copy the chapter title as printed.',
        teach: [
          "Flexibility that ignores equity is just speed for the people already comfortable. Equity-Centered Flexibility asks a prior question: who carries the cost of this change, in time, risk, status, or income, and was that cost chosen or dumped.",
          "The same policy is not the same experience. A return-to-office rule, a new scheduling model, an AI screen on applications. The average outcome can look fine while one group absorbs the harm.",
          "The move is concrete. Before you lock the plan, name three groups and write the burden for each. If you cannot name the groups, you are not ready to call the change equitable."
        ],
        practice: [
          "Take a change already in motion.",
          "Name three groups and the specific burden for each.",
          "Circle the burden that is currently invisible to the steering group."
        ],
        prompt: 'How does the chapter ask you to see who pays for a change? Name three groups and the burden the book trained you to look for.',
        check: {
          q: "Equity-centered flexibility begins by…",
          options: ["Measuring average satisfaction", "Naming who carries the uneven cost", "Publishing a diversity statement"],
          answer: 1
        }
      },
      {
        id: "4b", week: 8, minutes: 45, title: "Redesign, don’t apologize",
        aim: "Change the structure when the burden is unjust, instead of explaining it.",
        reading: 'Read Chapter 8. Mark what the book says to do after an uneven impact is visible. Copy the chapter title as printed.',
        teach: [
          "AILT does not treat equity as a speech after the decision. If a change disproportionately burdens a group, the flexible act is to adjust the change. Access to tools and training is part of the change, not a perk for people who already have time.",
          "Hold yourself to a sentence you can be checked on: “We will not ship this until group X can actually use it, appeal it, or refuse it without penalty.”",
          "Then watch the system after launch. Differential outcomes are an operations metric. Who gets flagged, slowed, cut, or passed over. Review it on a cadence, with the people affected in the review."
        ],
        practice: [
          "Write the sentence you will not ship without.",
          "Name the metric you will watch, and how often.",
          "Name who can stop the rollout, and that it is not only the sponsor."
        ],
        prompt: 'What does the book say to do once an uneven impact is visible? Put that standard in your own words and name one change you will not ship until it meets the page.',
        check: {
          q: "After an uneven impact is visible, ECF asks you to…",
          options: ["Explain why the average is still good", "Adjust the change", "Wait for the annual report"],
          answer: 1
        }
      }
    ]
  },
  {
    id: 5, weeks: "9–10", title: "AILT and AI Governance",
    construct: "Governance",
    summary: "Lead the system that chooses, tests, and can refuse an AI tool. Governance is a leadership practice, not a policy PDF.",
    lessons: [
      {
        id: "5a", week: 9, minutes: 50, title: "Govern the system",
        aim: "Install a minimum governance loop before another tool goes live.",
        reading: 'Read Chapters 9 and 10. Mark the governance questions the book insists on before a tool is live. Copy both chapter titles as printed.',
        teach: [
          "AI governance fails when it is a committee of titles reviewing a slide after procurement has already signed. AILT’s loop is smaller and earlier. Who proposes the tool. Who is affected. Who can interpret a strange output. Who can stop it. Who is accountable when it harms someone.",
          "Five questions cover most of the risk. Who decided. Who was missing. What was tested across groups. Where can a person appeal. What happens to the person who reports a bad result.",
          "If any answer is “the vendor,” you do not have governance. You have a subscription."
        ],
        practice: [
          "Pick one tool already in use.",
          "Answer the five questions in one line each.",
          "Mark the answer you are least willing to say out loud. That is the work."
        ],
        prompt: 'What governance questions does the book insist on before a tool is live? Answer them for one tool you use, and mark the answer the chapter would not accept.',
        check: {
          q: "Governance is missing when…",
          options: ["The vendor’s contract is signed", "No one affected can stop or appeal the system", "The tool has a name"],
          answer: 1
        }
      },
      {
        id: "5b", week: 10, minutes: 50, title: "What the cases already taught",
        aim: "Use known failures as design constraints, not as headlines.",
        reading: 'Read Chapters 11 and 12. If the Amazon résumé screener, iTutorGroup, or Workday pages fell earlier, reread them and use those pages. Copy the chapter titles as printed.',
        teach: [
          "Amazon’s resume screener learned the company’s past and then preferred it. The lesson for IAC: a model trained on a narrow history will reproduce that history unless different people are allowed to reject the pattern.",
          "The EEOC’s case against iTutorGroup, and litigation around Workday’s screening tools, make the same point in legal language. If a tool sorts people, the employer owns the sorting. “The software did it” is not a leadership position.",
          "An and colleagues’ 2025 work in PNAS Nexus adds the research version: models can systematically disadvantage applicants. Sensemaking and equity checks are not optional extras on top of a clever pilot. They are how you avoid becoming the next example."
        ],
        practice: [
          "Write the one-sentence lesson from these cases for your organization.",
          "Name the system you would not want read aloud in a hearing.",
          "Add one control this month: a test across groups, an appeal path, or a refusal right."
        ],
        prompt: 'Using the cases in these chapters, what does the book say the organization owns when a tool sorts people? Name the system you would not want read aloud, and the control the pages imply.',
        check: {
          q: "The leadership lesson of the hiring-tool cases is…",
          options: ["Buy a better vendor", "The organization owns the sorting the tool does", "Bias is only a technical bug"],
          answer: 1
        }
      }
    ]
  },
  {
    id: 6, weeks: "11–12", title: "Capstone",
    construct: "Your plan",
    summary: "Read your own pattern and leave with a development plan someone else could hold you to.",
    lessons: [
      {
        id: "6a", week: 11, minutes: 50, title: "Read your pattern",
        aim: "See which construct you practice and which you skip.",
        reading: 'Read Chapters 13 and 14. Complete the book’s assessment if it falls here. If the assessment sits elsewhere, complete it this week and write from those items. Copy the chapter titles as printed.',
        teach: [
          "Look back at what you wrote. Leaders usually over-identify with one construct. Some are excellent at inviting voices and unwilling to change the plan. Some will redesign for equity and never let the room interpret the model. Some love the framework and have never made it safe to disagree with them.",
          "Use the tools you already have. The self-assessment is forty items across IAC, participatory sensemaking, equity-centered flexibility, and psychological safety. The 360 shows the gap between your score and the team’s. Disagreement there is data, not an insult.",
          "Pick one construct. Not three. A plan that starts everywhere ends nowhere."
        ],
        practice: [
          "Score yourself honestly, 1 to 5, on IAC, sensemaking, equity-centered flexibility, and safety.",
          "Ask one person who will not flatter you to score the same four.",
          "Write the gap in a sentence that does not blame them."
        ],
        prompt: 'Using the book’s assessment or the pattern across the chapters you have read, which capacity do you practice and which do you skip? Write the gap in a sentence that names the chapter that convinced you.',
        check: {
          q: "The capstone asks you to develop…",
          options: ["All four areas at once", "One construct you can be held to", "A longer slide about the theory"],
          answer: 1
        }
      },
      {
        id: "6b", week: 12, minutes: 50, title: "A plan someone can see",
        aim: "Leave with three actions, a witness, and a date.",
        reading: 'Read Chapter 15 and every For Your Organization section you have not already used in a journal. Copy the chapter title as printed.',
        teach: [
          "A personal AILT plan is not a vision statement. It is three moves inside the work you already have. One behavior you will start. One meeting you will redesign. One system you will not let ship unchanged.",
          "Each move needs a witness who is not you, a date inside thirty days, and a sign that it happened. “I will be more inclusive” is not a sign. “The appeal path is written and the affected team has seen it” is.",
          "Then tell the truth about the cost. Inclusive adaptation is slower at the start. The theory’s claim is that it is less blind afterward. Say that to the person who wants the pilot live on Friday."
        ],
        practice: [
          "Write the three moves in one line each.",
          "Name the witness and the date for each.",
          "Write the sentence you will say when someone calls this a delay."
        ],
        prompt: 'From Chapter 15 and the For Your Organization sections, write three moves. Tie each one to a page. Name a witness and a date. This journal is the plan.',
        check: {
          q: "A finished plan is real when…",
          options: ["It inspires you", "Someone else can tell whether you did it", "It mentions all three constructs by name"],
          answer: 1
        }
      }
    ]
  }
];
