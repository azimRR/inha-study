# Quiz #2 + Midterm review — Database (from class slides & homework only)

> **Track A note:** everything here is from the professor's slides (weeks 1–6, 515 slides), HW1/HW2 and the syllabus. Week 7 slides are not uploaded yet (as of 19 Oct).
> - Sources: the ten verified notes files in `notes-by-week/`, the two HW PDFs and the README in `assignments/`, and `00 course info/Syllabus (from eclass).md`. The (min,max) slides were re-checked on the slide images (W3 S70, S72, S93, S94; W4 S7, S59, S60).
> - **Legend:** [W4-S59] = Week 4, slide 59 · ⭐ professor emphasis · ⚠️ slide error or inconsistency · 🔎 not on the slides, look it up in Track B · ✅ run in sqlite3 3.54 (not MySQL) · **practice** = a new exercise built with the slides' own method and new data.
> - Made with AI (Claude, Anthropic). If anything from this file goes into your HW #2, the HW #2 rule applies: declare the tool and model and include the prompt history [HW2 p.1, rule 5.1]. This file does **not** solve the HW #2 IT Park diagram; §2 practises the same method on a new domain.

---

## 0. Dates, rules, what each exam covers

| When | What | Source |
|---|---|---|
| **Tue 20 Oct, 12:00 noon** (system clock, strict) | **HW #2** due: one zip uploaded by the team leader | HW2 p.1; syllabus |
| **Fri 23 Oct** (week 7, 2nd class) | **Quiz #2**, in class, individual and timed, "on HW #2 contents and related topics". This is how HW #2 is graded. | syllabus |
| **Week 8 (24–30 Oct)** | **Midterm**: "Covers weeks 1–7 lecture material" | syllabus table |

- ⚠️ The syllabus table says the midterm covers weeks 1–7; its notes section says weeks 1–6. Ask. The exact midterm date and format are not in the class materials.
- Week 7 (Advanced SQL: advanced aggregation/windowing; integrity constraints (hints); triggers (hints); T Ch 4.4, 5.3, 5.5.2) is on the midterm but its slides are not uploaded yet. Add it when it appears.

**What Quiz #2 can ask.** HW2's final remark: "Be ready to complete any part of the tasks described above during an in-class quiz." So, alone and on the clock:

| HW2 task | What you must be able to do | Slides behind it |
|---|---|---|
| Ex 1 | E-R with (min,max) → "optimized" 3NF logical schema in the notation of the Company DB schema (HW2 Figure 1 = [W4-S59]). Add ≥ 2 attributes to each relation that comes from an entity set; "Two attributes shall be multivalue, and at least two attributes shall be composite." "(min, max) constraints" can **not** be ignored. | W3 S52–S94; W4 S28–S32, S57–S60 |
| Ex 2 | Write every table in SQL-92 and make clear how it models its (min,max) with UNIQUE / PRIMARY KEY / FOREIGN KEY / NOT NULL; extra code ("for instance, triggers") for the cardinalities those cannot model | W2 S41–S59; W5 S28–S39 |
| Ex 3 | MySQL: create schema "DB-HW2", import the tables (fix the syntax, "Debug if necessary"), insert ten rows per table with `INSERT INTO ... VALUES ();`, save `00X-ID-DDL.sql` and `00X-ID-DML.sql` | W2 S74–S79; W5 S42, S99–S100 |

Quiz #1 precedent: "Only for students who submitted Homework Assignment #1. No slides provided for Quiz #1" [W5-S108].

**HW #2 rules** [HW2 p.1–4]
- **Late or missing → 0**, and you are **not admitted to Quiz #2**. Teams of **1–3**; a team of 4+ is not admitted (nobody in it).
- **LaTeX mandatory** (Overleaf is fine). The cover lists full names, IDs and sections in increasing ID order, with the uploader's name underlined.
- **One zip**, uploaded by the "team leader", named `00X-ID` (00X = the uploader's section, ID = the uploader's ID). It holds: the `.tex`, the compiled `.pdf`, a folder of images (if any), `00X-ID-DDL.sql`, `00X-ID-DML.sql`.
- Tables in the document use LaTeX `listings` (`\usepackage{listings}`, `\lstset{language=SQL}`).
- The `.sql` files must be **neat and commented by you, not by AI**, with **no auto-generated MySQL system code** (if exported, "polish" them).
- **AI rule (5.1):** AI tools are allowed if you (1) "declare type and model … at the beginning of each exercise or subtask where you use it", and (2) "write the prompt and the complete promt's history, if successive steps of refinements are used".
- **Plagiarism (5):** the work must be your own. Plagiarism or cheating "either among teams or from existing material (e.g., from the Internet, etc.)" means **0/100 for all teammates** (equivalently, no entry to the next in-class quiz). You may not copy LaTeX, diagrams, code or other material from people or the web. Lying to course staff about it can mean an **F**. Violations go to the University disciplinary board. Ask the instructor (not the TA) if unsure.
- Syllabus: "Cheating in homework = 0/100 for every member of the group, for all future homework too." Homework is done in groups, but **evaluation is individual**, through the timed in-class quizzes.

**Grading (syllabus, relative grading)**

| Midterm | Final | Quizzes | Discussion | Attendance |
|---|---|---|---|---|
| **25%** | **35%** | **25%** | 10% | 5% |

- The average of the exams must not be "F" to pass. Attendance and participation include watching the posted video lectures on time.

---

## 1. QUIZ #2 PIPELINE (most urgent)

The pipeline: requirement sentences → E-R with (min,max) [W3] → 3NF logical schema with flipped labels [W4-S59] → `create table` with PK/FK/NOT NULL/UNIQUE + trigger list [W5, HW2] → `insert … values` [W5] → MySQL import [W2-S79].

### 1(a) Reading and writing (min,max) in the E-R diagram

**The two constraints the label combines** [W3-S69, "Together are called structural constraints of R"]

| Constraint | Specifies | Values | Drawn without (min,max) | Slides |
|---|---|---|---|---|
| Mapping cardinality (cardinality ratio) | **maximum** participation | 1:1, 1:N, N:1, M:N; ⭐ "N means many or any number (zero or more)" | arrowhead at the "one" side; no arrowheads = M:N | W3 S52–S59 |
| Participation (existence dependency) | **minimum** participation | total = "every entity … participates in at least one relationship"; otherwise partial | total = double line, partial = single line | W3 S62–S66 |

- Partial = "zero (optional participation, not existence-dependent)"; total = "one or more (mandatory participation, existence-dependent)" [W3-S69].
- ⭐ Total means **at least one**, not exactly one [W3-S67 Note].

**⭐ The look-here rule** [W3-S70]: "A single line may have an associated minimum and maximum cardinality, shown in the form l..h or (l,h)."
- "A minimum of 0 indicates partial participation. A minimum of 1 indicates total participation."
- "A maximum of 1 indicates that the entity participates in at most one relationship. A maximum of * (or a letter) indicates that the entity participates in the relationship with no limits."
- The pair sits **next to the entity it describes**: how many relationship instances **each entity of that set** takes part in. Class example [W3-S71, S72]: instructor `0..*` ("also: (0,M)") — advisor — `1..1` ("also: (1,1)") student = "Instructor can advise 0 or more students. A student must have 1 advisor; cannot have multiple advisors."

**Wording → (min,max).** The slides mark the modal verbs MUST / CAN / MAY in red [W3-S9] ("verb* with its "modality" (modal verbs)" [W3-S10]) and show the conversion by example (no rule list is printed):

| Words in the sentence | Gives | Class examples |
|---|---|---|
| **must**, or a plain statement "all … are …" | min **1** (total) | "If every employee must work for a department … participation … is total" [W3-S68]; "A student must have 1 advisor" [W3-S72]; ②⑤⑦⑨ |
| **can**, **may** | min **0** (partial), even after "every": ⑥ "Every employee **can** work on a project …" is (0,\*) | "Instructor can advise 0 or more" [W3-S72]; ③④⑥⑧⑩ |
| at most one, exactly one, one and only, cannot have multiple | max **1** | ③④⑤⑨; [W3-S72] |
| many, 0 or more, at least one | max **\*** (or M, N) | ②⑦; [W3-S72] |
| no bound stated | max **\*** (no limit) | ③ "can supervise other employees" → (0,\*); ⑥; ⑩ |
| an explicit bound ("no more than five", "maximum two") | max = that number | ⑧ "many, but no more than five" → (0,5); "(CAN) HAVE MAXIMUM TWO" [W3-S9] |

So the **modal verb decides the min** (must = 1, can/may = 0) and the **quantity decides the max**.

**Recipe (one relationship at a time)**
1. Nouns = entity sets, verb = relationship set [W3-S9].
2. Each side needs **its own sentence**; the sentence whose subject is entity E gives E's pair. Company DB: ①/② works_for, ④/⑤ manage, ⑥/⑦ works_on, ⑧/⑨ controls, ③ both roles of supervision, ⑩ Employee's side of have. The weak Dependent's (1,1) carries no sentence number, only an empty blue ○ [W3-S94]; my reading is that it follows from "existence dependent" [W3-S87].
3. min from the modal word, max from the quantity.
4. Write (min,max) on E's own line.
5. Read it back: "each E takes part in min..max relationships".
6. If asked for ratio and participation: min 0/1 → partial/total; for R(A,B), A:B = 1:N when A's max is \* and B's max is 1. advisor: instructor (0,\*), student (1,1) → instructor:student = 1:N = "many-to-one from student to instructor" [W3-S84]. ⚠️ The side with max 1 is the "N" side.

