# Week 5b — Requirements determination 1: requirements, BPA/BPI/BPR strategies, interviews (CLASS NOTES — from slides only)

> Source: 6_1 REQUIREMENTS DETERMINATION.pdf, 45 slides. Refs [W5b-S#].
> Track A only: every fact, definition, example and table below comes from the slides. Text in "quotes" is copied word for word.
> Legend: ⭐ = visible emphasis on the slide (a bolded or italicised key sentence, a green check mark, or the slide calling something "the most common"). ⚠️ = apparent typo or inconsistency on the slide. 🔎 = not explained on the slides; look it up in Track B. A note marked "(mine)" is a study aid, not slide content.

---

## 1. Big picture

- **The analysis phase produces the system proposal.** The proposal is made of four parts: requirements definition + models + feasibility analysis + workplan. The system request feeds the requirements definition, and the finished proposal goes to the **approval committee** [W5b-S2, S3].
- **Keep two kinds of requirements apart:**
  - **Project requirements** are set by the project stakeholders and cover scope, timeline, budget and resources.
  - **Product requirements** are set by the product owner or product management team and cover features, functionality and characteristics. They are written up in the **PRD**, which the slides treat as the same thing as the **requirements definition report** [S4–S6].
- **A requirement** is "a statement of what the system must do or a characteristic it must have" [S11].
  - In analysis, requirements are **business requirements**: written from the business person's view, about the "what".
  - In design, they become **system requirements**: written from the developer's view, about how the system will be implemented [S9].
- **Every requirement is functional or nonfunctional** [S11–S14]:
  - **Functional** requirements are process-oriented or information-oriented.
  - **Nonfunctional** requirements are operational, performance, security, or cultural and political.
  - Mixing the two up is "one of the most common mistakes by new analysts" [S15].
- **The requirements definition (report)** is "a straightforward text report that simply lists the functional and nonfunctional requirements in an outline format". The sample is a doctor's office appointment system [S16].
- **Three requirements-analysis strategies** help users discover what they need. Each brings more change than the one before [S17–S18, S22–S32]:
  - **BPA**, small change: problem analysis and root cause analysis.
  - **BPI**, moderate change: duration analysis, activity-based costing and informal benchmarking.
  - **BPR**, significant change: outcome analysis, technology analysis and activity elimination.
- **All three strategies follow the same three steps:** understand the as-is system, identify improvements, then develop requirements for the to-be system [S21].
  - They differ in how much time is spent on the as-is system [S22, S24, S29].
  - They also differ in **potential business value, project cost, breadth of analysis and risk** (the S33 table).
- **Requirements-gathering techniques** collect the information: interviews, questionnaires, observation, JAD and document analysis [S19]. Gathering also builds **political support** and **trust and rapport** with users [S34].
- **Interviews are "the most commonly used requirements-gathering technique"** [S35]. They have five steps [S35–S45]:
  1. Select interviewees, using an interview schedule.
  2. Design questions: closed-ended, open-ended or probing; ordered top-down or bottom-up; unstructured early in a project, structured later.
  3. Prepare.
  4. Conduct.
  5. Follow up after the interview: write the interview report **within 48 hours** and send it to the interviewee to check.

---

## 2. Slide-by-slide notes

### [W5b-S1] Title — System Analysis / Requirements Determination
- Title slide: "System Analysis", "DR. DRAGUNOV"; topic label bottom-right: "REQUIREMENTS DETERMINATION".
- No other content.

### [W5b-S2] Analysis phase ⭐
- **Picture (diagram):**
  - A box "System request" has an orange arrow pointing down to "Requirements definition".
  - A row of four boxes joined by orange plus signs: **Requirements definition + Models + Feasibility Analysis + Workplan**.
  - Below the row, a big orange equals sign and a large box: **= System proposal**.
- As an equation: **System proposal = Requirements definition + Models + Feasibility analysis + Workplan**, with the system request as the starting input for the requirements definition.
- **Green check marks** sit on **System request**, **Feasibility Analysis** and **Workplan**. **Requirements definition** and **Models** have none.
  - The checks appear to mark the parts already done before this lecture.
  - That would make the requirements definition (this deck) and the models the parts still to come. The slide has no text explaining the checks.
- ⭐ Green check marks; this is the roadmap slide for the deck.

### [W5b-S3] (untitled) System proposal → Approval committee
- **Picture:** "System proposal" box → orange down arrow → "Approval committee" box → four large orange question marks "????".
- Meaning shown: the finished system proposal is handed to the approval committee. The "????" leaves the committee's decision open as a question to the class; the slide gives no answer.
- 🔎 Look up in Track B: what the approval committee decides when it receives the system proposal.

### [W5b-S4] The Difference Between Project and Product Requirements
- **Project Requirements:** "Project requirements are the high-level objectives, constraints, and conditions that need to be met for the project to be considered successful. They are usually defined by the project stakeholders and focus on the overall project's scope, timeline, budget, and resources."
- **Product Requirements:** "Product requirements, on the other hand, are the specific features, functionalities, and characteristics that the final product must possess to meet the needs of its end-users. They are typically defined by the product owner or the product management team and focus on the product's functionality, performance, and usability."
- Contrast table (built from the two quotes):

| | Project requirements | Product requirements |
|---|---|---|
| What they are | high-level objectives, constraints, and conditions for the **project** to be considered successful | specific features, functionalities, and characteristics the **final product** must possess to meet the needs of its end-users |
| Defined by | the project stakeholders | the product owner or the product management team |
| Focus | scope, timeline, budget, resources | functionality, performance, usability |

### [W5b-S5] Project Requirements
- "Project requirements include:" (8 items, verbatim; numbering mine)
  1. Physical resources required by the development team, such as workspace, equipment, and so on.
  2. Staff training needs.
  3. Project documentation, including user manuals, and technical support documentation.
  4. Infrastructure changes required for the software operating environment.
  5. Requirements and procedures for installing, configuring, testing, and releasing the new product, as well as for migrating from the old system to the new one.
  6. Product certification requirements, compliance with regulatory requirements, and legal protection (patents).
  7. Internal company documents: policies, processes, structures, and so on.
  8. Service Level Agreement (SLA) with customers. For example, warranty service.
- Study aid (mine): everything on this list is something the **project** needs. Examples are resources, training, documentation, installation and migration, certification and legal work, company documents, and the SLA. None of it is a feature of the product.

### [W5b-S6] Product Requirements, Requirements Definition Report or product requirements document ⭐
- The **title** treats three names as one document: "Product Requirements", "Requirements Definition Report", "product requirements document". So on these slides **PRD = requirements definition report**.
- ⭐ "**Summary:** *A product requirements document (PRD) defines the requirements of a particular product, including the product’s purpose, features, functionality, and behavior. It serves as a guide for business and technical teams to help build, launch, or market the product.*"
- **Picture:** four blue arrow-shaped blocks, left to right:
  1. "Goals, business objectives, strategic fit"
  2. "User stories"
  3. "User design, interactions"
  4. "Questions, clarifications, scope"
  - The blocks list what a PRD covers, in order. The slide adds no further explanation.
- ⭐ Bold "Summary:" label with the italic definition.
- 🔎 Look up in Track B: "user stories". The term is named here but not defined in this deck. S8 also mentions "story cards".

### [W5b-S7] Business requirements ⭐
- ⭐ Bold: "**One of the first activities of an analyst is to determine the business requirements for a new system.**"
- Roadmap of the topic (verbatim; the three strategy names are bold on the slide): "We’ll begin by presenting the requirements definition, a document that lists the new system’s capabilities. It then describes how to analyze requirements using **business process automation**, **business process improvement**, and **business process reengineering** techniques and how to gather requirements using interviews, JAD sessions, questionnaires, document analysis, and observation. The chapter also describes a set of alternative requirements-documentation techniques and describes the system proposal document that pulls everything together."
- Definition to keep: **requirements definition** = "a document that lists the new system’s capabilities".
- The topic has two families of tools:
  - **Analyze** requirements with BPA, BPI and BPR.
  - **Gather** requirements with interviews, JAD sessions, questionnaires, document analysis and observation.

### [W5b-S8] OBJECTIVES
- ❑ Understand how to create a requirements definition
- ❑ Become familiar with requirements-analysis techniques
- ❑ Understand when to use each requirements-analysis technique
- ❑ Understand how to gather requirements using interviews, JAD sessions, questionnaires, document analysis, and observation
- ❑ Understand the use of concept maps, story cards, and task lists as requirements documentation techniques
- ❑ Understand when to use each requirements-gathering technique
- ❑ Be able to begin creating a system proposal
- Coverage note: these 45 slides explain:
  - the requirements definition;
  - BPA, BPI and BPR;
  - **interviews only**, among the gathering techniques.
- The following are listed as objectives but not explained in this deck: JAD, questionnaires, document analysis, observation, concept maps, story cards, task lists, and the system proposal document. 🔎 Look up in Track B if needed.

### [W5b-S9] Defining a Requirement ⭐
- "During analysis, requirements are written from the perspective of the business person, and they focus on the “what” of the system."
- "Because they focus on the needs of the business user, they are usually called ***business requirements*** (and sometimes user requirements)."
- "Later in design, business requirements evolve to *become more technical*, and they describe *how the system will be implemented*. Requirements in design are written from the developer’s perspective, and they are usually called ***system requirements.***"
- Comparison (built from the quotes):

| | Business requirements (sometimes "user requirements") | System requirements |
|---|---|---|
| Phase | Analysis | Design |
| Written from the perspective of | the business person / business user | the developer |
| Focus | the "what" of the system | how the system will be implemented (more technical) |

- ⭐ Bold-italic key terms: *business requirements*, *system requirements*.

### [W5b-S10] (untitled) Requirements hierarchy diagram ⭐
- **Picture:** a top-down tree of orange-tabbed boxes joined by lines, with a large **green check mark** to the right. Each box has its keywords in brackets:
  1. **Business Requirements** (Goals, Objectives, Why, Business perspective)
  2. ↓ **Stake Holder Requirements** (Needs to be met, Most important)
  3. ↓ **Solution Requirements** (Capabilities & Qualities)
  4. ↓ splits into two boxes:
     - **Functional Requirements** (Capabilities, How- Product perspective)
     - **Non Functional Requirements** (Qualities, Usability)
- How to read it:
  - Solution requirements = **capabilities**, which become the functional requirements, plus **qualities**, which become the nonfunctional requirements.
  - This matches S11's two types.
- ⚠️ Cosmetic issues:
  - "Stake Holder" is written as two words, while the deck writes "stakeholders" on S4 and S34.
  - "How- Product" has a stray space.
  - "Non Functional" (here), "Non-functional" (S11) and "Nonfunctional" (S13) are three spellings of the same term.
- ⚠️ **Watch the wording across slides.**
  - On **S9**, "business requirements" means *all* requirements written during analysis (the "what"), and "how" belongs to **design** (system requirements).
  - In **this diagram**, "Business Requirements" is only the **top level** (the "why"), and "How" is attached to **functional requirements** (product perspective).
  - Answer with the slide the question is based on.
- ⭐ Green check mark.

### [W5b-S11] (untitled) Purpose; what is a requirement; types ⭐
- "Purpose: to convert high level business requirements (from the system request) into detailed requirements that can be used as inputs for creating models"
  - The slide has no title. The deck title is "Requirements Determination", and this is its stated purpose.
- What is a requirement?
  - ⭐ "**A statement of what the system must do or a characteristic it must have**"
  - "Will later evolve into a technical description of how the system will be implemented"
- Types:
  - "**Functional**: relates to a process or data"
  - "**Non-functional**: relates to performance or usability"
- **Picture:** a yellow box "Requirements" with two red arrows pointing down to yellow boxes "functional" and "nonfunctional". The bottom of the slide, with its number, is hidden behind these boxes.
- Links (mine):
  - The two halves of the definition line up with the two types: "what the system must do" goes with functional, and "a characteristic it must have" goes with nonfunctional.
  - "Inputs for creating models" ties back to S2, where Models is one of the four parts of the system proposal.

### [W5b-S12] Functional requirements ⭐
- ⭐ Bold definition: "**A functional requirement relates directly to a process a system has to perform or information it needs to contain.**"
- Table (full):

| Functional Requirement | Description | Examples |
|---|---|---|
| Process-oriented | A process the system must perform; a process the system must do | • The system must allow registered customers to review their own order history for the past three years.<br>• The system must check incoming customer orders for inventory availability.<br>• The system should allow students to view a course schedule while registering for classes. |
| Information-oriented | Information the system must contain | • The system must retain customer order history for three years.<br>• The system must include real-time inventory levels at all warehouses.<br>• The system must include budgeted and actual sales and expense amounts for current year and three previous years. |

- Pattern (mine): process-oriented examples are actions ("allow … to review", "check", "allow … to view"). Information-oriented examples are data the system holds ("retain", "include").
- Same data, two different types:
  - "allow registered customers to **review** their own order history" is **process-oriented**.
  - "**retain** customer order history for three years" is **information-oriented**.

### [W5b-S13] Nonfunctional requirements ⭐
- ⭐ Bold definition: "**Nonfunctional requirements refer to behavioral properties that the system must have, such as performance and usability.**"
- "The ability to access the system using a Web browser is considered a nonfunctional requirement."
- "Nonfunctional requirements can influence the rest of analysis (functional, structural, and behavioral models) but often do so only indirectly; nonfunctional requirements are used primarily in design when decisions are made about the user interface, the hardware and software, and the system’s underlying physical architecture."
- Three takeaways:
  1. Web-browser access is **nonfunctional**.
  2. Nonfunctional requirements affect the analysis models (functional, structural, behavioral) only **indirectly**.
  3. They are used **primarily in design**, for decisions on the user interface, the hardware and software, and the physical architecture.

### [W5b-S14] (untitled) Nonfunctional requirement types — table
- Table (full):

| Nonfunctional Requirement | Description | Examples |
|---|---|---|
| Operational | The physical and technical environments in which the system will operate | • The system should be able to fit in a pocket or purse.<br>• The system should be able to integrate with the existing inventory system.<br>• The system should be able to work on any Web browser. |
| Performance | The speed, capacity, and reliability of the system | • Any interaction between the user and the system should not exceed 2 seconds.<br>• The system should receive updated inventory information every 15 minutes.<br>• The system should be available for use 24 hours per day, 365 days per year. |
| Security | Who has authorized access to the system under what circumstances | • Only direct managers can see personnel records of staff.<br>• Customers can see their order history only during business hours. |
| Cultural and political | Cultural, political factors and legal requirements that affect the system | • The system should be able to distinguish between United States and European currency.<br>• Company policy says that we buy computers only from Dell.<br>• Country managers are permitted to authorize customer user interfaces within their units.<br>• The system shall comply with insurance industry standards. |

- Footnote on slide: "*Source:* The Atlantic Systems Guild, http://www.systemsguild.com/GuildSite/Robs/Template.html"
- Mnemonic (mine): **O-P-S-C** = Operational, Performance, Security, Cultural & political.
- Easy-to-confuse items (all from this table):
  - "available 24 hours per day, 365 days per year" is **Performance** (reliability), **not** Operational.
  - "integrate with the existing inventory system" and "work on any Web browser" are **Operational** (technical environment).
  - "buy computers only from Dell" (company policy) and "comply with insurance industry standards" (legal) are **Cultural and political**.
  - "Country managers are permitted to authorize customer user interfaces" is about user interfaces, yet it is filed under **Cultural and political**.

### [W5b-S15] (untitled) The most common mistake — classification exercise ⭐
- "One of the most common mistakes by new analysts is to confuse functional and nonfunctional requirements. Pretend that you received the following list of requirements for a sales system."
- "Requirements for Proposed System The system should:"
  1. be accessible to the Web users;
  2. include the company standard logo and color scheme;
  3. restrict access to profitability information;
  4. include actual and budgeted cost information;
  5. provide management reports;
  6. include sales information that is updated at least daily;
  7. have two-second maximum response time for predefined queries and ten-minute maximum response time for ad hoc queries;
  8. include information from all company subsidiaries;
  9. print subsidiary reports in the primary language of the subsidiary;
  10. provide monthly rankings of salesperson performance
- The slide gives **no answer key**. §5, Example 1 has a full solution that uses only the S12 and S14 categories.
- ⭐ The slide flags this as "one of the most common mistakes".
- ⚠️ Formatting:
  - "Requirements for Proposed System The system should:" is missing a line break or colon after the heading.
  - Only the first letter "O" of the slide is bold, which looks like leftover formatting.

### [W5b-S16] Requirements Definition Report ⭐
- ⭐ Definition (the bold part is bold on the slide): "The requirements definition report—usually just called the requirements **definition—is a straightforward text report that simply lists the functional and nonfunctional requirements in an outline format.**"
- "Next figure shows a sample requirements definition for an appointment system for a typical doctor’s office." The figure is on this same slide, in two panels:

```text
Nonfunctional Requirements                                   Functional Requirements

1. Operational Requirements                                  1. Manage Appointments
   1.1. The system will operate in Windows environment.         1.1. Patient makes new appointment.
   1.2. The system should be able to connect to printers        1.2. Patient changes appointment.
        wirelessly.                                             1.3. Patient cancels appointment.
   1.3. The system should automatically back up at the
        end of each day.                                     2. Produce Schedule
                                                                2.1. Office Manager checks daily schedule.
2. Performance Requirements                                     2.2. Office Manager prints daily schedule.
   2.1. The system will store a new appointment in
        2 seconds or less.                                   3. Record Doctor Availability
   2.2. The system will retrieve the daily appointment          3.1. Doctor updates schedule
        schedule in 2 seconds or less.

3. Security Requirements
   3.1. Only doctors can set their availability.
   3.2. Only a manager can produce a schedule.

4. Cultural and Political Requirements
   4.1. No special cultural and political requirements are anticipated.
```

- What to notice:
  - **Outline format** with numbered levels (1 → 1.1, 1.2 …), exactly as the definition says.
  - Nonfunctional requirements are grouped under the **four S14 categories**. A category with nothing in it is still listed ("No special cultural and political requirements are anticipated.").
  - Functional requirements are grouped by **process** (Manage Appointments, Produce Schedule, Record Doctor Availability), with short actor–action lines underneath ("Patient makes new appointment.").
  - Same topic, different type: "Only a manager can produce a schedule" is **Security** (nonfunctional), while "Office Manager prints daily schedule" is **functional**.
  - "automatically back up at the end of each day" is filed under **Operational**.

### [W5b-S17] Determining Requirements (strategies)
- "The most effective approach is to have both business people and analysts working together to determine business requirements. Sometimes, however, users don’t know exactly what they want, and analysts need to help them discover their needs."
- "Three kinds of strategies have become popular to help analysts do this:"
  - ❑ Business process automation (BPA)
  - ❑ Business process improvement (BPI)
  - ❑ Business process reengineering (BPR).
- "Analysts can use these tools when they need to guide the users in explaining what is wanted from a system."

### [W5b-S18] (untitled) How the three strategies work; amount of change
- "The three kinds of strategies work similarly. They help users critically examine the current state of systems and processes (the as-is system), identify exactly what needs to change, and develop a concept for a new system (the to-be system). A different amount of change is associated with each technique;"
  - ❑ "BPA creates a small amount of change"
  - ❑ "BPI creates a moderate amount of change"
  - ❑ "BPR creates significant change that affects much of the organization."
- Key terms:
  - **as-is system** = "the current state of systems and processes".
  - **to-be system** = "a concept for a new system".
- Terminology note: the slides call BPA, BPI and BPR both "strategies" (S17, S18, S21) and "techniques" (S7, S18, S33). The methods under each one are called "techniques" for BPA (S22) and "activities" for BPI (S24) and BPR (S29). The deck uses these words interchangeably.

### [W5b-S19] Determining Requirements (techniques)
- "Therefore, analysts use a portfolio of requirements-gathering techniques to acquire information from users. The analyst has many techniques from which to choose:"
  - ❑ interviews,
  - ❑ questionnaires,
  - ❑ observation,
  - ❑ joint application development (JAD)
  - ❑ document analysis.
- "The information gathered using these techniques is critically analyzed and used to craft the requirements definition report."
- The slide opens with "Therefore", but the reasoning that comes before it is not on the slides.
- Strategies vs techniques:
  - The **strategies** (S17) **guide users** in explaining what they want.
  - The **gathering techniques** (S19) **acquire information** from users.
  - Both end up in the **requirements definition report**.

### [W5b-S20] Real-World Problems with Requirements Determination
- ❑ "First, the analyst might not have access to the correct set of users to uncover the complete set of requirements."
- ❑ "Second, the specification of the requirements may be inadequate. This can be especially true with the lightweight techniques associated with agile methodologies."
- ❑ "Third, some requirements are simply unknowable at the beginning of a development process."
- ❑ "Fourth, verifying and validating of requirements can be very difficult."
- Memory hook (mine): **wrong Users – weak Specification – Unknowable – hard to Verify/validate**.

### [W5b-S21] REQUIREMENTS ANALYSIS STRATEGIES
- "Before the project team can determine what requirements are appropriate for a given system, they need to have a clear vision of the kind of system that will be created and the level of change that it will bring to the organization. The basic process of analysis is divided into three steps:"
  - ❑ understanding the as-is system
  - ❑ identifying improvements
  - ❑ developing requirements for the to-be system.
- **Picture:** three boxes joined by outlined arrows: **Understand ⇒ Identify ⇒ Develop**.

### [W5b-S22] Business Process Automation (BPA) ⭐
- "BPA leaves the basic way the organization operates unchanged and uses computer technology to do some of the work."
- ⭐ Bold: "**BPA can make the organization more efficient but has the least impact on the business.**"
- "Planners in BPA projects spend a significant time understanding the current as-is system before moving on to improvements and to-be system requirements."
- "Problem analysis and root cause analysis are two popular BPA techniques."
  - ❑ **Problem Analysis**
  - ❑ **Root Cause Analysis**
- ⚠️ Minor grammar: "spend a significant time" should read "a significant amount of time". The meaning is clear.

### [W5b-S23] (untitled) Problem analysis and root cause analysis ⭐
- ❑ **Problem Analysis:** "The most straightforward (and probably the most commonly used) requirements-analysis technique is *problem analysis*. Problem analysis means asking the users and managers to identify problems with the as-is system and to describe how to solve them in the to-be system."
- ❑ **Root Cause Analysis:** "The ideas produced by problem analysis tend to be solutions to problems. ⭐ **All solutions make assumptions about the nature of the problem, assumptions that might or might not be valid.** In our experience, users (and most people in general) tend to quickly jump to solutions without fully considering the nature of the problem."
- "Sometimes the solutions are appropriate, but many times they address a *symptom* of the problem, not the true problem or *root cause* itself."
- How the two fit together:
  - **Problem analysis**: users and managers name problems in the as-is system *and* how to solve them in the to-be system.
  - **Root cause analysis**: checks whether those solutions fix the **root cause** or only a **symptom**. This matters because every solution rests on assumptions about the problem that may not be valid.
- ⭐ Bold sentence about assumptions; italic *problem analysis*, *symptom* and *root cause*.
- Don't mix up two "most commonly used" claims:
  - Problem analysis is "probably the most commonly used" **requirements-analysis** technique (here).
  - The interview is "the most commonly used **requirements-gathering** technique" (S35).
- 🔎 Look up in Track B: how a root cause analysis is carried out step by step. The slide gives only the idea.

### [W5b-S24] Business Process Improvement (BPI)
- "BPI makes moderate changes to the way the organization operates in order to take advantage of new opportunities offered by technology or to copy what competitors are doing."
- "BPI can improve **efficiency (i.e., doing things right)** and improve **effectiveness (i.e., doing the right things)**." (Bold mine.)
- "Planners of BPI projects also spend time understanding the as-is system, but much less time than with BPA projects; their primary focus is on improving business processes, so time is spent on the as-is only to help with the improvement analyses and the to-be system requirements."
- "Popular BPI activities"
  - ❑ Duration analysis
  - ❑ activity-based costing
  - ❑ informal benchmarking
- Compare with S22: S22 credits BPA with making the organization "more efficient". S24 credits BPI with both **efficiency** and **effectiveness**.
- Memorize the pair: **efficiency = doing things right**; **effectiveness = doing the right things**.

### [W5b-S25] Duration Analysis
- "Duration analysis requires a detailed examination of the amount of time it takes to perform each process in the current as-is system. The analysts begin by determining the total amount of time it takes, on average, to perform a set of business processes for a typical input. They then time each of the individual steps (or subprocesses) in the business process. The time to complete the basic steps are then totaled and compared to the total for the overall process."
- The method as steps (numbering mine):
  1. Measure the **average total time** of the whole set of business processes for a **typical input**.
  2. **Time each individual step** (subprocess).
  3. **Total** the step times.
  4. **Compare** that total with the overall process time. A large gap means the process is broken (see S26).
- ⚠️ Minor grammar: "The time to complete the basic steps **are** then totaled" should be "time … is" (or "times … are").

### [W5b-S26] Example (duration analysis — home mortgage)
- "For example, suppose that the analysts are working on a home mortgage system and discover that on average, it takes thirty days for the bank to approve a mortgage. They then look at each of the basic steps in the process (e.g., data entry, credit check, title search, appraisal) and find that the total amount of time actually spent on each mortgage is about eight hours. This is a strong indication that the overall process is badly broken, because it takes thirty days to perform one day’s work."
- Worked through, following the S25 steps:
  1. Overall time per mortgage: **30 days** on average.
  2. Steps timed: data entry, credit check, title search, appraisal. The slide gives no individual times.
  3. Total of the steps: **≈ 8 hours**, which equals one 8-hour working day ("one day’s work").
  4. Compare: 30 days elapsed for 1 day of work.
     - Elapsed time is about **30 times** the work time.
     - Only 1/30 ≈ **3.3 %** of the elapsed days is real work.
     - Counting every clock hour instead (30 × 24 = 720 h), the work share is 8/720 ≈ **1.1 %**, so about 712 h (≈ 98.9 %) pass with nobody working on the mortgage.
- **Conclusion** (slide): "a strong indication that the overall process is badly broken".
- The slide doesn't say whether the 30 days are calendar days or working days. The conclusion is the same either way. Full calculation in §5, Example 3.
- 🔎 Look up in Track B: what usually causes such a gap, and how a BPI project would close it. Neither is on the slides.

### [W5b-S27] Activity-Based Costing
- "Activity-based costing is a similar analysis; it examines the cost of each major process or step in a business process rather than the time taken. The analysts identify the costs associated with each of the basic functional steps or processes, identify the most costly processes, and focus their improvement efforts on them."
- "Assigning costs is conceptually simple. Analysts simply examine the direct cost of labor and materials for each input. Materials costs are easily assigned in a manufacturing process, whereas labor costs are usually calculated based on the amount of time spent on the input and the hourly cost of the staff. However, as you may recall from a managerial accounting course, there are indirect costs such as rent, depreciation, and so on, that also can be included in activity costs."
- Summary:
  - Duration analysis measures **time** per step. Activity-based costing measures **cost** per step.
  - Procedure: cost each basic step, identify the **most costly** processes, then focus improvement efforts on them.
  - **Direct costs** = labor + materials, per input.
    - Materials costs are easy to assign in manufacturing.
    - **Labor cost per input = time spent on the input × hourly cost of the staff** (straight from the slide's wording).
  - **Indirect costs** such as rent and depreciation "also can be included".

### [W5b-S28] Informal Benchmarking
- "Benchmarking refers to studying how other organizations perform a business process in order to learn how your organization can do something better."
- "Benchmarking helps the organization by introducing ideas that employees may never have considered but that have the potential to add value. Informal benchmarking is fairly common for customer-facing business processes (i.e., processes that interact with the customer)."
- "With informal benchmarking, the managers and analysts think about other organizations or visit them as customers to watch how the business process is performed. In many cases, the business studied may be a known leader in the industry or simply a related firm. For example, suppose the team is developing a website for a car dealer. The project sponsor, key managers, and key team members would likely visit the websites of competitors as well as those of others in the car industry (e.g., manufacturers, accessories suppliers) and those in other industries that have won awards for their websites."
- The example broken down:
  - **Who looks:** the project sponsor, key managers, key team members.
  - **Whose sites they visit:**
    1. Competitors.
    2. Others in the car industry: manufacturers and accessories suppliers.
    3. Award-winning websites from **other** industries.
  - **How:** they think about other organizations, or visit them **as customers**.
  - **Which business to study:** "a known leader in the industry or simply a related firm".
  - **Where it's common:** customer-facing processes, i.e. processes that interact with the customer.

### [W5b-S29] Business Process Reengineering
- "BPR means changing the fundamental way the organization operates, obliterating the current way of doing business and making major changes to take advantage of new ideas and new technology. Planners of BPR projects spend little time understanding the as-is, because their goal is to focus on new ideas and new ways of doing business."
- **Popular BPR activities** (bold on slide):
  - ❑ Outcome analysis
  - ❑ Technology analysis
  - ❑ Activity elimination
- Time spent on the as-is system, compared across the three strategies:
  - **BPA**: "a significant time" (S22).
  - **BPI**: "much less time than with BPA" (S24).
  - **BPR**: "little time" (S29).

### [W5b-S30] Outcome Analysis
- "Outcome analysis focuses on understanding the fundamental outcomes that provide value to customers. Although these outcomes sound as though they should be obvious, they often are not."
- 🔎 Look up in Track B: a worked example of outcome analysis. The slide has none.

### [W5b-S31] Technology Analysis
- "Many major changes in business since the turn of the century have been enabled by new technologies. *Technology analysis* starts by having the analysts and managers develop a list of important and interesting technologies. Then the group systematically identifies how every technology could be applied to the business process and identifies how the business would benefit."
- Steps (from the quote):
  1. Analysts and managers list important and interesting technologies.
  2. For **every** technology, they systematically identify how it could be applied to the business process.
  3. They identify how the business would benefit.

### [W5b-S32] Activity Elimination
- "*Activity elimination* is exactly what it sounds like. The analysts and managers work together to identify how the organization could eliminate each activity in the business process, how the function could operate without it, and what effects are likely to occur. Initially, managers are reluctant to conclude that processes can be eliminated, but this is a force-fit exercise in that they must eliminate each activity. In some cases the results are silly; nonetheless, participants must address every activity in the business process."
- Three questions asked about **each** activity:
  1. How could the organization eliminate it?
  2. How could the function operate without it?
  3. What effects are likely to occur?
- Key phrase: **"force-fit exercise"**. Every activity must be addressed even when the results are silly, and managers are reluctant at first.

### [W5b-S33] Selecting Appropriate Strategies
- "Each technique discussed has its own strengths and weaknesses. No one technique is inherently better than the others, and in practice most projects use a combination of techniques."
- Table (full, as on the slide):

| | Business Process Automation | Business Process Improvement | Business Process Reengineering |
|---|---|---|---|
| **Potential business value** | Low–moderate | Moderate | High |
| **Project cost** | Low | Low–moderate | High |
| **Breadth of analysis** | Narrow | Narrow–moderate | Very broad |
| **Risk** | Low–moderate | Low–moderate | Very high |

- Patterns to remember (mine, read off the table):
  - Moving BPA → BPI → BPR, **value, cost and breadth all rise**.
  - **Risk** is the same for BPA and BPI (Low–moderate), then jumps to **Very high** for BPR.
  - BPR is the only strategy rated "Very" anything (Very broad, Very high).
- Exact values people get wrong:
  - BPA value is "Low–moderate", not "Low".
  - BPI cost is "Low–moderate", not "Moderate".
  - BPI breadth is "Narrow–moderate".
- Key sentence: no technique is inherently better, and most projects **combine** techniques.

### [W5b-S34] REQUIREMENTS-GATHERING TECHNIQUES
- "The requirements-gathering process is used for building political support for the project and establishing trust and rapport between the project team building the system and the users who ultimately will choose to use or not use the system. Involving someone in the process implies that the project teams view that person as an important resource and value his or her opinions."
- "All the key stakeholders must be included in the requirements-gathering process."
- "The second challenge of requirements gathering is choosing the way(s) information is collected. There are many techniques for gathering requirements that vary from asking people questions to watching them work."
- Key points:
  - Gathering does more than collect facts. It builds **political support** and **trust and rapport** with the users, who "ultimately will choose to use or not use the system".
  - **All key stakeholders must be included.**
  - The slide names only a "**second challenge**": choosing the way(s) information is collected. The text just before it is about who to involve (all key stakeholders).
  - The range of techniques runs from "asking people questions to watching them work".

### [W5b-S35] Interviews ⭐
- ⭐ "An interview is the most commonly used requirements-gathering technique. After all, it is natural— if you need to know something, you usually ask someone. In general, interviews are conducted one-on-one (one interviewer and one interviewee), but sometimes, owing to time constraints, several people are interviewed at the same time. There are five basic steps to the interview process:"
  1. selecting interviewees
  2. designing interview questions
  3. preparing for the interview
  4. conducting the interview
  5. postinterview follow-up.
- Normally one-on-one. Several people are interviewed together only "owing to time constraints".
- ⭐ The slide calls interviews "the most commonly used" gathering technique.
- Where each step is covered in this deck:

| Step | Slides |
|---|---|
| 1. Selecting interviewees | S36 |
| 2. Designing interview questions | S37–S41 |
| 3. Preparing for the interview | S42 |
| 4. Conducting the interview | S43 |
| 5. Post-interview follow-up | S44–S45 |

### [W5b-S36] (untitled) Interview schedule
- "The first step in interviewing is to create an *interview schedule* listing all the people who will be interviewed, when, and for what purpose"
- Table (full):

| Name | Position | Purpose of Interview | Meeting |
|---|---|---|---|
| Andria McClellan | Director, Accounting | Strategic vision for new accounting system | Mon., March 1, 8:00–10:00 AM |
| Jennifer Draper | Manager, Accounts Receivable | Current problems with accounts receivable process; future goals | Mon., March 1, 2:00–3:15 PM |
| Mark Goodin | Manager, Accounts Payable | Current problems with accounts payable process; future goals | Mon., March 1, 4:00–5:15 PM |
| Anne Asher | Supervisor, Data Entry | Accounts receivable and payable processes | Wed., March 3, 10:00–11:00 AM |
| Fernando Merce | Data Entry Clerk | Accounts receivable and payable processes | Wed., March 3, 1:00–3:00 PM |

- "People at different levels of the organization have different perspectives on the system, so it is important to include both managers who manage the processes and staff who actually perform the processes to gain both high-level and low-level perspectives on an issue."
- How the schedule is built (read from the table):
  - It runs **down the organization**: director, then managers, then supervisor, then clerk.
  - The purpose narrows at each level: **strategic vision**, then **current problems + future goals**, then **how the processes are done**.
  - The director and the two managers are interviewed on Monday. The data-entry supervisor and the clerk, who are closest to how the processes are performed, are interviewed on Wednesday. This gives the "high-level and low-level perspectives" the slide asks for.
  - Interview lengths are worked out in §5, Example 6.

### [W5b-S37] (untitled) Three types of interview questions; closed-ended ⭐
- ⭐ "There are three types of interview questions: **closed-ended questions**, **open-ended questions**, and **probing questions**."
- ⭐ "***Closed-ended questions*** are those that require a specific answer. They are similar to multiple-choice or arithmetic questions on an exam. Closed-ended questions are used when an analyst is looking for specific, precise information (e.g., how many credit card requests are received per day)."
- Table (full):

| Types of Questions | Examples |
|---|---|
| Closed-ended questions | • How many telephone orders are received per day?<br>• How do customers place orders?<br>• What information is missing from the monthly sales report? |
| Open-ended questions | • What do you think about the current system?<br>• What are some of the problems you face on a daily basis?<br>• What are some of the improvements you would like to see in a new system? |
| Probing questions | • Why?<br>• Can you give me an example?<br>• Can you explain that in a bit more detail? |

- **Trap (not a typo):** the slide lists "How do customers place orders?" and "What information is missing from the monthly sales report?" as **closed-ended**. Both ask for a specific factual answer, not an opinion. If they come up, classify them as the slide does.

### [W5b-S38] (untitled) Open-ended and probing questions ⭐
- ⭐ "**Open-ended questions** are those that leave room for elaboration on the part of the interviewee. They are similar in many ways to essay questions that you might find on an exam. Open-ended questions are designed to gather rich information and give the interviewee more control over the information that is revealed during the interview."
- ⭐ "The third type of question is the ***probing question***. Probing questions follow up on what has just been discussed in order to learn more, and they often are used when the interviewer is unclear about an interviewee’s answer. They encourage the interviewee to expand on or to confirm information from a previous response, and they signal that the interviewer is listening and is interested in the topic under discussion."
- Exam analogies from S37–S38:
  - closed-ended ≈ **multiple-choice or arithmetic** questions;
  - open-ended ≈ **essay** questions.
- Probing questions do two jobs. They get the interviewee to **expand on or confirm** an earlier answer, and they **signal** that the interviewer is listening and interested.

### [W5b-S39] (untitled) Unstructured vs structured interviews ⭐
- ⭐ "**No type of question is better than another**, and a combination of questions is usually used during an interview. At the initial stage of an IS development project, the as-is process can be unclear, so the interview process begins with ***unstructured interviews,*** interviews that seek broad and roughly defined information. In this case, the interviewer has a general sense of the information needed but has few closed-ended questions to ask. These are the most challenging interviews to conduct because they require the interviewer to ask open-ended questions and probe for important information on the fly."
- "As the project progresses, the analyst comes to understand the business process much better and needs very specific information about how business processes are performed (e.g., exactly how a customer credit card is approved). At this time, the analyst conducts ***structured interviews,*** in which specific sets of questions are developed before the interviews. There usually are more closed-ended questions in a structured interview then in the unstructured approach."
- ⚠️ **Typo:** "…more closed-ended questions in a structured interview **then** in the unstructured approach" should read "**than**".
- Comparison (from the quotes):

| | Unstructured interview | Structured interview |
|---|---|---|
| When | initial stage of the project; the as-is process can be unclear | as the project progresses and the analyst understands the business process much better |
| Seeks | "broad and roughly defined information" | "very specific information about how business processes are performed" (e.g., exactly how a customer credit card is approved) |
| Questions | few closed-ended questions; open-ended questions and probing "on the fly" | specific sets of questions developed **before** the interview; **more closed-ended** questions |
| Difficulty | "the most challenging interviews to conduct" | not described on the slide |

- IS = information system. The abbreviation isn't expanded on the slide.

### [W5b-S40] (untitled) Organizing the questions: top-down vs bottom-up ⭐
- "No matter what kind of interview is being conducted, interview questions must be organized into a logical sequence so that the interview flows well."
- ⭐ "There are two fundamental approaches to organizing the interview questions: **top down or bottom up.**"
- ⭐ "With the ***top-down interview***, the interviewer starts with broad, general issues and gradually works toward more-specific ones."
- ⭐ "With the ***bottom-up interview***, the interviewer starts with very specific questions and moves to broad questions. In practice, analysts mix the two approaches, starting with broad, general issues, moving to specific questions, and then returning to general issues."
- In practice the order is **broad → specific → broad again**.

### [W5b-S41] (untitled) Top-down / bottom-up pyramid
- **Picture:** a triangle split into three levels.
  - At the apex: "**Top-Down**" with a down-arrow.
  - At the base: "**Bottom-Up**" with an up-arrow.
  - Each level has a label on the left and an example question inside the triangle:

| Level (label) | Example question (inside the pyramid) |
|---|---|
| **High-level:** Very general | How can order processing be improved? |
| **Medium-level:** Moderately specific | How can we reduce the number of times that customers return items they’ve ordered? |
| **Low-level:** Very specific | How can we reduce the number of errors in order processing (e.g., shipping the wrong products)? |

- How to read it:
  - **Top-down**: ask from the apex down, general → specific.
  - **Bottom-up**: ask from the base up, specific → general.
  - All three questions are about the same topic, order processing, at three levels of detail.

### [W5b-S42] Prepare for the Interview
- "It is important to prepare for the interview in the same way that you would prepare to give a presentation. The interviewer should have a general interview plan listing the questions to be asked in the appropriate order, should anticipate possible answers and provide follow-up with them, and should identify segues between related topics. The interviewer should confirm the areas in which the interviewee has knowledge so as not to ask questions that the interviewee cannot answer. Review the topic areas, the questions, and the interview plan, and clearly decide which have the greatest priority in case time runs short."
- Preparation checklist (taken from the quote):
  - [ ] Prepare as you would **for a presentation**.
  - [ ] Have a **general interview plan** with the questions in the appropriate order.
  - [ ] **Anticipate possible answers** and plan follow-ups to them.
  - [ ] Identify **segues** between related topics.
  - [ ] **Confirm the interviewee's areas of knowledge**, so you don't ask questions they cannot answer.
  - [ ] Review topics, questions and plan, and decide **priorities in case time runs short**.

### [W5b-S43] Conduct the Interview
- "In starting the interview, the first goal is to build rapport with the interviewee, so that he or she trusts the interviewer and is willing to tell the whole truth, not just give the answers that he or she thinks are wanted. The interviewer should appear to be professional and an unbiased, independent seeker of information. The interview should start with an explanation of why the interviewer is there and why he or she has chosen to interview the person; then the interviewer should move into the planned interview questions."
- "It is critical to carefully record all the information that the interviewee provides. In our experience, the best approach is to take careful notes—write down everything the interviewee says, even if it does not appear immediately relevant. The interviewer shouldn’t be afraid to ask the person to slow down or to pause while writing, because this is a clear indication that the interviewee’s information is important."
- Key points:
  - **First goal: build rapport.** The interviewee should trust you enough to tell the whole truth, not just the answers they think you want.
  - Appear **professional, unbiased, an independent seeker of information**.
  - **Opening:** explain why you are there and why you chose this person, then move into the planned questions.
  - **Record everything:**
    - Take careful notes, even of things that don't seem relevant yet.
    - Asking the person to slow down or pause is fine, because it shows their information is important.

### [W5b-S44] Post-Interview Follow-up
- "After the interview is over, the analyst needs to prepare an interview report that describes the information from the interview. The report contains interview notes, information that was collected over the course of the interview and is summarized in a useful format. In general, the interview report should be written within forty-eight hours of the interview, because the longer the interviewer waits, the more likely he or she is to forget information."
- "Often, the interview report is sent to the interviewee with a request to read it and inform the analyst of clarifications or updates."
- Remember:
  - **Interview report** = interview notes, summarized in a useful format.
  - Write it **within 48 hours**, because the longer you wait, the more you forget.
  - It is often **sent to the interviewee** to read and to send back clarifications or updates.
- ⚠️ Spelling: S35 writes "postinterview follow-up" and this slide writes "Post-Interview Follow-up". They are the same step.

### [W5b-S45] (untitled) Sample interview report (interview notes)
- **Picture:** a sample interview report. The slide shows no number. Full content:

```text
Interview Notes Approved by: Linda Estey

Person Interviewed: Linda Estey,
   Director, Human Resources
Interviewer: Barbara Wixom

Purpose of Interview:
 • Understand reports produced for Human Resources by the current system
 • Determine information requirements for future system

Summary of Interview:
 • Sample reports of all current HR reports are attached to this report. The information that is not
   used and missing information are noted on the reports.
 • Two biggest problems with the current system are:
   1. The data are too old (the HR Department needs information within two days of month end;
      currently information is provided to them after a three-week delay)
   2. The data are of poor quality (often reports must be reconciled with departmental HR
      database)
 • The most common data errors found in the current system include incorrect job level information
   and missing salary information.

Open Items:
 • Get current employee roster report from Mary Skudrna (extension 4355).
 • Verify calculations used to determine vacation time with Mary Skudrna.
 • Schedule interview with Jim Wack (extension 2337) regarding the reasons for data quality
   problems.

Detailed Notes: See attached transcript.
```

- The report's parts, in order:
  1. Approval line
  2. Person interviewed (with position)
  3. Interviewer
  4. Purpose of interview
  5. Summary of interview
  6. Open items
  7. Detailed notes
- Link to S44: "Approved by: Linda Estey" means the **interviewee herself** checked the notes. S44 says the report is sent to the interviewee "with a request to read it and inform the analyst of clarifications or updates".
- Link to S23 (mine): the open item "Schedule interview with Jim Wack … regarding the reasons for data quality problems" goes after the **cause** of a problem rather than a quick fix. That is the idea behind root cause analysis.

---

## 3. Definitions & key terms

### 3.1 Requirements
- **Project requirements**: "the high-level objectives, constraints, and conditions that need to be met for the project to be considered successful." They are "usually defined by the project stakeholders" and focus on "scope, timeline, budget, and resources" [S4]. The eight items they include are listed on [S5].
- **Product requirements**: "the specific features, functionalities, and characteristics that the final product must possess to meet the needs of its end-users." They are "typically defined by the product owner or the product management team" and focus on "functionality, performance, and usability" [S4].
- **SLA (Service Level Agreement)**: listed as a project requirement: "Service Level Agreement (SLA) with customers. For example, warranty service." [S5]
- **Product requirements document (PRD)**: "defines the requirements of a particular product, including the product’s purpose, features, functionality, and behavior. It serves as a guide for business and technical teams to help build, launch, or market the product." The S6 title treats it as the same document as the requirements definition report [S6].
- **Requirements definition (report)**:
  - "a document that lists the new system’s capabilities" [S7];
  - "a straightforward text report that simply lists the functional and nonfunctional requirements in an outline format" [S16].
- **Requirement**: "A statement of what the system must do or a characteristic it must have". It "Will later evolve into a technical description of how the system will be implemented" [S11].
- **Business requirements** (sometimes **user requirements**): requirements "written from the perspective of the business person" during analysis. They "focus on the “what” of the system" and get their name "Because they focus on the needs of the business user" [S9].
- **System requirements**: "Requirements in design are written from the developer’s perspective, and they are usually called system requirements". They "describe how the system will be implemented" [S9].
- **Stakeholder requirements / solution requirements** (diagram labels only): "Stake Holder Requirements (Needs to be met, Most important)" and "Solution Requirements (Capabilities & Qualities)" [S10].
- **Functional requirement**: "relates directly to a process a system has to perform or information it needs to contain" [S12]. Short form: "relates to a process or data" [S11].
  - **Process-oriented**: "A process the system must perform; a process the system must do" [S12].
  - **Information-oriented**: "Information the system must contain" [S12].
- **Nonfunctional requirement**: "Nonfunctional requirements refer to behavioral properties that the system must have, such as performance and usability" [S13]. Short form: "relates to performance or usability" [S11].
  - **Operational**: "The physical and technical environments in which the system will operate" [S14].
  - **Performance**: "The speed, capacity, and reliability of the system" [S14].
  - **Security**: "Who has authorized access to the system under what circumstances" [S14].
  - **Cultural and political**: "Cultural, political factors and legal requirements that affect the system" [S14].

### 3.2 Requirements-analysis strategies and their techniques
- **As-is system**: "the current state of systems and processes" [S18].
- **To-be system**: "a concept for a new system" [S18].
- **Three steps of analysis**: "understanding the as-is system", "identifying improvements", "developing requirements for the to-be system" [S21].
- **BPA (business process automation)**: "leaves the basic way the organization operates unchanged and uses computer technology to do some of the work"; it "can make the organization more efficient but has the least impact on the business" [S22].
  - **Problem analysis**: "asking the users and managers to identify problems with the as-is system and to describe how to solve them in the to-be system" [S23].
  - **Root cause analysis**: built on the point that "All solutions make assumptions about the nature of the problem, assumptions that might or might not be valid". Solutions often "address a *symptom* of the problem, not the true problem or *root cause* itself" [S23].
- **BPI (business process improvement)**: "makes moderate changes to the way the organization operates in order to take advantage of new opportunities offered by technology or to copy what competitors are doing" [S24].
  - **Efficiency** = "doing things right". **Effectiveness** = "doing the right things" [S24].
  - **Duration analysis**: "requires a detailed examination of the amount of time it takes to perform each process in the current as-is system" [S25].
  - **Activity-based costing**: "examines the cost of each major process or step in a business process rather than the time taken" [S27].
  - **Benchmarking**: "studying how other organizations perform a business process in order to learn how your organization can do something better" [S28].
  - **Informal benchmarking**: "the managers and analysts think about other organizations or visit them as customers to watch how the business process is performed". It is "fairly common for customer-facing business processes (i.e., processes that interact with the customer)" [S28].
- **BPR (business process reengineering)**: "changing the fundamental way the organization operates, obliterating the current way of doing business and making major changes to take advantage of new ideas and new technology" [S29].
  - **Outcome analysis**: "focuses on understanding the fundamental outcomes that provide value to customers" [S30].
  - **Technology analysis**: "starts by having the analysts and managers develop a list of important and interesting technologies. Then the group systematically identifies how every technology could be applied to the business process and identifies how the business would benefit" [S31].
  - **Activity elimination**: analysts and managers "identify how the organization could eliminate each activity in the business process, how the function could operate without it, and what effects are likely to occur". It is "a force-fit exercise" [S32].

### 3.3 Requirements gathering and interviews
- **Requirements-gathering techniques**: "interviews, questionnaires, observation, joint application development (JAD) document analysis" [S19]. Gathering is also "used for building political support for the project and establishing trust and rapport" [S34].
- **Interview**: "the most commonly used requirements-gathering technique", generally "conducted one-on-one (one interviewer and one interviewee)" [S35].
- **Five steps of the interview process**: "selecting interviewees", "designing interview questions", "preparing for the interview", "conducting the interview", "postinterview follow-up" [S35].
- **Interview schedule**: lists "all the people who will be interviewed, when, and for what purpose" [S36].
- **Closed-ended questions**: "those that require a specific answer". They are like multiple-choice or arithmetic questions on an exam [S37].
- **Open-ended questions**: "those that leave room for elaboration on the part of the interviewee". They are like essay questions [S38].
- **Probing questions**: "follow up on what has just been discussed in order to learn more" [S38].
- **Unstructured interviews**: "interviews that seek broad and roughly defined information" [S39].
- **Structured interviews**: interviews "in which specific sets of questions are developed before the interviews" [S39].
- **Top-down interview**: "the interviewer starts with broad, general issues and gradually works toward more-specific ones" [S40].
- **Bottom-up interview**: "the interviewer starts with very specific questions and moves to broad questions" [S40].
- **Rapport**: used but not defined. Building it is "the first goal" when starting the interview, "so that he or she trusts the interviewer and is willing to tell the whole truth" [S43]. See also "trust and rapport" [S34].
- **Interview report**: "describes the information from the interview" and "contains interview notes, information that was collected over the course of the interview and is summarized in a useful format". It should be written "within forty-eight hours of the interview" [S44]. A sample is on [S45].

---

## 4. Comparison tables (as taught)

### 4.1 Requirement types

**A. Three pairs of requirement terms**

| Pair | Side 1 | Side 2 | Ref |
|---|---|---|---|
| Project vs product | **Project requirements**: objectives, constraints, conditions for the *project* to succeed. Defined by project stakeholders. Focus: scope, timeline, budget, resources. | **Product requirements**: features, functionalities, characteristics of the *final product*. Defined by the product owner or product management team. Focus: functionality, performance, usability. | S4–S5 |
| Business vs system | **Business (user) requirements**: written in analysis, from the business person's perspective, about the "what". | **System requirements**: written in design, from the developer's perspective, about how the system will be implemented. | S9 |
| Functional vs nonfunctional | **Functional**: a process the system has to perform or information it needs to contain ("process or data"). The "Capabilities" box on S10. | **Nonfunctional**: behavioral properties such as performance and usability. The "Qualities, Usability" box on S10. Used primarily in design. | S10–S13 |

**B. Subtypes, each with one example from the slides**

| Type | Subtype | Slide description | Example from the slides |
|---|---|---|---|
| Functional | Process-oriented | A process the system must perform; a process the system must do | "The system must check incoming customer orders for inventory availability." (S12) |
| Functional | Information-oriented | Information the system must contain | "The system must retain customer order history for three years." (S12) |
| Nonfunctional | Operational | The physical and technical environments in which the system will operate | "The system should be able to work on any Web browser." (S14) |
| Nonfunctional | Performance | The speed, capacity, and reliability of the system | "Any interaction between the user and the system should not exceed 2 seconds." (S14) |
| Nonfunctional | Security | Who has authorized access to the system under what circumstances | "Only direct managers can see personnel records of staff." (S14) |
| Nonfunctional | Cultural and political | Cultural, political factors and legal requirements that affect the system | "The system shall comply with insurance industry standards." (S14) |

**C. Hierarchy (S10 diagram):** Business Requirements (Goals, Objectives, Why) → Stake Holder Requirements (Needs to be met) → Solution Requirements (Capabilities & Qualities) → **Functional** (Capabilities) + **Non Functional** (Qualities, Usability).

### 4.2 The two toolkits: analysis strategies vs gathering techniques

| | Requirements-analysis strategies | Requirements-gathering techniques |
|---|---|---|
| Members | BPA, BPI, BPR (S17) | interviews, questionnaires, observation, JAD, document analysis (S19) |
| Purpose (slide words) | help users "discover their needs"; "guide the users in explaining what is wanted from a system" (S17) | "acquire information from users" (S19) |
| How | examine the as-is system, identify what needs to change, develop the to-be concept (S18, S21) | "vary from asking people questions to watching them work" (S34) |
| Ends up in | to-be system requirements (S21) | the information is "critically analyzed and used to craft the requirements definition report" (S19) |
| Side benefit | not stated on the slides | builds political support, trust and rapport (S34) |
| Explained in this deck | all three | interviews only |

### 4.3 BPA vs BPI vs BPR (techniques, value, cost, breadth, risk)

| | **BPA** – Business process automation | **BPI** – Business process improvement | **BPR** – Business process reengineering |
|---|---|---|---|
| What it does | leaves the basic way the organization operates unchanged; uses computer technology to do some of the work (S22) | moderate changes to take advantage of new opportunities offered by technology or to copy what competitors are doing (S24) | changes the fundamental way the organization operates; obliterates the current way of doing business; major changes for new ideas and new technology (S29) |
| Amount of change (S18) | small | moderate | significant; affects much of the organization |
| Benefit (slide words) | "more efficient"; "the least impact on the business" (S22) | efficiency (doing things right) **and** effectiveness (doing the right things) (S24) | no benefit sentence on the slide; S33 rates its potential value "High" |
| Time on the as-is system | "a significant time" (S22) | "much less time than with BPA", only to help the improvement analyses and to-be requirements (S24) | "little time", since the goal is new ideas (S29) |
| Techniques / activities | problem analysis, root cause analysis (S22–S23) | duration analysis, activity-based costing, informal benchmarking (S24–S28) | outcome analysis, technology analysis, activity elimination (S29–S32) |
| **Potential business value** (S33) | Low–moderate | Moderate | High |
| **Project cost** (S33) | Low | Low–moderate | High |
| **Breadth of analysis** (S33) | Narrow | Narrow–moderate | Very broad |
| **Risk** (S33) | Low–moderate | Low–moderate | Very high |

Key sentence (S33): "No one technique is inherently better than the others, and in practice most projects use a combination of techniques."

### 4.4 The eight analysis techniques at a glance

| Technique | Strategy | What it examines | Phrase that gives it away | Ref |
|---|---|---|---|---|
| Problem analysis | BPA | problems with the as-is system and how to solve them in the to-be system | "asking the users and managers to identify problems" | S23 |
| Root cause analysis | BPA | whether a proposed solution fixes the root cause or only a symptom | "symptom … root cause" | S23 |
| Duration analysis | BPI | time of each step vs total time of the process | "time each of the individual steps" | S25–S26 |
| Activity-based costing | BPI | cost of each step; the most costly processes | "direct cost of labor and materials" | S27 |
| Informal benchmarking | BPI | how other organizations perform the process | "visit them as customers" | S28 |
| Outcome analysis | BPR | fundamental outcomes that provide value to customers | "sound as though they should be obvious, they often are not" | S30 |
| Technology analysis | BPR | how every technology on a list could be applied to the process | "list of important and interesting technologies" | S31 |
| Activity elimination | BPR | how each activity could be eliminated and what happens then | "force-fit exercise" | S32 |

### 4.5 Interview question types

| Type | Definition (slide) | Like which exam question? | Used when / designed to | Examples (S37) |
|---|---|---|---|---|
| **Closed-ended** | "those that require a specific answer" | multiple-choice or arithmetic | the analyst "is looking for specific, precise information (e.g., how many credit card requests are received per day)" | • How many telephone orders are received per day?<br>• How do customers place orders?<br>• What information is missing from the monthly sales report? |
| **Open-ended** | "those that leave room for elaboration on the part of the interviewee" | essay | "designed to gather rich information and give the interviewee more control over the information that is revealed during the interview" | • What do you think about the current system?<br>• What are some of the problems you face on a daily basis?<br>• What are some of the improvements you would like to see in a new system? |
| **Probing** | "follow up on what has just been discussed in order to learn more" | not given | "often are used when the interviewer is unclear about an interviewee’s answer"; they get the interviewee "to expand on or to confirm information from a previous response" and "signal that the interviewer is listening" | • Why?<br>• Can you give me an example?<br>• Can you explain that in a bit more detail? |

Rule (S39): "No type of question is better than another", and a combination is usually used.

### 4.6 Top-down vs bottom-up interviews

| | Top-down interview | Bottom-up interview |
|---|---|---|
| Starts with | "broad, general issues" | "very specific questions" |
| Moves toward | "more-specific ones" (gradually) | "broad questions" |
| On the S41 pyramid | apex → base: "How can order processing be improved?" → "How can we reduce the number of times that customers return items they’ve ordered?" → "How can we reduce the number of errors in order processing (e.g., shipping the wrong products)?" | base → apex: the same three questions in reverse order |
| **In practice** (S40) | analysts **mix** the two: start with broad, general issues, move to specific questions, then return to general issues | same |

### 4.7 Unstructured vs structured interviews

| | Unstructured | Structured |
|---|---|---|
| Stage | initial stage; as-is process unclear | later; business process much better understood |
| Information sought | broad and roughly defined | very specific (e.g., exactly how a customer credit card is approved) |
| Questions | few closed-ended; open-ended questions and probing on the fly | specific sets prepared before the interview; more closed-ended |
| Difficulty | "the most challenging interviews to conduct" | not described |

### 4.8 Traps collected from the slides
1. Accessing the system **through a Web browser** is **nonfunctional** (operational), even though it sounds like a feature (S13, S14).
2. "Monthly rankings of **salesperson performance**" is **functional**. The word "performance" there is about salespeople, not the system (S15 #10).
3. "Real-time inventory levels at all warehouses" is **functional, information-oriented** (S12). "Receive updated inventory information every 15 minutes" is **performance** (S14).
4. "Available 24 hours per day, 365 days per year" is **performance** (reliability), not operational (S14).
5. "Automatically back up at the end of each day" is filed under **operational** in the doctor's office sample (S16).
6. "How do customers place orders?" is listed as **closed-ended** (S37).
7. There are two "most commonly used" claims:
   - the **interview** is the most commonly used **gathering** technique (S35);
   - **problem analysis** is "probably the most commonly used" **analysis** technique (S23).
8. On S33, **BPA and BPI have the same risk** (Low–moderate). BPA's value is **Low–moderate**, and BPI's cost is **Low–moderate**.
9. Time spent on the as-is system: **BPA > BPI > BPR** (significant > much less > little) (S22, S24, S29).
10. **Structured** interviews have **more** closed-ended questions. **Unstructured** interviews are the **most challenging** (S39).
11. The interview report must be written **within 48 hours** (S44).
12. "Business requirements" means all analysis-phase requirements on **S9**, but only the top "why" level on the **S10** diagram.

---

## 5. Worked examples & class exercises (solved from slide content)

### Example 1 — Classify the 10 sales-system requirements [S15]
The slide gives no answer key. Each answer below is justified only with the S11–S14 definitions and examples. 🔎 Look up in Track B: whether the textbook publishes an official answer to this exercise.

| # | "The system should …" | Functional or Nonfunctional? | Type | Why (slide evidence) |
|---|---|---|---|---|
| 1 | be accessible to the Web users | **Nonfunctional** | Operational | S13: "The ability to access the system using a Web browser is considered a nonfunctional requirement." S14, Operational: "work on any Web browser". |
| 2 | include the company standard logo and color scheme | **Nonfunctional** | Cultural and political (closest S14 row; borderline) | It states how the system must look under a **company standard**. It is not a process the system performs or data it holds (S12). S14 has no "appearance" row. Company-policy items ("we buy computers only from Dell") and a user-interface item ("Country managers are permitted to authorize customer user interfaces") both sit under Cultural and political. Calling it a usability quality (S11) is also defensible. |
| 3 | restrict access to profitability information | **Nonfunctional** | Security | S14, Security: "Who has authorized access to the system under what circumstances". Compare "Only direct managers can see personnel records of staff." |
| 4 | include actual and budgeted cost information | **Functional** | Information-oriented | S12: "The system must include budgeted and actual sales and expense amounts …" |
| 5 | provide management reports | **Functional** | Process-oriented | A process the system must perform (S12). In the S16 sample, producing and printing a schedule is functional ("Produce Schedule … prints daily schedule"). |
| 6 | include sales information that is updated at least daily | **Nonfunctional** (mixed) | Performance | The point of the requirement is **how often the data is refreshed**, like S14's Performance example "receive updated inventory information every 15 minutes". The "include sales information" part alone would be functional, information-oriented (S12). S12 does file "real-time inventory levels" as functional, so give your reasoning in an answer. |
| 7 | have two-second maximum response time for predefined queries and ten-minute maximum response time for ad hoc queries | **Nonfunctional** | Performance | S14: "Any interaction between the user and the system should not exceed 2 seconds". S16: "in 2 seconds or less". |
| 8 | include information from all company subsidiaries | **Functional** | Information-oriented | Information the system must contain. Compare S12: "include real-time inventory levels at all warehouses". |
| 9 | print subsidiary reports in the primary language of the subsidiary | **Nonfunctional** | Cultural and political | Printing reports is a process, but this requirement is about the **local language**. That matches S14's cultural example "distinguish between United States and European currency". |
| 10 | provide monthly rankings of salesperson performance | **Functional** | Process-oriented | The system must compute and produce rankings, which is a process (S12). **Trap:** "performance" here means salespeople's performance, not system speed. |

**Result:**
- **Functional:** 4, 5, 8, 10.
- **Nonfunctional:** 1 (operational), 2 (cultural and political, borderline), 3 (security), 6 (performance, mixed), 7 (performance), 9 (cultural and political).

### Example 2 — Reading the requirements definition sample (doctor's office) [S16]
- Structure of the sample:
  - Two blocks: **Nonfunctional Requirements** and **Functional Requirements**.
  - Every item is numbered in outline form (1, 1.1, 1.2 …), as the S16 definition says ("in an outline format").
  - The nonfunctional block uses the four S14 categories, in S14's order:
    1. Operational
    2. Performance
    3. Security
    4. Cultural and Political. This one is empty but still listed: "No special cultural and political requirements are anticipated."
  - The functional block has one heading per process, each with short actor + action lines:
    1. Manage Appointments: Patient makes / changes / cancels appointment.
    2. Produce Schedule: Office Manager checks / prints daily schedule.
    3. Record Doctor Availability: Doctor updates schedule.
- Self-test pairs (same subject, different type):
  - "Only doctors can set their availability" (**Security**) vs "Doctor updates schedule" (**Functional**). One restricts who may act; the other is the action.
  - "Only a manager can produce a schedule" (**Security**) vs "Office Manager prints daily schedule" (**Functional**).
  - "The system will retrieve the daily appointment schedule in 2 seconds or less" (**Performance**) vs "Office Manager checks daily schedule" (**Functional**).

### Example 3 — Duration analysis: the home mortgage [S25–S26]
**Given (S26):**
- Average time for the bank to approve a mortgage: **30 days**.
- Timed basic steps: data entry, credit check, title search, appraisal. Their total is **≈ 8 hours**.

**Method (S25):**
1. Find the average total process time.
2. Time each step.
3. Total the step times.
4. Compare the step total with the overall time.

**Calculation:**

| View | Elapsed time | Work time | Ratio elapsed : work | Work share | Waiting (no one working) |
|---|---|---|---|---|---|
| Working days (8 h = "one day’s work") | 30 working days = 30 × 8 = 240 working hours | 8 h | 240 / 8 = **30 : 1** | 8 / 240 = 1/30 ≈ **3.3 %** | 232 working hours ≈ **96.7 %** |
| Clock hours (all 24 h of 30 calendar days) | 30 × 24 = **720 h** | 8 h | 720 / 8 = **90 : 1** | 8 / 720 ≈ **1.1 %** | 720 − 8 = **712 h** ≈ **98.9 %** |

- Checks: 30 × 8 = 240 ✓; 8/240 = 0.0333 ✓; 30 × 24 = 720 ✓; 8/720 = 0.0111 ✓; 712/720 = 0.9889 ✓.
- **Conclusion (slide):** "This is a strong indication that the overall process is badly broken, because it takes thirty days to perform one day’s work."
  - In plain words: the actual work is a tiny slice of the elapsed time.
  - Duration analysis is a **BPI** activity (S24), so finding a gap like this is the starting point for improving the process.
- The slide doesn't say whether the 30 days are calendar or working days. Both views give the same conclusion.

### Example 4 — Informal benchmarking: the car dealer website [S28]
- **Situation:** the team is developing a website for a car dealer. A website is a customer-facing process, and S28 says informal benchmarking is "fairly common" for exactly that kind of process.
- **Who:** the project sponsor, key managers and key team members.
- **What they study** (by visiting the websites, i.e. "as customers"):
  1. Competitors' websites.
  2. Other car-industry websites: manufacturers and accessories suppliers.
  3. Award-winning websites from **other industries**.
- **Why:** to learn "how your organization can do something better". Benchmarking brings in "ideas that employees may never have considered but that have the potential to add value".
- **Strategy:** BPI (S24). Copying "what competitors are doing" is one of BPI's stated aims.

### Example 5 — Activity-based costing, as a procedure [S27]
(The slide has no numeric example. These are the steps it describes.)
1. Identify the costs of each basic functional step or process.
   - **Direct costs:** materials, plus labor = **time spent on the input × hourly cost of the staff**.
   - **Indirect costs** (rent, depreciation, …) can also be included.
2. Identify the **most costly** processes.
3. Focus improvement efforts on those processes.

### Example 6 — Reading the interview schedule [S36]

| Interviewee | Level | Purpose | Length |
|---|---|---|---|
| Andria McClellan, Director, Accounting | top management | Strategic vision for new accounting system | 8:00–10:00 AM = **2 h** |
| Jennifer Draper, Manager, Accounts Receivable | management | Current problems with AR process; future goals | 2:00–3:15 PM = **1 h 15 min** |
| Mark Goodin, Manager, Accounts Payable | management | Current problems with AP process; future goals | 4:00–5:15 PM = **1 h 15 min** |
| Anne Asher, Supervisor, Data Entry | staff (supervises the work) | Accounts receivable and payable processes | 10:00–11:00 AM = **1 h** |
| Fernando Merce, Data Entry Clerk | staff (performs the work) | Accounts receivable and payable processes | 1:00–3:00 PM = **2 h** |

- Totals:
  - Monday, March 1: 2 + 1.25 + 1.25 = **4.5 h** (the director and the two managers).
  - Wednesday, March 3: 1 + 2 = **3 h** (the data-entry supervisor and the clerk).
  - Overall: **7.5 h** of interviews.
- (AR and AP in the table stand for the slide's "accounts receivable" and "accounts payable".)
- The schedule has the three parts S36 asks for: "all the people who will be interviewed, when, and for what purpose".
- It includes "both managers who manage the processes and staff who actually perform the processes", which gives "both high-level and low-level perspectives".

### Example 7 — Ordering the S41 questions [S40–S41]
- **H** = "How can order processing be improved?" (high-level, very general)
- **M** = "How can we reduce the number of times that customers return items they’ve ordered?" (medium-level, moderately specific)
- **L** = "How can we reduce the number of errors in order processing (e.g., shipping the wrong products)?" (low-level, very specific)

| Approach | Order |
|---|---|
| Top-down | H → M → L |
| Bottom-up | L → M → H |
| In practice (S40) | H → M → L → back to general issues |

- Observation (mine, applying the S37–S38 definitions): all three questions leave room for elaboration, so all three are **open-ended**, even L, which is very specific.
- So **how specific** a question is (top-down / bottom-up) and **what type** it is (closed / open / probing) are two separate things.

### Example 8 — From interview notes to requirements [S45 → S23 → S11–S16]
(Practice applying slide categories. The slide itself doesn't classify these.)
- **Problem analysis input (S23):** the notes record the "Two biggest problems with the current system": data too old, and data of poor quality. These are problems with the **as-is** system, named by a manager.
- **Root cause idea (S23):** the open item "Schedule interview with Jim Wack … regarding the reasons for data quality problems" looks for the **cause**, not just the symptom.
- **Candidate to-be requirements:**
  - "the HR Department needs information within two days of month end" is a timing requirement. The closest S14 category is **Performance**, like "receive updated inventory information every 15 minutes".
  - "incorrect job level information and missing salary information" points to correct job-level and salary data being held. That is **Functional, information-oriented**, like S12 "The system must retain / include …".
- **The flow these slides describe:** interview (S35–S44) → interview report (S44–S45) → analysis (S21–S23) → requirements definition (S16, S19).

---

## 6. Likely exam questions (built only from these slides)

**Q1. Classify (slide examples).** For each requirement, say **Functional** (process-oriented or information-oriented) or **Nonfunctional** (operational, performance, security, or cultural and political).
- a) "The system must check incoming customer orders for inventory availability."
- b) "Customers can see their order history only during business hours."
- c) "The system should be able to integrate with the existing inventory system."
- d) "The system must include real-time inventory levels at all warehouses."
- e) "The system should be available for use 24 hours per day, 365 days per year."
- f) "The system shall comply with insurance industry standards."
- g) "The system should automatically back up at the end of each day."
- h) "Office Manager prints daily schedule."

