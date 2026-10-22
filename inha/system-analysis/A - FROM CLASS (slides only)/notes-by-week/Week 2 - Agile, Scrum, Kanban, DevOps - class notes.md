# Week 2 — Agile, Scrum, Kanban, DevOps (CLASS NOTES — from slides only)
> Source: 2_1_2 Agile.pdf, 63 slides. Refs [W2-S#].
> Track A: class material only. Text in quotation marks is copied word for word from the slides. Pictures and diagrams are described in plain words.
> Legend: ⭐ = emphasised on the slide itself (bold, underlined, red or big type, or a picture the deck repeats) · ⚠️ = apparent typo, confusing wording or inconsistency on the slide · 🔎 = not explained on the slides, so look it up in Track B.

---

## 1. Big picture

- **Agile is a set of values and principles, not a fixed recipe.** The Agile Manifesto (17 original signers) values "Individuals and interactions", "Working software", "Customer collaboration" and "Responding to change" over processes and tools, comprehensive documentation, contract negotiation and following a plan. The deck unpacks this into **12 principles**. [W2-S2–S5, S12]
- **Agile vs traditional.** Agile is "an iterative approach to software development": short iterations of **1–4 weeks** (**10–15 days** on S12), each delivering a workable product and getting feedback. Traditional single-phase development "takes 6 to 18 months" and gets real feedback only at the end. The Waterfall table sums it up as incremental, flexible and sprint-based vs sequential, structured and phase-based. [W2-S7, S11, S12, S15]
- **Requirements = user requirements (user stories).** They are written as "As a <User Role> I want <Functionality> so that <Business Value>". They get a rough estimate in relative scale points at release planning, are split into **tasks of 2–12 hours** at iteration planning, and are validated by **acceptance tests**. [W2-S13, S14, S41]
- **Scrum** (creators: **Jeff Sutherland and Ken Schwaber**) "is not a process, technique, or definitive method", it is a **framework**. "The Scrum framework consists of Scrum Team members and their associated roles, events, artifacts, and rules." [W2-S8, S16]
- **The 3 roles:** [W2-S17–S26, S30]
  - The **Product Owner** maximizes the product's value, prioritizes the Product Backlog and is the **only** one who can cancel a Sprint.
  - The **Development Team** is self-organizing and cross-functional, with no titles and no sub-teams, typically 5–9 people. **Only** its members create the Increment.
  - The **Scrum Master** is a **servant-leader** who serves the PO, the Dev Team and the organization.
- **The events are all time-boxed.** The **Sprint** (one month or less, "1-4 Week" on the diagram, fixed once it starts) contains:
  - **Sprint Planning:** max 8 h for a one-month Sprint; creates the Sprint Goal.
  - **Daily Scrum:** 15 min, every day.
  - **Sprint Review:** with stakeholders.
  - **Sprint Retrospective:** max 3 h, after the Review. [W2-S27–S38]
- **Artifacts:** the deck lists two. [W2-S39–S46]
  - **Product Backlog:** all desired work, prioritized by the PO; the team *pulls* work from it.
  - **Sprint Backlog:** the selected items plus a plan; it is the Dev Team's forecast.
  - Both rely on **transparency** and a shared **Definition of "Done"**.
- **Kanban** comes from the Japanese for "visual board" or "sign" (Toyota since the 1950s; the "Kanban Method" was defined in 2007). It has three core ideas: **visualize the workflow** (cards in columns), **limit WIP**, and **measure and shrink Lead Time** (from the commitment point to the delivery point). [W2-S47–S56]
- **DevOps** is "a set of practices, tools, and a cultural philosophy" that joins software development and IT operations. Its lifecycle is drawn as an endless ∞ loop (Plan → Code → Build → Test → Release → Deploy → Operate → Monitor → Plan …). It has **5 key principles** and **3 categories of benefits** (technical, cultural, business). [W2-S57–S63]
- **Two picture-only slides come with no explanation:** cargo-cult photos [W2-S6] and a Dilbert strip about "stand-up" meetings [W2-S34]. 🔎 Look up in Track B why they are in an Agile lecture.

---

## 2. Slide-by-slide notes

### [W2-S1] Title slide — "System Analysis"
- Text: "System Analysis" · "DR. DRAGUNOV" · bottom right: "System development methodologies".
- Picture: an orange logo. A small circular arrow feeds into a bigger circular arrow, which then shoots out to the right as a long straight arrow. Under it is the slogan "SPRINT TO SUCCESS" (⚠️ printed without a gap as "SPRINTTO SUCCESS").
- The logo has the same shape as the Sprint diagram on [W2-S28]: a small daily loop riding on the big Sprint loop, then an arrow out to the finished result.

### [W2-S2] Originally Agile manifesto was signed by:
- 17 names, laid out in a 3-column grid as on the slide:

| Column 1 | Column 2 | Column 3 |
|---|---|---|
| Kent Beck | James Grenning | Robert C. Martin |
| Mike Beedle | Jim Highsmith | Steve Mellor |
| Arie van Bennekum | Andrew Hunt | Ken Schwaber |
| Alistair Cockburn | Ron Jeffries | Jeff Sutherland |
| Ward Cunningham | Jon Kern | Dave Thomas |
| Martin Fowler | Brian Marick | — |

- Link to [W2-S8]: **Ken Schwaber** and **Jeff Sutherland**, the creators of Scrum, are both on this list.
- The slide gives no date or place for the signing. 🔎 Look up in Track B if needed.

### [W2-S3] Agile Development — Agile manifesto
- The title "Agile Development" is in red, followed by the bold heading "Agile manifesto". The manifesto text is in italics on the slide (word for word):
  > "We are uncovering better ways of developing software by doing it and helping others do it. Through this work we have come to value:
  > - ◦ **Individuals and interactions** over processes and tools
  > - ◦ **Working software** over comprehensive documentation
  > - ◦ **Customer collaboration** over contract negotiation
  > - ◦ **Responding to change** over following a plan
  >
  > That is, while there is value in the items on the right, we value the items on the left more."
- ⭐ The four left-hand items are **bold and underlined** on the slide. These are the **4 values**.

| Valued MORE (left side) ⭐ | | Valued less (right side) |
|---|---|---|
| Individuals and interactions | over | processes and tools |
| Working software | over | comprehensive documentation |
| Customer collaboration | over | contract negotiation |
| Responding to change | over | following a plan |

- Key nuance, in the slide's own words: the right side is *not* worthless — "while there is value in the items on the right, we value the items on the left more."
- Picture: a blue light bulb with an eye in its centre and rays around it (an "idea / insight" icon).

### [W2-S4] The Twelve Principle of Agile Manifesto (principles 1–6)
- ⚠️ The title says "Principle"; it should be "Principles" (same on S5).
- ⭐ The principle names are **bold** on the slide. Text word for word:
  1. **Customer Satisfaction:** "Manifesto provides high priority to satisfy the costumer's requirements. This is done through early and continuous delivery of valuable software." ⚠️ "costumer's" should be customer's.
  2. **Welcome Change:** "Making changes during software development is common and inevitable. Every changing requirement should be welcome, even in the late development phase. Agile process works to increase the customers' competitive advantage."
  3. **Deliver the Working Software:** "Deliver the working software frequently, ranging from a few weeks to a few months with considering the shortest time period."
  4. **Collaboration:** "Business people (Scrum Master and Project Owner) and developers must work together during the entire life of a project development phase." ⚠️ "Project Owner": every other slide says **Product** Owner [W2-S17, S18].
  5. **Motivation:** "Projects should be build around motivated team members. Provide such environment that supports individual team members and trust them. It makes them feel responsible for getting the job done thoroughly." ⚠️ "build" should be built.
  6. **Face-to-face Conversation:** "Face-to-face conversation between Scrum Master and development team and between the Scrum Master and customers for the most efficient and effective method of conveying information to and within a development team."

### [W2-S5] The Twelve Principle of Agile Manifesto (principles 7–12)
- ⭐ Principle names in **bold** (word for word):
  7. **Measure the Progress as per the Working Software:** "The working software is the key and primary measure of the progress."
  8. **Maintain Constant Pace:** "The aim of agile development is sustainable development. All the businesses and users should be able to maintain a constant pace with the project."
  9. **Monitoring:** "Pay regular attention to technical excellence and good design to maximize agility."
  10. **Simplicity:** "Keep things simple and use simple terms to measure the work that is not completed." ⚠️ The second half is unclear as written. 🔎 Look up in Track B: the original wording of the "simplicity" principle.
  11. **Self-organized Teams:** "The Agile team should be self-organized. They should not be depending heavily on other teams because the best architectures, requirements, and designs emerge from self-organized teams."
  12. **Review the Work Regularly:** "The work should be reviewed at regular intervals, so that the team can reflect on how to become more productive and adjust its behavior accordingly."
- **Memory aid** (my grouping, not on the slide): 4 groups of 3, in slide order.
  - *Customer & delivery:* Customer Satisfaction · Welcome Change · Deliver the Working Software
  - *People:* Collaboration · Motivation · Face-to-face Conversation
  - *The 3 M's:* Measure progress (by working software) · Maintain constant pace · Monitoring (technical excellence)
  - *Team habits:* Simplicity · Self-organized Teams · Review the Work Regularly

### [W2-S6] (no title) Cargo Cults — picture slide
- The only text, word for word: "The Cargo Cults believe that manufactured western goods ('cargo') have been created by ancestral spirits and intended for Melanesian people."
- A collage of six photos, each showing Western technology copied in natural materials:
  - a huge "satellite/radar dish" built of straw on a frame;
  - an "airplane" made of straw and sticks, standing on a bare hillside;
  - a man wearing a home-made wooden headset with box-shaped wooden "goggles";
  - "headphones" made from a coconut shell, wood and string;
  - a crowd of local people in front of a bamboo tower and a long bamboo structure;
  - an old keypad-style mobile phone carved from wood.
- The copies look like the real things, but they are straw and wood and cannot actually work.
- The slide does not say why this is in an Agile lecture. 🔎 Look up in Track B: "cargo cult" as a warning in Agile/Scrum.

### [W2-S7] Typical Agile Development Methodology
Three pictures. The raw text only caught the phase names.
1. **"Traditional Method"** (top left). "Ideas" go into one long chevron arrow, **Planning › Analysis › Design › Implementation**. It ends in a green cube, **"Final Software"**, labelled **"First time to get real feedback"**. Real feedback comes only at the very end.
2. **Loop picture** (top right). A stack of four boxes: **Planning / Analysis / Design / Implementation**. A line runs from the bottom (Implementation) to a box labelled **"System"**. From System a line goes up and back round, with the arrow pointing into **Planning**. So this is a cycle: the four phases are repeated, and each pass produces the system again.
3. **"Agile Method"** (bottom). "Ideas" go into a small coloured cycle of **Define → Code → Test**, which produces a small cube **i1**, with "Review and Adjust" written above it. Then comes another Define/Code/Test cycle, giving a bigger cube **i2** ("Review and Adjust"). Another cycle gives an even bigger cube **i3** ("Review and Adjust"). Finally there is a grey cube **"Final Software"** with the label "First Time to get real feedback".
   - The cubes grow (i1 < i2 < i3): the product grows a piece at a time, in increments.
- ⚠️ The agile picture also puts "First Time to get real feedback" beside Final Software, even though it shows "Review and Adjust" after every increment. That is confusing. Go by the slide text on [W2-S11]: agile "frequently takes the feedback of workable product".

| | Traditional Method | Agile Method |
|---|---|---|
| Flow | one pass: Planning → Analysis → Design → Implementation | repeated Define → Code → Test cycles |
| Output along the way | nothing until "Final Software" | increments i1 → i2 → i3 → Final Software |
| Feedback | "First time to get real feedback" = at the final software | "Review and Adjust" after each increment |

### [W2-S8] The Scrum
- "Scrum creators: Jeff Sutherland and Ken Schwaber"
- Photo of the two men side by side (one with grey hair and glasses, one bald), with both handwritten signatures underneath.
- Both are also original Agile Manifesto signers [W2-S2].

### [W2-S9] Scrum has been used by:
- Listed (word for word, one per bullet on the slide): Microsoft · Yahoo · Google · Electronic Arts · IBM · Lockheed Martin · Apple · "Etc." (7 named companies plus "Etc.")
- Picture: seven brightly coloured clay figures standing in a circle with their arms round each other's shoulders, like a team huddle.

### [W2-S10] Scrum has been used for:
Two columns on the slide (word for word, 18 items):

| Left column | Right column |
|---|---|
| Commercial software | the Joint Strike Fighter |
| In-house development | Video game development |
| Contract development | FDA-approved, life-critical systems |
| Fixed-price projects | Satellite-control software |
| Financial applications | Websites |
| ISO 9001-certified applications | Handheld software |
| Embedded systems | Mobile phones |
| 24x7 systems with 99.999% uptime requirements | Network switching applications |
| | ISV applications |
| | Some of the largest applications in use |

- What the list itself shows: Scrum is not only for small web projects. The list includes regulated, safety-critical and fixed-price work, such as FDA-approved life-critical systems, ISO 9001-certified applications, 99.999% uptime systems, fixed-price projects and the Joint Strike Fighter.
- 🔎 Look up in Track B: "ISV" (not spelled out on the slide).

### [W2-S11] What is Agile "Methodology" or Philosophy?
- Word for word:
  > "An agile methodology is an iterative approach to software development. Each iteration of agile methodology takes a short time interval of 1 to 4 weeks. The agile development process is aligned to deliver the changing business requirement. It distributes the software with faster and fewer changes."
  >
  > "The single-phase software development takes 6 to 18 months. In single-phase development, all the requirement gathering and risks management factors are predicted initially."
  >
  > "The agile software development process frequently takes the feedback of workable product. The workable product is delivered within 1 to 4 weeks of iteration."
- ⭐ Picture: the same "Agile Method" diagram as on [W2-S7] (Ideas → Define/Code/Test → i1 → i2 → i3 → Final Software). The deck shows it twice.

| | Agile | Single-phase development |
|---|---|---|
| Time | each iteration "1 to 4 weeks" | "6 to 18 months" |
| Requirements & risks | "aligned to deliver the changing business requirement" | "all the requirement gathering and risks management factors are predicted initially" |
| Feedback | "frequently takes the feedback of workable product" | (not stated; see S7: only at the final software) |

### [W2-S12] (no title) Agile = a group of methodologies; iterations
- Word for word:
  > "An Agile methodology is not a specific set of ceremonies or specific development techniques. Rather, it is a group of methodologies that demonstrate a commitment to tight feedback cycles and continuous improvement. An Agile team works in iterations to deliver the customer requirement, and each iteration takes 10 to 15 days. However, the original Agile Manifesto didn't set the time period of two-week iterations or an ideal team size."
  >
  > "Each user requirement is a planned based and their backlog prioritization and size. The team decides, how much scope they have and how many hours available with each team to perform their planed task."
- ⚠️ The first sentence of paragraph 2 is garbled ("is a planned based and …"), and "planed" should be planned. Its gist: each requirement is planned according to backlog priority and size, and **the team decides how much scope it can take on** given its available hours.
- **Diagram (one iteration):**
  - A grey bar on the left reads **"Iteration Plan"**.
  - Next come three boxes, **"User stroy A"**, **"User stroy B"** and **"User stroy C"** (⚠️ "stroy" should be story). Each box has its own small Define → Code → Test cycle.
  - A grey bar on the right reads **"Review"**.
  - A bracket under the whole thing says **"Fixed Time (e.g.2 weeks)"**, and a bracket on the right side says **"Fixed Resources"**.
  - So, inside one iteration, time and resources are fixed and the team plans → builds several user stories → reviews.
- Note: S11 says iterations are "1 to 4 weeks"; this slide says "10 to 15 days". The two fit together (10–15 days is about two weeks), and this slide adds that the Manifesto itself did **not** fix two-week iterations or a team size.

### [W2-S13] What is a user requirement?
- Definition (word for word): "The user requirement defines the requirements of the user in terms of functionalities. There may be of two type of functionality." ⚠️ This should read "There may be two types". The two "types" are really two ways of *writing* a requirement:
  - ▪ "As a <User Role> I want <Functionality> so that <Business Value>"
  - ▪ "In order to <Business value> as a <User Role> I want <Functionality>."
- "During software release planning, a rough estimate is given to a user requirement using relative scale points. During iteration planning, the requirement is broken down into tasks."
- **Diagram: two trees**, each headed by a dark-red "User Story" label over a box.
  - Left tree: User Story → **"Task 1 — Estimate-8 hours"** and **"Tast 2 — Estimate- 4 hours"** (⚠️ "Tast" should be Task). A story is split into tasks estimated in hours.
  - Right tree: User Story → **"Acceptance test 1 — Pass"** and **"Acceptance test 2 — Fail"**. A story is checked by acceptance tests that pass or fail.
- See the real examples in this format on [W2-S41] (e.g., "As a guest, I want to cancel a reservation.").

| Planning level | What gets estimated | Unit |
|---|---|---|
| Release planning | the user requirement (rough estimate) | "relative scale points" |
| Iteration planning | the tasks the requirement is broken into | hours (2–12 h, see S14) |

### [W2-S14] Relation between User requirement and Task
- Word for word:
  - "User requirement talks about what is to be done. It defines the needs of users."
  - "Task talks about how it is to be done. It defines how functionality is implemented."
  - "User requirements are implemented by tasks. Every requirement is gathering as the task." (⚠️ garbled: it means every requirement is turned into tasks)
  - "User requirement is divided into different tasks when it is planned in current iteration."
  - "User tasks are estimated in hours based, generally it is between 2 to 12 hours."
  - "Requirements are validated using acceptance test."

| User requirement | Task |
|---|---|
| **WHAT** is to be done; "defines the needs of users" | **HOW** it is to be done; "defines how functionality is implemented" |
| divided into tasks when planned in the current iteration | implements the requirement |
| rough estimate in relative scale points (S13) | estimated in **hours, generally 2 to 12** |
| validated using **acceptance test** | — |

### [W2-S15] Comparison between the Agile methodology and Waterfall model:
- The table is an image on the slide (not in the raw text). Transcribed word for word:

| Agile methodology | Waterfall model |
|---|---|
| It follows the incremental approach. | It is a sequential design process. |
| It divides the project development lifecycle into a sprint. | The software development process is divided into distinct phases. |
| Agile methodology is a flexible methodology. | The Waterfall is a structured software development methodology. |
| Agile is the collection of many different projects. | It is completed as one single project. |
| The test plan is reviewed after each sprint | Test plan is reviewed after complete development. |
| Testing team can take part in the requirements change phase without problems. | It is difficult for the test to initiate any change in needs. |

- ⚠️ "divides … into a sprint" should be "sprints"; "for the test to initiate" has a word missing (likely "the testing team"/"tester").
- Keyword pairs to memorise: incremental ↔ sequential · sprints ↔ distinct phases · flexible ↔ structured · many projects ↔ one single project · test plan reviewed after each sprint ↔ after complete development.

### [W2-S16] Definitions of Scrum
- Definition 1 (word for word): "Scrum: A framework within which people can address complex adaptive problems, while productively and creatively delivering products of the highest possible value."
- Definition 2 (word for word): "Scrum is an agile project management framework that helps teams structure and manage their work through a set of values, principles, and practices."
- ⭐ In **bold**: "**Scrum is not a process, technique, or definitive method.** Rather, **it is a framework within which you can employ various processes and techniques.**"
- ⭐⭐ In **bold, large and underlined**: "**The Scrum framework consists of <u>Scrum Team members and their associated roles, events, artifacts, and rules.</u>**"
- "Each component within the framework serves a specific purpose and is essential to Scrum's success and usage."
- "The rules of Scrum bind together the roles, events, and artifacts, governing the relationships and interaction between them."
- Formula from this slide: **Scrum = roles + events + artifacts + rules**, where the rules bind the other three together.

### [W2-S17] The Scrum Team
- ⭐ (role names in bold) "The Scrum Team consists of a **Product Owner**, the **Development Team**, and a **Scrum Master**."
- "Scrum Teams are self-organizing and cross-functional."
- ⭐ "**Self-organizing teams** choose how best to accomplish their work, rather than being directed by others outside the team."
- ⭐ "**Cross-functional teams** have all competencies needed to accomplish the work without depending on others not part of the team."
- "The team model in Scrum is designed to optimize flexibility, creativity, and productivity."
- **Picture:** a ring divided into six segments, with six illustrated people standing around it (a stock image with "123RF" watermarks).
  - Clockwise from the top-left: **UX/UI Designer, Developer, Scrum Master, Product Owner, QA, Architect**.
  - Product Owner is the darkest blue segment, Scrum Master a medium blue, and the four specialist roles are light blue.

| Term | Slide meaning |
|---|---|
| Self-organizing | the team itself chooses *how* to do the work; not directed from outside |
| Cross-functional | the team has *all competencies* needed; doesn't depend on outsiders |

### [W2-S18] The Product Owner
- Definition (word for word): "The Product Owner is responsible for maximizing the value of the product resulting from work of the Development Team. How this is done may vary widely across organizations, Scrum Teams, and individuals."
- Duties (word for word):
  - "Define the features of the product"
  - "Makes scope vs. schedule decisions"
  - "Responsible for achieving financial goals of the project"
  - "Prioritize the product backlog"
  - "Adjust features and priority every sprint, as needed"
  - "Accept or reject work results"
- Picture: a cartoon man (glasses, beard, dark suit) holding a green sign, "PO PRODUCT OWNER".
- Other PO powers elsewhere in the deck: the only one who can cancel a Sprint [S30]; invites stakeholders to the Sprint Review and explains what is "Done" [S36]; prioritizes and reprioritizes the Product Backlog [S40, S43].

### [W2-S19] The Development Team
- Word for word:
  - "The Development Team consists of professionals who do the work of delivering a potentially releasable Increment of “Done” product at the end of each Sprint."
  - "A “Done” increment is required at the Sprint Review."
  - ⭐ (underlined on the slide) "<u>Only members of the Development Team create the Increment.</u>"
  - "Development Teams are structured and empowered by the organization to organize and manage their own work."
  - "The resulting synergy optimizes the Development Team’s overall efficiency and effectiveness."
- Picture: three cartoon men holding a green sign, "ST SCRUM TEAM".

### [W2-S20] Development Teams characteristics:
- Word for word (⭐ the bold parts are bold on the slide):
  - "**They are self-organizing**. No one (not even the Scrum Master) tells the Development Team how to turn Product Backlog into Increments of potentially releasable functionality;"
  - "**Development Teams are cross-functional**, with all the skills as a team necessary to create a product Increment;"
  - "**Scrum recognizes no titles for Development Team members**, regardless of the work being performed by the person;"
  - "**Scrum recognizes no sub-teams in the Development Team**, regardless of domains that need to be addressed like testing, architecture, operations, or business analysis; and,"
  - "Individual Development Team members may have specialized skills and areas of focus, but accountability belongs to the Development Team as a whole."
- Quick recall: **self-organizing · cross-functional · no titles · no sub-teams · team-wide accountability**.

### [W2-S21] Development Team Size
- Word for word:
  - "Optimal Development Team size is small enough to remain nimble and large enough to complete significant work within a Sprint."
  - "Smaller Development Teams may encounter skill constraints during the Sprint, causing the Development Team to be unable to deliver a potentially releasable Increment."
  - "Having more than nine members requires too much coordination. Large Development Teams generate too much complexity for an empirical process to be useful."
  - "The Product Owner and Scrum Master roles are not included in this count unless they are also executing the work of the Sprint Backlog."

| Too small | Too large ("more than nine members") |
|---|---|
| "may encounter skill constraints during the Sprint", so the team may be "unable to deliver a potentially releasable Increment" | "requires too much coordination"; "too much complexity for an empirical process to be useful" |

- Counting rule: the **PO and SM are not counted** unless they also do Sprint Backlog work.
- 🔎 Look up in Track B: "empirical process" (used here and on S24 and S26, never defined on the slides).

### [W2-S22] (no title) Development Team — quick facts
- Word for word:
  - "Typically 5-9 people"
  - "Cross-functional:"
  - "Programmers, testers, user experience designers, etc."
  - "Members should be full-time"
  - "May be exceptions (e.g., database administrator)"
  - "Teams are self-organizing"
  - "Ideally, no titles but rarely a possibility"
  - "Membership should change only between sprints"
- Picture: the same "ST SCRUM TEAM" cartoon as on S19 (three men holding a green sign).
- Note: S20 says "Scrum recognizes no titles". This slide is more realistic: "Ideally, no titles but rarely a possibility". The "5-9 people" figure agrees with S21's "more than nine … requires too much coordination".

### [W2-S23] The Scrum Master
- ⭐ (bold on slide) "**The Scrum Master is responsible for promoting and supporting Scrum as defined in the Scrum Guide.**"
- "Scrum Masters do this by helping everyone understand Scrum theory, practices, rules, and values."
- "The Scrum Master is a servant-leader for the Scrum Team."
- "The Scrum Master helps those outside the Scrum Team understand which of their interactions with the Scrum Team are helpful and which aren’t. The Scrum Master helps everyone change these interactions to maximize the value created by the Scrum Team."
- **Pictures:**
  - Two certification badges from "INTERNATIONAL SCRUM INSTITUTE™":
    - a red badge, "SMAC™ Scrum Master Accredited Certification™", "Price: USD 49.- Lifetime Valid in all Countries";
    - a purple badge, "SPOAC™ Scrum Product Owner Accredited Certification™", "Price: USD 69.- Lifetime Valid in all Countries".
  - A superhero-style cartoon man tearing open his shirt to reveal a "CSM" badge with "ScrumAlliance" written on it.
- 🔎 Look up in Track B:
  - the "Scrum Guide" (named on the slide, but not handed out);
  - what "servant-leader" means in practice;
  - what "CSM" stands for.

### [W2-S24] Scrum Master Service to the Product Owner
- "The Scrum Master serves the Product Owner in several ways, including:" (word for word, 7 items)
  - "Ensuring that goals, scope, and product domain are understood by everyone on the Scrum Team as well as possible;"
  - "Finding techniques for effective Product Backlog management;"
  - "Helping the Scrum Team understand the need for clear and concise Product Backlog items;"
  - "Understanding product planning in an empirical environment;"
  - "Ensuring the Product Owner knows how to arrange the Product Backlog to maximize value;"
  - "Understanding and practicing agility; and,"
  - "Facilitating Scrum events as requested or needed."

### [W2-S25] Scrum Master Service to the Development Team
- "The Scrum Master serves the Development Team in several ways, including:" (word for word, 5 items)
  - "Coaching the Development Team in self-organization and cross-functionality;"
  - "Helping the Development Team to create high-value products;"
  - "Removing impediments to the Development Team’s progress;"
  - "Facilitating Scrum events as requested or needed; and,"
  - "Coaching the Development Team in organizational environments in which Scrum is not yet fully adopted and understood."
- Picture: a cartoon man in a striped sweater holding a green sign, "SM SCRUM MASTER".

### [W2-S26] Scrum Master Service to the Organization
- "The Scrum Master serves the organization in several ways, including:" (word for word, 5 items)
  - "Leading and coaching the organization in its Scrum adoption;"
  - "Planning Scrum implementations within the organization;"
  - "Helping employees and stakeholders understand and enact Scrum and empirical product development;"
  - "Causing change that increases the productivity of the Scrum Team; and,"
  - "Working with other Scrum Masters to increase the effectiveness of the application of Scrum in the organization."

**Summary of S24–S26: whom the Scrum Master serves**

| Serves… | # of items | Keywords to recall |
|---|---|---|
| Product Owner [S24] | 7 | goals/scope/domain understood · Product Backlog management techniques · clear & concise PB items · product planning in an empirical environment · arrange PB to maximize value · agility · facilitate events |
| Development Team [S25] | 5 | coach self-organization & cross-functionality · high-value products · **remove impediments** · facilitate events · coach where Scrum isn't fully adopted |
| Organization [S26] | 5 | lead & coach Scrum adoption · plan Scrum implementations · help employees & stakeholders enact Scrum · cause change that raises productivity · work with other Scrum Masters |

- "Facilitating Scrum events as requested or needed" appears in **both** the PO list and the Dev Team list.

### [W2-S27] Scrum Events
- Word for word:
  - "Prescribed events are used in Scrum to create regularity and to minimize the need for meetings not defined in Scrum."
  - ⭐ (bold) "**All events are time-boxed events, such that every event has a maximum duration.**"
  - "Once a **Sprint** begins, its duration is fixed and cannot be shortened or lengthened." (⭐ "Sprint" in bold)
  - "The remaining events may end whenever the purpose of the event is achieved, ensuring an appropriate amount of time is spent without allowing waste in the process."
  - "Other than the Sprint itself, which is a container for all other events, each event in Scrum is a formal opportunity to inspect and adapt something."
  - "These events are specifically designed to enable critical transparency and inspection."
  - "Failure to include any of these events results in reduced transparency and is a lost opportunity to inspect and adapt."
- Key contrast: the **Sprint has a fixed length** (it can't be shortened or lengthened). The **other events have a maximum length**, but may end early once their purpose is achieved.

### [W2-S28] The Sprint — the big Scrum framework diagram
- ⭐ This is the deck's main Scrum picture. It appears **three times** (S28, again on S36 with arrows at Review/Retrospective, and on S40 with an arrow at the Product Backlog).
- What the picture shows, from left to right:
  1. **"Inputs from Executives, Team, Stakeholders, Customers, Users"**: several arrows point down onto the **Product Owner** (a blue figure).
  2. **Product Backlog**: a numbered list (1–8) with the callout "Ranked list of what is required: features, stories, …".
  3. A bracket leads to the **Sprint Planning Meeting**, with **"The Team"** (three figures) above it. The box reads: "Team selects starting at top as much as it can commit to deliver by end of Sprint".
  4. A bracket leads to the **Sprint Backlog**, a small stack of cards labelled "Task Breakout".
  5. A thick blue arrow leaves the Sprint Backlog and curls into a big circle labelled **"1-4 Week Sprint"**.
     - Riding on top of the big circle is a smaller circular arrow labelled **"Every 24 Hours"**, connected to a grey circle of people labelled **"Daily Scrum Meeting"**.
     - Above the loop stand the **Scrum Master** (a red figure) and a chart icon labelled **"Burndown/up Charts"**.
  6. Under the arrow: **"Sprint end date and team deliverable do not change"**.
  7. The arrow ends at **"Finished Work"** ("Finished" is underlined): an orange box with a person beside it.
  8. Two groups of people stand next to Finished Work: **"Sprint Review"** above it and **"Sprint Retrospective"** below it.
- One-line chain: Inputs → **Product Owner** → **Product Backlog** → **Sprint Planning Meeting** (The Team) → **Sprint Backlog** → **1-4 Week Sprint** (with a **Daily Scrum** every 24 hours) → **Finished Work** → **Sprint Review** + **Sprint Retrospective**.
- 🔎 Look up in Track B: "Burndown/up Charts" (only an icon in the picture, never explained).

### [W2-S29] (no title) The Sprint — rules
- Word for word, with the slide's emphasis:
  - ⭐ "**The heart of Scrum is a Sprint**, a time-box of one month or less during which a “Done”, useable, and potentially releasable product Increment is created."
  - "Sprints have consistent durations throughout a development effort. A new Sprint starts immediately after the conclusion of the previous Sprint."
  - ⭐ "Sprints contain and consist of the **<u>Sprint Planning</u>**, **<u>Daily Scrums</u>**, the **development work**, the **<u>Sprint Review</u>**, and the **<u>Sprint Retrospective</u>**." (the four event names are bold and underlined; "development work" is bold)
  - "During the Sprint:"
    - "No changes are made that would endanger the Sprint Goal;"
    - "Quality goals do not decrease; and,"
    - "Scope may be clarified and re-negotiated between the Product Owner and Development Team as more is learned."
  - ⭐ (bold) "**Each Sprint may be considered a project with no more than a one-month horizon.**"

| During the Sprint… | Allowed? |
|---|---|
| Changes that would endanger the Sprint Goal | ✗ No |
| Lowering quality goals | ✗ No |
| Clarifying / re-negotiating scope between PO and Dev Team "as more is learned" | ✓ Yes |
| Changing the Sprint's length (S27) or end date (S28: "Sprint end date and team deliverable do not change") | ✗ No |

### [W2-S30] Cancelling a Sprint
- ⭐ (bold) "**A Sprint can be cancelled before the Sprint time-box is over.**"
- Word for word:
  > "Only the Product Owner has the authority to cancel the Sprint, although he or she may do so under influence from the stakeholders, the Development Team, or the Scrum Master."
  >
  > "A Sprint would be cancelled if the Sprint Goal becomes obsolete. This might occur if the company changes direction or if market or technology conditions change. In general, a Sprint should be cancelled if it no longer makes sense given the circumstances. But, due to the short duration of Sprints, cancellation rarely makes sense. When a Sprint is cancelled, any completed and “Done” Product Backlog items are reviewed."
  >
  > "If part of the work is potentially releasable, the Product Owner typically accepts it. All incomplete Product Backlog Items are re-estimated and put back on the Product Backlog. The work done on them depreciates quickly and must be frequently re-estimated. Sprint cancellations consume resources, since everyone regroups in another Sprint Planning to start another Sprint. Sprint cancellations are often traumatic to the Scrum Team, and are very uncommon."
- Picture: a red rubber stamp, "CANCEL".

| Question | Answer from the slide |
|---|---|
| Who can cancel? | **Only the Product Owner** (possibly influenced by stakeholders, Dev Team or SM) |
| When? | before the Sprint time-box is over |
| Why? | the **Sprint Goal becomes obsolete** (company changes direction; market or technology conditions change); it "no longer makes sense" |
| Done items? | completed and "Done" items are **reviewed**; if potentially releasable, the PO "typically accepts it" |
| Incomplete items? | **re-estimated and put back on the Product Backlog** |
| Cost? | consumes resources (everyone regroups in another Sprint Planning); "often traumatic"; "very uncommon" |

### [W2-S31] Sprint Planning
- Word for word:
  - "The work to be performed in the Sprint is planned at the Sprint Planning."
  - "This plan is created by the collaborative work of the entire Scrum Team."
  - ⭐ (bold) "**Sprint Planning is time-boxed to a maximum of eight hours for a one-month Sprint.**"
  - "For shorter Sprints, the event is usually shorter. The Scrum Master ensures that the event takes place and that attendants understand its purpose. The Scrum Master teaches the Scrum Team to keep it within the time-box."
  - "Sprint Planning answers the following:"
    - "What can be delivered in the Increment resulting from the upcoming Sprint?"
    - "How will the work needed to deliver the Increment be achieved?"
- **Picture** (handwritten-style notes, with the headings highlighted in yellow), titled "Sprint planning meeting":
  - **Who:** "Team, ScrumMaster, & Product Owner"
  - **Agenda:** "Discuss top priority product backlog items" · "Team selects which to do"
  - **Why:** "Know what will be worked on" · "Understand it enough to do it"

### [W2-S32] Sprint Goal
- ⭐ (bold) "**The Sprint Goal is an objective set for the Sprint that can be met through the implementation of Product Backlog.**"
- "It provides guidance to the Development Team on why it is building the Increment. It is created during the Sprint Planning meeting."
- "The Sprint Goal gives the Development Team some flexibility regarding the functionality implemented within the Sprint. The selected Product Backlog items deliver one coherent function, which can be the Sprint Goal."
- Quick recall: the Sprint Goal is the **WHY** of the Sprint. It is **created in Sprint Planning**, it gives the Dev Team **flexibility**, and it is often "one coherent function".
- The deck later shows sprint cards that each describe one coherent function, e.g. "Sprint 7 — Implement basic shopping cart functionality including add, remove, and update." [S42] and "Sprint 8 — The checkout process…" [S44]. (Linking these cards to the Sprint Goal is my reading; the cards are not labelled "Sprint Goal".)

### [W2-S33] Factors affecting Sprint planning
- Word for word (⭐ the labels are bold):
  - **The What:** "The product owner describes the goal of the sprint and the backlog items which contribute to achieve that goal."
  - **The How:** "Agile development team plans its necessary work on how to achieve and deliver the sprint goal."
  - **The Who:** "The product owner defines the goal based on the value that the customers seek. And the developer needs to understand how they can or cannot deliver that goal."
  - **The Inputs:** "The product backlog provides the list of input stuff that could potentially be part of the current sprint. The team looks over the existing work done in incremental ways."
  - **The Outputs:** "The critical outcome of sprint planning is to meet described team goal. The product set the goal of sprint and how they will start working towards the goal." ⚠️ Words are missing: "The product set" probably means "The product owner sets", and "to meet described team goal" reads as "to meet the described team goal".
- **Diagram:** a dashed box labelled "Sprint Planning". A magenta arrow comes in from the left (labelled **"Inputs"**), makes one loop inside the box passing **"The what" → "The how" → "The who"**, and leaves on the right as a big arrowhead labelled **"Outputs"**.

| Factor | Who / what (slide) |
|---|---|
| The What | **PO** describes the sprint goal and the backlog items that contribute to it |
| The How | **Dev team** plans the work to achieve and deliver the sprint goal |
| The Who | **PO** defines the goal from the value customers seek; **developer** understands whether they can deliver it |
| The Inputs | the **product backlog** (list of candidate items) |
| The Outputs | the team goal, and how they will start working toward it |

### [W2-S34] Daily Scrum
- ⭐ (bold) "**The Daily Scrum is a 15-minute time-boxed stand-up event for the Development Team.**"
- "The Daily Scrum is held every day of the Sprint. At it, the Development Team plans work for the next 24 hours."
- "The Daily Scrum is held at the same time and place each day to reduce complexity. The Development Team uses the Daily Scrum to inspect progress toward the Sprint Goal and to inspect how progress is trending toward completing the work in the Sprint Backlog."
- **Picture: a Dilbert comic strip** (© 2013 Scott Adams), three panels:
  1. The pointy-haired boss: "Starting next week, our meetings will be 'stand-ups' with no chairs, so we'll be more focused."
  2. Dilbert: "So you examined all of the problems in the company and decided the root cause was chairs?"
  3. "We're also loosening the dress code." Dilbert: "So our problems are chairs and pants?"
  - The joke: removing the chairs doesn't by itself fix the company's real problems.

| Daily Scrum fact | Slide value |
|---|---|
| Time-box | **15 minutes** |
| For whom | **the Development Team** |
| How often / where | **every day** of the Sprint, **same time and place** |
| Plans | work for the **next 24 hours** |
| Inspects | progress toward the **Sprint Goal** and the trend toward completing the **Sprint Backlog** |

### [W2-S35] (no title) Daily Scrum — structure
- Word for word: ⭐ "**The structure of the meeting is set by the Development Team** and can be conducted in different ways if it focuses on progress toward the Sprint Goal. Some Development Teams will use questions, some will be more discussion based. Here is an example of what might be used:"
- **Picture:** a green gear labelled "**D**aily Standup", with a green circular arrow running round it. Pinned to it is a card that reads:
  - "1. Did?"
  - "2. Doing?"
  - "3. Dam? (!)" (the last symbol is hard to read; it looks like "(!)")
- Plain reading (mine, not written on the slide): **Did?** = what did I do; **Doing?** = what am I doing next; **Dam?** = what is blocking me, the way a dam blocks a river. Compare the Scrum Master's job of "Removing impediments to the Development Team’s progress" [S25].
- 🔎 Look up in Track B: the standard Daily Scrum questions this card abbreviates.

### [W2-S36] Sprint Review
- Word for word:
  - "Attendees include the Scrum Team and key stakeholders invited by the Product Owner;"
  - "The Product Owner explains what Product Backlog items have been “Done” and what has not been “Done”;"
  - "The Development Team discusses what went well during the Sprint, what problems it ran into, and how those problems were solved;"
  - "The Development Team demonstrates the work that it has “Done” and answers questions about the Increment;"
- ⭐ Picture: the S28 Sprint diagram again, shrunk, with **two big blue arrows** pointing at **"Sprint Review"** and **"Sprint Retrospective"** (the two end-of-Sprint events).
- 🔎 The slides give **no time-box for the Sprint Review**. Look it up in Track B.

### [W2-S37] Sprint Review cont…
- Word for word:
  - "The Product Owner discusses the Product Backlog as it stands. He or she projects likely target and delivery dates based on progress to date (if needed);"
  - "The entire group collaborates on what to do next, so that the Sprint Review provides valuable input to subsequent Sprint Planning;"
  - "Review of how the marketplace or potential use of the product might have changed what is the most valuable thing to do next; and,"
  - "Review of the timeline, budget, potential capabilities, and marketplace for the next anticipated releases of functionality or capability of the product."

| Sprint Review (S36–S37): who does what | |
|---|---|
| **Product Owner** | invites key stakeholders; explains what is "Done" / not "Done"; discusses the Product Backlog as it stands; projects likely target and delivery dates (if needed) |
| **Development Team** | discusses what went well, what problems it ran into and how they were solved; **demonstrates** the "Done" work; answers questions about the Increment |
| **Entire group** | collaborates on what to do next, which is input to the next Sprint Planning; reviews marketplace changes, timeline, budget, potential capabilities and marketplace for the next releases |

### [W2-S38] Sprint Retrospective
- Word for word:
  - "The Sprint Retrospective is an opportunity for the Scrum Team to inspect itself and create a plan for improvements to be enacted during the next Sprint."
  - "The Sprint Retrospective occurs after the Sprint Review and prior to the next Sprint Planning."
  - ⭐ (bold) "**This is at most a three-hour meeting for one-month Sprints.** For shorter Sprints, the event is usually shorter. The Scrum Master ensures that the event takes place and that attendants understand its purpose."
  - "The purpose of the Sprint Retrospective is to:"
    - "Inspect how the last Sprint went with regards to people, relationships, process, and tools;"
    - "Identify and order the major items that went well and potential improvements; and,"
    - "Create a plan for implementing improvements to the way the Scrum Team does its work."

| | Sprint Review [S36–S37] | Sprint Retrospective [S38] |
|---|---|---|
| Who | Scrum Team + **key stakeholders invited by the PO** | the **Scrum Team** ("to inspect itself") |
| Inspects | the "Done" work / Increment, the Product Backlog, marketplace, timeline, budget | "people, relationships, process, and tools" |
| Output | input to the next Sprint Planning (what to do next) | a plan for improvements to be enacted in the next Sprint |
| Time-box | not given on the slides 🔎 | **at most 3 hours** for one-month Sprints |
| Order | listed after the development work (S29) | **after the Sprint Review, before the next Sprint Planning** |

### [W2-S39] Scrum Artifacts
- Word for word: "Scrum’s artifacts represent work or value to provide transparency and opportunities for inspection and adaptation. Artifacts defined by Scrum are specifically designed to maximize transparency of key information so that everybody has the same understanding of the artifact"
- Listed artifacts:
  - "Product backlog"
  - "Sprint backlog"
- Picture: three unlabelled 3-D icons.
  1. A tall stack of blue slabs; the top three carry tiny labels, "Feature A", "Feature B", "Feature C".
  2. A shelf unit with three blue slabs on the left and a grid of green cubes on the right.
  3. A blue cube with a smaller stack of layers inside it.
- Note: this slide lists **only two** artifacts. The word "Increment" is used on other slides (S19, S29, S42, S46) but is not listed here as an artifact. 🔎 Look up in Track B whether the Increment counts as a Scrum artifact.

### [W2-S40] Product Backlog
- Word for word: "The requirements"
  - "A list of all desired work on the project"
  - "Ideally expressed such that each item has value to the users or customers of the product"
  - "Prioritized by the product owner"
  - "Reprioritized at the start of each sprint"
- ⭐ Picture: the S28 Sprint diagram again, with a **big light-blue arrow pointing at the Product Backlog** (the ranked list "1–8": "Ranked list of what is required: features, stories, …").

### [W2-S41] Product Backlog (example)
- The table is an image on the slide (not in the raw text). Transcribed word for word:

| Backlog item | Estimate |
|---|---|
| Allow a guest to make a reservation | 3 |
| As a guest, I want to cancel a reservation. | 5 |
| As a guest, I want to change the dates of a reservation. | 3 |
| As a hotel employee, I can run RevPAR reports (revenue-per-available-room) | 8 |
| Improve exception handling | 8 |
| … | 30 |
| … | 50 |

- What the example shows (a hotel reservation system):
  - Items are a mix of user-story style ("As a guest, I want …", see S13) and plain items ("Allow a guest to make a reservation", "Improve exception handling").
  - Each item has a numeric **estimate** with no unit written. These match the "relative scale points" of S13.
  - The bottom items ("…") have much larger estimates (30, 50).

### [W2-S42] Sprint Backlog
- Word for word:
  - "The Sprint Backlog is the set of Product Backlog items selected for the Sprint, plus a plan for delivering the product Increment and realizing the Sprint Goal."
  - "The Sprint Backlog is a forecast by the Development Team about what functionality will be in the next Increment and the work needed to deliver that functionality into a “Done” Increment."
- Formula from the slide: **Sprint Backlog = selected Product Backlog items + a plan** (to deliver the Increment and realize the Sprint Goal). It is the **Development Team's forecast**.
- **Pictures:**
  1. A note card headed **"Sprint 7"** (teal label), handwritten: "Implement basic shopping cart functionality including add, remove, and update."
  2. A hand-drawn sketch:
     - Left, a tall column labelled **"product backlog"**: 8 stacked items, the top 4 green and circled, the bottom 4 yellow.
     - An arrow runs from the circled top items to the right, to a column labelled **"sprint backlog"** with 4 green items.
     - Next to each sprint-backlog item is a row of small squares (3, 3, 2 and 3 squares). Each selected item has been broken into smaller pieces (tasks).
  - So the **top** of the Product Backlog moves into the Sprint Backlog and is broken down there (compare "Task Breakout" on S28).

### [W2-S43] What is the product backlog?
- Word for word:
  > "A product backlog is a registered list of work for the development team. It is driven from the roadmap and its requirements. The essential task is represented at the top of the product backlog so that the team member knows what to deliver first. The developer team doesn't work through the backlog from the product owner's side and product owner doesn't push the work to the developer team. The developer team pulls work from the product backlog."
  >
  > "Backlog starts with the two "R"s"
  >
  > "The fundamental product backlog is provided by a team's **roadmap** and **requirements**. Roadmap repetition breaks down into several epics, and each epic will have several requirements and user stories."
  >
  > "The product owner organizes each of the customer stories into a single list. This story is organized for the development team. The product owner chooses to deliver first complete epic."
  >
  > "The factors that influence a product owner's prioritization"
  > - ▪ "Priority of customer"
  > - ▪ "Importance of getting feedback"
  > - ▪ "Relative implementation difficulty"
  > - ▪ "Symbiotic relationships between work items"
- ⭐ The two "R"s, **roadmap** and **requirements**, are in bold on the slide.
- Structure from the slide: **roadmap → several epics → each epic has several requirements and user stories**. The PO puts the customer stories into **one single list**.
- **Pull, not push:** "The developer team pulls work from the product backlog." The PO does not push work onto the team.
- ⚠️ Unclear wording: "Roadmap repetition breaks down into several epics" (perhaps a mistranslation); "chooses to deliver first complete epic" has an article missing.
- 🔎 Look up in Track B: "epic" and "roadmap" (used here but not defined on the slides).

### [W2-S44] Managing the sprint backlog
- Word for word:
  - "Individuals sign up for work of their own choosing"
  - "Work is never assigned"
  - "Estimated work remaining is updated daily"
  - "Any team member can add, delete or change the sprint backlog"
  - "Work for the sprint emerges"
  - "If work is unclear, define a sprint backlog item with a larger amount of time and break it down later"
  - "Update work remaining as more becomes known"
- Picture: a note card headed **"Sprint 8"** (teal label), handwritten: "The checkout process—pay for an order, pick shipping, order gift wrapping, etc." (It follows on from "Sprint 7" on S42: shopping cart first, then checkout.)

| Product Backlog [S40, S43] | Sprint Backlog [S42, S44] |
|---|---|
| "A list of all desired work on the project" | the PB items "selected for the Sprint, plus a plan" |
| **Prioritized by the product owner**; reprioritized at the start of each sprint | a **forecast by the Development Team** |
| driven from roadmap & requirements; most important item on top | individuals **sign up**; work is **never assigned**; **any team member** can add/delete/change it |
| team **pulls** work from it | estimated work remaining **updated daily**; work "emerges" |

### [W2-S45] Artifact Transparency
- Word for word:
  - "Scrum relies on transparency. Decisions to optimize value and control risk are made based on the perceived state of the artifacts."
  - "The Scrum Master must work with the Product Owner, Development Team, and other involved parties to understand if the artifacts are completely transparent."
- Who is responsible: the **Scrum Master** works with everyone to check that the artifacts are completely transparent.

### [W2-S46] Definition of “Done”
- Word for word:
  - "When a Product Backlog item or an Increment is described as “Done”, everyone must understand what “Done” means."
  - "Although this may vary significantly per Scrum Team, members must have a shared understanding of what it means for work to be complete, to ensure transparency."
  - "This is the definition of “Done” for the Scrum Team and is used to assess when work is complete on the product Increment"
- Key points: it applies to **PB items and the Increment**; it **may vary per Scrum Team**; it must be **shared** by the team (for **transparency**); it is used to **assess when work is complete**.
- Where "Done" appears elsewhere: a "Done" Increment is required at the Sprint Review [S19]; the Sprint creates a "Done", useable, potentially releasable Increment [S29]; on cancellation, "Done" items are reviewed [S30]; at the Review the PO explains what has / has not been "Done" [S36].

### [W2-S47] Kanban (section title)
- Big title "Kanban" with the Japanese characters **"看板"** beside it.
- **Picture: "KANBAN BOARD"** with three columns:
  - **REQUESTED** (blue header), **IN PROGRESS 3/4** (yellow header), **DONE** (green header).
  - Four grey labels on the left have dotted pointer lines into the board:
    - **"WIP Limit"** points at the **"3/4"** in the In Progress header. (My reading: 3 cards now, limit 4. The slide does not spell this out; see S55 for what a WIP limit is.)
    - **"Column"** points at a column.
    - **"Card"** points at a yellow card that is shown sliding from Requested into In Progress.
    - **"Swimlane"** points at a red horizontal band labelled **"EXPEDITE"** that runs across all three columns.
  - Cards: Requested has 1 blue card (plus the card on the move). In Progress has 1 yellow card and an empty grey slot above the lane, and 1 purple card below it. Done has 2 green cards above the lane and 1 below it.
- 🔎 Look up in Track B: "swimlane" / an "Expedite" lane. They are only labelled in this picture, never explained.

### [W2-S48] What is KANBAN?
- Word for word: "Kanban is a popular framework used to implement agile and DevOps software development. It requires real-time communication of capacity and full transparency of work. Work items are represented visually on a kanban board, allowing team members to see the state of every piece of work at any time."
- The words "agile", "DevOps" and "kanban board" are underlined on the slide. They look like web-link formatting copied from a website.
- Picture: the same labelled KANBAN BOARD as on S47 (Requested / In Progress 3/4 / Done; WIP Limit, Column, Card, Swimlane "EXPEDITE").
- Key phrases: "framework" for agile **and** DevOps · "real-time communication of capacity" · "full transparency of work" · see "the state of every piece of work at any time".

### [W2-S49] (no title) Kanban — origin and uses
- Word for word:
  > "The Japanese word “kanban”, meaning “visual board” or a “sign”, has been used in the sense of a process definition since the 1950s. It was first developed and applied by Toyota as a scheduling system for just-in-time manufacturing. On the other hand, the capitalized term “Kanban” is known and associated with the emergence of the “Kanban Method,” which was first defined in 2007."
  >
  > "Kanban is a method to gradually improve whatever you do, whether software development, IT/ Ops, Staffing, Recruitment, Marketing and Sales or Procurement. In fact, almost any business function can benefit from applying Kanban to bring about significant benefits such as reduced lead time, increased throughput and much higher quality of products or services delivered."
- Sources printed on the slide (blue links): https://kanbanize.com/kanban-resources/getting-started/what-is-kanban · https://www.tutorialspoint.com/kanban/index.htm

| Fact | From the slide |
|---|---|
| Meaning of "kanban" | Japanese for **"visual board" or a "sign"** |
| Used as a process definition since | **the 1950s** |
| First developed and applied by | **Toyota**, "as a scheduling system for **just-in-time manufacturing**" |
| Capitalised "Kanban" | the **"Kanban Method"**, first defined in **2007** |
| Where it can be used | software development, IT/ Ops, Staffing, Recruitment, Marketing and Sales, Procurement ("almost any business function") |
| Benefits named | reduced lead time · increased throughput · much higher quality |

- 🔎 Look up in Track B: "just-in-time manufacturing" and "throughput" (not explained on the slides).

### [W2-S50] The core concept of Kanban
- ⭐ The three concept names are large headings on the slide. Word for word:
  - **Visualize Workflow**
    - "Split the entire work into defined segments or states, visualized as named columns on a wall."
    - "Write each item on a card and put in a column to indicate where the item is in the workflow."
  - **Limit WIP**
    - "Assign explicit limits to how many items can be in progress at each workflow segment / state. i.e., Work in Progress (WIP) is limited in each workflow state."
  - **Measure the Lead Time**
    - "Lead Time, also known as cycle time is the average time to complete one item. Measure the Lead Time and optimize the process to make the Lead Time as small and predictable as possible."
- Memory: **Visualize → Limit → Measure** (cards in columns → cap the WIP → shrink the lead time).

### [W2-S51] Kanban - Benefits
- Word for word (6 points):
  1. "Bottlenecks become clearly visible in real-time. This leads people to collaborate to optimize the whole value chain rather than just their part."
  2. "Useful for situations where operations and support teams have a high rate of uncertainty and variability."
  3. "Tends to spread throughout the organization naturally, including sales and management. This increases visibility of everything that is going on at the company."
  4. "Reduces inventory in the range of 25%-75%, thereby reducing company costs."
  5. "Since all segments/states in the workflow are visually organized, the required items, reducing the wait times and ensuring speed, continually support all the tasks in the workflow." ⚠️ The sentence is garbled. Its gist: because every state is visible, the needed items keep flowing to every task, which cuts waiting time.
  6. "Overproduction of inventory is avoided, thereby saving resources and time as well. This is termed as eliminating waste."
- Numbers and terms to remember: inventory reduced by **25%–75%**. Avoiding overproduction is called **"eliminating waste"**.

### [W2-S52] Alignment with Agile
- Word for word: "In agile, if values are combined with Kanban characteristics, the outcome would be Agile Kanban. This practice is gaining popularity in Software Development wherein the Agile iteration approach and Kanban value stream focus are combined."
- Formula: **Agile Kanban = Agile iteration approach + Kanban value stream focus**.
- 🔎 Look up in Track B: "value stream" (not defined on the slides).

### [W2-S53] What is a kanban board?
- Word for word: "A kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow). It can help both agile and DevOps teams establish order in their daily work. Kanban boards use cards, columns, and continuous improvement to help technology and service teams commit to the right amount of work, and get it done!"
- ("agile" and "DevOps" are underlined on the slide, which looks like copied link formatting.)
- A board does three things: **visualize work · limit WIP · maximize efficiency (flow)**. It uses three things: **cards, columns, continuous improvement**.

### [W2-S54] (no title) Kanban Board — labelled picture
- No body text; the raw text caught nothing. The picture is titled **"Kanban Board"** and has a colour legend:

| Dot colour | Means |
|---|---|
| red | Visual signal |
| orange | Columns |
| purple | Work-in-progress limit |
| cyan/teal | Commitment point |
| green | Delivery point |

- The board has four columns, each with a purple tag and grey placeholder text at the top:
  1. A **cyan** column with a cyan dot at its top corner (= **commitment point**). It holds 4 cards with cyan squares; a fifth cyan card is being dragged out toward column 2.
  2. A **grey** column with grey cards. One card is outlined in **red**, with a red square and a red dot (= a **visual signal**). There is an empty grey slot at the bottom.
  3. A column **outlined in orange**, with an orange dot (= **columns**). It holds 4 grey cards, and a **purple dot sits on its header tag** (= **WIP limit**).
  4. A **green** column with a green dot at its top corner (= **delivery point**). It holds 2 green cards, and a green card is being dragged in from column 3 into an empty green slot.
- Reading the picture: work enters at the commitment point (left), flows through the columns, and finishes at the delivery point (right). The five labelled elements are explained in words on S55.

### [W2-S55] (no title) Kanban board elements — explained
- ⭐ The five element names are **bold** on the slide. Word for word:
  - **Visual Signals** — "One of the first things you’ll notice about a kanban board are the visual cards (stickies, tickets, or otherwise). Kanban teams write all of their projects and work items onto cards, usually one per card. For agile teams, each card could encapsulate one user story. Once on the board, these visual signals help teammates and stakeholders quickly understand what the team is working on."
  - **Columns** — "Another hallmark of the kanban board are the columns. Each column represents a specific activity that together compose a “workflow”. Cards flow through the workflow until completion. Workflows can be as simple as “To Do,” “In Progress,” “Complete,” or much more complex."
  - **Work In Progress (WIP) Limits** — "WIP limits are the maximum number of cards that can be in one column at any given time. A column with a WIP limit of three cannot have more than three cards in it. When the column is “maxed-out” the team needs to swarm on those cards and move them forward before new cards can move into that stage of the workflow. These WIP limits are critical for exposing bottlenecks in the workflow and maximizing flow. WIP limits give you an early warning sign that you committed to too much work."
  - **Commitment point** — "Kanban teams often have a backlog for their board. This is where customers and teammates put ideas for projects that the team can pick up when they are ready. The commitment point is the moment when an idea is picked up by the team and work starts on the project."
  - **Delivery point** — "The delivery point is the end of a kanban team’s workflow. For most teams, the delivery point is when the product or service is in the hands of the customer. The team’s goal is to take cards from the commitment point to the delivery point as fast as possible. The elapsed time between the two is the called Lead Time. Kanban teams are continuously improving to decrease their lead time as much as possible." ⚠️ "is the called Lead Time" should be "is called Lead Time".
- ("user story" and "Workflows" are underlined on the slide, which looks like copied link formatting.)

| Element | In one line (slide content) |
|---|---|
| Visual signals | the cards; usually one work item per card; for agile teams, possibly one user story per card |
| Columns | each = one activity; together = the workflow (e.g., "To Do," "In Progress," "Complete") |
| WIP limit | max cards per column; when maxed out, the team **swarms** to move cards on; exposes bottlenecks; early warning of over-commitment |
| Commitment point | the moment an idea is picked up from the board's backlog and work starts |
| Delivery point | the end of the workflow; usually the product or service is in the customer's hands |
| **Lead Time** | elapsed time from commitment point to delivery point (S50: "also known as cycle time … the average time to complete one item") |

### [W2-S56] What are WIP limits?
- Word for word: "In agile development, work in progress (WIP) limits set the maximum amount of work that can exist in each status of a workflow. Limiting the amount of work in progress makes it easier to identify inefficiency in a team's workflow. Bottlenecks in a team's delivery pipeline are clearly visible before a situation becomes dire."
- The three WIP-limit statements in the deck say the same thing in different words:
  - [S50] "explicit limits to how many items can be in progress at each workflow segment / state";
  - [S55] "the maximum number of cards that can be in one column at any given time";
  - [S56] "the maximum amount of work that can exist in each status of a workflow".
- Why WIP limits matter: they make inefficiency and **bottlenecks visible early**, "before a situation becomes dire".

### [W2-S57] What Is DevOps *(development & operations)*?
- Word for word:
  - "DevOps is a set of <u>practices</u>, <u>tools</u>, and a <u>cultural philosophy</u> that automate and integrate the processes between software development and IT teams. It emphasizes team empowerment, cross-team communication and collaboration, and technology automation."
  - "A DevOps team includes developers and IT operations working collaboratively throughout the product lifecycle, in order to increase the speed and quality of software deployment. It’s a new way of working, a cultural shift, that has significant implications for teams and the organizations they work for."
- The words "practices", "tools" and "cultural philosophy" are underlined on the slide. That may be copied link formatting, but they are also exactly the **three parts of the definition**.
- Definition breakdown:
  - **What:** practices + tools + a cultural philosophy.
  - **Does:** automates and integrates the processes between software development and IT teams.
  - **Emphasizes:** team empowerment · cross-team communication and collaboration · technology automation.
  - **Team:** developers + IT operations, working together "throughout the product lifecycle".
  - **Goal:** "increase the speed and quality of software deployment".
  - It is "a cultural shift".

### [W2-S58] The DevOps lifecycle
- The slide is pictures only (the raw text caught nothing but the title). It shows **two "infinity loop" (∞) diagrams**. Each joins a DEV loop and an OPS loop, so the cycle never ends.
- **Diagram A** (top right): two linked coloured rings with **"DEV"** and **"OPS"** in their centres. Following the arrow-shaped segments:
  - DEV ring: **PLAN → CREATE → VERIFY → PACKAGE**.
  - PACKAGE crosses the middle into the OPS ring: **RELEASE → CONFIGURE → MONITOR**.
  - A teal band then crosses the middle back to **PLAN**.
- **Diagram B** (bottom left, with a "KOENIG step forward" logo): a blue ∞ with **"Dev"** on the left loop and **"Ops"** on the right loop.
  - Dev loop: **PLAN → CODE → BUILD → TEST**.
  - Then the big diagonal **RELEASE** arrow crosses the middle into the Ops loop: **DEPLOY → OPERATE → MONITOR**.
  - A small arrow then crosses the middle back to **PLAN**.

| | Diagram A (DEV / OPS rings) | Diagram B (Koenig ∞) |
|---|---|---|
| Dev side | Plan → Create → Verify → Package | Plan → Code → Build → Test |
| Crossing to Ops | Package → **Release** | **Release** |
| Ops side | Release → Configure → Monitor | Deploy → Operate → Monitor |
| Back to start | Monitor → … → Plan | Monitor → … → Plan |

- Common to both: the cycle **starts at Plan, passes through Release, ends at Monitor and loops back to Plan**.
- Only **Plan** and **Operate** get a text explanation in the deck, on the next slide [S59].

### [W2-S59] (no title) DevOps stages explained — Plan, Operate
- Word for word:
  - **Plan** — "DevOps teams should adopt agile practices to improve speed and quality. Agile is an iterative approach to project management and software development that helps teams break work into smaller pieces to deliver incremental value."
  - **Operate** — "Manage the end-to-end delivery of IT services to customers. This includes the practices involved in design, implementation, configuration, deployment, and maintenance of all IT infrastructure that supports an organization’s services."
- Links: DevOps planning uses **agile** practices. Agile is again described as "an iterative approach", the same idea as S11.
- 🔎 Look up in Track B: descriptions of the other lifecycle stages (code, build, test, release, deploy, monitor, etc.). The slides only name them in the picture.

### [W2-S60] 5 Key DevOps principles
- Word for word: "To realize the full potential of DevOps, teams should follow key DevOps principles"
- ⭐ **Collaboration** (bold heading):
  > "The key premise behind DevOps is collaboration. Development and operations teams coalesce into a functional team that communicates, shares feedback, and collaborates throughout the entire development and deployment cycle. Often, this means development and operations teams merge into a single team that works across the entire application lifecycle."
  >
  > "The members of a DevOps team are responsible for ensuring quality deliverables across each facet of the product. This leads to more ‘full stack’ development, where teams own the complete backend-to-frontend responsibilities of a feature or product. Teams will own a feature or project throughout the complete lifecycle from idea to delivery. This enhanced level of investment and attachment from the team leads to higher quality output."
- The 5 principles, over S60–S62: **Collaboration · Automation · Continuous Improvement · Customer-centric action · Create with the end in mind**.

### [W2-S61] (no title) DevOps principles — Automation, Continuous Improvement
- ⭐ **Automation** (bold heading), word for word: "An essential practice of DevOps is to automate as much of the software development lifecycle as possible. This gives developers more time to write code and develop new features. Automation is a key element of a CI/CD pipeline and helps to reduce human errors and increase team productivity. With automated processes, teams achieve continuous improvement with short iteration times, which allows them to quickly respond to customer feedback."
- ⭐ **Continuous Improvement** (bold heading), word for word: "Continuous improvement was established as a staple of agile practices, as well as lean manufacturing and Improvement Kata. It’s the practice of focusing on experimentation, minimizing waste, and optimizing for speed, cost, and ease of delivery. Continuous improvement is also tied to continuous delivery, allowing DevOps teams to continuously push updates that improve the efficiency of software systems. The constant pipeline of new releases means teams consistently push code changes that eliminate waste, improve development efficiency, and bring more customer value."
- The blue underlined words on the slide ("CI/CD pipeline", "agile practices", "Improvement Kata", "continuous delivery") are hyperlinks to atlassian.com pages in the PDF.
- 🔎 Look up in Track B: "CI/CD pipeline", "continuous delivery", "lean manufacturing", "Improvement Kata" (named but not explained in class).

### [W2-S62] (no title) DevOps principles — Customer-centric action, Create with the end in mind
- ⭐ **Customer-centric action** (bold heading), word for word: "DevOps teams use short feedback loops with customers and end users to develop products and services centered around user needs. DevOps practices enable rapid collection and response to user feedback through use of real-time live monitoring and rapid deployment. Teams get immediate visibility into how live users interact with a software system and use that insight to develop further improvements."
- ⭐ **Create with the end in mind** (bold heading), word for word: "This principle involves understanding the needs of customers and creating products or services that solve real problems. Teams shouldn’t ‘build in a bubble’, or create software based on assumptions about how consumers will use the software. Rather, DevOps teams should have a holistic understanding of the product, from creation to implementation."

| # | DevOps principle | Key words from the slide |
|---|---|---|
| 1 | Collaboration [S60] | dev + ops "coalesce" / "merge into a single team"; "full stack" development; own a feature "from idea to delivery" |
| 2 | Automation [S61] | automate as much of the lifecycle as possible; key element of a CI/CD pipeline; fewer human errors; more productivity |
| 3 | Continuous Improvement [S61] | experimentation; minimizing waste; optimizing speed, cost and ease of delivery; tied to continuous delivery |
| 4 | Customer-centric action [S62] | short feedback loops; real-time live monitoring; rapid deployment |
| 5 | Create with the end in mind [S62] | solve real problems; don't "build in a bubble"; holistic understanding "from creation to implementation" |

### [W2-S63] Benefits of DevOps
- Word for word: "There are three primary categories of benefits for DevOps:" ▪ "technical benefits" ▪ "cultural benefits" ▪ "business benefits."
  - "The technical benefits include reduced complexity, continuous delivery, and faster problem resolution. DevOps practitioners typically deploy higher-quality code faster than traditional siloed teams."
  - "The cultural benefits are more productive and efficient teams, and happier customers."
  - "On the business end, the benefits include greater collaboration and trust between team members, which results in faster delivery and stable operating environments."

| Category | Benefits named on the slide |
|---|---|
| Technical | reduced complexity · continuous delivery · faster problem resolution · higher-quality code deployed faster than "traditional siloed teams" |
| Cultural | more productive and efficient teams · happier customers |
| Business | greater collaboration and trust between team members, leading to faster delivery and stable operating environments |

---

## 3. Definitions & key terms (word for word, with refs)

### 3.1 Agile
- **Agile manifesto (the 4 values)** [W2-S3]: "Individuals and interactions over processes and tools" · "Working software over comprehensive documentation" · "Customer collaboration over contract negotiation" · "Responding to change over following a plan" · "That is, while there is value in the items on the right, we value the items on the left more."
- **Agile methodology** [W2-S11]: "An agile methodology is an iterative approach to software development. Each iteration of agile methodology takes a short time interval of 1 to 4 weeks."
- **Agile methodology (what it is NOT)** [W2-S12]: "An Agile methodology is not a specific set of ceremonies or specific development techniques. Rather, it is a group of methodologies that demonstrate a commitment to tight feedback cycles and continuous improvement."
- **Agile (as defined on the DevOps slide)** [W2-S59]: "Agile is an iterative approach to project management and software development that helps teams break work into smaller pieces to deliver incremental value."
- **Single-phase software development** [W2-S11]: "The single-phase software development takes 6 to 18 months. In single-phase development, all the requirement gathering and risks management factors are predicted initially."
- **Waterfall model** [W2-S15]: "It is a sequential design process." · "The Waterfall is a structured software development methodology." · "It is completed as one single project."
- **User requirement** [W2-S13]: "The user requirement defines the requirements of the user in terms of functionalities."
  - Formats: "As a <User Role> I want <Functionality> so that <Business Value>" / "In order to <Business value> as a <User Role> I want <Functionality>."
- **User requirement vs Task** [W2-S14]: "User requirement talks about what is to be done. It defines the needs of users." / "Task talks about how it is to be done. It defines how functionality is implemented."
- **Task estimate** [W2-S14]: "User tasks are estimated in hours based, generally it is between 2 to 12 hours."
- **Acceptance test** [W2-S14]: "Requirements are validated using acceptance test." (no further definition)
- **Cargo Cults** [W2-S6]: "The Cargo Cults believe that manufactured western goods ('cargo') have been created by ancestral spirits and intended for Melanesian people."

### 3.2 Scrum: framework and roles
- **Scrum** [W2-S16]: "A framework within which people can address complex adaptive problems, while productively and creatively delivering products of the highest possible value."
- **Scrum (2nd definition)** [W2-S16]: "Scrum is an agile project management framework that helps teams structure and manage their work through a set of values, principles, and practices."
- **What Scrum is not** [W2-S16]: "Scrum is not a process, technique, or definitive method. Rather, it is a framework within which you can employ various processes and techniques."
- **Scrum framework** [W2-S16]: "The Scrum framework consists of Scrum Team members and their associated roles, events, artifacts, and rules."
- **Rules of Scrum** [W2-S16]: "The rules of Scrum bind together the roles, events, and artifacts, governing the relationships and interaction between them."
- **Scrum Team** [W2-S17]: "The Scrum Team consists of a Product Owner, the Development Team, and a Scrum Master."
- **Self-organizing teams** [W2-S17]: "Self-organizing teams choose how best to accomplish their work, rather than being directed by others outside the team."
- **Cross-functional teams** [W2-S17]: "Cross-functional teams have all competencies needed to accomplish the work without depending on others not part of the team."
- **Product Owner** [W2-S18]: "The Product Owner is responsible for maximizing the value of the product resulting from work of the Development Team."
- **Development Team** [W2-S19]: "The Development Team consists of professionals who do the work of delivering a potentially releasable Increment of “Done” product at the end of each Sprint."
- **Optimal Development Team size** [W2-S21]: "Optimal Development Team size is small enough to remain nimble and large enough to complete significant work within a Sprint."
- **Scrum Master** [W2-S23]: "The Scrum Master is responsible for promoting and supporting Scrum as defined in the Scrum Guide." · "The Scrum Master is a servant-leader for the Scrum Team."

### 3.3 Scrum: events
- **Scrum events** [W2-S27]: "Prescribed events are used in Scrum to create regularity and to minimize the need for meetings not defined in Scrum."
- **Time-boxed** [W2-S27]: "All events are time-boxed events, such that every event has a maximum duration."
- **Sprint** [W2-S29]: "The heart of Scrum is a Sprint, a time-box of one month or less during which a “Done”, useable, and potentially releasable product Increment is created."
  - Also: the Sprint is "a container for all other events" [S27], and "Each Sprint may be considered a project with no more than a one-month horizon." [S29]
- **Sprint Planning** [W2-S31]: "The work to be performed in the Sprint is planned at the Sprint Planning."
- **Sprint Goal** [W2-S32]: "The Sprint Goal is an objective set for the Sprint that can be met through the implementation of Product Backlog."
- **Daily Scrum** [W2-S34]: "The Daily Scrum is a 15-minute time-boxed stand-up event for the Development Team."
- **Sprint Review** [W2-S36–S37]: the slides give no one-line definition. Closest: "Attendees include the Scrum Team and key stakeholders invited by the Product Owner;" … "The entire group collaborates on what to do next, so that the Sprint Review provides valuable input to subsequent Sprint Planning;"
- **Sprint Retrospective** [W2-S38]: "The Sprint Retrospective is an opportunity for the Scrum Team to inspect itself and create a plan for improvements to be enacted during the next Sprint."

### 3.4 Scrum: artifacts
- **Scrum artifacts** [W2-S39]: "Scrum’s artifacts represent work or value to provide transparency and opportunities for inspection and adaptation."
- **Product Backlog** [W2-S40]: "A list of all desired work on the project". Also [S43]: "A product backlog is a registered list of work for the development team. It is driven from the roadmap and its requirements."
- **Sprint Backlog** [W2-S42]: "The Sprint Backlog is the set of Product Backlog items selected for the Sprint, plus a plan for delivering the product Increment and realizing the Sprint Goal." · "The Sprint Backlog is a forecast by the Development Team about what functionality will be in the next Increment and the work needed to deliver that functionality into a “Done” Increment."
- **Artifact transparency** [W2-S45]: "Scrum relies on transparency. Decisions to optimize value and control risk are made based on the perceived state of the artifacts."
- **Definition of “Done”** [W2-S46]: "When a Product Backlog item or an Increment is described as “Done”, everyone must understand what “Done” means." … "This is the definition of “Done” for the Scrum Team and is used to assess when work is complete on the product Increment"
- **Increment**: no standalone definition on the slides. It is described as "a potentially releasable Increment of “Done” product" [S19] and "a “Done”, useable, and potentially releasable product Increment" [S29]. 🔎 Look it up in Track B.

### 3.5 Kanban
- **"kanban" (the word)** [W2-S49]: "The Japanese word “kanban”, meaning “visual board” or a “sign”, has been used in the sense of a process definition since the 1950s."
- **Kanban (framework)** [W2-S48]: "Kanban is a popular framework used to implement agile and DevOps software development. It requires real-time communication of capacity and full transparency of work."
- **Kanban (method)** [W2-S49]: "Kanban is a method to gradually improve whatever you do, …"
- **Kanban Method** [W2-S49]: "the capitalized term “Kanban” is known and associated with the emergence of the “Kanban Method,” which was first defined in 2007."
- **Kanban board** [W2-S53]: "A kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow)."
- **Visual signals** [W2-S55]: "One of the first things you’ll notice about a kanban board are the visual cards (stickies, tickets, or otherwise)."
- **Columns** [W2-S55]: "Each column represents a specific activity that together compose a “workflow”."
- **WIP limits** [W2-S55]: "WIP limits are the maximum number of cards that can be in one column at any given time." Also [S56]: "In agile development, work in progress (WIP) limits set the maximum amount of work that can exist in each status of a workflow."
- **Commitment point** [W2-S55]: "The commitment point is the moment when an idea is picked up by the team and work starts on the project."
- **Delivery point** [W2-S55]: "The delivery point is the end of a kanban team’s workflow."
- **Lead Time** [W2-S50]: "Lead Time, also known as cycle time is the average time to complete one item." Also [S55]: "The elapsed time between the two [= commitment point and delivery point] is the called Lead Time."
- **Eliminating waste** [W2-S51]: "Overproduction of inventory is avoided, thereby saving resources and time as well. This is termed as eliminating waste."
- **Agile Kanban** [W2-S52]: "In agile, if values are combined with Kanban characteristics, the outcome would be Agile Kanban."

### 3.6 DevOps
- **DevOps** [W2-S57]: "DevOps is a set of practices, tools, and a cultural philosophy that automate and integrate the processes between software development and IT teams."
- **DevOps team** [W2-S57]: "A DevOps team includes developers and IT operations working collaboratively throughout the product lifecycle, in order to increase the speed and quality of software deployment."
- **Plan (lifecycle stage)** [W2-S59]: "DevOps teams should adopt agile practices to improve speed and quality."
- **Operate (lifecycle stage)** [W2-S59]: "Manage the end-to-end delivery of IT services to customers."
- **Collaboration (principle)** [W2-S60]: "The key premise behind DevOps is collaboration."
- **Automation (principle)** [W2-S61]: "An essential practice of DevOps is to automate as much of the software development lifecycle as possible."
- **Continuous Improvement (principle)** [W2-S61]: "It’s the practice of focusing on experimentation, minimizing waste, and optimizing for speed, cost, and ease of delivery."
- **Customer-centric action (principle)** [W2-S62]: "DevOps teams use short feedback loops with customers and end users to develop products and services centered around user needs."
- **Create with the end in mind (principle)** [W2-S62]: "This principle involves understanding the needs of customers and creating products or services that solve real problems."
- **Benefits of DevOps** [W2-S63]: "There are three primary categories of benefits for DevOps:" ▪ "technical benefits" ▪ "cultural benefits" ▪ "business benefits."

---

## 4. Scrum cheat-sheet (as taught)

### 4.1 Roles & accountabilities: who does what

| Role | Core line from the slides | Does… | "Only / never" facts |
|---|---|---|---|
| **Product Owner (PO)** | "responsible for maximizing the value of the product resulting from work of the Development Team" [S18] | defines features; makes scope vs. schedule decisions; responsible for financial goals; **prioritizes the product backlog**; adjusts features & priority every sprint; **accepts or rejects work results** [S18] · reprioritizes PB at the start of each sprint [S40] · puts customer stories in one list, prioritizing by: priority of customer, importance of getting feedback, relative implementation difficulty, symbiotic relationships between work items [S43] · "The What" (describes the sprint goal and items) and "The Who" (defines the goal from the value customers seek) [S33] · invites key stakeholders to the Review, explains what is "Done" / not "Done", projects target & delivery dates [S36–S37] · may re-negotiate scope with the Dev Team during the Sprint [S29] | **ONLY the PO can cancel a Sprint** [S30] · does **not push** work to the team [S43] · not counted in Dev Team size unless doing Sprint Backlog work [S21] |
| **Development Team** | "professionals who do the work of delivering a potentially releasable Increment of “Done” product at the end of each Sprint" [S19] | **creates the Increment** [S19] · "The How": plans the work to deliver the sprint goal [S33] · Daily Scrum: plans the next 24 hours and inspects progress [S34]; **sets the structure** of the Daily Scrum [S35] · Review: discusses what went well and the problems, **demonstrates** "Done" work, answers questions [S36] · owns the Sprint Backlog forecast [S42] · signs up for work; any member can add/delete/change the sprint backlog; updates work remaining daily [S44] · **pulls** work from the PB [S43] | **ONLY Dev Team members create the Increment** [S19] · **no one (not even the SM) tells them how** to turn PB into Increments [S20] · **no titles, no sub-teams**; accountability belongs to the whole team [S20] · "more than nine" members = too much coordination; typically **5–9**; full-time (exceptions, e.g. DBA); membership changes **only between sprints** [S21–S22] · work is **never assigned** [S44] |
| **Scrum Master (SM)** | "responsible for promoting and supporting Scrum as defined in the Scrum Guide"; "a **servant-leader** for the Scrum Team" [S23] | helps everyone understand Scrum theory, practices, rules, values; helps outsiders see which interactions help [S23] · serves the **PO** (7 ways) [S24], the **Dev Team** (5 ways, incl. **removing impediments**) [S25], and the **organization** (5 ways) [S26] · ensures Sprint Planning and the Retrospective take place and that attendants understand their purpose; teaches the team to keep within the time-box [S31, S38] · works with the PO, Dev Team and others to check the artifacts are **completely transparent** [S45] | does **not** tell the Dev Team how to build [S20] · can only **influence** the PO to cancel a Sprint [S30] · not counted in Dev Team size unless doing Sprint Backlog work [S21] |

- The Agile principles slide also puts the SM in the middle of communication: "Business people (Scrum Master and Project Owner) and developers must work together …" and "Face-to-face conversation between Scrum Master and development team and between the Scrum Master and customers …" [S4].

### 4.2 Events

| Event | Purpose (slide words, shortened) | Time-box (as on the slides) | Who | Ref |
|---|---|---|---|---|
| **Sprint** | "The heart of Scrum"; "a container for all other events"; creates a "“Done”, useable, and potentially releasable product Increment" | **one month or less** (diagram: "1-4 Week Sprint"); fixed once it begins, "cannot be shortened or lengthened"; consistent durations; the next Sprint "starts immediately" | — (it contains all the other events) | S27–S29 |
| **Sprint Planning** | plan the work of the Sprint; answers **What** can be delivered in the Increment and **How** the work will be achieved; **creates the Sprint Goal** | **max 8 hours for a one-month Sprint** (usually shorter for shorter Sprints) | "the entire Scrum Team" ("Team, ScrumMaster, & Product Owner"); the SM ensures it happens | S31–S33 |
| **Daily Scrum** | plan work for the next 24 hours; inspect progress toward the **Sprint Goal** and the trend toward completing the **Sprint Backlog** | **15 minutes**; every day, same time and place | **Development Team** (it sets the structure, e.g. "Did? / Doing? / Dam?") | S34–S35 |
| **Sprint Review** | PO explains what is "Done"/not "Done"; Dev Team demonstrates the Increment; review the PB, marketplace, timeline, budget; gives input to the next Sprint Planning | **not given on the slides** 🔎 | Scrum Team + **key stakeholders invited by the PO** | S36–S37 |
| **Sprint Retrospective** | the Scrum Team **inspects itself** (people, relationships, process, tools) and plans improvements for the next Sprint | **max 3 hours for a one-month Sprint** (usually shorter for shorter Sprints) | Scrum Team; the SM ensures it happens | S38 |

- **Order inside one Sprint:** Sprint Planning → Daily Scrums (alongside the development work) → Sprint Review → Sprint Retrospective → the next Sprint starts immediately with its own Sprint Planning. [S29, S38]
- **General event rules** [S27]:
  - All events are time-boxed (they have a maximum duration).
  - The Sprint's length is fixed; the other events may end early once their purpose is achieved.
  - Every event except the Sprint is a "formal opportunity to inspect and adapt".
  - Skipping an event means "reduced transparency" and "a lost opportunity to inspect and adapt".
- **Rules during the Sprint** [S29]:
  - no changes that endanger the Sprint Goal;
  - quality goals do not decrease;
  - scope may be clarified and re-negotiated (PO ↔ Dev Team);
  - plus [S28]: "Sprint end date and team deliverable do not change".

### 4.3 Artifacts

| Artifact | What it is | Who | Key rules | Ref |
|---|---|---|---|---|
| **Product Backlog** | "A list of all desired work on the project" ("The requirements"); "a registered list of work for the development team", driven from the **roadmap** and **requirements** (the two "R"s); roadmap → epics → requirements and user stories | **prioritized by the PO** | reprioritized at the start of each sprint; the most essential task sits at the top; **the Dev Team pulls** work and the PO doesn't push it; example items have relative estimates (3, 5, 8, 30, 50) | S40, S41, S43 |
| **Sprint Backlog** | "the set of Product Backlog items selected for the Sprint, plus a plan for delivering the product Increment and realizing the Sprint Goal" | "a **forecast by the Development Team**" | individuals sign up; work is **never assigned**; estimated work remaining is updated **daily**; **any team member** can add, delete or change it; work "emerges"; if work is unclear, make a bigger item and break it down later | S42, S44 |

- The "Scrum Artifacts" slide lists **only these two** [S39]. "Increment" is used throughout the deck but isn't listed as an artifact on S39 (🔎 Track B).
- **Transparency** [S45]: decisions on value and risk are based on "the perceived state of the artifacts". The **Scrum Master** must work with the PO, the Dev Team and others "to understand if the artifacts are completely transparent".

### 4.4 Definition of "Done" [S46]
- Applies when "a Product Backlog item or an Increment is described as “Done”"; "everyone must understand what “Done” means".
- "may vary significantly per Scrum Team", but members "must have a shared understanding of what it means for work to be complete, to ensure transparency".
- It "is used to assess when work is complete on the product Increment".
- Related: "A “Done” increment is required at the Sprint Review." [S19]

### 4.5 Cancelling a Sprint [S30]
- **Can it be cancelled?** Yes, "before the Sprint time-box is over".
- **Who?** "**Only the Product Owner**", possibly "under influence from the stakeholders, the Development Team, or the Scrum Master".
- **Why?** "if the Sprint Goal becomes obsolete", e.g. the company changes direction, or market or technology conditions change; "if it no longer makes sense given the circumstances".
- **But:** "due to the short duration of Sprints, cancellation rarely makes sense".
- **Then:**
  - "Done" items are **reviewed**; potentially releasable work is "typically" **accepted by the PO**.
  - Incomplete items are **re-estimated and put back on the Product Backlog**.
- **Cost:** it consumes resources (everyone regroups in a new Sprint Planning); "often traumatic"; "very uncommon".

### 4.6 Numbers to remember (whole deck)

| Number | Meaning | Ref |
|---|---|---|
| 17 | original Agile Manifesto signers | S2 |
| 4 | Manifesto values | S3 |
| 12 | Agile principles | S4–S5 |
| 7 (+ "Etc.") | companies listed as Scrum users | S9 |
| 18 | kinds of work Scrum has been used for | S10 |
| 1–4 weeks | one agile iteration | S11 |
| 6–18 months | single-phase development | S11 |
| 10–15 days | one agile iteration; diagram: "Fixed Time (e.g.2 weeks)" | S12 |
| 2–12 hours | typical task estimate (diagram examples: 8 h and 4 h) | S13–S14 |
| more than 9 | too many Development Team members | S21 |
| 5–9 | typical Development Team size | S22 |
| ≤ 1 month | Sprint (diagram: "1-4 Week Sprint") | S28–S29 |
| ≤ 8 hours | Sprint Planning (one-month Sprint) | S31 |
| 15 minutes / every 24 hours | Daily Scrum | S28, S34 |
| ≤ 3 hours | Sprint Retrospective (one-month Sprint) | S38 |
| 2 | artifacts listed on the "Scrum Artifacts" slide | S39 |
| 3 · 5 · 3 · 8 · 8 · 30 · 50 | example Product Backlog estimates (hotel) | S41 |
| 1950s · 2007 | "kanban" used as a process definition · "Kanban Method" first defined | S49 |
| 3 | Kanban core concepts | S50 |
| 25%–75% | inventory reduction with Kanban | S51 |
| 5 | Kanban board elements explained (signals, columns, WIP limits, commitment point, delivery point) | S54–S55 |
| 8 / 7 | stages in the Koenig DevOps loop / in the DEV–OPS ring diagram | S58 |
| 5 | key DevOps principles | S60–S62 |
| 3 | categories of DevOps benefits | S63 |

### 4.7 Kanban (as taught)
- **What it is:** "a popular framework used to implement agile and DevOps software development". It needs "real-time communication of capacity and full transparency of work". [S48]
- **Origin:** the Japanese "kanban" = "visual board" or "sign". Used since the **1950s**, first by **Toyota** "as a scheduling system for just-in-time manufacturing". The "**Kanban Method**" was first defined in **2007**. [S49]
- **3 core concepts** [S50]:
  1. **Visualize Workflow**: split the work into states shown as named columns; one card per item, placed in its column.
  2. **Limit WIP**: an explicit limit on the number of items in progress in each state.
  3. **Measure the Lead Time**: "also known as cycle time", the "average time to complete one item". Make it "as small and predictable as possible".
- **Board elements** [S47, S54, S55]:
  - **visual signals** (cards, usually one work item each; for agile teams possibly one user story);
  - **columns** (each one is an activity; together they form the workflow, e.g. To Do / In Progress / Complete);
  - **WIP limits** (the max number of cards per column; when a column is maxed out, the team swarms on it);
  - **commitment point** (an idea is picked up and work starts);
  - **delivery point** (the end of the workflow; the product is in the customer's hands).
  - The S47/S48 picture also labels a "Card", a "Column", a "WIP Limit" ("IN PROGRESS 3/4") and a "Swimlane" ("EXPEDITE").
- **Lead Time** = the elapsed time from the commitment point to the delivery point; teams keep improving to cut it. [S55]
- **Why WIP limits:** they make inefficiency and **bottlenecks** visible "before a situation becomes dire", and they are an "early warning sign that you committed to too much work". [S55, S56]
- **Benefits (6)** [S51]:
  1. bottlenecks visible in real time, so people optimize the whole value chain;
  2. useful for operations and support teams facing high uncertainty and variability;
  3. spreads naturally through the organization (sales, management), increasing visibility;
  4. reduces inventory by 25%–75%, cutting costs;
  5. visual organization reduces wait times and ensures speed;
  6. avoids overproduction, i.e. "eliminating waste".
- **Agile Kanban** = Agile iteration approach + Kanban value stream focus. [S52]

### 4.8 DevOps (as taught)
- **Definition:** "a set of practices, tools, and a cultural philosophy that automate and integrate the processes between software development and IT teams".
  - It emphasizes team empowerment, cross-team communication and collaboration, and technology automation.
  - The team: developers + IT operations, together "throughout the product lifecycle", to "increase the speed and quality of software deployment". [S57]
- **Lifecycle (∞ loop)** [S58]:
  - **Koenig diagram:** Plan → Code → Build → Test → Release → Deploy → Operate → Monitor → back to Plan.
  - **DEV/OPS ring diagram:** Plan → Create → Verify → Package → Release → Configure → Monitor → back to Plan.
  - Explained in words [S59]:
    - **Plan** = adopt agile practices.
    - **Operate** = "Manage the end-to-end delivery of IT services to customers".
- **5 key principles** [S60–S62]:
  1. **Collaboration**: dev + ops become one team; "full stack"; own a feature "from idea to delivery".
  2. **Automation**: automate as much of the lifecycle as possible; CI/CD pipeline; fewer human errors.
  3. **Continuous Improvement**: experimentation, minimizing waste, optimizing speed, cost and ease of delivery; tied to continuous delivery.
  4. **Customer-centric action**: short feedback loops; real-time live monitoring; rapid deployment.
  5. **Create with the end in mind**: solve real problems; don't "build in a bubble".
- **3 benefit categories** [S63]:
  - **technical**: reduced complexity, continuous delivery, faster problem resolution;
  - **cultural**: more productive and efficient teams, happier customers;
  - **business**: greater collaboration and trust, leading to faster delivery and stable operating environments.

---

## 5. Questions from class

The deck has **no numbered exercises or homework**. The questions below are the ones printed on the slides themselves (as titles or inside pictures). Each is answered only from slide content.

**Q1. "What is Agile “Methodology” or Philosophy?"** [W2-S11]
> "An agile methodology is an iterative approach to software development. Each iteration of agile methodology takes a short time interval of 1 to 4 weeks." It is "aligned to deliver the changing business requirement" and "frequently takes the feedback of workable product". It is "not a specific set of ceremonies or specific development techniques" but "a group of methodologies that demonstrate a commitment to tight feedback cycles and continuous improvement" [S12]. Contrast: single-phase development "takes 6 to 18 months" and predicts all requirements and risks initially [S11].

**Q2. "What is a user requirement?"** [W2-S13]
> "The user requirement defines the requirements of the user in terms of functionalities." It is written as "As a <User Role> I want <Functionality> so that <Business Value>" or "In order to <Business value> as a <User Role> I want <Functionality>." It gets a rough estimate in "relative scale points" at release planning and is "broken down into tasks" at iteration planning. Tasks say *how* and take 2–12 hours. Requirements are "validated using acceptance test" [S14].

**Q3. The two questions Sprint Planning answers** [W2-S31]: "What can be delivered in the Increment resulting from the upcoming Sprint?" and "How will the work needed to deliver the Increment be achieved?"
> - **What:** "The product owner describes the goal of the sprint and the backlog items which contribute to achieve that goal" [S33]. The team selects, "starting at top", as much as it can commit to deliver by the end of the Sprint [S28].
> - **How:** the "development team plans its necessary work on how to achieve and deliver the sprint goal" [S33]. The selected items are broken into tasks ("Task Breakout") in the Sprint Backlog [S28, S42].
> - The result is the **Sprint Goal** plus the **Sprint Backlog** [S32, S42].

**Q4. The Daily Standup card: "1. Did? 2. Doing? 3. Dam? (!)"** [W2-S35]
> These are an *example* of questions a Development Team might use; the slide stresses that "The structure of the meeting is set by the Development Team". Whatever the format, it must focus on "progress toward the Sprint Goal" [S35]. At the Daily Scrum the team "plans work for the next 24 hours" [S34]. (Reading the card in plain words: what did I do? what am I doing? what is blocking me? Blockers link to the SM's job of "Removing impediments" [S25].)

**Q5. "What is the product backlog?"** [W2-S43]
> "A product backlog is a registered list of work for the development team. It is driven from the roadmap and its requirements." The most essential task is at the top. "The developer team pulls work from the product backlog." It is "Prioritized by the product owner" and "Reprioritized at the start of each sprint" [S40]. The PO prioritizes using: priority of customer, importance of getting feedback, relative implementation difficulty, and symbiotic relationships between work items [S43].

**Q6. "What is KANBAN?"** [W2-S48]
> "Kanban is a popular framework used to implement agile and DevOps software development. It requires real-time communication of capacity and full transparency of work. Work items are represented visually on a kanban board, allowing team members to see the state of every piece of work at any time." The word means "visual board" or "sign"; it was first applied by Toyota for just-in-time manufacturing [S49].

**Q7. "What is a kanban board?"** [W2-S53]
> "A kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow)." It uses cards, columns and continuous improvement [S53]. Its elements are visual signals, columns, WIP limits, the commitment point and the delivery point [S54–S55].

**Q8. "What are WIP limits?"** [W2-S56]
> "In agile development, work in progress (WIP) limits set the maximum amount of work that can exist in each status of a workflow." That is, "the maximum number of cards that can be in one column at any given time" [S55]. They make inefficiency and bottlenecks visible "before a situation becomes dire" [S56].

**Q9. "What Is DevOps (development & operations)?"** [W2-S57]
> "DevOps is a set of practices, tools, and a cultural philosophy that automate and integrate the processes between software development and IT teams." A DevOps team is developers + IT operations working together "throughout the product lifecycle, in order to increase the speed and quality of software deployment". Its lifecycle is a never-ending ∞ loop [S58].

**Q10. The Dilbert prompt: "So you examined all of the problems in the company and decided the root cause was chairs?"** [W2-S34]
> A joke, not an exam question. What the slide itself says about the stand-up: it is "a 15-minute time-boxed stand-up event for the Development Team", held at the same time and place every day, to plan the next 24 hours and to inspect progress toward the Sprint Goal and the Sprint Backlog. The slide defines the event by that purpose (the comic mocks a change of form only).

---

## 6. Likely exam questions (only from these slides)

**Q1 (MCQ).** Which of the following is **NOT** one of the four Agile Manifesto values shown in class?
- A. Individuals and interactions over processes and tools
- B. Working software over comprehensive documentation
- C. Contract negotiation over customer collaboration
- D. Responding to change over following a plan

**Q2 (MCQ).** According to the slides, who created Scrum?
A. Kent Beck and Martin Fowler · B. Jeff Sutherland and Ken Schwaber · C. Alistair Cockburn and Jim Highsmith · D. Robert C. Martin and Ward Cunningham

**Q3 (List).** Name the **twelve principles** of the Agile Manifesto as given in class.

**Q4 (Matching).** Match each description to its principle name:
- (a) "Pay regular attention to technical excellence and good design to maximize agility."
- (b) "The aim of agile development is sustainable development."
- (c) "The working software is the key and primary measure of the progress."
- (d) "Every changing requirement should be welcome, even in the late development phase."
- (e) "The work should be reviewed at regular intervals, so that the team can reflect on how to become more productive and adjust its behavior accordingly."

**Q5 (MCQ).** In the class comparison table, which statement describes the **Waterfall model**?
A. It follows the incremental approach. · B. The test plan is reviewed after each sprint. · C. It is completed as one single project. · D. Testing team can take part in the requirements change phase without problems.

**Q6 (Short answer).** Write a user requirement in the template taught in class. Then state (i) how a user requirement is estimated at release planning, (ii) how tasks are estimated, and (iii) how requirements are validated.

**Q7 (MCQ + short).** According to the slides, Scrum is: A. a process · B. a technique · C. a definitive method · D. a framework within which you can employ various processes and techniques. Then complete: "The Scrum framework consists of Scrum Team members and their associated ______, ______, ______, and ______."

**Q8 (Who is responsible?).** Who is responsible for maximizing the value of the product resulting from the work of the Development Team? Name three of their duties.

**Q9 (Who is responsible?).** Who has the authority to cancel a Sprint, and when would a Sprint be cancelled? What happens to the incomplete Product Backlog items?

**Q10 (Who?).** Who creates the Increment? And who tells the Development Team how to turn Product Backlog into Increments of potentially releasable functionality?

**Q11 (Who?).** Which role removes impediments to the Development Team's progress, and which role must work with everyone to check that the artifacts are completely transparent?

**Q12 (Which event?).** Which event is a 15-minute time-boxed stand-up for the Development Team, held at the same time and place every day? What does the team plan there?

**Q13 (Which event?).** Which event occurs after the Sprint Review and before the next Sprint Planning, and is at most three hours for a one-month Sprint? What three things is it for?

**Q14 (Which event?).** In which event is the **Sprint Goal** created, what is its time-box for a one-month Sprint, and which two questions does it answer?

**Q15 (True / False).**
- (a) Once a Sprint begins, its duration can be lengthened if the team needs more time.
- (b) The Product Owner and Scrum Master are always counted in the Development Team size.
- (c) In the Sprint Backlog, work is never assigned; individuals sign up for work of their own choosing.
- (d) Scrum recognizes sub-teams for testing and architecture inside the Development Team.
- (e) Sprint cancellations are very uncommon.
- (f) Development Team membership should change only between sprints.
- (g) The Sprint Retrospective takes place before the Sprint Review.

**Q16 (MCQ).** During the Sprint, which of the following is allowed?
A. Changes that would endanger the Sprint Goal · B. Decreasing quality goals · C. Clarifying and re-negotiating scope between the Product Owner and Development Team as more is learned · D. Changing the Sprint end date

**Q17 (Short definition).** Define the **Definition of "Done"** and explain why the whole Scrum Team must share it.

**Q18 (Compare).** Compare the **Product Backlog** and the **Sprint Backlog**: what each contains, who prioritizes or forecasts it, and how work gets into the team's hands (push or pull? assigned or signed up for?).

**Q19 (Kanban).** What does "kanban" mean and where did it start? Name Kanban's three core concepts. Define a **WIP limit**, the **commitment point**, the **delivery point** and **Lead Time**.

**Q20 (DevOps).** Define DevOps. List the stages of the DevOps lifecycle loop (Koenig diagram). Name the 5 key DevOps principles and the 3 categories of DevOps benefits.

### Answers

1. **C.** The Manifesto says "**Customer collaboration** over contract negotiation"; C reverses it. [W2-S3]
2. **B.** "Scrum creators: Jeff Sutherland and Ken Schwaber" [W2-S8]. Both are also original Manifesto signers [S2].
3. Customer Satisfaction · Welcome Change · Deliver the Working Software · Collaboration · Motivation · Face-to-face Conversation · Measure the Progress as per the Working Software · Maintain Constant Pace · Monitoring · Simplicity · Self-organized Teams · Review the Work Regularly. [W2-S4–S5]
4. (a) **Monitoring** · (b) **Maintain Constant Pace** · (c) **Measure the Progress as per the Working Software** · (d) **Welcome Change** · (e) **Review the Work Regularly**. [W2-S4–S5]
5. **C.** A, B and D describe Agile. [W2-S15]
6. Template: "As a <User Role> I want <Functionality> so that <Business Value>" (or "In order to <Business value> as a <User Role> I want <Functionality>."). Class example: "As a guest, I want to cancel a reservation." [S41]. (i) A rough estimate "using relative scale points" [S13]. (ii) In hours, "generally … between 2 to 12 hours" [S14]. (iii) "Requirements are validated using acceptance test." [S14] [W2-S13, S14, S41]
7. **D.** "…roles, events, artifacts, and rules." [W2-S16]
8. The **Product Owner** [S18]. Duties (any three): define the features of the product; make scope vs. schedule decisions; be responsible for achieving the project's financial goals; prioritize the product backlog; adjust features and priority every sprint, as needed; accept or reject work results. [W2-S18]
9. **Only the Product Owner** (possibly influenced by stakeholders, the Dev Team or the SM). A Sprint is cancelled when the **Sprint Goal becomes obsolete**, e.g. the company changes direction or market or technology conditions change. Incomplete items are **re-estimated and put back on the Product Backlog**; "Done" items are reviewed and potentially releasable work is typically accepted. [W2-S30]
10. "**Only members of the Development Team** create the Increment" [S19]. **No one, "not even the Scrum Master"**: the Dev Team is self-organizing [S20]. [W2-S19, S20]
11. The **Scrum Master** in both cases: "Removing impediments to the Development Team’s progress" [S25], and the SM "must work with the Product Owner, Development Team, and other involved parties to understand if the artifacts are completely transparent" [S45]. [W2-S25, S45]
12. The **Daily Scrum**. The Development Team "plans work for the next 24 hours" and inspects progress toward the Sprint Goal and toward completing the Sprint Backlog. [W2-S34]
13. The **Sprint Retrospective**. Its purpose: inspect how the last Sprint went "with regards to people, relationships, process, and tools"; identify and order what went well and potential improvements; create a plan for implementing improvements. [W2-S38]
14. **Sprint Planning** [S32]: max **eight hours** for a one-month Sprint [S31]. It answers "What can be delivered in the Increment resulting from the upcoming Sprint?" and "How will the work needed to deliver the Increment be achieved?" [S31] [W2-S31, S32]
15. (a) **F**: "its duration is fixed and cannot be shortened or lengthened" [S27]. (b) **F**: they are "not included in this count unless they are also executing the work of the Sprint Backlog" [S21]. (c) **T** [S44]. (d) **F**: "Scrum recognizes no sub-teams in the Development Team" [S20]. (e) **T**: "very uncommon" [S30]. (f) **T**: "Membership should change only between sprints" [S22]. (g) **F**: "The Sprint Retrospective occurs after the Sprint Review and prior to the next Sprint Planning" [S38]. [W2-S20, S21, S22, S27, S30, S38, S44]
16. **C.** "Scope may be clarified and re-negotiated between the Product Owner and Development Team as more is learned" [S29]. A and B are forbidden [S29]. D is wrong because "Sprint end date and team deliverable do not change" [S28]. [W2-S28, S29]
17. "When a Product Backlog item or an Increment is described as “Done”, everyone must understand what “Done” means." It "may vary significantly per Scrum Team", but members "must have a shared understanding of what it means for work to be complete, to ensure transparency". It "is used to assess when work is complete on the product Increment". [W2-S46]
18. **Product Backlog:** "A list of all desired work on the project", driven from the roadmap and requirements. It is **prioritized by the PO** and reprioritized at the start of each sprint, and the Dev Team **pulls** work from it (the PO doesn't push) [S40, S43]. **Sprint Backlog:** the PB items "selected for the Sprint, plus a plan" for delivering the Increment and realizing the Sprint Goal. It is "a **forecast by the Development Team**". Individuals **sign up**, work is **never assigned**, any team member can change it, and remaining work is updated daily [S42, S44]. [W2-S40, S42–S44]
19. "kanban" = "visual board" or "sign" (Japanese). Used since the 1950s, first by **Toyota** for just-in-time manufacturing; the "Kanban Method" dates from 2007 [S49]. Core concepts: **Visualize Workflow · Limit WIP · Measure the Lead Time** [S50]. WIP limit = "the maximum number of cards that can be in one column at any given time" [S55]. Commitment point = "the moment when an idea is picked up by the team and work starts on the project". Delivery point = "the end of a kanban team’s workflow", usually when the product is in the customer's hands. Lead Time = the elapsed time between the two [S55] ("also known as cycle time … the average time to complete one item" [S50]). [W2-S49, S50, S55]
20. DevOps = "a set of practices, tools, and a cultural philosophy that automate and integrate the processes between software development and IT teams" [S57]. Lifecycle (Koenig): **Plan → Code → Build → Test → Release → Deploy → Operate → Monitor** → back to Plan [S58]. Principles: **Collaboration, Automation, Continuous Improvement, Customer-centric action, Create with the end in mind** [S60–S62]. Benefits: **technical, cultural, business** [S63]. [W2-S57–S63]

---

## 7. Self-check: "I can…"

- [ ] I can list the **4 Agile Manifesto values** in the correct "X over Y" order and explain "we value the items on the left more" [S3]. I also know the Manifesto had **17 signers**, including Sutherland and Schwaber [S2].
- [ ] I can name all **12 Agile principles** as taught and match each one to its description [S4–S5].
- [ ] I can contrast agile (iterative; 1–4-week iterations; feedback after each increment) with single-phase/Waterfall (6–18 months; sequential; test plan reviewed after complete development), using the S7 diagrams and the S15 table [S7, S11, S12, S15].
- [ ] I can write a **user requirement** in both templates and explain requirement vs task: what vs how, relative points vs 2–12 hours, validated by acceptance tests [S13–S14].
- [ ] I can define **Scrum** (framework, not a process) and say what the framework consists of: roles, events, artifacts, rules [S16].
- [ ] I can say **who does what** among the PO, Dev Team and SM. That includes who cancels a Sprint, who creates the Increment, team size rules, and the 7/5/5 ways the SM serves the PO, Dev Team and organization [S17–S26, S30].
- [ ] I can put the **Scrum events** in order with their slide time-boxes (Sprint ≤ 1 month; Planning ≤ 8 h; Daily Scrum 15 min; Retrospective ≤ 3 h; Review not given). I can also redraw the big Sprint diagram from "Inputs" to "Finished Work" [S27–S38].
- [ ] I can compare the **Product Backlog** and the **Sprint Backlog** and explain **artifact transparency** and the **Definition of "Done"** [S39–S46].
- [ ] I can explain **Kanban**: the word's meaning and origin, the 3 core concepts, the board elements (visual signals, columns, WIP limits, commitment and delivery points), Lead Time, and its benefits [S47–S56].
- [ ] I can define **DevOps**, draw its ∞ lifecycle, explain Plan and Operate, and list the 5 principles and 3 benefit categories [S57–S63].

---

## Appendix: quick lists

### A. ⚠️ Typos and confusing spots on the slides (learn the correct idea, not the typo)
- S1 "SPRINTTO SUCCESS" (missing space).
- S4–S5 title "The Twelve **Principle**" → Principles.
- S4 "costumer's" → customer's.
- S4 "Project Owner" → Product Owner.
- S4 "should be build" → built.
- S5 Simplicity wording is unclear (🔎).
- S7 / S11: the agile diagram also says "First Time to get real feedback" next to Final Software, despite "Review and Adjust" after each increment.
- S12 "Each user requirement is a planned based and…" (garbled); "planed" → planned; diagram "User **stroy**" → story.
- S13 "There may be of two type of functionality" (grammar); diagram "**Tast** 2" → Task 2.
- S14 "Every requirement is gathering as the task" (garbled).
- S15 "divides … into a sprint" → sprints; "for the test to initiate" (a word is missing).
- S33 "The product set the goal of sprint" (probably "product owner sets").
- S43 "Roadmap repetition breaks down into several epics" (unclear); "chooses to deliver first complete epic" (grammar).
- S51 benefit 5 is a garbled sentence.
- S55 "is **the called** Lead Time" → is called.
- Not errors, but differences to know:
  - Iteration length is "1 to 4 weeks" on S11 but "10 to 15 days" on S12.
  - "Scrum recognizes no titles" on S20 vs "Ideally, no titles but rarely a possibility" on S22.

### B. 🔎 Look up in Track B (mentioned on the slides but not explained)
- Why the **cargo cult** slide [S6] and the **Dilbert stand-up** strip [S34] are in an Agile lecture.
- The original wording of the **Simplicity** principle [S5].
- **ISV** [S10].
- **Empirical process / empirical environment** [S21, S24, S26].
- The **Scrum Guide**, **servant-leader**, **CSM** [S23].
- **Burndown/up charts** [S28].
- The standard Daily Scrum questions behind "Did? / Doing? / Dam?" [S35].
- The **time-box of the Sprint Review** [S36].
- Whether the **Increment** is a Scrum artifact [S39].
- **Epic**, **roadmap** [S43].
- **Swimlane / Expedite lane** [S47].
- **Just-in-time manufacturing**, **throughput** [S49].
- **Value stream** [S52].
- The other DevOps lifecycle stages (code, build, test, release, deploy, monitor…) [S58–S59].
- **CI/CD pipeline**, **continuous delivery**, **lean manufacturing**, **Improvement Kata** [S61].
