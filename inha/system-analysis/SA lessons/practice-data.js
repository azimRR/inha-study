/* merged from lessons/P*.json */
const PRACTICE = [
 {
  "lesson": "W1a-1",
  "questions": [
   {
    "type": "mcq",
    "q": "<p>What is the <b>primary deliverable of the Design phase</b>?<br/>A) System proposal<br/>B) System specification<br/>C) Installed system<br/>D) Feasibility study</p>",
    "a": "<p><b>B</b>, because Design ends with the system specification. A is Analysis, C is Implementation, D is Planning.</p>"
   },
   {
    "type": "mcq",
    "q": "<p>The focus question <i>\"Who, what, where and when?\"</i> belongs to which SDLC phase?<br/>A) Planning<br/>B) Analysis<br/>C) Design<br/>D) Implementation</p>",
    "a": "<p><b>B</b>, because Analysis studies who will use the system, what it does, and where and when it is used. Planning asks <i>why</i>, Design asks <i>how</i>.</p>"
   },
   {
    "type": "classify",
    "q": "<p>Put each deliverable into its SDLC phase (Planning, Analysis, Design, Implementation): test plan, alternative matrix, work plan, use cases, migration plan, risk assessment, data model, interface design, support plan, system request.</p>",
    "a": "<table><tr><th>Phase</th><th>Deliverables</th></tr><tr><td>Planning</td><td>system request, work plan, risk assessment</td></tr><tr><td>Analysis</td><td>use cases, data model (both part of the system proposal)</td></tr><tr><td>Design</td><td>alternative matrix, interface design</td></tr><tr><td>Implementation</td><td>test plan, migration plan, support plan</td></tr></table>"
   },
   {
    "type": "scenario",
    "q": "<p>Inha builds a new <b>library book-lending system</b>. Which team role does each task?<br/>a) Plans how librarians will learn the new system.<br/>b) Checks whether the servers and network must be upgraded.<br/>c) Is the main contact for the client and monitors the project plan.<br/>d) Decides how technology can speed up lending and designs the information system.<br/>e) Designs the new late-return fine policy and shows its business value.</p>",
    "a": "<p>a) <b>Change management analyst</b> (training plan)<br/>b) <b>Infrastructure analyst</b><br/>c) <b>Project manager</b><br/>d) <b>Systems analyst</b><br/>e) <b>Business analyst</b> (new processes and policies, business value)</p>"
   },
   {
    "type": "short",
    "q": "<p>Define a <b>system</b> and explain its 3 basic constraints using a hospital appointment system as the example.</p>",
    "a": "<p><b>System</b> = an orderly grouping of interdependent components linked together according to a plan to achieve a specific goal.</p><ol><li><b>Structure and behavior for a predefined objective</b>: booking screen, doctor schedule and SMS reminder are built for one goal: patients see a doctor on time.</li><li><b>Interconnectivity and interdependence</b>: booking needs the doctor schedule; reminders need the booking.</li><li><b>Organization goals over subsystem goals</b>: if the reminder module wants many messages but the hospital wants to save money, the hospital goal wins.</li></ol>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: the 4 SDLC phases, with the focus question and the main deliverable of each phase.</p>",
    "a": "<p>Draw 4 boxes in order, with forward arrows, and write the deliverable under each box:</p><ul><li><b>Planning</b>: why build it? → system request, feasibility study, project plan</li><li><b>Analysis</b>: who, what, where, when? → system proposal</li><li><b>Design</b>: how will it work? → system specification</li><li><b>Implementation</b>: delivery and support → installed system</li></ul><p>(Post production / maintenance can be added as a 5th phase if asked.)</p>",
    "diagram": "flowchart LR\n  P[\"Planning<br/>Why build it?\"] --> A[\"Analysis<br/>Who, what, where, when?\"]\n  A --> D[\"Design<br/>How will it work?\"]\n  D --> I[\"Implementation<br/>Deliver and support\"]\n  P -.-> P1([\"System request, feasibility study, project plan\"])\n  A -.-> A1([System proposal])\n  D -.-> D1([System specification])\n  I -.-> I1([Installed system])"
   }
  ]
 },
 {
  "lesson": "W1b-1",
  "questions": [
   {
    "type": "classify",
    "q": "<p>Soft or hard skill? a) Has an IELTS 7.0 certificate b) Negotiates calmly with an unhappy stakeholder c) Writes Python code d) Justifies decisions e) Can configure Jira boards f) Teaches new team members g) Touch-typing h) Analytical thinking</p>",
    "a": "<p><b>Hard:</b> a (certificate, confirmed now), c, e (tied to IT, can be tested), g (on the hard list).<br/><b>Soft:</b> b, d, f, h (personal, not tied to one profession, grow over time). Trap: analytical thinking is <b>soft</b>.</p>"
   },
   {
    "type": "mcq",
    "q": "<p>Which of these is <b>NOT</b> one of the new skills of an AI-augmented analyst?<br/>A) Prompt engineering<br/>B) AI output validation<br/>C) Assembly language programming<br/>D) Data literacy</p>",
    "a": "<p><b>C</b>, because the 6 new skills are prompt engineering, AI output validation, data literacy, ethical AI awareness, AI-tool orchestration and model evaluation.</p>"
   },
   {
    "type": "mcq",
    "q": "<p>A bank's AI fraud detector was accurate last year, but now its accuracy slowly drops because customer behavior has changed. Which AI-aware design pattern catches this?<br/>A) Model Wrapper<br/>B) Feature Store<br/>C) Drift Detector<br/>D) Model Version Manager</p>",
    "a": "<p><b>C</b>, because a Drift Detector (DriftMonitor.check_drift()) watches for the data or model drifting away from what it was trained on.</p>"
   },
   {
    "type": "scenario",
    "q": "<p>An analyst uses AI while gathering requirements for a clinic system. For each task say what the <b>AI</b> does and what the <b>human</b> does: a) stakeholder interview b) requirement prioritization c) UML diagrams d) ethics check.</p>",
    "a": "<table><tr><th>Task</th><th>AI</th><th>Human</th></tr><tr><td>Interview</td><td>transcribes and summarizes</td><td>reads body language, asks follow-ups</td></tr><tr><td>Prioritization</td><td>suggests an order</td><td>makes the final judgment</td></tr><tr><td>UML</td><td>drafts the diagram</td><td>reviews and corrects it</td></tr><tr><td>Ethics</td><td>flags possible bias</td><td>judges what is right</td></tr></table><p>Rule: AI = routine, data-heavy work; human = judgment, creativity, ethics, stakeholders. The analyst is enhanced, not replaced.</p>"
   },
   {
    "type": "short",
    "q": "<p>Give 3 ways an AI component breaks normal object-oriented assumptions, and the design fix for each.</p>",
    "a": "<ol><li>Same input → same output? No, AI is <b>probabilistic</b> → confidence scores, retries.</li><li>Errors are bugs? No, AI makes <b>statistical errors</b> (false positives/negatives) → human-in-the-loop fallback.</li><li>Predictable speed? No, <b>inference time varies</b> → async, caching, batching.</li></ol><p>(Also: hidden weights → model versioning; exhaustive testing → statistical validation with precision, recall, F1.)</p>"
   },
   {
    "type": "short",
    "q": "<p>Name the 2 entry-level jobs from which system developers usually start, and 3 positions at the top of the career ladder.</p>",
    "a": "<p><b>Entry level:</b> business function specialist; programmer/analyst.<br/><b>Top:</b> change management analyst, project manager, software architect.</p>"
   }
  ]
 },
 {
  "lesson": "W1b-2",
  "questions": [
   {
    "type": "mcq",
    "q": "<p>Phased development belongs to which class of methodologies?<br/>A) Structured design<br/>B) Rapid Application Development (RAD)<br/>C) Agile<br/>D) None, it is only a planning technique</p>",
    "a": "<p><b>B</b>, because RAD includes Phased and Prototyping. Structured = Waterfall, Parallel; Agile = XP, Scrum.</p>"
   },
   {
    "type": "mcq",
    "q": "<p>According to the agile principles, what is the <b>primary measure of progress</b>?<br/>A) Number of documents completed<br/>B) Working software<br/>C) Hours worked by the team<br/>D) Milestones in the project plan</p>",
    "a": "<p><b>B</b>, because \"working software is the primary measure of progress\".</p>"
   },
   {
    "type": "short",
    "q": "<p>Write the 4 values of the Agile Manifesto. Does agile say that the items on the right are worthless?</p>",
    "a": "<ol><li><b>Individuals and interactions</b> over processes and tools</li><li><b>Working software</b> over comprehensive documentation</li><li><b>Customer collaboration</b> over contract negotiation</li><li><b>Responding to change</b> over following a plan</li></ol><p>No: \"while there is value in the items on the right, we value the items on the left more\".</p>"
   },
   {
    "type": "classify",
    "q": "<p>Match each statement to Waterfall, RAD, XP or Scrum: a) pair programming b) named after a restart in rugby c) uses CASE tools, JAD sessions and code generators d) a cascade from one phase to another e) a full-time customer works with the team f) new builds several times per day g) gets some part of the system to users quickly</p>",
    "a": "<p>a) <b>XP</b> b) <b>Scrum</b> c) <b>RAD</b> d) <b>Waterfall</b> e) <b>XP</b> f) <b>XP</b> g) <b>RAD</b></p>"
   },
   {
    "type": "scenario",
    "q": "<p>Plan-driven or agile? Justify each.<br/>a) A national railway ticketing system, built by teams in 3 cities, with a fixed contract and stable requirements.<br/>b) A student startup's food-delivery app; the founders change their minds every week.</p>",
    "a": "<p>a) <b>Plan-driven</b> (e.g. Waterfall): requirements are stable, and planning everything in advance helps coordinate a large project developed at several sites.<br/>b) <b>Agile</b> (e.g. Scrum, XP): planning is incremental, so weekly changes are easy to absorb; short 1–4 week iterations deliver working software often.<br/>Note: in practice most processes mix both; there is no right or wrong process.</p>"
   },
   {
    "type": "short",
    "q": "<p>List the 6 project characteristics you must check before choosing a methodology.</p>",
    "a": "<ol><li>Clarity of user requirements</li><li>Familiarity with technology</li><li>System complexity</li><li>System reliability</li><li>Short time schedules</li><li>Schedule visibility</li></ol>"
   }
  ]
 },
 {
  "lesson": "W1b-3",
  "questions": [
   {
    "type": "drawing",
    "q": "<p>Depict graphically: <b>Waterfall</b> development methodology. Write how it works, one advantage and one disadvantage.</p>",
    "a": "<p><b>Drawing:</b> staircase going down to the right: Planning → Analysis → Design → Implementation → rounded <b>System</b>. Solid arrows forward; 3 dashed back arrows (Analysis→Planning, Design→Analysis, Implementation→Design).<br/><b>How it works:</b> the project cascades from one phase to the next; it is plan-driven: all activities are planned and scheduled before work starts.<br/><b>Pro:</b> the plan helps coordinate large projects developed at several sites; works when requirements are well understood.<br/><b>Con:</b> inflexible: hard to respond to changing requirements, and users see the system only at the end.</p>",
    "diagram": "flowchart TD\n  P[Planning] --> A[Analysis]\n  A --> D[Design]\n  D --> I[Implementation]\n  I --> S([System])\n  A -.-> P\n  D -.-> A\n  I -.-> D"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: the <b>V-model</b>. Show which test is designed in which phase.</p>",
    "a": "<p><b>Drawing:</b> a big V. Left side going down: Analysis → Design → Implementation (coding) at the bottom. Right side going up: Unit testing → Integration testing → System testing → Acceptance testing. In the middle, rounded test-design boxes with dashed arrows.<br/><b>Key labels:</b> Analysis → <b>acceptance test design</b> → acceptance testing; Design → <b>system, integration and unit test design</b> → the matching tests.<br/><b>Pro:</b> every test is planned early, so quality is strong. <b>Con:</b> rigid like Waterfall; use when reliability matters and requirements are stable.</p>",
    "diagram": "flowchart TD\n  AN[Analysis] --> DE[Design]\n  DE --> IM[\"Implementation (coding)\"]\n  IM --> UT[Unit testing]\n  UT --> IT[Integration testing]\n  IT --> ST[System testing]\n  ST --> AT[Acceptance testing]\n  AN -.-> ATD([Acceptance test design])\n  DE -.-> STD([System test design])\n  DE -.-> ITD([Integration test design])\n  DE -.-> UTD([Unit test design])\n  ATD -.-> AT\n  STD -.-> ST\n  ITD -.-> IT\n  UTD -.-> UT"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: <b>Parallel</b> development methodology. Mark the part that runs in parallel and explain why this is faster than Waterfall.</p>",
    "a": "<p><b>Drawing:</b> Planning → Analysis → <b>general Design</b> (dashed back arrows), then 3 dotted ellipses <b>Subproject 1, 2, 3</b> (each Design → Implementation with a dashed back arrow) = the parallel part; all join in <b>Integration</b> → rounded <b>System</b>.<br/><b>Why faster:</b> after one general design, the subprojects are designed and implemented at the same time, so the time to deliver is shorter and fewer business changes cause rework.<br/><b>Con:</b> still one delivery at the end; the pieces must fit at integration.</p>",
    "diagram": "flowchart TD\n  P[Planning] --> A[Analysis]\n  A --> D[General design]\n  A -.-> P\n  D -.-> A\n  subgraph SP1[\"Subproject 1\"]\n    D1[Design] --> I1[Implementation]\n    I1 -.-> D1\n  end\n  subgraph SP2[\"Subproject 2\"]\n    D2[Design] --> I2[Implementation]\n    I2 -.-> D2\n  end\n  subgraph SP3[\"Subproject 3\"]\n    D3[Design] --> I3[Implementation]\n    I3 -.-> D3\n  end\n  D --> D1\n  D --> D2\n  D --> D3\n  I1 --> INT[Integration]\n  I2 --> INT\n  I3 --> INT\n  INT --> SYS([System])"
   },
   {
    "type": "mcq",
    "q": "<p>In the V-model, the <b>integration test design</b> is produced during which phase?<br/>A) Analysis<br/>B) Design<br/>C) Implementation (coding)<br/>D) Acceptance testing</p>",
    "a": "<p><b>B</b>, because system, integration and unit test designs come from Design; only the acceptance test design comes from Analysis.</p>"
   },
   {
    "type": "mcq",
    "q": "<p>Which element does <b>NOT</b> belong in a correct Waterfall drawing?<br/>A) A dashed arrow from Design back to Analysis<br/>B) A rounded System box at the end<br/>C) An Integration box<br/>D) A Planning box at the top left</p>",
    "a": "<p><b>C</b>, because Integration appears only in Parallel development, where the subprojects are joined.</p>"
   },
   {
    "type": "short",
    "q": "<p>Compare Waterfall and Parallel development: give 3 differences and 1 similarity.</p>",
    "a": "<p><b>Differences:</b></p><ol><li>Shape: one staircase vs a staircase that splits into subprojects and joins again.</li><li>Design: done once vs a general design plus a design inside each subproject; Parallel has an extra <b>Integration</b> box.</li><li>Short time schedule: Waterfall is Poor, Parallel is Good (it reduces delivery time).</li></ol><p><b>Similarity:</b> both are <b>Structured</b> methodologies and deliver the whole system only once, at the end.</p>"
   }
  ]
 },
 {
  "lesson": "W1b-4",
  "questions": [
   {
    "type": "drawing",
    "q": "<p>Depict graphically: <b>Phased</b> development methodology for a café ordering app that will be delivered in 3 versions. Label what goes into each version.</p>",
    "a": "<p><b>Drawing:</b> Planning → Analysis (overall concept, once, dashed back arrow). Then 3 dotted ellipses, each Analysis → Design → Implementation with dashed back arrows, each ending in a rounded <b>System version 1 / 2 / 3</b>. An arrow from System version 1 into the Analysis of version 2, and from version 2 into version 3.<br/><b>Versions:</b> V1 = the most important features (menu and ordering); V2 = online payment plus ideas from users of V1; V3 = delivery tracking.<br/><b>Pro:</b> a useful system reaches users quickly; value sooner; new requirements found sooner.<br/><b>Con:</b> users work with an intentionally incomplete system, so manage expectations.</p>",
    "diagram": "flowchart TD\n  P[Planning] --> A0[Analysis]\n  A0 -.-> P\n  subgraph V1[\"Version 1: menu and ordering\"]\n    A1[Analysis] --> D1[Design]\n    D1 --> I1[Implementation]\n    D1 -.-> A1\n    I1 -.-> D1\n  end\n  subgraph V2[\"Version 2: online payment\"]\n    A2[Analysis] --> D2[Design]\n    D2 --> I2[Implementation]\n    D2 -.-> A2\n    I2 -.-> D2\n  end\n  subgraph V3[\"Version 3: delivery tracking\"]\n    A3[Analysis] --> D3[Design]\n    D3 --> I3[Implementation]\n    D3 -.-> A3\n    I3 -.-> D3\n  end\n  A0 --> A1\n  I1 --> S1([System version 1])\n  S1 --> A2\n  I2 --> S2([System version 2])\n  S2 --> A3\n  I3 --> S3([System version 3])"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: <b>Prototyping</b>-based methodology. Give 2 benefits and 2 problems.</p>",
    "a": "<p><b>Drawing:</b> Planning → a <b>stacked block</b> [Analysis / Design / Implementation] (these happen at the same time), dashed back arrow to Planning. Block → rounded <b>System prototype</b>, with a loop back into the block. Prototype → Implementation → rounded <b>System</b>.<br/><b>How it works:</b> quickly build a quick-and-dirty program with minimal features, show it to users, refine it in cycles until it becomes the system.<br/><b>Benefits:</b> better usability; closer match to real needs (also better design quality, maintainability, less effort).<br/><b>Problems:</b> functionality and error checking may be left out; focuses on functional, not non-functional requirements (reliability, security).</p>",
    "diagram": "flowchart LR\n  P[Planning] --> B[\"Analysis<br/>Design<br/>Implementation\"]\n  B -.-> P\n  B --> SP([System prototype])\n  SP -->|\"repeat\"| B\n  SP --> I[Implementation]\n  I --> S([System])"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: <b>Throwaway prototyping</b>-based methodology. Why is the prototype thrown away?</p>",
    "a": "<p><b>Drawing:</b> Planning → Analysis (dashed back arrow) → stacked block [Analysis / Design / Implementation] → rounded <b>Design prototype</b>, with a loop back into the block. A second path from the block for the real build: Design → Implementation (dashed back arrow) → rounded <b>System</b>.<br/><b>Why discard it:</b> it may be impossible to tune for non-functional requirements; it is undocumented; its structure is degraded by rapid change; it won't meet quality standards.<br/><b>Difference from Prototyping:</b> the output is a <b>design</b> prototype used only to learn; it never becomes the system.</p>",
    "diagram": "flowchart LR\n  P[Planning] --> A[Analysis]\n  A -.-> P\n  A --> B[\"Analysis<br/>Design<br/>Implementation\"]\n  B -.-> A\n  B --> DP([Design prototype])\n  DP -->|\"repeat\"| B\n  B -->|\"real build\"| D[Design]\n  D --> I[Implementation]\n  I -.-> D\n  I --> S([System])"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: <b>typical Agile</b> development methodology. Explain the drawing in 2 lines.</p>",
    "a": "<p><b>Drawing:</b> one stacked block with all 4 phases [Planning / Analysis / Design / Implementation] → rounded <b>System</b> → arrow back to the top of the block (next iteration).<br/><b>Explanation:</b> every iteration is a complete small project done in a short cycle (1–4 weeks) and ends with working software; then the next cycle starts again from planning.<br/><b>Pro:</b> working software early and often, welcomes change. <b>Con:</b> little documentation; needs an available customer and a disciplined team.</p>",
    "diagram": "flowchart LR\n  B[\"Planning<br/>Analysis<br/>Design<br/>Implementation\"] --> S([System])\n  S -->|\"next iteration\"| B"
   },
   {
    "type": "scenario",
    "q": "<p>A hospital wants a new patient-records system on a <b>blockchain platform</b> the team has never used. Doctors cannot clearly explain what they need. The system is large, links many departments, and <b>must never lose data</b>. Use the \"Which methodology to use?\" table to choose a methodology.</p>",
    "a": "<p><b>1) Marked rows:</b> unclear requirements, unfamiliar technology, complex system, reliable system.<br/><b>2) Cross out any Poor:</b> Waterfall and Parallel (Poor on unclear, unfamiliar); Prototyping (Poor on unfamiliar, complex, reliable); XP (Poor on unfamiliar, complex).<br/><b>3) Count Excellents:</b> Phased G, G, G, G = 0; Throwaway E, E, E, E = 4.<br/>→ <b>Throwaway prototyping</b>: design prototypes let the team learn the new technology and clarify requirements, then the real system is built properly.</p>"
   },
   {
    "type": "classify",
    "q": "<p>Iterative, incremental or iterative-incremental? A team builds a university timetable app.<br/>a) Round 1: a rough version of the whole app; round 2: a better version of the whole app.<br/>b) Round 1: only a finished course list; round 2: add room booking; round 3: add exam schedules.<br/>c) Each round adds a new feature and also improves the features already built.</p>",
    "a": "<p>a) <b>Iterative</b>: the whole thing is improved each round (sketch → draft → finished painting).<br/>b) <b>Incremental</b>: one finished piece is added each round.<br/>c) <b>Iterative-incremental</b>: both at once; this is how Phased and agile development work.</p>"
   }
  ]
 },
 {
  "lesson": "W2-1",
  "questions": [
   {
    "type": "mcq",
    "q": "<p>The café app team refuses to work every weekend for three months, because \"everyone should keep the same pace for a long time\". Which Agile principle is this?</p><p>A) Simplicity<br>B) Maintain Constant Pace<br>C) Monitoring<br>D) Motivation</p>",
    "a": "<p><b>B</b>, because Maintain Constant Pace means sustainable development: the team can keep the same pace indefinitely, with no burnout.</p>"
   },
   {
    "type": "classify",
    "q": "<p>Classify each statement as <b>Agile</b> or <b>Waterfall</b>:</p><ol><li>The project is divided into sprints.</li><li>A sequential design process.</li><li>The test plan is reviewed after complete development.</li><li>A collection of many different small projects.</li><li>Testers can join requirement changes without problems.</li><li>Structured.</li><li>Flexible.</li><li>Completed as one single project.</li></ol>",
    "a": "<table><tr><th>Agile</th><th>Waterfall</th></tr><tr><td>1. divided into sprints</td><td>2. sequential design process</td></tr><tr><td>4. many small projects</td><td>3. test plan reviewed after complete development</td></tr><tr><td>5. testers join changes easily</td><td>6. structured</td></tr><tr><td>7. flexible</td><td>8. one single project</td></tr></table>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: the difference between <b>traditional single-phase development</b> and <b>Agile</b> development. Write the typical durations on the drawing.</p>",
    "a": "<p><b>Traditional:</b> one long line Plan → Analyse → Design → Build → Test → Software, lasting <b>6 to 18 months</b>; all requirements and risks are predicted at the start, and real feedback comes only at the end.</p><p><b>Agile:</b> Ideas go into small <b>Define → Code → Test</b> cycles of <b>1 to 4 weeks</b>. Each cycle gives a bigger increment (i1, i2, i3), with <b>review and adjust</b> after each one, until the final software.</p>",
    "diagram": "flowchart LR\n  subgraph TR[\"Traditional: one phase, 6-18 months\"]\n    T1[\"Plan and analyse\"] --> T2[\"Design and build\"]\n    T2 --> T3[\"Test\"]\n    T3 --> T4([\"Software + first feedback\"])\n  end\n  subgraph AG[\"Agile: cycles of 1-4 weeks\"]\n    A0([\"Ideas\"]) --> A1((\"Define Code Test\"))\n    A1 --> I1[\"i1\"]\n    I1 -->|review and adjust| A2((\"Define Code Test\"))\n    A2 --> I2[\"i2 bigger\"]\n    I2 -->|review and adjust| A3([\"Final software\"])\n  end"
   },
   {
    "type": "scenario",
    "q": "<p>Inha University wants a new <b>course-registration system</b>. The registrar cannot describe all the rules at the start, the rules change every semester, and the dean wants to see something working within a month. Would you choose <b>Agile</b> or <b>Waterfall</b>? Justify with <b>two Manifesto values</b> and <b>two principles</b>.</p>",
    "a": "<p><b>Agile.</b> Requirements are unclear and change often, and the client wants early working software.</p><ul><li>Value: <b>Responding to change over following a plan</b>: new semester rules can enter the next iteration.</li><li>Value: <b>Customer collaboration over contract negotiation</b>: the registrar works with the team instead of signing a fixed spec.</li><li>Principle: <b>Welcome Change</b>, even late in development.</li><li>Principle: <b>Deliver the Working Software</b> frequently (iterations of 1 to 4 weeks), so the dean sees a working piece in the first month.</li></ul><p>Waterfall would predict all requirements at the start and give feedback only after 6 to 18 months.</p>"
   },
   {
    "type": "short",
    "q": "<p>List the <b>12 Agile principles</b> by their names.</p>",
    "a": "<ol><li>Customer Satisfaction</li><li>Welcome Change</li><li>Deliver the Working Software</li><li>Collaboration</li><li>Motivation</li><li>Face-to-face Conversation</li><li>Measure the Progress as per the Working Software</li><li>Maintain Constant Pace</li><li>Monitoring</li><li>Simplicity</li><li>Self-organized Teams</li><li>Review the Work Regularly</li></ol><p>Hook: Customer, Change, Deliver · Collaboration, Motivation, Face-to-face · the 3 M's · S-S-R.</p>"
   },
   {
    "type": "scenario",
    "q": "<p>A bank says it is \"now Agile\". It holds daily stand-ups and covers the walls with sticky notes. But the manager still fixes every feature in a one-year contract, refuses all changes, and measures progress by the number of documents written. Is this real Agile? Name the idea and the values that are broken.</p>",
    "a": "<p><b>No.</b> This is <b>cargo cult Agile</b>: the team copies the <i>form</i> (rituals) without the <i>values</i>, like the straw airplanes that cannot fly.</p><p>Broken values: <b>Customer collaboration over contract negotiation</b> (fixed one-year contract), <b>Responding to change over following a plan</b> (no changes), <b>Working software over comprehensive documentation</b> (progress measured in documents; the principle says working software is the primary measure of progress).</p>"
   }
  ]
 },
 {
  "lesson": "W2-2",
  "questions": [
   {
    "type": "mcq",
    "q": "<p>Which of these is <b>NOT</b> a duty of the Product Owner?</p><p>A) Prioritize the product backlog<br>B) Accept or reject work results<br>C) Remove impediments to the Development Team's progress<br>D) Make scope vs. schedule decisions</p>",
    "a": "<p><b>C</b>, because removing impediments is a Scrum Master service to the Development Team.</p>"
   },
   {
    "type": "classify",
    "q": "<p>Write <b>PO</b> (Product Owner), <b>DT</b> (Development Team) or <b>SM</b> (Scrum Master) for each:</p><ol><li>Is responsible for the project's financial goals.</li><li>Creates the Increment.</li><li>Leads and coaches the organization in its Scrum adoption.</li><li>Adjusts features and priority every sprint.</li><li>Decides how to turn backlog items into working software.</li><li>Promotes and supports Scrum as defined in the Scrum Guide.</li><li>Defines the features of the product.</li><li>Facilitates Scrum events as requested or needed.</li></ol>",
    "a": "<p>1 <b>PO</b> · 2 <b>DT</b> (only the DT) · 3 <b>SM</b> · 4 <b>PO</b> · 5 <b>DT</b> (self-organizing) · 6 <b>SM</b> · 7 <b>PO</b> · 8 <b>SM</b></p>"
   },
   {
    "type": "calculation",
    "q": "<p>Check the Development Team size in each case and explain. Then, for case (c), count the communication lines with n(n − 1)/2 before and after a split.</p><ol type=\"a\"><li>7 developers + a PO + an SM (the PO and SM do no Sprint Backlog work).</li><li>4 developers + an SM + a PO who also codes Sprint Backlog tasks.</li><li>13 developers + a PO + an SM.</li></ol>",
    "a": "<ol type=\"a\"><li>Dev Team = <b>7</b> (PO and SM are not counted). Inside 5–9: <b>OK</b>.</li><li>The PO does Sprint Backlog work, so he is counted: 4 + 1 = <b>5</b>. <b>OK</b> (the SM is not counted).</li><li>Dev Team = <b>13</b> &gt; 9: <b>too big</b>, it \"requires too much coordination\".<br>Lines with 13 people: 13 × 12 / 2 = <b>78</b>.<br>Split into teams of 7 and 6: 7 × 6 / 2 = 21 and 6 × 5 / 2 = 15, total <b>36</b> lines inside the teams.<br>The split removes 78 − 36 = <b>42</b> lines, so coordination is much easier.</li></ol>"
   },
   {
    "type": "short",
    "q": "<p>The Scrum Master is called a <b>servant-leader</b>. Explain what this means and give <b>two</b> ways the SM serves the Development Team and <b>two</b> ways the SM serves the organization.</p>",
    "a": "<p><b>Servant-leader:</b> the SM is not a boss who gives orders; he leads by helping the team and clearing its way.</p><p><b>Development Team:</b> removes impediments to its progress; coaches it in self-organization and cross-functionality (also: facilitates events, helps it create high-value products).</p><p><b>Organization:</b> leads and coaches Scrum adoption; helps employees and stakeholders understand and enact Scrum (also: plans Scrum implementations, works with other Scrum Masters).</p>"
   },
   {
    "type": "scenario",
    "q": "<p>Café app project. Say what Scrum says in each situation:</p><ol><li>A marketing manager walks into the team room every day and gives developers new tasks directly.</li><li>Two testers want to form a separate \"testing sub-team\" with the title \"QA Lead\".</li><li>The database administrator can work on the project only two days a week.</li><li>A new developer wants to join in the middle of a Sprint.</li></ol>",
    "a": "<ol><li>Not allowed: nobody outside directs the team. New work goes to the <b>PO</b>, who orders the Product Backlog. The <b>SM</b> helps the manager see that these interruptions do not help.</li><li>Not allowed: <b>no sub-teams and no titles</b> in the Development Team; accountability belongs to the whole team.</li><li>Acceptable: members should be <b>full-time</b>, but exceptions are possible, for example a database administrator.</li><li>Wait: membership changes <b>only between sprints</b>.</li></ol>"
   }
  ]
 },
 {
  "lesson": "W2-3",
  "questions": [
   {
    "type": "drawing",
    "q": "<p>Depict graphically: the <b>sequence of Scrum events</b> inside one one-month Sprint, from Sprint Planning to the start of the next Sprint. Write the time-box next to each event and show where the Sprint Backlog and the Increment appear.</p>",
    "a": "<p>Key labels:</p><ul><li><b>Product Backlog</b> → <b>Sprint Planning</b> (max 8 h; What + How; Sprint Goal) → <b>Sprint Backlog</b>.</li><li>Development work with a <b>Daily Scrum</b> loop (15 min, every 24 hours).</li><li>→ <b>Increment</b> (\"Done\" work) → <b>Sprint Review</b> (no time-box on the slides) → <b>Sprint Retrospective</b> (max 3 h).</li><li>→ the next Sprint starts immediately. Sprint = one month or less, fixed length.</li></ul>",
    "diagram": "flowchart LR\n  PB[\"Product Backlog\"] --> SP[\"Sprint Planning - max 8 h\"]\n  SP --> SB[\"Sprint Backlog + Sprint Goal\"]\n  SB --> DEV((\"Development work\"))\n  DEV --> DS[\"Daily Scrum - 15 min\"]\n  DS -->|every 24 hours| DEV\n  DEV --> INC[\"Increment - Done work\"]\n  INC --> RV[\"Sprint Review\"]\n  RV --> RT[\"Sprint Retrospective - max 3 h\"]\n  RT -.->|next Sprint starts at once| SP"
   },
   {
    "type": "mcq",
    "q": "<p>Which event is attended by the Scrum Team <b>and key stakeholders invited by the Product Owner</b>, where the Development Team demonstrates the \"Done\" work?</p><p>A) Sprint Planning<br>B) Daily Scrum<br>C) Sprint Review<br>D) Sprint Retrospective</p>",
    "a": "<p><b>C</b>, because the Sprint Review inspects the product with stakeholders; the Retrospective is for the Scrum Team only and inspects the team itself.</p>"
   },
   {
    "type": "calculation",
    "q": "<p>The café team's Sprint Backlog has these tasks (hours): menu screen 8, cart API 6, payment 16, login form 4, order history 10, settings page 5.</p><ol type=\"a\"><li>Which task breaks the usual task-size rule, and what should the team do?</li><li>Total the work remaining at the start.</li><li>Update the remaining work at the end of each day:<br>Day 1: login form finished; 3 h of the menu screen done.<br>Day 2: menu screen finished; cart API re-estimated from 6 h to 9 h.<br>Day 3: a new 3 h task \"Click API key setup\" is added; settings page finished.</li><li>Why can the remaining work go <i>up</i>?</li></ol>",
    "a": "<ol type=\"a\"><li>Tasks are usually <b>2–12 hours</b>. Payment (16 h) is too big: split it, for example into \"payment screen 8 h\" + \"payment API 8 h\".</li><li>8 + 6 + 16 + 4 + 10 + 5 = <b>49 h</b> (the split does not change the total).</li><li>Day 1: 49 − 4 − 3 = <b>42 h</b><br>Day 2: 42 − 5 (rest of the menu screen) + 3 (re-estimate) = <b>40 h</b><br>Day 3: 40 + 3 − 5 = <b>38 h</b></li><li>The Sprint Backlog is a <b>forecast</b>. Work remaining is updated <b>daily</b>, and any team member can add, delete or change items, so re-estimates and newly found work can raise it.</li></ol>"
   },
   {
    "type": "classify",
    "q": "<p>Classify each statement as <b>Product Backlog</b> or <b>Sprint Backlog</b>:</p><ol><li>A list of all desired work on the project.</li><li>A forecast by the Development Team.</li><li>Prioritized by the Product Owner.</li><li>Individuals sign up for work; work is never assigned.</li><li>Starts from the roadmap and requirements.</li><li>Work remaining is updated daily.</li><li>Reprioritized at the start of each Sprint.</li><li>The selected items plus a plan to reach the Sprint Goal.</li></ol>",
    "a": "<p><b>Product Backlog:</b> 1, 3, 5, 7<br><b>Sprint Backlog:</b> 2, 4, 6, 8</p>"
   },
   {
    "type": "short",
    "q": "<p>For an online <b>bus-ticket app</b>, write one user requirement in <b>both</b> class templates. Then give one task with an estimate and one acceptance test, and say how the story and the task are estimated.</p>",
    "a": "<p>Template 1: \"As a <b>passenger</b> I want <b>to buy a ticket on my phone</b> so that <b>I do not queue at the station</b>.\"</p><p>Template 2: \"In order to <b>avoid queues at the station</b> as a <b>passenger</b> I want <b>to buy a ticket on my phone</b>.\"</p><p>Task: build the seat-selection screen, <b>6 h</b>. Acceptance test: after paying, the ticket with a QR code appears in \"My tickets\" (pass/fail).</p><p>The story (WHAT) gets a rough estimate in <b>relative scale points</b> at release planning. The task (HOW) is estimated in <b>hours (2–12)</b> at iteration planning.</p>"
   },
   {
    "type": "scenario",
    "q": "<p>Mid-Sprint on the café app. What does Scrum allow?</p><ol><li>The PO wants to add a large new feature that would make the Sprint Goal impossible.</li><li>The team is behind and asks to extend the Sprint by 3 days.</li><li>The team finds that a cart item is unclear.</li><li>The café chain is sold and the new owner drops online ordering.</li></ol>",
    "a": "<ol><li>Not allowed: no changes that endanger the Sprint Goal. Put the feature in the Product Backlog for the next Sprint.</li><li>Not allowed: the Sprint length is fixed; it cannot be lengthened. \"Sprint end date and team deliverable do not change.\"</li><li>Allowed: scope may be <b>clarified and re-negotiated</b> between the PO and the Development Team.</li><li>The Sprint Goal is obsolete, so <b>only the PO</b> may cancel the Sprint. \"Done\" items are reviewed; incomplete items are re-estimated and put back on the Product Backlog.</li></ol>"
   }
  ]
 },
 {
  "lesson": "W2-4",
  "questions": [
   {
    "type": "calculation",
    "q": "<p>A kanban team (In Progress WIP limit = 3) finished these cards:</p><table><tr><th>Card</th><th>Commitment day</th><th>Delivery day</th></tr><tr><td>A</td><td>2</td><td>7</td></tr><tr><td>B</td><td>3</td><td>11</td></tr><tr><td>C</td><td>5</td><td>9</td></tr><tr><td>D</td><td>6</td><td>12</td></tr><tr><td>E</td><td>8</td><td>14</td></tr></table><ol type=\"a\"><li>Find each card's lead time and the average lead time.</li><li>How many cards were in progress on day 8 (committed by day 8, delivered after day 8)? Was the WIP limit respected?</li><li>Next month, with the WIP limit enforced, five cards take 4, 5, 4, 5 and 4 days. By how much did the average lead time improve?</li></ol>",
    "a": "<ol type=\"a\"><li>Lead time = delivery − commitment: A 7 − 2 = <b>5</b>; B 11 − 3 = <b>8</b>; C 9 − 5 = <b>4</b>; D 12 − 6 = <b>6</b>; E 14 − 8 = <b>6</b>. Average = 29 / 5 = <b>5.8 days</b>.</li><li>On day 8: B, C, D, E are in progress (A was delivered on day 7) = <b>4 cards</b> &gt; 3. The WIP limit was <b>broken</b>: E should not have been pulled; the team should have swarmed to finish C first.</li><li>New average = 22 / 5 = <b>4.4 days</b>. Improvement = 5.8 − 4.4 = <b>1.4 days</b>, about <b>24%</b> faster, and more predictable (4–5 days instead of 4–8).</li></ol>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: the <b>DevOps lifecycle</b> (the Koenig version). Mark the Dev side and the Ops side.</p>",
    "a": "<p>An endless loop (∞): <b>Dev side</b>: Plan → Code → Build → Test; <b>Release</b> in the middle; <b>Ops side</b>: Deploy → Operate → Monitor → back to Plan.</p><p>Plan = adopt agile practices, break work into small pieces. Operate = manage end-to-end delivery of IT services to customers. The loop never stops.</p>",
    "diagram": "flowchart LR\n  subgraph DEV[\"Dev\"]\n    P[\"Plan\"] --> C[\"Code\"]\n    C --> B[\"Build\"]\n    B --> T[\"Test\"]\n  end\n  subgraph OPS[\"Ops\"]\n    D[\"Deploy\"] --> O[\"Operate\"]\n    O --> M[\"Monitor\"]\n  end\n  T --> R((\"Release\"))\n  R --> D\n  M -->|feedback, loop never ends| P"
   },
   {
    "type": "mcq",
    "q": "<p>Which is <b>NOT</b> one of Kanban's three core concepts?</p><p>A) Visualize Workflow<br>B) Limit WIP<br>C) Fixed-length sprints of 1–4 weeks<br>D) Measure the Lead Time</p>",
    "a": "<p><b>C</b>, because fixed-length sprints belong to Scrum; Kanban's concepts are Visualize, Limit WIP, Measure lead time.</p>"
   },
   {
    "type": "classify",
    "q": "<p>Classify each DevOps benefit as <b>Technical</b>, <b>Cultural</b> or <b>Business</b>:</p><ol><li>Reduced complexity</li><li>Happier customers</li><li>Stable operating environments</li><li>Continuous delivery</li><li>More productive and efficient teams</li><li>More collaboration and trust</li><li>Faster problem resolution</li><li>Faster delivery</li></ol>",
    "a": "<p><b>Technical:</b> 1, 4, 7<br><b>Cultural:</b> 2, 5<br><b>Business:</b> 3, 6, 8</p>"
   },
   {
    "type": "short",
    "q": "<p>Name the DevOps principle:</p><ol><li>\"Don't build in a bubble\"; solve real customer problems.</li><li>Dev and Ops become one team with full-stack ownership of a feature.</li><li>Short feedback loops and real-time live monitoring.</li><li>Automate as much of the lifecycle as possible, as in a CI/CD pipeline.</li><li>Experiment, minimize waste, optimize speed, cost and ease of delivery.</li></ol>",
    "a": "<ol><li><b>Create with the end in mind</b></li><li><b>Collaboration</b></li><li><b>Customer-centric action</b></li><li><b>Automation</b></li><li><b>Continuous Improvement</b></li></ol>"
   },
   {
    "type": "scenario",
    "q": "<p>(a) The university <b>IT helpdesk</b> gets unpredictable tickets every hour (password resets, broken projectors, urgent exam-system problems). Should it use Scrum sprints or Kanban? Why?</p><p>(b) In the café company, developers finish the app and \"throw it over the wall\" to the operations staff, and each side blames the other when the server fails. What approach fixes this, and name two of its principles that help?</p>",
    "a": "<p>(a) <b>Kanban.</b> It is useful for operations and support teams with <b>high uncertainty and variability</b>; work flows continuously instead of waiting for a fixed Sprint. The board makes every ticket visible, <b>WIP limits</b> expose bottlenecks, the team measures <b>lead time</b> per ticket, and urgent cards can use an <b>Expedite</b> swimlane.</p><p>(b) <b>DevOps</b>: practices, tools and a cultural philosophy that integrate development and IT operations. <b>Collaboration</b> merges Dev and Ops into one team that owns the feature from idea to delivery; <b>Automation</b> (CI/CD) builds, tests and deploys with fewer human errors.</p>"
   }
  ]
 },
 {
  "lesson": "W3-1",
  "questions": [
   {
    "type": "scenario",
    "q": "<p>A pharmacy chain in Samarkand loses money because medicines expire on the shelves and nobody knows the stock level in each branch. The Chief Operating Officer wants a central inventory system before the new branch opens in March. Write a system request with all 5 elements.</p>",
    "a": "<table><tr><th>Element</th><th>Answer</th></tr><tr><td>Project sponsor</td><td>Chief Operating Officer</td></tr><tr><td>Business need</td><td>Reduce losses from expired medicines; know the stock level in every branch</td></tr><tr><td>Business requirements</td><td>Real-time stock view for all branches; expiry-date alerts; automatic reorder suggestions; monthly stock reports</td></tr><tr><td>Business value</td><td>Expired stock down by 50%; about $40,000 saved per year; 1 fewer stock clerk</td></tr><tr><td>Special issues or constraints</td><td>Must be ready before the new branch opens in March; must work with the existing cash registers</td></tr></table><p>Check: requirements are capabilities (what it does), value is measurable (what we gain).</p>"
   },
   {
    "type": "classify",
    "q": "<p>Classify each change as Business Process <b>Automation</b>, <b>Improvement</b> or <b>Reengineering</b>:<br>1) A bank replaces paper deposit slips with a tablet form; the steps stay the same.<br>2) A bookshop closes all its stores and becomes an online-only seller.<br>3) A clinic studies its patient check-in process, removes two approval steps and adds online pre-registration.<br>4) A warehouse uses barcode scanners instead of writing item codes by hand.<br>5) A taxi company stops owning cars and becomes a platform that connects drivers and passengers.<br>6) A university redesigns its course-approval workflow so that the dean signs electronically and one meeting is dropped.</p>",
    "a": "<p>1) Automation (technology replaces manual work, same process) · 2) Reengineering (completely new way of doing business) · 3) Improvement (study and redesign the process) · 4) Automation · 5) Reengineering · 6) Improvement.</p><p>Rule: same steps but faster = BPA; redesigned steps = BPI; the old way is obliterated = BPR (risky, rare, needs top management support).</p>"
   },
   {
    "type": "mcq",
    "q": "<p>In a system request for a hotel booking system, which item is a <b>business value</b> (not a business requirement)?<br>A) Online room search by date and price<br>B) A 5% increase in room occupancy<br>C) Management reports on daily bookings<br>D) The system must be ready before the tourist season</p>",
    "a": "<p><b>B</b>, because business value is the measurable benefit for the organization; A and C are capabilities (business requirements) and D is a special issue or constraint.</p>"
   },
   {
    "type": "short",
    "q": "<p>Define business process management (BPM). Give its 3 benefits and list the business analyst's 4 steps in BPM.</p>",
    "a": "<p><b>BPM</b> = a methodology used to continuously improve end-to-end business processes, inside the organization and across business partners.</p><p><b>Benefits</b>: (1) more agility, (2) better alignment with industry best practices, (3) more efficiency (costs found and removed).</p><ol><li>Define and map the steps of a process.</li><li>Improve the steps that add value.</li><li>Remove or merge the steps that do not add value.</li><li>Create or adjust electronic workflows to match the improved process (this is where IS projects are most often found).</li></ol>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: how a project goes from a business need to the approval decision.</p>",
    "a": "<p>Key labels: business need (opportunity or pain) → high-level business requirements + business value → project sponsor → system request (5 elements) → feasibility analysis (technical, economic, organizational) → approval (steering) committee → go / no-go.</p>",
    "diagram": "flowchart LR\n  N([\"Business need: opportunity or pain\"]) --> R[\"Business requirements + business value\"]\n  R --> S[Project sponsor]\n  S --> SR[\"System request: 5 elements\"]\n  SR --> F[\"Feasibility analysis: technical, economic, organizational\"]\n  F --> C{\"Approval committee\"}\n  C -->|go| P([Project starts])\n  C -->|no-go| X([Rejected])"
   }
  ]
 },
 {
  "lesson": "W3-2",
  "questions": [
   {
    "type": "classify",
    "q": "<p>Sort into development cost, operational cost, tangible benefit or intangible benefit: hardware upgrades; data conversion costs; development team salaries; increased sales; increased market share; higher quality products; reductions in staff; operational team salaries; office space and equipment; software upgrades.</p>",
    "a": "<table><tr><th>Development (Year 0)</th><th>Operational (every year)</th><th>Tangible benefit</th><th>Intangible benefit</th></tr><tr><td>Data conversion costs<br>Development team salaries<br>Office space and equipment</td><td>Hardware upgrades<br>Operational team salaries<br>Software upgrades</td><td>Increased sales<br>Reductions in staff</td><td>Increased market share<br>Higher quality products</td></tr></table><p>Test: paid once to build = development; paid every year to run = operational. Sales (money) is tangible; market share is intangible.</p>"
   },
   {
    "type": "scenario",
    "q": "<p>A bank's IT team has only built websites. Now they must build a mobile banking app with loans, cards and payments at once, and connect it to a 20-year-old core banking system. Assess the technical feasibility using the 4 risk factors.</p>",
    "a": "<ul><li><b>Familiarity with the application</b>: they never built mobile banking → higher risk.</li><li><b>Familiarity with the technology</b>: new to mobile development → higher risk.</li><li><b>Project size</b>: loans + cards + payments at once = large → higher risk.</li><li><b>Compatibility</b>: hard to integrate with an old core system → higher risk.</li></ul><p>Conclusion: technical risk is <b>high</b> on all 4 factors. Reduce it with training or hiring experienced developers, and by splitting the project into smaller parts.</p>"
   },
   {
    "type": "mcq",
    "q": "<p>Which of these is <b>NOT</b> a technical feasibility risk factor?<br>A) Project size<br>B) Compatibility with existing technology<br>C) Strategic alignment with the business<br>D) Familiarity with the technology</p>",
    "a": "<p><b>C</b>, because strategic alignment is used to assess organizational feasibility; the technical factors are familiarity with the application and technology, project size and compatibility.</p>"
   },
   {
    "type": "short",
    "q": "<p>Who receives the system request and the feasibility analysis? What two jobs does feasibility analysis do, and what may the committee ask the analyst to prepare?</p>",
    "a": "<p>The <b>information systems approval committee</b> (steering committee); it decides whether the project should be undertaken.</p><p>Two jobs: (1) guide the <b>go / no-go</b> decision; (2) <b>identify the important risks</b> to manage if the project is approved.</p><p>The committee may ask for a more detailed <b>business case</b>.</p>"
   },
   {
    "type": "mcq",
    "q": "<p>Complete: \"The more expensive the project, the more ______ the economic feasibility analysis should be.\"<br>A) optimistic<br>B) detailed<br>C) informal<br>D) short</p>",
    "a": "<p><b>B</b>, because money is limited and many projects compete for it, so expensive projects need a more detailed cost–benefit analysis.</p>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: the 4 steps of an economic feasibility analysis and the measures used in the last step.</p>",
    "a": "<p>Key labels: (1) identify costs and benefits (one-time and recurring) → (2) assign values (even intangibles if possible) → (3) determine cash flow (usually 3–5 years) → (4) assess economic value with ROI, BEP and NPV.</p>",
    "diagram": "flowchart LR\n  A[\"1. Identify costs and benefits\"] --> B[\"2. Assign values\"]\n  B --> C[\"3. Determine cash flow: 3 to 5 years\"]\n  C --> D[\"4. Assess economic value\"]\n  D --> R[ROI]\n  D --> P[\"BEP: payback\"]\n  D --> N[NPV]"
   }
  ]
 },
 {
  "lesson": "W3-3",
  "questions": [
   {
    "type": "calculation",
    "q": "<p>During Project Planning phase, next cash flows were identified:</p><p><b>Development costs</b>: Consultant fees $35 000; Hardware and software $55 000; Data conversion tools $15 000<br><b>Operational costs</b>: Software licensing fees $12 000; Hardware repairs $8 000; User training $5 000<br><b>Tangible benefits</b>: Increased sales $40 000; Reduction in staff $20 000; Reductions in IT costs $5 000</p><p>Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = 5%.</p>",
    "a": "<p><i>Assumption: development costs are one-time in Year 0; operating costs and benefits are annual in Years 1–3.</i></p><p>Development (Year 0) = 35,000 + 55,000 + 15,000 = <b>105,000</b>. Operational = 12,000 + 8,000 + 5,000 = <b>25,000 per year</b>. Benefits = 40,000 + 20,000 + 5,000 = <b>65,000 per year</b>.</p><table><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th><th>Total</th></tr><tr><td>Total Benefits</td><td>–</td><td>65,000</td><td>65,000</td><td>65,000</td><td>195,000</td></tr><tr><td>Total Costs</td><td>105,000</td><td>25,000</td><td>25,000</td><td>25,000</td><td>180,000</td></tr><tr><td>Net Benefits</td><td>(105,000)</td><td>40,000</td><td>40,000</td><td>40,000</td><td>15,000</td></tr><tr><td>Cumulative</td><td>(105,000)</td><td>(65,000)</td><td>(25,000)</td><td>15,000</td><td></td></tr><tr><td>Divide by (1.05)<sup>n</sup></td><td>1</td><td>1.05</td><td>1.1025</td><td>1.157625</td><td></td></tr><tr><td>PV of Benefits</td><td>–</td><td>61,904.76</td><td>58,956.92</td><td>56,149.44</td><td><b>177,011.12</b></td></tr><tr><td>PV of Costs</td><td>105,000.00</td><td>23,809.52</td><td>22,675.74</td><td>21,595.94</td><td><b>173,081.20</b></td></tr></table><p><b>ROI</b> = (Total Benefits − Total Costs) / Total Costs = (195,000 − 180,000) / 180,000 = 15,000 / 180,000 = <b>8.33%</b></p><p><b>BEP</b>: the cumulative first turns positive in Year 3, so 2 negative years (Year 0 is not counted). BEP = 2 + (40,000 − 15,000) / 40,000 = 2 + 25,000 / 40,000 = 2 + 0.625 = <b>2.63 years</b></p><p><b>NPV</b> = Σ PV of Benefits − Σ PV of Costs = 177,011.12 − 173,081.20 = <b>$3,929.92</b>. NPV &gt; 0 → the project is <b>economically acceptable</b>.</p><p>Quick check (same net every year): −105,000 + 40,000 × 2.723248 = 3,929.92 ✓</p>"
   },
   {
    "type": "calculation",
    "q": "<p>During Project Planning phase, next cash flows were identified (not grouped, classify them yourself):</p><p>Development team salaries: $60 000<br>Software upgrades: $10 000<br>Increased sales: $50 000<br>Vendor installation: $20 000<br>Communications charges: $5 000<br>Increased brand recognition: (no dollar value could be estimated)<br>Office space and equipment: $10 000<br>Better supplier prices: $20 000<br>Operational team salaries: $15 000</p><p>(a) Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = 20%. Should the project be accepted?<br>(b) Would your decision change if the rate of return were 10%?</p>",
    "a": "<p><i>Assumption: development costs are one-time in Year 0; operating costs and benefits are annual in Years 1–3.</i></p><p><b>Classify first:</b> Development (Year 0) = development team salaries 60,000 + vendor installation 20,000 + office space and equipment 10,000 = <b>90,000</b>. Operational (every year) = software upgrades 10,000 + communications charges 5,000 + operational team salaries 15,000 = <b>30,000</b>. Tangible benefits (every year) = increased sales 50,000 + better supplier prices 20,000 = <b>70,000</b>. Increased brand recognition is an <b>intangible</b> benefit with no dollar value, so it stays out of the table (mention it in the conclusion).</p><table><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th><th>Total</th></tr><tr><td>Total Benefits</td><td>–</td><td>70,000</td><td>70,000</td><td>70,000</td><td>210,000</td></tr><tr><td>Total Costs</td><td>90,000</td><td>30,000</td><td>30,000</td><td>30,000</td><td>180,000</td></tr><tr><td>Net Benefits</td><td>(90,000)</td><td>40,000</td><td>40,000</td><td>40,000</td><td>30,000</td></tr><tr><td>Cumulative</td><td>(90,000)</td><td>(50,000)</td><td>(10,000)</td><td>30,000</td><td></td></tr><tr><td>Divide by (1.20)<sup>n</sup></td><td>1</td><td>1.2</td><td>1.44</td><td>1.728</td><td></td></tr><tr><td>PV of Benefits</td><td>–</td><td>58,333.33</td><td>48,611.11</td><td>40,509.26</td><td><b>147,453.70</b></td></tr><tr><td>PV of Costs</td><td>90,000.00</td><td>25,000.00</td><td>20,833.33</td><td>17,361.11</td><td><b>153,194.44</b></td></tr></table><p><b>ROI</b> = (Total Benefits − Total Costs) / Total Costs = (210,000 − 180,000) / 180,000 = 30,000 / 180,000 = <b>16.67%</b></p><p><b>BEP</b>: the cumulative first turns positive in Year 3, so 2 negative years (Year 0 is not counted). BEP = 2 + (40,000 − 30,000) / 40,000 = 2 + 10,000 / 40,000 = 2 + 0.25 = <b>2.25 years</b></p><p><b>NPV</b> = Σ PV of Benefits − Σ PV of Costs = 147,453.70 − 153,194.44 = <b>($5,740.74)</b>, negative. NPV &lt; 0 → the project should <b>not be accepted</b>.</p><p><b>Conclusion</b>: ROI is positive and the BEP is inside the 3-year life, so the \"naïve\" measures look good. But the more rigorous NPV is negative at 20%, so the project should <b>not</b> be accepted. (The intangible brand recognition can be mentioned to the committee, but it does not change the numbers.)</p><p><b>(b) At 10%</b>: PV of Benefits = 174,079.64; PV of Costs = 164,605.56; NPV = <b>$9,474.08</b> &gt; 0 → acceptable. The decision flips because a lower rate discounts future benefits less. NPV = 0 at about <b>15.9%</b>, so the rate must be below about 15.9% for a positive NPV.</p>"
   },
   {
    "type": "calculation",
    "q": "<p>During Project Planning phase, next cash flows were identified for a café chain's mobile ordering app:</p><p><b>Development costs</b>: Hardware and software $80 000; Consultant fees $30 000<br><b>Operational costs</b>: Software licensing fees $15 000 per year; Hardware repairs $5 000 in Year 1, $7 000 in Year 2, $10 000 in Year 3<br><b>Tangible benefits</b>: Increased sales $45 000 in Year 1, $55 000 in Year 2, $70 000 in Year 3; Reductions in inventory $15 000 per year</p><p>Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = 10%. Is the project economically acceptable?</p>",
    "a": "<p><i>Assumption: development costs are one-time in Year 0; operating costs and benefits are annual in Years 1–3.</i></p><p>Development (Year 0) = 80,000 + 30,000 = <b>110,000</b>. Operational: Year 1 = 15,000 + 5,000 = 20,000; Year 2 = 15,000 + 7,000 = 22,000; Year 3 = 15,000 + 10,000 = 25,000. Benefits: Year 1 = 45,000 + 15,000 = 60,000; Year 2 = 55,000 + 15,000 = 70,000; Year 3 = 70,000 + 15,000 = 85,000.</p><p><i>The yearly amounts are different here (growth), so every year is discounted separately. The quick shortcut with one net amount does not work.</i></p><table><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th><th>Total</th></tr><tr><td>Total Benefits</td><td>–</td><td>60,000</td><td>70,000</td><td>85,000</td><td>215,000</td></tr><tr><td>Total Costs</td><td>110,000</td><td>20,000</td><td>22,000</td><td>25,000</td><td>177,000</td></tr><tr><td>Net Benefits</td><td>(110,000)</td><td>40,000</td><td>48,000</td><td>60,000</td><td>38,000</td></tr><tr><td>Cumulative</td><td>(110,000)</td><td>(70,000)</td><td>(22,000)</td><td>38,000</td><td></td></tr><tr><td>Divide by (1.10)<sup>n</sup></td><td>1</td><td>1.1</td><td>1.21</td><td>1.331</td><td></td></tr><tr><td>PV of Benefits</td><td>–</td><td>54,545.45</td><td>57,851.24</td><td>63,861.76</td><td><b>176,258.45</b></td></tr><tr><td>PV of Costs</td><td>110,000.00</td><td>18,181.82</td><td>18,181.82</td><td>18,782.87</td><td><b>165,146.51</b></td></tr></table><p><b>ROI</b> = (Total Benefits − Total Costs) / Total Costs = (215,000 − 177,000) / 177,000 = 38,000 / 177,000 = <b>21.47%</b></p><p><b>BEP</b>: the cumulative first turns positive in Year 3, so 2 negative years (Year 0 is not counted). BEP = 2 + (60,000 − 38,000) / 60,000 = 2 + 22,000 / 60,000 = 2 + 0.367 = <b>2.37 years</b></p><p><b>NPV</b> = Σ PV of Benefits − Σ PV of Costs = 176,258.45 − 165,146.51 = <b>$11,111.95</b> (from the rounded totals: 11,111.94). NPV &gt; 0 → the project is <b>economically acceptable</b>.</p>"
   },
   {
    "type": "calculation",
    "q": "<p>During Project Planning phase, next cash flows were identified:</p><p><b>Development costs</b>: Office space and equipment $25 000; Vendor installation $30 000; Data conversion tools $15 000<br><b>Operational costs</b>: Software licensing fees $10 000; Hardware upgrades $10 000; User training $5 000<br><b>Tangible benefits</b>: Increased sales $45 000; Reductions in inventory $20 000; Reduction in staff $25 000</p><p>Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = 15%.</p>",
    "a": "<p><i>Assumption: development costs are one-time in Year 0; operating costs and benefits are annual in Years 1–3.</i></p><p>Development (Year 0) = 25,000 + 30,000 + 15,000 = <b>70,000</b>. Operational = 10,000 + 10,000 + 5,000 = <b>25,000 per year</b>. Benefits = 45,000 + 20,000 + 25,000 = <b>90,000 per year</b>.</p><table><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th><th>Total</th></tr><tr><td>Total Benefits</td><td>–</td><td>90,000</td><td>90,000</td><td>90,000</td><td>270,000</td></tr><tr><td>Total Costs</td><td>70,000</td><td>25,000</td><td>25,000</td><td>25,000</td><td>145,000</td></tr><tr><td>Net Benefits</td><td>(70,000)</td><td>65,000</td><td>65,000</td><td>65,000</td><td>125,000</td></tr><tr><td>Cumulative</td><td>(70,000)</td><td>(5,000)</td><td>60,000</td><td>125,000</td><td></td></tr><tr><td>Divide by (1.15)<sup>n</sup></td><td>1</td><td>1.15</td><td>1.3225</td><td>1.520875</td><td></td></tr><tr><td>PV of Benefits</td><td>–</td><td>78,260.87</td><td>68,052.93</td><td>59,176.46</td><td><b>205,490.26</b></td></tr><tr><td>PV of Costs</td><td>70,000.00</td><td>21,739.13</td><td>18,903.59</td><td>16,437.91</td><td><b>127,080.63</b></td></tr></table><p><b>ROI</b> = (Total Benefits − Total Costs) / Total Costs = (270,000 − 145,000) / 145,000 = 125,000 / 145,000 = <b>86.21%</b></p><p><b>BEP</b>: the cumulative first turns positive in Year 2, so 1 negative year (Year 0 is not counted). BEP = 1 + (65,000 − 60,000) / 65,000 = 1 + 5,000 / 65,000 = 1 + 0.077 = <b>1.08 years</b></p><p><b>NPV</b> = Σ PV of Benefits − Σ PV of Costs = 205,490.26 − 127,080.63 = <b>$78,409.63</b>. NPV &gt; 0 → the project is <b>economically acceptable</b>.</p><p>Quick check (same net every year): −70,000 + 65,000 × 2.283225 = 78,409.63 ✓</p>"
   },
   {
    "type": "calculation",
    "q": "<p>During Project Planning phase, next cash flows were identified:</p><p>Development team salaries $40 000; Hardware repairs $15 000; Increased sales $30 000; User training $10 000; Data conversion costs $10 000; Reductions in IT costs $15 000; Improved customer service (no dollar value).</p><p>Find the year when the cumulative net cash flow turns positive, and the BEP (project life 3 years).</p>",
    "a": "<p><b>Classify</b>: Development (Year 0) = 40,000 + 10,000 = <b>50,000</b>. Operational every year = hardware repairs 15,000 + user training 10,000 = <b>25,000</b>. Benefits every year = 30,000 + 15,000 = <b>45,000</b>. Improved customer service is intangible, left out.</p><table><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th></tr><tr><td>Net Benefits</td><td>(50,000)</td><td>20,000</td><td>20,000</td><td>20,000</td></tr><tr><td>Cumulative</td><td>(50,000)</td><td>(30,000)</td><td>(10,000)</td><td>10,000</td></tr></table><p>The cumulative turns positive in <b>Year 3</b>. BEP = 2 + (20,000 − 10,000) / 20,000 = 2 + 10,000 / 20,000 = <b>2.50 years</b>.</p><p><b>Trap</b>: if you put hardware repairs and user training in Year 0, you get (75,000) → (30,000) → 15,000 → 60,000 and the wrong answer Year 2. Both are operational (recurring) costs.</p>"
   },
   {
    "type": "mcq",
    "q": "<p>A project has ROI = 12% and BEP = 2.4 years over a 3-year life, but NPV at the required rate is −$3,000. What should the analyst recommend?<br>A) Accept, because ROI is positive<br>B) Accept, because the BEP is inside the project life<br>C) Do not accept, because NPV &lt; 0<br>D) Accept, because two of the three measures are positive</p>",
    "a": "<p><b>C</b>, because ROI and BEP are \"naïve\" and ignore the time value of money; NPV is the more rigorous and financially correct measure, and NPV &lt; 0 means the project should not be accepted.</p>"
   }
  ]
 },
 {
  "lesson": "W3-4",
  "questions": [
   {
    "type": "classify",
    "q": "<p>Which stakeholder group (champion, organizational management, system users) is each action aimed at?<br>1) Give them official roles on the project team.<br>2) Build a prototype to show the value to the executives who will benefit.<br>3) Market the benefits with memos and newsletters.<br>4) Hold weekly meetings to get their feedback.<br>5) Ask the champion to talk to his or her peers.<br>6) Give them specific tasks with deadlines.</p>",
    "a": "<p>1) System users · 2) Champion · 3) Organizational management · 4) System users · 5) Organizational management · 6) System users.</p>"
   },
   {
    "type": "scenario",
    "q": "<p>A supermarket chain plans a new in-store stock system. The company strategy is growth through online sales. The only champion is the Head of IT, who will retire in two months. Store managers, who will use the system every day, were not consulted. Assess the organizational feasibility and suggest actions.</p>",
    "a": "<ul><li><b>Strategic alignment is weak</b>: the system does not support the online-sales strategy → more risk. Action: show how stock data also supports online orders.</li><li><b>Single champion who is leaving</b>: support (time, money, political support) may leave too. Action: find a new high-level champion, ideally more than one.</li><li><b>Users ignored</b>: users decide success by using or not using the system. Action: give store managers official roles, tasks with deadlines and regular feedback meetings.</li><li>Present the benefits to management to secure the budget.</li></ul><p>Conclusion: organizational feasibility is currently <b>low</b>.</p>"
   },
   {
    "type": "mcq",
    "q": "<p>The project champion is:<br>A) always the project manager<br>B) a high-level executive, usually but not always the project sponsor<br>C) the most experienced system user<br>D) the chair of the approval committee</p>",
    "a": "<p><b>B</b>, because the champion is a high-level executive who gives time, resources and political support, and is usually (not always) the project sponsor.</p>"
   },
   {
    "type": "short",
    "q": "<p>Compare the three feasibility dimensions: the question each one answers and how each one is assessed.</p>",
    "a": "<table><tr><th>Dimension</th><th>Question</th><th>How assessed</th></tr><tr><td>Technical</td><td>Can we build it?</td><td>Risk factors: familiarity with application and technology, project size, compatibility</td></tr><tr><td>Economic</td><td>Should we build it? (Will it provide business value?)</td><td>Cost–benefit analysis: cash flow → ROI, BEP, NPV</td></tr><tr><td>Organizational</td><td>If we build it, will they come? (Will it be used?)</td><td>Strategic alignment + stakeholder analysis</td></tr></table>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: how organizational feasibility is assessed, with the three most important stakeholders and their roles.</p>",
    "a": "<p>Key labels: two ways, strategic alignment (more fit = less risk) and stakeholder analysis. Stakeholders: champion (initiates, promotes, gives time and resources), organizational management (knows the project, budgets money, encourages use), system users (decisions, hands-on work, decide success by using the system).</p>",
    "diagram": "flowchart TD\n  O([\"Organizational feasibility\"]) --> SA[\"Strategic alignment: more fit = less risk\"]\n  O --> ST[Stakeholder analysis]\n  ST --> CH[\"Champion: initiates, promotes, time and resources\"]\n  ST --> MG[\"Management: knows project, budgets money, encourages use\"]\n  ST --> US[\"Users: decisions, hands-on work, decide success\"]"
   }
  ]
 },
 {
  "lesson": "W4-1",
  "questions": [
   {
    "type": "calculation",
    "q": "<p><b>(a)</b> Depict graphically: <b>Phased</b> development methodology.</p><p><b>(b)</b> During the Project Planning phase, the next cash flows were identified:</p><ul><li><b>Development costs:</b> Office space and equipment $45,000; Vendor installation $35,000; Data conversion tools $20,000</li><li><b>Operational costs:</b> Software upgrades $15,000; Operational team salaries $20,000; User training $5,000</li><li><b>Tangible benefits:</b> Increased sales $50,000; Reduction in staff $25,000; Better supplier prices $10,000</li></ul><p>Find: ROI, BEP and NPV, if the project life cycle is 3 years and rate of return = 7%.</p>",
    "a": "<p><b>(a)</b> Draw Planning and Analysis once, then 3 cycles (Analysis → Design → Implementation), each in a dotted ellipse and each ending in a rounded \"System version n\". A long arrow goes from each version into the Analysis of the next cycle. Add wavy back-arrows between boxes. Write: \"The system is built as a series of versions; the most important requirements go into version 1. Pro: a useful system reaches users quickly. Con: users work with an intentionally incomplete system. RAD methodology.\"</p><p><b>(b)</b> Assumption: development costs once in Year 0; operational costs and benefits every year, Years 1–3.</p><p>Development = 45,000 + 35,000 + 20,000 = <b>100,000</b>. Operational = 15,000 + 20,000 + 5,000 = <b>40,000/yr</b>. Benefits = 50,000 + 25,000 + 10,000 = <b>85,000/yr</b>.</p><table><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th><th>Total</th></tr><tr><td>Total Benefits</td><td>0</td><td>85,000</td><td>85,000</td><td>85,000</td><td>255,000</td></tr><tr><td>Total Costs</td><td>100,000</td><td>40,000</td><td>40,000</td><td>40,000</td><td>220,000</td></tr><tr><td>Net Benefits</td><td>(100,000)</td><td>45,000</td><td>45,000</td><td>45,000</td><td>35,000</td></tr><tr><td>Cumulative</td><td>(100,000)</td><td>(55,000)</td><td>(10,000)</td><td>35,000</td><td></td></tr><tr><td>Divide by 1.07<sup>n</sup></td><td>1</td><td>1.07</td><td>1.1449</td><td>1.225043</td><td></td></tr><tr><td>PV of Benefits</td><td>0</td><td>79,439.25</td><td>74,242.29</td><td>69,385.32</td><td><b>223,066.86</b></td></tr><tr><td>PV of Costs</td><td>100,000.00</td><td>37,383.18</td><td>34,937.55</td><td>32,651.92</td><td><b>204,972.64</b></td></tr></table><p><b>ROI</b> = (255,000 − 220,000) / 220,000 = 35,000 / 220,000 = <b>15.91%</b></p><p><b>BEP:</b> cumulative turns positive in Year 3; negative years before it (not counting Year 0) = 2. BEP = 2 + (45,000 − 35,000) / 45,000 = 2 + 0.22 = <b>2.22 years</b>.</p><p><b>NPV</b> = 223,066.86 − 204,972.64 = <b>$18,094.22 &gt; 0</b> → economically acceptable.</p>",
    "diagram": "flowchart TD\n  P[Planning] --> A0[Analysis]\n  A0 -.->|back| P\n  subgraph C1[\"Version 1 cycle\"]\n    direction LR\n    A1[Analysis] --> D1[Design] --> I1[Implementation]\n  end\n  A0 --> A1\n  I1 --> S1([\"System version 1\"])\n  S1 --> A2\n  subgraph C2[\"Version 2 cycle\"]\n    direction LR\n    A2[Analysis] --> D2[Design] --> I2[Implementation]\n  end\n  I2 --> S2([\"System version 2\"])\n  S2 --> A3\n  subgraph C3[\"Version 3 cycle\"]\n    direction LR\n    A3[Analysis] --> D3[Design] --> I3[Implementation]\n  end\n  I3 --> S3([\"System version 3\"])"
   },
   {
    "type": "calculation",
    "q": "<p><b>(a)</b> Depict graphically: <b>Throwaway prototyping</b> development methodology.</p><p><b>(b)</b> During the Project Planning phase, the next cash flows were identified:</p><ul><li><b>Development costs:</b> Office space and equipment $50,000; Vendor installation $30,000; Data conversion tools $25,000</li><li><b>Operational costs:</b> Software upgrades $10,000; Operational team salaries $15,000; User training $10,000</li><li><b>Tangible benefits:</b> Increased sales $70,000; Reduction in staff $30,000; Better supplier prices $20,000</li></ul><p>Find: ROI, BEP and NPV, if the project life cycle is 3 years and rate of return = 18%.</p>",
    "a": "<p><b>(a)</b> Draw Planning → Analysis, then a stacked block (Analysis / Design / Implementation) that produces a rounded <b>\"Design prototype\"</b>, with a loop from the prototype back into the block. From the prototype, the real system is built on a separate path: Design → Implementation → System. Write: \"The design prototype is used only to clarify unclear requirements and is then thrown away, because prototypes are undocumented, have a degraded structure and do not meet quality standards. Rated excellent for unclear requirements, unfamiliar technology, complex systems and reliable systems.\"</p><p><b>(b)</b> Assumption: development costs in Year 0; operational costs and benefits every year, Years 1–3.</p><p>Development = 50,000 + 30,000 + 25,000 = <b>105,000</b>. Operational = 10,000 + 15,000 + 10,000 = <b>35,000/yr</b>. Benefits = 70,000 + 30,000 + 20,000 = <b>120,000/yr</b>.</p><table><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th><th>Total</th></tr><tr><td>Total Benefits</td><td>0</td><td>120,000</td><td>120,000</td><td>120,000</td><td>360,000</td></tr><tr><td>Total Costs</td><td>105,000</td><td>35,000</td><td>35,000</td><td>35,000</td><td>210,000</td></tr><tr><td>Net Benefits</td><td>(105,000)</td><td>85,000</td><td>85,000</td><td>85,000</td><td>150,000</td></tr><tr><td>Cumulative</td><td>(105,000)</td><td>(20,000)</td><td>65,000</td><td>150,000</td><td></td></tr><tr><td>Divide by 1.18<sup>n</sup></td><td>1</td><td>1.18</td><td>1.3924</td><td>1.643032</td><td></td></tr><tr><td>PV of Benefits</td><td>0</td><td>101,694.92</td><td>86,182.13</td><td>73,035.70</td><td><b>260,912.75</b></td></tr><tr><td>PV of Costs</td><td>105,000.00</td><td>29,661.02</td><td>25,136.46</td><td>21,302.08</td><td><b>181,099.55</b></td></tr></table><p><b>ROI</b> = (360,000 − 210,000) / 210,000 = 150,000 / 210,000 = <b>71.43%</b></p><p><b>BEP:</b> cumulative turns positive in Year 2; negative years before it (not counting Year 0) = 1. BEP = 1 + (85,000 − 65,000) / 85,000 = 1 + 0.24 = <b>1.24 years</b>.</p><p><b>NPV</b> = 260,912.75 − 181,099.55 = <b>$79,813.20 &gt; 0</b> → economically acceptable.</p>",
    "diagram": "flowchart LR\n  P[Planning] --> A[Analysis]\n  A -.->|back| P\n  subgraph BLK[\"Repeated together\"]\n    direction TB\n    A2[Analysis] --- D2[Design] --- I2[Implementation]\n  end\n  A --> A2\n  I2 --> DP([\"Design prototype\"])\n  DP -.->|\"feedback, repeat\"| A2\n  DP --> D3[Design]\n  D3 --> I3[Implementation]\n  I3 -.->|back| D3\n  I3 --> S([System])"
   },
   {
    "type": "classify",
    "q": "<p>Before you calculate, classify each item as <b>development cost (Year 0)</b>, <b>operational cost (every year)</b>, <b>tangible benefit</b>, or <b>leave out</b>: Data conversion tools · User training · Increased sales · Vendor installation · Software upgrades · Better customer image (no dollar value could be estimated) · Operational team salaries · Reduction in staff.</p>",
    "a": "<table><tr><th>Development (Year 0)</th><th>Operational (Years 1–3)</th><th>Tangible benefit</th><th>Leave out</th></tr><tr><td>Data conversion tools, Vendor installation</td><td>User training, Software upgrades, Operational team salaries</td><td>Increased sales, Reduction in staff</td><td>Better customer image (intangible, no value)</td></tr></table><p>Trap: User training and Software upgrades look like one-time costs, but they are <b>operational</b>, so they repeat every year.</p>"
   },
   {
    "type": "short",
    "q": "<p>A student solved Quiz 1 Version 2 (development $110,000 incl. Data conversion tools $20,000; operational $40,000/yr; benefits $110,000/yr; 10%) and wrote these three lines. Find the mistake in each and give the correct result.</p><ol><li>\"Development = 40,000 + 50,000 + 20,000 + User training 10,000 = 120,000.\"</li><li>\"PV of Year 0 cost = 110,000 / 1.10 = 100,000.\"</li><li>\"Cumulative: (110,000), (40,000), 30,000. Years 0 and 1 are negative, so BEP = 2 + (70,000 − 30,000) / 70,000 = 2.57 years.\"</li></ol>",
    "a": "<ol><li>User training is an <b>operational</b> cost (every year), not development. Development = 40,000 + 50,000 + 20,000 = <b>110,000</b>.</li><li><b>Year 0 is not discounted</b> ((1 + r)<sup>0</sup> = 1). PV of Year 0 cost = <b>110,000</b>.</li><li><b>Year 0 is not counted</b> as a negative year. Only Year 1 counts: BEP = 1 + 40,000 / 70,000 = <b>1.57 years</b>.</li></ol><p>With these fixes: ROI = 43.48%, NPV = $64,079.64 &gt; 0 → acceptable.</p>"
   },
   {
    "type": "mcq",
    "q": "<p>For the same project, the rate of return in the question changes from 7% to 18%. All cash flows stay the same. Which results change?</p><p>A) ROI, BEP and NPV<br>B) Only ROI<br>C) Only NPV<br>D) BEP and NPV</p>",
    "a": "<p><b>C</b>, because only NPV uses the rate (it discounts future money). ROI and BEP use the undiscounted table, so they do not change. A higher rate makes the NPV <b>smaller</b>.</p>"
   }
  ]
 },
 {
  "lesson": "W4-2",
  "questions": [
   {
    "type": "mcq",
    "q": "<p>In which stage of the project management process does the manager <b>develop a risk management strategy</b>?</p><p>A) Initiation<br>B) Planning<br>C) Execution<br>D) Monitoring and Controlling</p>",
    "a": "<p><b>B</b>, because Planning = create the project plan, create the WBS and develop a risk management strategy. (Initiation creates the project charter.)</p>"
   },
   {
    "type": "classify",
    "q": "<p>Put each activity into the correct stage of the project management process: (a) document lessons learned; (b) create the project charter; (c) monitor progress against KPIs; (d) assign tasks to team members; (e) create the WBS; (f) identify key stakeholders; (g) apply changes after a regular review; (h) complete the deliverables.</p>",
    "a": "<table><tr><th>Stage</th><th>Activities</th></tr><tr><td>Initiation</td><td>(b) charter, (f) key stakeholders</td></tr><tr><td>Planning</td><td>(e) WBS</td></tr><tr><td>Execution</td><td>(d) assign tasks</td></tr><tr><td>Monitoring and Controlling</td><td>(c) KPIs, (g) apply changes</td></tr><tr><td>Closure</td><td>(a) lessons learned, (h) complete deliverables</td></tr></table>"
   },
   {
    "type": "scenario",
    "q": "<p>The university library wants a mobile app so students can reserve books and study rooms. It needs <b>3 developers</b>, costs about <b>$25,000</b>, takes <b>4 months</b>, and is used only by the <b>library department</b>. The team has built similar apps before. The library expects to save staff time at the front desk. Classify this project using the 7 ways.</p>",
    "a": "<ul><li><b>Size:</b> small, 3 people.</li><li><b>Cost:</b> $25,000 (low).</li><li><b>Purpose:</b> improve operations (less front-desk work, better service).</li><li><b>Length:</b> 4 months; value comes when the app goes live.</li><li><b>Risk:</b> low, the team has built similar apps.</li><li><b>Scope:</b> one department (the library), not the whole university.</li><li><b>ROI:</b> compare the saved staff time (in money) with the $25,000.</li></ul>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: the <b>five stages of the project management process</b>, with the key activities of each stage.</p>",
    "a": "<p>Five boxes in a row: <b>Initiation → Planning → Execution → Monitoring and Controlling → Closure</b>, with a back-arrow from Monitoring and Controlling to Execution (changes are applied and work continues). Under each box write 2–3 key activities: charter and stakeholders; plan, WBS and risk strategy; workflows and task assignment; reviews, KPIs and changes; deliverables and lessons learned.</p>",
    "diagram": "flowchart LR\n  I([\"1 Initiation<br/>purpose, scope, charter\"]) --> P([\"2 Planning<br/>plan, WBS, risk strategy\"])\n  P --> E([\"3 Execution<br/>workflows, assign tasks\"])\n  E --> M([\"4 Monitoring and Controlling<br/>reviews, KPIs, changes\"])\n  M -.->|changes| E\n  M --> C([\"5 Closure<br/>deliverables, lessons learned\"])"
   },
   {
    "type": "short",
    "q": "<p>A task is <b>\"Conduct user interviews\"</b>. List the 10 pieces of information that describe a task and fill each one with a sensible value for this task.</p>",
    "a": "<table><tr><th>Information</th><th>Example value</th></tr><tr><td>Name</td><td>Conduct user interviews</td></tr><tr><td>Start date</td><td>Nov 2</td></tr><tr><td>Completion date</td><td>Nov 13</td></tr><tr><td>Person assigned</td><td>Systems analyst: A. Karimov</td></tr><tr><td>Deliverable(s)</td><td>Interview reports</td></tr><tr><td>Completion status</td><td>Open</td></tr><tr><td>Priority</td><td>High</td></tr><tr><td>Resources needed</td><td>Meeting room, voice recorder</td></tr><tr><td>Estimated time</td><td>20 hours</td></tr><tr><td>Actual time</td><td>(filled in when done)</td></tr></table>"
   },
   {
    "type": "mcq",
    "q": "<p>Which of these is <b>NOT</b> one of the three traditional project management tools?</p><p>A) Work breakdown structure<br>B) Gantt chart<br>C) Network diagram<br>D) Use case diagram</p>",
    "a": "<p><b>D</b>, because the 3 traditional tools are the WBS, the Gantt chart and the network diagram (PERT/CPM). A use case diagram is an analysis-phase model, not a PM tool.</p>"
   }
  ]
 },
 {
  "lesson": "W4-3",
  "questions": [
   {
    "type": "calculation",
    "q": "<p><b>Library self-checkout system</b> (durations in weeks).</p><table><tr><th>Task</th><th>Name</th><th>Weeks</th><th>Depends on</th></tr><tr><td>A</td><td>Define requirements</td><td>2</td><td>–</td></tr><tr><td>B</td><td>Select RFID hardware</td><td>3</td><td>A</td></tr><tr><td>C</td><td>Design database</td><td>4</td><td>A</td></tr><tr><td>D</td><td>Order and install hardware</td><td>5</td><td>B</td></tr><tr><td>E</td><td>Develop software</td><td>6</td><td>C</td></tr><tr><td>F</td><td>Integrate and test</td><td>2</td><td>D, E</td></tr><tr><td>G</td><td>Train librarians</td><td>1</td><td>D</td></tr><tr><td>H</td><td>Go live and review</td><td>1</td><td>F, G</td></tr></table><p>(a) Draw the network diagram. (b) Do the forward pass. (c) Give the critical path and the total duration. (d) Which tasks can slip, and by how much?</p>",
    "a": "<p><b>(a)</b> See the diagram: one box per task (ID, name, duration), one arrow per dependency; critical tasks get a double/thick border.</p><p><b>(b) Forward pass</b> (ES = biggest EF of predecessors; EF = ES + duration):</p><table><tr><th>Task</th><th>Dur</th><th>Pred.</th><th>ES</th><th>EF</th><th>Spare</th></tr><tr><td>A</td><td>2</td><td>–</td><td>0</td><td>2</td><td>0</td></tr><tr><td>B</td><td>3</td><td>A</td><td>2</td><td>5</td><td>2</td></tr><tr><td>C</td><td>4</td><td>A</td><td>2</td><td>6</td><td>0</td></tr><tr><td>D</td><td>5</td><td>B</td><td>5</td><td>10</td><td>2</td></tr><tr><td>E</td><td>6</td><td>C</td><td>6</td><td>12</td><td>0</td></tr><tr><td>F</td><td>2</td><td>D, E</td><td>max(10, 12) = 12</td><td>14</td><td>0</td></tr><tr><td>G</td><td>1</td><td>D</td><td>10</td><td>11</td><td>3</td></tr><tr><td>H</td><td>1</td><td>F, G</td><td>max(14, 11) = 14</td><td><b>15</b></td><td>0</td></tr></table><p><b>(c) Paths:</b> A-B-D-F-H = 2 + 3 + 5 + 2 + 1 = 13; A-B-D-G-H = 2 + 3 + 5 + 1 + 1 = 12; <b>A-C-E-F-H = 2 + 4 + 6 + 2 + 1 = 15</b>. Critical path <b>A → C → E → F → H</b>, total duration <b>15 weeks</b>.</p><p><b>(d)</b> Spare = 15 − longest path through the task. <b>B and D: 2 weeks</b> (path 13), but they share it: if B uses 1 week, D has only 1 left. <b>G: 3 weeks</b> (path 12). A, C, E, F, H: 0, they cannot slip.</p>",
    "diagram": "flowchart LR\n  ST((Start)) ==> A[\"A Define requirements<br/>2 wks\"]\n  A --> B[\"B Select RFID hardware<br/>3 wks\"]\n  A ==> C[\"C Design database<br/>4 wks\"]\n  B --> D[\"D Install hardware<br/>5 wks\"]\n  C ==> E[\"E Develop software<br/>6 wks\"]\n  D --> F[\"F Integrate and test<br/>2 wks\"]\n  E ==> F\n  D --> G[\"G Train librarians<br/>1 wk\"]\n  F ==> H[\"H Go live<br/>1 wk\"]\n  G --> H\n  H ==> FN((Finish))\n  classDef crit stroke-width:4px\n  class A,C,E,F,H crit"
   },
   {
    "type": "drawing",
    "q": "<p><b>Café ordering app MVP</b> (durations in days). Depict graphically the <b>Gantt chart</b> (every task as early as possible, start Mon 2 Nov), then find the critical path, the total duration and the spare time of each task.</p><table><tr><th>Task</th><th>Name</th><th>Days</th><th>Depends on</th></tr><tr><td>A</td><td>Kick-off and requirements</td><td>3</td><td>–</td></tr><tr><td>B</td><td>UI design</td><td>5</td><td>A</td></tr><tr><td>C</td><td>API design</td><td>4</td><td>A</td></tr><tr><td>D</td><td>Build mobile screens</td><td>8</td><td>B</td></tr><tr><td>E</td><td>Build server API</td><td>7</td><td>C</td></tr><tr><td>F</td><td>Payment integration</td><td>4</td><td>E</td></tr><tr><td>G</td><td>Integration testing</td><td>3</td><td>D, F</td></tr><tr><td>H</td><td>Store submission</td><td>2</td><td>G</td></tr><tr><td>I</td><td>Write user guide</td><td>3</td><td>B</td></tr></table>",
    "a": "<p><b>Gantt chart:</b> one row per task, days across the top, each bar from ES to EF, arrows for dependencies, critical bars highlighted, a ◆ milestone \"Launch\" at the end.</p><table><tr><th>Task</th><th>Dur</th><th>Pred.</th><th>ES</th><th>EF</th><th>Spare</th></tr><tr><td>A</td><td>3</td><td>–</td><td>0</td><td>3</td><td>0</td></tr><tr><td>B</td><td>5</td><td>A</td><td>3</td><td>8</td><td>2</td></tr><tr><td>C</td><td>4</td><td>A</td><td>3</td><td>7</td><td>0</td></tr><tr><td>D</td><td>8</td><td>B</td><td>8</td><td>16</td><td>2</td></tr><tr><td>E</td><td>7</td><td>C</td><td>7</td><td>14</td><td>0</td></tr><tr><td>F</td><td>4</td><td>E</td><td>14</td><td>18</td><td>0</td></tr><tr><td>G</td><td>3</td><td>D, F</td><td>max(16, 18) = 18</td><td>21</td><td>0</td></tr><tr><td>H</td><td>2</td><td>G</td><td>21</td><td><b>23</b></td><td>0</td></tr><tr><td>I</td><td>3</td><td>B</td><td>8</td><td>11</td><td>12</td></tr></table><p><b>Paths:</b> A-B-D-G-H = 3 + 5 + 8 + 3 + 2 = 21; <b>A-C-E-F-G-H = 3 + 4 + 7 + 4 + 3 + 2 = 23</b>; A-B-I = 3 + 5 + 3 = 11.</p><p><b>Critical path A → C → E → F → G → H = 23 days</b> (2 Nov to 24 Nov). <b>B and D</b> can slip <b>2 days</b> (shared). <b>I</b> can slip <b>12 days</b> (23 − 11). All others: 0.</p>",
    "diagram": "gantt\n  title Cafe app MVP, earliest start, in days\n  dateFormat YYYY-MM-DD\n  axisFormat %d %b\n  todayMarker off\n  section Design\n  A Kick-off and requirements :crit, a, 2026-11-02, 3d\n  B UI design :b, after a, 5d\n  C API design :crit, c, after a, 4d\n  section Build\n  D Build mobile screens :d, after b, 8d\n  E Build server API :crit, e, after c, 7d\n  F Payment integration :crit, f, after e, 4d\n  I Write user guide :i, after b, 3d\n  section Release\n  G Integration testing :crit, g, after d f, 3d\n  H Store submission :crit, h, after g, 2d\n  Launch :milestone, m1, after h, 0d"
   },
   {
    "type": "calculation",
    "q": "<p><b>New HR system: PERT + CPM</b> (weeks; o = optimistic, m = most likely, p = pessimistic).</p><table><tr><th>Task</th><th>Name</th><th>o</th><th>m</th><th>p</th><th>Depends on</th></tr><tr><td>A</td><td>Plan project</td><td>1</td><td>2</td><td>3</td><td>–</td></tr><tr><td>B</td><td>Gather requirements</td><td>2</td><td>3</td><td>10</td><td>A</td></tr><tr><td>C</td><td>Set up servers</td><td>1</td><td>2</td><td>9</td><td>A</td></tr><tr><td>D</td><td>Design system</td><td>3</td><td>4</td><td>11</td><td>B</td></tr><tr><td>E</td><td>Develop</td><td>4</td><td>6</td><td>14</td><td>C, D</td></tr><tr><td>F</td><td>Migrate data</td><td>2</td><td>3</td><td>4</td><td>C</td></tr><tr><td>G</td><td>Test</td><td>1</td><td>2</td><td>3</td><td>E, F</td></tr><tr><td>H</td><td>Deploy</td><td>1</td><td>1</td><td>1</td><td>G</td></tr></table><p>(a) Compute each PERT estimate. (b) Draw the network and find the critical path and expected duration. (c) The server supplier warns that C may take 4 weeks longer. Does the project end later?</p>",
    "a": "<p><b>(a)</b> PERT = (o + 4m + p) / 6: A = (1 + 8 + 3)/6 = <b>2</b>; B = (2 + 12 + 10)/6 = <b>4</b>; C = (1 + 8 + 9)/6 = <b>3</b>; D = (3 + 16 + 11)/6 = <b>5</b>; E = (4 + 24 + 14)/6 = <b>7</b>; F = (2 + 12 + 4)/6 = <b>3</b>; G = (1 + 8 + 3)/6 = <b>2</b>; H = (1 + 4 + 1)/6 = <b>1</b>.</p><p><b>(b) Forward pass:</b></p><table><tr><th>Task</th><th>Dur</th><th>Pred.</th><th>ES</th><th>EF</th><th>Spare</th></tr><tr><td>A</td><td>2</td><td>–</td><td>0</td><td>2</td><td>0</td></tr><tr><td>B</td><td>4</td><td>A</td><td>2</td><td>6</td><td>0</td></tr><tr><td>C</td><td>3</td><td>A</td><td>2</td><td>5</td><td>6</td></tr><tr><td>D</td><td>5</td><td>B</td><td>6</td><td>11</td><td>0</td></tr><tr><td>E</td><td>7</td><td>C, D</td><td>max(5, 11) = 11</td><td>18</td><td>0</td></tr><tr><td>F</td><td>3</td><td>C</td><td>5</td><td>8</td><td>10</td></tr><tr><td>G</td><td>2</td><td>E, F</td><td>max(18, 8) = 18</td><td>20</td><td>0</td></tr><tr><td>H</td><td>1</td><td>G</td><td>20</td><td><b>21</b></td><td>0</td></tr></table><p>Paths: <b>A-B-D-E-G-H = 2 + 4 + 5 + 7 + 2 + 1 = 21</b>; A-C-E-G-H = 15; A-C-F-G-H = 11. Critical path <b>A → B → D → E → G → H</b>, expected duration <b>21 weeks</b>.</p><p><b>(c)</b> No. C has <b>6 weeks</b> spare (21 − 15). With +4 weeks the longest path through C is 19, still under 21, so the end date stays at week 21.</p>",
    "diagram": "flowchart LR\n  A[\"A Plan project<br/>2 wks\"] ==> B[\"B Gather requirements<br/>4 wks\"]\n  A --> C[\"C Set up servers<br/>3 wks\"]\n  B ==> D[\"D Design system<br/>5 wks\"]\n  D ==> E[\"E Develop<br/>7 wks\"]\n  C --> E\n  C --> F[\"F Migrate data<br/>3 wks\"]\n  E ==> G[\"G Test<br/>2 wks\"]\n  F --> G\n  G ==> H[\"H Deploy<br/>1 wk\"]\n  classDef crit stroke-width:4px\n  class A,B,D,E,G,H crit"
   },
   {
    "type": "calculation",
    "q": "<p><b>University online exam system</b> (durations in weeks).</p><table><tr><th>Task</th><th>Name</th><th>Weeks</th><th>Depends on</th></tr><tr><td>A</td><td>Study current exam process</td><td>2</td><td>–</td></tr><tr><td>B</td><td>Write requirements</td><td>3</td><td>A</td></tr><tr><td>C</td><td>Buy cloud hosting</td><td>1</td><td>A</td></tr><tr><td>D</td><td>Design question bank</td><td>4</td><td>B</td></tr><tr><td>E</td><td>Design exam interface</td><td>3</td><td>B</td></tr><tr><td>F</td><td>Build question bank</td><td>5</td><td>D</td></tr><tr><td>G</td><td>Build exam interface</td><td>6</td><td>C, E</td></tr><tr><td>H</td><td>Security testing</td><td>2</td><td>F, G</td></tr><tr><td>I</td><td>Pilot exam with one faculty</td><td>2</td><td>H</td></tr><tr><td>J</td><td>Train teachers</td><td>3</td><td>G</td></tr></table><p>(a) Forward pass, critical path(s) and total duration. (b) Which tasks can slip and by how much? (c) What happens if E takes 1 week longer? If J takes 2 weeks longer?</p>",
    "a": "<table><tr><th>Task</th><th>Dur</th><th>Pred.</th><th>ES</th><th>EF</th><th>Spare</th></tr><tr><td>A</td><td>2</td><td>–</td><td>0</td><td>2</td><td>0</td></tr><tr><td>B</td><td>3</td><td>A</td><td>2</td><td>5</td><td>0</td></tr><tr><td>C</td><td>1</td><td>A</td><td>2</td><td>3</td><td>5</td></tr><tr><td>D</td><td>4</td><td>B</td><td>5</td><td>9</td><td>0</td></tr><tr><td>E</td><td>3</td><td>B</td><td>5</td><td>8</td><td>0</td></tr><tr><td>F</td><td>5</td><td>D</td><td>9</td><td>14</td><td>0</td></tr><tr><td>G</td><td>6</td><td>C, E</td><td>max(3, 8) = 8</td><td>14</td><td>0</td></tr><tr><td>H</td><td>2</td><td>F, G</td><td>max(14, 14) = 14</td><td>16</td><td>0</td></tr><tr><td>I</td><td>2</td><td>H</td><td>16</td><td><b>18</b></td><td>0</td></tr><tr><td>J</td><td>3</td><td>G</td><td>14</td><td>17</td><td>1</td></tr></table><p><b>(a) Paths:</b> A-B-D-F-H-I = 2 + 3 + 4 + 5 + 2 + 2 = <b>18</b>; A-B-E-G-H-I = 2 + 3 + 3 + 6 + 2 + 2 = <b>18</b>; A-B-E-G-J = 17; A-C-G-H-I = 13; A-C-G-J = 12.</p><p>There are <b>two critical paths</b>, both 18 weeks: <b>A → B → D → F → H → I</b> and <b>A → B → E → G → H → I</b>. Total duration <b>18 weeks</b>. Mark A, B, D, E, F, G, H, I with a double border.</p><p><b>(b)</b> Only <b>C: 5 weeks</b> (18 − 13) and <b>J: 1 week</b> (18 − 17). Every other task is critical (0).</p><p><b>(c)</b> E + 1: path A-B-E-G-H-I becomes 19, so the project ends <b>1 week later (19 weeks)</b>. J + 2: path A-B-E-G-J becomes 19, so the project also ends <b>1 week later</b> (J had only 1 week spare).</p>",
    "diagram": "flowchart LR\n  A[\"A Study exam process<br/>2\"] ==> B[\"B Write requirements<br/>3\"]\n  A --> C[\"C Buy cloud hosting<br/>1\"]\n  B ==> D[\"D Design question bank<br/>4\"]\n  B ==> E[\"E Design exam interface<br/>3\"]\n  D ==> F[\"F Build question bank<br/>5\"]\n  E ==> G[\"G Build exam interface<br/>6\"]\n  C --> G\n  F ==> H[\"H Security testing<br/>2\"]\n  G ==> H\n  H ==> I[\"I Pilot exam<br/>2\"]\n  G --> J[\"J Train teachers<br/>3\"]\n  classDef crit stroke-width:4px\n  class A,B,D,E,F,G,H,I crit"
   },
   {
    "type": "mcq",
    "q": "<p>On a network diagram, task 6 is drawn with <b>crossed lines (an X)</b> and task 9 with <b>one diagonal line</b>. What does this mean?</p><p>A) 6 is critical, 9 is not critical<br>B) 6 is completed, 9 is partially completed<br>C) 6 is cancelled, 9 is delayed<br>D) 6 is a milestone, 9 is a dependency</p>",
    "a": "<p><b>B</b>, because one diagonal line = partially completed and crossed lines = completed. Critical tasks are shown with a special (double) border, milestones are diamonds or upside-down triangles on a Gantt chart.</p>"
   },
   {
    "type": "short",
    "q": "<p>Compare the <b>Gantt chart</b> and the <b>network diagram</b>: what does each show best, and where do both get their data from?</p>",
    "a": "<ul><li><b>Gantt chart:</b> a horizontal bar chart; tasks are rows, time runs across the top. Best for <b>time</b>: when each task starts and ends, progress (filled bars), milestones (◆/▼), who is assigned. Shows high-level status quickly.</li><li><b>Network diagram:</b> a node-and-arc graph; nodes = tasks with time estimates, arcs = dependencies. Best for <b>dependencies</b> and finding the <b>critical path</b> (CPM, with or without PERT).</li><li>Both are driven by the <b>WBS</b> (tasks, durations, status, dependencies).</li></ul>"
   }
  ]
 },
 {
  "lesson": "W4-4",
  "questions": [
   {
    "type": "calculation",
    "q": "<p>At the end of inception, a well-done project plan estimates a new hospital appointment system at <b>$120,000</b> and <b>16 weeks</b>. Using the hurricane model, give the realistic ranges for cost and schedule. How should these ranges change later in the project?</p>",
    "a": "<p>Hurricane model: <b>±100% for cost</b>, <b>±25% for schedule</b> at the end of inception.</p><p>Cost: 120,000 ± 120,000 = <b>$0 to $240,000</b>.</p><p>Schedule: 16 ± 0.25 × 16 = 16 ± 4 = <b>12 to 20 weeks</b>.</p><p>The ranges get <b>narrower</b> through Elaboration, Construction and Transition, as the system becomes better defined.</p>"
   },
   {
    "type": "calculation",
    "q": "<p>A project was planned for <b>24 weeks</b>. Analysis was planned for <b>6 weeks</b> but took <b>8</b>. The remaining work is planned for 18 weeks. Give the new end week under each of the three actions, and the risk of each.</p>",
    "a": "<table><tr><th>Action</th><th>Working</th><th>New end</th><th>Risk</th></tr><tr><td>Do not change the schedule</td><td>assume you make up the 2 weeks</td><td>week <b>24</b></td><td>High</td></tr><tr><td>Add the time you are behind</td><td>24 + 2</td><td>week <b>26</b></td><td>Moderate</td></tr><tr><td>Add the same percentage</td><td>% = 2 ÷ 6 (planned) = 33.3%; 18 × 1.333 = 24; 8 + 24</td><td>week <b>32</b></td><td>Low</td></tr></table><p>If the sponsor cannot accept week 32, <b>reduce the scope</b>. Trap: the % uses the <b>planned</b> 6 weeks, not the actual 8.</p>"
   },
   {
    "type": "mcq",
    "q": "<p>Which is <b>NOT</b> one of the three underlying problems of traditional work breakdown structures?</p><p>A) They focus on the design of the system and force premature decomposition<br>B) They have too many or too few levels of detail<br>C) They are project-specific and hard to compare across projects<br>D) They cannot show task dependencies</p>",
    "a": "<p><b>D</b>, because a WBS must show dependencies (with duration and status). The 3 problems are design focus, wrong level of detail, and being hard to compare across projects.</p>"
   },
   {
    "type": "scenario",
    "q": "<p>In a 20-week project, the design phase finishes <b>2 weeks early</b>. The team leader wants to tell the sponsor \"we will now finish in week 18\". What should the project manager do instead, and why?</p>",
    "a": "<p>Move the <b>next deadlines 2 weeks sooner</b>, but <b>do not change the promised completion date</b> (keep week 20). Estimates early in a project are still uncertain (hurricane model), so the saved time is a buffer for later problems. Also record the <b>actual</b> time so future estimates are better.</p>"
   },
   {
    "type": "short",
    "q": "<p>The sponsor of a café ordering app says: \"Deliver 4 weeks earlier, same budget.\" Using the idea of project trade-offs, explain what the project manager can offer.</p>",
    "a": "<p>Project management is making <b>trade-offs</b> among <b>functionality, time and cost</b>. If time goes down and cost stays the same, <b>functionality must go down</b>: deliver the core (menu, order, pay) on the earlier date and postpone extras (loyalty card) to a later version. The other option is to keep all functionality and raise the cost, but adding people to a project does not always increase productivity.</p>"
   }
  ]
 },
 {
  "lesson": "W4-5",
  "questions": [
   {
    "type": "scenario",
    "q": "<p>A hospital appointment system is half built. Three new requests arrive: (1) the head doctor saw the prototype and now wants online video visits; (2) a developer wants to add a voice assistant because he finds it interesting; (3) the director wants the system to support a new partnership strategy announced at a board meeting. Name the problem, its source in each case, and what the project manager should do.</p>",
    "a": "<p>This is <b>scope creep</b>: new requirements added after the scope was defined and frozen, the most common reason for schedule and cost overruns.</p><ul><li>(1) <b>Users</b> see the system's potential and want new functions.</li><li>(2) <b>Developers</b> get attached to an interesting capability.</li><li>(3) A <b>senior manager</b> adds a new strategy.</li></ul><p><b>Actions:</b> carefully examine the impact of each change; allow only changes that are absolutely necessary; delay the rest as <b>future enhancements</b> (e.g. video visits in version 2); or use timeboxing.</p>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: <b>timeboxing</b> for a university festival app that must be ready on 1 March. Wanted features: registration, event schedule, campus map, chat.</p>",
    "a": "<p>Draw the 6 steps as a flow with a loop: <b>1</b> set the delivery date (1 March) → <b>2</b> prioritize functionality → <b>3</b> build the core (registration and schedule) → <b>4</b> postpone what cannot be done in time (map, chat) → <b>5</b> deliver with core functionality → <b>6</b> repeat steps 3–5 to add refinements. Note: timeboxing is time-oriented; it places meeting the deadline above delivering all functionality.</p>",
    "diagram": "flowchart TD\n  S1[\"1. Set delivery date: 1 March\"] --> S2[\"2. Prioritize: register, schedule, map, chat\"]\n  S2 --> S3[\"3. Build core: register and schedule\"]\n  S3 --> S4[\"4. Postpone map and chat\"]\n  S4 --> S5[\"5. Deliver core on 1 March\"]\n  S5 -.->|\"6. Repeat 3 to 5: add map, then chat\"| S3"
   },
   {
    "type": "scenario",
    "q": "<p>In the café app team, only one developer knows the payment system, and she may leave the company next month. Fill in a risk assessment for this risk.</p>",
    "a": "<table><tr><th>Field</th><th>Answer</th></tr><tr><td>Risk 1</td><td>Only one developer knows the payment integration; if she leaves, payment work stops (weak personnel)</td></tr><tr><td>Likelihood</td><td>Medium probability</td></tr><tr><td>Potential impact</td><td>Payment tasks delayed by several weeks; launch date missed</td></tr><tr><td>Ways to address it</td><td>Pair a second developer with her now; ask her to document the payment code; keep an outside payment expert ready</td></tr></table>"
   },
   {
    "type": "mcq",
    "q": "<p>A tester reports in JIRA: \"The <i>Pay</i> button does nothing on iPhone.\" Which issue type should this be?</p><p>A) Epic<br>B) Story<br>C) Sub-Task<br>D) Bug</p>",
    "a": "<p><b>D</b>, because a Bug is \"a problem that impairs or prevents the functions of the product\". An Epic is a big user story to break down; a Story is a user story; a Sub-Task is a smaller piece of an issue.</p>"
   },
   {
    "type": "classify",
    "q": "<p>Classify each case by its <b>cause of risk</b> (weak personnel, scope creep, poor design, overly optimistic estimates): (a) the schedule assumed no one would ever be sick; (b) the client keeps adding new reports every week; (c) the team has never built a mobile app; (d) the database was designed without thinking about growth, and the system becomes very slow.</p>",
    "a": "<ul><li>(a) <b>Overly optimistic estimates</b></li><li>(b) <b>Scope creep</b></li><li>(c) <b>Weak personnel</b></li><li>(d) <b>Poor design</b></li></ul>"
   },
   {
    "type": "mcq",
    "q": "<p>Which statement about timeboxing is correct?</p><p>A) It is task-oriented: more tasks make the project longer<br>B) It places meeting a deadline above delivering functionality<br>C) It delivers all functionality before the deadline is set<br>D) It is used only to estimate costs</p>",
    "a": "<p><b>B</b>, because timeboxing is a time-oriented approach to scope management: set the date first, build the core, and postpone what does not fit.</p>"
   }
  ]
 },
 {
  "lesson": "W5a-1",
  "questions": [
   {
    "type": "calculation",
    "q": "<p>A hospital appointment system needs <b>90 person-months</b> of effort. The optimal schedule is <b>10 months</b>.</p><ol><li>What is the average number of staff?</li><li>If all of them work as one team, how many communication lines are there?</li><li>The PM splits them into 3 sub-teams of 3. Inside each sub-team everyone talks to everyone, and only the 3 sub-team contacts talk to each other. How many lines now?</li><li>Which staffing rule does part (c) follow?</li></ol>",
    "a": "<p><b>(a)</b> Average staff = person-months ÷ optimal schedule = 90 ÷ 10 = <b>9 people</b> on average.</p><p><b>(b)</b> Lines = n(n − 1) ÷ 2 = 9 × 8 ÷ 2 = <b>36 lines</b>.</p><p><b>(c)</b> Inside each sub-team: 3 × 2 ÷ 2 = 3 lines, so 3 sub-teams × 3 = 9 lines. Between the 3 contacts: 3 lines. Total = 9 + 3 = <b>12 lines</b> (one third of 36).</p><p><b>(d)</b> Keep each team to <b>fewer than 8–10 people</b>; if more are needed, create <b>sub-teams</b> that report to a contact at a higher level. Fewer lines = easier coordination.</p>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: the reporting structure for a 14-person project team (1 project manager, 5 analysts, 6 programmers, and the two leads). Label each role.</p>",
    "a": "<p>Key points to show:</p><ul><li><b>Project manager</b> on top: one per project, oversees overall progress.</li><li><b>Functional lead</b> under the PM, managing the <b>5 analysts</b>.</li><li><b>Technical lead</b> under the PM, managing the <b>6 programmers</b>.</li><li>Each sub-team is under 8–10 people, so coordination stays manageable.</li><li>Assign tasks by both <b>technical</b> and <b>interpersonal</b> skills.</li></ul>",
    "diagram": "flowchart TD\n  PM[\"Project manager\"] --> FL[\"Functional lead\"]\n  PM --> TL[\"Technical lead\"]\n  FL --> A1[\"Analyst 1\"]\n  FL --> A2[\"Analyst 2\"]\n  FL --> A3[\"Analyst 3\"]\n  FL --> A4[\"Analyst 4\"]\n  FL --> A5[\"Analyst 5\"]\n  TL --> P1[\"Programmer 1\"]\n  TL --> P2[\"Programmer 2\"]\n  TL --> P3[\"Programmer 3\"]\n  TL --> P4[\"Programmer 4\"]\n  TL --> P5[\"Programmer 5\"]\n  TL --> P6[\"Programmer 6\"]"
   },
   {
    "type": "mcq",
    "q": "<p>All of these are characteristics of a jelled team EXCEPT:</p><p>A) very low turnover<br>B) a strong sense of identity<br>C) one star programmer owns the system and the others support him<br>D) the team enjoys its work</p>",
    "a": "<p><b>C</b>, because in a jelled team <b>the team, not any one individual, owns the system</b>. A, B and D are three of the five traits (the other two: sense of eliteness, ownership by the team).</p>"
   },
   {
    "type": "short",
    "q": "<p>(a) Define the Ringelmann effect and name the gap between potential and actual group output. (b) Name any five of the \"ten steps to more productive development teams\" and explain \"no more heroes\".</p>",
    "a": "<p><b>(a)</b> The Ringelmann effect is the tendency for individual members of a group to become <b>less productive as the group gets bigger</b> (tug of war: each person feels their effort is not critical). The gap between potential and actual output is <b>process loss</b>.</p><p><b>(b)</b> Any five of: give them their own space; try agile methods; maximise communication, minimise bureaucracy; no more heroes; let them grow; play time and rest time; trust the team; work iteratively and incrementally; test first design; get a team coach.</p><p><b>No more heroes</b>: no \"lone ranger\" who writes secret code that nobody else understands. Knowledge must be shared by the whole team.</p>"
   },
   {
    "type": "scenario",
    "q": "<p>A bank's loan system project has 7 developers and is 3 weeks behind. The manager says: \"Let's hire 6 more programmers and put them in the same team, then we will catch up.\" As the analyst, do you agree? Give two reasons and a better suggestion.</p>",
    "a": "<p><b>No.</b></p><ul><li>\"<b>Adding staff resources does not translate into increased productivity</b>\": a bigger team is harder to coordinate. New people also need time to learn the project.</li><li><b>Ringelmann effect</b>: each member becomes less productive as the group grows. 13 people = 13 × 12 ÷ 2 = 78 communication lines instead of 21.</li><li>13 is above the <b>8–10 person</b> limit for one team.</li></ul><p><b>Better:</b> keep the team small. If the delay is real, adjust the schedule by the percentage behind or reduce scope (timeboxing). If more people are truly needed, add them as a separate <b>sub-team</b> with its own contact.</p>"
   }
  ]
 },
 {
  "lesson": "W5a-2",
  "questions": [
   {
    "type": "classify",
    "q": "<p>Classify each motivator as <b>extrinsic</b> or <b>intrinsic</b>:</p><ol><li>A $300 bonus if the module is finished on time</li><li>Wanting to solve a hard performance problem nobody else could</li><li>Fear of losing the job</li><li>Pride in writing clean, high-quality code</li><li>Two extra days off after the release</li><li>Enjoying working with teammates you trust</li></ol>",
    "a": "<table><tr><th>#</th><th>Type</th><th>Why</th></tr><tr><td>1</td><td>Extrinsic</td><td>bonus = external reward</td></tr><tr><td>2</td><td>Intrinsic</td><td>desire to beat a challenge</td></tr><tr><td>3</td><td>Extrinsic</td><td>threat of job loss = external</td></tr><tr><td>4</td><td>Intrinsic</td><td>wish to do high-quality work</td></tr><tr><td>5</td><td>Extrinsic</td><td>time off = external</td></tr><tr><td>6</td><td>Intrinsic</td><td>working with people you like and trust</td></tr></table><p>Extrinsic = from outside the person; intrinsic = from inside.</p>"
   },
   {
    "type": "classify",
    "q": "<p>Which type of standard is each rule?</p><ol><li>Every function must start with a comment stating its inputs and outputs.</li><li>All screens put field labels on the left and the Save button bottom right.</li><li>Every bug must be logged in JIRA within one day, and changes need the PM's approval.</li><li>Every document has the version number and date in the footer.</li><li>Each program specification must list the program name, business rules and pseudocode.</li></ol>",
    "a": "<ol><li><b>Coding</b> standard: how code is written.</li><li><b>User interface design</b> standard: how screens look.</li><li><b>Procedural</b> standard: when/how people report and approve.</li><li><b>Documentation</b> standard: how documents look.</li><li><b>Specification requirement</b> standard: what a program spec contains.</li></ol>"
   },
   {
    "type": "mcq",
    "q": "<p>A tool that can automatically <b>generate code</b> for database tables from the design is called:</p><p>A) upper CASE<br>B) lower CASE<br>C) a CASE repository<br>D) a project charter</p>",
    "a": "<p><b>B</b>, because lower CASE supports the <b>design</b> workflow and generates code. Upper CASE draws diagrams for analysis; the repository only stores diagrams and designs.</p>"
   },
   {
    "type": "mcq",
    "q": "<p>Which of these is <b>NOT</b> one of the motivation principles recommended for 21st-century firms?</p><p>A) the 20 percent rule<br>B) small \"Now That\" awards given by peers<br>C) a pay raise for everyone on the project<br>D) a high-end development environment</p>",
    "a": "<p><b>C</b>, because \"give everyone on the project a raise\" is a motivational <b>don't</b>: good people believe mediocrity is rewarded. Money is also \"the last thing that should be done\".</p>"
   },
   {
    "type": "scenario",
    "q": "<p>A new 8-person team for a university e-learning portal keeps arguing: people come at different times, nobody knows who updates the workplan, and some members don't see why the project matters. What should the PM do? Name the key document and three conflict-avoidance strategies.</p>",
    "a": "<p>First define clear <b>roles</b>, hold people <b>accountable</b>, and write a <b>project charter</b> with the team's norms and ground rules (when to be at work, when staff meetings are, how the team communicates, how the workplan is updated). This builds <b>group cohesiveness</b>, which adds more to productivity than individual skills.</p><p>Strategies (any three):</p><ul><li>Make sure the team understands <b>why the project is important</b> to the organization.</li><li>Clearly define plans for the project.</li><li>Develop detailed operating procedures and tell the team.</li><li>Develop schedule commitments ahead of time.</li><li>Forecast other priorities and their possible impact.</li></ul>"
   },
   {
    "type": "short",
    "q": "<p>(a) Which workflow chooses the tools and standards, and which chooses the documentation? (b) List four benefits of CASE tools.</p>",
    "a": "<p><b>(a)</b> <b>Environment</b> workflow → tools + standards. <b>Infrastructure management</b> workflow → level and type of documentation.</p><p><b>(b)</b> Any four: tasks are done and changed much faster; development information is centralized; information is shown as easy-to-understand diagrams; potentially lower maintenance costs; potentially better quality; enforced discipline; measuring the size of a change; round-trip engineering.</p>"
   }
  ]
 },
 {
  "lesson": "W5b-1",
  "questions": [
   {
    "type": "classify",
    "q": "<p>Classify each requirement for a café ordering app as <b>functional</b> (process / information) or <b>nonfunctional</b> (operational / performance / security / cultural and political). The system must:</p><ol><li>let customers add items to a cart and pay</li><li>keep each customer's order history for two years</li><li>run on Android and iOS phones</li><li>confirm an order in under 3 seconds</li><li>let only the manager change menu prices</li><li>show prices in Uzbek so'm and the menu in Uzbek and Russian</li><li>calculate a 10% loyalty discount on every fifth order</li><li>be available every day from 7:00 to 23:00</li></ol>",
    "a": "<table><tr><th>#</th><th>Class</th><th>Why</th></tr><tr><td>1</td><td>F, process</td><td>an action the system performs</td></tr><tr><td>2</td><td>F, information</td><td>data it must keep (retain)</td></tr><tr><td>3</td><td>NF, operational</td><td>technical environment</td></tr><tr><td>4</td><td>NF, performance</td><td>speed</td></tr><tr><td>5</td><td>NF, security</td><td>who may access what</td></tr><tr><td>6</td><td>NF, cultural and political</td><td>local currency and languages</td></tr><tr><td>7</td><td>F, process</td><td>a calculation the system does</td></tr><tr><td>8</td><td>NF, performance</td><td>availability = reliability (not operational)</td></tr></table><p>Functional: 1, 2, 7. Nonfunctional: 3, 4, 5, 6, 8.</p>"
   },
   {
    "type": "classify",
    "q": "<p>For a university library system, classify each item as a <b>business</b> requirement or a <b>system</b> requirement.</p><ol><li>Students must be able to reserve a book online.</li><li>The reservation data is stored in a MySQL table with an index on book ID.</li><li>The library wants to reduce lost books by 30%.</li><li>The search page calls the catalogue REST API in JSON format.</li><li>Librarians must see which books are overdue.</li></ol>",
    "a": "<p>Business (user) requirement = <b>WHAT</b> the system does, from the business person's view, analysis phase. System requirement = <b>HOW</b> it is implemented, from the developer's view, design phase.</p><ol><li><b>Business</b>: what users need.</li><li><b>System</b>: how data is stored.</li><li><b>Business</b>: a business goal (the \"why\").</li><li><b>System</b>: how the search is built.</li><li><b>Business</b>: what librarians need.</li></ol>"
   },
   {
    "type": "mcq",
    "q": "<p>Which of these is a <b>nonfunctional performance</b> requirement?</p><p>A) The system must print a monthly sales report.<br>B) The system must refresh stock levels every 10 minutes.<br>C) The system must work in any Web browser.<br>D) Only HR staff may view salaries.</p>",
    "a": "<p><b>B</b>, because update frequency is about speed/capacity. A = functional (process), C = operational, D = security.</p>"
   },
   {
    "type": "classify",
    "q": "<p>Project requirement or product requirement?</p><ol><li>Training the call-centre staff to use the new system</li><li>The app must let users track their parcel on a map</li><li>Migrating the old customer data to the new database</li><li>A warranty service agreement (SLA) with the client</li><li>The app must load the main screen in under 2 seconds</li></ol>",
    "a": "<p>Project requirements = what the <b>project</b> needs to succeed (set by project stakeholders: scope, timeline, budget, resources). Product requirements = what the <b>final product</b> must have (set by the product owner: functionality, performance, usability).</p><ol><li><b>Project</b> (staff training)</li><li><b>Product</b> (functionality)</li><li><b>Project</b> (installing / migrating)</li><li><b>Project</b> (SLA with customers)</li><li><b>Product</b> (performance)</li></ol>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: the hierarchy of requirements from business requirements down to the two kinds of solution requirements and their subtypes.</p>",
    "a": "<p>Key labels:</p><ul><li><b>Business requirements</b> (why, goals) → <b>stakeholder requirements</b> (needs) → <b>solution requirements</b> (capabilities and qualities).</li><li>Solution → <b>functional</b> (capabilities: process-oriented, information-oriented) and <b>nonfunctional</b> (qualities: operational, performance, security, cultural and political).</li></ul>",
    "diagram": "flowchart TD\n  B[\"Business requirements: why, goals\"] --> S[\"Stakeholder requirements: needs\"]\n  S --> SO[\"Solution requirements\"]\n  SO --> F[\"Functional: capabilities\"]\n  SO --> N[\"Nonfunctional: qualities\"]\n  F --> F1[\"Process-oriented\"]\n  F --> F2[\"Information-oriented\"]\n  N --> N1[\"Operational\"]\n  N --> N2[\"Performance\"]\n  N --> N3[\"Security\"]\n  N --> N4[\"Cultural and political\"]"
   },
   {
    "type": "short",
    "q": "<p>(a) What is a requirements definition, and how are its two parts organized? (b) List the four real-world problems with requirements determination.</p>",
    "a": "<p><b>(a)</b> A straightforward text report that lists the functional and nonfunctional requirements <b>in an outline format</b>. Nonfunctional requirements are grouped under the 4 types (operational, performance, security, cultural and political; an empty type is still listed, e.g. \"none anticipated\"). Functional requirements are grouped by <b>process</b> (e.g. manage appointments, produce schedule).</p><p><b>(b)</b> (1) the analyst may not have access to the right users; (2) the specification may be inadequate, especially with agile's light techniques; (3) some requirements cannot be known at the start; (4) verifying and validating requirements is hard.</p>"
   }
  ]
 },
 {
  "lesson": "W5b-2",
  "questions": [
   {
    "type": "calculation",
    "q": "<p>An insurance company takes on average <b>15 working days</b> (8-hour days) to pay a car-damage claim. The analysts time each step: claim entry 0.75 h · document check 1.5 h · damage assessment 2 h · manager approval 0.25 h · payment 0.5 h.</p><ol><li>Apply duration analysis: step total, elapsed working hours, ratio, share of real work, waiting time.</li><li>Repeat the share using 24-hour clock days.</li><li>What does the result show, and which strategy uses this technique?</li></ol>",
    "a": "<p><b>(a)</b></p><ul><li>Step total = 0.75 + 1.5 + 2 + 0.25 + 0.5 = <b>5 h</b></li><li>Elapsed = 15 × 8 = <b>120 working hours</b></li><li>Ratio = 120 : 5 = <b>24 : 1</b></li><li>Real work = 5 ÷ 120 = <b>4.2%</b></li><li>Waiting = 120 − 5 = <b>115 h = 95.8%</b></li></ul><p><b>(b)</b> 15 × 24 = 360 h; 5 ÷ 360 = <b>1.4%</b> (ratio 72 : 1).</p><p><b>(c)</b> A strong indication that the overall process is <b>badly broken</b>: it takes 15 days to do less than one day's work; the claim mostly waits between steps. Duration analysis belongs to <b>BPI</b> (with activity-based costing and informal benchmarking).</p>"
   },
   {
    "type": "calculation",
    "q": "<p>Activity-based costing for one online-shop order. Find the direct cost of each step, the total, and which steps to improve first.</p><table><tr><th>Step</th><th>Time</th><th>Staff cost per hour</th><th>Materials</th></tr><tr><td>Order entry</td><td>0.5 h</td><td>$12</td><td>–</td></tr><tr><td>Credit check</td><td>1 h</td><td>$20</td><td>–</td></tr><tr><td>Picking and packing</td><td>1.5 h</td><td>$10</td><td>$3 packaging</td></tr><tr><td>Quality check</td><td>0.25 h</td><td>$16</td><td>–</td></tr><tr><td>Delivery</td><td>2 h</td><td>$14</td><td>–</td></tr></table>",
    "a": "<p>Direct cost = labour (time × hourly cost) + materials.</p><table><tr><th>Step</th><th>Working</th><th>Cost</th><th>Share</th></tr><tr><td>Order entry</td><td>0.5 × 12</td><td>$6</td><td>7.9%</td></tr><tr><td>Credit check</td><td>1 × 20</td><td>$20</td><td>26.3%</td></tr><tr><td>Picking and packing</td><td>1.5 × 10 + 3</td><td>$18</td><td>23.7%</td></tr><tr><td>Quality check</td><td>0.25 × 16</td><td>$4</td><td>5.3%</td></tr><tr><td>Delivery</td><td>2 × 14</td><td>$28</td><td>36.8%</td></tr><tr><td><b>Total</b></td><td></td><td><b>$76</b></td><td>100%</td></tr></table><p>The most costly steps are <b>delivery ($28)</b> and <b>credit check ($20)</b>: together 63% of the cost. Improve these first. (Indirect costs such as rent could be added.) This is a <b>BPI</b> technique.</p>"
   },
   {
    "type": "scenario",
    "q": "<p>Which strategy (BPA, BPI or BPR) fits each case? Give one reason each.</p><ol><li>A school library keeps its lending rules but replaces paper cards with barcode scanners.</li><li>A pharmacy chain sees that a competitor lets customers reorder medicine online, and wants to copy this and cut a few slow steps.</li><li>A bank wants to close its loan offices and give instant loans fully inside a mobile app, with no loan officers. Management accepts high cost and very high risk.</li><li>A small café has a low budget and wants a low-risk project, but each waiter keeps losing paper orders. Users say the main problem is unreadable handwriting.</li></ol>",
    "a": "<ol><li><b>BPA</b>: same process, computers just do some of the work; small change, least impact.</li><li><b>BPI</b>: moderate change, copying what competitors do (informal benchmarking), improving efficiency.</li><li><b>BPR</b>: changes the fundamental way of doing business (\"obliterating\" the current way); high value, high cost, very high risk, very broad.</li><li><b>BPA</b>: low cost, low–moderate risk; problem analysis (users name the problem and solution), e.g. orders on a tablet.</li></ol><p>No one strategy is inherently better; most projects use a combination.</p>"
   },
   {
    "type": "classify",
    "q": "<p>Name the technique and its strategy (BPA, BPI or BPR):</p><ol><li>The team visits three competitor websites as customers to see how they handle returns.</li><li>Users and managers list the problems in the current system and suggest how to fix each one.</li><li>For every step, the team asks: \"What happens if we remove this step completely?\"</li><li>The team keeps asking \"why?\" about late deliveries until it finds the real cause.</li><li>The team lists QR codes, AI chatbots and mobile payments, and asks how each could change the process.</li><li>The team asks: \"What does the customer really get value from in this process?\"</li></ol>",
    "a": "<ol><li><b>Informal benchmarking</b> → BPI</li><li><b>Problem analysis</b> → BPA</li><li><b>Activity elimination</b> → BPR (a force-fit exercise: every activity)</li><li><b>Root cause analysis</b> → BPA (fix the cause, not the symptom)</li><li><b>Technology analysis</b> → BPR</li><li><b>Outcome analysis</b> → BPR</li></ol>"
   },
   {
    "type": "mcq",
    "q": "<p>A strategy has <b>moderate</b> potential business value, <b>low–moderate</b> project cost, <b>narrow–moderate</b> breadth of analysis and <b>low–moderate</b> risk. Which is it?</p><p>A) BPA<br>B) BPI<br>C) BPR<br>D) none: BPA and BPI have different risk</p>",
    "a": "<p><b>B</b>, because BPI is the middle option on value, cost and breadth. BPA has low–moderate value, low cost and narrow breadth. D is wrong: BPA and BPI have the <b>same</b> risk (low–moderate).</p>"
   },
   {
    "type": "short",
    "q": "<p>(a) Rank BPA, BPI and BPR by the time spent on the as-is system, and explain why BPR spends the least. (b) Define efficiency and effectiveness.</p>",
    "a": "<p><b>(a)</b> BPA (a lot) &gt; BPI (much less) &gt; BPR (little). BPR wants <b>new ideas</b>, so studying the old way in detail would only hold the team back.</p><p><b>(b)</b> Efficiency = <b>doing things right</b>. Effectiveness = <b>doing the right things</b>. BPI can improve both.</p>"
   }
  ]
 },
 {
  "lesson": "W5b-3",
  "questions": [
   {
    "type": "classify",
    "q": "<p>Classify each interview question as <b>closed-ended</b>, <b>open-ended</b> or <b>probing</b>:</p><ol><li>How many prescriptions do you fill on a busy day?</li><li>What do you like and dislike about the current stock system?</li><li>You said orders \"get lost\". Can you give me an example?</li><li>Which software do you use to print labels?</li><li>Why does that happen?</li><li>How would you improve the way customers pick up their medicine?</li></ol>",
    "a": "<ol><li><b>Closed</b>: a specific number.</li><li><b>Open</b>: room to explain, rich information.</li><li><b>Probing</b>: follows up on the last answer.</li><li><b>Closed</b>: one specific answer.</li><li><b>Probing</b>: \"Why?\" follows up.</li><li><b>Open</b>: interviewee has control.</li></ol><p>No type is better than another; mix them. Trap: the slides list \"How do customers place orders?\" as <b>closed</b>.</p>"
   },
   {
    "type": "scenario",
    "q": "<p>You are the analyst for a dormitory-booking system at a university. (a) In your first meeting with the dormitory director, the current process is still unclear. Which interview type do you use, and what kind of questions? (b) Two weeks later you must find out exactly how the clerk calculates the room fee with discounts. Which type now? (c) What is the difference between top-down and bottom-up ordering, and what do analysts do in practice?</p>",
    "a": "<p><b>(a)</b> <b>Unstructured</b>: seeks broad, roughly defined information; few closed questions, mostly open and probing questions asked on the fly. It is the most challenging type to conduct.</p><p><b>(b)</b> <b>Structured</b>: specific questions prepared beforehand, with <b>more closed-ended</b> questions, to get exact details.</p><p><b>(c)</b> Top-down = broad, general questions → specific ones. Bottom-up = specific → broad. In practice: broad → specific → back to broad.</p>",
    "diagram": "flowchart LR\n  subgraph TD1[\"Top-down\"]\n    A1[\"Broad\"] --> A2[\"Specific\"]\n  end\n  subgraph BU[\"Bottom-up\"]\n    B1[\"Specific\"] --> B2[\"Broad\"]\n  end\n  subgraph PR[\"In practice\"]\n    C1[\"Broad\"] --> C2[\"Specific\"] --> C3[\"Broad\"]\n  end"
   },
   {
    "type": "mcq",
    "q": "<p>After an interview, the interview report should be written within:</p><p>A) 24 hours<br>B) 48 hours<br>C) one week<br>D) one or two weeks</p>",
    "a": "<p><b>B</b>, because notes fade fast; the report is often sent to the interviewee to check. \"One or two weeks\" is the JAD post-session report (trap).</p>"
   },
   {
    "type": "mcq",
    "q": "<p>When conducting an interview, the analyst's <b>first goal</b> is to:</p><p>A) ask closed-ended questions to save time<br>B) build rapport with the interviewee<br>C) present the to-be system<br>D) record the interview report</p>",
    "a": "<p><b>B</b>, because rapport makes the person tell the whole truth, not just what they think you want to hear. Also look professional and unbiased, and explain why you are there.</p>"
   },
   {
    "type": "scenario",
    "q": "<p>Write an interview schedule for a new pharmacy-chain stock system. Include at least four interviewees and say why each is chosen.</p>",
    "a": "<table><tr><th>Name / position</th><th>Purpose</th><th>Meeting</th></tr><tr><td>Operations director</td><td>strategic vision for the new system</td><td>Mon 10:00–12:00</td></tr><tr><td>Stock manager</td><td>current problems and future goals</td><td>Tue 9:00–10:00</td></tr><tr><td>Branch pharmacist</td><td>how orders and stock checks are really done</td><td>Tue 14:00–15:00</td></tr><tr><td>Warehouse clerk</td><td>how deliveries are recorded</td><td>Wed 11:00–12:00</td></tr></table><p>Rule: include <b>both managers and staff</b>: managers give the high-level view, staff the low-level view of how the work is actually done. The schedule says <b>who, when and for what purpose</b>.</p>"
   },
   {
    "type": "short",
    "q": "<p>List what an analyst should do to <b>prepare</b> for an interview, and name the parts of an interview report.</p>",
    "a": "<p><b>Prepare:</b> a general interview plan with the questions in order; anticipate possible answers and plan follow-ups; plan segues between topics; check the interviewee's areas of knowledge (don't ask what they can't answer); set priorities in case time runs short.</p><p><b>Report parts:</b> approved by, person interviewed, interviewer, purpose, summary, open items, detailed notes.</p>"
   }
  ]
 },
 {
  "lesson": "W6-1",
  "questions": [
   {
    "type": "calculation",
    "q": "<p>The Samarkand City Library will survey its <b>staff</b> with a paper questionnaire and its <b>readers</b> with a Web questionnaire. You need at least <b>90 completed answers</b> from each group.</p><ol><li>How many paper questionnaires must you hand out to staff? Give the best case and the worst case.</li><li>How many readers must receive the Web questionnaire? Best case and worst case.</li><li>A colleague sends the Web questionnaire to only 600 readers. How many answers can he expect? Is that enough?</li></ol>",
    "a": "<p>Return rates: paper and e-mail <b>30–50%</b>, Web often only <b>5–30%</b>. People to send to = answers needed ÷ return rate.</p><ol><li>Paper: best case 90 ÷ 0.50 = <b>180</b>; worst case 90 ÷ 0.30 = <b>300</b>.</li><li>Web: best case 90 ÷ 0.30 = <b>300</b>; worst case 90 ÷ 0.05 = <b>1,800</b>.</li><li>600 × 0.05 = <b>30</b> up to 600 × 0.30 = <b>180</b> answers. Only the best case gives enough. In the worst case he gets 30, far below 90. He should send it to more readers (up to 1,800) and raise the return rate: explain why the reader was chosen, give a return date, offer an inducement, offer a summary of the results.</li></ol>"
   },
   {
    "type": "scenario",
    "q": "<p>A student drafted this questionnaire about the university canteen app. Find <b>five</b> problems, name the design guideline each one breaks, and fix it.</p><ul><li>Name and student ID: ______</li><li>What is your family's monthly income?</li><li>Rate the UI of the CMS.</li><li>Wouldn't you agree that the old paper menu was terrible?</li><li>40 more items on one page, jumping between prices, opening hours, app speed and prices again.</li><li>Last item: \"Would you pay through the app if we built online payment?\" (the question the project needs most)</li></ul><p>None of the questions has a number.</p>",
    "a": "<table><tr><th>Problem</th><th>Guideline broken</th><th>Fix</th></tr><tr><td>Name and student ID required</td><td>Provide anonymity</td><td>Remove them; answers are anonymous.</td></tr><tr><td>Starts with family income</td><td>Begin with nonthreatening and interesting questions</td><td>Start with \"How often do you eat in the canteen?\"; drop the income item.</td></tr><tr><td>\"UI\", \"CMS\"</td><td>Avoid abbreviations</td><td>\"How easy is the app's menu screen to use?\"</td></tr><tr><td>\"Wouldn't you agree … terrible\"</td><td>Avoid biased or suggestive items</td><td>\"How satisfied were you with the paper menu? 1 = very unhappy … 5 = very happy.\"</td></tr><tr><td>Topics jump around</td><td>Group items into logically coherent sections</td><td>Sections: About you / Ordering / Payment.</td></tr><tr><td>40 items on one page</td><td>Do not crowd a page</td><td>Spread over several pages; cut repeated items.</td></tr><tr><td>Key question is last</td><td>Do not put important items at the very end</td><td>Move it into the Payment section, early on.</td></tr><tr><td>No numbers</td><td>Number the questions</td><td>Q1, Q2, Q3 …</td></tr></table><p>Any five of these are enough. Before sending: <b>pretest</b> it on a few students, and decide <b>how the answers will be analyzed</b>.</p>"
   },
   {
    "type": "classify",
    "q": "<p>Classify each questionnaire item as a <b>factual</b> question or an <b>opinion</b> question. Then rewrite item (f) as a factual question.</p><ol type=\"a\"><li>How many times did you order from the café app last week: 0, 1–2, 3–5, more than 5?</li><li>Is the app easy to use?</li><li>How long did your last order take to arrive: under 5 minutes, 5–10 minutes, more than 10 minutes?</li><li>Do you agree that the delivery fee is too high?</li><li>Which payment method did you use last time: cash, card, mobile wallet?</li><li>Are app crashes common?</li></ol>",
    "a": "<p><b>Factual</b> (asks for a precise value): a, c, e.<br><b>Opinion</b> (agree or disagree): b, d, f.</p><p>(f) rewritten: \"How often does the app crash for you: once a day, once a week, once a month, never?\"</p><p>All six are closed-ended. Questionnaires use closed-ended questions most, because nobody is there to help a confused respondent.</p>"
   },
   {
    "type": "mcq",
    "q": "<p>Which of these is <b>NOT</b> a ground rule of a JAD session?</p><p>A) Follow the schedule<br>B) Respect others' opinions<br>C) The facilitator casts the deciding vote when the group disagrees<br>D) Only one person talks at a time</p>",
    "a": "<p><b>C</b>, because the facilitator does not take part in the discussion and gives no ideas or opinions, so he stays neutral. The fourth real ground rule is \"accept disagreement\".</p>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically the five steps of a JAD session. Add one key fact to each step and show who takes part.</p>",
    "a": "<p>Key labels to include:</p><ol><li><b>Select participants</b>: by the information they can contribute; mix of organizational levels and political support; everyone must be away from the office at the same time.</li><li><b>Design the session</b>: half a day to several weeks, usually 5–10 days over 3 weeks; can build models or the requirements definition in the session.</li><li><b>Prepare</b>: often off-site; bring procedure manuals and documents, or think about improvements.</li><li><b>Conduct</b>: formal agenda and ground rules.</li><li><b>Post-JAD follow-up</b>: post-session report a week or two later (interview report: within 48 hours).</li></ol><p>People: 10–20 users plus management and the project team, one neutral facilitator, 1–2 scribes (notes, often with CASE tools).</p>",
    "diagram": "flowchart TD\n  S1[\"1. Select participants: info they can give, mix of levels, political support\"]\n  S2[\"2. Design session: usually 5-10 days over 3 weeks\"]\n  S3[\"3. Prepare: often off-site, bring manuals and documents\"]\n  S4[\"4. Conduct: formal agenda and ground rules\"]\n  S5[\"5. Post-JAD follow-up: report in 1-2 weeks\"]\n  S1 --> S2 --> S3 --> S4 --> S5\n  F([\"Facilitator: neutral, guides\"]) -.-> S4\n  W([\"1-2 scribes: notes, CASE tools\"]) -.-> S4\n  U([\"10-20 users, management, project team\"]) -.-> S4"
   },
   {
    "type": "scenario",
    "q": "<p>A Tashkent bank wants a new loan-approval system. 15 loan officers, 3 branch managers and the IT team must <b>agree on the new features</b>. In a trial meeting, the junior officers stayed silent whenever the regional director spoke. A normal JAD would take <b>8 days</b> over 3 weeks, and the branches cannot run without their staff that long.</p><ol type=\"a\"><li>Which technique do you recommend, and why?</li><li>If it saves 50–80% of the time, how many days would it take?</li><li>Why not simply send a questionnaire?</li></ol>",
    "a": "<ol type=\"a\"><li><b>e-JAD.</b> Groupware lets every participant send ideas <b>anonymously</b> and <b>at the same time</b>, so junior officers have no fear of reprisal from the director. It keeps JAD's strengths: to-be information, High integration and High user involvement.</li><li>8 × 0.5 = <b>4 days</b>; 8 × 0.2 = <b>1.6 days</b>. So about 2–4 days, in line with the typical 1–4 days in one week. Staff are away from the branches for a shorter time.</li><li>A questionnaire gives only as-is and improvements, with Medium depth and Low integration and user involvement. It cannot make the group agree on to-be features. It is meant for a large number of people or outside users, not about 20 insiders.</li></ol>"
   }
  ]
 },
 {
  "lesson": "W6-2",
  "questions": [
   {
    "type": "scenario",
    "q": "<p>A city polyclinic is replacing phone appointments with an online booking system. Choose the best requirements-gathering technique for each situation, and give the reason from the techniques table.</p><ol><li>You want the opinions of 20,000 patients about phoning for appointments, and their ideas for improvements, at low cost.</li><li>The head doctor, nurses, receptionists and IT must agree on the new system's features and draft the requirements together.</li><li>The receptionists' paper appointment books and three years of referral forms are kept in a cupboard.</li><li>The head receptionist says no patient waits more than 10 minutes at the desk, but patients complain.</li><li>Only one IT engineer knows the rules linking the old system to the national insurance database.</li></ol>",
    "a": "<ol><li><b>Questionnaire</b>: large number of people (patients are outside users); breadth High, cost Low; gives as-is and improvements. Use a sample and expect low returns.</li><li><b>JAD</b>: to-be information; the only technique with High integration and High user involvement; cost Low–Medium; requirements can be built in the session.</li><li><b>Document analysis</b>: as-is, breadth High, cost Low. Look for information staff added by hand.</li><li><b>Observation</b>: shows what really happens and checks the validity of what people said.</li><li><b>Interview</b>: depth High, can give to-be information; only one person, so breadth (Low) does not matter and the Medium cost is acceptable.</li></ol>"
   },
   {
    "type": "mcq",
    "q": "<p>An analyst needs information from many people at low cost, and also wants their ideas for improvements, but does not need ideas for the to-be system. According to the techniques table, which technique fits best?</p><p>A) Observation<br>B) Document analysis<br>C) Questionnaires<br>D) JAD</p>",
    "a": "<p><b>C</b>, because questionnaires have High breadth, Low cost and give as-is <b>and improvements</b>. Document analysis gives as-is only, observation has Low breadth, and JAD has only Medium breadth.</p>"
   },
   {
    "type": "short",
    "q": "<p>Fill in the ten blanks of the techniques comparison table.</p><table><tr><th></th><th>Interviews</th><th>JAD</th><th>Questionnaires</th><th>Document analysis</th><th>Observation</th></tr><tr><td>Type of information</td><td>As-is, improvements, to-be</td><td>As-is, improvements, to-be</td><td><b>(1)</b></td><td><b>(2)</b></td><td>As-is</td></tr><tr><td>Depth</td><td>High</td><td>High</td><td><b>(3)</b></td><td><b>(4)</b></td><td>Low</td></tr><tr><td>Breadth</td><td>Low</td><td><b>(5)</b></td><td>High</td><td>High</td><td><b>(6)</b></td></tr><tr><td>Integration</td><td>Low</td><td><b>(7)</b></td><td>Low</td><td>Low</td><td>Low</td></tr><tr><td>User involvement</td><td><b>(8)</b></td><td>High</td><td>Low</td><td>Low</td><td>Low</td></tr><tr><td>Cost</td><td><b>(9)</b></td><td><b>(10)</b></td><td>Low</td><td>Low</td><td>Low to Medium</td></tr></table>",
    "a": "<p>(1) As-is, improvements (2) As-is (3) Medium (4) Low (5) Medium (6) Low (7) High (8) Medium (9) Medium (10) Low–Medium</p><p>Full table:</p><table><tr><th></th><th>Interviews</th><th>JAD</th><th>Questionnaires</th><th>Document analysis</th><th>Observation</th></tr><tr><td>Type of information</td><td>As-is, improvements, to-be</td><td>As-is, improvements, to-be</td><td>As-is, improvements</td><td>As-is</td><td>As-is</td></tr><tr><td>Depth</td><td>High</td><td>High</td><td>Medium</td><td>Low</td><td>Low</td></tr><tr><td>Breadth</td><td>Low</td><td>Medium</td><td>High</td><td>High</td><td>Low</td></tr><tr><td>Integration</td><td>Low</td><td>High</td><td>Low</td><td>Low</td><td>Low</td></tr><tr><td>User involvement</td><td>Medium</td><td>High</td><td>Low</td><td>Low</td><td>Low</td></tr><tr><td>Cost</td><td>Medium</td><td>Low–Medium</td><td>Low</td><td>Low</td><td>Low to Medium</td></tr></table><p>Hooks: to-be only from talking (interviews, JAD); \"I-J deep, Q-D wide\"; JAD is the only High for integration and user involvement; interviews are the most expensive (Medium).</p>"
   },
   {
    "type": "scenario",
    "q": "<p>An analyst at a pharmacy chain reviews 200 completed customer intake forms and the reports staff use. She notices:</p><ol><li>Pharmacists write the customer's allergies in the margin.</li><li>The \"Date\" field is filled in three different formats.</li><li>Cashiers keep their own notebook of customers waiting for out-of-stock medicines.</li><li>Every Monday the manager opens three different reports to see stock of popular medicines.</li></ol><p>What does each finding tell her? Which findings are the strongest sign that the system must change? Why should she look at blank forms as well as completed ones?</p>",
    "a": "<ol><li>A field is missing: add an \"Allergies\" field.</li><li>The field is unclear: show the format (DD.MM.YYYY) or use a date picker.</li><li>Users made their own form: the system needs a waiting-list (back-order) function.</li><li>One need takes several reports: new information or a new format is needed, e.g. one stock report.</li></ol><p>Strongest sign: <b>1 and 3</b>. When users <b>create their own forms</b> or <b>add extra information</b> to existing ones, that is the most powerful indication the system needs to change.</p><p>The blank form shows how the form was designed; the completed forms show how people really use it. The changes show up in the gap between the two.</p>"
   },
   {
    "type": "short",
    "q": "<p>(a) Using the techniques table, compare interviews and observation on type of information, depth and cost.<br>(b) Give two reasons an analyst still observes after interviewing.<br>(c) Ethnography: what does it reveal, what is one weakness, and what is focused ethnography?</p>",
    "a": "<p>(a)</p><table><tr><th></th><th>Interviews</th><th>Observation</th></tr><tr><td>Type of information</td><td>As-is, improvements, to-be</td><td>As-is only</td></tr><tr><td>Depth</td><td>High</td><td>Low</td></tr><tr><td>Cost</td><td>Medium</td><td>Low to Medium</td></tr></table><p>(b) In interviews people <i>describe</i> their work, and many managers do not remember how they really work or spend their time. Observation shows the reality and checks the validity of information from indirect sources (interviews, questionnaires).</p><p>(c) Ethnography reveals how people <b>actually</b> work (not how they ought to), and how cooperation and awareness of others' work shape it. Weakness: it <b>cannot identify new features</b>, and it may study practices that are no longer relevant. <b>Focused ethnography</b> = ethnography + <b>prototyping</b> (from an air traffic control project): questions raised by the prototype focus what you observe.</p>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically a decision path an analyst can follow to choose among the five requirements-gathering techniques.</p>",
    "a": "<p>Key points: to-be information comes only from interviews or JAD; choose JAD when many people must agree (High integration and user involvement) and interviews for depth from a few key people; questionnaires for breadth at low cost; document analysis when forms, manuals and reports exist (as-is); observation to see reality and check what people said. In real projects analysts combine several techniques.</p>",
    "diagram": "flowchart TD\n  A{\"Need to-be info or new system ideas?\"}\n  B{\"Many people must agree together?\"}\n  C[\"JAD: integration and user involvement High\"]\n  D[\"Interviews: depth High, few key people\"]\n  E{\"Need opinions from many people or outsiders?\"}\n  F[\"Questionnaire: breadth High, cost Low\"]\n  G{\"Existing forms, manuals, reports?\"}\n  H[\"Document analysis: as-is, breadth High\"]\n  I[\"Observation: see reality, check what people said\"]\n  A -->|yes| B\n  B -->|yes| C\n  B -->|no| D\n  A -->|no| E\n  E -->|yes| F\n  E -->|no| G\n  G -->|yes| H\n  G -->|no| I"
   }
  ]
 },
 {
  "lesson": "W6-3",
  "questions": [
   {
    "type": "classify",
    "q": "<p>A reviewer reads the requirements for a new university library system. For each finding, name the check that fails (Validity, Consistency, Completeness, Realism, Verifiability). Finding (f) fails a <b>review</b> check instead: which one?</p><ol type=\"a\"><li>\"The search must respond quickly.\"</li><li>R3: \"Fines are charged in UZS.\" R11: \"Fines are charged in USD.\"</li><li>The library asked for e-book lending, but no requirement mentions it.</li><li>\"Face recognition at every shelf, built in 2 weeks for $1,000.\"</li><li>The library's main problem is lost books, but the requirements describe a social network for readers.</li><li>Nobody knows who asked for the \"dark mode\" requirement, or why.</li></ol>",
    "a": "<ol type=\"a\"><li><b>Verifiability</b>: \"quickly\" cannot be checked. Better: \"search results appear within 2 seconds\".</li><li><b>Consistency</b>: two requirements conflict.</li><li><b>Completeness</b>: a function the customer needs is missing.</li><li><b>Realism</b>: cannot be built with this budget and technology.</li><li><b>Validity</b>: the functions do not support the customer's real need.</li><li><b>Traceability</b> (review check): the origin of the requirement is not stated.</li></ol>"
   },
   {
    "type": "mcq",
    "q": "<p>The team ran a questionnaire with 400 students. In which section of the system proposal should the full questionnaire results go?</p><p>A) Requirements Definition<br>B) Appendices<br>C) Executive Summary<br>D) Feasibility Analysis</p>",
    "a": "<p><b>B</b>, because Appendices hold supporting material such as questionnaire or interview results. The Requirements Definition lists the functional and nonfunctional requirements drawn from them, not the raw results.</p>"
   },
   {
    "type": "short",
    "q": "<p>System proposal: give the section (number and name) where each item belongs.</p><ol><li>The revised cost–benefit analysis with NPV</li><li>A one-page overview so the busy rector can decide what to read in depth</li><li>The revised Gantt chart</li><li>\"The system must be available 24 hours a day, 7 days a week.\"</li><li>The use-case diagram and use case descriptions</li><li>CRC cards and the class diagram</li><li>The CRUDE matrix and sequence diagrams</li><li>The updated business need and sponsor</li><li>Notes from 12 interviews</li></ol>",
    "a": "<ol><li>5 Feasibility Analysis (revised)</li><li>2 Executive Summary</li><li>4 Workplan (revised)</li><li>6 Requirements Definition (a nonfunctional requirement)</li><li>7 Functional Model</li><li>8 Structural Models</li><li>9 Behavioral Models</li><li>3 System Request (revised)</li><li>10 Appendices</li></ol><p>Section 1 is the Table of Contents.</p>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically the structure of the system proposal: all ten sections in order, grouped in a sensible way, and who receives the document.</p>",
    "a": "<p>Key labels: <b>Openers</b>: 1 Table of Contents, 2 Executive Summary. <b>Revised planning documents</b>: 3 System Request, 4 Workplan, 5 Feasibility Analysis. <b>New analysis results</b>: 6 Requirements Definition, 7 Functional Model (activity diagram, use cases), 8 Structural Models (CRC cards, class and object diagrams), 9 Behavioral Models (sequence and communication diagrams, state machines, CRUDE matrix). Then 10 Appendices. The proposal goes to the <b>approval committee</b>.</p>",
    "diagram": "flowchart TD\n  subgraph O[\"Openers\"]\n    A[\"1 Table of Contents\"] --> B[\"2 Executive Summary\"]\n  end\n  subgraph R[\"Revised planning documents\"]\n    C[\"3 System Request\"] --> D[\"4 Workplan\"] --> E[\"5 Feasibility Analysis\"]\n  end\n  subgraph N[\"New analysis results\"]\n    F[\"6 Requirements Definition\"] --> G[\"7 Functional Model\"] --> H[\"8 Structural Models\"] --> I[\"9 Behavioral Models\"]\n  end\n  B --> C\n  E --> F\n  I --> J[\"10 Appendices\"]\n  J --> K([\"Approval committee\"])"
   },
   {
    "type": "classify",
    "q": "<p>Sort these terms into the three lists: <b>requirements checks</b>, <b>validation techniques</b> and <b>review checks</b>. One term belongs in two lists.</p><p>Traceability · Prototyping · Realism · Adaptability · Test-case generation · Consistency · Comprehensibility · Requirements reviews · Completeness · Validity · Verifiability</p>",
    "a": "<table><tr><th>Requirements checks (5)</th><th>Validation techniques (3)</th><th>Review checks (4)</th></tr><tr><td>Validity</td><td>Requirements reviews</td><td>Verifiability</td></tr><tr><td>Consistency</td><td>Prototyping</td><td>Comprehensibility</td></tr><tr><td>Completeness</td><td>Test-case generation</td><td>Traceability</td></tr><tr><td>Realism</td><td></td><td>Adaptability</td></tr><tr><td>Verifiability</td><td></td><td></td></tr></table><p><b>Verifiability</b> is in both check lists: \"can the requirements be checked?\" and \"is it realistically testable?\"</p>"
   },
   {
    "type": "scenario",
    "q": "<p>The canteen app went live in September. Since then:</p><ol type=\"a\"><li>A new law requires an electronic fiscal receipt for every sale.</li><li>The university administration, which paid for the app, refused online payment to save money, but students keep asking for it.</li><li>Students want a vegetarian filter and many menu options; kitchen staff want a short, simple menu. The old compromise no longer works.</li></ol><p>(1) Name the reason for the requirements change in each case. (2) What does requirements management do about such changes? (3) Fixing an implementation error costs $150. Up to how much could a requirements error found after delivery cost?</p>",
    "a": "<p>(1)</p><ol type=\"a\"><li>The <b>business and technical environment changes</b> after installation (here, new laws and regulations).</li><li>The people who <b>pay</b> are rarely the people who <b>use</b> the system; the payer's budget limits conflict with users' needs, so features get added after delivery.</li><li>Large systems have <b>diverse users with conflicting priorities</b>; the requirements are a compromise, and the balance has to change.</li></ol><p>(2) It keeps track of each requirement, keeps links between dependent requirements so the impact of a change can be seen, and uses a formal process for change proposals.</p><p>(3) Up to 100 × $150 = <b>$15,000</b>. That is why requirements are validated early.</p>"
   }
  ]
 },
 {
  "lesson": "W7-1",
  "questions": [
   {
    "type": "mcq",
    "q": "<p>Analysis ends with the system proposal. Which part of the system proposal is produced by <b>functional modeling</b> (use cases and activity diagrams)?</p><p>A) Requirements definition<br>B) Feasibility analysis<br>C) Models<br>D) Workplan</p>",
    "a": "<p><b>C</b>, because system proposal = requirements definition + <b>models</b> + feasibility analysis + workplan, and use-case and activity diagrams are the functional models.</p>"
   },
   {
    "type": "classify",
    "q": "<p>A gym wants a membership app. Classify each requirement as <b>functional</b>, <b>non-functional</b> or <b>constraint</b>. Which ones will become use cases?</p><ol type=\"a\"><li>A member can book a group class.</li><li>The booking screen opens in under 2 seconds.</li><li>The app must run on the gym's existing Windows server.</li><li>A trainer can see the list of members booked for his class.</li><li>Members' card data must be encrypted.</li><li>The app must be finished within a budget of $8,000.</li></ol>",
    "a": "<ol type=\"a\"><li><b>Functional</b> → use case <i>Book group class</i>.</li><li><b>Non-functional</b> (performance).</li><li><b>Constraint</b> (technology).</li><li><b>Functional</b> → use case <i>View class list</i>.</li><li><b>Non-functional</b> (security).</li><li><b>Constraint</b> (budget).</li></ol><p>Only (a) and (d) become use cases: use cases model functional requirements only.</p>"
   },
   {
    "type": "short",
    "q": "<p>Compare <b>use-case diagrams</b> and <b>activity diagrams</b>: what each one shows, from whose point of view, and whether it can model the as-is or the to-be system.</p>",
    "a": "<table><tr><th></th><th>Use-case diagram</th><th>Activity diagram</th></tr><tr><td>Shows</td><td><b>WHAT</b> the system does: its basic functions and the actors that use them</td><td><b>HOW</b> the goals are reached: the logic of a business process or workflow, step by step</td></tr><tr><td>View</td><td>external, the user's view (not the internal mechanism)</td><td>the flow of activities and of objects (data) between them</td></tr><tr><td>As-is / to-be</td><td>both</td><td>both (computerized or not)</td></tr></table><p>Both are <b>functional models</b> in object-oriented analysis.</p>"
   },
   {
    "type": "scenario",
    "q": "<p>Explain <b>event-driven modeling</b> using an online food-order app. Give three trigger events and the use case each one starts. What does the system do between events?</p>",
    "a": "<p>Everything the system does is a reaction to a <b>trigger event</b>. With no event, the system is <b>at rest, waiting</b>. When a trigger happens, the system and its users carry out the steps of one use case, then the system goes back to waiting.</p><ul><li>The customer taps \"Place order\" → <i>Place order</i>.</li><li>The restaurant presses \"Accept\" → <i>Accept order</i>.</li><li>The courier marks the order as delivered → <i>Confirm delivery</i>.</li></ul><p>(A time event also works: every night at 00:00 → <i>Produce daily sales report</i>.)</p>"
   },
   {
    "type": "short",
    "q": "<p>Match each sentence with one of the three major requirements activities (<b>anticipation</b>, <b>investigation</b>, <b>specification</b>):</p><ol type=\"a\"><li>The analyst interviews the café cashiers and watches them during peak hours.</li><li>From past projects, the analyst expects payment problems even before studying the café.</li><li>The analyst picks the essential requirements and describes the new system.</li></ol><p>Which activity is called \"the heart of systems analysis\", and in which <b>subphase</b> does elicitation happen?</p>",
    "a": "<ol type=\"a\"><li><b>Investigation</b> (fact-finding: interview, observation).</li><li><b>Anticipation</b> (from past experience).</li><li><b>Specification</b>.</li></ol><p>The heart of systems analysis = <b>requirements investigation</b>. Elicitation happens in the <b>Analysis</b> subphase (Analysis → Modeling → Definition/Specification).</p>"
   },
   {
    "type": "mcq",
    "q": "<p>Which statement about a use case is TRUE?</p><p>A) It shows the internal mechanism of the system.<br>B) It is a sequence of actions that gives an observable result of value to an actor.<br>C) It can model only the new (to-be) system.<br>D) \"The app loads fast\" can be a use case.</p>",
    "a": "<p><b>B</b>, because that is the definition. A is wrong (it is an external view), C is wrong (as-is too), D is wrong (non-functional requirements are never use cases).</p>"
   }
  ]
 },
 {
  "lesson": "W7-2",
  "questions": [
   {
    "type": "mcq",
    "q": "<p>In a food-order system, <b>every time</b> a customer places an order, the system validates the delivery address. How do you draw this?</p><p>A) Dashed arrow «extend» from <i>Validate address</i> to <i>Place order</i><br>B) Dashed arrow «include» from <i>Place order</i> to <i>Validate address</i><br>C) Dashed arrow «include» from <i>Validate address</i> to <i>Place order</i><br>D) Solid line from <i>Place order</i> to <i>Validate address</i></p>",
    "a": "<p><b>B</b>, because it happens every time (mandatory) → «include», and the include arrow goes from the <b>base</b> use case to the <b>included</b> one.</p>"
   },
   {
    "type": "classify",
    "q": "<p>Library system. For each sentence choose <b>association</b>, <b>include</b>, <b>extend</b> or <b>generalization</b>, and say which way the arrow points.</p><ol type=\"a\"><li>Every time a member renews a book, the system checks whether someone has reserved it.</li><li>While searching the catalogue, a member may reserve a book if it is checked out.</li><li>Student Member and Staff Member are both kinds of Member.</li><li>The librarian adds new books.</li><li><i>Borrow e-book</i> and <i>Borrow printed book</i> are special kinds of <i>Borrow book</i>.</li><li>If a fine payment fails, the system may record the failure.</li></ol>",
    "a": "<ol type=\"a\"><li><b>Include</b> (always): <i>Renew book</i> --«include»--&gt; <i>Check reservations</i>.</li><li><b>Extend</b> (optional, condition): <i>Reserve book</i> --«extend» [book is checked out]--&gt; <i>Search catalogue</i>.</li><li><b>Generalization</b> of actors: hollow triangle from Student Member / Staff Member to Member.</li><li><b>Association</b>: solid line Librarian — <i>Add book</i>.</li><li><b>Generalization</b> of use cases: hollow triangle from each special use case to <i>Borrow book</i>.</li><li><b>Extend</b>: <i>Record payment failure</i> --«extend» [payment fails]--&gt; <i>Pay fine</i>.</li></ol>"
   },
   {
    "type": "short",
    "q": "<p>Hotel booking system. Is each one an <b>actor</b>? Why?</p><ol type=\"a\"><li>Guest</li><li>Receptionist</li><li>The hotel's own room-availability database</li><li>The bank's card payment service</li><li>The cleaning staff, who only get a printed list from the receptionist</li><li>The national tax system, which receives an automatic monthly tax file from the hotel system</li></ol>",
    "a": "<ol type=\"a\"><li><b>Actor</b>: a person who uses the system (role).</li><li><b>Actor</b>: a role that uses the system.</li><li><b>Not an actor</b>: it is inside our system; we design and can change it.</li><li><b>Actor</b>: an outside system we cannot change → «actor» box.</li><li><b>Not an actor</b>: they never interact with the system (the receptionist does).</li><li><b>Actor</b>: an outside system that receives output directly from our system.</li></ol>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: a use-case diagram fragment for a <b>cinema ticket system</b> that shows all four relationships. A customer buys a ticket online. Every purchase always includes paying by card through the bank's Card Payment Service. While buying, the customer may choose a VIP seat. Club members and guests are both customers; only club members collect bonus points.</p>",
    "a": "<ul><li><b>Association</b>: Customer — <i>Buy ticket</i>; Club Member — <i>Collect bonus points</i>; <i>Pay by card</i> — «actor» Card Payment Service.</li><li><b>Include</b> (always): <i>Buy ticket</i> → <i>Pay by card</i>.</li><li><b>Extend</b> (optional): <i>Choose VIP seat</i> → <i>Buy ticket</i>, condition [customer wants a VIP seat].</li><li><b>Generalization</b>: Club Member and Guest → Customer (hollow triangle at Customer). Both inherit <i>Buy ticket</i>.</li><li>Boundary box \"Cinema Ticket System\"; all actors outside it.</li></ul>",
    "diagram": "flowchart LR\n  CU([\"👤 Customer\"])\n  CM([\"👤 Club Member\"])\n  GU([\"👤 Guest\"])\n  subgraph CTS[\"Cinema Ticket System\"]\n    BT((\"Buy ticket\"))\n    PC((\"Pay by card\"))\n    VS((\"Choose VIP seat\"))\n    BP((\"Collect bonus points\"))\n  end\n  CP([\"🖥 «actor» Card Payment Service\"])\n  CU --- BT\n  BT -.->|include| PC\n  VS -.->|\"extend: customer wants a VIP seat\"| BT\n  CM -->|is a kind of| CU\n  GU -->|is a kind of| CU\n  CM --- BP\n  PC --- CP"
   },
   {
    "type": "short",
    "q": "<p>A classmate drew a use-case diagram for a gym. Find and fix the errors:</p><ol><li>The actor \"Member\" is drawn inside the system box.</li><li>One use case is called \"Membership\".</li><li>A dashed «extend» arrow goes from <i>Book class</i> to <i>Join waiting list</i>.</li><li>The gym's own member database is drawn as an actor.</li><li><i>Pay fee</i> is linked to <i>Register</i> with «extend», but payment happens every time someone registers.</li></ol>",
    "a": "<ol><li>Actors are <b>outside</b> the subject boundary → move Member outside.</li><li>Names must be <b>verb–noun</b> → \"Buy membership\".</li><li>Extend points from the <b>optional</b> case to the <b>base</b> → arrow from <i>Join waiting list</i> to <i>Book class</i> [class is full].</li><li>Its own database is part of the system → <b>delete</b> the actor.</li><li>Mandatory behaviour = <b>«include»</b>, arrow from <i>Register</i> to <i>Pay fee</i>.</li></ol>"
   },
   {
    "type": "mcq",
    "q": "<p>How do you draw an external system (for example, a payment gateway) on a use-case diagram?</p><p>A) An oval inside the boundary<br>B) A rectangle with «actor» (or a stick figure) outside the boundary<br>C) A database cylinder inside the boundary<br>D) It is not shown</p>",
    "a": "<p><b>B</b>, because an outside system that interacts with ours is an actor, and a non-human actor can be drawn as a rectangle with «actor» and its name, outside the subject boundary.</p>"
   }
  ]
 },
 {
  "lesson": "W7-3",
  "questions": [
   {
    "type": "drawing",
    "q": "<p>Depict graphically: the use-case diagram for the <b>FitZone gym system</b>. People register online as members and pay the membership fee; every payment is processed by the external Payment Gateway. Members book group classes (at most 2 per day). If a class is full, a member may join the waiting list. Premium members are members who can also book a personal-trainer session. Trainers update the class timetable and view the attendance list of their classes. The gym manager produces a monthly membership report. At the entrance, the external Turnstile System sends each card scan to FitZone, which checks the member in.</p>",
    "a": "<ul><li><b>Actors</b>: Member, Premium Member, Trainer, Gym Manager (people); «actor» Payment Gateway, «actor» Turnstile System (outside systems, drawn on the right).</li><li><b>Use cases</b>: Register as member, Pay membership fee, Book group class, Join waiting list, Book personal-trainer session, Update class timetable, View attendance list, Produce monthly report, Check in member.</li><li><b>Include</b>: registering always means paying → <i>Register as member</i> → <i>Pay membership fee</i>.</li><li><b>Extend</b>: <i>Join waiting list</i> → <i>Book group class</i> [class is full].</li><li><b>Generalization</b>: Premium Member → Member (inherits Register and Book group class, adds the PT session).</li><li><b>Not a use case</b>: \"at most 2 classes per day\" is a <b>business rule</b> (it goes into the use-case description).</li></ul>",
    "diagram": "flowchart LR\n  ME([\"👤 Member\"])\n  PM([\"👤 Premium Member\"])\n  TR([\"👤 Trainer\"])\n  GM([\"👤 Gym Manager\"])\n  subgraph FZ[\"FitZone Gym System\"]\n    U1((\"Register as member\"))\n    U2((\"Pay membership fee\"))\n    U3((\"Book group class\"))\n    U4((\"Join waiting list\"))\n    U5((\"Book personal-trainer session\"))\n    U6((\"Update class timetable\"))\n    U7((\"View attendance list\"))\n    U8((\"Produce monthly report\"))\n    U9((\"Check in member\"))\n  end\n  PG([\"🖥 «actor» Payment Gateway\"])\n  TS([\"🖥 «actor» Turnstile System\"])\n  ME --- U1\n  ME --- U3\n  PM -->|is a kind of| ME\n  PM --- U5\n  U1 -.->|include| U2\n  U4 -.->|\"extend: class is full\"| U3\n  TR --- U6\n  TR --- U7\n  GM --- U8\n  U2 --- PG\n  U9 --- TS"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: the use-case diagram for <b>QuickBite</b>, an online food-ordering platform. Customers browse restaurant menus and place orders. Every order is paid online through the external Payment Service. When placing an order, a customer may apply a promo code. Restaurant staff accept orders and update the order status. Couriers see their assigned deliveries and confirm delivery. After delivery the customer may rate the order. Delivery is free for orders above 100,000 UZS. The app must be fast and easy to use.</p>",
    "a": "<ul><li><b>Actors</b>: Customer, Restaurant Staff, Courier; «actor» Payment Service.</li><li><b>Use cases</b>: Browse menu, Place order, Pay online, Apply promo code, Rate order, Accept order, Update order status, View assigned deliveries, Confirm delivery.</li><li><b>Include</b>: <i>Place order</i> → <i>Pay online</i> (every order).</li><li><b>Extend</b>: <i>Apply promo code</i> → <i>Place order</i> [customer has a promo code].</li><li><i>Rate order</i> is its <b>own</b> use case linked to Customer, not an extend of Place order: it starts later, with its own trigger.</li><li><b>Not use cases</b>: \"free delivery above 100,000 UZS\" = business rule; \"fast and easy to use\" = non-functional requirements.</li></ul>",
    "diagram": "flowchart LR\n  CU([\"👤 Customer\"])\n  RS([\"👤 Restaurant Staff\"])\n  CO([\"👤 Courier\"])\n  subgraph QB[\"QuickBite Food-Ordering System\"]\n    U1((\"Browse menu\"))\n    U2((\"Place order\"))\n    U3((\"Pay online\"))\n    U4((\"Apply promo code\"))\n    U5((\"Rate order\"))\n    U6((\"Accept order\"))\n    U7((\"Update order status\"))\n    U8((\"View assigned deliveries\"))\n    U9((\"Confirm delivery\"))\n  end\n  PS([\"🖥 «actor» Payment Service\"])\n  CU --- U1\n  CU --- U2\n  CU --- U5\n  U2 -.->|include| U3\n  U4 -.->|\"extend: customer has a promo code\"| U2\n  U3 --- PS\n  RS --- U6\n  RS --- U7\n  CO --- U8\n  CO --- U9"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: the use-case diagram for a library's <b>Study Room Booking System</b>. Students and staff of the university use it. They search free rooms and book a room (at most 3 hours per day). Each time someone books a room, the system verifies the person's university account with the university's external Identity Service. When booking, a user may also ask for a projector. A user can cancel a booking. The librarian blocks rooms for maintenance and prints the daily room schedule.</p>",
    "a": "<ul><li><b>Actors</b>: Library User, with Student and Staff as kinds of Library User (actor generalization, so we do not draw two copies of every use case); Librarian; «actor» Identity Service.</li><li><b>Use cases</b>: Search free rooms, Book room, Verify university account, Request projector, Cancel booking, Block room for maintenance, Print daily schedule.</li><li><b>Include</b>: <i>Book room</i> → <i>Verify university account</i> (each time); the verification talks to the Identity Service.</li><li><b>Extend</b>: <i>Request projector</i> → <i>Book room</i> [user needs a projector].</li><li><b>Business rule</b>, not a use case: \"at most 3 hours per day\".</li></ul>",
    "diagram": "flowchart LR\n  ST([\"👤 Student\"])\n  SF([\"👤 Staff\"])\n  LU([\"👤 Library User\"])\n  LB([\"👤 Librarian\"])\n  subgraph SRB[\"Study Room Booking System\"]\n    U1((\"Search free rooms\"))\n    U2((\"Book room\"))\n    U3((\"Verify university account\"))\n    U4((\"Request projector\"))\n    U5((\"Cancel booking\"))\n    U6((\"Block room for maintenance\"))\n    U7((\"Print daily schedule\"))\n  end\n  IS([\"🖥 «actor» Identity Service\"])\n  ST -->|is a kind of| LU\n  SF -->|is a kind of| LU\n  LU --- U1\n  LU --- U2\n  LU --- U5\n  U2 -.->|include| U3\n  U4 -.->|\"extend: user needs a projector\"| U2\n  U3 --- IS\n  LB --- U6\n  LB --- U7"
   },
   {
    "type": "scenario",
    "q": "<p>An AI tool produced these elements for the FitZone gym text from the first question of this lesson. Audit them: what is wrong with each, and which error from the classic list is it? What should you send back to the AI?</p><ol><li>Actor \"Building Owner\"</li><li>Use case \"Limit bookings to 2 per day\"</li><li>«extend» arrow from <i>Book group class</i> to <i>Join waiting list</i></li><li>Use case \"Manage system\"</li><li>The Payment Gateway drawn as a stick figure called \"Payment Clerk\"</li><li>Two use cases \"Member books class\" and \"Premium member books class\"</li></ol>",
    "a": "<ol><li><b>Invented actor</b>: no sentence mentions him → delete.</li><li><b>Business rule promoted to a use case</b> → delete; put the rule in the description of Book group class.</li><li><b>«extend» the wrong way</b> → reverse: Join waiting list → Book group class.</li><li><b>Generic name</b> → delete or replace with real verb–noun functions.</li><li><b>Non-human actor drawn as human</b> → «actor» Payment Gateway box.</li><li><b>Near-identical use cases instead of actor generalization</b> → one <i>Book group class</i>, Premium Member → Member.</li></ol><p>Audit rule: every element must be justified by a sentence in the text. Then send <b>targeted corrections</b> (\"remove actor Building Owner\", \"reverse the extend arrow\"); do not regenerate from scratch.</p>"
   },
   {
    "type": "mcq",
    "q": "<p>An LLM writes PlantUML or Mermaid code from a text description, and the code is then rendered as a diagram. Which approach is this, and what is the human's role?</p><p>A) Fine-tuned domain model; the human is the author<br>B) Interactive clarification loop; the human is the renderer<br>C) Direct code generation; the human is the auditor and corrector<br>D) Direct code generation; the human is not needed</p>",
    "a": "<p><b>C</b>, because direct code generation is the dominant approach (diagram-as-code: interpretable and editable). In LLM-assisted modeling the human audits and corrects; in manual modeling the human is the author.</p>"
   },
   {
    "type": "classify",
    "q": "<p>Parking app text: \"<i>A driver finds a free spot on the map and pays for parking through the City Payment System. Parking costs 3,000 UZS per hour. The driver can extend the parking time. Free spots are stored in the app's own parking-spot database. The map should load in 1 second.</i>\" Classify each item: actor, use case, business rule, non-functional requirement, or not an actor (part of the system).</p><ol type=\"a\"><li>Driver</li><li>Pay for parking</li><li>3,000 UZS per hour</li><li>City Payment System</li><li>The app's own parking-spot database</li><li>Map loads in 1 second</li><li>Extend parking time</li></ol>",
    "a": "<ol type=\"a\"><li><b>Actor</b> (human).</li><li><b>Use case</b> (verb–noun).</li><li><b>Business rule</b>, not a use case.</li><li><b>Actor</b>: outside system → «actor».</li><li><b>Not an actor</b>: inside our system.</li><li><b>Non-functional</b> (performance), not a use case.</li><li><b>Use case</b>. (Careful: this is a normal use case named \"extend\", not an «extend» relationship.)</li></ol><p>\"Find free spot\" is also a use case.</p>"
   }
  ]
 },
 {
  "lesson": "W7-4",
  "questions": [
   {
    "type": "scenario",
    "q": "<p>Write the use-case description for <b>Book group class</b> in the FitZone gym system, in the fully dressed template (name, ID, priority, actor, description, trigger and type, preconditions, normal course with information for steps, alternative courses, postconditions, exceptions, summary inputs/outputs). Rules from the text: a member may book at most 2 classes per day; if a class is full, he may join the waiting list; only members with an active membership can book.</p>",
    "a": "<table><tr><td><b>Use Case Name:</b> Book group class</td><td><b>ID:</b> UC-3</td><td><b>Priority:</b> High</td></tr><tr><td colspan=\"3\"><b>Actor:</b> Member</td></tr><tr><td colspan=\"3\"><b>Description:</b> A member chooses a group class from the timetable and the system reserves a place for him, or puts him on the waiting list if the class is full.</td></tr><tr><td colspan=\"3\"><b>Stakeholders and interests:</b> Member: get a place in the class. Trainer: know who is coming. Gym manager: full classes, fair use of places.</td></tr><tr><td colspan=\"3\"><b>Trigger:</b> A member wants to attend a group class. <b>Type:</b> ☑ External ☐ Temporal</td></tr><tr><td colspan=\"3\"><b>Preconditions:</b><br>1. The member is logged in.<br>2. The trainers have published the class timetable.</td></tr><tr><td colspan=\"2\"><b>Normal Course:</b><br>1.0 Book a place<br>1. The member opens the class timetable.<br>2. The system shows the classes with the number of free places.<br>3. The member selects a class.<br>4. The system checks that the membership is active and that the member has fewer than 2 bookings that day.<br>5. The system checks that the class has a free place (Alternative Course 1.1).<br>6. The system saves the booking and reduces the free places by one.<br>7. The system sends a booking confirmation.</td><td><b>Information for Steps:</b><br><br>&rarr; timetable, free places<br>&larr; selected class<br>&larr; membership status, bookings that day<br>&larr; free places<br>&rarr; booking record<br>&rarr; confirmation</td></tr><tr><td colspan=\"3\"><b>Alternative Courses:</b><br>1.1 The class is full (branch at step 5)<br>1. The system offers the waiting list.<br>2. The member accepts.<br>3. The system adds the member to the waiting list and shows his position.<br>4. The system sends a waiting-list confirmation; the use case ends.</td></tr><tr><td colspan=\"3\"><b>Postconditions:</b><br>1. The booking (or waiting-list entry) is stored.<br>2. The free places of the class are updated.<br>3. The member has a confirmation; the trainer's attendance list shows him.</td></tr><tr><td colspan=\"3\"><b>Exceptions:</b><br>E1: The membership has expired (occurs at step 4)<br>1. The system displays \"Your membership has expired\".<br>2. The system terminates the use case.<br>E2: The member already has 2 bookings that day (occurs at step 4)<br>1. The system displays \"Daily limit of 2 classes reached\".<br>2. The system terminates the use case.</td></tr></table><p><b>Summary Inputs / Outputs:</b></p><table><tr><th>Summary Inputs</th><th>Source</th><th>Outputs</th><th>Destination</th></tr><tr><td>Selected class</td><td>Member</td><td>Timetable with free places</td><td>Member</td></tr><tr><td>Membership status</td><td>Member datastore</td><td>Booking record</td><td>Booking datastore</td></tr><tr><td>Bookings that day, free places</td><td>Booking datastore</td><td>Booking / waiting-list confirmation</td><td>Member</td></tr><tr><td>Waiting-list answer</td><td>Member</td><td>Error message</td><td>Member</td></tr></table><p>Why: the full class still ends in a useful result → <b>alternative course</b> (it is the <i>Join waiting list</i> extend from the diagram). Expired membership and the daily limit end in failure → <b>exceptions</b>. The \"2 per day\" business rule lives here, not on the diagram.</p>"
   },
   {
    "type": "short",
    "q": "<p>QuickBite food app, use case <b>Place order</b> (every order is paid online through the Payment Service; a customer may apply a promo code). Fill in only these parts of the template: <b>Trigger + Type</b>, <b>Preconditions</b>, <b>Postconditions</b>, one <b>Alternative Course</b> and one <b>Exception</b>.</p>",
    "a": "<table><tr><td><b>Trigger:</b> The customer wants to order food. <b>Type:</b> ☑ External ☐ Temporal</td></tr><tr><td><b>Preconditions:</b><br>1. The customer is logged in.<br>2. The restaurant is open and its menu is available.<br>3. The Payment Service is reachable.</td></tr><tr><td><b>Postconditions:</b><br>1. The order is stored with status \"New\".<br>2. The payment is recorded.<br>3. The restaurant is notified of the order.<br>4. The customer has an order number.</td></tr><tr><td><b>Alternative Courses:</b><br>1.1 The customer has a promo code (branch at step 4, before payment)<br>1. The customer enters the code.<br>2. The system checks it and reduces the total.<br>3. Continue at step 5 (pay online).</td></tr><tr><td><b>Exceptions:</b><br>E1: The card is declined (occurs at the payment step)<br>1. The system displays \"Payment declined\".<br>2. The system cancels the order and terminates the use case.</td></tr></table><p>The postconditions (order stored, restaurant notified) become the preconditions of the next use case, <i>Accept order</i>.</p>"
   },
   {
    "type": "classify",
    "q": "<p>QuickBite, use case <b>Place order</b>. Is each situation an <b>alternative course</b> or an <b>exception</b>?</p><ol type=\"a\"><li>The customer applies a promo code.</li><li>The Payment Service is down.</li><li>The customer chooses \"pick up myself\" instead of delivery.</li><li>The card is declined.</li><li>The restaurant closed while the customer was choosing.</li><li>The customer picks one of his saved addresses instead of typing a new one.</li></ol>",
    "a": "<ol type=\"a\"><li><b>Alternative</b>: another branch, still a successful order.</li><li><b>Exception</b>: error, no order.</li><li><b>Alternative</b>: success.</li><li><b>Exception</b>: unsuccessful result.</li><li><b>Exception</b>: unusual event, no order.</li><li><b>Alternative</b>: success.</li></ol><p>Rule: both branch off the normal course; an alternative still ends in <b>success</b>, an exception ends <b>unsuccessfully</b>.</p>"
   },
   {
    "type": "classify",
    "q": "<p>External or temporal trigger?</p><ol type=\"a\"><li>A member scans his card at the gym turnstile.</li><li>At midnight, memberships that end today are marked as expired.</li><li>A customer places a food order.</li><li>On the 1st of every month, the manager's membership report is produced.</li><li>A courier confirms a delivery.</li><li>A study-room booking starts in 15 minutes, so a reminder is sent.</li></ol>",
    "a": "<ol type=\"a\"><li><b>External</b></li><li><b>Temporal</b></li><li><b>External</b></li><li><b>Temporal</b></li><li><b>External</b></li><li><b>Temporal</b></li></ol><p>External = something happens outside the system (a person or system acts). Temporal = time passes (a date, a deadline, \"every month\").</p>"
   },
   {
    "type": "mcq",
    "q": "<p>Which part of a fully dressed use-case description lists <b>all</b> inputs with their <b>source</b> and all outputs with their <b>destination</b>?</p><p>A) Information for Steps<br>B) Summary Inputs and Outputs<br>C) Postconditions<br>D) Normal Course</p>",
    "a": "<p><b>B</b>, because the summary table collects every possible input (with source) and output (with destination) of the normal and alternative courses. Information for Steps only marks the data used in each step (&larr; input, &rarr; output).</p>"
   },
   {
    "type": "short",
    "q": "<p>FitZone gym. The postconditions of <i>Register as member</i> are: \"1. The membership is active. 2. The member has a card number.\" (a) How does this link to <i>Book group class</i>? (b) Who is the primary actor of <i>Book group class</i>, and must he be in the stakeholders list? (c) Why does every use case get an ID?</p>",
    "a": "<p>(a) The postconditions of one use case become the <b>preconditions</b> of the next: <i>Book group class</i> needs an active membership, which <i>Register as member</i> produced.</p><p>(b) The <b>Member</b>: he triggers the use case, and it exists to meet his goal. Yes, the stakeholders list <b>always includes the primary actor</b>.</p><p>(c) So each use case is easy to find and the team can <b>trace design decisions back</b> to a specific requirement.</p>"
   }
  ]
 },
 {
  "lesson": "W7-5",
  "questions": [
   {
    "type": "mcq",
    "q": "<p>A thick black bar has <b>one</b> arrow coming in and <b>three</b> arrows going out. What is it?</p><p>A) Decision node<br>B) Merge node<br>C) Fork node<br>D) Join node</p>",
    "a": "<p><b>C</b>, because a fork (thick bar, 1 in, several out) splits the flow into parallel paths that are all executed. A join is also a bar but has several in and 1 out; decision and merge are diamonds.</p>"
   },
   {
    "type": "classify",
    "q": "<p>Name each activity-diagram element:</p><ol type=\"a\"><li>a small filled circle</li><li>a circle with an X inside</li><li>a square-cornered rectangle labelled \"Order\"</li><li>a dashed arrow from an activity to that rectangle</li><li>a diamond with two arrows in and one out</li><li>a bull's-eye</li><li>a rounded rectangle \"Print receipt\" that cannot be broken down further</li></ol>",
    "a": "<ol type=\"a\"><li><b>Initial node</b>.</li><li><b>Final-flow node</b>: stops one path.</li><li><b>Object node</b> (class name).</li><li><b>Object flow</b>.</li><li><b>Merge node</b>.</li><li><b>Final-activity node</b>: stops everything.</li><li><b>Action</b> (an activity can be decomposed, an action cannot).</li></ol>"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: in an online food order, after the customer pays, two things happen in parallel: (1) the system sends an SMS receipt, and that path simply stops; (2) the restaurant prepares the food and the courier delivers it, which ends the whole process. Which final node goes at the end of each path, and why?</p>",
    "a": "<ul><li>After <i>Pay online</i>: a <b>fork</b> bar (\"in parallel\").</li><li>SMS path ends with a <b>final-flow node</b> (circle with X): it stops <b>only this path</b>; delivery goes on.</li><li>Delivery path ends with a <b>final-activity node</b> (bull's-eye): it stops <b>the whole process</b>, including any path still running.</li><li>No join is needed here, because the SMS path stops by itself.</li></ul>",
    "diagram": "flowchart TD\n  S(( )) --> PO(\"Place order\")\n  PO --> PY(\"Pay online\")\n  PY --> F[\" \"]\n  F --> SR(\"Send SMS receipt\")\n  SR --> FF((\"X\"))\n  F --> PF(\"Prepare food\")\n  PF --> DL(\"Deliver order\")\n  DL --> E(((\" \")))\n  classDef bar fill:#222,stroke:#222,color:#222\n  class F bar\n  style S fill:#222,stroke:#222\n  style E fill:#222,stroke:#222"
   },
   {
    "type": "short",
    "q": "<p>Compare <b>control flow</b> and <b>object flow</b> (line style, what each shows, what it connects). Give one example of each from a library \"Borrow Books\" process.</p>",
    "a": "<table><tr><th></th><th>Control flow</th><th>Object flow</th></tr><tr><td>Line</td><td>solid arrow</td><td>dashed arrow</td></tr><tr><td>Shows</td><td>the order of execution</td><td>objects (information) moving into and out of activities</td></tr><tr><td>Connects</td><td>actions/activities only</td><td>an action/activity with an object node</td></tr><tr><td>Example</td><td><i>Validate ID Card</i> → <i>Check for Overdue Books and Fines</i></td><td><i>Validate ID Card</i> - - &gt; [Borrower] object node - - &gt; <i>Check Out Books</i></td></tr></table>"
   },
   {
    "type": "classify",
    "q": "<p>Schedlbauer's best practices for business process modeling: <b>true or false</b>?</p><ol type=\"a\"><li>Model alone, so the team does not confuse you.</li><li>Use whiteboards while modeling; use a CASE tool later to document.</li><li>Try to identify every task now.</li><li>Put tasks that belong to other processes on a to-do list.</li><li>Include every minor task so the model is complete.</li><li>Come back and revise the model as you learn more.</li></ol>",
    "a": "<ol type=\"a\"><li><b>False</b>: modeling is collaborative; work in teams.</li><li><b>True</b>.</li><li><b>False</b>: be realistic, you cannot find everything now.</li><li><b>True</b>: stay focused.</li><li><b>False</b>: a model is an abstraction; leave out minor tasks.</li><li><b>True</b>: iterate.</li></ol><p>(The seventh one: be agile, so what you do identify, identify rigorously.)</p>"
   },
   {
    "type": "short",
    "q": "<p>Why do we draw business process models? What does \"business processes cut across functional departments\" mean (give a gym example), and what is the main risk of these models?</p>",
    "a": "<p>A business process model shows the activities that together support one business process. It is <b>very powerful for communicating</b> the analyst's understanding to the users.</p><p>One process uses several departments: a new gym member's registration goes through Sales (form), Finance (payment) and Front Desk (card), so no single department owns it.</p><p>Risk: it can push the team into a <b>functional decomposition mindset</b> (and early OO approaches often ignored process modeling).</p>"
   }
  ]
 },
 {
  "lesson": "W7-6",
  "questions": [
   {
    "type": "drawing",
    "q": "<p>Depict graphically: an activity diagram with swimlanes for <b>FitZone gym registration</b>. A new member fills in the online registration form. The FitZone system checks whether the e-mail is already registered. If it is, the system shows a message and the process ends. Otherwise the member pays the fee and the Payment Gateway processes the card. If the card is declined, the member pays again with another card. If it is approved, the system at the same time creates the membership card and sends a welcome e-mail. When both are done, the member receives the card number.</p>",
    "a": "<ul><li><b>Lanes</b>: Member, FitZone System, Payment Gateway.</li><li>● in the Member lane → <i>Fill in registration form</i> → <i>Check if e-mail is registered</i>.</li><li><b>Decision 1</b>: [e-mail already registered] → <i>Show already-registered message</i> → end; [new e-mail] → <i>Pay membership fee</i>.</li><li>\"Pays again\" = a <b>loop</b>: a <b>merge</b> diamond just before <i>Pay membership fee</i>; <b>Decision 2</b> after <i>Process card payment</i>: [declined] → back to the merge; [approved] → continue.</li><li>\"At the same time\" → <b>fork</b>: <i>Create membership card</i> and <i>Send welcome e-mail</i>; \"when both are done\" → <b>join</b>.</li><li><i>Receive card number</i> → ◉ final-activity node.</li></ul>",
    "diagram": "flowchart TD\n  subgraph MB[\"Member\"]\n    S(( ))\n    FO(\"Fill in registration form\")\n    M0{\" \"}\n    PF(\"Pay membership fee\")\n    RC(\"Receive card number\")\n    E(((\" \")))\n  end\n  subgraph FZ[\"FitZone System\"]\n    CE(\"Check if e-mail is registered\")\n    D1{\" \"}\n    SM(\"Show already-registered message\")\n    F[\" \"]\n    CC(\"Create membership card\")\n    SW(\"Send welcome e-mail\")\n    J[\" \"]\n  end\n  subgraph PG[\"Payment Gateway\"]\n    PC(\"Process card payment\")\n    D2{\" \"}\n  end\n  S --> FO\n  FO --> CE\n  CE --> D1\n  D1 -->|\"[e-mail already registered]\"| SM\n  SM --> E\n  D1 -->|\"[new e-mail]\"| M0\n  M0 --> PF\n  PF --> PC\n  PC --> D2\n  D2 -->|\"[declined]\"| M0\n  D2 -->|\"[approved]\"| F\n  F --> CC\n  F --> SW\n  CC --> J\n  SW --> J\n  J --> RC\n  RC --> E\n  classDef bar fill:#222,stroke:#222,color:#222\n  class F,J bar\n  style S fill:#222,stroke:#222\n  style E fill:#222,stroke:#222"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: an activity diagram with swimlanes for a <b>QuickBite food order</b>. The customer places and pays for an order. The restaurant checks whether it can make the order. If not, it rejects the order, the customer gets a refund and the process ends. If yes, the restaurant cooks the food while, at the same time, a courier accepts the delivery request and goes to the restaurant. When the food is ready and the courier has arrived, the courier picks up the food and delivers it, and the customer receives the order.</p>",
    "a": "<ul><li><b>Lanes</b>: Customer, Restaurant, Courier.</li><li>● → <i>Place and pay for order</i> (Customer) → <i>Check if order can be made</i> (Restaurant).</li><li><b>Decision</b> with guards [cannot make] → <i>Reject order</i> → <i>Receive refund</i> (Customer) → end; [can make] → fork.</li><li>\"While, at the same time\" → <b>fork</b>: <i>Cook food</i> (Restaurant) ∥ <i>Accept delivery request</i> → <i>Go to restaurant</i> (Courier).</li><li>\"When the food is ready and the courier has arrived\" → <b>join</b>, then <i>Pick up food</i> → <i>Deliver order</i> → <i>Receive order</i> → ◉.</li><li>Arrows crossing lanes = hand-overs between roles.</li></ul>",
    "diagram": "flowchart TD\n  subgraph CU[\"Customer\"]\n    S(( ))\n    PO(\"Place and pay for order\")\n    RF(\"Receive refund\")\n    RO(\"Receive order\")\n    E(((\" \")))\n  end\n  subgraph RE[\"Restaurant\"]\n    CK(\"Check if order can be made\")\n    D1{\" \"}\n    RJ(\"Reject order\")\n    F[\" \"]\n    CF(\"Cook food\")\n  end\n  subgraph CR[\"Courier\"]\n    AD(\"Accept delivery request\")\n    GR(\"Go to restaurant\")\n    J[\" \"]\n    PU(\"Pick up food\")\n    DL(\"Deliver order\")\n  end\n  S --> PO\n  PO --> CK\n  CK --> D1\n  D1 -->|\"[cannot make]\"| RJ\n  RJ --> RF\n  RF --> E\n  D1 -->|\"[can make]\"| F\n  F --> CF\n  F --> AD\n  AD --> GR\n  CF --> J\n  GR --> J\n  J --> PU\n  PU --> DL\n  DL --> RO\n  RO --> E\n  classDef bar fill:#222,stroke:#222,color:#222\n  class F,J bar\n  style S fill:#222,stroke:#222\n  style E fill:#222,stroke:#222"
   },
   {
    "type": "drawing",
    "q": "<p>Depict graphically: an activity diagram for <b>Return Book</b> in a library. When a borrower returns a book, the librarian scans it. If the book is overdue, the system calculates the fine and the borrower pays it. Then the system closes the loan record. If another borrower has reserved the book, the system notifies that borrower and the book is kept at the desk; otherwise the book goes back on the shelf.</p>",
    "a": "<ul><li>● → <i>Scan returned book</i>.</li><li><b>Decision 1</b>: [overdue] → <i>Calculate fine</i> → <i>Pay fine</i>; [on time] → straight on. Both paths meet at a <b>merge</b> → <i>Close loan record</i>.</li><li><b>Decision 2</b>: [reserved by another borrower] → <i>Notify requesting borrower</i> → <i>Keep book at the desk</i>; [not reserved] → <i>Put book back on shelf</i>.</li><li><b>Merge</b> → ◉ final-activity node.</li><li>No fork: nothing happens in parallel. Every decision exit has a guard. (Swimlanes Borrower / Librarian / Library System would make it even better.)</li></ul>",
    "diagram": "flowchart TD\n  S(( )) --> SB(\"Scan returned book\")\n  SB --> D1{\" \"}\n  D1 -->|\"[overdue]\"| CF(\"Calculate fine\")\n  CF --> PF(\"Pay fine\")\n  D1 -->|\"[on time]\"| M1{\" \"}\n  PF --> M1\n  M1 --> CL(\"Close loan record\")\n  CL --> D2{\" \"}\n  D2 -->|\"[reserved by another borrower]\"| NR(\"Notify requesting borrower\")\n  NR --> KD(\"Keep book at the desk\")\n  D2 -->|\"[not reserved]\"| PS(\"Put book back on shelf\")\n  KD --> M2{\" \"}\n  PS --> M2\n  M2 --> E(((\" \")))\n  style S fill:#222,stroke:#222\n  style E fill:#222,stroke:#222"
   },
   {
    "type": "classify",
    "q": "<p>Which activity-diagram element does each phrase of a narrative point to?</p><ol type=\"a\"><li>\"If the card is valid…, otherwise…\"</li><li>\"Meanwhile, the kitchen prepares the food\"</li><li>\"When both are ready…\"</li><li>\"The courier does…\" / \"The restaurant does…\"</li><li>\"…and the order is complete\" (everything stops)</li><li>\"The SMS part stops here, but delivery continues\"</li><li>\"The address entered at the start is used later, at delivery\"</li></ol>",
    "a": "<ol type=\"a\"><li><b>Decision</b> node with guards [valid] / [invalid].</li><li><b>Fork</b>.</li><li><b>Join</b>.</li><li><b>Swimlanes</b>, one per role.</li><li><b>Final-activity</b> node (bull's-eye).</li><li><b>Final-flow</b> node (circle with X).</li><li><b>Object node</b> + dashed <b>object flows</b> (shown because the information is used later, not in the next step).</li></ol>"
   },
   {
    "type": "short",
    "q": "<p>A classmate drew an activity diagram for a food order. Find and fix the errors:</p><ol><li>There are two initial nodes.</li><li>A diamond with one arrow in and two out, going to \"Cook food\" and \"Assign courier\", which happen at the same time.</li><li>A decision diamond with exits but no labels.</li><li>The whole process ends with a circle with an X.</li><li>An arrow to the object node \"Order\" is drawn solid.</li><li>An activity is called \"Payment\".</li></ol>",
    "a": "<ol><li>Exactly <b>one</b> initial node.</li><li>Parallel work needs a <b>fork bar</b> (and a join bar later), not a diamond.</li><li>Put a <b>guard condition in [brackets] on every exit</b>, covering all cases.</li><li>When everything stops, use the <b>final-activity</b> node (bull's-eye); the X is final-flow.</li><li>Object flow is <b>dashed</b>.</li><li>Use <b>verb + noun</b>: \"Pay for order\".</li></ol>"
   },
   {
    "type": "scenario",
    "q": "<p>Apply the <b>5 steps for creating an activity diagram</b> to the FitZone use case <i>Book group class</i> (if the class is full, the member may join the waiting list; maximum 2 bookings per day). Say what you do in each step.</p>",
    "a": "<ol><li><b>Choose a business process</b>: the use case <i>Book group class</i> (from the use-case diagram and requirements).</li><li><b>Identify the activities</b>: Select class, Check membership and daily limit, Check free places, Save booking, Add to waiting list, Send confirmation.</li><li><b>Identify control flows and nodes</b>: initial node; decision [active, under limit] / [expired or limit reached]; decision [place free] / [class full]; merge before Send confirmation; final node. No fork: nothing runs in parallel.</li><li><b>Identify object flows and nodes</b>: usually not shown; none needed here, because each piece of information is used in the very next step.</li><li><b>Lay out and draw</b>, minimizing line crossings.</li></ol>"
   }
  ]
 }
];
