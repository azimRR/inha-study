# Week 4 — Project management (WBS, Gantt, network diagram/CPM, estimation, scope, risk) + Quiz 1 (CLASS NOTES — from slides only)
> Source: 4_1 Project managment.pdf, 47 slides. Refs [W4-S#].
> **Track A only.** Everything here comes from the class slides. Links to other class decks are written [W1b-S#], [W3-S#], [W5a-S#]. Anything the slides do not explain is marked **🔎 Look up in Track B**.
> **Legend:** ⭐ = high-yield · ⭐⭐ = already used in a class question (Quiz 1, or the review questions at the start of W5a) · ⚠️ = typo or inconsistency on the slide · "(bold)" or **bold** = the slide's own emphasis.

---

## 1. Big picture

- **Where this lecture sits.** The Planning phase has two halves. Part 1 is *Project Initiation*: the system request and the feasibility analysis, covered in W3. Part 2 is *Project Management*: "Develop the work plan · Staff the project · Monitor & control the project" [W3-S3, W1a-S10]. The task checklist on [W4-S6] has the five initiation items ticked. The project-management items are still open: estimate time, identify tasks, WBS, PERT charts, Gantt charts, manage scope, staff the project, project charter, CASE repository, standards, documentation, and assess and manage risk. Those open items are this lecture's agenda; staffing continues in W5a.
- ⭐ **Project management** is "the process of planning and controlling the project within a specified time frame, at minimum cost, with the desired outcomes" [S7]. The slides classify projects in **7 ways** [S8], select them in **4 steps** [S9] and run them through **5 stages** (initiation → planning → execution → monitoring & controlling → closure) [S10].
- ⭐ **Three traditional tools: WBS, Gantt chart, network diagram** [S11–S12]. First you identify the tasks and their durations. Then you organise them in a WBS, and the WBS "drive[s] the creation of Gantt charts and network diagrams" [S14].
- ⭐ **WBS**: a hierarchically numbered list of tasks. At a minimum it records each task's **duration, current status and dependencies** [S12, S15–S17]. A **task** is a unit of work, described by 10 pieces of information [S13].
- ⭐ **Gantt chart**: a horizontal bar chart that shows the WBS graphically. Tasks are rows and time runs across the top. Bars are filled in as work progresses. **Milestones are upside-down triangles or diamonds**, **arrows show dependencies** and **names show the people assigned**. Keep it to about 20–30 tasks [S18–S21].
- ⭐ **Network diagram**: a node-and-arc flowchart, with time estimates in the nodes and dependencies on the arcs. A **diagonal line** through a node means the task is partially complete; **crossed lines** mean it is complete [S22–S24]. **PERT** handles uncertain estimates with the weighted average (optimistic + 4 × most likely + pessimistic) / 6 [S22]. **CPM** finds the **critical path, the longest path**: if any task on it is late, the whole project is late [S25]. The class example marks tasks 5, 6, 7, 8 and 10 as critical. I verified this in §6: path 1→5→6→7→8→10 takes 17 weeks.
- ⭐ **Estimation and the workplan.** Project management means trade-offs among **functionality, time and cost**. Estimates come from experience, from similar projects and from experienced developers. They should be conservative and refined with actual values [S26–S27]. The workplan is a *dynamic* schedule; for object-oriented / agile projects it is iterative and incremental [S28–S29]. Classic WBSs have **three underlying problems** [S30–S32].
- ⭐ **Keeping the project under control.** **Scope creep** is the most common reason for schedule and cost overruns [S33, S45]. **Timeboxing** (6 steps) puts the deadline above functionality [S34–S35]. Estimates are refined over time. In the **hurricane model**, a well-done plan made at the end of inception still has a **100% margin of error for cost and a 25% margin of error for schedule** [S36–S38]. When a schedule date is missed there are **3 possible actions**, rated high, moderate and low risk [S39–S41].
- ⭐ **Risk management** is "the process of assessing and addressing the risks that are associated with developing a project". The slides give its causes, a six-gear picture and a risk-assessment template [S42–S44].
- **JIRA** is the tool support: Scrum and Kanban boards, business project templates, and the issue types Sub-Task / Bug / Epic / Story / Task [S46–S47].

---

## 2. ⭐⭐ QUIZ 1 (slides S2–S5): all 4 versions, word for word, with answers

### 2.0 Overview: what Quiz 1 looked like
- There are **4 versions (V1–V4)**. Each version has the **same two open-response tasks**. There are **no answer options** (it is not multiple choice):
  - **Part A**: "Depict graphically: *<methodology>* development methodology." You draw a class diagram from memory; the diagrams are in **W1b**.
  - **Part B**: a cash-flow problem: "Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = X%". The method is from **W3**, and the answer has three values.
- **Count: 2 questions per version (Part B has 3 sub-answers), so 8 tasks across the four versions.**
- **What changes between versions** (everything else is identical):

| | V1 [S2] | V2 [S3] | V3 [S4] | V4 [S5] |
|---|---|---|---|---|
| Methodology to draw | **Phased** | **Waterfall** | **Parallel** | **Phased** |
| Data conversion tools (dev.) | $10 000 | $20 000 | $30 000 | $40 000 |
| User training (oper.) | $20 000 | $10 000 | $10 000 | $10 000 |
| Increased sales (benefit) | $20 000 | $40 000 | $60 000 | $80 000 |
| Rate of return | 5% | 10% | 15% | 20% |

These items are the same in every version: Office space and equipment $40 000, Vendor installation $50 000, Software upgrades $20 000, Operational team salaries $10 000, Reduction in staff $40 000, Better supplier prices $30 000, and a project life cycle of 3 years.

### 2.1 Word-for-word transcription
On the slides, the methodology name and the three group headings are **bold**, and the slide uses a typewriter font. ⚠️ "next cash flows were identified" means "the following cash flows were identified". The same wording appears in W3's practice slides [W3-S40, W3-S41].

**Q1 V1 [W4-S2]**
```
Q1 V1
Depict graphically: Phased development methodology.
During Project Planning phase, next cash flows were identified:
Development costs
◦ Office space and equipment: $40 000
◦ Vendor installation: $50 000
◦ Data conversion tools: $10 000
Operational costs
◦ Software upgrades: $20 000
◦ Operational team salaries: $ 10 000
◦ User training: $ 20 000
Tangible benefits
◦ Increased sales: $20 000
◦ Reduction in staff: $40 000
◦ Better supplier prices: $30 000
Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = 5%
```

**Q1 V2 [W4-S3]**
```
Q1 V2
Depict graphically: Waterfall development methodology.
During Project Planning phase, next cash flows were identified:
Development costs
◦ Office space and equipment: $40 000
◦ Vendor installation: $50 000
◦ Data conversion tools: $20 000
Operational costs
◦ Software upgrades: $20 000
◦ Operational team salaries: $ 10 000
◦ User training: $ 10 000
Tangible benefits
◦ Increased sales: $40 000
◦ Reduction in staff: $40 000
◦ Better supplier prices: $30 000
Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = 10%
```

**Q1 V3 [W4-S4]**
```
Q1 V3
Depict graphically: Parallel development methodology.
During Project Planning phase, next cash flows were identified:
Development costs
◦ Office space and equipment: $40 000
◦ Vendor installation: $50 000
◦ Data conversion tools: $30 000
Operational costs
◦ Software upgrades: $20 000
◦ Operational team salaries: $ 10 000
◦ User training: $ 10 000
Tangible benefits
◦ Increased sales: $60 000
◦ Reduction in staff: $40 000
◦ Better supplier prices: $30 000
Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = 15%
```

**Q1 V4 [W4-S5]**
```
Q1 V4
Depict graphically: Phased development methodology.
During Project Planning phase, next cash flows were identified:
Development costs
◦ Office space and equipment: $40 000
◦ Vendor installation: $50 000
◦ Data conversion tools: $40 000
Operational costs
◦ Software upgrades: $20 000
◦ Operational team salaries: $ 10 000
◦ User training: $ 10 000
Tangible benefits
◦ Increased sales: $80 000
◦ Reduction in staff: $40 000
◦ Better supplier prices: $30 000
Find: ROI, BEP and NPV, if project life cycle is 3 years and rate of return = 20%
```

### 2.2 Part A answers: how to "depict graphically" each methodology (from W1b)
W1b sorts the methodologies into classes: **Structured Development** (Waterfall, Parallel), **Rapid Application Development** (Phased, Prototyping) and **Agile** (XP, Scrum) [W1b-S17].
**Drawing conventions in the class diagrams** [W1b-S20, S25, S28]:
- Each phase is drawn as a box.
- A **solid curved arrow** goes forward to the next phase.
- A **dashed, wavy arrow** goes back to the previous phase.
- The result is a rounded **"System"** box.

**(a) Waterfall development — needed for V2** [W1b-S20; text W1b-S18, S21, S23]
```
[Planning]
     \___ solid arrow ↘                 ↖~~ dashed wavy arrow back
          [Analysis]
               \___ ↘                        ↖~~
                    [Design]
                         \___ ↘                    ↖~~
                              [Implementation]
                                     \___ ↘
                                          (System)
```
- Draw it as a descending **staircase (cascade)**: Planning → Analysis → Design → Implementation → System. Solid arrows go down to the next phase. Dashed wavy arrows go from each phase back up to the previous one.
- The text to quote: "Because of the cascade from one phase to another, this model is known as the 'waterfall model' or software life cycle. The waterfall model is an example of a plan-driven process—in principle, you must plan and schedule all of the process activities before starting work on them." [W1b-S21]
- Alternative class diagram (Royce, 1970) [W1b-S19]. It is a staircase of **Requirements Definition → System and Software Design → Implementation and Unit Testing → Integration and System Testing → Operation and Maintenance**. A line along the bottom carries feedback arrows back up to every earlier stage.

**(b) Parallel development — needed for V3** [W1b-S25; text W1b-S24]
```
[Planning] → [Analysis] → [Design]   (general design for the whole system)
                               │
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                    ▼
   ( Subproject 1 )     ( Subproject 2 )     ( Subproject 3 )
     [Design]             [Design]             [Design]
        ▼                    ▼                    ▼
   [Implementation]     [Implementation]     [Implementation]
          └────────────────────┼────────────────────┘
                               ▼
                         [Integration]
                               ▼
                           (System)
```
- Draw one general design. It splits into **subprojects**, and each subproject is a Design → Implementation pair, circled with a dotted ellipse labelled "Subproject 1/2/3". All the subprojects merge into **Integration**, which leads to **System**. Add the dashed wavy back-arrows between consecutive boxes.
- The text to quote: it "performs a general design for the whole system and then divides the project into a series of distinct subprojects that can be designed and implemented in parallel. Once all subprojects are complete, the separate pieces are integrated and the system is delivered". Its primary advantage: "it can reduce the time to deliver a system" [W1b-S24].

**(c) Phased (iterative) development — needed for V1 and V4** [W1b-S28; text W1b-S27, S31, S32]
```
[Planning] → [Analysis] ──► ( [Analysis] → [Design] → [Implementation] ) ──► (System version 1)
                                                                                    │
                  ┌─────────────────────────────────────────────────────────────────┘
                  ▼
                ( [Analysis] → [Design] → [Implementation] ) ──► (System version 2)
                                                                        │
                  ┌─────────────────────────────────────────────────────┘
                  ▼
                ( [Analysis] → [Design] → [Implementation] ) ──► (System version 3)
```
- Planning and the first Analysis happen once. Then comes a **series of Analysis → Design → Implementation cycles**, each circled with a dotted ellipse. Each cycle delivers a **System version** (1, 2, 3).
- A long arrow runs from each delivered version back into the **next cycle's Analysis**, because users' experience with version *n* feeds the requirements for version *n+1*. Within each cycle, draw the dashed wavy back-arrows.
- The text to quote: "breaks an overall system into a series of versions that are developed sequentially … The most important and fundamental requirements are bundled into the first version of the system" [W1b-S27]. Advantage: it is quick to get "a useful system into the hands of the users" [W1b-S31]. Drawback: "users begin to work with systems that are intentionally incomplete" [W1b-S32].

### 2.3 Part B: the class method (from W3) that you must follow
1. **Classify** each item as a development cost, an operational cost, a tangible benefit or an intangible benefit. The class list is [W3-S23]: *Development costs* include development team salaries, consultant fees, development training, hardware and software, vendor installation, office space and equipment, data conversion costs. *Operational costs* include software upgrades, software licensing fees, hardware repairs, hardware upgrades, operational team salaries, communications charges, user training. *Tangible benefits* include increased sales, reductions in staff, reductions in inventory, reductions in IT costs, better supplier prices. *Intangible benefits* include increased market share, increased brand recognition, higher quality products, improved customer service, better supplier relations.
2. **Build the cash-flow table**: Year 0, Year 1, … with rows Total Benefits / Total Costs / Net Benefits / Cumulative Net Cash Flow [W3-S25]. "IT projects commonly involve an initial investment that produces a stream of benefits over time, along with some ongoing support costs" [W3-S24].
3. **ROI** = (Total Benefits − Total Costs) / Total Costs. The class example is 14,000 / 138,000 = 10.14% [W3-S26].
4. **BEP** is worked out "(In the year in which Cumulative Cash Flow turns positive)": BEP = Number of years of negative cash flow + (That year's Net Cash Flow − That year's Cumulative Cash Flow) / That year's Net Cash Flow. The class example is 2 + (41,000 − 14,000)/41,000 = 2.68 years [W3-S27]. ⚠️ The slide's arithmetic is off: 41,000 − 14,000 = 27,000 (not 28,000), so the correct BEP is 2 + 27,000/41,000 = **2.66 years**. See the Week 3 notes and the midterm review §9. In that example the "years of negative cash flow" are Years 1 and 2; **Year 0 is not counted**.
5. **PV** = Cash flow amount / (1 + rate of return)ⁿ, where "n is the year in which the cash flow occurs". The class example is 100/(1.10)³ = 75.13 [W3-S29].
6. **NPV** = Σ PV of Total Benefits − Σ PV of Total Costs. The class example is 125,056 − 131,029 = (5,973) [W3-S31].
7. **Decision**: "As long as the NPV is greater than zero, the project is considered economically acceptable" [W3-S32].

**Assumptions I had to make**, because the quiz text does not state them:
- **Development costs are one-time, in Year 0.**
- **Operational costs and tangible benefits are per-year amounts, repeated in Years 1, 2 and 3 with no growth.** [W3-S33] says to apply a growth rate "if necessary", and none is given.

This matches the layout of the class example [W3-S25]. 🔎 Look up in Track B, or ask the professor: confirm this timing convention for the exam.
⚠️ A heads-up about W3: [W3-S30] prints the Year-3 benefit as 55,000, but its PV of 42,825 equals 57,000/1.331. Use 57,000, as on [W3-S25].

### 2.4 Part B answers, version by version (all numbers verified)

**V1 (S2), rate 5%.** Development costs = 40,000 + 50,000 + 10,000 = **100,000** (Year 0). Operational costs = 20,000 + 10,000 + 20,000 = **50,000 per year**. Benefits = 20,000 + 40,000 + 30,000 = **90,000 per year**.

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | – | 90,000 | 90,000 | 90,000 | 270,000 |
| Total Costs | 100,000 | 50,000 | 50,000 | 50,000 | 250,000 |
| Net Benefits | (100,000) | 40,000 | 40,000 | 40,000 | 20,000 |
| Cumulative Net Cash Flow | (100,000) | (60,000) | (20,000) | 20,000 | |
| (1 + 0.05)ⁿ | 1 | 1.05 | 1.1025 | 1.157625 | |
| PV of Total Benefits | – | 85,714.29 | 81,632.65 | 77,745.38 | **245,092.32** |
| PV of Total Costs | 100,000.00 | 47,619.05 | 45,351.47 | 43,191.88 | **236,162.40** |

- **ROI** = (270,000 − 250,000) / 250,000 = 20,000 / 250,000 = **8.00%**
- **BEP**: cumulative cash flow turns positive in Year 3, after 2 negative years, so BEP = 2 + (40,000 − 20,000)/40,000 = **2.50 years**
- **NPV** = 245,092.32 − 236,162.40 = **$8,929.92 > 0, so the project is economically acceptable**
- V1 is the "tight" version. Its NPV would turn negative at a rate above about 9.7%; at 10% it would be about −$526. That is exactly the W3-S32 lesson: "naïve" ROI and BEP can look fine while NPV says no.

**V2 (S3), rate 10%.** Development costs = 40,000 + 50,000 + 20,000 = **110,000**. Operational costs = 20,000 + 10,000 + 10,000 = **40,000 per year**. Benefits = 40,000 + 40,000 + 30,000 = **110,000 per year**.

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | – | 110,000 | 110,000 | 110,000 | 330,000 |
| Total Costs | 110,000 | 40,000 | 40,000 | 40,000 | 230,000 |
| Net Benefits | (110,000) | 70,000 | 70,000 | 70,000 | 100,000 |
| Cumulative Net Cash Flow | (110,000) | (40,000) | 30,000 | 100,000 | |
| (1 + 0.10)ⁿ | 1 | 1.1 | 1.21 | 1.331 | |
| PV of Total Benefits | – | 100,000.00 | 90,909.09 | 82,644.63 | **273,553.72** |
| PV of Total Costs | 110,000.00 | 36,363.64 | 33,057.85 | 30,052.59 | **209,474.08** |

- **ROI** = 100,000 / 230,000 = **43.48%**
- **BEP**: positive in Year 2, after 1 negative year, so BEP = 1 + (70,000 − 30,000)/70,000 = **1.57 years**
- **NPV** = 273,553.72 − 209,474.08 = **$64,079.64 > 0, acceptable**

**V3 (S4), rate 15%.** Development costs = 40,000 + 50,000 + 30,000 = **120,000**. Operational costs = **40,000 per year**. Benefits = 60,000 + 40,000 + 30,000 = **130,000 per year**.

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | – | 130,000 | 130,000 | 130,000 | 390,000 |
| Total Costs | 120,000 | 40,000 | 40,000 | 40,000 | 240,000 |
| Net Benefits | (120,000) | 90,000 | 90,000 | 90,000 | 150,000 |
| Cumulative Net Cash Flow | (120,000) | (30,000) | 60,000 | 150,000 | |
| (1 + 0.15)ⁿ | 1 | 1.15 | 1.3225 | 1.520875 | |
| PV of Total Benefits | – | 113,043.48 | 98,298.68 | 85,477.11 | **296,819.27** |
| PV of Total Costs | 120,000.00 | 34,782.61 | 30,245.75 | 26,300.65 | **211,329.00** |

- **ROI** = 150,000 / 240,000 = **62.50%**
- **BEP** = 1 + (90,000 − 60,000)/90,000 = **1.33 years**
- **NPV** ≈ 296,819.27 − 211,329.00 = **$85,490.26** (exact value; rounded cells give .27) **> 0, acceptable**

**V4 (S5), rate 20%.** Development costs = 40,000 + 50,000 + 40,000 = **130,000**. Operational costs = **40,000 per year**. Benefits = 80,000 + 40,000 + 30,000 = **150,000 per year**.

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | – | 150,000 | 150,000 | 150,000 | 450,000 |
| Total Costs | 130,000 | 40,000 | 40,000 | 40,000 | 250,000 |
| Net Benefits | (130,000) | 110,000 | 110,000 | 110,000 | 200,000 |
| Cumulative Net Cash Flow | (130,000) | (20,000) | 90,000 | 200,000 | |
| (1 + 0.20)ⁿ | 1 | 1.2 | 1.44 | 1.728 | |
| PV of Total Benefits | – | 125,000.00 | 104,166.67 | 86,805.56 | **315,972.22** |
| PV of Total Costs | 130,000.00 | 33,333.33 | 27,777.78 | 23,148.15 | **214,259.26** |

- **ROI** = 200,000 / 250,000 = **80.00%**
- **BEP** = 1 + (110,000 − 90,000)/110,000 = **1.18 years**
- **NPV** = 315,972.22 − 214,259.26 = **$101,712.96 > 0, acceptable**

### 2.5 Answer summary

| Version | Part A: draw | Dev. (Y0) | Oper./yr | Benefits/yr | Net/yr | ROI | BEP | NPV |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| V1 (5%) | Phased [W1b-S28] | 100,000 | 50,000 | 90,000 | 40,000 | 8.00% | 2.50 yrs | $8,929.92 |
| V2 (10%) | Waterfall [W1b-S20/S19] | 110,000 | 40,000 | 110,000 | 70,000 | 43.48% | 1.57 yrs | $64,079.64 |
| V3 (15%) | Parallel [W1b-S25] | 120,000 | 40,000 | 130,000 | 90,000 | 62.50% | 1.33 yrs | $85,490.26 |
| V4 (20%) | Phased [W1b-S28] | 130,000 | 40,000 | 150,000 | 110,000 | 80.00% | 1.18 yrs | $101,712.96 |

There is an optional W3-style follow-up. [W3-S32] asks for the rate below which NPV turns positive; its answer is "6.65" for the class example. For the quiz versions, NPV = 0 at about **9.70% (V1), 40.87% (V2), 54.77% (V3) and 66.18% (V4)**.

### 2.6 What Quiz 1 tells us about the professor's question style
Quiz 1 sat at the start of the W4 lecture, but it tested the **two previous lectures, not W4**. Part A tested W1b, structured and RAD methodologies; Part B tested W3, economic feasibility.

**"Depict graphically"** means reproducing a class diagram from memory. The versions only swapped the methodology: Phased twice, Waterfall once, Parallel once. So you should be able to draw **every** diagram from the slides, and by extension W4's own pictures: a WBS, a Gantt chart, a network diagram, the hurricane model.

**The numeric problem copies the class's own practice slide almost word for word.** Compare [W3-S41]: "During Project Planning phase, next cash flows were identified: … Find: ROI, BEP and NPV, if project life cycle is 2 years and rate of return = 10 %". Each version changes only a few numbers (one development cost, one benefit, one operational cost in V1) and the rate. So learn the *procedure*: the cash-flow table, then ROI, BEP and PV/NPV, then the conclusion.

All the line items come from the W3-S23 category list. The quiz pre-grouped them into Development / Operational / Tangible benefits, but the W3 practice slides listed them **mixed**, e.g. "Hardware repairs", "Development team salaries" [W3-S40/S41]. Be ready to **classify mixed items yourself**.

There were no multiple-choice options, so method and working are what earn marks. Finally, the review questions at the very start of the next deck [W5a-S2–S3] test **this W4 deck** in a different format: fill-in-the-blank and scenario MCQs with 5 options each (§2.7). Expect W4 to be examined **both** by calculation (CPM/PERT, missed-schedule %, hurricane margins) **and** by recall MCQs.

### 2.7 Related: the professor's review MCQs on THIS deck (from [W5a-S2–S3]), answered with W4 slides
Quoted word for word from W5a. No answer is marked on the slides.
1. "The science (or art) of project management is in making ___________ of size, time and cost." Options: Benchmark comparisons · Analytical and educated estimates · Trade-offs · Maximum calculations · Minimum calculations. **Answer: Trade-offs** [W4-S26]. W4 itself says the trade-offs are among "the functionality of the system, the time to complete the project … and the cost of the project".
2. "The most common reason for schedule and cost overruns is ___________" Options: Team conflict · Lack of communication from project manager to project team · Lack of support by sponsor and champion · Scope creep · Adding people to a late project. **Answer: Scope creep** [W4-S33].
3. "Micah is a fairly new project manager. He estimated for a project plan (on the planning phase) that the project would cost $50,000 and take 20 weeks. According to the margin of error guidelines for well-done estimates, that could range from:" Options: $0 and $100,000 – and between 15 and 25 weeks · $10,000 and $60,000 – and between 12 and 28 weeks · $0 and $100,000 – and between 0 and 40 weeks · $5,000 and $100,000 – and between 10 and 30 weeks · $25,000 and $75,000 – and between 10 and 30 weeks. **Answer: $0 and $100,000, and between 15 and 25 weeks.** A 100% margin on cost gives 50,000 ± 50,000; a 25% margin on schedule gives 20 ± 5 weeks [W4-S37].
4. "Mya is managing a project. Unfortunately, the entire project team lost four days due to a hurricane in the area and a couple of the project team lost even more time when dealing with insurance claims and rebuilding. At the six-week mark of a nine-week project, she figures the team is one week behind. What might be the BEST solution?" Options:
   - Add several people to the project to get it back to schedule
   - Do not change the schedule, but expect the project and development teams to work longer days and every-other weekend.
   - Since the project is about 16% behind, increase the project to about 10-and-one-half weeks
   - Since the project is about 20% behind, increase the project to about 12 week.
   - Add three people to the project – AND – increase the overall project by one week (to a total of ten weeks)

   **The most defensible answer from the slides is the third option, "about 16% behind, about 10.5 weeks".** It is the W4-S41 action "Increase the entire schedule by the percentage of weeks that you are behind" (**Low risk**): 1 week behind at the 6-week mark ≈ 16.7%, and 9 × 1.167 ≈ 10.5 weeks.
   - The 20% option's arithmetic does not work: 9 × 1.2 = 10.8, not 12.
   - "Do not change the schedule" is the **High-risk** action [W4-S40].
   - The 4-day hurricane loss fits the S40 row-2 assumption ("no more complex than the original estimate"), whose action is to add the 1 week lost, rated Moderate risk. But the only "+1 week" option also adds three people.
   - 🔎 Look up in Track B: the textbook's view on adding people to a late project. It appears only as a distractor in [W5a-S2], and the W4 slides don't discuss it.

---

## 3. Slide-by-slide notes

### [W4-S1] Title slide — "System Analysis · DR. DRAGUNOV · Project Managment"
- Course title "System Analysis", lecturer "DR. DRAGUNOV", and the lecture topic in the bottom-right corner: "Project Managment".
- ⚠️ Typo: "Managment" should be "Management". The PDF file name has the same typo ("4_1 Project managment").

### [W4-S2] Q1 V1 ⭐⭐
- Quiz 1, version 1: **depict the Phased development methodology** and find ROI, BEP and NPV at a 3-year life and a **5%** rate of return. The full transcription and answer are in §2.1 and §2.4 (ROI 8.00%, BEP 2.50 yrs, NPV $8,929.92).
- ⚠️ "next cash flows" means "the following cash flows". The slide also prints "$ 10 000" and "$ 20 000" with a stray space.

### [W4-S3] Q1 V2 ⭐⭐
- **Waterfall** methodology, rate **10%**. Data conversion tools $20 000, User training $10 000, Increased sales $40 000. Answer: ROI 43.48%, BEP 1.57 yrs, NPV $64,079.64 (§2.4).

### [W4-S4] Q1 V3 ⭐⭐
- **Parallel** methodology, rate **15%**. Data conversion tools $30 000, Increased sales $60 000. Answer: ROI 62.50%, BEP 1.33 yrs, NPV $85,490.26 (§2.4).

### [W4-S5] Q1 V4 ⭐⭐
- **Phased** methodology again (same as V1), rate **20%**. Data conversion tools $40 000, Increased sales $80 000. Answer: ROI 80.00%, BEP 1.18 yrs, NPV $101,712.96 (§2.4).

### [W4-S6] (picture) "PROJECT SELECTION AND MANAGEMENT" — Planning task checklist
- The slide is a picture with no other text. It has the heading "PROJECT SELECTION AND MANAGEMENT", a tab labelled **"PLANNING"**, and a box labelled **"TASK CHECKLIST"** with 18 items:
  - **Ticked ☑:** Identify project. · Develop systems request. · Analyze technical feasibility. · Analyze economic feasibility. · Analyze organizational feasibility.
  - **Not ticked ☐:** Perform project selection review. · Estimate project time. · Identify project tasks. · Create work breakdown structure. · Create PERT Charts. · Create Gantt Charts. · Manage scope. · Staff project. · Create project charter. · Set up CASE repository. · Develop standards. · Begin documentation. · Assess and manage risk.
- How to read it: the ticked items are what W3 covered (system request plus the three feasibilities). The open items are the project-management work. This deck covers selection, time estimation, tasks, WBS, PERT, Gantt, scope and risk. Staffing and the project charter come in W5a [W5a-S4].

### [W4-S7] Introduction
- "Most IT departments face a demand for IT projects that far exceeds the department's ability to supply them."
- "In the past **10 years**, business application growth has exploded, and chief information officers (**CIOs**) are challenged to select projects that will provide the highest possible return on IT investments while managing project risk."
- "AMR Research, Inc., found that **2–15%** of projects taken on by IT departments are not strategic to the business." So "the corporate IT department needs to carefully prioritize, select, and manage its portfolio of development projects."
- ⭐ **Definition:** "**project management**, the process of planning and controlling the project within a specified time frame, at minimum cost, with the desired outcomes."
- "A **project manager** has the primary responsibility for managing the hundreds of tasks and roles that need to be carefully coordinated."
- Project management "has evolved into an actual profession with many training options and professional certification (e.g., project management professional [**PMP**]) available through the Project Management Institute (www.pmi.org)."
- ⚠️ The slide prints "specifi ed" and "certifi cation" with broken "fi" ligatures; they should read "specified" and "certification".

### [W4-S8] Ways to Classify Projects ⭐
The table, reproduced:

| Classification | Question(s) it asks |
|---|---|
| **Size** | What is the size? How many people are needed to work on the project? |
| **Cost** | How much will the project cost the organization? |
| **Purpose** | What is the purpose of the project? Is it meant to improve the technical infrastructure? Support a current business strategy? Improve operations? Demonstrate a new innovation? |
| **Length** | How long will the project take before completion? How much time will go by before value is delivered to the business? |
| **Risk** | How likely is it that the project will succeed or fail? |
| **Scope** | How much of the organization is affected by the system? A department? A division? The entire corporation? |
| **Return on investment** | How much money does the organization expect to receive in return for the amount the project costs? |

- There are 7 ways: Size, Cost, Purpose, Length, Risk, Scope, ROI. Memory aid: "**S**ome **C**ats **P**urr **L**oudly, **R**arely **S**cratching **O**wners".

### [W4-S9] (picture) Project Selection Process — "4-Step Project Selection Process"
- A banner reading "PROJECT SELECTION PROCESS" with four coloured circles hanging from it, left to right:
  1. **Identify Potential Projects** (teal; magnifier icon)
  2. **Compare the Projects** (green; balance-scale icon)
  3. **Analyze Your Findings** (orange; chart-under-magnifier icon)
  4. **Select a Project** (red; finger-tap icon)
- The circles have no numbers; the order is left to right, as the subtitle "4-Step" says. The slide gives no detail for each step. *Link (my note, not on the slide):* the S8 classification questions are the kind of things you would compare in step 2.

### [W4-S10] (picture, by "businessmap") Project Management Process Stages ⭐
| Stage | Name (icon) | What happens (bold words are the slide's) |
|---|---|---|
| 1 | **Project Initiation** (light bulb, green) | Define the project's **purpose, scope, and objectives** · Identify **key stakeholders** · Create **project charter** |
| 2 | **Project Planning** (map with pin, yellow) | Create a **project plan** · Create a **work breakdown structure** · Develop a **risk management strategy** |
| 3 | **Project Execution** (gear, magenta) | **Start working** on the project plan · Build **workflows**, **assign tasks** to team members · Keep everyone **in the loop** |
| 4 | **Project Monitoring & Controlling** (line chart, blue) | Do regular **reviews** · **Monitor progress** against KPIs · **Apply changes** when needed |
| 5 | **Project Closure** (badge with check mark, teal) | Complete all **project deliverables** · Discuss **failures and successes** · Document **lessons learned** |
- Note that the **WBS** and the **risk management strategy** both sit in Stage 2 (Planning), which matches the rest of this deck.

### [W4-S11] Traditional Project Management Tools ⭐
- "Before we get to actually creating a workplan that is suitable to manage and control **an object-oriented systems development project**, we need to introduce a **set of project management tools** that have been used to successfully manage traditional software development projects (and many other types of projects):
  - ❑ a work-breakdown structure
  - ❑ a Gantt chart, and
  - ❑ a network diagram."
- In short: **WBS + Gantt + network diagram** are the traditional trio. Later slides (S28–S32) explain why object-oriented / iterative projects need an *evolutionary* version.

### [W4-S12] Project Management Tools ⭐
- "Aids in creating workplans"
- "Identify all tasks, their sequence and estimate the time to complete each one"
- "**Work breakdown structures (WBS)**: a hierarchy of tasks to identify:
  - ◦ Duration of each task
  - ◦ Current status of each task
  - ◦ Task dependencies (shows which tasks must be completed before others can begin)"
- "**Gantt charts**: horizontal bar chart that shows the WBS graphically"
- "**Network diagrams**: PERT and CPM"

### [W4-S13] A Task ⭐
- ⭐ **Definition:** "A **task is a unit of work** that will be performed by a member or members of the development team, such as feasibility analysis. Each task is described by information such as its name, start and completion dates, person assigned to complete the task, deliverables, completion status, priority, resources needed, estimated time to complete the task, and the actual time it took to complete the task".
- The table (10 pieces of workplan information), reproduced:

| Workplan Information | Example |
|---|---|
| Name of the task | Perform economic feasibility |
| Start date | Jan 05, 2010 |
| Completion date | Jan 19, 2010 |
| Person assigned to the task | Project sponsor: Mary Smith |
| Deliverable(s) | Cost–benefit analysis |
| Completion status | Open |
| Priority | High |
| Resources that are needed | Spreadsheet software |
| Estimated time | 16 hours |
| Actual time | 14.5 hours |

- Note: the estimate was 16 h and the actual was 14.5 h, so the task came in 1.5 h under estimate. Recording **estimated vs actual** time is exactly what S27 recommends ("keep track of the actual values for time and effort").

### [W4-S14] Workplan Creation ⭐
- "The first thing a project manager must do is to identify the tasks that need to be accomplished and determine how long each task will take."
- "Once the tasks have been identified and documented, they are organized within **a work breakdown structure** that is used to drive the creation of **Gantt charts** and **network diagrams** that can be used to graphically portray a traditional workplan. These techniques help a project manager understand and manage the project's progress over time."
- The order: **identify tasks + durations → WBS → (drives) Gantt chart + network diagram → track progress.**

### [W4-S15] Work Breakdown Structures ⭐
- "If a project manager prefers to begin from scratch, he or she can use a **structured, top-down approach** whereby high-level tasks are first defined and then broken down into subtasks. For example, [the table] shows a list of high-level tasks needed to implement a new **IT training class**."
- ⚠️ The slide prints "topdown" (should be "top-down") and "For example,  shows" with the figure reference missing.
- The table (IT training class, high-level tasks), reproduced:

| Task Number | Task Name | Duration (in weeks) | Dependency | Status |
|---|---|---:|---|---|
| 1 | Identify vendors | 2 | | Complete |
| 2 | Review training materials | 6 | 1 | Complete |
| 3 | Compare vendors | 2 | 2 | In Progress |
| 4 | Negotiate with vendors | 3 | 3 | Open |
| 5 | Develop communications information | 4 | 1 | In Progress |
| 6 | Disseminate information | 2 | 5 | Open |
| 7 | Create and administer survey | 4 | 6 | Open |

- The three status values used are **Complete / In Progress / Open**.

### [W4-S16] (WBS table, continued) ⭐
| Task Number | Task Name | Duration (in weeks) | Dependency | Status |
|---|---|---:|---|---|
| 7.1 | Create initial survey | 1 | | Open |
| 7.2 | Review initial survey | 1 | 7.1 | Open |
| 7.2.1 | Review by Director of IT Training | 1 | | Open |
| 7.2.2 | Review by Project Sponsor | 1 | | Open |
| 7.2.3 | Review by Representative Trainee | 1 | | Open |
| 7.3 | Pilot test initial survey | 1 | 7.1 | Open |
| 7.4 | Incorporate survey changes | 1 | 7.2, 7.3 | Open |
| 7.5 | Create distribution list | 0.5 | | Open |
| 7.6 | Send survey to distribution list | 0.5 | 7.4, 7.5 | Open |
| 7.7 | Send follow-up message | 0.5 | 7.6 | Open |
| 7.8 | Collect completed surveys | 1 | 7.6 | Open |
| 8 | Analyze results and choose vendor | 2 | 4, 7 | Open |
| 9 | Build new classrooms | 11 | 1 | In Progress |
| 10 | Develop course options | 3 | 8, 9 | Open |

- **The hierarchy has three levels.** Task 7 "Create and administer survey" breaks down into 7.1–7.8, and 7.2 breaks down further into 7.2.1–7.2.3. This is the "hierarchically numbered" list that S17 calls a WBS.
- Several tasks have **two predecessors**: 7.4 (7.2, 7.3), 7.6 (7.4, 7.5), 8 (4, 7) and 10 (8, 9). Durations range from **0.5** to **11** weeks.

### [W4-S17] (WBS definition) ⭐
- ⭐ **Definition:** "A list of tasks hierarchically numbered in this way is called a **work breakdown structure (WBS).** The number of tasks and level of detail depend on the complexity and size of the project. At a minimum, the WBS must include the
  - ❑ duration of the task,
  - ❑ the current statuses of the tasks (i.e., open, complete), and
  - ❑ the task dependencies, which occur when one task cannot be performed until another task is completed."
- Memory hook for the minimum WBS contents: **D-S-D = Duration, Status, Dependencies**. S12 gives the same three.

### [W4-S18] Gantt Chart ⭐
- ⭐ **Definition:** "A *Gantt chart* is a horizontal bar chart that shows the same task information as the project WBS but in a graphical way."
- "Sometimes a picture really is worth a thousand words, and the Gantt chart can communicate the **high-level status** of a project much faster and easier than the WBS."
- "Creating a Gantt chart is simple and can be done using a spreadsheet package, graphics software (e.g., **Microsoft Visio** or **SmartDraw**), or a project management package."
- The slide also shows a large **Jira** logo, a project-management package covered on S46–S47.

### [W4-S19] (How a Gantt chart is built) ⭐
- "First, tasks are listed as **rows** in the chart, and **time is listed across the top** in increments based on the needs of the projects. A **short** project may be divided into **hours or days**, whereas a **medium-sized** project may be represented using **weeks or months**."
- "Horizontal bars are drawn to represent the duration of each task; the bar's beginning and end mark exactly when the task will begin and end."
- "As people work on tasks, the appropriate bars are **filled in proportionately** to how much of the task is finished."
- "Too many tasks on a Gantt chart can become confusing, so it's best to limit the number of tasks to around **twenty or thirty**. If there are more tasks, break them down into subtasks and create Gantt charts for each level of detail."

### [W4-S20] "Grantt Chart example (part)" ⭐
- ⚠️ The title says "**Grantt**"; it should be "Gantt".
- **Left side: the task table.** "Prede" is a truncated column header, presumably for predecessors.

| ID | Task Name | Duration | Start | Finish | Prede |
|---|---|---|---|---|---|
| 1 | Identify vendors | 2 wks | Wed 1/1/12 | Tue 1/14/12 | |
| 2 | Review training materials | 6 wks | Wed 1/1/12 | Tue 2/11/12 | |
| 3 | Compare vendors | 2 wks | Wed 2/12/12 | Tue 2/25/12 | 2 |
| 4 | Negotiate with vendors | 3 wks | Wed 2/26/12 | Tue 3/8/12 ⚠️ | 3 |

- **Right side: the chart.**
  - Months January, February, March, April and "M" (cut off) run across the top. Below them are weekly columns 12/29, 1/5, 1/12, 1/19, 1/26, 2/2, 2/9, 2/16, 2/23, 3/2, 3/9, 3/16, 3/23, 3/30, 4/6, 4/13, 4/20, 4/27.
  - **Task 1:** a bar from about 1/1 to 1/14, **completely filled with black** (finished), labelled "**Alan**".
  - **Task 2:** a bar from 1/1 to 2/11 with black filling **about the first half** (≈ 3 of 6 weeks done), labelled "**Barbara**".
  - **Task 3:** an empty bar from 2/12 to 2/25, "Barbara". **Task 4:** an empty bar from 2/26 to about 3/18, "Barbara".
  - **Arrows** run from the end of bar 2 down to the start of bar 3, and from the end of bar 3 to the start of bar 4. These are the dependencies, matching the "Prede" column.
  - Lines also drop from the end of bar 1 and the end of bar 4 down past the visible part of the chart, to their successors lower down. This fits the WBS: tasks 5 and 9 depend on 1, and task 8 depends on 4 [S15–S16].
- What the chart shows, mapped to the slides' rules: bar position and length = start/end and duration [S19]; black fill = progress [S19]; arrows = dependencies [S21]; names = people assigned [S21].
- ⚠️ **Date check:** "3 wks" starting Wed 2/26 should end about **3/18**. The bar ends around 3/16–3/18, and the network diagram on S23 shows "Tue **3/18**/12". So **"3/8/12" is a typo for 3/18/12.**
- ⚠️ **Mismatch with the WBS:** here task 2 has **no predecessor** and starts on 1/1 together with task 1. The S23 network diagram agrees. But the WBS table on S15 lists task 2's dependency as "1". See §6.4.

### [W4-S21] GC's special notations ⭐
- "GC" in the title is short for Gantt chart. The slide names three extra notations that a Gantt chart can carry; all three are in bold on the slide:

| Notation on the chart | Meaning |
|---|---|
| upside-down triangle ▼ or diamond ◆ | **project milestone** |
| arrow drawn between task bars | **task dependency** |
| a person's name next to a bar (shown "sometimes") | the **human resources** allocated to that task |

- **The picture: rows 10–12 of the same chart as S20.**

| ID | Task Name | Duration | Start | Finish | Prede |
|---|---|---|---|---|---|
| 10 | Develop course options | 3 wks | Wed 4/9/12 | Tue 4/29/12 | 8, 9 |
| 11 | Budget Meeting | 1 day | Wed 1/15/12 | Wed 1/15/12 | |
| 12 | Software Installation | 1 day | Tue 4/1/12 | Tue 4/1/12 | |

- On the chart side:
  - Task 10 is a bar at the far right (April). **Two arrows drop into its start**, one from each predecessor (8 and 9). The assigned person's name is cut off at the chart edge; only "D" is visible.
  - Tasks 11 and 12 are drawn as **black diamonds** labelled "1/15" and "4/1". These one-day events are the **milestones**.
- Note: tasks 11 and 12 do not appear in the WBS on S15–S16. They are extra milestone rows added to the Gantt chart.

### [W4-S22] Network Diagram — PERT ⭐
- The network diagram is the **second graphical view** of the workplan, after the Gantt chart. It lays the tasks out as a **flowchart**.
- ⭐ **Definition:** "Program Evaluation and Review Technique (PERT) is a network analysis technique that can be used when the individual task time estimates are fairly uncertain."
- Instead of one point estimate per task, PERT uses **three time estimates: optimistic, most likely and pessimistic**.
- ⭐ **Formula** (shown as a picture on the slide):

  **PERT weighted average = [optimistic estimate + (4 × most likely estimate) + pessimistic estimate] / 6**

  The weights are 1-4-1 and add up to 6, so the most likely value counts four times as much as each extreme.
- Worked example (my numbers, the slide's formula): optimistic 2, most likely 4 and pessimistic 12 weeks give (2 + 16 + 12)/6 = **5 weeks**.
- ⚠️ The slide says "and a pessimistic", with a stray "a".

### [W4-S23] Network Diagram — the class example (picture) ⭐
- **Each node is a box with three rows:**
  1. the task name;
  2. the task ID | the duration (the figure also prints the finish weekday after it, e.g. "2 wks Tue");
  3. the start date | the finish date.
- **All 11 nodes:**

| ID | Task name (as printed) | Duration | Start | Finish | Marking | Border |
|---|---|---|---|---|---|---|
| 1 | Identify vendors | 2 wks | Wed 1/1/12 | Tue 1/14/12 | crossed lines = complete | plain |
| 2 | Review training materials | 6 wks | Wed 1/1/12 | Tue 2/11/12 | crossed = complete | plain |
| 3 | Compare vendors | 2 wks | Wed 2/12/12 | Tue 2/25/12 | none | plain |
| 4 | Negotiate with vendors | 3 wks | Wed 2/26/12 | Tue 3/18/12 | none | plain |
| 5 | Develop communications Information | 4 wks | Wed 1/15/12 | Tue 2/11/12 | one diagonal = partial | **heavy (critical)** |
| 6 | Disseminate information | 2 wks | Wed 2/12/12 | Tue 2/25/12 | none | **heavy** |
| 7 | Create and administer survey | 4 wks | Wed 2/26/12 | Tue 3/25/12 | none | **heavy** |
| 8 | Analyze results and choose vendor | 2 wks | Wed 3/26/12 | Tue 4/8/12 | none | **heavy** |
| 9 | Build new classroom | 11 wks | Wed 1/15/12 | Tue 4/1/12 | one diagonal = partial | plain |
| 10 | Develop course options | 3 wks | Wed 4/9/12 | Tue 4/29/12 | none | **heavy** |
| 11 | Budget meeting | 1 day | Wed 1/15/12 | Wed 1/15/12 | crossed = complete | plain, no arcs |

- **Arcs (dependencies):**
  - **Bold arrows** along 5 → 6 → 7 → 8 → 10.
  - Thin arrows 1 → 5, 1 → 9, 2 → 3, 3 → 4, and a long thin arrow 4 → 8.
  - A **dashed** arrow 9 → 10.
  - Node 11 stands alone.
- **Layout:**
  - The top row runs 5 → 6 → 7 → 8 → 10, left to right.
  - Node 1 sits at the left and feeds 5 (upwards) and 9 (downwards).
  - The bottom row runs 2 → 3 → 4, with node 11 stacked under node 2.
- Small wording difference: S23 says "Build new classroom" while S16 says "classrooms".
- The critical path is verified under S25 and in §6.3.

### [W4-S24] Network diagram notation ⭐
- ⭐ The network diagram is "a node-and-arc type of graph that shows time estimates in the nodes and task dependencies on the arcs" (bold on the slide).

| Element | Meaning |
|---|---|
| **node** | one individual task, holding its time estimate |
| **line (arc) between two nodes** | the dependency between those two tasks |
| **one diagonal line** through a node | task **partially completed** |
| **crossed lines** in a node | task **completed** |

- Applied to S23: **complete** = 1, 2, 11; **partially complete** = 5, 9; **not started** = 3, 4, 6, 7, 8, 10.

### [W4-S25] Critical Path Method ⭐
- CPM "simply allows the identification of the critical path in the network".
- ⭐ **Definition:** "The critical path is the longest path from the project inception to completion."
- In my words, from the slide:
  - The critical path contains every task that must finish on schedule for the whole project to finish on schedule.
  - If any task on it takes longer than expected, the whole project falls behind.
  - Each task on it is a **critical task**. Critical tasks are usually drawn in a special way; the figure (S23) uses **double borders**, on tasks **5, 6, 7, 8 and 10**.
- "CPM can be used with or without PERT."
- ⚠️ The slide says "in Figure" without a figure number; it means S23.
- **Verification of the slide's claim** (durations in weeks, from S23):

| Path (start → finish) | Sum | Total |
|---|---|---:|
| 1 → 5 → 6 → 7 → 8 → 10 | 2 + 4 + 2 + 4 + 2 + 3 | **17 ← longest = critical** |
| 1 → 9 → 10 | 2 + 11 + 3 | 16 |
| 2 → 3 → 4 → 8 → 10 | 6 + 2 + 3 + 2 + 3 | 16 |

  - The critical path is **1 → 5 → 6 → 7 → 8 → 10, 17 weeks** (Wed 1/1/12 to Tue 4/29/12). The slide marks 5, 6, 7, 8 and 10.
  - **Task 1 is on that path too**, but it is already complete (crossed) and is drawn without the double border.
  - Spare time on the non-critical paths:
    - **Task 9 has 1 week.** It ends on 4/1, but task 10 cannot start before 8 ends on 4/8.
    - **The chain 2 → 3 → 4 shares 1 week.** Task 4 ends on 3/18, while task 8 also waits for task 7, which ends on 3/25.
  - "Slack/float" is not a term on the slides. 🔎 Look up in Track B: the formal slack/float definitions and the forward/backward pass (ES/EF/LS/LF).

### [W4-S26] Project Effort Estimation ⭐⭐
- In my words: the science (or art) of project management is making **trade-offs among three concepts**:
  - **the functionality of the system**,
  - **the time to complete the project**,
  - **the cost of the project** (all three in bold on the slide).
- "Most accurate estimates come from experience."
- At the start, the manager estimates each of these levers and then **continuously assesses** (bold) how to roll out the project to meet the organization's needs.
- ⭐ **Definition:** "*Estimation* is the process of assigning projected values for time and effort."
- ⭐⭐ The review question in [W5a-S2] turns this into a fill-in: "making ___ of size, time and cost". The answer is **Trade-offs**. Note that W5a writes "size" where W4 says "functionality".

### [W4-S27] Numbers ⭐
- **Where estimate numbers come from:**
  - **projects with similar tasks and technologies**, or
  - **experienced developers**.
- The numbers should generally be **conservative**.
- Good practice: **record the actual time and effort** during development. Then the numbers can be refined as you go, and the next project benefits from real data. Compare S13's estimated 16 h against actual 14.5 h.

### [W4-S28] CREATING AND MANAGING THE WORKPLAN ⭐
- Once the project manager has a general idea of the project's functionality and effort, he or she creates a workplan.
- ⭐ **Two definitions** (both underlined on the slide):
  - A *workplan* is "a dynamic schedule that records and keeps track of all the tasks that need to be accomplished over the course of the project".
  - "Workplan: a dynamic and sequential list of all tasks needed to complete a project".
- **Approaches to building one:** "Modify existing or completed projects" · "Derive the tasks from the methodology being used".
- **Agile Process:** "Iterative & incremental". So the "**Workplan is also iterative & incremental**":
  - "Tasks and time intervals follow the phases"
  - "Different tasks executed for each workflow"

### [W4-S29] Evolutionary Work Breakdown Structures and Iterative Workplans ⭐
- In my words: object-oriented approaches to analysis and design **support incremental and iterative development** (bold). So any project-planning approach for object-oriented development must also be incremental and iterative.
- The underlined sentence: a workplan for an incremental and iterative process is organized "in a similar manner".
- 🔎 The slide does not show what an evolutionary WBS looks like, or what it is "similar" to. The nearest class hint is S28: tasks and time intervals follow the phases, with different tasks for each workflow. Look up in Track B: the structure of an evolutionary WBS / iterative workplan.

### [W4-S30] WBSs tend to have three underlying problems: 1st ⭐
- **Problem 1: WBSs are focused on the design of the information system being developed** (bold).
  - Building the WBS "**forces the premature decomposition**" (bold and underlined) of the system design, and of the tasks for creating that design.
  - When the problem domain **is well understood**, tying the workplan's structure to the product makes sense (bold).
  - When the domain **is not well understood**, the analyst has to commit to the system's architecture **before the requirements are fully understood** (bold).

### [W4-S31] 2nd ⭐
- **Problem 2: the level of detail is wrong for the project's size.** WBSs force **too many levels of detail very early** on **large projects**, and allow **too few levels of detail on small projects** (bold).
- Why it matters: the **primary purpose of a WBS is to allow cost estimation and scheduling** (bold). So conventional planning needs the WBS done correctly and completely at the very start, which is **very difficult to do with any degree of validity** (bold).
- The result (underlined): cost and schedule estimates for many IS development projects "tend to be wildly inaccurate".

### [W4-S32] 3rd ⭐
- **Problem 3** (bold italic on the slide): "Because they are project specific, they are very difficult to compare across projects."
- In my words, this hurts learning across the organization. With no standard way to build WBSs, project managers cannot learn from other managers' earlier projects. Teams end up reinventing the wheel and repeating their predecessors' mistakes.
- ⚠️ Grammar: "encourage the reinventing the wheel".
- **Summary of the three problems:**

| # | Problem | Consequence |
|---|---|---|
| 1 | Focused on the **system's design**: premature decomposition | You commit to the architecture before the requirements are understood (bad when the domain is unclear) |
| 2 | **Too many levels of detail** early (large projects) / **too few** (small projects) | The WBS must be complete up front for estimating, so estimates come out "wildly inaccurate" |
| 3 | **Project-specific**, so hard to **compare across projects** | Ineffective organizational learning: reinventing the wheel, repeated mistakes |

### [W4-S33] Managing Scope ⭐⭐
- An analyst may assume careful up-front estimating and planning keeps the project safe from scheduling problems. But **the most common reason for schedule and cost overruns, scope creep,** happens **after the project is under way** (bold and underlined).
- ⭐ **Definition:** "Scope creep happens when new requirements are added to the project after the original project scope was defined and frozen."
- **Three reasons it happens:**
  1. **Users** suddenly see the new system's potential and think of useful new functionality.
  2. **Developers** discover interesting capabilities and become very attached to them.
  3. **A senior manager** decides the system should support a new strategy from a recent board meeting.
- ⭐⭐ This is the answer to the [W5a-S2] review question: "The most common reason for schedule and cost overruns is ___", answer **Scope creep**.

### [W4-S34] Timeboxing ⭐
- ⭐ **Timeboxing is "another approach to scope management"** (bold).
- Everything so far described **task-oriented** projects. Their schedule is driven by the tasks to be done, so more tasks and requirements mean a longer project.
- Some companies have little patience for long development projects. They take a **time-oriented approach that places meeting a deadline above delivering functionality** (underlined).

| | Task-oriented project | Time-oriented project (timeboxing) |
|---|---|---|
| What drives the schedule | the tasks/requirements to be done | a fixed deadline |
| More requirements mean… | a longer project | functionality is postponed to a later round |
| Priority | delivering the functionality | meeting the deadline |

### [W4-S35] Steps for Timeboxing ⭐
1. Set the date for system delivery.
2. Prioritize the functionality that needs to be included in the system.
3. Build the core of the system (the functionality ranked as most important).
4. Postpone functionality that cannot be provided within the time frame.
5. Deliver the system with core functionality.
6. Repeat steps 3 through 5 to add refinements and enhancements.
- The order is **fix the date → prioritize → build the core → postpone the rest → deliver → loop over steps 3–5**. Step 6 only repeats 3–5; you do not set a new date or re-prioritize from scratch.

### [W4-S36] Refining Estimates ⭐
- Planning estimates must be **refined as the project progresses**. This does not mean they were done badly. An exact schedule assessment is virtually impossible at the beginning of development.
- ⭐ (bold) A project manager should expect to be satisfied with **broad ranges of estimates** that become **more and more specific** as the project's product becomes better defined.

### [W4-S37] Hurricane model ⭐⭐
- Estimating an IS project's cost, duration and final functionality follows a *hurricane model*.
- **The analogy:** forecasters watch new storms in the Atlantic or Pacific. They have minimal information about each storm but lots of data on previous storms, and they predict when and where it will hit and how much damage it will do.
- ⭐ **The numbers:** according to "one of the leading experts in software development" (not named on the slide), a well-done project plan **prepared at the end of inception** has:
  - a **100 percent margin of error for project cost**;
  - a **25 percent margin of error for schedule time**.
- ⭐⭐ Applied in [W5a-S3]: a $50,000 / 20-week plan becomes **$0 to $100,000** and **15 to 25 weeks** (§2.7).

### [W4-S38] Hurricane Model (chart) ⭐
- The title runs vertically on the left: "Hurricane Model".
- **Axes:**
  - **x-axis:** "Stage at which estimate is made". Four stages, left to right: **Inception, Elaboration, Construction, Transition**.
  - **y-axis:** "Project schedule time (Time needed to complete project)".
- **Circles:** at each stage a pink circle marks the estimate. A note with an arrow pointing at the first circle says "**Size of circle indicates estimated cost**".
  - The Inception circle is the smallest and sits mid-height.
  - The Elaboration circle is larger and higher.
  - The Construction circle is the largest and a little lower.
  - The Transition circle is large and the highest.
- **Cones:** from each circle, two dotted lines fan out to the right, forming a cone of possible schedule times. The upper line of the first cone is labelled "Estimated schedule time".
  - **The Inception cone is by far the widest.** Its upper line climbs to the top-right corner and its lower line drops to the bottom-right.
  - Each later cone is **narrower**, and the Transition cone is only a thin wedge.
- **Message (S36–S37):** estimates start as broad ranges and **narrow as the product becomes better defined**, like a hurricane forecast cone tightening as the storm approaches.
- 🔎 Look up in Track B: what the four stages (Inception, Elaboration, Construction, Transition) are. No class slide defines them.

### [W4-S39] Schedule ⭐
- The question: what happens when you **overshoot an estimate**, for example when analysis runs two weeks longer than expected? There are several ways to adjust future estimates.
- **Ahead of schedule:** most project managers **shift the deadlines sooner by the same amount** but **do not change the promised completion date**.
- **Behind schedule** is the real challenge. The slide promises **three possible responses** in a figure, which is on S40–S41.
- ⚠️ "presented in Figure": the figure number is missing.

### [W4-S40] Possible Actions When a Schedule Date Is Missed ⭐⭐
The table (Assumptions / Actions / Level of Risk) covers S40 and S41. Short cells are verbatim; long cells are condensed.

| # | Assumption about the rest of the project | Action | Level of Risk |
|---|---|---|---|
| 1 | It is **simpler than the part that was late** AND **simpler than believed** when the original estimates were made, so you **can make up the lost time** | "Do not change schedule." | **High risk** |
| 2 | It is simpler than the late part and **no more complex than the original estimate assumed**, so you **can't make up the lost time**, but you won't lose more on the rest | **Increase the entire schedule by the total amount of time that you are behind**. Example: a date missed by two weeks moves all the remaining dates two weeks later. If you built **padded time** into the end of the original schedule, the promised delivery date may not have to change; you just use up the padding. | **Moderate risk** |
| 3 (S41) | It is **as complex as the part that was late**, i.e. the original estimates were **too optimistic**, so all future dates are underestimated **by the same percentage** | **Increase the entire schedule by the percentage of weeks that you are behind**. Example: two weeks late on a part planned for eight weeks means increasing all remaining estimates by **25 percent**. If the new delivery date is beyond what the **project sponsor** accepts, the **scope** of the project must be reduced. | **Low risk** |

### [W4-S41] (table continued: row 3) ⭐⭐
- Row 3 has its own slide; its content is in the table above.
- **Checking the slide's example:** 2 weeks late on an 8-week part gives 2/8 = **25%**, so every remaining estimate × 1.25. For instance, 20 remaining weeks would become 25 weeks (my illustration of the slide's rule).
- **The pattern across the three rows:** the more pessimistic the assumption, the more conservative the action and the **lower the risk**.
  - Row 1, "do nothing": high risk.
  - Row 2, "add the weeks lost": moderate risk.
  - Row 3, "add the same percentage": low risk.
- ⭐⭐ Used in the [W5a-S3] "Mya" question (§2.7).

### [W4-S42] Managing Risk ⭐
- ⭐ **Definition:** risk management is "the process of assessing and addressing the risks that are associated with developing a project". The slide calls it the "**final facet**" of project management (bold).
- **Things that cause risks:** **weak personnel**, **scope creep**, **poor design**, **overly optimistic estimates**.
- The project team must know the potential risks so that problems can be **avoided or controlled well ahead of time**.

### [W4-S43] (picture) Risk Management
- A label "RISK MANAGEMENT" at the left, beside **six interlocking coloured gears**.
  - **Top row:** **MONITOR** (red), **AWARENESS** (purple), **IDENTIFY** (blue).
  - **Bottom row:** **IMPLEMENT** (orange), **CONTROLS** (green), **EVALUATE** (teal).
- There are **no arrows or numbers**, so the slide states no order. Read clockwise from the top middle, the ring goes: Awareness → Identify → Evaluate → Controls → Implement → Monitor → back to Awareness. That reading is mine.
- 🔎 Look up in Track B: an official sequence of risk-management steps, if one is expected.

### [W4-S44] (picture) Risk Assessment ⭐
- **A template with four fields**, filled in for one example risk:

| Field | Content in the class example |
|---|---|
| **RISK 1** | Development will probably be slowed considerably, because the team members have never programmed in **Java** before. |
| **Likelihood of risk** | "High probability of risk." |
| **Potential impact on the project** | Will probably **increase the time to complete programming tasks by 50 percent**. |
| **Ways to address this risk** | Give time and resources to **up-front Java training** for the programmers, to shorten the initial learning curve. Also **bring in outside Java expertise** for at least part of the early programming, to pass on experiential knowledge so that Java issues novices would miss get overcome. |
| **RISK 2** | "…" (left empty) |

- **How to reuse it:** list each risk with its **likelihood**, its **impact** (quantified where possible, e.g. +50% time) and **ways to address** it.
- Illustration (my arithmetic, not on the slide): if the programming tasks were planned at 10 weeks, +50% makes them about 15 weeks.

### [W4-S45] Scope Management ⭐
- **Scope "creep":**
  - "Occurs after the project is underway"
  - "Results from adding new requirements to the project"
  - "Can have a deleterious effect on the schedule"
  - "Project Manager is responsible to manage changes to reduce scope creep"
- ⭐ **Techniques to manage the project scope:**
  1. Identify all requirements at the outset
  2. Allow only those changes deemed absolutely necessary
  3. Carefully examine the impact of suggested changes
  4. Delay some changes for "future enhancements"
  5. Time boxing (see S34–S35)
- Links: the scope-creep definition and its three reasons are on S33. ⚠️ Minor: "Time boxing" here, "timeboxing" on S34.

### [W4-S46] JIRA – Core Features
- The slide shows the "Jira Software" logo, then two features.
- **Boards:**
  - JIRA supports **Scrum and Kanban boards** (both frameworks were covered in W2).
  - Boards give the team an **immediate snapshot** of the project.
  - They help to **quickly review progress** and see the status of individual tasks.
  - The **board workflow can be customized** to match how the team wants to work.
- **Business Project Template:**
  - JIRA offers a number of **business templates**, for simple tasks and for complex ones like workflow.
  - Templates are **customizable** per team and approach; for example, the workflow can follow each team's approach.
  - Every step is accounted for, so the team can move toward its goals.
- ⚠️ Grammar slips on the slide: "supports  number of" (missing "a") and "Every step is accounted" (missing "for").

### [W4-S47] JIRA – Project ⭐
- The slide lists five issue types:

| Issue type | Definition on the slide |
|---|---|
| **Sub-Task** | A sub-task of an issue. A logged issue can need several different tasks to resolve it, and these are called sub-tasks. |
| **Bug** | "A problem that impairs or prevents the functions of the product." |
| **Epic** | "A big user story that needs to be broken down." Created by JIRA Software; do not edit or delete. |
| **Story** | "A user story." Created by JIRA Software; do not edit or delete. |
| **Task** | "A task that needs to be done to achieve team's goal." |

- Link (mine): an Epic being "broken down" and Sub-Tasks splitting an issue mirror the WBS idea of decomposing tasks into subtasks (S15–S17).
- ⚠️ Grammar: "which are called as sub-tasks".

---

## 4. Definitions & key terms
Text in quotation marks is word for word from the slide; everything else is my summary of the slide.

| Term | Definition as taught | Ref |
|---|---|---|
| **Project management** | "the process of planning and controlling the project within a specified time frame, at minimum cost, with the desired outcomes" | S7 |
| **Project manager** | the person with primary responsibility for coordinating the project's hundreds of tasks and roles | S7 |
| **PMP / PMI** | project management professional (PMP) certification, available through the Project Management Institute (www.pmi.org) | S7 |
| **CIO** | chief information officer; must pick the projects with the highest return while managing risk | S7 |
| **Ways to classify projects** | Size · Cost · Purpose · Length · Risk · Scope · Return on investment | S8 |
| **Project selection (4 steps)** | Identify Potential Projects → Compare the Projects → Analyze Your Findings → Select a Project | S9 |
| **PM process stages (5)** | Initiation → Planning → Execution → Monitoring & Controlling → Closure | S10 |
| **Task** | "a unit of work that will be performed by a member or members of the development team" (e.g. feasibility analysis) | S13 |
| **Workplan** | "a dynamic schedule that records and keeps track of all the tasks that need to be accomplished over the course of the project"; also "a dynamic and sequential list of all tasks needed to complete a project" | S28 |
| **Work breakdown structure (WBS)** | "A list of tasks hierarchically numbered in this way"; "a hierarchy of tasks". At minimum it holds the duration, current status and dependencies | S17, S12 |
| **Task dependency** | occurs "when one task cannot be performed until another task is completed" | S17 |
| **Gantt chart** | "a horizontal bar chart that shows the same task information as the project WBS but in a graphical way" | S18 |
| **Milestone (on a Gantt chart)** | shown with upside-down triangles or diamonds | S21 |
| **Network diagram** | a flowchart of the project tasks; "a node-and-arc type of graph that shows time estimates in the nodes and task dependencies on the arcs" | S22, S24 |
| **Node / arc** | a node is one task; a line connecting two nodes is the dependency between them | S24 |
| **Partially completed / completed task** | a diagonal line through the node / crossed lines | S24 |
| **PERT** | "Program Evaluation and Review Technique (PERT) is a network analysis technique that can be used when the individual task time estimates are fairly uncertain"; it uses 3 estimates: optimistic, most likely, pessimistic | S22 |
| **PERT weighted average** | (optimistic + 4 × most likely + pessimistic) / 6 | S22 |
| **CPM (critical path method)** | "simply allows the identification of the critical path in the network"; usable "with or without PERT" | S25 |
| **Critical path** | "the longest path from the project inception to completion"; if any task on it is late, the whole project is late | S25 |
| **Critical task** | any task on the critical path; drawn in a special way (double borders in the class figure) | S25 |
| **Estimation** | "the process of assigning projected values for time and effort" | S26 |
| **The three trade-off levers** | the functionality of the system · the time to complete the project · the cost of the project | S26 |
| **Evolutionary WBS / iterative workplan** | for object-oriented (incremental and iterative) development, the planning itself must be incremental and iterative | S29 |
| **Scope creep** | "happens when new requirements are added to the project after the original project scope was defined and frozen"; the most common reason for schedule and cost overruns | S33, S45 |
| **Timeboxing** | "another approach to scope management": a time-oriented approach that puts meeting a deadline above delivering functionality | S34–S35 |
| **Task-oriented project** | its schedule is driven by the tasks to be done, so more tasks mean a longer project | S34 |
| **Hurricane model** | estimating cost, time and final functionality works like forecasting a hurricane; a well-done plan at the end of inception has a 100% cost and 25% schedule margin of error | S37–S38 |
| **Padded time** | extra time placed at the end of the original schedule; it can absorb a delay so the promised delivery date stays (not formally defined on the slide) | S40 |
| **Risk management** | "the process of assessing and addressing the risks that are associated with developing a project" | S42 |
| **Risk assessment (template)** | each risk with its Likelihood of risk, Potential impact on the project and Ways to address this risk | S44 |
| **JIRA boards** | Scrum and Kanban boards giving the team an immediate snapshot of the project | S46 |
| **JIRA issue types** | Sub-Task · Bug · Epic ("A big user story that needs to be broken down") · Story ("A user story") · Task | S47 |

**Abbreviations on the slides:**
- **WBS** – work breakdown structure
- **PERT** – Program Evaluation and Review Technique
- **CPM** – critical path method
- **GC** – Gantt chart (S21 title)
- **PMP** – project management professional
- **PMI** – Project Management Institute
- **CIO** – chief information officer
- **KPIs** – used on S10 but not expanded

---

## 5. Methods as taught

### 5.1 Building a WBS [S13–S17]
1. **Identify every task** and **estimate how long each will take** (S14). A task is a unit of work done by team member(s) (S13).
2. Work **top-down** (S15): define the high-level tasks first, then break each one into subtasks.
3. **Number the tasks hierarchically**, as in 7 → 7.1 … 7.8 → 7.2.1 … 7.2.3 (S16–S17). The number of tasks and levels depends on the project's **complexity and size** (S17).
4. **For every task, record at least the duration, current status (open / in progress / complete) and dependencies** (S12, S17).
   - Optionally use the full task record from S13: name, start/completion dates, person assigned, deliverables, completion status, priority, resources, estimated time, actual time.
5. **Use the WBS to drive the Gantt chart and the network diagram** (S14).
6. Remember the three WBS weaknesses (S30–S32).
   - It forces a premature design decomposition.
   - It has the wrong level of detail for large or small projects.
   - It cannot be compared across projects.
   - For iterative / object-oriented work, plan incrementally instead (S28–S29).

### 5.2 Drawing and reading a Gantt chart [S18–S21]
**Drawing it:**
1. **List the tasks as rows** and put **time across the top**: hours/days for a short project, weeks/months for a medium one (S19).
2. Draw **one horizontal bar per task**. Its left end is the start and its right end is the finish (S19).
3. Draw **arrows between bars** for dependencies: a successor's bar begins where its predecessor's ends (S21).
4. Mark **milestones** with ▼ (upside-down triangle) or ◆ (diamond), e.g. a 1-day "Budget Meeting" (S21).
5. Optionally **write the assigned person's name** beside each bar (S21).
6. As work progresses, **fill each bar in proportion** to how much of the task is done (S19).
7. **Keep it to about 20–30 tasks.** For more tasks, break them into subtasks and draw one chart per level of detail (S19).

**Reading it**, by asking five questions:
- Which tasks are done or partly done? (fill)
- What has to wait for what? (arrows)
- Who is doing what? (names)
- What are the key dates? (diamonds)
- When does each task start and end? (bar ends)

**Tools:** a spreadsheet, graphics software (Microsoft Visio, SmartDraw) or a project-management package (S18).

### 5.3 Network diagram → critical path [S22–S25]
1. **Draw one node per task** (name, ID, duration, start/finish) and **one arc per dependency** (S24).
2. If the duration estimates are uncertain, compute each task's **PERT weighted average = (o + 4m + p) / 6** (S22).
3. **List every path** from the first task(s) to the final task.
4. **Add up the durations** along each path.
5. The **longest path is the critical path** (S25). Its tasks are the critical tasks; mark them with a special border (S25).
6. **Project duration = the length of the critical path.**
7. A path that is *x* weeks shorter than the critical path has *x* weeks of spare time. Delaying its tasks by up to *x* weeks does not move the end date, but any delay to a critical task moves the end date by the same amount (S25 logic).
   - 🔎 Look up in Track B: the formal slack/float terms and the forward/backward pass. The slides only define the critical path.
8. **Show progress** with a diagonal line through a node (partial) or crossed lines (complete) (S24).
- **Class result** (S23, verified): **17 weeks**. Critical path **1 → 5 → 6 → 7 → 8 → 10**; the slide marks 5, 6, 7, 8, 10. Task 9 has 1 spare week, and the chain 2 → 3 → 4 has 1 spare week.

### 5.4 The effort-estimation approach shown [S26–S27, S36–S38]
1. Treat project management as **trade-offs among functionality, time and cost**. Estimate each lever at the start, then **reassess continuously** (S26).
2. **Where the numbers come from:** past projects with **similar tasks and technologies**, or **experienced developers**. Keep them **conservative** (S27).
3. **Record the actual time and effort** as you go, so estimates can be refined during the project and reused on the next one (S27).
4. **Expect broad ranges** at first, narrowing as the product becomes better defined (S36). This is the **hurricane model** (S37–S38).
5. **Margins of error** for a well-done plan at the end of inception:
   - **cost**: 100%, so range = estimate × (1 ± 1.00);
   - **schedule**: 25%, so range = estimate × (1 ± 0.25).
   - Example from [W5a-S3]: $50,000 gives **$0–$100,000**; 20 weeks gives **15–25 weeks**.
6. When individual task times are very uncertain, use **PERT's three-point weighted average** (S22).
- 🔎 Look up in Track B: the textbook's concrete effort-estimation techniques. The slides give only these principles plus the PERT formula.

### 5.5 Timeboxing steps [S34–S35]
**Use it when:** the organization values **meeting the deadline over delivering every function** (a time-oriented approach), as opposed to a task-oriented schedule (S34).

**The steps:**
1. Set the date for system delivery.
2. Prioritize the functionality that needs to be included in the system.
3. Build the core of the system (the functionality ranked as most important).
4. Postpone functionality that cannot be provided within the time frame.
5. Deliver the system with core functionality.
6. Repeat steps 3 through 5 to add refinements and enhancements.

### 5.6 What to do when a schedule date is missed [S39–S41]
1. **Ahead of schedule?** Move the later deadlines earlier by the same amount, but **keep the promised completion date** (S39).
2. **Late?** Decide which assumption fits the rest of the project, then act:

| If you believe the rest of the project is… | Then… | Risk |
|---|---|---|
| simpler than the late part AND simpler than originally believed (you can catch up) | **do not change the schedule** | **High** |
| simpler than the late part and no more complex than originally estimated (you can't catch up, but won't slip further) | **add the weeks you lost** to the whole schedule; padded time at the end may absorb it | **Moderate** |
| as complex as the late part (the original estimates were too optimistic) | **add the same percentage** to all remaining estimates; if the sponsor can't accept the new date, **reduce scope** | **Low** |

3. **The percentage calculation:**
   - % behind = weeks late ÷ planned weeks of the late part.
   - New remaining estimate = remaining estimate × (1 + % behind).
   - Class example: 2 ÷ 8 = **25%** (S41).

### 5.7 The risk-management items [S42–S44]
1. **Definition:** assessing and addressing the risks of developing a project. It is the "final facet" of project management (S42).
2. **Typical causes:** weak personnel, scope creep, poor design, overly optimistic estimates (S42).
3. **Picture of the activities:** six gears, Awareness, Identify, Evaluate, Controls, Implement, Monitor (S43). The slide gives them no order.
4. **Write a risk assessment for each risk** (S44):
   - **the risk** (what could go wrong and why);
   - **Likelihood of risk** (e.g. "High probability of risk.");
   - **Potential impact on the project**, quantified if possible (e.g. +50% programming time);
   - **Ways to address this risk** (e.g. up-front training plus outside experts).
5. **Purpose:** make the team aware of risks early, so problems are avoided or controlled ahead of time (S42).

### 5.8 Managing scope [S33, S45] and creating the workplan [S28]
- **Scope creep arises from:**
  - users who discover new useful functions;
  - developers attached to interesting capabilities;
  - a senior manager adding a new strategy (S33).
- **Five techniques to control it** (S45):
  1. identify all requirements at the outset;
  2. allow only changes deemed absolutely necessary;
  3. carefully examine the impact of suggested changes;
  4. delay some changes for "future enhancements";
  5. time boxing.
- **Two ways to build a workplan** (S28):
  - modify an existing or completed project's plan;
  - derive the tasks from the methodology being used.
  - In an agile (iterative and incremental) process the workplan is iterative and incremental too. Its tasks and time intervals follow the phases, with different tasks for each workflow.

---

## 6. Worked examples from class, step by step and verified

### 6.1 The WBS for "implement a new IT training class" [S15–S16]
- **Level 1:** 10 tasks. **Level 2:** task 7 has subtasks 7.1–7.8. **Level 3:** 7.2 has subtasks 7.2.1–7.2.3.
- **Statuses:**
  - 1 and 2 are Complete.
  - 3, 5 and 9 are In Progress.
  - Everything else is Open.
- **Dependencies:**
  - 1 is a start task.
  - 2 → 3 → 4 form a chain.
  - 5 → 6 → 7 form a chain.
  - 8 needs both 4 and 7.
  - 9 needs 1.
  - 10 needs both 8 and 9.
- **⚠️ Check on task 7.** The parent task is 4 weeks, but its subtasks' longest chain is longer. 7.1 (1) → 7.2 or 7.3 (1, done in parallel) → 7.4 (1) → 7.6 (0.5) → 7.8 (1) = **4.5 weeks**. Task 7.5 (0.5) has no predecessor and can run alongside, and 7.7 runs alongside 7.8.
  - The slides do not reconcile 4.5 with 4 weeks. If asked, quote the WBS value for task 7, which is 4 weeks.

### 6.2 The Gantt chart [S20–S21]: date checks
- Each successor starts the day after its predecessor finishes:
  - 3 starts 2/12, after 2 finishes 2/11.
  - 4 starts 2/26, after 3 finishes 2/25.
  - 10 starts 4/9, after 8 finishes 4/8.
- The durations match the dates: 2 wks = 1/1–1/14, 6 wks = 1/1–2/11, 2 wks = 2/12–2/25, 3 wks = 4/9–4/29.
- **The exception: task 4's finish is printed as "3/8/12".** Three weeks from 2/26 ends on **3/18**, which is where the bar ends and what S23 prints. ⚠️ So 3/8 is a typo.
- **Progress:** task 1's bar is fully filled (done); task 2's is about half filled (≈ 3 of 6 weeks); tasks 3 and 4 are empty (not started).
- **Milestones:** ◆ 1/15 Budget Meeting and ◆ 4/1 Software Installation.

### 6.3 The network diagram and critical path [S23 + S25]
**Step 1: the dependencies (from the S23 arcs).**
- 1 → 5, 1 → 9
- 5 → 6 → 7 → 8 → 10
- 2 → 3 → 4 → 8
- 9 → 10
- 11 stands alone.

**Step 2: list the paths and add their durations (weeks).**

| Path | Calculation | Length |
|---|---|---:|
| 1 → 5 → 6 → 7 → 8 → 10 | 2 + 4 + 2 + 4 + 2 + 3 | **17** |
| 1 → 9 → 10 | 2 + 11 + 3 | 16 |
| 2 → 3 → 4 → 8 → 10 | 6 + 2 + 3 + 2 + 3 | 16 |

**Step 3: pick the longest.** The critical path is **1 → 5 → 6 → 7 → 8 → 10, 17 weeks**. This matches the slide's double-bordered tasks 5, 6, 7, 8 and 10; task 1 is complete and drawn without the border.

**Step 4: check against the dates.** The project runs from Wed 1/1/12 to Tue 4/29/12, which is 17 weeks.

**Step 5: spare time on the other paths.**
- **Task 9:** it finishes 4/1, but 10 cannot start before 4/9, so it has **1 week**.
- **Chain 2–3–4:** task 4 finishes 3/18, but 8 waits for 7 until 3/25, so it has **1 week**.

**What-ifs (the S25 rule):**
- If **task 7** slips 1 week, the project ends 1 week later (4/29 → about 5/6).
- If **task 9** slips 1 week, nothing changes.
- If **task 9** slips 2 weeks, the project slips 1 week, because path 1 → 9 → 10 grows to 18 weeks.

**The same plan drawn as a Gantt chart** (my drawing from the S23 data; 1 column = 1 week from 1/1/12; * = critical task):
```
Task                                    | 1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 |
---------------------------------------------------------------------------------------------
1  Identify vendors (2)                 |██ ██                                              |
2  Review training materials (6)        |██ ██ ██ ██ ██ ██                                  |
3  Compare vendors (2)                  |                  ██ ██                            |
4  Negotiate with vendors (3)           |                        ██ ██ ██                   |
5  Develop communications info (4)*     |      ██ ██ ██ ██                                  |
6  Disseminate information (2)*         |                  ██ ██                            |
7  Create & administer survey (4)*      |                        ██ ██ ██ ██                |
8  Analyze results, choose vendor (2)*  |                                    ██ ██          |
9  Build new classrooms (11)            |      ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██             |
10 Develop course options (3)*          |                                          ██ ██ ██ |
11 Budget meeting (1/15) ◆              |       ◆                                           |
12 Software installation (4/1) ◆        |                                     ◆             |
```
Task 1 is also on the critical path, but the slide does not mark it because it is complete.

### 6.4 Consistency check across the three figures (S15–S16 WBS, S20–S21 Gantt, S23 network)

| Item | WBS (S15–S16) | Gantt (S20) | Network (S23) |
|---|---|---|---|
| Task 2 predecessor | **1** | none (starts 1/1) | none (starts 1/1) |
| Task 2 status | Complete | bar ≈ half filled | crossed = complete |
| Task 3 status | In Progress | bar empty | no mark |
| Task 5 status | In Progress | (not shown) | diagonal = partial |
| Task 9 status | In Progress | (not shown) | diagonal = partial |
| Task 4 finish | — | 3/8/12 ⚠️ | 3/18/12 |

**Exam advice:** answer from the figure the question shows. If asked for the critical path, use S23/S25 (17 weeks; tasks 5, 6, 7, 8, 10 marked, and task 1 also on the path).

### 6.5 Estimate vs actual for one task [S13 with S27]
- "Perform economic feasibility" was estimated at **16 hours** and actually took **14.5 hours**. It came in **1.5 hours (≈ 9%) under** the estimate.
- This is the kind of "actual value" S27 says to keep, so later estimates can be refined.

### 6.6 Missed schedule dates [S40–S41]
- **Row 2 example:** you miss a date by **2 weeks**, so every remaining date moves **2 weeks later**. If the original plan had at least 2 weeks of **padded time** at the end, the promised delivery date can stay.
- **Row 3 example:** you are **2 weeks late on an 8-week part**: 2/8 = **25%**, so all remaining estimates × 1.25. If that pushes delivery past what the **sponsor** accepts, **reduce scope**.

### 6.7 Hurricane-model margins [S37]
- At the end of inception, a well-done plan has cost ±100% and schedule ±25%.
- **[W5a-S3]:** $50,000 and 20 weeks give **$0–$100,000** and **15–25 weeks**.
- **Another check (my numbers):** $80,000 and 40 weeks give **$0–$160,000** and **30–50 weeks**.

### 6.8 Risk assessment [S44]
- **Risk:** the team has never programmed in Java. **Likelihood:** high. **Impact:** programming tasks take about **+50%** longer.
- **Responses:** up-front Java training, plus an outside Java expert for the early programming.
- **Arithmetic illustration (mine):** 10 planned weeks of programming become about 15.

### 6.9 Quiz 1 calculations
- These are the cash-flow table, ROI, BEP and NPV for all 4 versions, fully worked in **§2.4** using the class method in §2.3 (W3).

---

## 7. Likely exam questions (built only from these slides)
There are 18 questions in the professor's two observed styles: **Quiz 1 style** (draw + calculate, open answer) and **W5a review style** (MCQ / fill-in with 5 options). Questions 1–4 and 10 are calculation or chart problems that mirror the slides. Answers follow in the next subsection.

**Q1 (Quiz-1 style: draw + compute).** *Depict graphically:* a Gantt chart, in weeks, for the WBS below. *Find:* the critical path, the project duration, and how many weeks task D can slip without delaying the project. What happens to the end date if F takes 1 week longer? What if D takes 1 week longer?

| Task | Name | Duration (weeks) | Dependency |
|---|---|---:|---|
| A | Identify vendors | 2 | – |
| B | Review training materials | 4 | – |
| C | Compare vendors | 2 | B |
| D | Develop communications information | 3 | A |
| E | Disseminate information | 1 | D |
| F | Build new classrooms | 8 | A |
| G | Analyze results and choose vendor | 2 | C, E |
| H | Develop course options | 3 | F, G |

**Q2 (PERT + CPM).** Three-point estimates in weeks (optimistic, most likely, pessimistic): A (2, 3, 10) · B (4, 6, 8) · C (1, 2, 9) · D (3, 4, 11) · E (1, 1.5, 5). B and C follow A; D follows C; E follows B and D.
- (a) Compute each task's PERT weighted average.
- (b) Draw the network diagram, and find the critical path and the expected duration.
- (c) What would you conclude if you used only the most likely estimates?

**Q3 (class network diagram, S23).**
- (a) List every path with its length.
- (b) Name the critical path and the project duration.
- (c) The slide marks only tasks 5, 6, 7, 8 and 10 as critical. Why is task 1 not marked?
- (d) Which tasks are complete and which are partially complete, and how can you tell?

**Q4 (class Gantt chart, S20–S21).**
- (a) What do the black fills in the bars of tasks 1 and 2 show?
- (b) How are "Budget Meeting" and "Software Installation" drawn, and what does that mean?
- (c) What do the arrows from bar 2 to bar 3 and from bar 3 to bar 4 mean?
- (d) What do "Alan" and "Barbara" tell you?
- (e) Find the error in task 4's row.

**Q5 (MCQ).** A Gantt chart is:
- a) a node-and-arc graph showing time estimates in the nodes
- b) a horizontal bar chart that shows the same task information as the project WBS but in a graphical way
- c) a hierarchically numbered list of tasks
- d) a network analysis technique used when task estimates are uncertain
- e) a dynamic and sequential list of all tasks needed to complete a project

