# Database (SOC3020-003): quiz and midterm kit (START HERE)

## ⏰ Dates that matter
| When | What | Weight |
|---|---|---|
| **Tue 20 Oct, 12:00 noon** (strict) | **HW #2 upload**, one zip from the team leader. LaTeX is mandatory. If it's late or missing you get **0 and are not admitted to Quiz #2** | graded via the quiz |
| **Fri 23 Oct** (2nd class of week 7) | **Quiz #2**, individual and timed, on the HW #2 tasks | quizzes = **25%** |
| **Week 8 (24–30 Oct)**, classes Tue/Fri, so probably **Tue 27 or Fri 30** | **MIDTERM**, weeks 1–7 | **25%** |

- The average of your exams must not be an F, or you fail the course.
- Cheating on homework = 0 for the whole team, including future homework.
- **AI is allowed on homework only if declared** in each exercise (model name + full prompt history). The `.sql` comments must be written by you.

## The two tracks (kept separate on purpose)
| Folder | What's inside | Use it for |
|---|---|---|
| `A - FROM CLASS (slides only)/` | Only the professor's slides and homework PDFs | **What he tests**, in his notation |
| `B - OUTSIDE (internet research)/` | Cited internet research, with queries run on PostgreSQL, SQLite and MySQL | **Understanding**, MySQL pitfalls, extra practice |

### A: FROM CLASS
1. **`assignments/README - what the homeworks ask (Quiz 2 prep).md`**: **read this first for Friday.** It covers what HW #2 requires and the professor's exact schema notation (`wf_`/`m_`/`c_` FK prefixes, `Name_Fname` for flattened composites, multivalued attributes moved into their own relation).
2. `notes-by-week/`: slide-by-slide notes for all **515 slides** (weeks 1–6; the big weeks are split into 2 parts). Each file has about 20 practice questions with answers, and the SQL was re-run in sqlite3.
3. `slides-pdf (original)/`: the professor's original PDFs. `slide-images/` and `slide-text/` hold the raw material.
4. **`QUIZ 2 + MIDTERM REVIEW (from slides only).md`** ← **your main file**. It contains:
   - **§1 the Quiz #2 steps**: E-R → 3NF in his notation → DDL → INSERT, with the full Company DB DDL
   - **§2 a mock Quiz #2** (Clinic DB) with a full model answer in §9.7
   - definitions, plus relational algebra / normalization / SQL sheets
   - **§8 all slide traps and typos**
   - **§9 a 41-question mock midterm with answers**
   - **§10 the last-48-hours checklist**

   It also flags that **Employee ↔ Department point at each other with NOT NULL foreign keys**, so the first INSERT fails. The fix is to create one table without its FK, load the rows, then add the FK with `ALTER TABLE`.

### B: OUTSIDE
1. **`reports/Database midterm research.md`**: the main report, *"Know What Your Schema Actually Enforces"*. It covers:
   - turning (min,max) into SQL constraints;
   - when you need a trigger;
   - the full COMPANY schema in MySQL;
   - MySQL traps that silently drop constraints;
   - SQL traps (NOT IN with NULL, natural join, COUNT after an outer join);
   - a study plan.
2. `research_notes/Database midterm research/01–05_*.md`: five detailed files (relational model, E-R, normalization, SQL, advanced SQL).

## ⚠️ Things to know before Friday
- **E-R diagrams use the "look-here" rule for (min,max) (Week 3 S70).** The pair sits next to the entity it describes.
- **In the 3NF logical schema (Week 4 S59, the notation HW #2 requires), every (min,max) label moves to the OPPOSITE end.** Example: `manages` is Employee (0,1)–Department (1,1) in the E-R diagram, but Employee (1,1)–Department (0,1) in the logical schema. In the schema, the label next to a table = how many rows of that table go with one row at the other end. Red labels come from the E-R diagram; blue labels are created by the mapping (`D_Locations`, `works_on`).
- **The professor's Company DB solution (Week 3 S94) labels `works_for` as Employee (0,\*) – Department (0,1).** By his own look-here rule this contradicts sentences ① and ②; every other relationship on that slide follows the rule. His logical-schema slide (W4 S59) has works_for as Employee (1,\*)–Department (1,1), which does match the sentences, so the E-R labels are most likely a slip. ➜ **Ask Prof. Agostini before the quiz which reading he wants.** This also makes a good discussion question, and discussion is 10% of your grade.
- **MySQL 8 silently ignores a column-level `REFERENCES`.** Always write `FOREIGN KEY (col) REFERENCES t(col)` as its own clause, and check that the tables use InnoDB.
- **Keys cannot enforce a minimum** on the "one" side of 1:N or on either side of M:N. That needs a trigger (see the Track B report).
- Several slide SQL examples have typos that won't run if copied. These are flagged ⚠️ in the notes, e.g. W5 S35 is missing `)`, S57 has `'Comp. Sci'`, S85–87 has `using course_id` without parentheses, and W6 S99 uses `total_salary` where the column is `tot_salary`.
- **Week 7 (advanced SQL: windowing, constraints, triggers) slides are not uploaded yet.** Use Track B file 05 for now.
