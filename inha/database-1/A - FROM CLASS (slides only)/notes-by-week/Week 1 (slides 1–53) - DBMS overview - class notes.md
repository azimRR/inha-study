# Week 1 (slides 1–53) — Database systems overview (CLASS NOTES — from slides only)
> Source: W1L1L2.pdf, 53 slides. [S#] = the "n / 53" footer number.
> Slides with no footer (title, agenda, outline and divider slides: S1–S3, S6, S14, S15, S29, S31, S39, S40, S47, S48, S52, S53) are numbered by their position in the deck, which gives the same numbers.
> Legend: ⭐ = professor emphasis (red / highlighted / boxed text, "Note", question to the class, "cfr. Reference book") · ⚠️ = apparent slide typo · 🔎 = not explained on the slides; look it up in Track B.
> Exam use: the midterm (week 8) covers weeks 1–7, so it covers this whole deck. Quiz #2 is on weeks 2–5, whose decks are titled "The Relational Model" (W2), "Database Design: The E-R Data Model" (W3), "Database Design: Normalization" (W4) and "SQL: Introduction" (W5). This deck first names those ideas on S8, S37–S38, S41 and S44–S46.
> No SQL code appears in this deck. The only code-like items are the record type on S35 and the BibTeX entry on S50, both copied exactly.

---

## 1. Big picture

- **What a DBMS is:** "a collection of interrelated data (i.e, information) about a particular enterprise together with a set of programs to access those data". It must be *convenient* and *efficient* to use, and one purpose is "to provide users with an *abstract* view of data" [S4, S32].
- **Where DBMSs are used:** banking, airlines, universities, sales, online retailers, manufacturing, human resources, and more [S5].
- **Architecture and users:** four kinds of users and administrators (naive users, application programmers, sophisticated users, database administrators) use tools that feed the DBMS's internal components: the **query processor**, the **storage manager** and **disk storage** [S7, S45]. The overall shape depends on the computer the database runs on: centralized, client-server (two-tier or three-tier), parallel or distributed [S9–S13]. A second picture shows End User, application programmer, DB Designer and DBA [S8].
- **Before DBMSs there were files.** File systems have 7 drawbacks: redundancy and inconsistency, difficulty in accessing data, data isolation, integrity problems, atomicity of updates, concurrent access, and security [S18–S28]. "To solve all drawbacks above... ...DBMSs have been developed since mid 1960s!" [S29]. Bachman received the 1973 Turing Award for this work [S30].
- **View of data:** there are 3 levels of abstraction, view (external), logical (conceptual) and physical (internal) [S33–S35]. They give **logical** and **physical data independence** [S36]. A **schema** is the structure (like a variable's *type*); an **instance** is the content at one point in time (like a variable's *value*) [S37–S38].
- **Data models and languages:** a data model describes data, relationships, semantics and constraints. The slides list relational, E-R, object-based, semistructured, and network/hierarchical/NoSQL models [S41–S43]. **DDL** specifies the schema and **DML** manipulates the instances. The "pure" relational query languages and SQL are on S46 [S44–S46].
- **History:** 1950s–early 1960s, tapes and punched cards → late 1960s–1970s, hard disks, network/hierarchical models, Codd's relational model (1970), System R, Ingres and the first RDBMS (1979) → 1980s, SQL becomes the industrial standard → 1990s, data mining, data warehouses, Web commerce → 2000s, XML/XQuery, the Semantic Web and giant data storage systems [S49–S51].

---

## 2. Slide-by-slide notes

**— Opening (S1–S3) —**

### [S1] Title slide — "Database (SOC-3020)"
- Course title in red: **Database (SOC-3020)**. Lecturer: **Alessandro Agostini** (affiliations 1 and 2). E-mails: `aagostini@inha.ac.kr`, `agostini@disi.unitn.it`.
- ¹ LDKR-Group, School of Computer and Information Engineering, Inha University in Tashkent (IUT), Uzbekistan. ² DISI, University of Trento, Italy. The slide also says "WEEK 1".
- Pictures: the IUT building, the LDKR logo ("Language, Data, Knowledge, Reasoning") and the IUT seal. There is nothing to learn on this slide.

### [S2] Deck title — "Database Systems (DBMSs): Overview"
- "DATABASE" / "**Database Systems (DBMSs): Overview**" / "WEEK 1" / "Code: W1.L1L2".
- The banner is a panoramic photo of a historic city square (decorative only).

### [S3] Today's agenda
1. Definition of DBMSs
2. DBMSs' Applications and Purposes
3. DBMSs' Architecture and Users
4. Before were File Systems... (this reads as "before [DBMSs] there were file systems"; see S15)
5. View of Data, or: Levels of Data Abstraction
6. Data Models & Languages
7. Very Brief History of DBMSs
- These 7 sections come back as "Outline" dividers (S6, S14, S31, S39, S47) and as the closing "Summary" (S52).

**— Section 1: Definition of DBMSs —**

### [S4] Database Management System (DBMS)
- ⭐ The definition sits in a highlighted blue box:
  > "**Def**: A database-management system (DBMS) is a collection of interrelated data (i.e, information) about a particular enterprise together with a set of programs to access those data."
- "So:"
  - "Collection of interrelated data"
  - "Set of programs to access the data"
- "A DBMS provides an environment that is both *convenient* and *efficient* to use."
- ⭐ Emphasis: "interrelated data" and "programs to access those data" are underlined, "data" and "information" are blue, and *convenient* and *efficient* are in italics.
- ⚠️ "(i.e, information)" is missing a period. It should read "(i.e., information)".
- The same definition comes back as a "Reminder" on S32.

**— Section 2: DBMSs' Applications and Purposes —**

### [S5] DBMS - Applications
- "Database Applications:"

| Area | What the database handles (slide wording) |
|---|---|
| Banking | transactions |
| Airlines | reservations, schedules |
| Universities | registration, grades |
| Sales | customers, products, purchases |
| Online retailers | order tracking, customized recommendations |
| Manufacturing | production, inventory, orders, supply chain |
| Human resources | employee records, salaries, tax deductions |
| … | (the list ends with "…", meaning there are more) |

- Note: the deck has no separate "Purposes" slide. The purposes it states are on S4 ("an environment that is both convenient and efficient to use") and S32 ("to provide users with an abstract view of data").

**— Section 3: DBMSs' Architecture and Users —**

### [S6] Outline → section 3, "DBMSs' Architecture and Users".

### [S7] DBMS Architecture
- One large diagram. The professor split it with two coloured frames ⭐:
  - a **blue frame labelled "users and administrators"** (top), and
  - a **red frame labelled "internal components"** (everything below it).
- **Top part:** four user types (rounded boxes), each linked by a labelled line to a tool (oval). The four tool ovals are circled in orange ⭐.

| User type (box) | Line label | Tool (oval) |
|---|---|---|
| naive users (tellers, agents, web users) | use | application interfaces |
| application programmers | write | application programs |
| sophisticated users (analysts) | use | query tools |
| database administrators | use | administration tools |

- **Internal components** come in three stacked parts:
  1. **query processor** (dashed box): compiler and linker · application program object code · DML queries · DML compiler and organizer · query evaluation engine · DDL interpreter
  2. **storage manager** (dashed box): buffer manager · file manager · authorization and integrity manager · transaction manager
  3. **disk storage** (a cylinder): **data** (boxed in purple ⭐) · indices · data dictionary · statistical data
- **How the lines run:**
  - application programs → compiler and linker; from there, arrows go to application program object code and to DML queries.
  - application interfaces → application program object code.
  - application program object code → DML queries, and also → query evaluation engine.
  - query tools → DML queries.
  - administration tools → DML queries (diagonal line) and → DDL interpreter (vertical line). In this picture nothing else is drawn coming out of the DDL interpreter.
  - DML queries → DML compiler and organizer → query evaluation engine.
  - query evaluation engine → lines to all four storage-manager boxes.
  - buffer manager and file manager → lines to data and to indices. Authorization and integrity manager → data dictionary. A vertical line runs from the DML compiler and organizer down to the data dictionary, with a branch to statistical data.
- The same diagram returns on S45 with "DML queries" and "DDL interpreter" highlighted.
- 🔎 Look up in Track B: what each internal component does (buffer manager, file manager, transaction manager, data dictionary, query evaluation engine, …). The slides only name them.

### [S8] Database Users
- This slide is a picture with no bullet text. A large beige circle labelled **"Database System"** contains:
  - **End User** ↔ **Application**, with arrows both ways. The Application box holds social and messaging app icons (Facebook-, Twitter-, Instagram-, YouTube-, WeChat- and LINE-style).
  - **AP.Programmer**, an old black-and-white portrait of a woman at a desk → arrow into Application. A bracket next to the programmer lists **"Host language"** and **"DML"**.
  - Application ↔ **DBMS**, on a line labelled **"Transactions"** (arrows both ways).
  - The **DBMS** box sits on a cylinder **"DB"** that holds two smaller cylinders: **"Meta DB" → "DB Schema"** and **"Stored DB" → "DB Instance"**.
  - An arrow labelled **"Data Modeling(Database Design)"** points into the DBMS. It carries the label **"DDL"**.
  - ⭐ **"DB Designer"** (boxed in blue). A bracket links the designer to three kinds of data model:

| Data model (slide wording) | Examples on the slide |
|---|---|
| Conceptual(High-Level) Data Model | ERDM, OODM |
| Representational(Implementation) Data Model | RDM, HDM, NDM - depends on DBMS |
| Physical(Low-Level) Data Model | Record Type, access methods |

  - **DBA** stands at the top edge of the circle.
- Outside the circle is a cloud labelled **"Real World (Mini World)"**. A grey line runs from it down into the "Data Modeling(Database Design)" arrow. Thin beige arrows run from the cloud's line to the Conceptual model, from the data-modeling line to the Representational model, and from the DB cylinder to the Physical model.
- The picture has four people: End User, AP.Programmer (application programmer, cf. S7), DB Designer and DBA.
- Links to other slides: schema/instance → S37; DDL/DML → S44; data models → S41; users → S7.
- The slide does not expand the acronyms. Matching their letters to the model names on S41 suggests ERDM = Entity-Relationship data model, OODM = object-oriented data model, RDM = relational, HDM = hierarchical, NDM = network.
- 🔎 Look up in Track B: confirm the expansions of ERDM, OODM, RDM, HDM and NDM, and what a "host language" is.

### [S9] DBMS Architecture (*cont.*)
> "Greatly influenced by underlying computer system on which the database is running:"
- Centralized
- Client-server
- Parallel (multi-processor)
- Distributed
- S10 shows centralized and S11–S13 show client-server. Parallel and distributed are only named here; they come back in the history on S51 (1980s: "Parallel and distributed database systems").

### [S10] Centralized DBMS Architecture
- "Example of physical centralized architecture:". The figure comes from the reference book (the Elmasri–Navathe cover is shown in the corner) ⭐ "cfr. Reference book (R1)".
- **The figure:**
  - **Terminals:** Display Monitor, Display Monitor, …, Display Monitor, connected by a **Network** to a single computer.
  - Inside that computer, **Software:** Application Programs · Terminal Display Control · Text Editors · … · **DBMS** (red box ⭐) · Compilers · …
  - **Operating System** (label between software and hardware).
  - **Hardware/Firmware:** a **System Bus** connects the CPU and three Controllers (…). The controllers connect Memory, Disk, and I/O Devices (Printers, Tape Drives, …).
- ⭐ **"Note:"** (blue): "PCs have their own display/ monitor" · "no network needed" · "So, common case of centralized DBMS architecture".
- **The note's logic:** in the figure the terminals are only screens, and everything else (DBMS, programs, hardware) lives in one machine. A PC has its own screen, so it needs no network and is the whole figure by itself. That makes a PC the common case of a centralized DBMS.

### [S11] Client-Server DBMS Architecture
- "Example of client-server (physical) architecture:" ⭐ "cfr. Reference book (R1) (*modified*)".
- This is the same figure as S10, with two changes. The top row is now **Client, Client, …, Client** (instead of display terminals), connected through the **Network**. The whole machine below is framed by a red dashed box labelled ⭐ **"server"** in red. The DBMS inside is again boxed in red.
- **Difference from S10:** users now sit at *clients*, and the machine that runs the DBMS is the *server*.

### [S12] Client-Server DBMS Architectures (*cont.*)
- "DBMS Server relates to Client/User in two ways:"
- **(a) Two-tier architecture**
  - Diagram: on the client side (dashed box), user —**1**— application. Then —**2**— across the network to the server side (dashed box): database system.
  - Blue text on the left: "Clients can *directly access* to DB server (but also Printer/File/ Mail…servers)." · "Access via API standards ODBC/JDBC."
- **(b) Three-tier architecture**
  - Diagram: on the client side, user —**1**— application client. Then —**2**— across the network to application server —**3**— database system on the server side.
  - ⭐ A red box surrounds application client + network + application server.
  - Blue text on the right: "Clients can't directly *access* to DB server." · "Common for Web/systems with many users." · "Enhance security."
- The red numbers count the links: 2 in (a), 3 in (b).
- ⭐ Red text: "**Terminology: called SQL server if DBMS is Relational**". A red arrow points at the word "server".
- ⚠️ (grammar, appears twice) "directly access to DB server" should be "directly access the DB server".
- 🔎 Look up in Track B: ODBC / JDBC.

| | (a) Two-tier | (b) Three-tier |
|---|---|---|
| Client side | user + application | user + application client |
| Server side | database system | application server + database system |
| Links (red numbers) | 1, 2 | 1, 2, 3 |
| Can clients reach the DB server directly? | Yes ("Clients can directly access … (but also Printer/File/Mail…servers)") | No ("Clients can't directly access to DB server.") |
| Other slide notes | "Access via API standards ODBC/JDBC." | "Common for Web/systems with many users." · "Enhance security." |

### [S13] Client-Server DBMS Architectures (*cont.*)
- "Three-tier DBMS architecture (more terminology):" ⭐ "cfr. Reference book (R1)".
- Three rows linked top to bottom by double-headed arrows:

| Tier (left, dashed box) | What runs there (middle column) | Layer name (right column) |
|---|---|---|
| Client | GUI, Web Interface | Presentation Layer |
| Application Server or Web Server | Application Programs, Web Pages | Business Logic Layer |
| Database Server | Database Management System (⭐ boxed in blue) | Database Services Layer |

**— Section 4: Before were File Systems... —**

### [S14] Outline → section 4, "Before were File Systems...".

### [S15] Section divider: "**Before DBMSs were files...**" / "or: On Limits of File Systems to Manage Data".

### [S16] Database Systems as File Systems
- "In the early days, database applications were built directly on top of file systems (O.S.'s)". The words "built directly on top of file systems (O.S.'s)" are underlined.
- ⭐ **Question** (to the class): "What is a today example of "database system" based on files? … (*we use it every day, maybe*)"
- **Answer**: ? The cartoon cat in a thinking pose means "think about it"; the answer is on the next slide.

### [S17] Database Systems as File Systems (answer)
- Same text as S16 ("database system" now appears without quotes), then:
- **Answer**: "MS Excel / Modern OSs (*if search allowed*)"

### [S18] Drawbacks of Using File Systems (first slide of the series)
- **Data redundancy and inconsistency**: "Multiple file formats, duplication of information in different files"

### [S19] Drawbacks of Using File Systems (adds the 2nd)
- Repeats S18, then adds:
- **Difficulty in accessing data** (*query processing*): "Need to write a new application program to carry out each new task over available data"
- ⭐ **Example**: ? (thinking cat; the answer is on S20)

### [S20] Drawbacks of Using File Systems (example for the 2nd)
- Same as S19, plus:
- **Example**: "Poor selectivity of "search" in PCs; you can access by "keyword" only: *all* docs with that keyword (and using an additional keyword could not be satisfactory for certain tasks)"

### [S21] Drawbacks of Using File Systems: the "Fall semester" example
- Picture: a music-player entry for the song **"Spring, Summer, Winter And Fall"** by **Aphrodite's Child**, album **"Best Of Aphrodite's Child"** (the cover shows a baby). Caption: "*It's a nice song, by the way…*"
- ⭐ "**Example** (*do search for "Fall semester"…*): Poor selectivity of "search" in PCs; you can access by "keyword" only: *all* docs with that keyword (and using an additional keyword could not be satisfactory for certain tasks)"
- The example is worked through in §5.

### [S22] Drawbacks of Using File Systems (adds the 3rd and 4th)
- Repeats the first two drawbacks, then adds:
- **Data isolation**: "Multiple files and formats; no links among files"
- **Integrity problems**: "Hard to add new constraints or change existing ones (E.g., numerical constraint in MS Excel.)"
- ⭐ These two are framed in red, with a yellow label: **"Data Integration Problem"**.

### [S23] Data Integration
- A diagram. Red source line: "*Source: Lenzerini, PODS 2002*". On the left, in blue: "E.g.: **Knowledge Graph**".
- **Top:** **Query** ↕ a **Global schema** box. Inside it are blue rectangles connected through blue diamonds, with arrows between some of the rectangles.
- **Middle:** red double-headed arrows labelled **Mapping** connect the global schema to two **Source schemas**.
- **Left source schema:** a table R1, fed by the cylinder **Source 1**:

| R1 | C1 | D1 | T1 |
|---|---|---|---|
| | c1 | d1 | t1 |
| | c2 | d2 | t2 |

- **Right source schema:** a small graph of green nodes joined by arrows, fed by the cylinder **Source 2**.
- **Reading the picture:** the user asks one query against one global schema, and mappings tie it to sources with different shapes (a table and a graph). This answers the "Data Integration Problem" label on S22, which covers *data isolation* ("no links among files").
- 🔎 Look up in Track B: data integration, global schema and mappings; knowledge graphs; what the rectangle and diamond shapes mean.

### [S24] Drawbacks of Using File Systems (5th)
- **Atomicity of updates**: "Failures may leave database in an inconsistent state with partial updates carried out"
- ⭐ **Example**: ? (thinking cat)

### [S25] Drawbacks of Using File Systems (example for the 5th)
- "**Example**: Transfer of funds from one account to another should either complete or not happen at all."

### [S26] Drawbacks of Using File Systems (6th)
- **Concurrent access by multiple users**: "Concurrent access needed for performance" · "Uncontrolled concurrent accesses can lead to inconsistencies"
- ⭐ **Example**: ? (thinking cat)

### [S27] Drawbacks of Using File Systems (example for the 6th)
- "**Example**: Two people reading a balance and updating it by withdrawing money at the same time."

### [S28] Drawbacks of Using File Systems (7th)
- **Security problems**: "Hard to provide user access to some, but not all, data"
- **Example**: "Password on Acrobat Reader for PDFs is for all the content, not *some* of it."

### [S29] Divider ⭐
- In red: "**To solve all drawbacks above...**". In bold: "**...DBMSs have been developed since mid 1960s!**"

### [S30] 1973 ACM Turing Award Lecture (Charles W. Bachman)
- A scanned page titled "1973 ACM Turing Award Lecture", plus the ACM web profile. A URL runs up the left edge: `https://amturing.acm.org/award_winners/bachman_9385610.cfm`.
- Introduction (italic on the page): "The Turing Award citation read by Richard G. Canning, chairman of the 1973 Turing Award Committee, at the presentation of this lecture on August 28 at the ACM Annual Conference in Atlanta:"
- ⭐ **Passage boxed in blue** (word for word):
  > "A significant change in the computer field in the last five to eight years has been made in the way we treat and handle data. In the early days of our field, data was intimately tied to the application programs that used it. Now we see that we want to break that tie. We want data that is independent of the application programs that use it—that is, data that is organized and structured to serve many applications and many users. What we seek is the *data base*."
- Rest of the citation, quoted:
  - "This movement toward the data base is in its infancy. Even so, it appears that there are now between 1,000 and 2,000 true data base management systems installed worldwide. In ten years very likely, there will be tens of thousands of such systems. Just from the quantities of installed systems, the impact of data bases promises to be huge."
  - "This year's recipient of the A.M. Turing Award is one of the real pioneers of data base technology." The citation gives "three prime examples":
    1. "He was the creator and principal architect of the first commercially available data base management system—the Integrated Data Store—originally developed from 1961 to 1964. I-D-S is today one of the three most widely used data base management systems."
    2. "he was one of the founding members of the CODASYL Data Base Task Group, and served on that task group from 1966 to 1968." The group's specifications "represent the only proposal of stature for a common architecture for data base management systems" and "embody much of the original thinking of the Integrated Data Store."
    3. "he was the creator of a powerful method for displaying data relationships—a tool for data base designers as well as application system designers."
  - "His contributions have thus represented the union of imagination and practicality." … "I am very pleased to present the 1973 A.M. Turing Award to Charles W. Bachman."
- ACM profile: **CHARLES WILLIAM BACHMAN**, United States – 1973. ⭐ Red box: "**CITATION** — For his outstanding contributions to database technology." A photo of Bachman.
- Lecture title: "**The Programmer as Navigator** by Charles W. Bachman".
- Why this slide closes section 4: the boxed passage names the goal that fixes the file-system problems, data that is "independent of the application programs" and serves "many applications and many users". Compare data independence on S36.
- 🔎 Look up in Track B: CODASYL and IDS (Integrated Data Store).

**— Section 5: View of Data, or: Levels of Data Abstraction —**

### [S31] Outline → section 5, "View of Data, or: Levels of Data Abstraction".

### [S32] Reminder
- "A database (management) system is a "sum" of" (the word "system" is underlined)
  - "**interrelated data**" (bold blue) "and a"
  - "**set of programs**" (bold blue) "that allow users to access and modify (*conveniently, efficiently*) these data."
- ⭐ In a highlighted box: "**A purpose of a database (management) system is to provide users with an *abstract* view of data.**" ("abstract view of data" is in blue.)
- Compared with S4, the programs here "access **and modify**" the data; S4 says only "access".

### [S33] View of Data
- "An architecture for a database system:". The diagram has three stacked levels joined by vertical lines:
```
              +-------------------- view level --------------------+
              |   [view 1]     [view 2]     . . .     [view n]     |
              +----------------------------------------------------+
                                       |
                                [logical level]
                                       |
                                [physical level]
```
  (This is my redraw of the slide's diagram.)
- So there are **many views** on top, **one** logical level and **one** physical level.

### [S34] View of Data (*variant*)
- This is the reference book's version of S33 (Elmasri–Navathe cover shown) ⭐ "cfr. Reference book (R1)". The professor's labels on the left match its levels to S33:

| Professor's label (left) | Level in the figure | What is drawn |
|---|---|---|
| View Level: | External Level | **End Users** (stick figures) on top, each with an **External View** (External View … External View) |
| Conceptual / Logical Levels: | Conceptual Level | one **Conceptual Schema** |
| Physical Level: | Internal Level | one **Internal Schema** above the **Stored Database** (three cylinders) |

- Between the levels: **External/Conceptual Mapping** (an arrow from each External View to the Conceptual Schema) and **Conceptual/Internal Mapping** (a double arrow between the Conceptual Schema and the Internal Schema).
- 🔎 Look up in Track B: what the two "mappings" do exactly.

### [S35] Levels of Abstraction
- "**Physical level:** describes how a record (e.g., see *instructor* below) is physically stored." ("how" is underlined.)
- "**Logical level:** describes what data are stored in database, and the relationships among the data." ("what" is underlined.)
- **Example:** (copied exactly)
```
type instructor = record
                ID : string;
                name : string;
                dept_name : string;
                salary : integer;
            end;
```
  Next to it is a box headed *instructor* that lists *ID* (underlined), *name*, *dept_name*, *salary*.
- "**View level:** application programs hide details of data types. Views can also hide information (such as an employee's salary or student's credits) for security/privacy purposes."
- **How the slide's example works:** the example sits right under the logical-level bullet, and the physical-level bullet points to it ("e.g., see instructor below"). The record type says **what** data an instructor has (ID, name, dept_name, salary: logical level). **How** such a record is physically stored belongs to the physical level. What a given user or application gets to see, possibly with salary hidden, belongs to the view level.

### [S36] Data Independence
- "**Logical Data Independence** – property of DBMSs to allow change of conceptual schema (*logical level*) without having to change the external schemas (*view level*) and their associated application programs." ("logical level" and "view level" are in red italics.)
  - ⭐ "**Note**: Applications (i.e., user programs) depend on / are designed to deal with the View Level."
- ⭐ In a highlighted box: "**Physical Data Independence** – property of DBMSs to allow change of the internal schema (*physical level*) without having to change the conceptual/logical schema to access data."

| | Logical data independence | Physical data independence |
|---|---|---|
| What may change | conceptual schema (logical level) | internal schema (physical level) |
| What does **not** have to change | the external schemas (view level) and their associated application programs | the conceptual/logical schema |
| Extra point on the slide | Note: applications depend on / are designed to deal with the View Level | (this is the highlighted bullet) |

- In terms of the S33/S34 levels, a change at one level does not force a change at the level above it.

### [S37] Instances and Schemas
- "**Schema**– the overall structure of the database" ("structure" is underlined.)
  - "Analogous to the type of a variable in a program" ("type of a variable" is in blue.)
- "**Instance** – the content of the database at a particular point in time" ("content" and "at a particular point in time" are underlined.)
  - "Analogous to the value of a variable" ("value of a variable" is in blue.)
- The table on the slide, all 12 rows:

| ID | name | salary | dept_name | building | budget |
|---|---|---|---|---|---|
| 22222 | Einstein | 95000 | Physics | Watson | 70000 |
| 12121 | Wu | 90000 | Finance | Painter | 120000 |
| 32343 | El Said | 60000 | History | Painter | 50000 |
| 45565 | Katz | 75000 | Comp. Sci. | Taylor | 100000 |
| 98345 | Kim | 80000 | Elec. Eng. | Taylor | 85000 |
| 76766 | Crick | 72000 | Biology | Watson | 90000 |
| 10101 | Srinivasan | 65000 | Comp. Sci. | Taylor | 100000 |
| 58583 | Califieri | 62000 | History | Painter | 50000 |
| 83821 | Brandt | 92000 | Comp. Sci | Taylor | 100000 |
| 15151 | Mozart | 40000 | Music | Packard | 80000 |
| 33456 | Gold | 87000 | Physics | Watson | 70000 |
| 76543 | Singh | 80000 | Finance | Painter | 120000 |

- ⚠️ Row 83821 (Brandt) says "Comp. Sci" with no final period. Following the slide's own data it should be "Comp. Sci.", like the other two Comp. Sci. rows (Katz, Srinivasan), which have the same building (Taylor) and budget (100000).
- **Applying the definitions to this table:** the **schema** is the structure, a table with the six columns ID, name, salary, dept_name, building, budget. The **instance** is these 12 rows, the content at this point in time. Adding or changing a row changes the instance, not the schema.
- What the table shows: a department's building and budget repeat in every row of that department. Comp. Sci./Taylor/100000 appears 3 times; Physics/Watson/70000, Finance/Painter/120000 and History/Painter/50000 appear twice each.
- 🔎 Look up in Track B: why that kind of repetition matters when designing tables.

### [S38] Schema: Example
- A schema diagram of a university database with 11 boxes (table name on top, attributes below). Attributes underlined on the slide are shown in **bold** here:

| Box | Attributes (underlined on the slide = **bold**) |
|---|---|
| takes | **ID**, **course_id**, **sec_id**, **semester**, **year**, grade |
| student | **ID**, name, dept_name, tot_cred |
| section | **course_id**, **sec_id**, **semester**, **year**, building, room_no, time_slot_id |
| course | **course_id**, title, dept_name, credits |
| department | **dept_name**, building, budget |
| advisor | **s_id**, i_id |
| time_slot | **time_slot_id**, **day**, **start_time**, end_time |
| prereq | **course_id**, **prereq_id** |
| instructor | **ID**, name, dept_name, salary |
| classroom | **building**, **room_no**, capacity |
| teaches | **ID**, **course_id**, **sec_id**, **semester**, **year** |

- **Arrows** (from → to):
  - takes → student; takes → section
  - section → course; section → classroom
  - teaches → section; teaches → instructor
  - prereq → course
  - course → department; student → department; instructor → department
  - advisor → student; advisor → instructor
  - No arrow touches time_slot.
- Links to other slides: the *instructor* box has exactly the fields of the S35 record. *instructor* (ID, name, dept_name, salary) together with *department* (dept_name, building, budget) gives exactly the six columns of the S37 table.
- 🔎 Look up in Track B: what the underlines and the arrows mean in a schema diagram; this deck doesn't explain them.

**— Section 6: Data Models & Languages —**

### [S39] Outline → section 6, "Data Models & Languages".

### [S40] Section divider: "**DBMSs**" / "Data Models & Languages".

### [S41] Data Models
- "**Def**: A collection of conceptual tools for describing:"
  - "Data and Data relationships"
  - "Data semantics"
  - "Data constraints (consistency, duplications, etc)"
- The models named:
  - ⭐ "Relational model" (in blue)
  - "Entity-Relationship data model (mainly for DB design)"
  - "Object-based data models (Object-oriented and Object-relational)"
  - "Semistructured data model (XML / RDF / JSON …)"
  - "Other models:" "Network model / Hierarchical model / NoSQL …"
- 🔎 Look up in Track B: the basic idea of each model; the slide only names them.

### [S42] Data(base) Systems (timeline)
- Title "Data(base) *Systems*". The chart comes from **[Davoudian et al., 2018]** (written vertically on the left) and is framed in orange ⭐. A "Real World (Mini World)" cloud (as on S8) sits top right, with a dashed grey line down the right edge into the chart. A Greek column on the left is decorative.
- The x-axis runs 1960 → 2020. Each data-model family is a horizontal arrow that starts when the family appears. Systems are dots labelled with their years (the print is tiny; years as read):

| Family (row) | Systems on the slide (years) |
|---|---|
| Network | IDS 1964-1975 · IDMS 1970-present |
| Hierarchical | IMS 1967-present |
| Relational | System R 1974-1981 · Univ. Ingres 1974-1985 · Oracle 1979-present · Comm. Ingres 1980-present · Informix 1981-present · DB2 1983-present · Sybase 1986-present · SQL Server 1989-present · Postgres 1989-1994 · MySQL 1995-present · PostgreSQL 1997-present |
| Object-oriented | Matisse 1986-present · ObjectStore 1988–present · O2 1988-1997 · Versant 1989-present · Perst 2003-present · VelocityDB 2012-present |
| NoSQL (in green) | Bigtable 2005-2015 · Dynamo 2007-2012 · Cassandra 2008-present · Titan 2012-present · DynamoDB 2012-present · Cloud Bigtable 2015-present |
| NewSQL | H-Store 2007-present · NuoDB 2011-present · Spanner 2012-present · CockroachDB 2014-present |

- Blue markers on the time axis: "**Transactions SQL**" (mid-1970s) and "**Map-Reduce**" (mid-2000s).
- Eras, shown as brackets under the axis:

| Period (approx., from the brackets) | Era (slide wording) |
|---|---|
| 1960s–1970s | Mainframes' era |
| 1980s | Mini computers' era |
| 1990s | Client server and early Web applications' era |
| 2000s–2010s | Global-scope applications' era, requiring to store and access big data |

- MySQL, the DBMS used in the labs, is on the Relational row (1995-present).
- 🔎 Look up in Track B: what NoSQL and NewSQL mean, and Map-Reduce.

### [S43] Data Models
- Left ⭐: a pyramid credited to "(Blumauer & Nagy, 2020)". From bottom to top: **DATA → INFORMATION → KNOWLEDGE → WISDOM**. Next to it, an orange box lists **Knowledge** (red), **Information** (green) and **Data** (blue), the three lower layers.
- Right: "The **World** is… "the totality of **Facts**" (Wittgenstein) i.e., . . . **Data**!" ("Facts" and "Data" are in red.)
- A "Real World (Mini World)" cloud has a dashed line down to an orange-framed list; a big orange arrow also points at that list ⭐:
  - Data and Data relationships
  - Data semantics
  - Data constraints (*internal*, business rules, …)
- **The slide's logic:** the world is "the totality of Facts", i.e., data. A data model describes those data, their relationships, their semantics and their constraints, the same three items as the S41 definition. S41 gives constraint examples as "consistency, duplications, etc"; S43 gives "internal, business rules, …".
- 🔎 Look up in Track B: the data–information–knowledge–wisdom pyramid.

### [S44] DBMSs Languages
- "Database systems provide a set of linguistic tools to specify everything about the data it deals with:"
  - "Data-Definition Language (**DDL**): to specify the (logical, physical) schema"
  - "Data-Manipulation Language (**DML**): to specify the operations to manage the (instances of) data, e.g.:"
    - "- Querying (information retrieval)"
    - "- Inserting new data"
    - "- Deleting existing data"
    - "- Modifying existing data …"
- ⭐ "DDL" and "DML" are in bold blue; "**schema**" and "**instances**" are red and underlined, linking to schema vs instance on S37.
- ⚠️ (grammar) "the data it deals with" should be "the data they deal with", since the subject is "Database systems" (plural).

| | DDL (Data-Definition Language) | DML (Data-Manipulation Language) |
|---|---|---|
| Specifies | the (logical, physical) **schema** | the operations to manage the (**instances** of) data |
| Examples on slide | none | querying (information retrieval), inserting new data, deleting existing data, modifying existing data … |
| Where it enters the DBMS (S7/S45) | DDL interpreter | DML queries → DML compiler and organizer → query evaluation engine |
| Where it appears on S8 | "Data Modeling(Database Design)" arrow labelled "DDL" | next to the AP.Programmer ("Host language", "DML") |

### [S45] DBMS Architecture (again, now in section 6)
- The same picture as S7, now under "Data Models & Languages". What changed:
  - ⭐ **DML queries** and **DDL interpreter** are boxed in red, and two big orange arrows point at them.
  - The tool ovals are no longer circled and "data" is no longer boxed.
  - The left arrow covers part of "compiler and linker" (only "compiler" is visible) and part of "application program object code" (only "program object code" is visible).
- **Meaning in context (with S44):** these are the two places where the two languages enter the DBMS. DML queries arrive from application programs (through compiler and linker), from application program object code, from query tools and from administration tools. DDL goes to the DDL interpreter, which in this picture is fed by the administration tools.

### [S46] *Relational* Query Languages
- ""Pure" relational query languages:"

| Language | Kind (slide) |
|---|---|
| Relational algebra | (*procedural*) |
| Tuple relational calculus | (*non-procedural*) |
| Domain relational calculus | (*non-procedural*) |

- "These languages are equivalent in computing power and expressiveness."
- "SQL (more expressive; based on pure languages)"
- 🔎 Look up in Track B: what "procedural" and "non-procedural" mean for a query language.

**— Section 7: Very Brief History of DBMSs —**

### [S47] Outline → section 7, "Very Brief History of DBMSs".

### [S48] Section divider: "**DBMSs**" / "(Very) Brief History".

### [S49] Brief History of Database Systems
- **1950s and early 1960s:**
  - Data processing using magnetic tapes for storage
    - Tapes provided only sequential access
  - Punched cards for input
- **Late 1960s and 1970s:**
  - Hard disks allowed direct access to data
  - Network and hierarchical data models in widespread use
  - ⭐ (highlighted box, from here to the 1979 line) **Codd [1970] defines the Relational Data Model**
    - Would win the **ACM Turing Award** for this work (in blue)
    - IBM Research begins System R prototype
    - UC Berkeley begins Ingres prototype
    - (1979) First RDBMS (by RSI, i.e., **Oracle** since 1983) ("Oracle" is in red)
  - High-performance (for the era) transaction processing
- Matches S42: System R 1974-1981, Univ. Ingres 1974-1985, Oracle 1979-present.

### [S50] Brief History (*cont.*) - Main Reference
- ⭐ "**Suggested reading (non-technical parts)**:" (bold, underlined)
```
@Article{Codd70cacm,
 author    = "E. F. Codd",
 title     = "A Relational Model of Data for Large Shared Data Banks",
 journal   = "Communications of the ACM",
 year      = "1970",
 volume    = "13",
 number    = "6",
 pages     = "377--387"
}
```
- In words: E. F. Codd, "A Relational Model of Data for Large Shared Data Banks", *Communications of the ACM*, 1970, vol. 13, no. 6, pp. 377–387.

### [S51] Brief History (*cont.*)
- **1980s:**
  - Research relational prototypes evolve into commercial systems - ⭐ **SQL becomes industrial standard** (in red)
  - Parallel and distributed database systems
  - Object-oriented database systems
- **1990s:**
  - Large decision support and data-mining applications
  - Large multi-terabyte data warehouses
  - Emergence of Web commerce
- **Early 2000s:**
  - XML and XQuery standards
  - Automated database administration; Semantic Web
- **Later 2000s:**
  - Giant data storage systems: Google, Yahoo, Amazon, …
- 🔎 Look up in Track B: data warehouses, data mining, XQuery, the Semantic Web (only named here).

**— Closing —**

### [S52] Summary
- The same 7 section titles as S3, all shown in red: Definition of DBMSs · DBMSs' Applications and Purposes · DBMSs' Architecture and Users · Before were File Systems... · View of Data, or: Levels of Data Abstraction · Data Models & Languages · Very Brief History of DBMSs.

### [S53] End of Slides
- "DATABASE" / "End of Slides" / "WEEK 1" / "Code: W1.L1L2".

---

**⚠️ Typos found in this deck (summary, not part of S53):** S4 "(i.e, information)" → "(i.e., information)" · S12 "directly access to DB server" (twice) → "directly access the DB server" · S37 row 83821 "Comp. Sci" → "Comp. Sci." · S44 "the data it deals with" → "the data they deal with".

---

## 3. Definitions & key terms (word for word, as on the slides)

1. **Database-management system (DBMS)**: "A database-management system (DBMS) is a collection of interrelated data (i.e, information) about a particular enterprise together with a set of programs to access those data." [S4]
   - "So: Collection of interrelated data / Set of programs to access the data" [S4]
2. **DBMS environment**: "A DBMS provides an environment that is both *convenient* and *efficient* to use." [S4]
3. **DBMS as a "sum"**: "A database (management) system is a "sum" of interrelated data and a set of programs that allow users to access and modify (conveniently, efficiently) these data." [S32]
4. **Purpose of a DBMS**: "A purpose of a database (management) system is to provide users with an *abstract* view of data." [S32]
5. **DBMS architecture (what shapes it)**: "Greatly influenced by underlying computer system on which the database is running: Centralized / Client-server / Parallel (multi-processor) / Distributed" [S9]
6. **Two-tier architecture**: "Clients can directly access to DB server (but also Printer/File/ Mail…servers)." "Access via API standards ODBC/JDBC." [S12]
7. **Three-tier architecture**: "Clients can't directly access to DB server." "Common for Web/systems with many users." "Enhance security." [S12]
8. **SQL server**: "Terminology: called SQL server if DBMS is Relational" [S12]
9. **Three-tier layers**: Presentation Layer (Client; GUI, Web Interface) · Business Logic Layer (Application Server or Web Server; Application Programs, Web Pages) · Database Services Layer (Database Server; Database Management System) [S13]
10. **Data redundancy and inconsistency**: "Multiple file formats, duplication of information in different files" [S18]
11. **Difficulty in accessing data (*query processing*)**: "Need to write a new application program to carry out each new task over available data" [S19]
12. **Data isolation**: "Multiple files and formats; no links among files" [S22]
13. **Integrity problems**: "Hard to add new constraints or change existing ones (E.g., numerical constraint in MS Excel.)" [S22]
14. **Data Integration Problem**: the label the professor puts on data isolation + integrity problems [S22]. S23 illustrates data integration (global schema, mapping, source schemas); there is no worded definition.
15. **Atomicity of updates**: "Failures may leave database in an inconsistent state with partial updates carried out" [S24]
16. **Concurrent access by multiple users**: "Concurrent access needed for performance" / "Uncontrolled concurrent accesses can lead to inconsistencies" [S26]
17. **Security problems**: "Hard to provide user access to some, but not all, data" [S28]
18. **The "data base" (Bachman citation)**: "We want data that is independent of the application programs that use it—that is, data that is organized and structured to serve many applications and many users. What we seek is the *data base*." [S30]
19. **Physical level**: "describes how a record (e.g., see instructor below) is physically stored." [S35]
20. **Logical level**: "describes what data are stored in database, and the relationships among the data." [S35]
21. **View level**: "application programs hide details of data types. Views can also hide information (such as an employee's salary or student's credits) for security/privacy purposes." [S35]
22. **Level names in the variant**: External Level (External Views) / Conceptual Level (Conceptual Schema) / Internal Level (Internal Schema, Stored Database), with "External/Conceptual Mapping" and "Conceptual/Internal Mapping" [S34]
23. **Logical Data Independence**: "property of DBMSs to allow change of conceptual schema (logical level) without having to change the external schemas (view level) and their associated application programs." [S36]
   - "Note: Applications (i.e., user programs) depend on / are designed to deal with the View Level." [S36]
24. **Physical Data Independence**: "property of DBMSs to allow change of the internal schema (physical level) without having to change the conceptual/logical schema to access data." [S36]
25. **Schema**: "the overall structure of the database". "Analogous to the type of a variable in a program" [S37]
26. **Instance**: "the content of the database at a particular point in time". "Analogous to the value of a variable" [S37]
27. **Data model**: "A collection of conceptual tools for describing: Data and Data relationships / Data semantics / Data constraints (consistency, duplications, etc)" [S41]. S43 gives the constraints as "(internal, business rules, …)".
28. **Data model levels** (DB Designer picture): "Conceptual(High-Level) Data Model : ERDM, OODM" / "Representational(Implementation) Data Model : RDM, HDM, NDM - depends on DBMS" / "Physical(Low-Level) Data Model : Record Type, access methods" [S8]
29. **The World**: "The World is… "the totality of Facts" (Wittgenstein) i.e., … Data!" [S43]
30. **DBMS languages**: "Database systems provide a set of linguistic tools to specify everything about the data it deals with" [S44]
31. **DDL**: "Data-Definition Language (DDL): to specify the (logical, physical) schema" [S44]
32. **DML**: "Data-Manipulation Language (DML): to specify the operations to manage the (instances of) data, e.g.: Querying (information retrieval) / Inserting new data / Deleting existing data / Modifying existing data …" [S44]
33. **"Pure" relational query languages**: "Relational algebra (procedural) / Tuple relational calculus (non-procedural) / Domain relational calculus (non-procedural)". "These languages are equivalent in computing power and expressiveness." [S46]
34. **SQL**: "SQL (more expressive; based on pure languages)" [S46]. "SQL becomes industrial standard" (1980s) [S51]
35. **Relational Data Model**: "Codd [1970] defines the Relational Data Model". "Would win the ACM Turing Award for this work" [S49]
36. **DB Schema / DB Instance in the users picture**: "Meta DB" → "DB Schema"; "Stored DB" → "DB Instance" [S8]

---

## 4. Lists & comparisons to memorize

### 4.1 The 7 sections of the deck [S3, S52]
1. Definition of DBMSs · 2. DBMSs' Applications and Purposes · 3. DBMSs' Architecture and Users · 4. Before were File Systems... · 5. View of Data, or: Levels of Data Abstraction · 6. Data Models & Languages · 7. Very Brief History of DBMSs

### 4.2 Database applications [S5]
Banking (transactions) · Airlines (reservations, schedules) · Universities (registration, grades) · Sales (customers, products, purchases) · Online retailers (order tracking, customized recommendations) · Manufacturing (production, inventory, orders, supply chain) · Human resources (employee records, salaries, tax deductions) · …

### 4.3 Users and roles

| Slide | User | What they do / use |
|---|---|---|
| S7 | naive users (tellers, agents, web users) | **use** application interfaces |
| S7 | application programmers | **write** application programs |
| S7 | sophisticated users (analysts) | **use** query tools |
| S7 | database administrators | **use** administration tools |
| S8 | End User | ↔ Application (apps) |
| S8 | AP.Programmer | builds the Application with "Host language" and "DML" |
| S8 | DB Designer | "Data Modeling(Database Design)" → DDL into the DBMS; the Conceptual / Representational / Physical data models |
| S8 | DBA | shown at the edge of the "Database System" circle |

### 4.4 Internal components of the DBMS [S7, S45]

| Part | Components |
|---|---|
| query processor | compiler and linker · application program object code · DML queries · DML compiler and organizer · query evaluation engine · DDL interpreter |
| storage manager | buffer manager · file manager · authorization and integrity manager · transaction manager |
| disk storage | data · indices · data dictionary · statistical data |

### 4.5 Architectures [S9–S13]
- Four kinds, by the underlying computer system [S9]: **Centralized · Client-server · Parallel (multi-processor) · Distributed**.

| | Centralized [S10] | Client-server [S11] |
|---|---|---|
| User side | Terminals: Display Monitors | Clients |
| Connection | Network | Network |
| Machine with the DBMS | one computer: Software (incl. DBMS) / Operating System / Hardware/Firmware | the same stack, framed and labelled "**server**" |
| Professor's note | "PCs have their own display/ monitor", "no network needed", "So, common case of centralized DBMS architecture" | "cfr. Reference book (R1) (modified)" |

- Two-tier vs three-tier: see the table under [S12]. Three-tier layer terminology: see the table under [S13].

### 4.6 The 7 drawbacks of file systems, with class examples [S18–S28]

| # | Drawback | Slide wording | Class example |
|---|---|---|---|
| 1 | Data redundancy and inconsistency | Multiple file formats, duplication of information in different files | — |
| 2 | Difficulty in accessing data (*query processing*) | Need to write a new application program to carry out each new task over available data | Poor selectivity of "search" in PCs: search by keyword returns *all* docs with that keyword ("Fall semester" vs the song "Spring, Summer, Winter And Fall") [S20–S21] |
| 3 | Data isolation | Multiple files and formats; no links among files | (labelled "Data Integration Problem"; S23 diagram) |
| 4 | Integrity problems | Hard to add new constraints or change existing ones | numerical constraint in MS Excel [S22] |
| 5 | Atomicity of updates | Failures may leave database in an inconsistent state with partial updates carried out | Transfer of funds from one account to another should either complete or not happen at all [S25] |
| 6 | Concurrent access by multiple users | Concurrent access needed for performance; Uncontrolled concurrent accesses can lead to inconsistencies | Two people reading a balance and updating it by withdrawing money at the same time [S27] |
| 7 | Security problems | Hard to provide user access to some, but not all, data | Password on Acrobat Reader for PDFs is for all the content, not *some* of it [S28] |

Mnemonic (initials, my own): **R**edundancy · **A**ccess · **I**solation · **I**ntegrity · **A**tomicity · **C**oncurrency · **S**ecurity → "RAI-IACS".
Then: "To solve all drawbacks above... ...DBMSs have been developed since mid 1960s!" [S29]

### 4.7 The 3 levels of data abstraction [S33–S35]

| S33 name | S34 (variant) name | What is there | What it describes (S35) |
|---|---|---|---|
| view level (view 1 … view n) | External Level | External Views, one per group of End Users | "application programs hide details of data types. Views can also hide information (such as an employee's salary or student's credits) for security/privacy purposes." |
| logical level | Conceptual Level ("Conceptual / Logical Levels") | one Conceptual Schema | "what data are stored in database, and the relationships among the data" |
| physical level | Internal Level | one Internal Schema over the Stored Database | "how a record … is physically stored" |

Mappings [S34]: External/Conceptual Mapping (view ↔ logical); Conceptual/Internal Mapping (logical ↔ physical).

### 4.8 Data independence [S36]
- **Logical**: you can change the *conceptual schema* (logical level) without changing the *external schemas* (view level) and their application programs.
- **Physical**: you can change the *internal schema* (physical level) without changing the *conceptual/logical schema*.
- (Full table under [S36].)

### 4.9 Schema vs instance [S37] (and S8, S44)

| | Schema | Instance |
|---|---|---|
| Definition | "the overall structure of the database" | "the content of the database at a particular point in time" |
| Programming analogy | "the type of a variable in a program" | "the value of a variable" |
| In the S8 picture | "Meta DB" → "DB Schema" | "Stored DB" → "DB Instance" |
| Language (S44) | DDL specifies the (logical, physical) schema | DML manages the (instances of) data |
| In the S37 table | the 6 columns: ID, name, salary, dept_name, building, budget | the 12 rows shown |

### 4.10 Data models
- **Families** [S41]: Relational model · Entity-Relationship data model (mainly for DB design) · Object-based data models (Object-oriented and Object-relational) · Semistructured data model (XML / RDF / JSON …) · Other models: Network model / Hierarchical model / NoSQL …
- **What a data model describes** [S41, S43]: Data and Data relationships · Data semantics · Data constraints
- **Levels of data models (DB Designer)** [S8]: Conceptual (High-Level): ERDM, OODM · Representational (Implementation): RDM, HDM, NDM, which "depends on DBMS" · Physical (Low-Level): Record Type, access methods
- **Pyramid** [S43], bottom → top: DATA → INFORMATION → KNOWLEDGE → WISDOM
- **Timeline families** [S42]: Network & Hierarchical (1960s) → Relational (1970s) → Object-oriented (mid/late 1980s) → NoSQL (2000s) → NewSQL (late 2000s)

### 4.11 Languages [S44, S46]
- **DDL** → schema; **DML** → instances: query, insert, delete, modify. Full table under [S44].
- **Pure relational query languages**: relational algebra = *procedural*; tuple relational calculus and domain relational calculus = *non-procedural*. All three are "equivalent in computing power and expressiveness". **SQL** is "more expressive; based on pure languages".

### 4.12 History timeline [S29, S30, S42, S49, S51]

| When | What (slide wording) | Slide |
|---|---|---|
| 1950s and early 1960s | Data processing using magnetic tapes for storage (tapes provided only sequential access); punched cards for input | S49 |
| 1961–1964 | Integrated Data Store (I-D-S), "the first commercially available data base management system" (Bachman). The S42 timeline shows IDS 1964-1975 | S30, S42 |
| mid 1960s | "DBMSs have been developed since mid 1960s!" | S29 |
| 1966–1968 | Bachman on the CODASYL Data Base Task Group | S30 |
| Late 1960s and 1970s | Hard disks allowed direct access to data; network and hierarchical data models in widespread use; high-performance (for the era) transaction processing | S49 |
| 1970 | Codd defines the Relational Data Model (would win the ACM Turing Award); paper: "A Relational Model of Data for Large Shared Data Banks", CACM 13(6), 377–387 | S49, S50 |
| 1970s | IBM Research begins System R prototype; UC Berkeley begins Ingres prototype | S49 |
| 1973 | ACM Turing Award to Charles W. Bachman, "For his outstanding contributions to database technology"; lecture "The Programmer as Navigator" | S30 |
| 1979 | First RDBMS (by RSI, i.e., Oracle since 1983) | S49 |
| 1980s | Research relational prototypes become commercial systems; **SQL becomes industrial standard**; parallel and distributed DB systems; object-oriented DB systems | S51 |
| 1990s | Large decision support and data-mining applications; large multi-terabyte data warehouses; emergence of Web commerce | S51 |
| Early 2000s | XML and XQuery standards; automated database administration; Semantic Web | S51 |
| Later 2000s | Giant data storage systems: Google, Yahoo, Amazon, … | S51 |

Eras from S42: Mainframes' era → Mini computers' era → Client server and early Web applications' era → Global-scope applications' era, requiring to store and access big data.

---

## 5. Examples & questions from class (explained using slide content)

1. **Question to the class [S16 → S17]: "What is a today example of "database system" based on files? … (we use it every day, maybe)"**
   - Class answer: **"MS Excel / Modern OSs (if search allowed)"**.
   - Why it fits: S16 says that "In the early days, database applications were built directly on top of file systems (O.S.'s)". A spreadsheet file, or an operating system that lets you search your files, is a file-based "database system" we still use every day. The later drawback slides reuse these everyday examples: PC search on S20–S21 and MS Excel on S22.

2. **Difficulty in accessing data, the "Fall semester" search [S19 → S20 → S21]**
   - Slide text: "Poor selectivity of "search" in PCs; you can access by "keyword" only: *all* docs with that keyword (and using an additional keyword could not be satisfactory for certain tasks)".
   - Step by step: (1) you want your files about the *Fall semester*. (2) A PC search works by keyword, so it returns *all* documents containing the keyword. (3) The keyword "Fall" also matches the song "Spring, Summer, Winter And Fall" (Aphrodite's Child) shown on S21, which has nothing to do with the semester. (4) Adding another keyword may still not give exactly what a given task needs. So the search has poor selectivity. The slide's general point: with files, every new task needs a new application program (S19).

3. **Integrity problems [S22]**: "Hard to add new constraints or change existing ones (E.g., numerical constraint in MS Excel.)". The slide gives only this example: putting a rule on numbers in a spreadsheet file is hard to add or change. Together with *data isolation* ("no links among files"), the professor labels this the **"Data Integration Problem"**.

4. **Data integration, e.g., a knowledge graph [S23]**: one **Query** goes to one **Global schema**. **Mapping** arrows link the global schema to two differently shaped **Source schemas**: a table R1(C1, D1, T1) with rows (c1, d1, t1) and (c2, d2, t2) from **Source 1**, and a graph of nodes and arrows from **Source 2**. This is the picture that answers "no links among files" (source: Lenzerini, PODS 2002).

5. **Atomicity of updates, transfer of funds [S24 → S25]**
   - Slide text: "Transfer of funds from one account to another should either complete or not happen at all."
   - Step by step (the account names and amount are illustrative, not on the slide): moving 100 from account A to account B takes two updates, (1) take 100 from A and (2) add 100 to B. If a failure hits after (1) and before (2), the money has left A but never reached B. That is a "partial update carried out", which leaves the data "in an inconsistent state". The slide's rule is all or nothing: both updates or neither.

6. **Concurrent access, two people withdrawing at the same time [S26 → S27]**
   - Slide text: "Two people reading a balance and updating it by withdrawing money at the same time."
   - Step by step (numbers are illustrative, not on the slide): the balance is 100. Person 1 reads 100 and Person 2 reads 100. Person 1 withdraws 30 and writes 70. Person 2 withdraws 50 and writes 50. The final balance is 50, although 80 was withdrawn; it should be 20. Both acted on the same old balance, so one update is overwritten. This is how "Uncontrolled concurrent accesses can lead to inconsistencies", even though "Concurrent access [is] needed for performance".

7. **Security problems, a PDF password [S28]**: "Password on Acrobat Reader for PDFs is for all the content, not *some* of it." A file-level password is all or nothing. You cannot let a user open some parts of the document but not others, which is exactly "Hard to provide user access to some, but not all, data". Compare the view level [S35]: "Views can also hide information (such as an employee's salary or student's credits) for security/privacy purposes."

8. **Bachman's citation [S30]**: "In the early days of our field, data was intimately tied to the application programs that used it. Now we see that we want to break that tie. … What we seek is the *data base*." This is the motivation for leaving file systems, and it links to data independence [S36].

9. **The `instructor` record type [S35]**: `type instructor = record ID : string; name : string; dept_name : string; salary : integer; end;`. It lists **what** data an instructor has (logical level). The physical-level bullet points to it ("e.g., see instructor below") as the record whose physical storage that level describes. The same four fields form the *instructor* box in the S38 schema.

10. **View-level example [S35]**: hide "an employee's salary or student's credits" for security/privacy.

11. **Schema vs instance on the S37 table**: the schema is the structure (6 columns: ID, name, salary, dept_name, building, budget); the instance is the 12 rows at this moment. Programming analogy from the slide: schema = *type* of a variable, instance = *value* of a variable.

12. **University schema [S38]**: 11 tables (takes, student, section, course, department, advisor, time_slot, prereq, instructor, classroom, teaches), with underlined attributes and arrows between tables. This is a concrete example of "Schema – the overall structure of the database".

13. **Professor's note on a PC [S10]**: a PC has its own display/monitor, so no network is needed. It is "the common case of centralized DBMS architecture".

14. **Terminology [S12]**: a DBMS server is "called SQL server if DBMS is Relational".

15. **Wittgenstein [S43]**: "The World is… "the totality of Facts"… i.e., … Data!". Data models are the tools that describe those data, their relationships, semantics and constraints.

16. **Suggested reading [S50]**: the non-technical parts of E. F. Codd, "A Relational Model of Data for Large Shared Data Banks", Communications of the ACM, 13(6), 377–387, 1970.

---

## 6. Likely quiz/exam questions (from these slides only)

1. **(Definition)** Give the class definition of a database-management system (DBMS). What are its two parts ("So: …")?
2. **(MCQ)** According to the slides, a DBMS provides an environment that is both:
   A) cheap and portable B) convenient and efficient C) centralized and distributed D) secure and parallel
