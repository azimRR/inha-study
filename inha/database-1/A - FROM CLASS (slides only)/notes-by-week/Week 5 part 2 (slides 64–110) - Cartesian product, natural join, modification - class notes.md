# Week 5, part 2 (slides 64–110) — Cartesian product, natural join, join conditions, modification (CLASS NOTES — from slides only)

> Source: W5L1L2 [Q1].pdf, slides 64–110 of 110. [S#] = the "n / 110" footer number.
> Section-title, outline and end slides have no footer, so they are numbered by their position in the deck (same as the image number).
> Legend: ⭐ professor emphasis · ⚠️ apparent slide typo or trap · ✅ checked in sqlite3 · 🔎 not on the slides, so look it up in Track B.
> ✅ checks: I ran the slides' own SQL in sqlite3 3.54 on the slides' own tables:
> - r and s from [S67];
> - instructor and department from [S78];
> - teaches from [S79];
> - student and takes rebuilt from the result table on [S90];
> - course from Week 6 [W6 S45], a class slide, because no slide in this range lists the tuples of course.
>
> The setup script is in the Appendix.

---

## 1. Big picture

- **The comma is the Cartesian product.** `from r, s` pairs every tuple of r with every tuple of s. The slides call this the "Unconditional Join ("comma")" [S65], [S67], [S69]. On the class data, `instructor, teaches` gives 12 × 15 = **180** rows, and only 15 of them make sense. ⭐ "Cartesian product not very useful directly, but useful if combined with the **where** clause" [S69].
- **How to read any query on two relations** [S74]:
  1. compute r × s;
  2. keep the tuples that satisfy the where predicate P;
  3. output the attributes in the select clause.
- **The natural join** is the deck's answer to "How *not* to use the Cartesian Product!" [S76]. It matches tuples on the common attribute(s) and keeps each common attribute once:
  - instructor and department match on dept_name [S78];
  - instructor and teaches match on ID, "The only common attribute" [S79].

  The natural join is a "derived" operation [S77].
- ⚠️ **Main trap: the natural join matches *every* attribute that has the same name.** `instructor natural join teaches natural join course` also matches **dept_name**. The slides call it "conceptually different" and "a wrong SQL code" for "names of instructors with titles of courses they teach" [S86], [S87]. The right versions are:
  - natural join + comma + where;
  - natural join + `join course using course_id` [S85].
- **Join conditions** [S84]–[S91]:
  - `using` names the join attribute.
  - `on` gives any predicate.
  - `join … on` is **equivalent** to comma + where [S89].
  - `join … on` is only **similar** to the natural join: the ID column appears twice [S88]. The `as` clause removes the duplicate [S89], [S90].
  - The definition: "A join operation is a Cartesian product A x B which requires that tuples in the relations A and B match under some condition" [S91].
- **Modification** [S94]–[S105]:
  - **delete:** all tuples, tuples matching a where condition, `where … in (select …)`, or a comparison with an average. In the average case SQL first finds all tuples to delete, then deletes them [S98].
  - **insert:** `values`, with or without the column list [S99]; MySQL's multi-row syntax [S100]; `insert … select`, where the select is evaluated first [S101].
  - **update:** two statements whose order matters, or one `case` statement [S103], [S104]; an update with a correlated scalar subquery [S105].
- **Quiz info.** Quiz #1 was "Only for students who submitted Homework Assignment #1. No slides provided for Quiz #1" [S108]. For Quiz #2: HW2 Exercise 3 asks for MySQL `INSERT INTO ... VALUES ();` statements, which are exactly the topic of [S99]–[S100]. (This comes from the HW2 handout, not from these slides.)

---

## 2. Slide-by-slide notes

### [S64] Outline
The Outline slide with **5 Cartesian Product** highlighted. The full list: 1 From Previous Week · 2 Query Languages · 3 SQL: The Basic Elements · 4 Structure of SQL Queries for Data Retrieval · **5 Cartesian Product** · 6 The Natural Join · 7 Modification of the Database · 8 In-Class Quiz #1 (Lecture 2).

### [S65] Cartesian Product on Relations (section title)
- Title: **"Cartesian Product on Relations"**. Subtitle: **"or: Unconditional Join ("comma")"**.
- In plain words: the next slides show that writing relations separated by a **comma** in `from` computes their Cartesian product. There is no matching condition, hence "unconditional".

### [S66] Basic Query Structure (DML clauses of SQL)
- "A typical SQL query has the form:" (blue box)
```sql
select A1, A2, ..., An
from r1, r2, ..., rm
where P is true;
```
- "Ai represents an attribute"
- "ri represents a relation"
- "P is a predicate over attributes of r1, r2, ..., rm."
- ⭐ "Note 1: **select**, **from**, and **where** are called clauses." ("clauses" is in blue.)
- ⭐ "Note 2: the result of a SQL query is a relation!" ("relation" is underlined.)
- ⭐ "Note 3: semicolon " ; " sometimes is missing."
- Why this slide is here: the list `r1, r2, ..., rm` in `from` is the comma that this section calls the Cartesian product. The same slide appears in part 1 as [S46].

### [S67] Queries on Multiple Relations — The "from" Clause
- "The **from** clause lists the relations in the query" ("the relations in the query" is underlined).
  - "on two relations, it corresponds to "Cartesian product" in the language of relational algebra." ("two relations" is underlined; "Cartesian product" is in blue.)
- Picture, "Relations r, s :"

r:

| A | B |
|---|---|
| α | 1 |
| β | 2 |

s:

| C | D | E |
|---|---|---|
| α | 10 | a |
| β | 10 | a |
| β | 20 | b |
| γ | 10 | b |

- ⭐ A red italic label "*Cartesian product of relations r and s*" has an arrow to "r x s :"

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

- Reading the picture: each of the 2 tuples of r is glued to each of the 4 tuples of s, giving 2 × 4 = **8 tuples**. The attributes are A, B (from r) plus C, D, E (from s), so **5 attributes**.
- ✅ `select * from r, s;` (the comma form from [S69]) returns exactly these 8 rows, in this order.

### [S68] Queries on Multiple Relations — The "from" Clause
- Only the task, in blue: "Find the Cartesian product *instructor* x *teaches*". The answer appears on the next slide; this is a pause for the class.

### [S69] Queries on Multiple Relations — The "from" Clause
- "Find the Cartesian product *instructor* x *teaches*"
```sql
select *
from instructor, teaches;
```
- ⭐ "**NB**: query above generates every possible *instructor–teaches* pairs, with all attributes from both relations." ("every possible" and "all" are underlined.)
- "For common attributes (e.g., *ID*), the attributes in the resulting table are renamed using the relation name (e.g., *instructor.ID*)" ("renamed" is underlined.)
- ⭐ "Remark: Cartesian product not very useful directly, but useful if combined with the **where** clause." ("Remark" and "directly" are underlined.)
- ✅ The result has 12 × 15 = **180 rows** and 4 + 5 = **9 columns**, with `ID` appearing twice. Only **15** of the 180 rows have `instructor.ID = teaches.ID`. Row 4, for example, pairs Srinivasan with Wu's FIN-201. See §5, E2.

### [S70] Examples
- The task, in blue: "Find the names of all instructors who have taught some course and the course_id"
- The result table on the slide:

| name | course_id |
|---|---|
| Srinivasan | CS-101 |
| Srinivasan | CS-315 |
| Srinivasan | CS-347 |
| Wu | FIN-201 |
| Mozart | MU-199 |
| Einstein | PHY-101 |
| El Said | HIS-351 |
| Katz | CS-101 |
| Katz | CS-319 |
| Crick | BIO-101 |
| Crick | BIO-301 |
| Brandt | CS-190 |
| Brandt | CS-190 |
| Brandt | CS-319 |
| Kim | EE-181 |

- "Brandt | CS-190" appears **twice** because Brandt taught section 1 *and* section 2 of CS-190 (see the teaches table on [S79]). SQL keeps duplicates: part 1 [S51] says "duplicates allowed in SQL queries' result".

### [S71] Examples (same task + the University DB schema diagram)
- The same task and table as [S70]. The University DB schema diagram is pasted over the lower part of the table.
- The relations as drawn in the diagram:
  - takes(ID, course_id, sec_id, semester, year, grade)
  - student(ID, name, dept_name, tot_cred)
  - section(course_id, sec_id, semester, year, building, room_no, time_slot_id)
  - course(course_id, title, dept_name, credits)
  - department(dept_name, building, budget)
  - advisor(s_id, i_id)
  - time_slot(time_slot_id, day, start_time, end_time)
  - classroom(building, room_no, capacity)
  - prereq(course_id, prereq_id)
  - instructor(ID, name, dept_name, salary)
  - teaches(ID, course_id, sec_id, semester, year)
- The arrows are foreign-key dependencies. Part 1 [S45]: "NB: only foreign key dependencies (i.e., foreign integrity constraints) are depicted (see arrows)".
- Attribute names read off the diagram that matter for joins in this section:
  - **ID**: instructor and teaches; student and takes.
  - **course_id**: teaches and course.
  - **dept_name**: instructor, course, department and student. This is the root of the [S86] trap.

### [S72] Examples
- Schema boxes: *instructor*(ID, name, dept_name, salary) and *teaches*(ID, course_id, sec_id, semester, year).
- Task 1 and its answer (the join condition is in **red**):
```sql
select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID;
```
- The result table at the right is the same 15-row table as on [S70].
- Task 2, in blue: "Find the names of all instructors in the Art department who have taught some course and the course_id". The answer is on [S73].
- ✅ The task-1 query returns exactly the 15 rows of the [S70] table, in the same order.

### [S73] Examples
- Both tasks with their answers. Task 2 (the where part is in red, with a bold red **and**):
```sql
select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID
        and  instructor. dept_name = 'Art';
```
- ⭐ "Note on *instructor.* : not necessary but useful ("good" coding' style)". An arrow points at the `instructor.` prefix of `dept_name`.
- Why it is "not necessary": `dept_name` is an attribute of instructor only, not of teaches, so it is unambiguous. `ID` is in both relations, so it must be written `instructor.ID` / `teaches.ID`. ✅ A bare `ID` gives `ambiguous column name: ID` (see E14).
- ⚠️ Typo: "coding' style" should be "coding style" (stray apostrophe). The SQL also has a space in `instructor. dept_name`. ✅ sqlite3 accepts the space anyway, but write `instructor.dept_name`.
- ✅ On the class data the result is **empty** (0 rows). The departments on the slides are Biology, Comp. Sci., Elec. Eng., Finance, History, Music and Physics; there is no 'Art'. Without the `instructor.` prefix the result is also 0 rows.

### [S74] Queries on Multiple Relations — The "from" Clause
- "In general, the meaning of a SQL query from two relations r and s can be understood as follows:" ("two" is underlined). ⭐ The steps are in a blue box:
  1. "Generate the Cartesian product of the relations r and s listed in the **from** clause (i.e., compute r x s)."
  2. "On the attributes of the result of step 1, apply the predicate P specified in the **where** clause."
  3. "For each tuple in the result of step 2, output the value of attributes specified in the **select** clause."
- ✅ Applied to the [S72] query:
  - step 1 gives 180 rows;
  - step 2 (`instructor.ID = teaches.ID`) keeps 15 rows;
  - step 3 outputs 15 rows of (name, course_id).

### [S75] Outline
The Outline slide with **6 The Natural Join** highlighted.

### [S76] The Natural Join (section title)
- "**The Natural Join**", then "or: How *not* to use the Cartesian Product!", then "Ch 3, T; subsection 3.3.3". There is also a picture of the textbook cover, *Database System Concepts*.
- ⭐ "*not*" is in italics. The natural join is presented as the way to avoid a raw Cartesian product. cf. textbook (T) Ch 3, §3.3.3.

### [S77] *Reminder*: Relational Operations
- "We concentrate on the following operations:"
  - "selection of tuples/rows," (red)
  - "projection (or: selection of attributes/columns)," (red)
  - "natural join," (**blue**)
  - "Cartesian product," (red)
  - "union," (red)
  - "set difference," (red)
  - "intersection." (**blue**)
- ⭐ "In blue are "derived" operations, that is, operations defined on other "primary" operations (in red)."
- So the **primary** operations are selection, projection, Cartesian product, union and set difference. The **derived** operations are natural join and intersection. This is the same list as part 1 [S7].

### [S78] Natural Join: Example
- "Relations r, s:". Here r = *instructor* and s = *department*.

r (instructor):

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

s (department):

| dept_name | building | budget |
|---|---|---|
| Biology | Watson | 90000 |
| Comp. Sci. | Taylor | 100000 |
| Elec. Eng. | Taylor | 85000 |
| Finance | Painter | 120000 |
| History | Painter | 50000 |
| Music | Packard | 80000 |
| Physics | Watson | 70000 |

- "r + s:"

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

- What the picture marks:
  - **blue** boxes around the `dept_name` header in both relations and in the result: this is the shared attribute;
  - an **orange** line from Srinivasan's "Comp. Sci." to the department row "Comp. Sci. | Taylor | 100000", and the same values boxed orange in the first result row;
  - a **yellow** box around the columns that come from r.
- Reading: each instructor tuple is glued to the one department tuple with the same `dept_name`, and `dept_name` appears **once** in the result. 12 instructor tuples give 12 result tuples.
- ⚠️ Notation: the slide writes "**r + s**" for the natural join. Part 1 [S12] uses the same "r + s". It does **not** mean addition or union. 🔎 Look up in Track B: the standard relational-algebra symbol for the natural join.
- ✅ `select * from instructor natural join department;` returns the same 12 tuples. sqlite3 lists the columns as ID, name, dept_name, salary, building, budget, so only the column order differs from the slide.

### [S79] Another Example: *instructor* and *teaches*
- "Relations r, s:". r = *instructor* (the same 12 tuples as on [S78]) and s = *teaches*:

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

- ⭐ "The only common attribute" ("common attribute" is underlined). Yellow arrows point to the **ID** column of both relations and of the result.
- "r + s:"

| ID | name | dept_name | salary | course_id | sec_id | semester | year |
|---|---|---|---|---|---|---|---|
| 10101 | Srinivasan | Comp. Sci. | 65000 | CS-101 | 1 | Fall | 2009 |
| 10101 | Srinivasan | Comp. Sci. | 65000 | CS-315 | 1 | Spring | 2010 |
| 10101 | Srinivasan | Comp. Sci. | 65000 | CS-347 | 1 | Fall | 2009 |
| 12121 | Wu | Finance | 90000 | FIN-201 | 1 | Spring | 2010 |
| 15151 | Mozart | Music | 40000 | MU-199 | 1 | Spring | 2010 |
| 22222 | Einstein | Physics | 95000 | PHY-101 | 1 | Fall | 2009 |
| 32343 | El Said | History | 60000 | HIS-351 | 1 | Spring | 2010 |
| 45565 | Katz | Comp. Sci. | 75000 | CS-101 | 1 | Spring | 2010 |
| 45565 | Katz | Comp. Sci. | 75000 | CS-319 | 1 | Spring | 2010 |
| 76766 | Crick | Biology | 72000 | BIO-101 | 1 | Summer | 2009 |
| 76766 | Crick | Biology | 72000 | BIO-301 | 1 | Summer | 2010 |
| 83821 | Brandt | Comp. Sci. | 92000 | CS-190 | 1 | Spring | 2009 |
| 83821 | Brandt | Comp. Sci. | 92000 | CS-190 | 2 | Spring | 2009 |
| 83821 | Brandt | Comp. Sci. | 92000 | CS-319 | 2 | Spring | 2010 |
| 98345 | Kim | Elec. Eng. | 80000 | EE-181 | 1 | Spring | 2009 |

- Colours: ID is in yellow and appears **once**. instructor's other columns are boxed blue; teaches' other columns are boxed orange.
- Reading: each of the 15 teaches tuples matches exactly one instructor by ID, giving 15 rows. **Gold (33456), Califieri (58583) and Singh (76543)** have no teaches tuple, so they disappear.
- ✅ `select * from instructor natural join teaches;` gives the same 15 rows and 8 columns.

### [S80] The "natural join" Clause
- Schema boxes: instructor and teaches.
- The task, in blue: "For all instructors who have taught some course [note: so you don't want all instructors!], find their names and course ID of all courses they taught"
- "Answer by using Cartesian product "controlled" by proper **where** is:"
```sql
select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID;
```
- ⭐ In a red dashed box: "Answer by Natural Join is:"
```sql
select name, course_id
from instructor natural join teaches;
```
- ✅ Both answers return the same 15 rows (the [S70] table); the set difference in both directions is 0 rows. The "[note: so you don't want all instructors!]" refers to Gold, Califieri and Singh, who never taught. They must not appear, and they don't. See E7.

### [S81] More on Natural Join
- "A SQL query can be of this form:"
```sql
select A1, A2, ..., An
from r1 natural join r2 … natural join rm
where P on attributes in r1 r2 … rm is true;
```
- In plain words: this is the [S66] form with the commas in `from` replaced by `natural join`.

### [S82] More on Natural Join
- "**Example**: "List the names of instructors along with the title of courses that they teach"."
- The University schema diagram is shown again (as on [S71]). The query needs three relations: *instructor* (name), *teaches* (who teaches what) and *course* (title).

### [S83] More on Natural Join
- Schema boxes: *instructor*(ID, name, dept_name, salary), *teaches*(ID, course_id, sec_id, semester, year), *course*(course_id, title, dept_name, credits).
- The example and its answer (the where condition is in red):
```sql
select name, title
from instructor natural join teaches, course
where teaches.course_id = course.course_id;
```
- Reading: the `natural join` connects instructor and teaches on ID. The comma + `where` connects that result to course on **course_id only**.
- ✅ 15 rows. The output is in §5, E8.

### [S84] Join Conditions (section title)
- "**Join Conditions**", then "Ch 4, T; section 4.1", plus the textbook cover. cf. textbook (T) Ch 4, §4.1.
- From here on, the slide header shows "The Natural Join | Join Conditions".

### [S85] Example (*cont.*) - The "using" Clause
- The task: "List names of instructors along with title of courses that they teach"
- "Answer by using Natural Join plus Cartesian product "controlled" by proper **where** is:". Yellow arrows connect "Natural Join" to `natural join` and "Cartesian product" to the comma.
```sql
select name, title
from instructor natural join teaches, course
where teaches.course_id = course.course_id;
```
- ⭐ "Answer by a sequence of joins with new clause **using** is:" (`join` and `using` are in red bold)
```sql
select name, title
from instructor natural join teaches join course using course_id;
```
- Reading: `join course using course_id` joins with course on **course_id only**, which is what the English question needs.
- ⚠️ ✅ Run verbatim, sqlite3 reports `Parse error: near "course_id": syntax error`. It runs with parentheses, `... join course using (course_id);`, and gives the same 15 rows as the first answer. 🔎 Look up in Track B: MySQL's exact `USING (…)` syntax.

### [S86] Important Remarks
- The task, with **names** and **title** boxed in red: "List names of instructors along with title of courses that they teach". (`name, title` is also boxed red in the first two queries.)
```sql
select name, title
from instructor natural join teaches, course
where teaches.course_id = course.course_id;

select name, title
from instructor natural join teaches join course using course_id;

select name, title
from instructor natural join teaches natural join course;
```
- ⭐ The second `natural join` of the third query is in **red**, with a red arrow. A red box says "**NB:** *conceptually different*". Under the third query, in blue italics with an arrow: "*This is a wrong SQL code for the English query above!*"
- ⚠️ **TRAP: an unintended common attribute.** From the schema boxes on the slide:
  - *instructor* natural join *teaches* (common attribute: ID) has attributes ID, name, **dept_name**, salary, **course_id**, sec_id, semester, year.
  - *course* has **course_id**, title, **dept_name**, credits.
  - So the second natural join matches on **course_id and dept_name**. It silently adds the condition "instructor's dept_name = course's dept_name": an instructor would be listed with a course only if the course belongs to the instructor's own department. The English question does not ask for that, so the query is wrong.
- ✅ **On the class data all three queries return the same 15 rows.** Every instructor in the sample teaches only courses of their own department (the check is in E10). So you **cannot** see this bug in the output; you catch it by listing the common attribute names.

### [S87] Important Remarks
- The task: "List all data of instructors along with title of courses that they teach" ("all data of instructors" is in red).
```sql
select *
from instructor natural join teaches, course
where teaches.course_id = course.course_id;

select *
from instructor natural join teaches join course using course_id;

select *
from instructor natural join teaches natural join course;
```
- ⭐ A red box "**NB1:** *not equivalent in schema!*" has arrows to the boxed `*` of the **first two** queries. A red box "**NB2:** *conceptually different*" points at the third query. The slide repeats "*This is a wrong SQL code for the English query above!*"
- ✅ Verified columns:
  - **Query 1** (12 columns): ID, name, dept_name, salary, course_id, sec_id, semester, year, **course_id**, title, **dept_name**, credits. course_id appears twice.
  - **Query 2** (11 columns): ID, name, dept_name, salary, course_id, sec_id, semester, year, title, **dept_name**, credits. course_id appears once.
  - **Query 3** (10 columns): ID, name, dept_name, salary, course_id, sec_id, semester, year, title, credits. **dept_name appears only once, which proves it was used as a join attribute.**
  - All three return 15 rows on the class data.

### [S88] Join Conditions - "on"
- Schema boxes: *student*(ID, name, dept_name, tot_cred) and *takes*(ID, course_id, sec_id, semester, year, grade).
- "Consider the following SQL query:" (**on** is in red)
```sql
select *
from student join takes on student.ID = takes.ID;
```
- "It's similar to the following SQL query:"
```sql
select *
from student natural join takes;
```
- ⭐ "with the only difference of duplicating the *ID*'s column attributes in the resulting relation." ("with the only difference" is underlined.)
- ✅ Both queries return **22 rows**. `join … on` gives **10 columns** (ID twice); `natural join` gives **9 columns** (ID once).

### [S89] Join Conditions - "on"
- "Reconsider the SQL query:"
```sql
select *
from student join takes on student.ID = takes.ID;
```
- ⭐ "It's equivalent to the following SQL query:" ("equivalent" is underlined; **where** is in red)
```sql
select *
from student, takes
where student.ID = takes.ID;
```
- "We can avoid duplication of *IDs* by the clause **as**."
- ✅ Same 22 rows and the same 10 columns; the set difference in both directions is 0 rows.
- 🧠 The two words to remember: `join … on` is **similar** to the natural join [S88] but **equivalent** to comma + where [S89].

### [S90] join…on + **as**
```sql
select * as ID, name, dept_name, tot_cred, course_id, sec_id, semester, year, grade
from student join takes on student.ID = takes.ID;
```
- Picture: a red arrow goes from the result's single **ID** column (boxed orange) up to the `ID` after `as`. Another arrow goes from that column to `student.ID = takes.ID`.
- The result on the slide (22 rows, ID once):

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
| 76543 | Brown | Comp. Sci. | 58 | CS-101 | 1 | Fall | 2009 | A |
| 76543 | Brown | Comp. Sci. | 58 | CS-319 | 2 | Spring | 2010 | A |
| 76653 | Aoi | Elec. Eng. | 60 | EE-181 | 1 | Spring | 2009 | C |
| 98765 | Bourikas | Elec. Eng. | 98 | CS-101 | 1 | Fall | 2009 | C- |
| 98765 | Bourikas | Elec. Eng. | 98 | CS-315 | 1 | Spring | 2010 | B |
| 98988 | Tanaka | Biology | 120 | BIO-101 | 1 | Summer | 2009 | A |
| 98988 | Tanaka | Biology | 120 | BIO-301 | 1 | Summer | 2010 | *null* |

- ⚠️ `select * as ID, ...` cannot run. ✅ sqlite3 reports `Parse error: near "as": syntax error`.
- Corrected using the slide's own two ideas: rename with `as`, and qualify a common attribute with its relation name as on [S69]:
```sql
select student.ID as ID, name, dept_name, tot_cred, course_id, sec_id, semester, year, grade
from student join takes on student.ID = takes.ID;
```
- ✅ This returns exactly the 22-row, 9-column table above. A bare `ID` fails with `ambiguous column name: ID`.

### [S91] Join Expressions
- "**Join operations** (in form of join expressions) take two relations and return as a result another relation." ("Join operations" is in blue bold.)
- ⭐ In a blue box: "**Def**: A **join** operation is a Cartesian product A x B which requires that tuples in the relations A and B match *under some condition*." ("join" is red; "under some condition" is red italic.)
  - "A join operation always specify the attributes that are present in the result of the join."
- "The join operations are typically used as subquery expressions in the **from** clause."
- ⚠️ Grammar: "always specify" should be "always specifies".
- How this connects to the earlier slides:
  - the comma is A x B with **no** condition [S65];
  - the natural join's condition is "the common attributes are equal" [S79];
  - `using` puts the condition on the named attribute [S85];
  - `on` takes any predicate [S88].

### [S92] "We'll see more on Join Expressions."
One italic sentence. The topic continues in Week 6: [W6 S6] is titled "Join Expressions (cont.)".

### [S93] Outline
The Outline slide with **7 Modification of the Database** highlighted.

### [S94] Modification of the Database (section title)
"**Modification of the Database**", then "Ch 3, T; section 3.9", plus the textbook cover. cf. textbook (T) Ch 3, §3.9.

### [S95] Deletion
- Schema boxes: *department*(dept_name, building, budget) and *instructor*(ID, name, dept_name, salary).
- "Delete all instructors"
```sql
delete from instructor
```
- "Delete all instructors from the Finance department"
```sql
delete from instructor
where dept_name= 'Finance';
```
- The first statement has no `;` on the slide; cf. [S66] Note 3: "semicolon sometimes is missing".
- ✅ `delete from instructor` removes **all 12** tuples. The table itself stays and is now empty. Part 1 [S41]: "the command delete from will delete ALL data tuples"; part 1 [S39]: `drop table` is "a more drastic action".
- ✅ The Finance version removes **2** tuples (12121 Wu, 76543 Singh), leaving 10.

### [S96] Deletion: Example
- The task: "Delete all tuples in the *instructor* relation for those instructors associated with a department located in the Watson building"
- ⭐ "?" is a question to the class; the answer is on [S97].
- Schema boxes: department and instructor (the building is in department, the instructor is in instructor).

### [S97] Example (*cont.*)
- The same task. The answer (*instructor* and *department* are written in red):
```sql
delete from instructor
where dept_name in (select dept_name
                    from department
                    where building = 'Watson');
```
- Reading: the inner select finds the departments located in Watson. The outer delete removes every instructor whose dept_name is in that set.
- ✅ The Watson departments are **Biology and Physics**. The statement deletes 22222 Einstein, 33456 Gold and 76766 Crick (**3** tuples), leaving 9.

### [S98] Deletion : An Issue (*to be careful about*)
- The task: "Delete all instructors whose salary is less than the average salary of instructors"
```sql
delete from instructor
where salary < (select avg (salary)
                from instructor);
```
- The annotation reads "I.e., check **where** condition".
- ⭐ "Problem: as we delete tuples from *instructor*, the average salary changes" ("Problem" is underlined). Yellow arrows go from "Problem" to `salary <` and to the inner `from instructor`.
- ⭐ "Solution used in SQL:
  1. First, compute **avg** (salary) and find all tuples to delete
  2. Next, delete all tuples found above (without recomputing **avg** or retesting the tuples)"

  ("find all tuples to delete" is underlined, and a yellow arrow links it to "I.e., check where condition".)
- ✅ The average is 74,833.33, so **5** instructors are deleted: Mozart 40000, El Said 60000, Califieri 62000, Srinivasan 65000, Crick 72000. 7 remain, and the new average is **85,571.43**. That change is the "Problem".
- ✅ Running the **same statement again** would delete 3 more (Katz, Singh, Kim), then 2, then 1, until only Einstein is left. This is why SQL computes the average once. Details are in E17.
- 🔎 Look up in Track B: MySQL (our lab DBMS) may reject a DELETE whose subquery reads the same table it deletes from. I could not test this here (no MySQL on this machine); sqlite3 runs it as shown.

### [S99] Insertion (of plain data)
- "Add a new tuple to *course*"
```sql
insert into course
      values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);
```
- "or equivalently". The annotation, with an arrow to the column list (which is in red), says: "*course*'s attributes repeated for the shake of remembering" ("repeated" is underlined).
```sql
insert into course (course_id, title, dept_name, credits)
      values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);
```
- "Add a new tuple to *student* with *tot_creds* set to *null*" (the column list is in red)
```sql
insert into student (ID, name, dept_name, tot_credits)
      values ('3003', 'Green', 'Finance', null);
```
- ⚠️ Typos:
  - "for the **shake** of remembering" should be "sake".
  - "*tot_creds*" / `tot_credits` should be **`tot_cred`**. That is the name in the student box on [S88], [S89], [S101] and [S105] and in the result header on [S90].
  - ✅ Verbatim, sqlite3 reports `table student has no column named tot_credits`. With `tot_cred` it inserts 1 row and tot_cred is null.
- ✅ Each course insert adds 1 tuple (course goes from 13 to 14 rows). The two forms are **alternatives**: running both gives `UNIQUE constraint failed: course.course_id`, because course_id is the key (underlined).
- Without the column list, the values follow the order of course's attributes. Part 1 [S42]: "the values are specified in the order in which the corresponding attributes are listed in the relation schema." With the list, the values follow the order of the list.
- The slides typeset quotes as ‘…’; in code they are plain '…'.

### [S100] Insertion (of plain data)
- "To insert partial data… see SQL manual…"
- "For instance, *mySQL*:"
```
INSERT [LOW_PRIORITY | DELAYED | HIGH_PRIORITY] [IGNORE]
    [INTO] tbl_name
    [(col_name [, col_name] ...)]
    {VALUES | VALUE} (value_list) [, (value_list)] ...
```
- ⭐ A red box surrounds `[, (value_list)]`, followed by `...`: one INSERT can carry **several** value lists, that is, several tuples.
- "Source: https://dev.mysql.com/doc/refman/5.5/en/insert.html"
- The box, read in plain words: `INSERT`, optional words, optional `INTO`, the table name, an optional list of column names, `VALUES` or `VALUE`, one value list in parentheses, then optionally more `, (value_list)` groups.
- 🔎 Look up in Track B:
  - the manual's notation ([ ] = optional, { | } = choose one, ... = repeat);
  - how "partial data" (naming only some columns) fills the remaining columns.
- HW2 link: Exercise 3 asks for files of `INSERT INTO ... VALUES ();` statements in MySQL (HW2 handout).

### [S101] Insertion (from other table)
- ⭐ "What is the meaning of following query?" is a question to the class. (**select** is in red.)
```sql
insert into instructor
      select ID, name, dept_name, 20000
      from student
      where dept_name = 'Comp.Sci' and tot_cred > 145;
```
- ⭐ "**Note 1**: "select" allows to insert a set of tuples." ("set" is underlined.)
- ⭐ "**Note 2**: "select" must be evaluated before insertions. (otherwise an *insertion loop* arises)" (**select** is in blue.)
```sql
insert into student
      select *
      from student;
```
- Schema boxes: *student*(ID, name, dept_name, tot_cred) and *instructor*(ID, name, dept_name, salary).
- The meaning, read from the query: every Comp. Sci. student with more than 145 total credits is added to *instructor* with the same ID, name and dept_name. The constant 20000 fills the fourth attribute, **salary**.
- ⚠️ The string `'Comp.Sci'` does not equal the data value **'Comp. Sci.'** ([S78], [S90]).
- ✅ The statement inserts **0 rows** on the class data:
  - the string never matches;
  - even with 'Comp. Sci.', nobody qualifies: the Comp. Sci. students are Zhang 102, Shankar 32, Williams 54 and Brown 58, and the highest tot_cred of any student is 120.
- ✅ Note 2, demonstrated:
  - With ID as the key (underlined), sqlite3 reports `UNIQUE constraint failed: student.ID` and inserts nothing.
  - On a copy of student **without** a key, the rows double **exactly once** (12 → 24). The select was evaluated first, so there was no loop.

### [S102] Updates (to change *some* values)
- The task: "Increase salaries of instructors whose salary is over $100,000 by 3%, and all others by a 5%"
- ⭐ "?" is a question to the class; the answers are on [S103] and [S104].

### [S103] Updates (to change *some* values)
- "We can write two **update** statements in sequence:"
```sql
update instructor
set salary = salary * 1.03
where salary > 100000;

update instructor
set salary = salary * 1.05
where salary <= 100000;
```
- ⭐ "The order of above updates is important! (Why?)"
- ⭐ "Can be done better using the **case** statement."
- Answer to "(Why?)", reasoning only from the two statements:
  - Suppose the 5% statement ran **first**. A salary just below 100,000, more precisely above 100000 / 1.05 ≈ **95,238.10**, would rise above 100,000. It would then match `salary > 100000` in the 3% statement and get **both** raises.
  - In the slide's order (3% first), a salary above 100,000 only grows, so it can never match `salary <= 100000` afterwards. Every tuple is raised exactly once.
- ✅ On the class data the 3% statement changes **0 rows** (nobody earns over 100,000). The 5% statement changes all **12**. The reversed order happens to give the same result here, because the top salary is 95,000 × 1.05 = 99,750. The "danger zone" between 95,238.10 and 100,000 is empty in this data. See E20.

### [S104] "Case" Statement for *Conditional* Updates
- The same task.
```sql
update instructor
set salary = case
                when salary <= 100000 then salary * 1.05
                else salary * 1.03
             end;
```
- Reading: the table is updated in one pass. For each tuple, `case` picks the factor from the **old** salary, so there is no order problem.
- ✅ 12 rows are updated, with exactly the same new salaries as [S103]. The table is in E20.

### [S105] Updates with Scalar Subqueries
- "Recompute and update *tot_creds* value for all students:"
```sql
update student S
set tot_cred = (select sum(credits)
                from takes, course
                where takes.course_id = course.course_id
                  and S.ID = takes.ID
                  and takes.grade <> 'F'
                  and takes.grade is not null);
```
- ⭐ Labels and marks on the slide:
  - blue labels "**S: correlation name**" (arrow to the `S` after `update student`) and "**ID: correlation variable**" (arrow to `S.ID`);
  - "**Scalar**" in the title is underlined, with a red arrow to a red box around `select sum(credits)`;
  - the subquery is wrapped in red parentheses;
  - red boxes mark *tot_cred* (student), *credits* (course) and *grade* (takes).
- "Update sets *tot_creds* to *null* if *takes.grade* is *null*."
- Reading: for each student row S, the subquery adds up the credits of S's courses (takes joined to course on course_id) whose grade is not 'F' and not null. That single number goes into tot_cred.
- ✅ Results (Green, inserted per [S99], included): Zhang 7, Shankar 14, Brandt 3, Chavez 3, Peltier 4, **Levy 7** (the F is not counted), Williams 8, Sanchez 3, Brown 7, Aoi 3, Bourikas 7, **Tanaka 4** (the null grade is not counted), **Green null**. The full table is in E22.
- ⚠️ Problems on the slide:
  1. The prose says "tot_creds"; the attribute is `tot_cred` (the query itself is right).
  2. "sets tot_creds to null if takes.grade is null" is **imprecise**. ✅ Tanaka has a null grade but gets 4. tot_cred becomes null only when **none** of the student's takes rows qualifies, as for Green, who has no takes rows. 🔎 Look up in Track B: what `sum` returns when no row qualifies.
  3. ✅ sqlite3 rejects `update student S` with `near "S": syntax error`. It runs as `update student as S`. 🔎 Look up in Track B: whether MySQL accepts the alias as written.
- The new values are small (Zhang 102 → 7) because the slides' takes table lists only a few courses per student.

### [S106] Outline
The Outline slide with **8 In-Class Quiz #1 (Lecture 2)** highlighted.

### [S107] In-Class Quiz #1 (section title)
"**In-Class Quiz #1**", then "(LECTURE 2)".

### [S108] In-Class Quiz #1 (Lecture 2)
- ⭐ "*Only for students who submitted Homework Assignment #1.*" and "No slides provided for Quiz #1".
- (The HW2 handout has the same kind of rule for Quiz 2: "Deadline passed without submission implies mark 0 (zero). (Equivalently, you will not be admitted to enter the classroom for Quiz 2.)")

### [S109] Summary
The 8 section titles, all in red: From Previous Week · Query Languages · SQL: The Basic Elements · Structure of SQL Queries for Data Retrieval · Cartesian Product · The Natural Join · Modification of the Database · In-Class Quiz #1 (Lecture 2).

### [S110] End of Slides
"DATABASE", "End of Slides", "WEEK 5", "Code: W5.L1L2[QUIZ#1]".

---

## 3. Definitions & key terms (word for word)

| Term | Exact words on the slide | Slide |
|---|---|---|
| Basic query form | "A typical SQL query has the form: select A1, A2, ..., An from r1, r2, ..., rm where P is true;" | [S66] |
| Ai, ri, P | "Ai represents an attribute" · "ri represents a relation" · "P is a predicate over attributes of r1, r2, ..., rm." | [S66] |
| Clauses | "select, from, and where are called clauses." | [S66] |
| Result of a query | "the result of a SQL query is a relation!" | [S66] |
| Unconditional join | "Cartesian Product on Relations or: Unconditional Join ("comma")" | [S65] |
| from clause | "The from clause lists the relations in the query" | [S67] |
| Cartesian product (SQL ↔ relational algebra) | "on two relations, it corresponds to "Cartesian product" in the language of relational algebra." | [S67] |
| What the comma query produces | "query above generates every possible instructor–teaches pairs, with all attributes from both relations." | [S69] |
| Common attributes in a product | "For common attributes (e.g., ID), the attributes in the resulting table are renamed using the relation name (e.g., instructor.ID)" | [S69] |
| Usefulness of the product | "Cartesian product not very useful directly, but useful if combined with the where clause." | [S69] |
| Meaning of a query on two relations | "1. Generate the Cartesian product of the relations r and s listed in the from clause (i.e., compute r x s). 2. On the attributes of the result of step 1, apply the predicate P specified in the where clause. 3. For each tuple in the result of step 2, output the value of attributes specified in the select clause." | [S74] |
| Primary vs derived operations | "In blue are "derived" operations, that is, operations defined on other "primary" operations (in red)." (blue: natural join, intersection) | [S77] |
| Natural join | No verbal definition in this range. Shown by example: the tuples are matched on "The only common attribute" (ID), which appears once in "r + s". The SQL form is "from r1 natural join r2 … natural join rm". 🔎 Track B: a formal definition. | [S78], [S79], [S81] |
| Controlled Cartesian product | "Answer by using Cartesian product "controlled" by proper where is:" | [S80], [S85] |
| using | "Answer by a sequence of joins with new clause using is:" | [S85] |
| "Conceptually different" | "NB: conceptually different" · "This is a wrong SQL code for the English query above!" | [S86], [S87] |
| Not equivalent in schema | "NB1: not equivalent in schema!" | [S87] |
| on vs natural join | "It's similar to the following SQL query: … with the only difference of duplicating the ID's column attributes in the resulting relation." | [S88] |
| on vs comma + where | "It's equivalent to the following SQL query: select * from student, takes where student.ID = takes.ID;" | [S89] |
| as | "We can avoid duplication of IDs by the clause as." | [S89] |
| Join operations | "Join operations (in form of join expressions) take two relations and return as a result another relation." | [S91] |
| **Join (Def)** | "Def: A join operation is a Cartesian product A x B which requires that tuples in the relations A and B match under some condition." | [S91] |
| Attributes of a join | "A join operation always specify the attributes that are present in the result of the join." | [S91] |
| Where joins are used | "The join operations are typically used as subquery expressions in the from clause." | [S91] |
| Deletion issue | "Problem: as we delete tuples from instructor, the average salary changes" | [S98] |
| SQL's solution | "Solution used in SQL: 1. First, compute avg (salary) and find all tuples to delete 2. Next, delete all tuples found above (without recomputing avg or retesting the tuples)" | [S98] |
| Partial insert | "To insert partial data… see SQL manual…" | [S100] |
| Insert from select | "Note 1: "select" allows to insert a set of tuples." | [S101] |
| Insertion loop | "Note 2: "select" must be evaluated before insertions. (otherwise an insertion loop arises)" | [S101] |
| Order of updates | "The order of above updates is important! (Why?)" · "Can be done better using the case statement." | [S103] |
| Conditional update | ""Case" Statement for Conditional Updates" (title) | [S104] |
| Scalar subquery update | "Updates with Scalar Subqueries" (title) | [S105] |
| Correlation name | "S: correlation name" | [S105] |
| Correlation variable | "ID: correlation variable" | [S105] |
| Null result of the recompute | "Update sets tot_creds to null if takes.grade is null." (⚠️ imprecise, see [S105]) | [S105] |
| Quiz #1 rule | "Only for students who submitted Homework Assignment #1. No slides provided for Quiz #1" | [S108] |

---

## 4. Join & modification reference (as taught)

### 4.1 Ways to combine two relations

The ✅ column gives the result on the class data.

| Form (slide wording) | Pattern on the slides | What gets matched | Common attribute in the output | Slide example | ✅ |
|---|---|---|---|---|---|
| Cartesian product / "unconditional join ("comma")" | `from instructor, teaches` | nothing: every pair | **twice** (instructor.ID, teaches.ID) | [S67], [S69] | 12×15 = 180 rows, 9 columns |
| Cartesian product "controlled" by proper where | `from instructor, teaches where instructor.ID = teaches.ID` | the where predicate | twice | [S72], [S80] | 15 rows |
| natural join | `from instructor natural join teaches` | **all** attributes with the same name | **once** | [S79]–[S81], [S83] | 15 rows, 8 columns |
| join … using | `join course using course_id` (sqlite3 needs `using (course_id)`) | **only** the named attribute | once | [S85] | 15 rows |
| join … on | `from student join takes on student.ID = takes.ID` | the on predicate | **twice** | [S88], [S89] | 22 rows, 10 columns |
| join … on + as | `select * as ID, …` on the slide (⚠️ invalid); runs as `select student.ID as ID, name, …` | the on predicate | once (because you list the columns) | [S90] | 22 rows, 9 columns |

The equivalences the slides state:
- `join … on` ≡ comma + where [S89];
- `join … on` ≈ natural join, except that the ID column is duplicated [S88];
- natural-join answer = controlled-product answer for the instructor/teaches task [S80].

### 4.2 Modification statements

| Statement | Pattern on the slides | Slide | ✅ Effect on the class data |
|---|---|---|---|
| delete everything | `delete from instructor` | [S95] | 12 → 0 tuples (the table remains) |
| delete with where | `delete from instructor where dept_name= 'Finance';` | [S95] | −2 (Wu, Singh) |
| delete with `in (select …)` | `delete from instructor where dept_name in (select dept_name from department where building = 'Watson');` | [S97] | −3 (Einstein, Gold, Crick) |
| delete with an aggregate of the same table | `delete from instructor where salary < (select avg (salary) from instructor);` | [S98] | −5 (avg computed once: 74,833.33) |
| insert values (attribute order) | `insert into course values (…);` | [S99] | +1 (course: 13 → 14) |
| insert values (named columns) | `insert into course (course_id, title, dept_name, credits) values (…);` | [S99] | +1 (same tuple) |
| insert with null | `insert into student (ID, name, dept_name, tot_credits) values ('3003', 'Green', 'Finance', null);` | [S99] | ⚠️ needs `tot_cred` → +1 |
| MySQL insert syntax | `{VALUES or VALUE} (value_list) [, (value_list)] ...` (several tuples) | [S100] | — |
| insert from select | `insert into instructor select ID, name, dept_name, 20000 from student where …;` | [S101] | +0 (nobody qualifies) |
| insert from the same table | `insert into student select * from student;` | [S101] | key → error; no key → 12 → 24 (no loop) |
| update with where | `update instructor set salary = salary * 1.03 where salary > 100000;` then `… * 1.05 where salary <= 100000;` | [S103] | 0 rows, then 12 rows |
| conditional update | `update instructor set salary = case when salary <= 100000 then salary * 1.05 else salary * 1.03 end;` | [S104] | 12 rows, same as [S103] |
| update with a scalar subquery | `update student S set tot_cred = (select sum(credits) from takes, course where … and S.ID = takes.ID …);` | [S105] | 13 rows recomputed (Green → null) |

---

## 5. Every query example from class, worked out

### 5.0 Trap sheet (wrong vs right, as shown on the slides)

**Trap 1: the raw Cartesian product** [S69], [S76], [S80]
- Wrong for "names of instructors who taught some course and the course_id":
```sql
select *
from instructor, teaches;
```
  It gives "every possible instructor–teaches pairs". ✅ That is 180 rows, and 165 of them pair an instructor with someone else's course.
- Right, either form ([S72]/[S80] and [S80]):
```sql
select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID;
```
```sql
select name, course_id
from instructor natural join teaches;
```
  ✅ Both return 15 rows.

**Trap 2: an unintended common attribute in a chain of natural joins** [S86]
- Wrong:
```sql
select name, title
from instructor natural join teaches natural join course;
```
  The slides say "NB: conceptually different" and "This is a wrong SQL code for the English query above!"
- Right ([S83]/[S85]):
```sql
select name, title
from instructor natural join teaches, course
where teaches.course_id = course.course_id;
```
```sql
select name, title
from instructor natural join teaches join course using course_id;
```
- Why: (instructor natural join teaches) and course share **course_id and dept_name**. That gives a hidden extra condition: instructor.dept_name = course.dept_name.
- ✅ On the class data all three return the same 15 rows. The bug is in the **meaning**, and the output does not show it.

**Trap 3: same rows, different schema** [S87] NB1
- With `select *`:
  - comma + where keeps `course_id` **twice** (12 columns);
  - `join … using` keeps it **once** (11 columns);
  - the wrong natural join also merges `dept_name` (10 columns).

**Trap 4: join … on vs natural join** [S88]
- Same 22 rows, but `on` keeps **both** ID columns: 10 columns instead of 9.

**Trap 5: `select * as …`** [S90]
- It is not runnable. Name the columns and rename the qualified one: `select student.ID as ID, name, …`.

**Trap 6: delete compared with an aggregate of the same table** [S98]
- SQL computes the average once, finds all the tuples, then deletes them. If the average were recomputed, the result would change.

**Trap 7: insert … select from the same table** [S101] Note 2
- The select is evaluated first; otherwise "an insertion loop arises".

**Trap 8: the order of two updates** [S103]
- The 3% statement must come first, otherwise salaries between 95,238.10 and 100,000 get both raises. Alternatively, use `case` [S104].

**(Verification finding) String constants must match the data exactly** [S73], [S101]
- `'Art'` (no such department) and `'Comp.Sci'` (the data says 'Comp. Sci.') both give **empty** results.

---

### E1 — r × s [S67]
- Question: the Cartesian product of r(A, B) and s(C, D, E).
- SQL (the comma form from [S69]): `select * from r, s;`
- Evaluation: every r tuple × every s tuple = 2 × 4 = 8 tuples; 2 + 3 = 5 attributes.
- ✅ Output: identical to the 8-row table on [S67], in the same order.

### E2 — instructor × teaches [S68], [S69]
- Question: "Find the Cartesian product instructor x teaches"
```sql
select *
from instructor, teaches;
```
- ✅ 180 rows (12 × 15) and 9 columns (4 + 5). The first 5 rows:

| ID | name | dept_name | salary | ID | course_id | sec_id | semester | year |
|---|---|---|---|---|---|---|---|---|
| 10101 | Srinivasan | Comp. Sci. | 65000 | 10101 | CS-101 | 1 | Fall | 2009 |
| 10101 | Srinivasan | Comp. Sci. | 65000 | 10101 | CS-315 | 1 | Spring | 2010 |
| 10101 | Srinivasan | Comp. Sci. | 65000 | 10101 | CS-347 | 1 | Fall | 2009 |
| 10101 | Srinivasan | Comp. Sci. | 65000 | 12121 | FIN-201 | 1 | Spring | 2010 |
| 10101 | Srinivasan | Comp. Sci. | 65000 | 15151 | MU-199 | 1 | Spring | 2010 |

- Rows 4 and 5 pair Srinivasan with Wu's and Mozart's courses, which is meaningless. ✅ Only 15 of the 180 rows have equal IDs; 165 do not.
- The sqlite3 header prints both columns as plain `ID`. In SQL you refer to them as `instructor.ID` and `teaches.ID` [S69].

### E3 — names + course_id [S70]–[S72], [S74]
- Question: "Find the names of all instructors who have taught some course and the course_id"
```sql
select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID;
```
- Evaluation [S74]:
  1. instructor × teaches = 180 rows;
  2. keep `instructor.ID = teaches.ID`, which leaves 15 rows;
  3. output (name, course_id).
- ✅ Output: exactly the 15-row table on [S70], with Brandt | CS-190 twice (two sections).

### E4 — the Art department [S72], [S73]
```sql
select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID
        and  instructor. dept_name = 'Art';
```
- Evaluation: same as E3, plus a second condition on the instructor's department.
- ✅ Output: **0 rows**, because there is no 'Art' department in the slides' data. The same is true without the `instructor.` prefix (dept_name is unambiguous).
- Trap: the space in `instructor. dept_name` is harmless in sqlite3; "coding' style" is a typo.

### E5 — instructor natural join department [S78]
- SQL (the [S80] pattern): `select * from instructor natural join department;`
- Evaluation: the only common attribute is **dept_name**. Each instructor matches exactly one department, so the result has 12 tuples. For comparison: instructor × department = 84 rows, of which 12 have equal dept_name.
- ✅ Output: the same 12 tuples as the slide's "r + s". sqlite3's column order is ID, name, dept_name, salary, building, budget; the slide shows ID, name, salary, dept_name, building, budget. For example, Kim → Taylor, 85000.
- With comma + where instead, the output would have dept_name **twice** (7 columns instead of 6).

### E6 — instructor natural join teaches [S79]
- SQL: `select * from instructor natural join teaches;`
- Evaluation: the common attribute is **ID** ("The only common attribute"). There are 15 teaches tuples and each matches 1 instructor.
- ✅ Output: the 15-row, 8-column table on [S79]. Gold, Califieri and Singh are absent (they never taught).

### E7 — two answers to the same question [S80]
- Question: "For all instructors who have taught some course [note: so you don't want all instructors!], find their names and course ID of all courses they taught"
```sql
select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID;
```
```sql
select name, course_id
from instructor natural join teaches;
```
- ✅ Both give the 15 rows of [S70]. Rows only in the first query: 0; rows only in the second: 0. The instructors who are **not** listed: 33456 Gold, 58583 Califieri, 76543 Singh.

### E8 — names + titles, the correct version 1 [S83], [S85]
- Question: "List the names of instructors along with the title of courses that they teach"
```sql
select name, title
from instructor natural join teaches, course
where teaches.course_id = course.course_id;
```
- Evaluation [S74], with the from clause holding (instructor natural join teaches) and course:
  1. (instructor natural join teaches) has 15 rows; × course (13 rows) gives **195** rows;
  2. the where clause keeps 15;
  3. output (name, title).
- ✅ Output (course titles from [W6 S45]):

| name | title |
|---|---|
| Srinivasan | Intro. to Computer Science |
| Srinivasan | Robotics |
| Srinivasan | Database System Concepts |
| Wu | Investment Banking |
| Mozart | Music Video Production |
| Einstein | Physical Principles |
| El Said | World History |
| Katz | Intro. to Computer Science |
| Katz | Image Processing |
| Crick | Intro. to Biology |
| Crick | Genetics |
| Brandt | Game Design |
| Brandt | Game Design |
| Brandt | Image Processing |
| Kim | Intro. to Digital Systems |

### E9 — names + titles, the correct version 2: `using` [S85]
```sql
select name, title
from instructor natural join teaches join course using course_id;
```
- ✅ Verbatim, sqlite3 reports `Parse error: near "course_id": syntax error`. With `using (course_id)` it returns the same 15 rows as E8.
- Trap: `using` joins on course_id **only**, unlike a natural join with course.

### E10 — names + titles, the WRONG version [S86]
```sql
select name, title
from instructor natural join teaches natural join course;
```
- Evaluation: the common attributes of (instructor natural join teaches) and course are **course_id and dept_name**. So the query also requires the instructor's department to equal the course's department.
- ✅ Output: 15 rows, **identical** to E8, because on the class data every teaching row already satisfies the extra condition:

| name | course_id | instructor's dept_name | course's dept_name |
|---|---|---|---|
| Srinivasan | CS-101 | Comp. Sci. | Comp. Sci. |
| Srinivasan | CS-315 | Comp. Sci. | Comp. Sci. |
| Srinivasan | CS-347 | Comp. Sci. | Comp. Sci. |
| Wu | FIN-201 | Finance | Finance |
| Mozart | MU-199 | Music | Music |
| Einstein | PHY-101 | Physics | Physics |
| El Said | HIS-351 | History | History |
| Katz | CS-101 | Comp. Sci. | Comp. Sci. |
| Katz | CS-319 | Comp. Sci. | Comp. Sci. |
| Crick | BIO-101 | Biology | Biology |
| Crick | BIO-301 | Biology | Biology |
| Brandt | CS-190 | Comp. Sci. | Comp. Sci. |
| Brandt | CS-190 | Comp. Sci. | Comp. Sci. |
| Brandt | CS-319 | Comp. Sci. | Comp. Sci. |
| Kim | EE-181 | Elec. Eng. | Elec. Eng. |

- Trap: "conceptually different" means a different **meaning**. An instructor teaching a course of another department would be dropped by this query. The proof it uses dept_name is in E11: dept_name appears only once.

### E11 — `select *` versions [S87]
- The three queries from [S87].
- ✅ Columns:
  - Query 1 = 12: course_id ×2, dept_name ×2.
  - Query 2 = 11: course_id ×1, dept_name ×2.
  - Query 3 = 10: course_id ×1, dept_name ×1.
  - Each returns 15 rows.
- NB1: queries 1 and 2 are "not equivalent in schema" (one course_id column more). NB2: query 3 is "conceptually different" (it joins on dept_name too).

### E12 — join … on vs natural join [S88]
```sql
select *
from student join takes on student.ID = takes.ID;
```
```sql
select *
from student natural join takes;
```
- ✅ Both return 22 rows.
  - Header of the `on` version: ID, name, dept_name, tot_cred, **ID**, course_id, sec_id, semester, year, grade (10 columns).
  - Header of the natural join: ID, name, dept_name, tot_cred, course_id, sec_id, semester, year, grade (9 columns).

### E13 — join … on vs comma + where [S89]
```sql
select *
from student, takes
where student.ID = takes.ID;
```
- Evaluation [S74]: student × takes = 12 × 22 = 264 rows, and the where clause keeps 22.
- ✅ The same 22 rows and 10 columns as the `on` version. The set difference is 0 in both directions, so the two are **equivalent**.

### E14 — join … on + as [S90]
- The slide's SQL: `select * as ID, name, … from student join takes on student.ID = takes.ID;` ✅ sqlite3 reports `Parse error: near "as": syntax error`.
- A runnable version, using the slide's own idea:
```sql
select student.ID as ID, name, dept_name, tot_cred, course_id, sec_id, semester, year, grade
from student join takes on student.ID = takes.ID;
```
- ✅ Output: exactly the 22-row table on [S90], with ID once. The variant with a bare `ID` fails: `ambiguous column name: ID`.

### E15 — delete all / delete Finance [S95]
- `delete from instructor` ✅ deletes 12 tuples, leaving 0.
- `delete from instructor where dept_name= 'Finance';` ✅ deletes 2 (12121 Wu, 76543 Singh), leaving 10.

### E16 — delete by building [S96], [S97]
```sql
delete from instructor
where dept_name in (select dept_name
                    from department
                    where building = 'Watson');
```
- Evaluation: the subquery returns {Biology, Physics}. The delete removes instructors in those departments.
- ✅ It deletes 22222 Einstein (Physics), 33456 Gold (Physics) and 76766 Crick (Biology). 9 remain.

### E17 — delete below the average [S98]
```sql
delete from instructor
where salary < (select avg (salary)
                from instructor);
```
- Evaluation, as SQL does it:
  1. compute avg = 898,000 / 12 = **74,833.33**;
  2. find every tuple with salary below it;
  3. delete them all, without recomputing.
- ✅ Deleted (5):

| ID | name | salary |
|---|---|---|
| 15151 | Mozart | 40000 |
| 32343 | El Said | 60000 |
| 58583 | Califieri | 62000 |
| 10101 | Srinivasan | 65000 |
| 76766 | Crick | 72000 |

- ✅ Remaining (7): Katz 75000, Singh 80000, Kim 80000, Gold 87000, Wu 90000, Brandt 92000, Einstein 95000. The new average is **85,571.43**.
- The "Problem", made visible: run the same statement again and it deletes 3 more (new avg 85,571.43), then 2 (avg 91,000), then 1, then 0, until only Einstein is left. A single SQL execution deletes exactly 5.
- 🔎 Look up in Track B: MySQL may refuse this statement because the subquery reads the target table (not tested here).

### E18 — inserts [S99]
- `insert into course values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);` ✅ adds 1 row: course goes from 13 to 14, with the new tuple CS-437 | Database Systems | Comp. Sci. | 4.
- `insert into course (course_id, title, dept_name, credits) values (…);` ✅ adds the same tuple. If you run both, the second fails: `UNIQUE constraint failed: course.course_id`.
- `insert into student (ID, name, dept_name, tot_credits) values ('3003', 'Green', 'Finance', null);` ✅ fails: `table student has no column named tot_credits`. With `tot_cred` it inserts 3003 | Green | Finance | *null*.

### E19 — insert from select [S101]
```sql
insert into instructor
      select ID, name, dept_name, 20000
      from student
      where dept_name = 'Comp.Sci' and tot_cred > 145;
```
- Meaning: Comp. Sci. students with more than 145 credits become instructors with salary 20000.
- ✅ It inserts 0 rows. `'Comp.Sci'` matches nobody, and no student has more than 120 credits anyway.
- `insert into student select * from student;` ✅ With the key on ID: `UNIQUE constraint failed: student.ID`. On a copy without a key: 12 → 24, doubling **once**. The select was evaluated first, so there is no insertion loop.

### E20 — conditional raise [S102]–[S104]
- Two statements in the slide order: ✅ `… * 1.03 where salary > 100000` changes **0** rows; `… * 1.05 where salary <= 100000` changes **12**.
- The case statement: ✅ 12 rows, with the same values.
- The reversed order: ✅ the same values on this data (no salary falls between 95,238.10 and 100,000).

| ID | name | old salary | after [S103] | after [S104] case |
|---|---|---|---|---|
| 10101 | Srinivasan | 65000 | 68250 | 68250 |
| 12121 | Wu | 90000 | 94500 | 94500 |
| 15151 | Mozart | 40000 | 42000 | 42000 |
| 22222 | Einstein | 95000 | 99750 | 99750 |
| 32343 | El Said | 60000 | 63000 | 63000 |
| 33456 | Gold | 87000 | 91350 | 91350 |
| 45565 | Katz | 75000 | 78750 | 78750 |
| 58583 | Califieri | 62000 | 65100 | 65100 |
| 76543 | Singh | 80000 | 84000 | 84000 |
| 76766 | Crick | 72000 | 75600 | 75600 |
| 83821 | Brandt | 92000 | 96600 | 96600 |
| 98345 | Kim | 80000 | 84000 | 84000 |

### E21 — why the order matters [S103] "(Why?)"
- If the 5% statement ran first, any salary s with 95,238.10 < s ≤ 100,000 would become > 100,000 and then also get +3%. In the slide's order a tuple can match at most one statement.

### E22 — recompute tot_cred [S105]
- The slide's SQL is shown in §2 [S105]. ✅ It was run as `update student as S …` because sqlite3 needs `as`. Green, inserted per [S99], is included.

| ID | name | tot_cred before | tot_cred after | which takes rows count |
|---|---|---|---|---|
| 00128 | Zhang | 102 | 7 | CS-101 (4) + CS-347 (3) |
| 12345 | Shankar | 32 | 14 | CS-101 (4) + CS-190 (4) + CS-315 (3) + CS-347 (3) |
| 19991 | Brandt | 80 | 3 | HIS-351 (3) |
| 23121 | Chavez | 110 | 3 | FIN-201 (3) |
| 44553 | Peltier | 56 | 4 | PHY-101 (4) |
| 45678 | Levy | 46 | 7 | CS-101 B+ (4) + CS-319 (3); the CS-101 **F** is not counted |
| 54321 | Williams | 54 | 8 | CS-101 (4) + CS-190 (4) |
| 55739 | Sanchez | 38 | 3 | MU-199 (3) |
| 76543 | Brown | 58 | 7 | CS-101 (4) + CS-319 (3) |
| 76653 | Aoi | 60 | 3 | EE-181 (3) |
| 98765 | Bourikas | 98 | 7 | CS-101 (4) + CS-315 (3) |
| 98988 | Tanaka | 120 | 4 | BIO-101 (4); BIO-301 has a **null** grade and is not counted |
| 3003 | Green | *null* | *null* | no takes rows at all |

- Trap: a null grade does **not** make the total null (Tanaka gets 4). The total is null only when no row qualifies (Green).

---

## 6. Likely quiz/exam questions (built only from these slides)

1. [S67] r(A, B) has 2 tuples and s(C, D, E) has 4. How many tuples and attributes does r × s have? List the tuples that begin with β.
2. [S69] On the class data (instructor: 12 tuples, teaches: 15), how many rows and columns does `select * from instructor, teaches;` return? Which attribute appears twice, and how do you refer to each copy?
3. [S69], [S72] How many of those rows survive `where instructor.ID = teaches.ID`? Use this to explain the slide's remark that the Cartesian product is "not very useful directly".
4. [S74] State the three steps that give the meaning of a query on two relations. Apply them to the [S72] query, giving the row count after each step.
5. [S73] What does the "Art department" query return on the class data? Is the prefix `instructor.` before `dept_name` necessary? Why, or why not?
6. [S79], [S80] What is the common attribute of instructor and teaches? Write the [S80] answer in both forms (controlled Cartesian product and natural join). Which instructors are missing from the result?
7. [S78] How many tuples does instructor natural join department have, and on which attribute does it match? What are Kim's building and budget in the result?
8. [S86] What is wrong with `select name, title from instructor natural join teaches natural join course;` for "List names of instructors along with title of courses that they teach"? Would you notice the problem from its output on the class data?
9. [S83], [S85] Write the query of question 8 correctly in the two ways shown in class.
10. [S87] With `select *` instead of `select name, title`, how many columns does each of the three [S87] queries return? Why are the first two "not equivalent in schema"?
11. **MCQ** [S88], [S89]. `select * from student join takes on student.ID = takes.ID;` is…
    (a) equivalent to `select * from student natural join takes;`
    (b) equivalent to `select * from student, takes where student.ID = takes.ID;`
    (c) a Cartesian product with no condition
    (d) invalid without `using`
12. [S90] The slide writes `select * as ID, name, dept_name, …`. Why does it not run? Write a version that returns ID only once.
13. **MCQ** [S91]. According to the slides' definition, a join operation is…
    (a) the union of A and B
    (b) a Cartesian product A x B which requires that tuples in A and B match under some condition
    (c) the projection of A on the attributes of B
    (d) a set difference
14. **MCQ** [S77]. Which operations are "derived" (blue) in the slides' list?
    (a) selection and projection
    (b) natural join and intersection
    (c) union and set difference
    (d) Cartesian product and union
15. [S95], [S97] Write the DELETE for "Delete all instructors from the Finance department". Then write the DELETE for "…instructors associated with a department located in the Watson building". How many tuples does each delete on the class data, and which ones?
16. [S98] On the class data, how many instructors does `delete from instructor where salary < (select avg (salary) from instructor);` delete? What problem does the slide warn about, and what does SQL do about it?
17. [S99] Write two equivalent INSERTs for course CS-437, 'Database Systems', Comp. Sci., 4 credits. Then find the bug in `insert into student (ID, name, dept_name, tot_credits) values ('3003', 'Green', 'Finance', null);`.
18. [S101] What is the meaning of the [S101] insert-select? How many tuples does it insert on the class data? Why must the "select" be evaluated before the insertions?
19. [S102]–[S104] Write the update(s) for "+3% if salary is over $100,000, +5% for all others": (a) as two statements, (b) with `case`. Why does the order of the two statements matter? What are Einstein's (95000) and Wu's (90000) new salaries on the class data?
20. [S105] After the [S105] update, what are the tot_cred values of Levy (45678), Tanaka (98988) and Green (3003, inserted per [S99])? On the slide, what are "S" and the ID in "S.ID" called?

### Answers

1. **8 tuples** (2 × 4) and **5 attributes** (A, B, C, D, E). The β tuples are (β,2,α,10,a), (β,2,β,10,a), (β,2,β,20,b), (β,2,γ,10,b). [S67] ✅
2. **180 rows** (12 × 15) and **9 columns** (4 + 5). **ID** appears twice: the copies are `instructor.ID` and `teaches.ID`, "renamed using the relation name". [S69] ✅
3. **15** rows survive; the other **165** pair an instructor with someone else's teaching record. Hence "not very useful directly, but useful if combined with the where clause". [S69], [S72] ✅
4. (1) Generate r × s: 180 rows. (2) Apply P in where (`instructor.ID = teaches.ID`): 15 rows. (3) Output the select attributes: 15 rows of (name, course_id). [S74] ✅
5. **An empty result.** The slides' departments are Biology, Comp. Sci., Elec. Eng., Finance, History, Music and Physics; there is no Art. The prefix is "not necessary but useful ("good" coding style)": dept_name exists only in instructor, unlike ID, which is in both. ✅ The query without the prefix also returns 0 rows. [S73]
6. **ID** ("The only common attribute") [S79]. The two forms:
   - `select name, course_id from instructor, teaches where instructor.ID = teaches.ID;`
   - `select name, course_id from instructor natural join teaches;` [S80]

   ✅ Both return 15 rows. **Gold, Califieri and Singh** are missing because they taught nothing; the note says "you don't want all instructors!".
7. **12** tuples, matched on **dept_name**. Kim: **Taylor, 85000**. [S78] ✅
8. The second natural join matches on **course_id *and* dept_name**, both of which are in (instructor natural join teaches) and in course. It therefore adds instructor.dept_name = course.dept_name: "NB: conceptually different", "This is a wrong SQL code for the English query above!" [S86]. **No, you would not notice:** ✅ on the class data it returns the same 15 rows, because every instructor here teaches only courses of their own department.
9. The two correct versions [S83], [S85]:
   - `select name, title from instructor natural join teaches, course where teaches.course_id = course.course_id;`
   - `select name, title from instructor natural join teaches join course using course_id;`

   ✅ In sqlite3 the second needs `using (course_id)`. Both return 15 rows (titles in E8).
10. ✅ **12, 11 and 10** columns. Query 1 keeps course_id twice (product + where); query 2 keeps it once (`using`), hence "NB1: not equivalent in schema!". Query 3 also merges dept_name ("NB2: conceptually different"). [S87]
11. **(b)** [S89]. (a) is only "similar": the natural join has ID once, while `on` duplicates "the ID's column attributes" [S88]. ✅ Both give 22 rows; 10 vs 9 columns.
12. `*` cannot be renamed with `as`. ✅ sqlite3 reports `Parse error: near "as": syntax error`. A fix: `select student.ID as ID, name, dept_name, tot_cred, course_id, sec_id, semester, year, grade from student join takes on student.ID = takes.ID;` ✅ It returns the slide's 22-row, 9-column table. A bare `ID` is ambiguous. [S90]
13. **(b)**. "Def: A join operation is a Cartesian product A x B which requires that tuples in the relations A and B match under some condition." [S91]
14. **(b)** natural join and intersection (blue = derived; red = primary). [S77]
15. The two deletes [S95], [S97]:
    - `delete from instructor where dept_name= 'Finance';` ✅ deletes **2** (Wu, Singh).
    - `delete from instructor where dept_name in (select dept_name from department where building = 'Watson');` ✅ deletes **3** (Einstein, Gold, Crick); the Watson departments are Biology and Physics.
16. ✅ **5** instructors are deleted (avg 74,833.33): Mozart, El Said, Califieri, Srinivasan, Crick. "Problem: as we delete tuples from instructor, the average salary changes"; afterwards ✅ it is 85,571.43. SQL's solution: "1. First, compute avg (salary) and find all tuples to delete 2. Next, delete all tuples found above (without recomputing avg or retesting the tuples)". [S98]
17. The two INSERTs [S99]:
    - `insert into course values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);`
    - `insert into course (course_id, title, dept_name, credits) values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);`

    The bug: the attribute is **tot_cred**, not tot_credits. ✅ sqlite3 reports `table student has no column named tot_credits`. [S99], with the schema on [S88]
18. Meaning: every Comp. Sci. student with tot_cred > 145 is added to instructor (same ID, name, dept_name) with salary 20000. ✅ It inserts **0** tuples: `'Comp.Sci'` ≠ 'Comp. Sci.', and no student has more than 120 credits. "Note 2: "select" must be evaluated before insertions. (otherwise an insertion loop arises)". ✅ `insert into student select * from student;` doubles a key-less copy exactly once (12 → 24). [S101]
19. The answers [S103], [S104]:
    - (a) `update instructor set salary = salary * 1.03 where salary > 100000;` then `update instructor set salary = salary * 1.05 where salary <= 100000;`
    - (b) `update instructor set salary = case when salary <= 100000 then salary * 1.05 else salary * 1.03 end;`

    The order matters because, with the 5% statement first, salaries in (95,238.10; 100,000] would cross 100,000 and get +3% as well. ✅ **Einstein 99,750** and **Wu 94,500**. On the class data the 3% statement changes 0 rows and all 12 get +5%.
20. ✅ **Levy 7** (the F is excluded: 4 + 3), **Tanaka 4** (the null grade is excluded), **Green null** (no takes rows). "S: correlation name"; "ID: correlation variable". [S105]

---

## 7. Self-check

- [ ] I can compute the row and column counts of a Cartesian product and write it in SQL with the comma [S67], [S69].
- [ ] I can explain the three-step meaning of a query on two relations and apply it to a query [S74].
- [ ] I can find the common attribute(s) of two relations from their schema boxes and predict the natural join's result [S78], [S79].
- [ ] I can rewrite a natural-join query as a Cartesian product "controlled" by where, and the other way round [S80], [S83], [S85].
- [ ] I can spot the hidden dept_name in `instructor natural join teaches natural join course` and fix it with comma + where or `join … using` [S85]–[S87].
- [ ] I can say how `join … on`, comma + where and natural join differ in their columns (the duplicate ID), and use `as` correctly [S88]–[S90].
- [ ] I can quote the slides' definition of a join operation [S91].
- [ ] I can write a delete with where, with `in (select …)` and with an aggregate subquery, and explain why SQL finds all tuples before deleting [S95]–[S98].
- [ ] I can write `insert … values` in both forms, `insert … select`, and explain why the select is evaluated first [S99]–[S101].
- [ ] I can write a conditional raise as two updates in the right order or as one `case`, and read an update with a correlated scalar subquery [S102]–[S105].

---

## Appendix — sqlite3 verification setup (class data only)

Save the script below as `setup.sql`, then run `sqlite3 :memory:` and type `.read setup.sql`, `.headers on` and `.mode markdown`. Data sources:
- r, s: [S67];
- department, instructor: [S78] (instructor DDL as on part 1 [S35]);
- teaches: [S79];
- student and takes: rebuilt from the [S90] result (student DDL as on part 1 [S37]);
- course: [W6 S45].

Keys are the attributes underlined in the slides' schema boxes.

```sql
create table r (A text, B int);
insert into r values ('α',1),('β',2);
create table s (C text, D int, E text);
insert into s values ('α',10,'a'),('β',10,'a'),('β',20,'b'),('γ',10,'b');

create table department (dept_name varchar(20), building varchar(15), budget numeric(12,2), primary key (dept_name));
insert into department values
 ('Biology','Watson',90000),('Comp. Sci.','Taylor',100000),('Elec. Eng.','Taylor',85000),
 ('Finance','Painter',120000),('History','Painter',50000),('Music','Packard',80000),('Physics','Watson',70000);

create table instructor
 (ID char(5),
  name varchar(20) not null,
  dept_name varchar(20),
  salary numeric(8,2),
  primary key (ID),
  foreign key (dept_name) references department);
insert into instructor values
 ('10101','Srinivasan','Comp. Sci.',65000),('12121','Wu','Finance',90000),('15151','Mozart','Music',40000),
 ('22222','Einstein','Physics',95000),('32343','El Said','History',60000),('33456','Gold','Physics',87000),
 ('45565','Katz','Comp. Sci.',75000),('58583','Califieri','History',62000),('76543','Singh','Finance',80000),
 ('76766','Crick','Biology',72000),('83821','Brandt','Comp. Sci.',92000),('98345','Kim','Elec. Eng.',80000);

create table teaches (ID char(5), course_id varchar(8), sec_id varchar(8), semester varchar(6), year numeric(4,0),
  primary key (ID, course_id, sec_id, semester, year));
insert into teaches values
 ('10101','CS-101','1','Fall',2009),('10101','CS-315','1','Spring',2010),('10101','CS-347','1','Fall',2009),
 ('12121','FIN-201','1','Spring',2010),('15151','MU-199','1','Spring',2010),('22222','PHY-101','1','Fall',2009),
 ('32343','HIS-351','1','Spring',2010),('45565','CS-101','1','Spring',2010),('45565','CS-319','1','Spring',2010),
 ('76766','BIO-101','1','Summer',2009),('76766','BIO-301','1','Summer',2010),('83821','CS-190','1','Spring',2009),
 ('83821','CS-190','2','Spring',2009),('83821','CS-319','2','Spring',2010),('98345','EE-181','1','Spring',2009);

create table course (course_id varchar(8), title varchar(50), dept_name varchar(20), credits numeric(2,0), primary key (course_id));
insert into course values
 ('BIO-101','Intro. to Biology','Biology',4),('BIO-301','Genetics','Biology',4),('BIO-399','Computational Biology','Biology',3),
 ('CS-101','Intro. to Computer Science','Comp. Sci.',4),('CS-190','Game Design','Comp. Sci.',4),('CS-315','Robotics','Comp. Sci.',3),
 ('CS-319','Image Processing','Comp. Sci.',3),('CS-347','Database System Concepts','Comp. Sci.',3),
 ('EE-181','Intro. to Digital Systems','Elec. Eng.',3),('FIN-201','Investment Banking','Finance',3),
 ('HIS-351','World History','History',3),('MU-199','Music Video Production','Music',3),('PHY-101','Physical Principles','Physics',4);

create table student
 (ID varchar(5) primary key,
  name varchar(20) not null,
  dept_name varchar(20),
  tot_cred numeric(3,0),
  foreign key (dept_name) references department);
insert into student values
 ('00128','Zhang','Comp. Sci.',102),('12345','Shankar','Comp. Sci.',32),('19991','Brandt','History',80),
 ('23121','Chavez','Finance',110),('44553','Peltier','Physics',56),('45678','Levy','Physics',46),
 ('54321','Williams','Comp. Sci.',54),('55739','Sanchez','Music',38),('76543','Brown','Comp. Sci.',58),
 ('76653','Aoi','Elec. Eng.',60),('98765','Bourikas','Elec. Eng.',98),('98988','Tanaka','Biology',120);

create table takes (ID varchar(5), course_id varchar(8), sec_id varchar(8), semester varchar(6), year numeric(4,0), grade varchar(2),
  primary key (ID, course_id, sec_id, semester, year));
insert into takes values
 ('00128','CS-101','1','Fall',2009,'A'),('00128','CS-347','1','Fall',2009,'A-'),
 ('12345','CS-101','1','Fall',2009,'C'),('12345','CS-190','2','Spring',2009,'A'),('12345','CS-315','1','Spring',2010,'A'),('12345','CS-347','1','Fall',2009,'A'),
 ('19991','HIS-351','1','Spring',2010,'B'),('23121','FIN-201','1','Spring',2010,'C+'),('44553','PHY-101','1','Fall',2009,'B-'),
 ('45678','CS-101','1','Fall',2009,'F'),('45678','CS-101','1','Spring',2010,'B+'),('45678','CS-319','1','Spring',2010,'B'),
 ('54321','CS-101','1','Fall',2009,'A-'),('54321','CS-190','2','Spring',2009,'B+'),('55739','MU-199','1','Spring',2010,'A-'),
 ('76543','CS-101','1','Fall',2009,'A'),('76543','CS-319','2','Spring',2010,'A'),('76653','EE-181','1','Spring',2009,'C'),
 ('98765','CS-101','1','Fall',2009,'C-'),('98765','CS-315','1','Spring',2010,'B'),
 ('98988','BIO-101','1','Summer',2009,'A'),('98988','BIO-301','1','Summer',2010,null);
```

sqlite3-only notes, all confirmed:
- `using course_id` needs parentheses: `using (course_id)`.
- `update student S` needs `as`: `update student as S`.
- `select * as …` is invalid in any form.
- sqlite3 prints the natural-join columns in a different order than [S78]; the tuples are the same.
- sqlite3 shows null as an empty cell.
