# Week 6 — Requirements determination 2: JAD, questionnaires, document analysis, observation, validation & management (CLASS NOTES — from slides only)

> Source: 6_2 REQUIREMENTS DETERMINATION2.pdf, 37 slides. Refs [W6-S#].
>
> **Track A only (class material).** Legend: ⭐ = emphasis visible on the slide (bold, italic or red text, or a question the professor put on a slide) · ⚠️ = apparent typo or slide glitch · 🔎 = not explained on the slides, look it up in Track B.
> Short refs like [S12] mean [W6-S12]. Refs like [W5b-S#] and [W3-S#] point to earlier decks of this same course, so they are still class material.

---

## 1. Big picture

- **Where this deck fits.** This is part 2 of "Requirements Determination". Part 1 [W5b] listed the five requirements-gathering techniques (interviews, questionnaires, observation, JAD, document analysis) [W5b-S19] and covered interviews. This deck covers the other four, then compares all five in one table [S34].
- **JAD** is "an information-gathering technique that allows the project team, users, and management to work together to identify requirements" [S4]. It brings together 10–20 users, a neutral *facilitator* and 1–2 *scribes* [S6]. e-JAD adds groupware so people can give input anonymously and at the same time [S7]. JAD has 5 steps that mirror the interview steps [S8–S12].
- **Questionnaires** are "a set of written questions used to obtain information from individuals" [S13]. They suit large numbers of people and outside users. You send them to a sample, expect low return rates, and mostly use closed-ended questions. The deck gives 9 design guidelines and 4 steps [S13–S18].
- **Document analysis** is used "to understand the as-is system" [S19]. When users create their own forms or add information to existing ones, that is "the most powerful indication that the system needs to be changed" [S21].
- **Observation / ethnography** is "the act of watching processes being performed" [S22]. It shows what really happens and checks what people said in interviews and questionnaires. However, ethnography "cannot identify new features" [S23]. *Focused* ethnography adds prototyping [S24].
- **Requirements validation** shows that "the requirements define the system that the customer really wants" [S25]. It uses 5 checks (validity, consistency, completeness, realism, verifiability) [S26], 3 techniques (reviews, prototyping, test-case generation) [S27] and 4 review checks (verifiability, comprehensibility, traceability, adaptability) [S29].
- **Requirements management** handles requirements that keep changing, both during development and after the system goes into use. You track and link requirements and use a formal process for change proposals [S30–S33].
- **The comparison table** [S34] rates the 5 techniques on 6 criteria: type, depth, breadth and integration of information, user involvement, and cost. It is the tool for "which technique fits this situation?" questions.
- **The System Proposal** [S35–S37] is a 10-section template that pulls the analysis deliverables together: system request, workplan, feasibility analysis, requirements definition, and the functional, structural and behavioral models.
- Slides S23–S33 carry the footer "SEN 301 REQUIREMENTS ENGINEERING", so they seem to be borrowed from a requirements-engineering course. All the other slides carry "SYSTEM ANALYSIS".

---

## 2. Slide-by-slide notes

### [W6-S1] Title — System Analysis / Requirements Determination
- "System Analysis" · "DR. DRAGUNOV" · bottom-right label "REQUIREMENTS DETERMINATION".
- The title is the same as part 1 [W5b-S1]. The file name ("6_2 … DETERMINATION2") marks this deck as part 2.

### [W6-S2] Review questions (no title on slide) ⭐
The professor's review questions, word for word:

1. What are the key deliverables that are created during analysis?
2. What is the difference between an as-is system and a to-be system?
3. What is the purpose of the requirements definition?
4. What are the three basic steps of the analysis process? Which step is sometimes skipped or done in a cursory fashion? Why?
5. Describe the five major steps in conducting interviews.
6. Explain the differences among a closed-ended question, an open-ended question, and a probing question. When would you use each?
7. Explain the differences between unstructured interviews and structured interviews. When would you use each approach?

- All seven review part 1 [W5b]. **Worked answers are in §5.**

### [W6-S3] Review MCQs (no title on slide) ⭐
Word for word. The slide shows the options as plain bullets; the letters (a)–(e) are added here for reference.

**Which is NOT a purpose of the requirements definition?**
- (a) To give a very high-level explanation of the business requirements
- (b) A more precise list of requirements that can be used as inputs to the rest of analysis
- (c) Create functional requirements
- (d) Create cost/benefit analysis
- (e) Create non-functional requirements

**An example of a functional requirement is _________**
- (a) Access to the customer order system
- (b) System should be available in English and Spanish
- (c) System can be accessed through a Blackberry device
- (d) Output can be displayed in Internet Explorer, in Firefox, or in Google Chrome browsers
- (e) System is automatically updated every 5 seconds

- The slide gives no answers. **Worked answers are in §5.**

### [W6-S4] Joint Application Development (JAD)
> "JAD is an information-gathering technique that allows the project team, users, and management to work together to identify requirements for the system. IBM developed the JAD technique in the late 1970s, and it is often the most useful method for collecting information from users."

- **Who:** the project team, users and management, working **together**.
- **Origin:** IBM, late 1970s.
- **Remember the claim:** "often the most useful method for collecting information from users".
- ⚠️ The S34 table calls it "Joint Application **Design**", while this slide says "Joint Application **Development**". Both mean the same technique, JAD.

### [W6-S5] (picture, no title) — JAD meeting room
- A drawing of a meeting room with no caption. It sits between the JAD definition (S4) and the JAD description (S6), so it shows a room set up for a JAD session.
- **Labelled items:**
  - **Whiteboard** and **Screen** on the front wall
  - **Flip chart sheets** (three) on the left wall
  - **Name cards** standing on the tables, one per seat
  - **Projectors** and a **Printer** on a separate small table at the front
  - **Computers** (laptops) on the main table
- **Layout:** one large U-shaped table, open end facing the screen and whiteboard. Chairs stand around the outside of the U (about nine are visible), and some papers lie on the table.

### [W6-S6] JAD — participants, facilitator, scribes
> "JAD is a structured process in which ten to twenty users meet together under the direction of a ***facilitator*** skilled in JAD techniques. The facilitator is a person who sets the meeting agenda and guides the discussion but does not join in the discussion as a participant."
>
> "He or she does not provide ideas or opinions on the topics under discussion so as to remain neutral during the session. The facilitator must be an expert in both group-process techniques and systems-analysis and design techniques. One or two *scribes* assist the facilitator by recording notes, making copies, and so on. Often the scribes use computers and CASE tools to record information as the JAD session proceedings"

**JAD roles as taught** (S4 adds that the project team, users and management all take part):

| Role | How many | What they do (slide wording) |
|---|---|---|
| Users | "ten to twenty" | "meet together under the direction of a facilitator skilled in JAD techniques" |
| ⭐ **Facilitator** (bold italic on the slide) | one | "sets the meeting agenda and guides the discussion but does not join in the discussion as a participant"; "does not provide ideas or opinions on the topics under discussion so as to remain neutral"; "must be an expert in both group-process techniques and systems-analysis and design techniques" |
| ⭐ *Scribes* (italic on the slide) | "One or two" | "assist the facilitator by recording notes, making copies, and so on"; "Often … use computers and CASE tools to record information" |

- **Key idea:** the facilitator is **neutral**. They run the process but give no opinions.
- ⚠️ "as the JAD session proceedings" is probably meant to read "as the JAD session **proceeds**".
- 🔎 Look up in Track B: what "CASE tools" are. This deck does not define them.

### [W6-S7] Electronic JAD (e-JAD)
> "A new form of JAD called *electronic JAD*, or *e-JAD*, attempts to overcome these problems by using groupware. In an e-JAD meeting room, each participant uses special software on a networked computer to send anonymous ideas and opinions to everyone else."
>
> "In this way, all participants can contribute at the same time without fear of reprisal from people with differing opinions. Initial research suggests that e-JAD can reduce the time required to run JAD sessions by 50 to 80 percent. A good JAD approach follows a set of five steps."

- ⭐ *electronic JAD* and *e-JAD* are in italics on the slide.
- **How it works:** groupware runs on a networked computer at each seat. Each participant sends **anonymous** ideas and opinions to everyone else.
- **Benefits stated:**
  1. Everyone can contribute **at the same time**.
  2. Nobody needs to fear "reprisal from people with differing opinions".
  3. It can cut the time needed for JAD sessions by **50 to 80 percent** (initial research).
- ⚠️ "these problems" points back to problems that this deck never lists. The slide's own wording suggests two of them: people cannot all contribute at once, and they fear reprisal from people who disagree.
- 🔎 Look up in Track B: the full list of problems with ordinary JAD that e-JAD addresses, and what "groupware" means.
- The last sentence introduces the **five JAD steps** on S8–S12.

### [W6-S8] JAD step 1 — Select Participants
> "First, selecting JAD participants is done in the same basic way as selecting interview participants."
>
> "Participants are selected based on the information they can contribute in order to provide a broad mix of organizational levels and to build political support for the new system."
>
> "The need for all JAD participants to be away from their office at the same time can be a major problem. The office might need to be closed or operate with a skeleton staff until the JAD sessions are complete."

- **Selected like interviewees.** For interviews, part 1 said to make an interview schedule and include both managers and staff [W5b-S36].
- **Selection is based on the information people can contribute.** The aims are:
  1. a broad mix of organizational levels
  2. political support for the new system
- **The major problem:** everyone has to be away from the office at the same time. The office may have to close, or run with a "skeleton staff", until the sessions are complete.

### [W6-S9] JAD step 2 — Design a JAD Session
> "Second, **JAD sessions can run from as little as half a day to several weeks**, depending upon the size and scope of the project. In our experience, most JAD sessions tend to last five to ten days, spread over a three-week period. Most e-JAD sessions tend to last one to four days in a one week period. JAD and e-JAD sessions usually go beyond collecting information and move into analysis. For example, the users and the analysts collectively can create analysis deliverables, such as the functional models or the requirements definition."
>
> "As with interviewing, success depends upon a careful plan. JAD sessions usually are designed and structured using the same principles as interviews."

- ⭐ Bold on the slide: "**JAD sessions can run from as little as half a day to several weeks**". The length depends on the size and scope of the project.

| | Typical length | Spread over |
|---|---|---|
| JAD | 5–10 days | a 3-week period |
| e-JAD | 1–4 days | a 1-week period |

- JAD **goes beyond collecting information and moves into analysis**. Users and analysts can create analysis deliverables together, such as the **functional models** or the **requirements definition**.
- Success depends on a careful plan. Sessions are designed and structured using **the same principles as interviews**.

### [W6-S10] JAD step 3 — Preparing for a JAD Session
> "Third, as with interviewing, it is important to prepare the analysts and participants for a JAD session. Because the sessions can go beyond the depth of a typical interview and are usually conducted off-site, participants can be more concerned about how to prepare. It is important that the participants understand what is expected of them. If the goal of the JAD session, for example, is to develop an understanding of the current system, then participants can bring procedure manuals and documents with them. If the goal is to identify improvements for a system, then before they come to the JAD session they can think about how they would improve the system."

- Prepare **both the analysts and the participants**.
- Participants worry more about preparing than interviewees do, because sessions go **deeper than a typical interview** and are **usually held off-site**.
- Participants must understand **what is expected of them**:

| Goal of the session | What participants do beforehand |
|---|---|
| Understand the current system | Bring procedure manuals and documents |
| Identify improvements | Think about how they would improve the system |

### [W6-S11] JAD step 4 — Conducting a JAD Session
> "Fourth, most JAD sessions **try to follow a formal agenda**, and most have formal *ground rules* that define appropriate behavior. Common ground rules include following the schedule, respecting others' opinions, accepting disagreement, and ensuring that only one person talks at a time."
>
> "The role of a JAD facilitator can be challenging. Many participants come to a JAD session with strong feelings about the system to be discussed. Channeling these feelings so that the session moves forward in a positive direction and getting participants to recognize and accept— but not necessarily agree on—opinions and situations different from their own requires significant expertise in systems analysis and design, JAD, and interpersonal skills. Few systems analysts attempt to facilitate JAD sessions without being trained in JAD techniques, and most apprentice with a skilled JAD facilitator before they attempt to lead their first session."

- ⭐ Bold on the slide: "**try to follow a formal agenda**". ⭐ In italics: *ground rules*, which "define appropriate behavior".
- **The 4 common ground rules (exact):**
  1. following the schedule
  2. respecting others' opinions
  3. accepting disagreement
  4. ensuring that only one person talks at a time
- **Why facilitating is hard:** participants arrive with strong feelings. The facilitator must channel those feelings so the session moves forward positively. They must also get people to "recognize and accept — but not necessarily agree on" other opinions.
- **Three areas of expertise needed:** (1) systems analysis and design, (2) JAD, (3) interpersonal skills.
- Few analysts facilitate without JAD training. Most **apprentice with a skilled JAD facilitator** before leading their first session.

### [W6-S12] JAD step 5 — Post-JAD Follow-up
> "Fifth, as with interviews, a JAD *post-session report* is prepared and circulated among session attendees. The post-session report is essentially the same as the interview report. Because the JAD sessions are longer and provide more information, it usually takes a week or two after the JAD session before the report is complete."

- ⭐ In italics on the slide: *post-session report*.
- The report is prepared and **circulated among session attendees**. It is "essentially the same as the interview report".
- It usually takes **a week or two** to complete, because JAD sessions are longer and provide more information. For comparison, an interview report "should be written within forty-eight hours" [W5b-S44].

> **The 5 JAD steps:** 1 Select participants → 2 Design a JAD session → 3 Prepare for a JAD session → 4 Conduct a JAD session → 5 Post-JAD follow-up [S8–S12]

### [W6-S13] Questionnaires
> "A questionnaire is a set of written questions used to obtain information from individuals."
>
> "Questionnaires are often used when there is a large number of people from whom information and opinions are needed. In our experience, questionnaires are a common technique with systems intended for use outside the organization (e.g., by customers or vendors)"

- **When to use a questionnaire:**
  1. A **large number of people** must give information and opinions.
  2. The system is **intended for use outside the organization**, for example by customers or vendors.
- Four steps follow: select participants → design → administer → follow-up [S14–S18].

### [W6-S14] Questionnaire step 1 — Select Participants
> "First, as with interviews and JAD sessions, the first step is to identify the individuals to whom the questionnaire will be sent. However, it is not usual to select every person who could provide useful information. The standard approach is to select a *sample,* or subset, of people who are representative of an entire group. Sampling guidelines are discussed in most statistics books, and most business schools include courses that cover the topic, so we do not discuss it here. The important point in selecting a sample, however, is to realize that not everyone who receives a questionnaire will actually complete it. On average, only 30 to 50 percent of paper and e-mail questionnaires are returned. Response rates for Web-based questionnaires tend to be significantly lower (often only 5 to 30 percent)."

- ⭐ In italics on the slide: a *sample* is a "subset, of people who are representative of an entire group". The standard approach is to use a sample rather than everyone.
- **The important point:** not everyone who receives a questionnaire will complete it.

| Questionnaire type | Return rate |
|---|---|
| Paper and e-mail | 30–50% on average |
| Web-based | "significantly lower", often only 5–30% |

- 🔎 Look up in Track B: sampling guidelines. The slide itself says "we do not discuss it here".

### [W6-S15] Questionnaire step 2 — Designing a Questionnaire
> "Second, because the information on a questionnaire cannot be immediately clarified for a confused respondent, developing good questions is critical for questionnaires. Questions on questionnaires must be very clearly written and leave little room for misunderstanding, so closed-ended questions tend to be most commonly used. Questions must clearly enable the analyst to separate facts from opinions. Opinion questions often ask respondents the extent to which they agree or disagree (e.g., Are network problems common?), whereas factual questions seek more precise values (e.g., How often does a network problem occur: once an hour, once a day, once a week?). See next Figure for guidelines on questionnaire design."
>
> "Perhaps the most obvious issue—but one that is sometimes overlooked—is to have a clear understanding of how the information collected from the questionnaire will be analyzed and used. This issue must be addressed before the questionnaire is distributed, because it is too late afterward."

- **Why good questions are critical:** a confused respondent's question "cannot be immediately clarified".
- Questions must therefore be very clearly written, so **closed-ended questions tend to be most commonly used**. Part 1 defined closed-ended questions as those that "require a specific answer" [W5b-S37].
- Questions must let the analyst **separate facts from opinions**:

| Kind of question | What it asks | Class example |
|---|---|---|
| **Opinion** | "the extent to which they agree or disagree" | "Are network problems common?" |
| **Factual** | "more precise values" | "How often does a network problem occur: once an hour, once a day, once a week?" |

- **"Perhaps the most obvious issue — but one that is sometimes overlooked":** understand **how the collected information will be analyzed and used**. Settle this **before** the questionnaire is distributed, "because it is too late afterward".

### [W6-S16] (figure) Guidelines for questionnaire design
This is the "next Figure" announced on S15: a red-bordered box with nine bullets, copied exactly.

- Begin with nonthreatening and interesting questions.
- Group items into logically coherent sections.
- Do not put important items at the very end of the questionnaire.
- Do not crowd a page with too many items.
- Avoid abbreviations.
- Avoid biased or suggestive items or terms.
- Number questions to avoid confusion.
- Pretest the questionnaire to identify confusing questions.
- Provide anonymity to respondents.

### [W6-S17] Questionnaire step 3 — Administering the Questionnaire
> "Third, the key issue in administering the questionnaire is getting participants to complete the questionnaire and send it back. Dozens of marketing research books have been written about ways to improve response rates. Commonly used techniques include clearly explaining why the questionnaire is being conducted and why the respondent has been selected; stating a date by which the questionnaire is to be returned; offering an inducement to complete the questionnaire (e.g., a free pen); and offering to supply a summary of the questionnaire responses. Systems analysts have additional techniques to improve response rates inside the organization, such as personally handing out the questionnaire and personally contacting those who have not returned them after a week or two, as well as requesting the respondents' supervisors to administer the questionnaires in a group meeting."

- **The key issue:** getting participants to **complete the questionnaire and send it back**. In other words, the response rate.
- **Commonly used techniques (4):**
  1. Clearly explain why the questionnaire is being conducted and why the respondent was selected.
  2. State a date by which it must be returned.
  3. Offer an inducement to complete it (e.g., a free pen).
  4. Offer to supply a summary of the responses.
- **Extra techniques analysts can use inside the organization (3):**
  1. Personally hand out the questionnaire.
  2. Personally contact people who have not returned it after a week or two.
  3. Ask the respondents' supervisors to administer it in a group meeting.

### [W6-S18] Questionnaire step 4 — Questionnaire Follow-up
> "Fourth, it is helpful to process the returned questionnaires and develop a questionnaire report soon after the questionnaire deadline. This ensures that the analysis process proceeds in a timely fashion and that respondents who requested copies of the results receive them promptly."

- **Output:** a **questionnaire report**, written soon after the deadline.
- **Why:**
  1. The analysis process proceeds in a timely fashion.
  2. Respondents who asked for the results get them promptly. This links back to S17's "offering to supply a summary".

> **The 4 questionnaire steps:** 1 Select participants → 2 Design the questionnaire → 3 Administer it → 4 Follow up [S14–S18]

### [W6-S19] Document Analysis
> "Project teams often use document analysis to understand the as-is system. Under ideal circumstances, the project team that developed the existing system will have produced documentation that was then updated by all subsequent projects. In this case, the project team can start by reviewing the documentation and examining the system itself."
>
> "Unfortunately, most systems are not well documented because project teams fail to document their projects along the way, and when the projects are over, there is no time to go back and document. Therefore, there might not be much technical documentation about the current systems available, or it might not contain updated information about recent system changes. However, many helpful documents do exist in an organization: **paper reports, memorandums, policy manuals, user-training manuals, organization charts, forms, and, of course, the user interface with the existing system.**"

- **Purpose:** to understand the **as-is** system.
- **Ideal case:** the original team documented the system and every later project kept that documentation up to date. The team can then start by reviewing the documentation and examining the system itself.
- **Reality:** most systems are **not well documented**. Teams fail to document as they go, and once a project is over there is no time to go back. Technical documentation may be scarce, or it may be out of date.
- ⭐ In bold on the slide, the **7 kinds of helpful documents that do exist:**
  1. paper reports
  2. memorandums
  3. policy manuals
  4. user-training manuals
  5. organization charts
  6. forms
  7. the user interface with the existing system

### [W6-S20] (figure) Annotated form — "Central Veterinary Clinic, Patient Information Card"
- A completed paper form with three analyst callouts. It is made of two overlapping picture pieces. On the visible slide the lower piece covers part of the upper one, hiding the form's title, some filled-in values and the end of one callout. Those hidden parts are filled in below from the full picture embedded in the PDF.
- **The form's fields and what was filled in:**
  - Name: ~~Buffy~~ Pat Smith. The customer first wrote the pet's name here, then crossed it out.
  - Pet's Name: Buffy, followed by "Collie 7/6/99" added in a handwriting-style font
  - Address: 100 Central Court. Apartment 10 / Toronto, Ontario K7L 3N6
  - Phone Number: 555-3400, with "416-" added above it in a handwriting-style font
  - Do you have insurance: yes
  - Insurance Company: Pet's Mutual
  - Policy Number: KA-5493243
- **The three callouts (exact):**
  1. "The customer made a mistake. This should be labeled **Owner's Name** to prevent confusion."
  2. "The staff had to add additional information about the type of animal and the animal's date of birth. This information should be added to the new form in the to-be system." The visible slide cuts this callout off after "added to the"; the ending comes from the PDF's embedded image.
  3. "The customer did not include area code in the phone number. This should be made more clear."
- **What the example shows** (it illustrates S21). A completed form reveals three kinds of problem:
  - a confusing label ("Name" should be "Owner's Name")
  - information staff had to add by hand (type of animal, date of birth), which should become new fields in the to-be system
  - a field whose instructions need to be clearer (the area code)
- ⚠️ Slide-layout glitch: the two picture pieces overlap, so part of the form is hidden on the visible slide.

### [W6-S21] What changed forms and multiple reports tell you
> "The most powerful indication that the system needs to be changed is when users create their own forms or add additional information to existing ones. Such changes clearly demonstrate the need for improvements to existing systems. Thus, it is useful to review both blank and completed forms to identify these deviations. Likewise, when users access multiple reports to satisfy their information needs, it is a clear sign that new information or new information formats are needed."

- **"The most powerful indication that the system needs to be changed"** is when users:
  - **create their own forms**, or
  - **add additional information to existing ones** (S20 shows this case).
- So review **both blank and completed forms** to find these "deviations".
- When users need **multiple reports** to get the information they need, "new information or new information formats are needed".

### [W6-S22] Observation/ Ethnography (1)
> "Observation, the act of watching processes being performed, is a powerful tool for gathering information about the as-is system because it enables the analyst to see the reality of a situation, rather than listening to others describe it in interviews or JAD sessions. Several research studies have shown that many managers really do not remember how they work and how they allocate their time. (Quick, how many hours did you spend last week on each of your courses?) Observation is a good way to check the validity of information gathered from indirect sources such as interviews and questionnaires."

- **Definition:** observation is "the act of watching processes being performed".
- **Why it is powerful for the as-is system:** the analyst sees **the reality of a situation** instead of hearing others describe it in interviews or JAD sessions.
- **Evidence:** research shows many managers do not remember how they work or how they spend their time. The slide's example: "Quick, how many hours did you spend last week on each of your courses?"
- **Use:** it is "a good way to **check the validity** of information gathered from **indirect sources** such as interviews and questionnaires."

### [W6-S23] Observation/ Ethnography (2)
Slide text (exact):
- "Requirements that are derived from the way that people actually work rather than the way I which process definitions suggest that they ought to work."
- "Requirements that are derived from cooperation and awareness of other people's activities."
  - "Awareness of what other people are doing leads to changes in the ways in which we do things."
- "Ethnography is effective for understanding existing processes but cannot identify new features that should be added to a system."

- **Two kinds of requirements come out of observation/ethnography:**
  1. Requirements from **how people actually work**, as opposed to how process definitions say they ought to work.
  2. Requirements from **cooperation and awareness of other people's activities**. Knowing what others are doing changes how we do things.
- **Limitation:** ethnography is good for understanding **existing** processes but **cannot identify new features** for a system.
- ⚠️ "the way I which" should read "the way **in** which".
- From this slide through S33 the footer reads "SEN 301 REQUIREMENTS ENGINEERING", i.e., slides from another course.
- 🔎 Look up in Track B: a formal definition of "ethnography". The slides pair it with observation but never define it on its own.

### [W6-S24] Focused Observation/ Ethnography
Slide text (exact):
- "Developed in a project studying the air traffic control process"
- "Combines ethnography with prototyping"
- "Prototype development results in unanswered questions which focus the ethnographic analysis."
- "**The problem with ethnography is that it studies existing practices which may have some historical basis which is no longer relevant.**"

- **Focused ethnography = ethnography + prototyping.** Building the prototype raises **unanswered questions**, and those questions give the observation its **focus**.
- **Origin:** a project that studied the **air traffic control** process.
- ⭐ In bold on the slide, the problem with ethnography: it studies **existing practices**, which may rest on **a historical basis that is no longer relevant**.
- **Ethnography's two weaknesses as taught:**
  1. It cannot identify new features [S23].
  2. The practices it studies may exist for historical reasons that no longer apply [S24].

### [W6-S25] Requirements validation
Slide text (exact):
- "Concerned with demonstrating that the requirements define the system that the customer really wants."
- "Requirements error costs are high so validation is very important"
  - "Fixing a requirements error after delivery may cost up to 100 times the cost of fixing an implementation error."

- **Definition:** validation shows that the requirements define **the system the customer really wants**.
- **Why it matters:** fixing a requirements error **after delivery** may cost **up to 100 times** as much as fixing an implementation error.

### [W6-S26] Requirements checking
⭐ The five check names are in red on the slide.

| Check | The question it asks (exact) |
|---|---|
| **Validity** | "Does the system provide the functions which best support the customer's needs?" |
| **Consistency** | "Are there any requirements conflicts?" |
| **Completeness** | "Are all functions required by the customer included?" |
| **Realism** | "Can the requirements be implemented given available budget and technology" |
| **Verifiability** | "Can the requirements be checked?" |

- Study aid (mine, not from the slide): remember the order as **V-C-C-R-V** (Validity, Consistency, Completeness, Realism, Verifiability).
- ⚠️ The Realism line has no question mark on the slide (minor).

### [W6-S27] Requirements validation techniques
| Technique | What it is (exact) |
|---|---|
| **Requirements reviews** | "Systematic manual analysis of the requirements." |
| **Prototyping** | "Using an executable model of the system to check requirements." |
| **Test-case generation** | "Developing tests for requirements to check testability." |

- There are three techniques. Reviews are explained further on S28–S29.
- Prototyping also appears on S24, where focused ethnography combines ethnography with prototyping.

### [W6-S28] Requirements reviews
Slide text (exact):
- "Regular reviews should be held while the requirements definition is being formulated."
- "Both client and contractor staff should be involved in reviews."
- "Reviews may be formal (with completed documents) or informal. Good communications between developers, customers and users can resolve problems at an early stage."

- **When:** regularly, **while** the requirements definition is still being written.
- **Who:** **both client and contractor staff**.
- **Form:** **formal** (with completed documents) or **informal**.
- **Benefit:** good communication between developers, customers and users solves problems **at an early stage**.

### [W6-S29] Review checks
⭐ The four check names are in red on the slide.

| Review check | The question it asks (exact) |
|---|---|
| **Verifiability** | "Is the requirement realistically testable?" |
| **Comprehensibility** | "Is the requirement properly understood?" |
| **Traceability** | "Is the origin of the requirement clearly stated?" |
| **Adaptability** | "Can the requirement be changed without a large impact on other requirements?" |

- **Verifiability is on both lists, worded differently:** S26 asks "Can the requirements be checked?" and S29 asks "Is the requirement realistically testable?"
- **Don't mix up the two lists:**
  - S26 is **requirements checking**: 5 items.
  - S29 is the **review checks** made during a requirements review: 4 items.

### [W6-S30] Requirements management
Slide text (exact):
- "Requirements management is the process of managing changing requirements during the requirements engineering process and system development."
- "New requirements emerge as a system is being developed and after it has gone into use."
- "You need to keep track of individual requirements and maintain links between dependent requirements so that you can assess the impact of requirements changes. You need to establish a formal process for making change proposals and linking these to system requirements."

- **Definition:** managing **changing** requirements, both during the requirements engineering process **and** during system development.
- New requirements appear **while the system is being developed and after it has gone into use**.
- **What you must do:**
  1. Keep track of individual requirements.
  2. Keep links between dependent requirements, so you can assess the impact of a change.
  3. Set up a **formal process for change proposals**, and link each proposal to the system requirements.
- Compare the S29 review checks *Traceability* ("Is the origin of the requirement clearly stated?") and *Adaptability* ("…changed without a large impact on other requirements?").

### [W6-S31] Changing requirements (1)
Slide text (exact):
- "The business and technical environment of the system always changes after installation."
  - "New hardware may be introduced, it may be necessary to interface the system with other systems, business priorities may change (with consequent changes in the system support required), and new legislation and regulations may be introduced that the system must necessarily abide by."
- "The people who pay for a system and the users of that system are rarely the same people."
  - "System customers impose requirements because of organizational and budgetary constraints. These may conflict with end-user requirements and, after delivery, new features may have to be added for user support if the system is to meet its goals."

- **Reason 1: the environment changes after installation.** The slide's four examples:
  1. new hardware
  2. a need to interface with other systems
  3. changed business priorities, which change the support the system must give
  4. new legislation and regulations the system must follow
- **Reason 2: the people who pay are rarely the users.** Customers impose requirements because of organizational and budgetary constraints. These may conflict with what end-users need, so new features may have to be added after delivery.

### [W6-S32] Changing requirements (2)
Slide text (exact):
- "Large systems usually have a diverse user community, with many users having different requirements and priorities that may be conflicting or contradictory."
  - "The final system requirements are inevitably a compromise between them and, with experience, it is often discovered that the balance of support given to different users has to be changed."

- **Reason 3: large systems have a diverse user community.** Users' requirements and priorities may conflict or contradict each other.
- So the final requirements are **inevitably a compromise**. With experience, the **balance of support** given to different users often has to change.

### [W6-S33] Requirements evolution (diagram)
- A **Time** arrow runs left to right along the bottom of the diagram.
- **Left side:** "Initial Understanding of Problem" → (arrow down) → "Initial Requirements".
- **Right side:** a line runs from "Initial Requirements" along the time axis and then **up** into "Changed Understanding of Problem" → (arrow down) → "Changed Requirements".
- **Reading:** an understanding of the problem produces requirements. Over time, the initial requirements feed into a *changed* understanding of the problem, which produces *changed* requirements. In other words, requirements evolve, which is the point of S30–S32.

### [W6-S34] Table of Requirements-Gathering Techniques
The full table, every cell as on the slide:

| | **Interviews** | **Joint Application Design** | **Questionnaires** | **Document Analysis** | **Observation** |
|---|---|---|---|---|---|
| **Type of information** | As-is, improvements, to-be | As-is, improvements, to-be | As-is, improvements | As-is | As-is |
| **Depth of information** | High | High | Medium | Low | Low |
| **Breadth of information** | Low | Medium | High | High | Low |
| **Integration of information** | Low | High | Low | Low | Low |
| **User involvement** | Medium | High | Low | Low | Low |
| **Cost** | Medium | Low–Medium | Low | Low | Low to Medium |

**Reading the table** (each point comes straight from the cells):
- **To-be information** comes only from **interviews and JAD**. Questionnaires add improvements. Document analysis and observation give **as-is only**.
- **High depth:** interviews and JAD. **High breadth:** questionnaires and document analysis.
- **High integration of information** and **high user involvement:** **JAD only**.
- **Cost:**
  - Low: questionnaires and document analysis
  - Low–Medium: JAD
  - Low to Medium: observation
  - Medium: interviews
- **Observation** is rated Low on depth, breadth, integration and user involvement. Its value is the one given on S22: seeing what really happens and checking other sources.
- ⚠️ The column is headed "Joint Application **Design**", while S4 says "Joint Application **Development**". Both are JAD.
- 🔎 Look up in Track B: exactly what "depth", "breadth" and "integration" of information mean. The slide rates them but does not define them.

### [W6-S35] System Proposal Template (1)
Exact text (bold headings as on the slide):

> **1. Table of Contents**
>
> **2. Executive Summary**
> A summary of all the essential information in the proposal so a busy executive can read it quickly and decide what parts of the proposal to read in more depth.
>
> **3. System Request**
> The revised system request form.
>
> **4. Workplan**
> The original workplan, revised after having completed analysis.
>
> **5. Feasibility Analysis**
> A revised feasibility analysis, using the information from analysis.

### [W6-S36] System Proposal Template (2) — 6. Requirements Definition, 7. Functional Model, 8. Structural Models
Exact text:

> **6. Requirements Definition**
> A list of the functional and nonfunctional business requirements for the system
>
> **7. Functional Model**
> An activity diagram, a set of use case descriptions, and a use-case diagram that illustrate the
> basic processes or external functionality that the system needs to support.
>
> **8. Structural Models**
> A set of CRC cards, class diagram, and object diagrams that describe the structural aspects of the to-be system. This may also include structural models of the current as-is system that will be replaced.

- Minor slide formatting: the Requirements Definition line has no final period, and the Functional Model sentence breaks across two lines after "illustrate the".

### [W6-S37] System Proposal Template (3) — 9. Behavioral Models, 10. Appendices
Exact text:

> **9. Behavioral Models**
> A set of sequence diagrams, communication diagrams, behavioral-state machines, and a CRUDE matrix that describe the internal behavior of the to-be system. This may include behavioral models of the as-is system that will be replaced.
>
> **10. Appendices**
> These contain additional material relevant to the proposal, often used to support the recommended system. This might include results of a questionnaire survey or interviews, industry

- ⚠️ The Appendices sentence **stops mid-sentence at "industry"**, both on the slide and in the PDF text. Learn it as shown.

**The whole template at a glance** (wording shortened from S35–S37):

| # | Section | Contents |
|---|---|---|
| 1 | Table of Contents | — |
| 2 | Executive Summary | all the essential information, so a busy executive can read it quickly and decide what to read in depth |
| 3 | System Request | the **revised** system request form |
| 4 | Workplan | the original workplan, **revised** after analysis |
| 5 | Feasibility Analysis | a **revised** feasibility analysis, using information from analysis |
| 6 | Requirements Definition | list of functional and nonfunctional business requirements |
| 7 | Functional Model | activity diagram + use case descriptions + use-case diagram (basic processes / external functionality) |
| 8 | Structural Models | CRC cards + class diagram + object diagrams (to-be; may include the as-is system being replaced) |
| 9 | Behavioral Models | sequence diagrams + communication diagrams + behavioral-state machines + CRUDE matrix (internal behavior of the to-be system; may include the as-is) |
| 10 | Appendices | supporting material, e.g., questionnaire survey or interview results, industry … (cut off) |

- **Sections 3–5 are *revised* versions** of documents that existed before analysis.
- **Sections 7–9 are the three kinds of model:** functional, structural and behavioral. The structural and behavioral models may also cover the **as-is** system that will be replaced.
- **The Appendices** can hold questionnaire or interview results, i.e., the raw output of this deck's techniques.
- **This matches the "Analysis phase" picture from part 1** [W5b-S2]: System request → Requirements definition + Models + Feasibility Analysis + Workplan = **System proposal**. The proposal then goes to the **Approval committee** [W5b-S3].
- 🔎 Look up in Track B: activity diagrams, use cases, CRC cards, class and object diagrams, sequence and communication diagrams, behavioral-state machines, and the CRUDE matrix. This deck only names them.

---

## 3. Definitions & key terms

| Term | Definition / description, as on the slides | Ref |
|---|---|---|
| **Joint Application Development (JAD)** | "an information-gathering technique that allows the project team, users, and management to work together to identify requirements for the system" (IBM, late 1970s; "often the most useful method for collecting information from users") | S4 |
| **JAD as a process** | "a structured process in which ten to twenty users meet together under the direction of a facilitator skilled in JAD techniques" | S6 |
| **Facilitator** | "a person who sets the meeting agenda and guides the discussion but does not join in the discussion as a participant"; gives no ideas or opinions, "so as to remain neutral"; expert in "group-process techniques and systems-analysis and design techniques" | S6 |
| **Scribes** | "One or two scribes assist the facilitator by recording notes, making copies, and so on" (often with computers and CASE tools) | S6 |
| **Electronic JAD (e-JAD)** | "A new form of JAD … using groupware. In an e-JAD meeting room, each participant uses special software on a networked computer to send anonymous ideas and opinions to everyone else." | S7 |
| **Ground rules** | formal rules "that define appropriate behavior": following the schedule, respecting others' opinions, accepting disagreement, ensuring that only one person talks at a time | S11 |
| **Post-session report** | the JAD report, "prepared and circulated among session attendees"; "essentially the same as the interview report"; takes a week or two | S12 |
| **Questionnaire** | "a set of written questions used to obtain information from individuals" | S13 |
| **Sample** | "subset, of people who are representative of an entire group" | S14 |
| **Opinion question** | asks "the extent to which they agree or disagree (e.g., Are network problems common?)" | S15 |
| **Factual question** | seeks "more precise values (e.g., How often does a network problem occur: once an hour, once a day, once a week?)" | S15 |
| **Questionnaire report** | built from the returned questionnaires "soon after the questionnaire deadline" | S18 |
| **Document analysis** | used by project teams "to understand the as-is system". The slide gives no one-sentence definition. | S19 |
| **Observation** | "the act of watching processes being performed" | S22 |
| **Ethnography** | not defined on its own; paired with observation. "effective for understanding existing processes but cannot identify new features that should be added to a system" | S23 |
| **Focused ethnography** | "Combines ethnography with prototyping"; "Prototype development results in unanswered questions which focus the ethnographic analysis." | S24 |
| **Requirements validation** | "Concerned with demonstrating that the requirements define the system that the customer really wants." | S25 |
| **Validity** (checking) | "Does the system provide the functions which best support the customer's needs?" | S26 |
| **Consistency** (checking) | "Are there any requirements conflicts?" | S26 |
| **Completeness** (checking) | "Are all functions required by the customer included?" | S26 |
| **Realism** (checking) | "Can the requirements be implemented given available budget and technology" | S26 |
| **Verifiability** (checking) | "Can the requirements be checked?" | S26 |
| **Requirements reviews** | "Systematic manual analysis of the requirements." | S27 |
| **Prototyping** (validation technique) | "Using an executable model of the system to check requirements." | S27 |
| **Test-case generation** | "Developing tests for requirements to check testability." | S27 |
| **Verifiability** (review check) | "Is the requirement realistically testable?" | S29 |
| **Comprehensibility** | "Is the requirement properly understood?" | S29 |
| **Traceability** | "Is the origin of the requirement clearly stated?" | S29 |
| **Adaptability** | "Can the requirement be changed without a large impact on other requirements?" | S29 |
| **Requirements management** | "the process of managing changing requirements during the requirements engineering process and system development" | S30 |
| **Requirements evolution** | shown as a diagram over time: initial understanding of problem → initial requirements → changed understanding of problem → changed requirements | S33 |
| **Executive Summary** | "A summary of all the essential information in the proposal so a busy executive can read it quickly and decide what parts of the proposal to read in more depth." | S35 |
| **Requirements Definition** (proposal section 6) | "A list of the functional and nonfunctional business requirements for the system" | S36 |
| **Functional Model** (section 7) | "An activity diagram, a set of use case descriptions, and a use-case diagram that illustrate the basic processes or external functionality that the system needs to support." | S36 |
| **Structural Models** (section 8) | "A set of CRC cards, class diagram, and object diagrams that describe the structural aspects of the to-be system. This may also include structural models of the current as-is system that will be replaced." | S36 |
| **Behavioral Models** (section 9) | "A set of sequence diagrams, communication diagrams, behavioral-state machines, and a CRUDE matrix that describe the internal behavior of the to-be system. This may include behavioral models of the as-is system that will be replaced." | S37 |

### Key numbers to memorize

| Fact | Number | Ref |
|---|---|---|
| JAD developed by | IBM, late 1970s | S4 |
| Users in a JAD session | 10–20 | S6 |
| Scribes | 1–2 | S6 |
| Time saved by e-JAD | 50–80% (initial research) | S7 |
| Range of JAD session lengths | half a day to several weeks | S9 |
| Typical JAD | 5–10 days over a 3-week period | S9 |
| Typical e-JAD | 1–4 days in a 1-week period | S9 |
| JAD steps / questionnaire steps / interview steps | 5 / 4 / 5 | S8–S18, W5b-S35 |
| JAD post-session report finished | a week or two after the session | S12 |
| Interview report, for comparison | within 48 hours | W5b-S44 |
| Paper and e-mail questionnaires returned | 30–50% on average | S14 |
| Web-based questionnaires returned | often only 5–30% | S14 |
| Chase people who haven't returned a questionnaire | after a week or two | S17 |
| Questionnaire design guidelines | 9 | S16 |
| Kinds of helpful documents listed | 7 | S19 |
| Cost of a requirements error fixed after delivery | up to 100× the cost of an implementation error | S25 |
| Requirements checks / validation techniques / review checks | 5 / 3 / 4 | S26, S27, S29 |
| Reasons requirements change | 3 (the environment changes; payers ≠ users; a diverse user community) | S31–S32 |
| System proposal sections | 10 | S35–S37 |

---

## 4. Comparison tables as taught

### 4.1 Table of Requirements-Gathering Techniques (full, from S34)

| | **Interviews** | **Joint Application Design** | **Questionnaires** | **Document Analysis** | **Observation** |
|---|---|---|---|---|---|
| **Type of information** | As-is, improvements, to-be | As-is, improvements, to-be | As-is, improvements | As-is | As-is |
| **Depth of information** | High | High | Medium | Low | Low |
| **Breadth of information** | Low | Medium | High | High | Low |
| **Integration of information** | Low | High | Low | Low | Low |
| **User involvement** | Medium | High | Low | Low | Low |
| **Cost** | Medium | Low–Medium | Low | Low | Low to Medium |

**Using the table on "which technique?" questions** (each line comes straight from the cells):

| If the scenario needs… | Choose | Why, from the table |
|---|---|---|
| information about the **to-be** system | Interviews or JAD | the only two columns that include "to-be" |
| the **highest integration of information** or **user involvement** | JAD | the only "High" in those two rows |
| **depth** | Interviews or JAD | Depth High |
| **breadth** at **low cost** | Questionnaires or Document Analysis | Breadth High, Cost Low |
| breadth plus **improvement ideas** | Questionnaires | As-is *and improvements*, Breadth High |
| **as-is** facts from existing paperwork, cheaply | Document Analysis | As-is, Breadth High, Cost Low |

### 4.2 The five techniques side by side
Interview facts come from part 1 [W5b]; everything else is from this deck.

| | **Interviews** | **JAD** | **Questionnaires** | **Document analysis** | **Observation** |
|---|---|---|---|---|---|
| **How class describes it** | "the most commonly used requirements-gathering technique" [W5b-S35] | "often the most useful method for collecting information from users" [S4] | "a set of written questions used to obtain information from individuals" [S13] | used "to understand the as-is system" [S19] | "the act of watching processes being performed" [S22] |
| **Who takes part** | usually one-on-one; sometimes several people at once [W5b-S35] | project team, users and management; 10–20 users + facilitator + 1–2 scribes [S4, S6] | a sample of a large group; often outside users such as customers and vendors [S13–S14] | only documents: reports, memos, manuals, org charts, forms, the user interface [S19] | the people doing the work, watched by the analyst [S22] |
| **Steps** | 5: selecting interviewees, designing interview questions, preparing for the interview, conducting the interview, postinterview follow-up [W5b-S35] | 5: select participants, design a session, prepare, conduct, post-JAD follow-up [S8–S12] | 4: select participants, design, administer, follow-up [S14–S18] | no steps listed | no steps listed |
| **Question style** | closed-ended, open-ended and probing; unstructured or structured [W5b-S37–S39] | "designed and structured using the same principles as interviews" [S9] | mostly closed-ended; separate facts from opinions [S15] | — | — |
| **Written output** | interview report within 48 hours [W5b-S44] | post-session report, after a week or two [S12] | questionnaire report soon after the deadline [S18] | — | — |
| **Strength, per class** | High depth; covers as-is, improvements and to-be [S34] | High integration and user involvement; moves into analysis and can produce functional models or the requirements definition [S9, S34] | reaches many people and outside users; High breadth at Low cost [S13, S34] | High breadth at Low cost; user-made forms and added information show what must change [S21, S34] | sees "the reality of a situation"; checks the validity of interview and questionnaire data [S22] |
| **Weakness, per class** | Low breadth, Low integration [S34] | everyone must be away from the office at once; hard to facilitate [S8, S11] | low return rates; confused respondents can't be helped on the spot [S14–S15] | "most systems are not well documented" [S19] | as-is only, mostly Low ratings [S34]; ethnography "cannot identify new features" and studies practices whose "historical basis … is no longer relevant" [S23–S24] |
| **Type of info** [S34] | As-is, improvements, to-be | As-is, improvements, to-be | As-is, improvements | As-is | As-is |
| **Cost** [S34] | Medium | Low–Medium | Low | Low | Low to Medium |

### 4.3 JAD vs e-JAD

| | **JAD** | **e-JAD** |
|---|---|---|
| How ideas are shared | spoken in a meeting run by the facilitator; ground rule "only one person talks at a time" [S11] | "each participant uses special software on a networked computer to send anonymous ideas and opinions to everyone else" [S7] |
| Everyone at once? | no, one person talks at a time [S11] | yes, "all participants can contribute at the same time" [S7] |
| Anonymous? | not stated | yes, so there is no "fear of reprisal from people with differing opinions" [S7] |
| Typical length | 5–10 days over a 3-week period [S9] | 1–4 days in a 1-week period [S9] |
| Time saving | — | 50–80% less time (initial research) [S7] |
| Moves into analysis? | yes [S9] | yes [S9] |

### 4.4 Step sequences side by side

| Step | **Interviews** [W5b-S35] | **JAD** [S8–S12] | **Questionnaires** [S14–S18] |
|---|---|---|---|
| 1 | Selecting interviewees | Select Participants | Select Participants |
| 2 | Designing interview questions | Design a JAD Session | Designing a Questionnaire |
| 3 | Preparing for the interview | Preparing for a JAD Session | Administering the Questionnaire |
| 4 | Conducting the interview | Conducting a JAD Session | Questionnaire Follow-up |
| 5 | Postinterview follow-up | Post-JAD Follow-up | — |

- **The pattern:** JAD copies the interview steps, and the slides say "as with interviews" at almost every step. Questionnaires have only 4 steps: "administering" takes the place of preparing and conducting.

### 4.5 Validation toolkit: three lists not to mix up

| **Requirements checking** (5) [S26] | **Validation techniques** (3) [S27] | **Review checks** (4) [S29] |
|---|---|---|
| Validity: best supports the customer's needs? | Requirements reviews: systematic manual analysis | Verifiability: realistically testable? |
| Consistency: any conflicts? | Prototyping: an executable model to check requirements | Comprehensibility: properly understood? |
| Completeness: all required functions included? | Test-case generation: tests that check testability | Traceability: origin clearly stated? |
| Realism: implementable with the available budget and technology? | | Adaptability: changeable without a large impact on other requirements? |
| Verifiability: can the requirements be checked? | | |

**Look-alike words:**

| Word | Slide | Meaning on the slide |
|---|---|---|
| Validation | S25 | demonstrating that the requirements define the system the customer really wants |
| Validity | S26 | "Does the system provide the functions which best support the customer's needs?" |
| Verifiability (checking) | S26 | "Can the requirements be checked?" |
| Verifiability (review check) | S29 | "Is the requirement realistically testable?" |
| Test-case generation | S27 | "Developing tests for requirements to check testability." |

### 4.6 Why requirements change [S31–S32]

| Reason | What the slide says |
|---|---|
| 1. The environment changes after installation | new hardware; interfacing with other systems; changed business priorities; new legislation and regulations |
| 2. The people who pay are rarely the users | customers impose organizational and budgetary constraints that may conflict with end-user requirements, so features get added after delivery |
| 3. Large systems have a diverse user community | requirements conflict or contradict each other; the final set is a compromise, and the balance of support between users has to change |

---

## 5. Questions from class (S2–S3), answered with refs
Answers draw on this deck and on part 1 [W5b]. One point cites the planning deck [W3]. All of it is class material.

### S2-Q1. What are the key deliverables that are created during analysis?
- **Short answer:** the requirements definition, the models (functional, structural and behavioral), a revised feasibility analysis and a revised workplan. All of them are packaged into the **system proposal**.
- **The class diagram** [W5b-S2]: "System request" → "Requirements definition" + "Models" + "Feasibility Analysis" + "Workplan" = "**System proposal**".
  - On the slide, System request, Feasibility Analysis and Workplan carry green ticks.
  - Requirements definition and Models have no tick.
- **The proposal goes to the "Approval committee"** [W5b-S3].
- **In detail, the System Proposal Template** [W6-S35–S37]:
  - revised System Request, Workplan and Feasibility Analysis (sections 3–5)
  - Requirements Definition (6)
  - Functional Model (7): activity diagram, use case descriptions, use-case diagram
  - Structural Models (8): CRC cards, class diagram, object diagrams
  - Behavioral Models (9): sequence diagrams, communication diagrams, behavioral-state machines, CRUDE matrix
  - plus Executive Summary, Table of Contents and Appendices

### S2-Q2. What is the difference between an as-is system and a to-be system?
- **As-is** = "the current state of systems and processes (the as-is system)" [W5b-S18].
- **To-be** = "a concept for a new system (the to-be system)" [W5b-S18].
- **Analysis moves from one to the other:** understand the as-is system → identify improvements → develop requirements for the to-be system [W5b-S21].
- **In this deck:**
  - Document analysis and observation give **as-is** information only. Interviews and JAD also give **to-be** information [W6-S34].
  - The structural and behavioral models describe the **to-be** system, but "may also include" models of the **as-is** system "that will be replaced" [W6-S36–S37].

### S2-Q3. What is the purpose of the requirements definition?
- "**Purpose: to convert high level business requirements (from the system request) into detailed requirements that can be used as inputs for creating models**" [W5b-S11].
- What it is:
  - "a document that lists the new system's capabilities" [W5b-S7]
  - "a straightforward text report that simply lists the functional and nonfunctional requirements in an outline format" [W5b-S16]
  - in the system proposal: "A list of the functional and nonfunctional business requirements for the system" [W6-S36]
- **Links in this deck:**
  - Users and analysts can create the requirements definition together in a JAD session [W6-S9].
  - "Regular reviews should be held while the requirements definition is being formulated" [W6-S28].

### S2-Q4. What are the three basic steps of the analysis process? Which step is sometimes skipped or done in a cursory fashion? Why?
- **The three steps** [W5b-S21] (the slide labels them Understand → Identify → Develop):
  1. understanding the as-is system
  2. identifying improvements
  3. developing requirements for the to-be system
- **The step that gets skipped or rushed:** step 1, **understanding the as-is system**.
- **Why:** it depends on how much change the project aims for.
  - BPA planners "spend a significant time understanding the current as-is system" [W5b-S22].
  - BPI planners spend "much less time than with BPA projects" on it [W5b-S24].
  - "Planners of BPR projects spend little time understanding the as-is, because their goal is to focus on new ideas and new ways of doing business" [W5b-S29].

### S2-Q5. Describe the five major steps in conducting interviews.
The steps are listed on [W5b-S35]:
1. **Selecting interviewees.** Make an "interview schedule listing all the people who will be interviewed, when, and for what purpose". Include both managers and staff to get high-level and low-level perspectives [W5b-S36].
2. **Designing interview questions.**
   - Use closed-ended, open-ended and probing questions [W5b-S37–S38].
   - Choose unstructured or structured interviews [W5b-S39].
   - Order the questions top-down or bottom-up [W5b-S40].
3. **Preparing for the interview.**
   - Have a general interview plan with the questions in order.
   - Anticipate answers and follow-ups.
   - Confirm what the interviewee knows about.
   - Decide priorities in case time runs short [W5b-S42].
4. **Conducting the interview.**
   - Build rapport, and appear professional and unbiased.
   - Explain why you are there and why you chose this person.
   - Record everything carefully, taking careful notes [W5b-S43].
5. **Post-interview follow-up.** Write an interview report within 48 hours. It is often sent to the interviewee to check [W5b-S44].
- **Link to this deck:** JAD uses the same five steps [W6-S8–S12].

### S2-Q6. Explain the differences among a closed-ended question, an open-ended question, and a probing question. When would you use each?

| Type | What it is (class wording) | When to use it |
|---|---|---|
| **Closed-ended** | "require a specific answer"; like multiple-choice or arithmetic exam questions [W5b-S37] | when "looking for specific, precise information (e.g., how many credit card requests are received per day)" [W5b-S37] |
| **Open-ended** | "leave room for elaboration on the part of the interviewee"; like essay questions [W5b-S38] | to "gather rich information and give the interviewee more control over the information that is revealed" [W5b-S38] |
| **Probing** | "follow up on what has just been discussed in order to learn more" [W5b-S38] | "when the interviewer is unclear about an interviewee's answer"; to get them to expand on or confirm an answer; it also shows you are listening [W5b-S38] |

- "No type of question is better than another, and a combination of questions is usually used" [W5b-S39].
- **Link to this deck:** questionnaires mostly use **closed-ended** questions, because answers "cannot be immediately clarified for a confused respondent" [W6-S15].

### S2-Q7. Explain the differences between unstructured interviews and structured interviews. When would you use each approach?

| | **Unstructured** | **Structured** |
|---|---|---|
| What | "interviews that seek broad and roughly defined information"; the interviewer has "few closed-ended questions to ask" | "specific sets of questions are developed before the interviews"; "more closed-ended questions" |
| When | the initial stage of a project, when "the as-is process can be unclear" | later, as the project progresses and the analyst "needs very specific information" (e.g., "exactly how a customer credit card is approved") |
| Difficulty | "the most challenging interviews to conduct", because they need open-ended questions and probing "on the fly" | — |

All from [W5b-S39].

### S3-MCQ1. Which is NOT a purpose of the requirements definition?
**Answer: (d) Create cost/benefit analysis.** Watch out: (a) is a trap that is also arguably "NOT".

| Option | Purpose of the requirements definition? | Class evidence |
|---|---|---|
| (a) To give a very high-level explanation of the business requirements | ⚠️ **No, strictly speaking** | The high-level business requirements come *from the system request*. The requirements definition **converts** them into *detailed* requirements [W5b-S11]. |
| (b) A more precise list of requirements that can be used as inputs to the rest of analysis | Yes | "detailed requirements that can be used as inputs for creating models" [W5b-S11] |
| (c) Create functional requirements | Yes | "lists the functional and nonfunctional requirements" [W5b-S16]; [W6-S36] |
| (d) **Create cost/benefit analysis** | **No** | Cost–benefit analysis is the *economic feasibility analysis* ("also called a cost–benefit analysis") [W3-S22]. It belongs to the **Feasibility Analysis**, which is a separate deliverable [W5b-S2] and a separate proposal section, #5 [W6-S35]. |
| (e) Create non-functional requirements | Yes | [W5b-S16]; [W6-S36] |

- **If you can pick only one, pick (d).** It belongs to a completely different deliverable.
- **If the question allows several answers, pick (a) and (d).**

### S3-MCQ2. An example of a functional requirement is ____
**Answer: (a) Access to the customer order system.** It is the only option about something the system must *do*, rather than a quality the system must have.

- **The class definitions:**
  - "A functional requirement relates directly to a process a system has to perform or information it needs to contain" [W5b-S12].
  - Nonfunctional requirements "refer to behavioral properties that the system must have, such as performance and usability" [W5b-S13].
- **Why each other option is nonfunctional**, using the categories in [W5b-S14]:

| Option | Category | Class evidence |
|---|---|---|
| (b) Available in English and Spanish | Cultural and political | the class example "distinguish between United States and European currency" [W5b-S14] |
| (c) Accessed through a Blackberry device | Operational ("the physical and technical environments in which the system will operate") | the class example "fit in a pocket or purse" [W5b-S14] |
| (d) Displayed in Internet Explorer, Firefox or Chrome | Operational | "The ability to access the system using a Web browser is considered a nonfunctional requirement" [W5b-S13]; the class example "work on any Web browser" [W5b-S14] |
| (e) Automatically updated every 5 seconds | Performance ("The speed, capacity, and reliability of the system") | the class example "receive updated inventory information every 15 minutes" [W5b-S14] |

- **Don't confuse (a) with security.** In class, the *security* category is about "**who** has authorized access to the system under **what circumstances**" [W5b-S14]. Option (a) names no users and no conditions.

---

## 6. Likely exam questions (built only from the W6 slides)

1. **(MCQ)** JAD is an information-gathering technique that allows ________ to work together to identify requirements for the system.
   a) the analyst and the approval committee · b) the project team, users, and management · c) customers and vendors only · d) the facilitator and the scribes

