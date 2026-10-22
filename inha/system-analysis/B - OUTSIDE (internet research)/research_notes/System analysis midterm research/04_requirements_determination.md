# Requirements Determination: Dennis, Wixom & Roth, *Systems Analysis and Design* 8th ed. (Wiley 2021), Ch. 3. Exam-oriented outside notes (SOC3070-002 midterm, week 8: 24–30 Oct 2026)

> **Source conventions.** All sources are outside/internet sources. I used no class slides and no pirated textbook copies.
> - **DWR 8e TOC / Index**: the publisher's free table-of-contents and index PDFs, linked from Wiley's product page. They show what the 8th-ed chapter covers and on which pages. They do not give its exact wording.
> - **Wiley DWT slides (CSU)**: Wiley's official PowerPoint for the *same chapter* of the sister textbook by Dennis, Wixom & **Tegarden**, *Systems Analysis and Design with UML* 4e (© 2012). It is posted on a Cleveland State University course page. Its tables match the classic Dennis tables, but 8e wording may differ.
> - **IDS 405 notes**: a professor's lecture notes built on Dennis & Wixom (edition not stated).
> - **DWR 7e deck**: an instructor deck labelled "Dennis, Wixom & Roth 7th ed.", re-hosted on slidetodoc.com. It is a third-party re-host and seems to mix in material from other textbooks, so I used it only for points that other sources confirm or that clearly match Dennis.
> - Anything marked *(illustrative)* is a worked example I built to apply the cited rules. It is not a quote from any source.

---

## Q1. What does the DWR 8th-ed "Requirements Determination" chapter actually cover? (scope check for prioritising study)

### Takeaway
DWR 8e Chapter 3 (pp. 71–106) covers four things:
1. What a requirement is: business, user, functional, nonfunctional and system requirements; process-oriented vs information-oriented requirements; the requirements definition statement and prioritising.
2. Five elicitation techniques and how to choose between them.
3. Eight analysis techniques (problem analysis through activity elimination) and a comparison of them.
4. The DrōnTeq case, including the system proposal.