**Practice** (the slide's own example sentences [W3-S9]; my answers by the rule above)
- "STUDENTS – (MUST) REGISTER TO – CLASS" → Student (1,\*): must = min 1, no bound = \*.
- "STUDENTS – (CAN) HAVE MAXIMUM TWO – ADVISORS" → Student (0,2).
- "PERSON – … (MAY) BELONG TO – POLITICALPARTY" → Person (0,\*) as worded (no bound is given; "at most one party" would make it (0,1)). The other sides need their own sentences.

**Company DB check: sentence → label** [W3-S93, S94; W4-S7]

| # | Sentence (verbatim, W3-S93) | Label it gives (look-here) | Printed on S94 / S7 | |
|---|---|---|---|---|
| ① | Each employee must work for at most one department. | Employee **(1,1)** on works_for ("must" = 1, "at most one" = 1) | Employee (0,\*) | ⚠️ |
| ② | A department must have at least one employee (working for it). | Department **(1,\*)** on works_for | Department (0,1) | ⚠️ |
| ③ | Employees can supervise other employees and be supervised by at most one employee. | supervisor (0,\*), supervisee (0,1) | same | ✓ |
| ④ | An employee can manage at most one department, and start date is stored. | Employee (0,1) on manage; attribute start_date | same | ✓ |
| ⑤ | Every department must be managed, and by exactly one employee. The start date of managing is stored. | Department (1,1) | same | ✓ |
| ⑥ | Every employee can work on a project a number of hours. | Employee (0,\*); attribute hours | (0,\*) on S94, (0,M) on S7 | ✓ |
| ⑦ | A project must have at least one employee working on it (for some hours). | Project (1,\*) | (1,\*) on S94, (1,N) on S7 | ✓ |
| ⑧ | A department can control many projects, but no more than five. | Department (0,5) | same | ✓ |
| ⑨ | All projects are controlled by one and only department. | Project (1,1) | same | ✓ |
| ⑩ | Employees can have dependents, weak entities identified by name. | Employee (0,\*) on the identifying "have"; Dependent weak, discriminator Name | same; Dependent (1,1) ○ | ✓ |
| ⑪ | Employees have a unique "social security number" (ssn), day of birth (Bdate), a composite name (with components: Fname for first name,...), address, salary, and gender. | PK Ssn; Name composite | same | ✓ |

- ⚠️ **works_for slip.** Read look-here, the printed works_for pair (Employee (0,\*), Department (0,1), on W3-S94, W4-S7 and HW1 Figure 1) says "an employee works for many departments, a department has at most one employee". That contradicts ① and ②.
- The 3NF schema [W4-S59] has Employee (1,\*) / Department (1,1). That is exactly the flip of Employee (1,1) / Department (1,\*), the labels ① and ② give (see 1(b)). So the E-R labels look like the professor's slip. **Ask him**; in answers, follow the sentences and say which reading you use.

### 1(b) Mapping E-R → 3NF logical schema (the professor's notation, read off W4-S7 → S59)

**Notation of the schema** [W4-S59, HW2 Figure 1]
- One box per relation: name on top, attributes below, **PK underlined** (written <u>Ssn</u> here), FKs marked **"(FK)"**.
- Each FK is a line from the FK's table to the referenced table, **arrowhead at the referenced table**, the relationship name in parentheses, and a (min,max) at **both** ends.
- Crow's-foot version [W4-S60]: circle = min 0, single bar = 1, crow's foot = max many (\*, M, N, 5). Where a crow's foot appears, it is at the table that holds the FK; (manages) has none, because both its maxes are 1.

**What happens to each E-R construct** (the pattern S59 shows; the slides give no general mapping rules → 🔎 Track B for those)

| E-R construct | Company example | What S59 does |
|---|---|---|
| Strong entity set | Employee, Department, Project | one relation, same PK |
| Composite attribute | Name (Fname, Lname) | flattened with a prefix: **Name_Fname, Name_Lname** (1NF technique 3 [W4-S30, S32]) |
| Multivalued attribute | {Location} | new relation **D_Locations(<u>Location</u>, <u>D_Name</u> (FK))**, PK = value + owner's key (1NF technique 1 [W4-S30, S31]) |
| Derived attribute | Num_of_empl() | plain column **Num_of_empl** |
| 1:N relationship | works_for (Employee side max 1 by sentence ①), controls (Project side max 1) | FK in the table whose entity has **max 1**: **wf_D_Name** in Employee, **c_D_Name** in Project. (The printed S7 works_for labels would put it in Department: one more sign they are a slip.) |
| 1:1 relationship (+ attribute) | manage: Employee (0,1), Department (1,1), start_date | FK on the **total (1,1) side**: **m_E_Ssn** in Department; the attribute goes with it: **m_start_date** |
| Recursive 1:N (roles) | supervision | FK to its own table: **Supervisor_Ssn** in Employee (the supervisee's row holds its supervisor's Ssn); the link ends are named (supervisor) / (supervisee) |
| M:N relationship (+ attribute) | works_on (hours) | new relation **works_on(<u>E_Ssn</u> (FK), <u>P_Number</u> (FK), hours)**, PK = both FKs |
| Weak entity + identifying relationship | Dependent / have (double diamond) | **Dependent(<u>Name</u>, Relationship, <u>E_Ssn</u> (FK))**, PK = discriminator ∪ owner's PK [W3-S90]; link named (dependents_of) |

**The three 1NF techniques** [W4-S30]: ⭐ 1. "Remove attribute and place in separate relation." (red; shown on S31) · 2. "Expand the primary key to include the attribute." · 3. "Use several atomic attributes." S59 uses 1 for multivalued and 3 for composite attributes.

**Naming convention** (visible in S59)
- FK = relationship initials + referenced-table initial + its PK: **wf_**D_Name (works_for), **m_**E_Ssn (manages), **c_**D_Name (controls).
- A relationship attribute takes the same prefix: **m_**start_date.
- In new tables: table initial + PK: E_Ssn, P_Number, D_Name. Recursive: role + PK: **Supervisor_Ssn**.
- Link names: (manages), (works_for), (controls), (supervision) with (supervisor)/(supervisee), (dependents_of), (has); the two works_on links are unnamed.

**⭐ The label-flip rule** (verified on the images W4-S7 vs S59)
- Every (min,max) pair from the E-R diagram sits at the **opposite end** in the schema.
- Read the schema like this: **the label next to table T = how many rows of T go with one row at the other end.**
- Colour: labels carried over from the E-R are **red**, except works_on's (0,M) and (1,N), which are printed **black**. The **blue** labels are new ones created by the mapping: the (has) pair for D_Locations, and the (1,1) at Employee and at Project on the works_on links.

| S59 link (FK, in table) | E-R labels [W4-S7], look-here | S59 labels | Read S59 as |
|---|---|---|---|
| (supervision): Supervisor_Ssn, Employee | supervisor (0,\*) ③ · supervisee (0,1) ③ | (supervisor) end **(0,1)** · (supervisee) end **(0,\*)** | an employee has 0..1 supervisor; a supervisor has 0..\* supervisees |
| (manages): m_E_Ssn, Department | Employee (0,1) ④ · Department (1,1) ⑤ | Employee **(1,1)** · Department **(0,1)** | a department has exactly 1 manager; an employee manages 0..1 departments |
| (works_for): wf_D_Name, Employee | Employee (0,\*) ① · Department (0,1) ② ⚠️ | Employee **(1,\*)** · Department **(1,1)** | a department has 1..\* employees (②); an employee works for exactly 1 department (①) |
| (dependents_of): E_Ssn, Dependent | Employee (0,\*) ⑩ · Dependent (1,1) ○ | Employee **(1,1)** · Dependent **(0,\*)** | a dependent belongs to exactly 1 employee; an employee has 0..\* dependents |
| (controls): c_D_Name, Project | Department (0,5) ⑧ · Project (1,1) ⑨ | Department **(1,1)** · Project **(0,5)** | a project has exactly 1 controlling department; a department controls 0..5 projects |
| Employee–works_on: E_Ssn | Employee (0,M) ⑥ | Employee **(1,1)** blue · works_on **(0,M)** | a works_on row has exactly 1 employee; an employee has 0..M works_on rows |
| works_on–Project: P_Number | Project (1,N) ⑦ | works_on **(1,N)** · Project **(1,1)** blue | a project has 1..N works_on rows; a works_on row has exactly 1 project |
| (has): D_Name, D_Locations | {Location} has no label | Department **(1,1)** blue · D_Locations **(0,\*)** blue | a location row belongs to 1 department; a department has 0..\* location rows |

- Every row is an exact flip **except (works_for)**: S59 is the flip of Employee (1,1) / Department (1,\*), the labels sentences ① and ② give (see 1(a)).
- Crow's foot [W4-S60] on the same links: (1,1) single bar · (0,1) circle + bar · (0,\*), (0,M), (0,5) circle + bar + crow's foot · (1,\*), (1,N) bar + crow's foot.

**Quiz procedure**
1. List the entity sets; give each a relation with its PK (strong) or owner PK + discriminator (weak).
2. Flatten composites (A_B); move each multivalued attribute to its own relation (value + owner FK, both PK).
3. For each 1:N or 1:1 relationship, put the FK (with relationship-initial prefix) on the max-1 side (1:1: on the total side); move the relationship's attributes there with the same prefix.
4. For each M:N relationship, make a new relation (both FKs = PK, plus its attributes).
5. Recursive: FK to the same table, named role + PK.
6. Draw each link from the FK's table to the referenced table (arrowhead there), named after the relationship.
7. Flip every E-R pair to the other end; add the blue labels for new tables: (1,1) at the owner/participant end, (0,\*) or the E-R pair at the new table's end.
8. Check 3NF quickly: no composite or set values (1NF); no attribute depending on part of a multi-attribute key (2NF); no non-key attribute determining another (3NF) [W4-S57].

### 1(c) The Company DB, end to end

**E-R diagram** [W4-S7] (= HW1 Figure 1, the version S59 maps)
- **Employee**(<u>Ssn</u> ⑪, Bdate, Name {Fname, Lname} composite, Address)
- **Department**(<u>Name</u>, {Location} multivalued, Num_of_empl() derived)
- **Project**(<u>Number</u>, Name, Location)
- **Dependent** (weak, double box)(Name ⑩ dashed underline = discriminator, Relationship), owner Employee via the double-diamond **have**
- Relationships with labels: see the 1(a) table and the "E-R labels" column of the 1(b) table.
- ⚠️ W3-S94 (the first solution) differs: Employee also has Salary and Gender; Department and Project have only <u>Name</u> (so Project's PK is Name there); works_on is (0,\*) ⑥ / (1,\*) ⑦ instead of (0,M) / (1,N).

**3NF logical schema** [W4-S59] (PK underlined; FK → referenced table)

| Relation | PK | FKs | Comes from |
|---|---|---|---|
| **Employee**(<u>Ssn</u>, Bdate, Name_Fname, Name_Lname, Address, wf_D_Name (FK), Supervisor_Ssn (FK)) | Ssn | wf_D_Name → Department (works_for); Supervisor_Ssn → Employee (supervision) | entity Employee + works_for + supervision |
| **Department**(<u>Name</u>, m_E_Ssn (FK), m_start_date, Num_of_empl) | Name | m_E_Ssn → Employee (manages) | entity Department + manage |
| **D_Locations**(<u>Location</u>, <u>D_Name</u> (FK)) | {Location, D_Name} | D_Name → Department (has) | multivalued {Location} |
| **Project**(<u>Number</u>, Name, Location, c_D_Name (FK)) | Number | c_D_Name → Department (controls) | entity Project + controls |
| **works_on**(<u>E_Ssn</u> (FK), <u>P_Number</u> (FK), hours) | {E_Ssn, P_Number} | E_Ssn → Employee; P_Number → Project | M:N works_on |
| **Dependent**(<u>Name</u>, Relationship, <u>E_Ssn</u> (FK)) | {Name, E_Ssn} | E_Ssn → Employee (dependents_of) | weak Dependent + have |

- The deck never lists FDs for these six tables, so "3NF" is stated, not proved on the slides. Quick check with [W4-S57]: no set or composite values remain; the multi-attribute keys (D_Locations, works_on, Dependent) have no attribute that depends on part of the key; no non-key attribute determines another.

### 1(d) SQL DDL as taught, and which constraint models which (min,max)

**What the slides teach** [W5-S28–S39]
```sql
create table r
     (A1 D1,
      A2 D2,
      ...,
      An Dn,
      (integrity-constraint1),
      ...,
      (integrity-constraintk));                            -- [W5-S33]
```
- Constraints [W5-S35]: `not null` · `primary key (A1, ..., An)` · `foreign key (A1, ..., An) references r`. ⭐ "NB: primary key declaration on an attribute automatically ensures not null".
- Variant: the PK right after the type, `ID varchar(5) primary key,` [W5-S37].
- Types [W5-S31–S32]: `char(n)`, `varchar(n)`, `int`, `smallint`, `numeric(p,d)` (p digits, d after the point: numeric(3,1) stores 44.5 but not 444.5 or 0.32), `real`, `double precision`, `float(n)`.
- `alter table r add A D;` (existing tuples get *null*) · variant `alter table r add constraint;` · `alter table r drop A;` [W5-S38] · `drop table r;` [W5-S39] · `delete from r;` [W5-S41].
- **`unique`**: HW2 lists "UNIQUE Constraint" with the other three, but no slide shows its syntax. Below it is written `unique (A)`, like `primary key (…)` ✅ (sqlite accepts it); check the form in the MySQL lab 🔎.
- **Dates**: no date type is on the slides, so dates are `char(10)` holding 'YYYY-MM-DD' here. 🔎 Track B: MySQL's date type.

**Which (min,max) each constraint can express** (my application of the class definitions: FK [W2-S53], PK NB [W5-S35], look-here [W3-S70], read in the S59 direction). T holds the FK column X; U is the referenced table.

| In table T | Class meaning | (min,max) it expresses |
|---|---|---|
| `foreign key (X) references U`, X nullable | X must match a PK value of U "— if not null! —" [W2-S53] | **(0,1) at the U end**: each T row goes with at most one U row |
| … + `not null` on X (or X in T's PK) | X must have a value | **(1,1) at the U end** |
| `unique (X)` | no two T rows share an X value | **(0,1) at the T end**: each U row goes with at most one T row (1:1) |
| nothing more | — | **(0,\*) at the T end** (the default) |
| `primary key` of a weak / multivalued / M:N table (owner FK inside it) | key = value or discriminator + owner's PK; no duplicate pair | (1,1) at the owner's end (blue for the new D_Locations / works_on tables, red for the weak Dependent); the same pair cannot be stored twice |
| **needs a trigger** (HW2: "the cardinality mapping you don't know how to model" with the four constraints) | — | **min 1 at the T end** ((1,\*), (1,N)) and **any max other than 1 or \*** ((0,5)) |

- Triggers are week 7 material ("triggers (hints)", syllabus), and those slides are not uploaded; HW2 lets you have an AI tool generate them (declare it). So for the quiz: name the constraint and give the **trigger idea in words**. Syntax: week 7 / 🔎 Track B.

**Complete Company DB DDL** ✅ (runs in sqlite3 with foreign-key checking on; every constraint tested below)
```sql
create table Employee
     (Ssn            char(9),                 -- 9-digit Ssn as on [W4-S29]
      Bdate          char(10),                -- 'YYYY-MM-DD'
      Name_Fname     varchar(15),             -- composite Name flattened
      Name_Lname     varchar(15),
      Address        varchar(30),
      wf_D_Name      varchar(15) not null,    -- (works_for): (1,1) at Department, sentence 1
      Supervisor_Ssn char(9),                 -- nullable: (0,1) at the supervisor end, sentence 3
      primary key (Ssn),
      foreign key (wf_D_Name) references Department,
      foreign key (Supervisor_Ssn) references Employee);

create table Department
     (Name           varchar(15),
      m_E_Ssn        char(9) not null,        -- (manages): (1,1) at Employee, sentence 5
      m_start_date   char(10),                -- relationship attribute, same prefix
      Num_of_empl    int,                     -- derived attribute stored as a plain column
      primary key (Name),
      unique (m_E_Ssn),                       -- (0,1) at Department: an employee manages <= 1, sentence 4
      foreign key (m_E_Ssn) references Employee);

create table D_Locations
     (Location       varchar(15),
      D_Name         varchar(15),             -- in the PK, so not null: (1,1) at Department
      primary key (Location, D_Name),
      foreign key (D_Name) references Department);

create table Project
     (Number         int,
      Name           varchar(15),
      Location       varchar(15),
      c_D_Name       varchar(15) not null,    -- (controls): (1,1) at Department, sentence 9
      primary key (Number),
      foreign key (c_D_Name) references Department);

create table works_on
     (E_Ssn          char(9),
      P_Number       int,
      hours          numeric(4,1),            -- relationship attribute
      primary key (E_Ssn, P_Number),          -- blue (1,1) at Employee and at Project
      foreign key (E_Ssn) references Employee,
      foreign key (P_Number) references Project);

create table Dependent
     (Name           varchar(15),             -- discriminator
      Relationship   varchar(10),
      E_Ssn          char(9),                 -- owner's PK
      primary key (Name, E_Ssn),              -- weak entity: discriminator + owner PK [W3-S90]
      foreign key (E_Ssn) references Employee);
```

**Table by table: what models which label** (the explanation HW2 Ex 2 asks for)

| Table | Modelled with PK / FK / NOT NULL / UNIQUE | Needs a trigger (idea in words) |
|---|---|---|
| Employee | wf_D_Name not null + FK → (works_for) (1,1) at Department ①. Supervisor_Ssn FK, nullable → (supervision) (0,1); (0,\*) supervisees = default ③ | (1,\*) at Employee ②: a department must keep ≥ 1 employee. Check on delete or update of an Employee row, and when a Department is added. |
| Department | m_E_Ssn not null + FK → (manages) (1,1) at Employee ⑤. unique (m_E_Ssn) → (0,1) at Department ④ | optional: keep Num_of_empl = number of its employees (or compute it with a scalar subquery [W6-S102]) |
| D_Locations | PK (Location, D_Name) + FK → (has) (1,1) at Department; (0,\*) default | — |
| Project | c_D_Name not null + FK → (controls) (1,1) at Department ⑨ | (0,5) at Project ⑧: before inserting a project, or changing its c_D_Name, count the department's projects and reject a 6th |
| works_on | PK (E_Ssn, P_Number) + 2 FKs → blue (1,1)s; no pair twice; (0,M) at works_on for an employee = default ⑥ | (1,N) at works_on for a project ⑦: every project must have ≥ 1 works_on row (check when a project is added, or a works_on row deleted) |
| Dependent | PK (Name, E_Ssn) + FK → (dependents_of) (1,1) at Employee ⑩; (0,\*) default | — |

**✅ Constraint tests** (sqlite3, foreign keys on, on the data of 1(e))
- **Rejected:** an employee with null wf_D_Name (NOT NULL) · an employee in department 'Sales' that doesn't exist (FK) · a supervisor that doesn't exist (FK) · a second department managed by the same employee (UNIQUE) · a department with null m_E_Ssn (NOT NULL) · a project with null c_D_Name (NOT NULL) · the same (E_Ssn, P_Number) twice (PK) · a dependent of a non-existing employee (FK) · a location of a non-existing department (FK) · deleting 'Research' while employees and projects refer to it (FK).
- **Accepted, so they need triggers:** a department nobody works for (②) · a 6th project for Research (⑧) · a project with no works_on row (⑦).
- Accepted and correct: the same dependent name under two different employees (PK = Name + E_Ssn).
- sqlite quirk: it accepted a dependent with a null E_Ssn. By the NB "primary key … automatically ensures not null" [W5-S35] that row is illegal; sqlite doesn't enforce the NB (same finding as the W5 notes).

**⚠️ Trap: the Employee ↔ Department cycle.**
- Employee.wf_D_Name (not null) references Department, and Department.m_E_Ssn (not null) references Employee. With foreign keys checked at once, **neither the first employee nor the first department can be inserted** ✅ (both fail in sqlite).
- Class-material way out: create Employee **without** the works_for FK, load the rows in order, then add the FK with the "alter table r add constraint" variant [W5-S38]:
```sql
alter table Employee add foreign key (wf_D_Name) references Department;
```
- ✅ The create-without-FK + ordered load runs in sqlite with checking on. The final `alter table … add foreign key` cannot run in sqlite (its `alter table` has no add-constraint); check it in MySQL 🔎.
- (In sqlite I also loaded everything in one transaction with checking deferred to the end. That is only a verification device, not class material.)
- 🔎 Track B (flagged in the W5 notes): does MySQL need `references Department (Name)` with the column list, and must the referenced table exist first?

### 1(e) INSERT … VALUES as taught

```sql
insert into instructor
      values (10211, 'Smith', 'Biology', 66000);                -- [W5-S42] values in schema order
insert into course (course_id, title, dept_name, credits)
      values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);   -- [W5-S99] with the column list
insert into student (ID, name, dept_name, tot_cred)
      values ('3003', 'Green', 'Finance', null);                -- [W5-S99], slide typo tot_credits fixed
insert into instructor
      select ID, name, dept_name, 20000
      from student
      where dept_name = 'Comp. Sci.' and tot_cred > 145;       -- [W5-S101] ("Comp.Sci" on the slide)
```
- [W5-S42]: "the values are specified in the order in which the corresponding attributes are listed in the relation schema." With a column list, they follow the list [W5-S99].
- [W5-S100], MySQL (priority/IGNORE options omitted): `INSERT [INTO] tbl_name [(col_name [, col_name] ...)] {VALUES | VALUE} (value_list) [, (value_list)] ...`. The red box is around `[, (value_list)]`: **one INSERT can carry several rows** ✅.
- [W5-S101]: "select" allows inserting a set of tuples; it "must be evaluated before insertions. (otherwise an insertion loop arises)".

**Company DB rows (3 per table)** ✅ Every PK/FK/NOT NULL/UNIQUE holds, and so do the trigger rules: each department has ≥ 1 employee, ≤ 5 projects, and each project has ≥ 1 works_on row. The departments and locations are the class's own (W4-S29/S31); the rest is invented.
```sql
-- 1. Employees: the top supervisor first (Supervisor_Ssn null), then the others
insert into Employee values ('888665555', '1967-11-10', 'Bobur', 'Aliev', 'Tashkent', 'Headquarters', null);
insert into Employee values ('333445555', '1975-12-08', 'Dilnoza', 'Karimova', 'Tashkent', 'Research', '888665555');
insert into Employee values ('987654321', '1981-06-20', 'Javlon', 'Saidov', 'Samarkand', 'Administration', '888665555');
-- 2. Departments: managers exist now; each employee manages at most one (unique)
insert into Department values ('Headquarters', '888665555', '2011-06-19', 1);
insert into Department values ('Research', '333445555', '2018-05-22', 1);
insert into Department values ('Administration', '987654321', '2015-01-01', 1);
-- 3. Multivalued locations (MySQL multi-row form [W5-S100] would also do)
insert into D_Locations values ('Houston', 'Headquarters');
insert into D_Locations values ('Bellaire', 'Research');
insert into D_Locations values ('Stafford', 'Administration');
-- 4. Projects: at most 5 per department
insert into Project values (1, 'Alpha', 'Bellaire', 'Research');
insert into Project values (2, 'Beta', 'Houston', 'Research');
insert into Project values (3, 'Gamma', 'Stafford', 'Administration');
-- 5. works_on: every project gets >= 1 employee
insert into works_on values ('333445555', 1, 20.0);
insert into works_on values ('333445555', 2, 10.0);
insert into works_on values ('987654321', 3, 40.0);
-- 6. Dependents: (Name, E_Ssn) must be new
insert into Dependent values ('Malika', 'Daughter', '333445555');
insert into Dependent values ('Rustam', 'Son', '333445555');
insert into Dependent values ('Nodira', 'Spouse', '987654321');
-- 7. Then: alter table Employee add foreign key (wf_D_Name) references Department;
```
- Gamma has only 987654321 working on it; Headquarters controls no project (Project (0,5) allows 0); 888665555 works on nothing (0,M allows 0).

**INSERT checklist for the quiz**
1. Values in schema order, or name the columns.
2. Strings in plain single quotes; numbers bare. The slides print curly quotes ‘…’; type plain ones (the W5 notes found sqlite rejects curly quotes).
3. Spell data values exactly: 'Comp. Sci.' ≠ 'Comp. Sci' (⚠️ [W5-S57]).
4. `null` only where neither NOT NULL nor the PK forbids it.
5. Parents before children (FK); supervisors before supervisees; a cycle needs the alter-table step above.
6. No duplicate PKs (the course insert twice → error ✅).
7. Respect the trigger rules too, even though MySQL won't stop you.
8. HW2 needs 10 rows per table. With `unique (m_E_Ssn)`, 10 departments need 10 different managers.

### 1(f) MySQL steps (W2 S74–S79) and HW2 Ex 3

1. Install a local server: **MySQL** (dev.mysql.com/downloads/), **XAMPP** or **MAMP**. With MAMP: host localhost, port 8889, user root, password root; MySQL "can be administered with phpMyAdmin" [W2-S75].
2. Class practice data: db-book.com → **Laboratory Material** → **Sample Tables** → ⭐ "**DDL for MySQL**" + ⭐ "**SQL code for creating small relations**" (smallRelationsInsertFile.sql) [W2-S76–S78].
3. phpMyAdmin: ⭐ **① New** = create the database (slide: DB-SOC3020; HW2: **DB-HW2**) → ⭐ **② Import** = load a .sql file [W2-S79]. Import the DDL first, then the data: the inserts need the tables.
4. The screenshots also show the **SQL** tab and the console ("Press Ctrl+Enter to execute query") [W2-S75, S79].
5. HW2 Ex 3: "To avoid any compilation error, edit the SQL code you wrote in LaTeX to match MySQL's syntax. Debug if necessary." Save exactly what you imported as `00X-ID-DDL.sql`; 10 rows per table → `00X-ID-DML.sql`; clean out MySQL-generated code; comment it yourself.
6. 🔎 Track B (MySQL points flagged in the notes): the `references r` column list; the referenced table existing first; a date type; whether `alter table … add foreign key` checks rows already loaded.

---

## 2. Mock Quiz #2 (practice) — Clinic DB

> **Practice**, built with the HW2 method on a new domain. Do it closed-book, timing yourself. Model answer: §9.7 (verified in sqlite3).

**The E-R diagram, in words** (look-here labels: each pair sits next to the entity it describes)
- **Doctor**(<u>ID</u>, Name {Fname, Lname} *composite*, {Phone} *multivalued*)
- **Ward**(<u>Code</u>, FloorNo)
- **Patient**(<u>ID</u>, Name)
- **Bed**: *weak* entity set (double box), owner Ward; BedNo (dashed underline = discriminator), BedType

| Relationship set | Ends and (min,max) | Attribute | Sentence |
|---|---|---|---|
| works_in | Doctor (1,1) — Ward (1,\*) | — | ① Each doctor must work in exactly one ward. ② A ward must have at least one doctor working in it. |
| heads | Doctor (0,1) — Ward (1,1) | start_date | ③ A doctor can head at most one ward; the start date is stored. ④ Every ward must be headed by exactly one doctor. |
| mentors (recursive on Doctor) | role mentor (0,\*) — role mentee (0,1) | — | ⑤ A doctor can mentor other doctors and be mentored by at most one doctor. |
| treats (M:N) | Doctor (0,\*) — Patient (1,\*) | diagnosis | ⑥ A doctor can treat many patients; each treatment's diagnosis is stored. ⑦ Every patient must be treated by at least one doctor. |
| contains (identifying, double diamond) | Ward (0,20) — Bed (1,1) | — | ⑧ A ward can contain many beds, but no more than 20. ⑨ Beds are weak entities identified by their number within the ward. |

```
Doctor (ID, Name{Fname,Lname}, {Phone})
  Doctor --(1,1)-- <works_in> --(1,*)-- Ward (Code, FloorNo)
  Doctor --(0,1)-- <heads> [start_date] --(1,1)-- Ward
  Doctor --(0,*)-- <treats> [diagnosis] --(1,*)-- Patient (ID, Name)
  Doctor --mentor (0,*)-- <mentors> --(0,1) mentee-- Doctor        (recursive)
  Ward   --(0,20)-- <<contains>> --(1,1)-- [[Bed]] (BedNo dashed, BedType)   (identifying; weak Bed)
```
(Each label is written next to the entity it belongs to.)

**Tasks**
1. Draw the **3NF logical schema** in the professor's notation: relations, PKs underlined, (FK) marks, link names, (min,max) at both ends (**flipped**). Mark which labels are new (blue).
2. Write the **CREATE TABLE** statements (SQL-92, class style). For each table, say which (min,max) it enforces and with which constraint.
3. Which (min,max) **need a trigger** (HW2 rule)? Give each trigger's idea in one sentence.
4. Write **3 INSERTs per table** in an order that loads without errors, and explain the order.

---

## 3. Week map

| Week (slides) | Topic | Core ideas | ⭐ Professor-emphasis slides | Expect |
|---|---|---|---|---|
| **W1** (1–53) | DBMS overview | DBMS = interrelated data + programs (convenient, efficient); 7 file-system drawbacks; 3 levels (view, logical, physical); logical vs physical data independence; schema (type) vs instance (value); data models; DDL vs DML; history (Bachman 1973, Codd 1970, SQL standard 1980s) | S4 def; S7/S45 architecture; S12 two/three-tier ("called SQL server if DBMS is Relational"); S22 "Data Integration Problem"; S29; S30; S32 purpose; S36; S41; S44; S46; S49; S51 | word-for-word definitions; list the drawbacks with class examples; MCQ on levels and independence |
| **W2 pt 1** (1–50) | Relational model, keys | table = **set** of tuples (order irrelevant); schema vs instance; domain, **atomic**, null; 4 kinds of data constraints, 2 kinds of integrity constraints; superkey → candidate (minimal) → primary (designer's choice) | S18; S21 "set!"; S24; S30 NB atomic; S32 Remark (not null = entity integrity); S35; S36; S41–S44; S43 "(Why?)"; S48 "NB: singular key, not keys!" | list all superkeys / candidate keys; "why is {ID,name} not a candidate key"; show a set is not a superkey from data |
| **W2 pt 2** (51–81) | Referential integrity, relational operations, MySQL setup | FK = r₂'s PK listed in r₁; must match "— if not null! —"; referencing vs referenced; generalized referential integrity (section → teaches, n = 4 < m = 5); schema diagram arrows = FK dependencies only; σ, ∏, natural join, ×, ∪, −, ∩ | S53; S54; S55–S58; S59 NB; S63; S70–S72 "similar"; S72 r ∩ s = r − (r − s); S76–S79 (Laboratory Material, DDL for MySQL, ① New ② Import) | does this insert/delete violate the FK?; compute RA results on small tables |
| **W3 pt 1** (1–44) | Conceptual design, E-R basics | DB design steps (conceptual design = Phase 2); requirement sentences NOUN–VERB–NOUN with modality; 3 E-R concepts; attribute types and notation; relationship set, degree, attributes, ternary, roles | S8; S9 (MUST/CAN/MAY red); S10; S11; S23; S24 (set vs type); S28 NB business-based; S30 {phone_number}; S32 notation; S41 roles | definitions; classify attributes; draw small E-R; degree |
| **W3 pt 2** (45–99) | E-R constraints, weak entities, Company DB | mapping cardinality (max) + participation (min) = structural constraints; **look-here (min,max)**; roles and recursion; keys of relationship sets (Case 1/2; PK depends on cardinality); weak entity sets (owner, identifying relationship, discriminator) | S48 "by design!!!"; S52 N includes zero; S62; S67 Note; S69; **S70**; S72; S78 yellow; S83 "designer's decision"; S87–S90; **S93–S94** | sentences → (min,max); ratio ↔ (min,max); relationship PK; weak entity PK; spot the works_for slip |
| **W4** (1–65) | Normalization 1NF–3NF | FD def, trivial; lossless join "extremely critical", dependency preservation "sometimes sacrificed"; 1NF + 3 techniques; full/partial FD → 2NF; transitive FD → 3NF (Codd and general); S57 summary; Company DB 3NF schema | S12; S13 NB; S14; S15; S21; S22; S23 lossy example; S24 NB + de-normalization; S28; S30 (technique 1 red); S35; S37; S39 "note this"; S41; S46; S49; S52; S56; **S57**; **S59–S60** | find FDs, prime attributes, partial/transitive; decompose to 3NF; highest normal form; Company mapping |
| **W5 pt 1** (1–63) | SQL intro: DDL, DML, basic queries | query languages (procedural vs not); SQL = DDL + DML; domain types; create/alter/drop table; constraints (NB PK ⇒ not null); insert, delete; select–from–where; select = projection, where = selection; duplicates kept; distinct/all; as; multi-relation queries | S19; S20; S22 yellow; S25 "Not all examples here may work"; S28; S35 NB; S39 "Why?"; S41; S42; S46 Notes; S48; S51; S55; S63 naming convention | write DDL with constraints; predict row counts; spot `'Comp. Sci'` |
| **W5 pt 2** (64–110) | Cartesian product, natural join, joins, modification | comma = Cartesian product; 3-step meaning of a query; natural join on **all** common attributes (trap); using / on; join def; delete (avg computed once), insert (values, column list, select), update (order matters, case), scalar-subquery update | S69 NB/Remark; S74; S77 primary vs derived; S80; S85; **S86–S87** "conceptually different"; S88–S89 similar vs equivalent; S91; S98; S101 Notes; S103 "(Why?)"; S105 | rewrite natural join ↔ comma + where; row/column counts; modification effects |
| **W6 pt 1** (1–57) | Outer joins, set operations, additional ops, nulls, aggregates | outer joins keep unmatched tuples (Snow); join type + condition; union/intersect/except [all]; as, `*`, order by, like, between, tuple comparison; null and 3-valued logic; aggregates, group by, having | S7; S8; S11; S12 NB; S14; S20–S23 "[all]"; S21 "to express the "and" we need a set operation!"; S25; S37–S38; S41; S44; **S49 Erroneous**; S50; S53 Observe; S54 | compute outer joins and set operations; null truth tables; write group by/having; find the error |
| **W6 pt 2** (58–107) | Nested subqueries | subquery def; where-tests: membership (in / not in, enumerated, multi-attribute), comparison (some / all), cardinality (exists / not exists); correlated subqueries; subqueries in from (named); scalar subqueries in select | S60; S63; S65/S67 Observe; S68; S71; S77–S78 "6+6!"; S82–S83; S85; S88; S90 "correlated subquery"; S91 Remark; S93; S97 Note; S100; S102 | write a query 3 ways (intersect/in/exists); some vs all; "taken all courses"; is it equivalent? |
| **W7** | Advanced SQL (not uploaded) | advanced aggregation/windowing; integrity constraints (hints); triggers (hints) | — | add when uploaded; triggers link to HW2 Ex 2 |

---

## 4. Definitions you must know word for word

> Quoted from the slides, with the slides' own typos kept (marked [sic] where it matters).

**4.1 DBMS, levels, models, languages**

| Term | Slide wording | Slide |
|---|---|---|
| DBMS | "A database-management system (DBMS) is a collection of interrelated data (i.e, information) about a particular enterprise together with a set of programs to access those data." "A DBMS provides an environment that is both *convenient* and *efficient* to use." | W1-S4 |
| Purpose | "A purpose of a database (management) system is to provide users with an *abstract* view of data." | W1-S32 |
| Physical level | "describes how a record (e.g., see instructor below) is physically stored." | W1-S35 |
| Logical level | "describes what data are stored in database, and the relationships among the data." | W1-S35 |
| View level | "application programs hide details of data types. Views can also hide information (such as an employee's salary or student's credits) for security/privacy purposes." | W1-S35 |
| Logical data independence | "property of DBMSs to allow change of conceptual schema (*logical level*) without having to change the external schemas (*view level*) and their associated application programs." | W1-S36 |
| Physical data independence | "property of DBMSs to allow change of the internal schema (*physical level*) without having to change the conceptual/logical schema to access data." | W1-S36 |
| Schema / instance | "Schema – the overall structure of the database" ("Analogous to the type of a variable in a program"); "Instance – the content of the database at a particular point in time" ("Analogous to the value of a variable") | W1-S37 |
| Data model | "A collection of conceptual tools for describing: Data and Data relationships / Data semantics / Data constraints (consistency, duplications, etc)" | W1-S41 |
| DDL / DML | "Data-Definition Language (DDL): to specify the (logical, physical) schema"; "Data-Manipulation Language (DML): to specify the operations to manage the (instances of) data, e.g.: Querying (information retrieval) / Inserting new data / Deleting existing data / Modifying existing data" | W1-S44 |
| "Pure" languages | "Relational algebra (*procedural*) / Tuple relational calculus (*non-procedural*) / Domain relational calculus (*non-procedural*)". "These languages are equivalent in computing power and expressiveness." "SQL (more expressive; based on pure languages)" | W1-S46; W5-S21 adds "(equivalent to FOL - First Order Logic)", "SQL (commercial, non-procedural)" |
| Data dictionary | "Stores **metadata**, that is, data *about* data, such as (for the Relational Model) data about relations" | W2-S7 |
| Query language | "Def. A query language is a language by which a user can access/update/delete data in a DBMS." | W5-S19 |
| Procedural / non-procedural | "Procedural: the user instructs the system to perform a sequence of operations on the database to compute the result." "Non-procedural: the user describes the desired result without defining the "how"." | W5-S20 |
| SQL = DDL + DML | "Although SQL is known as a "query language", it contains both DDL + DML components." | W5-S22 |

**4.2 Relational model, keys, integrity**

| Term | Slide wording | Slide |
|---|---|---|
| Relational database | "A relational database (RDB) consists of a collection of tables (also called relations), each of which is assigned a unique name." | W2-S18 |
| Table, tuple, attribute | "A table is a set of rows (or "tuples"), each row representing a relationship R among data in the table's columns (or "attributes")." Formally Table_R = {<d1,…dn> \| R(d1,…dn)}; with domains {<d1,…dn> ∈ D1 x …x Dn \| R(d1,…dn)} | W2-S18, S30 |
| Remark 1 | "The order in which tuples appear in a relation is irrelevant, since a relation is a *set* of tuples." | W2-S21 |
| Relation instance / schema | "A relation instance is the content of the relation, i.e., the values of all the relation attributes, at a given point in time." "A relation schema is the logical view of the relation. (So, it's its "design", or "structure".)" | W2-S21, S22 |
| DB schema / instance | "The schema of a database is the logical/conceptual view on it; say, its logical design." "An instance of a database is the content of all its relations, i.e., the values of all relations' attributes at a given point in time." "… as "variable type" / "variable value" in programming." | W2-S24 |
| Domain | "The set of allowed values for each attribute in a relation is called the domain of the attribute" | W2-S30 |
| Atomic | "NB: In the Relational Model, attribute values are required to be atomic; that is, indivisible." (e.g. "no set of departments allowed as a value of attribute dept_name") | W2-S30 |
| null | "The special value null is a member of every domain. Used to denote the value "unknown", or the value does not exist." Remark: "Some attributes' value is fixed "not null" by design ( entity integrity constraint )." | W2-S32 |
| Data constraints | "Domain constraints. Referential integrity constraints. Assertions (or "Business Rules"). Authorization." "Data constraints are defined by using DDL" | W2-S35 |
| Integrity constraints | "basically of two kinds: Entity (or: "identity") integrity constraints; Referential integrity constraints." | W2-S36 |
| Key (informal) | "A key for a relation R defines a data constraint on data in R, i.e., a constraint on the values that R's attributes may have." | W2-S37 |
| Superkey | "A superkey for a relation R is a set of one or more attributes that, taken collectively, allow us to identify uniquely a tuple in R." | W2-S41 |
| Candidate key | "If K is a superkey for a relation, then any superset of K is a superkey." "Best superkeys are minimal, that is, do not have a proper subset that is a superkey." "Minimal superkeys are candidate keys." | W2-S42 |
| Primary key | "A primary key for a relation R is a candidate key chosen by the database designer to identify uniquely a tuple in the relation R." Remarks: "a primary key is for a relation … a property of the relation (and not of the individual tuples)"; "Primary keys must be chosen with care (e.g., attributes's values don't change over time)." | W2-S44 |
| Foreign key | "A foreign key from relation r₁ referencing [or: to] relation r₂ is the primary key for r₂ listed in the attributes of r₁." | W2-S53 |
| FK (integrity) constraint | "The value of attributes in foreign key from r₁ referencing r₂ must match — if not null! — the values of attributes of primary key for r₂." | W2-S53 |
| Referencing / referenced | r₁ = "referencing relation of the foreign key dependency"; r₂ = "referenced relation of the foreign key dependency" | W2-S54 |
| Referential (integrity) key | "A referential (integrity) key from relation r₂ to relation r₁ is a combination of attributes <a₁,…,aₙ> of r₂ such that <a₁,…,aₘ> with n < m must appear in r₁. Note: <a₁,…,aₙ> *not* primary key for r₁"; Remark: "… requires aᵢ to be in r₁'s attributes, as a *part of* primary key for r₁." | W2-S55 |
| Schema diagram arrows | "NB: only foreign key dependencies (i.e., foreign integrity constraints) are depicted (see arrows)" | W2-S59 |

**4.3 E-R model**

| Term | Slide wording | Slide |
|---|---|---|
| Conceptual design | "The designer refers to data models, and by applying the concepts of the chosen model, translates the specified requirements into a conceptual schema (view) of the database." (Phase 2 [W3-S8]) | W3-S11 |
| E-R basic concepts | "The E-R model employs three basic concepts: entity set, relationship set, attribute (of entity and/or relationship sets)." | W3-S23 |
| Entity / entity set / extension | "An entity is a "thing" or "object" that exists and is distinguishable from other things and objects." "An entity set (or type) is a set of entities of same type that share the same properties (or: attributes)." "The extension of an entity set is the actual collection of entities belonging to the entity set." | W3-S26 |
| Set vs type | "An entity set in T is entity type in R." "A relationship set in T is relationship type in R." | W3-S24 |
| Attributes, PK | "… a set of attributes; i.e., descriptive properties possessed by all members of the set." "A subset of attributes forms a primary key of the entity set and uniquely identifies an entity in the set." | W3-S28 |
| Attribute types | "Simple and composite attributes. Single-valued and multivalued attributes (Notation: {phone_number}). Derived attributes – Can be computed from other attributes (age, given date_of_birth). Attributes may have value null" | W3-S30 |
| Relationship / relationship set | "A relationship is an association among entities". "A relationship set (or type) is a set of a [sic] mathematical relations among n ≥ 2 entities, each taken from some entity sets E₁ E₂, …, Eₙ, i.e.: R = {(e₁, e₂, … eₙ) \| e₁ ∈ E₁, e₂ ∈ E₂, …, eₙ ∈ Eₙ}" | W3-S34 |
| Degree | "The degree of a relationship set R is the number of entity sets Eᵢ that "participate" in R." | W3-S34 |
| Role | "Each occurrence of an entity set plays a "role" in the relationship set." "The function that an entity has or "plays" in a relationship … is called role." | W3-S41, S73 |
| Recursive | "An EMPLOYEE participates in SUPERVISION (i.e., a recursive relationship set) twice in two distinct roles: 1. supervisor (boss) 2. supervisee (subordinate) (called recursive participation)" | W3-S74 |
| Mapping cardinality | "Express the number of entities to which another entity can be associated via a relationship set." "Most useful in describing binary relationship sets." "N means many or any number (zero or more)" | W3-S52 |
| 1:1 / 1:N / N:1 / M:N | 1:1 "An entity in A is associated with at most one entity in B, and vice versa." 1:N "… any number (0..\*) of entities in B; an entity in B is associated as before." N:1 "… at most one entity in B; an entity in B is associated with 0..\* entities in B" (⚠️ read "in A"). M:N "… any number (0..\*) of entities in B, and vice versa." | W3-S53, S55, S57, S58 |
| Total / partial participation | "The participation of Eᵢ in R is total if every entity eᵢⱼ ∈ Eᵢ participates in at least one relationship in R. Otherwise, the participation of Eᵢ in R is partial." | W3-S62 |
| Structural constraints | mapping cardinality "specifies maximum participation"; participation constraint (or: existence dependency) "specifies minumum [sic] participation"; "Together are called structural constraints of R." | W3-S69 |
| (Min,Max), look-here | see 1(a): "A single line may have an associated minimum and maximum cardinality, shown in the form l..h or (l,h) …" | W3-S70 |
| Keys of relationship sets | Case 1 (unique names): "primary-key(E₁) ∪ … ∪ primary-key(Eₙ) … describes uniquely any relationship in R" (plus R's attributes if any); "In both cases, (\*) is a super-key for R." Case 2: "Not unique names are renamed; the name of the entity set combined with the name of the attribute forms a unique name." ⭐ "Primary key for R depends of [sic] mapping cardinality!" | W3-S78, S80 |
| Weak entity set | "An entity set that does not have sufficient attributes to form a primary key is termed a weak entity set. Otherwise, it is termed a (strong) entity set." | W3-S87 |
| Owner, existence dependence, identifying relationship | "… it must be associated with another entity set, called the identifying or owner entity set." "… so it is said to be existence dependent on the identifying entity set." "Relationship associating the weak entity set with the identifying entity set is identifying relationship." | W3-S87 |
| Discriminator | "discriminator (or: partial key)"; "Primary key of section is: {course_id} ∪ discriminator." | W3-S90 |

**4.4 Normalization**

| Term | Slide wording | Slide |
|---|---|---|
| Goals of good design | "Information preservation" and "Minimum redundancy" | W4-S10 |
| FD (NB) | "NB: The concept of functional dependency allows us to express constraints on a schema that we cannot express by using primary keys (superkeys)." | W4-S13 |
| Functional dependency | "A functional dependency on a relation schema r between two sets X and Y of attributes of r, denoted by X → Y, is a constraint on the possible tuples that can form an instance of r. The constraint is that, for every two tuples t₁ and t₂ in an instance of r, if t₁[X] = t₂[X], then it must also be t₁[Y] = t₂[Y]." | W4-S14 |
| Trivial FD; legal instances | "A functional dependency X → Y is trivial if Y ⊆ X." "A relation schema r's instances that satisfy the FDs among the relation's attributes are called legal relation instances (or: legal extensions) of r." | W4-S14 |
| Normalization process | "The normalization process (Codd, 1972), takes a relation schema through a series of "tests" to *certify* whether it satisfies a certain "normal form"." (1NF 1970; 2NF, 3NF 1971; BCNF Boyce–Codd 1974) | W4-S18 |
| Normal form | "The normal form of a relation schema refers to the highest normal form condition that it meets, and hence indicates the degree to which it has been normalized." | W4-S21 |
| Lossless join | "Non-additive (lossless) join property: guarantees that the spurious tuple generation problem does not occur with respect to the relation schemas created after decomposition by normalization." ⭐ "Extremely critical" | W4-S22 |
| Dependency preservation | "ensures that each functional dependency is represented in some individual relation resulting after decomposition." ⭐ "Desirable but sometimes sacrificed for other factors" | W4-S22 |
| De-normalization | "The de-normalization is the process of storing the join of higher normal form relations as a base relation, which is in a lower normal form." | W4-S24 |
| 1NF | "historically defined to disallow multivalued attributes or composite attributes, and their combinations. It states that: the domain of an attribute must include only atomic (simple, indivisible) values and the value of any attribute in a tuple must be a single value from the domain of that attribute." | W4-S28 |
| Full / partial FD | "A functional dependency X → Y is a full functional dependency if removal of any attribute A from X means that the dependency does not hold any more." "… is a partial functional dependency if some attribute A in X can be removed from X and the dependency still holds." | W4-S35 |
| Prime / nonprime | "An attribute of relation schema R is called a prime attribute of R if it is a member of some candidate\* key of R. An attribute is called nonprime if it is not a prime attribute …" ⭐ "\* the definition is general. Here we only need it to be primary key." | W4-S37 |
| 2NF | "A relation schema R is in second normal form (2NF) if every nonprime attribute A in R is fully functionally dependent on the primary\* key of R." (Codd, 1971) REMARK: a general definition says "on every candidate key" ("We don't need such generalization.") | W4-S39 |
| Transitive dependency | "A functional dependency X → Y in a relation schema R is a transitive dependency if there exists a set of attributes Z in R that is neither a candidate\* key nor a subset of any\* key of R, and both X → Z and Z → Y hold." | W4-S46 |
| 3NF (Codd) | "a relation schema R is in 3NF if it satisfies 2NF and no nonprime attribute of R is transitively dependent on the primary key." | W4-S49 |
| 3NF (general) | "A relation schema R is in 3NF if, whenever a nontrivial functional dependency X→A holds in R, either (a) X is a superkey of R or (b) A is a prime attribute of R." ("more general" because it does not use 2NF) | W4-S49, S52 |
| 3NF remark | "Normalization procedure to 3NF preserves the dependencies defined on the input schema." | W4-S56 |

**4.5 SQL**

| Term | Slide wording | Slide |
|---|---|---|
| SQL DDL | "allows the specification of information about relations, including: The schema for each relation. The domain and type of values associated with each attribute. Integrity constraints. Other information …" "Output of DDL stored into Data Dictionary (or: System Catalog) as specific DB data called metadata." | W5-S28 |
| NB primary key | "primary key declaration on an attribute automatically ensures not null" | W5-S35 |
| Query form, result | "select, from, and where are called clauses." "the result of a SQL query is a relation!" | W5-S46 |
| select / where | select "corresponds to "Projection""; where "corresponds to "Selection"" (in relational algebra) | W5-S48, S55 |
| Duplicates | "duplicates allowed in SQL queries' result. This contrast to definition of relations as sets"; "The optional keyword all specifies that duplicates should not be removed (as select)" | W5-S51, S53 |
| Meaning of a 2-relation query | "1. Generate the Cartesian product of the relations r and s listed in the from clause … 2. … apply the predicate P specified in the where clause. 3. For each tuple in the result of step 2, output the value of attributes specified in the select clause." | W5-S74 |
| Primary vs derived operations | "In blue are "derived" operations, that is, operations defined on other "primary" operations (in red)." (blue: natural join, intersection) | W5-S77 |
| Join | "Def: A join operation is a Cartesian product A x B which requires that tuples in the relations A and B match *under some condition*." | W5-S91, W6-S7 |
| Outer join | "Def. An extension of (Inner, Cross) Join (=Cartesian Product) that avoids loss of data (mismatch) when creating new information (by joining)." | W6-S8 |
| Join condition / type | "Join condition – defines which tuples in the two relations match, and what attributes are present in the result of the join." "Join type – defines how tuples in each relation that do not match any tuple in the other relation (based on the join condition) are treated." | W6-S14 |
| Set operations | "union, intersect and except (also called minus) operate on relations (sets); correspond to the mathematical (set-theoretical) operations ∪, ∩, and −" | W6-S17 |
| "Additional" | "\* "Additional" = Out of the scope of Data Model" | W6-S25 |
| null in SQL | "null means unknown value or a value does not exist." "Result of arithmetic expressions involving null is null" | W6-S37 |
| Three-valued logic | "Any comparison with null returns unknown"; ⭐ "If predicate P evaluates to either false or unknown in where clause for tuple t, then t is not added to the result" | W6-S38 |
| Aggregate functions | "Def: Aggregate functions are functions that operate on a collection (a set or a multi-set) of values of an attribute of a relation, and return a single value." (avg, min, max, sum, count) | W6-S41 |
| having | "Useful to state a condition that applies to groups of tuples rather than to all tuples (as we do with where clause)." | W6-S54 |
| Subquery | "Def: A subquery is a select-from-where expression (so, a subquery is a SQL query!) that is nested within another query." | W6-S60 |
| Subquery tests | "A common use of subqueries is to perform tests: for set membership; for set comparisons; for set cardinality (e.g., empty relations)." | W6-S63 |
| Enumerated set | "A set where elements are explicitly listed is called enumerated set" | W6-S68 |
| exists | "The exists clause returns the value true if the argument subquery is nonempty." exists r ⇔ r ≠ Ø; not exists r ⇔ r = Ø | W6-S88 |
| Correlated subquery | `section as S` = "correlation name"; the subquery that uses it is "called: correlated subquery" | W6-S90 (also W5-S105, W6-S65, S93) |
| Scalar subquery | "Scalar subquery is one which is used where a single value (i.e., one and only one row!) is expected." "Runtime error if subquery returns more than one result tuple." `department` inside it = "correlation variable" | W6-S102 |

---

## 5. Relational algebra sheet [W2-S63–S72 = W5-S7–S16]

"We concentrate on the following operations: selection of tuples/rows, projection (or: selection of attributes/columns), natural join, Cartesian product, union, set difference, intersection." Relational algebra is the *procedural* pure language [W1-S46, W5-S21].

| # | Operation (slide title) | Notation as printed | What it does (read off the example) | Slide example → result ✅ |
|---|---|---|---|---|
| 1 | Select – selection of rows | σ<sub>A=B and D > 5</sub>(r) | keeps the **rows** that satisfy the condition, all columns | r = {(α,α,1,7), (α,β,5,7), (β,β,12,3), (β,β,23,10)} → **{(α,α,1,7), (β,β,23,10)}** |
| 2 | Project – selection of columns | ∏<sub>A,C</sub>(r) | keeps the listed **columns**; a repeated row appears once | r = {(α,10,1), (α,20,1), (β,30,1), (β,40,2)} → (α,1), (α,1), (β,1), (β,2) "=" **{(α,1), (β,1), (β,2)}** |
| 3 | Natural Join | ⚠️ printed "**r + s**" | glues tuples with equal values on the **common attribute(s)**; the common attribute appears once | instructor (12) and department (7) on dept_name → **12 rows, 6 columns** (ID, name, salary, dept_name, building, budget) |
| 4 | Join – Cartesian Product | r x s | pairs **every** r-tuple with **every** s-tuple | r(A,B): 2 rows, s(C,D,E): 4 rows → **8 rows** over A,B,C,D,E |
| 5 | Union | r ∪ s | tuples in r **or** s (a shared tuple once) | r = {(α,1), (α,2), (β,1)}, s = {(α,2), (β,3)} → **{(α,1), (α,2), (β,1), (β,3)}** |
| 6 | Set difference | r – s | tuples of r **not** in s | → **{(α,1), (β,1)}** |
| 7 | Intersection | r ∩ s | tuples in **both** | → **{(α,2)}** |

- ⭐ For ∪, –, ∩: "Note: the two relations must be "similar", that is, of the same logical schema" [W2-S70–S72]. So r(A,B) ∪ s(C,D,E) is not allowed.
- ⭐ "Note: r ∩ s = r – (r – s)" [W2-S72]: r – (r – s) = {(α,1),(α,2),(β,1)} – {(α,1),(β,1)} = {(α,2)} ✓.
- ⭐ Colours [W2-S63, W5-S7] are explained on [W5-S77]: "In blue are "derived" operations, that is, operations defined on other "primary" operations (in red)". **Derived** = natural join, intersection. **Primary** = selection, projection, Cartesian product, union, set difference.
- "Knowledge emerges from DB' schemas" [W2-S27, S62]: answer a question by linking two relations on a shared attribute (dept_name).

**SQL counterparts as taught**

| Algebra | SQL | Slides |
|---|---|---|
| ∏ (projection) | the `select` clause; SQL keeps duplicates, so add `distinct` to get ∏'s result (4 rows vs 3 ✅) | W5-S48, S51, S53 |
| σ (selection) | the `where` clause | W5-S55 |
| × | relations separated by a comma in `from` ("Unconditional Join") | W5-S65, S67 |
| natural join | `natural join` | W5-S78–S81 |
| ∪ ∩ − | `union`, `intersect`, `except` (also called `minus`) | W6-S17 |

**Practice** (slide tables; results from the W2 notes, ✅)
- σ<sub>A=B</sub>(r) = {(α,α,1,7), (β,β,12,3), (β,β,23,10)}
- σ<sub>D > 5</sub>(r) = {(α,α,1,7), (α,β,5,7), (β,β,23,10)}
- ∏<sub>A</sub>(r) = {α, β}
- s – r = {(β,3)}
- tuples of r x s with A = C: (α,1,α,10,a), (β,2,β,10,a), (β,2,β,20,b)

---

## 6. Normalization recipe as taught [W4]

**Why** [W4-S10–S13]
- Goals of good design: **information preservation** and **minimum redundancy**.
- Measures of quality: clear semantics of attributes; redundant information and anomalies; NULL values; possibility to generate spurious tuples [S11].
- ⭐ "Measure of meaning is a degree of schema's normalization" [S12].
- ⭐ "FDs + primary keys + tests of conditions for normal forms … drives the normalization process" [S15].

**Recipe** (W4 notes §4.1, condensed)
0. **Inputs** [S15]: the schema, its designated PK, its FDs. Draw each FD as a line from the determinant to its dependents [S17].
1. **Prime vs nonprime** [S37]: prime = in the (primary) key — "Here we only need it to be primary key".
2. **1NF** [S28]: any set-valued or composite (nested) attribute? Fix it with a technique [S30]: ⭐ 1 separate relation (S31: DEPT_LOCATIONS(<u>Dnumber</u>, <u>Dlocation</u>)), 2 expand the PK, 3 several atomic attributes (S32: Projs-Pnumber, Projs-Hours).
3. **2NF** [S39]: matters only when the PK has ≥ 2 attributes [S57]. Does a *part* of the PK determine a nonprime attribute? That is a partial dependency [S35]. Fix [S41–S42]: one relation per partial key with its dependents, plus one relation with the original PK and its fully dependent attributes. ⭐ "nonprime attributes must be associated only with the part of the primary key on which they are fully functionally dependent."
4. **3NF** [S46–S49]: is there X → Z → Y with Z not a key? That is a transitive dependency. General test [S52]: every nontrivial X → A needs X superkey **or** A prime. Fix [S50, S55]: a new relation with the determining non-key attribute(s) as PK plus what they determine; the determinant **stays** in the old relation as the link.
5. **Check** [S22, S56]: lossless join ("Extremely critical"; otherwise spurious tuples [S23]) and dependency preservation (each FD whole inside one result relation). "Normalization procedure to 3NF preserves the dependencies defined on the input schema."
6. **Stop** at 3NF/BCNF [S24]. ⭐ "NB: Do not need to normalize to the highest possible normal form for performance reasons." **De-normalization** ("storing the join of higher normal form relations as a base relation") is a deliberate choice: the S25 table where "instructor and department not separated".

**⭐ Summary of Normal Forms 1st to 3rd** [W4-S57] (verbatim)

| Normal Form | Test | Remedy (Normalization) |
|---|---|---|
| First (1NF) | Relation should have no multivalued attributes or nested relations. | Form new relations for each multivalued attribute or nested relation. |
| Second (2NF) | For relations where primary key contains multiple attributes, no nonkey attribute should be functionally dependent on a part of the primary key. | Decompose and set up a new relation for each partial key with its dependent attribute(s). Make sure to keep a relation with the original primary key and any attributes that are fully functionally dependent on it. |
| Third (3NF) | Relation should not have a nonkey attribute functionally determined by another nonkey attribute (or by a set of nonkey attributes). That is, there should be no transitive dependency of a nonkey attribute on the primary key. | Decompose and set up a relation that includes the nonkey attribute(s) that functionally determine(s) other nonkey attribute(s). |

**The class examples**

| Example | FDs | Diagnosis | Result |
|---|---|---|---|
| DEPARTMENT(Dname, <u>Dnumber</u>, Dmgr_ssn, Dlocations) [S29–S31] | — | "Values of Dlocations are not atomic (but sets)" → not 1NF | DEPARTMENT(Dname, <u>Dnumber</u>, Dmgr_ssn) + DEPT_LOCATIONS(<u>Dnumber</u>, <u>Dlocation</u>), "these are in 1NF" |
| EMP_PROJ(<u>Ssn</u>, <u>Pnumber</u>, Hours, Ename, Pname, Plocation) [S36–S42] | FD1 {Ssn, Pnumber} → Hours (full); FD2 Ssn → Ename; FD3 Pnumber → {Pname, Plocation} | FD2, FD3 partial → "Not in 2NF" | EP1(<u>Ssn</u>, <u>Pnumber</u>, Hours), EP2(<u>Ssn</u>, Ename), EP3(<u>Pnumber</u>, Pname, Plocation) |
| EMP_DEPT(Ename, <u>Ssn</u>, Bdate, Address, Dnumber, Dname, Dmgr_ssn) [S47, S50] | FD1 Ssn → {Ename, Bdate, Address, Dnumber}; FD2 Dnumber → {Dname, Dmgr_ssn} | Ssn → Dnumber → Dmgr_ssn, Dnumber not a key → transitive → not 3NF (in 2NF: single-attribute PK) | ED1(Ename, <u>Ssn</u>, Bdate, Address, Dnumber), ED2(<u>Dnumber</u>, Dname, Dmgr_ssn) |
| (<u>ID</u>, name, salary, dept_name, building, budget) [S48, S51, S53] | dept_name → {building, budget}; FD0: ID → everything | "transitively dependent on ID"; general test: "dept_name not PK and budget not prime" → not 3NF | (slides stop at the diagnosis) by S57: instructor(<u>ID</u>, name, salary, dept_name) + department(<u>dept_name</u>, building, budget) |
| LOTS(<u>Property_id#</u>, County_name, Lot#, Area, Price, Tax_rate), candidate key {County_name, Lot#} [S54–S55] | FD1, FD2 (keys); FD3 County_name → Tax_rate; FD4 Area → Price | "Not in 3NF (but in 2NF; not in general 2NF because of FD3)" | step 1: LOTS1(<u>Property_id#</u>, County_name, Lot#, Area, Price) + LOTS2(<u>County_name</u>, Tax_rate); step 2: LOTS1A(<u>Property_id#</u>, County_name, Lot#, Area) + LOTS1B(<u>Area</u>, Price) |
| Lossy: employee(<u>ID</u>, name, street, city, salary) split into (ID, name) + (name, street, city, salary) [S23] | — | shared attribute name is not unique (two Kims) | natural join gives 4 rows, 2 of them **spurious**: violates the lossless-join property |

**Normalization traps**
- 2NF/3NF are about **nonprime** attributes; S57 says "nonkey", which is the same thing with the course's PK-only simplification [S37].
- A single-attribute PK cannot have partial dependencies ("(\*) Note the single attribute" [S54]). It can still fail **general** 2NF through a candidate key (LOTS, FD3) and fail 3NF.
- Highest form = "the highest normal form condition that it meets" [S21]: passes 2NF, fails 3NF → "in 2NF".
- Keep the link: Dnumber stays in ED1, Area in LOTS1A; otherwise you lose information (the S23 lesson).

---

## 7. SQL sheet as taught (W5–W6)

> ✅ results come from sqlite3 on the slides' own university tables (W5-S78–S79, S90; W6-S9, S18, S44–S45; student includes Snow 70557 from W6-S9). The slides print curly quotes; type plain ones. ⭐ "Not all examples here may work on your particular system!" [W5-S25].

**7.1 DDL and the "drastic" difference.** Create, constraints and types: see 1(d).
- `alter table r add A D;` gives existing tuples *null* for A [W5-S38].
- ⭐ "drop table r is a more drastic action than delete from r. Why?" [W5-S39]: `delete from r` removes ALL tuples but r still exists, so you can insert again [W5-S41]; after `drop table r`, "no data tuples can be inserted in it unless it is re-created by the create table".

**7.2 Basic query** [W5-S46–S63]

| Construct | Slide example | Note / ✅ result |
|---|---|---|
| `select A1,…,An from r1,…,rm where P;` | — | "select, from, and where are called clauses"; "the result of a SQL query is a relation!"; ";" "sometimes is missing" [S46] |
| select = Projection | `select name from instructor;` | 12 names [S50]; names are case insensitive (Name ≡ NAME ≡ name) |
| duplicates kept | `select dept_name from instructor;` | 12 rows: ⭐ "duplicates allowed in SQL queries' result" [S51] |
| distinct / all | `select distinct dept_name …` / `select all dept_name …` | 7 rows / 12 rows ("optional keyword all … (as select)") [S53] |
| arithmetic + rename | `select ID, name, salary * n as monthly_salary from instructor;` | + – \* / on constants or attributes; ⚠️ the slide forgot `from` [S54]; W6-S26 version `salary / 12 as monthly_salary` (⚠️ missing comma and from) |
| where = Selection | `select name from instructor where dept_name = 'Comp. Sci.' and salary > 70000;` | Katz, Brandt [S57–S58]; ⚠️ the slide's `'Comp. Sci'` returns 0 rows |
| predicate P | and, or, not; = > >= < <= (operands may be arithmetic) [S59] | "not equal" is written `<>` on W5-S105, W6-S38 and W6-S82–S83 |
| two relations | `select name, instructor.dept_name, building from instructor, department where instructor.dept_name = department.dept_name;` | 12 rows [S62–S63]; ⭐ "Note on naming convention: "instructor.dept_name"" (a bare dept_name is ambiguous ✅) |

**7.3 Additional basic operations** [W6-S25–S35] ("Additional" = "Out of the scope of Data Model")
- Rename relations: `from instructor as I, teaches as T where I.ID = T.ID and dept_name = 'Biology'` → (Crick, BIO-101), (Crick, BIO-301) [S27].
- Self-comparison: `select distinct T.salary from instructor as T, instructor as S where T.salary < S.salary and S.dept_name = 'Biology';` → 65000, 40000, 60000, 62000 [S29].
- `select *` = all attributes; `select * from instructor, teaches;` = 180 rows, ID twice [S30].
- `order by name` (asc is the default), `desc`, several keys: `order by salary desc, name asc` → Kim before Singh at 80000 [S31–S32].
- `like`: "% … matches any substring", "_ … matches any character"; `where name like '%dar%'` (⚠️ the slide opens with a double quote); `like '100\%' escape '\'` matches "100%" (⚠️ the slide's `'100 \%'` has a space) [S33].
- `where salary between 90000 and 100000` → Wu, Einstein, Brandt (Wu = 90000 is included ✅) [S34].
- Tuple comparison: `where (instructor.ID, dept_name) = (teaches.ID, 'Biology')` = the S27 condition [S35].

**7.4 Joins** [W5-S65–S91, W6-S7–S14]

| Form | Matches on | Common attribute in result | Class example ✅ |
|---|---|---|---|
| `from r, s` (Cartesian product, "Unconditional Join ("comma")") | nothing | twice (instructor.ID, teaches.ID) | instructor × teaches = 12 × 15 = **180** rows; ⭐ "not very useful directly, but useful if combined with the where clause" [W5-S69] |
| comma + `where` | the predicate | twice | `where instructor.ID = teaches.ID` → 15 rows [W5-S72] |
| `natural join` | **all** same-name attributes | once | instructor natural join teaches → 15 rows; Gold, Califieri, Singh missing ("so you don't want all instructors!") [W5-S79–S80] |
| `join … using (A)` | only A | once | `… join course using course_id` [W5-S85] (⚠️ needs `(course_id)`) |
| `join … on P` | P | **twice** | student join takes on student.ID = takes.ID: 22 rows, 10 columns. ⭐ "similar" to natural join [W5-S88]; "equivalent" to comma + where [W5-S89] |
| `natural left outer join` | common attributes, keeps all left tuples | once | student/takes: **23** rows; Snow gets 5 nulls [W6-S11] |
| `natural right outer join` | keeps all right tuples | once | **22** rows (no takes tuple lacks a student); ⭐ "NB: right outer join in this example is conceptually wrong!" [W6-S12] |
| `natural full outer join` | keeps both sides | once | CS students vs Spring 2009 takes: **5** rows with 'Comp. Sci.' (⚠️ 3 as printed) [W6-S13] |

- **Meaning of a query on two relations** [W5-S74]: (1) compute r × s; (2) apply the where predicate; (3) output the select attributes.
- **Join = type + condition** [W6-S14]. Types: (inner) join ("Cartesian Product" + condition), left / right / full outer join. Conditions: natural, `on <predicate>`, `using (A1, A2, …, An)` (⚠️ the slide prints A1, A1).
- ⭐ **Natural-join trap** [W5-S86–S87]: `instructor natural join teaches natural join course` also equates **dept_name**: "NB: conceptually different", "This is a wrong SQL code for the English query above!" Correct forms: `instructor natural join teaches, course where teaches.course_id = course.course_id`, or `… join course using (course_id)`. With `select *` the three forms give 12 / 11 / 10 columns ("NB1: not equivalent in schema!").

**7.5 Set operations** [W6-S17–S23] (r1 = Fall 2009 course ids, r2 = Spring 2010 course ids)

| Question words | SQL | Result ✅ |
|---|---|---|
| "either … or (or both)" | `(select …) union (select …)` | 8 ids (`union all`: 10, because CS-101 and CS-319 repeat) |
| "… and …" | `intersect` | CS-101 |
| "… but not in …" | `except` (also called minus) | CS-347, PHY-101 |

- `[all]` = "to retain all duplicates". The pictures: CS-101 twice in r1 and twice in r2 → `intersect all` gives it twice; CS-101 twice in r1, once in r2 → `except all` keeps one [S22–S23]. General counting rule: 🔎 Track B.
- ⭐ "Note: to express the "and" we need a set operation!" [S21]: one where with `and` of both semesters gives 0 rows. The `or` query of S21 gives 10 rows (duplicates kept), not the 8 of `union`.

**7.6 Nulls** [W6-S37–S38]
- *null* = "unknown value or a value does not exist"; "5 + null" returns null; test with `is null` (`where salary is null`).
- Any comparison with null (even `null = null`) is *unknown*. ⭐ "If predicate P evaluates to either false or unknown in where clause for tuple t, then t is not added to the result".

| | | |
|---|---|---|
| unknown **or** true = true | unknown **or** false = unknown | unknown **or** unknown = unknown |
| true **and** unknown = unknown | false **and** unknown = false | unknown **and** unknown = unknown |
| **not** unknown = unknown | | |

- How aggregates treat nulls is not on the slides → 🔎 Track B.

**7.7 Aggregates, group by, having** [W6-S41–S57]

| Query (slide) | ✅ Result |
|---|---|
| `select avg (salary) as avg_salary from instructor where dept_name= 'Comp. Sci.';` [S42] | 77333.33 |
| `select count (distinct ID) from teaches where semester = 'Spring' and year = 2010;` [S44] ("eliminates duplicates before aggregating") | 6 (7 without distinct: Katz twice) |
| `select count (*) from course;` [S46] | 13 |
| `select dept_name, avg (salary) as avg_salary from instructor group by dept_name;` [S48] | 7 rows: Biology 72000, Comp. Sci. 77333, Elec. Eng. 80000, Finance 85000, History 61000, Music 40000, Physics 91000 |
| ⭐ **Erroneous:** `select dept_name,ID, avg (salary) … group by dept_name;` [S49] | wrong: one row per department but Finance has 2 IDs (sqlite still runs it and picks one ✅) |
| `select avg (salary) as avg_salary from instructor;` [S50] | 74833 = 898000/12: "no grouping = one group" |
| `select dept_name, count (distinct ID) as instr_count from instructor natural join teaches where semester = 'Spring' and year = 2010 group by dept_name;` [S53] | Comp. Sci. 3, Finance 1, History 1, Music 1 |
| `… group by dept_name having avg_salary > 42000;` [S55] | 6 departments (Music 40000 out) |
| `select course_id, semester, year, sec_id, avg(tot_cred) as avg_tot_cred from takes natural join student where year = 2009 group by course_id, semester, year, sec_id having count (ID) >= 2;` [S57] | CS-101 65, CS-190 43, CS-347 67 = (102+32)/2 |

- Rules shown: next to aggregates, `select` lists only the group-by attributes ("Observe" [S53]). `where` is a condition on single tuples, `having` on **groups** [S54]; the S57 braces pair {from … where} and {group by … having}. (The full evaluation order is not on the slides → 🔎 Track B.)
- ⭐ "Don't use renaming for no precise purpose of the query expression." [S43]

**7.8 Nested subqueries** [W6-S60–S102]

| Form | Slide example | ✅ Result | Equivalent shown on the slides |
|---|---|---|---|
| `in` | Fall 2009 courses `course_id in (select course_id … 'Spring' … 2010)` [S65, S89] | CS-101 | `intersect` [S64]; `exists` [S90] |
| `not in` | `… course_id not in (…Spring 2010…)` [S67] | CS-347, PHY-101 | `except` [S66] |
| enumerated set | `where name not in ('Mozart', 'Einstein')` [S68] | 10 names | — |
| multi-attribute `in` | `(course_id, sec_id, semester, year) in (select … from teaches where teaches.ID= 10101)` [S74] | 6 | join on all "matching attributes" [S71, S73]; only sec_id → "6+6!" = 12 [S77–S78] |
| `> some` ("greater than at least one") | `salary > some (select salary … 'Biology')` [S82] | 7 names | self-join [S81] |
| `> all` ("greater than all") | `salary > all (…Biology…)` [S83] | same 7 names (Biology has only Crick) | — |
| `>= all` in having | `having avg (salary) >= all (select avg (salary) from instructor group by dept_name)` [S85] | Physics (`> all` would give nothing) | — |
| `exists` (correlated) | `exists (select * from section as T where … and S.course_id = T.course_id)` [S90] | CS-101 | without `S.course_id = T.course_id`: CS-101, CS-347, PHY-101: ⭐ not equivalent [S91] |
| `not exists ( … except … )` | students who took **all** Biology courses [S93] | empty (nobody took BIO-399) | — |
| subquery in `from` | `select dept_name, avg_salary from (select dept_name, avg (salary) as avg_salary … group by dept_name) where avg_salary > 42000;` [S97] | 6 rows; ⭐ "having" not needed | `having` [S96] |
| max of a per-group sum | `select max (tot_salary) from (select dept_name, sum (salary) as tot_salary … group by dept_name);` [S99] | 232000 (⚠️ slide: total_salary) | named subquery `as dept_total (dept_name, tot_salary)` "not always supported" [S100] |
| scalar subquery in `select` | `select dept_name, (select count(*) from instructor where department.dept_name = instructor.dept_name) as num_instructors from department;` [S102] | 1, 3, 1, 2, 2, 1, 2 | "Runtime error if subquery returns more than one result tuple" |

- Correlated = the subquery uses a name of the outer query (`S`, `department`). Correlated on the slides: S65, S90, S93, S102 (and W5-S105). Not correlated: S67, S74, S89.
- **Not on the slides** (despite being common): the `with` clause and the `unique` test → 🔎 Track B. Don't use them in class answers.

**7.9 Modification** [W5-S95–S105]

| Statement | ✅ Effect on the class data |
|---|---|
| `delete from instructor` [S95] | all 12 gone, table stays |
| `delete from instructor where dept_name= 'Finance';` [S95] | −2 (Wu, Singh) |
| `delete from instructor where dept_name in (select dept_name from department where building = 'Watson');` [S97] | −3 (Einstein, Gold, Crick) |
| `delete from instructor where salary < (select avg (salary) from instructor);` [S98] | −5. ⭐ "Problem: as we delete tuples from instructor, the average salary changes" → "Solution used in SQL: 1. First, compute avg (salary) and find all tuples to delete 2. Next, delete all tuples found above (without recomputing avg or retesting the tuples)" |
| `insert into course values (…)` / with the column list [S99] | +1 each (the two are alternatives: running both → duplicate key) |
| `insert into instructor select ID, name, dept_name, 20000 from student where …;` [S101] | "select" inserts a set; ⭐ it "must be evaluated before insertions. (otherwise an insertion loop arises)" |
| two updates: `… * 1.03 where salary > 100000;` then `… * 1.05 where salary <= 100000;` [S103] | ⭐ "The order of above updates is important! (Why?)": with 5% first, a salary in (95,238.10; 100,000] would get both raises |
| `update instructor set salary = case when salary <= 100000 then salary * 1.05 else salary * 1.03 end;` [S104] | one pass, no order problem (12 rows; Einstein 99,750) |
| `update student S set tot_cred = (select sum(credits) from takes, course where takes.course_id = course.course_id and S.ID = takes.ID and takes.grade <> 'F' and takes.grade is not null);` [S105] | S = "correlation name", ID = "correlation variable"; sqlite needs `update student as S` |

---

## 8. Traps & slide errors

**8.1 SQL that won't run, or runs wrong, as printed** (✅ = the failure was reproduced in sqlite3)

| Slide | As printed | Problem | Correct version |
|---|---|---|---|
| W5-S35 | `… foreign key (dept_name) references department;` | the `)` that closes `(ID …` is missing → syntax error ✅ | `foreign key (dept_name) references department);` |
| W5-S54 | `select ID, name, salary * n as monthly_salary;` | no `from` → "no such column: ID" ✅ | `… as monthly_salary from instructor;` |
| W5-S57/S58 | `where dept_name = 'Comp. Sci' and salary > 70000;` | the data says 'Comp. Sci.' → 0 rows ✅ | `'Comp. Sci.'` → Katz, Brandt |
| W5-S73 | `and  instructor. dept_name = 'Art';` | stray space (harmless); there is no Art department → 0 rows ✅ | `instructor.dept_name` |
| W5-S85–S87 | `join course using course_id` | sqlite needs parentheses ✅ | `join course using (course_id)` |
| W5-S90 | `select * as ID, name, dept_name, …` | `*` cannot be renamed → syntax error ✅ | `select student.ID as ID, name, dept_name, …` |
| W5-S99 | `insert into student (ID, name, dept_name, tot_credits) …` ("tot_creds" in the text) | no such column ✅ | `tot_cred` |
| W5-S101 | `where dept_name = 'Comp.Sci' and tot_cred > 145;` | ≠ 'Comp. Sci.' → 0 rows ✅ (and nobody has > 145 anyway) | `'Comp. Sci.'` |
| W5-S105 | `update student S set tot_cred = …` | sqlite needs `as` ✅ (MySQL 🔎); the prose says "tot_creds"; "sets tot_creds to null if takes.grade is null" is imprecise: Tanaka (one null grade) gets 4; only a student with no qualifying row (Green) gets null ✅ | `update student as S …` |
| W6-S13 | `where dept_name = 'Comp. Sci'` | 3 rows instead of 5 ✅ | `'Comp. Sci.'` |
| W6-S14 | `using (A1, A1, …, An)` | repeated A1 | `using (A1, A2, …, An)` |
| W6-S20, S22, S23, S64, S66, S93 | `(select …) union (select …)` | sqlite rejects the parenthesized operands ✅ (MySQL 🔎) | drop the parentheses to run it in sqlite |
| W6-S26 | `select ID, name, dept_name salary / 12 as monthly_salary;` | missing comma and `from` ✅ | `select ID, name, dept_name, salary / 12 as monthly_salary from instructor;` |
| W6-S33 | `where name like "%dar%'` / `like '100 \%' escape '\'` | quote mismatch ✅ / the space makes it match "100 %" ✅ | `'%dar%'` / `like '100\%' escape '\'` |
| W6-S49 | `select dept_name,ID, avg (salary) … group by dept_name;` | ⭐ "Erroneous": ID is neither grouped nor aggregated (sqlite still runs it) | drop `ID` |
| W6-S99, S100 | `select max (total_salary) from (… sum (salary) as tot_salary …)` | no such column ✅ | `max (tot_salary)` → 232000 |
| W6-S100 | `… ) as dept_total (dept_name, tot_salary);` | "named subquery: not always supported" (sqlite: syntax error ✅) | name the column inside: `sum (salary) as tot_salary … ) as dept_total` |

**8.2 Name and data inconsistencies across slides**
- 'Comp. Sci' vs 'Comp. Sci.': W1-S37 (Brandt's row), W5-S57, W6-S13; 'Comp.Sci' on W5-S101.
- instructor(ID, name, dept_name, **courses**) on W2-S26/S49 vs **salary** everywhere else. Use salary.
- department(dept_name, course_id) on W2-S27/S62 is a simplified schema; elsewhere it is (dept_name, building, budget).
- room_number (W2-S48, S56; W6-S18) vs room_no (schema diagrams).
- tot_cred vs "tot_creds" / tot_credits (W5-S99, S105).
- year '2009' (quoted) vs 2009; '10101' vs 10101 (W6-S64/S65, S73/S74): same rows in sqlite ✅. W6-S73's question says "101011" for 10101.
- The natural join is printed "r + s" (W2-S68, W5-S12, S78). It is not addition or union.
- Same numbers, different people: 76543 = Singh (instructor) and Brown (student); "Brandt" = instructor 83821 and student 19991.
- The W6 student table has Snow (70557, Physics, 0 credits); the W5-S90 result does not.

**8.3 E-R and schema slips**
- ⚠️ **works_for** (W3-S94, W4-S7, HW1 Figure 1): Employee (0,\*), Department (0,1) contradict sentences ① and ② under look-here. W4-S59 has Employee (1,\*), Department (1,1), the flip of what ①② give. **Ask the professor.**
- W3-S94 and W4-S7 are two versions of the Company E-R: S94 has Salary and Gender, Project keyed by Name, and works_on (0,\*)/(1,\*); S7 has {Location}, Num_of_empl(), Project(<u>Number</u>, Name, Location), Dependent.Relationship, and works_on (0,M)/(1,N).
- On W4-S59 the works_on labels (0,M)/(1,N) are black, not red; the blue labels are the new ones.
- W3-S57: "associated with 0..\* entities in B" → read "in A".
- W3-S66: the title says *Partial* but the text says "total participation" → read partial.
- W3-S34: the "E.g." writes ((44553,Peltier),(22222,Einstein)) ∈ advisor, the reverse of the formula's order; write the instructor first.
- W3-S93 ⑨ "one and only department" → one and only **one**; ⑪ "day of birth" = date of birth.
- W2-S55: "<a₁,…,aₘ> with n < m must appear in r₁" is compressed; read it as "inside r₁'s larger, m-attribute primary key".
- W4-S59 title "contraints"; W4-S62 says "LAB #1" where the outline says LAB #2; W4-S19 cites "(W12)" for the anomalies (it is S17).
- W6-S12: the drawn null-padded row is not from the data (and shows ID as null); on the data the right outer join adds nothing (22 rows ✅).
- W6-S20: the picture adds only the extra CS-101, but `union all` also keeps CS-319 twice → 10 rows, not 9 ✅. W6-S21's "Equivalent (easier) query" also keeps duplicates (10 rows, not union's 8) ✅.
- W6-S22/S23: the extra CS-101 under r1/r2 is drawn in to illustrate `all`; it is not in the section table.
- W6-S57: the result's column order differs from the select list. W6-S90/S92/S93 titles say "exist"; the keyword is `exists`.

**8.4 Text typos (no effect on meaning)**
- W1: "(i.e, information)" S4; "directly access to DB server" S12; "the data it deals with" S44.
- W2: "relation'attributes" S22; "an university" S26; "DB' schemas" S27/S62; "(e.g, updates)" S32; "actually exist" S35; "differ each other" S39; "{ID,dep_name}" S42 (also W3-S49); "apart ID" S43; "attributes's" S44; "(underlying)" = underlined S45; a stray "64" on S58.
- W3: "is carried by a data model in mind" S11; "a set of a mathematical relations" S34; "is a "grounded"" S44; "minumum" S69; "defied as" S73; "depends of" S78.
- W4: missing comma S10; "constrains" S16; "suggest how decomposition" S18; "because of ID is PK" S51.
- W5: "for each relations" S28; "Constrains" (title) S35; "This contrast to" S51; "on a Multiple Relations" S60; "coding' style" S73; "always specify" S91 (= W6-S7); "shake of remembering" S99.
- W6: "replaced be a subquery" S60.

**8.5 Conceptual traps**
1. **Look-here vs the flipped schema.** E-R: the label sits by the entity it describes [W3-S70]. W4-S59: the same pair sits at the other end. Don't mix the two in one drawing.
2. **The max-1 side is the "N" side** (advisor: student (1,1) yet instructor:student = 1:N). An arrowhead at instructor [W3-S56] = max 1 on the **student's** label [W3-S71].
3. **Total = at least one**, not exactly one [W3-S67]; **N includes zero** [W3-S52].
4. Any superset of a superkey is a superkey; only minimal ones are candidate keys; the PK is the designer's choice [W2-S42–S44]. Keys are decided "by design", not read off today's rows [W2-S41, W3-S48].
5. An FK value may be null: "— if not null! —" [W2-S53].
6. A relation is a **set** (order irrelevant, no repeated tuples) [W2-S21, S39], but SQL **keeps duplicates** [W5-S51].
7. `select` clause = **projection**; `where` = **selection** [W5-S48, S55].
8. **Natural join matches every same-name attribute**: instructor ⋈ teaches ⋈ course also equates dept_name [W5-S86]. On the class data, student ⋈ takes ⋈ course silently drops 5 of 22 rows (§9 SQL-2 ✅).
9. `join … on` keeps ID twice: "similar" to natural join, "equivalent" to comma + where [W5-S88–S89].
10. `union` removes duplicates; `union all` keeps them; an `or` in one where keeps them too; "and" across tuples needs `intersect` [W6-S20–S22].
11. `where x = null` is never true (unknown → "not added to the result"); use `is null` [W6-S37–S38].
12. `> some` ("at least one") vs `> all` ("all") coincide only when the subquery returns one value (Biology) [W6-S82–S83]; `>= all` finds the maximum, `> all` against a set that includes yourself finds nothing [W6-S85].
13. `count (distinct ID)` vs `count (ID)` (6 vs 7) [W6-S44]; with `group by`, select only grouped attributes next to aggregates [W6-S49]; `where` = tuples, `having` = groups [W6-S54]; no group by = one group [W6-S50].
14. Dropping the correlation condition from `exists` makes it true for every row (S91: 3 rows instead of 1); dropping it from the `in` version (S89) changes nothing.
15. Multi-attribute `in` must compare the whole tuple: only sec_id → 12 instead of 6 [W6-S77–S78].
16. The avg-delete computes the average once [W5-S98]; the order of the two updates matters [W5-S103]; insert-select evaluates the select first [W5-S101]; `drop table` is more drastic than `delete from` [W5-S39].
17. NB "primary key … ensures not null" [W5-S35]: true in class, but sqlite doesn't enforce it.
18. 2NF problems need a multi-attribute key, but general 2NF uses candidate keys (LOTS) [W4-S54]; "extremely critical" = lossless join, not dependency preservation [W4-S22].
19. A weak entity's discriminator alone is not a key: PK = owner's PK ∪ discriminator [W3-S90]. A relationship set's PK depends on its mapping cardinality [W3-S78, S83].
20. Two NOT NULL FKs pointing at each other (Employee ↔ Department) block the first insert: see 1(d).

**8.6 MySQL questions raised in the notes** (all 🔎 Track B, not answered on the slides): `references r` without a column list and whether r must exist first · a date type · `full outer join` · `intersect` / `except` (and `all`) · parenthesized `union` operands · `/` on integer columns · backslash and `escape '\'` · the S49 query (ONLY_FULL_GROUP_BY) · an alias inside `having` · an alias for every subquery in `from` · named-subquery column lists · `some` / `all` support · a scalar subquery returning several rows · a delete whose subquery reads the same table (S98) · `update student S` without `as` · whether numeric(p,d)'s p counts the sign · table-name case sensitivity.

---

## 9. Mock midterm + answer key (practice)

> All **practice**: new questions built with the slides' own methods and data. Do 9.1–9.6 closed-book, then mark with 9.8. 9.7 is the model answer to the §2 mock quiz. SQL answers were run in sqlite3 on the class tables ✅.

### 9.1 Multiple choice (20)

1. According to the class definition, a DBMS is: A) a set of files managed by the operating system · B) a query language for relations · C) the physical storage of a database · D) a collection of interrelated data about a particular enterprise together with a set of programs to access those data
2. Changing the internal schema (physical level) without changing the conceptual/logical schema is: A) physical data independence · B) logical data independence · C) data isolation · D) atomicity of updates
3. The slides' programming analogy says schema is to instance as: A) value is to type · B) type of a variable is to value of a variable · C) program is to data · D) DDL is to the data dictionary
4. In student(ID, name, dept_name, tot_cred), {ID} is a superkey by design. Which set is **not** guaranteed to be a superkey? A) {ID, name} · B) {ID, dept_name, tot_cred} · C) {name, tot_cred} · D) {ID, name, dept_name, tot_cred}
5. instructor.dept_name is a foreign key to department (departments: Biology, Comp. Sci., Elec. Eng., Finance, History, Music, Physics). Which insert into instructor **violates** it? A) (11111, 'Lee', 'Music', 50000) · B) (22223, 'Ng', null, 60000) · C) (44444, 'Bo', 'Physics', 80000) · D) (33333, 'Ali', 'Chemistry', 70000)
6. Which statement is true? A) r ∩ s = r − (r − s) · B) r ∪ s needs no condition on the two schemas · C) r − s = s − r · D) intersection is a "primary" operation
7. In the class E-R notation, `age ( )` inside an entity rectangle is: A) a multivalued attribute · B) a composite attribute · C) a partial key · D) a derived attribute
8. instructor —`0..*`— advisor —`1..1`— student means: A) each instructor advises exactly one student · B) each student has 0 or more advisors · C) each student has exactly one advisor, and an instructor advises 0 or more students · D) advisor is many-to-many
9. A = {a1, a2, a3}, B = {b1,…,b5}, R = {(a1,b1), (a1,b2), (a2,b3), (a2,b4), (a3,b5)}. The participation of A in R is: A) partial, because a1 appears twice · B) total · C) undefined · D) partial, because each b appears once
10. advisor(instructor, student) is many-to-one from student to instructor. Its primary key is: A) {student.ID} · B) {instructor.ID, student.ID} · C) {instructor.ID} · D) instructor.ID or student.ID, the designer's decision
11. The primary key of a weak entity set is: A) its discriminator · B) its owner's primary key · C) the owner's primary key ∪ the discriminator · D) a new attribute added by the designer
12. An FD X → Y is trivial if: A) X ⊆ Y · B) X is a superkey · C) X ∩ Y = ∅ · D) Y ⊆ X
13. After normalization, which property is "Extremely critical"? A) non-additive (lossless) join · B) dependency preservation · C) minimum redundancy · D) BCNF
14. EMP_DEPT(Ename, <u>Ssn</u>, Bdate, Address, Dnumber, Dname, Dmgr_ssn) with FD1 Ssn → {Ename, Bdate, Address, Dnumber} and FD2 Dnumber → {Dname, Dmgr_ssn} is in: A) no normal form · B) 1NF only · C) 2NF · D) 3NF
15. In the 3NF Company schema [W4-S59], the label (0,5) printed next to Project on the (controls) link means: A) a project is controlled by 0 to 5 departments · B) one department goes with 0 to 5 projects · C) a project has at most 5 employees · D) a department has 0 to 5 locations
16. On the 12-row class instructor table, `select dept_name from instructor;` returns: A) 12 rows, with duplicates · B) 7 rows · C) 12 distinct rows · D) an error
17. `select name, title from instructor natural join teaches natural join course;` is "a wrong SQL code" for "names of instructors with the titles of the courses they teach" because: A) natural join cannot chain three relations · B) it computes a Cartesian product · C) title is ambiguous · D) the second natural join also equates dept_name
18. On the class student (13 rows, with Snow) and takes (22 rows) tables, `select * from student natural left outer join takes;` returns: A) 22 rows · B) 13 rows · C) 23 rows, Snow with nulls in the takes attributes · D) 286 rows
19. Table r has three rows with B = 10, null, 30. `select * from r where B > 15 or B <= 15;` returns: A) 3 rows · B) 2 rows · C) 1 row · D) 0 rows
20. In the W6-S90 `exists` query, deleting the condition `S.course_id = T.course_id`: A) makes `exists` true for every Fall 2009 row (CS-101, CS-347, PHY-101) · B) changes nothing · C) returns no rows · D) causes a runtime error

