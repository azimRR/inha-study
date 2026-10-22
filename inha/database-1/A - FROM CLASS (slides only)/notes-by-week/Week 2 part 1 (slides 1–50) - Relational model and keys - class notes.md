# Week 2, part 1 (slides 1–50) — The relational model: structure, semantics, keys (CLASS NOTES — from slides only)

> Source: W2L1L2 MySQL.pdf, slides 1–50 of 81. [S#] = the "n / 81" footer number.
> The title, agenda, outline and section-divider slides have no footer. They are numbered by their position in the PDF, which matches the footer numbering.
> Legend: ⭐ = professor emphasis (red/blue/bold/boxed text, "Def", "NB", "Remark", questions to the class, reading references) · ⚠️ = apparent slide typo or inconsistency (original kept, correction added) · 🔎 = not explained on the slides → look it up in Track B · ✅ = I checked it in sqlite3 using the slide's own table rows.
> Slides 51–81 are in the part 2 notes: referential integrity, relational operations and the MySQL appendix.

---

## 1. Big picture

- **Recap of week 1 (S5–S8).** A DBMS is a "sum" of **interrelated data** and a **set of programs**. Its purpose is to give each user an **abstract view** of the data, and that view "is provided by a specific **data model**". The recap also covers the three levels (physical / logical / view) and the **data dictionary** (system catalog), which stores **metadata** ("data about data").
- **What a data model must capture (S9, S10, "Week's focus").** The real (mini) world is captured as **Data**, and the slides show Data → Information → Knowledge. A data model handles data through three aspects:
  1. **Data and Data relationships** — how we *structure* data.
  2. **Data semantics** — how we *mean* data.
  3. **Data constraints** — how we represent *constraints* on data, and why.
- **The relational model (S12–S15).** It is Ch 2 of the textbook (sections 2.1–2.4), and the historical source is E. F. Codd's 1970 paper. The model describes data at the **logical level** (and the view level). It is "still the primary data model for commercial data-processing" for two reasons: it is conceptually simple, and programmers can design with it more easily than with earlier models. Substantial theory also exists for it.
- **Structure (S18–S27).**
  - A relational database is a collection of **tables (= relations)**, each with a **unique name**.
  - A table is a **set** of rows (**tuples**). Each row represents a relationship R among the data in the columns (**attributes**).
  - Because a table is a set, **the order of the tuples is irrelevant**.
  - **Schema** = the logical view, "design", "structure" (like a *variable type*). **Instance** = the content at a given point in time (like a *variable value*).
  - Schemas are written in textual notation, e.g. `student (ID,name,dept_name,tot_cred)`, or drawn as a schema diagram (the University DB).
- **Semantics (S30–S32).**
  - Every attribute has a **domain** (its set of allowed values).
  - Values must be **atomic** (indivisible).
  - **null** ("unknown", or "does not exist") is a member of every domain. It causes complications, so some attributes are fixed **"not null"** by design, which is the entity integrity constraint.
- **Constraints (S35–S37).**
  - A data model should describe four kinds of constraint: **domain constraints**, **referential integrity constraints**, **assertions** (business rules) and **authorization**.
  - Constraints are defined with **DDL** and stored in the **data dictionary** as **metadata**.
  - Integrity constraints come in two kinds: **entity ("identity")** and **referential**.
  - A **key** for R defines a data constraint on the values of R's attributes.
- **Keys = "Integrity of Tables" (S38–S50).**
  - Tuples must differ: no two tuples may have exactly the same values on all attributes.
  - **Superkey**: a set of attributes that identifies a tuple uniquely. Any superset of a superkey is also a superkey.
  - **Candidate key**: a *minimal* superkey.
  - **Primary key**: the candidate key *chosen by the database designer*. It is written <u>underlined</u>.
  - A primary key can be **one key made of several attributes**, e.g. section's <u>course_id, sec_id, semester, year</u>: "NB: singular key, not keys!".

---

## 2. Slide-by-slide notes

### [S1] Title — Database (SOC-3020)
- "Database (SOC-3020)" — Alessandro Agostini¹² — aagostini@inha.ac.kr · agostini@disi.unitn.it.
- ¹LDKR-Group, School of Computer and Information Engineering, Inha University in Tashkent (IUT), Uzbekistan; ²DISI, University of Trento, Italy. "WEEK 2".
- Pictures: a photo of the IUT building, the LDKR logo ("Language, Data, Knowledge, Reasoning") and the IUT seal.

### [S2] DATABASE — The Relational Model
- "DATABASE / The Relational Model / WEEK 2 / Code: W2.L1L2", under a panoramic photo of a historic city square.

### [S3] TODAY'S AGENDA
1. From Previous Week
2. The Relational Model
3. Data and Data Relationships
4. Data Semantics
5. Data Constraints: Entity Integrity
6. Data Constraints: Referential Integrity
7. Relational Operations
8. Appendix: MySQL - Installation Guidelines

- These notes (S1–S50) cover items 1–5. Items 6–8 are in part 2.

### [S4] "Any question from you? …"
- Pause for questions; no content.

### [S5] Remember: DBMS = Data + Programs  *(section: From Previous Week)*
- "Remember: a database (management) system is a "sum" of
  - **interrelated data** (Abstract World)
  and a
  - **set of programs** that allow users to access and modify (*conveniently, efficiently*) these data."
- "A purpose of a database (management) system is to provide each user with an *abstract* view of the data."
  - "Such view is provided by a specific **data model**."
- Picture: a red curved arrow runs from the "purpose … abstract view" bullet back up to "interrelated data (Abstract World)".
- ⭐ Colour coding: "interrelated data" in red bold, "Abstract World" in orange, "set of programs" in blue bold, "each user" and "*abstract* view" in blue, "data model" in bold.

### [S6] Remember: Abstract Views on Data
- "**Physical level:** describes how a record (e.g., instructor) is physically stored." ("how" is underlined.)
- "**Logical level:** describes what data are stored in database, and the relationships among the data." ("what" is underlined.)
- **Example** (blue box), copied exactly:
```
type instructor = record
    ID : string;
    name : string;
    dept_name : string;
    salary : integer;
end;
```
  - A red handwritten annotation has an arrow pointing at the "=": "*logical association; i.e., we transform data into information (about instructors) Information is defined from* ***structured data*** *(the record)*".
  - A red brace around the four field lines is labelled "*data ("cells")*".
- "**View level:** application programs hide details of some data types. Views used to hide some information ("logical level") for security/privacy purposes. (E.g.: an employee's salary)"
- ⭐ Remember the pair **physical = HOW** a record is stored vs **logical = WHAT** data are stored, plus their relationships (both words are underlined). The red annotation reads: the fields are data ("cells"); grouping them into the record is a *logical association* that turns data into *information* about instructors.

### [S7] Data Dictionary (or: System Catalog)
- "Stores **metadata**, that is, data *about* data, such as (for the Relational Model) data about relations:
  - names of relations
  - names, types and lengths of attributes of each relation
  - names and definitions of views
  - integrity constraints"
- "User and accounting information, e.g., passwords"
- "Statistical and descriptive data"
  - "number of tuples and columns in each relation"
- "Physical file organization information"
  - "How relation is stored (sequential/hash/…) /Physical location"
- "Information about indices"
- ⭐ "metadata" is in bold blue; "data *about* data" is in red.

### [S8] DBMS Architecture
- The diagram has two framed parts.
  - **Blue frame, labelled "users and administrators":** four kinds of user, each with its tool.
    - naive users (tellers, agents, web users) —*use*→ application interfaces
    - application programmers —*write*→ application programs
    - sophisticated users (analysts) —*use*→ query tools
    - database administrators —*use*→ administration tools
  - **Red frame, labelled "internal components":** three layers.
    - *query processor* (dashed box): compiler and linker, application program object code, DML queries, DDL interpreter, DML compiler and organizer, query evaluation engine.
      - Application programs go through the compiler and linker into application program object code.
      - Query tools and administration tools lead to DML queries; administration tools also lead to the DDL interpreter.
      - DML queries → DML compiler and organizer → query evaluation engine. The object code also feeds the query evaluation engine.
    - *storage manager* (dashed box): buffer manager, file manager, authorization and integrity manager, transaction manager. All four are connected to the query evaluation engine.
    - *disk storage* (a cylinder): data, indices, **data dictionary**, statistical data.
- ⭐ The **data dictionary** box is outlined in red, and a big orange arrow points at it. This links back to S7, and forward to S35 ("Output of DDL stored into Data Dictionary").
- 🔎 Look up in Track B: what **DDL** and **DML** are. They are named here and on S35 but not defined in slides 1–50.

### [S9] Data Models
- **Left:** a pyramid captioned "(Blumauer & Nagy, 2020)". From bottom to top: **DATA → INFORMATION → KNOWLEDGE → WISDOM**.
- **Orange box** next to it: "Knowledge" (red) / "Information" (green) / "Data" (blue).
- **Right:** "The **World** is… "the totality of **Facts**" (Wittgenstein) i.e., . . . **Data**!"
  - A cloud labelled "Real World (Mini World)" has a dashed line down to the orange box at the bottom.
- **Bottom orange box**, which a big orange arrow points at:
  - Data and Data relationships
  - Data semantics
  - Data constraints (*internal*, business rules, …)
- Reading the picture: the real (mini) world is captured as data, and a data model deals with that data through these three aspects.

### [S10] *Relational* Data Model
- The same picture, simplified:
  - The "Real World (Mini World)" cloud links by a dashed line to "**Data**!" and to the bottom box. The box has three bold bullets: **Data and Data relationships · Data semantics · Data constraints**.
  - A big orange arrow points **up** from this box to the "Knowledge / Information / Data" box.
- ⭐ An orange arrow labelled "**Week's focus**" points at the three bullets. This week = the three aspects as treated in the **relational** model. The title has "*Relational*" in blue italic and "Data Model" in red.

### [S11] Outline — now at **2. The Relational Model**.

### [S12] The Relational (Data) Model — "Ch 2, T; sections 2.1-2.4"
- A divider slide showing the textbook cover: *Database System Concepts*, Sixth Edition — Abraham Silberschatz, Henry F. Korth, S. Sudarshan. ("T" = this textbook.)
- ⭐ Reading reference: **Ch 2, sections 2.1–2.4**.

### [S13] Main Reference (history)
- "**Suggested reading (non-technical parts)**:" (bold, underlined). The reference is given in BibTeX, copied exactly:
```
@Article{Codd70cacm,
 author    = "E. F. Codd",
 title     = "A Relational Model of Data for Large Shared Data Banks",
 journal   = "Communications of the ACM",
 year      = "1970",
 volume    = "13",
 number    = "6",
 pages     = "377--387"
}
```
- A thumbnail of the paper's first page sits on the right.
- ⭐ The suggested reading is the *non-technical parts* of Codd's 1970 paper.

### [S14] (First page of Codd's paper, shown as an image)
- Header: "Information Retrieval" / "P. BAXENDALE, Editor". Title: "**A Relational Model of Data for Large Shared Data Banks**" — E. F. CODD, *IBM Research Laboratory, San Jose, California*.
- Key sentences of the abstract, as printed on the slide:
  - "Future users of large data banks must be protected from having to know how the data is organized in the machine (the internal representation)."
  - "A prompting service which supplies such information is not a satisfactory solution."
  - "Activities of users at terminals and most application programs should remain unaffected when the internal representation of data is changed and even when some aspects of the external representation are changed."
  - "Changes in data representation will often be needed as a result of changes in query, update, and report traffic and natural growth in the types of stored information."
  - "Existing noninferential, formatted data systems provide users with tree-structured files or slightly more general network models of the data. In Section 1, inadequacies of these models are discussed."
  - "A model based on *n*-ary relations, a normal form for data base relations, and the concept of a universal data sublanguage are introduced."
  - "In Section 2, certain operations on relations (other than logical inference) are discussed and applied to the problems of redundancy and consistency in the user's model."
  - "KEY WORDS AND PHRASES: data bank, data base, data structure, data organization, hierarchies of data, networks of data, relations, derivability, redundancy, consistency, composition, join, retrieval language, predicate calculus, security, data integrity". "CR CATEGORIES: 3.70, 3.73, 3.75, 4.20, 4.22, 4.29".
- Right column, as printed:
  - "The relational view (or model) of data described in Section 1 appears to be superior in several respects to the graph or network model [3, 4] presently in vogue for non-inferential systems."
  - "It provides a means of describing data with its natural structure only—that is, without superimposing any additional structure for machine representation purposes."
  - "Accordingly, it provides a basis for a high level data language which will yield maximal independence between programs on the one hand and machine representation and organization of data on the other."
  - "A further advantage of the relational view is that it forms a sound basis for treating derivability, redundancy, and consistency of relations—these are discussed in Section 2."
  - "The network model, on the other hand, has spawned a number of confusions, not the least of which is mistaking the derivation of connections for the derivation of relations (see remarks in Section 2 on the "connection trap")."
  - "Finally, the relational view permits a clearer evaluation of the scope and logical limitations of present formatted data systems, and also the relative merits (from a logical standpoint) of competing representations of data within a single system. … Implementations of systems to support the relational model are not discussed."
  - "1.2. DATA DEPENDENCIES IN PRESENT SYSTEMS — The provision of data description tables in recently developed information systems represents a major advance toward the goal of data independence [5, 6, 7]. Such tables facilitate changing certain characteristics of the data representation stored in a data bank. However, the variety of data representation characteristics which can be changed *without logically impairing some application programs* is still quite limited. …"
- The professor added no annotations to this slide.
- 🔎 Look up in Track B: "*n*-ary relations", "normal form", "universal data sublanguage", "data independence", "connection trap". These terms appear in the paper but are not explained in class.

### [S15] Relational Model
- "Describes data at **logical level** (and view level (*))."
  - "(*) The view level *abstracts* from the logical level."
- "Still the primary data model for commercial data-processing nowadays:
  1. It is conceptually simple.
  2. Programmers can design it easier than previous models."
- "Substantial theory exists for it (cfr. Ch. 6)"
- ⭐ "logical level" is in red. The reading reference is "cfr. Ch. 6".
- 🔎 Look up in Track B: what the "substantial theory" in Ch. 6 is.

### [S16] Outline — now at **3. Data and Data Relationships**.

### [S17] Data and Data Relationships — "or: How do we **structure** data by the Model?"
- A divider slide. The orange box lists **Data and Data relationships** (highlighted in blue), Data semantics, and Data constraints (for business rules).
- ⭐ "structure" is in red: this section is about how the model *structures* data.

### [S18] Tables, or: *Relations*
- "**Def**: A **relational database** (RDB) consists of a collection of **tables** (also called **relations**), each of which is assigned a <u>unique</u> name."
- "**Def**: A **table** is a <u>set</u> of rows (or "**tuples**"), each row representing a <u>relationship</u> R among data in the table's columns (or "**attributes**")."
- "<u>Formally</u>:" (copied exactly)
```
Table_R = {<d1,…dn>| R(d1,…dn)}, or
Table_R(a1,…,an) = {<d1,…dn>| R(a1/d1,…,an/dn)}
```
- In plain words: the table for R is the set of all rows <d1,…,dn> for which the relationship R holds among d1,…,dn. The second form also names the attributes a1,…,an, and pairs each attribute with its value (a1/d1, …, an/dn).
- ⭐ In red: relational database, relations, table, "tuples", "attributes". "unique" and "name" are in blue, with "unique" underlined; "set" and "relationship" are underlined.
- 🔎 Look up in Track B: how to read set-builder notation `{ … | … }` and the "a/d" attribute/value pairing.

### [S19] Example 1: *instructor*

*instructor:*

| ID | name | dept_name | salary |
|---|---|---|---|
| 10101 | Srinivasan | Comp. Sci. | 65000 |
| 12121 | Wu | Finance | 90000 |
| 15151 | Mozart | Music | 40000 |
| 22222 | Einstein | Physics | 95000 |
| 32343 | El Said | History | 60000 |
| 33456 | Gold | Physics | 87000 |
| 45565 | Katz | Comp. Sci. | 75000 |
| 58583 | Califieri | History | 62000 |
| 76543 | Singh | Finance | 80000 |
| 76766 | Crick | Biology | 72000 |
| 83821 | Brandt | Comp. Sci. | 92000 |
| 98345 | Kim | Elec. Eng. | 80000 |

- Labels with arrows: "**attributes (or columns)**" points at the header cells ID, name, dept_name, salary; "**tuples (or rows)**" points at the rows.
- In this table the rows are sorted by ID.

### [S20] Example 2: *instructor*

*instructor:* (the same data, in a different row order)

| ID | name | dept_name | salary |
|---|---|---|---|
| 22222 | Einstein | Physics | 95000 |
| 12121 | Wu | Finance | 90000 |
| 32343 | El Said | History | 60000 |
| 45565 | Katz | Comp. Sci. | 75000 |
| 98345 | Kim | Elec. Eng. | 80000 |
| 76766 | Crick | Biology | 72000 |
| 10101 | Srinivasan | Comp. Sci. | 65000 |
| 58583 | Califieri | History | 62000 |
| 83821 | Brandt | Comp. Sci. | 92000 |
| 15151 | Mozart | Music | 40000 |
| 33456 | Gold | Physics | 87000 |
| 76543 | Singh | Finance | 80000 |

- The same "attributes (or columns)" and "tuples (or rows)" labels appear. A **cartoon cat** stands next to the table looking puzzled, a visual "spot the difference" prompt.
- ✅ Checked in sqlite3: S19 and S20 contain **exactly the same 12 tuples** (the set difference is empty in both directions). Only the row order changed, and Remark 1 on S21 explains why that does not matter.

### [S21] Tables (*cont.*)
- "**Remark 1**: The <u>order</u> in which tuples appear in a relation is irrelevant, since a relation is a ***set*** of tuples. Again, remember:"
```
Table_R = {<d1,…dn>| R(d1,…dn)}
```
  - The curly braces are drawn in red, and a red arrow labelled "***set!***" points at the closing brace.
- "**Def**: A **relation instance** is the <u>content</u> of the relation, i.e., the values of all the relation attributes, at a given point in time."
- ⭐ "set!" ties back to the definition on S18: braces = set, so order is irrelevant. This is the answer to S19 vs S20.

### [S22] Schema / Instance (I)
- Picture, top left: a **schema box** titled `instructor`, listing <u>ID</u>, name, dept_name, salary (ID underlined), with a red outline round the box.
- Picture, bottom left: the instructor **table** (the same 12 rows as S19, in the same order), with a red outline round the **data rows** only.
- Reading the two pictures: the schema = the structure; the instance = the values.
- "**Def**: A **relation schema** is the logical view of the relation. (*So, it's its "design", or "structure".*)"
- "**Example**: for relation "*student*", the schema is:
  (*ID,name,dept_name,tot_cred*)
  <u>Note</u>: notation may vary; cf. graphical notation of tables.
  Then, to represent students we write:
  *student (ID,name,dept_name,tot_cred)*"
- "**Def**: A **relation instance** is the <u>value</u> of the relation'attributes at a given point in time."
- ⚠️ Typo: "relation'attributes" → **relation's attributes**.
- ⭐ In red: "relation schema" and "relation instance". The Note says notation may vary: textual form vs graphical box.

### [S23] Example: *course*

*course:*

| course_id | title | dept_name | credits |
|---|---|---|---|
| BIO-101 | Intro. to Biology | Biology | 4 |
| BIO-301 | Genetics | Biology | 4 |
| BIO-399 | Computational Biology | Biology | 3 |
| CS-101 | Intro. to Computer Science | Comp. Sci. | 4 |
| CS-190 | Game Design | Comp. Sci. | 4 |
| CS-315 | Robotics | Comp. Sci. | 3 |
| CS-319 | Image Processing | Comp. Sci. | 3 |
| CS-347 | Database System Concepts | Comp. Sci. | 3 |
| EE-181 | Intro. to Digital Systems | Elec. Eng. | 3 |
| FIN-201 | Investment Banking | Finance | 3 |
| HIS-351 | World History | History | 3 |
| MU-199 | Music Video Production | Music | 3 |
| PHY-101 | Physical Principles | Physics | 4 |

### [S24] Schema / Instance (II)
- "**Def**: The **schema** of a database is the logical/conceptual view on it; say, its logical design."
- "**Def**: An **instance** of a database is the <u>content</u> of all its relations, i.e., the values of all relations' attributes *at a given point in time*."
- "Concepts of "**schema**" and "**instance**" are as "**variable type**" / "**variable value**" in programming."
- ⭐ The pairs are colour-coded: "schema" and "variable type" are both in **blue**; "instance" and "variable value" are both in **red**. So schema ↔ type, instance ↔ value.
- This slide lifts S21–S22 from **one relation** to the **whole database**.

### [S25] Schema Diagram for University Database
- Each relation is drawn as a box: the name in a blue header, then the attributes. **Underlined** attributes are shown as <u>…</u> below. I checked the underlines at high zoom.

| Relation | Attributes (underlined = <u>…</u>) |
|---|---|
| takes | <u>ID</u>, <u>course_id</u>, <u>sec_id</u>, <u>semester</u>, <u>year</u>, grade |
| student | <u>ID</u>, name, dept_name, tot_cred |
| section | <u>course_id</u>, <u>sec_id</u>, <u>semester</u>, <u>year</u>, building, room_no, time_slot_id |
| course | <u>course_id</u>, title, dept_name, credits |
| department | <u>dept_name</u>, building, budget |
| advisor | <u>s_id</u>, i_id |
| time_slot | <u>time_slot_id</u>, <u>day</u>, <u>start_time</u>, end_time |
| classroom | <u>building</u>, <u>room_no</u>, capacity |
| prereq | <u>course_id</u>, <u>prereq_id</u> |
| instructor | <u>ID</u>, name, dept_name, salary |
| teaches | <u>ID</u>, <u>course_id</u>, <u>sec_id</u>, <u>semester</u>, <u>year</u> |

  (In advisor, s_id is clearly underlined; i_id appears not to be, though the image is low-resolution.)
- **Lines with arrowheads** (from → to; the arrowhead is at the "to" box):
  - takes → student (arrives at student.ID)
  - takes → section
  - teaches → section
  - teaches → instructor (arrives at instructor.ID)
  - section → course (arrives at course.course_id)
  - section → classroom (from section's building/room_no to classroom.building)
  - prereq → course (one line, arriving at course.course_id)
  - course → department
  - student → department
  - instructor → department (three arrowheads meet at department.dept_name)
  - advisor → student
  - advisor → instructor
  - **time_slot** has no line attached.
- What the arrows mean is taught in the Referential Integrity section (S51 onward, "Keys for the Integrity among Tables"), covered in the part 2 notes. In this part, the slide is about how a whole database's **structure** (its schema) is drawn.

### [S26] Textual Notation
- "Let's write some of the relation <u>schemas</u> we would need to design a RDB *for* an university, i.e:" (blue box):
  - *for students:* `student (ID,name,dept_name,tot_cred)`
  - *for instructors:* `instructor (ID,name,dept_name,courses)`
  - *for department:* `department (dept_name,building,budget)`
  - *for courses:* `course (course_id,title,dept_name,credits)`
  - *for courses' prerequisites:* `prereq (course_id,prereq_id)`
  - *for teachers:* `teaches (ID,course_id,sec_id,semester,year)`
  - …
- ⭐ "schemas" is in red and underlined; the relation names and attribute lists are in red.
- ⚠️ **Inconsistency:** this slide (and S49) writes `instructor (ID,name,dept_name,courses)`. The instructor tables (S19–S22, S31, S45–S46) and the schema diagram (S25/S50) have **salary** as the 4th attribute. If asked about the instructor *table*, use salary.
- ⚠️ "an university" → **a university**.

### [S27] *Knowledge* in RDBMSs
- "**Question**: "What students have registered to the course with course_ID = SOC3020?""
- "**Answer**: **Knowledge** emerges from DB' schemas:
  1. *department (dept_name,course_id)*
  2. *student (ID,name,dept_name,tot_cred)*
  - From 1 we can find the *dept_name* of all the departments that offer the course SOC3020.
  - From 2 we find information of students in *dept_name*."
- ⭐ ***dept_name* is highlighted in blue in both schemas and in both bullets**. It is the attribute the two relations share, and that shared attribute is what lets "knowledge emerge" from combining them. "Knowledge" is in red, echoing the Data → Information → Knowledge picture on S9–S10.
- ⚠️ "DB' schemas" → **DB schemas / the DB's schemas**. "course_ID" is written with a capital ID here; elsewhere it is course_id.
- ⚠️ This example uses its own simplified schema, `department (dept_name,course_id)`. The department schema on S26/S47/S49 is `(dept_name,building,budget)`.

### [S28] Outline — now at **4. Data Semantics**.

### [S29] Data Semantics — "or: How do we **mean** data by the Model?"
- A divider slide. The orange box lists Data and Data relationships, **Data semantics** (highlighted in blue), and Data constraints (for business rules).
- ⭐ "mean" is in red: this section is about what the data *means*.

### [S30] Attributes' Domain and Type
- "The set of <u>allowed</u> values for each attribute in a relation is called the **domain** of the attribute"
- "So, a table (relation R) is now formally defined as:" (copied exactly)
```
Table_R = {<d1 ,…dn> ∈ D1 x …x Dn | R(d1,…dn)}
where Di is the domain of the ith-attribute
```
  - The part "∈ D1 x …x Dn" is in red: it is the new piece compared with S18. Each value di must come from the domain Di of the i-th attribute.
- "**NB**: In the Relational Model, attribute values are required to be **atomic**; that is, indivisible."
  - "**Example**: no <u>set</u> of departments allowed as a value of attribute *dept_name* in table *instructor*."
- ⭐ "domain" and "atomic" are in bold blue; "NB" is in orange bold; "allowed" and "set" are underlined.
- The slide's title pairs *domain* with *type*. Compare S6, where the record declares a type for each field, e.g. `salary : integer`.
- 🔎 Look up in Track B: the meaning of "D1 x … x Dn" (Cartesian product of domains).

### [S31] Example: *instructor*
- The same table as **S20**: the same 12 rows in the same order (22222 Einstein … 76543 Singh).
- The label "**atomic value of attributes**" has a line pointing at a single cell, "Physics" (Einstein's dept_name). Each cell holds **one** indivisible value (the NB on S30).

### [S32] Attributes' Domain and Null Value
- "The special value ***null*** is a member of every domain. Used to <u>denote</u>
  - the value "unknown", or
  - the value does not exist.
  **Example**: *dept_name* in table *instructor*."
- Blue box: "**Remark:** The null value causes complications in the definition of many operations (e.g, updates)
  - Some attributes' value is fixed "**not null**" by design ( entity integrity constraint )."
- ⭐ The Remark box (blue background). "not null" is in bold, and it is linked to the **entity integrity constraint**, which is the topic of the next section.
- ⚠️ "(e.g, updates)" → **(e.g., updates)**.
- 🔎 Look up in Track B: *why* null complicates operations such as updates, and *which* attributes entity integrity requires to be "not null". The slides say only "some attributes' value".

### [S33] Outline — now at **5. Data Constraints: Entity Integrity**.

### [S34] Data Constraints — "or: How do we represent **constraints** on data (and why)?"
- A divider slide. The orange box lists Data and Data relationships, Data semantics, and **Data constraints** (highlighted in blue), now labelled "(technical and business rules)".
- ⭐ "constraints" is in red. The label in brackets changes across the deck: S9 "(*internal*, business rules, …)" → S17/S29 "(for business rules)" → S34/S38 "(technical and business rules)".

### [S35] Data Constraints (Ch 1, T; p. 11)
- "A data model should describe **data constraints** :
  - **Domain constraints**.
  - **Referential integrity constraints**.
    **E.g.**: A course must be offered by a department that actually exist.
  - **Assertions** (or "Business Rules").
    **E.g.**: "Every student must take at least 5 courses".
  - **Authorization**.
    **E.g.**: "Who can read/update what"?"
- "Data constraints are defined by using DDL"
- (blue box) "Output of DDL stored into **Data Dictionary** (or: **System Catalog**) as specific DB's data called **metadata**."
- ⭐ Reading reference: **Ch 1, T; p. 11**. The four constraint kinds are in blue. The last bullet is boxed, with Data Dictionary, System Catalog and metadata in red. It connects back to S7 and S8.
- ⚠️ "a department that actually exist" → **actually exists**.
- 🔎 Look up in Track B: what DDL is (see the S8 note).

### [S36] Integrity Constraints
- (blue box) "Integrity constraints are basically of two kinds:
  - **Entity** (or: "identity") **integrity** constraints;
  - **Referential integrity** constraints."
- ⭐ The whole statement is boxed; "Entity … integrity" and "Referential integrity" are in blue. Memorize: **two kinds**.

### [S37] Keys for Constraints
- (blue box) "**Def (general, informal)**: A **key for a relation R** defines a ***data constraint*** on data in R, i.e., a constraint on the values that R's attributes may have."
- ⭐ "key for a relation R" is in red; "data constraint" is in blue italic. A key *is* a kind of data constraint.

### [S38] Entity ("Identity") Integrity — "or: Keys for the **Integrity of Tables**"
- A divider slide. The orange box is the same as S34, with **Data constraints** (technical and business rules) highlighted.
- ⭐ "Integrity of Tables" is in red. For contrast, the matching divider in part 2 (S52) is titled "Referential Integrity — or: Keys for the Integrity among Tables". So entity integrity = keys **within** a table; referential = keys **among** tables.

### [S39] Towards Primary Keys
- "We must specify how tuples in a given relation (i.e. rows in a table) differ each other.
  - **Observe**: They <u>do differ</u>, because of:
    `Table_R = {<d1,…dn>| R(d1,…dn)}`" (red braces; a red arrow labelled "***set!***" points at them)
- "To specify it, we use the values of the tuple, which must **<u>uniquely identify</u>** the tuple."
- "No two tuples in a relation are allowed to have <u>exactly the same value</u> for all the attributes."
- ⭐ The logic: a relation is a *set* (S18, S21), so its tuples *do differ*. To *say how* they differ, we use attribute values that **uniquely identify** a tuple ("uniquely identify" is in red and underlined). This leads to keys.
- ⚠️ "differ each other" → **differ from each other**.

### [S40] Example
- "Suppose we have a student:
  *student (U1410099,Mario,CSE,12)*,
  Then, usually we want that no other student, for instance:
  *student (X,Mario,CSE,12)*
  is allowed to have an ID like *X* = U1410099."
- "Notation: *student.ID = U1410099*."
- The slide's logic, step by step:
  1. Student Mario has ID U1410099.
  2. Another tuple with the same name, department and credits *may* exist (another Mario in CSE with 12 credits).
  3. That other student must **not** have the same ID. If X = U1410099, the two tuples would be identical on every attribute (S39 forbids this), and ID would no longer distinguish students.
  4. The notation *relation.attribute* (student.ID) names one attribute of a relation.

### [S41] Super-Keys
- (blue box) "**Def**: A **superkey for a relation R** is a set of <u>one or more attributes</u> that, taken collectively, allow us to <u>identify uniquely</u> a tuple in R."
- "**Example**: Suppose that in
  *student (ID,name,dept_name,tot_cred)*
  the *ID* attribute is "sufficient by design" to distinguish one *student* from another.
  Then *ID* is a superkey for *student*. But, say, {*dept_name*, *tot_cred*} is not (by common sense)."
- ⭐ "superkey" is in bold red. The words "one or more attributes" (a *set*) and "identify uniquely" are underlined. Note how the slide decides: "sufficient **by design**" and "by **common sense**" — not by looking at one table's data.

### [S42] Candidate-Keys
- "**Remark**: If K is a superkey for a relation, then any superset of K is a superkey."
- "**Example**: *student (ID,name,dept_name,tot_cred)*
  *ID* superkey implies that also, say,
  {*ID,name*} and {*ID,dep_name*}
  are a superkey for *student*. [<u>supersets</u> of {*ID*}]."
- "Best superkeys are **minimal**, that is, do not have a <u>proper subset</u> that is a superkey."
- "**Def**. Minimal superkeys are **candidate keys**."
- ⭐ "minimal" is in red; "candidate keys" is in bold red; "supersets" and "proper subset" are underlined.
- ⚠️ "{ID,dep_name}" → **{ID,dept_name}**. "are a superkey" → **are superkeys**.

### [S43] Example
- *student (ID,name,dept_name,tot_cred)*
- "Suppose that, apart *ID*, <u>also</u> the combination of *name* and *dept_name* is sufficient to distinguish among members of the *student* relation."
- "Thus, both {*ID*} and {*name*, *dept_name*} are superkeys and, also, candidate keys."
- "Moreover, also {ID,*name*} is a superkey for *student*, but it is <u>not</u> a candidate key. **(Why? )**"
- ⭐ **Question to the class: "(Why?)"**. Answer from S42: {ID,name} has a **proper subset**, {ID}, that is already a superkey, so {ID,name} is **not minimal** and therefore not a candidate key.
- ⚠️ "apart ID" → **apart from ID**.

### [S44] Primary Keys
- (blue box) "**Def**: A **primary key for a relation R** is a candidate key *<u>chosen by the database designer</u>* to identify uniquely a tuple in the relation R."
- "**Remark**: a primary key is **for a relation**.
  - This means that it is a property of the relation (and not of the individual tuples)."
- "Primary keys must be chosen with care (e.g., attributes's values don't change over time)."
- ⭐ "primary key" is in bold red; "chosen by the database designer" is in italic and underlined; "for a relation" is in blue.
- ⚠️ "attributes's values" → **attributes' values**.

### [S45] Example: *instructor*
- The same table as **S20/S31** (the same 12 rows in the same order).
- The header cell **ID** is boxed in red, and a red arrow labelled "***primary key***" points at it.
- Left side: "*Usual notation:* <u>ID</u> (underlying)", with ID in red and underlined.
- ⚠️ "(underlying)" → **(underlined)**: the usual notation is to underline the primary-key attribute.

### [S46] Example: *instructor* (notation)

*instructor:*

| <u>ID</u> | name | dept_name | salary |
|---|---|---|---|
| 22222 | Einstein | Physics | 95000 |
| 12121 | Wu | Finance | 90000 |
| 32343 | El Said | History | 60000 |
| 45565 | Katz | Comp. Sci. | 75000 |
| 98345 | Kim | Elec. Eng. | 80000 |
| 76766 | Crick | Biology | 72000 |
| 10101 | Srinivasan | Comp. Sci. | 65000 |
| 58583 | Califieri | History | 62000 |
| 83821 | Brandt | Comp. Sci. | 92000 |
| 15151 | Mozart | Music | 40000 |
| 33456 | Gold | Physics | 87000 |
| 76543 | Singh | Finance | 80000 |

- The header **<u>ID</u>** is now underlined, and a red arrow labelled "*primary key*" points at it. This is the notation from S45 in use.

### [S47] Example: *department*

*department:*

| <u>dept_name</u> (boxed in red) | building | budget |
|---|---|---|
| Biology | Watson | 90000 |
| Comp. Sci. | Taylor | 100000 |
| Elec. Eng. | Taylor | 85000 |
| Finance | Painter | 120000 |
| History | Painter | 50000 |
| Music | Packard | 80000 |
| Physics | Watson | 70000 |

- The header **dept_name** is boxed in red, and a red arrow labelled "*primary key*" points at it.

### [S48] Example: *section* (notation)

*section:*

| <u>course_id</u> | <u>sec_id</u> | <u>semester</u> | <u>year</u> | building | room_number | time_slot_id |
|---|---|---|---|---|---|---|
| BIO-101 | 1 | Summer | 2009 | Painter | 514 | B |
| BIO-301 | 1 | Summer | 2010 | Painter | 514 | A |
| CS-101 | 1 | Fall | 2009 | Packard | 101 | H |
| CS-101 | 1 | Spring | 2010 | Packard | 101 | F |
| CS-190 | 1 | Spring | 2009 | Taylor | 3128 | E |
| CS-190 | 2 | Spring | 2009 | Taylor | 3128 | A |
| CS-315 | 1 | Spring | 2010 | Watson | 120 | D |
| CS-319 | 1 | Spring | 2010 | Watson | 100 | B |
| CS-319 | 2 | Spring | 2010 | Taylor | 3128 | C |
| CS-347 | 1 | Fall | 2009 | Taylor | 3128 | A |
| EE-181 | 1 | Spring | 2009 | Taylor | 3128 | C |
| FIN-201 | 1 | Spring | 2010 | Packard | 101 | B |
| HIS-351 | 1 | Spring | 2010 | Painter | 514 | C |
| MU-199 | 1 | Spring | 2010 | Packard | 101 | D |
| PHY-101 | 1 | Fall | 2009 | Watson | 100 | A |

- The four headers course_id, sec_id, semester and year are underlined and enclosed **together in one red box**, with a red arrow labelled "*primary key*".
- ⭐ "***NB****: singular* ***key****, not* ***keys****!*" ("key" and "keys" in red). The four underlined attributes form **ONE** primary key, not four separate keys.
- ⚠️ Name inconsistency: this table calls the column **room_number**, while the schema diagram (S25/S50) calls it **room_no**.
- 🔎 Look up in Track B: the usual name for a key that consists of several attributes.

### [S49] Textual Notation (*cont.*)
- "Let's write some of the relation **schemas** and **integrity constraints** for our university DB, i.e:" (blue box; key attributes in red and underlined):
  - *for students:* student (<u>ID</u>,name,dept_name,tot_cred)
  - *for instructors:* instructor (<u>ID</u>,name,dept_name,courses)
  - *for department:* department (<u>dept_name</u>,building,budget)
  - *for courses:* course (<u>course_id</u>,title,dept_name,credits)
  - *for teachers:* teaches (<u>ID</u>,<u>course_id</u>,<u>sec_id</u>,<u>semester</u>,<u>year</u>)
  - …
- ⭐ This is S26 again, but now the **integrity constraints** (the primary keys) are written into the schemas by **underlining** them. "schemas" and "integrity constraints" are in red. For teaches, **all five** attributes together are the key.
- prereq (listed on S26) is not on this slide. ⚠️ instructor still shows "courses" (see the S26 note: elsewhere it is salary).

### [S50] Schema Diagram for University Database (repeated)
- This is the **same picture as S25**: I confirmed the PDF embeds the identical image. It now sits in the "Data Constraints: Entity Integrity" section.
- In this section, the **underlines** are what matter: they mark each relation's primary key (the notation of S45–S46, S48–S49). See the full relation table under [S25].

---

## 3. Definitions & key terms (word for word)

- **Database (management) system**: "a database (management) system is a "sum" of interrelated data (Abstract World) and a set of programs that allow users to access and modify (conveniently, efficiently) these data." [S5]
- **Purpose of a DBMS / data model**: "A purpose of a database (management) system is to provide each user with an abstract view of the data." "Such view is provided by a specific data model." [S5]
- **Physical level**: "describes how a record (e.g., instructor) is physically stored." [S6]
- **Logical level**: "describes what data are stored in database, and the relationships among the data." [S6]
- **View level**: "application programs hide details of some data types. Views used to hide some information ("logical level") for security/privacy purposes. (E.g.: an employee's salary)" [S6]
- **Information (from data)**: "logical association; i.e., we transform data into information (about instructors) Information is defined from structured data (the record)" [S6]
- **Data dictionary / System catalog**: "Stores metadata, that is, data about data, such as (for the Relational Model) data about relations" [S7]; "Output of DDL stored into Data Dictionary (or: System Catalog) as specific DB's data called metadata." [S35]
- **Metadata**: "data about data" [S7]
- **Relational model**: "Describes data at logical level (and view level (*))." "(*) The view level abstracts from the logical level." [S15]
- **Relational database (RDB)**: "A relational database (RDB) consists of a collection of tables (also called relations), each of which is assigned a unique name." [S18]
- **Table (relation), tuple, attribute**: "A table is a set of rows (or "tuples"), each row representing a relationship R among data in the table's columns (or "attributes")." [S18]; picture labels: "attributes (or columns)", "tuples (or rows)" [S19]
- **Table, formally**: `Table_R = {<d1,…dn>| R(d1,…dn)}`, or `Table_R(a1,…,an) = {<d1,…dn>| R(a1/d1,…,an/dn)}` [S18]; with domains: `Table_R = {<d1 ,…dn> ∈ D1 x …x Dn | R(d1,…dn)}` "where Di is the domain of the ith-attribute" [S30]
- **Relation instance**: "A relation instance is the content of the relation, i.e., the values of all the relation attributes, at a given point in time." [S21] Also: "A relation instance is the value of the relation'attributes at a given point in time." [S22]
- **Relation schema**: "A relation schema is the logical view of the relation. (So, it's its "design", or "structure".)" [S22]
- **Schema of a database**: "The schema of a database is the logical/conceptual view on it; say, its logical design." [S24]
- **Instance of a database**: "An instance of a database is the content of all its relations, i.e., the values of all relations' attributes at a given point in time." [S24]
- **Schema/instance analogy**: "Concepts of "schema" and "instance" are as "variable type" / "variable value" in programming." [S24]
- **Domain**: "The set of allowed values for each attribute in a relation is called the domain of the attribute" [S30]
- **Atomic**: "In the Relational Model, attribute values are required to be atomic; that is, indivisible." [S30]
- **null**: "The special value null is a member of every domain. Used to denote the value "unknown", or the value does not exist." [S32]
- **Data constraints (kinds)**: "A data model should describe data constraints: Domain constraints. Referential integrity constraints. Assertions (or "Business Rules"). Authorization." [S35]
- **Integrity constraints (kinds)**: "Integrity constraints are basically of two kinds: Entity (or: "identity") integrity constraints; Referential integrity constraints." [S36]
- **Entity integrity constraint ("not null")**: "Some attributes' value is fixed "not null" by design ( entity integrity constraint )." [S32]
- **Key (general, informal)**: "A key for a relation R defines a data constraint on data in R, i.e., a constraint on the values that R's attributes may have." [S37]
- **Superkey**: "A superkey for a relation R is a set of one or more attributes that, taken collectively, allow us to identify uniquely a tuple in R." [S41]
- **Minimal**: "Best superkeys are minimal, that is, do not have a proper subset that is a superkey." [S42]
- **Candidate key**: "Minimal superkeys are candidate keys." [S42]
- **Primary key**: "A primary key for a relation R is a candidate key chosen by the database designer to identify uniquely a tuple in the relation R." [S44]
- **Primary-key notation**: "Usual notation: ID (underlying)" (⚠️ = underlined) [S45]; underlined headers [S46, S48]; underlined attributes in the textual schemas [S49]
- **Dot notation**: "Notation: student.ID = U1410099." [S40]

---

## 4. Rules & comparisons to memorize (exactly as on the slides)

**Vocabulary equivalences** [S18, S19]

| Term | Also called |
|---|---|
| table | relation |
| row | tuple |
| column | attribute |

**Three levels of abstraction** [S6]

| Level | Describes |
|---|---|
| Physical | "how a record (e.g., instructor) is physically stored" |
| Logical | "what data are stored in database, and the relationships among the data" |
| View | "application programs hide details of some data types … for security/privacy purposes (E.g.: an employee's salary)" |

- The relational model "Describes data at logical level (and view level (*))"; "(*) The view level abstracts from the logical level." [S15]

**Schema vs instance** [S21, S22, S24]

| | Schema | Instance |
|---|---|---|
| Of one relation | "the logical view of the relation" = its "design", or "structure" [S22] | "the content of the relation, i.e., the values of all the relation attributes, at a given point in time" [S21] |
| Of a database | "the logical/conceptual view on it; say, its logical design" [S24] | "the content of all its relations … at a given point in time" [S24] |
| Programming analogy | "variable type" | "variable value" [S24] |

**Rules about relations**
1. "The order in which tuples appear in a relation is irrelevant, since a relation is a set of tuples." [S21]
2. "No two tuples in a relation are allowed to have exactly the same value for all the attributes." [S39]
3. Tuples are told apart by "the values of the tuple, which must uniquely identify the tuple." [S39]
4. "attribute values are required to be atomic; that is, indivisible" — e.g. "no set of departments allowed as a value of attribute dept_name in table instructor." [S30]
5. "The special value null is a member of every domain." It denotes "unknown" or "does not exist"; it "causes complications in the definition of many operations (e.g, updates)"; "Some attributes' value is fixed "not null" by design ( entity integrity constraint )." [S32]
6. Each relation in an RDB "is assigned a unique name." [S18]

**Keys: from superkey to primary key** [S41–S44]

| Concept | Rule on the slides |
|---|---|
| Superkey | a set of one or more attributes that "taken collectively, allow us to identify uniquely a tuple in R" [S41] |
| Superset rule | "If K is a superkey for a relation, then any superset of K is a superkey." [S42] |
| Candidate key | "Minimal superkeys are candidate keys" — minimal = "do not have a proper subset that is a superkey" [S42] |
| Primary key | "a candidate key chosen by the database designer" [S44] |
| Whose property? | "a primary key is for a relation … a property of the relation (and not of the individual tuples)" [S44] |
| How to choose | "Primary keys must be chosen with care (e.g., attributes's values don't change over time)" [S44] |
| Notation | the primary-key attribute(s) are underlined [S45, S46, S48, S49] |
| Several attributes | "NB: singular key, not keys!" — section's 4 underlined attributes form ONE key [S48] |

So: every primary key is a candidate key, and every candidate key is a superkey [S42, S44]. The reverse is not true: {ID,name} is a superkey but **not** a candidate key [S43].

**Constraints** [S35, S36, S37]

| Kind of data constraint [S35] | Slide example |
|---|---|
| Domain constraints | (no example on S35; domain = "set of allowed values" [S30]) |
| Referential integrity constraints | "A course must be offered by a department that actually exist[s]." |
| Assertions (or "Business Rules") | "Every student must take at least 5 courses". |
| Authorization | "Who can read/update what"? |

- "Data constraints are defined by using DDL"; "Output of DDL stored into Data Dictionary (or: System Catalog) as specific DB's data called metadata." [S35]
- Integrity constraints = **two kinds**: entity ("identity") integrity and referential integrity. [S36]
- Entity integrity = "Keys for the Integrity of Tables". [S38] (Referential = "Keys for the Integrity among Tables", S52, part 2.)
- A key "defines a data constraint" on R. [S37]

**The three aspects of a data model** [S9, S10, S17, S29, S34, S38]
- Data and Data relationships → "How do we **structure** data by the Model?" [S17]
- Data semantics → "How do we **mean** data by the Model?" [S29]
- Data constraints → "How do we represent **constraints** on data (and why)?" [S34]

**Data dictionary contents** [S7]: names of relations; names, types and lengths of attributes of each relation; names and definitions of views; integrity constraints; user and accounting information (e.g., passwords); statistical and descriptive data (number of tuples and columns in each relation); physical file organization information (how relation is stored, sequential/hash/…, physical location); information about indices.

**Why the relational model is still primary** [S15]: "1. It is conceptually simple. 2. Programmers can design it easier than previous models." + "Substantial theory exists for it (cfr. Ch. 6)".

---

## 5. Examples & exercises from class (worked step by step)

### 5.1 [S6] Data vs information in the instructor record
1. Fields `ID : string; name : string; dept_name : string; salary : integer;` → these are **data ("cells")**.
2. Grouping them with `type instructor = record … end;` is the **logical association**.
3. The result is **information about instructors**: "Information is defined from structured data (the record)".

### 5.2 [S19 vs S20] Are Example 1 and Example 2 the same relation?
1. Compare the rows: both tables contain the same 12 (ID, name, dept_name, salary) rows; only the order differs.
2. A relation is a **set** of tuples (S18, the braces in S21 marked "set!").
3. By **Remark 1** (S21), "The order in which tuples appear in a relation is irrelevant".
4. → **Yes, it is the same relation (the same instance).** ✅ Checked in sqlite3: S19 minus S20 = 0 rows, and S20 minus S19 = 0 rows.

### 5.3 [S18] Reading the formal definition on the slide's own table
- `Table_instructor = {<d1,…,d4> | instructor(d1,…,d4)}`.
- The row <10101, Srinivasan, Comp. Sci., 65000> is in the table: it is one relationship among the data in the four columns.
- In the second form, the same row reads instructor(ID/10101, name/Srinivasan, dept_name/Comp. Sci., salary/65000).
- With domains (S30): each di must belong to Di, the domain of the i-th attribute.

### 5.4 [S22, S26, S49] Writing schemas in textual notation
- A schema is the relation's name followed by its attribute list: `student (ID,name,dept_name,tot_cred)` [S22, S26].
- Adding the integrity constraints (S49) means underlining the primary key:
  - student (<u>ID</u>,name,dept_name,tot_cred)
  - department (<u>dept_name</u>,building,budget)
  - course (<u>course_id</u>,title,dept_name,credits)
  - teaches (<u>ID</u>,<u>course_id</u>,<u>sec_id</u>,<u>semester</u>,<u>year</u>)
  - instructor (<u>ID</u>,name,dept_name,courses) — ⚠️ salary in the tables/diagram

### 5.5 [S27] "What students have registered to the course with course_ID = SOC3020?"
1. Use relation 1, *department (dept_name, course_id)*: keep the departments whose course_id is SOC3020 and read off their **dept_name** values.
2. Use relation 2, *student (ID, name, dept_name, tot_cred)*: find the students whose **dept_name** is one of those values, and read their information.
3. The link between the two relations is the **shared attribute dept_name** (blue on the slide). "Knowledge emerges from DB' schemas": neither relation alone answers the question.
- Note (from the slides only): as written, the two steps give the students *of the department(s) that offer* SOC3020. The full University diagram (S25) also has a relation **takes** (ID, course_id, sec_id, semester, year, grade), with arrows to student and section. 🔎 Look up in Track B: how such a relation would answer "who registered to course X" directly.

### 5.6 [S30, S31] Atomic values
- On S31, the cell dept_name = "Physics" for Einstein holds **one** value. That is an "atomic value of attributes".
- Not allowed (S30): an instructor whose dept_name is a **set** such as {Physics, Comp. Sci.}. A set is not indivisible.

### 5.7 [S32] null
- The slide's example is "*dept_name* in table *instructor*". An instructor's dept_name could be null, meaning either "unknown" or "does not exist".
- Because null "causes complications", some attributes are fixed "not null" by design (the entity integrity constraint).

### 5.8 [S35, S36] Classifying constraints (the slide's own examples)

| Statement | Kind (S35) |
|---|---|
| "A course must be offered by a department that actually exist[s]." | Referential integrity constraint |
| "Every student must take at least 5 courses". | Assertion (Business Rule) |
| "Who can read/update what"? | Authorization |
| The allowed values of an attribute (its domain, S30) | Domain constraint |

- Integrity constraints, specifically, are of two kinds (S36): entity (identity) integrity and referential integrity.

### 5.9 [S39, S40] Why must student IDs differ?
1. A relation is a set, so its tuples *do differ* (S39).
2. We specify *how* they differ with values that **uniquely identify** a tuple (S39).
3. Mario = student(U1410099, Mario, CSE, 12). Another student(X, Mario, CSE, 12) must have **X ≠ U1410099** (S40). Otherwise ID could not distinguish them, and the two tuples would even be identical on all attributes, which S39 forbids.

### 5.10 [S41] Which sets are superkeys of student(ID, name, dept_name, tot_cred)?
- {ID}: **superkey**, because ID is "sufficient by design" to distinguish one student from another.
- {dept_name, tot_cred}: **not** a superkey ("by common sense").
- Derived from the slides' rules, using only S41 + S42:
  - If {dept_name} alone were a superkey, then by the S42 Remark its superset {dept_name, tot_cred} would also be one. S41 says it is not, so **{dept_name} is not a superkey**.
  - The same argument gives **{tot_cred} is not a superkey**.

### 5.11 [S42] Supersets of {ID}
Because {ID} is a superkey, **every** superset of {ID} is a superkey. student has 4 attributes, so there are 2³ = 8 such sets:
- {ID}
- {ID,name}, {ID,dept_name}, {ID,tot_cred}
- {ID,name,dept_name}, {ID,name,tot_cred}, {ID,dept_name,tot_cred}
- {ID,name,dept_name,tot_cred}

The slide names two of them: {ID,name} and {ID,dep_name} (⚠️ = dept_name).

### 5.12 [S43] Candidate keys, superkeys and the "(Why?)" question
**Assumption (S43):** {ID} is sufficient, and {name, dept_name} is also sufficient. Neither name alone nor dept_name alone is enough: otherwise {name, dept_name} would not be minimal, yet the slide calls it a candidate key. Nothing else identifies a student unless it contains one of these two sets.

- **Candidate keys:** {ID} and {name, dept_name}. Neither has a proper subset that is a superkey, so both are minimal (S42).
- **All superkeys** = supersets of {ID} (8 sets, see 5.11) plus supersets of {name, dept_name} that do not contain ID: {name,dept_name} and {name,dept_name,tot_cred}. That makes **10 superkeys**:

| # | Superkey | Candidate key? |
|---|---|---|
| 1 | {ID} | ✔ yes |
| 2 | {name, dept_name} | ✔ yes |
| 3 | {ID, name} | ✘ (contains {ID}) |
| 4 | {ID, dept_name} | ✘ (contains {ID}) |
| 5 | {ID, tot_cred} | ✘ |
| 6 | {ID, name, dept_name} | ✘ |
| 7 | {ID, name, tot_cred} | ✘ |
| 8 | {ID, dept_name, tot_cred} | ✘ |
| 9 | {name, dept_name, tot_cred} | ✘ (contains {name, dept_name}) |
| 10 | {ID, name, dept_name, tot_cred} | ✘ |

- **"(Why?)" — why is {ID,name} a superkey but not a candidate key?** It is a superkey because it is a superset of the superkey {ID} (S42 Remark). It is *not* a candidate key because it has a **proper subset**, {ID}, that is already a superkey, so it is not minimal (S42).

### 5.13 [S44, S49] Choosing the primary key of student
- There are two candidate keys: {ID} and {name, dept_name}. The **database designer** picks one (S44), "with care (e.g., attributes's values don't change over time)".
- The slides' choice is **ID**: student (<u>ID</u>,name,dept_name,tot_cred) on S49, and <u>ID</u> in the S25/S50 diagram.

### 5.14 [S45–S47] Instance checks on the slides' own tables (✅ sqlite3)
- **instructor** (12 rows):
  - ID: 12 distinct values, consistent with <u>ID</u> as the primary key.
  - dept_name: only 7 distinct values (Comp. Sci. ×3; Finance, History, Physics ×2 each). Several tuples share a value, so **{dept_name} cannot identify a tuple uniquely**: it is not a superkey (S41).
  - salary: 80000 appears twice (Singh, Kim), so {salary} is not a superkey.
  - name: happens to be all-distinct in this instance, but the designer chose ID (S45).
- **department** (7 rows):
  - dept_name: 7 distinct values, the primary key (S47).
  - building repeats (Watson, Taylor, Painter twice each), so {building} is not a superkey.
  - budget: happens to be all-distinct in this instance, but it is not the chosen key.
- **course** (13 rows): course_id is distinct, the underlined key on S25 and S49. dept_name (7 distinct) and credits (only 3 or 4) repeat.
- Lesson in the slides' own words: keys are decided "by design" or "by common sense" (S41) and "chosen by the database designer" (S44). A key is "a property of the relation (and not of the individual tuples)" (S44). Being distinct in today's rows is not what the slides use to make something a key. 🔎 Look up in Track B: what one table instance can and cannot tell you about keys.

### 5.15 [S48] section: why "singular key, not keys!"
- **Primary key** = {course_id, sec_id, semester, year}: **one** key made of four attributes.
- ✅ In sqlite3, all 15 rows have distinct (course_id, sec_id, semester, year).
- Why fewer attributes fail, using the slide's rows:
  - {course_id}: CS-101, CS-190 and CS-319 each appear **twice** → not a superkey.
  - {course_id, sec_id}: (CS-101, 1) appears **twice**, in Fall 2009 and Spring 2010 → not a superkey.
  - {course_id, semester, year}: (CS-190, Spring, 2009) twice (sec 1 and 2), and (CS-319, Spring, 2010) twice (sec 1 and 2) → not a superkey.
- Note: in *this* instance, {course_id, sec_id, semester} and {course_id, sec_id, year} happen to have no duplicates. Still, the designer's key (S48, and S25's underlines) uses all four attributes (see the lesson in 5.14).

### 5.16 [S25/S50] Reading primary keys off the schema diagram (underline = primary key)

| Relation | Primary key (underlined) |
|---|---|
| student | {ID} |
| instructor | {ID} |
| department | {dept_name} |
| course | {course_id} |
| section | {course_id, sec_id, semester, year} |
| takes | {ID, course_id, sec_id, semester, year} (grade is not part of it) |
| teaches | {ID, course_id, sec_id, semester, year} |
| prereq | {course_id, prereq_id} |
| classroom | {building, room_no} |
| time_slot | {time_slot_id, day, start_time} (end_time is not part of it) |
| advisor | {s_id} (i_id appears not underlined) |

---

## 6. Likely quiz/exam questions (from these slides only)

1. **(MCQ)** According to the class definition, a relational database consists of:
   a) a set of programs that access data · b) a collection of tables (relations), each assigned a unique name · c) one table per user · d) a collection of records linked by arrows