**Q6 (MCQ).** At a minimum, a WBS must include:
- a) task name, priority and resources
- b) duration, current status and task dependencies
- c) start date, finish date and person assigned
- d) optimistic, most likely and pessimistic estimates
- e) cost, risk and scope

**Q7 (MCQ).** The critical path is ___.
- a) the shortest path from inception to completion
- b) the path with the most tasks
- c) the longest path from the project inception to completion
- d) the path containing the riskiest tasks
- e) the path whose tasks have already started

**Q8 (MCQ).** In a network diagram, a partially completed task is shown with ___ and a completed task with ___.
- a) a diamond / an upside-down triangle
- b) a diagonal line through the node / crossed lines
- c) a double border / a dashed border
- d) a filled bar / an empty bar
- e) crossed lines / a diagonal line

**Q9 (MCQ, "Micah" style).** A well-done plan made at the end of inception estimates a project at $80,000 and 40 weeks. According to the margin-of-error guidelines, the true values could range between:
- a) $40,000–$120,000 and 30–50 weeks
- b) $0–$160,000 and 30–50 weeks
- c) $0–$160,000 and 20–60 weeks
- d) $60,000–$100,000 and 35–45 weeks
- e) $0–$80,000 and 40–50 weeks

**Q10 (calculation, "Mya" style).** The original plan had analysis taking 8 weeks, followed by 24 weeks of further work: 32 weeks in total. Analysis actually took 10 weeks. For each of the three assumptions in the "possible actions when a schedule date is missed" table, give the action, the new total project length and the level of risk.

