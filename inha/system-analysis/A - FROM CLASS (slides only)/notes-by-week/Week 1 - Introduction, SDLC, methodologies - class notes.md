# Week 1 — Introduction, SDLC & development methodologies (CLASS NOTES — from slides only)
> Sources: 1_1 Introduction_1.pdf (17 slides) [W1a-S#], 1_2 Sys Development Methodologies.pdf (57 slides) [W1b-S#].
>
> **Track A only.** Everything here comes from the professor's slides: text, pictures and diagrams. Anything a slide does not explain is marked 🔎 so you can look it up in Track B.
> Legend: ⭐ = professor emphasis (bold / red / blue / underlined text, exercises, key takeaways) · ⚠️ = apparent typo or glitch on the slide (original kept, correction given) · 🔎 = not explained on the slides, look up in Track B.

---

## 1. Big picture

- **Why we need a formal process:** "Failures occur (too) often", "Creating systems is not intuitive", and "Projects are late, over budget or delivered with fewer features than planned". **"The System Analyst is the key person"**: the analyst "Designs a system to add value" and "Must understand the business processes". [W1a-S4]
- **System:** "an orderly grouping of interdependent components linked together according to a plan to achieve a specific goal". A system has 3 basic constraints:
  1. **structure and behavior**
  2. **interconnectivity and interdependence**
  3. the **objectives of the organization** have a **higher priority** than the objectives of its subsystems [W1a-S7]
- **SDLC:** "the process of understanding how an information system (IS) can support business needs by designing a system, building it, and delivering it to users." Its 4 phases are **Planning → Analysis → Design → Implementation** [W1a-S8, S9]. Each phase has its own steps, techniques and deliverables [W1a-S10–S17]:

  | Phase | Main deliverable(s) |
  |---|---|
  | Planning | System request + feasibility study, and project plan |
  | Analysis | System proposal |
  | Design | System specification |
  | Implementation | Installed system |

  The second deck adds a 5th phase, **Post production** (maintenance), "probably the longest phase in SDLC" [W1b-S4].
- **People and careers:** the deck gives responsibilities for 5 roles: business analyst, systems analyst, infrastructure analyst, change management analyst and project manager [W1a-S3]. Career paths start from two entry-level jobs: business function specialist, or programmer/analyst [W1b-S2].
- **Analyst skills:**
  - **Hard skills** are measurable, can be certified and are tied to a profession. **Soft skills** are personal, not tied to a profession, and hard to confirm at an interview. [W1b-S6, S7]
  - The **AI-augmented analyst** has 6 extra skills [W1b-S8, S9]: prompt engineering, AI output validation, data literacy, ethical AI awareness, AI-tool orchestration and model evaluation.
  - **AI-aware design** changes 5 traditional OO assumptions and adds 5 OO design patterns. [W1b-S10, S11]
- **Methodology:** "a formalized approach to implementing the SDLC (i.e., it is a list of steps and deliverables)" [W1b-S12].
  - ⭐ Methodologies are categorized by "the sequencing of the SDLC phases and the amount of time and effort devoted to each" [W1b-S13].
  - **6 project characteristics** drive the choice of methodology [W1b-S14, S46]: clarity of user requirements, familiarity with technology, system complexity, system reliability, short time schedules and schedule visibility.
  - ⭐ The **"Which Methodology to Use?"** table rates Waterfall, Parallel, Phased, Prototyping, Throwaway Prototyping and Extreme Programming as Poor, Good or Excellent on each of these 6 characteristics [W1b-S46]; see §4.3.
- **Plan-driven vs agile:**
  - In **plan-driven** processes, all activities are planned in advance and progress is measured against that plan.
  - In **agile** processes, planning is incremental and the process is easier to change.
  - Most practical processes include elements of both, and ⭐ **"There are no right or wrong software processes."** [W1b-S16]
  - Use plan-driven for high-level planning and agile for low-level planning [W1b-S5].
  - **Rolling Wave Planning:** "Planning is Throughout the Project - Not a Stage". There are project-level, stage-level and weekly/monthly plans [W1b-S57].
- **Three classes of methodologies** [W1b-S17]:
  - **Structured:** Waterfall and Parallel. The V-model [W1b-S22] is shown among the waterfall slides.
  - **RAD:** Phased and Prototyping. Throwaway prototyping, which is "similar to prototyping-based methodologies", comes right after prototyping [W1b-S38, S39].
  - **Agile:** XP and Scrum

  Parallel development tries to fix "long delays between the analysis phase and the delivery of the system" [W1b-S24]. RAD tries to address "both weaknesses of structured design methodologies" [W1b-S26]. The waterfall's inflexibility makes it "difficult to respond to changing customer requirements" [W1b-S23].
- **AI and methodologies:** AI-Augmented Agile, MLOps, LLM-Driven Development and Automated Methodology Selection [W1b-S45]. The deck also ends with a Key Takeaways table [W1b-S47].

---

## 2. Slide-by-slide notes

### DECK W1a — "1_1 Introduction_1" (17 slides)

### [W1a-S1] System Analysis (title slide)
- Title "System Analysis" and the name "DR. ANDREI DRAGUNOV". There is nothing else on the slide.

### [W1a-S2] How course will be organized?
The slide has 5 bullets with orange checkbox icons:
- "Telegram channel (find in eclass)"
- "Every week I'll upload one or two lectures"
- "Send me email should you have any questions"
- "Will be two exams: Midterm and final (plus two quizzes)". The part "(plus two quizzes)" is in small print.
- "After final exam I can give you recommendation letter only if your grade will be higher than B+ (B+ or A0 or A+)"
- ⚠️ "higher than B+ (B+ or A0 or A+)": the list in brackets includes B+ itself, so the practical meaning is **B+ or higher**.

### [W1a-S3] Project roles: photo + "Role / Responsibilities" table (no title)
- **Photo (left):** a road-works crew around a hole in the ground. Only one worker, labelled **"Programmer"**, is in the hole actually digging. Ten other people stand around and watch, each labelled with a role: **Project manager, System Analyst, Business Analyst, Change management Analyst, Manager, Infrastructure Analyst, Head of department, Project Champion, Product owner, SCRUM Master**. The joke is that there are many roles around one person who does the work.
- **Table (right), transcribed:**

| Role | Responsibilities |
|---|---|
| Business analyst | Analyzing the key business aspects of the system · Identifying how the system will provide business value · Designing the new business processes and policies |
| Systems analyst | Identifying how technology can improve business processes · Designing the new business processes · Designing the information system · Ensuring that the system conforms to information systems standards |
| Infrastructure analyst | Ensuring the system conforms to infrastructure standards · Identifying infrastructure changes needed to support the system |
| Change management analyst | Developing and executing a change management plan · Developing and executing a user training plan |
| Project manager | Managing the team of analysts, programmers, technical writers, and other specialists · Developing and monitoring the project plan · Assigning resources · Serving as the primary point of contact for the project |

- ⚠️ In the slide image the left edge of the table is cut off, so the role reads "hange management / nalyst". It should be **Change management analyst**.
- How to tell the roles apart (from this table only):
  - **Both** the business analyst and the systems analyst do "Designing the new business processes".
  - Only the **systems analyst** designs *the information system* and checks *information systems standards*.
  - The **business analyst** covers *business value* and *policies*.
  - The **infrastructure analyst** covers *infrastructure standards and changes*.
  - The **change management analyst** owns the *change management plan* and the *user training plan*.
  - The **project manager** is the *primary point of contact* and *assigns resources*.
- Manager, Head of department, Project Champion, Product owner and SCRUM Master appear only as photo labels; the slide gives no responsibilities for them. 🔎 Look up in Track B: what a Product owner, a SCRUM Master and a Project Champion do.

### [W1a-S4] Introduction to Systems Analysis and Design
- ⭐ **"Why do we need a formal process?"** The words "formal process" are **underlined in red**.
  - "Failures occur (too) often"
  - "Creating systems is not intuitive"
  - "Projects are late, over budget or delivered with fewer features than planned"
- ⭐ **"The System Analyst is the key person"** is in **bold**, and "System Analyst" is **underlined in red**.
  - "Designs a system to add value"
  - "Must understand the business processes"
  - "Job is rewarding, yet challenging"
  - "Requires specific skill sets" (these skills are covered in W1b-S6–S9)

### [W1a-S5] Syllabus
- The slide shows only the title "Syllabus". Its body is empty in the PDF, so the syllabus content itself is not on the slide.

### [W1a-S6] Reference books (image only, no title)
The slide is a collage of 8 book covers:
1. "Systems Analysis & Design" (a waterfall photo; no author visible)
2. **"Systems Analysis and Design", Eighth Edition, by Alan Dennis · Barbara Haley Wixom · Roberta M. Roth (WILEY)**. This is the course textbook.
3. "Systems Analysis & Design", 5th edition (green and yellow cover; no author visible)
4. "SYSTEMS ANALYSIS AND DESIGN", 12th Edition, by Scott Tilley (CENGAGE, "…Cashman Series")
5. "Object-Oriented Systems Analysis And Design Using UML", Third Edition, by Simon Bennett, Steve McRobb and Ray Farmer (McGraw Hill; the names are partly covered)
6. A partly hidden cover showing "…nalysis", "…PPROACH", "4th edition" and "…M · TEGARDEN"
7. "SOFTWARE ENGINEERING" 9, by SOMMERVILLE
8. "Software Engineering: A Practitioner's Approach", Seventh Edition, by Roger S. Pressman

### [W1a-S7] What is a System?
- Origin of the word:
  > "The word System is derived from Greek word Systema, which means an organized relationship between any set of components to achieve some common cause or objective."
- ⭐ **Definition** (in italics on the slide):
  > *A system is "an orderly grouping of interdependent components linked together according to a plan to achieve a specific goal."*
- ⭐ **Constraints of a System** (bold heading): "A system must have three basic constraints −"
  1. "A system must have some **structure and behavior** which is designed to achieve a predefined objective."
  2. "**Interconnectivity** and **interdependence** must exist among the system components."
  3. "The **objectives of the organization** have a **higher priority** than the objectives of its subsystems."
- The bold words are the professor's keywords: *structure and behavior*, *interconnectivity*, *interdependence*, *objectives of the organization*, *higher priority*.
- Memory hook (a study aid, not on the slide): **S-I-O** = **S**tructure & behavior, **I**nterconnectivity & interdependence, **O**rganization's objectives first.

### [W1a-S8] THE SYSTEMS DEVELOPMENT LIFE CYCLE (definitions)
- ⭐ **Visible definition**, with the term in bold:
  > "The **Systems Development Life Cycle (SDLC)** is the process of understanding how an information system (IS) can support business needs by designing a system, building it, and delivering it to users."
  > -"System Analysis Design UML Version 2.0"
- **Second definition, hidden.** It is in the PDF as **white text on the white background**, so it is invisible in the slide image (probably revealed during class):
  > "The Systems Development Life Cycle (SDLC), or Software Development Life Cycle in systems engineering, information systems and software engineering, is the process of creating or altering systems, and the models and methodologies that people use to develop these systems."
  > -"Introduction to Software Engineering, en.wikibooks.org"
- Key verbs of definition 1: **understand → design → build → deliver**.

### [W1a-S9] THE SYSTEMS DEVELOPMENT LIFE CYCLE (three diagrams)
1. **Top (a straight line):** Idea (light-bulb icon) → **Planning → Analysis → Design → Implementation** → "System Success" (a computer screen with a thumbs-up).
2. **Bottom-left (a cycle):** four orange boxes joined by arrows in a loop: Planning → Analysis → Design → Implementation → back to Planning.
3. **Bottom-right (a colour wheel):** titled "SDLC — Software/System Development Life Cycle - SDLC". Five arrows run clockwise: Requirement Analysis → Design → Implementation → Testing → Evolution → back to Requirement Analysis.
- ⭐ The 4 SDLC phases in order are **Planning, Analysis, Design, Implementation**. The same phases can be drawn as a line (from idea to success) or as a repeating cycle.

### [W1a-S10] SDLC: The Planning Phase
1. **Project Initiation**
   - Develop/receive a system request
   - Conduct a feasibility analysis
     - Technical feasibility
     - Economic feasibility
     - Organizational feasibility
2. **Project Management**
   - Develop the work plan
   - Staff the project
   - Monitor & control the project
- To remember: the planning phase has **2 steps** (Initiation and Management) and **3 feasibility types** (Technical, Economic, Organizational).

### [W1a-S11] Planning phase: Phase / Chapter / Step / Technique / Deliverable table (image)
- **Phase box:** "**Planning** — Focus: Why build this system? How to structure the project? Primary outputs: — System Request with feasibility study — Project plan"

| Chapter | Step | Technique | Deliverable |
|---|---|---|---|
| 1 | Identify opportunity | Project identification | System request |
| 1 | Analyze feasibility | Technical feasibility · Economic feasibility · Organizational feasibility | Feasibility study |
| 2 | Develop workplan | Time estimation · Task identification · Work breakdown structure · PERT chart · Gantt chart · Scope management | Project plan — work plan |
| 2 | Staff project | Project staffing · Project charter | — Staffing plan |
| 2 | Control and direct project | CASE repository · Standards · Documentation · Timeboxing · Risk management | — Standards list · — Risk assessment |

- The "Chapter" column gives the chapter numbers of the book the table comes from. The deliverables marked "—" are parts of the Project plan.

### [W1a-S12] SDLC: The Analysis Phase
1. **Develop an analysis strategy**
   - Model the current system
   - Formulate the new system
2. **Gather the requirements**
   - Develop a system concept
   - Create a business model to represent:
     - Business data
     - Business processes
3. **Develop a system proposal**

### [W1a-S13] Analysis phase: Phase / Chapter / Step / Technique / Deliverable table (image)
- **Phase box:** "**Analysis** — Focus: Who, what, where, and when for this system? Primary output — System proposal"

| Chapter | Step | Technique | Deliverable |
|---|---|---|---|
| 3 | Develop analysis strategy | Business process automation · Business process improvement · Business process reengineering | System proposal |
| 3 | Determine business requirements | Interview · JAD session · Questionnaire · Document analysis · Observation | — Requirements definition |
| 4 | Create use cases | Use case analysis | — Use cases |
| 5 | Model processes | Data flow diagramming | — Process models |
| 6 | Model data | Entity relationship modeling · Normalization | — Data model |

- The System proposal is made up of the requirements definition, use cases, process models and data model (the items marked "—").
- 🔎 Look up in Track B: what BPA, BPI and BPR, a JAD session, DFDs and ER modeling are. The slide only names them.

### [W1a-S14] SDLC: The Design Phase
1. Develop a design strategy
2. Design architecture and interfaces
3. Develop databases and file specifications
4. Develop the program design to specify:
   - What programs to write
   - What each program will do

### [W1a-S15] Design phase: Phase / Chapter / Step / Technique / Deliverable table (image)
- **Phase box:** "**Design** — Focus: How will this system work? Primary output: — System specification"

| Chapter | Step | Technique | Deliverable |
|---|---|---|---|
| 7 | Design physical system | Design strategy | Alternative matrix · System specification |
| 8 | Design architecture | Architecture design · Hardware & software selection | — Architecture report · — Hardware & software specification |
| 9 | Design interface | Use scenario · Interface structure · Interface standards · Interface prototype · Interface evaluation | — Interface design |
| 10 | Design programs | Data flow diagramming · Program structure chart · Program specification | — Physical process model · — Program design |
| 11 | Design databases and files | Data format selection · Entity relationship modeling · Denormalization · Performance tuning · Size estimation | — Database & file specification · — Physical data model |

### [W1a-S16] SDLC: The Implementation Phase
1. **Construct the system**
   - Build it (write the programming code)
   - Test it
2. **Install system**
   - Train the users
3. **Support the system (maintenance)**

### [W1a-S17] Implementation phase: Phase / Chapter / Step / Technique / Deliverable table (image)
- **Phase box:** "**Implementation** — Focus: delivery and support of completed system. Primary output: — Installed system"

| Chapter | Step | Technique | Deliverable |
|---|---|---|---|
| 12 | Construct system | Programming · Software testing · Performance testing | Test plan · Programs · Documentation · Migration plan |
| 13 | Install system | Conversion strategy selection · Training | — Conversion plan · — Business contingency plan · — Training plan |
| 13 | Maintain system | Support selection · System maintenance · Project assessment | Support plan · Problem report · Change request |
| 13 | Post-implementation | Post-implementation audit | Post-implementation audit report |

#### ⭐ W1a summary: the 4 SDLC phases at a glance (built from W1a-S10–S17)
| Phase | Focus question (from the tables) | Steps (from the bullet slides) | Primary output |
|---|---|---|---|
| **Planning** | "Why build this system? How to structure the project?" | Project initiation (system request, feasibility: technical / economic / organizational) · Project management (work plan, staffing, monitor & control) | System request with feasibility study; Project plan |
| **Analysis** | "Who, what, where, and when for this system?" | Analysis strategy (model current system, formulate new) · Gather requirements (system concept, business model of data and processes) · System proposal | System proposal |
| **Design** | "How will this system work?" | Design strategy · Architecture & interfaces · Databases & file specs · Program design (what programs, what each does) | System specification |
| **Implementation** | "delivery and support of completed system" | Construct (build and test) · Install (train users) · Support (maintenance) | Installed system |

---

### DECK W1b — "1_2 Sys Development Methodologies" (57 slides)
*Every W1b slide has the footer "SYSTEM ANALYSIS" plus the slide number.*

### [W1b-S1] System Analysis: "System development methodologies" (title slide)
- The slide shows "System Analysis", "DR. DRAGUNOV" and, at the bottom right, the subtitle "System development methodologies". Top right is the Inha University in Tashkent seal (dated 2014).

### [W1b-S2] Career Paths for System Developers
- **Diagram:** two starting jobs on the left (rounded teal boxes), four middle jobs, and three senior jobs on the right, joined by arrows.
- **Legend** (bottom right): a solid curved arrow = **"More common path"**; a dashed curved arrow = **"Less common path"**.

| From | → To | Arrow |
|---|---|---|
| Entry-level business function specialist | Requirements analyst | solid (more common) |
| Entry-level business function specialist | Business analyst | solid (more common) |
| Entry-level business function specialist | Systems analyst | *dashed (less common)* |
| Entry-level programmer/analyst | Requirements analyst | *dashed (less common)* |
| Entry-level programmer/analyst | Business analyst | solid |
| Entry-level programmer/analyst | Systems analyst | solid |
| Entry-level programmer/analyst | Infrastructure analyst | solid |
| Requirements analyst | Change management analyst | solid |
| Business analyst | Change management analyst | solid |
| Business analyst | Project manager | solid |
| Systems analyst | Project manager | solid |
| Systems analyst | Software architect | *dashed (less common)* |
| Infrastructure analyst | Software architect | solid |

- What the diagram shows:
  - Only the **programmer/analyst** has a path to **Infrastructure analyst**.
  - **Project manager** is reached from the Business analyst or the Systems analyst.
  - **Software architect** is usually reached from the Infrastructure analyst, and less often from the Systems analyst.
  - **Change management analyst** is reached from the Requirements analyst or the Business analyst.

### [W1b-S3] Diversity of SDLC variants
- The slide is a screenshot of image-search results: **11 different SDLC diagrams** from 11 websites. They use different numbers of phases and different phase names:

| Source shown | Phases in that picture |
|---|---|
| svitla.com | Planning → Analysis → Design → Development → Testing → Implementation → Maintenance (cycle) |
| en.wikipedia.org | Planning → Analysis → Design → Implementation → Maintenance (cycle) |
| ecampusontario.pressbooks.pub | Preliminary Analysis / System Analysis → System Design → Programming → Testing → Implementation → Maintenance |
| medium.com | Requirement Analysis → Defining → Designing → Coding → Testing → Deployment → Maintenance |
| smartsheet.com | 9 numbered stages (tiny print): Analysis, Planning, Design, Development, Testing, Deployment, Maintenance, Evaluation, Disposal |
| researchgate.net | Planning → Analysis → Design → Implementation & Deployment → Testing & Integration → Maintenance |
| bndsbon.wordpress.com | 1 plan → 2 analyze → 3 design → 4 develop → 5 implement → 6 maintain |
| innovativearchitects.com | "7 PHASES OF THE SYSTEM-DEVELOPMENT LIFE CYCLE" (an infographic; the phase names are unreadable) |
| bigwater.consulting | 1 Planning → 2 Analysis → 3 Design → 4 Implementation → 5 Testing & Integration → 6 Maintenance |
| itlaw.fandom.com | "SDLC Process": Planning, Requirements Definition, Design, Development, Test, Implementation, O&M and Disposition phases |
| sites.google.com | "Project Methodology": Requirement Analysis → Design → Development → Implementation and Support → Maintenance & Promotion |

- The point of the slide: there is **no single standard SDLC picture**; the variants range from 5 to 9 phases. The next slide offers "the solution (at least some help)".

### [W1b-S4] The solution (at least some help).
- **Diagram:** five rounded boxes in a row joined by small blue arrows: **Planning → Analysis → Design → Implementation → Post production**.
- The slide text, verbatim:
  > "Planning – the initial stage in which key business needs supposed to be identified and development methodologies are chosen. Originally, project plan supposed to be developed in planning phase but at this point due to lack of detailed business requirements only high-level plan may be developed. Later with deeper understanding of the systems problem domain and due to scope creep this high-level plan should be refined. Low-level planning should be done regularly depends on chosen development methodology."
  >
  > "Analysis – is the second, probably, the key phase is aimed on user (or business) requirements gathering and requirements elicitation. Both functional and nonfunctional requirements should be clearly understood at this moment. Also, functional, Structural and Behavioral models may be crated at this stage. At the end of Analysis phase System proposal must be prepared and approved by steering committee of organization."
  >
  > "Design – the third phase when business requirements supposed to be transformed in to form of system requirements. And architecture of the system including subsystems should be prepared."
  >
  > "The fourth stage – Implementation (or Development) phase should include writing the source code, testing and deployment or delivering to end-users."
  >
  > "Last fifth stage is Post Production phase includes maintenance. This is probably the longest phase in SDLC includes continues user training and improvements of the system."
- **Key points, phase by phase:**
  - **Planning:** identify key business needs and **choose the development methodology**. At first only a **high-level plan** is possible, because detailed requirements are missing. That plan is refined later, as understanding deepens and because of scope creep. **Low-level planning is done regularly**, depending on the chosen methodology.
  - **Analysis:** "probably, the key phase". It covers requirements gathering and elicitation, with both **functional and nonfunctional** requirements. Functional, structural and behavioral models may be created. It ends with the **System proposal**, which must be "prepared and approved by steering committee of organization".
  - **Design:** business requirements are turned into **system requirements**, and the architecture, including subsystems, is prepared.
  - **Implementation (or Development):** source code, testing, and deployment or delivery to end-users.
  - **Post Production:** maintenance. "probably the longest phase in SDLC", including continuous user training and improvements.
- ⭐ Compare the decks: W1a uses **4 phases**, with maintenance inside Implementation as "Support the system (maintenance)" [W1a-S16]. This slide makes it a **5th phase, "Post production"**.
- ⚠️ Typos and grammar (original → correction):
  - "supposed to be identified" → "are supposed to be identified"
  - "regularly depends on chosen" → "regularly, depending on the chosen"
  - "is aimed on" → "is aimed at"
  - "may be **crated**" → "may be **created**"
  - "transformed **in to** form of" → "transformed **into** the form of"
  - "includes **continues** user training" → "**continuous**"
- 🔎 Look up in Track B: "scope creep", "steering committee", and "functional vs nonfunctional requirements". The slide names them but does not define them.

### [W1b-S5] About plans.
- **Diagram:** one large hollow arrow pointing right, labelled **"High-level plan"**. Inside it is a row of 9 small looping (circular) arrows labelled **"Low-level plans"**. In other words, one long overall plan contains many short, repeating planning cycles.
- ⭐ Bold statement: **"Plan-Driven methodology used for high-level planning and Agile methodologies for low-level planning."**
- This links back to S4: "only high-level plan may be developed" at first, and "Low-level planning should be done regularly".

### [W1b-S6] SYSTEM ANALYST SKILLS
- > "Skill - the ability to do something well."
- ⭐ > "**Hard skills** are professional skills that can be measured, assessed and verified. Hard skills can be confirmed by a specific action, certificate, portfolio."
- > "Examples of hard skills are the ability to drive a car, touch-type, program in a certain programming language."
- ⭐ > "**Soft skills** are a person's socio-psychological or personal skills that do not depend on the profession."
- > "It is difficult to measure or confirm them at the moment (at an interview). Soft skills are most often aimed at oneself or at other people. Such skills include the ability to plan your time and concentrate on what is important, analytical thinking, the ability to justify your decisions, the ability to work in a team and teach others, and everything that we often call personal qualities. They can be either innate or acquired through experience."
- The Inha logo is at the top right.
- ⚠️ Exam trap: **"analytical thinking" is listed as a SOFT skill** on this slide, and so is "plan your time".

### [W1b-S7] Exercise: soft or hard skills?
- ⭐ **In-class exercise.** The answers are printed on the slide in **bold blue**.
- "Determine which statements are true for describing soft skills, and which are true for hard skills."
  1. "Not related to a specific profession." → **Soft skills**
  2. "Take a long time and are difficult to develop. Mastering them requires a lot of analysis of your own and other people's behavior." → **Soft skills**
  3. "Relatively easy to obtain through training." → **Hard skills**
  4. "Mastery is revealed over time." → **Soft skills**
  5. "Are tied to a specific profession." → **Hard skills**
  6. "Can be confirmed here and now. You can get a certificate or diploma." → **Hard skills**
- Pattern: statements 1, 2 and 4 are **soft**; statements 3, 5 and 6 are **hard**. The full answer is worked in §5.

### [W1b-S8] AI-Augmented Analyst – Additional Skills
| New Skill | Why It Matters | How AI Helps Develop It |
|---|---|---|
| Prompt engineering | Communicate effectively with AI tools | Practice writing structured prompts for requirement extraction |
| AI output validation | Detect hallucinations, bias, and errors | Compare AI output to manual analysis; identify discrepancies |
| Data literacy | Understand data requirements for AI components | Ask AI: "What data would I need to build a predictive maintenance system?" |
| Ethical AI awareness | Identify bias, privacy, fairness issues | Use AI bias detection tools; prompt: "What biases could emerge in a hiring recommendation system?" |
| AI-tool orchestration | Chain multiple AI tools together | Use ChatGPT to generate requirements → Copilot to generate code → AI tester to generate tests |
| Model evaluation | Assess if an AI component is "good enough" | Ask AI: "What metrics would you use to evaluate a fraud detection model? Explain precision vs. recall." |

- The 6 new skills, in order: **P**rompt engineering · **A**I output validation · **D**ata literacy · **E**thical AI awareness · AI-tool **O**rchestration · **M**odel evaluation.
- 🔎 Look up in Track B: "precision vs. recall" and "hallucinations". The slide only names them.

### [W1b-S9] What Is an AI-Augmented Analyst?
- ⭐ Definition, with the bold part as on the slide:
  > "An AI-augmented analyst is a human analyst who **uses AI tools as cognitive partners** – not replaced by AI, but enhanced by it. The AI handles routine, pattern-based, or data-intensive tasks while the human focuses on judgment, creativity, ethics, and stakeholder interaction."
- **"Division of Labor: Human vs. AI"** (bold subheading):

| Task | Human Analyst | AI-Augmented Analyst (with AI) |
|---|---|---|
| Interview stakeholders | Conducts interview, reads body language | AI transcribes, summarizes, extracts requirements |
| Requirements prioritization | Makes final judgment | AI suggests priorities based on historical data |
| Feasibility analysis | Interprets business constraints | AI generates cost/time estimates from historical projects |
| Modeling (UML diagrams) | Reviews and corrects | AI generates draft diagrams from text |
| Documentation | Writes executive summaries | AI generates first draft, human polishes |
| Risk identification | Evaluates business/political risks | AI identifies technical risks from patterns |
| Ethical review | Makes ethical judgments | AI flags potential bias or privacy violations |

- Pattern in the table: the **human** judges, interprets, reviews and decides (final judgment, business/political risks, ethics). The **AI** drafts, estimates, transcribes, suggests and flags (from historical data and patterns).

### [W1b-S10] What Makes Design "AI-Aware"?
- ⭐ Definition, with the bold part as on the slide:
  > "AI-aware design means designing a system knowing that **AI components have unique characteristics** that affect object-oriented modeling."

| Traditional OO Assumption | AI Reality | Design Implication |
|---|---|---|
| Methods always produce same output for same input | AI models are probabilistic (different outputs possible) | Add confidence scores, allow retries |
| State is explicitly managed | AI models have internal state (weights, biases) that are not easily inspectable | Need model versioning, snapshotting |
| Errors are deterministic bugs | AI errors are statistical (false positives/negatives) | Add human-in-the-loop fallbacks |
| Performance is predictable | AI inference time varies (batch vs. real-time) | Design for async, caching, batching |
| Testing is exhaustive | Testing AI requires statistical validation (precision, recall, F1) | Add model evaluation pipelines |

### [W1b-S11] AI-Aware OO Design Patterns
| Pattern | Description | UML Representation |
|---|---|---|
| Model Wrapper | Class that encapsulates an AI model, hiding complexity | Class ChatbotModel with methods predict() and get_confidence() |
| Human-in-the-Loop | Class that routes low-confidence predictions to humans | Class ReviewQueue with escalate_to_human() |
| Model Version Manager | Class that handles switching between model versions | Class ModelRegistry with get_model(version) |
| Feature Store | Class that manages input features for AI models | Class FeatureStore with get_features(entity_id) |
| Drift Detector | Class that monitors model performance over time | Class DriftMonitor with check_drift() |

- ⚠️ On the slide the method names are broken by line-wraps: "get_conf idence()", "escalat e_to_human()", "get_m odel(version)", "get_fea tures(entity_id)", "check_ drift()". The correct names are given in the table above.
- How S10 links to S11 (matched by the slides' own words):
  - "Add confidence scores" → the Model Wrapper's get_confidence()
  - "Add human-in-the-loop fallbacks" → the **Human-in-the-Loop** pattern
  - "Need model versioning" → **Model Version Manager**
  - Monitoring "model performance over time" → **Drift Detector**

### [W1b-S12] SYSTEMS DEVELOPMENT METHODOLOGIES
- ⭐ Definition. The word "methodology" is in **bold + italic + underlined**, the strongest emphasis in the deck:
  > "A ***methodology*** is a formalized approach to implementing the SDLC (i.e., it is a list of steps and deliverables)."
- > "There are many different systems development methodologies, and each one is unique, based on the order and focus it places on each SDLC phase. Some methodologies are formal standards used by government agencies, whereas others have been developed by consulting firms to sell to clients."
- > "Many organizations have their own in-house developed methodologies that explain exactly how each phase of the SDLC is to be performed in that company. In other cases, methodologies are obtained from consulting firms for their clients to follow; provided by the vendor of the software to be installed; or mandated as a part of projects involving government agencies."
- **Where methodologies come from**, per the slide:
  1. formal standards used by government agencies
  2. developed by consulting firms to sell to clients
  3. in-house developed methodologies
  4. obtained from consulting firms for their clients to follow
  5. provided by the vendor of the software to be installed
  6. mandated as part of projects involving government agencies
- ⚠️ "consulting **fi rms**" → "firms"; "the **soft ware**" → "software". These are broken ligatures in the PDF.

### [W1b-S13] (no title) What categorizes methodologies
- ⭐ In **bold + underlined**, set as the heading:
  > "**Important factor in categorizing methodologies is the sequencing of the SDLC phases and the amount of time and effort devoted to each.**"
- ⭐ Also underlined:
  > "In the early days of computing, programmers did not understand the need for formal and well-planned life-cycle methodologies."
- > "They tended to move directly from a very simple planning phase right into the construction step of the implementation phase—in other words, from a very fuzzy, not-well-thought-out system request into writing code. This is the same approach that you sometimes use when writing programs for a programming class."
- The 2 categorizing factors: **(1) the sequencing of the SDLC phases**, and **(2) the time and effort devoted to each**.

### [W1b-S14] list of project characteristics that will affect the methodology selection decision.
- ⭐ Each label is in **bold**:
  - "**Clarity of User Requirements** How well do the users and analysts understand the functions and capabilities needed from the new system?"
  - "**Familiarity with Technology** How much experience does the project team have with the technology that will be used?"
  - "**System Complexity** How much complexity is anticipated in the new system? Does the new system include a wide array of features? Will the system have to integrate with many existing systems? Does it span multiple organizational units, or even multiple organizations?"
  - "**System Reliability** Will this system need to be highly reliable or is some downtime tolerable?"
  - "**Short Time Schedules** Is the project time frame tight?"
  - "**Schedule Visibility** Are the project sponsors, users, or organizational managers anxious [ˈaNG(k)SHəs] to see progress?"
- The professor added the pronunciation of "anxious", **[ˈaNG(k)SHəs]**, in grey.
- These 6 criteria are the rows of the "Which Methodology to Use?" table on W1b-S46; see §4.

### [W1b-S15] (no title) Software processes: standardization
- > "Software processes can be improved by process standardization where the diversity in software processes across an organization is reduced. This leads to improved communication and a reduction in training time, and makes automated process support more economical."
- **Diagram:** a box "Software processes" at the top. Two thick salmon-coloured arrows split downward to **"Plan-driven"** (left) and **"Agile"** (right). Between the two boxes sits an unlabelled light-blue wavy banner (flag) shape.
- **Benefits of process standardization** (3): improved communication · a reduction in training time · more economical automated process support.

### [W1b-S16] Plan-driven and agile processes
- ⭐ > "**Plan-driven processes** are processes where all of the process activities are planned in advance and progress is measured against this plan."
- ⭐ > "In **agile processes**, planning is incremental and it is easier to change the process to reflect changing customer requirements."
- > "In practice, most practical processes include elements of both plan-driven and agile approaches."
- ⭐ **"There are no right or wrong software processes."** This line is in bold on the slide and is a likely true/false item.

### [W1b-S17] Classes of Methodologies
- **Structured Development**
  - Waterfall Development
  - Parallel Development
- **Rapid Application Development**
  - Phased
  - Prototyping
- **Agile Development**
  - eXtreme Programming
  - SCRUM
- Trap: **Phased** and **Prototyping** belong to **RAD**, not to Structured or Agile. **Parallel** belongs to **Structured**.

### [W1b-S18] Structured Design
- > "The first category of systems development methodologies is called *structured design.* These methodologies became dominant in the 1980s, replacing the previous ad hoc and undisciplined approach. Structured design methodologies adopt a formal step-by-step approach to the SDLC that moves logically from one phase to the next."
- Facts to remember:
  - **first** category
  - dominant in the **1980s**
  - replaced the "**ad hoc and undisciplined**" approach
  - "**formal step-by-step**" and "moves logically from one phase to the next"

### [W1b-S19] The waterfall model
- > "The first published model of the software development process was derived from more general system engineering processes (Royce, 1970)."
- **Diagram:** five rounded boxes stepping down to the right like a staircase (a cascade): **Requirements Definition → System and Software Design → Implementation and Unit Testing → Integration and System Testing → Operation and Maintenance**. An arrow goes down from each box to the next. Along the bottom, a return line runs left from Operation and Maintenance, with upward arrows into each of the four earlier boxes, so there is feedback to earlier phases.
- To remember: the waterfall is the **first published** model, by **Royce, 1970**.

### [W1b-S20] (diagram only, no text) Waterfall development drawn with the SDLC phases
- **Diagram:** **Planning → Analysis → Design → Implementation → System**, stepping down to the right. Solid curved arrows go down from each phase to the next. Dashed wavy arrows go back up from Analysis to Planning, from Design to Analysis, and from Implementation to Design. The last, rounded box "System" is the delivered system, which appears only at the end.
- 🔎 Look up in Track B what the dashed wavy back-arrows stand for. The slide does not label them.

### [W1b-S21] (no title) Why it is called "waterfall"
- > "Because of the cascade from one phase to another, this model is known as the '**waterfall model**' or software life cycle. The waterfall model is an example of a plan-driven process—in principle, you must plan and schedule all of the process activities before starting work on them."
- ⭐ "waterfall model" is in bold.
- **Picture:** a house whose left half is a pencil sketch (the plan) and whose right half is the finished, built house. The idea is to plan everything first, then build.
- Key link: **waterfall = plan-driven**, because all activities are planned and scheduled **before** work starts.

### [W1b-S22] V-model
- > "The development process proceeds down the left-hand slope of the V, defining requirements and designing system components. At the base of the V, the code is written. On the upward-sloping right side of the model, testing of components, integration testing, and, finally, acceptance testing are performed."
- **Diagram** (a "V" shape):
  - **Left slope, going down** (solid arrows): **Analysis → Design → Implementation (coding)**. "Implementation (coding)" is at the bottom point of the V.
  - **Right slope, going up** (solid arrows): Implementation (coding) → **Unit testing → Integration testing → System testing → Acceptance testing**.
  - **Middle column:** four teal "test design" boxes. Dashed arrows run from the left side into them, and from them across to the matching test on the right:
    - **Analysis** ⇢ **Acceptance test design** ⇢ **Acceptance testing**
    - **Design** ⇢ **System test design** ⇢ **System testing**
    - **Design** ⇢ **Integration test design** ⇢ **Integration testing**
    - **Design** ⇢ **Unit test design** ⇢ **Unit testing**
  - Two large light-blue arrows show the direction of travel: one points **down** along the left slope, the other points **up** along the right slope.
- What the diagram shows: each test on the right is **designed earlier**, during Analysis or Design on the left. Acceptance tests come from Analysis; system, integration and unit tests come from Design.
- ⚠️ "left **–**hand" → "left-hand"; "**defi ning**" → "defining"; "**fi nally**" → "finally" (broken ligatures).

### [W1b-S23] Waterfall model problems
- ⭐ > "**Inflexible** partitioning of the project into distinct stages makes it difficult to respond to changing customer requirements."
  - > "Therefore, this model is only appropriate when the requirements are well-understood and changes will be fairly limited during the design process."
  - > "Few business systems have stable requirements."
- ⭐ > "The waterfall model is **mostly used for large systems engineering projects** where a system is developed at several sites."
  - > "In those circumstances, the plan-driven nature of the waterfall model helps coordinate the work."
- Waterfall summary from this slide:
  - **Problem:** inflexible, and it is hard to respond to changing requirements.
  - **Use it when** requirements are well understood and changes will be limited.
  - **Mostly used for** large systems engineering projects developed at **several sites**, where the plan-driven nature **helps coordinate** the work.

### [W1b-S24] Parallel Development
- ⭐ The term is in **bold italic**:
  > "***Parallel development*** methodology attempts to address the problem of long delays between the analysis phase and the delivery of the system. Instead of doing design and implementation in sequence, it performs a general design for the whole system and then divides the project into a series of distinct subprojects that can be designed and implemented in parallel. Once all subprojects are complete, the separate pieces are integrated and the system is delivered"
- > "The primary advantage of this methodology is that it can reduce the time to deliver a system; thus, there is less chance of changes in the business environment causing rework."
- How it works, step by step:
  1. Analysis
  2. A **general design** for the whole system
  3. The project is split into **distinct subprojects**
  4. Each subproject is designed and implemented **in parallel**
  5. The pieces are **integrated**
  6. The system is delivered
- **Problem it addresses:** long delays between analysis and delivery. **Primary advantage:** it reduces time to delivery, so there is less chance that business changes cause **rework**.
- ⚠️ The paragraph is missing its final full stop after "the system is delivered".

### [W1b-S25] A Parallel Development-based Methodology (diagram)
- **Diagram:** Planning → Analysis → **Design** (one general design for the whole system). From this Design, arrows lead into **three dotted ovals labelled "Subproject 1", "Subproject 2" and "Subproject 3"**. Each oval contains its own **Design → Implementation**. All three Implementation boxes point to one **Integration** box, which points to **System**.
- Dashed wavy back-arrows (as on S20) link each phase to the one before it, including from each subproject's Design back to the general Design.

### [W1b-S26] Rapid Application Development (RAD)
- > "A second category of methodologies includes rapid application development (RAD)-based methodologies. These are a newer class of systems development methodologies that emerged in the 1990s. RAD-based methodologies attempt to address both weaknesses of structured design methodologies by adjusting the SDLC phases to get some part of the system developed quickly and into the hands of the users. In this way, the users can better understand the system and suggest revisions that bring the system closer to what is needed."
- > "Most RAD-based methodologies recommend that analysts use special techniques and computer tools to speed up the analysis, design, and implementation phases, such as computer-aided software engineering (CASE) tools, joint application design (JAD) sessions, fourth-generation or visual programming languages that simplify and speed up programming (e.g., Visual Basic), and code generators that automatically produce programs from design specifications."
- Facts to remember:
  - **second** category
  - emerged in the **1990s**
  - goal: get **some part of the system** developed **quickly** and **into the hands of the users**, so that users understand it better and **suggest revisions**
- **RAD speed-up tools and techniques** (4):
  1. **CASE** tools (computer-aided software engineering)
  2. **JAD** sessions (joint application design)
  3. **fourth-generation or visual programming languages** (e.g., Visual Basic)
  4. **code generators** that produce programs from design specifications
- The slide says RAD addresses "**both weaknesses** of structured design" but does not list them. This deck's own hints are the "long delays between the analysis phase and the delivery of the system" [W1b-S24] and that it is "difficult to respond to changing customer requirements" [W1b-S23]. 🔎 Look up in Track B to confirm what the two weaknesses are.
- ⚠️ "computer**- **aided" (stray space) → "computer-aided".

### [W1b-S27] A Phased (iterative) Development-based Methodology
- > "A phased development-based methodology breaks an overall system into a series of versions that are developed sequentially. The analysis phase identifies the overall system concept, and the project team, users, and system sponsor then categorize the requirements into a series of versions. The most important and fundamental requirements are bundled into the first version of the system. The analysis phase then leads into design and implementation—but only with the set of requirements identified for version 1 Once version 1 is implemented, work begins on version 2. Additional analysis is performed based on the previously identified requirements and combined with new ideas and issues that arose from the users' experience with version 1. Version 2 then is designed and implemented, and work immediately begins on the next version. This process continues until the system is complete or is no longer in use."
- Step by step, from the slide:
  1. Analysis identifies the **overall system concept**.
  2. The project team, users and system sponsor **categorize the requirements into a series of versions**.
  3. The **most important and fundamental** requirements go into **version 1**.
  4. Design and implementation are done **only for version 1's requirements**.
  5. Once version 1 is implemented, work begins on **version 2**. Its analysis combines the previously identified requirements with **new ideas and issues from the users' experience with version 1**.
  6. Version 2 is designed and implemented, and work immediately begins on the next version.
  7. This continues "**until the system is complete or is no longer in use**".
- ⚠️ "identified for version 1 Once version 1" is missing a full stop → "version 1. Once version 1".

### [W1b-S28] (diagram only) Phased development
- **Diagram:**
  - Planning → **Analysis** (the overall analysis) → first dotted oval [**Analysis → Design → Implementation**] → **"System version 1"**.
  - A long curved arrow goes from System version 1 back into the second oval [Analysis → Design → Implementation] → **"System version 2"**.
  - A long arrow goes from System version 2 into the third oval [Analysis → Design → Implementation] → **"System version 3"**.
  - Wavy back-arrows link the phases inside each oval.
- What the diagram shows: each **delivered version feeds the analysis of the next version**. This matches S27: "new ideas and issues that arose from the users' experience with version 1".

### [W1b-S29] (no title) Approaches to the iterative model
- > "There are several approaches to the iterative model, the most popular of which are:"
  - "Incremental"
  - "Iterative"
  - "iterative-incremental"
- Context: this slide comes right after "A Phased **(iterative)** Development-based Methodology" [W1b-S27, S28]. The next slide [S30] shows the three approaches as pictures.

### [W1b-S30] (picture only) Iterative vs Incremental vs Iterative & Incremental: the Mona Lisa example
Three rows. Each starts with a stick figure who has an idea in a thought bubble, then shows how the painting gets made:
1. **Iterative**
   - Thought bubble: only a vague idea, "woman in pastoral setting".
   - Frames:
     1. a pencil outline of the **whole** picture
     2. the **whole** picture in rough, flat colours
     3. the finished Mona Lisa
   - So every version shows **the whole picture**, and each iteration **improves quality and detail**.
2. **Incremental**
   - Thought bubble: the **finished Mona Lisa**, so the idea is fully known in advance.
   - Frames:
     1. only the top part (head and background), already in **final quality**
     2. more added in final quality (the head plus the left part of the body, an L-shaped piece)
     3. the complete painting
   - So each step **adds a new, finished piece**, and the parts not built yet are simply missing.
3. **Iterative & Incremental**
   - Thought bubble: "woman in pastoral setting".
   - Six frames:
     1. a sketch with the face roughly coloured
     2. the face finished
     3. the body roughly coloured
     4. the body finished
     5. the background roughly coloured
     6. the complete painting
   - So pieces are **added** step by step (incremental), and each piece goes from **rough to finished** (iterative).
- ⭐ Likely exam distinction:
  - **iterative** = refine the whole thing again and again
  - **incremental** = add finished parts one at a time
  - **iterative-incremental** = both together

### [W1b-S31] Advantages (of phased development)
- > "Phased development–based methodologies have the advantage of **quickly getting a useful system into the hands of the users**. Although the system does not perform all the functions the users need at first, it does begin to provide business value sooner than if the system were delivered after completion, as is the case with the waterfall and parallel methodologies. Likewise, because users begin to work with the system sooner, they are more likely to identify important additional requirements sooner than with structured design situations."
- ⭐ The bold phrase on the slide is "quickly getting a useful system into the hands of the users".
- The 3 advantages:
  1. A **useful system reaches users quickly**.
  2. It **provides business value sooner** than waterfall and parallel, which deliver only "after completion".
  3. Users **identify important additional requirements sooner** than in structured design.

### [W1b-S32] Drawback (of phased development)
- > "The major drawback to phased development is that users begin to work with systems that are intentionally incomplete. It is critical to identify the most important and useful features and include them in the first version and to manage users' expectations along the way."
- What to remember:
  - **Drawback:** users work with "**intentionally incomplete**" systems.
  - **Remedy:** put the **most important and useful features in version 1**, and **manage users' expectations**.

### [W1b-S33] Prototyping
- > "A prototyping-based methodology performs the analysis, design, and implementation phases concurrently, and all three phases are performed repeatedly in a cycle until the system is completed. With these methodologies, the basics of analysis and design are performed, and work immediately begins on a system prototype, a quick-and-dirty program that provides a minimal amount of features."
- Keywords:
  - analysis, design and implementation run **concurrently**
  - they are **repeated in a cycle until the system is completed**
  - the **system prototype** is "a **quick-and-dirty** program that provides a **minimal amount of features**"

### [W1b-S34] (diagram only) Prototyping-based methodology
- **Diagram:**
  - **Planning** leads, by a solid arrow, into one **stacked block** containing **Analysis / Design / Implementation**, drawn together because they run at the same time. A dashed wavy arrow goes from the block back to Planning.
  - From the block, an arrow leads to a teal rounded box, **"System prototype"**.
  - From the System prototype, a line goes **back into the block** (into its Implementation row). This is the repeating cycle.
  - From the System prototype, another arrow leads to **Implementation → System**.
- What the diagram shows: the **system prototype itself leads on to the final Implementation and the System**. Compare the throwaway diagram on S39.

### [W1b-S35] Prototyping (definition and uses)
- ⭐ > "A **prototype** is an initial version of a system used to demonstrate concepts and try out design options."
- ⭐ > "A prototype can be used in:"
  - "The **requirements engineering** process to help with requirements elicitation and validation;"
  - "In **design** processes to explore options and develop a UI design;"
  - "In the **testing** process to run back-to-back tests."
- The 3 uses: **requirements engineering** (elicitation and validation) · **design** (explore options, UI design) · **testing** (back-to-back tests).
- 🔎 Look up in Track B: what "back-to-back tests" are. The slide does not explain.

### [W1b-S36] Benefits of prototyping
- "**Improved** system usability." (the first "Improved" is bold)
- "A closer match to users' real needs."
- "Improved design quality."
- "Improved maintainability."
- "Reduced development effort."
- Study aid (not on the slide): **U-N-Q-M-E** = **U**sability, users' **N**eeds, design **Q**uality, **M**aintainability, development **E**ffort.

### [W1b-S37] Prototype development
- > "May be based on rapid prototyping languages or tools"
- > "May involve leaving out functionality"
  - "Prototype should focus on areas of the product that are not well-understood;"
  - "Error checking and recovery may not be included in the prototype;"
  - "Focus on functional rather than non-functional requirements such as reliability and security"
- Key points: a prototype **leaves things out**, namely error checking and recovery, and **non-functional requirements such as reliability and security**. It **focuses on the parts that are not well understood**.

### [W1b-S38] Throwaway prototyping
- > "Throwaway prototyping-based methodologies are similar to prototyping-based methodologies in that they include the development of prototypes; however, throwaway prototypes are done at a different point in the SDLC. These prototypes are used for a very different purpose than those previously discussed, and they have a very different appearance"
- ⭐ > "Prototypes should be discarded after development as **they are not a good** basis for a production system:" ("they are not a good" is in **red**)
  - "It may be impossible to tune the system to meet non-functional requirements;"
  - "Prototypes are normally undocumented;"
  - "The prototype structure is usually degraded through rapid change;"
  - "The prototype probably will not meet normal organizational quality standards."
- **4 reasons to throw the prototype away:**
  1. it may be impossible to tune it to meet **non-functional requirements**
  2. it is **undocumented**
  3. its **structure is degraded** by rapid change
  4. it probably **won't meet organizational quality standards**
- The slide says throwaway prototypes are made "at a different point in the SDLC", for "a very different purpose", with "a very different appearance", but does not spell these out. The S39 diagram shows *where* they happen. 🔎 Look up in Track B for the purpose and appearance in detail.
- ⚠️ The first paragraph is missing its final full stop after "appearance".

### [W1b-S39] A Throwaway Prototyping–based Methodology (diagram)
- **Diagram:**
  - **Planning → Analysis →** a **stacked block of Analysis / Design / Implementation**.
  - From the block's Design row, an arrow leads to a rounded box, **"Design prototype"**. From the Design prototype, a line **loops back** into the block's Implementation row.
  - From the block's Analysis row, a separate arrow leads to a proper **Design → Implementation → System** path.
  - Dashed wavy back-arrows link the phases (Analysis → Planning, the block → Analysis, Implementation → Design).
- ⭐ **Compare S34 with S39:**

| | Prototyping [S34] | Throwaway prototyping [S39] |
|---|---|---|
| What the prototype is called | "System prototype" | "Design prototype" |
| Where the prototype leads | Straight on to Implementation → **System** | Only loops back into the A/D/I block. The real system is built through a **separate Design → Implementation → System** path |
| Reading | The prototype grows into the system | The prototype is used and then **discarded** (S38: "not a good basis for a production system") |

### [W1b-S40] Agile Development
- > "*Agile development* is a group of programming-centric methodologies that focus on streamlining the SDLC. Much of the modeling and documentation overhead is eliminated; instead, face-to-face communication is preferred. A project emphasizes simple, iterative application development in which every iteration is a complete software project, including planning, requirements analysis, design, coding, testing, and documentation. Cycles are kept short (1–4 weeks), and the development team focuses on adapting to the current business environment."
- Key points:
  - **programming-centric**
  - **streamlining** the SDLC
  - much of the **modeling and documentation overhead is eliminated**
  - **face-to-face communication** is preferred
  - **every iteration is a complete software project** (planning, requirements analysis, design, coding, testing, documentation)
  - **cycles of 1–4 weeks**
  - the team adapts to the **current business environment**
- ⚠️ The slide reads "a complete **soft ware** project", a broken ligature → "software".

### [W1b-S41] Agile Development: Agile manifesto
- ⭐ **"Agile manifesto"** is a bold subheading; the manifesto text is in italics.
  > *"We are uncovering better ways of developing software by doing it and helping others do it. Through this work we have come to value:"*
  > *"Individuals and interactions over processes and tools Working software over comprehensive documentation **Customer collaboration** over contract negotiation Responding to change over following a plan"*
  > *"That is, while there is value in the items on the right, we value the items on the left more."*
- ⭐ **"Customer collaboration" is in red.**
- The 4 values, laid out:

| Valued MORE (left) | over | Valued less (right, "there is value" in these too) |
|---|---|---|
| Individuals and interactions | over | processes and tools |
| Working software | over | comprehensive documentation |
| ⭐ **Customer collaboration** | over | contract negotiation |
| Responding to change | over | following a plan |

- ⚠️ Glitches on the slide: two small "L/SEP" boxes (line-separator characters) appear in the text, before "software" and before "Through". The four values also run together in one bullet with no line breaks.

### [W1b-S42] (no title) Agile principles, part 1
- "Software is delivered early and continuously through the development process, satisfying the customer."
- "Changing requirements are embraced regardless of when they occur in the development process."
- "Working software is delivered frequently to the customer."
- "Customers and developers work together to solve the business problem."
- "Motivated individuals create solutions; provide them the tools and environment they need and trust them to deliver."
- "Face-to-face communication within the development team is the most efficient and effective method of gathering requirements."

### [W1b-S43] (no title) Agile principles, part 2
- "The primary measure of progress is working, executing software."
- "Both customers and developers should work at a pace that is sustainable. That is, the level of work could be maintained indefinitely without any worker burnout."
- "Agility is heightened through attention to both technical excellence and good design."
- "Simplicity, the avoidance of unnecessary work, is essential."
- "Self-organizing teams develop the best architectures, requirements, and designs."
- "Development teams regularly reflect on how to improve their development processes."
- Across S42 and S43 there are **12 principles**. Useful one-liners:
  - the primary **measure of progress = working, executing software**
  - **sustainable pace** = could be "maintained indefinitely without any worker burnout"
  - **simplicity** = "the avoidance of unnecessary work"
  - **face-to-face** = "the most efficient and effective method of gathering requirements"

### [W1b-S44] Typical Agile Development Methodology (diagram)
- **Diagram:**
  - One **stacked block** containing all four phases, **Planning / Analysis / Design / Implementation**, done together within one cycle.
  - An arrow leaves the bottom of the block and goes up into the rounded box **"System"**.
  - From System, an arrow goes back over the top and down into the block's **Planning** row.
- So the cycle **repeats**, and each loop produces a system. This matches S40: "every iteration is a complete software project".

### [W1b-S45] How AI Itself Enables Better Methodologies
| AI-Enhanced Methodology | What It Means | Example |
|---|---|---|
| AI-Augmented Agile | AI assists in sprint planning, story estimation, backlog prioritization | Jira with AI predicts which stories will miss the sprint |
| MLOps (Machine Learning Operations) | DevOps adapted for ML models – version data, models, code together | DVC (Data Version Control), MLflow |
| LLM-Driven Development | Use large language models to generate code, tests, documentation | GitHub Copilot, Cursor, Windsurf |
| Automated Methodology Selection | AI analyzes project parameters and recommends methodology | Prompt: *"Based on team size=5, unclear requirements, high risk, recommend methodology"* |

- ⚠️ On the slide the last prompt is wrapped in literal asterisks, `*"…"*`. These are leftover Markdown italics markers.
- 🔎 Look up in Track B: DevOps, sprint, backlog and story. The slide uses these words but does not define them.

### [W1b-S46] Which Methodology to Use?
- ⭐ This is the **decision table**. The colours on the slide are **Poor = red**, **Good = dark blue**, **Excellent = green**.

| Usefulness for | Waterfall | Parallel | Phased | Prototyping | Throwaway Prototyping | Extreme Programming |
|---|---|---|---|---|---|---|
| **Unclear user requirements** | Poor | Poor | Good | **Excellent** | **Excellent** | **Excellent** |
| **Unfamiliar technology** | Poor | Poor | Good | Poor | **Excellent** | Poor |
| **Complex systems** | Good | Good | Good | Poor | **Excellent** | Poor |
| **Reliable systems** | Good | Good | Good | Poor | **Excellent** | Good |
| **Short time schedule** | Poor | Good | **Excellent** | **Excellent** | Good | **Excellent** |
| **Schedule visibility** | Poor | Poor | **Excellent** | **Excellent** | Good | Good |

- **Reading the table by column** (counts read straight off the slide):
  - **Waterfall:** Good only for complex and reliable systems; Poor ×4.
  - **Parallel:** same as Waterfall, except **Good for a short time schedule**; Poor ×3.
  - **Phased:** **never Poor**. Good ×4, Excellent for **short time schedule** and **schedule visibility**.
  - **Prototyping:** Excellent for unclear requirements, short schedule and schedule visibility. **Poor for unfamiliar technology, complex and reliable systems.**
  - **Throwaway prototyping:** **Excellent ×4** (unclear requirements, unfamiliar technology, complex, reliable) and Good ×2; **never Poor**.
  - **Extreme Programming:** Excellent for unclear requirements and short schedule; Good for reliable systems and schedule visibility; **Poor for unfamiliar technology and complex systems**.
- **Reading the table by row** (the best choice per characteristic):
  - **Unclear requirements** → Prototyping, Throwaway, XP.
  - **Unfamiliar technology** → only Throwaway is Excellent; Phased is Good.
  - **Complex** → Throwaway is Excellent; Waterfall, Parallel and Phased are Good.
  - **Reliable** → Throwaway is Excellent; Waterfall, Parallel, Phased and XP are Good.
  - **Short schedule** → Phased, Prototyping, XP; only Waterfall is Poor.
  - **Schedule visibility** → Phased, Prototyping.
- The rows are the 6 characteristics of W1b-S14, reworded: "Clarity of User Requirements" → "Unclear user requirements", "Familiarity with Technology" → "Unfamiliar technology", and so on.
- The **V-model and Scrum are not rated** in this table.

### [W1b-S47] Key Takeaways
- ⭐ This is the deck's summary of learning outcomes.

| Learning Outcome | How AI Helped Achieve It |
|---|---|
| Compare system development methodologies | AI generated side-by-side comparisons and case study matches |
| Understand methodology evolution for AI projects | AI explained why traditional methodologies fail and introduced MLOps |
| Identify skills of a modern analyst | AI generated job descriptions and skill assessments |
| Articulate the AI-augmented analyst role | AI demonstrated before/after time savings and task division |
| Design basic AI-aware object-oriented systems | AI generated UML diagrams and explained AI-specific design patterns |
| Distinguish traditional OO from AI-aware OO | AI transformed traditional diagrams into AI-aware versions |

- The left column is effectively the **list of things you should be able to do** after this lecture. They map to:
  - compare methodologies → S12–S46
  - methodology evolution for AI projects → S45
  - modern analyst skills → S6–S8
  - the AI-augmented analyst → S9
  - AI-aware OO design → S10–S11

### [W1b-S48] The end.
- The only text is "The end." The slides after it are extra material.

### [W1b-S49] (blank slide)
- Empty: no text and no picture, only the footer. Checked in the PDF: there is nothing in the slide body.

### [W1b-S50] (blank slide)
- Empty: no text and no picture. Checked in the PDF.

### [W1b-S51] (blank slide)
- Empty: no text and no picture. Checked in the PDF.

### [W1b-S52] (blank slide)
- Empty: no text and no picture. Checked in the PDF.

### [W1b-S53] (blank slide)
- Empty: no text and no picture. Checked in the PDF.

### [W1b-S54] Extreme programming
- > "Perhaps the best-known and most widely used agile method."
- ⭐ > "**Extreme Programming (XP)** takes an 'extreme' approach to iterative development." ("Extreme Programming (XP)" is in **red**)
  - "New versions may be built **several times per day**;" (red)
  - "Increments are delivered to customers **every 2 weeks**;" (red)
  - "All tests must be run for every build and the build is only accepted if tests run successfully."
- ⭐ Numbers to memorize:
  - builds: **several times per day**
  - increments to customers: **every 2 weeks**
  - **all tests on every build**; a build is accepted **only if the tests run successfully**

### [W1b-S55] XP and Agile principles
- ⭐ The red phrases are marked **in bold** below:
  - "**Incremental development** is supported through small, frequent system releases."
  - "**Customer involvement** means full-time customer engagement with the team."
  - "People not process through **pair programming**, collective ownership and a process that avoids long working hours."
  - "Change supported through regular system releases."
  - "**Maintaining simplicity** through constant refactoring of code."
- Matching pairs to remember:

| Principle | How XP supports it |
|---|---|
| Incremental development | small, frequent system releases |
| Customer involvement | full-time customer engagement with the team |
| People not process | pair programming, collective ownership, no long working hours |
| Change | regular system releases |
| Maintaining simplicity | constant refactoring of code |

- 🔎 Look up in Track B: what "pair programming", "collective ownership" and "refactoring" mean in practice.

### [W1b-S56] Scrum
- > "Scrum is a term that is well known to rugby fans. In rugby, a scrum is used to restart a game. In a nutshell, the creators of the Scrum method believe that no matter how much you plan, as soon as the software begins to be developed, chaos breaks out and the plans go out the window. The best you can do is to react to where the proverbial rugby ball squirts out. You then sprint with the ball until the next scrum. In the case of the Scrum methodology, a sprint lasts thirty working days. At the end of the sprint, a system is delivered to the customer."
- Key points:
  - The name comes from **rugby**, where a scrum restarts a game.
  - The belief behind it: "no matter how much you plan … **chaos breaks out and the plans go out the window**".
  - You react, then **sprint** until the next scrum.
  - ⭐ A **sprint lasts thirty working days**.
  - At the **end of each sprint, a system is delivered** to the customer.
- ⚠️ The numbers differ between slides: Agile cycles are "kept short (**1–4 weeks**)" [S40], XP increments come "**every 2 weeks**" [S54], and a Scrum sprint is "**thirty working days**" [S56]. Learn each number with its own method. 🔎 Look up in Track B the usual Scrum sprint length.

### [W1b-S57] Rolling Wave Planning (image only, no extractable text)
- **Picture**, titled **"Rolling Wave Planning"**:
  - A large **green arc** spans the whole project, labelled **"Project Perspective — High Level / Not Detailed"**.
  - Below it, **red arcs**, one over each phase, labelled **"Stage Perspective — Mid Level / Semi Detailed"**.
  - Along the bottom, a chain of many small **blue loops**, labelled **"Short Term Perspective — Weekly / Monthly Plans"**.
  - A timeline divided into **Phase 1 | Phase 2 | Phase 3 | Phase 4**. Phase 1 is the shortest and Phase 4 the longest.
  - A banner across the bottom: **"Planning is Throughout the Project - Not a Stage"**.
- What it shows: planning happens at **3 levels**. There is one high-level project plan, mid-level stage plans, and many short weekly or monthly plans, and planning continues for the **whole project**. This extends the "About plans" slide [W1b-S5] (high-level plan vs low-level plans) and S4 ("only high-level plan may be developed" at first; "Low-level planning should be done regularly").

---

## 3. Definitions & key terms (word-for-word from the slides)

### 3.1 System and SDLC
| Term | Definition, verbatim | Ref |
|---|---|---|
| **System** (word origin) | "The word System is derived from Greek word Systema, which means an organized relationship between any set of components to achieve some common cause or objective." | W1a-S7 |
| ⭐ **System** | "an orderly grouping of interdependent components linked together according to a plan to achieve a specific goal." | W1a-S7 |
| ⭐ **Constraints of a System** | "A system must have three basic constraints − A system must have some structure and behavior which is designed to achieve a predefined objective. Interconnectivity and interdependence must exist among the system components. The objectives of the organization have a higher priority than the objectives of its subsystems." | W1a-S7 |
| ⭐ **SDLC** (definition 1) | "The Systems Development Life Cycle (SDLC) is the process of understanding how an information system (IS) can support business needs by designing a system, building it, and delivering it to users." | W1a-S8 |
| **SDLC** (definition 2, hidden white text) | "The Systems Development Life Cycle (SDLC), or Software Development Life Cycle in systems engineering, information systems and software engineering, is the process of creating or altering systems, and the models and methodologies that people use to develop these systems." | W1a-S8 |
| **SDLC phases** | "Planning", "Analysis", "Design", "Implementation" | W1a-S9 |
| **Planning** | "the initial stage in which key business needs supposed to be identified and development methodologies are chosen." | W1b-S4 |
| **Analysis** | "is the second, probably, the key phase is aimed on user (or business) requirements gathering and requirements elicitation." | W1b-S4 |
| **Design** | "the third phase when business requirements supposed to be transformed in to form of system requirements. And architecture of the system including subsystems should be prepared." | W1b-S4 |
| **Implementation** (or Development) | "phase should include writing the source code, testing and deployment or delivering to end-users." | W1b-S4 |
| **Post Production** | "Last fifth stage is Post Production phase includes maintenance. This is probably the longest phase in SDLC includes continues user training and improvements of the system." | W1b-S4 |
| **Feasibility analysis** (types) | "Technical feasibility", "Economic feasibility", "Organizational feasibility" | W1a-S10 |
| **Primary outputs** by phase | Planning: "System Request with feasibility study", "Project plan" · Analysis: "System proposal" · Design: "System specification" · Implementation: "Installed system" | W1a-S11, S13, S15, S17 |
| **Phase focus** questions | Planning: "Why build this system? How to structure the project?" · Analysis: "Who, what, where, and when for this system?" · Design: "How will this system work?" · Implementation: "delivery and support of completed system" | W1a-S11, S13, S15, S17 |

### 3.2 Skills and the analyst
| Term | Definition, verbatim | Ref |
|---|---|---|
| **Skill** | "the ability to do something well." | W1b-S6 |
| ⭐ **Hard skills** | "professional skills that can be measured, assessed and verified. Hard skills can be confirmed by a specific action, certificate, portfolio." | W1b-S6 |
| ⭐ **Soft skills** | "a person's socio-psychological or personal skills that do not depend on the profession." | W1b-S6 |
| **System Analyst** | "The System Analyst is the key person": "Designs a system to add value", "Must understand the business processes", "Job is rewarding, yet challenging", "Requires specific skill sets" | W1a-S4 |
| **Systems analyst** (responsibilities) | "Identifying how technology can improve business processes", "Designing the new business processes", "Designing the information system", "Ensuring that the system conforms to information systems standards" | W1a-S3 |
| ⭐ **AI-augmented analyst** | "a human analyst who uses AI tools as cognitive partners – not replaced by AI, but enhanced by it. The AI handles routine, pattern-based, or data-intensive tasks while the human focuses on judgment, creativity, ethics, and stakeholder interaction." | W1b-S9 |
| ⭐ **AI-aware design** | "designing a system knowing that AI components have unique characteristics that affect object-oriented modeling." | W1b-S10 |
| **Model Wrapper** | "Class that encapsulates an AI model, hiding complexity" | W1b-S11 |
| **Human-in-the-Loop** | "Class that routes low-confidence predictions to humans" | W1b-S11 |
| **Model Version Manager** | "Class that handles switching between model versions" | W1b-S11 |
| **Feature Store** | "Class that manages input features for AI models" | W1b-S11 |
| **Drift Detector** | "Class that monitors model performance over time" | W1b-S11 |

### 3.3 Methodologies and processes
| Term | Definition, verbatim | Ref |
|---|---|---|
| ⭐⭐ **Methodology** | "A methodology is a formalized approach to implementing the SDLC (i.e., it is a list of steps and deliverables)." | W1b-S12 |
| ⭐ **Categorizing factor** | "Important factor in categorizing methodologies is the sequencing of the SDLC phases and the amount of time and effort devoted to each." | W1b-S13 |
| **Process standardization** | "Software processes can be improved by process standardization where the diversity in software processes across an organization is reduced. This leads to improved communication and a reduction in training time, and makes automated process support more economical." | W1b-S15 |
| ⭐ **Plan-driven processes** | "processes where all of the process activities are planned in advance and progress is measured against this plan." | W1b-S16 |
| ⭐ **Agile processes** | "In agile processes, planning is incremental and it is easier to change the process to reflect changing customer requirements." | W1b-S16 |
| **High-level vs low-level planning** | "Plan-Driven methodology used for high-level planning and Agile methodologies for low-level planning." | W1b-S5 |
| **Rolling Wave Planning** | Picture labels: "Project Perspective — High Level / Not Detailed", "Stage Perspective — Mid Level / Semi Detailed", "Short Term Perspective — Weekly / Monthly Plans", "Planning is Throughout the Project - Not a Stage" | W1b-S57 |
| **Structured design** | "The first category of systems development methodologies is called structured design. These methodologies became dominant in the 1980s, replacing the previous ad hoc and undisciplined approach. Structured design methodologies adopt a formal step-by-step approach to the SDLC that moves logically from one phase to the next." | W1b-S18 |
| **Waterfall model** | "Because of the cascade from one phase to another, this model is known as the 'waterfall model' or software life cycle. The waterfall model is an example of a plan-driven process—in principle, you must plan and schedule all of the process activities before starting work on them." | W1b-S21 |
| **First published model** | "The first published model of the software development process was derived from more general system engineering processes (Royce, 1970)." | W1b-S19 |
| **V-model** | "The development process proceeds down the left-hand slope of the V, defining requirements and designing system components. At the base of the V, the code is written. On the upward-sloping right side of the model, testing of components, integration testing, and, finally, acceptance testing are performed." | W1b-S22 |
| ⭐ **Parallel development** | "Parallel development methodology attempts to address the problem of long delays between the analysis phase and the delivery of the system. Instead of doing design and implementation in sequence, it performs a general design for the whole system and then divides the project into a series of distinct subprojects that can be designed and implemented in parallel." | W1b-S24 |
| **RAD** (Rapid Application Development) | "A second category of methodologies includes rapid application development (RAD)-based methodologies. These are a newer class of systems development methodologies that emerged in the 1990s. RAD-based methodologies attempt to address both weaknesses of structured design methodologies by adjusting the SDLC phases to get some part of the system developed quickly and into the hands of the users." | W1b-S26 |
| **CASE / JAD** | "computer-aided software engineering (CASE) tools", "joint application design (JAD) sessions" | W1b-S26 |
| **Phased development-based methodology** | "A phased development-based methodology breaks an overall system into a series of versions that are developed sequentially." | W1b-S27 |
| **Approaches to the iterative model** | "Incremental", "Iterative", "iterative-incremental" | W1b-S29 |
| **Prototyping-based methodology** | "A prototyping-based methodology performs the analysis, design, and implementation phases concurrently, and all three phases are performed repeatedly in a cycle until the system is completed." | W1b-S33 |
| **System prototype** | "a quick-and-dirty program that provides a minimal amount of features." | W1b-S33 |
| ⭐ **Prototype** | "A prototype is an initial version of a system used to demonstrate concepts and try out design options." | W1b-S35 |
| **Throwaway prototyping** | "Throwaway prototyping-based methodologies are similar to prototyping-based methodologies in that they include the development of prototypes; however, throwaway prototypes are done at a different point in the SDLC." | W1b-S38 |
| **Agile development** | "Agile development is a group of programming-centric methodologies that focus on streamlining the SDLC." | W1b-S40 |
| ⭐ **Agile manifesto** | "Individuals and interactions over processes and tools / Working software over comprehensive documentation / Customer collaboration over contract negotiation / Responding to change over following a plan. That is, while there is value in the items on the right, we value the items on the left more." | W1b-S41 |
| ⭐ **Extreme Programming (XP)** | "Perhaps the best-known and most widely used agile method. Extreme Programming (XP) takes an 'extreme' approach to iterative development." | W1b-S54 |
| **Scrum / sprint** | "In rugby, a scrum is used to restart a game." … "In the case of the Scrum methodology, a sprint lasts thirty working days. At the end of the sprint, a system is delivered to the customer." | W1b-S56 |
| **MLOps** | "MLOps (Machine Learning Operations)": "DevOps adapted for ML models – version data, models, code together" | W1b-S45 |
| **AI-Augmented Agile** | "AI assists in sprint planning, story estimation, backlog prioritization" | W1b-S45 |
| **LLM-Driven Development** | "Use large language models to generate code, tests, documentation" | W1b-S45 |
| **Automated Methodology Selection** | "AI analyzes project parameters and recommends methodology" | W1b-S45 |

---

## 4. Comparison tables

### 4.1 The three classes of methodologies [W1b-S17]
| Class | Members (S17) | Era | Core idea, in the slide's words |
|---|---|---|---|
| **Structured Development** | Waterfall Development · Parallel Development | "became dominant in the 1980s, replacing the previous ad hoc and undisciplined approach" [S18] | "formal step-by-step approach to the SDLC that moves logically from one phase to the next" [S18] |
| **Rapid Application Development** | Phased · Prototyping | "emerged in the 1990s" [S26] | "adjusting the SDLC phases to get some part of the system developed quickly and into the hands of the users" [S26] |
| **Agile Development** | eXtreme Programming · SCRUM | not given on the slides | "programming-centric methodologies that focus on streamlining the SDLC" [S40] |

### 4.2 Methodology by methodology: how it works, pros, cons, when to use (slide wording only)
| Methodology (class) | How it works | Pros (slides) | Cons / problems (slides) | When to use (slides) |
|---|---|---|---|---|
| **Waterfall** (Structured) | Phases follow each other in a "cascade from one phase to another". "You must plan and schedule all of the process activities before starting work on them" [S21]. Diagrams: Requirements Definition → System and Software Design → Implementation and Unit Testing → Integration and System Testing → Operation and Maintenance [S19]; Planning → Analysis → Design → Implementation → System [S20] | "The plan-driven nature of the waterfall model helps coordinate the work" [S23] | "**Inflexible** partitioning of the project into distinct stages makes it difficult to respond to changing customer requirements". "Few business systems have stable requirements" [S23]. The system is "delivered after completion", so business value comes later than with phased [S31] | "Only appropriate when the requirements are well-understood and changes will be fairly limited during the design process". "**Mostly used for large systems engineering projects** where a system is developed at several sites" [S23] |
| **V-model** (shown among the waterfall slides) | "Proceeds down the left-hand slope of the V, defining requirements and designing system components. At the base of the V, the code is written. On the upward-sloping right side … testing of components, integration testing, and, finally, acceptance testing" [S22]. Acceptance test design comes from Analysis; system, integration and unit test designs come from Design | not stated on the slides | not stated on the slides | not stated on the slides. 🔎 Look up in Track B |
| **Parallel** (Structured) | "Performs a general design for the whole system and then divides the project into a series of distinct subprojects that can be designed and implemented in parallel. Once all subprojects are complete, the separate pieces are integrated and the system is delivered" [S24, diagram S25] | "**Can reduce the time to deliver a system**; thus, there is less chance of changes in the business environment causing rework" [S24] | Still "delivered after completion, as is the case with the waterfall and parallel methodologies" [S31] | Designed for "the problem of long delays between the analysis phase and the delivery of the system" [S24] |
| **Phased** (RAD) | "Breaks an overall system into a series of versions that are developed sequentially". The most important requirements go into version 1, and each next version adds "new ideas and issues that arose from the users' experience" [S27, diagram S28] | "**Quickly getting a useful system into the hands of the users**". It begins "to provide business value sooner", and users "identify important additional requirements sooner" [S31] | "Users begin to work with systems that are **intentionally incomplete**". It is "critical to identify the most important and useful features … and to manage users' expectations" [S32] | S46: Excellent for short time schedule and schedule visibility, Good for everything else, never Poor |
| **Prototyping** (RAD) | Analysis, design and implementation are performed "concurrently" and "repeatedly in a cycle until the system is completed". A "system prototype" is "a quick-and-dirty program that provides a minimal amount of features" [S33, diagram S34] | "Improved system usability. A closer match to users' real needs. Improved design quality. Improved maintainability. Reduced development effort." [S36] | Prototype development "may involve leaving out functionality"; "error checking and recovery may not be included"; it focuses on "functional rather than non-functional requirements such as reliability and security" [S37] | S46: Excellent for unclear requirements, short schedule and schedule visibility. Poor for unfamiliar technology, complex systems and reliable systems |
| **Throwaway prototyping** | "Similar to prototyping-based methodologies"; prototypes are "done at a different point in the SDLC", for "a very different purpose", with "a very different appearance" [S38]. Diagram: a Design prototype loops inside the A/D/I block, then a separate Design → Implementation → System path follows [S39] | (S46 ratings) Excellent for unclear requirements, unfamiliar technology, complex and reliable systems | Prototypes must be **discarded** as "they are not a good basis for a production system". They may be impossible to tune for non-functional requirements; they are undocumented; their structure is degraded; they won't meet quality standards [S38] | S46: the only methodology that is Excellent for **unfamiliar technology**; never Poor |
| **Agile** (general) | "Programming-centric"; "much of the modeling and documentation overhead is eliminated"; "face-to-face communication is preferred"; "every iteration is a complete software project"; "Cycles are kept short (1–4 weeks)" [S40, diagram S44] | The manifesto [S41] and the 12 principles [S42–S43], e.g. "Software is delivered early and continuously"; "Changing requirements are embraced" | not stated on the slides | 🔎 Look up in Track B. S46 rates only XP |
| **XP** (Agile) | "New versions may be built several times per day"; "Increments are delivered to customers every 2 weeks"; "All tests must be run for every build and the build is only accepted if tests run successfully" [S54] | "Perhaps the best-known and most widely used agile method" [S54]; the principles on S55 | (S46) Poor for unfamiliar technology and complex systems | S46: Excellent for unclear requirements and short time schedule; Good for reliable systems and schedule visibility |
| **Scrum** (Agile) | "React to where the proverbial rugby ball squirts out … sprint with the ball until the next scrum"; "a sprint lasts thirty working days"; "At the end of the sprint, a system is delivered to the customer" [S56] | not stated on the slides | not stated on the slides | not rated in S46. 🔎 Look up in Track B |

### 4.3 ⭐ "Which methodology to use?": the criteria [W1b-S14] matched to the ratings [W1b-S46]
| S14 characteristic and the slide's question | S46 row | **Excellent** | Good | Poor |
|---|---|---|---|---|
| **Clarity of User Requirements**: "How well do the users and analysts understand the functions and capabilities needed from the new system?" | Unclear user requirements | **Prototyping, Throwaway, XP** | Phased | Waterfall, Parallel |
| **Familiarity with Technology**: "How much experience does the project team have with the technology that will be used?" | Unfamiliar technology | **Throwaway** | Phased | Waterfall, Parallel, Prototyping, XP |
| **System Complexity**: "How much complexity is anticipated in the new system? …" | Complex systems | **Throwaway** | Waterfall, Parallel, Phased | Prototyping, XP |
| **System Reliability**: "Will this system need to be highly reliable or is some downtime tolerable?" | Reliable systems | **Throwaway** | Waterfall, Parallel, Phased, XP | Prototyping |
| **Short Time Schedules**: "Is the project time frame tight?" | Short time schedule | **Phased, Prototyping, XP** | Parallel, Throwaway | Waterfall |
| **Schedule Visibility**: "Are the project sponsors, users, or organizational managers anxious to see progress?" | Schedule visibility | **Phased, Prototyping** | Throwaway, XP | Waterfall, Parallel |

- **How to answer a "which methodology?" scenario using only this table** (a study method, not on the slide):
  1. Mark which of the 6 characteristics the scenario mentions.
  2. Cross out every methodology rated **Poor** on any marked row.
  3. From what is left, choose the one with the most **Excellent** ratings on the marked rows.
- Patterns worth remembering:
  - **Throwaway prototyping** and **Phased** are **never Poor**.
  - **Waterfall** is Good only for complex and reliable systems.
  - **Prototyping** is Poor exactly where Throwaway is strongest: unfamiliar technology, complex systems and reliable systems.

### 4.4 Plan-driven vs Agile
| Aspect | Plan-driven | Agile | Ref |
|---|---|---|---|
| Definition | "all of the process activities are planned in advance and progress is measured against this plan" | "planning is incremental and it is easier to change the process to reflect changing customer requirements" | W1b-S16 |
| Level of planning | "used for high-level planning" | "for low-level planning" | W1b-S5 |
| Example on the slides | Waterfall: "an example of a plan-driven process" | Agile Development: XP and SCRUM | W1b-S21, S17 |
| Attitude to the plan | "you must plan and schedule all of the process activities before starting work on them" | "Responding to change over following a plan". Scrum: "no matter how much you plan … the plans go out the window" | W1b-S21, S41, S56 |
| Changing requirements | Waterfall: "difficult to respond to changing customer requirements" | "Changing requirements are embraced regardless of when they occur in the development process." | W1b-S23, S42 |
| Documentation | not stated | "Much of the modeling and documentation overhead is eliminated"; "Working software over comprehensive documentation" | W1b-S40, S41 |
| Where it helps | "large systems engineering projects where a system is developed at several sites"; it "helps coordinate the work" | "adapting to the current business environment" | W1b-S23, S40 |
| ⭐ In practice | "most practical processes include elements of both plan-driven and agile approaches." **"There are no right or wrong software processes."** | (same) | W1b-S16 |
| Planning over time | Rolling Wave: a high-level project plan, then stage plans, then weekly or monthly plans. "Planning is Throughout the Project - Not a Stage" | (same) | W1b-S57 |

### 4.5 Iterative vs Incremental vs Iterative-incremental [W1b-S29, S30]
| Approach | Idea at the start (thought bubble) | What each version looks like (Mona Lisa frames) |
|---|---|---|
| **Iterative** | vague: "woman in pastoral setting" | the **whole** picture every time: sketch → rough colours → finished |
| **Incremental** | complete: the finished Mona Lisa | **finished pieces added**: top part → top + part of body → whole |
| **Iterative & Incremental** | vague: "woman in pastoral setting" | pieces added **and** each refined: face rough → face done → body rough → body done → background → whole |

### 4.6 Prototyping vs Throwaway prototyping [W1b-S33–S39]
| | Prototyping | Throwaway prototyping |
|---|---|---|
| What the prototype is | "System prototype", "a quick-and-dirty program that provides a minimal amount of features" [S33, S34] | "Design prototype" [S39]; "done at a different point in the SDLC … very different purpose … very different appearance" [S38] |
| What happens to it | It leads on to Implementation → System [S34] | It is **discarded**, "not a good basis for a production system" [S38]; the system is built through a separate Design → Implementation path [S39] |
| S46 strengths | Unclear requirements, short schedule, schedule visibility | Unclear requirements, unfamiliar technology, complex systems, reliable systems |
| S46 weaknesses | Poor for unfamiliar technology, complex systems, reliable systems | never Poor (Good for short schedule and schedule visibility) |

### 4.7 SDLC in the two decks: 4 phases [W1a] vs 5 phases [W1b-S4]
| Phase | W1a (S10–S17) | W1b-S4 |
|---|---|---|
| Planning | Project initiation (system request, feasibility) + project management (work plan, staff, monitor and control) | Identify key business needs, **choose methodology**, high-level plan (refined later); low-level planning done regularly |
| Analysis | Analysis strategy, gather requirements, **system proposal** | "probably, the key phase": requirements gathering and elicitation, functional and nonfunctional requirements, models; System proposal "approved by steering committee" |
| Design | Design strategy; architecture and interfaces; databases and files; program design | Business requirements → system requirements; architecture incl. subsystems |
| Implementation | Construct (build and test), install (train users), **support (maintenance)** | Source code, testing, deployment or delivery to end-users |
| Post production | (part of Implementation: "Support the system (maintenance)") | Maintenance; "**probably the longest phase in SDLC**"; continuous user training and improvements |

### 4.8 Analyst skills: Hard vs Soft [W1b-S6, S7]
| | Hard skills | Soft skills |
|---|---|---|
| Definition | "professional skills that can be measured, assessed and verified" | "a person's socio-psychological or personal skills that do not depend on the profession" |
| Confirmation | "confirmed by a specific action, certificate, portfolio"; "Can be confirmed here and now. You can get a certificate or diploma." | "difficult to measure or confirm them at the moment (at an interview)"; "Mastery is revealed over time." |
| Link to profession | "Are tied to a specific profession." | "Not related to a specific profession." |
| How they are gained | "Relatively easy to obtain through training." | "Take a long time and are difficult to develop. Mastering them requires a lot of analysis of your own and other people's behavior."; "can be either innate or acquired through experience" |
| Aimed at | not stated | "most often aimed at oneself or at other people" |
| Examples | "drive a car, touch-type, program in a certain programming language" | "plan your time and concentrate on what is important, analytical thinking, the ability to justify your decisions, the ability to work in a team and teach others … personal qualities" |

### 4.9 The AI-augmented analyst at a glance [W1b-S8–S11, S45, S47]
| Topic | Items, in one line each | Ref |
|---|---|---|
| 6 new skills (skill → why it matters) | Prompt engineering → communicate effectively with AI tools · AI output validation → detect hallucinations, bias, and errors · Data literacy → understand data requirements for AI components · Ethical AI awareness → identify bias, privacy, fairness issues · AI-tool orchestration → chain multiple AI tools together · Model evaluation → assess if an AI component is "good enough" | S8 |
| Human vs AI split | Interview: human conducts and reads body language / AI transcribes, summarizes, extracts · Prioritization: human makes final judgment / AI suggests from historical data · Feasibility: human interprets business constraints / AI estimates cost and time · UML modeling: human reviews and corrects / AI drafts diagrams from text · Documentation: human writes executive summaries / AI first draft · Risk: human handles business and political risks / AI handles technical risks from patterns · Ethics: human makes ethical judgments / AI flags bias and privacy | S9 |
| OO assumption → AI reality → design fix | same output → probabilistic → confidence scores, retries · explicit state → hidden weights → versioning, snapshotting · deterministic bugs → statistical errors → human-in-the-loop fallbacks · predictable performance → varying inference time → async, caching, batching · exhaustive testing → statistical validation → model evaluation pipelines | S10 |
| 5 patterns (pattern → class.method) | Model Wrapper → ChatbotModel.predict(), get_confidence() · Human-in-the-Loop → ReviewQueue.escalate_to_human() · Model Version Manager → ModelRegistry.get_model(version) · Feature Store → FeatureStore.get_features(entity_id) · Drift Detector → DriftMonitor.check_drift() | S11 |
| AI-enhanced methodologies | AI-Augmented Agile (Jira with AI) · MLOps (DVC, MLflow) · LLM-Driven Development (GitHub Copilot, Cursor, Windsurf) · Automated Methodology Selection (prompt to AI) | S45 |

### 4.10 Roles and career paths [W1a-S3, W1b-S2]
| Role | Keyword responsibility (W1a-S3) | Usual way in (W1b-S2) | Leads to (W1b-S2) |
|---|---|---|---|
| Business analyst | business aspects, **business value**, new business processes **and policies** | business function specialist or programmer/analyst (solid) | change management analyst, project manager |
| Systems analyst | technology to improve processes; **designs the information system**; **IS standards** | programmer/analyst (solid); business function specialist (dashed) | project manager (solid); software architect (dashed) |
| Infrastructure analyst | **infrastructure standards**; infrastructure changes | programmer/analyst (solid) | software architect |
| Change management analyst | **change management plan**; **user training plan** | from requirements analyst or business analyst | not shown |
| Project manager | manages the team, project plan, **assigns resources**, **primary point of contact** | from business analyst or systems analyst | not shown |
| Requirements analyst | not in the S3 table | business function specialist (solid); programmer/analyst (dashed) | change management analyst |
| Software architect | not in the S3 table | infrastructure analyst (solid); systems analyst (dashed) | not shown |

---

## 5. Exercises & questions from class

### 5.1 ⭐ The in-class exercise [W1b-S7]
> "Determine which statements are true for describing soft skills, and which are true for hard skills."

| # | Statement (verbatim) | Answer (printed in blue on the slide) | Why, using the W1b-S6 definitions |
|---|---|---|---|
| 1 | "Not related to a specific profession." | **Soft skills** | Soft skills "do not depend on the profession" |
| 2 | "Take a long time and are difficult to develop. Mastering them requires a lot of analysis of your own and other people's behavior." | **Soft skills** | Soft skills "are most often aimed at oneself or at other people"; they "can be either innate or acquired through experience" |
| 3 | "Relatively easy to obtain through training." | **Hard skills** | Hard skills are "professional skills"; the examples are "drive a car, touch-type, program in a certain programming language" |
| 4 | "Mastery is revealed over time." | **Soft skills** | Soft skills are "difficult to measure or confirm … at the moment (at an interview)" |
| 5 | "Are tied to a specific profession." | **Hard skills** | Hard skills are "professional skills" (the opposite of statement 1) |
| 6 | "Can be confirmed here and now. You can get a certificate or diploma." | **Hard skills** | "Hard skills can be confirmed by a specific action, certificate, portfolio" |

- Trick for remembering: the statements come in **opposite pairs**:
  - 1 ↔ 5: tied to a profession or not
  - 2 ↔ 3: hard or easy to develop
  - 4 ↔ 6: confirmed over time, or here and now

### 5.2 Questions written on the slides, with answers from the slides
| # | Question as written | Where | Answer, using only the slides |
|---|---|---|---|
| a | "How course will be organized?" | W1a-S2 | Telegram channel (find in eclass) · one or two lectures uploaded every week · email for questions · two exams (Midterm and final) plus two quizzes · recommendation letter only with B+, A0 or A+ |
| b | ⭐ "Why do we need a **formal process**?" | W1a-S4 | "Failures occur (too) often" · "Creating systems is not intuitive" · "Projects are late, over budget or delivered with fewer features than planned". So "The System Analyst is the key person" |
| c | "What is a System?" | W1a-S7 | "an orderly grouping of interdependent components linked together according to a plan to achieve a specific goal" + the 3 constraints (structure and behavior · interconnectivity and interdependence · organization's objectives come first) |
| d | "Why build this system? How to structure the project?" (the Planning focus) | W1a-S11 | Planning answers it with a **system request**, a **feasibility study** (technical, economic, organizational) and a **project plan** (work plan, staffing plan, standards list, risk assessment) |
| e | "Who, what, where, and when for this system?" (the Analysis focus) | W1a-S13 | Analysis answers it with an analysis strategy, business requirements (interview, JAD session, questionnaire, document analysis, observation), use cases, process models and a data model, which together make the **System proposal** |
| f | "How will this system work?" (the Design focus) | W1a-S15 | Design answers it with the physical system design, architecture, interface, programs, and databases and files, which together make the **System specification** |
| g | The 6 questions on W1b-S14, e.g. "How well do the users and analysts understand the functions and capabilities needed from the new system?" … "Are the project sponsors, users, or organizational managers anxious to see progress?" | W1b-S14 | Each question maps to one row of the "Which Methodology to Use?" table. See §4.3 for the Excellent, Good and Poor methodologies on each row |
| h | "What Is an AI-Augmented Analyst?" | W1b-S9 | "a human analyst who uses AI tools as cognitive partners – not replaced by AI, but enhanced by it …". The human keeps judgment, creativity, ethics and stakeholder interaction; the AI does routine, pattern-based and data-intensive work |
| i | "What Makes Design "AI-Aware"?" | W1b-S10 | Knowing that "AI components have unique characteristics that affect object-oriented modeling": they are probabilistic, have hidden internal state, make statistical errors, have varying inference time, and need statistical testing. The design responses are confidence scores and retries, versioning, human-in-the-loop, async/caching/batching, and evaluation pipelines |
| j | ⭐ "Which Methodology to Use?" | W1b-S46 | Use the 6×6 table; see §4.3 and the scenario questions in §6 |
| k | The example prompt on W1b-S45: *"Based on team size=5, unclear requirements, high risk, recommend methodology"* | W1b-S45 | Using only the S46 table: for **unclear requirements**, the Excellent options are Prototyping, Throwaway Prototyping and XP. The table has **no row for team size or risk**. If "high risk" is read as the S46 rows for unfamiliar technology, complex or reliable systems (this is an interpretation), **Throwaway prototyping** is the only one that is Excellent there too. 🔎 Look up in Track B how team size and risk affect the choice |
| l | The practice prompts on W1b-S8: "What data would I need to build a predictive maintenance system?" · "What biases could emerge in a hiring recommendation system?" · "What metrics would you use to evaluate a fraud detection model? Explain precision vs. recall." | W1b-S8 | **Not answered on the slides.** They are examples of how to *practise* data literacy, ethical AI awareness and model evaluation with AI. 🔎 Look up in Track B for real answers, e.g. precision vs. recall |

---

## 6. Likely exam questions (from these slides only)

**Multiple choice**
1. The four phases of the SDLC, in the order taught in class, are:
   A) Analysis → Planning → Design → Implementation
   B) Planning → Analysis → Design → Implementation
   C) Planning → Design → Analysis → Implementation
   D) Planning → Analysis → Implementation → Design