2. **(MCQ)** Which statement about the JAD facilitator is **NOT** correct?
   a) The facilitator sets the meeting agenda and guides the discussion. · b) The facilitator provides ideas and opinions to help the group reach a decision. · c) The facilitator must be an expert in both group-process techniques and systems-analysis and design techniques. · d) The facilitator does not join in the discussion as a participant.

3. **(MCQ)** In e-JAD, participants send ideas and opinions ________, and initial research suggests e-JAD can reduce the time needed for JAD sessions by ________.
   a) verbally, one at a time; 10–20% · b) anonymously, at the same time; 50–80% · c) on paper, after the session; 30–50% · d) through the scribe; up to 100 times

4. **(List)** List, in order, the five steps of a good JAD approach.

5. **(MCQ)** Which is **NOT** one of the common JAD ground rules given in class?
   a) Following the schedule · b) Respecting others' opinions · c) Making sure every participant agrees before moving on · d) Ensuring that only one person talks at a time

6. **(True/False)**
   (a) Most JAD sessions last five to ten days spread over a three-week period, while most e-JAD sessions last one to four days in a one-week period.
   (b) Because a JAD session is just a large interview, the post-session report is normally finished within a day or two.

7. **(MCQ)** On average, what share of paper and e-mail questionnaires is returned?
   a) 5–30% · b) 30–50% · c) 50–80% · d) almost all of them

