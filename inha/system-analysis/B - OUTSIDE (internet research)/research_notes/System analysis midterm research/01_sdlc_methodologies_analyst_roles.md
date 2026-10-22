# SDLC, Systems Development Methodologies & the Systems Analyst's Role — Dennis/Wixom/Roth 8e (Ch. 1–2) + Dennis/Wixom/Tegarden OO 6e (Ch. 1) — Midterm Research Notes

Research date: 2026-10-19 (midterm week 8: 24–30 Oct 2026). Course: SOC3070-002 System Analysis, Inha University in Tashkent.
Method note for the report writer: the backbone of these notes is the publisher's own free Chapter 1 excerpts of both textbooks (Wiley "Read an Excerpt" PDFs), cross-checked against primary sources (Scrum Guide, Agile Manifesto, IBM Rational RUP white paper, OMG UML 2.5.1 spec, Microsoft Learn, DORA, Gartner, NIST, ISO). Full-text pirated PDFs of both books surfaced in search (on document-sharing and some university file servers). They were deliberately not opened, used or linked. Abbreviations: **DWR8** = Dennis, Wixom & Roth, *Systems Analysis and Design*, 8th ed. (Wiley, Nov 2021). **DWT6** = Dennis, Wixom & Tegarden, *Systems Analysis and Design: An Object-Oriented Approach with UML*, 6th ed. (Wiley, Oct 2020).

---

## 1. SDLC: the four phases, their steps, techniques and deliverables (phases vs steps vs techniques vs deliverables)

### Takeaway
Dennis defines the SDLC as a four-phase process: **planning → analysis → design → implementation**. Each phase breaks into **steps**, steps use **techniques**, and techniques produce **deliverables**. The four "headline" deliverables are the **system request + feasibility study** and **project plan** (planning), the **system proposal** (analysis), the **system specification** (design), and the **installed system** with test, migration, training and support plans (implementation). Approval gates sit after planning, after analysis, and again at the end of design.

### Cited Findings