2. What is the primary output of the **Analysis** phase?
   A) System request · B) System proposal · C) System specification · D) Installed system
3. Which is **NOT** one of the feasibility types assessed during project initiation?
   A) Technical · B) Economic · C) Organizational · D) Legal
4. "A formalized approach to implementing the SDLC (i.e., it is a list of steps and deliverables)" is the definition of:
   A) a system · B) a prototype · C) a methodology · D) the SDLC
5. According to the slides, the important factor in categorizing methodologies is:
   A) the size of the team and the budget
   B) the sequencing of the SDLC phases and the amount of time and effort devoted to each
   C) the programming language and the CASE tools used
   D) whether the customer signs a contract
6. Which methodology belongs to **Rapid Application Development** in the class's classification?
   A) Waterfall · B) Parallel · C) Phased · D) Scrum
7. In the V-model, the **acceptance test design** is derived from which phase?
   A) Analysis · B) Design · C) Implementation (coding) · D) Unit testing
8. Complete the Agile manifesto value: "Customer collaboration over ______."
   A) processes and tools · B) comprehensive documentation · C) contract negotiation · D) following a plan
9. In Extreme Programming (XP), increments are delivered to customers:
   A) several times per day · B) every 2 weeks · C) every thirty working days · D) only when the whole system is complete