### 9.2 Short answer / definitions (8)

1. Name the three levels of data abstraction and say what the physical and logical levels describe. Define logical and physical data independence.
2. Define superkey, candidate key and primary key. In student(ID, name, dept_name, tot_cred), suppose both {ID} and {name, dept_name} identify a student. List the candidate keys. Why is {ID, name} a superkey but not a candidate key?
3. Define a foreign key and its integrity constraint. The rule "(1) If a section exists for a course, it must be taught by at least one instructor": which constraint enforces it, in which direction, and why is it not a foreign key?
4. What do mapping cardinality and participation each specify? What do min 0, min 1, max 1 and max \* mean in look-here (min,max)?
5. Define weak entity set, identifying (owner) entity set, identifying relationship and discriminator, and apply them to course / sec_course / section.
6. Define full and partial functional dependency, transitive dependency, 2NF, and both definitions of 3NF.
7. (a) Why is `drop table r` "more drastic" than `delete from r`? (b) What is the problem with `delete from instructor where salary < (select avg (salary) from instructor);`, what does SQL do, and how many instructors go on the class data? (c) Why does the order of the two raise updates matter?
8. (a) Why is `select dept_name, ID, avg (salary) as avg_salary from instructor group by dept_name;` erroneous? (b) What is the difference between `where` and `having`? (c) What is a correlated subquery?