3. **(List)** Name five database applications from class and what data each one handles.
4. **(Matching)** In the DBMS architecture diagram, match each user type to the tool it *uses* or *writes*: naive users (tellers, agents, web users); application programmers; sophisticated users (analysts); database administrators.
5. **(MCQ)** In the DBMS architecture diagram, which box belongs to the **query processor**, not the storage manager?
   A) buffer manager B) transaction manager C) DML compiler and organizer D) file manager
6. **(List)** The DBMS architecture is "greatly influenced by underlying computer system on which the database is running". List the four kinds named in class.
7. **(Explain)** Why does the professor's note call a PC the "common case of centralized DBMS architecture"?
8. **(Compare)** Two-tier vs three-tier client-server architecture: (a) can clients directly access the DB server in each? (b) which uses the API standards ODBC/JDBC? (c) which is common for Web systems with many users and enhances security? (d) what is the server called if the DBMS is relational?
9. **(MCQ)** In the three-tier terminology, the tier "Application Programs, Web Pages" (on the Application Server or Web Server) is the:
   A) Presentation Layer B) Business Logic Layer C) Database Services Layer D) Internal Level
10. **(Short answer)** "What is a today example of "database system" based on files?" Give the class answer.
11. **(List)** List the seven drawbacks of using file systems to manage data, as on the slides.
12. **(Example + explain)** Which drawback does "Transfer of funds from one account to another should either complete or not happen at all" illustrate? What goes wrong without it?
13. **(Give an example from the slides)** Give the class example for (a) concurrent access by multiple users, (b) security problems, (c) difficulty in accessing data.
14. **(Short answer)** Who received the 1973 ACM Turing Award, with what citation, and which system did he create (with years)? According to S29, since when have DBMSs been developed?
15. **(Name/explain)** Name the three levels of data abstraction and state what the physical level and the logical level describe. At which level can an employee's salary be hidden for security/privacy?
16. **(Definition)** Define logical data independence and physical data independence.
17. **(Definition + apply)** Define *schema* and *instance* and give the programming analogy for each. In the S37 table (ID, name, salary, dept_name, building, budget with 12 rows), what is the schema and what is the instance?
18. **(Definition + list)** What is a data model (the three things it describes)? List the data models named on S41. Which one is "mainly for DB design"?
19. **(MCQ + short)** Which of these is **not** a DML operation listed in class?
   A) Querying (information retrieval) B) Inserting new data C) Specifying the (logical, physical) schema D) Modifying existing data
   Also: which box in the DBMS architecture diagram receives DDL?