10. In the AI-augmented analyst's division of labor, which task stays with the **human** analyst?
    A) Transcribing and summarizing stakeholder interviews
    B) Generating draft UML diagrams from text
    C) Making the final judgment in requirements prioritization
    D) Generating cost/time estimates from historical projects

**True / False** (in the style of the W1b-S7 exercise)

11. "There are no right or wrong software processes."
12. In plan-driven processes, planning is incremental and it is easier to change the process to reflect changing customer requirements.
13. Analytical thinking is an example of a hard skill.
14. "Mastery is revealed over time" is true for hard skills.
15. The waterfall model is only appropriate when the requirements are well-understood and changes will be fairly limited during the design process.
16. Throwaway prototypes should be kept as the basis of the production system because they are already documented.
17. In the Scrum methodology, as taught in class, a sprint lasts thirty working days, and at the end of the sprint a system is delivered to the customer.

**Short answer**

18. (a) Give the class definition of a *system* and its three basic constraints. (b) Give the class definition of the *SDLC*.

**Which methodology for this scenario?** (use the class table "Which Methodology to Use?")

19. Users cannot clearly describe the functions they need, and the team has never worked with the technology that will be used. Which methodology is the best choice, and why are the others weaker?
20. The project time frame is tight, the sponsors are anxious to see progress, and the system must be highly reliable. Which methodology fits best, and which one must you rule out even though it is Excellent for the first two criteria?