8. **(MCQ)** "How often does a network problem occur: once an hour, once a day, once a week?" is an example of:
   a) an opinion question · b) a factual question · c) a probing question · d) a biased item

9. **(MCQ)** Which of these is **NOT** one of the class guidelines for questionnaire design?
   a) Begin with nonthreatening and interesting questions. · b) Put the most important items at the very end of the questionnaire. · c) Pretest the questionnaire to identify confusing questions. · d) Provide anonymity to respondents.

10. **(MCQ)** According to class, what is "perhaps the most obvious issue — but one that is sometimes overlooked" in designing a questionnaire?
    a) Choosing the paper size · b) Understanding how the collected information will be analyzed and used, before the questionnaire is distributed · c) Offering a free pen · d) Using only open-ended questions

11. **(MCQ)** The most powerful indication that a system needs to be changed is when:
    a) the technical documentation is out of date · b) users create their own forms or add additional information to existing ones · c) managers cannot remember how they allocate their time · d) the questionnaire response rate is low

12. **(Scenario: which technique?)** A company is building a system that its **customers and vendors** will use. The analyst needs information and opinions from **thousands of people**, about the current system and possible improvements, at **low cost**. Which technique fits best? Justify it with the table.

13. **(Scenario: which technique?)** The team wants users, management and analysts to work through the as-is system, improvements and the to-be system **together**. It wants the **highest integration of information and user involvement**, and hopes to draft the **requirements definition during the session**. Which technique fits?

