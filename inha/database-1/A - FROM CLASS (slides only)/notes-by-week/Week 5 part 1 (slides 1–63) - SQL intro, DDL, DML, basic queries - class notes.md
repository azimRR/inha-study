# Week 5, part 1 (slides 1–63) — SQL intro: DDL, DML, basic query structure (CLASS NOTES — from slides only)

> Source: W5L1L2 [Q1].pdf, slides 1–63 of 110. [S#] = the "n / 110" footer number (it is the same as the slide-image number; title, outline and divider slides have no footer).
>
> **Track A: class material only.** Everything here comes from the slides. Part 2 (S64–S110: Cartesian product, natural join, modification of the database, In-Class Quiz #1) is in a separate file. A few cross-references point there.
>
> **Legend:** ⭐ = professor emphasis · ⚠️ = apparent slide error (the original is kept and a correction added) · 🔎 = look up in Track B
>
> **How the SQL is written:** it is copied exactly from the slides, with one change. The slides print typographic quotes (‘…’ or ’…’) and the operator ∗. Here they are written as plain `'…'` and `*`, because sqlite rejects typographic quotes with a syntax error (I checked), so type plain quotes in MySQL too.
>
> **How it was verified:** with sqlite3 3.54, on the slides' own tables (`instructor` and `department` from [S12]/[S51]/[S61]; the small relations r and s from [S8]–[S16]). Differences from MySQL are mentioned only where they change the result. One display difference applies everywhere: MySQL shows `numeric(8,2)` values with two decimals (e.g. 65000.00), while sqlite shows 65000.

---

## 1. Big picture

- **What this part covers:** outline sections 1–4 ([S3]): (1) a recap of the relational operations, (2) query languages, (3) the basic elements of SQL (DDL + DML), and (4) the structure of SQL queries for data retrieval, on one relation and on several relations. Sections 5–8 (Cartesian product, natural join, modification of the database, In-Class Quiz #1) are in part 2.
- **The 7 relational operations** ([S7]–[S16]): selection σ (rows), projection ∏ (columns), natural join, Cartesian product ×, union ∪, set difference −, intersection ∩. ∪, − and ∩ need two "similar" relations, meaning relations "of the same logical schema", and r ∩ s = r − (r − s). The plan is to express them first in relational algebra and then in SQL ([S7]).
- **Query languages** ([S19]–[S22]): a query language lets a user "access/update/delete data in a DBMS". Relational algebra is *procedural*. Tuple and domain relational calculus are *non-procedural*. SQL is "commercial, non-procedural", more expressive, and contains **both DDL + DML** ([S22], highlighted in yellow).
- **SQL-DDL** ([S27]–[S39]) defines relations: their schema, domains and types, integrity constraints and more. Its output is stored as **metadata** in the **Data Dictionary** (System Catalog). The commands are `create table` (types `char`, `varchar`, `int`, `smallint`, `numeric(p,d)`, `real`, `double precision`, `float(n)`; constraints `not null`, `primary key`, `foreign key … references`), `alter table … add/drop`, and `drop table`.
- **SQL-DML** ([S40]–[S42], [S46]): `insert into … values (…)` loads tuples (values in schema order) and `delete from r` removes ALL tuples. The query form is **select–from–where**, and its result is always a relation ([S46]).
- **Correspondences** ([S48], [S55]): `select` ↔ **Projection**; `where` ↔ **Selection**. SQL **keeps duplicates** ([S51]); `select distinct` removes them, while `select all` keeps them, which is the same as plain `select` ([S53]). `select` can also compute arithmetic (`+ – * /`) and rename a column with `as` ([S54]).
- **Multiple relations** ([S61]–[S63]): list both relations in `from` and match them in `where` (`instructor.dept_name = department.dept_name`). The `relation.attribute` naming convention tells you which relation's attribute is meant.
- **Watch out:** three slide errors change what you get when you run the SQL. [S35] is missing a `)`, [S54] is missing `from instructor`, and [S57] writes `'Comp. Sci'` while the data says `'Comp. Sci.'`. Learn the corrected forms (see the ⚠️ notes).

---

## 2. Slide-by-slide notes

### [S1] Title slide
- **Database (SOC-3020)** — Alessandro Agostini¹² — aagostini@inha.ac.kr · agostini@disi.unitn.it
- ¹LDKR-Group, School of Computer and Information Engineering, Inha University in Tashkent (IUT), Uzbekistan · ²DISI, University of Trento, Italy · **WEEK 5**.
- Pictures: the IUT building, the LDKR logo and the IUT seal (decorative).

### [S2] Lecture title: "SQL: Introduction"
- "DATABASE — **SQL: Introduction** — WEEK 5 — Code: W5.L1L2[QUIZ#1]".
- Picture: a panoramic photo of a historic town square (decorative).
- The code appears to mean Week 5, lectures L1 + L2, with In-Class Quiz #1 inside the deck (outline item 8, "In-Class Quiz #1 (Lecture 2)", which is in part 2).

### [S3] Outline
1 From Previous Week · 2 Query Languages · 3 SQL: The Basic Elements · 4 Structure of SQL Queries for Data Retrieval · 5 Cartesian Product · 6 The Natural Join · 7 Modification of the Database · 8 In-Class Quiz #1 (Lecture 2). Items 1–4 are in this file; items 5–8 are in part 2.

### [S4] "Any question from you? …"
- A pause for the class's questions (⭐ question to the class).

### [S5] From Previous Week: MySQL installation (reminder)
> **MySQL** — Installation Guidelines (*reminder*) — *cf.* Week 2
>
> **MySQL** should be used by students to execute all queries proposed.
- ⭐ "*cf.* Week 2" is in red: the installation guide is in the Week 2 slides.
- In plain words: run every query in this deck yourself in MySQL.

### [S6] Section title: *Relational* Operations
> Ch 2, T; section 2.6
- "*Relational*" is in red italics. "T" is the textbook, whose cover (*Database System Concepts*) is pictured. The small sailboat icon on later slides is the same cover picture.

### [S7] From Previous Week: Relational Operations
> We concentrate on the following operations:
> - selection of tuples/rows,
> - projection (or: selection of attributes/columns),
> - natural join,
> - Cartesian product,
> - union,
> - set difference,
> - intersection.
>
> In this lecture, we'll express each operation by using the language of Relational Algebra.
> - Successively, we'll use SQL.
- **Colours on the slide:** red = selection, projection, Cartesian product, union, set difference; **blue** = natural join, intersection.
- ⭐ The colour code is explained later in this deck ([S77], part 2): *"In blue are "derived" operations, that is, operations defined on other "primary" operations (in red)."*
- [S8]–[S16] show each operation on small example relations.

### [S8] 1. Select – selection of rows (build-up)
- "Relation r":

| A | B | C | D |
|---|---|---|---|
| α | α | 1 | 7 |
| α | β | 5 | 7 |
| β | β | 12 | 3 |
| β | β | 23 | 10 |

- A second table (the answer: rows (α,α,1,7) and (β,β,23,10)) is already shown. The expression that produces it appears on [S9].

### [S9] 1. Select – selection of rows
- Relation r (as on [S8]) and **σ<sub>A=B and D > 5</sub>(r)** =

| A | B | C | D |
|---|---|---|---|
| α | α | 1 | 7 |
| β | β | 23 | 10 |

- **In plain words:** σ keeps the **rows** of r that satisfy the condition. All columns stay. Row-by-row check:

| row of r | A = B ? | D > 5 ? | kept? |
|---|---|---|---|
| (α, α, 1, 7) | yes | 7 > 5 yes | **yes** |
| (α, β, 5, 7) | no | — | no |
| (β, β, 12, 3) | yes | 3 > 5 no | no |
| (β, β, 23, 10) | yes | 10 > 5 yes | **yes** |

- The SQL counterpart is the `where` clause ("Selection", [S55], which reuses this exact example). The worked example is W1 in §5.

### [S10] 2. Project – selection of columns (build-up)
- "Relation r":

| A | B | C |
|---|---|---|
| α | 10 | 1 |
| α | 20 | 1 |
| β | 30 | 1 |
| β | 40 | 2 |

- The A, C columns are shown first with 4 rows, then "=" a table with 3 rows. The expression appears on [S11].

### [S11] 2. Project – selection of columns
- **∏<sub>A,C</sub>(r)**: the 4-row table (α,1), (α,1), (β,1), (β,2) **=**

| A | C |
|---|---|
| α | 1 |
| β | 1 |
| β | 2 |

- **In plain words:** ∏ keeps only the listed **columns** (A and C). Cutting away B produces the row (α,1) twice. The "=" shows that the projected relation contains it only once, so the result has 3 tuples.
- SQL counterpart: the `select` clause ([S48] repeats this example). SQL keeps the duplicate unless you write `distinct` ([S51], [S53]). See W2 in §5.

### [S12] 3. Natural Join
- "Relations r, s" (r holds the same data as the `instructor` table used later; s is the `department` table):

**r**

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

**s**

| dept_name | building | budget |
|---|---|---|
| Biology | Watson | 90000 |
| Comp. Sci. | Taylor | 100000 |
| Elec. Eng. | Taylor | 85000 |
| Finance | Painter | 120000 |
| History | Painter | 50000 |
| Music | Packard | 80000 |
| Physics | Watson | 70000 |

- "**r + s:**"

| ID | name | salary | dept_name | building | budget |
|---|---|---|---|---|---|
| 10101 | Srinivasan | 65000 | Comp. Sci. | Taylor | 100000 |
| 12121 | Wu | 90000 | Finance | Painter | 120000 |
| 15151 | Mozart | 40000 | Music | Packard | 80000 |
| 22222 | Einstein | 95000 | Physics | Watson | 70000 |
| 32343 | El Said | 60000 | History | Painter | 50000 |
| 33456 | Gold | 87000 | Physics | Watson | 70000 |
| 45565 | Katz | 75000 | Comp. Sci. | Taylor | 100000 |
| 58583 | Califieri | 62000 | History | Painter | 50000 |
| 76543 | Singh | 80000 | Finance | Painter | 120000 |
| 76766 | Crick | 72000 | Biology | Watson | 90000 |
| 83821 | Brandt | 92000 | Comp. Sci. | Taylor | 100000 |
| 98345 | Kim | 80000 | Elec. Eng. | Taylor | 85000 |

- **In plain words:** each tuple of r is glued to the tuple of s with the **same `dept_name`** (the attribute the two relations share), and `dept_name` appears **once** in the result. Every instructor's department exists in s, so all 12 instructors appear. For example, Srinivasan (Comp. Sci.) gets Taylor, 100000.
- ⚠️ **Notation:** the slide writes the natural join as "r + s", and [S78] in part 2 does the same. Read "+" here as "natural join of r and s", as the title says. 🔎 Look up in Track B: the usual relational-algebra symbol for natural join.
- Verified: an SQL query in the style of [S62] produces exactly this table. See W3 in §5.

### [S13] 4. Join – Cartesian Product
- "Relations r, s":

**r**

| A | B |
|---|---|
| α | 1 |
| β | 2 |

**s**

| C | D | E |
|---|---|---|
| α | 10 | a |
| β | 10 | a |
| β | 20 | b |
| γ | 10 | b |

- "**r x s:**"

| A | B | C | D | E |
|---|---|---|---|---|
| α | 1 | α | 10 | a |
| α | 1 | β | 10 | a |
| α | 1 | β | 20 | b |
| α | 1 | γ | 10 | b |
| β | 2 | α | 10 | a |
| β | 2 | β | 10 | a |
| β | 2 | β | 20 | b |
| β | 2 | γ | 10 | b |

- **In plain words:** **every** tuple of r is paired with **every** tuple of s, with no condition. That gives 2 × 4 = 8 tuples, and the attributes of both (A, B, C, D, E). Verified (W4). The SQL form is covered in part 2 ([S65]: "Cartesian Product on Relations or: Unconditional Join ("comma")").

### [S14] 5. Union of two relations
- "Relations r, s":

**r**

| A | B |
|---|---|
| α | 1 |
| α | 2 |
| β | 1 |

**s**

| A | B |
|---|---|
| α | 2 |
| β | 3 |

- "**r ∪ s:**"

| A | B |
|---|---|
| α | 1 |
| α | 2 |
| β | 1 |
| β | 3 |

- ⭐ (red) "*Note: the two relations must be "similar", that is, of the same logical schema*"
- **In plain words:** the result contains the tuples that are in r **or** in s. (α,2) is in both, so it appears **once**: 3 + 2 − 1 = 4 tuples.

### [S15] 6. Set difference of two relations
- Same r and s as [S14]. "**r – s:**"

| A | B |
|---|---|
| α | 1 |
| β | 1 |

- ⭐ (red) "*Note: the two relations must be "similar", that is, of the same logical schema*"
- **In plain words:** the tuples of r that are **not** in s. (α,2) is removed because s contains it. Nothing from s is added.

### [S16] 7. Intersection of two relations
- Same r and s as [S14]. "**r ∩ s**"

| A | B |
|---|---|
| α | 2 |

- ⭐ (red) "*Note: the two relations must be "similar", that is, of the same logical schema*"
- ⭐ "**Note: r ∩ s = r – (r – s)**"
- **Checked by hand:** r − s = {(α,1), (β,1)} ([S15]), so r − (r − s) = {(α,1),(α,2),(β,1)} − {(α,1),(β,1)} = {(α,2)} = r ∩ s. This is why intersection is a "derived" (blue) operation on [S7]: it can be defined with set difference, which is "primary" (red).

### [S17] Outline → section 2: Query Languages

### [S18] Section title: *Relational* Query Languages
> or: Languages to "query" (i.e., manage) **Relations**
>
> Ch 2, T; section 2.5
- "*Relational*" and "Relations" are in red.

### [S19] Query Languages
> • Def. A **query language** is a language by which a user can access/update/delete data in a DBMS.
- ⭐ This is a formal definition ("Def."), with "query language" in red.
- Note that "query" here covers more than reading: access, update and delete.

### [S20] Languages' Paradigms
> • Two typical kinds ("programming paradigms") of query languages are:
> - **Procedural**: the user instructs the system to perform a sequence of operations on the database to compute the result.
> - **Non-procedural**: the user describes the desired result without defining the "how".
- ⭐ "Procedural" and "Non-procedural" are in bold blue. "a sequence of operations" and "describes the desired result" are underlined.

### [S21] *Relational* Query Languages
> ■ "Pure" relational query languages:
> - Relational algebra — (*procedural*)
> - Tuple relational calculus — (*non-procedural*)
> - Domain relational calculus — (*non-procedural*)
>
> ■ Above languages are equivalent in computing power and expressiveness (equivalent to FOL - First Order Logic).
> - SQL (*commercial, non-procedural*)
>
> ■ SQL is more expressive; based on pure languages
- **In plain words:** the three "pure" languages can express the same queries. SQL is the commercial language: it is non-procedural, built on these pure languages, and more expressive than them.

### [S22] Remark 1 (⭐ the whole slide is highlighted in yellow)
> - There are many relational DB query languages in use, either commercially or experimentally.
>   - We study the most widely used : SQL.
> - Although SQL is known as a "*query* language", it contains both DDL + DML components.
> - This course does NOT provide a users' guide for SQL, but only fundamental constructs and concepts. SQL's implementations *do* differ…
- ⭐ "query" is in red; "SQL's implementations *do* differ…" is in blue.
- Exam point: SQL = DDL (defining relations, [S27]–[S39]) + DML (manipulating and querying data, [S40]–[S63]).

### [S23] Outline → section 3: SQL: The Basic Elements

### [S24] Title: SQL
- **S**tructured **Q**uery **L**anguage.

### [S25] History
> - IBM **SEQUEL** (**S**tructured **E**nglish **Que**ry **L**anguage), a language developed as part of <u>System R project at the IBM</u> San Jose Research Laboratory (Chamberlin & Boyce, 1974)
> - Renamed **S**tructured **Q**uery **L**anguage (**SQL**)
> - ANSI and ISO standard SQL:
>   - SQL-86
>   - SQL-89
>   - SQL-92
>   - SQL:1999 (language name became Y2K compliant!)
>   - SQL:2003 on
> - Commercial systems offer most, if not all, SQL-92 features, plus varying feature sets from later standards and special proprietary features.
>   - *<u>Not all examples here may work on your particular system!</u>*
- ⭐ The warning on the last line is underlined and in italics. In this file it matters at [S35] and [S37] (see the 🔎 note about MySQL foreign keys).

### [S26] The original SEQUEL paper (picture)
- The slide shows the first page of the 1974 paper: "**SEQUEL: A STRUCTURED ENGLISH QUERY LANGUAGE**", by Donald D. Chamberlin and Raymond F. Boyce, IBM Research Laboratory, San Jose, California. Its abstract, as printed:
> ABSTRACT: In this paper we present the data manipulation facility for a structured English query language (SEQUEL) which can be used for accessing data in an integrated relational data base. Without resorting to the concepts of bound variables and quantifiers SEQUEL identifies a set of simple operations on tabular structures, which can be shown to be of equivalent power to the first order predicate calculus. A SEQUEL user is presented with a consistent set of keyword English templates which reflect how people use tables to obtain information. Moreover, the SEQUEL user is able to compose these basic templates in a structured manner in order to form more complex queries. SEQUEL is intended as a data base sublanguage for both the professional programmer and the more infrequent data base user.
- This links back to [S21]: "equivalent power to the first order predicate calculus" corresponds to "equivalent to FOL".

### [S27] Title: SQL-DDL
- **D**ata **D**efinition **L**anguage.

### [S28] Data-Definition Language (DDL)
> The SQL <u>data-definition</u> language (DDL) allows the specification of information about relations, including:
> - The **schema** for each relation.
> - The <u>domain</u> and <u>type</u> of values associated with each attribute.
> - **Integrity constraints**
> - Other information such as:
>   - The set of indices to be maintained for each relations.
>   - Security and authorization information for each relation.
>   - The physical storage structure of each relation on disk.
> - Output of DDL stored into **Data Dictionary** (or: System Catalog) as specific DB data called **metadata**.
- ⭐ "schema", "domain and type of values" and "Integrity constraints" are in blue; "Data Dictionary" and "metadata" are in red.
- ⚠️ Minor grammar: "for each relations" should read "for each relation".

### [S29] *Reminder*: DDL in Architecture (diagram)
- The diagram is the DBMS architecture, split into two parts.
  - **"users and administrators"** (blue frame, top). Naive users (tellers, agents, web users) *use* application interfaces. Application programmers *write* application programs. Sophisticated users (analysts) *use* query tools. Database administrators *use* administration tools.
  - **"internal components"** (red label).
    - Query processor: compiler and linker, DML queries, **DDL interpreter**, application program object code, DML compiler and organizer, query evaluation engine.
    - Storage manager: buffer manager, file manager, authorization and integrity manager, transaction manager.
    - Disk storage: indices, **data dictionary**, data, statistical data.
- ⭐ Two boxes are framed in red: the **DDL interpreter** (in the query processor; the line from the administration tools reaches it) and the **data dictionary** (in disk storage). These are the two DDL places named on [S28]: DDL statements are interpreted, and their output is stored in the data dictionary.

### [S30] *Reminder*: Attributes' Domain and Type
> - The set of <u>allowed</u> values for each attribute in a relation is called the **domain** of the attribute.
> - So a table (relation R) is formally defined as:
>
>   `Table_R = {<d1 ,…dn> ∈ D1 x …x Dn | R(d1,…,dn)}`
>
>   where Di is the domain of the i*th*-attribute
> - Attribute values are required to be **atomic**; that is, indivisible.
- ⭐ "domain" and "atomic" are in bold blue; D1 and Dn are in red.
- **In plain words:** a table is the set of tuples ⟨d1,…,dn⟩ whose i-th value comes from the domain Di of the i-th attribute and that satisfy R.

### [S31] Domain Types in SQL (1/2)
> - **char(n).** Fixed length character string, with user-specified length *n.*
> - **varchar(n).** Variable length character strings, with user-specified maximum length *n.*
> - **int.** Integer (a finite subset of the integers that is machine-dependent).
> - **smallint.** Small integer (a machine-dependent subset of the integer domain type).

### [S32] Domain Types in SQL (2/2)
> - **numeric(p,d).** Fixed-point number, with user-specified precision of *p* digits (sign +,- included), with *d* digits to the right of decimal point.
>
>   **Example**: **numeric**(3,1), allows 44.5 to be stored exactly, but not 444.5 or 0.32.
> - **real, double precision.** Floating-point and double-precision floating-point numbers, with machine-dependent precision.
> - **float(n).** Floating point number, with user-specified precision of at least *n* digits.
- **Reading the example with the slide's definition:** numeric(3,1) means 3 digits in total, 1 of them after the decimal point (so at most 2 before it).
  - 44.5 has digits 4, 4 . 5, so it fits.
  - 444.5 needs 3 digits before the point (4 in total), so it does not fit. "444.5" is in blue on the slide.
  - 0.32 needs 2 digits after the point, but d = 1, so it cannot be stored exactly.
- 🔎 Look up in Track B: what "(sign +,- included)" means exactly, i.e. whether the sign uses one of the p digits in MySQL's numeric/decimal.
- sqlite does **not** enforce p and d, so this example can't be checked in sqlite. Try it in MySQL.

### [S33] Create Table Construct (DDL part of SQL)
> An SQL relation is defined using the **create table** command:
```sql
create table r
     (A1 D1,
      A2 D2,
      ...,
      An Dn,
      (integrity-constraint1),
      ...,
      (integrity-constraintk));
```
> - *r* is the name of the relation;
> - each *Ai* is an attribute name in the schema of relation *r;*
> - *Di* is the data type of values in the domain of attribute *Ai*.
- The integrity constraints come **after** the list of attribute–type pairs, separated by commas.

### [S34] Create Table Construct (*cont.*) (DDL part of SQL)
- **Example**:
```sql
create table instructor
     (ID          char(5),
      name        varchar(20),
      dept_name   varchar(20),
      salary      numeric(8,2));
```
- Verified: it runs as written (W6). salary numeric(8,2) means 8 digits, 2 after the point, so up to 6 before it: 999999.99 is the largest. All the slide salaries fit.

### [S35] Integrity Constrains in Create Table (DDL part of SQL)
> - **not null**
> - **primary key** (A1, ..., An)
> - **foreign key** (A1, ..., An) **references** r

**Example:**
```sql
create table instructor
     (ID          char(5),
      name        varchar(20) not null,
      dept_name   varchar(20),
      salary      numeric(8,2),
      primary key (ID),
      foreign key (dept_name) references department;
```
> <u>**NB**</u>: **primary key** declaration on an attribute automatically ensures **not null**
- ⚠️ **Title typo:** "Constrains" should be "**Constraints**".
- ⚠️ **Missing parenthesis:** the statement ends `references department;` without the `)` that closes the list opened at `(ID`. The correct last line (as on [S37]) is:
```sql
      foreign key (dept_name) references department);
```
  Verified: the version as printed gives `Parse error … near ";": syntax error`, while the corrected one creates the table (W7).
- **What each constraint did when tested** (W7):
  - `not null`: a tuple with name = null was rejected (`NOT NULL constraint failed: instructor.name`).
  - `primary key (ID)`: a second tuple with the same ID was rejected (`UNIQUE constraint failed: instructor.ID`).
- ⭐ **NB**: "NB" is in blue and underlined. Learn it as stated: a primary key attribute is automatically not null.
  - sqlite does **not** follow this NB: it accepted a tuple with ID = null. This is a sqlite peculiarity, so check the NB in the MySQL lab.
- 🔎 Look up in Track B (MySQL lab): how MySQL handles `foreign key (dept_name) references department`. Does `department` have to exist first? Does MySQL need the column list, `references department (dept_name)`? sqlite accepted the slide's form as is. Compare [S25]: "Not all examples here may work on your particular system!"

### [S36] Example (*cont.*): primary key and foreign key on the tables (annotated picture)
- **The picture:** the `instructor` table, partly covered by the `department` table. The visible instructor rows are 22222 Einstein Physics 95000; 12121 Wu Finance 90000; 32343 El Said History 60000; 45565 Katz Comp. Sci. 75000; 98345 Kim Elec. Eng. 80000. Seven more rows are hidden, but their salaries are visible: 72000, 65000, 62000, 92000, 40000, 87000, 80000. These are the same 12 instructors as [S12] in a different row order; order does not matter, because relations are sets ([S51]).
- The annotations, word for word:
  - Orange circle on *ID*: "**Note: primary key for "instructor"**".
  - Red box on *dept_name* in instructor: "**primary key for "department" in "instructor" (r1) (<u>referencing relation</u> of the foreign key dependency)**".
  - Red: "**so, "dept_name" is a foreign key from "instructor" referencing "department"**".
  - Red box on *dept_name* in department: "**primary key for "department" (r2) (<u>referenced relation</u> of the foreign key dependency)**".
- ⭐ All annotations are in colour, and "referencing relation" and "referenced relation" are blue and underlined.
- **In plain words:** dept_name is the primary key of department (r2, the *referenced* relation). The same attribute appears inside instructor (r1, the *referencing* relation). That is exactly what `foreign key (dept_name) references department` on [S35] declares.

### [S37] Another Example (*variant*) (DDL part of SQL)
```sql
create table student
     (ID          varchar(5) primary key,
      name        varchar(20) not null,
      dept_name   varchar(20),
      tot_cred    numeric(3,0),
      foreign key (dept_name) references department);
```
- ⭐ "**primary key**" is in red. This is the *variant*: the primary key is declared **right after the attribute's type** (`ID varchar(5) primary key`) instead of in a separate `primary key (ID)` line as on [S35].
- `tot_cred numeric(3,0)` allows 3 digits and 0 after the point, so whole numbers up to 999 (by [S32]'s definition).
- Note that here the closing `)` **is** present. Verified: it runs as written (W8).
- The same 🔎 MySQL foreign-key note as [S35] applies.

### [S38] Alter Table Construct (DDL part of SQL)
> ■ **Alter Table**
> - Used to <u>add/remove **attributes** to/from a table.</u>
> - **Example:**
```sql
alter table r add A D;
```
> where A is the <u>added</u> attribute and D is its domain's type.
> - Variant is: **alter table** *r* **add** *constraint*;
```sql
alter table r drop A;
```
> where A is the <u>removed</u> attribute.
> - **Note:** All data tuples in the relation *r* are assigned *null* as the value for the <u>new added attribute</u>.
- ⭐ There is a **Note**, and "attributes" is in red.
- Verified on the [S14] relation r, with A = C and D = int (W9). After `alter table r add C int;` all 3 tuples have C = NULL; `alter table r drop C;` removes it again.

### [S39] Drop Table Construct (DDL part of SQL)
> ■ **Drop Table**
> - We use **drop table** to <u>remove a table</u> from the database.
> - **Example:**
```sql
drop table r;
```
> - **Note:** the command **drop table** *r* is a more drastic action than **delete from** *r*. Why?
> - After a table/relation is dropped, no data tuples can be inserted in it unless it is re-created by the **create table**.
- ⭐ **Question to the class: "Why?"** The slides give the answer.
  - `delete from r` deletes ALL data tuples, but the relation r stays in the database, so you can still insert into it ([S41]).
  - `drop table r` removes the table itself, so nothing can be inserted until it is created again with `create table` (2nd bullet).
- Verified (W10): after `delete from r;`, an insert works. After `drop table r;`, the insert fails with `no such table: r`.

### [S40] Title: SQL-DML
- **D**ata **M**anipulation **L**anguage.

### [S41] Updates to Tables (DML part of SQL): Delete
> ■ **Delete**
> - We use **delete** to <u>delete data tuples</u> from a relation.
> - **Example:**
```sql
delete from student;
```
> - **Note:** the command **delete from** will delete ALL data tuples from the *student* relation.
> - Other forms of the **delete** command are available (we'll see them later on).
- ⭐ There is a **Note**, and "ALL" is in capitals.
- The "other forms" are in part 2 ("Modification of the Database", S93–S105).
- Verified: it runs on the [S37] table; student then has 0 tuples (it already had none, since the slides give no student data).

### [S42] Updates to Tables (DML part of SQL): Insert
> ■ **Insert**
> - We use **insert** to <u>load data tuples</u> into a relation.
> - **Example:**
```sql
insert into instructor
      values (10211, 'Smith', 'Biology', 66000);
```
> - **Note:** the **values** are specified in the *order* in which the corresponding attributes are listed in the relation schema.
- ⭐ There is a **Note**, and "order" is in italics. The order is (ID, name, dept_name, salary), as declared on [S34]/[S35].
- Verified (W11): the 12 instructors of [S12] become 13 and the new tuple is (10211, Smith, Biology, 66000).
  - The slide writes 10211 without quotes, although ID is `char(5)`. sqlite stored it as the text '10211'.

### [S43] Outline → section 4: Structure of SQL Queries for Data Retrieval

### [S44] Section title: SQL Queries for Data Retrieval
> or: How to generate **Knowledge** from Data and Information
>
> Ch 3, T; section 3.3
- "Knowledge" is in red.

### [S45] *Reminder*: Schema for University DB (diagram)
- The diagram shows 11 relation boxes. Underlined attributes are the key attributes: for example, ID in instructor and dept_name in department, which [S36] calls the primary keys. Arrows are foreign keys.

| relation | attributes (<u>underlined</u> as on the slide) | arrows go to |
|---|---|---|
| takes | <u>ID</u>, <u>course_id</u>, <u>sec_id</u>, <u>semester</u>, <u>year</u>, grade | student (ID); section (course_id, sec_id, semester, year) |
| student | <u>ID</u>, name, dept_name, tot_cred | department (dept_name) |
| section | <u>course_id</u>, <u>sec_id</u>, <u>semester</u>, <u>year</u>, building, room_no, time_slot_id | course (course_id); classroom (building, room_no) |
| course | <u>course_id</u>, title, dept_name, credits | department (dept_name) |
| department | <u>dept_name</u>, building, budget | — |
| advisor | <u>s_id</u>, i_id | student (s_id); instructor (i_id) |
| time_slot | <u>time_slot_id</u>, <u>day</u>, <u>start_time</u>, end_time | — (no arrow drawn) |
| classroom | <u>building</u>, <u>room_no</u>, capacity | — |
| prereq | <u>course_id</u>, <u>prereq_id</u> | course |
| instructor | <u>ID</u>, name, dept_name, salary | department (dept_name) |
| teaches | <u>ID</u>, <u>course_id</u>, <u>sec_id</u>, <u>semester</u>, <u>year</u> | instructor (ID); section (course_id, sec_id, semester, year) |

- ⭐ Boxed in red and highlighted: "**NB:** *only foreign key dependencies (i.e., foreign integrity constraints) are depicted (see arrows)*".
- For this part, the important relations are `instructor` and `department`, linked by `dept_name` ([S36]).

### [S46] Basic Query Structure (DML clauses of SQL)
> ■ A typical SQL query has the form:
```sql
select A1, A2, ..., An
from r1, r2, ..., rm
where P is true;
```
> - *Ai* represents an attribute
> - *ri* represents a relation
> - P is a predicate over attributes of *r1, r2, ..., rm*.
>
> ■ Note 1: **select**, **from**, and **where** are called **clauses**.
>
> ■ Note 2: the result of a SQL query is a <u>relation</u>!
>
> ■ Note 3: semicolon " ; " sometimes is missing.
- ⭐ The query form is in a blue box. There are three Notes, and Note 2 ends with "!" and has "relation" underlined.
- **In plain words:** `select` says *which attributes* you want, `from` says *which relations* to read, and `where` keeps only the tuples for which predicate P is true ([S55]). Since the result is a relation, it can be used like any other table.
- On Note 3: don't be surprised by examples written without the final `;`.

### [S47] Title: Structure of SQL Queries: Queries on a **Single** Relation

### [S48] Queries on a Single Relation: The "select" Clause
> ■ The **select** clause lists the attributes desired in the result (i.e., values) of a query
> - corresponds to "**Projection**" in the (procedural) language of relational algebra.
- This is the same picture as [S11]: Relation r(A,B,C) and ∏<sub>A,C</sub>(r). The 4-row table (α,1), (α,1), (β,1), (β,2) = (α,1), (β,1), (β,2).
- ⭐ "Projection" is in blue.
- Careful: in SQL, `select A, C from r` keeps the duplicate (α,1) ([S51]). You need `select distinct` ([S53]) to get the 3-row relation shown here. Verified in W2.

### [S49] Example question (build-up)
- **Example**: "*Find the names of all instructors*". Next to it is the instructor schema box (<u>ID</u>, name, dept_name, salary). The query is on [S50].

### [S50] Queries on a Single Relation: The "select" Clause
- **Example**: "*Find the names of all instructors*":
```sql
select name
from instructor;
```
> ■ Note: SQL names are case insensitive (i.e., you may use upper- or lower-case letters as you wish.)
> - E.g., *Name* ≡ *NAME* ≡ *name*
> - Some people use upper case wherever here and in the textbook are used bold fonts.
- ⭐ There is a **Note**.
- Verified (W12): the result is the 12 names Srinivasan, Wu, Mozart, Einstein, El Said, Gold, Katz, Califieri, Singh, Crick, Brandt, Kim. `SELECT NAME FROM instructor WHERE Name = 'Wu';` also worked.
- 🔎 Look up in Track B: whether MySQL treats **table** names case-insensitively on every operating system.

### [S51] Queries on a Single Relation: The "select" Clause
- **Example**: "*Find department names of all instructors*":
- "Result of SQL query:"
```sql
select dept_name
from instructor;
```
- The slide labels the result "*instructor (dept_name)*". A blue arrow points to the **dept_name** column of the instructor table, which is framed in blue (the table is the same as [S12]).
- ⭐ (red) "**Note**: *duplicates allowed in SQL queries' result. This contrast to definition of relations as sets*". "duplicates allowed" and "sets" are in red.
- Verified (W13): 12 values, with duplicates: Comp. Sci. ×3, Finance ×2, Physics ×2, History ×2, Music, Biology, Elec. Eng.
- ⚠️ Minor grammar: "This contrast to" should read "This contrasts with".

### [S52] Example question (build-up)
- **Example**: "*Find department names of all instructors and remove duplicates*". The query is on [S53].

### [S53] Queries on a Single Relation: The "select" Clause
- **Example**: "*Find department names of all instructors and remove duplicates*":
```sql
select distinct dept_name
from instructor;
```
> ■ The <u>optional</u> keyword **all** specifies that duplicates should not be removed (as **select**):
```sql
select all dept_name
from instructor;
```
- "optional" is underlined: `select all …` gives the same result as plain `select …`.
- Verified (W14): `distinct` returns 7 tuples (Comp. Sci., Finance, Music, Physics, History, Biology, Elec. Eng.). `all` returns the same 12 tuples as [S51].

### [S54] Queries on a Single Relation: The "select" Clause
> ■ The **select** clause can contain arithmetic expressions involving the operation, +, –, ∗, and /, and operating on constants or attributes of tuples.
> - **Example**:
```sql
select ID, name, salary * n
from instructor;
```
> would return a relation that is the same as the *instructor* relation, except that the value of the attribute *salary* is multiplied by n.
> - We can rename "*salary ∗ n*" using the **as** clause:
```sql
select ID, name, salary * n as monthly_salary;
```
- ⚠️ **The rename query has no `from` clause.** As printed it fails: verified with `no such column: ID`. The complete query is:
```sql
select ID, name, salary * n as monthly_salary
from instructor;
```
- ⚠️ **Precision:** the result has only the **3** listed attributes (ID, name, salary∗n). dept_name is not in the select list, so the result is not literally "the same as the instructor relation" ([S48]: select lists the attributes *desired in the result*).
- n is a placeholder on the slide. It was run with n = 2 just to see the shape of the output (W15).

### [S55] Queries on a Single Relation: The "where" Clause
> ■ The **where** clause allows us to select only those rows in the relation of the **from** clause that satisfy a specified predicate P.
> - corresponds to "**Selection**" in the (procedural) language of relational algebra.
- This is the same picture as [S9]: Relation r(A,B,C,D). The red note says "*here the predicate P = P(A,B,D) is:*" **A=B and D > 5**, with an arrow to σ<sub>A=B and D > 5</sub>(r) = {(α,α,1,7), (β,β,23,10)}.
- ⭐ "Selection" is in blue, plus the red annotation.
- P = P(A,B,D) means the predicate uses attributes A, B and D, not C.
- Do not confuse the two kinds of selection: SQL's `select` *clause* corresponds to Projection ([S48]). The relational-algebra *Selection* corresponds to the `where` clause.

### [S56] Example question (build-up)
- **Example**: "*Find the names of all instructors in CS department who have salary greater than \$70000*". The query is on [S57].

### [S57] Queries on a Single Relation: The "where" Clause
- **Example**: "*Find the names of all instructors in CS department who have salary greater than \$70000*":
```sql
select name
from instructor
where dept_name = 'Comp. Sci' and salary > 70000;
```
> ■ Note: the predicate P here is:
>
> P = P(*dept_name, salary*)
>
> &nbsp;&nbsp;= *dept_name* = 'Comp. Sci' **and** *salary* > 70000;
>
> to be read: (*dept_name* = 'Comp. Sci') **and** (*salary* > 70000)
- ⭐ There is a **Note**, and "and" is in red.
- ⚠️ **String constant mismatch:** the slide writes `'Comp. Sci'` (no final period), but the data says `Comp. Sci.` (with a period) on [S12], [S51] and [S58]. Verified (W16):
  - As printed, the query returns **no rows**: the strings differ, and MySQL also treats them as different.
  - With `'Comp. Sci.'` it returns **Katz, Brandt**, which is the result drawn on [S58]. Use:
```sql
select name
from instructor
where dept_name = 'Comp. Sci.' and salary > 70000;
```

### [S58] Queries on a Single Relation: The "where" Clause (picture of the evaluation)
- The same request and the same query as [S57] ("Result of SQL query:"). The `'Comp. Sci'` is boxed in yellow and `70000` in red.
- On the instructor table:
  - The 3 "Comp. Sci." values (Srinivasan, Katz, Brandt) are boxed in **yellow**.
  - The salaries **75000** (Katz) and **92000** (Brandt) are boxed in **red**. Srinivasan's 65000 is *not*, because 65000 > 70000 is false.
  - **Blue** boxes and arrows go from "Result of SQL query" to **Katz** and **Brandt**.
- **Result shown on the slide:**

| name |
|---|
| Katz |
| Brandt |

### [S59] Queries on a Single Relation: The "where" Clause
> ■ Remarks of the predicate P in the clause **where**:
> 1. P can be formed by using the logical connectives **and, or,** and **not**
> 2. The operands of the logical connectives can be expressions involving comparison symbols
>    **= > >= < <=**
> 3. In particular, can be arithmetic expressions.
- 🔎 Look up in Track B: SQL's "not equal" comparison, which is not in this slide's list.

### [S60] Title: Structure of SQL Queries: Queries on a **Multiple** Relations
- ⚠️ Minor grammar: "on a Multiple Relations" should read "on Multiple Relations".

### [S61] Queries on <u>Multiple Relations</u>: Example
- "*Find the names of all instructors along with their <u>department names</u> and <u>department building</u>*"
- **The picture:** the `department` table ([S12] s) and the `instructor` table ([S12] r).
  - The **dept_name** header is boxed in **red** in **both** tables: it is the attribute they share.
  - "Comp. Sci." is boxed in **yellow** (once in department, 3 times in instructor) and its building **Taylor** is boxed in **orange**.
  - So each Comp. Sci. instructor should come out with building Taylor.
  - (Kim's salary is partly covered by the logo, "800…"; it is 80000 as on [S12].)
- Name and dept_name come from instructor, and building comes from department, so **two relations** are needed.

### [S62] Queries on Multiple Relations: Example (the SQL)
- "SQL query:"
```sql
select name, instructor.dept_name, building
from instructor, department
where instructor.dept_name = department.dept_name;
```
- ⭐ In the `from` clause, "instructor, department" is in red: both relations are listed.
- **How to read it:**
  - `from instructor, department` combines instructor tuples with department tuples. On its own this is the Cartesian product of [S13], 12 × 7 = 84 pairs (part 2 explains the "comma").
  - `where instructor.dept_name = department.dept_name` keeps only the pairs about the **same department**.
  - `select` keeps 3 attributes.

### [S63] Queries on Multiple Relations: Example (*cont.*)
- The same request and the same query ("Result of SQL query:"). In the query, "instructor" in `instructor.dept_name` is in blue in the select clause and in red in the where clause.
- **Result shown on the slide** (blue frame; the three Comp. Sci./Taylor rows are boxed in yellow and orange):

| name | dept_name | building |
|---|---|---|
| Srinivasan | Comp. Sci. | Taylor |
| Wu | Finance | Painter |
| Mozart | Music | Packard |
| Einstein | Physics | Watson |
| El Said | History | Painter |
| Gold | Physics | Watson |
| Katz | Comp. Sci. | Taylor |
| Califieri | History | Painter |
| Singh | Finance | Painter |
| Crick | Biology | Watson |
| Brandt | Comp. Sci. | Taylor |
| Kim | Elec. Eng. | Taylor |

- ⭐ "**Note on naming convention: "*instructor.*dept_name"**", with "instructor." in red.
  - Both relations have an attribute called dept_name (the red boxes on [S61]). `instructor.dept_name` means "the dept_name of instructor" (relation name, dot, attribute name).
  - `name` (only in instructor) and `building` (only in department) need no prefix.
  - Verified (W17): without the prefix, `select name, dept_name, building …` fails with `ambiguous column name: dept_name`.
- Verified (W17): the query returns exactly this table, in the same order.
- Notice that this is the [S12] "r + s" result restricted to (name, dept_name, building).
- *(Continues in part 2 with the Cartesian product, S64–S74.)*

---

## 3. Definitions & key terms (word for word)

| term | definition / statement on the slide | [S#] |
|---|---|---|
| relational operations | "We concentrate on the following operations: selection of tuples/rows, projection (or: selection of attributes/columns), natural join, Cartesian product, union, set difference, intersection." | [S7] |
| "derived" vs "primary" operations | "In blue are "derived" operations, that is, operations defined on other "primary" operations (in red)." (blue = natural join, intersection) | [S77] (part 2), colours on [S7] |
| "similar" relations | "Note: the two relations must be "similar", that is, of the same logical schema" (for ∪, −, ∩) | [S14]–[S16] |
| intersection via difference | "Note: r ∩ s = r – (r – s)" | [S16] |
| query language | "Def. A query language is a language by which a user can access/update/delete data in a DBMS." | [S19] |
| procedural | "the user instructs the system to perform a sequence of operations on the database to compute the result." | [S20] |
| non-procedural | "the user describes the desired result without defining the "how"." | [S20] |
| "pure" relational query languages | "Relational algebra (procedural) · Tuple relational calculus (non-procedural) · Domain relational calculus (non-procedural)" — "Above languages are equivalent in computing power and expressiveness (equivalent to FOL - First Order Logic)." | [S21] |
| SQL (kind) | "SQL (commercial, non-procedural)" — "SQL is more expressive; based on pure languages" | [S21] |
| SQL = DDL + DML | "Although SQL is known as a "query language", it contains both DDL + DML components." | [S22] |
| SQL | "Structured Query Language"; from IBM SEQUEL "(Structured English Query Language) … System R project at the IBM San Jose Research Laboratory (Chamberlin & Boyce, 1974)" | [S24], [S25] |
| SQL standards | "SQL-86, SQL-89, SQL-92, SQL:1999 (language name became Y2K compliant!), SQL:2003 on" | [S25] |
| DDL | "The SQL data-definition language (DDL) allows the specification of information about relations, including: The schema for each relation. The domain and type of values associated with each attribute. Integrity constraints. Other information such as: The set of indices … Security and authorization information … The physical storage structure of each relation on disk." | [S28] |
| Data Dictionary, metadata | "Output of DDL stored into Data Dictionary (or: System Catalog) as specific DB data called metadata." | [S28] |
| domain | "The set of allowed values for each attribute in a relation is called the domain of the attribute." | [S30] |
| table (formal) | "So a table (relation R) is formally defined as: Table_R = {<d1 ,…dn> ∈ D1 x …x Dn \| R(d1,…,dn)} where Di is the domain of the ith-attribute" | [S30] |
| atomic | "Attribute values are required to be atomic; that is, indivisible." | [S30] |
| char(n) | "Fixed length character string, with user-specified length n." | [S31] |
| varchar(n) | "Variable length character strings, with user-specified maximum length n." | [S31] |
| int | "Integer (a finite subset of the integers that is machine-dependent)." | [S31] |
| smallint | "Small integer (a machine-dependent subset of the integer domain type)." | [S31] |
| numeric(p,d) | "Fixed-point number, with user-specified precision of p digits (sign +,- included), with d digits to the right of decimal point." Example: "numeric(3,1), allows 44.5 to be stored exactly, but not 444.5 or 0.32." | [S32] |
| real, double precision | "Floating-point and double-precision floating-point numbers, with machine-dependent precision." | [S32] |
| float(n) | "Floating point number, with user-specified precision of at least n digits." | [S32] |
| create table | "An SQL relation is defined using the create table command" — "r is the name of the relation; each Ai is an attribute name in the schema of relation r; Di is the data type of values in the domain of attribute Ai." | [S33] |
| integrity constraints | "not null · primary key (A1, ..., An) · foreign key (A1, ..., An) references r" | [S35] |
| NB on primary key | "primary key declaration on an attribute automatically ensures not null" | [S35] |
| referencing / referenced relation | "primary key for "department" in "instructor" (r1) (referencing relation of the foreign key dependency)" · "primary key for "department" (r2) (referenced relation of the foreign key dependency)" · "so, "dept_name" is a foreign key from "instructor" referencing "department"" | [S36] |
| alter table | "Used to add/remove attributes to/from a table." "where A is the added attribute and D is its domain's type." "where A is the removed attribute." "Note: All data tuples in the relation r are assigned null as the value for the new added attribute." | [S38] |
| drop table | "We use drop table to remove a table from the database." "the command drop table r is a more drastic action than delete from r." "After a table/relation is dropped, no data tuples can be inserted in it unless it is re-created by the create table." | [S39] |
| delete | "We use delete to delete data tuples from a relation." "the command delete from will delete ALL data tuples from the student relation." | [S41] |
| insert | "We use insert to load data tuples into a relation." "the values are specified in the order in which the corresponding attributes are listed in the relation schema." | [S42] |
| clauses | "select, from, and where are called clauses." | [S46] |
| result of a query | "the result of a SQL query is a relation!" | [S46] |
| select clause | "The select clause lists the attributes desired in the result (i.e., values) of a query — corresponds to "Projection" in the (procedural) language of relational algebra." | [S48] |
| case insensitivity | "SQL names are case insensitive (i.e., you may use upper- or lower-case letters as you wish.) E.g., Name ≡ NAME ≡ name" | [S50] |
| duplicates | "duplicates allowed in SQL queries' result. This contrast to definition of relations as sets" | [S51] |
| distinct / all | (query "remove duplicates" → `select distinct`) "The optional keyword all specifies that duplicates should not be removed (as select)" | [S53] |
| arithmetic in select | "The select clause can contain arithmetic expressions involving the operation, +, –, ∗, and /, and operating on constants or attributes of tuples." | [S54] |
| as | "We can rename "salary ∗ n" using the as clause" | [S54] |
| where clause | "The where clause allows us to select only those rows in the relation of the from clause that satisfy a specified predicate P — corresponds to "Selection" in the (procedural) language of relational algebra." | [S55] |
| predicate P | "P is a predicate over attributes of r1, r2, ..., rm." — "P can be formed by using the logical connectives and, or, and not" — "The operands of the logical connectives can be expressions involving comparison symbols = > >= < <=" — "In particular, can be arithmetic expressions." | [S46], [S59] |
| naming convention | "Note on naming convention: "instructor.dept_name"" | [S63] |

---

## 4. SQL syntax reference (as taught)

### 4.1 DDL: defining relations

| construct | general form on the slides | slide example | [S#] |
|---|---|---|---|
| create a relation | `create table r (A1 D1, A2 D2, ..., An Dn, (integrity-constraint1), ..., (integrity-constraintk));` | `create table instructor (ID char(5), name varchar(20), dept_name varchar(20), salary numeric(8,2));` | [S33], [S34] |
| not null | *attribute type* `not null` | `name varchar(20) not null,` | [S35], [S37] |
| primary key (separate line) | `primary key (A1, ..., An)` | `primary key (ID),` | [S35] |
| primary key (variant: right after the type) | *attribute type* `primary key` | `ID varchar(5) primary key,` | [S37] |
| foreign key | `foreign key (A1, ..., An) references r` | `foreign key (dept_name) references department` | [S35], [S37] |
| add an attribute | `alter table r add A D;` (A = added attribute, D = its domain's type; existing tuples get *null*) | — | [S38] |
| add a constraint | `alter table r add constraint;` | — | [S38] |
| remove an attribute | `alter table r drop A;` | — | [S38] |
| remove a relation | `drop table r;` | — | [S39] |

### 4.2 Domain types

| type | meaning (slide) | used in the examples | [S#] |
|---|---|---|---|
| `char(n)` | fixed length string, length n | `ID char(5)` | [S31], [S34] |
| `varchar(n)` | variable length string, max length n | `name varchar(20)`, `dept_name varchar(20)`, `ID varchar(5)` | [S31], [S34], [S37] |
| `int` | integer (machine-dependent finite subset) | — | [S31] |
| `smallint` | small integer (machine-dependent subset of int) | — | [S31] |
| `numeric(p,d)` | fixed-point, p digits, d after the point | `salary numeric(8,2)`, `tot_cred numeric(3,0)`; `numeric(3,1)` example | [S32], [S34], [S37] |
| `real`, `double precision` | floating-point / double-precision floating-point (machine-dependent precision) | — | [S32] |
| `float(n)` | floating point, precision of at least n digits | — | [S32] |

### 4.3 DML: changing the data

| construct | form | slide example | [S#] |
|---|---|---|---|
| insert | `insert into r values (v1, ..., vn);` with values in the schema's attribute order | `insert into instructor values (10211, 'Smith', 'Biology', 66000);` | [S42] |
| delete all tuples | `delete from r;` | `delete from student;` | [S41] |

### 4.4 DML: queries (select–from–where)

| element | form | slide example | [S#] |
|---|---|---|---|
| general form | `select A1, A2, ..., An from r1, r2, ..., rm where P is true;` | — | [S46] |
| select (= Projection) | `select A1, ..., An` | `select name from instructor;` | [S48], [S50] |
| keep duplicates (default) | `select …` | `select dept_name from instructor;` (12 rows) | [S51] |
| remove duplicates | `select distinct …` | `select distinct dept_name from instructor;` (7 rows) | [S53] |
| keep duplicates explicitly | `select all …` (optional keyword) | `select all dept_name from instructor;` | [S53] |
| arithmetic in select | `+ – * /` on constants or attributes | `select ID, name, salary * n from instructor;` | [S54] |
| rename | `expression as new_name` | `select ID, name, salary * n as monthly_salary` + `from instructor;` (⚠️ the slide omits the from) | [S54] |
| where (= Selection) | `where P` | `where dept_name = 'Comp. Sci.' and salary > 70000;` (⚠️ the slide writes `'Comp. Sci'`) | [S55], [S57] |
| logical connectives | `and`, `or`, `not` | `… and …` | [S57], [S59] |
| comparison symbols | `=  >  >=  <  <=` (operands may be arithmetic expressions) | `salary > 70000`, `A = B and D > 5` | [S59], [S55] |
| constants | strings in single quotes, numbers without quotes | `'Comp. Sci.'`, `70000` | [S57] |
| several relations | `from r1, r2` + a matching condition in `where` | `from instructor, department where instructor.dept_name = department.dept_name` | [S62] |
| qualified name | `relation.attribute` | `instructor.dept_name` | [S63] |
| general rules | names are case insensitive; the result is a relation; ";" sometimes missing in examples | `Name ≡ NAME ≡ name` | [S50], [S46] |

### 4.5 Relational algebra ↔ SQL (as taught)

| relational algebra | SQL | [S#] |
|---|---|---|
| Projection ∏<sub>A,C</sub>(r) | `select` clause (add `distinct` to drop duplicates like ∏ does) | [S48], [S51], [S53] |
| Selection σ<sub>P</sub>(r) | `where` clause | [S55] |
| Cartesian product, natural join | multiple relations in `from` (details in part 2) | [S13], [S12], [S62] |

---

## 5. Every query example from class, worked

All outputs below come from sqlite3 runs on the slides' tables. Row order is whatever sqlite produced; it matched the slides wherever they show a result.

### W1. Selection σ<sub>A=B and D > 5</sub>(r) [S9], [S55]
- **Asks:** the rows of r(A,B,C,D) where A equals B and D is greater than 5.
- **Algebra:** σ<sub>A=B and D > 5</sub>(r). **SQL translation** (my own, using only the [S46]/[S55] form; it is not on the slides):
```sql
select A, B, C, D
from r
where A = B and D > 5;
```
- **Evaluation:** test each of the 4 rows. (α,α,1,7) passes; (α,β,5,7) fails A=B; (β,β,12,3) fails D>5; (β,β,23,10) passes.
- **Output (verified, identical to the slide):**

| A | B | C | D |
|---|---|---|---|
| α | α | 1 | 7 |
| β | β | 23 | 10 |

### W2. Projection ∏<sub>A,C</sub>(r) [S11], [S48]
- **Asks:** only the columns A and C of r(A,B,C).
- **Algebra result** (slide): {(α,1), (β,1), (β,2)}, 3 tuples, because the duplicate (α,1) is listed once.
- **SQL** (translation; the select clause = Projection [S48]):
```sql
select A, C
from r;
```
**Output (verified), 4 rows: SQL keeps duplicates [S51]:**

| A | C |
|---|---|
| α | 1 |
| α | 1 |
| β | 1 |
| β | 2 |

```sql
select distinct A, C
from r;
```
**Output (verified), 3 rows, the same as the slide's ∏:**

| A | C |
|---|---|
| α | 1 |
| β | 1 |
| β | 2 |

### W3. Natural join "r + s" of instructor and department [S12]
- **Asks:** every instructor glued to their department's building and budget.
- **SQL** (translation in the [S62] style; part 2 shows the dedicated natural-join syntax):
```sql
select ID, name, salary, instructor.dept_name, building, budget
from instructor, department
where instructor.dept_name = department.dept_name;
```
- **Evaluation:** pair each instructor with each department, keep the pairs whose dept_name values are equal, and show dept_name once.
- **Output (verified): exactly the 12-row "r + s" table on [S12]**, in the same order and with the same columns ID, name, salary, dept_name, building, budget. The first and last rows are (10101, Srinivasan, 65000, Comp. Sci., Taylor, 100000) and (98345, Kim, 80000, Elec. Eng., Taylor, 85000).

### W4. Cartesian product r x s [S13]
- **Asks:** all combinations of a tuple of r(A,B) with a tuple of s(C,D,E).
- **SQL** (the "comma" in `from`; see part 2, [S65]):
```sql
select A, B, C, D, E
from r, s;
```
- **Output (verified): the 8 rows of [S13], in the same order:** (α,1,α,10,a), (α,1,β,10,a), (α,1,β,20,b), (α,1,γ,10,b), (β,2,α,10,a), (β,2,β,10,a), (β,2,β,20,b), (β,2,γ,10,b). 2 × 4 = 8.

### W5. Union, difference, intersection [S14]–[S16] (by hand; set operations in SQL are not part of this slice)
- r = {(α,1), (α,2), (β,1)}, s = {(α,2), (β,3)}, which have the same logical schema (A,B).
- r ∪ s = {(α,1), (α,2), (β,1), (β,3)}. (α,2) is counted once.
- r − s = {(α,1), (β,1)}.
- r ∩ s = {(α,2)}. Check: r − (r − s) = r − {(α,1),(β,1)} = {(α,2)} ✓.
- (The three results were also cross-checked by machine; they match the slides.)

### W6. create table instructor [S34]
```sql
create table instructor
     (ID          char(5),
      name        varchar(20),
      dept_name   varchar(20),
      salary      numeric(8,2));
```
- **Output (verified):** the table is created and has no constraints.

### W7. create table instructor with integrity constraints [S35]
- **As printed:** a syntax error, `Parse error … near ";": syntax error`, because of the missing `)`.
- **Corrected:**
```sql
create table instructor
     (ID          char(5),
      name        varchar(20) not null,
      dept_name   varchar(20),
      salary      numeric(8,2),
      primary key (ID),
      foreign key (dept_name) references department);
```
- **Tests (verified):**
  - Inserting a tuple with name = null was rejected (`NOT NULL constraint failed: instructor.name`).
  - Inserting a second tuple with the same ID was rejected (`UNIQUE constraint failed: instructor.ID`).
  - Inserting ID = null was **accepted by sqlite**. This contradicts the slide's NB and is a sqlite peculiarity; the NB is the rule to learn.

### W8. create table student [S37]
```sql
create table student
     (ID          varchar(5) primary key,
      name        varchar(20) not null,
      dept_name   varchar(20),
      tot_cred    numeric(3,0),
      foreign key (dept_name) references department);
```
- **Output (verified):** the table is created, exactly as printed.

### W9. alter table add / drop [S38]
- **Illustration** on the [S14] relation r(A,B) = {(α,1),(α,2),(β,1)}, filling in the slide's template `alter table r add A D;` with A = C and D = int (int from [S31]):
```sql
alter table r add C int;
select A, B, C
from r;
```
**Output (verified): the new attribute is null in every tuple, as the [S38] Note says:**

| A | B | C |
|---|---|---|
| α | 1 | NULL |
| α | 2 | NULL |
| β | 1 | NULL |

```sql
alter table r drop C;
select A, B
from r;
```
**Output (verified):** back to (α,1), (α,2), (β,1).

### W10. delete from vs drop table [S39], [S41]
```sql
delete from r;
select A, B from r;               -- no rows: all tuples deleted, but r still exists
insert into r values ('β', 3);
select A, B from r;               -- (β, 3): inserting still works
drop table r;
insert into r values ('β', 3);    -- error: no such table: r
```
- **Answer to "Why?":** after `delete from`, the relation still exists, just empty. After `drop table`, the relation itself is gone, so it must be re-created with `create table` before inserting.

### W11. insert [S42]
```sql
insert into instructor
      values (10211, 'Smith', 'Biology', 66000);
```
- **Evaluation:** the values are matched to (ID, name, dept_name, salary) in the order of the schema ([S35]).
- **Output (verified):** instructor goes from 12 to **13** tuples, and the new tuple is (10211, Smith, Biology, 66000). In sqlite the ID was stored as the text '10211', because ID is char(5).

### W12. "Find the names of all instructors" [S50]
```sql
select name
from instructor;
```
- **Evaluation:** take every tuple of instructor and keep only the name attribute (Projection).
- **Output (verified), 12 rows:** Srinivasan, Wu, Mozart, Einstein, El Said, Gold, Katz, Califieri, Singh, Crick, Brandt, Kim.

### W13. "Find department names of all instructors" [S51]
```sql
select dept_name
from instructor;
```
- **Output (verified), 12 rows with duplicates:**

| dept_name |
|---|
| Comp. Sci. |
| Finance |
| Music |
| Physics |
| History |
| Physics |
| Comp. Sci. |
| History |
| Finance |
| Biology |
| Comp. Sci. |
| Elec. Eng. |

### W14. "… and remove duplicates" [S53], and the `all` keyword
```sql
select distinct dept_name
from instructor;
```
- **Output (verified), 7 rows:** Comp. Sci., Finance, Music, Physics, History, Biology, Elec. Eng.
```sql
select all dept_name
from instructor;
```
- **Output (verified):** the same 12 rows as W13. `all` keeps duplicates, exactly like plain `select`.

### W15. Arithmetic and `as` [S54]
- **Asks:** ID, name and salary multiplied by n. The slide leaves n symbolic; it was run with **n = 2** only to show the shape of the result.
```sql
select ID, name, salary * 2
from instructor;
```
**Output (verified):**

| ID | name | salary * 2 |
|---|---|---|
| 10101 | Srinivasan | 130000 |
| 12121 | Wu | 180000 |
| 15151 | Mozart | 80000 |
| 22222 | Einstein | 190000 |
| 32343 | El Said | 120000 |
| 33456 | Gold | 174000 |
| 45565 | Katz | 150000 |
| 58583 | Califieri | 124000 |
| 76543 | Singh | 160000 |
| 76766 | Crick | 144000 |
| 83821 | Brandt | 184000 |
| 98345 | Kim | 160000 |

- Run as printed on the slide, `select ID, name, salary * 2 as monthly_salary;` fails with `no such column: ID`, because there is no `from`.
- **Corrected rename:**
```sql
select ID, name, salary * 2 as monthly_salary
from instructor;
```
- **Output (verified):** the same values, with the third column now titled **monthly_salary**. The result has 3 attributes. (MySQL would print 130000.00 etc. because salary is numeric(8,2).)

### W16. "Instructors in CS with salary > \$70000" [S57], [S58]
- **The SQL as printed** (`where dept_name = 'Comp. Sci' and salary > 70000;`) returns **0 rows** (verified), because no tuple has the value 'Comp. Sci' without the period.
- **Corrected:**
```sql
select name
from instructor
where dept_name = 'Comp. Sci.' and salary > 70000;
```
- **Evaluation (as drawn on [S58]):**
  1. Test (dept_name = 'Comp. Sci.'): the true rows are Srinivasan (65000), Katz (75000) and Brandt (92000).
  2. Test (salary > 70000) on those: Srinivasan's 65000 fails, while Katz's 75000 and Brandt's 92000 pass.
  3. `and` keeps the tuples where **both** are true, and `select name` keeps only the name.
- **Output (verified; matches [S58]):**

| name |
|---|
| Katz |
| Brandt |

### W17. Instructors with department name and building [S62], [S63]
```sql
select name, instructor.dept_name, building
from instructor, department
where instructor.dept_name = department.dept_name;
```
- **Evaluation:**
  1. `from instructor, department` forms all pairs, 12 × 7 = **84** (verified count).
  2. `where instructor.dept_name = department.dept_name` keeps the 12 pairs where the instructor's department is the department in the pair.
  3. `select` keeps name, the instructor's dept_name, and building.
- **Output (verified): identical to the [S63] table** (Srinivasan Comp. Sci. Taylor, Wu Finance Painter, Mozart Music Packard, Einstein Physics Watson, El Said History Painter, Gold Physics Watson, Katz Comp. Sci. Taylor, Califieri History Painter, Singh Finance Painter, Crick Biology Watson, Brandt Comp. Sci. Taylor, Kim Elec. Eng. Taylor).
- **Naming-convention check (verified):** writing just `dept_name` in the select list gives `ambiguous column name: dept_name`, because both relations have it. Hence `instructor.dept_name` ([S63]).

---

## 6. Likely quiz/exam questions (built only from these slides)

**Q1 (MCQ).** Which ONE of these is **not** part of SQL's DDL according to the slides? (a) `create table` (b) `alter table` (c) `delete from` (d) `drop table`. Then classify all six as DDL or DML: `create table`, `alter table`, `drop table`, `insert`, `delete`, `select … from … where`.

**Q2 (MCQ).** Which "pure" relational query language is **procedural**? (a) tuple relational calculus (b) relational algebra (c) domain relational calculus (d) none of them. How do the slides classify SQL?

**Q3 (True/False).**
(a) SQL contains only a query (DML) component.
(b) The result of an SQL query is a relation.
(c) In SQL, `Name` and `name` are different names.
(d) SQL removes duplicates from a query result automatically.
(e) A primary key declaration on an attribute automatically ensures not null.
(f) After `alter table r add A D;`, the existing tuples get the value 0 for A.
(g) Relational algebra, tuple relational calculus and domain relational calculus are equivalent in computing power.

**Q4.** Where is the output of the DDL stored, and what is that data called? Which two boxes of the architecture diagram are highlighted for the DDL?

**Q5.** With `numeric(3,1)`, which of 44.5, 444.5 and 0.32 can be stored exactly? Explain using the definition of numeric(p,d). How many digits can `salary numeric(8,2)` have before the decimal point?

**Q6.** Write the CREATE TABLE for `instructor(ID, name, dept_name, salary)` with types char(5), varchar(20), varchar(20), numeric(8,2). ID is the primary key, name is mandatory, and dept_name must reference `department`. Then say what is wrong with the statement exactly as printed on [S35].

**Q7.** Write the CREATE TABLE for `department(dept_name, building, budget)`, with dept_name as the primary key, choosing types from the slides' domain types. Check that the budgets on [S12] fit your type.

**Q8.** In `foreign key (dept_name) references department` (inside `instructor`), which relation is the *referencing* relation and which is the *referenced* relation? What is the primary key of each?

**Q9.** Using the slides' general forms, write the statement that adds an attribute A with domain type D to relation r, and the one that removes it. What value do the already existing tuples get for A?

**Q10.** "The command drop table r is a more drastic action than delete from r. **Why?**"

**Q11.** Write the statement that loads the tuple (10211, Smith, Biology, 66000) into `instructor`. What rule decides the order of the values? Starting from the 12 instructors on [S51], how many tuples are there afterwards?

**Q12.** Write the query "Find the names of all instructors". Is `SELECT NAME FROM INSTRUCTOR;` also acceptable according to the slides? Why?

**Q13.** On the instructor table of [S51], how many rows does each query return? (a) `select dept_name from instructor;` (b) `select distinct dept_name from instructor;` (c) `select all dept_name from instructor;`. List the rows of (b).

**Q14.** Write the query "Find the names of all instructors in CS department who have salary greater than \$70000" and give its result on the slide's table. What does the query **exactly as printed on [S57]** return, and why?

**Q15.** Write a query that returns ID, name and salary multiplied by n, with the computed column renamed monthly_salary. How many attributes does the result have? What is missing from the version on [S54]?

**Q16.** Write the query "Find the names of all instructors along with their department names and department building". Why is `instructor.dept_name` written instead of `dept_name`, and why don't `name` and `building` need a prefix? How many tuples are in the result?

**Q17.** For r on [S8], compute σ<sub>A=B and D > 5</sub>(r) and write an SQL query that gives the same result.

**Q18.** For r(A,B,C) on [S10], compute ∏<sub>A,C</sub>(r). How many tuples are there? What do `select A, C from r;` and `select distinct A, C from r;` return?

**Q19.** For r = {(α,1),(α,2),(β,1)} and s = {(α,2),(β,3)} ([S14]), compute r ∪ s, r − s and r ∩ s, and check that r ∩ s = r − (r − s). What condition must r and s satisfy for these operations?

**Q20.** For r(A,B) with 2 tuples and s(C,D,E) with 4 tuples ([S13]), how many tuples does r x s have, and what are its attributes? How many instructor–department pairs does `from instructor, department` form before the where clause of [S62] is applied?

### Answers

**A1.** **(c) `delete from`**, which is DML ("Updates to Tables (DML part of SQL)", [S41]).
- DDL: `create table`, `alter table`, `drop table` (each slide is titled "(DDL part of SQL)", [S33]–[S39]).
- DML: `insert`, `delete` ([S41], [S42]) and `select … from … where` ("Basic Query Structure (DML clauses of SQL)", [S46]).

**A2.** **(b) relational algebra.** Tuple and domain relational calculus are non-procedural. SQL is "commercial, non-procedural" ([S21]).

**A3.**
- (a) **F**: "it contains both DDL + DML components" [S22].
- (b) **T** [S46].
- (c) **F**: "SQL names are case insensitive … Name ≡ NAME ≡ name" [S50].
- (d) **F**: "duplicates allowed in SQL queries' result" [S51]; use `distinct` [S53].
- (e) **T**: NB [S35]. sqlite does not enforce it (W7), but it is the rule to learn.
- (f) **F**: they get *null* [S38] (verified, W9).
- (g) **T**: "equivalent in computing power and expressiveness (equivalent to FOL…)" [S21].

**A4.** "Output of DDL stored into **Data Dictionary** (or: System Catalog) as specific DB data called **metadata**" [S28]. On the architecture diagram, the **DDL interpreter** (in the query processor) and the **data dictionary** (in disk storage) are framed in red [S29].

**A5.** Only **44.5** can be stored [S32].
- numeric(3,1) means 3 digits in total, 1 after the point.
- 444.5 needs 4 digits, which is more than p = 3.
- 0.32 needs 2 digits after the point, which is more than d = 1.
- `numeric(8,2)` allows 8 − 2 = **6** digits before the point (at most 999999.99), so every salary on the slides fits.

**A6.** [S35], with the closing parenthesis:
```sql
create table instructor
     (ID          char(5),
      name        varchar(20) not null,
      dept_name   varchar(20),
      salary      numeric(8,2),
      primary key (ID),
      foreign key (dept_name) references department);
```
- [S35] as printed ends with `references department;`, so the `)` that closes the list opened at `(ID` is missing. Verified: the printed version is a syntax error and the corrected one runs.
- An equivalent answer uses the [S37] variant `ID char(5) primary key,` instead of the separate `primary key (ID)` line.

**A7.** One acceptable answer (verified to run; a second tuple with the same dept_name is rejected):
```sql
create table department
     (dept_name   varchar(20),
      building    varchar(20),
      budget      numeric(8,2),
      primary key (dept_name));
```
- dept_name is the primary key of department ([S36]). It has the same type as `instructor.dept_name` ([S34]), so values like 'Comp. Sci.' fit.
- Names are variable-length strings, so varchar(n) [S31].
- The largest budget on [S12] is 120000, which is 6 digits and fits numeric(8,2) [S32].
- In the MySQL lab, check whether department has to be created before instructor and student (🔎 Track B, as noted at [S35]).

**A8.** **instructor** is the *referencing* relation (r1) and **department** is the *referenced* relation (r2) [S36]. The primary key of instructor is **ID**; the primary key of department is **dept_name**. "dept_name is a foreign key from instructor referencing department" [S36].

**A9.** `alter table r add A D;` and `alter table r drop A;` [S38]. "All data tuples in the relation r are assigned **null** as the value for the new added attribute" [S38]. This was verified in W9: all three tuples got NULL.

**A10.** `delete from r` "will delete ALL data tuples", but the relation r still exists, so new tuples can be inserted [S41]. `drop table r` removes the table itself from the database: "After a table/relation is dropped, no data tuples can be inserted in it unless it is re-created by the create table" [S39]. Verified (W10): the insert works after `delete`, and fails with `no such table: r` after `drop`.

**A11.** The statement is below [S42]. "The values are specified in the order in which the corresponding attributes are listed in the relation schema", i.e. (ID, name, dept_name, salary). Afterwards there are **13** tuples (verified, W11).
```sql
insert into instructor
      values (10211, 'Smith', 'Biology', 66000);
```

**A12.** The query is below. **Yes**, `SELECT NAME FROM INSTRUCTOR;` is acceptable: "SQL names are case insensitive" and "some people use upper case wherever … are used bold fonts" [S50]. (🔎 Track B: MySQL table names on different operating systems.)
```sql
select name
from instructor;
```

**A13.** (a) **12** rows, with duplicates [S51]. (b) **7** rows: Comp. Sci., Finance, Music, Physics, History, Biology, Elec. Eng. [S53]. (c) **12** rows, the same as (a) [S53]. All verified (W13, W14).

**A14.** The query is below, and its result is **Katz, Brandt** ([S58]; verified, W16). As printed on [S57], with `'Comp. Sci'` and no final period, it returns **no rows**, because the stored value is 'Comp. Sci.' (verified).
```sql
select name
from instructor
where dept_name = 'Comp. Sci.' and salary > 70000;
```

**A15.** The query is below. The result has **3** attributes (ID, name, monthly_salary). The [S54] version lacks `from instructor` and fails without it (verified: `no such column: ID`).
```sql
select ID, name, salary * n as monthly_salary
from instructor;
```

**A16.** The query is below [S62].
- dept_name exists in **both** relations, so it must be qualified: `instructor.dept_name` ("Note on naming convention", [S63]). Without the prefix you get `ambiguous column name: dept_name` (verified).
- `name` is only in instructor and `building` is only in department, so they are unambiguous.
- The result has **12** tuples, as listed on [S63] (verified, W17).
```sql
select name, instructor.dept_name, building
from instructor, department
where instructor.dept_name = department.dept_name;
```

**A17.** σ<sub>A=B and D > 5</sub>(r) = {(α,α,1,7), (β,β,23,10)} [S9]. The SQL is below; `where` corresponds to Selection [S55]. Verified (W1).
```sql
select A, B, C, D
from r
where A = B and D > 5;
```

**A18.** ∏<sub>A,C</sub>(r) = {(α,1), (β,1), (β,2)}, which is **3** tuples [S11]. `select A, C from r;` returns **4** rows, because (α,1) appears twice: SQL keeps duplicates [S51]. `select distinct A, C from r;` returns the **3** tuples of the algebra result [S53]. Verified (W2).

**A19.** r ∪ s = {(α,1),(α,2),(β,1),(β,3)}; r − s = {(α,1),(β,1)}; r ∩ s = {(α,2)}. r − (r − s) = {(α,2)} ✓. The two relations must be "similar", that is, of the same logical schema ([S14]–[S16]).

**A20.** 2 × 4 = **8** tuples, with attributes **A, B, C, D, E** [S13]. `from instructor, department` forms 12 × 7 = **84** pairs (verified). The where clause on [S62] keeps 12 of them.

---

## 7. Self-check

- [ ] I can list the 7 relational operations from [S7] and say which are "primary" (red) and which are "derived" (blue). I can compute σ, ∏, ×, ∪, −, ∩ and the natural join ("r + s") on the slides' example relations.
- [ ] I can quote the definition of a query language. I can classify relational algebra, tuple relational calculus, domain relational calculus and SQL as procedural or non-procedural, and explain what "equivalent (FOL)" means on [S21].
- [ ] I can explain why SQL is more than a "query" language (DDL + DML). I can list what the DDL specifies and say where its output goes (Data Dictionary/System Catalog, metadata; the DDL interpreter in the architecture).
- [ ] I can define *domain*, write the formal definition of a table, and explain *atomic*.
- [ ] I can define char(n), varchar(n), int, smallint, numeric(p,d), real, double precision and float(n), and decide whether a value fits a numeric(p,d).
- [ ] I can write `create table` with `not null`, `primary key` (both styles) and `foreign key … references`, and spot the missing `)` on [S35]. I can name the referencing and referenced relation of a foreign key.
- [ ] I can use `alter table … add/drop` and `drop table`, and explain why `drop table` is more drastic than `delete from`.
- [ ] I can write `insert into … values (…)` in schema order and `delete from …`.
- [ ] I can write select–from–where queries on one relation, with `distinct`/`all`, arithmetic, `as`, `and`/`or`/`not` and `= > >= < <=`, and predict their output on the instructor table, duplicates included. I can spot the 'Comp. Sci' vs 'Comp. Sci.' trap.
- [ ] I can write a query over instructor and department matched on dept_name, and explain the `relation.attribute` naming convention.
