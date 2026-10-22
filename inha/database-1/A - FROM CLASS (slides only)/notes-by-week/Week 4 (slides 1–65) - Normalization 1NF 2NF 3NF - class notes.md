# Week 4 (slides 1–65) — Normalization: 1NF, 2NF, 3NF (CLASS NOTES — from slides only)
> Source: W4L1L2 [LAB2].pdf, 65 slides. [S#] = the "n / 65" footer number.
> Deck code on the slides: **W4.L1L2[LAB#2]**. Quiz #2 (Fri 23 Oct 2026) covers weeks 2–5; the midterm (week 8) covers weeks 1–7.
>
> **How to read these notes**
> - `<u>Attr</u>` = attribute underlined on the slide (primary key). The PK is also written out in words every time.
> - FDs are written `X → Y`. In the slide FD diagrams, a line starts under the determinant X and has arrowheads under each dependent attribute in Y.
> - ⭐ = professor emphasis (red/blue/yellow box, "NB", "Note", "REMARK", callouts, "cf. Reference eBook …").
> - ⚠️ = apparent slide typo or inconsistency (the original is kept and a correction is suggested from slide logic).
> - 🔎 = not explained on the slides. Look it up in Track B (outside research). Nothing from outside the slides is added here.
> - "cf. Reference eBook" on the slides = the course reference book (Elmasri & Navathe). Page and figure numbers are copied exactly as printed.

---

## 1. Big picture

- **What the week is about.** Week 4 is "Database Design: Normalization", *"or: How to **systematically improve** logical schema design"* [S2, S9]. It starts from the **Company DB E-R diagram** of week 3 [S7] and ends with that DB's **3NF-normalized logical schema**, drawn twice: tagged with (min, max) [S59] and in "Crow's Foot" notation [S60].
- **Why normalize.** Good data design has two goals: **information preservation** and **minimum redundancy** [S10]. Schemas are judged by four quality measures: clear semantics, redundant information and anomalies, NULL values, and spurious tuples [S11, S20]. The aim of normalization is minimal redundancy and minimal insertion/deletion/update anomalies [S19].
- **The tool: functional dependencies.** An FD X → Y says that equal X-values force equal Y-values [S14]. FDs express constraints that primary keys (superkeys) cannot express [S13 NB]. *"FDs + primary keys + tests of conditions for normal forms … drives the normalization process"* [S15].
- **The process.** Normalization (Codd, 1972) runs a relation through "tests" and **decomposes** it into relations of a higher normal form [S18]. A schema's normal form is the *highest* one it meets [S21]. After decomposition, the **lossless (non-additive) join** property is *extremely critical*. **Dependency preservation** is *desirable but sometimes sacrificed* [S22, S43, S56].
- **1NF** [S28–S32]: only **atomic, single** values, so no multivalued or composite (nested) attributes. There are three fixing techniques [S30].
- **2NF** [S35–S42]: every **nonprime** attribute is **fully** functionally dependent on the **primary key**. The fix is to eliminate *partial* dependencies.
- **3NF** [S46–S55]: 2NF plus no nonprime attribute **transitively** dependent on the PK (Codd). The general definition is: for every nontrivial X → A, X is a superkey or A is prime [S49, S52]. S57 is the one-table summary (test + remedy) for 1NF–3NF.
- **In practice** normalization goes up to 3NF/BCNF only. **De-normalization** (storing a join as a base relation) can be done for performance [S24–S25]. LAB #2 (normalization) was **in class only, no slides** [S63].

---

## 2. Slide-by-slide notes

### [S1] Title slide
- "Database (SOC-3020)", Alessandro Agostini (¹LDKR-Group, School of Computer and Information Engineering, Inha University in Tashkent (IUT), Uzbekistan; ²DISI, University of Trento, Italy). Emails: aagostini@inha.ac.kr, agostini@disi.unitn.it. "WEEK 4".
- Pictures: the IUT building, the LDKR logo and the IUT seal.

### [S2] Title: "Database Design: Normalization"
- Panorama photo of a historic town square. Text: "DATABASE — **Database Design: Normalization** — WEEK 4 — Code: W4.L1L2[LAB#2]".

### [S3] Outline
1 From Previous Week · 2 Example: Company DB · 3 Normalization Process · 4 First Normal Form – 1NF · 5 Second Normal Form – 2NF · 6 Third Normal Form – 3NF · 7 Example (cont'): Company DB · 8 LAB #2 : Normalization Process

### [S4] "Any question from you? …"
- This is the whole "From Previous Week" part. There is no recap content on the slides, only an open question to the class.

### [S5] Outline — item 2 "Example: Company DB" highlighted.

### [S6] Divider: "Example — **Company DB** Conceptual Design"

### [S7] Company DB: E-R diagram (header: "Example: Company DB | The E-R Model")
This is the conceptual design from week 3 that the deck normalizes later [S59–S60]. Red circled numbers ①–⑪ tie each piece to a numbered requirement sentence. The sentences are on **Week 3 [S93]** (also class material) and are copied below so the numbers can be read.

**Entity sets (boxes)**

| Entity | Attributes as drawn | Notes visible on the slide |
|---|---|---|
| **Employee** | <u>Ssn</u> ⑪, Bdate, Name (sub-items Fname, Lname indented), Address | Ssn underlined = key. Name is a **composite** attribute. |
| **Department** | <u>Name</u>, {Location}, Num_of_empl() | {Location} in braces = **multivalued**. Num_of_empl() with "()" = computed/derived. |
| **Project** | <u>Number</u>, Name, Location | |
| **Dependent** | Name ⑩ (dashed underline), Relationship | **Double-bordered box** = weak entity. Its Name has a **dashed** underline (partial key). |

**Relationships (diamonds) with (min,max) as printed** (each label is at the end of the line next to the entity it is written beside):

| Relationship | Connects | Label at the 1st end | Label at the 2nd end | Relationship attribute |
|---|---|---|---|---|
| supervision (recursive) | Employee–Employee; roles "supervisor" (upper line) and "supervisee" (lower line) | upper/supervisor side: (0,*) ③, with a "⇓" symbol | lower/supervisee side: (0,1) ③ | — |
| works_for / have (one diamond, two names) | Employee–Department | Employee side: (0,*) ① | Department side: (0,1) ② | — |
| manage | Employee–Department | Employee side: (0,1) ④ | Department side: (1,1) ⑤ | start_date |
| have (**double diamond**) | Employee–Dependent | Employee side: (0,*) ⑩ | Dependent side: (1,1) followed by an empty blue circle | — |
| works_on | Employee–Project | Employee side: (0,M) ⑥ | Project side: (1,N) ⑦ | hours |
| controls | Department–Project | Department side: (0,5) ⑧ | Project side: (1,1) ⑨ | — |

**The requirement sentences behind ①–⑪ (Week 3 [S93], verbatim):**
1. Each employee must work for at most one department.
2. A department must have at least one employee (working for it).
3. Employees can supervise other employees and be supervised by at most one employee.
4. An employee can manage at most one department, and start date is stored.
5. Every department must be managed, and by exactly one employee. The start date of managing is stored.
6. Every employee can work on a project a number of hours.
7. A project must have at least one employee working on it (for some hours).
8. A department can control many projects, but no more than five.
9. All projects are controlled by one and only department.
10. Employees can have dependents, weak entities identified by name.
11. Employees have a unique "social security number" (ssn), day of birth (Bdate), a composite name (with components: Fname for first name,...), address, salary, and gender.

- Reminder from Week 3 [S70] (class): this course's E-R diagrams use the **"Look-here" approach**: *"A minimum of 0 indicates partial participation. A minimum of 1 indicates total participation. A maximum of 1 indicates that the entity participates in at most one relationship. A maximum of * (or a letter) indicates that the entity participates in the relationship with no limits."* S7 reads that way for manage (④ ⑤), supervision, have, works_on and controls.
- ⚠️ **works_for labels on S7.** Read look-here, "(0,*) next to Employee" would mean an employee works for any number of departments, which contradicts ① ("at most one"). "(0,1) next to Department" would mean a department has at most one employee, which contradicts ② ("at least one"). The two labels look **swapped**, and the minimum for ② is also 0 instead of 1. The 3NF schema [S59] uses (1,*)/(1,1) for works_for instead (see the S59 note). Ask the professor which labels are intended.
- ⭐ The circled numbers are in red.

### [S8] Outline — item 3 "Normalization Process" highlighted.

### [S9] Divider: "Normalization Process — or: How to *systematically improve* logical schema design"
- ⭐ "*systematically improve*" is in red italics.

### [S10] Goals of "good" data design
- ⭐ The title words "good" (blue) and "data" (red) are colored. Both goals are in light-blue boxes.
- **Goal 1: Information preservation**: *"maintain all concepts, attributes, entity sets and relationship sets, generalization, specialization aggregation, etc. which are described at conceptual level (by an E-R/EE-R diagram)."*
- **Goal 2: Minimum redundancy**: *"minimize redundant storage and reduce the need for multiple updates to maintain consistency across multiple copies of the* same *information."*
- ⚠️ Minor: "specialization aggregation" is missing a comma ("specialization, aggregation").

### [S11] Informal Design Guidelines
- ⭐ **"Measures of quality for relation schemas"** (red, bold):
  - Clear semantics of the schema's attributes
  - Redundant information and anomalies
  - NULL values
  - Possibility to generate spurious tuples
- 🔎 Look up in Track B: what each guideline means in detail (the slide only lists them).

### [S12] Necessity of Normalization Theory
- *"So far we did not develop any measure of appropriateness or **goodness** to measure the quality of the design, other than the intuition of the designer."*
- *"Now we discuss some of the theory that has been developed to **measure formally** why one set of groupings of attributes into relation schemas is better than another."* (⭐ "goodness" and "measure formally" in red)
- *"Levels at which goodness of relation schemas can be discussed:"*
  - ⭐ (orange box) **Logical (*from Conceptual*) level : Meaning of schemas**. *"Measure of meaning is a degree of schema's **normalization**"*.
  - **Implementation level : Physical storage of schemas**. *"Measure is Transaction Processing performance"*.

### [S13] Functional Dependency Theory
- *"Formal tool for analysis of relational schemas."*
- (blue box) *"Enables us to detect, describe and reduce some of the problems mentioned, i.e., • anomalies that cause redundant data and updates; • waste of storage space due to NULLs; • generation of invalid and spurious data — in precise (formal) terms."*
- ⭐ (yellow box, underlined, "NB" in red) **"NB: The concept of functional dependency allows us to express *constraints on a schema* that we cannot express by using primary keys (superkeys)."**

### [S14] Functional Dependency
- (blue box) *"A functional dependency (FD) defines a constraint between two sets of attributes in a relation schema."*
- ⭐ **Definition.** *"A functional dependency on a relation schema r between two sets X and Y of attributes of r, denoted by X → Y, is a constraint on the possible tuples that can form an instance of r. The constraint is that, for every two tuples t₁ and t₂ in an instance of r, if t₁[X] = t₂[X], then it must also be t₁[Y] = t₂[Y]."* (cf. Reference eBook, p. 514)
- **Def:** *"A functional dependency X → Y is **trivial** if Y ⊆ X."*
- **Def:** *"A relation schema r's instances that satisfy the FDs among the relation's attributes are called **legal relation instances** (or: legal extensions) of r."*

### [S15] Normalization
- *"We are now ready to use FDs to specify some aspects of the semantics of relation schemas."*
- *"We assume that a set of FDs is given for each relation, and that each relation has a designated primary key;"*
- ⭐ (blue box) *"FDs + primary keys + **tests of conditions for normal forms** (see next) drives the **normalization process** of relational schema design."*

### [S16] Step back to FDT — Motivation
- (blue box) *"To fix/clarify the **semantics of the attributes** of a logical schema R ("R" for Relation, or Table), the **designer can employ FDT to define some more constrains on the schema**, i.e., the **functional dependencies** on R."* (FDT = Functional Dependency Theory [S13]).
- ⚠️ "constrains" should read "constraints".

### [S17] Example: Update Anomalies
- *"Consider two schemas (cf. Reference eBook, Fig 15.3, p. 506.):"*
- **(a) EMP_DEPT**(Ename, <u>Ssn</u>, Bdate, Address, Dnumber, Dname, Dmgr_ssn). PK = Ssn.
  - FD1: Ssn → {Ename, Bdate, Address, Dnumber}
  - FD2: Dnumber → {Dname, Dmgr_ssn}
- **(b) EMP_PROJ**(<u>Ssn</u>, <u>Pnumber</u>, Hours, Ename, Pname, Plocation). PK = {Ssn, Pnumber}.
  - FD1: {Ssn, Pnumber} → Hours
  - FD2: Ssn → Ename
  - FD3: Pnumber → {Pname, Plocation}
- The slide shows only the two schemas and their FD diagrams. It does not spell out the anomalies.
- Logic from the slide's own FDs: in EMP_DEPT, Dname and Dmgr_ssn are fixed by Dnumber, not by the key Ssn. The same department facts are therefore stored again in every row of an employee of that department, which is S10's "multiple copies of the same information". EMP_PROJ is similar: Ename depends on Ssn alone, and Pname/Plocation on Pnumber alone. These two schemas are the running examples for 3NF [S47–S50] and 2NF [S36–S42].
- 🔎 Look up in Track B: concrete insertion / deletion / modification anomaly examples for these two schemas.

### [S18] Normalization (cont.)
- *"The **normalization process** (Codd, 1972), takes a relation schema through a series of "tests" to* certify *whether it satisfies a certain "normal form"."*
  - *"the process proceeds in a top-down fashion and suggest how decomposition of schema into new schemas of higher normal form (i.e, higher design quality)."*
- ⭐ (blue box) *"Codd proposed three normal forms, which he called first (1NF; 1970), second and third (2NF, 3NF; 1971) normal form."*
- *"A stronger definition of 3NF—called Boyce-Codd normal form (BCNF)—was proposed by Boyce and Codd in 1974."*
- Dates to remember: **1NF 1970 · 2NF & 3NF 1971 · normalization process 1972 · BCNF 1974**.
- ⚠️ Minor grammar: "suggest how decomposition …" means "suggests how to decompose …"; "i.e," should be "i.e.,".
- 🔎 Look up in Track B: BCNF (only named here).

### [S19] Aim of Normalization
- *"The aim of **normalization of data** by the* normalization process *is to achieve the desirable properties, in particular, of: (1) minimal redundancy, and (2) minimal issues with insertion, deletion, and update anomalies discussed previously (W12)."*
- ⭐ (blue box) *"Normalization process can be considered as a "filtering" or "purification" process to make the design have successively better quality."*
- ⚠️ "(W12)": this is week 4, so a week-12 reference looks like a leftover from another course ordering. Within this deck the anomaly example is [S17].

### [S20] Reminder: Design Guidelines
- The same list as [S11]: ⭐ **"Measures of quality** for relation schemas: Clear semantics of the schema's attributes; Redundant information and anomalies; NULL values; Possibility to generate spurious tuples".

### [S21] Normal Form — Definition
- ⭐ (yellow box) **Definition.** *"The **normal form of a relation schema** refers to the* highest normal form *condition that it meets, and hence indicates the degree to which it has been normalized."* (cf. Reference eBook, p. 517)
- Consequence: a schema that passes the 1NF and 2NF tests but fails 3NF "is in 2NF".

### [S22] Normalization: What we look at
- *"Properties that the relational schemas should have __after the normalization process__ are:"*
  - **Non-additive (lossless) join property** (blue): *"guarantees that the spurious tuple generation problem does not occur with respect to the relation schemas created after decomposition by normalization."* **"Extremely critical"**
  - **Dependency preservation property** (blue): *"ensures that each functional dependency is represented in some individual relation resulting after decomposition."* **"Desirable but sometimes sacrificed for other factors"**
- Repeated on [S43] and [S56] (there the dependency-preservation block is in a ⭐ yellow box).

### [S23] Reminder: Lossy Decomposition
- Original table **employee**(<u>ID</u>, name, street, city, salary). Rows shown (with ⋮ above and below):

| ID | name | street | city | salary |
|---|---|---|---|---|
| 57766 | Kim | Main | Perryridge | 75000 |
| 98776 | Kim | North | Hampton | 67000 |

- It is split into two tables. Arrows go down from employee, and "name" is **boxed in red in both**:
  - (<u>ID</u>, name): 57766 Kim · 98776 Kim
  - (name, street, city, salary): Kim Main Perryridge 75000 · Kim North Hampton 67000. The note "**ignore PK**" is written next to it.
- These two are then put back by **natural join** (the label "natural join" has arrows from both tables). Result (also marked "ignore PK"):

| ID | name | street | city | salary |
|---|---|---|---|---|
| 57766 | Kim | Main | Perryridge | 75000 |
| **57766** | **Kim** | **North** | **Hampton** | **67000** ← blue box |
| **98776** | **Kim** | **Main** | **Perryridge** | **75000** ← blue box |
| 98776 | Kim | North | Hampton | 67000 |

- ⭐ A red box surrounds the decomposition step. A red line separates it from the join result.
- Logic of the slide: the two blue-boxed rows were **not** in the original table. The decomposition shares only "name", and two employees are both called Kim, so the join pairs each ID with both addresses. The join gives back more tuples than were stored and the original data cannot be recovered. This is the "spurious tuple generation problem" that the lossless-join property of [S22] must prevent.
- 🔎 Look up in Track B: the formal test for a lossless (non-additive) join.

### [S24] Practical use of Normal Forms
- *"Normalization carried out in practice:"*
  - *"Resulting designs are of high quality and meet the desirable properties stated previously."*
  - *"Pays particular attention to normalization __only up to 3NF and BCNF__ (or, at most, 4NF — we don't see it)."*
- ⭐ **"NB: Do not need to normalize to the highest possible normal form for performance reasons."**
- ⭐ (yellow box) **Definition.** *"The **de-normalization** is the process of storing the join of higher normal form relations as a base relation, which is in a lower normal form."* (cf. Reference eBook, p. 518)
- 🔎 Look up in Track B: 4NF (explicitly "we don't see it").

### [S25] Example: De-normalization (textbook-style slide with a sailboat icon)
- *"Define FD {dept_name} → {building, budget} on table:"*
- Header boxes: **red** around *ID, name, salary* and **blue** around *dept_name, building, budget*. **ID is not underlined here.**

| ID | name | salary | dept_name | building | budget |
|---|---|---|---|---|---|
| 22222 | Einstein | 95000 | Physics | Watson | 70000 |
| 12121 | Wu | 90000 | Finance | Painter | 120000 |
| 32343 | El Said | 60000 | History | Painter | 50000 |
| 45565 | Katz | 75000 | Comp. Sci. | Taylor | 100000 |
| 98345 | Kim | 80000 | Elec. Eng. | Taylor | 85000 |
| 76766 | Crick | 72000 | Biology | Watson | 90000 |
| 10101 | Srinivasan | 65000 | Comp. Sci. | Taylor | 100000 |
| 58583 | Califieri | 62000 | History | Painter | 50000 |
| 83821 | Brandt | 92000 | Comp. Sci. | Taylor | 100000 |
| 15151 | Mozart | 40000 | Music | Packard | 80000 |
| 33456 | Gold | 87000 | Physics | Watson | 70000 |
| 76543 | Singh | 80000 | Finance | Painter | 120000 |

- ⭐ *"Observe: **instructor** (red) and **department** (blue) not separated."*
- Logic of the slide: the red part is instructor data and the blue part is department data. Storing them joined in one base table is de-normalization [S24]. Because of the FD, each department's building/budget is repeated for every instructor of that department (e.g. Comp. Sci./Taylor/100000 appears 3 times). The same table is reused for 3NF on [S48], [S51] and [S53].

### [S26] Outline — item 4 "First Normal Form – 1NF" highlighted.

### [S27] Divider: "Normalization Process (*cont.*) — *First Normal Form – 1NF* — or: Logical design of composite and multi-valued attributes"

### [S28] First Normal Form (1NF)
- (blue box) *"Now a part of the formal definition of a relation schema in the relational model; but historically defined to disallow **multivalued attributes** or **composite attributes**, and their combinations."*
- ⭐ *"It states that:"*
  - *"the **domain of an attribute must include only atomic** (simple, indivisible) **values** and"*
  - *"the value of any attribute in a tuple **must be a single value** from the domain of that attribute."*
- **1NF test (as taught):** every attribute value is atomic and single, so no sets (multivalued) and no nested or composite groups. S57 phrases it as "Relation should have no multivalued attributes or nested relations."

### [S29] Example (1NF violation)
- *"Consider the following relation schema:"* **DEPARTMENT**(Dname, <u>Dnumber</u>, Dmgr_ssn, Dlocations). PK = Dnumber. (cf. Reference eBook, Fig. 15.9)

| Dname | <u>Dnumber</u> | Dmgr_ssn | Dlocations |
|---|---|---|---|
| Research | 5 | 333445555 | {Bellaire, Sugarland, Houston} |
| Administration | 4 | 987654321 | {Stafford} |
| Headquarters | 1 | 888665555 | {Houston} |

- *"As you can see from the schema instance, the schema is __not__ in 1NF."*
- ⭐ *"Values of* Dlocations *are __not atomic__ (but sets)."* ("not atomic" red, underlined)

### [S30] First Normal Form (cont.): techniques
- *"Techniques to achieve first normal form:"*
  1. ⭐ **"Remove attribute and place in separate relation."** (in red, so this is the technique the slides then demonstrate [S31])
  2. *"Expand the primary key to include the attribute."*
  3. *"Use several atomic attributes (cf. eBook, p. 521)."*
- The slides show technique 1 on DEPARTMENT [S31] and technique 3 on a nested/composite attribute [S32]. The Company DB schema uses technique 1 for {Location} → D_Locations and technique 3 for Name → Name_Fname, Name_Lname [S59]. Techniques 2 and 3 applied to DEPARTMENT are worked out in §5.1 (marked as my application of the slide's technique).

### [S31] Example (technique 1 applied)
- *"Remove non-atomic attribute and place in a new, separate relation schema:"*
- Before: DEPARTMENT(Dname, <u>Dnumber</u>, Dmgr_ssn, Dlocations) with the set values of [S29].
- After:

**DEPARTMENT** (PK = Dnumber)

| Dname | <u>Dnumber</u> | Dmgr_ssn |
|---|---|---|
| Research | 5 | 333445555 |
| Administration | 4 | 987654321 |
| Headquarters | 1 | 888665555 |

**DEPT_LOCATIONS** (PK = {Dnumber, Dlocation}, both underlined)

| <u>Dnumber</u> | <u>Dlocation</u> |
|---|---|
| 1 | Houston |
| 4 | Stafford |
| 5 | Bellaire |
| 5 | Sugarland |
| 5 | Houston |

- ⭐ Red arrows point to both tables: **"these are in 1NF"**. (cf. Reference eBook, Fig. 15.2)
- Logic: the set attribute becomes its own relation, with one row per (department, location) pair. The new relation's key is the original key Dnumber **plus** the single-valued Dlocation. Dnumber links the rows back to DEPARTMENT.

### [S32] First Normal Form (cont.): composite / nested
- *"It does __not__ allow **composite attributes** (sometimes also called: **nested relations**)."*
- **Example:** table EMP_PROJ with columns Ssn | Ename | **Projs** (⭐ red box), where Projs spans the two sub-columns Pnumber | Hours. No underlines in this figure.
- Written as: **EMP_PROJ(Ssn, Ename, {PROJS(Pnumber, Hours)})**
- *"To change the schema into a 1NF:"* *"Remove nested relation attributes into new set of simple attributes: **Projs**-Pnumber, **Projs**-Hours."* ("Projs" in red)
- Logic: the nested group is flattened into simple, prefixed attributes (technique 3 of [S30]). The Company schema does the same with Name → Name_Fname, Name_Lname [S59].
- Note: S32 does not say what the key of the flattened EMP_PROJ is. The braces in {PROJS(…)} show a *set* of projects per employee, so one employee would need one row per project. That would require technique 2 ("Expand the primary key to include the attribute", e.g. key {Ssn, Projs-Pnumber}). This link between S30 and S32 is my reasoning, not stated on the slides. S57's 1NF remedy instead says "Form new relations for each multivalued attribute or nested relation" (technique 1).

### [S33] Outline — item 5 "Second Normal Form – 2NF" highlighted.

### [S34] Divider: "Normalization Process (*cont.*) — *Second Normal Form – 2NF* — or: Eliminate *Partial* Functional Dependencies on Primary Key"

### [S35] Second Normal Form (2NF): full vs partial FD
- *"Based on the "technical concept" of **full functional dependency** of attributes."* ("full" in blue, bold italics)
- ⭐ (blue box) **Definition.** *"A functional dependency X → Y is a **full functional dependency** if removal of any attribute A from X means that the dependency does not hold any more."*
- ⭐ **Definition.** *"A functional dependency X → Y is a **partial functional dependency** if some attribute A in X can be removed from X and the dependency still holds."* (cf. Reference eBook, p. 523)
- Consequence: full or partial only matters when X has **more than one** attribute. With a single-attribute X, removing it leaves nothing.

### [S36] Example (full vs partial)
- *"Consider the following relation schema:"* **EMP_PROJ**(<u>Ssn</u>, <u>Pnumber</u>, Hours, Ename, Pname, Plocation). PK = {Ssn, Pnumber}. (cf. Reference eBook, Fig. 15.3)
- FD diagram (same as [S17](b)):
  - FD1: {Ssn, Pnumber} → Hours. The line starts under **both** Ssn and Pnumber, with an arrow to Hours.
  - FD2: Ssn → Ename. The line starts under Ssn only.
  - FD3: Pnumber → {Pname, Plocation}. The line starts under Pnumber only.
- ⭐ *"FD1: {Ssn,Pnumber} → Hours* **full dependency** *(Ssn → Hours and Pnumber → Hours don't hold)."*
- ⭐ *"{Ssn,Pnumber} → Ename* **partial dependency** *because FD2: Ssn → Ename"*.

### [S37] Prime Attributes
- **"Prime vs nonprime attribute:"**
- ⭐ (blue box) **Definition.** *"An attribute of relation schema R is called a **prime attribute** of R if it is a member of some candidate\* key of R. An attribute is called **nonprime** if it is not a prime attribute—that is, if it is not a member of any candidate key."*
- ⭐ *"\* the definition is general. Here we only need it to be primary key."* (cf. Reference eBook, p. 519)
- So in this course, **prime = belongs to the primary key** and **nonprime = not part of the PK**.
- 🔎 Look up in Track B (or the earlier-week key notes): candidate key vs superkey vs primary key.

### [S38] Example (prime / nonprime)
- *"Consider the following relation schema:"* **WORKS_ON**(<u>Ssn</u>, <u>Pnumber</u>, Hours). A bracket under Ssn + Pnumber is labelled **"P.K."** (cf. Reference eBook, Fig. 15.1)
- *"Ssn and Pnumber are prime attributes of WORKS_ON, whereas Hours is nonprime."*

### [S39] Second Normal Form (cont.): definition
- ⭐ (blue box) **Definition (Codd, 1971).** *"A relation schema R is in second normal form (**2NF**) if __every__ nonprime attribute A in R is* fully functionally dependent *on the primary\* key of R."* (cf. Reference eBook, p. 523)
- ⭐ A red arrow labelled **"note this"** points at "primary\*".
- ⭐ **REMARK:** *"\* A more **general definition of 2NF** generalises it to "on every* candidate key*." (We don't need such generalization.)"*
- **2NF test (as taught):** (i) the relation is in 1NF, and (ii) for each **nonprime** attribute, check that it depends on the **whole** PK and not on a proper part of it. S57 adds that this matters only *"For relations where primary key contains multiple attributes"*.

### [S40] Example (not in 2NF)
- *"Consider the following relation schema R:"* EMP_PROJ, same schema and FD1–FD3 diagram as [S36] (cf. Reference eBook, Fig. 15.3).
- ⭐ Red arrows join the words "primary key" to the key columns Ssn/Pnumber and to "{Ssn,Pnumber}" in the next bullet.
- *"Note the primary key. Then, R is __not__ in 2NF:"*
  - *"{Ssn,Pnumber} → Ename* **partial** *dependency"*. *"FD2: Ssn → Ename holds. Also:"*
  - *"{Ssn,Pnumber} → Pname* **partial** *dependency"*. *"FD3: Pnumber → {Pname,Plocation} holds"*
- ⭐ "partial" is red and underlined; "dependency" is blue.

### [S41] Second Normal Form (cont.): how to 2NF-normalize
- *"If a relation schema is not in 2NF, it can be* 2NF-normalized *into a number of 2NF relations"*
- *"To do it, look at the FDs and __decompose__ the schema into components where nonprime attributes satisfy the 2NF condition."*
- *"In particular:"*
- ⭐ (yellow box) **"nonprime attributes must be associated only with the part of the primary key on which they are __fully__ functionally dependent."** ("fully" in red, bold, underlined)

### [S42] Normalization to 2NF
- **EMP_PROJ** ⭐ "**Not in 2NF**" (red): (<u>Ssn</u>, <u>Pnumber</u>, Hours, Ename, Pname, Plocation) with FD1, FD2, FD3 as in [S36].
- Decomposed into three relations, each labelled ⭐ "**In 2NF**" (red):

| Relation | Attributes (underlined = PK) | FD kept inside it |
|---|---|---|
| **EP1** | <u>Ssn</u>, <u>Pnumber</u>, Hours | FD1: {Ssn, Pnumber} → Hours |
| **EP2** | <u>Ssn</u>, Ename | FD2: Ssn → Ename |
| **EP3** | <u>Pnumber</u>, Pname, Plocation | FD3: Pnumber → {Pname, Plocation} |

- ⭐ *"In short: eliminate the partial dependencies on primary key of all nonprime attributes"* (cf. Reference eBook, Fig. 15.11)
- Logic: each part of the key that something depends on (Ssn alone, Pnumber alone) becomes the PK of its own relation, together with its dependents (EP2, EP3). One relation keeps the **original** key with the attributes fully dependent on it (EP1). This matches the 2NF remedy on [S57].

### [S43] Reminder on Normalization
- Same text as [S22]: *"Properties that the relational schemas should have __after the normalization process__ are:"* **Non-additive (lossless) join property** (… *"Extremely critical"*) and **Dependency preservation property** (… *"Desirable but sometimes sacrificed for other factors"*).
- ⭐ This time the **Dependency preservation** block is in a **yellow box**. It sits right after the 2NF decomposition: FD1, FD2 and FD3 each survive whole inside one of EP1, EP2, EP3 [S42].

### [S44] Outline — item 6 "Third Normal Form – 3NF" highlighted.

### [S45] Divider: "Normalization Process (*cont.*) — *Third Normal Form – 3NF* — or: Eliminate *Transitive* Functional Dependencies on Primary Key"

### [S46] Transitive Dependency
- *"Based on the "technical concept" of **transitive dependency** of attributes."*
- ⭐ (blue box) **Definition.** *"A functional dependency X → Y in a relation schema R is a **transitive dependency** if there exists a set of attributes Z in R that is neither a candidate\* key nor a subset of any\* key of R, and both X → Z and Z → Y hold."*
- ⭐ *"\* the definition is general. We only need it to be primary key."* (cf. Reference eBook, p. 523)
- Pattern to look for: **X → Z → Y**, where the "middle" Z is **not** (part of) the key.

### [S47] Example (transitive dependency)
- *"Consider the following relation schema:"* **EMP_DEPT**(Ename, <u>Ssn</u>, Bdate, Address, Dnumber, Dname, Dmgr_ssn). PK = Ssn. (cf. Reference eBook, Fig. 15.3)
- ⭐ Header boxes: **Ssn** red, **Dnumber** blue, **Dmgr_ssn** red.
- FD1: Ssn → {Ename, Bdate, Address, Dnumber}. The line starts under Ssn, and the stretch from Ssn to Dnumber is drawn **blue**.
- FD2: Dnumber → {Dname, Dmgr_ssn}. The line starts under Dnumber and is drawn **blue**.
- ⭐ *"{Ssn} → Dmgr_ssn is a **transitive dependency**:"*
  1. *"{Ssn} → Dmgr_ssn __inferred by Transitivity__;"* (Ssn → Dnumber by FD1, and Dnumber → Dmgr_ssn by FD2)
  2. *"Dnumber is __not__ a part of any primary key\*"*. *"\* more generally: any super key."*
- In S46's terms: X = Ssn, Z = Dnumber, Y = Dmgr_ssn. The same reasoning applies to Dname.
- 🔎 Look up in Track B: FD inference rules (the slide only names "Transitivity").

### [S48] Another Example (sailboat icon; same table as [S25])
- *"Suppose {dept_name} → {building, **budget**} on table:"* ("budget" in red)
- This time **ID is underlined (PK)**. Boxes: ID red, dept_name blue, budget red. The rows are the same 12 as [S25].
- ⭐ Yellow callout with a red arrow to budget: **"transitively dependent on ID (primary key)"**.
- *"Observe 1: primary key is ambiguous (incomplete)"*
- *"Observe 2: **dept_name** depends on ID (ID is PK)"* ("dept_name" in blue)
- Logic: ID → dept_name (because ID is the PK) and dept_name → budget (the given FD), so ID → budget goes *through* dept_name, which is not a key. That is a transitive dependency. The same holds for building.
- "Observe 1" is not explained further on the slides. Ask the professor what "ambiguous (incomplete)" refers to.

### [S49] Third Normal Form (3NF): definitions
- ⭐ (blue box) **Definition.** *"According to Codd's original definition, a relation schema R is in **3NF** if it satisfies 2NF* and *no nonprime attribute of R is* transitively dependent *on the primary key."* (cf. Reference eBook, p. 524)
- ⭐ (yellow box) **Definition (more general (\*) - we see it later).** *"A relation schema R is in **3NF** if, whenever a* nontrivial *functional dependency X→A holds in R, either (a) X is a superkey of R or (b) A is a prime attribute of R."* (cf. Reference eBook, p. 528)
- *"(\*) "more general" because it does* not *use the notion of 2NF."*
- **3NF tests (as taught):**
  - Codd: 2NF **and** no nonprime attribute is transitively dependent on the PK.
  - General: check **every nontrivial X → A**. It is fine only if X is a superkey **or** A is prime. If neither holds, the relation is not in 3NF.

### [S50] Example: Normalization to 3NF
- ⭐ "**Not in 3NF:**" (red) EMP_DEPT with FD1/FD2 as in [S47] (same red/blue boxes and blue lines).
- ⭐ Yellow callout with a red arrow to Dmgr_ssn: **"transitively dependent on Ssn (primary key)"**.
- Result, both labelled ⭐ "**In 3NF:**" (red):

| Relation | Attributes (underlined = PK) | FD |
|---|---|---|
| **ED1** | Ename, <u>Ssn</u>, Bdate, Address, Dnumber | FD1: Ssn → {Ename, Bdate, Address, Dnumber} |
| **ED2** | <u>Dnumber</u>, Dname, Dmgr_ssn | FD2: Dnumber → {Dname, Dmgr_ssn} |

- (cf. Reference eBook, Fig. 15.11)
- Logic: the "middle" attribute Dnumber becomes the PK of a new relation (ED2) together with what it determines. Dnumber also **stays** in ED1, so each employee still points to its department. The slide does not label it FK here; the Company schema [S59] writes such attributes with "(FK)".

### [S51] Another Example (sailboat; FD0)
- *"Suppose PK, FD1, and FD2 are defined on table:"* (<u>ID</u>, name, salary, dept_name, building, budget). Boxes: ID red, dept_name blue, budget red. No data rows on this slide.
  - FD1: ID → {name, salary}
  - FD2: dept_name → {building, budget} (blue lines)
  - **FD0:** ID → {name, salary, dept_name, building, budget}. The line starts under ID, and the stretch from ID to dept_name is **blue**.
- ⭐ Yellow callout with an arrow to budget: **"transitively dependent on ID (primary key)"**.
- *"Observe 1: primary key is ambiguous (incomplete)"*
- *"Observe 2: FD0 holds because of* ID *is PK."*
- Logic: the PK determines every attribute (FD0). The part ID → budget, however, is obtained through ID → dept_name (in FD0) and dept_name → budget (FD2). It is transitive, which is the same picture as [S47].
- ⚠️ Minor grammar: "because of ID is PK" means "because ID is PK".

### [S52] 3NF (*general definition*)
- *"Note: X → Y is* **trivial** *if Y ⊆ X."* ⭐ A red arrow runs from the word "nontrivial" in the definition up to "trivial" here.
- ⭐ (yellow box) **Definition (more general (\*)).** *"A relation schema R is in **3NF** if, whenever a* nontrivial *functional dependency X→A holds in R, either (a) X is a superkey of R or (b) A is a prime attribute of R."* (cf. Reference eBook, p. 528)
- *"(\*) because it does* not *use the notion of 2NF."*

### [S53] Example: 3NF (general definition) (sailboat; same 12-row table, ID underlined)
- *"Suppose {dept_name} → {building, **budget**} on table:"*
- ⭐ Boxes: dept_name blue, budget red. Yellow callouts with red arrows: **"not prime"** (to budget) and **"not (primary)key"** (to dept_name).
- *"Observe: {dept_name} → {building,budget}* non trivial*"*
- *"Observe:* **dept_name** *not PK and* **budget** *not prime"*
- Logic of the general test [S52]: X = {dept_name}, A = budget. The FD is nontrivial; (a) fails because dept_name is not the PK/superkey; (b) fails because budget is not prime. So the table is **not in 3NF**.

### [S54] Example: Normalization to 3NF (LOTS)
- ⭐ Heading: *"Not in 3NF (__but in__ **2NF**; not in __general__ 2NF because of FD3):"* ("2NF" red; "general … 2NF because of FD3" orange)
- **LOTS**(<u>Property_id#</u>, County_name, Lot#, Area, Price, Tax_rate). PK = Property_id# (⭐ red box). A bracket labelled **"Candidate Key"** spans **County_name + Lot#**. **Area** has a ⭐ blue box.
  - FD1: Property_id# → {County_name, Lot#, Area, Price, Tax_rate}
  - FD2: {County_name, Lot#} → {Property_id#, Area, Price, Tax_rate}
  - FD3: County_name → Tax_rate (drawn in **orange**)
  - FD4: Area → Price (drawn in **blue**)
- ⭐ A red arrow marked "(\*)" points at Property_id#: **"(\*) Note the single attribute"**. (cf. Reference eBook, Fig. 15.12)
- Logic, step by step:
  - **2NF w.r.t. the PK (Codd [S39]).** The PK is a *single* attribute, so no attribute can depend on a "part" of it. LOTS is in 2NF.
  - **General 2NF ("on every candidate key", [S39] remark).** County_name is *part* of the candidate key {County_name, Lot#}, and FD3 says Tax_rate depends on that part alone. That is a partial dependency, so LOTS is **not** in general 2NF.
  - **3NF.** FD4: Property_id# → Area → Price, and Area is not a key, so Price is transitively dependent on the PK. With the general test [S52]: for FD4, Area is not a superkey and Price is not prime; for FD3, County_name is not a superkey and Tax_rate is not prime. Both violate 3NF.

### [S55] Example (cont.) (LOTS decomposition)
- **Step 1: split off FD3.**
  - "LOTS1 not in 3NF (but in 2NF):" **LOTS1**(<u>Property_id#</u>, County_name, Lot#, Area, Price). Property_id# is in a red box, Area in a blue box.
    - FD1: Property_id# → {County_name, Lot#, Area, Price}. The stretch from Property_id# to Area is **blue**.
    - FD2: {County_name, Lot#} → {Property_id#, Area, Price}
    - FD4: Area → Price (blue)
  - "In 3NF (and 2NF):" **LOTS2**(<u>County_name</u>, Tax_rate). County_name is in a red box. FD3: County_name → Tax_rate.
- A dashed line is followed by ⭐ "**LOTS1** normalized to 3NF".
- **Step 2: split off FD4 from LOTS1.**
  - "In 3NF:" **LOTS1A**(<u>Property_id#</u>, County_name, Lot#, Area). FD1: Property_id# → {County_name, Lot#, Area}; FD2: {County_name, Lot#} → {Property_id#, Area}.
  - "In 3NF:" **LOTS1B**(<u>Area</u>, Price). FD4: Area → Price.
- (cf. Reference eBook, Fig. 15.12)
- **Final 3NF result:** LOTS1A, LOTS1B, LOTS2. Each FD lives whole in one relation: FD1 and FD2 (minus the moved attributes) in LOTS1A, FD3 in LOTS2, FD4 in LOTS1B. The determinants County_name and Area stay behind in LOTS1/LOTS1A as link attributes.

### [S56] 3NF Normalization: Remark
- ⭐ *"Normalization procedure to 3NF preserves the dependencies defined on the input schema."*
- *"Remember: __after the normalization process__, the resulting schema(s) satisfy these properties:"*
  - **Non-additive (lossless) join property**: *"guarantees that the spurious tuple generation problem does not occur with respect to the relation schemas created after decomposition by normalization."* *"Extremely critical"*
  - ⭐ (yellow box) **Dependency preservation property**: *"ensures that each functional dependency is represented in some individual relation resulting after decomposition."* *"Desirable but sometimes sacrificed for other factors"*
- 🔎 Look up in Track B: how to check dependency preservation formally.

### [S57] Summary of Normal Forms 1st to 3rd (cf. Reference eBook, p. 525)

| Normal Form | Test | Remedy (Normalization) |
|---|---|---|
| **First (1NF)** | Relation should have no multivalued attributes or nested relations. | Form new relations for each multivalued attribute or nested relation. |
| **Second (2NF)** | For relations where primary key contains multiple attributes, no nonkey attribute should be functionally dependent on a part of the primary key. | Decompose and set up a new relation for each partial key with its dependent attribute(s). Make sure to keep a relation with the original primary key and any attributes that are fully functionally dependent on it. |
| **Third (3NF)** | Relation should not have a nonkey attribute functionally determined by another nonkey attribute (or by a set of nonkey attributes). That is, there should be no transitive dependency of a nonkey attribute on the primary key. | Decompose and set up a relation that includes the nonkey attribute(s) that functionally determine(s) other nonkey attribute(s). |

- ⭐ Memorize this table: it is the whole method on one slide. Note that it says "nonkey attribute" where [S37]/[S39]/[S49] say "nonprime". With the course's simplification ("we only need it to be primary key" [S37]) the two mean the same thing.

### [S58] Outline — item 7 "Example (cont'): Company DB" highlighted.

### [S59] 3NF-Normalized Logical Schema (tagged with (*min*, *max*) contraints) (header: "Example (cont'): Company DB")
- ⚠️ Title typo: "contraints" should read "**constraints**".
- **The six relations** (underlined = PK, verified on the slide; "(FK)" printed on the slide):

| Relation | Attributes as printed | PK | FKs (→ referenced table) |
|---|---|---|---|
| **Employee** | <u>Ssn</u>, Bdate, Name_Fname, Name_Lname, Address, wf_D_Name (FK), Supervisor_Ssn (FK) | Ssn | wf_D_Name → Department (works_for); Supervisor_Ssn → Employee (supervision) |
| **Department** | <u>Name</u>, m_E_Ssn (FK), m_start_date, Num_of_empl | Name | m_E_Ssn → Employee (manages) |
| **D_Locations** | <u>Location</u>, <u>D_Name (FK)</u> | {Location, D_Name} | D_Name → Department (has) |
| **Dependent** | <u>Name</u>, Relationship, <u>E_Ssn (FK)</u> | {Name, E_Ssn} | E_Ssn → Employee (dependents_of) |
| **works_on** | <u>E_Ssn (FK)</u>, <u>P_Number (FK)</u>, hours | {E_Ssn, P_Number} | E_Ssn → Employee; P_Number → Project |
| **Project** | <u>Number</u>, Name, Location, c_D_Name (FK) | Number | c_D_Name → Department (controls) |

- **Links.** Each FK is drawn as a line with a small **arrowhead at the referenced table**, a link name in parentheses, and a (min,max) label at each end. Colors: most labels are **red**; the (has) pair and the two (1,1) labels at Employee and Project on the works_on links are **blue**; (0,M) and (1,N) are **black**.

| Link | Tables | Label at 1st table | Label at 2nd table | Arrowhead at |
|---|---|---|---|---|
| (supervision): "(supervisor)" top line, "(supervisee)" bottom line, "⇓" beside it | Employee ↔ Employee (Supervisor_Ssn) | supervisor end (top of Employee): **(0,1)** | supervisee end (bottom of Employee): **(0,\*)** | Employee (top) |
| (manages) | Employee — Department | Employee: **(1,1)** | Department: **(0,1)** | Employee |
| (works_for) | Employee — Department | Employee: **(1,\*)** | Department: **(1,1)** | Department |
| (has) | Department — D_Locations | Department: **(1,1)** blue | D_Locations: **(0,\*)** blue | Department |
| (dependents_of) | Employee — Dependent | Employee: **(1,1)** | Dependent: **(0,\*)** | Employee |
| (unnamed) | Employee — works_on | Employee: **(1,1)** blue | works_on: **(0,M)** | Employee |
| (unnamed) | works_on — Project | works_on: **(1,N)** | Project: **(1,1)** blue | Project |
| (controls) | Department — Project | Department: **(1,1)** | Project: **(0,5)** | Department |

- **How to read the labels (my comparison with S7, check with the professor).** Every pair sits at the **opposite end** compared with the E-R diagram [S7]. Examples: manages is (0,1)@Employee/(1,1)@Department on S7 but (1,1)@Employee/(0,1)@Department here; controls is (0,5)@Department/(1,1)@Project on S7 but (1,1)@Department/(0,5)@Project here. A reading that fits **every** S59 link: *the label next to a table says how many rows of that table go with one row at the other end.* So "(0,5) next to Project" means one department controls 0 to 5 projects (⑧), and "(1,1) next to Department" means each project has exactly one controlling department (⑨). This is the reverse of the Week 3 "look-here" rule used on S7.
- 🔎 Look up in Track B: "look-here" vs "look-across" placement of (min,max) and crow's-foot marks.
- ⚠️ **works_for** changes **values**, not only places: S7 has (0,\*)/(0,1), while S59 has (1,\*) next to Employee and (1,1) next to Department. Under the reading above, S59 says that every department has at least one employee (②) and every employee works for exactly one department (①: "must work for at most one"). S59 matches the requirement sentences and S7's works_for labels look like the slip (see the S7 note).
- **What changed from the E-R diagram [S7] to this schema** (what is visible on the slides):
  - Composite **Name** became **Name_Fname, Name_Lname**: 1NF technique 3, like "Projs-Pnumber" on [S32].
  - Multivalued **{Location}** became the separate table **D_Locations(<u>Location</u>, <u>D_Name</u>)**: 1NF technique 1, exactly like DEPT_LOCATIONS on [S31].
  - Derived **Num_of_empl()** became a plain column **Num_of_empl**.
  - **works_for** became FK **wf_D_Name** in Employee. **supervision** became FK **Supervisor_Ssn** in Employee.
  - **manage** + start_date became **m_E_Ssn (FK)** + **m_start_date** in Department.
  - Weak entity **Dependent** (partial key Name) became **Dependent** with PK **{Name, E_Ssn}**, where E_Ssn is an FK to Employee.
  - **works_on** (with hours) became its own table **works_on** whose PK is the two FKs {E_Ssn, P_Number}, plus hours.
  - **controls** became FK **c_D_Name** in Project.
  - Naming pattern visible on the slide: prefix = relationship or table abbreviation (wf_ = works_for, m_ = manage(s), c_ = controls, E_ = Employee, P_ = Project, D_ = Department).
- 🔎 Look up in Track B: general E-R-to-relational mapping rules. The slides show only this result; the logical-design lab is [S62].
- The deck does **not** list the FDs of these six tables, so the "3NF" claim is stated, not demonstrated. Quick sanity check with the [S57] tests (my application):
  - **1NF:** no set-valued or composite attributes remain.
  - **2NF:** only D_Locations, Dependent and works_on have multi-attribute PKs. D_Locations has no nonprime attribute. Dependent's Relationship belongs to a dependent identified by name *within* an employee (⑩). works_on's hours needs both E_Ssn and P_Number (same as FD1 on [S36]).
  - **3NF:** no nonkey attribute is shown determining another nonkey attribute.

### [S60] 3NF-Normalized Logical Schema: "Crow's Foot" Notation
- The **same six relations, attributes, PKs, FKs, link names and (min,max) labels** as [S59] (lines and most labels in brown; the same four labels in blue). Each line end now also carries a **crow's-foot mark**. Verified at high zoom:

| Link | Mark at 1st end (label) | Mark at 2nd end (label) |
|---|---|---|
| (supervision) | top of Employee, supervisor end (0,1): **circle + bar** | bottom of Employee, supervisee end (0,\*): **circle + bar + crow's foot** |
| (manages) | Employee (1,1): **single bar** | Department (0,1): **circle + bar** |
| (works_for) | Employee (1,\*): **bar + crow's foot** | Department (1,1): **single bar** |
| (has) | Department (1,1): **single bar** | D_Locations (0,\*): **circle + bar + crow's foot** |
| (dependents_of) | Employee (1,1): **single bar** | Dependent (0,\*): **circle + bar + crow's foot** |
| Employee — works_on | Employee (1,1): **single bar** | works_on (0,M): **circle + bar + crow's foot** |
| works_on — Project | works_on (1,N): **bar + crow's foot** | Project (1,1): **single bar** |
| (controls) | Department (1,1): **single bar** | Project (0,5): **circle + bar + crow's foot** |

- **Mark legend as drawn on these slides:** (1,1) = single bar · (0,1) = circle + bar · (0,\*), (0,M) and (0,5) = circle + bar + crow's foot · (1,\*) and (1,N) = bar + crow's foot. A **circle** appears exactly where the minimum is 0, and a **crow's foot** exactly where the maximum is more than 1. The max "5" of controls is visible only in the label, not in the mark.
- Observation: the crow's foot is always at the end of the table that **holds the FK** (Employee for works_for, D_Locations, Dependent, works_on, Project for controls, and the supervisee end for supervision). The "one" end is the referenced table, the one with the arrowhead on [S59]. manages is the exception: its FK m_E_Ssn sits in Department, and both ends have max 1, so there is no crow's foot.

### [S61] Outline — item 8 "LAB #2 : Normalization Process" highlighted.

### [S62] "LAB #1: *Logical* Data Design\*"
- "*Logical*" is in red italics. *"\* Participation checked (2-3 members per working group)"*.
- ⭐ Participation is checked: work in groups of 2–3.
- ⚠️ Numbering: this slide says "LAB #1" while the outline item and [S63] say "LAB #2". Week 3 [S96] was "LAB #1: *Conceptual* Data Design", so this is probably LAB #1's logical-design continuation, followed by LAB #2 (normalization). Confirm in class.

### [S63] LAB #2 : Normalization Process
- *"In class only (no slides provided)."*
- ⭐ There is no slide material for the lab, so the lab exercise itself is not in these notes. Use your own lab notes.

### [S64] Summary
- The same 8 items as the outline (all in red): From Previous Week; Example: Company DB; Normalization Process; First Normal Form – 1NF; Second Normal Form – 2NF; Third Normal Form – 3NF; Example (cont'): Company DB; LAB #2 : Normalization Process.

### [S65] "DATABASE — End of Slides — WEEK 4 — Code: W4.L1L2[LAB#2]"

---

## 3. Definitions & key terms (word for word from the slides)

| Term | Slide wording (verbatim) | [S#] |
|---|---|---|
| Goals of "good" data design | **Goal 1: Information preservation**: "maintain all concepts, attributes, entity sets and relationship sets, generalization, specialization aggregation, etc. which are described at conceptual level (by an E-R/EE-R diagram)." **Goal 2: Minimum redundancy**: "minimize redundant storage and reduce the need for multiple updates to maintain consistency across multiple copies of the same information." | S10 |
| Measures of quality for relation schemas | "Clear semantics of the schema's attributes – Redundant information and anomalies – NULL values – Possibility to generate spurious tuples" | S11, S20 |
| Levels of goodness | "Logical (from Conceptual) level : Meaning of schemas – Measure of meaning is a degree of schema's normalization"; "Implementation level : Physical storage of schemas – Measure is Transaction Processing performance" | S12 |
| Functional Dependency Theory (FDT) | "Formal tool for analysis of relational schemas." "NB: The concept of functional dependency allows us to express constraints on a schema that we cannot express by using primary keys (superkeys)." | S13 |
| Functional dependency (informal) | "A functional dependency (FD) defines a constraint between two sets of attributes in a relation schema." | S14 |
| **Functional dependency (definition)** | "A functional dependency on a relation schema r between two sets X and Y of attributes of r, denoted by X → Y, is a constraint on the possible tuples that can form an instance of r. The constraint is that, for every two tuples t₁ and t₂ in an instance of r, if t₁[X] = t₂[X], then it must also be t₁[Y] = t₂[Y]." | S14 |
| **Trivial FD** | "A functional dependency X → Y is trivial if Y ⊆ X." | S14, S52 |
| Legal relation instances | "A relation schema r's instances that satisfy the FDs among the relation's attributes are called legal relation instances (or: legal extensions) of r." | S14 |
| Normalization (inputs) | "We assume that a set of FDs is given for each relation, and that each relation has a designated primary key; FDs + primary keys + tests of conditions for normal forms (see next) drives the normalization process of relational schema design." | S15 |
| **Normalization process** | "The normalization process (Codd, 1972), takes a relation schema through a series of "tests" to certify whether it satisfies a certain "normal form"." | S18 |
| Aim of normalization | "to achieve the desirable properties, in particular, of: (1) minimal redundancy, and (2) minimal issues with insertion, deletion, and update anomalies"; "a "filtering" or "purification" process to make the design have successively better quality." | S19 |
| **Normal form (of a relation schema)** | "The normal form of a relation schema refers to the highest normal form condition that it meets, and hence indicates the degree to which it has been normalized." | S21 |
| **Non-additive (lossless) join property** | "guarantees that the spurious tuple generation problem does not occur with respect to the relation schemas created after decomposition by normalization." — "Extremely critical" | S22, S43, S56 |
| **Dependency preservation property** | "ensures that each functional dependency is represented in some individual relation resulting after decomposition." — "Desirable but sometimes sacrificed for other factors" | S22, S43, S56 |
| **De-normalization** | "The de-normalization is the process of storing the join of higher normal form relations as a base relation, which is in a lower normal form." | S24 |
| **1NF** | "historically defined to disallow multivalued attributes or composite attributes, and their combinations. It states that: the domain of an attribute must include only atomic (simple, indivisible) values and the value of any attribute in a tuple must be a single value from the domain of that attribute." | S28 |
| 1NF techniques | "1. Remove attribute and place in separate relation. 2. Expand the primary key to include the attribute. 3. Use several atomic attributes" | S30 |
| Composite attributes / nested relations | "It does not allow composite attributes (sometimes also called: nested relations)." | S32 |
| **Full functional dependency** | "A functional dependency X → Y is a full functional dependency if removal of any attribute A from X means that the dependency does not hold any more." | S35 |
| **Partial functional dependency** | "A functional dependency X → Y is a partial functional dependency if some attribute A in X can be removed from X and the dependency still holds." | S35 |
| **Prime / nonprime attribute** | "An attribute of relation schema R is called a prime attribute of R if it is a member of some candidate* key of R. An attribute is called nonprime if it is not a prime attribute—that is, if it is not a member of any candidate key." "* the definition is general. Here we only need it to be primary key." | S37 |
| **2NF** | "Definition (Codd, 1971) A relation schema R is in second normal form (2NF) if every nonprime attribute A in R is fully functionally dependent on the primary* key of R." REMARK: "* A more general definition of 2NF generalises it to "on every candidate key." (We don't need such generalization.)" | S39 |
| 2NF normalization | "nonprime attributes must be associated only with the part of the primary key on which they are fully functionally dependent." "In short: eliminate the partial dependencies on primary key of all nonprime attributes" | S41, S42 |
| **Transitive dependency** | "A functional dependency X → Y in a relation schema R is a transitive dependency if there exists a set of attributes Z in R that is neither a candidate* key nor a subset of any* key of R, and both X → Z and Z → Y hold." "* the definition is general. We only need it to be primary key." | S46 |
| **3NF (Codd's original)** | "According to Codd's original definition, a relation schema R is in 3NF if it satisfies 2NF and no nonprime attribute of R is transitively dependent on the primary key." | S49 |
| **3NF (general)** | "A relation schema R is in 3NF if, whenever a nontrivial functional dependency X→A holds in R, either (a) X is a superkey of R or (b) A is a prime attribute of R." "(*) "more general" because it does not use the notion of 2NF." | S49, S52 |
| 3NF and dependencies | "Normalization procedure to 3NF preserves the dependencies defined on the input schema." | S56 |
| BCNF (named only) | "A stronger definition of 3NF—called Boyce-Codd normal form (BCNF)—was proposed by Boyce and Codd in 1974." | S18 |

**Terms used on the slides but not defined there** (🔎 Look up in Track B):
- **Anomalies (insertion / deletion / update)**: named on [S13], [S17] (title only) and [S19].
- **Spurious tuples**: named on [S11], [S13], [S22]; illustrated by [S23].
- **Lossy decomposition**: shown only by example on [S23].
- **Superkey / candidate key**: used on [S13], [S37], [S46], [S47], [S49]. These may be defined in an earlier week's class notes.
- **BCNF** and **4NF**: named only on [S18] and [S24] ("we don't see it").
- **Transitivity** as an inference rule: named only on [S47].

---

## 4. Normalization recipe (as taught) + the Company DB 3NF schema in full

### 4.1 Recipe: follow these steps on any new table
**Step 0: Collect the inputs** [S15]. You need the relation schema, its **designated primary key**, and its **set of FDs**. Draw the FD diagram as the slides do: for each FD, a line starts under the determinant and has arrowheads under each dependent [S17].

**Step 1: Mark prime vs nonprime** [S37–S38]. Prime = member of the (primary) key; nonprime = everything else.

**Step 2: 1NF test** [S28, S57]. Ask: *"Is any attribute set-valued (multivalued) or composite/nested?"* If yes, fix it with one of the techniques [S30]:
- **Technique 1** (in red on S30, shown on S31): move the attribute into a **new relation** made of the original PK plus the attribute, with **PK = both**. Example: DEPT_LOCATIONS(<u>Dnumber</u>, <u>Dlocation</u>); in the Company DB, D_Locations(<u>Location</u>, <u>D_Name</u>).
- **Technique 2**: **expand the primary key** to include the attribute.
- **Technique 3**: use **several atomic attributes**. Examples: Projs-Pnumber, Projs-Hours [S32]; Name_Fname, Name_Lname [S59].

**Step 3: 2NF test** [S39, S57]. This only matters if the PK has **two or more attributes**. For every nonprime A, ask *"Does a part of the PK already determine A?"*
- If yes, that is a **partial dependency** [S35] and the relation is not in 2NF [S40].
- **Remedy** [S41, S42, S57]: build one new relation per partial key with its dependents (EP2, EP3). Keep one relation with the **original PK** plus the attributes fully dependent on it (EP1). *"In short: eliminate the partial dependencies on primary key of all nonprime attributes."*

**Step 4: 3NF test** [S46–S49, S57]. Ask: *"Is a nonprime attribute determined by another non-key attribute (X → Z → Y with Z not a key)?"*
- If yes, that is a **transitive dependency** and the relation is not in 3NF.
- Cross-check with the **general test** [S52]: for every nontrivial X → A, X must be a superkey **or** A must be prime [S53].
- **Remedy** [S50, S55, S57]: build a new relation whose PK is the determining non-key attribute(s), plus what they determine (ED2, LOTS1B). The determinant **stays** in the original relation as the link (ED1 keeps Dnumber; LOTS1A keeps Area).
- If a dependency on **part of a candidate key** also exists (FD3 in LOTS, which breaks "general" 2NF), split it off first, as the slides do in two steps [S54–S55].

**Step 5: Check the result** [S22, S43, S56].
- **Lossless join** must hold ("extremely critical"). Otherwise you get spurious tuples [S23].
- **Dependency preservation** should hold: each FD must sit whole inside one result relation. Normalization to 3NF preserves the dependencies [S56].
- Label each result "In 3NF".

**Step 6: In practice** [S24]. Stop at 3NF/BCNF. You "do not need to normalize to the highest possible normal form for performance reasons", and de-normalization is a deliberate choice [S24–S25].

Quick reference: the [S57] table (Test → Remedy) is this recipe in compact form.

### 4.2 Company DB: 3NF-normalized logical schema [S59, S60]
Relational notation (underlined = PK; each FK line gives the table the link line runs to, with the arrowhead on S59):
- **Employee**(<u>Ssn</u>, Bdate, Name_Fname, Name_Lname, Address, wf_D_Name, Supervisor_Ssn)
  - FK wf_D_Name → Department (works_for)
  - FK Supervisor_Ssn → Employee (supervision)
- **Department**(<u>Name</u>, m_E_Ssn, m_start_date, Num_of_empl)
  - FK m_E_Ssn → Employee (manages)
- **D_Locations**(<u>Location</u>, <u>D_Name</u>)
  - FK D_Name → Department (has)
- **Dependent**(<u>Name</u>, Relationship, <u>E_Ssn</u>)
  - FK E_Ssn → Employee (dependents_of)
- **works_on**(<u>E_Ssn</u>, <u>P_Number</u>, hours)
  - FK E_Ssn → Employee
  - FK P_Number → Project
- **Project**(<u>Number</u>, Name, Location, c_D_Name)
  - FK c_D_Name → Department (controls)

Links with (min,max) labels [S59] and crow's-foot marks [S60]:

| Link | FK (in table) | End A: label · mark | End B: label · mark |
|---|---|---|---|
| (supervision) | Supervisor_Ssn (Employee) | supervisor end (Employee top) (0,1) · circle + bar | supervisee end (Employee bottom) (0,\*) · circle + bar + crow's foot |
| (manages) | m_E_Ssn (Department) | Employee (1,1) · single bar | Department (0,1) · circle + bar |
| (works_for) | wf_D_Name (Employee) | Employee (1,\*) · bar + crow's foot | Department (1,1) · single bar |
| (has) | D_Name (D_Locations) | Department (1,1) · single bar | D_Locations (0,\*) · circle + bar + crow's foot |
| (dependents_of) | E_Ssn (Dependent) | Employee (1,1) · single bar | Dependent (0,\*) · circle + bar + crow's foot |
| (unnamed) | E_Ssn (works_on) | Employee (1,1) · single bar | works_on (0,M) · circle + bar + crow's foot |
| (unnamed) | P_Number (works_on) | works_on (1,N) · bar + crow's foot | Project (1,1) · single bar |
| (controls) | c_D_Name (Project) | Department (1,1) · single bar | Project (0,5) · circle + bar + crow's foot |

- Mark legend on these slides: circle = min 0 · single bar = min 1 / max 1 · crow's foot = max many (\*, M, N, 5).
- For where each table came from in the E-R diagram, the label placement (opposite end vs S7), and the works_for discrepancy, see the [S59] notes above.

---

## 5. Worked examples from class (step by step)

### 5.1 DEPARTMENT with multivalued Dlocations → 1NF [S29–S31]
1. **Spot the violation.** Dlocations holds sets such as {Bellaire, Sugarland, Houston}. The values are "not atomic (but sets)", so the relation is **not in 1NF** [S29].
2. **Technique 1 (the slide's solution, [S31]).**
   - DEPARTMENT(Dname, <u>Dnumber</u>, Dmgr_ssn) with 3 rows.
   - DEPT_LOCATIONS(<u>Dnumber</u>, <u>Dlocation</u>) with 5 rows: (1, Houston), (4, Stafford), (5, Bellaire), (5, Sugarland), (5, Houston).
   - Both are "in 1NF". The new key is {Dnumber, Dlocation}, because one department has many locations and one location (Houston) serves several departments.
3. **Technique 2 on the same data** (my application of [S30]; not drawn on the slides). Keep one table, with one row per location, and **expand the PK** to {Dnumber, Dlocation}:

| Dname | <u>Dnumber</u> | Dmgr_ssn | <u>Dlocation</u> |
|---|---|---|---|
| Research | 5 | 333445555 | Bellaire |
| Research | 5 | 333445555 | Sugarland |
| Research | 5 | 333445555 | Houston |
| Administration | 4 | 987654321 | Stafford |
| Headquarters | 1 | 888665555 | Houston |

   - The result is in 1NF, but "Research / 333445555" is now stored 3 times (the redundancy of [S10]).
   - With the slide's definitions: Dnumber → {Dname, Dmgr_ssn} is now a **partial** dependency on the key {Dnumber, Dlocation} [S35], so this table fails 2NF [S39]. Splitting it the [S42] way gives back exactly the technique-1 result.
4. **Technique 3 on the same data** (my application; not drawn). Use several atomic attributes: DEPARTMENT(Dname, <u>Dnumber</u>, Dmgr_ssn, Dlocation1, Dlocation2, Dlocation3).
   - Research gets Bellaire / Sugarland / Houston. Administration and Headquarters get one value and two **empty (NULL)** cells each, which are the "NULL values" / "waste of storage space due to NULLs" of [S11], [S13].
   - In class, technique 3 is shown for **composite/nested** attributes ([S32]; Name_Fname/Name_Lname on [S59]). Technique 1 is shown for **multivalued** ones ([S31]; D_Locations on [S59]).

### 5.2 EMP_PROJ with a nested relation → 1NF [S32]
1. EMP_PROJ(Ssn, Ename, {PROJS(Pnumber, Hours)}): Projs is a **nested relation** (composite group, and in braces = a set), so it is not 1NF.
2. Slide fix: *"Remove nested relation attributes into new set of simple attributes: Projs-Pnumber, Projs-Hours"*, giving EMP_PROJ(Ssn, Ename, Projs-Pnumber, Projs-Hours).
3. Compare with EMP_PROJ on [S17]/[S36], which has one row per (employee, project) and PK **{Ssn, Pnumber}**. That is the flattened form with the key expanded (technique 2), and it is the starting point of the 2NF example below.

### 5.3 EMP_PROJ → 2NF [S36–S42]
1. **Schema + PK:** EMP_PROJ(<u>Ssn</u>, <u>Pnumber</u>, Hours, Ename, Pname, Plocation), PK = {Ssn, Pnumber}.
2. **FDs:**
   - FD1 {Ssn, Pnumber} → Hours
   - FD2 Ssn → Ename
   - FD3 Pnumber → {Pname, Plocation}
3. **Prime / nonprime** [S37–S38]: prime = Ssn, Pnumber; nonprime = Hours, Ename, Pname, Plocation.
4. **Check each nonprime attribute against the whole PK** [S35–S36, S40]:

| Nonprime attribute | Dependency on the PK | Why |
|---|---|---|
| Hours | **full** | "Ssn → Hours and Pnumber → Hours don't hold" |
| Ename | **partial** | FD2: Ssn alone → Ename |
| Pname | **partial** | FD3: Pnumber alone → Pname |
| Plocation | **partial** | FD3: Pnumber alone → Plocation |

5. **Verdict:** "R is not in 2NF" [S40]. It is in 1NF because all values are atomic.
6. **Decompose** [S41–S42]. Each nonprime attribute goes with the part of the key it fully depends on:
   - EP1(<u>Ssn</u>, <u>Pnumber</u>, Hours): the original key plus its fully dependent attribute, with FD1.
   - EP2(<u>Ssn</u>, Ename): partial key Ssn, with FD2.
   - EP3(<u>Pnumber</u>, Pname, Plocation): partial key Pnumber, with FD3.
7. **Check:** all three are "In 2NF". FD1, FD2 and FD3 each sit whole in one relation, so dependencies are preserved ([S43], yellow box). Ssn and Pnumber in EP1 link to EP2 and EP3.

### 5.4 EMP_DEPT → 3NF [S47, S50]
1. **Schema + PK:** EMP_DEPT(Ename, <u>Ssn</u>, Bdate, Address, Dnumber, Dname, Dmgr_ssn), PK = Ssn.
2. **FDs:**
   - FD1 Ssn → {Ename, Bdate, Address, Dnumber}
   - FD2 Dnumber → {Dname, Dmgr_ssn}
3. **1NF:** yes (atomic values). **2NF:** yes, because the PK is a single attribute, so no partial dependency is possible (the same point as LOTS' "(\*) Note the single attribute", [S54]).
4. **3NF?** No.
   - Ssn → Dnumber (FD1) and Dnumber → Dmgr_ssn (FD2) give "{Ssn} → Dmgr_ssn inferred by Transitivity", and "Dnumber is not a part of any primary key" [S47]. That is a transitive dependency (X = Ssn, Z = Dnumber, Y = Dmgr_ssn; the same holds for Dname).
   - General test [S52]: for FD2, Dnumber is not a superkey and Dname/Dmgr_ssn are not prime, so it is a violation.
5. **Decompose** [S50]:
   - ED1(Ename, <u>Ssn</u>, Bdate, Address, Dnumber) with FD1.
   - ED2(<u>Dnumber</u>, Dname, Dmgr_ssn) with FD2.
6. **Check:** both are "In 3NF". FD1 is in ED1 and FD2 is in ED2, so dependencies are preserved [S56]. Dnumber stays in ED1 as the link to ED2.

### 5.5 The instructor + department table: de-normalized, not in 3NF [S25, S48, S51, S53]
1. **Table:** (ID, name, salary, dept_name, building, budget), 12 rows [S25].
   - On [S25] it is shown as a **de-normalized** table: *"instructor and department not separated"*.
   - On [S48]/[S51]/[S53] ID is the PK.
2. **FDs** [S51]:
   - FD1 ID → {name, salary}
   - FD2 dept_name → {building, budget}
   - FD0 ID → {name, salary, dept_name, building, budget}, which "holds because of ID is PK"
3. **Codd's test.** ID → dept_name → budget, and dept_name is not a key, so budget (and building) are "transitively dependent on ID (primary key)" [S48, S51]. The table is **not in 3NF**.
4. **General test** [S53]. {dept_name} → {building, budget} is "non trivial"; "dept_name not PK and budget not prime". Neither (a) nor (b) of [S52] holds, so it is **not in 3NF**.
5. **Remedy.** The slides stop at the diagnosis. Applying the [S57] 3NF remedy exactly as on [S50] (my application) gives:
   - **instructor**(<u>ID</u>, name, salary, dept_name)
   - **department**(<u>dept_name</u>, building, budget)
   - From the slide data, department would hold **7** rows instead of the repeated information in 12: Physics–Watson–70000, Finance–Painter–120000, History–Painter–50000, Comp. Sci.–Taylor–100000, Elec. Eng.–Taylor–85000, Biology–Watson–90000, Music–Packard–80000.
   - Storing the join of these two back as one base table is precisely the de-normalization of [S24]/[S25].

### 5.6 LOTS → 3NF in two steps [S54–S55]
1. **Schema:** LOTS(<u>Property_id#</u>, County_name, Lot#, Area, Price, Tax_rate). PK = Property_id# (a single attribute). The other candidate key is {County_name, Lot#}.
2. **FDs:**
   - FD1 Property_id# → {County_name, Lot#, Area, Price, Tax_rate}
   - FD2 {County_name, Lot#} → {Property_id#, Area, Price, Tax_rate}
   - FD3 County_name → Tax_rate
   - FD4 Area → Price
3. **Diagnosis** [S54]: *"Not in 3NF (but in 2NF; not in general 2NF because of FD3)"*.
   - 2NF on the PK: yes (single-attribute PK).
   - General 2NF: no. Tax_rate depends on County_name, a *part* of the candidate key {County_name, Lot#}.
   - 3NF: no. Property_id# → Area → Price with Area not a key (FD4). FD3 also fails the general test (County_name is not a superkey and Tax_rate is not prime).
4. **Step 1: split off FD3** [S55]:
   - LOTS1(<u>Property_id#</u>, County_name, Lot#, Area, Price), with FD1, FD2, FD4. It is "not in 3NF (but in 2NF)".
   - LOTS2(<u>County_name</u>, Tax_rate), with FD3. It is "In 3NF (and 2NF)".
5. **Step 2: "LOTS1 normalized to 3NF"**, splitting off FD4:
   - LOTS1A(<u>Property_id#</u>, County_name, Lot#, Area), with FD1 and FD2.
   - LOTS1B(<u>Area</u>, Price), with FD4.
6. **Final:** LOTS1A, LOTS1B and LOTS2 are all in 3NF. Every FD is kept in one relation (dependency preservation, [S56]). County_name and Area remain in LOTS1A as link attributes.

### 5.7 Lossy decomposition [S23]
1. employee(<u>ID</u>, name, street, city, salary) holds 57766/Kim/Main/Perryridge/75000 and 98776/Kim/North/Hampton/67000.
2. It is decomposed into (ID, name) and (name, street, city, salary). The only shared attribute is **name** (boxed red), and it is **not unique**: two employees are called Kim.
3. Natural join gives **4 rows**. The two blue-boxed rows (57766/Kim/North/Hampton/67000 and 98776/Kim/Main/Perryridge/75000) did not exist before. They are **spurious tuples**, and the original table cannot be recovered.
4. This decomposition **violates** the non-additive (lossless) join property ("extremely critical", [S22]).

### 5.8 Company DB: from the E-R diagram [S7] to the 3NF schema [S59–S60]
- 1NF techniques in action: **technique 3** for the composite Name (Name_Fname, Name_Lname) and **technique 1** for the multivalued {Location} (new table D_Locations(<u>Location</u>, <u>D_Name</u>)).
- The relationships become FKs (wf_D_Name, Supervisor_Ssn, m_E_Ssn + m_start_date, c_D_Name) or their own tables (works_on, plus Dependent for the weak entity).
- The full schema, keys, FKs, (min,max) labels and crow's-foot marks are in §4.2 and in the [S59]/[S60] notes.

---

## 6. Likely quiz / exam questions (built only from these slides)

**Q1 (MCQ).** Which is the slides' definition of the FD X → Y on r?
A. For every two tuples t₁, t₂ of an instance of r: if t₁[Y] = t₂[Y] then t₁[X] = t₂[X].
B. For every two tuples t₁, t₂ of an instance of r: if t₁[X] = t₂[X] then t₁[Y] = t₂[Y].
C. X is the primary key of r and Y ⊆ X.
D. For every tuple t of r, t[X] ≠ t[Y].

**Q2 (MCQ).** X → Y is *trivial* if: A. X ⊆ Y · B. Y ⊆ X · C. X ∩ Y = ∅ · D. X is a superkey.

**Q3 (fill in).** Codd proposed 1NF in ____ and 2NF/3NF in ____. The normalization process dates from ____. BCNF was proposed in ____ by ____.

**Q4 (MCQ).** After normalization, which property is "extremely critical" and which is "desirable but sometimes sacrificed for other factors"?
A. Dependency preservation / lossless join · B. Lossless (non-additive) join / dependency preservation · C. Both extremely critical · D. Minimum redundancy / information preservation

**Q5 (short).** A relation passes the 1NF and 2NF tests but fails the 3NF test. What is its normal form, and which slide definition justifies the answer?

**Q6 (1NF, technique 1 and 2).** STORE(StoreName, <u>StoreNo</u>, ManagerSsn, Phones) has the rows: Central | 10 | 111 | {5550101, 5550102}; Airport | 20 | 222 | {5550200}; Mall | 30 | 333 | {5550300, 5550301, 5550302}.
(a) Is STORE in 1NF? Why? (b) Fix it with technique 1 and give the relations, keys and rows. (c) What does technique 2 give instead?

**Q7 (1NF, composite).** CUSTOMER(<u>CustID</u>, Name{First, Last}, City). Make it 1NF the way the Company DB schema treats Employee's Name.

**Q8 (prime / nonprime).** ENROLL(<u>StudentID</u>, <u>CourseID</u>, Grade, StudentName, CourseTitle, Credits). List the prime and nonprime attributes.

**Q9 (2NF).** For ENROLL (Q8) the FDs are: FD1 {StudentID, CourseID} → Grade; FD2 StudentID → StudentName; FD3 CourseID → {CourseTitle, Credits}.
(a) For each nonprime attribute, is its dependency on the PK full or partial? (b) Is ENROLL in 2NF? (c) Normalize it to 2NF.

**Q10 (3NF, Codd).** EMP_BRANCH(<u>EmpID</u>, EmpName, HireDate, BranchNo, BranchCity, BranchMgr) has FD1 EmpID → {EmpName, HireDate, BranchNo} and FD2 BranchNo → {BranchCity, BranchMgr}.
(a) Which normal form is it in? (b) Name a transitive dependency and justify it with the two conditions used on S47. (c) Normalize it to 3NF.

**Q11 (3NF, general definition).** Use the general 3NF definition to explain why the instructor table with {dept_name} → {building, budget} and PK ID is not in 3NF.

**Q12 (LOTS-style).** PARCEL(<u>Parcel_id</u>, Region, Plot#, Size, Value, Region_fee) has the candidate key {Region, Plot#} and these FDs:
- FD1 Parcel_id → {Region, Plot#, Size, Value, Region_fee}
- FD2 {Region, Plot#} → {Parcel_id, Size, Value, Region_fee}
- FD3 Region → Region_fee
- FD4 Size → Value

(a) Is it in 2NF (Codd, on the PK)? Is it in *general* 2NF? (b) Is it in 3NF? (c) Normalize it to 3NF following the slides' two steps.

**Q13 (lossy).** employee(ID, name, street, city, salary) with two employees both named Kim is decomposed into (ID, name) and (name, street, city, salary). What does the natural join return? Which property is violated?

**Q14 (MCQ).** De-normalization is:
A. decomposing a relation into higher normal form relations;
B. storing the join of higher normal form relations as a base relation, which is in a lower normal form;
C. replacing NULLs by default values;
D. removing all FDs from a schema.

**Q15 (MCQ).** Which 1NF technique is printed in red on S30 and demonstrated on S31?
A. Expand the primary key to include the attribute · B. Remove attribute and place in separate relation · C. Use several atomic attributes · D. De-normalize.

**Q16 (matching, S57).** Match each remedy to 1NF, 2NF or 3NF:
(i) "Form new relations for each multivalued attribute or nested relation."
(ii) "Decompose and set up a new relation for each partial key with its dependent attribute(s). Make sure to keep a relation with the original primary key and any attributes that are fully functionally dependent on it."
(iii) "Decompose and set up a relation that includes the nonkey attribute(s) that functionally determine(s) other nonkey attribute(s)."

**Q17 (Company DB).** In the 3NF Company schema, give the PKs of D_Locations, Dependent and works_on, and the E-R construct each table comes from.

**Q18 (crow's foot).** On S60, which marks appear at the two ends of (controls), and how do they match the (min,max) labels?

**Q19 (MCQ).** Which FK implements the (supervision) link, and in which table?
A. Supervisor_Ssn in Employee · B. m_E_Ssn in Department · C. E_Ssn in Dependent · D. wf_D_Name in Employee

**Q20 (fill in).** "NB: The concept of functional dependency allows us to express constraints on a schema that we cannot express by using ________."

### Answers
- **Q1: B** [S14].
- **Q2: B** [S14, S52].
- **Q3:** 1970; 1971; 1972 (Codd); 1974, by Boyce and Codd [S18].
- **Q4: B.** Lossless join = "Extremely critical"; dependency preservation = "Desirable but sometimes sacrificed for other factors" [S22, S43, S56].
- **Q5:** **2NF.** "The normal form of a relation schema refers to the highest normal form condition that it meets" [S21].
- **Q6:**
  - (a) No. Phones holds sets, so the values are not atomic [S28–S29].
  - (b) STORE(StoreName, <u>StoreNo</u>, ManagerSsn) with 3 rows, and STORE_PHONES(<u>StoreNo</u>, <u>Phone</u>) with rows (10, 5550101), (10, 5550102), (20, 5550200), (30, 5550300), (30, 5550301), (30, 5550302). PK = {StoreNo, Phone} [S30–S31].
  - (c) A single STORE(StoreName, <u>StoreNo</u>, ManagerSsn, <u>Phone</u>) with PK {StoreNo, Phone} and 6 rows. StoreName/ManagerSsn are repeated, and StoreNo → {StoreName, ManagerSsn} becomes a partial dependency, so it is not 2NF (cf. §5.1) [S30, S35, S39].
- **Q7:** CUSTOMER(<u>CustID</u>, Name_First, Name_Last, City): technique 3, "Use several atomic attributes" [S30, S32, S59 (Name_Fname, Name_Lname)].
- **Q8:** Prime: StudentID, CourseID. Nonprime: Grade, StudentName, CourseTitle, Credits [S37–S38].
- **Q9:**
  - (a) Grade is **full**, because neither StudentID → Grade nor CourseID → Grade holds. StudentName is **partial** (FD2). CourseTitle and Credits are **partial** (FD3) [S35–S36, S40].
  - (b) **Not in 2NF** [S39–S40].
  - (c) EN1(<u>StudentID</u>, <u>CourseID</u>, Grade); EN2(<u>StudentID</u>, StudentName); EN3(<u>CourseID</u>, CourseTitle, Credits). All are in 2NF and FD1–FD3 are preserved [S41–S42, S57].
- **Q10:**
  - (a) **2NF.** The PK is a single attribute, so there is no partial dependency, but it is not 3NF [S21, S35, S49].
  - (b) EmpID → BranchMgr (likewise → BranchCity): (1) it is inferred by transitivity from EmpID → BranchNo and BranchNo → BranchMgr; (2) BranchNo is not a part of any primary key [S46–S47].
  - (c) EB1(<u>EmpID</u>, EmpName, HireDate, BranchNo) with FD1 and EB2(<u>BranchNo</u>, BranchCity, BranchMgr) with FD2 [S50, S57].
- **Q11:** The FD is nontrivial. (a) fails because dept_name is not the PK/superkey. (b) fails because budget (and building) is not prime. So it is not 3NF [S52–S53].
- **Q12:**
  - (a) **Yes**, it is in 2NF on the PK, since the PK is the single attribute Parcel_id ("Note the single attribute"). It is **not** in general 2NF, because by FD3 Region_fee depends on Region, a part of the candidate key {Region, Plot#} [S39 remark, S54].
  - (b) **No.** FD4: Size is not a superkey and Value is not prime. FD3 fails the same way [S52, S54].
  - (c) Step 1: PARCEL1(<u>Parcel_id</u>, Region, Plot#, Size, Value) and PARCEL2(<u>Region</u>, Region_fee). Step 2: PARCEL1A(<u>Parcel_id</u>, Region, Plot#, Size) and PARCEL1B(<u>Size</u>, Value) [S55].
- **Q13:** It returns 4 rows instead of 2. Two of them are spurious: each ID is paired with both addresses. This violates the **non-additive (lossless) join** property [S22, S23].
- **Q14: B** [S24]. The example is S25: "instructor and department not separated".
- **Q15: B** [S30, S31].
- **Q16:** (i) 1NF · (ii) 2NF · (iii) 3NF [S57].
- **Q17:** D_Locations PK {Location, D_Name}, from Department's multivalued {Location}. Dependent PK {Name, E_Ssn}, from the weak entity Dependent (partial key Name) and the double-diamond "have". works_on PK {E_Ssn, P_Number}, from the relationship works_on with attribute hours [S7, S59].
- **Q18:** The Department end, labelled (1,1), has a **single bar**. The Project end, labelled (0,5), has **circle + bar + crow's foot**. The circle = min 0 and the crow's foot = max more than 1; the "5" appears only in the label [S59, S60].
- **Q19: A.** Supervisor_Ssn (FK) in Employee [S59].
- **Q20:** "primary keys (superkeys)" [S13].

---

## 7. Self-check

- [ ] I can write the FD definition with t₁/t₂ word for word, and say when an FD is trivial [S14].
- [ ] I can name the two goals of good data design and the four measures of quality for relation schemas [S10–S11].
- [ ] I can explain lossless join vs dependency preservation, say which one is "extremely critical", and show a lossy decomposition that creates spurious tuples [S22–S23].
- [ ] I can test for 1NF and fix a multivalued or composite attribute with each of the three techniques [S28–S32].
- [ ] I can mark each FD on a composite key as full or partial and normalize to 2NF like EMP_PROJ → EP1/EP2/EP3 [S35–S42].
- [ ] I can find an X → Z → Y transitive dependency and normalize to 3NF like EMP_DEPT → ED1/ED2 [S46–S50].
- [ ] I can apply the general 3NF test (superkey **or** prime) and fully diagnose LOTS: in 2NF, not in general 2NF, not in 3NF, then the two-step decomposition [S52–S55].
- [ ] I can reproduce the "Summary of Normal Forms 1st to 3rd" table (test + remedy) [S57].
- [ ] I can write the six relations of the Company DB 3NF schema with PKs, FKs and (min,max) labels, and draw the crow's-foot marks at every line end [S59–S60].
- [ ] I can define de-normalization and point to the class example of it [S24–S25].