**Q11 (ordering).** Put the timeboxing steps in order:
- (A) Deliver the system with core functionality
- (B) Set the date for system delivery
- (C) Postpone functionality that cannot be provided within the time frame
- (D) Prioritize the functionality that needs to be included in the system
- (E) Repeat steps 3 through 5 to add refinements and enhancements
- (F) Build the core of the system (the functionality ranked as most important)

**Q12 (scope).** Define scope creep. Give three reasons it happens, and list the five techniques for managing project scope.

**Q13 (WBS).** WBSs tend to have three underlying problems. Name each one and its consequence.

**Q14 (MCQ, JIRA).** In JIRA, "a big user story that needs to be broken down" is:
- a) a Sub-Task
- b) a Bug
- c) an Epic
- d) a Story
- e) a Task

**Q15 (Depict graphically).** Depict graphically the hurricane model. Label both axes, the four stages and what the size of a circle means, then explain what the model says about estimates. Include the class's margin-of-error figures.

**Q16 (list).** Name the seven ways to classify projects, and the question each one asks.

**Q17 (risk).** Using the class risk-assessment template, write an assessment for this risk: "No one on the team has used the new database system before."

**Q18 (fill in the blanks).**
- (a) Project management is the process of ___ and ___ the project within a specified ___, at minimum ___, with the desired ___.
- (b) Estimation is the process of assigning projected values for ___ and ___.
- (c) The science (or art) of project management is in making trade-offs among the ___ of the system, the ___ to complete the project and the ___ of the project.
- (d) PERT weighted average = ( ___ + 4 × ___ + ___ ) / ___.
- (e) Risk management is the process of ___ and ___ the risks that are associated with developing a project.