### 9.3 Write the SQL (university schema, class data) (6)

1. List the names and total credits of all students of the Comp. Sci. department, in descending order of total credits.
2. List the names of students along with the titles of the courses they have taken. Then explain what is wrong with `select name, title from student natural join takes natural join course;` and give both row counts.
3. Find the ID and name of every student who has not taken any course. Give two different queries.
4. For each department, find the number of students; list only departments with at least 3 students.
5. Find the names of instructors whose salary is greater than the salary of every instructor in the History department.
6. In one statement, raise the budget of the departments located in the Watson building by 10% and all the others by 5%.

### 9.4 What does this query return? (4)

1. emp(eid, name, city) = (1, Ana, Tashkent), (2, Bek, Samarkand), (3, Cem, Bukhara). assign(eid, pid, city) = (1, P1, Tashkent), (2, P1, Tashkent), (3, P2, Bukhara).
   (a) `select name, pid from emp natural join assign;` (b) `select name, pid from emp join assign using (eid);`
2. r(A, B) = (1, 10), (2, null), (3, 30).
   (a) `select count(*) from r where B = null;` (b) `select A from r where B is null;` (c) `select A, B + 5 as C from r;` (d) `select A from r where not (B > 15);`
3. r1(x) = a, b, b, c and r2(x) = b, d.
   (a) r1 `union` r2 (b) r1 `union all` r2 (how many rows?) (c) r1 `except` r2 (d) r1 `except all` r2 (e) r1 `intersect` r2
