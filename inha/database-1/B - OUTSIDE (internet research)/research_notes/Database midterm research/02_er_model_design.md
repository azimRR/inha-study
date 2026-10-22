# Conceptual Database Design with the E-R Model: Silberschatz 6th ed. Ch. 7, plus the Elmasri & Navathe COMPANY Example (Exam Notes)

*Prepared 2026-10-19 for SOC3020-003 Database (Inha University in Tashkent, Prof. Alessandro Agostini). Targets the in-class Quiz #2 on Fri 23 Oct 2026 and the week-8 midterm (24–30 Oct).*

*This is outside (internet) material, built from the authors' free official materials and the publisher slides for the reference text. No pirated textbook copies were used or linked.*

*Terminology: Silberschatz (SKS) terms are primary, with Elmasri & Navathe (E&N) equivalents in brackets.*

*"Inferences" sections are my own syntheses: worked examples, answers, and cheat tables built by applying the cited rules. Diagram-only slides were rendered and inspected, so every "in words" description of a figure comes from looking at the official figure.*

Link labels used below:
- **SKS6-PPT**: the official 6th-ed. Ch. 7 slide deck (PowerPoint) in the db6 directory. Its file metadata says it was last saved in Jan 2016, and its wording is almost identical to the 7th-ed. deck.
- **SKS7 p.N**: the official 7th-ed. Ch. 6 slide deck (PDF). "p." is the PDF page; the printed footer number is 6.(N+4).
- **SKS6-SOL / SKS7-SOL**: the official practice-exercise solutions. SKS7-SOL also prints the questions.
- **DDL**: the official university-schema SQL.
- **EN3 / EN4 / EN5 / EN7**: E&N publisher slides (© 2007, 5th-ed. chapter numbering) for ER, EER, the relational model, and ER-to-relational mapping. "Slide 3-39" means printed slide number 39 of Chapter 3.

---

## 1. Where E-R design fits: conceptual design is "phase 2", and it starts from requirement sentences

### Takeaway
Conceptual design comes second. Requirements are collected and analysed first. The designer then turns the data requirements into a DBMS-independent conceptual schema, which is the E-R diagram. Only after that is the schema mapped to relations (logical design) and laid out physically (physical design). A good design avoids both redundancy and incompleteness.