### Answers

**A1.** Following S19, S21 and S25 (all numbers verified):

**The paths:**

| Path | Length |
|---|---:|
| A → D → E → G → H | 2 + 3 + 1 + 2 + 3 = 11 |
| A → F → H | 2 + 8 + 3 = **13** |
| B → C → G → H | 4 + 2 + 2 + 3 = 11 |

**Results:**
- **Critical path = A → F → H; project = 13 weeks.**
- **D can slip 2 weeks**, because its path is 11 weeks against 13. B, C, E and G also have 2 weeks each.
- If **F** takes 1 week longer, the project ends 1 week later (14 weeks), because F is critical.
- If **D** takes 1 week longer, nothing changes.

**The Gantt chart** (1 column = 1 week; add dependency arrows from each bar's end to its successor's start):
```
Task                | 1  2  3  4  5  6  7  8  9 10 11 12 13 |
-------------------------------------------------------------
A (2)               |██ ██                                  |
B (4)               |██ ██ ██ ██                            |
C (2)  after B      |            ██ ██                      |
D (3)  after A      |      ██ ██ ██                         |
E (1)  after D      |               ██                      |
F (8)  after A      |      ██ ██ ██ ██ ██ ██ ██ ██          |
G (2)  after C,E    |                  ██ ██                |
H (3)  after F,G    |                              ██ ██ ██ |
```

