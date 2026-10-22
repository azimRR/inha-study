# Week 3, part 1 (slides 1–44) — Conceptual design & E-R model basics (CLASS NOTES — from slides only)

> Source: W3L1L2.pdf, slides 1–44 of 99. [S#] = the "n / 99" footer number.
> Title and divider slides have no footer; their [S#] is their position in the deck (same as the image file number `slide-0NN.png`).
> **Track A only.** Everything below comes from the slides (text + pictures). Nothing comes from the textbook or the web.
> Symbols: ⭐ = professor emphasis (red/boxed/highlighted text, questions to the class, "cf."), ⚠️ = apparent slide typo, 🔎 = not explained on these slides → look it up in Track B.
> Underlined attribute names on the slides are written here as <u>like_this</u>.
> Slides 45–99 (Data Constraints, Weak Entities, Company DB example, LAB #1) are in the part 2 notes.

---

## 1. Big picture

- **What this lecture is:** "Database Design: The E-R Data Model", code W3.L1L2[LAB#1] [S2]. It has an 8-item outline [S3]. Slides 1–44 cover items 1–4: *From Previous Week* (only an open "Any question from you?" slide with no recap content [S4]), *Conceptual Data Design*, *Data and Data Relationships*, and *Data Semantics*.
- **Conceptual database design is Phase 2** of DB design. It comes right after requirements collection and analysis (Phase 1) [S6, S8]. The designer picks a data model and "translates the specified requirements into a conceptual schema (view) of the database" [S11].
- **Requirements arrive as sentences** of the form NOUN ("SUBJECT") – VERB – NOUN ("OBJECT"). Nouns become sets of entities. Verbs, with their modality (must / can / may), become relationships [S9–S10].
- **A data model describes 3 things:** data and data relationships, data semantics, and data constraints [S12–S13]. These are exactly outline items 3, 4 and 5. The relational model is "attributes and tables = sets of rows" (Codd, 1970). The E-R model is "attributes of entities and relationships" (Chen, 1976) [S12–S18].
- **From tables to E-R:** a column such as `dept_name` inside the `instructor` table "represents a relationship" [S19]. In the E-R diagram it becomes a relationship set (diamond) between entity sets (rectangles) [S20].
- **The E-R model has 3 basic concepts:** entity set, relationship set, and attribute (of entity and/or relationship sets). E-R diagrams express the logical structure of a DB graphically [S23]. The textbook (T) says "entity/relationship **set**"; the reference book (R) says "entity/relationship **type**" [S24].
- **Attributes:** each has a domain. The types are simple/composite, single-valued/multivalued (written `{phone_number}`) and derived (written `age ( )`), and a value may be null. A subset of attributes forms the primary key, shown underlined [S28–S32].
- **Relationship sets:** a relationship set is a set of (e1, …, en) with each ei ∈ Ei, among n ≥ 2 entities. Its degree is the number of participating entity sets. It can have attributes (`date`), be ternary (`proj_guide`), or be unary with roles (`prereq`) [S34–S41].
- **Data semantics:** the attribute's type gives its meaning. That meaning is "grounded" into data types, which depend on the DBMS. Null means "unknown" or "does not exist" [S44].

---

## 2. Slide-by-slide notes

### [S1] Title slide — Database (SOC-3020), Week 3
- "Database (SOC-3020)", by Alessandro Agostini (¹LDKR-Group, School of Computer and Information Engineering, Inha University in Tashkent (IUT), Uzbekistan; ²DISI, University of Trento, Italy). Emails: aagostini@inha.ac.kr, agostini@disi.unitn.it. Marked "WEEK 3". The slide also shows a photo of the IUT building, the LDKR logo and the IUT seal.

### [S2] Lecture title — Database Design: The E-R Data Model
- "DATABASE — **Database Design: The E-R Data Model** — WEEK 3 — Code: W3.L1L2[LAB#1]". A panoramic photo of a historic town square runs across the top.
- "LAB#1" in the code matches outline item 8, "LAB #1 : E-R Diagramming" [S3] (covered in part 2).

### [S3] Outline (full list, nothing greyed out)
1. From Previous Week · 2. Conceptual Data Design · 3. Data and Data Relationships · 4. Data Semantics · 5. Data Constraints · 6. Entity Integrity *Revised*: Weak Entities · 7. Example: Company DB · 8. LAB #1 : E-R Diagramming.
- This part (S1–S44) covers items 1–4.

### [S4] "Any question from you? …"
- This is the only slide of section 1, "From Previous Week". **It has no recap content.** The floor is simply opened for questions.
- ⭐ Question to the class.

### [S5] Outline — item 2 "Conceptual Data Design" highlighted (all other items greyed out).

### [S6] Section title: *Conceptual* Data Design — "Phase 2 of Database System Development"
- ⭐ The word "*Conceptual*" is in **red italic**.

### [S7] Designer in Software Life Cycle
- **Diagram:** a staircase of grey boxes, each linked to the next by a black arrow: **Development → Requirements analysis → Design → Implementation → Testing →** (the last arrow runs off the picture).
- ⭐ Highlighting on the picture:
  - a **red box** surrounds both "Requirements analysis" and "Design";
  - a **blue box** surrounds "Design" alone;
  - a **blue arrow goes backwards**, from Design up to Requirements analysis, against the black arrows.
  - The title word "**Designer**" is in red.
- Reading the picture: the designer's area is the red block (requirements analysis + design), centred on Design (blue). The blue arrow shows that design can loop back to requirements analysis.
- 🔎 Look up in Track B: the software life-cycle model drawn in this staircase.

### [S8] DB Design: Main Steps
- The cover of the **reference book (R)**, *Fundamentals of Database Systems* (Elmasri • Navathe), is shown in the corner.
- "Heart of the database development process:"
  1. **Requirements collection and analysis (Phase 1)**
  2. ⭐ **Conceptual database design** (Phase 2) ← the step name is in **red**
  3. **Choice of DBMS**
  4. **Logical design (or: data model mapping) (Phase 4)**
  5. **Physical design (Phase 5)**
  6. **System implementation and tuning ("re-design")**
- Observation: steps 3 and 6 have no "(Phase n)" label on the slide.
- 🔎 Look up in Track B: what each step involves (the slide only names them).

### [S9] List of Sentences
- Quote: "After the Requirements Phase you shall have a list of sentences of this form:
  **NOUN ("SUBJECT") – VERB – NOUN ("OBJECT")**
  about the application scenario on target, where a NOUN represents a set of "entities" that you need information about (**by querying**), and a VERB (or verb phrase, for example: *member of*, *for*, *seat-on*, etc.) represents "relationships" between entities."
- **Example:**
  1. STUDENTS – (**MUST**) REGISTER TO – CLASS
  2. STUDENTS – (**CAN**) HAVE MAXIMUM TWO – ADVISORS
  3. PERSON – (**MAY**) OWN A CAR / (**MAY**) BELONG TO – POLITICALPARTY
  4. ...
- ⭐ The modal words **MUST / CAN / MAY are in red**. "by querying" is in **bold**.
- Typography: the slide uses small caps. The nouns have a capital initial (Students, Class, Advisors, Person, political**P**arty), while the verb phrases are all lower case ("register to", "have maximum two", "own a car", "belong to").
- In sentence 3, a "/" joins **two verb phrases with the same subject** PERSON. "a car" is written inside the first verb phrase.
- (Worked step by step in §5.1.)

### [S10] Example
- The cover of reference book (R), Elmasri • Navathe, is shown again.
- ⭐ An orange box holds: **noun ("subject") — verb\* — noun ("object")**. The asterisk is blue. A red footnote says: "**\* with its "modality" (modal verbs)**".
- Red labels: "**Parent Entity Set**" sits above the subject side (EMPLOYEE); "**Child Entity Set**" sits above the object side (DEPARTMENT).
- **Diagram (sets drawn as ellipses, with their members inside):**
  - **EMPLOYEE** (left ellipse): e1, e2, e3, e4, e5, e6, e7, … (dots)
  - **MANAGES** (middle ellipse): r1, r2, r3, … (small black squares)
  - **DEPARTMENT** (right ellipse): d1, d2, d3, … (dots)
  - Lines (each square joins one employee to one department):

    | MANAGES member | Employee | Department |
    |---|---|---|
    | r1 | e3 | d1 |
    | r2 | e6 | d2 |
    | r3 | e5 | d3 |

  - e1, e2, e4 and e7 have no line. Each department shown (d1, d2, d3) is linked to exactly one employee.
- So the sentence reads: EMPLOYEE (subject, parent entity set) – MANAGES (verb) – DEPARTMENT (object, child entity set).
- 🔎 Look up in Track B: what "parent" vs "child" entity set means, and how the modality of a verb is captured in an E-R design. Slides 1–44 do not explain either.

### [S11] Remember: The starting point… *(sub-section "Decisions to Take in Data Design")*
- ⭐ "**Conceptual Design:** The designer <ins>refers to data models</ins>, and by applying the concepts of the chosen model, <ins>translates the specified requirements into a conceptual schema (view)</ins> of the database."
  - On the slide, "Conceptual Design:" is red, "refers to data models" is orange and underlined, and "translates … (view)" is blue and underlined.
- "So, there is a direct correspondence between requirements and (conceptual) design."
- ⭐ "In particular, conceptual design is easier if the previous phase of **<ins>requirements analysis</ins>** is carried by a data model in mind." ("requirements analysis" is red, bold and underlined.)
- ⭐ Picture: a thumbnail of a paper labelled "**(Chen, 1983)**", with a **blue arrow** pointing to "a data model in mind". When zoomed, the thumbnail reads: *Information Sciences* 29, 127–149 (1983), "**English Sentence Structure and Entity-Relationship Diagrams**", Peter Pin-Shan Chen, Graduate School of Management, University of California, Los Angeles. Its abstract is too small to read.
  - The title links English sentences to E-R diagrams, which is the same idea as the "List of Sentences" on S9.
- ⚠️ "is carried by a data model in mind" probably means "is carried **out with** a data model in mind".

### [S12] Data Models - The Relational Model
- ⭐ "A **data model** is a collection of tools for describing" the following three items. They sit in a **light-blue highlighted box**:
  - Data and Data relationships
  - Data semantics
  - Data constraints
- "**Relational model** (*attributes* and *tables = sets of rows*)". "Relational model" is blue; *attributes* and *tables = sets of rows* are red italic.

### [S13] Data Models - The E-R Model
- The same three bullets as S12 (same blue box), plus:
  - "Relational model (*attributes* and *tables* = *sets of rows*)" (now black)
  - ⭐ "**E-R model** (*attributes of entities* and *relationships*)". "E-R model" is blue; *attributes of entities* and *relationships* are red italic.
- Observation: the three bullets are the same as outline items 3–5 [S3]. The lecture is organised around these three things a data model describes.

### [S14] Section divider: The E-R Model
- "**The E-R Model** — i.e.: The **E**ntity-**R**elationship Data Model" (the letters E and R are red).
- ⭐ "*cf.* **Chapter 7 T, sections 7.1–7.5**". This is the textbook reading; the cover of *Database System Concepts*, Sixth Edition, is shown.

### [S15] *Premise*: Codd's Model (1970) *(sub-section "The E-R Model: Introduction")*
- ⭐ "**<ins>Suggested reading (non-technical parts)</ins>:**"
```
@Article{Codd70cacm,
  author  = "E. F. Codd",
  title   = "A Relational Model of Data for Large Shared Data Banks",
  journal = "Communications of the ACM",
  year    = "1970",
  volume  = "13",
  number  = "6",
  pages   = "377--387"
}
```
- A thumbnail of the paper's first page is shown. Its title and "E. F. Codd, IBM Research Laboratory, San Jose, California" are readable; the body text is not.

### [S16] Chen's Model (1976)
- ⭐ "**<ins>Suggested reading (non-technical parts)</ins>:**"
```
@Article{Chen76tods,
  author  = "Peter Pin-Shan Chen",
  title   = "The Entity-Relationship Model—Toward a Unified View of Data",
  journal = "ACM Transactions on Database Systems (TODS)",
  year    = "1976",
  month   = "March",
  volume  = "1",
  number  = "1",
  pages   = "9--36"
}
```
- ⭐ **Red boxes** highlight the journal, "ACM Transactions on Database Systems (TODS)", and the fields **volume "1", number "1", pages "9--36"**.
- A thumbnail of the first page is shown, with the title, "Peter Pin-Shan Chen" and "Massachusetts Institute of Technology".
- (Tiny glitch: the journal value closes with an opening quote mark, “…(TODS)“. It does not matter.)

### [S17] First page of Chen's paper (shown as an image)
- Header: "**The Entity-Relationship Model—Toward a Unified View of Data**", PETER PIN-SHAN CHEN, Massachusetts Institute of Technology.
- Abstract, word for word:
  > "A data model, called the entity-relationship model, is proposed. This model incorporates some of the important semantic information about the real world. A special diagrammatic technique is introduced as a tool for database design. An example of database design and description using the model and the diagrammatic technique is given. Some implications for data integrity, information retrieval, and data manipulation are discussed.
  > The entity-relationship model can be used as a basis for unification of different views of data: the network model, the relational model, and the entity set model. Semantic ambiguities in these models are analyzed. Possible ways to derive their views of data from the entity-relationship model are presented."
- "Key Words and Phrases: database design, logical view of data, semantics of data, data models, entity-relationship model, relational model, Data Base Task Group, network model, entity set model, data definition and manipulation, data integrity and consistency". "CR Categories: 3.50, 3.70, 4.33, 4.34".
- "1. INTRODUCTION" begins; the slide's bottom edge cuts off the rest.
- 🔎 Look up in Track B: "network model", "entity set model" and "Data Base Task Group". They are only named here.

### [S18] Chen's Model (*cont.*)
- Quotation in typewriter font:
  > "The logical view of data has been an important issue in recent years. Three major data models have been proposed: the network model …, the **relational model** …, and the entity set model…
  > These models have their own strengths and weaknesses.
  > …
  > This paper presents the entity-relationship model, which has most of the advantages of the above three models. **The entity-relationship model adopts the more natural view that the real world consists of *entities* and *relationships*.**" (Chen, 1976)
- ⭐ Colours: "relational model" is blue. The final sentence is blue, with "**entities**" and "**relationships**" in red.

### [S19] From Tables to Entity Sets
- "**Example:** Tables ("relations") in relational model:"
- **`instructor` table.** The `department` table overlaps its lower part, so rows 6–12 are only partly visible:

  | ID | name | ⭐dept_name (red box) | salary |
  |---|---|---|---|
  | 22222 | Einstein | Physics | 95000 |
  | 12121 | Wu | Finance | 90000 |
  | 32343 | El Said | History | 60000 |
  | 45565 | Katz | Comp. Sci. | 75000 |
  | 98345 | Kim | Elec. Eng. | 80000 |
  | *(covered)* | *(covered)* | …y | 72000 |
  | *(covered)* | *(covered)* | …Sci. | 65000 |
  | *(covered)* | *(covered)* | …y | 62000 |
  | *(covered)* | *(covered)* | …Sci. | 92000 |
  | *(covered)* | *(covered)* | *(covered)* | 40000 |
  | *(covered)* | *(covered)* | …s | 87000 |
  | *(covered)* | *(covered)* | …e | 80000 |

- **`department` table:**

  | ⭐dept_name (red box) | building | budget |
  |---|---|---|
  | Biology | Watson | 90000 |
  | Comp. Sci. | Taylor | 100000 |
  | Elec. Eng. | Taylor | 85000 |
  | Finance | Painter | 120000 |
  | History | Painter | 50000 |
  | Music | Packard | 80000 |
  | Physics | Watson | 70000 |

- ⭐ "**Note 1:** attribute *dept_name* is repeated". The `dept_name` header is boxed in red in both tables.
- ⭐ "**Note 2:** *dept_name* in *instructor* represents a relationship…"
- (S20 shows what this column becomes in the E-R diagram; see §5.3.)

### [S20] Relation *Schemas* versus E-R *Diagrams*
- The slide shows two pictures with a **big red arrow** from the left one to the right one. ⭐ Callout labels:
  - "**Relation**": a red arrow points to the `student` box on the left;
  - "**Entity set ("concepts")**": a blue arrow points to the `department` rectangle on the right;
  - "**Relationship set**": a blue arrow points to the `sec_class` diamond on the right.

**LEFT: relation schema diagram.** One box per relation, with the name in a light-blue band. Underlines are as shown on the slide. An arrowhead shows where each line ends.

| Relation | Attributes (underlined as on slide) | Lines leaving this box → box with the arrowhead |
|---|---|---|
| takes | <u>ID</u>, <u>course_id</u>, <u>sec_id</u>, <u>semester</u>, <u>year</u>, grade | → student (at ID); → section |
| student | <u>ID</u>, name, dept_name, tot_cred | → department |
| section | <u>course_id</u>, <u>sec_id</u>, <u>semester</u>, <u>year</u>, building, room_no, time_slot_id | → course; → classroom |
| course | <u>course_id</u>, title, dept_name, credits | → department |
| department | <u>dept_name</u>, building, budget | (receives 3 arrows: from student, course, instructor) |
| advisor | <u>s_id</u>, i_id | → student; → instructor |
| time_slot | <u>time_slot_id</u>, <u>day</u>, <u>start_time</u>, end_time | (no lines at all) |
| classroom | <u>building</u>, <u>room_no</u>, capacity | (receives the arrow from section) |
| prereq | <u>course_id</u>, <u>prereq_id</u> | → course |
| teaches | <u>ID</u>, <u>course_id</u>, <u>sec_id</u>, <u>semester</u>, <u>year</u> | → section; → instructor |
| instructor | <u>ID</u>, name, dept_name, salary | → department |

- 🔎 Look up in Track B: what the underlines and arrows of a relation *schema* diagram mean. Slides 1–44 do not explain them.

**RIGHT: E-R diagram.** Entity sets are rectangles with the name in a light-blue band; underline = primary key [S29]. Relationship sets are diamonds [S38].

*Entity sets:*

| Entity set | Attributes (<u>underlined</u> = primary key) | Shape |
|---|---|---|
| department | <u>dept_name</u>, building, budget | rectangle |
| instructor | <u>ID</u>, name, salary | rectangle |
| student | <u>ID</u>, name, tot_cred | rectangle |
| course | <u>course_id</u>, title, credits | rectangle |
| section | sec_id, semester, year: all three are underlined, but at this resolution the underline looks broken/dashed rather than solid (can't be confirmed) | **double-bordered** rectangle |
| time_slot | <u>time_slot_id</u>, <u>day</u>, <u>start_time</u>, end_time | rectangle |
| classroom | <u>building</u>, <u>room_number</u>, capacity | rectangle |

*Relationship sets (diamonds):*

| Relationship set | Connects | Line style at each end | Attribute |
|---|---|---|---|
| course_dept | course – department | **double line** to course; **arrow → department** | — |
| inst_dept | instructor – department | **double line** to instructor; **arrow → department** | — |
| stud_dept | student – department | **double line** to student; **arrow → department** | — |
| advisor | instructor – student | **arrow → instructor**; plain line to student | — |
| teaches | instructor – section | plain line to instructor; **double line** to section | — |
| takes | student – section | plain line to student; plain line to section | **grade** (in a small box, joined by a **dashed line**) |
| sec_course (**double-bordered diamond**) | section – course | **double line** to section; **arrow → course** | — |
| sec_time_slot | section – time_slot | **double line** to section; plain line to time_slot (no arrowhead visible) | — |
| sec_class | section – classroom | **double line** to section; **arrow → classroom** | — |
| prereq | course – course | two plain lines to course, labelled **course_id** and **prereq_id** | — |

- What the pair of pictures shows: the left side is in terms of relations (tables); the right side is in terms of entity sets ("concepts") and relationship sets. The step-by-step comparison is in §5.3.
- 🔎 Look up in Track B: the meaning of arrows, double lines, the double-bordered rectangle (`section`), the double-bordered diamond (`sec_course`) and a dashed underline in E-R diagrams. They are drawn here but not explained in slides 1–44.

### [S21] Outline — item 3 "Data and Data Relationships" highlighted.

### [S22] Section title: Data and Data Relationships — "or: How we ***structure*** data in the E-R Model"
- ⭐ "structure" is in red.
- ⭐ An orange hand-drawn box lists: • **Data and Data relationships** (in blue = the current topic) • **Data semantics** • **Data constraints** (for business rules).
  - New detail compared with S12: data constraints are "(for business rules)".

### [S23] E-R model -- Database Modeling *(sub-section "The E-R Model")*
- "The E-R model employs **three basic concepts**:" An orange curly brace groups the three:
  - entity set,
  - relationship set,
  - attribute (of entity and/or relationship sets).
- ⭐ "The E-R model has an associated **diagrammatic representation** (blue), the **E-R diagrams** (red), which allows to express the logical structure of a DB graphically."

### [S24] Remark on Terminology
- "Terminology in Textbook (T) and Reference book (R):" The two covers are shown: T = *Database System Concepts*, Sixth Edition; R = *Fundamentals of Database Systems*, Sixth Edition, Elmasri • Navathe.

  | Textbook (T) | Reference book (R) |
  |---|---|
  | **entity set** | **entity type** |
  | **relationship set** | **relationship type** |

- Quote: "An **entity set** in T is **entity type** in R." / "A **relationship set** in T is **relationship type** in R."

### [S25] Divider: **Entity Sets** — "or, equivalently: Entity Types"

### [S26] Entities and Entity Sets (Types) *(sub-section "Entity Sets")*
- "An **entity** is a "thing" or "object" that exists and is distinguishable from other things and objects."
  - <ins>Example</ins>: a person, company, event, plant
- "An **entity set (or type)** is a set of entities of same type that share the same properties (or: attributes)."
  - <ins>Example</ins>: set of persons, companies, trees, holidays
- "The **extension** of an entity set is the actual collection of entities belonging to the entity set."
  - <ins>Example</ins>: actual instructors form the extension of the entity set *instructor*.
- ⭐ "entity" and "entity set (or type)" are in bold blue; "extension" is in bold cyan.

### [S27] Entity Sets (Types) - Example
- "The extension of entity sets *instructor* and *student*:" Each is drawn as a framed list of two-field rows. **The slide shows no column headers.**

  | *instructor*: 1st field | 2nd field |
  |---|---|
  | 76766 | Crick |
  | 45565 | Katz |
  | 10101 | Srinivasan |
  | 98345 | Kim |
  | 76543 | Singh |
  | 22222 | Einstein |

  | *student*: 1st field | 2nd field |
  |---|---|
  | 98988 | Tanaka |
  | 12345 | Shankar |
  | 00128 | Zhang |
  | 76543 | Brown |
  | 76653 | Aoi |
  | 23121 | Chavez |
  | 44553 | Peltier |

- So the extension of *instructor* has 6 entities and the extension of *student* has 7 [S26 definition].
- Observation: the value 76543 appears in both lists (Singh in *instructor*, Brown in *student*).

### [S28] Entity Sets (Types) - Attributes
- A small picture of the *student* extension (as on S27) is shown on the left.
- "An entity set (type) is defined by a unique name and a set of **attributes**; i.e., descriptive properties possessed by <ins>all</ins> members of the set."
  - <ins>Example</ins>: Textual notation for entity sets *instructor* and *course*:
    - ***instructor** (ID, name, street, city, salary)*
    - ***course** (course_id, title, credits)*
- ⭐ "***NB***: *what* attributes to capture in the database is basically a <ins>business-based</ins> design decision." ("NB: what" is in red.)
- "Attributes have a **value** (instance of the attribute)". "instance" is red.
- "A subset of attributes forms a **primary key** of the entity set and uniquely identifies an entity in the set."
- Observation: this textual *instructor* has street and city, while the *instructor* rectangle on S29 has ID, name, salary. That fits the NB: which attributes to capture is a design decision.

### [S29] Entity Sets: Diagramming
- "Entities can be represented graphically as follows:
  - **Rectangles represent entity sets.**
  - **Attributes listed inside entity rectangle**
  - **Underline indicates primary key attributes**"
- Diagram:
  - **instructor**: <u>ID</u>, name, salary
  - **student**: <u>ID</u>, name, tot_cred
  - Each rectangle has its name in a light-blue top band and the attributes listed below it.

### [S30] More on Attributes
- "An attribute's **domain** is the set of permitted values for the attribute"
- "Attribute types:
  - **Simple** and **composite** attributes.
  - **Single-valued** and **multivalued** attributes
    - <ins>Example</ins>: multivalued attribute: *phone_number*
  - **Derived** attributes
    - Can be computed from other attributes
    - <ins>Example</ins>: *age*, given *date_of_birth*
  - Attributes may have value *null*"
- ⭐ A red callout with an arrow pointing at *phone_number* says "**Notation : {phone_number}**". Curly braces mark a multivalued attribute.
- 🔎 Look up in Track B: formal definitions of simple vs composite and single-valued vs multivalued. The slides give only the names, examples and notation.

### [S31] Composite Attributes
- It repeats: "An attribute's **domain** is the set of permitted values for the attribute"; "Attribute types: **Simple** and **composite** attributes."
- **Tree diagram.** The left margin labels the top level "composite attributes" and the lower levels "component attributes".
  - **name** → first_name, middle_initial, last_name
  - **address** → street, city, state, postal_code
    - **street** → street_number, street_name, apartment_number
- Reading the tree: `street` is a component of `address` and is itself composite (it has 3 components).

### [S32] Attributes of Entity Sets: Diagramming
- "Attributes representation:" A list of attribute types, with ⭐ **red arrows** from each type to an example inside an **instructor** rectangle:

  | Attribute type (left list) | Arrow points to | How it is written in the rectangle |
  |---|---|---|
  | **Simple** and **key** ("key" in red) | ID | <u>ID</u> (underlined) |
  | **composite** (two arrows) | name, address | components indented under the attribute |
  | **multivalued** | { phone_number } | in **curly braces** |
  | **Derived** | age ( ) | followed by **"( )"** |

- The full **instructor** rectangle, top to bottom (indentation as on the slide):
```
instructor
  ID                 (underlined)
  name
     first_name
     middle_initial
     last_name
  address
     street
        street_number
        street_name
        apt_number
     city
     state
     zip
  { phone_number }
  date_of_birth
  age ( )
```
- `date_of_birth` has no arrow and no special marking. It is the attribute that `age` is computed from (S30 example).
- Observation: S31 says `apartment_number` and `postal_code`, while S32 says `apt_number` and `zip`. These are just different names in the two figures.

### [S33] Divider: **Relationship Sets** — "or, equivalently: Relationship Types"

### [S34] Relationship Sets (Types) *(sub-section "Relationship Sets")*
- "A **relationship** is an association among entities"
  - <ins>Example</ins>: *advisor*((22222,Einstein),(44553,Peltier))
- "A **relationship set (or type)** is a set of a mathematical relations among *n* ≥ 2 entities, each taken from some entity sets *E*₁ *E*₂, …, *E*ₙ, i.e.:
  **R = {(e₁, e₂, … eₙ) | e₁ ∈ E₁, e₂ ∈ E₂, …, eₙ ∈ Eₙ}**"
  - <ins>E.g.</ins>: ((44553,Peltier),(22222,Einstein)) ∈ *advisor*
- "The **degree of a relationship set** R is the number of entity sets *E*ᵢ that "participate" in R."
- ⭐ "relationship", "relationship set (or type)" and "degree of a relationship set" are in bold blue.
- ⚠️ "a set of **a** mathematical relations" is a grammar slip; read it as "a set of mathematical relations". "*E*₁ *E*₂," is missing a comma ("*E*₁, *E*₂, …").
- ⚠️ **Order mismatch between the two examples.** The first lists the instructor first, (22222,Einstein), then the student, (44553,Peltier). The "E.g." line reverses them. By the slide's own formula, eᵢ must come from Eᵢ, so the order inside the brackets must follow the order of the entity sets. With "*advisor* between *instructor* and *student*" (S35), consistent writing is ((22222,Einstein),(44553,Peltier)) ∈ *advisor*.
- 🔎 Look up in Track B: what a "mathematical relation" is (set-theory background for the formula).

### [S35] Relationship Sets - Example
- "The relationship <ins>set</ins> *advisor* between *instructor* and *student*:" ⭐ The word "set" is underlined, and a red arrow from it points to the ellipse in the middle.
- **Diagram:** the *instructor* list (left) and the *student* list (right) are the S27 extensions. Lines cross an empty ellipse in the middle (the set *advisor*):

  | Instructor | — | Student |
  |---|---|---|
  | 76766 Crick | — | 98988 Tanaka |
  | 45565 Katz | — | 12345 Shankar |
  | 45565 Katz | — | 00128 Zhang |
  | 10101 Srinivasan | — | 76543 Brown |
  | 98345 Kim | — | 76653 Aoi |
  | 76543 Singh | — | 23121 Chavez |
  | 22222 Einstein | — | 44553 Peltier |

- Reading the picture: there are 7 lines. Every student has exactly one line. **Katz has two** (Shankar, Zhang). Every other instructor has one.

### [S36] Relationship Sets - Example (*cont.*)
- The same diagram and sentence; the ellipse is now labelled "*advisor*" (red arrow from "set"). Each line is named where it crosses the ellipse:
- **"*advisor* = {r1, r2, r3, r4, r5, r6, r7}"**

  | Relationship | Instructor | Student |
  |---|---|---|
  | r1 | 76766 Crick | 98988 Tanaka |
  | r2 | 45565 Katz | 12345 Shankar |
  | r3 | 45565 Katz | 00128 Zhang |
  | r4 | 10101 Srinivasan | 76543 Brown |
  | r5 | 98345 Kim | 76653 Aoi |
  | r6 | 76543 Singh | 23121 Chavez |
  | r7 | 22222 Einstein | 44553 Peltier |

- So the relationship set *advisor* is literally a set whose elements are the relationships r1…r7. r7 is the S34 example (Einstein, Peltier).

### [S37] Relationship Sets - Attributes
- "Also relationship sets can have some **attributes**."
  - <ins>Example</ins>: relationship set *advisor* with attribute *date*:
- **Diagram:** the same two lists. The *advisor* ellipse is now filled light blue and holds one date per relationship. Lines run instructor → date → student, with r-labels on the student side:

  | Relationship | Instructor | *date* | Student |
  |---|---|---|---|
  | r1 | 76766 Crick | 3 May 2008 | 98988 Tanaka |
  | r2 | 45565 Katz | 10 June 2007 | 12345 Shankar |
  | r3 | 45565 Katz | 12 June 2006 | 00128 Zhang |
  | r4 | 10101 Srinivasan | 6 June 2009 | 76543 Brown |
  | r5 | 98345 Kim | 30 June 2007 | 76653 Aoi |
  | r6 | 76543 Singh | 31 May 2007 | 23121 Chavez |
  | r7 | 22222 Einstein | 4 May 2006 | 44553 Peltier |

- Reading the picture: the date belongs to the *relationship* (the pair), not to the instructor or the student alone. Katz has two different dates, one for each of his two students.

### [S38] Relationship Sets: Diagramming
- "**Diamonds represent relationship sets.**"
- **Diagram:** [**instructor**: <u>ID</u>, name, salary] —— ◇**advisor** —— [**student**: <u>ID</u>, name, tot_cred]. The lines are plain on both sides.

### [S39] Relationship Sets: Diagramming (attributes)
- "Relationship sets with attributes ("date") are represented this way:"
- **Diagram:** [**instructor**: <u>ID</u>, name, salary] —— ◇**advisor** —— [**student**: <u>ID</u>, name, tot_cred]. Above the diamond, a small box with **date** is joined to the diamond by a **dashed line**.

### [S40] Relationship Sets: Diagramming (ternary)
- "**Ternary** relationship sets are represented this way:"
- **Diagram:** a diamond **proj_guide** with three plain lines, to:
  - **instructor** (<u>ID</u>, name, salary), on the left;
  - **student** (<u>ID</u>, name, tot_cred), on the right;
  - **project**, on top. Its attributes are shown only as ". . .".
- By the S34 definition, three entity sets participate, so the degree is 3.

### [S41] Unary Relationship Sets — Roles
- "Entity sets of a relationship need not be distinct
  - Each occurrence of an entity set plays a "role" in the relationship set."
- "The labels "*course_id*" and "*prereq_id*" are called **roles**." ("roles" is in bold blue.)
- **Diagram:** **course** (<u>course_id</u>, title, credits) is joined by **two** lines to the diamond **prereq**. The upper line is labelled *course_id* and the lower line *prereq_id*.
- Reading S34 and S41 together:
  - each element of *prereq* still associates 2 entities (two courses), so "n ≥ 2 entities" holds;
  - both come from the same entity set *course*, so the slide calls it "**Unary**";
  - the role labels tell the two occurrences of *course* apart.
- 🔎 Look up in Track B: whether "degree" counts distinct entity sets (1 for prereq) or participations, since the slides call prereq "unary".

### [S42] Outline — item 4 "Data Semantics" highlighted.

### [S43] Section title: Data Semantics — "or: How we ***mean*** data in the E-R Model"
- ⭐ "mean" is in red.
- ⭐ The same orange box as S22, now with **Data semantics** in blue (the current topic): • Data and Data relationships • **Data semantics** • Data constraints (for business rules).

### [S44] More on Attributes (*cont.*) *(header: "Data Semantics | The E-R Model")*
- ⭐ "An attribute's **domain** is the set of permitted values (of a certain "**type**") for the attribute." ("type" is in red.)
- "Type of attribute defines data semantics (meaning)."
- "Data semantics is a "grounded" into data types."
- "Data types depend on DBMS and language used to implement the design."
- "Attributes values may have value *null* :
  - the value "unknown", or
  - the value does not exist."
- ⚠️ "Data semantics is **a** "grounded" into data types" has a stray "a"; read it as "Data semantics is "grounded" into data types". "Attributes values" should be "Attribute values".
- 🔎 Look up in Track B: the concrete data types available in MySQL (the DBMS used in the labs).

---

## 3. Definitions & key terms (word for word from the slides)

1. **Conceptual Design.** "The designer refers to data models, and by applying the concepts of the chosen model, translates the specified requirements into a conceptual schema (view) of the database." [S11]. "So, there is a direct correspondence between requirements and (conceptual) design." [S11]
2. **Conceptual (database) design = Phase 2.** "Conceptual Data Design — Phase 2 of Database System Development" [S6]; "2. Conceptual database design (Phase 2)" [S8].
3. **Requirement sentences.** "After the Requirements Phase you shall have a list of sentences of this form: NOUN ("SUBJECT") – VERB – NOUN ("OBJECT") about the application scenario on target, where a NOUN represents a set of "entities" that you need information about (by querying), and a VERB (or verb phrase, for example: member of, for, seat-on, etc.) represents "relationships" between entities." [S9]
4. **Modality.** "noun ("subject") — verb\* — noun ("object")", where "\* with its "modality" (modal verbs)" [S10]. Examples of modal words: MUST, CAN, MAY [S9].
5. **Parent / Child Entity Set.** These are labels only: the subject noun (EMPLOYEE) is the "Parent Entity Set" and the object noun (DEPARTMENT) is the "Child Entity Set" [S10]. No definition is given.
6. **Data model.** "A data model is a collection of tools for describing: Data and Data relationships; Data semantics; Data constraints" [S12, S13]. The constraints are "(for business rules)" [S22, S43].
7. **Relational model.** "Relational model (attributes and tables = sets of rows)" [S12, S13]. Tables are called "relations": "Tables ("relations") in relational model" [S19].
8. **E-R model.** "E-R model (attributes of entities and relationships)" [S13]; "The E-R Model — i.e.: The Entity-Relationship Data Model" [S14]; "The entity-relationship model adopts the more natural view that the real world consists of entities and relationships." (Chen, 1976) [S18]
9. **Three basic concepts of the E-R model.** "The E-R model employs three basic concepts: entity set, relationship set, attribute (of entity and/or relationship sets)." [S23]
10. **E-R diagrams.** "The E-R model has an associated diagrammatic representation, the E-R diagrams, which allows to express the logical structure of a DB graphically." [S23]
11. **Set vs type (terminology).** "An entity set in T is entity type in R." "A relationship set in T is relationship type in R." [S24]. Also "Entity Sets — or, equivalently: Entity Types" [S25] and "Relationship Sets — or, equivalently: Relationship Types" [S33].
12. **Entity.** "An entity is a "thing" or "object" that exists and is distinguishable from other things and objects." Example: "a person, company, event, plant" [S26]
13. **Entity set (or type).** "An entity set (or type) is a set of entities of same type that share the same properties (or: attributes)." Example: "set of persons, companies, trees, holidays" [S26]. Also: "An entity set (type) is defined by a unique name and a set of attributes; i.e., descriptive properties possessed by all members of the set." [S28]. On S20 an entity set is labelled "Entity set ("concepts")".
14. **Extension.** "The extension of an entity set is the actual collection of entities belonging to the entity set." Example: "actual instructors form the extension of the entity set instructor." [S26, S27]
15. **Attributes.** "descriptive properties possessed by all members of the set" [S28]
16. **Value.** "Attributes have a value (instance of the attribute)" [S28]
17. **Primary key.** "A subset of attributes forms a primary key of the entity set and uniquely identifies an entity in the set." [S28]. "Underline indicates primary key attributes" [S29]
18. **NB, business-based decision.** "NB: what attributes to capture in the database is basically a business-based design decision." [S28]
19. **Domain.** "An attribute's domain is the set of permitted values for the attribute" [S30, S31]; "An attribute's domain is the set of permitted values (of a certain "type") for the attribute." [S44]
20. **Attribute types.** "Simple and composite attributes." / "Single-valued and multivalued attributes" / "Derived attributes" / "Attributes may have value null" [S30]
21. **Multivalued attribute.** "Example: multivalued attribute: phone_number". "Notation: {phone_number}" [S30]
22. **Derived attribute.** "Can be computed from other attributes". "Example: age, given date_of_birth" [S30]. Written "age ( )" [S32].
23. **Composite / component attributes.** Labels on the tree: "composite attributes" (name, address) vs "component attributes" (first_name, middle_initial, last_name; street, city, state, postal_code; street_number, street_name, apartment_number) [S31]
24. **Relationship.** "A relationship is an association among entities". Example: "advisor((22222,Einstein),(44553,Peltier))" [S34]
25. **Relationship set (or type).** "A relationship set (or type) is a set of a mathematical relations among n ≥ 2 entities, each taken from some entity sets E1 E2, …, En, i.e.: R = {(e1, e2, … en) | e1 ∈ E1, e2 ∈ E2, …, en ∈ En}" [S34]
26. **Degree of a relationship set.** "The degree of a relationship set R is the number of entity sets Ei that "participate" in R." [S34]
27. **Attributes of relationship sets.** "Also relationship sets can have some attributes." Example: "relationship set advisor with attribute date" [S37]
28. **Ternary relationship set.** "Ternary relationship sets are represented this way:" The example `proj_guide` joins instructor, student and project [S40].
29. **Unary relationship set / roles.** "Entity sets of a relationship need not be distinct. Each occurrence of an entity set plays a "role" in the relationship set." "The labels "course_id" and "prereq_id" are called roles." [S41]
30. **Data semantics.** "Type of attribute defines data semantics (meaning)." "Data semantics is a "grounded" into data types." "Data types depend on DBMS and language used to implement the design." [S44]. Section subtitle: "How we mean data in the E-R Model" [S43]
31. **Null.** "Attributes may have value null" [S30]; "Attributes values may have value null: the value "unknown", or the value does not exist." [S44]
32. **"Data and Data Relationships"** = "How we structure data in the E-R Model" [S22].

---

## 4. E-R notation legend (only symbols that appear on slides 1–44)

**Explained on the slides**

| Symbol | Meaning (as stated or shown on the slides) | [S#] |
|---|---|---|
| Rectangle (name in a light-blue top band) | an **entity set**: "Rectangles represent entity sets." | S29 |
| Attribute names listed inside the rectangle | attributes of that entity set: "Attributes listed inside entity rectangle" | S29 |
| <u>Underlined</u> attribute | primary key: "Underline indicates primary key attributes" | S29, S32 |
| Attribute with indented attributes below it | **composite** attribute and its components (name; address; street) | S32 (tree form on S31) |
| `{ phone_number }` (curly braces) | **multivalued** attribute: "Notation: {phone_number}" | S30, S32 |
| `age ( )` (name followed by "( )") | **derived** attribute | S32 |
| Diamond | a **relationship set**: "Diamonds represent relationship sets." | S38 |
| Plain line from a diamond to a rectangle | links the relationship set to an entity set taking part in it (as drawn) | S38–S41 |
| Small box holding an attribute name, joined to a diamond by a **dashed line** | an **attribute of a relationship set** (`date` on advisor; `grade` on takes) | S39, S20 |
| Diamond with **three** lines to three rectangles | **ternary** relationship set (`proj_guide`) | S40 |
| Two lines from one rectangle to the same diamond, each with a label | **unary** relationship set; the labels (`course_id`, `prereq_id`) are **roles** | S41 (also S20) |
| ". . ." inside a rectangle | the attributes are not shown (`project`) | S40 |

**Textual notation:** `entity_set (attr1, attr2, …)`, e.g. *instructor (ID, name, street, city, salary)*, *course (course_id, title, credits)* [S28].

**Pictures of actual entities (not E-R diagrams)** [S10, S35–S37]
- Ellipse or framed list = a set (entity set or relationship set) with its members inside.
- Dot (e1…, d1…) or row (76766 Crick) = one entity.
- Small black square or label r1, r2, … = one relationship, an element of the relationship set ("advisor = {r1, …, r7}").
- Line = joins the entities that one relationship associates.
- Value written on a relationship (3 May 2008, …) = the value of the relationship-set attribute `date` [S37].

**Drawn on S20 but NOT explained in slides 1–44 (describe only; do not guess)**
- Arrowhead at an entity-set end of a line (e.g., inst_dept → department, advisor → instructor, sec_course → course, sec_class → classroom).
- Double line between an entity set and a diamond (e.g., instructor = inst_dept, section = teaches).
- Double-bordered rectangle (`section`).
- Double-bordered diamond (`sec_course`).
- Underline that looks broken/dashed (`section`'s sec_id, semester, year; uncertain at this resolution).
- 🔎 Look up in Track B: the meaning of each of these five symbols.
- Relation schema diagram (S20 left): boxes, underlines, arrows between boxes. 🔎 Look up in Track B: the schema-diagram conventions.

---

## 5. Examples & exercises from class, worked step by step

### 5.1 Requirement sentences → design decisions [S9, S10]
Rule from S9: NOUN = a set of entities you need information about (by querying) → **entity set**. VERB / verb phrase = **relationship** between entities. S10 adds that the verb comes "with its modality (modal verbs)".

| # | Sentence (as on slide) | Subject noun → entity set | Verb phrase → relationship | Modality (red on slide) | Object noun → entity set |
|---|---|---|---|---|---|
| 1 | STUDENTS – (MUST) REGISTER TO – CLASS | STUDENTS | "register to" | MUST | CLASS |
| 2 | STUDENTS – (CAN) HAVE MAXIMUM TWO – ADVISORS | STUDENTS | "have maximum two" | CAN | ADVISORS |
| 3a | PERSON – (MAY) OWN A CAR … | PERSON | "own a car" | MAY | (no separate object noun after a dash; "a car" is inside the verb phrase) |
| 3b | … / (MAY) BELONG TO – POLITICALPARTY | PERSON | "belong to" | MAY | POLITICALPARTY |
| S10 | EMPLOYEE – MANAGES – DEPARTMENT | EMPLOYEE (**Parent Entity Set**) | MANAGES | (none shown) | DEPARTMENT (**Child Entity Set**) |

Step by step:
1. Underline the nouns. They carry capital initials on the slide: Students, Class, Advisors, Person, politicalParty. Each becomes a set of entities.
2. Circle the verb phrase between the dashes. It becomes the relationship.
3. Keep the modal word (must / can / may) and any quantity ("maximum two") attached to the verb. Slides 1–44 do not show how to draw it. 🔎 Look up in Track B: how modality and quantities are captured.
4. Sentence 3 is two sentences sharing the subject PERSON (split at "/").
5. Applying S9's own test to "a car": it would be a NOUN (entity set) only if you need information about cars by querying. The slide keeps it inside the verb phrase.

### 5.2 Reading the EMPLOYEE–MANAGES–DEPARTMENT picture [S10]
1. Three sets: EMPLOYEE {e1…e7, …}, MANAGES {r1, r2, r3, …}, DEPARTMENT {d1, d2, d3, …}.
2. Each member of MANAGES joins one employee and one department: r1 = (e3, d1), r2 = (e6, d2), r3 = (e5, d3).
3. Employees e1, e2, e4 and e7 are in EMPLOYEE but take part in no MANAGES relationship.
4. Each of d1, d2, d3 is linked to exactly one employee.

### 5.3 From tables to entity sets; relation schemas vs E-R diagram [S19, S20]
- **S19, step by step:**
  1. The `instructor` table has a `dept_name` column, and the `department` table also has `dept_name`. **Note 1:** the attribute is repeated.
  2. Instructor rows such as 22222 Einstein (Physics) and 45565 Katz (Comp. Sci.) carry a department name that also appears as a row of `department` (Physics → Watson, 70000; Comp. Sci. → Taylor, 100000).
  3. **Note 2:** "dept_name in instructor represents a relationship…", namely the link between an instructor and his/her department.
- **S20, comparing the two pictures (left → right, along the red arrow):**

| Relation on the left | What it is on the right | What changed |
|---|---|---|
| instructor(<u>ID</u>, name, dept_name, salary) | entity set **instructor**(<u>ID</u>, name, salary) + relationship set **inst_dept** to department | `dept_name` is no longer an attribute; the diamond inst_dept replaces it (Note 2 of S19) |
| student(<u>ID</u>, name, dept_name, tot_cred) | entity set **student**(<u>ID</u>, name, tot_cred) + **stud_dept** | same pattern |
| course(<u>course_id</u>, title, dept_name, credits) | entity set **course**(<u>course_id</u>, title, credits) + **course_dept** | same pattern |
| department(<u>dept_name</u>, building, budget) | entity set **department** (same attributes) | unchanged |
| advisor(<u>s_id</u>, i_id) | relationship set **advisor** (instructor – student) | table → diamond |
| teaches(ID, course_id, sec_id, semester, year) | relationship set **teaches** (instructor – section) | table → diamond |
| takes(ID, course_id, sec_id, semester, year, grade) | relationship set **takes** (student – section) with attribute **grade** | `grade` becomes an attribute of the relationship set (box + dashed line) |
| prereq(<u>course_id</u>, <u>prereq_id</u>) | relationship set **prereq** on course, with role labels course_id / prereq_id | table → diamond with roles |
| section(course_id, sec_id, semester, year, building, room_no, time_slot_id) | entity set **section**(sec_id, semester, year) + **sec_course** (→ course), **sec_class** (→ classroom), **sec_time_slot** (→ time_slot) | course_id, building, room_no and time_slot_id are no longer attributes; three diamonds replace them |
| classroom(<u>building</u>, <u>room_no</u>, capacity) | entity set **classroom**(<u>building</u>, <u>room_number</u>, capacity) | same, but named room_no on the left and room_number on the right |
| time_slot(time_slot_id, day, start_time, end_time) | entity set **time_slot** (same attributes) | unchanged |

- Take-away from the slide labels: relations become **entity sets ("concepts")** and **relationship sets**.

### 5.4 Extension of an entity set [S26, S27]
- Entity set `instructor` → its extension is the 6 actual instructors: Crick, Katz, Srinivasan, Kim, Singh, Einstein (with numbers 76766, 45565, 10101, 98345, 76543, 22222).
- Entity set `student` → its extension is the 7 actual students: Tanaka, Shankar, Zhang, Brown, Aoi, Chavez, Peltier.

### 5.5 Classifying the attributes of `instructor` [S30–S32]

| Attribute in the S32 rectangle | Type (from the S32 arrows / S30–S31) | How it is drawn |
|---|---|---|
| ID | simple **and key** | <u>ID</u> |
| name | composite (components first_name, middle_initial, last_name) | components indented below |
| first_name, middle_initial, last_name | component attributes of name | indented under name |
| address | composite (components street, city, state, zip) | components indented below |
| street | component of address **and** itself composite (street_number, street_name, apt_number) | indented, with its own indented components |
| city, state, zip | component attributes of address | indented under address |
| phone_number | **multivalued** | `{ phone_number }` |
| date_of_birth | no special marking (the attribute that age is computed from) | plain |
| age | **derived** ("can be computed from other attributes"; "age, given date_of_birth") | `age ( )` |

### 5.6 The relationship set *advisor* [S34–S39]
1. **One relationship** is written as advisor((22222,Einstein),(44553,Peltier)) [S34]: one instructor entity associated with one student entity.
2. **The relationship set** *advisor* is the set of all such pairs: R = {(e₁, e₂) | e₁ ∈ instructor, e₂ ∈ student}, with n = 2 [S34 formula; "between instructor and student", S35]. (⚠️ Keep the order consistent; see S34.)
3. **Members:** advisor = {r1, …, r7} [S36]. They are listed in the S36 table: Crick–Tanaka, Katz–Shankar, Katz–Zhang, Srinivasan–Brown, Kim–Aoi, Singh–Chavez, Einstein–Peltier.
4. **Degree:** two entity sets (instructor, student) participate, so the degree is 2 [S34 definition].
5. **Attribute date** [S37]: each relationship has its own date (r1 3 May 2008 … r7 4 May 2006). Katz's two relationships have two different dates.
6. **Diagram:** rectangle instructor — diamond advisor — rectangle student [S38], plus a "date" box joined to the diamond by a dashed line [S39].

### 5.7 Other diagram patterns [S40, S41]
- **Ternary, proj_guide:** three entity sets (instructor, student, project) are joined by one diamond, so the degree is 3 [S40, S34].
- **Unary with roles, prereq:** course appears twice. The line labelled *course_id* gives one role and the line labelled *prereq_id* the other. The roles tell the two occurrences apart [S41]. The same pattern appears on S20 (role labels course_id / prereq_id).

---

## 6. Likely quiz / exam questions (built only from slides 1–44)

1. **(MCQ)** In "DB Design: Main Steps", conceptual database design is: **A)** Phase 1 **B)** Phase 2 **C)** Phase 4 **D)** Phase 5
2. **(Recall)** List the six main steps of DB design, in order, with their phase labels where the slide gives them.
3. **(Fill in)** "After the Requirements Phase you shall have a list of sentences of this form: ____ – ____ – ____ … where a NOUN represents ____ and a VERB represents ____."
4. **(Sentences → E-R)** For each sentence, name the entity sets, the relationship and the modality:
   (a) STUDENTS – (MUST) REGISTER TO – CLASS
   (b) STUDENTS – (CAN) HAVE MAXIMUM TWO – ADVISORS
   (c) In EMPLOYEE – MANAGES – DEPARTMENT, which one is labelled the *Parent Entity Set* and which the *Child Entity Set*?
5. **(Fill in)** "A data model is a collection of tools for describing ____, ____, ____."
6. **(MCQ)** Which pairing matches the slides?
   **A)** Relational model = attributes of entities and relationships; E-R model = tables = sets of rows
   **B)** Relational model = attributes and tables = sets of rows; E-R model = attributes of entities and relationships
   **C)** Both models = sets of rows
   **D)** E-R model = network model