**Q2. Classify (the S15 sales system).** Say whether each item is functional or nonfunctional, and give its type.
- (a) include the company standard logo and color scheme
- (b) restrict access to profitability information
- (c) have two-second maximum response time for predefined queries and ten-minute maximum response time for ad hoc queries
- (d) print subsidiary reports in the primary language of the subsidiary
- (e) provide monthly rankings of salesperson performance
- (f) include actual and budgeted cost information

**Q3. MCQ.** According to the slides, which of these is a **nonfunctional** requirement?
- A. The system must retain customer order history for three years.
- B. The ability to access the system using a Web browser.
- C. The system should allow students to view a course schedule while registering for classes.
- D. Patient cancels appointment.

**Q4. MCQ.** Requirements written in design from the developer's perspective are usually called:
- A. business requirements
- B. user requirements
- C. system requirements
- D. stakeholder requirements

**Q5. Project or product?** Label each item as a project requirement or a product requirement.
- a) Staff training needs.
- b) Service Level Agreement (SLA) with customers, e.g. warranty service.
- c) "The system must allow registered customers to review their own order history for the past three years."
- d) Procedures for migrating from the old system to the new one.
- e) Infrastructure changes required for the software operating environment.

**Q6. Short answer.**
- (a) Define the requirements definition report and state its format.
- (b) What other name does S6 give the same document, and what does it include?

