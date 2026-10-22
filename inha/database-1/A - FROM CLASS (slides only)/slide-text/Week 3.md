# Week 3 — raw slide text (verbatim from the professor's PDF)
Source: Week 3 - W3L1L2.pdf · 50 pages (2 slides per page) · 99 slides extracted (footer says /99)

---

## Slide 1  ·  image: slide-001.png  ·  pdf page 1 (top)

Database
(SOC-3020)
Alessandro Agostini12
aagostini@inha.ac.kr
agostini@disi.unitn.it
1LDKR-Group, School of Computer and Information Engineering
Inha University in Tashkent (IUT), Uzbekistan
2DISI, University of Trento, Italy
WEEK 3

---

## Slide 2  ·  image: slide-002.png  ·  pdf page 1 (bottom)

DATABASE
Database Design: The E-R Data Model
WEEK 3
Code: W3.L1L2[LAB#1]

---

## Slide 3  ·  image: slide-003.png  ·  pdf page 2 (top)

Outline
1
From Previous Week
2
Conceptual Data Design
3
Data and Data Relationships
4
Data Semantics
5
Data Constraints
6
Entity Integrity Revised: Weak Entities
7
Example: Company DB
8
LAB #1 : E-R Diagramming

---

## Slide 4  ·  image: slide-004.png  ·  pdf page 2 (bottom)

Any question from you?
...

---

## Slide 5  ·  image: slide-005.png  ·  pdf page 3 (top)

Outline
1
From Previous Week
2
Conceptual Data Design
3
Data and Data Relationships
4
Data Semantics
5
Data Constraints
6
Entity Integrity Revised: Weak Entities
7
Example: Company DB
8
LAB #1 : E-R Diagramming

---

## Slide 6  ·  image: slide-006.png  ·  pdf page 3 (bottom)

Conceptual Data Design
Phase 2 of Database System Development

---

## Slide 7  ·  image: slide-007.png  ·  pdf page 4 (top)

Conceptual Data Design
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
7 / 99

---

## Slide 8  ·  image: slide-008.png  ·  pdf page 4 (bottom)

Conceptual Data Design
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
8 / 99

---

## Slide 9  ·  image: slide-009.png  ·  pdf page 5 (top)

Conceptual Data Design
List of Sentences
After the Requirements Phase you shall have a list of sentences of this form:
NOUN (“SUBJECT”) – VERB – NOUN (“OBJECT”)
about the application scenario on target, where a NOUN represents a set of “entities”
that you need information about (by querying), and a VERB (or verb phrase, for
example: member of, for, seat-on, etc.) represents “relationships” between entities.
Example:
1. STUDENTS – (MUST) REGISTER TO – CLASS
2. STUDENTS – (CAN) HAVE MAXIMUM TWO – ADVISORS
3. PERSON – (MAY) OWN A CAR / (MAY) BELONG TO – POLITICALPARTY
4. ...
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
9 / 99

---

## Slide 10  ·  image: slide-010.png  ·  pdf page 5 (bottom)

Conceptual Data Design
Example
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
10 / 99

---

## Slide 11  ·  image: slide-011.png  ·  pdf page 6 (top)

Conceptual Data Design
Decisions to Take in Data Design
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
11 / 99

---

## Slide 12  ·  image: slide-012.png  ·  pdf page 6 (bottom)

Conceptual Data Design
Decisions to Take in Data Design
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
12 / 99

---

## Slide 13  ·  image: slide-013.png  ·  pdf page 7 (top)

Conceptual Data Design
Decisions to Take in Data Design
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
13 / 99

---

## Slide 14  ·  image: slide-014.png  ·  pdf page 7 (bottom)

The E-R Model
i.e.: The Entity-Relationship Data Model
cf. Chapter 7 T, sections 7.1–7.5

---

## Slide 15  ·  image: slide-015.png  ·  pdf page 8 (top)

Conceptual Data Design
The E-R Model: Introduction
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
15 / 99

---

## Slide 16  ·  image: slide-016.png  ·  pdf page 8 (bottom)

Conceptual Data Design
The E-R Model: Introduction
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
16 / 99

---

## Slide 17  ·  image: slide-017.png  ·  pdf page 9 (top)

Conceptual Data Design
The E-R Model: Introduction
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
17 / 99

---

## Slide 18  ·  image: slide-018.png  ·  pdf page 9 (bottom)

Conceptual Data Design
The E-R Model: Introduction
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
18 / 99

---

## Slide 19  ·  image: slide-019.png  ·  pdf page 10 (top)

Conceptual Data Design
The E-R Model: Introduction
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
19 / 99

---

## Slide 20  ·  image: slide-020.png  ·  pdf page 10 (bottom)

Conceptual Data Design
The E-R Model: Introduction
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
20 / 99

---

## Slide 21  ·  image: slide-021.png  ·  pdf page 11 (top)

Outline
1
From Previous Week
2
Conceptual Data Design
3
Data and Data Relationships
4
Data Semantics
5
Data Constraints
6
Entity Integrity Revised: Weak Entities
7
Example: Company DB
8
LAB #1 : E-R Diagramming

---

## Slide 22  ·  image: slide-022.png  ·  pdf page 11 (bottom)

Data and Data Relationships
or: How we structure data in the E-R Model

---

## Slide 23  ·  image: slide-023.png  ·  pdf page 12 (top)

Data and Data Relationships
The E-R Model
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
23 / 99

---

## Slide 24  ·  image: slide-024.png  ·  pdf page 12 (bottom)

Data and Data Relationships
The E-R Model
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
24 / 99

---

## Slide 25  ·  image: slide-025.png  ·  pdf page 13 (top)

Entity Sets
or, equivalently: Entity Types

---

## Slide 26  ·  image: slide-026.png  ·  pdf page 13 (bottom)

Data and Data Relationships
Entity Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
26 / 99

---

## Slide 27  ·  image: slide-027.png  ·  pdf page 14 (top)

Data and Data Relationships
Entity Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
27 / 99

---

## Slide 28  ·  image: slide-028.png  ·  pdf page 14 (bottom)

Data and Data Relationships
Entity Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
28 / 99

---

## Slide 29  ·  image: slide-029.png  ·  pdf page 15 (top)

Data and Data Relationships
Entity Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
29 / 99

---

## Slide 30  ·  image: slide-030.png  ·  pdf page 15 (bottom)

Data and Data Relationships
Entity Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
30 / 99

---

## Slide 31  ·  image: slide-031.png  ·  pdf page 16 (top)

Data and Data Relationships
Entity Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
31 / 99

---

## Slide 32  ·  image: slide-032.png  ·  pdf page 16 (bottom)

Data and Data Relationships
Entity Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
32 / 99

---

## Slide 33  ·  image: slide-033.png  ·  pdf page 17 (top)

Relationship Sets
or, equivalently: Relationship Types

---

## Slide 34  ·  image: slide-034.png  ·  pdf page 17 (bottom)

Data and Data Relationships
Relationship Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
34 / 99

---

## Slide 35  ·  image: slide-035.png  ·  pdf page 18 (top)

Data and Data Relationships
Relationship Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
35 / 99

---

## Slide 36  ·  image: slide-036.png  ·  pdf page 18 (bottom)

Data and Data Relationships
Relationship Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
36 / 99

---

## Slide 37  ·  image: slide-037.png  ·  pdf page 19 (top)

Data and Data Relationships
Relationship Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
37 / 99

---

## Slide 38  ·  image: slide-038.png  ·  pdf page 19 (bottom)

Data and Data Relationships
Relationship Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
38 / 99

---

## Slide 39  ·  image: slide-039.png  ·  pdf page 20 (top)

Data and Data Relationships
Relationship Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
39 / 99

---

## Slide 40  ·  image: slide-040.png  ·  pdf page 20 (bottom)

Data and Data Relationships
Relationship Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
40 / 99

---

## Slide 41  ·  image: slide-041.png  ·  pdf page 21 (top)

Data and Data Relationships
Relationship Sets
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
41 / 99

---

## Slide 42  ·  image: slide-042.png  ·  pdf page 21 (bottom)

Outline
1
From Previous Week
2
Conceptual Data Design
3
Data and Data Relationships
4
Data Semantics
5
Data Constraints
6
Entity Integrity Revised: Weak Entities
7
Example: Company DB
8
LAB #1 : E-R Diagramming

---

## Slide 43  ·  image: slide-043.png  ·  pdf page 22 (top)

Data Semantics
or: How we mean data in the E-R Model

---

## Slide 44  ·  image: slide-044.png  ·  pdf page 22 (bottom)

Data Semantics
The E-R Model
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
44 / 99

---

## Slide 45  ·  image: slide-045.png  ·  pdf page 23 (top)

Outline
1
From Previous Week
2
Conceptual Data Design
3
Data and Data Relationships
4
Data Semantics
5
Data Constraints
6
Entity Integrity Revised: Weak Entities
7
Example: Company DB
8
LAB #1 : E-R Diagramming

---

## Slide 46  ·  image: slide-046.png  ·  pdf page 23 (bottom)

Data Constraints
or: How we capture constraints on data in the E-R Model (and why)

---

## Slide 47  ·  image: slide-047.png  ·  pdf page 24 (top)

Entity Integrity
or: Keys for Entity Sets

---

## Slide 48  ·  image: slide-048.png  ·  pdf page 24 (bottom)

Data Constraints
Entity Integrity
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
48 / 99

---

## Slide 49  ·  image: slide-049.png  ·  pdf page 25 (top)

Data Constraints
Entity Integrity
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
49 / 99

---

## Slide 50  ·  image: slide-050.png  ·  pdf page 25 (bottom)

Data Constraints
Entity Integrity
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
50 / 99

---

## Slide 51  ·  image: slide-051.png  ·  pdf page 26 (top)

Relation-Based Constraints (I)
Mapping Cardinality (or: Cardinality Ratio)

---

## Slide 52  ·  image: slide-052.png  ·  pdf page 26 (bottom)

Data Constraints
Mapping Cardinalities (or: Cardinality Ratio)
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
52 / 99

---

## Slide 53  ·  image: slide-053.png  ·  pdf page 27 (top)

Data Constraints
Mapping Cardinalities (or: Cardinality Ratio)
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
53 / 99

---

## Slide 54  ·  image: slide-054.png  ·  pdf page 27 (bottom)

Data Constraints
Mapping Cardinalities (or: Cardinality Ratio)
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
54 / 99

---

## Slide 55  ·  image: slide-055.png  ·  pdf page 28 (top)

Data Constraints
Mapping Cardinalities (or: Cardinality Ratio)
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
55 / 99

---

## Slide 56  ·  image: slide-056.png  ·  pdf page 28 (bottom)

Data Constraints
Mapping Cardinalities (or: Cardinality Ratio)
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
56 / 99

---

## Slide 57  ·  image: slide-057.png  ·  pdf page 29 (top)

Data Constraints
Mapping Cardinalities (or: Cardinality Ratio)
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
57 / 99

---

## Slide 58  ·  image: slide-058.png  ·  pdf page 29 (bottom)

Data Constraints
Mapping Cardinalities (or: Cardinality Ratio)
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
58 / 99

---

## Slide 59  ·  image: slide-059.png  ·  pdf page 30 (top)

Data Constraints
Mapping Cardinalities (or: Cardinality Ratio)
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
59 / 99

---

## Slide 60  ·  image: slide-060.png  ·  pdf page 30 (bottom)

Data Constraints
Mapping Cardinalities (or: Cardinality Ratio)
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
60 / 99

---

## Slide 61  ·  image: slide-061.png  ·  pdf page 31 (top)

Relation-Based Constraints (II)
Entity Participation

---

## Slide 62  ·  image: slide-062.png  ·  pdf page 31 (bottom)

Data Constraints
Entity Participation
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
62 / 99

---

## Slide 63  ·  image: slide-063.png  ·  pdf page 32 (top)

Data Constraints
Entity Participation
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
63 / 99

---

## Slide 64  ·  image: slide-064.png  ·  pdf page 32 (bottom)

Data Constraints
Entity Participation
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
64 / 99

---

## Slide 65  ·  image: slide-065.png  ·  pdf page 33 (top)

Data Constraints
Entity Participation
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
65 / 99

---

## Slide 66  ·  image: slide-066.png  ·  pdf page 33 (bottom)

Data Constraints
Entity Participation
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
66 / 99

---

## Slide 67  ·  image: slide-067.png  ·  pdf page 34 (top)

Data Constraints
Entity Participation
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
67 / 99

---

## Slide 68  ·  image: slide-068.png  ·  pdf page 34 (bottom)

Data Constraints
Entity Participation
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
68 / 99

---

## Slide 69  ·  image: slide-069.png  ·  pdf page 35 (top)

Data Constraints
Relation-Based Constraints: Summary
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
69 / 99

---

## Slide 70  ·  image: slide-070.png  ·  pdf page 35 (bottom)

Data Constraints
Relation-Based Constraints: (Min,Max) Notation
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
70 / 99

---

## Slide 71  ·  image: slide-071.png  ·  pdf page 36 (top)

Data Constraints
Relation-Based Constraints: (Min,Max) Notation
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
71 / 99

---

## Slide 72  ·  image: slide-072.png  ·  pdf page 36 (bottom)

Data Constraints
Relation-Based Constraints: (Min,Max) Notation
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
72 / 99

---

## Slide 73  ·  image: slide-073.png  ·  pdf page 37 (top)

Data Constraints
Relation-Based Constraints: Roles
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
73 / 99

---

## Slide 74  ·  image: slide-074.png  ·  pdf page 37 (bottom)

Data Constraints
Relation-Based Constraints: Roles
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
74 / 99

---

## Slide 75  ·  image: slide-075.png  ·  pdf page 38 (top)

Relationship Integrity
or: Keys for Relationship Sets

---

## Slide 76  ·  image: slide-076.png  ·  pdf page 38 (bottom)

Data Constraints
Relationship Integrity
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
76 / 99

---

## Slide 77  ·  image: slide-077.png  ·  pdf page 39 (top)

Data Constraints
Relationship Integrity
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
77 / 99

---

## Slide 78  ·  image: slide-078.png  ·  pdf page 39 (bottom)

Data Constraints
Relationship Integrity
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
78 / 99

---

## Slide 79  ·  image: slide-079.png  ·  pdf page 40 (top)

Data Constraints
Relationship Integrity
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
79 / 99

---

## Slide 80  ·  image: slide-080.png  ·  pdf page 40 (bottom)

Data Constraints
Relationship Integrity
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
80 / 99

---

## Slide 81  ·  image: slide-081.png  ·  pdf page 41 (top)

Data Constraints
Relationship Integrity
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
81 / 99

---

## Slide 82  ·  image: slide-082.png  ·  pdf page 41 (bottom)

Data Constraints
Relationship Integrity
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
82 / 99

---

## Slide 83  ·  image: slide-083.png  ·  pdf page 42 (top)

Data Constraints
Relationship Integrity
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
83 / 99

---

## Slide 84  ·  image: slide-084.png  ·  pdf page 42 (bottom)

Data Constraints
Relationship Integrity
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
84 / 99

---

## Slide 85  ·  image: slide-085.png  ·  pdf page 43 (top)

Outline
1
From Previous Week
2
Conceptual Data Design
3
Data and Data Relationships
4
Data Semantics
5
Data Constraints
6
Entity Integrity Revised: Weak Entities
7
Example: Company DB
8
LAB #1 : E-R Diagramming

---

## Slide 86  ·  image: slide-086.png  ·  pdf page 43 (bottom)

Entity Integrity Revised
or: Keys for Weak Entity Sets

---

## Slide 87  ·  image: slide-087.png  ·  pdf page 44 (top)

Entity Integrity Revised: Weak Entities
The E-R Model
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
87 / 99

---

## Slide 88  ·  image: slide-088.png  ·  pdf page 44 (bottom)

Entity Integrity Revised: Weak Entities
The E-R Model
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
88 / 99

---

## Slide 89  ·  image: slide-089.png  ·  pdf page 45 (top)

Entity Integrity Revised: Weak Entities
The E-R Model
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
89 / 99

---

## Slide 90  ·  image: slide-090.png  ·  pdf page 45 (bottom)

Entity Integrity Revised: Weak Entities
The E-R Model
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
90 / 99

---

## Slide 91  ·  image: slide-091.png  ·  pdf page 46 (top)

Outline
1
From Previous Week
2
Conceptual Data Design
3
Data and Data Relationships
4
Data Semantics
5
Data Constraints
6
Entity Integrity Revised: Weak Entities
7
Example: Company DB
8
LAB #1 : E-R Diagramming

---

## Slide 92  ·  image: slide-092.png  ·  pdf page 46 (bottom)

Example
Company DB Conceptual Design

---

## Slide 93  ·  image: slide-093.png  ·  pdf page 47 (top)

CompanyDB: Draw an equivalent E-R diagram (with Primary Keys!)
1
Each employee must work for at most one department.
2
A department must have at least one employee (working for it).
3
Employees can supervise other employees and be supervised by at most one employee.
4
An employee can manage at most one department, and start date is stored.
5
Every department must be managed, and by exactly one employee. The start date of
managing is stored.
6
Every employee can work on a project a number of hours.
7
A project must have at least one employee working on it (for some hours).
8
A department can control many projects, but no more than ﬁve.
9
All projects are controlled by one and only department.
10 Employees can have dependents, weak entities identiﬁed by name.
11 Employees have a unique “social security number” (ssn), day of birth (Bdate), a composite
name (with components: Fname for ﬁrst name,...), address, salary, and gender.

---

## Slide 94  ·  image: slide-094.png  ·  pdf page 47 (bottom)

Example: Company DB
The E-R Model
A solution (numbers refer to each sentence)
Employee
Ssn
11
⃝
Bdate
Name
Fname
...
Address
Salary
Gender
Department
Name
works_for
have
(0,*)
1⃝
(0,1)
2⃝
Dependent
Name
10
⃝
have
(0,*) 10
⃝
(1,1) ⃝
supervision
(0,*) 3⃝+
supervisor
(0,1) 3⃝
supervisee
Project
Name
(1,1) 9⃝
controls
(0,5) 8⃝
manage
start_date
(0,1)
4⃝
(1,1)
5⃝
works_on
hours
(0,*) 6⃝
(1,*) 7⃝
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
94 / 99

---

## Slide 95  ·  image: slide-095.png  ·  pdf page 48 (top)

Outline
1
From Previous Week
2
Conceptual Data Design
3
Data and Data Relationships
4
Data Semantics
5
Data Constraints
6
Entity Integrity Revised: Weak Entities
7
Example: Company DB
8
LAB #1 : E-R Diagramming

---

## Slide 96  ·  image: slide-096.png  ·  pdf page 48 (bottom)

LAB #1: Conceptual Data Design*
* Participation checked (2-3 members per working group)

---

## Slide 97  ·  image: slide-097.png  ·  pdf page 49 (top)

LAB #1 : E-R Diagramming
In class only (no slides provided).
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 3
97 / 99

---

## Slide 98  ·  image: slide-098.png  ·  pdf page 49 (bottom)

Summary
1
From Previous Week
2
Conceptual Data Design
3
Data and Data Relationships
4
Data Semantics
5
Data Constraints
6
Entity Integrity Revised: Weak Entities
7
Example: Company DB
8
LAB #1 : E-R Diagramming

---

## Slide 99  ·  image: slide-099.png  ·  pdf page 50 (top)

DATABASE
End of Slides
WEEK 3
Code: W3.L1L2[LAB#1]