20. **(MCQ + short)** Which "pure" relational query language is *procedural*?
   A) Relational algebra B) Tuple relational calculus C) Domain relational calculus D) SQL
   Also: what does the slide say about the power of the three pure languages and about SQL? Who defined the Relational Data Model, in which year, and in which decade did SQL become the industrial standard?

### Answers

1. "A database-management system (DBMS) is a collection of interrelated data (i.e, information) about a particular enterprise together with a set of programs to access those data." Two parts: "Collection of interrelated data" and "Set of programs to access the data". [S4] (Reminder version: "sum" of interrelated data and a set of programs that allow users to access and modify these data, conveniently and efficiently [S32].)
2. **B**: "both *convenient* and *efficient* to use". [S4]
3. Any five of: Banking (transactions); Airlines (reservations, schedules); Universities (registration, grades); Sales (customers, products, purchases); Online retailers (order tracking, customized recommendations); Manufacturing (production, inventory, orders, supply chain); Human resources (employee records, salaries, tax deductions). [S5]
4. Naive users **use** application interfaces; application programmers **write** application programs; sophisticated users **use** query tools; database administrators **use** administration tools. [S7]
5. **C**: DML compiler and organizer is in the query processor. Buffer manager, file manager, authorization and integrity manager and transaction manager are the storage manager. [S7]
6. Centralized; Client-server; Parallel (multi-processor); Distributed. [S9]
7. In the centralized figure, everything runs on one computer and the users have only display terminals connected by a network. A PC "has [its] own display/ monitor", so "no network [is] needed": the PC alone is a centralized system, hence "common case of centralized DBMS architecture". [S10]
8. (a) Two-tier: yes ("Clients can directly access to DB server (but also Printer/File/Mail…servers)"). Three-tier: no ("Clients can't directly access to DB server"), because they go through the application server. (b) Two-tier: "Access via API standards ODBC/JDBC". (c) Three-tier: "Common for Web/systems with many users", "Enhance security". (d) "called SQL server if DBMS is Relational". [S12]
9. **B**: Business Logic Layer. (Client / GUI, Web Interface = Presentation Layer; Database Server / Database Management System = Database Services Layer.) [S13]
10. "MS Excel / Modern OSs (if search allowed)". [S17]
11. (1) Data redundancy and inconsistency; (2) Difficulty in accessing data (query processing); (3) Data isolation; (4) Integrity problems; (5) Atomicity of updates; (6) Concurrent access by multiple users; (7) Security problems. [S18–S28] (Isolation + integrity are labelled "Data Integration Problem" [S22].)
12. **Atomicity of updates**: "Failures may leave database in an inconsistent state with partial updates carried out". If a failure happens between taking the money out of one account and putting it into the other, only part of the transfer is done and the data become inconsistent. The transfer must complete fully or not happen at all. [S24, S25]
13. (a) "Two people reading a balance and updating it by withdrawing money at the same time" [S27]. (b) "Password on Acrobat Reader for PDFs is for all the content, not some of it" [S28]. (c) "Poor selectivity of "search" in PCs; you can access by "keyword" only: all docs with that keyword…", e.g., searching "Fall semester" also finds the song "Spring, Summer, Winter And Fall" [S20, S21].
14. **Charles W. Bachman** (Charles William Bachman, United States, 1973). Citation: "For his outstanding contributions to database technology." He created "the first commercially available data base management system—the Integrated Data Store—originally developed from 1961 to 1964" [S30]. "DBMSs have been developed since mid 1960s!" [S29]
15. View level, logical level, physical level [S33] (variant: External, Conceptual, Internal [S34]). Physical: "describes how a record … is physically stored". Logical: "describes what data are stored in database, and the relationships among the data". Salary hiding happens at the **view level** ("Views can also hide information (such as an employee's salary or student's credits) for security/privacy purposes"). [S35]
16. Logical: "property of DBMSs to allow change of conceptual schema (logical level) without having to change the external schemas (view level) and their associated application programs." Physical: "property of DBMSs to allow change of the internal schema (physical level) without having to change the conceptual/logical schema to access data." [S36]
17. Schema: "the overall structure of the database", analogous to "the type of a variable in a program". Instance: "the content of the database at a particular point in time", analogous to "the value of a variable". In the S37 table, the schema is the structure (the six columns) and the instance is the 12 rows shown. [S37]
18. "A collection of conceptual tools for describing: Data and Data relationships; Data semantics; Data constraints (consistency, duplications, etc)". Models: Relational; Entity-Relationship (mainly for DB design); Object-based (Object-oriented and Object-relational); Semistructured (XML / RDF / JSON …); others: Network / Hierarchical / NoSQL … The **Entity-Relationship data model** is "mainly for DB design". [S41]
19. **C**: specifying the schema is DDL ("Data-Definition Language (DDL): to specify the (logical, physical) schema"). The DML examples are querying, inserting, deleting, modifying [S44]. DDL goes to the **DDL interpreter** [S7, S45].
20. **A**: Relational algebra (procedural); tuple and domain relational calculus are non-procedural. "These languages are equivalent in computing power and expressiveness"; "SQL (more expressive; based on pure languages)" [S46]. Codd defined the Relational Data Model in **1970** [S49]. SQL became the industrial standard in the **1980s** [S51].