**Q7. Which strategy? (case)** A hospital wants to keep its patient-admission process exactly as it is, but have a computer do some of the paperwork. The budget is small and management wants low risk. Which strategy fits? How much time do planners of this strategy spend on the as-is system?

**Q8. Which strategy? (case)** A retailer sees that competitors let customers track orders online. Management wants **moderate** changes to copy this and take advantage of the new technology. Which strategy fits, and which three activities are popular for it?

**Q9. Which strategy? (case)** A new CEO says: "Forget how we do things now. We must reinvent the business around new ideas and new technology." She accepts high cost and very high risk for high potential business value. Which strategy fits? Name its three popular activities.

**Q10. Match the technique to its strategy.** For each description, name the technique and say whether it belongs to BPA, BPI or BPR.
- a) Ask users and managers to identify problems with the as-is system and describe how to solve them in the to-be system.
- b) Identify the cost of each step, find the most costly processes, and focus improvement there.
- c) Develop a list of important and interesting technologies, then identify how every technology could be applied to the business process.
- d) Managers visit other organizations as customers to watch how the business process is performed.
- e) A force-fit exercise in which each activity must be eliminated in turn.
- f) Check whether proposed solutions address a symptom rather than the true problem.
- g) Understand the fundamental outcomes that provide value to customers.
- h) Time each step and compare the total with the time for the overall process.

