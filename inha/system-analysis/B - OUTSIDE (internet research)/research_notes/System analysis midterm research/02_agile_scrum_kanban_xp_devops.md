# Agile Development: Scrum, Kanban, Extreme Programming (XP), DevOps and AI/AIOps — Exam-Oriented Outside Notes

*For SOC3070-002 System Analysis (Inha University in Tashkent, Fall 2026); the midterm is in week 8 (24–30 Oct 2026). Researched 19 Oct 2026 from outside internet sources only. Text in quotation marks is copied word for word from the linked page. Facts about the textbook come only from Wiley's free excerpts on its own site (Contents, Chapter 1, Index); no copy of the textbook was used. Worked examples, my own comparison tables and the practice questions sit under "Inferences", because they are my syntheses built on the cited definitions.*

---

## 1. Where does this week's topic sit in Dennis, Wixom & Roth (8th ed.), and how does the book's wording differ from the 2020 Scrum Guide?

### Takeaway
In the 8th edition, agile appears in two places. Chapter 2's "Project Methodology Options" covers it on pp. 42–51, with XP on p. 47. A new Chapter 13, "Agile Development Methods" (pp. 418–437), covers mostly Scrum. Kanban, DevOps and AIOps are not in the book's index, so that part of the week's material comes from lectures and outside sources. The book uses older Scrum vocabulary ("ScrumMaster", "Scrum Roles", "Product backlog grooming", "Sprint commitment", "Sprint Review (or Demo)") that the 2020 Scrum Guide replaced. Know both sets of terms.