14. **(Scenario: which technique?)** Managers described their work in interviews, but the analyst suspects that this is **not how the work is really done**. Which technique checks this? What are its limits, according to the table and the ethnography slides?

15. **(Table reading)** According to the Table of Requirements-Gathering Techniques, which technique gives **only as-is** information, with **High breadth** but **Low depth**?
    a) Interviews · b) Questionnaires · c) Document analysis · d) Observation

16. **(MCQ)** Which requirements validation technique uses an **executable model of the system** to check requirements?
    a) Requirements reviews · b) Prototyping · c) Test-case generation · d) Traceability

17. **(Matching)** Match each question to its check: Consistency, Traceability, Realism, Adaptability, Completeness or Comprehensibility.
    (i) "Are there any requirements conflicts?" · (ii) "Is the origin of the requirement clearly stated?" · (iii) "Can the requirements be implemented given available budget and technology" · (iv) "Can the requirement be changed without a large impact on other requirements?"

18. **(True/False)**
    (a) Ethnography is effective for understanding existing processes and for identifying new features that should be added to a system.
    (b) Fixing a requirements error after delivery may cost up to 100 times the cost of fixing an implementation error.
    (c) New requirements emerge only while a system is being developed; once it is in use, its requirements are fixed.
    (d) Both client and contractor staff should be involved in requirements reviews, which may be formal or informal.
    (e) Focused ethnography combines ethnography with questionnaires.

