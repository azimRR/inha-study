# Midterm review — System Analysis (from class slides only)
> Track A only: everything here comes from the professor's slides (340 slides, weeks 1–6) and his Quiz 1. The Week 7 slides (UML use cases & activity diagrams) are not uploaded yet (as of Mon 19 Oct 2026).

**Legend.** ⭐ = the professor's own emphasis or question · ⚠️ = slide error or exam trap · 🔎 = not explained on the slides, look it up in Track B · **PRACTICE** = a new question written for this review, using the slides' method with new numbers (not from the professor). Refs like [W4-S23] mean deck W4, slide 23. Decks: W1a (17 slides), W1b (57), W2 (63), W3 (41), W4 (47), W5a (33), W5b (45), W6 (37).

**How to use this file:** §1 and §2 first (his question styles), then the drills in §6–§8, then §4–§5 for recall, §9 for traps, and §10 in the last 48 hours.

---

## 0. Exam facts

| Item | Fact | Source |
|---|---|---|
| Course | SOC3070-002 System Analysis, Prof. Andrei Dragunov, Tue/Thu. Textbook: Dennis, Wixom & Roth, *Systems Analysis and Design*, 8th ed. | Syllabus |
| Weights | **Midterm 40%** · Final 40% · Quizzes 10% (**2 quizzes**) · Attendance 10% | Syllabus; [W1a-S2] "two exams … (plus two quizzes)" |
| Midterm date | **Week 8, 24–30 Oct 2026.** Classes are Tue/Thu, so it is probably **Tue 27 or Thu 29 Oct**. ⚠️ No date has been announced; confirm it in the Telegram group. | Syllabus |
| Where announcements are | The eclass board is empty. The course "Channel" is a **Telegram group**: https://t.me/+x9d1UZWKtw1hOTZi. Check it for the midterm date and room, **Quiz 2**, and the W6 homework "AI vs. human requirement analysis" (late homework is not accepted). | Syllabus file |
| Pace | The professor runs about one week behind the syllabus plan. | Syllabus file |
| Scope | Decks W1a–W6 (this file). W7 (UML use cases & activity diagrams) may be added if it is taught before the exam. | Syllabus |
| Quiz 2 | Not announced yet (19 Oct). | Syllabus file |

### What Quiz 1 tells us about his style [W4-S2–S5]
- He gave it at the start of the W4 lecture, and it tested the **two previous lectures**: W1b (methodology diagrams) and W3 (economic feasibility). It did not test that day's topic.
- There were **4 versions, each with 2 open tasks and no answer options**:
  - **Part A:** "Depict graphically: *Phased / Waterfall / Parallel* development methodology." You redraw a W1b diagram from memory.
  - **Part B:** cash flows grouped as Development costs / Operational costs / Tangible benefits, then "Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = X%".
- The versions differ only in three amounts and the rate (5 / 10 / 15 / 20%). He tests the **procedure**, not memorised answers.
- Part B copies his own W3 "Small practice" slide almost word for word [W3-S41]. On that slide the items were **mixed, not grouped**, so be ready to classify them yourself with the W3-S23 table.
- The W5a and W6 decks open with **review questions on the previous deck**: 5-option MCQs [W5a-S2–S3, W6-S3] and 7 open questions [W6-S2]. W5a has one more mid-deck MCQ [W5a-S25]. The cases have named people (Micah, Mya) and need a rule applied.
- **Likely midterm mix (an inference, not announced):** drawing + calculation in the Quiz style, plus recall and scenario MCQs in the review style.

---

## 1. ⭐ The professor's question styles, with recipes

### 1(a) "Depict graphically: ___ development methodology"