7. **(Matching)** Match each author/year to a title and journal: Codd 1970, Chen 1976, Chen 1983.
8. **(Definitions)** Give the slide definitions of *entity*, *entity set (or type)*, *extension of an entity set*, and *primary key*.
9. **(Terminology)** The reference book (R) does not say "entity set" or "relationship set". What does it say?
10. **(Classify these attributes)** In the S32 *instructor*, classify: ID, name, last_name, address, street, {phone_number}, date_of_birth, age ( ).
11. **(Notation)** How does the class E-R notation show each of these?
    (a) an entity set; (b) a relationship set; (c) a primary key attribute; (d) a multivalued attribute; (e) a derived attribute; (f) a composite attribute; (g) an attribute of a relationship set; (h) a role.
12. **(Formula)** Write the slide's set definition of a relationship set R over E₁, …, Eₙ. Give one member of *advisor* from class, with the components in a consistent order.
13. **(Degree)** Using the slide definition, give the degree of *advisor* (S38) and *proj_guide* (S40). What do the slides call proj_guide, and what do they call prereq?
14. **(Read the picture, S36–S37)**
    (a) How many relationships does *advisor* contain?
    (b) Which instructor advises two students, and who are they?
    (c) What is the *date* of the Einstein–Peltier relationship?
    (d) Which pair is r4, and what is its date?