**Q11. Duration analysis (slide numbers).** A bank takes on average **30 days** to approve a mortgage. The timed steps (data entry, credit check, title search, appraisal) add up to about **8 hours**.
- (a) Which technique is this, and which strategy does it belong to?
- (b) Compute the ratio of elapsed time to work time, and the share of elapsed time that is real work. State your assumption.
- (c) What does the analyst conclude?

**Q12. Duration analysis (practice numbers).** The numbers are invented for drill; the method is from S25.
- An insurance claim takes on average **5 working days** (8-hour days) from receipt to payment.
- The timed steps are: data entry 0.5 h, verification 1 h, assessment 1.5 h, payment approval 1 h.
- Apply duration analysis and interpret the result.

**Q13. Table recall.**
- (a) Fill in the S33 table: potential business value, project cost, breadth of analysis and risk for BPA, BPI and BPR.
- (b) Which two strategies share the same risk rating?

**Q14. MCQ.** On the slides, "effectiveness" means:
- A. doing things right
- B. doing the right things
- C. doing things at the lowest cost
- D. doing things faster

**Q15. Question types.** Label each interview question as closed-ended, open-ended or probing.
- a) "How many telephone orders are received per day?"
- b) "What are some of the improvements you would like to see in a new system?"
- c) "Can you explain that in a bit more detail?"
- d) "How do customers place orders?"
- e) "What do you think about the current system?"
- f) "Why?"
- g) "What information is missing from the monthly sales report?"