**Core definitions (memorize the wording)**
- "The systems development life cycle (SDLC) is the process of determining how an information system (IS) can support business needs, designing the system, building it, and delivering it to users." — [DWR8 Ch.1, p.4 (Wiley excerpt)](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- The OO book words it slightly differently: "the process of understanding how an information system (IS) can support business needs by designing a system, building it, and delivering it to users." — [DWT6 Ch.1, p.1 (Wiley excerpt)](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
- The systems analyst "plays a key role in the SDLC, analyzing the business situation, identifying opportunities for improvements, and designing an IS to implement the improvements." The analyst's primary goal "is not to create a wonderful system. The primary goal is to create value for the organization, which for most companies means increasing profits." — [DWR8 Ch.1, p.4](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- Why the SDLC matters: studies report IT project failure rates "from 30 to 70%." The Standish Group found that for projects over $100 million in labor costs "only 2% are successful (defined as on time and under budget)." — [DWR8 Ch.1, pp.4–5](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf). DWT6 cites a 1996 Standish survey (42% of corporate IS projects abandoned), a 1996 GAO study (53% of U.S. government IS projects abandoned), and IAG Consulting (80% over time, 72% over budget, 55% with less than full functionality). — [DWT6 Ch.1, p.1](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
- **Phases → steps → techniques → deliverables**: "Each phase is itself composed of a series of steps, which rely on techniques that produce deliverables (specific documents and files that explain various elements of the system)." — [DWR8 Ch.1, p.9](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- DWT6's analogy for the hierarchy is applying to a university. **Phases**: information gathering, applying, accepting. **Step**: e.g., requesting information. **Technique**: e.g., Internet searching. **Deliverable**: e.g., evaluations of different universities. — [DWT6 Ch.1, p.4](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
- **Gradual refinement**: "the SDLC is a process of gradual refinement… Each phase refines and elaborates on the work done previously." Teams may move through the steps "consecutively, incrementally, iteratively, or in other patterns," but "all projects have elements of these four phases." — [DWR8 Ch.1, p.10](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- House-building analogy: vision → sketches/drawings refined with the owner → detailed blueprints → construction following the blueprints. — [DWR8 Ch.1, p.8](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)

**Phase-by-phase map (DWR8 Figure 1-3, "Systems development life cycle phases")**

| Phase & focus question | Steps (chapter in 8e) | Techniques | Deliverables / primary output |
|---|---|---|---|
| **Planning**: "Why build this system? How to structure the project?" | Identify opportunity (1); Analyze feasibility (1); Develop project plan (2); Staff project (2); Control and direct project (2) | Project identification; technical, economic and organizational feasibility; scope management; project staffing; project charter; CASE repository; standards; documentation; timeboxing; risk management | System request; feasibility study; project plan (staffing plan, standards list, risk assessment). **Primary outputs: system request with feasibility study; project plan** |
| **Analysis**: "Who, what, where, and when for this system?" | Develop analysis strategy (3); Determine business requirements (3); Create use cases (4); Model processes (4); Model data (5) | BPA / BPI / BPR; interview; JAD session; questionnaire; document analysis; observation; use case analysis; data flow diagramming; entity relationship modeling; normalization | **System proposal**: requirements definition, use cases, process models, data model |
| **Design**: "How will this system work?" | Design physical system (6); Design architecture (7); Design interface (8); Design programs (9); Design databases and files (10) | Design strategy; architecture design; hardware/software selection; use scenario; interface structure, standards, prototype, evaluation; (physical) DFD; program structure chart; program specification; data format selection; ER modeling; denormalization; performance tuning; size estimation | Alternative matrix; **System specification**: architecture report, hardware & software specification, interface design, physical process model, program design, database & file specification, physical data model |
| **Implementation**: "Delivery and support of completed system" | Construct system (11); Install system (12); Maintain system (12); Postimplementation (12) | Programming; software testing; performance testing; conversion strategy selection; training; support selection; system maintenance; project assessment; postimplementation audit | Test plan, programs, documentation; migration plan (conversion plan, business contingency plan, training plan); support plan; problem report; change request; postimplementation audit report. **Primary output: installed system** |

Source: [DWR8 Ch.1, Figure 1-3, pp.9–10](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)

**The narrative "steps" per phase (the version usually examined)**
- **Planning (2 steps)**: "the fundamental process of understanding why an IS should be built and determining how the project team will go about building it." (1) **Project initiation**: the business value is identified. "Most ideas for new systems come from outside the IS area and are recorded on a system request." The IS department works with the **project sponsor** on a **feasibility analysis** (technical: "Can we build it?"; economic: "Will it provide business value?"; organizational: "If we build it, will it be used?"). (2) The system request and feasibility analysis go to an **IS approval committee (steering committee)**, which decides whether to undertake the project. Once approved, the project enters **project management**: the PM "creates a plan, staffs the project, and puts techniques in place to help control and direct the project." The deliverable is "a plan that describes how the project team will go about developing the system." — [DWR8 Ch.1, pp.10–11](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf). DWT6 says the PM "creates a **workplan**" and that "The deliverable for project management is a **project plan**." — [DWT6 Ch.1, p.5](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
- **Analysis (3 steps)**: answers "who will use the system, what the system will do, and where and when it will be used." (1) **Analysis strategy**: study the current (**as-is**) system and its problems, and envision the new (**to-be**) system. (2) **Requirements gathering** (interviews, group workshops, questionnaires), leading to a system concept explained by requirement statements and **business analysis models**. (3) Everything is combined into the **system proposal**, presented to the sponsor and key decision makers (e.g., the approval committee), who decide whether to continue. "Some experts suggest this phase would be better named analysis and initial design." The deliverable "is both an analysis and a high-level initial design." — [DWR8 Ch.1, p.11](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- **Design (4 steps)**: decides "how the system will operate." (1) **Design strategy**: build in-house, outsource, or buy a prewritten package. (2) **Architecture design** (hardware, software, network infrastructure) plus **interface design** (navigation, forms, reports). (3) **Database and file specifications**. (4) **Program design**. "This collection of deliverables (architecture design, interface design, database and file specifications, and program design) is the **system specification**." At the end of design, "the feasibility analysis and project plan are reexamined and revised, and another decision is made… about whether to terminate the project or continue." — [DWR8 Ch.1, p.12](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- **Implementation (3 steps)**: the system is built, or purchased and installed. It is "the longest and most expensive single part of the development process." (1) **System construction**: built and tested. "Most organizations should spend more time and attention on testing than on writing the programs in the first place." (2) **Installation**: "the old system is turned off and the new one is turned on." Training is "one of the most important aspects of conversion." (3) **Support plan**, including a formal or informal **postimplementation review**. — [DWR8 Ch.1, p.12](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)

**Planning-phase content that DWR8 Ch.1 covers in depth (heavily testable)**
- Project identification: needs arise from business initiatives or "pain" (e.g., falling market share). They can also come from **emerging technology** "such as cloud computing, Big Data, or machine learning," which can give a **first mover** advantage. — [DWR8 Ch.1, p.13](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- **BPM** (business process management) is a methodology for continuously improving end-to-end business processes. The business analyst's four BPM steps: (1) define and map process steps; (2) create ways to improve value-adding steps; (3) eliminate or consolidate non-value-adding steps; (4) create or adjust electronic workflows. — [DWR8 Ch.1, p.13](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- **BPA, BPI, BPR**. BPA (automation) uses technology to complement or substitute manual processes, i.e., "pave the cow paths." BPI (improvement) makes moderate changes and "involve[s] more risk than business process automation." BPR (reengineering) means "'obliterating' the current way of doing business"; it carries "substantial risk" and needs top-management support. — [DWR8 Ch.1, pp.13–14](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- **Project sponsor**: the person or group with an interest in the system's success, usually from a business function. The sponsor develops the initial vision and is the primary point of contact. **Tangible value** is easily quantified (e.g., a 2% cut in operating costs). **Intangible value** rests on an intuitive belief in hard-to-measure benefits (e.g., better customer service). — [DWR8 Ch.1, pp.14–15](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- **System request**: "a document that describes the business reasons for building a system and the value that the system is expected to provide." The project sponsor usually completes it. "Most system requests include five elements: **project sponsor, business need, business requirements, business value, and special issues**." It goes to the approval committee. — [DWR8 Ch.1, pp.15–16, Figure 1-4](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- **Feasibility analysis** assesses technical, economic and organizational feasibility. The results "are combined into a **feasibility study** deliverable." Figure 1-7 headings: "Technical Feasibility: Can We Build It?"; "Economic Feasibility: Should We Build It?"; "Organizational Feasibility: If We Build It, Will They Come?" — [DWR8 Ch.1, p.19](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- **Time is deliberately not a feasibility factor**: "we consider time to be a project management issue." The feasibility study is revised throughout the SDLC. — [DWR8 Ch.1, p.20](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- **Technical feasibility** is "in essence, a technical risk analysis." Its risk factors: familiarity with the application, familiarity with the technology, project size, and compatibility. — [DWR8 Ch.1, pp.19–20](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- **Economic feasibility (cost–benefit analysis)**:
  - Four steps: identify costs and benefits → assign values → determine cash flow (usually 3–5 years) → assess economic value with ROI, BEP and NPV.
  - Four categories: development costs (one-time), operational costs (ongoing), tangible benefits, intangibles. Include total cost of ownership (**TCO**).
  - **ROI** = (Total benefits − Total costs) / Total costs.
  - **BEP (payback)** = years of negative cash flow + (that year's net cash flow − that year's cumulative cash flow) / that year's net cash flow.
  - **NPV** = PV of total benefits − PV of total costs, with PV = amount / (1 + rate)^n. "As long as the NPV is greater than zero, the project is considered economically acceptable."
  - Worked example: ROI 10.14% and BEP ≈ 2.7 years look acceptable, but NPV at 10% = −$5,973, so the "naïve" ROI/BEP accept a project that NPV rejects.
  - — [DWR8 Ch.1, pp.21–23](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- **Organizational feasibility** asks "If we build it, will they come?" Assess it through **strategic alignment** and **stakeholder analysis** of the champion, organizational management and system users. The champion is "usually, but not always, the project sponsor." — [DWR8 Ch.1, pp.27–28](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)

### Inferences
- The fastest exam answer frame is "Planning = **why** (and how to run the project); Analysis = **who/what/where/when**; Design = **how**; Implementation = **deliver and support**." This follows directly from the Figure 1-3 focus questions.
- **Approval gates** (three decision points: system request + feasibility → approval committee; system proposal → sponsor/committee; end of design → re-examined feasibility and plan) are a good way to explain why the SDLC controls risk. Gradual refinement explains why each deliverable feeds the next.
- In the 8e, Chapter 1 covers only the planning-phase front end (system request and feasibility). Project plan, staffing and control steps are tagged as Chapter 2 in Figure 1-3. Expect midterm questions to mix Ch.1 and Ch.2 planning content.

### Gaps
- The free excerpt covers Ch.1 only, so Ch.2 detail (workplan techniques, staffing plan, timeboxing, risk management) was not verified from the 8e text. The TOC confirms these headings exist (Ch.2 pp.37–70). — [DWR8 TOC](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf)
- Tilley (12th ed., Cengage 2020), the course's reference text, is commonly taught with a five-phase SDLC (systems planning, analysis, design, implementation, and support & security). Cengage's product page did not show a table of contents, so these phase names are **unverified**; check the reference book directly. — [Cengage Tilley 12e page](https://www.cengage.com/c/systems-analysis-and-design-12e-tilley/9780357117811/)

---

## 2. Development methodologies: how each works, strengths, weaknesses, when to use

### Takeaway
A **methodology** is "a formalized approach to implementing the SDLC (i.e., a list of steps and deliverables)." Dennis groups methodologies into **structured design** (waterfall, parallel), **RAD** (phased, prototyping, throwaway prototyping), **object-oriented (OOSAD)**, **agile** (XP, Scrum), **DevOps**, and **custom** methodologies. Each fixes a different weakness of its predecessor: structured design's long delays and paper specifications, RAD's user-expectation creep, agile's documentation and scaling gaps, and agile's handoff to operations. **Placement trap**: in the 8e (Roth) the methodology catalogue and selection table are in **Chapter 2**, and agile/Scrum get a new **Chapter 13**. In the OO book (DWT6) methodologies, DevOps, UP and UML are all in **Chapter 1**.

### Cited Findings

**Where the material lives (edition check)**
- DWR8 Ch.1 sections: The Systems Analyst (skills, roles), SDLC (four phases), Project Identification and Initiation (system request), Feasibility Analysis. Ch.2 "Project Selection and Management" contains "Project Methodology Options, 42" and "Selecting the Appropriate Development Methodology, 49." Ch.13 "Agile Development Methods" covers Scrum (characteristics, roles, features, processes), Crystal, DSDM, FDD, Lean, and "Comparing the SDLC with Agile Methodologies." — [DWR8 Table of Contents (Wiley excerpt)](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf)
- What's new in the 8e: "A new chapter (Chapter 13) has been added that introduces students to Agile development, focusing specifically on the Scrum approach." Use cases and DFDs were merged into one chapter. Published November 2021, ISBN 978-1-119-80378-2. — [Wiley DWR8 product page](https://www.wiley.com/en-us/Systems+Analysis+and+Design,+8th+Edition-p-9781119803782)
- DWT6 (Oct 2020) added "New sections on DevOps methodologies." Its Ch.1 TOC: Structured Design 7; RAD 9; OOSAD 11; Agile Development 13; DevOps 16; Custom Methodologies 17; The Unified Process 17; UML 26. — [Wiley DWT6 product page](https://www.wiley.com/en-us/Systems+Analysis+and+Design%3A+An+Object+Oriented+Approach+with+UML%2C+6th+Edition-p-9781119561217); [DWT6 TOC](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-83.pdf)

**Ways of categorizing methodologies**
- "A methodology is a formalized approach to implementing the SDLC (i.e., it is a list of steps and deliverables)."
  - By focus: **process-centered** (process models at the core), **data-centered** (data models at the core), and **object-oriented** (balances process and data in one model).
  - By the **sequencing of phases** and the effort each receives.
  - Early ad hoc practice went straight from a fuzzy system request into coding.
  - — [DWT6 Ch.1, p.7](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
- Structured design "became dominant in the 1980s, replacing the previous ad hoc and undisciplined approach." It uses a "formal step-by-step approach… that moves logically from one phase to the next." RAD "emerged in the 1990s." — [DWT6 Ch.1, pp.7, 9](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
- The classical waterfall model is attributed to Winston Royce (1970): "linear, sequential… the output of each phase is the input to the next one." — [Univ. of Strathclyde lecture, Software process models](https://personal.cis.strath.ac.uk/~ir/dlss/lecture9_process.pdf)

**Comparison table (all rows from [DWT6 Ch.1, pp.7–17](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf) unless another source is given)**

| Methodology (category) | How it works | Strengths | Weaknesses |
|---|---|---|---|
| **Waterfall** (structured) | Analysts and users "proceed in sequence from one phase to the next." Each phase's deliverables are "typically very long (often hundreds of pages)," approved by the sponsor, then the phase ends. Going backward is "extremely difficult (imagine yourself as a salmon trying to swim upstream against a waterfall)." | "identifies system requirements long before programming begins and it minimizes changes to the requirements as the project proceeds." Also a "large degree of management control" ([Dennis-based slides, slidetodoc](https://slidetodoc.com/system-development-methodologies-structured-design-waterfall-development-parallel/)). | "the design must be completely specified before programming begins." A "long time elapses" between the system proposal and delivery ("usually many months or years"). Missed requirements mean expensive post-implementation programming. A changed business environment forces rework. |
| **Parallel development** (structured) | "performs a general design for the whole system and then divides the project into a series of distinct subprojects that can be designed and implemented in parallel." The pieces are integrated at the end. | "can reduce the time to deliver a system; thus, there is less chance of changes in the business environment causing rework." | Subprojects are often "not completely independent"; one subproject's design decisions can affect another, and the end "can require significant integration efforts." |
| **RAD** (category) | Adjusts SDLC phases "to get some part of the system developed quickly and into the hands of the users." Uses CASE tools, JAD sessions, fourth-generation/visual programming languages and code generators. | Speed and quality of development. | The "subtle problem" is **managing user expectations**: "As a user better understands the information technology (IT), the systems requirements tend to expand." |
| **Phased development** (RAD) | "breaks an overall system into a series of versions that are developed sequentially." Analysis sets the overall concept; requirements are sorted into versions, with the most important in version 1. Then design and implementation for v1, then v2 adds lessons learned from v1, and so on. | "quickly getting a useful system into the hands of the users." Business value arrives sooner, and users "identify important additional requirements sooner." | "users begin to work with systems that are intentionally incomplete." The team must choose the most important features for v1 and manage expectations. |
| **Prototyping** (RAD; a.k.a. system prototyping) | "performs the analysis, design, and implementation phases concurrently, and all three phases are performed repeatedly in a cycle." Each **system prototype** is "a quick-and-dirty program that provides a minimal amount of features," refined until it is installed and "now called the 'system'". | "very quickly provides a system with which the users can interact." It "reassures the users" and "helps to more quickly refine real requirements." | "fast-paced system releases challenge attempts to conduct careful, methodical analysis." Early design decisions become poor ones, causing problems for complex systems (the "take the whole engine out to change the oil" example). |
| **Throwaway prototyping** (RAD) | A "relatively thorough analysis phase," then **design prototypes** to examine unclear features or hard technical issues. A design prototype "is not a working system" (e.g., mock-up screens, or partial code with pretend data). After the issues are resolved, the prototypes are **thrown away** and the real design and implementation follow. | "balance[s] the benefits of well-thought-out analysis and design phases with the advantages of using prototypes to refine key issues." Usually "produces more stable and reliable systems." | "It can take longer to deliver the final system as compared to prototyping-based methodologies." |
| **OOSAD** (object-oriented) | Can use any traditional methodology but is "most associated with a phased development RAD." It decomposes problems around **objects** containing both data and processes. Any modern OO approach must be **use-case driven, architecture-centric, and iterative and incremental** (see §5). | Modularity: easier to grasp, share and communicate, and produces "reusable pieces that can be plugged into other systems." | (Ch.1 gives weaknesses only for the Unified Process; see §5.) |
| **Agile** (category) | Based on "the agile manifesto and a set of twelve principles." "Programming-centric methodologies [with] few rules and practices." They eliminate "much of the modeling and documentation overhead." "Virtually all agile methodologies are used in conjunction with object-oriented technologies." | Addresses the application backlog and gives timely solutions. | Four criticisms: (1) co-location is unrealistic given offshoring/outsourcing; (2) it can devolve into "'programmers gone wild'"; (3) lack of documentation undermines **auditability**; (4) doubts about delivering "large mission-critical systems." |
| **Extreme Programming (XP)** (agile) | "four core values: communication, simplicity, feedback, and courage." Developers give rapid feedback, follow KISS, grow the system with incremental change, and keep a quality-first mentality. Key principles: "continuous testing, simple coding performed by pairs of developers, and close interactions with end users." It starts with **user stories**; code is tested daily in an integrative testing environment, and the programmer who implements a task estimates it. | Delivers results "sooner than even the RAD approaches." Better stakeholder communication, continuous testing, evolving requirements, shared code ownership through pairing, and quality that rises each iteration. | Needs "a great deal of discipline." "recommended only for small groups of developers—no more than ten developers." "not advised for large mission-critical applications." It leaves "only code documentation," so maintaining large systems "may be impossible." It needs a lot of on-site user input. |
| **Scrum** (agile), as the OO textbook describes it | Rugby metaphor. "a sprint lasts thirty working days," and a system is delivered at the end. Teams are "self-organized and self-directed… do not have a designated team leader." No new requirements are taken mid-sprint (they go to a backlog). There is a daily Scrum meeting (what I did yesterday, what I'll do today, what blocked me), and any blocker is "dealt with within one hour." The team demos to the client at sprint end. | Daily-meeting focus; evolutionary, incremental requirements; iterative development. | "A typical Scrum team size is no more than seven members." Scaling to very large mission-critical systems is doubtful; the only remedy offered is a "scrum of scrums." |
| **DevOps** | "incorporate[s] ideas from both object-oriented approaches… and lean manufacturing into the agile approaches." Popular approaches are **DAD** and **SAFe**. "The primary extensions… are the inclusion of operations personnel with the development team and continuous deployment." New versions are deployed in pieces ("rolling upgrade"), which needs an automated deployment pipeline. | Non-functional requirements such as **security** are addressed during design. There is no "throws the system over the wall" handoff to operations. | (Ch.1 lists no weaknesses; inferred cost: heavy automation of the pipeline.) |
| **Custom methodologies** | Apply agile and OO ideas to the methodology itself. A high-level framework lets teams pick components from a repository (Henderson-Sellers' OPEN; Jacobson's SEMAT Essence). Components must be "**plug compatible**." | Tailored to the project. | Components must be checked for compatibility. |

**Agile primary sources (exact wording)**
- Four values: "Individuals and interactions over processes and tools; Working software over comprehensive documentation; Customer collaboration over contract negotiation; Responding to change over following a plan… while there is value in the items on the right, we value the items on the left more." 2001, 17 signatories (Beck, Beedle, … Schwaber, Sutherland, Thomas). — [Agile Manifesto](https://agilemanifesto.org/)
- The 12 principles include "Welcome changing requirements, even late in development," "Deliver working software frequently, from a couple of weeks to a couple of months," "Working software is the primary measure of progress," and "Simplicity--the art of maximizing the amount of work not done--is essential." — [Agile Manifesto principles](https://agilemanifesto.org/principles.html)
- XP values per the XP community site list **five** values: simplicity, communication, feedback, **respect**, courage. — [extremeprogramming.org (Don Wells)](http://www.extremeprogramming.org/values.html)
- **Scrum Guide 2020 (official)**:
  - Scrum is "a lightweight framework that helps people, teams and organizations generate value through adaptive solutions for complex problems."
  - Pillars: transparency, inspection, adaptation. Values: commitment, focus, openness, respect, courage.
  - Scrum Team = one Scrum Master, one Product Owner and Developers, "typically 10 or fewer people."
  - Events: the Sprint ("one month or less"), Sprint Planning (max 8 h for a one-month sprint), Daily Scrum (15 min), Sprint Review (max 4 h), Sprint Retrospective (max 3 h).
  - Artifacts → commitments: Product Backlog → Product Goal; Sprint Backlog → Sprint Goal; Increment → Definition of Done.
  - "Only the Product Owner has the authority to cancel the Sprint."
  - — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)

**DevOps (vendor and industry definitions)**
- Microsoft: "DevOps combines development (Dev) and operations (Ops) to unite people, process, and technology in application planning, development, delivery, and operations." Phases: plan, develop, deliver, operate. Practices: CI/CD, version control, agile, infrastructure as code, configuration management, continuous monitoring. Teams should measure **mean time to recovery**. — [Microsoft Learn, What is DevOps?](https://learn.microsoft.com/en-us/devops/what-is-devops)
- DORA measures delivery with five metrics.
  - **Throughput**: change lead time ("committed to version control to deployed in production"), deployment frequency, failed deployment recovery time.
  - **Instability**: change fail rate and deployment rework rate.
  - Speed and stability "are not competing concerns."
  - — [DORA metrics guide](https://dora.dev/guides/dora-metrics/)
- SWEBOK v4.0 (IEEE Computer Society, 2024; v4.0a Sept 2025) is free. It has 18 knowledge areas, including new Software Architecture, Software Engineering Operations and Software Security KAs. "Agile and DevOps have been notably integrated into several KAs." — [IEEE CS SWEBOK](https://www.computer.org/education/bodies-of-knowledge/software-engineering)

### Inferences
- **Evolution storyline (for essay answers)**: ad hoc coding → structured design (1980s; control and documentation, but slow) → RAD (1990s; something usable early, but expectations grow) → OO (balanced data/process, reuse) → agile (people and working software over documents; small teams) → DevOps (operations inside the team, continuous deployment). Each answers the previous approach's main weakness, per the DWT6 descriptions above.
- **Prototyping vs throwaway prototyping is the #1 confusion.** In prototyping the prototype **evolves into the system** (A/D/I run concurrently). In throwaway prototyping a **thorough analysis comes first**, prototypes are **design prototypes**, and they are **discarded** before real design and implementation.
- **Phased vs parallel**: phased delivers **versions sequentially** (v1 in users' hands early). Parallel builds **subprojects simultaneously** after one general design and delivers **once**, after integration.
- The textbook's description of Scrum is dated compared with the 2020 Scrum Guide: 30 working days vs ≤ 1 month; ≤ 7 members vs ≤ 10; "no designated team leader" vs the Product Owner and Scrum Master accountabilities. On an exam, answer per the course textbook unless the question cites the Scrum Guide. DWR8 Ch.13 (Scrum roles) may align more closely with the Guide (not verified).

### Gaps
- The exact wording and naming of DWR8 Ch.2's "Project Methodology Options" (pp.42–49) could not be read: no free excerpt, Google Books returned a CAPTCHA, and Quizlet blocked access. Some Dennis-family editions rename the RAD variants "Iterative Development," "System Prototyping," and "Design/Throwaway Prototyping," and add "V-model." A Chegg question title lists "Waterfall, Parallel, V-model, Iterative, System Prototyping, Throwaway prototyping, Agile" (title only, paywalled). **The student should check which labels their 8e Ch.2 uses.**
- DevOps does not appear as a heading in the DWR8 TOC. If the course covers DevOps, it is from the OO book, the lecture slides, or outside material.

---

## 3. "Selecting the appropriate development methodology": criteria, ratings, worked cases

### Takeaway
Dennis rates each methodology Poor/Good/Excellent on six criteria: **clarity of user requirements, familiarity with technology, system complexity, system reliability, short time schedule, schedule visibility**. The quick rules:
- **unclear requirements** → prototyping, throwaway or agile;
- **unfamiliar technology** → throwaway (phased is second);
- **complex or reliability-critical** → throwaway (structured or phased acceptable; avoid prototyping and XP);
- **short schedule** → phased, prototyping or agile (avoid waterfall);
- **schedule visibility** → phased or prototyping.

In 8e this table is in **Ch.2, p.49 onward**.

### Cited Findings
- 8e location: "Selecting the Appropriate Development Methodology, 49" (Ch.2). — [DWR8 TOC](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf)
- A Dennis-based teaching deck lists the factors: "Selecting a Methodology Depends on: Clarity of user requirements • Familiarity with technology • System complexity • System reliability requirements • Time available • Visibility of risk factors." The deck groups columns as "Structured Methodologies (Waterfall, Parallel) | RAD Methodologies (Phased, Prototyping, Throwaway) | Agile Methods (XP)." — [Dennis-based instructor slides, slidetodoc (third-party upload, low authority)](https://slidetodoc.com/system-development-methodologies-structured-design-waterfall-development-parallel/)

**Ratings table (standard Dennis version; see verification notes below)**

| Ability to develop systems… | Waterfall | Parallel | Phased | Prototyping | Throwaway prototyping | Agile / XP |
|---|---|---|---|---|---|---|
| with unclear user requirements | Poor | Poor | Good | Excellent | Excellent | Excellent |
| with unfamiliar technology | Poor | Poor | Good | Poor | **Excellent** | Poor |
| that are complex | Good | Good | Good | Poor | **Excellent** | Poor |
| that are reliable | Good | Good | Good | Poor | **Excellent** | Good |
| with a short time schedule | Poor | Good | Excellent | Excellent | Good (verify) | Excellent |
| with schedule visibility | Poor | Poor | Excellent | Excellent | Good | Good |

- **Verification status.** The slide transcript reproduces the table with merged adjacent cells. Its row sequences are:
  - unclear "Poor | Good | Excellent";
  - unfamiliar tech "Poor | Good | Poor | Excellent | Poor";
  - complex "Good | Poor | Excellent | Poor";
  - reliable "Good | Poor | Excellent | Good";
  - short schedule "Poor | Good | Excellent";
  - visibility "Poor | Excellent | Good."

  These match rows 1–4 and 6 above once equal adjacent cells are merged. Row 5 (short schedule) matches only partially: the transcript shows no trailing "Good | Excellent," so the throwaway cell is the least certain. — [slidetodoc transcript](https://slidetodoc.com/system-development-methodologies-structured-design-waterfall-development-parallel/)
- Textbook statements that ground the ratings:
  - Throwaway "can take longer to deliver the final system as compared to prototyping-based methodologies, but… usually produces more stable and reliable systems" (supports throwaway = Good on short schedule and Excellent on reliability).
  - Throwaway uses design prototypes for "challenging technical issues" (Excellent on unfamiliar technology).
  - Prototyping causes "problems in the development of complex systems" (Poor on complex).
  - XP "is not advised for large mission-critical applications" (Poor on complex).
  - Waterfall has "a long time" between proposal and delivery (Poor on short schedule).
  - Parallel "can reduce the time to deliver" (Good on short schedule).
  - Phased gets "a useful system into the hands of the users" quickly (Excellent on short schedule).
  - — [DWT6 Ch.1, pp.8–15](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
- Test-bank-style item seen in a search snippet (page itself blocked): a project "with unclear user requirements, unfamiliar technologies, somewhat complex requirements, a need for reliability, when time is not an issue, and schedule visibility is somewhat important" → **throwaway prototyping**. — [Brainly Q 44847563 (snippet only)](https://brainly.com/question/44847563)
- Official end-of-chapter scenario prompts in DWT6 that are good practice:
  - (H/J) analyst at a small company building an accounting system: UP or another approach?
  - (I) store sales and inventory system at each store of a large chain, exchanging data with a head-office mainframe.
  - (K) an executive information system for senior executives.
  - (A/G) a manager wants to swap waterfall for prototyping or UP on a large, complex project.
  - Minicase 1: a manager builds her own system and skips the SDLC (a "why follow a methodology?" question).
  - Minicase 3: moving from a structured approach to RUP/OO on a mainframe.
  - — [DWT6 Ch.1, pp.30–31](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
- DWT6 Minicase 2 is a **roles/staffing** case, not a methodology case. A new expert-system underwriter's assistant will "substantially change the way the underwriting staff do their jobs." The budget allows only one of two staff: Barry, who is experienced in organizational behavior and smoothing transitions to new systems, or Kim, who has expert-system technology experience. — [DWT6 Ch.1, p.31](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)

### Inferences
**Worked cases (my application of the table; justify with 2–3 decisive criteria plus a rejected runner-up)**
1. **Hospital medication-dispensing system.** Requirements are mandated and clear, the technology is familiar, the system is complex, reliability is life-critical, and the schedule is not tight. → **Throwaway prototyping** (Excellent on complex and reliable). If the requirements are truly frozen and auditors want heavy documentation, waterfall (Good/Good) is defensible. Reject prototyping and XP (Poor on complex; prototyping Poor on reliable).
2. **First ML/AI or new-cloud-platform project** with partly unclear requirements and a need for reliability (e.g., automated loan-document reading). → **Throwaway prototyping**: proof-of-concept design prototypes retire the technical risk, and the only methodology rated Excellent on unfamiliar technology is throwaway. Reject prototyping (Poor on unfamiliar technology).
3. **Marketing campaign web app** due in 6 weeks with vague requirements, a small co-located team and low criticality. → **Agile (XP/Scrum)** or **prototyping** (Excellent on unclear requirements and short schedule). Reject waterfall (Poor/Poor).
4. **Statewide payroll/ERP-style replacement.** Requirements are well understood, the system is large and complex, it must be reliable, leadership wants something live soon and visible progress. → **Phased development**: Good on complex and reliable, Excellent on short schedule and visibility. Version 1 = core payroll. Runner-up: parallel (Good on schedule but Poor on visibility, with integration risk at the end).
5. **Legislated tax-rule update with a fixed deadline.** Requirements are clear (statute), the technology is familiar, and the work splits into independent modules. → **Parallel development** (Good on short schedule, Good on complex and reliable). Watch subproject dependencies and the integration effort.
6. **Executive information system** (DWT6 exercise K). Executives can't articulate needs until they see screens; the data and technology are familiar. → **Prototyping**, or throwaway if reliability or complexity matters.
7. **Small-company accounting system** (DWT6 exercises H/J). Requirements are clear and standard, and the technology is familiar. → **Waterfall** is acceptable. Mention the design-strategy option of **buying a package** (design phase step 1, [DWR8 p.12](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)); UP is overkill for a small project.
8. **SaaS product with weekly cloud releases** where operations staff must manage security and uptime. → **DevOps**: operations in the team, continuous deployment, rolling upgrades; measure with DORA metrics.

- **Answer template for "choose and justify"**: (1) rate the case on the six criteria (clear/unclear, familiar/unfamiliar, simple/complex, normal/critical reliability, time tight/loose, visibility needed?); (2) pick the methodology with the most Excellent/Good on the **critical** criteria; (3) name one rejected alternative and the criterion that kills it; (4) add a risk mitigation (e.g., manage user expectations in phased or RAD).
- **Insight**: in the standard table, throwaway prototyping is rated at least as good as waterfall on every criterion. Waterfall survives in practice for reasons outside the table, such as management control and documentation and traceability.
- **AI/ML projects** usually score "unclear requirements" (target accuracy unknown until data is explored) and "unfamiliar technology." That points to throwaway prototyping or proof-of-concept first, then iterative delivery with MLOps. This matches the "experimental" nature of ML development ([Google Cloud MLOps](https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning)).

### Gaps
- The exact 8e Figure (Ch.2) ratings and column labels could not be read from the 8e itself, and the short-time-schedule/throwaway cell is the least corroborated. Verify against the student's copy, 8e pp.49–52.
- No reliable source was found reproducing the OO book's (DWT6) version of the table. DWT6 Ch.1 contains no selection table.

---

## 4. Roles and skills of the systems analyst

### Takeaway
Dennis lists **six skill categories: technical, business, analytical, interpersonal, management, ethical**. Team roles: **business analyst** (business value and processes), **systems analyst** (IS issues and design), **infrastructure analyst** (hardware, software, network, database standards), **change management analyst** (people, training, resistance), **project manager** (time, budget, value). The 8e (Roth) adds a **requirements analyst** (elicitation specialist) and names the **software architect** as a career path.

### Cited Findings
- **Six skills**: "These skills can be broken down into six major categories: technical, business, analytical, interpersonal, management, and ethical."
  - Technical: understand the existing environment, the new system's technology, and how they fit together.
  - Business: understand how IT applies to business processes and delivers real value.
  - Analytical: "continuous problem solvers."
  - Interpersonal: communicate one-on-one with users and with programmers, give presentations, write reports.
  - Management: manage people, pressure and risks "associated with unclear situations."
  - Ethical: "deal fairly, honestly, and ethically"; maintain confidentiality and trust.
  - — [DWR8 Ch.1, pp.6–7](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf); same list in [DWT6 Ch.1, pp.2–3](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
- The analyst as **change agent**: systems analysts "may serve as change agents who identify the organizational improvements needed, design systems to implement those changes, and train and motivate others to use the systems." — [DWR8 Ch.1, p.6](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- Ethics spotlight: the analyst James is asked to reuse new-account customer data for a loan marketing campaign. Who "owns" the data? Should the analyst be "an ethical watchdog"? — [DWR8 Ch.1, p.6, Spotlight on Ethics 1](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)

**Roles table**

| Role | Focus | Main tasks | Background | Represents (DWT6) | Most active phase (DWT6) |
|---|---|---|---|---|---|
| **Systems analyst** | "IS issues surrounding the system" | Ideas for how IT can improve business processes; helps design new IT-supported processes; designs the new IS; ensures IS standards are maintained | Analysis and design, programming (plus some business) | IS department | Intensive throughout, "perhaps less so during the implementation phase" |
| **Business analyst** | "business issues surrounding the system" | Identifies business value; ideas for improving business processes; helps design new processes and policies | Business training and experience plus analysis and design knowledge | Project sponsor and ultimate users | Assists in planning and design; **most active in analysis** |
| **Requirements analyst** (DWR8 only) | "eliciting the requirements from the stakeholders" | Requirements elicitation techniques (Ch.3) | Understands the business; "excellent communicators" | — | — |
| **Infrastructure analyst** | Technical issues of how the system interacts with "hardware, software, networks, and databases" | Ensures conformance to organizational standards; identifies infrastructure changes needed | Networking, DB administration, hardware/software | The organization and IS group that will operate and support the system | Throughout, but less in planning and analysis. Can grow into **software architect** (DWR8) |
| **Change management analyst** | "people and management issues surrounding the system installation" | Documentation and support for users; user training; strategies "to overcome resistance to change" | Organizational behavior, change management | Project sponsor and users | **Most active in implementation**; lays the groundwork in analysis and design |
| **Project manager** | Project "completed on time and within budget" and delivers expected value | Manages the team, develops the project plan, assigns resources, primary point of contact | "often a seasoned systems analyst" with PM training | IS department and project sponsor | "intensely during all phases" |

Sources: [DWR8 Ch.1, pp.7–8](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf); [DWT6 Ch.1, pp.3–4](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf). DWT6 also notes **programmers** and **technical writers** (help screens, manuals) on most IS teams.

- Career paths (DWR8 Figure 1-1): entry-level programmer/analyst or entry-level business function specialist → business, systems, requirements or infrastructure analyst → change management analyst, project manager or software architect. "There is no single typical career path." — [DWR8 Ch.1, p.8](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- The Wiley-authored 7e slide deck groups specialized roles as "People-oriented: change management analyst, project management • Business-oriented: requirements analyst…" (deck © 2019 John Wiley & Sons, viewed via a third-party upload). — [slidetodoc copy of DWR 7e Ch.1 slides](https://slidetodoc.com/chapter-1-the-systems-analyst-and-information-systems/)
- **Modern AI framing of roles**:
  - Gartner predicts that "Through 2027, generative AI (GenAI) will spawn new roles in software engineering and operations, requiring 80% of the engineering workforce to upskill."
  - The predicted "AI engineer" combines "software engineering, data science and AI/machine learning (ML)."
  - 56% of software engineering leaders rated AI/ML engineer the most in-demand role for 2024.
  - In the "AI-native" era engineers will focus on "steering AI agents toward the most relevant context and constraints," making "prompt engineering and retrieval-augmented generation (RAG) skills essential."
  - — [Gartner press release, 3 Oct 2024](https://www.gartner.com/en/newsroom/press-releases/2024-10-03-gartner-says-generative-ai-will-require-80-percent-of-engineering-workforce-to-upskill-through-2027)

### Inferences
- Exam pairing trick: **business analyst ↔ analysis phase**; **change management analyst ↔ implementation phase**; **project manager ↔ all phases**; **infrastructure analyst ↔ least in planning and analysis**. These come straight from DWT6's "most active" statements.
- Mapping AI onto the six skills: **technical** now includes AI/ML literacy (what a model can and can't do, data pipelines); **analytical** includes judging AI output; **ethical** covers data ownership, privacy and bias (cf. the DWR8 ethics spotlight on data reuse); **business** includes valuing AI beyond cost cutting (Gartner's warning that cost-centred ROI misses AI's value, §6).
- Under "If we build it, will they come?", user distrust of AI features is an **organizational feasibility** risk and a job for the **change management analyst** (see DORA trust data in §6).
- On DWT6 Minicase 2 (Barry vs Kim), the defensible answer argues from the case facts. The system will substantially change how underwriters work, so the **change-management skill set (Barry)** addresses the riskier organizational-feasibility side. The counter-argument is unfamiliar expert-system technology (technical risk), which could be bought in from vendors or consultants (DWR8 notes outside expertise reduces technology risk, p.20). Either answer scores if it is justified against the role definitions.

### Gaps
- Whether the 8e lecture slides keep the "requirements analyst" role in the core list was not verified (the 8e text does). Assume six roles for 8e and five for the OO book.

---

## 5. OO basics (Ch.1 of the OO book): use-case driven, architecture-centric, iterative & incremental; Unified Process/RUP; UML overview

### Takeaway
Any modern OO approach must be **use-case driven** (use cases are the primary modeling tool for behavior), **architecture-centric** (the architecture drives specification, construction and documentation, through functional, static and dynamic views), and **iterative and incremental** (the three views grow little by little). The **Unified Process** has two dimensions: **4 phases** (inception, elaboration, construction, transition) × **workflows**. DWT6 lists 10 workflows (7 engineering + 3 supporting). IBM's RUP has 9 core workflows because analysis and design are combined. Enhanced UP adds a production phase and 2 workflows. DWT6 says UML 2.5 has **15 diagrams** (7 structure + 8 behavior); the OMG spec lists 14 diagram types.

### Cited Findings
**Three characteristics**
- "According to the creators of the Unified Modeling Language (UML), Grady Booch, Ivar Jacobson, and James Rumbaugh, any modern object-oriented approach to developing information systems must be use-case driven, architecture-centric, and iterative and incremental." — [DWT6 Ch.1, p.11](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
- **Use-case driven**: "use cases are the primary modeling tools defining the behavior of the system." A use case "describes how the user interacts with the system to perform some activity." Use cases are simple because they "focus on only one business process at a time," unlike decomposed process models. — [DWT6 Ch.1, pp.11–12](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf). The original UP authors' definition: "A use case is a piece of functionality in the system that gives a user a result of value." "Use-case driven means that the development process follows a flow—it proceeds through a series of workflows that derive from the use cases." — [Jacobson, Booch & Rumbaugh, "The Unified Process," IEEE Software, May/June 1999 (course-reading copy)](https://people.eecs.ku.edu/~hossein/810/Readings/rup-unified-process.pdf)
- **Architecture-centric**: "the underlying software architecture of the evolving system specification drives the specification, construction, and documentation of the system." There are three views. The **functional (external)** view is behavior from the user's perspective. The **structural (static)** view covers attributes, methods, classes, relationships. The **behavioral (dynamic)** view covers messages between objects and state changes. — [DWT6 Ch.1, p.12](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf). Key use cases "may amount to only 5 percent to 10 percent of all the use cases" but drive the architecture. — [Jacobson et al. 1999](https://people.eecs.ku.edu/~hossein/810/Readings/rup-unified-process.pdf)
- **Iterative and incremental**: development "undergoes continuous testing and refinement throughout the life of the project." Analysts build the functional, then structural, then behavioral views "little by little," iterating among them (Figure 1-2). — [DWT6 Ch.1, p.12](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf). "Each mini-project is an iteration that results in an increment. Iterations refer to steps in the workflow, and increments, to growth in the product." The three ideas are "like a three-legged stool." — [Jacobson et al. 1999](https://people.eecs.ku.edu/~hossein/810/Readings/rup-unified-process.pdf)
- **Benefits of OOSAD**: break a complex system into "smaller, more-manageable modules," work on them individually, and reassemble. This makes development easier to grasp, share and communicate, and creates "reusable pieces." — [DWT6 Ch.1, p.13](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
- DWT6 Ch.1's appendix covers the basic characteristics of OO systems: classes and objects; methods and messages; encapsulation and information hiding; polymorphism and dynamic binding; inheritance. — [DWT6 TOC](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-83.pdf)

**Unified Process (DWT6) vs RUP (IBM)**
- UP "is a specific methodology that maps out when and how to use the various… UML techniques." UML gives "structural support"; UP gives "behavioral support." It is "a two-dimensional systems development process described by a set of phases and workflows." Phases: inception, elaboration, construction, transition. Workflows: "business modeling, requirements, analysis, design, implementation, test, deployment, configuration and change management, project management, and environment." — [DWT6 Ch.1, p.17](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)

| UP phase | ≈ traditional SDLC | Focus (DWT6) | Primary deliverables (DWT6) | RUP milestone (IBM) |
|---|---|---|---|---|
| **Inception** | "very similar to the planning phase" | Business case and feasibility (technical, economic, organizational); business modeling, requirements, analysis workflows; possibly a throwaway prototype; PM and environment workflows relevant | **Vision document** (scope, primary requirements and constraints, initial project plan, feasibility and risks, environment, some problem-domain classes) | **Lifecycle Objectives** |
| **Elaboration** | Analysis + design ("most relevant" to OOSAD) | Analysis and design workflows; finalize business case, risk assessment, detailed plan; UML structural and behavioral models; "all but the deployment" workflow | UML structure and behavior diagrams plus "an executable of a baseline version" (architecture baseline) | **Lifecycle Architecture** |
| **Construction** | Implementation (programming) | Implementation workflow; configuration and change management (version control) "extremely important"; deployment ramps up in the last iteration | Implementation "that can be released for beta and acceptance testing" | **Initial Operational Capability** |
| **Transition** | Implementation (installation) | Testing and deployment workflows; beta and acceptance testing, user training, rollout | Executable system, user manuals, support plan, upgrade plan | **Product Release** |

Sources: [DWT6 Ch.1, pp.18–20](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf); [IBM Rational RUP white paper TP026B (archived)](https://web.archive.org/web/2017/https://www.ibm.com/developerworks/rational/library/content/03July/1000/1251/1251_bestpractices_TP026B.pdf). Milestone questions from Jacobson et al.: end of elaboration, "Are the use cases, architecture, and plans stable enough, and are the risks under sufficient control…?"; end of construction, "Does the product meet users' needs sufficiently for some customers to take early delivery?" — [IEEE Software 1999](https://people.eecs.ku.edu/~hossein/810/Readings/rup-unified-process.pdf)

- **Workflows (DWT6)**: engineering = business modeling, requirements, analysis, design, implementation, test, deployment (7); supporting = project management, configuration and change management, environment (3). The project management workflow "is the only truly cross-phase workflow." **Analysis paralysis** happens when a project "becomes so bogged down with analysis that the system is never actually designed or implemented." — [DWT6 Ch.1, pp.20–22](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
- **RUP (IBM) definition**: "a Software Engineering Process. It provides a disciplined approach to assigning tasks and responsibilities within a development organization. Its goal is to ensure the production of high-quality software that meets the needs of its end-users, within a predictable schedule and budget."
  - **Six best practices**: develop software iteratively; manage requirements; use component-based architectures; visually model software; verify software quality; control changes to software.
  - **Two axes**: horizontal = time (cycles, phases, iterations, milestones); vertical = static structure (activities, artifacts, workers, workflows).
  - **"nine core process workflows"**: 6 engineering (business modeling, requirements, **analysis & design**, implementation, test, deployment) and 3 supporting (project management, configuration and change management, environment).
  - Inception outcome includes a vision document, an "initial use-case model (10%–20% complete)," and an initial business case and risk assessment.
  - — [IBM Rational, "Rational Unified Process: Best Practices for Software Development Teams," TP026B (archived)](https://web.archive.org/web/2017/https://www.ibm.com/developerworks/rational/library/content/03July/1000/1251/1251_bestpractices_TP026B.pdf)
- **UP weaknesses and Enhanced UP**:
  - UP ignores staffing, budgeting and contract management; ignores maintenance, operations and support ("only a development process"); and ignores cross-project issues.
  - Ambler & Constantine add a **production phase** plus the **operations and support** and **infrastructure management** workflows.
  - The production phase has "no iterations or incremental deliverables" and no engineering workflows.
  - — [DWT6 Ch.1, pp.22–24](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)

**UML**
- History: Rational brought Booch, Jacobson and Rumbaugh together in 1995. In "November 1997, the Object Management Group (OMG) formally accepted UML as the standard." Current version is 2.5. — [DWT6 Ch.1, p.26](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
- DWT6: "Version 2.5 of the UML defines a set of **fifteen** diagramming techniques."
  - **Structure (7)**: class, object, package, deployment, component, composite structure, profile.
  - **Behavior (8)**: activity, sequence, communication, interaction overview, timing, behavior state machine, protocol state machine, use-case.
  - Primary phase per diagram (Figure 1-6): use-case → Analysis; class, object, activity, sequence, communication, state machines → Analysis, Design; deployment and component → Physical Design, Implementation; package → Analysis, Design, Implementation; profile → None.
  - — [DWT6 Ch.1, pp.26–27](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
- The official OMG UML 2.5.1 spec (Annex A) says "there are two major kinds of diagram types: structure diagrams and behavior diagrams." "Structure diagrams show the static structure of the objects… irrespective of time." "Behavior diagrams show the dynamic behavior of the objects." Its list has **14** diagram types: Activity, Class, Communication, Component, Composite Structure, Deployment, Interaction Overview, Object, Package, Profile, **State Machine** (one entry), Sequence, Timing, Use Case. — [OMG UML 2.5.1, formal/2017-12-05, Annex A](https://www.omg.org/spec/UML/2.5.1/PDF)

### Inferences
- The difference between **15** (Dennis) and **14** (OMG) comes only from Dennis splitting the state machine diagram into **behavioral** and **protocol** state machines. If an exam follows the textbook, answer 15 (7 + 8).
- Likewise, **10** UP workflows (DWT6) vs **9** RUP workflows (IBM) differ only because RUP merges "Analysis & Design." Enhanced UP = 5 phases and 12 workflows.
- Comparing UP with waterfall (DWT6 review Q29): waterfall phases are **sequential activities**; UP phases are **time periods**, each containing iterations across all workflows. Inception ≈ planning, elaboration ≈ analysis + design, construction ≈ build, transition ≈ installation.

### Gaps
- The DWT6 text gives no exact count for "workflows" (it lists them). The 10/9/12 counts are my tallies of the cited lists.

---

## 6. "AI in systems" (course theme: AI in every phase): AI as a system component, data-driven requirements, AI-augmented analysts

### Takeaway
Three framings, each backed by credible sources:
1. **AI as a system component.** An ML system is mostly non-ML code (data pipelines, serving, monitoring). It needs its own life-cycle processes (ISO/IEC 5338) and risk management (NIST AI RMF: Govern, Map, Measure, Manage).
2. **Data-driven requirements.** ML shifts development "from coding to training," so requirements must state performance metrics, data needs and new quality attributes (explainability, freedom from discrimination, legal compliance).
3. **AI-augmented analysts and developers.** Gartner: 75% of enterprise software engineers will use AI code assistants by 2028; 80% of engineers must upskill through 2027. DORA: AI raises individual productivity and code and documentation quality, but correlates with lower delivery throughput and stability unless delivery fundamentals are in place.

The textbook itself already names machine learning as an emerging technology for project identification.

### Cited Findings
**Textbook hooks**
- DWR8 names "cloud computing, Big Data, or machine learning" as emerging technologies that can create first-mover projects. — [DWR8 Ch.1, p.13](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- Technical-feasibility risk "increases dramatically when the technology itself is new (e.g., a Big Data project using Hadoop)"; it is reduced when outside expertise is available. — [DWR8 Ch.1, p.20](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)

**AI as a system component**
- ISO/IEC 5338:2023 (published 2023-12, JTC 1/SC 42) "defines a set of processes and associated concepts for describing the life cycle of AI systems based on machine learning and heuristic systems." It is "based on ISO/IEC/IEEE 15288 and ISO/IEC/IEEE 12207 with modifications and additions of AI-specific processes." Traditional software elements can use 12207/15288 processes. — [ISO/IEC 5338:2023](https://www.iso.org/standard/81118.html)
- NIST AI RMF 1.0 (released January 26, 2023) is "intended for voluntary use and to improve the ability to incorporate trustworthiness considerations into the design, development, use, and evaluation of AI products, services, and systems." Core functions: **Govern, Map, Measure, Manage**. The Generative AI Profile (NIST-AI-600-1) followed on July 26, 2024. — [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)
- Google Cloud: "MLOps is an ML engineering culture and practice that aims at unifying ML system development (Dev) and ML system operation (Ops)." "Only a small fraction of a real-world ML system is composed of the ML code"; the rest is configuration, data collection, testing, serving infrastructure, monitoring and so on. ML differs in team skills, experimental development, testing (data validation, model validation), deployment (automated retraining pipelines) and production (models degrade through data drift). Maturity: Level 0 manual; Level 1 ML pipeline automation with **continuous training**; Level 2 CI/CD pipeline automation. — [Google Cloud Architecture Center, MLOps](https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning)
- Microsoft Research (Amershi et al., ICSE 2019 SEIP track, Best Paper) studied a nine-stage ML workflow and found three fundamental differences from traditional SE:
  - data discovery, management and versioning is "much more complex and difficult";
  - model customization and reuse "require very different skills";
  - "AI components are more difficult to handle as distinct modules" because "models may be entangled in complex ways."
  - — [Amershi et al., "Software Engineering for Machine Learning: A Case Study"](https://www.microsoft.com/en-us/research/publication/software-engineering-for-machine-learning-a-case-study/)

**Data-driven requirements**
- Vogelsang & Borg (2019) found that ML development "demands requirements engineers to: (1) understand ML performance measures to state good functional requirements, (2) be aware of new quality requirements such as explainability, freedom from discrimination, or specific legal requirements, and (3) integrate ML specifics in the RE process." Also, "changes in the development paradigm, i.e., from coding to training, also demands changes in RE." — [Vogelsang & Borg, arXiv:1908.04674](https://arxiv.org/abs/1908.04674)

**AI-augmented analysts and developers**
- Gartner (11 Apr 2024): "By 2028, 75% of enterprise software engineers will use AI code assistants, up from less than 10% in early 2023." 63% of organizations were piloting, deploying or had deployed them (survey of 598 respondents, Q3 2023). "Traditional ROI frameworks steer engineering leaders toward metrics centered on cost reduction. This narrow perspective fails to capture the full value." — [Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2024-04-11-gartner-says-75-percent-of-enterprise-software-engineers-will-use-ai-code-assistants-by-2028)
- Gartner (3 Oct 2024) sees three stages. In the short term, AI brings "modest productivity increases" by augmenting existing work. In the medium term, AI agents bring "AI-native software engineering when most code will be AI-generated." In the long term comes the rise of "AI engineering." "Human expertise and creativity will always be essential." — [Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2024-10-03-gartner-says-generative-ai-will-require-80-percent-of-engineering-workforce-to-upskill-through-2027)
- DORA 2024 (Google Cloud, 23 Oct 2024):
  - **75%+** rely on AI for at least one daily responsibility; **39%** report little to no trust in AI-generated code.
  - A **25% increase in AI adoption** is associated with **+7.5% documentation quality, +3.4% code quality, +3.1% code review speed**, but **−1.5% delivery throughput and −7.2% delivery stability**.
  - — [Google Cloud blog, Announcing the 2024 DORA report](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)

  The report page summarizes: AI "increases individual productivity, flow, and job satisfaction. However, it also negatively impacts software delivery stability and throughput." — [DORA 2024](https://dora.dev/research/2024/dora-report/)
- DORA 2025 ("State of AI-assisted Software Development"): "AI's primary role is as an amplifier, magnifying an organization's existing strengths and weaknesses." It has a companion **DORA AI Capabilities Model**. — [DORA 2025 report](https://dora.dev/research/2025/dora-report/)
- Research base: a systematic review of LLMs for software engineering analyzed **395 papers (Jan 2017–Jan 2024)** across SE tasks. — [Hou et al., "Large Language Models for Software Engineering: A Systematic Literature Review," arXiv:2308.10620](https://arxiv.org/abs/2308.10620)

### Inferences
**"AI in every phase" map** (my synthesis anchored to the cited facts)

| SDLC phase | AI as a component of the system being built | AI helping the analyst/team |
|---|---|---|
| Planning | Add data availability and model risk to **technical feasibility** (new technology = higher risk, per DWR8). Value AI beyond cost cutting in **economic feasibility** (Gartner). Trust is an **organizational feasibility** risk (DORA: 39% low trust). Use NIST "Govern/Map" to frame risk. | Drafting system requests, summarizing business cases (keep human judgment; Gartner: "human expertise… essential"). |
| Analysis | Requirements gain ML performance metrics and quality attributes: explainability, non-discrimination, legal ([Vogelsang & Borg](https://arxiv.org/abs/1908.04674)). Data becomes a requirement artifact. | LLM support for elicitation notes, user stories and use-case drafts (the LLM4SE literature spans SE tasks: [Hou et al.](https://arxiv.org/abs/2308.10620)). Validate everything with stakeholders. |
| Design | Architecture must include data pipelines, serving and monitoring, since ML code is a "small fraction" ([Google](https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning)). Plan for entangled, hard-to-modularize models ([Amershi](https://www.microsoft.com/en-us/research/publication/software-engineering-for-machine-learning-a-case-study/)). Follow ISO/IEC 5338 life-cycle processes. | AI-suggested designs and diagrams, reviewed against the architecture-centric views. |
| Implementation & support | Testing adds data and model validation. Deployment means automated retraining (continuous training). Support means monitoring data drift (MLOps Levels 1–2). | Code assistants (Gartner 75% by 2028). Watch DORA's warning that AI can hurt stability unless small batches and robust testing are kept. |

- For methodology choice, AI features push projects toward **throwaway prototyping/proof-of-concept** (unfamiliar technology, unclear requirements) and then **iterative/DevOps-style delivery with MLOps** (continuous training and monitoring).

### Gaps
- Gartner's newer (2025–2026) software-engineering trend releases and the full DORA 2025 statistics (adoption %, AI Capabilities Model list) were not captured; only the landing-page summary was available.
- Hou et al.'s journal venue (reportedly ACM TOSEM) was not confirmed from the arXiv page, so cite it as an arXiv preprint.
- The nine stages of Amershi et al.'s ML workflow were not captured verbatim.
- I found no IEEE/ACM source specifically on "AI-augmented systems analysts" (as opposed to developers). The analyst-level claims above are inferences from developer-focused evidence.

---

## 7. Common exam traps (with the source that settles each)

### Takeaway
Most traps are **edition and wording mismatches** (8e vs OO 6e, textbook vs Scrum Guide/OMG), **look-alike methodologies** (prototyping vs throwaway, phased vs parallel), **feasibility wording**, and **calculation slips** (ROI vs benefit/cost ratio, BEP arithmetic).

### Cited Findings
1. **Methodologies are in Ch.2 of the 8e, not Ch.1.** Agile/Scrum get their own Ch.13. — [DWR8 TOC](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf)
2. **Number of roles**: 8e lists 6 (adds requirements analyst); OO 6e lists 5. — [DWR8 p.7](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf); [DWT6 pp.3–4](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
3. **Six skills**, not five; "ethical" and "management" are the most often forgotten. — [DWR8 p.6](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
4. **System request elements**: the text says "five elements" (sponsor, need, requirements, value, special issues), but the 8e Chapter Review says "its four main sections." Learn all five. — [DWR8 pp.15, 31](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
5. **Feasibility wording varies inside the same chapter**:
   - Economic: "Will it provide business value?" (p.11) vs "Should we build it?" (Fig. 1-7, p.21).
   - Organizational: "If we build it, will it be used?" (p.11) vs "If we build it, will they come?" (Fig. 1-7, p.27).
   - Technical: always "Can we build it?"
   - — [DWR8](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
6. **Time is not a feasibility dimension** in Dennis; it's a project-management issue. — [DWR8 p.20](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
7. **Deliverable ↔ phase**: system request and feasibility study → planning; **system proposal → analysis** (= analysis + high-level initial design); **system specification → design**; installed system → implementation. — [DWR8 Fig. 1-3](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
8. **Implementation is the longest and most expensive phase**, and testing deserves more time than coding. — [DWR8 p.12](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
9. **Most system ideas come from outside IS**; the **project sponsor** (usually business-side) completes the system request; the champion is "usually, but not always," the sponsor. — [DWR8 pp.10, 15, 28](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
10. **BPA < BPI < BPR in risk** (and in the size of organizational change). — [DWR8 pp.13–14](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
11. **ROI vs NPV**: ROI and BEP ignore the time value of money and can accept a project that NPV rejects (example: ROI 10.14% but NPV −$5,973 at 10%). — [DWR8 pp.21–23](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
12. **Calculation slips printed in the 8e excerpt** (verified arithmetic below):
    - BEP example: the book prints (41,000 − 14,000)/41,000 as "28,000/41,000 → 2.68 years," but 41,000 − 14,000 = 27,000, giving **≈2.66 years**.
    - DrōnTeq appendix: the label "ROI 143% (3,033,180 / 2,118,133)" is a benefit/cost ratio. By the book's own ROI formula, ROI = (3,033,180 − 2,118,133)/2,118,133 ≈ **43%** (the figure the text and Fig. 1-15 use).
    - — [DWR8 pp.22, 30, 36](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
13. **Prototyping vs throwaway**: the prototype becomes the system vs design prototypes are thrown away after thorough analysis. — [DWT6 pp.10–11](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
14. **RAD's subtle problem = managing user expectations** (requirements expand). — [DWT6 p.9](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
15. **OO is "most associated with a phased development RAD,"** and "virtually all agile methodologies are used in conjunction with object-oriented technologies." — [DWT6 pp.11, 14](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
16. **XP values**: the textbook gives 4 (communication, simplicity, feedback, courage); the XP site gives 5 (adds respect). XP is for ≤ 10 developers. — [DWT6 pp.14–15](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf); [extremeprogramming.org](http://www.extremeprogramming.org/values.html)
17. **Scrum, textbook vs Scrum Guide**: sprint of 30 working days vs ≤ 1 month; team ≤ 7 vs typically ≤ 10; "no designated team leader" vs Product Owner and Scrum Master accountabilities; Daily Scrum timebox of 15 minutes (Guide). — [DWT6 pp.15–16](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf); [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)
18. **DevOps vs agile/OO**: in DevOps, operations staff join the development team and deployment happens continuously ("rolling upgrade") as soon as a chunk passes tests. In agile/OO, operations deploys after a version is complete. — [DWT6 pp.16–17](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
19. **UP counts**: 4 phases; DWT6 workflows 7 engineering + 3 supporting; RUP has "nine core process workflows" (analysis & design merged); Enhanced UP adds a production phase plus operations & support and infrastructure management workflows. Project management is "the only truly cross-phase workflow." — [DWT6 pp.17–24](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf); [RUP TP026B](https://web.archive.org/web/2017/https://www.ibm.com/developerworks/rational/library/content/03July/1000/1251/1251_bestpractices_TP026B.pdf)
20. **UML count**: 15 per DWT6 (7 structure + 8 behavior) vs 14 in OMG UML 2.5.1 Annex A. OMG adopted UML in **November 1997**. — [DWT6 p.26](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf); [OMG UML 2.5.1](https://www.omg.org/spec/UML/2.5.1/PDF)
21. **Analysis answers who/what/where/when; design answers how**. Don't swap them. — [DWR8 pp.9–11](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)

### Inferences
- When a question's wording follows one book (e.g., "workplan," "UML 2.5 fifteen diagrams," "XP four values"), answer in that book's terms and, if space allows, note the primary-source variant. That shows mastery without being marked "wrong."

### Gaps
- It is unknown which book's wording Prof. Dragunov's slides follow where the two textbooks differ. The student should compare against the class slides; this note deliberately does not use them.

---

## 8. Practice questions with answers (MCQ, choose-and-justify, definitions)

### Takeaway
There are 20 items mixing recall, application and calculation. Each answer is grounded in the cited sources above; the choose-and-justify answers apply the §3 criteria table.

### Cited Findings
**Multiple choice**
1. Which phase answers *who* will use the system, *what* it will do, and *where/when* it will be used? (a) Planning (b) Analysis (c) Design (d) Implementation. **Answer: b.** — [DWR8 p.11](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
2. The collection of architecture design, interface design, database and file specifications, and program design is called the: (a) system proposal (b) system request (c) system specification (d) feasibility study. **Answer: c.** — [DWR8 p.12](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
3. Which is **not** an element of a system request? (a) business need (b) business value (c) special issues (d) technical feasibility (e) project sponsor. **Answer: d** (feasibility is a separate analysis). — [DWR8 p.15](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
4. "If we build it, will they come?" assesses: (a) technical (b) economic (c) organizational (d) schedule feasibility. **Answer: c.** — [DWR8 p.27](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
5. In which methodology are analysis, design and implementation performed **concurrently and repeatedly**, with the prototype becoming the final system? (a) Throwaway prototyping (b) Prototyping (c) Phased (d) Parallel. **Answer: b.** — [DWT6 p.10](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
6. Which role focuses on people and management issues of installation, training and resistance to change, and is most active in implementation? (a) Business analyst (b) Infrastructure analyst (c) Change management analyst (d) Project manager. **Answer: c.** — [DWT6 pp.3–4](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
7. Which UP phase is "very similar to the planning phase" and produces a vision document? **Answer: Inception.** — [DWT6 pp.18–19](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
8. The only truly cross-phase UP workflow is: (a) requirements (b) test (c) project management (d) environment. **Answer: c.** — [DWT6 p.21](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
9. Per Dennis/Tegarden, how many diagram types does UML 2.5 define? **Answer: 15** (7 structure, 8 behavior). Note that OMG Annex A lists 14 because the state machine is counted once. — [DWT6 p.26](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf); [OMG](https://www.omg.org/spec/UML/2.5.1/PDF)
10. Which is a primary extension of DevOps beyond agile approaches? (a) Pair programming (b) Including operations personnel in the development team and continuous deployment (c) 30-day sprints (d) Throwaway prototypes. **Answer: b.** — [DWT6 p.16](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
11. XP is recommended for teams of at most: (a) 5 (b) 7 (c) 10 (d) 20 developers. **Answer: c.** — [DWT6 p.15](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
12. A project has total benefits $152,000 and total costs $138,000. ROI = ? **Answer: (152,000 − 138,000)/138,000 = 10.14%.** — [DWR8 p.21](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
13. Which category of business change carries the highest risk? (a) BPA (b) BPI (c) BPR. **Answer: c.** — [DWR8 p.14](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)

**Choose and justify a methodology** (model answers apply the §3 table)

14. *A bank wants a loan-approval system using an AI document-reading service its team has never used. Some requirements are unclear, regulators demand high reliability, and there is no hard deadline.* **Answer: Throwaway prototyping.**
    - It is the only methodology rated Excellent on unfamiliar technology, and it is Excellent on unclear requirements, complex and reliable systems. Design prototypes retire the AI/technical risk before the real build.
    - Reject prototyping (Poor on unfamiliar technology and reliability) and XP (Poor on unfamiliar technology and complexity; not for mission-critical systems).
    - — [slidetodoc table](https://slidetodoc.com/system-development-methodologies-structured-design-waterfall-development-parallel/); [DWT6 pp.10–15](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
15. *A university wants a replacement course-registration system. Requirements are well understood, the system is large and must be reliable, and the rector wants something live by next semester with visible progress.* **Answer: Phased development.**
    - Good on complex and reliable; Excellent on short schedule and visibility. Version 1 = enrollment core; later versions add the rest.
    - Mitigate the "intentionally incomplete" risk by managing expectations.
    - Reject waterfall (Poor on schedule and visibility).
    - — [DWT6 p.10](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
16. *A 5-person co-located startup team must ship a customer-feedback app in 8 weeks. Requirements are vague and evolving; failures are low-impact.* **Answer: Agile (Scrum or XP).**
    - Excellent on unclear requirements and short schedule; small, jelled, co-located team; reliability needs are modest.
    - Alternative: prototyping.
    - — [DWT6 pp.13–16](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
17. *A large firm's object-oriented system has high architectural risk and multiple teams, and management wants an architecture baseline before committing the full budget.* **Answer: Unified Process / RUP.**
    - It is use-case driven, architecture-centric and iterative. The elaboration phase ends with an executable architecture baseline, the Lifecycle Architecture milestone and a commit/no-commit decision.
    - — [DWT6 pp.17–19](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf); [RUP TP026B](https://web.archive.org/web/2017/https://www.ibm.com/developerworks/rational/library/content/03July/1000/1251/1251_bestpractices_TP026B.pdf)

**Definitions** (one or two lines each, in textbook terms)

18. **Methodology**: "a formalized approach to implementing the SDLC (i.e., it is a list of steps and deliverables)." **Deliverable**: "specific documents and files that explain various elements of the system." **Gradual refinement**: each phase refines and elaborates the previous phase's deliverables. — [DWT6 p.7](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf); [DWR8 pp.9–10](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
19. **Use-case driven**: use cases are the primary modeling tool defining system behavior. **Architecture-centric**: the software architecture drives specification, construction and documentation (functional, static and dynamic views). **Iterative and incremental**: the system is built up through repeated iterations, each producing an increment, with continuous testing and refinement. — [DWT6 pp.11–12](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf)
20. **System proposal**: the analysis-phase document combining the analyses, system concept, requirements and models; it is presented to the sponsor and approval committee for a go/no-go decision. **System request**: the document describing the business reasons for building a system and the value it is expected to provide. — [DWR8 pp.11, 15](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)

### Inferences
- Likely short-answer prompts, mirroring the official end-of-chapter questions:
  - "Compare and contrast phases, steps, techniques, and deliverables."
  - "Which phase in the SDLC is most important? Why?"
  - "Compare and contrast extreme programming and throwaway prototyping."
  - "What are the primary differences between a DevOps methodology and an agile or object-oriented methodology?"
  - "Compare the phases of the Unified Process with the phases of the waterfall model."
  - — [DWT6 Questions, p.29](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf); [DWR8 Questions, p.32](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)

### Gaps
- Official test-bank answers were not consulted (they circulate only on unauthorized sites). The MCQs above are original items built from the cited text.

---

## 9. Best free (legal) resources

### Takeaway
The best free resources are the **publisher's own Chapter 1 excerpts of both textbooks** plus the 8e TOC (confirms what is in Ch.1 vs Ch.2 vs Ch.13). Add the **Wiley student companion templates** (system request, feasibility), the **Scrum Guide**, the **Agile Manifesto**, IBM's **RUP white paper**, the **OMG UML spec** (Annex A), **Microsoft Learn DevOps**, **DORA**, **SWEBOK v4**, and **NIST AI RMF / Google MLOps** for the AI theme.

### Cited Findings
- **DWR8 Chapter 1 (free official excerpt, full chapter incl. questions and minicases)** — [Wiley PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf). **8e Table of Contents** — [Wiley PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf)
- **DWR8 student companion site.** **Templates**: Word templates of Figures 1.5 (DrōnTeq system request) and 1.7 (feasibility assessment factors), plus figures 2.18, 3.7, 3.8, 4.1, 4.5, 9.19, 11.1. **Visible Analyst** CASE tutorial lessons 1–7. — [Templates](https://bcs.wiley.com/he-bcs/Books?action=resource&bcsId=12128&itemId=1119803799&resourceId=48035); [Visible Analyst lessons](https://bcs.wiley.com/he-bcs/Books?action=resource&bcsId=12128&itemId=1119803799&resourceId=48036)
- **DWT6 (OO version) Chapter 1 (free official excerpt)**: roles, SDLC, all methodologies incl. DevOps, UP and Enhanced UP, UML 2.5 diagram table. — [Wiley PDF](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf); DWT6 TOC — [Wiley PDF](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-83.pdf)
- **Scrum Guide 2020** — [scrumguides.org](https://scrumguides.org/scrum-guide.html). **Agile Manifesto** and **12 principles** — [agilemanifesto.org](https://agilemanifesto.org/), [principles](https://agilemanifesto.org/principles.html). **XP values** — [extremeprogramming.org](http://www.extremeprogramming.org/values.html)
- **IBM Rational, "Rational Unified Process: Best Practices for Software Development Teams" (TP026B; archived copy)** — [Wayback PDF](https://web.archive.org/web/2017/https://www.ibm.com/developerworks/rational/library/content/03July/1000/1251/1251_bestpractices_TP026B.pdf). **Jacobson, Booch & Rumbaugh, "The Unified Process," IEEE Software 1999** (course-reading copy with reprint permission notice) — [PDF](https://people.eecs.ku.edu/~hossein/810/Readings/rup-unified-process.pdf)
- **OMG UML 2.5.1 specification** (see Annex A, "Diagrams") — [omg.org PDF](https://www.omg.org/spec/UML/2.5.1/PDF)
- **DevOps**: [Microsoft Learn, What is DevOps?](https://learn.microsoft.com/en-us/devops/what-is-devops); [DORA metrics guide](https://dora.dev/guides/dora-metrics/); [DORA 2024 report](https://dora.dev/research/2024/dora-report/); [DORA 2025 report](https://dora.dev/research/2025/dora-report/)
- **SWEBOK v4.0** (IEEE CS; free; Agile and DevOps integrated) — [computer.org](https://www.computer.org/education/bodies-of-knowledge/software-engineering)
- **AI theme**: [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework); [Google Cloud MLOps guide](https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning); [Amershi et al. (Microsoft Research)](https://www.microsoft.com/en-us/research/publication/software-engineering-for-machine-learning-a-case-study/); [Vogelsang & Borg (arXiv)](https://arxiv.org/abs/1908.04674); [Hou et al. LLM4SE review (arXiv)](https://arxiv.org/abs/2308.10620); [ISO/IEC 5338 abstract](https://www.iso.org/standard/81118.html) (the standard itself is paid)
- Supplementary lecture: [Univ. of Strathclyde, "Software process models"](https://personal.cis.strath.ac.uk/~ir/dlss/lecture9_process.pdf) (waterfall/Royce 1970, rapid prototyping, spiral; not Dennis-specific)

### Inferences
- **Priority order for a 1-week cram**: (1) DWR8 Ch.1 excerpt for SDLC, roles, system request, feasibility, ROI/BEP/NPV; (2) DWT6 Ch.1 excerpt for methodologies, DevOps, UP, UML; (3) the §3 selection table with its worked cases; (4) Scrum Guide and Agile Manifesto for agile definitions; (5) the §6 AI framing for the course theme.

### Gaps
- No freely accessible, publisher-authorized copy of the **8e Chapter 2** (methodology options and selection table) or **Chapter 13** (Scrum) was found. The instructor companion site is password-protected.
- Third-party slide aggregators (slidetodoc) host Wiley-copyrighted decks. They were used only to corroborate the selection table and are not recommended as primary study sources.
