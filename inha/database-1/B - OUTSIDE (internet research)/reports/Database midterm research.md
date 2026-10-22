# Know What Your Schema Actually Enforces

A top grade in SOC3020 rests on one skill that the outside sources make fully explicit: turning each requirement sentence into an exact (min,max) constraint, turning that constraint into the table, column, key, NOT NULL, UNIQUE or trigger that enforces it, and turning the result into MySQL DDL that really does enforce it. Quiz #2 on Friday 23 October tests only that pipeline, and the week-8 midterm tests it again alongside Chapter 1–2 theory, Elmasri-style 1NF→2NF→3NF normalization and the semantics of SQL queries, window functions, constraints and triggers. A small set of facts decides most of the marks. The (min,max) pair describes the entity it sits beside, whereas arrowheads, 1/N labels and crow's feet describe the partner at the far end of the line. Primary keys, foreign keys, NOT NULL and UNIQUE can enforce every maximum of one and every minimum on the side that holds the foreign key, but the textbook's authors concede that they cannot enforce a minimum on the "one" side of a 1:N relationship or on either side of an M:N relationship, which leaves triggers as MySQL's only tool ([Silberschatz 7e practice solutions, Ch. 6](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)). MySQL also silently discards constraints copied from the textbook, including column-level REFERENCES clauses, CHECK clauses before version 8.0.16 and every foreign key on a MyISAM table, so a schema has to be verified rather than assumed ([MySQL 8.0 manual](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-foreign-keys.html)). On the query side, the costliest traps reproduce on the textbook's own sample data: NOT IN against a subquery that returns a NULL yields no rows, a three-way natural join silently drops 5 of 22 rows, and COUNT(*) after an outer join counts rows that do not exist. The fastest preparation is to rebuild Elmasri & Navathe's COMPANY schema end to end in MySQL before Friday, then drill the authors' free practice exercises and traced queries for the midterm.

## Quiz #2 rewards turning each (min,max) sentence into an enforced constraint

Homework #2, and therefore Quiz #2, chains four tasks: read each constraint off the E-R diagram, map the diagram to relations, encode the constraints in SQL, and build and populate the schema in MySQL. Each stage has a documented failure mode, and the marks that separate a top answer from an adequate one sit at the joints, where a correct diagram becomes a table that quietly fails to enforce it. Elmasri & Navathe's COMPANY database is the best rehearsal case because the publisher slides supply all three artefacts: the requirement sentences, the diagram in both ratio and (min,max) notation, and the mapped schema ([E&N Ch. 3 slides](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf); [E&N Ch. 7 slides](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf)).

### (min,max) describes its own entity, while arrows and 1/N labels describe the partner

Elmasri & Navathe define the structural constraint "on each participation of an entity type E in a relationship type R": each entity in E "participates in at least min and at most max relationship instances in R", with min ≤ max, min ≥ 0, max ≥ 1, and (0,n) as the unconstrained default ([E&N Ch. 3, slide 3-39](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)). The pair is written beside E and read "next to the entity type and looking away from the entity type" (slide 3-40). Silberschatz's l..h limits work the same way: a minimum of 1 means total participation, a maximum of 1 means at most one relationship, and * means no limit ([Silberschatz 7e Ch. 6 slides, p. 28](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)). Every other notation runs the opposite way. Cardinality ratios, Silberschatz's arrowheads, crow's feet and UML multiplicities describe the entity at the far end of the line. Chen's original notation used this look-across convention, while Elmasri & Navathe prefer same-side placement ([Wikipedia, Entity–relationship model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)), and Silberschatz's UML slide warns of the "reversal of position" ([p. 75](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)). Elmasri & Navathe's WORKS_FOR shows the conversion: Fig. 3.15 labels EMPLOYEE (1,1) and DEPARTMENT (4,N), while Fig. 3.2 draws the same relationship with N beside EMPLOYEE, 1 beside DEPARTMENT, and double lines on both edges (slides 3-26 and 3-41).

```text
SKS arrows:     [employee] ====== <works_for> ======> [department]   arrowhead: each employee has <= 1 department
                                                                       double lines: both participations are total
SKS l..h:       [employee] --1..1-- <works_for> --4..*-- [department] each label describes its own side
Chen ratio:     [EMPLOYEE] ==N== <WORKS_FOR> ==1== [DEPARTMENT]        look-across: the "1" sits by DEPARTMENT
E&N (min,max):  [EMPLOYEE] (1,1) <WORKS_FOR> (4,N) [DEPARTMENT]        look-here: this is Fig. 3.15
Crow's foot:    [EMPLOYEE] >|------ works_for ------|| [DEPARTMENT]    bar-bar at DEPARTMENT = exactly one department
UML:            Employee 4..* ------ works_for ------ 1..1 Department  multiplicities sit at the opposite end from l..h
```

Sentences translate mechanically once the two questions are kept apart: the minimum asks whether every entity must participate, the maximum whether one entity can relate to more than one partner. Elmasri & Navathe's own examples set the pattern. "A department has exactly one manager and an employee can manage at most one department" yields EMPLOYEE (0,1) and DEPARTMENT (1,1) in MANAGES, and "an employee can work for exactly one department but a department can have any number of employees" yields EMPLOYEE (1,1) and DEPARTMENT (0,n) in WORKS_FOR ([slide 3-39](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)). By extension, "must", "every" and "is required to" set the minimum to one or more, "may" and "can" leave it at zero, "one" and "at most one" cap the maximum at one, and "several", "many" and "any number" leave it at N. So "each employee must work for at most one department" combines both halves into (1,1). Each sentence constrains only the side it talks about, and a side that no sentence mentions keeps the default (0,N). When wording and figure disagree, write the assumption down: COMPANY's requirement text says an employee "may work on several projects", yet Fig. 3.15 assigns EMPLOYEE (1,N) in WORKS_ON (slides 3-7 and 3-41). For relationships of degree three or more, the pair alone does not capture the constraints (slide 3-52), and Silberschatz outlaws more than one arrow on a ternary relationship because two arrows have conflicting readings ([p. 29](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)). Reading the diagram also means recognizing the symbols. In Silberschatz's notation a double rectangle and double diamond mark a weak entity and its identifying relationship, a dashed underline marks the discriminator, braces mark a multivalued attribute, empty parentheses a derived one, and indentation a composite's components ([p. 70](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)). Elmasri & Navathe draw multivalued attributes as double ovals and derived ones as dashed ovals (slide 3-43).

### Eight mapping rules produce the optimized schema, and a clean mapping lands in 3NF