15. **(Describe this E-R diagram)** Describe in words what S39 shows: instructor(<u>ID</u>, name, salary) — ◇advisor — student(<u>ID</u>, name, tot_cred), with a box "date" dashed to the diamond.
16. **(Tables → E-R)** S19 says "dept_name in instructor represents a relationship…". In the S20 E-R diagram:
    (a) what replaces `dept_name` for instructor, student and course?
    (b) what happens to `grade` from the takes relation?
17. **(True/False)**
    (a) "What attributes to capture in the database is basically a business-based design decision."
    (b) The entity sets of a relationship must be distinct.
    (c) Only entity sets can have attributes.
    (d) Data types are the same whatever DBMS is used.
18. **(Data semantics)**
    (a) Give the two meanings of *null*.
    (b) Complete: "Type of attribute defines ____."
    (c) Complete: "Data types depend on ____."
19. **(Composite tree)** Draw the class tree for the composite attribute *address*. Which attribute in it is both a component and a composite?
20. **(Conceptual design)** Complete: "The designer refers to ____, and by applying the concepts of the chosen model, translates the specified requirements into ____ of the database." According to S11, why is conceptual design easier when requirements analysis is done with a data model in mind?

### Answers
1. **B**, Phase 2 [S8; also S6].
2. 1) Requirements collection and analysis (Phase 1); 2) Conceptual database design (Phase 2); 3) Choice of DBMS; 4) Logical design (or: data model mapping) (Phase 4); 5) Physical design (Phase 5); 6) System implementation and tuning ("re-design") [S8].
3. NOUN ("SUBJECT") – VERB – NOUN ("OBJECT"). A NOUN represents "a set of "entities" that you need information about (by querying)". A VERB (or verb phrase) represents ""relationships" between entities" [S9].
4. (a) Entity sets STUDENTS and CLASS; relationship "register to"; modality MUST. (b) STUDENTS and ADVISORS; "have (maximum two)"; CAN [S9]. (c) EMPLOYEE = Parent Entity Set, DEPARTMENT = Child Entity Set, MANAGES = the verb/relationship [S10].
5. Data and Data relationships; Data semantics; Data constraints [S12, S13]. S22/S43 add "(for business rules)" to constraints.
6. **B** [S12, S13].
7. Codd 1970: "A Relational Model of Data for Large Shared Data Banks", *Communications of the ACM* 13(6), 377–387 [S15]. Chen 1976: "The Entity-Relationship Model—Toward a Unified View of Data", *ACM TODS* 1(1), 9–36, March [S16, S17]. Chen 1983: "English Sentence Structure and Entity-Relationship Diagrams", *Information Sciences* 29, 127–149 [S11 thumbnail].
8. Entity: "a "thing" or "object" that exists and is distinguishable from other things and objects". Entity set (or type): "a set of entities of same type that share the same properties (or: attributes)". Extension: "the actual collection of entities belonging to the entity set" [S26]. Primary key: "A subset of attributes forms a primary key of the entity set and uniquely identifies an entity in the set." [S28]
9. Entity **type** and relationship **type** [S24].
10. ID = simple and key (underlined); name = composite; last_name = component of name; address = composite; street = component of address and itself composite; {phone_number} = multivalued; date_of_birth = plain (age is computed from it); age ( ) = derived [S30–S32].
11. (a) rectangle [S29]; (b) diamond [S38]; (c) underline [S29]; (d) curly braces {…} [S30, S32]; (e) name followed by "( )" [S32]; (f) components indented under it [S32] (tree on S31); (g) a box joined to the diamond by a dashed line [S39]; (h) a label on the line between the entity set and the diamond [S41].
12. R = {(e₁, e₂, … eₙ) | e₁ ∈ E₁, e₂ ∈ E₂, …, eₙ ∈ Eₙ}, among n ≥ 2 entities [S34]. Example: advisor((22222,Einstein),(44553,Peltier)), i.e. ((22222,Einstein),(44553,Peltier)) ∈ advisor with instructor first. The slide's "E.g." line writes the pair the other way round; see the ⚠️ on S34.
13. advisor: 2 (instructor, student). proj_guide: 3 (instructor, student, project), called "Ternary" [S34, S38, S40]. prereq is called "Unary": one entity set, course, in two roles [S41].
14. (a) 7, since advisor = {r1, …, r7} [S36]. (b) Katz (45565) advises Shankar (12345) and Zhang (00128) [S35, S36]. (c) 4 May 2006 (r7) [S37]. (d) r4 = Srinivasan (10101) – Brown (76543), dated 6 June 2009 [S36, S37].
15. Two entity sets: instructor (primary key ID; name, salary) and student (primary key ID; name, tot_cred). They are linked by the relationship set advisor (diamond). advisor has its own attribute *date* (box + dashed line), so each instructor–student advising relationship carries a date [S39; values on S37].
16. (a) The relationship sets inst_dept, stud_dept and course_dept, each joined to the entity set department. (b) `grade` becomes an attribute of the relationship set takes (box joined by a dashed line) [S19, S20].
17. (a) True [S28]. (b) False: "Entity sets of a relationship need not be distinct" [S41]. (c) False: "Also relationship sets can have some attributes" [S37]; "attribute (of entity and/or relationship sets)" [S23]. (d) False: "Data types depend on DBMS and language used to implement the design." [S44]
18. (a) "the value "unknown", or the value does not exist" [S44]. (b) "data semantics (meaning)" [S44]. (c) "DBMS and language used to implement the design" [S44].
19. address → street, city, state, postal_code; street → street_number, street_name, apartment_number. **street** is both a component (of address) and a composite [S31].
20. "data models"; "a conceptual schema (view)" [S11]. Because "there is a direct correspondence between requirements and (conceptual) design" [S11]. The (Chen, 1983) paper on English sentence structure and E-R diagrams is cited with an arrow to "a data model in mind" [S11].