2. **(Definition)** Give the class definition of a *table*. What are its rows and columns also called?
3. **(T/F, justify)** "Reordering the rows of the instructor table (S19 → S20) produces a different relation."
4. **(MCQ)** "The logical view of the relation — its *design* or *structure*" is the relation's: a) instance · b) schema · c) domain · d) key. In the programming analogy, schema and instance correspond to what?
5. **(Fill in)** "The set of ______ values for each attribute in a relation is called the ______ of the attribute." Then write the formal definition of a table that uses domains.
6. **(T/F, justify)** "In the relational model, an instructor's dept_name may hold the set {Physics, Comp. Sci.}."
7. **(Short)** What does the special value *null* denote? Which domains is it a member of? What does the Remark on S32 say about it?
8. **(Classify)** Using S35, classify: (i) "Every student must take at least 5 courses"; (ii) "A course must be offered by a department that actually exists"; (iii) "Who can read/update what?". Then name the **two kinds** of integrity constraints.
9. **(Short)** How are data constraints defined, and where is the output stored? Give four kinds of information that the data dictionary stores.
10. **(Recall)** Who introduced the relational model, in which paper, journal and year?
11. **(Reasoning)** Using only S41 and S42, show that {dept_name} is **not** a superkey of student(ID, name, dept_name, tot_cred).
12. **(Keys)** Assume, as on S43, that in student(ID, name, dept_name, tot_cred) both {ID} and {name, dept_name} are sufficient to distinguish students, and nothing else is unless it contains one of them. (a) List all candidate keys. (b) How many superkeys are there? List them.
13. **(Why?)** {ID, name} is a superkey for student. Is it a candidate key? Why or why not?
14. **(T/F)** (a) Any superset of a superkey is a superkey. (b) Every superkey is a candidate key. (c) Every candidate key is a superkey. (d) A primary key is a property of the individual tuples. (e) section has four primary keys.
15. **(Definition)** Define *primary key*. Give the two remarks on S44 about it.
16. **(Instance)** Using only the department instance on S47: (a) which attribute can be ruled out as a superkey, and why? (b) Which attribute is the primary key, and how is it marked?
17. **(section)** (a) What is the primary key of section (S48)? (b) What does "NB: singular key, not keys!" mean? (c) Using the slide's rows, show that {course_id, sec_id} is not a superkey.
18. **(Diagram)** In the University schema diagram (S25/S50), what does an underlined attribute mean? Give the primary keys of takes, teaches, prereq, classroom and time_slot.
19. **(Levels)** Match each level (physical / logical / view) to its description: "how a record is physically stored"; "what data are stored … and the relationships among the data"; "hide some information … for security/privacy purposes". At which level does the relational model describe data?
20. **(Example)** Student Mario is student(U1410099, Mario, CSE, 12). Why may another tuple student(X, Mario, CSE, 12) not have X = U1410099? What does the notation student.ID = U1410099 mean?

