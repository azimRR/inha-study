# Week 4 — raw slide text (verbatim from the professor's PDF)
Source: Week 4 - W4L1L2 [LAB2].pdf · 33 pages (2 slides per page) · 65 slides extracted (footer says /65)

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
WEEK 4

---

## Slide 2  ·  image: slide-002.png  ·  pdf page 1 (bottom)

DATABASE
Database Design: Normalization
WEEK 4
Code: W4.L1L2[LAB#2]

---

## Slide 3  ·  image: slide-003.png  ·  pdf page 2 (top)

Outline
1
From Previous Week
2
Example: Company DB
3
Normalization Process
4
First Normal Form – 1NF
5
Second Normal Form – 2NF
6
Third Normal Form – 3NF
7
Example (cont’): Company DB
8
LAB #2 : Normalization Process

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
Example: Company DB
3
Normalization Process
4
First Normal Form – 1NF
5
Second Normal Form – 2NF
6
Third Normal Form – 3NF
7
Example (cont’): Company DB
8
LAB #2 : Normalization Process

---

## Slide 6  ·  image: slide-006.png  ·  pdf page 3 (bottom)

Example
Company DB Conceptual Design

---

## Slide 7  ·  image: slide-007.png  ·  pdf page 4 (top)

Example: Company DB
The E-R Model
Company DB: E-R diagram
Employee
Ssn
11
⃝
Bdate
Name
Fname
Lname
Address
Department
Name
{Location}
Num_of_empl()
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
Relationship
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
Number
Name
Location
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
(0,M) 6⃝
(1,N) 7⃝
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
7 / 65

---

## Slide 8  ·  image: slide-008.png  ·  pdf page 4 (bottom)

Outline
1
From Previous Week
2
Example: Company DB
3
Normalization Process
4
First Normal Form – 1NF
5
Second Normal Form – 2NF
6
Third Normal Form – 3NF
7
Example (cont’): Company DB
8
LAB #2 : Normalization Process

---

## Slide 9  ·  image: slide-009.png  ·  pdf page 5 (top)

Normalization Process
or: How to systematically improve logical schema design

---

## Slide 10  ·  image: slide-010.png  ·  pdf page 5 (bottom)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
10 / 65

---

## Slide 11  ·  image: slide-011.png  ·  pdf page 6 (top)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
11 / 65

---

## Slide 12  ·  image: slide-012.png  ·  pdf page 6 (bottom)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
12 / 65

---

## Slide 13  ·  image: slide-013.png  ·  pdf page 7 (top)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
13 / 65

---

## Slide 14  ·  image: slide-014.png  ·  pdf page 7 (bottom)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
14 / 65

---

## Slide 15  ·  image: slide-015.png  ·  pdf page 8 (top)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
15 / 65

---

## Slide 16  ·  image: slide-016.png  ·  pdf page 8 (bottom)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
16 / 65

---

## Slide 17  ·  image: slide-017.png  ·  pdf page 9 (top)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
17 / 65

---

## Slide 18  ·  image: slide-018.png  ·  pdf page 9 (bottom)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
18 / 65

---

## Slide 19  ·  image: slide-019.png  ·  pdf page 10 (top)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
19 / 65

---

## Slide 20  ·  image: slide-020.png  ·  pdf page 10 (bottom)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
20 / 65

---

## Slide 21  ·  image: slide-021.png  ·  pdf page 11 (top)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
21 / 65

---

## Slide 22  ·  image: slide-022.png  ·  pdf page 11 (bottom)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
22 / 65

---

## Slide 23  ·  image: slide-023.png  ·  pdf page 12 (top)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
23 / 65

---

## Slide 24  ·  image: slide-024.png  ·  pdf page 12 (bottom)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
24 / 65

---

## Slide 25  ·  image: slide-025.png  ·  pdf page 13 (top)

Normalization Process
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
25 / 65

---

## Slide 26  ·  image: slide-026.png  ·  pdf page 13 (bottom)

Outline
1
From Previous Week
2
Example: Company DB
3
Normalization Process
4
First Normal Form – 1NF
5
Second Normal Form – 2NF
6
Third Normal Form – 3NF
7
Example (cont’): Company DB
8
LAB #2 : Normalization Process

---

## Slide 27  ·  image: slide-027.png  ·  pdf page 14 (top)

Normalization Process (cont.)
First Normal Form – 1NF
or: Logical design of composite and multi-valued attributes

---

## Slide 28  ·  image: slide-028.png  ·  pdf page 14 (bottom)

First Normal Form – 1NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
28 / 65

---

## Slide 29  ·  image: slide-029.png  ·  pdf page 15 (top)

First Normal Form – 1NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
29 / 65

---

## Slide 30  ·  image: slide-030.png  ·  pdf page 15 (bottom)

First Normal Form – 1NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
30 / 65

---

## Slide 31  ·  image: slide-031.png  ·  pdf page 16 (top)

First Normal Form – 1NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
31 / 65

---

## Slide 32  ·  image: slide-032.png  ·  pdf page 16 (bottom)

First Normal Form – 1NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
32 / 65

---

## Slide 33  ·  image: slide-033.png  ·  pdf page 17 (top)

Outline
1
From Previous Week
2
Example: Company DB
3
Normalization Process
4
First Normal Form – 1NF
5
Second Normal Form – 2NF
6
Third Normal Form – 3NF
7
Example (cont’): Company DB
8
LAB #2 : Normalization Process

---

## Slide 34  ·  image: slide-034.png  ·  pdf page 17 (bottom)

Normalization Process (cont.)
Second Normal Form – 2NF
or: Eliminate Partial Functional Dependencies on Primary Key

---

## Slide 35  ·  image: slide-035.png  ·  pdf page 18 (top)

Second Normal Form – 2NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
35 / 65

---

## Slide 36  ·  image: slide-036.png  ·  pdf page 18 (bottom)

Second Normal Form – 2NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
36 / 65

---

## Slide 37  ·  image: slide-037.png  ·  pdf page 19 (top)

Second Normal Form – 2NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
37 / 65

---

## Slide 38  ·  image: slide-038.png  ·  pdf page 19 (bottom)

Second Normal Form – 2NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
38 / 65

---

## Slide 39  ·  image: slide-039.png  ·  pdf page 20 (top)

Second Normal Form – 2NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
39 / 65

---

## Slide 40  ·  image: slide-040.png  ·  pdf page 20 (bottom)

Second Normal Form – 2NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
40 / 65

---

## Slide 41  ·  image: slide-041.png  ·  pdf page 21 (top)

Second Normal Form – 2NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
41 / 65

---

## Slide 42  ·  image: slide-042.png  ·  pdf page 21 (bottom)

Second Normal Form – 2NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
42 / 65

---

## Slide 43  ·  image: slide-043.png  ·  pdf page 22 (top)

Second Normal Form – 2NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
43 / 65

---

## Slide 44  ·  image: slide-044.png  ·  pdf page 22 (bottom)

Outline
1
From Previous Week
2
Example: Company DB
3
Normalization Process
4
First Normal Form – 1NF
5
Second Normal Form – 2NF
6
Third Normal Form – 3NF
7
Example (cont’): Company DB
8
LAB #2 : Normalization Process

---

## Slide 45  ·  image: slide-045.png  ·  pdf page 23 (top)

Normalization Process (cont.)
Third Normal Form – 3NF
or: Eliminate Transitive Functional Dependencies on Primary Key

---

## Slide 46  ·  image: slide-046.png  ·  pdf page 23 (bottom)

Third Normal Form – 3NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
46 / 65

---

## Slide 47  ·  image: slide-047.png  ·  pdf page 24 (top)

Third Normal Form – 3NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
47 / 65

---

## Slide 48  ·  image: slide-048.png  ·  pdf page 24 (bottom)

Third Normal Form – 3NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
48 / 65

---

## Slide 49  ·  image: slide-049.png  ·  pdf page 25 (top)

Third Normal Form – 3NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
49 / 65

---

## Slide 50  ·  image: slide-050.png  ·  pdf page 25 (bottom)

Third Normal Form – 3NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
50 / 65

---

## Slide 51  ·  image: slide-051.png  ·  pdf page 26 (top)

Third Normal Form – 3NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
51 / 65

---

## Slide 52  ·  image: slide-052.png  ·  pdf page 26 (bottom)

Third Normal Form – 3NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
52 / 65

---

## Slide 53  ·  image: slide-053.png  ·  pdf page 27 (top)

Third Normal Form – 3NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
53 / 65

---

## Slide 54  ·  image: slide-054.png  ·  pdf page 27 (bottom)

Third Normal Form – 3NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
54 / 65

---

## Slide 55  ·  image: slide-055.png  ·  pdf page 28 (top)

Third Normal Form – 3NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
55 / 65

---

## Slide 56  ·  image: slide-056.png  ·  pdf page 28 (bottom)

Third Normal Form – 3NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
56 / 65

---

## Slide 57  ·  image: slide-057.png  ·  pdf page 29 (top)

Third Normal Form – 3NF
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
57 / 65

---

## Slide 58  ·  image: slide-058.png  ·  pdf page 29 (bottom)

Outline
1
From Previous Week
2
Example: Company DB
3
Normalization Process
4
First Normal Form – 1NF
5
Second Normal Form – 2NF
6
Third Normal Form – 3NF
7
Example (cont’): Company DB
8
LAB #2 : Normalization Process

---

## Slide 59  ·  image: slide-059.png  ·  pdf page 30 (top)

Example (cont’): Company DB
3NF-Normalized Logical Schema (tagged with (min, max) contraints)
Employee
Ssn
Bdate
Name_Fname
Name_Lname
Address
wf_D_Name (FK)
Supervisor_Ssn (FK)
Department
Name
m_E_Ssn (FK)
m_start_date
Num_of_empl
(1,1)
(manages)
(0,1)
D_Locations
Location
D_Name (FK)
(has)
(0,*)
(1,1)
Dependent
Name
Relationship
E_Ssn (FK)
(dependents_of)
(1,1)
(0,*)
(supervision)
(0,1)
+
(supervisor)
(0,*)
(supervisee)
Project
Number
Name
Location
c_D_Name (FK)
(0,5)
(controls)
(1,1)
(works_for)
(1,*)
(1,1)
works_on
E_Ssn (FK)
P_Number (FK)
hours
(1,1)
(0,M)
(1,1)
(1,N)
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
59 / 65

---

## Slide 60  ·  image: slide-060.png  ·  pdf page 30 (bottom)

Example (cont’): Company DB
3NF-Normalized Logical Schema: “Crow’s Foot” Notation
Employee
Ssn
Bdate
Name_Fname
Name_Lname
Address
wf_D_Name (FK)
Supervisor_Ssn (FK)
Department
Name
m_E_Ssn (FK)
m_start_date
Num_of_empl
(1,1)
(manages)
(0,1)
D_Locations
Location
D_Name (FK)
(has)
(1,1)
(0,*)
Dependent
Name
Relationship
E_Ssn (FK)
(dependents_of)
(1,1)
(0,*)
(supervision)
(0,1)
+
(supervisor)
(0,*)
(supervisee)
Project
Number
Name
Location
c_D_Name (FK)
(0,5)
(controls)
(1,1)
(works_for)
(1,*)
(1,1)
works_on
E_Ssn (FK)
P_Number (FK)
hours
(1,1)
(0,M)
(1,N)
(1,1)
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
60 / 65

---

## Slide 61  ·  image: slide-061.png  ·  pdf page 31 (top)

Outline
1
From Previous Week
2
Example: Company DB
3
Normalization Process
4
First Normal Form – 1NF
5
Second Normal Form – 2NF
6
Third Normal Form – 3NF
7
Example (cont’): Company DB
8
LAB #2 : Normalization Process

---

## Slide 62  ·  image: slide-062.png  ·  pdf page 31 (bottom)

LAB #1: Logical Data Design*
* Participation checked (2-3 members per working group)

---

## Slide 63  ·  image: slide-063.png  ·  pdf page 32 (top)

LAB #2 : Normalization Process
In class only (no slides provided).
© Alessandro Agostini - Inha University in Tashkent
SOC-3020 Database
WEEK 4
63 / 65

---

## Slide 64  ·  image: slide-064.png  ·  pdf page 32 (bottom)

Summary
1
From Previous Week
2
Example: Company DB
3
Normalization Process
4
First Normal Form – 1NF
5
Second Normal Form – 2NF
6
Third Normal Form – 3NF
7
Example (cont’): Company DB
8
LAB #2 : Normalization Process

---

## Slide 65  ·  image: slide-065.png  ·  pdf page 33 (top)

DATABASE
End of Slides
WEEK 4
Code: W4.L1L2[LAB#2]