19. **(List)** List the ten sections of the System Proposal Template in order.

20. **(MCQ)** In the System Proposal Template, which section contains "a set of sequence diagrams, communication diagrams, behavioral-state machines, and a CRUDE matrix"?
    a) 6. Requirements Definition · b) 7. Functional Model · c) 8. Structural Models · d) 9. Behavioral Models

### Answers
1. **b** [S4].
2. **b**. The facilitator "does not provide ideas or opinions on the topics under discussion so as to remain neutral" [S6].
3. **b**: anonymous, simultaneous input, with sessions 50–80% shorter [S7].
4. (1) Select participants → (2) Design a JAD session → (3) Prepare for a JAD session → (4) Conduct a JAD session → (5) Post-JAD follow-up [S7–S12].
5. **c**. The class list includes "accepting disagreement". Participants should "recognize and accept — but not necessarily agree on" other opinions [S11].
6. (a) **True** [S9]. (b) **False**: "it usually takes a week or two after the JAD session before the report is complete", because sessions are longer and provide more information [S12].
7. **b**. Web-based questionnaires do worse, often only 5–30% [S14].
8. **b**. Factual questions "seek more precise values". "Are network problems common?" is the opinion version [S15].
9. **b**. The real guideline is "Do not put important items at the very end of the questionnaire." [S16]
10. **b**. "This issue must be addressed before the questionnaire is distributed, because it is too late afterward." [S15]
11. **b** [S21]. Option (c) is a point from the observation slide [S22]; it is not the indication of needed change.
12. **Questionnaires.**
    - They are used "when there is a large number of people from whom information and opinions are needed" and with "systems intended for use outside the organization (e.g., by customers or vendors)" [S13].
    - The table gives them As-is and improvements, Breadth High and Cost Low [S34].