4. pay(name, dept, sal) = (A, d1, 10), (B, d1, 20), (C, d2, 15), (D, d2, 25), (E, d3, 30).
   (a) `select name from pay where sal > some (select sal from pay where dept = 'd2');`
   (b) the same with `> all`
   (c) `select name from pay as P where exists (select * from pay as Q where Q.dept = 'd2' and P.sal > Q.sal);`

### 9.5 Normalization (2)

**N1.** SHIPMENT(<u>OrderNo</u>, <u>ProductNo</u>, Qty, OrderDate, CustNo, CustName, ProdName, UnitPrice), with
FD1 {OrderNo, ProductNo} → Qty · FD2 OrderNo → {OrderDate, CustNo} · FD3 CustNo → CustName · FD4 ProductNo → {ProdName, UnitPrice}.
(a) Prime and nonprime attributes. (b) Full or partial dependency on the PK for each nonprime attribute. (c) Transitive dependencies. (d) Highest normal form. (e) Decompose to 2NF, then to 3NF. (f) Check dependency preservation and explain why the joins add no spurious tuples.

**N2.** STUDENT_CLUB(<u>StudentID</u>, Email, Name, Clubs, AdvisorID, AdvisorOffice). Email is also a candidate key. FD1 StudentID → {Email, Name, AdvisorID} · FD2 Email → StudentID · FD3 AdvisorID → AdvisorOffice. Instance:

| StudentID | Email | Name | Clubs | AdvisorID | AdvisorOffice |
|---|---|---|---|---|---|
| U101 | aziz@iut.uz | Aziz | {Chess, Robotics} | A7 | B-305 |
| U102 | bela@iut.uz | Bela | {Chess} | A7 | B-305 |
| U103 | davron@iut.uz | Davron | {Music, Debate, Chess} | A9 | A-605 |

(a) Is it in 1NF? Fix it with the technique the slides demonstrate. (b) Is Email prime? (Answer with both the course's PK-only reading and the general definition.) (c) Is the 1NF result in 2NF? In 3NF? Use both 3NF tests. (d) Give the 3NF decomposition.

### 9.6 E-R design from sentences (1)

Library DB. Draw the E-R diagram with primary keys and look-here (min,max) labels, each tagged with its sentence number. Bonus: map it to the 3NF schema with flipped labels.
① Each copy must be held by exactly one branch.
② A branch can hold many copies.
③ A book can have many copies (possibly none); copies are weak entities identified by their copy number within the book.
④ A member can borrow at most five copies at a time; the due date of each loan is stored.
⑤ A copy can be borrowed by at most one member at a time.
⑥ Every book must be written by at least one author.
⑦ Every author must have written at least one book, and can write many.
⑧ A member can recommend other members and be recommended by at most one member.
⑨ Books have a unique ISBN, a title and a set of keywords; members have a unique card number and a composite name (first, last); authors have a unique ID and a name; branches have a unique code and an address.

### 9.7 Model answer: Mock Quiz #2 (Clinic DB, §2)

**(1) 3NF logical schema** (PK underlined, FKs marked; pattern of [W4-S59])
- **Doctor**(<u>ID</u>, Name_Fname, Name_Lname, wi_W_Code (FK), Mentor_ID (FK))
- **Doc_Phones**(<u>Phone</u>, <u>Doc_ID</u> (FK))
- **Ward**(<u>Code</u>, FloorNo, h_Doc_ID (FK), h_start_date)
- **Bed**(<u>BedNo</u>, BedType, <u>W_Code</u> (FK))
- **Patient**(<u>ID</u>, Name)
- **treats**(<u>Doc_ID</u> (FK), <u>P_ID</u> (FK), diagnosis)

| Link | FK (in table) | Arrowhead at | Label at end 1 | Label at end 2 | Where the labels come from |
|---|---|---|---|---|---|
| (works_in) | wi_W_Code (Doctor) | Ward | Doctor **(1,\*)** | Ward **(1,1)** | flip of Doctor (1,1) ①, Ward (1,\*) ② |
| (heads) | h_Doc_ID (Ward) | Doctor | Doctor **(1,1)** | Ward **(0,1)** | flip of Doctor (0,1) ③, Ward (1,1) ④ |
| (mentors) | Mentor_ID (Doctor) | Doctor, mentor end | (mentor) **(0,1)** | (mentee) **(0,\*)** | flip of mentor (0,\*), mentee (0,1) ⑤ |
| (has) | Doc_ID (Doc_Phones) | Doctor | Doctor **(1,1)** blue | Doc_Phones **(0,\*)** blue | new: multivalued {Phone} |
| (beds_of) | W_Code (Bed) | Ward | Ward **(1,1)** | Bed **(0,20)** | flip of Ward (0,20) ⑧, Bed (1,1) |
| Doctor–treats | Doc_ID (treats) | Doctor | Doctor **(1,1)** blue | treats **(0,\*)** | Doctor's (0,\*) ⑥ moves to the treats end |
| treats–Patient | P_ID (treats) | Patient | treats **(1,\*)** | Patient **(1,1)** blue | Patient's (1,\*) ⑦ moves to the treats end |

- Why each FK sits there: works_in is 1:N with Doctor's max = 1 → FK in Doctor. heads is 1:1 → FK on the total side (Ward), with h_start_date. mentors is recursive → Mentor_ID in Doctor (the mentee's row). treats is M:N → a new table with diagnosis. Bed is weak → PK = BedNo + owner's Code [W3-S90]. {Phone} → its own table (technique 1); Name → Name_Fname, Name_Lname (technique 3) [W4-S30].

