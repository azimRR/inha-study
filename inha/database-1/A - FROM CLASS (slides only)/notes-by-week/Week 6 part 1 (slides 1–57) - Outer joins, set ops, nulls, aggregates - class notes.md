# Week 6, part 1 (slides 1–57) — Outer joins, set operations, additional operations, nulls, aggregates (CLASS NOTES — from slides only)
> Source: W6L1L2 [LAB3].pdf, slides 1–57 of 107. [S#] = the "n / 107" footer number.
>
> - **Track A (class material only).** Everything below comes from slides 1–57. Part 2 (slides 58–107: nested subqueries + LAB #3) is in "Week 6 part 2 (slides 58–107) - Nested subqueries - class notes.md". Week 5 slides are cited as [W5 S#].
> - **Where the content is.** Almost every content slide is a picture, so the extracted PDF text has only the titles. Everything here was read from the slide images at full resolution. No slide is unreadable. A few table cells are hidden behind an arrow, the IUT logo or an inserted row. I read those from the full-size picture or from the same table on another slide, and I say so where it matters.
> - **Verification.** Every query was run in sqlite3 3.54 on the slides' own tables (see §5.0). sqlite has no `intersect all` / `except all`, so I checked those by counting copies, and cross-checked them in a database engine that supports them. When sqlite cannot run a slide's exact syntax, I say so. These checks are **not** class material.
> - **Exam relevance.** Quiz #2 (Fri 23 Oct) is on HW #2 = weeks 2–5, so this file is mainly **midterm** material (week 8, weeks 1–7). The "natural join problem" [S9–S10] builds directly on Week 5.
> - **Notation.** The slides print keywords in bold and use curly quotes (‘Fall’). The code blocks here use straight quotes ('Fall') so they can be run. `[ ]` on the slides marks an optional part [S18].

---

## 1. Big picture

- **Joins, continued.** A join is "a Cartesian product A x B which requires that tuples in the relations A and B match under some condition" [S7]. The natural join loses tuples that have no partner: student Snow has no `takes` tuple, so he disappears [S9–S10]. **Outer joins** are "an extension of (Inner, Cross) Join (=Cartesian Product) that avoids loss of data (mismatch)" [S8]. They keep the unmatched tuples and fill the missing attributes with *null*:
  - **left** outer join keeps every tuple of the left relation [S11];
  - **right** outer join keeps every tuple of the right relation [S12];
  - **full** outer join keeps both [S13].

  Every join = a **join type** + a **join condition** [S14].
- **Set operations.** `union`, `intersect` and `except` (also called `minus`) are SQL's ∪, ∩ and − [S17]. The class example uses r1 = courses taught in Fall 2009 and r2 = courses taught in Spring 2010 [S18–S19].
  - "either … or" → `union` [S20]. An `or` inside one `where` also works [S21].
  - "and" → `intersect`: "to express the "and" we need a set operation!" [S21–S22].
  - "but not in" → `except` [S23].
  - Adding `all` is used "to retain all duplicates" [S20, S22, S23].
- **"Additional" basic operations.** "Additional" = "Out of the scope of Data Model" [S25]. They are:
  - arithmetic in `select`, and renaming a column with `as` [S26];
  - renaming relations (`instructor as I`), also to compare a relation with itself (`instructor as T, instructor as S`) [S27–S29];
  - `*` for all attributes [S30];
  - `order by … asc/desc` [S31–S32];
  - `like` with `%`, `_` and `escape` [S33];
  - `between` [S34];
  - tuple comparison in `where` [S35].
- **Null values.** *null* "means unknown value or a value does not exist". Arithmetic with null gives null. You test for it with `is null` [S37]. Any comparison with null gives *unknown*, so SQL uses three-valued logic (true, false, unknown). A tuple enters the result only when the `where` predicate is **true** [S38].
- **Aggregate functions.** `avg`, `min`, `max`, `sum` and `count` take a collection (a set or a multi-set) of values and return a single value [S41].
  - `as` names the result column [S42], but "Don't use renaming for no precise purpose" [S43].
  - `count (distinct ID)` "eliminates duplicates before aggregating" [S44].
  - `count (*)` counts all tuples [S45–S46].
- **group by / having.**
  - `group by` splits the tuples into groups and gives one result row per group [S47–S48].
  - Adding `ID` to the `select` of that query makes it an "Erroneous Query" [S49].
  - Without `group by`, the whole relation is one group [S50].
  - Exercise: count the instructors per department who teach in Spring 2010 [S51–S53].
  - `having` states a condition on **groups** of tuples; `where` states it on single tuples [S54–S55].
  - `where` and `having` can appear in the same query [S56–S57].

---

## 2. Slide-by-slide notes

### [S1] Title slide
- "Database (SOC-3020)". Alessandro Agostini (affiliations 1 and 2), aagostini@inha.ac.kr, agostini@disi.unitn.it.
- Affiliations: 1 = LDKR-Group, School of Computer and Information Engineering, Inha University in Tashkent (IUT), Uzbekistan; 2 = DISI, University of Trento, Italy.
- "WEEK 6". Pictures: the IUT building, the LDKR logo and the IUT seal.

### [S2] Lecture title
- "DATABASE — SQL: Intermediate — WEEK 6 — Code: W6.L1L2[LAB#3]". There is a panorama photo of a city square.
- The code names this week's material. "LAB#3" matches outline item 7, "LAB #3 : Practice on SQL with MySQL" [S3].

### [S3] Outline (full list)
- 1 From Previous Week · 2 Join Expressions · 3 Set Operations · 4 Additional Basic Operations · 5 Aggregate Functions · 6 Nested Subqueries · 7 LAB #3 : Practice on SQL with MySQL.
- Items 1–5 are in this file. Items 6–7 are in part 2.

### [S4] "Any question from you? …"
- This one slide is the whole "From Previous Week" part. There is no recap slide, only a call for questions. A small recap of the `select` clause comes later as "*Remember*" [S26].

### [S5] Outline
Outline with **2 Join Expressions** highlighted.

### [S6] Section title: Join Expressions (*cont.*)
- "Join Expressions (*cont.*)", "Ch 4, T; section 4.1.", and the cover of the textbook *Database System Concepts* (T = this textbook).
- ⭐ "(*cont.*)": this continues Week 5, which ended its join part with "Join Expressions" and "We'll see more on Join Expressions." [W5 S91–S92].

### [S7] Join Expressions
- "**Join operations** (in form of join expressions) take two relations and return as a result another relation."
- ⭐ Blue box: "**Def**: A **join** operation is a Cartesian product A x B which requires that tuples in the relations A and B match *under some condition*." ("join" is in red; "under some condition" is in red italics.)
  - "A join operation always specify the attributes that are present in the result of the join."
- "The join operations are typically used as subquery expressions in the **from** clause."
- ⚠️ Grammar slip: "always specify" → "always specifies". The meaning does not change.
- **Verified** on the S9 tables: the Cartesian product student × takes has 13 × 22 = **286** tuples. The natural join keeps only the **22** pairs that match on ID.

### [S8] Outer Joins
- ⭐ Blue box: "**Def**. An extension of (*Inner, Cross*) Join (=Cartesian Product) that avoids loss of data (mismatch) when creating new information (by joining)." ("avoids loss of data" is in red.)
- In plain words: an inner or cross join drops a tuple that finds no partner (a "mismatch"). An outer join keeps it. Slides S9–S13 show this on an example.

### [S9] Natural Join: Problem
- "Consider the SQL query:"

```sql
select *
from student natural join takes;
```

- The slide shows both tables. They are used again in S11–S13 and S56–S57, so here they are in full.

**student** (13 tuples):

| ID | name | dept_name | tot_cred |
|---|---|---|---|
| 00128 | Zhang | Comp. Sci. | 102 |
| 12345 | Shankar | Comp. Sci. | 32 |
| 19991 | Brandt | History | 80 |
| 23121 | Chavez | Finance | 110 |
| 44553 | Peltier | Physics | 56 |
| 45678 | Levy | Physics | 46 |
| 54321 | Williams | Comp. Sci. | 54 |
| 55739 | Sanchez | Music | 38 |
| **70557** | **Snow** | Physics | 0 |
| 76543 | Brown | Comp. Sci. | 58 |
| 76653 | Aoi | Elec. Eng. | 60 |
| 98765 | Bourikas | Elec. Eng. | 98 |
| 98988 | Tanaka | Biology | 120 |

**takes** (22 tuples):

| ID | course_id | sec_id | semester | year | grade |
|---|---|---|---|---|---|
| 00128 | CS-101 | 1 | Fall | 2009 | A |
| 00128 | CS-347 | 1 | Fall | 2009 | A- |
| 12345 | CS-101 | 1 | Fall | 2009 | C |
| 12345 | CS-190 | 2 | Spring | 2009 | A |
| 12345 | CS-315 | 1 | Spring | 2010 | A |
| 12345 | CS-347 | 1 | Fall | 2009 | A |
| 19991 | HIS-351 | 1 | Spring | 2010 | B |
| 23121 | FIN-201 | 1 | Spring | 2010 | C+ |
| 44553 | PHY-101 | 1 | Fall | 2009 | B- |
| 45678 | CS-101 | 1 | Fall | 2009 | F |
| 45678 | CS-101 | 1 | Spring | 2010 | B+ |
| 45678 | CS-319 | 1 | Spring | 2010 | B |
| 54321 | CS-101 | 1 | Fall | 2009 | A- |
| 54321 | CS-190 | 2 | Spring | 2009 | B+ |
| 55739 | MU-199 | 1 | Spring | 2010 | A- |
| 76543 | CS-101 | 1 | Fall | 2009 | A |
| 76543 | CS-319 | 2 | Spring | 2010 | A |
| 76653 | EE-181 | 1 | Spring | 2009 | C |
| 98765 | CS-101 | 1 | Fall | 2009 | C- |
| 98765 | CS-315 | 1 | Spring | 2010 | B |
| 98988 | BIO-101 | 1 | Summer | 2009 | A |
| 98988 | BIO-301 | 1 | Summer | 2010 | *null* |

- ⭐ The picture: an **orange box** around "70557 Snow" and a **red arrow** from Snow to the `takes` table with a big red **"?"**. No `takes` tuple has ID 70557, so the natural join has no tuple for Snow. His data is lost.
- Note: the last `takes` tuple has grade *null*. This is the null value of [S37].
- **Verified:** the natural join returns **22** tuples and **none** of them is for Snow.

### [S10] Natural Join: Problem (same picture, new question)
- Same tables, orange box, arrow and "?". The text is now the question: "Find all data of all students with the courses they have taken". The second "all" is underlined.
- ⭐ The underlined "**all** students" is the point: the natural join of S9 cannot answer this question, because Snow would be missing. The answer is on S11.

### [S11] Inner vs Outer Joins (left outer join)
- Schema boxes: **student**(<u>ID</u>, name, dept_name, tot_cred) and **takes**(<u>ID, course_id, sec_id, semester, year</u>, grade).
- Question: "Find all data of **all students** with the courses they have taken": ("all students" in red, "all" underlined)

```sql
select *
from student natural
left outer join takes;
```

- ⭐ "Note: the **natural join** we studied before is called **natural *inner* join**" ("inner" is in purple).
- The slide's result table has orange arrows over the columns: "student" over ID, name, dept_name, tot_cred and "takes" over course_id … grade. The ID column (yellow box) appears **once**.
- ⭐ Snow's row has an orange box around the student part and a **red box** around five *null*s. Result (= verified sqlite output, 23 tuples):

| ID | name | dept_name | tot_cred | course_id | sec_id | semester | year | grade |
|---|---|---|---|---|---|---|---|---|
| 00128 | Zhang | Comp. Sci. | 102 | CS-101 | 1 | Fall | 2009 | A |
| 00128 | Zhang | Comp. Sci. | 102 | CS-347 | 1 | Fall | 2009 | A- |
| 12345 | Shankar | Comp. Sci. | 32 | CS-101 | 1 | Fall | 2009 | C |
| 12345 | Shankar | Comp. Sci. | 32 | CS-190 | 2 | Spring | 2009 | A |
| 12345 | Shankar | Comp. Sci. | 32 | CS-315 | 1 | Spring | 2010 | A |
| 12345 | Shankar | Comp. Sci. | 32 | CS-347 | 1 | Fall | 2009 | A |
| 19991 | Brandt | History | 80 | HIS-351 | 1 | Spring | 2010 | B |
| 23121 | Chavez | Finance | 110 | FIN-201 | 1 | Spring | 2010 | C+ |
| 44553 | Peltier | Physics | 56 | PHY-101 | 1 | Fall | 2009 | B- |
| 45678 | Levy | Physics | 46 | CS-101 | 1 | Fall | 2009 | F |
| 45678 | Levy | Physics | 46 | CS-101 | 1 | Spring | 2010 | B+ |
| 45678 | Levy | Physics | 46 | CS-319 | 1 | Spring | 2010 | B |
| 54321 | Williams | Comp. Sci. | 54 | CS-101 | 1 | Fall | 2009 | A- |
| 54321 | Williams | Comp. Sci. | 54 | CS-190 | 2 | Spring | 2009 | B+ |
| 55739 | Sanchez | Music | 38 | MU-199 | 1 | Spring | 2010 | A- |
| **70557** | **Snow** | **Physics** | **0** | ***null*** | ***null*** | ***null*** | ***null*** | ***null*** |
| 76543 | Brown | Comp. Sci. | 58 | CS-101 | 1 | Fall | 2009 | A |
| 76543 | Brown | Comp. Sci. | 58 | CS-319 | 2 | Spring | 2010 | A |
| 76653 | Aoi | Elec. Eng. | 60 | EE-181 | 1 | Spring | 2009 | C |
| 98765 | Bourikas | Elec. Eng. | 98 | CS-101 | 1 | Fall | 2009 | C- |
| 98765 | Bourikas | Elec. Eng. | 98 | CS-315 | 1 | Spring | 2010 | B |
| 98988 | Tanaka | Biology | 120 | BIO-101 | 1 | Summer | 2009 | A |
| 98988 | Tanaka | Biology | 120 | BIO-301 | 1 | Summer | 2010 | *null* |

- On the slide, Snow's row is drawn on top of the table, so the Sanchez row and the first Brown row are half hidden. Their values are the S9 values.
- **"Left"** = the relation written on the left of the join (`student`). Every student is kept. Snow, who has no partner, gets *null* in all `takes` attributes.
- **Verified:** sqlite returns exactly this table, **23** tuples (the 22 of S9 + Snow).

### [S12] Inner vs Outer Joins (right outer join)
- Same schema boxes. Question: "Find data of **all courses** and of the students who have taken them": ("all courses" in red, "all" underlined)

```sql
select *
from student natural
right outer join takes;
```

- "Note: **right outer join** symmetric to **left outer join**"
- ⭐ "NB: **right outer join** in this example is conceptually wrong!" ("this example" is underlined.)
- The result picture is the S11 table, but Snow's row is replaced by this row (red box around the four student nulls, orange box around the `takes` part):

| ID | name | dept_name | tot_cred | course_id | sec_id | semester | year | grade |
|---|---|---|---|---|---|---|---|---|
| *null* | *null* | *null* | *null* | CS-190 | 2 | Spring | 2009 | A |

- "Right" = the relation on the right of the join (`takes`). Every `takes` tuple is kept. A `takes` tuple with no matching student would get *null* in the student attributes.
- **Verified** on the S9 tables: the natural right outer join returns **22** tuples, exactly the same as the natural (inner) join. Every ID in `takes` also appears in `student`, so **no** null-padded row appears, and Snow is lost again.
- ⚠️ The drawn null row does **not** come from the S9 data. There, "CS-190, 2, Spring, 2009, A" is taken by 12345 Shankar. The row only illustrates what a right outer join adds. Also, the drawing puts *null* even in ID. In the S13 run below, an unmatched `takes` tuple kept its **own** ID (76653) in the single ID column.
- The slide does not say why the right outer join is "conceptually wrong" here. What the data shows: no `takes` tuple is ever without its student, so this join adds nothing, and it can lose students like Snow.
- 🔎 Look up in Track B: why a `takes` tuple always has a matching `student` (foreign key `takes.ID` → `student.ID`).

### [S13] Full Outer Join
- Schema boxes: **student**(<u>ID</u>, name, dept_name, tot_cred) and **takes**(<u>ID</u>, <u>course_id</u>, <u>sec_id</u>, <u>semester</u>, <u>year</u>, grade).
- ⭐ In `takes`, course_id, sec_id, semester and year are in a red box with a red brace: "note: PK for course section".
- Question: "Find all data of all students in CS department with the courses they have taken, if any, and all course sections they have taken in Spring 2009". ("all" is underlined; ⭐ "if any" is red and underlined.)

```sql
select *
from (select *
      from student
      where dept_name = 'Comp. Sci')
      natural full outer join
     (select *
      from takes
      where semester = 'Spring' and year = 2009);
```

- `natural full outer join` is printed in red. The slide has **no** result table.
- Both sides of the join are subqueries in `from`. This is the "join … as subquery expressions in the **from** clause" of S7 and S14.
- ⚠️ **Typo:** `'Comp. Sci'` has no final period, but the data value is `'Comp. Sci.'` [S9]. As printed, the first subquery finds **no** student.
- **Verified, query as printed** (3 tuples; the student part is all *null*):

| ID | name | dept_name | tot_cred | course_id | sec_id | semester | year | grade |
|---|---|---|---|---|---|---|---|---|
| 12345 | *null* | *null* | *null* | CS-190 | 2 | Spring | 2009 | A |
| 54321 | *null* | *null* | *null* | CS-190 | 2 | Spring | 2009 | B+ |
| 76653 | *null* | *null* | *null* | EE-181 | 1 | Spring | 2009 | C |

- **Verified, corrected to `'Comp. Sci.'`** (5 tuples):

| ID | name | dept_name | tot_cred | course_id | sec_id | semester | year | grade |
|---|---|---|---|---|---|---|---|---|
| 00128 | Zhang | Comp. Sci. | 102 | *null* | *null* | *null* | *null* | *null* |
| 12345 | Shankar | Comp. Sci. | 32 | CS-190 | 2 | Spring | 2009 | A |
| 54321 | Williams | Comp. Sci. | 54 | CS-190 | 2 | Spring | 2009 | B+ |
| 76543 | Brown | Comp. Sci. | 58 | *null* | *null* | *null* | *null* | *null* |
| 76653 | *null* | *null* | *null* | EE-181 | 1 | Spring | 2009 | C |

- The result has three kinds of rows:
  - **Matched rows:** Shankar and Williams are CS students with a Spring 2009 section.
  - **Left-only rows:** Zhang and Brown are CS students with no Spring 2009 course. They are kept with *null*s, which is the "if any" of the question.
  - **Right-only row:** 76653 is a Spring 2009 `takes` tuple of a student who is not in Comp. Sci. (Aoi, Elec. Eng. [S9]). It is kept with *null* student attributes, but its own ID stays.
- 🔎 Look up in Track B: does MySQL (the lab DBMS) support `full outer join`, and if not, how do you get the same result?

### [S14] Joined Relations: Summary
- "**Join operations** take two relations and return as a result another relation."
- "These additional operations are typically used as subquery expressions in the **from** clause"
- "**Join condition** – defines which tuples in the two relations match, and what attributes are present in the result of the join."
- "**Join type** – defines how tuples in each relation that do not match any tuple in the other relation (based on the join condition) are treated."
- Two tables:

| Join types | Join Conditions |
|---|---|
| (inner)join | natural |
| left outer join | on < predicate > |
| right outer join | using (A1, A1, …, An) |
| full outer join | |

- ⭐ A blue label "**Cartesian Product**" with a red arrow points to "(inner)join". This matches the S7 definition: a join is a Cartesian product plus a matching condition.
- ⚠️ **Typo:** `using (A1, A1, …, An)` repeats A1. Read it as `using (A1, A2, …, An)`.
- The slides combine one entry from each table: natural + left outer join [S11], natural + right outer join [S12], natural + full outer join [S13].
- Class examples of the other two conditions are in Week 5: `using` [W5 S85] and `on` [W5 S88–S90]. Part 2 has `join … using` [S73].

### [S15] Outline
Outline with **3 Set Operations** highlighted.

### [S16] Section title: *Set* Operations in SQL
- "*Set* Operations in SQL" ("Set" in red italics), "Ch 3, T; section 3.5", textbook cover.

### [S17] Set Operations — Introduction
- "The SQL operations **union**, **intersect** and **except** (also called **minus**) operate on relations (sets);"
  - "correspond to the mathematical (set-theoretical) operations ∪, ∩, and − (or / set difference)."
- "We shall now construct queries involving the **union**, **intersect**, and **except** operations over two relations (sets) *r1* and *r2* defined as in the next slide."
- ⭐ The three keywords are in bold blue; "minus" is in bold.
- So: union ↔ ∪, intersect ↔ ∩, except (minus) ↔ −, set difference.
- 🔎 Look up in Track B: which MySQL versions support `intersect` / `except` (and their `all` forms).

### [S18] Set Operations (*cont.*): r1
- "*r1*: the relation resulting from the SQL query:"

```sql
select course_id
from section
where semester = 'Fall' [and year = '2009'];
```

- ⭐ The brackets `[ ]` are red. A red arrow goes from them to "**optional (in this case)**".
- **section** table on the slide (15 tuples):

| course_id | sec_id | semester | year | building | room_number | time_slot_id |
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

- **r1** on the slide = CS-101, CS-347, PHY-101.
- **Why optional "in this case":** every Fall tuple in this table is from 2009, so the year condition removes nothing. **Verified:** with or without `and year = '2009'`, r1 = CS-101, CS-347, PHY-101. "In this case" = for this data only.
- Here the year is written in quotes (`'2009'`). Elsewhere it has no quotes (`year = 2009` [S13, S57]). Both forms returned the same rows in sqlite.

### [S19] Set Operations (*cont.*): r2
- "*r2*: the relation resulting from the SQL query:"

```sql
select course_id
from section
where semester = 'Spring' and year = '2010';
```

- Same section table. **r2** on the slide = CS-101, CS-315, CS-319, CS-319, FIN-201, HIS-351, MU-199 (7 rows).
- CS-319 appears **twice** because the table has two Spring 2010 sections of CS-319 (sec_id 1 and 2). So r2 already contains a duplicate. This matters for `all` on S20.
- **Verified:** sqlite returns the same 7 rows.

### [S20] Set Operations: "union"
- Question: "Find all course id's of courses taught either in Fall 2009 or Spring 2010 (or both)" ("either" and "or" are red and underlined.)

```sql
(select course_id
from section
where semester = 'Fall' and year = '2009')
union [all]
(select course_id
from section
where semester = 'Spring' and year = '2010');
```

- ⭐ "[all]" is red. A red arrow from the label "**to retain all duplicates**" points to it.
- Pictures on the slide:
  - r1 = CS-101 (red box), CS-347, PHY-101;
  - r2 = CS-101 (red box), CS-315, CS-319, CS-319, FIN-201, HIS-351, MU-199;
  - r1 ∪ r2 = CS-101 (red box), CS-315, CS-319, CS-347, FIN-201, HIS-351, MU-199, PHY-101, and below the table one extra **CS-101** (red box, in a different font). The extra CS-101 shows what `all` keeps.
- **Verified `union`** (duplicates removed, 8 rows): CS-101, CS-315, CS-319, CS-347, FIN-201, HIS-351, MU-199, PHY-101.
- **Verified `union all`** (10 rows): CS-101, CS-347, PHY-101, CS-101, CS-315, CS-319, CS-319, FIN-201, HIS-351, MU-199.
- ⚠️ The picture adds only the second CS-101. But r2 already has CS-319 twice [S19], so `union all` keeps **both** CS-319 too: 3 + 7 = **10** rows, not 9.
- sqlite does not accept the parentheses around each `select`, so I removed them to run it. 🔎 Look up in Track B: check that the parenthesized form runs in your MySQL lab.

### [S21] *Remark*: Equivalent (easier) query
- Question: "Find all course id's of courses taught either in Fall 2009 or Spring 2010 (or both)" ("either" and "or" are red and underlined.)

```sql
select course_id
from section
where (semester = 'Fall' and year = '2009') or
      (semester = 'Spring' and year = '2010');
```

- ⭐ "Note: to express the "and" we <u>need</u> a set operation!"
- "( *see the next slide* )"
- **Verified:** the `or` query returns **10** rows, one per matching section tuple: CS-101, CS-101, CS-315, CS-319, CS-319, CS-347, FIN-201, HIS-351, MU-199, PHY-101.
- ⚠️ "Equivalent" is true for the course ids, but not for the number of rows. This query keeps the duplicates (CS-101 twice, CS-319 twice), so its rows are those of `union all` [S20]. `union` gives 8 rows. With `select distinct course_id` (`distinct`: [S29], [S31]) you get exactly the 8 rows of `union` (verified).
- **Why "and" needs a set operation.** The condition `(semester = 'Fall' and year = '2009') and (semester = 'Spring' and year = '2010')` asks **one** section tuple to be in Fall and in Spring at the same time. **Verified:** 0 rows. The "and" of the question is about the same course appearing in **two different** tuples. That is `intersect` [S22].

### [S22] Set Operations: "intersect"
- Question: "Find all course id's of courses taught in Fall 2009 and Spring 2010" ("and" is red and underlined.)

```sql
(select course_id
from section
where semester = 'Fall' and year = '2009')
intersect [all]
(select course_id
from section
where semester = 'Spring' and year = '2010');
```

- ⭐ Again "**to retain all duplicates**" → "[all]" (red).
- Pictures on the slide:
  - r1 = CS-101 (red box), CS-347, PHY-101, plus an **extra CS-101** (red box, different font);
  - r2 = CS-101 (red box), CS-315, CS-319, CS-319, FIN-201, HIS-351, MU-199, plus an **extra CS-101** (red box);
  - r1 ∩ r2 = CS-101 (red box), plus an **extra CS-101** (red box).
- ⚠️ The extra CS-101 under r1 and r2 is **not** in the section table [S18–S19]. The professor added it to show what `all` does, so don't look for it in the data.
- **Verified on the real data:** `intersect` → CS-101 (1 row). `intersect all` → CS-101 (1 row), because CS-101 is once in r1 and once in r2.
- **Verified on the picture's data** (CS-101 twice in r1 and twice in r2): `intersect all` → CS-101, CS-101, which is exactly the slide's r1 ∩ r2. Without `all` → CS-101 once.
- 🔎 Look up in Track B: the general rule for how many copies `intersect all` and `except all` keep. The slides show only these two cases.

### [S23] Set Operations: "except" ("minus")
- Question: "Find all course id's of courses taught in Fall 2009 but not in Spring 2010" ("but not in" is red and underlined.)

```sql
(select course_id
from section
where semester = 'Fall' and year = '2009')
except [all]
(select course_id
from section
where semester = 'Spring' and year = '2010');
```

- ⭐ "**to retain all duplicates**" → "[all]" (red).
- Pictures on the slide:
  - r1 = CS-101 (red box), CS-347, PHY-101, plus an **extra CS-101** (red box);
  - r2 = CS-101 (red box), CS-315, CS-319, CS-319, FIN-201, HIS-351, MU-199, with **no** extra this time;
  - r1 − r2 = CS-347, PHY-101, plus **CS-101** (red box).
- **Reading the picture.** r1 has CS-101 twice and r2 has it once. The CS-101 of r2 cancels one copy in r1. With `all`, the second copy survives, so CS-101 appears once in r1 − r2. Without `all`, CS-101 disappears completely, because it occurs in r2.
- **Verified on the picture's data:** `except` → CS-347, PHY-101. `except all` → CS-347, PHY-101, CS-101 (= the slide).
- **Verified on the real data:** `except` → CS-347, PHY-101. `except all` → CS-347, PHY-101 (CS-101 is once in each relation).
- The `intersect all` / `except all` results were also run natively in a database engine that has them, with the same results.

### [S24] Outline
Outline with **4 Additional Basic Operations** highlighted.

### [S25] Section title: *Additional* \* Basic Operations
- "*Additional* \* Basic Operations", "Ch 3, T; section 3.4", textbook cover.
- ⭐ Footnote with a red asterisk: "\* "Additional" = Out of the scope of Data Model".
- So the operations of S26–S35 belong to the SQL language, not to the data model itself. 🔎 Look up in Track B: what exactly "out of the scope of the data model" covers.

### [S26] *Remember*: "select" clause + expressions
- "The **select** clause can contain arithmetic expressions involving the operation, +, –, ∗, and /, and operating on constants or attributes of tuples."
  - "**Example**:"

```sql
select ID, name, dept_name, salary / 12
from instructor;
```

  "would return a relation that is the same as the *instructor*, except that the value of *salary* is divided by 12, so resulting in the monthly salary (assuming *salary* is annual)."
- ⭐ Blue box: "We can rename "*salary / 12*" using the **as** clause:" ("as" is red.)

```sql
select ID, name, dept_name salary / 12 as monthly_salary;
```

- Schema box: **instructor**(<u>ID</u>, name, dept_name, salary).
- ⚠️ **Typo:** the blue-box query has no comma after `dept_name` and no `from` clause. **Verified:** sqlite stops with a syntax error near "/", with or without `from`. Corrected:

```sql
select ID, name, dept_name, salary / 12 as monthly_salary
from instructor;
```

- **Verified output of the corrected query.** This is a sqlite rewrite with salary turned into a real number, so that `/` is not integer division; it is only for checking.

| ID | name | dept_name | monthly_salary |
|---|---|---|---|
| 10101 | Srinivasan | Comp. Sci. | 5416.666666666667 |
| 12121 | Wu | Finance | 7500.0 |
| 15151 | Mozart | Music | 3333.3333333333335 |
| 22222 | Einstein | Physics | 7916.666666666667 |
| 32343 | El Said | History | 5000.0 |
| 33456 | Gold | Physics | 7250.0 |
| 45565 | Katz | Comp. Sci. | 6250.0 |
| 58583 | Califieri | History | 5166.666666666667 |
| 76543 | Singh | Finance | 6666.666666666667 |
| 76766 | Crick | Biology | 6000.0 |
| 83821 | Brandt | Comp. Sci. | 7666.666666666667 |
| 98345 | Kim | Elec. Eng. | 6666.666666666667 |

- Without `as`, sqlite names the column `salary / 12`. With `as`, it is `monthly_salary` (verified).
- With integer salaries, sqlite printed whole numbers instead (5416, 7500, 3333, …). 🔎 Look up in Track B: what MySQL's `/` returns for integer columns.

### [S27] Renaming — The "as" Clause
- Schema boxes: **instructor**(<u>ID</u>, name, dept_name, salary) and **teaches**(<u>ID, course_id, sec_id, semester, year</u>).
- Question: "Find instructors' name and course id of courses they taught for all instructors in the Biology department who have taught some course"

```sql
select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID and dept_name = 'Biology';
```

- ⭐ "Renaming (the "**as**" clause, ref. sec. 3.4.1):" (blue box; "ref. sec. 3.4.1" is a textbook reference)

```sql
select name, course_id
from instructor as I, teaches as T
where I.ID = T.ID and dept_name = 'Biology';
```

- "as I" and "as T" are red; I and T are blue.
- `as` gives a relation a new, short name. Then `I.ID` and `T.ID` replace `instructor.ID` and `teaches.ID`.
- **Verified:** both queries return the same 2 rows: (Crick, BIO-101) and (Crick, BIO-301). Crick (76766) is the only Biology instructor, and he teaches BIO-101 and BIO-301 [S44].

### [S28] More on Renaming (question only)
- Question: "Find the salaries of all instructors that are less than the largest salary of any (some) instructor in the Biology department"
- ⭐ "In the query we compare tuples in the <u>same relation</u> (*instructor*)"
- Schema box: instructor. There is no query yet; S29 gives it.

### [S29] More on Renaming (query)
- Same text, plus:

```sql
select distinct T.salary
from instructor as T, instructor as S
where T.salary < S.salary and S.dept_name = 'Biology';
```

- **How it works:**
  - `T` and `S` are two names for the **same** relation `instructor`, so `from` pairs every instructor T with every instructor S.
  - `where` keeps the pairs in which S is in Biology and T earns less than S.
  - `distinct` removes repeated salaries.
- **Verified:** Biology has only Crick (72000), so the result is every salary below 72000: **65000, 40000, 60000, 62000** (4 rows, in sqlite's order).
- Cross-reference: part 2 answers the same question with `> some` [S80–S82].

### [S30] Attribute Specification - The "\*" Operation
- Question: "Find the Cartesian product *instructor* x *teaches*"

```sql
select *
from instructor, teaches;
```

- The `*` is red. It means all the attributes of the relations in `from`.
- **Verified:** 12 × 15 = **180** tuples, with 9 columns: ID, name, dept_name, salary, ID, course_id, sec_id, semester, year. ID appears twice, once from each relation.

### [S31] Ordering the Display of Tuples
- "List in alphabetic order the names of all instructors:"

```sql
select distinct name
from instructor
order by name;
```

- "We may specify **desc** for <u>descending</u> order or **asc** for <u>ascending</u> order (default), for each attribute."
- "**Example**: **order by** *name* **desc**"
- "Can sort on multiple attributes"
  - "**Example**: **order by** *dept_name, name*"
- **Verified, `order by name`:** Brandt, Califieri, Crick, Einstein, El Said, Gold, Katz, Kim, Mozart, Singh, Srinivasan, Wu.
- With `order by name desc` the list starts Wu, Srinivasan, Singh, …
- With `order by dept_name, name`, tuples are sorted by department first, then by name inside each department. For example, Comp. Sci. gives Brandt, Katz, Srinivasan and Finance gives Singh, Wu.

### [S32] Another Example
- ⭐ "List the **entire *instructor* relation** in descending order of *salary*. If some instructors have the same salary, list them in ascending order by name". ("entire instructor relation" is red.)

```sql
select *
from instructor
order by salary desc, name asc;
```

- The `*` is red. **Verified output:**

| ID | name | dept_name | salary |
|---|---|---|---|
| 22222 | Einstein | Physics | 95000 |
| 83821 | Brandt | Comp. Sci. | 92000 |
| 12121 | Wu | Finance | 90000 |
| 33456 | Gold | Physics | 87000 |
| 98345 | **Kim** | Elec. Eng. | **80000** |
| 76543 | **Singh** | Finance | **80000** |
| 45565 | Katz | Comp. Sci. | 75000 |
| 76766 | Crick | Biology | 72000 |
| 10101 | Srinivasan | Comp. Sci. | 65000 |
| 58583 | Califieri | History | 62000 |
| 32343 | El Said | History | 60000 |
| 15151 | Mozart | Music | 40000 |

- Kim and Singh both earn 80000, so `name asc` puts Kim before Singh. The second key only matters for ties.

### [S33] String Operations - The "like" Clause
- "SQL includes a string-matching operator for comparisons on character strings. The operator **like** uses patterns that are described using two special characters:"
  - "percent ( % ). The % character matches any substring."
  - "underscore ( _ ). The _ character matches any character."
- "**Example**: "Find the names of all instructors whose name includes the substring 'dar'"."

```sql
select name
from instructor
where name like "%dar%'
```

- "Match the string "100%""

```sql
like '100 \%'  escape  '\'
```

- "in that above we use backslash (\\) as the escape character."
- ⚠️ **Typo 1:** the pattern opens with a double quote and closes with a single quote (`"%dar%'`). Write `'%dar%'`. **Verified:** as printed, sqlite stops with "unrecognized token".
- ⚠️ **Typo 2:** `'100 \%'` contains a space, so it matches "100 %" (with a space), not "100%". Write `like '100\%' escape '\'`. **Verified** (1 = match, 0 = no match):
  - `'100%' like '100 \%' escape '\'` → 0;
  - `'100 %' like '100 \%' escape '\'` → 1;
  - `'100%' like '100\%' escape '\'` → 1.
- ⚠️ Cosmetic: in the first query one letter of "select" is not bold. It does not matter.
- **Why `escape`:** by this slide's own rule, `%` "matches any substring". A backslash in front of `%` makes it an ordinary percent sign.
- **Verified:** on the class instructor table [S42], no name contains "dar", so the example returns no rows. The pattern only shows the syntax.
- 🔎 Look up in Track B: how MySQL treats a backslash inside a string literal (does `escape '\'` work as written?).

### [S34] The "between" Clause
- "SQL includes a **between** comparison operator"
- Question: "Find the names of all instructors with salary between $90,000 and $100,000"

```sql
select name
from instructor
where salary between 90000 and 100000;
```

- **Verified:** Wu (90000), Einstein (95000), Brandt (92000). Wu earns exactly 90000 and is in the result, so in this run the end values were included.

### [S35] "where" Clause: Comparison on Tuples
- Same question as S27: "Find instructors' name and course id of courses they taught for all instructors in the Biology department who have taught some course"

```sql
select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID and dept_name = 'Biology';
```

- ⭐ "Rewriting the above query by <u>tuple comparison operator</u>:"

```sql
select name, course_id
from instructor, teaches
where (instructor.ID, dept_name) = (teaches.ID, 'Biology');
```

- The `where` condition is printed in red.
- Because this is a rewriting of the first query, the pair (instructor.ID, dept_name) is compared with the pair (teaches.ID, 'Biology') **position by position**: instructor.ID = teaches.ID **and** dept_name = 'Biology'.
- **Verified:** the same 2 rows as S27: (Crick, BIO-101) and (Crick, BIO-301).
- Cross-reference: part 2 uses tuples with `in` [S74].

### [S36] Section title: Null Values
- "Null Values", "Ch 3, T; section 3.6", textbook cover.
- Null values have no outline item of their own. The header bar of S37–S38 says "Additional Basic Operations", so they belong to outline item 4.

### [S37] Null Values
- "It is possible for tuples to have a null value, denoted by *null*, for some of their attributes"
- ⭐ "*null* means <u>unknown</u> value or a value <u>does not exist</u>." (Both underlined parts are red.)
- "Result of arithmetic expressions involving *null* is *null*"
  - "**Example**: "5 + *null*" returns *null*."
- "Predicate **is null** can be used to check unknown data."
  - "Find all instructors whose salary is unknown"

```sql
select name
from instructor
where salary is null
```

- **Verified:** `select 5 + null` → null. The query returns **0** rows on the class instructor table, because no salary there is null.
- The class data does contain one null: the grade of 98988, BIO-301 in `takes` [S9].

### [S38] Null Values and Three Valued Logic
- "Three values : *true*, *false*, *unknown*" (blue)
- "Any comparison with *null* returns *unknown*"
  - "**Example**: *5 < null or null <> null or null = null*"
- "Three-valued logic using the value *unknown*:"

| | expression (as on the slide) | value |
|---|---|---|
| comparison | 5 < null | unknown |
| comparison | null <> null | unknown |
| comparison | null = null | unknown |
| OR | (unknown **or** true) | true |
| OR | (unknown **or** false) | unknown |
| OR | (unknown **or** unknown) | unknown |
| AND | (true **and** unknown) | unknown |
| AND | (false **and** unknown) | false |
| AND | (unknown **and** unknown) | unknown |
| NOT | (**not** unknown) | unknown |

- ⭐ Yellow box: "If predicate *P* evaluates to either *false* or *unknown* in **where** clause for tuple t, then t is not added to the result"
- **Verified** in sqlite, where 1 = true, 0 = false and NULL = unknown: every line of the table comes out as above.
- Note that even `null = null` is *unknown*, not true. That is why S37 tests with `is null`.

### [S39] Outline
Outline with **5 Aggregate Functions** highlighted.

### [S40] Section title: Aggregate Functions
- "Aggregate Functions", "Ch 3, T; section 3.7", textbook cover.

### [S41] Aggregate Functions
- ⭐ "**Def**: Aggregate functions are functions that operate on a collection (a set or a multi-set) of values of an attribute of a relation, and return a single value."
- ⭐ "In SQL standard (cf. textbook), these functions are:" (blue box)

| function | meaning |
|---|---|
| **avg()** | average value |
| **min()** | minimum value |
| **max()** | maximum value |
| **sum()** | sum of values |
| **count()** | number of values |

- In S42–S57 only `avg` and `count` are used in examples.

### [S42] Aggregate Functions (*cont.*): avg
- Question: "Find the <u>average salary</u> of instructors in the Computer Science department"

```sql
select avg (salary) as avg_salary
from instructor
where dept_name= 'Comp. Sci.';
```

- ⭐ A yellow arrow points to `avg_salary` (red) with the note: "gives name "*avg_salary*" to the resulting relation's attribute".
- The **instructor** table on the slide (12 tuples, ordered by department):

| ID | name | dept_name | salary |
|---|---|---|---|
| 76766 | Crick | Biology | 72000 |
| 45565 | Katz | Comp. Sci. | 75000 |
| 10101 | Srinivasan | Comp. Sci. | 65000 |
| 83821 | Brandt | Comp. Sci. | 92000 |
| 98345 | Kim | Elec. Eng. | 80000 |
| 12121 | Wu | Finance | 90000 |
| 76543 | Singh | Finance | 80000 |
| 32343 | El Said | History | 60000 |
| 58583 | Califieri | History | 62000 |
| 15151 | Mozart | Music | 40000 |
| 33456 | Gold | Physics | 87000 |
| 22222 | Einstein | Physics | 95000 |

- **Verified:** one row, one column: avg_salary = 77333.33… (sqlite prints 77333.333333333329). This is (75000 + 65000 + 92000) / 3 = 232000 / 3.

### [S43] Aggregate Functions (*cont.*): Remark
- Same question, query and table as S42.
- ⭐ "**Remark:** *Don't use* renaming *for no precise purpose of the query expression.*" ("renaming" is blue.)

### [S44] Aggregate Functions (*cont.*): count (distinct …)
- Question: "Find the total <u>number</u> of instructors' ID of instructors who teach or have taught a course in the Spring 2010 semester"

```sql
select count (distinct ID)
from teaches
where semester = 'Spring' and year = 2010;
```

- ⭐ `distinct` is red. A red arrow leads to the red note "eliminates duplicates <u>before</u> aggregating". A second red arrow points into the ID column.
- The **teaches** table on the slide (15 tuples):

| ID | course_id | sec_id | semester | year |
|---|---|---|---|---|
| 10101 | CS-101 | 1 | Fall | 2009 |
| 10101 | CS-315 | 1 | Spring | 2010 |
| 10101 | CS-347 | 1 | Fall | 2009 |
| 12121 | FIN-201 | 1 | Spring | 2010 |
| 15151 | MU-199 | 1 | Spring | 2010 |
| 22222 | PHY-101 | 1 | Fall | 2009 |
| 32343 | HIS-351 | 1 | Spring | 2010 |
| **45565** | **CS-101** | **1** | **Spring** | **2010** |
| **45565** | **CS-319** | **1** | **Spring** | **2010** |
| 76766 | BIO-101 | 1 | Summer | 2009 |
| 76766 | BIO-301 | 1 | Summer | 2010 |
| 83821 | CS-190 | 1 | Spring | 2009 |
| 83821 | CS-190 | 2 | Spring | 2009 |
| 83821 | CS-319 | 2 | Spring | 2010 |
| 98345 | EE-181 | 1 | Spring | 2009 |

- ⭐ The two **45565** tuples (in bold above) have a red box on the slide. They are the same instructor twice in Spring 2010.
- The red arrow line crosses the first few IDs. I read them from the full-size picture, and the same table on S51 confirms them.
- The slide gives **no** result. **Verified:** **6**. Without `distinct`, `count (ID)` gives **7**.
  - The Spring 2010 tuples are 10101 CS-315, 12121 FIN-201, 15151 MU-199, 32343 HIS-351, 45565 CS-101, 45565 CS-319 and 83821 CS-319.
  - That is 7 tuples but only 6 different IDs, because 45565 is counted once.

### [S45] Aggregate Functions (*cont.*): question to the class
- ⭐ Question: "Find the <u>number</u> of *all* tuples in the *course* relation" ("all" is red italics.)
- ⭐ An empty blue box with a big "**?**" and a yellow arrow: the class is asked to write the query (answer on S46).
- The **course** table on the slide (13 tuples):

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

### [S46] Aggregate Functions (*cont.*): count (\*)
- Same question ("all" in red) and the answer:

```sql
select count (*)
from course;
```

- **Verified:** **13**.

### [S47] Aggregate Functions – "group by" (question + picture)
- Question: "Find the average salary of instructors <u>in each department</u>"
- ⭐ The S42 instructor table is cut into groups by red lines, one group per department: Biology | Comp. Sci. ×3 | Elec. Eng. | Finance ×2 | History ×2 | Music | Physics ×2. A big red brace is labelled "**departments- grouping**".
- A yellow arrow leads to the result:

| dept_name | avg_salary |
|---|---|
| Biology | 72000 |
| Comp. Sci. | 77333 |
| Elec. Eng. | 80000 |
| Finance | 85000 |
| History | 61000 |
| Music | 40000 |
| Physics | 91000 |

- There is no query yet; S48 gives it.

### [S48] Aggregate Functions – "group by" (query)

```sql
select dept_name, avg (salary) as avg_salary
from instructor
group by dept_name;
```

- ⭐ `group by` is red. The Finance salaries (90000, 80000) are in a **blue box**, and so is their result **85000**: (90000 + 80000) / 2.
- Same picture and result table as S47.
- **Verified:** the same 7 rows. sqlite prints 72000.0, 77333.333333333329, …; the slide rounds 77333.33 to 77333.

### [S49] Erroneous Query with "group by"
- ⭐ The title says "**Erroneous**". Same question: "Find the average salary of instructors in each department"

```sql
select dept_name,ID, avg (salary) as avg_salary
from instructor
group by dept_name;
```

- ⭐ `dept_name` is printed in **orange** in the `select` and in the `group by`. `ID` is not orange. The picture and result table are the same as on S48.
- **What is wrong, from the picture:** the result has **one row per department**, but a department can have several IDs. Finance has two (12121 Wu and 76543 Singh), so there is no single ID to put in Finance's one row. The orange marks show what is fine in the `select`: the `group by` attribute `dept_name`. `ID` is not.
- **Verified:** sqlite does **not** reject the query. It quietly prints one ID per group (for example Finance → 12121), which is an arbitrary pick. The correct query is S48 (without `ID`).
- 🔎 Look up in Track B: what MySQL does with this query (an error, or an arbitrary ID; the ONLY_FULL_GROUP_BY mode).

### [S50] Aggregate Functions – "group by": no grouping
- Question: "Find the average salary of all instructors"

```sql
select avg (salary) as avg_salary
from instructor;
```

- ⭐ The red brace is now labelled "**no grouping = one group**". The seven department averages of S48 are **crossed out with a big red X**. Below them is the answer, "**74833**", with "**( 898000/12 )**".
- **Verified:** 74833.33… The sum of all salaries is 898000 and there are 12 tuples.
- **Meaning:** without `group by`, all 12 tuples form **one** group, so there is one result row. The red X says that this query does not give the per-department averages of S48. 898000/12 is the total of all 12 salaries divided by 12 tuples. (My own arithmetic, not on the slide: the average of the 7 department averages would be 72333.33, a different number.)

### [S51] Exercise
- ⭐ "**Exercise**": "Write a SQL query that takes in input *instructor* and *teaches* and produces in output table below."
- ⭐ "Read it: "instructor count"". A yellow arrow points to the column name `instr_count`.
- Output table:

| dept_name | instr_count |
|---|---|
| Comp. Sci. | 3 |
| Finance | 1 |
| History | 1 |
| Music | 1 |

- Input tables:
  - **instructor**: the same 12 tuples as S42, here ordered by ID: 10101 Srinivasan, 12121 Wu, 15151 Mozart, 22222 Einstein, 32343 El Said, 33456 Gold, 45565 Katz, 58583 Califieri, 76543 Singh, 76766 Crick, 83821 Brandt, 98345 Kim;
  - **teaches**: the same 15 tuples as S44.
- On S51–S53 the last digits of the year column are cut off at the edge of the picture. S44 shows the same tuples in full.

### [S52] Exercise (*cont.*): the question in words
- "Find <u>the number of</u> instructors in each department who teach a course in the Spring 2010 semester"
- Same output table and input tables as S51.

### [S53] Exercise (*cont.*): the solution

```sql
select dept_name, count (distinct ID) as instr_count
from instructor natural join teaches
where semester = 'Spring' and year = 2010
group by dept_name;
```

- ⭐ "**Observe**", with yellow arrows to `dept_name` in the `select` and in the `group by` (both underlined in red). The attribute you list next to the aggregate is the one you group by. Compare this with the error on S49.
- **Verified:** Comp. Sci. 3, Finance 1, History 1, Music 1, the same as the slide. Without `distinct`, Comp. Sci. becomes **4**, because Katz (45565) teaches two Spring 2010 courses.
- Biology, Elec. Eng. and Physics have no Spring 2010 teaching, so no tuple of theirs is left after `where`. They form no group and do not appear. (Step-by-step in §5.27.)

### [S54] Aggregate Functions – "having" (idea + result)
- ⭐ "Useful to state a condition that <u>applies to groups of tuples rather than to all tuples</u> (as we do with **where** clause)." ("groups" is red.)
- Question: "Find the names and average salaries of all departments whose average salary is greater than $42000"
- The instructor table (ID order, as on S51) and the result:

| dept_name | avg_salary |
|---|---|
| Physics | 91000 |
| Elec. Eng. | 80000 |
| Finance | 85000 |
| Comp. Sci. | 77333 |
| Biology | 72000 |
| History | 61000 |

### [S55] Aggregate Functions – "having" (query)
- Same text, plus the schema box instructor(<u>ID</u>, name, dept_name, salary):

```sql
select dept_name, avg (salary) as avg_salary
from instructor
group by dept_name
having avg_salary > 42000;
```

- ⭐ `group by` and `having` are red.
- **Verified:** 6 rows, all departments except **Music**, whose average is 40000. sqlite lists them alphabetically, the slide in another order. The query has no `order by` [S31], so only the set of rows matters.
- The `having` condition uses the **alias** `avg_salary`, and sqlite accepts it. Writing the aggregate itself, `having avg (salary) > 42000`, gives the same 6 rows (verified). That is the style of S57 (`having count (ID) >= 2`). 🔎 Look up in Track B: is a `select` alias allowed in `having` (standard SQL vs MySQL)?

### [S56] Aggregate Functions – "having"+"where" (question + data)
- ⭐ Question: "For <u>each course section</u> offered in 2009, find the average total credits (*tot_cred*) of all students enrolled in that section, <u>if the section had at least 2 students</u>"
- The **section** table (the same 15 tuples as S18). Its course_id, sec_id, semester and year are in a red box, with the label ⭐ "**= Primary Key**".
- **student** (ID in a yellow box) and **takes** (ID in a yellow box; course_id, sec_id, semester, year in a red box; grade). These are the same tables as S9. The slide shows only their top rows; the picture is cut off at the bottom.
- Red arrows go from "each course section" to the section key and to the same four attributes in `takes`.
- **Meaning:** a course section is identified by (course_id, sec_id, semester, year), the primary key of `section` (cf. "PK for course section" [S13]). That is why S57 groups by these four attributes.

### [S57] Aggregate Functions – "having"+"where" (query)

```sql
select course_id, semester, year, sec_id, avg(tot_cred) as avg_tot_cred
from takes natural join student
where year = 2009
group by course_id, semester, year, sec_id
having count (ID) >= 2;
```

- ⭐ `where` and `having` are red. Curly braces on the left pair the lines: {`from` … `where`} and {`group by` … `having`}.
- The slide's result (only partly shown):

| course_id | sec_id | semester | year | avg_tot_cred |
|---|---|---|---|---|
| CS-347 | 1 | Fall | 2009 | (102+32)/2 |
| … | … | … | … | … |

- ⭐ The picture explains this one row:
  - in `takes`, the tuples "00128 CS-347 1 Fall 2009 A-" and "12345 CS-347 1 Fall 2009 A" are underlined in red, and their sec_id 1 is circled in orange;
  - in `student`, the tot_cred values 102 (Zhang) and 32 (Shankar) are circled in orange;
  - a red arrow goes from the `group by` line to `takes`.
- **Verified** with the full S9 tables:

| course_id | semester | year | sec_id | avg_tot_cred |
|---|---|---|---|---|
| CS-101 | Fall | 2009 | 1 | 65.0 |
| CS-190 | Spring | 2009 | 2 | 43.0 |
| CS-347 | Fall | 2009 | 1 | 67.0 |

- CS-347 gives 67.0 = (102 + 32) / 2, as on the slide. The "…" rows of the slide are CS-101 and CS-190. (Step-by-step in §5.29.)
- ⚠️ The slide's result table has the columns in the order course_id, sec_id, semester, year, but the `select` list says course_id, semester, year, sec_id. sqlite prints them in the `select` order. Only the order of the columns differs.

---

## 3. Definitions & key terms (word for word)

| Term | Wording on the slide | Slide |
|---|---|---|
| Join operations | "Join operations (in form of join expressions) take two relations and return as a result another relation." | [S7], [S14] |
| Join (Def) | "A join operation is a Cartesian product A x B which requires that tuples in the relations A and B match under some condition." "A join operation always specify the attributes that are present in the result of the join." | [S7] |
| Where joins are used | "The join operations are typically used as subquery expressions in the from clause." / "These additional operations are typically used as subquery expressions in the from clause" | [S7], [S14] |
| Outer Joins (Def) | "An extension of (Inner, Cross) Join (=Cartesian Product) that avoids loss of data (mismatch) when creating new information (by joining)." | [S8] |
| natural inner join | "Note: the natural join we studied before is called natural inner join" | [S11] |
| left vs right outer join | "Note: right outer join symmetric to left outer join" / "NB: right outer join in this example is conceptually wrong!" | [S12] |
| Key of a course section | "note: PK for course section" (course_id, sec_id, semester, year) / "= Primary Key" | [S13], [S56] |
| Join condition | "Join condition – defines which tuples in the two relations match, and what attributes are present in the result of the join." | [S14] |
| Join type | "Join type – defines how tuples in each relation that do not match any tuple in the other relation (based on the join condition) are treated." | [S14] |
| Join types | "(inner)join", "left outer join", "right outer join", "full outer join"; the label "Cartesian Product" points to "(inner)join" | [S14] |
| Join Conditions | "natural", `on <predicate>`, `using (A1, A1, …, An)` [sic: read A1, A2, …, An] | [S14] |
| Set operations | "The SQL operations union, intersect and except (also called minus) operate on relations (sets); correspond to the mathematical (set-theoretical) operations ∪, ∩, and − (or / set difference)." | [S17] |
| `[all]` | "to retain all duplicates" | [S20], [S22], [S23] |
| "Additional" | "\* "Additional" = Out of the scope of Data Model" | [S25] |
| select + expressions | "The select clause can contain arithmetic expressions involving the operation, +, –, ∗, and /, and operating on constants or attributes of tuples." | [S26] |
| `as` for a column | "We can rename "salary / 12" using the as clause" / "gives name "avg_salary" to the resulting relation's attribute" | [S26], [S42] |
| `as` for a relation | "Renaming (the "as" clause, ref. sec. 3.4.1)" / "In the query we compare tuples in the same relation (instructor)" | [S27], [S28–S29] |
| Remark on renaming | "Don't use renaming for no precise purpose of the query expression." | [S43] |
| `*` | "Attribute Specification - The "\*" Operation" (`select *` = all attributes) | [S30] |
| order by | "We may specify desc for descending order or asc for ascending order (default), for each attribute." / "Can sort on multiple attributes" | [S31] |
| like | "SQL includes a string-matching operator for comparisons on character strings. The operator like uses patterns that are described using two special characters:" | [S33] |
| `%` | "percent ( % ). The % character matches any substring." | [S33] |
| `_` | "underscore ( _ ). The _ character matches any character." | [S33] |
| escape | "in that above we use backslash (\\) as the escape character." | [S33] |
| between | "SQL includes a between comparison operator" | [S34] |
| Tuple comparison | "Rewriting the above query by tuple comparison operator" | [S35] |
| null | "It is possible for tuples to have a null value, denoted by null, for some of their attributes" / "null means unknown value or a value does not exist." | [S37] |
| null in arithmetic | "Result of arithmetic expressions involving null is null" ("5 + null" returns null) | [S37] |
| is null | "Predicate is null can be used to check unknown data." | [S37] |
| Three values | "Three values : true, false, unknown" | [S38] |
| Comparison with null | "Any comparison with null returns unknown" | [S38] |
| where and unknown | "If predicate P evaluates to either false or unknown in where clause for tuple t, then t is not added to the result" | [S38] |
| Aggregate functions (Def) | "Aggregate functions are functions that operate on a collection (a set or a multi-set) of values of an attribute of a relation, and return a single value." | [S41] |
| The five functions | "avg(): average value", "min(): minimum value", "max(): maximum value", "sum(): sum of values", "count(): number of values" (in the "SQL standard (cf. textbook)") | [S41] |
| distinct in an aggregate | "eliminates duplicates before aggregating" | [S44] |
| group by | "departments- grouping" (one group per department, one row per group) | [S47–S48] |
| No group by | "no grouping = one group" | [S50] |
| having | "Useful to state a condition that applies to groups of tuples rather than to all tuples (as we do with where clause)." | [S54] |

---

## 4. SQL reference (as taught)

### 4.1 Joins [S7–S14]
The three outer-join forms exactly as on the slides:

```sql
select * from student natural left outer join takes;    -- [S11]
select * from student natural right outer join takes;   -- [S12]
select *
from (select * from student where dept_name = 'Comp. Sci.')        -- [S13], corrected
     natural full outer join
     (select * from takes where semester = 'Spring' and year = 2009);
```

**Result shapes on the class data (all verified):**

| Join (as on the slides) | Tuples kept | Unmatched tuples get | Class example | Rows |
|---|---|---|---|---|
| `natural join` (= "natural inner join" [S11]) | only matching pairs | dropped | student, takes [S9] | 22 (Snow lost) |
| `natural left outer join` | all tuples of the **left** relation, plus the matches | *null* in the right relation's attributes | [S11] | 23 (Snow + 5 nulls) |
| `natural right outer join` | all tuples of the **right** relation, plus the matches | *null* in the left relation's attributes | [S12] | 22 (every takes tuple has a student) |
| `natural full outer join` | all tuples of **both** relations | *null* on the missing side | [S13], corrected | 5 |

- The result of a natural (outer) join has the attributes of both relations, with the common attribute (ID) **once** [S11 picture]. In a plain Cartesian product the common attribute appears twice [S30].
- Join conditions [S14]: `natural` (all examples on S9–S13), `on <predicate>` and `using (A1, A2, …, An)`. Class examples of the last two are in Week 5: `using` [W5 S85], `on` [W5 S88–S90]. Part 2 has `join … using` [S73].

### 4.2 Set operations [S17–S23]
Form on the slides, where `[ ]` = optional:
- `(select …) union [all] (select …);` [S20]
- `(select …) intersect [all] (select …);` [S22]
- `(select …) except [all] (select …);` [S23]

**Class example** with r1 = Fall 2009 courses = CS-101, CS-347, PHY-101 and r2 = Spring 2010 courses = CS-101, CS-315, CS-319, CS-319, FIN-201, HIS-351, MU-199 (verified on the real section table):

| Operation | Question words | Result | Rows |
|---|---|---|---|
| r1 `union` r2 | "either … or … (or both)" | CS-101, CS-315, CS-319, CS-347, FIN-201, HIS-351, MU-199, PHY-101 | 8 |
| r1 `union all` r2 | (same, duplicates kept) | CS-101, CS-347, PHY-101, CS-101, CS-315, CS-319, CS-319, FIN-201, HIS-351, MU-199 | 10 |
| r1 `intersect` r2 | "… and …" | CS-101 | 1 |
| r1 `intersect all` r2 | | CS-101 | 1 |
| r1 `except` r2 | "… but not in …" | CS-347, PHY-101 | 2 |
| r1 `except all` r2 | | CS-347, PHY-101 | 2 |

**The slides' pictures** (with the extra CS-101 the professor drew in):

| Picture | Data | Result |
|---|---|---|
| [S22] | CS-101 twice in r1 and twice in r2 | `intersect all` → CS-101, CS-101; `intersect` → CS-101 |
| [S23] | CS-101 twice in r1, once in r2 | `except all` → CS-347, PHY-101, CS-101; `except` → CS-347, PHY-101 |

- "or" can also be written as one `where` with `or` [S21], but that query keeps duplicates (10 rows, like `union all`).
- "To express the "and" we need a set operation!" [S21]: an `and` inside one `where` returns 0 rows.

### 4.3 Expressions and renaming with `as` [S26–S29, S42–S43]
- Arithmetic in `select`: `salary / 12` [S26].
- Renaming a column: `salary / 12 as monthly_salary` [S26] (with the comma and `from` added), `avg (salary) as avg_salary` [S42].
- Renaming a relation: `from instructor as I, teaches as T` … `where I.ID = T.ID` [S27].
- The same relation twice: `from instructor as T, instructor as S` [S29].
- "Don't use renaming for no precise purpose of the query expression." [S43]

### 4.4 `*` [S30, S32]
- `select *` = all attributes. `select * from instructor, teaches;` is the Cartesian product: 180 tuples, 9 columns [S30]. `select * from instructor order by …` lists the entire relation [S32].

### 4.5 `order by` [S31–S32]
- `order by name` (ascending is the default), `order by name desc`, `order by dept_name, name`, `order by salary desc, name asc`.
- The second key only breaks ties: Kim comes before Singh (both 80000) [S32].

### 4.6 `like`, `between`, tuple comparison [S33–S35]
- `where name like '%dar%'` (quotes corrected): `%` = any substring, `_` = any character [S33].
- `like '100\%' escape '\'` matches the string "100%". The slide's `'100 \%'` has an extra space [S33].
- `where salary between 90000 and 100000` → Wu, Einstein, Brandt. In the verified run, 90000 itself was included [S34].
- `where (instructor.ID, dept_name) = (teaches.ID, 'Biology')` is the same as `instructor.ID = teaches.ID and dept_name = 'Biology'` [S35].

### 4.7 Null rules [S37–S38]
- *null* = "unknown value or a value does not exist". Arithmetic with null gives null (5 + null = null) [S37].
- Test it with `is null` [S37]. A comparison with null (even `null = null`) gives *unknown* [S38].
- AND / OR / NOT with *unknown*: see the table at §2 [S38]. The short version:
  - `or` with true is true;
  - `and` with false is false;
  - every other combination with *unknown* stays *unknown*.
- `where` keeps a tuple only when the predicate is **true**. False or unknown means "not added to the result" [S38].
- NULLs inside aggregate functions are **not** on slides 1–57, and not in part 2. 🔎 Look up in Track B: how avg / sum / count treat nulls (`count(*)` vs `count(attribute)`).

### 4.8 Aggregate functions [S41–S46]

| Function | Meaning [S41] | Class use | Verified result |
|---|---|---|---|
| `avg()` | average value | `avg (salary)` for Comp. Sci. [S42]; per department [S48]; all instructors [S50]; `avg(tot_cred)` [S57] | 77333.33; 7 rows; 74833.33; 3 rows |
| `min()` | minimum value | only listed | — |
| `max()` | maximum value | only listed | — |
| `sum()` | sum of values | only listed | — |
| `count()` | number of values | `count (distinct ID)` [S44, S53]; `count (*)` [S46]; `count (ID)` in `having` [S57] | 6; 13; used as a condition |

- `count (distinct ID)` "eliminates duplicates before aggregating": 6 instead of 7 [S44].
- `count (*)` counts all tuples: 13 [S46].
- `as` names the result column [S42].

### 4.9 `group by` / `having`: rules as shown on the slides [S47–S57]
1. `group by dept_name` → one group per department and **one result row per group** [S47–S48].
2. Next to the aggregates, the `select` lists only the `group by` attribute(s): `dept_name` [S48, S53 "Observe"], or the four section attributes [S57]. Adding `ID` gives the "Erroneous Query" [S49].
3. Without `group by`, the whole relation is **one group**, so there is one row [S50].
4. `having` = a condition on **groups**; `where` = a condition on single tuples [S54]. In `having` the slides use the alias (`avg_salary > 42000`) [S55] or an aggregate (`count (ID) >= 2`) [S57].
5. Together: {`from` … `where`} picks the tuples, then {`group by` … `having`} forms and filters the groups [S57 braces].
6. A department with no tuple left after `where` forms no group and does not appear (Biology, Elec. Eng. and Physics in S53, verified).

- 🔎 Look up in Track B: the order in which SQL evaluates `from`, `where`, `group by`, `having` and `select`.

### 4.10 MySQL lab pointers (not on the slides; one line each)
- 🔎 `full outer join` in MySQL [S13].
- 🔎 `intersect` / `except` (and their `all` forms) by MySQL version [S17, S22–S23].
- 🔎 `(select …) union (select …)` with parentheses (sqlite rejects them) [S20].
- 🔎 What `/` returns on integer columns [S26].
- 🔎 The backslash inside string literals, and `escape '\'` [S33].
- 🔎 ONLY_FULL_GROUP_BY and the S49 query [S49].
- 🔎 An alias inside `having` [S55].

---

## 5. Every query example from class, worked

### 5.0 Data used (all from class slides)
- **student** and **takes**: [S9] (13 and 22 tuples). S56–S57 show their top rows.
- **section**: [S18] (15 tuples), shown again on S19 and S56.
- **instructor**: [S42] (12 tuples), shown again in ID order on S51 and S54.
- **teaches**: [S44] (15 tuples), shown again on S51–S53.
- **course**: [S45] (13 tuples).

All six tables are copied in full in §2 at those slides. I typed them into sqlite3 3.54 with exactly these values; the row counts 13, 22, 15, 12, 15, 13 check out. Every output below is the real sqlite output, reformatted as a table.

### 5.1 [S9] Natural join: who is lost?
- **Question** (S10): "Find all data of all students with the courses they have taken". This is the first attempt.
- **SQL:** `select * from student natural join takes;`
- **Evaluation:**
  - The common attribute of student(ID, name, dept_name, tot_cred) and takes(ID, course_id, sec_id, semester, year, grade) is **ID**.
  - Each `takes` tuple is paired with the student who has the same ID.
  - 70557 Snow has no `takes` tuple, so he gets no pair.
- **Output:** 22 tuples: the §2 [S11] table without Snow's row.

### 5.2 [S11] Natural left outer join
- **Question:** "Find all data of all students with the courses they have taken"
- **SQL:** `select * from student natural left outer join takes;`
- **Evaluation:**
  - Start with the 22 matched tuples of 5.1.
  - Left = `student`: every student without a match is added once, with *null* in course_id, sec_id, semester, year and grade. Only Snow is unmatched.
- **Output:** 23 tuples, see §2 [S11].

### 5.3 [S12] Natural right outer join
- **Question:** "Find data of all courses and of the students who have taken them"
- **SQL:** `select * from student natural right outer join takes;`
- **Evaluation:**
  - Start with the 22 matched tuples.
  - Right = `takes`: every `takes` tuple without a student would be added with *null* student attributes. There is none, because every ID in `takes` is also in `student`.
- **Output:** 22 tuples, the same as 5.1. Snow is lost. The null row on the slide is only an illustration, and the slide says "NB: … conceptually wrong!"

### 5.4 [S13] Natural full outer join
- **Question:** "Find all data of all students in CS department with the courses they have taken, if any, and all course sections they have taken in Spring 2009"
- **SQL:** as on the slide, with `'Comp. Sci.'` (the slide has `'Comp. Sci'`).
- **Evaluation:**
  - The left subquery gives the 4 CS students: 00128 Zhang, 12345 Shankar, 54321 Williams, 76543 Brown.
  - The right subquery gives the Spring 2009 `takes` tuples: (12345, CS-190, 2, A), (54321, CS-190, 2, B+), (76653, EE-181, 1, C).
  - Matched on ID: Shankar and Williams.
  - Only on the left: Zhang and Brown (with *null* course data).
  - Only on the right: 76653 (with *null* student data).
- **Output:** 5 tuples, see §2 [S13]. The query as printed gives 3 tuples, also in §2 [S13].

### 5.5 [S18], [S19] r1 and r2
- **r1:** `select course_id from section where semester = 'Fall' [and year = '2009'];` → CS-101, CS-347, PHY-101. The same with or without the optional part.
- **r2:** `select course_id from section where semester = 'Spring' and year = '2010';` → CS-101, CS-315, CS-319, CS-319, FIN-201, HIS-351, MU-199.

### 5.6 [S20] union / union all
- **Question:** "Find all course id's of courses taught either in Fall 2009 or Spring 2010 (or both)"
- **Evaluation:**
  - `union all` = r1 followed by r2 = 3 + 7 = 10 rows.
  - `union` removes the duplicates (the second CS-101 and the second CS-319): 8 rows.
- **Output:** `union`: CS-101, CS-315, CS-319, CS-347, FIN-201, HIS-351, MU-199, PHY-101. `union all`: CS-101, CS-347, PHY-101, CS-101, CS-315, CS-319, CS-319, FIN-201, HIS-351, MU-199.

### 5.7 [S21] One `where` with `or`
- **Evaluation:** read the 15 section tuples once and keep those that are Fall 2009 or Spring 2010.
  - Kept: CS-101 (Fall 2009), CS-101 (Spring 2010), CS-315, CS-319 (sec 1), CS-319 (sec 2), CS-347, FIN-201, HIS-351, MU-199, PHY-101.
  - Dropped: BIO-101, BIO-301, both CS-190 sections and EE-181. These are Summer, or Spring 2009.
- **Output:** these 10 rows. With `select distinct course_id`, 8 rows, the same as `union`.

### 5.8 [S22] intersect
- **Question:** "Find all course id's of courses taught in Fall 2009 and Spring 2010"
- **Evaluation:** keep the values that are in both r1 and r2. CS-347 and PHY-101 are not in r2, so only CS-101 is left.
- **Output:** CS-101. `intersect all` gives CS-101 on the real data, and CS-101, CS-101 on the slide's picture data.

### 5.9 [S23] except
- **Question:** "Find all course id's of courses taught in Fall 2009 but not in Spring 2010"
- **Evaluation:** keep the values of r1 that are not in r2: CS-347 and PHY-101.
- **Output:** CS-347, PHY-101. `except all` adds one CS-101 on the slide's picture data (2 copies − 1 copy).

### 5.10 [S26] Arithmetic in `select` + `as`
- **SQL (corrected):** `select ID, name, dept_name, salary / 12 as monthly_salary from instructor;`
- **Evaluation:** one output row per instructor, with salary divided by 12.
- **Output:** 12 rows, see the §2 [S26] table (Srinivasan 5416.67, Wu 7500, …).

### 5.11 [S27] (= [S35]) Courses of the Biology instructors
- **Question:** "Find instructors' name and course id of courses they taught for all instructors in the Biology department who have taught some course"
- **Evaluation:**
  - `from instructor, teaches` = 12 × 15 = 180 pairs [S30].
  - Keep the pairs with the same ID and dept_name = 'Biology'.
  - Only Crick (76766) is in Biology. His `teaches` tuples are BIO-101 (Summer 2009) and BIO-301 (Summer 2010).
- **Output:**

| name | course_id |
|---|---|
| Crick | BIO-101 |
| Crick | BIO-301 |

The same output comes from the `as I, as T` version [S27] and from the tuple-comparison version [S35].

### 5.12 [S29] Self-join with renaming
- **Question:** "Find the salaries of all instructors that are less than the largest salary of any (some) instructor in the Biology department"
- **Evaluation:**
  - S must be in Biology, so S = Crick (72000).
  - Keep every T with T.salary < 72000: Srinivasan 65000, Mozart 40000, El Said 60000, Califieri 62000.
  - `distinct` changes nothing here, because all four salaries are different.
- **Output:** 65000, 40000, 60000, 62000.

### 5.13 [S30] `select * from instructor, teaches;`
- **Output:** 180 tuples, 9 columns (ID twice). The first row is 10101, Srinivasan, Comp. Sci., 65000, 10101, CS-101, 1, Fall, 2009.

### 5.14 [S31] `select distinct name from instructor order by name;`
- **Output:** Brandt, Califieri, Crick, Einstein, El Said, Gold, Katz, Kim, Mozart, Singh, Srinivasan, Wu.

### 5.15 [S32] `order by salary desc, name asc`
- **Output:** the 12 rows of the §2 [S32] table. Kim comes before Singh at 80000.

### 5.16 [S33] like / escape
- `where name like '%dar%'` → **0 rows** on the class instructor table.
- `'100%' like '100\%' escape '\'` → match. The slide's `'100 \%'` → no match.

### 5.17 [S34] between
- **Output:** Wu (90000), Einstein (95000), Brandt (92000).

### 5.18 [S35] Tuple comparison
- **Output:** the same as 5.11.

### 5.19 [S37] Nulls
- `5 + null` → null.
- `select name from instructor where salary is null` → 0 rows, because there are no null salaries in the class table.

### 5.20 [S38] Three-valued logic
- **Output:** the table in §2 [S38]. Every value was checked in sqlite.

### 5.21 [S42] avg for one department
- **Evaluation:**
  - `where` keeps Katz 75000, Srinivasan 65000 and Brandt 92000.
  - avg = 232000 / 3.
- **Output:** avg_salary = 77333.33.

### 5.22 [S44] count (distinct ID)
- **Evaluation:**
  - The 7 Spring 2010 tuples have the IDs 10101, 12121, 15151, 32343, 45565, 45565, 83821.
  - `distinct` removes the second 45565, which leaves 6 IDs.
- **Output:** 6. Without `distinct` it is 7.

### 5.23 [S46] count (\*)
- **Output:** 13.

### 5.24 [S48] group by dept_name
- **Evaluation**, one group per department:
  - Biology: 72000 / 1 = 72000.
  - Comp. Sci.: (75000 + 65000 + 92000) / 3 = 77333.33.
  - Elec. Eng.: 80000.
  - Finance: (90000 + 80000) / 2 = 85000.
  - History: (60000 + 62000) / 2 = 61000.
  - Music: 40000.
  - Physics: (87000 + 95000) / 2 = 91000.
- **Output:** these 7 rows.

### 5.25 [S49] The erroneous query
- **Evaluation:** Finance gives one output row but contains two IDs (12121 and 76543), so the value of ID for that row is not determined. The same holds for Comp. Sci. (3 IDs), History and Physics.
- sqlite still prints one arbitrary ID per group. The fix is the S48 query.

### 5.26 [S50] avg without group by
- **Evaluation:** all 12 tuples form one group. 898000 / 12 = 74833.33.
- **Output:** one row, avg_salary = 74833.33.

### 5.27 [S53] Exercise: instructors per department in Spring 2010
- **Evaluation:**
  1. `instructor natural join teaches` on ID.
  2. `where semester = 'Spring' and year = 2010` leaves 7 tuples:

| dept_name | ID | name | course_id |
|---|---|---|---|
| Comp. Sci. | 10101 | Srinivasan | CS-315 |
| Comp. Sci. | 45565 | Katz | CS-101 |
| Comp. Sci. | 45565 | Katz | CS-319 |
| Comp. Sci. | 83821 | Brandt | CS-319 |
| Finance | 12121 | Wu | FIN-201 |
| History | 32343 | El Said | HIS-351 |
| Music | 15151 | Mozart | MU-199 |

  3. `group by dept_name`, then `count (distinct ID)`:
     - Comp. Sci. = {10101, 45565, 83821} = 3;
     - Finance = 1; History = 1; Music = 1.
- **Output:** Comp. Sci. 3, Finance 1, History 1, Music 1. Without `distinct`, Comp. Sci. would be 4.

### 5.28 [S55] having avg_salary > 42000
- **Evaluation:** take the 7 groups of 5.24 and keep those with an average above 42000. Every department passes except Music (40000).
- **Output:** Biology 72000, Comp. Sci. 77333.33, Elec. Eng. 80000, Finance 85000, History 61000, Physics 91000.

### 5.29 [S57] where + group by + having
- **Question:** "For each course section offered in 2009, find the average total credits (tot_cred) of all students enrolled in that section, if the section had at least 2 students"
- **Evaluation:**
  1. `takes natural join student` (common attribute ID): each `takes` tuple gets its student's name, dept_name and tot_cred.
  2. `where year = 2009` leaves 13 tuples.
  3. `group by course_id, semester, year, sec_id` gives 6 groups:

| course_id | semester | year | sec_id | students (ID: tot_cred) | count (ID) |
|---|---|---|---|---|---|
| BIO-101 | Summer | 2009 | 1 | 98988: 120 | 1 |
| CS-101 | Fall | 2009 | 1 | 00128: 102, 12345: 32, 45678: 46, 54321: 54, 76543: 58, 98765: 98 | 6 |
| CS-190 | Spring | 2009 | 2 | 12345: 32, 54321: 54 | 2 |
| CS-347 | Fall | 2009 | 1 | 00128: 102, 12345: 32 | 2 |
| EE-181 | Spring | 2009 | 1 | 76653: 60 | 1 |
| PHY-101 | Fall | 2009 | 1 | 44553: 56 | 1 |

  4. `having count (ID) >= 2` keeps CS-101, CS-190 and CS-347.
  5. avg(tot_cred) for each kept group:
     - CS-101: (102 + 32 + 46 + 54 + 58 + 98) / 6 = 390 / 6 = 65;
     - CS-190: (32 + 54) / 2 = 43;
     - CS-347: (102 + 32) / 2 = 67.
- **Output:**

| course_id | semester | year | sec_id | avg_tot_cred |
|---|---|---|---|---|
| CS-101 | Fall | 2009 | 1 | 65.0 |
| CS-190 | Spring | 2009 | 2 | 43.0 |
| CS-347 | Fall | 2009 | 1 | 67.0 |

---

## 6. Likely quiz/exam questions (only from these slides)

All questions use the slides' own definitions and tables (§5.0). Answers are in §6.1.

1. **Definitions.**
   - (a) Complete: "A join operation is a ______ A x B which requires that tuples in the relations A and B match ______."
   - (b) Complete: outer join = "An extension of (Inner, Cross) Join (=Cartesian Product) that ______ (mismatch) when creating new information (by joining)."
   - (c) Name the four join types and the three join conditions of the summary slide.
2. On the S9 tables, how many tuples does `select * from student natural join takes;` return? Which student is missing, and why?
3. Write the query for "Find all data of all students with the courses they have taken". Give Snow's tuple and the total number of tuples.
4. **True or false:** on the S9 data, `student natural right outer join takes` returns at least one tuple whose student attributes are null.
5. Find the error in the S13 query. What does the query return as printed, and what does it return after the fix?
6. On S18 the part `[and year = '2009']` is "optional (in this case)". Why only "in this case"?
7. How many rows do r1 `union` r2 and r1 `union all` r2 return? Which course ids appear twice in `union all`?
8. **MCQ.** "Find all course id's of courses taught in Fall 2009 **and** Spring 2010." Which query is correct?
   - (a) one `select` with `where (semester = 'Fall' and year = '2009') and (semester = 'Spring' and year = '2010')`
   - (b) the two `select`s joined by `intersect`
   - (c) the two `select`s joined by `union`
   - (d) one `select` with `where (…Fall 2009…) or (…Spring 2010…)`
9. S21 calls its `where … or …` query "Equivalent (easier)". Does it return exactly the same rows as the `union` of S20?
10. Use the pictures:
    - S23: r1 = CS-101, CS-347, PHY-101, CS-101 and r2 = CS-101, CS-315, CS-319, CS-319, FIN-201, HIS-351, MU-199. Give r1 `except` r2 and r1 `except all` r2.
    - S22: CS-101 is twice in r1 and twice in r2. Give r1 `intersect all` r2.
11. Find the errors: `select ID, name, dept_name salary / 12 as monthly_salary;`
12. Write the query for "Find the salaries of all instructors that are less than the largest salary of any (some) instructor in the Biology department" and give its output.
13. In `select * from instructor order by salary desc, name asc;`, in which order do Kim and Singh appear, and why?
14. `like`:
    - (a) Which names does `like '%dar%'` match? What does the S33 query return on the class instructor table?
    - (b) The slide writes `like '100 \%' escape '\'` to match "100%". What is wrong?
15. **Nulls.** Give the value of:
    - (a) 5 + null; (b) null = null; (c) unknown or true; (d) false and unknown; (e) not unknown;
    - (f) on the S9 `takes` table (one grade is null), how many tuples do `select * from takes where grade = null;` and `select * from takes where grade is null;` return?
16. For Spring 2010 on the S44 `teaches` table, give `count (distinct ID)` and `count (ID)`. Which instructor makes the difference?
17. Find the error: `select dept_name,ID, avg (salary) as avg_salary from instructor group by dept_name;`
18. What does `select avg (salary) as avg_salary from instructor;` return? Why are the department averages crossed out on S50?
19. Write the S51 exercise query: the number of instructors in each department who teach a course in Spring 2010. Give the output, and say what changes without `distinct`.
20. `having`:
    - (a) Write "Find the names and average salaries of all departments whose average salary is greater than $42000". Which department disappears?
    - (b) In the S57 query, what does `where year = 2009` do, and what does `having count (ID) >= 2` do? Give the output.

### 6.1 Answers

1. **Definitions.**
   - (a) "Cartesian product"; "under some condition" [S7].
   - (b) "avoids loss of data" [S8].
   - (c) Types: (inner)join, left outer join, right outer join, full outer join. Conditions: `natural`, `on <predicate>`, `using (A1, A2, …, An)`. The slide misprints "A1, A1" [S14].
2. **22** tuples [S9]. Snow (70557) is missing because no `takes` tuple has ID 70557 [S9–S10]. For comparison, the Cartesian product has 13 × 22 = 286 tuples.
3. `select * from student natural left outer join takes;` [S11]. Snow's tuple is (70557, Snow, Physics, 0, null, null, null, null, null). There are **23** tuples in total (verified).
4. **False.** It returns 22 tuples, the same as the natural join (verified): every ID in `takes` also appears in `student`. The null row drawn on S12 is only an illustration, and the slide warns: "NB: right outer join in this example is conceptually wrong!" [S12].
5. The error is `'Comp. Sci'`; the data value is `'Comp. Sci.'` [S9, S13].
   - **As printed:** the first subquery is empty, so only the 3 Spring 2009 `takes` tuples come out, with null student attributes: (12345, CS-190, 2, A), (54321, CS-190, 2, B+), (76653, EE-181, 1, C).
   - **Fixed:** 5 tuples.
     - Zhang and Brown, with null course data;
     - Shankar and Williams, with CS-190;
     - 76653, with EE-181 and null student data.
6. Every Fall section in this section table is from 2009 (CS-101, CS-347, PHY-101), so the year test removes nothing. "In this case" = for this data only (verified) [S18].
7. `union`: **8** rows. `union all`: **10** rows. Both CS-101 (in r1 and r2) and CS-319 (twice in r2, sections 1 and 2) appear twice [S19–S20]. The S20 picture shows only the extra CS-101.
8. **(b)** → CS-101 [S22].
   - (a) returns 0 rows, because one tuple cannot be both Fall and Spring: "to express the "and" we need a set operation!" [S21].
   - (c) and (d) answer the "either … or" question [S20–S21].
9. **Not exactly.** It gives the same course ids, but 10 rows, because CS-101 and CS-319 appear twice: duplicates are kept, as with `union all`. `union` gives 8 rows. With `select distinct` it gives the 8 rows of `union` (verified) [S20–S21].
10. Using the pictures:
    - S23: `except` → CS-347, PHY-101; `except all` → CS-347, PHY-101, CS-101 [S23].
    - S22: `intersect all` → CS-101, CS-101 [S22].
    - On the real section table (without the drawn extra CS-101): `intersect all` → CS-101 and `except all` → CS-347, PHY-101 (verified).
11. There is no comma after `dept_name` and no `from instructor`. Correct: `select ID, name, dept_name, salary / 12 as monthly_salary from instructor;` [S26]. sqlite reports a syntax error near "/" for the printed version.
12. The query is:

    ```sql
    select distinct T.salary
    from instructor as T, instructor as S
    where T.salary < S.salary and S.dept_name = 'Biology';
    ```

    Output: 65000, 40000, 60000, 62000, the salaries below Crick's 72000 [S29].
13. **Kim, then Singh.** Both earn 80000, so the tie is broken by `name asc` [S32].
14. `like`:
    - (a) Names that contain "dar" anywhere, because `%` "matches any substring" [S33]. On the class instructor table no name contains "dar", so the result is empty (verified).
    - (b) The space. `'100 \%'` matches "100 %", not "100%". Use `like '100\%' escape '\'`, where the backslash turns `%` into an ordinary character (verified: 0 vs 1) [S33].
15. **Nulls.**
    - (a) null [S37]; (b) unknown; (c) true; (d) false; (e) unknown [S38].
    - (f) **0** and **1**. `grade = null` is *unknown* for every tuple, and "If predicate P evaluates to either false or unknown in where clause for tuple t, then t is not added to the result" [S38]. `is null` finds (98988, BIO-301) [S37].
16. **6** and **7**. Instructor 45565 (Katz) teaches CS-101 and CS-319 in Spring 2010 (the red box on S44). `distinct` "eliminates duplicates before aggregating" [S44].
17. `ID` is in the `select` but it is not the `group by` attribute and not inside an aggregate. The result has one row per department, but Finance, for example, has two IDs (12121 and 76543), so there is no single ID to show [S49]. The fix is to drop `ID` (S48). sqlite still runs the query and quietly picks one ID per group.
18. **74833.33** = 898000/12. With no `group by` the whole relation is one group, so there is one row. The crossed-out values are the per-department averages, which is what `group by dept_name` gives (S48), not this query [S50]. (The average of the seven department averages would be 72333.33, a different number.)
19. The query [S53]:

    ```sql
    select dept_name, count (distinct ID) as instr_count
    from instructor natural join teaches
    where semester = 'Spring' and year = 2010
    group by dept_name;
    ```

    Output: Comp. Sci. 3, Finance 1, History 1, Music 1. Without `distinct`, Comp. Sci. becomes 4, because Katz is counted twice (verified).
20. `having`:
    - (a) [S55]:

      ```sql
      select dept_name, avg (salary) as avg_salary
      from instructor
      group by dept_name
      having avg_salary > 42000;
      ```

      **Music** (40000) disappears; 6 departments remain [S54–S55].
    - (b) `where year = 2009` keeps only the 2009 `takes` tuples (a condition on tuples). `having count (ID) >= 2` keeps only the sections with at least 2 students (a condition on groups) [S54, S57]. Output (verified): CS-101 / Fall / 2009 / 1 → 65.0; CS-190 / Spring / 2009 / 2 → 43.0; CS-347 / Fall / 2009 / 1 → 67.0 = (102+32)/2. PHY-101, EE-181 and BIO-101 had only one student each in 2009.

---

## 7. Self-check

- [ ] I can say the S7 definition of a join and the S8 definition of an outer join word for word.
- [ ] I can predict what natural, left, right and full outer joins return on the S9 tables (22 / 23 / 22 / 5 tuples) and explain where the *null*s appear.
- [ ] I can explain the S12 "NB" and find the `'Comp. Sci'` typo on S13.
- [ ] I can write `union`, `intersect` and `except`, with and without `all`, for the r1/r2 example and give their results (8 / 10, 1, 2), including the slides' pictures with the extra CS-101.
- [ ] I can explain why "and" needs a set operation and why the `where … or …` query keeps duplicates.
- [ ] I can use `as` for columns and for relations, including the self-join `instructor as T, instructor as S`.
- [ ] I can use `order by` with asc/desc on several attributes, `like` with `%`, `_` and `escape`, `between`, and a tuple comparison.
- [ ] I can evaluate expressions with *null* using three-valued logic and apply the `where` rule.
- [ ] I can write and evaluate `avg`, `count (distinct …)`, `count (*)`, `group by`, `having`, and `where` + `having` queries, and spot the S49 error.
