# Database homework assignments: what they ask (class material)

> Track A (class material). This summarizes the professor's own homework PDFs in this folder. It adds no outside content.

## ⏰ HW #2: due **Tue 20 Oct 2026, 12:00 noon** (system clock, strict)
- **If it is late or not submitted, the mark is 0 AND you are not admitted to Quiz #2** (Fri 23 Oct).
- **Teams of 1–3** students. A team of 4 or more is not admitted to Quiz #2. One "team leader" uploads **one zip**.
- **LaTeX is mandatory** (Overleaf is fine). The cover lists names, IDs and sections in increasing ID order, with the uploader's name **underlined**.
- **Zip contents and naming** use the format `00X-ID` (e.g. `001-U2310123`; 00X = the uploader's section, ID = the uploader's ID):
  1. `.tex` source
  2. compiled `.pdf`
  3. folder of images (if any)
  4. `00X-ID-DDL.sql`
  5. `00X-ID-DML.sql`
- **Plagiarism:** 0/100 for all teammates and no entry to the next quiz. You may not copy LaTeX, diagrams or code from others or the web.
- **AI tools ARE allowed, but you must:**
  1. declare the tool and model at the start of each exercise or subtask where you used it (e.g. "Claude, Anthropic, claude-opus-5-5"), and
  2. include the prompt and the **complete prompt history**.
- The `.sql` files must be **neat and commented by you, not by AI**, with no MySQL auto-generated/exported system code.

### Exercises
1. **E-R → logical schema in 3NF.**
   - **Input:** an E-R diagram with (min,max) constraints, set in the IT Park domain. Its entity sets are Legal Entity, IT Park Resident, Office Space, Residency Application, IT Activity, Project, Business Plan, Startup, Startup Program, Mentor, IT Park, IT Event, IT Park Branch and IT Service.
   - **Task:** produce an *optimized* 3NF relational schema.
   - **Attributes:** add at least 2 attributes to each relation that comes from an entity set. Of these, **2 must be multivalued** and **at least 2 must be composite**.
   - **Notation:** use the notation of the Company DB 3NF schema (see below).
   - **(min,max) constraints may NOT be ignored.**
2. **Write the schema in SQL-92.**
   - List every table using LaTeX `listings` (SQL), and explain how each table models its (min,max) constraints using UNIQUE / PRIMARY KEY / FOREIGN KEY / NOT NULL.
   - For cardinalities you can't model that way, AI may generate extra code such as **triggers** (declare it).
3. **MySQL.**
   - Create the schema **`DB-HW2`** and import the tables (fix the syntax for MySQL).
   - Save them as `00X-ID-DDL.sql`.
   - Insert **10 rows per table** and save the INSERT statements as `00X-ID-DML.sql`.

> **FINAL REMARK in the PDF: "Be ready to complete any part of the tasks described above during an in-class quiz."**
> So Quiz #2 can ask you, alone and on the clock, to:
> - map an E-R fragment with (min,max) to 3NF relations (handling composite and multivalued attributes and FKs);
> - write `CREATE TABLE` statements with PK/FK/UNIQUE/NOT NULL that enforce the constraints;
> - write a simple trigger idea;
> - write `INSERT … VALUES` rows.

## HW #1 (weeks 2–4, closed 6 Oct; it was the basis for Quiz #1)
1. Pick one of 10 global tech websites (TechCrunch, The Verge, Wired, …) and "reverse-engineer" its data. Draw an **E-R diagram with ≥ 4 entity sets**, each connected to a relationship set (a diamond), with a primary key for each entity set. Add (min,max) constraints using common sense. Use the notation of **Figure 1** (the Company DB E-R diagram).
2. Pick one of 10 Uzbek tech websites (IT Park, Kun.uz, Gazeta.uz, …), reverse-engineer it, and draw a **3NF logical schema with ≥ 4 relations**, each linked by a PK → FK arrow. Use the notation of **Figure 2** (the Company DB 3NF schema). (min,max) constraints may be ignored here.

## The professor's notation (from the figures in the homework PDFs)

### E-R diagram (HW1 Figure 1, Company DB)
- **Entity sets:** Employee (Ssn, Bdate, Name → Fname/Lname composite, Address), Department (Name, {Location} multivalued, Num_of_empl() derived), Project (Number, Name, Location), Dependent (Name, Relationship; weak, owned by Employee).
- **Relationship sets and (min,max):**
  - works_for: Employee (0,\*) … Department (0,1)
  - manage: Employee (0,1) … Department (1,1), with the attribute start_date
  - controls: Department (0,5) … Project (1,1)
  - works_on: Employee (0,M) … Project (1,N), with the attribute hours
  - supervision (recursive on Employee): roles supervisor (0,\*) and supervisee (0,1)
  - have: Employee (0,\*) … Dependent (1,1)

  These are as printed in the HW1 figure. Check the exact placement against the slide version (Week 3, slides ~92–94 / Week 4, slides 6–7).
- **Notation:**
  - multivalued attribute in braces `{Location}`;
  - derived attribute with `()` as in `Num_of_empl()`;
  - composite attribute shown as an indented sub-list.

### 3NF logical schema (HW2 Figure 1 / HW1 Figure 2)
- Each relation is a box listing its attributes, with the **PK** first and **FKs marked `(FK)`**:
  - **Employee**(Ssn, Bdate, Name_Fname, Name_Lname, Address, wf_D_Name (FK), Supervisor_Ssn (FK))
  - **Department**(Name, m_E_Ssn (FK), m_start_date, Num_of_empl)
  - **D_Locations**(Location, D_Name (FK)): the multivalued attribute becomes its own relation
  - **works_on**(E_Ssn (FK), P_Number (FK), hours): an M:N relationship becomes its own relation
  - **Project**(Number, Name, Location, c_D_Name (FK))
  - **Dependent**(Name, Relationship, E_Ssn (FK))
- **Composite attributes are flattened** with prefixes: `Name_Fname`, `Name_Lname`.
- **FK names carry the relationship's initials as a prefix:** `wf_` = works_for, `m_` = manages, `c_` = controls. Relationship attributes take the same prefix (`m_start_date`).
- **Arrows between boxes** carry the relationship name in parentheses, e.g. `(manages)`, `(works_for)`, `(has)`, `(controls)`, `(supervision)`, `(dependents_of)`, plus the (min,max) at each end.