**Q16. Top-down and bottom-up.**
- (a) Put these questions in **top-down** order:
  - (i) "How can we reduce the number of errors in order processing (e.g., shipping the wrong products)?"
  - (ii) "How can order processing be improved?"
  - (iii) "How can we reduce the number of times that customers return items they’ve ordered?"
- (b) Describe a bottom-up interview.
- (c) How do analysts organize questions in practice?

**Q17. Unstructured vs structured.** At the initial stage of an IS development project, the as-is process is unclear.
- (a) Which kind of interview is used?
- (b) Why is it the most challenging kind to conduct?
- (c) Which kind contains more closed-ended questions, and when is it used?

**Q18. The interview process.**
- (a) List the five basic steps of the interview process in order.
- (b) What does the first step produce, and what three things does it list?
- (c) Why should both managers and staff be interviewed?

**Q19. Preparing, conducting and following up.**
- (a) What is the first goal when starting an interview?
- (b) Give three things the interviewer should do to prepare.
- (c) Within how many hours should the interview report be written, and why?
- (d) What is often done with the report afterwards?

**Q20. Mixed short answers.**
- (a) Complete the equation: System proposal = ___ + ___ + ___ + ___.
- (b) Name the four real-world problems with requirements determination.
- (c) Besides collecting information, what does the requirements-gathering process build?