13. **JAD.**
    - It is the only technique rated High for both integration of information and user involvement, and it covers as-is, improvements and to-be [S34].
    - JAD sessions "move into analysis", where users and analysts can create "the functional models or the requirements definition" [S9].
14. **Observation.**
    - It lets the analyst "see the reality of a situation", and it is "a good way to check the validity of information gathered from indirect sources such as interviews and questionnaires" [S22].
    - **Limits:**
      - as-is only, with Low depth, breadth, integration and user involvement, at Low to Medium cost [S34]
      - ethnography "cannot identify new features" [S23]
      - it may study practices with "some historical basis which is no longer relevant" [S24]
15. **c**. Document Analysis is As-is, Depth Low, Breadth High. Questionnaires also have High breadth, but Medium depth, and they cover improvements too. Observation has Low breadth [S34].
16. **b** [S27].
17. (i) Consistency [S26] · (ii) Traceability [S29] · (iii) Realism [S26] · (iv) Adaptability [S29].
18. (a) **False**: it "cannot identify new features" [S23]. (b) **True** [S25]. (c) **False**: new requirements emerge "after it has gone into use" too [S30]. (d) **True** [S28]. (e) **False**: it combines ethnography with **prototyping** [S24].
19. 1 Table of Contents · 2 Executive Summary · 3 System Request · 4 Workplan · 5 Feasibility Analysis · 6 Requirements Definition · 7 Functional Model · 8 Structural Models · 9 Behavioral Models · 10 Appendices [S35–S37].
20. **d** [S37].