**(2) CREATE TABLE** ✅ (sqlite3, foreign keys on)
```sql
create table Doctor
     (ID            char(5),
      Name_Fname    varchar(15),             -- composite Name flattened
      Name_Lname    varchar(15),
      wi_W_Code     char(3) not null,        -- (works_in): (1,1) at Ward, sentence 1
      Mentor_ID     char(5),                 -- nullable: (0,1) at the mentor end, sentence 5
      primary key (ID),
      foreign key (wi_W_Code) references Ward,
      foreign key (Mentor_ID) references Doctor);

create table Doc_Phones                      -- multivalued {Phone}: 1NF technique 1
     (Phone         varchar(15),
      Doc_ID        char(5),
      primary key (Phone, Doc_ID),           -- (has): (1,1) at Doctor
      foreign key (Doc_ID) references Doctor);

create table Ward
     (Code          char(3),
      FloorNo       smallint,
      h_Doc_ID      char(5) not null,        -- (heads): (1,1) at Doctor, sentence 4
      h_start_date  char(10),                -- relationship attribute, same prefix
      primary key (Code),
      unique (h_Doc_ID),                     -- (0,1) at Ward: a doctor heads <= 1 ward, sentence 3
      foreign key (h_Doc_ID) references Doctor);

create table Bed                             -- weak entity
     (BedNo         smallint,                -- discriminator
      BedType       varchar(10),
      W_Code        char(3),                 -- owner's PK
      primary key (BedNo, W_Code),           -- (beds_of): (1,1) at Ward, sentence 9
      foreign key (W_Code) references Ward);

create table Patient
     (ID            char(5),
      Name          varchar(30),
      primary key (ID));

create table treats                          -- M:N relationship with attribute
     (Doc_ID        char(5),
      P_ID          char(5),
      diagnosis     varchar(30),
      primary key (Doc_ID, P_ID),            -- blue (1,1) at Doctor and at Patient
      foreign key (Doc_ID) references Doctor,
      foreign key (P_ID) references Patient);
```
- ✅ Rejected: a doctor without a ward (NOT NULL) · a doctor heading two wards (UNIQUE) · a ward without a head (NOT NULL) · a bed of an unknown ward (FK) · the same doctor–patient pair twice (PK) · a non-existing mentor (FK).
- ✅ Accepted, correctly: bed number 2 in two different wards (PK = BedNo + W_Code).

**(3) Needs a trigger** (HW2 rule; idea in words)
- **(1,\*) at Doctor on (works_in), ②**: every ward must keep ≥ 1 doctor working in it. Check when a ward is added and when a doctor is deleted or moved.
- **(1,\*) at treats for a patient, ⑦**: every patient must have ≥ 1 treats row. Check when a patient is added and when a treats row is deleted.
- **(0,20) at Bed, ⑧**: before inserting a bed, count the ward's beds and reject a 21st.
- ✅ The four constraints accept all three violations (a ward with no doctor, a patient with no doctor, a 21st bed).

**(4) INSERTs** ✅ (3 per table; every PK/FK/NOT NULL/UNIQUE holds, and so do the three trigger rules)
```sql
-- 1. Doctors: the mentor first (Mentor_ID null)
insert into Doctor values ('D0001', 'Aziza', 'Yusupova', 'CAR', null);
insert into Doctor values ('D0002', 'Bekzod', 'Tursunov', 'NEU', 'D0001');
insert into Doctor values ('D0003', 'Gulnora', 'Ismoilova', 'PED', 'D0001');
-- 2. Wards: each headed by a different doctor (unique), each with >= 1 doctor working in it
insert into Ward values ('CAR', 3, 'D0001', '2022-09-01');
insert into Ward values ('NEU', 5, 'D0002', '2023-02-15');
insert into Ward values ('PED', 2, 'D0003', '2024-03-10');
-- 3. Phones (multivalued): D0001 has two, D0003 none
insert into Doc_Phones values ('+998901112233', 'D0001');
insert into Doc_Phones values ('+998712223344', 'D0001');
insert into Doc_Phones values ('+998935556677', 'D0002');
-- 4. Beds: bed numbers repeat across wards (PK = BedNo + W_Code); <= 20 per ward
insert into Bed values (1, 'standard', 'CAR');
insert into Bed values (2, 'ICU', 'CAR');
insert into Bed values (1, 'standard', 'NEU');
-- 5. Patients
insert into Patient values ('P0001', 'Kamola Nazarova');
insert into Patient values ('P0002', 'Sardor Umarov');
insert into Patient values ('P0003', 'Lola Ergasheva');
-- 6. treats: every patient gets >= 1 doctor
insert into treats values ('D0001', 'P0001', 'arrhythmia');
insert into treats values ('D0002', 'P0002', 'migraine');
insert into treats values ('D0003', 'P0003', 'hypertension');
-- 7. Then: alter table Doctor add foreign key (wi_W_Code) references Ward;
```
- **Order:** parents before children; the mentor before mentees.
- **Doctor ↔ Ward cycle:** both FKs are NOT NULL, the same trap as Employee ↔ Department. Create Doctor without its works_in FK, load in the order above, then add the FK with `alter table` [W5-S38]. ✅ The ordered load ran in sqlite with checking on; the final `alter … add foreign key` needs MySQL.
- A first test version had D0003 working in CAR. The four constraints accepted it, but ward PED then had no doctor, breaking ②. Exactly why ② needs a trigger.

