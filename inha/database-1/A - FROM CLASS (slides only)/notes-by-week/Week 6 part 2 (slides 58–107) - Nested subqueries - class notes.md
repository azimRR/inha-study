# Week 6, part 2 (slides 58–107) — Nested subqueries (CLASS NOTES — from slides only)
> Source: W6L1L2 [LAB3].pdf, slides 58–107 of 107. [S#] = the "n / 107" footer number.
>
> - **Track A (class material only).** Slides outside this range are cited as [W6 S#] (Week 6, part 1, same PDF) or [W5 S#] (Week 5 PDF).
> - **Verification.** Every query was run in sqlite3 (3.54) on the university tables re-created from class slides (see §5.0). If sqlite can't run a slide's syntax, I used an equivalent query and marked it **"sqlite rewrite"**. These rewrites are only for checking; they are **not** class material.
> - **Exam relevance.** Quiz #2 (Fri 23 Oct) is on HW #2 (weeks 2–5), so this part matters mainly for the **midterm** (week 8, covers weeks 1–7).
> - **Notation.** The slides use curly quotes (’Fall’); the code blocks below use straight quotes ('Fall') so they can be run.

---

## 1. Big picture

- **What a subquery is.** A select-from-where expression nested inside another query. Where it can go:
  - in **where**, in the form *Attribute* <operation> (**subquery**);
  - in **from**, where "any valid subquery" is accepted;
  - in **select**, but only a subquery that "generates a single value".

  [S60, S61, S62, S94, S101]
- **Subqueries in where perform "tests"** [S63]:
  - **set membership:** `in` / `not in`, also with an **enumerated set** or a **tuple of attributes** [S65–S78];
  - **set comparison:** `> some`, `> all`, … [S80–S86];
  - **set cardinality (empty relations):** `exists` / `not exists` [S88–S93].
- **One question, several queries.** The slides show the alternatives side by side:
  - "Fall 2009 **and** Spring 2010": `intersect` = `in` = `exists`;
  - "Fall 2009 **but not in** Spring 2010": `except` = `not in`;
  - "salary greater than some Biology instructor": the self-join "solution we have seen" = `> some`.

  [S64–S67, S81–S82, S89–S90]
- **Correlated subqueries.** **Correlation names** (`section as S`, `section as T`, `student as S`) let the inner query use the current row of the outer query; such a subquery is "called: **correlated subquery**". If you remove the correlation condition from the `exists` query, the meaning changes [S90, S91].
- **Multi-attribute membership** compares whole tuples, e.g. `(course_id, sec_id, semester, year) in (…)`. If you drop attributes, the query "represents a **different** table": count = 6 + 6 instead of 6 [S74–S78].
- **"All" queries** (taken *all* Biology courses) use `not exists ( (Biology courses) except (courses this student took) )` [S93].
- **Subqueries in from** produce an intermediate table. You can filter it with `where` ("having" not needed) or aggregate it again (`max` of `sum`), and you can **name** it (`as dept_total (dept_name, tot_salary)`), but that is "not always supported in SQL implementations" [S97–S100].
- **Scalar subqueries** in **select** must give "one and only one row"; otherwise it is a "Runtime error" [S101, S102].
- **LAB #3** (practice on SQL with MySQL) was "In class only (no slides provided)", with participation checked (2–3 members per working group) [S104, S105].

---

## 2. Slide-by-slide notes

### [S58] Outline
- Outline divider; item **6 Nested Subqueries** is highlighted (start of this part). Full list: 1 From Previous Week · 2 Join Expressions · 3 Set Operations · 4 Additional Basic Operations · 5 Aggregate Functions · 6 Nested Subqueries · 7 LAB #3 : Practice on SQL with MySQL.

### [S59] Nested Subqueries (section title)
- "**Nested Subqueries** — Ch 3, T; section 3.8", with a picture of the textbook cover (*Database System Concepts*).
- ⭐ Reading reference: **textbook (T), Chapter 3, section 3.8**.

### [S60] Nested Subqueries
- "**Def**: A **subquery** is a **select-from-where** expression (so, a subquery *is* a SQL query!) that is nested within another query."
- "In a SQL query" (blue box):

```
select A1, A2, ..., An
from   r1, r2, ..., rm
where  P ;
```

  - "Ai can be replaced be a subquery that generates a single value."
  - "ri can be replaced by any valid subquery."
  - "P can be replaced with an expression of the form: *Attribute* <operation> (**subquery**) where <operation> is to be defined (*see later*)."
- ⭐ Red underlines on **"single value"** and **"any valid subquery"**; blue underline on "nested within another query".
- ⚠️ Typo: "replaced **be** a subquery" should read "replaced **by** a subquery" (compare the next bullet, "replaced by any valid subquery").

### [S61] Nested Subqueries (cont.)
- "As the nesting can be done in the following SQL query" (same select / from / where template) "we explain in turn:
  - subqueries in the **where** clause;
  - subqueries in the **from** clause;
  - subqueries in the **select** clause."
- This is the plan for the rest of the part: where = S62–S93, from = S94–S100, select = S101–S102.

### [S62] Section divider: Nested Subqueries in "where"
- Subtitle: "*Attribute* <operation> (**subquery**)".

### [S63] Subqueries in the "where" Clause
- "A common use of subqueries is to perform tests:
  - for set membership;
  - for set comparisons;
  - for set cardinality (e.g., empty relations)."
- ⭐ "tests" is underlined. This slide comes back as **S79** (with "set comparisons" in red) and **S87** (with "set cardinality" in red), so it is the roadmap: membership (S64–S78), then comparison (S80–S86), then cardinality (S88–S93).

### [S64] Set Membership
- Question (blue): "Find course id's of courses offered in Fall 2009 **and** Spring 2010" ("and" underlined).
- Schema boxes drawn on the slide: *section*(course_id, sec_id, semester, year, building, room_no, time_slot_id) and *course*(course_id, title, dept_name, credits).
- SQL, with `intersect` in red:

```sql
(select course_id
  from section
  where semester = 'Fall' and year = '2009')
intersect
(select course_id
  from section
  where semester = 'Spring' and year = '2010');
```

- Verified output:

| course_id |
|---|
| CS-101 |

  sqlite rejects the parentheses around the two operands of `intersect` ("syntax error near ("). I ran the same query **without** those parentheses, which gave the output above.
  🔎 Look up in Track B: whether your MySQL version accepts `intersect`/`except` and parenthesised query blocks.
- ⭐ `intersect` in red.
- ⚠️ Inconsistency (not an error): here the year is **quoted** ('2009', '2010'), while S65, S67 and S90 write `year= 2009` without quotes. In sqlite both forms gave the same rows.

### [S65] Set Membership (alternative with `in`)
- Same question. "An alternative approach in SQL by using subqueries is:"

```sql
select distinct course_id
from section as S
where semester = 'Fall' and year= 2009 and
      course_id in (select course_id
                    from section as T
                    where semester = 'Spring' and year= 2010
                          and T.course_id = S.course_id);
```

- A blue label "**correlation name**" has red arrows pointing to `S` in `section as S` and to `S` in `S.course_id`.
- "**Observe**: this relates to "**intersect**" (that by default automatically eliminates duplicates; to retain use "**intersect all**")". A yellow line connects this note to `distinct`, which is underlined in red. In other words, `distinct` here plays the role of intersect's automatic duplicate elimination.
- Verified output: **CS-101** (same as S64).
- ⭐ `distinct` underlined in red; `in (` … `)` in red; "correlation name"; the "Observe" note.

### [S66] Set Membership (except)
- Question: "Find course id's of courses offered in Fall 2009 **but not in** Spring 2010" ("but not in" underlined). Same schema boxes as S64.

```sql
(select course_id
  from section
  where semester = 'Fall' and year = '2009')
except
(select course_id
  from section
  where semester = 'Spring' and year = '2010');
```

- Verified output, using the sqlite rewrite without the outer parentheses (as in S64):

| course_id |
|---|
| CS-347 |
| PHY-101 |

- ⭐ `except` in red.

### [S67] Set Membership (alternative with `not in`)
- "An alternative approach in SQL by using subqueries is:"

```sql
select distinct course_id
from section
where semester = 'Fall' and year= 2009 and
      course_id not in (select course_id
                        from section
                        where semester = 'Spring' and year= 2010);
```

- "**Observe**: this relates to "**except**" (that by default automatically eliminates duplicates; to retain use "**except all**")". A yellow line links it to `distinct`, which is underlined in red.
- Verified output: **CS-347, PHY-101** (same as S66).
- Note: this subquery has **no** correlation name, so it is the same set for every outer row.
- ⭐ `not in` in red; the "Observe" note.

### [S68] Enumerated Set Membership
- Question: "Find names of instructors whose name is **neither** Mozart **nor** Einstein" ("neither" and "nor" underlined). Schema box: *instructor*(ID, name, dept_name, salary).

```sql
select distinct name
from instructor
where name not in ('Mozart', 'Einstein');
```

- Callout (a yellow arrow points to the list): "A set where elements are explicitly listed is called **enumerated set**".
- Verified output (10 names): Crick, Katz, Srinivasan, Brandt, Kim, Wu, Singh, El Said, Califieri, Gold.
- ⭐ "enumerated set" in red; `not in` in red.

### [S69] Multi-Attribute Set Membership (schema)
- Question: "Find the total number of (distinct) students who have taken a course section taught by the instructor with ID number 10101".
- Picture: the full **university schema diagram**. Each relation is a box (underlined attributes are the key attributes) and arrows connect related attributes:
  - takes(ID, course_id, sec_id, semester, year, grade)
  - student(ID, name, dept_name, tot_cred)
  - section(course_id, sec_id, semester, year, building, room_no, time_slot_id)
  - course(course_id, title, dept_name, credits)
  - department(dept_name, building, budget)
  - advisor(s_id, i_id)
  - time_slot(time_slot_id, day, start_time, end_time)
  - prereq(course_id, prereq_id)
  - instructor(ID, name, dept_name, salary)
  - classroom(building, room_no, capacity)
  - teaches(ID, course_id, sec_id, semester, year)

### [S70] Multi-Attribute Set Membership (which tables?)
- Same question, but now the words **students**, **taken**, **section**, **taught**, **instructor** are underlined in red. In the same diagram the matching tables are boxed in red: **student, takes, section, teaches, instructor**.
- In other words, each underlined word in the question corresponds to one table.

### [S71] Multi-Attribute Set Membership (first attempt)

```sql
select count (distinct S.ID)
  from student as S, takes, section, teaches, instructor as I
  where I.ID = '10101' and …;
```

- "where "…" means that you have to control all "matching attributes""
- ⭐ The slide does not spell out the "…"; it only says you must control all matching attributes. I fill it in and verify it in §5.6. Without the matching conditions, the count is wrong (13 = every student; see §5.6).

### [S72] Multi-Attribute Set Membership (diagram again)
- Same diagram and question. **takes** and **teaches** are now framed in **yellow**, while the other red boxes stay. This hints that takes and teaches alone are enough (see S73).

### [S73] Multi-Attribute Set Membership (join … using)
- Question, with "taken" and "taught" now underlined in **orange** (the table names *takes* and *teaches* are orange in the query too):

```sql
select count (distinct S.ID)
  from takes as S join teaches as I using (course_id, sec_id,
                                                semester, year)
  where I.ID = '10101';
```

- The schema boxes for takes and teaches are drawn with yellow frames.
- Verified output: **6**.
- Note: here the alias `S` names **takes** (not student) and `I` names **teaches** (not instructor), so `S.ID` is the student's ID stored in takes.
- ⚠️ Typo: the question on this slide says "ID number **101011**", but the query (and S69–S72, S74) uses **10101**.

### [S74] Multi-Attribute Set Membership (alternative with tuple `in`)
- "An alternative approach in SQL by using subqueries is:"

```sql
select count (distinct ID)
from takes
where (course_id, sec_id, semester, year) in
                 (select course_id, sec_id, semester, year
                  from teaches
                  where teaches.ID= 10101);
```

- Schema boxes: takes(ID, course_id, sec_id, semester, year, grade) and teaches(ID, course_id, sec_id, semester, year), both framed in yellow. In the query, the table names *takes* and *teaches* are written in orange.
- Verified output: **6** (sqlite accepts the tuple form `(a, b, c, d) in (select …)`).
- ⭐ `in` in red.
- ⚠️ Inconsistency (not an error): `teaches.ID= 10101` is unquoted here, but `'10101'` is quoted in S71 and S73. Both gave the same result in sqlite.

### [S75] Multi-Attribute Set Membership (the data, count = 6)
- The slide shows the actual **teaches** and **takes** tables.
  - **teaches:** the three rows of instructor 10101 (course_id … year) are boxed in brown and labelled "**subquery**", with the header course_id … year marked in red.
  - **takes:** the header course_id … year is boxed in red. Yellow arrows from "**count(distinct S.ID) = 6**" (the 6 in blue) point to 6 rows marked with blue lines: the CS-101 Fall 2009 rows of students 00128, 12345, 45678, 54321, 76543, 98765.

**teaches** (as on S75):

| ID | course_id | sec_id | semester | year |
|---|---|---|---|---|
| **10101** | **CS-101** | **1** | **Fall** | **2009** |
| **10101** | **CS-315** | **1** | **Spring** | **2010** |
| **10101** | **CS-347** | **1** | **Fall** | **2009** |
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

**takes** (as on S75; the arrowed rows are marked; ✓ = the tuple matches one of 10101's three sections):

| ID | course_id | sec_id | semester | year | grade | on slide | matches subquery? |
|---|---|---|---|---|---|---|---|
| 00128 | CS-101 | 1 | Fall | 2009 | A | ← arrow | ✓ |
| 00128 | CS-347 | 1 | Fall | 2009 | A- | | ✓ |
| 12345 | CS-101 | 1 | Fall | 2009 | C | ← arrow | ✓ |
| 12345 | CS-190 | 2 | Spring | 2009 | A | | |
| 12345 | CS-315 | 1 | Spring | 2010 | A | | ✓ |
| 12345 | CS-347 | 1 | Fall | 2009 | A | | ✓ |
| 19991 | HIS-351 | 1 | Spring | 2010 | B | | |
| 23121 | FIN-201 | 1 | Spring | 2010 | C+ | | |
| 44553 | PHY-101 | 1 | Fall | 2009 | B- | | |
| 45678 | CS-101 | 1 | Fall | 2009 | F | ← arrow | ✓ |
| 45678 | CS-101 | 1 | Spring | 2010 | B+ | | |
| 45678 | CS-319 | 1 | Spring | 2010 | B | | |
| 54321 | CS-101 | 1 | Fall | 2009 | A- | ← arrow | ✓ |
| 54321 | CS-190 | 2 | Spring | 2009 | B+ | | |
| 55739 | MU-199 | 1 | Spring | 2010 | A- | | |
| 76543 | CS-101 | 1 | Fall | 2009 | A | ← arrow | ✓ |
| 76543 | CS-319 | 2 | Spring | 2010 | A | | |
| 76653 | EE-181 | 1 | Spring | 2009 | C | | |
| 98765 | CS-101 | 1 | Fall | 2009 | C- | ← arrow | ✓ |
| 98765 | CS-315 | 1 | Spring | 2010 | B | | ✓ |
| 98988 | BIO-101 | 1 | Summer | 2009 | A | | |
| 98988 | BIO-301 | 1 | Summer | 2010 | *null* | | |

- On S75 the university logo hides part of three grade cells (98765/CS-101, 98765/CS-315, 98988/BIO-101). Their full values (C-, B, A) are read from the same takes table on [W6 S10]. Grades are not used by any query in this part.
- Verified: 10 rows match, but only **6 distinct** IDs (00128, 12345, 45678, 54321, 76543, 98765), so **count = 6**, as the slide says.
- ⭐ "count(distinct S.ID) = **6**".

### [S76] Multi-Attribute Set Membership: Remark 1
- Same question and the same query as S74. In both the outer `(course_id, sec_id, semester, year)` and the inner `select course_id, sec_id, semester, year`, the attributes are written in **red**.
- "**Multi-Attribute**" in the title is underlined, and a yellow line runs from it to the outer attribute list. The slide's second bullet is **empty** (just a red square).
- In other words, the remark is that membership is tested on the **whole tuple** of four attributes at once.

### [S77] Multi-Attribute Set Membership: Remark 2
- "This query represents a **different** table than before:" ("different" underlined). It is the S74 query with **course_id, semester, year struck out** in red, in both lists:
  - where (~~course_id~~, sec_id, ~~semester~~, ~~year~~) in (select ~~course_id~~, sec_id, ~~semester~~, ~~year~~ from teaches where teaches.ID= 10101);
- What remains after the strike-out:

```sql
select count (distinct ID)
from takes
where (sec_id) in
                 (select sec_id
                  from teaches
                  where teaches.ID= 10101);
```

- Verified output: **12** (S78 shows it as "6+6!").

### [S78] Remark 2 (cont.)
- Same tables as S75. In **teaches**, the brown "subquery" box now covers only the **sec_id** column of 10101's rows (values 1, 1, 1).
- In **takes**, the same 6 rows still have blue marks. Brown marks add the extra rows whose **sec_id = 1**.
- "**count(distinct S.ID) = 6+6!**" (first 6 in blue, second 6 in brown).
- Verified: the 6 extra students are **19991, 23121, 44553, 55739, 76653, 98988**. All 10101 sections have sec_id 1, so comparing only sec_id counts **anyone who took any section number 1** (12 students).
- ⭐ "6+6!". If you forget attributes in a multi-attribute test, the result is wrong.

### [S79] Subqueries in the "where" Clause (cont.)
- Repeat of S63; this time "**set comparisons**" is in red, so the next topic is set comparison.

### [S80] Set Comparison – The "some" Clause
- Question: "Find names of all instructors with salary greater than that of **some** (at least one) instructor in the Biology department" ("some" underlined in red).
- A big "**?**" (question to the class) and the schema box *instructor*(ID, name, dept_name, salary).

### [S81] A solution we have seen…
- Same question. The slide's "solution we have seen" is a self-join of *instructor* with itself under two names, `T` and `S`:

```sql
select distinct T.name
from instructor as T, instructor as S
where T.salary > S.salary and S.dept_name = 'Biology';
```

- Verified output (7 names): Katz, Brandt, Kim, Wu, Singh, Gold, Einstein.

### [S82] Set Comparison – The "some" Clause
- "Same previous query by using the "**> some**" clause:"

```sql
select name
from instructor
where salary > some (select salary
                     from instructor
                     where dept_name = 'Biology');
```

- Callout: Means: "**greater than at least one**".
- "Also: < **some**, ≤ **some**, = **some**, ≥ **some**, <> **some**". In actual SQL code the slides write ≥ as `>=` (see S85).
- Verified output (sqlite has no `some`, so I used the slide's own equivalent S81 and an `exists` rewrite): **Katz, Brandt, Kim, Wu, Singh, Gold, Einstein**, the same 7 names as S81.
  🔎 Look up in Track B: MySQL's support for `some`/`any`/`all` (sqlite has none).
- ⭐ `> some` in red; "Means: …"; the "Also" list.

### [S83] Set Comparison – The "all" Clause
- Question: "Find names of all instructors with salary greater than that of **all** the instructors in the Biology department" ("all" underlined in red).

```sql
select name
from instructor
where salary > all (select salary
                    from instructor
                    where dept_name = 'Biology');
```

- Callout: Means: "**greater than all**". "Also: < **all**, ≤ **all**, = **all**, ≥ **all**, <> **all**". Schema box: *instructor*.
- Verified output (sqlite rewrites with `not exists` and with `max()`): **Katz, Brandt, Kim, Wu, Singh, Gold, Einstein**.
- Note: on the class data `> all` gives **the same 7 names as `> some`**. The Biology department has only **one** instructor (Crick, 72000), so "greater than at least one" and "greater than all" mean the same here. See Q9 for a department where they differ.
- ⭐ `> all` in red; "Means: …"; the "Also" list.

### [S84] More on Set Comparison
- Question: "Find the departments that have the highest average salary". A big "**?**" (question to the class) and the *instructor* schema box.

### [S85] More on Set Comparison - Example
- Question: "Find department's names with highest average salary".
- "First, we find the average salary for each department:" (yellow highlight)

```sql
select avg (salary)
from instructor
group by dept_name;
```

- "Then, we use the query above as subquery:"

```sql
select dept_name
from instructor
group by dept_name
having avg (salary) >= all (select avg (salary)
                            from instructor
                            group by dept_name);
```

- Verified (sqlite rewrite: `>= all (set)` checked as `>= (max of set)`):
  - step 1 gives 7 averages: 72000, 77333.33…, 80000, 85000, 61000, 40000, 91000;
  - final output: **Physics**.
- ⭐ The subquery is highlighted in yellow both when it stands alone and when it is used inside `having … >= all ( … )`; `>= all` is in red.

### [S86] More on Set Comparison - Example (same, with optional column)
- Same as S85, but the outer select is written `select dept_name, [ avg (salary) ]`. The **red brackets** mark `avg (salary)` as an optional extra column to output.

```sql
select dept_name, [ avg (salary) ]
from instructor
group by dept_name
having avg (salary) >= all (select avg (salary)
                            from instructor
                            group by dept_name);
```

- Verified output (without the brackets, and with the sqlite rewrite of `>= all`):

| dept_name | avg (salary) |
|---|---|
| Physics | 91000.0 |

### [S87] Subqueries in the "where" Clause (cont.)
- Repeat of S63; now "**set cardinality**" is in red, so the next topic is empty relations.

### [S88] Empty Relations – The "exists" Clause
- "The **exists** clause returns the value **true** if the argument subquery is nonempty."
  - "**exists** *r*   is true ⇔ *r* ≠ Ø"
  - "**not exists** *r*   is true ⇔ *r* = Ø"

### [S89] (reminder) Two alternative solutions
- Question: "Find course id's of courses offered in Fall 2009 **and** Spring 2010". "Two SQL queries we have seen so far for it:"

```sql
(select course_id
 from section
 where semester = 'Fall' and year = '2009')
intersect
(select course_id
 from section
 where semester = 'Spring' and year = '2010');
```

```sql
select distinct course_id
from section
where semester = 'Fall' and year= 2009 and
      course_id in (select course_id
                    from section
                    where semester = 'Spring' and year= 2010);
```

- Verified output of both: **CS-101**.
- Note: this `in` version has **no correlation** (no `as S` / `as T`, no `T.course_id = S.course_id`), unlike S65. It gives the same result, because the `course_id in (…)` test itself already compares course_id.

### [S90] The "exist" Clause (cont.)
- Same question. "A third approach in SQL by using a subquery:"

```sql
select course_id
from section as S
where semester = 'Fall' and year = 2009 and
      exists (select *
              from section as T
              where semester = 'Spring' and year= 2010
                    and S.course_id = T.course_id);
```

- A blue label "**correlation name**" has yellow arrows pointing to `S` in `section as S` and to `S` in `S.course_id`. A second label, "called: **correlated subquery**", points to the `exists ( … )` subquery.
- Verified output: **CS-101**. A row-by-row evaluation is in §5.15.
- ⭐ "correlated subquery" (the term to know); `exists (` … `)` in red.
- ⚠️ The title says "exist", but the SQL keyword is **`exists`** (as on S88 and in the code). S92 and S93 have the same issue ("not exist" for **`not exists`**).
- Note: unlike S65 and S89, this query has no `distinct`. On the class data each of these courses has only one Fall 2009 section, so no duplicates appear.

### [S91] Remark
- "Is the following SQL query equivalent to the previous SQL query? Why / Why not?" (question to the class)
- It is the S90 query with "~~and S.course_id = T.course_id~~" **struck out**:

```sql
select course_id
from section as S
where semester = 'Fall' and year = 2009 and
      exists (select *
              from section as T
              where semester = 'Spring' and year= 2010);
```

- Verified output: **CS-101, CS-347, PHY-101**. So it is **not** equivalent to S90 (whose output is only CS-101).
- Why: without the correlation condition, the subquery no longer depends on the outer row `S`. It is always "all Spring 2010 sections", which is non-empty (7 rows), so `exists` is **true for every** Fall 2009 row.
- Compare S89: there, removing the correlation from the `in` version did **not** change the result, because the comparison sits outside the subquery (`course_id in …`). In the `exists` version the comparison is **inside** the subquery, so removing it changes the meaning.
- ⭐ A question to the class; likely exam material.

### [S92] The "not exist" Clause
- Question: "Find ID and name of all students who have taken all courses offered in the Biology department".
- Schema boxes: *student*(ID, name, dept_name, tot_cred), *course*(course_id, title, dept_name, credits), *takes*(ID, course_id, sec_id, semester, year, grade).

### [S93] The "not exist" Clause (solution)
- Same question ("**all courses**" underlined).

```sql
select ID, name
from student as S
where  not exists ( ( select course_id
                      from course
                      where dept_name = 'Biology' )
                    except
                    ( select T.course_id
                      from takes as T
                      where S.ID = T.ID ) );
```

- A blue label "**correlation name**" has red arrows pointing to `S` in `student as S` and to `S` in `S.ID`.
- Legend:
  - the **blue-highlighted** part = "**courses offered in Biology dept.**";
  - the **yellow-highlighted** part = "**courses taken by students**".
- Verified output: **empty (no rows)**.
  - The Biology courses are BIO-101, BIO-301 and BIO-399.
  - Only Tanaka (98988) took any Biology course, BIO-101 and BIO-301, and nobody took **BIO-399**.
  - So for every student the `except` result is non-empty, and `not exists` is false.

  sqlite rewrite: I removed the inner parentheses around the two `except` operands, as for S64. See §5.17 for the row-by-row evaluation and a what-if.
- ⭐ `not exists ( (` … `) );` in red; "correlation name"; the blue and yellow highlights.

### [S94] Section divider: Nested Subqueries in "from"
- Subtitle: "Any valid **subquery** is accepted".

### [S95] Example
- Question: "Find the names and average salaries of all departments whose average salary is greater than $42000". A big "**?**" (question to the class).
- Schema boxes: *instructor*(ID, name, dept_name, salary) and *department*(dept_name, building, budget).

### [S96] A solution we have seen…
- Question (wording: "average salary of all departments …"):

```sql
select dept_name, avg (salary) as avg_salary
from instructor
group by dept_name
having avg_salary > 42000;
```

- Result table on the slide:

| dept_name | avg_salary |
|---|---|
| Physics | 91000 |
| Elec. Eng. | 80000 |
| Finance | 85000 |
| Comp. Sci. | 77333 |
| Biology | 72000 |
| History | 61000 |

- Verified: the same 6 departments; sqlite prints Comp. Sci. as 77333.333333333329, which the slide rounds to 77333. Row order differs; the query has no `order by`.
- ⭐ `group by` and `having` in red.

### [S97] Subqueries in the "from" Clause (cont.)
- Same question. "Same query by using a subquery is:"

```sql
select dept_name, avg_salary
from (select dept_name, avg (salary) as avg_salary
      from instructor
      group by dept_name)
where avg_salary > 42000;
```

- The slide shows the **intermediate table** made by the subquery (a red arrow from the subquery's closing parenthesis points to it). The **Music 40000** row is boxed in red: it is the one row removed by `where avg_salary > 42000`.

| dept_name | avg_salary |
|---|---|
| Biology | 72000 |
| Comp. Sci. | 77333 |
| Elec. Eng. | 80000 |
| Finance | 85000 |
| History | 61000 |
| **Music** | **40000** ← boxed red |
| Physics | 91000 |

- "**Note**: "**having**" not needed clause "**where**" used indeed"
- Verified output: the same 6 rows as S96 (all departments except Music).
  🔎 Look up in Track B: whether MySQL requires an alias for every subquery in `from` (this slide's subquery has none; sqlite accepted it).
- ⭐ The Note; the Music row boxed in red.

### [S98] Subqueries in the "from" Clause
- Question: "Find the **maximum** across all departments of the **total** salary at **each** department" ("maximum", "total", "each" underlined). A big "**?**" (question to the class).
- Schema boxes: *instructor* and *department*.

### [S99] Subqueries in the "from" Clause (cont.)

```sql
select max (total_salary)
from (select dept_name, sum (salary) as tot_salary
      from instructor
      group by dept_name);
```

- `total_salary` (outer) and `tot_salary` (inner) are both in red, and the parentheses of the subquery are in blue.
- ⚠️ Apparent typo: the outer query uses `total_salary`, but the subquery names the column `tot_salary`. As written, sqlite answers "**no such column: total_salary**". Corrected to `select max (tot_salary)`, the verified output is **232000** (Comp. Sci.: 75000 + 65000 + 92000).

### [S100] Subqueries in the "from" Clause (cont.): named subquery

```sql
select max (total_salary)
from (select dept_name, sum (salary)
      from instructor
      group by dept_name) as dept_total (dept_name, tot_salary);
```

- A yellow arrow from `as` points to the callout: "*named* **subquery**: *not always* supported in SQL implementations (see if your MySQL version supports it)".
- In other words, `as dept_total (dept_name, tot_salary)` gives the subquery the name **dept_total** and names its two columns **dept_name** and **tot_salary**.
- ⚠️ Same `total_salary` / `tot_salary` mismatch as S99. The outer query should say `max (tot_salary)`.
- Verified: sqlite **does not support** this column-list form (syntax error), which illustrates the slide's warning.
  - sqlite rewrite: name the column inside the subquery and keep the name `dept_total`, i.e. `… from (select dept_name, sum (salary) as tot_salary … ) as dept_total`. Output: **232000**.
  - 🔎 Look up in Track B: which MySQL versions accept `as name (col1, col2)` after a subquery.
- ⭐ "named subquery: not always supported…"; "see if your MySQL version supports it".

### [S101] Section divider: Nested Subqueries in "select"
- Subtitle: "Subqueries with result a single value ("**Scalar Queries**")".

### [S102] Scalar Subquery
- "Scalar subquery is one which is used where a single value (i.e., one and only one row!) is expected." ("single value" underlined)
- Question: "List all departments along with the number of instructors in each department"

```sql
select dept_name,
       (select count(*)
        from instructor
        where department.dept_name = instructor.dept_name) as
num_instructors
from department;
```

- Callouts:
  - "note: **count**(*) produces one **single value**!", with an arrow to `(select count(*)`;
  - "**correlation variable** (cf. p. 98, T)", with arrows to `department` in `from department` and to `department.dept_name` inside the subquery.
- "Runtime error if subquery returns more than one result tuple. Also: note the naming of the subquery (optional here)." A yellow line connects "naming of the subquery" to the `as` after the subquery, i.e. the name `num_instructors`.
- Verified output:

| dept_name | num_instructors |
|---|---|
| Biology | 1 |
| Comp. Sci. | 3 |
| Elec. Eng. | 1 |
| Finance | 2 |
| History | 2 |
| Music | 1 |
| Physics | 2 |

- Note on verification: sqlite does **not** raise the "runtime error". When I made the subquery return several rows (`select name …`), sqlite silently used the first row.
  🔎 Look up in Track B: MySQL's error for a scalar subquery that returns more than one row.
- ⭐ "one and only one row!"; "count(*) produces one single value!"; "correlation variable (**cf. p. 98, T**)"; "Runtime error …"; "naming of the subquery (optional here)".

### [S103] Outline
- Outline divider; item **7 LAB #3 : Practice on SQL with MySQL** is highlighted.

### [S104] LAB #3: Practice on SQL
- "* Participation checked (2-3 members per working group)".
- ⭐ Participation was checked.

### [S105] LAB #3 : Practice on SQL with MySQL
- "*In class only (no slides provided).*" There is no slide content to learn here. Add your own notes from the lab session if you have them.

### [S106] Summary
- Summary: all 7 topics of Week 6 are listed (From Previous Week · Join Expressions · Set Operations · Additional Basic Operations · Aggregate Functions · Nested Subqueries · LAB #3 : Practice on SQL with MySQL).

### [S107] End of Slides
- "DATABASE — End of Slides — WEEK 6 — Code: W6.L1L2[LAB#3]".

---

## 3. Definitions & key terms (word for word)

| Term | Definition / statement on the slide | Slide |
|---|---|---|
| **Subquery** | "A **subquery** is a **select-from-where** expression (so, a subquery *is* a SQL query!) that is nested within another query." | [S60] |
| Subquery in **select** | "Ai can be replaced be [*by*] a subquery that generates a single value." | [S60] |
| Subquery in **from** | "ri can be replaced by any valid subquery." / "Any valid **subquery** is accepted" | [S60], [S94] |
| Subquery in **where** | "P can be replaced with an expression of the form: *Attribute* <operation> (**subquery**) where <operation> is to be defined (see later)." | [S60], [S62] |
| **Tests** | "A common use of subqueries is to perform tests: for set membership; for set comparisons; for set cardinality (e.g., empty relations)." | [S63], [S79], [S87] |
| **Enumerated set** | "A set where elements are explicitly listed is called enumerated set" | [S68] |
| Intersect vs. `in` | "Observe: this relates to "intersect" (that by default automatically eliminates duplicates; to retain use "intersect all")" | [S65] |
| Except vs. `not in` | "Observe: this relates to "except" (that by default automatically eliminates duplicates; to retain use "except all")" | [S67] |
| Matching attributes | "where "…" means that you have to control all "matching attributes"" | [S71] |
| Remark 2 | "This query represents a different table than before" (when attributes are dropped from the multi-attribute test) | [S77] |
| **> some** | Means: "greater than at least one". Also: < some, ≤ some, = some, ≥ some, <> some | [S82] |
| **> all** | Means: "greater than all". Also: < all, ≤ all, = all, ≥ all, <> all | [S83] |
| **exists** | "The **exists** clause returns the value **true** if the argument subquery is nonempty." | [S88] |
| exists / not exists | "**exists** r is true ⇔ r ≠ Ø"; "**not exists** r is true ⇔ r = Ø" | [S88] |
| **Correlation name** | label on `S` in `section as S` / `student as S` (and its use `S.course_id`, `S.ID` inside the subquery) | [S65], [S90], [S93] |
| **Correlated subquery** | "called: correlated subquery" (the `exists (…)` subquery that uses the outer correlation name `S`) | [S90] |
| Having vs. where | "Note: "having" not needed clause "where" used indeed" (when the grouping is done in a subquery in from) | [S97] |
| **Named subquery** | "named subquery: not always supported in SQL implementations (see if your MySQL version supports it)" — e.g. `as dept_total (dept_name, tot_salary)` | [S100] |
| **Scalar Queries** | "Subqueries with result a single value ("Scalar Queries")" | [S101] |
| **Scalar subquery** | "Scalar subquery is one which is used where a single value (i.e., one and only one row!) is expected." | [S102] |
| count(*) | "note: count(*) produces one single value!" | [S102] |
| **Correlation variable** | "correlation variable (cf. p. 98, T)" — `department` used inside the subquery | [S102] |
| Runtime error | "Runtime error if subquery returns more than one result tuple. Also: note the naming of the subquery (optional here)." | [S102] |
| LAB #3 | "* Participation checked (2-3 members per working group)"; "In class only (no slides provided)." | [S104], [S105] |

---

## 4. Subquery patterns (as taught)

General shape in where [S60, S62]: *Attribute* <operation> (**subquery**).

| Pattern | Test type [S63] | Class example | Meaning (slide's words where given) | Equivalent form shown on the slides |
|---|---|---|---|---|
| `in` | set membership | S65, S89, S74 | value (or tuple) is a member of the subquery result | `intersect` [S64/S89]; `exists` [S90] |
| `not in` | set membership | S67, S68 | value is not a member | `except` [S66] |
| `not in (list)` | set membership with **enumerated set** | S68 | "A set where elements are explicitly listed is called enumerated set" | — |
| `(a, b, c, d) in (select a, b, c, d …)` | multi-attribute membership | S74 | the whole tuple must match | join with all matching attributes [S71, S73] |
| `> some` | set comparison | S82 | "greater than at least one" | self-join [S81] ("Same previous query") |
| `> all` | set comparison | S83, S85 | "greater than all" | — (none shown on the slides) |
| `exists` | set cardinality | S90 | "true if the argument subquery is nonempty" (r ≠ Ø) | `intersect` [S89], `in` [S89] |
| `not exists` | set cardinality | S93 | true ⇔ r = Ø | — |
| `unique` | — | **not on slides 58–107** | — | 🔎 Look up in Track B: the UNIQUE subquery test |
| subquery in `from` | — | S97, S99, S100 | "Any valid subquery is accepted" | `having` [S96] |
| `with` | — | **not on slides 58–107** | — | 🔎 Look up in Track B: the WITH clause |
| scalar subquery in `select` | — | S102 | "used where a single value (i.e., one and only one row!) is expected" | — |

### 4.1 `in` (set membership) [S65, S89, S90]
- Example: "Find course id's of courses offered in Fall 2009 and Spring 2010", written as `course_id in (select course_id from section … 'Spring' … 2010)`.
- Meaning: keep a Fall 2009 row if its course_id is a member of the set of Spring 2010 course ids.
- Two versions appear:
  - S65 is correlated (`T.course_id = S.course_id`);
  - S89 is not correlated.

  Both give **CS-101**.
- Equivalent forms shown together on S89 and S90: `intersect` (S64), `in` (S65/S89) and `exists` (S90), "Two alternative solutions" plus "A third approach".
- Duplicates: `intersect` eliminates duplicates by default ("intersect all" retains them), so the `in` version uses `select distinct` [S65].

### 4.2 `not in` [S67] and enumerated sets [S68]
- Example: "… offered in Fall 2009 but not in Spring 2010", written as `course_id not in (select course_id … 'Spring' … 2010)`. Output **CS-347, PHY-101**.
- Equivalent form: `except` [S66] (by default eliminates duplicates; "except all" retains them) [S67].
- Enumerated set: `name not in ('Mozart', 'Einstein')` [S68].
- 🔎 Look up in Track B: how `not in` behaves when the subquery result contains a null (not covered on these slides).

### 4.3 Multi-attribute membership [S69–S78]
- Example: "total number of (distinct) students who have taken a course section taught by the instructor with ID number 10101".
- Written as `(course_id, sec_id, semester, year) in (select course_id, sec_id, semester, year from teaches where teaches.ID= 10101)`. Output **6**.
- Equivalent forms on the slides:
  - S71: the five-table join "where I.ID = '10101' and …" (you must "control all matching attributes");
  - S73: `takes as S join teaches as I using (course_id, sec_id, semester, year)`.
- **Remark 1** [S76]: the tuple of attributes is compared as a whole.
- **Remark 2** [S77–S78]: dropping attributes, e.g. keeping only `sec_id`, "represents a different table". The count becomes **6+6 = 12**.

### 4.4 `some` [S80–S82]
- Example: `salary > some (select salary from instructor where dept_name = 'Biology')`.
- Meaning: "greater than at least one".
- Equivalent form on the slides: the self-join `instructor as T, instructor as S where T.salary > S.salary and S.dept_name = 'Biology'` [S81], described as "Same previous query by using the "> some" clause" [S82].
- Other operators: < some, ≤ some, = some, ≥ some, <> some.

### 4.5 `all` [S83, S85, S86]
- Example: `salary > all (select salary … 'Biology')`. Meaning: "greater than all".
- With groups: `having avg (salary) >= all (select avg (salary) from instructor group by dept_name)` gives the department(s) with the highest average salary (**Physics**) [S85].
- Other operators: < all, ≤ all, = all, ≥ all, <> all.

### 4.6 `exists` [S88, S90]
- Definition: exists r is true ⇔ r ≠ Ø.
- Example: `exists (select * from section as T where semester = 'Spring' and year= 2010 and S.course_id = T.course_id)`. This is a **correlated subquery** with correlation name `S`.
- The correlation condition is essential: without it the query is **not** equivalent [S91].

### 4.7 `not exists` [S88, S93]
- Definition: not exists r is true ⇔ r = Ø.
- Example ("taken **all** Biology courses"): `not exists ( (Biology courses) except (courses taken by this student S) )`. The student is selected when nothing is left after subtracting the courses he/she took, i.e. no Biology course is missing.

### 4.8 Subquery in `from` [S94–S100]
- "Any valid subquery is accepted" [S94].
- S97: the subquery computes `avg (salary) as avg_salary` per department; the outer query filters with `where avg_salary > 42000`. "having" not needed.
- S99: `max` over the per-department `sum (salary)`, i.e. an aggregate of an aggregate (watch the `total_salary`/`tot_salary` typo).
- S100: **named subquery** `as dept_total (dept_name, tot_salary)`, "not always supported in SQL implementations (see if your MySQL version supports it)".

### 4.9 Scalar subquery in `select` [S101, S102]
- Must return "one and only one row". `count(*)` "produces one single value!"
- It uses the outer table through a **correlation variable** (`department.dept_name = instructor.dept_name`; cf. p. 98, T).
- "Runtime error if subquery returns more than one result tuple." The name (`as num_instructors`) is "optional here".

### 4.10 Correlation (applies to all of the above)
- **Correlation name** [S65, S90, S93] / **correlation variable** [S102]: a name (alias) of the outer query (S, `department`) that is used inside the subquery.
- A subquery that uses one is "called: **correlated subquery**" [S90].
- Correlated in this part: S65, S90, S93, S102. **Not** correlated: S67, S74, S82, S83, S85, S89, S91.

---

## 5. Every query example from class, worked out

### 5.0 Data used (all from class slides)
The worked outputs use the university tables exactly as shown on class slides:
- **teaches** and **takes**: [S75], tables in §2 above;
- **instructor**: [W6 S48];
- **department**: [W5 S78];
- **course**: [W6 S46];
- **section**: [W6 S56];
- **student**: [W6 S10].

**instructor** [W6 S48]

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

**department** [W5 S78]

| dept_name | building | budget |
|---|---|---|
| Biology | Watson | 90000 |
| Comp. Sci. | Taylor | 100000 |
| Elec. Eng. | Taylor | 85000 |
| Finance | Painter | 120000 |
| History | Painter | 50000 |
| Music | Packard | 80000 |
| Physics | Watson | 70000 |

**course** [W6 S46]

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

**section** [W6 S56]

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

**student** [W6 S10]

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
| 70557 | Snow | Physics | 0 |
| 76543 | Brown | Comp. Sci. | 58 |
| 76653 | Aoi | Elec. Eng. | 60 |
| 98765 | Bourikas | Elec. Eng. | 98 |
| 98988 | Tanaka | Biology | 120 |

Two sets used again and again (from **section**):
- **Fall 2009** sections: CS-101 (sec 1), CS-347 (sec 1), PHY-101 (sec 1), so the course ids are {CS-101, CS-347, PHY-101}.
- **Spring 2010** sections: CS-101 (1), CS-315 (1), CS-319 (1), CS-319 (2), FIN-201 (1), HIS-351 (1), MU-199 (1), so the course ids are {CS-101, CS-315, CS-319, CS-319, FIN-201, HIS-351, MU-199}.

### 5.1 [S64] intersect — "Fall 2009 and Spring 2010"
- SQL: see [S64].
- Step 1: first operand = {CS-101, CS-347, PHY-101}.
- Step 2: second operand = {CS-101, CS-315, CS-319, CS-319, FIN-201, HIS-351, MU-199}.
- Step 3: `intersect` keeps the ids present in both and eliminates duplicates.
- Output: **CS-101**.

### 5.2 [S65] `in` with correlation names S, T

```sql
select distinct course_id
from section as S
where semester = 'Fall' and year= 2009 and
      course_id in (select course_id
                    from section as T
                    where semester = 'Spring' and year= 2010
                          and T.course_id = S.course_id);
```

Row by row (outer rows = Fall 2009 sections):

| outer row S | inner result (Spring 2010 rows T with T.course_id = S.course_id) | `S.course_id in (…)`? | kept? |
|---|---|---|---|
| CS-101 | {CS-101} | true | ✓ |
| CS-347 | {} | false | ✗ |
| PHY-101 | {} | false | ✗ |

Output (after `distinct`): **CS-101**.

### 5.3 [S66] except — "Fall 2009 but not in Spring 2010"
- {CS-101, CS-347, PHY-101} minus {CS-101, CS-315, CS-319, FIN-201, HIS-351, MU-199}.
- Output: **CS-347, PHY-101**.

### 5.4 [S67] `not in`
- The subquery is not correlated, so it is computed once: {CS-101, CS-315, CS-319, CS-319, FIN-201, HIS-351, MU-199}.
- Outer rows:
  - CS-101 is in the set, so it is dropped;
  - CS-347 is not in it, so it is kept;
  - PHY-101 is not in it, so it is kept.
- Output: **CS-347, PHY-101**.

### 5.5 [S68] Enumerated set

```sql
select distinct name
from instructor
where name not in ('Mozart', 'Einstein');
```

- Check each of the 12 instructors against the listed set {'Mozart', 'Einstein'}; Mozart and Einstein are removed.
- Output (10 names): Crick, Katz, Srinivasan, Brandt, Kim, Wu, Singh, El Said, Califieri, Gold.

### 5.6 [S71] Five-table version with "…" (matching attributes)
- As written, `… and …;` is not runnable; the "…" is an exercise.
- **My completion** of the "…" (not on the slide; built only from the matching attributes of the boxed tables on S70):

```sql
select count (distinct S.ID)
from student as S, takes, section, teaches, instructor as I
where I.ID = '10101' and
      S.ID = takes.ID and
      takes.course_id = section.course_id and takes.sec_id = section.sec_id and
      takes.semester = section.semester and takes.year = section.year and
      section.course_id = teaches.course_id and section.sec_id = teaches.sec_id and
      section.semester = teaches.semester and section.year = teaches.year and
      teaches.ID = I.ID;
```

- Output: **6**.
- If the matching conditions are omitted (only `I.ID = '10101'`), every combination of rows survives and the count is **13**, i.e. every student. That is why the slide says you must "control all matching attributes".

### 5.7 [S73] join … using

```sql
select count (distinct S.ID)
  from takes as S join teaches as I using (course_id, sec_id,
                                                semester, year)
  where I.ID = '10101';
```

- The join pairs each takes row with the teaches row of the **same section** (same course_id, sec_id, semester, year).
- `I.ID = '10101'` keeps only 10101's sections: CS-101/1/Fall/2009, CS-315/1/Spring/2010, CS-347/1/Fall/2009.
- The 10 matching takes rows (✓ in the S75 table) belong to 6 distinct student IDs.
- Output: **6**.

### 5.8 [S74/S75] Multi-attribute `in`

```sql
select count (distinct ID)
from takes
where (course_id, sec_id, semester, year) in
                 (select course_id, sec_id, semester, year
                  from teaches
                  where teaches.ID= 10101);
```

- Step 1 (subquery):

| course_id | sec_id | semester | year |
|---|---|---|---|
| CS-101 | 1 | Fall | 2009 |
| CS-315 | 1 | Spring | 2010 |
| CS-347 | 1 | Fall | 2009 |

- Step 2: test each takes row's 4-tuple for membership. The 10 rows marked ✓ in §2 [S75] match:
  - 00128 ×2, 12345 ×3, 45678 ×1, 54321 ×1, 76543 ×1, 98765 ×2.
  - Note that 45678's **CS-101 Spring 2010** row does **not** match: same course, but a different semester and year, i.e. a section taught by someone else.
- Step 3: `count (distinct ID)` gives {00128, 12345, 45678, 54321, 76543, 98765} = **6** (without `distinct` it would be 10).

### 5.9 [S77/S78] Remark 2: only `sec_id`

```sql
select count (distinct ID)
from takes
where (sec_id) in
                 (select sec_id
                  from teaches
                  where teaches.ID= 10101);
```

- The subquery gives {1, 1, 1} = {1}, so every takes row with sec_id 1 qualifies.
- Only 3 takes rows have sec_id 2: 12345 CS-190, 54321 CS-190 and 76543 CS-319.
- The distinct IDs among the other rows are the original 6 plus **19991, 23121, 44553, 55739, 76653, 98988**.
- Output: **12** ("6+6!").

### 5.10 [S81] Self-join ("A solution we have seen…")

```sql
select distinct T.name
from instructor as T, instructor as S
where T.salary > S.salary and S.dept_name = 'Biology';
```

- `S` ranges over Biology instructors only, and there is just one: Crick, 72000.
- `T` is kept when T.salary > 72000.
- Output (7 names): **Katz (75000), Brandt (92000), Kim (80000), Wu (90000), Singh (80000), Gold (87000), Einstein (95000)**.

### 5.11 [S82] `> some`
- Subquery: Biology salaries = {72000}.
- Each instructor is kept if salary > at least one value in {72000}.
- Output: the same **7 names** as 5.10.
- Verified with the sqlite rewrite `where exists (select * from instructor as B where B.dept_name = 'Biology' and instructor.salary > B.salary)`.

### 5.12 [S83] `> all`
- Subquery: {72000}.
- Each instructor is kept if salary > every value in {72000}.
- Output: the same **7 names**. They coincide with `> some` only because the set has one element.
- Verified with the sqlite rewrites `not exists (… B.salary >= instructor.salary)` and `salary > (select max(salary) …)`.

### 5.13 [S85/S86] Highest average salary with `>= all`
- Step 1: `select avg (salary) from instructor group by dept_name;` gives the averages per group:

| dept_name (group) | avg (salary) |
|---|---|
| Biology | 72000 |
| Comp. Sci. | 77333.33… |
| Elec. Eng. | 80000 |
| Finance | 85000 |
| History | 61000 |
| Music | 40000 |
| Physics | 91000 |

- Step 2: for each group, test whether its average is ≥ **all** seven averages. Only Physics (91000) passes; for example Finance's 85000 is not ≥ 91000.
- Output: **Physics**. With the optional column [S86]: Physics | 91000.

### 5.14 [S89] Reminder: intersect and non-correlated `in`
- Intersect: as 5.1, giving **CS-101**.
- `in`: the subquery is computed once = Spring 2010 ids. Of the outer Fall 2009 rows, only CS-101 is in that set, so the output is **CS-101**.

### 5.15 [S90] `exists`, correlated

```sql
select course_id
from section as S
where semester = 'Fall' and year = 2009 and
      exists (select *
              from section as T
              where semester = 'Spring' and year= 2010
                    and S.course_id = T.course_id);
```

Row by row (verified):

| outer row S (Fall 2009) | inner rows T (Spring 2010 and T.course_id = S.course_id) | exists? | kept? |
|---|---|---|---|
| CS-101 | 1 row (CS-101, sec 1, Spring 2010) | true | ✓ |
| CS-347 | 0 rows | false | ✗ |
| PHY-101 | 0 rows | false | ✗ |

Output: **CS-101**.

### 5.16 [S91] Same without the correlation condition
- The inner query (Spring 2010 sections) does not mention `S`, so it is the same 7 rows for every outer row. It is non-empty, so `exists` is true for every outer row.
- Output: **CS-101, CS-347, PHY-101**, which is not equivalent to S90.

### 5.17 [S93] `not exists … except` ("all Biology courses")

```sql
select ID, name
from student as S
where  not exists ( ( select course_id
                      from course
                      where dept_name = 'Biology' )
                    except
                    ( select T.course_id
                      from takes as T
                      where S.ID = T.ID ) );
```

- Blue part (same for everyone): Biology courses = {BIO-101, BIO-301, BIO-399}.
- Yellow part (depends on the current student S): the courses S took.
- Row by row (verified):

| student S | courses taken by S (yellow) | Biology courses not taken (blue except yellow) | `not exists` | kept? |
|---|---|---|---|---|
| 00128 Zhang | CS-101, CS-347 | BIO-101, BIO-301, BIO-399 | false | ✗ |
| 12345 Shankar | CS-101, CS-190, CS-315, CS-347 | BIO-101, BIO-301, BIO-399 | false | ✗ |
| 19991 Brandt | HIS-351 | BIO-101, BIO-301, BIO-399 | false | ✗ |
| 23121 Chavez | FIN-201 | BIO-101, BIO-301, BIO-399 | false | ✗ |
| 44553 Peltier | PHY-101 | BIO-101, BIO-301, BIO-399 | false | ✗ |
| 45678 Levy | CS-101, CS-319 | BIO-101, BIO-301, BIO-399 | false | ✗ |
| 54321 Williams | CS-101, CS-190 | BIO-101, BIO-301, BIO-399 | false | ✗ |
| 55739 Sanchez | MU-199 | BIO-101, BIO-301, BIO-399 | false | ✗ |
| 70557 Snow | (none) | BIO-101, BIO-301, BIO-399 | false | ✗ |
| 76543 Brown | CS-101, CS-319 | BIO-101, BIO-301, BIO-399 | false | ✗ |
| 76653 Aoi | EE-181 | BIO-101, BIO-301, BIO-399 | false | ✗ |
| 98765 Bourikas | CS-101, CS-315 | BIO-101, BIO-301, BIO-399 | false | ✗ |
| 98988 Tanaka | BIO-101, BIO-301 | **BIO-399** | false | ✗ |

- Output on the class data: **no rows**.
- What-if (run on a separate copy of the data): if Tanaka also had a takes row for BIO-399, the except result for Tanaka would be empty, `not exists` would be true, and the output would be **98988 | Tanaka**.

### 5.18 [S96] having

```sql
select dept_name, avg (salary) as avg_salary
from instructor
group by dept_name
having avg_salary > 42000;
```

- Group by department and compute the averages (table in 5.13).
- `having` removes groups with average ≤ 42000; only Music (40000) is removed.
- Output (6 rows): Biology 72000, Comp. Sci. 77333.33…, Elec. Eng. 80000, Finance 85000, History 61000, Physics 91000.

### 5.19 [S97] The same with a subquery in from

```sql
select dept_name, avg_salary
from (select dept_name, avg (salary) as avg_salary
      from instructor
      group by dept_name)
where avg_salary > 42000;
```

- Step 1: the subquery builds the 7-row table (dept_name, avg_salary) shown on S97.
- Step 2: the outer `where` filters that table row by row; the red-boxed Music 40000 row fails.
- Output: the same 6 rows as 5.18 ("having" not needed; "where" used).

### 5.20 [S99] max of the total salary per department

```sql
select max (total_salary)
from (select dept_name, sum (salary) as tot_salary
      from instructor
      group by dept_name);
```

- As written: error "no such column: total_salary" (⚠️ typo; the column is named `tot_salary`).
- With `max (tot_salary)`:
  - Step 1 (subquery):

| dept_name | tot_salary |
|---|---|
| Biology | 72000 |
| Comp. Sci. | 232000 |
| Elec. Eng. | 80000 |
| Finance | 170000 |
| History | 122000 |
| Music | 40000 |
| Physics | 182000 |

  - Step 2: max over that column gives **232000**.

### 5.21 [S100] Named subquery

```sql
select max (total_salary)
from (select dept_name, sum (salary)
      from instructor
      group by dept_name) as dept_total (dept_name, tot_salary);
```

- `dept_total` names the derived table and `(dept_name, tot_salary)` names its columns. The intermediate table is the same as in 5.20.
- Output (with the `tot_salary` fix): **232000**.
- sqlite does not accept the `(dept_name, tot_salary)` column list. The rewrite `… sum (salary) as tot_salary … ) as dept_total` gives 232000.

### 5.22 [S102] Scalar subquery in select

```sql
select dept_name,
       (select count(*)
        from instructor
        where department.dept_name = instructor.dept_name) as
num_instructors
from department;
```

Row by row (one subquery evaluation per **department** row, using the correlation variable `department`):

| department row | instructors with that dept_name | count(*) = num_instructors |
|---|---|---|
| Biology | Crick | 1 |
| Comp. Sci. | Katz, Srinivasan, Brandt | 3 |
| Elec. Eng. | Kim | 1 |
| Finance | Wu, Singh | 2 |
| History | El Said, Califieri | 2 |
| Music | Mozart | 1 |
| Physics | Gold, Einstein | 2 |

- Each evaluation returns exactly one row (count(*) "produces one single value!"), so it is a valid scalar subquery.

---

## 6. Likely quiz/exam questions (built only from these slides)

1. **(Fill in)** "A subquery is a ______ expression (so, a subquery *is* a SQL query!) that is ______."
2. **(MCQ)** In `select A1,…,An from r1,…,rm where P`, which statement matches the slides?
   (a) Ai can be replaced by any valid subquery
   (b) ri can be replaced by any valid subquery
   (c) P can only be replaced by an `exists` test
   (d) ri can only be replaced by a subquery that generates a single value
3. **(Matching)** Match each kind of test with its SQL constructs: set membership / set comparison / set cardinality ↔ `exists`, `not exists` / `in`, `not in` / `some`, `all`.
4. **(MCQ)** `exists r` is true if and only if:
   (a) r = Ø
   (b) r ≠ Ø
   (c) r has exactly one tuple
   (d) r has no duplicates

   And when is `not exists r` true?
5. **(Rewrite `in` as `exists`)** Rewrite the S89 query `select distinct course_id from section where semester = 'Fall' and year= 2009 and course_id in (select course_id from section where semester = 'Spring' and year= 2010);` using `exists`. What does it return?
6. **(Write with `not exists`)** "Find course id's of courses offered in Fall 2009 **but not in** Spring 2010". The slides solved it with `except` (S66) and `not in` (S67); write it with `not exists` and give the output.
7. **(S91)** Is the S90 query still equivalent if you delete `and S.course_id = T.course_id`? Why / why not? What does it return? Why does deleting the correlation from the `in` version (S65 → S89) *not* change the result?
8. **(Correlated or not?)** Which of these queries contain a correlated subquery: S65, S67, S74, S89 (`in`), S90, S93, S102?
9. **(`> some` vs `> all`)**
   - (a) Why do S82 (`> some`) and S83 (`> all`) return exactly the same names on the class data?
   - (b) Replace `'Biology'` by `'Comp. Sci.'` in both queries. What does each return?
10. **(S85)** What does S85 return? What would it return if `>= all` were replaced by `> all`, and why?
11. **(S74)** What does S74 return? What would `count (ID)` (without `distinct`) return, and why is it different?
12. **(Remark 2)** What does the S74 query return if only `sec_id` is kept in both attribute lists (S77)? Why does the slide call this "a different table"?
13. **(S71)** What must the "…" contain? What happens to the count if you keep only `I.ID = '10101'`?
14. **(S93)** What does the "all Biology courses" query return on the class data? Explain using student Tanaka. What would change if Tanaka also had a takes row for BIO-399?
15. **(S96 → S97)** Rewrite the `having` query of S96 with a subquery in `from`. Why is `having` not needed? What is the output?
16. **(Spot the error, S99/S100)** What is wrong with `select max (total_salary) from (select dept_name, sum (salary) as tot_salary from instructor group by dept_name);`? Correct it and give the output.
17. **(S100)** What does `as dept_total (dept_name, tot_salary)` do, and what does the slide warn about it?
18. **(S102)** What does the S102 query output? What is `department` inside the subquery called? What happens if the subquery returns more than one tuple?
19. **(MCQ, duplicates)** `intersect` and `except` by default automatically eliminate duplicates. Which keyword retains them, and which keyword in the `in` / `not in` versions (S65, S67) plays the role of that duplicate elimination?
20. **(S68)** What is an *enumerated set*? What does `select distinct name from instructor where name not in ('Mozart', 'Einstein');` return?

### Answers

1. **select-from-where**; **nested within another query** [S60].
2. **(b)** [S60]. Ai may only be replaced by "a subquery that generates a single value", and P by "*Attribute* <operation> (**subquery**)".
3. Set membership ↔ `in`, `not in` [S64–S78]. Set comparison ↔ `some`, `all` [S80–S86]. Set cardinality (empty relations) ↔ `exists`, `not exists` [S63, S87–S93].
4. **(b)**: "exists r is true ⇔ r ≠ Ø". `not exists r` is true ⇔ r = Ø [S88].
5. The slide's third approach [S90]:

   ```sql
   select course_id
   from section as S
   where semester = 'Fall' and year = 2009 and
         exists (select *
                 from section as T
                 where semester = 'Spring' and year= 2010
                       and S.course_id = T.course_id);
   ```

   Output: **CS-101** (verified).
6. Using only slide constructs (`not exists` [S88] plus the correlation names of S90):

   ```sql
   select course_id
   from section as S
   where semester = 'Fall' and year = 2009 and
         not exists (select *
                     from section as T
                     where semester = 'Spring' and year= 2010
                           and S.course_id = T.course_id);
   ```

   Verified output: **CS-347, PHY-101**, the same as S66 and S67.
7. **Not equivalent** [S91]. Without the condition, the subquery does not depend on `S`: it is always the 7 Spring 2010 sections, non-empty, so `exists` is true for every Fall 2009 row. Verified output: **CS-101, CS-347, PHY-101** instead of CS-101.

   In the `in` version the comparison is made by `course_id in (…)` itself, so S89 (no correlation) still gives **CS-101**, like S65 [S65, S89].
8. **Correlated:** S65 (`S.course_id`), S90 ("called: correlated subquery"), S93 (`S.ID`), S102 (correlation variable `department`). **Not correlated:** S67, S74, S89. Their subqueries do not use any name of the outer query [S65, S90, S93, S102].
9.
   - (a) The subquery returns only **one** salary, {72000} (Crick is the only Biology instructor). "Greater than at least one" and "greater than all" are then the same test. Both return Katz, Brandt, Kim, Wu, Singh, Gold, Einstein [S82, S83].
   - (b) Comp. Sci. salaries = {75000, 65000, 92000}.
     - `> some` (greater than at least one, i.e. > 65000): **Crick, Katz, Brandt, Kim, Wu, Singh, Gold, Einstein** (8 names; Srinivasan's 65000 is not > 65000).
     - `> all` (> 92000): **Einstein** only.
     - Verified with sqlite rewrites.
10. **Physics** [S85] (verified). With `> all`: **no rows** (verified). The subquery's set also contains Physics' own average (91000), and 91000 > 91000 is false; `>=` allows equality.
11. **6** [S75]. Without `distinct`: **10**, because 10 takes rows match. Student 12345 took 3 of 10101's sections, and 00128 and 98765 took 2 each [S75] (verified).
12. **12**, shown on S78 as "6+6!" (verified). All of 10101's sections have sec_id 1, so the test becomes "took any section number 1". It adds 19991, 23121, 44553, 55739, 76653, 98988, i.e. a different table from the intended one [S77, S78].
13. All "matching attributes" [S71]:
    - `S.ID = takes.ID`;
    - takes = section on course_id, sec_id, semester, year;
    - section = teaches on the same four attributes;
    - `teaches.ID = I.ID`.

    That gives **6** (verified, §5.6). With only `I.ID = '10101'` you get the Cartesian combinations and the count is **13** (every student).
14. **No rows** (verified) [S93]. Tanaka took BIO-101 and BIO-301, but the Biology courses are {BIO-101, BIO-301, BIO-399}. "Biology courses except Tanaka's courses" = {BIO-399} is non-empty, so `not exists` is false. Everyone else is missing all three.

    If Tanaka also had BIO-399, the except result would be empty and the output would be **98988 | Tanaka** (verified on a copy).
15. [S97]:

    ```sql
    select dept_name, avg_salary
    from (select dept_name, avg (salary) as avg_salary
          from instructor
          group by dept_name)
    where avg_salary > 42000;
    ```

    The grouping happens inside the subquery, whose result is an ordinary table with a column `avg_salary`. A plain `where` can filter it ("having" not needed; "where" used indeed). Output: Biology 72000, Comp. Sci. 77333.33…, Elec. Eng. 80000, Finance 85000, History 61000, Physics 91000 (Music 40000 is removed) (verified).
16. The outer query uses `total_salary`, but the subquery names the column `tot_salary`; sqlite reports "no such column: total_salary". Fix: `select max (tot_salary) …`. The per-department totals are 72000, 232000, 80000, 170000, 122000, 40000, 182000, so the output is **232000** (verified) [S99].
17. It **names the subquery** `dept_total` and its columns `dept_name`, `tot_salary`. The slide warns: "named subquery: *not always* supported in SQL implementations (see if your MySQL version supports it)" [S100]. sqlite indeed rejects the column list.
18. Output [S102] (verified): Biology 1, Comp. Sci. 3, Elec. Eng. 1, Finance 2, History 2, Music 1, Physics 2. `department` is a **correlation variable** (cf. p. 98, T). If the subquery returns more than one tuple, it is a "**Runtime error**". (sqlite does not reproduce this error; it silently takes the first row.)
19. "**intersect all**" / "**except all**" retain duplicates. In the subquery versions, `select **distinct**` (underlined in red, linked to the Observe note) plays the role of the default duplicate elimination [S65, S67].
20. "A set where elements are explicitly listed is called **enumerated set**" [S68]. Output (verified): Crick, Katz, Srinivasan, Brandt, Kim, Wu, Singh, El Said, Califieri, Gold (10 names).

---

## 7. Self-check: "I can…"

- [ ] I can quote the slide definition of a subquery and say what may replace Ai, ri and P in `select A1… from r1… where P` (single value / any valid subquery / *Attribute* <operation> (subquery)) [S60].
- [ ] I can name the three kinds of tests a where-subquery performs (membership, comparison, cardinality) and the keywords for each [S63, S88].
- [ ] I can write "Fall 2009 **and** Spring 2010" three ways (`intersect`, `in`, `exists`) and "Fall 2009 **but not in** Spring 2010" with `except`, `not in` and `not exists`, and get CS-101 and CS-347, PHY-101 by hand [S64–S67, S89–S90].
- [ ] I can explain what a correlation name is, which queries are correlated, and why deleting `S.course_id = T.course_id` breaks the `exists` query but not the `in` query [S65, S89–S91].
- [ ] I can write a multi-attribute `in` on (course_id, sec_id, semester, year), and explain why the answer is 6, why dropping attributes gives 6+6, and why `distinct` matters (10 vs 6) [S74–S78].
- [ ] I can explain `> some` ("greater than at least one") versus `> all` ("greater than all") and predict their outputs on the instructor table, including why they coincide for Biology [S82, S83].
- [ ] I can find the department with the highest average salary using `having avg (salary) >= all (…)` and explain why `> all` would return nothing [S85, S86].
- [ ] I can write a "taken **all** courses of a department" query with `not exists ( … except … )` and evaluate it student by student [S93].
- [ ] I can move a `having` condition into a `where` over a subquery in `from`, compute the max of department totals, and spot the `total_salary`/`tot_salary` slip [S96–S100].
- [ ] I can write a scalar subquery in `select`, point out its correlation variable, and state what happens if it returns more than one row [S101, S102].