### Answers
1. **B.** Planning → Analysis → Design → Implementation [W1a-S9].
2. **B.** System proposal [W1a-S13; also W1a-S12 "Develop a system proposal" and W1b-S4].
3. **D.** Legal. The slide lists Technical, Economic and Organizational feasibility [W1a-S10].
4. **C.** A methodology [W1b-S12].
5. **B.** [W1b-S13] (the bold, underlined heading).
6. **C.** Phased. RAD = Phased and Prototyping; Waterfall and Parallel are Structured; Scrum is Agile [W1b-S17].
7. **A.** Analysis ⇢ Acceptance test design ⇢ Acceptance testing. System, integration and unit test designs come from Design [W1b-S22 diagram].
8. **C.** "Customer collaboration over contract negotiation" ("Customer collaboration" is in red) [W1b-S41].
9. **B.** Every 2 weeks. A is how often new versions *may be built*; C is the Scrum sprint [W1b-S54, S56].
10. **C.** The human "Makes final judgment"; A, B and D are done by AI [W1b-S9].
11. **True** (bold on the slide) [W1b-S16].
12. **False.** That describes **agile** processes. Plan-driven means "all of the process activities are planned in advance and progress is measured against this plan" [W1b-S16].
13. **False.** "Analytical thinking" is listed among **soft** skills [W1b-S6].
14. **False.** The slide's answer for "Mastery is revealed over time" is **Soft skills** [W1b-S7].
15. **True** [W1b-S23].
16. **False.** Prototypes "should be discarded after development as they are not a good basis for a production system", and "Prototypes are normally undocumented" [W1b-S38].
17. **True** [W1b-S56].
18. (a) "an orderly grouping of interdependent components linked together according to a plan to achieve a specific goal." The constraints:
    - **structure and behavior** designed to achieve a predefined objective
    - **interconnectivity and interdependence** among the components
    - the **objectives of the organization** have a higher priority than those of its subsystems

    [W1a-S7]

    (b) "The Systems Development Life Cycle (SDLC) is the process of understanding how an information system (IS) can support business needs by designing a system, building it, and delivering it to users." [W1a-S8]
