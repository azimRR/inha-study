# Planning Phase, Feasibility & Project Management (Dennis/Wixom/Roth 8e; Dennis/Wixom/Tegarden OO/UML): exam-oriented outside notes

> **Provenance and edition caveat (read first).** These notes come only from legal, freely accessible sources. The main ones are Wiley instructor slides for Dennis, Wixom & Roth (DWR) **5th ed. (2011) Ch. 2** and **6th ed. (2015) Ch. 1**, both hosted on a CUHK course site, plus Wiley's own free **table of contents and Chapter 1 excerpt for Dennis, Wixom & Tegarden (DWT) 6th ed. (2020)**. I add .edu lecture notes, IFPUG/QSM function-point material, OpenStax finance, Construx, Wikipedia/Atlassian (for PM definitions) and arXiv (for AI). I could **not** reach a legal free copy of DWR **8th ed.** content, so check figure numbers and wording against your professor's slides. I re-ran **every number** in this file in a Python script (`verify_pm03.py`, kept in my scratchpad). Several search hits were full-text textbook PDFs posted without apparent authorization. I deliberately left them out and do not link them.

---

## 1. Project initiation: business need, business requirements, business value, the system request, the project sponsor

### Takeaway
A project starts when someone identifies a **business need** and a **project sponsor** formally requests a system through a **system request**. The request has five elements: project sponsor, business need, business requirements, business value, and special issues/constraints.

The approval (steering) committee uses the request and the preliminary feasibility analysis to decide whether to approve the project. The approved project is then "set up" with a project plan (work plan and staffing plan). Note that DWR's slide puts the explicit **go/no-go** decision later, after the analysis-phase system proposal.

### Cited Findings
- **The DWR planning phase has two steps:** ([DWR 6e Ch.1 slides, Wiley, hosted by CUHK](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf))
  - **"Project Initiation"**: "Prepare system request" and "Perform preliminary feasibility analysis".
  - **"Set Up the Project"**: "Project Plan, including work plan & staffing plan".
  - Note on timing: the slide's **"Go/No Go decision made by sponsor and steering committee"** comes at the end of the **analysis phase**, after the system proposal ("Prepare and Present System Proposal"). It is not a planning-phase step.
- **Project sponsor:** "Strong business need leads to a person or group stepping up as the Project Sponsor". The sponsor is the "Driving force behind project", "Specifies overall business requirements", "Determines business value", and "Formally requests a project via the System Request". ([DWR 6e Ch.1 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf))
- **Purpose of the system request:** it "Describes business reasons for project" and "Defines system's expected value". It forces the sponsor to formalize their ideas, gives a framework for collecting initial project information, and standardizes the information the steering (approval) committee uses. It also lists the project's key elements. ([DWR 6e Ch.1 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf))
- **The five elements of the system request** (slide "Elements of the Systems Request") ([DWR 6e Ch.1 slides, slide 23](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf)):

| Element | Description (slide wording) | Examples on the slide |
|---|---|---|
| Project sponsor | "The person who initiates the project and who serves as the primary point of contact for the project on the business side" | Several members of the finance department; VP of marketing; CIO; CEO |
| Business need | "The business-related reason for initiating the system" | Reach a new market segment; offer a capability to keep up with competitors; improve access to information; decrease product defects; streamline supply acquisition processes |
| Business requirements | "The new or enhanced business capabilities that the system will provide" | Provide online access to information; capture customer demographic information; include product search capabilities; produce performance reports; enhance online user support |
| Business value | "The benefits that the system will create for the organization" | 3% increase in sales; 1% increase in market share; reduction in headcount by 5 FTEs; $200,000 cost savings from decreased supply costs; $150,000 savings from removal of outdated technology |
| Special issues or constraints | "Issues that pertain to the approval committee's decision" | Government-mandated deadline for May 30; system needed in time for the Christmas holiday season; top-level security clearance needed by project team to work with data |

- **Worked textbook example (Tune Source "Digital Music Download" system request):** ([DWR 6e Ch.1 slides, slide 24](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf))
  - Sponsor: Carly Edwards, Assistant VP, Marketing.
  - Need: sell digital music downloads through in-store kiosks and the website. Customers have many alternatives, and the archive of rare music is underutilized.
  - Requirements: search the archive, listen to samples, buy individual downloads at a fixed fee, monthly subscription for unlimited downloads, buy gift cards.
  - Value (conservative tangible estimates): $757,500 from individual downloads, $950,000 from subscriptions, $205,000 from additional CD sales, $153,000 from gift cards.
  - Special issues: marketing sees it as strategic and wants it completed ASAP to prevent customer attrition.
- **Estimating business value:** "Identify sources: increased sales; decreased costs; reduced headcount; lower turnover…" and "Assign values as initial estimates". ([DWR 6e Ch.1 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf))
- **Tangible vs intangible:** cost–benefit work should "Consider tangible and intangible benefits", and "Even intangibles should be valued if at all possible". In the Tune Source cost–benefit footnote, "An important yet intangible benefit will be the ability to offer services that our competitors currently offer." ([DWR 6e Ch.1 slides, slides 30–31](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf))
- **Where needs come from:** the same deck covers Business Process Improvement (study business processes; redesign workflows and/or use new technologies) and Business Process Reengineering ("Total overhaul of work processes"). ([DWR 6e Ch.1 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf))
- In the OO/UML edition, Ch. 2 "Project Management" opens with Project Identification (p. 43), System Request (p. 44), and Feasibility Analysis (pp. 45–53). ([DWT 6e table of contents, Wiley PDF](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-83.pdf))

### Inferences
- **Exam recipe ("write or critique a system request"):**
  1. Name **one accountable business person** as sponsor.
  2. State the **need** as a business problem or opportunity, not as technology.
  3. List the **requirements** as business capabilities ("customers can track orders"), not as a technical design.
  4. Quantify the **value**: tangible amounts in dollars or percent, plus at least one named intangible.
  5. Put deadlines, budget caps, legal mandates and security clearances under **special issues**.
- **Common traps:**
  - Need vs requirement vs value are easily confused. Need = *why* (the problem). Requirement = *what capability*. Value = *benefit*, ideally in numbers.
  - "Use Oracle/cloud" is not a business requirement.
  - A deadline is a **constraint**, not a requirement.
  - The sponsor is on the **business side**, not IT.
  - The system request is a **planning-phase** deliverable. It comes before feasibility analysis and is reassessed later.
  - Keep the **two decision points** apart:
    - Project approval or selection by the approval committee, after the system request and feasibility analysis (planning).
    - The **go/no-go** decision by the sponsor and steering committee, after the **system proposal** (end of analysis).
  - Also, the planning phase ends with the **project plan** (work plan and staffing plan), not with the system request.
- The cost–benefit footnote turns an intangible-sounding benefit (fewer complaint calls) into a **tangible** one by valuing the call-handling costs saved. This is a good example to quote when asked how to quantify a "soft" benefit.

### Gaps
- I could not legally access the DWR **8th ed.** text, so the 8th-ed. case study may differ from "Tune Source" and the figure numbers are unverified.
- The DWR wording "the project sponsor is the person (or group) who has an interest in seeing the system succeed", and the exact 8th-ed. list of example values, could not be verified verbatim.

---

## 2. Feasibility analysis: technical and organizational feasibility (and feasibility risk)

### Takeaway
Feasibility analysis is the detailed business case and answers three questions:
- **Technical:** "Can we build it?" Risk rises with lower familiarity with the business area and the technology, bigger project size, and harder compatibility/integration.
- **Economic:** "Should we build it?" (Section 3.)
- **Organizational:** "If we build it, will they come?" This covers strategic alignment plus the stakeholders: champion, organizational management and system users.

Feasibility must be **re-assessed throughout** the project.

### Cited Findings
- Feasibility analysis is the "Detailed business case for the project" covering technical, economic and organizational feasibility. It is "Compiled into a feasibility study", and it is "Critically important to reassess feasibility throughout the project". ([DWR 6e Ch.1 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf))
- **Technical feasibility ("Can We Build It?") — sources of technical risk:** ([DWR 6e Ch.1 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf))
  - "Users' and analysts' lack of familiarity with the business application area"
  - "Lack of familiarity with technology" ("Have we used it before? How new is it?")
  - "Project size" ("Number of people, time frame, distinct features")
  - "Compatibility with existing systems" ("Degree of integration required")
- **Mitigation example from the slides.** If the team is unfamiliar with a new technology:
  - "Provide enough budget for training"
  - "…to hire consultants with expertise"
  - "Allow more schedule time to move up the learning curve"
  - "Use a methodology that incorporates experimentation"

  The goal is "to know the risks we face and the significance of those risks". ([DWR 6e Ch.1 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf))
- **Organizational feasibility ("If We Build It, Will They Come?"):** ([DWR 6e Ch.1 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf))
  - **Strategic alignment:** "Are project goals aligned with business strategy?" "Close alignment with strategy increases the likelihood of success."
  - **Stakeholders:** "Strong and influential project champion?", "Strong and widespread organizational management support?", "Receptive / resistant system users?"
  - **"Stakeholder groups can be influenced"** through presentations promoting the benefits, emphasizing personal as well as organizational benefits, prototypes that prove the concept, and "Real user involvement throughout project".