**A2.** Following S22 and S25.
- **(a)** A = (2 + 12 + 10)/6 = **4**; B = (4 + 24 + 8)/6 = **6**; C = (1 + 8 + 9)/6 = **3**; D = (3 + 16 + 11)/6 = **5**; E = (1 + 6 + 5)/6 = **2**.
- **(b)** A → B → E = 4 + 6 + 2 = 12. A → C → D → E = 4 + 3 + 5 + 2 = **14**. So the critical path is **A → C → D → E, 14 weeks**, and B has 2 weeks spare.
- **(c)** With the most likely values only, both paths are 3 + 6 + 1.5 = 10.5 and 3 + 2 + 4 + 1.5 = 10.5, a tie.
  - The PERT averages separate them. C and D have long pessimistic tails, which makes A → C → D → E clearly critical.
  - This is why PERT is used "when the individual task time estimates are fairly uncertain" (S22), and why "CPM can be used with or without PERT" (S25).

**A3.** Following S23–S25.
- **(a)** 1 → 5 → 6 → 7 → 8 → 10 = 17; 1 → 9 → 10 = 16; 2 → 3 → 4 → 8 → 10 = 16.
- **(b)** The critical path is **1 → 5 → 6 → 7 → 8 → 10, 17 weeks** (Wed 1/1/12 to Tue 4/29/12).
- **(c)** Task 1 is on the longest path, but it is **already complete** (crossed lines), so the figure draws it without the double border.
- **(d)** **Complete**, shown by crossed lines: 1, 2, 11. **Partially complete**, shown by one diagonal line: 5 and 9.