MoSCoW, the Hawthorne effect, fishbone/Ishikawa diagrams, "5 whys" and text analysis/AI do **not** appear in the 8e index. Treat them as enrichment (probably from the professor's slides or the homework) and study them after the core.

### Cited Findings
- The book is Alan Dennis, Barbara Haley Wixom & Roberta M. Roth, *Systems Analysis and Design*, 8th ed., Wiley, November 2021, ISBN 978-1-119-80378-2. New in this edition: a new Chapter 13 on Agile development (Scrum), use cases and data-flow diagrams merged into one chapter, new "Concepts in Action" features and extra minicases. — [Wiley product page](https://www.wiley.com/en-us/Systems+Analysis+and+Design%2C+8th+Edition-p-9781119803782)
- Chapter 3 "Requirements Determination" (starts p. 71), with section start pages. — [DWR 8e TOC PDF (Wiley)](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf)
  - Introduction (72); The Analysis Phase (72).
  - **Requirements Determination** (74): What Is a Requirement? (74); The Process of Determining Requirements (78); The Requirements Definition Statement (78).
  - **Requirements Elicitation Techniques** (80): Requirements Elicitation in Practice (80); Interviews (81); Joint Application Development (JAD) (88); Questionnaires (92); Document Analysis (94); Observation (96); Selecting the Appropriate Techniques (96).
  - **Requirements Analysis Strategies** (98): Problem Analysis (98); Root Cause Analysis (98); Duration Analysis (100); Activity-Based Costing (100); Informal Benchmarking (100); Outcome Analysis (101); Technology Analysis (101); Activity Elimination (102); Comparing Analysis Strategies (103).
  - **Applying the Concepts at DrōnTeq** (103): Eliciting and Analyzing Requirements (103); Requirements Definition (104); System Proposal (104).
  - Chapter Review (106).
- The 8e running case is **DrōnTeq**. Chapter 1 also contains "Project Identification and Initiation" (p. 13), "System Request" (p. 15) and "Feasibility Analysis" (p. 19). — [DWR 8e TOC PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf)
- In the 8e index, BPA (business process automation), BPI (business process improvement) and BPM (business process management) point to **p. 13**, and BPR (business process reengineering) to **pp. 14, 407**. That places them in Chapter 1, not on the Ch. 3 strategy pages (98–103). — [DWR 8e Index PDF (Wiley)](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)
- Wiley's **free official 8e Chapter 1 sample** confirms this. BPA, BPI and BPR are introduced there as kinds of projects that come out of **business process management (BPM)**, defined as "a methodology used by organizations to continuously improve end-to-end business processes". The chapter's review questions include "Compare and contrast BPA, BPI, and BPR. Which is most risky? Which has the greatest potential value?" — [DWR 8e Chapter 1 sample PDF (Wiley)](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- **The 8e analysis phase has three steps.** — [DWR 8e Chapter 1 sample PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
  1. "An analysis strategy is developed to guide the project team's efforts". It "usually includes studying the current system (called the as-is system) and its problems, and envisioning ways to design a new system (called the to-be system)".
  2. "requirements gathering (e.g., through techniques such as interviews, group workshops, or questionnaires)". This leads to "a set of requirement statements and a set of business analysis models".
  3. Everything is "combined into a document called the system proposal". The system proposal "is the initial deliverable describing the requirements the new system should satisfy".
- The 8e index entry "Requirements analysis strategies, 98–103" has these sub-entries: problem analysis 98; root cause analysis 98–100; duration analysis 100; activity-based costing 100; informal benchmarking 100–101; outcome analysis 101; technology analysis 101, 103; activity elimination 102–103. — [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)
- 8e index pages for elicitation terms. — [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)
  - Interviews 81–87: selecting interviewees and interview schedule 81; questions 82–84; preparing 84; conducting 85–86; follow-up 86; interview notes and interview report 87.
  - Question and interview types: open-ended questions 82; closed-ended questions 82–83 (also 90); probing questions 82–83; top-down, bottom-up, structured and unstructured interviews 83.
  - JAD 88–91: e-JAD/electronic JAD 88; scribes 88; facilitator defined 88; ground rules (JAD sessions) 90.
  - Questionnaires 92–94; sample (questionnaire) 92; document analysis 94–96; observation 96; breadth of information 97; user involvement in requirements determination 98.
- 8e index pages for requirement types. — [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)
  - Requirements defined 74; types of requirements 76; prioritizing 78.
  - Business requirements defined 74 ("in systems request, 75"); user requirements defined 74; functional requirements 74, 76; nonfunctional requirements 74, 77–79 (defined 74, 78); system requirements defined 74, 76.
  - Process-oriented requirements 76; information-oriented requirements 76.
  - Requirements definition statement 78–80; system proposal 11, 73, 104–106; scope creep 45, 60, 372.
- The 8e index has **no entries** for MoSCoW, Hawthorne, fishbone, Ishikawa, "five whys" or text analysis. I checked this by searching the extracted index text. — [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)
- Under JAD, the 8e index has the sub-entry **"as most common technique, 80"**. — [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)
  - By contrast, the older Wiley slides call **interviews** the "Most popular technique—if you need to know something, just ask". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
- The four nonfunctional requirement (NFR) categories come back in **Ch. 7 Architecture Design** (Operational, Performance, Security, Access Control, Cultural and Political requirements, pp. 231–241). — [DWR 8e TOC PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf)
  - Index sub-types: technical environment (231–232), portability (231–232), maintainability (232), speed (232–233), capacity (233), availability and reliability (234), access control (236–237), virus control (236), encryption and authentication (237–239), multilingual (239–240), customization (239–240), unstated norms (240), legal (241). — [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)

### Inferences
- **Study order.** Follow the 8e order: definitions → requirements definition → elicitation techniques → analysis strategies → comparison tables. In 8e the elicitation techniques come *before* the analysis strategies; the older Wiley slides put strategies first.
- **Two framings of the strategies.** 8e indexes BPA/BPI/BPR in Ch. 1 and lists the eight techniques one by one in Ch. 3, so expect both "Which technique…?" and "Which strategy (BPA/BPI/BPR)…?" questions. Memorise the mapping (sourced in Q4):
  - BPA = problem analysis + root-cause analysis.
  - BPI = duration analysis + activity-based costing + informal benchmarking.
  - BPR = outcome analysis + technology analysis + activity elimination.
- **Highest-yield items, most testable first:**
  1. Functional vs nonfunctional, and the 4 NFR types.
  2. The strategy comparison table.
  3. The technique comparison table.
  4. Interview question types and top-down vs bottom-up.
  5. JAD roles and e-JAD.
  6. Duration-analysis logic.
  7. Requirements definition vs system proposal.
- **Exam context.** 8e's running case is DrōnTeq. Older editions used other cases, so if an exam vignette mentions DrōnTeq it is 8e-based.

### Gaps
- I could access the 8e TOC, index and free Chapter 1 sample, but not the Chapter 3 text, so Ch. 3 wording and figure layouts are unverified. In particular, I could not confirm whether the 8e "Comparing Analysis Strategies" figure (p. 103) rates the eight techniques one by one or groups them as BPA/BPI/BPR, as the older Wiley slide does. p. 103 is also where the DrōnTeq case starts, so index references to "103" are ambiguous.
- I could not confirm whether DWR 8e calls JAD or interviews the "most common" technique. The index sub-entry and the older slides conflict.

---

## Q2. Requirements: the definition; business vs user vs functional vs nonfunctional (and system) requirements; the four NFR types; classification rules

### Takeaway
A requirement is "a statement of what the system must do or a characteristic it must have".
- **Functional:** a process the system performs (process-oriented) or information it must contain (information-oriented).
- **Nonfunctional:** behavioural properties. Dennis splits them into **operational, performance, security, cultural & political**.

To classify, ask whether the statement is about something the system **does or stores** (functional) or about **how fast, where, for whom, or under what rules** it does it (nonfunctional). Several slide examples look functional but are NFRs; those are favourite exam traps.

### Cited Findings
- **Requirement**: "A statement of what the system must do or a characteristic it must have". It "Will later evolve into a technical description of how the system will be implemented". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - DWR 7e deck wording: "A statement of what the system must do; or a statement of characteristics the system must have". — [DWR 7e deck (slidetodoc)](https://slidetodoc.com/chapter-3-requirements-determination-systems-analysis-and-design/)
- **Purpose of requirements determination**: "to convert high level business requirements (from the system request) into detailed requirements that can be used as inputs for creating models". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
- **Why it matters**: the slides call requirements determination "The single most critical step of the entire SDLC", note that changes can be made easily at this stage, and say "Most (>50%) system failures are due to problems with requirements". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - The IDS 405 notes agree: "more than half of all system failures are due to problems with the requirements." — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
- **Business and user requirements** are written from the businessperson's perspective and focus on the "what" of the system. — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
  - User requirements describe what users need to do to accomplish their job tasks, as part of the business's operations. — [DWR 7e deck](https://slidetodoc.com/chapter-3-requirements-determination-systems-analysis-and-design/)
  - A DWR 7e learning objective is to classify requirements as **business, user, functional, or nonfunctional**. — [DWR 7e deck](https://slidetodoc.com/chapter-3-requirements-determination-systems-analysis-and-design/)
- 8e defines **business, user, functional, nonfunctional and system requirements** from p. 74. Business requirements also appear "in systems request" (p. 75). — [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)
- **8e wording for business requirements and the system request (Ch. 1).** — [DWR 8e Chapter 1 sample PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
  - "The business need drives the high-level business requirements for the system. Business requirements describe the capabilities the system will provide the organization so that the business needs are met."
  - They "summarize the features the IS must include, such as the ability to collect customer orders online or the ability for suppliers to receive inventory status information as sales occur".
  - A **system request** usually has five elements: "project sponsor, business need, business requirements, business value, and special issues".
- **Functional requirements** "relate directly to a process the system has to perform or information it needs to contain". — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
  - Slide shorthand: "Functional: relates to a process or data; Non-functional: relates to performance or usability". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
- **The two kinds of functional requirement** (the 8e index lists both on p. 76: [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)). Examples from the [DWR 7e deck](https://slidetodoc.com/chapter-3-requirements-determination-systems-analysis-and-design/):
  - **Process-oriented**, "a process the system must perform": "The system must allow registered customers to review their own order history".
  - **Information-oriented**, information the system must contain: "The system must retain customer order history for 3 years".
- **Nonfunctional requirements** "refer to behavioral properties that the system must have, such as performance and usability". Being able to access the system through a Web browser is given as an NFR example. — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
- **The four NFR types.** — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm); [DWR 7e deck](https://slidetodoc.com/chapter-3-requirements-determination-systems-analysis-and-design/)
  - **Operational**: the physical and technical environment the system operates in.
  - **Performance**: speed, capacity and reliability.
  - **Security**: authorized access; the 7e deck adds "access restrictions, safeguards".
  - **Cultural & political**: cultural, political, organizational and legal factors.
- **Official Wiley NFR example table** (verbatim). — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)

| NFR type | Examples (verbatim from Wiley slide) |
|---|---|
| Operational | "The system should be able to fit in a pocket or purse"; "The system should be able to integrate with the existing inventory system." |
| Performance | "Any interaction between the user and the system should not exceed 2 seconds."; "The system should receive updated inventory information every 15 minutes." |
| Security | "Only direct managers can see personnel records of staff"; "Customers can see their order history only during business hours." |
| Cultural & Political | "The system should be able to distinguish between United States and European currency"; "The system shall comply with insurance industry standards." |

- 8e sub-types within the four NFR types (from Ch. 7 index entries). — [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)
  - **Operational:** technical environment, portability, maintainability.
  - **Performance:** speed, capacity, availability and reliability.
  - **Security:** access control, virus control, encryption and authentication.
  - **Cultural & political:** multilingual, customization, unstated norms, legal.
- **Other frameworks for comparison.**
  - **BABOK v3** (IIBA) classifies requirements as **business, stakeholder, solution (functional and non-functional), and transition** requirements. — [IIBA BABOK page](https://www.iiba.org/standards-and-resources/babok/)
  - **ISO/IEC/IEEE 29148:2018** defines information items: the BRS (business), StRS (stakeholder), SyRS (system) and SRS (software) requirements specifications, plus the OpsCon (operational concept). — [Modern Requirements: ISO 29148 explained](https://www.modernrequirements.com/blogs/iso-29148-explained/)
- **Why requirements are hard (classic RE view).** Christel & Kang (1992) group elicitation problems into three kinds. — [Wikipedia: Requirements elicitation](https://en.wikipedia.org/wiki/Requirements_elicitation)
  - **Scope:** "The boundary of the system is ill-defined or the customers/users specify unnecessary technical details…"
  - **Understanding:** users are unsure of their needs, miss obvious details, or give conflicting or ambiguous requirements.
  - **Volatility:** requirements change over time.
- **Dennis's "problems in requirements determination"** (Wiley slide). — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - "Analyst may not have access to the correct users".
  - "Requirements specifications may be inadequate".
  - "Some requirements may not be known in the beginning".
  - "Verifying and validating requirements can be difficult".
- **Research NFR categories (finer-grained, for comparison).** The PROMISE NFR dataset (625 requirements) uses 11 NFR classes: Availability, Legal, Look & feel, Maintainability, **Operational**, **Performance**, Scalability, **Security**, Usability, Fault tolerance, Portability. — [Alhoshan, Ferrari & Zhao 2023 (arXiv)](https://arxiv.org/abs/2302.04723)

### Inferences
**Step-by-step classification rule** (synthesised from the cited definitions):
1. Is the statement something the system must **do** (calculate, record, allow, send, display), or **data** it must keep? → **Functional**.
   - A verb about processing means **process-oriented**.
   - "Retain/store/include data X" means **information-oriented**.
2. If not, it is a quality or constraint on the system → **Nonfunctional**. Then ask which question it answers:
   - **Where / on what does it run?** Device, OS, browser, physical environment, integration with existing systems, portability, maintainability → **Operational**.
   - **How fast / how much / how often / how dependable?** Response time, throughput, number of users, data volume, update frequency, uptime, reliability → **Performance**.
   - **Who may see or do what, and how is it protected?** Access rights, authentication, encryption, virus protection → **Security**.
   - **Which laws, policies, languages, currencies, standards or norms apply?** → **Cultural & political**.
3. If one sentence mixes two kinds (e.g., "Managers can approve refunds within 2 seconds"), split it. That gives a singular requirement (see Q3).

**Trap patterns from the official examples:**
- "Integrate with the existing inventory system" sounds functional but is **operational**.
- "Receive updated inventory every 15 minutes" sounds like a process but is **performance** (frequency/timeliness).
- "Order history only during business hours" mentions time but is **security** (an access restriction).
- "Distinguish US vs European currency" sounds like a calculation but is **cultural & political**.

**Usability caveat.** Dennis's NFR definition mentions usability, but usability is not one of the four types. If an exam item is about ease of use, call it nonfunctional (usability) and justify it. If you are forced to pick one of the four, treat UI-language and localisation items as cultural & political, and device or platform items as operational. *(My judgement call; check the professor's convention.)*

**Framework mapping** *(my synthesis of the cited frameworks)*:

| Dennis (DWR) | BABOK v3 | ISO 29148 document |
|---|---|---|
| Business requirements (from the system request) | Business requirements | BRS |
| User requirements (tasks users perform) | Stakeholder requirements | StRS |
| Functional + nonfunctional (system) requirements | Solution requirements (functional / non-functional) | SyRS / SRS |
| (cut-over and conversion needs, covered in DWR implementation chapters) | Transition requirements | n/a |

**Worked classification exercise** *(illustrative; answers use the rules above)*:

| # | Requirement | Answer | Why |
|---|---|---|---|
| 1 | "Students must be able to drop a course until the end of week 2." | FR, process-oriented | a process the system performs |
| 2 | "The system must store each student's registration history for 7 years." | FR, information-oriented | data it must contain |
| 3 | "Registration pages must load in ≤3 s for 95% of requests in peak week." | NFR, performance (speed) | how fast |
| 4 | "The system must support 4,000 concurrent users." | NFR, performance (capacity) | how much |
| 5 | "The system must be available 24/7 except a 1-hour weekly maintenance window." | NFR, performance (availability/reliability) | how dependable |
| 6 | "The app must run on current Chrome, Safari and Edge and on Android/iOS phones." | NFR, operational | technical environment |
| 7 | "The system must integrate with the university's existing student-information system." | NFR, operational | mirrors the official "integrate with existing inventory system" example |
| 8 | "Only registrar staff may override a full section." | NFR, security | who may do what |
| 9 | "Passwords must be stored encrypted." | NFR, security | protection |
| 10 | "All screens must be available in Uzbek, Russian and English." | NFR, cultural & political | multilingual |
| 11 | "Personal data must be handled in accordance with national data-protection law." | NFR, cultural & political | legal |
| 12 | "The system must calculate a late-registration fee of 50,000 UZS." | FR, process-oriented | a calculation the system performs |
| 13 | "The system must email a confirmation after each successful registration." | FR, process-oriented | a system action |
| 14 | "Department heads may customise the course-catalogue layout for their faculty." | NFR, cultural & political (customization) | matches the 8e "customization requirements" sub-type |
| 15 | "The system should be easy to use." | NFR (usability), but a **badly written** requirement | not verifiable; rewrite it (Q3) |

### Gaps
- The 8e wording for "business requirement" is now verified from Ch. 1. The exact Ch. 3 (p. 74) wording for "user requirement", "system requirement" and the FR/NFR definitions is not; only their page locations are confirmed.
- Further Dennis examples I recall from older editions are **unverified** here: "available 24 hours a day, 365 days a year"; "company policy says we buy computers only from Dell"; "country managers may authorize customer user interfaces". Check them against your slides before quoting them as Dennis's.

---

## Q3. The requirements definition document, how to write good requirements, and prioritisation (MoSCoW and others)

### Takeaway
Dennis's **requirements definition (8e: "requirements definition statement")** is a plain text document that lists the functional and nonfunctional requirements in numbered outline form, grouped logically and usually prioritised. It defines the project's **scope**. Each requirement should be necessary, singular, unambiguous, verifiable, feasible, correct and complete (ISO/IEC/IEEE 29148). Prioritise with high/medium/low (Dennis) or **MoSCoW**: Must ≤ 60% of effort, about 20% Could as contingency, and Won't means "won't have **this time**".

### Cited Findings
- The **requirements definition report** is "a straightforward text report that lists the functional and nonfunctional requirements in an outline format". It is often prioritised as high/medium/low. — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
  - 8e calls it the "**Requirements definition statement** (requirements definition), 78–80" and indexes "Requirements … prioritizing, 78". — [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf); [DWR 8e TOC PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf)
- The requirements definition lists "Functional & non-functional requirements … in outline format", "May be prioritized", "Provides information needed in subsequent workflows" and "Defines the scope of the system". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - The DWR 7e deck adds that requirements are organised into logical groupings, and that the document's key purpose is to define scope: what is included and what is excluded. — [DWR 7e deck](https://slidetodoc.com/chapter-3-requirements-determination-systems-analysis-and-design/)
- **Creating a requirements definition**, per the Wiley slides. — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  1. Determine which types of FR and NFR apply.
  2. Use gathering techniques to collect details.
  3. Work with users to "verify, change and prioritize each requirement".
  4. Continue through analysis, "but be careful of scope creep".
  5. Put needed but out-of-scope items on "a list of future enhancements".
- The **system proposal** "Combines all material created in planning & analysis". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - Sections: executive summary, system request, workplan, feasibility analysis, **requirements definition**, and current models of the system.
  - In 8e it is on pp. 104–106, inside the DrōnTeq case. — [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)
- **ISO/IEC/IEEE 29148 characteristics of an individual requirement.** — table from [Lubos et al. 2024, RE'24 (arXiv)](https://arxiv.org/abs/2408.10886)
  - **Appropriate**: the level of abstraction is adequate, excludes unnecessary constraints and avoids implementation details.
  - **Complete**: all the information needed to understand it is included.
  - **Conforming**: it follows an approved standard template.
  - **Correct**: it accurately represents the need.
  - **Feasible**: it can be realised within system constraints at acceptable risk.
  - **Necessary**: it is essential and "irremovable without causing a deficiency".
  - **Singular**: it defines only one aspect.
  - **Unambiguous**: it is "clearly stated, understandable, and allows only one interpretation".
  - **Verifiable**: its fulfilment "can be proven or, in the best case, measured".
- **ISO 29148 characteristics of a requirement set**: complete, consistent, feasible, comprehensible, able to be validated. 29148 is "not a mandatory regulatory standard". — [Modern Requirements: ISO 29148 explained](https://www.modernrequirements.com/blogs/iso-29148-explained/)
- **IEEE 830-1998** (the older SRS standard) required a good SRS to be: correct, unambiguous, complete, consistent, **ranked for importance and/or stability**, verifiable, modifiable, traceable. ISO/IEC/IEEE 29148 superseded IEEE 830 in 2011 and was revised in 2018. — [Wikipedia: Software requirements specification](https://en.wikipedia.org/wiki/Software_requirements_specification)
- **"Requirements smells"** are language defects derived from ISO 29148's requirements-language criteria. ISO warns that violating those criteria gives requirements that are "often difficult or even impossible to verify or may allow for multiple interpretations". The smells, with the paper's industrial examples: — [Femmer et al., *J. Systems & Software* 2017 (arXiv)](https://arxiv.org/abs/1611.08847)
  - **Subjective language** ("user friendly, easy to use, cost effective").
  - **Ambiguous adverbs and adjectives** ("almost always, significant and minimal").
  - **Loopholes** ("As far as possible, inputs are checked…").
  - **Open-ended, non-verifiable terms** ("…with sufficient measurement accuracy").
  - **Superlatives** ("…in the highest resolution…").
  - **Comparatives** ("more exact build infos").
  - **Negative statements** ("The system must not sign off users due to timeouts").
  - **Vague pronouns**.
  - **Incomplete references**.
- **EARS** (Easy Approach to Requirements Syntax) comes from Alistair Mavin and colleagues at **Rolls-Royce** and was first published in 2009. Its templates: — [Alistair Mavin: EARS](https://alistairmavin.com/ears/)
  - **Ubiquitous**: "The <system name> shall <system response>".
  - **State-driven**: "While <precondition(s)>, the <system name> shall <system response>".
  - **Event-driven**: "When <trigger>, the <system name> shall <system response>".
  - **Optional feature**: "Where <feature is included>, the <system name> shall <system response>".
  - **Unwanted behaviour**: "If <trigger>, then the <system name> shall <system response>".
  - **Complex**: patterns combined, e.g., "While the aircraft is on ground, when reverse thrust is commanded, the engine control system shall enable reverse thrust".
- **MoSCoW** stands for **Must have, Should have, Could have, Won't have this time**. "MUST" can be read as **Minimum Usable SubseT**. — [Agile Business Consortium (DSDM)](https://www.agilebusiness.org/resource/what-is-moscow-prioritization/)
  - **Must:** "No point in delivering on target date without this; if it were not delivered, there would be no point deploying the solution".
  - **Should:** important but not vital; a workaround exists, even if it is painful.
  - **Could:** desirable, smaller impact; this is the primary contingency.
  - **Won't have this time:** explicitly out of scope for now, to manage expectations.
  - **Rule of thumb:** "no more than 60% Must Have effort", with "typically around 20% Could Have effort".
  - **Must vs Should test:** "If this requirement isn't met, do we cancel the project?"
  - **If everything is a Must:** break the requirements down further.
- **MoSCoW origin and criticism.** — [Wikipedia: MoSCoW method](https://en.wikipedia.org/wiki/MoSCoW_method)
  - Dai Clegg developed it in 1994 for rapid application development. It was "first used extensively with" DSDM from 2002.
  - The lower-case o's "do not stand for anything".
  - Criticisms: it cannot rank items within a category, gives no clear rationale for Must vs Should, leaves ambiguity about whether Won't means this release or never, and can favour new features over refactoring.
- **Kano model** (Noriaki Kano, 1980s). Feature categories: — [Wikipedia: Kano model](https://en.wikipedia.org/wiki/Kano_model)
  - **must-be (basic):** expected; absence causes dissatisfaction.
  - **one-dimensional (performance):** more is better.
  - **attractive (delighters):** unexpected; absence causes no dissatisfaction.
  - **indifferent** and **reverse**.
  - Attributes drift over time: "attributes can move from delighter to performance need and then to basic need".

### Inferences
**Requirements definition skeleton** *(illustrative, in the numbered outline style the sources describe)*:
```
Requirements Definition: Course Registration System (v0.3)
1. Functional Requirements
   1.1 Registration
       1.1.1 The system shall allow a student to add a course section that has open seats. [Priority: High / Must]
       1.1.2 The system shall allow a student to drop a course until the end of week 2.   [High / Must]
   1.2 Records
       1.2.1 The system shall retain each student's registration history for 7 years.  [Medium / Should]
2. Nonfunctional Requirements
   2.1 Operational   2.1.1 The system shall run on current Chrome, Safari and Edge.        [High / Must]
   2.2 Performance   2.2.1 95% of page loads shall complete in ≤3 s with 4,000 concurrent users. [High / Must]
   2.3 Security      2.3.1 Only registrar staff shall be able to override a full section.  [High / Must]
   2.4 Cultural & political 2.4.1 All screens shall be available in Uzbek, Russian and English. [Medium / Should]
(Out of scope / future enhancements: waitlist auto-enrolment; mobile push notifications)
```

**Good-requirement checklist** *(merged from ISO 29148, IEEE 830, the requirements smells and EARS)*:
1. **One** requirement per statement (singular). Split anything joined by "and/or".
2. **Measurable** with a number, unit and condition (verifiable). Avoid "fast", "user-friendly", "minimal", "as far as possible".
3. **Says what, not how** (appropriate: no unneeded implementation detail).
4. **Clear subject and "shall"**, with no vague "it/this".
5. **Needed and in scope** (necessary; traceable to a business requirement or the system request).
6. **Feasible** within budget, schedule and technology.
7. **Numbered and prioritised** (ranked for importance) so it can be traced and negotiated.

**Bad → good rewrites** *(illustrative)*:

| Bad (smell) | Better (verifiable) |
|---|---|
| "The system should be fast." (subjective) | "When a student submits a search, the system shall display results within 2 seconds for 95% of searches with up to 4,000 concurrent users." (EARS event-driven) |
| "The system must be user-friendly." (subjective) | "A first-time student shall be able to register for one course within 3 minutes without help in ≥90% of usability-test trials." |
| "As far as possible, inputs are validated." (loophole) | "If a student enters an invalid student ID, then the system shall display 'Student ID not found' and shall not submit the form." (EARS unwanted behaviour) |
| "The system shall support reporting and printing." (non-singular, open-ended) | Split into "The system shall generate a class roster report…" and "The system shall export the roster as PDF." |
| "The system must not log users out too quickly." (negative + vague) | "While a user is active, the system shall keep the session open for at least 30 minutes after the last interaction." (EARS state-driven) |
| "It must be secure." (vague pronoun + subjective) | "The system shall require two-factor authentication for all registrar-staff accounts." |

**MoSCoW worked example** *(illustrative numbers)*. Estimated effort for the registration system is 100 person-days.
- **Must** (55): add/drop course, prerequisite check, authentication, 3-second performance.
- **Should** (25): registration history and trilingual UI.
- **Could** (20): calendar export and seat-alert email.
- **Won't this time**: waitlist auto-enrolment.

Check: Must = 55% (≤ 60% ✓) and Could = 20% (contingency ✓). If the schedule slips, drop the Coulds first.

**Dennis vs MoSCoW.** Dennis's own scheme (per the IDS 405 notes) is high/medium/low. MoSCoW adds the explicit "Won't have this time" scope boundary, which ties directly to Dennis's warnings about scope creep and his "future enhancements" list.

### Gaps
- I could not verify other prioritisation schemes from accessible sources: the 100-point/cumulative-voting method, AHP pairwise comparison, Wiegers' value/cost/risk method, and BABOK's prioritisation approaches. Treat any description of them as unverified.
- I could not verify whether DWR 8e also prioritises by release (version 1/2/3). I recall this from older editions.
- ISO 29148's exact clause text, including its recommended statement structure (condition / subject / action / object / constraint), is behind a paywall and was not verified.

---

## Q4. Requirements analysis strategies: BPA, BPI and BPR, their techniques, how to choose one, and worked examples

### Takeaway
- **BPA** (automate the current process with minimal change) uses **problem analysis** and **root-cause analysis**.
- **BPI** (moderate change to improve efficiency and effectiveness) uses **duration analysis**, **activity-based costing** and **informal benchmarking**.
- **BPR** (radical redesign that spends little time on the as-is) uses **outcome analysis**, **technology analysis** and **activity elimination**.

Choose with Dennis's table:
- **BPA:** value low–moderate; cost low; breadth narrow; risk low–moderate.
- **BPI:** value moderate; cost low–moderate; breadth narrow–moderate; risk low–moderate.
- **BPR:** value high; cost high; breadth very broad; risk very high.

The 8e text adds that BPI carries more risk than BPA, and that BPR is rare and needs top-management support.

### Cited Findings
- **The three strategies** (Wiley slide). — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - **BPA**: "Least amount of change to the current system; Use computer technology to automate some portions".
  - **BPI**: "Moderate amount of change is required; Designed to improve efficiency of the current system".
  - **BPR**: "Most amount of change—a complete makeover; Focus is on the to-be system—little time spent on the current system". Its motto: "Out with the old and in with the new".
- **8e's own wording (Ch. 1).** — [DWR 8e Chapter 1 sample PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
  - **BPA:** "the automation of business processes [termed business process automation (BPA)] is the foundation of many information technology systems. In these situations, technology components are used to complement or substitute for manual information management processes with the goal of gaining cost efficiencies."
  - Automation alone is not always enough: "it is not always advisable to just 'pave the cow paths' by simply adding automation to speed up existing processes".
  - **BPI** "results from studying the business processes, creating new, redesigned processes to improve the process workflows, and/or utilizing new technologies enabling new process structures". The example asks whether a retail checkout could work like the EZPass toll system.
  - BPI projects "make moderate changes to the organization's operations and can improve efficiency (i.e., doing things right) and improve effectiveness (i.e., doing the right things)". They "**involve more risk than business process automation projects** since more significant changes are made".
  - **BPR** "means changing the fundamental way in which the organization operates—'obliterating' the current way of doing business and making major changes to take advantage of new ideas and new technology". BPR projects "involve substantial risk"; "Top management support and careful management are critical in these fairly rare types of projects."
  - **BPM's four steps for business analysts:**
    1. "defining and mapping the steps in a business process".
    2. "creating ways to improve on steps in the process that add value".
    3. "finding ways to eliminate or consolidate steps in the process that do not add value".
    4. "creating or adjusting electronic workflows to match the improved process maps".
- **The IDS 405 notes add:** — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
  - BPA uses technology for routine work without changing how the organisation fundamentally operates.
  - BPI makes moderate changes that exploit technology or copy competitors, and improves both **efficiency ("doing things right")** and **effectiveness ("doing right things")**.
  - BPR fundamentally restructures operations.
  - Analysis runs in three steps: understand the **as-is** system, identify improvements, then develop the **to-be** requirements.
- The DWR 7e deck groups the techniques by size of improvement. — [DWR 7e deck](https://slidetodoc.com/chapter-3-requirements-determination-systems-analysis-and-design/)
  - **Small improvements:** problem analysis and root-cause analysis.
  - **Moderate:** duration analysis, ABC and informal benchmarking.
  - **Major:** outcome analysis, technology analysis and activity elimination.
- **Problem analysis**: "Ask users to identify problems with the current system; Ask users how they would solve these problems; Good for improving efficiency or ease-of-use". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - It consists of "asking users and managers to identify problems with the as-is system". — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
- **Root-cause analysis**: "Focus is on the cause of a problem, not its solution; Create a prioritized list of problems; Try to determine their causes; Once the causes are known, solutions can be developed". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - It focuses on underlying problems, not symptoms. — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
  - The 7e deck says it traces "symptoms to their causes to discover the 'real' problem". — [DWR 7e deck](https://slidetodoc.com/chapter-3-requirements-determination-systems-analysis-and-design/)
- **Duration analysis**: a "detailed examination of the amount of time it takes to perform each process". It reveals fragmented processes that are candidates for **process integration** or **parallelization**. — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
  - Slide steps: "Determine the time required to complete each step… Compare this to the total time required for the entire process. Large differences suggest problems that might be solved by: Integrating some steps together; Performing some steps simultaneously (in parallel)". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
- **Activity-based costing (ABC)** is "same as duration analysis but applied to costs". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - It examines the cost of each step, including **direct** costs (labour, materials) and **indirect** costs (e.g., rent, depreciation, utilities). — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
- **Informal benchmarking** means studying how other organisations perform a business process in order to learn how your own can do it better. It is used especially for **customer-facing** processes. — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
  - The slide version: it "analyzes similar processes in other successful organizations". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
- **The three BPR techniques.** — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm); [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - **Outcome analysis** "focuses on understanding the fundamental outcomes that provide value to customers". In slide terms: "what does the customer want in the end?"
  - **Technology analysis**: "apply new technologies to business processes & identify benefits".
  - **Activity elimination**: "eliminate each activity in a business process in a 'force-fit' exercise".
- 8e covers these techniques on pp. 98–103. — [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)
  - In 8e the **facilitator** entry also points to p. 101 (outcome/technology analysis). That suggests the BPR-style techniques are run as facilitated group sessions.
- **Strategy selection table** (Wiley, verbatim). — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)

| | Business Process Automation | Business Process Improvement | Business Process Reengineering |
|---|---|---|---|
| Potential business value | Low–moderate | Moderate | High |
| Project cost | Low | Low–moderate | High |
| Breadth of analysis | Narrow | Narrow–moderate | Very broad |
| Risk | Low–moderate | Low–moderate | Very high |

- An older variant of the same table appears in the IDS 405 notes. — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
  - Value: BPA efficiency only / BPI moderate (efficiency and effectiveness) / BPR large potential.
  - Cost: lowest / moderate / expensive.
  - Breadth: single process / several functions / multiple major processes.
  - Risk: low–moderate / low–moderate / very high.
- **Ishikawa (fishbone, cause-and-effect) diagram.** — [Wikipedia: Ishikawa diagram](https://en.wikipedia.org/wiki/Ishikawa_diagram)
  - Created by **Kaoru Ishikawa** and popularised in the 1960s at Kawasaki shipyards. It is one of the "seven basic tools of quality control".
  - "The defect, or the problem to be solved, is shown as the fish's head, facing to the right, with the causes extending to the left as fishbones".
  - Typical category sets: the **Ms** (Manpower, Machine, Material, Method, Measurement, plus Mother Nature, Management or Maintenance); the **8 Ps** (marketing); the **Ss** (Surroundings, Suppliers, Systems, Skill, Safety) for services.
  - It is often combined with brainstorming and the 5 Whys.
- **Five whys.** — [Wikipedia: Five whys](https://en.wikipedia.org/wiki/Five_whys)
  - "an iterative interrogative technique used to explore the cause-and-effect relationships underlying a particular problem".
  - Origin: Sakichi Toyoda and Toyota. Taiichi Ohno called it "the basis of Toyota's scientific approach".
  - Criticisms: investigators may stop at symptoms; it cannot find causes the team doesn't already know; results differ between analysts; it pushes toward a single cause.
  - Teruyuki Minoura called it "too basic a tool". Alan J. Card argued the "arbitrary depth of the fifth why is unlikely to correlate with the root cause" and recommended fishbone diagrams instead.

### Inferences
**Step-by-step guides** *(synthesised from the cited definitions)*:
- **Problem analysis.** Interview or survey users and managers: "What problems do you have with the current system? How would you solve them?" Collect and group the problems, and turn the proposed fixes into to-be requirements. Expect small, incremental changes; users usually propose solutions, not causes.
- **Root-cause analysis.**
  1. Users list the problems and **prioritise** them.
  2. Starting with the most important, brainstorm **all possible causes**. A fishbone diagram helps here.
  3. Investigate the causes, most likely or easiest to check first. Ask "why?" repeatedly until you reach a cause you can act on.
  4. Write requirements that remove the cause, not the symptom.
- **Duration analysis.**
  1. Pick a typical input (e.g., one order).
  2. Measure the **total elapsed time**, start to finish.
  3. Time **each step's actual work**.
  4. Compare the total with the sum of the steps. A big gap means hand-offs, queues and fragmentation.
  5. Fix it with **process integration** (fewer people or hand-offs; one person does more steps) or **parallelization** (independent steps run at the same time).
- **ABC.** List the steps → assign **direct** costs to each step → **allocate indirect** costs (rent, utilities, depreciation) on a basis such as labour hours → total cost per step → focus improvement on the costliest steps.
- **Informal benchmarking.** Pick a customer-facing process → act as a customer of, or visit, other organisations → note what they do better → adapt it.
- **Outcome analysis.** Ask what the customer ultimately wants from the process, not what we currently produce. Redesign around that outcome.
- **Technology analysis.** List important or emerging technologies → for each one, ask systematically how it could change the process and what the benefit would be.
- **Activity elimination** is a "force-fit". For **every** activity, ask how the process would work without it and what the effects would be, even for activities that look essential.

**Worked example A: duration analysis** *(illustrative)*. Transcript requests at a university registrar.

| Step | Hands-on work time |
|---|---|
| 1. Front desk checks ID and logs the request | 5 min |
| 2. Records officer retrieves and prints the transcript | 15 min |
| 3. Dean's office signs and stamps it | 5 min |
| 4. Finance confirms the fee is paid | 5 min |
| 5. Front desk notifies the student and hands it over | 5 min |
| **Sum of steps** | **35 min** |

- **Measured average total time:** 5 working days × 8 h = 2,400 min.
- **Total ÷ sum of steps** = 2,400 / 35 ≈ **69×**.
- **Waiting/hand-off time** = 2,365 min, about **98.5%** of the elapsed time. Value-adding work is only about 1.5%.
- **Diagnosis:** 4 hand-offs across 4 units means a fragmented process.
- **To-be options:**
  - *Integration:* one student-services officer with system access does steps 1, 2 and 4, and an e-signature replaces the physical stamp.
  - *Parallelization:* the fee check (4) runs at the same time as record retrieval (2), and signature routing happens electronically in parallel.

**Worked example B: the exam-style computation** *(illustrative)*.
- **Given:** steps take 20 + 30 + 10 + 40 min; the order process takes 3 working days on average (8 h/day).
- **Sum of steps** = 100 min. **Total** = 3 × 480 = 1,440 min. **Ratio** = 14.4×.
- **Non-processing time** = 1,340 min = **93.1%**.
- **Conclusion:** the process is badly fragmented. Recommend integration and/or parallelization, and re-measure after the change.

**Worked example C: activity-based costing** *(illustrative)*. Order fulfilment. Overhead is $10 per order, allocated by labour hours ($10/h).

| Step | Direct labour | Direct materials/fees | Labour h | Allocated overhead | **Total** |
|---|---|---|---|---|---|
| A. Order entry | 0.25 h × $16 = $4.00 | $0 | 0.25 | $2.50 | **$6.50** |
| B. Credit check | 0.10 h × $30 = $3.00 | $2.00 | 0.10 | $1.00 | **$6.00** |
| C. Pick & pack | 0.40 h × $15 = $6.00 | $1.50 | 0.40 | $4.00 | **$11.50** |
| D. Invoicing | 0.25 h × $20 = $5.00 | $0 | 0.25 | $2.50 | **$7.50** |
| **Total** | $18.00 | $3.50 | 1.00 | $10.00 | **$31.50** |

Step C is about 36.5% of the cost, so target it first (e.g., barcode picking).

Note the difference: **duration analysis would flag different steps (where the waiting is), whereas ABC flags where the money goes.**

**Worked example D: root-cause analysis with fishbone and 5 whys** *(illustrative)*. Problem (the fish head): "Online orders ship late."
- **Fishbone bones:**
  - People: new staff are untrained on the picking app.
  - Methods: orders are batched once a day.
  - Machines/Technology: scanners fail, and the ERP syncs only nightly.
  - Materials/Data: inventory locations are inaccurate.
  - Measurement: order-to-ship time is not tracked.
  - Environment/Policy: the courier collects only at 3 p.m.
- **5 whys on the Data bone:**
  1. Late? → items are picked late.
  2. Why? → the system shows stock in the wrong bin.
  3. Why? → stock transfers aren't recorded.
  4. Why? → staff skip scanning on transfer.
  5. Why? → the transfer screen takes 6 steps and isn't on the handheld scanner.
- **Root cause → requirement:** "The handheld app shall record a stock transfer with ≤2 scans."
- **Contrast with problem analysis:** users would probably just ask for "faster computers", which is a solution aimed at a symptom.

**Worked examples E–H: BPI/BPR techniques** *(illustrative)*:
- **Informal benchmarking.** Registrar staff request transcripts from three other universities, posing as customers. One issues verified digital transcripts instantly through a portal, which becomes a to-be idea.
- **Outcome analysis.** A car insurer's customers don't want "a claim paid"; they want to be **driving again**. The to-be system books a repair shop and a rental car at the first notice of a claim.
- **Technology analysis.** Candidate technologies: mobile app, e-signature, QR codes, AI chatbot, open APIs. For each, ask how it changes transcript requests (e.g., e-signature removes the dean's-office stamp step).
- **Activity elimination.** "What if we eliminated the fee check?" Effects: lost revenue vs faster service, which might lead to prepaying online. "What if we eliminated the front desk?" Self-service portal. Each activity is force-fitted.

**How to choose a strategy** *(applying the table)*:
- **Pick BPA** when the budget is small, risk tolerance is low, the scope is one department or process, and management wants quick efficiency gains with minimal disruption.
- **Pick BPI** when the process is basically sound but slow or costly, or behind competitors, and moderate cross-functional change is acceptable.
- **Pick BPR** when the business faces a strategic threat or opportunity, top management sponsors radical change, the budget is high, the change spans the organisation or its suppliers and customers, and very high risk is accepted.
- Projects can **mix** strategies (e.g., BPI for most processes plus BPR for one core process).
- **Mini-cases:**
  - A clinic's booking errors → **BPA**.
  - A retailer takes 5 days vs competitors' 2 → **BPI** (duration analysis plus benchmarking).
  - A bank threatened by fintech rethinks loan origination end to end → **BPR**.

### Gaps
- The often-quoted Dennis line that total process time is "often 10 or even 100 times" the sum of the steps is from memory and **unverified** here. I used the sources' wording "large differences".
- I could not confirm whether DWR 8e itself uses fishbone diagrams or the 5 whys in its root-cause section; neither is an 8e index term. They are standard quality tools that fit Dennis's root-cause procedure.
- I could not verify Dennis's own worked examples (e.g., his insurance or stock-out cases).

---

## Q5. Requirements-gathering (elicitation) techniques: interviews, JAD, questionnaires, document analysis, observation, and how to choose

### Takeaway
- **Interviews:** deep, flexible and widely used.
- **JAD:** a facilitated group session. It is the **only technique rated "High" for integrating information** and has the highest user involvement.
- **Questionnaires:** broad and cheap, but shallow, with low response rates.
- **Document analysis:** shows the formal as-is system.
- **Observation:** checks what people actually do, but watched people behave differently (the Hawthorne-type effect).

Pick by type, depth, breadth and integration of information, user involvement, and cost, and usually **combine** techniques.

### Cited Findings
- **Why gather requirements:** to "Uncover all requirements (those uncovered late in the process are more difficult to incorporate)" and to "Build support and trust among users". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)

#### Interviews
- **Process:** — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  1. "Select people to interview & create a schedule".
  2. "Design interview questions (Open-ended, closed-ended, & probing types of questions)".
  3. "Prepare for the interview (Unstructured vs. structured interview organized in a logical order)".
  4. "Conduct the interview (Top-down vs. bottom-up)".
  5. "Follow-up after the interview".
- **Five steps and timing.** The IDS 405 notes give five steps: select interviewees (create an **interview schedule**), design the questions, prepare, conduct, and do post-interview follow-up. Write the **interview report** "advisedly within 48 hours". — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
- **Post-interview:** "Prepare notes and send to the interviewee for verification". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
- **Selecting interviewees and structure.** Interview managers early for breadth and staff for specifics, and think strategically about politically influential people. **Top-down** (broad → specific) is the most common structure; **bottom-up** goes specific → broad. — [DWR 7e deck](https://slidetodoc.com/chapter-3-requirements-determination-systems-analysis-and-design/)
- **8e pages:** interview schedule and selecting interviewees 81; questions 82–84; top-down, bottom-up, structured and unstructured interviews 83; preparing 84; conducting 85–86; follow-up 86; notes and report 87. — [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)
- **Question types** (Wiley table, verbatim). — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)

| Type | Examples |
|---|---|
| Closed-ended | "How many telephone orders are received per day?"; "**How do customers place orders?**"; "What information is missing from the monthly sales report?" |
| Open-ended | "What do you think about the current system?"; "What are some of the problems you face on a daily basis?"; "What are some of the improvements you would like to see in a new system?" |
| Probing | "Why?"; "Can you give me an example?"; "Can you explain that in a bit more detail?" |

- **Top-down vs bottom-up questioning** (Wiley figure). Top-down runs from the high level to the low level; bottom-up runs in reverse. — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - High level, very general: "How can order processing be improved?"
  - Medium level, moderately specific: "How can we reduce the number of times that customers return ordered items?"
  - Low level, very specific: "How can we reduce the number of errors in order processing (e.g., shipping the wrong products)?"

#### JAD (Joint Application Development)
- **Definition:** "an information gathering technique that allows the project team, users, and management to work together to identify requirements". — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
  - The **facilitator** "sets the meeting agenda and guides the discussion, but does not join the discussion as a participant". It is typically "10 to 20 users".
  - The facilitator's **three functions:**
    1. Keep the group to the agenda.
    2. Clarify technical jargon and analysis techniques.
    3. Record the group's input on a public display (whiteboard, flipchart, projector).
  - **Shortcomings:** reluctance to challenge superiors, and domination by a few participants. **e-JAD** uses groupware to address them.
  - The **post-session report** is completed "about a week or two after the JAD session".
- **Logistics (Wiley slide).** — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - "Joint user-analyst meeting hosted by a facilitator; 10 to 20 users; 1 to 2 scribes as needed to record the session; Usually in a specially prepared room".
  - "Meetings can be held electronically and anonymously — Reduces problems in group settings; Can be held remotely".
  - "Sessions require careful planning… Users may need to bring documents or user manuals; Ground rules should be established".
- **Character of JAD (DWR 7e deck).** JAD is an "extensive, structured group process" whose goal is to "produce complete requirements definition document". It needs a trained facilitator and a comfortable off-site facility. — [DWR 7e deck](https://slidetodoc.com/chapter-3-requirements-determination-systems-analysis-and-design/)
  - **e-JAD** tackles group-dynamics problems (dominance, status differences, fear) by allowing anonymous contribution and rating.
  - JAD reduces scope creep because participants come to understand the requirements.
- **8e pages:** JAD 88–91; e-JAD/electronic JAD 88; scribes 88; facilitator defined 88; ground rules 90. Capers Jones is cited on p. 88. — [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)
- **History and roles (general RE).** — [Wikipedia: Joint application design](https://en.wikipedia.org/wiki/Joint_application_design)
  - Arnie Lind of IBM Canada (Regina) created and named JAD in 1974. Tony Crawford and Chuck Morris of IBM formalised it in the late 1970s.
  - Roles: **executive sponsor**, **subject-matter experts/participants**, **facilitator/session leader**, **scribe/modeller** (records proceedings without contributing information) and **observers**.
  - The facilitator must make sure "all participants – not only the most vocal ones – have a chance".
  - Note on naming: the Wiley table header says "Joint Application **Design**", while DWR 8e says "Joint Application **Development**". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf); [DWR 8e TOC PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf)

#### Questionnaires
- **Basics.** A questionnaire is "A set of written questions used to obtain information from individuals", on paper or electronic. — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - **Common uses:** large numbers of people; when you need both information and opinions; people outside the organisation (customers, vendors).
  - "**Typical response rates: < 50% (paper); < 30% (Web)**".
- **Steps.** — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  1. **Select participants:** identify the population; use representative samples for large populations.
  2. **Design:** select questions carefully and remove ambiguities.
  3. **Administer:** work for a good response rate, e.g., "Offer an incentive (e.g., a free pen)".
  4. **Follow up:** send the results to participants and send a thank-you.
- **Good questionnaire design.** — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - Begin with non-threatening, interesting questions.
  - Group items into logically coherent sections.
  - Put no important items at the very end.
  - Don't crowd a page.
  - Avoid abbreviations.
  - Avoid biased or suggestive items or terms.
  - Number the questions.
  - Pretest to find confusing questions.
  - Provide anonymity.
- **IDS 405 additions.** Plan the sample to allow for non-response. Questions "should be clear and leave no room for misunderstanding — use close-ended questions". — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)

#### Document analysis
- It "Provides information about the 'as-is' system". Review technical documents and user documents (forms, reports, policy manuals). "Look for user additions to forms; Look for unused form elements". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - The IDS 405 notes add system documentation and user manuals to the list. — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)

#### Observation
- From the Wiley slide: — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - "Users/managers often don't remember everything they do".
  - It "Checks validity of information gathered in other ways".
  - "Behaviors may change when people are watched — Workers tend to be very careful when watched; Keep a low profile; Try not to interrupt or influence workers".
  - "Be careful not to ignore periodic activities — Weekly … Monthly … Annually".
- Observation usually **supplements** interviews and questionnaires. — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
- **The Hawthorne effect: evidence is contested.**
  - The original studies were at Western Electric's Hawthorne Works near Chicago, **1924–1933**. A 2014 systematic review found the evidence "inconsistent and highly heterogeneous". It concluded that "There is no single Hawthorne effect" and that "new concepts are needed", proposing the term "research participation effects". — [McCambridge, Witton & Elbourne 2014, *J Clin Epidemiol* (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC3969247/)
  - Wikipedia dates the studies **1924–1932** and attributes the term to John R. P. French (1953). Levitt & List (2011) re-analysed the original data and found only "slight evidence … but in no way as drastic as suggested initially". Richard Nisbett called the effect "a glorified anecdote". — [Wikipedia: Hawthorne effect](https://en.wikipedia.org/wiki/Hawthorne_effect)
  - The two sources disagree on the dates (1924–1933 vs 1924–1932).

#### Selecting techniques
- **Technique comparison table** (Wiley, verbatim). The slide adds: "A combination of techniques may be used; Document analysis & observation require little training; JAD sessions can be very challenging". — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)

| | Interviews | JAD | Questionnaires | Document analysis | Observation |
|---|---|---|---|---|---|
| Type of information | As-is, improvements, to-be | As-is, improvements, to-be | As-is, improvements | As-is | As-is |
| Depth of information | High | High | Medium | Low | Low |
| Breadth of information | Low | Medium | High | High | Low |
| Integration of information | Low | **High** | Low | Low | Low |
| User involvement | Medium | **High** | Low | Low | Low |
| Cost | Medium | **Low–Medium** | Low | Low | Low–Medium |

- "no one technique is always better than the others". Selection weighs the type of information, depth, breadth, integration, user involvement and cost, and most projects use several techniques. — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
- **General RE technique list.** Common elicitation techniques include interviews, questionnaires, user observation, workshops, brainstorming, use cases, role playing and prototyping. — [Wikipedia: Requirements elicitation](https://en.wikipedia.org/wiki/Requirements_elicitation)

### Inferences
**Interview playbook** *(synthesised from the cited steps)*:
1. **Select:** build an interview schedule (who, when, why). Start with managers for the big picture, then the people who do the work. Include politically important people.
2. **Design:** decide structured (fixed, specific questions; good later) or unstructured (broad; good early, for the as-is). Mix closed questions (facts and numbers), open questions (opinions, problems, ideas) and probing questions (depth).
3. **Prepare:** review background documents first (document analysis), confirm the interviewee's area of knowledge, prioritise questions in case time runs out, and send the agenda.
4. **Conduct:** build rapport, explain the purpose, go **top-down** (general → specific) unless there's a reason for bottom-up, take notes, separate facts from opinions, and check you've understood.
5. **Follow up:** write the interview report quickly (the IDS 405 notes say within 48 hours) and send it to the interviewee to verify.

**Probing-question bank** *(illustrative)*. Say an interviewee answers "The monthly sales report is useless."
- "Why is it not useful to you?"
- "Can you give me an example of a decision you couldn't make last month because of it?"
- "Can you explain in a bit more detail what's missing?"
- "What would you do with that information if you had it?"
- "Who else relies on this report?"
- "How often does this happen?"

Avoid leading questions. Change "Don't you think it should send SMS alerts?" to "How would you like to be notified about order status?"

**Interview report template** *(illustrative)*:

| Field | Content |
|---|---|
| Interviewee & role | |
| Date & analyst | |
| Purpose of interview | |
| Summary of key facts | (facts) |
| Opinions & suggested improvements | (opinions) |
| Open issues & follow-ups | |
| Verified by interviewee on | |

**JAD session plan** *(illustrative)*:
- **People:** an executive sponsor kicks off; a neutral facilitator runs the session; 1–2 scribes record; 10–20 users and managers who know the process attend; the project team mainly listens.
- **Place:** a U-shaped room with whiteboards and a projector, ideally off-site to limit interruptions. Run the session as e-JAD when participants are remote or when status differences might suppress honest input.
- **Agenda:** objectives → as-is walkthrough → problems → improvements and to-be ideas → prioritisation → open issues.
- **Ground rules:** follow the schedule; one person speaks at a time; respect other opinions; criticise ideas, not people.
- **Afterwards:** circulate the report within about 1–2 weeks.

**Handling a dominant senior manager in JAD:**
- Use the facilitator's agenda control.
- Use round-robin turns.
- Switch to anonymous e-JAD input and rating.
- Schedule a separate session or interview for that manager.

**Questionnaire error-spotting example** *(illustrative)*:
- Q1 asks "What is your salary?" (threatening at the start).
- Q2 asks "How satisfied are you with the GUI and ERP-MRP module?" (abbreviations; two questions in one).
- Q3 says "Most staff agree the current system is terrible — do you?" (biased).
- The most important question is placed last.
- There was no pretest, and responses are not anonymous.

**Choosing a technique (quick rules from the table):**
- **Need to-be ideas?** Interviews or JAD. Questionnaires can collect improvements; document analysis and observation give as-is only.
- **Need to reconcile many people's views?** JAD (high integration).
- **Need depth from a few experts?** Interviews.
- **Need breadth from hundreds of people, cheaply?** Questionnaires. For breadth from documents, use document analysis.
- **Suspect that what people say ≠ what they do?** Observation, plus document analysis (look for handwritten additions to forms).
- **Mini-cases:**
  - 3,000 alumni → questionnaire.
  - Four departments with conflicting rules → JAD.
  - Two senior underwriters' tacit rules → interviews.
  - Suspected workarounds → observation.
  - Learning the formal system before the first meeting → document analysis.

**Reducing observer reactivity:**
- Observe for longer and on several occasions, so people get used to you.
- Stay unobtrusive.
- Cross-check against documents and system logs.
- Sample the periodic peaks (weekly, monthly, annual).
- Avoid overclaiming "the Hawthorne effect" in an essay; the size of the effect is contested.

### Gaps
- **Dennis's list of JAD session problems is unverified.** From memory of older DWR editions, it is: domination, non-contributors, side discussions, agenda merry-go-round, violent agreement, unresolved conflict, true conflict, use of humour. I could not access a source to confirm it, so check it against the professor's "Requirements Determination 2" slides.
- I could not verify the often-quoted claim that "JAD can reduce scope creep by 50%". Capers Jones is cited on 8e p. 88, which suggests a statistic appears there.
- Dennis's specific tips for raising questionnaire response rates, and his exact guidance on when to use a bottom-up interview, were not verified.

---

## Q6. Text analysis and AI/NLP for requirements: extracting, validating, prioritising, detecting ambiguity or inconsistency. AI vs human requirements analysis

### Takeaway
NLP for requirements engineering ("NLP4RE") is a large research field, but industry use is thin: 404 studies, 130 tools, very few available, little long-term adoption. Current evidence supports **AI as an assistant, not a replacement**:
- LLMs can draft SRS documents about as well as **entry-level** engineers.
- Automated quality checkers find most defects (high recall) but raise many false alarms (low precision).
- Classifiers work well on small benchmark datasets but generalise less well.
- Real stakeholder elicitation, negotiation, politics and accountability remain human work.

Text analysis is **not** an index term in DWR 8e, so it is course enrichment.

### Cited Findings
- **The field overall.** Zhao et al.'s systematic mapping study in *ACM Computing Surveys* 54(3), 2021 reviewed **404 primary studies**. — [Zhao et al. (arXiv)](https://arxiv.org/abs/2004.01099)
  - "Most NLP4RE studies are solution proposals having only been evaluated using a laboratory experiment or an example application".
  - The analysis phase dominates; **detection** is the main linguistic task; requirements specifications are the most common documents studied.
  - **130 tools** were proposed, but "there is little evidence of adoption in the long term".
  - The study catalogued 140 NLP techniques, 66 NLP tools and 25 NLP resources.
- Only **17 of the 130 tools (13.08%)** are available for download. — [ACM DL record (via its abstract page)](https://dl.acm.org/doi/abs/10.1145/3444689)
- **Ambiguity and quality detection: rule-based "requirements smells".** The Smella prototype, applied to industrial and university cases, achieved "an average precision of **59%** at an average recall of **82%** with high variation". — [Femmer et al. 2017 (arXiv)](https://arxiv.org/abs/1611.08847)
  - The authors' conclusion: smell detection is "a helpful means to support quality assurance… **as a supplement to reviews**".
- **LLM-based quality assurance against ISO 29148** (Lubos et al., RE@Next! track of IEEE RE 2024). They used **Llama 2 (70B)** to judge requirements against the nine ISO characteristics, explain its decisions and propose rewrites. — [Lubos et al. 2024 (arXiv)](https://arxiv.org/abs/2408.10886)
  - **Agreement with human participants (Cohen's κ), independent assessment:** 0.40 (Stopwatch project) and 0.05 (DigitalHome project).
  - **κ after participants saw the LLM's explanation:** 0.75 and 0.22.
  - **Flaw detection, independent assessment:** precision 0.50 / 0.13; recall 0.89 / 0.74.
  - The LLM judged more requirements negatively than the humans did. On DigitalHome, humans marked 514 assessments as "fulfilled" vs the LLM's 225.
  - On Stopwatch, the LLM wrongly flagged 25 of 90 items in the independent assessment.
  - The authors' verdict: "The current capabilities of LLMs are not sufficient to fully automate this task".
  - They also cite Fantechi et al.: using ChatGPT to find conflicting requirements "cannot replace human judgment but can complement manual analysis and speed up the process".
- **LLM vs human SRS writing** (Krishna, Gaur, Verma & Jalote, RE@Next! at IEEE RE 2024). They compared **GPT-4 and CodeLlama** with **entry-level software engineers** on drafting an SRS (a university club-management system) and on finding and fixing problems in requirements, using eight criteria. — [Krishna et al. 2024 (arXiv)](https://arxiv.org/abs/2404.17842)
  - GPT-4 could "match the output quality of an entry-level software engineer" and gave useful feedback on problems.
  - CodeLlama was weaker at validation.
  - Across four use cases, LLMs could "facilitate a significant reduction in development time".
- **ChatGPT for elicitation** (Ronanki, Berger & Horkoff, SEAA 2023). Six identical questions produced 30 human-expert answers and 6 ChatGPT answers, which a separate panel of five RE experts rated on seven attributes. — [Ronanki et al. 2023 (arXiv)](https://arxiv.org/abs/2307.07381)
  - The seven attributes: abstractness, atomicity, consistency, correctness, understandability, completeness, traceability.
  - Result: "ChatGPT-generated requirements are highly Abstract, Atomic, Consistent, Correct, and Understandable".
- **Simulated users for elicitation** (Elicitron, arXiv 2024). LLM agents simulate users, who are then "interviewed". The approach "effectively mimics empathic lead user interviews, identifying a greater number of latent needs than conventional human interviews". — [Ataei et al. 2024 (arXiv)](https://arxiv.org/abs/2404.16045)
- **Classifying functional vs nonfunctional requirements.** — [Alhoshan, Ferrari & Zhao 2023 (arXiv)](https://arxiv.org/abs/2302.04723)
  - **Benchmark:** the PROMISE NFR dataset has **625 requirements (255 FR, 370 NFR, 11 NFR classes)**.
  - **Supervised, Kurtanović & Maalej (SVM):** precision and recall "up to 0.92" for FR vs NFR.
  - **Supervised, NoRBERT (fine-tuned BERT; Hey et al.):** precision 0.92, recall 0.95.
  - **Zero-shot, no training data:** F1 = **0.66** (FR/NFR), about **0.72–0.80** (frequent NFR classes) and **0.66** (security vs non-security).
  - The authors' framing: zero-shot learning addresses "the long-standing problem of data shortage in RE".
- **Guidance and outlook papers.**
  - Vogelsang & Fischbach (2024): picking and adapting an LLM for an RE task "poses a significant challenge", and using one well requires understanding both "the inner workings of LLMs" and "a systematic approach to selecting and adapting LLMs for NLP4RE tasks". — [Vogelsang & Fischbach 2024 (arXiv)](https://arxiv.org/abs/2402.13823)
  - Arora, Grundy & Abdelrazek (2023) examine LLM support across RE activities (elicitation, analysis, specification, validation) and give "key directions and SWOT analysis" for using LLMs in RE. — [Arora et al. 2023 (arXiv)](https://arxiv.org/abs/2310.13976)
- **Industry tools (vendor claims, not independent evaluations).**
  - **QVscribe** is a rule-based, deterministic scorer ("Same input, same score, every time"). It flags vague wording, passive voice, cross-referencing pronouns, immeasurable quantification, optional escape clauses, open-ended clauses, multiple or negative imperatives, and unit or glossary inconsistency, with "EARS and INCOSE conformance" built in. — [QRA Corp: QVscribe](https://qracorp.com/qvscribe/)
  - **IBM** advertises AI that can "Analyze requirements against industry standards to generate quality scores with detailed feedback and recommendations for wording improvements". — [IBM requirements quality page](https://www.ibm.com/products/requirements-quality-assistant)
- **Controlled language helps humans and machines.** EARS patterns ("While…", "When…", "If…then…", "Where…") deliberately "gently constrain textual requirements". — [Alistair Mavin: EARS](https://alistairmavin.com/ears/)

### Inferences
**What "text analysis" means in requirements work** *(my synthesis of the NLP4RE tasks above)*. It means applying NLP to requirement-related text: specifications, interview and JAD transcripts, questionnaire free-text answers, help-desk tickets, app reviews. It is used to:
1. **Extract** candidate requirements, glossary terms and actors.
2. **Classify** them (FR vs NFR; NFR type).
3. **Detect** defects: ambiguity smells, vague pronouns, conflicts, incompleteness.
4. **Trace** requirements to sources and tests.
5. **Generate** drafts or rewrites (e.g., in EARS form).
6. **Support prioritisation**, e.g., by clustering and counting how often users mention a need. Final MoSCoW decisions remain a stakeholder negotiation.

**AI vs human requirements analysis: evidence-based comparison** *(synthesis of the cited findings)*:

| Dimension | AI / NLP (evidence) | Human analyst | Verdict for the exam/homework |
|---|---|---|---|
| Drafting speed and coverage | GPT-4 drafts ≈ entry-level engineer quality, with time savings (Krishna 2024) | Slower; quality depends on experience | AI drafts, human edits and owns the result |
| Checking wording quality | High recall, low precision: Smella P 59% / R 82%; Llama 2 P 0.50 / 0.13, R 0.89 / 0.74 | Better precision and context | AI flags, human triages |
| FR/NFR classification | Supervised P/R ≈ 0.92–0.95 on a 625-item benchmark; zero-shot F1 0.66 | Uses domain context and can explain the rationale | AI does a first pass; human confirms edge cases (e.g., "integrate with existing system" = operational) |
| Elicitation | ChatGPT requirements rated abstract, atomic, consistent, correct, understandable; LLM-simulated users found more latent needs than conventional interviews in one study | Only humans reach **real** stakeholders, tacit knowledge, organisational politics, and build "support and trust" (Wiley slide) | AI to prepare questions and brainstorm; humans run interviews, JAD and observation |
| Conflicts and consistency | Can complement manual analysis but "cannot replace human judgment" (Fantechi, via Lubos) | Negotiates and resolves conflicts (JAD integration "High") | Hybrid |
| Reliability and audit | Rule-based tools are deterministic; LLM outputs can vary between runs (inference) | Accountable and can be held to sign-off | Use deterministic checks and human sign-off for contractual documents |
| Maturity and adoption | 130 research tools, only 17 downloadable, little long-term adoption | Established practice | Expect tools to assist, not decide |

**Recommended hybrid workflow, mapped onto Dennis's techniques** *(my recommendation)*:
1. **Document analysis + AI:** an LLM summarises policy manuals and forms and lists candidate requirements and glossary terms; the analyst verifies them against the sources.
2. **Interview and JAD preparation:** an LLM proposes open, closed and probing questions and simulated personas to anticipate needs. Humans conduct the real sessions; the scribe's transcript is then clustered by AI into themes.
3. **Questionnaires:** AI codes free-text answers into themes; humans check a sample of the coding.
4. **Specification:** an AI or rule-based checker flags ISO 29148 and requirements-smell issues and suggests EARS rewrites. A human accepts or rejects each finding, because low precision means many false alarms.
5. **Classification and prioritisation:** AI pre-labels FR/NFR type and groups duplicates. Stakeholders decide MoSCoW priorities.
6. **Validation:** humans review with users (walkthroughs and JAD). AI's role is consistency hints only.

**Risks to discuss in the homework** *(my reasoning, building on the cited results)*:
- **Hallucinated or "plausible" requirements** that no stakeholder asked for.
- **Anchoring and automation bias.** In Lubos et al., human–LLM agreement jumped after participants saw the LLM's explanations (κ 0.40 → 0.75). The authors read this as the LLM correcting people, but it also shows how easily reviewers can be swayed.
- **Confidentiality** of business documents sent to external AI services.
- **Small or old benchmarks**: PROMISE has 625 items.
- **Unclear accountability.**

**Homework essay skeleton: "AI vs human requirement analysis"** *(suggested)*:
- (1) **Thesis:** AI complements rather than replaces analysts.
- (2) **Where AI wins:** speed and drafting (Krishna); recall in defect detection (Femmer, Lubos); classification on benchmarks (Alhoshan citing NoRBERT).
- (3) **Where humans win:** real elicitation, trust and politics (Dennis's purpose of gathering); precision and context; conflict resolution (JAD integration).
- (4) **Evidence of the gap between research and practice** (Zhao).
- (5) **Hybrid workflow** (above).
- (6) **Conclusion and limits:** the evidence comes from 2023–2024 models and small studies.

### Gaps
- Text analysis/NLP is not an index term in DWR 8e, so I could not determine how (or whether) the professor's slides define "text analysis". Align the definition above with the slides.
- The web-search budget ran out mid-research. I could not survey 2025–2026 studies (newer LLMs, the IEEE RE 2025/2026 programmes, the NLP4RE workshop series) or find independent industrial evaluations of commercial tools (IBM, QVscribe, Jama). The vendor claims above are unverified marketing.
- The Arora et al. abstract-level summary does not list its specific SWOT items, so I have not attributed particular risks (hallucination, bias, etc.) to that paper. The risks listed above are my own reasoning.
- The Elicitron results come from LLM-*simulated* users in a preprint. I found no replication with real stakeholders.

---

## Q7. Common exam traps, practice questions with answers, and the best free resources

### Takeaway
The most testable traps come straight from the official Wiley tables and examples:
- **Operational vs performance vs security vs cultural & political NFRs**, whose examples look functional.
- **"How do customers place orders?" is classified as closed-ended.**
- **JAD's cost is "Low–Medium"** and it is the only technique rated High on integration.
- **BPA and BPI share "Low–moderate" risk.**
- **Questionnaires give as-is and improvements, but not to-be.**

Practise the duration-analysis arithmetic and writing probing questions.

### Cited Findings
**Traps confirmed by sources:**
- **The four official NFR trap examples.** — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - "integrate with the existing inventory system" = **Operational**.
  - "receive updated inventory information every 15 minutes" = **Performance**.
  - "Customers can see their order history only during business hours" = **Security**.
  - "distinguish between United States and European currency" = **Cultural & Political**.
- **The Wiley question-types table lists "How do customers place orders?" under closed-ended.** It also puts "What information is missing from the monthly sales report?" there. — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
- **Technique table traps.** — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - Only JAD is "High" for integration.
  - JAD's cost is "Low–Medium", **not** high; interviews are "Medium".
  - Questionnaires and document analysis have **High breadth**.
  - Interviews and JAD have **High depth**.
  - Document analysis and observation provide **as-is only**; questionnaires provide **as-is and improvements**.
  - Observation's cost is "Low–Medium".
- **Strategy table traps.** — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
  - BPA and BPI have the **same risk** in the table (Low–moderate). But the 8e Ch. 1 text says BPI projects "involve more risk than business process automation projects" — [DWR 8e Chapter 1 sample PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf). If asked which is riskier, answer BPI (more change) and add that the table rates both low–moderate.
  - BPI's cost is Low–moderate, not Moderate.
  - BPA's value is Low–moderate, not Low.
  - BPR is "Very broad" and "Very high" risk.
- **Typo trap.** One Wiley slide labels BPA as "Business Process **Analysis**"; the correct term is Business Process **Automation**. — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
- **ABC vs duration analysis.** Activity-based costing is "same as duration analysis but applied to costs": costs, not time. — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
- **Informal benchmarking targets customer-facing processes.** — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
- **BPR spends "little time" on the current system.** — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
- **Questionnaire response rates:** <50% for paper and <30% for Web. — [Wiley DWT slides (CSU)](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf)
- **The facilitator does not participate in the content.** — [IDS 405 notes](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm)
- **The scribe records without contributing information.** — [Wikipedia: Joint application design](https://en.wikipedia.org/wiki/Joint_application_design)
- **MoSCoW: "W" = Won't have *this time*.** The o's mean nothing, and Must should be ≤60% of effort. — [Agile Business Consortium](https://www.agilebusiness.org/resource/what-is-moscow-prioritization/); [Wikipedia: MoSCoW method](https://en.wikipedia.org/wiki/MoSCoW_method)
- **The Hawthorne effect is contested.** "There is no single Hawthorne effect". — [McCambridge et al. 2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC3969247/)
- **8e naming: "Requirements definition statement"; running case DrōnTeq.** — [DWR 8e TOC PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf); [DWR 8e Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)

**Best free (legal) resources:**
- **Wiley's own 8e PDFs:**
  - Table of contents: [Contents PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf) (exact 8e chapter structure).
  - Index: [Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf) (term → page map; check which terms are "official").
  - Sample Chapter 1: [Chapter 1 PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf). It contains the 8e's own definitions of BPM, BPA, BPI and BPR, the system request's five elements, the three analysis-phase steps and the review questions.
  - All three are linked from the [Wiley product page](https://www.wiley.com/en-us/Systems+Analysis+and+Design%2C+8th+Edition-p-9781119803782).
- **Wiley's official chapter slides** (DWT UML 4e, same tables) on a Cleveland State course page: [CIS433 ch03.pdf](https://cis.csuohio.edu/~sschung/CIS433/ch03.pdf).
- **IDS 405 lecture notes** on Dennis & Wixom: [legacy2.oyibo.com](http://legacy2.oyibo.com/notes/IDS405/4RequirementsDetermination.htm).
- **Standards and quality references:**
  - [Agile Business Consortium on MoSCoW](https://www.agilebusiness.org/resource/what-is-moscow-prioritization/).
  - [EARS](https://alistairmavin.com/ears/).
  - [ISO 29148 summary (vendor blog)](https://www.modernrequirements.com/blogs/iso-29148-explained/).
  - [Requirements Smells paper (free arXiv)](https://arxiv.org/abs/1611.08847).
- **AI/NLP for RE, all free on arXiv:**
  - [NLP4RE mapping study](https://arxiv.org/abs/2004.01099).
  - [LLM QA vs ISO 29148](https://arxiv.org/abs/2408.10886).
  - [LLMs vs entry-level engineers writing an SRS](https://arxiv.org/abs/2404.17842).
  - [ChatGPT elicitation study](https://arxiv.org/abs/2307.07381).
  - [Zero-shot FR/NFR classification](https://arxiv.org/abs/2302.04723).
- **Quality tools background:**
  - [Ishikawa diagram](https://en.wikipedia.org/wiki/Ishikawa_diagram).
  - [Five whys](https://en.wikipedia.org/wiki/Five_whys).
  - [Hawthorne effect systematic review (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC3969247/).

### Inferences
**Further traps** *(my synthesis)*:
- **Top-down vs bottom-up** is about the *order* of questions (general → specific, or the reverse). **Structured vs unstructured** is about how *fixed* the questions are. Don't mix them up.
- **Problem analysis vs root-cause analysis.** Problem analysis collects users' problems *and their proposed solutions*. Root-cause analysis deliberately postpones solutions until the causes are found.
- **Duration analysis compares two numbers:** the total elapsed time and the sum of the step times. It is not the average time per step.
- **Requirements definition vs system proposal.** The requirements definition is one *part* of the system proposal. The proposal also contains the executive summary, system request, workplan, feasibility analysis and models.
- **JAD vs interviews.** JAD integrates many views at once. An interview gives depth from one person but integration is low.
- **"Business requirement" vs "functional requirement."** "Reduce order errors by 50%" is a business requirement (a goal). "The system shall check stock before confirming an order" is a functional requirement.

**Practice questions with answers** *(illustrative; answers apply the cited material)*:

1. **Define "requirement" (Dennis) and give one process-oriented and one information-oriented functional requirement.**
   *Answer:* A statement of what the system must do or a characteristic it must have. Process-oriented: "The system must allow registered customers to review their own order history." Information-oriented: "The system must retain customer order history for 3 years."

2. **Classify each requirement:**
   - (a) "Students can drop a course until week 2."
   - (b) "Keep registration history for 7 years."
   - (c) "Pages load in ≤3 s for 95% of requests at peak."
   - (d) "Support 4,000 concurrent users."
   - (e) "Runs on Chrome, Safari, Edge and Android/iOS."
   - (f) "Only registrar staff may override a full section."
   - (g) "UI in Uzbek, Russian and English."
   - (h) "Comply with national data-protection law."

   *Answer:* (a) FR-process. (b) FR-information. (c) NFR-performance (speed). (d) NFR-performance (capacity). (e) NFR-operational. (f) NFR-security. (g) NFR-cultural & political (multilingual). (h) NFR-cultural & political (legal).

3. **Classify the four "trap" examples:** "receive updated inventory every 15 minutes"; "order history only during business hours"; "distinguish US vs European currency"; "fit in a pocket or purse".
   *Answer:* Performance; security; cultural & political; operational.

4. **Fill in Dennis's strategy table** (value, cost, breadth, risk for BPA, BPI and BPR). Then answer the official 8e Ch. 1 review question 13: "Compare and contrast BPA, BPI, and BPR. Which is most risky? Which has the greatest potential value?"
   *Answer:* BPA: low–moderate, low, narrow, low–moderate. BPI: moderate, low–moderate, narrow–moderate, low–moderate. BPR: high, high, very broad, very high. **BPR** is both the most risky and the most valuable. Between the other two, the 8e text says BPI is riskier than BPA because it makes more significant changes.

5. **Map each technique to BPA, BPI or BPR:** duration analysis, root-cause analysis, technology analysis, informal benchmarking, problem analysis, activity elimination, activity-based costing, outcome analysis.
   *Answer:* BPI, BPA, BPR, BPI, BPA, BPR, BPI, BPR.

6. **Choose a strategy:**
   - (a) A small clinic's appointment errors; tiny budget; the owner wants minimal disruption.
   - (b) A retailer ships in 5 days vs competitors' 2; it is willing to change warehouse and sales procedures.
   - (c) A bank's CEO, threatened by fintechs, wants to rethink lending end to end, including partners.

   *Answer:* (a) BPA: low cost and risk, narrow scope. (b) BPI: duration analysis plus informal benchmarking. (c) BPR: outcome and technology analysis plus activity elimination; high value, very high risk.

7. **Which BPI technique fits?**
   - (a) "Which step of claims processing consumes the most money?"
   - (b) "Why does a 2-hour job take 9 days?"
   - (c) "How do leading online stores handle returns?"

   *Answer:* (a) Activity-based costing. (b) Duration analysis. (c) Informal benchmarking.

8. **Duration analysis.** Steps take 20, 30, 10 and 40 min; the average total is 3 working days (8 h/day). Compute and interpret.
   *Answer:* Sum = 100 min. Total = 1,440 min. Ratio = 14.4×. Non-processing time = 1,340 min (93.1%). The process is fragmented (hand-offs and queues). Remedies: process integration (fewer people or hand-offs) and parallelization (run independent steps at the same time).

9. **ABC.** Using worked example C in Q4, which step should be improved first, and why might duration analysis point elsewhere?
   *Answer:* Pick & pack ($11.50, about 36.5% of $31.50). Duration analysis targets waiting time, not cost, so a cheap but slow step (e.g., approval queues) could rank first there.

10. **Root cause.** Contrast problem analysis with root-cause analysis; then name four fishbone categories and write a 5-whys chain for "students miss registration deadlines".
    *Answer:* Problem analysis asks users for problems and their solutions (incremental fixes). Root-cause analysis prioritises problems and traces causes before proposing solutions. Categories: People, Methods, Machines/Technology, Materials/Data (plus Measurement, Environment).
    Sample chain:
    1. Missed deadline? → They didn't know the date.
    2. Why? → Notices only go to the university email.
    3. Why? → Students rarely check it.
    4. Why? → It isn't linked to their phones.
    5. Why? → The system can't send SMS or push notifications.

    Requirement: "When registration opens, the system shall send SMS and app notifications to all eligible students."

11. **Label each question closed, open or probing:**
    - (a) "How many invoices do you process per day?"
    - (b) "What do you think about the current billing system?"
    - (c) "Can you give me an example?"
    - (d) "How do customers place orders?"

    *Answer:* (a) closed. (b) open. (c) probing. (d) **closed**, per the Wiley table (trap).

12. **The interviewee says "The monthly sales report is useless." Write three probing questions.**
    *Answer:* "Why is it not useful to you?" / "Can you give me an example of a decision it failed to support?" / "Can you explain in a bit more detail what information is missing?"

13. **Order these questions top-down, and explain how top-down/bottom-up differs from structured/unstructured:**
    - (i) "How can we reduce shipping-the-wrong-product errors?"
    - (ii) "How can order processing be improved?"
    - (iii) "How can we reduce customer returns?"

    *Answer:* (ii) → (iii) → (i), going from general to specific. Bottom-up is the reverse. Top-down/bottom-up is about question *order*; structured/unstructured is about how *pre-set* the questions are. Use unstructured early to learn the as-is, and structured later for specific facts. (The early/late heuristic is my synthesis, not a verified Dennis quote.)

14. **Who's who in JAD, and why use e-JAD?**
    *Answer:* The facilitator sets the agenda, keeps the group on track, explains jargon and records on a public display, without contributing content. Scribes (1–2) record everything. Users (10–20) and managers supply content. The executive sponsor gives authority. e-JAD uses groupware for anonymous, parallel input and rating, which reduces domination, status effects and fear, and it allows remote sessions.

15. **Using the technique table:** which technique is high on integration; which two are high on breadth; which two are high on depth; which give as-is only; which is "Low–Medium" cost?
    *Answer:* JAD. Questionnaires and document analysis. Interviews and JAD. Document analysis and observation. JAD and observation.

16. **Choose a technique:**
    - (a) Opinions of 3,000 alumni.
    - (b) Reconcile four departments' conflicting rules quickly, with management buy-in.
    - (c) Capture a senior underwriter's tacit decision rules.
    - (d) Clerks' descriptions differ from what the forms suggest.
    - (e) Understand the formal as-is system before meeting anyone.

    *Answer:* (a) Questionnaire. (b) JAD. (c) Interviews. (d) Observation plus document analysis (look for user additions to forms and unused fields). (e) Document analysis.

17. **Find five design errors:** the questionnaire opens with "What is your salary?"; uses "GUI/ERP/MRP" undefined; asks "Most staff hate the old system — do you agree?"; puts its key question last; is not pretested and not anonymous.
    *Answer:* A threatening opener; abbreviations; a biased or suggestive item; an important item at the end; no pretest and no anonymity. Each breaks a Wiley design rule.

18. **Observation: explain the Hawthorne-type risk and three mitigations, and say how strong the evidence is.**
    *Answer:* People behave differently, often more carefully, when watched, so the analyst may see an idealised process. Mitigations: keep a low profile and don't interrupt; observe repeatedly and over periodic peaks; triangulate with documents and logs. Evidence: the effect is real in some studies but inconsistent; a 2014 systematic review found "no single Hawthorne effect".

19. **MoSCoW plus requirement quality.** The effort estimates are Must 70, Should 20, Could 10 person-days. Is the plan safe? Then rewrite "The system should be fast and user-friendly."
    *Answer:* Must = 70% > 60%, so it is risky. Demote some Musts to Should and keep about 20% Could as contingency. Rewrite as two singular, verifiable requirements:
    - "When a user submits a search, the system shall display results within 2 s for 95% of searches."
    - "A first-time user shall complete course registration within 3 min without help in ≥90% of test trials."

20. **Short essay: should AI replace the human analyst in requirements determination?**
    *Answer outline:* No. AI is best used as an assistant.
    - **Evidence for AI:** GPT-4 drafts SRS documents at entry-level-engineer quality, with time savings. Defect detectors have high recall (82–89%).
    - **Evidence against full automation:** low precision (Smella 59%; Llama 2 0.50 and 0.13), so humans must triage. Zero-shot classification reaches only F1 0.66. Only 17 of 130 research tools are available, and adoption is limited. The authors themselves say LLMs are "not sufficient to fully automate" quality assurance. Real elicitation (JAD, interviews, observation) builds trust and resolves conflicts.
    - **Recommendation:** a hybrid workflow, as described in Q6.

### Gaps
- I could not see the professor's emphasis or the exam format (MCQ vs written). The practice set is designed to cover both styles.
- I could not verify Dennis's exact chapter-review questions or minicases for 8e. I deliberately did not use leaked or unauthorised test banks.