### Answers

**A1.**
- a) Functional, process-oriented [S12].
- b) Nonfunctional, security [S14].
- c) Nonfunctional, operational [S14].
- d) Functional, information-oriented [S12]. "Real-time" does not make it a performance requirement on the slide.
- e) Nonfunctional, performance (reliability) [S14].
- f) Nonfunctional, cultural and political (legal) [S14].
- g) Nonfunctional, operational. It is listed under "Operational Requirements" in the doctor's office sample [S16, item 1.3].
- h) Functional, under "Produce Schedule" [S16, item 2.2].

**A2.**
- (a) Nonfunctional. The closest S14 type is cultural and political, because it is a company standard, but it is borderline; "usability" is also defensible [S11, S14, S15].
- (b) Nonfunctional, security [S14].
- (c) Nonfunctional, performance [S14].
- (d) Nonfunctional, cultural and political [S14].
- (e) Functional, process-oriented. "Performance" here means the salespeople's performance, which is the trap [S12, S15].
- (f) Functional, information-oriented [S12].
- The full ten-item table is in §5, Example 1.

**A3.** **B.** "The ability to access the system using a Web browser is considered a nonfunctional requirement" [S13].
- A is functional, information-oriented [S12].
- C is functional, process-oriented [S12].
- D is functional [S16].