- **Continuous review:** "How well are we managing the risks we previously identified?" and "Are there any new risks that have appeared?", including their budget and schedule effect. ([DWR 6e Ch.1 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf))
- "Familiarity with Technology" also appears as a factor when **selecting a development methodology**, alongside clarity of user requirements, system complexity, system reliability, short time schedules and schedule visibility. ([DWR 5e Ch.2 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- DWT 6e covers Technical Feasibility (p. 45), Economic Feasibility (p. 46) and Organizational Feasibility (p. 51) in Ch. 2. ([DWT 6e TOC](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-83.pdf))

### Inferences
- **Exam recipe: classify a risk statement.**
  - "We have never done X (business domain)" → technical, *functional area*.
  - "We have never used tool Y / Y is brand-new" → technical, *technology*.
  - "50 people / 2 years / hundreds of features" → technical, *size*.
  - "Must integrate with a legacy system" → technical, *compatibility*.
  - "NPV < 0 / payback too long" → economic.
  - "Does not fit strategy / no champion / managers unconvinced / users resist" → organizational.
- **Traps:**
  - Technical feasibility is about the **risk that *this team* cannot build it**, not whether the technology exists.
  - Unfamiliarity with the *business area* counts as **technical** risk in DWR, even though it sounds organizational.
  - Organizational feasibility is about **acceptance and alignment**, not the org chart.
  - The champion and organizational management are different stakeholder groups. A champion alone is not "widespread" support.

### Gaps
- **Unverified recall of DWR's stakeholder-role descriptions.** I could not find these verbatim in a legal free source, so check them against your slides:
  - **Champion:** a high-level, typically non-IS executive, usually but not always the sponsor. Initiates and promotes the project, allocates time, provides resources.
  - **Organizational management:** knows about the project, budgets enough money, encourages acceptance.
  - **System users:** make decisions that influence the project, perform hands-on activities, ultimately determine whether it succeeds.
- The 8th-ed. wording of the four technical risk factors may differ slightly. The slide wording above is from the 6th ed.

---

## 3. Economic feasibility: costs and benefits, cash flows, NPV, ROI, break-even point, payback

### Takeaway
DWR's procedure is: (1) identify costs and benefits, (2) assign values, (3) determine cash flow over usually 3–5 years, applying growth rates, (4) assess economic value with **ROI, break-even point (BEP) and NPV**. NPV is the preferred measure.

In the textbook's own Tune Source example (6% discount rate), **NPV ≈ $68,292**, **ROI ≈ 2.97% on present-value totals**, and the **BEP is 3.84 years** under the Dennis formula. I computed the ROI and BEP figures myself and verified them.

### Cited Findings
- **The four steps (slide wording):** ([DWR 6e Ch.1 slides, slide 30](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf))
  1. **Identify costs and benefits:** "List the tangible costs and benefits for the project. Include both one-time and recurring costs."
  2. **Assign values to costs and benefits:** "Work with business users and IT professionals to create numbers for each of the costs and benefits. Even intangibles should be valued if at all possible."
  3. **Determine cash flow:** "Forecast what the costs and benefits will be over a certain period, usually, 3–5 years. Apply a growth rate to the values, if necessary."
  4. **Assess the project's economic value** using:
     - **ROI:** "Calculate the rate of return earned on the money invested in the project, using the ROI formula."
     - **BEP:** "Find the year in which the cumulative project benefits exceed cumulative project costs. Apply the breakeven formula, using figures for that year. This calculation measures how long it will take for the system to produce benefits that cover its costs."
     - **NPV:** "Restate all costs and benefits in today's dollar terms (present value), using an appropriate discount rate. Determine whether the total present value of benefits is greater than or less than the total present value of costs."
- "Include development and operational costs." In cost–benefit analysis, the "Discounted cash flow method [is] preferred" and "NPV [is] preferred". ([DWR 6e Ch.1 slides, slides 30–31](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf))
- **Formulas on Dennis/Wixom slides:** "Return on investment equals total (benefits − costs) divided by total costs", and present value equals "some amount of money divided by (1 + interest rate)^n, where n equals the number of periods". ([DWR 2e Ch.3 "Project Initiation" slides, third-party host of Wiley slides, read via fetch summary](https://slideum.com/doc/4188989/systems-analysis-and-design-allen-dennis-and-barbara-haley))
- **The Tune Source cost–benefit analysis**, which is the textbook's own data (6e; years 2015–2019, with 2015 = year 0, the development year) ([DWR 6e Ch.1 slides, slide 31](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf)):
  - **Benefits** for 2016–2019:
    - Increased sales: 500,000 / 530,000 / 561,800 / 595,508
    - Reduction in customer complaint calls: 70,000 each year (footnote: "based on reduced costs of handling customer complaint phone calls")
    - Reduced inventory costs: 68,000 each year
    - **Total benefits:** 638,000 / 668,000 / 699,800 / 733,508
    - **PV total benefits:** 601,887 / 594,518 / 587,566 / 581,007, total **2,364,978**
  - **Development costs** (2015 only):
    - 2 servers @ $125,000 = 250,000
    - Printer 100,000
    - Software licenses 34,825
    - Server software 10,945
    - Development labor 1,236,525
    - **Total 1,632,295**
  - **Operational costs** for 2016–2019:
    - Hardware 50,000 per year
    - Software 20,000 per year
    - Operational labor 115,000 / 119,600 / 124,384 / 129,359
    - **Total** 185,000 / 189,600 / 194,384 / 199,359
  - **PV total costs:** 1,632,295 / 174,528 / 168,743 / 163,209 / 157,911, total **2,296,686**
  - **"NPV (PV Total Benefits – PV Total Costs)" = 68,292**
- **NPV (finance definition):** each cash flow is discounted back to present value. "Projects with a positive NPV should be accepted, and projects with a negative NPV should be rejected". The discount rate can be raised or lowered to reflect risk.
  - **OpenStax example:** cost $16,000; inflows 2,000, 4,000, 5,000, 5,000, 5,000, 5,000; 9% cost of funds; NPV = **$2,835.63**.
  - ([OpenStax Principles of Finance 16.2](https://openstax.org/books/principles-finance/pages/16-2-net-present-value-npv-method))
- **Payback period:** the same machine's cumulative inflows reach $16,000 at the end of year 4, so payback = 4 years. The method "ignores the time value of money". Any cutoff period a firm chooses is arbitrary. ([OpenStax 16.1](https://openstax.org/books/principles-finance/pages/16-1-payback-period-method))

### Inferences

**Recipe and formulas (exam form):**
- **PV of an amount received in year n:** PV = Amount / (1 + i)^n. Year 0 is *not* discounted.
- **Yearly NPV cash flow** in year t = PV(benefits_t) − PV(costs_t).
- **NPV** = Σ PV(benefits) − Σ PV(costs). Accept if NPV > 0.
- **ROI** = (Total benefits − Total costs) / Total costs. Say whether you use **PV totals** (consistent with "NPV preferred") or undiscounted totals. They differ a lot (see below).
- **Break-even point (Dennis form):**
  1. Build the cumulative NPV cash-flow row.
  2. Find the **first year in which it turns positive**.
  3. Compute **BEP = (number of years with negative cumulative cash flow) + (that year's NPV cash flow − that year's cumulative NPV cash flow) / that year's NPV cash flow.**
  - **Algebraic identity:** because cumulative_t = cumulative_(t−1) + CF_t, the fraction equals |cumulative_(t−1)| / CF_t. That is exactly the standard "unrecovered amount ÷ cash flow in the recovery year" interpolation used for payback. If the cash flows are not discounted, the same formula gives the ordinary payback period. Both forms always give the same answer, so use whichever you remember.
  - **Recall flag:** the verbatim wording of this formula is from memory of DWR, not from a retrieved source (see Gaps). The slide quoted above confirms the procedure.

**Worked example 1: Tune Source, from the textbook data above (my verification).**
- The slide's PV numbers are reproduced exactly by **discounting at 6%**. For example, 638,000 / 1.06 = 601,887 and 199,359 / 1.06⁴ = 157,911.
- Sales grow 6% per year (500,000 → 530,000 → 561,800 → 595,508). Operational labor grows 4% per year (115,000 → 119,600 → 124,384 → 129,359).

| | 2015 (yr 0) | 2016 (yr 1) | 2017 (yr 2) | 2018 (yr 3) | 2019 (yr 4) | Total |
|---|---|---|---|---|---|---|
| PV benefits | 0 | 601,887 | 594,518 | 587,566 | 581,007 | 2,364,978 |
| PV costs | 1,632,295 | 174,528 | 168,743 | 163,209 | 157,911 | 2,296,686 |
| Yearly NPV cash flow | −1,632,295 | 427,359 | 425,775 | 424,357 | 423,096 | **68,292** |
| Cumulative NPV cash flow | −1,632,295 | −1,204,936 | −779,161 | −354,804 | **+68,292** | |

- **NPV** = 2,364,978 − 2,296,686 = **$68,292**. The unrounded value is 68,290.85, so the textbook sums yearly PVs that were rounded to whole dollars.
- **ROI on PV totals** = 68,292 / 2,296,686 = **2.97%**.
- **ROI on undiscounted totals** = (2,739,308 − 2,400,638) / 2,400,638 = **14.11%**.
- **BEP:** cumulative turns positive in 2019, after 3 operating years with negative cumulative cash flow (2016–2018). BEP = 3 + (423,096 − 68,292) / 423,096 = 3 + 0.8386 = **3.84 years**.
  - Identity check: 354,804 / 423,096 = 0.8386.
- **Undiscounted payback** = 3 + 195,479 / 534,149 = **3.37 years**. This is shorter because discounting delays break-even.

**Worked example 2: OpenStax machine, via the Dennis BEP formula (verified).**
- Discounted at 9%, the yearly PVs are:

| Year | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| PV | 1,834.86 | 3,366.72 | 3,860.92 | 3,542.13 | 3,249.66 | 2,981.34 |

- The cumulative position first becomes positive in **year 6**, at +2,835.63.
- **Discounted BEP** = 5 + (2,981.34 − 2,835.63) / 2,981.34 = **5.05 years**, compared with an undiscounted payback of **4.0 years**.

**Exam traps:**
1. Discounting year 0 (don't).
2. Counting year 0 as a "negative year" in the BEP. In DWR-style tables, count the *operating* years before the positive year, as above.
3. Mixing PV and nominal totals inside one ROI.
4. Calling ROI a "rate per year". It is a total return over the horizon, not an annual rate.
5. Forgetting to apply growth rates.
6. Listing an intangible benefit without valuing or at least naming it.
7. Treating "payback" and "BEP" as identical when the question says "using NPV cash flows".
8. Rounding too early. Keep 4+ decimals in the discount factors.
9. **Development (one-time) costs vs operational (recurring) costs.** Servers, printer, licenses and development labor in year 0 are development costs. Hardware/software upkeep and operational labor in years 1–4 are operational costs (Tune Source table).

### Gaps
- **Verbatim wording of the DWR break-even formula** ("Number of years of negative cash flow + (That year's NPV cash flow − That year's cumulative NPV cash flow) / That year's NPV cash flow") is from my recall of the textbook. I could not retrieve it from a legal free source; the 6e slide confirms only the procedure.
- I could not confirm whether DWR 8e computes ROI on PV totals or undiscounted totals, or whether it prints ROI/BEP values for its case. Tell the examiner which basis you use.
- The 8e case data (company, years, discount rate) may differ from the 6e Tune Source figures used here.

---

## 4. Project selection and portfolio management

### Takeaway
Projects are not approved one at a time. An **approval committee** evaluates each project within the organization's **portfolio**, balancing return, risk and limited resources. That is why a project with positive NPV can still be rejected.

### Cited Findings
- "CIOs … are challenged to select projects that will provide highest return on the IT investments", and "Project portfolio management has become a critical success factor for IT departments." ([DWR 5e Ch.2 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- "Systems projects today are evaluated in the context of an entire portfolio of projects". Determining a project's contribution to the portfolio "reinforces the need for a feasibility study". ([DWR 5e Ch.2 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- "An approval committee must be selective about where to allocate resources as most organizations have limited funds." "If there are several potentially high-payoff projects, and they all have the same risk, then maybe only one of the projects will be selected." ([DWR 5e Ch.2 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- The project management phases listed are "initiation, planning, execution, control, and [closure]". The slide says "enclosure". ([DWR 5e Ch.2 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- DWT 6e has a "Project Selection" section (p. 53) followed by "Ethical Considerations" (p. 54). ([DWT 6e TOC](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-83.pdf))

### Inferences
- **Exam recipe ("which projects should the committee approve?"):**
  1. Drop projects with NPV < 0 unless they are mandatory (for example, regulatory) or strategic with a valued intangible.
  2. Check strategic alignment.
  3. Balance the portfolio: do not take several projects with the same high risk; mix short and long, and big and small.
  4. Respect the budget and staffing limit.
  5. Rank by NPV (or NPV per dollar) within the constraints.
- **Traps:**
  - The committee (steering/approval) selects. The PM manages after selection.
  - A higher ROI does not automatically win. Risk and fit matter too.
  - Feasibility results are inputs to selection, not the decision itself.

### Gaps
- DWR's list of project characteristics used in portfolio decisions could not be retrieved; I recall it as size, cost, purpose, length, risk, scope and economic value. Treat this as unverified and check your slides.
- I found no legal free source for any 8e "project selection" figure.

---

## 5. The project manager's role and identifying project size: industry-standard percentages, function points, effort, schedule, COCOMO

### Takeaway
The PM's job is to make trade-offs among **size (functionality), time and cost**, starting from a realistic estimate. DWR gives two estimation methods:
- **(a) Industry-standard percentages** (planning 15%, analysis 20%, design 35%, implementation 30%), extrapolated from the actual effort of the planning phase.
- **(b) The function point approach:**
  1. **TUFP**
  2. **PC**
  3. **APC = 0.65 + 0.01 × PC**
  4. **TAFP = TUFP × APC**
  5. **LOC = TAFP × LOC-per-FP for the language**
  6. **Effort (person-months) = 1.4 × KLOC**
  7. **Schedule (months) = 3.0 × (person-months)^(1/3)**

### Cited Findings
- "The science (or art) of project management is in making trade-offs among three important concepts: the size of the system, the time to complete the project, and the cost of the project." ([DWR 5e Ch.2 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- "A critical success factor for project management is to start with a realistic assessment of the work and then manage the project according to the plan." ([DWR 5e Ch.2 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- **"Estimating the Project Time Frame":** "1. Estimating Project Time Using Industry Standards; 2. Function point approach (Appendix 2A)". In the 5th edition, function points sit in **Appendix 2A**. ([DWR 5e Ch.2 slides, slide 2-17](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- **Industry-standard percentages for business applications:** planning **15%**, analysis **20%**, design **35%**, implementation **30%**. The slide's worked example: actual planning effort = **4 person-months** gives estimated analysis **5.33**, design **9.33** and implementation **8** person-months. ([DWR 5e Ch.2 slides, slide 2-17](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- **Function point steps** (.edu lecture notes on the same method) ([UW IS 460 Lecture 14, Prof. Yong Tan](https://faculty.washington.edu/ytan/is460/notes/LN14.pdf)):
  - "Step 1: Total Unadjusted Function Points (TUFP)"
  - "Step 2: Project Complexity (PC)"
  - "Step 3: Adjusted Project Complexity (PCA) PCA = 0.65 + 0.01 * PC"
  - "Step 4: Total Adjusted Function Points TAFP = TUFP * PCA"
  - Then "LOC = k * TAFP (k is the LOC to FP conversion factor)", "Effort (in person-months) = 1.4 * thousand LOC" (labelled "COCOMO Estimation Calculation"), and the rule of thumb "Schedule Time = 3.0 * Effort ^ (1/3)".
  - The five factors are files, program interfaces, external inputs, external outputs and external queries.
  - Example: 100 FP ≈ 13,000 lines of C or 3,000 lines of VB.
- **IFPUG complexity weights (low / average / high):**

| Component | Low | Average | High |
|---|---|---|---|
| External Input (EI) | 3 | 4 | 6 |
| External Output (EO) | 4 | 5 | 7 |
| External Inquiry (EQ) | 3 | 4 | 6 |
| Internal Logical File (ILF) | 7 | 10 | 15 |
| External Interface File (EIF) | 5 | 7 | 10 |

  ([Longstreet, *Function Point Analysis* reference, KU-hosted](https://people.eecs.ku.edu/~saiedian/Teaching/811/Papers/Function-Points/fpa-ref.pdf))
- **The 14 general system characteristics** (each rated 0–5): ([Longstreet FPA reference](https://people.eecs.ku.edu/~saiedian/Teaching/811/Papers/Function-Points/fpa-ref.pdf))
  1. Data communications
  2. Distributed data processing
  3. Performance
  4. Heavily used configuration
  5. Transaction rate
  6. Online data entry
  7. End-user efficiency
  8. Online update
  9. Complex processing
  10. Reusability
  11. Installation ease
  12. Operational ease
  13. Multiple sites
  14. Facilitate change
- The "influence multiplier" "ranges from 0.65 to 1.35; is based on 14 factors". ([RIT SWEN-256 slides](https://www.se.rit.edu/~swen-256/slides/SWEN256-10-FunctionPointEstimationandCOCOMO.pdf))
- **Current IFPUG practice:** "Assessing the VAF and using Adjusted function points is no longer recommended in IFPUG CPM 4.3, nor is it used by the ISBSG group". ([Total Metrics](https://totalmetrics.com/help/Managing_your_Function_Point_Counts/Managing_Applications_Projects_and_Counts/Value_Adjustment_Factor/Assessing_the_Value_Adjustment_Factor.htm)) Textbooks still teach the adjustment.
- Function points were defined in 1979 by **Allan J. Albrecht at IBM**. ([Wikipedia: Function point](https://en.wikipedia.org/wiki/Function_point))
- **QSM SLOC-per-FP "gearing factors" (Version 5.0, average values; 2,192 projects; 37 languages):** ([QSM Function Point Languages Table](https://www.qsm.com/resources/function-point-languages-table))

| Language | Avg SLOC per FP |
|---|---|
| C | 97 |
| C++ | 50 |
| C# | 54 |
| COBOL | 61 |
| Java | 53 |
| JavaScript | 47 |
| HTML | 34 |
| SQL | 21 |
| Visual Basic | 42 |
| VB.NET | 52 |
| .NET | 57 |
| PL/SQL | 37 |
| Excel | 209 |

  QSM recommends that organizations calibrate with their own data.
- **Basic COCOMO (Boehm)** ([UW IS 460](https://faculty.washington.edu/ytan/is460/notes/LN14.pdf); [RIT slides](https://www.se.rit.edu/~swen-256/slides/SWEN256-10-FunctionPointEstimationandCOCOMO.pdf)):
  - Effort PM = a·KLOC^b, with organic 2.4/1.05, semi-detached 3.0/1.12, embedded 3.6/1.20.
  - Schedule TDEV = 2.5·PM^d, with d = 0.38 / 0.35 / 0.32.
  - Mode sizes: organic ≈ 2–50 KLOC; semi-detached 50–300; embedded > 300.
  - RIT example for 200 KLOC: organic ≈ 626 staff-months and about 29 months.
- COCOMO, SEER-SEM and SLIM are probably the most common parametric models. COCOMO II (2000) was the last major COCOMO release. ([Wikipedia: Software development effort estimation](https://en.wikipedia.org/wiki/Software_development_effort_estimation))
- The OO/UML edition (DWT 6e) estimates effort with **use-case points**; its index lists "Adjusted use-case points (UCP), 61" under "Project Effort Estimation" (p. 60). ([DWT 6e TOC](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-83.pdf); [DWT 6e index](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-91.pdf))

### Inferences

**Recipe A: industry-standard percentages (verified).**
- Total effort = actual phase effort ÷ that phase's percentage. Each other phase = total × its percentage.
- Example with planning = 4 PM: total = 4 / 0.15 = **26.67 PM**. Analysis = 0.20 × 26.67 = 5.33. Design = 9.33. Implementation = 8.00. These match the slide.
- With planning = 6 weeks: total 40 weeks; analysis 8, design 14, implementation 12 weeks.

**Recipe B: full function-point estimate. Worked example (constructed; every number verified).**
1. **Count and weight the components:**
   - Inputs: 6 low, 4 avg, 2 high → 6×3 + 4×4 + 2×6 = **46**
   - Outputs: 5 low, 3 avg, 2 high → 5×4 + 3×5 + 2×7 = **49**
   - Queries: 4 low, 2 avg, 1 high → 4×3 + 2×4 + 1×6 = **26**
   - Files: 3 low, 2 avg, 1 high → 3×7 + 2×10 + 1×15 = **56**
   - Program interfaces: 2 low, 1 avg, 0 high → 2×5 + 1×7 = **17**
   - **TUFP = 194**
2. **Processing complexity.** Rate the 14 characteristics 0–5, for example 3, 2, 3, 1, 2, 4, 3, 2, 2, 1, 1, 2, 1, 3. **PC = 30.**
3. **APC** = 0.65 + 0.01 × 30 = **0.95**.
4. **TAFP** = 194 × 0.95 = **184.3**.
5. **Lines of code (Java, 53 LOC/FP)** = 184.3 × 53 = **9,768 LOC ≈ 9.768 KLOC**.
6. **Effort** = 1.4 × 9.768 = **13.68 person-months**.
7. **Schedule** = 3.0 × 13.68^(1/3) = 3.0 × 2.392 = **7.17 months**.
8. **Average staff** = 13.68 / 7.17 ≈ **1.9, so about 2 people**.

**Language sensitivity (same 184.3 TAFP).** Effort is 25.03 PM in C (97), 15.74 in COBOL (61), 12.90 in C++ (50), 10.84 in VB (42) and 5.42 in SQL (21). Language choice matters as much as functionality.

**COCOMO cross-check.** For 9.768 KLOC, basic COCOMO organic gives **26.27 PM and 8.66 months**, versus 13.68 PM and 7.17 months with the Dennis simplification. The models disagree by about 2×. Never mix them in one answer: use the formula the question gives.

**Traps:**
- The adjustment is **0.01** × PC, not 0.1. PC is at most 70, so APC lies between 0.65 and 1.35.
- Adjust TUFP *before* converting to LOC.
- The effort formula uses **thousands** of LOC.
- Schedule uses the **cube root** of person-months, not person-months ÷ 3.
- Staff = person-months ÷ schedule months.
- Percentages in Recipe A apply to **total project effort**, not to the remaining effort.
- "Files" in Dennis = internal logical files. "Program interfaces" = external interface files.

### Gaps
- **Dennis's own LOC-per-FP table** (the values printed in the textbook) could not be retrieved. Values differ by source and version: the UW notes imply about 130 for C and about 30 for VB, while QSM v5 gives 97 and 42. Use whatever table the exam provides.
- Unverified recall: some DWR editions offer a "simplified" complexity shortcut (APC = 0.65 for a very simple system, 1.00 normal, 1.35 complex). Check your slides.
- Whether DWR **8e** still includes the function point appendix is unknown; the 5e put it in Appendix 2A.
- **DWT use-case-point formulas, from recall and not retrieved:**
  - UUCP = UUCW + UAW
  - TCF = 0.6 + 0.01 × TFactor
  - ECF = 1.4 − 0.03 × EFactor
  - UCP = UUCP × TCF × ECF
  - Effort ≈ UCP × 20 (or 28) person-hours
- DWR's one-line definition of project management ("planning and controlling the development of a system within a specified time frame at a minimum cost with the right functionality") is recall and not verified.

---

## 6. Creating and managing the workplan: WBS, Gantt chart, PERT, CPM

### Takeaway
1. **Identify tasks** with a WBS (a hierarchical decomposition covering 100% of the scope).
2. **Estimate durations.** PERT uses te = (o + 4m + p)/6.
3. **Sequence the tasks** in a network.
4. **Run CPM:**
   - Forward pass → ES/EF.
   - Backward pass → LS/LF.
   - Slack = LS − ES.
   - Critical path = the longest path, where all tasks have zero slack.
5. **Show and track the schedule on a Gantt chart.**

### Cited Findings
- DWR's "Developing the Work Plan" slides cover: Identify Tasks, Work Breakdown Structure, "The project work plan". The Gantt chart is shown as a project management tool. ([DWR 5e Ch.2 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- DWT 6e's "Traditional Project Management Tools" are Work Breakdown Structures (p. 55), Gantt Chart (p. 57) and Network Diagram (p. 57). "Creating and Managing the Workplan" and "Evolutionary Work Breakdown Structures and Iterative Workplans" are both on p. 65. ([DWT 6e TOC](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-83.pdf))
- **WBS 100% rule:** the WBS "includes 100% of the work defined by the project scope and captures all deliverables … including project management". Child work must sum to 100% of the parent. ([Wikipedia: Work breakdown structure](https://en.wikipedia.org/wiki/Work_breakdown_structure))
- **Gantt chart:** "a bar chart that illustrates a project schedule". Henry Gantt designed and popularized it around 1910–1915. Modern versions also show dependencies and current status. ([Wikipedia: Gantt chart](https://en.wikipedia.org/wiki/Gantt_chart))
- **PERT:** uses three estimates, optimistic (o), most likely (m) and pessimistic (p).
  - **te = (o + 4m + p) ÷ 6**
  - **σ_te = (p − o)/6**
  - Path TE = Σ te. ([Wikipedia: PERT](https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique))
- **Wikipedia's PERT example:**

| Activity | Predecessor | o | m | p | te |
|---|---|---|---|---|---|
| A | — | 2 | 4 | 6 | 4.00 |
| B | — | 3 | 5 | 9 | 5.33 |
| C | A | 4 | 5 | 7 | 5.17 |
| D | A | 4 | 6 | 10 | 6.33 |
| E | B, C | 4 | 5 | 7 | 5.17 |
| F | D | 3 | 4 | 8 | 4.50 |
| G | E | 3 | 5 | 8 | 5.17 |

  ([Wikipedia: PERT](https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique))
- **CPM:** "calculates the longest path of planned activities … and the earliest and latest that each activity can start and finish without making the project longer". Critical activities have zero "total float". The critical path "determines the shortest time possible to complete the project". ([Wikipedia: Critical path method](https://en.wikipedia.org/wiki/Critical_path_method))
- **Forward pass** = earliest start/finish times. **Backward pass** = latest start/finish times. Float = "the allowable delay before an activity impacts the project's timeline". ([Atlassian: Critical path method](https://www.atlassian.com/work-management/project-management/critical-path-method))

### Inferences

**CPM recipe:**
1. List tasks, durations and predecessors.
2. **Forward pass:** ES = max EF of the predecessors (0 for start tasks); EF = ES + t.
3. Project duration = max EF.
4. **Backward pass:** LF = min LS of the successors (project duration for end tasks); LS = LF − t.
5. **Slack** = LS − ES (= LF − EF).
6. The critical path is the chain of zero-slack tasks.
7. Optionally, path σ = √(Σσ² of critical tasks).

**Worked network (constructed; verified).** Analysis-phase tasks, in days:

| Task | Pred. | o, m, p | te | ES | EF | LS | LF | Slack |
|---|---|---|---|---|---|---|---|---|
| A Interview users | — | 2, 3, 4 | 3 | 0 | 3 | 0 | 3 | **0** |
| B Review documents | — | 1, 2, 9 | 3 | 0 | 3 | 1 | 4 | 1 |
| C Process models | A | 3, 5, 13 | 6 | 3 | 9 | 3 | 9 | **0** |
| D Data model | A, B | 2, 4, 6 | 4 | 3 | 7 | 5 | 9 | 2 |
| E UI prototype | B | 4, 6, 14 | 7 | 3 | 10 | 4 | 11 | 1 |
| F System proposal | C, D | 1, 2, 3 | 2 | 9 | 11 | 9 | 11 | **0** |
| G Approval | E, F | 1, 1, 1 | 1 | 11 | 12 | 11 | 12 | **0** |

- **Path lengths:** A-C-F-G = 12 (critical); B-E-G = 11; A-D-F-G = 10; B-D-F-G = 10.
- **Probability of finishing within 14 days (optional extension):** critical-path variance = 0.111 + 2.778 + 0.111 + 0 = 3.0, so σ = 1.732. z = (14 − 12)/1.732 = 1.155, giving **P ≈ 0.876**.

**Text Gantt chart for this network** (■ = scheduled work, · = slack):
```
Day:            1  2  3  4  5  6  7  8  9 10 11 12
A (0-3)   crit  ■  ■  ■
B (0-3)         ■  ■  ■  ·
C (3-9)   crit           ■  ■  ■  ■  ■  ■
D (3-7)                  ■  ■  ■  ■  ·  ·
E (3-10)                 ■  ■  ■  ■  ■  ■  ■  ·
F (9-11)  crit                             ■  ■
G (11-12) crit                                   ■
```

**Cross-check on Wikipedia's example (verified).** The critical path is **A-C-E-G = 4 + 5.17 + 5.17 + 5.17 = 19.5**. Slack is B 3.83 and D/F 4.67.

**Traps:**
- The critical path is the **longest** path, not the shortest.
- Weight m by **4** and divide by **6**.
- Slack belongs to a *path segment*: two tasks in series share it. Delaying one uses it up for the other.
- On a Gantt chart, the bar length is the duration and the arrows/links are dependencies.
- PERT handles uncertain durations; CPM focuses on the critical path and slack.
- A task can be critical even if it is short.

### Gaps
- Whether DWR labels the middle PERT estimate "most likely" or "realistic", and whether the 8e workplan figure shows a PERT network, are unverified. DWT 6e does have a "Network Diagram" section.

---

## 7. Refining estimates (cone of uncertainty), managing scope (scope creep, JAD/prototyping, timeboxing) and managing risk

### Takeaway
Early estimates are very uncertain, so DWR's **margins-of-error table** (Boehm) shows uncertainty shrinking from **400% for cost and 60% for schedule at the system request** to **25% and 10% at the system specifications**. That is the "cone of uncertainty".

- **Scope creep** is the most common cause of overruns. Control it by:
  - capturing requirements well up front (JAD and prototyping);
  - allowing only necessary changes through a formal change process;
  - **timeboxing**, which fixes the date and cuts functionality.
- **Risk management** = risk assessment, then actions to reduce risk, then revised assessment. Likelihood × impact is the usual way to prioritize.

### Cited Findings
- **"Refining Estimates": typical margins of error for well-done estimates:**

| Phase | Deliverable | Cost | Schedule time |
|---|---|---|---|
| Planning | System request | **400%** | **60%** |
| Planning | Project plan | 100% | 25% |
| Analysis | System proposal | 50% | 15% |
| Design | System specifications | 25% | 10% |

  Source cited on the slide: Barry W. Boehm et al., "Cost Models for Future Software Life Cycle Processes: COCOMO 2.0", 1995. ([DWR 5e Ch.2 slides, slide 2-30](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- **Cone of uncertainty (Construx/McConnell):** ([Construx: The Cone of Uncertainty](https://www.construx.com/books/the-cone-of-uncertainty/))
  - Estimates at **Initial Concept** "can be inaccurate by a factor of 4x on the high side or 4x on the low side (also expressed as 0.25x…)", which is a 16x total range.
  - The cone narrows significantly during the first 20–30% of calendar time.
  - In short iterations, completing requirements and UI design can reduce variability "from 4x to 1.6x".
  - Committing at Initial Concept or Product Definition carries a "factor of 2x to 4x error".
  - "The Cone narrows only as you make decisions that eliminate variability."
- The concept came from chemical-industry cost engineering (AACE, 1958). Barry Boehm brought it into software and called it the "Funnel Curve". ([Wikipedia: Cone of uncertainty](https://en.wikipedia.org/wiki/Cone_of_Uncertainty))
- **Managing scope:** "Scope creep – the most common reason for schedule and cost overruns occurs after the project is underway". "The project manager should allow only absolutely necessary requirements to be added after the project begins." ([DWR 5e Ch.2 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- Scope creep is also called requirement creep or feature creep. It "cannot be entirely prevented", so it is mitigated by managing it once noticed. ([Wikipedia: Scope creep](https://en.wikipedia.org/wiki/Scope_creep))
- **Timeboxing:** "Set a fixed deadline for a project", "Reduce functionality, if necessary", "Don't get hung up on the final 'finishing touches'". ([DWR 5e Ch.2 slides, slides 2-32/2-33](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf)) The steps are:
  1. Set the date for system delivery.
  2. Prioritize the functionality that needs to be included.
  3. Build the core of the system (the functionality ranked most important).
  4. Postpone functionality that cannot be provided within the time frame.
  5. Deliver the system with core functionality.
  6. Repeat steps 3–5 to add refinements and enhancements.
- In Capers Jones's survey, timeboxing was rated a "Best Practice" for small (1,000-function-point) projects. ([Wikipedia: Timeboxing](https://en.wikipedia.org/wiki/Timeboxing))
- **Managing risk:** "Risk assessment", "Actions to reduce risk", "Revised assessment". ([DWR 5e Ch.2 slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf)) DWT 6e has sections Managing Scope (p. 69), Timeboxing (p. 70), Refining Estimates (p. 71) and Managing Risk (p. 72). ([DWT 6e TOC](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-83.pdf))
- **Risk level:** "the level of downside risk can be calculated as the product of the probability that harm occurs … multiplied by the severity of that harm". Risk matrices based on simple multiplication have documented limitations. ([Wikipedia: Risk matrix](https://en.wikipedia.org/wiki/Risk_matrix))
- **Brooks's law:** "Adding manpower to a late software project makes it later." Communication channels grow rapidly with team size. ([Wikipedia: Brooks's law](https://en.wikipedia.org/wiki/Brooks%27s_law))
- Expert estimation dominates practice. Estimates are typically over-optimistic, and the "mean effort overrun seems to be about 30% and not decreasing over time". ([Wikipedia: Software development effort estimation](https://en.wikipedia.org/wiki/Software_development_effort_estimation))

### Inferences
- **How to use the margins table in an exam.** It is my inference that DWR's percentages roughly track Boehm/McConnell's multiplicative ranges: cost 0.25x–4x → 0.5x–2x → 0.67x–1.5x → 0.8x–1.25x, and schedule ≈ 1.6x → 1.25x → 1.15x → 1.10x. For a $100,000 estimate made at the system request, a plausible range is $25,000–$400,000. After the project plan it is $50,000–$200,000.
  - The managerial point: **re-estimate at each deliverable**, and don't treat a planning-phase estimate as a commitment.
- **Risk exposure (constructed; verified).** Exposure = probability × impact.
  - R1 team unfamiliar with framework: 0.6 × $40,000 = **$24,000**
  - R3 vendor API late: 0.2 × $100,000 = **$20,000**
  - R4 marketing scope creep: 0.5 × $30,000 = **$15,000**
  - R2 key user unavailable: 0.3 × $25,000 = **$7,500**
  - Total = $66,500. Mitigate in that order. For R1, the fixes are the slide's training, consultant and schedule options.
- **Scope-control recipe:**
  1. Capture requirements well up front (JAD sessions, prototypes).
  2. Freeze a baseline.
  3. Route every change through a formal request with cost/schedule impact, approved by the PM and sponsor.
  4. Defer nonessential changes to a later release.
  5. Under a hard deadline, timebox: keep the date, cut the lowest-priority features.
- **Traps:**
  - Timeboxing fixes **time**, not scope.
  - Scope creep happens *after* the project starts. Gold-plating by developers is also creep.
  - Adding people is not a cure for lateness (Brooks).
  - A risk with a huge impact but tiny probability can rank below a moderate, likely risk.

### Gaps
- DWR's exact statement that JAD and prototyping help control scope could not be retrieved. Neither could the McConnell "classic planning mistakes" list (overly optimistic schedule; failing to monitor the schedule; failing to update the schedule; adding people to a late project). Both are from recall, so verify them on your slides.
- The 8e table may relabel deliverables (for example "System proposal") or update the Boehm citation.

---

## 8. Staffing the project: staffing plan, reporting structure, matching skills, motivation, handling conflict

### Takeaway
Staffing produces a **staffing plan** (the kinds and number of people, the reporting structure) and a **project charter** (objectives and rules).

- **Structure:** larger teams use a hierarchy, with the PM over a **functional lead** (who manages analysts) and a **technical lead** (who oversees programmers and technical staff), and teams of about 8–10.
- **Motivation:** rely on **intrinsic rewards**; use money cautiously.
- **Conflict:** avoid it with clear plans, a charter with norms, early commitments, and forecasting of competing priorities.

### Cited Findings
- **Staffing plan:**
  - "Staffing levels will change over a project's lifetime".
  - "Adding staff may add more overhead than additional labor".
  - "Using teams of 8-10 reporting in a hierarchical structure can reduce complexity".

  ([DWR 5e Ch.2 slides, slide 2-21](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- **Definitions:**
  - "The staffing plan describes the kinds of people working on the project".
  - "The project charter describes the project's objectives and rules".
  - "A functional lead manages a group of analysts".
  - "A technical lead oversees progress of programmers and technical staff members".

  ([DWR 5e Ch.2 slides, slide 2-23](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- **Reporting structure diagram:** Project manager → Functional lead → three Analysts; Project manager → Technical lead → two Programmers. ([DWR 5e Ch.2 slides, slide 2-22](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- **Motivation:** "Use monetary rewards cautiously". "Use intrinsic rewards": recognition, achievement, the work itself, responsibility, advancement, chance to learn new skills. ([DWR 5e Ch.2 slides, slide 2-24](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- **Handling conflict:** ([DWR 5e Ch.2 slides, slide 2-25](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
  - "Clearly define plans for the project."
  - "Recognize project importance to organization."
  - "Project charter listing norms and ground rules."
  - "Develop schedule commitments ahead of time."
  - "Forecast other priorities and their possible impact on the project."
- **DWT 6e "Staffing the Project" (p. 74) subsections:** Tuckman's Stages of Small Group Development (p. 74), Characteristics of a Jelled Team (p. 75), Staffing Plan (p. 76), Motivation (p. 79), Handling Conflict (p. 80), Meeting Management (p. 81). ([DWT 6e TOC](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-83.pdf))
- In DWT's Unified Process discussion, the standard project management workflow "does not include staffing the project, managing the contracts among the customers and vendors, and managing the project's budget". The authors "suggest extending project management to include these activities". ([DWT 6e Ch.1 excerpt, Wiley](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf))
- **DWT 5e slides (third-party upload, read via automated fetch summary):**
  - A "jelled" team is "greater than the sum of its parts", with a "feeling of eliteness" and a "strong sense of identity".
  - Motivation ideas include "peer-to-peer recognition awards".
  - Conflict handling includes "clearly defining roles and holding team members accountable" and developing "detailed operating procedures".

  ([SlideShare upload of DWT 5e Ch.2 slides](https://www.slideshare.net/slideshow/powerpoint-presentation-for-dennis-wixom-tegarden-systems-docx/253590082))

### Inferences
- **Staffing calculation recipe (verified).**
  - Average staff = effort (PM) ÷ schedule (months). For example, 24 PM ÷ 8 months = **3 people**. For the FP example above, 13.68 ÷ 7.17 ≈ 2.
  - Communication channels = n(n−1)/2: 3 people → 3 channels; 5 → 10; 6 → 15; 8 → 28; 10 → 45. Doubling the team from 3 to 6 multiplies the channels by 5.
  - This is why DWR recommends hierarchical sub-teams of 8–10 with functional and technical leads.
- **Matching skills.** This is general reasoning, not DWR text: assign people by both **technical** skills (programming, database, network) and **interpersonal** skills (interviewing, JAD facilitation, user communication). Analysts report to the functional lead and programmers to the technical lead.
- **Traps:**
  - The staffing plan (people and structure) is different from the project charter (objectives and rules).
  - The functional lead manages *analysts*; the technical lead manages *programmers*.
  - A raise for everyone is a weak motivator compared with recognition and growth.
  - More people does not mean proportionally faster delivery.

### Gaps
- **DWR/DWT "motivational don'ts" list (recall, not retrieved):** assign unrealistic deadlines; ignore good efforts; create a low-quality product; give everyone on the project a raise; make an important decision without the team's input; maintain poor working conditions. Verify on your slides.
- **Tuckman's stages** (forming, storming, norming, performing, plus adjourning) are standard knowledge, but I did not retrieve a source in this session.
- DWR's guidance to weigh technical *and* interpersonal skills when matching people to tasks is also recall.

---

## 9. Environment and infrastructure management: CASE tools, standards, documentation

### Takeaway
In DWT (Unified Process view), **environment management** means acquiring and installing the tools the team needs, such as CASE, programming environments, PM and configuration tools. **Infrastructure management** means building cross-project assets such as libraries, standards, enterprise models and process improvement.

The chapter's three practical topics are:
- **CASE tools:** upper (analysis/design diagrams), lower (code generation, construction, testing) and integrated (whole life cycle).
- **Standards.**
- **Documentation:** a project binder that is updated continually, not at the end.

### Cited Findings
- DWT 6e Ch. 2 section "Environment and Infrastructure Management" (p. 83) contains CASE Tools (p. 83), Standards (p. 83) and Documentation (p. 84), followed by "Configuration and Change Management" (p. 85). ([DWT 6e TOC](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-83.pdf))
- **Environment workflow (DWT):** "During the development of an information system, the development team needs to use different tools and processes. The environment workflow addresses these needs. For example, a CASE tool that supports the development of an object-oriented information system via the UML could be required. Other tools necessary include programming environments, project management tools, and configuration management tools. The environment workflow involves acquiring and installing these tools … it should be involved primarily with the inception phase." ([DWT 6e Ch.1 excerpt](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf))
- **Infrastructure management workflow (DWT, following Ambler & Constantine's extension of the UP):** its "primary purpose is to support the development of the infrastructure necessary to develop object-oriented systems". Activities include "development and modification of libraries, standards, and enterprise models". It also covers "the improvement of the software development process", which is a cross-project activity the plain UP ignores. ([DWT 6e Ch.1 excerpt](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf))
- **CASE in DWR:** "A category of software that automate[s] all or part of the development process: Upper CASE, Lower CASE, Integrated CASE". **Standards:** "Formal rules for naming files", "Forms indicating goals reached", "Programming guidelines". **Documentation:** "Project binder", "Table of contents", "Continual updating". ([DWR 5e Ch.2 slides, slides 2-26/2-27](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf))
- **Upper vs lower CASE:** upper CASE tools "support business and analysis modeling" (ER diagrams, data flow diagrams, structure charts, decision trees and tables). Lower CASE tools support development activities such as physical design, debugging, construction, testing and integration. A CASE "environment" is a collection of tools that tries to support the complete software process. ([Wikipedia: Computer-aided software engineering](https://en.wikipedia.org/wiki/Computer-aided_software_engineering))
- **DWT 5e slides (third-party upload, read via automated fetch summary):** choose "the right set of tools"; diagrams are "more easily understood"; "Document the project appropriately" and avoid "procrastination to the last minute". ([SlideShare upload of DWT 5e Ch.2 slides](https://www.slideshare.net/slideshow/powerpoint-presentation-for-dennis-wixom-tegarden-systems-docx/253590082))

### Inferences
- **Exam framing.**
  - "Which CASE type generates code?" → lower (or integrated).
  - "Which supports DFD/ERD/UML modeling in analysis?" → upper.
  - "Which spans the whole SDLC?" → integrated.
  - "Why have standards?" → consistency across the team, fewer integration errors, easier maintenance and onboarding.
  - "Why a project binder?" → a single organized, continually updated record of all deliverables. It becomes the basis of system documentation.
- **Traps:**
  - Environment = tools *for this project*. Infrastructure = cross-project assets (libraries, standards, enterprise models, process improvement).
  - CASE does not replace analysis skill.
  - Documentation is produced **throughout** the project, not at the end.

### Gaps
- **DWR/DWT's five types of standards with examples could not be retrieved verbatim.** From recall:
  - **Documentation standards:** a date and project name on every document.
  - **Coding standards:** a header in each module with the developer name, last update date and purpose.
  - **Procedural standards:** for example, weekly progress reports and PM approval for changes.
  - **Specification requirement standards:** program name, purpose, special calculations, business rules.
  - **User interface design standards:** for example, label placement, tab order, accelerator keys.
- The DWR description of the CASE "repository" (the central store of project information) is also recall.

---

## 10. AI for effort estimation, risk assessment and project portfolio management: credible examples and limits

### Takeaway
Machine learning, and more recently LLM/RAG approaches, have been studied heavily for **effort and story-point estimation**. Careful replications show the gains over simple baselines are small and unstable:
- **Deep-SE** beat a median baseline with statistical significance in only 8 of 42 cases.
- A 2026 **RAG** study found no statistically significant differences across projects.

AI is best used as a **decision aid alongside expert, analogy and parametric estimates**, with human review. I found no credible primary evidence, in this session, on AI for risk assessment or portfolio management.

### Cited Findings
- **Tawosi, Moussa & Sarro (2022), replication of Deep-SE**, the deep-learning story-point model. It used the original data plus 31,960 issues from TAWOS.
  - Deep-SE "outperforms the Median baseline estimator and TF/IDF-SVM in only very few cases with statistical significance (8/42 and 9/32 cases, respectively)".
  - Augmenting the training data or pre-training did not improve it.
  - "Semantic similarity is not enough to differentiate user stories with respect to their story points".

  ([arXiv:2201.05401](https://arxiv.org/abs/2201.05401))
- **Maha, Rahman & Roy (April 2026)**, Retrieval-Augmented Generation for story points, 23 open-source projects. RAG "outperformed the baseline models in several occasions", but "results did not exhibit statistically significant differences in performance across the projects or across the embedding models". ([arXiv:2604.03443](https://arxiv.org/abs/2604.03443))
- **Uc-Cetina (2023)** reviews recent ML approaches for both agile and non-agile estimation. It notes that companies increasingly store project data to train prediction models, and that individual engineers' misestimation patterns can be modelled. ([arXiv:2303.03482](https://arxiv.org/abs/2303.03482))
- **Mahmood et al. (2021)** ran a systematic review comparing ensemble and single ("solo") ML estimation techniques, motivated by researchers' lack of awareness of prior ML results. ([arXiv:2101.10658](https://arxiv.org/abs/2101.10658))
- The evidence suggests there is no "best approach" to estimation; relative accuracy "depends strongly on the context". Effort-estimation research includes neural networks, Bayesian statistics, lexical analysis of requirements and similar methods. ([Wikipedia: Software development effort estimation](https://en.wikipedia.org/wiki/Software_development_effort_estimation))
- Simple probability × severity risk scoring has documented limitations. ([Wikipedia: Risk matrix](https://en.wikipedia.org/wiki/Risk_matrix))

### Inferences
- **Credible uses (my synthesis from the above, not a cited claim):**
  - Analogy-style estimation from an organization's own historical project data, i.e., the ML version of "estimate by analogy".
  - Drafting candidate risk lists or risk registers for humans to assess, using DWR's likelihood × impact.
  - Flagging schedule slippage early from tracking data.
- **Limits for an exam answer:**
  - Data quality and quantity, and transfer to new projects (cross-project accuracy is weak).
  - Weak results against simple baselines.
  - Explainability to sponsors.
  - The cone of uncertainty still applies: AI cannot remove requirements uncertainty that hasn't been decided yet.
  - Accountability stays with the PM and the approval committee.

### Gaps
- **Gartner's 2019 prediction** that 80% of today's PM tasks will be eliminated by 2030 is widely quoted, but the primary press release returned HTTP 403, so I could not verify it. Do not cite it as fact.
- PMI's generative-AI reports were also inaccessible (403).
- I found no peer-reviewed evidence, in this session, on AI for project risk assessment or IT portfolio selection.

---

## 11. Practice problems (20) with full solutions

### Takeaway
These 20 problems cover every calculable topic: PV/NPV/ROI/BEP/payback, industry percentages, a full function-point estimate, LOC/effort/schedule/staff, COCOMO, PERT, a CPM network with what-if analysis, margins of error, risk exposure and staffing. They also cover the main classification topics. I verified every numeric answer with a Python script.

### Cited Findings
Formula sheet used by the problems, with sources:
- **Present value:** amount / (1 + i)^n ([DWR 2e slides](https://slideum.com/doc/4188989/systems-analysis-and-design-allen-dennis-and-barbara-haley)).
- **NPV decision rule** ([OpenStax 16.2](https://openstax.org/books/principles-finance/pages/16-2-net-present-value-npv-method)).
- **Payback** ([OpenStax 16.1](https://openstax.org/books/principles-finance/pages/16-1-payback-period-method)).
- **ROI** = (benefits − costs)/costs ([DWR 2e slides](https://slideum.com/doc/4188989/systems-analysis-and-design-allen-dennis-and-barbara-haley)).
- **BEP procedure** ([DWR 6e slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf)).
- **Industry percentages** 15/20/35/30 ([DWR 5e slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf)).
- **Function point steps, 1.4 × KLOC and 3.0 × PM^(1/3)** ([UW IS 460](https://faculty.washington.edu/ytan/is460/notes/LN14.pdf)).
- **IFPUG weights** ([Longstreet](https://people.eecs.ku.edu/~saiedian/Teaching/811/Papers/Function-Points/fpa-ref.pdf)).
- **LOC per FP** ([QSM v5.0](https://www.qsm.com/resources/function-point-languages-table)).
- **Basic COCOMO** ([RIT](https://www.se.rit.edu/~swen-256/slides/SWEN256-10-FunctionPointEstimationandCOCOMO.pdf)).
- **PERT** te and σ ([Wikipedia PERT](https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique)).
- **CPM** ([Wikipedia CPM](https://en.wikipedia.org/wiki/Critical_path_method)).
- **Margins of error** ([DWR 5e slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf)).
- **Risk = probability × severity** ([Wikipedia Risk matrix](https://en.wikipedia.org/wiki/Risk_matrix)).
- **Timeboxing steps** ([DWR 5e slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf)).
- **Tune Source and OpenStax data**, as cited in Section 3.

### Inferences

The problems below are my own (except where the textbook or OpenStax data is reused), and every answer has been machine-verified.

**P1 — Present value.** What is the PV of $10,000 received in 3 years at 8%?
- 10,000 / 1.08³ = 10,000 / 1.259712 = **$7,938.32**.

**P2 — Full NPV/ROI/BEP.**
- Data: development cost $120,000 in year 0; operating cost $20,000 per year in years 1–4; benefits $60,000, $65,000, $70,000, $75,000 in years 1–4; discount rate 10%.
- Find: PV totals, NPV, ROI, BEP, and the undiscounted payback.

| Year | 0 | 1 | 2 | 3 | 4 | Total |
|---|---|---|---|---|---|---|
| PV benefits | 0 | 54,545.45 | 53,719.01 | 52,592.04 | 51,226.01 | **212,082.51** |
| PV costs | 120,000 | 18,181.82 | 16,528.93 | 15,026.30 | 13,660.27 | **183,397.31** |
| NPV cash flow | −120,000 | 36,363.64 | 37,190.08 | 37,565.74 | 37,565.74 | **28,685.20** |
| Cumulative | −120,000 | −83,636.36 | −46,446.28 | −8,880.54 | **+28,685.20** | |

- **NPV = $28,685.20**, which is positive, so the project is economically feasible.
- **ROI (PV basis)** = 28,685.20 / 183,397.31 = **15.64%**.
- **ROI (undiscounted)** = (270,000 − 200,000) / 200,000 = 35%.
- **BEP** = 3 + (37,565.74 − 28,685.20) / 37,565.74 = **3.24 years**.
- **Undiscounted payback:** the cumulative is −35,000 after year 2 and year 3 brings +50,000, so payback = 2 + 35,000/50,000 = **2.70 years**.

**P3 — Tune Source (textbook data, Section 3).** Compute the BEP and ROI from the PV rows.
- BEP: the cumulative turns positive in 2019, so BEP = 3 + (423,096 − 68,292)/423,096 = **3.84 years**.
- ROI on PV totals = 68,292 / 2,296,686 = **2.97%**. On undiscounted totals it is 14.11%.

**P4 — OpenStax machine.**
- Data: cost $16,000; inflows 2,000, 4,000, 5,000, 5,000, 5,000, 5,000; 9%.
- **Payback = 4.0 years.**
- **NPV = $2,835.63.**
- **Discounted BEP** = 5 + (2,981.34 − 2,835.63)/2,981.34 = **5.05 years**.

**P5 — Industry percentages.**
- (a) Planning actually took 6 weeks. Estimate the other phases: total = 6/0.15 = 40 weeks, so **analysis 8, design 14, implementation 12 weeks**.
- (b) If instead the analysis phase took 3 PM (the same proportional logic, extrapolating from 20%): total = **15 PM**, so planning 2.25, design 5.25, implementation 4.5.

**P6 — TUFP.** Counts (low/avg/high) are:
- Inputs 4/3/1
- Outputs 2/4/2
- Queries 3/2/0
- Files 2/2/1
- Interfaces 1/1/0

Working:
- EI = 12 + 12 + 6 = 30
- EO = 8 + 20 + 14 = 42
- EQ = 9 + 8 = 17
- ILF = 14 + 20 + 15 = 49
- EIF = 5 + 7 = 12
- **TUFP = 150**

**P7 — APC and TAFP.** All 14 characteristics are rated 3, so PC = 42.
- APC = 0.65 + 0.42 = **1.07**.
- TAFP = 150 × 1.07 = **160.5**.

**P8 — Size, effort, schedule and staff** for P7, in C# at 54 LOC/FP.
- LOC = 160.5 × 54 = **8,667** (8.667 KLOC).
- Effort = 1.4 × 8.667 = **12.13 PM**.
- Schedule = 3.0 × 12.13^(1/3) = **6.89 months**.
- Staff ≈ 12.13/6.89 = **1.76, so 2 people**.

**P9 — Language choice.** For TAFP = 184.3, compare effort in C (97 LOC/FP) and SQL (21).
- C: 184.3 × 97 = 17,877 LOC, so 1.4 × 17.877 = **25.03 PM**.
- SQL: 184.3 × 21 = 3,870 LOC, so **5.42 PM**.
- The language changes effort by about 4.6×, even though the functionality is identical.

**P10 — COCOMO vs Dennis** for 10 KLOC.
- Basic COCOMO, organic: E = 2.4 × 10^1.05 = **26.93 PM**; T = 2.5 × 26.93^0.38 = **8.74 months**.
- Dennis: 1.4 × 10 = **14 PM**; 3.0 × 14^(1/3) = **7.23 months**.
- Lesson: use the model the question specifies.

**P11 — PERT for one task.** With o = 4, m = 6, p = 14:
- te = (4 + 24 + 14)/6 = **7.0 days**.
- σ = (14 − 4)/6 = **1.67 days**.

**P12 — CPM network.** Durations are PERT te values, in days.

| Task | Predecessors | o, m, p | te |
|---|---|---|---|
| 1 | — | 3, 5, 13 | 6 |
| 2 | — | 2, 3, 4 | 3 |
| 3 | 1 | 4, 5, 12 | 6 |
| 4 | 1, 2 | 2, 4, 6 | 4 |
| 5 | 3 | 5, 7, 15 | 8 |
| 6 | 4 | 3, 5, 7 | 5 |
| 7 | 5, 6 | 2, 3, 10 | 4 |

Solution:

| Task | ES | EF | LS | LF | Slack |
|---|---|---|---|---|---|
| 1 | 0 | 6 | 0 | 6 | **0** |
| 2 | 0 | 3 | 8 | 11 | 8 |
| 3 | 6 | 12 | 6 | 12 | **0** |
| 4 | 6 | 10 | 11 | 15 | 5 |
| 5 | 12 | 20 | 12 | 20 | **0** |
| 6 | 10 | 15 | 15 | 20 | 5 |
| 7 | 20 | 24 | 20 | 24 | **0** |

- **Critical path 1-3-5-7, 24 days.**
- Other paths: 1-4-6-7 = 19 days; 2-4-6-7 = 16 days.
- Critical-path σ = √9.11 = 3.02 days.

**P13 — What-if on P12.**
- (a) Task 6 slips 3 days → **no delay** (slack 5).
- (b) Task 4 slips 6 days → project becomes **25 days (+1)**. Tasks 4 and 6 share the 5 days of path slack.
- (c) Task 2 slips 9 days → **25 days (+1)**. Its slack is 8.
- (d) Task 5 slips 2 days → **26 days (+2)**, because it is critical.

**P14 — Margins of error.** A $100,000 cost estimate is made at the system-request stage. What range should management expect, and when is it narrowest?
- DWR's margin is 400% for cost and 60% for schedule. In Boehm/McConnell terms that is roughly 0.25x–4x, i.e., **$25,000–$400,000**.
- After the project plan: 100%, about 0.5x–2x, i.e., $50,000–$200,000.
- The margin is narrowest at **system specifications** (design phase): 25% for cost, 10% for schedule.

**P15 — Risk exposure ranking** (using the data in Section 7).
- R1 $24,000 > R3 $20,000 > R4 $15,000 > R2 $7,500. Total $66,500.
- Address R1 first: training budget, a consultant and schedule buffer.

**P16 — Staffing.**
- Effort is 24 PM and the deadline is 8 months, so the team needs **3 people**.
- If management grows the team to 6, the communication channels go from **3 to 15**. At 10 people there are **45**.
- Recommendation: a hierarchy with a functional lead (analysts) and a technical lead (programmers), in teams of 8–10 or fewer. Do not add people late (Brooks's law).

**P17 — Classify each feasibility risk** as technical (and which factor), economic or organizational.

| Statement | Classification |
|---|---|
| (a) The team has never used the cloud platform the sponsor wants | Technical — familiarity with technology |
| (b) The system must exchange data with a 20-year-old COBOL payroll system | Technical — compatibility |
| (c) Warehouse staff fear the system will be used to monitor them | Organizational — resistant users |
| (d) The CFO backs the project, but the most-affected VP has not been briefed | Organizational — management support is not "widespread" |
| (e) PV of benefits is below PV of costs at 8% | Economic — NPV < 0 |
| (f) The project needs 25 developers for 18 months | Technical — project size |
| (g) The project conflicts with the strategy of exiting retail | Organizational — strategic alignment |
| (h) No one understands insurance claims processing | Technical — familiarity with the functional area |

**P18 — Sort into system-request elements.**

| Statement | Element |
|---|---|
| (a) "Sarah Kim, Director of Customer Service" | **Sponsor** |
| (b) "Customers wait 3 days for complaint responses and are defecting to competitors" | **Business need** |
| (c) "Customers can submit and track complaints online" | **Business requirement** |
| (d) "$120,000/yr fewer call-handling costs; 2% lower churn" | **Business value** (tangible) |
| (e) "Must be live before the privacy regulation takes effect on 1 March" | **Special issue/constraint** |
| (f) "Improved brand image" | **Business value** (intangible) |

**P19 — Classify costs and benefits** using the Tune Source table.

| Item | Classification |
|---|---|
| Servers, printer, software licenses, server software, development labor (year 0) | **Development costs** |
| Hardware $50k/yr, software $20k/yr, operational labor | **Operational costs** |
| Increased sales; reduced inventory costs; fewer complaint calls (valued at handling cost) | **Tangible benefits** |
| Ability to offer services competitors already offer | **Intangible benefit** |

**P20 — Timeboxing.** A legal deadline is 30 Nov. Ten features are ranked. Analysis shows only features 1–6 can be finished by then. Apply DWR's steps.
1. Fix delivery on 30 Nov.
2. Prioritize the 10 features.
3. Build the core, features 1–6.
4. Postpone 7–10.
5. Deliver 1–6 on 30 Nov.
6. Repeat steps 3–5 in later releases for 7–10.

A late change request from marketing should go through change control and, if accepted, into a later timebox. Do not let it slip the date.

### Gaps
- No real past exam papers from SOC3070 were available, so the problem styles are inferred from DWR's slide content.
- If your professor uses a different LOC-per-FP table or the use-case-point method (DWT), redo P8–P9 with those values.

---

## 12. Best free (legal) resources for revision

### Takeaway
For revision, use the university-hosted **Wiley instructor slides for DWR (Ch. 1 feasibility; Ch. 2 project selection and management)**, Wiley's **free DWT table of contents and Ch. 1 excerpt**, the **UW IS 460 notes** and **IFPUG/QSM** material for function points, **OpenStax** for NPV and payback, and **Wikipedia/Atlassian/Construx** for PERT, CPM, Gantt and the cone of uncertainty.

### Cited Findings
- **DWR 6e Ch. 1 slides** (system request, feasibility, Tune Source cost–benefit analysis) ([CUHK-hosted Wiley slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch01_The%20Systems%20Analysis%20and%20Information%20Systems%20Development.pdf)).
- **DWR 5e Ch. 2 slides** (selection, industry percentages, staffing, CASE, margins of error, timeboxing) ([CUHK-hosted Wiley slides](https://www1.se.cuhk.edu.hk/~seem5730/l22/ch02_Project%20Selection%20and%20Management.pdf)).
- **DWT 6e:** [Wiley product page](https://www.wiley.com/en-us/Systems+Analysis+and+Design:+An+Object-Oriented+Approach+with+UML,+6th+Edition-p-9781119561217), [free TOC PDF](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-83.pdf), [free Chapter 1 PDF](https://media.wiley.com/product_data/excerpt/1X/11195599/111955991X-156.pdf). The edition was published October 2020.
- **Function points and COCOMO:**
  - [UW IS 460 Lecture 14](https://faculty.washington.edu/ytan/is460/notes/LN14.pdf)
  - [RIT SWEN-256 FP & COCOMO slides](https://www.se.rit.edu/~swen-256/slides/SWEN256-10-FunctionPointEstimationandCOCOMO.pdf)
  - [Longstreet FPA reference](https://people.eecs.ku.edu/~saiedian/Teaching/811/Papers/Function-Points/fpa-ref.pdf)
  - [QSM language table](https://www.qsm.com/resources/function-point-languages-table)
  - [IFPUG](https://ifpug.org/)
  - [Wikipedia: COCOMO](https://en.wikipedia.org/wiki/COCOMO)
- **Time value of money:**
  - [OpenStax 7.1 Now versus Later](https://openstax.org/books/principles-finance/pages/7-1-now-versus-later-concepts)
  - [OpenStax 9.1 Timing of Cash Flows](https://openstax.org/books/principles-finance/pages/9-1-timing-of-cash-flows)
  - [OpenStax 16.1 Payback](https://openstax.org/books/principles-finance/pages/16-1-payback-period-method)
  - [OpenStax 16.2 NPV](https://openstax.org/books/principles-finance/pages/16-2-net-present-value-npv-method)
- **Scheduling:**
  - [Wikipedia: PERT](https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique) (includes a worked table)
  - [Wikipedia: CPM](https://en.wikipedia.org/wiki/Critical_path_method)
  - [Atlassian: CPM](https://www.atlassian.com/work-management/project-management/critical-path-method)
  - [Atlassian: Gantt chart](https://www.atlassian.com/agile/project-management/gantt-chart)
  - [Wikipedia: WBS](https://en.wikipedia.org/wiki/Work_breakdown_structure)
- **Estimation uncertainty:** [Construx: Cone of Uncertainty](https://www.construx.com/books/the-cone-of-uncertainty/).
- **AI estimation evidence:** [Tawosi et al.](https://arxiv.org/abs/2201.05401), [Maha et al. 2026](https://arxiv.org/abs/2604.03443).

### Inferences
- **Most testable items for a week-8 midterm**, in my judgment from the slide emphasis:
  1. Economic feasibility (NPV, ROI, BEP with the Dennis formula).
  2. The system request's five elements.
  3. The three feasibility types and the four technical-risk factors.
  4. Industry-standard percentages.
  5. The function-point pipeline.
  6. PERT te and CPM slack/critical path.
  7. The margins-of-error table, timeboxing steps and scope creep.
  8. Functional vs technical lead, intrinsic motivators and the conflict list.
  9. Upper vs lower vs integrated CASE.

### Gaps
- PMI/PMBOK primary pages and the Gartner AI press release were blocked (HTTP 403), so the Wikipedia and Atlassian summaries stand in for PMI definitions.
- No legal free DWR 8e excerpt was located. The web-search budget for this session ran out before I could search further, so I fetched known URLs directly instead.
