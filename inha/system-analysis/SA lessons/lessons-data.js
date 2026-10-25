/* merged from lessons/S*.json */
const LESSONS = [
 {
  "id": "W1a-1",
  "label": "W1a·1",
  "week": "W1a",
  "slides": [
   2,
   3,
   4,
   7,
   8,
   9,
   10,
   11,
   12,
   13,
   14,
   15,
   16,
   17
  ],
  "kind": "theory",
  "title": "Systems, the project team, and the 4 SDLC phases with their deliverables",
  "hook": "After this lesson you can say why we need a formal process, name the 5 team roles, and list the 4 SDLC phases with the main deliverable of each one.",
  "cards": [
   {
    "h": "Why do we need a formal process?",
    "body": "<p>Imagine Inha builds a new <b>course-registration system</b> by just starting to code. On registration day it crashes, the deadline moves, and half the features are missing. This happens a lot in real life.</p>\n<p>The professor's slide (W1a-S4) gives 3 reasons for a formal process:</p>\n<ol><li>Failures occur (too) often.</li><li>Creating systems is <b>not intuitive</b>.</li><li>Projects are <b>late, over budget</b>, or delivered with <b>fewer features</b> than planned.</li></ol>\n<p>So: <b>\"The System Analyst is the key person.\"</b> The analyst designs a system to <b>add value</b> and must <b>understand the business processes</b>. The job is rewarding but challenging, and it needs specific skills.</p>\n<p><i>Course facts (W1a-S2):</i> midterm + final + two quizzes; news in the Telegram channel; a recommendation letter only for B+ or higher.</p>"
   },
   {
    "h": "What is a system?",
    "body": "<p>The word comes from Greek <i>systema</i>: an organized relationship between parts that work for one goal.</p>\n<p><b>Definition (W1a-S7):</b> a system is \"an orderly grouping of <b>interdependent components</b> linked together according to a plan to achieve a <b>specific goal</b>.\"</p>\n<p>Example: a Tashkent café ordering app. Menu screen, cart, kitchen screen and payment are components. They need each other. The goal: serve the customer fast.</p>\n<p><b>3 basic constraints of a system:</b></p>\n<ol><li>It has <b>structure and behavior</b> designed for a predefined objective.</li><li><b>Interconnectivity and interdependence</b> between the components.</li><li>The <b>organization's objectives</b> have higher priority than the objectives of its <b>subsystems</b>. (If the payment part wants 5 extra checks but the café wants fast service, the café goal wins.)</li></ol>"
   },
   {
    "h": "Who is on the project team? (W1a-S3)",
    "body": "<p>The slide shows a funny photo: one man digs a hole and many people watch. Each watcher has a label (Project manager, System Analyst, Business Analyst, Manager, Head of department, Project Champion, Product owner, SCRUM Master...). The table next to it gives <b>5 roles</b>:</p>\n<table><tr><th>Role</th><th>What they do</th></tr>\n<tr><td><b>Business analyst</b></td><td>Key business aspects; how the system gives <b>business value</b>; designs new business processes <b>and policies</b></td></tr>\n<tr><td><b>Systems analyst</b></td><td>How <b>technology</b> can improve business processes; designs new processes; <b>designs the information system</b>; checks IS standards</td></tr>\n<tr><td><b>Infrastructure analyst</b></td><td>Infrastructure standards; infrastructure changes needed (servers, network)</td></tr>\n<tr><td><b>Change management analyst</b></td><td>Change management plan + <b>user training plan</b></td></tr>\n<tr><td><b>Project manager</b></td><td>Manages the team; develops and monitors the project plan; assigns resources; <b>primary point of contact</b></td></tr></table>\n<p>Tip: business analyst = \"why, for the business\"; systems analyst = \"how, with technology\". The slide shows \"hange management / nalyst\": it is a typo for <i>change management analyst</i>.</p>"
   },
   {
    "h": "The SDLC: the big idea",
    "body": "<p><b>SDLC</b> (Systems Development Life Cycle) = \"the process of understanding how an information system (IS) can support business needs by <b>designing</b> a system, <b>building</b> it, and <b>delivering</b> it to users\" (W1a-S8).</p>\n<p>It has <b>4 phases</b> (W1a-S9). Each phase has <b>steps</b>, <b>techniques</b> and <b>deliverables</b> (the documents or things it produces). Each phase also answers one focus question:</p>\n<ul><li>Planning: <i>Why build this system? How to structure the project?</i></li><li>Analysis: <i>Who, what, where and when?</i></li><li>Design: <i>How will this system work?</i></li><li>Implementation: <i>delivery and support of the completed system</i></li></ul>\n<p>Note: the W1b deck (S4) adds a 5th phase, <b>Post production</b> (maintenance), \"probably the longest phase\". Use 4 phases unless the question asks about maintenance.</p>",
    "diagram": "flowchart LR\n  P[\"Planning<br/>Why build it?\"] --> A[\"Analysis<br/>Who, what, where, when?\"]\n  A --> D[\"Design<br/>How will it work?\"]\n  D --> I[\"Implementation<br/>Deliver and support\"]"
   },
   {
    "h": "Phase 1: Planning",
    "body": "<p><b>Steps (W1a-S10):</b></p>\n<ol><li><b>Project initiation:</b> develop or receive a <b>system request</b>; do a <b>feasibility analysis</b>: technical, economic, organizational.</li><li><b>Project management:</b> develop the work plan; staff the project; monitor and control it.</li></ol>\n<p><b>Deliverables (S11 table):</b> System request, Feasibility study, Project plan (work plan, staffing plan, standards list, risk assessment).</p>\n<p><b>Techniques named:</b> project identification; technical / economic / organizational feasibility; time estimation, task identification, work breakdown structure, PERT chart, Gantt chart, scope management; project staffing, project charter; CASE repository, standards, documentation, timeboxing, risk management.</p>\n<p>Registration example: the Dean's office sends a request \"registration crashes every semester\". The team checks: can we build it, is it worth the money, will people use it? (W3 and W4 go deeper.)</p>"
   },
   {
    "h": "Phase 2: Analysis",
    "body": "<p><b>Steps (W1a-S12):</b></p>\n<ol><li><b>Develop an analysis strategy:</b> model the <b>current</b> system, formulate the <b>new</b> system.</li><li><b>Gather the requirements:</b> develop a system concept; create a business model of business <b>data</b> and business <b>processes</b>.</li><li><b>Develop a system proposal.</b></li></ol>\n<p><b>Deliverable (S13):</b> the <b>System proposal</b> = requirements definition + use cases + process models + data model.</p>\n<p><b>Techniques:</b> BPA, BPI, BPR (business process automation / improvement / reengineering); interview, JAD session, questionnaire, document analysis, observation; use case analysis; data flow diagramming; entity relationship modeling, normalization.</p>\n<p>The proposal goes to the steering committee for approval (W1b-S4).</p>"
   },
   {
    "h": "Phases 3 and 4: Design and Implementation",
    "body": "<table><tr><th></th><th>Design (S14, S15)</th><th>Implementation (S16, S17)</th></tr>\n<tr><td>Steps</td><td>1. design strategy<br/>2. architecture and interfaces<br/>3. databases and file specifications<br/>4. program design: what programs to write and what each does</td><td>1. <b>construct</b>: build (write code) and test<br/>2. <b>install</b>: train the users<br/>3. <b>support</b> (maintenance)</td></tr>\n<tr><td>Main deliverable</td><td><b>System specification</b></td><td><b>Installed system</b></td></tr>\n<tr><td>Other deliverables</td><td>alternative matrix, architecture report, hardware and software specification, interface design, physical process model, program design, database and file specification, physical data model</td><td>test plan, programs, documentation, migration plan (conversion plan, business contingency plan, training plan), support plan, problem report, change request, post-implementation audit report</td></tr>\n<tr><td>Some techniques</td><td>architecture design, hardware and software selection, interface prototype, program structure chart, denormalization, performance tuning</td><td>programming, software and performance testing, conversion strategy selection, training, system maintenance, post-implementation audit</td></tr></table>"
   }
  ],
  "example": {
   "problem": "<p>A Tashkent café wants an online ordering app. For each SDLC phase, say one thing the team does and the main deliverable.</p>",
   "solution": "<table><tr><th>Phase</th><th>What the team does</th><th>Main deliverable</th></tr>\n<tr><td>Planning</td><td>Owner writes the request; team checks technical, economic and organizational feasibility; makes a work plan</td><td>System request + feasibility study; project plan</td></tr>\n<tr><td>Analysis</td><td>Interviews waiters and customers; models how orders flow today and in the new app</td><td>System proposal</td></tr>\n<tr><td>Design</td><td>Chooses the architecture, designs screens and the database</td><td>System specification</td></tr>\n<tr><td>Implementation</td><td>Codes and tests the app, trains staff, supports it</td><td>Installed system</td></tr></table>"
  },
  "check": [
   {
    "q": "Why do we need a formal process? (W1a-S4)",
    "a": "Failures occur too often; creating systems is not intuitive; projects are late, over budget or have fewer features than planned. So the system analyst is the key person."
   },
   {
    "q": "Name the 3 basic constraints of a system.",
    "a": "1) structure and behavior for a predefined objective; 2) interconnectivity and interdependence of components; 3) the organization's objectives have higher priority than the subsystems' objectives."
   },
   {
    "q": "Which role develops the user training plan?",
    "a": "The <b>change management analyst</b> (change management plan + user training plan)."
   },
   {
    "q": "Business analyst vs systems analyst: one difference?",
    "a": "Business analyst focuses on business value and new processes <b>and policies</b>; systems analyst focuses on how <b>technology</b> improves processes and designs the information system."
   },
   {
    "q": "In which phase is feasibility analysis done, and what are its 3 types?",
    "a": "Planning (project initiation): technical, economic, organizational feasibility."
   },
   {
    "q": "What is the primary deliverable of the Analysis phase, and what does it contain?",
    "a": "The system proposal: requirements definition, use cases, process models, data model."
   }
  ],
  "exam": {
   "question": "<p>List the phases of the SDLC. For each phase give its main steps and its primary deliverable.</p>",
   "answer": "<ol><li><b>Planning</b>: project initiation (system request, feasibility: technical, economic, organizational) and project management (work plan, staffing, monitor and control). Deliverable: <b>system request with feasibility study, and project plan</b>.</li>\n<li><b>Analysis</b>: analysis strategy (current and new system), gather requirements, system proposal. Deliverable: <b>system proposal</b>.</li>\n<li><b>Design</b>: design strategy, architecture and interfaces, databases and files, program design. Deliverable: <b>system specification</b>.</li>\n<li><b>Implementation</b>: construct (build and test), install (train users), support. Deliverable: <b>installed system</b>.</li></ol>\n<p>(Optional: W1b-S4 adds a 5th phase, post production / maintenance, the longest one.)</p>",
   "diagram": "flowchart LR\n  P[Planning] --> D1([\"System request + feasibility study, project plan\"])\n  D1 --> A[Analysis]\n  A --> D2([System proposal])\n  D2 --> DS[Design]\n  DS --> D3([System specification])\n  D3 --> I[Implementation]\n  I --> D4([Installed system])"
  },
  "memorize": [
   "Formal process because: failures often, not intuitive, late / over budget / fewer features",
   "System = orderly grouping of interdependent components, linked by a plan, for a specific goal",
   "3 constraints: structure + behavior; interdependence; organization goals over subsystem goals",
   "5 roles: business analyst, systems analyst, infrastructure analyst, change management analyst, project manager",
   "SDLC: Planning → Analysis → Design → Implementation (+ Post production in W1b-S4)",
   "Deliverables: system request + feasibility study + project plan → system proposal → system specification → installed system",
   "Feasibility: technical, economic, organizational"
  ],
  "note": "Slide typo: W1a-S3 table shows 'hange management / nalyst' (= change management analyst)."
 },
 {
  "id": "W1b-1",
  "label": "W1b·1",
  "week": "W1b",
  "slides": [
   2,
   6,
   7,
   8,
   9,
   10,
   11,
   45,
   47
  ],
  "kind": "theory",
  "title": "The systems analyst: career paths, soft vs hard skills, and the AI-augmented analyst",
  "hook": "After this lesson you can solve the professor's soft-vs-hard-skills exercise and explain what an AI-augmented analyst does.",
  "cards": [
   {
    "h": "Career paths for system developers (S2)",
    "body": "<p>People usually start in one of 2 entry-level jobs, then move to analyst jobs, then to senior jobs. Solid arrows = <b>more common</b> path, dashed = <b>less common</b> path.</p>\n<ul><li>Business function specialist → requirements analyst, business analyst (common), systems analyst (less common).</li><li>Programmer/analyst → business analyst, systems analyst, infrastructure analyst (common), requirements analyst (less common).</li><li>Top of the ladder: change management analyst, project manager, software architect.</li></ul>",
    "diagram": "flowchart LR\n  E1([\"Entry-level business function specialist\"])\n  E2([\"Entry-level programmer/analyst\"])\n  RA[Requirements analyst]\n  BA[Business analyst]\n  SA[Systems analyst]\n  IA[Infrastructure analyst]\n  CM[Change management analyst]\n  PM[Project manager]\n  SW[Software architect]\n  E1 --> RA\n  E1 --> BA\n  E1 -.-> SA\n  E2 -.-> RA\n  E2 --> BA\n  E2 --> SA\n  E2 --> IA\n  RA --> CM\n  BA --> CM\n  BA --> PM\n  SA --> PM\n  SA -.-> SW\n  IA --> SW"
   },
   {
    "h": "Hard skills vs soft skills (S6)",
    "body": "<p><b>Skill</b> = the ability to do something well.</p>\n<table><tr><th></th><th>Hard skills</th><th>Soft skills</th></tr>\n<tr><td>What</td><td>professional skills</td><td>socio-psychological, personal skills</td></tr>\n<tr><td>Measure?</td><td>can be measured, assessed, verified</td><td>difficult to measure or confirm at an interview</td></tr>\n<tr><td>Proof</td><td>a specific action, certificate, portfolio</td><td>shows over time</td></tr>\n<tr><td>Profession</td><td>tied to a profession</td><td>do not depend on the profession</td></tr>\n<tr><td>Examples</td><td>driving a car, touch-typing, programming in a language</td><td>planning your time and focusing on what is important, <b>analytical thinking</b>, justifying decisions, teamwork, teaching others</td></tr></table>\n<p>Soft skills are aimed at <b>yourself or other people</b>. They can be innate or learned from experience.</p>\n<p><b>Trap:</b> \"analytical thinking\" sounds technical, but on the slide it is a <b>soft</b> skill.</p>"
   },
   {
    "h": "The professor's exercise (S7): soft or hard?",
    "body": "<p>He gave 6 statements. The answers were printed in blue:</p>\n<table><tr><th>#</th><th>Statement</th><th>Answer</th></tr>\n<tr><td>1</td><td>Not related to a specific profession</td><td><b>Soft</b></td></tr>\n<tr><td>2</td><td>Take a long time and are difficult to develop; need a lot of analysis of your own and other people's behavior</td><td><b>Soft</b></td></tr>\n<tr><td>3</td><td>Relatively easy to obtain through training</td><td><b>Hard</b></td></tr>\n<tr><td>4</td><td>Mastery is revealed over time</td><td><b>Soft</b></td></tr>\n<tr><td>5</td><td>Are tied to a specific profession</td><td><b>Hard</b></td></tr>\n<tr><td>6</td><td>Can be confirmed here and now; you can get a certificate or diploma</td><td><b>Hard</b></td></tr></table>\n<p><b>Trick:</b> the statements come in <b>opposite pairs</b>: 1↔5 (profession?), 2↔3 (hard or easy to learn), 4↔6 (over time vs here and now). Soft = 1, 2, 4. Hard = 3, 5, 6.</p>",
    "diagram": "flowchart TD\n  Q{\"Can you prove it now, with a test or certificate?\"} -->|Yes| H[Hard skill]\n  Q -->|No| Q2{\"Is it tied to one profession?\"}\n  Q2 -->|Yes| H\n  Q2 -->|\"No, it grows slowly with experience\"| S[Soft skill]"
   },
   {
    "h": "The AI-augmented analyst (S8, S9)",
    "body": "<p>An <b>AI-augmented analyst</b> is a human analyst who uses AI tools as <b>cognitive partners</b>: <i>not replaced</i> by AI, but <i>enhanced</i> by it. AI does routine, pattern-based, data-heavy work. The human does <b>judgment, creativity, ethics and talking to stakeholders</b>.</p>\n<p><b>Division of labor (S9):</b> interview: human reads body language, AI transcribes and summarizes · prioritization: human makes the final judgment, AI suggests · feasibility: human interprets constraints, AI estimates cost and time · UML: AI drafts, human reviews · documentation: AI first draft, human polishes · risks: human for business/political, AI for technical · ethics: human judges, AI flags bias.</p>\n<p><b>6 new skills (S8):</b> prompt engineering · AI output validation (detect hallucinations, bias, errors) · data literacy · ethical AI awareness · AI-tool orchestration (chain tools: ChatGPT → Copilot → AI tester) · model evaluation (precision vs recall).</p>"
   },
   {
    "h": "AI-aware design (S10, S11)",
    "body": "<p>AI parts of a system behave differently from normal code, so the design must change:</p>\n<table><tr><th>Normal OO assumption</th><th>AI reality</th><th>Design fix</th></tr>\n<tr><td>same input → same output</td><td>probabilistic</td><td>confidence scores, retries</td></tr>\n<tr><td>state is visible</td><td>hidden weights</td><td>model versioning, snapshots</td></tr>\n<tr><td>errors are bugs</td><td>statistical errors (false positives/negatives)</td><td>human-in-the-loop fallback</td></tr>\n<tr><td>predictable speed</td><td>inference time varies</td><td>async, caching, batching</td></tr>\n<tr><td>exhaustive testing</td><td>statistical validation (precision, recall, F1)</td><td>model evaluation pipelines</td></tr></table>\n<p><b>5 AI-aware patterns:</b> Model Wrapper (ChatbotModel.predict()) · Human-in-the-Loop (ReviewQueue.escalate_to_human()) · Model Version Manager (ModelRegistry) · Feature Store · Drift Detector (DriftMonitor.check_drift()).</p>"
   },
   {
    "h": "AI inside the methodologies (S45, S47)",
    "body": "<p>4 AI-enhanced methodologies (S45):</p>\n<ul><li><b>AI-Augmented Agile</b>: AI helps sprint planning, story estimation, backlog priority (Jira AI predicts which stories will miss the sprint).</li><li><b>MLOps</b>: DevOps for ML models; version data, models and code together (DVC, MLflow).</li><li><b>LLM-Driven Development</b>: LLMs generate code, tests, docs (GitHub Copilot, Cursor, Windsurf).</li><li><b>Automated Methodology Selection</b>: AI reads project parameters (team size, unclear requirements, risk) and recommends a methodology.</li></ul>\n<p>S47 \"Key takeaways\" lists the learning outcomes of the deck: compare methodologies, modern analyst skills, the AI-augmented role, AI-aware OO design.</p>"
   }
  ],
  "example": {
   "problem": "<p>Soft or hard? (new practice items in the S7 style)<br/>a) Can write SQL queries<br/>b) Explains a difficult idea calmly to an angry client<br/>c) Has a Scrum Master certificate<br/>d) Plans their time and focuses on what is important<br/>e) Can draw UML diagrams in a CASE tool<br/>f) Works well in a team</p>",
   "solution": "<p>a) <b>Hard</b> (tied to IT, can be tested now)<br/>b) <b>Soft</b> (people skill, grows with experience)<br/>c) <b>Hard</b> (certificate = confirmed here and now)<br/>d) <b>Soft</b> (listed as soft on S6)<br/>e) <b>Hard</b> (professional, can be shown in a portfolio)<br/>f) <b>Soft</b> (teamwork is on the S6 soft list)</p>"
  },
  "check": [
   {
    "q": "Define a skill, a hard skill and a soft skill.",
    "a": "Skill = ability to do something well. Hard = professional, measurable, verifiable by action/certificate/portfolio. Soft = socio-psychological/personal, not tied to a profession, hard to measure at an interview."
   },
   {
    "q": "\"Mastery is revealed over time.\" Soft or hard?",
    "a": "Soft (its pair, \"can be confirmed here and now\", is hard)."
   },
   {
    "q": "Is analytical thinking a hard or a soft skill on the slides?",
    "a": "Soft (W1b-S6)."
   },
   {
    "q": "What is an AI-augmented analyst?",
    "a": "A human analyst who uses AI as a cognitive partner: enhanced, not replaced. AI does routine/data work; the human does judgment, creativity, ethics, stakeholder interaction."
   },
   {
    "q": "Which AI-aware pattern sends low-confidence predictions to a person?",
    "a": "Human-in-the-Loop (class ReviewQueue with escalate_to_human())."
   }
  ],
  "exam": {
   "question": "<p>Determine which statements are true for describing soft skills, and which are true for hard skills: 1) Not related to a specific profession. 2) Take a long time and are difficult to develop. 3) Relatively easy to obtain through training. 4) Mastery is revealed over time. 5) Are tied to a specific profession. 6) Can be confirmed here and now; you can get a certificate or diploma.</p>",
   "answer": "<p>Soft skills: <b>1, 2, 4</b>. Hard skills: <b>3, 5, 6</b>.<br/>Reason: hard skills are professional and can be measured and confirmed now (certificate); soft skills are personal, not tied to a profession, and show only over time.</p>"
  },
  "memorize": [
   "Soft = 1, 2, 4 · Hard = 3, 5, 6 (pairs 1↔5, 2↔3, 4↔6)",
   "Hard: measurable, certificate, tied to profession, easy to train",
   "Soft: personal, not profession-tied, slow to develop, revealed over time; analytical thinking is SOFT",
   "AI-augmented analyst: enhanced, not replaced; human = judgment, ethics, stakeholders",
   "6 AI skills: prompt engineering, output validation, data literacy, ethical AI, tool orchestration, model evaluation",
   "5 patterns: Model Wrapper, Human-in-the-Loop, Model Version Manager, Feature Store, Drift Detector"
  ]
 },
 {
  "id": "W1b-2",
  "label": "W1b·2",
  "week": "W1b",
  "slides": [
   3,
   4,
   5,
   12,
   13,
   14,
   15,
   16,
   17,
   18,
   26,
   40,
   41,
   42,
   43,
   54,
   55,
   56,
   57
  ],
  "kind": "theory",
  "title": "Methodologies: what they are, the 3 classes, and plan-driven vs agile",
  "hook": "After this lesson you can define a methodology, sort any methodology into Structured / RAD / Agile, and compare plan-driven and agile processes.",
  "cards": [
   {
    "h": "A methodology is the recipe for the SDLC",
    "body": "<p>The SDLC says <i>what</i> phases exist. A <b>methodology</b> says <i>how</i> to go through them: \"a formalized approach to implementing the SDLC (a list of steps and deliverables)\" (S12).</p>\n<p>Where do methodologies come from? In-house (the company's own), from consulting firms, from the software vendor, or required by government projects.</p>\n<p>⭐ <b>How we tell methodologies apart</b> (S13, bold): \"the <b>sequencing of the SDLC phases</b> and the <b>amount of time and effort</b> devoted to each\".</p>\n<p>In the early days programmers jumped from a fuzzy request straight into writing code, like a student doing homework the night before. That caused the failures from W1a.</p>\n<p>S3 shows many different SDLC pictures (5, 6, 7 phases...): there is no single official version. S4 describes 5 phases: Planning, Analysis (the key phase, ends with the <b>system proposal</b> approved by the steering committee), Design, Implementation, Post production (maintenance, the longest).</p>"
   },
   {
    "h": "Plan-driven vs agile processes",
    "body": "<table><tr><th>Plan-driven</th><th>Agile</th></tr>\n<tr><td>All activities are <b>planned in advance</b>; progress is measured against the plan (S16)</td><td>Planning is <b>incremental</b>; easy to change when customer requirements change</td></tr>\n<tr><td>Used for <b>high-level</b> planning (S5)</td><td>Used for <b>low-level</b> planning</td></tr>\n<tr><td>Example: Waterfall</td><td>Examples: XP, Scrum</td></tr></table>\n<p>⭐ \"In practice, most practical processes include elements of both.\" \"There are <b>no right or wrong</b> software processes.\"</p>\n<p>S57 <b>Rolling wave planning</b>: a big high-level arc for the whole project, middle arcs per stage, small weekly/monthly plans. \"Planning is Throughout the Project - Not a Stage.\"</p>\n<p>S15: <b>process standardization</b> (less variety of processes in a company) gives better communication, less training time, and cheaper automated support.</p>",
    "diagram": "flowchart LR\n  subgraph HL[\"High-level plan: plan-driven, whole project\"]\n    L1((\"low-level plan 1\")) --> L2((\"low-level plan 2\"))\n    L2 --> L3((\"low-level plan 3\"))\n    L3 --> L4((\"low-level plan 4\"))\n  end"
   },
   {
    "h": "The 3 classes of methodologies (S17, S18, S26)",
    "body": "<ul><li><b>Structured design</b> (dominant in the <b>1980s</b>): a formal step-by-step approach, phase after phase. → <b>Waterfall, Parallel</b>.</li>\n<li><b>RAD, Rapid Application Development</b> (<b>1990s</b>): get <b>some part</b> of the system to users <b>quickly</b>, so they understand it and suggest changes. → <b>Phased, Prototyping</b> (Throwaway prototyping follows on the slides).</li>\n<li><b>Agile</b>: programming-centric, less documentation. → <b>eXtreme Programming (XP), SCRUM</b>.</li></ul>\n<p><b>RAD speed-up tools (S26):</b> CASE tools · JAD sessions · fourth-generation / visual programming languages (e.g. Visual Basic) · code generators.</p>\n<p>RAD fixes \"both weaknesses\" of structured design. From S23, S24 and S31 these are: (1) a long wait before users see anything, and (2) it is hard to react when requirements change.</p>\n<p><b>Trap:</b> Phased and Prototyping are RAD, not structured. Parallel is structured.</p>",
    "diagram": "flowchart TD\n  M[Methodologies] --> ST[\"Structured, 1980s\"]\n  M --> RD[\"RAD, 1990s\"]\n  M --> AG[Agile]\n  ST --> W[Waterfall]\n  ST --> PA[Parallel]\n  RD --> PH[Phased]\n  RD --> PR[Prototyping]\n  RD -.->|\"shown next\"| TP[Throwaway prototyping]\n  AG --> XP[eXtreme Programming]\n  AG --> SC[SCRUM]"
   },
   {
    "h": "Agile development and the Agile Manifesto (S40, S41)",
    "body": "<p><b>Agile</b> = programming-centric methodologies that streamline the SDLC. Much modeling and documentation is removed; <b>face-to-face communication</b> is preferred. <b>Every iteration is a complete small project</b>: planning, requirements analysis, design, coding, testing, documentation. Cycles are short: <b>1–4 weeks</b>.</p>\n<p><b>Agile Manifesto: 4 values</b> (left side valued <i>more</i>):</p>\n<ol><li><b>Individuals and interactions</b> over processes and tools</li><li><b>Working software</b> over comprehensive documentation</li><li><b>Customer collaboration</b> over contract negotiation</li><li><b>Responding to change</b> over following a plan</li></ol>\n<p>Trap: \"while there is value in the items on the right, we value the items on the left more\". The right side is <b>not worthless</b>.</p>"
   },
   {
    "h": "The 12 agile principles (S42, S43), short version",
    "body": "<ol><li>Deliver software early and continuously; satisfy the customer.</li><li>Welcome changing requirements, even late.</li><li>Deliver working software frequently.</li><li>Customers and developers work together.</li><li>Trust motivated people; give them tools and environment.</li><li>Face-to-face talk is the best way to gather requirements.</li><li><b>Working software is the primary measure of progress.</b></li><li>Sustainable pace: no burnout.</li><li>Technical excellence and good design.</li><li>Simplicity: avoid unnecessary work.</li><li>Self-organizing teams make the best designs.</li><li>Teams regularly reflect and improve.</li></ol>\n<p>Memory hook for a café app team: \"Ship often, welcome change, talk face to face, measure by working app, keep it simple, rest, improve.\"</p>"
   },
   {
    "h": "XP and Scrum, the two agile examples (S54–S56)",
    "body": "<p><b>Extreme Programming (XP)</b>: \"perhaps the best-known and most widely used agile method\".</p>\n<ul><li>New versions built <b>several times per day</b>.</li><li>Increments delivered to customers <b>every 2 weeks</b>.</li><li><b>All tests run for every build</b>; a build is accepted only if the tests pass.</li><li>Principles (S55): small frequent releases; <b>full-time customer</b> with the team; <b>pair programming</b>, collective ownership, no long working hours; change through regular releases; simplicity through constant <b>refactoring</b>.</li></ul>\n<p><b>Scrum</b> (S56): named after the rugby restart. Idea: however much you plan, chaos breaks out when coding starts, so you react and \"sprint\" with the ball. At the end of each sprint a system is delivered to the customer.</p>\n<p>⚠️ W1b-S56 says a sprint lasts \"<b>thirty working days</b>\", but W2 says \"one month or less\" / \"1–4 week sprint\". Quote the deck the question comes from; for general Scrum questions use W2.</p>"
   },
   {
    "h": "6 project characteristics that decide the methodology (S14)",
    "body": "<p>Before choosing, ask 6 questions about the project:</p>\n<ol><li><b>Clarity of user requirements</b>: do users and analysts understand what is needed?</li><li><b>Familiarity with technology</b>: has the team used this technology before?</li><li><b>System complexity</b>: many features, many integrations, many departments?</li><li><b>System reliability</b>: must it never go down?</li><li><b>Short time schedules</b>: is the deadline tight?</li><li><b>Schedule visibility</b>: do sponsors want to <i>see</i> progress often?</li></ol>\n<p>These 6 are exactly the <b>rows of the \"Which Methodology to Use?\" table (S46)</b>. You will use that table at the end of the drawing lessons.</p>"
   }
  ],
  "example": {
   "problem": "<p>Plan-driven or agile? 1) \"All process activities are planned in advance.\" 2) \"Planning is incremental.\" 3) \"Used for high-level planning.\" 4) \"Customer collaboration over contract negotiation.\" 5) \"Mostly used for large systems engineering projects developed at several sites.\" 6) \"Changing requirements are embraced regardless of when they occur.\"</p>",
   "solution": "<p>1) Plan-driven (S16) · 2) Agile (S16) · 3) Plan-driven (S5) · 4) Agile (Manifesto, S41) · 5) Plan-driven: this is Waterfall (S23) · 6) Agile (S42)</p>"
  },
  "check": [
   {
    "q": "What is a methodology?",
    "a": "A formalized approach to implementing the SDLC: a list of steps and deliverables."
   },
   {
    "q": "What is the important factor for categorizing methodologies?",
    "a": "The sequencing of the SDLC phases and the amount of time and effort devoted to each (S13)."
   },
   {
    "q": "Name the 3 classes of methodologies and the examples of each from S17.",
    "a": "Structured: Waterfall, Parallel. RAD: Phased, Prototyping. Agile: XP, Scrum."
   },
   {
    "q": "Name the 4 RAD speed-up tools.",
    "a": "CASE tools, JAD sessions, fourth-generation / visual programming languages (Visual Basic), code generators."
   },
   {
    "q": "XP: how often are builds made and increments delivered?",
    "a": "Builds several times per day; increments every 2 weeks; all tests run on every build."
   },
   {
    "q": "Which approach is used for high-level planning and which for low-level planning?",
    "a": "Plan-driven for high-level, agile for low-level (S5)."
   }
  ],
  "exam": {
   "question": "<p>Classify these methodologies into the three classes and describe each class in one sentence: Waterfall, Phased, XP, Parallel, Prototyping, Scrum.</p>",
   "answer": "<p><b>Structured design</b> (Waterfall, Parallel): formal step-by-step approach, moving logically from one phase to the next (dominant in the 1980s).<br/><b>RAD</b> (Phased, Prototyping): adjusts the SDLC phases to get some part of the system to users quickly so they can suggest revisions; uses CASE, JAD, visual languages, code generators (1990s).<br/><b>Agile</b> (XP, Scrum): programming-centric; short 1–4 week iterations, each a complete mini-project; less documentation, face-to-face communication.</p>",
   "diagram": "flowchart TD\n  M[Methodologies] --> ST[Structured]\n  M --> RD[RAD]\n  M --> AG[Agile]\n  ST --> W[Waterfall]\n  ST --> PA[Parallel]\n  RD --> PH[Phased]\n  RD --> PR[Prototyping]\n  AG --> XP[XP]\n  AG --> SC[Scrum]"
  },
  "memorize": [
   "Methodology = formalized approach to implementing the SDLC (steps + deliverables)",
   "Categorized by: sequencing of SDLC phases + time and effort on each",
   "Structured (1980s): Waterfall, Parallel · RAD (1990s): Phased, Prototyping · Agile: XP, Scrum",
   "RAD tools: CASE, JAD, 4GL/visual languages, code generators",
   "Plan-driven = planned in advance, high-level · Agile = incremental, low-level · no right or wrong process",
   "Manifesto: individuals, working software, customer collaboration, responding to change",
   "XP: builds several times/day, increments every 2 weeks, all tests every build",
   "6 characteristics: clarity of requirements, familiarity with technology, complexity, reliability, short schedule, schedule visibility"
  ],
  "note": "Slide conflict: W1b-S56 says a Scrum sprint is 'thirty working days'; W2 says 'one month or less' (1–4 weeks)."
 },
 {
  "id": "W1b-3",
  "label": "W1b·3",
  "week": "W1b",
  "slides": [
   19,
   20,
   21,
   22,
   23,
   24,
   25
  ],
  "kind": "drawing",
  "title": "Draw it like the professor: Waterfall, V-model and Parallel",
  "hook": "After this lesson you can draw the Waterfall, V-model and Parallel diagrams from memory, exactly in the slide style, and write 2–3 lines plus a pro and a con under each (Quiz 1 asked Waterfall and Parallel).",
  "cards": [
   {
    "h": "The drawing language of the slides",
    "body": "<p>All methodology pictures in W1b use the same symbols. Learn them once, then every diagram is easy:</p>\n<ul><li><b>Rectangle</b> = one phase (Planning, Analysis, Design, Implementation).</li><li><b>Solid curved arrow</b> = go forward to the next phase.</li><li><b>Dashed wavy arrow</b> back to the previous phase = you can go back and fix things.</li><li><b>Rounded box</b> = an output: \"System\", \"System version 1\", \"System prototype\", \"Design prototype\".</li><li><b>Dotted ellipse</b> around boxes = a group that runs on its own or repeats (a subproject, one version).</li><li><b>Stacked block</b> (phases drawn touching, one on top of another) = these phases happen <b>at the same time</b>.</li></ul>\n<p><b>Recipe for any \"Depict graphically\" question:</b> 1) write the title; 2) draw the boxes in the right shape; 3) add solid forward arrows; 4) add dashed back arrows; 5) end in a rounded output box; 6) under it, write 2–3 lines on how it works + 1 pro + 1 con.</p>",
    "diagram": "flowchart LR\n  A[Phase box] -->|\"solid: go forward\"| B[Next phase]\n  B -.->|\"dashed wavy: go back\"| A\n  B --> O([\"Rounded box: output, e.g. System\"])\n  K[\"Stacked block:<br/>Analysis<br/>Design<br/>Implementation<br/>all at the same time\"]"
   },
   {
    "h": "① Waterfall (S20) — Structured, Quiz 1 V2",
    "body": "<p><b>Shape:</b> a <b>staircase going down to the right</b>, like water falling from step to step.</p>\n<p><b>Draw:</b> Planning (top left) → Analysis → Design → Implementation → rounded <b>System</b> (bottom right). 4 solid forward arrows. 3 dashed wavy back arrows: Analysis→Planning, Design→Analysis, Implementation→Design. <i>No</i> arrow back from System.</p>\n<p><b>How it works:</b> a \"cascade from one phase to another\". It is <b>plan-driven</b>: \"you must plan and schedule all of the process activities before starting work on them\" (S21).</p>\n<p><b>Pro:</b> the plan-driven nature helps coordinate work; used for <b>large systems engineering projects developed at several sites</b> (S23).</p>\n<p><b>Con:</b> \"<b>inflexible</b> partitioning of the project into distinct stages makes it difficult to respond to changing customer requirements\"; \"few business systems have stable requirements\"; the system arrives only after completion.</p>\n<p><b>When to use:</b> requirements are <b>well understood</b> and changes will be limited. S46: Good for complex and reliable systems, Poor for the other 4 rows.</p>",
    "diagram": "flowchart TD\n  P[Planning] --> A[Analysis]\n  A --> D[Design]\n  D --> I[Implementation]\n  I --> S([System])\n  A -.-> P\n  D -.-> A\n  I -.-> D"
   },
   {
    "h": "② V-model (S22)",
    "body": "<p><b>Shape:</b> a big letter <b>V</b>. Down the left = define and design. Bottom point = coding. Up the right = testing. In the middle, teal rounded boxes = <b>test designs</b>, with dashed arrows from the left side to them and from them to the matching test on the right.</p>\n<p><b>Draw:</b> left slope: Analysis → Design → <b>Implementation (coding)</b> at the bottom. Right slope: Unit testing → Integration testing → System testing → Acceptance testing (top right). Middle: Analysis ⇢ <b>Acceptance test design</b> ⇢ Acceptance testing; Design ⇢ <b>System</b>, <b>Integration</b>, <b>Unit test design</b> ⇢ the matching tests. Add a big down arrow on the left and a big up arrow on the right.</p>\n<p><b>Key fact:</b> acceptance tests are planned in <b>Analysis</b>; system, integration and unit tests are planned in <b>Design</b>.</p>\n<p><b>Pros, cons, when to use</b> (not on the slides, general knowledge): + every test is planned early, so testing is strong; − as rigid as waterfall; use it when <b>quality and reliability</b> matter and requirements are stable. Not rated in S46.</p>",
    "diagram": "flowchart TD\n  AN[Analysis] --> DE[Design]\n  DE --> IM[\"Implementation (coding)\"]\n  IM --> UT[Unit testing]\n  UT --> IT[Integration testing]\n  IT --> ST[System testing]\n  ST --> AT[Acceptance testing]\n  AN -.-> ATD([Acceptance test design])\n  DE -.-> STD([System test design])\n  DE -.-> ITD([Integration test design])\n  DE -.-> UTD([Unit test design])\n  ATD -.-> AT\n  STD -.-> ST\n  ITD -.-> IT\n  UTD -.-> UT"
   },
   {
    "h": "③ Parallel development (S24, S25) — Structured, Quiz 1 V3",
    "body": "<p><b>Shape:</b> starts like a waterfall (Planning → Analysis → <b>one general Design</b>), then <b>splits into 3 subprojects</b>, then joins again in <b>Integration</b>.</p>\n<p><b>Draw:</b></p>\n<ol><li>Planning → Analysis → Design, staircase, with dashed back arrows.</li><li>From the general Design, 3 arrows to 3 <b>dotted ellipses</b> labelled <b>Subproject 1, 2, 3</b>. Inside each: Design → Implementation, with a dashed back arrow. Also a dashed back arrow from each subproject's Design to the general Design.</li><li>All 3 Implementations → <b>Integration</b> → rounded <b>System</b>.</li></ol>\n<p><b>How it works:</b> a general design for the whole system, then the project is divided into distinct subprojects that are designed and implemented <b>in parallel</b>; at the end the pieces are integrated and delivered.</p>\n<p><b>Pro:</b> reduces the time to deliver, so there is less chance that business changes cause rework.</p>\n<p><b>Con:</b> still one big delivery after completion (S31); the pieces must fit together at integration.</p>\n<p><b>When to use:</b> a big system that splits into independent parts and a short schedule. S46: like Waterfall, but <b>Good for short time schedule</b>.</p>",
    "diagram": "flowchart TD\n  P[Planning] --> A[Analysis]\n  A --> D[General design]\n  A -.-> P\n  D -.-> A\n  subgraph SP1[\"Subproject 1\"]\n    D1[Design] --> I1[Implementation]\n    I1 -.-> D1\n  end\n  subgraph SP2[\"Subproject 2\"]\n    D2[Design] --> I2[Implementation]\n    I2 -.-> D2\n  end\n  subgraph SP3[\"Subproject 3\"]\n    D3[Design] --> I3[Implementation]\n    I3 -.-> D3\n  end\n  D --> D1\n  D --> D2\n  D --> D3\n  I1 --> INT[Integration]\n  I2 --> INT\n  I3 --> INT\n  INT --> SYS([System])"
   },
   {
    "h": "Waterfall vs Parallel: do not mix them up",
    "body": "<table><tr><th></th><th>Waterfall</th><th>Parallel</th></tr>\n<tr><td>Class</td><td>Structured</td><td>Structured</td></tr>\n<tr><td>Shape</td><td>one staircase</td><td>staircase that splits into 3 ellipses and joins</td></tr>\n<tr><td>Design</td><td>once</td><td>general design + a design inside each subproject</td></tr>\n<tr><td>Extra box</td><td>none</td><td><b>Integration</b></td></tr>\n<tr><td>Output</td><td>System</td><td>System</td></tr>\n<tr><td>Main problem it solves / has</td><td>has: inflexible to changing requirements</td><td>solves: long delay between analysis and delivery</td></tr>\n<tr><td>S46 short schedule</td><td>Poor</td><td>Good</td></tr></table>\n<p><b>Common mistakes:</b> forgetting the dashed back arrows; forgetting the rounded System box; in Parallel, forgetting the general Design before the split, the subproject labels, or the Integration box.</p>"
   }
  ],
  "example": {
   "problem": "<p>S19 shows another waterfall: the <b>first published model (Royce, 1970)</b>. Draw it and say how it differs from the S20 waterfall.</p>",
   "solution": "<p>Staircase of 5 rounded boxes: <b>Requirements definition → System and software design → Implementation and unit testing → Integration and system testing → Operation and maintenance</b>. A feedback line runs along the bottom from Operation and maintenance, with an up-arrow into each of the 4 earlier boxes.<br/>Difference: Royce names 5 engineering stages and feeds back from the end to every stage; the S20 class version uses the 4 SDLC phases, ends in a rounded System box, and goes back only one step at a time (dashed wavy arrows).</p>",
   "diagram": "flowchart TD\n  R1[Requirements definition] --> R2[System and software design]\n  R2 --> R3[Implementation and unit testing]\n  R3 --> R4[Integration and system testing]\n  R4 --> R5[Operation and maintenance]\n  R5 -->|feedback| R1\n  R5 -->|feedback| R2\n  R5 -->|feedback| R3\n  R5 -->|feedback| R4"
  },
  "check": [
   {
    "q": "In the Waterfall picture, how many dashed back arrows are there and where?",
    "a": "3: Analysis→Planning, Design→Analysis, Implementation→Design. Nothing goes back from System."
   },
   {
    "q": "Why is Waterfall called plan-driven?",
    "a": "You must plan and schedule all process activities before starting work on them (S21)."
   },
   {
    "q": "When is Waterfall appropriate, and where is it mostly used?",
    "a": "When requirements are well understood and changes are limited; mostly in large systems engineering projects developed at several sites."
   },
   {
    "q": "In the V-model, in which phase are acceptance tests designed? And unit tests?",
    "a": "Acceptance test design comes from Analysis; system, integration and unit test designs come from Design."
   },
   {
    "q": "What problem does Parallel development address, and what is its advantage?",
    "a": "Long delays between analysis and delivery. It reduces the time to deliver, so fewer business changes cause rework."
   },
   {
    "q": "Which box exists in Parallel but not in Waterfall?",
    "a": "Integration (plus the subproject ellipses)."
   }
  ],
  "exam": {
   "question": "<p>⭐ (Quiz 1, V3) Depict graphically: <b>Parallel</b> development methodology.</p>",
   "answer": "<p><b>Title:</b> Parallel development-based methodology. <b>Drawing:</b> see the diagram: Planning → Analysis → general Design (with dashed back arrows), then 3 dotted ellipses <i>Subproject 1, 2, 3</i>, each Design → Implementation with a dashed back arrow, all joining in Integration → System.<br/><b>Explanation:</b> a general design is made for the whole system, then the project is divided into distinct subprojects that are designed and implemented in parallel; when all are complete they are integrated and the system is delivered.<br/><b>Pro:</b> reduces the time to deliver the system, so less chance that business changes cause rework.<br/><b>Con:</b> the system is still delivered only after completion, like waterfall.</p>",
   "diagram": "flowchart TD\n  P[Planning] --> A[Analysis]\n  A --> D[Design]\n  A -.-> P\n  D -.-> A\n  subgraph SP1[\"Subproject 1\"]\n    D1[Design] --> I1[Implementation]\n  end\n  subgraph SP2[\"Subproject 2\"]\n    D2[Design] --> I2[Implementation]\n  end\n  subgraph SP3[\"Subproject 3\"]\n    D3[Design] --> I3[Implementation]\n  end\n  D --> D1\n  D --> D2\n  D --> D3\n  I1 --> INT[Integration]\n  I2 --> INT\n  I3 --> INT\n  INT --> SYS([System])"
  },
  "memorize": [
   "Symbols: box = phase; solid arrow = forward; dashed wavy = back; rounded box = output; dotted ellipse = group; stacked block = same time",
   "Waterfall: staircase P→A→D→I→(System), 3 dashed back arrows; plan-driven; inflexible; stable requirements",
   "V-model: down = Analysis, Design; bottom = coding; up = unit → integration → system → acceptance testing",
   "Acceptance test design ← Analysis; system/integration/unit test design ← Design",
   "Parallel: P→A→general D → 3 subprojects (D→I) → Integration → (System); faster delivery",
   "Royce 1970: 5 stages, feedback from Operation and maintenance to all"
  ],
  "note": "The slides do not label the dashed wavy arrows; reading them as 'go back to the previous phase' is the standard interpretation. V-model pros/cons are not on the slides."
 },
 {
  "id": "W1b-4",
  "label": "W1b·4",
  "week": "W1b",
  "slides": [
   27,
   28,
   29,
   30,
   31,
   32,
   33,
   34,
   35,
   36,
   37,
   38,
   39,
   44,
   46
  ],
  "kind": "drawing",
  "title": "Draw it like the professor: Phased, Prototyping, Throwaway prototyping, Agile — and choose the right one",
  "hook": "After this lesson you can draw the Phased (asked twice in Quiz 1), Prototyping, Throwaway and Agile diagrams from memory, and pick a methodology with the S46 table.",
  "cards": [
   {
    "h": "④ Phased (iterative) development (S27, S28) — RAD, Quiz 1 V1 and V4",
    "body": "<p><b>Idea:</b> the system is split into <b>versions</b> built one after another. Version 1 has the most important features. Users start using it, and their experience feeds version 2.</p>\n<p><b>Draw:</b></p>\n<ol><li>Planning → Analysis (overall concept), with a wavy back arrow. These appear <b>once</b>.</li><li>Then 3 <b>dotted ellipses</b>, going down-left like stairs. Each has Analysis → Design → Implementation with dashed back arrows.</li><li>Each ellipse ends in a rounded <b>System version 1 / 2 / 3</b>.</li><li>A long arrow from <b>System version 1</b> back up into the <b>Analysis of ellipse 2</b>, and from version 2 into the Analysis of ellipse 3.</li></ol>\n<p><b>Pros (S31):</b> quickly gets a <b>useful system into users' hands</b>; business value sooner; users find important new requirements sooner.</p>\n<p><b>Con (S32):</b> users work with a system that is <b>intentionally incomplete</b>. Fix: put the most important features in version 1 and manage expectations.</p>\n<p><b>When to use:</b> you need value early and can split the system into versions. S46: <b>never Poor</b>; Excellent for short schedule and schedule visibility.</p>",
    "diagram": "flowchart TD\n  P[Planning] --> A0[Analysis]\n  A0 -.-> P\n  subgraph V1[\"Version 1\"]\n    A1[Analysis] --> D1[Design]\n    D1 --> I1[Implementation]\n    D1 -.-> A1\n    I1 -.-> D1\n  end\n  subgraph V2[\"Version 2\"]\n    A2[Analysis] --> D2[Design]\n    D2 --> I2[Implementation]\n    D2 -.-> A2\n    I2 -.-> D2\n  end\n  subgraph V3[\"Version 3\"]\n    A3[Analysis] --> D3[Design]\n    D3 --> I3[Implementation]\n    D3 -.-> A3\n    I3 -.-> D3\n  end\n  A0 --> A1\n  I1 --> S1([System version 1])\n  S1 --> A2\n  I2 --> S2([System version 2])\n  S2 --> A3\n  I3 --> S3([System version 3])"
   },
   {
    "h": "Iterative vs incremental (S29, S30): the Mona Lisa",
    "body": "<p>S29: the 3 most popular approaches to the iterative model are <b>incremental</b>, <b>iterative</b>, <b>iterative-incremental</b>. S30 explains them with the Mona Lisa:</p>\n<ul><li><b>Iterative</b>: draw the <b>whole</b> picture as a rough sketch, then a coloured draft, then the finished painting. Each round improves everything.</li><li><b>Incremental</b>: paint <b>one finished piece</b> (the face), then add the body, then the background. Each round adds a complete part.</li><li><b>Iterative-incremental</b>: both: add parts <i>and</i> improve them each round. (Phased and agile work like this.)</li></ul>\n<p>Café app example: iterative = a simple version of the whole app, then a better one; incremental = first only the menu, then add payment, then add delivery.</p>"
   },
   {
    "h": "⑤ Prototyping (S33, S34) — RAD",
    "body": "<p><b>Idea:</b> Analysis, Design and Implementation happen <b>at the same time</b> and repeat in a cycle. You quickly build a <b>system prototype</b>, \"a quick-and-dirty program that provides a minimal amount of features\", show it, and improve it until the system is complete.</p>\n<p><b>Draw:</b> Planning (box) → a <b>stacked block</b> [Analysis / Design / Implementation], dashed wavy arrow back to Planning. Block → rounded <b>System prototype</b>. A line from the prototype <b>back into the block</b> (the repeat loop). Prototype → Implementation → rounded <b>System</b>.</p>\n<p><b>Prototype uses (S35):</b> requirements elicitation and validation; exploring design options and UI; back-to-back tests.</p>\n<p><b>Pros (S36):</b> better usability; closer match to users' real needs; better design quality; better maintainability; less development effort.</p>\n<p><b>Cons (S37):</b> leaves out functionality; error checking and recovery may be missing; focuses on functional, not non-functional requirements (reliability, security).</p>\n<p><b>When to use:</b> unclear requirements, tight deadline, sponsors want to see progress. S46: Excellent on these 3; <b>Poor</b> for unfamiliar technology, complex and reliable systems.</p>",
    "diagram": "flowchart LR\n  P[Planning] --> B[\"Analysis<br/>Design<br/>Implementation\"]\n  B -.-> P\n  B --> SP([System prototype])\n  SP -->|\"repeat\"| B\n  SP --> I[Implementation]\n  I --> S([System])"
   },
   {
    "h": "⑥ Throwaway prototyping (S38, S39)",
    "body": "<p><b>Idea:</b> build a <b>design prototype</b> only to <b>learn</b> (try a risky or unclear part), then <b>throw it away</b> and build the real system properly.</p>\n<p><b>Draw:</b> Planning → Analysis (staircase, dashed back arrows) → stacked block [Analysis / Design / Implementation] (dashed arrow back to Analysis). Block → rounded <b>Design prototype</b>, with a line back into the block (loop). From the block's top, a second arrow to the <b>real build</b>: Design → Implementation (dashed back arrow) → rounded <b>System</b>.</p>\n<p><b>Difference from ⑤:</b> output is a <b>Design</b> prototype, not a System prototype, and it does <b>not</b> become the system.</p>\n<p><b>Why throw it away (S38, in red)</b> — \"not a good basis for a production system\": 1) may be impossible to tune for non-functional requirements; 2) normally undocumented; 3) structure degraded by rapid change; 4) probably won't meet organizational quality standards.</p>\n<p><b>When to use:</b> unclear requirements <i>and</i> new technology <i>and</i> a complex or reliable system. S46: the <b>only one Excellent for unfamiliar technology</b>; Excellent on 4 rows; never Poor; but only Good for short schedule.</p>",
    "diagram": "flowchart LR\n  P[Planning] --> A[Analysis]\n  A -.-> P\n  A --> B[\"Analysis<br/>Design<br/>Implementation\"]\n  B -.-> A\n  B --> DP([Design prototype])\n  DP -->|\"repeat\"| B\n  B -->|\"real build\"| D[Design]\n  D --> I[Implementation]\n  I -.-> D\n  I --> S([System])"
   },
   {
    "h": "⑦ Typical Agile development (S44, S40)",
    "body": "<p><b>Idea:</b> all 4 phases are done together in one short cycle (1–4 weeks). Every cycle ends with a working system, and then the next cycle starts again from Planning.</p>\n<p><b>Draw:</b> one <b>stacked block</b> with all 4 phases [Planning / Analysis / Design / Implementation]. A line from the bottom of the block to a rounded <b>System</b>, and a line from System back to the top of the block (Planning). That's it: the simplest picture.</p>\n<p><b>Pros</b> (from S40–S43): working software early and often; welcomes changing requirements; little documentation overhead; face-to-face communication; adapts to the current business environment.</p>\n<p><b>Cons</b> (general knowledge, not on the slides): little documentation; needs an always-available customer and a skilled, disciplined team; hard for very large or complex systems.</p>\n<p><b>When to use:</b> unclear or changing requirements and a short schedule. S46 rates <b>XP</b>: Excellent for unclear requirements and short schedule; Good for reliable systems and visibility; <b>Poor for unfamiliar technology and complex systems</b>.</p>",
    "diagram": "flowchart LR\n  B[\"Planning<br/>Analysis<br/>Design<br/>Implementation\"] --> S([System])\n  S -->|\"next iteration\"| B"
   },
   {
    "h": "Which methodology to use? (S46)",
    "body": "<table><tr><th>Usefulness for</th><th>Waterfall</th><th>Parallel</th><th>Phased</th><th>Prototyping</th><th>Throwaway</th><th>XP</th></tr>\n<tr><td>Unclear user requirements</td><td>Poor</td><td>Poor</td><td>Good</td><td><b>Excellent</b></td><td><b>Excellent</b></td><td><b>Excellent</b></td></tr>\n<tr><td>Unfamiliar technology</td><td>Poor</td><td>Poor</td><td>Good</td><td>Poor</td><td><b>Excellent</b></td><td>Poor</td></tr>\n<tr><td>Complex systems</td><td>Good</td><td>Good</td><td>Good</td><td>Poor</td><td><b>Excellent</b></td><td>Poor</td></tr>\n<tr><td>Reliable systems</td><td>Good</td><td>Good</td><td>Good</td><td>Poor</td><td><b>Excellent</b></td><td>Good</td></tr>\n<tr><td>Short time schedule</td><td>Poor</td><td>Good</td><td><b>Excellent</b></td><td><b>Excellent</b></td><td>Good</td><td><b>Excellent</b></td></tr>\n<tr><td>Schedule visibility</td><td>Poor</td><td>Poor</td><td><b>Excellent</b></td><td><b>Excellent</b></td><td>Good</td><td>Good</td></tr></table>\n<p><b>3-step method:</b> 1) mark the rows the story mentions; 2) cross out every methodology with a <b>Poor</b> on a marked row; 3) choose the one with the most Excellents.</p>\n<p><b>Patterns:</b> Phased and Throwaway are never Poor. Prototyping is Poor exactly where Throwaway is strongest. Waterfall has no Excellent at all. V-model and Scrum are not in the table.</p>"
   }
  ],
  "example": {
   "problem": "<p>A Tashkent café wants an ordering app in <b>3 months</b>. The owner cannot explain clearly what she wants, and she wants to <b>see progress every week</b>. The app is simple and the team knows the technology well. Which methodology does the S46 table suggest? What changes if the app had to be highly reliable?</p>",
   "solution": "<p>Marked rows: unclear requirements, short time schedule, schedule visibility.<br/>Cross out Poor: Waterfall (Poor on all 3), Parallel (Poor on unclear and visibility).<br/>Count Excellents: Prototyping E, E, E = <b>3</b>; Phased G, E, E = 2; XP E, E, G = 2; Throwaway E, G, G = 1.<br/>→ <b>Prototyping</b>.<br/>If reliability were also needed: Prototyping is Poor for reliable systems, so cross it out. Then Phased (G, E, E, G) and XP (E, E, G, G) tie with 2 Excellents each; Phased has no Poor anywhere and Excellent visibility, which the owner asked for, so <b>Phased</b> is a safe answer (explain your reasoning).</p>"
  },
  "check": [
   {
    "q": "In the Phased diagram, where does the arrow from 'System version 1' go?",
    "a": "Into the Analysis box of the next ellipse (version 2): users' experience with version 1 feeds the analysis for version 2."
   },
   {
    "q": "What is the major drawback of phased development, and how do you reduce it?",
    "a": "Users work with intentionally incomplete systems. Put the most important features in version 1 and manage users' expectations."
   },
   {
    "q": "Prototyping vs Throwaway prototyping: two differences in the drawing.",
    "a": "Prototyping outputs a <b>System prototype</b> that grows into the system; Throwaway outputs a <b>Design prototype</b> that is discarded, and the real system is built on a separate Design → Implementation → System path. Throwaway also has a separate Analysis box before the stacked block."
   },
   {
    "q": "Give the 4 reasons why throwaway prototypes should be discarded.",
    "a": "Impossible to tune for non-functional requirements; undocumented; structure degraded by rapid change; won't meet organizational quality standards."
   },
   {
    "q": "Which methodology is the only one rated Excellent for unfamiliar technology?",
    "a": "Throwaway prototyping."
   },
   {
    "q": "Iterative vs incremental in one sentence each.",
    "a": "Iterative: improve the whole thing each round (sketch → draft → final). Incremental: add one finished piece each round."
   }
  ],
  "exam": {
   "question": "<p>⭐ (Quiz 1, V1 and V4) Depict graphically: <b>Phased</b> development methodology.</p>",
   "answer": "<p><b>Title:</b> Phased (iterative) development-based methodology. <b>Drawing:</b> Planning → Analysis once, then 3 dotted ellipses, each Analysis → Design → Implementation with dashed back arrows, each ending in a rounded System version 1, 2, 3; an arrow from each version into the Analysis of the next ellipse.<br/><b>Explanation:</b> the overall system is broken into a series of versions developed sequentially. The most important and fundamental requirements go into version 1. After version 1 is implemented, work begins on version 2, using the remaining requirements plus new ideas from users' experience with version 1. This continues until the system is complete or no longer in use.<br/><b>Pro:</b> a useful system reaches users quickly and gives business value sooner; users identify new requirements sooner.<br/><b>Con:</b> users work with an intentionally incomplete system, so expectations must be managed.</p>",
   "diagram": "flowchart TD\n  P[Planning] --> A0[Analysis]\n  A0 -.-> P\n  subgraph V1[\"Version 1\"]\n    A1[Analysis] --> D1[Design]\n    D1 --> I1[Implementation]\n  end\n  subgraph V2[\"Version 2\"]\n    A2[Analysis] --> D2[Design]\n    D2 --> I2[Implementation]\n  end\n  subgraph V3[\"Version 3\"]\n    A3[Analysis] --> D3[Design]\n    D3 --> I3[Implementation]\n  end\n  A0 --> A1\n  I1 --> S1([System version 1])\n  S1 --> A2\n  I2 --> S2([System version 2])\n  S2 --> A3\n  I3 --> S3([System version 3])"
  },
  "memorize": [
   "Phased: P→A once, then ellipses (A→D→I) → System version n → arrow into next Analysis",
   "Phased + : useful system fast, value sooner · − : intentionally incomplete",
   "Prototyping: P → stacked block (A/D/I) ⇄ System prototype → Implementation → System",
   "Prototyping benefits: usability, real needs, design quality, maintainability, less effort",
   "Throwaway: P→A → stacked block ⇄ Design prototype (discarded); real build D→I→System",
   "Discard because: can't tune non-functional, undocumented, degraded structure, below quality standards",
   "Agile: one stacked block (P/A/D/I) → System → back to the block; cycles 1–4 weeks",
   "S46: only Throwaway Excellent for unfamiliar technology; Phased and Throwaway never Poor; Waterfall no Excellent"
  ],
  "note": "Throwaway prototyping is not listed under RAD on S17, but it is taught right after Prototyping. Agile cons and V-model pros/cons are general knowledge, not slide content."
 },
 {
  "id": "W2-1",
  "label": "W2·1",
  "week": "W2",
  "slides": [
   2,
   3,
   4,
   5,
   6,
   7,
   11,
   12,
   15
  ],
  "kind": "theory",
  "title": "Agile: the Manifesto, the 12 principles, and Agile vs Waterfall",
  "hook": "After this lesson you can write the 4 Agile values, name the 12 principles, compare Agile with Waterfall, and draw the typical Agile methodology.",
  "cards": [
   {
    "h": "The big idea: small pieces, fast feedback",
    "body": "<p>Imagine you build a <b>Tashkent café ordering app</b>.</p><ul><li><b>Traditional way:</b> you plan everything, analyse, design and build for a year. Then you show the owner. He says: \"This is not what I wanted.\" Real feedback comes only at the very end.</li><li><b>Agile way:</b> after 2 weeks you show him a small working menu screen. He says \"add photos\". You adjust. After 2 more weeks you show ordering. The app grows piece by piece.</li></ul><p>The slide picture: Ideas go into small <b>Define → Code → Test</b> cycles. Each cycle gives an increment (i1, i2, i3), and the cubes get bigger. After each one: <b>Review and Adjust</b>.</p><p>In the slide's words, Agile is \"an <b>iterative</b> approach to software development\". Each iteration takes <b>1 to 4 weeks</b>. Single-phase (traditional) development \"takes <b>6 to 18 months</b>\", and all requirements and risks are \"predicted initially\".</p>",
    "diagram": "flowchart LR\n  I([\"Ideas\"]) --> C1((\"Define Code Test\"))\n  C1 --> I1[\"i1 small\"]\n  I1 -->|review and adjust| C2((\"Define Code Test\"))\n  C2 --> I2[\"i2 bigger\"]\n  I2 -->|review and adjust| C3((\"Define Code Test\"))\n  C3 --> I3[\"i3 bigger still\"]\n  I3 -->|review and adjust| F([\"Final software\"])"
   },
   {
    "h": "The Agile Manifesto: 4 values",
    "body": "<p>In 2001, <b>17 people</b> signed the Agile Manifesto. Two of them, <b>Jeff Sutherland and Ken Schwaber</b>, later gave us Scrum.</p><table><tr><th>We value MORE (left)</th><th></th><th>over (right)</th></tr><tr><td><b>Individuals and interactions</b></td><td>over</td><td>processes and tools</td></tr><tr><td><b>Working software</b></td><td>over</td><td>comprehensive documentation</td></tr><tr><td><b>Customer collaboration</b></td><td>over</td><td>contract negotiation</td></tr><tr><td><b>Responding to change</b></td><td>over</td><td>following a plan</td></tr></table><p><b>Important nuance:</b> the right side is not bad. \"While there is value in the items on the right, we value the items on the left more.\"</p><p>Exam trap: an MCQ may flip one pair, for example \"Contract negotiation over customer collaboration\". That one is NOT a value.</p>"
   },
   {
    "h": "The 12 principles (1–6): customers and people",
    "body": "<p>The 4 values are unpacked into 12 principles. Learn the <b>names</b> (bold on the slides) and one idea each.</p><ol><li><b>Customer Satisfaction</b>: satisfy the customer by early and continuous delivery of valuable software.</li><li><b>Welcome Change</b>: changing requirements are welcome, \"even in the late development phase\".</li><li><b>Deliver the Working Software</b>: deliver often, from a few weeks to a few months; prefer the shortest time.</li><li><b>Collaboration</b>: business people and developers work together during the whole project.</li><li><b>Motivation</b>: build projects around motivated people; support them and trust them.</li><li><b>Face-to-face Conversation</b>: the most efficient and effective way to share information.</li></ol><p>Memory hook: <i>Customer, Change, Deliver</i> (what the customer gets), then <i>Collaboration, Motivation, Face-to-face</i> (how people work).</p>"
   },
   {
    "h": "The 12 principles (7–12): progress and team habits",
    "body": "<ol start=\"7\"><li><b>Measure the Progress as per the Working Software</b>: working software is \"the key and primary measure of the progress\" (not pages of documents).</li><li><b>Maintain Constant Pace</b>: sustainable development; everyone can keep the same pace for a long time (no burnout).</li><li><b>Monitoring</b>: regular attention to technical excellence and good design.</li><li><b>Simplicity</b>: keep things simple; do not do unnecessary work.</li><li><b>Self-organized Teams</b>: the best architectures, requirements and designs come from self-organized teams.</li><li><b>Review the Work Regularly</b>: at regular intervals the team reflects and adjusts how it works.</li></ol><p>Memory hook: the <b>3 M's</b> (Measure, Maintain, Monitoring), then <b>S-S-R</b> (Simplicity, Self-organized, Review).</p>"
   },
   {
    "h": "Agile vs Waterfall: the class table",
    "body": "<table><tr><th>Agile methodology</th><th>Waterfall model</th></tr><tr><td>incremental approach</td><td>sequential design process</td></tr><tr><td>project is divided into <b>sprints</b></td><td>process is divided into <b>distinct phases</b></td></tr><tr><td><b>flexible</b></td><td><b>structured</b></td></tr><tr><td>a collection of many different (small) projects</td><td>completed as <b>one single project</b></td></tr><tr><td>test plan reviewed <b>after each sprint</b></td><td>test plan reviewed <b>after complete development</b></td></tr><tr><td>testers can join requirement changes without problems</td><td>hard for testers to start any change</td></tr></table><p>Two more facts: Agile is \"not a specific set of ceremonies\". It is \"a group of methodologies\" with tight feedback cycles and continuous improvement. Slide 12 says one iteration takes <b>10 to 15 days</b> (about 2 weeks), which fits \"1 to 4 weeks\". The original Manifesto did <b>not</b> fix 2-week iterations or a team size.</p>"
   },
   {
    "h": "Cargo cult: copying the form is not Agile",
    "body": "<p>Slide 6 shows photos from Melanesia: a straw airplane, a wooden headset, a radar dish made of sticks. People believed \"cargo\" (Western goods) came from ancestral spirits, so they copied the <i>shape</i> of airports and radios, hoping the cargo would come.</p><p>The copies look real, but they cannot fly or talk.</p><p><b>The lesson (my reading; the slide gives no text):</b> a team can copy Agile rituals, such as stand-up meetings, sprints and sticky notes, without the <b>values</b> behind them. Then it is \"cargo cult Agile\": it looks Agile but brings no results. The Dilbert comic on slide 34 makes the same joke: removing chairs does not fix a company.</p>"
   }
  ],
  "example": {
   "problem": "<p>The café app team gets these situations. For each one, name the Manifesto <b>value</b> or the <b>principle</b> it shows.</p><ol><li>In month 5 the owner asks to add Click payment. The team says \"yes, next iteration\".</li><li>The manager asks \"how far are we?\" The team shows the running app, not a 60-page report.</li><li>The team refuses to work every weekend for 3 months.</li><li>Instead of long e-mails, the developer walks to the owner's table and asks.</li><li>Every two weeks the team meets to discuss how to work better.</li></ol>",
   "solution": "<ol><li>Value: <b>Responding to change over following a plan</b>. Principle: <b>Welcome Change</b>.</li><li>Value: <b>Working software over comprehensive documentation</b>. Principle: <b>Measure the Progress as per the Working Software</b>.</li><li>Principle: <b>Maintain Constant Pace</b> (sustainable development).</li><li>Value: <b>Individuals and interactions over processes and tools</b>. Principle: <b>Face-to-face Conversation</b>.</li><li>Principle: <b>Review the Work Regularly</b>.</li></ol>"
  },
  "check": [
   {
    "q": "Which is NOT an Agile Manifesto value? (A) Individuals and interactions over processes and tools (B) Working software over comprehensive documentation (C) Contract negotiation over customer collaboration (D) Responding to change over following a plan",
    "a": "<b>C</b>. The real value is \"Customer collaboration over contract negotiation\"; C flips it."
   },
   {
    "q": "How long is one Agile iteration, and how long is single-phase development, according to the slides?",
    "a": "Agile iteration: <b>1 to 4 weeks</b> (slide 12: 10 to 15 days). Single-phase: <b>6 to 18 months</b>."
   },
   {
    "q": "Match: (a) \"Pay regular attention to technical excellence and good design\" (b) \"The aim of agile development is sustainable development\" (c) \"Working software is the primary measure of progress\"",
    "a": "(a) <b>Monitoring</b> · (b) <b>Maintain Constant Pace</b> · (c) <b>Measure the Progress as per the Working Software</b>."
   },
   {
    "q": "Which describes the Waterfall model? (A) incremental approach (B) test plan reviewed after each sprint (C) completed as one single project (D) testers join requirement changes without problems",
    "a": "<b>C</b>. A, B and D describe Agile."
   },
   {
    "q": "Does the Manifesto say the items on the right (processes, documentation, contracts, plans) have no value?",
    "a": "No. \"While there is value in the items on the right, we value the items on the left <b>more</b>.\""
   }
  ],
  "exam": {
   "question": "<p><b>Depict graphically: the typical Agile development methodology.</b> Add 2–3 sentences explaining it.</p>",
   "answer": "<p>Draw one block with the four phases <b>Planning, Analysis, Design, Implementation</b>. An arrow goes to <b>System</b>, and from System an arrow goes back up into Planning (the loop).</p><p>Explanation: every iteration is a small, complete project that runs through all four phases. Each iteration lasts <b>1 to 4 weeks</b> and ends with working software. The team gets feedback and starts the next iteration, so the system grows piece by piece and change is easy.</p>",
   "diagram": "flowchart LR\n  ID([\"Ideas\"]) --> P\n  subgraph IT[\"One iteration = 1 to 4 weeks\"]\n    P[\"Planning\"] --> A[\"Analysis\"]\n    A --> DS[\"Design\"]\n    DS --> IM[\"Implementation\"]\n  end\n  IM --> SY([\"System - a working piece\"])\n  SY -->|feedback, next iteration| P"
  },
  "memorize": [
   "17 signers; Sutherland and Schwaber also created Scrum",
   "4 values: individuals and interactions, working software, customer collaboration, responding to change (each OVER the right side)",
   "12 principles: Customer Satisfaction, Welcome Change, Deliver the Working Software, Collaboration, Motivation, Face-to-face Conversation, Measure the Progress as per the Working Software, Maintain Constant Pace, Monitoring, Simplicity, Self-organized Teams, Review the Work Regularly",
   "Iteration 1–4 weeks (or 10–15 days); single-phase 6–18 months",
   "Agile = incremental, sprints, flexible, many small projects; Waterfall = sequential, phases, structured, one single project"
  ],
  "note": "Slide errors, said kindly: slides 4–5 say \"Principle\" (should be Principles) and \"Project Owner\" (should be Product Owner). Principles 4 and 6 on the slide mention the Scrum Master, but the Manifesto itself speaks of business people and developers in general. In the S7 agile picture, \"First Time to get real feedback\" also sits next to Final Software, which is confusing; trust the S11 text: Agile \"frequently takes the feedback\". The Simplicity wording on slide 5 is unclear; the original idea is \"avoid unnecessary work\"."
 },
 {
  "id": "W2-2",
  "label": "W2·2",
  "week": "W2",
  "slides": [
   8,
   9,
   10,
   16,
   17,
   18,
   19,
   20,
   21,
   22,
   23,
   24,
   25,
   26
  ],
  "kind": "theory",
  "title": "Scrum: the framework and its three roles",
  "hook": "After this lesson you can define Scrum, name its three roles, and say exactly who does what (and who may NOT do what).",
  "cards": [
   {
    "h": "Scrum is a framework, not a recipe",
    "body": "<p><b>Creators:</b> Jeff Sutherland and Ken Schwaber. Used by Microsoft, Yahoo, Google, Electronic Arts, IBM, Lockheed Martin, Apple. Used even for fixed-price projects, life-critical (FDA-approved) systems, satellite software and the Joint Strike Fighter, so it is not only for small websites.</p><p>Definition: \"A <b>framework</b> within which people can address complex adaptive problems, while productively and creatively delivering products of the highest possible value.\"</p><p>⭐ \"Scrum is <b>not</b> a process, technique, or definitive method.\" It is a framework within which you can use various processes and techniques.</p><p>Think of football: the <b>rules</b> are fixed (field, players, 90 minutes), but each team picks its own tactics. Scrum gives the rules; the team picks the techniques.</p><p>⭐ Formula: <b>Scrum = roles + events + artifacts + rules</b>. The rules bind the roles, events and artifacts together.</p>"
   },
   {
    "h": "The Scrum Team: three roles, two key features",
    "body": "<p>\"The Scrum Team consists of a <b>Product Owner</b>, the <b>Development Team</b>, and a <b>Scrum Master</b>.\"</p><ul><li><b>Self-organizing</b>: the team chooses <i>how</i> to do its work; nobody outside the team directs it.</li><li><b>Cross-functional</b>: the team has <i>all the skills</i> needed and does not depend on outsiders.</li></ul><p>Goal of this model: flexibility, creativity and productivity.</p>",
    "diagram": "flowchart TD\n  ST[\"Scrum Team: self-organizing and cross-functional\"] --> PO([\"Product Owner: WHAT to build, value, priorities\"])\n  ST --> DT([\"Development Team: HOW to build, makes the Increment\"])\n  ST --> SM([\"Scrum Master: servant-leader, Scrum coach\"])\n  SM -.->|serves| PO\n  SM -.->|serves| DT\n  SM -.->|serves| ORG[\"The organization\"]"
   },
   {
    "h": "Product Owner: the voice of value (WHAT)",
    "body": "<p>The PO \"is responsible for maximizing the value of the product resulting from work of the Development Team\".</p><p>Six duties on the slide:</p><ul><li>define the features of the product</li><li>make scope vs. schedule decisions</li><li>be responsible for the project's financial goals</li><li><b>prioritize the product backlog</b></li><li>adjust features and priority every sprint, as needed</li><li>accept or reject work results</li></ul><p>Other PO powers in the deck: <b>only the PO can cancel a Sprint</b>; the PO invites stakeholders to the Sprint Review.</p><p>Café example: the PO decides that Click payment is more valuable than dark mode, so it goes to the top of the list.</p>"
   },
   {
    "h": "Development Team: the builders (HOW)",
    "body": "<p>Professionals who deliver a potentially releasable <b>Increment</b> of \"Done\" product at the end of each Sprint.</p><ul><li>⭐ <b>Only</b> members of the Development Team create the Increment.</li><li><b>Self-organizing</b>: no one, \"not even the Scrum Master\", tells them how to turn the backlog into working software.</li><li><b>Cross-functional</b>: programmers, testers, UX designers and so on.</li><li><b>No titles</b>: everyone is just a \"Development Team member\".</li><li><b>No sub-teams</b>: no separate \"testing team\" or \"architecture team\" inside.</li><li>People may have special skills, but <b>accountability belongs to the whole team</b>.</li></ul>"
   },
   {
    "h": "Team size and membership",
    "body": "<ul><li>Typically <b>5–9 people</b>: small enough to stay nimble, big enough to finish real work in a Sprint.</li><li><b>Too small</b>: skill gaps, so they may fail to deliver an Increment.</li><li><b>More than nine</b>: \"requires too much coordination\"; too complex.</li><li>The PO and Scrum Master are <b>not counted</b>, unless they also do Sprint Backlog work.</li><li>Members should be <b>full-time</b> (exceptions are possible, for example a database administrator).</li><li>Membership changes <b>only between sprints</b>.</li></ul><p>Note: slide 20 says \"Scrum recognizes no titles\", while slide 22 says \"Ideally, no titles but rarely a possibility\". Ideal vs reality.</p>"
   },
   {
    "h": "Scrum Master: the servant-leader",
    "body": "<p>⭐ \"The Scrum Master is responsible for promoting and supporting Scrum as defined in the Scrum Guide.\" The SM helps everyone understand Scrum theory, practices, rules and values.</p><p>\"The Scrum Master is a <b>servant-leader</b> for the Scrum Team.\" In simple words: the SM is <b>not a boss</b> who gives orders. The SM leads by helping, like a coach who clears the road so the players can play.</p><p>The SM also helps people <b>outside</b> the team see which of their interactions with the team help and which do not. Example: the café owner's manager keeps interrupting the developers every hour, and the SM helps him change that.</p>"
   },
   {
    "h": "Whom the Scrum Master serves: 7 + 5 + 5",
    "body": "<table><tr><th>Serves</th><th>Key words</th></tr><tr><td><b>Product Owner</b> (7 ways)</td><td>goals, scope and domain understood by all · techniques for Product Backlog management · clear and concise backlog items · product planning in an empirical environment · arrange the backlog to maximize value · practice agility · facilitate events</td></tr><tr><td><b>Development Team</b> (5 ways)</td><td>coach self-organization and cross-functionality · help create high-value products · ⭐ <b>remove impediments</b> · facilitate events · coach where Scrum is not yet adopted</td></tr><tr><td><b>Organization</b> (5 ways)</td><td>lead and coach Scrum adoption · plan Scrum implementations · help staff and stakeholders enact Scrum · cause change that raises team productivity · work with other Scrum Masters</td></tr></table><p>\"Impediment\" = anything that blocks the team (a broken test server, a missing password, a noisy meeting).</p>"
   }
  ],
  "example": {
   "problem": "<p>Café app project. Who is responsible, or is it not allowed in Scrum?</p><ol><li>Deciding that loyalty points come before dark mode.</li><li>Deciding which database library to use for orders.</li><li>The test server is down for two days and the team is blocked.</li><li>A tester asks for the title \"QA Lead\" and a separate testing sub-team.</li><li>The team has 12 developers plus a PO and an SM.</li><li>The market changes and the Sprint Goal becomes useless. Who may cancel the Sprint?</li></ol>",
   "solution": "<ol><li><b>Product Owner</b> (prioritizes the product backlog).</li><li><b>Development Team</b> (self-organizing: they decide HOW).</li><li><b>Scrum Master</b> (removing impediments).</li><li><b>Not allowed</b>: Scrum recognizes no titles and no sub-teams in the Development Team.</li><li>Too big: more than nine requires too much coordination. Split into smaller teams of 5–9.</li><li><b>Only the Product Owner</b> (others may influence the PO).</li></ol>"
  },
  "check": [
   {
    "q": "Scrum is: (A) a process (B) a technique (C) a definitive method (D) a framework within which you can employ various processes and techniques",
    "a": "<b>D</b>."
   },
   {
    "q": "Complete: \"The Scrum framework consists of Scrum Team members and their associated ______, ______, ______, and ______.\"",
    "a": "<b>roles, events, artifacts, and rules</b>."
   },
   {
    "q": "Who creates the Increment? Who tells the Development Team how to build it?",
    "a": "Only the <b>Development Team</b> creates the Increment. <b>No one</b> tells them how, not even the Scrum Master."
   },
   {
    "q": "A team has 11 people: 9 developers, a PO and an SM who do no Sprint Backlog work. Is the Development Team size OK?",
    "a": "Yes. The PO and SM are not counted, so the Development Team is <b>9</b>, still within 5–9."
   },
   {
    "q": "Which role \"removes impediments to the Development Team's progress\", and what kind of leader is it?",
    "a": "The <b>Scrum Master</b>, a <b>servant-leader</b>."
   }
  ],
  "exam": {
   "question": "<p>Name the three roles of the Scrum Team and give the main responsibilities of each.</p>",
   "answer": "<table><tr><th>Role</th><th>Main responsibilities</th></tr><tr><td><b>Product Owner</b></td><td>Maximizes the value of the product. Defines features, prioritizes the Product Backlog, makes scope vs. schedule decisions, owns the financial goals, accepts or rejects work results. Only the PO can cancel a Sprint.</td></tr><tr><td><b>Development Team</b></td><td>5–9 professionals who build the \"Done\" Increment every Sprint. Self-organizing and cross-functional; no titles, no sub-teams; accountable as a whole.</td></tr><tr><td><b>Scrum Master</b></td><td>Servant-leader who promotes and supports Scrum as defined in the Scrum Guide. Serves the PO, the Development Team (for example, removing impediments) and the organization.</td></tr></table>"
  },
  "memorize": [
   "Creators: Jeff Sutherland and Ken Schwaber",
   "Scrum = roles + events + artifacts + rules; a framework, not a process",
   "3 roles: Product Owner, Development Team, Scrum Master",
   "Self-organizing = chooses HOW itself; cross-functional = has all skills",
   "PO: value, prioritizes backlog, accepts or rejects, only one who cancels a Sprint",
   "Dev Team: only creator of the Increment; no titles; no sub-teams; 5–9; more than 9 is too many; PO and SM not counted",
   "SM: servant-leader; serves PO (7), Dev Team (5, remove impediments), organization (5)"
  ],
  "note": "The slides use the older (pre-2020) Scrum Guide wording: \"Development Team\" and \"servant-leader\". The 2020 Scrum Guide says \"Developers\" and calls the roles \"accountabilities\". On the exam, use the slides' words."
 },
 {
  "id": "W2-3",
  "label": "W2·3",
  "week": "W2",
  "slides": [
   13,
   14,
   27,
   28,
   29,
   30,
   31,
   32,
   33,
   34,
   35,
   36,
   37,
   38,
   39,
   40,
   41,
   42,
   43,
   44,
   45,
   46
  ],
  "kind": "drawing",
  "title": "Scrum events and artifacts: drawing the Sprint cycle",
  "hook": "After this lesson you can draw the Scrum Sprint cycle from memory, give every event's time-box, and explain the Product Backlog, the Sprint Backlog and user stories.",
  "cards": [
   {
    "h": "The Sprint cycle in one picture",
    "body": "<p>This is the main picture of the deck (shown 3 times). Follow the café app:</p><ol><li>Executives, stakeholders, customers and users send ideas to the <b>Product Owner</b>.</li><li>The PO keeps a ranked list: the <b>Product Backlog</b> (features, stories…).</li><li>At the <b>Sprint Planning Meeting</b>, the team selects from the top as much as it can commit to finish by the end of the Sprint.</li><li>The chosen items are broken into tasks: the <b>Sprint Backlog</b>.</li><li>The <b>1–4 week Sprint</b> runs, with a <b>Daily Scrum</b> every 24 hours. The Scrum Master watches over it, with burndown charts (a chart of the work left, going down day by day; not explained on the slides).</li><li>Result: <b>Finished Work</b> (the Increment), then the <b>Sprint Review</b> and the <b>Sprint Retrospective</b>.</li></ol><p>⭐ Caption: \"Sprint end date and team deliverable do not change.\"</p>",
    "diagram": "flowchart LR\n  IN[\"Inputs: executives, team, stakeholders, customers, users\"] --> PO([\"Product Owner\"])\n  PO --> PB[\"Product Backlog: ranked list\"]\n  PB --> SP[\"Sprint Planning Meeting\"]\n  SP --> SB[\"Sprint Backlog: task breakout\"]\n  SB --> SPR((\"1-4 week Sprint\"))\n  SPR --> DS((\"Daily Scrum every 24 hours\"))\n  DS --> SPR\n  SPR --> FW[\"Finished Work = Increment\"]\n  FW --> RV[\"Sprint Review\"]\n  RV --> RT[\"Sprint Retrospective\"]\n  RT -.->|next Sprint starts at once| SP"
   },
   {
    "h": "Time-boxes and the rules of a Sprint",
    "body": "<p>⭐ \"All events are time-boxed\": each has a <b>maximum</b> length. The <b>Sprint</b> is special: its length is <b>fixed</b> and cannot be shortened or lengthened. The other events may end early when their purpose is done.</p><table><tr><th>Event</th><th>Time-box (one-month Sprint)</th></tr><tr><td>Sprint (\"the heart of Scrum\", a container for all other events)</td><td>one month or less; the next starts immediately</td></tr><tr><td>Sprint Planning</td><td>max <b>8 hours</b></td></tr><tr><td>Daily Scrum</td><td><b>15 minutes</b>, every day</td></tr><tr><td>Sprint Review</td><td>not given on the slides</td></tr><tr><td>Sprint Retrospective</td><td>max <b>3 hours</b></td></tr></table><p><b>During the Sprint:</b> no changes that endanger the Sprint Goal; quality goals do not decrease; scope may be clarified and re-negotiated between the PO and the Development Team.</p><p><b>Cancelling:</b> only the <b>PO</b> can cancel, when the Sprint Goal becomes <b>obsolete</b> (the company changes direction, or the market or technology changes). \"Done\" items are reviewed; incomplete items are re-estimated and put back on the Product Backlog. It is very uncommon and often traumatic.</p>"
   },
   {
    "h": "Sprint Planning and the Sprint Goal",
    "body": "<p>The <b>whole Scrum Team</b> plans the Sprint together (max 8 h for a one-month Sprint). It answers two questions:</p><ol><li><b>What</b> can be delivered in the Increment of this Sprint?</li><li><b>How</b> will the work needed be achieved?</li></ol><p>The <b>Sprint Goal</b> is created here. It is the <b>why</b> of the Sprint: one objective, often \"one coherent function\". Slide example: \"Sprint 7: implement basic shopping cart functionality including add, remove, and update.\" The goal gives the team some flexibility in what exactly it builds.</p><p>Factors (slide 33): <b>The What</b> (PO describes the goal and items), <b>The How</b> (Dev Team plans the work), <b>The Who</b> (PO defines value; developers say what is possible), <b>The Inputs</b> (the Product Backlog), <b>The Outputs</b> (the goal and how to start).</p>"
   },
   {
    "h": "Daily Scrum: 15 minutes, every day",
    "body": "<ul><li>A <b>15-minute</b> stand-up for the <b>Development Team</b>.</li><li>Every day, at the <b>same time and place</b> (less complexity).</li><li>The team plans the <b>next 24 hours</b> and inspects progress toward the Sprint Goal and the Sprint Backlog.</li><li>⭐ The <b>Development Team sets the structure</b>. The slide's example card: <b>Did? Doing? Dam?</b></li></ul><p>In plain words: What did I do yesterday? What will I do today? What is blocking me (a \"dam\" in the river)? Blockers go to the Scrum Master, who removes impediments.</p><p>Café example: \"Yesterday I finished the menu API. Today I start the cart. I am blocked: no Click test account.\"</p>"
   },
   {
    "h": "Sprint Review vs Sprint Retrospective",
    "body": "<table><tr><th></th><th>Sprint Review</th><th>Sprint Retrospective</th></tr><tr><td>Looks at</td><td>the <b>product</b>: what is \"Done\", the Increment, the backlog, the market, timeline and budget</td><td>the <b>team itself</b>: people, relationships, process and tools</td></tr><tr><td>Who</td><td>Scrum Team + <b>key stakeholders invited by the PO</b></td><td>the Scrum Team only</td></tr><tr><td>What happens</td><td>PO explains what is Done / not Done; Dev Team <b>demonstrates</b> the work and answers questions; everyone decides what to do next</td><td>list what went well and what to improve; make a plan for improvements</td></tr><tr><td>Output</td><td>input for the next Sprint Planning</td><td>improvement plan for the next Sprint</td></tr><tr><td>Time-box</td><td>not on the slides</td><td>max <b>3 h</b></td></tr></table><p>Order: <b>Review first, then Retrospective</b>, then the next Sprint Planning. Memory: Review = \"what did we build?\", Retro = \"how did we work?\".</p>"
   },
   {
    "h": "Product Backlog and user stories",
    "body": "<p><b>Product Backlog</b>: \"a list of all desired work on the project\". <b>Prioritized by the PO</b>, reprioritized at the start of each Sprint, most important on top. It starts with the <b>two R's: roadmap and requirements</b> (roadmap → epics → user stories). The team <b>pulls</b> work from it; the PO does not push.</p><p>PO prioritizes by: customer priority, importance of getting feedback, relative implementation difficulty, symbiotic (linked) relationships between items.</p><p>Items are <b>user requirements</b> (user stories): \"As a &lt;User Role&gt; I want &lt;Functionality&gt; so that &lt;Business Value&gt;\" (or \"In order to &lt;Business value&gt; as a &lt;User Role&gt; I want &lt;Functionality&gt;\"). Hotel example: \"As a guest, I want to cancel a reservation.\" Estimate 5.</p><ul><li>Story = <b>WHAT</b>; rough estimate in <b>relative scale points</b> at release planning.</li><li>Task = <b>HOW</b>; estimated in <b>hours, usually 2–12</b>, at iteration planning.</li><li>Stories are validated by <b>acceptance tests</b> (pass or fail).</li></ul>",
    "diagram": "flowchart TD\n  US([\"User story: As a student I want to register for a course so that I can follow my study plan\"])\n  US --> T1[\"Task 1: course list screen - 8 h\"]\n  US --> T2[\"Task 2: save registration in the database - 4 h\"]\n  US --> A1([\"Acceptance test 1: registration is saved - PASS\"])\n  US --> A2([\"Acceptance test 2: a full course is refused - FAIL\"])"
   },
   {
    "h": "Sprint Backlog, transparency and \"Done\"",
    "body": "<p><b>Sprint Backlog</b> = the Product Backlog items selected for the Sprint <b>+ a plan</b> to deliver the Increment and reach the Sprint Goal. It is \"a <b>forecast</b> by the Development Team\".</p><ul><li>Individuals <b>sign up</b> for work; work is <b>never assigned</b>.</li><li>Work remaining is updated <b>daily</b>.</li><li><b>Any team member</b> can add, delete or change it.</li><li>Unclear work? Make a bigger item now and break it down later.</li></ul><p><b>Artifacts</b> exist for transparency, so everyone has the same picture. The slide lists <b>two</b>: Product Backlog and Sprint Backlog. The <b>Scrum Master</b> checks that the artifacts are completely transparent.</p><p><b>Definition of \"Done\"</b>: everyone must share the same meaning of \"Done\" for an item or Increment. It may vary per team, but inside the team it is shared, and it is used to judge when work is complete.</p>",
    "diagram": "flowchart LR\n  subgraph PB[\"Product Backlog - the PO ranks it\"]\n    P1[\"1 Click payment\"] --> P2[\"2 Order history\"]\n    P2 --> P3[\"3 Loyalty points\"]\n    P3 --> P4[\"4 Dark mode\"]\n  end\n  subgraph SBK[\"Sprint Backlog - the team's forecast\"]\n    S1[\"Click payment: 3 tasks\"]\n    S2[\"Order history: 2 tasks\"]\n  end\n  P1 -->|team pulls| S1\n  P2 -->|team pulls| S2"
   }
  ],
  "example": {
   "problem": "<p>For the university <b>course-registration system</b>: (a) write one user requirement in the class template; (b) split it into two tasks with estimates; (c) give two acceptance tests; (d) say how the story and the tasks are estimated.</p>",
   "solution": "<p>(a) \"As a <b>student</b> I want <b>to register for a course</b> so that <b>I can follow my study plan</b>.\"</p><p>(b) Task 1: build the course list screen, <b>8 h</b>. Task 2: save the registration in the database, <b>4 h</b>. Both are inside the 2–12 hour range.</p><p>(c) Acceptance test 1: after registering, the course appears in my timetable (pass/fail). Acceptance test 2: a full course refuses the registration (pass/fail).</p><p>(d) The story gets a rough estimate in <b>relative scale points</b> at release planning. The tasks are estimated in <b>hours</b> at iteration planning.</p>",
   "diagram": "flowchart TD\n  US([\"User story: As a student I want to register for a course so that I can follow my study plan\"])\n  US --> T1[\"Task 1: course list screen - 8 h\"]\n  US --> T2[\"Task 2: save registration in the database - 4 h\"]\n  US --> A1([\"Acceptance test 1: registration is saved - PASS\"])\n  US --> A2([\"Acceptance test 2: a full course is refused - FAIL\"])"
  },
  "check": [
   {
    "q": "Put in order: Sprint Retrospective, Sprint Planning, Sprint Review, Daily Scrum.",
    "a": "Sprint Planning → Daily Scrums (during the development work) → Sprint Review → Sprint Retrospective."
   },
   {
    "q": "Which event is at most 3 hours for a one-month Sprint and happens after the Sprint Review?",
    "a": "The <b>Sprint Retrospective</b>. It inspects people, relationships, process and tools and makes an improvement plan."
   },
   {
    "q": "True or false: once a Sprint begins, it can be lengthened if the team needs more time.",
    "a": "<b>False</b>. Its duration is fixed; it cannot be shortened or lengthened."
   },
   {
    "q": "During the Sprint, which is allowed? (A) changes that endanger the Sprint Goal (B) lowering quality goals (C) clarifying and re-negotiating scope between PO and Development Team (D) moving the end date",
    "a": "<b>C</b>."
   },
   {
    "q": "Product Backlog vs Sprint Backlog: who prioritizes or owns each, and is work pushed or pulled?",
    "a": "Product Backlog: <b>prioritized by the PO</b>; the team <b>pulls</b> work from it. Sprint Backlog: a <b>forecast by the Development Team</b>; people <b>sign up</b>, and work is never assigned."
   },
   {
    "q": "Who may cancel a Sprint, when, and what happens to unfinished items?",
    "a": "<b>Only the PO</b>, when the Sprint Goal becomes obsolete. Unfinished items are <b>re-estimated and put back on the Product Backlog</b>."
   }
  ],
  "exam": {
   "question": "<p><b>Depict graphically: the Scrum framework (the Sprint).</b> Label the roles, events and artifacts and give the time-boxes.</p>",
   "answer": "<p>Draw: Inputs → <b>Product Owner</b> → <b>Product Backlog</b> (ranked list) → <b>Sprint Planning Meeting</b> → <b>Sprint Backlog</b> (task breakout) → a big loop \"<b>1–4 week Sprint</b>\" with a small loop \"<b>Daily Scrum, every 24 hours</b>\" → <b>Finished Work</b> (Increment) → <b>Sprint Review</b> and <b>Sprint Retrospective</b>. Write the Scrum Master above the loop.</p><p>Time-boxes (one-month Sprint): Sprint ≤ 1 month (fixed once started); Sprint Planning ≤ 8 h; Daily Scrum 15 min; Retrospective ≤ 3 h. Write: \"Sprint end date and team deliverable do not change.\"</p>",
   "diagram": "flowchart LR\n  IN[\"Inputs: executives, team, stakeholders, customers, users\"] --> PO([\"Product Owner\"])\n  PO --> PB[\"Product Backlog: ranked list\"]\n  PB --> SP[\"Sprint Planning Meeting\"]\n  SP --> SB[\"Sprint Backlog: task breakout\"]\n  SB --> SPR((\"1-4 week Sprint\"))\n  SPR --> DS((\"Daily Scrum every 24 hours\"))\n  DS --> SPR\n  SPR --> FW[\"Finished Work = Increment\"]\n  FW --> RV[\"Sprint Review\"]\n  RV --> RT[\"Sprint Retrospective\"]\n  RT -.->|next Sprint starts at once| SP"
  },
  "memorize": [
   "Events: Sprint (≤ 1 month, fixed) contains Sprint Planning (≤ 8 h), Daily Scrum (15 min), Sprint Review, Sprint Retrospective (≤ 3 h)",
   "Sprint Planning answers WHAT and HOW; it creates the Sprint Goal",
   "Only the PO cancels a Sprint (goal obsolete); unfinished items go back to the Product Backlog",
   "Review = product + stakeholders; Retro = the team itself; Review comes first",
   "Artifacts on the slide: Product Backlog (PO prioritizes, team pulls) and Sprint Backlog (team forecast, never assigned)",
   "User story: As a &lt;role&gt; I want &lt;function&gt; so that &lt;value&gt;; points at release planning; tasks 2–12 h; acceptance tests",
   "Definition of Done: shared by the whole team, for transparency"
  ],
  "note": "The slides follow the older (pre-2020) Scrum Guide, so use their wording: Sprint Planning answers two questions (what, how), the Sprint Backlog is a forecast, and only 2 artifacts are listed. Outside the slides, the Scrum Guide also counts the Increment as a third artifact and gives the Sprint Review a 4-hour maximum for a one-month Sprint; mention this only as extra. Watch the trap: W1b slide 56 says a Sprint is \"thirty working days\", but this W2 deck says \"one month or less\" (diagram: 1–4 weeks); for Scrum questions use W2. Slide 33 has missing words (\"The product set the goal\" means the product owner sets the goal)."
 },
 {
  "id": "W2-4",
  "label": "W2·4",
  "week": "W2",
  "slides": [
   47,
   48,
   49,
   50,
   51,
   52,
   53,
   54,
   55,
   56,
   57,
   58,
   59,
   60,
   61,
   62,
   63
  ],
  "kind": "theory",
  "title": "Kanban and DevOps: visual flow and one Dev+Ops team",
  "hook": "After this lesson you can draw and label a kanban board, explain WIP limits and lead time, and describe the DevOps loop, its 5 principles and its 3 kinds of benefits.",
  "cards": [
   {
    "h": "Kanban: the visual board",
    "body": "<p>\"Kanban\" is Japanese for <b>\"visual board\" or \"sign\"</b>. <b>Toyota</b> used it from the <b>1950s</b> as a scheduling system for just-in-time manufacturing (make only what is needed, when it is needed). The capital-K <b>\"Kanban Method\"</b> was defined in <b>2007</b>.</p><p>Slide definition: \"a popular <b>framework</b> used to implement agile and DevOps software development\". It needs real-time communication of capacity and full transparency: every work item is a card on a board, so anyone can see the state of every piece of work at any time.</p><p>It works for almost any business function (software, IT/Ops, staffing, recruitment, marketing and sales, procurement), with benefits such as <b>reduced lead time, increased throughput</b> (more items finished per week) and <b>higher quality</b>.</p>"
   },
   {
    "h": "Three core concepts",
    "body": "<ol><li><b>Visualize Workflow</b>: split the work into states shown as named columns; write each item on a card and put it in the right column.</li><li><b>Limit WIP</b> (Work In Progress): set an explicit maximum number of items in each state.</li><li><b>Measure the Lead Time</b>: lead time (the slide says \"also known as cycle time\") is the average time to complete one item. Make it as small and predictable as possible.</li></ol><p>Memory: <b>Visualize → Limit → Measure</b>.</p><p>A Kanban board helps to visualize work, limit WIP and maximize efficiency (flow). It uses cards, columns and continuous improvement.</p>"
   },
   {
    "h": "The kanban board and its 5 elements",
    "body": "<ol><li><b>Visual signals</b>: the cards, usually one work item (for agile teams, one user story) per card.</li><li><b>Columns</b>: each column is one activity; together they form the workflow, for example To Do, In Progress, Complete.</li><li><b>WIP limits</b>: the maximum number of cards in one column. A column with a limit of 3 cannot hold 4 cards.</li><li><b>Commitment point</b>: the moment an idea is picked up from the board's backlog and work starts.</li><li><b>Delivery point</b>: the end of the workflow, usually when the product is in the customer's hands.</li></ol><p>⭐ <b>Lead Time</b> = the time from the commitment point to the delivery point.</p><p>The S47 picture also shows a <b>swimlane</b> called \"EXPEDITE\": a horizontal band across all columns for urgent cards (labelled only, not explained).</p>",
    "diagram": "flowchart LR\n  subgraph K1[\"Backlog - ideas\"]\n    B1[\"Loyalty points\"]\n    B2[\"Dark mode\"]\n  end\n  subgraph K2[\"To Do\"]\n    T1[\"Photo menu\"]\n  end\n  subgraph K3[\"In Progress - WIP limit 3\"]\n    W1[\"Click payment\"]\n    W2[\"Order history\"]\n    W3[\"Push alerts\"]\n  end\n  subgraph K4[\"Done - delivery point\"]\n    D1[\"Login\"]\n    D2[\"Menu list\"]\n  end\n  K1 -->|commitment point| K2\n  K2 --> K3\n  K3 --> K4"
   },
   {
    "h": "Why WIP limits matter, and 6 benefits",
    "body": "<p>When a column is \"maxed out\", nobody may pull a new card into it. The team must <b>swarm</b> on the cards already there and move them forward. This exposes <b>bottlenecks</b> early, \"before a situation becomes dire\", and warns you that you committed to too much work.</p><p><b>6 benefits (slide 51):</b></p><ol><li>Bottlenecks become visible in real time, so people optimize the whole value chain.</li><li>Useful for operations and support teams with high uncertainty and variability.</li><li>Spreads naturally through the organization (even sales and management).</li><li>Reduces inventory by <b>25%–75%</b>, so costs fall.</li><li>Everything is visible, so waiting times shrink.</li><li>No overproduction, which is called <b>eliminating waste</b>.</li></ol><p><b>Agile Kanban</b> = the Agile iteration approach + the Kanban value-stream focus (slide 52).</p>"
   },
   {
    "h": "DevOps: development and operations as one team",
    "body": "<p>Old way: developers write the café app and \"throw it over the wall\" to the IT operations people, who must run the servers. When something breaks, each side blames the other.</p><p>⭐ DevOps is \"a set of <b>practices, tools, and a cultural philosophy</b> that automate and integrate the processes between software development and IT teams\".</p><ul><li>It emphasizes team empowerment, cross-team communication and collaboration, and technology automation.</li><li>Developers + IT operations work together <b>throughout the product lifecycle</b>.</li><li>Goal: increase the <b>speed and quality</b> of software deployment.</li><li>It is \"a cultural shift\", a new way of working.</li></ul>"
   },
   {
    "h": "The DevOps lifecycle: an endless loop",
    "body": "<p>Slide 58 draws an <b>infinity loop (∞)</b>: the Dev side on the left, the Ops side on the right, and it never stops.</p><p><b>Koenig version:</b> Plan → Code → Build → Test → <b>Release</b> → Deploy → Operate → Monitor → back to Plan.</p><p><b>DEV/OPS rings version:</b> Plan → Create → Verify → Package → <b>Release</b> → Configure → Monitor → back to Plan.</p><p>Only two stages are explained in words:</p><ul><li><b>Plan</b>: adopt agile practices; break work into smaller pieces to deliver incremental value.</li><li><b>Operate</b>: manage the end-to-end delivery of IT services to customers (design, implementation, configuration, deployment and maintenance of the IT infrastructure).</li></ul>",
    "diagram": "flowchart LR\n  subgraph DEV[\"Dev side\"]\n    P([\"Plan\"]) --> CO([\"Code\"])\n    CO --> BU([\"Build\"])\n    BU --> TE([\"Test\"])\n  end\n  subgraph OPS[\"Ops side\"]\n    DE([\"Deploy\"]) --> OP([\"Operate\"])\n    OP --> MO([\"Monitor\"])\n  end\n  TE --> RE((\"Release\"))\n  RE --> DE\n  MO -->|feedback, loop again| P"
   },
   {
    "h": "5 DevOps principles and 3 benefit categories",
    "body": "<table><tr><th>Principle</th><th>Key idea</th></tr><tr><td><b>Collaboration</b></td><td>Dev and Ops merge into one team; \"full stack\" ownership of a feature from idea to delivery</td></tr><tr><td><b>Automation</b></td><td>automate as much of the lifecycle as possible; key part of a CI/CD pipeline; fewer human errors</td></tr><tr><td><b>Continuous Improvement</b></td><td>experiment, minimize waste, optimize speed, cost and ease of delivery; tied to continuous delivery</td></tr><tr><td><b>Customer-centric action</b></td><td>short feedback loops; real-time live monitoring; rapid deployment</td></tr><tr><td><b>Create with the end in mind</b></td><td>solve real customer problems; don't \"build in a bubble\"</td></tr></table><p><b>3 benefit categories:</b></p><ul><li><b>Technical</b>: reduced complexity, continuous delivery, faster problem resolution.</li><li><b>Cultural</b>: more productive and efficient teams, happier customers.</li><li><b>Business</b>: more collaboration and trust, faster delivery, stable operating environments.</li></ul><p>CI/CD (not explained on the slides) = Continuous Integration / Continuous Delivery: every code change is built, tested and made ready to release automatically.</p>"
   }
  ],
  "example": {
   "problem": "<p>The café app team uses a kanban board. The <b>In Progress</b> column has a WIP limit of 3. Four cards were finished:</p><table><tr><th>Card</th><th>Commitment point (day)</th><th>Delivery point (day)</th></tr><tr><td>Click payment</td><td>1</td><td>6</td></tr><tr><td>Order history</td><td>2</td><td>9</td></tr><tr><td>Photo menu</td><td>3</td><td>6</td></tr><tr><td>Login</td><td>4</td><td>9</td></tr></table><p>(a) Find the lead time of each card and the average lead time. (b) In Progress already holds 3 cards, and an urgent \"Push alerts\" card arrives. What should the team do?</p>",
   "solution": "<p>(a) Lead time = delivery day − commitment day: Click payment 6 − 1 = <b>5</b>; Order history 9 − 2 = <b>7</b>; Photo menu 6 − 3 = <b>3</b>; Login 9 − 4 = <b>5</b>. Average = (5 + 7 + 3 + 5) / 4 = 20 / 4 = <b>5 days</b>. The team now tries to make this smaller and more predictable.</p><p>(b) The column is maxed out (3 of 3), so the new card <b>cannot</b> enter. The team <b>swarms</b> on the 3 cards in progress, finishes one, and then pulls Push alerts in. (Many teams use an \"Expedite\" swimlane for truly urgent cards.)</p>"
  },
  "check": [
   {
    "q": "What does \"kanban\" mean, and who first used it?",
    "a": "\"Visual board\" or \"sign\" in Japanese. First used by <b>Toyota</b> (1950s) for just-in-time manufacturing. The Kanban Method dates from 2007."
   },
   {
    "q": "Name Kanban's three core concepts.",
    "a": "<b>Visualize Workflow</b>, <b>Limit WIP</b>, <b>Measure the Lead Time</b>."
   },
   {
    "q": "In Kanban, the time between the commitment point and the delivery point is called: (a) throughput (b) WIP limit (c) sprint length (d) value stream (e) Lead Time",
    "a": "<b>(e) Lead Time</b>."
   },
   {
    "q": "Define DevOps in one sentence.",
    "a": "A set of <b>practices, tools, and a cultural philosophy</b> that automate and integrate the processes between software development and IT operations, to increase the speed and quality of deployment."
   },
   {
    "q": "List the Koenig DevOps loop in order, and name the 5 principles.",
    "a": "Plan → Code → Build → Test → Release → Deploy → Operate → Monitor → (Plan). Principles: Collaboration, Automation, Continuous Improvement, Customer-centric action, Create with the end in mind."
   },
   {
    "q": "What are the 3 categories of DevOps benefits?",
    "a": "<b>Technical, cultural, business</b>."
   }
  ],
  "exam": {
   "question": "<p>Draw a kanban board for a small project and label its five elements. Define a WIP limit and Lead Time.</p>",
   "answer": "<p>Draw columns <b>Backlog → To Do → In Progress (WIP 3) → Done</b>, with cards in them. Label: <b>visual signals</b> (the cards), <b>columns</b> (the workflow steps), <b>WIP limit</b> (the \"3\" on In Progress), <b>commitment point</b> (where a card leaves the backlog and work starts) and <b>delivery point</b> (Done, in the customer's hands).</p><p><b>WIP limit</b>: the maximum number of cards allowed in one column at any time; when it is reached, the team swarms to finish cards before pulling new ones, which exposes bottlenecks. <b>Lead Time</b>: the elapsed time from the commitment point to the delivery point (the average time to complete one item); Kanban teams try to make it small and predictable.</p>",
   "diagram": "flowchart LR\n  subgraph K1[\"Backlog - ideas\"]\n    B1[\"Loyalty points\"]\n    B2[\"Dark mode\"]\n  end\n  subgraph K2[\"To Do\"]\n    T1[\"Photo menu\"]\n  end\n  subgraph K3[\"In Progress - WIP limit 3\"]\n    W1[\"Click payment\"]\n    W2[\"Order history\"]\n    W3[\"Push alerts\"]\n  end\n  subgraph K4[\"Done - delivery point\"]\n    D1[\"Login\"]\n    D2[\"Menu list\"]\n  end\n  K1 -->|commitment point| K2\n  K2 --> K3\n  K3 --> K4"
  },
  "memorize": [
   "Kanban = visual board / sign; Toyota, 1950s, just-in-time; Kanban Method 2007",
   "3 core concepts: Visualize Workflow, Limit WIP, Measure the Lead Time",
   "5 board elements: visual signals, columns, WIP limits, commitment point, delivery point",
   "Lead Time = commitment point to delivery point; inventory down 25–75%; avoiding overproduction = eliminating waste",
   "DevOps = practices + tools + cultural philosophy joining Dev and IT Ops",
   "Loop: Plan, Code, Build, Test, Release, Deploy, Operate, Monitor",
   "5 principles: Collaboration, Automation, Continuous Improvement, Customer-centric action, Create with the end in mind; 3 benefits: technical, cultural, business"
  ],
  "note": "Slide 50 says Lead Time is \"also known as cycle time\". Outside the slides, many Kanban sources separate the two (lead time from request to delivery; cycle time from start of work to delivery), but on the exam use the slide's version. Slide 51 benefit 5 is garbled; the idea is simply \"less waiting\". Slide 55 has a typo: \"is the called Lead Time\"."
 },
 {
  "id": "W3-1",
  "label": "W3·1",
  "week": "W3",
  "slides": [
   2,
   3,
   4,
   5,
   6,
   7,
   8,
   9,
   10,
   11,
   12,
   13,
   14,
   15
  ],
  "kind": "theory",
  "title": "How a project starts: business need, BPM and the system request",
  "hook": "After this lesson you can explain where project ideas come from, tell automation, improvement and reengineering apart, and fill in the 5 parts of a system request.",
  "cards": [
   {
    "h": "Where we are: Planning, part 1",
    "body": "<p>The SDLC has phases: Idea → <b>Planning</b> → Analysis → Design → Implementation → System success. This week is the <b>first phase, Planning</b>.</p><p>Planning has <b>two parts</b>:</p><ol><li><b>Project Initiation</b>: develop or receive a <b>system request</b>, then do a <b>feasibility analysis</b> (technical, economic, organizational).</li><li><b>Project Management</b>: develop the work plan, staff the project, monitor and control it.</li></ol><p>This deck covers <b>part 1 only</b>. Part 2 is the W4 deck (WBS, Gantt, CPM).</p>",
    "diagram": "flowchart LR\n  I([Idea]) --> P[\"Planning: WE ARE HERE\"] --> A[Analysis] --> D[Design] --> M[Implementation] --> S([System success])"
   },
   {
    "h": "A project starts with a business need",
    "body": "<p>Think of a café in Tashkent. Every morning the queue is long and customers leave. That is a <b>problem</b>. The owner says: \"We need an ordering app.\" A project is born.</p><p>The professor asked in class: <i>\"Where do project ideas come from?\"</i> Answer: <b>a project is identified when someone in the organization identifies a business need to build a system.</b></p><table><tr><th>Kind of need</th><th>Slide examples</th></tr><tr><td>Opportunity</td><td>support a new marketing campaign; reach a new type of customer; improve interactions with suppliers</td></tr><tr><td>\"Pain\" in the organization</td><td>drop in market share; poor customer service; unacceptable product defect rates; increased competition</td></tr><tr><td>Other</td><td>new business initiatives and strategies; a merger or acquisition that needs systems integrated</td></tr></table>"
   },
   {
    "h": "BPM: always improving the business processes",
    "body": "<p><b>Business process management (BPM)</b> = a methodology to <b>continuously improve end-to-end business processes</b>. It works inside one organization and across business partners. It is a cycle: create, assess, change processes, again and again.</p><p><b>3 benefits</b>: (1) more <b>agility</b> (adapt faster to change), (2) better <b>alignment</b> with industry \"best practices\", (3) more <b>efficiency</b> (costs are found and removed).</p><p>The <b>business analyst's 4 steps</b> in BPM:</p><ol><li>Define and map the steps of a process.</li><li>Improve the steps that add value.</li><li>Remove or merge the steps that do not add value.</li><li><b>Create or adjust electronic workflows</b> to match the improved process.</li></ol><p>Step 4 is the important one for us: <b>this is where the need for information systems projects is most often found.</b></p>"
   },
   {
    "h": "Automation, Improvement, Reengineering: small, medium, big change",
    "body": "<table><tr><th></th><th>What it means</th><th>Café example</th></tr><tr><td><b>Business Process Automation</b></td><td>Technology <b>complements or replaces manual</b> work. Goal: <b>cost efficiency</b>. The foundation of many IT systems.</td><td>Paper order slips are replaced by a tablet. Same steps, faster.</td></tr><tr><td><b>Business Process Improvement</b></td><td>Study the process and <b>redesign</b> it, maybe with new technology (= BPM steps 2, 3, 4).</td><td>Customers order and pay in the app before they arrive. Some steps disappear.</td></tr><tr><td><b>Business Process Reengineering (BPR)</b></td><td><b>Complete revamping</b>: change the fundamental way the organization works, \"obliterating\" the old way.</td><td>The café closes the hall and becomes a delivery-only kitchen.</td></tr></table><p>BPR has <b>substantial risk</b>, is <b>fairly rare</b>, and needs <b>top management support and careful management</b>. In all three, IT people and business people must work closely together.</p>",
    "diagram": "flowchart LR\n  A[\"Automation: same steps, done by computer\"] -->|bigger change| B[\"Improvement: redesign some steps\"] -->|biggest change, high risk| C[\"Reengineering BPR: start over\"]"
   },
   {
    "h": "From the need to the system request",
    "body": "<p>The chain is: <b>business need</b> → <b>high-level business requirements</b> (what the system must do, and why) + <b>business value</b> (the benefits) → the <b>project sponsor</b> formally starts the project → <b>system request</b>.</p><p><b>System request</b> = a document that describes the <b>business reasons</b> for building a system and the <b>value</b> it is expected to provide.</p><p>Who writes it? Usually the <b>project sponsor</b>, as part of a formal project selection process. Then it goes, with the feasibility analysis, to the <b>approval committee</b> (next lesson).</p>",
    "diagram": "flowchart LR\n  N[Business need] --> R[\"High-level business requirements\"]\n  N --> V[Business value]\n  R --> SR[\"System request, by the project sponsor\"]\n  V --> SR\n  SR --> F[Feasibility analysis]\n  F --> C{\"Approval committee\"}\n  C -->|yes| GO([Project starts])\n  C -->|no| NO([Stop])"
   },
   {
    "h": "The 5 elements of a system request",
    "body": "<table><tr><th>Element</th><th>Meaning</th><th>Slide example</th></tr><tr><td><b>Project sponsor</b></td><td>the person who starts the project and is the main contact on the business side</td><td>VP of marketing, CIO, CEO, steering committee, several members of finance</td></tr><tr><td><b>Business need</b></td><td>the business reason for the system</td><td>increase sales, improve customer service, decrease product defects</td></tr><tr><td><b>Business requirements</b></td><td>the business <b>capabilities</b> the system will provide</td><td>online access to information, product search, management reports</td></tr><tr><td><b>Business value</b></td><td>the <b>benefits</b> for the organization, usually as numbers</td><td>3% increase in sales, $200,000 cost savings, headcount reduced by 5 FTEs</td></tr><tr><td><b>Special issues or constraints</b></td><td>things the approval committee must know</td><td>government deadline May 30, ready before Christmas, security clearance needed</td></tr></table><p>Memory trick: <b>S-N-R-V-I</b> (Sponsor, Need, Requirements, Value, Issues). Tip: requirements = <i>what it does</i>; value = <i>what we gain</i> (a number).</p>"
   }
  ],
  "example": {
   "problem": "<p>Inha University in Tashkent wants a new online course-registration system. Every semester students wait in long lines and many registration errors happen. Write a short system request with all 5 elements.</p>",
   "solution": "<table><tr><th>Element</th><th>Our answer</th></tr><tr><td>Project sponsor</td><td>Head of the Academic Affairs Office</td></tr><tr><td>Business need</td><td>Long lines and many registration errors; improve student service</td></tr><tr><td>Business requirements</td><td>Online course search; online registration with seat limits; automatic prerequisite check; reports for deans</td></tr><tr><td>Business value</td><td>Registration errors down by 80%; 2 fewer office staff needed during registration; about $15,000 saved per year</td></tr><tr><td>Special issues or constraints</td><td>Must be ready before the spring registration week; must connect to the existing student database</td></tr></table><p>Check yourself: is each business value a <b>measurable</b> number? Is each requirement a <b>capability</b>? Yes, so the form is correct.</p>"
  },
  "check": [
   {
    "q": "(Professor's question, S5) Where do project ideas come from?",
    "a": "A project is identified when someone in the organization identifies a <b>business need</b> to build a system."
   },
   {
    "q": "(Professor's question, S5) Give examples of such needs.",
    "a": "Opportunities: new marketing campaign, new type of customer, better interactions with suppliers. \"Pain\": drop in market share, poor customer service, unacceptable defect rates, increased competition. Also new strategies, mergers or acquisitions."
   },
   {
    "q": "Which system-request element is each? (a) \"Include product search capabilities\" (b) \"Government-mandated deadline for May 30\" (c) \"$150,000 savings from removal of existing system\" (d) \"Vice president of marketing\"",
    "a": "(a) business requirements · (b) special issues or constraints · (c) business value · (d) project sponsor"
   },
   {
    "q": "Which of BPA, BPI and BPR is risky and rare, and what does it need?",
    "a": "<b>BPR</b>. It needs <b>top management support and careful management</b>."
   },
   {
    "q": "Which of the analyst's 4 BPM steps is where IS projects are most often identified?",
    "a": "Step 4: <b>creating or adjusting electronic workflows</b> to match the improved process maps."
   }
  ],
  "exam": {
   "question": "<p>What is a system request? Who usually prepares it? List and describe its five elements.</p>",
   "answer": "<p>A <b>system request</b> is a document that describes the business reasons for building a system and the value the system is expected to provide. It is usually completed by the <b>project sponsor</b> as part of a formal project selection process, and it is presented (with the feasibility analysis) to the approval committee.</p><ol><li><b>Project sponsor</b>: the person who initiates the project and is the primary point of contact on the business side.</li><li><b>Business need</b>: the business-related reason for initiating the system.</li><li><b>Business requirements</b>: the business capabilities the system will provide.</li><li><b>Business value</b>: the benefits the system will create for the organization.</li><li><b>Special issues or constraints</b>: issues relevant to implementation that the approval committee must know.</li></ol>"
  },
  "memorize": [
   "Planning = Project Initiation (system request + feasibility) + Project Management (work plan, staffing, monitor and control)",
   "A project is identified when someone identifies a business need",
   "BPM benefits: agility, alignment with best practices, efficiency",
   "IS projects are mostly found at BPM step 4: electronic workflows",
   "Change size: Automation (replace manual work, cost) → Improvement (redesign) → BPR (start over, risky, rare, top management support)",
   "System request = Sponsor, Need, Requirements, Value, Special issues (S-N-R-V-I); written by the project sponsor"
  ]
 },
 {
  "id": "W3-2",
  "label": "W3·2",
  "week": "W3",
  "slides": [
   16,
   17,
   18,
   19,
   20,
   21,
   22,
   23,
   33,
   34
  ],
  "kind": "theory",
  "title": "Feasibility analysis: can we, should we, will they?",
  "hook": "After this lesson you can name the three feasibility checks with their questions, list the technical risk factors, and sort any cost or benefit into the right box.",
  "cards": [
   {
    "h": "Three questions before we spend money",
    "body": "<p>Before building the café app, the owner asks three questions:</p><ul><li><b>Technical feasibility</b>: <i>Can we build it?</i></li><li><b>Economic feasibility</b>: <i>Should we build it?</i> (also: <i>Will it provide business value?</i>)</li><li><b>Organizational feasibility</b>: <i>If we build it, will they come?</i> (also: <i>will it be used?</i>)</li></ul><p>The slides call technical \"the first technique\", economic \"the second element\", organizational \"the final technique\". Learn both wordings of each question.</p>",
    "diagram": "flowchart TD\n  SR[System request] --> FA[Feasibility analysis]\n  FA --> T[\"Technical: Can we build it?\"]\n  FA --> E[\"Economic: Should we build it?\"]\n  FA --> O[\"Organizational: If we build it, will they come?\"]\n  T --> AC{\"Approval or steering committee\"}\n  E --> AC\n  O --> AC\n  AC -->|go| G([Project approved])\n  AC -->|no go| X([Project rejected])"
   },
   {
    "h": "Who decides, and the two jobs of feasibility analysis",
    "body": "<p>The <b>system request + feasibility analysis</b> go to the <b>information systems approval committee</b> (also called the <b>steering committee</b>). It <b>decides whether the project should be undertaken</b>.</p><p>The committee may ask the systems analyst to prepare a more detailed <b>business case</b>.</p><p>Feasibility analysis has <b>two jobs</b>:</p><ol><li>guide the <b>go / no-go decision</b>;</li><li><b>identify the important risks</b> that must be managed if the project is approved.</li></ol>"
   },
   {
    "h": "Technical feasibility = technical risk analysis",
    "body": "<p>Definition: the extent to which the system can be successfully <b>designed, developed and installed by the IT group</b>. In essence it is a <b>technical risk analysis</b>: \"Can we build it?\"</p><p><b>4 risk factors</b> (each one makes risk go up):</p><table><tr><th>Factor</th><th>Rule</th><th>Café example</th></tr><tr><td>Familiarity with the <b>application</b></td><td>less familiarity → more risk</td><td>the team never built an ordering system</td></tr><tr><td>Familiarity with the <b>technology</b></td><td>less familiarity → more risk</td><td>the team never made a mobile app</td></tr><tr><td><b>Project size</b></td><td>large project → more risk</td><td>app + website + kitchen screens at once</td></tr><tr><td><b>Compatibility</b></td><td>harder to integrate with existing technology → more risk</td><td>must connect to an old cash register</td></tr></table>"
   },
   {
    "h": "Economic feasibility = cost–benefit analysis",
    "body": "<p>Also called <b>cost–benefit analysis</b>. Question: <i>\"Should we build the system?\"</i></p><p>How: <b>identify costs and benefits → assign values (money) → calculate future cash flows → measure the financial worthiness</b> (ROI, BEP, NPV).</p><p>The 4 things we look at (S19): <b>development costs</b>, <b>annual operating costs</b>, <b>annual benefits</b> (cost savings and/or more revenue), and <b>intangible benefits and costs</b>.</p><p>Why it matters: money is limited and many projects compete for it. <b>The more expensive the project, the more detailed the analysis should be.</b></p>"
   },
   {
    "h": "Sort every cost and benefit into 4 boxes (S23)",
    "body": "<table><tr><th>Development costs<br>(one time, Year 0)</th><th>Operational costs<br>(every year)</th><th>Tangible benefits<br>(every year)</th><th>Intangible benefits<br>(no easy $)</th></tr><tr><td>Development team salaries<br>Consultant fees<br>Development training<br>Hardware and software<br>Vendor installation<br>Office space and equipment<br>Data conversion costs</td><td>Software upgrades<br>Software licensing fees<br>Hardware repairs<br>Hardware upgrades<br>Operational team salaries<br>Communications charges<br>User training</td><td>Increased sales<br>Reductions in staff<br>Reductions in inventory<br>Reductions in IT costs<br>Better supplier prices</td><td>Increased market share<br>Increased brand recognition<br>Higher quality products<br>Improved customer service<br>Better supplier relations</td></tr></table><p><b>Tricky pairs:</b> <i>development</i> training (dev.) vs <i>user</i> training (oper.) · hardware <i>and software</i> (dev.) vs hardware <i>repairs/upgrades</i> (oper.) · supplier <i>prices</i> (tangible) vs supplier <i>relations</i> (intangible) · increased <i>sales</i> (tangible) vs <i>market share</i> (intangible).</p><p>Easy test: \"Do we pay it once to <b>build</b>?\" → development. \"Do we pay it every year to <b>run</b>?\" → operational.</p>"
   },
   {
    "h": "The 4 steps of an economic feasibility analysis (S33–S34)",
    "body": "<ol><li><b>Identify costs and benefits</b>: list the tangible costs and benefits, both <b>one-time and recurring</b>.</li><li><b>Assign values</b>: work with business users and IT people to put numbers on them. <b>Even intangibles</b> should be valued if at all possible.</li><li><b>Determine cash flow</b>: forecast costs and benefits over a period, <b>usually 3 to 5 years</b>. Apply a growth rate if needed.</li><li><b>Assess the project's economic value</b>: use <b>one or more</b> of <b>ROI</b>, <b>BEP</b>, <b>NPV</b> (next lesson).</li></ol>",
    "diagram": "flowchart LR\n  S1[\"Step 1: identify costs and benefits\"] --> S2[\"Step 2: assign values\"] --> S3[\"Step 3: determine cash flow, 3 to 5 years\"] --> S4[\"Step 4: assess value with ROI, BEP, NPV\"]"
   }
  ],
  "example": {
   "problem": "<p>Classify each item as development cost, operational cost, tangible benefit or intangible benefit: consultant fees; software licensing fees; reductions in inventory; increased brand recognition; user training; vendor installation; better supplier prices; better supplier relations; development training; communications charges.</p>",
   "solution": "<table><tr><th>Item</th><th>Box</th><th>Why</th></tr><tr><td>Consultant fees</td><td>Development</td><td>paid to build</td></tr><tr><td>Software licensing fees</td><td>Operational</td><td>paid every year to run</td></tr><tr><td>Reductions in inventory</td><td>Tangible benefit</td><td>money we can count</td></tr><tr><td>Increased brand recognition</td><td>Intangible benefit</td><td>hard to put in $</td></tr><tr><td>User training</td><td>Operational</td><td>users, every year (not development training)</td></tr><tr><td>Vendor installation</td><td>Development</td><td>one time, to set up</td></tr><tr><td>Better supplier prices</td><td>Tangible benefit</td><td>prices = money</td></tr><tr><td>Better supplier relations</td><td>Intangible benefit</td><td>relations = feeling, not $</td></tr><tr><td>Development training</td><td>Development</td><td>training the builders</td></tr><tr><td>Communications charges</td><td>Operational</td><td>monthly bills</td></tr></table>"
  },
  "check": [
   {
    "q": "Name the three feasibility dimensions and the question each answers.",
    "a": "Technical: Can we build it? · Economic: Should we build it? / Will it provide business value? · Organizational: If we build it, will they come? / Will it be used?"
   },
   {
    "q": "Who receives the system request and the feasibility analysis, and what do they decide?",
    "a": "The information systems <b>approval committee</b> (steering committee). It decides whether the project should be undertaken."
   },
   {
    "q": "Besides the go/no-go decision, what else does feasibility analysis do?",
    "a": "It <b>identifies the important risks</b> that must be managed if the project is approved."
   },
   {
    "q": "List the four technical risk factors.",
    "a": "Familiarity with the application, familiarity with the technology, project size, compatibility. Less familiarity, bigger size and harder integration all mean more risk."
   },
   {
    "q": "Over what period is the cash flow usually forecast?",
    "a": "Usually <b>3 to 5 years</b> (step 3, S33)."
   },
   {
    "q": "Is \"Hardware repairs\" a development or operational cost?",
    "a": "<b>Operational</b> (recurring, every year). This matters a lot in the Small practice calculation."
   }
  ],
  "exam": {
   "question": "<p>Name the three dimensions of feasibility analysis and the question each one answers. Explain technical feasibility and list its risk factors.</p>",
   "answer": "<p><b>Technical</b>: \"Can we build it?\" · <b>Economic</b> (cost–benefit analysis): \"Should we build it?\" · <b>Organizational</b>: \"If we build it, will they come?\" The system request and feasibility analysis are presented to the approval (steering) committee, which decides whether to undertake the project.</p><p><b>Technical feasibility</b> is the extent to which the system can be successfully designed, developed and installed by the IT group. It is in essence a technical risk analysis. Risk factors: (1) familiarity with the application, less familiarity = more risk; (2) familiarity with the technology, less familiarity = more risk; (3) project size, large projects = more risk; (4) compatibility, the harder it is to integrate with existing technology, the higher the risk.</p>"
  },
  "memorize": [
   "Technical = Can we build it? · Economic = Should we build it? · Organizational = If we build it, will they come?",
   "Decided by the approval committee = steering committee",
   "Feasibility analysis also identifies the important risks",
   "Technical risk factors: familiarity with application, familiarity with technology, project size, compatibility",
   "Economic feasibility = cost–benefit analysis; 4 steps: identify → assign values → cash flow (3–5 yrs) → ROI/BEP/NPV",
   "Development = one time (Year 0); operational + tangible benefits = every year; intangible = only if valued"
  ]
 },
 {
  "id": "W3-3",
  "label": "W3·3",
  "week": "W3",
  "slides": [
   24,
   25,
   26,
   27,
   28,
   29,
   30,
   31,
   32,
   40,
   41
  ],
  "kind": "calculation",
  "title": "Economic feasibility: cash flow, ROI, break-even point and NPV",
  "hook": "After this lesson you can solve the Quiz 1 Part B task: build the cash-flow table and find ROI, BEP (with the part of the year) and NPV for a 3-year life at any rate.",
  "cards": [
   {
    "h": "Step 1: put every money item in the right year",
    "body": "<p>Story: the café pays developers <b>once, now</b> to build the app. After that, <b>every year</b> the app brings benefits (more sales, fewer staff) and has running costs (licences, repairs).</p><ul><li><b>Development costs → Year 0 only</b> (the \"initial investment\").</li><li><b>Operational costs</b> and <b>tangible benefits → every year, Year 1 to Year n</b>, same amount if no growth rate is given.</li><li>\"Project life cycle is <b>3 years</b>\" = Year 0 + Years 1, 2, 3 (the slide's S25 layout).</li></ul><p>On the exam, write one line: <i>\"Development costs are one-time in Year 0; operating costs and benefits are annual in Years 1–3.\"</i></p>",
    "diagram": "flowchart LR\n  Y0[\"Year 0: development costs, paid once\"] --> Y1[\"Year 1: benefits minus operational costs\"] --> Y2[\"Year 2: benefits minus operational costs\"] --> Y3[\"Year 3: benefits minus operational costs\"]"
   },
   {
    "h": "Step 2: the cash-flow table (net and cumulative)",
    "body": "<p>Four rows. <b>Net = Benefits − Costs</b> for each year. <b>Cumulative = last year's cumulative + this year's net</b> (a running total). Numbers in (parentheses) are <b>negative</b>.</p><p>The slide example (S25):</p><table><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th><th>Total</th></tr><tr><td>Total Benefits</td><td></td><td>45,000</td><td>50,000</td><td>57,000</td><td>152,000</td></tr><tr><td>Total Costs</td><td>100,000</td><td>10,000</td><td>12,000</td><td>16,000</td><td>138,000</td></tr><tr><td>Net Benefits</td><td>(100,000)</td><td>35,000</td><td>38,000</td><td>41,000</td><td>14,000</td></tr><tr><td>Cumulative</td><td>(100,000)</td><td>(65,000)</td><td>(27,000)</td><td><b>14,000</b></td><td></td></tr></table><p>How the cumulative grows: −100,000 + 35,000 = −65,000 → −65,000 + 38,000 = −27,000 → −27,000 + 41,000 = <b>+14,000</b>. It turns positive in <b>Year 3</b>.</p>"
   },
   {
    "h": "Step 3: ROI (return on investment)",
    "body": "<p><b>ROI = (Total Benefits − Total Costs) / Total Costs</b></p><p>Use the <b>Total column</b>, and Total Costs <b>includes Year 0</b>.</p><p>Slide: ROI = (152,000 − 138,000) / 138,000 = 14,000 / 138,000 = <b>10.14%</b>.</p><p>Meaning: over the whole life, each 100 sum we spend comes back with about 10 extra. It is the average rate of return on the money invested.</p><p>Weak points (slides): what is a \"high\" ROI is unclear; it is hard to interpret; it should not be the only measure; and it <b>ignores the time value of money</b>.</p><p>Small note: on S26 the minus sign is missing in \"(total benefits  total costs)\". It is a minus.</p>"
   },
   {
    "h": "Step 4: BEP (break-even point) with the fraction of the year",
    "body": "<p>BEP (also called the <b>payback method</b>) = how many years it takes to get the original investment back.</p><p><b>BEP = number of years of negative cash flow + (that year's Net − that year's Cumulative) / that year's Net</b></p><ol><li>Find <b>\"that year\"</b>: the first year the cumulative is positive. Slide: Year 3.</li><li>Years of negative cash flow = that year − 1 (<b>Year 0 is not counted</b>). Slide: 2.</li><li>Fraction = (41,000 − 14,000) / 41,000 = 27,000 / 41,000 = 0.66.</li><li>BEP = 2 + 0.66 = <b>2.66 years</b>.</li></ol><p>Intuition: at the end of Year 2 we still miss 27,000. Year 3 brings 41,000. So we need 66% of Year 3.</p><p><b>Kind warning:</b> the slide (S27) writes 41,000 − 14,000 = 28,000 and gets 2.68. That is a small typing slip (it is also in the textbook). The correct value is <b>27,000 → 2.66 years</b>. Write 2.66.</p>"
   },
   {
    "h": "Step 5: time value of money and the PV factors",
    "body": "<p>Would you take 100 today or 100 in three years? Today! You could invest today's money and earn a return. So <b>future money is worth less than money today</b>. ROI and BEP ignore this. NPV fixes it.</p><p><b>PV = Cash flow / (1 + rate)<sup>n</sup></b>, where n = the year of the cash flow.</p><p>Slide: 100 / (1.10)<sup>3</sup> = 100 / 1.331 = <b>75.13</b>. (S28's \"$75\" means $100 received in Year 3.)</p><table><tr><th>Rate</th><th>÷ Year 0</th><th>÷ Year 1</th><th>÷ Year 2</th><th>÷ Year 3</th></tr><tr><td>5%</td><td>1</td><td>1.05</td><td>1.1025</td><td>1.157625</td></tr><tr><td>10%</td><td>1</td><td>1.1</td><td>1.21</td><td>1.331</td></tr><tr><td>15%</td><td>1</td><td>1.15</td><td>1.3225</td><td>1.520875</td></tr><tr><td>20%</td><td>1</td><td>1.2</td><td>1.44</td><td>1.728</td></tr></table><p>Build it fast: multiply by (1 + r) again each year. <b>Year 0 is never discounted</b> (÷ 1).</p>"
   },
   {
    "h": "Step 6: NPV and the decision",
    "body": "<p>Add two rows: PV of benefits and PV of costs. Then <b>NPV = Σ PV of benefits − Σ PV of costs</b>.</p><table><tr><th>At 10%</th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th><th>Total</th></tr><tr><td>Total Benefits</td><td></td><td>45,000</td><td>50,000</td><td>57,000</td><td></td></tr><tr><td>PV of Benefits</td><td></td><td>40,909</td><td>41,322</td><td>42,825</td><td><b>125,056</b></td></tr><tr><td>Total Costs</td><td>100,000</td><td>10,000</td><td>12,000</td><td>16,000</td><td></td></tr><tr><td>PV of Costs</td><td>100,000</td><td>9,091</td><td>9,917</td><td>12,021</td><td><b>131,029</b></td></tr></table><p>NPV = 125,056 − 131,029 = <b>(5,973)</b>, negative.</p><p><b>Rule: NPV &gt; 0 → economically acceptable. NPV &lt; 0 → do not accept.</b></p><p><b>Kind warning:</b> S30 prints the Year 3 benefit as <b>55,000</b>. It should be <b>57,000</b> (from S25). Proof: 57,000 / 1.331 = 42,825, the PV on the slide; 55,000 would give 41,322. Use 57,000.</p>"
   },
   {
    "h": "The big lesson: \"naïve\" ROI and BEP vs NPV",
    "body": "<p>In the slide example, ROI = 10.14% (positive) and BEP = 2.66 years (inside the 3-year life). Both <b>look good</b>. But NPV at 10% = <b>−$5,973</b>, so the project should <b>not</b> be accepted.</p><p>S32: the \"naïve\" ROI and BEP can make a project look acceptable, while the <b>more rigorous and financially correct NPV</b> shows it is not.</p><p>In-class question (S32): \"The required rate of return would have to be less than ???% for a positive NPV.\" Answer on the slide: <b>6.65%</b> (python check: NPV = 0 at about 6.66%).</p><p><b>Mistakes that lose marks:</b> discounting Year 0 · counting Year 0 as a negative year in BEP · leaving Year 0 out of Total Costs in ROI · putting hardware repairs, user training or software upgrades in Year 0 · copying 2.68 or 55,000.</p>",
    "diagram": "flowchart LR\n  A[Classify items] --> B[\"Cash-flow table\"] --> C[ROI] --> D[BEP] --> E[\"PV rows\"] --> F[NPV] --> G{\"NPV more than 0?\"}\n  G -->|yes| H([Accept])\n  G -->|no| I([Reject])"
   }
  ],
  "example": {
   "problem": "<p>The slide example (S25–S32). Total Benefits: Year 1 = 45,000, Year 2 = 50,000, Year 3 = 57,000. Total Costs: Year 0 = 100,000, Year 1 = 10,000, Year 2 = 12,000, Year 3 = 16,000. Required rate of return = 10%. Find ROI, BEP and NPV. Should the project be accepted?</p>",
   "solution": "<p><b>1. Cash-flow table</b></p><table><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th><th>Total</th></tr><tr><td>Total Benefits</td><td>–</td><td>45,000</td><td>50,000</td><td>57,000</td><td>152,000</td></tr><tr><td>Total Costs</td><td>100,000</td><td>10,000</td><td>12,000</td><td>16,000</td><td>138,000</td></tr><tr><td>Net Benefits</td><td>(100,000)</td><td>35,000</td><td>38,000</td><td>41,000</td><td>14,000</td></tr><tr><td>Cumulative</td><td>(100,000)</td><td>(65,000)</td><td>(27,000)</td><td>14,000</td><td></td></tr></table><p><b>2. ROI</b> = (152,000 − 138,000) / 138,000 = 14,000 / 138,000 = <b>10.14%</b></p><p><b>3. BEP</b>: the cumulative turns positive in Year 3, so 2 negative years. BEP = 2 + (41,000 − 14,000) / 41,000 = 2 + 27,000 / 41,000 = 2 + 0.66 = <b>2.66 years</b> (the slide prints 28,000 and 2.68 by a small slip).</p><p><b>4. PV at 10%</b></p><table><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th><th>Total</th></tr><tr><td>Divide by</td><td>1</td><td>1.1</td><td>1.21</td><td>1.331</td><td></td></tr><tr><td>PV of Benefits</td><td>–</td><td>40,909</td><td>41,322</td><td>42,825</td><td>125,056</td></tr><tr><td>PV of Costs</td><td>100,000</td><td>9,091</td><td>9,917</td><td>12,021</td><td>131,029</td></tr></table><p>(Use 57,000 for Year 3, not the 55,000 printed on S30.)</p><p><b>5. NPV</b> = 125,056 − 131,029 = <b>(5,973)</b> (exact −5,972.95).</p><p><b>6. Decision</b>: NPV &lt; 0, so at 10% the project should <b>not</b> be accepted, even though ROI and BEP look fine. NPV turns positive only if the rate is below about 6.65%.</p>",
   "diagram": "flowchart LR\n  A[\"Cumulative Year 2: minus 27,000\"] -->|\"Year 3 brings 41,000\"| B[\"27,000 / 41,000 = 0.66 of Year 3\"] --> C[\"BEP = 2 + 0.66 = 2.66 years\"]"
  },
  "check": [
   {
    "q": "(Small practice, S40) Hardware repairs $30 000; Increased sales $20 000; Reduction in staff $40 000; Development team salaries $50 000; Office space and equipment $10 000; Data conversion tools $10 000. Find the year when the cumulative net cash flow turns positive.",
    "a": "Development (Year 0) = 50,000 + 10,000 + 10,000 = 70,000. Every year: benefits 20,000 + 40,000 = 60,000, costs (hardware repairs) 30,000, net 30,000. Cumulative: (70,000) → (40,000) → (10,000) → <b>20,000</b>. Answer: <b>Year 3</b> (BEP = 2 + 10,000/30,000 = 2.33 years). Trap: if you put hardware repairs in Year 0 you wrongly get Year 2."
   },
   {
    "q": "(Small practice, S41) Hardware repairs $20 000; Increased sales $40 000; Reduction in staff $40 000; Development team salaries $50 000; Office space and equipment $10 000; Data conversion tools $10 000. Find ROI, BEP and NPV for a 2-year life at 10%.",
    "a": "Year 0 cost 70,000; Years 1–2: benefits 80,000, costs 20,000, net 60,000. Cumulative: (70,000) → (10,000) → 50,000. Totals: benefits 160,000, costs 110,000.<br><b>ROI</b> = 50,000 / 110,000 = <b>45.45%</b>.<br><b>BEP</b> = 1 + (60,000 − 50,000) / 60,000 = <b>1.17 years</b>.<br><b>NPV</b> = (72,727 + 66,116) − (70,000 + 18,182 + 16,529) = 138,843 − 104,711 = <b>$34,132</b> &gt; 0 → accept."
   },
   {
    "q": "What is the present value of $2,000 received in Year 2 at 10%?",
    "a": "2,000 / 1.21 = <b>$1,652.89</b>"
   },
   {
    "q": "Why can ROI and BEP make a bad project look good?",
    "a": "They ignore the <b>time value of money</b>: a dollar in Year 3 counts the same as a dollar today. NPV discounts future money, so it is \"more rigorous and financially correct\"."
   },
   {
    "q": "(Professor's question, S32) For the slide example, the required rate of return would have to be less than ___% for a positive NPV.",
    "a": "<b>6.65%</b> (NPV = 0 at about 6.66%)."
   }
  ],
  "exam": {
   "question": "<p>(Quiz 1 Part B style, new numbers.) During Project Planning phase, next cash flows were identified:</p><p><b>Development costs</b>: Consultant fees $25 000; Hardware and software $45 000; Vendor installation $15 000<br><b>Operational costs</b>: Software licensing fees $10 000; Operational team salaries $15 000; User training $5 000<br><b>Tangible benefits</b>: Increased sales $50 000; Reductions in inventory $15 000; Better supplier prices $10 000</p><p>Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = 15%.</p>",
   "answer": "<p><i>Assumption: development costs are one-time in Year 0; operational costs and benefits are annual in Years 1–3, no growth.</i></p><p>Development (Year 0) = 25,000 + 45,000 + 15,000 = <b>85,000</b>. Operational = 10,000 + 15,000 + 5,000 = <b>30,000 per year</b>. Benefits = 50,000 + 15,000 + 10,000 = <b>75,000 per year</b>.</p><table><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th><th>Total</th></tr><tr><td>Total Benefits</td><td>–</td><td>75,000</td><td>75,000</td><td>75,000</td><td>225,000</td></tr><tr><td>Total Costs</td><td>85,000</td><td>30,000</td><td>30,000</td><td>30,000</td><td>175,000</td></tr><tr><td>Net Benefits</td><td>(85,000)</td><td>45,000</td><td>45,000</td><td>45,000</td><td>50,000</td></tr><tr><td>Cumulative</td><td>(85,000)</td><td>(40,000)</td><td>5,000</td><td>50,000</td><td></td></tr><tr><td>Divide by (1.15)<sup>n</sup></td><td>1</td><td>1.15</td><td>1.3225</td><td>1.520875</td><td></td></tr><tr><td>PV of Benefits</td><td>–</td><td>65,217.39</td><td>56,710.78</td><td>49,313.72</td><td>171,241.88</td></tr><tr><td>PV of Costs</td><td>85,000.00</td><td>26,086.96</td><td>22,684.31</td><td>19,725.49</td><td>153,496.75</td></tr></table><p><b>ROI</b> = (225,000 − 175,000) / 175,000 = 50,000 / 175,000 = <b>28.57%</b></p><p><b>BEP</b>: the cumulative turns positive in Year 2, so 1 negative year. BEP = 1 + (45,000 − 5,000) / 45,000 = 1 + 40,000 / 45,000 = 1 + 0.89 = <b>1.89 years</b></p><p><b>NPV</b> = 171,241.88 − 153,496.75 = <b>$17,745.13</b> (rounded cells give 17,746). NPV &gt; 0 → the project is <b>economically acceptable</b>.</p><p>Quick check (only when the yearly net is the same): −85,000 + 45,000 × (1/1.15 + 1/1.3225 + 1/1.520875) = −85,000 + 45,000 × 2.283225 = 17,745 ✓</p>"
  },
  "memorize": [
   "Development costs → Year 0 only; operational costs and benefits → every year 1..n",
   "Net = Benefits − Costs; Cumulative = previous cumulative + this year's net; (x) = negative",
   "ROI = (Total Benefits − Total Costs) / Total Costs, totals include Year 0",
   "BEP = negative years (not counting Year 0) + (that year's Net − that year's Cumulative) / that year's Net",
   "PV = amount / (1 + r)^n; Year 0 is not discounted; 10%: 1.1, 1.21, 1.331",
   "NPV = Σ PV benefits − Σ PV costs; NPV positive → accept, NPV negative → reject",
   "Slide example: ROI 10.14%, BEP 2.66 (slide says 2.68 by slip), NPV −5,973 → reject; NPV = 0 at about 6.65%",
   "S30 Year 3 benefit is 57,000, not 55,000"
  ],
  "note": "Rounding: the slides round each PV cell to whole dollars and add them, so your total may differ by about $1 from the exact value. Both are fine if the method is shown. If the slide's \"life cycle n years\" is ambiguous, write your assumption (Year 0 + Years 1..n) in one line."
 },
 {
  "id": "W3-4",
  "label": "W3·4",
  "week": "W3",
  "slides": [
   35,
   36,
   37,
   38,
   39
  ],
  "kind": "theory",
  "title": "Organizational feasibility: will people really use it?",
  "hook": "After this lesson you can explain organizational feasibility, its two assessment methods, the champion, and how to win over each stakeholder group.",
  "cards": [
   {
    "h": "\"If we build it, will they come?\"",
    "body": "<p>Imagine the university builds a perfect registration system, but professors keep using paper lists and students do not trust it. The system is <b>technically fine and cheap</b>, but it <b>fails</b>.</p><p><b>Organizational feasibility</b> = how well the system will be <b>accepted by its users</b> and <b>incorporated into the ongoing operations</b> of the organization.</p><p>It is \"the final technique\" of feasibility analysis, and experienced developers say it <b>can be the most difficult dimension to assess</b>, because many organizational factors affect the project.</p>"
   },
   {
    "h": "Way 1: strategic alignment",
    "body": "<p><b>Strategic alignment</b> = the fit between the project and the business strategy. Do the project's goals match the business objectives?</p><p><b>The greater the alignment, the less risky the project</b> (from the organizational point of view).</p><p>Example: the café's strategy is \"fast service for students\". An ordering app fits well = low risk. A luxury wine-tracking system would not fit = high risk.</p>"
   },
   {
    "h": "Way 2: stakeholder analysis",
    "body": "<p>A <b>stakeholder</b> = a person, group or organization that <b>can affect, or can be affected by</b>, a new system.</p><p>The <b>3 most important stakeholders</b>: the <b>project champion</b>, the <b>system users</b>, and <b>organizational management</b>.</p><p>The S20 checklist for organizational feasibility: project champion(s) · senior management · users · other stakeholders · is the project strategically aligned with the business?</p>",
    "diagram": "flowchart TD\n  SYS((\"New system\"))\n  CH[\"Project champion\"] --- SYS\n  OM[\"Organizational management\"] --- SYS\n  U[\"System users\"] --- SYS\n  OS[\"Other stakeholders\"] -.- SYS"
   },
   {
    "h": "The champion",
    "body": "<p>The <b>champion</b> is a <b>high-level executive</b>. Usually, <b>but not always</b>, the champion is the <b>project sponsor</b> who wrote the system request.</p><p>The champion supports the project with:</p><ul><li><b>time and resources</b> (for example, money);</li><li><b>political support</b>: telling other decision makers why the system is important.</li></ul><p><b>More than one champion is better</b>: if the only champion leaves the organization, the support can leave too.</p>"
   },
   {
    "h": "Each group: their role and how to win them (S38)",
    "body": "<table><tr><th>Stakeholder</th><th>Role</th><th>To improve organizational feasibility</th></tr><tr><td><b>Champion</b></td><td>initiates the project; promotes it; gives his or her time; provides resources</td><td>present the objectives and benefits to the executives who will benefit; build a <b>prototype</b> to show the value</td></tr><tr><td><b>Organizational management</b></td><td>know about the project; budget enough money; encourage users to accept and use the system</td><td>present to management; market the benefits with memos and newsletters; ask the champion to talk to his or her peers</td></tr><tr><td><b>System users</b></td><td>make decisions that influence the project; do hands-on work; <b>ultimately decide success by using or not using the system</b></td><td>give users official roles on the team; give them specific tasks with deadlines; ask for feedback regularly (e.g. weekly meetings)</td></tr></table><p>Count to remember: champion 4 roles / 2 actions; management 3 / 3; users 3 / 3.</p>"
   },
   {
    "h": "Week 3 in one picture (S39 summary)",
    "body": "<p>The deck's summary has 3 items: <b>Project identification and initiation</b> → <b>System request</b> → <b>Feasibility analysis</b>.</p><table><tr><th>Dimension</th><th>Question</th><th>How it is assessed</th></tr><tr><td>Technical</td><td>Can we build it?</td><td>risk factors: familiarity with application and technology, size, compatibility</td></tr><tr><td>Economic</td><td>Should we build it?</td><td>cash flow → ROI, BEP, NPV</td></tr><tr><td>Organizational</td><td>If we build it, will they come?</td><td>strategic alignment + stakeholder analysis</td></tr></table>",
    "diagram": "flowchart LR\n  A[\"Business need\"] --> B[\"System request\"] --> C[\"Feasibility: technical, economic, organizational\"] --> D{\"Approval committee\"}\n  D -->|go| E([\"Project Management: W4\"])"
   }
  ],
  "example": {
   "problem": "<p>A new online registration system has one champion, the Vice-Rector. He suddenly moves to another university. Professors and students were never asked for their opinion, and the system's goals are not in the university's strategy. Find the organizational feasibility problems and suggest actions.</p>",
   "solution": "<ul><li><b>Only one champion, now gone</b> → the support (time, money, political support) may leave with him. Action: find a new high-level champion, and more than one if possible.</li><li><b>Users were ignored</b> → users ultimately decide success by using or not using the system. Action: give professors and students official roles on the team, specific tasks with deadlines, and regular feedback meetings.</li><li><b>Weak strategic alignment</b> → more risk. Action: show management how the system supports university goals (better student service), present the benefits, market them with memos and newsletters.</li><li>Build a <b>prototype</b> to show the value to executives.</li></ul>"
  },
  "check": [
   {
    "q": "Define organizational feasibility. Why is it hard?",
    "a": "How well the system will be accepted by its users and incorporated into the ongoing operations of the organization (\"If we build it, will they come?\"). Many organizational factors affect it, so it can be the most difficult dimension to assess."
   },
   {
    "q": "What are the two ways to assess organizational feasibility?",
    "a": "(1) <b>Strategic alignment</b>: how well the project goals fit the business objectives (more alignment = less risk). (2) <b>Stakeholder analysis</b>."
   },
   {
    "q": "Define stakeholder and name the three most important ones.",
    "a": "A person, group or organization that can affect or be affected by a new system. Most important: <b>project champion, system users, organizational management</b>."
   },
   {
    "q": "Why is more than one champion preferable?",
    "a": "If the champion leaves the organization, the support could leave as well."
   },
   {
    "q": "Which stakeholder group \"ultimately determines whether the project is successful\", and how?",
    "a": "<b>System users</b>, by using or not using the system."
   }
  ],
  "exam": {
   "question": "<p>Explain organizational feasibility. Describe the two ways to assess it and the role of the project champion.</p>",
   "answer": "<p><b>Organizational feasibility</b> asks \"If we build it, will they come?\": how well the system will be accepted by its users and incorporated into the ongoing operations of the organization. It can be the most difficult feasibility dimension to assess.</p><p><b>1. Strategic alignment</b>: the fit between the project and the business strategy; the greater the alignment, the less risky the project.<br><b>2. Stakeholder analysis</b>: a stakeholder is a person, group or organization that can affect or be affected by the system. The most important are the project champion, system users and organizational management.</p><p>The <b>champion</b> is a high-level executive, usually (but not always) the project sponsor. He or she initiates and promotes the project and gives time, resources (money) and political support. More than one champion is preferable, because if the champion leaves, the support may leave too.</p>"
  },
  "memorize": [
   "Organizational = If we build it, will they come? = accepted by users + incorporated into operations",
   "Can be the most difficult feasibility dimension to assess",
   "Two ways: strategic alignment (more fit = less risk) and stakeholder analysis",
   "Stakeholder = can affect or be affected by the system",
   "Key stakeholders: champion, system users, organizational management",
   "Champion = high-level executive, usually but not always the sponsor; time, resources, political support; more than one is better",
   "Users ultimately decide success by using or not using the system"
  ]
 },
 {
  "id": "W4-1",
  "label": "W4·1",
  "week": "W4",
  "slides": [
   2,
   3,
   4,
   5
  ],
  "kind": "calculation",
  "title": "Quiz 1 walkthrough: what each version asked and how to answer",
  "hook": "After this lesson you can answer any version of Quiz 1 (draw the methodology + find ROI, BEP and NPV), because the midterm will very likely ask the same kind of thing.",
  "cards": [
   {
    "h": "What Quiz 1 looked like",
    "body": "<p>The professor gave Quiz 1 at the <b>start</b> of the W4 lecture. It did not test W4. It tested the two lectures before it: <b>W1b</b> (methodology pictures) and <b>W3</b> (money calculations).</p>\n<p>There were <b>4 versions</b>. Each one had <b>2 open tasks</b> and no answer options:</p>\n<ol><li><b>Part A:</b> \"Depict graphically: ___ development methodology.\" You draw a W1b picture from memory.</li>\n<li><b>Part B:</b> a list of cash flows, then \"Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = X%\".</li></ol>\n<p>The versions are almost the same. Only <b>3 amounts and the rate</b> change. So he tests the <b>method</b>, not memorised numbers. Learn the method once and you can do every version.</p>"
   },
   {
    "h": "The four versions side by side",
    "body": "<p><b>The same in every version:</b> Office space and equipment 40,000 and Vendor installation 50,000 (development); Software upgrades 20,000 and Operational team salaries 10,000 (operational); Reduction in staff 40,000 and Better supplier prices 30,000 (benefits); life cycle 3 years.</p>\n<table><tr><th></th><th>V1 (S2)</th><th>V2 (S3)</th><th>V3 (S4)</th><th>V4 (S5)</th></tr>\n<tr><td>Part A: draw</td><td><b>Phased</b></td><td><b>Waterfall</b></td><td><b>Parallel</b></td><td><b>Phased</b></td></tr>\n<tr><td>Data conversion tools (dev.)</td><td>10,000</td><td>20,000</td><td>30,000</td><td>40,000</td></tr>\n<tr><td>User training (oper.)</td><td>20,000</td><td>10,000</td><td>10,000</td><td>10,000</td></tr>\n<tr><td>Increased sales (benefit)</td><td>20,000</td><td>40,000</td><td>60,000</td><td>80,000</td></tr>\n<tr><td>Rate of return</td><td>5%</td><td>10%</td><td>15%</td><td>20%</td></tr></table>\n<p>Notice: <b>Phased was asked twice</b> (V1 and V4). Be very ready to draw it.</p>"
   },
   {
    "h": "Part A: the drawing rules, and Waterfall (V2)",
    "body": "<p>The full drawing lessons are in the <b>W1b methodology lessons</b>. Here is the quick version.</p>\n<p><b>Rules the professor's pictures always follow:</b></p>\n<ul><li>one <b>box</b> per phase (Planning, Analysis, Design, Implementation);</li>\n<li>a <b>solid arrow</b> forward to the next phase;</li>\n<li>a <b>dashed wavy arrow</b> back to the previous phase;</li>\n<li>a <b>rounded box</b> for the output (\"System\", \"System version 1\");</li>\n<li>a <b>dotted ellipse</b> around a group that repeats or runs on its own (\"Subproject 1\").</li></ul>\n<p><b>Waterfall</b> = a staircase going down: Planning → Analysis → Design → Implementation → System. Add 2–3 lines: \"plan-driven; each phase finishes before the next starts; going back is hard and costly.\"</p>",
    "diagram": "flowchart TD\n  P[Planning] --> A[Analysis]\n  A --> D[Design]\n  D --> I[Implementation]\n  I --> S([System])\n  A -.->|back| P\n  D -.->|back| A\n  I -.->|back| D"
   },
   {
    "h": "Phased development (V1 and V4)",
    "body": "<p><b>Idea:</b> build the system in <b>versions</b>, one after another. Version 1 has the most important requirements. Users try it, and what they learn goes into version 2.</p>\n<p><b>Draw:</b> Planning and Analysis once. Then several small cycles (Analysis → Design → Implementation), each inside a dotted ellipse, each ending in a rounded \"System version n\". A long arrow goes from each version into the <b>Analysis of the next cycle</b>.</p>\n<p><b>Pro:</b> a useful system reaches users quickly. <b>Con:</b> users work with a system that is \"intentionally incomplete\". It is a <b>RAD</b> methodology.</p>",
    "diagram": "flowchart TD\n  P[Planning] --> A0[Analysis]\n  subgraph C1[\"Version 1 cycle\"]\n    direction LR\n    A1[Analysis] --> D1[Design] --> I1[Implementation]\n  end\n  I1 --> S1([\"System version 1\"])\n  S1 --> A2\n  subgraph C2[\"Version 2 cycle\"]\n    direction LR\n    A2[Analysis] --> D2[Design] --> I2[Implementation]\n  end\n  I2 --> S2([\"System version 2\"])\n  S2 --> A3\n  subgraph C3[\"Version 3 cycle\"]\n    direction LR\n    A3[Analysis] --> D3[Design] --> I3[Implementation]\n  end\n  I3 --> S3([\"System version 3\"])\n  A0 --> A1"
   },
   {
    "h": "Parallel development (V3)",
    "body": "<p><b>Idea:</b> do <b>one general design</b> for the whole system, then split the work into <b>subprojects</b> that are designed and built <b>at the same time</b>. At the end the pieces are <b>integrated</b> into one system.</p>\n<p><b>Draw:</b> Planning → Analysis → Design, then 3 dotted ellipses \"Subproject 1/2/3\" (each Design → Implementation), all joining into Integration → System.</p>\n<p><b>Pro:</b> \"can reduce the time to deliver a system\". <b>Con:</b> the system still comes only at the end, like waterfall. It is a <b>Structured</b> methodology (not RAD).</p>",
    "diagram": "flowchart LR\n  P[Planning] --> A[Analysis] --> G[\"Design: general\"]\n  subgraph SP1[\"Subproject 1\"]\n    D1[Design] --> I1[Implementation]\n  end\n  subgraph SP2[\"Subproject 2\"]\n    D2[Design] --> I2[Implementation]\n  end\n  subgraph SP3[\"Subproject 3\"]\n    D3[Design] --> I3[Implementation]\n  end\n  G --> D1\n  G --> D2\n  G --> D3\n  I1 --> N[Integration]\n  I2 --> N\n  I3 --> N\n  N --> S([System])"
   },
   {
    "h": "Part B: the 6-step money recipe (from W3)",
    "body": "<ol><li><b>Classify.</b> Development costs happen <b>once, in Year 0</b>. Operational costs and tangible benefits happen <b>every year</b> (Years 1, 2, 3). Write this assumption on your paper.</li>\n<li><b>Table.</b> Columns Year 0 … Year 3 and Total. Rows: Total Benefits, Total Costs, Net Benefits (= B − C), Cumulative. (Parentheses) = negative.</li>\n<li><b>ROI</b> = (Total Benefits − Total Costs) / Total Costs, using the <b>Total</b> column (Year 0 included).</li>\n<li><b>BEP.</b> Find the first year the cumulative becomes positive (\"that year\"). BEP = (number of negative years, <b>not counting Year 0</b>) + (that year's net − that year's cumulative) / that year's net.</li>\n<li><b>PV</b> = amount / (1 + r)<sup>n</sup>. <b>Year 0 is not discounted.</b></li>\n<li><b>NPV</b> = sum of PV of benefits − sum of PV of costs. NPV &gt; 0 → \"economically acceptable\".</li></ol>\n<p><b>Classic mistakes:</b> putting User training or Software upgrades in Year 0 (they are operational); discounting Year 0; counting Year 0 as a negative year in BEP.</p>"
   },
   {
    "h": "All four answers (checked with python)",
    "body": "<table><tr><th>Version</th><th>Dev (Y0)</th><th>Oper/yr</th><th>Benefits/yr</th><th>Net/yr</th><th>ROI</th><th>BEP</th><th>NPV</th></tr>\n<tr><td>V1, 5%</td><td>100,000</td><td>50,000</td><td>90,000</td><td>40,000</td><td>8.00%</td><td>2.50 yrs</td><td>$8,929.92</td></tr>\n<tr><td>V2, 10%</td><td>110,000</td><td>40,000</td><td>110,000</td><td>70,000</td><td>43.48%</td><td>1.57 yrs</td><td>$64,079.64</td></tr>\n<tr><td>V3, 15%</td><td>120,000</td><td>40,000</td><td>130,000</td><td>90,000</td><td>62.50%</td><td>1.33 yrs</td><td>$85,490.26</td></tr>\n<tr><td>V4, 20%</td><td>130,000</td><td>40,000</td><td>150,000</td><td>110,000</td><td>80.00%</td><td>1.18 yrs</td><td>$101,712.96</td></tr></table>\n<p>All four NPVs are positive, so all four projects are <b>economically acceptable</b>. V1 is the \"tight\" one: at 10% instead of 5% its NPV would turn negative.</p>\n<p><b>Fast check</b> (only when the yearly net is the same every year): NPV = −Dev + Net × (sum of the 3 discount factors). For V2: −110,000 + 70,000 × 2.48685 = 64,079.64 ✓. On the exam still show the full table.</p>"
   }
  ],
  "example": {
   "problem": "<p><b>Quiz 1, Version 1 (S2).</b> Development: Office space and equipment $40,000; Vendor installation $50,000; Data conversion tools $10,000. Operational: Software upgrades $20,000; Operational team salaries $10,000; User training $20,000. Tangible benefits: Increased sales $20,000; Reduction in staff $40,000; Better supplier prices $30,000. Find ROI, BEP and NPV, life cycle 3 years, rate of return 5%.</p>",
   "solution": "<p><b>Assumption:</b> development costs are one-time in Year 0; operational costs and benefits repeat every year, Years 1–3, with no growth.</p>\n<p><b>Step 1, classify and add:</b> Development = 40,000 + 50,000 + 10,000 = <b>100,000</b> (Year 0). Operational = 20,000 + 10,000 + 20,000 = <b>50,000 per year</b>. Benefits = 20,000 + 40,000 + 30,000 = <b>90,000 per year</b>.</p>\n<p><b>Step 2, the table:</b></p>\n<table><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th><th>Total</th></tr>\n<tr><td>Total Benefits</td><td>0</td><td>90,000</td><td>90,000</td><td>90,000</td><td>270,000</td></tr>\n<tr><td>Total Costs</td><td>100,000</td><td>50,000</td><td>50,000</td><td>50,000</td><td>250,000</td></tr>\n<tr><td>Net Benefits</td><td>(100,000)</td><td>40,000</td><td>40,000</td><td>40,000</td><td>20,000</td></tr>\n<tr><td>Cumulative</td><td>(100,000)</td><td>(60,000)</td><td>(20,000)</td><td>20,000</td><td></td></tr>\n<tr><td>Divide by 1.05<sup>n</sup></td><td>1</td><td>1.05</td><td>1.1025</td><td>1.157625</td><td></td></tr>\n<tr><td>PV of Benefits</td><td>0</td><td>85,714.29</td><td>81,632.65</td><td>77,745.38</td><td><b>245,092.32</b></td></tr>\n<tr><td>PV of Costs</td><td>100,000.00</td><td>47,619.05</td><td>45,351.47</td><td>43,191.88</td><td><b>236,162.40</b></td></tr></table>\n<p><b>ROI</b> = (270,000 − 250,000) / 250,000 = 20,000 / 250,000 = <b>8.00%</b></p>\n<p><b>BEP:</b> the cumulative first becomes positive in <b>Year 3</b>. Negative years before it (not counting Year 0): Years 1 and 2 = 2. BEP = 2 + (40,000 − 20,000) / 40,000 = 2 + 0.5 = <b>2.50 years</b>.</p>\n<p><b>NPV</b> = 245,092.32 − 236,162.40 = <b>$8,929.92 &gt; 0</b> → the project is economically acceptable.</p>"
  },
  "check": [
   {
    "q": "Which two lectures did Quiz 1 test?",
    "a": "W1b (methodology diagrams) and W3 (economic feasibility: ROI, BEP, NPV). Not the W4 topic of that day."
   },
   {
    "q": "In which year do you put 'User training' and 'Software upgrades'?",
    "a": "Every year, Years 1–3. They are <b>operational</b> costs, not development costs."
   },
   {
    "q": "Do you discount the Year 0 development cost when you compute PV?",
    "a": "No. Year 0 money is already 'today's money', so it stays the same: (1 + r)<sup>0</sup> = 1. Year 0 is <b>not discounted</b>."
   },
   {
    "q": "In V2 the cumulative is (40,000) in Year 1 and 30,000 in Year 2, net 70,000 per year. What is the BEP?",
    "a": "1 + (70,000 − 30,000) / 70,000 = 1 + 0.57 = <b>1.57 years</b>."
   },
   {
    "q": "Which methodology was asked in two versions, and is it Structured or RAD?",
    "a": "<b>Phased</b> development (V1 and V4). It is a <b>RAD</b> methodology. Parallel and Waterfall are Structured."
   }
  ],
  "exam": {
   "question": "<p><b>(Quiz 1, Version 3, S4.)</b> (a) Depict graphically: Parallel development methodology. (b) Development: Office space and equipment $40,000; Vendor installation $50,000; Data conversion tools $30,000. Operational: Software upgrades $20,000; Operational team salaries $10,000; User training $10,000. Tangible benefits: Increased sales $60,000; Reduction in staff $40,000; Better supplier prices $30,000. Find ROI, BEP and NPV, if project life cycle is 3 years and rate of return = 15%.</p>",
   "answer": "<p><b>(a)</b> Draw the picture below: one general design, then 3 subprojects (Design → Implementation, in dotted ellipses) running in parallel, then Integration → System. Add wavy back-arrows between boxes. Write: \"General design for the whole system, then subprojects designed and implemented in parallel, then integrated. Pro: shorter time to deliver. Con: system delivered only at the end.\"</p>\n<p><b>(b)</b> Assumption: development costs in Year 0; operational costs and benefits every year, Years 1–3.</p>\n<p>Development = 40,000 + 50,000 + 30,000 = 120,000. Operational = 20,000 + 10,000 + 10,000 = 40,000/yr. Benefits = 60,000 + 40,000 + 30,000 = 130,000/yr.</p>\n<table><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th><th>Total</th></tr>\n<tr><td>Total Benefits</td><td>0</td><td>130,000</td><td>130,000</td><td>130,000</td><td>390,000</td></tr>\n<tr><td>Total Costs</td><td>120,000</td><td>40,000</td><td>40,000</td><td>40,000</td><td>240,000</td></tr>\n<tr><td>Net Benefits</td><td>(120,000)</td><td>90,000</td><td>90,000</td><td>90,000</td><td>150,000</td></tr>\n<tr><td>Cumulative</td><td>(120,000)</td><td>(30,000)</td><td>60,000</td><td>150,000</td><td></td></tr>\n<tr><td>PV of Benefits (÷1.15<sup>n</sup>)</td><td>0</td><td>113,043.48</td><td>98,298.68</td><td>85,477.11</td><td>296,819.27</td></tr>\n<tr><td>PV of Costs</td><td>120,000.00</td><td>34,782.61</td><td>30,245.75</td><td>26,300.65</td><td>211,329.00</td></tr></table>\n<p><b>ROI</b> = 150,000 / 240,000 = <b>62.50%</b>. <b>BEP</b> = 1 + (90,000 − 60,000) / 90,000 = <b>1.33 years</b>. <b>NPV</b> = 296,819.27 − 211,329.00 = <b>$85,490.26 &gt; 0</b> → economically acceptable.</p>",
   "diagram": "flowchart LR\n  P[Planning] --> A[Analysis] --> G[\"Design: general\"]\n  G --> D1[\"Design 1\"] --> I1[\"Implementation 1\"]\n  G --> D2[\"Design 2\"] --> I2[\"Implementation 2\"]\n  G --> D3[\"Design 3\"] --> I3[\"Implementation 3\"]\n  I1 --> N[Integration]\n  I2 --> N\n  I3 --> N\n  N --> S([System])"
  },
  "memorize": [
   "Quiz 1 = Part A draw a methodology + Part B ROI, BEP, NPV",
   "V1 Phased 5% · V2 Waterfall 10% · V3 Parallel 15% · V4 Phased 20%",
   "Development → Year 0 only; operational + benefits → every year",
   "ROI = (B − C) / C on totals; BEP: don't count Year 0; NPV: don't discount Year 0",
   "NPV &gt; 0 → economically acceptable"
  ],
  "note": "Detailed drawing lessons for Waterfall, Parallel and Phased are in the W1b lessons; the full money method is in the W3 lessons."
 },
 {
  "id": "W4-2",
  "label": "W4·2",
  "week": "W4",
  "slides": [
   6,
   7,
   8,
   9,
   10,
   11,
   12,
   13
  ],
  "kind": "theory",
  "title": "Choosing projects and running them: classify, select, 5 stages, tasks",
  "hook": "After this lesson you can define project management, list the 7 ways to classify a project, the 4 selection steps, the 5 process stages, and what information describes one task.",
  "cards": [
   {
    "h": "Why we need project management",
    "body": "<p>Think of the IT department of a big university. Everyone wants a new system: course registration, a library app, a dorm portal. There are <b>more requests than people and money</b>.</p>\n<p>The slide says exactly this: demand for IT projects \"far exceeds\" what the department can supply. The CIO must choose projects with the <b>highest return</b> while managing <b>risk</b>. One study (AMR Research) found <b>2–15%</b> of IT projects are not even strategic. So the department must prioritize, select and manage its <b>portfolio</b> of projects.</p>\n<p><b>Project management</b> = \"the process of planning and controlling the project within a specified time frame, at minimum cost, with the desired outcomes\". The <b>project manager</b> coordinates hundreds of tasks. It is a real profession: the <b>PMP</b> certificate from the Project Management Institute (PMI).</p>\n<p><b>Where we are (S6):</b> in the Planning phase, W3 finished the first half (system request + feasibility). W4 starts the second half: estimate time, identify tasks, WBS, PERT and Gantt charts, manage scope, assess risk.</p>"
   },
   {
    "h": "7 ways to classify a project (S8)",
    "body": "<table><tr><th>Way</th><th>The question it asks</th></tr>\n<tr><td><b>Size</b></td><td>How many people are needed?</td></tr>\n<tr><td><b>Cost</b></td><td>How much will it cost the organization?</td></tr>\n<tr><td><b>Purpose</b></td><td>Improve the technical infrastructure? Support a current business strategy? Improve operations? Demonstrate a new innovation?</td></tr>\n<tr><td><b>Length</b></td><td>How long until it is finished, and until value reaches the business?</td></tr>\n<tr><td><b>Risk</b></td><td>How likely is it to succeed or fail?</td></tr>\n<tr><td><b>Scope</b></td><td>How much of the organization is affected: a department, a division, the whole corporation?</td></tr>\n<tr><td><b>Return on investment</b></td><td>How much money comes back for what it costs?</td></tr></table>\n<p>Memory aid: \"<b>S</b>ome <b>C</b>ats <b>P</b>urr <b>L</b>oudly, <b>R</b>arely <b>S</b>cratching <b>O</b>wners\" = Size, Cost, Purpose, Length, Risk, Scope, ROI.</p>"
   },
   {
    "h": "4 steps to select a project (S9)",
    "body": "<p>The slide is a picture of 4 circles, left to right. It gives no details, just the names:</p>\n<ol><li><b>Identify</b> potential projects</li><li><b>Compare</b> the projects</li><li><b>Analyze</b> your findings</li><li><b>Select</b> a project</li></ol>\n<p>Link: in step 2 you compare projects using the 7 classification questions (cost, risk, ROI…). Memory aid: <b>I-C-A-S</b>.</p>",
    "diagram": "flowchart LR\n  A[\"1. Identify potential projects\"] --> B[\"2. Compare the projects\"]\n  B --> C[\"3. Analyze your findings\"]\n  C --> D[\"4. Select a project\"]"
   },
   {
    "h": "The 5 stages of the project management process (S10)",
    "body": "<table><tr><th>Stage</th><th>What happens</th></tr>\n<tr><td>1. <b>Initiation</b></td><td>Define purpose, scope, objectives; identify key stakeholders; create the <b>project charter</b></td></tr>\n<tr><td>2. <b>Planning</b></td><td>Create the project plan; create the <b>WBS</b>; develop a <b>risk management strategy</b></td></tr>\n<tr><td>3. <b>Execution</b></td><td>Start working; build workflows; assign tasks; keep everyone in the loop</td></tr>\n<tr><td>4. <b>Monitoring &amp; Controlling</b></td><td>Regular reviews; monitor progress against KPIs; apply changes when needed</td></tr>\n<tr><td>5. <b>Closure</b></td><td>Complete deliverables; discuss failures and successes; document <b>lessons learned</b></td></tr></table>\n<p>Exam trap: the <b>WBS</b> and the <b>risk strategy</b> belong to stage 2, Planning. The <b>charter</b> belongs to stage 1, Initiation.</p>",
    "diagram": "flowchart LR\n  I([Initiation]) --> P([Planning]) --> E([Execution]) --> M([\"Monitoring and Controlling\"]) --> C([Closure])\n  M -.->|changes| E"
   },
   {
    "h": "The 3 tools, and what a task is (S11–S13)",
    "body": "<p>The <b>3 traditional project management tools</b>: a <b>work breakdown structure</b> (WBS), a <b>Gantt chart</b>, and a <b>network diagram</b> (PERT and CPM). They help you list all tasks, their order, and how long each takes. (Next lesson teaches all three.)</p>\n<p>A <b>task</b> = \"a unit of work that will be performed by a member or members of the development team, such as feasibility analysis\". The slide describes a task with <b>10 pieces of information</b>:</p>\n<table><tr><th>Information</th><th>Slide example</th></tr>\n<tr><td>Name</td><td>Perform economic feasibility</td></tr>\n<tr><td>Start date / Completion date</td><td>Jan 05 / Jan 19, 2010</td></tr>\n<tr><td>Person assigned</td><td>Project sponsor: Mary Smith</td></tr>\n<tr><td>Deliverable(s)</td><td>Cost–benefit analysis</td></tr>\n<tr><td>Completion status</td><td>Open</td></tr>\n<tr><td>Priority</td><td>High</td></tr>\n<tr><td>Resources needed</td><td>Spreadsheet software</td></tr>\n<tr><td>Estimated time / Actual time</td><td>16 hours / 14.5 hours</td></tr></table>"
   }
  ],
  "example": {
   "problem": "<p>A Tashkent café chain wants an online ordering app for its 12 cafés. 5 developers, $60,000, about 6 months. It should raise sales. Classify this project using the 7 ways from S8.</p>",
   "solution": "<ul><li><b>Size:</b> small/medium team, 5 people.</li>\n<li><b>Cost:</b> $60,000.</li>\n<li><b>Purpose:</b> support a business strategy (more online sales) and improve operations.</li>\n<li><b>Length:</b> about 6 months; value comes when the app goes live.</li>\n<li><b>Risk:</b> moderate (new technology for the staff, customers must adopt the app).</li>\n<li><b>Scope:</b> the whole company (all 12 cafés), not one department.</li>\n<li><b>ROI:</b> compare the extra sales with the $60,000 (the W3 method).</li></ul>"
  },
  "check": [
   {
    "q": "Give the slide's definition of project management.",
    "a": "The process of planning and controlling the project within a specified time frame, at minimum cost, with the desired outcomes."
   },
   {
    "q": "List the 7 ways to classify projects.",
    "a": "Size, Cost, Purpose, Length, Risk, Scope, Return on investment."
   },
   {
    "q": "In which stage of the PM process do you create the WBS? And the project charter?",
    "a": "WBS: stage 2, <b>Planning</b>. Project charter: stage 1, <b>Initiation</b>."
   },
   {
    "q": "What are the 3 traditional project management tools?",
    "a": "Work breakdown structure, Gantt chart, network diagram."
   },
   {
    "q": "In the S13 example, was the task finished faster or slower than estimated?",
    "a": "Faster: estimated 16 hours, actual 14.5 hours (1.5 hours under)."
   }
  ],
  "exam": {
   "question": "<p>Name and briefly describe the five stages of the project management process.</p>",
   "answer": "<ol><li><b>Initiation:</b> define purpose, scope and objectives, find key stakeholders, create the project charter.</li>\n<li><b>Planning:</b> make the project plan, the work breakdown structure and a risk management strategy.</li>\n<li><b>Execution:</b> start the work, build workflows, assign tasks, keep everyone informed.</li>\n<li><b>Monitoring and controlling:</b> regular reviews, check progress against KPIs, apply changes.</li>\n<li><b>Closure:</b> complete the deliverables, discuss failures and successes, document lessons learned.</li></ol>"
  },
  "memorize": [
   "PM = planning and controlling within a time frame, at minimum cost, with desired outcomes",
   "7 ways: Size, Cost, Purpose, Length, Risk, Scope, ROI",
   "Select: Identify → Compare → Analyze → Select",
   "5 stages: Initiation → Planning → Execution → Monitoring &amp; Controlling → Closure",
   "3 tools: WBS, Gantt chart, network diagram",
   "Task = a unit of work done by team member(s)"
  ]
 },
 {
  "id": "W4-3",
  "label": "W4·3",
  "week": "W4",
  "slides": [
   14,
   15,
   16,
   17,
   18,
   19,
   20,
   21,
   22,
   23,
   24,
   25
  ],
  "kind": "calculation",
  "title": "WBS → Gantt chart → network diagram → critical path",
  "hook": "After this lesson you can build a WBS, draw a Gantt chart and a network diagram, compute PERT estimates, and find the critical path and the total project duration with a forward pass.",
  "cards": [
   {
    "h": "The big chain: from tasks to pictures",
    "body": "<p>Imagine you organise a wedding. First you write down every job and how long it takes. Then you group the jobs. Then you draw them on a calendar so everyone sees the plan.</p>\n<p>A project manager does the same (S14):</p>\n<ol><li><b>Identify the tasks</b> and how long each one takes.</li>\n<li>Organise them in a <b>work breakdown structure (WBS)</b>.</li>\n<li>The WBS <b>drives</b> two pictures: the <b>Gantt chart</b> and the <b>network diagram</b>.</li>\n<li>Use the pictures to manage progress over time.</li></ol>",
    "diagram": "flowchart LR\n  T[\"Identify tasks and durations\"] --> W[\"WBS: numbered list\"]\n  W --> G[\"Gantt chart: bars on a calendar\"]\n  W --> N[\"Network diagram: boxes and arrows\"]\n  N --> C[\"CPM: critical path\"]"
   },
   {
    "h": "Work breakdown structure (WBS)",
    "body": "<p>A <b>WBS</b> is \"a list of tasks hierarchically numbered\". You build it <b>top-down</b>: first the big tasks, then break each into subtasks (task 7 → 7.1, 7.2 → 7.2.1…).</p>\n<p>At a minimum a WBS must show <b>D-S-D</b>: <b>Duration</b>, <b>Status</b> (open / in progress / complete) and <b>Dependencies</b> (a task that cannot start until another one finishes).</p>\n<p>The class example: \"implement a new IT training class\" (S15–S16):</p>\n<table><tr><th>No.</th><th>Task</th><th>Weeks</th><th>Depends on</th><th>Status</th></tr>\n<tr><td>1</td><td>Identify vendors</td><td>2</td><td></td><td>Complete</td></tr>\n<tr><td>2</td><td>Review training materials</td><td>6</td><td>1*</td><td>Complete</td></tr>\n<tr><td>3</td><td>Compare vendors</td><td>2</td><td>2</td><td>In progress</td></tr>\n<tr><td>4</td><td>Negotiate with vendors</td><td>3</td><td>3</td><td>Open</td></tr>\n<tr><td>5</td><td>Develop communications information</td><td>4</td><td>1</td><td>In progress</td></tr>\n<tr><td>6</td><td>Disseminate information</td><td>2</td><td>5</td><td>Open</td></tr>\n<tr><td>7</td><td>Create and administer survey (7.1–7.8)</td><td>4</td><td>6</td><td>Open</td></tr>\n<tr><td>8</td><td>Analyze results and choose vendor</td><td>2</td><td>4, 7</td><td>Open</td></tr>\n<tr><td>9</td><td>Build new classrooms</td><td>11</td><td>1</td><td>In progress</td></tr>\n<tr><td>10</td><td>Develop course options</td><td>3</td><td>8, 9</td><td>Open</td></tr></table>\n<p>* Small slide mismatch: the WBS says task 2 depends on 1, but the Gantt chart (S20) and network diagram (S23) start task 2 on day 1 with no predecessor. Use the network diagram for the critical path.</p>"
   },
   {
    "h": "Gantt chart: the WBS as bars",
    "body": "<p>A <b>Gantt chart</b> is \"a horizontal bar chart that shows the same task information as the project WBS but in a graphical way\". It shows the high-level status <b>faster</b> than the WBS.</p>\n<ul><li>Tasks are <b>rows</b>; <b>time runs across the top</b> (hours or days for a short project, weeks or months for a medium one).</li>\n<li>Each <b>bar</b> starts and ends exactly when the task starts and ends.</li>\n<li>Bars are <b>filled in proportionally</b> as work is done.</li>\n<li><b>Arrows</b> between bars = dependencies. <b>Upside-down triangles or diamonds</b> = milestones. <b>Names</b> next to bars = people assigned.</li>\n<li>Keep it to about <b>20–30 tasks</b>; more → make sub-charts.</li>\n<li>Tools: a spreadsheet, Visio, SmartDraw, or a PM package (like Jira).</li></ul>\n<p>Below is the class example. Red = critical tasks, grey = done, the diamond = the \"Budget meeting\" milestone. Slide typo: S20 says task 4 ends \"3/8/12\"; it should be <b>3/18/12</b> (3 weeks after 2/26).</p>",
    "diagram": "gantt\n  title IT training class (S20, S23) in weeks\n  dateFormat YYYY-MM-DD\n  axisFormat %d %b\n  todayMarker off\n  section Vendors\n  1 Identify vendors :crit, done, t1, 2012-01-01, 14d\n  2 Review training materials :done, t2, 2012-01-01, 42d\n  3 Compare vendors :t3, after t2, 14d\n  4 Negotiate with vendors :t4, after t3, 21d\n  section Survey\n  5 Develop communications info :crit, active, t5, after t1, 28d\n  6 Disseminate information :crit, t6, after t5, 14d\n  7 Create and administer survey :crit, t7, after t6, 28d\n  section Finish\n  9 Build new classrooms :active, t9, after t1, 77d\n  8 Analyze results and choose vendor :crit, t8, after t4 t7, 14d\n  10 Develop course options :crit, t10, after t8 t9, 21d\n  Budget meeting :milestone, m1, 2012-01-15, 0d"
   },
   {
    "h": "Network diagram: boxes and arrows",
    "body": "<p>The <b>network diagram</b> lays out the tasks as a <b>flowchart</b>. It is \"a node-and-arc type of graph that shows time estimates in the nodes and task dependencies on the arcs\".</p>\n<ul><li><b>Node</b> (box) = one task: name, ID, duration, start and finish dates.</li>\n<li><b>Arc</b> (arrow) = a dependency between two tasks.</li>\n<li><b>One diagonal line</b> through a node = task <b>partially completed</b>.</li>\n<li><b>Crossed lines</b> (an X) = task <b>completed</b>.</li>\n<li><b>Critical tasks</b> get a special border (double/thick).</li></ul>\n<p>In the class figure: tasks 1, 2 and 11 are crossed (done); 5 and 9 have one diagonal (partly done). The thick boxes below are the critical path.</p>",
    "diagram": "flowchart LR\n  N1[\"1 Identify vendors<br/>2 wks · done\"] --> N5[\"5 Develop comms info<br/>4 wks · partly done\"]\n  N1 --> N9[\"9 Build classrooms<br/>11 wks · partly done\"]\n  N2[\"2 Review materials<br/>6 wks · done\"] --> N3[\"3 Compare vendors<br/>2 wks\"]\n  N3 --> N4[\"4 Negotiate<br/>3 wks\"]\n  N5 ==> N6[\"6 Disseminate info<br/>2 wks\"]\n  N6 ==> N7[\"7 Survey<br/>4 wks\"]\n  N7 ==> N8[\"8 Analyze and choose<br/>2 wks\"]\n  N4 --> N8\n  N8 ==> N10[\"10 Course options<br/>3 wks\"]\n  N9 -.-> N10\n  classDef crit stroke-width:4px\n  class N1,N5,N6,N7,N8,N10 crit"
   },
   {
    "h": "PERT: when you are not sure about the time",
    "body": "<p>Sometimes you really don't know how long a task will take. <b>PERT</b> (Program Evaluation and Review Technique) is used \"when the individual task time estimates are fairly uncertain\".</p>\n<p>Instead of one number, you give <b>three</b>: <b>optimistic</b> (o), <b>most likely</b> (m) and <b>pessimistic</b> (p). Then:</p>\n<p><b>PERT estimate = (o + 4 × m + p) / 6</b></p>\n<p>Example: o = 2, m = 4, p = 12 weeks → (2 + 16 + 12) / 6 = 30 / 6 = <b>5 weeks</b>. The most likely value counts 4 times; the weights 1 + 4 + 1 = 6.</p>\n<p>\"CPM can be used <b>with or without</b> PERT\": you can put PERT estimates into the network and then find the critical path.</p>"
   },
   {
    "h": "CPM: the critical path is the LONGEST path",
    "body": "<p>The <b>critical path</b> is \"the longest path from the project inception to completion\". Every task on it must finish on time, or <b>the whole project is late</b>. Why the longest? Because the project cannot finish before its slowest chain of tasks.</p>\n<p><b>Method 1, list every path</b> (class example, weeks):</p>\n<table><tr><th>Path</th><th>Sum</th><th>Total</th></tr>\n<tr><td>1 → 5 → 6 → 7 → 8 → 10</td><td>2 + 4 + 2 + 4 + 2 + 3</td><td><b>17 ← critical</b></td></tr>\n<tr><td>1 → 9 → 10</td><td>2 + 11 + 3</td><td>16</td></tr>\n<tr><td>2 → 3 → 4 → 8 → 10</td><td>6 + 2 + 3 + 2 + 3</td><td>16</td></tr></table>\n<p>So the project takes <b>17 weeks</b> (Wed 1/1 to Tue 4/29/12). The slide marks tasks <b>5, 6, 7, 8, 10</b> with double borders. Task 1 is on the path too, but it is already complete, so it is not marked.</p>\n<p>The other paths have <b>1 week spare</b> (17 − 16). (The textbook word for spare time is \"slack\" or \"float\"; it is not on the slides.)</p>"
   },
   {
    "h": "Method 2: the forward pass (safest for big networks)",
    "body": "<p>Listing paths gets messy when there are many arrows. The <b>forward pass</b> always works:</p>\n<ol><li>Tasks with no predecessor: <b>ES</b> (earliest start) = 0.</li>\n<li><b>EF</b> (earliest finish) = ES + duration.</li>\n<li>For a task with predecessors: ES = the <b>biggest</b> EF among its predecessors (you must wait for the slowest one).</li>\n<li><b>Project duration</b> = the biggest EF of all.</li>\n<li>Walk back from the end through the predecessor that gave the biggest EF: that is the critical path.</li></ol>\n<table><tr><th>Task</th><th>Dur</th><th>Pred.</th><th>ES</th><th>EF</th></tr>\n<tr><td>1</td><td>2</td><td>–</td><td>0</td><td>2</td></tr>\n<tr><td>2</td><td>6</td><td>–</td><td>0</td><td>6</td></tr>\n<tr><td>3</td><td>2</td><td>2</td><td>6</td><td>8</td></tr>\n<tr><td>4</td><td>3</td><td>3</td><td>8</td><td>11</td></tr>\n<tr><td>5</td><td>4</td><td>1</td><td>2</td><td>6</td></tr>\n<tr><td>6</td><td>2</td><td>5</td><td>6</td><td>8</td></tr>\n<tr><td>7</td><td>4</td><td>6</td><td>8</td><td>12</td></tr>\n<tr><td>8</td><td>2</td><td>4, 7</td><td>max(11, 12) = 12</td><td>14</td></tr>\n<tr><td>9</td><td>11</td><td>1</td><td>2</td><td>13</td></tr>\n<tr><td>10</td><td>3</td><td>8, 9</td><td>max(14, 13) = 14</td><td><b>17</b></td></tr></table>\n<p>Walk back: 10 ← 8 (14) ← 7 (12) ← 6 ← 5 ← 1. Critical path 1 → 5 → 6 → 7 → 8 → 10 = <b>17 weeks</b>. Same answer as Method 1 ✓.</p>"
   }
  ],
  "example": {
   "problem": "<p><b>Replacing the student-registration system</b> (durations in weeks).</p>\n<table><tr><th>Task</th><th>Name</th><th>Weeks</th><th>Depends on</th></tr>\n<tr><td>A</td><td>Interview users</td><td>3</td><td>–</td></tr>\n<tr><td>B</td><td>Review existing documents</td><td>2</td><td>–</td></tr>\n<tr><td>C</td><td>Write requirements definition</td><td>2</td><td>A, B</td></tr>\n<tr><td>D</td><td>Select vendor</td><td>4</td><td>B</td></tr>\n<tr><td>E</td><td>Design database</td><td>3</td><td>C</td></tr>\n<tr><td>F</td><td>Build interfaces</td><td>5</td><td>C, D</td></tr>\n<tr><td>G</td><td>Test system</td><td>2</td><td>E, F</td></tr>\n<tr><td>H</td><td>Train users</td><td>1</td><td>G</td></tr></table>\n<p>(a) Draw the network diagram. (b) Do the forward pass. (c) Give the critical path and the total duration. (d) How much spare time do A, C and E have?</p>",
   "solution": "<p><b>(a)</b> See the diagram: one box per task, one arrow per dependency. Thick boxes = critical.</p>\n<p><b>(b) Forward pass</b> (ES = biggest EF of predecessors, EF = ES + duration):</p>\n<table><tr><th>Task</th><th>Dur</th><th>Pred.</th><th>ES</th><th>EF</th></tr>\n<tr><td>A</td><td>3</td><td>–</td><td>0</td><td>3</td></tr>\n<tr><td>B</td><td>2</td><td>–</td><td>0</td><td>2</td></tr>\n<tr><td>C</td><td>2</td><td>A, B</td><td>max(3, 2) = 3</td><td>5</td></tr>\n<tr><td>D</td><td>4</td><td>B</td><td>2</td><td>6</td></tr>\n<tr><td>E</td><td>3</td><td>C</td><td>5</td><td>8</td></tr>\n<tr><td>F</td><td>5</td><td>C, D</td><td>max(5, 6) = 6</td><td>11</td></tr>\n<tr><td>G</td><td>2</td><td>E, F</td><td>max(8, 11) = 11</td><td>13</td></tr>\n<tr><td>H</td><td>1</td><td>G</td><td>13</td><td><b>14</b></td></tr></table>\n<p><b>(c)</b> Walk back: H ← G ← F (11, bigger than E's 8) ← D (6, bigger than C's 5) ← B. <b>Critical path B → D → F → G → H = 2 + 4 + 5 + 2 + 1 = 14 weeks.</b></p>\n<p>Check by listing all paths: A-C-E-G-H = 11, A-C-F-G-H = 13, B-C-E-G-H = 10, B-C-F-G-H = 12, <b>B-D-F-G-H = 14</b> ✓ (longest).</p>\n<p><b>(d) Spare time</b> = 14 − the longest path through that task: A → longest path 13 → <b>1 week</b>; C → 13 → <b>1 week</b>; E → 11 → <b>3 weeks</b>. (Verified with python: latest start − earliest start gives the same values.)</p>",
   "diagram": "flowchart LR\n  ST((Start)) --> A[\"A Interview users<br/>3 wks\"]\n  ST --> B[\"B Review documents<br/>2 wks\"]\n  A --> C[\"C Requirements<br/>2 wks\"]\n  B --> C\n  B ==> D[\"D Select vendor<br/>4 wks\"]\n  C --> E[\"E Design database<br/>3 wks\"]\n  C --> F[\"F Build interfaces<br/>5 wks\"]\n  D ==> F\n  E --> G[\"G Test system<br/>2 wks\"]\n  F ==> G\n  G ==> H[\"H Train users<br/>1 wk\"]\n  H --> FN((Finish))\n  classDef crit stroke-width:4px\n  class B,D,F,G,H crit"
  },
  "check": [
   {
    "q": "What three things must a WBS show at a minimum?",
    "a": "Duration, current status, and task dependencies (D-S-D)."
   },
   {
    "q": "On a network diagram, what do one diagonal line and crossed lines mean?",
    "a": "One diagonal line = task partially completed. Crossed lines = task completed."
   },
   {
    "q": "On a Gantt chart, how is a milestone shown?",
    "a": "With an upside-down triangle or a diamond."
   },
   {
    "q": "A task has o = 3, m = 5, p = 13 days. What is its PERT estimate?",
    "a": "(3 + 4 × 5 + 13) / 6 = 36 / 6 = <b>6 days</b>."
   },
   {
    "q": "Is the critical path the shortest or the longest path? Why?",
    "a": "The <b>longest</b>. The project cannot finish before its longest chain of dependent tasks, so any delay there delays the whole project."
   },
   {
    "q": "In the registration example, what happens if E takes 2 weeks longer? If D takes 1 week longer?",
    "a": "E + 2: its longest path becomes 13, still under 14, so the end date does not change. D + 1: the critical path becomes 15, so the project ends <b>1 week later</b>."
   }
  ],
  "exam": {
   "question": "<p>The café ordering app has these tasks (weeks): A Gather requirements 3 (–); B Design screens 2 (A); C Design database 4 (A); D Build front end 5 (B); E Build back end 2 (C); F Integrate and test 2 (D, E); G Train staff 1 (F). Draw the network diagram and the Gantt chart, find the critical path and the total duration, and say which tasks can slip and by how much.</p>",
   "answer": "<p><b>Network:</b> A → B → D → F → G and A → C → E → F (F waits for both D and E).</p>\n<p><b>Forward pass:</b></p>\n<table><tr><th>Task</th><th>Dur</th><th>Pred.</th><th>ES</th><th>EF</th></tr>\n<tr><td>A</td><td>3</td><td>–</td><td>0</td><td>3</td></tr>\n<tr><td>B</td><td>2</td><td>A</td><td>3</td><td>5</td></tr>\n<tr><td>C</td><td>4</td><td>A</td><td>3</td><td>7</td></tr>\n<tr><td>D</td><td>5</td><td>B</td><td>5</td><td>10</td></tr>\n<tr><td>E</td><td>2</td><td>C</td><td>7</td><td>9</td></tr>\n<tr><td>F</td><td>2</td><td>D, E</td><td>max(10, 9) = 10</td><td>12</td></tr>\n<tr><td>G</td><td>1</td><td>F</td><td>12</td><td><b>13</b></td></tr></table>\n<p><b>Paths:</b> A-B-D-F-G = 3 + 2 + 5 + 2 + 1 = <b>13</b>; A-C-E-F-G = 3 + 4 + 2 + 2 + 1 = 12.</p>\n<p><b>Critical path: A → B → D → F → G, total duration 13 weeks.</b> Mark A, B, D, F, G with a double border. <b>C and E</b> are not critical: together they can slip <b>1 week</b> (13 − 12) without delaying the project.</p>",
   "diagram": "gantt\n  title Cafe ordering app, earliest start, in weeks\n  dateFormat YYYY-MM-DD\n  axisFormat %d %b\n  todayMarker off\n  section Plan\n  A Gather requirements :crit, a, 2026-11-02, 21d\n  section Front end\n  B Design screens :crit, b, after a, 14d\n  D Build front end :crit, d, after b, 35d\n  section Back end\n  C Design database :c, after a, 28d\n  E Build back end :e, after c, 14d\n  section Finish\n  F Integrate and test :crit, f, after d e, 14d\n  G Train staff :crit, g, after f, 7d\n  Go live :milestone, m1, after g, 0d"
  },
  "memorize": [
   "Tasks → WBS → Gantt chart + network diagram",
   "WBS minimum: Duration, Status, Dependencies; built top-down, numbered 7 → 7.1 → 7.2.1",
   "Gantt: rows = tasks, time across the top, filled bars = progress, ◆/▼ = milestone, arrows = dependencies, ~20–30 tasks",
   "Network: node = task, arc = dependency; one diagonal = partial, crossed = complete",
   "PERT = (o + 4m + p) / 6, for uncertain estimates",
   "Critical path = LONGEST path; class example 1-5-6-7-8-10 = 17 weeks",
   "Forward pass: ES = max EF of predecessors; EF = ES + duration"
  ],
  "note": "Slide errors: S20 task 4 finish '3/8/12' should be 3/18/12; S15 gives task 2 the dependency '1' but S20/S23 show none; S16 says task 7 = 4 weeks although its subtasks chain to 4.5 weeks (quote 4 if asked); S25 marks 5, 6, 7, 8, 10 as critical, but completed task 1 is on the critical path too. 'Forward pass', 'ES/EF' and 'slack' are textbook terms, not on the slides; on the exam also list the paths (the slide's own method)."
 },
 {
  "id": "W4-4",
  "label": "W4·4",
  "week": "W4",
  "slides": [
   26,
   27,
   28,
   29,
   30,
   31,
   32,
   36,
   37,
   38,
   39,
   40,
   41
  ],
  "kind": "theory",
  "title": "Estimating time and keeping the plan honest: trade-offs, workplans, hurricane model, missed dates",
  "hook": "After this lesson you can explain the functionality-time-cost trade-off, the 3 problems of WBSs, use the hurricane model's ±100% / ±25% rule, and choose what to do when a schedule date is missed.",
  "cards": [
   {
    "h": "The three levers: functionality, time, cost",
    "body": "<p>You order a wedding cake. You want it <b>big</b>, <b>tomorrow</b> and <b>cheap</b>. You can usually get only two. Pull one lever and the others move.</p>\n<p>The slide: \"The science (or art) of project management is in making <b>trade-offs</b> among three important concepts: the <b>functionality</b> of the system, the <b>time</b> to complete the project, and the <b>cost</b> of the project.\" The manager estimates each lever at the start and then keeps re-assessing.</p>\n<p><b>Estimation</b> = \"the process of assigning projected values for time and effort\".</p>\n<p><b>Where the numbers come from (S27):</b> projects with similar tasks and technologies, or experienced developers. Keep them <b>conservative</b>. Record the <b>actual</b> time and effort, so the next project uses real data. \"Most accurate estimates come from experience.\"</p>\n<p>His review MCQ (W5a-S2): \"making ___ of size, time and cost\" → <b>Trade-offs</b>.</p>",
    "diagram": "flowchart LR\n  F([Functionality]) <--> T([Time])\n  T <--> C([Cost])\n  C <--> F"
   },
   {
    "h": "The workplan, and why it must grow step by step",
    "body": "<p>A <b>workplan</b> = \"a dynamic schedule that records and keeps track of all the tasks that need to be accomplished over the course of the project\" (also: \"a dynamic and sequential list of all tasks\").</p>\n<p><b>Two ways to build it:</b> modify the plan of an existing or completed project, or derive the tasks from the methodology you use.</p>\n<p><b>Agile / object-oriented projects</b> are <b>iterative and incremental</b>, so the workplan must also be <b>iterative and incremental</b>: tasks and time intervals follow the phases, with different tasks for each workflow. This is called an <b>evolutionary WBS</b> and an <b>iterative workplan</b> (S29).</p>"
   },
   {
    "h": "The 3 problems of a traditional WBS (S30–S32)",
    "body": "<table><tr><th>#</th><th>Problem</th><th>Why it hurts</th></tr>\n<tr><td>1</td><td>Focused on the <b>design</b> of the system: it \"forces the premature decomposition\" of the design</td><td>If the problem is not well understood, you must fix the architecture <b>before</b> you understand the requirements</td></tr>\n<tr><td>2</td><td><b>Wrong level of detail</b>: too many levels too early on large projects, too few on small ones</td><td>The WBS must be complete at the start for cost and schedule estimates, so estimates are \"wildly inaccurate\"</td></tr>\n<tr><td>3</td><td><b>Project-specific</b>, so hard to <b>compare across projects</b></td><td>Managers can't learn from each other: they \"reinvent the wheel\" and repeat old mistakes</td></tr></table>\n<p>Memory aid: <b>D-D-C</b> = Design focus, Detail level, Comparison.</p>"
   },
   {
    "h": "Refining estimates: the hurricane model",
    "body": "<p>Weather forecasters see a new storm far away. With little information (but lots of data on old storms) they predict where it will hit. Their forecast \"cone\" is wide at first and gets narrower as the storm comes closer.</p>\n<p>Project estimates work the same way. At the start you can only give <b>broad ranges</b>; they become <b>more specific</b> as the product becomes better defined. This is normal, not bad work.</p>\n<p><b>The numbers (S37):</b> a well-done plan at the <b>end of inception</b> has a <b>100% margin of error for cost</b> and a <b>25% margin of error for schedule</b>.</p>\n<p><b>The chart (S38):</b> x-axis = stage when the estimate is made (Inception → Elaboration → Construction → Transition); y-axis = schedule time; circle size = estimated cost. The cones get <b>narrower</b> at each stage.</p>\n<p><b>His question (W5a-S3, Micah):</b> plan says $50,000 and 20 weeks → cost $0 to $100,000 (±50,000), schedule 15 to 25 weeks (±5).</p>",
    "diagram": "flowchart LR\n  I[\"Inception: very wide range\"] --> E[\"Elaboration: narrower\"]\n  E --> C[\"Construction: narrower still\"]\n  C --> T[\"Transition: almost exact\"]"
   },
   {
    "h": "Ahead or behind schedule? (S39–S41)",
    "body": "<p><b>Ahead of schedule:</b> move the next deadlines sooner by the same amount, but do <b>not</b> change the promised completion date.</p>\n<p><b>Behind schedule</b> (you missed a date): 3 possible actions.</p>\n<table><tr><th>If you assume the rest of the project is…</th><th>Action</th><th>Risk</th></tr>\n<tr><td>simpler than the late part AND simpler than first believed → you can make up the time</td><td><b>Do not change the schedule</b></td><td><b>High</b></td></tr>\n<tr><td>simpler than the late part, no more complex than first estimated → you can't make up the time, but won't lose more</td><td><b>Add the total time you are behind</b> to the whole schedule (2 weeks late → all dates +2 weeks). Padded time at the end may absorb it.</td><td><b>Moderate</b></td></tr>\n<tr><td><b>as complex as the late part</b> → the estimates were too optimistic</td><td><b>Add the same percentage</b> to all remaining estimates (2 weeks late on an 8-week part → +25%). If the sponsor can't accept the new date, <b>reduce the scope</b>.</td><td><b>Low</b></td></tr></table>\n<p>Pattern: the more <b>pessimistic</b> your assumption, the <b>lower</b> the risk.</p>"
   }
  ],
  "example": {
   "problem": "<p>A project was planned for 20 weeks. Analysis was planned for 4 weeks but took <b>5</b>. The remaining work is planned for 16 weeks. What is the new end date under each of the three actions?</p>",
   "solution": "<ul><li><b>High risk, do not change the schedule:</b> still promise week <b>20</b> (you hope to make up 1 week).</li>\n<li><b>Moderate risk, add the time you are behind:</b> 20 + 1 = week <b>21</b>.</li>\n<li><b>Low risk, add the same percentage:</b> % behind = weeks late ÷ <b>planned</b> weeks of the late part = 1 ÷ 4 = 25%. Remaining 16 × 1.25 = 20 weeks. New end = 5 + 20 = week <b>25</b>. If the sponsor can't accept week 25, reduce the scope.</li></ul>\n<p>(Checked with python: 1/4 = 0.25; 16 × 1.25 = 20; 5 + 20 = 25.)</p>"
  },
  "check": [
   {
    "q": "Fill in: \"The science (or art) of project management is in making ___ of size, time and cost.\" (W5a-S2)",
    "a": "<b>Trade-offs</b>."
   },
   {
    "q": "A plan at the end of inception says $80,000 and 12 weeks. What ranges does the hurricane model give?",
    "a": "Cost ±100%: <b>$0 to $160,000</b>. Schedule ±25%: <b>9 to 15 weeks</b>."
   },
   {
    "q": "Mya (W5a-S3): at the 6-week mark of a 9-week project she is 1 week behind. Best option?",
    "a": "\"About 16% behind, increase the project to about 10.5 weeks\": 1/6 ≈ 16.7%, and 9 × 1.167 ≈ 10.5 weeks (the low-risk percentage rule). Adding people or working longer days without changing the schedule are wrong."
   },
   {
    "q": "Which action when a date is missed has HIGH risk?",
    "a": "Do not change the schedule (you assume you can make up the lost time)."
   },
   {
    "q": "Give the 3 underlying problems of WBSs.",
    "a": "1) Focused on the system's design (premature decomposition). 2) Too many or too few levels of detail, so estimates are wildly inaccurate. 3) Project-specific, so hard to compare across projects."
   }
  ],
  "exam": {
   "question": "<p>(W5a-S3, Micah) A well-done project plan prepared at the end of the planning phase estimates the project at $50,000 and 20 weeks. According to the hurricane model, what is the realistic range?</p>",
   "answer": "<p>The hurricane model says a well-done plan at the end of inception has a <b>100% margin of error for cost</b> and a <b>25% margin of error for schedule</b>.</p>\n<p>Cost: 50,000 ± 100% × 50,000 = <b>$0 to $100,000</b>.</p>\n<p>Schedule: 20 ± 25% × 20 = 20 ± 5 = <b>15 to 25 weeks</b>.</p>\n<p>The ranges narrow as the project moves through elaboration, construction and transition.</p>"
  },
  "memorize": [
   "Trade-offs: functionality, time, cost",
   "Estimation = assigning projected values for time and effort",
   "Numbers: similar projects or experienced developers; conservative; record actuals",
   "WBS problems: design focus, wrong detail level, hard to compare",
   "Hurricane: ±100% cost, ±25% schedule (end of inception)",
   "Missed date: no change = high risk; add the weeks = moderate; add the % = low",
   "% behind = weeks late ÷ PLANNED weeks of the late part"
  ],
  "note": "The 4 stages on the hurricane chart (Inception, Elaboration, Construction, Transition) are not defined on any slide."
 },
 {
  "id": "W4-5",
  "label": "W4·5",
  "week": "W4",
  "slides": [
   33,
   34,
   35,
   42,
   43,
   44,
   45,
   46,
   47
  ],
  "kind": "theory",
  "title": "Scope creep, timeboxing, risk management and JIRA",
  "hook": "After this lesson you can explain scope creep and its causes, list the 5 scope techniques and the 6 timeboxing steps, fill in a risk assessment, and name JIRA's boards and issue types.",
  "cards": [
   {
    "h": "Scope creep: the #1 reason projects run late",
    "body": "<p>You build the café ordering app. Halfway through, the owner says: \"Can we also add a loyalty card? And delivery tracking?\" Each wish is small, but together they push the deadline and the budget.</p>\n<p><b>Scope creep</b> = \"new requirements are added to the project after the original project scope was defined and frozen\". It is \"the most common reason for schedule and cost overruns\", and it happens <b>after the project is under way</b>.</p>\n<p><b>3 causes (S33):</b></p>\n<ol><li><b>Users</b> suddenly see the system's potential and want new functions.</li>\n<li><b>Developers</b> discover interesting capabilities and get attached to them.</li>\n<li>A <b>senior manager</b> wants the system to support a new strategy from a board meeting.</li></ol>\n<p>It has a \"deleterious\" (harmful) effect on the schedule, and the <b>project manager</b> is responsible for managing changes to reduce it (S45).</p>"
   },
   {
    "h": "5 techniques to manage scope (S45)",
    "body": "<ol><li><b>Identify all requirements at the outset</b> (at the start).</li>\n<li><b>Allow only changes deemed absolutely necessary.</b></li>\n<li><b>Carefully examine the impact</b> of suggested changes.</li>\n<li><b>Delay some changes</b> as \"future enhancements\".</li>\n<li><b>Timeboxing.</b></li></ol>\n<p>Café example: the loyalty card is nice but not needed for launch → technique 4, put it in version 2.</p>"
   },
   {
    "h": "Timeboxing: the deadline comes first",
    "body": "<p>Normal projects are <b>task-oriented</b>: more tasks = a longer project. Some companies hate long projects, so they use a <b>time-oriented</b> approach \"that places meeting a deadline above delivering functionality\". That is <b>timeboxing</b>, \"another approach to scope management\".</p>\n<p><b>6 steps (S35):</b></p>\n<ol><li>Set the date for system delivery.</li>\n<li>Prioritize the functionality to include.</li>\n<li>Build the core of the system (the most important functions).</li>\n<li>Postpone functionality that cannot be provided in time.</li>\n<li>Deliver the system with core functionality.</li>\n<li>Repeat steps 3–5 to add refinements and enhancements.</li></ol>",
    "diagram": "flowchart TD\n  S1[\"1. Set the delivery date\"] --> S2[\"2. Prioritize functionality\"]\n  S2 --> S3[\"3. Build the core\"]\n  S3 --> S4[\"4. Postpone what does not fit\"]\n  S4 --> S5[\"5. Deliver with core functionality\"]\n  S5 -.->|\"6. Repeat 3 to 5\"| S3"
   },
   {
    "h": "Managing risk",
    "body": "<p><b>Risk management</b> = \"the process of assessing and addressing the risks that are associated with developing a project\". The slide calls it the \"final facet\" of project management.</p>\n<p><b>4 causes of risk (S42):</b> weak personnel, scope creep, poor design, overly optimistic estimates.</p>\n<p><b>6 gears (S43, no order printed):</b> Awareness, Identify, Evaluate, Controls, Implement, Monitor.</p>\n<p><b>Risk assessment template (S44):</b></p>\n<table><tr><th>Field</th><th>Class example</th></tr>\n<tr><td>Risk 1</td><td>The team has never programmed in <b>Java</b>, so development will be slowed</td></tr>\n<tr><td>Likelihood</td><td>High probability</td></tr>\n<tr><td>Potential impact</td><td>Programming tasks take about <b>50% longer</b></td></tr>\n<tr><td>Ways to address it</td><td><b>Up-front Java training</b>; bring in <b>outside Java experts</b> for early programming</td></tr></table>"
   },
   {
    "h": "JIRA: a project management tool",
    "body": "<p><b>Boards:</b> JIRA supports <b>Scrum and Kanban boards</b> (from W2). A board gives an immediate snapshot of the project, shows progress and each task's status, and its workflow can be customized.</p>\n<p><b>Business project templates:</b> ready templates for simple tasks and complex workflows, customizable per team.</p>\n<p><b>5 issue types (S47):</b></p>\n<ul><li><b>Epic</b>: \"a big user story that needs to be broken down\".</li>\n<li><b>Story</b>: a user story.</li>\n<li><b>Task</b>: something that needs to be done to achieve the team's goal.</li>\n<li><b>Sub-Task</b>: a smaller piece of an issue.</li>\n<li><b>Bug</b>: \"a problem that impairs or prevents the functions of the product\".</li></ul>\n<p>Notice the WBS idea again: big items are broken down into smaller ones.</p>",
    "diagram": "flowchart TD\n  EP[\"Epic: Online ordering\"] --> ST1[\"Story: customer orders a coffee\"]\n  EP --> ST2[\"Story: customer pays online\"]\n  ST1 --> SB1[\"Sub-task: menu screen\"]\n  ST1 --> SB2[\"Sub-task: cart screen\"]\n  BG[\"Bug: total price is wrong\"] -.-> ST2"
   }
  ],
  "example": {
   "problem": "<p>The café app must launch before Navruz (fixed date). Midway, (1) the owner asks for a loyalty card, (2) a developer wants to add an AR menu \"because it is cool\", (3) the team has never used Flutter before. Which W4 ideas apply to each?</p>",
   "solution": "<ul><li>(1) and (2) are <b>scope creep</b>: (1) comes from a user/manager seeing new potential, (2) from a developer attached to an interesting capability. Examine the impact; allow only absolutely necessary changes; delay them as <b>future enhancements</b>.</li>\n<li>The fixed Navruz date → <b>timeboxing</b>: set the date, prioritize, build the core (menu, order, pay), postpone the rest, deliver, then repeat for version 2.</li>\n<li>(3) is a <b>risk</b> (weak personnel / new technology). Assessment: likelihood high; impact maybe +50% programming time; address it with up-front Flutter training and an outside expert, like the Java example.</li></ul>"
  },
  "check": [
   {
    "q": "\"The most common reason for schedule and cost overruns is ___\" (W5a-S2)",
    "a": "<b>Scope creep</b>."
   },
   {
    "q": "Name the 3 sources of scope creep.",
    "a": "Users who see new potential; developers attached to interesting capabilities; a senior manager adding a new strategy."
   },
   {
    "q": "What does step 6 of timeboxing say?",
    "a": "Repeat steps 3 through 5 (build core, postpone, deliver) to add refinements and enhancements."
   },
   {
    "q": "Give the 4 causes of risk on S42.",
    "a": "Weak personnel, scope creep, poor design, overly optimistic estimates."
   },
   {
    "q": "Which JIRA issue type is 'a big user story that needs to be broken down'?",
    "a": "<b>Epic</b>."
   }
  ],
  "exam": {
   "question": "<p>What is scope creep? Why does it happen, and what techniques can a project manager use to manage the project scope? Explain timeboxing.</p>",
   "answer": "<p><b>Scope creep</b> happens when new requirements are added after the project scope was defined and frozen. It occurs after the project is under way and is the most common reason for schedule and cost overruns.</p>\n<p><b>Causes:</b> users see the system's potential and want new functions; developers get attached to interesting capabilities; a senior manager wants the system to support a new strategy.</p>\n<p><b>Techniques:</b> identify all requirements at the outset; allow only absolutely necessary changes; carefully examine the impact of changes; delay some changes as future enhancements; timeboxing.</p>\n<p><b>Timeboxing</b> is a time-oriented approach that puts meeting the deadline above delivering all functionality: 1) set the delivery date; 2) prioritize functionality; 3) build the core; 4) postpone what cannot fit; 5) deliver with core functionality; 6) repeat 3–5 for enhancements.</p>"
  },
  "memorize": [
   "Scope creep = new requirements after scope is frozen; #1 cause of overruns",
   "Causes: users, developers, senior manager",
   "5 techniques: identify all at outset, only necessary changes, examine impact, delay as future enhancements, timeboxing",
   "Timeboxing: date → prioritize → core → postpone → deliver → repeat 3–5",
   "Risk causes: weak personnel, scope creep, poor design, optimistic estimates",
   "Risk template: risk, likelihood, impact, ways to address",
   "JIRA: Scrum + Kanban boards; Epic, Story, Task, Sub-Task, Bug"
  ]
 },
 {
  "id": "W5a-1",
  "label": "W5a·1",
  "week": "W5a",
  "slides": [
   2,
   3,
   4,
   5,
   6,
   7,
   8,
   9,
   10,
   11,
   12,
   13,
   14,
   15,
   16,
   17,
   18
  ],
  "kind": "theory",
  "title": "Staffing the project: how many people, which structure, what kind of team",
  "hook": "After this lesson you can say what staffing includes, calculate the average team size, draw the team structure, explain why big teams are slow, and answer the professor's W4 review MCQs.",
  "cards": [
   {
    "h": "Staffing = 4 jobs and 2 documents",
    "body": "<p>Imagine you open a café in Tashkent. Before you open, you must decide: how many workers? Who cooks, who serves? How do I keep them happy? How do I stop fights?</p><p>A project manager does the same. <b>Staffing the project includes 4 jobs</b> [S4]:</p><ol><li>Decide <b>how many people</b> to put on the project.</li><li><b>Match people's skills</b> to what the project needs.</li><li><b>Motivate</b> them to meet the project's objectives.</li><li><b>Minimize the conflict</b> that will happen over time.</li></ol><p><b>The deliverables (outputs):</b></p><ul><li><b>Staffing plan</b>: the number and kinds of people, plus the <b>overall reporting structure</b> (who reports to whom).</li><li><b>Project charter</b>: the project's objectives and rules.</li></ul><p><b>Exam tip:</b> if he asks for the deliverables, write all three bold phrases: staffing plan, reporting structure, project charter.</p>",
    "diagram": "flowchart LR\n  S[\"Staffing the project\"] --> J1[\"1. How many people\"]\n  S --> J2[\"2. Match skills\"]\n  S --> J3[\"3. Motivate\"]\n  S --> J4[\"4. Minimize conflict\"]\n  J1 --> D1([\"Staffing plan\"])\n  J2 --> D1\n  J4 --> D2([\"Project charter\"])"
   },
   {
    "h": "How many people? Divide, then keep teams small",
    "body": "<p><b>Step 1 of staffing</b> is to find the <b>average number of staff</b> [S14]:</p><p><b>average staff = total person-months of effort ÷ optimal schedule (months)</b></p><p>Slide example: a 40 person-month project in 10 months → 40 ÷ 10 = <b>4 full-time people</b> on average. The real number goes up and down as specialists join and leave (business analysts, programmers, technical writers).</p><p><b>Big warning (bold on the slide):</b> \"Adding staff resources does <b>not</b> translate into increased productivity.\" Why? A bigger team is <b>harder to coordinate</b>.</p><p><b>The rule</b> [S16]: keep each team to <b>fewer than 8–10 people</b>. If you need more people, make <b>sub-teams</b>. Each sub-team talks inside itself and reports to a contact at a higher level.</p>"
   },
   {
    "h": "Why big teams are slow: the Ringelmann effect",
    "body": "<p>Think of a <b>tug of war</b>. With 2 people, both pull hard. With 8 people, each one thinks \"my effort is not critical\" and pulls a little less.</p><p><b>Ringelmann effect</b> [S6]: \"the tendency for individual members of a group to become increasingly less productive as the size of their group increases.\" Bigger group → smaller contribution per person (an <i>inverse</i> relationship).</p><p><b>The graph</b> [S7]: the <i>potential</i> line goes straight up (8 people = 800). The <i>actual</i> line bends and flattens (8 people ≈ 400). The gap is called <b>process loss</b>. At 8 people, about half the output is lost.</p><p><b>The picture of lines</b> [S15]: every pair of people needs a communication line. Count them: 2 people → 1 line, 4 → 6, 6 → 15, 8 → 28. People grow slowly, lines grow fast.</p><p><i>My hint (not on the slide):</i> lines = n × (n − 1) ÷ 2. So 10 people → 45 lines.</p>",
    "diagram": "flowchart LR\n  A((A)) --- B((B))\n  A --- C((C))\n  A --- D((D))\n  B --- C\n  B --- D\n  C --- D"
   },
   {
    "h": "The team structure in the staffing plan",
    "body": "<p>After you know <i>how many</i> people, the staffing plan lists the <b>roles</b> and the <b>reporting structure</b> [S17]:</p><ul><li><b>Project manager</b>: one per project, oversees the overall progress.</li><li><b>Analysts</b>: the core of the team.</li><li><b>Functional lead</b>: manages a group of <b>analysts</b>.</li><li><b>Technical lead</b>: oversees the <b>programmers</b> and other technical staff.</li></ul><p>The picture on S18 is \"one possible configuration\": PM on top, functional lead with 3 analysts on the left, technical lead with 2 programmers on the right.</p><p>Caption to remember: people have <b>technical skills</b> and <b>interpersonal skills</b>, and <b>both</b> matter when you give out tasks.</p>",
    "diagram": "flowchart TD\n  PM[\"Project manager\"] --> FL[\"Functional lead\"]\n  PM --> TL[\"Technical lead\"]\n  FL --> A1[\"Analyst\"]\n  FL --> A2[\"Analyst\"]\n  FL --> A3[\"Analyst\"]\n  TL --> P1[\"Programmer\"]\n  TL --> P2[\"Programmer\"]"
   },
   {
    "h": "The goal: a jelled team (5 traits)",
    "body": "<p>DeMarco and Lister: a <b>jelled team</b> is \"a group of people so strongly knit that <b>the whole is greater than the sum of the parts</b>.\" Together they produce more than the same people would produce alone. It can become \"almost unstoppable\".</p><p><b>The 5 characteristics</b> [S8–S10], in order:</p><ol><li><b>Very low turnover</b>: nobody leaves, because leaving feels like breaking a bond of trust.</li><li><b>Strong sense of identity</b>: like a class group that picks a cute team name.</li><li><b>Sense of eliteness</b>: a little \"swagger\" toward people outside the team.</li><li><b>The team owns the system</b>, not one person. Only the team's output matters.</li><li><b>They have fun</b>: the work is challenging and they learn from it.</li></ol><p>Memory hook: <b>Low turnover · Identity · Eliteness · Ownership · Fun</b>.</p>"
   },
   {
    "h": "Ten steps to more productive teams",
    "body": "<p>The slides list 10 steps [S11–S13]. Only some are explained:</p><ol><li><b>Give them their own space</b>: the whole team in one place. Cubicles are the worst: they block talking but still let in noise.</li><li><b>Try agile methods.</b></li><li><b>Maximise communication, minimise bureaucracy</b>: daily stand-up meetings, <b>pair programming</b> (two developers at one PC), group design at a whiteboard.</li><li><b>No more heroes</b>: no secret \"lone ranger\" who writes code nobody else understands.</li><li><b>Let them grow.</b></li><li><b>Give them play time and rest time.</b></li><li><b>Trust the team.</b></li><li><b>Work iteratively and incrementally.</b></li><li><b>Use Test First Design</b> (= Test Driven Development): write the tests <i>before</i> the code.</li><li><b>Get a team coach.</b></li></ol><p>Hook: Space · Agile · Communicate · No heroes · Grow · Rest · Trust · Iterate · Test-first · Coach.</p>"
   }
  ],
  "example": {
   "problem": "<p><b>The professor's Mya case [S3]</b> (it tests W4 + this lesson). The team lost four days to a hurricane. At the 6-week mark of a 9-week project, Mya is 1 week behind. What is the BEST solution?</p><ul><li>Add several people to the project to get it back to schedule</li><li>Do not change the schedule, but expect the teams to work longer days and every other weekend</li><li>Since the project is about 16% behind, increase the project to about 10-and-one-half weeks</li><li>Since the project is about 20% behind, increase the project to about 12 weeks</li><li>Add three people AND increase the project by one week (to 10 weeks)</li></ul>",
   "solution": "<p><b>Answer: \"about 16% behind → about 10.5 weeks\".</b></p><ol><li>% behind = 1 week late ÷ 6 weeks done = 0.167 ≈ <b>16%</b>.</li><li>New length = 9 × 1.167 = <b>10.5 weeks</b>. The maths matches. This is the W4 <b>low-risk</b> action: increase the whole schedule by the percentage you are behind.</li></ol><p><b>Why not the others?</b></p><ul><li>Add people: \"Adding staff resources does not translate into increased productivity\" [W5a-S14], plus the Ringelmann effect.</li><li>Same schedule + overtime: the W4 <b>high-risk</b> action, and it breaks the don't \"unrealistic deadlines\" and step 6 \"rest time\".</li><li>20% → 12 weeks: wrong maths (9 × 1.2 = 10.8, not 12).</li><li>+3 people +1 week: adding people again.</li></ul>"
  },
  "check": [
   {
    "q": "<b>Professor's MCQ [S2]:</b> The science (or art) of project management is in making ___ of size, time and cost. (benchmark comparisons / analytical and educated estimates / trade-offs / maximum calculations / minimum calculations)",
    "a": "<b>Trade-offs.</b> W4-S26: PM makes trade-offs among functionality (size), time and cost. \"Educated estimates\" is the trap."
   },
   {
    "q": "<b>Professor's MCQ [S2]:</b> The most common reason for schedule and cost overruns is ___ (team conflict / lack of communication / lack of sponsor support / scope creep / adding people to a late project)",
    "a": "<b>Scope creep</b> (W4-S33): new requirements added after the scope was frozen. The others are real problems, but not \"the most common\"."
   },
   {
    "q": "<b>Professor's Micah case [S3]:</b> A project plan in the planning phase says $50,000 and 20 weeks. By the margin-of-error guidelines, the range is…?",
    "a": "<b>$0 to $100,000 and 15 to 25 weeks.</b> W4-S37: cost ±100% (50,000 ± 50,000), schedule ±25% (20 ± 5). Don't swap the two percentages."
   },
   {
    "q": "A project needs 60 person-months and the optimal schedule is 12 months. Average staff? And what if the PM calculates that 15 people are needed?",
    "a": "60 ÷ 12 = <b>5</b> full-time people on average. For 15 people: keep teams under 8–10, so split into <b>sub-teams</b> that each report to a contact higher up [S16]."
   },
   {
    "q": "True or false: \"Jelled teams have a high turnover during a project.\"",
    "a": "<b>False.</b> Jelled teams have a <i>very low</i> turnover [S8]."
   },
   {
    "q": "What is the Ringelmann effect? Give the slide's picture.",
    "a": "Individual members become less productive as the group gets bigger. Picture: a <b>tug of war</b>; each person feels their own effort is not critical [S6]."
   }
  ],
  "exam": {
   "question": "<p>(a) What does staffing the project include, and what are its deliverables? (b) A project needs 48 person-months of effort over an optimal schedule of 8 months. What is the average number of staff? (c) Depict a possible configuration of a project team.</p>",
   "answer": "<p><b>(a)</b> Staffing includes: deciding how many people to assign; matching their skills to the project's needs; motivating them; minimizing conflict. Deliverables: a <b>staffing plan</b> (number and kinds of people + reporting structure) and a <b>project charter</b> (objectives and rules).</p><p><b>(b)</b> Average staff = person-months ÷ schedule = 48 ÷ 8 = <b>6 people</b>. The number can change as specialists join and leave. Adding more people would not raise productivity in proportion, because coordination gets harder.</p><p><b>(c)</b> Project manager on top; functional lead manages the analysts; technical lead manages the programmers. Assign people by technical <b>and</b> interpersonal skills.</p>",
   "diagram": "flowchart TD\n  PM[\"Project manager\"] --> FL[\"Functional lead\"]\n  PM --> TL[\"Technical lead\"]\n  FL --> A1[\"Analyst\"]\n  FL --> A2[\"Analyst\"]\n  FL --> A3[\"Analyst\"]\n  TL --> P1[\"Programmer\"]\n  TL --> P2[\"Programmer\"]"
  },
  "memorize": [
   "Staffing = how many · match skills · motivate · minimize conflict",
   "Deliverables: staffing plan (+ reporting structure) and project charter",
   "Average staff = person-months ÷ optimal schedule (40 ÷ 10 = 4)",
   "Adding staff does NOT raise productivity; teams fewer than 8–10, else sub-teams",
   "Ringelmann: bigger group → less per person (tug of war, process loss)",
   "Lines: 2→1, 4→6, 6→15, 8→28",
   "PM → functional lead (analysts) + technical lead (programmers)",
   "Jelled team: low turnover · identity · eliteness · team ownership · fun",
   "W4 review: trade-offs · scope creep · Micah $0–100k, 15–25 wks · Mya 16% → 10.5 wks"
  ],
  "note": "Slide S9 has a double negative: \"not to imply that a member who does not deliver… will not go unpunished\". It means the opposite of what it says literally: a member who doesn't deliver IS breaking the team's trust. The Mya case is a little ambiguous (the hurricane was a one-off delay, which fits W4's \"add the lost week\" action), but the only +1-week option also adds people, so answer \"16% → 10.5 weeks\"."
 },
 {
  "id": "W5a-2",
  "label": "W5a·2",
  "week": "W5a",
  "slides": [
   19,
   20,
   21,
   22,
   23,
   24,
   25,
   26,
   27,
   28,
   29,
   30,
   31,
   32,
   33
  ],
  "kind": "theory",
  "title": "Motivation, conflict, and the team's tools: CASE and standards",
  "hook": "After this lesson you can explain extrinsic vs intrinsic motivation, list the do's and don'ts, name the conflict-avoidance strategies, and explain CASE tools and the 5 types of standards.",
  "cards": [
   {
    "h": "Two kinds of motivation",
    "body": "<p>Motivation is \"the <b>number one influence</b> on people's performance\" [S19]. But it is hard to get right.</p><table><tr><th></th><th>Extrinsic</th><th>Intrinsic</th></tr><tr><td>Comes from</td><td>outside (external factors)</td><td>inside the person</td></tr><tr><td>Examples</td><td>pay raise, time off, bonus checks, threat of job loss</td><td>wish to beat a challenge, do high-quality work, work with people you like and trust</td></tr></table><p>Café example: a barista who works hard for a bonus = extrinsic. A barista who loves making perfect latte art = intrinsic.</p><p>The S20 picture lists sub-types. <b>Intrinsic:</b> attitude, competence, achievement, physiological, creative, introjected. <b>Extrinsic:</b> fear, incentive, social, power, identified.</p>",
    "diagram": "flowchart LR\n  M[\"Motivation\"] --> E[\"Extrinsic: from outside\"]\n  M --> I[\"Intrinsic: from inside\"]\n  E --> E1[\"raise, time off, bonus, fear of job loss\"]\n  I --> I1[\"challenge, quality work, good teammates\"]"
   },
   {
    "h": "Money is the LAST thing: 5 better ideas",
    "body": "<p>Most PMs agree money is \"<b>the last thing that should be done</b>\". The more you pay, the more people expect it, and money usually doesn't work [S21].</p><p><b>Five principles for 21st-century firms</b> [S21–S23]:</p><ol><li><b>20 percent rule</b>: 20% of an employee's time goes to an idea they believe in, even if it has nothing to do with the project. Gmail and Google News started this way. Too much? Start with 10%.</li><li><b>\"Now That\" awards</b>: tiny money awards (about $50) given by an employee <b>to a peer</b>, not by a manager. The value is that a colleague noticed.</li><li><b>A day to work on anything</b>, from time to time, but it must produce a <b>deliverable</b> (a utility program, a prototype, a better internal process).</li><li><b>High-end development environment</b>: special hardware and software (e.g. for VR or visualization work).</li><li><b>Work that makes a difference</b> in people's lives.</li></ol>"
   },
   {
    "h": "Six motivational don'ts",
    "body": "<table><tr><th>Don't</th><th>Why (slide reason, short)</th></tr><tr><td>Assign unrealistic deadlines</td><td>Nobody works hard for a deadline they know is impossible.</td></tr><tr><td>Ignore good efforts</td><td>People work harder when appreciated; public praise is often enough.</td></tr><tr><td>Create a low-quality product</td><td>Nobody is proud of low-quality work.</td></tr><tr><td>Give everyone on the project a raise</td><td>Same reward for all → good people think mediocrity is rewarded and resent it.</td></tr><tr><td>Make an important decision without the team's input</td><td>Buy-in matters; involve them.</td></tr><tr><td>Maintain poor working conditions</td><td>Lighting, desk space, technology, privacy, reference resources.</td></tr></table><p>Hook: <b>Deadlines · Efforts · Quality · Raise · Decide · Conditions</b>.</p><p>Trick for EXCEPT questions: every good suggestion is the <b>opposite</b> of a don't. The one that matches a don't is the answer.</p>"
   },
   {
    "h": "Handling conflict",
    "body": "<p><b>Group cohesiveness</b> = \"the attraction that members feel to the group and to other members\". It adds <b>more to productivity than individual skills or experience</b> [S26].</p><p><b>How to start:</b> define the <b>roles</b> clearly, hold people <b>accountable</b>, and write a <b>project charter</b> (the norms and ground rules). A charter may say when to be at work, when staff meetings are, how the team communicates, and how to update the workplan.</p><p><b>6 conflict-avoidance strategies</b> [S27]:</p><ol><li>Clearly define plans for the project.</li><li>Make sure the team understands why the project is important to the organization.</li><li>Develop detailed operating procedures and tell the team.</li><li>Develop a project charter.</li><li>Develop schedule commitments ahead of time.</li><li>Forecast other priorities and their possible impact on the project.</li></ol>"
   },
   {
    "h": "Environment and infrastructure: what CASE tools are",
    "body": "<p>Two workflows support the team the whole time [S28]:</p><ul><li><b>Environment workflow</b>: choose the <b>tools</b> + identify the <b>standards</b>.</li><li><b>Infrastructure management workflow</b>: choose the level and type of <b>documentation</b>.</li></ul><p><b>CASE</b> (computer-aided software engineering) = software that <b>automates all or part of the development process</b> [S29]. Three kinds:</p><ul><li><b>Upper CASE</b> → supports <b>analysis</b>: draws integrated diagrams, stores information about system parts.</li><li><b>Lower CASE</b> → supports <b>design</b>: can <b>generate code</b> for database tables and system functions.</li><li><b>I-CASE</b> (integrated) → <b>both</b>, across the whole process.</li></ul><p>Hook: <b>upper = analysis (diagrams), lower = design (code), integrated = both.</b></p>",
    "diagram": "flowchart LR\n  U[\"Upper CASE: diagrams\"] --> AN[\"Analysis workflow\"]\n  L[\"Lower CASE: generates code\"] --> DE[\"Design workflow\"]\n  I[\"I-CASE: both\"] --> AN\n  I --> DE\n  AN --> DE"
   },
   {
    "h": "CASE benefits and the CASE repository",
    "body": "<p><b>Benefits of CASE</b> [S30]:</p><ul><li>tasks are done and changed much faster</li><li>development information is centralized</li><li>information is shown as diagrams (easier to understand)</li><li><i>potentially</i>: lower maintenance costs, better quality, enforced discipline</li><li>some teams use it to measure how big a change is</li><li>many modern tools support <b>round-trip engineering</b> (named only, not explained)</li></ul><p><b>CASE repository</b> [S31] = the <b>central part</b> of any CASE tool. Other names: <b>information repository</b>, <b>data dictionary</b>. It stores the diagrams, screen and report designs, and checks how the diagrams fit together. Example: it warns you if a screen has a field that doesn't exist in your structural model.</p>"
   },
   {
    "h": "Standards: why and the 5 types",
    "body": "<p><b>Why</b> [S32]: many people share the system, so things get \"pretty confusing\". People also get moved to other projects. Their knowledge must not leave with them, and new people must learn fast.</p><table><tr><th>Type</th><th>Slide example</th></tr><tr><td>Documentation</td><td>date and project name as a header on all documents; 1-inch margins</td></tr><tr><td>Coding</td><td>module header (programmer, last update, purpose); 1 comment line per 5 lines of code</td></tr><tr><td>Procedural</td><td>record progress in the work plan every Monday by 10 AM; changes approved by the PM</td></tr><tr><td>Specification requirement</td><td>program name, purpose, special calculations, business rules, pseudocode, due date</td></tr><tr><td>User interface design</td><td>bold left-justified labels with a colon; tab order top left → bottom right</td></tr></table><p>How to classify: how documents look → documentation; how code is written → coding; when or how people report and approve → procedural; what a program spec contains → specification; how screens look → UI design.</p>"
   }
  ],
  "example": {
   "problem": "<p>A PM at a Tashkent food-delivery startup gives every developer the same $200 bonus. She sets a 2-week deadline that everyone knows is impossible. She chooses a new framework without asking anyone. The team sits in a noisy hall with old laptops. Which don'ts is she breaking, and what should she do instead?</p>",
   "solution": "<ul><li>Same bonus for all → <b>\"Give everyone on the project a raise\"</b>. Good people feel mediocrity is rewarded. Do: reward outstanding quality and effort.</li><li>Impossible deadline → <b>\"Assign unrealistic deadlines\"</b>. Do: set realistic deadlines.</li><li>Framework chosen alone → <b>\"Make an important decision without the team's input\"</b>. Do: involve them (buy-in).</li><li>Noisy hall, old laptops → <b>\"Maintain poor working conditions\"</b>. Do: a good working environment, maybe a high-end development environment. Also ten-steps #1: give them their own space.</li></ul>"
  },
  "check": [
   {
    "q": "<b>Professor's MCQ [S25]:</b> Suggestions for motivation might include all of these EXCEPT: setting realistic deadlines / giving all team members the same bonus on a project / recognize and reward good efforts / reward those with outstanding quality and effort / having a good working environment",
    "a": "<b>Giving all team members the same bonus.</b> It is the don't \"give everyone on the project a raise\". The other four are opposites of don'ts."
   },
   {
    "q": "Which is an <i>extrinsic</i> motivator: a wish to beat a challenge, bonus checks, or enjoying work with people you trust?",
    "a": "<b>Bonus checks.</b> The other two are intrinsic."
   },
   {
    "q": "Match: (1) upper CASE, (2) lower CASE, (3) I-CASE with (A) generates code for the design workflow, (B) both, (C) diagrams for the analysis workflow.",
    "a": "<b>1–C, 2–A, 3–B.</b>"
   },
   {
    "q": "\"Record actual task progress in the work plan every Monday morning by 10 AM\" is which type of standard? And which workflow chooses the documentation?",
    "a": "<b>Procedural</b> standard. Documentation is chosen by the <b>infrastructure management</b> workflow (environment = tools + standards)."
   },
   {
    "q": "What is group cohesiveness, and why does it matter?",
    "a": "The attraction members feel to the group and to each other. It contributes <b>more to productivity</b> than individual skills or experience [S26]."
   }
  ],
  "exam": {
   "question": "<p>(a) Explain the three types of CASE tools. (b) What is the CASE repository? (c) Name the five types of standards with one example each.</p>",
   "answer": "<p><b>(a)</b> CASE is software that automates all or part of the development process. <b>Upper CASE</b> supports the analysis workflow: it creates integrated diagrams and stores information about system components. <b>Lower CASE</b> supports the design workflow: it can generate code for database tables and system functionality. <b>I-CASE</b> has the functions of both and supports the whole development process.</p><p><b>(b)</b> The central component of any CASE tool (also called the information repository or data dictionary). It stores diagrams, screen and report designs, and keeps track of how the diagrams fit together, e.g. it warns if a screen field doesn't exist in the structural model.</p><p><b>(c)</b> Documentation (project name and date as a header); Coding (one comment line per five lines of code); Procedural (record progress every Monday by 10 AM); Specification requirement (program name, purpose, business rules, pseudocode, due date); User interface design (tab order from top left to bottom right).</p>"
  },
  "memorize": [
   "Motivation = #1 influence on performance",
   "Extrinsic = outside (raise, bonus, time off, fear); intrinsic = inside (challenge, quality, people)",
   "Money is the LAST thing; 20% rule (Gmail), Now That awards ($50, peer-to-peer), free day + deliverable, high-end environment, make a difference",
   "6 don'ts: deadlines · efforts · quality · raise for all · decide alone · poor conditions",
   "Group cohesiveness beats individual skill; roles + accountability + project charter",
   "6 conflict strategies: plans · importance · procedures · charter · schedule commitments · forecast priorities",
   "Environment = tools + standards; infrastructure = documentation",
   "Upper = analysis/diagrams · lower = design/code · I-CASE = both",
   "CASE repository = information repository = data dictionary",
   "5 standards: documentation · coding · procedural · specification · UI design"
  ],
  "note": "Slide S26 calls conflict \"the third component of staffing\", but on S4 it is the 4th bullet. If asked for \"the third component\", answer: organizing the project to minimize conflict."
 },
 {
  "id": "W5b-1",
  "label": "W5b·1",
  "week": "W5b",
  "slides": [
   2,
   3,
   4,
   5,
   6,
   7,
   9,
   10,
   11,
   12,
   13,
   14,
   15,
   16,
   20
  ],
  "kind": "theory",
  "title": "What a requirement is: functional vs nonfunctional and the requirements definition",
  "hook": "After this lesson you can define a requirement, tell functional from nonfunctional, put each one in its category, and solve the S15 classification exercise.",
  "cards": [
   {
    "h": "Where we are: the analysis phase",
    "body": "<p>Planning gave us the <b>system request</b>. Now, in <b>analysis</b>, we build the <b>system proposal</b> [S2]:</p><p><b>System proposal = requirements definition + models + feasibility analysis + workplan</b></p><p>The proposal goes to the <b>approval committee</b> [S3].</p><p><b>Purpose of requirements determination</b> [S11]: turn the <i>high-level</i> business requirements from the system request into <b>detailed requirements</b> that become <b>inputs for the models</b>.</p><p>One of the first jobs of an analyst is to determine the business requirements for the new system [S7].</p>",
    "diagram": "flowchart TD\n  SR[\"System request\"] --> RD[\"Requirements definition\"]\n  RD --> SP[\"System proposal\"]\n  MO[\"Models\"] --> SP\n  FA[\"Feasibility analysis\"] --> SP\n  WP[\"Workplan\"] --> SP\n  SP --> AC[\"Approval committee\"]"
   },
   {
    "h": "Project requirements vs product requirements",
    "body": "<table><tr><th></th><th>Project requirements</th><th>Product requirements</th></tr><tr><td>About</td><td>what the <b>project</b> needs to succeed</td><td>what the <b>final product</b> must have for its users</td></tr><tr><td>Set by</td><td>project stakeholders</td><td>product owner / product management team</td></tr><tr><td>Focus</td><td>scope, timeline, budget, resources</td><td>functionality, performance, usability</td></tr></table><p><b>Project requirements include</b> [S5]: workspace and equipment, staff training, documentation (user manuals), infrastructure changes, installing / testing / releasing / migrating, certification and legal (patents), internal company documents, and the SLA with customers (e.g. warranty service).</p><p><b>PRD</b> (product requirements document) = on these slides the same as the <b>requirements definition report</b> [S6]. It covers: goals and strategic fit → user stories → user design → questions and scope.</p>"
   },
   {
    "h": "Business requirements vs system requirements",
    "body": "<table><tr><th></th><th>Business (user) requirements</th><th>System requirements</th></tr><tr><td>Phase</td><td>analysis</td><td>design</td></tr><tr><td>Point of view</td><td>business person</td><td>developer</td></tr><tr><td>Focus</td><td><b>WHAT</b> the system does</td><td><b>HOW</b> it will be implemented</td></tr></table><p>The S10 tree: business requirements (why, goals) → stakeholder requirements (needs) → solution requirements (capabilities and qualities) → <b>functional</b> (capabilities) + <b>nonfunctional</b> (qualities).</p><p><b>Careful:</b> on S9 \"business requirements\" means <i>all</i> analysis requirements; on the S10 tree it is only the top \"why\" level. Answer with the slide the question uses.</p>",
    "diagram": "flowchart TD\n  B[\"Business requirements: why, goals\"] --> SH[\"Stakeholder requirements: needs\"]\n  SH --> SO[\"Solution requirements: capabilities and qualities\"]\n  SO --> F[\"Functional: capabilities\"]\n  SO --> N[\"Nonfunctional: qualities\"]"
   },
   {
    "h": "Functional requirements: what the system DOES or KEEPS",
    "body": "<p><b>Requirement</b> = \"a statement of <b>what the system must do</b> or <b>a characteristic it must have</b>\" [S11]. The first half is functional, the second half is nonfunctional.</p><p><b>Functional</b> = relates directly to a <b>process</b> the system must perform or <b>information</b> it must contain (\"process or data\") [S12].</p><table><tr><th>Subtype</th><th>Meaning</th><th>Course-registration example</th></tr><tr><td>Process-oriented</td><td>a process the system must do</td><td>The system must let students register for a course.</td></tr><tr><td>Information-oriented</td><td>information the system must contain</td><td>The system must keep each student's grades for 4 years.</td></tr></table><p>Slide pair: \"allow customers to <b>review</b> their order history\" = process; \"<b>retain</b> order history for three years\" = information.</p><p>Clue words: <i>allow, check, calculate, produce, print</i> → process. <i>include, retain, store</i> → information.</p>"
   },
   {
    "h": "Nonfunctional requirements: O-P-S-C",
    "body": "<p><b>Nonfunctional</b> = <b>behavioral properties</b> the system must have, like performance and usability [S13]. They are used mainly in <b>design</b> (user interface, hardware and software, physical architecture).</p><table><tr><th>Type</th><th>About</th><th>Slide example</th></tr><tr><td><b>Operational</b></td><td>physical and technical environment</td><td>work on any Web browser; integrate with the existing inventory system</td></tr><tr><td><b>Performance</b></td><td>speed, capacity, reliability</td><td>no interaction over 2 seconds; available 24 h a day, 365 days a year</td></tr><tr><td><b>Security</b></td><td>who may access what, when</td><td>only direct managers see staff personnel records</td></tr><tr><td><b>Cultural and political</b></td><td>culture, politics, law</td><td>US vs European currency; buy computers only from Dell; insurance industry standards</td></tr></table><p><b>Traps:</b> Web-browser access = nonfunctional (operational). \"24/365\" = performance (reliability), not operational.</p>",
    "diagram": "flowchart TD\n  R[\"Requirement\"] --> F[\"Functional\"]\n  R --> N[\"Nonfunctional\"]\n  F --> F1[\"Process-oriented\"]\n  F --> F2[\"Information-oriented\"]\n  N --> N1[\"Operational\"]\n  N --> N2[\"Performance\"]\n  N --> N3[\"Security\"]\n  N --> N4[\"Cultural and political\"]"
   },
   {
    "h": "The requirements definition report (and 4 real-world problems)",
    "body": "<p><b>Requirements definition</b> = \"a straightforward text report that simply lists the functional and nonfunctional requirements <b>in an outline format</b>\" [S16].</p><p>The doctor's-office sample:</p><ul><li><b>Nonfunctional</b>, grouped by the 4 types: 1. Operational (1.1 runs in Windows…), 2. Performance (2.1 store an appointment in 2 seconds or less), 3. Security (3.1 only doctors set their availability), 4. Cultural and political (\"none anticipated\": an empty type is still listed).</li><li><b>Functional</b>, grouped by process: 1. Manage appointments (patient makes / changes / cancels), 2. Produce schedule, 3. Record doctor availability.</li></ul><p><b>4 real-world problems</b> [S20]: (1) no access to the right users; (2) weak specification, especially with agile's light techniques; (3) some requirements can't be known at the start; (4) verifying and validating is hard.</p>"
   }
  ],
  "example": {
   "problem": "<p><b>The S15 exercise</b> (\"one of the most common mistakes by new analysts is to confuse functional and nonfunctional\"). Classify each requirement of a sales system. The system should:</p><ol><li>be accessible to the Web users</li><li>include the company standard logo and color scheme</li><li>restrict access to profitability information</li><li>include actual and budgeted cost information</li><li>provide management reports</li><li>include sales information that is updated at least daily</li><li>have a two-second maximum response time for predefined queries and ten minutes for ad hoc queries</li><li>include information from all company subsidiaries</li><li>print subsidiary reports in the primary language of the subsidiary</li><li>provide monthly rankings of salesperson performance</li></ol>",
   "solution": "<table><tr><th>#</th><th>Answer</th><th>Why</th></tr><tr><td>1</td><td>NF, operational</td><td>Web access is nonfunctional (S13)</td></tr><tr><td>2</td><td>NF, cultural and political</td><td>a company standard, not a process or data (borderline: usability also OK)</td></tr><tr><td>3</td><td>NF, security</td><td>who may see what</td></tr><tr><td>4</td><td>F, information</td><td>data the system holds</td></tr><tr><td>5</td><td>F, process</td><td>the system produces reports</td></tr><tr><td>6</td><td>NF, performance</td><td>the point is how often data is refreshed (mixed: \"include sales info\" alone is F)</td></tr><tr><td>7</td><td>NF, performance</td><td>response time = speed</td></tr><tr><td>8</td><td>F, information</td><td>data the system holds</td></tr><tr><td>9</td><td>NF, cultural and political</td><td>local language</td></tr><tr><td>10</td><td>F, process</td><td>computes rankings. Trap: \"performance\" = the salespeople's, not the system's</td></tr></table><p><b>Functional: 4, 5, 8, 10. Nonfunctional: 1, 2, 3, 6, 7, 9.</b> The slide gives no official key; on the exam, add one short reason for items 2 and 6.</p>"
  },
  "check": [
   {
    "q": "<b>Professor's MCQ [W6-S3]:</b> Which is NOT a purpose of the requirements definition? (a very high-level explanation of the business requirements / a more precise list of requirements used as inputs to the rest of analysis / create functional requirements / create cost/benefit analysis / create non-functional requirements)",
    "a": "<b>Create cost/benefit analysis.</b> That is economic feasibility, a separate part of the proposal. (The \"very high-level\" option is also doubtful, because the definition makes requirements <i>detailed</i>; but pick cost/benefit.)"
   },
   {
    "q": "<b>Professor's MCQ [W6-S3]:</b> An example of a functional requirement is ___ (access to the customer order system / available in English and Spanish / accessed through a Blackberry device / displayed in IE, Firefox or Chrome / automatically updated every 5 seconds)",
    "a": "<b>Access to the customer order system.</b> The others: English and Spanish = cultural; Blackberry = operational; browsers = operational; every 5 seconds = performance."
   },
   {
    "q": "<b>Professor's question [W6-S2 #1]:</b> What are the key deliverables created during analysis?",
    "a": "The <b>requirements definition</b>, the <b>models</b>, the (revised) <b>feasibility analysis</b> and <b>workplan</b>, packaged as the <b>system proposal</b> for the approval committee."
   },
   {
    "q": "<b>Professor's question [W6-S2 #3]:</b> What is the purpose of the requirements definition?",
    "a": "To convert the high-level business requirements from the system request into <b>detailed requirements</b> that are inputs for the models. It lists the functional and nonfunctional requirements in outline format."
   },
   {
    "q": "\"Staff training needs\": project requirement or product requirement? And \"available 24 hours a day, 365 days a year\": which type?",
    "a": "Staff training = <b>project</b> requirement (S5). 24/365 = <b>nonfunctional, performance</b> (reliability)."
   }
  ],
  "exam": {
   "question": "<p>Classify each requirement for a university course-registration system as functional (process / information) or nonfunctional (operational / performance / security / cultural and political):</p><ol><li>Students can drop a course online.</li><li>The system keeps the full list of courses offered each semester.</li><li>Only advisors can approve an overload request.</li><li>Search results appear in under 3 seconds.</li><li>The system works on phones and laptops.</li><li>Screens are available in English, Uzbek and Russian.</li></ol>",
   "answer": "<p>A requirement is what the system must do (functional) or a characteristic it must have (nonfunctional).</p><ol><li><b>Functional, process-oriented</b>: an action the system performs.</li><li><b>Functional, information-oriented</b>: data it contains.</li><li><b>Nonfunctional, security</b>: who has authorized access.</li><li><b>Nonfunctional, performance</b>: speed.</li><li><b>Nonfunctional, operational</b>: technical environment.</li><li><b>Nonfunctional, cultural and political</b>: languages.</li></ol>"
  },
  "memorize": [
   "System proposal = requirements definition + models + feasibility + workplan → approval committee",
   "Requirement = what the system must DO or a characteristic it must HAVE",
   "Project req = scope/time/budget/resources (stakeholders); product req = features (product owner)",
   "Business req = WHAT, analysis, business view; system req = HOW, design, developer view",
   "Functional = process-oriented + information-oriented",
   "Nonfunctional = Operational · Performance · Security · Cultural and political (O-P-S-C)",
   "Web browser access = operational; 24/365 = performance; \"salesperson performance\" = functional",
   "Requirements definition = text report, F + NF, outline format",
   "S15 answer: F = 4, 5, 8, 10; NF = 1, 2, 3, 6, 7, 9"
  ]
 },
 {
  "id": "W5b-2",
  "label": "W5b·2",
  "week": "W5b",
  "slides": [
   17,
   18,
   19,
   21,
   22,
   23,
   24,
   25,
   26,
   27,
   28,
   29,
   30,
   31,
   32,
   33
  ],
  "kind": "theory",
  "title": "Requirements analysis strategies: BPA vs BPI vs BPR",
  "hook": "After this lesson you can compare BPA, BPI and BPR (change, value, cost, breadth, risk), name the 8 techniques under them, and do a duration analysis.",
  "cards": [
   {
    "h": "Two toolboxes and three steps",
    "body": "<p>Sometimes users don't know what they want. Analysts help them with two toolboxes:</p><ul><li><b>Analysis strategies</b> [S17]: <b>BPA</b> (automation), <b>BPI</b> (improvement), <b>BPR</b> (reengineering). They <i>guide users</i> to discover their needs.</li><li><b>Gathering techniques</b> [S19]: interviews, questionnaires, observation, JAD, document analysis. They <i>collect information</i> from users.</li></ul><p>All three strategies follow the same <b>3 steps</b> [S21]:</p><ol><li>Understand the <b>as-is</b> system (\"the current state of systems and processes\").</li><li>Identify improvements.</li><li>Develop requirements for the <b>to-be</b> system (\"a concept for a new system\").</li></ol><p>The difference is <b>how much change</b>: BPA small, BPI moderate, BPR significant [S18].</p>",
    "diagram": "flowchart LR\n  A[\"1. Understand the as-is system\"] --> B[\"2. Identify improvements\"]\n  B --> C[\"3. Develop to-be requirements\"]"
   },
   {
    "h": "BPA: automate, change little",
    "body": "<p><b>BPA</b> keeps the way the organization works and <b>uses computers to do some of the work</b>. More efficient, but \"<b>the least impact on the business</b>\" [S22]. BPA planners spend <b>a lot of time</b> on the as-is system.</p><p>Café example: waiters still take orders the same way, but on a tablet instead of paper.</p><p><b>Technique 1: Problem analysis</b>: ask users and managers to name problems in the as-is system and how to solve them in the to-be system. The most straightforward and \"probably the most commonly used\" <b>analysis</b> technique.</p><p><b>Technique 2: Root cause analysis</b>: users jump to solutions. Every solution makes <b>assumptions</b> about the problem, and they may be wrong. Often the solution fixes a <b>symptom</b>, not the <b>root cause</b>. So ask \"why?\" until you find the real cause.</p>",
    "diagram": "flowchart LR\n  P[\"Problem: kitchen loses orders\"] --> S1[\"Quick fix: shout louder\"]\n  P --> Q{\"Why does it happen?\"}\n  Q --> RC[\"Root cause: orders on loose paper\"]\n  RC --> S2[\"Real fix: orders go to a kitchen screen\"]"
   },
   {
    "h": "BPI: improve, change moderately",
    "body": "<p><b>BPI</b> makes <b>moderate changes</b> to use new technology or to <b>copy what competitors do</b> [S24]. It improves:</p><ul><li><b>efficiency</b> = doing things right</li><li><b>effectiveness</b> = doing the right things</li></ul><p>BPI spends <b>much less time</b> on the as-is than BPA. Three activities:</p><ol><li><b>Duration analysis</b>: time each step and compare with the total time (next card).</li><li><b>Activity-based costing</b>: same idea but with <b>cost</b>. Find the cost of each step, find the most costly ones, improve those. Direct costs = labour + materials (labour = time spent × hourly cost of staff). Indirect costs (rent, depreciation) can be added.</li><li><b>Informal benchmarking</b>: study how <b>other organizations</b> do the process, often by <b>visiting them as customers</b>. Common for customer-facing processes. Slide example: for a car-dealer website, visit competitors' sites, other car-industry sites, and award-winning sites from other industries.</li></ol>"
   },
   {
    "h": "Duration analysis in numbers",
    "body": "<p><b>Method</b> [S25]:</p><ol><li>Measure the average <b>total time</b> of the process for a typical input.</li><li>Time <b>each step</b>.</li><li>Add the step times.</li><li><b>Compare</b> the sum with the total.</li></ol><p><b>Slide example</b> [S26]: a bank takes <b>30 days</b> to approve a home mortgage. The steps (data entry, credit check, title search, appraisal) take only about <b>8 hours</b> in total.</p><table><tr><th>View</th><th>Elapsed</th><th>Work</th><th>Work share</th></tr><tr><td>Working days (8 h)</td><td>30 × 8 = 240 h</td><td>8 h</td><td>8 ÷ 240 ≈ 3.3%</td></tr><tr><td>Clock hours</td><td>30 × 24 = 720 h</td><td>8 h</td><td>8 ÷ 720 ≈ 1.1%</td></tr></table><p>Conclusion in the slide's words: \"a strong indication that the overall process is <b>badly broken</b>, because it takes thirty days to perform one day's work.\" The order mostly sits and waits.</p>"
   },
   {
    "h": "BPR: reinvent, change a lot",
    "body": "<p><b>BPR</b> changes the <b>fundamental</b> way the organization works, \"<b>obliterating</b> the current way of doing business\" [S29]. Planners spend <b>little time</b> on the as-is, because they want new ideas.</p><p>Café example: no waiters at all; customers order and pay in an app, and food goes to a pickup shelf.</p><ol><li><b>Outcome analysis</b>: find the basic outcomes that give <b>value to customers</b>. They sound obvious but often are not.</li><li><b>Technology analysis</b>: list important and interesting technologies, then for <b>every</b> one, find how it could be used in the process and how the business would benefit.</li><li><b>Activity elimination</b>: for <b>each</b> activity, ask how to remove it, how the work could go on without it, and what would happen. A \"<b>force-fit exercise</b>\": you must address every activity, even if some results are silly.</li></ol>"
   },
   {
    "h": "Comparing and choosing a strategy",
    "body": "<table><tr><th></th><th>BPA</th><th>BPI</th><th>BPR</th></tr><tr><td>Amount of change</td><td>small</td><td>moderate</td><td>significant</td></tr><tr><td>Time on as-is</td><td>a lot</td><td>much less</td><td>little</td></tr><tr><td>Techniques</td><td>problem analysis, root cause analysis</td><td>duration analysis, activity-based costing, informal benchmarking</td><td>outcome analysis, technology analysis, activity elimination</td></tr><tr><td>Potential business value</td><td>Low–moderate</td><td>Moderate</td><td>High</td></tr><tr><td>Project cost</td><td>Low</td><td>Low–moderate</td><td>High</td></tr><tr><td>Breadth of analysis</td><td>Narrow</td><td>Narrow–moderate</td><td>Very broad</td></tr><tr><td>Risk</td><td>Low–moderate</td><td>Low–moderate</td><td>Very high</td></tr></table><p>Pattern: BPA → BPR, value, cost and breadth go up. <b>Risk is the same for BPA and BPI</b>, then jumps to very high.</p><p>S33: \"No one technique is inherently better than the others, and in practice most projects use a <b>combination</b>.\"</p>",
    "diagram": "flowchart LR\n  subgraph BPA[\"BPA: small change\"]\n    a1[\"Problem analysis\"]\n    a2[\"Root cause analysis\"]\n  end\n  subgraph BPI[\"BPI: moderate change\"]\n    b1[\"Duration analysis\"]\n    b2[\"Activity-based costing\"]\n    b3[\"Informal benchmarking\"]\n  end\n  subgraph BPR[\"BPR: significant change\"]\n    c1[\"Outcome analysis\"]\n    c2[\"Technology analysis\"]\n    c3[\"Activity elimination\"]\n  end\n  BPA -->|\"more value, cost, risk\"| BPI\n  BPI -->|\"even more\"| BPR"
   }
  ],
  "example": {
   "problem": "<p><b>Practice (new numbers, slide method).</b> At a university, a request to join a full course takes on average <b>10 working days</b> (8-hour days). The analysts time each step: student fills the form 0.5 h · advisor checks 0.25 h · department head signs 0.25 h · registrar checks timetable clash 0.5 h · registrar enters it 0.5 h.</p><p>(a) Do the duration analysis. (b) What does it show? (c) Which strategy is this, and what are its other two activities?</p>",
   "solution": "<p><b>(a)</b></p><ul><li>Step total = 0.5 + 0.25 + 0.25 + 0.5 + 0.5 = <b>2 h</b>.</li><li>Elapsed = 10 × 8 = <b>80 working hours</b>.</li><li>Ratio = 80 : 2 = <b>40 : 1</b>.</li><li>Real work = 2 ÷ 80 = <b>2.5%</b>; waiting = 78 h = <b>97.5%</b>.</li></ul><p><b>(b)</b> Like the mortgage case, it is \"a strong indication that the overall process is badly broken\": 10 days for a quarter of a day's work. The request mostly waits between signatures.</p><p><b>(c)</b> <b>BPI</b>. Its other activities: <b>activity-based costing</b> and <b>informal benchmarking</b>.</p>"
  },
  "check": [
   {
    "q": "<b>Professor's question [W6-S2 #2]:</b> What is the difference between an as-is system and a to-be system?",
    "a": "<b>As-is</b> = the current state of systems and processes. <b>To-be</b> = a concept for the new system [S18]."
   },
   {
    "q": "<b>Professor's question [W6-S2 #4]:</b> What are the three basic steps of analysis? Which step is sometimes skipped or done quickly, and why?",
    "a": "Understand the as-is → identify improvements → develop to-be requirements. The <b>as-is step</b> gets cut: BPA spends a lot of time on it, BPI much less, and BPR little, because BPR wants new ideas, not the old way."
   },
   {
    "q": "Which strategy does each belong to: activity elimination, informal benchmarking, root cause analysis, technology analysis, activity-based costing?",
    "a": "Activity elimination → <b>BPR</b>; informal benchmarking → <b>BPI</b>; root cause analysis → <b>BPA</b>; technology analysis → <b>BPR</b>; activity-based costing → <b>BPI</b>."
   },
   {
    "q": "On the S33 table, which two strategies have the same risk? Which has the highest cost?",
    "a": "<b>BPA and BPI</b> (both low–moderate). <b>BPR</b> has high cost (and very high risk)."
   },
   {
    "q": "Efficiency vs effectiveness?",
    "a": "Efficiency = <b>doing things right</b>. Effectiveness = <b>doing the right things</b>. BPI can improve both [S24]."
   }
  ],
  "exam": {
   "question": "<p>Compare business process automation, business process improvement and business process reengineering. For each, give the amount of change, the time spent on the as-is system, two techniques, and the potential value, cost, breadth and risk. Which one should a project choose?</p>",
   "answer": "<table><tr><th></th><th>BPA</th><th>BPI</th><th>BPR</th></tr><tr><td>Idea</td><td>keep the process, computers do some work</td><td>moderate changes: new technology or copy competitors</td><td>change the fundamental way of working</td></tr><tr><td>Change</td><td>small</td><td>moderate</td><td>significant</td></tr><tr><td>As-is time</td><td>significant</td><td>much less</td><td>little</td></tr><tr><td>Techniques</td><td>problem analysis, root cause analysis</td><td>duration analysis, activity-based costing, informal benchmarking</td><td>outcome analysis, technology analysis, activity elimination</td></tr><tr><td>Value</td><td>low–moderate</td><td>moderate</td><td>high</td></tr><tr><td>Cost</td><td>low</td><td>low–moderate</td><td>high</td></tr><tr><td>Breadth</td><td>narrow</td><td>narrow–moderate</td><td>very broad</td></tr><tr><td>Risk</td><td>low–moderate</td><td>low–moderate</td><td>very high</td></tr></table><p>No one technique is inherently better; most projects use a combination.</p>",
   "diagram": "flowchart LR\n  A[\"BPA: automate\"] -->|\"more change\"| B[\"BPI: improve\"]\n  B -->|\"more change\"| C[\"BPR: reinvent\"]"
  },
  "memorize": [
   "3 steps: understand as-is → identify improvements → develop to-be",
   "BPA small · BPI moderate · BPR significant change",
   "As-is time: BPA a lot, then BPI much less, then BPR little",
   "BPA: problem analysis, root cause analysis",
   "BPI: duration analysis, activity-based costing, informal benchmarking",
   "BPR: outcome analysis, technology analysis, activity elimination",
   "S33: value L–M / M / H · cost L / L–M / H · breadth N / N–M / very broad · risk L–M / L–M / very high",
   "Efficiency = doing things right; effectiveness = doing the right things",
   "Mortgage: 30 days for 8 h of work → badly broken",
   "Problem analysis = most common ANALYSIS technique; activity elimination = force-fit"
  ]
 },
 {
  "id": "W5b-3",
  "label": "W5b·3",
  "week": "W5b",
  "slides": [
   34,
   35,
   36,
   37,
   38,
   39,
   40,
   41,
   42,
   43,
   44,
   45
  ],
  "kind": "theory",
  "title": "Interviews: the most common way to gather requirements",
  "hook": "After this lesson you can describe the 5 interview steps, write closed, open and probing questions, and explain structured vs unstructured and top-down vs bottom-up interviews.",
  "cards": [
   {
    "h": "Why gathering matters, and the 5 interview steps",
    "body": "<p>Gathering requirements does more than collect facts. It builds <b>political support</b> for the project and <b>trust and rapport</b> with the users, who will decide to use the system or not. <b>All key stakeholders must be included</b> [S34].</p><p>The <b>interview</b> is \"the <b>most commonly used</b> requirements-gathering technique\": if you want to know something, you ask [S35]. Usually one-on-one; several people at once only when time is short.</p><p><b>5 steps:</b></p><ol><li>Select interviewees</li><li>Design interview questions</li><li>Prepare for the interview</li><li>Conduct the interview</li><li>Post-interview follow-up</li></ol>",
    "diagram": "flowchart LR\n  S1[\"1. Select interviewees\"] --> S2[\"2. Design questions\"]\n  S2 --> S3[\"3. Prepare\"]\n  S3 --> S4[\"4. Conduct\"]\n  S4 --> S5[\"5. Follow up\"]"
   },
   {
    "h": "Step 1: choose who, the interview schedule",
    "body": "<p>Make an <b>interview schedule</b>: <b>who</b> will be interviewed, <b>when</b>, and <b>for what purpose</b> [S36].</p><p>Include <b>both</b> managers (who manage the processes) and staff (who actually do them). You get high-level <i>and</i> low-level views.</p><p>The slide's schedule goes down the company: Director of Accounting (strategic vision, 2 h) → AR and AP managers (current problems, future goals) → data-entry supervisor and clerk (how the processes are done).</p><p>Café app example: interview the owner (vision), the manager (problems), and a waiter and a cook (how orders really move).</p>"
   },
   {
    "h": "Step 2a: three types of questions",
    "body": "<table><tr><th>Type</th><th>What it is</th><th>Like on an exam</th><th>Slide example</th></tr><tr><td><b>Closed-ended</b></td><td>needs a specific answer; for specific, precise information</td><td>multiple choice or arithmetic</td><td>How many telephone orders are received per day?</td></tr><tr><td><b>Open-ended</b></td><td>room to explain; rich information; the interviewee has more control</td><td>essay</td><td>What do you think about the current system?</td></tr><tr><td><b>Probing</b></td><td>follows up on the last answer when it is unclear; shows you are listening</td><td>–</td><td>Why? Can you give me an example?</td></tr></table><p>\"No type of question is better than another\"; mix them [S39].</p><p><b>Trap:</b> the slide lists \"How do customers place orders?\" and \"What information is missing from the monthly sales report?\" as <b>closed-ended</b>. Answer as the slide does.</p>"
   },
   {
    "h": "Step 2b: structured vs unstructured, top-down vs bottom-up",
    "body": "<table><tr><th></th><th>Unstructured</th><th>Structured</th></tr><tr><td>When</td><td>early; the as-is is unclear</td><td>later; you know the process well</td></tr><tr><td>Seeks</td><td>broad, roughly defined information</td><td>very specific information (e.g. exactly how a credit card is approved)</td></tr><tr><td>Questions</td><td>few closed; open and probing \"on the fly\"</td><td>prepared before; <b>more closed-ended</b></td></tr><tr><td>Note</td><td>the <b>most challenging</b> to conduct</td><td>–</td></tr></table><p><b>Order of questions</b> [S40]: <b>top-down</b> = broad → specific. <b>Bottom-up</b> = specific → broad. In practice: broad → specific → back to broad.</p>",
    "diagram": "flowchart TD\n  H[\"Very general: How can order processing be improved?\"] --> M[\"Moderately specific: How can we reduce returned items?\"]\n  M --> L[\"Very specific: How can we stop shipping the wrong products?\"]"
   },
   {
    "h": "Steps 3 and 4: prepare and conduct",
    "body": "<p><b>Prepare</b> like for a presentation [S42]:</p><ul><li>a general interview plan with the questions in order</li><li>expect possible answers and plan follow-ups</li><li>plan segues (smooth moves) between topics</li><li>check what the person knows, so you don't ask what they can't answer</li><li>decide priorities in case time runs short</li></ul><p><b>Conduct</b> [S43]:</p><ul><li><b>First goal: build rapport</b>, so the person tells the whole truth, not just what they think you want.</li><li>Look professional, unbiased, an independent seeker of information.</li><li>Start by explaining why you are there and why you chose them.</li><li><b>Take careful notes of everything</b>, even if it seems unimportant. It's fine to ask them to slow down.</li></ul>"
   },
   {
    "h": "Step 5: follow-up and the interview report",
    "body": "<p>After the interview, write an <b>interview report</b>: your notes, summarized in a useful format [S44].</p><ul><li>Write it <b>within 48 hours</b>, because you forget fast.</li><li>Often <b>send it to the interviewee</b> to check and add clarifications.</li></ul><p><b>Parts of the sample report</b> [S45]: approved by · person interviewed · interviewer · purpose · summary · open items · detailed notes.</p><p>In the sample, the HR director names two big problems: data too old (needed 2 days after month end, delivered after 3 weeks) and poor data quality. One open item is \"interview Jim Wack about the <i>reasons</i> for data quality problems\": that is root cause thinking from BPA.</p>"
   }
  ],
  "example": {
   "problem": "<p>You are the analyst for a new ordering app for a Tashkent café. (a) Who do you put on the interview schedule? (b) Write one closed-ended, one open-ended and one probing question. (c) Early in the project, would you use a structured or an unstructured interview?</p>",
   "solution": "<p><b>(a)</b> Managers <i>and</i> staff: the owner (strategic vision), the manager (current problems, future goals), a waiter and a cook (how orders really flow). For each: name, position, purpose, meeting time.</p><p><b>(b)</b></p><ul><li>Closed: \"How many orders do you get on a Friday evening?\"</li><li>Open: \"What problems do you face with orders every day?\"</li><li>Probing: \"Can you give me an example of a lost order?\"</li></ul><p><b>(c)</b> <b>Unstructured</b>: the as-is process is still unclear, so ask broad open questions and probe on the fly. Later, use structured interviews with more closed questions.</p>"
  },
  "check": [
   {
    "q": "<b>Professor's question [W6-S2 #6]:</b> Explain the differences among closed-ended, open-ended and probing questions. When would you use each?",
    "a": "<b>Closed</b>: needs a specific answer; use for specific, precise information (how many per day). <b>Open</b>: leaves room to explain; use to gather rich information and give the interviewee control. <b>Probing</b>: follows up on an answer; use when the answer is unclear, to expand or confirm."
   },
   {
    "q": "<b>Professor's question [W6-S2 #7]:</b> Explain the differences between unstructured and structured interviews. When would you use each?",
    "a": "<b>Unstructured</b>: broad, roughly defined information; early, when the as-is is unclear; open questions and probing on the fly; the most challenging. <b>Structured</b>: specific questions prepared in advance; later, when you need exact details; more closed-ended questions."
   },
   {
    "q": "Within how many hours should the interview report be written, and who often checks it?",
    "a": "<b>48 hours.</b> It is often sent to the <b>interviewee</b> to check and clarify."
   },
   {
    "q": "\"Can you explain that in a bit more detail?\" Which type of question?",
    "a": "<b>Probing.</b>"
   },
   {
    "q": "Top-down vs bottom-up interview?",
    "a": "Top-down: start broad and general, move to specific. Bottom-up: start very specific, move to broad. In practice analysts mix them: broad → specific → broad."
   }
  ],
  "exam": {
   "question": "<p><b>Professor's question [W6-S2 #5]:</b> Describe the five major steps in conducting interviews.</p>",
   "answer": "<ol><li><b>Select interviewees</b>: make an interview schedule (who, when, for what purpose). Include managers and staff to get high- and low-level views.</li><li><b>Design interview questions</b>: closed-ended, open-ended and probing; structured or unstructured; ordered top-down or bottom-up.</li><li><b>Prepare</b>: an interview plan with questions in order, expected answers and follow-ups, segues, check the interviewee's knowledge, set priorities in case time runs short.</li><li><b>Conduct</b>: build rapport first, appear professional and unbiased, explain why you are there, take careful notes of everything.</li><li><b>Post-interview follow-up</b>: write the interview report within 48 hours and send it to the interviewee to check.</li></ol>",
   "diagram": "flowchart LR\n  S1[\"Select\"] --> S2[\"Design\"]\n  S2 --> S3[\"Prepare\"]\n  S3 --> S4[\"Conduct\"]\n  S4 --> S5[\"Follow up: report in 48 h\"]"
  },
  "memorize": [
   "Gathering builds political support + trust and rapport; include ALL key stakeholders",
   "Interview = most commonly used GATHERING technique",
   "5 steps: select · design · prepare · conduct · follow up",
   "Schedule = who, when, purpose; managers AND staff",
   "Closed = specific (MCQ) · open = rich (essay) · probing = follow-up (Why?)",
   "Unstructured = early, broad, most challenging; structured = later, prepared, more closed",
   "Top-down = broad → specific; bottom-up = specific → broad; practice = mix",
   "Conduct: rapport first, notes on everything",
   "Report within 48 h, sent to the interviewee"
  ],
  "note": "Slide S39 has a small typo: \"more closed-ended questions in a structured interview then in the unstructured\" should be \"than\". The meaning: structured interviews have MORE closed-ended questions."
 },
 {
  "id": "W6-1",
  "label": "W6·1",
  "week": "W6",
  "slides": [
   4,
   5,
   6,
   7,
   8,
   9,
   10,
   11,
   12,
   13,
   14,
   15,
   16,
   17,
   18
  ],
  "kind": "theory",
  "title": "JAD and questionnaires: gathering requirements from many people",
  "hook": "After this lesson you can explain JAD (roles, 5 steps, e-JAD) and questionnaires (sampling, return rates, 9 design rules, 4 steps), with the numbers he likes to ask.",
  "cards": [
   {
    "h": "JAD: put everyone in one room",
    "body": "<p>Imagine the Tashkent café wants a new ordering app. You could interview 15 baristas, cashiers and managers <b>one by one</b>. That is slow, and each person tells a different story.</p><p><b>JAD</b> does the opposite: everyone sits in <b>one room</b> and works on the requirements <b>together</b>.</p><p>Slide definition: JAD is an information-gathering technique that allows the <b>project team, users, and management</b> to work together to identify requirements for the system. <b>IBM</b> developed it in the <b>late 1970s</b>. It is \"often the <b>most useful</b> method for collecting information from users\".</p><p>The room picture (S5): a big U-shaped table, a whiteboard and a screen at the front, flip chart sheets on the wall, name cards, projectors, a printer and computers.</p><p>Small naming glitch: S4 says Joint Application <b>Development</b>, the S34 table says Joint Application <b>Design</b>. Same thing: JAD.</p>",
    "diagram": "flowchart TD\n  F([\"Facilitator: runs the agenda, stays neutral\"])\n  S([\"1-2 Scribes: notes and copies\"])\n  U[\"10-20 users\"]\n  M[\"Management\"]\n  P[\"Project team and analysts\"]\n  F --> U\n  F --> M\n  F --> P\n  S -.->|records the session| F"
   },
   {
    "h": "The facilitator and the scribes",
    "body": "<p>A JAD session has <b>10 to 20 users</b>, one <b>facilitator</b> and <b>1 or 2 scribes</b>.</p><p><b>Facilitator</b> = the referee of the meeting.</p><ul><li>Sets the meeting <b>agenda</b> and <b>guides</b> the discussion.</li><li>Does <b>not</b> join the discussion as a participant.</li><li>Gives <b>no ideas or opinions</b>, so he or she stays <b>neutral</b>.</li><li>Must be an expert in <b>group-process techniques</b> AND in <b>systems analysis and design</b>.</li></ul><p><b>Scribes</b> help the facilitator: they record notes, make copies, often using computers and <b>CASE tools</b>.</p><p>Why is facilitating hard (S11)? People come with <b>strong feelings</b>. The facilitator must move the session forward and make people <b>recognize and accept, but not necessarily agree with</b>, other opinions. This needs skill in systems analysis and design, JAD, and interpersonal skills. Most analysts first <b>apprentice</b> with a skilled facilitator.</p><p><b>Exam trap:</b> \"The facilitator gives opinions to help the group decide\" is FALSE.</p>"
   },
   {
    "h": "e-JAD: JAD with computers",
    "body": "<p>In a normal JAD meeting only <b>one person talks at a time</b>, and a cashier may be afraid to disagree with the boss.</p><p><b>e-JAD</b> (electronic JAD) fixes this with <b>groupware</b>: each participant sits at a networked computer with special software and sends <b>anonymous</b> ideas and opinions to everyone.</p><table><tr><th></th><th>JAD</th><th>e-JAD</th></tr><tr><td>How ideas are shared</td><td>spoken, one person at a time</td><td>typed, anonymous, all at the same time</td></tr><tr><td>Fear of reprisal</td><td>possible</td><td>no (anonymous)</td></tr><tr><td>Typical length</td><td>5–10 days over 3 weeks</td><td>1–4 days in 1 week</td></tr><tr><td>Time saved</td><td>—</td><td>50–80% less (initial research)</td></tr></table><p>Small slide gap: S7 says e-JAD overcomes \"these problems\" but the deck never lists them. From the slide's own words, they are: people cannot all speak at once, and they fear reprisal.</p>"
   },
   {
    "h": "The 5 JAD steps (a copy of the interview steps)",
    "body": "<p>JAD follows the same 5 steps as an interview. The slides say \"as with interviews\" again and again.</p><table><tr><th>Step</th><th>What to remember</th></tr><tr><td>1. Select participants</td><td>Chosen like interviewees, by the <b>information they can contribute</b>. Aim: a broad mix of organizational levels and <b>political support</b>. Big problem: everyone must be <b>away from the office at the same time</b>, so the office may close or run with a skeleton staff.</td></tr><tr><td>2. Design the session</td><td>From <b>half a day to several weeks</b>; most last <b>5–10 days over 3 weeks</b>. JAD goes <b>beyond collecting</b> into analysis: users and analysts can build the functional models or the requirements definition together.</td></tr><tr><td>3. Prepare</td><td>Sessions are often <b>off-site</b>, so tell people what is expected. Goal = understand the current system? Bring procedure manuals and documents. Goal = improvements? Think about them before coming.</td></tr><tr><td>4. Conduct</td><td>Formal agenda + <b>ground rules</b>: follow the schedule, respect others' opinions, accept disagreement, only one person talks at a time.</td></tr><tr><td>5. Post-JAD follow-up</td><td>A <b>post-session report</b> (like the interview report), ready <b>a week or two</b> later. Interview report: within 48 hours.</td></tr></table>",
    "diagram": "flowchart LR\n  A[\"1. Select participants\"] --> B[\"2. Design the session\"]\n  B --> C[\"3. Prepare\"]\n  C --> D[\"4. Conduct with ground rules\"]\n  D --> E[\"5. Post-session report: 1-2 weeks\"]"
   },
   {
    "h": "Questionnaires: when you need MANY people",
    "body": "<p>The café app will have 5,000 customers. You cannot interview them all, or put them in one room. You send a <b>questionnaire</b>.</p><p>Slide definition: a questionnaire is <b>a set of written questions used to obtain information from individuals</b>. Use it when:</p><ul><li>there is a <b>large number of people</b> whose information and opinions you need;</li><li>the system is for users <b>outside the organization</b> (customers, vendors).</li></ul><p>You do not ask everyone. You choose a <b>sample</b>: a subset of people who represent the whole group.</p><p>Not everyone answers. Return rates:</p><ul><li>paper and e-mail: <b>30–50%</b></li><li>Web-based: often only <b>5–30%</b></li></ul><p>So you must send many more questionnaires than the answers you need.</p>",
    "diagram": "flowchart LR\n  A[\"1. Select participants: a sample\"] --> B[\"2. Design the questions\"]\n  B --> C[\"3. Administer: get them back\"]\n  C --> D[\"4. Follow-up: questionnaire report\"]"
   },
   {
    "h": "Designing good questions",
    "body": "<p>On paper, nobody can help a confused person. So questions must be very clear, and <b>closed-ended</b> questions are used most.</p><p>Separate <b>facts</b> from <b>opinions</b>:</p><ul><li>Opinion question: \"Are network problems common?\" (agree or disagree)</li><li>Factual question: \"How often does a network problem occur: once an hour, once a day, once a week?\" (a precise value)</li></ul><p>The most obvious issue, but often forgotten: decide <b>how you will analyze and use the answers BEFORE you send it</b>. Afterwards it is too late.</p><p><b>The 9 design guidelines (S16):</b></p><ol><li>Begin with nonthreatening and interesting questions.</li><li>Group items into logically coherent sections.</li><li>Do not put important items at the very end.</li><li>Do not crowd a page with too many items.</li><li>Avoid abbreviations.</li><li>Avoid biased or suggestive items or terms.</li><li>Number the questions.</li><li>Pretest the questionnaire to find confusing questions.</li><li>Provide anonymity to respondents.</li></ol>"
   },
   {
    "h": "Getting answers back, then the report",
    "body": "<p><b>Step 3, Administer.</b> The key problem is getting people to complete it and send it back. Common tricks:</p><ul><li>explain <b>why</b> the questionnaire exists and why <b>this person</b> was chosen;</li><li>give a <b>return date</b>;</li><li>offer an <b>inducement</b> (e.g., a free pen);</li><li>offer to send a <b>summary of the results</b>.</li></ul><p>Inside the organization, analysts can also: hand it out <b>personally</b>, contact people who did not return it <b>after a week or two</b>, or ask <b>supervisors</b> to run it in a group meeting.</p><p><b>Step 4, Follow-up.</b> Process the answers and write a <b>questionnaire report soon after the deadline</b>, so analysis stays on time and people who asked for results get them quickly.</p><p>Compare the steps: interviews 5, JAD 5, questionnaires <b>4</b> (\"administer\" replaces \"prepare\" and \"conduct\").</p>"
   }
  ],
  "example": {
   "problem": "<p>You design a <b>Web</b> questionnaire for café app customers. You need at least <b>120 completed answers</b>.</p><ol><li>How many people must you send it to, in the best case and in the worst case?</li><li>Fix these three bad items: (a) \"Don't you agree our old app is annoying?\" (b) \"Rate the UX of our POS.\" (c) \"Is ordering slow?\" (you want a fact, not an opinion).</li></ol>",
   "solution": "<p><b>1.</b> Web return rate is 5–30%.</p><ul><li>Best case: 120 ÷ 0.30 = <b>400</b> people.</li><li>Worst case: 120 ÷ 0.05 = <b>2,400</b> people.</li></ul><p>(With paper or e-mail at 30–50% you would need 240 to 400.)</p><p><b>2.</b></p><ul><li>(a) is <b>biased / suggestive</b>. Better: \"How satisfied are you with the current app? 1 = very unhappy … 5 = very happy.\"</li><li>(b) uses <b>abbreviations</b>. Better: \"How easy is our ordering screen to use?\"</li><li>(c) is an <b>opinion</b> question. Factual version: \"How long does it usually take you to place an order: under 1 minute, 1–3 minutes, more than 3 minutes?\"</li></ul>"
  },
  "check": [
   {
    "q": "Who takes part in a JAD session, and how many?",
    "a": "The project team, users and management. 10–20 users, one facilitator, 1–2 scribes."
   },
   {
    "q": "True or false: the JAD facilitator gives his own ideas to help the group reach a decision.",
    "a": "<b>False.</b> The facilitator gives no ideas or opinions, to stay neutral. He sets the agenda and guides the discussion."
   },
   {
    "q": "Give three benefits of e-JAD and its typical length.",
    "a": "Anonymous input, everyone contributes at the same time, no fear of reprisal; 50–80% less time. Typically 1–4 days in a 1-week period (JAD: 5–10 days over 3 weeks)."
   },
   {
    "q": "What are the return rates for paper/e-mail and for Web questionnaires?",
    "a": "Paper and e-mail: 30–50%. Web: often only 5–30%."
   },
   {
    "q": "His W6-S2 question: \"Describe the five major steps in conducting interviews.\" Which other technique uses the same steps?",
    "a": "1 Selecting interviewees (interview schedule) → 2 Designing interview questions → 3 Preparing for the interview → 4 Conducting the interview → 5 Post-interview follow-up (report within 48 hours). <b>JAD</b> uses the same 5 steps (but its report takes a week or two)."
   },
   {
    "q": "Why are closed-ended questions used most on questionnaires?",
    "a": "Because a confused respondent cannot get help on the spot, so questions must leave little room for misunderstanding."
   }
  ],
  "exam": {
   "question": "<p>What is JAD? Describe the role of the facilitator and the scribes, list the five steps of a JAD session, and explain how e-JAD differs from JAD.</p>",
   "answer": "<p><b>JAD</b> (Joint Application Development, IBM, late 1970s) is an information-gathering technique in which the project team, users and management work together to identify the requirements. 10–20 users meet under a facilitator.</p><p><b>Facilitator:</b> sets the agenda and guides the discussion, but does not participate and gives no opinions (stays neutral). Expert in group-process techniques and in systems analysis and design. <b>Scribes (1–2):</b> record notes and make copies, often with CASE tools.</p><p><b>Five steps:</b> 1) select participants, 2) design the JAD session, 3) prepare for the session, 4) conduct the session (agenda + ground rules), 5) post-JAD follow-up (post-session report after 1–2 weeks).</p><p><b>e-JAD</b> uses groupware: participants send anonymous ideas from networked computers, all at the same time, without fear of reprisal. It can cut session time by 50–80% (1–4 days in one week instead of 5–10 days over three weeks).</p>"
  },
  "memorize": [
   "JAD = project team + users + management together; IBM, late 1970s",
   "10–20 users · 1 neutral facilitator · 1–2 scribes",
   "e-JAD: groupware, anonymous, simultaneous, 50–80% less time",
   "JAD 5–10 days over 3 weeks; e-JAD 1–4 days in 1 week",
   "JAD steps: select → design → prepare → conduct → follow-up (report in 1–2 weeks)",
   "Ground rules: schedule, respect opinions, accept disagreement, one talks at a time",
   "Questionnaire: many people / outside users; sample; mostly closed-ended",
   "Returns: paper/e-mail 30–50%, Web 5–30%",
   "Questionnaire steps (4): select → design → administer → follow-up"
  ],
  "note": "Slide typos: S6 \"as the JAD session proceedings\" means \"proceeds\"; S7 mentions \"these problems\" that are never listed."
 },
 {
  "id": "W6-2",
  "label": "W6·2",
  "week": "W6",
  "slides": [
   19,
   20,
   21,
   22,
   23,
   24,
   34
  ],
  "kind": "theory",
  "title": "Document analysis, observation, and the big techniques table",
  "hook": "After this lesson you can explain document analysis and observation, redraw the 5-technique comparison table, and pick the right technique for any scenario.",
  "cards": [
   {
    "h": "Document analysis: read what already exists",
    "body": "<p>Before you ask people anything, read the papers. Project teams use <b>document analysis</b> to understand the <b>as-is</b> system.</p><p><b>Ideal world:</b> the team that built the old system wrote documentation, and every later project updated it.</p><p><b>Real world:</b> most systems are <b>not well documented</b>. Teams don't document along the way, and after the project there is no time. Documents may be missing or out of date.</p><p>But many useful documents still exist (7 kinds):</p><ol><li>paper reports</li><li>memorandums</li><li>policy manuals</li><li>user-training manuals</li><li>organization charts</li><li>forms</li><li>the user interface of the existing system</li></ol><p>University example: the add/drop form, the student handbook, the registrar's monthly report.</p>"
   },
   {
    "h": "Forms tell the truth",
    "body": "<p>S20 shows a filled <b>Central Veterinary Clinic</b> patient card with three notes:</p><ul><li>The customer wrote the <b>pet's</b> name in \"Name\" → the field should say <b>Owner's Name</b>.</li><li>Staff wrote in <b>type of animal</b> and <b>date of birth</b> → these fields should be added.</li><li>The customer left out the <b>area code</b> → the phone field should make it clearer.</li></ul><p><b>The key sentence (S21):</b> the <b>most powerful indication that the system needs to be changed</b> is when users <b>create their own forms</b> or <b>add extra information</b> to existing ones.</p><ul><li>So review both <b>blank</b> and <b>completed</b> forms, and look for these changes.</li><li>If users must open <b>several reports</b> to get what they need, new information or a new format is needed.</li></ul><p>Café example: the barista keeps a paper notebook of \"no sugar\" requests because the app has no field for it. That notebook is a requirement.</p>"
   },
   {
    "h": "Observation: watch, don't just listen",
    "body": "<p><b>Observation</b> = the act of <b>watching processes being performed</b>.</p><p>Why? In interviews people <b>describe</b> their work. When you watch, you see the <b>reality</b>. Research shows many managers <b>do not remember</b> how they work or how they spend their time. (Quick: how many hours did you spend last week on each course?)</p><p>So observation is a good way to <b>check the validity</b> of information from <b>indirect sources</b>, like interviews and questionnaires.</p><p>Example: the registrar says \"each add/drop takes 2 minutes\". You stand at the counter and see it takes 7 minutes because the staff re-type data into two systems.</p>"
   },
   {
    "h": "Ethnography and focused ethnography",
    "body": "<p>Ethnography = long, careful observation of people at work. It finds requirements that come from:</p><ul><li>how people <b>actually</b> work, not how the official process says they <b>ought</b> to work;</li><li><b>cooperation</b> and awareness of other people's activities (seeing what others do changes how we work).</li></ul><p><b>Strength:</b> great for understanding <b>existing</b> processes.<br><b>Weakness:</b> it <b>cannot identify new features</b> for the system.</p><p><b>Focused ethnography</b> (from an <b>air traffic control</b> project) = ethnography <b>+ prototyping</b>. Building the prototype raises unanswered questions, and those questions <b>focus</b> what you observe.</p><p>Another problem: ethnography studies existing practices that may have a <b>historical basis that is no longer relevant</b> (\"we always did it this way\").</p><p>Slide typo: S23 \"the way I which\" means \"the way in which\".</p>"
   },
   {
    "h": "⭐ The big table: 5 techniques side by side (S34)",
    "body": "<p>This is the most useful slide of the week. Learn to redraw it: 6 rows × 5 columns.</p><table><tr><th></th><th>Interviews</th><th>JAD</th><th>Questionnaires</th><th>Document analysis</th><th>Observation</th></tr><tr><td><b>Type of information</b></td><td>As-is, improvements, to-be</td><td>As-is, improvements, to-be</td><td>As-is, improvements</td><td>As-is</td><td>As-is</td></tr><tr><td><b>Depth</b></td><td>High</td><td>High</td><td>Medium</td><td>Low</td><td>Low</td></tr><tr><td><b>Breadth</b></td><td>Low</td><td>Medium</td><td>High</td><td>High</td><td>Low</td></tr><tr><td><b>Integration</b></td><td>Low</td><td>High</td><td>Low</td><td>Low</td><td>Low</td></tr><tr><td><b>User involvement</b></td><td>Medium</td><td>High</td><td>Low</td><td>Low</td><td>Low</td></tr><tr><td><b>Cost</b></td><td>Medium</td><td>Low–Medium</td><td>Low</td><td>Low</td><td>Low to Medium</td></tr></table><p>What the rows mean (simple textbook meaning; the slide does not define them):</p><ul><li><b>Depth</b> = how rich and detailed the information is (the \"why\" behind facts).</li><li><b>Breadth</b> = how many people or topics you cover.</li><li><b>Integration</b> = combining information from many people and resolving their differences.</li><li><b>User involvement</b> = how much users take part, which builds their support.</li></ul><p>The slide heads the column \"Joint Application <b>Design</b>\"; S4 says \"Development\". Same JAD.</p>"
   },
   {
    "h": "Reading the table: 5 simple rules",
    "body": "<ol><li><b>To-be information only comes from talking:</b> interviews and JAD. Questionnaires add improvements. Documents and observation give <b>as-is only</b> (papers and watching cannot tell you the future).</li><li><b>JAD is the only High</b> for integration and user involvement (everyone is in one room).</li><li><b>Depth High:</b> interviews and JAD. <b>Breadth High:</b> questionnaires and document analysis. Depth and breadth trade off: talk deeply to few, or lightly to many.</li><li><b>Cost:</b> Low = questionnaires, document analysis; Low–Medium = JAD; Low to Medium = observation; <b>Medium = interviews</b> (the most expensive in the table).</li><li><b>Observation</b> is Low on almost everything. Its value is different: it shows the <b>reality</b> and checks what people told you.</li></ol><p>Memory hook for depth/breadth: <b>I-J deep, Q-D wide</b>.</p>"
   },
   {
    "h": "When to use which: a decision path",
    "body": "<p>Exam scenarios give you clues. Look for these words:</p><ul><li>\"new system ideas\", \"agree together\", \"build the requirements in the session\" → <b>JAD</b></li><li>\"detailed\", \"one key expert\", \"why\" → <b>interviews</b></li><li>\"thousands\", \"customers or vendors\", \"cheap\" → <b>questionnaires</b></li><li>\"existing forms, manuals, reports\" → <b>document analysis</b></li><li>\"what really happens\", \"check what they said\" → <b>observation</b></li></ul><p>In real projects analysts <b>mix</b> techniques, e.g. read documents first, then interview or run JAD, then confirm with a questionnaire and check with observation.</p>",
    "diagram": "flowchart TD\n  Q1{\"Need to-be ideas for the new system?\"}\n  Q1 -->|yes| Q2{\"Many groups must agree together?\"}\n  Q2 -->|yes| JAD[\"JAD: integration and involvement High\"]\n  Q2 -->|no| INT[\"Interviews: depth High\"]\n  Q1 -->|no| Q3{\"Many people or outside users?\"}\n  Q3 -->|yes| QN[\"Questionnaires: breadth High, cost Low\"]\n  Q3 -->|no| Q4{\"Check what really happens?\"}\n  Q4 -->|yes| OBS[\"Observation\"]\n  Q4 -->|no| DOC[\"Document analysis: breadth High, cost Low\"]"
   }
  ],
  "example": {
   "problem": "<p>Inha University in Tashkent is replacing its course-registration system. Pick the best technique for each situation and give a reason from the table.</p><ol><li>You want to know how the current paper add/drop process works. There are five years of filled forms.</li><li>You need the opinions of 3,000 students about the current system and ideas to improve it, cheaply.</li><li>The dean, registrar staff, IT and student representatives must agree on the new system's features and draft the requirements together.</li><li>Registrar staff say every request takes 2 minutes. You doubt it.</li><li>You need very detailed rules for exam scheduling from the one IT expert who knows them.</li></ol>",
   "solution": "<ol><li><b>Document analysis</b>: as-is, breadth High, cost Low. Look for fields people add by hand.</li><li><b>Questionnaire</b>: large number of people; as-is + improvements; breadth High, cost Low. Use a sample and expect low returns.</li><li><b>JAD</b> (or e-JAD if time is short or people fear speaking): to-be info, integration and user involvement High; JAD can produce the requirements definition in the session.</li><li><b>Observation</b>: shows the reality and checks the validity of what people said.</li><li><b>Interview</b>: depth High, to-be info; one person, so breadth is not needed.</li></ol>"
  },
  "check": [
   {
    "q": "According to the table, which technique gives only as-is information, with High breadth but Low depth?",
    "a": "<b>Document analysis.</b> (Observation is as-is but breadth Low; questionnaires have breadth High but depth Medium and also give improvements.)"
   },
   {
    "q": "What is \"the most powerful indication that the system needs to be changed\"?",
    "a": "When users create their own forms or add additional information to existing ones."
   },
   {
    "q": "Which two techniques can give to-be information? Which one alone is High in integration and user involvement?",
    "a": "Interviews and JAD give to-be. Only <b>JAD</b> is High in integration and user involvement."
   },
   {
    "q": "Ethnography: one strength, one weakness. What does focused ethnography combine it with?",
    "a": "Strength: understanding existing processes (how people really work). Weakness: cannot identify new features (and may study practices that are no longer relevant). Focused ethnography = ethnography + <b>prototyping</b>."
   },
   {
    "q": "His W6-S2 question: \"What is the difference between an as-is system and a to-be system?\" Which techniques give only as-is?",
    "a": "As-is = the current state of systems and processes. To-be = a concept for the new system. Document analysis and observation give as-is only."
   },
   {
    "q": "Rank the techniques by cost from the table.",
    "a": "Low: questionnaires, document analysis · Low–Medium: JAD · Low to Medium: observation · Medium: interviews."
   }
  ],
  "exam": {
   "question": "<p>Draw the table comparing the five requirements-gathering techniques. When would you use JAD instead of questionnaires?</p>",
   "answer": "<p>(Draw the 6 × 5 table exactly as in card 5: type of information, depth, breadth, integration, user involvement, cost.)</p><p><b>JAD instead of questionnaires</b> when the project needs information about the <b>to-be</b> system and wants users, management and analysts to <b>work together</b>: JAD has High depth, High integration and High user involvement, and it can produce analysis deliverables (functional models, requirements definition) in the session.</p><p><b>Questionnaires</b> are better when information and opinions are needed from a <b>large number of people</b> or from <b>outside users</b> (customers, vendors): High breadth at Low cost, but only as-is and improvements, Medium depth, Low integration and involvement.</p>"
  },
  "memorize": [
   "Document analysis = as-is; most systems are poorly documented",
   "7 documents: reports, memos, policy manuals, training manuals, org charts, forms, user interface",
   "Users making their own forms / adding info = strongest sign of change",
   "Observation = watching processes; shows reality; checks interviews and questionnaires",
   "Ethnography cannot identify new features; focused ethnography = + prototyping (air traffic control)",
   "To-be: only interviews and JAD",
   "JAD: only High in integration and user involvement",
   "Deep: interviews, JAD · Wide: questionnaires, document analysis",
   "Cheapest: questionnaires, document analysis · Most expensive: interviews (Medium)"
  ],
  "note": "The meanings of depth, breadth and integration come from the textbook, not the slides (the slide only rates them). Slides S23–S33 carry another course's footer (\"SEN 301 Requirements Engineering\"): the professor borrowed them."
 },
 {
  "id": "W6-3",
  "label": "W6·3",
  "week": "W6",
  "slides": [
   2,
   3,
   25,
   26,
   27,
   28,
   29,
   30,
   31,
   32,
   33,
   35,
   36,
   37
  ],
  "kind": "theory",
  "title": "Validation, requirements management, the system proposal, and the W6 review questions",
  "hook": "After this lesson you can name the 5 checks, 3 validation techniques and 4 review checks without mixing them, explain why requirements change, list the 10 proposal sections, and answer his W6 review questions.",
  "cards": [
   {
    "h": "Validation: is this what the customer really wants?",
    "body": "<p>You order a birthday cake. If the baker writes the wrong name on the <b>order form</b>, fixing it costs nothing. If he notices <b>after</b> the cake is baked, he must bake a new cake.</p><p>Requirements are the same. <b>Requirements validation</b> = showing that the requirements define the system that the <b>customer really wants</b>.</p><p>Why it matters: fixing a requirements error <b>after delivery</b> may cost <b>up to 100 times</b> the cost of fixing an implementation error. So we check requirements early.</p>"
   },
   {
    "h": "The 5 requirements checks",
    "body": "<p>Five questions to ask about the requirements (S26). Order: <b>V-C-C-R-V</b>.</p><table><tr><th>Check</th><th>Question</th><th>Café app example of a failure</th></tr><tr><td><b>Validity</b></td><td>Does the system give the functions that best support the customer's needs?</td><td>The app has a games section, but the owner needs faster orders.</td></tr><tr><td><b>Consistency</b></td><td>Are there any conflicts between requirements?</td><td>\"Cash only\" and \"card only\" in the same document.</td></tr><tr><td><b>Completeness</b></td><td>Are all functions the customer needs included?</td><td>Nobody wrote a requirement for refunds.</td></tr><tr><td><b>Realism</b></td><td>Can it be built with the available budget and technology?</td><td>AI that predicts every order perfectly, budget $500.</td></tr><tr><td><b>Verifiability</b></td><td>Can the requirements be checked?</td><td>\"The app should be fast.\" (How fast? Can't test it.)</td></tr></table>"
   },
   {
    "h": "3 validation techniques, and how reviews work",
    "body": "<p><b>How</b> do we validate? Three techniques (S27):</p><ol><li><b>Requirements reviews</b>: systematic <b>manual</b> analysis of the requirements (people read and discuss them).</li><li><b>Prototyping</b>: using an <b>executable model</b> of the system to check requirements (users click a demo).</li><li><b>Test-case generation</b>: writing tests for requirements to check <b>testability</b>. If you can't write a test, the requirement is bad.</li></ol><p><b>Requirements reviews (S28):</b></p><ul><li>held <b>regularly</b> while the requirements definition is being written;</li><li><b>both client and contractor staff</b> take part;</li><li>can be <b>formal</b> (with completed documents) or <b>informal</b>;</li><li>good communication between developers, customers and users solves problems <b>early</b>.</li></ul>"
   },
   {
    "h": "The 4 review checks: don't mix the three lists",
    "body": "<p>During a review, check each requirement for (S29):</p><ul><li><b>Verifiability</b>: is it realistically testable?</li><li><b>Comprehensibility</b>: is it properly understood?</li><li><b>Traceability</b>: is its <b>origin</b> clearly stated (who asked for it, why)?</li><li><b>Adaptability</b>: can it be changed without a large impact on other requirements?</li></ul><p>Three lists, side by side:</p><table><tr><th>Requirements checks (5)</th><th>Validation techniques (3)</th><th>Review checks (4)</th></tr><tr><td>Validity</td><td>Requirements reviews</td><td>Verifiability</td></tr><tr><td>Consistency</td><td>Prototyping</td><td>Comprehensibility</td></tr><tr><td>Completeness</td><td>Test-case generation</td><td>Traceability</td></tr><tr><td>Realism</td><td></td><td>Adaptability</td></tr><tr><td>Verifiability</td><td></td><td></td></tr></table><p><b>Trap:</b> Verifiability is in <b>both</b> check lists, with different words (\"can it be checked?\" vs \"realistically testable?\"). Hook for review checks: <b>V-C-T-A</b>.</p>"
   },
   {
    "h": "Requirements management: requirements always change",
    "body": "<p><b>Requirements management</b> = managing <b>changing</b> requirements during requirements engineering and system development. New requirements appear <b>while</b> the system is built AND <b>after</b> it is in use.</p><p>What you do: keep track of <b>each</b> requirement, keep <b>links</b> between dependent requirements (to see the impact of a change), and have a <b>formal process</b> for change proposals.</p><p><b>Why requirements change (3 reasons, S31–S32):</b></p><ol><li>The <b>business and technical environment</b> changes after installation: new hardware, links to other systems, new business priorities, new laws and regulations.</li><li>The people who <b>pay</b> are rarely the people who <b>use</b> the system. Payers' budget limits may conflict with users' needs, so features get added after delivery.</li><li>Large systems have <b>diverse users</b> with conflicting priorities. The final requirements are a <b>compromise</b>, and the balance often has to change.</li></ol><p>The S33 picture shows it over time:</p>",
    "diagram": "flowchart LR\n  A[\"Initial understanding of problem\"] --> B[\"Initial requirements\"]\n  B -->|time passes| C[\"Changed understanding of problem\"]\n  C --> D[\"Changed requirements\"]"
   },
   {
    "h": "⭐ The system proposal: 10 sections",
    "body": "<p>Analysis ends with one big document, the <b>system proposal</b>, which goes to the <b>approval committee</b> (W5b).</p><table><tr><th>#</th><th>Section</th><th>What is inside</th></tr><tr><td>1</td><td>Table of Contents</td><td>—</td></tr><tr><td>2</td><td>Executive Summary</td><td>all essential info, so a <b>busy executive</b> can read quickly and decide what to read in depth</td></tr><tr><td>3</td><td>System Request</td><td>the <b>revised</b> system request form</td></tr><tr><td>4</td><td>Workplan</td><td>the original workplan, <b>revised</b> after analysis</td></tr><tr><td>5</td><td>Feasibility Analysis</td><td>a <b>revised</b> feasibility analysis, using information from analysis</td></tr><tr><td>6</td><td>Requirements Definition</td><td>the functional and nonfunctional business requirements</td></tr><tr><td>7</td><td>Functional Model</td><td>activity diagram, use case descriptions, use-case diagram</td></tr><tr><td>8</td><td>Structural Models</td><td>CRC cards, class diagram, object diagrams (to-be; may include as-is)</td></tr><tr><td>9</td><td>Behavioral Models</td><td>sequence diagrams, communication diagrams, behavioral-state machines, CRUDE matrix (to-be; may include as-is)</td></tr><tr><td>10</td><td>Appendices</td><td>supporting material, e.g. questionnaire or interview results</td></tr></table><p><b>Memory story:</b> Contents + Summary (2 openers) → 3 <b>old</b> documents, revised (Request, Workplan, Feasibility) → the <b>new</b> list (Requirements) → 3 <b>models</b> (Functional, Structural, Behavioral = what it does, what it is made of, how it behaves) → Appendices.</p><p>The Appendices sentence on S37 stops in the middle at \"industry\". Learn it as shown.</p>",
    "diagram": "flowchart LR\n  SR[\"System request\"] --> RD[\"Requirements definition\"]\n  SR --> MO[\"Models\"]\n  SR --> FA[\"Feasibility analysis\"]\n  SR --> WP[\"Workplan\"]\n  RD --> SP([\"System proposal\"])\n  MO --> SP\n  FA --> SP\n  WP --> SP\n  SP --> AC{\"Approval committee\"}"
   },
   {
    "h": "His W6 review questions (they test W5b)",
    "body": "<p>W6 opens with 7 open questions and 2 MCQs about last week. Short exam answers:</p><table><tr><th>#</th><th>Question</th><th>Answer</th></tr><tr><td>1</td><td>Key deliverables of analysis?</td><td>Requirements definition, models (functional, structural, behavioral), revised feasibility analysis and workplan → together the <b>system proposal</b>, sent to the approval committee.</td></tr><tr><td>2</td><td>As-is vs to-be?</td><td>As-is = the current systems and processes. To-be = the concept of the new system.</td></tr><tr><td>3</td><td>Purpose of the requirements definition?</td><td>To convert high-level business requirements (from the system request) into <b>detailed</b> requirements used as inputs for creating models.</td></tr><tr><td>4</td><td>3 analysis steps; which is skipped, why?</td><td>Understand as-is → identify improvements → develop to-be. The <b>as-is</b> step is rushed, especially in <b>BPR</b>, which focuses on new ideas (BPA spends much time on it, BPI less).</td></tr><tr><td>5</td><td>5 interview steps?</td><td>Select interviewees → design questions → prepare → conduct → follow-up (report within 48 h).</td></tr><tr><td>6</td><td>Closed / open / probing?</td><td>Closed: a specific answer, for precise facts. Open: room to elaborate, for rich information. Probing: follow-up when an answer is unclear.</td></tr><tr><td>7</td><td>Unstructured vs structured?</td><td>Unstructured: broad, early in the project, hardest to conduct. Structured: prepared specific questions, later, more closed-ended.</td></tr></table><p><b>MCQ 1:</b> NOT a purpose of the requirements definition → <b>Create cost/benefit analysis</b> (that is economic feasibility, proposal section 5). Careful: \"a very high-level explanation\" is also arguably wrong, because the definition makes requirements <b>detailed</b>. If only one answer, choose cost/benefit.</p><p><b>MCQ 2:</b> functional requirement → <b>Access to the customer order system</b>. The rest are nonfunctional: English and Spanish = cultural/political; Blackberry and browsers = operational; updated every 5 seconds = performance.</p>"
   }
  ],
  "example": {
   "problem": "<p>A reviewer reads the café app requirements. For each one, which requirements check (Validity, Consistency, Completeness, Realism, Verifiability) fails?</p><ol><li>\"The menu screen must be user-friendly.\"</li><li>R5: \"Orders are taken only at the counter.\" R9: \"Customers order from their table with the app.\"</li><li>\"The system must work offline, sync instantly with 50 branches, and cost under $300.\"</li><li>The owner's main problem is long queues, but the requirements only describe a loyalty-points game.</li><li>Payment and ordering are described, but nothing about cancelling an order, which the owner asked for.</li></ol>",
   "solution": "<ol><li><b>Verifiability</b>: \"user-friendly\" cannot be checked. Better: \"a new customer can place an order in under 60 seconds.\"</li><li><b>Consistency</b>: R5 and R9 conflict.</li><li><b>Realism</b>: not possible with that budget and technology.</li><li><b>Validity</b>: the functions do not support the customer's real need.</li><li><b>Completeness</b>: a function the customer needs is missing.</li></ol><p>Bonus: if nobody knows <b>who asked</b> for the loyalty game, that fails the review check <b>Traceability</b>.</p>"
  },
  "check": [
   {
    "q": "Why is requirements validation so important? Give the number.",
    "a": "Fixing a requirements error after delivery may cost up to <b>100 times</b> the cost of fixing an implementation error."
   },
   {
    "q": "Match: (i) \"Are there any requirements conflicts?\" (ii) \"Is the origin of the requirement clearly stated?\" (iii) \"Can it be changed without a large impact on other requirements?\"",
    "a": "(i) Consistency (ii) Traceability (iii) Adaptability."
   },
   {
    "q": "Which validation technique uses an executable model of the system?",
    "a": "<b>Prototyping.</b> (Reviews = manual analysis; test-case generation = writing tests to check testability.)"
   },
   {
    "q": "Give the 3 reasons requirements change.",
    "a": "1) The business and technical environment changes after installation (hardware, interfaces, priorities, laws). 2) Payers are rarely the users, so their constraints conflict. 3) Diverse users with conflicting needs, so the requirements are a compromise that must be rebalanced."
   },
   {
    "q": "Which proposal section has sequence diagrams, communication diagrams, behavioral-state machines and a CRUDE matrix? Which has CRC cards and class diagrams?",
    "a": "9 Behavioral Models; 8 Structural Models."
   },
   {
    "q": "His W6-S3 MCQ: \"Which is NOT a purpose of the requirements definition?\"",
    "a": "<b>Create cost/benefit analysis</b>: it belongs to the feasibility analysis (economic feasibility), a separate section."
   }
  ],
  "exam": {
   "question": "<p>List the ten sections of the system proposal and briefly describe each.</p>",
   "answer": "<ol><li><b>Table of Contents.</b></li><li><b>Executive Summary</b>: all essential information, so a busy executive can read it quickly and decide what to read in depth.</li><li><b>System Request</b>: the revised system request form.</li><li><b>Workplan</b>: the original workplan, revised after analysis.</li><li><b>Feasibility Analysis</b>: revised, using information from analysis.</li><li><b>Requirements Definition</b>: the functional and nonfunctional business requirements.</li><li><b>Functional Model</b>: activity diagram, use case descriptions and use-case diagram (the processes the system must support).</li><li><b>Structural Models</b>: CRC cards, class diagram, object diagrams (structure of the to-be system, maybe also the as-is).</li><li><b>Behavioral Models</b>: sequence diagrams, communication diagrams, behavioral-state machines, CRUDE matrix (internal behavior of the to-be system).</li><li><b>Appendices</b>: supporting material, e.g. questionnaire or interview results.</li></ol>"
  },
  "memorize": [
   "Validation = requirements define what the customer really wants; late error up to 100×",
   "5 checks: Validity, Consistency, Completeness, Realism, Verifiability",
   "3 techniques: reviews (manual), prototyping (executable model), test-case generation",
   "Reviews: regular, client + contractor staff, formal or informal",
   "4 review checks: Verifiability, Comprehensibility, Traceability, Adaptability",
   "Req. management: track each requirement, link dependent ones, formal change process",
   "Why change: environment changes · payers ≠ users · diverse users",
   "Proposal: Contents, Exec Summary, Request, Workplan, Feasibility, Requirements Def, Functional, Structural, Behavioral, Appendices",
   "Sections 3–5 are REVISED old documents; 7–9 are the three models"
  ],
  "note": "The proposal's model types (use cases, CRC cards, sequence diagrams, CRUDE matrix) are only named on W6; W7 starts teaching the functional models. W6-S3 MCQ1 has two arguable answers; pick cost/benefit analysis if only one is allowed. Review question 4: the slides never say \"skipped\"; the answer is inferred from the BPA/BPI/BPR time differences."
 },
 {
  "id": "W7-1",
  "label": "W7·1",
  "week": "W7",
  "slides": [
   2,
   3,
   4,
   5,
   6,
   7,
   8,
   9,
   23,
   24,
   26,
   27
  ],
  "kind": "theory",
  "title": "From requirements to functional models: where use cases and activity diagrams fit",
  "hook": "After this lesson you can explain what the analysis phase produces, the three subphases and three activities of requirements work, and what a use case and an activity diagram are for.",
  "cards": [
   {
    "h": "Where we are: the end of analysis",
    "body": "<p>Think of the university course-registration project. Planning gave us a <b>system request</b>. Now analysis must turn it into a <b>system proposal</b> that management can approve.</p><p>The S2 \"equation\":</p><p><b>Requirements definition + Models + Feasibility analysis + Workplan = System proposal</b></p><p>On the slide, every box has a green tick except <b>Models</b>. That is this week: the <b>functional models</b> (use cases and activity diagrams).</p><p>Same list as W5b-S2 (system proposal = requirements definition + models + feasibility + workplan).</p>",
    "diagram": "flowchart LR\n  SR[\"System request\"] --> RD[\"Requirements definition\"]\n  RD --> SP([\"System proposal\"])\n  M[\"Models: use cases and activity diagrams\"] --> SP\n  FA[\"Feasibility analysis\"] --> SP\n  WP[\"Workplan\"] --> SP\n  style M fill:#ffe9b3,stroke:#c98a00"
   },
   {
    "h": "Requirements work: 3 subphases and 3 activities",
    "body": "<p><b>Three overlapping subphases</b> (S3):</p><ol><li><b>Analysis</b>: find the functions together with stakeholders. This is where <b>elicitation</b> happens.</li><li><b>Modeling</b>: organize the requirements, often with <b>UML diagrams</b> (use cases, activity diagrams).</li><li><b>Definition / Specification</b>: write down precise, <b>verifiable</b> requirements.</li></ol><p><b>Three major activities</b> (S4):</p><ol><li><b>Requirements anticipation</b>: guess likely problems and features from <b>past experience</b>, before deep study.</li><li><b>Requirements investigation</b>: study the current system with fact-finding, prototyping and computer tools. \"The <b>heart</b> of systems analysis.\"</li><li><b>Requirements specification</b>: analyze the facts, pick the essential requirements, describe the new system, choose a strategy.</li></ol><p>Memory trick: <b>A-I-S</b> = Anticipate, Investigate, Specify.</p>"
   },
   {
    "h": "Fact-finding techniques (a quick review)",
    "body": "<table><tr><th>Technique</th><th>Strength</th><th>Limitation</th></tr><tr><td><b>Interview</b> (structured or unstructured)</td><td>Accurate, you can clarify at once; unstructured finds unexpected, deep info</td><td>Time-consuming, depends on interviewer skill, may miss the big picture</td></tr><tr><td><b>Questionnaire</b></td><td>Cheap, reaches people far away, good for usage patterns</td><td>No follow-up, low response rates, hard to design</td></tr><tr><td><b>Document analysis</b></td><td>Non-intrusive, shows formal rules and history</td><td>Documents may be old or incomplete</td></tr><tr><td><b>Observation</b></td><td>Shows what people <b>do</b>, not only what they <b>say</b></td><td>Observer effect, slow, may miss rare but critical events</td></tr></table><p>Two extras on S6 (\"don't forget\"): <b>JAD</b> = facilitated group sessions where stakeholders and analysts define requirements and bound scope together. <b>PIECES</b> = question categories: <b>P</b>erformance, <b>I</b>nformation and data, <b>E</b>conomy, <b>C</b>ontrol, <b>E</b>fficiency, <b>S</b>ervices.</p><p>Small naming note: S6 says Joint Application <b>Design</b>; W6-S4 said <b>Development</b>. Both mean JAD.</p>"
   },
   {
    "h": "Three types of requirements",
    "body": "<ul><li><b>Functional</b>: what the product should do (and should not do). Locally verifiable. Example: \"The student can register for a course.\"</li><li><b>Non-functional (quality)</b>: properties of the whole system: performance, usability, security, reliability. Example: \"The page loads in under 2 seconds.\"</li><li><b>Constraints</b>: limits on <b>how</b> we may build it: technology, budget, regulation. Example: \"Must run on the university's Oracle server.\"</li></ul><p>A good requirement is <b>verifiable</b> (you can test it). Slide example: \"Visual feedback from tapping a control shall be displayed within <b>100 ms</b> of the tap.\"</p><p>Why it matters this week: <b>use cases model functional requirements only</b>. \"Fast\" or \"beautiful\" never becomes a use case.</p>"
   },
   {
    "h": "Functional modeling = use cases + activity diagrams",
    "body": "<p><b>Functional models</b> describe business processes and how the information system interacts with its environment (S24).</p><p>In object-oriented development we use two kinds:</p><ul><li><b>Use-case diagrams</b> (with use-case descriptions): the <b>basic functions</b> of the system, seen from the user's side. They show <b>WHAT</b> the system should do.</li><li><b>Activity diagrams</b>: the logic of <b>business processes and workflows</b>. They show <b>HOW</b> the system reaches its goals (S68).</li></ul><p>Both can describe the <b>as-is</b> (current) system and the <b>to-be</b> (new) system.</p><p>S23: the <b>functional</b>, <b>structural</b> and <b>behavioral</b> views of an object-oriented system are <b>interlinked and depend on each other</b>. This week is the functional view.</p>",
    "diagram": "flowchart LR\n  F[\"Functional view: use cases, activity diagrams\"] <--> S[\"Structural view\"]\n  F <--> B[\"Behavioral view\"]\n  S <--> B\n  style F fill:#ffe9b3,stroke:#c98a00"
   },
   {
    "h": "What is a use case?",
    "body": "<p>A use case is <b>one job the system does for someone</b>. Example: \"Register for course\".</p><p>Slide definitions:</p><ul><li>\"A sequence of actions a system performs that yields an <b>observable result of value</b> to a particular <b>actor</b>\" (S8).</li><li>\"A set of activities performed to produce some output result\" (S26).</li><li>\"A formal way of representing the way a business system interacts with its environment\" (S27).</li></ul><p><b>Event-driven</b> idea (S26): the system rests and waits. A <b>trigger event</b> happens. The system and its users do the steps of the use case. Then the system goes back to waiting.</p><p>A use case is an <b>external, functional view</b>: it shows how <b>users</b> see the process, not the internal mechanism (S27). It can document the as-is or the to-be system.</p>",
    "diagram": "flowchart LR\n  W([\"System at rest, waiting\"]) -->|trigger event| R[\"System and user perform the use-case steps\"]\n  R -->|finished| W"
   }
  ],
  "example": {
   "problem": "<p>For a Tashkent café ordering app, classify each requirement: (a) the customer can order a drink from the menu; (b) the menu screen opens in under 1 second; (c) the app must use the bank's existing payment API; (d) the manager can see daily sales; (e) customer data must be encrypted.</p>",
   "solution": "<ul><li>(a) <b>Functional</b>: something the system does. It will become a use case: <i>Order drink</i>.</li><li>(b) <b>Non-functional</b> (performance). Not a use case.</li><li>(c) <b>Constraint</b> (technology limit on how we build it).</li><li>(d) <b>Functional</b>. Use case: <i>View daily sales</i>.</li><li>(e) <b>Non-functional</b> (security).</li></ul><p>Only (a) and (d) appear on the use-case diagram.</p>"
  },
  "check": [
   {
    "q": "Complete: Requirements definition + ____ + Feasibility analysis + Workplan = ____.",
    "a": "<b>Models</b>; <b>System proposal</b>."
   },
   {
    "q": "Name the three subphases of requirements work. In which one does elicitation happen?",
    "a": "Analysis, Modeling, Definition/Specification. Elicitation happens in <b>Analysis</b>."
   },
   {
    "q": "Which major activity is \"the heart of systems analysis\"?",
    "a": "<b>Requirements investigation</b>: studying the current system with fact-finding techniques, prototyping and computer-assisted tools."
   },
   {
    "q": "What does PIECES stand for?",
    "a": "Performance, Information and data, Economy, Control, Efficiency, Services."
   },
   {
    "q": "Use cases show ____ the system does; activity diagrams show ____ it does it.",
    "a": "<b>What</b>; <b>how</b>."
   },
   {
    "q": "What is a trigger, and what does the system do when there is no event?",
    "a": "The event that starts a use case. With no events the system is <b>at rest</b>, waiting for the next trigger."
   }
  ],
  "exam": {
   "question": "<p>Name and explain the two types of functional models used in object-oriented analysis. What does \"event-driven modeling\" mean for use cases?</p>",
   "answer": "<p>Functional models describe business processes and the interaction of the system with its environment. Two types:</p><p><b>1. Use cases / use-case diagrams</b>: describe the basic functions of the system from the user's (external) point of view: <b>what</b> the system should do. A use case is a sequence of actions that gives an observable result of value to an actor.</p><p><b>2. Activity diagrams</b>: model the logic of business processes and workflows: <b>how</b> the system accomplishes its goals.</p><p>Both can model the as-is and the to-be system.</p><p><b>Event-driven</b>: everything the system does is a response to a <b>trigger event</b>. With no event the system is at rest; when a trigger occurs, the system and its users perform the use-case actions and then return to waiting.</p>"
  },
  "memorize": [
   "Requirements definition + Models + Feasibility + Workplan = System proposal",
   "3 subphases: Analysis (elicitation) → Modeling (UML) → Definition/Specification",
   "3 activities: Anticipation → Investigation (the heart) → Specification",
   "Fact-finding: interview, questionnaire, document analysis, observation (+ JAD, PIECES)",
   "PIECES = Performance, Information, Economy, Control, Efficiency, Services",
   "Requirement types: functional, non-functional (quality), constraints; must be verifiable",
   "Functional models = use-case diagrams (WHAT) + activity diagrams (HOW); as-is or to-be",
   "Use case = sequence of actions → observable result of value to an actor; event-driven"
  ]
 },
 {
  "id": "W7-2",
  "label": "W7·2",
  "week": "W7",
  "slides": [
   35,
   45,
   46,
   47,
   48,
   49,
   50,
   51,
   52,
   53,
   61,
   62,
   94,
   95
  ],
  "kind": "theory",
  "title": "Use-case diagram elements: actors, use cases, boundary and the four relationships",
  "hook": "After this lesson you can name every symbol on a use-case diagram and choose correctly between association, include, extend and generalization (and draw the arrows the right way).",
  "cards": [
   {
    "h": "Actor: a role, not a person",
    "body": "<p>An <b>actor</b> is a <b>role</b> that someone or something plays when it uses the system. Aziz can be a \"Student\" today and a \"Teaching Assistant\" tomorrow: two actors, one person.</p><ul><li>A person <b>or another system</b> that gets benefit from the subject and is <b>external</b> to it.</li><li>Drawn as a <b>stick figure</b> (default). A non-human system can be a <b>rectangle with «actor»</b> and its name.</li><li>Labelled with its <b>role</b>; placed <b>outside</b> the subject boundary.</li><li>Gives input, receives output, or both.</li></ul><p>Is it an actor? S47 test (picture below). Trap: a database <b>inside</b> your own system (for example, the library's own borrower database) is <b>not</b> an actor, because you design it.</p>",
    "diagram": "flowchart TD\n  S(( )) --> Q1{\"Is the thing a real person interacting with the system?\"}\n  Q1 -->|Yes| A([\"Probably an actor\"])\n  Q1 -->|No| Q2{\"Can I change it within my system's design?\"}\n  Q2 -->|No| A\n  Q2 -->|Yes| N([\"Probably NOT an actor: part of the system\"])\n  style S fill:#222,stroke:#222"
   },
   {
    "h": "Use case, subject boundary, association",
    "body": "<p><b>Use case</b> = an <b>oval</b>. A major piece of system functionality that benefits an actor. Name = <b>verb–noun</b> phrase (\"Register for Course\", not \"Registration\"). Placed <b>inside</b> the boundary. It can include or extend another use case.</p><p><b>Subject boundary</b> = a <b>box</b> with the system name inside or on top. It shows the <b>scope</b>: use cases inside, actors outside. Deciding where to draw it is one of the hardest decisions (S51).</p><p><b>Association</b> = a <b>solid line</b> from actor to use case: \"this actor uses this function\". Normally two-way communication. If information goes only one way, add a solid arrowhead. The slides show <b>*</b> at both ends (multiplicity: many).</p>",
    "diagram": "flowchart LR\n  ST([\"👤 Student\"])\n  subgraph SYS[\"Course Registration System\"]\n    U1((\"Register for course\"))\n    U2((\"View timetable\"))\n  end\n  RO([\"🖥 «actor» Registrar Database\"])\n  ST --- U1\n  ST --- U2\n  U1 --- RO"
   },
   {
    "h": "«include»: always, every time",
    "body": "<p><b>Include</b> = the functionality of one use case is <b>inside</b> another. It is <b>mandatory</b>: it happens <b>every time</b>.</p><p>Draw: a <b>dashed arrow</b> labelled «include», <b>from the base use case to the included (used) one</b>.</p><p>Example: every time a student registers, the system checks prerequisites. So <i>Register for course</i> --«include»--&gt; <i>Check prerequisites</i>.</p><p>Why use it? To reuse shared behaviour. In S62, both <i>Create a new Blog Account</i> and <i>Create a new Personal Wiki</i> include <i>Check Identity</i>, so we write it once.</p>",
    "diagram": "flowchart LR\n  ST([\"👤 Student\"])\n  subgraph SYS[\"Course Registration System\"]\n    R((\"Register for course\"))\n    P((\"Check prerequisites\"))\n    D((\"Drop course\"))\n  end\n  ST --- R\n  ST --- D\n  R -.->|include| P"
   },
   {
    "h": "«extend»: only sometimes, under a condition",
    "body": "<p><b>Extend</b> = <b>optional</b> or <b>conditional</b> behaviour added to a base use case.</p><p>Draw: a <b>dashed arrow</b> labelled «extend», <b>from the extension (optional) use case to the base use case</b>. Write the condition next to it.</p><p>Example: if the course is full, the student may join a waiting list. <i>Join waiting list</i> --«extend» [course full]--&gt; <i>Register for course</i>.</p><p><b>Arrow directions, the #1 trap:</b></p><table><tr><th></th><th>When?</th><th>Arrow goes</th></tr><tr><td>«include»</td><td>always</td><td>base → included</td></tr><tr><td>«extend»</td><td>sometimes</td><td>optional → base</td></tr></table><p>Memory trick: the arrow always starts at the use case that \"knows\" about the other. The base knows what it includes; the extension knows what it extends.</p>",
    "diagram": "flowchart LR\n  ST([\"👤 Student\"])\n  subgraph SYS[\"Course Registration System\"]\n    R((\"Register for course\"))\n    P((\"Check prerequisites\"))\n    W((\"Join waiting list\"))\n  end\n  ST --- R\n  R -.->|include| P\n  W -.->|\"extend: course is full\"| R"
   },
   {
    "h": "Generalization: \"is a kind of\"",
    "body": "<p><b>Generalization</b> = a solid line with a <b>hollow triangle</b> pointing to the <b>more general</b> element. The special one inherits everything from the general one and adds something.</p><ul><li><b>Actors</b> (S46): <i>New Patient</i> and <i>Old Patient</i> are kinds of <i>Patient</i>. The arrow goes from the specialized actor to the general actor.</li><li><b>Use cases</b> (S52): <i>Create a new Regular Blog Account</i> and <i>Create a new Editorial Blog Account</i> are kinds of <i>Create a new Blog Account</i> (S62). Arrow from the specialized use case to the base use case.</li></ul><p>The four relationships of S35: <b>association, extend, include, generalization</b>.</p><p>(In our Mermaid pictures the hollow triangle is shown as a solid arrow with the label \"is a kind of\". On paper, draw the hollow triangle.)</p>",
    "diagram": "flowchart BT\n  NP([\"👤 New Patient\"]) -->|is a kind of| P([\"👤 Patient\"])\n  OP([\"👤 Old Patient\"]) -->|is a kind of| P"
   },
   {
    "h": "Read a full diagram: the Appointment System (S53)",
    "body": "<p>This doctor's-office diagram (S53, again on S28 and S95) uses every element:</p><ul><li><b>Actors</b>: Management, Doctor, Patient, New Patient, Old Patient (New/Old are kinds of Patient).</li><li><b>Three primary use cases</b> (S49): <i>Manage Appointments</i>, <i>Produce Schedule(s)</i>, <i>Record Availability</i>.</li><li><b>Generalization</b>: <i>Make Old Patient Appt</i> and <i>Make New Patient Appt</i> are kinds of <i>Manage Appointments</i>.</li><li><b>Extend</b>: <i>Make Payment Arrangements</i> → <i>Manage Appointments</i>; <i>Update Patient Information</i> → <i>Make Old Patient Appt</i>.</li><li><b>Include</b>: <i>Make New Patient Appt</i> → <i>Create New Patient</i>; <i>Produce Schedules</i> → <i>Manage Schedule</i>; <i>Record Availability</i> → <i>Manage Schedule</i>.</li></ul><p>Read it aloud: \"A new patient's appointment <b>always</b> creates a new patient record; an old patient <b>may</b> update his information.\"</p>",
    "diagram": "flowchart LR\n  MG([\"👤 Management\"])\n  DR([\"👤 Doctor\"])\n  subgraph AS[\"Appointment System\"]\n    MA((\"Manage Appointments\"))\n    MP((\"Make Payment Arrangements\"))\n    MO((\"Make Old Patient Appt\"))\n    MN((\"Make New Patient Appt\"))\n    UP((\"Update Patient Information\"))\n    CN((\"Create New Patient\"))\n    PS((\"Produce Schedules\"))\n    RA((\"Record Availability\"))\n    MS((\"Manage Schedule\"))\n  end\n  NP([\"👤 New Patient\"])\n  OP([\"👤 Old Patient\"])\n  PA([\"👤 Patient\"])\n  MP -.->|extend| MA\n  MO -->|is a kind of| MA\n  MN -->|is a kind of| MA\n  UP -.->|extend| MO\n  MN -.->|include| CN\n  PS -.->|include| MS\n  RA -.->|include| MS\n  MG --- PS\n  DR --- RA\n  OP --- MO\n  NP --- MN\n  NP -->|is a kind of| PA\n  OP -->|is a kind of| PA"
   }
  ],
  "example": {
   "problem": "<p>(S61) Weblog content management system (CMS).<br><b>A.1</b> The CMS shall allow an administrator to create a new blog account, provided the personal details of the new blogger are verified using the Author Credentials Database.<br><b>A.2</b> The CMS shall allow an administrator to create a new personal Wiki, provided the personal details of the applying author are verified using the Author Credentials Database.<br>Extra (from S62): there are regular and editorial blog accounts, and a failed application is recorded. Draw the use-case diagram.</p>",
   "solution": "<ul><li><b>Actors</b>: Administrator (person); Author Credentials Database (an outside system we cannot change, so an actor).</li><li><b>Use cases</b>: Create a new Blog Account; Create a new Personal Wiki.</li><li>Both <b>always</b> verify details → shared mandatory behaviour → <i>Check Identity</i> with two <b>«include»</b> arrows (base → Check Identity). Check Identity talks to the credentials database (association).</li><li>Recording a failure happens <b>only if</b> the check fails → <i>Record Application Failure</i> <b>«extend»</b>s both create use cases (arrow from Record… to the base).</li><li>Regular and Editorial blog accounts are kinds of Blog Account → <b>generalization</b>.</li></ul>",
   "diagram": "flowchart LR\n  AD([\"👤 Administrator\"])\n  subgraph CMS[\"Content Management System\"]\n    W((\"Create a new Personal Wiki\"))\n    B((\"Create a new Blog Account\"))\n    CI((\"Check Identity\"))\n    RF((\"Record Application Failure\"))\n    RB((\"Create Regular Blog Account\"))\n    EB((\"Create Editorial Blog Account\"))\n  end\n  DB([\"🖥 Author Credentials Database\"])\n  AD --- W\n  AD --- B\n  W -.->|include| CI\n  B -.->|include| CI\n  RF -.->|extend| W\n  RF -.->|extend| B\n  RB -->|is a kind of| B\n  EB -->|is a kind of| B\n  CI --- DB"
  },
  "check": [
   {
    "q": "(His S94 quiz) ____ diagrams are simply a graphical overview of the set of functions contained in the system. They illustrate the main functionality of a system and the actors that interact with the system.",
    "a": "<b>Use-case</b> diagrams."
   },
   {
    "q": "Is an actor a specific user? How do you draw a non-human actor?",
    "a": "No. An actor is a <b>role</b> a user plays. A non-human actor (another system) can be drawn as a rectangle with «actor» and its name (or a stick figure)."
   },
   {
    "q": "Which way does the «extend» arrow point? And «include»?",
    "a": "«extend»: from the <b>extension (optional)</b> use case <b>to the base</b>. «include»: from the <b>base</b> to the <b>included (used)</b> use case."
   },
   {
    "q": "Every time a customer pays online, the system verifies the card. Include or extend?",
    "a": "<b>Include</b>: it happens every time (mandatory). <i>Pay online</i> --«include»--&gt; <i>Verify card</i>."
   },
   {
    "q": "A customer may add a gift message to an order. Include or extend?",
    "a": "<b>Extend</b>: optional. <i>Add gift message</i> --«extend»--&gt; <i>Place order</i>."
   },
   {
    "q": "List the four use-case relationships (S35).",
    "a": "Association, extend, include, generalization."
   }
  ],
  "exam": {
   "question": "<p>Name the elements of a use-case diagram. For each, give its symbol and one rule. Explain the difference between «include» and «extend».</p>",
   "answer": "<table><tr><th>Element</th><th>Symbol</th><th>Rule</th></tr><tr><td>Actor</td><td>stick figure, or rectangle with «actor» for a system</td><td>a role, external, outside the boundary, labelled with its role</td></tr><tr><td>Use case</td><td>oval</td><td>major function, verb–noun name, inside the boundary</td></tr><tr><td>Subject boundary</td><td>box with the system name</td><td>shows the scope of the system</td></tr><tr><td>Association</td><td>solid line</td><td>links an actor with the use cases it interacts with</td></tr><tr><td>Include</td><td>dashed arrow «include»</td><td>from base to included use case</td></tr><tr><td>Extend</td><td>dashed arrow «extend»</td><td>from extension to base use case</td></tr><tr><td>Generalization</td><td>solid line, hollow triangle</td><td>from the specialized to the general actor or use case</td></tr></table><p><b>Include vs extend:</b> include = behaviour that is <b>mandatory</b>, performed <b>every time</b> the base runs (often shared by several use cases). Extend = <b>optional/conditional</b> behaviour, performed only when a condition holds. Example: <i>Register for course</i> includes <i>Check prerequisites</i>; <i>Join waiting list</i> extends <i>Register for course</i> [course full].</p>"
  },
  "memorize": [
   "Actor = role (person or system), stick figure or «actor» box, OUTSIDE the boundary",
   "Use case = oval, verb–noun, INSIDE the boundary",
   "Subject boundary = box = scope of the system",
   "Association = solid line actor–use case (arrowhead only if one-way)",
   "«include» = always; dashed arrow base → included",
   "«extend» = optional/conditional; dashed arrow extension → base (+ condition)",
   "Generalization = hollow triangle toward the general actor or use case",
   "4 relationships: association, extend, include, generalization",
   "Inside your design (own database) = NOT an actor"
  ],
  "note": "S91 writes {include} and {extend} in curly braces. The standard UML notation (S52, S62) is «include» and «extend» in guillemets: use those on the exam."
 },
 {
  "id": "W7-3",
  "label": "W7·3",
  "week": "W7",
  "slides": [
   10,
   11,
   12,
   13,
   14,
   15,
   16,
   17,
   18,
   19,
   20,
   21,
   22,
   54,
   55,
   56,
   57,
   58,
   59,
   60,
   90,
   91
  ],
  "kind": "drawing",
  "title": "Drawing a use-case diagram step by step (by hand and with AI)",
  "hook": "After this lesson you can turn a text description into a correct use-case diagram: find the actors and use cases, add include/extend, draw the boundary, and check it against the classic error list.",
  "cards": [
   {
    "h": "Step A: identify the major use cases (5 steps)",
    "body": "<p>Before drawing anything, find the content (S54–S55):</p><ol><li><b>Review the requirements definition</b>: get the full picture of the business process.</li><li><b>Identify the subject's boundary</b>: what is inside the system? (It will probably change later.)</li><li><b>Identify the primary actors and their goals</b>: they come from the list of stakeholders and users.</li><li><b>Identify the business processes and major use cases</b>.</li><li><b>Review the current set of use cases</b>: <b>split</b> some, <b>merge</b> others.</li></ol><p>Practical trick on the exam: underline the <b>nouns that act</b> (actors) and the <b>verbs + objects</b> (use cases). Circle words like \"must / always\" (include) and \"may / if / optionally\" (extend).</p>"
   },
   {
    "h": "Step B: draw it (4 steps)",
    "body": "<p>S56 order:</p><ol><li><b>Draw the use cases</b> (ovals) found in step A. Add the special relationships now: include, extend, generalization.</li><li><b>Place the actors</b>, each one <b>near the use cases it uses</b>, so fewer lines cross.</li><li><b>Draw the subject boundary</b> around the use cases (actors stay outside). Write the system name on top.</li><li><b>Add the associations</b>: lines from each actor to its use cases.</li></ol><p><b>No order is implied</b> by the diagram: the top oval is not \"first\". Feel free to rearrange to reduce crossing lines.</p><p>On paper: human actors on the left, outside systems («actor» boxes) on the right, like S60.</p>"
   },
   {
    "h": "Worked example: reading the library text (S57–S59)",
    "body": "<table><tr><th>Sentence in the text</th><th>Element</th></tr><tr><td>\"support searching… by title, author, keywords, ISBN\"</td><td>use case <i>Search Collection</i> (the 4 ways are details, not separate use cases)</td></tr><tr><td>\"checking books out and returning books by borrowers\"</td><td>use cases <i>Borrow Books</i>, <i>Return Books</i>; actor <b>Borrower</b></td></tr><tr><td>\"students, faculty or staff, and guests\"</td><td>types of Borrower (could be shown with actor generalization)</td></tr><tr><td>\"check with the registrar's student database / personnel office's employee database\"</td><td>outside systems → actors <b>«actor» Registrar Office</b>, <b>«actor» Personnel Office</b></td></tr><tr><td>\"checked against the library's own borrower database\"</td><td>inside our system → <b>not</b> an actor</td></tr><tr><td>\"library manager… add and remove the book\"</td><td>use case <i>Maintain Book Collection</i>; actor <b>Librarian</b></td></tr><tr><td>\"Every Monday… reminder emails… fines\"</td><td>use case <i>Process Overdue Books</i> (a <b>temporal</b> trigger)</td></tr></table><p>Overdue/fine checks inside Borrow Books are <b>business rules</b>, not separate use cases.</p>"
   },
   {
    "h": "The library diagram (S60)",
    "body": "<p>Five use cases, two human actors, two system actors. Notice:</p><ul><li>Borrow Books talks to <b>both</b> outside offices to validate ID cards.</li><li>The slide keeps it simple: no include/extend.</li><li>You could add <i>Request Book</i> «extend» → <i>Search Collection</i> [book is checked out], because S57 says a borrower may request a checked-out book. Not on the slide, but a good bonus.</li></ul>",
    "diagram": "flowchart LR\n  LI([\"👤 Librarian\"])\n  BO([\"👤 Borrower\"])\n  subgraph LIB[\"Library Book Collection Management System\"]\n    PO((\"Process Overdue Books\"))\n    MB((\"Maintain Book Collection\"))\n    BB((\"Borrow Books\"))\n    SC((\"Search Collection\"))\n    RB((\"Return Books\"))\n  end\n  PE([\"🖥 «actor» Personnel Office\"])\n  RE([\"🖥 «actor» Registrar Office\"])\n  LI --- PO\n  LI --- MB\n  BO --- BB\n  BO --- SC\n  BO --- RB\n  BB --- PE\n  BB --- RE"
   },
   {
    "h": "Using AI to draft the diagram (S10–S15)",
    "body": "<p>Manual UML is slow and error-prone (ambiguities, redundancies, inconsistencies). LLMs can turn a text description into a diagram.</p><ul><li>Evidence: a 2025 study, <b>17</b> use-case exercises for master's students: LLMs reached <b>comparable completeness and redundancy</b> to humans, <b>no statistically significant difference</b>. Fine-tuned <b>GLM4UML</b>: F1 about <b>72%</b>.</li></ul><p><b>3 architectural approaches</b> (S12):</p><ol><li><b>Direct code generation</b>: LLM writes PlantUML or Mermaid code → rendered. The dominant pattern: interpretable, editable.</li><li><b>Fine-tuned domain models</b>: trained on (text, UML-code) pairs; GLM4UML used <b>10,000</b> entries (class, use case, sequence diagrams).</li><li><b>Interactive clarification loops</b>: the tool asks you about ambiguities first.</li></ol><p>Tools (S13): Visual Paradigm <b>VPasCode</b>, open-source <b>uml-gen</b> (TypeScript + Mermaid.js). Key idea: <b>diagram-as-code</b>, editable source, not a picture.</p><p><b>5-step prompting workflow</b> (S14): prepare the input → specify notation and constraints → generate, then audit against the text → iterate with focused corrections → validate structurally.</p><p>S15: manual = slow, analyst resolves ambiguity, human is the <b>Author</b>. LLM = seconds, may repeat systematic errors, human is the <b>Auditor and corrector</b>.</p>"
   },
   {
    "h": "The audit checklist: use it on YOUR diagram too",
    "body": "<p>Prompt A (naive) just says \"Draw a use case diagram\". Prompt B (constrained, S18) sets rules: actors outside the boundary; verb–noun names; «include» only for mandatory, «extend» only for optional with the condition labelled; generalization for shared actor roles; <b>do not invent</b> actors; <b>do not model business rules</b> as use cases; give a traceability table.</p><p><b>Audit</b> (S20): for every element, find the sentence that justifies it. No sentence → delete.</p><p><b>Classic error list</b> (S21), check before you hand in:</p><ol><li>Invented actors</li><li>Business rules promoted to use cases (\"at most 3 slots\", \"fee if &lt; 24 h\")</li><li>«extend» arrow the wrong way (must go optional → base)</li><li>«extend» used for mandatory behaviour</li><li>Non-human actors missing or drawn as human</li><li>Generic names: Manage system, Handle data, Process request</li><li>Two near-identical use cases instead of an actor generalization</li><li>No system boundary</li></ol><p><b>Iterate</b> (S22): send targeted corrections (\"remove actor X\", \"reverse the extend arrow\"), do not regenerate from scratch.</p>"
   }
  ],
  "example": {
   "problem": "<p><b>His in-class practice (S16): HerbHub, rooftop greenhouse irrigation.</b> 20 plots rented by residents. Plot holders look up soil moisture for their plot and book a watering slot (max 3 per week). They can cancel a booking (fee if less than 24 h before). The garden coordinator approves new plot applications, can suspend a plot holder's account, and runs a monthly water usage report for the building committee. The Weather Service supplies a daily forecast (HerbHub skips watering when rain is expected). The Irrigation Controller opens and closes valves: HerbHub sends it watering commands and receives fault alerts from it. If the controller reports a faulty valve, the coordinator may manually open a valve, bypassing the schedule. Fault alerts are also logged for maintenance. Draw the use-case diagram.</p>",
   "solution": "<p><b>Actors</b>: Plot Holder, Garden Coordinator (people); Weather Service, Irrigation Controller (outside systems → «actor»).<br><b>NOT actors</b>: Building Committee (it only receives the report, it never touches the system: S21 lists it as an invented actor), Payment Gateway, Administrator.</p><p><b>Use cases</b> (verb–noun): Apply for plot (implied by \"approves new plot applications\"), View soil moisture, Book watering slot, Cancel booking, Approve plot application, Suspend account, Run water usage report, Receive daily forecast, Water plots automatically, Receive fault alert, Log fault alert, Open valve manually.</p><p><b>Business rules, NOT use cases</b>: \"max 3 slots per week\", \"fee if &lt; 24 h\", \"skip watering when rain expected\". (\"Pay fee\" → delete: no sentence says anyone pays in the system.)</p><p><b>Relationships</b>: fault alerts are <b>always</b> logged → <i>Receive fault alert</i> «include» <i>Log fault alert</i>. Manual opening happens <b>only if</b> a valve fault is reported → <i>Open valve manually</i> «extend» <i>Water plots automatically</i> [valve fault reported], arrow from the optional case to the base, as in the slide's own S19 output.</p>",
   "diagram": "flowchart LR\n  PH([\"👤 Plot Holder\"])\n  GC([\"👤 Garden Coordinator\"])\n  subgraph HH[\"HerbHub\"]\n    U1((\"Apply for plot\"))\n    U4((\"View soil moisture\"))\n    U5((\"Book watering slot\"))\n    U6((\"Cancel booking\"))\n    U2((\"Approve plot application\"))\n    U3((\"Suspend account\"))\n    U7((\"Run water usage report\"))\n    U8((\"Receive daily forecast\"))\n    U9((\"Water plots automatically\"))\n    U10((\"Receive fault alert\"))\n    U11((\"Log fault alert\"))\n    U12((\"Open valve manually\"))\n  end\n  WS([\"🖥 «actor» Weather Service\"])\n  IC([\"🖥 «actor» Irrigation Controller\"])\n  PH --- U1\n  PH --- U4\n  PH --- U5\n  PH --- U6\n  GC --- U2\n  GC --- U3\n  GC --- U7\n  GC --- U12\n  U8 --- WS\n  U9 --- IC\n  U10 --- IC\n  U10 -.->|include| U11\n  U12 -.->|\"extend: valve fault reported\"| U9"
  },
  "check": [
   {
    "q": "Give the 5 steps for identifying the major use cases.",
    "a": "Review the requirements definition; identify the subject's boundary; identify the primary actors and their goals; identify the business processes and major use cases; review the use cases (split or merge)."
   },
   {
    "q": "Give the 4 steps for drawing a use-case diagram.",
    "a": "Draw the use cases (+ include/extend/generalization); place the actors near their use cases; draw the subject boundary; add the associations."
   },
   {
    "q": "In the library system, why is the library's own borrower database not an actor, but the Registrar Office is?",
    "a": "The borrower database is <b>inside</b> our system (we design and can change it). The registrar's student database belongs to another office: an <b>external system</b> we cannot change, so it is an actor."
   },
   {
    "q": "Name the 3 architectural approaches for AI-generated UML. Which is dominant?",
    "a": "Direct code generation (dominant: interpretable, editable, fits documentation), fine-tuned domain models (e.g., GLM4UML), interactive clarification loops."
   },
   {
    "q": "In LLM-assisted modeling, what is the human's role?",
    "a": "<b>Auditor and corrector</b> (in manual modeling the human is the <b>author</b>)."
   },
   {
    "q": "Name four items of the classic AI error list.",
    "a": "Any four: invented actors; business rules as use cases; extend arrow wrong way; extend used for mandatory behaviour; non-human actors missing/drawn as human; generic names; near-identical use cases instead of actor generalization; no system boundary."
   }
  ],
  "exam": {
   "question": "<p><b>(His S90 exercise)</b> A browser-based training system helps people prepare for the Certified Java Programmer exam. (1) A user can request a quiz. The system picks a set of questions from its database and composes them into a quiz. It rates the user's answers and gives hints if the user requests it. (2) Tutors provide questions and hints. Examinators must certify questions to make sure they are not too trivial and that they are sensical. Make a use-case diagram.</p>",
   "answer": "<p><b>Actors</b>: User, Tutor, Examinator (all human, outside the boundary). The question database is inside the system → not an actor.</p><p><b>Use cases</b>: <i>Make a quiz</i> (User); <i>Report result</i> (rating the answers); <i>Provide hint</i>; <i>Add questions</i> and <i>Add hints</i> (Tutor); <i>Certify questions</i> (Examinator).</p><p><b>Relationships</b> (as on his S91 answer):</p><ul><li><i>Make a quiz</i> «include» <i>Report result</i>: answers are always rated.</li><li><i>Provide hint</i> «extend» <i>Make a quiz</i> [user requests a hint]: optional, arrow toward the base.</li><li><i>Add questions</i> «include» <i>Certify questions</i>: every new question must be certified.</li></ul><p>Picking questions from the database is an internal step of <i>Make a quiz</i>, not a separate use case. <i>Add hints</i> is my addition from \"tutors provide questions and hints\" (S91 shows only Add questions).</p>",
   "diagram": "flowchart LR\n  US([\"👤 User\"])\n  subgraph TS[\"Java Certification Training System\"]\n    MQ((\"Make a quiz\"))\n    RR((\"Report result\"))\n    PH((\"Provide hint\"))\n    AQ((\"Add questions\"))\n    AH((\"Add hints\"))\n    CQ((\"Certify questions\"))\n  end\n  TU([\"👤 Tutor\"])\n  EX([\"👤 Examinator\"])\n  US --- MQ\n  MQ -.->|include| RR\n  PH -.->|\"extend: user asks for a hint\"| MQ\n  TU --- AQ\n  TU --- AH\n  AQ -.->|include| CQ\n  EX --- CQ"
  },
  "memorize": [
   "Identify: review req. definition → boundary → primary actors + goals → business processes/use cases → review (split/merge)",
   "Draw: use cases (+ special relationships) → actors near their use cases → boundary → associations",
   "No order is implied; minimize crossing lines",
   "Business rules (limits, fees, quantities) are NOT use cases",
   "Outside system = «actor»; your own database = not an actor",
   "AI approaches: direct code generation (dominant), fine-tuned models (GLM4UML, ~72% F1, 10,000 entries), clarification loops",
   "AI workflow: prepare input → notation + constraints → generate + audit → focused corrections → validate structurally",
   "Manual: human = author; LLM-assisted: human = auditor and corrector"
  ]
 },
 {
  "id": "W7-4",
  "label": "W7·4",
  "week": "W7",
  "slides": [
   28,
   29,
   30,
   31,
   32,
   33,
   34,
   35,
   36,
   37,
   38,
   39,
   40,
   41,
   42,
   43,
   44,
   63
  ],
  "kind": "drawing",
  "title": "Writing a use-case description in the slides' template",
  "hook": "After this lesson you can fill in the fully dressed use-case template (name, ID, priority, actor, trigger, pre/postconditions, normal and alternative courses, exceptions, inputs/outputs) for any function.",
  "cards": [
   {
    "h": "Why a description, and the two formats",
    "body": "<p>The diagram shows only the <b>names</b> of the functions. The <b>use-case description</b> tells the full story of one use case in a table.</p><p>The slides show the textbook example <i>Request a chemical</i> (a Lawn Chemical Applicator, LCA, asks the warehouse for a chemical) in two versions:</p><ul><li><b>Casual / simpler format</b> (S28–S30): overview, preconditions, a short normal course, postconditions, exceptions.</li><li><b>Fully dressed format</b> (S40, S42, S44): adds <b>Information for Steps</b>, <b>Alternative Courses</b> and a <b>Summary Inputs/Outputs</b> table.</li></ul><p>On the exam, use the fully dressed layout: it shows you know every part.</p>"
   },
   {
    "h": "Overview part: name, ID, priority, actor, description",
    "body": "<ul><li><b>Use-case name</b>: a <b>verb–noun</b> phrase (\"Request a chemical\").</li><li><b>ID</b> (UC-2): a unique number, so the team can <b>trace design decisions back</b> to a requirement.</li><li><b>Primary actor</b>: usually the <b>trigger</b>, the one who starts the use case. The use case exists to meet <b>this actor's goal</b>.</li><li><b>Brief description</b>: usually <b>one sentence</b>, the essence of the use case.</li><li><b>Importance level / priority</b>: which functions must be in the <b>first version</b> and which can wait.<ul><li>Fuzzy scale: High / Medium / Low, or</li><li>a weighted average of criteria. <b>Larman</b> rates each use case <b>0 to 5</b> on: (1) important business process; (2) supports revenue generation or cost reduction; (3) technology is new or risky, needs research; (4) functionality is complex, risky and/or time-critical (maybe split over versions); (5) could increase understanding of the evolving design relative to the effort.</li></ul></li></ul>"
   },
   {
    "h": "Stakeholders, trigger, relationships",
    "body": "<p><b>Stakeholders</b> (S34): everyone with an interest in the use case, each with his interest. The list <b>always includes the primary actor</b>.</p><p><b>Trigger</b>: the event that starts the use case. Two types:</p><table><tr><th>External trigger</th><th>Temporal trigger</th></tr><tr><td>something outside happens: a customer places an order, the fire alarm rings, a patient calls for an appointment</td><td>time passes: a library book becomes overdue, the rent must be paid, \"every Monday\"</td></tr></table><p>In the template: <b>Type: ☑ External ☐ Temporal</b>.</p><p><b>Relationships</b> (S35, \"sometimes also may be included\"): association, extend, include, generalization (the same four as on the diagram, see W7·2).</p>"
   },
   {
    "h": "Preconditions and postconditions: the chain",
    "body": "<p><b>Preconditions</b> = the state the system <b>must be in before</b> the use case starts. Example (S36): the LCA is authenticated; his training and credentials are up to date; the Chemical Supply datastore is available. Other use cases take care of these earlier.</p><p><b>Postconditions</b> = the <b>final products</b> of the use case. Example (S38): the request is stored, the LCA has the Pick-up Authorization, the warehouse is notified, Purchasing is notified of any outage.</p><p>Key idea: <b>the postconditions of one use case become the preconditions of the next</b> (here: picking up the chemical at the warehouse).</p><p>Café example: <i>Log in</i> → post: customer is authenticated → that is a pre of <i>Place order</i>.</p>"
   },
   {
    "h": "Normal course, alternative courses, exceptions",
    "body": "<table><tr><th></th><th>What it is</th><th>Ends in</th></tr><tr><td><b>Normal course</b> (S37)</td><td>the main steps when everything goes smoothly, with their inputs and outputs: the <b>\"happy path\"</b></td><td>success</td></tr><tr><td><b>Alternative courses</b> (S41)</td><td>other branches in the logic; you must state <b>where</b> the branch leaves the normal course (\"branch at step 5\"); steps are numbered 2a–7a, 2b–3b</td><td><b>success</b> too</td></tr><tr><td><b>Exceptions</b> (S39)</td><td>errors and unusual events, <b>not</b> normal decision branches; ask the user about special situations at each step</td><td><b>unsuccessful</b> result</td></tr></table><p>Example from S42: Alternative 1.1 \"quantity available is less than quantity needed (branch at step 5)\": the LCA takes the available quantity (2a–7a) or cancels (2b–3b). Exception E1: \"chemical is no longer approved for use\".</p><p>S39: handling exceptions can need <b>more coding effort</b> than the normal and alternative courses.</p>"
   },
   {
    "h": "Information for steps + summary inputs/outputs; the blank template",
    "body": "<p>In the fully dressed format, each step has an arrow to the data it uses: <b>&larr; input</b> (\"Chemical name or ID\", \"Quantity needed\") or <b>&rarr; output</b> (\"Chemical Pick-up Authorization\").</p><p>The last section, <b>Summary Inputs and Outputs</b> (S43–S44), lists <b>all</b> possible inputs with their <b>source</b> and all outputs with their <b>destination</b> (normal and alternative courses).</p><p><b>Blank template to copy on the exam sheet:</b></p><table><tr><td>Use Case Name:</td><td>ID:</td><td>Priority:</td></tr><tr><td colspan=\"3\">Actor:</td></tr><tr><td colspan=\"3\">Description:</td></tr><tr><td colspan=\"3\">Trigger: … Type: ☐ External ☐ Temporal</td></tr><tr><td colspan=\"3\">Preconditions: 1. … 2. …</td></tr><tr><td colspan=\"2\">Normal Course: 1.0 … 1. … 2. …</td><td>Information for Steps</td></tr><tr><td colspan=\"3\">Alternative Courses: 1.1 … (branch at step n)</td></tr><tr><td colspan=\"3\">Postconditions:</td></tr><tr><td colspan=\"3\">Exceptions: E1: … (occurs at step n)</td></tr><tr><td colspan=\"3\">Summary Inputs | Source | Outputs | Destination</td></tr></table>"
   }
  ],
  "example": {
   "problem": "<p>Write a fully dressed use-case description for <b>Borrow Books</b> in the library system (S58: three borrower types, ID card validated with the registrar's database, the personnel office's database or the library's own database; reject if the card is invalid, or the borrower has overdue books or unpaid fines; otherwise check out and update the collection database).</p>",
   "solution": "<table><tr><td><b>Use Case Name:</b> Borrow Books</td><td><b>ID:</b> UC-3</td><td><b>Priority:</b> High</td></tr><tr><td colspan=\"3\"><b>Actor:</b> Borrower</td></tr><tr><td colspan=\"3\"><b>Description:</b> The borrower presents an ID card and books. The system validates the card, checks for overdue books and unpaid fines, and checks the books out.</td></tr><tr><td colspan=\"3\"><b>Trigger:</b> A borrower wants to take books home. <b>Type:</b> ☑ External ☐ Temporal</td></tr><tr><td colspan=\"3\"><b>Preconditions:</b><br>1. The library collection database is on-line.<br>2. The registrar's and personnel office's databases are reachable.</td></tr><tr><td colspan=\"2\"><b>Normal Course:</b><br>1.0 Check out books<br>1. The borrower gives the ID card.<br>2. The system identifies the borrower type (student, faculty/staff or guest).<br>3. The system validates the card with the right database (Alternative Course 1.1).<br>4. The system checks for overdue books and unpaid fines.<br>5. The borrower presents the books.<br>6. The system records the loan and updates each book's status in the collection database.<br>7. The system prints a due-date slip.</td><td><b>Information for Steps:</b><br>&larr; ID card number<br>&larr; borrower type<br>&larr; validation result<br>&larr; overdue/fine record<br>&larr; book IDs<br>&rarr; updated book status<br>&rarr; due-date slip</td></tr><tr><td colspan=\"3\"><b>Alternative Courses:</b><br>1.1 Borrower is a guest (branch at step 3)<br>1. The system checks the card against the library's own borrower database.<br>2. Continue at step 4.</td></tr><tr><td colspan=\"3\"><b>Postconditions:</b><br>1. The loan is stored.<br>2. The collection database shows the books as checked out.<br>3. The borrower has a due-date slip.</td></tr><tr><td colspan=\"3\"><b>Exceptions:</b><br>E1: ID card is invalid (occurs at step 3)<br>1. The system displays \"Invalid ID card\".<br>2. The system rejects the request and terminates the use case.<br>E2: Borrower has overdue books or unpaid fines (occurs at step 4)<br>1. The system displays the overdue books and the fine amount.<br>2. The system rejects the request and terminates the use case.</td></tr></table><p><b>Summary Inputs / Outputs:</b></p><table><tr><th>Summary Inputs</th><th>Source</th><th>Outputs</th><th>Destination</th></tr><tr><td>ID card number</td><td>Borrower</td><td>Updated book status</td><td>Collection database</td></tr><tr><td>Student / employee validation</td><td>Registrar Office / Personnel Office</td><td>Loan record</td><td>Loan datastore</td></tr><tr><td>Overdue/fine record</td><td>Borrower datastore</td><td>Due-date slip</td><td>Borrower</td></tr><tr><td>Book IDs</td><td>Borrower</td><td>Rejection message</td><td>Borrower</td></tr></table><p>Why these choices: the guest path still ends in success → <b>alternative course</b>. Invalid card and fines end in rejection → <b>exceptions</b>. The trigger comes from outside → <b>external</b>.</p>"
  },
  "check": [
   {
    "q": "What kind of phrase is a use-case name? Why do we give an ID?",
    "a": "A <b>verb–noun</b> phrase. The ID makes every use case easy to find and lets the team <b>trace design decisions back</b> to a specific requirement."
   },
   {
    "q": "External or temporal trigger? (a) a customer places an order; (b) a library book becomes overdue; (c) the fire alarm rings; (d) the rent must be paid.",
    "a": "(a) external, (b) temporal, (c) external, (d) temporal."
   },
   {
    "q": "What is the difference between an alternative course and an exception?",
    "a": "Both branch from the normal course, but an <b>alternative course</b> still leads to a <b>successful</b> end, while an <b>exception</b> is an error or unusual event that leads to an <b>unsuccessful</b> result."
   },
   {
    "q": "Which part is called the \"happy path\"?",
    "a": "The <b>normal course</b>: the steps when everything flows smoothly."
   },
   {
    "q": "How are postconditions linked to the next use case?",
    "a": "The postconditions of one use case serve as (define) the <b>preconditions</b> of the next use case in the series."
   },
   {
    "q": "Name Larman's five criteria for the importance level (scale 0–5).",
    "a": "Important business process; supports revenue generation or cost reduction; new or risky technology needing research; complex, risky and/or time-critical functionality; increases understanding of the evolving design relative to effort."
   }
  ],
  "exam": {
   "question": "<p><b>(S63, the flashcard interview)</b> A business analyst, a teacher and two students describe a new flashcard function for a language app: students add word cards from their dictionary (several at once after a lesson), see a word without the translation, click to see the translation, mark whether they remembered it, see statistics in the card details, delete learned cards, and switch between English→Russian and Russian→English. Student 1 wants it intuitive, fast and beautiful. (a) Identify the actor and use cases and draw the use-case diagram. (b) Write the use-case description for the main use case.</p>",
   "answer": "<p><b>(a)</b> Actor: <b>Student</b>. (The teacher and the business analyst are stakeholders, but in the text they do not use the function.)<br>Use cases: <i>Add word card</i>; <i>Add several cards at once</i> (extends Add word card, after a lesson); <i>Review word cards</i>; it always includes <i>Show translation</i> and <i>Record self-check</i>; <i>Switch translation mode</i> (extends Review, optional); <i>View card statistics</i>; <i>Delete learned card</i>.<br><b>Not use cases</b>: \"intuitive, fast, beautiful, no long loading\" → <b>non-functional</b> requirements. \"Competitors already have it\" → the business reason, not a function.</p><p><b>(b)</b></p><table><tr><td><b>Use Case Name:</b> Review word cards</td><td><b>ID:</b> UC-F2</td><td><b>Priority:</b> High</td></tr><tr><td colspan=\"3\"><b>Actor:</b> Student</td></tr><tr><td colspan=\"3\"><b>Description:</b> The student goes through his word cards: he sees a word without its translation, tries to remember it, opens the translation and marks whether he remembered it. The system then shows the next card and updates the statistics.</td></tr><tr><td colspan=\"3\"><b>Stakeholders and interests:</b> Student: remember words, see progress. Teacher: consolidate the material, a kind of self-test. Business: keep the competitive advantage.</td></tr><tr><td colspan=\"3\"><b>Trigger:</b> The student opens his cards to study. <b>Type:</b> ☑ External ☐ Temporal</td></tr><tr><td colspan=\"3\"><b>Preconditions:</b><br>1. The student is logged in.<br>2. The student has at least one word card (added from his dictionary).</td></tr><tr><td colspan=\"2\"><b>Normal Course:</b><br>1.0 Review cards<br>1. The student opens his card set.<br>2. The system shows a card with the word in the current mode (English → Russian), without the translation.<br>3. The student tries to remember, then clicks the card.<br>4. The system shows the translation.<br>5. The student chooses \"remembered\" or \"not remembered\".<br>6. The system saves the answer in the card's statistics.<br>7. The system shows the next card (repeat steps 3–7 until the student stops).</td><td><b>Information for Steps:</b><br>&larr; card set<br>&rarr; word<br><br>&rarr; translation<br>&larr; self-check answer<br>&rarr; updated statistics<br>&rarr; next word</td></tr><tr><td colspan=\"3\"><b>Alternative Courses:</b><br>1.1 Student switches the mode (branch at step 2)<br>1. The student selects Russian → English.<br>2. The system shows the words in Russian; continue at step 3.<br>1.2 Student has learned the word (branch at step 5)<br>1. The student deletes the card.<br>2. The system removes the card; continue at step 7.</td></tr><tr><td colspan=\"3\"><b>Postconditions:</b><br>1. The statistics of every reviewed card are updated.<br>2. Deleted cards are removed from the set.</td></tr><tr><td colspan=\"3\"><b>Exceptions:</b><br>E1: The card set is empty (occurs at step 1)<br>1. The system displays \"No cards yet: add words from your dictionary\".<br>2. The system terminates the use case.</td></tr></table>",
   "diagram": "flowchart LR\n  ST([\"👤 Student\"])\n  subgraph APP[\"Language App: Flashcards\"]\n    AC((\"Add word card\"))\n    AM((\"Add several cards at once\"))\n    RC((\"Review word cards\"))\n    SH((\"Show translation\"))\n    RS((\"Record self-check\"))\n    SM((\"Switch translation mode\"))\n    VS((\"View card statistics\"))\n    DC((\"Delete learned card\"))\n  end\n  ST --- AC\n  ST --- RC\n  ST --- VS\n  ST --- DC\n  AM -.->|\"extend: after a lesson\"| AC\n  RC -.->|include| SH\n  RC -.->|include| RS\n  SM -.->|\"extend: student changes mode\"| RC"
  },
  "memorize": [
   "Template order: Name · ID · Priority · Actor · Description · Trigger + Type · Preconditions · Normal Course (+ Information for Steps) · Alternative Courses · Postconditions · Exceptions · Summary Inputs/Outputs",
   "Name = verb–noun; ID = traceability; primary actor = usually the trigger",
   "Importance: High/Medium/Low or Larman 0–5 on 5 criteria",
   "Stakeholders list always includes the primary actor",
   "Trigger: external (order, fire alarm) vs temporal (overdue book, rent)",
   "Postconditions of one = preconditions of the next",
   "Normal = happy path; alternative = other branch, still success, state the branch step; exception = error, unsuccessful",
   "Summary inputs with source, outputs with destination"
  ],
  "note": "Small slide inconsistencies: S29 is titled \"Casual Use Case Format\" but shows the same Request-a-chemical table. Exception E1 \"occurs at step 1\" on S30 but \"at step 2\" on S42, because the two versions number the steps differently (in the fully dressed one, step 2 is \"verify the chemical is approved\"). Both are correct for their own version."
 },
 {
  "id": "W7-5",
  "label": "W7·5",
  "week": "W7",
  "slides": [
   64,
   65,
   66,
   67,
   68,
   69,
   70,
   71,
   72,
   73,
   74,
   75,
   76,
   77,
   78,
   79,
   80,
   81,
   94
  ],
  "kind": "theory",
  "title": "Activity diagrams: business process modeling and every symbol",
  "hook": "After this lesson you can name every activity-diagram symbol (actions, object nodes, the two flows, the seven control nodes, swimlanes) and explain decision vs fork and merge vs join.",
  "cards": [
   {
    "h": "Business process models: why we draw them",
    "body": "<p>A <b>business process model</b> shows the different activities that together support a business process (S64). Example: a new student's enrolment goes through Admissions, Finance and the Dean's office.</p><ul><li>Business processes <b>cut across functional departments</b> (and, in OO terms, across many objects).</li><li>Early OO approaches often <b>ignored</b> business process modeling.</li><li>Risk: they can push a <b>functional decomposition mindset</b>. But used properly they are <b>very powerful for communicating</b> the analyst's understanding to the user.</li></ul><p><b>Activity diagrams</b> (S68) can model any process, as-is or to-be, computerized or not. They show activities and how objects (data) move between them. Use cases = <b>what</b> the system should do; activity diagrams = <b>how</b> it will accomplish its goals.</p>"
   },
   {
    "h": "Schedlbauer's best practices (7)",
    "body": "<ol><li><b>Be realistic</b>: you cannot identify everything now, and not everything is equally important.</li><li><b>Be agile</b>: what you do identify, identify rigorously.</li><li><b>Modeling is collaborative/social</b>: do it in <b>teams</b>, not alone (alone you mix up or omit tasks).</li><li><b>Use whiteboards, not a CASE tool</b>, while modeling. Once the process is understood, use a CASE tool to <b>document</b> it.</li><li><b>Iterate</b>: return and revise as you understand more (OO development is iterative and incremental).</li><li><b>Stay focused</b> on this one process; put tasks of other processes on a <b>to-do list</b>.</li><li><b>A model is an abstraction of reality</b>: leave out minor tasks; don't lose the forest for one tree.</li></ol><p>Trap: \"Use a CASE tool from the start\" is FALSE; whiteboard first, CASE to document.</p>"
   },
   {
    "h": "Actions, activities, object nodes, two kinds of flow",
    "body": "<ul><li><b>Action</b> = rounded rectangle; a simple, <b>non-decomposable</b> piece of behaviour.</li><li><b>Activity</b> = rounded rectangle; a set of actions, <b>can be decomposed</b> further. (The only difference.) Business process models usually use activities. Names: <b>verb + noun</b>, short but clear (\"Get Patient Information\"). Usually each activity is linked to a use case.</li><li><b>Object node</b> = a plain (square-cornered) <b>rectangle</b> with the <b>class name</b> (\"Appt Request Info\"). The information that flows between activities.</li></ul><table><tr><th>Control flow</th><th>Object flow</th></tr><tr><td><b>solid</b> arrow</td><td><b>dashed</b> arrow</td></tr><tr><td>path of execution (order of steps)</td><td>movement of objects into and out of activities</td></tr><tr><td>attached only to actions/activities</td><td>one end on an action/activity, the other end on an <b>object node</b></td></tr></table>"
   },
   {
    "h": "The seven control nodes",
    "body": "<table><tr><th>Node</th><th>Symbol</th><th>Meaning</th></tr><tr><td><b>Initial</b></td><td>small filled circle ●</td><td>start of the process</td></tr><tr><td><b>Final-activity</b></td><td>bull's-eye ◉ (circle around a filled circle)</td><td>stops <b>everything</b>, at once, even unfinished paths</td></tr><tr><td><b>Final-flow</b></td><td>circle with an <b>X</b> ⊗</td><td>stops <b>one path</b>; parallel paths continue</td></tr><tr><td><b>Decision</b></td><td>diamond, 1 in, several out</td><td>a test; each exit has a <b>guard condition</b> in [brackets]; only <b>one</b> path is taken</td></tr><tr><td><b>Merge</b></td><td>diamond, several in, 1 out</td><td>brings back together <b>mutually exclusive</b> paths from a decision</td></tr><tr><td><b>Fork</b></td><td>thick bar, 1 in, several out</td><td>splits into <b>parallel/concurrent</b> flows (all are executed)</td></tr><tr><td><b>Join</b></td><td>thick bar, several in, 1 out</td><td>brings parallel flows back into one</td></tr></table><p>⚠️ <b>Slide error</b>: the symbol table on S70 shows the two final nodes <b>swapped</b> (X-circle next to \"final-activity\", bull's-eye next to \"final-flow\"). The text on S76 and all the slide diagrams (S78, S80, S88) are right: <b>final-activity = bull's-eye, final-flow = circle with X</b>. Use that.</p>"
   },
   {
    "h": "Decision + merge (and when to skip the merge)",
    "body": "<p>The order process (S78): for each item, check availability. Available → <i>Process Item</i>; not available → <i>Back Order Item</i>. A merge brings the two paths back. Then a decision: [More Items on Order] loops back, [No More Items on Order] → <i>Process Order</i>.</p><p>S77 asks: the left version has an extra <b>merge</b> node for the loop, the right version does not. In the right one, the <b>decision node plays double duty</b>: it also serves as the merge. Sometimes, for clarity, it is better <b>not</b> to use a merge node.</p>",
    "diagram": "flowchart TD\n  S(( )) --> PO(\"Place Order\")\n  PO --> D1{\" \"}\n  D1 -->|\"[Item Available]\"| PI(\"Process Item\")\n  D1 -->|\"[Item Not Available]\"| BO(\"Back Order Item\")\n  PI --> M1{\" \"}\n  BO --> M1\n  M1 --> D2{\" \"}\n  D2 -->|\"[More Items on Order]\"| D1\n  D2 -->|\"[No More Items on Order]\"| PR(\"Process Order\")\n  PR --> E(((\" \")))\n  style S fill:#222,stroke:#222\n  style E fill:#222,stroke:#222"
   },
   {
    "h": "Fork, join and swimlanes: the school lunch (S80)",
    "body": "<p><b>Fork</b>: the paths are <b>not</b> mutually exclusive: all run at the same time. <b>Join</b>: waits for all parallel flows, then continues as one (like merge, but for parallel paths).</p><p><b>Swimlanes</b> (S81): columns (or rows) that assign each activity to the <b>person or object responsible</b>. Here two parents make a school lunch: the first parent makes the peanut-butter-and-jelly sandwich, the second gets the drink and dessert, then packs the lunch. Vertical lanes for top-down diagrams; horizontal lanes for left-to-right. In a real business workflow, lanes are roles (employee, customer) and the information system.</p><p>Decision vs fork: decision = <b>one</b> path chosen by a guard; fork = <b>all</b> paths at once.</p>",
    "diagram": "flowchart TD\n  S(( )) --> F1[\" \"]\n  subgraph P1[\"firstParent\"]\n    F2[\" \"]\n    GJ(\"Get Jelly\")\n    GB(\"Get Bread\")\n    GP(\"Get Peanut Butter\")\n    J2[\" \"]\n    CS(\"Create Sandwich\")\n  end\n  subgraph P2[\"secondParent\"]\n    F3[\" \"]\n    GD(\"Get Drink\")\n    GE(\"Get Dessert\")\n    J3[\" \"]\n    CL(\"Create Lunch\")\n    PL(\"Put Lunch In Box\")\n  end\n  F1 --> F2\n  F1 --> F3\n  F2 --> GJ\n  F2 --> GB\n  F2 --> GP\n  GJ --> J2\n  GB --> J2\n  GP --> J2\n  J2 --> CS\n  F3 --> GD\n  F3 --> GE\n  GD --> J3\n  GE --> J3\n  CS --> J1[\" \"]\n  J3 --> J1\n  J1 --> CL\n  CL --> PL\n  PL --> E(((\" \")))\n  classDef bar fill:#222,stroke:#222,color:#222\n  class F1,F2,F3,J1,J2,J3 bar\n  style S fill:#222,stroke:#222\n  style E fill:#222,stroke:#222"
   }
  ],
  "example": {
   "problem": "<p>Read the Manage Appointments activity diagram (S72, S71, S73). Which activities, decisions, merges and object nodes does it contain? Why do two activities appear twice?</p>",
   "solution": "<ul><li><b>Initial node</b> → <i>Get Patient Information</i>.</li><li><b>Decision</b> [Old Patient] / [New Patient].</li><li>Old patient: decision [New Info] → <i>Update Patient Information</i> → merge; decision [New Arrange] → <i>Make Payment Arrangements</i> → merge; then a decision on the request type: <i>Make New Appointment</i>, <i>Change Appointment</i> or <i>Cancel Appointment</i>.</li><li>New patient: <i>Create New Patient</i> → <i>Make Payment Arrangements</i> → <i>Create Appointment</i>.</li><li><b>Object node</b> <i>Appt Request Info</i> (rectangle) with <b>dashed object flows</b> from Get Patient Information to the later appointment activities: the information is captured early and used later.</li><li><i>Make Payment Arrangements</i> and the make-appointment activity appear <b>twice</b>: once for an old and once for a new patient (S71).</li></ul><p>(The diagram below is simplified: the old patient's payment-arrangement branch is left out to keep it readable.)</p>",
   "diagram": "flowchart TD\n  S(( )) --> G(\"Get Patient Information\")\n  G -.-> O[\"Appt Request Info\"]\n  G --> D1{\" \"}\n  D1 -->|\"[Old Patient]\"| D2{\" \"}\n  D2 -->|\"[New Info]\"| U(\"Update Patient Information\")\n  D2 -->|\"[No New Info]\"| M1{\" \"}\n  U --> M1\n  M1 --> D3{\" \"}\n  D3 -->|\"[Create]\"| MA(\"Make New Appointment\")\n  D3 -->|\"[Change]\"| CH(\"Change Appointment\")\n  D3 -->|\"[Cancel]\"| CA(\"Cancel Appointment\")\n  D1 -->|\"[New Patient]\"| CN(\"Create New Patient\")\n  CN --> MP(\"Make Payment Arrangements\")\n  MP --> CR(\"Create Appointment\")\n  O -.-> MA\n  O -.-> CR\n  MA --> E(((\" \")))\n  CH --> E\n  CA --> E\n  CR --> E\n  style S fill:#222,stroke:#222\n  style E fill:#222,stroke:#222"
  },
  "check": [
   {
    "q": "(His S94 quiz) Name this activity-diagram element: two arrows come into a diamond from left and right, one arrow leaves downward.",
    "a": "A <b>merge node</b>: it brings back together different decision paths created by a decision node."
   },
   {
    "q": "What is the only difference between an action and an activity?",
    "a": "An <b>activity</b> can be decomposed further into activities and/or actions; an <b>action</b> is a simple, non-decomposable piece of behaviour."
   },
   {
    "q": "Control flow vs object flow: line style and what each connects.",
    "a": "Control flow: <b>solid</b> arrow, path of execution, only between actions/activities. Object flow: <b>dashed</b> arrow, between an action/activity and an <b>object node</b>."
   },
   {
    "q": "List the seven control nodes.",
    "a": "Initial, final-activity, final-flow, decision, merge, fork, join."
   },
   {
    "q": "Final-activity vs final-flow node?",
    "a": "Final-activity (bull's-eye) stops <b>all</b> actions and activities at once. Final-flow (circle with X) stops <b>one path</b> only; other parallel paths continue."
   },
   {
    "q": "Schedlbauer: should you model with a CASE tool?",
    "a": "No: use <b>whiteboards</b> while modeling; once the process is understood, use a CASE tool to <b>document</b> it."
   }
  ],
  "exam": {
   "question": "<p>Draw and name the symbols of an activity diagram. Explain the difference between a decision node and a fork node, and between a merge node and a join node.</p>",
   "answer": "<p>Action/activity = rounded rectangle (verb–noun name). Object node = rectangle with the class name. Control flow = solid arrow. Object flow = dashed arrow. Initial node = filled circle. Final-activity node = bull's-eye. Final-flow node = circle with an X. Decision and merge = diamond. Fork and join = thick bar. Swimlane = a column/row labelled with the responsible person or object.</p><p><b>Decision vs fork</b>: a decision has guard conditions and only <b>one</b> exiting path is taken (mutually exclusive). A fork splits the flow into <b>parallel/concurrent</b> paths that are <b>all</b> executed.</p><p><b>Merge vs join</b>: a merge brings back together <b>mutually exclusive</b> paths created by a decision. A join brings back together <b>parallel</b> flows created by a fork, into a single flow.</p>",
   "diagram": "flowchart LR\n  S(( )) --> A(\"Action\")\n  A --> D{\"decision\"}\n  D -->|\"[guard 1]\"| B(\"Activity\")\n  D -->|\"[guard 2]\"| C(\"Activity\")\n  B --> M{\"merge\"}\n  C --> M\n  M --> F[\"fork\"]\n  F --> X(\"Action\")\n  F --> Y(\"Action\")\n  X --> J[\"join\"]\n  Y --> J\n  J --> E(((\" \")))\n  A -.->|object flow| O[\"ClassName\"]\n  classDef bar fill:#222,stroke:#222,color:#fff\n  class F,J bar\n  style S fill:#222,stroke:#222\n  style E fill:#222,stroke:#222"
  },
  "memorize": [
   "Business processes cut across departments; risk = functional decomposition mindset; great for communicating with users",
   "Schedlbauer 7: realistic, agile, collaborative (teams), whiteboard not CASE, iterative, stay focused (to-do list), abstraction",
   "Action = non-decomposable; activity = decomposable; both rounded rectangles, verb–noun",
   "Object node = rectangle with class name; object flow = dashed; control flow = solid",
   "7 control nodes: initial ●, final-activity ◉, final-flow ⊗, decision ◇, merge ◇, fork ▬, join ▬",
   "Decision = one path (guard conditions); fork = all paths in parallel",
   "Merge ← decision paths; join ← fork paths",
   "Swimlanes assign activities to the responsible person/object",
   "⚠️ S70 swaps the final-node symbols: final-activity = bull's-eye"
  ]
 },
 {
  "id": "W7-6",
  "label": "W7·6",
  "week": "W7",
  "slides": [
   82,
   83,
   84,
   85,
   86,
   87,
   88,
   89,
   92,
   93
  ],
  "kind": "drawing",
  "title": "Drawing an activity diagram: decisions, fork/join and swimlanes",
  "hook": "After this lesson you can turn a narrative into a correct activity diagram, with guard conditions, a fork/join for parallel work and swimlanes for who does what.",
  "cards": [
   {
    "h": "Ambler's guidelines (5)",
    "body": "<p>Before drawing (S82, Scott Ambler):</p><ol><li>Set the <b>context or scope</b> of the activity being modeled, then give the diagram a proper <b>title</b>.</li><li>Identify the <b>activities, control flows and object flows</b> between them.</li><li>Identify any <b>decisions</b>.</li><li>Look for <b>prospects for parallelism</b>.</li><li><b>Draw</b> the activity diagram.</li></ol>"
   },
   {
    "h": "The 5 steps for creating an activity diagram",
    "body": "<ol><li><b>Choose a business process</b> that was identified before. Review the requirements definition, the use-case diagram and all requirements documents. The use cases are usually the best place to start.</li><li><b>Identify the activities</b> (e.g., Update Patient Information, Make Payment Arrangements, Create New Patient, Create/Cancel/Change Appointment).</li><li><b>Identify the control flows and control nodes</b> for the logic (initial, final, decisions, merges, forks, joins).</li><li><b>Identify the object flows and object nodes</b>. Usually <b>not shown</b> in business process diagrams. Exception: information captured in one activity is used <b>later</b>, not immediately after (e.g., old/new patient and the type of request).</li><li><b>Lay out and draw</b> the diagram, <b>minimizing line crossings</b>.</li></ol><p>Narrative → diagram dictionary: verb phrase = activity; \"if / whether / otherwise\" = decision + guards; \"at the same time / meanwhile / various / both\" = fork + join; \"who does it\" = swimlane; \"stop / done\" = final node.</p>"
   },
   {
    "h": "Worked example: Borrow Books (S86–S88)",
    "body": "<p>Step 1: process = <i>Borrow Books</i> use case. Step 2: three activities: <b>Validate ID Card</b>, <b>Check for Overdue Books and Fines</b>, <b>Check Out Books</b>. Step 3: an initial node, decisions and merges for each decision, a final node. Step 4: no object nodes needed. Step 5: draw.</p><p>⚠️ <b>Slide issues</b>: S87 says \"a <b>final-flow</b> node\", but the S88 diagram ends with a bull's-eye (<b>final-activity</b>), which is the right choice because the whole process stops. S88 also has the typo \"[Valid Crad]\" and leaves the \"no\" branches without guard labels. On the exam, label <b>every</b> exit of a decision.</p>",
    "diagram": "flowchart TD\n  S(( )) --> V(\"Validate ID Card\")\n  V --> D1{\" \"}\n  D1 -->|\"[Valid Card]\"| C(\"Check for Overdue Books and Fines\")\n  D1 -->|\"[Invalid Card]\"| M1{\" \"}\n  C --> D2{\" \"}\n  D2 -->|\"[No Overdue Books and No Fines]\"| CO(\"Check Out Books\")\n  D2 -->|\"[Overdue Books or Fines]\"| M2{\" \"}\n  CO --> M2\n  M2 --> M1\n  M1 --> E(((\" \")))\n  style S fill:#222,stroke:#222\n  style E fill:#222,stroke:#222"
   },
   {
    "h": "His exercise: activity diagram for a Login process (S89)",
    "body": "<p>S89 shows a brokerage-system login. Notes (dog-eared rectangles, dashed link) give the <b>precondition</b> {Client is registered with the brokerage system} at the start and the <b>result</b> {Client logs into the system} at the end.</p><p>The decision \"Correct login and password?\" has guards [Yes] and [No]. [No] → <i>Invalid login/password</i> → <b>loops back</b> to entering the login again.</p><p>Tip: a loop is just a flow that goes back up. Bring it back into the action (as S89 does) or into a merge diamond just before it.</p>",
    "diagram": "flowchart TD\n  N1>\"Client is registered\"] -.- S\n  S(( )) --> EN(\"Client enters login name and password\")\n  EN --> D{\"Correct login and password?\"}\n  D -->|\"[No]\"| IV(\"Show invalid login or password\")\n  IV --> EN\n  D -->|\"[Yes]\"| OK(\"Client has successfully logged in\")\n  OK --> SE(\"Display client's settings\")\n  SE --> E(((\" \")))\n  E -.- N2>\"Client logs into the system\"]\n  style S fill:#222,stroke:#222\n  style E fill:#222,stroke:#222"
   },
   {
    "h": "Swimlanes: who does what",
    "body": "<p>When a narrative has several people or systems, draw one <b>lane per role</b> (a column with the role name on top). Every activity goes in the lane of the one who <b>performs</b> it. Arrows may cross lanes: that is a hand-over.</p><p>Recipe:</p><ol><li>List the roles (nouns that act): they become lane titles.</li><li>Write the activities in time order, top to bottom, each in its lane.</li><li>Put the initial node in the lane where the process starts, the final node where it ends.</li><li>Add decisions (with guards) and fork/join bars.</li></ol><p>His S93 answer for the insurance narrative (S92) uses three lanes: <b>Prospective Customer</b>, <b>Insurance Agent</b>, <b>Insurance Company</b>, with Fill out application → Process application → Create quote → Determine best policy → end. See the exam box for a fuller version.</p>"
   },
   {
    "h": "Exam drawing checklist",
    "body": "<ul><li>Title (the process / use-case name) on top.</li><li>Exactly <b>one</b> initial node ● at the start.</li><li>Activities = rounded rectangles, <b>verb + noun</b>.</li><li>Every decision diamond: <b>guard on every exit</b>, in [brackets], covering all cases ([valid] / [invalid]).</li><li>Mutually exclusive paths come together at a <b>merge</b> diamond (or the decision does double duty).</li><li>Parallel work: <b>thick fork bar</b> → paths → <b>thick join bar</b>. Never use a diamond for parallel work.</li><li>End with a <b>bull's-eye</b> ◉ (final-activity). Use ⊗ (final-flow) only to stop one parallel path.</li><li>Solid arrows for control flow; dashed only to/from object nodes.</li><li>Swimlanes if more than one role is named.</li><li>Minimize crossing lines.</li></ul>"
   }
  ],
  "example": {
   "problem": "<p>Draw an activity diagram with swimlanes for a <b>Tashkent café ordering app</b>: The customer chooses drinks and food in the app. The app checks if the items are available. If an item is sold out, the app shows a message and the customer chooses again. Otherwise the customer pays, and the app sends the order to the kitchen. The barista makes the drink while the cook prepares the food at the same time. When both are ready, the kitchen calls the order number and the customer picks up the order.</p>",
   "solution": "<ul><li><b>Lanes</b>: Customer, Ordering App, Kitchen.</li><li><b>Decision</b> after <i>Check availability</i>: [sold out] → <i>Show sold-out message</i> → back to a <b>merge</b> before <i>Choose items</i>; [available] → <i>Pay for order</i>.</li><li>\"At the same time\" → <b>fork</b> into <i>Make drink</i> and <i>Prepare food</i>; \"when both are ready\" → <b>join</b>.</li><li>Then <i>Call order number</i> → <i>Pick up order</i> → <b>final-activity</b> node.</li></ul>",
   "diagram": "flowchart TD\n  subgraph CU[\"Customer\"]\n    S(( ))\n    M0{\" \"}\n    CH(\"Choose items\")\n    PA(\"Pay for order\")\n    PU(\"Pick up order\")\n    E(((\" \")))\n  end\n  subgraph AP[\"Ordering App\"]\n    CK(\"Check availability\")\n    D1{\" \"}\n    SO(\"Show sold-out message\")\n    SD(\"Send order to kitchen\")\n  end\n  subgraph KI[\"Kitchen\"]\n    F[\" \"]\n    MD(\"Make drink\")\n    PF(\"Prepare food\")\n    J[\" \"]\n    CA(\"Call order number\")\n  end\n  S --> M0\n  M0 --> CH\n  CH --> CK\n  CK --> D1\n  D1 -->|\"[sold out]\"| SO\n  SO --> M0\n  D1 -->|\"[available]\"| PA\n  PA --> SD\n  SD --> F\n  F --> MD\n  F --> PF\n  MD --> J\n  PF --> J\n  J --> CA\n  CA --> PU\n  PU --> E\n  classDef bar fill:#222,stroke:#222,color:#222\n  class F,J bar\n  style S fill:#222,stroke:#222\n  style E fill:#222,stroke:#222"
  },
  "check": [
   {
    "q": "Give the 5 steps for creating an activity diagram.",
    "a": "Choose a business process (use case); identify the activities; identify the control flows and nodes; identify the object flows and nodes; lay out and draw (minimize crossings)."
   },
   {
    "q": "When should object nodes and flows be shown in a business-process activity diagram?",
    "a": "Usually they are not shown. Exception: information captured in one activity is used in a <b>later</b> activity, not the one right after."
   },
   {
    "q": "Name Ambler's 5 guidelines.",
    "a": "Set the context/scope and title; identify activities, control flows and object flows; identify decisions; identify prospects for parallelism; draw the diagram."
   },
   {
    "q": "In the Borrow Books diagram, which three activities are there, and which final node is correct?",
    "a": "Validate ID Card; Check for Overdue Books and Fines; Check Out Books. The final-activity node (bull's-eye), as drawn on S88 (S87's text says final-flow, a slip)."
   },
   {
    "q": "A narrative says \"the agent sends the application to various insurance companies\". Which control nodes fit?",
    "a": "A <b>fork</b> (one path per company, in parallel) and later a <b>join</b> when all quotes have returned."
   }
  ],
  "exam": {
   "question": "<p><b>(His S92 exercise)</b> Develop an activity diagram based on the following narrative. The purpose of the Open Access Insurance System is to provide automotive insurance to car owners. Initially, prospective customers fill out an insurance application, which provides information about the customer and his or her vehicles. This information is sent to an agent, who sends it to various insurance companies to get quotes for insurance. When the responses return, the agent then determines the best policy for the type and level of coverage desired and gives the customer a copy of the insurance policy proposal and quote.</p>",
   "answer": "<p><b>Lanes</b> (from the nouns that act): Prospective Customer, Insurance Agent, Insurance Companies.</p><ol><li>● Initial node in the Customer lane → <i>Fill out insurance application</i>.</li><li>→ Agent: <i>Process application and send it to companies</i>.</li><li>\"various companies\" → <b>fork</b>: each company <i>Creates a quote</i> in parallel.</li><li>\"When the responses return\" → <b>join</b>.</li><li>Agent: <i>Determine best policy</i> → <i>Give proposal and quote to customer</i>.</li><li>Customer: <i>Receive policy proposal and quote</i> → ◉ final-activity node.</li></ol><p>His own S93 answer is the short version: three lanes, Fill out application → Process application → Create quote → Determine best policy → final node. The fork/join for \"various companies\" makes the answer stronger.</p>",
   "diagram": "flowchart TD\n  subgraph PC[\"Prospective Customer\"]\n    S(( ))\n    FA(\"Fill out insurance application\")\n    RP(\"Receive policy proposal and quote\")\n    E(((\" \")))\n  end\n  subgraph IA[\"Insurance Agent\"]\n    SA(\"Process application and send to companies\")\n    F[\" \"]\n    J[\" \"]\n    DB(\"Determine best policy\")\n    GP(\"Give proposal and quote to customer\")\n  end\n  subgraph IC[\"Insurance Companies\"]\n    Q1(\"Company A: create quote\")\n    Q2(\"Company B: create quote\")\n  end\n  S --> FA\n  FA --> SA\n  SA --> F\n  F --> Q1\n  F --> Q2\n  Q1 --> J\n  Q2 --> J\n  J --> DB\n  DB --> GP\n  GP --> RP\n  RP --> E\n  classDef bar fill:#222,stroke:#222,color:#222\n  class F,J bar\n  style S fill:#222,stroke:#222\n  style E fill:#222,stroke:#222"
  },
  "memorize": [
   "Ambler: scope + title → activities + control/object flows → decisions → parallelism → draw",
   "5 steps: choose process (use case) → activities → control flows/nodes → object flows/nodes (usually omitted) → lay out, minimize crossings",
   "Borrow Books: Validate ID Card → Check for Overdue Books and Fines → Check Out Books",
   "if/otherwise = decision + guards; at the same time/various = fork + join; who = swimlane",
   "Guard on EVERY exit of a decision",
   "End the whole process with the bull's-eye (final-activity)"
  ]
 }
];
