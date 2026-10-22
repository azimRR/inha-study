# SQL from Basics to Intermediate Queries — Silberschatz, Korth & Sudarshan, *Database System Concepts* 6th ed., Ch. 3.1–3.9 + 4.1, with MySQL 8.0 specifics (exam notes, SOC3020-003)

> **How to read these notes**
> - All worked queries use the textbook's university schema and the authors' official **small sample data**, which "matches Appendix A exactly" ([db-book sample tables page](https://www.db-book.com/db6/lab-dir/sample_tables-dir/index.html), [standard DDL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL.sql), [MySQL DDL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL-MySQL.sql), [data](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)).
> - **[V]** means I executed the query on that data, and the result was identical on all engines unless a difference is stated. The engines were: **PostgreSQL 16.14** (local; closest to standard SQL), **SQLite 3.54.0** (local; the same engine family as db-book's in-browser interpreter, whose bundled SQLite version may be older), and **MySQL 8.0.44** (InnoDB, default `sql_mode`). MySQL ran through the paiza.io online runner, because MySQL is not installed on this machine. **[V-MySQL]**, **[V-PG]** and **[V-SQLite]** mark single-engine checks. The link on each tag points to the data file that was used.
> - MySQL manual links point to Oracle's hosted copy of the *MySQL 8.0 Reference Manual* (`docs.oracle.com/cd/E17952_01/mysql-8.0-en/<page>.html`). The same page names exist under `dev.mysql.com/doc/refman/8.0/en/`, but that site returned HTTP 403 to automated fetching.
> - **Sample-data cheat sheet** (from the [data file](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)):
>   - **instructor(ID, name, dept_name, salary):** 10101 Srinivasan Comp. Sci. 65000 · 12121 Wu Finance 90000 · 15151 Mozart Music 40000 · 22222 Einstein Physics 95000 · 32343 El Said History 60000 · 33456 Gold Physics 87000 · 45565 Katz Comp. Sci. 75000 · 58583 Califieri History 62000 · 76543 Singh Finance 80000 · 76766 Crick Biology 72000 · 83821 Brandt Comp. Sci. 92000 · 98345 Kim Elec. Eng. 80000. Total 898000, average 74833.33.
>   - **section by term:**
>     - Fall 2009: CS-101/1, CS-347/1, PHY-101/1.
>     - Spring 2010: CS-101/1, CS-315/1, CS-319/1, CS-319/2, FIN-201/1, HIS-351/1, MU-199/1.
>     - Spring 2009: CS-190/1, CS-190/2, EE-181/1.
>     - Summer: BIO-101 (2009), BIO-301 (2010).
>     - BIO-399 is **never offered**.
>   - **takes** has 22 rows. The only NULL grade is (98988 Tanaka, BIO-301, Summer 2010). Student **70557 Snow takes nothing**. Instructors who teach nothing: **Gold, Califieri, Singh**. Students taking courses outside their own department: **45678 Levy** (Physics; CS-101 twice and CS-319) and **98765 Bourikas** (Elec. Eng.; CS-101 and CS-315).
>   - Row counts: student 13, course 13, department 7, advisor 9, prereq 7, teaches 15, section 15.

---

## 1. DDL: CREATE TABLE, basic types, constraints (and what MySQL actually enforces), DROP vs DELETE vs ALTER

### Takeaway
A `CREATE TABLE` gives each attribute a domain and declares integrity constraints:
- `PRIMARY KEY` means unique and automatically NOT NULL.
- `FOREIGN KEY … REFERENCES` checks the value against the referenced table.
- `NOT NULL` and `UNIQUE` work as their names suggest.
- `CHECK` rejects a row only when its condition is FALSE, so NULL/UNKNOWN passes.

In MySQL 8.0 with InnoDB, these are all enforced, but **CHECK only from 8.0.16**. FKs must be written table-level with an explicit column list, e.g. `REFERENCES department(dept_name)`; MySQL **silently ignores** inline column-level `REFERENCES`. `DROP` removes the schema and the data, `DELETE` removes rows only, `TRUNCATE` is DDL, and `ALTER` adds or drops attributes.

### Cited Findings
**SQL overview (3.1–3.2)**
- History: SQL began as IBM's Sequel (System R) and was standardized as SQL-86, SQL-89, SQL-92, SQL:1999 and SQL:2003. "Commercial systems offer most, if not all, SQL-92 features, plus varying feature sets from later standards and special proprietary features." — [Ch. 3 slides (6th ed.)](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
- DDL specifies "the schema for each relation", "the domain of values associated with each attribute" and "integrity constraints", among other things. — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
- "SQL names are case insensitive (i.e., you may use upper- or lower-case letters.)" — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)

**Basic types**
- Textbook domain types (from the Ch. 3 slides):
  - `char(n)`: fixed length.
  - `varchar(n)`: variable length, maximum n.
  - `int` and `smallint`: machine-dependent integers.
  - `numeric(p,d)`: fixed point, p digits with d after the decimal point. Example: "numeric(3,1), allows 44.5 to be stores [sic] exactly, but not 444.5 or 0.32".
  - `real`, `double precision`, and `float(n)` (at least n digits).
  
  Source: [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
- Date and time types (Ch. 4): `date '2005-7-27'`, `time '09:00:30'`, and `timestamp` (date plus time of day). — [Ch. 4 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch4.ppt)
- MySQL: "NUMERIC is implemented as DECIMAL" — [MySQL manual: fixed-point types](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/fixed-point-types.html). "MySQL retrieves and displays DATE values in 'YYYY-MM-DD' format." — [MySQL manual: DATE](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/datetime.html)
- **numeric(3,1) in MySQL**, tested on `create table nt (x numeric(3,1))`:
  - `44.5` is stored exactly.
  - `0.32` is stored as `0.3` (rounded, so not exactly).
  - `444.5` is rejected with `ERROR 1264 (22003): Out of range value for column 'x'`.
  
  — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **Strict mode.** Inserting a 29-character dept_name into `varchar(20)` gives `ERROR 1406 (22001): Data too long for column 'dept_name'`. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - The server's default `sql_mode` was `ONLY_FULL_GROUP_BY, STRICT_TRANS_TABLES, NO_ZERO_IN_DATE, NO_ZERO_DATE, ERROR_FOR_DIVISION_BY_ZERO, NO_ENGINE_SUBSTITUTION`. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - "Strict mode controls how MySQL handles invalid or missing values in data-change statements such as INSERT or UPDATE." — [MySQL manual: SQL modes](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/sql-mode.html)
- MySQL CHAR: "When CHAR values are stored, they are right-padded with spaces"; "When CHAR values are retrieved, trailing spaces are removed unless the PAD_CHAR_TO_FULL_LENGTH SQL mode is enabled." — [MySQL manual: CHAR/VARCHAR](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/char.html)

**Constraints**
- The textbook's constraint forms are `not null`, `primary key (A1, ..., An)` and `foreign key (Am, ..., An) references r`. The slides add that a "primary key declaration on an attribute automatically ensures not null". — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
- MySQL confirms this. `SHOW CREATE TABLE instructor` lists `ID varchar(5) NOT NULL`, although the DDL never says NOT NULL for ID. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- The official DDL uses several constraint forms. — [standard DDL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL.sql)
  - CHECK constraints: `check (budget > 0)`, `check (salary > 29000)`, `check (semester in ('Fall','Winter','Spring','Summer'))`, `check (year > 1701 and year < 2100)`, `check (tot_cred >= 0)`.
  - FK actions: `on delete set null` and `on delete cascade`.
- **The textbook DDL does not run unchanged on MySQL.**
  - db-book ships a separate "DDL for MySQL". Diffing the two files shows the only change: every `references t` gets an explicit column list, e.g. `references department(dept_name)`. — [standard DDL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL.sql), [MySQL DDL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL-MySQL.sql)
  - The standard form `foreign key (d) references department` fails with `ERROR 1239 (42000): Incorrect foreign key definition … Key reference and table reference don't match`. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - MySQL's syntax is `FOREIGN KEY [index_name] (col_name, ...) REFERENCES tbl_name (col_name,...) [ON DELETE reference_option] [ON UPDATE reference_option]`, with options `RESTRICT | CASCADE | SET NULL | NO ACTION | SET DEFAULT`. — [MySQL manual: FOREIGN KEY](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/create-table-foreign-keys.html)
- **Inline REFERENCES are ignored.**
  - The manual: "MySQL parses but ignores 'inline REFERENCES specifications' (as defined in the SQL standard) where the references are defined as part of the column specification." — [MySQL manual: FK differences](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/ansi-diff-foreign-keys.html)
  - On 8.0.44 with InnoDB, `create table fk_inline (d varchar(20) references department(dept_name))` produced **no FK**: SHOW CREATE TABLE shows none, and `'Nowhere'` was accepted. The table-level version rejected `'Nowhere'` with `ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails`. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **The storage engine matters.**
  - "issuing a CREATE TABLE statement without an ENGINE clause creates an InnoDB table" (unless reconfigured); "InnoDB supports FOREIGN KEY constraints". — [MySQL manual: InnoDB intro](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/innodb-introduction.html)
  - InnoDB "Supports transactions, row-level locking, and foreign keys". — [MySQL manual: storage engines](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/storage-engines.html)
  - The online runner's server was configured with **MyISAM** as its default. On that run:
    - The orphan FK insert was accepted.
    - `TRUNCATE`/`DROP` of the referenced `department` table succeeded.
    - `BEGIN … ROLLBACK` did **not** undo deletes or inserts.
    
    All of these behaved correctly once InnoDB was forced. — [V-MySQL, MyISAM vs InnoDB runs](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **CHECK in MySQL:**
  - "Prior to MySQL 8.0.16, CREATE TABLE permits only the following limited version of table CHECK constraint syntax, which is parsed and ignored".
  - "As of MySQL 8.0.16, CREATE TABLE permits the core features of table and column CHECK constraints, for all storage engines."
  - The condition "must evaluate to TRUE or UNKNOWN (for NULL values) for each row… If the condition evaluates to FALSE, it fails and a constraint violation occurs."
  
  — [MySQL manual: CHECK constraints](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/create-table-check-constraints.html)
- CHECK checks on the sample data:
  - `insert into instructor values ('88888','Low','Physics',20000)` gives `ERROR 3819 (HY000): Check constraint 'instructor_chk_1' is violated.` — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - The same insert with salary **NULL is accepted** by `check (salary > 29000)`. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- Other constraint violations in MySQL:
  - NOT NULL: `ERROR 1048 (23000): Column 'name' cannot be null`.
  - Duplicate PK: `ERROR 1062 (23000): Duplicate entry '10101' for key 'instructor.PRIMARY'`.
  - A UNIQUE column accepted **two NULL rows** plus the value 1; a second 1 failed with ERROR 1062.
  
  — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- ON DELETE CASCADE: deleting course BIO-399 also deleted its `prereq` row (prereq.course_id → course is `on delete cascade`). `ROLLBACK` restored it under InnoDB. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)

**DROP vs DELETE vs ALTER vs TRUNCATE**
- The textbook's statements, from the Ch. 3 slides:
  - `delete from student` removes all tuples.
  - `drop table r` removes the table.
  - `alter table r add A D` adds attribute A; "All exiting [sic] tuples in the relation are assigned null as the value for the new attribute".
  - `alter table r drop A`; "Dropping of attributes not supported by many databases".
  
  Source: [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
- MySQL DROP: "For each table, it removes the table definition and all table data." — [MySQL manual: DROP TABLE](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/drop-table.html)
  - `drop table department` while `course` references it fails with `ERROR 3730 (HY000): Cannot drop table 'department' referenced by a foreign key constraint 'course_ibfk_1' on table 'course'.` — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- MySQL TRUNCATE:
  - It is "similar to a DELETE statement that deletes all rows, or a sequence of DROP TABLE and CREATE TABLE statements".
  - It "is classified as a DDL statement rather than a DML statement".
  - It "cannot be performed for InnoDB tables with parent-child foreign key relationships".
  - "Truncate operations cause an implicit commit, and so cannot be rolled back."
  
  — [MySQL manual: TRUNCATE](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/truncate-table.html)
  - `truncate table department` fails with `ERROR 1701 (42000): Cannot truncate a table referenced in a foreign key constraint`. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- MySQL `ALTER TABLE` supports ADD/DROP of columns: "To add a column at a specific position within a table row, use FIRST or AFTER col_name." — [MySQL manual: ALTER TABLE](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/alter-table.html)

### Inferences
**Summary table**

| Statement | Removes rows | Removes schema | Undo with ROLLBACK (InnoDB) | FK-referenced table |
|---|---|---|---|---|
| `DELETE FROM r` | all, or those matching WHERE | no | yes | allowed; FK actions fire |
| `TRUNCATE TABLE r` | all | no | no (implicit commit) | error 1701 |
| `DROP TABLE r` | all | yes | no | error 3730 |
| `ALTER TABLE r ADD/DROP …` | no | changes schema | no | — |

**Likely quiz points**
- PK means UNIQUE plus NOT NULL, and there is one PK per table.
- UNIQUE allows multiple NULLs.
- CHECK passes on NULL, so add `NOT NULL` if NULLs must be forbidden.
- FK values must exist in the referenced key, unless NULL.

**MySQL lab traps**
- Run `SELECT VERSION();` first. Below 8.0.16, CHECK is silently ignored.
- Always use the table-level `FOREIGN KEY (…) REFERENCES t(col)` form.
- If FKs or ROLLBACK seem not to work, run `SHOW CREATE TABLE t` and check that it says `ENGINE=InnoDB`.

**Types**
- Use `numeric`/`decimal` for money (exact), not `float`.
- `numeric(p,d)` is p total digits, of which d are after the decimal point. So `numeric(8,2)` holds values up to 999999.99.

### Gaps
- Behavior on newer MySQL lines (8.4 LTS, 9.x) was not tested. In particular, I did not check whether inline column `REFERENCES` is still ignored there. Verify on the lab's server.
- I did not verify the textbook's own text, for example its char-vs-varchar comparison remarks, against the printed book. I used only the authors' free slides, solutions and data, since no legitimate full text was available.

---

## 2. Basic query structure: SELECT–FROM–WHERE, conceptual evaluation order, DISTINCT/ALL, Cartesian product, renaming and tuple variables, LIKE, ORDER BY, BETWEEN, tuple comparison

### Takeaway
Read every query as follows: form the Cartesian product of the FROM relations; keep only rows whose WHERE predicate is TRUE (FALSE and UNKNOWN are dropped); then GROUP BY, then HAVING; then compute the SELECT list; then DISTINCT; then ORDER BY.

SQL results are **multisets**: duplicates stay unless you say DISTINCT. Missing join conditions silently give Cartesian products.

### Cited Findings
- The FROM clause "corresponds to the Cartesian product operation of the relational algebra". The "Cartesian product [is] not very useful directly, but useful combined with where-clause condition". — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
  - `select count(*) from instructor, teaches` returns **180** (= 12 × 15). — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- Duplicates: `select dept_name from instructor` returns **12 rows**; `select distinct dept_name from instructor` returns **7**. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- A join written in WHERE keeps duplicates. This query returns **8 rows**: Brandt CS-190, **Brandt CS-190 again** (two sections; sec_id is not selected), Brandt CS-319, Katz CS-101, Katz CS-319, Srinivasan CS-101, Srinivasan CS-315, Srinivasan CS-347. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  ```sql
  select name, course_id from instructor, teaches
  where instructor.ID = teaches.ID and instructor.dept_name = 'Comp. Sci.';
  ```
- Rename: "Keyword as is optional and may be omitted". — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
- The tuple-variable classic, "salary greater than at least one instructor in Biology", returns **Brandt, Einstein, Gold, Katz, Kim, Singh, Wu**. The only Biology instructor is Crick (72000), so this is everyone earning more than 72000. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  ```sql
  select distinct T.name
  from instructor as T, instructor as S
  where T.salary > S.salary and S.dept_name = 'Biology';
  ```
- `select instructor.* from instructor, teaches where instructor.ID = teaches.ID and teaches.course_id = 'CS-101'` returns the full rows of Srinivasan and Katz. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **A SELECT alias cannot be used in WHERE**, which is consistent with "WHERE before SELECT". Example: `select name, salary*1.1 as new_sal from instructor where new_sal > 100000`. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - PostgreSQL: `column "new_sal" does not exist`.
  - MySQL: `ERROR 1054 (42S22): Unknown column 'new_sal' in 'where clause'`.
  - SQLite (non-standard) accepts it and returns Einstein and Brandt.
  - MySQL manual: "It is not permissible to refer to a column alias in a WHERE clause, because the column value might not yet be determined when the WHERE clause is executed." In MySQL, a select alias "can be used in GROUP BY, ORDER BY, or HAVING clauses". — [MySQL manual: SELECT](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/select.html)
- **LIKE**, from the slides: "% … matches any substring", "_ … matches any character", "Patterns are case sensitive". The escape example is `like '100 \%' escape '\'`. — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
  - `title like 'Intro%'` returns the 3 "Intro. to …" titles. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - `course_id like '___-1%'` returns **BIO-101, PHY-101** (exactly 3 characters, a dash, then 1…). — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - `building like '%Watson%'` returns Biology and Physics. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - Portable escape: `'100%' like '100!%' escape '!'` is true; `'1000' like '100%'` is true; `'1000' like '100!%' escape '!'` is false. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **Case sensitivity differs: MySQL vs the textbook.**
  - MySQL: "The default character set and collation are utf8mb4 and utf8mb4_0900_ai_ci, so nonbinary string comparisons are case-insensitive by default." — [MySQL manual: case sensitivity](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/case-sensitivity.html)
  - `title like 'intro%'` returns **0 rows in PostgreSQL** but **3 rows in MySQL and SQLite**. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - In MySQL, `'abc' = 'ABC'` is 1, and `'abc' = 'ABC' collate utf8mb4_bin` is 0. `title collate utf8mb4_bin like 'intro%'` returns 0 rows. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- MySQL's default LIKE escape: "If you do not specify the ESCAPE character, \ is assumed, unless the NO_BACKSLASH_ESCAPES SQL mode is enabled." — [MySQL manual: string comparison](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/string-comparison-functions.html)
  - `'100%' like '100\%'` returns 1. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **String concatenation.** The textbook lists concatenation among SQL string operations ([Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)); the standard operator is `||`.
  - MySQL: "If the PIPES_AS_CONCAT SQL mode is enabled, || signifies the SQL-standard string concatenation operator"; otherwise `||` is OR, deprecated "As of MySQL 8.0.17". — [MySQL manual: logical operators](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/logical-operators.html)
  - `select 'a' || 'b'` returned **0**, with warnings 1287 ("'|| as a synonym for OR' is deprecated") and 1292. `concat('a','b')` returned `ab`. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- ORDER BY: "We may specify desc for descending order or asc for ascending order, for each attribute; ascending order is the default." — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
  - `order by salary desc, name asc` gives Einstein 95000, Brandt 92000, Wu 90000, Gold 87000, **Kim 80000, Singh 80000** (tie broken by name), Katz 75000, Crick 72000, Srinivasan 65000, Califieri 62000, El Said 60000, Mozart 40000. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- BETWEEN (textbook example): `where salary between 90000 and 100000` returns **Brandt, Einstein, Wu**. Wu has exactly 90000, so the bounds are inclusive. — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt); [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- Tuple comparison (textbook example): `where (instructor.ID, dept_name) = (teaches.ID, 'Biology')` returns **Crick BIO-101, Crick BIO-301**. — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt); [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- Ordering comparisons on tuples are **lexicographic** in all three engines. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - `(1,5) < (2,3)` is **true**.
  - `(1,5) <= (1,4)` is **false**.
  - `(2,1) > (1,9)` is **true**.
  
  The MySQL manual gives the rule: `(a, b) <= (x, y)` is equivalent to `(a < x) OR ((a = x) AND (b <= y))`. — [MySQL manual: comparison operators](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/comparison-operators.html)

### Inferences
- **Conceptual evaluation order for exams:** FROM (× product, joins) → WHERE (row filter, no aggregates) → GROUP BY → HAVING (group filter, aggregates allowed) → SELECT (expressions, aliases) → DISTINCT → ORDER BY.
  - This explains why a SELECT alias fails in WHERE (verified above) and why aggregates are illegal in WHERE (Section 5).
  - It also explains why ORDER BY is the natural place to use output aliases. MySQL documents alias use in ORDER BY (quoted above); I did not run a separate test for it.
- `select all` is the default (keeps duplicates). `distinct` applies to the whole output row, not to one column.
- Common mistakes:
  - Forgetting the join predicate gives a 180-row Cartesian product.
  - Writing an ambiguous `ID` when two FROM tables both have `ID`.
  - Expecting `select name, course_id` to be duplicate-free.
  - Using `= NULL` instead of `IS NULL`.
  - Assuming LIKE is case-insensitive on the exam. The textbook says it is case-*sensitive*; MySQL is the exception.
- **Tuple comparison trap:** `(a1,a2) <= (b1,b2)` is **not** "a1 ≤ b1 and a2 ≤ b2". It is lexicographic. Counterexample: `(1,5) < (2,3)` is TRUE.

### Gaps
- I could not check the exact wording of the printed 6th-ed text on tuple ordering (Section 3.4.5). Use the lexicographic semantics shown above, which all three engines and the MySQL manual agree on.

---

## 3. Set operations: UNION / INTERSECT / EXCEPT, with and without ALL; MySQL support and workarounds

### Takeaway
UNION, INTERSECT and EXCEPT **eliminate duplicates by default**. With ALL, a tuple that occurs m times on the left and n times on the right appears:
- **m + n** times in UNION ALL,
- **min(m,n)** times in INTERSECT ALL,
- **max(0, m − n)** times in EXCEPT ALL.

MySQL supports INTERSECT and EXCEPT (with ALL/DISTINCT) only **from 8.0.31**. On older servers, rewrite them with IN / NOT IN / EXISTS / NOT EXISTS.

### Cited Findings
- From the slides: "Each of the above operations automatically eliminates duplicates". "To retain all duplicates use the corresponding multiset versions union all, intersect all and except all". "Suppose a tuple occurs m times in r and n times in s, then, it occurs: m + n times in r union all s; min(m,n) times in r intersect all s; max(0, m – n) times in r except all s". — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
- The inputs on the sample data: — [data](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - c1 = `select course_id from section where semester='Fall' and year=2009` returns {CS-101, CS-347, PHY-101}.
  - c2 = `... semester='Spring' and year=2010` returns {CS-101, CS-315, **CS-319, CS-319**, FIN-201, HIS-351, MU-199}. CS-319 appears twice because it has sections 1 and 2.
- Results — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):

| Query | Result |
|---|---|
| c1 UNION c2 | 8 rows: CS-101, CS-315, CS-319, CS-347, FIN-201, HIS-351, MU-199, PHY-101 |
| c1 UNION ALL c2 | **10** rows (CS-101 ×2, CS-319 ×2) |
| c1 INTERSECT c2 | CS-101 |
| c1 INTERSECT ALL c2 | CS-101 (min(1,1) = 1) |
| c1 EXCEPT c2 | CS-347, PHY-101 |
| c2 EXCEPT c1 | 5 rows: CS-315, CS-319, FIN-201, HIS-351, MU-199 |
| c2 EXCEPT ALL c1 | **6** rows: CS-319 appears **twice** (2 − 0) |
| c2 EXCEPT ALL (Katz's courses {CS-101, CS-319}) | CS-315, CS-319 (once: 2 − 1), FIN-201, HIS-351, MU-199 |
| c2 EXCEPT (Katz's courses) | CS-315, FIN-201, HIS-351, MU-199 |

- **MySQL support:**
  - "MySQL 8.0 adds support for INTERSECT and EXCEPT (MySQL 8.0.31 and later)."
  - "When the ALL keyword follows a set operator, this causes duplicates to be included in the result."
  - "By default, duplicate rows are removed from results of set operations."
  
  — [MySQL manual: set operations](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/set-operations.html)
  - The syntax is `INTERSECT [ALL | DISTINCT]` and `EXCEPT [ALL | DISTINCT]`. — [MySQL manual: INTERSECT](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/intersect.html), [MySQL manual: EXCEPT](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/except.html)
  - On 8.0.44, every row of the table above was reproduced, including INTERSECT ALL and EXCEPT ALL. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **Precedence.** MySQL's grammar puts `INTERSECT` at a tighter level (`query_term INTERSECT …`) than `UNION`/`EXCEPT`. — [MySQL manual: set operations](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/set-operations.html)
  - `select 1 as x union select 2 intersect select 2` returns **{1, 2}** in PostgreSQL and MySQL, but **{2}** in SQLite, which evaluates left to right. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- SQLite has no `INTERSECT ALL` / `EXCEPT ALL`: both are syntax errors. — [V-SQLite](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- Parenthesized operands work in MySQL: `(select …) union (select …) order by course_id` ran fine. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - To apply ORDER BY/LIMIT to one block, "parenthesize the query block, placing the clause inside the parentheses". — [MySQL manual: set operations](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/set-operations.html)
- **Pre-8.0.31 rewrites that give the same answers** — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - INTERSECT: `select distinct course_id from section where semester='Fall' and year=2009 and course_id in (c2)` returns CS-101.
  - EXCEPT: the same with `not in (c2)` returns CS-347, PHY-101.
  - EXISTS form: `... exists (select * from section as T where T.semester='Spring' and T.year=2010 and S.course_id=T.course_id)` returns CS-101.

### Inferences
- English to operator:
  - "in Fall 2009 **or** Spring 2010" → UNION.
  - "in **both**" → INTERSECT (or IN / EXISTS).
  - "in Fall 2009 **but not** Spring 2010" → EXCEPT (or NOT IN / NOT EXISTS).
- Operands must be union-compatible: same number of columns, with compatible types.
- An `IN` rewrite of INTERSECT needs `distinct` to match INTERSECT's duplicate elimination.
- **NOT IN is not a safe EXCEPT replacement if the subquery can return NULL** (Section 6). With nullable columns, prefer NOT EXISTS.
- Exam favorite: give two small multisets and ask for the row count of UNION / UNION ALL / INTERSECT ALL / EXCEPT ALL. Use m+n, min(m,n), max(0, m−n).
- Emulating EXCEPT ALL / INTERSECT ALL without native support needs counting per value (GROUP BY on each side, then compare counts). That is rarely asked; know the formula instead.

### Gaps
- I did not test a MySQL server older than 8.0.31. The "not supported before 8.0.31" claim rests on the manual sentence quoted above.

---

## 4. NULL: arithmetic, comparisons giving UNKNOWN, three-valued logic, IS NULL / IS UNKNOWN, NULLs in aggregates, DISTINCT and GROUP BY

### Takeaway
- Arithmetic with NULL gives NULL.
- Any comparison with NULL (even `NULL = NULL`) gives **UNKNOWN**.
- WHERE and HAVING keep only TRUE rows, so UNKNOWN behaves like FALSE there. But `NOT UNKNOWN` is still UNKNOWN.
- Aggregates ignore NULLs, except `COUNT(*)`.
- DISTINCT, GROUP BY and set operations treat NULLs as equal to each other.

### Cited Findings
- **Three-valued logic, from the slides:**
  - Comparisons such as "5 < null or null <> null or null = null" give unknown.
  - OR: (unknown or true) = true; (unknown or false) = unknown; (unknown or unknown) = unknown.
  - AND: (true and unknown) = unknown; (false and unknown) = false; (unknown and unknown) = unknown.
  - NOT: (not unknown) = unknown.
  - "P is unknown evaluates to true if predicate P evaluates to unknown".
  - "Result of where clause predicate is treated as false if it evaluates to unknown".
  
  — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
- **Truth tables** (U = UNKNOWN), generated by `select a, b, a and b, a or b, not a` over {TRUE, FALSE, NULL}². PostgreSQL and MySQL agree: — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)

| a | b | a AND b | a OR b | NOT a |
|---|---|---|---|---|
| T | U | U | T | F |
| F | U | **F** | U | T |
| U | T | U | **T** | U |
| U | F | **F** | U | U |
| U | U | U | U | U |

- `select 1 + null, null = null, null <> null, 5 > null, null is null` returns **NULL, NULL, NULL, NULL, TRUE**. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - MySQL: "Because the result of any arithmetic comparison with NULL is also NULL, you cannot obtain any meaningful results from such comparisons." — [MySQL manual: working with NULL](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/working-with-null.html)
- **WHERE with NULL**, on the 22 `takes` rows (one has grade NULL): — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - `where grade = null` → **0** rows.
  - `where grade is null` → **1** row.
  - `where grade <> 'A'` → **14** rows (7 A's and the NULL row are excluded).
  - `where grade = 'A' or grade <> 'A'` → **21** rows, not 22.
  - `where null = null` on instructor → 0 rows.
- **IS UNKNOWN:** `select ID, course_id from takes where (grade = 'A') is unknown` returns 98988 BIO-301. — [V-PG/MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - MySQL documents `IS boolean_value`, where boolean_value can be TRUE, FALSE or UNKNOWN; `NULL IS UNKNOWN` returns 1. — [MySQL manual: comparison operators](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/comparison-operators.html)
  - SQLite rejects `is unknown` ("no such column: unknown"); use `(P) is null` there. — [V-SQLite](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- MySQL's NULL-safe equality `<=>` "is equivalent to the standard SQL IS NOT DISTINCT FROM operator". `NULL <=> NULL` returns 1, while `NULL = NULL` returns NULL. — [MySQL manual: comparison operators](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/comparison-operators.html); [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **Aggregates and NULL.**
  - Slides: "All aggregate operations except count(*) ignore tuples with null values on the aggregated attributes". "What if collection has only null values? count returns 0; all other aggregates return null". — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
  - MySQL: "Aggregate (group) functions such as COUNT(), MIN(), and SUM() ignore NULL values. The exception to this is COUNT(*)". — [MySQL manual: problems with NULL](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/problems-with-null.html)
  - MySQL: "If there are no matching rows, COUNT() returns 0"; "If there are no matching rows, AVG() returns NULL". — [MySQL manual: aggregate functions](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/aggregate-functions.html)
- Aggregate checks on the sample data — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - `count(*), count(grade), count(distinct grade)` on takes → **22, 21, 9**.
  - `avg(x), sum(x), count(x), count(*)` over {10, 20, NULL} → **15, 30, 2, 3**. The average is 15, not 10.
  - On an empty input with **no GROUP BY** (`where dept_name='Astronomy'`), you get **one row: 0, 0, NULL, NULL, NULL** for count(*), count(salary), sum, avg, max.
  - The same query **with GROUP BY dept_name** returns **zero rows**.
- **DISTINCT and GROUP BY.**
  - `select distinct grade from takes` returns 10 rows, with NULL once.
  - `group by grade` gives a NULL group with count 1.
  
  — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql). MySQL: "Two NULL values are regarded as equal in a GROUP BY." — [MySQL manual: working with NULL](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/working-with-null.html)
- **ORDER BY placement of NULL:**
  - MySQL: "NULL values are presented first if you do ORDER BY ... ASC and last if you do ORDER BY ... DESC". — [MySQL manual: working with NULL](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/working-with-null.html)
  - Observed: MySQL and SQLite put NULL **first** in ascending order; PostgreSQL puts it **last**. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **Constraints and NULL.** CHECK passes on UNKNOWN: a NULL salary was accepted despite `check (salary > 29000)` (see Section 1). UNIQUE allowed several NULLs in MySQL. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)

### Inferences
- Short rules for exams:
  - "NULL is not a value; `=`/`<>` with NULL is UNKNOWN."
  - "WHERE keeps only TRUE."
  - "FALSE AND UNKNOWN = FALSE; TRUE OR UNKNOWN = TRUE; everything else involving U is U."
- `AVG(col)` ≠ `SUM(col)/COUNT(*)` when col has NULLs. It equals `SUM(col)/COUNT(col)`.
- If a "for all rows" condition must count NULL rows, use `COUNT(*)` or `IS NULL` explicitly.
- Empty-input trap: `select max(salary) from instructor where 1=0` returns **one row containing NULL**, not "no rows". With `GROUP BY`, empty input gives no groups.
- Expected wording on exams: "a comparison with null returns unknown"; "IS NULL is the only correct test"; "count(*) counts rows, count(A) counts non-null A values".

### Gaps
- Exam marking conventions (e.g. whether "U" or "unknown" is expected) depend on the instructor and were not researched, by design (class slides excluded).

---

## 5. Aggregates: AVG/MIN/MAX/SUM/COUNT; COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col); GROUP BY rules (MySQL ONLY_FULL_GROUP_BY); HAVING vs WHERE

### Takeaway
Every SELECT-list item outside an aggregate must be a GROUP BY attribute. Modern MySQL and PostgreSQL also accept columns **functionally dependent** on a grouped key, for example any instructor column when grouping by instructor.ID.

WHERE filters rows **before** grouping and cannot contain aggregates. HAVING filters groups **after** grouping. `COUNT(*)` counts rows, `COUNT(A)` counts non-NULL A values, and `COUNT(DISTINCT A)` counts distinct non-NULL A values.

### Cited Findings
- From the slides: "Attributes in select clause outside of aggregate functions must appear in group by list". The erroneous example is `select dept_name, ID, avg(salary) from instructor group by dept_name`. "Predicates in the having clause are applied after the formation of groups whereas predicates in the where clause are applied before forming groups". — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
- Textbook queries — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - `select avg(salary) from instructor where dept_name='Comp. Sci.'` → **77333.33**.
  - `select count(distinct ID), count(*) from teaches where semester='Spring' and year=2010` → **6** and **7**. Katz teaches two Spring 2010 sections.
  - `select count(*) from course` → **13**.
  - `select dept_name, avg(salary) from instructor group by dept_name`:

    | dept_name | avg_salary |
    |---|---|
    | Biology | 72000 |
    | Comp. Sci. | 77333.33 |
    | Elec. Eng. | 80000 |
    | Finance | 85000 |
    | History | 61000 |
    | Music | 40000 |
    | Physics | **91000** |

  - `… having avg(salary) > 42000` → the 6 departments above except **Music**.
  - Instructors per department who teach in Spring 2010 (`instructor natural join teaches … group by dept_name`, with `count(distinct ID)`) → Comp. Sci. 3, Finance 1, History 1, Music 1.
  - Departments with more than one instructor (`having count(*) > 1`) → Comp. Sci. 3, Finance 2, History 2, Physics 2.
  - "Sections offered in 2009 with at least 2 students: average tot_cred":
    ```sql
    select course_id, semester, year, sec_id, avg(tot_cred)
    from takes natural join student
    where year = 2009
    group by course_id, semester, year, sec_id
    having count(ID) >= 2;
    ```
    → CS-101 Fall 2009 sec 1: **65**; CS-190 Spring 2009 sec 2: **43**; CS-347 Fall 2009 sec 1: **67**.
- **The erroneous GROUP BY query** — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - PostgreSQL: `column "instructor.id" must appear in the GROUP BY clause or be used in an aggregate function`.
  - MySQL: `ERROR 1055 (42000): Expression #2 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'univ.instructor.ID' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by`.
  - **SQLite silently returns an arbitrary ID per group**, which is wrong to rely on.
- **MySQL rule:**
  - "If the ONLY_FULL_GROUP_BY SQL mode is enabled (which it is by default), MySQL rejects queries for which the select list, HAVING condition, or ORDER BY list refer to nonaggregated columns that are neither named in the GROUP BY clause nor are functionally dependent on them."
  - "SQL:1999 and later permits such nonaggregates per optional feature T301 if they are functionally dependent on GROUP BY columns."
  - "You can achieve the same effect without disabling ONLY_FULL_GROUP_BY by using ANY_VALUE()".
  
  — [MySQL manual: GROUP BY handling](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/group-by-handling.html)
- Functional dependency in practice: `select instructor.ID, name, count(teaches.course_id) from instructor left outer join teaches on instructor.ID = teaches.ID group by instructor.ID` is **accepted** by PostgreSQL and MySQL, because name depends on the PK ID. It returns 12 rows, with Gold, Califieri and Singh at 0. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - `any_value(name)` with `group by dept_name` also works in MySQL. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **Aggregate in WHERE:** `select dept_name from instructor where avg(salary) > 42000 group by dept_name` — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - PostgreSQL: "aggregate functions are not allowed in WHERE".
  - MySQL: `ERROR 1111 (HY000): Invalid use of group function`.
  - SQLite: "misuse of aggregate".
- **Alias in HAVING:** `… group by dept_name having avg_sal > 80000` — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - **MySQL and SQLite accept it** and return Finance 85000 and Physics 91000.
  - **PostgreSQL rejects it** (`column "avg_sal" does not exist`).
  - The MySQL manual explains why: "The SQL standard requires that HAVING must reference only columns in the GROUP BY clause or columns used in aggregate functions. However, MySQL supports an extension to this behavior, and permits HAVING to refer to columns in the SELECT list". — [MySQL manual: SELECT](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/select.html)
- **COUNT variants:**
  - `count(distinct *)` → MySQL `ERROR 1064` (syntax). — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - MySQL supports `COUNT(DISTINCT expr,[expr...])`, which "Returns a count of the number of rows with different non-NULL expr values". — [MySQL manual: aggregate functions](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/aggregate-functions.html)
  - `count(distinct a, b)` over {(1,2),(1,2),(1,3)} → 2. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - `count(course_id, sec_id)` **without DISTINCT** → `ERROR 1064`. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - The official 6th-ed solution to Practice Exercise 4.1a uses `count(course id, section id, year, semester)`, so it will not run on MySQL. — [Ch. 4 practice solutions](https://www.db-book.com/db6/practice-exer-dir/4s.pdf)
- **DISTINCT with ORDER BY on a non-selected column:** `select distinct dept_name from instructor order by salary` → MySQL `ERROR 3065 (HY000): Expression #1 of ORDER BY clause is not in SELECT list … incompatible with DISTINCT`. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)

### Inferences
- Decision rule:
  - A condition on individual rows (e.g. `year = 2009`) goes in **WHERE**.
  - A condition on a group's aggregate (e.g. `count(*) >= 2`, `avg(salary) > 42000`) goes in **HAVING**.
  - Never put an aggregate in WHERE.
- For portable exam answers, repeat the aggregate expression in HAVING (`having avg(salary) > 42000`) rather than an alias.
- `count(*)` vs `count(col)` after an outer join is a classic trap (Section 8). Count a column from the optional side.
- When counting "how many different X", use `count(distinct X)`, e.g. instructors teaching in a term (6, not 7).
- If you hit error 1055 in the MySQL lab, add the column to GROUP BY, group by the PK, or wrap it in `ANY_VALUE()`. Don't disable `ONLY_FULL_GROUP_BY` for coursework, since the textbook rule is the strict one.

### Gaps
- I did not verify in which exact MySQL version ONLY_FULL_GROUP_BY became the default. The manual only says it is on "by default" in 8.0.

---

## 6. Nested subqueries: IN / NOT IN (NULL pitfalls), SOME/ALL, EXISTS/NOT EXISTS (correlation, division), UNIQUE, subqueries in FROM (alias rules), WITH, scalar subqueries

### Takeaway
- `IN` = `= SOME`, and `NOT IN` = `<> ALL`. But `<> SOME` is not NOT IN, and `= ALL` is not IN.
- `> ALL (empty set)` is TRUE and `> SOME (empty set)` is FALSE.
- A NULL inside a NOT IN list or subquery makes NOT IN return **no rows**; NOT EXISTS has no such problem.
- "For all" (division) queries are written as `NOT EXISTS (required EXCEPT taken)` or as a double NOT EXISTS.
- MySQL needs an alias on every derived table. It does not support the `UNIQUE` predicate, and neither does PostgreSQL or SQLite.

### Cited Findings
**IN / NOT IN**
- Results on the sample data — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - "Courses in both Fall 2009 and Spring 2010" (`course_id in (…Spring 2010…)`) → **CS-101**.
  - "Fall 2009 but not Spring 2010" (`not in`) → **CS-347, PHY-101**.
  - `name not in ('Mozart','Einstein')` → 10 names.
  - Row-constructor IN: `count(distinct ID) from takes where (course_id, sec_id, semester, year) in (select course_id, sec_id, semester, year from teaches where teaches.ID = '10101')` → **6** students taught by Srinivasan.
- **NOT IN with NULL** — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - `select distinct grade from takes where grade not in (select grade from takes where course_id = 'BIO-301')` → **0 rows**. The subquery returns {NULL}, so every `grade <> NULL` is UNKNOWN.
  - The NOT EXISTS version, `select distinct T.grade from takes T where not exists (select * from takes U where U.course_id='BIO-301' and U.grade = T.grade)`, → **10 rows** (9 grades plus NULL).
  - `count(*) … where name not in ('Mozart','Einstein', null)` → **0**; without the null it returns 10.

**SOME / ALL**
- MySQL's definitions — [MySQL manual: ANY/SOME](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/any-in-some-subqueries.html), [MySQL manual: ALL](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/all-subqueries.html):
  - "The word SOME is an alias for ANY."
  - "NOT IN is not an alias for <> ANY, but for <> ALL."
  - For `10 > ALL (t2)`: the expression "is unknown (that is, NULL) if table t2 contains (0,NULL,1)" and "is TRUE if table t2 is empty".
- Results — [V-PG/MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - `salary > some (Biology salaries)` → the same 7 names as the tuple-variable query.
  - `> some (Comp. Sci. salaries {65000, 75000, 92000})` → **8** instructors. `> all (…)` → **1** (Einstein).
  - Empty subquery (`dept_name='Astronomy'`): `> all` → **all 12** instructors; `> some` → **0**.
  - Watson departments are {Biology, Physics}: `dept_name <> some (Watson depts)` → **12** (everyone); `not in` → **9**; `<> all` → **9**.
  - "Departments with the highest average salary":
    ```sql
    select dept_name from instructor group by dept_name
    having avg(salary) >= all (select avg(salary) from instructor group by dept_name);
    ```
    → **Physics**.
  - `budget > all (Watson budgets {90000, 70000})` → Comp. Sci. (100000), Finance (120000).
- SQLite does not support `SOME`/`ANY`/`ALL` subquery comparisons; they are syntax errors. — [V-SQLite](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)

**EXISTS / NOT EXISTS and division**
- The textbook uses `exists` with a correlation name: "Find all students who have taken all courses offered in the Biology department" is written `where not exists ((select course_id from course where dept_name = 'Biology') except (select T.course_id from takes as T where S.ID = T.ID))`. "First nested query lists all courses offered in Biology". — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
- Correlated EXISTS ("Fall 2009 and Spring 2010") → CS-101. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **Division on the sample data returns the empty set** for "all Biology courses". This holds for the EXCEPT form, the double NOT EXISTS form, and the textbook's exact parenthesized form, which also runs on MySQL 8.0.44. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - The reason: Biology has BIO-101, BIO-301 and **BIO-399, which was never offered**. Tanaka took only BIO-101 and BIO-301.
  ```sql
  -- double NOT EXISTS (works on any MySQL 8.0)
  select S.ID, S.name from student as S
  where not exists (select * from course as C
                    where C.dept_name = 'Biology'
                      and not exists (select * from takes as T
                                      where T.ID = S.ID and T.course_id = C.course_id));
  ```
- A division with a non-empty answer: "students who took **every** course Srinivasan (10101) teaches" (CS-101, CS-315, CS-347) → **12345 Shankar**. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - It was verified both ways: `not exists (… except …)`, and by counting:
    ```sql
    select T.ID from takes as T
    where T.course_id in (select course_id from teaches where ID = '10101')
    group by T.ID
    having count(distinct T.course_id) = (select count(distinct course_id) from teaches where ID = '10101');
    ```

**UNIQUE**
- The textbook's `where unique (select R.course_id from section as R where T.course_id = R.course_id and R.year = 2009)` appears on the [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt). It is rejected everywhere — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - PostgreSQL: "UNIQUE predicate is not yet implemented".
  - MySQL: `ERROR 1064` (syntax).
  - SQLite: syntax error.
- The count rewrite, `where 1 >= (select count(R.course_id) from section as R where T.course_id = R.course_id and R.year = 2009)`, returns **12 of the 13 courses** — all except **CS-190**, which had two 2009 sections. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - This includes BIO-399 and BIO-301, which had 0 sections in 2009: an empty set counts as "unique".
  - `1 < (…)` ("offered at least twice") → CS-190.

**Subqueries in FROM, LATERAL, WITH**
- `select dept_name, avg_salary from (select dept_name, avg(salary) as avg_salary from instructor group by dept_name) as dept_avg where avg_salary > 42000` → 6 departments. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **The same query without the alias** — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - MySQL: `ERROR 1248 (42000): Every derived table must have its own alias`.
  - PostgreSQL 16 and SQLite: accepted.
  - The manual explains: "The [AS] tbl_name clause is mandatory because every table in a FROM clause must have a name." — [MySQL manual: derived tables](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/derived-tables.html)
  - The official solution to Practice Exercise 3.1f (`select max(enrollment) from (select count(ID) as enrollment … group by course id, sec id)`) has **no alias**, so it fails on MySQL. — [Ch. 3 practice solutions](https://www.db-book.com/db6/practice-exer-dir/3s.pdf)
- Derived-table column lists work: `select max(tot_salary) from (select dept_name, sum(salary) from instructor group by dept_name) as dept_total (dept_name, tot_salary)` → **232000** (Comp. Sci.). — [V-PG/MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - MySQL documents `FROM (subquery) [AS] tbl_name (col_list)`. — [MySQL manual: derived tables](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/derived-tables.html)
  - On SQLite I ran the equivalent form with the aliases written inside the subquery (`sum(salary) as tot_salary`); I did not test the column-list syntax there. — [V-SQLite](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- LATERAL: "Prior to MySQL 8.0.14, a derived table cannot contain outer references". 8.0 adds "A derived table now may be preceded by the LATERAL keyword". — [MySQL manual: derived tables](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/derived-tables.html), [MySQL manual: what's new in 8.0](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/mysql-nutshell.html)
- **WITH (CTEs):** "MySQL now supports common table expressions, both nonrecursive and recursive" (MySQL 8.0). — [MySQL manual: what's new in 8.0](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/mysql-nutshell.html), [MySQL manual: WITH](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/with.html)
  - `with max_budget (value) as (select max(budget) from department) select budget from department, max_budget where department.budget = max_budget.value` → **120000** (Finance). — [V-PG/MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - "Departments whose total salary ≥ average department total" with `dept_total(dept_name, value)` and `dept_total_avg(value)` → **Comp. Sci., Finance, Physics**. The totals are 232000, 182000, 170000, 122000, 80000, 72000 and 40000; their average is 128285.71. — [V-PG/MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)

**Scalar and correlated subqueries**
- "Scalar subquery is one which is used where a single value is expected … Runtime error if subquery returns more than one result tuple". — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
  - `select dept_name, (select count(*) from instructor where department.dept_name = instructor.dept_name) as num_instructors from department` → Biology 1, Comp. Sci. 3, Elec. Eng. 1, Finance 2, History 2, Music 1, Physics 2. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **A scalar subquery returning 2 rows** (`(select salary from instructor where dept_name='Physics')`) — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - MySQL: `ERROR 1242 (21000): Subquery returns more than 1 row`.
  - PostgreSQL: "more than one row returned by a subquery used as an expression".
  - **SQLite silently uses the first row** (95000).
- Correlated example, "instructors earning more than their department's average": `where salary > (select avg(salary) from instructor as J where J.dept_name = I.dept_name)` → **Brandt (CS), Wu (Finance), Califieri (History), Einstein (Physics)**. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **Practice Exercise 3.8.** `select p.a1 from p, r1, r2 where p.a1 = r1.a1 or p.a1 = r2.a1` returns values in r1 or r2 "if and only if both r1 and r2 are non-empty". — [Ch. 3 practice solutions](https://www.db-book.com/db6/practice-exer-dir/3s.pdf)
  - With p = {1, 2}, r1 = {1} and r2 = ∅, it returned **0 rows**. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)

### Inferences
- **Equivalences to memorize:**
  - `x IN S` ⇔ `x = SOME S`.
  - `x NOT IN S` ⇔ `x <> ALL S`.
  - `x <> SOME S` means "S contains something different from x". It is almost always TRUE when |S| ≥ 2.
  - `x = ALL S` means "every element equals x".
  - `> ALL ∅` is TRUE (vacuous), and `> SOME ∅` is FALSE.
- **Use NOT EXISTS instead of NOT IN** whenever the subquery column is nullable (grades, dept_name, i_ID…). Alternatively add `where col is not null` inside the subquery.
- **Division template:** "X such that every required Y is related to X" ⇔ "there does NOT EXIST a required Y that is NOT related to X". Before the exam, practice writing it as the double NOT EXISTS (works in every MySQL 8.0).
  - With the counting method, always use `count(distinct …)` and restrict to the required set. Levy took CS-101 twice, so `count(*)` over-counts.
- A correlated subquery references the outer tuple variable (`S.ID`), so it is evaluated once per outer row. An uncorrelated subquery is evaluated once.
- UNIQUE is textbook-only. On exams, write it; in the lab, use `1 >= (select count(…) …)`.
- In MySQL, every `(subquery)` in FROM needs `AS name`. Add it by reflex; it is harmless elsewhere.

### Gaps
- I did not test the textbook's `lateral` example (Section 3.8.6) on MySQL. Only the manual's version notes are cited.

---

## 7. Modification of the database: INSERT (VALUES / SELECT), DELETE with subqueries (the "below average" issue), UPDATE with CASE, and the MySQL same-table restriction

### Takeaway
SQL evaluates the WHERE/subquery of a DELETE or UPDATE completely **before** changing any row. Likewise, the SELECT part of `INSERT … SELECT` is evaluated fully before inserting. So "delete instructors earning below the average" deletes exactly those below the *original* average.

Standard SQL allows the subquery to read the same table. **MySQL refuses with ERROR 1093** unless you wrap the subquery in a derived table or use a multi-table DELETE or UPDATE.

### Cited Findings
- **DELETE semantics.** "Delete all instructors whose salary is less than the average salary of instructors". "Problem: as we delete tuples from deposit [sic], the average salary changes. Solution used in SQL: 1. First, compute avg (salary) and find all tuples to delete 2. Next, delete all tuples found above (without recomputing avg or retesting the tuples)". — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
  - `delete from instructor where salary < (select avg(salary) from instructor)` → **DELETE 5** in PostgreSQL and SQLite. The average is 74833.33. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
    - Deleted: Srinivasan 65000, Mozart 40000, El Said 60000, Califieri 62000, Crick 72000.
    - Left: Katz 75000, Singh 80000, Kim 80000, Gold 87000, Wu 90000, Brandt 92000, Einstein 95000.
- **The MySQL restriction.**
  - That DELETE fails with `ERROR 1093 (HY000): You can't specify target table 'instructor' for update in FROM clause`. The UPDATE version (`update instructor set salary = salary*1.05 where salary < (select avg(salary) from instructor)`) fails the same way. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - The manual: "In general, you cannot modify a table and select from the same table in a subquery." — [MySQL manual: subquery restrictions](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/subquery-restrictions.html). Similarly "You cannot delete from a table and select from the same table in a subquery." — [MySQL manual: DELETE](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/delete.html)
  - The exception: "The preceding prohibition does not apply if for the modified table you are using a derived table and that derived table is materialized rather than merged into the outer query." — [MySQL manual: subquery restrictions](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/subquery-restrictions.html)
- **Workarounds** that work on MySQL 8.0.44 and give the textbook answer:
  ```sql
  -- (a) materialized derived table
  delete from instructor
  where salary < (select avg_sal from (select avg(salary) as avg_sal from instructor) as t);
  -- (b) multi-table DELETE
  delete i from instructor as i join (select avg(salary) as a from instructor) as t on i.salary < t.a;
  -- (c) UPDATE version
  update instructor set salary = salary * 1.05
  where salary < (select a from (select avg(salary) as a from instructor) as t);
  ```
  - (a) and (b) both leave 7 instructors.
  - (c) raises exactly the 5 below-average salaries: Srinivasan 68250, Mozart 42000, El Said 63000, Califieri 65100, Crick 75600.
  
  — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **INSERT.** "The select from where statement is evaluated fully before any of its results are inserted into the relation. Otherwise queries like insert into table1 select * from table1 would cause problem". — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
  - MySQL: "The target table of the INSERT statement may appear in the FROM clause of the SELECT part of the query". "When selecting from and inserting into the same table, MySQL creates an internal temporary table to hold the rows from the SELECT". — [MySQL manual: INSERT … SELECT](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/insert-select.html)
  - `insert into student select * from student` fails only on the **primary key** (MySQL `ERROR 1062 … for key 'student.PRIMARY'`; PostgreSQL "duplicate key value violates unique constraint"). It does not fail with a same-table error. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - `insert into course values ('CS-437','Database Systems','Comp. Sci.',4)` and the column-list form `insert into course (course_id, title, dept_name, credits) values (...)` both work. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **Practice Exercise 3.4c** ("insert every student with tot_cred > 100 as an instructor … salary of $10,000"; official answer `insert into instructor select ID, name, dept_name, 10000 from student where tot_cred > 100` from the [Ch. 3 practice solutions](https://www.db-book.com/db6/practice-exer-dir/3s.pdf)) **fails on the sample DDL**, because of `check (salary > 29000)` — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - PostgreSQL: violates check constraint "instructor_salary_check", failing row (00128, Zhang, …, 10000.00).
  - MySQL: `ERROR 3819`.
  - SQLite: "CHECK constraint failed".
- **UPDATE ordering and CASE.** With two updates (salary > 100000 gets 3%, others get 5%), "The order is important. Can be done better using the case statement". — [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)
  - Check with an added instructor earning 98000 — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
    - 3% statement first, then 5%: final salary **102900**.
    - 5% statement first, then 3%: **105987** (×1.05, then ×1.03, an 8.15% raise).
  - The CASE version, `update instructor set salary = case when salary <= 100000 then salary * 1.05 else salary * 1.03 end`, raised all 12 by 5%: no salary exceeds 100000, so e.g. Einstein goes to 99750 and Brandt to 96600. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **The textbook's correlated UPDATE of tot_cred**, using `takes.grade <> 'F' and takes.grade is not null` and the `case when sum(credits) is not null then sum(credits) else 0 end` variant (both on the [Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)):
  ```sql
  update student as S
  set tot_cred = (select sum(credits) from takes natural join course
                  where S.ID = takes.ID and takes.grade <> 'F' and takes.grade is not null);
  ```
  - Results: Zhang 7, Shankar 14, Brandt 3, Chavez 3, Peltier 4, **Levy 7** (the F in CS-101 is excluded), Williams 8, Sanchez 3, **Snow NULL**, Brown 7, Aoi 3, Bourikas 7, **Tanaka 4** (the NULL grade in BIO-301 is excluded).
  - With the CASE version, Snow gets **0**.
  - `check (tot_cred >= 0)` does **not** reject the NULL.
  
  — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **Other textbook and practice DML** — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - `delete from instructor where dept_name in (select dept_name from department where building = 'Watson')` → 3 deleted (Crick, Einstein, Gold).
  - "Delete all courses that have never been offered" (`delete from course where course_id not in (select course_id from section)`) → 1 deleted (**BIO-399**).
  - "Increase Comp. Sci. salaries by 10%" → Brandt 101200, Katz 82500, Srinivasan 71500.
- **Safe-updates mode.**
  - With `sql_safe_updates = 1`, `update instructor set salary = salary*1.05` fails with `ERROR 1175 (HY000): You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.` — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - In this mode, "you can modify rows only by specifying the key values that identify them, or a LIMIT clause, or both". — [MySQL manual: mysql client tips](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/mysql-tips.html)

### Inferences
- **Trace explanation for "delete below average":** if SQL re-evaluated the average after each deletion, the result would change. After removing the 5 low salaries, the new average is 599000/7 ≈ 85571, which would also doom Katz, Singh and Kim (this figure is computed by hand). That is why SQL computes the set of victims first.
- **Practical MySQL recipe:** if a DELETE or UPDATE needs an aggregate of the same table, wrap it as `(select … from (select avg(…) as a from same_table) as t)`, or use `JOIN (select …) t`.
- When your lab tool refuses a WHERE-less or non-key UPDATE/DELETE with error 1175, run `SET SQL_SAFE_UPDATES = 0;` for that session. Or add a key-based WHERE, or a LIMIT.
- `INSERT … VALUES` needs values in **column order** unless you list the columns. Unlisted columns get NULL or their default, so NOT NULL columns must be supplied.
- DML on parent rows triggers the FK actions: `on delete cascade` deletes children, and `on delete set null` sets FK columns to NULL. Expect cascade side effects in trace questions; for example, deleting BIO-399 deletes its prereq row.

### Gaps
- I did not verify whether MySQL Workbench enables "Safe Updates" by default (no Workbench documentation fetched). Error 1175 was reproduced via the server variable only.
- I did not check, against the manual, the corner case where MySQL's optimizer *merges* a derived table and error 1093 reappears. The aggregate-based workaround above was verified to work.

---

## 8. Joins (Ch. 4.1): NATURAL JOIN and its pitfalls, JOIN … USING, JOIN … ON, inner vs LEFT/RIGHT/FULL OUTER JOIN, MySQL's missing FULL OUTER JOIN (UNION workaround); views briefly (4.2)

### Takeaway
`NATURAL JOIN` equates **every** same-named column. In the university schema that silently adds unintended conditions:
- `dept_name` in student ⋈ takes ⋈ course,
- `ID` in takes ⋈ teaches,
- nothing at all in instructor ⋈ advisor, which becomes a Cartesian product.

So prefer `JOIN … USING (cols)` or `JOIN … ON`.

Outer joins keep unmatched rows, padding them with NULLs. Conditions on the optional side belong in **ON**: putting them in WHERE turns the outer join back into an inner join. MySQL has no FULL OUTER JOIN; emulate it with `LEFT JOIN … UNION … RIGHT JOIN`.

### Cited Findings
- From the Ch. 4 slides: the "Join condition" and join type define "how tuples in each relation that do not match any tuple in the other relation (based on the join condition) are treated". Examples include `course natural left outer join prereq`, `course natural full outer join prereq`, and `course full outer join prereq using (course_id)`. — [Ch. 4 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch4.ppt)
- **ON vs NATURAL columns** — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - `select * from student join takes on student.ID = takes.ID` returns **10 columns**; ID appears twice.
  - `student natural join takes` returns **9 columns**; ID appears once.
  - Both return 22 rows.
- MySQL's definitions — [MySQL manual: JOIN](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/join.html):
  - "The NATURAL [LEFT] JOIN of two tables is defined to be semantically equivalent to an INNER JOIN or a LEFT JOIN with a USING clause that names all columns that exist in both tables."
  - "Redundant columns of a NATURAL join do not appear."
  - "The USING join selects the coalesced value of corresponding columns, whereas the ON join selects all columns from all tables."
  - "INNER JOIN and , (comma) are semantically equivalent in the absence of a join condition". However, "the precedence of the comma operator is less than that of INNER JOIN, CROSS JOIN, LEFT JOIN".
- **Outer joins on the sample data** — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - `student natural join takes` → **22** rows; `student natural left outer join takes` → **23** rows. The extra row is `70557 Snow Physics 0 NULL NULL NULL NULL NULL`.
  - "Students who have not taken a course": `select ID from student natural left outer join takes where course_id is null` → **70557**. `not exists` gives the same answer.
  - `takes natural right outer join student` → 23 rows.
- The textbook-style FULL OUTER JOIN "CS students and Spring 2009 sections" gives **5 rows** in PostgreSQL and SQLite — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  ```sql
  select * from (select * from student where dept_name = 'Comp. Sci.') as s
  natural full outer join (select * from takes where semester = 'Spring' and year = 2009) as t;
  ```
  - Zhang–NULLs; Shankar–CS-190/2 A; Williams–CS-190/2 B+; Brown–NULLs; and **76653 (NULL name/dept) – EE-181/1 C**. Aoi is Elec. Eng., so her side is NULL.
- **MySQL and FULL JOIN:**
  - MySQL's join grammar lists only `NATURAL [INNER | {LEFT|RIGHT} [OUTER]] JOIN` — no FULL. — [MySQL manual: JOIN](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/join.html)
  - `natural full outer join` fails with `ERROR 1064` (syntax). — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - **Silent trap:** `select count(*) from student full join takes using (ID)` **runs and returns 22**. MySQL parsed `full` as an **alias for student**, so this is an inner join. With `on student.ID = takes.ID` it instead fails with `ERROR 1054 Unknown column 'student.ID' in 'on clause'`. — [V-MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - The emulation `(… s LEFT JOIN … t ON s.ID = t.ID) UNION (… s RIGHT JOIN … t ON s.ID = t.ID)` returned the same 5 rows (with ID shown twice) in MySQL and PostgreSQL. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **ON vs WHERE in outer joins** — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - `student left outer join takes on student.ID = takes.ID` → 23 rows.
  - The textbook's `student left outer join takes on true where student.ID = takes.ID` → **22** rows (inner-join result; `on true` is accepted by MySQL too).
  - A right-table filter **in WHERE**, as in `select S.ID, T.course_id from student S left outer join takes T on S.ID = T.ID where T.semester='Spring' and T.year=2010`, returns **8 rows**: students without Spring 2010 courses vanish.
  - The same filter **in ON** (`… on S.ID = T.ID and T.semester='Spring' and T.year=2010`) returns **14 rows**: all 13 students, with Levy twice. 00128, 44553, 54321, 70557, 76653 and 98988 get NULL.
- **COUNT after an outer join:** `select ID, name, count(sec_id), count(*) from instructor natural left outer join teaches group by ID, name` gives Gold, Califieri and Singh **0 with count(sec_id) but 1 with count(*)**. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - The official solution to Practice Exercise 4.1a warns: "The above query should not be written using count(*) since count * counts null values also". — [Ch. 4 practice solutions](https://www.db-book.com/db6/practice-exer-dir/4s.pdf)
- A chained left join, "Spring 2010 sections per department, including 0" (department ⟕ course ⟕ section, with the term filter in ON), → Biology 0, Comp. Sci. 4, Elec. Eng. 0, Finance 1, History 1, Music 1, Physics 0. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- "Each student with advisor name", via `student left join advisor on S.ID = A.s_ID left join instructor on A.i_ID = I.ID`, → 13 rows. Brandt (19991), Williams, Sanchez and Snow have NULL advisors. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **Natural-join pitfalls on the sample data.**
  - The data was designed for this: "The data include students taking courses outside their department, and instructors teaching courses outside their department; this helps detect errors in natural join specifications that accidentally equate department names of students or instructors with department names of courses." — [db-book sample tables page](https://www.db-book.com/db6/lab-dir/sample_tables-dir/index.html)
  - `student natural join takes natural join course` → **17** rows. `student natural join takes join course using (course_id)` → **22** rows. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
    - The lost rows are (Bourikas, Intro. to Computer Science), (Bourikas, Robotics), (Levy, Image Processing) and (Levy, Intro. to Computer Science). Levy's CS-101 appears twice, which makes 5 rows lost.
  - `instructor natural join teaches natural join course` and the USING version both give **15** rows on this data. In practice no instructor here teaches outside their department, so this version of the trap does not show up. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
    - Practice Exercise 4.4a's solution gives a test case that exposes it: a Physics instructor teaching an Elec. Eng. course. — [Ch. 4 practice solutions](https://www.db-book.com/db6/practice-exer-dir/4s.pdf)
  - `takes natural join teaches` → **0** rows: it equates student ID with instructor ID. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
    - The official solution to 3.1b notes: "using natural join in place of join .. using would result in equating student ID with instructor ID". — [Ch. 3 practice solutions](https://www.db-book.com/db6/practice-exer-dir/3s.pdf)
  - `instructor natural join advisor` → **108** = 12 × 9. There are no common column names, so the result is a Cartesian product. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - `student natural join instructor` → **0**. It joins on ID, name and dept_name simultaneously. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - The official 3.1b answer gives **44553** (Peltier) on all three engines. — [Ch. 3 practice solutions](https://www.db-book.com/db6/practice-exer-dir/3s.pdf); [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
    ```sql
    select distinct student.ID
    from (student join takes using(ID)) join (instructor join teaches using(ID))
         using(course_id, sec_id, semester, year)
    where instructor.name = 'Einstein';
    ```
- **Views (4.2, briefly).**
  - `create view faculty as select ID, name, dept_name from instructor` hides salary; `select * from faculty where dept_name='Biology'` → 76766 Crick Biology. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - `create view departments_total_salary(dept_name, total_salary) as select dept_name, sum(salary) from instructor group by dept_name` → Comp. Sci. 232000, Physics 182000, Finance 170000, History 122000, Elec. Eng. 80000, Biology 72000, Music 40000. — [V](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
  - MySQL syntax: `CREATE [OR REPLACE] … VIEW view_name [(column_list)] AS select_statement [WITH [CASCADED | LOCAL] CHECK OPTION]`. "The WITH CHECK OPTION clause can be given to constrain inserts or updates to rows in tables referenced by the view." — [MySQL manual: CREATE VIEW](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/create-view.html)

### Inferences
- **Safe habit:** natural join only when you have checked that the common columns are exactly the intended join keys. Otherwise write `JOIN … USING (key)` or `JOIN … ON`.
  - In the university schema the dangerous shared names are `dept_name` (student, instructor, course, department), `ID` (student, instructor, takes, teaches), `name` (student, instructor) and `building` (department, classroom, section). These come from the [standard DDL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL.sql).
- **Outer-join recipe for "including zero" questions:** start from the table whose rows must all appear (department, instructor, student), LEFT JOIN the rest, put the optional side's filters in ON, and `count(optional_side.column)`.
- **FULL OUTER JOIN in MySQL:** `A LEFT JOIN B ON c UNION A RIGHT JOIN B ON c`.
  - UNION also removes legitimately duplicated result rows.
  - The exact multiset version is `A LEFT JOIN B ON c UNION ALL SELECT … FROM A RIGHT JOIN B ON c WHERE A.key IS NULL`.
  - Never write `FULL JOIN` in MySQL, because it may silently run as an inner join with an alias called `full`.
- Mixing commas and explicit JOINs in MySQL can make the left tables invisible to the ON clause, because comma binds more weakly. Use explicit JOINs throughout.
- In the 6th-ed practice solutions, use `COALESCE(name, '-')` instead of Oracle's `decode` (4.1c). The solution itself notes "the coalesce operator" alternative. — [Ch. 4 practice solutions](https://www.db-book.com/db6/practice-exer-dir/4s.pdf)

### Gaps
- I did not research view updatability rules in depth (4.2 is outside the requested 3.1–3.9 and 4.1 scope).

---

## 9. Practice: 30 queries on the university schema with answers (easy → hard), plus "what does this output?" trace and spot-the-bug questions

### Takeaway
Every answer below was produced on the official sample data. Use them to self-check: write the SQL yourself first, then compare row sets. These query types (multiset counting, NULL traps, outer-join counting, division, natural-join traps) are the ones most likely on a first quiz or midterm.

### Cited Findings
All answers are **[V]** on the [db-book small relations](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql), which were identical on PostgreSQL 16.14 and MySQL 8.0.44. SQL is written to run on MySQL 8.0. Items needing ≥ 8.0.31 are marked. Problems 1, 3, 21, 22 and 27 follow Practice Exercise 3.1 in the [Ch. 3 practice solutions](https://www.db-book.com/db6/practice-exer-dir/3s.pdf), with 'Autumn' replaced by 'Fall'.

**Easy**
1. Titles of Comp. Sci. courses with 3 credits.
   `select title from course where dept_name='Comp. Sci.' and credits=3;` → Database System Concepts, Image Processing, Robotics.
2. Comp. Sci. instructors earning more than 70000. → Katz, Brandt.
3. Highest salary and who earns it.
   `select ID, name from instructor where salary = (select max(salary) from instructor);` → 22222 Einstein (95000).
4. Second-highest salary.
   `select max(salary) from instructor where salary < (select max(salary) from instructor);` → 92000.
5. Instructors with salary between 90000 and 100000. → Brandt, Einstein, Wu.
6. Departments housed in a building whose name contains "Watson". → Biology, Physics.
7. Departments whose name contains "sci", case-insensitively.
   `… where lower(dept_name) like '%sci%'` → Comp. Sci.
8. Largest classroom. → Packard 101 (capacity 500).
9. Courses with no prerequisite.
   `… where course_id not in (select course_id from prereq)` → BIO-101, CS-101, FIN-201, HIS-351, MU-199, PHY-101.
10. Courses that have CS-101 as a prerequisite. → CS-190, CS-315, CS-319, CS-347.

**Medium**
11. Courses offered in Fall 2009 **or** Spring 2010 (UNION). → 8 courses: CS-101, CS-315, CS-319, CS-347, FIN-201, HIS-351, MU-199, PHY-101.
12. Courses offered in **both** Fall 2009 and Spring 2010 (INTERSECT, IN or EXISTS). → CS-101.
13. Courses offered in Fall 2009 **but not** Spring 2010 (EXCEPT or NOT IN). → CS-347, PHY-101.
14. Instructors who taught in both Fall 2009 and Spring 2010.
    `select ID from teaches where semester='Fall' and year=2009 intersect select ID from teaches where semester='Spring' and year=2010;` (8.0.31+) → 10101 (Srinivasan).
15. Average salary per department. → the table in Section 5; Physics is highest at 91000.
16. Departments with average salary > 42000. → all except Music (6 departments).
17. Departments with more than one instructor. → Comp. Sci. 3, Finance 2, History 2, Physics 2.
18. Number of instructors per department, including departments with none.
    `select dept_name, count(ID) from department natural left outer join instructor group by dept_name;` → Biology 1, Comp. Sci. 3, Elec. Eng. 1, Finance 2, History 2, Music 1, Physics 2.
19. Students who have not taken any course (NOT EXISTS, NOT IN or LEFT JOIN … IS NULL). → 70557 Snow.
20. Instructors who have never taught. → 33456 Gold, 58583 Califieri, 76543 Singh.
21. Enrollment of each Fall 2009 section (`section natural join takes … group by course_id, sec_id`). → CS-101/1: 6, CS-347/1: 2, PHY-101/1: 1.
22. IDs of students taught by Einstein, without duplicates. → 44553.
23. Students who took CS-101 more than once.
    `select ID from takes where course_id='CS-101' group by ID having count(*) > 1;` → 45678 (Levy).
24. Students who took a course offered by another department.
    `select distinct S.ID, S.name from student S, takes T, course C where S.ID=T.ID and T.course_id=C.course_id and S.dept_name <> C.dept_name;` → 45678 Levy, 98765 Bourikas.
25. For each department, the number of Spring 2010 sections, showing 0 where none. → Biology 0, Comp. Sci. 4, Elec. Eng. 0, Finance 1, History 1, Music 1, Physics 0.

**Hard**
26. Department(s) with the highest average salary (`having avg(salary) >= all (…)`). → Physics.
27. Section(s) with the maximum enrollment in Fall 2009.
    `with sec_enrollment as (select course_id, sec_id, count(ID) as enrollment from section natural join takes where semester='Fall' and year=2009 group by course_id, sec_id) select course_id, sec_id from sec_enrollment where enrollment = (select max(enrollment) from sec_enrollment);` → CS-101 section 1 (6 students).
28. Instructors earning more than their own department's average (correlated subquery). → Brandt, Wu, Califieri, Einstein.
29. Students who took **all** courses that instructor 10101 teaches (division). → 12345 Shankar.
30. Students who took all Biology courses. → **empty**, because BIO-399 was never offered or taken.
31. Courses offered at most once in 2009 (the UNIQUE query, rewritten with count). → 12 courses: everything except CS-190.
32. Departments whose total salary is ≥ the average departmental total (WITH). → Comp. Sci., Finance, Physics.
33. Departments whose budget exceeds every Watson department's budget (`> all`). → Comp. Sci. (100000), Finance (120000).
34. Maximum, across departments, of total salary (derived table with alias). → 232000.
35. Each student's credits from passed courses, with 0 for none (the CASE-in-scalar-subquery UPDATE from Section 7). → Snow 0, Levy 7, Tanaka 4, ….

**Trace questions** ("what does it output?") — all [V] on the [same data](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):

| # | Query (sample data) | Output | Why |
|---|---|---|---|
| T1 | `select count(*) from instructor, teaches` | 180 | Cartesian product, 12 × 15 |
| T2 | `select name, course_id from instructor, teaches where instructor.ID=teaches.ID and instructor.dept_name='Comp. Sci.'` | 8 rows, (Brandt, CS-190) twice | Bag semantics; sec_id not projected |
| T3 | `select count(*) from takes where grade='A' or grade<>'A'` | 21 (not 22) | The NULL grade gives UNKNOWN OR UNKNOWN |
| T4 | `select count(*), count(grade), count(distinct grade) from takes` | 22, 21, 9 | count(*) counts rows |
| T5 | `select avg(x) from {10, 20, NULL}` | 15 | NULL ignored |
| T6 | `select count(*), sum(salary) from instructor where dept_name='Astronomy'` vs. the same with `group by dept_name` | (0, NULL) vs no rows | No GROUP BY means one group, even when empty |
| T7 | `… where grade not in (select grade from takes where course_id='BIO-301')` | no rows | NOT IN against {NULL} |
| T8 | `… where salary > all (select salary … 'Astronomy')` / `> some (…)` | 12 rows / 0 rows | ALL of ∅ is TRUE; SOME of ∅ is FALSE |
| T9 | `… where dept_name <> some (Watson depts)` vs `not in (…)` | 12 vs 9 | `<> some` ≠ `not in` |
| T10 | c1 UNION c2 / UNION ALL / c2 EXCEPT ALL c1 | 8 / 10 / 6 | Multiset arithmetic |
| T11 | `select 1 union select 2 intersect select 2` | {1,2}; SQLite gives {2} | INTERSECT binds tighter (standard, MySQL) |
| T12 | `select count(*) from student natural join takes natural join course` | 17 (not 22) | Unintended dept_name equality |
| T13 | `takes natural join teaches` / `instructor natural join advisor` | 0 rows / 108 rows | ID equated / no common column, so × product |
| T14 | LEFT JOIN takes with `T.semester='Spring' and T.year=2010` in WHERE vs ON | 8 vs 14 rows | WHERE removes the NULL-padded rows |
| T15 | `count(*)` vs `count(sec_id)` for Gold after `instructor natural left outer join teaches` | 1 vs 0 | count(*) counts the padded row |
| T16 | `delete from instructor where salary < (select avg(salary) from instructor)` | 5 deleted, 7 remain (MySQL: ERROR 1093) | Average computed once (74833.33) |
| T17 | Two UPDATEs (3% for > 100000, 5% for ≤ 100000) on a 98000 salary, in each order | 102900 vs 105987 | The order of statements matters; CASE avoids it |
| T18 | `select (1,5) < (2,3), (1,5) <= (1,4)` | TRUE, FALSE | Lexicographic tuple order |
| T19 | Exercise 3.8 with r2 = ∅ | empty | × with an empty relation is empty |
| T20 | `insert into instructor select ID, name, dept_name, 10000 from student where tot_cred > 100` | Error (CHECK salary > 29000) | Constraint violated; whole statement rejected |

**Spot the bug** (each error was reproduced on the [same data](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)):
- B1. `select dept_name, ID, avg(salary) from instructor group by dept_name`. ID is not grouped (MySQL 1055).
- B2. `select dept_name from instructor where avg(salary) > 42000 group by dept_name`. Aggregate in WHERE (MySQL 1111); move it to HAVING.
- B3. `select max(enrollment) from (select count(ID) as enrollment … group by course_id, sec_id)`. Missing derived-table alias (MySQL 1248).
- B4. `select name, salary*1.1 as new_sal from instructor where new_sal > 100000`. Alias used in WHERE (MySQL 1054).
- B5. `delete from instructor where salary < (select avg(salary) from instructor)`. Fine in standard SQL; MySQL 1093. Wrap the subquery in a derived table.
- B6. `select … from student full outer join takes …` in MySQL. No FULL JOIN (1064). `full join … using` silently runs as an inner join.
- B7. `select name, title from instructor natural join teaches natural join course`. Unintended `dept_name` match. Use `join course using (course_id)`.
- B8. Official 6th-ed solutions to 3.1e–g query `semester = 'Autumn'`, but the sample data has only Fall (3 sections), Spring (10) and Summer (2). They return nothing until you write `'Fall'`. — [Ch. 3 practice solutions](https://www.db-book.com/db6/practice-exer-dir/3s.pdf); [V-SQLite](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)

### Inferences
- **Most testable for Quiz #2 (Fri 23 Oct) and the midterm**, in order:
  1. NULL and three-valued logic traces (T3–T9).
  2. GROUP BY / HAVING legality (B1, B2).
  3. Set operations with ALL (T10).
  4. Subquery equivalences: SOME/ALL/IN and the NOT IN-NULL trap.
  5. The division pattern (29–30).
  6. Natural-join pitfalls (T12–T13).
  7. Outer-join ON vs WHERE and counting (T14–T15).
  8. Modification semantics (T16–T17).
- When writing exam SQL by hand, use the textbook dialect (`except`, `unique`, `natural join`) unless the question says MySQL. In the lab, apply the MySQL fixes in Section 10.

### Gaps
- I could not see the course's own slides, question style or weighting; they were excluded by design. The prioritization above is an inference from what the textbook emphasizes and from typical first-course exams.

---

## 10. MySQL vs standard SQL (and SQLite, which db-book's online interpreter uses): consolidated differences

### Takeaway
For textbook Chapter 3 SQL, the main MySQL differences are:
- INTERSECT/EXCEPT need 8.0.31+ and CHECK needs 8.0.16+.
- There is no FULL OUTER JOIN and no UNIQUE predicate.
- Every derived table needs an alias.
- A table cannot be modified while a subquery reads it (error 1093).
- String comparison and LIKE are case-insensitive by default.
- `||` is not concatenation.
- NULLs sort first.
- ONLY_FULL_GROUP_BY is strict but accepts functionally dependent columns.

SQLite, the engine behind db-book's in-browser interpreter, is looser in ways that can hide errors.

### Cited Findings
Each "MySQL 8.0" entry is verified on 8.0.44 and/or quoted from the manual in the section indicated. Each "SQLite" entry is [V-SQLite](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql).

| Feature | Textbook / standard | MySQL 8.0 | SQLite (db-book online) |
|---|---|---|---|
| INTERSECT / EXCEPT (+ALL) | yes | **8.0.31+** (ALL works) — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/set-operations.html) | INTERSECT/EXCEPT yes; **no ALL** |
| Set-operator precedence | INTERSECT first | INTERSECT first | **left to right** |
| FULL OUTER JOIN | yes | **no** (1064); `full join … using` = silent inner join | yes (3.54) |
| `UNIQUE (subquery)` | yes | no (1064) | no |
| `SOME/ANY/ALL (subquery)` | yes | yes — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/all-subqueries.html) | **no** |
| Derived table without alias | (textbook solution omits it) | **error 1248** — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/derived-tables.html) | allowed |
| `WITH` (CTE) | yes | yes (8.0) — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/with.html) | yes |
| Same-table subquery in DELETE/UPDATE | allowed | **error 1093** — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/subquery-restrictions.html) | allowed |
| CHECK | enforced | enforced **from 8.0.16** — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/create-table-check-constraints.html) | enforced |
| `REFERENCES t` without column list | refers to t's PK | **error 1239**; needs `t(col)` | allowed (FK enforcement is off by default in SQLite — not tested) |
| Inline column `REFERENCES` | a constraint | **parsed and ignored** — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/ansi-diff-foreign-keys.html) | — |
| LIKE / `=` case | case-sensitive ([slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)) | **case-insensitive** by default — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/case-sensitivity.html) | LIKE **case-insensitive** (ASCII) |
| Default LIKE escape | none (use ESCAPE) | `\` — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/string-comparison-functions.html) | — |
| `||` | concatenation | **logical OR** (deprecated) unless PIPES_AS_CONCAT — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/logical-operators.html) | concatenation (not tested) |
| Non-grouped column in SELECT | error | error 1055 unless functionally dependent — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/group-by-handling.html) | **silently allowed** |
| Alias in HAVING | not standard — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/select.html) | allowed (MySQL extension) | allowed |
| Alias in WHERE | error | error 1054 — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/select.html) | **allowed** |
| Scalar subquery returns > 1 row | runtime error | error 1242 | **returns first row** |
| `IS UNKNOWN` | yes | yes — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/comparison-operators.html) | **no** |
| NULL in ORDER BY ASC | varies by DBMS (PostgreSQL 16: last) | **first** — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/working-with-null.html) | first |
| `numeric(p,d)` | exact | DECIMAL, exact — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/fixed-point-types.html) | not exact: 92000×1.1 gave 101200.00000000001 |
| TRUNCATE on FK-parent table | — | error 1701 — [manual](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/truncate-table.html) | — |

- db-book's interpreter page: "Run queries directly from the text box below; the university database schema and sample data have been preloaded… using the SQLite database." — [db-book sql.js page](https://www.db-book.com/university-lab-dir/sqljs.html)
- db-book's SQLite tips: "The SQLite syntax mostly matches standard SQL syntax, and most of the queries in the book will run fine on SQLite." — [db-book SQLite tips](https://www.db-book.com/university-lab-dir/sqlite-tips.html)

### Inferences
- **For the exam**, write textbook SQL. **For the MySQL lab**, apply these rewrites:
  - EXCEPT → NOT EXISTS.
  - INTERSECT → EXISTS / IN.
  - FULL OUTER JOIN → LEFT JOIN UNION RIGHT JOIN.
  - UNIQUE → `1 >= count(...)`.
  - Add an alias to every derived table.
  - Wrap same-table aggregates in a derived table for DELETE/UPDATE.
  - Use `CONCAT()` instead of `||`.
  - Use `COLLATE utf8mb4_bin` when the case must matter.
- A query that "works" on db-book's SQLite interpreter may still be wrong per the textbook. This applies to bare GROUP BY columns, multi-row scalar subqueries, case-insensitive LIKE, and aliases in WHERE. Double-check these patterns before relying on a result.

### Gaps
- I did not test MySQL 5.7 (no CTEs, no INTERSECT/EXCEPT, CHECK ignored) or MySQL 8.4/9.x. The lab's exact server version is unknown.
- SQLite's `||` and FK pragma behavior were not exercised in this run.
- I did not check which SQLite version db-book's sql.js page bundles. If it is older than the 3.54 tested here, some features (e.g. RIGHT/FULL OUTER JOIN) may be missing in the browser interpreter.

---

## 11. Best free practice resources (for the remaining days before Quiz #2 and the midterm)

### Takeaway
The highest-yield free resources are:
- The textbook authors' own materials: the in-browser university database, the sample data and DDL, and the per-chapter practice-exercise solutions. Mind the SQLite and 'Autumn' quirks.
- The MySQL 8.0 manual pages above.
- Drill sites with automatic checking: SQLZoo, the Stanford/Widom course on edX, HackerRank, LeetCode SQL 50 and PGExercises.

CMU 15-445 HW1 is a harder, DuckDB-based stretch exercise.

### Cited Findings
- **db-book.com (official):**
  - Sample tables page: DDL, MySQL DDL, small and large data sets. — [db-book sample tables](https://www.db-book.com/db6/lab-dir/sample_tables-dir/index.html)
  - An in-browser SQL interpreter with the university schema and data preloaded (SQLite/sql.js). — [db-book sql.js](https://www.db-book.com/university-lab-dir/sqljs.html)
  - 6th-ed practice-exercise solutions per chapter (1s.pdf … 9s.pdf, including [3s.pdf](https://www.db-book.com/db6/practice-exer-dir/3s.pdf) and [4s.pdf](https://www.db-book.com/db6/practice-exer-dir/4s.pdf)). — [6th-ed practice solutions index](https://www.db-book.com/db6/practice-exer-dir/index.html)
  - A 7th-edition practice-exercises page. — [7th-ed practice exercises](https://www.db-book.com/Practice-Exercises/index-solu.html)
  - 6th-ed slides for Ch. 3 and Ch. 4, in PPT format. — [ch3.ppt](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt), [ch4.ppt](https://www.db-book.com/db6/slide-dir/PPT-dir/ch4.ppt)
  - The 6th-ed lab page lists "Sample Tables", "Sample Lab Exercises" and "Sample Term Projects". — [db-book 6th-ed lab page](https://www.db-book.com/db6/lab-dir/index.html)
- **Stanford (Jennifer Widom):** "The Databases course by Prof. Jennifer Widom at Stanford is now available as a series of five self-paced courses on edX, which you can audit for free". The first, "Databases: Relational Databases and SQL", covers SQL and the relational model. — [KDnuggets, 5 Mar 2024](https://www.kdnuggets.com/5-free-university-courses-to-learn-databases-and-sql); course links: [edX listing](https://www.edx.org/learn/relational-databases/stanford-university-databases-relational-databases-and-sql) (taken from the article, not opened), [Stanford Online page](https://online.stanford.edu/courses/soe-ydatabases0005-databases-relational-databases-and-sql)
- **SQLZoo** (free, interactive) tutorial sequence: SELECT basics, SELECT name, SELECT from World, SELECT from Nobel, SELECT within SELECT, SUM and COUNT, JOIN, More JOIN operations, Using Null, Self join, plus quizzes and DDL. — [SQLZoo](https://sqlzoo.net/wiki/SQL_Tutorial)
- **HackerRank SQL** subdomains: Basic Select, Advanced Select, Aggregation, Basic Join, Advanced Join, Alternative Queries. — [HackerRank SQL](https://www.hackerrank.com/domains/sql)
- **LeetCode SQL 50:** a study plan of "50 essential SQL questions" covering basic to intermediate SQL: select, joins, aggregate functions, sorting and grouping, subqueries, and more. — [LeetCode SQL 50](https://leetcode.com/studyplan/top-sql-50/) (page blocked automated access; description from search results)
- **PGExercises** has sections including Joins and Subqueries, Aggregation, Modifying data and recursive queries. It uses the PostgreSQL dialect. — [PGExercises](https://pgexercises.com/)
- **CMU 15-445/645:**
  - Fall 2026 Homework #1 (SQL) uses **DuckDB**; released Aug 26, 2026, due Sep 6, 2026. — [CMU 15-445 F26 HW1](https://15445.courses.cs.cmu.edu/fall2026/homework1/)
  - The Fall 2025 HW1 had "six questions in total and is graded out of 100 points". — [CMU 15-445 F25 HW1](https://15445.courses.cs.cmu.edu/fall2025/homework1/)
- **Extra story-style practice** (sites confirmed reachable): [SQL Murder Mystery](https://mystery.knightlab.com/) and [Select Star SQL](https://selectstarsql.com/).

### Inferences
- **Suggested 4-day plan** (today is Mon 19 Oct; quiz is Fri 23 Oct):
  - **Mon:** Sections 2–4 of these notes. Run every [V] query in the db-book interpreter or MySQL Workbench.
  - **Tue:** Sections 5–6. Write the division and SOME/ALL queries from scratch. Do SQLZoo "SELECT within SELECT", "SUM and COUNT" and "Using Null".
  - **Wed:** Sections 7–8. Do SQLZoo "JOIN" and "More JOIN", and the db-book 3s/4s practice exercises (fix 'Autumn' to 'Fall').
  - **Thu:** Section 9 trace and bug tables without looking, then 10–15 LeetCode SQL 50 or HackerRank problems in MySQL mode.
- For MySQL-specific lab confidence, run each textbook query in the **same MySQL version as the lab**. Check `SELECT VERSION();` and `SHOW CREATE TABLE` for `ENGINE=InnoDB`. The MyISAM experience above shows that the server configuration changes outcomes.
- Use PGExercises and CMU HW1 only after the textbook material is solid. Their dialects (PostgreSQL, DuckDB) differ from MySQL.

### Gaps
- I could not open the LeetCode, edX and Class Central pages (403 / JavaScript-rendered). Their descriptions come from search results and a dated (2024) KDnuggets article; confirm availability before relying on them.
- I did not check UW CSE 344 and Stanford CS145 SQL assignments, which were suggested sources.
- Harvard's CS50 SQL course is mentioned by KDnuggets but was not opened.