**Drawing conventions in every class diagram** [W1b-S20, S25, S28, S34, S39, S44]:
- one rectangular box per phase;
- a **solid curved arrow** forward to the next phase;
- a **dashed wavy arrow** back to the previous phase (drawn between consecutive phases; the slides don't label it 🔎);
- a **rounded box** for each output: "System", "System version n", "System prototype", "Design prototype";
- a **dotted ellipse** around a group that runs separately or repeats ("Subproject n", one version's cycle);
- a **stacked block** (phases drawn touching, one above the other) for phases that run at the same time.

**A full answer** (my recommendation; no marking scheme is published) has the title, every box labelled, all the arrows, and 2–3 lines on how it works plus one pro and one con quoted from the slides.

#### ① Waterfall — Structured [W1b-S20; text S18, S21, S23] (Quiz 1 V2)
```
[Planning] ─┐
   ▲~~~~~   ▼
        [Analysis] ─┐
           ▲~~~~~   ▼
                [Design] ─┐
                   ▲~~~~~ ▼
                     [Implementation] ─┐
                                       ▼
                                   (System)
─┐▼ solid arrow forward      ▲~~~~ dashed wavy arrow from the next box back up to this one
```
- **Redraw checklist:**
  - 4 boxes as a descending staircase, ending in a rounded "System";
  - 4 solid forward arrows;
  - 3 wavy back-arrows: Analysis→Planning, Design→Analysis, Implementation→Design;
  - nothing goes back from System.
- **Royce version** ("the first published model … (Royce, 1970)") [S19]:
  - staircase: Requirements Definition → System and Software Design → Implementation and Unit Testing → Integration and System Testing → Operation and Maintenance;
  - a feedback line along the bottom, from Operation and Maintenance, with an up-arrow into each of the 4 earlier boxes.
- **How it works:** a "cascade from one phase to another"; plan-driven, so "you must plan and schedule all of the process activities before starting work on them" [S21].
- **Pro:** "the plan-driven nature of the waterfall model helps coordinate the work". It is "mostly used for large systems engineering projects where a system is developed at several sites" [S23].
- **Con:** "**Inflexible** partitioning … makes it difficult to respond to changing customer requirements". "Few business systems have stable requirements" [S23]. It is delivered only "after completion" [S31].
- **Use when** the requirements are well understood and changes are fairly limited [S23].
- **S46 ratings:** Good only for complex and reliable systems; Poor on the other 4.

#### ② V-model — shown with the waterfall slides [W1b-S22]
| Left slope (going down, solid arrows) | Middle: teal "test design" boxes (dashed arrows in and out) | Right slope (going up, solid arrows) |
|---|---|---|
| Analysis | Acceptance test design | Acceptance testing (top right) |
| Design | System test design | System testing |
| Design | Integration test design | Integration testing |
| Design | Unit test design | Unit testing |
| **Implementation (coding)** = the bottom point of the V | — | the right slope starts here |
```
Analysis ┈┈► ⟨Acceptance test design⟩ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈► Acceptance testing
   ╲                                                              ↗
   Design ┈┈► ⟨System test design⟩ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈► System testing
     ╲   ┈┈┈► ⟨Integration test design⟩ ┈┈┈┈┈┈┈► Integration testing
      ╲  ┈┈┈► ⟨Unit test design⟩ ┈┈┈┈► Unit testing ↗
       ╲                               ↗
        Implementation (coding) ─────↗        + one big ↓ arrow on the left, one big ↑ arrow on the right
```
- **How it works** [S22]: go "down the left-hand slope … At the base of the V, the code is written. On the upward-sloping right side … testing of components, integration testing, and, finally, acceptance testing".
- **Key fact:** acceptance tests are designed in **Analysis**; system, integration and unit tests are designed in **Design**.
- **Pros, cons, when to use:** not on the slides 🔎. The V-model is not rated in S46.

#### ③ Parallel development — Structured [W1b-S25; text S24] (Quiz 1 V3)
```
[Planning] → [Analysis] → [Design]      ← ONE general design for the whole system
                             ├──► ( [Design] → [Implementation] )  Subproject 1 ─┐
                             ├──► ( [Design] → [Implementation] )  Subproject 2 ─┼──► [Integration] → (System)
                             └──► ( [Design] → [Implementation] )  Subproject 3 ─┘
( … ) = dotted ellipse with its label; wavy back-arrows between consecutive boxes,
including from each subproject's Design back to the general Design
```
- **How it works** [S24]: "performs a general design for the whole system and then divides the project into a series of distinct subprojects that can be designed and implemented in parallel". Once all the subprojects are complete, the pieces are integrated and the system is delivered.
- **Problem it addresses:** "long delays between the analysis phase and the delivery of the system" [S24].
- **Pro:** "can reduce the time to deliver a system; thus, there is less chance of changes in the business environment causing rework" [S24].
- **Con:** it is still delivered only "after completion", like waterfall [S31].
- **S46 ratings:** the same as Waterfall, except Good for a short time schedule; Poor on 3.

#### ④ Phased (iterative) development — RAD [W1b-S28; text S27, S31, S32] (Quiz 1 V1 and V4 — he asked it twice)
```
[Planning] → [Analysis] ──► ( [Analysis] → [Design] → [Implementation] ) ──► (System version 1)
                                                                                    │ long arrow back
                    ┌───────────────────────────────────────────────────────────────┘
                    ▼
                  ( [Analysis] → [Design] → [Implementation] ) ──► (System version 2)
                                                                          │
                    ┌─────────────────────────────────────────────────────┘
                    ▼
                  ( [Analysis] → [Design] → [Implementation] ) ──► (System version 3)
```
- **Redraw checklist:**
  - Planning and the overall Analysis appear once, with a wavy arrow between them.
  - Then 3 dotted ellipses, each Analysis → Design → Implementation with wavy back-arrows inside.
  - Each ellipse ends in a rounded "System version n".
  - A long arrow runs from each version into the **Analysis box of the next ellipse**, because users' experience with version n feeds version n+1.
- **How it works** [S27]: "breaks an overall system into a series of versions that are developed sequentially". "The most important and fundamental requirements are bundled into the first version". It continues "until the system is complete or is no longer in use".
- **Pros** [S31]: "quickly getting a useful system into the hands of the users"; business value sooner; users identify additional requirements sooner.
- **Con** [S32]: "users begin to work with systems that are intentionally incomplete". The fix is to put the most important features in version 1 and manage users' expectations.
- **S46 ratings:** never Poor; Excellent for a short time schedule and schedule visibility.
- **Related** [S29–S30]: *iterative* = refine the whole thing; *incremental* = add finished pieces; *iterative-incremental* = both (the Mona Lisa picture).

#### ⑤ Prototyping — RAD [W1b-S34; text S33, S35–S37]
```
[Planning] ──► ┌───────────────┐
    ▲~~~~~~~~  │ Analysis       │
               │ Design         │ ──► (System prototype) ──► [Implementation] ──► (System)
               │ Implementation │ ◄───────────┘ loop back into the block
               └───────────────┘   one stacked block: A, D and I run concurrently
```
- **Redraw checklist:**
  - Planning → a stacked block [Analysis / Design / Implementation], with a wavy arrow back to Planning.
  - Block → rounded "**System prototype**".
  - A line from the prototype back into the block's Implementation row: this is the repeat loop.
  - **And** an arrow from the prototype on to Implementation → rounded System.
- **How it works** [S33]: A, D and I run "concurrently, and all three phases are performed repeatedly in a cycle until the system is completed". The prototype is "a quick-and-dirty program that provides a minimal amount of features".
- **Pros** [S36]: improved usability; a closer match to users' real needs; improved design quality; improved maintainability; reduced development effort.
- **Cons** [S37]: a prototype "may involve leaving out functionality"; "error checking and recovery may not be included"; it focuses on functional rather than non-functional requirements such as reliability and security.
- **S46 ratings:** Excellent for unclear requirements, a short schedule and schedule visibility. **Poor** for unfamiliar technology, complex systems and reliable systems.

#### ⑥ Throwaway prototyping [W1b-S39; text S38]
```
[Planning] → [Analysis] → ┌───────────────┐
                          │ Analysis       │ ──► [Design] → [Implementation] → (System)   ← the real build
                          │ Design         │ ──► (Design prototype)
                          │ Implementation │ ◄───────┘ loop back
                          └───────────────┘
wavy back-arrows: Analysis→Planning, block→Analysis, Implementation→Design (on the real-build path)
```
- **Difference from ⑤:** the prototype is a **Design prototype** and is **discarded**. The real system is built along a separate Design → Implementation → System path.
- **Why discard it** [S38] ("they are not a good basis for a production system", in red):
  1. it may be impossible to tune it for non-functional requirements;
  2. prototypes are normally undocumented;
  3. their structure is degraded by rapid change;
  4. they probably won't meet organizational quality standards.
- **S46 ratings:** the only methodology rated **Excellent for unfamiliar technology**. Excellent on 4 rows (unclear requirements, unfamiliar technology, complex systems, reliable systems); never Poor.

#### ⑦ Agile — typical agile development methodology [W1b-S44 = W2-S7 right-hand picture; text W1b-S40]
```
   ┌───────────────────────────────┐
   ▼                               │
┌───────────────┐                  │
│ Planning       │              (System)
│ Analysis       │                 ▲
│ Design         │                 │
│ Implementation │                 │
└───────────────┘─────────────────┘   one block with all 4 phases → System → back into Planning
```
- **How it works** [W1b-S40]: "every iteration is a complete software project". Cycles are 1–4 weeks, face-to-face communication is preferred, and much of the modeling and documentation overhead is eliminated.
- **W2-S7 contrast picture:**
  - *Traditional*: Ideas → Planning › Analysis › Design › Implementation → Final Software ("First time to get real feedback").
  - *Agile*: Ideas → Define → Code → Test cycles → increments i1, i2, i3 (growing cubes, "Review and Adjust" after each) → Final Software.
- **XP** (no diagram on the slides) [W1b-S54–S55]: new versions may be built **several times per day**; increments go to customers **every 2 weeks**; all tests run on every build. **S46 ratings:** Excellent for unclear requirements and a short schedule; Good for reliable systems and schedule visibility; Poor for unfamiliar technology and complex systems.
- **Scrum flow, if asked to draw it** [W2-S28]:
  - Inputs from Executives, Team, Stakeholders, Customers, Users → **Product Owner** → **Product Backlog** (ranked 1–8).
  - → **Sprint Planning Meeting** ("Team selects starting at top as much as it can commit to deliver by end of Sprint") → **Sprint Backlog** ("Task Breakout").
  - → a big loop "**1-4 Week Sprint**" with a small loop "**Every 24 Hours**" (the **Daily Scrum Meeting**); the Scrum Master and "Burndown/up Charts" sit above it.
  - → **Finished Work** → **Sprint Review** + **Sprint Retrospective**.
  - Caption: "Sprint end date and team deliverable do not change".

### 1(b) Economic feasibility recipe (Quiz 1 Part B, using the W3 method)

| Step | What to do | Ref |
|---|---|---|
| 1. Classify | Use the S23 table: **Development costs → Year 0 only**; **Operational costs** and **Tangible benefits → every year, Years 1…n**; intangibles with no $ value are left out. Write one line of assumptions on the paper: "Development costs are one-time in Year 0; operating costs and benefits are annual, Years 1–n, no growth." 🔎 Confirm this convention with the professor. | W3-S19, S23, S24, S33 |
| 2. Table | Rows: Total Benefits / Total Costs / Net Benefits (= B − C) / Cumulative Net Cash Flow. Columns: Year 0 … Year n, Total. **(Parentheses) = negative.** | S25 |
| 3. ROI | **ROI = (Total Benefits − Total Costs) / Total Costs.** Totals over all years, **including Year 0**. | S26 |
| 4. BEP | Find "that year", the first year the cumulative turns positive. **BEP = number of years of negative cash flow + (that year's NCF − that year's cumulative) / that year's NCF.** The negative years **don't include Year 0**, so the count = that year − 1. | S27 |
| 5. PV | **PV = amount / (1 + r)ⁿ**, where n = the year. **Year 0 is not discounted.** Add two rows: PV of Total Benefits, PV of Total Costs. | S29–S30 |
| 6. NPV | **NPV = Σ PV of benefits − Σ PV of costs.** NPV > 0 → "economically acceptable"; NPV < 0 → "should not be accepted". | S31–S32 |
| 7. Conclude | One line. If ROI and BEP look fine but NPV < 0, quote S32: the "naïve" ROI and BEP vs the "more rigorous and financially correct" NPV. | S32 |

**Discount helper** (arithmetic from the S29 formula; the slides divide by (1 + r)ⁿ, which gives the same result as multiplying by 1 ÷ (1 + r)ⁿ):

| Rate | (1+r)¹ | (1+r)² | (1+r)³ | 1/(1+r)¹ | 1/(1+r)² | 1/(1+r)³ | Sum, Years 1–3 |
|---|---:|---:|---:|---:|---:|---:|---:|
| 5% | 1.05 | 1.1025 | 1.157625 | 0.9524 | 0.9070 | 0.8638 | 2.7232 |
| 6% | 1.06 | 1.1236 | 1.191016 | 0.9434 | 0.8900 | 0.8396 | 2.6730 |
| 8% | 1.08 | 1.1664 | 1.259712 | 0.9259 | 0.8573 | 0.7938 | 2.5771 |
| 10% | 1.1 | 1.21 | 1.331 | 0.9091 | 0.8264 | 0.7513 | 2.4869 |
| 12% | 1.12 | 1.2544 | 1.404928 | 0.8929 | 0.7972 | 0.7118 | 2.4018 |
| 15% | 1.15 | 1.3225 | 1.520875 | 0.8696 | 0.7561 | 0.6575 | 2.2832 |
| 20% | 1.2 | 1.44 | 1.728 | 0.8333 | 0.6944 | 0.5787 | 2.1065 |

**Fully worked model answer: Quiz 1 V2** [W4-S3] (all numbers script-verified)
- **Given:**
  - Development: office space and equipment 40,000 + vendor installation 50,000 + data conversion tools 20,000 = **110,000** (Year 0).
  - Operational: software upgrades 20,000 + operational team salaries 10,000 + user training 10,000 = **40,000 per year**.
  - Tangible benefits: increased sales 40,000 + reduction in staff 40,000 + better supplier prices 30,000 = **110,000 per year**.
  - Life 3 years; rate 10%.

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | – | 110,000 | 110,000 | 110,000 | 330,000 |
| Total Costs | 110,000 | 40,000 | 40,000 | 40,000 | 230,000 |
| Net Benefits | (110,000) | 70,000 | 70,000 | 70,000 | 100,000 |
| Cumulative Net Cash Flow | (110,000) | (40,000) | 30,000 | 100,000 | |
| ÷ (1.10)ⁿ | ÷ 1 | ÷ 1.1 | ÷ 1.21 | ÷ 1.331 | |
| PV of Total Benefits | – | 100,000.00 | 90,909.09 | 82,644.63 | **273,553.72** |
| PV of Total Costs | 110,000.00 | 36,363.64 | 33,057.85 | 30,052.59 | **209,474.08** |

- **ROI** = (330,000 − 230,000) / 230,000 = 100,000 / 230,000 = **43.48%**
- **BEP:** the cumulative turns positive in Year 2, after 1 negative year. BEP = 1 + (70,000 − 30,000) / 70,000 = 1 + 0.57 = **1.57 years**
- **NPV** = 273,553.72 − 209,474.08 = **$64,079.64 > 0 → economically acceptable**
- **Check:** −110,000 + 70,000 × 2.486852 = $64,079.64 ✓. This works only when the yearly net is constant; show the table method on the paper. Use the unrounded factor: with the table's rounded 2.4869 you get 64,083.

**Mistakes that cost marks:**
- discounting Year 0;
- counting Year 0 as a "year of negative cash flow" (the class example uses 2 for a Year-3 break-even [S27]);
- leaving Year 0 out of Total Costs in the ROI;
- putting "Hardware repairs", "User training" or "Software upgrades" in Year 0 (all are operational [S23]);
- copying the slide errors BEP 2.68 and Year-3 benefit 55,000 (see §9).

**Rounding:** the slides round each PV cell and add the rounded cells [S30], so your total may differ from the exact value by about $1. Either is fine if you show the method.

### 1(c) The review-MCQ style [W5a-S2, S3, S25; W6-S3] and the soft/hard exercise style [W1b-S7]
**What the MCQs look like:**
- 5 unlettered options.
- **Fill-in stems** lifted from one slide sentence, e.g. W4-S26's "trade-offs among … functionality … time … cost" becomes "making ___ of size, time and cost".
- **Named-person cases** that need a class rule (Micah: hurricane margins; Mya: the missed-date table).
- **EXCEPT/NOT stems.**

**Recipe:**
1. Find the slide sentence the stem paraphrases, and pick the option that finishes **that** sentence.
2. Distractors are usually real terms from the same or a nearby deck: "team conflict" and "adding people to a late project" are true problems, but neither is "the most common reason". Reject options that are true but don't answer the stem.
3. **Cases:** compute with the class rule.
   - Hurricane: cost ±100%, schedule ±25% [W4-S37].
   - % behind = weeks late ÷ planned weeks of the late part [W4-S41].
4. **NOT/EXCEPT:** look for the option that belongs to a **different deliverable or list** (cost/benefit analysis is feasibility, not the requirements definition) or that **reverses a "don't"** (the same bonus for everyone).
5. If two options both look right, choose the one closest to the slide's wording. If the exam allows comments, add one line of reasoning (see the ⚠️ items in §2).

**The soft/hard format** [W1b-S7]: label each statement as one of two contrasted concepts. The six statements come in **opposite pairs** (1↔5 profession-tied?, 2↔3 hard or easy to develop, 4↔6 revealed over time vs confirmed now). The same format fits any contrasted pair on the slides: plan-driven/agile, functional/nonfunctional, Product/Sprint Backlog, BPA/BPR, structured/unstructured interviews, upper/lower CASE.

**PRACTICE (S7 style): plan-driven or agile?** Answers in brackets.
1. "All of the process activities are planned in advance." (plan-driven [W1b-S16])
2. "Planning is incremental." (agile [S16])
3. "Used for high-level planning." (plan-driven [S5])
4. "Customer collaboration over contract negotiation." (agile [S41])
5. "Mostly used for large systems engineering projects developed at several sites." (plan-driven: waterfall [S23])
6. "Changing requirements are embraced regardless of when they occur." (agile [S42])

### 1(d) The "Small practice" style [W3-S40, S41]
- **Format:** "During Project Planning phase, next cash flows were identified:", then a **mixed list without headings**, then either:
  - (S40) "Find the year then [= when] cumulative net cash flow turns to positive", or
  - (S41) "Find: ROI, BEP and NPV, if project life cycle is 2 years and rate of return = 10 %".
- **Recipe:**
  1. Classify each item with S23 first:
     - "Hardware repairs" is an **operational** cost (recurring), not development;
     - "Reduction in staff" is a tangible benefit;
     - "Data conversion tools" is a development cost ("Data conversion costs").
  2. Build the cumulative row.
  3. Answer with a **year number** (S40) or the three measures (S41).
- **"Life cycle n years"** = Year 0 investment + Years 1…n of operation (the S25 layout). State this in one line.
- **Edge case:** if the cumulative is already positive in Year 1, the number of negative years is 0.
- The solved versions are in §2.2.

---

## 2. All of the professor's own questions in one place

### 2.1 ⭐ Quiz 1 [W4-S2–S5]: all four versions, with answers
**The same in every version:**
- Development: Office space and equipment $40 000; Vendor installation $50 000.
- Operational: Software upgrades $20 000; Operational team salaries $10 000.
- Tangible benefits: Reduction in staff $40 000; Better supplier prices $30 000.
- Life cycle: 3 years.

**What changes between versions:**

| | V1 [S2] | V2 [S3] | V3 [S4] | V4 [S5] |
|---|---|---|---|---|
| Part A: depict graphically | **Phased** | **Waterfall** | **Parallel** | **Phased** |
| Data conversion tools (dev.) | $10 000 | $20 000 | $30 000 | $40 000 |
| User training (oper.) | $20 000 | $10 000 | $10 000 | $10 000 |
| Increased sales (benefit) | $20 000 | $40 000 | $60 000 | $80 000 |
| Rate of return | 5% | 10% | 15% | 20% |

**Part A answers:** Phased → §1(a) ④ · Waterfall → ① · Parallel → ③.

**V1 (5%).** Development 100,000 · operational 50,000/yr · benefits 90,000/yr · net 40,000/yr.

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | – | 90,000 | 90,000 | 90,000 | 270,000 |
| Total Costs | 100,000 | 50,000 | 50,000 | 50,000 | 250,000 |
| Net Benefits | (100,000) | 40,000 | 40,000 | 40,000 | 20,000 |
| Cumulative | (100,000) | (60,000) | (20,000) | 20,000 | |
| PV Benefits (÷1.05ⁿ) | – | 85,714.29 | 81,632.65 | 77,745.38 | 245,092.32 |
| PV Costs | 100,000.00 | 47,619.05 | 45,351.47 | 43,191.88 | 236,162.40 |

- ROI = 20,000 / 250,000 = **8.00%**
- BEP = 2 + (40,000 − 20,000) / 40,000 = **2.50 years**
- NPV = **$8,929.92 → accept**
- This is the "tight" version: NPV = 0 at about 9.70%, so at 10% the same project would be rejected (the S32 lesson).

**V2 (10%).** Fully worked in §1(b): ROI **43.48%**, BEP **1.57 years**, NPV **$64,079.64 → accept**.

**V3 (15%).** Development 120,000 · operational 40,000/yr · benefits 130,000/yr · net 90,000/yr.

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | – | 130,000 | 130,000 | 130,000 | 390,000 |
| Total Costs | 120,000 | 40,000 | 40,000 | 40,000 | 240,000 |
| Net Benefits | (120,000) | 90,000 | 90,000 | 90,000 | 150,000 |
| Cumulative | (120,000) | (30,000) | 60,000 | 150,000 | |
| PV Benefits (÷1.15ⁿ) | – | 113,043.48 | 98,298.68 | 85,477.11 | 296,819.27 |
| PV Costs | 120,000.00 | 34,782.61 | 30,245.75 | 26,300.65 | 211,329.00 |

- ROI = 150,000 / 240,000 = **62.50%**
- BEP = 1 + (90,000 − 60,000) / 90,000 = **1.33 years**
- NPV = **$85,490.26 → accept** (the rounded cells give 85,489)

**V4 (20%).** Development 130,000 · operational 40,000/yr · benefits 150,000/yr · net 110,000/yr.

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | – | 150,000 | 150,000 | 150,000 | 450,000 |
| Total Costs | 130,000 | 40,000 | 40,000 | 40,000 | 250,000 |
| Net Benefits | (130,000) | 110,000 | 110,000 | 110,000 | 200,000 |
| Cumulative | (130,000) | (20,000) | 90,000 | 200,000 | |
| PV Benefits (÷1.2ⁿ) | – | 125,000.00 | 104,166.67 | 86,805.56 | 315,972.22 |
| PV Costs | 130,000.00 | 33,333.33 | 27,777.78 | 23,148.15 | 214,259.26 |

- ROI = 200,000 / 250,000 = **80.00%**
- BEP = 1 + (110,000 − 90,000) / 110,000 = **1.18 years**
- NPV = **$101,712.96 → accept** (the rounded cells give 101,714)

**Summary**

| Version | Draw | Dev (Y0) | Oper/yr | Benefits/yr | Net/yr | ROI | BEP | NPV |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| V1 (5%) | Phased | 100,000 | 50,000 | 90,000 | 40,000 | 8.00% | 2.50 yrs | $8,929.92 |
| V2 (10%) | Waterfall | 110,000 | 40,000 | 110,000 | 70,000 | 43.48% | 1.57 yrs | $64,079.64 |
| V3 (15%) | Parallel | 120,000 | 40,000 | 130,000 | 90,000 | 62.50% | 1.33 yrs | $85,490.26 |
| V4 (20%) | Phased | 130,000 | 40,000 | 150,000 | 110,000 | 80.00% | 1.18 yrs | $101,712.96 |

### 2.2 ⭐ W3 "Small practice" [W3-S40, S41]
**S40: "Find the year then [when] cumulative net cash flow turns to positive"**
- Items: Hardware repairs 30,000 · Increased sales 20,000 · Reduction in staff 40,000 · Development team salaries 50,000 · Office space and equipment 10,000 · Data conversion tools 10,000.
- Classify:
  - Development (Year 0) = 50,000 + 10,000 + 10,000 = **70,000**.
  - Operational per year = hardware repairs **30,000**.
  - Benefits per year = 20,000 + 40,000 = **60,000**.
  - So the net per year = **30,000**.

| | Year 0 | Year 1 | Year 2 | Year 3 |
|---|---:|---:|---:|---:|
| Net Benefits | (70,000) | 30,000 | 30,000 | 30,000 |
| Cumulative | (70,000) | (40,000) | (10,000) | **20,000** |

- **Answer: Year 3.** As a bonus, BEP = 2 + (30,000 − 20,000) / 30,000 = **2.33 years**.
- ⚠️ If you put hardware repairs in Year 0, you wrongly get "Year 2".
- Extension (not asked; verified): with a 3-year life at 10%, ROI = 12.50% and NPV = $4,605.56.

**S41: "Find: ROI, BEP and NPV, if project life cycle is 2 years and rate of return = 10 %"**
- Development (Year 0) = **70,000**. Operational = hardware repairs **20,000/yr**. Benefits = 40,000 + 40,000 = **80,000/yr**. Net = **60,000/yr**.

| | Year 0 | Year 1 | Year 2 | Total |
|---|---:|---:|---:|---:|
| Total Benefits | – | 80,000 | 80,000 | 160,000 |
| Total Costs | 70,000 | 20,000 | 20,000 | 110,000 |
| Net Benefits | (70,000) | 60,000 | 60,000 | 50,000 |
| Cumulative | (70,000) | (10,000) | 50,000 | |
| PV Benefits | – | 72,727.27 | 66,115.70 | 138,842.98 |
| PV Costs | 70,000.00 | 18,181.82 | 16,528.93 | 104,710.74 |

- ROI = 50,000 / 110,000 = **45.45%**
- BEP = 1 + (60,000 − 50,000) / 60,000 = **1.17 years**
- NPV = **$34,132.23 → accept**
- If you read "2 years" as Year 0 + Year 1 only, the answers change; state the S25 convention you used.

### 2.3 Other W3 in-class questions
- ⭐ **[W3-S5]** "Where do project ideas come from?" A project is identified when someone in the organization identifies a **business need** to build a system.
- **[W3-S5]** "Could you give me examples of such needs?"
  - **Opportunities:** a new marketing campaign; a new type of customer; better interactions with suppliers.
  - **"Pain":** a drop in market share; poor customer service levels; unacceptable product defect rates; increased competition.
  - **Also:** new business initiatives and strategies; a merger or acquisition that requires systems to be integrated.
- ⭐ **[W3-S32]** "The required rate of return would have to be something less than ???% before this project returns a positive NPV."
  - Slide answer: **6.65%**.
  - Script check: NPV = 0 at ≈ 6.66%, and NPV(6.65%) ≈ +$25, so the slide is right to within rounding.

### 2.4 ⭐ W1b-S7: "Determine which statements are true for describing soft skills, and which are true for hard skills"
| # | Statement (short) | Answer printed on the slide (blue) |
|---|---|---|
| 1 | Not related to a specific profession | **Soft** |
| 2 | Take a long time and are difficult to develop; need analysis of your own and others' behavior | **Soft** |
| 3 | Relatively easy to obtain through training | **Hard** |
| 4 | Mastery is revealed over time | **Soft** |
| 5 | Are tied to a specific profession | **Hard** |
| 6 | Can be confirmed here and now; certificate or diploma | **Hard** |

- Pattern: soft = 1, 2, 4; hard = 3, 5, 6. The pairs are 1↔5, 2↔3, 4↔6.
- ⚠️ "Analytical thinking" and "plan your time" are listed as **soft** skills [W1b-S6].

### 2.5 ⭐ W5a review MCQs (they test W4)
| Slide | Question (short) | Answer | Why |
|---|---|---|---|
| S2 | "The science (or art) of project management is in making ___ of size, time and cost." | **Trade-offs** | W4-S26: trade-offs among the functionality of the system, the time to complete the project, and its cost (W5a writes "size" for "functionality"). |
| S2 | "The most common reason for schedule and cost overruns is ___" | **Scope creep** | W4-S33 (bold). "Team conflict" and "adding people to a late project" are real problems but distractors. |
| S3 | **Micah:** a plan (planning phase) estimates $50,000 and 20 weeks. The range is… | **$0 to $100,000, and 15 to 25 weeks** | W4-S37: 100% margin on cost (50,000 ± 50,000) and 25% on schedule (20 ± 5). |
| S3 | **Mya:** the team lost days to a hurricane; at the 6-week mark of a 9-week project she is 1 week behind. BEST solution? | **"about 16% behind, increase the project to about 10-and-one-half weeks"** | W4-S41 low-risk action: add the % behind to the schedule. 1/6 ≈ 16.7%, and 9 × 1.167 ≈ 10.5 weeks. Both notes files agree. |
| S25 | "Suggestions for motivation might include all of these EXCEPT:" | **Giving all team members the same bonus on a project** | W5a-S24 don't: "Give everyone on the project a raise", because "high-quality people will believe that mediocrity is rewarded". |

The other Mya options fail like this:
- *add several people*: "Adding staff resources does not translate into increased productivity" [W5a-S14];
- *don't change the schedule and work longer days*: the **high-risk** row [W4-S40];
- *20% → 12 weeks*: the arithmetic fails (9 × 1.2 = 10.8);
- *+3 people and +1 week*: the extra people bring back the W5a-S14 problem.

⚠️ **The Mya case is arguably ambiguous**, for two reasons:
- The delay came from a **one-off hurricane**, which fits the **moderate-risk** row ("add the time you are behind" → 10 weeks). But the only +1-week option also adds three people.
- The % depends on the base. 1 week ÷ 6 elapsed weeks = 16.7% (option c). 1 week ÷ 5 planned weeks completed = 20% → 10.8 weeks, which isn't 12, so (d) still fails.

Answer **(c)**, and add one line of reasoning if you can.

### 2.6 ⭐ W6 review questions (they test W5b)
**W6-S2 (7 open questions):**

| # | Question | Short answer |
|---|---|---|
| 1 | Key deliverables of analysis? | Requirements definition + models (functional, structural, behavioral) + revised feasibility analysis + revised workplan → packaged as the **system proposal** [W5b-S2; W6-S35–S37], which goes to the **approval committee** [W5b-S3] |
| 2 | As-is vs to-be? | as-is = "the current state of systems and processes"; to-be = "a concept for a new system" [W5b-S18] |
| 3 | Purpose of the requirements definition? | "to convert high level business requirements (from the system request) into detailed requirements that can be used as inputs for creating models" [W5b-S11]. It lists the functional and nonfunctional requirements in outline format [W5b-S16] |
| 4 | Three steps of analysis; which is skipped or rushed, and why? | Understand the as-is → identify improvements → develop to-be requirements [W5b-S21]. The **as-is step** gets cut: BPA spends "a significant time" on it, BPI "much less", BPR "little time … goal is to focus on new ideas" [W5b-S22, S24, S29]. (The slides never say "skipped"; this is inferred.) |
| 5 | Five interview steps? | Select interviewees (interview schedule) → design questions → prepare → conduct (build rapport, take careful notes) → post-interview follow-up (report **within 48 hours**, sent to the interviewee to check) [W5b-S35–S44] |
| 6 | Closed / open / probing; when to use each? | **Closed**: needs a specific answer; for "specific, precise information". **Open**: leaves room for elaboration; for "rich information". **Probing**: follows up when the interviewer is unclear about an answer [W5b-S37–S38] |
| 7 | Unstructured vs structured interviews? | **Unstructured**: broad, roughly defined information; early in the project; the most challenging to conduct. **Structured**: specific questions prepared beforehand; later; more closed-ended questions [W5b-S39] |

**W6-S3 (2 MCQs):**
1. "Which is NOT a purpose of the requirements definition?" → **Create cost/benefit analysis.** Cost–benefit analysis is economic feasibility [W3-S22], a separate deliverable [W5b-S2] and section 5 of the proposal [W6-S35].
   - ⚠️ **Ambiguous:** "To give a very high-level explanation of the business requirements" is also arguably NOT a purpose. The high-level requirements come *from the system request*, and the definition turns them into *detailed* ones [W5b-S11].
   - If only one answer is allowed, pick cost/benefit analysis.
2. "An example of a functional requirement is ___" → **Access to the customer order system** (chosen by elimination). The other four are nonfunctional [W5b-S13–S14]:
   - English and Spanish = cultural and political;
   - a Blackberry device = operational;
   - IE / Firefox / Chrome = operational;
   - updated every 5 seconds = performance.
   - ⚠️ Mild trap: "access" can sound like security, but the security category is "**who** … under **what circumstances**", and this option names no users or conditions.

### 2.7 W5b-S15 classification exercise (the slide gives no key; answers use the S12/S14 categories)
| # | "The system should …" | Answer |
|---|---|---|
| 1 | be accessible to the Web users | NF, operational (S13: Web-browser access is nonfunctional) |
| 2 | include the company standard logo and color scheme | NF, cultural & political ⚠️ borderline (usability is also defensible) |
| 3 | restrict access to profitability information | NF, security |
| 4 | include actual and budgeted cost information | F, information-oriented |
| 5 | provide management reports | F, process-oriented |
| 6 | include sales information that is updated at least daily | NF, performance ⚠️ mixed ("include sales information" alone would be F, information) |
| 7 | have a 2-second / 10-minute maximum response time | NF, performance |
| 8 | include information from all company subsidiaries | F, information-oriented |
| 9 | print subsidiary reports in the subsidiary's primary language | NF, cultural & political |
| 10 | provide monthly rankings of salesperson performance | F, process-oriented ⚠️ "performance" here means the salespeople's, not the system's |

### 2.8 Other questions printed on slides (quick answers)
- ⭐ **[W1a-S4] "Why do we need a formal process?"**
  - "Failures occur (too) often";
  - "Creating systems is not intuitive";
  - projects are "late, over budget or delivered with fewer features than planned";
  - so "The System Analyst is the key person".
- **[W1b-S14]** The six "project characteristics" questions (clarity of user requirements, familiarity with technology, system complexity, system reliability, short time schedules, schedule visibility) are exactly the rows of the **"Which Methodology to Use?"** table [W1b-S46]; see §5.2.
- **[W2 slide-title questions]**
  - **"What is Agile 'Methodology'?"** "an iterative approach to software development" with 1–4-week iterations [S11].
  - **"What is a user requirement?"** `As a <User Role> I want <Functionality> so that <Business Value>` [S13].
  - **"What is the product backlog?"** a list of work driven from the **roadmap and requirements**; the team pulls work from it [S43].
  - **"What is KANBAN?"** a framework that visualizes work on a board [S48].
  - **"What is a kanban board?"** a tool to visualize work, limit WIP and maximize flow [S53].
  - **"What are WIP limits?"** the maximum work allowed in each workflow status [S56].
  - **"What Is DevOps?"** practices, tools and a cultural philosophy joining development and IT operations [S57].
- **[W5b-S3]** System proposal → Approval committee → "????". The slide leaves the decision open 🔎.

---

## 3. Week map
| Week / deck | Topic | Core ideas | ⭐ Emphasis slides |
|---|---|---|---|
| **W1a** (17) "Introduction" | Systems, SDLC, analyst roles | A system = interdependent components working to a plan toward a goal, with 3 constraints · SDLC = understand → design → build → deliver · 4 phases: Planning → Analysis → Design → Implementation · each phase's focus question and output (system request + feasibility + project plan → system proposal → system specification → installed system) · 5 analyst roles | S4 (formal process; "The System Analyst is the key person"), S7, S8, S9, S10–S17 |
| **W1b** (57) "Sys Development Methodologies" | Skills and methodologies | Hard vs soft skills (S7 exercise) · AI-augmented analyst and AI-aware design · methodology = "formalized approach to implementing the SDLC"; categorized by phase sequencing and time/effort · plan-driven vs agile ("no right or wrong") · 3 classes: Structured (waterfall, parallel), RAD (phased, prototyping), Agile (XP, Scrum) · the diagrams · the S46 "Which methodology?" table · Agile Manifesto, XP, Scrum, rolling wave | S4–S5, S7, S12–S13, S16–S17, S19–S44 (diagrams), S41, S46, S54, S56 |
| **W2** (63) "Agile" | Agile, Scrum, Kanban, DevOps | 4 values + 12 named principles · user stories (tasks of 2–12 h; acceptance tests) · Scrum = framework of roles + events + artifacts + rules · PO / Dev Team / SM duties; time-boxed events · Product vs Sprint Backlog; Definition of "Done" · Kanban: visualize, limit WIP, measure lead time · DevOps ∞ loop, 5 principles, 3 benefit types | S3, S16, S17, S27–S29, S31, S34, S38, S47–S50, S55, S57–S63 |
| **W3** (41) "Planing phase" (sic) | Project initiation | Business need (opportunity or "pain") · BPM, BPA/BPI/BPR · system request (5 elements) · feasibility: technical / economic / organizational → approval (steering) committee · cost–benefit: ROI, BEP, PV, NPV (NPV beats the "naïve" ROI and BEP) · champion and stakeholders | S5, S7, S12–S16, S21–S32, S36–S38, **S40–S41 (small practice)** |
| **W4** (47) "Project managment" (sic) + **Quiz 1** | Project management | **Quiz 1 (S2–S5)** · 7 ways to classify projects · WBS → Gantt chart + network diagram; PERT (o+4m+p)/6; CPM critical path = longest path · trade-offs of functionality, time and cost · scope creep, timeboxing (6 steps) · hurricane model (±100% cost, ±25% schedule) · missed-date actions (high / moderate / low risk) · risk management · JIRA | **S2–S5**, S8, S12–S13, S17–S25, S26, S30–S35, S37–S41, S42–S44 |
| **W5a** (33) "Staffing … environment & infrastructure" | Staffing, motivation, conflict, CASE, standards | **Review MCQs S2–S3** · staffing plan + project charter · jelled team (5 traits) · Ringelmann effect; teams under 8–10, use sub-teams · 10 steps · extrinsic/intrinsic motivation; money "the last thing"; the 6 don'ts · group cohesiveness; 6 conflict strategies · upper/lower/I-CASE, repository · 5 types of standards | **S2–S3, S25**, S4–S10, S14, S16–S17, S19, S21–S24, S26–S27, S29–S33 |
| **W5b** (45) "Requirements Determination" (file "6_1") | Requirements 1 | System proposal = requirements definition + models + feasibility + workplan · project vs product requirements · requirement = what the system must do or a characteristic it must have · functional (process / information) vs nonfunctional (operational / performance / security / cultural & political) · BPA/BPI/BPR with 8 techniques + the S33 table · interviews: 5 steps, 3 question types, structured/unstructured, top-down/bottom-up | S2, S9–S16, S18, S21–S24, S29, S33, S35, S37–S41, S44 |
| **W6** (37) "Requirements Determination 2" | Requirements 2 | **Review S2–S3** · JAD (10–20 users, facilitator, scribes, 5 steps, ground rules), e-JAD · questionnaires (sample, return rates, 9 guidelines, 4 steps) · document analysis (users' own forms = strongest sign of change) · observation and ethnography · S34 techniques table · validation (5 checks, 3 techniques, 4 review checks) · requirements management · 10-section system proposal | **S2–S3**, S4, S6–S7, S9, S11, S14–S16, S19, S21–S29, S34, S35–S37 |
| W7 (not uploaded) | UML use cases, activity diagrams (syllabus) | — 🔎 not in Track A yet | — |

---

## 4. Definitions you must know (alphabetical, one line each)
Text in "quotes" is the slide's own short wording; everything else is paraphrased.

**A**
- **Acceptance test**: how a user requirement is validated ("Requirements are validated using acceptance test") [W2-S14].
- **Activity-based costing** (BPI): examines the *cost* of each process step instead of its time, then focuses on the most costly steps [W5b-S27].
- **Activity elimination** (BPR): a "force-fit exercise". For every activity, ask how to eliminate it, how the function would work without it, and what the effects would be [W5b-S32].
- **Adaptability** (review check): "Can the requirement be changed without a large impact on other requirements?" [W6-S29].
- **Agile development**: "a group of programming-centric methodologies that focus on streamlining the SDLC". Every iteration is a complete project; cycles are 1–4 weeks [W1b-S40].
- **Agile Kanban**: the Agile iteration approach combined with Kanban's value-stream focus [W2-S52].
- **Agile Manifesto**: individuals and interactions over processes and tools · working software over comprehensive documentation · **customer collaboration** over contract negotiation · responding to change over following a plan [W1b-S41; W2-S3].
- **Agile methodology**: "an iterative approach to software development" with iterations of 1–4 weeks [W2-S11]. It is not a fixed set of ceremonies but a group of methodologies committed to tight feedback cycles [W2-S12].
- **Agile processes**: "planning is incremental and it is easier to change the process to reflect changing customer requirements" [W1b-S16].
- **AI-augmented analyst**: a human analyst "who uses AI tools as cognitive partners – not replaced by AI, but enhanced by it" [W1b-S9].
- **AI-aware design**: designing with the knowledge that "AI components have unique characteristics that affect object-oriented modeling" [W1b-S10].
- **Analysis phase**: the 2nd phase, "probably, the key phase": requirements gathering and elicitation, ending in a system proposal approved by the steering committee [W1b-S4]. Its focus question is "Who, what, where, and when for this system?" [W1a-S13].
- **Approval committee** (= steering committee): receives the system request and feasibility analysis and "decides whether the project should be undertaken" [W3-S16]. It later receives the system proposal [W5b-S3].
- **As-is system**: "the current state of systems and processes" [W5b-S18].
- **Automation** (DevOps principle): automate as much of the lifecycle as possible; a key element of a CI/CD pipeline 🔎 [W2-S61].
- **Average staff**: total person-months of effort ÷ the optimal schedule (40 ÷ 10 = 4) [W5a-S14].

**B**
- **BEP (break-even point)**, also called the payback method: "the number of years it takes a firm to recover its original investment in the project from net cash flows" [W3-S27].
- **Benchmarking**: studying how other organizations perform a process in order to improve your own. *Informal* benchmarking means visiting them as customers; it is common for customer-facing processes [W5b-S28].
- **BPA (business process automation)**: keeps the way the organization operates and "uses computer technology to do some of the work". It makes the organization more efficient with the "least impact on the business" [W5b-S22]. W3's version: replace or complement manual processes for cost efficiency [W3-S8].
- **BPI (business process improvement)**: "moderate changes … to take advantage of new opportunities offered by technology or to copy what competitors are doing" [W5b-S24]. W3's version: study and redesign processes and workflows, possibly with new technology [W3-S9].
- **BPM (business process management)**: a "methodology used by organizations to continuously improve end-to-end business processes". Its benefits are agility, alignment with best practices, and efficiency [W3-S6–S7].
- **BPR (business process reengineering)**: "changing the fundamental way the organization operates, obliterating the current way of doing business". It carries substantial risk, is fairly rare, and needs top management support [W3-S10; W5b-S29].
- **Bug** (JIRA): "A problem that impairs or prevents the functions of the product" [W4-S47].
- **Business analyst**: analyzes the key business aspects, identifies business value, and designs new business processes and policies [W1a-S3].
- **Business case**: a more detailed study that the approval committee may ask the systems analyst to prepare [W3-S17].
- **Business need**: "The business-related reason for initiating the system" [W3-S13].
- **Business requirements**: in W3, "the business capabilities that the system will provide" [W3-S14]. In W5b, analysis-phase requirements about the "what", written from the business person's view (sometimes called user requirements) [W5b-S9]. ⚠️ In the W5b-S10 diagram the term means only the top "why" level.
- **Business value**: "The benefits that the system will create for the organization", e.g. a 3% increase in sales [W3-S14].

**C**
- **CASE**: "a category of software that automates all or part of the development process" [W5a-S29]. It is also one of the RAD speed-up tools [W1b-S26].
- **CASE repository** (= information repository = data dictionary): "The central component of any CASE tool". It stores the diagrams and the screen and report designs, and tracks how the diagrams fit together [W5a-S31].
- **Cash flows**: inflows and outflows estimated over a future period, to judge whether the benefits justify the costs [W3-S24].
- **Champion**: "a high-level executive and is usually, but not always, the project sponsor". Gives time, money and political support. More than one champion is preferable [W3-S37].
- **Change management analyst**: owns the change management plan and the user training plan [W1a-S3].
- **Closed-ended question**: "require a specific answer"; like a multiple-choice or arithmetic exam question [W5b-S37].
- **Collaboration** (DevOps principle): "The key premise behind DevOps". Dev and ops merge into one "full stack" team [W2-S60].
- **Columns** (Kanban): one column per activity; together the columns form the workflow [W2-S55].
- **Commitment point**: "the moment when an idea is picked up by the team and work starts on the project" [W2-S55].
- **Completeness** (requirements check): "Are all functions required by the customer included?" [W6-S26].
- **Comprehensibility** (review check): "Is the requirement properly understood?" [W6-S29].
- **Consistency** (requirements check): "Are there any requirements conflicts?" [W6-S26].
- **Continuous improvement** (DevOps principle): experimentation, minimizing waste, and optimizing speed, cost and ease of delivery [W2-S61].
- **CPM (critical path method)**: "simply allows the identification of the critical path in the network". It can be used "with or without PERT" [W4-S25].
- **Create with the end in mind** (DevOps principle): solve real problems; don't "build in a bubble" [W2-S62].
- **Critical path**: "the longest path from the project inception to completion". If any task on it is late, the whole project is late. Critical tasks get a special (double) border [W4-S25].
- **Cross-functional team**: has "all competencies needed to accomplish the work without depending on others not part of the team" [W2-S17].
- **Cultural & political requirement**: "Cultural, political factors and legal requirements that affect the system" [W5b-S14].
- **Cumulative net cash flow**: the running total of the yearly net benefits. The year it turns positive is the break-even year [W3-S25, S27].
- **Customer-centric action** (DevOps principle): short feedback loops, real-time live monitoring, rapid deployment [W2-S62].

**D**
- **Daily Scrum**: "a 15-minute time-boxed stand-up event for the Development Team". Held every day at the same time and place, it plans the next 24 hours [W2-S34].
- **Definition of "Done"**: a shared understanding of when a Product Backlog item or Increment is complete. It may vary per team and ensures transparency [W2-S46].
- **Delivery point**: "the end of a kanban team's workflow", usually when the product is in the customer's hands [W2-S55].
- **Design phase**: business requirements become system requirements, and the architecture (including subsystems) is prepared [W1b-S4]. Focus question: "How will this system work?" Output: the system specification [W1a-S15].
- **Development vs operational costs**: one-time build costs vs recurring running costs. The full lists are in §5.5 [W3-S23].
- **Development Team**: the "professionals who do the work of delivering a potentially releasable Increment of "Done" product at the end of each Sprint". Self-organizing, cross-functional, typically 5–9 people [W2-S19–S22].
- **DevOps**: "a set of practices, tools, and a cultural philosophy that automate and integrate the processes between software development and IT teams" [W2-S57].
- **Discounted cash flows**: compare the present value of all inflows and outflows "in today's dollar terms" [W3-S28].
- **Document analysis**: used "to understand the as-is system" through reports, memos, manuals, org charts, forms and the existing user interface [W6-S19].
- **Duration analysis** (BPI): time each step of the as-is process, add the times up, and compare the total with the overall process time [W5b-S25].

**E**
- **e-JAD (electronic JAD)**: JAD with groupware. Input is anonymous and simultaneous, and sessions take 50–80% less time [W6-S7].
- **Economic feasibility** (= cost–benefit analysis): "Should we build the system?" Identify costs and benefits, assign values, calculate cash flows, and measure financial worthiness [W3-S22].
- **Effectiveness / efficiency**: "doing the right things" / "doing things right" [W5b-S24].
- **Environment workflow**: chooses the tools and identifies the standards [W5a-S28].
- **Epic** (JIRA): "A big user story that needs to be broken down" [W4-S47].
- **Estimation**: "the process of assigning projected values for time and effort" [W4-S26].
- **Ethnography**: paired with observation. Good for existing processes, but it "cannot identify new features" [W6-S23]. No standalone definition 🔎.
- **Executive summary** (proposal section 2): all the essential information, so that "a busy executive can read it quickly" [W6-S35].
- **Extreme Programming (XP)**: "Perhaps the best-known and most widely used agile method". Builds several times a day, an increment every 2 weeks, all tests on every build [W1b-S54].
- **Extrinsic motivation**: external factors such as pay raises, time off, bonus checks, or the threat of job loss [W5a-S19].

**F**
- **Facilitator** (JAD): "sets the meeting agenda and guides the discussion but does not join in the discussion as a participant"; stays neutral [W6-S6].
- **Factual vs opinion question**: a factual question seeks "more precise values"; an opinion question asks how far the respondent agrees [W6-S15].
- **Feasibility analysis**: "guides the organization in determining whether to proceed with the project", and identifies the important risks [W3-S17].
- **Focused ethnography**: "Combines ethnography with prototyping"; it came from an air traffic control project [W6-S24].
- **Functional lead**: "usually assigned to manage a group of analysts" [W5a-S17].
- **Functional requirement**: "relates directly to a process a system has to perform or information it needs to contain". Subtypes: process-oriented and information-oriented [W5b-S12].

**G**
- **Gantt chart**: "a horizontal bar chart that shows the same task information as the project WBS but in a graphical way" [W4-S18].
- **Ground rules** (JAD): follow the schedule, respect others' opinions, accept disagreement, one person talks at a time [W6-S11].
- **Group cohesiveness**: "the attraction that members feel to the group and to other members". It contributes more to productivity than individual capabilities do [W5a-S26].

**H**
- **Hard skills**: "professional skills that can be measured, assessed and verified", e.g. with a certificate or portfolio [W1b-S6].
- **High- vs low-level planning**: "Plan-Driven methodology used for high-level planning and Agile methodologies for low-level planning" [W1b-S5].
- **Hurricane model**: estimates start broad and narrow over Inception → Elaboration → Construction → Transition. A well-done plan at the end of inception still has a **100% cost** and **25% schedule** margin of error [W4-S37–S38].

**I**
- **I-CASE (integrated CASE)**: upper + lower CASE functions, used across the whole process [W5a-S29].
- **Implementation phase**: source code, testing, and deployment or delivery [W1b-S4]. Steps: construct, install, support. Output: the installed system [W1a-S16–S17].
- **Increment**: never defined on its own; "a "Done", useable, and potentially releasable product Increment" [W2-S29]. It is not in the S39 artifact list 🔎.
- **Infrastructure analyst**: ensures the infrastructure standards and identifies infrastructure changes [W1a-S3].
- **Infrastructure management workflow**: chooses "the appropriate level and type of documentation" [W5a-S28].
- **Interview**: "the most commonly used requirements-gathering technique", usually one-on-one [W5b-S35].
- **Interview report**: the interview notes, summarized in a useful format. Write it **within 48 hours** and often send it to the interviewee to check [W5b-S44].
- **Interview schedule**: lists "all the people who will be interviewed, when, and for what purpose" [W5b-S36].
- **Intrinsic motivation**: an internal desire to overcome a challenge, produce high-quality work, or work with people you like and trust [W5a-S19].
- **Iterative / incremental / iterative-incremental**: refine the whole thing / add finished pieces / both (the Mona Lisa picture) [W1b-S29–S30].

**J**
- **JAD (joint application development, or "design" on W6-S34)**: lets "the project team, users, and management … work together to identify requirements". Developed by IBM in the late 1970s; "often the most useful method" [W6-S4]. 10–20 users, a facilitator and 1–2 scribes [W6-S6].
- **Jelled team**: "so strongly knit that the whole is greater than the sum of the parts" (DeMarco & Lister) [W5a-S5].

**K**
- **Kanban**: Japanese for "visual board" or "sign"; used by Toyota since the 1950s for just-in-time manufacturing; the "Kanban Method" dates from 2007 [W2-S49]. "A popular framework used to implement agile and DevOps software development" [W2-S48].
- **Kanban board**: a tool "to help visualize work, limit work-in-progress, and maximize efficiency (or flow)" [W2-S53].

**L**
- **Lead Time**: the time from the commitment point to the delivery point [W2-S55]. "Also known as cycle time … the average time to complete one item" [W2-S50].
- **Lower CASE**: supports the design workflow and can generate code for database tables and system functionality [W5a-S29].

**M**
- **Methodology**: "a formalized approach to implementing the SDLC (i.e., it is a list of steps and deliverables)" [W1b-S12].
- **Milestone** (Gantt chart): drawn as an upside-down triangle or a diamond [W4-S21].
- **MLOps**: "DevOps adapted for ML models – version data, models, code together" [W1b-S45].
- **Motivation**: "the number one influence on people's performance" [W5a-S19].

**N**
- **Net benefits**: Total Benefits − Total Costs, per year and in total [W3-S25].
- **Network diagram**: "a node-and-arc type of graph that shows time estimates in the nodes and task dependencies on the arcs". A diagonal line means partially complete; crossed lines mean complete [W4-S24].
- **Nonfunctional requirement**: "behavioral properties that the system must have, such as performance and usability". Subtypes: operational, performance, security, cultural & political. Used mainly in design [W5b-S13–S14].
- **"Now That" awards**: small (≈ $50) peer-to-peer awards of appreciation [W5a-S22].
- **NPV (net present value)**: total PV of benefits − total PV of costs. NPV > 0 means the project is economically acceptable [W3-S31–S32].

**O**
- **Observation**: "the act of watching processes being performed". It shows reality and checks the validity of interview and questionnaire data [W6-S22].
- **Open-ended question**: "leave room for elaboration"; like an essay question; gathers rich information [W5b-S38].
- **Operational requirement**: "The physical and technical environments in which the system will operate" [W5b-S14].
- **Organizational feasibility**: how well the system "will be accepted by its users and incorporated into the ongoing operations". "If we build it, will they come?" It "can be the most difficult" dimension [W3-S35].
- **Outcome analysis** (BPR): understanding "the fundamental outcomes that provide value to customers" [W5b-S30].

**P**
- **Pair programming**: "two developers working together on a single PC" [W5a-S12].
- **Parallel development**: one general design, then distinct subprojects designed and implemented in parallel, then integrated [W1b-S24].
- **Performance requirement**: "The speed, capacity, and reliability of the system" [W5b-S14].
- **PERT**: "a network analysis technique that can be used when the individual task time estimates are fairly uncertain". Weighted average = (o + 4m + p) / 6 [W4-S22].
- **Phased development**: "breaks an overall system into a series of versions that are developed sequentially" [W1b-S27].
- **Plan-driven processes**: "all of the process activities are planned in advance and progress is measured against this plan" [W1b-S16].
- **Planning phase**: identify key business needs and choose the methodology; only a high-level plan at first [W1b-S4]. It has two parts: project initiation and project management [W1a-S10].
- **Post production**: the 5th phase, maintenance; "probably the longest phase in SDLC" [W1b-S4].
- **Post-session report** (JAD): like the interview report, but takes **a week or two** [W6-S12].
- **Present value (PV)**: PV = Cash flow amount / (1 + rate of return)ⁿ [W3-S29].
- **Probing question**: "follow up on what has just been discussed in order to learn more" [W5b-S38].
- **Problem analysis** (BPA): users and managers name the problems with the as-is system and how to solve them in the to-be system; "probably the most commonly used" analysis technique [W5b-S23].
- **Process standardization**: less process diversity, leading to better communication, less training time and cheaper automated support [W1b-S15].
- **Product Backlog**: "A list of all desired work on the project", prioritized by the PO and driven by the roadmap and requirements. The team *pulls* work from it [W2-S40, S43].
- **Product Owner**: "responsible for maximizing the value of the product resulting from work of the Development Team". The only one who can cancel a Sprint [W2-S18, S30].
- **Product requirements / PRD**: the features, functionality and characteristics of the final product, set by the PO or product management [W5b-S4]. On the slides, PRD = the requirements definition report [W5b-S6].
- **Project charter**: "describes the project's objectives and rules" [W5a-S4] and "lists the project's norms and ground rules" [W5a-S26].
- **Project management**: "the process of planning and controlling the project within a specified time frame, at minimum cost, with the desired outcomes" [W4-S7].
- **Project manager**: manages the team, the plan and the resources; "primary point of contact" [W1a-S3]; oversees overall progress [W5a-S17].
- **Project requirements**: the objectives, constraints and conditions for the *project* to succeed, set by the stakeholders: scope, timeline, budget, resources [W5b-S4–S5].
- **Project sponsor**: "The person who initiates the project and who serves as the primary point of contact for the project on the business side" [W3-S13].
- **Prototype**: "an initial version of a system used to demonstrate concepts and try out design options" [W1b-S35].
- **Prototyping-based methodology**: analysis, design and implementation run "concurrently … repeatedly in a cycle until the system is completed" [W1b-S33].
- **Prototyping** (validation technique): "Using an executable model of the system to check requirements" [W6-S27].

**Q**
- **Questionnaire**: "a set of written questions used to obtain information from individuals" [W6-S13].

**R**
- **RAD (rapid application development)**: emerged in the 1990s. It adjusts the SDLC phases "to get some part of the system developed quickly and into the hands of the users" [W1b-S26].
- **Realism** (requirements check): "Can the requirements be implemented given available budget and technology" [W6-S26].
- **Requirement**: "A statement of what the system must do or a characteristic it must have" [W5b-S11].
- **Requirements definition (report)**: "a straightforward text report that simply lists the functional and nonfunctional requirements in an outline format" [W5b-S16].
- **Requirements management**: "managing changing requirements during the requirements engineering process and system development" [W6-S30].
- **Requirements reviews**: "Systematic manual analysis of the requirements" [W6-S27].
- **Requirements validation**: "demonstrating that the requirements define the system that the customer really wants" [W6-S25].
- **Ringelmann effect**: "the tendency for individual members of a group to become increasingly less productive as the size of their group increases" [W5a-S6].
- **Risk management**: "the process of assessing and addressing the risks that are associated with developing a project" [W4-S42].
- **ROI (return on investment)**: the "average rate of return earned on the money invested in the project" = (TB − TC) / TC [W3-S26].
- **Rolling wave planning**: project-level (high), stage-level (mid) and weekly/monthly plans; "Planning is Throughout the Project - Not a Stage" [W1b-S57].
- **Root cause analysis** (BPA): checks whether a proposed solution fixes the root cause or only a symptom, because "All solutions make assumptions about the nature of the problem" [W5b-S23].
- **Round-trip engineering**: only named, as a technique some CASE tools support 🔎 [W5a-S30].

**S**
- **Sample**: a "subset, of people who are representative of an entire group" [W6-S14].
- **Scope creep**: "happens when new requirements are added to the project after the original project scope was defined and frozen". The most common reason for overruns [W4-S33].
- **Scribe** (JAD): one or two of them record notes and make copies, often using CASE tools [W6-S6].
- **Scrum**: "A framework within which people can address complex adaptive problems…". "Not a process, technique, or definitive method". It consists of roles, events, artifacts and rules [W2-S16]. The name comes from rugby [W1b-S56].
- **Scrum Master**: "responsible for promoting and supporting Scrum as defined in the Scrum Guide"; "a servant-leader" 🔎 [W2-S23].
- **Security requirement**: "Who has authorized access to the system under what circumstances" [W5b-S14].
- **Self-organizing team**: chooses "how best to accomplish their work, rather than being directed by others outside the team" [W2-S17].
- **Skill / soft skills**: a skill is "the ability to do something well". Soft skills are "socio-psychological or personal skills that do not depend on the profession" [W1b-S6].
- **Special issues or constraints**: issues relevant to implementation "that need to be known by the approval committee" [W3-S15].
- **Sprint**: "a time-box of one month or less during which a "Done", useable, and potentially releasable product Increment is created" [W2-S29]. ⚠️ W1b-S56 says "thirty working days".
- **Sprint Backlog**: "the set of Product Backlog items selected for the Sprint, plus a plan"; the Dev Team's forecast [W2-S42].
- **Sprint Goal**: "an objective set for the Sprint that can be met through the implementation of Product Backlog". Created in Sprint Planning [W2-S32].
- **Sprint Planning**: plans the Sprint's work and answers What and How. **Max 8 h** for a one-month Sprint [W2-S31].
- **Sprint Retrospective**: the Scrum Team inspects itself and plans improvements. **Max 3 h** for a one-month Sprint; held after the Review [W2-S38].
- **Sprint Review**: the Scrum Team plus stakeholders invited by the PO; a demo of the "Done" work that feeds the next planning. No time-box on the slides 🔎 [W2-S36–S37].
- **Staffing plan**: the number and kinds of people, their roles, and the reporting structure [W5a-S4, S17].
- **Stakeholder**: "a person, group, or organization that can affect (or can be affected by) a new system" [W3-S36].
- **Standards**: shared rules, so that project knowledge doesn't leave with people who are reassigned. There are 5 types [W5a-S32–S33].
- **Strategic alignment**: "the fit between the project and business strategy". The more alignment, the less risk [W3-S36].
- **Structured design**: the first category of methodologies, dominant in the 1980s; a "formal step-by-step approach to the SDLC" [W1b-S18].
- **Structured / unstructured interview**: specific questions prepared in advance, used later / broad, roughly defined information, used early and "the most challenging" [W5b-S39].
- **Sub-Task / Story / Task** (JIRA): part of an issue / "A user story" / "A task that needs to be done to achieve team's goal" [W4-S47].
- **System**: "an orderly grouping of interdependent components linked together according to a plan to achieve a specific goal" [W1a-S7].
- **System proposal**: requirements definition + models + feasibility analysis + workplan [W5b-S2]; a 10-section template [W6-S35–S37].
- **System request**: "a document that describes the business reasons for building a system and the value that the system is expected to provide" [W3-S12].
- **System requirements**: design-phase requirements about the "how", written from the developer's perspective [W5b-S9].
- **System users**: make decisions, do hands-on work, and "ultimately determine whether the project is successful by using or not using the system" [W3-S38].
- **Systems analyst**: "the key person" [W1a-S4]. Uses technology to improve business processes, designs the information system and ensures IS standards [W1a-S3].
- **SDLC (systems development life cycle)**: "the process of understanding how an information system (IS) can support business needs by designing a system, building it, and delivering it to users" [W1a-S8].

**T**
- **Task**: "a unit of work that will be performed by a member or members of the development team" [W4-S13]. In agile, a task is the **how** (estimated at 2–12 h); the user requirement is the **what** [W2-S14].
- **Technical feasibility**: "the extent to which the system can be successfully designed, developed, and installed by the IT group". A technical risk analysis: "Can we build it?" [W3-S21].
- **Technical lead**: "oversees the progress of a group of programmers and more technical staff members" [W5a-S17].
- **Technology analysis** (BPR): list the important technologies, then systematically find how each one could be applied and how the business would benefit [W5b-S31].
- **Test-case generation**: "Developing tests for requirements to check testability" [W6-S27].
- **Test First Design** (= Test Driven Development): write the tests before the code [W5a-S13].
- **Throwaway prototyping**: like prototyping, but the prototypes are built "at a different point in the SDLC" and then discarded [W1b-S38].
- **Time value of money**: ignored by ROI and BEP. "A dollar received in the future is worth less than a dollar received today" [W3-S28].
- **Timeboxing**: "another approach to scope management"; the deadline is placed above functionality [W4-S34].
- **To-be system**: "a concept for a new system" [W5b-S18].
- **Top-down / bottom-up interview**: broad → specific / specific → broad. In practice the two are mixed [W5b-S40].
- **Traceability** (review check): "Is the origin of the requirement clearly stated?" [W6-S29].
- **Twenty percent rule**: 20% of an employee's time goes to an idea they believe in (this is how Gmail and Google News started); start with 10% [W5a-S21].

**U**
- **Upper CASE**: supports the analysis workflow with integrated diagrams and stored information about system components [W5a-S29].
- **User requirement** (agile): `As a <User Role> I want <Functionality> so that <Business Value>`, roughly estimated in relative points at release planning [W2-S13]. ⚠️ W5b uses "user requirements" as another name for business requirements [W5b-S9].

**V**
- **V-model**: go down the left slope (requirements, design), write the code at the base, test up the right slope [W1b-S22].
- **Validity** (requirements check): "Does the system provide the functions which best support the customer's needs?" [W6-S26].
- **Verifiability**: "Can the requirements be checked?" in the requirements checks [W6-S26]; "Is the requirement realistically testable?" in the review checks [W6-S29].
- **Visual signals** (Kanban): the cards (stickies, tickets), usually one work item per card [W2-S55].

**W**
- **Waterfall model**: named for "the cascade from one phase to another"; an example of a plan-driven process [W1b-S21]. The first published model, Royce 1970 [W1b-S19].
- **WBS (work breakdown structure)**: "A list of tasks hierarchically numbered". At a minimum it holds each task's duration, status and dependencies [W4-S17].
- **WIP limit**: "the maximum number of cards that can be in one column at any given time" [W2-S55]. It exposes bottlenecks [W2-S56].
- **Workplan**: "a dynamic schedule that records and keeps track of all the tasks that need to be accomplished over the course of the project" [W4-S28].

---

## 5. Lists & tables to memorize (exactly as taught)

### 5.1 SDLC phases and deliverables [W1a-S8–S17; W1b-S4]
**A system's 3 constraints** [W1a-S7]:
1. structure and behavior;
2. interconnectivity and interdependence;
3. the organization's objectives come before its subsystems' objectives.

| Phase | Focus question | Steps | Primary output | Techniques named in the W1a table |
|---|---|---|---|---|
| **Planning** | "Why build this system? How to structure the project?" | Project initiation (system request; technical, economic and organizational feasibility) · Project management (work plan, staff, monitor & control) | **System request + feasibility study; project plan** (work plan, staffing plan, standards list, risk assessment) | project identification; feasibility; time estimation, task identification, WBS, PERT, Gantt, scope management; staffing, project charter; CASE repository, standards, documentation, timeboxing, risk management |
| **Analysis** | "Who, what, where, and when for this system?" | Analysis strategy (model the current system, formulate the new one) · gather requirements · system proposal | **System proposal** (requirements definition, use cases, process models, data model) | BPA, BPI, BPR; interview, JAD session, questionnaire, document analysis, observation; use case analysis; data flow diagramming; ER modeling, normalization 🔎 |
| **Design** | "How will this system work?" | Design strategy · architecture and interfaces · databases and files · program design | **System specification** (with an alternative matrix, architecture report, interface design, program design, database & file specification) | design strategy; architecture design; hardware & software selection; interface structure, standards, prototype and evaluation; DFDs, program structure charts; ER modeling, denormalization, performance tuning |
| **Implementation** | "delivery and support of completed system" | Construct (build + test) · install (train users) · support (maintenance) | **Installed system** (with test plan, conversion, training and support plans) | programming, software and performance testing; conversion strategy selection, training; support selection, system maintenance; post-implementation audit |
| *(Post production)* [W1b-S4 only] | — | maintenance, continuous user training, improvements | — | "probably the longest phase in SDLC" |

**Five project roles** [W1a-S3]:
- **Business analyst:** business value; new processes **and policies**.
- **Systems analyst:** technology to improve processes; **designs the information system**; IS standards.
- **Infrastructure analyst:** infrastructure standards and changes.
- **Change management analyst:** change management plan + **user training plan**.
- **Project manager:** manages the team, the plan and resources; "primary point of contact".

### 5.2 Methodologies [W1b-S12–S46]
- **Categorizing factor** (bold, underlined): "the sequencing of the SDLC phases and the amount of time and effort devoted to each" [S13].
- **Three classes** [S17]:
  - **Structured** (dominant in the 1980s; "formal step-by-step"): Waterfall, Parallel.
  - **RAD** (emerged in the 1990s): Phased, Prototyping; throwaway prototyping follows right after on the slides.
  - **Agile**: XP, Scrum.
- **RAD speed-up tools** [S26]:
  1. CASE tools;
  2. JAD sessions;
  3. fourth-generation / visual programming languages (e.g. Visual Basic);
  4. code generators.
- **6 project characteristics** [S14] = the rows of the decision table: clarity of user requirements · familiarity with technology · system complexity · system reliability · short time schedules · schedule visibility.

**⭐ "Which Methodology to Use?" [W1b-S46]** (Excellent in bold)
| Usefulness for | Waterfall | Parallel | Phased | Prototyping | Throwaway Prototyping | Extreme Programming |
|---|---|---|---|---|---|---|
| Unclear user requirements | Poor | Poor | Good | **Excellent** | **Excellent** | **Excellent** |
| Unfamiliar technology | Poor | Poor | Good | Poor | **Excellent** | Poor |
| Complex systems | Good | Good | Good | Poor | **Excellent** | Poor |
| Reliable systems | Good | Good | Good | Poor | **Excellent** | Good |
| Short time schedule | Poor | Good | **Excellent** | **Excellent** | Good | **Excellent** |
| Schedule visibility | Poor | Poor | **Excellent** | **Excellent** | Good | Good |
- **How to use it** (a study method, not on the slide):
  1. Mark the rows the scenario mentions.
  2. Drop every methodology rated Poor on any marked row.
  3. Pick the one with the most Excellents.
- **Patterns:**
  - Phased and Throwaway are never Poor.
  - Prototyping is Poor exactly where Throwaway is strongest (unfamiliar technology, complex, reliable).
  - Only Throwaway is Excellent for unfamiliar technology.
  - The V-model and Scrum are **not rated**.

**Plan-driven vs agile** [W1b-S5, S16, S21, S23, S41–S42, S57]:
| | Plan-driven | Agile |
|---|---|---|
| Definition | all activities "planned in advance and progress is measured against this plan" | "planning is incremental"; easier to change the process |
| Level of planning | high-level planning | low-level planning |
| Class example | Waterfall ("an example of a plan-driven process") | XP, Scrum |
| Changing requirements | "difficult to respond" (waterfall) | "embraced regardless of when they occur" |
| Bold line | ⭐ "There are no right or wrong software processes"; most real processes mix both. Rolling wave: "Planning is Throughout the Project - Not a Stage" | |

**Agile numbers to keep apart:**
| What | Number | Ref |
|---|---|---|
| Agile cycles | 1–4 weeks | W1b-S40; W2-S11 |
| Agile iteration | 10–15 days ("Fixed Time (e.g. 2 weeks)") | W2-S12 |
| XP builds / XP increments | several times per day / every 2 weeks | W1b-S54 |
| Scrum sprint | ⚠️ "thirty working days" in W1b-S56, but "one month or less" in W2-S29 and "1-4 Week Sprint" in W2-S28 | §9 |
| Single-phase (traditional) development | 6–18 months | W2-S11 |

**AI side topics:**
- **The AI-augmented analyst's 6 skills** [W1b-S8]: prompt engineering · AI output validation · data literacy · ethical AI awareness · AI-tool orchestration · model evaluation.
- **Human vs AI split** [S9]: the human judges, interprets and decides; the AI drafts, estimates and flags.
- **5 AI-aware OO patterns** [S11]: Model Wrapper · Human-in-the-Loop · Model Version Manager · Feature Store · Drift Detector.
- **AI-enhanced methodologies** [S45]: AI-Augmented Agile · MLOps · LLM-Driven Development · Automated Methodology Selection.

### 5.3 Agile Manifesto and the 12 principles [W1b-S41–S43; W2-S3–S5]
- **4 values** (the left side is valued more, "while there is value in the items on the right"):
  - individuals and interactions > processes and tools;
  - working software > comprehensive documentation;
  - ⭐ **customer collaboration** (red on W1b-S41) > contract negotiation;
  - responding to change > following a plan.
- **17 original signers**, including Sutherland and Schwaber, the creators of Scrum [W2-S2, S8].

| # | Name on W2-S4/S5 | Key phrase (W2) | Same principle in W1b-S42/S43 wording |
|---|---|---|---|
| 1 | Customer Satisfaction | early and continuous delivery of valuable software | delivered early and continuously, satisfying the customer |
| 2 | Welcome Change | welcome changes "even in the late development phase" | changing requirements embraced whenever they occur |
| 3 | Deliver the Working Software | frequently, "a few weeks to a few months", preferring the shortest | working software delivered frequently |
| 4 | Collaboration | business people and developers work together for the whole project | customers and developers solve the business problem together |
| 5 | Motivation | build projects around motivated people; support and trust them | give motivated individuals tools and environment, and trust them |
| 6 | Face-to-face Conversation | the most efficient and effective way of conveying information | face-to-face is the most efficient way of gathering requirements |
| 7 | Measure the Progress as per the Working Software | working software is "the key and primary measure of the progress" | the primary measure of progress is working, executing software |
| 8 | Maintain Constant Pace | sustainable development | a sustainable pace, kept "indefinitely without any worker burnout" |
| 9 | Monitoring | attention to technical excellence and good design | agility through technical excellence and good design |
| 10 | Simplicity | keep things simple (⚠️ the slide wording is unclear) | "the avoidance of unnecessary work" |
| 11 | Self-organized Teams | the best architectures, requirements and designs come from them | the same |
| 12 | Review the Work Regularly | reflect at regular intervals and adjust | teams regularly reflect on how to improve |

### 5.4 Scrum: roles, events, artifacts [W2-S16–S46]
**Scrum = Scrum Team members and their associated roles + events + artifacts + rules.** It is a *framework*, "not a process, technique, or definitive method" [S16].

| Role | Key duties | "Only / never" facts |
|---|---|---|
| **Product Owner** [S18] | maximizes the product's value; defines features; scope vs schedule decisions; financial goals; **prioritizes the Product Backlog**; accepts or rejects results; invites stakeholders to the Review | **Only the PO can cancel a Sprint** [S30]; doesn't push work onto the team [S43] |
| **Development Team** [S19–S22] | creates the Increment; self-organizing; cross-functional; plans the next 24 h at the Daily Scrum | **only** Dev Team members create the Increment; **no titles, no sub-teams**; nobody (not even the SM) tells them *how*; **typically 5–9** (more than 9 = too much coordination); full-time; membership changes only between sprints; PO and SM not counted unless doing Sprint Backlog work |
| **Scrum Master** [S23–S26] | promotes Scrum as in the Scrum Guide; **servant-leader**; serves the PO (7 ways), the Dev Team (5, including **removing impediments**) and the organization (5); ensures events happen; checks artifact transparency [S45] | can only *influence* the PO to cancel a Sprint |

| Event | Purpose | Time-box on the slides | Who |
|---|---|---|---|
| **Sprint** [S27–S29] | "the heart of Scrum"; a container for the other events; produces a "Done", usable Increment | **one month or less** ("1-4 Week Sprint" in the S28 picture); length fixed once started; the next one starts immediately | — |
| **Sprint Planning** [S31–S33] | What can be delivered? How will it be done? → **Sprint Goal** + Sprint Backlog | **max 8 h** for a one-month Sprint | the whole Scrum Team |
| **Daily Scrum** [S34–S35] | plan the next 24 h; inspect progress toward the Sprint Goal | **15 min**, every day, same time and place | Dev Team (it sets the structure, e.g. "Did? Doing? Dam?") |
| **Sprint Review** [S36–S37] | PO explains what is "Done"; team demos; review backlog, market, timeline, budget → input to the next planning | **not given** 🔎 | Scrum Team + key stakeholders invited by the PO |
| **Sprint Retrospective** [S38] | the team inspects itself (people, relationships, process, tools) and plans improvements | **max 3 h** for a one-month Sprint; after the Review, before the next Planning | Scrum Team |

| Artifact | What it is | Rules |
|---|---|---|
| **Product Backlog** [S40–S43] | "A list of all desired work on the project"; driven by the 2 Rs, **roadmap and requirements** (roadmap → epics → stories) | prioritized by the PO, reprioritized each sprint; the team **pulls** work. Prioritization factors: customer priority, importance of feedback, relative difficulty, symbiotic relationships between items |
| **Sprint Backlog** [S42, S44] | the selected PB items + a plan; "a forecast by the Development Team" | individuals sign up and work is **never assigned**; remaining work is updated daily; any member can change it |
| (Increment) | not in the S39 list of two artifacts 🔎 | the Definition of "Done" must be shared by everyone [S46] |

- **During a Sprint** [S28–S29]:
  - no changes that endanger the Sprint Goal;
  - quality goals do not decrease;
  - scope may be clarified or re-negotiated between the PO and the Dev Team;
  - "Sprint end date and team deliverable do not change".
- **Cancelling a Sprint** [S30]:
  - only the PO can cancel it, when the Sprint Goal becomes obsolete;
  - "Done" items are reviewed; incomplete items are re-estimated and go back to the PB;
  - cancellation is "very uncommon" and "often traumatic".
- **User requirement vs task** [S13–S14]:
  - a user requirement is the *what*, roughly estimated in relative points at release planning;
  - a task is the *how*, estimated at **2–12 hours** at iteration planning;
  - requirements are validated by acceptance tests.

### 5.5 Kanban and DevOps [W2-S47–S63]
**Kanban:**
- **3 core concepts** [S50]:
  1. **Visualize Workflow** (named columns, one card per item);
  2. **Limit WIP** (an explicit limit per state);
  3. **Measure the Lead Time** (make it small and predictable).
- **5 board elements** [S54–S55]:
  - visual signals (cards);
  - columns (each one an activity; together they form the workflow);
  - **WIP limits** (when a column is maxed out, the team swarms on it);
  - commitment point;
  - delivery point.
  - The S47 picture also labels a "Swimlane: EXPEDITE" 🔎.
- **6 benefits** [S51]:
  1. bottlenecks visible in real time;
  2. suits high-uncertainty operations and support teams;
  3. spreads through the organization;
  4. **inventory down 25–75%**;
  5. less waiting time;
  6. avoiding overproduction = "eliminating waste".

**DevOps:**
- **Lifecycle (∞ loop)** [S58]:
  - Koenig diagram: **Plan → Code → Build → Test → Release → Deploy → Operate → Monitor →** back to Plan.
  - DEV/OPS rings: Plan → Create → Verify → Package → Release → Configure → Monitor → back to Plan.
  - Only **Plan** (adopt agile practices) and **Operate** (end-to-end delivery of IT services) are explained in words [S59].
- **5 principles** [S60–S62]: Collaboration · Automation · Continuous Improvement · Customer-centric action · Create with the end in mind.
- **3 benefit categories** [S63]:
  - technical: reduced complexity, continuous delivery, faster problem resolution;
  - cultural: productive teams, happier customers;
  - business: collaboration and trust, faster delivery, stable environments.

### 5.6 Planning phase: needs, system request, feasibility [W3]
- **BPM benefits** [S6]:
  1. process agility;
  2. alignment with "best practices";
  3. efficiency (costs eliminated).
- **The analyst's 4 BPM contributions** [S7]:
  1. define and map the process steps;
  2. improve the steps that add value;
  3. eliminate or consolidate the steps that don't;
  4. ⭐ create or adjust electronic workflows. **IS projects are most often identified at step 4.**
- **Chain** [S11–S12]: business need → high-level business requirements + business value → the sponsor formally initiates → **system request**.

| System request element [S12–S15] | Description | Slide example |
|---|---|---|
| **Project sponsor** | initiates the project; primary point of contact on the business side | VP of marketing; CIO; CEO; steering committee |
| **Business need** | the business-related reason for initiating the system | increase sales; improve customer service |
| **Business requirements** | the business capabilities the system will provide | online access to information; product search; management reports |
| **Business value** | the benefits the system will create | 3% increase in sales; $200,000 cost savings |
| **Special issues or constraints** | issues the approval committee needs to know about | government-mandated deadline for May 30; Christmas season |

| Feasibility dimension | Question(s) on the slides | Factors / how it is assessed |
|---|---|---|
| **Technical** ("the first technique") [S16, S18, S21] | "Can we build it?" | it is a technical **risk** analysis. Less familiarity with the application or the technology → more risk; large project → more risk; harder compatibility (integration) → more risk |
| **Economic** ("the second element") [S16, S19, S22] | "Should we build it?" / "Will it provide business value?" | development costs; annual operating costs; annual benefits; intangible benefits and costs → **ROI, BEP, NPV** |
| **Organizational** ("the final technique") [S16, S20, S35–S36] | "If we build it, will they come?" / "…will it be used?" | champion(s), senior management, users, other stakeholders, strategic alignment. Two ways to assess it: **strategic alignment** and **stakeholder analysis**. "Can be the most difficult" dimension |

- The system request + feasibility analysis go to the **approval (steering) committee** [S16].
- Feasibility analysis also **identifies the important risks** [S17].
- **4 steps of economic feasibility** [S33–S34]:
  1. identify costs and benefits (one-time and recurring);
  2. assign values (even intangibles, "if at all possible");
  3. determine the cash flow, usually over **3–5 years**;
  4. assess economic value with **one or more** of ROI / BEP / NPV.

**⭐ Costs and benefits** [W3-S23] (you need this to classify Quiz items):
| Development costs (Year 0) | Operational costs (every year) | Tangible benefits (every year) | Intangible benefits |
|---|---|---|---|
| Development team salaries · Consultant fees · Development training · Hardware and software · Vendor installation · Office space and equipment · Data conversion costs | Software upgrades · Software licensing fees · Hardware repairs · Hardware upgrades · Operational team salaries · Communications charges · User training | Increased sales · Reductions in staff · Reductions in inventory · Reductions in IT costs · Better supplier prices | Increased market share · Increased brand recognition · Higher quality products · Improved customer service · Better supplier relations |

⚠️ **Pairs that get mixed up:**
- *development* training vs *user* training;
- hardware *and software* vs hardware *repairs/upgrades*;
- supplier *prices* (tangible) vs supplier *relations* (intangible);
- increased *sales* (tangible) vs increased *market share* (intangible).

### 5.7 The champion and other stakeholders [W3-S36–S38]
| Stakeholder | Role | To enhance organizational feasibility |
|---|---|---|
| **Champion** (high-level executive; usually, but not always, the sponsor; more than one is preferable) | initiates and promotes the project; allocates time; provides resources (and political support) | present the objectives and benefits to the executives who will benefit; build a **prototype** to show its value |
| **Organizational management** | know about the project; budget enough money; encourage users to accept and use the system | present to management; market the benefits (memos, newsletters); have the champion talk to peers |
| **System users** | make decisions that influence the project; do hands-on work; "ultimately determine whether the project is successful by using or not using the system" | give users official roles on the team; specific tasks with deadlines; regular feedback (e.g. weekly meetings) |

### 5.8 Classifying, selecting and running projects [W4-S7–S13]
| ⭐ Way to classify [S8] | The question it asks |
|---|---|
| Size | How many people are needed? |
| Cost | How much will it cost the organization? |
| Purpose | Improve the infrastructure? Support a current strategy? Improve operations? Demonstrate an innovation? |
| Length | How long until completion, and until value reaches the business? |
| Risk | How likely is it to succeed or fail? |
| Scope | How much of the organization is affected: a department, a division, the whole corporation? |
| Return on investment | How much money comes back for what the project costs? |

- **4-step selection** [S9]: Identify Potential Projects → Compare the Projects → Analyze Your Findings → Select a Project.
- **5 PM process stages** [S10]:
  1. **Initiation**: purpose, scope and objectives; key stakeholders; **project charter**.
  2. **Planning**: project plan; **WBS**; risk management strategy.
  3. **Execution**: start working; workflows; assign tasks; keep everyone in the loop.
  4. **Monitoring & Controlling**: reviews; progress against KPIs; changes.
  5. **Closure**: deliverables; failures and successes; lessons learned.
- **3 traditional tools** [S11]: WBS, Gantt chart, network diagram.
- **A task record has 10 items** [S13]: name · start date · completion date · person assigned · deliverables · completion status · priority · resources · estimated time · actual time.

### 5.9 WBS → Gantt → network diagram → CPM [W4-S14–S25, S30–S32]
| Tool | Steps / notation |
|---|---|
| **WBS** [S14–S17] | 1. Identify the tasks and their durations. 2. Go **top-down**: high-level tasks broken into subtasks. 3. Number them **hierarchically** (7 → 7.1 → 7.2.1). 4. At a minimum record **Duration, Status (open / in progress / complete), Dependencies**. 5. The WBS **drives** the Gantt chart and the network diagram. |
| **Gantt chart** [S18–S21] | Tasks are **rows** and time runs **across the top** (hours or days for short projects, weeks or months for medium ones). Each **bar** runs from start to finish. Bars are **filled in proportion** to progress. **Arrows** = dependencies. **▼ or ◆** = milestones. **Names** = the people assigned. Keep it to about **20–30 tasks**. Tools: a spreadsheet, Visio, SmartDraw, a PM package. |
| **Network diagram** [S22–S24] | A **node** = a task (name, ID, duration, start, finish). An **arc** = a dependency. **One diagonal line** = partially completed; **crossed lines** = completed. |
| **PERT** [S22] | For "fairly uncertain" estimates: **(optimistic + 4 × most likely + pessimistic) / 6**. |
| **CPM** [S25] | List every path, add up its durations; **longest = critical path** = the project's length. Mark the critical tasks with a special (double) border. Any delay to a critical task delays the project. A path x weeks shorter than the critical path has x weeks spare ("slack/float" is not a slide term 🔎). |
| **Class result** [S23] | Critical path **1 → 5 → 6 → 7 → 8 → 10 = 17 weeks** (the slide marks 5, 6, 7, 8 and 10; task 1 is complete). The other paths are 16 weeks: 1 → 9 → 10 and 2 → 3 → 4 → 8 → 10. |

**The 3 underlying problems of WBSs** [S30–S32]:
1. They focus on the system's **design**, forcing a "premature decomposition".
2. Too many levels of detail early on large projects, too few on small ones, so estimates are "wildly inaccurate".
3. They are project-specific, so they're hard to **compare across projects**, and teams reinvent the wheel.

The fix for object-oriented / agile projects is evolutionary, **iterative and incremental** workplans [S28–S29].

### 5.10 Scope management and timeboxing [W4-S33–S35, S45]
- **Scope creep** comes from 3 sources [S33]:
  1. **users** who see new potential;
  2. **developers** attached to interesting capabilities;
  3. a **senior manager** adding a new strategy.
- **5 techniques to manage scope** [S45]:
  1. identify all requirements at the outset;
  2. allow only changes deemed absolutely necessary;
  3. carefully examine the impact of suggested changes;
  4. delay some changes as "future enhancements";
  5. time boxing.
- **⭐ The 6 timeboxing steps** [S35]:
  1. Set the date for system delivery.
  2. Prioritize the functionality to include.
  3. Build the core of the system (the most important functionality).
  4. Postpone functionality that can't be provided in time.
  5. Deliver the system with the core functionality.
  6. Repeat steps 3–5 to add refinements and enhancements.

### 5.11 Estimation, the hurricane model, and missed schedule dates [W4-S26–S27, S36–S41]
- **Trade-offs** among the **functionality, time and cost** of the project [S26].
- **Where numbers come from:** similar past projects or experienced developers. Keep them **conservative**, and record **actual** time and effort [S27].
- **⭐ Hurricane model** [S37–S38]: a well-done plan at the end of inception has a **±100% cost** and **±25% schedule** margin of error. The cone of estimates narrows from Inception → Elaboration → Construction → Transition; circle size = estimated cost.
- **Ahead of schedule:** move the later deadlines sooner, but **keep the promised completion date** [S39].

| ⭐ If you assume the rest of the project is… | Action | Risk |
|---|---|---|
| simpler than the late part **and** simpler than originally believed (you can make up the time) | **Do not change the schedule** | **High** |
| simpler than the late part and no more complex than originally estimated (you can't make up the time, but won't lose more) | **Add the total time you are behind** to the whole schedule; padded time may absorb it | **Moderate** |
| **as complex as the late part** (the estimates were too optimistic) | **Add the same percentage** to all remaining estimates: % = weeks late ÷ planned weeks of the late part (2 ÷ 8 = 25%). If the sponsor can't accept the new date, **reduce scope** | **Low** |

### 5.12 Risk and JIRA [W4-S42–S47]
- **Risk management**: the "final facet" of project management [S42].
- **4 causes of risk** [S42]: weak personnel · scope creep · poor design · overly optimistic estimates.
- **6 gears** [S43] (no order given on the slide): Awareness · Identify · Evaluate · Controls · Implement · Monitor.
- **Risk assessment template** [S44]: the risk · **likelihood** · **potential impact** (e.g. Java inexperience → +50% programming time) · **ways to address it** (up-front training, outside experts).
- **JIRA** [S46–S47]:
  - boards: **Scrum and Kanban**;
  - issue types: **Sub-Task · Bug · Epic** ("a big user story that needs to be broken down") **· Story · Task**.

### 5.13 Staffing, motivation, conflict, CASE, standards [W5a]
**Staffing the project includes** [S4]:
1. how many people;
2. matching skills to needs;
3. motivating;
4. minimizing conflict.

**Deliverables:** a **staffing plan** (number and kinds of people + reporting structure) and a **project charter** (objectives and rules).

**⭐ 5 characteristics of a jelled team** [S8–S10]:
1. very low turnover;
2. a strong sense of identity;
3. a sense of eliteness;
4. the team, not any one individual, owns the system;
5. they enjoy their work (have fun).

**Team size** [S6–S7, S14–S16]:
- **Ringelmann effect:** individual productivity falls as the group grows (tug of war; "process loss").
- Average staff = person-months ÷ optimal schedule.
- "**Adding staff resources does not translate into increased productivity**".
- Keep teams **under 8–10 people** and create **sub-teams**.
- Communication lines in the S15 drawing: 2 people → 1 line, 4 → 6, 6 → 15, 8 → 28.

**Team configuration** [S17–S18]:
- Project manager → **functional lead** (manages the analysts) + **technical lead** (manages the programmers).
- Assign people on both **technical and interpersonal skills**.

**Ten Steps to More Productive Development Teams** [S11–S13]:
1. Give them their own space
2. Try agile methods
3. Maximise communication, minimise bureaucracy (daily standups, pair programming, whiteboard design sessions)
4. No more heroes (no "lone rangers")
5. Let them grow
6. Play time and rest time
7. Trust the team
8. Work iteratively and incrementally
9. Test First Design (TDD)
10. Get a team coach

| Motivation | Content |
|---|---|
| Types [S19–S20] | **Extrinsic** = external factors (pay raise, time off, bonus, threat of job loss) · **Intrinsic** = internal desire (challenge, quality, people you like and trust) |
| ⭐ Money [S21] | "the last thing that should be done"; the more you pay, the more people expect it |
| 5 do's [S21–S23] | (1) the **20 percent rule** (Gmail, Google News; start at 10%) · (2) small peer-to-peer **"Now That" awards** (~$50) · (3) a periodic day to work on anything, as long as it produces a **deliverable** · (4) a **high-end development environment** · (5) work that can **make a difference** |
| 6 don'ts [S24] | assign unrealistic deadlines · ignore good efforts · create a low-quality product · **give everyone on the project a raise** · make an important decision without the team's input · maintain poor working conditions |

**Conflict** [S26–S27]:
- ⭐ **Group cohesiveness** contributes more to productivity than individual capabilities do.
- **First steps:** clear roles, accountability, and a **project charter**. The charter may say when to be at work, when staff meetings are, how the team communicates, and how the workplan is updated.
- **6 conflict-avoidance strategies:**
  1. clearly define plans;
  2. make sure the team understands why the project matters to the organization;
  3. detailed operating procedures;
  4. a project charter;
  5. schedule commitments made ahead of time;
  6. forecast other priorities and their impact.
- ⚠️ S26 calls conflict "the third component" of staffing, but it is the 4th bullet on S4.

**Environment and infrastructure** [S28–S33]:
- The **environment workflow** chooses the **tools + standards**; the **infrastructure management workflow** chooses the **documentation**.
- **CASE types:** **upper** (analysis workflow; diagrams) · **lower** (design workflow; generates code) · **I-CASE** (both).
- **CASE benefits:**
  1. faster to complete and change work;
  2. centralized information;
  3. diagrams that are easier to understand;
  4. *potentially* lower maintenance costs;
  5. *potentially* better quality;
  6. *potentially* enforced discipline;
  7. measuring the size of changes;
  8. round-trip engineering 🔎.
- **CASE repository** = information repository = data dictionary.

| ⭐ Type of standard [S33] | Example from the slide |
|---|---|
| Documentation | date and project name as a header on all documentation; 1-inch margins |
| Coding | a module header (programmer, last update date, purpose); 1 comment line per 5 lines of code |
| Procedural | record actual progress in the work plan every Monday by 10 AM; requirement changes approved by the PM |
| Specification requirement | program name, purpose, special calculations, business rules, pseudocode, due date |
| User interface design | bold, left-justified labels followed by a colon; tab order from top left to bottom right |

Standards are needed because shared work "can get pretty confusing" and people get reassigned mid-project; their knowledge must not leave with them [S32].

### 5.14 Requirements and their categories [W5b-S2–S16, S20]
- **System proposal** = requirements definition + models + feasibility analysis + workplan. The system request feeds it, and it goes to the approval committee [S2–S3].
- **Project vs product requirements** [S4–S5]:
  - **Project** requirements: set by the project stakeholders; about scope, timeline, budget and resources. Examples: resources, staff training, documentation, infrastructure changes, installation and migration, certification and legal, internal documents, SLA.
  - **Product** requirements: set by the PO or product management; about functionality, performance and usability.
- **Business vs system requirements** [S9]:
  - Business (user) requirements: analysis phase; the business person's view; the "**what**".
  - System requirements: design phase; the developer's view; the "**how**".
- **Hierarchy** [S10]: Business requirements (why) → Stakeholder requirements → Solution requirements (capabilities & qualities) → **Functional** (capabilities) + **Non-functional** (qualities).

| ⭐ Type | Subtype | Slide description | Slide example |
|---|---|---|---|
| **Functional** ("process or data") | Process-oriented | a process the system must perform | "check incoming customer orders for inventory availability" |
| | Information-oriented | information the system must contain | "retain customer order history for three years"; "real-time inventory levels at all warehouses" |
| **Nonfunctional** ("performance or usability"; used mainly in design) | Operational | physical and technical environments | "work on any Web browser"; "integrate with the existing inventory system"; "fit in a pocket or purse" |
| | Performance | speed, capacity, reliability | "not exceed 2 seconds"; "updated inventory information every 15 minutes"; "**24 hours per day, 365 days per year**" |
| | Security | who has authorized access, under what circumstances | "Only direct managers can see personnel records of staff" |
| | Cultural & political | cultural, political and legal factors | "US and European currency"; "buy computers only from Dell"; "comply with insurance industry standards" |

- **Requirements definition** = a text report listing the F and NF requirements **in outline format** [S16]:
  - the NF requirements are grouped under the 4 categories (an empty category is still listed);
  - the F requirements are grouped by process (the doctor's office sample).
- **4 real-world problems** [S20]:
  1. no access to the right users;
  2. inadequate specification (especially with agile's lightweight techniques);
  3. some requirements are unknowable at the start;
  4. verifying and validating is hard.

### 5.15 ⭐ BPA vs BPI vs BPR: selecting a strategy [W5b-S17–S33]
**The 3 analysis steps** [S21]: understand the as-is system → identify improvements → develop the to-be requirements.

| | **BPA** | **BPI** | **BPR** |
|---|---|---|---|
| Amount of change [S18] | small | moderate | significant; affects much of the organization |
| What it does | keeps operations; computers do some of the work; "least impact" | moderate change: new technology or copying competitors; efficiency **and** effectiveness | "obliterating the current way of doing business" |
| Time on the as-is system | "a significant time" | "much less" than BPA | "little time" |
| Techniques | **problem analysis**, **root cause analysis** | **duration analysis**, **activity-based costing**, **informal benchmarking** | **outcome analysis**, **technology analysis**, **activity elimination** |
| Potential business value [S33] | Low–moderate | Moderate | High |
| Project cost [S33] | Low | Low–moderate | High |
| Breadth of analysis [S33] | Narrow | Narrow–moderate | Very broad |
| Risk [S33] | Low–moderate | Low–moderate | **Very high** |

"No one technique is inherently better … most projects use a combination" [S33].

### 5.16 Interviews [W5b-S35–S45]
- **5 steps:**
  1. selecting interviewees (an **interview schedule**: who, when, purpose; both managers and staff);
  2. designing the questions;
  3. preparing (a plan, anticipated answers, segues, the interviewee's areas of knowledge, priorities);
  4. conducting (**build rapport first**, appear professional and unbiased, take careful notes);
  5. post-interview follow-up (a report **within 48 h**, sent to the interviewee).

| Question type [S37–S38] | Definition | Use / exam analogy | Slide examples |
|---|---|---|---|
| **Closed-ended** | needs a specific answer | specific, precise information; like multiple-choice | "How many telephone orders are received per day?" ⚠️ also "How do customers place orders?" and "What information is missing from the monthly sales report?" |
| **Open-ended** | room for elaboration | rich information; the interviewee has more control; like an essay | "What do you think about the current system?" |
| **Probing** | follows up on the last answer | when the interviewer is unclear; signals listening | "Why?", "Can you give me an example?" |

| | Unstructured | Structured |
|---|---|---|
| When | early, when the as-is process is unclear | later, when specific information is needed |
| Questions | few closed-ended; open-ended and probing "on the fly" | prepared beforehand; **more closed-ended** |
| Note | "the most challenging interviews to conduct" | — |

- **Ordering:** top-down = broad → specific; bottom-up = specific → broad. In practice, broad → specific → broad again [S40–S41].

### 5.17 JAD [W6-S4–S12]
- **Who:** the project team, users and management; **10–20 users**, a neutral **facilitator** (expert in group process and SA&D; gives no opinions), and **1–2 scribes** (often using CASE tools). IBM, late 1970s.
- **5 steps** (mirroring the interview steps):
  1. select participants (like interviewees: a mix of levels, political support; problem: everyone is away from the office at once);
  2. design the session (½ day to several weeks; **typically 5–10 days over 3 weeks**; JAD moves into analysis);
  3. prepare (often off-site; tell participants what's expected);
  4. conduct (formal agenda + **ground rules**: follow the schedule, respect opinions, accept disagreement, one person talks at a time);
  5. post-JAD follow-up (a **post-session report**, **a week or two** later).
- **e-JAD:** groupware, anonymous and simultaneous input, no fear of reprisal, **50–80% less time**, typically **1–4 days in 1 week**.

### 5.18 Questionnaires [W6-S13–S18]
- **When to use one:** a large number of people, or users outside the organization (customers, vendors).
- **4 steps:**
  1. select participants (a **sample**);
  2. design (mostly **closed-ended**; separate facts from opinions; decide how you'll analyze the results *before* sending);
  3. administer;
  4. follow up (a **questionnaire report** soon after the deadline).
- **Return rates:** paper and e-mail **30–50%**; Web **often only 5–30%**.

**⭐ The 9 design guidelines** [S16]:
1. begin with nonthreatening, interesting questions;
2. group items into logical sections;
3. don't put important items at the very end;
4. don't crowd a page;
5. avoid abbreviations;
6. avoid biased or suggestive items;
7. number the questions;
8. pretest the questionnaire;
9. provide anonymity.

**Improving response** [S17]:
- explain why the questionnaire is being run and why the person was chosen;
- state a return date;
- offer an inducement (a free pen);
- offer a summary of the results;
- *inside the organization*: hand it out personally, follow up after a week or two, or have supervisors run it in a group meeting.

### 5.19 Document analysis and observation [W6-S19–S24]
- **Document analysis** looks at the **as-is** system. Helpful documents: paper reports, memorandums, policy manuals, user-training manuals, organization charts, forms, the existing user interface.
- ⭐ **"The most powerful indication that the system needs to be changed"** is users creating their own forms or adding information to existing ones; review both blank and completed forms. Needing multiple reports means new information or formats are needed [S21].
- **Observation:** see reality rather than hear it described, and **check the validity** of interview and questionnaire data; managers don't remember how they spend their time [S22].
- **Ethnography:**
  - it finds requirements from how people *actually* work and from awareness of others' activities;
  - but it "**cannot identify new features**" [S23];
  - and it studies practices with a "historical basis which is no longer relevant" [S24].
  - **Focused ethnography** = ethnography + prototyping [S24].

### 5.20 ⭐ Requirements-gathering techniques table [W6-S34]
| | Interviews | JAD | Questionnaires | Document analysis | Observation |
|---|---|---|---|---|---|
| Type of information | As-is, improvements, to-be | As-is, improvements, to-be | As-is, improvements | As-is | As-is |
| Depth | High | High | Medium | Low | Low |
| Breadth | Low | Medium | High | High | Low |
| Integration | Low | **High** | Low | Low | Low |
| User involvement | Medium | **High** | Low | Low | Low |
| Cost | Medium | Low–Medium | Low | Low | Low to Medium |

**Picking a technique:**
- to-be information → interviews or JAD;
- the highest integration or user involvement → JAD;
- breadth at low cost → questionnaires or document analysis;
- checking what people told you → observation.

### 5.21 Validation and requirements management [W6-S25–S33]
- **Validation** shows that the requirements define the system the customer really wants. A requirements error fixed after delivery may cost **up to 100×** an implementation error [S25].

| Requirements checks (5) [S26] | Validation techniques (3) [S27] | Review checks (4) [S29] |
|---|---|---|
| **Validity**: best supports the customer's needs? | **Requirements reviews**: systematic manual analysis (regular, client + contractor staff, formal or informal) | **Verifiability**: realistically testable? |
| **Consistency**: any conflicts? | **Prototyping**: an executable model | **Comprehensibility**: properly understood? |
| **Completeness**: all required functions included? | **Test-case generation**: tests that check testability | **Traceability**: origin clearly stated? |
| **Realism**: possible with the budget and technology? | | **Adaptability**: changeable without a large impact? |
| **Verifiability**: can it be checked? | | |

- **Requirements management:** track each requirement, link the dependent ones, and use a formal change-proposal process [S30].
- **Why requirements change** [S31–S32]:
  1. the business and technical environment changes after installation (new hardware, new interfaces, new priorities, new laws);
  2. the people who pay are rarely the users;
  3. large systems have diverse users with conflicting needs, so the final set is a compromise.

### 5.22 ⭐ System proposal template (10 sections) [W6-S35–S37]
1. Table of Contents
2. Executive Summary (lets a busy executive decide what to read)
3. System Request (*revised*)
4. Workplan (*revised* after analysis)
5. Feasibility Analysis (*revised*)
6. Requirements Definition (the F and NF business requirements)
7. Functional Model (activity diagram, use case descriptions, use-case diagram)
8. Structural Models (CRC cards, class diagram, object diagrams)
9. Behavioral Models (sequence and communication diagrams, behavioral-state machines, CRUDE matrix)
10. Appendices (e.g. questionnaire or interview results; ⚠️ the slide's sentence is cut off)

The model types in sections 7–9 are only named on the slides 🔎.

### 5.23 Numbers to remember (all decks)
| Number | Meaning | Ref |
|---|---|---|
| 4 / 5 | SDLC phases (W1a) / with Post production (W1b) | W1a-S9; W1b-S4 |
| 1980s / 1990s / 1970 | structured design dominant / RAD emerged / Royce's waterfall | W1b-S18, S26, S19 |
| 17 · 4 · 12 | Manifesto signers · values · principles | W2-S2–S5 |
| 5–9 · >9 | typical Dev Team size · too much coordination | W2-S21–S22 |
| 15 min · 8 h · 3 h · ≤1 month | Daily Scrum · Sprint Planning max · Retrospective max · Sprint | W2-S29–S38 |
| 2–12 h | task estimate | W2-S14 |
| 25–75% · 1950s · 2007 | Kanban inventory reduction · "kanban" as a process term · Kanban Method | W2-S49, S51 |
| 5 · 3 · 4 · 3 | system request elements · feasibility dimensions · economic steps · ROI/BEP/NPV | W3-S12–S34 |
| 3–5 years | usual cash-flow forecast period | W3-S33 |
| 10.14% · 2.66 (slide 2.68 ⚠️) · −$5,973 · 6.65% | class example ROI · BEP · NPV at 10% · break-even rate | W3-S26–S32 |
| 7 · 4 · 5 | ways to classify projects · selection steps · PM stages | W4-S8–S10 |
| 20–30 | max tasks on a Gantt chart | W4-S19 |
| (o + 4m + p)/6 | PERT | W4-S22 |
| 17 weeks | class critical path | W4-S23, S25 |
| 6 | timeboxing steps | W4-S35 |
| 100% / 25% | hurricane margin for cost / schedule | W4-S37 |
| 2/8 = 25% | the missed-schedule percentage example | W4-S41 |
| 5 · 10 · 6 · 6 · 5 | jelled traits · ten steps · don'ts · conflict strategies · standard types | W5a |
| 8–10 · 20% (10%) · $50 | team size limit · the 20 percent rule · "Now That" award | W5a-S16, S21, S22 |
| 2 + 4 | functional + nonfunctional subtypes | W5b-S12–S14 |
| 8 | BPA/BPI/BPR techniques (2 + 3 + 3) | W5b-S22–S32 |
| 30 days vs 8 h | the duration-analysis mortgage example | W5b-S26 |
| 5 · 3 · 48 h | interview steps · question types · report deadline | W5b-S35–S44 |
| 10–20 · 1–2 · 50–80% | JAD users · scribes · e-JAD time saved | W6-S6–S7 |
| 5–10 days / 3 weeks · 1–4 days / 1 week | typical JAD · typical e-JAD | W6-S9 |
| 30–50% · 5–30% | paper/e-mail · Web questionnaire returns | W6-S14 |
| 9 · 7 | questionnaire guidelines · kinds of helpful documents | W6-S16, S19 |
| 100× · 5 · 3 · 4 | cost of a late requirements error · checks · techniques · review checks | W6-S25–S29 |
| 10 | system proposal sections | W6-S35–S37 |

---

## 6. Calculation drills (PRACTICE: new numbers, the class method; full solutions in §8.1)

### 6.1 Three problems in the exact Quiz 1 format [after W4-S2–S5]
Use the §1(b) conventions: development costs in Year 0; operational costs and benefits every year.

**PRACTICE D1**
```
Depict graphically: Prototyping development methodology.
During Project Planning phase, next cash flows were identified:
Development costs
◦ Office space and equipment: $30 000
◦ Vendor installation: $40 000
◦ Data conversion tools: $20 000
Operational costs
◦ Software upgrades: $10 000
◦ Operational team salaries: $15 000
◦ User training: $5 000
Tangible benefits
◦ Increased sales: $35 000
◦ Reduction in staff: $30 000
◦ Better supplier prices: $15 000
Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = 8%
```

**PRACTICE D2**
```
Depict graphically: Phased development methodology.
During Project Planning phase, next cash flows were identified:
Development costs
◦ Consultant fees: $50 000
◦ Hardware and software: $60 000
◦ Development training: $10 000
Operational costs
◦ Software licensing fees: $15 000
◦ Hardware repairs: $10 000
◦ Communications charges: $5 000
Tangible benefits
◦ Increased sales: $45 000
◦ Reductions in inventory: $20 000
◦ Reductions in IT costs: $10 000
Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = 12%
```

**PRACTICE D3**
```
Depict graphically: Agile (typical agile) development methodology.
During Project Planning phase, next cash flows were identified:
Development costs
◦ Office space and equipment: $35 000
◦ Vendor installation: $45 000
◦ Data conversion tools: $25 000
Operational costs
◦ Software upgrades: $15 000
◦ Operational team salaries: $10 000
◦ User training: $10 000
Tangible benefits
◦ Increased sales: $50 000
◦ Reduction in staff: $30 000
◦ Better supplier prices: $25 000
Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = 6%
```

### 6.2 Two critical-path problems in the style of the W4 network diagram [after W4-S15–S25]
**PRACTICE C1: replacing the student-registration system** (durations in weeks)
| Task | Name | Duration | Dependency |
|---|---|---:|---|
| A | Interview users | 3 | – |
| B | Review existing documents | 2 | – |
| C | Write requirements definition | 2 | A, B |
| D | Select vendor | 4 | B |
| E | Design database | 3 | C |
| F | Build interfaces | 5 | C, D |
| G | Test system | 2 | E, F |
| H | Train users | 1 | G |

- (a) Draw the network diagram (one node per task with its ID and duration; one arc per dependency).
- (b) List every path from start to finish with its length.
- (c) Name the critical path and the project duration. Which tasks get the special border?
- (d) How many weeks can A, C and E each slip without delaying the project?
- (e) What happens to the end date if E takes 2 weeks longer? If D takes 1 week longer?
- (f) Draw a Gantt chart in weeks, with every task starting as early as possible.

**PRACTICE C2: PERT + CPM** (weeks: o = optimistic, m = most likely, p = pessimistic)
| Task | Name | o | m | p | Dependency |
|---|---|---:|---:|---:|---|
| A | Kick-off and planning | 1 | 2 | 3 | – |
| B | Install new hardware | 2 | 3 | 16 | A |
| C | Write requirements definition | 2 | 3 | 4 | A |
| D | Migrate data | 2 | 3 | 10 | B |
| E | Develop programs | 3 | 4 | 5 | C |
| F | Acceptance testing | 1 | 1 | 7 | D, E |

- (a) Compute each task's PERT weighted average.
- (b) Using the PERT values, find both paths, the critical path, the expected duration, and the spare time on the other path.
- (c) Which path would you call critical if you used only the most likely values?
- (d) Explain the difference in one sentence, using the slide's reason for PERT.

### 6.3 One duration-analysis problem [after W5b-S25–S26]
**PRACTICE DA1.** A company takes on average **10 working days** (8-hour days) to approve a purchase order. The analysts time each basic step: data entry 0.5 h · budget check 1 h · manager approval 0.5 h · supplier selection 1.5 h · order placement 0.5 h.
- (a) Apply duration analysis: the step total, the elapsed working hours, the ratio, the share of time that is real work, and the waiting time.
- (b) Interpret the result in the slide's words.
- (c) Which strategy does duration analysis belong to? Name that strategy's other two activities.

---

## 7. Mock midterm (PRACTICE: about 90 minutes, 100 points; answers in §8.2)
Closed book, with a timer. The suggested times add up to 90 minutes.

### Part A: Depict graphically (12 points, ~12 min)
- **A1 (6).** Depict graphically: **Throwaway prototyping** development methodology. In one line, say why the prototype is thrown away.
- **A2 (6).** Depict graphically: **V-model**. Which phase is the acceptance test design derived from?

### Part B: Calculations (30 points, ~30 min)
**B1 (18).** In the W3 "Small practice" style, the items are **not** grouped, so classify them yourself.
```
During Project Planning phase, next cash flows were identified:
Consultant fees: $30 000
Hardware repairs: $10 000
Increased sales: $55 000
Hardware and software: $40 000
Reductions in inventory: $20 000
Communications charges: $5 000
Development training: $10 000
Better supplier relations: (no dollar value could be estimated)
Software licensing fees: $15 000
Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = 15%.
Should the project be accepted?
```

**B2 (12).** The requirements-gathering plan for a new system (durations in weeks):
| Task | Name | Duration | Dependency |
|---|---|---:|---|
| A | Define scope | 1 | – |
| B | Interview stakeholders | 3 | A |
| C | Distribute questionnaire | 2 | A |
| D | Analyze questionnaire results | 2 | C |
| E | Write requirements definition | 2 | B, D |
| F | Prototype the user interface | 4 | B |
| G | Prepare system proposal | 1 | E, F |

- (a) Draw the network diagram.
- (b) List all the paths with their lengths.
- (c) Give the critical path and the project duration.
- (d) How many weeks can C, D and E each slip?
- (e) What happens if D takes 2 weeks longer?
- (f) Task A is complete and task B is half done. How do you show this on the network diagram?

### Part C: 15 MCQs in his review style (15 points, ~15 min)
1. The ________ is the process of understanding how an information system can support business needs by designing a system, building it, and delivering it to users.
   (a) methodology · (b) system request · (c) project management · (d) SDLC · (e) business process management
2. Users cannot clearly describe the functions they need, and the team has never used the planned technology. According to the "Which Methodology to Use?" table, the best choice is ________.
   (a) Waterfall · (b) Throwaway prototyping · (c) Parallel development · (d) Prototyping · (e) Extreme Programming
3. In Scrum, the only person who has the authority to cancel a Sprint is the ________.
   (a) Product Owner · (b) Scrum Master · (c) Development Team · (d) project sponsor · (e) key stakeholders
4. In Kanban, the elapsed time between the commitment point and the delivery point is called ________.
   (a) throughput · (b) WIP limit · (c) sprint length · (d) value stream · (e) Lead Time
5. An organizational feasibility analysis attempts to answer the question ________.
   (a) "Can we build it?" · (b) "Should we build the system?" · (c) "Will it be finished on time?" · (d) "Who will pay for it?" · (e) "If we build it, will they come?"
6. A project's ROI is 12% and its break-even point is 2.4 years of a 3-year life, but its NPV at the required rate of return is negative. According to the class slides, the project ________.
   (a) should be accepted because its ROI is positive · (b) should be accepted because it breaks even within its life cycle · (c) should not be accepted at that rate, because NPV is less than zero · (d) cannot be judged until the intangible benefits are valued · (e) should be judged on BEP alone because it is the most rigorous measure
7. Dana prepared a well-done project plan at the end of inception: the project will cost $120,000 and take 16 weeks. According to the margin of error guidelines, the true values could range from ________.
   (a) $60,000–$180,000 and 12–20 weeks · (b) $0–$240,000 and 0–32 weeks · (c) $90,000–$150,000 and 8–24 weeks · (d) $0–$240,000 and 12–20 weeks · (e) $0–$120,000 and 16–20 weeks
8. Omar's analysis phase was planned for 12 weeks but took 15. He believes the rest of the project is as complex as the late part (his estimates were too optimistic). 20 weeks of work remain. What is the BEST action?
   (a) Do not change the schedule; the team will catch up · (b) Move the remaining dates 3 weeks later (23 weeks remain) · (c) Add three programmers so that the remaining 20 weeks hold · (d) Increase all remaining estimates by 20% (24 weeks remain) · (e) Increase all remaining estimates by 25% (25 weeks remain) and reduce scope if the sponsor can't accept the date
9. In a network diagram, a task drawn with crossed lines through its node is ________.
   (a) on the critical path · (b) completed · (c) partially completed · (d) a milestone · (e) not yet started
10. ________ contributes more to productivity than project members' individual capabilities or experiences.
    (a) The project charter · (b) The staffing plan · (c) A high-end development environment · (d) Group cohesiveness · (e) A large team
11. "All changes to a requirements document must be approved by the project manager" is an example of ________ standards.
    (a) documentation · (b) procedural · (c) coding · (d) specification requirement · (e) user interface design
12. The strategy that makes moderate changes to take advantage of new technology or to copy competitors, using duration analysis, activity-based costing and informal benchmarking, is ________.
    (a) BPA · (b) BPR · (c) BPM · (d) JAD · (e) BPI
13. Early in a project, when the as-is process is still unclear, the analyst should mostly conduct ________.
    (a) unstructured interviews · (b) structured interviews with closed-ended questions · (c) questionnaires with closed-ended questions · (d) bottom-up interviews only · (e) requirements reviews
14. In a JAD session, the person who sets the agenda and guides the discussion but gives no ideas or opinions is the ________.
    (a) project manager · (b) scribe · (c) facilitator · (d) project sponsor · (e) champion
15. "Is the origin of the requirement clearly stated?" is the review check called ________.
    (a) Verifiability · (b) Comprehensibility · (c) Adaptability · (d) Traceability · (e) Consistency

### Part D: Short answers (24 points, 4 each, ~20 min)
- **D1.** Compare **BPA, BPI and BPR**: the amount of change, the time spent on the as-is system, two techniques of each, and the class risk rating.
- **D2.** Compare **JAD and interviews**: who takes part, how many steps, when the report is ready, and two rows of the techniques table where they differ.
- **D3.** Define **plan-driven** and **agile** processes. Which is used for high-level and which for low-level planning? Give one class example of each, and complete the bold sentence "There are no ______ software processes."
- **D4.** List the **five elements of a system request** and the **three feasibility questions**. To whom are they presented, and what does that body decide?
- **D5.** Name the **five Scrum events** in the order they happen, with the time-boxes the slides give. Who may cancel a Sprint, and when?
- **D6.** List the **five characteristics of a jelled team**, define the **Ringelmann effect**, and state the class rule for **team size**.

### Part E: Apply (19 points, ~13 min)
**E1 (10).** A university library is building a self-service system. Classify each requirement as **functional** (process- or information-oriented) or **nonfunctional** (operational / performance / security / cultural & political).
1. The system must allow students to renew a borrowed book online.
2. The system must keep each student's borrowing history for five years.
3. The system should run on any Web browser and on the library's existing self-service kiosks.
4. A catalogue search should return results in 2 seconds or less.
5. Only library staff can waive an overdue fine.
6. All screens must be available in Uzbek, Russian and English.
7. The system must include the shelf location of every book.
8. The system should be available 24 hours a day, 365 days a year.
9. The system must produce a monthly ranking of librarians' performance.
10. The system must comply with the national personal-data law.

**E2 (9).** Which technique or strategy fits? Justify each answer with the class table or slide.
- (a) A bank is building a mobile app for 40,000 existing customers. The analysts need the customers' opinions about the current app and their ideas for improvements, quickly and at low cost. **Which requirements-gathering technique?**
- (b) A logistics firm's new CEO says: "Forget how we deliver now; we will rebuild delivery around drones and real-time tracking." She accepts very high risk and high cost for high potential value. **Which analysis strategy, which three activities, and how much time should go into the as-is system?**
- (c) Managers described the order process in interviews, but completed order forms are full of handwritten notes that clerks added to them. **Which technique(s) do you use next, and what do the slides say those notes indicate?**

---

## 8. Answer key (every number verified with a script)

### 8.1 Answers to §6 (drills)
**D1 (8%).** Part A: §1(a) ⑤ Prototyping.
- Development = 30,000 + 40,000 + 20,000 = **90,000**.
- Operational = 10,000 + 15,000 + 5,000 = **30,000/yr**.
- Benefits = 35,000 + 30,000 + 15,000 = **80,000/yr**.
- Net = **50,000/yr**.

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | – | 80,000 | 80,000 | 80,000 | 240,000 |
| Total Costs | 90,000 | 30,000 | 30,000 | 30,000 | 180,000 |
| Net Benefits | (90,000) | 50,000 | 50,000 | 50,000 | 60,000 |
| Cumulative | (90,000) | (40,000) | 10,000 | 60,000 | |
| (1.08)ⁿ | 1 | 1.08 | 1.1664 | 1.259712 | |
| PV Benefits | – | 74,074.07 | 68,587.11 | 63,506.58 | 206,167.76 |
| PV Costs | 90,000.00 | 27,777.78 | 25,720.16 | 23,814.97 | 167,312.91 |

- ROI = 60,000 / 180,000 = **33.33%**
- BEP = 1 + (50,000 − 10,000) / 50,000 = **1.80 years**
- NPV = **$38,854.85 → accept** (rounded cells give 38,855)

**D2 (12%).** Part A: §1(a) ④ Phased.
- Development = 50,000 + 60,000 + 10,000 = **120,000**.
- Operational = 15,000 + 10,000 + 5,000 = **30,000/yr**.
- Benefits = 45,000 + 20,000 + 10,000 = **75,000/yr**.
- Net = **45,000/yr**.

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | – | 75,000 | 75,000 | 75,000 | 225,000 |
| Total Costs | 120,000 | 30,000 | 30,000 | 30,000 | 210,000 |
| Net Benefits | (120,000) | 45,000 | 45,000 | 45,000 | 15,000 |
| Cumulative | (120,000) | (75,000) | (30,000) | 15,000 | |
| (1.12)ⁿ | 1 | 1.12 | 1.2544 | 1.404928 | |
| PV Benefits | – | 66,964.29 | 59,789.54 | 53,383.52 | 180,137.35 |
| PV Costs | 120,000.00 | 26,785.71 | 23,915.82 | 21,353.41 | 192,054.94 |

- ROI = 15,000 / 210,000 = **7.14%**
- BEP = 2 + (45,000 − 15,000) / 45,000 = **2.67 years**
- NPV = **−$11,917.59 → do not accept** (rounded cells give −11,917)
- ⭐ This is the **W3-S32 lesson**: ROI is positive and BEP falls within the 3-year life, yet NPV < 0. NPV turns positive only below a rate of about 6.13%.

**D3 (6%).** Part A: §1(a) ⑦ Agile.
- Development = 35,000 + 45,000 + 25,000 = **105,000**.
- Operational = 15,000 + 10,000 + 10,000 = **35,000/yr**.
- Benefits = 50,000 + 30,000 + 25,000 = **105,000/yr**.
- Net = **70,000/yr**.

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | – | 105,000 | 105,000 | 105,000 | 315,000 |
| Total Costs | 105,000 | 35,000 | 35,000 | 35,000 | 210,000 |
| Net Benefits | (105,000) | 70,000 | 70,000 | 70,000 | 105,000 |
| Cumulative | (105,000) | (35,000) | 35,000 | 105,000 | |
| (1.06)ⁿ | 1 | 1.06 | 1.1236 | 1.191016 | |
| PV Benefits | – | 99,056.60 | 93,449.63 | 88,160.02 | 280,666.25 |
| PV Costs | 105,000.00 | 33,018.87 | 31,149.88 | 29,386.67 | 198,555.42 |

- ROI = 105,000 / 210,000 = **50.00%**
- BEP = 1 + (70,000 − 35,000) / 70,000 = **1.50 years**
- NPV = **$82,110.84 → accept** (rounded cells give 82,111)

**C1.**
- **(a) Arcs:** A→C, B→C, B→D, C→E, C→F, D→F, E→G, F→G, G→H.
- **(b) Paths:**

| Path | Sum | Weeks |
|---|---|---:|
| **B → D → F → G → H** | 2 + 4 + 5 + 2 + 1 | **14** |
| A → C → F → G → H | 3 + 2 + 5 + 2 + 1 | 13 |
| B → C → F → G → H | 2 + 2 + 5 + 2 + 1 | 12 |
| A → C → E → G → H | 3 + 2 + 3 + 2 + 1 | 11 |
| B → C → E → G → H | 2 + 2 + 3 + 2 + 1 | 10 |

- **(c)** The critical path is **B → D → F → G → H = 14 weeks**. B, D, F, G and H get the special border.
- **(d)** A can slip **1 week** and C **1 week** (the longest path through either is 13). E can slip **3 weeks** (its longest path is 11).
- **(e)** If **E takes +2**, its longest path becomes 13, so the end date **doesn't change** (still 14). If **D takes +1**, the critical path becomes 15, so the project ends **1 week later (15 weeks)**.
- **(f)** Gantt chart (* = critical). Add an arrow from each bar's end to its successor's start:
```
Week                     | 1  2  3  4  5  6  7  8  9 10 11 12 13 14 |
---------------------------------------------------------------------
A Interview users (3)    |██ ██ ██                                  |
B Review documents (2)*  |██ ██                                     |
C Requirements def. (2)  |         ██ ██                            |
D Select vendor (4)*     |      ██ ██ ██ ██                         |
E Design database (3)    |               ██ ██ ██                   |
F Build interfaces (5)*  |                  ██ ██ ██ ██ ██          |
G Test system (2)*       |                                 ██ ██    |
H Train users (1)*       |                                       ██ |
```

**C2.**
- **(a)** A = (1 + 8 + 3)/6 = **2** · B = (2 + 12 + 16)/6 = **5** · C = (2 + 12 + 4)/6 = **3** · D = (2 + 12 + 10)/6 = **4** · E = (3 + 16 + 5)/6 = **4** · F = (1 + 4 + 7)/6 = **2**.
- **(b)** A → B → D → F = 2 + 5 + 4 + 2 = **13 weeks (critical)**. A → C → E → F = 2 + 3 + 4 + 2 = 11, so C and E have **2 weeks** spare.
- **(c)** With the most likely values only: A → C → E → F = 2 + 3 + 4 + 1 = **10** vs A → B → D → F = 2 + 3 + 3 + 1 = 9. You would wrongly call A → C → E → F critical.
- **(d)** PERT is for estimates that are "fairly uncertain" [W4-S22]. B and D have long pessimistic tails (16 and 10 weeks), and the 1-4-1 weighting picks them up. That makes the hardware and data path the real critical path. "CPM can be used with or without PERT" [S25].

**DA1.**
- **(a)**
  - Step total = 0.5 + 1 + 0.5 + 1.5 + 0.5 = **4 h**.
  - Elapsed time = 10 × 8 = **80 working hours**.
  - Ratio = 80 : 4 = **20 : 1**.
  - Real work = 4 / 80 = **5%**, so **76 h (95%)** pass with nobody working on the order.
  - In other words, half a day's work takes ten days.
- **(b)** It is "a strong indication that the overall process is badly broken" (compare the 30-days-for-8-hours mortgage case) [W5b-S26].
- **(c)** **BPI** [W5b-S24]. Its other two activities are **activity-based costing** and **informal benchmarking**.

### 8.2 Answers to §7 (mock midterm)
**Part A**
- **A1 (Throwaway prototyping):** see §1(a) ⑥.
  - **Marking idea (4 pts):** Planning → Analysis → stacked A/D/I block; Design row → rounded **Design prototype**, looping back into the block; a **separate** Design → Implementation → System path from the block's Analysis row; wavy back-arrows.
  - **Reason (2 pts):** "they are not a good basis for a production system". Any one of: they can't be tuned for non-functional requirements · they are undocumented · their structure is degraded · they won't meet quality standards [W1b-S38].
- **A2 (V-model):** see §1(a) ②.
  - **Marking idea (4 pts):** Analysis → Design → Implementation (coding) going down; Unit → Integration → System → Acceptance testing going up; the 4 test-design boxes with dashed links.
  - **Acceptance test design comes from Analysis** (2 pts) [W1b-S22].

**Part B**
**B1 (15%).** Classify first:

| Item | Category [W3-S23] | Goes in |
|---|---|---|
| Consultant fees 30,000 · Hardware and software 40,000 · Development training 10,000 | Development | Year 0: **80,000** |
| Hardware repairs 10,000 · Communications charges 5,000 · Software licensing fees 15,000 | Operational | Years 1–3: **30,000/yr** |
| Increased sales 55,000 · Reductions in inventory 20,000 | Tangible benefit | Years 1–3: **75,000/yr** |
| Better supplier relations | Intangible, with no value | **left out** (value it "if at all possible" [S33]) |

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | – | 75,000 | 75,000 | 75,000 | 225,000 |
| Total Costs | 80,000 | 30,000 | 30,000 | 30,000 | 170,000 |
| Net Benefits | (80,000) | 45,000 | 45,000 | 45,000 | 55,000 |
| Cumulative | (80,000) | (35,000) | 10,000 | 55,000 | |
| (1.15)ⁿ | 1 | 1.15 | 1.3225 | 1.520875 | |
| PV Benefits | – | 65,217.39 | 56,710.78 | 49,313.72 | 171,241.88 |
| PV Costs | 80,000.00 | 26,086.96 | 22,684.31 | 19,725.49 | 148,496.75 |

- ROI = 55,000 / 170,000 = **32.35%**
- BEP = 1 + (45,000 − 10,000) / 45,000 = **1.78 years**
- NPV = **$22,745.13 > 0 → accept** (rounded cells give 171,242 − 148,496 = 22,746)
- **Marking idea:** classification 4 · table 4 · ROI 3 · BEP 3 · NPV 3 · decision 1.

**B2.**
- **(a) Arcs:** A→B, A→C, C→D, B→E, D→E, B→F, E→G, F→G.
- **(b) Paths:** **A → B → F → G = 1 + 3 + 4 + 1 = 9** · A → C → D → E → G = 1 + 2 + 2 + 2 + 1 = 8 · A → B → E → G = 1 + 3 + 2 + 1 = 7.
- **(c)** The critical path is **A → B → F → G**, and the project takes **9 weeks**.
- **(d)** C, D and E can each slip **1 week**, because the longest path through any of them is 8.
- **(e)** If D takes +2, path A → C → D → E → G becomes 10. The project takes **10 weeks (+1)**, and the new critical path is A → C → D → E → G.
- **(f)** A gets **crossed lines** (completed); B gets **one diagonal line** (partially completed) [W4-S24].

**Part C**
| # | Answer | Why / ref |
|---|---|---|
| 1 | **(d) SDLC** | the SDLC definition [W1a-S8]; a methodology is "a formalized approach to implementing the SDLC" [W1b-S12] |
| 2 | **(b) Throwaway prototyping** | the only option Excellent for both unclear requirements and unfamiliar technology [W1b-S46] |
| 3 | **(a) Product Owner** | "Only the Product Owner has the authority to cancel the Sprint" [W2-S30] |
| 4 | **(e) Lead Time** | the time from the commitment point to the delivery point [W2-S55] |
| 5 | **(e) "If we build it, will they come?"** | [W3-S35]; (a) is technical and (b) is economic |
| 6 | **(c)** | "As long as the NPV is greater than zero…"; ROI and BEP are the "naïve" techniques [W3-S32] |
| 7 | **(d) $0–$240,000 and 12–20 weeks** | ±100% cost, ±25% schedule [W4-S37]; (b) wrongly uses 100% on the schedule |
| 8 | **(e) +25% → 25 weeks; reduce scope if needed** | 3 ÷ 12 planned weeks = 25%, the low-risk row [W4-S41]. (d) uses the wrong base (3 ÷ 15); (b) is the moderate-risk action, which needs a different assumption; (a) is high risk; (c) contradicts W5a-S14 |
| 9 | **(b) completed** | crossed lines = completed; one diagonal = partial [W4-S24] |
| 10 | **(d) Group cohesiveness** | [W5a-S26] |
| 11 | **(b) procedural** | the S33 table lists it under procedural standards [W5a-S33] |
| 12 | **(e) BPI** | [W5b-S24] |
| 13 | **(a) unstructured interviews** | broad, roughly defined information at the start; structured interviews come later [W5b-S39] |
| 14 | **(c) facilitator** | neutral; "does not provide ideas or opinions" [W6-S6] |
| 15 | **(d) Traceability** | [W6-S29] |

**Part D**
- **D1. BPA vs BPI vs BPR**
  - Change: BPA = small (computers do some of the work; "least impact"); BPI = moderate (new technology or copying competitors); BPR = significant ("obliterating" the current way of working).
  - Time on the as-is system: "a significant time" / "much less" / "little time".
  - Techniques: BPA = problem analysis + root cause analysis; BPI = duration analysis, activity-based costing, informal benchmarking; BPR = outcome analysis, technology analysis, activity elimination.
  - Risk [S33]: Low–moderate / Low–moderate / **Very high**.
  - Refs: [W5b-S18, S22–S33].
- **D2. JAD vs interviews**
  - Who: interviews are usually one-on-one [W5b-S35]. JAD brings the project team, users and management together: 10–20 users, a neutral facilitator and 1–2 scribes [W6-S4, S6].
  - Steps: **5 each**; JAD copies the interview steps (select, design, prepare, conduct, follow up).
  - Report: an interview report **within 48 h** [W5b-S44]; a JAD post-session report after **a week or two** [W6-S12].
  - Table differences [W6-S34]: breadth Low vs **Medium**; integration Low vs **High**; user involvement Medium vs **High**; cost Medium vs **Low–Medium**. They are the same on depth (High) and type of information (as-is, improvements, to-be).
- **D3. Plan-driven vs agile**
  - Plan-driven: "all of the process activities are planned in advance and progress is measured against this plan". Agile: "planning is incremental and it is easier to change the process" [W1b-S16].
  - Plan-driven is used for **high-level** planning and agile for **low-level** planning [S5].
  - Examples: waterfall [S21]; XP or Scrum [S17].
  - The bold sentence: "There are no **right or wrong** software processes" [S16].
- **D4. System request and feasibility**
  - The 5 elements: **project sponsor, business need, business requirements, business value, special issues (or constraints)** [W3-S12–S15].
  - The 3 questions:
    - **Can we build it?** (technical);
    - **Should we build it? / Will it provide business value?** (economic);
    - **If we build it, will they come? / will it be used?** (organizational).
  - They are presented to the **approval committee (steering committee)**, which "decides whether the project should be undertaken" [W3-S16].
- **D5. Scrum events**
  - **Sprint** (≤ 1 month; contains all the other events) → **Sprint Planning** (≤ 8 h for a one-month Sprint) → **Daily Scrum** (15 min, daily) → **Sprint Review** (no time-box on the slides) → **Sprint Retrospective** (≤ 3 h for a one-month Sprint, after the Review) [W2-S29–S38].
  - **Only the PO** can cancel a Sprint, before its time-box ends, **when the Sprint Goal becomes obsolete** (the company changes direction, or market or technology conditions change). Cancellation is very uncommon [W2-S30].
- **D6. Jelled team, Ringelmann, team size**
  - The 5 characteristics: low turnover · strong identity · eliteness · the team owns the system · fun [W5a-S8–S10].
  - Ringelmann effect: "the tendency for individual members of a group to become increasingly less productive as the size of their group increases" [S6].
  - Team size: keep teams to **fewer than 8–10 people** and create **sub-teams** if more people are needed [S16]. "Adding staff resources does not translate into increased productivity" [S14].

**Part E**
**E1.** Refs: [W5b-S12–S14].

| # | Answer | Note |
|---|---|---|
| 1 | Functional, process-oriented | an action the system performs |
| 2 | Functional, information-oriented | like "retain customer order history for three years" |
| 3 | Nonfunctional, operational | technical environment ("work on any Web browser") |
| 4 | Nonfunctional, performance | speed ("not exceed 2 seconds") |
| 5 | Nonfunctional, security | who has authorized access |
| 6 | Nonfunctional, cultural & political | like "US and European currency" |
| 7 | Functional, information-oriented | like "real-time inventory levels at all warehouses" |
| 8 | Nonfunctional, **performance** ⚠️ | the slide files "24 hours per day, 365 days per year" under performance (reliability), not operational |
| 9 | Functional, process-oriented ⚠️ | "performance" here means the librarians', not the system's (like "salesperson performance" [S15]) |
| 10 | Nonfunctional, cultural & political | "legal requirements" ("comply with insurance industry standards") |

**E2.**
- **(a) Questionnaire.**
  - It suits "a large number of people" and systems used "outside the organization (e.g., by customers or vendors)" [W6-S13].
  - The table gives it as-is + improvements, **breadth High, cost Low** [S34].
  - Send it to a **sample**. Web response is "often only 5 to 30 percent" [S14], so plan the response-raising techniques [S17].
- **(b) BPR.**
  - It means "obliterating the current way of doing business" with new technology [W5b-S29].
  - S33 ratings: value High, cost High, breadth Very broad, risk Very high.
  - Activities: **outcome analysis, technology analysis, activity elimination**.
  - Spend **little time** on the as-is system [S29].
- **(c) Observation and document analysis.**
  - **Observation** "check[s] the validity of information gathered from indirect sources such as interviews" and shows "the reality of a situation" [W6-S22].
  - **Document analysis** of blank and completed forms: users adding information to existing forms is "**the most powerful indication that the system needs to be changed**" [W6-S21].
  - Neither gives to-be ideas (both are as-is only [S34]; ethnography "cannot identify new features" [S23]), so follow up with interviews or JAD.

---

## 9. Traps and slide errors (consolidated from all 7 notes files; checked against the slide images)

### 9.1 ⚠️⚠️ The errors that change an answer
| Slide | What it shows | Correct / how to answer |
|---|---|---|
| **W3-S27** | BEP = 2 + (41,000 − 14,000)/41,000 = 2 + **28,000**/41,000 = **2.68** | 41,000 − 14,000 = **27,000**, so BEP = 2 + 27,000/41,000 = **2.66 years**. The 8th-edition textbook prints the same slip. |
| **W3-S30** | Year-3 Total Benefits = **55,000** | It should be **57,000** (W3-S25). The PV shown, 42,825, is 57,000 / 1.331; 55,000 would give 41,322. |
| **W3-S28** | "$100 at a 10% rate of return … equivalent of $75 in today's terms" | The year is missing: it means $100 received in **Year 3** (100 / 1.331 = 75.13, S29). |
| **W3-S32** | title "Return on Investment"; "less than ???%"; "Answer 6.65" | The content is about **NPV**. 6.65% is right to within rounding (NPV = 0 at ≈ 6.66%). |
| **W4-S20** | Task 4 finishes "Tue **3/8/12**" | 3 weeks from Wed 2/26 ends on **3/18/12**, as the bar and the network diagram (S23) show. |
| **W4-S15 vs S20/S23** | the WBS gives task 2 the dependency "1" | The Gantt chart and the network diagram start task 2 on 1/1 with no predecessor. For the critical path, use S23: **17 weeks**. |
| **W4-S16** | task 7 = 4 weeks | Its subtasks' longest chain is 4.5 weeks. Quote the WBS value (4) if asked. |
| **W4-S23/S25** | the critical tasks are marked 5, 6, 7, 8, 10 | **Task 1 is also on the critical path** (1 → 5 → 6 → 7 → 8 → 10); it is just complete, so it isn't marked. |
| **W1b-S56 vs W2-S28/S29** | Scrum sprint = "**thirty working days**" vs "**one month or less**" / "1-4 Week Sprint" | Thirty working days is about 6 weeks, which conflicts with the W2 deck. Quote the number from the deck the question is based on. For general Scrum questions the W2 deck (≤ 1 month) is the dedicated source. |
| **W5a-S26 vs S4** | conflict is "the **third** component of staffing" | It is the 4th bullet on S4. If asked for "the third component", answer **minimizing conflict**. |
| **W5a-S3 (Mya)** | 5 options; "BEST solution?" | Answer **(c) 16% → ~10.5 weeks**. ⚠️ Ambiguous: see §2.5. |
| **W6-S3 MCQ1** | "Which is NOT a purpose of the requirements definition?" | **Create cost/benefit analysis**. ⚠️ "a very high-level explanation" is also arguably NOT a purpose: see §2.6. |

### 9.2 Calculation traps
- **Year 0 is not discounted** [W3-S30].
- **Year 0 is not counted** as a "year of negative cash flow" in BEP [W3-S27].
- **ROI uses the Total column**, including Year 0 costs [W3-S26].
- **(Parentheses) mean negative** [W3-S25, S31].
- **Classify before you calculate:**
  - "Hardware repairs", "User training" and "Software upgrades" are **operational** (every year);
  - "Data conversion tools", "Vendor installation" and "Office space and equipment" are **development** costs (Year 0);
  - an **intangible with no value** stays out [W3-S23, S33].
- **"Life cycle n years"** = Year 0 + Years 1…n (the S25 layout). State this assumption.
- **The % behind a missed date** = weeks late ÷ the **planned** weeks of the late part (2 ÷ 8 = 25%), not ÷ the actual weeks [W4-S41].
- **Hurricane:** ±100% applies to **cost** and ±25% to **schedule**. Don't swap them [W4-S37].
- **PERT weights** are 1-4-1 ÷ 6. **The critical path is the longest path**, not the shortest [W4-S22, S25].

### 9.3 Wording and classification traps
- **Skills:** "analytical thinking" and "plan your time" are **soft** skills [W1b-S6].
- **Agile Manifesto:** the left side is valued *more*, but "there is value in the items on the right" [W1b-S41].
- **Classes:** Phased and Prototyping are **RAD**, not Structured; Parallel is **Structured** [W1b-S17].
- **The S46 table:** the V-model and Scrum are not rated in it. Phased and Throwaway are never Poor.
- **Requirement types:**
  - Web-browser access → **nonfunctional (operational)** [W5b-S13];
  - "24 hours per day, 365 days per year" → **performance**, not operational [W5b-S14];
  - "monthly rankings of salesperson performance" → **functional** [W5b-S15];
  - "Country managers are permitted to authorize customer user interfaces" → **cultural & political** [W5b-S14].
- **Interview questions:** "How do customers place orders?" and "What information is missing from the monthly sales report?" are listed as **closed-ended** [W5b-S37].
- **Two "most commonly used" claims:** the interview = the most commonly used **gathering** technique [W5b-S35]; problem analysis = "probably the most commonly used" **analysis** technique [W5b-S23].
- **"Business requirements"** means all analysis-phase requirements on W5b-S9, but only the top "why" level on the S10 diagram. **"User requirement"** in W2-S13 is a user story; in W5b-S9 "user requirements" is another name for business requirements.
- **S33 values:** BPA and BPI have the **same risk** (Low–moderate). BPA value = Low–moderate; BPI cost = Low–moderate [W5b-S33].
- **Time on the as-is system:** BPA > BPI > BPR [W5b-S22, S24, S29].
- **Report timing:** interview report within **48 h**; JAD post-session report after **a week or two** [W5b-S44; W6-S12].
- **Two check lists:** the 5 requirements checks [W6-S26] and the 4 review checks [W6-S29] both contain **Verifiability**, worded differently.
- **Look-alike words:** *validation* = demonstrating the requirements define the system the customer wants [S25]; *validity* = "best support the customer's needs?" [S26].
- **JAD naming:** "Joint Application **Development**" [W6-S4; W5b-S19] vs "Joint Application **Design**" [W6-S34; W1b-S26]. Both mean JAD.
- **Team sizes:** the Scrum Dev Team is "typically 5–9" [W2-S22]; the general staffing rule is "fewer than eight to ten" [W5a-S16]. Different contexts.
- **No titles:** "Scrum recognizes no titles" [W2-S20] vs "Ideally, no titles but rarely a possibility" [W2-S22].
- **Scrum artifacts:** only **2** are listed (Product and Sprint Backlog) [W2-S39]. The Sprint Review has **no time-box** on the slides [W2-S36–S37].
- **Iteration length:** "1 to 4 weeks" [W2-S11] vs "10 to 15 days" [W2-S12]. They are compatible (about 2 weeks).
- **SDLC phases:** 4 in W1a vs 5 (with Post production) in W1b-S4. Default to the 4 phases unless asked about maintenance.
- **Feasibility question wording varies** [W3-S16, S18–S22, S35]: economic = "Should we build it?" or "Will it provide business value?"; organizational = "If we build it, will they come?" or "…will it be used?". The system request's last element is "special issues" (S12) or "Special Issues or Constraints" (S15).
- **W4-S26 vs W5a-S2:** W4 says trade-offs of "functionality, time, cost"; the MCQ writes "size, time and cost".

### 9.4 Cosmetic typos (learn the idea, not the typo)
- **W1a:** S2 "higher than B+ (B+ or A0 or A+)" means B+ or higher · S3 "hange management / nalyst" → change management analyst.
- **W1b:**
  - S4: "crated", "in to", "continues" → created, into, continuous;
  - broken ligatures: "fi rms", "defi ning", "soft ware";
  - S11: method names broken by line-wraps;
  - S24, S27, S38: missing full stops;
  - S45: stray asterisks.
- **W2:**
  - S4–S5: "Principle", "costumer's", "Project Owner", "build";
  - S12 "stroy" · S13 "Tast" · S14 garbled · S15 "a sprint";
  - S33 "The product set" (the product owner sets) · S43 unclear · S51 benefit 5 garbled · S55 "is the called";
  - S7/S11: "First Time to get real feedback" in the agile picture. Go by the S11 text instead: agile "frequently takes the feedback".
- **W3:** S1 "Planing" · S26 missing minus sign and "measureof" · S40 "then" → when.
- **W4:** S1 "Managment" · S15 "topdown" and a missing figure reference · S20 "Grantt" · S22 stray "a" · S25/S39 "in Figure" with no number · S45 "Time boxing" · S46–S47 grammar.
- **W5a:**
  - S1 "Managment" · S3 "12 week" · S5 unclosed quote, "DeMarco/Demarco";
  - S9 double negative ("will not go unpunished") · S11 "truely" · S16 split sentence;
  - S21 "Some authors suggests" · S22 missing "is" · S24 garbled source line.
- **W5b:**
  - S10 "Stake Holder", "How- Product", three spellings of "nonfunctional";
  - S22 "a significant time" · S25 "are totaled" · S39 "then" → than · S35/S44 "postinterview"/"Post-Interview";
  - S26 doesn't say whether the 30 days are calendar or working days.
- **W6:**
  - S6 "proceedings" → proceeds · S7 "these problems" never listed · S20 overlapping images hide part of the form;
  - S23 "the way I which" → in which · S23–S33 footer "SEN 301 REQUIREMENTS ENGINEERING" (slides borrowed from another course);
  - S26 Realism has no "?" · S37 Appendices sentence cut off at "industry".

### 9.5 Contradictions between the notes files (found while building this review)
- **BEP of the class example:**
  - The W4 notes (§2.3, step 4) quote "2 + (41,000 − 14,000)/41,000 = **2.68** years [W3-S27]" without correcting it.
  - The W3 notes correct it to **2.66**. Use **2.66**.
- **Sprint length:**
  - The W1 notes (likely exam Q17) mark "a sprint lasts thirty working days" **True**, from W1b-S56.
  - The W2 notes give the Sprint as "**one month or less**" (W2-S29).
  - Each set of notes is faithful to its own deck; the slides themselves conflict (§9.1).
- **No other contradictions found.** The W4 and W5a notes agree on all the review-MCQ answers (Micah (a), Mya (c), trade-offs, scope creep). The Quiz 1 numbers in the W4 notes match this file's script exactly.

---

## 10. Last-48-hours checklist (priority order; Quiz-1 skills first)
- [ ] **1.** I can draw **Phased, Waterfall and Parallel** from memory in under 3 minutes each, with every box, arrow and output labelled, plus one pro and one con. [§1(a) ①③④]
- [ ] **2.** I can draw **Prototyping, Throwaway prototyping, the V-model and Agile**, and say how a "System prototype" differs from a "Design prototype". [§1(a) ②⑤⑥⑦]
- [ ] **3.** I can **classify any cash-flow item** with the W3-S23 table, including the traps (hardware repairs, user training → operational; intangibles with no value → left out). [§5.6]
- [ ] **4.** I can build the cash-flow table and get **ROI, BEP and NPV** for any rate in about 15 minutes. Year 0 is not discounted and not counted in BEP. [§1(b)]
- [ ] **5.** I can redo **Quiz 1 V1–V4**: 8.00% / 2.50 / $8,929.92 · 43.48% / 1.57 / $64,079.64 · 62.50% / 1.33 / $85,490.26 · 80.00% / 1.18 / $101,712.96. [§2.1]
- [ ] **6.** I can solve **W3-S40/S41** (Year 3, BEP 2.33; 45.45% / 1.17 / $34,132.23) and explain the **S32 lesson** (ROI and BEP "naïve", NPV decides), including the 6.65% answer and the slide errors (2.66 not 2.68; 57,000 not 55,000). [§2.2–2.3, §9.1]
- [ ] **7.** I can list every path in a network diagram, find the **critical path** and the spare time, compute **PERT** (o + 4m + p)/6, and read the diagonal and crossed-line marks. [§6.2, §5.9]
- [ ] **8.** I can answer Micah- and Mya-style cases: **±100% cost / ±25% schedule**, and the missed-date table (high / moderate / low risk; % = weeks late ÷ planned weeks). [§2.5, §5.11]
- [ ] **9.** I can reproduce the **"Which Methodology to Use?"** table and choose a methodology for a scenario. [§5.2]
- [ ] **10.** I can classify requirements as **functional** (process / information) or **nonfunctional** (operational / performance / security / cultural & political), including the traps. [§5.14, §2.7]
- [ ] **11.** I can reproduce the **BPA / BPI / BPR** table (value, cost, breadth, risk; time on the as-is system) and name the 2 / 3 / 3 techniques. [§5.15]
- [ ] **12.** I can reproduce the **S34 techniques table** and pick a technique (or two) for a scenario. [§5.20]
- [ ] **13.** I can name the **Scrum** roles, events (Sprint ≤ 1 month, Planning ≤ 8 h, Daily 15 min, Retrospective ≤ 3 h) and artifacts, and say who cancels a Sprint and why. [§5.4]
- [ ] **14.** I can list the **5 system request elements**, the **3 feasibility questions**, the technical risk factors, and the champion / management / users table. [§5.6–5.7]
- [ ] **15.** I can explain **interviews** (5 steps, 3 question types and the closed-ended trap, structured vs unstructured, top-down vs bottom-up, 48 h) and **JAD** (roles, 5 steps, ground rules, e-JAD, a week or two). [§5.16–5.17]
- [ ] **16.** I can list the **jelled-team** traits, the Ringelmann effect and the team-size rule, the **6 don'ts**, the **6 conflict strategies**, the 3 CASE types and the **5 types of standards**. [§5.13]
- [ ] **17.** I can list the **5 requirements checks**, the **3 validation techniques**, the **4 review checks**, the 9 questionnaire guidelines and the **10 proposal sections**. [§5.18, §5.21–5.22]
- [ ] **18.** I can define the **SDLC**, a **system** (with its 3 constraints), a **methodology** and **plan-driven vs agile**, and complete "There are no right or wrong software processes". [§4, §5.1–5.2]
- [ ] **19.** I can explain **Kanban** (3 concepts, WIP limit, lead time) and **DevOps** (∞ loop, 5 principles, 3 benefits). [§5.5]
- [ ] **20.** **Admin:** I have confirmed in the Telegram group the midterm date and room (Tue 27 or Thu 29 Oct?), whether calculators are allowed, and whether W7 (UML use cases and activity diagrams) is included. 🔎