**A4.** Following S19, S21 and S20 vs S23.
- **(a)** The fill shows progress: bars are filled in proportion to how much of each task is finished. Task 1 is fully done; task 2 is about half done (≈ 3 of 6 weeks).
- **(b)** Both are **black diamonds**, dated 1/15 and 4/1. They are **milestones**.
- **(c)** They are **task dependencies**: task 3 cannot start until task 2 is completed, and task 4 cannot start until task 3 is.
- **(d)** They are the **names of the people assigned**, showing which human resources are allocated to each task.
- **(e)** A task of "3 wks" starting Wed 2/26/12 should finish on **3/18/12**, as the bar and S23 show, not on "3/8/12".

**A5.** **b** (S18). The distractors are other slides' definitions:
- (a) is the network diagram (S24);
- (c) is the WBS (S17);
- (d) is PERT (S22);
- (e) is the workplan (S28).

**A6.** **b** (S17; also S12).

**A7.** **c** (S25).

**A8.** **b** (S24). The distractors come from other notations:
- (a) is Gantt-chart milestones (S21);
- (c) is critical-task borders (S25);
- (d) is Gantt progress fill (S19).

**A9.** **b**. A 100% cost margin gives 80,000 ± 80,000 = $0–$160,000; a 25% schedule margin gives 40 ± 10 = 30–50 weeks (S37; same pattern as W5a-S3).