**A4.** **C**, system requirements [S9].

**A5.**
- a) project
- b) project
- c) product (a functional, process-oriented requirement)
- d) project
- e) project

Refs: [S4, S5, S12].

**A6.**
- (a) It is "a straightforward text report that simply lists the functional and nonfunctional requirements in an outline format" [S16]. S7 also calls it "a document that lists the new system’s capabilities".
- (b) S6 calls it the **product requirements document (PRD)**. A PRD "defines the requirements of a particular product, including the product’s purpose, features, functionality, and behavior". It "serves as a guide for business and technical teams". Its picture lists four blocks: goals, business objectives and strategic fit → user stories → user design and interactions → questions, clarifications and scope [S6].

**A7.** **BPA.**
- It "leaves the basic way the organization operates unchanged and uses computer technology to do some of the work" [S22].
- S33 rates it low cost and low–moderate risk.
- Planners spend "a significant time" understanding the as-is system [S22].

**A8.** **BPI.** It makes "moderate changes … to take advantage of new opportunities offered by technology or to copy what competitors are doing". Its popular activities are duration analysis, activity-based costing and informal benchmarking [S24].

**A9.** **BPR.**
- It means "changing the fundamental way the organization operates, obliterating the current way of doing business" [S29].
- S33 rates it high value, high cost and very high risk.
- Its activities are outcome analysis, technology analysis and activity elimination [S29].