### 9.8 Answer key

**9.1 Multiple choice**

| # | Ans | Why | Ref |
|---|---|---|---|
| 1 | D | the class definition | W1-S4 |
| 2 | A | physical data independence | W1-S36 |
| 3 | B | schema ~ type, instance ~ value | W1-S37, W2-S24 |
| 4 | C | supersets of {ID} are superkeys; {name, tot_cred} is not implied | W2-S41–S42 |
| 5 | D | no Chemistry department; B is fine: "— if not null! —" | W2-S53–S54 |
| 6 | A | r ∩ s = r − (r − s); ∪ needs "similar" relations; ∩ is "derived" | W2-S70–S72, W5-S77 |
| 7 | D | derived attribute, written "( )" | W3-S32 |
| 8 | C | look-here | W3-S72 |
| 9 | B | total = every entity in at least one relationship | W3-S62, S67 |
| 10 | A | many-to-one from student to instructor → {student.ID} | W3-S83–S84 |
| 11 | C | {owner's PK} ∪ discriminator | W3-S90 |
| 12 | D | Y ⊆ X | W4-S14 |
| 13 | A | lossless join is "Extremely critical" | W4-S22 |
| 14 | C | single-attribute PK (no partial dependency) but Ssn → Dnumber → Dmgr_ssn is transitive | W4-S47, S21 |
| 15 | B | flipped label: one department goes with 0..5 projects (⑧) | W4-S59 |
| 16 | A | duplicates kept ✅ | W5-S51 |
| 17 | D | dept_name is also a common attribute | W5-S86 |
| 18 | C | 23 rows ✅ | W6-S11 |
| 19 | B | the null row: unknown or unknown = unknown → not added ✅ | W6-S38 |
| 20 | A | the subquery no longer depends on S, so it is non-empty for every row ✅ | W6-S91 |

**9.2 Short answers**
1. View, logical and physical levels [W1-S33]. Physical: "describes how a record … is physically stored"; logical: "describes what data are stored in database, and the relationships among the data" [W1-S35]. Logical data independence: changing the conceptual schema without changing the external schemas and their programs. Physical data independence: changing the internal schema without changing the conceptual/logical schema [W1-S36] (full quotes in §4.1).
2. Definitions in §4.2 [W2-S41–S44]. Candidate keys: {ID} and {name, dept_name} [W2-S43]. {ID, name} is a superset of the superkey {ID}, so it is a superkey; it has the proper subset {ID} that is already a superkey, so it is not minimal and not a candidate key [W2-S42–S43].
3. FK: "the primary key for r₂ listed in the attributes of r₁"; its values "must match — if not null! — the values of attributes of primary key for r₂" [W2-S53].
   - Rule (1) needs a **referential integrity constraint from section (r₂) to teaches (r₁)**: "if a particular (course_id, sec_id, semester, year) instance of data appears in section, then the same combination must appear in teaches" [W2-S57].
   - It is not a FK: in teaches those 4 attributes are only *part of* the PK (ID, course_id, sec_id, semester, year), so n = 4 < m = 5 [W2-S55–S56]. The FK runs the other way: teaches → section.
4. Mapping cardinality specifies **maximum** participation; participation specifies **minimum** participation [W3-S69]. min 0 = partial, min 1 = total, max 1 = "at most one relationship", max \* = "no limits" [W3-S70].
5. Definitions in §4.3 [W3-S87, S90]. section is the weak entity set (double box); course is the owner; sec_course is the identifying relationship (double diamond, arrowhead to course, double line to section). Discriminator = {sec_id, semester, year} (dashed); PK(section) = {course_id} ∪ discriminator [W3-S88–S90].
6. Quotes in §4.4 [W4-S35, S39, S46, S49, S52].
7. (a) `delete from r` removes all tuples, but r still exists; after `drop table r` nothing can be inserted until it is re-created [W5-S39, S41].
   (b) "as we delete tuples from instructor, the average salary changes". SQL first computes the average and finds all tuples to delete, then deletes them without recomputing. On the class data: **5** deleted (avg 74,833.33: Mozart, El Said, Califieri, Srinivasan, Crick) ✅ [W5-S98].
   (c) With the 5% update first, a salary in (95,238.10; 100,000] would rise above 100,000 and also get the 3%. Run the 3% update first, or use `case` [W5-S103–S104].
8. (a) The result has one row per department, but Finance has two IDs (12121, 76543): ID is neither grouped nor aggregated [W6-S49]. (b) `having` states a condition on groups, `where` on single tuples [W6-S54]; both can appear in one query [W6-S57]. (c) A subquery that uses a correlation name of the outer query (`section as S` … `S.course_id`) is "called: correlated subquery" [W6-S90]; dropping the correlation condition changes the result [W6-S91].

**9.3 SQL** ✅
```sql
-- 1. [W5-S57, W6-S31–S32]
select name, tot_cred
from student
where dept_name = 'Comp. Sci.'
order by tot_cred desc;
```
→ Zhang 102, Brown 58, Williams 54, Shankar 32. With 'Comp. Sci' (no period): 0 rows.
```sql
-- 2. [W5-S83–S87]
select name, title
from student natural join takes, course
where takes.course_id = course.course_id;
-- or: from student natural join takes join course using (course_id)
```
→ 22 rows. The triple natural join also equates student.dept_name with course.dept_name ("conceptually different"): 17 rows. It silently drops Levy (Physics; took CS-101 twice and CS-319) and Bourikas (Elec. Eng.; CS-101, CS-315).
```sql
-- 3. [W6-S11, S37] and [W6-S67] (not exists [W6-S88] works too)
select ID, name
from student natural left outer join takes
where course_id is null;

select ID, name
from student
where ID not in (select ID from takes);
```
→ 70557 Snow (both; also `select ID, name from student as S where not exists (select * from takes as T where T.ID = S.ID);`).
```sql
-- 4. [W6-S46, S48, S55, S57]
select dept_name, count (*) as num_students
from student
group by dept_name
having count (*) >= 3;
```
→ Comp. Sci. 4, Physics 3.
```sql
-- 5. [W6-S83]
select name
from instructor
where salary > all (select salary
                    from instructor
                    where dept_name = 'History');
```
→ every salary > 62000: Srinivasan, Wu, Einstein, Gold, Katz, Singh, Crick, Brandt, Kim. (sqlite has no `all`; checked with `> (select max(salary) …)` and a `not exists` rewrite.)
```sql
-- 6. [W5-S104]
update department
set budget = case
               when building = 'Watson' then budget * 1.10
               else budget * 1.05
             end;
```
→ Biology 99000, Physics 77000 (Watson); Comp. Sci. 105000, Elec. Eng. 89250, Finance 126000, History 52500, Music 84000.

**9.4 What it returns** ✅
1. (a) **Ana P1, Cem P2**: the natural join matches eid **and** city, and Bek's cities differ. (b) **Ana P1, Bek P1, Cem P2**: only eid [W5-S85–S86, W6-S14].
2. (a) **0**: `B = null` is unknown for every row. (b) **2**. (c) (1, 15), (2, null), (3, 35): "5 + null returns null". (d) **1** only: row 2 is not unknown = unknown; row 3 is not true = false [W6-S37–S38].
3. (a) a, b, c, d. (b) **6** rows. (c) a, c. (d) a, b, c: one of r1's two b's is cancelled by r2's b, the pattern of the W6-S23 picture (sqlite has no `except all`; reasoned from the slide). (e) b [W6-S20–S23].
4. (a) **B, D, E** (greater than at least one of {15, 25}). (b) **E** (greater than 25). (c) **B, D, E**, the same as (a) [W6-S82–S83, S88].

**9.5 Normalization**

N1 [W4-S35–S57]
- (a) Prime: OrderNo, ProductNo. Nonprime: Qty, OrderDate, CustNo, CustName, ProdName, UnitPrice.
- (b) Qty **full** (neither key part alone determines it). OrderDate, CustNo **partial** (FD2). CustName **partial** (OrderNo → CustNo → CustName depends on the part OrderNo). ProdName, UnitPrice **partial** (FD4).
- (c) OrderNo → CustNo → CustName, and CustNo is not a key → **transitive**.
- (d) **1NF**: atomic values, but partial dependencies.
- (e) 2NF: S1(<u>OrderNo</u>, <u>ProductNo</u>, Qty) · S2(<u>OrderNo</u>, OrderDate, CustNo, CustName) · S3(<u>ProductNo</u>, ProdName, UnitPrice).
  - S2 fails 3NF: CustNo → CustName, CustNo not a superkey, CustName not prime.
  - 3NF: S1 · S2a(<u>OrderNo</u>, OrderDate, CustNo) · S2b(<u>CustNo</u>, CustName) · S3.
- (f) FD1 ∈ S1, FD2 ∈ S2a, FD3 ∈ S2b, FD4 ∈ S3 → dependencies preserved [W4-S22, S56]. Each split keeps the determinant as the PK of the new table and as a link in the old one (like ED1/ED2 [W4-S50]), so every row finds at most one partner. Contrast the lossy split on the non-unique name [W4-S23]. Formal lossless test: 🔎 Track B.

N2 [W4-S28–S31, S37, S46–S54]
- (a) No: Clubs holds sets. Technique 1: STUDENT(<u>StudentID</u>, Email, Name, AdvisorID, AdvisorOffice) + S_CLUBS(<u>StudentID</u>, <u>Club</u>) = (U101, Chess), (U101, Robotics), (U102, Chess), (U103, Music), (U103, Debate), (U103, Chess).
- (b) Course reading ("Here we only need it to be primary key"): **nonprime**. General definition ("member of some candidate key"): **prime**.
- (c) **2NF: yes**, the PK is a single attribute (cf. "(\*) Note the single attribute"). **3NF: no**: StudentID → AdvisorID → AdvisorOffice, AdvisorID not a key. General test: AdvisorID → AdvisorOffice fails both (a) and (b). Email → StudentID passes, because Email is a candidate key and so a superkey.
- (d) STUDENT(<u>StudentID</u>, Email, Name, AdvisorID) · ADVISOR(<u>AdvisorID</u>, AdvisorOffice) · S_CLUBS(<u>StudentID</u>, <u>Club</u>). "B-305" is now stored once.

**9.6 E-R design (Library)** [W3-S70, S74, S87–S90]
- **Entity sets:** Book(<u>ISBN</u>, Title, {Keyword}) · Copy: **weak**, owner Book, CopyNo dashed (discriminator) · Member(<u>CardNo</u>, Name {First, Last}) · Author(<u>ID</u>, Name) · Branch(<u>Code</u>, Address).

| Relationship | Look-here labels | Attribute | Ratio; participation |
|---|---|---|---|
| holds | Branch (0,\*) ② — Copy (1,1) ① | — | 1:N; Copy total |
| has_copy (identifying, double diamond) | Book (0,\*) ③ — Copy (1,1) (existence dependent) | — | 1:N; Copy total |
| borrows | Member (0,5) ④ — Copy (0,1) ⑤ | due_date | 1:N; both partial |
| writes | Book (1,\*) ⑥ — Author (1,\*) ⑦ | — | M:N; both total |
| recommends (recursive, roles) | recommender (0,\*) ⑧ — recommended (0,1) ⑧ | — | 1:N; both partial |

- PK(Copy) = {ISBN} ∪ {CopyNo}.
- **Bonus: 3NF schema with flipped labels**
  - Book(<u>ISBN</u>, Title)
  - B_Keywords(<u>Keyword</u>, <u>B_ISBN</u> (FK)): (has) Book (1,1) blue / B_Keywords (0,\*) blue
  - Copy(<u>CopyNo</u>, <u>B_ISBN</u> (FK), h_Br_Code (FK), b_M_CardNo (FK), b_due_date): (copies_of) Book (1,1) / Copy (0,\*); (holds) Branch (1,1) / Copy (0,\*); (borrows) Member (0,1) / Copy (0,5)
  - Member(<u>CardNo</u>, Name_First, Name_Last, Recommender_CardNo (FK)): (recommends) recommender end (0,1) / recommended end (0,\*)
  - Author(<u>ID</u>, Name)
  - writes(<u>A_ID</u> (FK), <u>B_ISBN</u> (FK)): Author (1,1) blue / writes (1,\*); writes (1,\*) / Book (1,1) blue
  - Branch(<u>Code</u>, Address)
- Constraints: h_Br_Code **not null** (a copy is in exactly one branch); b_M_CardNo nullable (a copy may be on the shelf).
- **Triggers:** (0,5) loans per member; (1,\*) on both sides of writes.

---

## 10. Last-48-hours checklist

**Quiz #2 (Fri 23 Oct): do these first**
- [ ] I can turn a requirement sentence into a look-here (min,max): the modal verb gives the min (must = 1, can/may = 0), the quantity gives the max, one sentence per side [W3-S70–S72, S93].
- [ ] I can convert (min,max) ↔ ratio + participation (the max-1 side is the N side; total = at least one; N includes zero) [W3-S52–S72].
- [ ] I can explain the works_for slip (S94/S7 vs sentences ①② vs S59) and state the reading I use [W3-S94, W4-S59].
- [ ] I can map strong and weak entities, composite / multivalued / derived attributes, 1:1, 1:N, M:N and recursive relationships into the professor's notation: prefix names, (FK), link names, arrowheads [W4-S59].
- [ ] I can flip every E-R pair to the other end and add the blue labels for the new tables, and read a schema label as "rows of this table per one row at the other end" [W4-S7 vs S59].
- [ ] I can write the six Company DB relations with PKs, FKs and labels from memory [W4-S59].
- [ ] I can write `create table` with the slide types, `primary key` (both styles), `foreign key … references`, `not null` and `unique`, and say which (min,max) each one enforces [W5-S31–S37, HW2].
- [ ] I can list which labels need a trigger (min 1 on the many side; bounds like 5) and give each trigger idea in one sentence [HW2].
- [ ] I can write `insert … values` (schema order or a column list, `null`, MySQL multi-row), order the inserts so every FK is satisfied, and break the Employee ↔ Department cycle [W5-S42, S99–S100, S38].
- [ ] I can do ① New → ② Import in phpMyAdmin, and I know HW2's file names, the AI-disclosure rule and the plagiarism rule [W2-S79, HW2].

**Midterm (week 8)**
- [ ] I can quote the §4 definitions: DBMS, levels, data independence, schema/instance, keys, FK, entity/relationship sets, weak entity, FD, 1NF–3NF, lossless join, join, outer join, aggregates, subquery.
- [ ] I can compute σ, ∏, natural join, ×, ∪, −, ∩ on small tables, state the "similar" condition, and show r ∩ s = r − (r − s) [W2-S64–S72].
- [ ] I can find prime attributes, partial and transitive dependencies, give the highest normal form, decompose to 3NF with the S57 remedies, and check lossless join and dependency preservation [W4].
- [ ] I can predict SQL results: duplicates vs `distinct`, the natural join and its dept_name trap, `using` / `on`, the outer joins (22 / 23 / 22 / 5), `union` / `union all` / `intersect` / `except` [W5, W6].
- [ ] I can evaluate null expressions with three-valued logic and apply "false or unknown → not added to the result" [W6-S37–S38].
- [ ] I can write `group by` / `having` queries and spot the "Erroneous" select list [W6-S47–S57].
- [ ] I can write a question with `in` / `not in`, `some` / `all`, `exists` / `not exists` (including "took all Biology courses"), a subquery in `from` and a scalar subquery, and say which are correlated [W6-S60–S102].
- [ ] I can explain the avg-delete (computed once), the order of two updates vs `case`, insert-select (no loop), and `drop table` vs `delete from` [W5-S39, S95–S105].
- [ ] I can fix every printed-SQL error in §8.1 on sight.
- [ ] I did the §2 mock quiz and the §9 mock midterm on the clock and marked them with §9.7–§9.8.