**A10.** Following S40–S41. Analysis was 2 weeks late on a part planned for 8 weeks.

| Assumption about the rest of the project | Action | New total length | Risk |
|---|---|---|---|
| simpler than the late part and than originally believed | do not change the schedule (finish in week 32 anyway) | 32 weeks | **High** |
| simpler than the late part, no more complex than originally estimated | add the 2 weeks lost (padding may absorb it) | 32 + 2 = **34 weeks** | **Moderate** |
| as complex as the late part (estimates too optimistic) | add 2/8 = 25% to all remaining estimates: 24 × 1.25 = 30 | 10 + 30 = **40 weeks**; if the sponsor can't accept that, reduce scope | **Low** |

**A11.** **B → D → F → C → A → E** (S35).

**A12.** Following S33 and S45.
- **Scope creep:** "happens when new requirements are added to the project after the original project scope was defined and frozen." It occurs after the project is under way.
- **Three reasons:**
  1. users suddenly see the system's potential and want new functionality;
  2. developers become attached to interesting capabilities;
  3. a senior manager wants the system to support a new board-level strategy.
- **Five techniques:**
  1. identify all requirements at the outset;
  2. allow only changes deemed absolutely necessary;
  3. carefully examine the impact of suggested changes;
  4. delay some changes for "future enhancements";
  5. time boxing.