### Answers

1. **b** — "A relational database (RDB) consists of a collection of tables (also called relations), each of which is assigned a unique name." [S18]
2. "A table is a set of rows (or "tuples"), each row representing a relationship R among data in the table's columns (or "attributes")." Rows = tuples; columns = attributes. [S18, S19]
3. **False.** "The order in which tuples appear in a relation is irrelevant, since a relation is a set of tuples." S19 and S20 contain the same 12 tuples. [S20, S21]
4. **b) schema** [S22]. Schema ↔ "variable type"; instance ↔ "variable value" [S24]. (Instance = "the content of the relation, i.e., the values of all the relation attributes, at a given point in time" [S21].)
5. "allowed", "domain" [S30]. `Table_R = {<d1 ,…dn> ∈ D1 x …x Dn | R(d1,…dn)}`, "where Di is the domain of the ith-attribute". [S30]
6. **False.** Values must be **atomic** (indivisible): "no set of departments allowed as a value of attribute dept_name in table instructor." [S30]
7. null denotes "the value "unknown", or the value does not exist"; it "is a member of every domain". Remark: "The null value causes complications in the definition of many operations (e.g, updates)"; "Some attributes' value is fixed "not null" by design ( entity integrity constraint )." [S32]
8. (i) Assertion (Business Rule); (ii) Referential integrity constraint; (iii) Authorization. [S35] The two kinds of integrity constraints: **entity (identity) integrity** and **referential integrity**. [S36]
9. "Data constraints are defined by using DDL"; "Output of DDL stored into Data Dictionary (or: System Catalog) as specific DB's data called metadata." [S35] Any four of: names of relations; names, types and lengths of attributes; names and definitions of views; integrity constraints; user and accounting information (passwords); statistical data (number of tuples and columns); physical file organization; information about indices. [S7]
10. E. F. Codd, "A Relational Model of Data for Large Shared Data Banks", *Communications of the ACM*, 1970 (vol. 13, no. 6, pp. 377–387). [S13, S14]
11. S42 Remark: any superset of a superkey is a superkey. If {dept_name} were a superkey, its superset {dept_name, tot_cred} would be a superkey too. S41 says {dept_name, tot_cred} "is not (by common sense)". Therefore {dept_name} is not a superkey. [S41, S42]
12. (a) {ID} and {name, dept_name} [S43]. (b) **10 superkeys**: the 8 supersets of {ID}, namely {ID}, {ID,name}, {ID,dept_name}, {ID,tot_cred}, {ID,name,dept_name}, {ID,name,tot_cred}, {ID,dept_name,tot_cred} and {ID,name,dept_name,tot_cred}; plus {name,dept_name} and {name,dept_name,tot_cred}. [S42, S43; worked in §5.12]
13. It is a superkey (a superset of the superkey {ID}), but **not** a candidate key: it is not minimal, because its proper subset {ID} is already a superkey. "Best superkeys are minimal, that is, do not have a proper subset that is a superkey"; "Minimal superkeys are candidate keys." [S42, S43]
14. (a) T [S42]; (b) F, e.g. {ID,name} [S43]; (c) T, candidate keys are (minimal) superkeys [S42]; (d) F, "a property of the relation (and not of the individual tuples)" [S44]; (e) F, "NB: singular key, not keys!": one key of four attributes [S48].
15. "A primary key for a relation R is a candidate key chosen by the database designer to identify uniquely a tuple in the relation R." Remarks: "a primary key is for a relation. This means that it is a property of the relation (and not of the individual tuples)"; "Primary keys must be chosen with care (e.g., attributes's values don't change over time)." [S44]
16. (a) **building**: Watson, Taylor and Painter each appear twice, so building cannot "identify uniquely a tuple" [S41, S47]. (b) **dept_name**: boxed with the arrow "primary key" on S47, and underlined in S49 and the S25 diagram. (budget is distinct in this instance, but keys are chosen by design, not read off the data [S41, S44].)
17. (a) {course_id, sec_id, semester, year}, the four underlined attributes [S48]. (b) Together they form **one** primary key, not four keys [S48]. (c) (CS-101, 1) appears in two tuples, Fall 2009 and Spring 2010. Those two tuples have the same values for {course_id, sec_id}, so that set cannot identify a tuple uniquely. [S41, S48]
18. Underlined = primary key: "Usual notation: ID (underlying)" (⚠️ underlined) [S45, S46, S48, S49]. takes {ID, course_id, sec_id, semester, year}; teaches {ID, course_id, sec_id, semester, year}; prereq {course_id, prereq_id}; classroom {building, room_no}; time_slot {time_slot_id, day, start_time}. [S25/S50]
19. Physical → "how a record … is physically stored"; logical → "what data are stored … and the relationships among the data"; view → hides information "for security/privacy purposes". [S6] The relational model describes data "at logical level (and view level (*))". [S15]
20. The values of a tuple "must uniquely identify the tuple" [S39]. We want ID to distinguish one student from another [S40, S41]. With X = U1410099, the two tuples would be identical on all attributes, which is not allowed [S39]. student.ID = U1410099 means "the ID attribute of student has value U1410099" (relation.attribute notation) [S40].