### Cited Findings
- **E&N Figure 3.1 (main phases of database design):** Miniworld → *Requirements collection and analysis* → (Data requirements) → *Conceptual design* → "Conceptual Schema (In a high-level data model)" → *Logical design (Data model mapping)* → "Logical (Conceptual) Schema (In the data model of a specific DBMS)" → *Physical design* → Internal schema.
  - A parallel functional track runs alongside: Functional analysis → Application program design → Transaction implementation.
  - A dashed line in the figure separates the DBMS-independent part from the DBMS-specific part. Conceptual design is above the line; logical design is below it.
  - [EN3 slide 3-5](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **E&N: two main activities.** These are "Database design" and "Applications design". Applications design "focuses on the programs and interfaces that access the database" — [EN3 slide 3-4](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **SKS phase wording:**
  - "Initial phase -- characterize fully the data needs of the prospective database users."
  - "Second phase -- choosing a data model", "Applying the concepts of the chosen data model", "Translating these requirements into a conceptual schema of the database."
  - "A fully developed conceptual schema indicates the functional requirements of the enterprise", that is, the operations or transactions to be performed on the data.
  - [SKS7 p.2](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS final phase:**
  - "Logical Design – Deciding on the database schema… find a 'good' collection of relation schemas." This involves a business decision ("What attributes should we record?") and a computer-science decision ("What relation schemas should we have and how should the attributes be distributed…?").
  - "Physical Design – Deciding on the physical layout of the database."
  - [SKS7 p.3](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS two pitfalls:**
  - "Redundancy: a bad design may result in repeat information", which "may lead to data inconsistency".
  - "Incompleteness: a bad design may make certain aspects of the enterprise difficult or impossible to model".
  - "There may be a large number of good designs from which we must choose."
  - [SKS7 p.4](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **E-R model and data semantics.** The E-R model "is very useful in mapping the meanings and interactions of real-world enterprises onto a conceptual schema". It "employs three basic concepts: entity sets, relationship sets, attributes" — [SKS6-PPT, "ER model -- Database Modeling"](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch7.ppt)
- **E&N way of working from requirements:**
  - "Based on the requirements, we can identify four initial entity types… DEPARTMENT, PROJECT, EMPLOYEE, DEPENDENT. The initial attributes shown are derived from the requirements description" — [EN3 slide 3-17](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
  - "The initial design is typically not complete. Some aspects in the requirements will be represented as relationships" — [EN3 slide 3-19](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
  - "Some attributes from the initial entity types are refined into relationships: Manager of DEPARTMENT -> MANAGES; Works_on of EMPLOYEE -> WORKS_ON; Department of EMPLOYEE -> WORKS_FOR" — [EN3 slide 3-27](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **Normalization is the companion technique.** It is used to "Formalize what designs are bad, and test for them". It is Ch. 8 in the 6th ed. and Ch. 7 in the 7th ed. — [SKS6-PPT, "Design Approaches"](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch7.ppt); [SKS7 p.5](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)

### Inferences
- "Conceptual data design as phase 2", as taught in class, matches SKS's "second phase" and E&N's "Conceptual design" box. Its input is the list of data-requirement sentences. Its output is an E-R diagram that does not depend on MySQL or any other DBMS. MySQL enters only at the logical and physical phases.
- E&N's COMPANY walk-through is itself a design method:
  1. Draft entity types with attributes.
  2. Notice attributes that really refer to another entity, such as "manager of department". Replace them with relationship types.
  3. Add constraints.

  The worked COMPANY case in Section 11 follows these steps.

### Gaps
- The exact wording of the class slides about "phase 2" was not examined, because class slides are out of scope for outside research.

---

## 2. Step-by-step method: turning requirement sentences into entity sets, relationship sets, cardinality and participation

### Takeaway
For every relationship and for each entity set that takes part in it, ask two questions:
1. **Maximum:** can one entity be related to more than one partner? This gives the cardinality ratio, or the arrow in SKS notation.
2. **Minimum:** must every entity take part? This gives total vs. partial participation.

Then write the answer in whichever notation the question asks for. Section 4 shows how to convert between notations.

### Cited Findings
- **E&N (min,max) definition:**
  - It is "Specified on each participation of an entity type E in a relationship type R. Specifies that each entity e in E participates in at least min and at most max relationship instances in R."
  - The default (no constraint) is min=0, max=n.
  - The rules are min ≤ max, min ≥ 0, max ≥ 1.
  - It is "Derived from the knowledge of mini-world constraints".
  - [EN3 slide 3-39](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **E&N worked sentence → (min,max) examples:**
  - "A department has exactly one manager and an employee can manage at most one department" → "(0,1) for participation of EMPLOYEE in MANAGES" and "(1,1) for participation of DEPARTMENT in MANAGES".
  - "An employee can work for exactly one department but a department can have any number of employees" → "(1,1) for participation of EMPLOYEE in WORKS_FOR" and "(0,n) for participation of DEPARTMENT in WORKS_FOR".
  - [EN3 slide 3-39](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **E&N: maximum vs. minimum constraints:**
  - "Cardinality Ratio (specifies maximum participation)": 1:1, 1:N or N:1, M:N.
  - "Existence Dependency Constraint (specifies minimum participation) (also called participation constraint)": "zero (optional participation, not existence-dependent)" or "one or more (mandatory participation, existence-dependent)".
  - [EN3 slide 3-30](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **SKS l..h:**
  - "A minimum value of 1 indicates total participation. A maximum value of 1 indicates that the entity participates in at most one relationship. A maximum value of * indicates no limit."
  - Example: "Instructor can advise 0 or more students. A student must have 1 advisor; cannot have multiple advisors". It is drawn with 0..* on the instructor–advisor line and 1..1 on the advisor–student line.
  - [SKS7 p.28](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS total participation:** "every entity in the entity set participates in at least one relationship in the relationship set" (student in advisor). Partial participation means "some entities may not participate in any relationship" (instructor in advisor) — [SKS7 p.27](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)

### Inferences

#### A 10-step design method (requirements → E-R → tables)
1. **Number the requirement sentences** R1, R2, … so that every element in your diagram can be traced back to a sentence.
2. **Find entity sets and attributes.**
   - Nouns that have an identity and properties of their own become **entity sets**.
   - Single facts about such a noun become **attributes**.
   - Label each attribute: simple or composite (indented sub-attributes), single-valued or multivalued (`{A}`), derived (`A()`).
3. **Find keys.**
   - "Unique …" or "identified by …" marks a **primary key**; underline it.
   - "Numbered within each X", or "unique only for a given X", marks a **weak entity set**. Its discriminator gets a dashed underline. X is its identifying entity set. Draw a double diamond, with a double line from the weak set.
4. **Find relationships.** Verbs and associations between nouns become **relationship sets**. Decide the degree (binary, ternary, and so on). If the same entity set appears twice, add **role** labels; this is a recursive relationship.
5. **Ask the two questions for each relationship and each participant E:**
   - Q-max: "Can one E be related to more than one partner, or more than one combination of partners?"
   - Q-min: "Must every E be related at least once?"
6. **Encode the answers.**
   - SKS: draw an arrowhead toward an entity set Y exactly when each entity on the other side relates to at most one Y. Draw a double line for total participation. Alternatively, write l..h on E's own line.
   - E&N: write (min,max) next to E, or 1/N labels with double lines.
7. **Find relationship attributes.** Facts that describe the association itself (hours, grade, start date) are relationship attributes. For 1:N relationships they may move to the N side (Section 9).
8. **Sanity checks:**
   - No foreign-key-like attributes inside entity rectangles.
   - No repeating events squeezed into a single relationship per pair.
   - At most one arrow on an n-ary relationship.
   - Every requirement sentence is covered.
9. **Reduce to tables** using the Section 8 algorithm. Then add PRIMARY KEY, FOREIGN KEY, NOT NULL (for total participation on a merged many side) and UNIQUE (for 1:1).
10. **List what the tables cannot enforce**, for example total participation on the "one" side or in an M:N relationship (Section 5). Mentioning this earns marks.

#### Phrase → constraint cheat table (for entity set X in relationship R with Y)

| Wording about X | min | max | (min,max) or l..h on X's side | SKS drawing on X's side | Arrowhead at Y? |
|---|---|---|---|---|---|
| "each X has exactly one Y", "every X must have one (and only one) Y", "X belongs to one Y" | 1 | 1 | (1,1) / 1..1 | double line X–R | yes |
| "each X has at most one Y", "an X may have a Y", "zero or one" | 0 | 1 | (0,1) / 0..1 | single line | yes |
| "each X has at least one Y", "one or more" | 1 | N | (1,N) / 1..* | double line | no |
| "an X may have several / many / any number of Y" | 0 | N | (0,N) / 0..* | single line | no |
| "each X has at least k Y" (k > 1) | k | N | (k,N) / k..* | (only l..h can show k) | no |

Rules of thumb:
- **Minimum words:** "must", "every", "each … is required to", "has to" → min ≥ 1. "May", "can", "some", "optionally", "possibly none" → min = 0.
- **Maximum words:** "one", "a single", "only one", "at most one" → max = 1. "Several", "many", "a number of", "any number", "one or more" → max = N.
- **Mixed wording:** "Each employee **must** work for **at most one** department" combines both. "Must" gives min = 1; "at most one" gives max = 1. So EMPLOYEE is (1,1) in WORKS_FOR. This matches E&N's own reading of "works for exactly one department" — [EN3 slide 3-39](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf).
  - If the sentence lacked "must" ("works for at most one department"), the answer would be (0,1) with partial participation.
  - If an exam sentence is ambiguous, state your reading in one line.
- **The other side needs its own sentence.** Each sentence constrains only the side it talks about. "A department may have no employees" gives DEPARTMENT (0,N). "A department must have at least one employee" gives DEPARTMENT (1,N). If no sentence says anything, the default is (0,N), which means no constraint — [EN3 slide 3-39](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf).

### Gaps
- Neither author publishes an official "keyword list". The phrase table above is my synthesis of the cited definitions.

---

## 3. Core building blocks: entities and entity sets, relationship sets (degree, roles, recursive), attributes (types, domain, null)

### Takeaway
- An **entity set** is a set of same-type, distinguishable objects described by attributes, with a primary key.
- A **relationship set** is a mathematical relation over n ≥ 2 entity sets, and it can have its own descriptive attributes.
- When the same entity set takes part more than once, which makes the relationship **recursive**, role labels are mandatory.
- **Attributes** are classified as simple/composite, single-valued/multivalued, and stored/derived. Each attribute has a domain, and its value may be null.

### Cited Findings
- **Entity and entity set (SKS):**
  - "An entity is an object that exists and is distinguishable from other objects", for example a specific person, company, event or plant.
  - "An entity set is a set of entities of the same type that share the same properties."
  - "An entity is represented by a set of attributes; i.e., descriptive properties possessed by all members of an entity set", for example instructor = (ID, name, salary) and course = (course_id, title, credits).
  - "A subset of the attributes form a primary key of the entity set."
  - [SKS7 p.7](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **E&N wording:**
  - "Entities with the same basic attributes are grouped or typed into an entity type" — [EN3 slide 3-12](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
  - The collection of entities is "Called the entity set", and the "Same name (CAR) used to refer to both the entity type and the entity set" — [EN3 slide 3-16](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **Relationship and relationship set (SKS):**
  - "A relationship is an association among several entities."
  - "A relationship set is a mathematical relation among n ≥ 2 entities, each taken from entity sets {(e1, e2, … en) | e1 ∈ E1, e2 ∈ E2, …, en ∈ En}." Example: (44553, 22222) ∈ advisor, linking student Peltier to instructor Einstein.
  - [SKS7 p.9](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **Descriptive attribute of a relationship:** the advisor relationship set "may have the attribute date which tracks when the student started being associated with the advisor" — [SKS7 p.12](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **Degree:**
  - A "Binary relationship involve[s] two entity sets (or degree two)", and "most relationship sets in a database system are binary".
  - Ternary example: "students work on research projects under the guidance of an instructor", so "relationship proj_guide is a ternary relationship between instructor, student, and project".
  - [SKS7 p.15](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **E&N on relationships:**
  - "A relationship relates two or more distinct entities with a specific meaning" — [EN3 slide 3-20](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
  - A relationship *type* "Is the schema description of a relationship", giving its name, participating entity types and constraints, while the relationship *set* holds the instances — [EN3 slide 3-23](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
  - "More than one relationship type can exist between the same participating entity types. MANAGES and WORKS_FOR are distinct relationship types between EMPLOYEE and DEPARTMENT. Different meanings and different relationship instances" — [EN3 slide 3-27](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **Roles (SKS):**
  - "Entity sets of a relationship need not be distinct. Each occurrence of an entity set plays a 'role' in the relationship. The labels 'course_id' and 'prereq_id' are called roles."
  - In the figure, two separate lines run from the course rectangle to the prereq diamond. One is labelled course_id and the other prereq_id.
  - [SKS7 p.14](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **Recursive relationship (E&N):**
  - A recursive relationship type has "the same participating entity type in distinct roles". In SUPERVISION, "EMPLOYEE participates twice in two distinct roles: supervisor (or boss) role; supervisee (or subordinate) role" — [EN3 slide 3-28](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
  - "In ER diagram, need to display role names to distinguish participations" — [EN3 slide 3-33](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **Attribute types (SKS):**
  - "Simple and composite attributes. Single-valued and multivalued attributes. Example: multivalued attribute: phone_numbers. Derived attributes: Can be computed from other attributes. Example: age, given date_of_birth. Domain – the set of permitted values for each attribute" — [SKS7 p.17](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - "Composite attributes allow us to divide attributes into subparts (other attributes)." Examples: name → first_name, middle_initial, last_name; address → street (street_number, street_name, apartment_number), city, state, postal_code — [SKS7 p.18](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **Attribute types (E&N):**
  - Simple: "Each entity has a single atomic value for the attribute", for example SSN or Sex.
  - Composite: "The attribute may be composed of several components", for example Name(FirstName, MiddleName, LastName), and "Composition may form a hierarchy".
  - Multi-valued: "An entity may have multiple values for that attribute", for example {Color} of a CAR.
  - Nesting is possible, for example "{PreviousDegrees (College, Year, Degree, Field)}".
  - [EN3 slides 3-9, 3-10](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **Domain (E&N):** "Each attribute has a value set (or data type) associated with it" — [EN3 slide 3-8](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **Keys in E&N terms:**
  - "An attribute of an entity type for which each entity must have a unique value is called a key attribute", for example SSN.
  - "A key attribute may be composite", for example VehicleTagNumber (Number, State).
  - "An entity type may have more than one key", for example CAR's VIN and VehicleTagNumber.
  - [EN3 slides 3-12, 3-13](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **Null:**
  - "An attribute takes a null value when an entity does not have a value for it." This is a secondary blog summary that follows the SKS textbook — [leeyngdo, "[DB] E-R Model"](https://leeyngdo.github.io/blog/database-system/2024-04-01-er-model/)
  - In the relational model, every value must come from its attribute's domain, "or it could be null, if allowed for that attribute" — [EN5 slide 5-21](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch05-The%20Relational%20Data%20Model%20and%20Relational%20Database%20Constraints.pdf)

### Inferences
- **Terminology map** (use the SKS term on SKS-based exams):

| Silberschatz (SKS) | Elmasri & Navathe (E&N) |
|---|---|
| entity set | entity type (schema) / entity set (instances) |
| relationship set | relationship type / relationship set |
| mapping cardinality (one-to-one …) | cardinality ratio (1:1, 1:N, N:1, M:N) |
| total / partial participation | total (existence dependency) / partial participation |
| l..h cardinality limits | (min, max) structural constraint |
| discriminator (partial key) | partial key |
| identifying (owner) entity set | owner / identifying entity type |
| strong entity set | regular (strong) entity type |
| role | role name |

- **Recursive relationships in SKS notation.** Draw two lines from the same rectangle to the diamond and label each line with its role, as prereq does with course_id and prereq_id. When reducing to tables, each role becomes its own foreign-key column. The DDL shows this for prereq; see Section 8.

### Gaps
- No free official SKS source states the textbook's finer null semantics. The textbook distinguishes "not applicable" from "unknown", and "unknown" from missing vs. not known (§7.2.3 of the printed 6th ed., not seen). The finer distinction is reported here from memory and is unverified. Check the class slides before relying on it.

---

## 4. Constraints I: mapping cardinality (cardinality ratio), participation, SKS l..h vs. E&N (min,max), and how they differ

### Takeaway
- **Cardinality ratio** (SKS arrows, Chen/E&N "1/N" labels) captures only the maximums. It is drawn **look-across**: the "1" sits next to the entity that a partner can have at most one of.
- **(min,max)** (E&N) and **l..h** (SKS) capture both minimum and maximum. They are written **look-here**: the pair next to entity set E describes E's own participation.
- Participation (total/partial) is a separate double-line mark in the ratio notation. It is built into the minimum of (min,max) and l..h.
- Mixing up "look-here" and "look-across" is the number-one exam trap.

### Cited Findings
- **SKS mapping cardinality:**
  - It expresses "the number of entities to which another entity can be associated via a relationship set". It is "Most useful in describing binary relationship sets". For a binary relationship set it must be one-to-one, one-to-many, many-to-one or many-to-many.
  - The definition diagrams note: "Some elements in A and B may not be mapped to any elements in the other set."
  - [SKS7 pp.20–22](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS arrows:**
  - "We express cardinality constraints by drawing either a directed line (→), signifying 'one,' or an undirected line (—), signifying 'many,' between the relationship set and the entity set" — [SKS7 p.23](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - The figures show the four cases for instructor–advisor–student:
    - **One-to-one:** arrowheads at both instructor and student [p.23].
    - **One-to-many from instructor to student:** an arrowhead only at instructor. "An instructor is associated with several (including 0) students… a student is associated with at most one instructor" [p.24].
    - **Many-to-one from instructor to student:** an arrowhead only at student [p.25].
    - **Many-to-many:** no arrowheads [p.26].
  - [SKS7 pp.23–26](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS participation:**
  - "Total participation (indicated by double line): every entity in the entity set participates in at least one relationship in the relationship set". The figure draws a double line between the advisor diamond and student.
  - "Partial participation: some entities may not participate", for example instructor in advisor.
  - [SKS7 p.27](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS l..h:** "A line may have an associated minimum and maximum cardinality, shown in the form l..h". The example has 0..* on the instructor line and 1..1 on the student line, meaning "A student must have 1 advisor; cannot have multiple advisors" — [SKS7 p.28](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS ternary relationships:**
  - "We allow at most one arrow out of a ternary (or greater degree) relationship to indicate a cardinality constraint." For example, "an arrow from proj_guide to instructor indicates each student has at most one guide for a project".
  - With two arrows (to B and C), R could mean either "Each A entity is associated with a unique entity from B and C", or "Each pair of entities from (A, B) is associated with a unique C entity, and each pair (A, C) is associated with a unique B". "Each alternative has been used in different formalisms. To avoid confusion we outlaw more than one arrow."
  - [SKS7 p.29](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **E&N notation:**
  - The cardinality ratio is "Shown by placing appropriate numbers on the relationship edges". Participation is "Total shown by double line, partial by single line" — [EN3 slide 3-38](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
  - In Figure 3.14 (summary of notation), "Cardinality Ratio 1:N for E1:E2 in R" is drawn with "1" on E1's edge and "N" on E2's edge. "Structural Constraint (min, max) on Participation of E in R" is written on the edge next to E — [EN3 slide 3-43](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
  - "Read the min,max numbers next to the entity type and looking away from the entity type" — [EN3 slide 3-40](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **E&N on n-ary relationships:**
  - "The (min, max) constraints can be displayed on the edges – however, they do not fully describe the constraints."
  - "A 1 indicates that an entity can participate in at most one relationship instance that has a particular combination of the other participating entities."
  - "In general, both (min, max) and 1, M, or N are needed to describe fully the constraints."
  - [EN3 slide 3-52](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **COMPANY in both notations** (figures inspected):
  - In Fig. 3.2, WORKS_FOR has "N" on the EMPLOYEE edge and "1" on the DEPARTMENT edge, with double lines on both edges.
  - In Fig. 3.15, the same relationship is EMPLOYEE (1,1) and DEPARTMENT (4,N).
  - [EN3 slides 3-26, 3-41](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **Look-across vs. same-side (Wikipedia):** Chen used "look-across" cardinalities. Merise, Elmasri & Navathe and others showed a "preference for same-side for roles and both minimum and maximum cardinalities" — [Wikipedia, Entity–relationship model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)
- **SKS on UML:** UML cardinalities are positioned the other way round: "Note reversal of position in cardinality constraint depiction". The E-R line E1 —0..*— R —0..1— E2 is drawn in UML as E1 0..1 —R— 0..* E2 — [SKS7 p.75](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)

### Inferences

#### (min,max) vs. cardinality ratio: what is different

| | Cardinality ratio (1:1, 1:N, M:N); SKS arrows | (min,max) (E&N) / l..h (SKS) |
|---|---|---|
| What it says | Only the maximums | Both minimum and maximum, per participant |
| Where it is written | Look-across: the "1" goes next to the entity a partner can have at most one of (SKS: the arrowhead points at that entity) | Look-here: (min,max) next to E describes how many relationship instances each E takes part in |
| Participation | Separate mark: double line = total | Built in: min ≥ 1 means total, min = 0 means partial |
| Numbers > 1 | Cannot express "at least 4" | Can: (4,N) / 4..* |
| n-ary | SKS: at most one arrow; E&N: 1/M/N per edge | Insufficient alone for n-ary (E&N) |

#### Conversion rule for a binary R between A and B
Let A take part in (minA, maxA) and B in (minB, maxB).

| Notation | What to draw |
|---|---|
| E&N (min,max) | (minA, maxA) next to A; (minB, maxB) next to B |
| SKS l..h | minA..maxA on A's line; minB..maxB on B's line |
| SKS arrows | Arrowhead at B ⇔ maxA = 1. Arrowhead at A ⇔ maxB = 1. Double line on A's side ⇔ minA ≥ 1 |
| Chen/E&N ratio | Label next to B = maxA (written 1 or N). Label next to A = maxB. Double line on A's side ⇔ minA ≥ 1 |

- Worked check with E&N's own figures: WORKS_FOR has EMPLOYEE (1,1) and DEPARTMENT (4,N).
  - maxEMPLOYEE = 1, so "1" goes next to DEPARTMENT. maxDEPARTMENT = N, so "N" goes next to EMPLOYEE.
  - minEMPLOYEE = 1, so EMPLOYEE's edge is a double line. minDEPARTMENT = 4 ≥ 1, so DEPARTMENT's edge is also a double line.
  - This is exactly what Fig. 3.2 shows ([EN3 slides 3-26, 3-41](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)).
- A one-line memory aid:
  - **(min,max) and l..h describe the entity they sit next to.**
  - **1/N labels, arrowheads, crow's feet and UML multiplicities describe the entity at the other end of the line.**

### Gaps
- None for the binary case. For n-ary relationships, the sources agree that no single notation captures every constraint.

---

## 5. Constraints II: keys for entity sets and for relationship sets ("relationship integrity")

### Takeaway
- **Entity sets:** superkey ⊇ candidate key (a minimal superkey) ⊇ the chosen primary key.
- **Relationship sets:** the union of the participants' primary keys is a superkey. The primary key then depends on mapping cardinality:
  - M:N → the union of the keys.
  - 1:N or N:1 → the key of the "many" side.
  - 1:1 → the key of either side.
- **Descriptive attributes of a relationship are not part of its key.** As a result, a given combination of entities can appear at most once in a relationship set.

### Cited Findings
- **SKS, entity sets:**
  - "By definition, individual entities are distinct. From database perspective, the differences among them must be expressed in terms of their attributes… No two entities in an entity set are allowed to have exactly the same value for all attributes."
  - "A key for an entity is a set of attributes that suffice to distinguish entities from each other."
  - [SKS7 p.31](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **E&N key vocabulary:**
  - A superkey is a set of attributes on which no two tuples agree. A "Key" is "A 'minimal' superkey", such that removing any attribute leaves a set that is no longer a superkey.
  - "If a relation has several candidate keys, one is chosen arbitrarily to be the primary key. The primary key attributes are underlined." A "General rule: Choose as primary key the smallest of the candidate keys".
  - [EN5 slides 5-22 to 5-24](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch05-The%20Relational%20Data%20Model%20and%20Relational%20Database%20Constraints.pdf)
- **SKS, relationship sets:**
  - "To distinguish among the various relationships of a relationship set we use the individual primary keys of the entities in the relationship set… The primary key for R consists of the union of the primary keys of entity sets E1, E2, ..En." For advisor, "The primary key consists of instructor.ID and student.ID".
  - "The choice of the primary key for a relationship set depends on the mapping cardinality of the relationship set."
  - [SKS7 p.32](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS, choosing the key by cardinality:**
  - "Many-to-Many relationships. The preceding union of the primary keys is a minimal superkey and is chosen as the primary key."
  - "One-to-Many relationships. The primary key of the 'Many' side is a minimal superkey and is used as the primary key." The same holds for many-to-one.
  - "One-to-one relationships. The primary key of either one of the participating entity sets forms a minimal superkey, and either one can be chosen as the primary key."
  - [SKS7 p.33](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **Conflict to know about.** SKS7 p.32 also says "If the relationship set R has attributes a1, a2, .., am associated with it, then the primary key of R also includes the attributes a1, a2, .., am" ([SKS7 p.32](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)). The authors' own DDL does not do this:
  - takes(ID, course_id, sec_id, semester, year, grade) has primary key (ID, course_id, sec_id, semester, year), which excludes grade.
  - advisor(s_ID, i_ID) has primary key (s_ID).
  - teaches has primary key (ID, course_id, sec_id, semester, year).
  - prereq has primary key (course_id, prereq_id).
  - [DDL](https://www.db-book.com/university-lab-dir/sample_tables-dir/DDL.sql)
- **Official exercise answers on enforcing cardinality with keys:**
  - If advisor were one-to-one: "In addition to declaring s_ID as primary key for advisor, we declare i_ID as a superkey for advisor (this can be done in SQL using the unique constraint on i_ID)" — [SKS6-SOL 7.9](https://www.db-book.com/db6/practice-exer-dir/7s.pdf)
  - For sec_course (many-to-one), the primary and foreign keys "ensure that a particular section can only correspond to one course, and thus the many-to-one cardinality constraint is enforced. However, these constraints cannot enforce a total participation constraint" — [SKS7-SOL 6.8](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **One relationship per pair:** exercise 6.2(b) requires the design to "Make sure that only one relationship exists between a particular student and section pair, yet you can represent the marks that a student gets in different exams" — [SKS7-SOL 6.2](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **E&N relational integrity:**
  - The relational model has "Key constraints", "Entity integrity constraints" and "Referential integrity constraints" — [EN5 slide 5-21](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch05-The%20Relational%20Data%20Model%20and%20Relational%20Database%20Constraints.pdf)
  - A foreign-key value must be "(1) a value of an existing primary key value… or (2) a null. In case (2), the FK in R1 should not be a part of its own primary key" — [EN5 slide 5-31](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch05-The%20Relational%20Data%20Model%20and%20Relational%20Database%20Constraints.pdf)

### Inferences
- **"Relationship integrity" (the class term)** most likely bundles two ideas:
  1. **Identity:** a relationship instance is identified by the keys of the entities it connects. So the same combination cannot occur twice in one relationship set, and descriptive attributes such as date or grade are not key parts.
  2. **Existence:** a relationship can only connect entities that exist. After mapping, this becomes referential integrity (FK → PK). Because key parts can never be null (entity integrity), FK columns that sit inside a primary key must be NOT NULL.
- **Consequence for design:** if the same pair can be related several times (repeat loans, several assignment marks, meetings on several dates), a plain relationship set cannot hold it. Promote the association to an entity set, or a weak entity set, or use a multivalued attribute (see Sections 9 and 12).
- **Primary key of a relationship's table, by type:**

| Relationship | Primary key of its table (before any merging) |
|---|---|
| binary M:N | PK(A) ∪ PK(B) |
| binary 1:N or N:1 | PK of the "many" side |
| binary 1:1 | PK of either side (the other side's key becomes UNIQUE) |
| n-ary, no arrow | union of all participants' PKs |
| n-ary, arrow to Y | union of the PKs of the participants *other than* Y. Example: proj_guide with an arrow to instructor → (student ID, project_id), because SKS7 p.29 says each (student, project) pair has at most one instructor |

### Gaps
- The phrase "relationship integrity" does not appear in the SKS or E&N materials consulted. The interpretation above is my reasoning; match it to the class definition.

---

## 6. Weak entity sets: identifying relationship, discriminator (partial key), total participation, primary key

### Takeaway
A weak entity set has no primary key of its own. It is identified through a many-to-one, total participation in an **identifying relationship** (double diamond) with its **identifying (owner) entity set**. Its primary key is the owner's primary key plus the **discriminator**, which has a dashed underline. Its table includes the owner's key as a foreign key, and the identifying relationship gets no table of its own.

### Cited Findings
- **The SKS motivating example:**
  - A section "is uniquely identified by a course_id, semester, year, and sec_id". A relationship set sec_course makes course_id inside section redundant. Dropping sec_course would make the relationship "implicit in an attribute, which is not desirable" — [SKS7 p.34](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - If course_id is dropped from section, "the entity set section then does not have enough attributes to identify a particular section entity uniquely". So "we treat the relationship sec_course as a special relationship that provides extra information, in this case, the course_id" — [SKS7 p.35](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS definition:** "A weak entity set is one whose existence is dependent on another entity, called its identifying entity; instead of associating a primary key with a weak entity, we use the identifying entity, along with extra attributes called discriminator to uniquely identify a weak entity. An entity set that is not a weak entity set is termed a strong entity set" — [SKS6-PPT, "Weak Entity Sets (Cont.)"](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch7.ppt)
- **SKS terms:**
  - "Every weak entity must be associated with an identifying entity; that is, the weak entity set is said to be existence dependent on the identifying entity set."
  - "The identifying entity set is said to own the weak entity set that it identifies."
  - "The relationship associating the weak entity set with the identifying entity set is called the identifying relationship."
  - The relational schema for section "does have the attribute course_id… even though we have dropped the attribute course_id from the entity set section."
  - [SKS7 p.36](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS notation:**
  - "In E-R diagrams, a weak entity set is depicted via a double rectangle. We underline the discriminator of a weak entity set with a dashed line. The relationship set connecting the weak entity set to the identifying strong entity set is depicted by a double diamond. Primary key for section – (course_id, sec_id, semester, year)."
  - The figure, inspected, shows course(course_id, title, credits) ← sec_course (double diamond) ═ section (double rectangle; sec_id, semester and year with dashed underlines). The arrowhead points from sec_course to course. A double line runs from section to sec_course.
  - [SKS7 p.37](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf). The same text is in the 6th-ed.-directory deck: [SKS6-PPT, "Expressing Weak Entity Sets"](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch7.ppt)
- **SKS reduction:**
  - "A weak entity set becomes a table that includes a column for the primary key of the identifying strong entity set: section (course_id, sec_id, sem, year)" — [SKS7 p.42](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - "The schema corresponding to a relationship set linking a weak entity set to its identifying strong entity set is redundant. Example: The section schema already contains the attributes that would appear in the sec_course schema" — [SKS7 p.48](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **DDL:** section has primary key (course_id, sec_id, semester, year) and "foreign key (course_id) references course (course_id) on delete cascade" — [DDL](https://www.db-book.com/university-lab-dir/sample_tables-dir/DDL.sql)
- **Why not just make it strong (official answer):** "If we add primary-key attributes to the weak entity set, they will be present in both the entity set, and the relationship set and they have to be the same. Hence there will be redundancy" — [SKS7-SOL 6.7](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **E&N definitions:**
  - A weak entity type is "An entity that does not have a key attribute". It "must participate in an identifying relationship type with an owner or identifying entity type". Entities are identified by "A partial key of the weak entity type" plus "The particular entity they are related to in the identifying entity type".
  - Example: DEPENDENT is identified by the dependent's first name plus the related EMPLOYEE. "Name of DEPENDENT is the partial key", and the identifying relationship type is DEPENDENT_OF.
  - [EN3 slide 3-29](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **E&N notation:**
  - Fig. 3.14 lists "Weak Entity" as a double rectangle and "Identifying Relationship" as a double diamond.
  - In Fig. 3.2, DEPENDENT is a double rectangle, its Name has a dashed underline, DEPENDENTS_OF is a double diamond, the ratio is 1 (EMPLOYEE) : N (DEPENDENT), and DEPENDENT's edge is a double line.
  - In Fig. 3.15, DEPENDENT is (1,1) and EMPLOYEE is (0,N).
  - [EN3 slides 3-26, 3-41, 3-43](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **E&N mapping Step 2:** "include as foreign key attributes of R the primary key attribute(s) of the relation(s) that correspond to the owner entity type(s). The primary key of R is the combination of the primary key(s) of the owner(s) and the partial key of the weak entity type W." Example: DEPENDENT has primary key {ESSN, DEPENDENT_NAME} — [EN7 slide 7-7](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf)
- **Several owners are possible:**
  - "In some cases, a ternary relationship can be represented as a weak entity if the data model allows a weak entity type to have multiple identifying relationships (and hence multiple owner entity types)" — [EN3 slide 3-48](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
  - SKS: the artificial entity set E that replaces a ternary relationship can be a weak entity set "identified by the three relationship sets" — [SKS7 p.68](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf); [SKS6-SOL 7.6d](https://www.db-book.com/db6/practice-exer-dir/7s.pdf)
- **Official example of a weak entity in a design:** in the car-insurance exercise, "Payments are modeled as weak entities since they are related to a specific policy" — [SKS6-SOL 7.1](https://www.db-book.com/db6/practice-exer-dir/7s.pdf)
- **MySQL Workbench (crow's foot), where the course's logical schemas are drawn:**
  - "An identifying relationship: identified by a solid line between tables. An identifying relationship is one where the child table cannot be uniquely identified without its parent."
  - "A non-identifying relationship: identified by a broken (dashed) line between tables."
  - [MySQL Workbench Manual 9.1.4.1](https://dev.mysql.com/doc/workbench/en/wb-relationship-tools.html)

### Inferences
- **Recognition test.** A thing is weak when its "number" restarts for every owner (section 1 of each course, payment 3 of each policy, dependent "Alice" of each employee, bed 2 of each ward), and when it cannot exist without that owner. If it has a globally unique ID, make it strong.
- **Drawing checklist** (SKS 6th-ed. notation as in the official slides):
  1. Double rectangle.
  2. Discriminator with a dashed underline, and do *not* list the owner's key inside it.
  3. Double diamond for the identifying relationship.
  4. Arrowhead from the double diamond to the owner (many-to-one).
  5. Double line from the weak set to the double diamond (total participation).
- **Table rules:**
  - Primary key = owner PK + discriminator.
  - The owner PK is also a foreign key, usually with ON DELETE CASCADE as in the DDL.
  - No separate table for the identifying relationship.
  - In MySQL Workbench this is a 1:N **identifying** relationship, drawn as a solid line.

### Gaps
- The printed 6th-ed. figure was not seen. I could not confirm from a free source whether it draws section with a double border. Both currently hosted official decks (6th-ed. directory and 7th ed.) say "double rectangle". Chen/E&N also use a double rectangle, so drawing one is safe in any notation.

---

## 7. Notation: SKS 6th ed. vs. Chen/E&N vs. crow's foot vs. UML, every symbol in words, with a mapping table

### Takeaway
- **SKS 6th ed.** lists attributes inside a two-part rectangle. A diamond is a relationship set. Arrowheads mean "one" and double lines mean total participation; l..h can replace both. A double diamond (with a double rectangle) marks a weak entity. Hollow arrowheads mark specialization.
- **Chen/E&N** draws attributes as ovals (double oval = multivalued, dashed oval = derived) and uses 1/N/M labels plus double lines, or (min,max).
- **Crow's foot** has no diamonds. Ring, bar and fork marks are read look-across.
- **UML** uses class boxes, and its multiplicities are written at the opposite end from E-R l..h.

### Cited Findings
- **SKS basic symbols:**
  - "Rectangles represent entity sets. Attributes listed inside entity rectangle. Underline indicates primary key attributes" — [SKS7 p.8](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - "Diamonds represent relationship sets" — [SKS7 p.11](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - In the relationship-attribute figure, "date" is written in a separate, undivided rectangle joined to the advisor diamond by a dashed line — [SKS7 p.13](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - The complex-attribute figure for instructor lists: ID (underlined); name with indented first_name, middle_initial, last_name; address with indented street (further indented street_number, street_name, apt_number), city, state, zip; { phone_number }; date_of_birth; age ( ) — [SKS7 p.19](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS "Summary of Symbols Used in E-R Notation"** (figures inspected):
  - Entity set: rectangle E.
  - Relationship set: diamond R.
  - "Identifying relationship set for weak entity set": double diamond.
  - "Total participation of entity set in relationship": double line between R and E.
  - Attributes listed inside E: simple A1; composite A2 with indented A2.1, A2.2; multivalued {A3}; derived A4().
  - Primary key: underlined A1.
  - "Discriminating attribute of weak entity set": A1 with a dashed underline.
  - [SKS7 p.70](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS "Symbols … (Cont.)"** (figures inspected):
  - Many-to-many: plain lines on both sides of R.
  - One-to-one: arrowheads on both sides.
  - Many-to-one: an arrowhead on one side only.
  - "Cardinality limits": l..h written on the line next to E.
  - "Role indicator": role-name written on the line next to E.
  - "ISA: generalization or specialization": E1 above E2 and E3, joined by hollow arrowheads pointing to E1.
  - "Total (disjoint) generalization": one merged hollow arrowhead with a dashed line to the word "total".
  - "Disjoint generalization": one merged hollow arrowhead.
  - [SKS7 p.71](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS "Alternative ER Notations"**, Chen style (figure inspected):
  - Entity set E with simple attribute A1 (oval), composite attribute A2 (oval with sub-ovals A2.1, A2.2), multivalued attribute A3 (double oval), derived attribute A4 (dashed oval), and primary key A1 (underlined).
  - Weak entity set: double rectangle.
  - Generalization: triangle labelled ISA.
  - Total generalization: ISA triangle with a double line.
  - [SKS7 p.72](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS "Chen vs. IDE1FX (Crows feet notation)"** (figure inspected at high resolution):
  - Many-to-many: Chen "*" on both edges; crow's foot has a fork at both ends.
  - One-to-one: Chen "1" and "1"; crow's foot is a plain line.
  - Many-to-one (E1 many, E2 one): Chen "*" next to E1 and "1" next to E2; crow's foot has a fork at E1's end only.
  - "Participation in R: total (E1) and partial (E2)": Chen draws a double line E1–R and a single line R–E2. Crow's foot draws ring + fork at **E1's** end and bar + fork at **E2's** end.
  - Crow's foot draws R as a labelled line with no diamond.
  - [SKS7 p.73](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS UML slides:**
  - Entity with attributes ⇔ "class with simple attributes and methods (attribute prefixes: + = public, - = private, # = protected)".
  - Binary relationship ⇔ a line with role1/role2 and R written by it.
  - Relationship attributes ⇔ a box holding R and A1 joined to the line by a dotted line.
  - "Cardinality constraints": E-R E1 0..* R 0..1 E2 ⇔ UML E1 0..1 —R— 0..* E2, with "*Note reversal of position in cardinality constraint depiction".
  - [SKS7 p.75](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - n-ary relationships use a diamond in UML too. Overlapping and disjoint generalization use hollow arrowheads with "overlapping" / "disjoint" labels, and "*Generalization can use merged or separate arrows independent of disjoint/overlapping" — [SKS7 p.76](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - "The relationship set name may alternatively be written in a box, along with attributes of the relationship set, and the box is connected, using a dotted line, to the line depicting the relationship set". Role names are written "on the line, adjacent to the entity set" — [SKS7 p.77](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - Weak entity ⇔ UML composition: a filled diamond at the owner E1's end — [SKS7 p.78](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **E&N Fig. 3.14 (summary of notation):**
  - Entity: rectangle. Weak Entity: double rectangle.
  - Relationship: diamond. Identifying Relationship: double diamond.
  - Attribute: oval. Key Attribute: oval with underlined name.
  - Multivalued Attribute: double oval. Composite Attribute: oval joined to component ovals. Derived Attribute: dashed oval.
  - "Total Participation of E2 in R": double line.
  - "Cardinality Ratio 1:N for E1:E2 in R": labels on edges.
  - "Structural Constraint (min, max) on Participation of E in R": pair next to E.
  - [EN3 slide 3-43](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **E&N text:** "Attributes are displayed in ovals… Components of a composite attribute are connected to the oval representing the composite attribute… Each key attribute is underlined… Multivalued attributes displayed in double ovals" — [EN3 slide 3-14](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **E&N UML:** classes are "large rounded boxes with three sections": the class name, the attributes, and the class operations — [EN3 slide 3-44](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **Crow's foot symbols:**
  - Ring = "zero", dash = "one", crow's foot = "many". They come in pairs: the inner mark is the minimum and the outer mark (nearest the entity) is the maximum.
  - Ring + dash = zero or one; dash + dash = exactly one; ring + crow's foot = zero or many; dash + crow's foot = one or many.
  - In crow's foot, "relationships cannot have attributes"; when needed they are "promoted to entities".
  - [Wikipedia, Entity–relationship model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)
- **MySQL Workbench:**
  - Its relationship connector's notation style "is the default, crow's foot".
  - Its toolbar offers one-to-one / one-to-many non-identifying, one-to-one / one-to-many identifying, and many-to-many identifying tools.
  - "When the many-to-many tool is active, double-clicking a table creates an associative table".
  - For one-to-many, the tool "creates a column in the table on the many side".
  - [MySQL Workbench Manual 9.1.4.1](https://dev.mysql.com/doc/workbench/en/wb-relationship-tools.html)

### Inferences

#### Master mapping table (read across a row to translate)

| Concept | SKS 6th ed. (course text) | Chen / E&N (reference text) | Crow's foot (IE; MySQL Workbench default; logical schemas) | UML class diagram |
|---|---|---|---|---|
| Entity set | Two-part rectangle: name on top, attributes listed below | Rectangle with the name; attributes are ovals on lines | Rectangle (table), columns listed inside | Class box: name / attributes / methods |
| Primary key | Underlined attribute in the list | Oval with underlined name | PK columns of the table | (not standardised in the SKS slides) |
| Relationship set | Diamond joined by lines | Diamond | A labelled line between entities (no diamond) | Association line with the name (diamond only for n-ary) |
| Relationship attribute | Plain box joined to the diamond by a dashed line | Oval attached to the diamond | Not allowed: promote to an associative entity/table | Association class: box joined by a dotted line |
| Composite attribute | Sub-attributes indented under it | Oval with component ovals | Separate columns (flattened) | (flattened) |
| Multivalued attribute | {A} | Double oval | Separate child table | (separate class/table) |
| Derived attribute | A() | Dashed oval | Not stored (compute in a query or view) | (not stored) |
| Weak entity set | Double rectangle; discriminator dashed-underlined | Double rectangle; partial key dashed-underlined | Child table whose PK contains the parent key; identifying relationship = solid line | Composition (filled diamond at the owner) |
| Identifying relationship | Double diamond (arrowhead to owner, double line from weak set) | Double diamond | Solid line (Workbench) | Composition |
| "At most one" (max 1) | Arrowhead pointing at the entity set that is "one" | "1" on the edge next to that entity (look-across) | Bar (no fork) as the outer mark at that entity's end | ..1 at that end |
| "Many" | Plain line, no arrowhead | N / M / * label | Fork (crow's foot) at that end | ..* at that end |
| Total participation of E | Double line between E and the diamond, or l ≥ 1 in l..h on E's line | Double line, or min ≥ 1 in (min,max) next to E | Bar as the inner mark at the **other** entity's end | Lower bound ≥ 1 at the **other** end |
| Partial participation of E | Single line, or l = 0 | Single line, or min = 0 | Ring at the **other** end | Lower bound 0 at the **other** end |
| Explicit numbers | l..h on E's own line (look-here) | (min,max) next to E (look-here) | Marks only (0/1/many) | l..h at the opposite end (look-across) |
| Roles | Role label on each line near the entity set | Role names on edges | (FK column names, e.g. Super_ssn) | Role names near the class |
| Specialization / generalization | Hollow arrowheads pointing to the superclass; separate = overlapping, merged = disjoint; "total" keyword with dashed line | SKS's Chen alternative: ISA triangle, double line = total. E&N EER: d / o symbol, double line = total | (no standard symbol in these sources) | Hollow-triangle arrows with "disjoint"/"overlapping" labels |
| Aggregation | Box drawn around a relationship set and its entity sets | (not in basic ER) | (an associative table) | (not covered) |

#### One relationship, five notations (WORKS_FOR from COMPANY: EMPLOYEE (1,1), DEPARTMENT (4,N))
```
SKS arrows:    [employee] ====== <works_for> ======> [department]     (double lines = both total;
                                                                       arrowhead at department = each employee ≤ 1 department)
SKS l..h:      [employee] --1..1-- <works_for> --4..*-- [department]  (each label describes the entity on its own line)
Chen ratio:    [EMPLOYEE] ==N== <WORKS_FOR> ==1== [DEPARTMENT]        (look-across: "1" next to DEPARTMENT)
E&N (min,max): [EMPLOYEE] (1,1) <WORKS_FOR> (4,N) [DEPARTMENT]        (look-here; this is E&N Fig. 3.15)
Crow's foot:   [EMPLOYEE] >|---------- works_for ----------|| [DEPARTMENT]
               (at EMPLOYEE's end: bar+fork = "one or many employees per department";
                at DEPARTMENT's end: bar+bar = "exactly one department per employee")
UML:           Employee  4..*  ---- works_for ----  1..1  Department  (opposite end to E-R l..h)
```
- Crow's foot and UML cannot show the "4". It needs a note.

#### Reading rules (memorise)
1. A pair of numbers (l..h or (min,max)) next to E describes E itself (look-here).
2. Every other mark describes the entity it touches *as seen from the partner*. This covers the 1/N label, the SKS arrowhead, the crow's-foot marks and UML multiplicity. "One department per employee" puts the "1", arrowhead, bar or "1..1" at DEPARTMENT.
3. Total participation of E shows up on E's side in SKS and Chen (double line), but at the *far* end in crow's foot and UML (minimum 1 there). This was checked against the textbook's own Chen-vs-crow's-foot figure ([SKS7 p.73](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)).

### Gaps
- No free official source fixes how crow's-foot tools show primary keys or specialization; it varies by tool.
- E&N's EER figures draw "d"/"o" inside a small circle. The publisher slide text confirms only "Specified by d" and "Specified by o" ([EN4 slides](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch04-Enhanced%20Entity-Relationship%20%28EER%29%20Modeling.pdf)). The circle itself was seen only in secondary search snippets.

---

## 8. Reduction of E-R diagrams to relational schemas (SKS rules plus E&N's 7-step algorithm)

### Takeaway
- Every **strong entity set** becomes a table. Composite attributes are flattened, multivalued attributes get their own table, and derived attributes are dropped.
- Every **weak entity set** becomes a table keyed by owner PK + discriminator.
- An **M:N** or **n-ary relationship** becomes a table keyed by the participants' keys.
- A **1:N or N:1 relationship** becomes a foreign key on the "many" side, plus the relationship's attributes. Use NOT NULL if that side is total; otherwise nulls appear.
- A **1:1 relationship** becomes a foreign key on either side, ideally the total side, declared UNIQUE.
- The **identifying relationship** of a weak entity set produces no table.

### Cited Findings
- **SKS general rule:** "For each entity set and relationship set there is a unique schema that is assigned the name of the corresponding entity set or relationship set. Each schema has a number of columns (generally corresponding to attributes), which have unique names" — [SKS7 p.41](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS entity sets:**
  - "A strong entity set reduces to a schema with the same attributes: student(ID, name, tot_cred)."
  - Weak: "section (course_id, sec_id, sem, year)."
  - [SKS7 p.42](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS composite attributes:**
  - "Composite attributes are flattened out by creating a separate attribute for each component attribute", for example name_first_name, with the "Prefix omitted if there is no ambiguity".
  - "Ignoring multivalued attributes, extended instructor schema is instructor(ID, first_name, middle_initial, last_name, street_number, street_name, apt_number, city, state, zip_code, date_of_birth)." This list has no age column, although age() appears in the diagram.
  - [SKS7 p.43](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS multivalued attributes:**
  - "A multivalued attribute M of an entity E is represented by a separate schema EM. Schema EM has attributes corresponding to the primary key of E and an attribute corresponding to multivalued attribute M", for example inst_phone = (ID, phone_number).
  - "Each value of the multivalued attribute maps to a separate tuple", so instructor 22222 with two phones yields (22222, 456-7890) and (22222, 123-4567).
  - [SKS7 p.44](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS M:N relationship sets:** "A many-to-many relationship set is represented as a schema with attributes for the primary keys of the two participating entity sets, and any descriptive attributes of the relationship set", for example advisor = (s_id, i_id) — [SKS7 p.45](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS merging:**
  - "Many-to-one and one-to-many relationship sets that are total on the many-side can be represented by adding an extra attribute to the 'many' side, containing the primary key of the 'one' side." For example, instead of an inst_dept schema, add dept_name to instructor — [SKS7 p.46](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - "For one-to-one relationship sets, either side can be chosen to act as the 'many' side." "If participation is partial on the 'many' side, replacing a schema by an extra attribute in the schema corresponding to the 'many' side could result in null values" — [SKS7 p.47](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - The schema for a weak entity set's identifying relationship "is redundant" — [SKS7 p.48](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **Redundant attributes come back after reduction:** dept_name in student is redundant in the E-R diagram, but "when converting back to tables, in some cases the attribute gets reintroduced" — [SKS7 p.38](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **What PK/FK/NOT NULL can and cannot enforce (official answers):**
  - Total participation of A after merging R into A: "The foreign-key attribute in R corresponding to the primary key of B should be made not null" — [SKS7-SOL 6.10](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
  - Total participation on an M:N relationship, or on the "one" side of 1:N, cannot be enforced with primary-key, foreign-key and not-null constraints. "SQL foreign keys can only refer to the primary key or some other unique key."
  - It would need a check constraint or assertion set to deferred, for example `check (b in (select b from A))`. These features are "not supported on any widely used database currently".
  - [SKS7-SOL 6.11](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
  - 1:1 needs UNIQUE on the second key — [SKS6-SOL 7.9](https://www.db-book.com/db6/practice-exer-dir/7s.pdf)
- **E&N ER-to-relational mapping** — [EN7 slides 7-3 to 7-12](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf):
  - **Step 1 (regular entity types):** "create a relation R that includes all the simple attributes of E. Choose one of the key attributes of E as the primary key"; a composite key's simple attributes together form the PK.
  - **Step 2 (weak entity types):** see Section 6.
  - **Step 3 (binary 1:1):** three approaches.
    - "Foreign Key approach… It is better to choose an entity type with total participation in R in the role of S." MANAGES is mapped into DEPARTMENT because DEPARTMENT's participation is total.
    - "Merged relation option… may be appropriate when both participations are total."
    - "Cross-reference or relationship relation option."
  - **Step 4 (binary 1:N):** "identify the relation S that represent the participating entity type at the N-side… Include as foreign key in S the primary key of the relation T… Include any simple attributes of the 1:N relation type as attributes of S". For WORKS_FOR, DNUMBER goes into EMPLOYEE as DNO.
  - **Step 5 (binary M:N):** "create a new relation S… Include as foreign key attributes in S the primary keys… their combination will form the primary key of S". WORKS_ON has PK {ESSN, PNO} and attribute HOURS.
  - **Step 6 (multivalued attributes):** "create a new relation R… include an attribute corresponding to A, plus the primary key attribute K-as a foreign key… The primary key of R is the combination of A and K". DEPT_LOCATIONS has PK {DNUMBER, DLOCATION}.
  - **Step 7 (n-ary):** "create a new relation S… include as foreign key attributes… the primary keys of the relations that represent the participating entity types". SUPPLY has PK {SNAME, PARTNO, PROJNAME}.
- **E&N Table 7.1 (ER → relational correspondence):** entity type → "entity" relation; 1:1 or 1:N relationship type → foreign key (or "relationship" relation); M:N → "relationship" relation and two foreign keys; n-ary → "relationship" relation and n foreign keys; simple attribute → attribute; composite → set of simple component attributes; multivalued → relation and foreign key; value set → domain; key attribute → primary (or secondary) key — [EN7 slide 7-15](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf)
- **The official university DDL shows the merges concretely** — [DDL](https://www.db-book.com/university-lab-dir/sample_tables-dir/DDL.sql):
  - instructor, student and course each carry dept_name with "foreign key (dept_name) references department (dept_name) on delete set null".
  - section carries building and room_number with a foreign key to classroom (on delete set null), and time_slot_id **with no foreign key**.
  - time_slot has primary key (time_slot_id, day, start_hr, start_min).
  - advisor(s_ID, i_ID) has primary key (s_ID), with foreign keys to instructor (on delete set null) and student (on delete cascade).
  - prereq(course_id, prereq_id) has two foreign keys to course.

### Inferences

#### Unified reduction algorithm (use for any exam question)

| E-R construct | Relational result | PK | FKs / constraints |
|---|---|---|---|
| Strong entity set E | E(all simple / flattened attributes) | E's PK | Other keys → UNIQUE |
| Composite attribute | One column per leaf component | — | — |
| Multivalued attribute M of E | New table E_M(PK(E), M) | All columns | PK(E) → E (cascade is natural) |
| Derived attribute | Omitted (compute with a query or view) | — | — |
| Weak entity set W, owner O | W(PK(O), discriminator, other attributes) | PK(O) + discriminator | PK(O) → O, ON DELETE CASCADE |
| Identifying relationship | No table (redundant) | — | — |
| M:N relationship R(A,B) + attributes | R(PK(A), PK(B), attributes) | PK(A) ∪ PK(B) | Both FKs |
| N:1 relationship from A to B (A is many) | Add PK(B) (and R's attributes) to A | unchanged | FK → B; NOT NULL if A is total |
| 1:1 relationship | Add the other's PK to one side (prefer the total side) | unchanged | FK + UNIQUE; NOT NULL if that side is total |
| n-ary relationship | R(all participants' PKs, attributes) | Union, or union minus the arrow side | FKs to all |
| Recursive relationship | Two FK columns with role names (prereq_id, Super_ssn) | per cardinality | Both reference the same table |

- **Why the DDL leaves section.time_slot_id without an FK.** time_slot came from an entity whose only non-key attribute is a multivalued composite {day, start_time, end_time}. So time_slot_id alone is not a key of the time_slot table, and an SQL FK cannot reference it (the rule quoted in SKS7-SOL 6.11). This is an inference connecting the diagram (time_slot(time_slot_id, {day, start_time, end_time}), [SKS7 p.39](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)) with the [DDL](https://www.db-book.com/university-lab-dir/sample_tables-dir/DDL.sql).
- **Why advisor stays a separate table although it is many-to-one.** In the university diagram, student's participation in advisor is partial (single line). Merging i_ID into student would create nulls for students without an advisor, which is the case SKS7 p.47 warns about. The DDL keeps advisor separate, with PK s_ID.

### Gaps
- The textbook's printed wording on derived attributes during reduction was not available. The "omit it" rule above is inferred from the slide's extended instructor schema, which drops age().
- I recall (unverified) that the original 2010 6th-ed. slides discussed a special-case optimisation for time_slot: create only the multivalued-attribute table, with the caveat that section.time_slot_id then cannot be a foreign key. The currently hosted decks do not contain that text, so the point above rests only on the DDL.

---

## 9. Design issues: entity vs. attribute, entity vs. relationship set, binary vs. n-ary, placement of relationship attributes

### Takeaway
- **Make it an entity set** when you need to store facts *about* it, or when it repeats or is shared. Example: a phone with a type, or several phones.
- **Make it a relationship set** when it is an action or association between entities.
- **Prefer binary relationships** when partial information must be recordable, as with father/mother. Keep n-ary relationships when the association is genuinely among all n at once, as with proj_guide.
- **Placement of attributes:** a 1:N relationship's attribute may move to the N side; an M:N attribute must stay on the relationship.

### Cited Findings
- **Entity vs. attribute:** "Use of phone as an entity allows extra information about phone numbers (plus multiple phone numbers)" — [SKS7 p.64](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **Entity vs. relationship set, and placement:** "Possible guideline is to designate a relationship set to describe an action that occurs between entities". On placement: "attribute date as attribute of advisor or as attribute of student" — [SKS7 p.65](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **E&N on relationship attributes:** "Most relationship attributes are used with M:N relationships. In 1:N relationships, they can be transferred to the entity type on the N-side of the relationship" — [EN3 slide 3-36](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **Binary vs. non-binary (SKS):**
  - "Although it is possible to replace any non-binary (n-ary, for n > 2) relationship set by a number of distinct binary relationship sets, a n-ary relationship set shows more clearly that several entities participate in a single relationship."
  - "A ternary relationship parents, relating a child to his/her father and mother, is best replaced by two binary relationships, father and mother. Using two binary relationships allows partial information (e.g., only mother being known). But there are some relationships that are naturally non-binary. Example: proj_guide."
  - [SKS7 p.66](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **Converting n-ary to binary (SKS):**
  - "Replace R between entity sets A, B and C by an entity set E, and three relationship sets: RA, RB, RC… Create an identifying attribute for E and add any attributes of R to E. For each relationship (ai, bi, ci) in R, create a new entity ei… add (ei, ai) to RA, (ei, bi) to RB, (ei, ci) to RC" — [SKS7 p.67](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - "Translating all constraints may not be possible. There may be instances in the translated schema that cannot correspond to any instance of R." "We can avoid creating an identifying attribute by making E a weak entity set… identified by the three relationship sets" — [SKS7 p.68](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - Official answers:
    - The instance E={e1,e2}, A={a1,a2}, RA={(e1,a1),(e2,a2)}, RB={(e1,b1)}, RC={(e1,c1)} matches no R instance.
    - Fix it with total participation of E in RA, RB and RC.
    - If A is total in R, make A total in RA.
    - Alternatively, make E weak, identified by RA, RB and RC.
    - [SKS6-SOL 7.6](https://www.db-book.com/db6/practice-exer-dir/7s.pdf)
- **E&N on n-ary relationships:**
  - "In general, an n-ary relationship is not equivalent to n binary relationships" — [EN3 slide 3-47](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
  - "3 binary relationships can represent different information than a single ternary relationship"; if needed, binary and n-ary relationships can all be included — [EN3 slide 3-48](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
  - "If a particular binary relationship can be derived from a higher-degree relationship at all times, then it is redundant", for example TAUGHT_DURING derived from OFFERS — [EN3 slide 3-50](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **SKS "E-R Design Decisions":**
  - attribute vs. entity set;
  - entity set vs. relationship set;
  - "ternary relationship versus a pair of binary relationships";
  - "strong or weak entity set";
  - specialization/generalization ("contributes to modularity");
  - aggregation ("can treat the aggregate entity set as a single unit").
  - [SKS7 p.69](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **Official design-alternative example (exam marks):**
  - (a) exams as entities with a ternary relationship;
  - an alternative where exam is a weak entity of section with binary marks;
  - (b) a binary student–section relationship with a multivalued composite attribute {exam_marks(exam_id, marks)}.
  - In (b), exam name/place/time are not relationship attributes, because "Doing so would result in duplication of the information, once per student, and we would not be able to record this information without an associated student".
  - [SKS7-SOL 6.2](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **Diagram structure (official answer):**
  - A disconnected E-R graph means parts of the enterprise are "completely independent", in effect separate databases.
  - A cycle means the entity sets on it "are related to each other in at least two distinct ways".
  - [SKS7-SOL 6.5](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)

### Inferences
- **Quick decision tests:**
  1. Does the thing have its own properties or identity? Then make it an entity set.
  2. Can it occur several times for the same pair of entities? Then it is not a plain relationship; use an entity set, a weak entity set, or a multivalued relationship attribute.
  3. Is the fact meaningful when only some of the participants are known? Then split it into binary relationships.
  4. For 1:N relationships, an attribute such as a start date can live on the N-side entity. For M:N it must stay on the relationship.

### Gaps
- None material.

---

## 10. Extended E-R features: specialization/generalization, constraints, attribute inheritance, aggregation, and how each reduces to tables

### Takeaway
- **Specialization** (top-down) and **generalization** (bottom-up) are drawn the same way in SKS: hollow arrowheads from subclass to superclass.
  - Separate arrowheads mean overlapping; one merged arrowhead means disjoint.
  - "total" is written with a dashed line to the arrowhead. Partial is the default.
  - Subclasses inherit all attributes and relationship participation.
- **Aggregation** treats a relationship set together with its participants as an abstract entity, so that it can take part in another relationship.
- **Reduction:**
  - Specialization: Method 1 is superclass table + subclass tables holding the key + local attributes. Method 2 is one table per subclass holding all inherited attributes.
  - Aggregation: a table with the aggregated relationship's key + the other entity's key + attributes.

### Cited Findings
- **SKS specialization:**
  - A "Top-down design process; we designate sub-groupings within an entity set that are distinctive from other entities in the set". The sub-groupings "become lower-level entity sets that have attributes or participate in relationships that do not apply to the higher-level entity set".
  - "Attribute inheritance – a lower-level entity set inherits all the attributes and relationship participation of the higher-level entity set to which it is linked."
  - The slide text still says it is "Depicted by a triangle component labeled ISA", but the figures in the same deck use hollow arrowheads.
  - [SKS7 p.50](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS example** (figure inspected): "Overlapping – employee and student; Disjoint – instructor and secretary; Total and partial".
  - person(ID, name, street, city) has two *separate* hollow arrowheads, one from employee(salary) and one from student(tot_credits).
  - employee has *one merged* hollow arrowhead from instructor(rank) and secretary(hours_per_week).
  - [SKS7 p.51](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS generalization:** "A bottom-up design process – combine a number of entity sets that share the same features into a higher-level entity set. Specialization and generalization are simple inversions of each other; they are represented in an E-R diagram in the same way" — [SKS7 p.54](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS completeness constraint:**
  - It "specifies whether or not an entity in the higher-level entity set must belong to at least one of the lower-level entity sets": "total: an entity must belong to one of the lower-level entity sets", "partial: an entity need not belong to one" — [SKS7 p.55](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - "Partial generalization is the default. We can specify total generalization in an ER diagram by adding the keyword total in the diagram and drawing a dashed line from the keyword to the corresponding hollow arrow-head to which it applies (for a total generalization), or to the set of hollow arrow-heads to which it applies (for an overlapping generalization)."
  - "The completeness constraint for a generalized higher-level entity set is usually total."
  - [SKS7 p.56](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **SKS reduction of specialization:**
  - **Method 1:** "Form a schema for the higher-level entity. Form a schema for each lower-level entity set, include primary key of higher-level entity set and local attributes." This gives person(ID, name, street, city), student(ID, tot_cred), employee(ID, salary). "Drawback: getting information about, an employee requires accessing two relations" — [SKS7 p.52](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf); schema table in [SKS6-PPT](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch7.ppt)
  - **Method 2:** "Form a schema for each entity set with all local and inherited attributes." This gives person(ID, name, street, city), student(ID, name, street, city, tot_cred), employee(ID, name, street, city, salary). "Drawback: name, street and city may be stored redundantly for people who are both students and employees" — [SKS7 p.53](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf); [SKS6-PPT](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch7.ppt)
- **Official answer on lattices (multiple inheritance):** "B inherits the attributes of both X and Y. If there is some attribute name which belongs to both X and Y, it may be referred to in B by the qualified name X.name or Y.name" — [SKS7-SOL 6.12](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **SKS aggregation:**
  - Motivation: record evaluations of a student by a guide on a project, alongside the ternary proj_guide — [SKS7 p.57](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - "Relationship sets eval_for and proj_guide represent overlapping information. Every eval_for relationship corresponds to a proj_guide relationship. However, some proj_guide relationships may not correspond to any eval_for relationships. So we can't discard the proj_guide relationship. Eliminate this redundancy via aggregation. Treat relationship as an abstract entity. Allows relationships between relationships" — [SKS7 p.58](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - The figure, inspected, draws a rectangle around instructor–proj_guide–student plus project. eval_for connects that rectangle to evaluation — [SKS7 p.59](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - "To represent aggregation, create a schema containing: Primary key of the aggregated relationship, The primary key of the associated entity set, Any descriptive attributes… eval_for (s_ID, project_id, i_ID, evaluation_id). The schema proj_guide is redundant" — [SKS7 p.60](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **E&N EER constraints** — [EN4 slides, "Constraints on Specialization and Generalization (4)–(6)"](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch04-Enhanced%20Entity-Relationship%20%28EER%29%20Modeling.pdf):
  - Disjointness: "an entity can be a member of at most one of the subclasses… Specified by d in EER diagram". "If not disjoint, specialization is overlapping… Specified by o".
  - Completeness: "Total specifies that every entity in the superclass must be a member of some subclass… Shown in EER diagrams by a double line". "Partial… Shown… by a single line".
  - That gives four types: disjoint/total, disjoint/partial, overlapping/total, overlapping/partial.
  - "Generalization usually is total because the superclass is derived from the subclasses."
- **E&N mapping Step 8 options** — [EN7 slides 7-16, 7-17, 7-22](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf):
  - **8A** (superclass + subclass relations). This "works for any specialization (total or partial, disjoint of over-lapping)".
  - **8B** (subclass relations only). This "only works for a specialization whose subclasses are total".
  - **8C** (single relation with one type attribute t, "called a type (or discriminating) attribute").
  - **8D** (single relation with Boolean type attributes t1…tm).
- **E&N categories:** E&N also defines categories (UNION types) for a subclass of a *union* of superclasses with different keys. They are mapped using a surrogate key, for example OwnerId — [EN7 slide 7-30](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf)

### Inferences
- **Method choice:**
  - SKS Method 1 (E&N 8A) is always safe. It is required when other tables must reference the superclass.
  - SKS Method 2 (E&N 8B) suits disjoint + total specializations. Overlapping data gets duplicated, and partial data loses superclass-only entities unless a superclass table is kept.
  - E&N 8C/8D (one wide table) trades nulls for fewer joins.
- **Caution on "proj_guide is redundant".** The same deck says "some proj_guide relationships may not correspond to any eval_for relationships, so we can't discard the proj_guide relationship" ([SKS7 p.58](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)). The proj_guide table is only redundant if every guide assignment has an evaluation. On an exam, say so.
- **Translating specialization notation:**
  - SKS draws hollow arrowheads (merged = disjoint, plus "total" label).
  - SKS's Chen alternative draws an ISA triangle (double line = total).
  - E&N EER uses d/o (double line = total).
  - UML uses hollow-triangle arrows with "disjoint"/"overlapping" labels.

### Gaps
- Aggregation and specialization are not on the coordinator's list of class-emphasis topics. They are covered here from the official deck for completeness.

---

## 11. Fully worked case studies: requirements → E-R diagram (in words) → relational schemas with PK/FK

### Takeaway
The Elmasri & Navathe **COMPANY** database is the class's practice target. Below it is worked from E&N's own requirements, diagrams and mapping, sentence by sentence. It is followed by the Silberschatz **University** schema (official diagram + DDL) and a **Clinic** design I constructed to exercise every feature.

### Cited Findings

#### COMPANY (E&N): the official material
- **Requirements, as worded on the publisher slides** (numbering added by me):
  - **R1.** "The company is organized into DEPARTMENTs. Each department has a name, number and an employee who manages the department. We keep track of the start date of the department manager. A department may have several locations."
  - **R2.** "Each department controls a number of PROJECTs. Each project has a unique name, unique number and is located at a single location."
  - [EN3 slide 3-6](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
  - **R3.** "We store each EMPLOYEE's social security number, address, salary, sex, and birthdate."
  - **R4.** "Each employee works for one department but may work on several projects."
  - **R5.** "We keep track of the number of hours per week that an employee currently works on each project."
  - **R6.** "We also keep track of the direct supervisor of each employee."
  - **R7.** "Each employee may have a number of DEPENDENTs. For each dependent, we keep track of their name, sex, birthdate, and relationship to the employee."
  - [EN3 slide 3-7](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **Entity types and relationship types identified by E&N:**
  - Four entity types: DEPARTMENT, PROJECT, EMPLOYEE, DEPENDENT — [EN3 slide 3-17](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
  - Six binary relationship types: "WORKS_FOR (between EMPLOYEE, DEPARTMENT); MANAGES (also between EMPLOYEE, DEPARTMENT); CONTROLS (between DEPARTMENT, PROJECT); WORKS_ON (between EMPLOYEE, PROJECT); SUPERVISION (between EMPLOYEE (as subordinate), EMPLOYEE (as supervisor)); DEPENDENTS_OF (between EMPLOYEE, DEPENDENT)" — [EN3 slide 3-25](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **E&N Fig. 3.2 in words** (figure inspected; Chen/E&N notation) — [EN3 slide 3-26](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf):
  - **EMPLOYEE** (rectangle) has ovals for Ssn (underlined), composite Name (Fname, Minit, Lname), Bdate, Address, Salary, Sex.
  - **DEPARTMENT** has Name (underlined) and Number (underlined), so it has two keys. It also has Locations (double oval, multivalued) and Number_of_employees (dashed oval, derived).
  - **PROJECT** has Name (underlined), Number (underlined) and Location.
  - **DEPENDENT** is a double rectangle with Name (dashed underline, the partial key), Sex, Birth_date, Relationship.
  - **WORKS_FOR:** N on EMPLOYEE's edge, 1 on DEPARTMENT's edge; double lines on both edges.
  - **MANAGES:** 1 and 1. DEPARTMENT's edge is a double line; EMPLOYEE's is single. Attribute Start_date.
  - **CONTROLS:** 1 on DEPARTMENT's edge, N on PROJECT's edge. PROJECT's edge is a double line.
  - **WORKS_ON:** M on EMPLOYEE's edge, N on PROJECT's edge; double lines on both. Attribute Hours.
  - **SUPERVISION** (recursive): role "Supervisor" labelled 1, role "Supervisee" labelled N; both single lines.
  - **DEPENDENTS_OF:** double diamond, 1 on EMPLOYEE's edge, N on DEPENDENT's edge; DEPENDENT's edge is a double line.
- **E&N Fig. 3.15** (the same schema with (min,max) and role names; figure inspected) — [EN3 slide 3-41](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf):
  - WORKS_FOR: EMPLOYEE (1,1) "Employee"; DEPARTMENT (4,N) "Department".
  - MANAGES: EMPLOYEE (0,1) "Manager"; DEPARTMENT (1,1) "Department Managed".
  - CONTROLS: DEPARTMENT (0,N) "Controlling Department"; PROJECT (1,1) "Controlled Project".
  - WORKS_ON: EMPLOYEE (1,N) "Worker"; PROJECT (1,N) "Project".
  - SUPERVISION: (0,N) "Supervisor"; (0,1) "Supervisee".
  - DEPENDENTS_OF: EMPLOYEE (0,N) "Employee"; DEPENDENT (1,1) "Dependent".
- **E&N Fig. 7.2, the mapped schema** (figure inspected; underlined = PK) — [EN7 slides 7-4 to 7-11 and 7-6](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf):
  - EMPLOYEE(Fname, Minit, Lname, **Ssn**, Bdate, Address, Sex, Salary, Super_ssn, Dno)
  - DEPARTMENT(Dname, **Dnumber**, Mgr_ssn, Mgr_start_date)
  - DEPT_LOCATIONS(**Dnumber, Dlocation**)
  - PROJECT(Pname, **Pnumber**, Plocation, Dnum)
  - WORKS_ON(**Essn, Pno**, Hours)
  - DEPENDENT(**Essn, Dependent_name**, Sex, Bdate, Relationship)
  - Foreign-key arrows run from Super_ssn, Mgr_ssn, WORKS_ON.Essn and DEPENDENT.Essn to EMPLOYEE.Ssn; from Dno, DEPT_LOCATIONS.Dnumber and Dnum to DEPARTMENT.Dnumber; and from Pno to PROJECT.Pnumber.
  - The slide text confirms "SSN, DNUMBER, and PNUMBER are the primary keys for the relations EMPLOYEE, DEPARTMENT, and PROJECT".
- **Rendering conventions for relational schema diagrams (E&N):**
  - "The primary key attribute (or attributes) will be underlined. A foreign key (referential integrity) constraint is displayed as a directed arc (arrow) from the foreign key attributes to the referenced table" — [EN5 slide 5-32](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch05-The%20Relational%20Data%20Model%20and%20Relational%20Database%20Constraints.pdf)
  - E&N's relational COMPANY schema has 6 relation schemas — [EN5 slide 5-26](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch05-The%20Relational%20Data%20Model%20and%20Relational%20Database%20Constraints.pdf)

#### University (SKS): the official material
- **The official E-R diagram in words** (figure inspected at high resolution) — [SKS7 p.39](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf). It is the same diagram as the 6th-ed. "E-R Diagram for a University Enterprise" — [SKS6-PPT](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch7.ppt).
  - **Entity sets:**
    - department(**dept_name**, building, budget)
    - instructor(**ID**, name, salary)
    - student(**ID**, name, tot_cred)
    - course(**course_id**, title, credits)
    - section, a double rectangle with dashed-underlined sec_id, semester, year
    - time_slot(**time_slot_id**, { day, start_time, end_time }), a multivalued composite attribute
    - classroom(**building, room_number**, capacity)
  - **Relationship sets:**
    - course_dept: double line from course, arrowhead to department.
    - inst_dept: double line from instructor, arrowhead to department.
    - stud_dept: double line from student, arrowhead to department.
    - advisor: single line from student, arrowhead to instructor.
    - teaches: single line from instructor, double line from section, no arrowheads.
    - takes: single lines, no arrowheads, attribute grade in a box joined by a dashed line.
    - sec_course: double diamond, double line from section, arrowhead to course.
    - sec_time_slot: double line from section, arrowhead to time_slot.
    - sec_class: double line from section, arrowhead to classroom.
    - prereq: two lines from course labelled with roles course_id and prereq_id, no arrowheads.
- **The official schema (from the DDL)** — [DDL](https://www.db-book.com/university-lab-dir/sample_tables-dir/DDL.sql):
  - classroom(**building, room_number**, capacity)
  - department(**dept_name**, building, budget)
  - course(**course_id**, title, dept_name→department, credits)
  - instructor(**ID**, name, dept_name→department, salary)
  - section(**course_id→course, sec_id, semester, year**, building, room_number → classroom, time_slot_id)
  - teaches(**ID→instructor, course_id, sec_id, semester, year → section**)
  - student(**ID**, name, dept_name→department, tot_cred)
  - takes(**ID→student, course_id, sec_id, semester, year → section**, grade)
  - advisor(**s_ID→student**, i_ID→instructor)
  - time_slot(**time_slot_id, day, start_hr, start_min**, end_hr, end_min)
  - prereq(**course_id→course, prereq_id→course**)

### Inferences

#### Case A: COMPANY, worked sentence by sentence (built from the cited E&N material)

**Step 1: constraint analysis table.** The (min,max) values are E&N's Fig. 3.15 values. The ratio and participation follow from them using the Section 4 rule.

| Sentence | Element | Ratio (Chen labels) | Participation | (min,max) | SKS drawing |
|---|---|---|---|---|---|
| R1 "an employee who manages the department" + "start date" | MANAGES(EMPLOYEE, DEPARTMENT), attribute Start_date | 1:1 ("1" on each edge) | DEPARTMENT total; EMPLOYEE partial | EMPLOYEE (0,1); DEPARTMENT (1,1) | Arrowheads at both employee and department; double line department–manages; Start_date in a dashed-linked box |
| R1 "A department may have several locations" | DEPARTMENT.{Locations} | — | — | — | {locations} inside department |
| R2 "Each department controls a number of PROJECTs" | CONTROLS(DEPARTMENT, PROJECT) | 1:N (1 at DEPARTMENT, N at PROJECT) | PROJECT total; DEPARTMENT partial | DEPARTMENT (0,N); PROJECT (1,1) | Arrowhead at department; double line project–controls |
| R2 "unique name, unique number, single location" | PROJECT(Name, Number, Location) | — | — | — | Two keys: pick Number as PK; Name becomes UNIQUE at mapping |
| R3 + Fig. 3.2 | EMPLOYEE(Ssn, Name(Fname, Minit, Lname), Address, Salary, Sex, Bdate) | — | — | — | Name with indented components |
| R4 "works for one department" | WORKS_FOR(EMPLOYEE, DEPARTMENT) | N:1 (N at EMPLOYEE, 1 at DEPARTMENT) | Both total in Fig. 3.2 | EMPLOYEE (1,1); DEPARTMENT (4,N) | Arrowhead at department; double lines on both sides; or 1..1 / 4..* |
| R4 + R5 "may work on several projects", "hours per week … on each project" | WORKS_ON(EMPLOYEE, PROJECT), attribute Hours | M:N | Both total in Fig. 3.2 | EMPLOYEE (1,N); PROJECT (1,N) | No arrowheads; double lines; hours in a dashed-linked box |
| R6 "direct supervisor of each employee" | SUPERVISION (recursive) with roles supervisor, supervisee | 1:N (1 at supervisor role, N at supervisee role) | Both partial | supervisor (0,N); supervisee (0,1) | Two lines from employee, role-labelled; arrowhead on the supervisor line |
| R7 dependents with name, sex, birthdate, relationship | DEPENDENT weak, partial key Name; DEPENDENTS_OF identifying | 1:N (1 at EMPLOYEE, N at DEPENDENT) | DEPENDENT total | EMPLOYEE (0,N); DEPENDENT (1,1) | Double rectangle; dashed-underlined name; double diamond with arrowhead to employee; double line from dependent |
| (Fig. 3.2) | DEPARTMENT.Number_of_employees | — | — | — | Derived: number_of_employees() |

Things worth noticing:
- The slide text of R4 says only "may work on several projects", which on its own suggests min 0. E&N's figures choose (1,N), that is, total participation. If an exam sentence says "may", answer partial and state your assumption.
- The "4" in DEPARTMENT (4,N) is a mini-world fact added in Fig. 3.15. It is not in the requirement text.

**Step 2: the diagram in SKS 6th-ed. notation (in words).**
- **Entity rectangles:**
  - employee: ssn underlined; name with indented fname, minit, lname; bdate; address; salary; sex.
  - department: dnumber underlined; dname; {locations}; number_of_employees(). Mark dname as a second key in a note, because SKS underlines only the primary key.
  - project: pnumber underlined; pname; plocation.
  - dependent: a double rectangle with dependent_name dashed-underlined, sex, bdate, relationship.
- **Diamonds:**
  - works_for: double lines to employee and to department, with an arrowhead into department.
  - manages: an arrowhead into employee and an arrowhead into department, a double line on the department side, and a box "start_date" joined by a dashed line.
  - controls: an arrowhead into department and a double line from project.
  - works_on: double lines to both, no arrowheads, and a box "hours" with a dashed line.
  - supervision: two lines from employee labelled "supervisor" (with an arrowhead) and "supervisee".
  - dependents_of: a double diamond with an arrowhead into employee and a double line from dependent.

**Step 3: mapping, following E&N's steps** (result = Fig. 7.2):
1. **Step 1 (strong entity types):**
   - EMPLOYEE(Fname, Minit, Lname, Ssn, Bdate, Address, Sex, Salary): composite Name flattened.
   - DEPARTMENT(Dname, Dnumber).
   - PROJECT(Pname, Pnumber, Plocation).
   - Number_of_employees is not stored.
2. **Step 2 (weak):** DEPENDENT(Essn, Dependent_name, Sex, Bdate, Relationship), PK (Essn, Dependent_name), FK Essn → EMPLOYEE.
3. **Step 3 (1:1 MANAGES):** use the FK approach on the total side. DEPARTMENT gets Mgr_ssn (FK → EMPLOYEE) and Mgr_start_date.
4. **Step 4 (1:N):**
   - WORKS_FOR → EMPLOYEE.Dno (FK → DEPARTMENT).
   - CONTROLS → PROJECT.Dnum (FK → DEPARTMENT).
   - SUPERVISION → EMPLOYEE.Super_ssn (FK → EMPLOYEE). Role names become column names.
5. **Step 5 (M:N):** WORKS_ON(Essn, Pno, Hours), PK (Essn, Pno).
6. **Step 6 (multivalued):** DEPT_LOCATIONS(Dnumber, Dlocation), PK both.
7. **Step 7 (n-ary):** none.

The result is 6 tables. Five relationship types (WORKS_FOR, MANAGES, CONTROLS, SUPERVISION, DEPENDENTS_OF) became columns; only WORKS_ON became a table.

**Step 4: the logical schema as a crow's-foot diagram** (what MySQL Workbench would draw). Marks are read look-across, per Section 7.

| Link | Mark at the "parent" end | Mark at the "child" end | Line style |
|---|---|---|---|
| DEPARTMENT – EMPLOYEE (via Dno) | Bar-bar at DEPARTMENT: each employee has exactly one department | Bar + fork at EMPLOYEE: one or many employees per department | Dashed (non-identifying) |
| EMPLOYEE – DEPARTMENT (via Mgr_ssn) | Bar-bar at EMPLOYEE: each department has exactly one manager | Ring + bar at DEPARTMENT: an employee manages zero or one department | Dashed |
| DEPARTMENT – PROJECT (via Dnum) | Bar-bar at DEPARTMENT | Ring + fork at PROJECT | Dashed |
| EMPLOYEE – EMPLOYEE (via Super_ssn) | Ring + bar at the supervisor end | Ring + fork at the supervisee end | Dashed |
| EMPLOYEE – WORKS_ON – PROJECT | Bar-bar at EMPLOYEE and at PROJECT | Bar + fork at WORKS_ON from each side (each participant (1,N)) | Solid (identifying: Essn and Pno are in WORKS_ON's PK) |
| EMPLOYEE – DEPENDENT | Bar-bar at EMPLOYEE | Ring + fork at DEPENDENT | Solid (identifying) |
| DEPARTMENT – DEPT_LOCATIONS | Bar-bar at DEPARTMENT | Ring + fork at DEPT_LOCATIONS (no minimum stated) | Solid (identifying) |

**Step 5: illustrative MySQL DDL** (my construction; types are illustrative). Comments show which E-R constraint each clause enforces.
```sql
CREATE TABLE DEPARTMENT (
  Dnumber        INT          PRIMARY KEY,
  Dname          VARCHAR(25)  NOT NULL UNIQUE,      -- second key of DEPARTMENT (Name was also underlined)
  Mgr_ssn        CHAR(9)      NOT NULL UNIQUE,      -- MANAGES: 1:1 (UNIQUE) and DEPARTMENT total (NOT NULL)
  Mgr_start_date DATE                               -- attribute of MANAGES moves with the FK
);
CREATE TABLE EMPLOYEE (
  Ssn       CHAR(9)      PRIMARY KEY,
  Fname     VARCHAR(15)  NOT NULL,
  Minit     CHAR(1),
  Lname     VARCHAR(15)  NOT NULL,
  Bdate     DATE,
  Address   VARCHAR(60),
  Sex       CHAR(1),
  Salary    DECIMAL(10,2),
  Super_ssn CHAR(9)      NULL,                      -- SUPERVISION: supervisee (0,1) -> nullable
  Dno       INT          NOT NULL,                  -- WORKS_FOR: EMPLOYEE (1,1) -> NOT NULL
  FOREIGN KEY (Super_ssn) REFERENCES EMPLOYEE(Ssn),
  FOREIGN KEY (Dno)       REFERENCES DEPARTMENT(Dnumber)
);
ALTER TABLE DEPARTMENT ADD FOREIGN KEY (Mgr_ssn) REFERENCES EMPLOYEE(Ssn);  -- circular reference added afterwards
CREATE TABLE DEPT_LOCATIONS (
  Dnumber   INT,
  Dlocation VARCHAR(25),
  PRIMARY KEY (Dnumber, Dlocation),
  FOREIGN KEY (Dnumber) REFERENCES DEPARTMENT(Dnumber) ON DELETE CASCADE
);
CREATE TABLE PROJECT (
  Pnumber   INT          PRIMARY KEY,
  Pname     VARCHAR(25)  NOT NULL UNIQUE,           -- second key of PROJECT
  Plocation VARCHAR(25),
  Dnum      INT          NOT NULL,                  -- CONTROLS: PROJECT (1,1)
  FOREIGN KEY (Dnum) REFERENCES DEPARTMENT(Dnumber)
);
CREATE TABLE WORKS_ON (
  Essn  CHAR(9),
  Pno   INT,
  Hours DECIMAL(4,1),
  PRIMARY KEY (Essn, Pno),                          -- M:N: union of keys; Hours is NOT in the key
  FOREIGN KEY (Essn) REFERENCES EMPLOYEE(Ssn),
  FOREIGN KEY (Pno)  REFERENCES PROJECT(Pnumber)
);
CREATE TABLE DEPENDENT (
  Essn           CHAR(9),
  Dependent_name VARCHAR(15),
  Sex            CHAR(1),
  Bdate          DATE,
  Relationship   VARCHAR(10),
  PRIMARY KEY (Essn, Dependent_name),               -- owner key + partial key
  FOREIGN KEY (Essn) REFERENCES EMPLOYEE(Ssn) ON DELETE CASCADE
);
```
- **Not enforced by these tables** (consistent with SKS7-SOL 6.11):
  - DEPARTMENT (4,N) in WORKS_FOR.
  - EMPLOYEE (1,N) and PROJECT (1,N) in WORKS_ON.
  - Those are minimums on the "one" side or on an M:N relationship.
- **Insert-order problem.** The two NOT NULL foreign keys EMPLOYEE.Dno and DEPARTMENT.Mgr_ssn form a cycle, so the first department and its manager cannot be inserted one at a time. In practice, one of the two is created nullable or filled in a second step.

#### Case B: University (SKS), what to learn from the official diagram and DDL
- **Each kind of relationship maps differently:**
  - The three *_dept relationships (many-to-one, drawn total) became a dept_name foreign key on the many side.
  - sec_course (identifying) disappeared into section's primary key.
  - sec_class and sec_time_slot became columns of section.
  - teaches and takes (M:N) became tables keyed by student/instructor ID + the section key; grade is outside the key.
  - prereq (recursive M:N with roles) became a table with two FKs to course.
  - advisor became a separate table keyed by s_ID.
- **The DDL does not enforce the drawn total participations of instructor, student and course in *_dept.** dept_name is nullable with "on delete set null" ([DDL](https://www.db-book.com/university-lab-dir/sample_tables-dir/DDL.sql)). This is a real-world compromise. On an exam, write NOT NULL if the diagram says total.

#### Case C: Clinic (constructed by me to exercise every feature; requirements are invented)
**Requirements:**
- **H1.** The clinic has departments, each with a unique code, a name and a floor.
- **H2.** Each staff member has a unique staff ID, a name (first, last), a hire date and one or more phone numbers.
- **H3.** Every staff member is either a doctor or a nurse, never both. Doctors have a specialty; nurses have a certification level.
- **H4.** Each doctor works in exactly one department; every department has at least one doctor.
- **H5.** Each department is headed by exactly one doctor; a doctor heads at most one department.
- **H6.** Patients have a unique patient ID, a name, a date of birth and an address (street, city); the system must show each patient's age.
- **H7.** A patient may have one primary-care doctor; a doctor can be primary doctor for any number of patients.
- **H8.** Wards have a unique ward number and a name; beds are numbered 1, 2, 3 … separately within each ward.
- **H9.** A patient can be admitted many times, even to the same bed again. Each admission records admission date, discharge date (unknown until discharge) and the bed used.
- **H10.** A doctor treats a patient for a medical condition; for a given patient and condition there is exactly one treating doctor; record the treatment start date.
- **H11.** Nurses are assigned to wards (a nurse may work in several wards; a ward has several nurses); record since when.

**Analysis:**

| Sentence | Construct | Constraints |
|---|---|---|
| H1, H6, H8 | Strong entity sets: department(dept_code), patient(patient_id, name, date_of_birth, address(street, city), age()), ward(ward_no, name) | — |
| H2 | staff(staff_id, name(first_name, last_name), hire_date, {phone}) | Multivalued phone |
| H3 | Specialization staff → doctor(specialty), nurse(cert_level) | Disjoint (one merged hollow arrowhead), total ("total" keyword) |
| H4 | works_in(doctor, department) | N:1; doctor (1,1), department (1,N); both total |
| H5 | heads(doctor, department) | 1:1; doctor (0,1), department (1,1) |
| H7 | primary_doctor(patient, doctor) | N:1; patient (0,1), doctor (0,N) |
| H8 | bed is weak (discriminator bed_no); identifying ward_bed | bed (1,1), ward (0,N) |
| H9 | admission as an **entity set** (adm_id, admit_date, discharge_date), with adm_patient and adm_bed | Repeated patient–bed pairs make a plain relationship impossible (Section 5). Admission (1,1) in both relationships |
| H10 | Ternary treats(doctor, patient, med_condition), attribute start_date | One arrow, to doctor: each (patient, condition) pair has at most one doctor |
| H11 | assigned_to(nurse, ward), attribute since | M:N |

**Diagram in SKS notation (in words):**
- Rectangles:
  - staff, with an indented name, {phone}, hire_date.
  - doctor (specialty) and nurse (cert_level), whose lines merge into one hollow arrowhead into staff, with a dashed line to the word "total".
  - department.
  - patient, with indented address and age().
  - ward.
  - bed, a double rectangle with bed_no dashed-underlined.
  - admission.
  - med_condition.
- Diamonds:
  - works_in: double lines both sides, arrowhead to department.
  - heads: arrowheads to both doctor and department, double line on the department side.
  - primary_doctor: arrowhead to doctor.
  - ward_bed: double diamond, arrowhead to ward, double line from bed.
  - adm_patient: arrowhead to patient, double line from admission.
  - adm_bed: arrowhead to bed, double line from admission.
  - treats: three lines, a single arrowhead to doctor, start_date in a dashed-linked box.
  - assigned_to: no arrowheads, a since box.

**Relational schema** (PK in bold; → = FK):
- department(**dept_code**, name, floor, head_id → doctor.staff_id NOT NULL UNIQUE). heads is merged into the total side, as in E&N Step 3.
- staff(**staff_id**, first_name, last_name, hire_date)
- staff_phone(**staff_id → staff, phone**)
- doctor(**staff_id → staff**, specialty, dept_code → department NOT NULL). This is SKS Method 1; works_in is merged.
- nurse(**staff_id → staff**, cert_level)
- patient(**patient_id**, name, date_of_birth, street, city, primary_doctor_id → doctor NULL). age is not stored; primary_doctor is merged as nullable because the participation is partial.
- ward(**ward_no**, name)
- bed(**ward_no → ward, bed_no**). ON DELETE CASCADE; no table for ward_bed.
- admission(**adm_id**, patient_id → patient NOT NULL, (ward_no, bed_no) → bed NOT NULL, admit_date, discharge_date NULL)
- med_condition(**condition_code**, description)
- treats(**patient_id → patient, condition_code → med_condition**, doctor_id → doctor NOT NULL, start_date). The PK excludes the arrow side.
- assigned_to(**nurse_id → nurse, ward_no → ward**, since)

**Not enforceable with PK/FK/NOT NULL/UNIQUE alone:**
- "Every department has at least one doctor" (a minimum on the "one" side).
- "Every staff row is a doctor or a nurse but not both" (total + disjoint).
- **Alternative design:** admission could be a weak entity of patient with discriminator admit_date, if a patient can never be admitted twice on the same date.

### Gaps
- In E&N's mapped schema figure, PROJECT appears to show Plocation underlined as well as Pnumber, possibly a rendering artefact. The slide text names only PNUMBER as PROJECT's primary key, which is what is used above.

---

## 12. Common mistakes and exam traps

### Takeaway
Most lost marks come from:
- putting foreign-key attributes into E-R rectangles;
- using relationship attributes for repeating facts;
- reading l..h or (min,max) look-across;
- drawing two arrows on a ternary;
- weak-entity key and table errors;
- forgetting UNIQUE or NOT NULL when merging 1:1 and total relationships.

### Cited Findings
- **Official "Common Mistakes in E-R Diagrams"** (figures inspected) — [SKS7 pp.62–63](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf):
  - **(a) "Incorrect use of attribute":** student lists dept_name inside its rectangle while also being linked to department through stud_dept.
  - **(b) "Erroneous use of relationship attributes":** stud_section carries attributes assignment and marks, which allows only one assignment per student–section pair.
  - **(c) "Correct alternative":** assignment becomes a weak entity set, a double rectangle identified by section through sec_assign (double diamond). A marks_in relationship with attribute marks links student and assignment.
  - **(d) "Correct alternative":** stud_section gets a multivalued composite attribute {assignment_marks: assignment, marks}.
- **Redundant attributes:** the dept_name attribute "replicates information present in the relationship and is therefore redundant and needs to be removed" — [SKS7 p.38](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **Repeated entity occurrences:** drawing the same entity set several times with attributes risks "different sets of attributes, leading to an inconsistent diagram". Specify attributes once and omit them elsewhere — [SKS7-SOL 6.4](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **More than one arrow on n-ary:** "To avoid confusion we outlaw more than one arrow" — [SKS7 p.29](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **UML vs. E-R placement:** "Note reversal of position in cardinality constraint depiction" — [SKS7 p.75](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **(min,max) direction:** "Read the min,max numbers next to the entity type and looking away from the entity type" — [EN3 slide 3-40](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
- **Weak → strong redundancy:** see the official answer quoted in Section 6 — [SKS7-SOL 6.7](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **A typo in the official 6th-ed. solution:** SKS6-SOL 7.8 says the primary key of section is "(course id, semester, year)". The 7th-ed. solution and the slides give (course_id, sec_id, semester, year). [SKS6-SOL 7.8](https://www.db-book.com/db6/practice-exer-dir/7s.pdf) vs. [SKS7-SOL 6.8](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf) and [SKS7 p.37](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
- **FK nulls vs. keys:** a null FK "should not be a part of its own primary key" — [EN5 slide 5-31](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch05-The%20Relational%20Data%20Model%20and%20Relational%20Database%20Constraints.pdf)

### Inferences
**Trap list** (derived from the rules above):
1. Writing dept_name or an owner's key inside an E-R rectangle. In E-R, the relationship carries that information; it becomes an FK column only after reduction.
2. Reading "0..*" on instructor's line as "many instructors". It means each *instructor* takes part 0..* times; the relationship is one-to-many from instructor to student ([SKS7 p.28](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)).
3. Confusing the arrowhead (maximum = one) with the double line (minimum = one). They are independent marks.
4. Putting Chen "1/N" labels on the wrong side. "N" sits next to EMPLOYEE in WORKS_FOR because many employees share one department.
5. Two arrows on a ternary relationship.
6. Weak entity mistakes:
   - giving the weak set its own underlined key;
   - leaving out the double line;
   - pointing the arrowhead at the weak set instead of the owner;
   - creating a separate table for the identifying relationship;
   - forgetting the owner key in the weak set's table.
7. Including descriptive attributes (grade, hours) in the primary key of a relationship table.
8. Putting the 1:N foreign key on the "one" side. It always goes on the "many" side.
9. 1:1 merged without UNIQUE. A total side merged without NOT NULL.
10. Storing a multivalued attribute as a comma-separated column instead of a separate table.
11. Storing derived attributes such as age or Number_of_employees as columns.
12. Using a relationship for repeatable events (loans, visits, admissions, exam attempts) between the same pair.
13. Splitting a genuinely ternary fact into three binaries (information can be lost), or forcing a ternary when the parts are independent (father/mother).
14. In crow's foot, putting the total-participation bar on the entity's own end. It goes at the far end.
15. In crow's foot, giving a relationship line attributes. Make an associative table instead.
16. Claiming that PK/FK/NOT NULL can enforce "every department has at least one employee".

### Gaps
- None.

---

## 13. Practice questions with answers

### Takeaway
Practise three skills until they are automatic:
1. Translating a sentence into (min,max), arrows, double lines and crow's foot.
2. Turning a diagram into tables with PK/FK.
3. Spotting the five classic mistakes.

The official exercises below come with the authors' answers. The constructed questions (Q1–Q22) are answered by applying the cited rules.

### Cited Findings (official practice exercises, SKS 6th ed. Ch. 7 = 7th ed. Ch. 6; answers from the official solutions)
- **Ex 7.1 / 6.1 (car insurance).** Question: customers own one or more cars; each car has zero or more recorded accidents; each policy covers one or more cars and has one or more premium payments, each for a period with a due date and a received date.
  - **Answer:** customer(customer_id, name, address) —owns— car(license_no, model), with 1..* on customer's line and 1..1 on car's line. policy(policy_id) —covers— car. accident(report_id, date, place) —participated— car. Premium payments are a weak entity premium_payment(payment_no, due_date, amount, received_on) of policy, because "Payments are modeled as weak entities since they are related to a specific policy".
  - Accident's participation in participated is not total, because "there is an accident report where the participating car is unknown".
  - [SKS7-SOL 6.1](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf); [SKS6-SOL 7.1](https://www.db-book.com/db6/practice-exer-dir/7s.pdf)
- **Ex 7.2 / 6.2 (marks per exam).** Answer:
  - (a) A ternary exam_marks among student, section and exam(exam_id, name, place, time), with attribute marks. Alternatively, exam can be a weak entity of section with a binary student–exam marks relationship.
  - (b) A binary student–section relationship with {exam_marks(exam_id, marks)}.
  - [SKS7-SOL 6.2](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **Ex 7.3 / 6.3 (sports team).** match(match_id, date, stadium, opponent, own_score, opp_score) —played (attribute score)— player(player_id, name, age, season_score()). "The derived attribute season score is computed by summing the score values associated with the player entity set via the played relationship set" — [SKS7-SOL 6.3](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **Ex 7.4 / 6.4 (entity drawn many times).** It leads to an inconsistent diagram; give attributes once — [SKS7-SOL 6.4](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **Ex 7.5 / 6.5 (graph disconnected / cyclic).** Independent parts of the enterprise; entity sets related in two distinct ways — [SKS7-SOL 6.5](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **Ex 7.6 / 6.6 (ternary → binary).** Counter-example instance; total participation of E in RA, RB, RC; propagate total participation; E as a weak entity — [SKS6-SOL 7.6](https://www.db-book.com/db6/practice-exer-dir/7s.pdf)
- **Ex 7.7 / 6.7 (weak made strong).** Redundancy between the copied key and the relationship — [SKS7-SOL 6.7](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **Ex 7.8 / 6.8 (keys enforce many-to-one?).** Yes for many-to-one; no for total participation — [SKS7-SOL 6.8](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **Ex 7.9 / 6.9 (one-to-one advisor).** s_ID PK plus i_ID UNIQUE — [SKS7-SOL 6.9](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **Ex 7.10 / 6.10 (total participation after merge).** Make the FK NOT NULL — [SKS7-SOL 6.10](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **Ex 7.11 / 6.11 (M:N or one-side total participation).** Not enforceable with keys or not-null. It needs a deferred check or assertion, which is not widely supported — [SKS7-SOL 6.11](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **Ex 7.12 / 6.12 (lattice).** Inheritance from both superclasses; qualified names — [SKS7-SOL 6.12](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)
- **Ex 7.13 / 6.13 (temporal data).** Multivalued composite valid-time attributes. The answer produces tables such as student_name(student_id, value, start_time, end_time) and advisor(student_id, instructor_id, start_time, end_time) — [SKS7-SOL 6.13](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf)

### Inferences (constructed questions; each answer applies the rules cited in Sections 2–12)

**Q1 (sentence → constraints).** "Each employee must work for at most one department. A department may have any number of employees, including none." Give the ratio, participation, (min,max), the SKS drawing, crow's foot and UML.
- Ratio: N:1 (EMPLOYEE:DEPARTMENT). Chen puts "N" next to EMPLOYEE and "1" next to DEPARTMENT.
- Participation: EMPLOYEE total ("must"); DEPARTMENT partial.
- (min,max): EMPLOYEE (1,1); DEPARTMENT (0,N).
- SKS: arrowhead into department, double line employee–works_for. Or l..h: 1..1 on employee's line, 0..* on department's line.
- Crow's foot: bar-bar at DEPARTMENT's end; ring + fork at EMPLOYEE's end.
- UML: 1..1 at the Department end; 0..* at the Employee end.
- Without "must", EMPLOYEE would be (0,1).

**Q2.** "Every section is taught by at least one instructor; an instructor may teach many sections or none."
- M:N teaches, with section (1,N) total and instructor (0,N).
- SKS: double line section–teaches, no arrowheads. This matches the official university diagram.
- Tables: teaches(ID, course_id, sec_id, semester, year), PK all columns, FKs to instructor and section. Section's minimum of 1 cannot be enforced with keys (SKS7-SOL 6.11).

**Q3 (recursive + roles).** "A course may have several prerequisite courses and may be a prerequisite of several courses."
- A recursive M:N prereq with role labels course_id and prereq_id.
- Table: prereq(course_id → course, prereq_id → course), PK both columns. This is identical to the official DDL.

**Q4 (read SKS l..h).** In instructor —0..*— advisor —1..1— student:
- (a) It is one-to-many from instructor to student.
- (b) Student is total; instructor is partial.
- (c) With arrows: an arrowhead into instructor (each student has at most one), a double line from student, a single line from instructor.

**Q5 (ternary arrow).** proj_guide(instructor, student, project) has an arrow to instructor.
- Meaning: each (student, project) pair has at most one guiding instructor.
- PK of the proj_guide table: (student ID, project_id).
- Why not a second arrow: SKS outlaws it as ambiguous.

**Q6 (weak entity).** "Each policy's payments are numbered 1, 2, 3 …; a payment has a due date, amount and received date."
- payment is weak, with discriminator payment_no (dashed underline). Identifying relationship policy_payment is a double diamond with an arrowhead to policy and a double line from payment.
- Table: payment(policy_id → policy, payment_no, due_date, amount, received_on), PK (policy_id, payment_no), ON DELETE CASCADE. There is no table for the identifying relationship.

**Q7 (what is wrong?).** A student draws section as a weak entity *and* lists course_id inside the section rectangle.
- The owner's key is duplicated between the attribute and the identifying relationship, which is redundant (SKS7-SOL 6.7).
- Remove course_id from the rectangle; it reappears only in the table.

**Q8 (complex attributes → table).** instructor(ID, name(first_name, middle_initial, last_name), address(street(street_number, street_name, apt_number), city, state, zip), {phone_number}, date_of_birth, age()).
- instructor(ID, first_name, middle_initial, last_name, street_number, street_name, apt_number, city, state, zip, date_of_birth).
- inst_phone(ID → instructor, phone_number), PK both columns.
- age is dropped.

**Q9 (spot the mistake).** student(ID, name, tot_cred, dept_name) plus a stud_dept relationship to department.
- dept_name is a redundant attribute in the E-R diagram; remove it. After reduction it returns as the FK column student.dept_name.

**Q10 (spot the mistake).** stud_section(student, section) with attributes assignment and marks.
- Only one assignment can be recorded per student–section pair.
- Fix 1: assignment as a weak entity of section, plus marks_in(student, assignment) with attribute marks.
- Fix 2: a multivalued composite {assignment_marks(assignment, marks)} on stud_section.

**Q11 (library trap).** "A member borrows a book copy; record borrow and return dates; the same member may borrow the same copy again later."
- A borrows(member, copy) relationship with date attributes cannot hold two loans of the same pair, because the relationship key is (member_id, copy key).
- Model loan as an entity set: loan(loan_id, borrow_date, due_date, return_date) with many-to-one, total links to member and to copy.
- copy itself is a weak entity of book(isbn), with discriminator copy_no.
- Tables:
  - book(isbn, …)
  - copy(isbn → book, copy_no)
  - member(member_id, …)
  - loan(loan_id, member_id → member NOT NULL, (isbn, copy_no) → copy NOT NULL, borrow_date, due_date, return_date NULL)

**Q12 (reduce N:1).** inst_dept is many-to-one from instructor to department, with instructor total.
- Add dept_name to instructor as an FK, NOT NULL; there is no inst_dept table.
- If instructor were partial: the FK must be nullable, or keep a separate inst_dept(ID PK, dept_name) table to avoid nulls.

**Q13 (reduce 1:1).** MANAGES(EMPLOYEE (0,1), DEPARTMENT (1,1)), attribute Start_date.
- Put Mgr_ssn and Mgr_start_date in DEPARTMENT.
- Mgr_ssn is NOT NULL (department total) and UNIQUE (1:1), with an FK to EMPLOYEE.

**Q14 (reduce M:N with attribute).** WORKS_ON(EMPLOYEE, PROJECT, Hours).
- WORKS_ON(Essn → EMPLOYEE, Pno → PROJECT, Hours), PK (Essn, Pno). Hours is not part of the key.

**Q15 (how many tables?).** For the COMPANY E-R diagram:
- 6 tables: EMPLOYEE, DEPARTMENT, DEPT_LOCATIONS, PROJECT, WORKS_ON, DEPENDENT.
- WORKS_FOR, MANAGES, CONTROLS, SUPERVISION and DEPENDENTS_OF became FK columns.
- Number_of_employees is not stored.

**Q16 (n-ary → schema).** SUPPLY(SUPPLIER, PART, PROJECT) with attribute Quantity and no arrows.
- SUPPLY(Sname, Partno, Projname, Quantity), PK all three keys, each an FK. This matches E&N Step 7.
- If there were an arrow to SUPPLIER: PK (Partno, Projname).

**Q17 (binary vs. ternary).** parents(child, father, mother) vs. father(child, man) and mother(child, woman)?
- Use two binaries: they can record partial information, such as only the mother being known.
- proj_guide, by contrast, should stay ternary.

**Q18 (placement).** advisor is one-to-many from instructor to student, with attribute date (start of advising). Where can date go?
- On advisor, or moved to student (the N side), because each student has at most one advisor.
- If advisor were M:N, date must stay on the relationship.

**Q19 (specialization → tables).** person(ID, name, street, city) with overlapping, partial subclasses employee(salary) and student(tot_cred).
- Method 1 (safe): person(ID, name, street, city); employee(ID → person, salary); student(ID → person, tot_cred).
- Method 2: person(ID, name, street, city); employee(ID, name, street, city, salary); student(ID, name, street, city, tot_cred). This duplicates data for people who are both.
- Because the specialization is partial, dropping the person table would lose people who are neither employee nor student.

**Q20 (aggregation).** The schema for eval_for over the aggregate proj_guide and the entity evaluation:
- eval_for(s_ID, project_id, i_ID, evaluation_id), with an FK on (s_ID, project_id, i_ID) to proj_guide and an FK on evaluation_id to evaluation.
- Keep the proj_guide table unless every guide assignment is evaluated (Section 10 caution).

**Q21 (notation translation).** A Chen diagram shows DEPARTMENT —1— CONTROLS —N— PROJECT, with a double line on PROJECT's edge. Redraw it.
- SKS: an arrowhead into department, a double line from project. Or l..h: project 1..1, department 0..*.
- (min,max): PROJECT (1,1); DEPARTMENT (0,N).
- Crow's foot: bar-bar at DEPARTMENT's end; ring + fork at PROJECT's end.
- UML: 1..1 at the Department end; 0..* at the Project end.

**Q22 (enforceability).** Which COMPANY constraints can a MySQL schema enforce with PK, FK, NOT NULL and UNIQUE alone?
- **Yes:**
  - EMPLOYEE (1,1) in WORKS_FOR: Dno NOT NULL plus FK.
  - DEPARTMENT (1,1) and EMPLOYEE (0,1) in MANAGES: Mgr_ssn NOT NULL UNIQUE.
  - PROJECT (1,1) in CONTROLS: Dnum NOT NULL.
  - Supervisee (0,1): Super_ssn nullable.
  - DEPENDENT (1,1): Essn in the PK.
  - The WORKS_ON M:N maximum: the composite PK.
- **No:** DEPARTMENT (4,N), and EMPLOYEE (1,N) and PROJECT (1,N) in WORKS_ON. These are minimums on the "one" side or on an M:N relationship (SKS7-SOL 6.11).

### Gaps
- No official answer key exists for Q1–Q22; they are my constructions.

---

## 14. Best free resources (verified links; no pirated textbooks)

### Takeaway
Start with the authors' own free materials: the slides, practice-exercise solutions and university DDL on db-book.com. Add the E&N publisher slides for COMPANY and (min,max). Use Widom's free Stanford course for UML data modelling, and an open textbook for a second explanation.

### Cited Findings
- **Silberschatz 6th ed. (course text), official site:**
  - Slide index, with Ch. 7 "Entity-Relationship Model" as PPT — [db-book.com 6e slides](https://www.db-book.com/db6/slide-dir/index.html); direct file [ch7.ppt](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch7.ppt)
  - Practice-exercise solutions — [index](https://www.db-book.com/db6/practice-exer-dir/index.html); Ch. 7 [7s.pdf](https://www.db-book.com/db6/practice-exer-dir/7s.pdf)
  - University schema DDL — [DDL.sql (6e)](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL.sql)
- **Silberschatz 7th ed. (same notation; E-R is Ch. 6):**
  - Slides PDF — [ch6.pdf](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf)
  - Practice solutions *with the question text* — [6.pdf](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/6.pdf); [index](https://www.db-book.com/Practice-Exercises/index-solu.html)
  - DDL — [DDL.sql](https://www.db-book.com/university-lab-dir/sample_tables-dir/DDL.sql)
- **Elmasri & Navathe publisher slides** (reference text; COMPANY, (min,max), EER, mapping algorithm), hosted on a Purdue CS348 course page:
  - [Ch. 3 ER](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch03-Data%20Modeling%20Using%20the%20Entity-Relationship%20%28ER%29%20Model.pdf)
  - [Ch. 4 EER](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch04-Enhanced%20Entity-Relationship%20%28EER%29%20Modeling.pdf)
  - [Ch. 5 relational model](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch05-The%20Relational%20Data%20Model%20and%20Relational%20Database%20Constraints.pdf)
  - [Ch. 7 ER-to-relational mapping](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf)
- **Stanford / Jennifer Widom "Databases: Modeling and Theory"** (edX, self-paced). Its "Unified Modeling Language section introduces the data-modeling component of UML, and describes how UML diagrams are translated to relational database schemas". It is listed as free to audit, with a paid certificate — [Class Central listing](https://www.classcentral.com/course/edx-databases-modeling-and-theory-20362); course page [edX](https://www.edx.org/learn/databases/stanford-university-databases-modeling-and-theory)
- **Open textbook:** Adrienne Watt, *Database Design – 2nd Edition* (BCcampus OpenTextBC), Chapter 8 "The Entity Relationship Data Model" — [opentextbc.ca](https://opentextbc.ca/dbdesign01/chapter/chapter-8-entity-relationship-model/)
- **MySQL Workbench Manual** (crow's-foot EER diagrams; identifying vs. non-identifying relationships; associative tables) — [9.1.4.1 Adding Foreign Key Relationships](https://dev.mysql.com/doc/workbench/en/wb-relationship-tools.html)
- **Notation cross-check** (crow's-foot symbols, look-across vs. same-side, Chen 1976) — [Wikipedia: Entity–relationship model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)

### Inferences
- **A study order that fits the 4 days before Quiz #2:**
  1. Read SKS7 slides pp.7–48 for the core and the reduction rules.
  2. Read EN3 slides 3-6 to 3-43 and EN7 slides 7-4 to 7-11 to see COMPANY end to end.
  3. Redo COMPANY from the requirement sentences without looking. Check your result against Figs. 3.2, 3.15 and 7.2.
  4. Do the official exercises 6.1–6.11 (7th-ed. PDF, which prints the questions).
  5. Do Q1–Q22 above.
- The official solution PDFs contain diagrams with arrowheads and double lines that do not survive text extraction. Open the PDFs themselves to see them.

### Gaps
- The edX course page did not render for automated checking, so the "free to audit" status rests on the Class Central aggregator. Confirm on edX before enrolling.
- Stanford CS145 and UW CSE 344 E-R lecture pages were not checked in this session.
- Watt's open-textbook licence was not verified beyond its hosting on OpenTextBC.