**A13.** Following S30–S32.
1. **Focused on the system's design.** It forces premature decomposition of the design, so when the problem domain is not well understood you commit to the architecture before the requirements are understood.
2. **Wrong level of detail:** too many levels too early for large projects, too few for small ones. Since a WBS exists for cost estimation and scheduling, it must be complete up front, which is very hard to do validly, so estimates tend to be "wildly inaccurate".
3. **Project-specific, so hard to compare across projects.** This makes organizational learning ineffective: reinventing the wheel and repeating earlier managers' mistakes.

**A14.** **c, Epic** (S47).

**A15.** Following S36–S38.
- **Axes:** the x-axis is the "Stage at which estimate is made" (Inception, Elaboration, Construction, Transition). The y-axis is "Project schedule time (Time needed to complete project)".
- **Circles:** one circle per stage, and the **size of each circle shows the estimated cost**.
- **Cones:** dotted lines fan out of each circle to form a cone of possible schedule times. The cone is **widest at Inception** and gets narrower at each later stage.
- **Meaning:** estimates start as broad ranges and become more specific as the product becomes better defined, like a hurricane forecast.
- **Margins:** a well-done plan at the end of inception has a **100% margin of error for cost** and **25% for schedule**.

**A16.** Following S8.
- **Size**: how many people are needed?
- **Cost**: how much will it cost the organization?
- **Purpose**: infrastructure? current business strategy? operations? innovation?
- **Length**: how long until completion, and until value is delivered?
- **Risk**: how likely is it to succeed or fail?
- **Scope**: how much of the organization is affected (department, division, whole corporation)?
- **Return on investment**: how much money comes back for what it costs?

**A17.** This follows the S44 template; the content is yours to propose.

| Field | Example answer |
|---|---|
| **RISK 1** | Development will probably be slowed because no team member has used the new database system before. |
| **Likelihood of risk** | High probability of risk. |
| **Potential impact on the project** | Database-related tasks will take noticeably longer. Quantify it, as the class example did with +50%. |
| **Ways to address this risk** | Up-front training on the database for the team, plus outside database expertise for the early tasks so experienced people pass on what novices would miss. |
| **RISK 2** | … |

**A18.**
- **(a)** planning, controlling; time frame; cost; outcomes (S7).
- **(b)** time, effort (S26).
- **(c)** functionality, time, cost (S26).
- **(d)** optimistic, most likely, pessimistic; 6 (S22).
- **(e)** assessing, addressing (S42).

---

## 8. Self-check: "I can…"
- [ ] **I can** reproduce the structure of Quiz 1 and redo any version. That means drawing the Waterfall, Parallel and Phased diagrams from memory [W1b-S20/S25/S28], then building the cash-flow table and getting ROI, BEP and NPV the W3 way (V1: 8.00%, 2.50 yrs, $8,929.92).
- [ ] **I can** define, in the slides' words, project management, task, workplan, WBS, Gantt chart, network diagram, PERT, CPM, critical path, estimation, scope creep, timeboxing and risk management (§4).
- [ ] **I can** build a hierarchically numbered, top-down WBS and state its three minimum contents: duration, status, dependencies [S15–S17].
- [ ] **I can** draw a Gantt chart with bars, progress fill, dependency arrows, milestones (◆/▼) and names. I can also read the class example and spot its 3/8 vs 3/18 typo [S18–S21].
- [ ] **I can** compute PERT averages, list all the paths in a network diagram, find the critical path and the spare time, and reproduce the class result: 17 weeks via 1 → 5 → 6 → 7 → 8 → 10 [S22–S25].
- [ ] **I can** explain the three underlying problems of WBSs, and why object-oriented / iterative projects need evolutionary WBSs and iterative workplans [S28–S32].
- [ ] **I can** list the three reasons for scope creep, the five scope-management techniques and the six timeboxing steps in order [S33–S35, S45].
- [ ] **I can** explain and sketch the hurricane model, and turn any estimate into a range using the 100% (cost) and 25% (schedule) margins [S36–S38].
- [ ] **I can** choose and calculate the right response to a missed schedule date, including the risk levels and the percentage method (2/8 = 25%) [S39–S41].
- [ ] **I can** fill in a risk assessment (risk, likelihood, impact, ways to address), name the 4 causes of risk and the 6 gears, and name JIRA's board types (Scrum, Kanban) and its 5 issue types [S42–S47].