---

## 7. Self-check

- [ ] I can recall the week-1 recap: DBMS = interrelated data + set of programs; the three levels (physical = how, logical = what, view = hide for security/privacy); what the data dictionary stores (metadata). [S5–S8]
- [ ] I can state the three aspects of a data model (structure / meaning / constraints) and why the relational model is still primary (conceptually simple, easier for programmers, substantial theory), and name Codd 1970. [S9–S15]
- [ ] I can define relational database, table/relation, tuple/row and attribute/column **word for word**, and explain the formal set notation `Table_R = {<d1,…dn>| R(d1,…dn)}`. [S18, S19]
- [ ] I can explain why the order of rows does not matter and why no two tuples may be identical, using the "set!" argument. [S21, S39]
- [ ] I can distinguish schema from instance, for one relation and for a whole database, and give the variable type / variable value analogy. [S21, S22, S24]
- [ ] I can write schemas in textual notation with the primary key underlined, and read every relation's key off the University schema diagram. [S25, S26, S49, S50]
- [ ] I can define domain, atomic and null, give the slide examples, and connect "not null" to the entity integrity constraint. [S30–S32]
- [ ] I can list the four kinds of data constraints with their examples, say that they are defined by DDL and stored as metadata, and name the two kinds of integrity constraints. [S35, S36]
- [ ] I can define superkey, candidate key and primary key. Given a relation and assumptions, I can list all superkeys and candidate keys and answer "why is {ID,name} not a candidate key?". [S41–S44]
- [ ] I can explain "NB: singular key, not keys!" using the section table, and use a table instance to show that a set of attributes is **not** a superkey. [S47, S48]
