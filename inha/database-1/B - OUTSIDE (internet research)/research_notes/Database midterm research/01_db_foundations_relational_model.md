# Foundations of Database Systems & the Relational Model — Silberschatz, Korth & Sudarshan, *Database System Concepts* 6th ed., Ch. 1–2 (exam-oriented outside research)

> **Scope & method.**
> - **Sources.** The notes use the authors' own free material on db-book.com: the 6th-ed. PPT slides, the 7th-ed. PDF slides, the 6th- and 7th-ed. practice-exercise solutions, and the official "university" DDL and sample data. They also use the CMU 15-445 lecture notes, a Waterloo CS338 deck based on Elmasri & Navathe, and the MySQL 8.0 manual. No textbook copies were used.
> - **Verified examples.** Every example on the university database was run in SQLite 3.54 against the authors' official 6th-ed. sample data, so the numbers below are checked results, not recollections.
> - **Tiny tables.** The 6th-ed. slides draw their small r/s tables as images, which could not be extracted. The tiny α/β tables below are therefore my own, in the same style, and their results were also checked by running them.
> - **Edition differences.** In the 6th ed., Ch. 2 only introduces the operators informally (§2.6 "Relational Operations"); the formal algebra is in §6.1. In the 7th ed., the algebra is §2.6 of Ch. 2 ([6th-ed. TOC](https://www.db-book.com/db6/toc-dir/toc.pdf); [7th-ed. TOC](https://www.db-book.com/toc-dir/toc.pdf)). 6th-ed. examples use the years 2009/2010, while the 7th-ed. slides use 2017/2018.
> - **Notation.** Silberschatz notation is used throughout: σ, Π, ×, ⋈, ∪, −, ∩, ρ, ←.

## 1. Ch. 1 — Purpose of database systems vs. file-processing systems (redundancy/inconsistency, difficulty of access, data isolation, integrity, atomicity, concurrent access, security)

### Takeaway
Keeping data in separate, application-managed files causes **seven** problems:
1. data redundancy and inconsistency
2. difficulty in accessing data
3. data isolation
4. integrity problems
5. atomicity problems
6. concurrent-access anomalies
7. security problems

The authors' slide sums it up as "Database systems offer solutions to all the above problems." Be ready to name all seven, give an example of each, and *apply* them to a scenario. The official practice exercise does exactly this, using a YouTube-like site.

### Cited Findings
- "In the early days, database applications were built directly on top of file systems, which leads to: **Data redundancy and inconsistency**: data is stored in multiple file formats resulting in duplication of information in different files; **Difficulty in accessing data**: need to write a new program to carry out each new task; **Data isolation**: multiple files and formats; **Integrity problems**: integrity constraints (e.g., account balance > 0) become 'buried' in program code rather than being stated explicitly; hard to add new constraints or change existing ones" — [7th-ed. Ch. 1 slides (official)](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- "**Atomicity of updates**: failures may leave database in an inconsistent state with partial updates carried out. Example: transfer of funds from one account to another should either complete or not happen at all" — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- "**Concurrent access by multiple users**: concurrent access needed for performance; uncontrolled concurrent accesses can lead to inconsistencies. Ex: two people reading a balance (say 100) and updating it by withdrawing money (say 50 each) at the same time" — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- "**Security problems**: hard to provide user access to some, but not all, data. Database systems offer solutions to all the above problems" — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- Official Practice Exercise 1.5 (6th ed.; it is 1.4 in the 7th) asks you to apply each point to a YouTube-like site. The official answer:
  - **Redundancy:** relevant to metadata only, not to video data, which is not updated.
  - **Difficulty of access:** if metadata were kept in files, searching on specific conditions would need new application programs, so a database "would be important."
  - **Data isolation:** not a major issue, because the data is append-only.
  - **Integrity:** mainly primary keys.
  - **Atomicity:** "when a video is uploaded, metadata about the video and the video should be added atomically", which needs a recovery mechanism.
  - **Concurrency:** anomalies are unlikely, since the data is not updated.
  - **Security:** an issue if the site supports authorization.

  — [6th-ed. Ch. 1 practice solutions (official)](https://www.db-book.com/db6/practice-exer-dir/1s.pdf); [7th-ed. Ch. 1 practice solutions](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/1.pdf)
- Official Practice 1.1, "two disadvantages" of database systems: "Setup of the database system requires more knowledge, money, skills, and time" and "The complexity of the database may result in poor performance." — [6th-ed. Ch. 1 solutions](https://www.db-book.com/db6/practice-exer-dir/1s.pdf)
- Official Practice 1.6, web keyword queries vs. database queries: web queries are lists of keywords with no specific syntax, and the result is a ranked list of URLs with snippets. "Database queries have a specific syntax allowing complex queries to be specified. And in the relational world the result of a query is always a table." — [6th-ed. Ch. 1 solutions](https://www.db-book.com/db6/practice-exer-dir/1s.pdf)
- CMU's "flat file strawman" (CSV files per entity) lists the same failure classes:
  - **Data integrity:** "How do we ensure that the artist is the same for each album entry?" and an invalid year string.
  - **Implementation:** finding a record; a new application using the same database; "two threads try to write to the same file at the same time".
  - **Durability:** "machine crashes while our program is updating a record".

  — [CMU 15-445 F19 Lecture #01 notes](https://15445.courses.cs.cmu.edu/fall2019/notes/01-introduction.pdf)
- The official university DDL shows constraints declared to the DBMS rather than "buried" in code, for example `check (budget > 0)`, `check (tot_cred >= 0)`, `check (salary > 29000)`, `check (semester in ('Fall','Winter','Spring','Summer'))` — [official university DDL (6th ed.)](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL.sql)

### Inferences
- **Mnemonic (7 problems, in slide order): R-D-I-I-A-C-S**, "**R**ed **D**ragons **I**n **I**celand **A**te **C**old **S**oup". The letters stand for Redundancy/inconsistency, Difficulty of access, Isolation of data, Integrity, Atomicity, Concurrent access, Security.
- **University examples (mine, for illustration):**
  - *Redundancy → inconsistency:* a student's address is stored in both the registrar's file and the hostel file. One copy is updated and the other is not.
  - *Difficulty of access:* "list Comp. Sci. students with tot_cred > 100" needs a new program to be written.
  - *Data isolation:* grades are in one file format and fees in another, so a new report has to parse both.
  - *Integrity:* "budget > 0" is enforced only in the payroll program, so another program can violate it. In a DBMS it is declared once, as a `check`.
  - *Atomicity:* a fee payment debits the student's account, then the system crashes before crediting the university's account.
  - *Concurrency:* two students register for the last seat in a section at the same moment.
  - *Security:* an advisor should see only their advisees' grades.
- **Exam traps:**
  1. In Ch. 1, "**data isolation**" means data scattered across many files and formats. It is *not* the transaction property "isolation" from later chapters.
  2. Redundancy is the *cause* and inconsistency the *consequence*. Give both in one answer.
  3. Keep three things apart. Integrity means constraints on values. Atomicity means all-or-nothing when a failure happens. Concurrency anomalies come from interleaved simultaneous users.
  4. The question may be flipped: "give two *disadvantages* of a DBMS" (see the official 1.1 answer above).

### Gaps
- The textbook's own prose and examples for each problem (6th ed. §1.2) were not consulted, because there is no legal free full text. The university examples above are mine.

## 2. Ch. 1 — Levels of data abstraction, instances vs. schemas, physical vs. logical data independence

### Takeaway
There are three levels:
- **Physical:** how the data is stored.
- **Logical:** what data is stored and how it is related.
- **View:** the part of the database a particular user or application sees; views can also hide data such as salary.

A **schema** is the database's overall design. It is like a variable's *type* and rarely changes. An **instance** is the database's content at one moment. It is like the variable's *value* and changes constantly.

**Physical data independence** means you can change the physical schema without changing the logical schema. It is the kind Silberschatz's slides define. **Logical data independence** is the Elmasri & Navathe three-schema idea: change the conceptual (logical) schema without changing external schemas, views or application programs. It is harder to achieve, because applications are written against the logical schema.

### Cited Findings
- "**Physical level**: describes how a record (e.g., instructor) is stored. **Logical level**: describes data stored in database, and the relationships among the data. `type instructor = record ID: string; name: string; dept_name: string; salary: integer; end;` **View level**: application programs hide details of data types. Views can also hide information (such as an employee's salary) for security purposes." — [6th-ed. Ch. 1 slides (official PPT)](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch1.ppt) (linked from the [6th-ed. slide index](https://www.db-book.com/db6/slide-dir/index.html))
- "Instances and Schemas: Similar to types and variables in programming languages. **Logical Schema** – the overall logical structure of the database … Analogous to type information of a variable in a program. **Physical schema** – the overall physical structure of the database. **Instance** – the actual content of the database at a particular point in time. Analogous to the value of a variable" — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- "**Physical Data Independence** – the ability to modify the physical schema without changing the logical schema. Applications depend on the logical schema. In general, the interfaces between the various levels and components should be well defined so that changes in some parts do not seriously influence others." — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- "**Database schema** — is the logical structure of the database. **Database instance** — is a snapshot of the data in the database at a given instant in time. Example: schema: instructor (ID, name, dept_name, salary)" — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)
- Historical motivation: early DBMSs had "a tight coupling between logical and physical layers … if we wanted to change the physical layer … we would have to change all of the code." Codd "in 1970 … proposed the relational model to avoid this", and one of its three key points is that "physical storage [is] left up to implementation." — [CMU 15-445 F19 notes](https://15445.courses.cs.cmu.edu/fall2019/notes/01-introduction.pdf)
- Elmasri & Navathe-style (three-schema) definitions:
  - "Data independence: capacity to change the schema at one level of a database system without having to change the schema at the next higher level."
  - "Physical data independence achieved through conceptual/internal mapping."
  - "Logical data independence achieved through external/conceptual mappings."
  - "DDL defines conceptual schema; Storage definition language (SDL) specifies the internal schema; View definition language (VDL) specifies user views/mappings to conceptual schema."

  — [U. Waterloo CS338 slides (Elmasri & Navathe Ch. 2 based)](https://cs.uwaterloo.ca/~tozsu/courses/CS338/lectures/14%20DB%20System.pdf)

### Inferences
- **Terminology map**, built from the two cited decks. Use the Silberschatz names in your answers.

| Silberschatz (course textbook) | Elmasri & Navathe (reference book) | What it describes |
|---|---|---|
| Physical level / physical schema | Internal schema | Files, record layout, indices |
| Logical level / logical schema | Conceptual schema | All relations, attributes, constraints |
| View level / views | External schemas (user views) | What one user or app sees |
| Physical data independence | Physical DI (conceptual/internal mapping) | Change storage, keep the logical schema |
| (not defined on the slides) | Logical DI (external/conceptual mapping) | Change the logical schema, keep views and apps |

- **Model answer, "Explain data independence with an example":**
  - **Physical data independence** is the ability to change the physical schema without changing the logical schema. Example: the DBA adds an index on `instructor(dept_name)` (MySQL: `CREATE INDEX idx_dept ON instructor(dept_name);`) or reorganizes the files. The query `SELECT name FROM instructor WHERE dept_name='Physics'` is unchanged. It only runs faster, because applications depend only on the logical schema.
  - **Logical data independence** is the ability to change the logical schema without rewriting applications or views. Example: add a `phone` attribute to `instructor`, or split `instructor` into two tables and define a view with the old shape. The old programs keep working through that view.
  - Logical DI is harder to achieve than physical DI, because programs are written against the logical schema.
- **Traps:**
  1. Schema vs. instance. Adding a *row* changes the instance; adding a *column* changes the (logical) schema.
  2. There is one physical schema and one logical schema, but there can be *many* view-level schemas.
  3. "Logical *schema*" (the level) is not "logical *design*" (the design phase that produces the logical schema).
  4. A `SELECT *` program can break when a column is added. This is why exam answers say applications "should" name the attributes they use.

### Gaps
- I could not verify from free official material whether the 6th-ed. *text* defines **logical** data independence. The slides define only physical DI. The book's term "subschemas" for view-level schemas is also unverified.

## 3. Ch. 1 — Data models: relational, E-R, object-based, semi-structured (XML/JSON)

### Takeaway
A **data model** is "a collection of tools for describing data, data relationships, data semantics, data constraints." Silberschatz lists four families:
- **Relational:** tables; the dominant model.
- **Entity-Relationship (E-R):** "mainly for database design".
- **Object-based:** object-oriented and object-relational.
- **Semi-structured:** XML in the 6th-ed. slides; the 7th ed. has a whole §8.1 on semi-structured data.

The older network and hierarchical models are "other older models."

### Cited Findings
- "Data Models: A collection of tools for describing Data, Data relationships, Data semantics, Data constraints. Relational model; Entity-Relationship data model (mainly for database design); Object-based data models (Object-oriented and Object-relational); Semi-structured data model (XML); Other older models: Network model, Hierarchical model" — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf) (identical list in the [6th-ed. Ch. 1 PPT](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch1.ppt))
- "Relational Model: All the data is stored in various tables" (slide shows "Ted Codd, Turing Award 1981") — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- Object-relational: "Relational model: flat, 'atomic' values. Object Relational Data Models extend the relational data model by including object orientation and constructs to deal with added data types; allow attributes of tuples to have complex types, including non-atomic values such as nested relations; preserve relational foundations, in particular the declarative access to data, while extending modeling power; provide upward compatibility with existing relational languages." — [6th-ed. Ch. 1 PPT](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch1.ppt)
- XML: "Defined by the WWW Consortium (W3C). Originally intended as a document markup language not a database language. The ability to specify new tags, and to create nested tag structures made XML a great way to exchange data, not just documents. XML has become the basis for all new generation data interchange formats." — [6th-ed. Ch. 1 PPT](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch1.ppt)
- Design approaches: "Entity Relationship Model (Chapter 7): models an enterprise as a collection of entities and relationships; represented diagrammatically by an entity-relationship diagram. Normalization Theory (Chapter 8): formalize what designs are bad, and test for them." — [6th-ed. Ch. 1 PPT](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch1.ppt)
- "A data model is a collection of concepts for describing the data in a database … A schema is a description of a particular collection of data, using a given data model." The relational model defines **Structure**, **Integrity** and **Manipulation**. — [CMU 15-445 F19 notes](https://15445.courses.cs.cmu.edu/fall2019/notes/01-introduction.pdf)
- In the 7th ed., semi-structured data is covered in "Chapter 8 Complex Data Types: 8.1 Semi-structured Data, 8.2 Object Orientation…" — [7th-ed. TOC](https://www.db-book.com/toc-dir/toc.pdf)

### Inferences
- **One-line contrasts for MCQs:**
  - *Relational:* flat tables of atomic values, queried declaratively (SQL).
  - *E-R:* a design-time diagram of entities and relationships, later translated to tables.
  - *Object-relational:* relational plus complex, nested types and OO features, keeping SQL.
  - *Semi-structured:* self-describing tagged or nested data where items of the same kind may have different attributes, e.g. XML or JSON.
  - *Network and hierarchical:* pre-relational models, from 1960s–70s systems.
- **Trap:** "Which model is *mainly used for design* rather than storage?" The answer is E-R.

### Gaps
- That the 7th-ed. text covers **JSON** inside §8.1 could only be inferred from the TOC heading; the 6th-ed. slides mention only XML.

## 4. Ch. 1 — Database languages: DDL vs. DML, procedural vs. declarative, the data dictionary

### Takeaway
The **DDL** defines the schema, including integrity constraints and authorization. The DDL compiler stores these definitions as *metadata* in the **data dictionary**. The **DML** accesses and updates the data.

A **procedural** DML says *what* data is needed *and how* to get it. A **declarative** (non-procedural) DML says only *what*. SQL is declarative and relational algebra is procedural.

The "pure" languages (relational algebra, tuple relational calculus, domain relational calculus) are equivalent in power. SQL is *not* Turing-complete, so it is embedded in host languages through embedded SQL or ODBC/JDBC.

### Cited Findings
- "**DDL**: specification notation for defining the database schema. Example: `create table instructor (ID char(5), name varchar(20), dept_name varchar(20), salary numeric(8,2))`. DDL compiler generates a set of table templates stored in a **data dictionary**. Data dictionary contains metadata (i.e., data about data): database schema; integrity constraints – primary key (ID uniquely identifies instructors); authorization – who can access what" — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- "**DML**: language for accessing and updating the data organized by the appropriate data model; DML also known as query language. Two classes of languages: **Pure** – used for proving properties about computational power and for optimization (Relational Algebra, Tuple relational calculus, Domain relational calculus); **Commercial** – used in commercial systems (SQL is the most widely used commercial language)" — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- "**Procedural DML** -- require a user to specify what data are needed and how to get those data. **Declarative DML** -- require a user to specify what data are needed without specifying how to get those data. Declarative DMLs are usually easier to learn and use … also referred to as non-procedural DMLs. The portion of a DML that involves information retrieval is called a **query language**." — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- "SQL query language is nonprocedural. A query takes as input several tables (possibly only one) and always returns a single table. … SQL is NOT a Turing machine equivalent language … Application programs generally access databases through … language extensions to allow embedded SQL [or an] application program interface (e.g., ODBC/JDBC)." "SQL does not support actions such as input from users, output to displays, or communication over the network. Such computations and actions must be written in a host language, such as C/C++, Java or Python." — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- "The above 3 pure languages are equivalent in computing power" — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)
- "Relational algebra is a procedural language because it defines the high level-steps of how to compute a query. For example, σ_{b_id=102}(R ⋈ S) is saying to first do the join of R and S and then do the select, whereas (R ⋈ (σ_{b_id=102}(S))) will do the select on S first … These two statements will actually produce the same answer." — [CMU 15-445 F19 notes](https://15445.courses.cs.cmu.edu/fall2019/notes/01-introduction.pdf)
- Official Practice 1.2 gives **five ways a DB DDL differs from Java/C++ type declarations**:
  1. Executing DDL creates an object in the database, while a type declaration is just a program abstraction.
  2. DDL can specify consistency constraints, such as domain and referential-integrity constraints.
  3. DDL supports authorization.
  4. Programming-language type systems are much richer than the SQL type system.
  5. DDL focuses on attribute types of relations, while a programming language creates objects and collections.

  — [6th-ed. Ch. 1 solutions](https://www.db-book.com/db6/practice-exer-dir/1s.pdf)
- Elmasri & Navathe split the languages finer: DDL (conceptual schema), SDL (internal), VDL (views) and DML. "Low-level or procedural DML … must be embedded in a general-purpose programming language." — [Waterloo CS338 slides](https://cs.uwaterloo.ca/~tozsu/courses/CS338/lectures/14%20DB%20System.pdf)

### Inferences
- **SQL contains both a DDL and a DML.** In the MySQL lab, `CREATE / ALTER / DROP TABLE` is DDL and `SELECT / INSERT / UPDATE / DELETE` is DML.
- **Trap (precise wording):** the slides also say "DML also known as query language", but the stricter definition is that the *query language* is the retrieval portion of the DML. If asked, give the strict one.
- **Trap:** "declarative" does not mean "less powerful than relational algebra". At the pure level, relational algebra and the two calculi are equal in power. "Not Turing-complete" is a separate fact, about SQL and RA vs. general programming languages.
- **The data dictionary in one line:** "data about data" = schema + integrity constraints + authorization. It is written by the DDL interpreter (§5) and stored by the storage manager (§5).

### Gaps
- None material for exam purposes.

## 5. Ch. 1 — Database design phases; the database engine: storage manager, query processor, transaction management

### Takeaway
**Design phases:**
1. Characterize the users' data needs (requirements).
2. Choose a data model, usually E-R, and build a *conceptual schema*; also specify the *functional requirements* (the operations and transactions).
3. **Logical design:** map to a "good" set of relation schemas.
4. **Physical design:** decide the physical layout.

**The database engine has three parts:**
- **Storage manager.** Components: authorization & integrity manager, transaction manager, file manager, buffer manager. Data structures: data files, data dictionary, indices.
- **Query processor.** Components: DDL interpreter, DML compiler (which does query *optimization*), query evaluation engine. Steps: parse/translate → optimize → evaluate.
- **Transaction management.** Keeps the database consistent despite failures; its concurrency-control manager controls interleaving.

### Cited Findings
- "Design Phases:
  - **Initial phase** -- characterize fully the data needs of the prospective database users.
  - **Second phase** -- choosing a data model; applying the concepts of the chosen data model; translating these requirements into a conceptual schema of the database. A fully developed conceptual schema indicates the functional requirements of the enterprise; describe the kinds of operations (or transactions) that will be performed on the data.
  - **Final Phase** -- moving from an abstract data model to the implementation of the database:
    - **Logical Design** – deciding on the database schema. Database design requires that we find a 'good' collection of relation schemas. Business decision – what attributes should we record in the database? Computer Science decision – what relation schemas should we have and how should the attributes be distributed among the various relation schemas?
    - **Physical Design** – deciding on the physical layout of the database."

  — [7th-ed. Ch. 6 (E-R) slides](https://www.db-book.com/slides-dir/PDF-dir/ch6.pdf) (the logical/physical design bullets also appear in the [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf))
- Official Practice 1.3, **six major steps** to set up a database:
  1. Define the high-level requirements (the "system requirements specification").
  2. Define a model with all the types of data and relationships.
  3. Define the integrity constraints.
  4. Define the physical level.
  5. For each regular task, define a user interface and write the application programs.
  6. Create/initialize the database.

  — [6th-ed. Ch. 1 solutions](https://www.db-book.com/db6/practice-exer-dir/1s.pdf)
- "The functional components of a database system can be divided into: the storage manager, the query processor component, the transaction management component." — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- "**Storage Manager**: a program module that provides the interface between the low-level data stored in the database and the application programs and queries submitted to the system. Responsible for: interaction with the OS file manager; efficient storing, retrieving and updating of data. Components: **Authorization and integrity manager, Transaction manager, File manager, Buffer manager**. Implements: **Data files** -- store the database itself; **Data dictionary** -- stores metadata about the structure of the database, in particular the schema; **Indices** -- can provide fast access to data items. A database index provides pointers to those data items that hold a particular value." — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- "**Query Processor** components: **DDL interpreter** -- interprets DDL statements and records the definitions in the data dictionary. **DML compiler** -- translates DML statements in a query language into an evaluation plan consisting of low-level instructions that the query evaluation engine understands. The DML compiler performs query optimization; that is, it picks the lowest cost evaluation plan from among the various alternatives. **Query evaluation engine** -- executes low-level instructions generated by the DML compiler." The steps are "1. Parsing and translation 2. Optimization 3. Evaluation". — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- "Cost difference between a good and a bad way of evaluating a query can be enormous … depends critically on statistical information about relations which the database must maintain" — [6th-ed. Ch. 1 PPT](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch1.ppt)
- "A **transaction** is a collection of operations that performs a single logical function in a database application. Transaction-management component ensures that the database remains in a consistent (correct) state despite system failures (e.g., power failures and operating system crashes) and transaction failures. **Concurrency-control manager** controls the interaction among the concurrent transactions, to ensure the consistency of the database." — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)

### Inferences
- **Which part of the system fixes which Ch. 1 problem.** A strong synthesis answer:

| File-system problem (§1) | DBMS feature / component that fixes it |
|---|---|
| Redundancy & inconsistency; data isolation | One integrated, centrally designed schema (good logical design, later normalization) |
| Difficulty of access | Query processor + declarative SQL: ad-hoc queries without new programs |
| Integrity problems | Constraints declared in DDL, stored in the data dictionary, enforced by the authorization & integrity manager |
| Atomicity problems | Transaction management (recovery) |
| Concurrent-access anomalies | Concurrency-control manager |
| Security problems | Authorization (in the data dictionary, granted by the DBA) and views |

- **Traps:**
  - "Who *picks the cheapest plan*?" The DML compiler, which does the query optimization. The query evaluation engine only *executes* it.
  - "Who *records* DDL definitions?" The DDL interpreter, which writes them into the data dictionary.
  - The 7th-ed. slides list a "transaction manager" *inside* the storage manager *and* describe a separate transaction-management component. This is not a contradiction; they are views of the same machinery.

### Gaps
- The 6th-ed. *text's* exact phase names (e.g., "specification of functional requirements", "conceptual-design phase") are not verifiable verbatim from free sources. The official slides say "initial / second / final phase".

## 6. Ch. 1 — Architectures (two-tier/three-tier), database users and the DBA, brief history

### Takeaway
**Two-tier vs. three-tier:**
- **Two-tier:** the application runs on the client and invokes database functionality on the server.
- **Three-tier:** the client is only a front end with *no direct database calls*. It talks to an application server, which talks to the database. This is the typical web-app setup.

**Users and the DBA:**
- **Four kinds of users:** naive, application programmers, sophisticated, specialized.
- **The DBA** has central control over: schema definition; storage structure and access methods; schema and physical-organization changes; granting authorization; and routine maintenance (backups, disk space, monitoring jobs).

**History:**
- 1950s–60s: tapes and punched cards.
- Late 1960s–70s: disks; network and hierarchical models; Codd's relational model; System R, Ingres, Oracle.
- 1980s: commercial relational systems; SQL becomes the standard.
- 1990s: data warehouses, data mining, the web.
- 2000s: XML; big data and NoSQL; MapReduce.
- 2010s: "SQL reloaded".

### Cited Findings
- "**Two-tier architecture** -- the application resides at the client machine, where it invokes database system functionality at the server machine. **Three-tier architecture** -- the client machine acts as a front end and does not contain any direct database calls. The client end communicates with an application server, usually through a forms interface. The application server in turn communicates with a database system to access data." — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- System architectures:
  - "**Centralized** databases: one to a few cores, shared memory."
  - "**Client-server**: one server machine executes work on behalf of multiple client machines."
  - "**Parallel** databases: many core shared memory, shared disk, shared nothing."
  - "**Distributed** databases: geographical distribution, schema/data heterogeneity."

  — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- "Four different types of database-system users:
  - **Naive users** -- unsophisticated users who interact with the system by invoking one of the application programs that have been written previously.
  - **Application programmers** -- computer professionals who write application programs.
  - **Sophisticated users** -- interact with the system without writing programs, using a database query language or tools such as data analysis software.
  - **Specialized users** -- write specialized database applications that do not fit into the traditional data-processing framework. For example, CAD, graphic data, audio, video."

  — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- "A person who has central control over the system is called a **database administrator (DBA)**, whose functions are: schema definition; storage structure and access-method definition; schema and physical-organization modification; granting of authorization for data access; routine maintenance: periodically backing up the database; ensuring that enough free disk space is available …; monitoring jobs running on the database and ensuring that performance is not degraded by very expensive tasks submitted by some users" — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- History:
  - "1950s and early 1960s: data processing using magnetic tapes for storage; tapes provided only sequential access; punched cards for input."
  - "Late 1960s and 1970s: hard disks allowed direct access to data; network and hierarchical data models in widespread use; Ted Codd defines the relational data model; would win the ACM Turing Award for this work; IBM Research begins System R prototype; UC Berkeley (Michael Stonebraker) begins Ingres prototype; Oracle releases first commercial relational database."
  - "1980s: research relational prototypes evolve into commercial systems; SQL becomes industrial standard; parallel and distributed database systems; object-oriented database systems."
  - "1990s: large decision support and data-mining applications; large multi-terabyte data warehouses; emergence of Web commerce."
  - "2000s: big data storage systems (Google BigTable, Yahoo PNuts, Amazon), 'NoSQL' systems; big data analysis: beyond SQL; Map reduce and friends."
  - "2010s: SQL reloaded: SQL front end to Map Reduce systems; massively parallel database systems; multi-core main-memory databases."

  — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)
- The 6th-ed. slides' history adds "Early 2000s: XML and XQuery standards; automated database administration" — [6th-ed. Ch. 1 PPT](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch1.ppt)
- Codd proposed the relational model in **1970** — [CMU 15-445 F19 notes](https://15445.courses.cs.cmu.edu/fall2019/notes/01-introduction.pdf); the Turing Award year shown on the official slide is **1981** — [7th-ed. Ch. 1 slides](https://www.db-book.com/slides-dir/PDF-dir/ch1.pdf)

### Inferences
- **Mapping onto the MySQL lab:**
  - The MySQL command-line client or Workbench sending SQL straight to the MySQL server is *two-tier*. The application logic sits on the client and invokes the server.
  - Browser → application server (PHP, Java, Python) → MySQL is *three-tier*. The browser makes no direct database calls.
- **Classify the user (MCQ):**
  - Bank customer using an ATM or registration web form → *naive*.
  - Developer writing the registration app → *application programmer*.
  - Analyst writing ad-hoc SQL or using analysis tools → *sophisticated*.
  - CAD or multimedia system builder → *specialized*.
  - Person who grants access and schedules backups → *DBA*.
- **History items most likely to be asked:** Codd (1970, relational model; Turing Award); System R (IBM) and Ingres (Berkeley); SQL becomes the standard in the 1980s; NoSQL and MapReduce in the 2000s.

### Gaps
- The 6th-ed. Ch. 1 slides show "Database Users and Administrators" only as a figure, so the 6th-ed. list was not checked word-for-word against the 7th-ed. list above.

## 7. Ch. 2 — Relation, tuple, attribute, domain, atomic domains, null; relation schema vs. relation instance; why tuple order doesn't matter

### Takeaway
- **Basic terms:** relation = table, tuple = row, attribute = column, and **domain** = the set of allowed values of an attribute.
- **Atomic values:** values are (normally) **atomic**, i.e. indivisible.
- **null:** a special value that belongs to *every* domain and means "unknown" or undefined. It complicates many operations.
- **Schema vs. instance:** a **relation schema** R = (A₁,…,Aₙ) is the structure; a **relation instance** r(R) is the set of tuples present now.
- **Why order doesn't matter:** formally a relation is a *subset of D₁ × … × Dₙ*, i.e. a **set** of n-tuples. So tuple order is irrelevant and duplicate tuples cannot exist.

### Cited Findings
- "A₁, A₂, …, Aₙ are attributes. R = (A₁, A₂, …, Aₙ) is a **relation schema**. Example: instructor = (ID, name, dept_name, salary). Formally, given sets D₁, D₂, …, Dₙ a relation r is a subset of D₁ × D₂ × … × Dₙ. Thus, a relation is a set of n-tuples (a₁, a₂, …, aₙ) where each aᵢ ∈ Dᵢ. The current values (**relation instance**) of a relation are specified by a table. An element t of r is a tuple, represented by a row in a table." — [6th-ed. Ch. 2 PPT (official)](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch2.ppt)
- "The set of allowed values for each attribute is called the **domain** of the attribute. Attribute values are (normally) required to be **atomic**; that is, indivisible. The special value **null** is a member of every domain. Indicated that the value is 'unknown'. The null value causes complications in the definition of many operations." — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)
- "Relations are Unordered: Order of tuples is irrelevant (tuples may be stored in an arbitrary order)" — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)
- "attributes (or columns) … tuples (or rows)" (labels on the instructor-relation example) — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)
- "Domain is atomic if its elements are considered to be indivisible units. Examples of non-atomic domains: set of names, composite attributes; identification numbers like CS101 that can be broken up into parts. A relational schema R is in first normal form if the domains of all attributes of R are atomic." — [7th-ed. Ch. 7 (normalization) slides](https://www.db-book.com/slides-dir/PDF-dir/ch7.pdf)
- "A relation is an unordered set … Since the relationships are unordered, the DBMS can store them in any way it wants, allowing for optimization." "Every attribute can be a special value, NULL, which means for a given tuple the attribute is undefined." "A relation with n attributes is called an n-ary relation." "Originally, values had to be atomic or scalar, but now values can also be lists or nested data structures." — [CMU 15-445 F19 notes](https://15445.courses.cs.cmu.edu/fall2019/notes/01-introduction.pdf)
- Official instance of `instructor` (12 tuples):
  - 10101 Srinivasan, Comp. Sci., 65000
  - 12121 Wu, Finance, 90000
  - 15151 Mozart, Music, 40000
  - 22222 Einstein, Physics, 95000
  - 32343 El Said, History, 60000
  - 33456 Gold, Physics, 87000
  - 45565 Katz, Comp. Sci., 75000
  - 58583 Califieri, History, 62000
  - 76543 Singh, Finance, 80000
  - 76766 Crick, Biology, 72000
  - 83821 Brandt, Comp. Sci., 92000
  - 98345 Kim, Elec. Eng., 80000

  Other table sizes in the official small dataset: teaches 15, student 13, advisor 9, takes 22, section 15, course 13, department 7. These were verified by loading the file. — [official small sample data (6th ed.)](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)

### Inferences
- **Terminology table:**

| Silberschatz (formal) | Informal / SQL | Notes |
|---|---|---|
| relation | table | Formally a *set*. SQL tables are multisets unless a key is declared. |
| tuple | row | |
| attribute | column | |
| domain | allowed values (type + constraints) | Must be atomic for 1NF |
| relation schema R | table definition (`CREATE TABLE`) | Rarely changes |
| relation instance r(R) | the table's current rows | Changes with every insert, delete or update |
| arity (n-ary) | number of columns | |

- **"Why doesn't tuple order matter?" Model answer:** a relation is defined mathematically as a set of tuples, a subset of D₁×…×Dₙ. Sets have no order and no duplicates, so two tables with the same rows in a different order are the *same* relation. The DBMS is free to store rows in any order, which allows optimization.
- **Traps:**
  1. **null ≠ 0 and ≠ the empty string.** It means unknown or undefined, which is why it "causes complications" in comparisons and aggregates.
  2. **Atomicity depends on use.** A course_id like "CS-101" is atomic *unless* the application splits it into department and number. That is exactly the slide's non-atomic example.
  3. **Relations vs. SQL tables:** a relation has *no duplicate tuples*, but an SQL table without a key can. See the projection trap in §10.
  4. **Attribute order:** the formal n-tuple definition fixes positions. In RA and SQL, however, you refer to attributes *by name*, so column order is rarely what an exam is testing. Tuple order is what the "unordered" slide is about.

### Gaps
- The 6th-ed. text's exact null wording (e.g., "unknown or does not exist") could not be verified from free sources. The official slides say "unknown"; CMU says "undefined".

## 8. Ch. 2 — Keys: superkey, candidate key, primary key, foreign key, referencing vs. referenced relation, referential-integrity constraint (with worked examples)

### Takeaway
**Definitions (K ⊆ R):**
- **Superkey:** K's values identify a unique tuple in *every possible* instance r(R).
- **Candidate key:** a *minimal* superkey, so no proper subset of it is a superkey.
- **Primary key:** the candidate key the *designer chooses*.
- **Foreign key constraint:** values in the referencing relation must appear in the referenced relation. Example: `dept_name` in **instructor** (the *referencing* relation) references **department** (the *referenced* relation).

**Keys are properties of the schema and real-world rules, not of one instance.** An instance can *refute* a superkey (two tuples that agree on K) but can never *prove* one.

### Cited Findings
- "Let K ⊆ R. K is a **superkey** of R if values for K are sufficient to identify a unique tuple of each possible relation r(R). Example: {ID} and {ID, name} are both superkeys of instructor. Superkey K is a **candidate key** if K is minimal. Example: {ID} is a candidate key for instructor. One of the candidate keys is selected to be the **primary key**. Which one? **Foreign key constraint**: value in one relation must appear in another; **Referencing relation**; **Referenced relation**. Example: dept_name in instructor is a foreign key from instructor referencing department." — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf) (same in the [6th-ed. Ch. 2 PPT](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch2.ppt))
- Official Practice 2.4: "In the instance of instructor … no two instructors have the same name. From this, can we conclude that name can be used as a superkey (or primary key) of instructor? **Answer: No.** For this possible instance … the names are unique, but in general this may not be always the case (unless the university has a rule that two instructors cannot have the same name …)." — [6th-ed. Ch. 2 solutions](https://www.db-book.com/db6/practice-exer-dir/2s.pdf). Verified on the official instance: `name` has 0 duplicates among the 12 instructors, `salary` has 1 (Singh and Kim both earn 80000), and `dept_name` has 5 (12 rows, 7 distinct). Also Π_name(instructor) ∩ Π_name(student) = {**Brandt**}: an instructor and a student share a name. — [official sample data](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- Official Practice 2.2, foreign-key violations for instructor.dept_name → department:
  - "Inserting a tuple (10111, Ostrom, Economics, 110000) into the instructor table, where the department table does not have the department Economics, would violate the foreign key constraint."
  - "Deleting the tuple (Biology, Watson, 90000) from the department table, where at least one student or instructor tuple has dept_name as Biology, would violate the foreign key constraint."

  Verified: the official `department` table has no 'Economics' row (0 rows). — [6th-ed. Ch. 2 solutions](https://www.db-book.com/db6/practice-exer-dir/2s.pdf)
- Official Practice 2.3: "The attributes **day and start_time are part of the primary key** since a particular class will most likely meet on several different days, and may even meet more than once in a day. However, **end_time is not** part of the primary key since a particular class that starts at a particular time on a particular day cannot end at more than one time." — [6th-ed. Ch. 2 solutions](https://www.db-book.com/db6/practice-exer-dir/2s.pdf)
- Official Practice 2.1 (6th ed., read from the rendered figure because the underlines are lost in text): **employee(<u>person_name</u>, street, city), works(<u>person_name</u>, company_name, salary), company(<u>company_name</u>, city)** — [6th-ed. Ch. 2 solutions](https://www.db-book.com/db6/practice-exer-dir/2s.pdf)
  - The 7th-ed. solution prints the same person_name answer. However, its own Figure 2.17 is **employee(<u>ID</u>, person_name, street, city), works(<u>ID</u>, company_name, salary), company(<u>company_name</u>, city)**. That is a small mismatch in the official 7th-ed. answer. — [7th-ed. Ch. 2 solutions](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/2.pdf)
- The official DDL declares PKs and FKs with referential actions. Examples:
  - `instructor`: `foreign key (dept_name) references department on delete set null`
  - `teaches`: `foreign key (course_id, sec_id, semester, year) references section on delete cascade` and `foreign key (ID) references instructor on delete cascade`
  - `section`: **no** foreign key on `time_slot_id`, while `time_slot` has `primary key (time_slot_id, day, start_hr, start_min)`

  — [official university DDL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL.sql)
- "Types of integrity constraints: primary key (A₁, …, Aₙ); foreign key (Aₘ, …, Aₙ) references r; not null. SQL prevents any update to the database that violates an integrity constraint." — [7th-ed. Ch. 3 slides](https://www.db-book.com/slides-dir/PDF-dir/ch3.pdf)
- "A relation's primary key uniquely identifies a single tuple. Some DBMSs automatically create an internal primary key if you do not define one … A foreign key specifies that an attribute from one relation has to map to a tuple in another relation." — [CMU 15-445 F19 notes](https://15445.courses.cs.cmu.edu/fall2019/notes/01-introduction.pdf)

### Inferences
- **Worked example 1: instructor(ID, name, dept_name, salary), with ID the only candidate key.**
  - All **8** superkeys (each contains ID): {ID}, {ID,name}, {ID,dept_name}, {ID,salary}, {ID,name,dept_name}, {ID,name,salary}, {ID,dept_name,salary}, {ID,name,dept_name,salary}.
  - Candidate key: {ID} only. Primary key: ID.
  - {ID, name} *is* a superkey but *not* a candidate key, because it is not minimal (it contains {ID}).
  - The count of 8 = 2^(4−1) was verified by brute-force enumeration.
- **Worked example 2: two candidate keys.**
  - Suppose a university rule makes each (name, dept_name) pair unique. Then both {ID} and {name, dept_name} are candidate keys, and the designer picks one, usually ID, as the primary key.
  - {ID, name} is still not a candidate key, because it contains {ID}.
  - Without such a rule, {name, dept_name} is *not* a key, even if today's instance happens to have no duplicates.
- **Superkey counting** (verified by brute-force enumeration over R(A,B,C,D)):
  - One candidate key {A}: supersets of {A} = 2³ = **8**.
  - Candidate keys {A} and {B}: 8 + 8 − 4 = **12**, by inclusion–exclusion (subtract the sets containing both A and B).
  - Candidate keys {A} and {B,C}: 8 + 4 − 2 = **10**.
- **Instance test.** If two tuples agree on K, K is **not** a superkey; this is a proof. If no two tuples agree, K **might** be a superkey; this proves nothing.
- **Referencing vs. referenced, and how violations happen:**
  - *Insert or update in the referencing relation* with a value missing from the referenced relation. Example: an instructor in 'Economics'.
  - *Delete or update in the referenced relation* of a value still in use. Example: deleting the Biology department.
  - With the official DDL, deleting a department does **not** fail. `on delete set null` sets those instructors' and students' dept_name to null, and courses are handled the same way. Deleting a section *cascades* to its teaches and takes tuples.
- **Foreign key vs. referential-integrity constraint (inference from the DDL plus the Silberschatz definitions).** In Silberschatz's FK definition the referenced attributes are the referenced relation's primary key. `time_slot_id` alone is *not* a key of `time_slot`, since its PK is (time_slot_id, day, start time). So "every section's time_slot_id must appear in time_slot" is a referential-integrity constraint that *cannot* be declared as a foreign key, which is why the DDL has none.
- **Primary-key attributes cannot be null in SQL.** This is standard SQL behaviour; I did not find the exact slide sentence. The DDL's `on delete set null` actions show that *foreign-key* attributes, by contrast, *may* be null.
- **Exam traps:**
  - "Every candidate key is a superkey": **true**. "Every superkey is a candidate key": **false**.
  - "A relation has exactly one primary key but may have several candidate keys": **true**.
  - "The primary key is the *smallest* candidate key": **false**. It is whichever key the designer *chooses*.
  - "Keys can be determined from an instance": **false** (official 2.4).

### Gaps
- Elmasri & Navathe sometimes use "key" for a minimal superkey and "alternate/secondary key" for the non-chosen candidate keys. I did not verify these terms from an E&N source here. Use Silberschatz's superkey / candidate key / primary key on the exam.

## 9. Ch. 2 — Schema diagrams; the university schema (instructor, department, course, section, teaches, student, takes, advisor, classroom, time_slot, prereq)

### Takeaway
Know all **11 relations, their primary keys and their foreign keys** by heart; the official DDL below is authoritative. In a schema diagram, each relation is a box with its primary-key attributes underlined, and foreign keys are arrows from the referencing attributes to the referenced relation's primary key. The questions you will meet most often:
- "PK of takes/section and *why*?"
- "Which relations reference course?" (section, and prereq twice)
- "What does PK s_ID of advisor imply?"

### Cited Findings
- University schema, from the official DDL. **PK attributes are in bold**; FK → referenced relation, with the declared referential action.

| Relation | Attributes | Foreign keys |
|---|---|---|
| classroom | (**building, room_number**, capacity) | — |
| department | (**dept_name**, building, budget) | — (`check (budget > 0)`) |
| course | (**course_id**, title, dept_name, credits) | dept_name → department (on delete set null) |
| instructor | (**ID**, name, dept_name, salary) | dept_name → department (set null); `name not null`; `check (salary > 29000)` |
| section | (**course_id, sec_id, semester, year**, building, room_number, time_slot_id) | course_id → course (cascade); (building, room_number) → classroom (set null); *none on time_slot_id* |
| teaches | (**ID, course_id, sec_id, semester, year**) | (course_id, sec_id, semester, year) → section (cascade); ID → instructor (cascade) |
| student | (**ID**, name, dept_name, tot_cred) | dept_name → department (set null) |
| takes | (**ID, course_id, sec_id, semester, year**, grade) | (course_id, sec_id, semester, year) → section (cascade); ID → student (cascade) |
| advisor | (**s_ID**, i_ID) | i_ID → instructor(ID) (set null); s_ID → student(ID) (cascade) |
| time_slot | (**time_slot_id, day, start_hr, start_min**, end_hr, end_min) | — |
| prereq | (**course_id, prereq_id**) | course_id → course (cascade); prereq_id → course |

  — [official university DDL (6th ed.)](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL.sql); a MySQL-specific version is also published: [DDL-MySQL.sql](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL-MySQL.sql)
- The official slides contain a "Schema Diagram for University Database" (as an image) — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf); §2.4 "Schema Diagrams" is a separate section of the 6th-ed. Ch. 2 — [6th-ed. TOC](https://www.db-book.com/db6/toc-dir/toc.pdf)
- Note: practice exercise 2.3 speaks of time_slot's `start_time`/`end_time`, while the lab DDL splits these into `start_hr, start_min, end_hr, end_min` — [6th-ed. Ch. 2 solutions](https://www.db-book.com/db6/practice-exer-dir/2s.pdf); [DDL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL.sql)
- Verified on the official data: student **45678 Levy took CS-101 twice**, in Fall 2009 (grade F) and Spring 2010 (grade B+). Both tuples can exist only because semester and year are part of takes' PK. — [official sample data](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)

### Inferences
- **How the 11 relations connect:**
  - *instructor* —teaches→ *section* ←takes— *student*
  - *student* —advisor→ *instructor*
  - *section* → *course* → *department*
  - *section* → *classroom*
  - *section* ··· *time_slot* (not a FK; see §8)
  - *course* ←prereq→ *course*: a relation with **two** FKs to the same relation
  - *instructor*, *student* and *course* each → *department*
- **Why each composite PK looks the way it does:**
  - *section* = (course_id, sec_id, semester, year): the same course runs as several sections in several semesters.
  - *teaches* and *takes* include the full section key: a person relates to a specific offering, and Levy's repeat of CS-101 shows why semester and year are needed.
  - *prereq* = (course_id, prereq_id): many-to-many.
  - *advisor* PK = s_ID means **each student has at most one advisor**. If students could have several advisors, the PK would have to become (s_ID, i_ID).
- **Drawing convention to reproduce in an exam:** draw each relation as a box with its name on top and its attributes listed below, PK attributes underlined. Draw an arrow from each FK attribute to the PK of the referenced relation.

### Gaps
- The official diagrams are images, so I could not verify from text how the 6th- or 7th-ed. diagram draws the non-FK constraint section.time_slot_id → time_slot (for example, a distinct arrow style).

## 10. Ch. 2 — Relational operations at intro level: σ, Π, ⋈, ×, ∪, −, ∩, ρ (with tiny worked examples and SQL correspondences)

### Takeaway
Relational algebra (RA) takes one or two relations as input and returns a relation, so expressions compose. The **six basic** operators (7th-ed. slides) are:
- **select σ**
- **project Π**
- **union ∪**
- **set difference −**
- **Cartesian product ×**
- **rename ρ**

**Natural join ⋈**, θ-join (= σ_θ(r × s)) and **intersection ∩** (= r − (r − s)) are *derived*.

**Biggest traps:**
- Π removes duplicates, while SQL `SELECT` keeps them unless you write `DISTINCT`.
- ⋈ equates *all* attributes with the same name.
- ∪, −, ∩ need union-compatible inputs: same arity and compatible domains.
- In MySQL, `INTERSECT` and `EXCEPT` exist only from **8.0.31**.

### Cited Findings
- "**Relational Algebra**: an algebraic language consisting of a set of operations that take one or two relations as input and produce a new relation as their result. **Six basic operators**: select σ, project Π, union ∪, set difference –, Cartesian product ×, rename ρ" — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)
- **Select:** "selects tuples that satisfy a given predicate. Notation: σ_p(r); p is called the selection predicate … comparisons using =, ≠, >, ≥, <, ≤ … combine several predicates … using the connectives ∧ (and), ∨ (or), ¬ (not) … σ_{dept_name="Physics" ∧ salary>90,000}(instructor). The select predicate may include comparisons between two attributes … σ_{dept_name=building}(department)" — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)
- **Project:** "A unary operation that returns its argument relation, with certain attributes left out. Notation: Π_{A1,A2,…,Ak}(r) … The result is defined as the relation of k columns obtained by erasing the columns that are not listed. **Duplicate rows removed from result, since relations are sets**" — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)
- **Composition:** "The result of a relational-algebra operation is relation and therefore … relational-algebra operations can be composed together … Find the names of all instructors in the Physics department: Π_name(σ_{dept_name="Physics"}(instructor))" — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)
- **Cartesian product:** "allows us to combine information from any two relations … instructor × teaches … We construct a tuple of the result out of each possible pair of tuples … Since the instructor ID appears in both relations we distinguish between these attribute[s] by attaching to the attribute the name of the relation … instructor.ID, teaches.ID" — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)
- **Join:** "The join operation allows us to combine a select operation and a Cartesian-Product operation into a single operation … r ⋈_θ s = σ_θ(r × s). Thus σ_{instructor.id = teaches.id}(instructor × teaches) can equivalently be written as instructor ⋈_{instructor.id = teaches.id} teaches." — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)
- **Natural join:** "Let r and s be relations on schemas R and S respectively. Then, the 'natural join' of relations R and S is a relation on schema R ∪ S obtained as follows: consider each pair of tuples t_r from r and t_s from s. If t_r and t_s have the same value on each of the attributes in R ∩ S, add a tuple t to the result, where t has the same value as t_r on r [and] the same value as t_s on s." Slide example: r ⋈ s = Π_{A, r.B, C, r.D, E}(σ_{r.B=s.B ∧ r.D=s.D}(r × s)). — [6th-ed. Ch. 2 PPT](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch2.ppt)
- **Union, intersection, difference:**
  - "For r ∪ s to be valid: 1. r, s must have the same **arity** (same number of attributes); 2. The attribute **domains must be compatible** (example: 2nd column of r deals with the same type of values as does the 2nd column of s)."
  - Intersection "find[s] tuples that are in both the input relations"; difference "find[s] tuples that are in one relation but are not in another", and both need compatible relations.
  - Slide example: Π_course_id(σ_{semester="Fall" ∧ year=2017}(section)) ∪ / ∩ / − Π_course_id(σ_{semester="Spring" ∧ year=2018}(section)).

  — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)
- "Note: r ∩ s = r – (r – s)"; "Relational algebra: not Turing-machine equivalent; consists of 6 basic operations"; "Each query input is a table (or set of tables). Each query output is a table. All data in the output table appears in one of the input tables. Relational Algebra is not Turing complete. Can we compute: SUM, AVG, MAX, MIN" — [6th-ed. Ch. 2 PPT](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch2.ppt)
- **Rename:** "The results of relational-algebra expressions do not have a name that we can use to refer to them. The rename operator, ρ, is provided for that purpose. The expression ρ_x(E) returns the result of expression E under the name x. Another form: ρ_{x(A1,A2,…,An)}(E)" — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf); "Allows us to refer to a relation … by more than one name"; slide example r × ρ_s(r) — [6th-ed. Ch. 2 PPT](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch2.ppt)
- **Assignment (←):** "Physics ← σ_{dept_name="Physics"}(instructor); Music ← σ_{dept_name="Music"}(instructor); Physics ∪ Music" — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)
- **Equivalent queries:** σ_{dept_name="Physics" ∧ salary>90,000}(instructor) vs. σ_{dept_name="Physics"}(σ_{salary>90,000}(instructor)); and σ_{dept_name="Physics"}(instructor ⋈_{instructor.ID=teaches.ID} teaches) vs. (σ_{dept_name="Physics"}(instructor)) ⋈_{instructor.ID=teaches.ID} teaches. "The two queries are not identical; they are, however, equivalent -- they give the same result on any database." — [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf). The 7th-ed. slides also preview aggregation γ (e.g., _{dept_name}γ_{avg(salary)}(instructor)), which goes beyond the 6th-ed. Ch. 2.
- **Natural-join danger:** "Beware of unrelated attributes with same name which get equated incorrectly. Example: list the names of students along with the titles of courses that they have taken. Correct version: `select name, title from student natural join takes, course where takes.course_id = course.course_id;` Incorrect version: …natural join takes natural join course" — [7th-ed. Ch. 4 slides](https://www.db-book.com/slides-dir/PDF-dir/ch4.pdf). Verified on the official data:
  - The incorrect triple natural join returns **17** (name, title) pairs; the correct query returns **21**.
  - The 4 lost pairs are Levy (Physics) with *Intro. to Computer Science* and *Image Processing*, and Bourikas (Elec. Eng.) with *Intro. to Computer Science* and *Robotics*. All four are Comp. Sci. courses, and they vanish because student.dept_name ≠ course.dept_name.
  - The instructor version (instructor ⋈ teaches ⋈ course) loses nothing (14 = 14) on this small dataset.

  — [official sample data](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql)
- **MySQL:**
  - "`INTERSECT` was added in MySQL 8.0.31." "As with UNION and EXCEPT, if neither DISTINCT nor ALL is specified, the default is DISTINCT." "INTERSECT has greater precedence than and is evaluated before UNION and EXCEPT." — [MySQL 8.0 manual: INTERSECT](https://dev.mysql.com/doc/refman/8.0/en/intersect.html)
  - "`EXCEPT` was added in MySQL 8.0.31." — [MySQL 8.0 manual: EXCEPT](https://dev.mysql.com/doc/refman/8.0/en/except.html)
- **CMU's union note is stricter:** "The two input relations have to have the exact same attributes" (name-based). Silberschatz's rule is positional: same arity and compatible domains. — [CMU 15-445 F19 notes](https://15445.courses.cs.cmu.edu/fall2019/notes/01-introduction.pdf) vs. [7th-ed. Ch. 2 slides](https://www.db-book.com/slides-dir/PDF-dir/ch2.pdf)
- **Erratum in the 6th-ed. summary slide.** In the "Summary of Relational Algebra Operators" table as extracted, the row for **× (Cartesian product)** carries the *natural-join* description: "Output pairs of rows … that have the same value on all attributes that have the same name". That is wrong for ×, which outputs *all* pairs. — [6th-ed. Ch. 2 PPT](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch2.ppt)

### Inferences
- **RA ↔ SQL ↔ MySQL cheat-sheet** (the correspondences follow from the definitions above; the MySQL versions are from the manual):

| RA (Silberschatz) | Meaning | SQL / MySQL equivalent | Gotcha |
|---|---|---|---|
| σ_p(r) | keep rows satisfying p | `SELECT * FROM r WHERE p` | σ is *rows*; SQL's `SELECT` keyword is actually Π. |
| Π_{A,B}(r) | keep columns, **drop duplicates** | `SELECT DISTINCT A, B FROM r` | Without `DISTINCT`, SQL keeps duplicates. |
| r × s | all pairs; arity = sum, size = product | `SELECT * FROM r, s` or `r CROSS JOIN s` | Same-named attributes become r.A and s.A. |
| r ⋈_θ s | σ_θ(r × s) | `r JOIN s ON θ` | |
| r ⋈ s | equate **all** same-named attributes, keep one copy | `r NATURAL JOIN s` (or `JOIN … USING (…)`) | Hidden extra join columns, e.g. dept_name. |
| r ∪ s | in r or in s | `… UNION …` (DISTINCT by default; `UNION ALL` keeps dups) | Inputs must be union-compatible. |
| r − s | in r, not in s | `… EXCEPT …` (MySQL ≥ 8.0.31); older: `NOT IN` / `NOT EXISTS` | Not commutative. |
| r ∩ s | in both | `… INTERSECT …` (MySQL ≥ 8.0.31); older: `IN` / `EXISTS` / join | Derived: r − (r − s). |
| ρ_x(E), ρ_{x(A1..An)}(E) | rename relation/attributes | `AS` aliases: `FROM instructor AS A, instructor AS B` | Needed for self-comparisons. |

- **Tiny-table worked examples.** The tables are my own in the slide style; every result was verified by running the SQL equivalent in SQLite.

  **σ** with r(A,B,C,D) = {(α,α,1,7), (α,β,5,7), (β,β,12,3), (β,β,23,10)}:
  ```
  σ_{A=B ∧ D>5}(r)  →  (α,α,1,7), (β,β,23,10)
  ```
  (α,β,5,7) fails A=B, and (β,β,12,3) fails D>5.

  **Π** with p(A,B,C) = {(α,10,1), (α,20,1), (β,30,1), (β,40,2)}:
  ```
  Π_{A,C}(p)                     →  (α,1), (β,1), (β,2)           3 tuples (duplicate (α,1) removed)
  SQL: SELECT A, C FROM p        →  (α,1), (α,1), (β,1), (β,2)    4 rows!
  SQL: SELECT DISTINCT A, C ...  →  3 rows
  ```

  **∪, −, ∩** with u(A,B) = {(α,1), (α,2), (β,1)} and v(A,B) = {(α,2), (β,3)}:
  ```
  u ∪ v        →  (α,1), (α,2), (β,1), (β,3)
  u − v        →  (α,1), (β,1)
  v − u        →  (β,3)          (difference is not commutative)
  u ∩ v        →  (α,2)          (= u − (u − v), checked)
  ```

  **× and σ over ×** with x(A,B) = {(α,1), (β,2)} and y(C,D,E) = {(α,10,a), (β,10,a), (β,20,b), (γ,10,b)}:
  ```
  x × y  →  8 tuples (2×4), 5 attributes (2+3):
            (α,1,α,10,a) (α,1,β,10,a) (α,1,β,20,b) (α,1,γ,10,b)
            (β,2,α,10,a) (β,2,β,10,a) (β,2,β,20,b) (β,2,γ,10,b)
  σ_{A=C}(x × y)  →  (α,1,α,10,a), (β,2,β,10,a), (β,2,β,20,b)
  ```

  **⋈** with nr(A,B,C,D) = {(α,1,α,a), (β,2,γ,a), (γ,4,β,b), (α,1,γ,a), (δ,2,β,b)} and ns(B,D,E) = {(1,a,α), (3,a,β), (1,a,γ), (2,b,δ), (3,b,ε)}. The common attributes are B and D:
  ```
  nr ⋈ ns  →  schema (A,B,C,D,E):
              (α,1,α,a,α) (α,1,α,a,γ) (α,1,γ,a,α) (α,1,γ,a,γ) (δ,2,β,b,δ)
  ```
  This is identical to Π_{A,nr.B,C,nr.D,E}(σ_{nr.B=ns.B ∧ nr.D=ns.D}(nr × ns)). (β,2,γ,a) is dropped because ns has B=2 only with D=b. (γ,4,β,b) is dropped because no ns tuple has B=4.

  **ρ:**
  ```
  x × ρ_s(x)  →  attributes x.A, x.B, s.A, s.B:
                 (α,1,α,1) (α,1,β,2) (β,2,α,1) (β,2,β,2)
  ```

- **University-database worked examples.** All were run on the [official sample data](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql):
  - σ_{dept_name="Physics"}(instructor) → (22222, Einstein, Physics, 95000), (33456, Gold, Physics, 87000)
  - σ_{dept_name="Physics" ∧ salary>90000}(instructor) → (22222, Einstein, Physics, 95000)
  - Π_name(σ_{dept_name="Physics"}(instructor)) → {Einstein, Gold}
  - Π_dept_name(instructor) → **7** tuples. `SELECT dept_name FROM instructor` → **12** rows.
  - instructor × teaches → **180** tuples (12 × 15), 9 attributes. σ_{instructor.ID=teaches.ID}(instructor × teaches) → **15**. instructor ⋈ teaches → **15** tuples, 8 attributes (ID appears once).
  - Courses in Fall 2009 vs. Spring 2010:
    - Π_course_id(σ_{semester="Fall" ∧ year=2009}(section)) ∪ Π_course_id(σ_{semester="Spring" ∧ year=2010}(section)) → {CS-101, CS-315, CS-319, CS-347, FIN-201, HIS-351, MU-199, PHY-101}
    - ∩ → {CS-101}
    - Fall − Spring → {CS-347, PHY-101}
  - Π_ID(instructor) − Π_ID(teaches) → {33456 (Gold), 58583 (Califieri), 76543 (Singh)}: instructors who teach nothing.
  - Highest-paid instructor via difference + rename: Π_{ID,name}(instructor) − Π_{A.ID,A.name}(σ_{A.salary < B.salary}(ρ_A(instructor) × ρ_B(instructor))) → {(22222, Einstein)}.
  - student ⋈ instructor → **empty**. It equates ID, name *and* dept_name, which is meaningless.
- **Further traps:**
  1. **σ vs. SQL `SELECT`.** RA's *select* σ is SQL's `WHERE`; SQL's `SELECT` clause is RA's *project* Π.
  2. **Order of σ and Π matters for validity.** σ_{salary>90000}(Π_name(instructor)) is invalid, because salary has already been projected away.
  3. **Natural join with no common attributes equals the Cartesian product.** This follows from the definition, since R ∩ S = ∅.
  4. **Selection can be pushed below a join** without changing the result. This is the "equivalent queries" slide and official Practice 2.6(b).
  5. **The union-compatibility check is positional.** Π_{ID,name}(instructor) ∪ Π_{ID}(student) is invalid (arity 2 vs. 1).
  6. **"Which is *not* a basic operator?"** The answer is ∩ (or ⋈, or ←).

### Gaps
- The exact cell values of the official 6th-ed. tiny example tables (images in the PPT) could not be extracted. The α/β tables above are my reconstructions in that style, with verified results.
- I did not verify whether the course's MySQL server is ≥ 8.0.31. Running `SELECT VERSION();` before relying on `INTERSECT`/`EXCEPT` is advisable.

## 11. Typical quiz/exam question types for Ch. 1–2, with 20 practice questions and answers

### Takeaway
The authors' own practice exercises show what the chapters treat as testable:
- **Ch. 1:** DBMS disadvantages; DDL vs. programming-language types; design steps; applying the file-system problems to a scenario; web vs. DB queries.
- **Ch. 2:** choosing PKs; FK-violating inserts and deletes; why some attributes belong to a PK; keys vs. instances; reading and writing σ/Π/×/⋈ expressions.

Expect definitions (MCQ and true/false), "is X a superkey / list the candidate keys", "compute σ/Π/⋈ on a small table", "write RA (and SQL) for a query", and "explain data independence with an example".

### Cited Findings
- **6th-ed. Ch. 1 official practice set:** 1.1 two disadvantages; 1.2 DDL vs. Java/C++ types; 1.3 six setup steps; 1.4 other university information; 1.5 YouTube vs. file-system problems; 1.6 keyword vs. database queries — [6th-ed. Ch. 1 solutions](https://www.db-book.com/db6/practice-exer-dir/1s.pdf)
- **6th-ed. Ch. 2 official practice set:**
  - 2.1 primary keys of the employee database
  - 2.2 FK-violating insert and delete
  - 2.3 the time_slot PK
  - 2.4 name as superkey?
  - 2.5 σ_{s_id=ID}(student × advisor)
  - 2.6 explain three composed expressions
  - 2.7 RA on the employee database
  - 2.8 RA on the bank database ("names of all branches located in Chicago"; "borrowers who have a loan in branch Downtown")

  — [6th-ed. Ch. 2 solutions](https://www.db-book.com/db6/practice-exer-dir/2s.pdf)
- **Official 2.6 answers:**
  - (a) σ_{year≥2009}(takes) ⋈ student: "For each student who takes at least one course in 2009, display the student's information along with the information about what courses the student took." The attributes are ID, name, dept_name, tot_cred, course_id, sec_id, semester, year, grade.
  - (b) σ_{year≥2009}(takes ⋈ student): "Same as (a); selection can be done before the join operation."
  - (c) Π_{ID,name,course_id}(student ⋈ takes): a list of ID, name, course_id "of all students who took any course in the university."

  — [6th-ed. Ch. 2 solutions](https://www.db-book.com/db6/practice-exer-dir/2s.pdf)
- **Official 2.5 answer:** the result has all of student's attributes followed by s_id and i_id. "Students who do not have an advisor will not appear in the result. A student who has more than one advisor will appear a corresponding number of times." — [6th-ed. Ch. 2 solutions](https://www.db-book.com/db6/practice-exer-dir/2s.pdf)
- **Official 2.7 answer (6th ed.):** Π_name(σ_{city="Miami"}(employee)); Π_name(σ_{salary>100000}(employee)); Π_name(σ_{city="Miami" ∧ salary>100000}(employee)) — [6th-ed. Ch. 2 solutions](https://www.db-book.com/db6/practice-exer-dir/2s.pdf). **But** salary lives in *works*, not *employee*. The 7th-ed. answer fixes this: Π_person_name(σ_{salary>100000}(employee ⋈ works)) and Π_person_name(σ_{city="Miami" ∧ salary>100000}(employee ⋈ works)) — [7th-ed. Ch. 2 solutions](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/2.pdf)
- **Official 7th-ed. 2.8:**
  - (a) Employees not working for BigBank: Π_{ID,person_name}(employee) − Π_{ID,person_name}(employee ⋈_{employee.ID=works.ID}(σ_{company_name="BigBank"}(works))).
  - (b) Employees earning at least as much as everyone: Π_{ID,person_name}(employee) − Π_{A.ID,A.person_name}(ρ_A(employee) ⋈_{A.salary<B.salary} ρ_B(employee)), "since this involves comparing two employee salary values, we need to reference the employee relation twice and therefore use renaming."
  - 2.9 covers division (beyond the 6th-ed. Ch. 2).

  — [7th-ed. Ch. 2 solutions](https://www.db-book.com/Practice-Exercises/PDF-practice-solu-dir/2.pdf)

### Inferences
**Question types (my classification from the official sets plus the slide content), with the fastest way to answer each:**

| Type | Fast method |
|---|---|
| "Name / explain the problems of file systems" | R-D-I-I-A-C-S + one example each |
| "Explain data independence with an example" | Define physical (index example) and logical (view example); say why logical is harder. |
| "Schema or instance?" | Structure → schema; rows now → instance. |
| "Is X a superkey? Candidate key?" | Superkey: does it identify every tuple in *every legal* instance? Candidate: is it minimal? |
| "Identify all candidate keys" | Start from the real-world rules; find each minimal identifying set. |
| "From this instance, which cannot be keys?" | Duplicates on K → not a superkey; no duplicates → cannot conclude. |
| "FK violation examples" | Insert a child with a missing parent; delete a parent that still has children. |
| "Result of σ/Π/×/⋈ on a small table" | Work row by row; remember Π removes dups; × size = product; ⋈ matches on *all* common attributes. |
| "Write RA (and SQL)" | Σ-then-Π skeleton: Π_{wanted}(σ_{conditions}(join of needed relations)). |

**20 practice questions with answers.** "Official" = an authors' practice exercise. "Constructed" = mine, with numerical answers verified on the official data or by enumeration.

**P1. (Recall) Name the seven problems of file-processing systems. Which one is "constraints buried in program code"?**
*Answer:* Redundancy & inconsistency, difficulty in accessing data, data isolation, integrity problems, atomicity problems, concurrent-access anomalies, security problems. "Buried constraints" is the **integrity problem**.

**P2. (Scenario) (a) A transfer debits account A, then the system crashes before crediting B. (b) Two clerks both read a balance of 100 and each withdraws 50; the final balance is 50. Name each problem and the DBMS component that prevents it.**
*Answer:*
- (a) **Atomicity** problem. The transaction-management component (recovery) makes the transfer all-or-nothing.
- (b) **Concurrent-access anomaly** (a lost update). The **concurrency-control manager** prevents it.

These are both slide examples.

**P3. (Explain) Explain physical vs. logical data independence with one example each. Which is harder, and why?**
*Answer:*
- **Physical:** change the physical schema without changing the logical schema. Example: add an index on instructor(dept_name) or reorganize the files; queries stay the same.
- **Logical:** change the logical schema without changing views or applications. Example: add or split columns and give old programs a view with the old shape.
- **Logical is harder**, because applications are written against the logical schema.

**P4. (Classify) Schema or instance? (a) instructor(ID, name, dept_name, salary) (b) the 12 rows currently in instructor (c) inserting a new instructor changes the ___ (d) adding a phone attribute changes the ___.**
*Answer:* (a) schema; (b) instance; (c) instance; (d) logical schema.

**P5. (Match) Which component: (a) picks the lowest-cost evaluation plan; (b) records DDL definitions in the data dictionary; (c) executes the low-level plan; (d) checks authorization and integrity constraints; (e) controls the interaction among concurrent transactions?**
*Answer:* (a) DML compiler, as query optimization; (b) DDL interpreter; (c) query evaluation engine; (d) authorization and integrity manager, part of the storage manager; (e) concurrency-control manager.

**P6. (Classify) (a) MySQL Workbench sends SQL straight to the MySQL server. (b) A browser talks to a Java web application, which talks to MySQL. Which architecture is each? Who grants a new TA read access to grades?**
*Answer:* (a) two-tier; (b) three-tier, since the client makes no direct DB calls. The **DBA** grants authorization.

**P7. (Keys) For instructor(ID, name, dept_name, salary), where only ID is unique: is {ID, name} a superkey? A candidate key? How many superkeys are there?**
*Answer:* {ID, name} is a superkey but **not** a candidate key, because it is not minimal. There are **8** superkeys, one for every set containing ID (2³).

**P8. (Instance reasoning; constructed) emp(ID, name, email, dept) has these tuples: (1, Ali, ali@uni.uz, CS), (2, Bona, bona@uni.uz, CS), (3, Ali, ali2@uni.uz, EE), (4, Dilnoza, dil@uni.uz, EE). Using only this instance, which of {name}, {dept}, {name, dept}, {email} can you *prove* are not superkeys? Can you prove any of them *is* one?**
*Answer:*
- {name} (Ali repeats) and {dept} (CS and EE repeat) are **not** superkeys.
- {name, dept} and {email} have no duplicates *here*, but an instance can never prove a key (official 2.4 logic). Keys come from the rules, e.g., "emails are unique".

**P9. (Counting; constructed) R(A,B,C,D) has candidate keys {A} and {B,C}. How many superkeys does it have? Name one superkey that is not a candidate key, and one set that is not a superkey.**
*Answer:*
- **10** superkeys = 8 (containing A) + 4 (containing B,C) − 2 (containing A,B,C). Verified by enumeration.
- {A,B} is a superkey but not a candidate key.
- {B} is not a superkey.

**P10. (Official 2.2) Give an insert and a delete that violate the foreign key instructor.dept_name → department. Which relation is referencing and which is referenced? What does the official DDL do on the delete?**
*Answer:*
- Insert (10111, Ostrom, Economics, 110000) into instructor when there is no Economics department.
- Delete (Biology, Watson, 90000) from department while instructors or students are still in Biology.
- instructor is *referencing*; department is *referenced*.
- The official DDL has `on delete set null`, so the delete is allowed and the dependents' dept_name becomes null.

**P11. (Official 2.3) Why are day and start_time part of time_slot's primary key, but not end_time?**
*Answer:* A time slot can meet on several days, and even more than once a day, so day and start_time are needed to identify a meeting. Given the slot, day and start time, the end time is determined, so adding it would add nothing.

**P12. (Constructed, from the official data) Why does takes' primary key include semester and year?**
*Answer:* A student can take the same course again in a different term. In the official data, 45678 Levy took CS-101 in Fall 2009 (F) and in Spring 2010 (B+). With PK (ID, course_id, sec_id) alone, the second tuple would violate the key.

**P13. (Official 2.1) Choose primary keys for employee(person_name, street, city), works(person_name, company_name, salary), company(company_name, city).**
*Answer:* person_name, person_name and company_name respectively. The official 6th-ed. answer underlines these, which implies each person works for one company. With the 7th-ed. schema, which has ID, the answer is ID, ID, company_name.

**P14. (Compute; constructed) r(A,B,C,D) = {(α,α,1,7), (α,β,5,7), (β,β,12,3), (β,β,23,10)}. Compute σ_{A=B ∧ D>5}(r). For p(A,B,C) = {(α,10,1), (α,20,1), (β,30,1), (β,40,2)}, how many tuples does Π_{A,C}(p) have, and how many rows does `SELECT A, C FROM p` return?**
*Answer:*
- σ gives {(α,α,1,7), (β,β,23,10)}.
- Π gives **3** tuples. SQL without DISTINCT returns **4** rows. Both were verified.

**P15. (Arity/size; official data) instructor has 12 tuples and 4 attributes; teaches has 15 tuples and 5 attributes. Give the arity and size of instructor × teaches and of instructor ⋈ teaches.**
*Answer:*
- instructor × teaches: 9 attributes (with instructor.ID and teaches.ID), **180** tuples.
- instructor ⋈ teaches: 8 attributes, **15** tuples. Each teaches tuple matches exactly one instructor, because teaches.ID is a FK to instructor's PK.

These are verified counts.

**P16. (Official 2.5) What is σ_{s_id=ID}(student × advisor)?**
*Answer:*
- Each student who has an advisor appears with their advisor pair. Students without an advisor disappear, and a student with k advisors would appear k times.
- On the official data the product has **117** tuples (13 × 9) and the selection keeps **9**.
- The 4 students without an advisor are 19991 Brandt, 54321 Williams, 55739 Sanchez and 70557 Snow.

**P17. (Official 2.6) Explain (a) σ_{year≥2009}(takes) ⋈ student, (b) σ_{year≥2009}(takes ⋈ student), (c) Π_{ID,name,course_id}(student ⋈ takes).**
*Answer:*
- (a) and (b) are equivalent: each student with a course in or after 2009, together with that course information. Selection can be pushed before the join.
- (c) gives (ID, name, course_id) for every course any student took. On the official data it has 21 tuples rather than 22 rows, because Levy's repeated CS-101 collapses into one tuple.

**P18. (Write RA + SQL) (a) Names of Physics instructors earning more than 90000. (b) Course IDs offered in Fall 2009 but not in Spring 2010.**
*Answer:*
- (a) Π_name(σ_{dept_name="Physics" ∧ salary>90000}(instructor)) → {Einstein}. SQL: `SELECT DISTINCT name FROM instructor WHERE dept_name='Physics' AND salary>90000;`
- (b) Π_course_id(σ_{semester="Fall" ∧ year=2009}(section)) − Π_course_id(σ_{semester="Spring" ∧ year=2010}(section)) → {CS-347, PHY-101}. In MySQL ≥ 8.0.31 use `EXCEPT`; on older versions use `… AND course_id NOT IN (SELECT course_id FROM section WHERE semester='Spring' AND year=2010)`.

**P19. (Difference + rename) (a) Find the IDs of instructors who teach no section. (b) Find the highest-paid instructor using only basic operators.**
*Answer:*
- (a) Π_ID(instructor) − Π_ID(teaches) → {33456, 58583, 76543}.
- (b) Π_{ID,name}(instructor) − Π_{A.ID,A.name}(σ_{A.salary<B.salary}(ρ_A(instructor) × ρ_B(instructor))) → Einstein. ρ is needed so the relation can be compared with itself. This mirrors official 7th-ed. 2.8(b).

**P20. (Traps) (a) What is wrong with Π_{name,title}(student ⋈ takes ⋈ course), and how do you fix it? (b) Which of σ, Π, ∪, ∩, −, ×, ρ is *not* a basic operator?**
*Answer:*
- (a) ⋈ also equates student.dept_name with course.dept_name, so courses taken outside the student's own department are lost. On the official data it returns 17 pairs instead of 21, losing Levy's and Bourikas's Comp. Sci. courses.
  - Fix: Π_{name,title}(student ⋈ takes ⋈ Π_{course_id,title}(course)), or use a θ-join on course_id.
- (b) **∩** is not basic: r ∩ s = r − (r − s).

**Rapid-fire true/false (answers in brackets):**
1. A relation can contain two identical tuples. [F; a relation is a set]
2. Every candidate key is a superkey. [T]
3. Every superkey is a candidate key. [F]
4. Natural join of relations with no common attributes = their Cartesian product. [T]
5. Relational algebra is Turing-complete. [F]
6. SQL `SELECT` removes duplicates by default. [F; you need `DISTINCT`]
7. A foreign-key attribute may be null. [T in SQL; see `on delete set null`]
8. Physical data independence lets you change the logical schema without changing applications. [F; that is logical DI]
9. The E-R model is mainly used for database design. [T]
10. SQL is a procedural language. [F; it is declarative/non-procedural]

### Gaps
- No past quizzes or answer keys from this course (SOC3020, Prof. Agostini) were available, and the student keeps class material separate by design. The format of Quiz #2 (MCQ vs. written) is unknown.
- Within the tool budget I found no public .edu past exam with answer key that follows Silberschatz Ch. 1–2 closely. The official practice exercises above are the closest authoritative substitute.

## 12. Best free (legal) resources for these chapters

### Takeaway
For this course, the highest-value free resources, in priority order, are:
1. The authors' **official practice-exercise solutions** (6th ed. Ch. 1, 2 and 6).
2. The **official slides** (6th-ed. PPT, 7th-ed. PDF).
3. The **official university DDL (incl. a MySQL version) and sample data**, to rerun every example in the MySQL lab.
4. **CMU 15-445 Lecture #01 notes**: 4 pages, the best one-shot summary of the relational model and algebra.
5. **Berkeley CS186 notes** and **Stanford's Widom course on edX** for extra relational algebra practice.

### Cited Findings
- 6th-ed. practice-exercise solutions, per chapter: `1s.pdf` (Ch. 1), `2s.pdf` (Ch. 2), `6s.pdf` (formal relational algebra, 8 pp.) — [db-book.com 6th-ed. practice exercises index](https://www.db-book.com/db6/practice-exer-dir/index.html)
- 7th-ed. practice-exercise solutions (Ch. 2's include extra RA with rename/difference and division) — [db-book.com 7th-ed. practice solutions index](https://www.db-book.com/Practice-Exercises/index-solu.html)
- 6th-ed. slides. The index links PPT files on the Yale mirror and zip bundles; direct `PDF-dir/chN.pdf` links for the 6th ed. returned 404 when tested. — [6th-ed. slide index](https://www.db-book.com/db6/slide-dir/index.html)
- 7th-ed. slides as PDF and PPTX per chapter — [7th-ed. slide index](https://www.db-book.com/slides-dir/index.html)
- Official university schema `DDL.sql`, **`DDL-MySQL.sql`**, `smallRelationsInsertFile.sql` and `largeRelationsInsertFile.sql` — [6th-ed. sample tables](https://www.db-book.com/db6/lab-dir/sample_tables-dir/index.html); 7th-ed. equivalents: [7th-ed. sample tables](https://www.db-book.com/university-lab-dir/sample_tables-dir/index.html)
- CMU 15-445/645 (Andy Pavlo) Lecture #01 "Relational Model & Relational Algebra" notes, Fall 2019 — [PDF](https://15445.courses.cs.cmu.edu/fall2019/notes/01-introduction.pdf); Fall 2025 slides for the same lecture are online (HTTP 200, not inspected) — [PDF](https://15445.courses.cs.cmu.edu/fall2025/slides/01-relationalmodel.pdf)
- UC Berkeley CS186 course notes include "Relational Algebra", "SQL Part 1 - Basic Queries" and "SQL Part 2 - Joins & Subqueries" — [cs186berkeley.net/notes](https://cs186berkeley.net/notes/)
- Stanford (Jennifer Widom) Databases series on edX, auditable free: "Databases: Introduction to Relational Databases" — [edX](https://www.edx.org/learn/computer-programming/stanford-university-databases-1-introduction-to-relational-databases); relational algebra is in "Databases: Modeling and Theory" — [edX](https://www.edx.org/learn/databases/stanford-university-databases-modeling-and-theory). The course structure and free-audit claim come from search-result listings, e.g. [KDnuggets](https://www.kdnuggets.com/5-free-university-courses-to-learn-databases-and-sql); I only confirmed that both edX pages load.
- Elmasri & Navathe-style three-schema architecture and data-independence slides — [U. Waterloo CS338](https://cs.uwaterloo.ca/~tozsu/courses/CS338/lectures/14%20DB%20System.pdf)
- MySQL set operators (8.0.31+) — [INTERSECT](https://dev.mysql.com/doc/refman/8.0/en/intersect.html), [EXCEPT](https://dev.mysql.com/doc/refman/8.0/en/except.html)

### Inferences
- **Study plan for Quiz #2 (Fri 23 Oct) and the week-8 midterm**, inferred from the official exercise emphasis:
  1. **Keys + university schema PKs/FKs** (§8–9): highest yield, the most official exercises.
  2. **σ/Π/×/⋈/∪/−/∩/ρ on small tables plus writing RA** (§10): know each trap.
  3. **The seven file-system problems** and **data independence** (§1–2): classic short answers.
  4. **Languages, engine components, users/DBA, architectures** (§4–6): MCQ material.
  5. **History**: low weight; remember Codd 1970, System R, Ingres, SQL in the 1980s, NoSQL in the 2000s.
- **Hands-on drill for the MySQL lab:** load `DDL-MySQL.sql` and `smallRelationsInsertFile.sql`, then reproduce P14–P20. Run `SELECT VERSION();` first to see whether `INTERSECT`/`EXCEPT` are available (8.0.31+).

### Gaps
- I did not inspect the content of Stanford CS145's current site ([web.stanford.edu/class/cs145](https://web.stanford.edu/class/cs145/), HTTP 200) or the db-book "SQL.js" in-browser page ([link](https://www.db-book.com/university-lab-dir/sqljs.html), HTTP 200), so I make no claims about what they contain.
- GeeksforGeeks and Tutorialspoint were not needed. Every definition above is taken from the authors' own slides and solutions.