19. **Throwaway prototyping.** It is the only methodology rated **Excellent for both** "Unclear user requirements" and "Unfamiliar technology".
    - Prototyping and XP are Excellent for unclear requirements but **Poor for unfamiliar technology**.
    - Waterfall and Parallel are Poor for both.
    - Phased is only Good on both.

    [W1b-S46, S14]
20. **Phased development.** It is Excellent for short time schedule, Excellent for schedule visibility and Good for reliable systems, with no Poor rating.
    - **Rule out Prototyping**: it is Excellent for the first two but **Poor for reliable systems**.
    - Waterfall is Poor for short schedule and visibility; Parallel is Poor for visibility.
    - XP (Excellent / Good / Good) and Throwaway (Good / Good / Excellent) are acceptable but rank lower.
    - Phased also "begin[s] to provide business value sooner" [W1b-S31].

    [W1b-S46]

---

## 7. Self-check
- [ ] I can quote the class definition of a **system** and name its **three constraints** [W1a-S7].
- [ ] I can define the **SDLC** and list its **4 phases** in order, with each phase's **focus question**, main steps and **primary output** (system request + feasibility study + project plan → system proposal → system specification → installed system) [W1a-S8–S17].
- [ ] I can explain the **5-phase** version with **Post production**, and why maintenance is "probably the longest phase" [W1b-S4].
- [ ] I can separate **hard** from **soft** skills and solve all six statements of the W1b-S7 exercise without looking (1 soft, 2 soft, 3 hard, 4 soft, 5 hard, 6 hard) [W1b-S6, S7].
- [ ] I can define the **AI-augmented analyst**, list its **6 additional skills**, say which tasks stay human, and explain **AI-aware design** with its **5 OO patterns** [W1b-S8–S11].
- [ ] I can define a **methodology**, state the **categorizing factor**, and list the **6 project characteristics** that affect methodology selection [W1b-S12–S14].
- [ ] I can contrast **plan-driven** and **agile** processes, and explain high-level vs low-level planning and **Rolling Wave Planning** ("Planning is Throughout the Project - Not a Stage") [W1b-S5, S16, S57].
- [ ] I can place **Waterfall, Parallel, Phased, Prototyping, XP and Scrum** in the three classes, and describe or sketch the **waterfall, V-model, parallel, phased, prototyping, throwaway and agile** diagrams [W1b-S17–S44].
- [ ] I can reproduce the **"Which Methodology to Use?"** table from memory and use it to choose a methodology for a scenario [W1b-S46].
- [ ] I can recall the **Agile manifesto** values and the key numbers:
  - agile cycles: **1–4 weeks**
  - XP builds: **several times per day**
  - XP increments: **every 2 weeks**
  - Scrum sprint: **thirty working days**
  - waterfall first published by **Royce, 1970**
  - structured design dominant in the **1980s**; RAD emerged in the **1990s**

  [W1b-S18–S19, S26, S40–S41, S54, S56]