---

## 7. Self-check

- [ ] **I can** quote the JAD definition and name who takes part: the project team, users and management; 10–20 users, a facilitator and 1–2 scribes [S4, S6].
- [ ] **I can** explain why the facilitator stays neutral and name the three kinds of expertise facilitation needs: systems analysis and design, JAD, and interpersonal skills [S6, S11].
- [ ] **I can** describe e-JAD and its benefits: anonymous input, everyone at the same time, no fear of reprisal, and 50–80% less time [S7, S9].
- [ ] **I can** list the 5 JAD steps and the 4 common ground rules from memory [S8–S12].
- [ ] **I can** list the 4 questionnaire steps, give the return rates (30–50% paper/e-mail, 5–30% Web), recite at least 6 of the 9 design guidelines, and tell an opinion question from a factual one [S13–S18].
- [ ] **I can** name the 7 kinds of helpful documents and explain why user-made forms and added information are "the most powerful indication that the system needs to be changed" [S19–S21].
- [ ] **I can** explain what observation shows that interviews and questionnaires can't, give ethnography's two weaknesses, and say what focused ethnography adds [S22–S24].
- [ ] **I can** redraw the techniques table (6 rows × 5 columns) and use it to choose a technique for a scenario [S34].
- [ ] **I can** name the 5 requirements checks, the 3 validation techniques and the 4 review checks without mixing the lists up, and say why validation matters (up to 100×) [S25–S29].
- [ ] **I can** define requirements management, give the 3 reasons requirements change, explain the evolution diagram, and list the 10 System Proposal sections in order [S30–S37].
