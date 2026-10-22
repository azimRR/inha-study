# Week 3 — Planning phase: system request & feasibility analysis (CLASS NOTES — from slides only)
> Source: 3_1 Planing phase.pdf, 41 slides. Refs [W3-S#].
> Track A (class material only) · SOC3070-002 System Analysis · Dr. Dragunov · Midterm in week 8 (24–30 Oct 2026)
> Legend: ⭐ = emphasis on the slide (colour, bold/underline, "WE ARE HERE!", in-class question, practice task) · ⚠️ = typo or arithmetic error on the slide (original kept, correction given) · ✅ = number checked and correct · 🔎 = not explained on the slides, so look it up in Track B
> Image-only content (S2 picture, S4, S13–S15, S18–S20, S23, S25/S30 tables, S33–S34, S38) was read from the slide images and checked against the full-resolution images embedded in the PDF. Every number was re-computed with a script.

---

## 1. Big picture

- **Where we are:** the deck is about the **Planning** phase, the first phase of the SDLC (Idea → Planning → Analysis → Design → Implementation → System Success) [W3-S2].
- **Planning has two parts:** (1) **Project Initiation**: develop or receive a system request and run a feasibility analysis (technical, economic, organizational); (2) **Project Management**: work plan, staffing, monitor & control. This deck covers **part 1 only** [W3-S3, S4].
- **Projects start from a business need.** The need may be an opportunity or an organizational "pain". **Business Process Management (BPM)** often reveals it, and it can lead to **automation**, **improvement** or **reengineering (BPR)** of processes [W3-S5–S10].
- **Business need → high-level business requirements → system request.** The **project sponsor** formally starts the project by preparing a **system request** with **5 elements**: project sponsor, business need, business requirements, business value, special issues/constraints [W3-S11–S15].
- **Feasibility analysis asks 3 questions:** technical, *Can we build it?*; economic, *Should we build it?* / *Will it provide business value?*; organizational, *If we build it, will they come?* / *will it be used?* The system request and the feasibility analysis go to the **approval (steering) committee**, which decides whether to undertake the project [W3-S16–S22, S35].
- **Economic feasibility = cost–benefit analysis** in 4 steps: identify costs & benefits → assign values → determine cash flow → assess economic value with **ROI, BEP, NPV** [W3-S22–S34].
- **Key lesson of the class example:** ROI (10.14%) and BEP (2.66 years; the slide prints 2.68 because of an arithmetic slip) make the project look acceptable. But they ignore the **time value of money**. **NPV** at a 10% required rate of return is **−$5,973**, so the project should **not** be accepted [W3-S25–S32].
- **Organizational feasibility** is assessed through **strategic alignment** and **stakeholder analysis**. The key stakeholders are the **champion**, **organizational management** and **system users**. It "can be the most difficult feasibility dimension to assess" [W3-S35–S38].
- **Two "Small practice" calculations** close the deck: (S40) the year the cumulative net cash flow turns positive; (S41) ROI, BEP and NPV for a 2-year life at 10% [W3-S40–S41].

---

## 2. Slide-by-slide notes

### [W3-S1] Title — System Analysis, "3_1 Project Initiation"
- Title: **System Analysis**, by "DR. DRAGUNOV".
- Bottom-right label: **"3_1 Project Initiation"**. The PDF file is named "3_1 Planing phase" (sic), but the slide calls this lecture *Project Initiation*.

### [W3-S2] "WE ARE HERE!": where Planning sits in the SDLC
- Picture: a left-to-right flow. Light bulb **Idea** → **Planning** → **Analysis** → **Design** → **Implementation** → a computer screen with a thumbs-up labelled **System Success**.
- ⭐ A starburst "**WE ARE HERE!**" with a big red arrow points at **Planning**. This lecture is about the first SDLC phase.
- Apart from the picture, the slide only has a stray "." in its text.

### [W3-S3] SDLC: The Planning Phase
The slide lists (exact wording):
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
- This deck (3_1) covers **part 1, Project Initiation** (see the S1 label and the S4 ticks).

### [W3-S4] Project Selection and Management: Planning task checklist (picture)
- Picture: heading "PROJECT SELECTION AND MANAGEMENT", a tab labelled "PLANNING" and a box labelled "TASK CHECKLIST". **Five items are ticked**; the rest are greyed out with empty boxes. Footer: "SYSTEM ANALYSIS", page 4.

| # | Task (exact wording) | On slide |
|---|---|---|
| 1 | Identify project. | ✔ ticked |
| 2 | Develop systems request. | ✔ ticked |
| 3 | Analyze technical feasibility. | ✔ ticked |
| 4 | Analyze economic feasibility. | ✔ ticked |
| 5 | Analyze organizational feasibility. | ✔ ticked |
| 6 | Perform project selection review. | ☐ |
| 7 | Estimate project time. | ☐ |
| 8 | Identify project tasks. | ☐ |
| 9 | Create work breakdown structure. | ☐ |
| 10 | Create PERT Charts. | ☐ |
| 11 | Create Gantt Charts. | ☐ |
| 12 | Manage scope. | ☐ |
| 13 | Staff project. | ☐ |
| 14 | Create project charter. | ☐ |
| 15 | Set up CASE repository. | ☐ |
| 16 | Develop standards. | ☐ |
| 17 | Begin documentation. | ☐ |
| 18 | Assess and manage risk. | ☐ |

- **Takeaway:** the 5 ticked tasks are the content of this deck: identify the project → system request → the three feasibility analyses. The unticked tasks are later planning tasks that this deck does not explain. For example, "Staff project" matches "Staff the project" under Project Management on S3.
- 🔎 Look up in Track B: project selection review, work breakdown structure, PERT chart, Gantt chart, project charter, CASE repository (S4 names them but does not explain them).

### [W3-S5] Project identification and initiation: where do project ideas come from?
- ⭐ **In-class questions on the slide:** "- Where do project ideas come from?" and "- Could you give me examples of such needs?"
- Answer to Q1 (verbatim):
  > "A project is identified when someone in the organization identifies a business need to build a system."
- Answer to Q2 (verbatim):
  > "Examples of business needs include supporting a new marketing campaign, reaching out to a new type of customer, or improving interactions with suppliers. Sometimes, needs arise from some kind of "pain" within the organization, such as a drop in market share, poor customer service levels, unacceptable product defect rates, or increased competition. New business initiatives and strategies may be created and a system to support them is required, or a merger or acquisition may require systems to be integrated."
- The same content as a table:

| Source of the need | Slide's examples |
|---|---|
| Business needs (opportunities) | supporting a new marketing campaign; reaching out to a new type of customer; improving interactions with suppliers |
| "Pain" within the organization | a drop in market share; poor customer service levels; unacceptable product defect rates; increased competition |
| New business initiatives and strategies | a system to support them is required |
| Merger or acquisition | may require systems to be integrated |

### [W3-S6] Business process management (BPM)
- Definition (verbatim; underlined heading on the slide):
  > "Business process management (BPM) - methodology used by organizations to continuously improve end-to-end business processes. Business process management can be applied to internal organizational processes and to processes spanning multiple business partners."
- **Benefits** (verbatim):
  - "enhanced process agility, giving the organization the ability to adapt more rapidly and effectively to a changing business environment;"
  - "improved process alignment with industry "best practices"; and"
  - "increased process efficiencies as costs are identified and eliminated from process workflows."
- Memory aid: **agility · alignment (best practices) · efficiency (costs eliminated)**.

### [W3-S7] The BPM cycle and the business analyst's 4 contributions
- Verbatim:
  > "BPM generally follows a continuous cycle of systematically creating, assessing, and altering business processes. Business analysts, with their in-depth business knowledge, play a particularly important role in business process management by:"
  1. "Defining and mapping the steps in a business process,"
  2. "Creating ways to improve on steps in the process that add value,"
  3. "Finding ways to eliminate or consolidate steps in the process that don't add value,"
  4. ⭐ (in **green** on the slide) "Creating or adjusting electronic workflows to match the improved process maps."
- ⭐ (in **red** on the slide):
  > "The last step is particularly relevant to our discussion since the need for information systems projects is frequently identified here."
- **So:** step 4 (electronic workflows) is where the need for IS projects is most often found.

### [W3-S8] Business Process Automation
- Verbatim:
  > "In fact, the automation of business processes (termed *Business Process Automation*), is the foundation of many information technology systems. In these situations, technology components are used to complement or substitute for manual information management processes with the intent of gaining cost efficiencies."
- ⭐ Underlined on the slide: "**substitute for manual information management processes**".
- Key idea: technology **complements or replaces manual** processes, and the goal is **cost efficiencies**.

### [W3-S9] Business Process Improvement
- ⭐ The term is **bold + underlined** on the slide. Verbatim:
  > "**Business Process Improvement** results from studying the business processes, creating new, redesigned processes to improve the process workflows, and/or utilizing new technologies enabling new process structures (steps 2, 3, and 4 above)."
- "Steps 2, 3, and 4 above" are the analyst steps on S7: (2) improve the steps that add value, (3) eliminate or consolidate the steps that don't add value, (4) create or adjust electronic workflows.

### [W3-S10] Business Process Reengineering (BPR)
- Verbatim:
  > "Business Process Management may also reveal the need for the complete revamping of the organization's business processes, termed"
- ⭐ **Business Process Reengineering (BPR)** (bold + underlined). Verbatim definition:
  > "BPR means changing the fundamental way in which the organization operates— "obliterating" the current way of doing business and making major changes to take advantage of new ideas and new technology. As you might expect, BPR projects involve substantial risk due to the significant organizational and operational changes that result. Top management support and careful management are critical in these fairly rare types of projects."
- Verbatim:
  > "Both IT people (i.e., the information systems experts) and business people (i.e., the subject matter experts) should work closely together to find ways for technology to support business needs."
- **Comparison** (S8–S10, slide wording only):

| | Business Process **Automation** [S8] | Business Process **Improvement** [S9] | Business Process **Reengineering (BPR)** [S10] |
|---|---|---|---|
| What happens | technology components "complement or substitute for manual information management processes" | "studying the business processes, creating new, redesigned processes … and/or utilizing new technologies enabling new process structures" | "complete revamping"; "changing the fundamental way in which the organization operates"; "obliterating" the current way of doing business |
| Aim | "gaining cost efficiencies" | "to improve the process workflows" | "major changes to take advantage of new ideas and new technology" |
| Note | "the foundation of many information technology systems" | = steps 2, 3 and 4 of S7 | "substantial risk"; "fairly rare"; "Top management support and careful management are critical" |

### [W3-S11] From business need to business requirements to system request
- Verbatim (⭐ "high-level business requirements" is in **red**):
  > "The business need drives the **high-level business requirements** for the system. Business requirements describe the reasons for developing the system and outline the benefits it will provide the organization."
- Verbatim:
  > "Once the project sponsor identifies a project that meets an important business need and he or she can identify the business requirements and business value of the system, it is time to formally initiate the project. In most organizations, project initiation begins by preparing a *system request*."
- **Chain:** business need → (high-level) business requirements + business value → the project sponsor formally initiates the project → **system request**.

### [W3-S12] System Request: definition and the five elements
- Definition (verbatim):
  > "A *system request* is a document that describes the business reasons for building a system and the value that the system is expected to provide. The project sponsor usually completes this form as part of a formal system project selection process within the organization."
- "Most system requests include five elements:"
  1. project sponsor,
  2. business need,
  3. business requirements,
  4. business value, and
  5. special issues.
- Who fills it in: **the project sponsor** (usually), as part of a **formal system project selection process**.

### [W3-S13] System Request template (1/3): Project Sponsor, Business Need (picture of a table)

| Element | Description | Examples |
|---|---|---|
| **Project Sponsor** | The person who initiates the project and who serves as the primary point of contact for the project on the business side | Several members of the finance department<br>Vice president of marketing<br>IT manager<br>Steering committee<br>CIO<br>CEO |
| **Business Need** | The business-related reason for initiating the system | Increase sales<br>Improve market share<br>Improve access to information<br>Improve customer service<br>Decrease product defects<br>Streamline supply acquisition processes |

- The sponsor can be one person (e.g., a VP, the CIO, the CEO) or a group ("several members of the finance department", "steering committee").

### [W3-S14] System Request template (2/3): Business Requirements, Business Value (picture of a table)

| Element | Description | Examples |
|---|---|---|
| **Business Requirements** | The business capabilities that the system will provide | Provide online access to information<br>Capture customer demographic information<br>Include product search capabilities<br>Produce management reports<br>Include online user support |
| **Business Value** | The benefits that the system will create for the organization | 3% increase in sales<br>1% increase in market share<br>Reduction in headcount by 5\*FTEs<br>$200,000 cost savings from decreased supply costs<br>$150,000 savings from removal of existing system |

- Business requirements are **capabilities** (what the system will do). Business value is **benefits**, and every example is a measurable figure (%, $, headcount).
- "5\*FTEs": the asterisk points to a footnote that is not on the slide. 🔎 Look up in Track B: what "FTE" stands for.

### [W3-S15] System Request template (3/3): Special Issues or Constraints (picture of a table)

| Element | Description | Examples |
|---|---|---|
| **Special Issues or Constraints** | Issues that are relevant to the implementation of the system that need to be known by the approval committee | Government-mandated deadline for May 30<br>System needed in time for the Christmas holiday season<br>Top-level security clearance needed by project team to work with data |

- The whole template in order (S13–S15): **Project Sponsor → Business Need → Business Requirements → Business Value → Special Issues or Constraints**. S12 calls the last element just "special issues".
- Memory aid (built from the element names): **S-N-R-V-I**, i.e. **S**ponsor, **N**eed, **R**equirements, **V**alue, **I**ssues.

### [W3-S16] Feasibility Analysis: the three dimensions and who decides
- Verbatim:
  > "During *project initiation*, the system's business value to the organization is identified — how will it contribute to the organization's future success?"
  >
  > "A system request presents a brief summary of a business need and explains how a system that addresses the need will create business value."
- "The feasibility analysis examines key aspects of the proposed project:"
  - "The technical feasibility (Can we build it?)"
  - "The economic feasibility (Will it provide business value?)"
  - "The organizational feasibility (If we build it, will it be used?)"
- ⭐ ("*system request*" and "*feasibility analysis*" are underlined) Verbatim:
  > "The system request and feasibility analysis are presented to an information systems approval committee (sometimes called a steering committee ), which decides whether the project should be undertaken."
- **Wording note:** the slides phrase the questions in more than one way. Learn all of them:

| Dimension | S16 | S18–S20 picture boxes | S21 / S22 / S35 |
|---|---|---|---|
| Technical | Can we build it? | Can We Build It? | "Can we build it?" |
| Economic | Will it provide business value? | Should We Build It? | "Should we build the system?" |
| Organizational | If we build it, will it be used? | If We Build It, Will They Come? | "If we build it, will they come?" |

### [W3-S17] Feasibility Analysis: business case and risks
- Verbatim (⭐ "**Feasibility analysis**" is bold, italic and underlined):
  > "Once the need for the system and its business requirements have been defined, the approval committee may authorize the systems analyst to prepare a more detailed business case to better understand the proposed information system project. **Feasibility analysis** guides the organization in determining whether to proceed with the project."
  >
  > "Feasibility analysis also identifies the important *risks* associated with the project that must be managed if the project is approved."
- **Two jobs of feasibility analysis:** (1) guide the **go / no-go decision**; (2) identify the **important risks** to manage if the project is approved.
- Who does what: the **approval committee** may authorize the **systems analyst** to prepare a **more detailed business case**.

### [W3-S18] "Technical Feasibility: Can We Build It?" factors (picture)
Exact wording of the box:
- **Familiarity with application:** Less familiarity generates more risk.
- **Familiarity with technology:** Less familiarity generates more risk.
- **Project size:** Large projects have more risk.
- **Compatibility:** The harder it is to integrate the system with the company's existing technology, the higher the risk will be.

Pattern: every factor is a **risk driver**. Low familiarity (with the application or the technology), large size and poor compatibility all mean **more technical risk**.

### [W3-S19] "Economic Feasibility: Should We Build It?" factors (picture)
Exact wording of the box:
- Development costs
- Annual operating costs
- Annual benefits (cost savings and/or increased revenues)
- Intangible benefits and costs

Calculation note: only the operating costs and the benefits are called **annual**. Development costs are not. This is how the S40–S41 practice tasks are set up (see §5).

### [W3-S20] "Organizational Feasibility: If We Build It, Will They Come?" factors (picture)
Exact wording of the box:
- Project champion(s)
- Senior management
- Users
- Other stakeholders
- Is the project strategically aligned with the business?

S35–S38 expand on these: strategic alignment, stakeholder analysis, the champion, organizational management and system users.

### [W3-S21] Technical Feasibility: definition
- Verbatim (⭐ "**Can we build it?**" is bold, italic and underlined):
  > "The first technique in the feasibility analysis is to assess the *technical feasibility* of the project, the extent to which the system can be successfully designed, developed, and installed by the IT group. Technical feasibility analysis is, in essence, a *technical risk analysis* that strives to answer the question: "**Can we build it?**""
- Key words: the extent to which the system can be **designed, developed, and installed by the IT group**. In essence it is a **technical risk analysis**, and the risk factors are on S18.

### [W3-S22] Economic Feasibility: definition
- Verbatim (⭐ "**Should we build the system?**" is bold, italic and underlined; ⭐ the whole sentence "Economic feasibility is determined by … financial worthiness of the project." is **underlined**):
  > "The second element of a feasibility analysis is to perform an *economic feasibility* analysis (also called a *cost–benefit analysis*). This attempts to answer the question "**Should we build the system?**" Economic feasibility is determined by identifying costs and benefits associated with the system, assigning values to them, calculating future cash flows, and measuring the financial worthiness of the project."
  >
  > "Keep in mind that organizations have limited capital resources and multiple projects will be competing for funding. The more expensive the project, the more rigorous and detailed the analysis should be."
- The underlined sentence lists **4 actions**: identify costs & benefits → assign values → calculate future cash flows → measure financial worthiness. These are the **4 steps** on S33–S34.
- Other name for it: **cost–benefit analysis**.

### [W3-S23] Costs and benefits: the four categories (image-only slide, no title)
The slide shows a 2×2 picture: **Development Costs | Operational Costs** on top and **Tangible Benefits | Intangible Benefits** below. Full content:

| Development Costs | Operational Costs | Tangible Benefits | Intangible Benefits |
|---|---|---|---|
| Development team salaries | Software upgrades | Increased sales | Increased market share |
| Consultant fees | Software licensing fees | Reductions in staff | Increased brand recognition |
| Development training | Hardware repairs | Reductions in inventory | Higher quality products |
| Hardware and software | Hardware upgrades | Reductions in IT costs | Improved customer service |
| Vendor installation | Operational team salaries | Better supplier prices | Better supplier relations |
| Office space and equipment | Communications charges | | |
| Data conversion costs | User training | | |

- ⭐ This table is what you need for the **Small practice** tasks (S40–S41). Their items come from it: "Hardware repairs" (operational cost), "Increased sales" and "Reduction in staff" (tangible benefits), and "Development team salaries", "Office space and equipment" and "Data conversion tools" (development costs).
- **Tricky pairs** (all from this table):
  - *Development* training (development cost) vs *User* training (operational cost)
  - *Hardware and software* (development cost) vs *Hardware repairs* / *Hardware upgrades* (operational cost)
  - *Development* team salaries (development cost) vs *Operational* team salaries (operational cost)
  - Better supplier *prices* (tangible benefit) vs Better supplier *relations* (intangible benefit)
  - Increased *sales* (tangible benefit) vs Increased *market share* (intangible benefit)

### [W3-S24] Cash Flow Analysis and Measures
- Verbatim:
  > "IT projects commonly involve an initial investment that produces a stream of benefits over time, along with some ongoing support costs. Therefore, the value of the project must be measured over time. Cash flows, both inflows and outflows, are estimated over some future period. Then, these cash flows are evaluated using several techniques to judge whether the projected benefits justify incurring the costs."
  >
  > "A very basic cash flow projection is shown in Figure (next slide)"
- The typical shape: an **initial investment** (Year 0), then a **stream of benefits** plus **ongoing support costs** (Years 1, 2, 3 …).

### [W3-S25] Cash flow projection: the class example (picture of a table)
On the image the title looks like "Analvsis" only because the table covers the tail of the "y". The text layer reads "Cash Flow Analysis and Measures".

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | | 45,000 | 50,000 | 57,000 | 152,000 |
| Total Costs | 100,000 | 10,000 | 12,000 | 16,000 | 138,000 |
| Net Benefits (Total Benefits − Total Costs) | (100,000) | 35,000 | 38,000 | 41,000 | 14,000 |
| Cumulative Net Cash Flow | (100,000) | (65,000) | (27,000) | 14,000 | |

- Text below the table (verbatim): "Two of the common methods for evaluating a project's worth can now be determined. Each of these calculations will be explained here:" These are ROI (S26) and BEP (S27).
- **Parentheses = negative numbers.** For example, the Year 0 net benefit is 0 − 100,000 = (100,000).
- ✅ **Verified:**
  - Benefits: 45,000 + 50,000 + 57,000 = 152,000. Costs: 100,000 + 10,000 + 12,000 + 16,000 = 138,000.
  - Net per year: 0 − 100,000 = −100,000 · 45,000 − 10,000 = 35,000 · 50,000 − 12,000 = 38,000 · 57,000 − 16,000 = 41,000. Total 152,000 − 138,000 = 14,000.
  - Cumulative: −100,000 → −100,000 + 35,000 = **−65,000** → −65,000 + 38,000 = **−27,000** → −27,000 + 41,000 = **+14,000**. It turns positive in **Year 3**.

### [W3-S26] Return on Investment (ROI)
- Definition (verbatim):
  > "The return on investment (ROI) is a calculation that measures the average rate of return earned on the money invested in the project. ROI is a simple calculation that divides the project's net benefits (total benefits  total costs) by the total costs. The ROI formula is:"
- ⚠️ The slide reads "(total benefits  total costs)" with the **minus sign missing**. It should read "(total benefits **−** total costs)", as in the formula.
- **Formula (exact):**

  **ROI = (Total Benefits − Total Costs) / Total Costs**

- **Example (exact):** ROI = (152,000 − 138,000) / 138,000 = 14,000 / 138,000 = **10.14%**
- ✅ 14,000 ÷ 138,000 = 0.101449, i.e. **10.14%**. Correct. The totals come from the **Total column** of S25, so Year 0's 100,000 is included.
- Verbatim:
  > "A high ROI suggests that the project's benefits far outweigh the project's cost, although exactly what constitutes a "high" ROI is unclear. ROI is commonly used in practice; however, it is hard to interpret and should not be used as the only measureof a project's worth."
- ⚠️ Minor: "measureof" should read "measure of".
- Weaknesses named on the slides: what counts as a "high" ROI is **unclear**, ROI is **hard to interpret**, it **should not be the only measure** (S26), and it **ignores the time value of money** (S28).

### [W3-S27] Break-Even Point (BEP)
- Definition (verbatim):
  > "The *break-even point* (also called the *payback method*) is defined as the number of years it takes a firm to recover its original investment in the project from net cash flows."
- **Formula (exact):**

  *(In the year in which Cumulative Cash Flow turns positive):*

  **BEP = Number of years of negative cash flow + (That year's Net Cash Flow − That year's Cumulative Cash Flow) / That year's Net Cash Flow**

- **Example as printed on the slide:** BEP = 2 + (41,000 − 14,000)/41,000 = 2 + 28,000/41,000 = 2.68 years
- ⚠️ **Arithmetic error on the slide:** 41,000 − 14,000 = **27,000**, not 28,000. The correct result is BEP = 2 + 27,000/41,000 = 2 + 0.66 = **2.66 years** (2.6585). The slide's 2.68 comes from the wrong 28,000 (2 + 28,000/41,000 = 2.683).
- **Step by step** with the S25 numbers:
  1. Find the year in which the cumulative cash flow **turns positive**: Year 3 (+14,000). That is "that year".
  2. **Number of years of negative cash flow = 2.** The cumulative is still negative at the end of Year 1 (−65,000) and Year 2 (−27,000). Year 0 is the starting point and is not counted as a year, which matches the slide's "2".
  3. Numerator: that year's NCF − that year's cumulative = 41,000 − 14,000 = 27,000. This is the **27,000 still unrecovered** at the end of Year 2 (the (27,000) in the S25 table).
  4. Fraction of Year 3 needed: 27,000 / 41,000 = 0.66, so **BEP = 2.66 years**.

### [W3-S28] Discounted Cash Flow Technique: the time value of money
- ⭐ Underlined on the slide:
  > "The simple cash flow projection shown in Figure, and the return on investment and break-even point calculations all share the weakness of not recognizing the time value of money."
- Continues (verbatim):
  > "In these analyses, the timing of cash flows is ignored. A dollar in Year 3 of the project is considered to be exactly equivalent to a dollar received in Year 1."
  >
  > "Discounted cash flows are used to compare the present value of all cash inflows and outflows for the project in today's dollar terms. The key to understanding present values is to recognize that if you had a dollar today, you could invest it and receive some rate of return on your investment. Therefore, a dollar received in the future is worth less than a dollar received today, since you forgo that potential return. Assuming you could have invested $100 at a 10% rate of return, you'll be receiving the equivalent of $75 in today's terms."
- ⚠️ The last sentence leaves out *when* the $100 arrives. It means **$100 received 3 years from now** is worth about **$75 today** at 10%. The timing (n = 3) only appears in the S29 calculation (100/1.331 = 75.13).
- Logic chain: money today can be invested to earn a return → a future dollar means giving up that return → **a future dollar is worth less than a dollar today** → convert all future cash flows to **today's dollars (present value)**.

### [W3-S29] Discounted Cash Flow Technique: the present value formula
- "The basic formula to convert a future cash flow to its present value (PV) is:"

  **PV = Cash flow amount / (1 + rate of return)ⁿ**, "where n is the year in which the cash flow occurs."

- **Example (exact):** PV = 100 / (1 + .10)³ = 100 / 1.331 = **75.13**
- ✅ 1.1 × 1.1 × 1.1 = 1.331, and 100 ÷ 1.331 = 75.13. Correct. This is the "$75" on S28.

### [W3-S30] Discounted Cash Flow Technique: the PV table at 10% (picture of a table)
- Verbatim: "In this figure, the present value of the projected benefits and costs shown in previous figure have been calculated using a 10% required rate of return."
- Table **as printed**:

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | | 45,000 | 50,000 | 55,000 ⚠️ | |
| PV of Total Benefits | | 40,909 | 41,322 | 42,825 | 125,056 |
| Total Costs | 100,000 | 10,000 | 12,000 | 16,000 | |
| PV of Total Costs | 100,000 | 9,091 | 9,917 | 12,021 | 131,029 |

- ⚠️ **Typo:** the Year 3 Total Benefits cell is printed as **55,000** but must be **57,000**. S25 says 57,000, and the PV shown (42,825) equals 57,000 / 1.331 = 42,824.94. 55,000 would give 55,000 / 1.331 = 41,322. All the other numbers on this slide (and S31) are based on **57,000**.
- ✅ **Step-by-step check** (rate of return = 10%; (1.10)⁰ = 1, (1.10)¹ = 1.1, (1.10)² = 1.21, (1.10)³ = 1.331):

| Cell | Calculation | Exact | Rounded (as on slide) |
|---|---|---:|---:|
| PV benefits Y1 | 45,000 / 1.1 | 40,909.09 | 40,909 ✅ |
| PV benefits Y2 | 50,000 / 1.21 | 41,322.31 | 41,322 ✅ |
| PV benefits Y3 | 57,000 / 1.331 | 42,824.94 | 42,825 ✅ |
| **Σ PV benefits** | 40,909 + 41,322 + 42,825 | 125,056.35 | **125,056** ✅ |
| PV costs Y0 | 100,000 / 1 (Year 0 is not discounted) | 100,000.00 | 100,000 ✅ |
| PV costs Y1 | 10,000 / 1.1 | 9,090.91 | 9,091 ✅ |
| PV costs Y2 | 12,000 / 1.21 | 9,917.36 | 9,917 ✅ |
| PV costs Y3 | 16,000 / 1.331 | 12,021.04 | 12,021 ✅ |
| **Σ PV costs** | 100,000 + 9,091 + 9,917 + 12,021 | 131,029.30 | **131,029** ✅ |

### [W3-S31] Net Present Value (NPV)
- Definition (verbatim):
  > "The NPV is simply the difference between the total present value of the benefits and the total present value of the costs."
- **Formula (exact):**

  **NPV = Σ PV of Total Benefits − Σ PV of Total Costs**
  **= $125,056 − $131,029 = ($5,973)**

- ✅ 125,056 − 131,029 = **−5,973** (exact −5,972.95). The parentheses mean it is **negative**.

### [W3-S32] The NPV decision (the slide is titled "Return on Investment")
- ⚠️ The slide title says "Return on Investment", but the content is about **NPV** (it continues S31).
- Verbatim:
  > "As long as the NPV is greater than zero, the project is considered economically acceptable. Unfortunately for this project, the NPV is less than zero, indicating that for a required rate of return of 10%, this project should not be accepted. The required rate of return would have to be something less than ???% before this project returns a positive NPV. This example illustrates the fact that sometimes the "naïve" techniques of ROI and BEP find that the project appears acceptable, but the more rigorous and financially correct NPV technique finds the project is actually  unacceptable."
  >
  > "Answer 6.65;"
- ⭐ **In-class question:** "???%". The answer on the slide is **6.65%**.
- **Decision rule:** **NPV > 0 → economically acceptable.** Here NPV < 0 at 10%, so **do not accept**.
- ✅ **Check of 6.65%** (NPV of the S25 net cash flows −100,000 / 35,000 / 38,000 / 41,000 at different rates):

| Required rate of return | NPV |
|---|---:|
| 6.00% | +1,263 |
| 6.50% | +309 |
| 6.65% | +25 |
| 6.66% | +6 |
| 6.70% | −69 |
| 7.00% | −631 |
| 10.00% (the slide) | −5,973 |

  NPV = 0 at about **6.66%** (6.663%), so the slide's **6.65%** is right to within rounding. Below that rate, NPV is positive.
- 🔎 Look up in Track B: the name of "the rate at which NPV = 0" and how to calculate it. The slide only gives the number.
- **The lesson in one line:** ROI = 10.14% (positive) and BEP ≈ 2.66 years (inside the 3-year horizon) **look acceptable**, but NPV at 10% = **−$5,973**, so the project is **unacceptable**.

### [W3-S33] Steps of an economic feasibility analysis (1–3) (picture of a table)
- Text: "Figure reviews the steps involved in performing an economic feasibility analysis."

| Step | What to do (exact wording) |
|---|---|
| **1. Identify Costs and Benefits** | List the tangible costs and benefits for the project. Include both one-time and recurring costs. |
| **2. Assign Values to Costs and Benefits** | Work with business users and IT professionals to create numbers for each of the costs and benefits. Even intangibles should be valued if at all possible. |
| **3. Determine Cash Flow** | Forecast what the costs and benefits will be over a certain period, usually, three to five years. Apply a growth rate to the values, if necessary. |

### [W3-S34] Step 4: Assess Project's Economic Value (image-only slide)

| Step / technique | What to do (exact wording) |
|---|---|
| **4. Assess Project's Economic Value** | Evaluate the project's expected returns in comparison to its costs. Use one or more of the following evaluation techniques: |
| • **Return on Investment (ROI)** | Calculate the rate of return earned on the money invested in the project, using the ROI formula. |
| • **Break-Even Point (BEP)** | Find the year in which the cumulative project benefits exceed cumulative project costs. Apply the breakeven formula, using figures for that year. This calculation measures how long it will take for the system to produce benefits that cover its costs. |
| • **Net Present Value (NPV)** | Restate all costs and benefits in today's dollar terms (present value), using an appropriate discount rate. Determine whether the total present value of benefits is greater than or less than the total present value of costs. |

- The 4 steps follow S22's underlined sentence: identify → assign values → calculate cash flows → measure financial worthiness.
- Numbers to remember: the forecast period is "**usually, three to five years**". Use "**one or more**" of the techniques.

### [W3-S35] Organizational Feasibility: definition
- Verbatim:
  > "The final technique used for feasibility analysis is to assess the organizational feasibility of the system: how well the system ultimately will be accepted by its users and incorporated into the ongoing operations of the organization. There are many organizational factors that can have an impact on the project, and seasoned developers know that organizational feasibility can be the most difficult feasibility dimension to assess. In essence, an organizational feasibility analysis attempts to answer the question "If we build it, will they come?""
- Key points: whether users will **accept** the system and it gets **incorporated into ongoing operations**. It "can be **the most difficult feasibility dimension to assess**".
- Order of the three techniques: technical is "the first technique" (S21), economic is "the second element" (S22), organizational is "the final technique" (S35).

### [W3-S36] Two ways to assess organizational feasibility
- ⭐ Verbatim, with the slide's **bold**/underline:
  > "**One way** to assess the organizational feasibility of the project is to **understand how well the goals of the project align with business objectives**. Strategic alignment is the fit between the project and business strategy—the greater the alignment, the less risky the project will be, from an organizational feasibility perspective."
  >
  > "**A second way** to assess organizational feasibility is **to conduct a stakeholder analysis.** A stakeholder is a person, group, or organization that can affect (or can be affected by) a new system. In general, the most important stakeholders in the introduction of a new system are the **project champion**, system users, and organizational management."
- Summary:
  1. **Strategic alignment.** The greater the alignment, the **less risky** the project.
  2. **Stakeholder analysis.** A stakeholder is anyone who can **affect or be affected by** the new system. The most important are the **project champion, system users, organizational management**.

### [W3-S37] The champion
- Verbatim:
  > "The *champion* is a high-level executive and is usually, but not always, the project sponsor who created the system request. The champion supports the project by providing time and resources (e.g., money) and by giving political support within the organization by communicating the importance of the system to other organizational decision makers. More than one champion is preferable because if the champion leaves the organization, the support could leave as well."
- Key points:
  - The champion is a **high-level executive**, **usually, but not always**, the **project sponsor** who created the system request.
  - The champion supports the project with **time and resources (e.g., money)** and **political support** (communicating the system's importance to other decision makers).
  - **More than one champion is preferable**, because if the champion leaves the organization the support could leave too.

### [W3-S38] Stakeholder roles and how to enhance organizational feasibility (image-only slide)

| Stakeholder | Role | To Enhance Organizational Feasibility |
|---|---|---|
| **Champion** | A champion:<br>• Initiates the project<br>• Promotes the project<br>• Allocates his or her time to the project<br>• Provides resources | • Make a presentation about the objectives of the project and the proposed benefits to those executives who will benefit directly from the system.<br>• Create a prototype of the system to demonstrate its potential value. |
| **Organizational Management** | Organizational managers:<br>• Know about the project<br>• Budget enough money for the project<br>• Encourage users to accept and use the system | • Make a presentation to management about the objectives of the project and the proposed benefits.<br>• Market the benefits of the system, using memos and organizational newsletters.<br>• Encourage the champion to talk about the project with his or her peers. |
| **System Users** | Users:<br>• Make decisions that influence the project<br>• Perform hands-on activities for the project<br>• Ultimately determine whether the project is successful by using or not using the system | • Assign users official roles on the project team.<br>• Assign users specific tasks to perform, with clear deadlines.<br>• Ask for feedback from users regularly (e.g., at weekly meetings). |

- Counts: the champion has **4 roles / 2 enhancers**, organizational management **3 / 3**, system users **3 / 3**.
- Users "**ultimately determine whether the project is successful by using or not using the system**". This links back to "If we build it, will they come?"

### [W3-S39] SUMMARY
- Project Identification and Initiation
- System Request
- Feasibility Analysis

### [W3-S40] Small practice (1) ⭐
Word for word:
> **Small practice**
>
> During Project Planning phase, next cash flows were identified:
>
> - Hardware repairs: $30 000
> - Increased sales: $20 000
> - Reduction in staff: $40 000
> - Development team salaries: $ 50 000
> - Office space and equipment: $10 000
> - Data conversion tools: $10 000
>
> Find the year then cumulative net cash flow turns to positive

- ⚠️ "then" should read "**when**".
- **Answer:** the cumulative net cash flow turns positive in **Year 3**: (70,000) → (40,000) → (10,000) → 20,000. BEP = 2.33 years. The full working is in §5.2.

### [W3-S41] Small practice (2) ⭐
Word for word:
> **Small practice**
>
> During Project Planning phase, next cash flows were identified:
>
> - Hardware repairs: $20 000
> - Increased sales: $40 000
> - Reduction in staff: $40 000
> - Development team salaries: $ 50 000
> - Office space and equipment: $10 000
> - Data conversion tools: $10 000
>
> Find: ROI, BEP and NPV, if project life cycle is 2 years and rate of return = 10 %

- **Answer:** **ROI = 45.45%**, **BEP = 1.17 years**, **NPV = $34,132**. NPV > 0, so the project is economically acceptable. The full working is in §5.3.

---

## 3. Definitions & key terms

| Term | Definition / meaning (slide wording in quotes) | Ref |
|---|---|---|
| Planning phase | First SDLC phase. Part 1 is "Project Initiation" (system request + feasibility analysis); part 2 is "Project Management" (work plan, staffing, monitor & control) | S2, S3 |
| Project identification | "A project is identified when someone in the organization identifies a business need to build a system." | S5 |
| Business need | "The business-related reason for initiating the system" (e.g., increase sales, improve customer service). Can come from opportunities or from "pain" (drop in market share, poor customer service levels, unacceptable product defect rates, increased competition) | S13, S5 |
| Business process management (BPM) | "methodology used by organizations to continuously improve end-to-end business processes." Applies "to internal organizational processes and to processes spanning multiple business partners." It follows "a continuous cycle of systematically creating, assessing, and altering business processes" | S6, S7 |
| Business Process Automation | "technology components are used to complement or substitute for manual information management processes with the intent of gaining cost efficiencies"; "the foundation of many information technology systems" | S8 |
| Business Process Improvement | "results from studying the business processes, creating new, redesigned processes to improve the process workflows, and/or utilizing new technologies enabling new process structures" | S9 |
| Business Process Reengineering (BPR) | "changing the fundamental way in which the organization operates— "obliterating" the current way of doing business and making major changes to take advantage of new ideas and new technology". Substantial risk, fairly rare; top management support is critical | S10 |
| Business requirements | "describe the reasons for developing the system and outline the benefits it will provide the organization". The business need drives the "high-level business requirements". In the template: "The business capabilities that the system will provide" | S11, S14 |
| Project sponsor | "The person who initiates the project and who serves as the primary point of contact for the project on the business side". Usually completes the system request | S13, S12 |
| System request | "a document that describes the business reasons for building a system and the value that the system is expected to provide". Five elements: sponsor, need, requirements, value, special issues | S12 |
| Business value | "The benefits that the system will create for the organization" (e.g., 3% increase in sales) | S14 |
| Special issues or constraints | "Issues that are relevant to the implementation of the system that need to be known by the approval committee" | S15 |
| Feasibility analysis | "guides the organization in determining whether to proceed with the project". It "also identifies the important risks associated with the project that must be managed if the project is approved" | S17 |
| Approval committee (steering committee) | "an information systems approval committee (sometimes called a steering committee), which decides whether the project should be undertaken" | S16 |
| Business case | The approval committee "may authorize the systems analyst to prepare a more detailed business case to better understand the proposed information system project" | S17 |
| Technical feasibility | "the extent to which the system can be successfully designed, developed, and installed by the IT group". "In essence, a technical risk analysis": "Can we build it?" | S21, S18 |
| Economic feasibility (cost–benefit analysis) | "Should we build the system?" It is "determined by identifying costs and benefits associated with the system, assigning values to them, calculating future cash flows, and measuring the financial worthiness of the project" | S22, S19 |
| Development / Operational costs | The two cost columns of the S23 table (e.g., development team salaries vs hardware repairs). S19 says "Development costs" vs "Annual operating costs" | S23, S19 |
| Tangible / Intangible benefits | The two benefit columns of the S23 table (e.g., increased sales vs increased market share). S19 says "Annual benefits (cost savings and/or increased revenues)" and "Intangible benefits and costs" | S23, S19 |
| Cash flows | "Cash flows, both inflows and outflows, are estimated over some future period" and then evaluated "to judge whether the projected benefits justify incurring the costs" | S24 |
| Net benefits | "Total Benefits − Total Costs" (per year and in total) | S25 |
| Cumulative net cash flow | Running total of the yearly net benefits. The year it turns positive is the break-even year | S25, S27 |
| Return on investment (ROI) | "a calculation that measures the average rate of return earned on the money invested in the project" | S26 |
| Break-even point (BEP) = payback method | "the number of years it takes a firm to recover its original investment in the project from net cash flows" | S27 |
| Time value of money | The weakness shared by the simple projection, ROI and BEP: "the timing of cash flows is ignored". "A dollar received in the future is worth less than a dollar received today, since you forgo that potential return" | S28 |
| Discounted cash flows | "used to compare the present value of all cash inflows and outflows for the project in today's dollar terms" | S28 |
| Present value (PV) | "PV = Cash flow amount / (1 + rate of return)ⁿ where n is the year in which the cash flow occurs" | S29 |
| Required rate of return / discount rate | The rate used to discount the cash flows (10% in the class example): "a 10% required rate of return"; "using an appropriate discount rate" | S30, S32, S34 |
| Net present value (NPV) | "simply the difference between the total present value of the benefits and the total present value of the costs". "As long as the NPV is greater than zero, the project is considered economically acceptable" | S31, S32 |
| Organizational feasibility | "how well the system ultimately will be accepted by its users and incorporated into the ongoing operations of the organization": "If we build it, will they come?" It "can be the most difficult feasibility dimension to assess" | S35 |
| Strategic alignment | "the fit between the project and business strategy—the greater the alignment, the less risky the project will be" | S36 |
| Stakeholder | "a person, group, or organization that can affect (or can be affected by) a new system" | S36 |
| Stakeholder analysis | "A second way to assess organizational feasibility". The most important stakeholders are "the project champion, system users, and organizational management" | S36 |
| Champion | "a high-level executive and is usually, but not always, the project sponsor who created the system request". Provides time, resources and political support. "More than one champion is preferable" | S37 |
| Organizational management | "Organizational managers: Know about the project · Budget enough money for the project · Encourage users to accept and use the system" | S38 |
| System users | "Users: Make decisions that influence the project · Perform hands-on activities for the project · Ultimately determine whether the project is successful by using or not using the system" | S38 |

---

## 4. Formula sheet & calculation recipes, as taught

### 4.1 The formulas exactly as on the slides

| What | Formula (slide wording) | Ref | How to read the result |
|---|---|---|---|
| Net benefits (each year) | **Net Benefits = Total Benefits − Total Costs** | S25 | Negatives are shown in parentheses, e.g. (100,000) |
| Cumulative net cash flow | this year's cumulative = last year's cumulative + this year's net benefits (how the S25 row is built) | S25 | The year it turns positive is the break-even year |
| **ROI** | **ROI = (Total Benefits − Total Costs) / Total Costs** | S26 | A %. A "high" ROI suggests the benefits far outweigh the cost, but what is "high" is unclear. Do not use it as the only measure |
| **BEP** | *(In the year in which Cumulative Cash Flow turns positive):*<br>**BEP = Number of years of negative cash flow + (That year's Net Cash Flow − That year's Cumulative Cash Flow) / That year's Net Cash Flow** | S27 | Years needed to recover the original investment |
| **PV** | **PV = Cash flow amount / (1 + rate of return)ⁿ**, where n is the year in which the cash flow occurs | S29 | Value in today's dollars |
| **NPV** | **NPV = Σ PV of Total Benefits − Σ PV of Total Costs** | S31 | **NPV > 0 → economically acceptable** (S32); NPV < 0 → "should not be accepted" |

### 4.2 Discounting helper at 10% (arithmetic from the S29 formula)

| n (year) | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| (1 + .10)ⁿ | 1 | 1.1 | 1.21 | 1.331 | 1.4641 |
| 1 ÷ (1 + .10)ⁿ | 1.0000 | 0.9091 | 0.8264 | 0.7513 | 0.6830 |

- Dividing by (1.10)ⁿ gives the same result as multiplying by 1 ÷ (1.10)ⁿ. **Year 0 is never discounted** (you divide by 1), as S30 shows (100,000 → 100,000).
- Quick build: 1.1 → ×1.1 = 1.21 → ×1.1 = 1.331 → ×1.1 = 1.4641.
- 🔎 Look up in Track B: the term "discount factor". The slides only say "rate of return" (S29), "required rate of return" (S30, S32) and "discount rate" (S34).

### 4.3 The cash-flow table layouts (draw these in the exam)

**Table A: cash flow projection (S25 layout)**

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---|---|---|---|---|
| Total Benefits | (usually none) | B₁ | B₂ | B₃ | ΣB |
| Total Costs | C₀ (initial investment) | C₁ | C₂ | C₃ | ΣC |
| Net Benefits (Total Benefits − Total Costs) | −C₀ | B₁ − C₁ | B₂ − C₂ | B₃ − C₃ | ΣB − ΣC |
| Cumulative Net Cash Flow | −C₀ | previous + this year's net | previous + this year's net | previous + this year's net | — |

**Table B: discounted cash flow (S30 layout)**

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---|---|---|---|---|
| Total Benefits | | B₁ | B₂ | B₃ | |
| PV of Total Benefits | | B₁ / 1.1 | B₂ / 1.21 | B₃ / 1.331 | Σ PV of benefits |
| Total Costs | C₀ | C₁ | C₂ | C₃ | |
| PV of Total Costs | C₀ | C₁ / 1.1 | C₂ / 1.21 | C₃ / 1.331 | Σ PV of costs |

Then **NPV = Σ PV of benefits − Σ PV of costs**.

### 4.4 Recipes

**Recipe 1: turn a list of items into a cash flow (S40/S41 style)**
1. Classify every item with the **S23 table**: Development cost / Operational cost / Tangible benefit / Intangible benefit.
2. **Development costs = the initial investment, so put them in Year 0.** S24: "IT projects commonly involve an initial investment that produces a stream of benefits over time, along with some ongoing support costs". In S25, Year 0 has only costs.
3. **Operational costs** ("Annual operating costs", S19) and **benefits** ("Annual benefits", S19) go in **every year from Year 1** to the end of the project life. Use the same amount each year unless a growth rate is given (S33 step 3: "Apply a growth rate to the values, if necessary").
4. Intangibles enter the numbers only if a value has been assigned (S33 step 2: "Even intangibles should be valued if at all possible").
5. Fill in Table A.

**Recipe 2: ROI (S26)**
1. Total Benefits = the sum over all years. Total Costs = the sum over all years, **including Year 0**.
2. ROI = (Total Benefits − Total Costs) / Total Costs. Multiply by 100 to get %.

**Recipe 3: BEP (S27)**
1. Fill in the cumulative row and find the **first year in which it is positive** ("that year").
2. **Number of years of negative cash flow** = the years before "that year", **not counting Year 0** (= that year − 1; in the class example it is 2).
3. Fraction = (that year's Net Cash Flow − that year's Cumulative Cash Flow) / that year's Net Cash Flow. The numerator equals the amount still unrecovered at the end of the previous year.
4. **BEP = step 2 + step 3**, in years.

**Recipe 4: PV of a single amount (S29).** PV = amount / (1 + rate)ⁿ.

**Recipe 5: NPV (S30–S32)**
1. Find the PV of each year's benefits and costs. Year 0 is not discounted.
2. Add up each PV row to get Σ PV benefits and Σ PV costs.
3. NPV = Σ PV benefits − Σ PV costs.
4. **NPV > 0 → economically acceptable. NPV < 0 → do not accept** at that required rate of return.

### 4.5 Exam traps from this deck
- In the class example the Year 3 benefit is **57,000**, not S30's misprinted 55,000 [S25, S30].
- The slide's BEP arithmetic is wrong: 41,000 − 14,000 = **27,000**, so BEP = **2.66 years**, not 2.68 [S27].
- ROI uses the **Total column**, including the Year 0 cost [S26].
- BEP: **Year 0 is not counted** as a "year of negative cash flow" (the class example uses 2, not 3) [S27].
- Year 0 amounts are **not discounted** [S30].
- **Parentheses mean negative** [S25, S31].
- "Hardware repairs" is an **operational (recurring)** cost, not a development cost [S23].
- ROI and BEP **ignore the time value of money**; NPV takes it into account [S28, S32].
- Rounding: the slides round each PV cell to whole dollars and add the rounded cells (S30). Do the same, and give the exact value if it differs by $1.

---

## 5. Worked examples & the Small practice tasks, solved step by step and verified

### 5.1 The class example (S25–S32), re-worked with corrections
**Data** (S25): benefits Y1–Y3 = 45,000 / 50,000 / **57,000**; costs Y0–Y3 = 100,000 / 10,000 / 12,000 / 16,000. Required rate of return = 10% (S30).

**Step 1: cash flow table (S25)**

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | | 45,000 | 50,000 | 57,000 | 152,000 |
| Total Costs | 100,000 | 10,000 | 12,000 | 16,000 | 138,000 |
| Net Benefits | (100,000) | 35,000 | 38,000 | 41,000 | 14,000 |
| Cumulative Net Cash Flow | (100,000) | (65,000) | (27,000) | 14,000 | |

**Step 2: ROI (S26).** (152,000 − 138,000) / 138,000 = 14,000 / 138,000 = **10.14%** ✅

**Step 3: BEP (S27).** The cumulative turns positive in Year 3, and there are 2 negative years before it.
BEP = 2 + (41,000 − 14,000) / 41,000 = 2 + **27,000** / 41,000 = 2 + 0.66 = **2.66 years** ⚠️ (the slide prints 28,000 and 2.68)

**Step 4: PV at 10% (S29–S30)**

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | | 45,000 | 50,000 | 57,000 | |
| ÷ (1.10)ⁿ | | ÷ 1.1 | ÷ 1.21 | ÷ 1.331 | |
| PV of Total Benefits | | 40,909 | 41,322 | 42,825 | **125,056** |
| Total Costs | 100,000 | 10,000 | 12,000 | 16,000 | |
| ÷ (1.10)ⁿ | ÷ 1 | ÷ 1.1 | ÷ 1.21 | ÷ 1.331 | |
| PV of Total Costs | 100,000 | 9,091 | 9,917 | 12,021 | **131,029** |

**Step 5: NPV (S31).** 125,056 − 131,029 = **(5,973)** ✅. Since NPV < 0, the project **should not be accepted** at 10% (S32).

**Step 6: the "???%" (S32).** NPV becomes positive only if the required rate of return is below about **6.65%** (the slide's answer). The exact break point is ≈ 6.66%; see the check table under [W3-S32].

**Conclusion:** ROI and BEP look fine, but NPV is negative. The slide's lesson is that the "naïve" techniques can make a project look acceptable when NPV, which is "more rigorous and financially correct", finds it unacceptable.

### 5.2 Small practice 1 [W3-S40]: "Find the year then [when] cumulative net cash flow turns to positive"

**Step 1: classify each item with S23**

| Item (slide wording) | Amount | S23 category | Goes into |
|---|---:|---|---|
| Hardware repairs | 30,000 | Operational Costs | a cost **every year** (Year 1 onward) |
| Increased sales | 20,000 | Tangible Benefits | a benefit **every year** |
| Reduction in staff | 40,000 | Tangible Benefits ("Reductions in staff") | a benefit **every year** |
| Development team salaries | 50,000 | Development Costs | **Year 0** |
| Office space and equipment | 10,000 | Development Costs | **Year 0** |
| Data conversion tools | 10,000 | Development Costs ("Data conversion costs") | **Year 0** |

Assumptions, stated because the slide doesn't spell them out: development costs are paid once in Year 0 (the initial investment, S24/S25); benefits and operating costs are annual (S19) and the same every year, since no growth rate is given.

**Step 2: yearly amounts**
- Year 0 cost = 50,000 + 10,000 + 10,000 = **70,000**
- Each later year: benefits = 20,000 + 40,000 = **60,000**; costs = **30,000**; net = 60,000 − 30,000 = **30,000**

**Step 3: cash flow table**

| | Year 0 | Year 1 | Year 2 | Year 3 |
|---|---:|---:|---:|---:|
| Total Benefits | | 60,000 | 60,000 | 60,000 |
| Total Costs | 70,000 | 30,000 | 30,000 | 30,000 |
| Net Benefits | (70,000) | 30,000 | 30,000 | 30,000 |
| Cumulative Net Cash Flow | (70,000) | (40,000) | (10,000) | **20,000** |

**Answer: Year 3.** That is the first year the cumulative net cash flow is positive.
- Extra, using the S27 formula: BEP = 2 + (30,000 − 20,000) / 30,000 = 2 + 0.33 = **2.33 years** ✅ (script: 2.3333).
- **Common mistake:** treating "Hardware repairs" as a one-time Year-0 cost. That gives Year 0 = (100,000) with +60,000 a year after, so the cumulative goes (40,000) → 20,000 and you would wrongly answer "Year 2". S23 lists hardware repairs under **Operational Costs**, so it recurs every year.
- Extension (not asked; verified): with a 3-year life, ROI = (180,000 − 160,000) / 160,000 = **12.5%**. NPV at 10% = (54,545 + 49,587 + 45,079) − (70,000 + 27,273 + 24,793 + 22,539) = 149,211 − 144,605 = **4,606**.

### 5.3 Small practice 2 [W3-S41]: "Find: ROI, BEP and NPV, if project life cycle is 2 years and rate of return = 10 %"

**Step 1: classify (S23)**

| Item (slide wording) | Amount | S23 category | Goes into |
|---|---:|---|---|
| Hardware repairs | 20,000 | Operational Costs | Years 1 and 2 |
| Increased sales | 40,000 | Tangible Benefits | Years 1 and 2 |
| Reduction in staff | 40,000 | Tangible Benefits | Years 1 and 2 |
| Development team salaries | 50,000 | Development Costs | Year 0 |
| Office space and equipment | 10,000 | Development Costs | Year 0 |
| Data conversion tools | 10,000 | Development Costs | Year 0 |

"Project life cycle is 2 years" is read like S25: the investment at Year 0, then Years 1 and 2 of benefits and operating costs. (In S25, the 3-year example runs Year 0 + Years 1–3.)

**Step 2: cash flow table**
- Year 0 cost = 50,000 + 10,000 + 10,000 = 70,000
- Years 1 and 2: benefits = 40,000 + 40,000 = 80,000; costs = 20,000; net = 60,000

| | Year 0 | Year 1 | Year 2 | Total |
|---|---:|---:|---:|---:|
| Total Benefits | | 80,000 | 80,000 | 160,000 |
| Total Costs | 70,000 | 20,000 | 20,000 | 110,000 |
| Net Benefits | (70,000) | 60,000 | 60,000 | 50,000 |
| Cumulative Net Cash Flow | (70,000) | (10,000) | 50,000 | |

**Step 3: ROI (S26)**
ROI = (160,000 − 110,000) / 110,000 = 50,000 / 110,000 = 0.4545 = **45.45%** ✅

**Step 4: BEP (S27)**
- The cumulative turns positive in **Year 2**, so the number of years of negative cash flow = **1**.
- BEP = 1 + (60,000 − 50,000) / 60,000 = 1 + 10,000 / 60,000 = 1 + 0.17 = **1.17 years** ✅ (1.1667)

**Step 5: PV table at 10% (S29–S30)**

| | Year 0 | Year 1 | Year 2 | Total |
|---|---:|---:|---:|---:|
| Total Benefits | | 80,000 | 80,000 | |
| PV of Total Benefits | | 80,000 / 1.1 = 72,727 | 80,000 / 1.21 = 66,116 | **138,843** |
| Total Costs | 70,000 | 20,000 | 20,000 | |
| PV of Total Costs | 70,000 | 20,000 / 1.1 = 18,182 | 20,000 / 1.21 = 16,529 | **104,711** |

**Step 6: NPV (S31)**
NPV = 138,843 − 104,711 = **$34,132** ✅ (exact 34,132.23). NPV > 0, so the project is **economically acceptable** (S32).

**Answer: ROI = 45.45%; BEP = 1.17 years; NPV = $34,132 (accept).** Here all three measures agree, unlike the class example.
- Another reading (state your convention in the exam): if "2 years" meant Year 0 + Year 1 only, then ROI = (80,000 − 90,000) / 90,000 = −11.11%, the cumulative never turns positive, and NPV = 72,727 − 88,182 = −15,455. The answer above uses the S25 convention.

---

## 6. Likely exam questions (built only from these slides)

**Recall & understanding**

1. Name the two parts of the SDLC Planning phase and list the activities under each. [S3]
2. According to the slides, when is a project identified? Give three examples of business needs and three examples of organizational "pain" that can trigger a project. [S5]
3. Define Business Process Management (BPM) and list its three benefits. [S6]
4. List the four ways business analysts contribute to BPM. Which step is "particularly relevant" to systems analysis, and why? [S7]
5. Distinguish Business Process Automation, Business Process Improvement and Business Process Reengineering (BPR). Which one is described as risky and rare, and what is critical for it? [S8–S10]
6. What is a system request, who usually completes it, and at what point is it prepared? [S11–S12]
7. List the five elements of a system request and give the description of each. [S12–S15]
8. Which system-request element does each item belong to? (a) "Include product search capabilities" (b) "Government-mandated deadline for May 30" (c) "Improve customer service" (d) "$150,000 savings from removal of existing system" (e) "Vice president of marketing" (f) "Produce management reports". [S13–S15]
9. Name the three dimensions of feasibility analysis and the question each answers. To whom are the system request and the feasibility analysis presented, and what does that body decide? Besides the go/no-go decision, what else does feasibility analysis identify? [S16–S17, S21–S22, S35]
10. Technical feasibility is "in essence, a technical risk analysis". List its four risk factors and how each one affects risk. [S18, S21]
11. Classify each item as a development cost, operational cost, tangible benefit or intangible benefit: consultant fees; software licensing fees; reductions in inventory; increased brand recognition; user training; vendor installation; better supplier prices; better supplier relations; development training; communications charges. [S23]
12. What weakness do the simple cash flow projection, ROI and BEP share? Using the slide's reasoning, explain why a dollar received in the future is worth less than a dollar received today. [S28]
13. List the four steps of an economic feasibility analysis and say what each involves. Name the evaluation techniques in step 4. [S33–S34]
14. Define organizational feasibility and say why it is considered hard. Describe the two ways to assess it, define "stakeholder" and name the most important stakeholders. [S35–S36]
15. Who is the champion, and why is more than one champion preferable? For each of the three key stakeholder groups, give one role and one action that enhances organizational feasibility. [S37–S38]
16. Fill in the blank (S32): "The required rate of return would have to be something less than ___% before this project returns a positive NPV." What lesson does the class example illustrate, and what is the NPV decision rule? [S32]

**Calculation problems (mirroring the slides' examples with new numbers)**

17. **PV (like S29).** Using the slide's PV formula, find the present value of: (a) $2,000 received in Year 2 at a 10% rate of return; (b) $5,000 received in Year 4 at 10%; (c) $100 received in Year 3 at 5%. (d) Compare (c) with the slide's example ($100, Year 3, 10% → $75.13).
18. **Full analysis (like S25–S32).** A project has Total Benefits of Year 1 = 40,000, Year 2 = 45,000, Year 3 = 50,000 and Total Costs of Year 0 = 100,000, Year 1 = 5,000, Year 2 = 5,000, Year 3 = 5,000. The required rate of return is 10%. (a) Build the cash flow table (net benefits and cumulative net cash flow). (b) Calculate ROI. (c) Calculate BEP. (d) Build the PV table and calculate NPV. (e) Should the project be accepted? Which lesson from the slides does it show?
19. **Small-practice style (like S40, extended).** During the Project Planning phase the following cash flows were identified: Consultant fees: $40 000; Hardware and software: $30 000; Development training: $10 000; Software licensing fees: $15 000; Increased sales: $35 000; Reductions in inventory: $15 000; Improved customer service: no dollar value could be estimated. Use the same set-up as the Small practice: development costs once in Year 0; operating costs and benefits every year from Year 1. (a) Classify each item. (b) Find the year in which the cumulative net cash flow turns positive, and the BEP. (c) For a 3-year life, find ROI and NPV at 10%.
20. **Small-practice style (like S41).** During the Project Planning phase the following cash flows were identified: Hardware upgrades: $10 000; Increased sales: $50 000; Reductions in IT costs: $20 000; Development team salaries: $60 000; Vendor installation: $15 000; Data conversion costs: $5 000. Find ROI, BEP and NPV if the project life cycle is 2 years and the rate of return is 10%.

### Answers

**A1.** [S3]
1. **Project Initiation**: develop/receive a system request; conduct a feasibility analysis (technical, economic, organizational feasibility).
2. **Project Management**: develop the work plan; staff the project; monitor & control the project.

**A2.** [S5] "A project is identified when someone in the organization identifies a business need to build a system."
- **Needs:** supporting a new marketing campaign; reaching out to a new type of customer; improving interactions with suppliers. Also: new business initiatives and strategies that need a supporting system, and a merger or acquisition that requires systems to be integrated.
- **"Pain":** a drop in market share; poor customer service levels; unacceptable product defect rates; increased competition.

**A3.** [S6] BPM is a "methodology used by organizations to continuously improve end-to-end business processes". It can be applied to internal processes and to processes spanning multiple business partners. Benefits:
1. enhanced process agility (adapt more rapidly and effectively to a changing business environment);
2. improved process alignment with industry "best practices";
3. increased process efficiencies, as costs are identified and eliminated from process workflows.

**A4.** [S7]
1. Defining and mapping the steps in a business process.
2. Creating ways to improve on steps that add value.
3. Finding ways to eliminate or consolidate steps that don't add value.
4. Creating or adjusting electronic workflows to match the improved process maps.

**Step 4** is "particularly relevant … since the need for information systems projects is frequently identified here."

**A5.** [S8–S10]
- **Automation:** technology complements or substitutes for manual information management processes to gain **cost efficiencies**. It is the foundation of many IT systems.
- **Improvement:** study the processes, create redesigned processes to improve workflows, and/or use new technologies that enable new process structures (steps 2–4 of S7).
- **BPR:** "complete revamping": changing the fundamental way the organization operates, "obliterating" the current way of doing business to take advantage of new ideas and technology.

**BPR** involves **substantial risk** and is **fairly rare**. **Top management support and careful management are critical**, and IT people and business people should work closely together.

**A6.** [S11–S12] A system request is "a document that describes the business reasons for building a system and the value that the system is expected to provide." The **project sponsor** usually completes it, as part of a formal system project selection process. It is prepared once the sponsor has identified a project that meets an important business need and can identify its business requirements and business value. At that point it is time to formally initiate the project, and "project initiation begins by preparing a system request."

**A7.** [S12–S15]

| Element | Description |
|---|---|
| Project Sponsor | The person who initiates the project and who serves as the primary point of contact for the project on the business side |
| Business Need | The business-related reason for initiating the system |
| Business Requirements | The business capabilities that the system will provide |
| Business Value | The benefits that the system will create for the organization |
| Special Issues or Constraints | Issues that are relevant to the implementation of the system that need to be known by the approval committee |

**A8.** [S13–S15] (a) Business requirements · (b) Special issues or constraints · (c) Business need · (d) Business value · (e) Project sponsor · (f) Business requirements.

**A9.** [S16–S17, S21–S22, S35]
- **Technical:** "Can we build it?"
- **Economic:** "Should we build the system?" / "Will it provide business value?"
- **Organizational:** "If we build it, will they come?" / "If we build it, will it be used?"

The system request and feasibility analysis go to an **information systems approval committee (steering committee)**, which **decides whether the project should be undertaken**. The committee may authorize the systems analyst to prepare a **more detailed business case**. Feasibility analysis also **identifies the important risks** that must be managed if the project is approved.

**A10.** [S18, S21]
- Familiarity with application: less familiarity → more risk.
- Familiarity with technology: less familiarity → more risk.
- Project size: large projects → more risk.
- Compatibility: the harder it is to integrate the system with the company's existing technology, the higher the risk.

**A11.** [S23]

| Item | Category |
|---|---|
| Consultant fees | Development cost |
| Software licensing fees | Operational cost |
| Reductions in inventory | Tangible benefit |
| Increased brand recognition | Intangible benefit |
| User training | Operational cost |
| Vendor installation | Development cost |
| Better supplier prices | Tangible benefit |
| Better supplier relations | Intangible benefit |
| Development training | Development cost |
| Communications charges | Operational cost |

**A12.** [S28] They all fail to recognize the **time value of money**: "the timing of cash flows is ignored", so a dollar in Year 3 counts the same as a dollar in Year 1. The reasoning: "if you had a dollar today, you could invest it and receive some rate of return". A dollar received in the future means you "forgo that potential return", so it is worth less. Discounted cash flows therefore compare the present value of all inflows and outflows "in today's dollar terms".

**A13.** [S33–S34]
1. **Identify Costs and Benefits:** list the tangible costs and benefits, both one-time and recurring.
2. **Assign Values to Costs and Benefits:** work with business users and IT professionals to put numbers on them; even intangibles should be valued if at all possible.
3. **Determine Cash Flow:** forecast the costs and benefits over a period, usually three to five years, applying a growth rate if necessary.
4. **Assess Project's Economic Value:** compare the expected returns with the costs using one or more of: **ROI** (rate of return on the money invested), **BEP** (the year cumulative benefits exceed cumulative costs; how long until benefits cover costs) and **NPV** (restate everything in today's dollars with an appropriate discount rate, then compare total PV of benefits with total PV of costs).

**A14.** [S35–S36] Organizational feasibility is "how well the system ultimately will be accepted by its users and incorporated into the ongoing operations of the organization": "If we build it, will they come?" It is hard because "there are many organizational factors that can have an impact on the project". It "can be the most difficult feasibility dimension to assess".
- **Way 1, strategic alignment:** how well the project goals align with business objectives. The greater the alignment, the less risky the project.
- **Way 2, stakeholder analysis.** A **stakeholder** is "a person, group, or organization that can affect (or can be affected by) a new system". The most important stakeholders are the **project champion, system users, and organizational management**.

**A15.** [S37–S38] The **champion** is "a high-level executive and is usually, but not always, the project sponsor who created the system request". The champion provides time and resources (e.g., money) and political support by communicating the system's importance to other decision makers. **More than one champion** is preferable because "if the champion leaves the organization, the support could leave as well."

| Stakeholder | One role | One action to enhance organizational feasibility |
|---|---|---|
| Champion | Initiates / promotes the project; allocates time; provides resources | Present the objectives and proposed benefits to executives who will benefit directly; create a prototype to demonstrate potential value |
| Organizational management | Know about the project; budget enough money; encourage users to accept and use the system | Present to management; market benefits via memos and organizational newsletters; encourage the champion to talk with his or her peers |
| System users | Make decisions that influence the project; perform hands-on activities; ultimately determine success by using or not using the system | Give users official roles on the project team; assign specific tasks with clear deadlines; ask for feedback regularly (e.g., weekly meetings) |

**A16.** [S32] **6.65%** (checked: NPV = 0 at ≈ 6.66%).
- **Lesson:** sometimes the "naïve" techniques of ROI and BEP find that the project appears acceptable, but the more rigorous and financially correct NPV technique finds it is actually unacceptable.
- **Rule:** as long as NPV > 0, the project is considered economically acceptable.

**A17.** [S29] PV = Cash flow amount / (1 + rate of return)ⁿ
- (a) 2,000 / (1 + .10)² = 2,000 / 1.21 = **$1,652.89**
- (b) 5,000 / (1 + .10)⁴ = 5,000 / 1.4641 = **$3,415.07**
- (c) 100 / (1 + .05)³ = 100 / 1.157625 = **$86.38**
- (d) At 10% the slide gets $75.13. At 5%, (c) gives $86.38. A lower rate means a smaller denominator, so a higher present value.

**A18.** [S25–S32]

(a) Cash flow table:

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| Total Benefits | | 40,000 | 45,000 | 50,000 | 135,000 |
| Total Costs | 100,000 | 5,000 | 5,000 | 5,000 | 115,000 |
| Net Benefits | (100,000) | 35,000 | 40,000 | 45,000 | 20,000 |
| Cumulative Net Cash Flow | (100,000) | (65,000) | (25,000) | 20,000 | |

(b) ROI = (135,000 − 115,000) / 115,000 = 20,000 / 115,000 = **17.39%**

(c) The cumulative turns positive in Year 3, after 2 negative years. BEP = 2 + (45,000 − 20,000) / 45,000 = 2 + 25,000 / 45,000 = 2 + 0.56 = **2.56 years**

(d) PV table at 10%:

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---:|---:|---:|---:|---:|
| PV of Total Benefits | | 40,000 / 1.1 = 36,364 | 45,000 / 1.21 = 37,190 | 50,000 / 1.331 = 37,566 | 111,120 |
| PV of Total Costs | 100,000 | 5,000 / 1.1 = 4,545 | 5,000 / 1.21 = 4,132 | 5,000 / 1.331 = 3,757 | 112,434 |

NPV = 111,120 − 112,434 = **(1,314)** (exact, unrounded: −1,314.80).

(e) **Reject**, because NPV < 0 at the 10% required rate of return. This is the S32 lesson: ROI (17.39%) and BEP (2.56 years, within the life) make it look acceptable, but NPV shows it is not.

**A19.** [S23, S25–S31, S33, S40]

(a) Classification:
- **Development (Year 0):** consultant fees 40,000 + hardware and software 30,000 + development training 10,000 = **80,000**.
- **Operational (each year):** software licensing fees **15,000**.
- **Tangible benefits (each year):** increased sales 35,000 + reductions in inventory 15,000 = **50,000**.
- **Intangible:** improved customer service has no value assigned, so it stays out of the numbers (S33 step 2 says intangibles should be valued "if at all possible").

(b) Net per year = 50,000 − 15,000 = 35,000. The cumulative goes (80,000) → (45,000) → (10,000) → **25,000**, so it **turns positive in Year 3**. BEP = 2 + (35,000 − 25,000) / 35,000 = 2 + 0.29 = **2.29 years**.

(c) For a 3-year life:
- Total Benefits = 150,000. Total Costs = 80,000 + 3 × 15,000 = 125,000. **ROI** = 25,000 / 125,000 = **20.00%**.
- PV of benefits = 50,000/1.1 + 50,000/1.21 + 50,000/1.331 = 45,455 + 41,322 + 37,566 = 124,343.
- PV of costs = 80,000 + 15,000/1.1 + 15,000/1.21 + 15,000/1.331 = 80,000 + 13,636 + 12,397 + 11,270 = 117,303.
- **NPV** = 124,343 − 117,303 = **$7,040** (exact 7,039.82). NPV > 0, so the project is acceptable.

**A20.** [S23, S26–S31, S41]
- Development (Year 0) = 60,000 + 15,000 + 5,000 = **80,000**.
- Benefits (Years 1 and 2) = 50,000 + 20,000 = **70,000** per year.
- Operational (Years 1 and 2) = hardware upgrades **10,000** per year.
- Net per year = **60,000**.

| | Year 0 | Year 1 | Year 2 | Total |
|---|---:|---:|---:|---:|
| Total Benefits | | 70,000 | 70,000 | 140,000 |
| Total Costs | 80,000 | 10,000 | 10,000 | 100,000 |
| Net Benefits | (80,000) | 60,000 | 60,000 | 40,000 |
| Cumulative Net Cash Flow | (80,000) | (20,000) | 40,000 | |

- **ROI** = (140,000 − 100,000) / 100,000 = **40%**
- **BEP:** the cumulative turns positive in Year 2, after 1 negative year. BEP = 1 + (60,000 − 40,000) / 60,000 = 1 + 0.33 = **1.33 years**
- **NPV:** PV of benefits = 70,000/1.1 + 70,000/1.21 = 63,636 + 57,851 = 121,487. PV of costs = 80,000 + 10,000/1.1 + 10,000/1.21 = 80,000 + 9,091 + 8,264 = 97,355. NPV = 121,487 − 97,355 = **$24,132**. NPV > 0, so **accept**.

(All answers to Q17–Q20 were checked with a script.)

---

## 7. Self-check: "I can…"

- [ ] I can place Planning in the SDLC and list its two parts (Project Initiation, Project Management) with their sub-steps. [S2–S4]
- [ ] I can explain where project ideas come from (business needs vs "pain") and give the slides' examples. [S5]
- [ ] I can define BPM, list its 3 benefits and the analyst's 4 steps, and say why step 4 matters. [S6–S7]
- [ ] I can tell Business Process Automation, Improvement and Reengineering (BPR) apart, including BPR's risk. [S8–S10]
- [ ] I can define a system request, say who completes it, and fill in its five elements with an example for each. [S11–S15]
- [ ] I can name the three feasibility dimensions with their questions, and say who decides (the approval/steering committee) and what else feasibility analysis identifies (risks). [S16–S17, S21–S22, S35]
- [ ] I can list the four technical risk factors and sort any cost or benefit item into the four S23 categories. [S18, S23]
- [ ] Without notes, I can build a cash-flow table and calculate ROI, BEP (with the slide formula) and NPV at 10%, and I can spot the slide errors on S27 (27,000 → 2.66 years) and S30 (55,000 → 57,000). [S25–S31]
- [ ] I can explain why ROI and BEP can mislead (the time value of money), why NPV is "more rigorous and financially correct", and the NPV > 0 rule, including the "6.65%" answer. [S28, S32]
- [ ] I can explain organizational feasibility (strategic alignment + stakeholder analysis), define stakeholder and champion, and list each stakeholder group's roles and enhancement actions. [S35–S38]