### Cited Findings
- Edition facts: *Systems Analysis and Design, 8th Edition*, by Alan Dennis, Barbara Haley Wixom and Roberta M. Roth. E-book ISBN 978-1-119-80379-9 (October 2021); paperback ISBN 978-1-119-80378-2 (November 2021) — [Wiley product page](https://www.wiley.com/en-us/Systems+Analysis+and+Design%2C+8th+Edition-p-9781119803799)
- Wiley's "New to Edition" list: "A new chapter (Chapter 13) has been added that introduces students to Agile development, focusing specifically on the Scrum approach." — [Wiley product page](https://www.wiley.com/en-us/Systems+Analysis+and+Design%2C+8th+Edition-p-9781119803799)
- Contents, Chapter 2 "Project Selection and Management": "Project Methodology Options, 42", "Selecting the Appropriate Development Methodology, 49", "Timeboxing, 60" — [Wiley free Contents PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf)
- Contents, Chapter 13 "Agile Development Methods, 418": Introduction; Origins of Agile (419); Evolution of Agile Development (420); Adoption of the Agile Approach (421); Benefits of Agile Methods (421); Adoption of Specific Agile Methodologies (421); Scrum (422), covering Overview of Scrum (422), Scrum Characteristics (424), Scrum Roles (424), Scrum Features (426), Scrum Processes (430) and How Does Scrum End? (434); Other Types of Agile Methodologies (434): Crystal (434), Dynamic Systems Development Methodology (435), Feature Driven Development (435) and Lean Software Development (436); Comparing the SDLC with Agile Methodologies (436) — [Wiley free Contents PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf)
- Index entries for this topic: "Agile development, 47–49"; "Agile development methods, 418–437"; "Agile Manifesto, 419"; "Extreme programming (XP), 47"; "Scrum, 47, 419, 422"; "ScrumMaster, 423, 425"; "Product owner, 422, 424"; "Product backlog, 422"; "Product backlog grooming, 431–432"; "Sprint backlog, 423"; "Sprint commitment, 431"; "Sprint planning, 430–431"; "Sprint planning meeting, 423"; "Daily standup, 423"; "Scrum meetings, 432–434"; "Sprint Review (or Demo) meeting, 433"; "Sprint retrospective, 424"; "Sprints, 423, 426"; "User stories, 426–427"; "Acceptance criteria, 427–429"; "Story points, 429"; "Team velocity, 429–430"; "Paired programming, 433"; "Timeboxing, 60–61"; "Dynamic systems development methodology (DSDM), 47, 435"; under "Methodologies, 42–51": "waterfall development, 42–44, 48–49", "parallel development, 43". The index has **no** entry for Kanban, DevOps, continuous integration, test-driven development or refactoring — [Wiley free Index PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)
- The book frames the SDLC as four phases: "Building an IS using the SDLC follows a similar set of four fundamental phases: planning, analysis, design, and implementation". It adds: "In many projects, however, the project team moves through the steps consecutively, incrementally, iteratively, or in other patterns. Different projects may emphasize different parts of the SDLC or approach the SDLC phases in different ways, but all projects have elements of these four phases." — [Wiley free Chapter 1 PDF](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf)
- The 2020 Scrum Guide replaced the old terms: "There is now just one Scrum Team focused on the same objective, with three different sets of accountabilities: PO, SM, and Developers" (2020). "The Product Backlog is refined rather than groomed" (2013 change). "Development Teams do not commit to completing the work planned during a Sprint Planning Meeting. The Development Team creates a forecast of work it believes will be done" (2011 change) — [Scrum Guide revision history](https://scrumguides.org/revisions.html)

### Inferences
- **Translation table (textbook term → 2020 Scrum Guide term).**

  | Textbook term (per index/contents) | 2020 Scrum Guide term |
  |---|---|
  | ScrumMaster | Scrum Master |
  | Scrum Roles | the three "accountabilities" (Product Owner, Scrum Master, Developers) |
  | Development team / team members | Developers |
  | Product backlog grooming | Product Backlog refinement (an ongoing activity, not an event) |
  | Sprint commitment | Sprint Goal (the commitment of the Sprint Backlog); the selected items are a *forecast* |
  | Sprint Review (or Demo) meeting | Sprint Review, "a working session", not just a presentation or demo |
  | Daily standup / Scrum meeting | Daily Scrum (15 minutes, for the Developers) |

- On the exam, use the textbook's words when the question uses them. If the question quotes the Scrum Guide or says "according to the 2020 Scrum Guide", answer in 2020 terms.
- Story points, team velocity and paired programming appear in the textbook's Scrum chapter (pp. 429–433) but not in the official Scrum Guide (see Section 4). Expect the textbook to treat them as part of "doing Scrum", while the Scrum Guide calls them optional complementary practices.

### Gaps
- I could not read Dennis's actual pages on XP (p. 47), on the pros and cons of agile (pp. 47–49), the methodology-selection figure (pp. 49–50), or Chapter 13. Wiley's free excerpts cover only Contents, Chapter 1 and Index. Check those pages in the textbook or slides.
- **Unverified recollection of earlier editions (confirm against the 8th edition, p. 47, before relying on it).** Earlier Dennis/Wixom/Roth editions said XP suits small projects with highly motivated, cohesive, stable and experienced teams. They called its success doubtful on larger projects or with teams that have not "jelled" (for example, when outside contractors join). They also said XP needs a lot of discipline, that its lack of analysis and design documentation (only code documentation) makes large systems hard to maintain, and that it needs a level of on-site user involvement many business units cannot commit to. The same editions had a "Selecting the Appropriate Development Methodology" figure rating methodologies on: clarity of user requirements, familiarity with technology, system complexity, system reliability, short time schedules, and schedule visibility. I found no legitimate external copy to verify the 8th-edition wording or ratings.
- I found no syllabus or lecture page for SOC3070 itself, so I cannot confirm which AI/AIOps examples the lecturer uses.

---

## 2. The Agile Manifesto: the 4 values and 12 principles (exact wording), and agile vs plan-driven (waterfall)

### Takeaway
The Manifesto (2001) has four "X over Y" values and 12 principles. It explicitly says the right-hand items still have value, so agile is not "no documentation" or "no planning". Waterfall is a linear, sequential, plan-driven approach that suits stable, well-defined requirements. Agile is iterative and incremental, and it welcomes change.

### Cited Findings
- **Manifesto, exact text:** "We are uncovering better ways of developing software by doing it and helping others do it. Through this work we have come to value:
  **Individuals and interactions** over processes and tools
  **Working software** over comprehensive documentation
  **Customer collaboration** over contract negotiation
  **Responding to change** over following a plan
  That is, while there is value in the items on the right, we value the items on the left more." — [agilemanifesto.org](https://agilemanifesto.org/)
- The page lists 17 authors (Kent Beck, Mike Beedle, Arie van Bennekum, Alistair Cockburn, Ward Cunningham, Martin Fowler, James Grenning, Jim Highsmith, Andrew Hunt, Ron Jeffries, Jon Kern, Brian Marick, Robert C. Martin, Steve Mellor, Ken Schwaber, Jeff Sutherland, Dave Thomas), "© 2001, the above authors" — [agilemanifesto.org](https://agilemanifesto.org/)
- Origin: "On February 11-13, 2001, at The Lodge at Snowbird ski resort in the Wasatch mountains of Utah, seventeen people met..." "Representatives from Extreme Programming, SCRUM, DSDM, Adaptive Software Development, Crystal, Feature-Driven Development, Pragmatic Programming, and others sympathetic to the need for an alternative to documentation driven, heavyweight software development processes convened." — [Manifesto history (Jim Highsmith)](https://agilemanifesto.org/history.html)
- **The 12 principles, exact text** (the site lists them without numbers; numbering added here for study) — [Principles behind the Agile Manifesto](https://agilemanifesto.org/principles.html):
  1. "Our highest priority is to satisfy the customer through early and continuous delivery of valuable software."
  2. "Welcome changing requirements, even late in development. Agile processes harness change for the customer's competitive advantage."
  3. "Deliver working software frequently, from a couple of weeks to a couple of months, with a preference to the shorter timescale."
  4. "Business people and developers must work together daily throughout the project."
  5. "Build projects around motivated individuals. Give them the environment and support they need, and trust them to get the job done."
  6. "The most efficient and effective method of conveying information to and within a development team is face-to-face conversation."
  7. "Working software is the primary measure of progress."
  8. "Agile processes promote sustainable development. The sponsors, developers, and users should be able to maintain a constant pace indefinitely."
  9. "Continuous attention to technical excellence and good design enhances agility."
  10. "Simplicity--the art of maximizing the amount of work not done--is essential."
  11. "The best architectures, requirements, and designs emerge from self-organizing teams."
  12. "At regular intervals, the team reflects on how to become more effective, then tunes and adjusts its behavior accordingly."
- Waterfall: "Waterfall methodology is a linear, sequential project management approach with distinct phases and rigid progression." "It works well with projects that have well defined requirements and predictable outcomes but lacks flexibility for change." It has five stages, "(requirements, design, implementation, verification, and maintenance)". "The methodology comes from computer scientist Winston Royce's 1970 research paper on software development. Although Royce never named this model 'waterfall'..." "You must finish one phase before beginning the next." — [Atlassian, Waterfall methodology](https://www.atlassian.com/agile/project-management/waterfall-methodology)
- Scrum's stance on plan-driven work: "Scrum employs an iterative, incremental approach to optimize predictability and to control risk." Also: "In complex environments, what will happen is unknown. Only what has already happened may be used for forward-looking decision making." — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)
- In the textbook, waterfall is treated with the methodology options (index: "waterfall development, 42–44, 48–49"), and Chapter 13 ends with "Comparing the SDLC with Agile Methodologies, 436" — [Wiley Index](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf), [Wiley Contents](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf)

### Inferences
- **Agile vs plan-driven (waterfall): comparison table** (each row anchored in the sources above).

  | Dimension | Plan-driven / waterfall | Agile |
  |---|---|---|
  | Requirements | Fixed up front; "well defined requirements" | Emerge and change; "Welcome changing requirements, even late in development" |
  | Process shape | Linear and sequential; finish one phase before the next | Iterative and incremental (Sprints/iterations) |
  | Delivery | Usually one major release at the end | Frequent: "from a couple of weeks to a couple of months" |
  | Measure of progress | Phase completion, signed-off documents | "Working software is the primary measure of progress" |
  | Customer role | Heavy at requirements and acceptance | "Business people and developers must work together daily" |
  | Documentation | Comprehensive, a key deliverable | Valued, but less than working software |
  | Change cost/handling | Change is costly late; going back is hard | Change is expected; harnessed for "competitive advantage" |
  | Best fit | Stable, predictable, well-understood or regulated work | Complex, uncertain, fast-changing work |

- **Memory hook for the values (left side): "I-W-C-R" = Individuals, Working software, Customer collaboration, Responding to change.** A common distractor reverses a pair, such as "following a plan over responding to change".
- Principle 11 (2001) says "self-organizing"; the 2020 Scrum Guide says "self-managing". Both can appear on an exam.

### Gaps
- I could not retrieve Royce's 1970 paper (university mirrors returned 403 or timed out), so this note does not cover the claim that Royce criticised the pure sequential model.

---

## 3. Scrum according to the 2020 Scrum Guide: theory, values, accountabilities, events and timeboxes, artifacts and commitments, and what changed in 2020

### Takeaway
Scrum is "a lightweight framework" built on empiricism (transparency, inspection, adaptation) plus lean thinking. It has five values, three accountabilities (Product Owner, Scrum Master, Developers), five events (the Sprint contains four others) and three artifacts. Each artifact has one commitment: Product Backlog → Product Goal; Sprint Backlog → Sprint Goal; Increment → Definition of Done. The 2020 Guide (November 2020) is still the official version: scrumguides.org lists no newer revision.

### Cited Findings
**Definition and theory** — all quotes in this block from the [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)
- "Scrum is a lightweight framework that helps people, teams and organizations generate value through adaptive solutions for complex problems."
- In a nutshell: a Scrum Master fosters an environment where "A Product Owner orders the work for a complex problem into a Product Backlog. The Scrum Team turns a selection of the work into an Increment of value during a Sprint. The Scrum Team and its stakeholders inspect the results and adjust for the next Sprint. Repeat".
- "Scrum is founded on empiricism and lean thinking. Empiricism asserts that knowledge comes from experience and making decisions based on what is observed. Lean thinking reduces waste and focuses on the essentials."
- "Scrum combines four formal events for inspection and adaptation within a containing event, the Sprint. These events work because they implement the empirical Scrum pillars of transparency, inspection, and adaptation."
- Transparency: "The emergent process and work must be visible to those performing the work as well as those receiving the work." "Transparency enables inspection. Inspection without transparency is misleading and wasteful."
- Inspection: "The Scrum artifacts and the progress toward agreed goals must be inspected frequently and diligently to detect potentially undesirable variances or problems." "Inspection enables adaptation. Inspection without adaptation is considered pointless."
- Adaptation: "If any aspects of a process deviate outside acceptable limits or if the resulting product is unacceptable, the process being applied or the materials being produced must be adjusted. The adjustment must be made as soon as possible to minimize further deviation." "Adaptation becomes more difficult when the people involved are not empowered or self-managing."

**Values**
- "Successful use of Scrum depends on people becoming more proficient in living five values: Commitment, Focus, Openness, Respect, and Courage". "The Scrum Team commits to achieving its goals and to supporting each other. Their primary focus is on the work of the Sprint... The Scrum Team and its stakeholders are open about the work and the challenges. Scrum Team members respect each other to be capable, independent people... The Scrum Team members have the courage to do the right thing, to work on tough problems." — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)

**Scrum Team and accountabilities** — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)
- "The Scrum Team consists of one Scrum Master, one Product Owner, and Developers. Within a Scrum Team, there are no sub-teams or hierarchies. It is a cohesive unit of professionals focused on one objective at a time, the Product Goal."
- "Scrum Teams are cross-functional... They are also self-managing, meaning they internally decide who does what, when, and how." "...typically 10 or fewer people." Teams that grow too large should split into multiple teams that "should share the same Product Goal, Product Backlog, and Product Owner."
- "The entire Scrum Team is accountable for creating a valuable, useful Increment every Sprint. Scrum defines three specific accountabilities within the Scrum Team: the Developers, the Product Owner, and the Scrum Master."
- **Developers:** "the people in the Scrum Team that are committed to creating any aspect of a usable Increment each Sprint." They are "always accountable for: Creating a plan for the Sprint, the Sprint Backlog; Instilling quality by adhering to a Definition of Done; Adapting their plan each day toward the Sprint Goal; and, Holding each other accountable as professionals."
- **Product Owner:** "accountable for maximizing the value of the product resulting from the work of the Scrum Team." The Product Owner is also "accountable for effective Product Backlog management, which includes: Developing and explicitly communicating the Product Goal; Creating and clearly communicating Product Backlog items; Ordering Product Backlog items; and, Ensuring that the Product Backlog is transparent, visible and understood." "The Product Owner may do the above work or may delegate the responsibility to others. Regardless, the Product Owner remains accountable." "The Product Owner is one person, not a committee." "Those wanting to change the Product Backlog can do so by trying to convince the Product Owner."
- **Scrum Master:** "accountable for establishing Scrum as defined in the Scrum Guide" and "accountable for the Scrum Team's effectiveness." "Scrum Masters are true leaders who serve the Scrum Team and the larger organization."
  - Serves the Scrum Team by: "Coaching the team members in self-management and cross-functionality; Helping the Scrum Team focus on creating high-value Increments that meet the Definition of Done; Causing the removal of impediments to the Scrum Team's progress; and, Ensuring that all Scrum events take place and are positive, productive, and kept within the timebox."
  - Serves the Product Owner by: "Helping find techniques for effective Product Goal definition and Product Backlog management; Helping the Scrum Team understand the need for clear and concise Product Backlog items; Helping establish empirical product planning for a complex environment; and, Facilitating stakeholder collaboration as requested or needed."
  - Serves the organization by: "Leading, training, and coaching the organization in its Scrum adoption; Planning and advising Scrum implementations within the organization; Helping employees and stakeholders understand and enact an empirical approach for complex work; and, Removing barriers between stakeholders and Scrum Teams."

**Events and timeboxes** — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)
- "The Sprint is a container for all other events." "Events are used in Scrum to create regularity and to minimize the need for meetings not defined in Scrum." "Optimally, all events are held at the same time and place to reduce complexity."

  | Event | Purpose (exact) | Timebox (for a one-month Sprint) | Who |
  |---|---|---|---|
  | Sprint | "Sprints are the heartbeat of Scrum, where ideas are turned into value." | "fixed length events of one month or less"; "A new Sprint starts immediately after the conclusion of the previous Sprint." | Whole Scrum Team |
  | Sprint Planning | "initiates the Sprint by laying out the work to be performed for the Sprint" | "a maximum of eight hours for a one-month Sprint" | Entire Scrum Team (may invite advisers) |
  | Daily Scrum | "to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary, adjusting the upcoming planned work" | "a 15-minute event", "held at the same time and place every working day of the Sprint" | "for the Developers of the Scrum Team" |
  | Sprint Review | "to inspect the outcome of the Sprint and determine future adaptations" | "a maximum of four hours for a one-month Sprint"; "the second to last event of the Sprint" | Scrum Team + "key stakeholders" |
  | Sprint Retrospective | "to plan ways to increase quality and effectiveness" | "a maximum of three hours for a one-month Sprint"; "concludes the Sprint" | Scrum Team |

- For each shorter Sprint, "the event is usually shorter."
- During the Sprint: "No changes are made that would endanger the Sprint Goal; Quality does not decrease; The Product Backlog is refined as needed; and, Scope may be clarified and renegotiated with the Product Owner as more is learned."
- "A Sprint could be cancelled if the Sprint Goal becomes obsolete. Only the Product Owner has the authority to cancel the Sprint."
- Forecasting: "Various practices exist to forecast progress, like burn-downs, burn-ups, or cumulative flows. While proven useful, these do not replace the importance of empiricism."
- Sprint Planning has three topics. "Topic One: Why is this Sprint valuable?" (the whole Scrum Team defines a Sprint Goal; "The Sprint Goal must be finalized prior to the end of Sprint Planning"). "Topic Two: What can be Done this Sprint?" ("Through discussion with the Product Owner, the Developers select items from the Product Backlog"). "Topic Three: How will the chosen work get done?" (work is "often done by decomposing Product Backlog items into smaller work items of one day or less. How this is done is at the sole discretion of the Developers.")
- Daily Scrum: "If the Product Owner or Scrum Master are actively working on items in the Sprint Backlog, they participate as Developers." "The Developers can select whatever structure and techniques they want, as long as their Daily Scrum focuses on progress toward the Sprint Goal and produces an actionable plan for the next day of work." "Daily Scrums improve communications, identify impediments, promote quick decision-making, and consequently eliminate the need for other meetings." "The Daily Scrum is not the only time Developers are allowed to adjust their plan."
- Sprint Review: "The Scrum Team presents the results of their work to key stakeholders and progress toward the Product Goal is discussed." "The Product Backlog may also be adjusted to meet new opportunities. The Sprint Review is a working session and the Scrum Team should avoid limiting it to a presentation."
- Sprint Retrospective: "The Scrum Team inspects how the last Sprint went with regards to individuals, interactions, processes, tools, and their Definition of Done." "The most impactful improvements are addressed as soon as possible. They may even be added to the Sprint Backlog for the next Sprint."

**Artifacts and their commitments** — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)
- "Each artifact contains a commitment... For the Product Backlog it is the Product Goal. For the Sprint Backlog it is the Sprint Goal. For the Increment it is the Definition of Done."

  | Artifact | Definition (exact) | Commitment | Commitment definition (exact) |
  |---|---|---|---|
  | Product Backlog | "an emergent, ordered list of what is needed to improve the product. It is the single source of work undertaken by the Scrum Team." | Product Goal | "describes a future state of the product which can serve as a target for the Scrum Team to plan against"; "the long-term objective for the Scrum Team. They must fulfill (or abandon) one objective before taking on the next." |
  | Sprint Backlog | "composed of the Sprint Goal (why), the set of Product Backlog items selected for the Sprint (what), as well as an actionable plan for delivering the Increment (how)"; "a plan by and for the Developers" | Sprint Goal | "the single objective for the Sprint"; "created during the Sprint Planning event and then added to the Sprint Backlog" |
  | Increment | "a concrete stepping stone toward the Product Goal. Each Increment is additive to all prior Increments and thoroughly verified"; "the Increment must be usable." | Definition of Done | "a formal description of the state of the Increment when it meets the quality measures required for the product." |

- "The moment a Product Backlog item meets the Definition of Done, an Increment is born." "If a Product Backlog item does not meet the Definition of Done, it cannot be released or even presented at the Sprint Review. Instead, it returns to the Product Backlog for future consideration."
- "Multiple Increments may be created within a Sprint." "The Sprint Review should never be considered a gate to releasing value."
- If the DoD is an organizational standard, "all Scrum Teams must follow it as a minimum"; otherwise "the Scrum Team must create a Definition of Done appropriate for the product." Multiple teams on one product "must mutually define and comply with the same Definition of Done."
- Refinement: "Product Backlog refinement is the act of breaking down and further defining Product Backlog items into smaller more precise items. This is an ongoing activity to add details, such as a description, order, and size." "The Developers who will be doing the work are responsible for the sizing." Items that can be Done within one Sprint "are deemed ready for selection in a Sprint Planning event."
- Immutability: "The Scrum framework, as outlined herein, is immutable. While implementing only parts of Scrum is possible, the result is not Scrum."
- History: "Ken Schwaber and Jeff Sutherland first co-presented Scrum at the OOPSLA Conference in 1995." "We wrote the first version of the Scrum Guide in 2010."

**What changed in 2020** — [Scrum Guide revision history](https://scrumguides.org/revisions.html); 2017 wording from the [2017 Scrum Guide PDF](https://scrumguides.org/docs/scrumguide/v2017/2017-Scrum-Guide-US.pdf)
- 2020 change list (exact headings): "Even Less Prescriptive" (e.g., "removed Daily Scrum questions"); "One Team, Focused on One Product" ("eliminate the concept of a separate team within a team"); "Introduction of Product Goal"; "A Home for Sprint Goal, Definition of Done, and Product Goal" ("Each of the three artifacts now contain 'commitments'"); "Self-Managing over Self-Organizing" ("choosing who, how, and what to work on"); "Three Sprint Planning Topics" (adds "Why"); "Overall Simplification of Language for a Wider Audience" ("The Scrum Guide is now less than 13 pages").

  | Topic | 2017 Scrum Guide (exact) | 2020 Scrum Guide (exact) |
  |---|---|---|
  | Team | "The Scrum Team consists of a Product Owner, the Development Team, and a Scrum Master." | "one Scrum Master, one Product Owner, and Developers... no sub-teams or hierarchies" |
  | Size | "Fewer than three Development Team members decrease interaction... Having more than nine members requires too much coordination." | "typically 10 or fewer people" (whole Scrum Team) |
  | Self-… | "Scrum Teams are self-organizing and cross-functional." | "self-managing, meaning they internally decide who does what, when, and how" |
  | Daily Scrum | "a 15-minute time-boxed event for the Development Team"; example three questions ("What did I do yesterday...") | "a 15-minute event for the Developers"; "whatever structure and techniques they want" |
  | Scrum Master | "a servant-leader"; "Removing impediments to the Development Team's progress" | "true leaders who serve"; "Causing the removal of impediments to the Scrum Team's progress" |
  | Refinement | "Refinement usually consumes no more than 10% of the capacity of the Development Team." | "an ongoing activity" (no percentage) |
  | Increment | "potentially releasable" | "must be usable"; multiple Increments per Sprint allowed |

- Older changes that still show up as traps: 2011: "Scrum does not mandate a burn-down chart to monitor progress"; "The Product Backlog is 'ordered,' instead of 'prioritized'"; "Removed the reference to chickens and pigs". 2013: "The Product Backlog is refined rather than groomed"; Daily Scrum "Too often it is seen as a status event." — [Scrum Guide revision history](https://scrumguides.org/revisions.html)

### Inferences
- **"Who is accountable for X?" cheat table** (derived from the quotes above).

  | Activity | Accountable / does it (2020) |
  |---|---|
  | Maximizing product value; Product Goal; creating, communicating and **ordering** PBIs | Product Owner (can delegate the work but remains accountable) |
  | **Sizing/estimating** PBIs | Developers ("who will be doing the work") |
  | Defining the **Sprint Goal** | Whole Scrum Team (PO proposes how value can increase) |
  | Selecting PBIs for the Sprint | Developers, through discussion with the PO |
  | Creating the Sprint Backlog plan; deciding *how* | Developers ("sole discretion") |
  | Quality / adhering to the DoD | Developers |
  | Creating the DoD when there is no organizational standard | Scrum Team |
  | Cancelling a Sprint | Product Owner only |
  | Timeboxes kept; events happen; removal of impediments; coaching | Scrum Master ("causing the removal", not necessarily doing it personally) |
  | A valuable, useful Increment every Sprint | Entire Scrum Team |
  | Daily Scrum | Developers (PO/SM take part as Developers only if they work on Sprint Backlog items) |

- **Order of events inside a Sprint:** Sprint Planning → Daily Scrums (with work and refinement during the Sprint) → Sprint Review ("second to last") → Sprint Retrospective ("concludes the Sprint") → the next Sprint starts immediately.
- **Counting trap:** Scrum has five events (the Sprint plus four inside it), three accountabilities, three artifacts, three commitments, three pillars and five values. Refinement is **not** an event.
- **Timeboxes for shorter Sprints:** the Guide gives maxima only for a one-month Sprint and says shorter Sprints' events are "usually shorter". Scaling proportionally (two-week Sprint → about 4 h planning, 2 h review, 1.5 h retrospective) is a common rule of thumb, not a Guide rule. The Daily Scrum stays 15 minutes whatever the Sprint length.

### Gaps
- The Scrum Guide prescribes no Sprint length below "one month or less", no timebox for refinement, and no "Sprint 0", "hardening Sprint" or release planning. If a lecture or the textbook uses these, they come from outside the Guide (from my full read of the 2020 text).

---

## 4. Practices around Scrum (user stories, INVEST, acceptance criteria, story points, planning poker, velocity, burndown/burnup, refinement): which are official, plus worked examples

### Takeaway
Only Product Backlog refinement is in the 2020 Scrum Guide. Burn-downs and burn-ups are mentioned there only as optional forecasting practices. User stories (with INVEST, the "As a… I want… so that…" template and acceptance criteria), story points, planning poker and velocity come from XP and the wider agile community. Scrum.org itself calls velocity "optional". The textbook covers several of these in its Scrum chapter.

### Cited Findings
- **Status of these terms:** Scrum.org's glossary says: "Some of the mentioned terms are not mandatory in Scrum, but have been added because they are commonly used in Scrum." — [Scrum.org Scrum Glossary](https://www.scrum.org/resources/scrum-glossary) (read via the [8 Jan 2026 Web Archive copy](https://web.archive.org/web/20260108070917/https://www.scrum.org/resources/scrum-glossary))
- **Velocity:** "an optional, but often used, indication of the amount of Product Backlog turned into an Increment of product during a Sprint by a Scrum Team, tracked by the Developers for use within the Scrum Team." — [Scrum.org Scrum Glossary](https://www.scrum.org/resources/scrum-glossary)
- **Burn-down chart:** "a chart which shows the amount of work which is thought to remain in a backlog. Time is shown on the horizontal axis and work remaining on the vertical axis... The amount of work may be assessed in any of several ways such as user story points or task hours." **Burn-up chart:** "a chart which shows the amount of work which has been completed... The amount of work considered to be in-scope may also be plotted as a line; the burn-up can be expected to approach this line as work is completed." — [Scrum.org Scrum Glossary](https://www.scrum.org/resources/scrum-glossary)
- **Scrum Board:** "Scrum boards are an optional implementation within Scrum to make information visible." **Ready:** "a shared understanding by the Product Owner and the Developers regarding the preferred level of description of Product Backlog items introduced at Sprint Planning." **Technical Debt:** "the typically unpredictable overhead of maintaining the product, often caused by less than ideal design decisions" — [Scrum.org Scrum Glossary](https://www.scrum.org/resources/scrum-glossary)
- The Scrum Guide mentions "burn-downs, burn-ups, or cumulative flows" only as forecasting practices that "do not replace the importance of empiricism" — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html). 2011 change: "Scrum does not mandate a burn-down chart to monitor progress." — [Scrum Guide revision history](https://scrumguides.org/revisions.html)
- **User stories, origin and definition:** "In consultation with the customer or product owner, the team divides up the work to be done into functional increments called 'user stories.'" Timeline: Kent Beck introduced user stories in Extreme Programming (1998–1999); the role-feature-benefit template ("As a [role], I want [feature], so that [benefit]") came from Connextra in 2001 (Rachel Davies and others); Ron Jeffries proposed the "3 C's" in 2001; Bill Wake created INVEST in 2003; Mike Cohn's *User Stories Applied* (2004) popularized the practice — [Agile Alliance glossary: User Stories](https://www.agilealliance.org/glossary/user-stories/) (read via a summarizing fetch tool; wording paraphrased except the quoted definition)
- **Template and the 3 C's:** "A user story is a short description of desired functionality told from the perspective of someone who wants or needs that functionality." Template: "As a [type of user], I [need/want/am required] to [do something], so that [reason or benefit]." Example: "As a conference attendee, I need to filter sessions by topic so that I can quickly find the sessions most relevant to me." "Ron Jeffries described user stories with three words: card, conversation, and confirmation." "The confirmation is how the team knows the story is complete. This might be expressed as acceptance criteria, examples, tests, sketches, rules, or notes..." Example acceptance criteria for "save sessions to a personal agenda": "A logged-in attendee can add a session to a personal agenda"; "The attendee can remove a saved session"; "If two saved sessions occur at the same time, the attendee is warned of the conflict." — [Mountain Goat Software (Mike Cohn), User Stories](https://www.mountaingoatsoftware.com/agile/user-stories)
- **INVEST (Bill Wake, 17 Aug 2003):** "I – Independent, N – Negotiable, V – Valuable, E – Estimable, S – Small, T – Testable." Independent: "we'd like to be able to schedule and implement them in any order." Negotiable: "It is not an explicit contract for features; rather, details will be co-created by the customer and programmer during development." Valuable: "it needs to be valuable to the customer." Estimable: "We don't need an exact estimate, but just enough to help the customer rank and schedule the story's implementation." Small: "Stories typically represent at most a few person-weeks worth of work." Testable: "Writing a story card carries an implicit promise: 'I understand what I want well enough that I could write a test for it.'" — [Bill Wake, "INVEST in Good Stories, and SMART Tasks"](https://xp123.com/invest-in-good-stories-and-smart-tasks/)
- **Given-When-Then acceptance criteria:** "Given-When-Then is a style of representing tests... developed by Daniel Terhorst-North and Chris Matts as part of Behavior-Driven Development (BDD)." "The given part describes the state of the world before you begin the behavior... The when section is that behavior that you're specifying. Finally the then section describes the changes you expect due to the specified behavior." — [Martin Fowler, GivenWhenThen](https://martinfowler.com/bliki/GivenWhenThen.html)
- **Story points:** "Story points are the most common unit of measure used for estimating the effort involved in implementing a user story or resolving an issue." — [Choetkiertikul et al., "A deep learning model for estimating story points" (arXiv)](https://arxiv.org/abs/1609.00489). Example: a login screen story might get "a story point value of 3", while "Integrating a complex payment gateway could receive a value of 8 due to higher complexity and potential risks." — [Atlassian, Velocity in Scrum](https://www.atlassian.com/agile/project-management/velocity-scrum)
- **Planning poker:** "Planning Poker is a consensus-based estimating technique. It is most often used with story points". "A typical Planning Poker deck contains values such as: 0, 1, 2, 3, 5, 8, 13, 20, 40, 100". "Each estimator privately chooses a card. When all estimators are ready, the cards are revealed together." "If the estimates are far apart, the team discusses why." — [Mountain Goat Software, Planning Poker](https://www.mountaingoatsoftware.com/agile/planning-poker)
- **Velocity calculation:** "You typically calculate sprint velocity at the end of each sprint by totaling the story points or other units of measurement for all fully completed user stories." It "should be averaged over multiple sprints". Example: "if the average velocity is 15 points with no holidays or external dependencies, the team could commit to user stories totaling around 15 points for the next sprint." — [Atlassian, Velocity in Scrum](https://www.atlassian.com/agile/project-management/velocity-scrum)
- **Reading a burndown:** "A burndown chart typically includes an ideal effort line—a straight, planned trajectory from the total workload to completion." "The amount of work remaining appears on the vertical axis, while elapsed time appears on the horizontal axis." "...plateaus indicate blockers, late drops suggest batch updates or end-loaded work, and upward jumps often mean scope was added. Consider using burnup charts when scope changes frequently." — [Atlassian, Burndown charts](https://www.atlassian.com/agile/tutorials/burndown-charts)

### Inferences
- **Official vs not (2020 Scrum Guide):**

  | Practice | In the 2020 Scrum Guide? | Where it comes from |
  |---|---|---|
  | Product Backlog refinement | **Yes** (ongoing activity, not an event) | Scrum Guide |
  | Burn-down / burn-up / cumulative flow | Mentioned only as optional forecasting practices | Scrum Guide mentions them; not mandated since 2011 |
  | User stories, "As a… I want… so that…" | No | XP (Beck), Connextra (2001) |
  | INVEST | No | Bill Wake (2003) |
  | Acceptance criteria / Given-When-Then | No (the DoD is in the Guide; acceptance criteria are not) | XP customer tests, BDD |
  | Story points, Fibonacci-like scales | No | Agile community; XP estimating |
  | Planning poker | No | Agile community (popularized by Mike Cohn) |
  | Velocity | No ("optional" per Scrum.org) | XP "Project Velocity" |
  | Daily Scrum "three questions" | No longer (removed 2020) | 2013/2017 Guides |
  | Scrum board / task board | No ("optional implementation") | Scrum.org glossary |

- **Definition of Done vs acceptance criteria:** the DoD is one quality standard that applies to every Increment (for example, code reviewed, tested, integrated, documented). Acceptance criteria are specific to one story: they state what that story must do. A story can meet its acceptance criteria and still not be Done if it fails the DoD.
- **Worked example A: burndown.** A 10-working-day Sprint has a forecast of 50 points. Ideal burn = 50 ÷ 10 = **5 points/day**. End of day 4: actual remaining = 34; ideal remaining = 50 − 4×5 = **30**, so the team is **4 points behind**. Burn so far = (50 − 34) ÷ 4 = **4 points/day**. Required from now on = 34 ÷ 6 = **5.67 points/day**. At the current rate, about 34 − 6×4 = **10 points** would be left at the end. Action: Developers and the PO renegotiate scope without endangering the Sprint Goal, and the team inspects the impediment at the Daily Scrum. If the line jumps *up* on day 5, scope was added (Atlassian).
- **Worked example B: burnup vs burndown with a scope change.** Scope is 40 points; on day 5, 8 points are added. On a burndown, "remaining" jumps from (say) 20 to 28, which looks like negative progress. On a burnup, the "completed" line keeps rising (for example, 20 → 23) and the separate *scope* line moves from 40 to 48. That is why Atlassian recommends burnups when scope changes often.
- **Worked example C: velocity forecasting.** Completed (Done) points in the last four Sprints were 21, 18, 25 and 20, so the average = 84 ÷ 4 = **21**. The remaining Product Backlog is 168 points, so 168 ÷ 21 = **8 Sprints**; with two-week Sprints that is about **16 weeks**. As a range using the slowest and fastest Sprints: 168 ÷ 25 ≈ 6.7 → 7 Sprints, and 168 ÷ 18 ≈ 9.3 → 10 Sprints. **Trap:** a 13-point story that is "90% done" contributes **0**, because only fully completed (Done) stories count, and the undone item returns to the Product Backlog. Velocity belongs to one team; comparing velocities across teams is meaningless, because each team has its own point scale.
- **Planning-poker scenario:** cards show 3, 5, 5 and 13. The 3 and the 13 explain their reasoning (the high estimator may know of an integration risk), then everyone re-votes. The aim is shared understanding, not averaging.

### Gaps
- The Agile Alliance glossary was read through a summarizing fetch tool, so its wording is paraphrased; the dates (2001 Connextra, 2001 3 C's, 2003 INVEST, 2004 Cohn) come from that summary.
- I did not verify who invented planning poker (often credited to James Grenning, 2002); the Mountain Goat page I fetched did not say.

---

## 5. Kanban: board, columns, WIP limits, pull system, flow metrics, Little's Law (worked), cumulative flow diagram, and Kanban vs Scrum

### Takeaway
Kanban is a strategy for optimizing the flow of value. Per the Kanban Guide (May 2025), it has three practices: define and visualize the workflow (a Definition of Workflow, shown on a Kanban board), actively manage items (explicit WIP control that creates a **pull** system), and improve the workflow. It requires four flow metrics: WIP, Throughput, Work Item Age and Cycle Time. Little's Law links them: average cycle time = average WIP ÷ average throughput. Unlike Scrum, Kanban has no prescribed roles, events or fixed iterations.

### Cited Findings
**The Kanban Guide** (John Coleman, Daniel Vacanti et al., v2025.5, updated 1 May 2025) — [The Kanban Guide (May 2025)](https://kanbanguides.org/english/)
- Definition: "Kanban is a strategy for optimizing the flow of value through a process. It comprises the following three practices working in tandem: Defining and visualizing a workflow; Actively managing items in a workflow; Improving a workflow". "In their implementation, these Kanban practices are collectively called a Kanban system. Those who participate in the value delivery of a Kanban system are called Kanban system members."
- "Flow is the movement of potential value through a system." "...the strategy of Kanban is to optimize value by optimizing flow". It seeks a balance of effectiveness ("delivers what stakeholders want when they want it"), efficiency ("allocates available economic resources as optimally as possible") and predictability ("being able to accurately forecast value delivery within an acceptable degree of uncertainty").
- Theory: "Kanban draws on established flow theory, including but not limited to systems thinking, lean principles, queuing theory (batch size and queue size), variation, and quality control."
- The minimum Definition of Workflow (DoW) contains: a definition of work items; when items are started and finished; "One or more defined states that the work items flow through from started to finished. Any work items between a started point and a finished point are considered work in progress (WIP)"; "A definition of how WIP will be controlled"; "Explicit policies about how work items can flow through each state"; and "A service level expectation (SLE), which is a forecast of how long it should take a work item to flow from started to finished... (e.g., '85% of work items will be finished in eight days or less')".
- The board: "The visualization of a DoW is a Kanban board." "There are no specific guidelines for how a visualization should look."
- WIP and pull: "Kanban system members must explicitly control the number of work items in a workflow from started to finished." "An effect of controlling WIP is that it should create a pull system; Kanban system members should start work on an item (pull or select) only when there is a clear signal that there is capacity to do so."
- Active management includes "Controlling WIP", "Ensuring work items do not age unnecessarily, using the SLE as a reference" and "Unblocking blocked work."
- Improvement: "There is no requirement, however, to wait for a formal meeting at a regular cadence to make these changes."
- **The four mandatory flow metrics (exact):** "WIP: The number of work items started but not finished." "Throughput: The number of work items finished per unit of time. Note the measurement of throughput is the exact count of work items." "Work Item Age: The elapsed time between when a work item started and the current date." "Cycle Time: The elapsed time between when a work item started and when a work item finished." Teams may rename them ("Cycle Time could be Flow Time, Throughput could be Delivery Rate").
- History: "The present state of Kanban can be traced to the Toyota Production System (and its antecedents) and the work of people like Taiichi Ohno and W. Edwards Deming. The collective set of practices for knowledge work, now commonly referred to as Kanban, mainly originated on a team at Corbis in 2006."
- 2025 changes: "Kanban Measures renamed to Flow Metrics"; "Service Level Expectation was moved into the Definition of Workflow section"; "Less explicit (and hence more flexible) how WIP is controlled"; "Deleted reference to immutability of Kanban".
- The older December 2020 version on the same site defined Kanban as "a strategy for optimising the flow of value through a process using a visual, pull-based system" and said "Kanban's practices and measures are immutable." — [The Kanban Guide (Dec 2020)](https://kanbanguides.org/the-kanban-guide/2020.12/)

**The Kanban Method** (David J. Anderson / Kanban University) — a different source with a different list — [Kanban University, Official Guide to the Kanban Method](https://kanban.university/kanban-guide/)
- "The Kanban Method as described here is based on Kanban: Successful Evolutionary Change for Your Technology Business, by David J Anderson, 2010."
- Change management principles: "Start with what you do now"; "Agree to pursue improvement through evolutionary change"; "Encourage acts of leadership at all levels".
- Six general practices: "Visualize"; "Limit Work in Progress (WIP)"; "Manage Flow"; "Make Policies Explicit"; "Implement Feedback Loops"; "Improve Collaboratively, Evolve Experimentally".
- "Lead time is the time it takes for a single work item to pass through the system from the start (commitment point) to completion"; "Delivery rate is the number of completed work items per unit of time". "WIP limits are key to establishing a pull system."
- On cumulative flow diagrams: "The colored areas in the diagram represent the number of work items within a particular activity in the workflow and how these work items move across all activities".

**Practitioner sources (Atlassian, Scrum.org)**
- WIP limits: "A WIP limit caps the number of cards that can be in any one column at one time. When you reach your WIP limit... the team swarms on those items to move them forward." — [Atlassian, Kanban vs Scrum](https://www.atlassian.com/agile/kanban/kanban-vs-scrum). "WIP limits improve throughput and reduce the amount of work 'nearly done'... WIP limits make blockers and bottlenecks visible." — [Atlassian, WIP limits](https://www.atlassian.com/agile/kanban/wip-limits)
- Board columns: "Common workflow stages are To Do, In Progress, In Review, Blocked, and Done." Releases: "In kanban, updates are released whenever they are ready, without a regular schedule or predetermined due dates." Roles: "The whole team owns the kanban board... there is no single 'kanban master'". Metrics: "Lead time and cycle time are important metrics for kanban teams." Change: "A kanban workflow can change at any time." — [Atlassian, Kanban vs Scrum](https://www.atlassian.com/agile/kanban/kanban-vs-scrum)
- Atlassian's summary table: Origin: Scrum "Software development", Kanban "Lean manufacturing"; Cadence: "Regular, fixed-length sprints (i.e. two weeks)" vs "Continuous flow"; Roles: "Product owner, scrum master, development team" vs "No required roles". Note that it still says "development team", which is pre-2020 wording. — [Atlassian, Kanban vs Scrum](https://www.atlassian.com/agile/kanban/kanban-vs-scrum)
- CFD: "A Cumulative Flow Diagram (CFD) is an area chart that shows the various statuses of work items for an app, version, or sprint. The horizontal x-axis in a CFD indicates time, and the vertical y-axis indicates cards (work items). Each colored area of the chart equates to a workflow status (i.e. a column on your board)." "If your chart contains an area that is widening vertically over time, the column that equates to the widening area will generally be a bottleneck." — [Atlassian Support, Cumulative flow diagram](https://support.atlassian.com/jira-software-cloud/docs/view-and-understand-the-cumulative-flow-diagram/)
- Kanban with Scrum: "Kanban is a strategy for optimizing flow. The practices in the Kanban Guide for Scrum Teams help enhance and complement the Scrum framework and its implementation." — [Scrum.org, Kanban Guide for Scrum Teams](https://www.scrum.org/resources/kanban-guide-scrum-teams) (via a Web Archive copy)

**Little's Law** — [Wikipedia, Little's law](https://en.wikipedia.org/wiki/Little%27s_law)
- "...the long-term average number of customers (L) in a stationary system is equal to the long-term average effective arrival rate (λ) multiplied by the average time that a customer spends in the system (W)", i.e., L = λW. Little published his proof in 1961.
- Rearranged: "mean response time = mean number in system / mean throughput". "Little's law is widely used in manufacturing to predict lead time based on the production rate and the amount of work-in-process."

**Kanban vs Scrum comparison** (each cell from the sources above)

| Aspect | Scrum | Kanban | Sources |
|---|---|---|---|
| What it is | "lightweight framework" for complex problems | "strategy for optimizing the flow of value through a process" | [Scrum Guide](https://scrumguides.org/scrum-guide.html), [Kanban Guide](https://kanbanguides.org/english/) |
| Cadence | Fixed-length Sprints, one month or less | Continuous flow; changes need not wait for "a formal meeting at a regular cadence" | [Scrum Guide](https://scrumguides.org/scrum-guide.html), [Kanban Guide](https://kanbanguides.org/english/), [Atlassian](https://www.atlassian.com/agile/kanban/kanban-vs-scrum) |
| Roles | PO, SM, Developers (accountabilities) | "No required roles"; just "Kanban system members" | [Atlassian](https://www.atlassian.com/agile/kanban/kanban-vs-scrum), [Kanban Guide](https://kanbanguides.org/english/) |
| Events | Sprint, Planning, Daily Scrum, Review, Retrospective | None mandated (regular review of active items is "a common practice") | [Scrum Guide](https://scrumguides.org/scrum-guide.html), [Kanban Guide](https://kanbanguides.org/english/) |
| Core artifacts | Product Backlog, Sprint Backlog, Increment (+ commitments) | Definition of Workflow, visualized as a Kanban board | same |
| WIP control | Implicit (via what is selected for the Sprint) | Explicit WIP control is mandatory; creates a pull system | [Kanban Guide](https://kanbanguides.org/english/) |
| Changes mid-cycle | "No changes are made that would endanger the Sprint Goal" | "A kanban workflow can change at any time" | [Scrum Guide](https://scrumguides.org/scrum-guide.html), [Atlassian](https://www.atlassian.com/agile/kanban/kanban-vs-scrum) |
| Metrics | Velocity, burndown: optional and not in the Guide | WIP, Throughput, Work Item Age, Cycle Time: mandatory | [Scrum.org glossary](https://www.scrum.org/resources/scrum-glossary), [Kanban Guide](https://kanbanguides.org/english/) |
| Delivery | Increment(s) each Sprint; can release before the Review | "released whenever they are ready" | [Scrum Guide](https://scrumguides.org/scrum-guide.html), [Atlassian](https://www.atlassian.com/agile/kanban/kanban-vs-scrum) |
| Forecast/commitment | Sprint Goal; Developers forecast PBIs | SLE (e.g., "85% ... in eight days or less") | [Scrum Guide](https://scrumguides.org/scrum-guide.html), [Kanban Guide](https://kanbanguides.org/english/) |
| Origin | OOPSLA 1995 (Schwaber & Sutherland) | Toyota Production System; knowledge-work Kanban at Corbis, 2006 | [Scrum Guide](https://scrumguides.org/scrum-guide.html), [Kanban Guide](https://kanbanguides.org/english/) |

### Inferences
- **Little's Law in Kanban terms:** L = average WIP, λ = average throughput, W = average cycle time, so **Average Cycle Time = Average WIP ÷ Average Throughput**. Equivalently, WIP = Throughput × Cycle Time and Throughput = WIP ÷ Cycle Time.
  - *Example 1:* average WIP = 12 items and throughput = 4 items/week → cycle time = 12 ÷ 4 = **3 weeks**.
  - *Example 2 (setting a WIP limit):* target average cycle time = 5 days at a throughput of 2 items/day → WIP = 2 × 5 = **10 items**.
  - *Example 3 (why WIP limits help):* a support team finishes 20 tickets/week with 30 in progress → 30 ÷ 20 = **1.5 weeks**. Cut WIP to 20 with throughput unchanged → **1 week**. Lower WIP means shorter cycle time, other things being equal.
  - *Conditions:* use long-run **averages** over a stable period, where arrivals roughly equal departures (Wikipedia's "stationary system") and units are consistent (items per week with weeks). The law does **not** predict how long one particular item will take.
- **Worked flow-metrics example (mini data set, dates in Oct 2026):**

  | Item | Requested | Started | Finished |
  |---|---|---|---|
  | A | Oct 1 | Oct 2 | Oct 6 |
  | B | Oct 1 | Oct 3 | Oct 9 |
  | C | Oct 2 | Oct 5 | Oct 8 |
  | D | Oct 5 | Oct 6 | not finished on Oct 12 |
  | E | Oct 6 | Oct 7 | Oct 12 |

  - Cycle time (finish − start): A 4, B 6, C 3, E 5 days → average **4.5 days**. D has no cycle time yet.
  - Lead time (finish − request): A 5, B 8, C 6, E 6 → average **6.25 days**. Lead time ≥ cycle time because it includes waiting before work starts.
  - Work Item Age of D on Oct 12 = 12 − 6 = **6 days**. Compare it with the SLE to decide whether to swarm on it.
  - Throughput for Oct 5–11 = items finished in that window (A, C, B) = **3 items/week**.
  - WIP at end of Oct 7 = started but not finished: B, C, D, E = **4 items** (A finished on Oct 6).
  - Counting convention: some tools and textbooks count calendar days inclusively (+1). Follow your instructor's convention and state it.
- **Lead time vs cycle time trap:** the Kanban Guide defines only *Cycle Time* (started → finished). Kanban University defines *lead time* from the commitment point to completion. Atlassian treats both loosely. Exam-safe phrasing: **lead time = customer's view (request → delivery); cycle time = team's view (work started → work finished).**
- **Reading a CFD:** the vertical thickness of a band at a given date = the number of items in that state (WIP for that column). A band **widening** over time = a bottleneck (work piles up in that state). Top and bottom lines running parallel = stable flow. A flat "Done" line = nothing is finishing (throughput ≈ 0). The horizontal distance between the arrival line and the Done line roughly approximates average time in the system (an approximation, not a formal definition).
- **WIP-limit board example:** To Do | Analysis (WIP 2) | Development (WIP 3) | Testing (WIP 2) | Done. If Testing already holds 2 cards, a developer who finishes a card cannot push it into Testing. They should help test (swarm) rather than start new development. That is the pull principle in action.
- **Scrumban:** teams often combine Scrum's events with Kanban's WIP limits and flow metrics. Atlassian mentions hybrid models, and Scrum.org's *Kanban Guide for Scrum Teams* says Kanban practices "complement" Scrum.

### Gaps
- I did not fetch Daniel Vacanti's own statement of the assumptions behind Little's Law for knowledge work; the conditions listed above follow the general queuing-theory statement on Wikipedia.
- The Kanban University guide page showed no version date ("© 2026 Kanban University"), so I could not cite its revision date.

---

## 6. Extreme Programming (XP): values, practices, strengths and weaknesses

### Takeaway
XP (Kent Beck, late 1990s) is an engineering-heavy agile method. Its values are communication, simplicity, feedback and courage (respect was added later). Its practices include pair programming, test-driven development (TDD), continuous integration, refactoring, small releases, simple design, collective code ownership, sustainable pace and an on-site/whole-team customer. Strengths: built-in quality and fast feedback. Weaknesses: it depends heavily on a disciplined, co-located team and an available customer, and it produces little design documentation.

### Cited Findings
- Origin and positioning: "Extreme Programming (XP) is a software development methodology developed primarily by Kent Beck. XP was one of the first agile methods, indeed XP was the dominant agile method in the late 90s and early 00s before Scrum became dominant". The practices "were first used together in the C3 project". It "popularized many practices that have since been widely used in software development, including: continuous integration, refactoring, TestDrivenDevelopment, and agile planning." Fowler contrasts XP with "Scrum which intentionally only includes management practices" — [Martin Fowler, ExtremeProgramming](https://martinfowler.com/bliki/ExtremeProgramming.html)
- Definition: "Extreme Programming is a discipline of software development based on values of simplicity, communication, feedback, courage, and respect." The same page also keeps an older version that lists only "simplicity, communication, feedback, and courage" — [Ron Jeffries, What is Extreme Programming?](https://ronjeffries.com/xprog/what-is-extreme-programming/)
- Values as described by Don Wells: Simplicity: "We will do what is needed and asked for, but no more." Communication: "Everyone is part of the team and we communicate face to face daily." Feedback: "We demonstrate our software early and often then listen carefully and make any changes needed." Respect: "Everyone gives and feels the respect they deserve as a valued team member." Courage: "We will tell the truth about progress and estimates." — [extremeprogramming.org, XP Values](http://www.extremeprogramming.org/values.html)
- **Core practices (Jeffries's list):** Whole Team, Planning Game, Customer Tests, Small Releases, Simple Design, Pair Programming, Test-Driven Development, Design Improvement (Refactoring), Continuous Integration, Collective Code Ownership, Coding Standard, Metaphor, Sustainable Pace. Key lines — [Ron Jeffries, What is XP?](https://ronjeffries.com/xprog/what-is-extreme-programming/):
  - Whole team / on-site customer: "This team must include a business representative – the 'Customer' – who provides the requirements, sets the priorities, and steers the project."
  - Planning Game: "Release Planning" and "Iteration Planning"; "XP teams build software in two-week 'iterations'". "There is no 'ninety percent done' in XP: a feature story was completed, or it was not."
  - Small releases: "the team releases running, tested software, delivering business value chosen by the Customer, every iteration."
  - Simple design: "XP teams build software to a simple but always adequate design."
  - Pair programming: "All production software in XP is built by two programmers, sitting side by side, at the same machine." Jeffries claims "pairing produces better code in about the same time as programmers working singly" (a practitioner claim) and admits "It may seem inefficient" and "It does take some practice to do well".
  - TDD: "working in very short cycles of adding a test, then making it work."
  - Refactoring: "a process of continuous design improvement called Refactoring", focused on "removal of duplication" and higher cohesion and lower coupling.
  - Continuous integration: "XP teams build multiple times per day."
  - Collective code ownership: "any pair of programmers can improve any code at any time." The risk: "Collective ownership could be a problem if people worked blindly on code they did not understand", mitigated by tests and pairing.
  - Sustainable pace: "They work hard, and at a pace that can be sustained indefinitely... death march projects are neither productive nor produce quality software."
- XP rules (Don Wells), selected: "User stories are written." "Make frequent small releases." "Set a sustainable pace." "A stand up meeting starts each day." "The Project Velocity is measured." "No functionality is added early." "Refactor whenever and wherever possible." "The customer is always available." "Code the unit test first." "All production code is pair programmed." "Integrate often." "Use collective ownership." "When a bug is found tests are created." — [extremeprogramming.org, XP Rules](http://www.extremeprogramming.org/rules.html)
- TDD defined: "Test-Driven Development (TDD) is a technique for building software that guides software development by writing tests. It was developed by Kent Beck in the late 1990's as part of Extreme Programming." Steps: "Write a test for the next bit of functionality you want to add. Write the functional code until the test passes. Refactor both new and old code to make it well structured." These are "often summarized as Red - Green - Refactor" — [Martin Fowler, TestDrivenDevelopment](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- The textbook's index lists "Extreme programming (XP), 47" and "Paired programming, 433" (the latter in the Scrum chapter) — [Wiley Index](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf)

### Inferences
- **XP practices: quick-recognition table.**

  | Practice | One-line meaning | Typical exam cue |
  |---|---|---|
  | Pair programming | Two programmers, one machine, continuous review | "driver/navigator", "all production code reviewed as written" |
  | TDD | Test first: red → green → refactor | "write a failing test before the code" |
  | Continuous integration | Merge to mainline many times a day; automated build + tests | "avoid integration hell" |
  | Refactoring | Improve internal design without changing behaviour | "remove duplication, keep design simple" |
  | Small releases | Running, tested software every iteration | "deliver value early and often" |
  | Simple design | Design only for current needs (YAGNI: "No functionality is added early") | "no speculative features" |
  | Collective ownership | Anyone (any pair) may change any code | "no code owner bottleneck" |
  | Sustainable pace | Normal hours; no death marches (formerly "40-hour week") | "constant pace indefinitely" (Manifesto principle 8) |
  | On-site customer / Whole team | Business rep sits with the team, sets priorities, writes customer tests | "customer always available" |
  | Planning game | Release and iteration planning with customer priorities and programmer estimates | "customer chooses scope, programmers estimate" |
  | Coding standard, Metaphor | Common style; shared system vocabulary | "code looks written by one person" |

- **Strengths** (from the practice descriptions): high code quality through constant review (pairing), a test safety net (TDD, customer tests), fast feedback (CI, small releases), visible progress ("no ninety percent done"), knowledge spreading across the team (pairing, collective ownership), and both technical and management practices (Fowler's contrast with Scrum).
- **Weaknesses / limits** (derived from what the practices demand): the business must commit a customer who is "always available"; pairing doubles the people on each task, and some developers resist it; it relies on high team discipline and co-location ("dedicated open work space"); "Simple design" with little up-front documentation can make long-lived or large systems harder to hand over and maintain; and it is hard to scale to large or distributed teams. For Dennis's exact wording, see the unverified recollection in Section 1 Gaps.
- **XP values vs Scrum values:** XP = communication, simplicity, feedback, courage, respect. Scrum = commitment, focus, openness, respect, courage. Shared: **courage and respect**. "Simplicity" is an XP value, not a Scrum value, which makes it a common distractor.

### Gaps
- I did not fetch the exact year respect was added to XP's values (usually attributed to the second edition of Beck's *Extreme Programming Explained*, 2004); Jeffries's page shows both the four-value and five-value versions.
- I could not read Dennis's own description of XP's strengths and weaknesses (8th ed., p. 47); see Section 1 Gaps.

---

## 7. DevOps (CI/CD pipeline, infrastructure as code, monitoring, the Three Ways, DORA metrics) and AIOps

### Takeaway
DevOps combines culture, practices and tools that integrate development and IT operations to deliver software quickly and safely. Its technical core is a CI/CD **deployment pipeline**, **infrastructure as code** and **monitoring/observability**. Its philosophy is the **Three Ways** (flow, feedback, continual learning). It is measured by **DORA's five metrics** (2024 onward): change lead time, deployment frequency and failed deployment recovery time (throughput); change fail rate and deployment rework rate (instability). **AIOps** applies big data and machine learning to IT operations: noise reduction, event correlation, anomaly detection, root-cause analysis and automated remediation.

### Cited Findings
**DevOps definition**
- "DevOps is a set of practices, tools, and a cultural philosophy that automate and integrate the processes between software development and IT teams. It emphasizes team empowerment, cross-team communication and collaboration, and technology automation." "The DevOps movement began around 2007..." "Some teams may mistakenly believe new tools are sufficient to adopt DevOps. Yet, DevOps is a combination of people, tools, and culture." "Devops isn't any single person's job. It's everyone's job." — [Atlassian, DevOps](https://www.atlassian.com/devops)

**CI / continuous delivery / continuous deployment**
- CI: "Continuous Integration is a software development practice where each member of a team merges their changes into a codebase together with their colleagues changes at least daily. Each of these integrations is verified by an automated build (including test) to detect integration errors as quickly as possible." — [Martin Fowler, Continuous Integration (18 Jan 2024)](https://martinfowler.com/articles/continuousIntegration.html)
- Continuous delivery: "a software development discipline where you build software in such a way that the software can be released to production at any time." Indicators include "Your software is deployable throughout its lifecycle" and "You can perform push-button deployments of any version of the software to any environment on demand". "...you push the executables into increasingly production-like environments to ensure the software will work in production. To do this you use a DeploymentPipeline." — [Martin Fowler, ContinuousDelivery](https://martinfowler.com/bliki/ContinuousDelivery.html)
- Continuous deployment: "every change that passes all stages of your production pipeline is released to your customers. There's no human intervention, and only a failed test will prevent a new change to be deployed to production." "...continuous integration is part of both continuous delivery and continuous deployment. And continuous deployment is like continuous delivery, except that releases happen automatically." — [Atlassian, CI vs delivery vs deployment](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)

**Infrastructure as code**
- "Infrastructure as code is the approach to defining computing and network infrastructure through source code that can then be treated just like any software system. Such code can be kept in source control to allow auditability and ReproducibleBuilds, subject to testing practices, and the full discipline of ContinuousDelivery." — [Martin Fowler, InfrastructureAsCode](https://martinfowler.com/bliki/InfrastructureAsCode.html)

**Monitoring and observability**
- "Monitoring is tooling or a technical solution that allows teams to watch and understand the state of their systems. Monitoring is based on gathering predefined sets of metrics or logs." "Observability is tooling or a technical solution that allows teams to actively debug their system. Observability is based on exploring properties and patterns not defined in advance." — [DORA capability: Monitoring and observability](https://dora.dev/capabilities/monitoring-and-observability/)

**The Three Ways** (Gene Kim, 22 Aug 2012) — [IT Revolution, "The Three Ways: The Principles Underpinning DevOps"](https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/)
- "The First Way: Flow/Systems Thinking" "emphasizes the performance of the entire system, as opposed to the performance of a specific silo of work or department". Outcomes: "never passing a known defect to downstream work centers, never allowing local optimization to create global degradation, always seeking to increase flow, and always seeking to achieve profound understanding of the system (as per Deming)."
- "The Second Way: Amplify Feedback Loops" "is about creating the right to left feedback loops. The goal of almost any process improvement initiative is to shorten and amplify feedback loops so necessary corrections can be continually made."
- "The Third Way: Culture of Continual Experimentation and Learning" "is about creating a culture that fosters two things: continual experimentation, taking risks and learning from failure; and understanding that repetition and practice is the prerequisite to mastery." Outcomes include "allocating time for the improvement of daily work, creating rituals that reward the team for taking risks, and introducing faults into the system to increase resilience."

**DORA metrics (current)** — [DORA, Software delivery performance metrics (updated 5 Jan 2026)](https://dora.dev/guides/dora-metrics/)
- "DORA has identified five software delivery performance metrics". Throughput: "Change lead time: The amount of time it takes for a change to go from committed to version control to deployed in production." "Deployment frequency: The number of deployments over a given period or the time between deployments." "Failed deployment recovery time: The time it takes to recover from a deployment that fails and requires immediate intervention." Instability: "Change fail rate: The ratio of deployments that require immediate intervention following a deployment. Likely resulting in a rollback of the changes or a 'hotfix' to quickly remediate any issues." "Deployment rework rate: The ratio of deployments that are unplanned but happen as a result of an incident in production."
- "DORA's research has repeatedly demonstrated that speed and stability are not tradeoffs." Pitfalls listed include "Setting metrics as a goal. Ignoring Goodhart's law...", "Having one metric to rule them all", "Making disparate comparisons", "Competing". "A common approach to improving the five key metrics... is reducing the batch size of changes".
- History: 2014 started with "deployment frequency, lead time for changes, mean time to recover (MTTR), and change fail rate" (change fail rate was dropped from the 2014 construct). In 2015: "Throughput measures: Deployment frequency and deployment lead time. Stability measures: Mean time to recover (MTTR) and change fail rate." 2018 added "availability"; 2021 broadened it to "reliability". "In 2023... 'mean time to recover (MTTR)' or 'time to restore service' was renamed and redefined as failed deployment recovery time." "From four keys to five (2024)": deployment rework rate added — [DORA, A history of DORA's software delivery metrics (2 Jan 2026)](https://dora.dev/insights/dora-metrics-history/)
- Conflict note: Google Cloud's 2024 announcement says "DORA's four key metrics, introduced in 2013", whereas DORA's own history page describes the "inaugural 2014 study" — [Google Cloud, 2024 DORA report announcement](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report); [DORA history](https://dora.dev/insights/dora-metrics-history/)

**AIOps: definitions and real examples**
- "AIOps was first defined by Gartner in 2016... to describe the application of AI and machine learning to enhance IT operations... aiming to automate processes such as event correlation, anomaly detection, and causality determination." — [Wikipedia, AIOps](https://en.wikipedia.org/wiki/Artificial_Intelligence_for_IT_Operations) (citing Gartner 2016)
- IBM: "Artificial intelligence for IT operations, or AIOps, is the application of artificial intelligence (AI) capabilities—such as natural language processing and machine learning models—to automate, streamline and optimize IT service management and operational workflows." In AIOps, ML "helps with anomaly detection, root cause analysis (RCA), event correlation and predictive analysis." It can "Separate significant event alerts from the 'noise'", "Identify root causes and propose solutions" and "Automate responses, including proactive, real-time resolution". "Whereas DevOps focuses on accelerating and refining software development and deployment, AIOps uses AI to optimize the performance of enterprise IT environments" — [IBM, What is AIOps?](https://www.ibm.com/think/topics/aiops)
- AWS: "AIOps is a process where you use artificial intelligence (AI) techniques to maintain IT infrastructure. This process automates critical operational tasks, including performance monitoring, workload scheduling, and data backups." "AIOps provides event correlation capabilities." "Using AIOps, your organization can anticipate and mitigate future issues by analyzing historical data with ML technologies." — [AWS, What is AIOps?](https://aws.amazon.com/what-is/aiops/)
- Real product example 1, PagerDuty AIOps: "PagerDuty AIOps helps teams reduce alert noise, improve incident visibility, triage efficiently, and remove manual, repetitive work from the incident response process"; the vendor claims it "slashes alerts by 91%" (marketing claim, not independently verified) — [PagerDuty AIOps](https://www.pagerduty.com/platform/aiops/)
- Real product example 2, Amazon DevOps Guru: "Detect abnormal application behavior using machine learning (ML) models informed by years of Amazon.com and AWS operational excellence." Note: "Amazon DevOps Guru is no longer available to new customers as of October 29, 2026." — [AWS, Amazon DevOps Guru](https://aws.amazon.com/devops-guru/)

### Inferences
- **The CI/CD pipeline in one line:** developer commits to mainline → **CI**: automated build + unit tests on every push → automated acceptance/integration tests in production-like environments (the **deployment pipeline**) → **continuous delivery**: always releasable, push-button release (a human decides when) → **continuous deployment**: automatic release if all tests pass → **monitoring/observability** in production → feedback to developers (the Second Way). IaC lets the environments themselves be versioned, tested and recreated in the pipeline.

  | | Continuous integration | Continuous delivery | Continuous deployment |
  |---|---|---|---|
  | What's automated | Merge + build + tests | Everything up to a releasable build, including deployment to test/staging | Everything, including the production release |
  | Release to users | n/a | Manual decision ("push-button") | Automatic, no human intervention |

- **Mapping the Three Ways to practices:** First Way (flow) → small batches, CI/CD, WIP limits, value-stream thinking. Second Way (feedback) → automated tests, monitoring, telemetry, AIOps alerting, blameless post-incident reviews. Third Way (learning) → experiments, chaos/fault injection ("introducing faults into the system"), time for improvement (compare the Sprint Retrospective).
- **DORA worked example (illustrative):** in October a team made 40 production deployments (≈ 2 per working day → deployment frequency). 4 of them needed immediate intervention (rollback/hotfix) → change fail rate = 4/40 = **10%**. Recovery times for those 4 were 30, 45, 60 and 105 min → mean failed deployment recovery time = 240/4 = **60 min**. 3 of the 40 deployments were unplanned fixes for production incidents → deployment rework rate = 3/40 = **7.5%**. If the median commit-to-production time was 1 day, change lead time = **1 day**. Interpretation: the first two metrics plus recovery time = throughput; change fail rate and rework rate = instability (current DORA grouping).
- **Exam trap on DORA grouping:** older materials (2015–2023) group MTTR / time to restore with *stability*. Current DORA (2024+) lists failed deployment recovery time under *throughput* and uses "instability" for change fail rate and rework rate. If asked for "the four DORA metrics", give deployment frequency, lead time for changes, change failure rate and time to restore service (MTTR), then mention the 2023 rename and the 2024 fifth metric (rework rate).
- **AIOps scenario (illustrative):** after a deployment, 300 alerts fire from 40 services. The AIOps platform correlates them into **one incident** (noise reduction), detects an **anomaly** in database latency that began right after the deployment, points to that deployment as the **probable root cause**, and triggers a **runbook** (for example, an automated rollback) while paging the on-call engineer. This shortens failed deployment recovery time, a DORA metric. The link to agile: AIOps strengthens DevOps's Second Way (feedback).
- **DevOps vs AIOps:** DevOps is a culture/practice for the *delivery* of software (dev + ops together). AIOps is the use of *AI/ML in IT operations data* (logs, metrics, events, tickets). AIOps is a tool family that supports DevOps and SRE; it is not a replacement for DevOps.

### Gaps
- Gartner's own glossary page (verbatim definition) returned HTTP 403, so the Gartner definition here comes through Wikipedia's summary of Gartner (2016). The commonly quoted wording, "AIOps combines big data and machine learning to automate IT operations processes, including event correlation, anomaly detection and causality determination", is **not verified** from Gartner directly.
- I did not capture DORA's current performance-tier thresholds (elite/high/medium/low or the 2025 "team archetypes").
- Vendor effectiveness claims (e.g., PagerDuty's "91%") are marketing statements without independent verification.

---

## 8. AI in agile: backlog prioritization, story generation and estimation, stand-up summarization, sprint planning, DevOps automation; risks and limits

### Takeaway
AI tools now draft and break down backlog items, suggest priorities, summarize work items and meetings, and help with operations (AIOps). The evidence on value is mixed. DORA 2024 found that more AI adoption went with slightly lower delivery throughput and stability. DORA 2025 calls AI an "amplifier" of existing strengths and weaknesses. A 2025 randomized trial (METR) found experienced developers 19% *slower* with AI, although they believed they were faster. Research on ML story-point estimation shows weak gains over simple baselines. In Scrum terms, AI can recommend, but accountability stays human: the PO for ordering, the Developers for sizing, the plan and the Definition of Done.

### Cited Findings
**What tools actually do (vendor documentation)**
- Atlassian (Jira/Rovo): "Work breakdown: Let Rovo break down work, complete with summaries and descriptions, into easily manageable tasks with just a click." "Work Readiness Checker Agent: Plan and prioritize for your team by ensuring work is clear and complete, reducing wasted work and follow-up meetings." Rovo can also "draft status updates". — [Atlassian, Rovo in Jira: AI features](https://www.atlassian.com/software/jira/ai)
- Atlassian support documentation: "Create child work items: Generate a list of suggested child work items, based on the details of the parent work item." "Summarize work item: Get a Rovo summary of any work item with a single selection." "Summarize work item comments". "Link similar work items... so your team can plan and build with confidence." "As you type a summary when creating a work item, Jira uses AI to proactively predict and suggest relevant field values based on context and similar issues. Supported fields include Components, Labels, Priority..." "Rovo will translate simple prompts into JQL queries". — [Atlassian Support, Rovo AI features in Jira](https://support.atlassian.com/organization-administration/docs/atlassian-intelligence-features-in-jira-software/)
- Meeting/stand-up summarization (Microsoft Teams): "Copilot summarizes key discussion points, including who spoke and what they said. It also suggests action items and answers any questions you have, in real time during or after a meeting." "Transcription is required to use Copilot." — [Microsoft Support, Copilot in Teams meetings](https://support.microsoft.com/en-us/office/use-copilot-in-microsoft-teams-meetings-0bf9dd3c-96f7-44e2-8bb8-790bedf066b1)
- Asynchronous stand-ups: Atlassian suggests teams "Record video updates with Loom", which fits "distributed teams spanning multiple time zones." — [Atlassian, Standups](https://www.atlassian.com/agile/scrum/standups)

**Guidance from Scrum's co-creator and Scrum.org authors**
- The **Scrum Guide Expansion Pack** (2025; Jeff Sutherland, John Coleman, Ralph Jocham) is a "companion to the 2020 Scrum Guide" and includes an "AI and Scrum" expansion — [Scrum Guide Expansion Pack](https://scrumexpansion.org/). The AI paper (v2026.1, updated 18 Jan 2026, © Ralph Jocham, Jeff Sutherland) says — [AI and Scrum](https://scrumexpansion.org/ai-and-scrum/):
  - On roles: "Scrum Teams must consciously keep a human-in-the-loop attitude: AI may recommend, but humans decide." "Research on human–automation interaction warns of automation bias and complacency – people may over-trust automated systems and become passive in oversight."
  - On events: "In Sprint Planning, this might mean discussing which tasks the AI will be used for and setting aside time to validate AI outputs." The Sprint Review "might be expanded to not only show what the Scrum Team built, but also how it was built with AI".
  - On quality: "update your Definition of Output Done to include 'AI outputs must be reviewed and tested'". "AI is treated as a junior collaborator whose output is never accepted on trust".
  - On risk: "The chief risk is that AI enables the wrong things to be built faster." "...guard against vanity metrics: an AI that doubles your team's velocity is counterproductive if the additional output is low value". "Without guardrails, teams accumulate technical debt faster than they can pay it down."
  - Caution: the paper says "The SGEP view is that Scrum is mutable (the 2020 Scrum Guide considers it immutable)". It also uses its own terms ("Product Developers", "Definition of Output Done", "Definition of Outcome Done") that are **not** in the 2020 Scrum Guide. Parts of it are speculative forecasts about future AI capability; these are not used here.
- Scrum.org blog (Ralph Jocham, 30 Nov 2025), an opinion piece: it warns of a "Passive Administrator" path where "AI writes your user stories, analyzes your data, prioritizes your backlog. Your new job? Review, approve, reject." It argues: "AI identifies patterns in data. You identify which patterns to trust", including spotting which insights "might contain bias against user populations." — [Scrum.org blog](https://www.scrum.org/resources/blog/passive-reviewer-cognitive-orchestrator-why-ai-demands-strategic-thinking-not-administrative-tasks) (read via a Web Archive copy; the article also contains speculative claims, such as AI "IQ" figures, which are not used here)

**Evidence on AI estimation and story quality (peer-reviewed / preprints)**
- Deep-SE (Choetkiertikul et al.) offered "a comprehensive dataset for story points-based estimation that contains 23,313 issues from 16 open source projects" and an LSTM-based model that "consistently outperforms three common effort estimation baselines". — [arXiv:1609.00489](https://arxiv.org/abs/1609.00489)
- A replication (Tawosi, Moussa, Sarro; IEEE TSE, DOI 10.1109/TSE.2022.3228739) found "Deep-SE outperforms the Median baseline estimator and TF/IDF-SVM in only very few cases with statistical significance (8/42 and 9/32 cases, respectively), thus confounding previous findings". The authors conclude that "using semantic similarity is not enough to differentiate user stories with respect to their story points". — [arXiv:2201.05401](https://arxiv.org/abs/2201.05401)
- ChatGPT for user-story quality (Ronanki, Cabrero-Daniel, Berger, 2023): "ChatGPT's evaluation aligns well with human evaluation, and we propose a 'best of three' strategy to improve its output stability". It also raises "trustworthiness in AI and its implications for non-experts using ChatGPT's unprocessed outputs." — [arXiv:2306.12132](https://arxiv.org/abs/2306.12132)

**Evidence on productivity, delivery and trust (industry research)**
- DORA 2024: "More than 75 percent of respondents said that they rely on AI for at least one daily professional responsibility." "A 25% increase in AI adoption is associated with" a "7.5% increase in documentation quality", a "3.4% increase in code quality" and a "3.1% increase in code review speed". However, "AI adoption may negatively impact software delivery performance... an estimated decrease in delivery throughput by 1.5%, and an estimated reduction in delivery stability by 7.2%." "39% of the respondents reported little to no trust in AI-generated code." — [Google Cloud, 2024 DORA report announcement](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)
- DORA 2025 ("State of AI-assisted Software Development", announced 24 Sep 2025, nearly 5,000 respondents): "AI doesn't fix a team; it amplifies what's already there." "Unlike last year, we observe a positive relationship between AI adoption on both software delivery throughput and product performance", but AI adoption "does continue to have a negative relationship with software delivery stability." "90% of survey respondents report using AI at work... 30% report little or no trust in the code generated by AI". — [Google Cloud, 2025 DORA report announcement](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report); [DORA 2025 report page](https://dora.dev/research/2025/dora-report/)
- METR randomized controlled trial (10 Jul 2025): 16 experienced open-source developers worked on 246 real issues; "when developers use AI tools, they take 19% longer than without". "...developers expected AI to speed them up by 24%, and even after experiencing the slowdown, they still believed AI had sped them up by 20%." — [METR, early-2025 study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/). The February 2026 update says developers are "likely... more sped up from AI tools now", but METR calls its new data "only very weak evidence" because of selection effects (developers declined to work without AI) — [METR, Feb 2026 update](https://metr.org/blog/2026-02-24-uplift-update/)
- Stack Overflow 2025 survey: "84% of respondents are using or planning to use AI tools"; "More developers actively distrust the accuracy of AI tools (46%) than trust it (33%)"; the top frustration (66%) is "AI solutions that are almost right, but not quite". — [Stack Overflow Developer Survey 2025, AI](https://survey.stackoverflow.co/2025/ai)

### Inferences
- **Where AI fits in Scrum, and who stays accountable:**

  | Activity | AI assistance (real example) | Accountable per 2020 Scrum Guide | Main risk |
  |---|---|---|---|
  | Backlog item creation / story generation | Rovo work breakdown, suggested child items, LLM-drafted stories | PO: "Creating and clearly communicating Product Backlog items" | Generic or "almost right" stories; acceptance criteria not grounded in real user needs |
  | Backlog prioritization (ordering) | Jira suggesting the Priority field; readiness-checker agent | PO: "Ordering Product Backlog items"; may delegate but "remains accountable" | Automation bias; PO becomes a "passive administrator"; hidden bias in data |
  | Estimation (story points) | ML/LLM estimators (Deep-SE etc.) | Developers: "responsible for the sizing" | Replications show weak accuracy; estimation is also a conversation (planning poker) that AI skips |
  | Daily Scrum | Meeting summaries and action items (Copilot), work-item summaries (Rovo), async updates (Loom) | Developers: inspect progress toward the Sprint Goal and make "an actionable plan for the next day" | Turning the Daily Scrum into a status report (the 2013 Guide warned it is "too often... seen as a status event"); transcript privacy; summary errors |
  | Sprint Planning | Decide which tasks AI will do; budget time to validate AI output | Whole team: Sprint Goal; Developers: the plan | Over-forecasting from AI optimism (METR's perception gap) |
  | Definition of Done / quality | "AI outputs must be reviewed and tested" in the DoD | Developers adhere to the DoD | Stability loss (DORA 2024–2025), technical debt |
  | Sprint Review / Retrospective | Inspect how AI was used; adapt working agreements | Scrum Team | Vanity metrics (inflated velocity) |
  | DevOps operations | AIOps: noise reduction, correlation, RCA, auto-remediation | Ops/SRE + Developers | Black-box decisions; vendor claims unverified |

- **Exam-ready "risks and limits" list:** (1) accuracy and hallucination ("almost right"); (2) automation bias and over-trust; (3) accountability cannot be delegated to a tool (PO and Developers stay accountable); (4) delivery stability can drop as AI speeds up output without small batches and strong testing (DORA); (5) productivity perception ≠ reality (METR); (6) Goodhart's law and vanity metrics (AI-inflated velocity); (7) privacy and confidentiality of meeting transcripts and backlog data; (8) bias in training data affecting prioritization; (9) technical debt from unreviewed code.
- **Balanced conclusion for essay answers:** AI is most defensible for low-risk, verifiable support tasks (summaries, first drafts, duplicate detection, alert correlation) inside strong empirical guardrails (DoD, tests, small batches, human decisions). It is least defensible as an autonomous decision-maker on value (ordering) or commitments (Sprint Goal).

### Gaps
- I found no peer-reviewed controlled study measuring AI specifically in Daily Scrums, sprint planning or backlog ordering. The evidence is vendor documentation, practitioner guidance and broader developer-productivity studies.
- Atlassian's Agile Coach articles on stand-ups, sprint planning and backlogs (fetched 19 Oct 2026) contained no AI-specific guidance beyond Loom video updates and product navigation.
- The web-search budget for this session was exhausted early, so I fetched sources by known URL. I may have missed other Atlassian or Scrum.org articles specifically on AI in agile.

---

## 9. Common exam traps (consolidated)

### Takeaway
Most traps come from outdated terminology (pre-2020 Scrum), from confusing complementary practices with the official framework, and from mixing up similar-looking lists (Scrum vs XP values, the Kanban Guide vs the Kanban Method, continuous delivery vs deployment, old vs new DORA metrics).

### Cited Findings
- 2020 terms: "three different sets of accountabilities: PO, SM, and Developers"; "removed Daily Scrum questions"; "Self-Managing over Self-Organizing"; "Three Sprint Planning Topics" — [Scrum Guide revisions](https://scrumguides.org/revisions.html)
- "The Product Backlog is 'ordered,' instead of 'prioritized'" (2011); "refined rather than groomed" (2013); "Scrum does not mandate a burn-down chart" (2011) — [Scrum Guide revisions](https://scrumguides.org/revisions.html)
- "Only the Product Owner has the authority to cancel the Sprint." "The Sprint Review is a working session and the Scrum Team should avoid limiting it to a presentation." "The Sprint Review should never be considered a gate to releasing value." — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)
- Velocity is "optional" — [Scrum.org glossary](https://www.scrum.org/resources/scrum-glossary)
- The Kanban Guide's mandatory metrics are WIP, Throughput, Work Item Age and Cycle Time (no "lead time") — [Kanban Guide](https://kanbanguides.org/english/); Kanban University defines lead time from the "commitment point" — [Kanban University](https://kanban.university/kanban-guide/)
- Continuous deployment has "no human intervention"; continuous delivery means releasable "at any time" with push-button deployment — [Atlassian](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment), [Fowler](https://martinfowler.com/bliki/ContinuousDelivery.html)
- MTTR was renamed failed deployment recovery time (2023), and rework rate was added (2024) — [DORA history](https://dora.dev/insights/dora-metrics-history/)

### Inferences
1. **"Roles" / "Development Team" / "ScrumMaster"** are pre-2020 (the textbook still uses them). In 2020 terms: accountabilities, Developers, Scrum Master.
2. **Daily Scrum ≠ status meeting**, and the three questions are not mandatory. It is *for the Developers*; the SM ensures it happens but need not facilitate it, and the PO/SM attend as Developers only if they work on Sprint Backlog items.
3. **Product Backlog is "ordered"**, not prioritized; **refinement is not an event** and has no timebox in 2020 (the 2017 "10% of capacity" was removed).
4. **The Sprint Goal is the commitment**; the selected items are a forecast. Scope can be renegotiated with the PO, but nothing that endangers the Sprint Goal.
5. **Only the PO can cancel a Sprint**, and only if the Sprint Goal becomes obsolete.
6. **Increment ≠ "at the end of the Sprint only":** multiple Increments per Sprint are allowed, and release can happen before the Review.
7. **Undone work** cannot be shown at the Review and returns to the Product Backlog; partially done stories add **0** to velocity.
8. **User stories, story points, planning poker, velocity, burndown, Scrum board** are not required by the Scrum Guide. Burn-downs and burn-ups are only *mentioned* as optional forecasting aids.
9. **Team size:** "typically 10 or fewer" for the whole Scrum Team (2020) vs "3–9 Development Team members" (2017).
10. **Scrum values (5)** ≠ **XP values** (communication, simplicity, feedback, courage, respect). "Simplicity" is XP; "commitment, focus, openness" are Scrum.
11. **Empiricism pillars (transparency, inspection, adaptation)** ≠ **values**.
12. **Agile Manifesto ≠ anti-documentation:** "while there is value in the items on the right". Principle 3 says "a couple of weeks to a couple of months", not "two weeks".
13. **The Kanban Guide (Vacanti/Coleman: 3 practices, 4 metrics)** ≠ **the Kanban Method (Anderson/Kanban University: 3 change principles, 6 general practices)**. Know which one the question cites.
14. **Kanban has no prescribed roles, events or iterations;** WIP limits are explicit and create **pull**. A widening CFD band means a **bottleneck**.
15. **Little's Law** applies to **averages** in a stable system: Cycle Time = WIP ÷ Throughput. Keep the units consistent.
16. **Continuous delivery ≠ continuous deployment** (the difference is the automatic production release).
17. **DORA:** "four keys" in older materials; **five metrics** from 2024; MTTR → **failed deployment recovery time** (2023).
18. **AIOps ≠ DevOps:** AIOps is AI/ML applied to IT-operations data; DevOps is a culture and practice for dev + ops.
19. **The Scrum Guide Expansion Pack (2025) is not the Scrum Guide.** It calls Scrum "mutable" and uses its own terms; answer exam questions from the 2020 Guide.
20. **The Kanban Guide 2025 dropped "immutable"**, whereas the Scrum Guide 2020 says Scrum "is immutable".

### Gaps
- None beyond those noted in earlier sections.

---

## 10. Practice questions with answers (MCQ, scenarios, calculations)

### Takeaway
Twenty questions covering the most testable points; each answer cites where it comes from. Calculations use the formulas from Sections 4–5 and 7.

### Cited Findings
- Sources for the answers: [Agile Manifesto](https://agilemanifesto.org/), [Principles](https://agilemanifesto.org/principles.html), [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html), [Scrum Guide revisions](https://scrumguides.org/revisions.html), [Scrum.org glossary](https://www.scrum.org/resources/scrum-glossary), [INVEST](https://xp123.com/invest-in-good-stories-and-smart-tasks/), [Kanban Guide](https://kanbanguides.org/english/), [Atlassian CFD](https://support.atlassian.com/jira-software-cloud/docs/view-and-understand-the-cumulative-flow-diagram/), [Little's law](https://en.wikipedia.org/wiki/Little%27s_law), [Ron Jeffries XP](https://ronjeffries.com/xprog/what-is-extreme-programming/), [Fowler TDD](https://martinfowler.com/bliki/TestDrivenDevelopment.html), [Atlassian CI/CD](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment), [Three Ways](https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/), [DORA metrics](https://dora.dev/guides/dora-metrics/), [IBM AIOps](https://www.ibm.com/think/topics/aiops), [DORA 2024](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)

### Inferences
**Q1 (MCQ).** Which is **not** an Agile Manifesto value? (a) Individuals and interactions over processes and tools (b) Working software over comprehensive documentation (c) Following a plan over responding to change (d) Customer collaboration over contract negotiation.
**Answer: (c).** It is reversed; the value is "Responding to change over following a plan".

**Q2 (MCQ).** According to the Manifesto principles, what is "the primary measure of progress"? (a) Velocity (b) Working software (c) Completed documentation (d) Burndown.
**Answer: (b)** "Working software is the primary measure of progress."

**Q3 (MCQ).** The three pillars of Scrum's empiricism are: (a) commitment, focus, openness (b) transparency, inspection, adaptation (c) plan, do, check (d) flow, feedback, learning.
**Answer: (b).** (a) is part of the values; (d) is the DevOps Three Ways.

**Q4 (MCQ).** Which is **not** a Scrum value? (a) Courage (b) Openness (c) Simplicity (d) Respect.
**Answer: (c).** Simplicity is an XP value; Scrum's are commitment, focus, openness, respect and courage.

**Q5 (Accountability).** Who is accountable for ordering the Product Backlog, and can that work be delegated?
**Answer:** the Product Owner. The PO "may delegate the responsibility to others. Regardless, the Product Owner remains accountable."

**Q6 (Accountability).** A stakeholder asks the Scrum Master for an estimate of a backlog item's size. Who is responsible for sizing?
**Answer:** the Developers: "The Developers who will be doing the work are responsible for the sizing." The PO may help them understand trade-offs.

**Q7 (Scenario).** Mid-Sprint, a competitor's launch makes the Sprint Goal pointless. Who may cancel the Sprint?
**Answer:** only the Product Owner, and only because the Sprint Goal "becomes obsolete".

**Q8 (Which event?).** The team inspects "individuals, interactions, processes, tools, and their Definition of Done" and picks improvements, possibly adding one to the next Sprint Backlog.
**Answer:** the Sprint Retrospective (max 3 h for a one-month Sprint; it concludes the Sprint).

**Q9 (Which event?).** Stakeholders and the Scrum Team review what was accomplished and what changed in the environment, and the Product Backlog may be adjusted.
**Answer:** the Sprint Review (max 4 h; "second to last event"; a working session, not just a demo).

**Q10 (Timeboxes).** For a one-month Sprint, match each event to its maximum timebox: Sprint Planning / Daily Scrum / Sprint Review / Sprint Retrospective.
**Answer:** 8 h / 15 min / 4 h / 3 h. Shorter Sprints usually have shorter events, but the Daily Scrum is always 15 minutes.

**Q11 (Artifacts).** Match each artifact to its commitment: Product Backlog, Sprint Backlog, Increment.
**Answer:** Product Goal, Sprint Goal, Definition of Done.

**Q12 (Official or not?).** Which is part of the 2020 Scrum Guide? (a) Story points (b) Planning poker (c) Product Backlog refinement (d) Velocity.
**Answer: (c).** (a), (b) and (d) are complementary practices; Scrum.org calls velocity "optional".

**Q13 (2020 changes).** Which statement about the 2020 Scrum Guide is true? (a) The Daily Scrum must answer three questions (b) The Development Team is a sub-team within the Scrum Team (c) Sprint Planning now addresses Why, What and How (d) Scrum Teams are described as self-organizing.
**Answer: (c).** The 2020 Guide removed the questions and the sub-team, and changed "self-organizing" to "self-managing".

**Q14 (INVEST).** A story says "Build the full reporting module (about 3 months)". Which INVEST letter does it most clearly violate, and what should you do?
**Answer:** **S (Small).** Stories are "at most a few person-weeks". Split it into smaller, still-valuable stories; it is probably not **E**stimable either.

**Q15 (Burndown calculation).** A 10-day Sprint has a 60-point forecast. After day 6, 30 points remain. (a) What is the ideal remaining at day 6? (b) Is the team ahead or behind? (c) What burn rate is now needed?
**Answer:** (a) the ideal rate is 60/10 = 6 points/day, so ideal remaining = 60 − 36 = **24**; (b) **6 points behind** (30 vs 24); (c) 30 ÷ 4 = **7.5 points/day**, against the 5 points/day achieved so far (30 ÷ 6). At the current pace, about 10 points would remain, so the team should renegotiate scope with the PO while protecting the Sprint Goal.

**Q16 (Velocity forecast).** Velocities over four Sprints are 21, 18, 25 and 20, and 168 points remain. How many Sprints are needed? Separately, a 13-point story is "90% done" at Sprint end: how much does it add to velocity?
**Answer:** average 21 → 168 ÷ 21 = **8 Sprints** (a range of 7–10 using the fastest and slowest Sprints). The unfinished story adds **0**, because only Done work counts, and it returns to the Product Backlog.

**Q17 (Little's Law).** A Kanban team averages 15 items in progress and finishes 5 items per week. (a) What is the average cycle time? (b) To get a 2-week average cycle time at the same throughput, what total WIP limit should they set?
**Answer:** (a) 15 ÷ 5 = **3 weeks**; (b) WIP = 5 × 2 = **10 items**.

**Q18 (Kanban metrics / CFD).** (a) An item started on Oct 1 and is still unfinished on Oct 9. Which of the four Kanban Guide metrics describes its 8 days? (b) On a CFD, the "Testing" band keeps getting thicker. What does that mean, and what is the Kanban response?
**Answer:** (a) **Work Item Age** (Cycle Time applies only once an item is finished). (b) A **bottleneck in Testing**. Respect the WIP limits (stop pulling new development work), swarm on testing, and adjust the workflow or policies.

**Q19 (XP / DevOps identification).** Name the practice. (a) "Write a failing test, write code until it passes, then clean up the code." (b) "Any pair of programmers can improve any code at any time." (c) "Every change that passes all pipeline stages is released to customers with no human intervention." (d) "Shorten and amplify right-to-left feedback loops."
**Answer:** (a) TDD (red-green-refactor); (b) collective code ownership; (c) continuous deployment (not continuous delivery); (d) the Second Way of DevOps.

**Q20 (DORA / AI / AIOps).** (a) In a month there were 50 deployments; 5 needed a rollback or hotfix, and 2 were unplanned deployments made because of production incidents. Calculate the change fail rate and the deployment rework rate. (b) Which is a typical AIOps capability: writing user stories, event correlation and alert-noise reduction, or running the Sprint Retrospective? (c) Per DORA 2024, what was associated with a 25% increase in AI adoption?
**Answer:** (a) change fail rate = 5/50 = **10%**; rework rate = 2/50 = **4%**. (b) **Event correlation and alert-noise reduction**. (c) An estimated **1.5% decrease in delivery throughput** and a **7.2% decrease in delivery stability**, alongside gains in documentation quality (+7.5%), code quality (+3.4%) and code review speed (+3.1%).

### Gaps
- These are self-made practice items aligned to the primary sources, not past papers from SOC3070. The lecturer's question style (for example, textbook wording vs Scrum Guide wording) is unknown.

---

## 11. Best free resources (all legal, free to read)

### Takeaway
For definitions, use the primary sources: Scrum Guide, Manifesto, Kanban Guide, DORA. For explanations and diagrams, use Atlassian and Martin Fowler. For self-testing, use Scrum.org's free open assessments. For the textbook's own structure, use Wiley's free excerpts.

### Cited Findings
- **The 2020 Scrum Guide** (web and PDF; under 13 pages) — [scrumguides.org](https://scrumguides.org/scrum-guide.html); changes between versions — [Revisions](https://scrumguides.org/revisions.html)
- **Agile Manifesto + 12 principles + history** — [agilemanifesto.org](https://agilemanifesto.org/), [principles](https://agilemanifesto.org/principles.html), [history](https://agilemanifesto.org/history.html)
- **The Kanban Guide (May 2025)** — [kanbanguides.org](https://kanbanguides.org/english/); **Kanban Method** (Kanban University) — [official guide](https://kanban.university/kanban-guide/); **Kanban Guide for Scrum Teams** — [Scrum.org](https://www.scrum.org/resources/kanban-guide-scrum-teams)
- **Scrum.org Scrum Glossary** (marks optional vs required terms) — [Scrum.org](https://www.scrum.org/resources/scrum-glossary). Scrum.org's site menu lists free "Open Assessments" ("Scrum Open", "Product Owner Open"), useful for rapid self-testing — [Scrum.org](https://www.scrum.org/resources/scrum-glossary)
- **Atlassian Agile Coach:** [Kanban vs Scrum](https://www.atlassian.com/agile/kanban/kanban-vs-scrum), [Burndown charts](https://www.atlassian.com/agile/tutorials/burndown-charts), [WIP limits](https://www.atlassian.com/agile/kanban/wip-limits), [Velocity](https://www.atlassian.com/agile/project-management/velocity-scrum), [Waterfall](https://www.atlassian.com/agile/project-management/waterfall-methodology), [DevOps](https://www.atlassian.com/devops), [CI vs delivery vs deployment](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment), [CFD (Jira docs)](https://support.atlassian.com/jira-software-cloud/docs/view-and-understand-the-cumulative-flow-diagram/)
- **XP:** [Ron Jeffries, What is XP?](https://ronjeffries.com/xprog/what-is-extreme-programming/), [extremeprogramming.org rules](http://www.extremeprogramming.org/rules.html) and [values](http://www.extremeprogramming.org/values.html), [Fowler on XP](https://martinfowler.com/bliki/ExtremeProgramming.html), [TDD](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- **User stories and estimation:** [Mountain Goat Software, User Stories](https://www.mountaingoatsoftware.com/agile/user-stories), [Planning Poker](https://www.mountaingoatsoftware.com/agile/planning-poker), [INVEST (Bill Wake)](https://xp123.com/invest-in-good-stories-and-smart-tasks/), [Agile Alliance glossary](https://www.agilealliance.org/glossary/user-stories/), [Given-When-Then](https://martinfowler.com/bliki/GivenWhenThen.html)
- **DevOps:** [DORA metrics guide](https://dora.dev/guides/dora-metrics/), [DORA metrics history](https://dora.dev/insights/dora-metrics-history/), [DORA capabilities, e.g., monitoring and observability](https://dora.dev/capabilities/monitoring-and-observability/), [Three Ways (IT Revolution)](https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/), [Fowler: Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html), [Continuous Delivery](https://martinfowler.com/bliki/ContinuousDelivery.html), [Infrastructure as Code](https://martinfowler.com/bliki/InfrastructureAsCode.html)
- **AIOps / AI:** [IBM: What is AIOps?](https://www.ibm.com/think/topics/aiops), [AWS: What is AIOps?](https://aws.amazon.com/what-is/aiops/), [DORA 2025 report](https://dora.dev/research/2025/dora-report/), [AI and Scrum (Scrum Guide Expansion Pack)](https://scrumexpansion.org/ai-and-scrum/), [METR RCT](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), [Stack Overflow 2025 AI](https://survey.stackoverflow.co/2025/ai)
- **Textbook structure (publisher's free excerpts only):** [Contents](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-53.pdf), [Chapter 1](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-36.pdf), [Index](https://media.wiley.com/product_data/excerpt/80/11198037/1119803780-35.pdf) — linked from the [Wiley product page](https://www.wiley.com/en-us/Systems+Analysis+and+Design%2C+8th+Edition-p-9781119803799)

### Inferences
- **Suggested 3-day revision path before the midterm:** Day 1: read the Scrum Guide end to end (about 13 pages) and memorize the tables in Section 3. Day 2: Manifesto, Kanban Guide (short), Little's Law and burndown/velocity worked examples (Sections 4–5), XP practices. Day 3: DevOps (CI/CD, Three Ways, DORA), AIOps/AI risks, then the 20 practice questions and the textbook-vs-2020 terminology table (Section 1).

### Gaps
- I did not verify whether Scrum.org's open assessments use the 2020 Guide exclusively (they are Scrum.org products; check the page). Scrum.org pages are bot-protected and were read through Web Archive copies.
