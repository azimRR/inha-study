# Week 2, part 2 (slides 51–81) — Referential integrity & relational operations (CLASS NOTES — from slides only)
> Source: W2L1L2 MySQL.pdf, slides 51–81 of 81. [S#] = the "n / 81" footer number.
>
> **Legend:** ⭐ = professor emphasis (red, highlighted or boxed text, "Note", "NB", red arrows) · ⚠️ = apparent slide typo or inconsistency · 🔎 = look it up in Track B (the slides don't answer it) · ✅ = I recomputed the result by hand and in sqlite3 on the slide's own tables, and it matches the slide exactly.
>
> **How this was read:** in the PDF, every slide body in this range is a picture (the text layer has only the footers). So everything below was read from the slide images, zooming in where needed. On [S54], [S56] and [S58] one table overlaps another and hides some cells. I filled those cells **only from part 1 of the same deck**: [S45] has the same `instructor` table in the same row order, and [S48] has the same `section` table in the same row order. All uncovered cells match. Those filled cells are shown in *italics*.

---

## 1. Big picture

- **Referential integrity** = "Keys for the **Integrity among Tables**" = "How the Relational Model represents relationships..." [S52]. It is one of the **Data constraints (technical and business rules)** [S52].
- **Foreign key:** the primary key of r₂ listed in the attributes of r₁. Its values in r₁ "must match — **if not null!** — the values of attributes of primary key for r₂" [S53]. Running example: `dept_name` is a foreign key from `instructor` (the **referencing** relation, r₁) to `department` (the **referenced** relation, r₂) [S54].
- **Generalized ("Foreign Key Generalized"):** a *referential integrity constraint* can point to attributes that are only **a part of** the other relation's primary key [S55]. Example: section → teaches on (course_id, sec_id, semester, year), because teaches' primary key also contains `ID` [S56–S58]. This constraint enforces the business rule "(1) If a section exists for a course, it must be taught by at least one instructor" [S57].
- **Schema diagram:** the arrows are the foreign key dependencies, and "**only foreign key dependencies** … are depicted" [S59].
- **Seven relational operations:** selection, projection, natural join, Cartesian product, union, set difference, intersection. They are written in the language of **Relational Algebra** for now; "Successively, we'll use SQL" [S63]. Each one is shown on a small example [S64–S72].
- Union, difference and intersection need the two relations to be **"similar", that is, of the same logical schema**. Also **r ∩ s = r – (r – s)** [S70–S72].
- "**Knowledge** emerges from DB' schemas": you answer a question by linking two relations through a shared attribute (`dept_name`) [S62].
- **Appendix (practical setup):** install MySQL, XAMPP or MAMP and manage it with phpMyAdmin. Download the textbook's university tables ("DDL for MySQL" + "SQL code for creating small relations") from db-book.com. Then in phpMyAdmin do **① New → ② Import** [S75–S79].
- *Link to Quiz #2 (from the HW2 PDF in `assignments/`, also class material):* HW2 asks for PRIMARY KEY / FOREIGN KEY constraints. Its Exercise 3 says "Create a database schema called "DB-HW2" in MYSQL" and "Import all the SQL tables …", which is the same ① New → ② Import flow as [S79].

---

## 2. Slide-by-slide notes

### [S51] Outline
- Divider slide. Item **6 "Data Constraints: Referential Integrity"** is now highlighted.

### [S52] Referential Integrity (section title)
- Title: **Referential Integrity**
  - "or: Keys for the ⭐**Integrity among Tables**" (the last three words are in red)
  - "or: How the Relational Model represents relationships..."
- An orange hand-drawn box lists three bullets:
  - **Data and Data relationships**
  - **Data semantics**
  - ⭐ **Data constraints** (technical and business rules). Only "Data constraints" is in blue, which marks the current topic.
- In plain words: referential integrity is a *data constraint*, and it is the relational model's way to represent *relationships between tables*.

### [S53] Keys (*cont.*)
- ⭐ Definition, in a blue highlighted box:
  > "**Def**: A **foreign key** from relation r₁ referencing [or: to] relation r₂ is the primary key for r₂ listed in the attributes of r₁."
- > "**Remark**: So, by previous definition we define a **foreign (key) integrity constraint** from r₁ to r₂."
  > - "Such constraint is: "The value of attributes in foreign key from r₁ referencing r₂ must match — **if not null!** — the values of attributes of primary key for r₂.""
- ⭐ In red: "foreign key", "from relation r₁ referencing [or: to] relation r₂", and "foreign (key) integrity constraint". "— if not null! —" is set off by dashes and an exclamation mark.
- In plain words:
  - r₁ holds the foreign key. r₂ is the relation whose **primary key** is copied into r₁.
  - Every foreign-key value in r₁ must equal some primary-key value in r₂. The one exception the slide gives is a **null** value, which does not have to match.
- The title "Keys (cont.)" continues the key definitions from part 1 of this deck. The one this slide relies on is [S44]: "**Def**: A **primary key** for a relation R is a candidate key chosen by the database designer to identify uniquely a tuple in the relation R."

### [S54] Example (instructor → department)
- **Layout of the picture:** two tables overlap. `instructor:` is behind, at the top right. `department:` is in front, at the bottom left, and covers the middle of `instructor`'s lower rows.
- **Annotations:**
  - ⭐ (orange/brown) "**Note: primary key for "instructor"**". An arrow points to an orange circle around the `ID` header.
  - ⭐ (red, right) "**primary key for *department* located in *instructor* (r₁)** (__referencing relation__ of the foreign key dependency)". "referencing relation" is underlined in blue. A red arrow points to a **red box around `dept_name` in instructor's header**.
  - ⭐ (red, right) "**so, *dept_name* is a foreign key from *instructor* referencing *department***". `dept_name` is in blue. A second red arrow points to the same `dept_name` box.
  - ⭐ (red, bottom left) "**primary key for *department* (r₂)** (__referenced relation__ of the foreign key dependency)". "referenced relation" is underlined in blue. A red arrow points to a **red box around `dept_name` in department's header**.
- `instructor`, 12 rows (*italic* = covered on [S54], filled from [S45]):

| ID | name | dept_name | salary |
|---|---|---|---|
| 22222 | Einstein | Physics | 95000 |
| 12121 | Wu | Finance | 90000 |
| 32343 | El Said | History | 60000 |
| 45565 | Katz | Comp. Sci. | 75000 |
| 98345 | Kim | Elec. Eng. | 80000 |
| *76766* | *Crick* | *Biology* | 72000 |
| *10101* | *Srinivasan* | *Comp. Sci.* | 65000 |
| *58583* | *Califieri* | *History* | 62000 |
| *83821* | *Brandt* | *Comp. Sci.* | 92000 |
| *15151* | *Mozart* | *Music* | 40000 |
| *33456* | *Gold* | *Physics* | 87000 |
| *76543* | *Singh* | *Finance* | 80000 |

  (Row 5 is half covered but readable. On rows 6–12 only these endings of `dept_name` show: "…y", "…Sci.", "…y", "…Sci.", nothing, "…s", "…e". All of them match [S45].)

- `department`, 7 rows (fully visible):

| dept_name | building | budget |
|---|---|---|
| Biology | Watson | 90000 |
| Comp. Sci. | Taylor | 100000 |
| Elec. Eng. | Taylor | 85000 |
| Finance | Painter | 120000 |
| History | Painter | 50000 |
| Music | Packard | 80000 |
| Physics | Watson | 70000 |

- **Reading it:**
  - r₁ = `instructor` is the referencing relation, and its primary key is `ID`.
  - r₂ = `department` is the referenced relation, and its primary key is `dept_name`.
  - `instructor.dept_name` is the primary key of `department` listed in instructor's attributes, so it is a **foreign key** by the definition on [S53].
  - ✅ Every `dept_name` in instructor (Physics, Finance, History, Comp. Sci., Elec. Eng., Biology, Music) appears in `department`, so the constraint holds on this data (worked through in §5, E1).

### [S55] Foreign Key Generalized
- ⭐ Definition:
  > "**Def**: A **referential (integrity) key** from relation r₂ to relation r₁ is a combination of attributes <a₁,…,aₙ> of r₂ such that <a₁,…,aₘ> with n < m must appear in r₁.
  > **Note**: <a₁,…,aₙ> *not* primary key for r₁"

  The "Note" line is highlighted in blue.
- ⭐ Remark:
  > "**Remark**: If attribute aᵢ is in a foreign key from r₁ referencing r₂, a **referential integrity constraint** from r₂ to r₁ requires aᵢ to be in r₁'s attributes, __as a *part of* primary key for r₁__."

  The last phrase is underlined in blue, with "part of" in italics.
- ⭐ In red: "referential (integrity) key", "from relation r₂ to relation r₁", and "referential integrity constraint".
- **In plain words, using the slide's own example ([S56]–[S58]):**
  - The direction is now **r₂ → r₁**, the opposite of the foreign key on [S53] (r₁ → r₂).
  - The attributes <a₁,…,aₙ> come from r₂ and must also appear in r₁. In r₁ they are only **part of** the primary key: r₁'s primary key has m attributes, with m > n. That is why the Note says they are *not* r₁'s primary key.
  - Example: r₂ = `section`, r₁ = `teaches`. <a₁,…,a₄> = (course_id, sec_id, semester, year), so **n = 4**. The primary key of `teaches` is (ID, course_id, sec_id, semester, year), so **m = 5**, and 4 < 5. ✔
  - The Remark fits the same example. `course_id` (for instance) is in the foreign key from teaches (r₁) referencing section (r₂). The referential integrity constraint from section (r₂) to teaches (r₁) needs `course_id` to be in teaches, as part of teaches' primary key. ✔
- ⚠️ The definition's notation "<a₁,…,aₘ> with n < m must appear in r₁" is very compressed. Read it as: "the n attributes must appear in r₁ inside a larger, m-attribute combination, namely r₁'s primary key". This is the only reading that fits the Note, the Remark and the example on [S56]–[S58].
- 🔎 Look up in Track B: the textbook's own wording for a referential-integrity constraint whose target attributes are not the whole primary key.

### [S56] Example (teaches ↔ section)
- **Layout of the picture:** `section:` is behind, at the top right. `teaches:` is in front, on the left, and covers section's `course_id` and `sec_id` columns from row 2 down. Only row 1 ("BIO-101 | 1") of those two columns is visible.
- **Annotations (top left, red):**
  - **r₁** is written next to "teaches:" and **r₂** next to "section:". Two curved arrows join them:
    - ⭐ the upper arrow goes **r₁ → r₂**, labelled "**foreign key constraint**";
    - ⭐ the lower arrow goes **r₂ → r₁**, labelled "**referential integrity constraint**".
  - **Red boxes** surround the same four headers, (course_id, sec_id, semester, year), in both tables.
  - An ⭐ **orange box** surrounds the whole `teaches` header (ID, course_id, sec_id, semester, year). An orange arrow comes from the note "**Note: primary key for "teaches"**".
- `teaches`, 15 rows (fully visible):

| ID | course_id | sec_id | semester | year |
|---|---|---|---|---|
| 10101 | CS-101 | 1 | Fall | 2009 |
| 10101 | CS-315 | 1 | Spring | 2010 |
| 10101 | CS-347 | 1 | Fall | 2009 |
| 12121 | FIN-201 | 1 | Spring | 2010 |
| 15151 | MU-199 | 1 | Spring | 2010 |
| 22222 | PHY-101 | 1 | Fall | 2009 |
| 32343 | HIS-351 | 1 | Spring | 2010 |
| 45565 | CS-101 | 1 | Spring | 2010 |
| 45565 | CS-319 | 1 | Spring | 2010 |
| 76766 | BIO-101 | 1 | Summer | 2009 |
| 76766 | BIO-301 | 1 | Summer | 2010 |
| 83821 | CS-190 | 1 | Spring | 2009 |
| 83821 | CS-190 | 2 | Spring | 2009 |
| 83821 | CS-319 | 2 | Spring | 2010 |
| 98345 | EE-181 | 1 | Spring | 2009 |

- `section`, 15 rows (*italic* = covered on [S56]/[S58], filled from [S48]; the visible columns match [S48] row by row):

| course_id | sec_id | semester | year | building | room_number | time_slot_id |
|---|---|---|---|---|---|---|
| BIO-101 | 1 | Summer | 2009 | Painter | 514 | B |
| *BIO-301* | *1* | Summer | 2010 | Painter | 514 | A |
| *CS-101* | *1* | Fall | 2009 | Packard | 101 | H |
| *CS-101* | *1* | Spring | 2010 | Packard | 101 | F |
| *CS-190* | *1* | Spring | 2009 | Taylor | 3128 | E |
| *CS-190* | *2* | Spring | 2009 | Taylor | 3128 | A |
| *CS-315* | *1* | Spring | 2010 | Watson | 120 | D |
| *CS-319* | *1* | Spring | 2010 | Watson | 100 | B |
| *CS-319* | *2* | Spring | 2010 | Taylor | 3128 | C |
| *CS-347* | *1* | Fall | 2009 | Taylor | 3128 | A |
| *EE-181* | *1* | Spring | 2009 | Taylor | 3128 | C |
| *FIN-201* | *1* | Spring | 2010 | Packard | 101 | B |
| *HIS-351* | *1* | Spring | 2010 | Painter | 514 | C |
| *MU-199* | *1* | Spring | 2010 | Packard | 101 | D |
| *PHY-101* | *1* | Fall | 2009 | Watson | 100 | A |

- **Reading it:**
  - **Foreign key constraint, teaches (r₁) → section (r₂):** (course_id, sec_id, semester, year) in teaches is section's primary key listed in teaches's attributes, so it is a foreign key by [S53]. Section's primary key is the red-boxed (course_id, sec_id, semester, year). [S48] confirms this: "primary key", and "NB: singular key, not keys!".
  - **Referential integrity constraint, section (r₂) → teaches (r₁):** these are the same four attributes, but in teaches they are only **part of** the primary key (the orange box also includes `ID`). This is the generalized case from [S55], explained on [S57].

### [S57] Example (*cont.*)
- > "Suppose that we want to define a data constraint ("business rule on data") that says:"
- ⭐ Highlighted in blue:
  > ""(1) If a section exists for a course, it must be taught by at least one instructor. However, (2) it could possibly be taught by more than one instructor.""
- > "To enforce (1), we'd require a ⭐**referential integrity constraint** that says that, if a particular (*course_id, sec_id, semester, year*) instance of data appears in *section*, then the same combination must appear in *teaches*."
- In plain words:
  - Rule (1) becomes the constraint **section → teaches**: every section's 4-attribute combination must also appear in teaches, i.e. some instructor teaches it.
  - The slide doesn't turn rule (2) into a constraint. My reading of [S56]: teaches' primary key includes `ID`, so the same section can appear in teaches with several different IDs. The schema therefore *allows* (2).

### [S58] Example (*cont.*)
- These are the **same two tables as [S56]**. The table area is pixel-identical, so all rows are as shown under [S56].
- ⭐ The difference is the annotation. Only **one** curved red arrow is left: from **r₂** (section) to **r₁** (teaches), labelled "**referential integrity constraint**". The "foreign key constraint" arrow has been removed, so this slide focuses on the r₂ → r₁ direction, the one that enforces rule (1) from [S57].
- The orange note "Note: primary key for "teaches"" and the red and orange header boxes are still there.
- ⚠️ A stray "**64**" is printed just above the footer. It looks like a leftover page number from the source slide; ignore it.
- ✅ On this data, all 15 sections appear in teaches, so the constraint holds. Each section has exactly one teacher here: teaches has 15 rows and 15 different section combinations. See §5, E2.

### [S59] Schema Diagram for University Database
- This is the same diagram as [S50] in part 1. Here it appears under "Referential Integrity", with an added NB box.
- There are **11 relations**. The primary-key attributes are **underlined**:

| Relation | Attributes (PK underlined on slide → **bold** here) |
|---|---|
| takes | **ID**, **course_id**, **sec_id**, **semester**, **year**, grade |
| student | **ID**, name, dept_name, tot_cred |
| section | **course_id**, **sec_id**, **semester**, **year**, building, room_no, time_slot_id |
| course | **course_id**, title, dept_name, credits |
| department | **dept_name**, building, budget |
| advisor | **s_id**, i_id *(only s_id is underlined)* |
| time_slot | **time_slot_id**, **day**, **start_time**, end_time |
| classroom | **building**, **room_no**, capacity |
| prereq | **course_id**, **prereq_id** |
| instructor | **ID**, name, dept_name, salary |
| teaches | **ID**, **course_id**, **sec_id**, **semester**, **year** |

- **Arrows (12 in total).** Each line starts at the referencing relation, where the foreign key is, and its arrowhead touches the referenced relation, at its primary key:

| # | From (referencing) — line leaves at | → To (referenced) — arrowhead at |
|---|---|---|
| 1 | takes — `ID` | student — `ID` |
| 2 | takes — left side, at `year` | section — left side, at `year` (its key: course_id, sec_id, semester, year) |
| 3 | section — `course_id` | course — `course_id` |
| 4 | section — `building` (the line runs down) | classroom — `building` (its key: building, room_no) |
| 5 | teaches — left side, at `semester` | section — right side, at `semester` |
| 6 | teaches — `ID` | instructor — `ID` |
| 7 | course — `dept_name` | department — `dept_name` |
| 8 | student — `dept_name` | department — `dept_name` |
| 9 | instructor — `dept_name` | department (arrowhead beside `building`, i.e. the department box) |
| 10 | advisor — `s_id` | student — `ID` |
| 11 | advisor — `i_id` | instructor — `ID` |
| 12 | prereq — at `prereq_id` (only one line is drawn) | course — `course_id` |

  - **time_slot has no arrow at all**, in or out.
  - Arrows pointing **into** each relation: department 3 (from course, student, instructor); course 2 (section, prereq); student 2 (takes, advisor); instructor 2 (teaches, advisor); section 2 (takes, teaches); classroom 1 (section).
  - The names can differ: `advisor.s_id` points to `student.ID`, and `advisor.i_id` points to `instructor.ID`.
- ⭐ **NB box** (light blue, red border): "**NB: only foreign key dependencies (i.e., foreign integrity constraints) are depicted (see arrows)**".
- *My reasoning from the slides' own definitions:* `section.time_slot_id` gets no arrow. time_slot's primary key is (time_slot_id, day, start_time), and section lists only `time_slot_id`, which is not the whole key. So it is not a foreign key in the sense of [S53], and by the NB it is not drawn. This is exactly the "part of a primary key" situation of [S55].
- ⚠️ A minor naming difference: the table on [S56] and [S48] calls section's column `room_number`, while the diagram calls it `room_no` (in both section and classroom).
- 🔎 Look up in Track B: (a) confirm why time_slot gets no arrow; (b) whether `prereq` has one or two foreign keys to `course` (the diagram draws only one line).

### [S60] Outline
- Divider slide. Item **7 "Relational Operations"** is now highlighted.

### [S61] Relational Operations (section title)
- "⭐ ***Relational*** **Operations**". "Relational" is in red italics.
- "**Ch 2, T; section 2.6**" is a reading pointer. T = the textbook: the slide shows the cover of *Database System Concepts*, Sixth Edition, the same book as on [S76].

### [S62] *Knowledge* in RDBMSs
- > "**Question**: "What students have registered to the course with course_ID = SOC3020?""
- > "**Answer**: ⭐**Knowledge** emerges from DB' schemas:
  > 1. *department* (*dept_name*, *course_id*)
  > 2. *student* (*ID*, *name*, *dept_name*, *tot_cred*)
  > - From 1 we can find the *dept_name* of all the departments that offer the course SOC3020.
  > - From 2 we find information of students in *dept_name*."
- ⭐ "Knowledge" is in red in the title and in the Answer. `dept_name` is in **blue** everywhere on the slide, which shows it is the attribute linking the two schemas. No attributes are underlined on this slide.
- In plain words:
  - **Step 1:** in `department`, take the rows with course_id = SOC3020 and read their `dept_name`.
  - **Step 2:** in `student`, find the students whose `dept_name` is one of those values.
  - Neither schema alone answers the question. The answer "emerges" when you combine them through `dept_name`.
- ⚠️ "DB' schemas" is probably "DB's schemas". The question writes "course_ID" while the schema writes "course_id".
- ⚠️ This `department` schema, (dept_name, course_id), is a simplified one. It differs from department (dept_name, building, budget) on [S54], [S59] and [S68].
- ⚠️ As written, the answer finds the students **of the departments that offer** SOC3020. That is broader than students **registered to** SOC3020, so read it as an illustration of linking schemas.
- 🔎 Look up in Track B: how "registered to a course" is represented (compare `takes` on [S59]).

### [S63] Relational Operations
- > "We concentrate on the following operations:
  > - selection of tuples/rows,
  > - projection (or: selection of attributes/columns),
  > - natural join,
  > - Cartesian product,
  > - union,
  > - set difference,
  > - intersection.
  >
  > In this lecture, we'll express each operation by using the language of Relational Algebra.
  > - Successively, we'll use SQL."
- ⭐ The operation names are coloured. **Red:** selection, projection, Cartesian product, union, set difference. **Blue:** natural join, intersection. 🔎 Look up in Track B: whether this red/blue split means something (the slide doesn't explain it).
- Language note: "Successively" here means "later / afterwards". **No SQL appears anywhere on slides 51–81.**
- The next slides take the operations in this same order, numbered 1–7.

### [S64] 1. Select – selection of rows (reveal step)
- "Relation r":

| A | B | C | D |
|---|---|---|---|
| α | α | 1 | 7 |
| α | β | 5 | 7 |
| β | β | 12 | 3 |
| β | β | 23 | 10 |

- A second, result table is shown **without any expression yet**:

| A | B | C | D |
|---|---|---|---|
| α | α | 1 | 7 |
| β | β | 23 | 10 |

- ⭐ This is a reveal step: the condition appears only on [S65]. Good self-test: work out the condition before you look.

### [S65] 1. Select – selection of rows (with the expression)
- Same "Relation r" as [S64]. Next to the result table it now says:
  - **σ<sub>A=B and D > 5</sub> (r)** (as printed: `σA=B and D > 5 (r)`)
- Result: (α, α, 1, 7) and (β, β, 23, 10). Selection keeps **whole rows**, with all four columns, for which the condition is true. ✅ Row-by-row check in §5, E4.

### [S66] 2. Project – selection of columns (reveal step)
- "Relation *r*":

| A | B | C |
|---|---|---|
| α | 10 | 1 |
| α | 20 | 1 |
| β | 30 | 1 |
| β | 40 | 2 |

- Below it, two tables joined by "**=**" are shown **without the expression yet**:

| A | C |
|---|---|
| α | 1 |
| α | 1 |
| β | 1 |
| β | 2 |

**=**

| A | C |
|---|---|
| α | 1 |
| β | 1 |
| β | 2 |

### [S67] 2. Project – selection of columns (with the expression)
- Same tables as [S66], now labelled **∏<sub>A,C</sub> (r)** (as printed: `∏A,C (r)`, with a capital pi).
- ⭐ The "=" shows two stages. First you keep only columns A and C, which gives 4 rows, with (α, 1) twice. That result **equals** the 3-row table, where (α, 1) appears **once**. ✅

### [S68] 3. Natural Join
- "Relations *r*, *s*:"
  - *r* (ID, name, dept_name, salary): the same 12 instructors as [S45]/[S54], **sorted by ID** here:

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

  - *s* (dept_name, building, budget): the same 7 departments as [S54]: Biology/Watson/90000, Comp. Sci./Taylor/100000, Elec. Eng./Taylor/85000, Finance/Painter/120000, History/Painter/50000, Music/Packard/80000, Physics/Watson/70000.
- "***r* + *s*:**" ⚠️ The slide prints a **"+"** here. The slide's title says this is the **natural join**. 🔎 Look up in Track B: the standard natural-join symbol (usually written ⋈).
- Result: 12 rows, 6 columns in this order:

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

- In plain words: each row of r is glued to the row of s that has the **same `dept_name`**, the attribute the two relations share, and `dept_name` appears **only once** in the result. Every r-row finds exactly one partner. That is because `dept_name` is s's primary key ([S54]) and every instructor's dept_name exists in s (the foreign key of [S54]). So 12 rows come in and 12 rows go out. ✅ Identical to the slide, row for row (§5, E6).

### [S69] 4. Join – Cartesian Product
- "Relations *r*, *s*:"

*r*:

| A | B |
|---|---|
| α | 1 |
| β | 2 |

*s*:

| C | D | E |
|---|---|---|
| α | 10 | a |
| β | 10 | a |
| β | 20 | b |
| γ | 10 | b |

- "***r* x *s*:**" (printed with the letter x, meaning ×):

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

- In plain words: **every** row of r is paired with **every** row of s. That gives 2 × 4 = **8** rows, with all the attributes of r followed by all the attributes of s (A, B, C, D, E). Nothing is matched or removed. The slide's title calls this a kind of join ("Join – Cartesian Product"). ✅

### [S70] 5. Union of two relations
- "Relations *r*, *s*:"

*r*:

| A | B |
|---|---|
| α | 1 |
| α | 2 |
| β | 1 |

*s*:

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

- ⭐ (red) "**Note: the two relations must be "similar", that is, of the same logical schema**"
- In plain words: the result holds every row that is in r **or** in s. (α, 2) is in both but appears once. ✅

### [S71] 6. Set difference of two relations
- Same r and s as [S70].
- "***r* – *s*:**"

| A | B |
|---|---|
| α | 1 |
| β | 1 |

- ⭐ (red) The same Note: "the two relations must be "similar", that is, of the same logical schema".
- In plain words: the result holds the rows of r that are **not** in s. (α, 2) is removed because s has it. s's own row (β, 3) plays no part. ✅

### [S72] 7. Intersection of two relations
- "Relation *r*, *s*:" are the same r and s as [S70].
- "***r* ∩ *s***"

| A | B |
|---|---|
| α | 2 |

- ⭐ (red) The same Note: "the two relations must be "similar", that is, of the same logical schema".
- ⭐ "**Note: r ∩ s = r – (r – s)**". Check: r – s = {(α,1), (β,1)} from [S71], so r – (r – s) = {(α,2)} = r ∩ s. ✅
- ⚠️ Trivial: this slide says "Relation r, s:" (singular), while the others say "Relations".

### [S73] Appendix (divider)
- Same list as the Outline, now titled "Appendix". Item **8 "Appendix: MySQL - Installation Guidelines"** is highlighted.

### [S74] MySQL — Installation Guidelines (section title)
- "**MySQL**", with "Installation Guidelines" in red. There is no other content.

### [S75] Prepare for Practice (tools and download links)
- Three links in large type at the bottom left:
  - **MySQL:** dev.mysql.com/downloads/
  - **XAMPP:** www.apachefriends.org/
  - **MAMP:** www.mamp.info/en/downloads/
- **Left screenshot, phpMyAdmin:**
  - "Server: localhost:8889". Tabs: Databases, SQL, Status, Users, Export, Import, Settings, Replication.
  - Database list includes "DB course 2017-18", "information_schema", "mysql" and "performance_schema".
  - Server connection collation: utf8mb4_unicode_ci. Database server: Server type MySQL, User root@localhost.
  - Console: "Press Ctrl+Enter to execute query".
- **Right screenshot, MAMP start page** (localhost:8888/MAMP/…):
  - "**Welcome! MAMP has been installed successfully.**"
  - "MySQL can be administered with phpMyAdmin. To connect to the MySQL server from your own scripts use the following connection parameters:"

```
Host      localhost
Port      8889
User      root
Password  root
Socket    /Applications/MAMP/tmp/mysql/mysql.sock
```

### [S76] Prepare for Practice (textbook website)
- "**Textbook website: http://www.db-book.com**"
- The screenshot shows the db-book.com home page for *Database System Concepts*, Sixth Edition: Avi Silberschatz, Henry F. Korth, S. Sudarshan; McGraw-Hill; ISBN 0-07-352332-1.
- Its link list: What is New in The Sixth Edition · Table of Contents · Preface · Appendices · Slides · Teaching Material · **Laboratory Material** · Solutions to Practice Exercises · Errata.
- ⭐ A red arrow points to "**Laboratory Material**".

### [S77] Prepare for Practice (Laboratory Information)
- Same "Textbook website" line. The screenshot shows the "**Laboratory Information**" page: Links to database sites · Oracle Tips · PostgreSQL Tips · **Sample Tables** · Sample Lab Exercises · Sample Term Projects.
- ⭐ A red arrow points to "**Sample Tables**".

### [S78] Prepare for Practice (Sample Tables page)
- Same "Textbook website" line. The screenshot's text reads:
  > "We provide below the DDL and sample data for the tables in the university that we use in our text, with one change: instead of using the **time** data type, which is not supported on some databases such as Oracle, we split start_time into start_hr and start_min, and end_time into end_hr and end_min, which are integer types. If the database you use supports the **time** type, and you wish to use it, you can modify the DDL and the sample data files accordingly."
  > - "For most databases (other than MySQL:) DDL (use this the first time), DDL with drop table (use this if you wish to recreate the database after dropping existing tables)"
  > - "For MySQL: ⭐**DDL for MySQL**, and DDL with drop table for MySQL"
  > - "⭐**SQL code for creating small relations** — The file smallRelationsInsertFile.sql contains data that matches Appendix A exactly. The file contains SQL insert statements to load data into all the tables, after first deleting any data that the tables currently contain. The data include students taking courses outside their department, and instructors teaching courses outside their department; this helps detect errors in natural join specifications that accidentally equate department names of students or instructors with department names of courses."
  > - "SQL code for creating large relations — The file largeRelationsInsertFile.sql contains SQL insert statements for larger, randomly created relations for a truly strange university (since course titles and department names are chosen randomly)."
- ⭐ **Two red arrows** point to "**DDL for MySQL**" and to "**SQL code for creating small relations**".

### [S79] Prepare for Practice (phpMyAdmin: New, then Import)
- phpMyAdmin at "Server: localhost:8889". The Database server panel shows: Localhost via UNIX socket · Server type: MySQL · Server version: 5.5.42 - Source distribution · User: root@localhost · Server charset: UTF-8 Unicode (utf8). It also shows PHP version 7.0.0.
- ⭐ Red circle **①** with a red box on "**New**" in the left panel. A database named "**DB-SOC3020**" is shown below it.
- ⭐ Red circle **②** with a red box on the "**Import**" tab.

> **Appendix as practical steps (from [S75]–[S79]):**
> 1. Install a local MySQL server: MySQL (dev.mysql.com/downloads/), or XAMPP (www.apachefriends.org/), or MAMP (www.mamp.info/en/downloads/) [S75].
> 2. With MAMP, the start page confirms the install. It also gives the connection parameters (localhost, port 8889, user root, password root) and says MySQL "can be administered with phpMyAdmin" [S75].
> 3. Open http://www.db-book.com, then **Laboratory Material** [S76], then **Sample Tables** [S77].
> 4. Download **DDL for MySQL** and **SQL code for creating small relations** (smallRelationsInsertFile.sql) [S78].
> 5. In phpMyAdmin: **① New**, to create a database (the slide's is called DB-SOC3020), then **② Import**, to load the files [S79]. The slides don't number the order of the files, but the data file "contains SQL insert statements to load data into all the tables". So the tables (the DDL) have to exist first.

### [S80] Summary
- Lists all 8 sections, now all in red: 1 From Previous Week · 2 The Relational Model · 3 Data and Data Relationships · 4 Data Semantics · 5 Data Constraints: Entity Integrity · 6 Data Constraints: Referential Integrity · 7 Relational Operations · 8 Appendix: MySQL - Installation Guidelines. There is no new content.

### [S81] End of Slides
- "DATABASE — End of Slides — WEEK 2 — Code: W2.L1L2".

---

## 3. Definitions & key terms (word for word)

- **Referential Integrity** = "Keys for the Integrity among Tables" = "How the Relational Model represents relationships..." **[S52]**
- **Data constraints**: "(technical and business rules)" **[S52]**. A **data constraint** is a "business rule on data" **[S57]**.
- **Primary key** (the prerequisite, from part 1): "A primary key for a relation R is a candidate key chosen by the database designer to identify uniquely a tuple in the relation R." **[S44]**
- **Foreign key**: "A foreign key from relation r₁ referencing [or: to] relation r₂ is the primary key for r₂ listed in the attributes of r₁." **[S53]**
- **Foreign (key) integrity constraint**: "So, by previous definition we define a foreign (key) integrity constraint from r₁ to r₂." "Such constraint is: "The value of attributes in foreign key from r₁ referencing r₂ must match — if not null! — the values of attributes of primary key for r₂."" **[S53]**
- **Referencing relation**: the relation holding the foreign key. "primary key for department located in instructor (r₁) (referencing relation of the foreign key dependency)" **[S54]**
- **Referenced relation**: the relation whose primary key is referenced. "primary key for department (r₂) (referenced relation of the foreign key dependency)" **[S54]**
- **Foreign key, example**: "so, dept_name is a foreign key from instructor referencing department" **[S54]**
- **Referential (integrity) key**: "A referential (integrity) key from relation r₂ to relation r₁ is a combination of attributes <a₁,…,aₙ> of r₂ such that <a₁,…,aₘ> with n < m must appear in r₁. Note: <a₁,…,aₙ> not primary key for r₁" **[S55]**
- **Referential integrity constraint**: "If attribute aᵢ is in a foreign key from r₁ referencing r₂, a referential integrity constraint from r₂ to r₁ requires aᵢ to be in r₁'s attributes, as a part of primary key for r₁." **[S55]** Example: "if a particular (course_id, sec_id, semester, year) instance of data appears in section, then the same combination must appear in teaches." **[S57]**
- **Foreign key constraint vs referential integrity constraint**, as drawn: "foreign key constraint" r₁ → r₂ and "referential integrity constraint" r₂ → r₁, with r₁ = teaches and r₂ = section **[S56]**. [S58] keeps only the second one.
- **Foreign key dependencies**: "(i.e., foreign integrity constraints)". In a schema diagram they are the arrows, and "only foreign key dependencies … are depicted" **[S59]**
- **Knowledge (in RDBMSs)**: "Knowledge emerges from DB' schemas" **[S62]**
- **Relational Algebra**: "In this lecture, we'll express each operation by using the language of Relational Algebra." **[S63]**
- **Selection**: "selection of tuples/rows" **[S63]**. Slide title: "1. Select – selection of rows" **[S64]**
- **Projection**: "projection (or: selection of attributes/columns)" **[S63]**. Slide title: "2. Project – selection of columns" **[S66]**
- **Natural join**: "natural join" **[S63]**. Slide title: "3. Natural Join" **[S68]**
- **Cartesian product**: "Cartesian product" **[S63]**. Slide title: "4. Join – Cartesian Product" **[S69]**
- **Union**: "union" **[S63]**. Slide title: "5. Union of two relations" **[S70]**
- **Set difference**: "set difference" **[S63]**. Slide title: "6. Set difference of two relations" **[S71]**
- **Intersection**: "intersection" **[S63]**. Slide title: "7. Intersection of two relations" **[S72]**, plus "Note: r ∩ s = r – (r – s)" **[S72]**
- **"Similar" relations**: "Note: the two relations must be "similar", that is, of the same logical schema" **[S70], [S71], [S72]**

> The slides give **no one-sentence definition** for each operation, only the titles above and the worked examples. The "what it does" column in §4 is read off those examples.

---

## 4. Relational-operations reference

| # | Operation (slide title) | Notation exactly as printed | What it does (read off the slide's example) | Example input | Result on slide | Extra note on the slide |
|---|---|---|---|---|---|---|
| 1 | Select – selection of rows [S64–S65] | σ<sub>A=B and D > 5</sub> (r) | keeps the **rows** that satisfy the condition, with all columns | r(A,B,C,D), 4 rows | 2 rows | result shown first, expression revealed on [S65] |
| 2 | Project – selection of columns [S66–S67] | ∏<sub>A,C</sub> (r) | keeps only the listed **columns**; a repeated row appears once | r(A,B,C), 4 rows | 3 rows over (A,C) | "4-row table = 3-row table" |
| 3 | Natural Join [S68] | printed "r + s" ⚠️ | glues r-rows to s-rows with the **same value of the shared attribute** (dept_name), which is shown once | r: 12 rows, s: 7 rows | 12 rows, 6 columns | — |
| 4 | Join – Cartesian Product [S69] | r x s | pairs **every** r-row with **every** s-row; all attributes of both | r: 2 rows, s: 4 rows | 8 rows over (A,B,C,D,E) | — |
| 5 | Union of two relations [S70] | r ∪ s | rows in r **or** s (a shared row once) | r: 3, s: 2 | 4 rows | must be "similar" (same logical schema) |
| 6 | Set difference of two relations [S71] | r – s | rows in r **but not** in s | r: 3, s: 2 | 2 rows | must be "similar" |
| 7 | Intersection of two relations [S72] | r ∩ s | rows in **both** | r: 3, s: 2 | 1 row | must be "similar"; r ∩ s = r – (r – s) |

- **SQL counterpart:** none of [S63]–[S72] gives one. [S63] says "Successively, we'll use SQL". 🔎 Look up in Track B: the SQL form of each operation.
- 🔎 Look up in Track B: other ways to write "and" inside a selection condition (the slide writes the word "and").
- 🔎 Look up in Track B: the standard name for "similar" relations and the exact conditions.

**Inputs and outputs in compact form:**
1. **σ<sub>A=B and D > 5</sub>(r)**: r = {(α,α,1,7), (α,β,5,7), (β,β,12,3), (β,β,23,10)} → {(α,α,1,7), (β,β,23,10)} ✅
2. **∏<sub>A,C</sub>(r)**: r = {(α,10,1), (α,20,1), (β,30,1), (β,40,2)} → after the cut {(α,1), (α,1), (β,1), (β,2)} = {(α,1), (β,1), (β,2)} ✅
3. **r "+" s (natural join)**: 12 instructor rows, each matched on dept_name with one of the 7 department rows → 12 rows (ID, name, salary, dept_name, building, budget) ✅
4. **r x s**: {(α,1), (β,2)} × {(α,10,a), (β,10,a), (β,20,b), (γ,10,b)} → 8 rows ✅
5. **r ∪ s**: {(α,1), (α,2), (β,1)} ∪ {(α,2), (β,3)} = {(α,1), (α,2), (β,1), (β,3)} ✅
6. **r – s** = {(α,1), (β,1)} ✅
7. **r ∩ s** = {(α,2)} = r – (r – s) ✅

---

## 5. Examples & exercises from class (worked step by step, verified)

### E1 [S54]: Does instructor → department satisfy the foreign key constraint?
- Rule [S53]: each instructor.dept_name must equal some department.dept_name, unless it is null.

| instructor.dept_name value | instructors with it (from [S45]/[S54]) | found in department? |
|---|---|---|
| Physics | Einstein, Gold | ✔ (Watson, 70000) |
| Finance | Wu, Singh | ✔ (Painter, 120000) |
| History | El Said, Califieri | ✔ (Painter, 50000) |
| Comp. Sci. | Katz, Srinivasan, Brandt | ✔ (Taylor, 100000) |
| Elec. Eng. | Kim | ✔ (Taylor, 85000) |
| Biology | Crick | ✔ (Watson, 90000) |
| Music | Mozart | ✔ (Packard, 80000) |

- **Result:** all 12 instructors match, so the constraint holds. Every department is also used by at least one instructor. ✅

### E2 [S56]–[S58]: Both directions between teaches and section
- **Foreign key constraint, teaches → section [S56]:** every (course_id, sec_id, semester, year) in teaches must be a section.
- **Referential integrity constraint, section → teaches [S57]–[S58]:** every section must appear in teaches, i.e. "taught by at least one instructor".
- The table below lists each section ([S48]/[S56]) with the teaches row(s) that contain it. Names come from [S45].

| # | section (course_id, sec_id, semester, year) | taught by (teaches.ID) |
|---|---|---|
| 1 | BIO-101, 1, Summer, 2009 | 76766 (Crick) |
| 2 | BIO-301, 1, Summer, 2010 | 76766 (Crick) |
| 3 | CS-101, 1, Fall, 2009 | 10101 (Srinivasan) |
| 4 | CS-101, 1, Spring, 2010 | 45565 (Katz) |
| 5 | CS-190, 1, Spring, 2009 | 83821 (Brandt) |
| 6 | CS-190, 2, Spring, 2009 | 83821 (Brandt) |
| 7 | CS-315, 1, Spring, 2010 | 10101 (Srinivasan) |
| 8 | CS-319, 1, Spring, 2010 | 45565 (Katz) |
| 9 | CS-319, 2, Spring, 2010 | 83821 (Brandt) |
| 10 | CS-347, 1, Fall, 2009 | 10101 (Srinivasan) |
| 11 | EE-181, 1, Spring, 2009 | 98345 (Kim) |
| 12 | FIN-201, 1, Spring, 2010 | 12121 (Wu) |
| 13 | HIS-351, 1, Spring, 2010 | 32343 (El Said) |
| 14 | MU-199, 1, Spring, 2010 | 15151 (Mozart) |
| 15 | PHY-101, 1, Fall, 2009 | 22222 (Einstein) |

- **section → teaches:** every section has an entry, so rule (1) of [S57] holds. ✅
- **teaches → section:** all 15 teaches rows land on a section above, so the foreign key holds. ✅
- Each section has **exactly one** instructor in this data: teaches has 15 rows and 15 different section combinations. Rule (2), "could possibly be taught by more than one", is allowed but not used here.
- **Quick visible-only check** (works even without [S48]): count the (semester, year) pairs.
  - section: Summer 2009 ×1, Summer 2010 ×1, Fall 2009 ×3, Spring 2009 ×3, Spring 2010 ×7.
  - teaches: exactly the same counts.

### E3 [S57]: From business rule to constraint
1. The business rule (1) says every section needs ≥ 1 instructor.
2. The fact "who teaches what" lives in `teaches`.
3. So: if the combination (course_id, sec_id, semester, year) is in `section`, it must also be in `teaches`. That is a **referential integrity constraint from section to teaches**.
4. It is not a foreign key in the [S53] sense, because in teaches those 4 attributes are only *part of* the primary key (ID, course_id, sec_id, semester, year): n = 4 < m = 5, as on [S55].

### E4 [S65]: σ<sub>A=B and D > 5</sub>(r), row by row

| row | A | B | C | D | A = B? | D > 5? | both → keep? |
|---|---|---|---|---|---|---|---|
| 1 | α | α | 1 | 7 | yes | yes (7) | ✔ keep |
| 2 | α | β | 5 | 7 | **no** | yes | ✘ |
| 3 | β | β | 12 | 3 | yes | **no** (3) | ✘ |
| 4 | β | β | 23 | 10 | yes | yes (10) | ✔ keep |

- Result: {(α,α,1,7), (β,β,23,10)}, the same as the slide. ✅

### E5 [S67]: ∏<sub>A,C</sub>(r), step by step
1. Cut out columns A and C: (α,1), (α,1), (β,1), (β,2). This is the left table on the slide.
2. (α,1) appears twice, but the slide's "=" table lists it once. The result is (α,1), (β,1), (β,2), **3 tuples**. ✅

### E6 [S68]: Natural join, how each row is built
- For each r-row, look up its `dept_name` in s and append that row's `building` and `budget`:
  - Srinivasan, Comp. Sci. → (Comp. Sci., Taylor, 100000) → (10101, Srinivasan, 65000, Comp. Sci., Taylor, 100000)
  - Gold, Physics → (Physics, Watson, 70000) → (33456, Gold, 87000, Physics, Watson, 70000)
  - …and so on for all 12 rows.
- Rows can repeat building and budget. For example, Einstein and Gold both get (Watson, 70000), and Srinivasan, Katz and Brandt all get (Taylor, 100000).
- Result: 12 rows × 6 columns, identical to the slide. ✅

### E7 [S69]: Cartesian product
- Take r's first row, (α,1), and write it next to each of the 4 s-rows. That gives 4 rows. Do the same for (β,2), which gives 4 more. Total 8 rows, identical to the slide. ✅

### E8 [S70]–[S72]: Union, difference, intersection on the same r and s

| tuple | in r? | in s? | in r ∪ s | in r – s | in r ∩ s |
|---|---|---|---|---|---|
| (α,1) | ✔ | ✘ | ✔ | ✔ | ✘ |
| (α,2) | ✔ | ✔ | ✔ | ✘ | ✔ |
| (β,1) | ✔ | ✘ | ✔ | ✔ | ✘ |
| (β,3) | ✘ | ✔ | ✔ | ✘ | ✘ |

- r ∪ s = {(α,1), (α,2), (β,1), (β,3)}; r – s = {(α,1), (β,1)}; r ∩ s = {(α,2)}. All three match the slides. ✅
- **[S72] identity:** r – (r – s) = {(α,1), (α,2), (β,1)} – {(α,1), (β,1)} = {(α,2)} = r ∩ s. ✅

### E9 [S59]: Reading the schema diagram
1. Find the underlined attributes: those are each relation's primary key.
2. Follow each arrow from the box where it starts, which is the referencing relation holding the foreign key, to the box with the arrowhead, which is the referenced relation and its primary key.
3. The foreign key is "the primary key for r₂ listed in the attributes of r₁" [S53]. For example, takes → student means `takes.ID` references `student.ID`.
4. There are 12 arrows (table under [S59]). time_slot has none.

### E10 [S62]: Knowledge from two schemas
- Step 1, department (dept_name, course_id): course_id = SOC3020 gives the relevant dept_name values.
- Step 2, student (ID, name, dept_name, tot_cred): keep the students with those dept_name values.
- The link between the two schemas is the shared attribute **dept_name**.

---

## 6. Likely quiz/exam questions (built only from these slides)

**Q1.** Complete the definition exactly: "A foreign key from relation r₁ referencing [or: to] relation r₂ is ________."

**Q2.** According to [S53], is a foreign-key value in r₁ always required to match a primary-key value of r₂? Quote the phrase that answers this.

**Q3.** For the [S54] tables `instructor(ID, name, dept_name, salary)` and `department(dept_name, building, budget)`:
- (a) What is the primary key of each relation?
- (b) Which attribute is a foreign key, and in which direction does it go?
- (c) Which relation is the *referencing* relation and which is the *referenced* relation?

**Q4 (MCQ).** Using the [S54] data and the foreign key from instructor to department, which **insert into instructor** violates the foreign (key) integrity constraint?
- (A) (11111, Lee, Music, 50000)
- (B) (22223, Ng, null, 60000)
- (C) (33333, Ali, Chemistry, 70000)
- (D) (44444, Bo, Physics, 80000)

**Q5.** Same constraint, same data (all 12 instructors, [S45]/[S54]). Which operations would make the database violate it?
- (a) delete the department tuple 'Music'
- (b) insert the department tuple ('Chemistry', 'Watson', 60000)
- (c) change Mozart's dept_name to 'Art'
- (d) delete the department tuple 'Biology'

*Bonus:* is there **any** department tuple that could be deleted safely?

**Q6.** On [S56]:
- (a) What is the primary key of `teaches`?
- (b) What is the primary key of `section`?
- (c) Which attributes of `teaches` form a foreign key referencing `section`?

**Q7.** Business rule (1) on [S57]: "If a section exists for a course, it must be taught by at least one instructor." Which kind of constraint enforces it? Between which relations does it go, and in which direction? Exactly what does it require?

**Q8.** Explain why the constraint in Q7 is **not** a foreign key in the sense of [S53]. Give the values of n and m from the [S55] definition.

**Q9.** Check the [S56] data:
- (a) Is rule (1) satisfied?
- (b) Is any section taught by more than one instructor?

**Q10.**
- (a) Does inserting (12121, FIN-201, 2, Spring, 2010) into `teaches` respect the foreign key teaches → section?
- (b) Does inserting (33456, PHY-101, 1, Fall, 2009)? What does (b) show about rule (2) of [S57]?
- (c) [S59] has the arrow teaches → instructor. Given the [S56] teaches data, could instructor 15151 (Mozart) be deleted without breaking that foreign key? Could 33456 (Gold)?

**Q11.** In the [S59] schema diagram:
- (a) Which relations reference `department`?
- (b) Which relation does `instructor` reference, and which relations reference `instructor`?
- (c) Which relation has no arrows?
- (d) What does the NB box say the arrows show?

**Q12 (MCQ).** Which statement about the [S59] diagram is **true**?
- (A) The arrows show all integrity constraints of the database.
- (B) Only foreign key dependencies (foreign integrity constraints) are depicted as arrows.
- (C) `section` has an arrow to `time_slot`.
- (D) The primary key of `advisor` is (s_id, i_id).

**Q13.** For r on [S64] (A,B,C,D: (α,α,1,7), (α,β,5,7), (β,β,12,3), (β,β,23,10)), compute:
- (a) σ<sub>A=B and D > 5</sub>(r)
- (b) σ<sub>A=B</sub>(r)
- (c) σ<sub>D > 5</sub>(r)

**Q14.** For r on [S66] (A,B,C: (α,10,1), (α,20,1), (β,30,1), (β,40,2)):
- (a) Compute ∏<sub>A,C</sub>(r). How many tuples does it have, and why not 4?
- (b) Compute ∏<sub>A</sub>(r).

**Q15.** For the natural join on [S68] (r = instructors, s = departments):
- (a) How many tuples and how many columns does the result have?
- (b) Which attribute appears only once?
- (c) Write Gold's result tuple.
- (d) Why does every r-tuple appear exactly once in the result?

**Q16.** For r(A,B) = {(α,1), (β,2)} and s(C,D,E) on [S69]:
- (a) How many tuples does r x s have, and with which attributes?
- (b) List the tuples of r x s whose A value equals their C value.

**Q17.** For r = {(α,1), (α,2), (β,1)} and s = {(α,2), (β,3)} over (A,B) on [S70]–[S72]:
- (a) Compute r ∪ s, r – s, s – r and r ∩ s.
- (b) Verify that r ∩ s = r – (r – s).
- (c) Could r(A,B) from [S70] be combined with s(C,D,E) from [S69] using ∪? Why?

**Q18.** Appendix:
- (a) Which two files on db-book.com do the red arrows point to for MySQL practice?
- (b) What are steps ① and ② in phpMyAdmin?

**Q19 (MCQ).** Which of these is **not** one of the seven relational operations listed on [S63]?
- (A) natural join
- (B) Cartesian product
- (C) superkey
- (D) set difference

**Q20.** In "Knowledge in RDBMSs" [S62]:
- (a) Which attribute links the two schemas?
- (b) What are the two steps of the answer?

### Answers

**A1.** "…the primary key for r₂ listed in the attributes of r₁." [S53]

**A2.** No. The values must match "— **if not null!** —" the values of the primary key of r₂, so a **null** foreign-key value does not have to match. [S53]

**A3.**
- (a) instructor: `ID` ("Note: primary key for "instructor""). department: `dept_name`.
- (b) `instructor.dept_name` is "a foreign key from instructor referencing department". It goes instructor → department.
- (c) instructor (r₁) is the referencing relation. department (r₂) is the referenced relation. [S54]

**A4.** **(C).** 'Chemistry' is not a dept_name in department, so there is no match.
- (A) and (D) match existing departments.
- (B) has a null dept_name, which is allowed because of "if not null!".

[S53]–[S54]. ✅ (sqlite: C rejected; A, B, D accepted.)

**A5.**
- **(a) violates:** Mozart's dept_name 'Music' would no longer match any department.
- **(b) is fine:** adding a new primary-key value to the referenced relation breaks no existing foreign-key value.
- **(c) violates:** 'Art' is not a department.
- **(d) violates:** Crick is in Biology.

*Bonus:* **no** department can be deleted safely. Every one of the 7 departments is referenced by at least one instructor: Comp. Sci. 3; Finance, History and Physics 2 each; Biology, Elec. Eng. and Music 1 each. [S53]–[S54], data [S45]. ✅ (sqlite: a, c, d rejected; b accepted.)

**A6.**
- (a) teaches: (ID, course_id, sec_id, semester, year), the orange box and "Note: primary key for "teaches"" [S56].
- (b) section: (course_id, sec_id, semester, year), the red box [S56], confirmed on [S48].
- (c) (course_id, sec_id, semester, year) in teaches is the foreign key referencing section (the "foreign key constraint" arrow r₁ → r₂) [S56].

**A7.** A **referential integrity constraint from section (r₂) to teaches (r₁)**: "if a particular (course_id, sec_id, semester, year) instance of data appears in section, then the same combination must appear in teaches." [S57], [S58]

**A8.** In teaches, those 4 attributes are **not the primary key**, only *part of* it. A foreign key per [S53] must be "the primary key for r₂". Here we have the [S55] case: <a₁,…,aₙ> = (course_id, sec_id, semester, year), so **n = 4**. teaches' primary key (ID, course_id, sec_id, semester, year) has **m = 5**, and n < m. As the Note says, "<a₁,…,aₙ> not primary key for r₁". [S53], [S55], [S56]

**A9.**
- (a) **Yes:** all 15 sections appear in teaches (table in §5, E2).
- (b) **No:** teaches has 15 rows covering 15 different sections, one instructor each. ✅

**A10.**
- (a) **No.** Section FIN-201, sec_id 2, Spring 2010 does not exist (FIN-201 has only sec_id 1), so it violates teaches → section. ✅ (sqlite: rejected)
- (b) **Yes.** PHY-101/1/Fall/2009 exists in section, and 33456 (Gold) exists in instructor. Because teaches' primary key includes `ID`, this is a new tuple next to (22222, PHY-101, 1, Fall, 2009). The section would then be taught by **two** instructors, which is exactly what rule (2) allows. ✅ (sqlite: accepted)
- (c) **Mozart: no.** teaches has (15151, MU-199, 1, Spring, 2010), whose ID would no longer match. **Gold: yes, as far as teaches is concerned**, because Gold has no teaches row. (advisor → instructor also points to instructor, but the slides give no advisor data.) [S56], [S59]. ✅

**A11.**
- (a) course, student and instructor, via `dept_name` (3 arrows in).
- (b) instructor references department. teaches (`ID`) and advisor (`i_id`) reference instructor.
- (c) **time_slot**.
- (d) "NB: only foreign key dependencies (i.e., foreign integrity constraints) are depicted (see arrows)". [S59]

**A12.** **(B).**
- (A) is false because of the NB.
- (C) is false: no arrow touches time_slot.
- (D) is false: only `s_id` is underlined in advisor.

[S59]

**A13.**
- (a) {(α,α,1,7), (β,β,23,10)} [S65].
- (b) {(α,α,1,7), (β,β,12,3), (β,β,23,10)}.
- (c) {(α,α,1,7), (α,β,5,7), (β,β,23,10)}.

Notice that (a) is exactly the rows common to (b) and (c). ✅

**A14.**
- (a) {(α,1), (β,1), (β,2)}, **3 tuples**. Rows 1 and 2 both become (α,1) once only A and C are kept, and the slide's "=" shows that duplicate written once [S66]–[S67].
- (b) ∏<sub>A</sub>(r) = {α, β}. ✅

**A15.**
- (a) **12 tuples, 6 columns** (ID, name, salary, dept_name, building, budget).
- (b) **dept_name**, the attribute shared by r and s, appears once.
- (c) (33456, Gold, 87000, Physics, Watson, 70000).
- (d) dept_name is department's primary key, so each instructor matches **at most one** department. Every instructor's dept_name exists in department (the foreign key of [S54]), so each matches **at least one**. [S68]. ✅

**A16.**
- (a) **2 × 4 = 8** tuples over (A, B, C, D, E) [S69].
- (b) (α,1,α,10,a), (β,2,β,10,a) and (β,2,β,20,b). ✅

**A17.**
- (a) r ∪ s = {(α,1), (α,2), (β,1), (β,3)}; r – s = {(α,1), (β,1)}; s – r = {(β,3)}; r ∩ s = {(α,2)}.
- (b) r – (r – s) = r – {(α,1), (β,1)} = {(α,2)} = r ∩ s ✔.
- (c) **No.** "the two relations must be "similar", that is, of the same logical schema", and (A,B) differs from (C,D,E). [S70]–[S72]. ✅

**A18.**
- (a) "**DDL for MySQL**" and "**SQL code for creating small relations**" (smallRelationsInsertFile.sql) [S78]. You reach them from db-book.com via Laboratory Material [S76], then Sample Tables [S77].
- (b) ① **New**, to create the database (DB-SOC3020 on the slide), then ② **Import** [S79].

**A19.** **(C) superkey.** It is a key notion from part 1 ([S41]), not an operation. [S63]

**A20.**
- (a) **dept_name** (in blue on the slide).
- (b) Step 1: from department (dept_name, course_id), "find the dept_name of all the departments that offer the course SOC3020". Step 2: from student (ID, name, dept_name, tot_cred), "find information of students in dept_name". [S62]

---

## 7. Self-check

- [ ] I can recite the [S53] definition of a foreign key word for word, including the "— if not null! —" clause, and explain what it allows.
- [ ] I can point to the referencing relation (r₁), the referenced relation (r₂), and the foreign key in the instructor/department example [S54].
- [ ] I can decide whether an insert, delete or update on the instructor/department or teaches/section tables breaks a foreign key constraint, and say why [S53]–[S56].
- [ ] I can explain the difference between the **foreign key constraint** teaches → section and the **referential integrity constraint** section → teaches, including why the latter is not a foreign key (n = 4 < m = 5) [S55]–[S58].
- [ ] I can turn the business rule "(1) If a section exists for a course, it must be taught by at least one instructor" into the matching constraint [S57].
- [ ] I can read the [S59] schema diagram: the underlined primary keys, the 12 foreign-key arrows (from → to), why time_slot has none, and the NB.
- [ ] I can list the seven operations in [S63] order and write each one's notation as printed (σ, ∏, "r + s" for natural join, r x s, ∪, –, ∩).
- [ ] I can compute σ, ∏, natural join, Cartesian product, ∪, – and ∩ on small tables like those on [S64]–[S72]. That includes the duplicate disappearing in ∏, and why r x s on [S69] has 2 × 4 = 8 rows.
- [ ] I can state the "similar relations" condition for ∪, – and ∩, and show that r ∩ s = r – (r – s) on the slide's data [S70]–[S72].
- [ ] I can set up the practice environment from the appendix: MySQL, XAMPP or MAMP; phpMyAdmin; db-book.com → Laboratory Material → Sample Tables → DDL for MySQL + small relations; ① New → ② Import [S75]–[S79].

---

### All 🔎 Track B pointers from this file (in one place)
- 🔎 Look up in Track B: the textbook's wording for a referential-integrity constraint whose target attributes are not the whole primary key [S55].
- 🔎 Look up in Track B: why time_slot gets no arrow, and whether prereq has one or two foreign keys to course [S59].
- 🔎 Look up in Track B: how "registered to a course" is represented (compare `takes`) [S62].
- 🔎 Look up in Track B: whether the red/blue colouring of the operations on [S63] means something.
- 🔎 Look up in Track B: the standard natural-join symbol (the slide prints "+") [S68].
- 🔎 Look up in Track B: SQL forms of the seven operations; other notations for "and" in selections; the standard name for "similar" relations [S63]–[S72].

*Coverage: every slide from [S51] to [S81] (31 slides) is covered above.*