---

## 7. Self-check

- [ ] I can list the 6 main steps of DB design, say that conceptual design is Phase 2, and quote what the designer does in conceptual design [S8, S11].
- [ ] I can turn a NOUN – VERB – NOUN requirement sentence into entity sets and a relationship, keeping the modal verb (must/can/may) with the verb [S9, S10].
- [ ] I can say what a data model describes (3 things) and contrast the relational model with the E-R model, naming Codd 1970 and Chen 1976 [S12–S18].
- [ ] I can quote, word for word, the definitions of entity, entity set (type), extension, attribute, value, domain and primary key [S26–S30, S44].
- [ ] I can classify attributes as simple/composite, single-valued/multivalued or derived, and draw each one inside an entity rectangle (underline, indentation, { }, ( )) [S29–S32].
- [ ] I can write the set definition of a relationship set and work out its degree for advisor, proj_guide and prereq [S34, S38–S41].
- [ ] I can read the instructor–advisor–student pictures and list r1–r7 with their dates [S35–S37].
- [ ] I can draw the class E-R diagrams for advisor, advisor with date, the ternary proj_guide and the unary prereq with roles [S38–S41].
- [ ] I can explain why `dept_name` in `instructor` "represents a relationship" and point to inst_dept / stud_dept / course_dept in the S20 E-R diagram [S19, S20].
- [ ] I can explain data semantics (type → meaning → DBMS data types) and the two meanings of null [S44].