**A10.**
- a) problem analysis, BPA [S23]
- b) activity-based costing, BPI [S27]
- c) technology analysis, BPR [S31]
- d) informal benchmarking, BPI [S28]
- e) activity elimination, BPR [S32]
- f) root cause analysis, BPA [S23]
- g) outcome analysis, BPR [S30]
- h) duration analysis, BPI [S25]

**A11.**
- (a) Duration analysis, a **BPI** activity [S24–S25].
- (b) Two ways to count:
  - Take 8 h as one working day ("one day’s work"). Then 30 days ÷ 1 day = **30 : 1**, and work is 1/30 ≈ **3.3 %** of the elapsed time.
  - Count every clock hour instead. Then 720 h ÷ 8 h = **90 : 1**, and work is ≈ **1.1 %**.
- (c) "a strong indication that the overall process is badly broken, because it takes thirty days to perform one day’s work" [S26]. Full working in §5, Example 3.

**A12.** (Practice numbers.)
- Step total = 0.5 + 1 + 1.5 + 1 = **4 h**.
- Elapsed time = 5 × 8 = **40 working hours**.
- Ratio = 40 : 4 = **10 : 1**. Work share = 4/40 = **10 %**, so 36 h (**90 %**) pass with nobody working on the claim.
- Interpretation, following S25–S26: the step total is far below the overall time. That strongly indicates the process is broken, which makes it a target for BPI improvement.

**A13.**
- (a)

| | BPA | BPI | BPR |
|---|---|---|---|
| Potential business value | Low–moderate | Moderate | High |
| Project cost | Low | Low–moderate | High |
| Breadth of analysis | Narrow | Narrow–moderate | Very broad |
| Risk | Low–moderate | Low–moderate | Very high |

- (b) **BPA and BPI**, both Low–moderate [S33].

**A14.** **B.** Effectiveness = "doing the right things"; efficiency = "doing things right" [S24].

**A15.**
- a) closed-ended
- b) open-ended
- c) probing
- d) **closed-ended**, as listed on the slide (the trap)
- e) open-ended
- f) probing
- g) **closed-ended**, as listed on the slide

Ref: [S37].

**A16.**
- (a) (ii) → (iii) → (i), i.e. high-level → medium-level → low-level [S41].
- (b) A bottom-up interview "starts with very specific questions and moves to broad questions" [S40].
- (c) Analysts mix the two, "starting with broad, general issues, moving to specific questions, and then returning to general issues" [S40].

**A17.**
- (a) **Unstructured** interviews, which "seek broad and roughly defined information" [S39].
- (b) The interviewer "has few closed-ended questions to ask" and must "ask open-ended questions and probe for important information on the fly" [S39].
- (c) **Structured** interviews have more closed-ended questions. They are used later, "as the project progresses", when very specific information is needed (e.g. "exactly how a customer credit card is approved"). Their questions are "developed before the interviews" [S39].

**A18.**
- (a) Selecting interviewees → designing interview questions → preparing for the interview → conducting the interview → post-interview follow-up [S35].
- (b) An **interview schedule**, which lists "all the people who will be interviewed, when, and for what purpose" [S36].
- (c) "People at different levels of the organization have different perspectives on the system". Managers manage the processes and staff actually perform them, so together they give "both high-level and low-level perspectives on an issue" [S36].

**A19.**
- (a) To **build rapport**, so that the interviewee "trusts the interviewer and is willing to tell the whole truth" [S43].
- (b) Any three of these [S42]:
  - have a general interview plan with the questions in the appropriate order;
  - anticipate possible answers and plan follow-ups to them;
  - identify segues between related topics;
  - confirm the areas in which the interviewee has knowledge;
  - decide which items have the greatest priority in case time runs short.
- (c) **Within 48 hours**, "because the longer the interviewer waits, the more likely he or she is to forget information" [S44].
- (d) It is sent to the interviewee "with a request to read it and inform the analyst of clarifications or updates" [S44]. The header "Interview Notes Approved by: Linda Estey" on S45 shows this in practice.

**A20.**
- (a) Requirements definition + Models + Feasibility analysis + Workplan [S2].
- (b) The four problems [S20]:
  1. The analyst may not have access to the correct set of users.
  2. The specification of the requirements may be inadequate, especially with the lightweight techniques of agile methodologies.
  3. Some requirements are unknowable at the beginning.
  4. Verifying and validating requirements can be very difficult.
- (c) "political support for the project", and "trust and rapport" between the project team and the users [S34].

---

## 7. Self-check — "I can…"
- [ ] I can write the analysis-phase equation for the system proposal and say who receives the proposal next [S2–S3].
- [ ] I can explain project vs product requirements (who defines them and what they focus on), and list at least five of the eight project requirements [S4–S5].
- [ ] I can define a requirement, a PRD and the requirements definition report, and lay out a requirements definition in outline format like the doctor's office sample [S6, S11, S16].
- [ ] I can tell business (user) requirements from system requirements by phase, perspective and focus [S9].
- [ ] I can classify any requirement as functional (process- or information-oriented) or nonfunctional (operational, performance, security, cultural and political), including all ten sales-system items and the traps [S11–S15].
- [ ] I can explain BPA, BPI and BPR: how much change each brings, how much time each spends on the as-is system, and its techniques, with a one-line definition of each of the eight [S18, S21–S32].
- [ ] I can reproduce the S33 table (value, cost, breadth, risk) from memory and use it to pick a strategy for a case [S33].
- [ ] I can work through and interpret a duration analysis such as the 30-day / 8-hour mortgage, and explain how activity-based costing assigns costs [S25–S27].
- [ ] I can name the five requirements-gathering techniques and say why gathering also builds political support, trust and rapport [S19, S34].
- [ ] I can walk through the five interview steps [S35–S45]:
  - the interview schedule;
  - closed-ended, open-ended and probing questions, with examples;
  - top-down vs bottom-up;
  - unstructured vs structured;
  - preparing;
  - conducting (rapport, careful notes);
  - the interview report within 48 hours.