Silberschatz's reduction rules and Elmasri & Navathe's seven-step algorithm agree, and together they fit in one table ([Silberschatz 7e Ch. 6 slides, pp. 41–48](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf); [E&N Ch. 7 slides 7-3 to 7-12](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf); [Silberschatz 6e solution 7.9](https://www.db-book.com/db6/practice-exer-dir/7s.pdf); [7e solution 6.10](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)).

| E-R construct | Relational result | Keys and constraints |
|---|---|---|
| Strong entity set | One table; composite attributes flattened into their leaf components; derived attributes omitted | PK = entity key; any other key UNIQUE (plus NOT NULL when every entity must have a value) |
| Multivalued attribute M of entity E | New table E_M(PK(E), M), with the components of M if M is composite | PK = PK(E) + M; FK to E |
| Weak entity set W with owner O | W(PK(O), discriminator, other attributes); the identifying relationship gets no table | PK = PK(O) + discriminator; FK to O, usually ON DELETE CASCADE |
| 1:N relationship | FK to the "one" side added to the "many" side's table, together with the relationship's attributes | NOT NULL if the many side is total |
| 1:1 relationship | FK on one side, preferably the side with total participation | UNIQUE, plus NOT NULL if that side is total |
| M:N relationship | New table R(PK(A), PK(B), attributes) | PK = PK(A) ∪ PK(B); descriptive attributes stay outside the key |
| n-ary relationship | New table holding every participant's key | PK = all keys, minus the key of the entity an arrow points to |
| Recursive relationship | Two FK columns named after the roles (prereq_id, Super_ssn) | Both reference the same table |

The composite and multivalued rows are where Homework #2 concentrates. Silberschatz flattens instructor's composite name and address into first_name, middle_initial, last_name, street_number, street_name, apt_number, city, state and zip_code, drops the derived age, and moves the multivalued phone_number into inst_phone(ID, phone_number), one row per value ([pp. 43–44](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)). Elmasri & Navathe's Step 6 does the same for DEPARTMENT's locations, giving DEPT_LOCATIONS with key {Dnumber, Dlocation}. The primary key of a relationship follows its cardinality: the union of the participants' keys for M:N, the "many" side's key for 1:N, and either key for 1:1 ([pp. 32–33](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)). One slide contradicts the authors' own code here. The 7th-edition deck says a relationship's descriptive attributes join its primary key, but the official DDL keeps grade out of takes' key (ID, course_id, sec_id, semester, year) ([p. 32](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf); [university DDL](https://www.db-book.com/university-lab-dir/sample_tables-dir/DDL.sql)). Follow the DDL, because a key containing grade would let the same student and section appear twice with different grades.

"Optimized" is the course's word, and no outside source defines it. The reading most consistent with Elmasri & Navathe's algorithm is to merge every 1:1 and 1:N relationship into an entity table and to create extra tables only for M:N and n-ary relationships, multivalued attributes and weak entities. COMPANY then needs six tables, and five of its six relationship types become foreign-key columns ([E&N Ch. 7 slides](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf)). Two refinements stop the merge from backfiring. Merging a relationship whose "many" side is partial fills the foreign key with NULLs ([Silberschatz p. 47](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)), which is why the authors keep advisor as its own table keyed by s_ID ([university DDL](https://www.db-book.com/university-lab-dir/sample_tables-dir/DDL.sql)). For a 1:1 relationship, Elmasri & Navathe advise putting the foreign key on the side with total participation ("It is better to choose an entity type with total participation"), which places MANAGES inside DEPARTMENT ([E&N Ch. 7, Step 3](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf)).

A correctly mapped schema usually needs no further normalization. Each COMPANY relation has only dependencies of the form key → rest, so each passes Elmasri's general 3NF test and is in fact in BCNF ([E&N Ch. 14 slides](https://www.cs.purdue.edu/homes/bb/cs448_Fall2017/lpdf/Chapter14.pdf)). Foreign keys such as Dno determine nothing inside EMPLOYEE, so they create no transitive dependency. 3NF breaks when a table ends up describing two things at once, and mapping offers two classic ways to cause that. The first copies a parent's attribute into a child: storing Dname in EMPLOYEE adds Dno → Dname and reproduces Elmasri's EMP_DEPT violation. The second "fixes" a multivalued attribute by widening the key, which leaves Dnumber → Dname as a partial dependency ([Loyola COMP 353 notes](https://pld.cs.luc.edu/courses/353/now/notes/10.html)). The same check also catches an entity whose own attributes hide a dependency between two non-key attributes. The 3NF part of a quiz answer can therefore be three sentences: list each table's functional dependencies, show that every determinant is a candidate key, and conclude BCNF and hence 3NF. The E-R counterpart of the same error is listing dept_name inside the student rectangle while stud_dept already links student to department, which the slides call redundant ([p. 38](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)).

### Keys enforce maximums, but minimums on the unreferenced side need triggers

The authors' official solutions draw the exact boundary of what declarative constraints can say. Primary and foreign keys on a many-to-one relationship "ensure that a particular section can only correspond to one course", but "cannot enforce a total participation constraint" ([Silberschatz 7e solution 6.8](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)). A one-to-one relationship also needs the second key declared UNIQUE ([6e solution 7.9](https://www.db-book.com/db6/practice-exer-dir/7s.pdf)), and total participation of the merged side needs the foreign key declared NOT NULL (7e solution 6.10). Total participation on an M:N relationship, or on the "one" side of a 1:N relationship, cannot be enforced with keys and NOT NULL at all, because "SQL foreign keys can only refer to the primary key or some other unique key". It would take a check constraint or assertion set to deferred, features "not supported on any widely used database currently" (7e solution 6.11). The textbook's slides concede the same about subqueries in CHECK and about CREATE ASSERTION, and name triggers as the alternative ([Silberschatz 6e Ch. 4 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch4.ppt)).

| Situation in the diagram | COMPANY example | Mechanism |
|---|---|---|
| Maximum 1 on the side that holds the FK | EMPLOYEE in WORKS_FOR | A single FK column per row |
| Minimum 1 on the side that holds the FK | EMPLOYEE (1,1) in WORKS_FOR | NOT NULL on the FK |
| Minimum 0 on the side that holds the FK | Supervisee (0,1) in SUPERVISION | Nullable FK |
| Maximum 1 on the other side (1:1) | EMPLOYEE (0,1) in MANAGES | UNIQUE on DEPARTMENT.Mgr_ssn |
| Each pair at most once (M:N) | WORKS_ON | Composite PK (Essn, Pno) |
| Weak entity's (1,1) in its identifying relationship | DEPENDENT | Owner key inside the PK |
| Minimum of 1 or more on the side without the FK, or on either side of M:N | DEPARTMENT (4,N); EMPLOYEE and PROJECT (1,N) in WORKS_ON | Trigger in MySQL; deferred assertion in standard SQL |
| Finite maximum above 1, or "one or more" values of a multivalued attribute | A (0,3) limit; "one or more phone numbers" | Trigger that counts rows |

The last two rows follow from one principle: a constraint is declaratively enforceable only when a single row of the referencing table can witness it, and no single row can count its siblings. The word "deferred" in the official answer matters more than it looks. MySQL "checks foreign key constraints immediately" and treats NO ACTION as RESTRICT ([MySQL FK differences from the standard](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-foreign-keys.html)), so a trigger cannot demand that a new department already has four employees, because employees can only be inserted after their department exists. The workable design guards the transitions that would break a satisfied minimum, using BEFORE DELETE and BEFORE UPDATE triggers on the child table, and checks the starting state with a query once loading finishes. Saying this explicitly in an answer shows exactly why each trigger exists.

### The COMPANY schema, built and loaded end to end

Fig. 3.15 fixes every (min,max) value, and the mapping decisions follow from the tables above ([E&N Ch. 3, slide 3-41](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf); [E&N Ch. 7, Fig. 7.2](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf)). EMPLOYEE's composite Name is flattened, DEPARTMENT's multivalued Locations becomes a table, and the derived Number_of_employees is not stored; a view with COUNT(*) per Dno can supply it.

| Relationship in Fig. 3.15 | Mapping decision | How it is enforced |
|---|---|---|
| WORKS_FOR: EMPLOYEE (1,1), DEPARTMENT (4,N) | EMPLOYEE.Dno references DEPARTMENT | Dno NOT NULL; the (4,N) minimum by trigger |
| MANAGES: EMPLOYEE (0,1), DEPARTMENT (1,1), attribute Start_date | Mgr_ssn and Mgr_start_date placed in DEPARTMENT, the total side | Mgr_ssn NOT NULL UNIQUE |
| CONTROLS: DEPARTMENT (0,N), PROJECT (1,1) | PROJECT.Dnum references DEPARTMENT | Dnum NOT NULL |
| WORKS_ON: EMPLOYEE (1,N), PROJECT (1,N), attribute Hours | Table WORKS_ON(Essn, Pno, Hours) | PK (Essn, Pno); both minimums by trigger |
| SUPERVISION: supervisor (0,N), supervisee (0,1) | EMPLOYEE.Super_ssn references EMPLOYEE | Nullable FK |
| DEPENDENTS_OF: EMPLOYEE (0,N), DEPENDENT (1,1) | Weak entity DEPENDENT(Essn, Dependent_name, …) | Essn inside the PK; ON DELETE CASCADE |
| DEPARTMENT.{Locations} | DEPT_LOCATIONS(Dnumber, Dlocation) | PK on both columns |

```sql
-- MySQL 8.0. Comments name the E-R constraint each clause enforces.
CREATE TABLE DEPARTMENT (
  Dnumber        INT          PRIMARY KEY,
  Dname          VARCHAR(25)  NOT NULL UNIQUE,   -- second key of DEPARTMENT
  Mgr_ssn        CHAR(9)      NOT NULL UNIQUE,   -- MANAGES: DEPARTMENT (1,1) -> NOT NULL; EMPLOYEE (0,1) -> UNIQUE
  Mgr_start_date DATE                            -- the relationship's attribute travels with the FK
) ENGINE=InnoDB;

CREATE TABLE EMPLOYEE (
  Ssn       CHAR(9)      PRIMARY KEY,
  Fname     VARCHAR(15)  NOT NULL,               -- composite Name flattened
  Minit     CHAR(1),
  Lname     VARCHAR(15)  NOT NULL,
  Bdate     DATE,
  Address   VARCHAR(60),
  Sex       CHAR(1),
  Salary    DECIMAL(10,2),
  Super_ssn CHAR(9)      NULL,                   -- SUPERVISION: supervisee (0,1)
  Dno       INT          NOT NULL,               -- WORKS_FOR: EMPLOYEE (1,1)
  FOREIGN KEY (Super_ssn) REFERENCES EMPLOYEE(Ssn),
  FOREIGN KEY (Dno)       REFERENCES DEPARTMENT(Dnumber)
) ENGINE=InnoDB;

ALTER TABLE DEPARTMENT                           -- the cycle: added once EMPLOYEE exists
  ADD FOREIGN KEY (Mgr_ssn) REFERENCES EMPLOYEE(Ssn);

CREATE TABLE DEPT_LOCATIONS (                    -- multivalued {Locations}
  Dnumber   INT,
  Dlocation VARCHAR(25),
  PRIMARY KEY (Dnumber, Dlocation),
  FOREIGN KEY (Dnumber) REFERENCES DEPARTMENT(Dnumber) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE PROJECT (
  Pnumber   INT          PRIMARY KEY,
  Pname     VARCHAR(25)  NOT NULL UNIQUE,        -- second key of PROJECT
  Plocation VARCHAR(25),
  Dnum      INT          NOT NULL,               -- CONTROLS: PROJECT (1,1)
  FOREIGN KEY (Dnum) REFERENCES DEPARTMENT(Dnumber)
) ENGINE=InnoDB;

CREATE TABLE WORKS_ON (                          -- M:N
  Essn  CHAR(9),
  Pno   INT,
  Hours DECIMAL(4,1),                            -- relationship attribute, outside the key
  PRIMARY KEY (Essn, Pno),
  FOREIGN KEY (Essn) REFERENCES EMPLOYEE(Ssn),   -- no CASCADE: see the trigger discussion
  FOREIGN KEY (Pno)  REFERENCES PROJECT(Pnumber)
) ENGINE=InnoDB;

CREATE TABLE DEPENDENT (                         -- weak entity
  Essn           CHAR(9),
  Dependent_name VARCHAR(15),                    -- partial key (discriminator)
  Sex            CHAR(1),
  Bdate          DATE,
  Relationship   VARCHAR(10),
  PRIMARY KEY (Essn, Dependent_name),
  FOREIGN KEY (Essn) REFERENCES EMPLOYEE(Ssn) ON DELETE CASCADE
) ENGINE=InnoDB;
```

The constraints the keys cannot express take three short triggers, plus a variant for a finite maximum in case the quiz diagram has one.

```sql
DELIMITER //
-- WORKS_FOR, DEPARTMENT (4,N): a department may never drop below 4 employees
CREATE TRIGGER works_for_min_del BEFORE DELETE ON EMPLOYEE
FOR EACH ROW
BEGIN
  IF (SELECT COUNT(*) FROM EMPLOYEE WHERE Dno = OLD.Dno) <= 4 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'WORKS_FOR: a department needs at least 4 employees';
  END IF;
END//

CREATE TRIGGER works_for_min_upd BEFORE UPDATE ON EMPLOYEE
FOR EACH ROW
BEGIN
  IF NEW.Dno <> OLD.Dno AND (SELECT COUNT(*) FROM EMPLOYEE WHERE Dno = OLD.Dno) <= 4 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'WORKS_FOR: a department needs at least 4 employees';
  END IF;
END//

-- WORKS_ON, EMPLOYEE (1,N) and PROJECT (1,N): never delete either side's last assignment
CREATE TRIGGER works_on_min_del BEFORE DELETE ON WORKS_ON
FOR EACH ROW
BEGIN
  IF (SELECT COUNT(*) FROM WORKS_ON WHERE Essn = OLD.Essn) <= 1
     OR (SELECT COUNT(*) FROM WORKS_ON WHERE Pno = OLD.Pno) <= 1 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'WORKS_ON: each employee and project needs 1 assignment';
  END IF;
END//

-- Variant: had the diagram said EMPLOYEE (1,3) in WORKS_ON, guard the maximum on insert
CREATE TRIGGER works_on_max_ins BEFORE INSERT ON WORKS_ON
FOR EACH ROW
BEGIN
  IF (SELECT COUNT(*) FROM WORKS_ON WHERE Essn = NEW.Essn) >= 3 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'WORKS_ON: an employee works on at most 3 projects';
  END IF;
END//
DELIMITER ;
```

The triggers share one template worth memorizing for a timed quiz. A BEFORE trigger on the child table counts the rows that share the foreign-key value and raises an error with SIGNAL when the change would cross a limit. A maximum guard fires on INSERT and UPDATE and rejects when the count already equals the maximum. A minimum guard fires on DELETE and UPDATE and rejects when the count is already at the minimum. SIGNAL SQLSTATE '45000' is MySQL's generic "unhandled user-defined exception", and its MESSAGE_TEXT must be a literal or a declared variable rather than a CONCAT() expression ([MySQL SIGNAL](https://dev.mysql.com/doc/refman/8.0/en/signal.html)). A multi-statement body needs DELIMITER in the mysql client, and each MySQL trigger handles exactly one event, which is why every guard needs an UPDATE twin. A trigger may not modify the table whose change fired it ([MySQL trigger syntax](https://dev.mysql.com/doc/refman/8.0/en/trigger-syntax.html); [MySQL stored-program restrictions](https://dev.mysql.com/doc/refman/8.0/en/stored-program-restrictions.html)), so the guards only read it.

One MySQL rule decides the foreign-key actions: "Cascaded foreign key actions do not activate triggers" ([MySQL CREATE TRIGGER](https://dev.mysql.com/doc/refman/8.0/en/create-trigger.html)). An ON DELETE CASCADE from EMPLOYEE into WORKS_ON would therefore let a project lose its last worker without the guard ever running. Leaving WORKS_ON's foreign keys at the default RESTRICT keeps the guard in charge, at a price worth stating in an answer. With immediate checking, an employee who still has assignments can never be deleted, because the foreign key blocks deleting the employee first and the guard blocks deleting the last assignment first. The trigger code follows the MySQL 8.0 grammar but was not executed in this research, so run it in the lab before Friday.

Populating the schema exposes a cycle that the (min,max) values create. EMPLOYEE.Dno is NOT NULL and references DEPARTMENT, while DEPARTMENT.Mgr_ssn is NOT NULL and references EMPLOYEE, so neither table's first row can be inserted while checks are on. The textbook names three escapes from such cycles: insert the referenced rows first, insert NULLs and update later (impossible under NOT NULL), or defer constraint checking ([Silberschatz 6e Ch. 4 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch4.ppt)). Standard SQL and PostgreSQL defer with DEFERRABLE INITIALLY DEFERRED and check at COMMIT ([PostgreSQL SET CONSTRAINTS](https://www.postgresql.org/docs/16/sql-set-constraints.html)). MySQL has no deferral, so the lab version loads the cycle with foreign_key_checks switched off. The manual's warning then applies: rows added that way "are not checked for consistency when foreign_key_checks is re-enabled" ([MySQL FOREIGN KEY constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html)), so verification queries must follow. Everything else loads parents first: departments and employees, then projects and locations, then WORKS_ON and DEPENDENT. The names and SSNs below come from Elmasri's sample state, and the supervisor values are illustrative. That same sample state lists Headquarters with a single employee, Borg ([E&N Ch. 14, Fig. 14.4](https://www.cs.purdue.edu/homes/bb/cs448_Fall2017/lpdf/Chapter14.pdf)), so even the textbook's data would fail a load-time (4,N) check. That is why the guards watch only decreases.

```sql
SET foreign_key_checks = 0;          -- EMPLOYEE.Dno and DEPARTMENT.Mgr_ssn reference each other
INSERT INTO DEPARTMENT (Dnumber, Dname, Mgr_ssn) VALUES (5, 'Research', '333445555');
INSERT INTO EMPLOYEE (Ssn, Fname, Minit, Lname, Super_ssn, Dno) VALUES
  ('333445555', 'Franklin', 'T', 'Wong',    NULL,        5),
  ('123456789', 'John',     'B', 'Smith',   '333445555', 5),
  ('666884444', 'Ramesh',   'K', 'Narayan', '333445555', 5),
  ('453453453', 'Joyce',    'A', 'English', '333445555', 5);
SET foreign_key_checks = 1;
-- ... then PROJECT, DEPT_LOCATIONS, WORKS_ON, DEPENDENT, parents before children

-- Verification: each query must return no rows
SELECT D.Dnumber FROM DEPARTMENT D                          -- every manager exists
WHERE NOT EXISTS (SELECT * FROM EMPLOYEE E WHERE E.Ssn = D.Mgr_ssn);
SELECT D.Dnumber, COUNT(E.Ssn) AS staff                     -- DEPARTMENT (4,N)
FROM DEPARTMENT D LEFT JOIN EMPLOYEE E ON E.Dno = D.Dnumber
GROUP BY D.Dnumber HAVING COUNT(E.Ssn) < 4;
SELECT E.Ssn FROM EMPLOYEE E                                -- EMPLOYEE (1,N) in WORKS_ON
WHERE NOT EXISTS (SELECT * FROM WORKS_ON W WHERE W.Essn = E.Ssn);
```

The second verification query uses LEFT JOIN and COUNT(E.Ssn) so that a department with no employees appears with 0 instead of vanishing. That is the outer-join counting rule the midterm also tests.

### Textbook DDL silently loses constraints in MySQL

Homework #2 asks for SQL-92 first and MySQL second, and the two differ in ways that fail silently rather than loudly. The authors publish a separate MySQL version of their university DDL, and a diff shows the only change: every `references t` gains an explicit column list ([standard DDL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL.sql); [DDL for MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL-MySQL.sql)).

| Textbook or SQL-92 form | What MySQL 8.0 does | Write this instead |
|---|---|---|
| `dept_name varchar(20) references department` (column-level) | Parsed and ignored before MySQL 9.7: no foreign key exists, and orphan values are accepted | Table-level `FOREIGN KEY (dept_name) REFERENCES department(dept_name)` |
| `foreign key (dept_name) references department` (no column list) | ERROR 1239, "Incorrect foreign key definition" | Name the referenced column, as db-book's MySQL DDL does |
| `check (salary > 29000)` | Ignored before 8.0.16; enforced from 8.0.16, but a NULL passes | Keep the CHECK; add NOT NULL if NULL must fail |
| `check (x in (select …))` or `create assertion` | Subqueries are forbidden in CHECK; CREATE ASSERTION does not exist | BEFORE triggers with SIGNAL |
| `on delete set default` | Rejected by InnoDB | CASCADE, SET NULL or RESTRICT |
| `on delete set null` on a NOT NULL column | Error 1830 at CREATE time | Make the column nullable or choose another action |
| `deferrable initially deferred` | No deferral; every check is immediate, and NO ACTION means RESTRICT | Order the inserts; break cycles during the load |
| Any foreign key on a MyISAM table | Parsed and ignored; ROLLBACK does not undo changes | `ENGINE=InnoDB`, confirmed with SHOW CREATE TABLE |
| `referencing new row as nrow … when (…)` and `for each statement` | Fixed NEW and OLD names, no WHEN clause, no statement-level triggers, one event per trigger | `FOR EACH ROW BEGIN IF … THEN … END IF; END` wrapped in `DELIMITER //` |

The table draws on the MySQL manual's own lists of differences from the standard and on test runs against MySQL 8.0.44 ([MySQL FK differences](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-foreign-keys.html); [MySQL 9.7 FK differences](https://dev.mysql.com/doc/refman/9.7/en/ansi-diff-foreign-keys.html); [MySQL CHECK constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-check-constraints.html); [MySQL FOREIGN KEY constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html); [MySQL error reference](https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html); [MySQL InnoDB introduction](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/innodb-introduction.html); [MySQL CREATE TRIGGER](https://dev.mysql.com/doc/refman/8.0/en/create-trigger.html)). The MyISAM row is not hypothetical. In this research's test runs, an online MySQL runner configured with MyISAM as its default accepted orphan foreign-key values and ignored ROLLBACK until InnoDB was forced, which is why the DDL above names ENGINE=InnoDB explicitly.

SQL-92 itself has no triggers; they entered the standard in SQL:1999 ([Silberschatz 6e Ch. 5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt)). The pure SQL-92 way to state DEPARTMENT (4,N) is therefore an assertion, such as `create assertion dept_min check (not exists (select * from department d where (select count(*) from employee e where e.dno = d.dnumber) < 4))`. The official solution to Practice Exercise 4.8(b) uses the same form for a different rule ([Silberschatz 6e Ch. 4 solutions](https://www.db-book.com/db6/practice-exer-dir/4s.pdf)). No major DBMS implements SQL-92 assertions ([CMU 15-445 notes](https://15445.courses.cs.cmu.edu/fall2017/notes/04-notes-functionaldependencies.pdf); [PostgreSQL unsupported features](https://www.postgresql.org/docs/16/unsupported-features-sql-standard.html)). Oracle AI Database 26ai is a recent exception, and MySQL is not one ([ORACLE-BASE](https://oracle-base.com/articles/26/assertions-26)). Writing the assertion as a comment above each trigger shows both the standard statement and its MySQL implementation.

Verification closes the loop. Run `SELECT VERSION();`, because CHECK needs 8.0.16 and INTERSECT and EXCEPT need 8.0.31. Run `SHOW CREATE TABLE` on every table to confirm the FOREIGN KEY lines and ENGINE=InnoDB. Then try one deliberately illegal INSERT per constraint. MySQL 8.0 answers with error 1048 for a NULL in a NOT NULL column, 1062 for a duplicate key, 1452 for a missing parent, 3819 for a failed CHECK, and SQLSTATE 45000 for a trigger's SIGNAL ([MySQL error reference](https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html)).

### Ten traps and eight practice questions for Friday

| Trap | Why it costs marks | Correct move |
|---|---|---|
| Reading (min,max) look-across | (4,N) beside DEPARTMENT describes departments, not employees | Each pair describes the entity beside it |
| Listing dept_name inside a rectangle that a relationship already links to department | The slides list it as a redundant attribute | Leave FK columns to the mapping step |
| Using one relationship for a repeatable event | A relationship set holds each combination once, so a second assignment or loan cannot be stored | Promote it to an entity or weak entity, or use a multivalued composite attribute |
| Giving a weak entity its own key, or its identifying relationship a table | The weak set has only a discriminator, and the extra table duplicates the owner key | PK = owner key + discriminator; FK with ON DELETE CASCADE |
| Placing a 1:N foreign key on the "one" side | One row cannot hold many references | FK on the many side |
| Merging a 1:1 without UNIQUE, or a total side without NOT NULL | The schema silently becomes 1:N, or optional | UNIQUE for 1:1; NOT NULL for total |
| Putting Hours or grade inside the primary key | The same pair could then appear twice | Descriptive attributes stay outside the key |
| Storing a multivalued attribute as a list or in fixed columns, or storing a derived attribute | Breaks 1NF, adds NULLs, or stores redundant data | A separate table; derived values from a query or view |
| Claiming keys enforce DEPARTMENT (4,N) | The official solution says this needs a deferred assertion | A trigger, plus one sentence on the limitation |
| ON DELETE CASCADE into a table protected by triggers | MySQL cascades never fire triggers | Keep RESTRICT, or guard the parent table |

The first nine rows follow from the authors' "common mistakes" slides and practice solutions ([Silberschatz 7e Ch. 6 slides, pp. 38 and 62–63](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf); [7e solutions 6.7, 6.10 and 6.11](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)). The last comes from the MySQL manual ([MySQL CREATE TRIGGER](https://dev.mysql.com/doc/refman/8.0/en/create-trigger.html)).

| # | Question | Answer |
|---|---|---|
| 1 | "Each employee must work for at most one department; a department may have any number of employees, including none." Give the (min,max) values, the Silberschatz drawing, the crow's foot and the table design. | EMPLOYEE (1,1), DEPARTMENT (0,N). An arrowhead into department and a double line between employee and works_for, or 1..1 and 0..*. Crow's foot: bar-bar at DEPARTMENT's end, ring plus fork at EMPLOYEE's end. EMPLOYEE.Dno NOT NULL, referencing DEPARTMENT. Without "must", EMPLOYEE is (0,1) and Dno is nullable. |
| 2 | instructor —0..*— advisor —1..1— student. What does it mean, and which tables result? | One-to-many from instructor to student; student is total, instructor partial. Either store i_ID NOT NULL in student, or keep advisor(s_ID PK, i_ID NOT NULL). The authors' DDL keeps advisor as a separate table because their university diagram draws student's participation as partial, and its i_ID is nullable because of ON DELETE SET NULL. |
| 3 | "Each policy's payments are numbered 1, 2, 3 …; each has a due date, amount and received date." | Weak entity payment with discriminator payment_no: payment(policy_id, payment_no, due_date, amount, received_on), PK (policy_id, payment_no), FK ON DELETE CASCADE, and no table for the identifying relationship. The official car-insurance answer also models premium payments as a weak entity of policy. |
| 4 | "A member may borrow the same book copy again later; record borrow and return dates." | A borrows relationship cannot hold two loans of the same pair. Make loan an entity: loan(loan_id, member_id NOT NULL, isbn and copy_no NOT NULL, borrow_date, due_date, return_date NULL), with copy a weak entity of book. |
| 5 | Map MANAGES with EMPLOYEE (0,1), DEPARTMENT (1,1) and attribute Start_date. | DEPARTMENT gets Mgr_ssn NOT NULL UNIQUE referencing EMPLOYEE, plus Mgr_start_date. |
| 6 | Map instructor(ID, name(first, middle, last), address(street(number, name, apt), city, state, zip), {phone}, date_of_birth, age()). | instructor(ID, first_name, middle_initial, last_name, street_number, street_name, apt_number, city, state, zip, date_of_birth) and inst_phone(ID, phone_number) with PK on both columns. age is not stored. |
| 7 | Which COMPANY constraints do PK, FK, NOT NULL and UNIQUE alone enforce? | Enforced: EMPLOYEE (1,1) in WORKS_FOR; DEPARTMENT (1,1) and EMPLOYEE (0,1) in MANAGES; PROJECT (1,1) in CONTROLS; supervisee (0,1); DEPENDENT (1,1); one WORKS_ON row per pair. Not enforced: DEPARTMENT (4,N), and EMPLOYEE (1,N) and PROJECT (1,N) in WORKS_ON. |
| 8 | Write a MySQL trigger so that a project has at most 10 workers. | `BEFORE INSERT ON WORKS_ON FOR EACH ROW BEGIN IF (SELECT COUNT(*) FROM WORKS_ON WHERE Pno = NEW.Pno) >= 10 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '…'; END IF; END`, plus a BEFORE UPDATE twin for changes to Pno, all inside DELIMITER //. |

Answers 1–7 apply the cited rules and the official solutions ([Silberschatz 7e Ch. 6 slides](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf); [6e Ch. 7 solutions](https://www.db-book.com/db6/practice-exer-dir/7s.pdf); [university DDL](https://www.db-book.com/university-lab-dir/sample_tables-dir/DDL.sql)). Answer 8 follows the trigger template above.

## Chapters 1–2 reward exact definitions and hand-computed algebra

The Chapter 1 material is definitional, and the official practice exercises show how it is examined: name and apply the problems of file-processing systems, give the disadvantages of a DBMS, contrast DDL with programming-language types, and compare keyword search with database queries ([Silberschatz 6e Ch. 1 solutions](https://www.db-book.com/db6/practice-exer-dir/1s.pdf)). The seven file-system problems, in slide order, are data redundancy and inconsistency, difficulty in accessing data, data isolation, integrity problems, atomicity problems, concurrent-access anomalies, and security problems. The slides illustrate atomicity with a funds transfer that must "either complete or not happen at all", and concurrency with two people withdrawing 50 each from a balance of 100 at the same moment ([Silberschatz 7e Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)). Three distinctions recur as traps. Chapter 1's "data isolation" means data scattered across files and formats, not transaction isolation. Redundancy is the cause and inconsistency the consequence. Integrity concerns value constraints such as budget > 0, while atomicity concerns failures and concurrency concerns interleaving. When the question flips to disadvantages, the official answer is that setup "requires more knowledge, money, skills, and time" and that complexity "may result in poor performance".

The data-abstraction material turns on two pairs of terms. The physical level describes how records are stored, the logical level what is stored and how it relates, and the view level what one application sees. A schema is like a variable's type and an instance like its value, so adding a row changes the instance while adding a column changes the schema ([7e Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)). Physical data independence is "the ability to modify the physical schema without changing the logical schema". Logical data independence is Elmasri & Navathe's three-schema counterpart, achieved through external/conceptual mappings ([Waterloo CS338 slides](https://cs.uwaterloo.ca/~tozsu/courses/CS338/lectures/14%20DB%20System.pdf)), and it is harder to achieve because applications are written against the logical schema. A model answer gives one example of each. Adding an index on instructor(dept_name) leaves every query unchanged, which is physical independence. Splitting a table behind a view that preserves the old shape keeps old programs running, which is logical independence.

The languages and engine material is a matching exercise. DDL definitions are stored as metadata in the data dictionary: the schema, integrity constraints and authorization. A procedural DML says what data is needed and how to get it; a declarative one says only what. Relational algebra is procedural, SQL is declarative, the three "pure" languages are equally powerful, and SQL is not Turing-complete, which is why it is embedded in host languages ([7e Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf); [7e Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)). The engine has three parts. The storage manager contains the authorization and integrity manager, the transaction manager, the file manager and the buffer manager, and holds the data files, the data dictionary and the indices. The query processor contains the DDL interpreter, which records definitions; the DML compiler, which picks the lowest-cost plan; and the query evaluation engine, which executes that plan. Transaction management, with its concurrency-control manager, keeps the database consistent across failures. In a two-tier architecture the client application calls the database directly; in a three-tier architecture the client makes no direct database calls and talks to an application server. The slides name four user types (naive users, application programmers, sophisticated users and specialized users) and list the DBA's duties. Codd proposed the relational model in 1970 ([CMU 15-445 Lecture 1 notes](https://15445.courses.cs.cmu.edu/fall2019/notes/01-introduction.pdf)).

Chapter 2's relational model is where hand computation starts. A relation is a subset of D1 × … × Dn, so it is a set with no order and no duplicates; domains are atomic, and null belongs to every domain and means "unknown" ([Silberschatz 6e Ch. 2 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch2.ppt); [7e Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)). A superkey identifies a tuple in every legal instance, a candidate key is a minimal superkey, and the primary key is the candidate key the designer chooses. A foreign key links a referencing relation to a referenced one. An instance can refute a key but never prove one. The official answer refuses to treat name as a superkey of instructor even though the sample's 12 names happen to be unique ([6e Ch. 2 solutions](https://www.db-book.com/db6/practice-exer-dir/2s.pdf)). Superkeys are counted by inclusion–exclusion. For R(A,B,C,D) with the single key {A} there are 2³ = 8; with keys {A} and {B} there are 8 + 8 − 4 = 12; with keys {A} and {B,C} there are 8 + 4 − 2 = 10. Three facts about the university schema are worth memorizing. Takes' key includes semester and year because student 45678 Levy took CS-101 twice, failing in Fall 2009 and earning a B+ in Spring 2010 ([sample data](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)). Advisor's key s_ID means each student has at most one advisor. Section.time_slot_id has no foreign key, because time_slot's key is (time_slot_id, day, start_hr, start_min) ([university DDL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL.sql)).

Relational algebra rests on six basic operators: select σ, project Π, union, set difference, Cartesian product × and rename ρ. Join and intersection are derived, since r ⋈θ s = σθ(r × s) and r ∩ s = r − (r − s) ([7e Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf); [6e Ch. 2 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch2.ppt)). The traps all reproduce on the sample data ([sample data](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)). RA's σ is SQL's WHERE, and SQL's SELECT clause is RA's Π. Π removes duplicates while SQL keeps them, so Π_dept_name(instructor) has 7 tuples where `select dept_name from instructor` returns 12 rows. instructor × teaches has 180 tuples of 9 attributes, and instructor ⋈ teaches has 15 tuples of 8. student ⋈ instructor is empty because it equates ID, name and dept_name. The projection of name and title from student ⋈ takes ⋈ course loses the Comp. Sci. courses that Levy and Bourikas took outside their departments, giving 17 pairs instead of 21, because the second join equates dept_name ([7e Ch. 4 slides](https://www.db-book.com/slides-dir/PDF-dir/ch4.pdf)). Union compatibility is positional: the inputs need the same arity and compatible domains. Two official materials contain slips that a careful student should not copy. The 6th-edition summary slide gives × the natural join's description ([6e Ch. 2 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch2.ppt)). The 6th-edition answer to Exercise 2.7 selects salary from employee although salary lives in works, which the 7th-edition answer fixes ([7e Ch. 2 solutions](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/2.pdf)).

| # | Question | Answer |
|---|---|---|
| 1 | instructor(ID, name, dept_name, salary) has only ID unique. Is {ID, name} a superkey? A candidate key? How many superkeys exist? | A superkey, yes; a candidate key, no, because it is not minimal. There are 8 superkeys, one for every set containing ID. |
| 2 | R(A,B,C,D) has candidate keys {A} and {B,C}. How many superkeys does it have? | 8 + 4 − 2 = 10. |
| 3 | Which component picks the cheapest evaluation plan, and which records DDL in the data dictionary? | The DML compiler, through query optimization; the DDL interpreter. |
| 4 | Give an insert and a delete that violate instructor.dept_name → department, and say what the official DDL does with the delete. | Insert (10111, Ostrom, Economics, 110000) when no Economics department exists; delete Biology while instructors remain in it. ON DELETE SET NULL lets the delete succeed and nulls those instructors' dept_name. |
| 5 | instructor has 12 tuples and teaches 15. Give the arity and size of instructor × teaches and of instructor ⋈ teaches. | 9 attributes and 180 tuples; 8 attributes and 15 tuples. |
| 6 | Write "courses offered in Fall 2009 but not in Spring 2010" in RA, and say how MySQL runs it. | `Π_course_id(σ_semester='Fall' ∧ year=2009(section)) − Π_course_id(σ_semester='Spring' ∧ year=2010(section))` = {CS-347, PHY-101}. Use EXCEPT on MySQL 8.0.31 or later, and NOT IN or NOT EXISTS before that. |
| 7 | Find the highest-paid instructor using only basic operators. | `Π_ID,name(instructor) − Π_A.ID,A.name(σ_A.salary<B.salary(ρ_A(instructor) × ρ_B(instructor)))` = Einstein. |
| 8 | True or false: a natural join with no common attributes equals the Cartesian product; SQL's SELECT removes duplicates by default; a foreign key may be NULL. | True; false (DISTINCT is needed); true. |

## Normalization starts with finding every candidate key

Normalization exists to remove the update, insertion and deletion anomalies that redundancy causes. Elmasri's EMP_DEPT relation stores each department's name and manager in every employee's row, with three consequences. Changing Research's manager means editing four rows. A department with no employees cannot be stored without a NULL primary key. Deleting Borg, Headquarters' only employee, deletes the department's facts along with him ([E&N Ch. 14 slides](https://www.cs.purdue.edu/homes/bb/cs448_Fall2017/lpdf/Chapter14.pdf)). The cure is decomposition, judged by two properties that Elmasri ranks explicitly. Losslessness (non-additivity) is "extremely important and cannot be sacrificed", while preserving functional dependencies "may be sacrificed". Silberschatz's cautionary example splits employee(ID, name, street, city, salary) on name, which is lossy: if two employees are both named Kim, the join returns four tuples, two of them spurious ([Silberschatz 6e Ch. 8 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch8.ppt)).

Precise definitions matter because the normal forms are stated in their terms. α → β holds when every legal instance pairs equal α-values with equal β-values. An instance can show that an FD does not hold but can never prove that it does ([Silberschatz 6e Ch. 8 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch8.ppt); [E&N Ch. 14 slides](https://www.cs.purdue.edu/homes/bb/cs448_Fall2017/lpdf/Chapter14.pdf)). An attribute is prime when it belongs to some candidate key, which is why every key must be found before testing anything ([UTA normalization notes](https://ranger.uta.edu/~cli/lecnotes/notes-db-normalization.pdf)). A dependency is full when no attribute can be dropped from its left side: {SSN, PNUMBER} → HOURS is full, while {SSN, PNUMBER} → ENAME is partial because SSN → ENAME holds. A transitive dependency X → Y → Z is a problem only when Y is not a candidate key, so SSN → Emp# → Salary is harmless when Emp# is itself a key ([E&N Ch. 14 slides](https://www.cs.purdue.edu/homes/bb/cs448_Fall2017/lpdf/Chapter14.pdf)).

| Normal form | Elmasri, primary-key version | General version (every candidate key) | Violation to look for |
|---|---|---|---|
| 1NF | Every value atomic: no composite, multivalued or nested values | Same | A set, list, repeating group or composite value |
| 2NF | Every nonprime attribute fully dependent on the primary key | Fully dependent on every candidate key | Part of a key → a nonprime attribute |
| 3NF | 2NF, and no nonprime attribute transitively dependent on the primary key | For every X → A, X is a superkey or A is prime | A non-superkey → a nonprime attribute |
| BCNF | No primary-key version (beyond the class core) | For every X → A, X is a superkey | A non-superkey → any attribute |

The two versions diverge only when a relation has more than one candidate key, and Elmasri's LOTS relation is the standard demonstration. It has primary key Property_id#, candidate key {County_name, Lot#}, and the dependencies County_name → Tax_rate and Area → Price. LOTS passes the primary-key 2NF test, because a single-attribute key admits no partial dependency, yet fails the general test, because County_name is part of the other key. The progression LOTS → LOTS1(Property_id#, County_name, Lot#, Area, Price) + LOTS2(County_name, Tax_rate) → LOTS1A(Property_id#, County_name, Lot#, Area) + LOTS1B(Area, Price) + LOTS2 ends in 3NF ([E&N Ch. 14, Fig. 14.12](https://www.cs.purdue.edu/homes/bb/cs448_Fall2017/lpdf/Chapter14.pdf)). The general 3NF condition, "X is a superkey or A is prime", is identical to Silberschatz's definition of 3NF ([Silberschatz 6e Ch. 8 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch8.ppt)), so it is the safest test to write. When a relation has several keys, show both readings and label them.

The process is mechanical, and writing out each step earns visible partial credit. Start by splitting right-hand sides and finding all candidate keys, not just the primary key. Attributes that appear on no right-hand side belong to every key, attributes that appear only on right-hand sides belong to none, and the closure of the must-have core either equals R, making it the only key, or is extended one attribute at a time ([UTA notes](https://ranger.uta.edu/~cli/lecnotes/notes-db-normalization.pdf)). For R(A,B,C,D,E) with A → B, BC → E and ED → A, C and D form the core, (CD)⁺ = CD, and adding A, B or E in turn yields three keys: ACD, BCD and CDE. Fix 1NF next by flattening composites and moving multivalued attributes out together with the owner's key. Test 2NF by computing the closure of every proper subset of every key. Any nonprime attribute in such a closure is partially dependent, and it moves into a new relation keyed by that subset, taking its transitively dependent attributes along but never a prime attribute. Test 3NF inside each resulting relation: any nonprime attribute determined by a non-superkey moves out together with its determinant. Finish by checking two things. The decomposition is lossless whenever each split's shared attributes form a key of one piece. It preserves dependencies when every original FD lies inside one relation. The classic Elmasri-style exercise shows the whole procedure ([U. Alberta CMPUT 391 solutions](https://webdocs.cs.ualberta.ca/~zaiane/courses/cmput391-03/work/assign2-03-sol.pdf)):

```text
R(A,B,C,D,E,F,G,H,I,J)    F = {AB→C, A→DE, B→F, F→GH, D→IJ}
Keys:   A and B appear on no right side; (AB)+ = ABCDEFGHIJ, so AB is the only key
2NF:    A+ = ADEIJ  → D, E, I, J are partially dependent
        B+ = BFGH   → F, G, H are partially dependent
        R1(A,B,C)   R2(A,D,E,I,J)   R3(B,F,G,H)
3NF:    in R2, D→IJ is transitive  → R2a(A,D,E)  R2b(D,I,J)
        in R3, F→GH is transitive  → R3a(B,F)    R3b(F,G,H)
Final:  R1(A,B,C) R2a(A,D,E) R2b(D,I,J) R3a(B,F) R3b(F,G,H): all BCNF, lossless, dependency-preserving
```

| Trap | Example | Correct reasoning |
|---|---|---|
| Testing 2NF only against the listed FDs | R(A,B,C,D), F = {A→C, AC→D, BC→A}; keys AB and BC | A⁺ = ACD, so the implied A→D is partial on key AB: the relation is only in 1NF |
| Moving prime attributes out | Same R, splitting off all of A⁺ as (A,C,D) | This loses BC→A; the correct split is (A,D) + (A,B,C) |
| Confusing 3NF with BCNF | TEACH: {Student, Course}→Instructor and Instructor→Course | 3NF holds because Course is prime; BCNF fails |
| Calling a foreign key a violation | Dno in EMPLOYEE | Dno determines nothing inside EMPLOYEE |
| Calling a dependency through a candidate key transitive | SSN → Emp# → Salary | Emp# is a key, so nothing is violated |
| Dropping the relation that holds a key | R(A…J) with G = {AB→C, BD→EF, AD→GH, A→I, H→J}; key ABD | Without (A,B,D) the join is lossy; a widely posted answer omits it |
| Testing a decomposed piece with F instead of the projection of F⁺ | F = {A→B, BC→D}; piece (A,C,D,E) | AC→D is in F⁺, so the piece is not in BCNF |
| Trusting an FD seen in a sample table | Any instance | An instance can only refute an FD |

The traps come from the same sources as the recipe ([UTA notes](https://ranger.uta.edu/~cli/lecnotes/notes-db-normalization.pdf); [E&N Ch. 14 slides](https://www.cs.purdue.edu/homes/bb/cs448_Fall2017/lpdf/Chapter14.pdf); [Silberschatz 6e Ch. 8 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch8.ppt); [Alberta solutions](https://webdocs.cs.ualberta.ca/~zaiane/courses/cmput391-03/work/assign2-03-sol.pdf)). BCNF and the design algorithms sit beyond the class core but inside the textbook. BCNF demands a superkey on the left of every nontrivial dependency. The binary lossless test requires R1 ∩ R2 to determine all of R1 or all of R2. The canonical cover feeds the 3NF synthesis algorithm, which always yields a lossless, dependency-preserving 3NF schema. BCNF decomposition is always lossless but can lose dependencies, as R(J, K, L) with JK → L and L → K shows ([Silberschatz 6e Ch. 8 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch8.ppt)). Two free checkers make self-study safe. The Carleton Functional Dependency Normalizer lists candidate keys and tests 1NF through BCNF for up to ten attributes, and Raymond Cho's Relational Database Tools computes closures, covers and decompositions ([Carleton normalizer](https://people.scs.carleton.ca/~ldnel/normalizer/); [Relational Database Tools](http://raymondcho.net/RelationalDatabaseTools/RelationalDatabaseTools.html)). Their keys and normal-form verdicts should match yours exactly. Their decompositions may differ from yours and still be valid, because valid answers vary with the order in which violations are fixed.

| # | Question | Answer |
|---|---|---|
| 1 | The instance (a1,b1,c1,d1), (a1,b2,c2,d2), (a2,b2,c2,d3), (a3,b3,c4,d3) is given. Which of A→B, B→C, C→B, B→A, D→C and AB→D does it rule out? | It rules out A→B, B→A and D→C. B→C, C→B and AB→D may hold, but the instance cannot prove them. |
| 2 | R(A,B,C,G,H,I), F = {A→B, A→C, CG→H, CG→I, B→H}. Compute (AG)⁺. Is AG a candidate key? | (AG)⁺ = ABCGHI. AG is a candidate key, because A⁺ = ABCH and G⁺ = G are both smaller than R. |
| 3 | R(A,B,C,D,E,F), F = {AB→C, C→D, D→A, BE→F}. Find the keys and the highest normal form. | Keys ABE, BCE and BDE. BE→F is partial on every key, so the relation is only in 1NF. |
| 4 | ORDER_LINE(OrderNo, ProductNo, Qty, ProductName, UnitPrice) with ProductNo → ProductName, UnitPrice. | 1NF, because of the partial dependency. Decompose into ORDER_LINE(OrderNo, ProductNo, Qty) and PRODUCT(ProductNo, ProductName, UnitPrice). |
| 5 | PROJ_DEPT(Pnumber, Pname, Plocation, Dnum, Dname, Dmgr_ssn) with Pnumber → Pname, Plocation, Dnum and Dnum → Dname, Dmgr_ssn. | 2NF but not 3NF, because of the transitive dependency via Dnum. Decompose into PROJECT(Pnumber, Pname, Plocation, Dnum) and DEPARTMENT(Dnum, Dname, Dmgr_ssn). |
| 6 | R(A,B,C,D), F = {AB→C, C→D, D→A}. Find the keys, the highest normal form and a BCNF decomposition. | Keys AB, BC and BD. Every attribute is prime, so the relation is in 3NF. The BCNF decomposition (B,C), (C,D), (A,D) is lossless but loses AB→C. |
| 7 | TEACH(Student, Course, Instructor) with {Student, Course}→Instructor and Instructor→Course. Which split is lossless? | Only (Instructor, Course) + (Instructor, Student), because Instructor → Course. Every split loses {Student, Course}→Instructor. |

## NULLs, duplicates and natural joins decide most SQL answers

Every SQL answer on the midterm can be checked against one conceptual evaluation order. FROM forms the Cartesian product, WHERE keeps rows whose predicate is TRUE, and then come GROUP BY, HAVING, the SELECT list, DISTINCT and finally ORDER BY. The order explains several rules at once. A SELECT alias cannot appear in WHERE, which MySQL rejects with error 1054, though MySQL accepts aliases in GROUP BY, ORDER BY and HAVING ([MySQL SELECT](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/select.html)). Aggregates cannot appear in WHERE at all (error 1111). Results are multisets, so `select dept_name from instructor` returns 12 rows where DISTINCT returns 7, and a forgotten join predicate turns instructor and teaches into 180 rows. Every figure in this section comes from runs on the authors' small university dataset in PostgreSQL 16, SQLite 3.54 and MySQL 8.0.44, so each one can be reproduced in the lab ([sample data](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)).

Comparisons involving NULL, including NULL = NULL, return UNKNOWN. WHERE and HAVING treat UNKNOWN like FALSE, yet NOT UNKNOWN stays UNKNOWN ([Silberschatz 6e Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)). The only exceptions to "unknown in, unknown out" are FALSE AND UNKNOWN, which is FALSE, and TRUE OR UNKNOWN, which is TRUE.

| a | b | a AND b | a OR b | NOT a |
|---|---|---|---|---|
| TRUE | UNKNOWN | UNKNOWN | TRUE | FALSE |
| FALSE | UNKNOWN | FALSE | UNKNOWN | TRUE |
| UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |

On the 22-row takes table, whose only NULL grade is Tanaka's in BIO-301, `where grade = null` returns 0 rows, `where grade is null` returns 1, and `where grade = 'A' or grade <> 'A'` returns 21 rather than 22. Aggregates ignore NULLs except COUNT(*), so count(*), count(grade) and count(distinct grade) give 22, 21 and 9, and AVG over {10, 20, NULL} is 15. Two empty-input cases catch students out. An aggregate query with no GROUP BY over zero rows returns one row, holding 0 for COUNT and NULL for SUM, AVG and MAX. The same query with GROUP BY returns no rows. NULL also behaves differently across constructs. DISTINCT, GROUP BY and set operations treat NULLs as equal, a CHECK whose condition is UNKNOWN passes, a UNIQUE column accepts many NULLs, and MySQL sorts NULL first in ascending order where PostgreSQL sorts it last ([MySQL working with NULL](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/working-with-null.html)).

Every SELECT-list column outside an aggregate must appear in GROUP BY. MySQL enforces this through ONLY_FULL_GROUP_BY, which is on by default and raises error 1055, but it also accepts columns that depend functionally on a grouped key, such as name when grouping by instructor.ID ([MySQL GROUP BY handling](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/group-by-handling.html)). Row conditions belong in WHERE and group conditions in HAVING. MySQL lets HAVING cite a SELECT alias as an extension, but repeating the aggregate is the portable form. Counting "how many different" requires DISTINCT: in Spring 2010, count(distinct ID) from teaches is 6 while count(*) is 7, because Katz teaches two sections. Even the official solutions slip on dialect. Practice Exercise 4.1a uses count(course_id, sec_id, year, semester), which MySQL rejects without DISTINCT ([Silberschatz 6e Ch. 4 solutions](https://www.db-book.com/db6/practice-exer-dir/4s.pdf)).

Subquery quantifiers reduce to four equivalences: IN means = SOME and NOT IN means <> ALL, but <> SOME is not NOT IN, and = ALL is not IN ([MySQL ANY/SOME](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/any-in-some-subqueries.html)). On the sample data, `dept_name <> some` over the Watson departments returns all 12 instructors while NOT IN returns 9. `salary > all` over an empty set returns all 12 instructors, while `> some` returns none. The single most dangerous pattern is NOT IN against a subquery that can return NULL. `grade not in (select grade from takes where course_id = 'BIO-301')` returns 0 rows because the subquery yields {NULL}, while the equivalent NOT EXISTS returns 10. "For all" questions become division, written either as NOT EXISTS over an EXCEPT or as a double NOT EXISTS that runs on every MySQL 8.0.

```sql
-- Students who took every Biology course
SELECT S.ID, S.name FROM student AS S
WHERE NOT EXISTS (SELECT * FROM course AS C
                  WHERE C.dept_name = 'Biology'
                    AND NOT EXISTS (SELECT * FROM takes AS T
                                    WHERE T.ID = S.ID AND T.course_id = C.course_id));
```

On the sample data this returns nobody, because BIO-399 was never offered, while "every course Srinivasan teaches" returns 12345 Shankar. MySQL adds two structural rules. Every derived table needs an alias (error 1248), and the official solution to Practice Exercise 3.1f violates that rule. A scalar subquery that returns more than one row is error 1242, whereas db-book's SQLite interpreter silently uses the first row ([MySQL derived tables](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/derived-tables.html); [6e Ch. 3 solutions](https://www.db-book.com/db6/practice-exer-dir/3s.pdf)). The textbook's UNIQUE predicate runs on none of the three engines, so rewrite it as `1 >= (select count(…) …)`.

UNION, INTERSECT and EXCEPT remove duplicates by default. With ALL, a tuple that occurs m times on the left and n times on the right appears m + n, min(m, n) and max(0, m − n) times respectively ([6e Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)). The Fall 2009 courses {CS-101, CS-347, PHY-101} and the Spring 2010 courses, in which CS-319 appears twice because it ran as two sections, give 8 rows for UNION, 10 for UNION ALL, CS-101 for INTERSECT, and 6 rows for Spring EXCEPT ALL Fall. MySQL supports INTERSECT and EXCEPT only from 8.0.31 and evaluates INTERSECT before UNION. So `select 1 union select 2 intersect select 2` gives {1, 2} in MySQL and PostgreSQL but {2} in SQLite ([MySQL set operations](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/set-operations.html)).

NATURAL JOIN equates every same-named column. The authors deliberately seeded the sample data with students taking courses outside their department, "to detect errors in natural join specifications that accidentally equate department names" ([db-book sample tables](https://www.db-book.com/db6/lab-dir/sample_tables-dir/index.html)). `student natural join takes natural join course` returns 17 rows instead of 22, losing Levy's and Bourikas's Comp. Sci. courses. `takes natural join teaches` returns 0 rows because it equates student IDs with instructor IDs. `instructor natural join advisor` returns 108 rows, a Cartesian product, because the two tables share no column name. Outer joins add their own traps. A filter on the optional side placed in WHERE silently turns a LEFT JOIN back into an inner join: the Spring 2010 filter returns 8 rows in WHERE but 14 in ON. After an outer join, COUNT(*) counts the NULL-padded row, so Gold, Califieri and Singh show one section under COUNT(*) but zero under COUNT(sec_id), a pitfall the official solution to Exercise 4.1a warns about ([6e Ch. 4 solutions](https://www.db-book.com/db6/practice-exer-dir/4s.pdf)). MySQL has no FULL OUTER JOIN, and `student full join takes using (ID)` does not even fail. It runs as an inner join, with `full` parsed as an alias for student. Emulate the full join with LEFT JOIN … UNION … RIGHT JOIN ([MySQL JOIN](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/join.html)).

SQL evaluates the WHERE clause of a DELETE or UPDATE fully before changing anything. So `delete from instructor where salary < (select avg(salary) from instructor)` removes exactly the five instructors below the original average of 74,833.33 ([6e Ch. 3 slides](https://www.db-book.com/db6/slide-dir/PPT-dir/ch3.ppt)). MySQL refuses that statement with error 1093 because it reads and modifies the same table, and the documented escape is a materialized derived table ([MySQL subquery restrictions](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/subquery-restrictions.html)):

```sql
DELETE FROM instructor
WHERE salary < (SELECT a FROM (SELECT AVG(salary) AS a FROM instructor) AS t);
```

The order of statements matters. Two UPDATEs that raise salaries above 100,000 by 3% and the rest by 5% turn 98,000 into 102,900 or 105,987 depending on which runs first, which is why the slides recommend a single CASE expression. The textbook's own Practice Exercise 3.4c, which inserts students as instructors at a salary of 10,000, fails against the sample DDL's `check (salary > 29000)` on all three engines ([6e Ch. 3 solutions](https://www.db-book.com/db6/practice-exer-dir/3s.pdf)). If an UPDATE without a key-based WHERE fails with error 1175, the client's safe-updates mode is on ([MySQL client tips](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/mysql-tips.html)).

| Feature | Textbook or standard | MySQL 8.0 | db-book's SQLite interpreter |
|---|---|---|---|
| INTERSECT and EXCEPT (with ALL) | Supported | From 8.0.31 | Supported without ALL; evaluated left to right |
| FULL OUTER JOIN | Supported | Absent; `full join … using` silently runs as an inner join | Supported |
| UNIQUE (subquery) | Supported | Syntax error | Syntax error |
| Derived table without an alias | Omitted in an official solution | Error 1248 | Allowed |
| DELETE or UPDATE reading its own table | Allowed | Error 1093 | Allowed |
| Column outside GROUP BY | Error | Error 1055 unless functionally dependent | Silently allowed |
| SELECT alias in WHERE | Error | Error 1054 | Allowed |
| Scalar subquery returning 2 or more rows | Runtime error | Error 1242 | Returns the first row |
| LIKE and = on strings | Case-sensitive | Case-insensitive by default | LIKE case-insensitive |
| Double-pipe operator | Concatenation | Logical OR unless PIPES_AS_CONCAT is set; use CONCAT() | Concatenation |
| NULL in ascending ORDER BY | Vendor-defined | First | First |

The MySQL column rests on the manual pages already cited and on runs against MySQL 8.0.44 ([MySQL case sensitivity](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/case-sensitivity.html); [MySQL logical operators](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/logical-operators.html)). The SQLite column matters because db-book's in-browser interpreter preloads the university database on SQLite ([db-book SQL interpreter](https://www.db-book.com/university-lab-dir/sqljs.html)), so a query that "works" there can still be wrong by the textbook's rules.

| Query on the sample data | Output | Why |
|---|---|---|
| `select count(*) from instructor, teaches` | 180 | Cartesian product, 12 × 15 |
| `select count(*) from takes where grade='A' or grade<>'A'` | 21, not 22 | UNKNOWN OR UNKNOWN for the NULL grade |
| `count(*), count(grade), count(distinct grade)` on takes | 22, 21, 9 | COUNT(*) counts rows |
| `count(*), sum(salary)` for department 'Astronomy', without and with GROUP BY | (0, NULL) versus no rows | Without GROUP BY there is one group, even when it is empty |
| `grade not in (select grade … 'BIO-301')` | No rows | The subquery returns {NULL} |
| `salary > all (empty set)` versus `> some (empty set)` | 12 rows versus 0 rows | ALL over an empty set is TRUE; SOME over an empty set is FALSE |
| Spring 2010 EXCEPT ALL Fall 2009 | 6 rows | CS-319 counted twice: max(0, 2 − 0) |
| `student natural join takes natural join course` | 17 rows, not 22 | dept_name is equated |
| LEFT JOIN takes with the term filter in WHERE versus in ON | 8 versus 14 rows | WHERE discards the NULL-padded rows |
| Gold after `instructor natural left outer join teaches`: COUNT(*) versus COUNT(sec_id) | 1 versus 0 | COUNT(*) counts the padded row |
| Delete the instructors below the average salary | 5 deleted, 7 remain | The average is computed once |
| `select (1,5) < (2,3), (1,5) <= (1,4)` | TRUE, FALSE | Tuple comparison is lexicographic |

## Windows keep every row, and MySQL checks every constraint immediately

The week-7 material splits into ranking and windowing, advanced aggregation, integrity constraints and triggers. On ties, RANK leaves gaps (1, 1, 3), DENSE_RANK does not (1, 1, 2), and ROW_NUMBER numbers every row 1 to n, breaking ties arbitrarily ([Silberschatz 6e Ch. 5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt); [MySQL window function descriptions](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html)). PERCENT_RANK is (rank − 1)/(n − 1), CUME_DIST is the share of rows ahead of or tied with the current row, and NTILE(k) deals rows into k near-equal buckets even when that splits ties. A verified seven-student example shows every rule at once.

| name | dept | gpa | ROW_NUMBER | RANK | DENSE_RANK | PERCENT_RANK | CUME_DIST | NTILE(3) |
|---|---|---|---|---|---|---|---|---|
| Ann | CS | 3.9 | 1 | 1 | 1 | 0 | 2/7 | 1 |
| Cat | CS | 3.9 | 2 | 1 | 1 | 0 | 2/7 | 1 |
| Bob | CS | 3.7 | 3 | 3 | 2 | 2/6 | 5/7 | 1 |
| Eve | Math | 3.7 | 4 | 3 | 2 | 2/6 | 5/7 | 2 |
| Fay | Math | 3.7 | 5 | 3 | 2 | 2/6 | 5/7 | 2 |
| Dan | Math | 3.5 | 6 | 6 | 3 | 5/6 | 6/7 | 3 |
| Gus | CS | 3.2 | 7 | 7 | 4 | 1 | 1 | 3 |

Window functions keep every input row, whereas GROUP BY collapses each group to one: showing each instructor's salary next to the department average returns 12 rows, and the GROUP BY version returns 7. Windows are computed after WHERE, GROUP BY and HAVING but before ORDER BY, LIMIT and DISTINCT, and MySQL allows them only in the SELECT list and ORDER BY ([MySQL window concepts](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html)). "Top N per group" therefore always needs a derived table.

```sql
SELECT dept_name, name, salary, rnk
FROM (SELECT dept_name, name, salary,
             RANK() OVER (PARTITION BY dept_name ORDER BY salary DESC) AS rnk
      FROM instructor) AS ranked          -- MySQL requires the alias
WHERE rnk <= 3                            -- legal here, illegal in the inner query's WHERE
ORDER BY dept_name, rnk;
```

The choice of function changes the answer. In the student example, RANK ≤ 2 keeps Ann and Cat in CS, DENSE_RANK ≤ 2 adds Bob at 3.7, and ROW_NUMBER ≤ 2 always returns exactly two rows per partition. The textbook also expects the window-free rewrite, which it calls "very inefficient": a row's rank is 1 plus the number of strictly greater values, and the dense rank uses COUNT(DISTINCT …) in that count ([6e Ch. 5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt)).

With an ORDER BY inside OVER, the default frame is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW, which includes the current row's peers ([MySQL window frames](https://dev.mysql.com/doc/refman/8.0/en/window-functions-frames.html)). So `SUM(v) OVER (ORDER BY k)` over (1,10), (2,20), (2,30), (3,40) returns 10, 60, 60, 100, not the running 10, 30, 60, 100, and LAST_VALUE with the default frame merely echoes the current row. ROWS counts physical rows, while RANGE measures distance in values. Over sales on 1, 2, 3, 5 and 6 October, a one-row moving average at 3 October averages 20, 30 and 40 to give 30, while a one-day RANGE window averages only 20 and 30 to give 25. The slides' wording "between rows 1 preceding and 1 following" must be written ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING in MySQL. MySQL has supported window functions since 8.0.2 ([MySQL 8.0.2 release notes](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/news-8-0-2.html)) but has no NULLS FIRST or NULLS LAST and treats NULL as the smallest value. RANK() OVER (ORDER BY score DESC) over A 90, B NULL, C 75, D 90 therefore ranks B fourth in MySQL but first in PostgreSQL. To get NULLS LAST in an ascending MySQL sort, write `ORDER BY score IS NULL, score` ([modern-sql.com on NULL](https://modern-sql.com/concept/null); [PostgreSQL SELECT](https://www.postgresql.org/docs/16/sql-select.html)). RANK became a reserved word in 8.0.2, so name the column rnk, not rank ([MySQL keywords](https://dev.mysql.com/doc/refman/8.0/en/keywords.html)).

ROLLUP(a, b, c) generates the n + 1 prefix groupings, and CUBE(a, b, c) generates all 2ⁿ = 8 subsets. Several items in one GROUP BY multiply, so ROLLUP(a), ROLLUP(b, c) yields 2 × 3 = 6 grouping sets, and CUBE(a, b, c, d) equals ROLLUP(a), ROLLUP(b), ROLLUP(c), ROLLUP(d) ([6e Ch. 5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt); [6e Ch. 5 solutions, Exercise 5.9](https://www.db-book.com/db6/practice-exer-dir/5s.pdf)). A rolled-up column shows NULL to mean "all", and GROUPING(col) = 1 distinguishes that NULL from a real one. MySQL supports only `GROUP BY a, b WITH ROLLUP`, together with GROUPING(), and has no CUBE or GROUPING SETS, so CUBE must be emulated with UNION ALL. Filter subtotal rows with HAVING GROUPING(…), never with WHERE col IS NULL, because the super-aggregate NULLs are added too late for WHERE to see them ([MySQL GROUP BY modifiers](https://dev.mysql.com/doc/refman/8.0/en/group-by-modifiers.html)). On sales of skirts and dresses in dark and white (8, 10, 20 and 5 units), the ROLLUP returns 7 rows ending with the grand total 43, and CUBE adds dark 28 and white 15.

The midterm's constraint questions are mostly "which mechanism enforces this rule" and "what does this DELETE do". A rule about one row's values is a CHECK. A value that must exist in another table's key is a FOREIGN KEY. Anything spanning rows or tables, such as "every section has at least one instructor", is an assertion in the standard and a trigger in MySQL. A rule comparing old and new values, such as "salaries never decrease", needs a BEFORE UPDATE trigger, because CHECK sees only the new row ([6e Ch. 4 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch4.ppt)). Cascade tracing follows each foreign-key edge from the deleted row. Under the authors' DDL, deleting student 12345 also deletes 4 takes rows and 1 advisor row, and deleting the Physics department sets dept_name to NULL for 2 instructors, 3 students and 1 course. Deleting course CS-101 fails entirely. Four prereq rows reference it through prereq_id, a foreign key with no ON DELETE action, which InnoDB treats as RESTRICT, so the cascade to its sections, takes and teaches rows is rolled back too ([DDL for MySQL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL-MySQL.sql); [MySQL FOREIGN KEY constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html)).

A trigger follows the event–condition–action model: on an INSERT, UPDATE or DELETE, if a condition holds, it runs an action ([6e Ch. 5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt)). BEFORE triggers validate or rewrite the incoming row, and SET NEW.col has an effect only there. AFTER triggers propagate a completed change to other tables, such as tot_cred or an audit log. NEW exists in INSERT triggers, OLD in DELETE triggers and both in UPDATE triggers, and OLD is read-only ([MySQL trigger syntax](https://dev.mysql.com/doc/refman/8.0/en/trigger-syntax.html)). The textbook's statement-level triggers, with their transition tables, have no MySQL counterpart. Its credits_earned trigger repays tracing. Starting from tot_cred = 120, the grade sequence NULL→A, A→B, B→F, F→C yields 124, 124, 124 and then 128. The total is double-counted because the trigger never subtracts, which is exactly the flaw Practice Exercise 5.6(a) asks students to fix. This was verified with a PostgreSQL port, and the official answer reads only "FILL" ([6e Ch. 5 solutions](https://www.db-book.com/db6/practice-exer-dir/5s.pdf)). For "when not to use triggers", the slides name built-in materialized views and replication as replacements, and warn of unintended execution when loading backups or replicating, of trigger errors that abort critical transactions, and of cascading execution.

| # | Question | Answer |
|---|---|---|
| 1 | Scores 50, 40, 40, 30, 30, 30, 20 are ordered DESC. Give RANK and DENSE_RANK for each. | RANK 1, 2, 2, 4, 4, 4, 7. DENSE_RANK 1, 2, 2, 3, 3, 3, 4. ROW_NUMBER runs 1 to 7, with tied rows in any order. |
| 2 | Give PERCENT_RANK and CUME_DIST for 50, 40, 30 and 20 in that table. | PERCENT_RANK 0, 1/6, 1/2, 1. CUME_DIST 1/7, 3/7, 6/7, 1. |
| 3 | How many rows land in each bucket of NTILE(4) over 10 rows? | 3, 3, 2, 2. |
| 4 | Over (day, amt) = (1,5), (2,10), (3,15), (4,20), compute SUM with ROWS UNBOUNDED PRECEDING, SUM from 1 PRECEDING to CURRENT ROW, and AVG from 1 PRECEDING to 1 FOLLOWING. | 5, 15, 30, 50. 5, 15, 25, 35. 7.5, 10, 15, 17.5, because the edge rows average only the rows that exist. |
| 5 | What is wrong with `SELECT student, SUM(marks) AS total, RANK() OVER (ORDER BY total DESC) AS trank FROM S GROUP BY student HAVING trank <= 3`? | Windows are computed after HAVING, and OVER cannot use the same SELECT's alias. Compute RANK() OVER (ORDER BY SUM(marks) DESC) in a derived table and filter outside it. |
| 6 | How many grouping sets do CUBE(a,b,c), ROLLUP(a,b,c) and ROLLUP(a), ROLLUP(b,c) produce? | 8, 4 and 6. |
| 7 | Which mechanism enforces each rule: (a) every instructor has a name; (b) an optional email is never duplicated; (c) section.time_slot_id exists in time_slot; (d) a salary never decreases? | (a) NOT NULL. (b) UNIQUE, which allows many NULLs. (c) Triggers, because time_slot_id is not a key of time_slot and CHECK forbids subqueries. (d) A BEFORE UPDATE trigger comparing OLD and NEW. |
| 8 | A column has CHECK (salary > 29000) and no NOT NULL. What happens to inserts of 20000 and of NULL on MySQL 8.0.30, and on 5.7? | 8.0.30 rejects 20000 and accepts NULL. 5.7 accepts both, because CHECK was ignored before 8.0.16. |
| 9 | In MySQL, does a takes AFTER DELETE trigger fire when a section's takes rows vanish through ON DELETE CASCADE? | No. MySQL never fires triggers for cascaded foreign-key actions, while PostgreSQL does. |
| 10 | Which of NEW and OLD exist in each trigger type? Can a MySQL trigger run once per statement, or ROLLBACK? | INSERT has NEW, DELETE has OLD, UPDATE has both. MySQL has no statement-level triggers and no ROLLBACK inside a trigger; use SIGNAL SQLSTATE '45000' instead. |

These answers were verified in PostgreSQL or SQLite, or are quoted from the MySQL manual ([MySQL window function descriptions](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html); [MySQL CHECK constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-check-constraints.html); [MySQL CREATE TRIGGER](https://dev.mysql.com/doc/refman/8.0/en/create-trigger.html)).

## Four days on the quiz pipeline, then official exercises for the midterm

No past SOC3020 quizzes or exams were available to this research. The best substitute is the authors' official practice-exercise solutions, which are "different from the exercises provided in the text" and are authorized "for personal use" ([Silberschatz 6e practice solutions](https://www.db-book.com/db6/practice-exer-dir/index.html)); the 7th-edition set prints the questions alongside the answers ([7e practice solutions](https://www.db-book.com/Practice-Exercises/index-solu.html)). Everything on Quiz #2 reappears on the midterm, so the quiz days double as midterm preparation for the E-R and constraint material. The sources do not give the midterm's exact day within 24–30 October. If it falls early in the week, compress the Saturday–Monday blocks into the days before it.

| Day | Focus | Tasks |
|---|---|---|
| Mon 19 Oct | Reading constraints and mapping | Read E&N Ch. 3 slides 3-6 to 3-43 and Ch. 7 slides 7-3 to 7-12, then Silberschatz 7e Ch. 6 slides pp. 7–48. Redo COMPANY from requirements R1–R7 without looking, and check the result against Figs. 3.2, 3.15 and 7.2. |
| Tue 20 Oct | DDL on paper and in MySQL | Write COMPANY in SQL-92 by hand, then in MySQL with ENGINE=InnoDB. Run SELECT VERSION() and SHOW CREATE TABLE, then one illegal INSERT per constraint. |
| Wed 21 Oct | Triggers, loading and the 3NF check | Write the guard triggers from the template, load sample rows, run the verification queries, and write the three-sentence 3NF argument. |
| Thu 22 Oct | Timed rehearsal | Do official exercises 6.1–6.11 from the 7e solutions PDF, which prints the questions. Map one fresh scenario, such as the library-loan question, end to end in 45 minutes. Review the trap table. |
| Fri 23 Oct | Quiz #2, then Chapters 1–2 | In the evening, work through the 6e 1s and 2s solutions and compute σ, Π, × and ⋈ on small tables. |
| Sat 24 Oct | SQL query semantics | Load DDL-MySQL.sql and the small dataset, reproduce the trace table, and do SQLZoo's "Using Null", "SUM and COUNT" and "JOIN" tutorials. |
| Sun 25 Oct | Normalization | Run the recipe on EMP_PROJ, EMP_DEPT, LOTS and the R(A…J) exercise, do the practice table, and check keys with the Carleton normalizer. |
| Mon 26 Oct | Advanced SQL | Run the ranking and frame examples in MySQL, the ROLLUP example, the cascade deletes inside START TRANSACTION … ROLLBACK, and credits_earned. |
| Tue 27 Oct onward | Mixed timed practice | Do the official 3s, 4s, 5s and 8s exercises, and re-derive every trap table from memory. |

The official materials are reliable but not flawless, and knowing their slips prevents copying them. The 6th-edition solution 7.8 gives section's key as (course_id, semester, year) without sec_id ([6e Ch. 7 solutions](https://www.db-book.com/db6/practice-exer-dir/7s.pdf)). Solutions 3.1e–g query semester 'Autumn' although the sample data uses 'Fall', and 3.1f omits the derived-table alias that MySQL requires ([6e Ch. 3 solutions](https://www.db-book.com/db6/practice-exer-dir/3s.pdf)). Solution 5.10 filters a window function in HAVING, which neither PostgreSQL nor MySQL accepts ([6e Ch. 5 solutions](https://www.db-book.com/db6/practice-exer-dir/5s.pdf)). A widely posted Alberta answer to the R(A…J) exercise omits the relation containing the key ABD, which makes its decomposition lossy ([Alberta solutions](https://webdocs.cs.ualberta.ca/~zaiane/courses/cmput391-03/work/assign2-03-sol.pdf)).

| Resource | Best use | Link |
|---|---|---|
| Silberschatz 6e slides (PPT) and 7e slides (PDF) | Definitions in course notation; the 7e PDFs are text-searchable | [6e slide index](https://www.db-book.com/db6/slide-dir/index.html); [7e Ch. 6 PDF](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf) |
| Official practice-exercise solutions | The closest available substitute for past papers | [6e](https://www.db-book.com/db6/practice-exer-dir/index.html); [7e, with questions](https://www.db-book.com/Practice-Exercises/index-solu.html) |
| University DDL for MySQL and the small dataset | Reproducing every example in the lab | [DDL-MySQL.sql](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL-MySQL.sql); [data](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql) |
| db-book in-browser SQL interpreter | Quick checks with the schema preloaded, remembering that SQLite is looser than MySQL | [SQL interpreter](https://www.db-book.com/university-lab-dir/sqljs.html) |
| Elmasri & Navathe publisher slides | COMPANY, (min,max), the mapping algorithm and Elmasri-style normalization | [Ch. 3](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf); [Ch. 7](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf); [Ch. 14](https://www.cs.purdue.edu/homes/bb/cs448_Fall2017/lpdf/Chapter14.pdf) |
| MySQL 8.0 Reference Manual | Exact lab syntax for foreign keys, CHECK, triggers, SIGNAL, windows and ROLLUP | [FOREIGN KEY](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html); [triggers](https://dev.mysql.com/doc/refman/8.0/en/trigger-syntax.html); [windows](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html) |
| CMU 15-445 Lecture 1 notes | A four-page summary of the relational model and algebra | [PDF](https://15445.courses.cs.cmu.edu/fall2019/notes/01-introduction.pdf) |
| UTA and Loyola normalization notes | Elmasri-style worked problems and key-finding | [UTA](https://ranger.uta.edu/~cli/lecnotes/notes-db-normalization.pdf); [Loyola](https://pld.cs.luc.edu/courses/353/now/notes/10.html) |
| Carleton and Raymond Cho FD tools | Checking keys, closures and normal forms | [Carleton](https://people.scs.carleton.ca/~ldnel/normalizer/); [Cho](http://raymondcho.net/RelationalDatabaseTools/RelationalDatabaseTools.html) |
| SQLZoo, HackerRank and LeetCode SQL 50 | Auto-checked query drills | [SQLZoo](https://sqlzoo.net/wiki/SQL_Tutorial); [HackerRank](https://www.hackerrank.com/domains/sql); [LeetCode](https://leetcode.com/studyplan/top-sql-50/) |
| Stanford (Widom) Databases courses on edX, listed as free to audit | Video lectures on SQL and data modeling | [Relational Databases and SQL](https://www.edx.org/learn/relational-databases/stanford-university-databases-relational-databases-and-sql); [Modeling and Theory](https://www.edx.org/learn/databases/stanford-university-databases-modeling-and-theory); [KDnuggets overview](https://www.kdnuggets.com/5-free-university-courses-to-learn-databases-and-sql) |
| PostgreSQL 16 documentation | The cleanest statement of standard window and trigger semantics | [window functions](https://www.postgresql.org/docs/16/functions-window.html); [CREATE TRIGGER](https://www.postgresql.org/docs/16/sql-createtrigger.html) |

## Conclusion

The outside sources change what mastering this half of the course means. The mapping rules are easy to memorize. The knowledge that separates students is the boundary between what a declarative schema can state and what it cannot, a boundary the textbook's own authors draw when they concede that minimums on the unreferenced side need deferred assertions that no mainstream system provides. MySQL's immediate checking turns that concession into concrete design work. It calls for guard triggers that protect minimums once they are met, foreign-key actions chosen so that cascades do not bypass those triggers, and a load procedure for cyclic NOT NULL references. A quiz answer that maps COMPANY correctly is adequate. One that also names the constraints the keys cannot enforce, supplies the triggers and explains the load order shows the understanding the homework is built to test.

The second lesson is that the expensive mistakes in both exams are silent. MySQL accepts a column-level REFERENCES clause and creates nothing, and it runs `full join` as an inner join. On older or misconfigured servers it ignores CHECK clauses and foreign keys. SQL returns an empty but plausible answer for NOT IN against a NULL, and db-book's SQLite interpreter accepts queries the textbook considers wrong. Mastery therefore includes verification habits as much as knowledge: write textbook SQL on paper and MySQL in the lab, confirm the server version and engine, and test every constraint with a deliberately violating row. Three uncertainties remain, and only the course itself can settle them: whether 2NF is graded against the primary key or against all candidate keys, what "optimized" means in the rubric, and which MySQL version the lab runs. State your assumption on each in your answers until you know.
