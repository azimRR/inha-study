# Week 3, part 2 (slides 45–99) — E-R constraints, weak entities & the Company DB design (CLASS NOTES — from slides only)

> Source: W3L1L2.pdf, slides 45–99 of 99. [S#] = the "n / 99" footer number.
> Divider and outline slides have no footer. They are numbered by position, which matches the footers of the slides around them. Part 1 (slides 1–44) is in a separate file.
> Legend: ⭐ = professor emphasis (red, highlighted or boxed text, Note, exercise) · ⚠️ = apparent slide typo or inconsistency (original kept, correction added from the slides' own logic) · 🔎 = not on the slides, look it up in Track B.

---

## 1. Big picture

- **Data constraints** are the third thing conceptual design captures, after "data and data relationships" and "data semantics". The slides call them "technical and business rules" [S46].
- **Entity integrity (keys for entity sets):** super-key → candidate key (a *minimal* super-key) → primary key (the candidate key *chosen by the database designer*) [S48–S50].
- **Relation-based ("structural") constraints** come in two kinds [S69]:
  - **mapping cardinality / cardinality ratio** (1:1, 1:N, N:1, M:N) *specifies maximum participation*. It is drawn with arrowheads [S52–S60].
  - **participation** (total or partial) *specifies minimum participation*. Total is drawn with a double line, partial with a single line [S62–S68].
- **(min,max) "look-here" notation** puts both constraints into one label `(l,h)` (or `l..h`) on the line next to each entity set [S70–S72]:
  - min 0 = partial, min 1 = total;
  - max 1 = at most one relationship, max * (or a letter) = no limit.
- **Roles** name the function an entity plays in a relationship. You need them when an entity set takes part twice, as in a *recursive* relationship set such as SUPERVISION (supervisor / supervisee) [S73–S74].
- **Relationship integrity (keys for relationship sets):** the union of the participating entity sets' primary keys (plus any descriptive attributes) is a super-key of R [S76–S84].
  - If PK attribute names clash, rename them as *entity.attribute* (e.g. instructor.ID) [S80].
  - "Primary key for R depends of mapping cardinality!" M:N → both keys; many-to-one → the key of the "many" side; 1:1 → either key (*designer's decision*) [S83].
- **Weak entity sets** have no primary key of their own [S87–S90]:
  - they depend on an **identifying (owner) entity set** through an **identifying relationship**;
  - PK = owner's PK ∪ **discriminator (partial key)**;
  - drawing: double rectangle, double diamond, dashed underline.
- **Company DB exercise:** 11 business-rule sentences become an E-R diagram with PKs and (min,max) labels, each label tagged with its sentence number [S93–S94].
  - ⚠️ One label pair (works_for) does not match its sentences.
  - **LAB #1 (E-R diagramming)** was held in class only [S96–S97].

---

## 2. Slide-by-slide notes

**▸ Section 5 of the outline: Data Constraints (S45–S84)**

### [S45] Outline — "5 Data Constraints" highlighted
- The Week 3 agenda: 1 From Previous Week · 2 Conceptual Data Design · 3 Data and Data Relationships · 4 Data Semantics · **5 Data Constraints** (active) · 6 Entity Integrity *Revised*: Weak Entities · 7 Example: Company DB · 8 LAB #1 : E-R Diagramming.

### [S46] Divider — "Data Constraints — or: How we capture constraints on data in the E-R Model (and why)"
- ⭐ "constraints" is in red.
- An orange, hand-drawn box recalls the three things conceptual design captures:
  - **Data and Data relationships**
  - **Data semantics**
  - **Data constraints** (technical and business rules). This item is in blue: it is the topic from here on.

### [S47] Divider — "Entity Integrity — or: Keys for Entity Sets"
- ⭐ "Entity Sets" is in red. This is the first kind of data constraint: keys.

### [S48] Keys for Entity Sets = Keys for Schemas
- **Def:** "A **super-key** for an entity set *E* is a set of one or more attributes of E that, taken collectively, allow us to identify uniquely an entity in *E*." The underlined words are "one or more attributes", "taken collectively" and "identify uniquely".
- **Example:** "Suppose *E* = *student* and *student = student (ID,name,dept_name,tot_cred)*. Suppose *ID* attribute is sufficient ( **by design!!!** ) to distinguish one *student* from another. Then,
  - *ID* is a super-key (in short: SK) for *student*.
  - **NB**: you can decide that {*dept_name, tot_cred*} is SK."
- ⭐ "by design!!!" is in blue. Whether a set of attributes is a super-key is a **design decision**. The NB shows the designer could even declare {dept_name, tot_cred} a SK.

### [S49] Keys for Entity Sets = Keys for Schemas (remark)
- **Remark:** "If K is a super-key for an entity set, then any superset of K is a super-key."
- **Example:** "In *student (ID,name,dept_name,tot_cred)*, attribute *ID* super-key implies that also, say, {*ID,name*} and {*ID,dep_name*} are a super-key for *student*."
- "Best super-keys are **minimal**, i.e., do not have a proper subset that is a super-key."
- "Minimal super-keys are called **candidate keys**."
- ⭐ "minimal" is in red; "candidate keys" is in red bold.
- ⚠️ "{ID,dep_name}" should be **{ID, dept_name}**: the schema's attribute is `dept_name`.

### [S50] Keys for Entity Sets = Keys for Schemas (primary key)
- **Def:** "A **primary key** for an entity set *E* is a candidate key chosen by the database designer to uniquely identify/distinguish all entities in *E*."
- **Remark 1:** "a primary key is for an entity set."
- **Remark 2:** "Primary keys must be chosen with care. (\*)" The footnote reads "(\*) *we will see more on it soon*".
- ⭐ "candidate key" is in blue; "chosen by the database designer" is underlined; "for an entity set" is underlined in blue.
- The chain is: super-key ⟶ (minimal) candidate key ⟶ (chosen) primary key.

### [S51] Divider — "Relation-Based Constraints (I) — Mapping Cardinality (or: Cardinality Ratio)"
- ⭐ "Mapping Cardinality" is in red.

### [S52] Mapping Cardinalities
- They "Express the number of entities to which another entity can be associated via a relationship set."
- They are "Most useful in describing binary relationship sets."
- "For a binary relationship set the mapping cardinality must be one of the following types" (shown in a blue box):

| Name | Cardinality ratio |
|---|---|
| One-to-one | 1:1 |
| One-to-many | 1:N (\*) |
| Many-to-one | N:1 |
| Many-to-many | M:N |

- ⭐ "(\*) N means *many* or *any number* (zero or more)". So "many" **includes zero**.
- 🔎 Look up in Track B: how mapping cardinality is stated for non-binary (e.g. ternary) relationship sets.

### [S53] Mapping One-to-One (Ratio 1:1)
- "An entity in *A* is associated with ***at most one*** entity in *B*, and vice versa." ("at most one" is in blue.)
- Picture "(a) One-to-one":
  - A = {a1, a2, a3, a4}, B = {b1, b2, b3};
  - lines a1–b1, a2–b2, a3–b3;
  - **a4 has no line**, which is allowed because the rule says "at most one".

### [S54] 1-1 Relationships: Diagramming
- "Relationship sets with mapping cardinality one-to-one ("1-1" in short) are represented this way:"
- E-R diagram:
  - **instructor**: <u>ID</u>, name, salary;
  - diamond **advisor**;
  - **student**: <u>ID</u>, name, tot_cred.
- **Both lines have arrowheads**: one points into *instructor*, the other into *student*.
- ⭐ A red annotation arrow points at the instructor-end arrowhead and a blue one at the student-end arrowhead.

### [S55] Mapping One-to-Many (Ratio 1:N)
- "An entity in *A* is associated with ***any number*** (0..\*) of entities in *B*; an entity in *B* is associated as before."
  - "as before" means as on S53: with at most one entity in A.
- Picture "One-to-many":
  - A = {a1, a2, a3}, B = {b1,…,b5};
  - lines a1–b1, a1–b2; a2–b3, a2–b4; a3–b5;
  - every b has exactly one partner a.

### [S56] 1-N Relationships: Diagramming
- "Relationship sets with mapping cardinality one-to-many ("1-N") are represented this way:"
- Diagram: instructor — advisor — student, with an **arrowhead only into *instructor***. The line to *student* is plain.
- ⭐ The red arrow marks the instructor arrowhead; the blue arrow marks the plain student end.
- Comparing S54, S56 and S59, the **arrowhead marks the "one" side**:
  - one instructor is associated with many students;
  - each student is associated with at most one instructor (advisor).

### [S57] Mapping Many-to-One (Ratio N:1)
- "An entity in *A* is associated with ***at most one*** entity in *B*; an entity in *B* is associated with 0..\* entities in *B*."
- Picture "Many-to-one":
  - A = {a1,…,a5}, B = {b1, b2, b3};
  - lines a1–b1, a2–b1, a3–b2, a4–b3, a5–b3;
  - each a has exactly one b, while b1 and b3 have two a's each.
- ⚠️ "…associated with 0..\* entities in **B**" should be "…0..\* entities in **A**". The picture shows b1 linked to a1 and a2.
- There is no separate diagramming slide for N:1. It is 1:N seen from the other side.

### [S58] Mapping Many-to-Many (Ratio M:N)
- "An entity in *A* is associated with ***any number*** (0..\*) of entities in *B*, and vice versa."
- Picture "Many-to-many":
  - A = {a1,…,a4}, B = {b1,…,b4};
  - lines a1–b1, a1–b2, a2–b1, a3–b3, a4–b3;
  - b4 has no line;
  - a1 has two b's, b1 has two a's, and b3 has two a's.

### [S59] M-N Relationships: Diagramming
- "Relationship sets with mapping cardinality many-to-many ("M-N") are represented this way:"
- Diagram: instructor — advisor — student with **plain lines on both sides (no arrowheads)**.
- ⭐ Red and blue annotation arrows point at the two plain line ends.

### [S60] Example (WORKS_ON; reference-book example: the covers shown read "Fundamentals of Database Systems — Elmasri • Navathe" and "Database Systems")
- Instance diagram with three ovals: EMPLOYEE {e1,…,e4, …}, WORKS_ON {r1,…,r7, …} and PROJECT {p1,…,p4, …}.
- Each relationship instance rᵢ is a small square, linked to one employee and one project. Traced from the picture:

| r | EMPLOYEE | PROJECT |
|---|---|---|
| r1 | e1 | p1 |
| r2 | e2 | p1 |
| r3 | e2 | p4 |
| r4 | e3 | p2 |
| r5 | e3 | p3 |
| r6 | e3 | p4 |
| r7 | e4 | p3 |

- Reading it:
  - e2 and e3 work on several projects;
  - p1, p3 and p4 have several employees;
  - so this is many-to-many, matching the M:N slides it follows.

**▸ Entity participation (S61–S68)**

### [S61] Divider — "Relation-Based Constraints (II) — Entity Participation"
- ⭐ "Entity Participation" is in red.

### [S62] Total and Partial Participation
- "In the relationship set R = {(e₁, e₂, … eₙ) | e₁ ∈ E₁, e₂ ∈ E₂, …, eₙ ∈ Eₙ}, the entity sets E₁, E₂, …, Eₙ **participate in** R. Then, we also say that e₁, e₂, … eₙ participate in R."
- ⭐ Blue box:
  - "The participation of Eᵢ in R is **total** if every entity eᵢⱼ ∈ Eᵢ participates in ***at least one*** relationship in R."
  - "Otherwise, the participation of Eᵢ in R is **partial**."
  - Emphasis inside the box: "total" and "partial" are red bold; "every" is underlined; "at least one" is blue.

### [S63] Example
- "The participation of entity set *B* in the relationship set R = {(a₁, b₁),(a₂, b₂),(a₃, b₃)} is total."
- The picture is the S53 one (A = {a1,…,a4}, B = {b1,b2,b3}) with a red box labelled **R** around the lines.
- Why total: b1, b2 and b3 each appear in a pair.

### [S64] *Total* Participation: Diagramming
- "Relationship sets with total participation of an entity set are represented this way (see "*student*" side):"
- Diagram:
  - instructor (<u>ID</u>, name, salary) — **single line** — advisor;
  - advisor — **double line** — student (<u>ID</u>, name, tot_cred);
  - no arrowheads.
- ⭐ A blue arrow points at the **double line** on the student side.
- So: every student participates in advisor, i.e. every student has an advisor.

### [S65] Example (cont.)
- "The participation of entity set *A* in the relationship set R = {(a₁, b₁),(a₂, b₂),(a₃, b₃)} is partial."
- Same picture as S63. **a4 is in no pair**, so A is partial.

### [S66] *Partial* Participation: Diagramming
- "Relationship sets with total participation of an entity set are represented this way (see "*instructor*" side):"
- The diagram is the same as S64. ⭐ A blue arrow points at the **single line** on the instructor side.
- ⚠️ The title says *Partial* and the arrow marks the single line, so the sentence should read "…with **partial** participation of an entity set…".

### [S67] Example (cont.)
- "The participation of both entity sets *A* and *B* in the relationship set R = {(a₁, b₁),(a₁, b₂),(a₂, b₃),(a₂, b₄),(a₃, b₅)} is total."
- Picture: A = {a1, a2, a3}, B = {b1,…,b5}, a red box R; lines a1–b1, a1–b2, a2–b3, a2–b4, a3–b5. This is the S55 one-to-many picture.
- ⭐ **Note**: "entity a₁ participates in two relationships in R, but to define the participation of A in R to be **total** it is enough that a₁ (and **all** the other entities in A) participates in at least one relationship in R."
  - Red arrows go from the Note to (a₁,b₁), (a₁,b₂) and to a₁ in the picture.
  - Takeaway: **total means "at least one", not "exactly one".**

### [S68] Example (WORKS_FOR; Elmasri • Navathe covers again)
- "If ***every*** employee must work for a department, then an employee entity can exist only if it participates in at least one *works_for*'s relationship."
- "participation of *employee* in *works_for* is total."
- Instance diagram EMPLOYEE {e1,…,e7}, WORKS_FOR {r1,…,r7}, DEPARTMENT {d1, d2, d3}. Traced from the picture:

| r | EMPLOYEE | DEPARTMENT |
|---|---|---|
| r1 | e1 | d1 |
| r2 | e2 | d2 |
| r3 | e3 | d1 |
| r4 | e4 | d2 |
| r5 | e5 | d3 |
| r6 | e6 | d1 |
| r7 | e7 | d3 |

- Every employee e1–e7 has a line, so EMPLOYEE's participation is total. (Each employee also has exactly one department here.)

**▸ Summary, (min,max) and roles (S69–S74)**

### [S69] Structural constraints (header: "Relation-Based Constraints: Summary")
- "In summary:"
  - "**mapping cardinality** (or: **cardinality ratio**) of entity sets participating in a relationship set R - 1:1, 1:N, N:1,M:N
    - specifies *maximum* participation;"
  - "**participation constraint** (or: existence dependency) of an entity set in a relationship set R - partial / total
    - specifies *minumum* participation"
- "Together are called **structural constraints** of R."
- ⭐ Callout boxes with red arrows:
  - **partial** → "zero (optional participation, not existence-dependent)";
  - **total** → "one or more (mandatory participation, existence-dependent)".
- ⭐ "structural constraints" is in red. The blue terms are mapping cardinality, cardinality ratio and participation constraint.
- ⚠️ "minumum" should be **minimum**.

### [S70] (Min,Max) Participation: *Look-here* approach
- "A **single line** may have an associated minimum and maximum cardinality, shown in the form *l..h* or (*l,h*), where *l* is minimum and *h* maximum cardinality."
- The four rules (⭐ the opening phrases are in red):

| Label part | Meaning (slide wording) |
|---|---|
| A minimum of **0** | "indicates **partial** participation." |
| A minimum of **1** | "indicates **total** participation." |
| A maximum of **1** | "indicates that the entity participates in at most one relationship." |
| A maximum of **\*** (or a letter) | "indicates that the entity participates in the relationship with no limits." |

- "single line" is in bold. With (min,max), the participation is carried by the *min*, so the line itself stays single. Compare S94, where every relationship line is single.

### [S71] (Min,Max) Participation (cont.): Notation
- Diagram:
  - instructor (<u>ID</u>, name, salary) —`0..*`— advisor —`1..1`— student (<u>ID</u>, name, tot_cred);
  - the `0..*` label sits on the instructor's line, the `1..1` label on the student's line.
- ⭐ Red annotations: `0..*` is "also: (0,M)" and `1..1` is "also: (1,1)". So `l..h` and `(l,h)` are the same thing, and "M" stands for "many".

### [S72] (Min,Max) Participation: Example
- "*Instructor* can advise 0 or more students."
- "A student must have 1 advisor; cannot have multiple advisors."
- Same diagram as S71 (0..\* = (0,M) on instructor; 1..1 = (1,1) on student).
- How "look-here" reads, from this example:
  - the label written **next to an entity set** tells how many relationships **each entity of that same set** takes part in;
  - instructor's own label 0..\* means each instructor advises 0 or more students;
  - student's own label 1..1 means each student has exactly 1 advisor.
- 🔎 Look up in Track B: other conventions for placing (min,max) labels (the slides name only the "look-here" approach).

### [S73] Participation's Roles
- "In the relationship set R defied as R = {(e₁, e₂, … eₙ) | e₁ ∈ E₁, e₂ ∈ E₂, …, eₙ ∈ Eₙ}, the entity sets E₁, E₂, …, Eₙ **participate in** R."
- ⭐ Blue box: "The function that an entity has or "plays" in a relationship, e.g. e₁ ∈ E₁ in relationship (e₁, e₂, … eₙ) within the relationship set R above is called **role**."
  - "Example: *see the next slide*".
- ⚠️ "defied as" should be **"defined as"**.

### [S74] Example (on Roles) (Elmasri • Navathe covers)
- "An EMPLOYEE participates in SUPERVISION (i.e., a ***recursive relationship set***) twice in two distinct roles:
  1. **supervisor** (boss)
  2. **supervisee** (subordinate)
  (called ***recursive participation***)"
- "In figure: boss's participation is labeled 1, subordinate's participation is 2".
- ⭐ "recursive relationship set" and "recursive participation" are red italic; "supervisor" and "supervisee" are blue.
- Instance diagram EMPLOYEE {e1,…,e7} — SUPERVISION {r1,…,r6}. Every rᵢ has two lines into EMPLOYEE, one labelled 1 (boss) and one labelled 2 (subordinate). Traced from the picture:

| r | supervisor (label 1) | supervisee (label 2) |
|---|---|---|
| r1 | e5 | e1 |
| r2 | e1 | e2 |
| r3 | e1 | e3 |
| r4 | e5 | e4 |
| r5 | e4 | e6 |
| r6 | e4 | e7 |

- Reading it:
  - e5 supervises e1 and e4; e1 supervises e2 and e3; e4 supervises e6 and e7;
  - every employee has at most one boss, and e5 has none.
  - This is exactly the "(0,\*) supervisor / (0,1) supervisee" pattern of the Company DB [S94].

**▸ Relationship integrity: keys for relationship sets (S75–S84)**

### [S75] Divider — "Relationship Integrity — or: Keys for Relationship Sets"
- ⭐ "Relationship Sets" is in red.

### [S76] Keys for Relationship Sets
- "Let relationship set R = {(e₁, e₂, … eₙ) | e₁ ∈ E₁, e₂ ∈ E₂, …, eₙ ∈ Eₙ} be given. Let *primary-key(Eᵢ)* denote the set of attributes that forms the primary key for Eᵢ."
- "To define primary key for R, we have two cases:
  - 1: the attribute names of primary keys are unique across all entity sets Eᵢ in R.
  - 2: the attribute names of primary keys are not unique across all entity sets Eᵢ in R."

### [S77] Example
- Instance picture:
  - an *instructor* table: 76766 Crick, 45565 Katz, 10101 Srinivasan, 98345 Kim, 76543 Singh, 22222 Einstein;
  - an empty red box labelled ***advisor***;
  - a *student* table: 98988 Tanaka, 12345 Shankar, 00128 Zhang, 76543 Brown, 76653 Aoi, 23121 Chavez, 44553 Peltier.
- Lines (advisor pairs):

| instructor | student |
|---|---|
| 76766 Crick | 98988 Tanaka |
| 45565 Katz | 12345 Shankar |
| 45565 Katz | 00128 Zhang |
| 10101 Srinivasan | 76543 Brown |
| 98345 Kim | 76653 Aoi |
| 76543 Singh | 23121 Chavez |
| 22222 Einstein | 44553 Peltier |

- "*primary-key(instructor)={ID}*  *primary-key(student)={ID}*". Both keys have the **same name**, ID, which is the Case 2 situation.
- Note from the data: the value 76543 is both an instructor ID (Singh) and a student ID (Brown).

### [S78] Keys for Relationship Sets (cont.) — Case 1
- "**Case 1**: attribute names of primary keys are unique."
  - "If R has no descriptive attributes, then the set *primary-key(E₁)* ∪ … ∪ *primary-key(Eₙ)* (\*) describes uniquely any relationship in R."
  - "Otherwise, let a₁, … aₘ be R's attributes. Then: *primary-key(E₁)* ∪ … ∪ *primary-key(Eₙ)* ∪ {a₁, … aₘ} describes uniquely any relationship in R."
- "In both cases, (\*) is a **super-key for** R."
- ⭐ Yellow highlight: "**Primary key for R depends of mapping cardinality!**"
- ⚠️ Minor: "depends of" should be "depends **on**".
- So the union (\*) of the participants' PKs is always a super-key of R, even when R has attributes. The *primary* key is then picked according to the mapping cardinality (see S83).

### [S79] Example (Case 1 with a relationship attribute)
- Picture:
  - *instructor* **E₁** (same six rows as S77);
  - a box **R : member_of** containing an oval of **date** values (the word "date" is in red);
  - *department* **E₂**, whose column header **dept_name** is boxed in red: Biology, Comp. Sci., Elec. Eng., Finance, History, Music, Physics.
- Each instructor links to a date, and each date links to a department. Traced:

| instructor (E₁) | date | department (E₂) |
|---|---|---|
| 76766 Crick | 3 May 2008 | Biology |
| 45565 Katz | 10 June 2007 | Comp. Sci. |
| 45565 Katz | 12 June 2006 | Elec. Eng. |
| 10101 Srinivasan | 6 June 2009 | Finance |
| 98345 Kim | 30 June 2007 | History |
| 76543 Singh | 31 May 2007 | Music |
| 22222 Einstein | 4 May 2006 | Physics |

- "*primary-key(E₁)* ∪ *primary-key(E₂)* ∪ {a₁, … aₘ} = = {*ID*} ∪ {*dept_name*} ∪ {*date*} is a super-key for R."
- Case 1 applies because the names ID and dept_name are different.

### [S80] Keys for Relationship Sets (cont.) — Case 2
- "**Case 2**: attribute names of primary keys are not unique across all entity sets Eᵢ in R."
- "Example:" diagram **R** = instructor (ID, name, salary) — advisor — student (ID, name, tot_cred). Red labels **instructor.ID** and **student.ID** are written over the two ID attributes.
- "Not unique names are renamed;
  - the name of the entity set combined with the name of the attribute forms a unique name."
- "Then Case 1 applies."
- ⭐ Red arrows go from "the name of the entity set combined…" to instructor.ID and student.ID.

### [S81] Example (renamed)
- The same instance picture as S77.
- "*primary-key(instructor)={instructor.ID}*  *primary-key(student)={student.ID}*"

### [S82] Primary Keys for Relationship Sets
- "**Example**: Consider *advisor* with attribute *date*:"
- The instance picture is the S77 one, with an oval **advisor** of dates between the tables. Traced:

| instructor | date | student |
|---|---|---|
| 76766 Crick | 3 May 2008 | 98988 Tanaka |
| 45565 Katz | 10 June 2007 | 12345 Shankar |
| 45565 Katz | 12 June 2006 | 00128 Zhang |
| 10101 Srinivasan | 6 June 2009 | 76543 Brown |
| 98345 Kim | 30 June 2007 | 76653 Aoi |
| 76543 Singh | 31 May 2007 | 23121 Chavez |
| 22222 Einstein | 4 May 2006 | 44553 Peltier |

- "E-R diagram: (*we'll see more later*)":
  - instructor (<u>ID</u>, name, salary) — advisor — student (<u>ID</u>, name, tot_cred), with plain lines;
  - the relationship attribute **date** is a small box attached to the advisor diamond by a **dashed line**.

### [S83] Primary Keys for Relationship Sets (cont.)
- "A **super-key** for *advisor* is: *primary-key(instructor)* ∪ *primary-key(student)* = = {*instructor.ID*, *student.ID*}."
- The cases (each bullet has a small hand, pencil or check-mark icon):

| "Suppose advisor is…" | "primary key for advisor" |
|---|---|
| many-to-many | = {instructor.ID, student.ID} |
| many-to-one from *student* to *instructor* | = {student.ID} |
| many-to-one from *instructor* to *student* | = {instructor.ID} |
| one-to-one | is instructor.ID **or** student.ID |

- ⭐ For the one-to-one case, a red annotation "**designer's decision**" points at the underlined "or".
- Rule behind the table: if each entity of one side appears in at most one relationship, that side's key alone identifies the relationship.

### [S84] Example (cont.)
- The same instance picture (advisor with date, black box).
- "Mapping cardinality is many-to-one from *student* to *instructor*: primary key for *advisor* is {*student.ID*}."
- Why, in the data:
  - every student appears **once** (one advisor each), so student.ID identifies each relationship;
  - Katz appears **twice** (Shankar, Zhang), so instructor.ID would not.

**▸ Section 6 of the outline: Entity Integrity Revised, Weak Entities (S85–S90)**

### [S85] Outline — "6 Entity Integrity *Revised*: Weak Entities" highlighted

### [S86] Divider — "Entity Integrity *Revised* — or: Keys for *Weak* Entity Sets"
- ⭐ "*Weak* Entity Sets" is in red.

### [S87] Weak Entity Sets
- "An entity set that does not have sufficient attributes to form a primary key is termed a **weak entity set**."
  - "Otherwise, it is termed a (**strong**) **entity set**."
- "For a weak entity set to be meaningful, it must be associated with another entity set, called the **identifying** or **owner entity set**."
- "A weak entity is associated with an identifying entity; so it is said to be **existence dependent** on the identifying entity set."
- "Relationship associating the weak entity set with the identifying entity set is **identifying relationship**."
- ⭐ All the bold terms are highlighted in cyan.
- Link to S69: "existence-dependent" is exactly the slide's label for **total** participation. So a weak entity set participates **totally** in its identifying relationship (see the double line in S88/S90 and the (1,1) in S94).

### [S88] Weak Entity Sets: Diagramming
- "Weak entity sets together with their **owners** are usually represented this way (see "*section*" side):"
- Diagram:
  - **course** (<u>course_id</u>, title, credits), a normal rectangle;
  - an **arrowhead points into course** from the diamond;
  - **sec_course** is a **double-outlined diamond**;
  - a **double line** joins sec_course to **section**;
  - **section** is a **double-outlined rectangle** with sec_id, semester, year, all with **dashed underlines**.
- ⭐ Blue arrows go from the word "owners" to *course* and from below to *section*.

### [S89] Example
- "Consider a *section* entity, which is uniquely identified by a course identifier, semester, year, and section identifier.
  - Section entities are related to course entities.
  - Suppose we create a relationship set *sec_course* between entity sets *section* and *course*.
  - Observe: **information** in *sec_course* is **redundant**." ("information" and "redundant" are in blue.)
- "E-R diagram: (*we'll see more later*)":
  - course (course_id, title, credits) ← sec_course → section;
  - section's attributes are **course_id**, semester, year, sec_id;
  - this is a plain diamond and plain rectangle, with a double line on the section side.
- ⭐ **course_id** is boxed in blue in *both* course and section. Red arrows go from "redundant" to both boxes.
- The redundancy: section already stores course_id, so the link that sec_course records is stored twice.

### [S90] Example (cont.)
- "**Solution 1**: not to use relationship set *sec_course*
  - not desirable (relationship between *section* and *course* becomes implicit in an attribute - *course_id*)"
- "**Solution 2**:" diagram, with red labels:
  - **course** (<u>course_id</u>, title, credits) is the "**identifying entity set**";
  - **sec_course**, the double diamond with an arrowhead toward course, is the "**identifying relationship set**";
  - **section**, the double rectangle joined by a double line, is the "**weak entity set**";
  - its dashed-underlined *sec_id, semester, year* are grouped by a red brace labelled "**discriminator** (or: partial key)".
- "Primary key of *section* is: {*course_id*} ∪ *discriminator*." That is, {course_id, sec_id, semester, year}.
- Note that course_id is **no longer listed** among section's attributes. It comes from the owner.
- 🔎 Look up in Track B: what the primary key of an *identifying* relationship set (like sec_course) is. Not covered on the slides.

**▸ Section 7 of the outline: Example, Company DB (S91–S94)**

### [S91] Outline — "7 Example: Company DB" highlighted

### [S92] Divider — "Example — **Company DB** Conceptual Design"

### [S93] **CompanyDB**: Draw an equivalent E-R diagram (with Primary Keys!)
- ⭐ This is an exercise. The title is in red, with "(with Primary Keys!)". The sentences are numbered ① to ⑪ (verbatim):
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
  11. Employees have a unique "social security number" (*ssn*), day of birth (*Bdate*), a composite name (with components: *Fname* for first name,...), address, salary, and gender.
- ⚠️ In ⑨, "one and only department" should be "one and only **one** department".
- ⚠️ In ⑪, "day of birth (Bdate)" is presumably "**date** of birth" (Bdate = birth date).
- The full sentence-by-sentence analysis is in §5.

### [S94] A solution (numbers refer to each sentence) (header: "Example: Company DB | The E-R Model")
- ⭐ Every (min,max) label carries a red **circled sentence number** (①–⑪). One label has an **empty blue circle** instead.
- The title says "*A* solution", not "the" solution.
- **Entity sets** (lavender header boxes):
  - **Employee**:
    - <u>Ssn</u> ⑪, Bdate;
    - Name, with its components indented beneath it: Fname, …;
    - Address, Salary, Gender.
  - **Department**: <u>Name</u>.
  - **Project**: <u>Name</u>.
  - **Dependent**: a **double-outlined rectangle** (weak). Its only attribute is Name, with a **dashed underline**, marked ⑩.
- **Relationship sets.** All lines are single; each label sits on the line next to the entity set it belongs to.
  - **supervision** (to the left of Employee). One line leaves the top of Employee, runs over (labelled "**supervisor**") and down into the diamond; next to that segment are "(0,\*) ③" and a "⇓" symbol. The other line leaves the bottom of the diamond, labelled "(0,1) ③", and runs back (labelled "**supervisee**") into the bottom of Employee.
    - The "⇓" is not explained on the slide. It seems to mark the reading direction from supervisor to supervisee.
  - **works_for / have**: one diamond carrying two names, "works_for" above a bar and "have" below it. These match the verbs of sentence 1 ("work for") and sentence 2 ("have").
    - Employee line: **(0,\*) ①**. Department line: **(0,1) ②**.
  - **manage**: Employee line **(0,1) ④**; Department line **(1,1) ⑤**. Attribute **start_date** is attached to the manage diamond by a thin line.
  - **works_on**: Employee line **(0,\*) ⑥**; Project line **(1,\*) ⑦**. Attribute **hours** is attached by a thin line.
  - **controls**: Department line **(0,5) ⑧**; Project line **(1,1) ⑨**.
  - **have**: a **double-outlined diamond** (identifying relationship) below Employee. Employee line **(0,\*) ⑩**; Dependent line **(1,1)** with an empty **blue ○**, i.e. no sentence number.
- ⚠️ **works_for labels vs. sentences ① and ②** (details in §5.8):
  - Everywhere else on this slide the label next to an entity set gives *that* entity set's participation (look-here, S70–S72). Read that way, works_for says "an employee works for 0..\* departments" and "a department has 0..1 employees", which is the opposite of ① and ②.
  - By the slides' own rules the labels should be **Employee (0,1)** (or (1,1), if "must work for" means total participation as on S68) and **Department (1,\*)**.

**▸ Section 8 of the outline: LAB #1, Summary, End (S95–S99)**

### [S95] Outline — "8 LAB #1 : E-R Diagramming" highlighted

### [S96] Divider — "LAB #1: *Conceptual* Data Design\*"
- "\* Participation checked (2-3 members per working group)". ⭐ "Conceptual" is in red.

### [S97] LAB #1 : E-R Diagramming
- "*In class only (no slides provided).*" The lab content is not in the PDF, so anything done in the lab belongs in your own lab notes.

### [S98] Summary
- Lists the 8 sections of the week: 1 From Previous Week · 2 Conceptual Data Design · 3 Data and Data Relationships · 4 Data Semantics · 5 Data Constraints · 6 Entity Integrity *Revised*: Weak Entities · 7 Example: Company DB · 8 LAB #1 : E-R Diagramming. It adds no extra content.

### [S99] End of Slides
- "DATABASE — End of Slides — WEEK 3 — Code: W3.L1L2[LAB#1]".

---

## 3. Definitions & key terms (word for word)

| Term | Slide wording | Slide |
|---|---|---|
| Super-key (SK) | "A super-key for an entity set *E* is a set of one or more attributes of E that, taken collectively, allow us to identify uniquely an entity in *E*." | [S48] |
| Superset remark | "If K is a super-key for an entity set, then any superset of K is a super-key." | [S49] |
| Minimal | "Best super-keys are minimal, i.e., do not have a proper subset that is a super-key." | [S49] |
| Candidate key | "Minimal super-keys are called candidate keys." | [S49] |
| Primary key | "A primary key for an entity set *E* is a candidate key chosen by the database designer to uniquely identify/distinguish all entities in *E*." Remarks: "a primary key is for an entity set." "Primary keys must be chosen with care." | [S50] |
| Mapping cardinality / cardinality ratio | "Express the number of entities to which another entity can be associated via a relationship set." "Most useful in describing binary relationship sets." | [S52] |
| N | "N means *many* or *any number* (zero or more)" | [S52] |
| One-to-one (1:1) | "An entity in *A* is associated with at most one entity in *B*, and vice versa." | [S53] |
| One-to-many (1:N) | "An entity in *A* is associated with any number (0..\*) of entities in *B*; an entity in *B* is associated as before." | [S55] |
| Many-to-one (N:1) | "An entity in *A* is associated with at most one entity in *B*; an entity in *B* is associated with 0..\* entities in *B*." (⚠️ read the last *B* as *A*) | [S57] |
| Many-to-many (M:N) | "An entity in *A* is associated with any number (0..\*) of entities in *B*, and vice versa." | [S58] |
| Participate in | "…the entity sets E₁, E₂, …, Eₙ participate in R. Then, we also say that e₁, e₂, … eₙ participate in R." | [S62] |
| Total participation | "The participation of Eᵢ in R is total if every entity eᵢⱼ ∈ Eᵢ participates in at least one relationship in R." | [S62] |
| Partial participation | "Otherwise, the participation of Eᵢ in R is partial." | [S62] |
| Mapping cardinality's role | "…specifies *maximum* participation" | [S69] |
| Participation constraint (or: existence dependency) | "…of an entity set in a relationship set R - partial / total; specifies minumum [minimum] participation." Partial = "zero (optional participation, not existence-dependent)"; total = "one or more (mandatory participation, existence-dependent)". | [S69] |
| Structural constraints | mapping cardinality + participation constraint: "Together are called structural constraints of R." | [S69] |
| (Min,Max) participation, look-here approach | "A single line may have an associated minimum and maximum cardinality, shown in the form *l..h* or (*l,h*), where *l* is minimum and *h* maximum cardinality." | [S70] |
| Min 0 / min 1 | "A minimum of 0 indicates partial participation." "A minimum of 1 indicates total participation." | [S70] |
| Max 1 / max \* | "A maximum of 1 indicates that the entity participates in at most one relationship." "A maximum of \* (or a letter) indicates that the entity participates in the relationship with no limits." | [S70] |
| Role | "The function that an entity has or "plays" in a relationship, e.g. e₁ ∈ E₁ in relationship (e₁, e₂, … eₙ) within the relationship set R above is called role." | [S73] |
| Recursive relationship set / recursive participation | "An EMPLOYEE participates in SUPERVISION (i.e., a recursive relationship set) twice in two distinct roles: 1. supervisor (boss) 2. supervisee (subordinate) (called recursive participation)" | [S74] |
| primary-key(Eᵢ) | "…the set of attributes that forms the primary key for Eᵢ." | [S76] |
| Key of R, Case 1 (unique names) | "If R has no descriptive attributes, then the set primary-key(E₁) ∪ … ∪ primary-key(Eₙ) (\*) describes uniquely any relationship in R. Otherwise, let a₁, … aₘ be R's attributes. Then: primary-key(E₁) ∪ … ∪ primary-key(Eₙ) ∪ {a₁, … aₘ} describes uniquely any relationship in R." "In both cases, (\*) is a super-key for R." | [S78] |
| Key of R, Case 2 (non-unique names) | "Not unique names are renamed; the name of the entity set combined with the name of the attribute forms a unique name. Then Case 1 applies." | [S80] |
| PK of R vs. mapping cardinality | "Primary key for R depends of mapping cardinality!" M:N → {instructor.ID, student.ID}; many-to-one from student to instructor → {student.ID}; many-to-one from instructor to student → {instructor.ID}; one-to-one → "instructor.ID or student.ID" ("designer's decision") | [S78], [S83] |
| Weak entity set | "An entity set that does not have sufficient attributes to form a primary key is termed a weak entity set." | [S87] |
| (Strong) entity set | "Otherwise, it is termed a (strong) entity set." | [S87] |
| Identifying / owner entity set | "For a weak entity set to be meaningful, it must be associated with another entity set, called the identifying or owner entity set." | [S87] |
| Existence dependent | "A weak entity is associated with an identifying entity; so it is said to be existence dependent on the identifying entity set." | [S87] |
| Identifying relationship | "Relationship associating the weak entity set with the identifying entity set is identifying relationship." | [S87] |
| Discriminator (or: partial key) | The red label on the dashed-underlined attributes of the weak entity set (sec_id, semester, year). | [S90] |
| PK of a weak entity set | "Primary key of *section* is: {*course_id*} ∪ *discriminator*." | [S90] |

---

## 4. Constraint cheat-table

### 4.1 How each constraint is drawn and read

| Constraint | Drawn as (on the slides) | Read as | Slides |
|---|---|---|---|
| Primary key of an entity set | Attribute(s) **underlined** in the entity box (ID, course_id, Ssn, Name) | These attributes uniquely identify each entity | S48–S50, S54, S88, S94 |
| 1:1 | **Arrowheads at both** entity sets | Each A ≤ 1 B and each B ≤ 1 A | S53–S54 |
| 1:N (A:B) | **Arrowhead only at the "one" side** (instructor); plain line to the "many" side (student) | Each A with 0..\* B; each B ≤ 1 A | S55–S56 |
| N:1 (A:B) | No diagramming slide: it is 1:N seen from the other side | Each A ≤ 1 B; each B with 0..\* A | S57 |
| M:N | **No arrowheads** | Each A with 0..\* B and vice versa | S58–S59 |
| Total participation of E | **Double line** between E and the diamond | Every entity of E is in ≥ 1 relationship ("mandatory", "existence-dependent") | S62, S64, S69 |
| Partial participation of E | **Single line** | Some entity of E may be in no relationship ("optional") | S62, S66, S69 |
| (min,max) of E in R | `l..h` or `(l,h)` written on E's **single** line | Each entity of E is in at least *l* and at most *h* relationships of R | S70–S72 |
| Role | Role names on the two lines of a recursive relationship set (supervisor / supervisee); in instance figures the line labels 1 / 2 | The function the entity plays in that relationship | S73–S74, S94 |
| Relationship (descriptive) attribute | A box on a **dashed line** to the diamond (S82), or a name on a thin line (start_date, hours in S94) | An attribute of R, not of an entity set | S78–S79, S82, S94 |
| Weak entity set | **Double rectangle** | No PK of its own | S87–S88, S90, S94 |
| Identifying relationship | **Double diamond**; arrowhead to the owner; **double line** (total) on the weak side, or (1,1) in (min,max) notation | Links the weak entity set to its owner | S88, S90, S94 |
| Discriminator / partial key | **Dashed underline** | Owner's PK ∪ discriminator = PK of the weak entity set | S90, S94 |

### 4.2 (min,max) ⇄ cardinality ratio + participation

The slides' logic [S69–S70]: the **min encodes participation** (0 = partial, ≥1 = total) and the **max encodes mapping cardinality** (1 = at most one relationship, \* = no limit). Look-here [S72] means the label next to an entity set describes *that* entity set.

| Label on A's line | Label on B's line | Participation A / B | Ratio A:B | Same thing in arrow/line notation (S54–S66) |
|---|---|---|---|---|
| (0,1) | (0,1) | partial / partial | 1:1 | arrowheads at A and B; single lines |
| (0,\*) | (1,1) | partial / total | 1:N | arrowhead at A; double line at B. This is the advisor example with A = instructor, B = student (S56 + S64 = S71) |
| (1,1) | (0,\*) | total / partial | N:1 | arrowhead at B; double line at A |
| (0,\*) | (0,\*) | partial / partial | M:N | no arrowheads; single lines |
| (1,\*) | (1,\*) | total / total | M:N | no arrowheads; double lines |

The advisor constraint appears on the slides in all of its forms:
- **S56**: arrowhead into instructor (1-N).
- **S64**: double line on the student side (student total).
- **S71/S72**: instructor `0..*` = (0,M), student `1..1` = (1,1).
- **S84**: "many-to-one from student to instructor" (PK = {student.ID}).

The slides never draw the arrowhead and the double line together in one picture. Combining S56 and S64 is my synthesis; each piece is on the slides.

### 4.3 Exam traps (from the slides' own logic)

- **The max-1 side is the "many" (N) side.** In advisor, student has max 1 and instructor has max \*, yet the ratio is instructor:student = 1:N [S56, S71–S72, S84].
- **Arrowhead ≠ (min,max) side.** An arrowhead at instructor [S56] corresponds to **max 1 on the *student's* label** [S71]. A double line at student [S64] corresponds to **min 1 on the student's *own* label**.
- **Total = at least one, not exactly one** [S62, S67 Note]. (1,\*) is total too.
- **"N" / "many" includes zero** [S52]. Use (0,\*) for "can … many" and (1,\*) for "must have at least one".
- **Any superset of a super-key is a super-key**, but only *minimal* ones are candidate keys, and the PK is the candidate key the *designer* chooses [S49–S50].
- **A relationship's PK depends on its cardinality** [S78, S83]. Many-to-one from X to Y → PK = X's key. 1:1 → either key, the designer's decision.
- **A weak entity's discriminator alone is not a key.** Add the owner's PK [S90].

---

## 5. Worked examples & the Company DB exercise

### 5.1 Keys on student(ID, name, dept_name, tot_cred) [S48–S50]
1. By design, ID alone distinguishes students, so {ID} is a super-key [S48].
2. Every superset of {ID} ({ID,name}, {ID,dept_name}, …) is also a super-key [S49].
3. {ID} has no proper subset that is a super-key, so it is minimal, i.e. a **candidate key** [S49].
4. The designer picks a candidate key as the **primary key**, here ID [S50]. The NB says the designer could even decide {dept_name, tot_cred} is a SK [S48].

### 5.2 Reading instance pictures for mapping cardinality [S53–S58]

| Slide | A | B | Pairs | Why it is that ratio |
|---|---|---|---|---|
| S53 (1:1) | a1–a4 | b1–b3 | a1b1, a2b2, a3b3 (a4 alone) | every node has ≤ 1 line |
| S55 (1:N) | a1–a3 | b1–b5 | a1b1, a1b2, a2b3, a2b4, a3b5 | a's have many lines; each b has 1 |
| S57 (N:1) | a1–a5 | b1–b3 | a1b1, a2b1, a3b2, a4b3, a5b3 | each a has 1 line; b's have many |
| S58 (M:N) | a1–a4 | b1–b4 | a1b1, a1b2, a2b1, a3b3, a4b3 (b4 alone) | some a's and some b's have many lines |

### 5.3 Participation from a set R [S63, S65, S67]
- R = {(a₁,b₁),(a₂,b₂),(a₃,b₃)} with A = {a1,…,a4}, B = {b1,b2,b3}:
  - **B total** (all of b1, b2, b3 appear) [S63];
  - **A partial** (a4 never appears) [S65].
- R = {(a₁,b₁),(a₁,b₂),(a₂,b₃),(a₂,b₄),(a₃,b₅)} with A = {a1,a2,a3}, B = {b1,…,b5}: **both total** [S67]. a1 appearing twice changes nothing.

### 5.4 Roles in SUPERVISION [S74]
- Use the table under S74: label 1 = supervisor (boss), label 2 = supervisee (subordinate).
- Each employee appears with label 2 at most once, so each employee has at most one boss. Some employees never carry label 1.
- This is why the Company DB gives supervisor (0,\*) and supervisee (0,1) [S94 ③].

### 5.5 Keys for relationship sets [S77–S84]

| Situation | Key / super-key per the slides |
|---|---|
| advisor, PKs both named ID [S77] | Names clash, so Case 2: rename to instructor.ID, student.ID [S80–S81] |
| member_of(instructor, department) with *date* [S79] | Case 1 (ID ≠ dept_name): {ID} ∪ {dept_name} ∪ {date} is a super-key. By S78, {ID, dept_name} alone already is |
| advisor M:N [S83] | PK = {instructor.ID, student.ID} |
| advisor many-to-one from student to instructor [S83–S84] | PK = {student.ID}. In the S84 data each student appears once and Katz twice |
| advisor many-to-one from instructor to student [S83] | PK = {instructor.ID} |
| advisor one-to-one [S83] | PK = instructor.ID **or** student.ID (designer's decision) |

### 5.6 Weak entity set: course / section [S88–S90]
1. A section is "uniquely identified by a course identifier, semester, year, and section identifier" [S89]. Its own attributes (sec_id, semester, year) are not enough without the course, so **section is weak** [S87].
2. If section also stores course_id *and* we add sec_course, the same link is stored twice: "information in sec_course is redundant" [S89].
3. Solution 1, dropping sec_course, is "not desirable": the relationship becomes implicit in an attribute [S90].
4. Solution 2 makes section a **weak entity set** (double rectangle):
   - **owner / identifying entity set**: course;
   - **identifying relationship set**: sec_course (double diamond, arrowhead to course, double line to section);
   - **discriminator**: {sec_id, semester, year} (dashed underlines);
   - **PK(section)** = {course_id} ∪ {sec_id, semester, year} [S90].

### 5.7 The Company DB solution as a structured list [S93–S94]

**Entity sets**

| Entity set | Kind | Attributes (as drawn) | Primary key | Sentence |
|---|---|---|---|---|
| Employee | strong | Ssn, Bdate, Name (composite: Fname, …), Address, Salary, Gender | **Ssn** (underlined ⑪, "unique ssn") | ⑪ |
| Department | strong | Name | **Name** (underlined). No sentence fixes it: the designer's choice [S50] | n/a |
| Project | strong | Name | **Name** (underlined). The designer's choice | n/a |
| Dependent | **weak** (double rectangle) | Name (dashed underline = discriminator ⑩) | None of its own. By S90's rule: **{Ssn of the owner Employee} ∪ {Name}** | ⑩ |

**Relationship sets** (labels as drawn, each written next to the entity set it belongs to)

| Relationship set | Between | (min,max), side 1 | (min,max), side 2 | Attributes | Participation (from the mins) | Ratio (from the maxes) |
|---|---|---|---|---|---|---|
| works_for / have | Employee – Department | Employee (0,\*) ① | Department (0,1) ② | none | both partial, as drawn | as drawn: Employee:Department = 1:N ⚠️ (by the sentences: N:1) |
| manage | Employee – Department | Employee (0,1) ④ | Department (1,1) ⑤ | start_date | Employee partial; Department **total** | 1:1 |
| works_on | Employee – Project | Employee (0,\*) ⑥ | Project (1,\*) ⑦ | hours | Employee partial; Project **total** | M:N |
| controls | Department – Project | Department (0,5) ⑧ | Project (1,1) ⑨ | none | Department partial; Project **total** | Department:Project = 1:N (at most 5) |
| supervision (recursive) | Employee – Employee | role *supervisor* (0,\*) ③ | role *supervisee* (0,1) ③ | none | both partial | supervisor:supervisee = 1:N |
| have (identifying; double diamond) | Employee – Dependent | Employee (0,\*) ⑩ | Dependent (1,1) (blue ○) | none | Employee partial; Dependent **total** (existence dependent, S87) | Employee:Dependent = 1:N |

Compact sketch:

```
Employee [supervisor] ──(0,*) ③ ⇓── ◇ supervision ──(0,1) ③── Employee [supervisee]
Employee   ──(0,*) ①── ◇ works_for/have ──(0,1) ②── Department      ⚠️ see 5.8
Employee   ──(0,1) ④── ◇ manage ───────── (1,1) ⑤── Department      start_date on manage
Employee   ──(0,*) ⑥── ◇ works_on ─────── (1,*) ⑦── Project         hours on works_on
Department ──(0,5) ⑧── ◇ controls ─────── (1,1) ⑨── Project
Employee   ──(0,*) ⑩── ◈ have (double) ── (1,1) ○── ▣ Dependent (double box; Name dashed ⑩)
PKs: Employee.Ssn ⑪ · Department.Name · Project.Name · Dependent = {Ssn} ∪ {Name}
```

### 5.8 Sentence by sentence: what each one produces, checked against S94

| # | Sentence (verbatim, S93) | Constraint it produces (slides' rules) | What S94 shows | Check |
|---|---|---|---|---|
| ① | Each employee must work for at most one department. | works_for. Employee's max = 1 ("at most one"). Min: "must work for" → 1, i.e. total, as on S68; a literal reading of "at most one" alone gives 0. So **(1,1)** or (0,1) | (0,\*) ① on the Employee line | ⚠️ mismatch |
| ② | A department must have at least one employee (working for it). | works_for. Department min 1 (total), max \* → **(1,\*)** | (0,1) ② on the Department line | ⚠️ mismatch |
| ③ | Employees can supervise other employees and be supervised by at most one employee. | Recursive supervision with **roles** [S73–S74]: supervisor (0,\*) ("can supervise"), supervisee (0,1) ("at most one") | (0,\*) ③ supervisor; (0,1) ③ supervisee | ✓ |
| ④ | An employee can manage at most one department, and start date is stored. | manage. Employee (0,1). **start_date** is an attribute of manage | (0,1) ④; start_date on manage | ✓ |
| ⑤ | Every department must be managed, and by exactly one employee. The start date of managing is stored. | manage. Department (1,1): total, max 1. start_date again | (1,1) ⑤ | ✓ |
| ⑥ | Every employee can work on a project a number of hours. | works_on. Employee (0,\*) ("can"). **hours** is an attribute of works_on | (0,\*) ⑥; hours | ✓ |
| ⑦ | A project must have at least one employee working on it (for some hours). | works_on. Project (1,\*): total | (1,\*) ⑦ | ✓ |
| ⑧ | A department can control many projects, but no more than five. | controls. Department (0,5): the max is an explicit bound, 5 | (0,5) ⑧ | ✓ |
| ⑨ | All projects are controlled by one and only department. | controls. Project (1,1): total, max 1 | (1,1) ⑨ | ✓ |
| ⑩ | Employees can have dependents, weak entities identified by name. | **Dependent = weak entity set** [S87]; owner = Employee; identifying relationship = have; **discriminator = Name** [S90]; Employee (0,\*) ("can have") | double rectangle Dependent; double diamond have; Name dashed ⑩; (0,\*) ⑩ | ✓ |
| (implied) | none | Each dependent belongs to exactly one employee: Dependent (1,1), total, as a weak entity is "existence dependent" [S87] | (1,1) with a blue ○ (no sentence number) | ✓ (my reading of the blue ○) |
| ⑪ | Employees have a unique "social security number" (*ssn*), day of birth (*Bdate*), a composite name (with components: *Fname* for first name,...), address, salary, and gender. | Employee attributes; "unique" ssn → **PK Ssn**; Name is **composite** (Fname, …) | <u>Ssn</u> ⑪; Name with indented Fname, … | ✓ |

**⚠️ The works_for inconsistency in detail:**
- In S94, every other relationship follows look-here [S70–S72]. For example, ④ (0,1) sits next to Employee and means "an employee can manage at most one department".
- Read the same way, works_for as drawn means "an employee works for 0..\* departments" and "a department has 0..1 employees". That contradicts ① and ②.
- Swapping the two labels would fix ①'s max, but ②'s "**at least one**" (min 1) would still be missing.
- By the slides' rules the labels should be **Employee (0,1)** (or **(1,1)**) and **Department (1,\*)**. That makes works_for **many-to-one from Employee to Department**, i.e. N:1.
- Cross-check (Track A, not these slides): the professor's HW1 PDF (Figure 1, Company DB) prints the same (0,\*)/(0,1) pair. So this is how he draws it.
- 👉 Ask Prof. Agostini which reading he expects. In your own answers, follow the sentences plus the look-here rule, and say which reading you use.

### 5.9 Applying the key rules to the Company DB (my extension of S76–S83; not drawn on the slides)
- **Name clash (Case 2, S80).** "Name" is the PK attribute of Department, of Project and (as discriminator) of Dependent, and Employee has a composite attribute Name too. Rename to *Department.Name*, *Project.Name*, etc.
- **works_on** is M:N, so its PK is {Employee.Ssn, Project.Name} [S83]. Adding hours still gives a super-key [S78].
- **manage** is 1:1, so its PK is Employee.Ssn *or* Department.Name, the designer's decision [S83].
- **controls** is many-to-one from Project to Department, so its PK is {Project.Name}.
- **works_for**, read from the sentences, is many-to-one from Employee to Department, so its PK is {Employee.Ssn}. The labels as drawn would give {Department.Name}: one more sign that they are off.
- **supervision** is many-to-one from supervisee to supervisor, so its PK is the supervisee's Ssn.
  - 🔎 Look up in Track B: naming the two Ssn's of a recursive relationship set (role names). Renaming by entity-set name (S80) gives "Employee.Ssn" twice.

---

## 6. Likely quiz/exam questions (from these slides only)

**Q1 (MCQ).** Which statement is TRUE according to the slides?
A. Every super-key is a candidate key.
B. A candidate key is a minimal super-key.
C. A primary key is any super-key found in the data.
D. A superset of a super-key may fail to be a super-key.

**Q2 (MCQ).** In student(ID, name, dept_name, tot_cred), ID is a super-key "by design". Which set is **not** guaranteed to be a super-key?
A. {ID}  B. {ID, name}  C. {ID, dept_name}  D. {name, tot_cred}

**Q3 (MCQ).** "An entity in A is associated with at most one entity in B; an entity in B is associated with any number (0..\*) of entities in A." The mapping cardinality of R(A,B) is:
A. 1:1  B. 1:N  C. N:1  D. M:N

**Q4 (diagram reading).** In the instructor–advisor–student diagrams, what does each variant mean?
- (i) arrowheads into both instructor and student;
- (ii) an arrowhead only into instructor;
- (iii) no arrowheads;
- (iv) a double line between advisor and student.

Say in words what (ii) and (iv) mean for a student.

**Q5 (from a set).** A = {a1,a2,a3,a4}, B = {b1,b2,b3}, R = {(a1,b1),(a2,b2),(a3,b3)}. Give the participation of A and of B, and the mapping cardinality.

**Q6 (from a set).** A = {a1,a2,a3}, B = {b1,…,b5}, R = {(a1,b1),(a1,b2),(a2,b3),(a2,b4),(a3,b5)}. Is A's participation total even though a1 appears twice? Give both participations and the ratio.

**Q7 (MCQ).** According to the "Structural constraints" slide:
A. mapping cardinality specifies minimum participation, participation specifies maximum
B. mapping cardinality specifies maximum participation, participation specifies minimum
C. both specify maximum participation
D. "existence dependency" is another name for mapping cardinality

**Q8 (convert (min,max) → ratio and participation).** instructor —`0..*`— advisor —`1..1`— student.
- (a) State it in words.
- (b) Give each side's participation.
- (c) Give the mapping cardinality.
- (d) Write both labels in (l,h) form.
- (e) What is the primary key of advisor?

**Q9 (convert ratio and participation → (min,max)).** Give the look-here labels for R(A,B) when:
- (a) A:B = M:N, A total, B partial;
- (b) A:B = 1:1, both partial;
- (c) A:B = 1:N, both total.

**Q10 (roles).** Define *role*. In SUPERVISION, which entity set participates twice, in which roles, and what is this called? In the figure, what do the labels 1 and 2 mean, and who supervises e1?

**Q11 (keys of R, Case 1).** member_of(instructor E₁, department E₂) has the attribute *date*, with PK(E₁) = {ID} and PK(E₂) = {dept_name}. Which case applies? Give the slide's super-key for R and a smaller super-key.

**Q12 (keys of R, Case 2).** In advisor(instructor, student) both PKs are named ID. What must you do, and what are the renamed keys?

**Q13 (PK depends on cardinality).** Give the PK of advisor if it is:
- (a) M:N;
- (b) many-to-one from student to instructor;
- (c) many-to-one from instructor to student;
- (d) one-to-one.

Which case does the instance on S84 show, and how can you tell from the data?

**Q14 (identify the weak entity).** In course — sec_course — section (Solution 2), identify:
- the weak entity set,
- the identifying entity set,
- the identifying relationship set,
- the discriminator,
- the PK of section.

Then describe how each is drawn.

**Q15 (why weak).** Why is "information in sec_course redundant" if section stores course_id? What are Solution 1 and Solution 2, and why is Solution 1 not desirable?

**Q16 (sentence → constraint).** For Company DB sentences ③, ⑤, ⑦, ⑧ and ⑨, name the relationship set, the (min,max) on the relevant side, the participation and the ratio.

**Q17 (weak entity in Company DB).** Which entity set is weak in the Company DB solution? Give:
- its owner,
- its identifying relationship,
- its discriminator,
- its full primary key,
- the (min,max) on both lines.

**Q18 (draw / describe).** Draw or describe the E-R diagram, with PKs, for:
- ④ "An employee can manage at most one department, and start date is stored."
- ⑤ "Every department must be managed, and by exactly one employee. The start date of managing is stored."

What is the cardinality ratio, and what are the candidates for the relationship's PK?

**Q19 (keys in Company DB).** Department and Project both have the PK attribute "Name".
- (a) Which key case applies when you build keys for relationship sets?
- (b) Give the PK of *controls* and of *works_on*.

**Q20 (critical reading).** On S94, works_for has (0,\*) ① on Employee's line and (0,1) ② on Department's line. Check these against sentences ① and ② using the look-here rule, and give the labels the sentences imply.

### Answers

- **A1.** **B** [S49].
  - A is false: only minimal super-keys are candidate keys.
  - C is false: the PK is a candidate key "chosen by the database designer" [S50].
  - D is false: "any superset of K is a super-key" [S49].
- **A2.** **D**.
  - {ID} is a super-key by design [S48].
  - {ID,name} and {ID,dept_name} are supersets of ID [S49].
  - {name, tot_cred} is not implied. The NB on S48 only says a designer *could decide* a set like {dept_name, tot_cred} is a SK.
- **A3.** **C**, N:1 (many-to-one) [S57, with the typo corrected].
- **A4.**
  - (i) is 1:1 [S54]; (ii) is 1:N [S56]; (iii) is M:N [S59].
  - (ii): one instructor can advise many students, and each student has **at most one** instructor as advisor.
  - (iv): the student side is **total** [S64], so **every** student has at least one advisor.
- **A5.**
  - A is **partial**: a4 is in no pair [S65].
  - B is **total**: b1–b3 all appear [S63].
  - The ratio is 1:1: every a and every b is in at most one pair (the S53 picture).
- **A6.**
  - Yes. Total only needs every entity in **at least one** relationship. a1's two relationships do not matter [S67 Note].
  - Both A and B are total [S67].
  - A:B = 1:N: each b has one a, and a1 and a2 have two b's each (the S55 picture).
- **A7.** **B** [S69]. Participation is the one called "existence dependency".
- **A8.**
  - (a) "Instructor can advise 0 or more students. A student must have 1 advisor; cannot have multiple advisors." [S72]
  - (b) Instructor is partial (min 0); student is total (min 1) [S70].
  - (c) One-to-many from instructor to student (1:N), i.e. "many-to-one from student to instructor" [S56, S84].
  - (d) (0,M) or (0,\*), and (1,1) [S71].
  - (e) {student.ID} [S83–S84].
- **A9.** [S70, S52]
  - (a) A (1,\*), B (0,\*).
  - (b) A (0,1), B (0,1).
  - (c) A (1,\*), B (1,1): each A has many B's and each B exactly one A.
- **A10.**
  - Role: "The function that an entity has or "plays" in a relationship…" [S73].
  - EMPLOYEE participates twice, as **supervisor** (boss) and **supervisee** (subordinate). The relationship set is a **recursive relationship set**, and this is **recursive participation** [S74].
  - Label 1 = boss's participation, label 2 = subordinate's.
  - r1 joins e5 (label 1) and e1 (label 2), so **e5 supervises e1** [S74 figure].
- **A11.**
  - Case 1: the names ID and dept_name are unique.
  - The slide's super-key is {ID} ∪ {dept_name} ∪ {date} [S79].
  - Smaller: {ID, dept_name}, because "In both cases, (\*) is a super-key for R" [S78].
- **A12.** This is Case 2. "Not unique names are renamed; the name of the entity set combined with the name of the attribute forms a unique name". So use **instructor.ID** and **student.ID**, and then Case 1 applies [S80–S81].
- **A13.**
  - (a) {instructor.ID, student.ID};
  - (b) {student.ID};
  - (c) {instructor.ID};
  - (d) instructor.ID **or** student.ID, the "designer's decision" [S83].
  - S84 shows (b). Each student appears in exactly one pair, while Katz appears twice. So student.ID identifies every relationship and instructor.ID does not [S84].
- **A14.**
  - Weak entity set: **section** (double rectangle).
  - Identifying (owner) entity set: **course**.
  - Identifying relationship set: **sec_course**, a double diamond with an arrowhead toward course and a double line to section.
  - Discriminator (partial key): **{sec_id, semester, year}** (dashed underlines).
  - PK(section) = {course_id} ∪ discriminator = {course_id, sec_id, semester, year} [S88, S90].
- **A15.**
  - section already contains course_id, so the course–section link recorded in sec_course is duplicated [S89].
  - Solution 1 drops sec_course. It is "not desirable": the "relationship between section and course becomes implicit in an attribute - course_id".
  - Solution 2 makes section a weak entity set identified through course via sec_course, with PK = {course_id} ∪ discriminator [S90].
- **A16.** [S93–S94]
  - ③ **supervision** (recursive, with roles): supervisor (0,\*), supervisee (0,1). Both partial; supervisor:supervisee = 1:N.
  - ⑤ **manage**: Department (1,1), total. Together with ④ Employee (0,1) it is 1:1, with start_date on manage.
  - ⑦ **works_on**: Project (1,\*), total. Together with ⑥ Employee (0,\*) it is M:N, with hours on works_on.
  - ⑧ **controls**: Department (0,5), partial, at most 5 projects.
  - ⑨ **controls**: Project (1,1), total. Department:Project = 1:N.
- **A17.**
  - **Dependent** (double rectangle) [S94]. Owner: **Employee**. Identifying relationship: **have** (double diamond).
  - Discriminator: **Name** (dashed underline, ⑩).
  - Full PK = {Ssn} ∪ {Name}, by S90's rule "{owner's key} ∪ discriminator".
  - Labels: Employee (0,\*) ⑩ ("can have"); Dependent (1,1), total, "existence dependent" [S87].
- **A18.**
  - Employee(<u>Ssn</u>, …) —(0,1) ④— ◇**manage** [start_date] —(1,1) ⑤— Department(<u>Name</u>) [S94].
  - Both maxes are 1, so the ratio is **1:1**. Employee is partial; Department is total.
  - The PK of manage is Employee.Ssn **or** Department.Name, the designer's decision [S83]. Rename the clashing "Name" per Case 2 [S80].
- **A19.**
  - (a) Case 2, because the names are not unique. Rename to Department.Name and Project.Name [S80].
  - (b) **controls** is many-to-one from Project to Department (Project (1,1)), so its PK is {Project.Name}. **works_on** is M:N, so its PK is {Employee.Ssn, Project.Name} [S83].
- **A20.**
  - Look-here [S70–S72]: the label next to Employee gives each employee's participation.
  - Sentence ① ("at most one department") needs max 1, so **(0,1)**, or **(1,1)** if "must work for" means total as on S68.
  - Sentence ② ("must have at least one employee") needs **(1,\*)** next to Department.
  - As drawn, (0,\*)/(0,1) would mean an employee works for many departments and a department has at most one employee. That contradicts both sentences: an apparent slide error. Ask the professor, and state your reading in answers.

---

## 7. Self-check

- [ ] I can define **super-key, candidate key and primary key** word for word, and walk through the student(ID, …) example, including "by design!!!" and the superset remark [S48–S50].
- [ ] I can name the **four mapping cardinalities**, recognise each in an instance picture, and draw 1:1, 1:N and M:N with arrowheads [S52–S60].
- [ ] I can decide from a set R whether each entity set's participation is **total or partial**, and draw it with **double or single lines** [S62–S68].
- [ ] I can explain why mapping cardinality and participation together are the **structural constraints**: max vs. min participation, optional vs. mandatory or existence-dependent [S69].
- [ ] I can **convert both ways** between look-here (min,max) labels and ratio plus participation, remembering that the max-1 side is the N side and that an arrowhead corresponds to max 1 on the *other* label [S56, S64, S70–S72, S84].
- [ ] I can explain **roles** and read the SUPERVISION figure with labels 1 and 2 [S73–S74].
- [ ] I can build a **super-key for a relationship set** (Case 1, Case 2 renaming) and choose its **primary key from the mapping cardinality** [S76–S84].
- [ ] I can identify and draw a **weak entity set**, its owner, identifying relationship and discriminator, and give its PK [S87–S90].
- [ ] I can turn each **Company DB sentence** into the right (min,max) label, reproduce the whole solution with PKs, and explain the **works_for** inconsistency [S93–S94].