---

## 7. Self-check

- [ ] I can write the class definition of a DBMS word for word, name its two parts, and say what environment it provides and what its purpose is. [S4, S32]
- [ ] I can list the database applications on S5, each with what it stores.
- [ ] I can redraw the DBMS architecture: the four user types and their tools, the six query-processor boxes, the four storage-manager boxes and the four disk-storage items, and say where DML and DDL enter. [S7, S45]
- [ ] I can describe the S8 "Database Users" picture: End User, AP.Programmer (Host language, DML), DB Designer (DDL; Conceptual/Representational/Physical data models with their examples), DBA, Meta DB → DB Schema, Stored DB → DB Instance, Real World (Mini World).
- [ ] I can name the four architecture kinds, explain why a PC is the common centralized case, compare two-tier and three-tier, and give the three-tier layer names. [S9–S13]
- [ ] I can list the 7 file-system drawbacks, each with the professor's example, and say which two are labelled "Data Integration Problem". [S18–S28]
- [ ] I can draw both three-level diagrams, define the physical, logical and view levels, and name the two mappings. [S33–S35]
- [ ] I can define logical and physical data independence and say which schema changes and which does not. [S36]
- [ ] I can define schema and instance with the type/value analogy and point to each in the S37 table and the S38 diagram.
- [ ] I can define a data model, list the model families, explain DDL vs DML and the pure relational query languages, and give the history milestones (Bachman 1973; Codd 1970; System R; Ingres; Oracle 1979/1983; SQL standard in the 1980s). [S30, S41–S51]
